// URL/redirect hardening only. For dynamic DNS names this cannot bind fetch's
// socket to a public IP. See docs/security-stage74.md before considering SSRF fixed.
// No DNS preflight is used: a separate lookup would leave a TOCTOU/rebinding gap.

const NON_PUBLIC_IPV4: Array<[number[], number]> = [
  [[0, 0, 0, 0], 8], [[10, 0, 0, 0], 8], [[100, 64, 0, 0], 10],
  [[127, 0, 0, 0], 8], [[169, 254, 0, 0], 16], [[172, 16, 0, 0], 12],
  [[192, 0, 0, 0], 24], [[192, 0, 2, 0], 24], [[192, 88, 99, 0], 24],
  [[192, 168, 0, 0], 16], [[198, 18, 0, 0], 15], [[198, 51, 100, 0], 24],
  [[203, 0, 113, 0], 24], [[224, 0, 0, 0], 3],
  // Azure platform virtual IP; not a scientific source.
  [[168, 63, 129, 16], 32],
];

function ipv4Number(parts: number[]) {
  return parts.reduce((value, octet) => value * 256 + octet, 0);
}

function publicIpv4(host: string): boolean {
  const parts = host.split(".").map(Number);
  if (parts.length !== 4 || parts.some((p) => !Number.isInteger(p) || p < 0 || p > 255)) return false;
  const value = ipv4Number(parts);
  return !NON_PUBLIC_IPV4.some(([network, bits]) => {
    const size = 2 ** (32 - bits);
    return Math.floor(value / size) === Math.floor(ipv4Number(network) / size);
  });
}

function publicIpv6(host: string): boolean {
  const raw = host.slice(1, -1);
  const halves = raw.split("::");
  const left = halves[0] ? halves[0].split(":") : [];
  const right = halves.length === 2 && halves[1] ? halves[1].split(":") : [];
  const groups = halves.length === 2
    ? [...left, ...Array(8 - left.length - right.length).fill("0"), ...right]
    : left;
  if (groups.length !== 8 || groups.some((p) => !/^[0-9a-f]{1,4}$/i.test(p))) return false;
  const words = groups.map((p) => parseInt(p, 16));
  // Global unicast only; excludes ULA, link-local, multicast, mapped IPv4,
  // NAT64 and other translation ranges that could embed an internal address.
  if ((words[0] & 0xe000) !== 0x2000) return false;
  if (words[0] === 0x2001 && (words[1] < 0x0200 || words[1] === 0x0db8)) return false;
  if (words[0] === 0x2002) return false; // 6to4 can embed non-public IPv4.
  if (words[0] === 0x3fff && words[1] < 0x1000) return false; // Documentation /20.
  return true;
}

// Validates the parsed authority, including WHATWG-normalized integer/hex/octal
// IPv4. A permitted DNS name is NOT proof of the eventual connection's address.
export function parseSourceUrl(value: string): URL | null {
  try {
    if (!/^https:\/\//i.test(value) || value.trim() !== value || /[\x00-\x1f\x7f\\]/.test(value)) return null;
    const authority = value.match(/^https:\/\/([^/?#]+)/i)?.[1];
    if (!authority || authority.includes("@")) return null;
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || url.port) return null;
    const host = url.hostname.toLowerCase().replace(/\.$/, "");
    if (host.startsWith("[")) return publicIpv6(host) ? url : null;
    if (/^[0-9.]+$/.test(host)) return publicIpv4(host) ? url : null;
    const labels = host.split(".");
    if (labels.length < 2 || host.length > 253
        || labels.some((label) => !/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label))) return null;
    const reserved = ["localhost", "local", "internal", "lan", "home", "home.arpa", "test", "invalid", "example", "onion"];
    if (reserved.some((suffix) => host === suffix || host.endsWith("." + suffix))) return null;
    return url;
  } catch {
    return null;
  }
}

type VerifierOptions = {
  fetch?: typeof fetch;
  headTimeoutMs?: number;
  getTimeoutMs?: number;
};

async function cancelBody(response: Response, signal: AbortSignal) {
  if (!response.body) return;
  let onAbort: () => void = () => {};
  const aborted = new Promise<never>((_, reject) => {
    onAbort = () => reject(new Error("Source verification timed out"));
    if (signal.aborted) onAbort();
    else signal.addEventListener("abort", onAbort, { once: true });
  });
  try {
    await Promise.race([response.body.cancel(), aborted]);
  } finally {
    signal.removeEventListener("abort", onAbort);
  }
}

export async function urlReachable(value: string, options: VerifierOptions = {}): Promise<boolean> {
  let url = parseSourceUrl(value);
  if (!url) return false;
  const fetchSource = options.fetch || fetch;
  let method = "HEAD";
  let redirects = 0;
  const visited = new Set<string>();
  let controller = new AbortController();
  let timer = setTimeout(() => controller.abort(), options.headTimeoutMs ?? 8000);
  try {
    while (true) {
      url.hash = "";
      const visit = method + " " + url.href;
      if (visited.has(visit)) return false;
      visited.add(visit);
      const headers: Record<string, string> = { "User-Agent": "TRAUBE-Source-Verifier/1.0" };
      if (method === "GET") headers.Range = "bytes=0-4095";
      const response = await fetchSource(url.href, {
        method, redirect: "manual", headers, signal: controller.signal,
        credentials: "omit", referrerPolicy: "no-referrer",
      });
      const status = response.status;
      const location = response.headers.get("Location");
      // Reachability needs only headers: never buffer/download the response body,
      // even if a server ignores Range or supplies a misleading Content-Length.
      await cancelBody(response, controller.signal);
      if (controller.signal.aborted) return false;
      if ([301, 302, 303, 307, 308].includes(status)) {
        if (!location || redirects >= 3 || /[\x00-\x1f\x7f\\]/.test(location)) return false;
        // Validate an absolute/protocol-relative authority BEFORE URL resolution
        // can discard empty credentials (e.g. https://@host/).
        const target = location.startsWith("//") ? "https:" + location : location;
        const next = parseSourceUrl(/^[a-z][a-z0-9+.-]*:/i.test(target)
          ? target : new URL(target, url).href);
        if (!next) return false;
        url = next;
        redirects++;
        continue;
      }
      if (method === "HEAD" && (status === 405 || status === 501)) {
        method = "GET";
        clearTimeout(timer);
        controller = new AbortController();
        timer = setTimeout(() => controller.abort(), options.getTimeoutMs ?? 10000);
        continue;
      }
      // Keep existing reachability meaning (e.g. 403 is not a missing document).
      return status >= 200 && status < 500 && status !== 404 && status !== 410;
    }
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}
