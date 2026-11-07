var pn = {
  LEFT: 0,
  MIDDLE: 1,
  RIGHT: 2,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2
}, fn = {
  ROTATE: 0,
  PAN: 1,
  DOLLY_PAN: 2,
  DOLLY_ROTATE: 3
};
var Fl = "attached";
var Fr = 1e3, oi = 1001, Or = 1002, Tt = 1003, Po = 1004, Lo = 1005, It = 1006, Do = 1007, qr = 1008, Ni = 1009, Ol = 1010, kl = 1011, Io = 1012, Bl = 1013, qi = 1014, Tn = 1015, Xi = 1016, No = 1017, Uo = 1018, Fo = 1020, zl = 35902, Gl = 35899, Vl = 1021, Hl = 1022, vn = 1023, jn = 1026, Oo = 1027, ko = 1028, Bo = 1029, kr = 1030, zo = 1031, Go = 1033, Wl = 33776, ql = 33777, Xl = 33778, Kl = 33779, jl = 35840, Yl = 35841, Jl = 35842, Zl = 35843, $l = 36196, Ql = 37492, ec = 37496, tc = 37488, ic = 37489, nc = 37490, rc = 37491, sc = 37808, ac = 37809, oc = 37810, lc = 37811, cc = 37812, hc = 37813, uc = 37814, dc = 37815, fc = 37816, pc = 37817, mc = 37818, gc = 37819, _c = 37820, vc = 37821, bc = 36492, Mc = 36494, xc = 36495, Sc = 36283, yc = 36284, Ec = 36285, Tc = 36286, Yn = 2300, Jn = 2301, Qr = 2302, ha = 2303, ua = 2400, da = 2401, fa = 2402, Ac = 2500, Rc = 3200;
var xt = "srgb", Zt = "srgb-linear", Br = "linear", zr = "srgb", es = 7680;
var Vo = 35044;
var bn = 2e3;
function wc(e) {
  for (let t = e.length - 1; t >= 0; --t) if (e[t] >= 65535) return !0;
  return !1;
}
function Cc(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function Zn(e) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", e);
}
function Pc() {
  const e = Zn("canvas");
  return e.style.display = "block", e;
}
var pa = {}, Mn = null;
function Gr(...e) {
  const t = "THREE." + e.shift();
  Mn ? Mn("log", t, ...e) : console.log(t, ...e);
}
function Ho(e) {
  const t = e[0];
  if (typeof t == "string" && t.startsWith("TSL:")) {
    const i = e[1];
    i && i.isStackTrace ? e[0] += " " + i.getLocation() : e[1] = 'Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.';
  }
  return e;
}
function Se(...e) {
  e = Ho(e);
  const t = "THREE." + e.shift();
  if (Mn) Mn("warn", t, ...e);
  else {
    const i = e[0];
    i && i.isStackTrace ? console.warn(i.getError(t)) : console.warn(t, ...e);
  }
}
function Le(...e) {
  e = Ho(e);
  const t = "THREE." + e.shift();
  if (Mn) Mn("error", t, ...e);
  else {
    const i = e[0];
    i && i.isStackTrace ? console.error(i.getError(t)) : console.error(t, ...e);
  }
}
function mn(...e) {
  const t = e.join(" ");
  t in pa || (pa[t] = !0, Se(...e));
}
function Lc(e, t, i) {
  return new Promise(function(n, r) {
    function s() {
      switch (e.clientWaitSync(t, e.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case e.WAIT_FAILED:
          r();
          break;
        case e.TIMEOUT_EXPIRED:
          setTimeout(s, i);
          break;
        default:
          n();
      }
    }
    setTimeout(s, i);
  });
}
var Dc = {
  0: 1,
  2: 6,
  4: 7,
  3: 5,
  1: 0,
  6: 2,
  7: 4,
  5: 3
}, Ui = class {
  addEventListener(e, t) {
    this._listeners === void 0 && (this._listeners = {});
    const i = this._listeners;
    i[e] === void 0 && (i[e] = []), i[e].indexOf(t) === -1 && i[e].push(t);
  }
  hasEventListener(e, t) {
    const i = this._listeners;
    return i === void 0 ? !1 : i[e] !== void 0 && i[e].indexOf(t) !== -1;
  }
  removeEventListener(e, t) {
    const i = this._listeners;
    if (i === void 0) return;
    const n = i[e];
    if (n !== void 0) {
      const r = n.indexOf(t);
      r !== -1 && n.splice(r, 1);
    }
  }
  dispatchEvent(e) {
    const t = this._listeners;
    if (t === void 0) return;
    const i = t[e.type];
    if (i !== void 0) {
      e.target = this;
      const n = i.slice(0);
      for (let r = 0, s = n.length; r < s; r++) n[r].call(this, e);
      e.target = null;
    }
  }
}, yt = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "0a",
  "0b",
  "0c",
  "0d",
  "0e",
  "0f",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "1a",
  "1b",
  "1c",
  "1d",
  "1e",
  "1f",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "2a",
  "2b",
  "2c",
  "2d",
  "2e",
  "2f",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "3a",
  "3b",
  "3c",
  "3d",
  "3e",
  "3f",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "4a",
  "4b",
  "4c",
  "4d",
  "4e",
  "4f",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
  "5a",
  "5b",
  "5c",
  "5d",
  "5e",
  "5f",
  "60",
  "61",
  "62",
  "63",
  "64",
  "65",
  "66",
  "67",
  "68",
  "69",
  "6a",
  "6b",
  "6c",
  "6d",
  "6e",
  "6f",
  "70",
  "71",
  "72",
  "73",
  "74",
  "75",
  "76",
  "77",
  "78",
  "79",
  "7a",
  "7b",
  "7c",
  "7d",
  "7e",
  "7f",
  "80",
  "81",
  "82",
  "83",
  "84",
  "85",
  "86",
  "87",
  "88",
  "89",
  "8a",
  "8b",
  "8c",
  "8d",
  "8e",
  "8f",
  "90",
  "91",
  "92",
  "93",
  "94",
  "95",
  "96",
  "97",
  "98",
  "99",
  "9a",
  "9b",
  "9c",
  "9d",
  "9e",
  "9f",
  "a0",
  "a1",
  "a2",
  "a3",
  "a4",
  "a5",
  "a6",
  "a7",
  "a8",
  "a9",
  "aa",
  "ab",
  "ac",
  "ad",
  "ae",
  "af",
  "b0",
  "b1",
  "b2",
  "b3",
  "b4",
  "b5",
  "b6",
  "b7",
  "b8",
  "b9",
  "ba",
  "bb",
  "bc",
  "bd",
  "be",
  "bf",
  "c0",
  "c1",
  "c2",
  "c3",
  "c4",
  "c5",
  "c6",
  "c7",
  "c8",
  "c9",
  "ca",
  "cb",
  "cc",
  "cd",
  "ce",
  "cf",
  "d0",
  "d1",
  "d2",
  "d3",
  "d4",
  "d5",
  "d6",
  "d7",
  "d8",
  "d9",
  "da",
  "db",
  "dc",
  "dd",
  "de",
  "df",
  "e0",
  "e1",
  "e2",
  "e3",
  "e4",
  "e5",
  "e6",
  "e7",
  "e8",
  "e9",
  "ea",
  "eb",
  "ec",
  "ed",
  "ee",
  "ef",
  "f0",
  "f1",
  "f2",
  "f3",
  "f4",
  "f5",
  "f6",
  "f7",
  "f8",
  "f9",
  "fa",
  "fb",
  "fc",
  "fd",
  "fe",
  "ff"
], ma = 1234567, qn = Math.PI / 180, xn = 180 / Math.PI;
function Jt() {
  const e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, i = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0;
  return (yt[e & 255] + yt[e >> 8 & 255] + yt[e >> 16 & 255] + yt[e >> 24 & 255] + "-" + yt[t & 255] + yt[t >> 8 & 255] + "-" + yt[t >> 16 & 15 | 64] + yt[t >> 24 & 255] + "-" + yt[i & 63 | 128] + yt[i >> 8 & 255] + "-" + yt[i >> 16 & 255] + yt[i >> 24 & 255] + yt[n & 255] + yt[n >> 8 & 255] + yt[n >> 16 & 255] + yt[n >> 24 & 255]).toLowerCase();
}
function Be(e, t, i) {
  return Math.max(t, Math.min(i, e));
}
function qs(e, t) {
  return (e % t + t) % t;
}
function Ic(e, t, i, n, r) {
  return n + (e - t) * (r - n) / (i - t);
}
function Nc(e, t, i) {
  return e !== t ? (i - e) / (t - e) : 0;
}
function Xn(e, t, i) {
  return (1 - i) * e + i * t;
}
function Uc(e, t, i, n) {
  return Xn(e, t, 1 - Math.exp(-i * n));
}
function Fc(e, t = 1) {
  return t - Math.abs(qs(e, t * 2) - t);
}
function Oc(e, t, i) {
  return e <= t ? 0 : e >= i ? 1 : (e = (e - t) / (i - t), e * e * (3 - 2 * e));
}
function kc(e, t, i) {
  return e <= t ? 0 : e >= i ? 1 : (e = (e - t) / (i - t), e * e * e * (e * (e * 6 - 15) + 10));
}
function Bc(e, t) {
  return e + Math.floor(Math.random() * (t - e + 1));
}
function zc(e, t) {
  return e + Math.random() * (t - e);
}
function Gc(e) {
  return e * (0.5 - Math.random());
}
function Vc(e) {
  e !== void 0 && (ma = e);
  let t = ma += 1831565813;
  return t = Math.imul(t ^ t >>> 15, t | 1), t ^= t + Math.imul(t ^ t >>> 7, t | 61), ((t ^ t >>> 14) >>> 0) / 4294967296;
}
function Hc(e) {
  return e * qn;
}
function Wc(e) {
  return e * xn;
}
function qc(e) {
  return (e & e - 1) === 0 && e !== 0;
}
function Xc(e) {
  return Math.pow(2, Math.ceil(Math.log(e) / Math.LN2));
}
function Kc(e) {
  return Math.pow(2, Math.floor(Math.log(e) / Math.LN2));
}
function jc(e, t, i, n, r) {
  const s = Math.cos, a = Math.sin, o = s(i / 2), l = a(i / 2), c = s((t + n) / 2), h = a((t + n) / 2), d = s((t - n) / 2), u = a((t - n) / 2), p = s((n - t) / 2), v = a((n - t) / 2);
  switch (r) {
    case "XYX":
      e.set(o * h, l * d, l * u, o * c);
      break;
    case "YZY":
      e.set(l * u, o * h, l * d, o * c);
      break;
    case "ZXZ":
      e.set(l * d, l * u, o * h, o * c);
      break;
    case "XZX":
      e.set(o * h, l * v, l * p, o * c);
      break;
    case "YXY":
      e.set(l * p, o * h, l * v, o * c);
      break;
    case "ZYZ":
      e.set(l * v, l * p, o * h, o * c);
      break;
    default:
      Se("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + r);
  }
}
function Yt(e, t) {
  switch (t.constructor) {
    case Float32Array:
      return e;
    case Uint32Array:
      return e / 4294967295;
    case Uint16Array:
      return e / 65535;
    case Uint8Array:
      return e / 255;
    case Int32Array:
      return Math.max(e / 2147483647, -1);
    case Int16Array:
      return Math.max(e / 32767, -1);
    case Int8Array:
      return Math.max(e / 127, -1);
    default:
      throw new Error("THREE.MathUtils: Invalid component type.");
  }
}
function Je(e, t) {
  switch (t.constructor) {
    case Float32Array:
      return e;
    case Uint32Array:
      return Math.round(e * 4294967295);
    case Uint16Array:
      return Math.round(e * 65535);
    case Uint8Array:
      return Math.round(e * 255);
    case Int32Array:
      return Math.round(e * 2147483647);
    case Int16Array:
      return Math.round(e * 32767);
    case Int8Array:
      return Math.round(e * 127);
    default:
      throw new Error("THREE.MathUtils: Invalid component type.");
  }
}
var Wo = {
  DEG2RAD: qn,
  RAD2DEG: xn,
  generateUUID: Jt,
  clamp: Be,
  euclideanModulo: qs,
  mapLinear: Ic,
  inverseLerp: Nc,
  lerp: Xn,
  damp: Uc,
  pingpong: Fc,
  smoothstep: Oc,
  smootherstep: kc,
  randInt: Bc,
  randFloat: zc,
  randFloatSpread: Gc,
  seededRandom: Vc,
  degToRad: Hc,
  radToDeg: Wc,
  isPowerOfTwo: qc,
  ceilPowerOfTwo: Xc,
  floorPowerOfTwo: Kc,
  setQuaternionFromProperEuler: jc,
  normalize: Je,
  denormalize: Yt
}, De = class qo {
  static {
    qo.prototype.isVector2 = !0;
  }
  constructor(t = 0, i = 0) {
    this.x = t, this.y = i;
  }
  get width() {
    return this.x;
  }
  set width(t) {
    this.x = t;
  }
  get height() {
    return this.y;
  }
  set height(t) {
    this.y = t;
  }
  set(t, i) {
    return this.x = t, this.y = i, this;
  }
  setScalar(t) {
    return this.x = t, this.y = t, this;
  }
  setX(t) {
    return this.x = t, this;
  }
  setY(t) {
    return this.y = t, this;
  }
  setComponent(t, i) {
    switch (t) {
      case 0:
        this.x = i;
        break;
      case 1:
        this.y = i;
        break;
      default:
        throw new Error("THREE.Vector2: index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("THREE.Vector2: index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(t) {
    return this.x = t.x, this.y = t.y, this;
  }
  add(t) {
    return this.x += t.x, this.y += t.y, this;
  }
  addScalar(t) {
    return this.x += t, this.y += t, this;
  }
  addVectors(t, i) {
    return this.x = t.x + i.x, this.y = t.y + i.y, this;
  }
  addScaledVector(t, i) {
    return this.x += t.x * i, this.y += t.y * i, this;
  }
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this;
  }
  subScalar(t) {
    return this.x -= t, this.y -= t, this;
  }
  subVectors(t, i) {
    return this.x = t.x - i.x, this.y = t.y - i.y, this;
  }
  multiply(t) {
    return this.x *= t.x, this.y *= t.y, this;
  }
  multiplyScalar(t) {
    return this.x *= t, this.y *= t, this;
  }
  divide(t) {
    return this.x /= t.x, this.y /= t.y, this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  applyMatrix3(t) {
    const i = this.x, n = this.y, r = t.elements;
    return this.x = r[0] * i + r[3] * n + r[6], this.y = r[1] * i + r[4] * n + r[7], this;
  }
  min(t) {
    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this;
  }
  max(t) {
    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this;
  }
  clamp(t, i) {
    return this.x = Be(this.x, t.x, i.x), this.y = Be(this.y, t.y, i.y), this;
  }
  clampScalar(t, i) {
    return this.x = Be(this.x, t, i), this.y = Be(this.y, t, i), this;
  }
  clampLength(t, i) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Be(n, t, i));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y;
  }
  cross(t) {
    return this.x * t.y - this.y * t.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(t) {
    const i = Math.sqrt(this.lengthSq() * t.lengthSq());
    if (i === 0) return Math.PI / 2;
    const n = this.dot(t) / i;
    return Math.acos(Be(n, -1, 1));
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceToSquared(t));
  }
  distanceToSquared(t) {
    const i = this.x - t.x, n = this.y - t.y;
    return i * i + n * n;
  }
  manhattanDistanceTo(t) {
    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, i) {
    return this.x += (t.x - this.x) * i, this.y += (t.y - this.y) * i, this;
  }
  lerpVectors(t, i, n) {
    return this.x = t.x + (i.x - t.x) * n, this.y = t.y + (i.y - t.y) * n, this;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y;
  }
  fromArray(t, i = 0) {
    return this.x = t[i], this.y = t[i + 1], this;
  }
  toArray(t = [], i = 0) {
    return t[i] = this.x, t[i + 1] = this.y, t;
  }
  fromBufferAttribute(t, i) {
    return this.x = t.getX(i), this.y = t.getY(i), this;
  }
  rotateAround(t, i) {
    const n = Math.cos(i), r = Math.sin(i), s = this.x - t.x, a = this.y - t.y;
    return this.x = s * n - a * r + t.x, this.y = s * r + a * n + t.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}, $t = class {
  constructor(e = 0, t = 0, i = 0, n = 1) {
    this.isQuaternion = !0, this._x = e, this._y = t, this._z = i, this._w = n;
  }
  static slerpFlat(e, t, i, n, r, s, a) {
    let o = i[n + 0], l = i[n + 1], c = i[n + 2], h = i[n + 3], d = r[s + 0], u = r[s + 1], p = r[s + 2], v = r[s + 3];
    if (h !== v || o !== d || l !== u || c !== p) {
      let b = o * d + l * u + c * p + h * v;
      b < 0 && (d = -d, u = -u, p = -p, v = -v, b = -b);
      let m = 1 - a;
      if (b < 0.9995) {
        const f = Math.acos(b), T = Math.sin(f);
        m = Math.sin(m * f) / T, a = Math.sin(a * f) / T, o = o * m + d * a, l = l * m + u * a, c = c * m + p * a, h = h * m + v * a;
      } else {
        o = o * m + d * a, l = l * m + u * a, c = c * m + p * a, h = h * m + v * a;
        const f = 1 / Math.sqrt(o * o + l * l + c * c + h * h);
        o *= f, l *= f, c *= f, h *= f;
      }
    }
    e[t] = o, e[t + 1] = l, e[t + 2] = c, e[t + 3] = h;
  }
  static multiplyQuaternionsFlat(e, t, i, n, r, s) {
    const a = i[n], o = i[n + 1], l = i[n + 2], c = i[n + 3], h = r[s], d = r[s + 1], u = r[s + 2], p = r[s + 3];
    return e[t] = a * p + c * h + o * u - l * d, e[t + 1] = o * p + c * d + l * h - a * u, e[t + 2] = l * p + c * u + a * d - o * h, e[t + 3] = c * p - a * h - o * d - l * u, e;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(e) {
    this._w = e, this._onChangeCallback();
  }
  set(e, t, i, n) {
    return this._x = e, this._y = t, this._z = i, this._w = n, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(e) {
    return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this;
  }
  setFromEuler(e, t = !0) {
    const i = e._x, n = e._y, r = e._z, s = e._order, a = Math.cos, o = Math.sin, l = a(i / 2), c = a(n / 2), h = a(r / 2), d = o(i / 2), u = o(n / 2), p = o(r / 2);
    switch (s) {
      case "XYZ":
        this._x = d * c * h + l * u * p, this._y = l * u * h - d * c * p, this._z = l * c * p + d * u * h, this._w = l * c * h - d * u * p;
        break;
      case "YXZ":
        this._x = d * c * h + l * u * p, this._y = l * u * h - d * c * p, this._z = l * c * p - d * u * h, this._w = l * c * h + d * u * p;
        break;
      case "ZXY":
        this._x = d * c * h - l * u * p, this._y = l * u * h + d * c * p, this._z = l * c * p + d * u * h, this._w = l * c * h - d * u * p;
        break;
      case "ZYX":
        this._x = d * c * h - l * u * p, this._y = l * u * h + d * c * p, this._z = l * c * p - d * u * h, this._w = l * c * h + d * u * p;
        break;
      case "YZX":
        this._x = d * c * h + l * u * p, this._y = l * u * h + d * c * p, this._z = l * c * p - d * u * h, this._w = l * c * h - d * u * p;
        break;
      case "XZY":
        this._x = d * c * h - l * u * p, this._y = l * u * h - d * c * p, this._z = l * c * p + d * u * h, this._w = l * c * h + d * u * p;
        break;
      default:
        Se("Quaternion: .setFromEuler() encountered an unknown order: " + s);
    }
    return t === !0 && this._onChangeCallback(), this;
  }
  setFromAxisAngle(e, t) {
    const i = t / 2, n = Math.sin(i);
    return this._x = e.x * n, this._y = e.y * n, this._z = e.z * n, this._w = Math.cos(i), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e) {
    const t = e.elements, i = t[0], n = t[4], r = t[8], s = t[1], a = t[5], o = t[9], l = t[2], c = t[6], h = t[10], d = i + a + h;
    if (d > 0) {
      const u = 0.5 / Math.sqrt(d + 1);
      this._w = 0.25 / u, this._x = (c - o) * u, this._y = (r - l) * u, this._z = (s - n) * u;
    } else if (i > a && i > h) {
      const u = 2 * Math.sqrt(1 + i - a - h);
      this._w = (c - o) / u, this._x = 0.25 * u, this._y = (n + s) / u, this._z = (r + l) / u;
    } else if (a > h) {
      const u = 2 * Math.sqrt(1 + a - i - h);
      this._w = (r - l) / u, this._x = (n + s) / u, this._y = 0.25 * u, this._z = (o + c) / u;
    } else {
      const u = 2 * Math.sqrt(1 + h - i - a);
      this._w = (s - n) / u, this._x = (r + l) / u, this._y = (o + c) / u, this._z = 0.25 * u;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(e, t) {
    let i = e.dot(t) + 1;
    return i < 1e-8 ? (i = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = i) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = i)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = i), this.normalize();
  }
  angleTo(e) {
    return 2 * Math.acos(Math.abs(Be(this.dot(e), -1, 1)));
  }
  rotateTowards(e, t) {
    const i = this.angleTo(e);
    if (i === 0) return this;
    const n = Math.min(1, t / i);
    return this.slerp(e, n), this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  dot(e) {
    return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let e = this.length();
    return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this._onChangeCallback(), this;
  }
  multiply(e) {
    return this.multiplyQuaternions(this, e);
  }
  premultiply(e) {
    return this.multiplyQuaternions(e, this);
  }
  multiplyQuaternions(e, t) {
    const i = e._x, n = e._y, r = e._z, s = e._w, a = t._x, o = t._y, l = t._z, c = t._w;
    return this._x = i * c + s * a + n * l - r * o, this._y = n * c + s * o + r * a - i * l, this._z = r * c + s * l + i * o - n * a, this._w = s * c - i * a - n * o - r * l, this._onChangeCallback(), this;
  }
  slerp(e, t) {
    let i = e._x, n = e._y, r = e._z, s = e._w, a = this.dot(e);
    a < 0 && (i = -i, n = -n, r = -r, s = -s, a = -a);
    let o = 1 - t;
    if (a < 0.9995) {
      const l = Math.acos(a), c = Math.sin(l);
      o = Math.sin(o * l) / c, t = Math.sin(t * l) / c, this._x = this._x * o + i * t, this._y = this._y * o + n * t, this._z = this._z * o + r * t, this._w = this._w * o + s * t, this._onChangeCallback();
    } else
      this._x = this._x * o + i * t, this._y = this._y * o + n * t, this._z = this._z * o + r * t, this._w = this._w * o + s * t, this.normalize();
    return this;
  }
  slerpQuaternions(e, t, i) {
    return this.copy(e).slerp(t, i);
  }
  random() {
    const e = 2 * Math.PI * Math.random(), t = 2 * Math.PI * Math.random(), i = Math.random(), n = Math.sqrt(1 - i), r = Math.sqrt(i);
    return this.set(n * Math.sin(e), n * Math.cos(e), r * Math.sin(t), r * Math.cos(t));
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
  }
  fromArray(e, t = 0) {
    return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e;
  }
  fromBufferAttribute(e, t) {
    return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this._onChangeCallback(), this;
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}, N = class Xo {
  static {
    Xo.prototype.isVector3 = !0;
  }
  constructor(t = 0, i = 0, n = 0) {
    this.x = t, this.y = i, this.z = n;
  }
  set(t, i, n) {
    return n === void 0 && (n = this.z), this.x = t, this.y = i, this.z = n, this;
  }
  setScalar(t) {
    return this.x = t, this.y = t, this.z = t, this;
  }
  setX(t) {
    return this.x = t, this;
  }
  setY(t) {
    return this.y = t, this;
  }
  setZ(t) {
    return this.z = t, this;
  }
  setComponent(t, i) {
    switch (t) {
      case 0:
        this.x = i;
        break;
      case 1:
        this.y = i;
        break;
      case 2:
        this.z = i;
        break;
      default:
        throw new Error("THREE.Vector3: index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("THREE.Vector3: index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(t) {
    return this.x = t.x, this.y = t.y, this.z = t.z, this;
  }
  add(t) {
    return this.x += t.x, this.y += t.y, this.z += t.z, this;
  }
  addScalar(t) {
    return this.x += t, this.y += t, this.z += t, this;
  }
  addVectors(t, i) {
    return this.x = t.x + i.x, this.y = t.y + i.y, this.z = t.z + i.z, this;
  }
  addScaledVector(t, i) {
    return this.x += t.x * i, this.y += t.y * i, this.z += t.z * i, this;
  }
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this.z -= t.z, this;
  }
  subScalar(t) {
    return this.x -= t, this.y -= t, this.z -= t, this;
  }
  subVectors(t, i) {
    return this.x = t.x - i.x, this.y = t.y - i.y, this.z = t.z - i.z, this;
  }
  multiply(t) {
    return this.x *= t.x, this.y *= t.y, this.z *= t.z, this;
  }
  multiplyScalar(t) {
    return this.x *= t, this.y *= t, this.z *= t, this;
  }
  multiplyVectors(t, i) {
    return this.x = t.x * i.x, this.y = t.y * i.y, this.z = t.z * i.z, this;
  }
  applyEuler(t) {
    return this.applyQuaternion(ga.setFromEuler(t));
  }
  applyAxisAngle(t, i) {
    return this.applyQuaternion(ga.setFromAxisAngle(t, i));
  }
  applyMatrix3(t) {
    const i = this.x, n = this.y, r = this.z, s = t.elements;
    return this.x = s[0] * i + s[3] * n + s[6] * r, this.y = s[1] * i + s[4] * n + s[7] * r, this.z = s[2] * i + s[5] * n + s[8] * r, this;
  }
  applyNormalMatrix(t) {
    return this.applyMatrix3(t).normalize();
  }
  applyMatrix4(t) {
    const i = this.x, n = this.y, r = this.z, s = t.elements, a = 1 / (s[3] * i + s[7] * n + s[11] * r + s[15]);
    return this.x = (s[0] * i + s[4] * n + s[8] * r + s[12]) * a, this.y = (s[1] * i + s[5] * n + s[9] * r + s[13]) * a, this.z = (s[2] * i + s[6] * n + s[10] * r + s[14]) * a, this;
  }
  applyQuaternion(t) {
    const i = this.x, n = this.y, r = this.z, s = t.x, a = t.y, o = t.z, l = t.w, c = 2 * (a * r - o * n), h = 2 * (o * i - s * r), d = 2 * (s * n - a * i);
    return this.x = i + l * c + a * d - o * h, this.y = n + l * h + o * c - s * d, this.z = r + l * d + s * h - a * c, this;
  }
  project(t) {
    return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix);
  }
  unproject(t) {
    return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld);
  }
  transformDirection(t) {
    const i = this.x, n = this.y, r = this.z, s = t.elements;
    return this.x = s[0] * i + s[4] * n + s[8] * r, this.y = s[1] * i + s[5] * n + s[9] * r, this.z = s[2] * i + s[6] * n + s[10] * r, this.normalize();
  }
  divide(t) {
    return this.x /= t.x, this.y /= t.y, this.z /= t.z, this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  min(t) {
    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this;
  }
  max(t) {
    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this;
  }
  clamp(t, i) {
    return this.x = Be(this.x, t.x, i.x), this.y = Be(this.y, t.y, i.y), this.z = Be(this.z, t.z, i.z), this;
  }
  clampScalar(t, i) {
    return this.x = Be(this.x, t, i), this.y = Be(this.y, t, i), this.z = Be(this.z, t, i), this;
  }
  clampLength(t, i) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Be(n, t, i));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, i) {
    return this.x += (t.x - this.x) * i, this.y += (t.y - this.y) * i, this.z += (t.z - this.z) * i, this;
  }
  lerpVectors(t, i, n) {
    return this.x = t.x + (i.x - t.x) * n, this.y = t.y + (i.y - t.y) * n, this.z = t.z + (i.z - t.z) * n, this;
  }
  cross(t) {
    return this.crossVectors(this, t);
  }
  crossVectors(t, i) {
    const n = t.x, r = t.y, s = t.z, a = i.x, o = i.y, l = i.z;
    return this.x = r * l - s * o, this.y = s * a - n * l, this.z = n * o - r * a, this;
  }
  projectOnVector(t) {
    const i = t.lengthSq();
    if (i === 0) return this.set(0, 0, 0);
    const n = t.dot(this) / i;
    return this.copy(t).multiplyScalar(n);
  }
  projectOnPlane(t) {
    return ts.copy(this).projectOnVector(t), this.sub(ts);
  }
  reflect(t) {
    return this.sub(ts.copy(t).multiplyScalar(2 * this.dot(t)));
  }
  angleTo(t) {
    const i = Math.sqrt(this.lengthSq() * t.lengthSq());
    if (i === 0) return Math.PI / 2;
    const n = this.dot(t) / i;
    return Math.acos(Be(n, -1, 1));
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceToSquared(t));
  }
  distanceToSquared(t) {
    const i = this.x - t.x, n = this.y - t.y, r = this.z - t.z;
    return i * i + n * n + r * r;
  }
  manhattanDistanceTo(t) {
    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z);
  }
  setFromSpherical(t) {
    return this.setFromSphericalCoords(t.radius, t.phi, t.theta);
  }
  setFromSphericalCoords(t, i, n) {
    const r = Math.sin(i) * t;
    return this.x = r * Math.sin(n), this.y = Math.cos(i) * t, this.z = r * Math.cos(n), this;
  }
  setFromCylindrical(t) {
    return this.setFromCylindricalCoords(t.radius, t.theta, t.y);
  }
  setFromCylindricalCoords(t, i, n) {
    return this.x = t * Math.sin(i), this.y = n, this.z = t * Math.cos(i), this;
  }
  setFromMatrixPosition(t) {
    const i = t.elements;
    return this.x = i[12], this.y = i[13], this.z = i[14], this;
  }
  setFromMatrixScale(t) {
    const i = this.setFromMatrixColumn(t, 0).length(), n = this.setFromMatrixColumn(t, 1).length(), r = this.setFromMatrixColumn(t, 2).length();
    return this.x = i, this.y = n, this.z = r, this;
  }
  setFromMatrixColumn(t, i) {
    return this.fromArray(t.elements, i * 4);
  }
  setFromMatrix3Column(t, i) {
    return this.fromArray(t.elements, i * 3);
  }
  setFromEuler(t) {
    return this.x = t._x, this.y = t._y, this.z = t._z, this;
  }
  setFromColor(t) {
    return this.x = t.r, this.y = t.g, this.z = t.b, this;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y && t.z === this.z;
  }
  fromArray(t, i = 0) {
    return this.x = t[i], this.y = t[i + 1], this.z = t[i + 2], this;
  }
  toArray(t = [], i = 0) {
    return t[i] = this.x, t[i + 1] = this.y, t[i + 2] = this.z, t;
  }
  fromBufferAttribute(t, i) {
    return this.x = t.getX(i), this.y = t.getY(i), this.z = t.getZ(i), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  randomDirection() {
    const t = Math.random() * Math.PI * 2, i = Math.random() * 2 - 1, n = Math.sqrt(1 - i * i);
    return this.x = n * Math.cos(t), this.y = i, this.z = n * Math.sin(t), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
}, ts = /* @__PURE__ */ new N(), ga = /* @__PURE__ */ new $t(), Fe = class Ko {
  static {
    Ko.prototype.isMatrix3 = !0;
  }
  constructor(t, i, n, r, s, a, o, l, c) {
    this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], t !== void 0 && this.set(t, i, n, r, s, a, o, l, c);
  }
  set(t, i, n, r, s, a, o, l, c) {
    const h = this.elements;
    return h[0] = t, h[1] = r, h[2] = o, h[3] = i, h[4] = s, h[5] = l, h[6] = n, h[7] = a, h[8] = c, this;
  }
  identity() {
    return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
  }
  copy(t) {
    const i = this.elements, n = t.elements;
    return i[0] = n[0], i[1] = n[1], i[2] = n[2], i[3] = n[3], i[4] = n[4], i[5] = n[5], i[6] = n[6], i[7] = n[7], i[8] = n[8], this;
  }
  extractBasis(t, i, n) {
    return t.setFromMatrix3Column(this, 0), i.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this;
  }
  setFromMatrix4(t) {
    const i = t.elements;
    return this.set(i[0], i[4], i[8], i[1], i[5], i[9], i[2], i[6], i[10]), this;
  }
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, i) {
    const n = t.elements, r = i.elements, s = this.elements, a = n[0], o = n[3], l = n[6], c = n[1], h = n[4], d = n[7], u = n[2], p = n[5], v = n[8], b = r[0], m = r[3], f = r[6], T = r[1], A = r[4], M = r[7], E = r[2], R = r[5], C = r[8];
    return s[0] = a * b + o * T + l * E, s[3] = a * m + o * A + l * R, s[6] = a * f + o * M + l * C, s[1] = c * b + h * T + d * E, s[4] = c * m + h * A + d * R, s[7] = c * f + h * M + d * C, s[2] = u * b + p * T + v * E, s[5] = u * m + p * A + v * R, s[8] = u * f + p * M + v * C, this;
  }
  multiplyScalar(t) {
    const i = this.elements;
    return i[0] *= t, i[3] *= t, i[6] *= t, i[1] *= t, i[4] *= t, i[7] *= t, i[2] *= t, i[5] *= t, i[8] *= t, this;
  }
  determinant() {
    const t = this.elements, i = t[0], n = t[1], r = t[2], s = t[3], a = t[4], o = t[5], l = t[6], c = t[7], h = t[8];
    return i * a * h - i * o * c - n * s * h + n * o * l + r * s * c - r * a * l;
  }
  invert() {
    const t = this.elements, i = t[0], n = t[1], r = t[2], s = t[3], a = t[4], o = t[5], l = t[6], c = t[7], h = t[8], d = h * a - o * c, u = o * l - h * s, p = c * s - a * l, v = i * d + n * u + r * p;
    if (v === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const b = 1 / v;
    return t[0] = d * b, t[1] = (r * c - h * n) * b, t[2] = (o * n - r * a) * b, t[3] = u * b, t[4] = (h * i - r * l) * b, t[5] = (r * s - o * i) * b, t[6] = p * b, t[7] = (n * l - c * i) * b, t[8] = (a * i - n * s) * b, this;
  }
  transpose() {
    let t;
    const i = this.elements;
    return t = i[1], i[1] = i[3], i[3] = t, t = i[2], i[2] = i[6], i[6] = t, t = i[5], i[5] = i[7], i[7] = t, this;
  }
  getNormalMatrix(t) {
    return this.setFromMatrix4(t).invert().transpose();
  }
  transposeIntoArray(t) {
    const i = this.elements;
    return t[0] = i[0], t[1] = i[3], t[2] = i[6], t[3] = i[1], t[4] = i[4], t[5] = i[7], t[6] = i[2], t[7] = i[5], t[8] = i[8], this;
  }
  setUvTransform(t, i, n, r, s, a, o) {
    const l = Math.cos(s), c = Math.sin(s);
    return this.set(n * l, n * c, -n * (l * a + c * o) + a + t, -r * c, r * l, -r * (-c * a + l * o) + o + i, 0, 0, 1), this;
  }
  scale(t, i) {
    return mn("Matrix3: .scale() is deprecated. Use .makeScale() instead."), this.premultiply(is.makeScale(t, i)), this;
  }
  rotate(t) {
    return mn("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."), this.premultiply(is.makeRotation(-t)), this;
  }
  translate(t, i) {
    return mn("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."), this.premultiply(is.makeTranslation(t, i)), this;
  }
  makeTranslation(t, i) {
    return t.isVector2 ? this.set(1, 0, t.x, 0, 1, t.y, 0, 0, 1) : this.set(1, 0, t, 0, 1, i, 0, 0, 1), this;
  }
  makeRotation(t) {
    const i = Math.cos(t), n = Math.sin(t);
    return this.set(i, -n, 0, n, i, 0, 0, 0, 1), this;
  }
  makeScale(t, i) {
    return this.set(t, 0, 0, 0, i, 0, 0, 0, 1), this;
  }
  equals(t) {
    const i = this.elements, n = t.elements;
    for (let r = 0; r < 9; r++) if (i[r] !== n[r]) return !1;
    return !0;
  }
  fromArray(t, i = 0) {
    for (let n = 0; n < 9; n++) this.elements[n] = t[n + i];
    return this;
  }
  toArray(t = [], i = 0) {
    const n = this.elements;
    return t[i] = n[0], t[i + 1] = n[1], t[i + 2] = n[2], t[i + 3] = n[3], t[i + 4] = n[4], t[i + 5] = n[5], t[i + 6] = n[6], t[i + 7] = n[7], t[i + 8] = n[8], t;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}, is = /* @__PURE__ */ new Fe(), _a = /* @__PURE__ */ new Fe().set(0.4123908, 0.3575843, 0.1804808, 0.212639, 0.7151687, 0.0721923, 0.0193308, 0.1191948, 0.9505322), va = /* @__PURE__ */ new Fe().set(3.2409699, -1.5373832, -0.4986108, -0.9692436, 1.8759675, 0.0415551, 0.0556301, -0.203977, 1.0569715);
function Yc() {
  const e = {
    enabled: !0,
    workingColorSpace: Zt,
    spaces: {},
    convert: function(r, s, a) {
      return this.enabled === !1 || s === a || !s || !a || (this.spaces[s].transfer === "srgb" && (r.r = Si(r.r), r.g = Si(r.g), r.b = Si(r.b)), this.spaces[s].primaries !== this.spaces[a].primaries && (r.applyMatrix3(this.spaces[s].toXYZ), r.applyMatrix3(this.spaces[a].fromXYZ)), this.spaces[a].transfer === "srgb" && (r.r = gn(r.r), r.g = gn(r.g), r.b = gn(r.b))), r;
    },
    workingToColorSpace: function(r, s) {
      return this.convert(r, this.workingColorSpace, s);
    },
    colorSpaceToWorking: function(r, s) {
      return this.convert(r, s, this.workingColorSpace);
    },
    getPrimaries: function(r) {
      return this.spaces[r].primaries;
    },
    getTransfer: function(r) {
      return r === "" ? Br : this.spaces[r].transfer;
    },
    getToneMappingMode: function(r) {
      return this.spaces[r].outputColorSpaceConfig.toneMappingMode || "standard";
    },
    getLuminanceCoefficients: function(r, s = this.workingColorSpace) {
      return r.fromArray(this.spaces[s].luminanceCoefficients);
    },
    define: function(r) {
      Object.assign(this.spaces, r);
    },
    _getMatrix: function(r, s, a) {
      return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ);
    },
    _getDrawingBufferColorSpace: function(r) {
      return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace;
    },
    _getUnpackColorSpace: function(r = this.workingColorSpace) {
      return this.spaces[r].workingColorSpaceConfig.unpackColorSpace;
    },
    fromWorkingColorSpace: function(r, s) {
      return mn("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."), e.workingToColorSpace(r, s);
    },
    toWorkingColorSpace: function(r, s) {
      return mn("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."), e.colorSpaceToWorking(r, s);
    }
  }, t = [
    0.64,
    0.33,
    0.3,
    0.6,
    0.15,
    0.06
  ], i = [
    0.2126,
    0.7152,
    0.0722
  ], n = [0.3127, 0.329];
  return e.define({
    [Zt]: {
      primaries: t,
      whitePoint: n,
      transfer: Br,
      toXYZ: _a,
      fromXYZ: va,
      luminanceCoefficients: i,
      workingColorSpaceConfig: { unpackColorSpace: xt },
      outputColorSpaceConfig: { drawingBufferColorSpace: xt }
    },
    [xt]: {
      primaries: t,
      whitePoint: n,
      transfer: zr,
      toXYZ: _a,
      fromXYZ: va,
      luminanceCoefficients: i,
      outputColorSpaceConfig: { drawingBufferColorSpace: xt }
    }
  }), e;
}
var He = /* @__PURE__ */ Yc();
function Si(e) {
  return e < 0.04045 ? e * 0.0773993808 : Math.pow(e * 0.9478672986 + 0.0521327014, 2.4);
}
function gn(e) {
  return e < 31308e-7 ? e * 12.92 : 1.055 * Math.pow(e, 0.41666) - 0.055;
}
var Yi, Jc = class {
  static getDataURL(e, t = "image/png") {
    if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u") return e.src;
    let i;
    if (e instanceof HTMLCanvasElement) i = e;
    else {
      Yi === void 0 && (Yi = Zn("canvas")), Yi.width = e.width, Yi.height = e.height;
      const n = Yi.getContext("2d");
      e instanceof ImageData ? n.putImageData(e, 0, 0) : n.drawImage(e, 0, 0, e.width, e.height), i = Yi;
    }
    return i.toDataURL(t);
  }
  static sRGBToLinear(e) {
    if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
      const t = Zn("canvas");
      t.width = e.width, t.height = e.height;
      const i = t.getContext("2d");
      i.drawImage(e, 0, 0, e.width, e.height);
      const n = i.getImageData(0, 0, e.width, e.height), r = n.data;
      for (let s = 0; s < r.length; s++) r[s] = Si(r[s] / 255) * 255;
      return i.putImageData(n, 0, 0), t;
    } else if (e.data) {
      const t = e.data.slice(0);
      for (let i = 0; i < t.length; i++) t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[i] = Math.floor(Si(t[i] / 255) * 255) : t[i] = Si(t[i]);
      return {
        data: t,
        width: e.width,
        height: e.height
      };
    } else
      return Se("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
  }
}, Zc = 0, Xs = class {
  constructor(e = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: Zc++ }), this.uuid = Jt(), this.data = e, this.dataReady = !0, this.version = 0;
  }
  getSize(e) {
    const t = this.data;
    return typeof HTMLVideoElement < "u" && t instanceof HTMLVideoElement ? e.set(t.videoWidth, t.videoHeight, 0) : typeof VideoFrame < "u" && t instanceof VideoFrame ? e.set(t.displayWidth, t.displayHeight, 0) : t !== null ? e.set(t.width, t.height, t.depth || 0) : e.set(0, 0, 0), e;
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.images[this.uuid] !== void 0) return e.images[this.uuid];
    const i = {
      uuid: this.uuid,
      url: ""
    }, n = this.data;
    if (n !== null) {
      let r;
      if (Array.isArray(n)) {
        r = [];
        for (let s = 0, a = n.length; s < a; s++) n[s].isDataTexture ? r.push(ns(n[s].image)) : r.push(ns(n[s]));
      } else r = ns(n);
      i.url = r;
    }
    return t || (e.images[this.uuid] = i), i;
  }
};
function ns(e) {
  return typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap ? Jc.getDataURL(e) : e.data ? {
    data: Array.from(e.data),
    width: e.width,
    height: e.height,
    type: e.data.constructor.name
  } : (Se("Texture: Unable to serialize Texture."), {});
}
var $c = 0, rs = /* @__PURE__ */ new N(), Ut = class Dr extends Ui {
  constructor(t = Dr.DEFAULT_IMAGE, i = Dr.DEFAULT_MAPPING, n = oi, r = oi, s = It, a = qr, o = vn, l = Ni, c = Dr.DEFAULT_ANISOTROPY, h = "") {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: $c++ }), this.uuid = Jt(), this.name = "", this.source = new Xs(t), this.mipmaps = [], this.mapping = i, this.channel = 0, this.wrapS = n, this.wrapT = r, this.magFilter = s, this.minFilter = a, this.anisotropy = c, this.format = o, this.internalFormat = null, this.type = l, this.offset = new De(0, 0), this.repeat = new De(1, 1), this.center = new De(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Fe(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = h, this.userData = {}, this.updateRanges = [], this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = !1, this.isArrayTexture = !!(t && t.depth && t.depth > 1), this.pmremVersion = 0, this.normalized = !1;
  }
  get width() {
    return this.source.getSize(rs).x;
  }
  get height() {
    return this.source.getSize(rs).y;
  }
  get depth() {
    return this.source.getSize(rs).z;
  }
  get image() {
    return this.source.data;
  }
  set image(t) {
    this.source.data = t;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  addUpdateRange(t, i) {
    this.updateRanges.push({
      start: t,
      count: i
    });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.name = t.name, this.source = t.source, this.mipmaps = t.mipmaps.slice(0), this.mapping = t.mapping, this.channel = t.channel, this.wrapS = t.wrapS, this.wrapT = t.wrapT, this.magFilter = t.magFilter, this.minFilter = t.minFilter, this.anisotropy = t.anisotropy, this.format = t.format, this.internalFormat = t.internalFormat, this.type = t.type, this.normalized = t.normalized, this.offset.copy(t.offset), this.repeat.copy(t.repeat), this.center.copy(t.center), this.rotation = t.rotation, this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrix.copy(t.matrix), this.generateMipmaps = t.generateMipmaps, this.premultiplyAlpha = t.premultiplyAlpha, this.flipY = t.flipY, this.unpackAlignment = t.unpackAlignment, this.colorSpace = t.colorSpace, this.renderTarget = t.renderTarget, this.isRenderTargetTexture = t.isRenderTargetTexture, this.isArrayTexture = t.isArrayTexture, this.userData = JSON.parse(JSON.stringify(t.userData)), this.needsUpdate = !0, this;
  }
  setValues(t) {
    for (const i in t) {
      const n = t[i];
      if (n === void 0) {
        Se(`Texture.setValues(): parameter '${i}' has value of undefined.`);
        continue;
      }
      const r = this[i];
      if (r === void 0) {
        Se(`Texture.setValues(): property '${i}' does not exist.`);
        continue;
      }
      r && n && r.isVector2 && n.isVector2 || r && n && r.isVector3 && n.isVector3 || r && n && r.isMatrix3 && n.isMatrix3 ? r.copy(n) : this[i] = n;
    }
  }
  toJSON(t) {
    const i = t === void 0 || typeof t == "string";
    if (!i && t.textures[this.uuid] !== void 0) return t.textures[this.uuid];
    const n = {
      metadata: {
        version: 4.7,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(t).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      normalized: this.normalized,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    return Object.keys(this.userData).length > 0 && (n.userData = this.userData), i || (t.textures[this.uuid] = n), n;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv(t) {
    if (this.mapping !== 300) return t;
    if (t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1) switch (this.wrapS) {
      case Fr:
        t.x = t.x - Math.floor(t.x);
        break;
      case oi:
        t.x = t.x < 0 ? 0 : 1;
        break;
      case Or:
        Math.abs(Math.floor(t.x) % 2) === 1 ? t.x = Math.ceil(t.x) - t.x : t.x = t.x - Math.floor(t.x);
        break;
    }
    if (t.y < 0 || t.y > 1) switch (this.wrapT) {
      case Fr:
        t.y = t.y - Math.floor(t.y);
        break;
      case oi:
        t.y = t.y < 0 ? 0 : 1;
        break;
      case Or:
        Math.abs(Math.floor(t.y) % 2) === 1 ? t.y = Math.ceil(t.y) - t.y : t.y = t.y - Math.floor(t.y);
        break;
    }
    return this.flipY && (t.y = 1 - t.y), t;
  }
  set needsUpdate(t) {
    t === !0 && (this.version++, this.source.needsUpdate = !0);
  }
  set needsPMREMUpdate(t) {
    t === !0 && this.pmremVersion++;
  }
};
Ut.DEFAULT_IMAGE = null;
Ut.DEFAULT_MAPPING = 300;
Ut.DEFAULT_ANISOTROPY = 1;
var it = class jo {
  static {
    jo.prototype.isVector4 = !0;
  }
  constructor(t = 0, i = 0, n = 0, r = 1) {
    this.x = t, this.y = i, this.z = n, this.w = r;
  }
  get width() {
    return this.z;
  }
  set width(t) {
    this.z = t;
  }
  get height() {
    return this.w;
  }
  set height(t) {
    this.w = t;
  }
  set(t, i, n, r) {
    return this.x = t, this.y = i, this.z = n, this.w = r, this;
  }
  setScalar(t) {
    return this.x = t, this.y = t, this.z = t, this.w = t, this;
  }
  setX(t) {
    return this.x = t, this;
  }
  setY(t) {
    return this.y = t, this;
  }
  setZ(t) {
    return this.z = t, this;
  }
  setW(t) {
    return this.w = t, this;
  }
  setComponent(t, i) {
    switch (t) {
      case 0:
        this.x = i;
        break;
      case 1:
        this.y = i;
        break;
      case 2:
        this.z = i;
        break;
      case 3:
        this.w = i;
        break;
      default:
        throw new Error("THREE.Vector4: index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("THREE.Vector4: index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(t) {
    return this.x = t.x, this.y = t.y, this.z = t.z, this.w = t.w !== void 0 ? t.w : 1, this;
  }
  add(t) {
    return this.x += t.x, this.y += t.y, this.z += t.z, this.w += t.w, this;
  }
  addScalar(t) {
    return this.x += t, this.y += t, this.z += t, this.w += t, this;
  }
  addVectors(t, i) {
    return this.x = t.x + i.x, this.y = t.y + i.y, this.z = t.z + i.z, this.w = t.w + i.w, this;
  }
  addScaledVector(t, i) {
    return this.x += t.x * i, this.y += t.y * i, this.z += t.z * i, this.w += t.w * i, this;
  }
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this.z -= t.z, this.w -= t.w, this;
  }
  subScalar(t) {
    return this.x -= t, this.y -= t, this.z -= t, this.w -= t, this;
  }
  subVectors(t, i) {
    return this.x = t.x - i.x, this.y = t.y - i.y, this.z = t.z - i.z, this.w = t.w - i.w, this;
  }
  multiply(t) {
    return this.x *= t.x, this.y *= t.y, this.z *= t.z, this.w *= t.w, this;
  }
  multiplyScalar(t) {
    return this.x *= t, this.y *= t, this.z *= t, this.w *= t, this;
  }
  applyMatrix4(t) {
    const i = this.x, n = this.y, r = this.z, s = this.w, a = t.elements;
    return this.x = a[0] * i + a[4] * n + a[8] * r + a[12] * s, this.y = a[1] * i + a[5] * n + a[9] * r + a[13] * s, this.z = a[2] * i + a[6] * n + a[10] * r + a[14] * s, this.w = a[3] * i + a[7] * n + a[11] * r + a[15] * s, this;
  }
  divide(t) {
    return this.x /= t.x, this.y /= t.y, this.z /= t.z, this.w /= t.w, this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  setAxisAngleFromQuaternion(t) {
    this.w = 2 * Math.acos(t.w);
    const i = Math.sqrt(1 - t.w * t.w);
    return i < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = t.x / i, this.y = t.y / i, this.z = t.z / i), this;
  }
  setAxisAngleFromRotationMatrix(t) {
    let i, n, r, s;
    const l = t.elements, c = l[0], h = l[4], d = l[8], u = l[1], p = l[5], v = l[9], b = l[2], m = l[6], f = l[10];
    if (Math.abs(h - u) < 0.01 && Math.abs(d - b) < 0.01 && Math.abs(v - m) < 0.01) {
      if (Math.abs(h + u) < 0.1 && Math.abs(d + b) < 0.1 && Math.abs(v + m) < 0.1 && Math.abs(c + p + f - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      i = Math.PI;
      const A = (c + 1) / 2, M = (p + 1) / 2, E = (f + 1) / 2, R = (h + u) / 4, C = (d + b) / 4, g = (v + m) / 4;
      return A > M && A > E ? A < 0.01 ? (n = 0, r = 0.707106781, s = 0.707106781) : (n = Math.sqrt(A), r = R / n, s = C / n) : M > E ? M < 0.01 ? (n = 0.707106781, r = 0, s = 0.707106781) : (r = Math.sqrt(M), n = R / r, s = g / r) : E < 0.01 ? (n = 0.707106781, r = 0.707106781, s = 0) : (s = Math.sqrt(E), n = C / s, r = g / s), this.set(n, r, s, i), this;
    }
    let T = Math.sqrt((m - v) * (m - v) + (d - b) * (d - b) + (u - h) * (u - h));
    return Math.abs(T) < 1e-3 && (T = 1), this.x = (m - v) / T, this.y = (d - b) / T, this.z = (u - h) / T, this.w = Math.acos((c + p + f - 1) / 2), this;
  }
  setFromMatrixPosition(t) {
    const i = t.elements;
    return this.x = i[12], this.y = i[13], this.z = i[14], this.w = i[15], this;
  }
  min(t) {
    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this.w = Math.min(this.w, t.w), this;
  }
  max(t) {
    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this.w = Math.max(this.w, t.w), this;
  }
  clamp(t, i) {
    return this.x = Be(this.x, t.x, i.x), this.y = Be(this.y, t.y, i.y), this.z = Be(this.z, t.z, i.z), this.w = Be(this.w, t.w, i.w), this;
  }
  clampScalar(t, i) {
    return this.x = Be(this.x, t, i), this.y = Be(this.y, t, i), this.z = Be(this.z, t, i), this.w = Be(this.w, t, i), this;
  }
  clampLength(t, i) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Be(n, t, i));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, i) {
    return this.x += (t.x - this.x) * i, this.y += (t.y - this.y) * i, this.z += (t.z - this.z) * i, this.w += (t.w - this.w) * i, this;
  }
  lerpVectors(t, i, n) {
    return this.x = t.x + (i.x - t.x) * n, this.y = t.y + (i.y - t.y) * n, this.z = t.z + (i.z - t.z) * n, this.w = t.w + (i.w - t.w) * n, this;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w;
  }
  fromArray(t, i = 0) {
    return this.x = t[i], this.y = t[i + 1], this.z = t[i + 2], this.w = t[i + 3], this;
  }
  toArray(t = [], i = 0) {
    return t[i] = this.x, t[i + 1] = this.y, t[i + 2] = this.z, t[i + 3] = this.w, t;
  }
  fromBufferAttribute(t, i) {
    return this.x = t.getX(i), this.y = t.getY(i), this.z = t.getZ(i), this.w = t.getW(i), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
}, Qc = class extends Ui {
  constructor(e = 1, t = 1, i = {}) {
    super(), i = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: It,
      depthBuffer: !0,
      stencilBuffer: !1,
      resolveDepthBuffer: !0,
      resolveStencilBuffer: !0,
      depthTexture: null,
      samples: 0,
      count: 1,
      depth: 1,
      multiview: !1,
      useArrayDepthTexture: !1
    }, i), this.isRenderTarget = !0, this.width = e, this.height = t, this.depth = i.depth, this.scissor = new it(0, 0, e, t), this.scissorTest = !1, this.viewport = new it(0, 0, e, t), this.textures = [];
    const n = new Ut({
      width: e,
      height: t,
      depth: i.depth
    }), r = i.count;
    for (let s = 0; s < r; s++)
      this.textures[s] = n.clone(), this.textures[s].isRenderTargetTexture = !0, this.textures[s].renderTarget = this;
    this._setTextureOptions(i), this.depthBuffer = i.depthBuffer, this.stencilBuffer = i.stencilBuffer, this.resolveDepthBuffer = i.resolveDepthBuffer, this.resolveStencilBuffer = i.resolveStencilBuffer, this._depthTexture = null, this.depthTexture = i.depthTexture, this.samples = i.samples, this.multiview = i.multiview, this.useArrayDepthTexture = i.useArrayDepthTexture;
  }
  _setTextureOptions(e = {}) {
    const t = {
      minFilter: It,
      generateMipmaps: !1,
      flipY: !1,
      internalFormat: null
    };
    e.mapping !== void 0 && (t.mapping = e.mapping), e.wrapS !== void 0 && (t.wrapS = e.wrapS), e.wrapT !== void 0 && (t.wrapT = e.wrapT), e.wrapR !== void 0 && (t.wrapR = e.wrapR), e.magFilter !== void 0 && (t.magFilter = e.magFilter), e.minFilter !== void 0 && (t.minFilter = e.minFilter), e.format !== void 0 && (t.format = e.format), e.type !== void 0 && (t.type = e.type), e.anisotropy !== void 0 && (t.anisotropy = e.anisotropy), e.colorSpace !== void 0 && (t.colorSpace = e.colorSpace), e.flipY !== void 0 && (t.flipY = e.flipY), e.generateMipmaps !== void 0 && (t.generateMipmaps = e.generateMipmaps), e.internalFormat !== void 0 && (t.internalFormat = e.internalFormat);
    for (let i = 0; i < this.textures.length; i++) this.textures[i].setValues(t);
  }
  get texture() {
    return this.textures[0];
  }
  set texture(e) {
    this.textures[0] = e;
  }
  set depthTexture(e) {
    this._depthTexture !== null && (this._depthTexture.renderTarget = null), e !== null && (e.renderTarget = this), this._depthTexture = e;
  }
  get depthTexture() {
    return this._depthTexture;
  }
  setSize(e, t, i = 1) {
    if (this.width !== e || this.height !== t || this.depth !== i) {
      this.width = e, this.height = t, this.depth = i;
      for (let n = 0, r = this.textures.length; n < r; n++)
        this.textures[n].image.width = e, this.textures[n].image.height = t, this.textures[n].image.depth = i, this.textures[n].isData3DTexture !== !0 && (this.textures[n].isArrayTexture = this.textures[n].image.depth > 1);
      this.dispose();
    }
    this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.width = e.width, this.height = e.height, this.depth = e.depth, this.scissor.copy(e.scissor), this.scissorTest = e.scissorTest, this.viewport.copy(e.viewport), this.textures.length = 0;
    for (let t = 0, i = e.textures.length; t < i; t++) {
      this.textures[t] = e.textures[t].clone(), this.textures[t].isRenderTargetTexture = !0, this.textures[t].renderTarget = this;
      const n = Object.assign({}, e.textures[t].image);
      this.textures[t].source = new Xs(n);
    }
    return this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.resolveDepthBuffer = e.resolveDepthBuffer, this.resolveStencilBuffer = e.resolveStencilBuffer, e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()), this.samples = e.samples, this.multiview = e.multiview, this.useArrayDepthTexture = e.useArrayDepthTexture, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}, li = class extends Qc {
  constructor(e = 1, t = 1, i = {}) {
    super(e, t, i), this.isWebGLRenderTarget = !0;
  }
}, Yo = class extends Ut {
  constructor(e = null, t = 1, i = 1, n = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = {
      data: e,
      width: t,
      height: i,
      depth: n
    }, this.magFilter = Tt, this.minFilter = Tt, this.wrapR = oi, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
  }
  addLayerUpdate(e) {
    this.layerUpdates.add(e);
  }
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}, eh = class extends Ut {
  constructor(e = null, t = 1, i = 1, n = 1) {
    super(null), this.isData3DTexture = !0, this.image = {
      data: e,
      width: t,
      height: i,
      depth: n
    }, this.magFilter = Tt, this.minFilter = Tt, this.wrapR = oi, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}, Ge = class ks {
  static {
    ks.prototype.isMatrix4 = !0;
  }
  constructor(t, i, n, r, s, a, o, l, c, h, d, u, p, v, b, m) {
    this.elements = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ], t !== void 0 && this.set(t, i, n, r, s, a, o, l, c, h, d, u, p, v, b, m);
  }
  set(t, i, n, r, s, a, o, l, c, h, d, u, p, v, b, m) {
    const f = this.elements;
    return f[0] = t, f[4] = i, f[8] = n, f[12] = r, f[1] = s, f[5] = a, f[9] = o, f[13] = l, f[2] = c, f[6] = h, f[10] = d, f[14] = u, f[3] = p, f[7] = v, f[11] = b, f[15] = m, this;
  }
  identity() {
    return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  clone() {
    return new ks().fromArray(this.elements);
  }
  copy(t) {
    const i = this.elements, n = t.elements;
    return i[0] = n[0], i[1] = n[1], i[2] = n[2], i[3] = n[3], i[4] = n[4], i[5] = n[5], i[6] = n[6], i[7] = n[7], i[8] = n[8], i[9] = n[9], i[10] = n[10], i[11] = n[11], i[12] = n[12], i[13] = n[13], i[14] = n[14], i[15] = n[15], this;
  }
  copyPosition(t) {
    const i = this.elements, n = t.elements;
    return i[12] = n[12], i[13] = n[13], i[14] = n[14], this;
  }
  setFromMatrix3(t) {
    const i = t.elements;
    return this.set(i[0], i[3], i[6], 0, i[1], i[4], i[7], 0, i[2], i[5], i[8], 0, 0, 0, 0, 1), this;
  }
  extractBasis(t, i, n) {
    return this.determinantAffine() === 0 ? (t.set(1, 0, 0), i.set(0, 1, 0), n.set(0, 0, 1), this) : (t.setFromMatrixColumn(this, 0), i.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this);
  }
  makeBasis(t, i, n) {
    return this.set(t.x, i.x, n.x, 0, t.y, i.y, n.y, 0, t.z, i.z, n.z, 0, 0, 0, 0, 1), this;
  }
  extractRotation(t) {
    if (t.determinantAffine() === 0) return this.identity();
    const i = this.elements, n = t.elements, r = 1 / Ji.setFromMatrixColumn(t, 0).length(), s = 1 / Ji.setFromMatrixColumn(t, 1).length(), a = 1 / Ji.setFromMatrixColumn(t, 2).length();
    return i[0] = n[0] * r, i[1] = n[1] * r, i[2] = n[2] * r, i[3] = 0, i[4] = n[4] * s, i[5] = n[5] * s, i[6] = n[6] * s, i[7] = 0, i[8] = n[8] * a, i[9] = n[9] * a, i[10] = n[10] * a, i[11] = 0, i[12] = 0, i[13] = 0, i[14] = 0, i[15] = 1, this;
  }
  makeRotationFromEuler(t) {
    const i = this.elements, n = t.x, r = t.y, s = t.z, a = Math.cos(n), o = Math.sin(n), l = Math.cos(r), c = Math.sin(r), h = Math.cos(s), d = Math.sin(s);
    if (t.order === "XYZ") {
      const u = a * h, p = a * d, v = o * h, b = o * d;
      i[0] = l * h, i[4] = -l * d, i[8] = c, i[1] = p + v * c, i[5] = u - b * c, i[9] = -o * l, i[2] = b - u * c, i[6] = v + p * c, i[10] = a * l;
    } else if (t.order === "YXZ") {
      const u = l * h, p = l * d, v = c * h, b = c * d;
      i[0] = u + b * o, i[4] = v * o - p, i[8] = a * c, i[1] = a * d, i[5] = a * h, i[9] = -o, i[2] = p * o - v, i[6] = b + u * o, i[10] = a * l;
    } else if (t.order === "ZXY") {
      const u = l * h, p = l * d, v = c * h, b = c * d;
      i[0] = u - b * o, i[4] = -a * d, i[8] = v + p * o, i[1] = p + v * o, i[5] = a * h, i[9] = b - u * o, i[2] = -a * c, i[6] = o, i[10] = a * l;
    } else if (t.order === "ZYX") {
      const u = a * h, p = a * d, v = o * h, b = o * d;
      i[0] = l * h, i[4] = v * c - p, i[8] = u * c + b, i[1] = l * d, i[5] = b * c + u, i[9] = p * c - v, i[2] = -c, i[6] = o * l, i[10] = a * l;
    } else if (t.order === "YZX") {
      const u = a * l, p = a * c, v = o * l, b = o * c;
      i[0] = l * h, i[4] = b - u * d, i[8] = v * d + p, i[1] = d, i[5] = a * h, i[9] = -o * h, i[2] = -c * h, i[6] = p * d + v, i[10] = u - b * d;
    } else if (t.order === "XZY") {
      const u = a * l, p = a * c, v = o * l, b = o * c;
      i[0] = l * h, i[4] = -d, i[8] = c * h, i[1] = u * d + b, i[5] = a * h, i[9] = p * d - v, i[2] = v * d - p, i[6] = o * h, i[10] = b * d + u;
    }
    return i[3] = 0, i[7] = 0, i[11] = 0, i[12] = 0, i[13] = 0, i[14] = 0, i[15] = 1, this;
  }
  makeRotationFromQuaternion(t) {
    return this.compose(th, t, ih);
  }
  lookAt(t, i, n) {
    const r = this.elements;
    return Ot.subVectors(t, i), Ot.lengthSq() === 0 && (Ot.z = 1), Ot.normalize(), Ti.crossVectors(n, Ot), Ti.lengthSq() === 0 && (Math.abs(n.z) === 1 ? Ot.x += 1e-4 : Ot.z += 1e-4, Ot.normalize(), Ti.crossVectors(n, Ot)), Ti.normalize(), nr.crossVectors(Ot, Ti), r[0] = Ti.x, r[4] = nr.x, r[8] = Ot.x, r[1] = Ti.y, r[5] = nr.y, r[9] = Ot.y, r[2] = Ti.z, r[6] = nr.z, r[10] = Ot.z, this;
  }
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, i) {
    const n = t.elements, r = i.elements, s = this.elements, a = n[0], o = n[4], l = n[8], c = n[12], h = n[1], d = n[5], u = n[9], p = n[13], v = n[2], b = n[6], m = n[10], f = n[14], T = n[3], A = n[7], M = n[11], E = n[15], R = r[0], C = r[4], g = r[8], y = r[12], B = r[1], w = r[5], k = r[9], X = r[13], q = r[2], G = r[6], K = r[10], O = r[14], te = r[3], $ = r[7], ie = r[11], ue = r[15];
    return s[0] = a * R + o * B + l * q + c * te, s[4] = a * C + o * w + l * G + c * $, s[8] = a * g + o * k + l * K + c * ie, s[12] = a * y + o * X + l * O + c * ue, s[1] = h * R + d * B + u * q + p * te, s[5] = h * C + d * w + u * G + p * $, s[9] = h * g + d * k + u * K + p * ie, s[13] = h * y + d * X + u * O + p * ue, s[2] = v * R + b * B + m * q + f * te, s[6] = v * C + b * w + m * G + f * $, s[10] = v * g + b * k + m * K + f * ie, s[14] = v * y + b * X + m * O + f * ue, s[3] = T * R + A * B + M * q + E * te, s[7] = T * C + A * w + M * G + E * $, s[11] = T * g + A * k + M * K + E * ie, s[15] = T * y + A * X + M * O + E * ue, this;
  }
  multiplyScalar(t) {
    const i = this.elements;
    return i[0] *= t, i[4] *= t, i[8] *= t, i[12] *= t, i[1] *= t, i[5] *= t, i[9] *= t, i[13] *= t, i[2] *= t, i[6] *= t, i[10] *= t, i[14] *= t, i[3] *= t, i[7] *= t, i[11] *= t, i[15] *= t, this;
  }
  determinant() {
    const t = this.elements, i = t[0], n = t[4], r = t[8], s = t[12], a = t[1], o = t[5], l = t[9], c = t[13], h = t[2], d = t[6], u = t[10], p = t[14], v = t[3], b = t[7], m = t[11], f = t[15], T = l * p - c * u, A = o * p - c * d, M = o * u - l * d, E = a * p - c * h, R = a * u - l * h, C = a * d - o * h;
    return i * (b * T - m * A + f * M) - n * (v * T - m * E + f * R) + r * (v * A - b * E + f * C) - s * (v * M - b * R + m * C);
  }
  determinantAffine() {
    const t = this.elements, i = t[0], n = t[4], r = t[8], s = t[1], a = t[5], o = t[9], l = t[2], c = t[6], h = t[10];
    return i * (a * h - o * c) - n * (s * h - o * l) + r * (s * c - a * l);
  }
  transpose() {
    const t = this.elements;
    let i;
    return i = t[1], t[1] = t[4], t[4] = i, i = t[2], t[2] = t[8], t[8] = i, i = t[6], t[6] = t[9], t[9] = i, i = t[3], t[3] = t[12], t[12] = i, i = t[7], t[7] = t[13], t[13] = i, i = t[11], t[11] = t[14], t[14] = i, this;
  }
  setPosition(t, i, n) {
    const r = this.elements;
    return t.isVector3 ? (r[12] = t.x, r[13] = t.y, r[14] = t.z) : (r[12] = t, r[13] = i, r[14] = n), this;
  }
  invert() {
    const t = this.elements, i = t[0], n = t[1], r = t[2], s = t[3], a = t[4], o = t[5], l = t[6], c = t[7], h = t[8], d = t[9], u = t[10], p = t[11], v = t[12], b = t[13], m = t[14], f = t[15], T = i * o - n * a, A = i * l - r * a, M = i * c - s * a, E = n * l - r * o, R = n * c - s * o, C = r * c - s * l, g = h * b - d * v, y = h * m - u * v, B = h * f - p * v, w = d * m - u * b, k = d * f - p * b, X = u * f - p * m, q = T * X - A * k + M * w + E * B - R * y + C * g;
    if (q === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const G = 1 / q;
    return t[0] = (o * X - l * k + c * w) * G, t[1] = (r * k - n * X - s * w) * G, t[2] = (b * C - m * R + f * E) * G, t[3] = (u * R - d * C - p * E) * G, t[4] = (l * B - a * X - c * y) * G, t[5] = (i * X - r * B + s * y) * G, t[6] = (m * M - v * C - f * A) * G, t[7] = (h * C - u * M + p * A) * G, t[8] = (a * k - o * B + c * g) * G, t[9] = (n * B - i * k - s * g) * G, t[10] = (v * R - b * M + f * T) * G, t[11] = (d * M - h * R - p * T) * G, t[12] = (o * y - a * w - l * g) * G, t[13] = (i * w - n * y + r * g) * G, t[14] = (b * A - v * E - m * T) * G, t[15] = (h * E - d * A + u * T) * G, this;
  }
  scale(t) {
    const i = this.elements, n = t.x, r = t.y, s = t.z;
    return i[0] *= n, i[4] *= r, i[8] *= s, i[1] *= n, i[5] *= r, i[9] *= s, i[2] *= n, i[6] *= r, i[10] *= s, i[3] *= n, i[7] *= r, i[11] *= s, this;
  }
  getMaxScaleOnAxis() {
    const t = this.elements, i = t[0] * t[0] + t[1] * t[1] + t[2] * t[2], n = t[4] * t[4] + t[5] * t[5] + t[6] * t[6], r = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
    return Math.sqrt(Math.max(i, n, r));
  }
  makeTranslation(t, i, n) {
    return t.isVector3 ? this.set(1, 0, 0, t.x, 0, 1, 0, t.y, 0, 0, 1, t.z, 0, 0, 0, 1) : this.set(1, 0, 0, t, 0, 1, 0, i, 0, 0, 1, n, 0, 0, 0, 1), this;
  }
  makeRotationX(t) {
    const i = Math.cos(t), n = Math.sin(t);
    return this.set(1, 0, 0, 0, 0, i, -n, 0, 0, n, i, 0, 0, 0, 0, 1), this;
  }
  makeRotationY(t) {
    const i = Math.cos(t), n = Math.sin(t);
    return this.set(i, 0, n, 0, 0, 1, 0, 0, -n, 0, i, 0, 0, 0, 0, 1), this;
  }
  makeRotationZ(t) {
    const i = Math.cos(t), n = Math.sin(t);
    return this.set(i, -n, 0, 0, n, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  makeRotationAxis(t, i) {
    const n = Math.cos(i), r = Math.sin(i), s = 1 - n, a = t.x, o = t.y, l = t.z, c = s * a, h = s * o;
    return this.set(c * a + n, c * o - r * l, c * l + r * o, 0, c * o + r * l, h * o + n, h * l - r * a, 0, c * l - r * o, h * l + r * a, s * l * l + n, 0, 0, 0, 0, 1), this;
  }
  makeScale(t, i, n) {
    return this.set(t, 0, 0, 0, 0, i, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this;
  }
  makeShear(t, i, n, r, s, a) {
    return this.set(1, n, s, 0, t, 1, a, 0, i, r, 1, 0, 0, 0, 0, 1), this;
  }
  compose(t, i, n) {
    const r = this.elements, s = i._x, a = i._y, o = i._z, l = i._w, c = s + s, h = a + a, d = o + o, u = s * c, p = s * h, v = s * d, b = a * h, m = a * d, f = o * d, T = l * c, A = l * h, M = l * d, E = n.x, R = n.y, C = n.z;
    return r[0] = (1 - (b + f)) * E, r[1] = (p + M) * E, r[2] = (v - A) * E, r[3] = 0, r[4] = (p - M) * R, r[5] = (1 - (u + f)) * R, r[6] = (m + T) * R, r[7] = 0, r[8] = (v + A) * C, r[9] = (m - T) * C, r[10] = (1 - (u + b)) * C, r[11] = 0, r[12] = t.x, r[13] = t.y, r[14] = t.z, r[15] = 1, this;
  }
  decompose(t, i, n) {
    const r = this.elements;
    t.x = r[12], t.y = r[13], t.z = r[14];
    const s = this.determinantAffine();
    if (s === 0)
      return n.set(1, 1, 1), i.identity(), this;
    let a = Ji.set(r[0], r[1], r[2]).length();
    const o = Ji.set(r[4], r[5], r[6]).length(), l = Ji.set(r[8], r[9], r[10]).length();
    s < 0 && (a = -a), Xt.copy(this);
    const c = 1 / a, h = 1 / o, d = 1 / l;
    return Xt.elements[0] *= c, Xt.elements[1] *= c, Xt.elements[2] *= c, Xt.elements[4] *= h, Xt.elements[5] *= h, Xt.elements[6] *= h, Xt.elements[8] *= d, Xt.elements[9] *= d, Xt.elements[10] *= d, i.setFromRotationMatrix(Xt), n.x = a, n.y = o, n.z = l, this;
  }
  makePerspective(t, i, n, r, s, a, o = bn, l = !1) {
    const c = this.elements, h = 2 * s / (i - t), d = 2 * s / (n - r), u = (i + t) / (i - t), p = (n + r) / (n - r);
    let v, b;
    if (l)
      v = s / (a - s), b = a * s / (a - s);
    else if (o === 2e3)
      v = -(a + s) / (a - s), b = -2 * a * s / (a - s);
    else if (o === 2001)
      v = -a / (a - s), b = -a * s / (a - s);
    else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + o);
    return c[0] = h, c[4] = 0, c[8] = u, c[12] = 0, c[1] = 0, c[5] = d, c[9] = p, c[13] = 0, c[2] = 0, c[6] = 0, c[10] = v, c[14] = b, c[3] = 0, c[7] = 0, c[11] = -1, c[15] = 0, this;
  }
  makeOrthographic(t, i, n, r, s, a, o = bn, l = !1) {
    const c = this.elements, h = 2 / (i - t), d = 2 / (n - r), u = -(i + t) / (i - t), p = -(n + r) / (n - r);
    let v, b;
    if (l)
      v = 1 / (a - s), b = a / (a - s);
    else if (o === 2e3)
      v = -2 / (a - s), b = -(a + s) / (a - s);
    else if (o === 2001)
      v = -1 / (a - s), b = -s / (a - s);
    else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + o);
    return c[0] = h, c[4] = 0, c[8] = 0, c[12] = u, c[1] = 0, c[5] = d, c[9] = 0, c[13] = p, c[2] = 0, c[6] = 0, c[10] = v, c[14] = b, c[3] = 0, c[7] = 0, c[11] = 0, c[15] = 1, this;
  }
  equals(t) {
    const i = this.elements, n = t.elements;
    for (let r = 0; r < 16; r++) if (i[r] !== n[r]) return !1;
    return !0;
  }
  fromArray(t, i = 0) {
    for (let n = 0; n < 16; n++) this.elements[n] = t[n + i];
    return this;
  }
  toArray(t = [], i = 0) {
    const n = this.elements;
    return t[i] = n[0], t[i + 1] = n[1], t[i + 2] = n[2], t[i + 3] = n[3], t[i + 4] = n[4], t[i + 5] = n[5], t[i + 6] = n[6], t[i + 7] = n[7], t[i + 8] = n[8], t[i + 9] = n[9], t[i + 10] = n[10], t[i + 11] = n[11], t[i + 12] = n[12], t[i + 13] = n[13], t[i + 14] = n[14], t[i + 15] = n[15], t;
  }
}, Ji = /* @__PURE__ */ new N(), Xt = /* @__PURE__ */ new Ge(), th = /* @__PURE__ */ new N(0, 0, 0), ih = /* @__PURE__ */ new N(1, 1, 1), Ti = /* @__PURE__ */ new N(), nr = /* @__PURE__ */ new N(), Ot = /* @__PURE__ */ new N(), ba = /* @__PURE__ */ new Ge(), Ma = /* @__PURE__ */ new $t(), Sn = class Jo {
  constructor(t = 0, i = 0, n = 0, r = Jo.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = t, this._y = i, this._z = n, this._order = r;
  }
  get x() {
    return this._x;
  }
  set x(t) {
    this._x = t, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(t) {
    this._y = t, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(t) {
    this._z = t, this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(t) {
    this._order = t, this._onChangeCallback();
  }
  set(t, i, n, r = this._order) {
    return this._x = t, this._y = i, this._z = n, this._order = r, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(t) {
    return this._x = t._x, this._y = t._y, this._z = t._z, this._order = t._order, this._onChangeCallback(), this;
  }
  setFromRotationMatrix(t, i = this._order, n = !0) {
    const r = t.elements, s = r[0], a = r[4], o = r[8], l = r[1], c = r[5], h = r[9], d = r[2], u = r[6], p = r[10];
    switch (i) {
      case "XYZ":
        this._y = Math.asin(Be(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(-h, p), this._z = Math.atan2(-a, s)) : (this._x = Math.atan2(u, c), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-Be(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._y = Math.atan2(o, p), this._z = Math.atan2(l, c)) : (this._y = Math.atan2(-d, s), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(Be(u, -1, 1)), Math.abs(u) < 0.9999999 ? (this._y = Math.atan2(-d, p), this._z = Math.atan2(-a, c)) : (this._y = 0, this._z = Math.atan2(l, s));
        break;
      case "ZYX":
        this._y = Math.asin(-Be(d, -1, 1)), Math.abs(d) < 0.9999999 ? (this._x = Math.atan2(u, p), this._z = Math.atan2(l, s)) : (this._x = 0, this._z = Math.atan2(-a, c));
        break;
      case "YZX":
        this._z = Math.asin(Be(l, -1, 1)), Math.abs(l) < 0.9999999 ? (this._x = Math.atan2(-h, c), this._y = Math.atan2(-d, s)) : (this._x = 0, this._y = Math.atan2(o, p));
        break;
      case "XZY":
        this._z = Math.asin(-Be(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(u, c), this._y = Math.atan2(o, s)) : (this._x = Math.atan2(-h, p), this._y = 0);
        break;
      default:
        Se("Euler: .setFromRotationMatrix() encountered an unknown order: " + i);
    }
    return this._order = i, n === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(t, i, n) {
    return ba.makeRotationFromQuaternion(t), this.setFromRotationMatrix(ba, i, n);
  }
  setFromVector3(t, i = this._order) {
    return this.set(t.x, t.y, t.z, i);
  }
  reorder(t) {
    return Ma.setFromEuler(this), this.setFromQuaternion(Ma, t);
  }
  equals(t) {
    return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order;
  }
  fromArray(t) {
    return this._x = t[0], this._y = t[1], this._z = t[2], t[3] !== void 0 && (this._order = t[3]), this._onChangeCallback(), this;
  }
  toArray(t = [], i = 0) {
    return t[i] = this._x, t[i + 1] = this._y, t[i + 2] = this._z, t[i + 3] = this._order, t;
  }
  _onChange(t) {
    return this._onChangeCallback = t, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
};
Sn.DEFAULT_ORDER = "XYZ";
var Zo = class {
  constructor() {
    this.mask = 1;
  }
  set(e) {
    this.mask = (1 << e | 0) >>> 0;
  }
  enable(e) {
    this.mask |= 1 << e | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(e) {
    this.mask ^= 1 << e | 0;
  }
  disable(e) {
    this.mask &= ~(1 << e | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(e) {
    return (this.mask & e.mask) !== 0;
  }
  isEnabled(e) {
    return (this.mask & (1 << e | 0)) !== 0;
  }
}, nh = 0, xa = /* @__PURE__ */ new N(), Zi = /* @__PURE__ */ new $t(), mi = /* @__PURE__ */ new Ge(), rr = /* @__PURE__ */ new N(), Dn = /* @__PURE__ */ new N(), rh = /* @__PURE__ */ new N(), sh = /* @__PURE__ */ new $t(), Sa = /* @__PURE__ */ new N(1, 0, 0), ya = /* @__PURE__ */ new N(0, 1, 0), Ea = /* @__PURE__ */ new N(0, 0, 1), Ta = { type: "added" }, ah = { type: "removed" }, $i = {
  type: "childadded",
  child: null
}, ss = {
  type: "childremoved",
  child: null
}, dt = class Ir extends Ui {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: nh++ }), this.uuid = Jt(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = Ir.DEFAULT_UP.clone();
    const t = new N(), i = new Sn(), n = new $t(), r = new N(1, 1, 1);
    function s() {
      n.setFromEuler(i, !1);
    }
    function a() {
      i.setFromQuaternion(n, void 0, !1);
    }
    i._onChange(s), n._onChange(a), Object.defineProperties(this, {
      position: {
        configurable: !0,
        enumerable: !0,
        value: t
      },
      rotation: {
        configurable: !0,
        enumerable: !0,
        value: i
      },
      quaternion: {
        configurable: !0,
        enumerable: !0,
        value: n
      },
      scale: {
        configurable: !0,
        enumerable: !0,
        value: r
      },
      modelViewMatrix: { value: new Ge() },
      normalMatrix: { value: new Fe() }
    }), this.matrix = new Ge(), this.matrixWorld = new Ge(), this.matrixAutoUpdate = Ir.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = Ir.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new Zo(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.customDepthMaterial = void 0, this.customDistanceMaterial = void 0, this.static = !1, this.userData = {}, this.pivot = null;
  }
  onBeforeShadow() {
  }
  onAfterShadow() {
  }
  onBeforeRender() {
  }
  onAfterRender() {
  }
  applyMatrix4(t) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(t), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(t) {
    return this.quaternion.premultiply(t), this;
  }
  setRotationFromAxisAngle(t, i) {
    this.quaternion.setFromAxisAngle(t, i);
  }
  setRotationFromEuler(t) {
    this.quaternion.setFromEuler(t, !0);
  }
  setRotationFromMatrix(t) {
    this.quaternion.setFromRotationMatrix(t);
  }
  setRotationFromQuaternion(t) {
    this.quaternion.copy(t);
  }
  rotateOnAxis(t, i) {
    return Zi.setFromAxisAngle(t, i), this.quaternion.multiply(Zi), this;
  }
  rotateOnWorldAxis(t, i) {
    return Zi.setFromAxisAngle(t, i), this.quaternion.premultiply(Zi), this;
  }
  rotateX(t) {
    return this.rotateOnAxis(Sa, t);
  }
  rotateY(t) {
    return this.rotateOnAxis(ya, t);
  }
  rotateZ(t) {
    return this.rotateOnAxis(Ea, t);
  }
  translateOnAxis(t, i) {
    return xa.copy(t).applyQuaternion(this.quaternion), this.position.add(xa.multiplyScalar(i)), this;
  }
  translateX(t) {
    return this.translateOnAxis(Sa, t);
  }
  translateY(t) {
    return this.translateOnAxis(ya, t);
  }
  translateZ(t) {
    return this.translateOnAxis(Ea, t);
  }
  localToWorld(t) {
    return this.updateWorldMatrix(!0, !1), t.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(t) {
    return this.updateWorldMatrix(!0, !1), t.applyMatrix4(mi.copy(this.matrixWorld).invert());
  }
  lookAt(t, i, n) {
    t.isVector3 ? rr.copy(t) : rr.set(t, i, n);
    const r = this.parent;
    this.updateWorldMatrix(!0, !1), Dn.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? mi.lookAt(Dn, rr, this.up) : mi.lookAt(rr, Dn, this.up), this.quaternion.setFromRotationMatrix(mi), r && (mi.extractRotation(r.matrixWorld), Zi.setFromRotationMatrix(mi), this.quaternion.premultiply(Zi.invert()));
  }
  add(t) {
    if (arguments.length > 1) {
      for (let i = 0; i < arguments.length; i++) this.add(arguments[i]);
      return this;
    }
    return t === this ? (Le("Object3D.add: object can't be added as a child of itself.", t), this) : (t && t.isObject3D ? (t.removeFromParent(), t.parent = this, this.children.push(t), t.dispatchEvent(Ta), $i.child = t, this.dispatchEvent($i), $i.child = null) : Le("Object3D.add: object not an instance of THREE.Object3D.", t), this);
  }
  remove(t) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++) this.remove(arguments[n]);
      return this;
    }
    const i = this.children.indexOf(t);
    return i !== -1 && (t.parent = null, this.children.splice(i, 1), t.dispatchEvent(ah), ss.child = t, this.dispatchEvent(ss), ss.child = null), this;
  }
  removeFromParent() {
    const t = this.parent;
    return t !== null && t.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(t) {
    return this.updateWorldMatrix(!0, !1), mi.copy(this.matrixWorld).invert(), t.parent !== null && (t.parent.updateWorldMatrix(!0, !1), mi.multiply(t.parent.matrixWorld)), t.applyMatrix4(mi), t.removeFromParent(), t.parent = this, this.children.push(t), t.updateWorldMatrix(!1, !0), t.dispatchEvent(Ta), $i.child = t, this.dispatchEvent($i), $i.child = null, this;
  }
  getObjectById(t) {
    return this.getObjectByProperty("id", t);
  }
  getObjectByName(t) {
    return this.getObjectByProperty("name", t);
  }
  getObjectByProperty(t, i) {
    if (this[t] === i) return this;
    for (let n = 0, r = this.children.length; n < r; n++) {
      const s = this.children[n].getObjectByProperty(t, i);
      if (s !== void 0) return s;
    }
  }
  getObjectsByProperty(t, i, n = []) {
    this[t] === i && n.push(this);
    const r = this.children;
    for (let s = 0, a = r.length; s < a; s++) r[s].getObjectsByProperty(t, i, n);
    return n;
  }
  getWorldPosition(t) {
    return this.updateWorldMatrix(!0, !1), t.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(t) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Dn, t, rh), t;
  }
  getWorldScale(t) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Dn, sh, t), t;
  }
  getWorldDirection(t) {
    this.updateWorldMatrix(!0, !1);
    const i = this.matrixWorld.elements;
    return t.set(i[8], i[9], i[10]).normalize();
  }
  raycast() {
  }
  traverse(t) {
    t(this);
    const i = this.children;
    for (let n = 0, r = i.length; n < r; n++) i[n].traverse(t);
  }
  traverseVisible(t) {
    if (this.visible === !1) return;
    t(this);
    const i = this.children;
    for (let n = 0, r = i.length; n < r; n++) i[n].traverseVisible(t);
  }
  traverseAncestors(t) {
    const i = this.parent;
    i !== null && (t(i), i.traverseAncestors(t));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale);
    const t = this.pivot;
    if (t !== null) {
      const i = t.x, n = t.y, r = t.z, s = this.matrix.elements;
      s[12] += i - s[0] * i - s[4] * n - s[8] * r, s[13] += n - s[1] * i - s[5] * n - s[9] * r, s[14] += r - s[2] * i - s[6] * n - s[10] * r;
    }
    this.matrixWorldNeedsUpdate = !0;
  }
  updateMatrixWorld(t) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || t) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, t = !0);
    const i = this.children;
    for (let n = 0, r = i.length; n < r; n++) i[n].updateMatrixWorld(t);
  }
  updateWorldMatrix(t, i, n = !1) {
    const r = this.parent;
    if (t === !0 && r !== null && r.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || n) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, n = !0), i === !0) {
      const s = this.children;
      for (let a = 0, o = s.length; a < o; a++) s[a].updateWorldMatrix(!1, !0, n);
    }
  }
  toJSON(t) {
    const i = t === void 0 || typeof t == "string", n = {};
    i && (t = {
      geometries: {},
      materials: {},
      textures: {},
      images: {},
      shapes: {},
      skeletons: {},
      animations: {},
      nodes: {}
    }, n.metadata = {
      version: 4.7,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const r = {};
    r.uuid = this.uuid, r.type = this.type, this.name !== "" && (r.name = this.name), this.castShadow === !0 && (r.castShadow = !0), this.receiveShadow === !0 && (r.receiveShadow = !0), this.visible === !1 && (r.visible = !1), this.frustumCulled === !1 && (r.frustumCulled = !1), this.renderOrder !== 0 && (r.renderOrder = this.renderOrder), this.static !== !1 && (r.static = this.static), Object.keys(this.userData).length > 0 && (r.userData = this.userData), r.layers = this.layers.mask, r.matrix = this.matrix.toArray(), r.up = this.up.toArray(), this.pivot !== null && (r.pivot = this.pivot.toArray()), this.matrixAutoUpdate === !1 && (r.matrixAutoUpdate = !1), this.morphTargetDictionary !== void 0 && (r.morphTargetDictionary = Object.assign({}, this.morphTargetDictionary)), this.morphTargetInfluences !== void 0 && (r.morphTargetInfluences = this.morphTargetInfluences.slice()), this.isInstancedMesh && (r.type = "InstancedMesh", r.count = this.count, r.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (r.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (r.type = "BatchedMesh", r.perObjectFrustumCulled = this.perObjectFrustumCulled, r.sortObjects = this.sortObjects, r.drawRanges = this._drawRanges, r.reservedRanges = this._reservedRanges, r.geometryInfo = this._geometryInfo.map((o) => ({
      ...o,
      boundingBox: o.boundingBox ? o.boundingBox.toJSON() : void 0,
      boundingSphere: o.boundingSphere ? o.boundingSphere.toJSON() : void 0
    })), r.instanceInfo = this._instanceInfo.map((o) => ({ ...o })), r.availableInstanceIds = this._availableInstanceIds.slice(), r.availableGeometryIds = this._availableGeometryIds.slice(), r.nextIndexStart = this._nextIndexStart, r.nextVertexStart = this._nextVertexStart, r.geometryCount = this._geometryCount, r.maxInstanceCount = this._maxInstanceCount, r.maxVertexCount = this._maxVertexCount, r.maxIndexCount = this._maxIndexCount, r.geometryInitialized = this._geometryInitialized, r.matricesTexture = this._matricesTexture.toJSON(t), r.indirectTexture = this._indirectTexture.toJSON(t), this._colorsTexture !== null && (r.colorsTexture = this._colorsTexture.toJSON(t)), this.boundingSphere !== null && (r.boundingSphere = this.boundingSphere.toJSON()), this.boundingBox !== null && (r.boundingBox = this.boundingBox.toJSON()));
    function s(o, l) {
      return o[l.uuid] === void 0 && (o[l.uuid] = l.toJSON(t)), l.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? r.background = this.background.toJSON() : this.background.isTexture && (r.background = this.background.toJSON(t).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (r.environment = this.environment.toJSON(t).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      r.geometry = s(t.geometries, this.geometry);
      const o = this.geometry.parameters;
      if (o !== void 0 && o.shapes !== void 0) {
        const l = o.shapes;
        if (Array.isArray(l)) for (let c = 0, h = l.length; c < h; c++) {
          const d = l[c];
          s(t.shapes, d);
        }
        else s(t.shapes, l);
      }
    }
    if (this.isSkinnedMesh && (r.bindMode = this.bindMode, r.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (s(t.skeletons, this.skeleton), r.skeleton = this.skeleton.uuid)), this.material !== void 0) if (Array.isArray(this.material)) {
      const o = [];
      for (let l = 0, c = this.material.length; l < c; l++) o.push(s(t.materials, this.material[l]));
      r.material = o;
    } else r.material = s(t.materials, this.material);
    if (this.children.length > 0) {
      r.children = [];
      for (let o = 0; o < this.children.length; o++) r.children.push(this.children[o].toJSON(t).object);
    }
    if (this.animations.length > 0) {
      r.animations = [];
      for (let o = 0; o < this.animations.length; o++) {
        const l = this.animations[o];
        r.animations.push(s(t.animations, l));
      }
    }
    if (i) {
      const o = a(t.geometries), l = a(t.materials), c = a(t.textures), h = a(t.images), d = a(t.shapes), u = a(t.skeletons), p = a(t.animations), v = a(t.nodes);
      o.length > 0 && (n.geometries = o), l.length > 0 && (n.materials = l), c.length > 0 && (n.textures = c), h.length > 0 && (n.images = h), d.length > 0 && (n.shapes = d), u.length > 0 && (n.skeletons = u), p.length > 0 && (n.animations = p), v.length > 0 && (n.nodes = v);
    }
    return n.object = r, n;
    function a(o) {
      const l = [];
      for (const c in o) {
        const h = o[c];
        delete h.metadata, l.push(h);
      }
      return l;
    }
  }
  clone(t) {
    return new this.constructor().copy(this, t);
  }
  copy(t, i = !0) {
    if (this.name = t.name, this.up.copy(t.up), this.position.copy(t.position), this.rotation.order = t.rotation.order, this.quaternion.copy(t.quaternion), this.scale.copy(t.scale), this.pivot = t.pivot !== null ? t.pivot.clone() : null, this.matrix.copy(t.matrix), this.matrixWorld.copy(t.matrixWorld), this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrixWorldAutoUpdate = t.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate, this.layers.mask = t.layers.mask, this.visible = t.visible, this.castShadow = t.castShadow, this.receiveShadow = t.receiveShadow, this.frustumCulled = t.frustumCulled, this.renderOrder = t.renderOrder, this.static = t.static, this.animations = t.animations.slice(), this.userData = JSON.parse(JSON.stringify(t.userData)), i === !0) for (let n = 0; n < t.children.length; n++) {
      const r = t.children[n];
      this.add(r.clone());
    }
    return this;
  }
};
dt.DEFAULT_UP = /* @__PURE__ */ new N(0, 1, 0);
dt.DEFAULT_MATRIX_AUTO_UPDATE = !0;
dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
var Hi = class extends dt {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}, oh = { type: "move" }, as = class {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return this._hand === null && (this._hand = new Hi(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new Hi(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new N(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new N()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new Hi(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new N(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new N(), this._grip.eventsEnabled = !1), this._grip;
  }
  dispatchEvent(e) {
    return this._targetRay !== null && this._targetRay.dispatchEvent(e), this._grip !== null && this._grip.dispatchEvent(e), this._hand !== null && this._hand.dispatchEvent(e), this;
  }
  connect(e) {
    if (e && e.hand) {
      const t = this._hand;
      if (t) for (const i of e.hand.values()) this._getHandJoint(t, i);
    }
    return this.dispatchEvent({
      type: "connected",
      data: e
    }), this;
  }
  disconnect(e) {
    return this.dispatchEvent({
      type: "disconnected",
      data: e
    }), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
  }
  update(e, t, i) {
    let n = null, r = null, s = null;
    const a = this._targetRay, o = this._grip, l = this._hand;
    if (e && t.session.visibilityState !== "visible-blurred") {
      if (l && e.hand) {
        s = !0;
        for (const v of e.hand.values()) {
          const b = t.getJointPose(v, i), m = this._getHandJoint(l, v);
          b !== null && (m.matrix.fromArray(b.transform.matrix), m.matrix.decompose(m.position, m.rotation, m.scale), m.matrixWorldNeedsUpdate = !0, m.jointRadius = b.radius), m.visible = b !== null;
        }
        const c = l.joints["index-finger-tip"], h = l.joints["thumb-tip"], d = c.position.distanceTo(h.position), u = 0.02, p = 5e-3;
        l.inputState.pinching && d > u + p ? (l.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: e.handedness,
          target: this
        })) : !l.inputState.pinching && d <= u - p && (l.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: e.handedness,
          target: this
        }));
      } else o !== null && e.gripSpace && (r = t.getPose(e.gripSpace, i), r !== null && (o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), o.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(r.linearVelocity)) : o.hasLinearVelocity = !1, r.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(r.angularVelocity)) : o.hasAngularVelocity = !1, o.eventsEnabled && o.dispatchEvent({
        type: "gripUpdated",
        data: e,
        target: this
      })));
      a !== null && (n = t.getPose(e.targetRaySpace, i), n === null && r !== null && (n = r), n !== null && (a.matrix.fromArray(n.transform.matrix), a.matrix.decompose(a.position, a.rotation, a.scale), a.matrixWorldNeedsUpdate = !0, n.linearVelocity ? (a.hasLinearVelocity = !0, a.linearVelocity.copy(n.linearVelocity)) : a.hasLinearVelocity = !1, n.angularVelocity ? (a.hasAngularVelocity = !0, a.angularVelocity.copy(n.angularVelocity)) : a.hasAngularVelocity = !1, this.dispatchEvent(oh)));
    }
    return a !== null && (a.visible = n !== null), o !== null && (o.visible = r !== null), l !== null && (l.visible = s !== null), this;
  }
  _getHandJoint(e, t) {
    if (e.joints[t.jointName] === void 0) {
      const i = new Hi();
      i.matrixAutoUpdate = !1, i.visible = !1, e.joints[t.jointName] = i, e.add(i);
    }
    return e.joints[t.jointName];
  }
}, $o = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
}, Ai = {
  h: 0,
  s: 0,
  l: 0
}, sr = {
  h: 0,
  s: 0,
  l: 0
};
function os(e, t, i) {
  return i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? e + (t - e) * 6 * i : i < 1 / 2 ? t : i < 2 / 3 ? e + (t - e) * 6 * (2 / 3 - i) : e;
}
var Ne = class {
  constructor(e, t, i) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(e, t, i);
  }
  set(e, t, i) {
    if (t === void 0 && i === void 0) {
      const n = e;
      n && n.isColor ? this.copy(n) : typeof n == "number" ? this.setHex(n) : typeof n == "string" && this.setStyle(n);
    } else this.setRGB(e, t, i);
    return this;
  }
  setScalar(e) {
    return this.r = e, this.g = e, this.b = e, this;
  }
  setHex(e, t = xt) {
    return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, He.colorSpaceToWorking(this, t), this;
  }
  setRGB(e, t, i, n = He.workingColorSpace) {
    return this.r = e, this.g = t, this.b = i, He.colorSpaceToWorking(this, n), this;
  }
  setHSL(e, t, i, n = He.workingColorSpace) {
    if (e = qs(e, 1), t = Be(t, 0, 1), i = Be(i, 0, 1), t === 0) this.r = this.g = this.b = i;
    else {
      const r = i <= 0.5 ? i * (1 + t) : i + t - i * t, s = 2 * i - r;
      this.r = os(s, r, e + 1 / 3), this.g = os(s, r, e), this.b = os(s, r, e - 1 / 3);
    }
    return He.colorSpaceToWorking(this, n), this;
  }
  setStyle(e, t = xt) {
    function i(r) {
      r !== void 0 && parseFloat(r) < 1 && Se("Color: Alpha component of " + e + " will be ignored.");
    }
    let n;
    if (n = /^(\w+)\(([^\)]*)\)/.exec(e)) {
      let r;
      const s = n[1], a = n[2];
      switch (s) {
        case "rgb":
        case "rgba":
          if (r = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))
            return i(r[4]), this.setRGB(Math.min(255, parseInt(r[1], 10)) / 255, Math.min(255, parseInt(r[2], 10)) / 255, Math.min(255, parseInt(r[3], 10)) / 255, t);
          if (r = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))
            return i(r[4]), this.setRGB(Math.min(100, parseInt(r[1], 10)) / 100, Math.min(100, parseInt(r[2], 10)) / 100, Math.min(100, parseInt(r[3], 10)) / 100, t);
          break;
        case "hsl":
        case "hsla":
          if (r = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))
            return i(r[4]), this.setHSL(parseFloat(r[1]) / 360, parseFloat(r[2]) / 100, parseFloat(r[3]) / 100, t);
          break;
        default:
          Se("Color: Unknown color model " + e);
      }
    } else if (n = /^\#([A-Fa-f\d]+)$/.exec(e)) {
      const r = n[1], s = r.length;
      if (s === 3) return this.setRGB(parseInt(r.charAt(0), 16) / 15, parseInt(r.charAt(1), 16) / 15, parseInt(r.charAt(2), 16) / 15, t);
      if (s === 6) return this.setHex(parseInt(r, 16), t);
      Se("Color: Invalid hex color " + e);
    } else if (e && e.length > 0) return this.setColorName(e, t);
    return this;
  }
  setColorName(e, t = xt) {
    const i = $o[e.toLowerCase()];
    return i !== void 0 ? this.setHex(i, t) : Se("Color: Unknown color " + e), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(e) {
    return this.r = e.r, this.g = e.g, this.b = e.b, this;
  }
  copySRGBToLinear(e) {
    return this.r = Si(e.r), this.g = Si(e.g), this.b = Si(e.b), this;
  }
  copyLinearToSRGB(e) {
    return this.r = gn(e.r), this.g = gn(e.g), this.b = gn(e.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(e = xt) {
    return He.workingToColorSpace(Et.copy(this), e), Math.round(Be(Et.r * 255, 0, 255)) * 65536 + Math.round(Be(Et.g * 255, 0, 255)) * 256 + Math.round(Be(Et.b * 255, 0, 255));
  }
  getHexString(e = xt) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  getHSL(e, t = He.workingColorSpace) {
    He.workingToColorSpace(Et.copy(this), t);
    const i = Et.r, n = Et.g, r = Et.b, s = Math.max(i, n, r), a = Math.min(i, n, r);
    let o, l;
    const c = (a + s) / 2;
    if (a === s)
      o = 0, l = 0;
    else {
      const h = s - a;
      switch (l = c <= 0.5 ? h / (s + a) : h / (2 - s - a), s) {
        case i:
          o = (n - r) / h + (n < r ? 6 : 0);
          break;
        case n:
          o = (r - i) / h + 2;
          break;
        case r:
          o = (i - n) / h + 4;
          break;
      }
      o /= 6;
    }
    return e.h = o, e.s = l, e.l = c, e;
  }
  getRGB(e, t = He.workingColorSpace) {
    return He.workingToColorSpace(Et.copy(this), t), e.r = Et.r, e.g = Et.g, e.b = Et.b, e;
  }
  getStyle(e = xt) {
    He.workingToColorSpace(Et.copy(this), e);
    const t = Et.r, i = Et.g, n = Et.b;
    return e !== "srgb" ? `color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})` : `rgb(${Math.round(t * 255)},${Math.round(i * 255)},${Math.round(n * 255)})`;
  }
  offsetHSL(e, t, i) {
    return this.getHSL(Ai), this.setHSL(Ai.h + e, Ai.s + t, Ai.l + i);
  }
  add(e) {
    return this.r += e.r, this.g += e.g, this.b += e.b, this;
  }
  addColors(e, t) {
    return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this;
  }
  addScalar(e) {
    return this.r += e, this.g += e, this.b += e, this;
  }
  sub(e) {
    return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this;
  }
  multiply(e) {
    return this.r *= e.r, this.g *= e.g, this.b *= e.b, this;
  }
  multiplyScalar(e) {
    return this.r *= e, this.g *= e, this.b *= e, this;
  }
  lerp(e, t) {
    return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this;
  }
  lerpColors(e, t, i) {
    return this.r = e.r + (t.r - e.r) * i, this.g = e.g + (t.g - e.g) * i, this.b = e.b + (t.b - e.b) * i, this;
  }
  lerpHSL(e, t) {
    this.getHSL(Ai), e.getHSL(sr);
    const i = Xn(Ai.h, sr.h, t), n = Xn(Ai.s, sr.s, t), r = Xn(Ai.l, sr.l, t);
    return this.setHSL(i, n, r), this;
  }
  setFromVector3(e) {
    return this.r = e.x, this.g = e.y, this.b = e.z, this;
  }
  applyMatrix3(e) {
    const t = this.r, i = this.g, n = this.b, r = e.elements;
    return this.r = r[0] * t + r[3] * i + r[6] * n, this.g = r[1] * t + r[4] * i + r[7] * n, this.b = r[2] * t + r[5] * i + r[8] * n, this;
  }
  equals(e) {
    return e.r === this.r && e.g === this.g && e.b === this.b;
  }
  fromArray(e, t = 0) {
    return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e;
  }
  fromBufferAttribute(e, t) {
    return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), this;
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}, Et = /* @__PURE__ */ new Ne();
Ne.NAMES = $o;
var lh = class extends dt {
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new Sn(), this.environmentIntensity = 1, this.environmentRotation = new Sn(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(e, t) {
    return super.copy(e, t), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.fog !== null && (t.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (t.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (t.object.backgroundIntensity = this.backgroundIntensity), t.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (t.object.environmentIntensity = this.environmentIntensity), t.object.environmentRotation = this.environmentRotation.toArray(), t;
  }
}, Kt = /* @__PURE__ */ new N(), gi = /* @__PURE__ */ new N(), ls = /* @__PURE__ */ new N(), _i = /* @__PURE__ */ new N(), Qi = /* @__PURE__ */ new N(), en = /* @__PURE__ */ new N(), Aa = /* @__PURE__ */ new N(), cs = /* @__PURE__ */ new N(), hs = /* @__PURE__ */ new N(), us = /* @__PURE__ */ new N(), ds = /* @__PURE__ */ new it(), fs = /* @__PURE__ */ new it(), ps = /* @__PURE__ */ new it(), In = class un {
  constructor(t = new N(), i = new N(), n = new N()) {
    this.a = t, this.b = i, this.c = n;
  }
  static getNormal(t, i, n, r) {
    r.subVectors(n, i), Kt.subVectors(t, i), r.cross(Kt);
    const s = r.lengthSq();
    return s > 0 ? r.multiplyScalar(1 / Math.sqrt(s)) : r.set(0, 0, 0);
  }
  static getBarycoord(t, i, n, r, s) {
    Kt.subVectors(r, i), gi.subVectors(n, i), ls.subVectors(t, i);
    const a = Kt.dot(Kt), o = Kt.dot(gi), l = Kt.dot(ls), c = gi.dot(gi), h = gi.dot(ls), d = a * c - o * o;
    if (d === 0)
      return s.set(0, 0, 0), null;
    const u = 1 / d, p = (c * l - o * h) * u, v = (a * h - o * l) * u;
    return s.set(1 - p - v, v, p);
  }
  static containsPoint(t, i, n, r) {
    return this.getBarycoord(t, i, n, r, _i) === null ? !1 : _i.x >= 0 && _i.y >= 0 && _i.x + _i.y <= 1;
  }
  static getInterpolation(t, i, n, r, s, a, o, l) {
    return this.getBarycoord(t, i, n, r, _i) === null ? (l.x = 0, l.y = 0, "z" in l && (l.z = 0), "w" in l && (l.w = 0), null) : (l.setScalar(0), l.addScaledVector(s, _i.x), l.addScaledVector(a, _i.y), l.addScaledVector(o, _i.z), l);
  }
  static getInterpolatedAttribute(t, i, n, r, s, a) {
    return ds.setScalar(0), fs.setScalar(0), ps.setScalar(0), ds.fromBufferAttribute(t, i), fs.fromBufferAttribute(t, n), ps.fromBufferAttribute(t, r), a.setScalar(0), a.addScaledVector(ds, s.x), a.addScaledVector(fs, s.y), a.addScaledVector(ps, s.z), a;
  }
  static isFrontFacing(t, i, n, r) {
    return Kt.subVectors(n, i), gi.subVectors(t, i), Kt.cross(gi).dot(r) < 0;
  }
  set(t, i, n) {
    return this.a.copy(t), this.b.copy(i), this.c.copy(n), this;
  }
  setFromPointsAndIndices(t, i, n, r) {
    return this.a.copy(t[i]), this.b.copy(t[n]), this.c.copy(t[r]), this;
  }
  setFromAttributeAndIndices(t, i, n, r) {
    return this.a.fromBufferAttribute(t, i), this.b.fromBufferAttribute(t, n), this.c.fromBufferAttribute(t, r), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this;
  }
  getArea() {
    return Kt.subVectors(this.c, this.b), gi.subVectors(this.a, this.b), Kt.cross(gi).length() * 0.5;
  }
  getMidpoint(t) {
    return t.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(t) {
    return un.getNormal(this.a, this.b, this.c, t);
  }
  getPlane(t) {
    return t.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(t, i) {
    return un.getBarycoord(t, this.a, this.b, this.c, i);
  }
  getInterpolation(t, i, n, r, s) {
    return un.getInterpolation(t, this.a, this.b, this.c, i, n, r, s);
  }
  containsPoint(t) {
    return un.containsPoint(t, this.a, this.b, this.c);
  }
  isFrontFacing(t) {
    return un.isFrontFacing(this.a, this.b, this.c, t);
  }
  intersectsBox(t) {
    return t.intersectsTriangle(this);
  }
  closestPointToPoint(t, i) {
    const n = this.a, r = this.b, s = this.c;
    let a, o;
    Qi.subVectors(r, n), en.subVectors(s, n), cs.subVectors(t, n);
    const l = Qi.dot(cs), c = en.dot(cs);
    if (l <= 0 && c <= 0) return i.copy(n);
    hs.subVectors(t, r);
    const h = Qi.dot(hs), d = en.dot(hs);
    if (h >= 0 && d <= h) return i.copy(r);
    const u = l * d - h * c;
    if (u <= 0 && l >= 0 && h <= 0)
      return a = l / (l - h), i.copy(n).addScaledVector(Qi, a);
    us.subVectors(t, s);
    const p = Qi.dot(us), v = en.dot(us);
    if (v >= 0 && p <= v) return i.copy(s);
    const b = p * c - l * v;
    if (b <= 0 && c >= 0 && v <= 0)
      return o = c / (c - v), i.copy(n).addScaledVector(en, o);
    const m = h * v - p * d;
    if (m <= 0 && d - h >= 0 && p - v >= 0)
      return Aa.subVectors(s, r), o = (d - h) / (d - h + (p - v)), i.copy(r).addScaledVector(Aa, o);
    const f = 1 / (m + b + u);
    return a = b * f, o = u * f, i.copy(n).addScaledVector(Qi, a).addScaledVector(en, o);
  }
  equals(t) {
    return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c);
  }
}, ui = class {
  constructor(e = new N(1 / 0, 1 / 0, 1 / 0), t = new N(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = e, this.max = t;
  }
  set(e, t) {
    return this.min.copy(e), this.max.copy(t), this;
  }
  setFromArray(e) {
    this.makeEmpty();
    for (let t = 0, i = e.length; t < i; t += 3) this.expandByPoint(jt.fromArray(e, t));
    return this;
  }
  setFromBufferAttribute(e) {
    this.makeEmpty();
    for (let t = 0, i = e.count; t < i; t++) this.expandByPoint(jt.fromBufferAttribute(e, t));
    return this;
  }
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, i = e.length; t < i; t++) this.expandByPoint(e[t]);
    return this;
  }
  setFromCenterAndSize(e, t) {
    const i = jt.copy(t).multiplyScalar(0.5);
    return this.min.copy(e).sub(i), this.max.copy(e).add(i), this;
  }
  setFromObject(e, t = !1) {
    return this.makeEmpty(), this.expandByObject(e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.min.copy(e.min), this.max.copy(e.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
  }
  expandByPoint(e) {
    return this.min.min(e), this.max.max(e), this;
  }
  expandByVector(e) {
    return this.min.sub(e), this.max.add(e), this;
  }
  expandByScalar(e) {
    return this.min.addScalar(-e), this.max.addScalar(e), this;
  }
  expandByObject(e, t = !1) {
    e.updateWorldMatrix(!1, !1);
    const i = e.geometry;
    if (i !== void 0) {
      const r = i.getAttribute("position");
      if (t === !0 && r !== void 0 && e.isInstancedMesh !== !0) for (let s = 0, a = r.count; s < a; s++)
        e.isMesh === !0 ? e.getVertexPosition(s, jt) : jt.fromBufferAttribute(r, s), jt.applyMatrix4(e.matrixWorld), this.expandByPoint(jt);
      else
        e.boundingBox !== void 0 ? (e.boundingBox === null && e.computeBoundingBox(), ar.copy(e.boundingBox)) : (i.boundingBox === null && i.computeBoundingBox(), ar.copy(i.boundingBox)), ar.applyMatrix4(e.matrixWorld), this.union(ar);
    }
    const n = e.children;
    for (let r = 0, s = n.length; r < s; r++) this.expandByObject(n[r], t);
    return this;
  }
  containsPoint(e) {
    return e.x >= this.min.x && e.x <= this.max.x && e.y >= this.min.y && e.y <= this.max.y && e.z >= this.min.z && e.z <= this.max.z;
  }
  containsBox(e) {
    return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z;
  }
  getParameter(e, t) {
    return t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z));
  }
  intersectsBox(e) {
    return e.max.x >= this.min.x && e.min.x <= this.max.x && e.max.y >= this.min.y && e.min.y <= this.max.y && e.max.z >= this.min.z && e.min.z <= this.max.z;
  }
  intersectsSphere(e) {
    return this.clampPoint(e.center, jt), jt.distanceToSquared(e.center) <= e.radius * e.radius;
  }
  intersectsPlane(e) {
    let t, i;
    return e.normal.x > 0 ? (t = e.normal.x * this.min.x, i = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, i = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, i += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, i += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, i += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, i += e.normal.z * this.min.z), t <= -e.constant && i >= -e.constant;
  }
  intersectsTriangle(e) {
    if (this.isEmpty()) return !1;
    this.getCenter(Nn), or.subVectors(this.max, Nn), tn.subVectors(e.a, Nn), nn.subVectors(e.b, Nn), rn.subVectors(e.c, Nn), Ri.subVectors(nn, tn), wi.subVectors(rn, nn), Oi.subVectors(tn, rn);
    let t = [
      0,
      -Ri.z,
      Ri.y,
      0,
      -wi.z,
      wi.y,
      0,
      -Oi.z,
      Oi.y,
      Ri.z,
      0,
      -Ri.x,
      wi.z,
      0,
      -wi.x,
      Oi.z,
      0,
      -Oi.x,
      -Ri.y,
      Ri.x,
      0,
      -wi.y,
      wi.x,
      0,
      -Oi.y,
      Oi.x,
      0
    ];
    return !ms(t, tn, nn, rn, or) || (t = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], !ms(t, tn, nn, rn, or)) ? !1 : (lr.crossVectors(Ri, wi), t = [
      lr.x,
      lr.y,
      lr.z
    ], ms(t, tn, nn, rn, or));
  }
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  distanceToPoint(e) {
    return this.clampPoint(e, jt).distanceTo(e);
  }
  getBoundingSphere(e) {
    return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(jt).length() * 0.5), e;
  }
  intersect(e) {
    return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(e) {
    return this.min.min(e.min), this.max.max(e.max), this;
  }
  applyMatrix4(e) {
    return this.isEmpty() ? this : (vi[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), vi[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), vi[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), vi[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), vi[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), vi[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), vi[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), vi[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(vi), this);
  }
  translate(e) {
    return this.min.add(e), this.max.add(e), this;
  }
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
  toJSON() {
    return {
      min: this.min.toArray(),
      max: this.max.toArray()
    };
  }
  fromJSON(e) {
    return this.min.fromArray(e.min), this.max.fromArray(e.max), this;
  }
}, vi = [
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N()
], jt = /* @__PURE__ */ new N(), ar = /* @__PURE__ */ new ui(), tn = /* @__PURE__ */ new N(), nn = /* @__PURE__ */ new N(), rn = /* @__PURE__ */ new N(), Ri = /* @__PURE__ */ new N(), wi = /* @__PURE__ */ new N(), Oi = /* @__PURE__ */ new N(), Nn = /* @__PURE__ */ new N(), or = /* @__PURE__ */ new N(), lr = /* @__PURE__ */ new N(), ki = /* @__PURE__ */ new N();
function ms(e, t, i, n, r) {
  for (let s = 0, a = e.length - 3; s <= a; s += 3) {
    ki.fromArray(e, s);
    const o = r.x * Math.abs(ki.x) + r.y * Math.abs(ki.y) + r.z * Math.abs(ki.z), l = t.dot(ki), c = i.dot(ki), h = n.dot(ki);
    if (Math.max(-Math.max(l, c, h), Math.min(l, c, h)) > o) return !1;
  }
  return !0;
}
var ut = /* @__PURE__ */ new N(), cr = /* @__PURE__ */ new De(), ch = 0, Pt = class extends Ui {
  constructor(e, t, i = !1) {
    if (super(), Array.isArray(e)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, Object.defineProperty(this, "id", { value: ch++ }), this.name = "", this.array = e, this.itemSize = t, this.count = e !== void 0 ? e.length / t : 0, this.normalized = i, this.usage = Vo, this.updateRanges = [], this.gpuType = Tn, this.version = 0;
  }
  onUploadCallback() {
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  setUsage(e) {
    return this.usage = e, this;
  }
  addUpdateRange(e, t) {
    this.updateRanges.push({
      start: e,
      count: t
    });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(e) {
    return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this;
  }
  copyAt(e, t, i) {
    e *= this.itemSize, i *= t.itemSize;
    for (let n = 0, r = this.itemSize; n < r; n++) this.array[e + n] = t.array[i + n];
    return this;
  }
  copyArray(e) {
    return this.array.set(e), this;
  }
  applyMatrix3(e) {
    if (this.itemSize === 2) for (let t = 0, i = this.count; t < i; t++)
      cr.fromBufferAttribute(this, t), cr.applyMatrix3(e), this.setXY(t, cr.x, cr.y);
    else if (this.itemSize === 3) for (let t = 0, i = this.count; t < i; t++)
      ut.fromBufferAttribute(this, t), ut.applyMatrix3(e), this.setXYZ(t, ut.x, ut.y, ut.z);
    return this;
  }
  applyMatrix4(e) {
    for (let t = 0, i = this.count; t < i; t++)
      ut.fromBufferAttribute(this, t), ut.applyMatrix4(e), this.setXYZ(t, ut.x, ut.y, ut.z);
    return this;
  }
  applyNormalMatrix(e) {
    for (let t = 0, i = this.count; t < i; t++)
      ut.fromBufferAttribute(this, t), ut.applyNormalMatrix(e), this.setXYZ(t, ut.x, ut.y, ut.z);
    return this;
  }
  transformDirection(e) {
    for (let t = 0, i = this.count; t < i; t++)
      ut.fromBufferAttribute(this, t), ut.transformDirection(e), this.setXYZ(t, ut.x, ut.y, ut.z);
    return this;
  }
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  getComponent(e, t) {
    let i = this.array[e * this.itemSize + t];
    return this.normalized && (i = Yt(i, this.array)), i;
  }
  setComponent(e, t, i) {
    return this.normalized && (i = Je(i, this.array)), this.array[e * this.itemSize + t] = i, this;
  }
  getX(e) {
    let t = this.array[e * this.itemSize];
    return this.normalized && (t = Yt(t, this.array)), t;
  }
  setX(e, t) {
    return this.normalized && (t = Je(t, this.array)), this.array[e * this.itemSize] = t, this;
  }
  getY(e) {
    let t = this.array[e * this.itemSize + 1];
    return this.normalized && (t = Yt(t, this.array)), t;
  }
  setY(e, t) {
    return this.normalized && (t = Je(t, this.array)), this.array[e * this.itemSize + 1] = t, this;
  }
  getZ(e) {
    let t = this.array[e * this.itemSize + 2];
    return this.normalized && (t = Yt(t, this.array)), t;
  }
  setZ(e, t) {
    return this.normalized && (t = Je(t, this.array)), this.array[e * this.itemSize + 2] = t, this;
  }
  getW(e) {
    let t = this.array[e * this.itemSize + 3];
    return this.normalized && (t = Yt(t, this.array)), t;
  }
  setW(e, t) {
    return this.normalized && (t = Je(t, this.array)), this.array[e * this.itemSize + 3] = t, this;
  }
  setXY(e, t, i) {
    return e *= this.itemSize, this.normalized && (t = Je(t, this.array), i = Je(i, this.array)), this.array[e + 0] = t, this.array[e + 1] = i, this;
  }
  setXYZ(e, t, i, n) {
    return e *= this.itemSize, this.normalized && (t = Je(t, this.array), i = Je(i, this.array), n = Je(n, this.array)), this.array[e + 0] = t, this.array[e + 1] = i, this.array[e + 2] = n, this;
  }
  setXYZW(e, t, i, n, r) {
    return e *= this.itemSize, this.normalized && (t = Je(t, this.array), i = Je(i, this.array), n = Je(n, this.array), r = Je(r, this.array)), this.array[e + 0] = t, this.array[e + 1] = i, this.array[e + 2] = n, this.array[e + 3] = r, this;
  }
  onUpload(e) {
    return this.onUploadCallback = e, this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const e = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return this.name !== "" && (e.name = this.name), this.usage !== 35044 && (e.usage = this.usage), e;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}, Qo = class extends Pt {
  constructor(e, t, i) {
    super(new Uint16Array(e), t, i);
  }
}, el = class extends Pt {
  constructor(e, t, i) {
    super(new Uint32Array(e), t, i);
  }
}, Nt = class extends Pt {
  constructor(e, t, i) {
    super(new Float32Array(e), t, i);
  }
}, hh = /* @__PURE__ */ new ui(), Un = /* @__PURE__ */ new N(), gs = /* @__PURE__ */ new N(), di = class {
  constructor(e = new N(), t = -1) {
    this.isSphere = !0, this.center = e, this.radius = t;
  }
  set(e, t) {
    return this.center.copy(e), this.radius = t, this;
  }
  setFromPoints(e, t) {
    const i = this.center;
    t !== void 0 ? i.copy(t) : hh.setFromPoints(e).getCenter(i);
    let n = 0;
    for (let r = 0, s = e.length; r < s; r++) n = Math.max(n, i.distanceToSquared(e[r]));
    return this.radius = Math.sqrt(n), this;
  }
  copy(e) {
    return this.center.copy(e.center), this.radius = e.radius, this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  containsPoint(e) {
    return e.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(e) {
    return e.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(e) {
    const t = this.radius + e.radius;
    return e.center.distanceToSquared(this.center) <= t * t;
  }
  intersectsBox(e) {
    return e.intersectsSphere(this);
  }
  intersectsPlane(e) {
    return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(e, t) {
    const i = this.center.distanceToSquared(e);
    return t.copy(e), i > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t;
  }
  getBoundingBox(e) {
    return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
  }
  applyMatrix4(e) {
    return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this;
  }
  translate(e) {
    return this.center.add(e), this;
  }
  expandByPoint(e) {
    if (this.isEmpty())
      return this.center.copy(e), this.radius = 0, this;
    Un.subVectors(e, this.center);
    const t = Un.lengthSq();
    if (t > this.radius * this.radius) {
      const i = Math.sqrt(t), n = (i - this.radius) * 0.5;
      this.center.addScaledVector(Un, n / i), this.radius += n;
    }
    return this;
  }
  union(e) {
    return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (gs.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(Un.copy(e.center).add(gs)), this.expandByPoint(Un.copy(e.center).sub(gs))), this);
  }
  equals(e) {
    return e.center.equals(this.center) && e.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    return {
      radius: this.radius,
      center: this.center.toArray()
    };
  }
  fromJSON(e) {
    return this.radius = e.radius, this.center.fromArray(e.center), this;
  }
}, uh = 0, Vt = /* @__PURE__ */ new Ge(), _s = /* @__PURE__ */ new dt(), sn = /* @__PURE__ */ new N(), kt = /* @__PURE__ */ new ui(), Fn = /* @__PURE__ */ new ui(), vt = /* @__PURE__ */ new N(), Qt = class tl extends Ui {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: uh++ }), this.uuid = Jt(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.indirectOffset = 0, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
      start: 0,
      count: 1 / 0
    }, this.userData = {}, this._transformed = !1;
  }
  getIndex() {
    return this.index;
  }
  setIndex(t) {
    return Array.isArray(t) ? this.index = new (wc(t) ? el : Qo)(t, 1) : this.index = t, this;
  }
  setIndirect(t, i = 0) {
    return this.indirect = t, this.indirectOffset = i, this;
  }
  getIndirect() {
    return this.indirect;
  }
  getAttribute(t) {
    return this.attributes[t];
  }
  setAttribute(t, i) {
    return this.attributes[t] = i, this;
  }
  deleteAttribute(t) {
    return delete this.attributes[t], this;
  }
  hasAttribute(t) {
    return this.attributes[t] !== void 0;
  }
  addGroup(t, i, n = 0) {
    this.groups.push({
      start: t,
      count: i,
      materialIndex: n
    });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(t, i) {
    this.drawRange.start = t, this.drawRange.count = i;
  }
  applyMatrix4(t) {
    const i = this.attributes.position;
    i !== void 0 && (i.applyMatrix4(t), i.needsUpdate = !0);
    const n = this.attributes.normal;
    if (n !== void 0) {
      const s = new Fe().getNormalMatrix(t);
      n.applyNormalMatrix(s), n.needsUpdate = !0;
    }
    const r = this.attributes.tangent;
    return r !== void 0 && (r.transformDirection(t), r.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this._transformed = !0, this;
  }
  applyQuaternion(t) {
    return Vt.makeRotationFromQuaternion(t), this.applyMatrix4(Vt), this;
  }
  rotateX(t) {
    return Vt.makeRotationX(t), this.applyMatrix4(Vt), this;
  }
  rotateY(t) {
    return Vt.makeRotationY(t), this.applyMatrix4(Vt), this;
  }
  rotateZ(t) {
    return Vt.makeRotationZ(t), this.applyMatrix4(Vt), this;
  }
  translate(t, i, n) {
    return Vt.makeTranslation(t, i, n), this.applyMatrix4(Vt), this;
  }
  scale(t, i, n) {
    return Vt.makeScale(t, i, n), this.applyMatrix4(Vt), this;
  }
  lookAt(t) {
    return _s.lookAt(t), _s.updateMatrix(), this.applyMatrix4(_s.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(sn).negate(), this.translate(sn.x, sn.y, sn.z), this;
  }
  setFromPoints(t) {
    const i = this.getAttribute("position");
    if (i === void 0) {
      const n = [];
      for (let r = 0, s = t.length; r < s; r++) {
        const a = t[r];
        n.push(a.x, a.y, a.z || 0);
      }
      this.setAttribute("position", new Nt(n, 3));
    } else {
      const n = Math.min(t.length, i.count);
      for (let r = 0; r < n; r++) {
        const s = t[r];
        i.setXYZ(r, s.x, s.y, s.z || 0);
      }
      t.length > i.count && Se("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), i.needsUpdate = !0;
    }
    return this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new ui());
    const t = this.attributes.position, i = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      Le("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(new N(-1 / 0, -1 / 0, -1 / 0), new N(1 / 0, 1 / 0, 1 / 0));
      return;
    }
    if (t !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(t), i) for (let n = 0, r = i.length; n < r; n++) {
        const s = i[n];
        kt.setFromBufferAttribute(s), this.morphTargetsRelative ? (vt.addVectors(this.boundingBox.min, kt.min), this.boundingBox.expandByPoint(vt), vt.addVectors(this.boundingBox.max, kt.max), this.boundingBox.expandByPoint(vt)) : (this.boundingBox.expandByPoint(kt.min), this.boundingBox.expandByPoint(kt.max));
      }
    } else this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && Le('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new di());
    const t = this.attributes.position, i = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      Le("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new N(), 1 / 0);
      return;
    }
    if (t) {
      const n = this.boundingSphere.center;
      if (kt.setFromBufferAttribute(t), i) for (let s = 0, a = i.length; s < a; s++) {
        const o = i[s];
        Fn.setFromBufferAttribute(o), this.morphTargetsRelative ? (vt.addVectors(kt.min, Fn.min), kt.expandByPoint(vt), vt.addVectors(kt.max, Fn.max), kt.expandByPoint(vt)) : (kt.expandByPoint(Fn.min), kt.expandByPoint(Fn.max));
      }
      kt.getCenter(n);
      let r = 0;
      for (let s = 0, a = t.count; s < a; s++)
        vt.fromBufferAttribute(t, s), r = Math.max(r, n.distanceToSquared(vt));
      if (i) for (let s = 0, a = i.length; s < a; s++) {
        const o = i[s], l = this.morphTargetsRelative;
        for (let c = 0, h = o.count; c < h; c++)
          vt.fromBufferAttribute(o, c), l && (sn.fromBufferAttribute(t, c), vt.add(sn)), r = Math.max(r, n.distanceToSquared(vt));
      }
      this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && Le('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  computeTangents() {
    const t = this.index, i = this.attributes;
    if (t === null || i.position === void 0 || i.normal === void 0 || i.uv === void 0) {
      Le("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const n = i.position, r = i.normal, s = i.uv;
    let a = this.getAttribute("tangent");
    (a === void 0 || a.count !== n.count) && (a = new Pt(new Float32Array(4 * n.count), 4), this.setAttribute("tangent", a));
    const o = [], l = [];
    for (let g = 0; g < n.count; g++)
      o[g] = new N(), l[g] = new N();
    const c = new N(), h = new N(), d = new N(), u = new De(), p = new De(), v = new De(), b = new N(), m = new N();
    function f(g, y, B) {
      c.fromBufferAttribute(n, g), h.fromBufferAttribute(n, y), d.fromBufferAttribute(n, B), u.fromBufferAttribute(s, g), p.fromBufferAttribute(s, y), v.fromBufferAttribute(s, B), h.sub(c), d.sub(c), p.sub(u), v.sub(u);
      const w = 1 / (p.x * v.y - v.x * p.y);
      isFinite(w) && (b.copy(h).multiplyScalar(v.y).addScaledVector(d, -p.y).multiplyScalar(w), m.copy(d).multiplyScalar(p.x).addScaledVector(h, -v.x).multiplyScalar(w), o[g].add(b), o[y].add(b), o[B].add(b), l[g].add(m), l[y].add(m), l[B].add(m));
    }
    let T = this.groups;
    T.length === 0 && (T = [{
      start: 0,
      count: t.count
    }]);
    for (let g = 0, y = T.length; g < y; ++g) {
      const B = T[g], w = B.start, k = B.count;
      for (let X = w, q = w + k; X < q; X += 3) f(t.getX(X + 0), t.getX(X + 1), t.getX(X + 2));
    }
    const A = new N(), M = new N(), E = new N(), R = new N();
    function C(g) {
      E.fromBufferAttribute(r, g), R.copy(E);
      const y = o[g];
      A.copy(y), A.sub(E.multiplyScalar(E.dot(y))).normalize(), M.crossVectors(R, y);
      const B = M.dot(l[g]) < 0 ? -1 : 1;
      a.setXYZW(g, A.x, A.y, A.z, B);
    }
    for (let g = 0, y = T.length; g < y; ++g) {
      const B = T[g], w = B.start, k = B.count;
      for (let X = w, q = w + k; X < q; X += 3)
        C(t.getX(X + 0)), C(t.getX(X + 1)), C(t.getX(X + 2));
    }
    this._transformed = !0;
  }
  computeVertexNormals() {
    const t = this.index, i = this.getAttribute("position");
    if (i !== void 0) {
      let n = this.getAttribute("normal");
      if (n === void 0 || n.count !== i.count)
        n = new Pt(new Float32Array(i.count * 3), 3), this.setAttribute("normal", n);
      else for (let u = 0, p = n.count; u < p; u++) n.setXYZ(u, 0, 0, 0);
      const r = new N(), s = new N(), a = new N(), o = new N(), l = new N(), c = new N(), h = new N(), d = new N();
      if (t) for (let u = 0, p = t.count; u < p; u += 3) {
        const v = t.getX(u + 0), b = t.getX(u + 1), m = t.getX(u + 2);
        r.fromBufferAttribute(i, v), s.fromBufferAttribute(i, b), a.fromBufferAttribute(i, m), h.subVectors(a, s), d.subVectors(r, s), h.cross(d), o.fromBufferAttribute(n, v), l.fromBufferAttribute(n, b), c.fromBufferAttribute(n, m), o.add(h), l.add(h), c.add(h), n.setXYZ(v, o.x, o.y, o.z), n.setXYZ(b, l.x, l.y, l.z), n.setXYZ(m, c.x, c.y, c.z);
      }
      else for (let u = 0, p = i.count; u < p; u += 3)
        r.fromBufferAttribute(i, u + 0), s.fromBufferAttribute(i, u + 1), a.fromBufferAttribute(i, u + 2), h.subVectors(a, s), d.subVectors(r, s), h.cross(d), n.setXYZ(u + 0, h.x, h.y, h.z), n.setXYZ(u + 1, h.x, h.y, h.z), n.setXYZ(u + 2, h.x, h.y, h.z);
      this.normalizeNormals(), n.needsUpdate = !0;
    }
  }
  normalizeNormals() {
    const t = this.attributes.normal;
    for (let i = 0, n = t.count; i < n; i++)
      vt.fromBufferAttribute(t, i), vt.normalize(), t.setXYZ(i, vt.x, vt.y, vt.z);
  }
  toNonIndexed() {
    function t(o, l) {
      const c = o.array, h = o.itemSize, d = o.normalized, u = new c.constructor(l.length * h);
      let p = 0, v = 0;
      for (let b = 0, m = l.length; b < m; b++) {
        o.isInterleavedBufferAttribute ? p = l[b] * o.data.stride + o.offset : p = l[b] * h;
        for (let f = 0; f < h; f++) u[v++] = c[p++];
      }
      return new Pt(u, h, d);
    }
    if (this.index === null)
      return Se("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const i = new tl(), n = this.index.array, r = this.attributes;
    for (const o in r) {
      const l = r[o], c = t(l, n);
      i.setAttribute(o, c);
    }
    const s = this.morphAttributes;
    for (const o in s) {
      const l = [], c = s[o];
      for (let h = 0, d = c.length; h < d; h++) {
        const u = c[h], p = t(u, n);
        l.push(p);
      }
      i.morphAttributes[o] = l;
    }
    i.morphTargetsRelative = this.morphTargetsRelative;
    const a = this.groups;
    for (let o = 0, l = a.length; o < l; o++) {
      const c = a[o];
      i.addGroup(c.start, c.count, c.materialIndex);
    }
    return i;
  }
  toJSON() {
    const t = { metadata: {
      version: 4.7,
      type: "BufferGeometry",
      generator: "BufferGeometry.toJSON"
    } };
    if (t.uuid = this.uuid, t.type = this.parameters !== void 0 && this._transformed === !0 ? "BufferGeometry" : this.type, this.name !== "" && (t.name = this.name), Object.keys(this.userData).length > 0 && (t.userData = this.userData), this.parameters !== void 0 && this._transformed !== !0) {
      const l = this.parameters;
      for (const c in l) l[c] !== void 0 && (t[c] = l[c]);
      return t;
    }
    t.data = { attributes: {} };
    const i = this.index;
    i !== null && (t.data.index = {
      type: i.array.constructor.name,
      array: Array.prototype.slice.call(i.array)
    });
    const n = this.attributes;
    for (const l in n) {
      const c = n[l];
      t.data.attributes[l] = c.toJSON(t.data);
    }
    const r = {};
    let s = !1;
    for (const l in this.morphAttributes) {
      const c = this.morphAttributes[l], h = [];
      for (let d = 0, u = c.length; d < u; d++) {
        const p = c[d];
        h.push(p.toJSON(t.data));
      }
      h.length > 0 && (r[l] = h, s = !0);
    }
    s && (t.data.morphAttributes = r, t.data.morphTargetsRelative = this.morphTargetsRelative);
    const a = this.groups;
    a.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(a)));
    const o = this.boundingSphere;
    return o !== null && (t.data.boundingSphere = o.toJSON()), t;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const i = {};
    this.name = t.name;
    const n = t.index;
    n !== null && this.setIndex(n.clone());
    const r = t.attributes;
    for (const c in r) {
      const h = r[c];
      this.setAttribute(c, h.clone(i));
    }
    const s = t.morphAttributes;
    for (const c in s) {
      const h = [], d = s[c];
      for (let u = 0, p = d.length; u < p; u++) h.push(d[u].clone(i));
      this.morphAttributes[c] = h;
    }
    this.morphTargetsRelative = t.morphTargetsRelative;
    const a = t.groups;
    for (let c = 0, h = a.length; c < h; c++) {
      const d = a[c];
      this.addGroup(d.start, d.count, d.materialIndex);
    }
    const o = t.boundingBox;
    o !== null && (this.boundingBox = o.clone());
    const l = t.boundingSphere;
    return l !== null && (this.boundingSphere = l.clone()), this.drawRange.start = t.drawRange.start, this.drawRange.count = t.drawRange.count, this.userData = t.userData, this._transformed = t._transformed, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}, dh = class {
  constructor(e, t) {
    this.isInterleavedBuffer = !0, this.array = e, this.stride = t, this.count = e !== void 0 ? e.length / t : 0, this.usage = Vo, this.updateRanges = [], this.version = 0, this.uuid = Jt();
  }
  onUploadCallback() {
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  setUsage(e) {
    return this.usage = e, this;
  }
  addUpdateRange(e, t) {
    this.updateRanges.push({
      start: e,
      count: t
    });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(e) {
    return this.array = new e.array.constructor(e.array), this.count = e.count, this.stride = e.stride, this.usage = e.usage, this;
  }
  copyAt(e, t, i) {
    e *= this.stride, i *= t.stride;
    for (let n = 0, r = this.stride; n < r; n++) this.array[e + n] = t.array[i + n];
    return this;
  }
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  clone(e) {
    e.arrayBuffers === void 0 && (e.arrayBuffers = {}), this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = Jt()), e.arrayBuffers[this.array.buffer._uuid] === void 0 && (e.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer);
    const t = new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]), i = new this.constructor(t, this.stride);
    return i.setUsage(this.usage), i;
  }
  onUpload(e) {
    return this.onUploadCallback = e, this;
  }
  toJSON(e) {
    return e.arrayBuffers === void 0 && (e.arrayBuffers = {}), this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = Jt()), e.arrayBuffers[this.array.buffer._uuid] === void 0 && (e.arrayBuffers[this.array.buffer._uuid] = Array.from(new Uint32Array(this.array.buffer))), {
      uuid: this.uuid,
      buffer: this.array.buffer._uuid,
      type: this.array.constructor.name,
      stride: this.stride
    };
  }
}, Rt = /* @__PURE__ */ new N(), fh = class il {
  constructor(t, i, n, r = !1) {
    this.isInterleavedBufferAttribute = !0, this.name = "", this.data = t, this.itemSize = i, this.offset = n, this.normalized = r;
  }
  get count() {
    return this.data.count;
  }
  get array() {
    return this.data.array;
  }
  set needsUpdate(t) {
    this.data.needsUpdate = t;
  }
  applyMatrix4(t) {
    for (let i = 0, n = this.data.count; i < n; i++)
      Rt.fromBufferAttribute(this, i), Rt.applyMatrix4(t), this.setXYZ(i, Rt.x, Rt.y, Rt.z);
    return this;
  }
  applyNormalMatrix(t) {
    for (let i = 0, n = this.count; i < n; i++)
      Rt.fromBufferAttribute(this, i), Rt.applyNormalMatrix(t), this.setXYZ(i, Rt.x, Rt.y, Rt.z);
    return this;
  }
  transformDirection(t) {
    for (let i = 0, n = this.count; i < n; i++)
      Rt.fromBufferAttribute(this, i), Rt.transformDirection(t), this.setXYZ(i, Rt.x, Rt.y, Rt.z);
    return this;
  }
  getComponent(t, i) {
    let n = this.array[t * this.data.stride + this.offset + i];
    return this.normalized && (n = Yt(n, this.array)), n;
  }
  setComponent(t, i, n) {
    return this.normalized && (n = Je(n, this.array)), this.data.array[t * this.data.stride + this.offset + i] = n, this;
  }
  setX(t, i) {
    return this.normalized && (i = Je(i, this.array)), this.data.array[t * this.data.stride + this.offset] = i, this;
  }
  setY(t, i) {
    return this.normalized && (i = Je(i, this.array)), this.data.array[t * this.data.stride + this.offset + 1] = i, this;
  }
  setZ(t, i) {
    return this.normalized && (i = Je(i, this.array)), this.data.array[t * this.data.stride + this.offset + 2] = i, this;
  }
  setW(t, i) {
    return this.normalized && (i = Je(i, this.array)), this.data.array[t * this.data.stride + this.offset + 3] = i, this;
  }
  getX(t) {
    let i = this.data.array[t * this.data.stride + this.offset];
    return this.normalized && (i = Yt(i, this.array)), i;
  }
  getY(t) {
    let i = this.data.array[t * this.data.stride + this.offset + 1];
    return this.normalized && (i = Yt(i, this.array)), i;
  }
  getZ(t) {
    let i = this.data.array[t * this.data.stride + this.offset + 2];
    return this.normalized && (i = Yt(i, this.array)), i;
  }
  getW(t) {
    let i = this.data.array[t * this.data.stride + this.offset + 3];
    return this.normalized && (i = Yt(i, this.array)), i;
  }
  setXY(t, i, n) {
    return t = t * this.data.stride + this.offset, this.normalized && (i = Je(i, this.array), n = Je(n, this.array)), this.data.array[t + 0] = i, this.data.array[t + 1] = n, this;
  }
  setXYZ(t, i, n, r) {
    return t = t * this.data.stride + this.offset, this.normalized && (i = Je(i, this.array), n = Je(n, this.array), r = Je(r, this.array)), this.data.array[t + 0] = i, this.data.array[t + 1] = n, this.data.array[t + 2] = r, this;
  }
  setXYZW(t, i, n, r, s) {
    return t = t * this.data.stride + this.offset, this.normalized && (i = Je(i, this.array), n = Je(n, this.array), r = Je(r, this.array), s = Je(s, this.array)), this.data.array[t + 0] = i, this.data.array[t + 1] = n, this.data.array[t + 2] = r, this.data.array[t + 3] = s, this;
  }
  clone(t) {
    if (t === void 0) {
      Gr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");
      const i = [];
      for (let n = 0; n < this.count; n++) {
        const r = n * this.data.stride + this.offset;
        for (let s = 0; s < this.itemSize; s++) i.push(this.data.array[r + s]);
      }
      return new Pt(new this.array.constructor(i), this.itemSize, this.normalized);
    } else
      return t.interleavedBuffers === void 0 && (t.interleavedBuffers = {}), t.interleavedBuffers[this.data.uuid] === void 0 && (t.interleavedBuffers[this.data.uuid] = this.data.clone(t)), new il(t.interleavedBuffers[this.data.uuid], this.itemSize, this.offset, this.normalized);
  }
  toJSON(t) {
    if (t === void 0) {
      Gr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");
      const i = [];
      for (let n = 0; n < this.count; n++) {
        const r = n * this.data.stride + this.offset;
        for (let s = 0; s < this.itemSize; s++) i.push(this.data.array[r + s]);
      }
      return {
        itemSize: this.itemSize,
        type: this.array.constructor.name,
        array: i,
        normalized: this.normalized
      };
    } else
      return t.interleavedBuffers === void 0 && (t.interleavedBuffers = {}), t.interleavedBuffers[this.data.uuid] === void 0 && (t.interleavedBuffers[this.data.uuid] = this.data.toJSON(t)), {
        isInterleavedBufferAttribute: !0,
        itemSize: this.itemSize,
        data: this.data.uuid,
        offset: this.offset,
        normalized: this.normalized
      };
  }
}, ph = 0, ci = class extends Ui {
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: ph++ }), this.uuid = Jt(), this.name = "", this.type = "Material", this.blending = 1, this.side = 0, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = 100, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Ne(0, 0, 0), this.blendAlpha = 0, this.depthFunc = 3, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = es, this.stencilZFail = es, this.stencilZPass = es, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.allowOverride = !0, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(e) {
    this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e;
  }
  onBeforeRender() {
  }
  onBeforeCompile() {
  }
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(e) {
    if (e !== void 0)
      for (const t in e) {
        const i = e[t];
        if (i === void 0) {
          Se(`Material: parameter '${t}' has value of undefined.`);
          continue;
        }
        const n = this[t];
        if (n === void 0) {
          Se(`Material: '${t}' is not a property of THREE.${this.type}.`);
          continue;
        }
        n && n.isColor ? n.set(i) : n && n.isVector2 && i && i.isVector2 || n && n.isEuler && i && i.isEuler || n && n.isVector3 && i && i.isVector3 ? n.copy(i) : this[t] = i;
      }
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    t && (e = {
      textures: {},
      images: {}
    });
    const i = { metadata: {
      version: 4.7,
      type: "Material",
      generator: "Material.toJSON"
    } };
    i.uuid = this.uuid, i.type = this.type, this.name !== "" && (i.name = this.name), this.color && this.color.isColor && (i.color = this.color.getHex()), this.roughness !== void 0 && (i.roughness = this.roughness), this.metalness !== void 0 && (i.metalness = this.metalness), this.sheen !== void 0 && (i.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (i.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (i.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (i.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (i.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (i.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (i.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (i.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (i.shininess = this.shininess), this.clearcoat !== void 0 && (i.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (i.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (i.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (i.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (i.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, i.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.sheenColorMap && this.sheenColorMap.isTexture && (i.sheenColorMap = this.sheenColorMap.toJSON(e).uuid), this.sheenRoughnessMap && this.sheenRoughnessMap.isTexture && (i.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(e).uuid), this.dispersion !== void 0 && (i.dispersion = this.dispersion), this.iridescence !== void 0 && (i.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (i.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (i.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (i.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (i.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.anisotropy !== void 0 && (i.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (i.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (i.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (i.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (i.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (i.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (i.lightMap = this.lightMap.toJSON(e).uuid, i.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (i.aoMap = this.aoMap.toJSON(e).uuid, i.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (i.bumpMap = this.bumpMap.toJSON(e).uuid, i.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (i.normalMap = this.normalMap.toJSON(e).uuid, i.normalMapType = this.normalMapType, i.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (i.displacementMap = this.displacementMap.toJSON(e).uuid, i.displacementScale = this.displacementScale, i.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (i.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (i.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (i.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (i.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (i.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (i.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (i.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (i.combine = this.combine)), this.envMapRotation !== void 0 && (i.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (i.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (i.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (i.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (i.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (i.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (i.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (i.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (i.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (i.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (i.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (i.size = this.size), this.shadowSide !== null && (i.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (i.sizeAttenuation = this.sizeAttenuation), this.blending !== 1 && (i.blending = this.blending), this.side !== 0 && (i.side = this.side), this.vertexColors === !0 && (i.vertexColors = !0), this.opacity < 1 && (i.opacity = this.opacity), this.transparent === !0 && (i.transparent = !0), this.blendSrc !== 204 && (i.blendSrc = this.blendSrc), this.blendDst !== 205 && (i.blendDst = this.blendDst), this.blendEquation !== 100 && (i.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (i.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (i.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (i.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (i.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (i.blendAlpha = this.blendAlpha), this.depthFunc !== 3 && (i.depthFunc = this.depthFunc), this.depthTest === !1 && (i.depthTest = this.depthTest), this.depthWrite === !1 && (i.depthWrite = this.depthWrite), this.colorWrite === !1 && (i.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (i.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== 519 && (i.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (i.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (i.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== 7680 && (i.stencilFail = this.stencilFail), this.stencilZFail !== 7680 && (i.stencilZFail = this.stencilZFail), this.stencilZPass !== 7680 && (i.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (i.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (i.rotation = this.rotation), this.polygonOffset === !0 && (i.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (i.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (i.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (i.linewidth = this.linewidth), this.dashSize !== void 0 && (i.dashSize = this.dashSize), this.gapSize !== void 0 && (i.gapSize = this.gapSize), this.scale !== void 0 && (i.scale = this.scale), this.dithering === !0 && (i.dithering = !0), this.alphaTest > 0 && (i.alphaTest = this.alphaTest), this.alphaHash === !0 && (i.alphaHash = !0), this.alphaToCoverage === !0 && (i.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (i.premultipliedAlpha = !0), this.forceSinglePass === !0 && (i.forceSinglePass = !0), this.allowOverride === !1 && (i.allowOverride = !1), this.wireframe === !0 && (i.wireframe = !0), this.wireframeLinewidth > 1 && (i.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (i.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (i.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (i.flatShading = !0), this.visible === !1 && (i.visible = !1), this.toneMapped === !1 && (i.toneMapped = !1), this.fog === !1 && (i.fog = !1), Object.keys(this.userData).length > 0 && (i.userData = this.userData);
    function n(r) {
      const s = [];
      for (const a in r) {
        const o = r[a];
        delete o.metadata, s.push(o);
      }
      return s;
    }
    if (t) {
      const r = n(e.textures), s = n(e.images);
      r.length > 0 && (i.textures = r), s.length > 0 && (i.images = s);
    }
    return i;
  }
  fromJSON(e, t) {
    if (e.uuid !== void 0 && (this.uuid = e.uuid), e.name !== void 0 && (this.name = e.name), e.color !== void 0 && this.color !== void 0 && this.color.setHex(e.color), e.roughness !== void 0 && (this.roughness = e.roughness), e.metalness !== void 0 && (this.metalness = e.metalness), e.sheen !== void 0 && (this.sheen = e.sheen), e.sheenColor !== void 0 && (this.sheenColor = new Ne().setHex(e.sheenColor)), e.sheenRoughness !== void 0 && (this.sheenRoughness = e.sheenRoughness), e.emissive !== void 0 && this.emissive !== void 0 && this.emissive.setHex(e.emissive), e.specular !== void 0 && this.specular !== void 0 && this.specular.setHex(e.specular), e.specularIntensity !== void 0 && (this.specularIntensity = e.specularIntensity), e.specularColor !== void 0 && this.specularColor !== void 0 && this.specularColor.setHex(e.specularColor), e.shininess !== void 0 && (this.shininess = e.shininess), e.clearcoat !== void 0 && (this.clearcoat = e.clearcoat), e.clearcoatRoughness !== void 0 && (this.clearcoatRoughness = e.clearcoatRoughness), e.dispersion !== void 0 && (this.dispersion = e.dispersion), e.iridescence !== void 0 && (this.iridescence = e.iridescence), e.iridescenceIOR !== void 0 && (this.iridescenceIOR = e.iridescenceIOR), e.iridescenceThicknessRange !== void 0 && (this.iridescenceThicknessRange = e.iridescenceThicknessRange), e.transmission !== void 0 && (this.transmission = e.transmission), e.thickness !== void 0 && (this.thickness = e.thickness), e.attenuationDistance !== void 0 && (this.attenuationDistance = e.attenuationDistance), e.attenuationColor !== void 0 && this.attenuationColor !== void 0 && this.attenuationColor.setHex(e.attenuationColor), e.anisotropy !== void 0 && (this.anisotropy = e.anisotropy), e.anisotropyRotation !== void 0 && (this.anisotropyRotation = e.anisotropyRotation), e.fog !== void 0 && (this.fog = e.fog), e.flatShading !== void 0 && (this.flatShading = e.flatShading), e.blending !== void 0 && (this.blending = e.blending), e.combine !== void 0 && (this.combine = e.combine), e.side !== void 0 && (this.side = e.side), e.shadowSide !== void 0 && (this.shadowSide = e.shadowSide), e.opacity !== void 0 && (this.opacity = e.opacity), e.transparent !== void 0 && (this.transparent = e.transparent), e.alphaTest !== void 0 && (this.alphaTest = e.alphaTest), e.alphaHash !== void 0 && (this.alphaHash = e.alphaHash), e.depthFunc !== void 0 && (this.depthFunc = e.depthFunc), e.depthTest !== void 0 && (this.depthTest = e.depthTest), e.depthWrite !== void 0 && (this.depthWrite = e.depthWrite), e.colorWrite !== void 0 && (this.colorWrite = e.colorWrite), e.blendSrc !== void 0 && (this.blendSrc = e.blendSrc), e.blendDst !== void 0 && (this.blendDst = e.blendDst), e.blendEquation !== void 0 && (this.blendEquation = e.blendEquation), e.blendSrcAlpha !== void 0 && (this.blendSrcAlpha = e.blendSrcAlpha), e.blendDstAlpha !== void 0 && (this.blendDstAlpha = e.blendDstAlpha), e.blendEquationAlpha !== void 0 && (this.blendEquationAlpha = e.blendEquationAlpha), e.blendColor !== void 0 && this.blendColor !== void 0 && this.blendColor.setHex(e.blendColor), e.blendAlpha !== void 0 && (this.blendAlpha = e.blendAlpha), e.stencilWriteMask !== void 0 && (this.stencilWriteMask = e.stencilWriteMask), e.stencilFunc !== void 0 && (this.stencilFunc = e.stencilFunc), e.stencilRef !== void 0 && (this.stencilRef = e.stencilRef), e.stencilFuncMask !== void 0 && (this.stencilFuncMask = e.stencilFuncMask), e.stencilFail !== void 0 && (this.stencilFail = e.stencilFail), e.stencilZFail !== void 0 && (this.stencilZFail = e.stencilZFail), e.stencilZPass !== void 0 && (this.stencilZPass = e.stencilZPass), e.stencilWrite !== void 0 && (this.stencilWrite = e.stencilWrite), e.wireframe !== void 0 && (this.wireframe = e.wireframe), e.wireframeLinewidth !== void 0 && (this.wireframeLinewidth = e.wireframeLinewidth), e.wireframeLinecap !== void 0 && (this.wireframeLinecap = e.wireframeLinecap), e.wireframeLinejoin !== void 0 && (this.wireframeLinejoin = e.wireframeLinejoin), e.rotation !== void 0 && (this.rotation = e.rotation), e.linewidth !== void 0 && (this.linewidth = e.linewidth), e.dashSize !== void 0 && (this.dashSize = e.dashSize), e.gapSize !== void 0 && (this.gapSize = e.gapSize), e.scale !== void 0 && (this.scale = e.scale), e.polygonOffset !== void 0 && (this.polygonOffset = e.polygonOffset), e.polygonOffsetFactor !== void 0 && (this.polygonOffsetFactor = e.polygonOffsetFactor), e.polygonOffsetUnits !== void 0 && (this.polygonOffsetUnits = e.polygonOffsetUnits), e.dithering !== void 0 && (this.dithering = e.dithering), e.alphaToCoverage !== void 0 && (this.alphaToCoverage = e.alphaToCoverage), e.premultipliedAlpha !== void 0 && (this.premultipliedAlpha = e.premultipliedAlpha), e.forceSinglePass !== void 0 && (this.forceSinglePass = e.forceSinglePass), e.allowOverride !== void 0 && (this.allowOverride = e.allowOverride), e.visible !== void 0 && (this.visible = e.visible), e.toneMapped !== void 0 && (this.toneMapped = e.toneMapped), e.userData !== void 0 && (this.userData = e.userData), e.vertexColors !== void 0 && (typeof e.vertexColors == "number" ? this.vertexColors = e.vertexColors > 0 : this.vertexColors = e.vertexColors), e.size !== void 0 && (this.size = e.size), e.sizeAttenuation !== void 0 && (this.sizeAttenuation = e.sizeAttenuation), e.map !== void 0 && (this.map = t[e.map] || null), e.matcap !== void 0 && (this.matcap = t[e.matcap] || null), e.alphaMap !== void 0 && (this.alphaMap = t[e.alphaMap] || null), e.bumpMap !== void 0 && (this.bumpMap = t[e.bumpMap] || null), e.bumpScale !== void 0 && (this.bumpScale = e.bumpScale), e.normalMap !== void 0 && (this.normalMap = t[e.normalMap] || null), e.normalMapType !== void 0 && (this.normalMapType = e.normalMapType), e.normalScale !== void 0) {
      let i = e.normalScale;
      Array.isArray(i) === !1 && (i = [i, i]), this.normalScale = new De().fromArray(i);
    }
    return e.displacementMap !== void 0 && (this.displacementMap = t[e.displacementMap] || null), e.displacementScale !== void 0 && (this.displacementScale = e.displacementScale), e.displacementBias !== void 0 && (this.displacementBias = e.displacementBias), e.roughnessMap !== void 0 && (this.roughnessMap = t[e.roughnessMap] || null), e.metalnessMap !== void 0 && (this.metalnessMap = t[e.metalnessMap] || null), e.emissiveMap !== void 0 && (this.emissiveMap = t[e.emissiveMap] || null), e.emissiveIntensity !== void 0 && (this.emissiveIntensity = e.emissiveIntensity), e.specularMap !== void 0 && (this.specularMap = t[e.specularMap] || null), e.specularIntensityMap !== void 0 && (this.specularIntensityMap = t[e.specularIntensityMap] || null), e.specularColorMap !== void 0 && (this.specularColorMap = t[e.specularColorMap] || null), e.envMap !== void 0 && (this.envMap = t[e.envMap] || null), e.envMapRotation !== void 0 && this.envMapRotation.fromArray(e.envMapRotation), e.envMapIntensity !== void 0 && (this.envMapIntensity = e.envMapIntensity), e.reflectivity !== void 0 && (this.reflectivity = e.reflectivity), e.refractionRatio !== void 0 && (this.refractionRatio = e.refractionRatio), e.lightMap !== void 0 && (this.lightMap = t[e.lightMap] || null), e.lightMapIntensity !== void 0 && (this.lightMapIntensity = e.lightMapIntensity), e.aoMap !== void 0 && (this.aoMap = t[e.aoMap] || null), e.aoMapIntensity !== void 0 && (this.aoMapIntensity = e.aoMapIntensity), e.gradientMap !== void 0 && (this.gradientMap = t[e.gradientMap] || null), e.clearcoatMap !== void 0 && (this.clearcoatMap = t[e.clearcoatMap] || null), e.clearcoatRoughnessMap !== void 0 && (this.clearcoatRoughnessMap = t[e.clearcoatRoughnessMap] || null), e.clearcoatNormalMap !== void 0 && (this.clearcoatNormalMap = t[e.clearcoatNormalMap] || null), e.clearcoatNormalScale !== void 0 && (this.clearcoatNormalScale = new De().fromArray(e.clearcoatNormalScale)), e.iridescenceMap !== void 0 && (this.iridescenceMap = t[e.iridescenceMap] || null), e.iridescenceThicknessMap !== void 0 && (this.iridescenceThicknessMap = t[e.iridescenceThicknessMap] || null), e.transmissionMap !== void 0 && (this.transmissionMap = t[e.transmissionMap] || null), e.thicknessMap !== void 0 && (this.thicknessMap = t[e.thicknessMap] || null), e.anisotropyMap !== void 0 && (this.anisotropyMap = t[e.anisotropyMap] || null), e.sheenColorMap !== void 0 && (this.sheenColorMap = t[e.sheenColorMap] || null), e.sheenRoughnessMap !== void 0 && (this.sheenRoughnessMap = t[e.sheenRoughnessMap] || null), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.blendColor.copy(e.blendColor), this.blendAlpha = e.blendAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
    const t = e.clippingPlanes;
    let i = null;
    if (t !== null) {
      const n = t.length;
      i = new Array(n);
      for (let r = 0; r !== n; ++r) i[r] = t[r].clone();
    }
    return this.clippingPlanes = i, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.allowOverride = e.allowOverride, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
}, bi = /* @__PURE__ */ new N(), vs = /* @__PURE__ */ new N(), hr = /* @__PURE__ */ new N(), Ci = /* @__PURE__ */ new N(), bs = /* @__PURE__ */ new N(), ur = /* @__PURE__ */ new N(), Ms = /* @__PURE__ */ new N(), er = class {
  constructor(e = new N(), t = new N(0, 0, -1)) {
    this.origin = e, this.direction = t;
  }
  set(e, t) {
    return this.origin.copy(e), this.direction.copy(t), this;
  }
  copy(e) {
    return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
  }
  at(e, t) {
    return t.copy(this.origin).addScaledVector(this.direction, e);
  }
  lookAt(e) {
    return this.direction.copy(e).sub(this.origin).normalize(), this;
  }
  recast(e) {
    return this.origin.copy(this.at(e, bi)), this;
  }
  closestPointToPoint(e, t) {
    t.subVectors(e, this.origin);
    const i = t.dot(this.direction);
    return i < 0 ? t.copy(this.origin) : t.copy(this.origin).addScaledVector(this.direction, i);
  }
  distanceToPoint(e) {
    return Math.sqrt(this.distanceSqToPoint(e));
  }
  distanceSqToPoint(e) {
    const t = bi.subVectors(e, this.origin).dot(this.direction);
    return t < 0 ? this.origin.distanceToSquared(e) : (bi.copy(this.origin).addScaledVector(this.direction, t), bi.distanceToSquared(e));
  }
  distanceSqToSegment(e, t, i, n) {
    vs.copy(e).add(t).multiplyScalar(0.5), hr.copy(t).sub(e).normalize(), Ci.copy(this.origin).sub(vs);
    const r = e.distanceTo(t) * 0.5, s = -this.direction.dot(hr), a = Ci.dot(this.direction), o = -Ci.dot(hr), l = Ci.lengthSq(), c = Math.abs(1 - s * s);
    let h, d, u, p;
    if (c > 0)
      if (h = s * o - a, d = s * a - o, p = r * c, h >= 0) if (d >= -p) if (d <= p) {
        const v = 1 / c;
        h *= v, d *= v, u = h * (h + s * d + 2 * a) + d * (s * h + d + 2 * o) + l;
      } else
        d = r, h = Math.max(0, -(s * d + a)), u = -h * h + d * (d + 2 * o) + l;
      else
        d = -r, h = Math.max(0, -(s * d + a)), u = -h * h + d * (d + 2 * o) + l;
      else d <= -p ? (h = Math.max(0, -(-s * r + a)), d = h > 0 ? -r : Math.min(Math.max(-r, -o), r), u = -h * h + d * (d + 2 * o) + l) : d <= p ? (h = 0, d = Math.min(Math.max(-r, -o), r), u = d * (d + 2 * o) + l) : (h = Math.max(0, -(s * r + a)), d = h > 0 ? r : Math.min(Math.max(-r, -o), r), u = -h * h + d * (d + 2 * o) + l);
    else
      d = s > 0 ? -r : r, h = Math.max(0, -(s * d + a)), u = -h * h + d * (d + 2 * o) + l;
    return i && i.copy(this.origin).addScaledVector(this.direction, h), n && n.copy(vs).addScaledVector(hr, d), u;
  }
  intersectSphere(e, t) {
    bi.subVectors(e.center, this.origin);
    const i = bi.dot(this.direction), n = bi.dot(bi) - i * i, r = e.radius * e.radius;
    if (n > r) return null;
    const s = Math.sqrt(r - n), a = i - s, o = i + s;
    return o < 0 ? null : a < 0 ? this.at(o, t) : this.at(a, t);
  }
  intersectsSphere(e) {
    return e.radius < 0 ? !1 : this.distanceSqToPoint(e.center) <= e.radius * e.radius;
  }
  distanceToPlane(e) {
    const t = e.normal.dot(this.direction);
    if (t === 0)
      return e.distanceToPoint(this.origin) === 0 ? 0 : null;
    const i = -(this.origin.dot(e.normal) + e.constant) / t;
    return i >= 0 ? i : null;
  }
  intersectPlane(e, t) {
    const i = this.distanceToPlane(e);
    return i === null ? null : this.at(i, t);
  }
  intersectsPlane(e) {
    const t = e.distanceToPoint(this.origin);
    return t === 0 || e.normal.dot(this.direction) * t < 0;
  }
  intersectBox(e, t) {
    let i, n, r, s, a, o;
    const l = 1 / this.direction.x, c = 1 / this.direction.y, h = 1 / this.direction.z, d = this.origin;
    return l >= 0 ? (i = (e.min.x - d.x) * l, n = (e.max.x - d.x) * l) : (i = (e.max.x - d.x) * l, n = (e.min.x - d.x) * l), c >= 0 ? (r = (e.min.y - d.y) * c, s = (e.max.y - d.y) * c) : (r = (e.max.y - d.y) * c, s = (e.min.y - d.y) * c), i > s || r > n || ((r > i || isNaN(i)) && (i = r), (s < n || isNaN(n)) && (n = s), h >= 0 ? (a = (e.min.z - d.z) * h, o = (e.max.z - d.z) * h) : (a = (e.max.z - d.z) * h, o = (e.min.z - d.z) * h), i > o || a > n) || ((a > i || i !== i) && (i = a), (o < n || n !== n) && (n = o), n < 0) ? null : this.at(i >= 0 ? i : n, t);
  }
  intersectsBox(e) {
    return this.intersectBox(e, bi) !== null;
  }
  intersectTriangle(e, t, i, n, r) {
    bs.subVectors(t, e), ur.subVectors(i, e), Ms.crossVectors(bs, ur);
    let s = this.direction.dot(Ms), a;
    if (s > 0) {
      if (n) return null;
      a = 1;
    } else if (s < 0)
      a = -1, s = -s;
    else return null;
    Ci.subVectors(this.origin, e);
    const o = a * this.direction.dot(ur.crossVectors(Ci, ur));
    if (o < 0) return null;
    const l = a * this.direction.dot(bs.cross(Ci));
    if (l < 0 || o + l > s) return null;
    const c = -a * Ci.dot(Ms);
    return c < 0 ? null : this.at(c / s, r);
  }
  applyMatrix4(e) {
    return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this;
  }
  equals(e) {
    return e.origin.equals(this.origin) && e.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}, Wi = class extends ci {
  constructor(e) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new Ne(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Sn(), this.combine = 0, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
  }
}, Ra = /* @__PURE__ */ new Ge(), Bi = /* @__PURE__ */ new er(), dr = /* @__PURE__ */ new di(), wa = /* @__PURE__ */ new N(), fr = /* @__PURE__ */ new N(), pr = /* @__PURE__ */ new N(), mr = /* @__PURE__ */ new N(), xs = /* @__PURE__ */ new N(), gr = /* @__PURE__ */ new N(), Ca = /* @__PURE__ */ new N(), _r = /* @__PURE__ */ new N(), Ft = class extends dt {
  constructor(e = new Qt(), t = new Wi()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.count = 1, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), e.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), e.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes, t = Object.keys(e);
    if (t.length > 0) {
      const i = e[t[0]];
      if (i !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let n = 0, r = i.length; n < r; n++) {
          const s = i[n].name || String(n);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[s] = n;
        }
      }
    }
  }
  getVertexPosition(e, t) {
    const i = this.geometry, n = i.attributes.position, r = i.morphAttributes.position, s = i.morphTargetsRelative;
    t.fromBufferAttribute(n, e);
    const a = this.morphTargetInfluences;
    if (r && a) {
      gr.set(0, 0, 0);
      for (let o = 0, l = r.length; o < l; o++) {
        const c = a[o], h = r[o];
        c !== 0 && (xs.fromBufferAttribute(h, e), s ? gr.addScaledVector(xs, c) : gr.addScaledVector(xs.sub(t), c));
      }
      t.add(gr);
    }
    return t;
  }
  raycast(e, t) {
    const i = this.geometry, n = this.material, r = this.matrixWorld;
    n !== void 0 && (i.boundingSphere === null && i.computeBoundingSphere(), dr.copy(i.boundingSphere), dr.applyMatrix4(r), Bi.copy(e.ray).recast(e.near), !(dr.containsPoint(Bi.origin) === !1 && (Bi.intersectSphere(dr, wa) === null || Bi.origin.distanceToSquared(wa) > (e.far - e.near) ** 2)) && (Ra.copy(r).invert(), Bi.copy(e.ray).applyMatrix4(Ra), !(i.boundingBox !== null && Bi.intersectsBox(i.boundingBox) === !1) && this._computeIntersections(e, t, Bi)));
  }
  _computeIntersections(e, t, i) {
    let n;
    const r = this.geometry, s = this.material, a = r.index, o = r.attributes.position, l = r.attributes.uv, c = r.attributes.uv1, h = r.attributes.normal, d = r.groups, u = r.drawRange;
    if (a !== null) if (Array.isArray(s)) for (let p = 0, v = d.length; p < v; p++) {
      const b = d[p], m = s[b.materialIndex], f = Math.max(b.start, u.start), T = Math.min(a.count, Math.min(b.start + b.count, u.start + u.count));
      for (let A = f, M = T; A < M; A += 3) {
        const E = a.getX(A), R = a.getX(A + 1), C = a.getX(A + 2);
        n = vr(this, m, e, i, l, c, h, E, R, C), n && (n.faceIndex = Math.floor(A / 3), n.face.materialIndex = b.materialIndex, t.push(n));
      }
    }
    else {
      const p = Math.max(0, u.start), v = Math.min(a.count, u.start + u.count);
      for (let b = p, m = v; b < m; b += 3) {
        const f = a.getX(b), T = a.getX(b + 1), A = a.getX(b + 2);
        n = vr(this, s, e, i, l, c, h, f, T, A), n && (n.faceIndex = Math.floor(b / 3), t.push(n));
      }
    }
    else if (o !== void 0) if (Array.isArray(s)) for (let p = 0, v = d.length; p < v; p++) {
      const b = d[p], m = s[b.materialIndex], f = Math.max(b.start, u.start), T = Math.min(o.count, Math.min(b.start + b.count, u.start + u.count));
      for (let A = f, M = T; A < M; A += 3) {
        const E = A, R = A + 1, C = A + 2;
        n = vr(this, m, e, i, l, c, h, E, R, C), n && (n.faceIndex = Math.floor(A / 3), n.face.materialIndex = b.materialIndex, t.push(n));
      }
    }
    else {
      const p = Math.max(0, u.start), v = Math.min(o.count, u.start + u.count);
      for (let b = p, m = v; b < m; b += 3) {
        const f = b, T = b + 1, A = b + 2;
        n = vr(this, s, e, i, l, c, h, f, T, A), n && (n.faceIndex = Math.floor(b / 3), t.push(n));
      }
    }
  }
};
function mh(e, t, i, n, r, s, a, o) {
  let l;
  if (t.side === 1 ? l = n.intersectTriangle(a, s, r, !0, o) : l = n.intersectTriangle(r, s, a, t.side === 0, o), l === null) return null;
  _r.copy(o), _r.applyMatrix4(e.matrixWorld);
  const c = i.ray.origin.distanceTo(_r);
  return c < i.near || c > i.far ? null : {
    distance: c,
    point: _r.clone(),
    object: e
  };
}
function vr(e, t, i, n, r, s, a, o, l, c) {
  e.getVertexPosition(o, fr), e.getVertexPosition(l, pr), e.getVertexPosition(c, mr);
  const h = mh(e, t, i, n, fr, pr, mr, Ca);
  if (h) {
    const d = new N();
    In.getBarycoord(Ca, fr, pr, mr, d), r && (h.uv = In.getInterpolatedAttribute(r, o, l, c, d, new De())), s && (h.uv1 = In.getInterpolatedAttribute(s, o, l, c, d, new De())), a && (h.normal = In.getInterpolatedAttribute(a, o, l, c, d, new N()), h.normal.dot(n.direction) > 0 && h.normal.multiplyScalar(-1));
    const u = {
      a: o,
      b: l,
      c,
      normal: new N(),
      materialIndex: 0
    };
    In.getNormal(fr, pr, mr, u.normal), h.face = u, h.barycoord = d;
  }
  return h;
}
var On = /* @__PURE__ */ new it(), Pa = /* @__PURE__ */ new it(), La = /* @__PURE__ */ new it(), gh = /* @__PURE__ */ new it(), Da = /* @__PURE__ */ new Ge(), br = /* @__PURE__ */ new N(), Ss = /* @__PURE__ */ new di(), Ia = /* @__PURE__ */ new Ge(), ys = /* @__PURE__ */ new er(), _h = class extends Ft {
  constructor(e, t) {
    super(e, t), this.isSkinnedMesh = !0, this.type = "SkinnedMesh", this.bindMode = Fl, this.bindMatrix = new Ge(), this.bindMatrixInverse = new Ge(), this.boundingBox = null, this.boundingSphere = null;
  }
  computeBoundingBox() {
    const e = this.geometry;
    this.boundingBox === null && (this.boundingBox = new ui()), this.boundingBox.makeEmpty();
    const t = e.getAttribute("position");
    for (let i = 0; i < t.count; i++)
      this.getVertexPosition(i, br), this.boundingBox.expandByPoint(br);
  }
  computeBoundingSphere() {
    const e = this.geometry;
    this.boundingSphere === null && (this.boundingSphere = new di()), this.boundingSphere.makeEmpty();
    const t = e.getAttribute("position");
    for (let i = 0; i < t.count; i++)
      this.getVertexPosition(i, br), this.boundingSphere.expandByPoint(br);
  }
  copy(e, t) {
    return super.copy(e, t), this.bindMode = e.bindMode, this.bindMatrix.copy(e.bindMatrix), this.bindMatrixInverse.copy(e.bindMatrixInverse), this.skeleton = e.skeleton, e.boundingBox !== null && (this.boundingBox = e.boundingBox.clone()), e.boundingSphere !== null && (this.boundingSphere = e.boundingSphere.clone()), this;
  }
  raycast(e, t) {
    const i = this.material, n = this.matrixWorld;
    i !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), Ss.copy(this.boundingSphere), Ss.applyMatrix4(n), e.ray.intersectsSphere(Ss) !== !1 && (Ia.copy(n).invert(), ys.copy(e.ray).applyMatrix4(Ia), !(this.boundingBox !== null && ys.intersectsBox(this.boundingBox) === !1) && this._computeIntersections(e, t, ys)));
  }
  getVertexPosition(e, t) {
    return super.getVertexPosition(e, t), this.applyBoneTransform(e, t), t;
  }
  bind(e, t) {
    this.skeleton = e, t === void 0 && (this.updateMatrixWorld(!0), this.skeleton.calculateInverses(), t = this.matrixWorld), this.bindMatrix.copy(t), this.bindMatrixInverse.copy(t).invert();
  }
  pose() {
    this.skeleton.pose();
  }
  normalizeSkinWeights() {
    const e = new it(), t = this.geometry.attributes.skinWeight;
    for (let i = 0, n = t.count; i < n; i++) {
      e.fromBufferAttribute(t, i);
      const r = 1 / e.manhattanLength();
      r !== 1 / 0 ? e.multiplyScalar(r) : e.set(1, 0, 0, 0), t.setXYZW(i, e.x, e.y, e.z, e.w);
    }
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this.bindMode === "attached" ? this.bindMatrixInverse.copy(this.matrixWorld).invert() : this.bindMode === "detached" ? this.bindMatrixInverse.copy(this.bindMatrix).invert() : Se("SkinnedMesh: Unrecognized bindMode: " + this.bindMode);
  }
  applyBoneTransform(e, t) {
    const i = this.skeleton, n = this.geometry;
    Pa.fromBufferAttribute(n.attributes.skinIndex, e), La.fromBufferAttribute(n.attributes.skinWeight, e), t.isVector4 ? (On.copy(t), t.set(0, 0, 0, 0)) : (On.set(...t, 1), t.set(0, 0, 0)), On.applyMatrix4(this.bindMatrix);
    for (let r = 0; r < 4; r++) {
      const s = La.getComponent(r);
      if (s !== 0) {
        const a = Pa.getComponent(r);
        Da.multiplyMatrices(i.bones[a].matrixWorld, i.boneInverses[a]), t.addScaledVector(gh.copy(On).applyMatrix4(Da), s);
      }
    }
    return t.isVector4 && (t.w = On.w), t.applyMatrix4(this.bindMatrixInverse);
  }
}, nl = class extends dt {
  constructor() {
    super(), this.isBone = !0, this.type = "Bone";
  }
}, Ks = class extends Ut {
  constructor(e = null, t = 1, i = 1, n, r, s, a, o, l = Tt, c = Tt, h, d) {
    super(null, s, a, o, l, c, n, r, h, d), this.isDataTexture = !0, this.image = {
      data: e,
      width: t,
      height: i
    }, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}, Na = /* @__PURE__ */ new Ge(), vh = /* @__PURE__ */ new Ge(), bh = class rl {
  constructor(t = [], i = []) {
    this.uuid = Jt(), this.bones = t.slice(0), this.boneInverses = i, this.boneMatrices = null, this.boneTexture = null, this.init();
  }
  init() {
    const t = this.bones, i = this.boneInverses;
    if (this.boneMatrices = new Float32Array(t.length * 16), i.length === 0) this.calculateInverses();
    else if (t.length !== i.length) {
      Se("Skeleton: Number of inverse bone matrices does not match amount of bones."), this.boneInverses = [];
      for (let n = 0, r = this.bones.length; n < r; n++) this.boneInverses.push(new Ge());
    }
  }
  calculateInverses() {
    this.boneInverses.length = 0;
    for (let t = 0, i = this.bones.length; t < i; t++) {
      const n = new Ge();
      this.bones[t] && n.copy(this.bones[t].matrixWorld).invert(), this.boneInverses.push(n);
    }
  }
  pose() {
    for (let t = 0, i = this.bones.length; t < i; t++) {
      const n = this.bones[t];
      n && n.matrixWorld.copy(this.boneInverses[t]).invert();
    }
    for (let t = 0, i = this.bones.length; t < i; t++) {
      const n = this.bones[t];
      n && (n.parent && n.parent.isBone ? (n.matrix.copy(n.parent.matrixWorld).invert(), n.matrix.multiply(n.matrixWorld)) : n.matrix.copy(n.matrixWorld), n.matrix.decompose(n.position, n.quaternion, n.scale));
    }
  }
  update() {
    const t = this.bones, i = this.boneInverses, n = this.boneMatrices, r = this.boneTexture;
    for (let s = 0, a = t.length; s < a; s++) {
      const o = t[s] ? t[s].matrixWorld : vh;
      Na.multiplyMatrices(o, i[s]), Na.toArray(n, s * 16);
    }
    r !== null && (r.needsUpdate = !0);
  }
  clone() {
    return new rl(this.bones, this.boneInverses);
  }
  computeBoneTexture() {
    let t = Math.sqrt(this.bones.length * 4);
    t = Math.ceil(t / 4) * 4, t = Math.max(t, 4);
    const i = new Float32Array(t * t * 4);
    i.set(this.boneMatrices);
    const n = new Ks(i, t, t, vn, Tn);
    return n.needsUpdate = !0, this.boneMatrices = i, this.boneTexture = n, this;
  }
  getBoneByName(t) {
    for (let i = 0, n = this.bones.length; i < n; i++) {
      const r = this.bones[i];
      if (r.name === t) return r;
    }
  }
  dispose() {
    this.boneTexture !== null && (this.boneTexture.dispose(), this.boneTexture = null);
  }
  fromJSON(t, i) {
    this.uuid = t.uuid;
    for (let n = 0, r = t.bones.length; n < r; n++) {
      const s = t.bones[n];
      let a = i[s];
      a === void 0 && (Se("Skeleton: No bone found with UUID:", s), a = new nl()), this.bones.push(a), this.boneInverses.push(new Ge().fromArray(t.boneInverses[n]));
    }
    return this.init(), this;
  }
  toJSON() {
    const t = {
      metadata: {
        version: 4.7,
        type: "Skeleton",
        generator: "Skeleton.toJSON"
      },
      bones: [],
      boneInverses: []
    };
    t.uuid = this.uuid;
    const i = this.bones, n = this.boneInverses;
    for (let r = 0, s = i.length; r < s; r++) {
      const a = i[r];
      t.bones.push(a.uuid);
      const o = n[r];
      t.boneInverses.push(o.toArray());
    }
    return t;
  }
}, Bs = class extends Pt {
  constructor(e, t, i, n = 1) {
    super(e, t, i), this.isInstancedBufferAttribute = !0, this.meshPerAttribute = n;
  }
  copy(e) {
    return super.copy(e), this.meshPerAttribute = e.meshPerAttribute, this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.meshPerAttribute = this.meshPerAttribute, e.isInstancedBufferAttribute = !0, e;
  }
}, an = /* @__PURE__ */ new Ge(), Ua = /* @__PURE__ */ new Ge(), Mr = [], Fa = /* @__PURE__ */ new ui(), Mh = /* @__PURE__ */ new Ge(), kn = /* @__PURE__ */ new Ft(), Bn = /* @__PURE__ */ new di(), xh = class extends Ft {
  constructor(e, t, i) {
    super(e, t), this.isInstancedMesh = !0, this.instanceMatrix = new Bs(new Float32Array(i * 16), 16), this.instanceColor = null, this.morphTexture = null, this.count = i, this.boundingBox = null, this.boundingSphere = null;
    for (let n = 0; n < i; n++) this.setMatrixAt(n, Mh);
  }
  computeBoundingBox() {
    const e = this.geometry, t = this.count;
    this.boundingBox === null && (this.boundingBox = new ui()), e.boundingBox === null && e.computeBoundingBox(), this.boundingBox.makeEmpty();
    for (let i = 0; i < t; i++)
      this.getMatrixAt(i, an), Fa.copy(e.boundingBox).applyMatrix4(an), this.boundingBox.union(Fa);
  }
  computeBoundingSphere() {
    const e = this.geometry, t = this.count;
    this.boundingSphere === null && (this.boundingSphere = new di()), e.boundingSphere === null && e.computeBoundingSphere(), this.boundingSphere.makeEmpty();
    for (let i = 0; i < t; i++)
      this.getMatrixAt(i, an), Bn.copy(e.boundingSphere).applyMatrix4(an), this.boundingSphere.union(Bn);
  }
  copy(e, t) {
    return super.copy(e, t), this.instanceMatrix.copy(e.instanceMatrix), e.morphTexture !== null && (this.morphTexture = e.morphTexture.clone()), e.instanceColor !== null && (this.instanceColor = e.instanceColor.clone()), this.count = e.count, e.boundingBox !== null && (this.boundingBox = e.boundingBox.clone()), e.boundingSphere !== null && (this.boundingSphere = e.boundingSphere.clone()), this;
  }
  getColorAt(e, t) {
    return this.instanceColor === null ? t.setRGB(1, 1, 1) : t.fromArray(this.instanceColor.array, e * 3);
  }
  getMatrixAt(e, t) {
    return t.fromArray(this.instanceMatrix.array, e * 16);
  }
  getMorphAt(e, t) {
    const i = t.morphTargetInfluences, n = this.morphTexture.source.data.data, r = e * (i.length + 1) + 1;
    for (let s = 0; s < i.length; s++) i[s] = n[r + s];
  }
  raycast(e, t) {
    const i = this.matrixWorld, n = this.count;
    if (kn.geometry = this.geometry, kn.material = this.material, kn.material !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), Bn.copy(this.boundingSphere), Bn.applyMatrix4(i), e.ray.intersectsSphere(Bn) !== !1))
      for (let r = 0; r < n; r++) {
        this.getMatrixAt(r, an), Ua.multiplyMatrices(i, an), kn.matrixWorld = Ua, kn.raycast(e, Mr);
        for (let s = 0, a = Mr.length; s < a; s++) {
          const o = Mr[s];
          o.instanceId = r, o.object = this, t.push(o);
        }
        Mr.length = 0;
      }
  }
  setColorAt(e, t) {
    return this.instanceColor === null && (this.instanceColor = new Bs(new Float32Array(this.instanceMatrix.count * 3).fill(1), 3)), t.toArray(this.instanceColor.array, e * 3), this;
  }
  setMatrixAt(e, t) {
    return t.toArray(this.instanceMatrix.array, e * 16), this;
  }
  setMorphAt(e, t) {
    const i = t.morphTargetInfluences, n = i.length + 1;
    this.morphTexture === null && (this.morphTexture = new Ks(new Float32Array(n * this.count), n, this.count, ko, Tn));
    const r = this.morphTexture.source.data.data;
    let s = 0;
    for (let l = 0; l < i.length; l++) s += i[l];
    const a = this.geometry.morphTargetsRelative ? 1 : 1 - s, o = n * e;
    return r[o] = a, r.set(i, o + 1), this;
  }
  updateMorphTargets() {
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" }), this.morphTexture !== null && (this.morphTexture.dispose(), this.morphTexture = null);
  }
}, Es = /* @__PURE__ */ new N(), Sh = /* @__PURE__ */ new N(), yh = /* @__PURE__ */ new Fe(), Di = class {
  constructor(e = new N(1, 0, 0), t = 0) {
    this.isPlane = !0, this.normal = e, this.constant = t;
  }
  set(e, t) {
    return this.normal.copy(e), this.constant = t, this;
  }
  setComponents(e, t, i, n) {
    return this.normal.set(e, t, i), this.constant = n, this;
  }
  setFromNormalAndCoplanarPoint(e, t) {
    return this.normal.copy(e), this.constant = -t.dot(this.normal), this;
  }
  setFromCoplanarPoints(e, t, i) {
    const n = Es.subVectors(i, t).cross(Sh.subVectors(e, t)).normalize();
    return this.setFromNormalAndCoplanarPoint(n, e), this;
  }
  copy(e) {
    return this.normal.copy(e.normal), this.constant = e.constant, this;
  }
  normalize() {
    const e = 1 / this.normal.length();
    return this.normal.multiplyScalar(e), this.constant *= e, this;
  }
  negate() {
    return this.constant *= -1, this.normal.negate(), this;
  }
  distanceToPoint(e) {
    return this.normal.dot(e) + this.constant;
  }
  distanceToSphere(e) {
    return this.distanceToPoint(e.center) - e.radius;
  }
  projectPoint(e, t) {
    return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
  }
  intersectLine(e, t, i = !0) {
    const n = e.delta(Es), r = this.normal.dot(n);
    if (r === 0)
      return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null;
    const s = -(e.start.dot(this.normal) + this.constant) / r;
    return i === !0 && (s < 0 || s > 1) ? null : t.copy(e.start).addScaledVector(n, s);
  }
  intersectsLine(e) {
    const t = this.distanceToPoint(e.start), i = this.distanceToPoint(e.end);
    return t < 0 && i > 0 || i < 0 && t > 0;
  }
  intersectsBox(e) {
    return e.intersectsPlane(this);
  }
  intersectsSphere(e) {
    return e.intersectsPlane(this);
  }
  coplanarPoint(e) {
    return e.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(e, t) {
    const i = t || yh.getNormalMatrix(e), n = this.coplanarPoint(Es).applyMatrix4(e), r = this.normal.applyMatrix3(i).normalize();
    return this.constant = -n.dot(r), this;
  }
  translate(e) {
    return this.constant -= e.dot(this.normal), this;
  }
  equals(e) {
    return e.normal.equals(this.normal) && e.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}, zi = /* @__PURE__ */ new di(), Eh = /* @__PURE__ */ new De(0.5, 0.5), xr = /* @__PURE__ */ new N(), js = class {
  constructor(e = new Di(), t = new Di(), i = new Di(), n = new Di(), r = new Di(), s = new Di()) {
    this.planes = [
      e,
      t,
      i,
      n,
      r,
      s
    ];
  }
  set(e, t, i, n, r, s) {
    const a = this.planes;
    return a[0].copy(e), a[1].copy(t), a[2].copy(i), a[3].copy(n), a[4].copy(r), a[5].copy(s), this;
  }
  copy(e) {
    const t = this.planes;
    for (let i = 0; i < 6; i++) t[i].copy(e.planes[i]);
    return this;
  }
  setFromProjectionMatrix(e, t = bn, i = !1) {
    const n = this.planes, r = e.elements, s = r[0], a = r[1], o = r[2], l = r[3], c = r[4], h = r[5], d = r[6], u = r[7], p = r[8], v = r[9], b = r[10], m = r[11], f = r[12], T = r[13], A = r[14], M = r[15];
    if (n[0].setComponents(l - s, u - c, m - p, M - f).normalize(), n[1].setComponents(l + s, u + c, m + p, M + f).normalize(), n[2].setComponents(l + a, u + h, m + v, M + T).normalize(), n[3].setComponents(l - a, u - h, m - v, M - T).normalize(), i)
      n[4].setComponents(o, d, b, A).normalize(), n[5].setComponents(l - o, u - d, m - b, M - A).normalize();
    else if (n[4].setComponents(l - o, u - d, m - b, M - A).normalize(), t === 2e3) n[5].setComponents(l + o, u + d, m + b, M + A).normalize();
    else if (t === 2001) n[5].setComponents(o, d, b, A).normalize();
    else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
    return this;
  }
  intersectsObject(e) {
    if (e.boundingSphere !== void 0)
      e.boundingSphere === null && e.computeBoundingSphere(), zi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
    else {
      const t = e.geometry;
      t.boundingSphere === null && t.computeBoundingSphere(), zi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld);
    }
    return this.intersectsSphere(zi);
  }
  intersectsSprite(e) {
    return zi.center.set(0, 0, 0), zi.radius = 0.7071067811865476 + Eh.distanceTo(e.center), zi.applyMatrix4(e.matrixWorld), this.intersectsSphere(zi);
  }
  intersectsSphere(e) {
    const t = this.planes, i = e.center, n = -e.radius;
    for (let r = 0; r < 6; r++) if (t[r].distanceToPoint(i) < n) return !1;
    return !0;
  }
  intersectsBox(e) {
    const t = this.planes;
    for (let i = 0; i < 6; i++) {
      const n = t[i];
      if (xr.x = n.normal.x > 0 ? e.max.x : e.min.x, xr.y = n.normal.y > 0 ? e.max.y : e.min.y, xr.z = n.normal.z > 0 ? e.max.z : e.min.z, n.distanceToPoint(xr) < 0) return !1;
    }
    return !0;
  }
  containsPoint(e) {
    const t = this.planes;
    for (let i = 0; i < 6; i++) if (t[i].distanceToPoint(e) < 0) return !1;
    return !0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}, sl = class extends ci {
  constructor(e) {
    super(), this.isLineBasicMaterial = !0, this.type = "LineBasicMaterial", this.color = new Ne(16777215), this.map = null, this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.linewidth = e.linewidth, this.linecap = e.linecap, this.linejoin = e.linejoin, this.fog = e.fog, this;
  }
}, Vr = /* @__PURE__ */ new N(), Hr = /* @__PURE__ */ new N(), Oa = /* @__PURE__ */ new Ge(), zn = /* @__PURE__ */ new er(), Sr = /* @__PURE__ */ new di(), Ts = /* @__PURE__ */ new N(), ka = /* @__PURE__ */ new N(), Ys = class extends dt {
  constructor(e = new Qt(), t = new sl()) {
    super(), this.isLine = !0, this.type = "Line", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  computeLineDistances() {
    const e = this.geometry;
    if (e.index === null) {
      const t = e.attributes.position, i = [0];
      for (let n = 1, r = t.count; n < r; n++)
        Vr.fromBufferAttribute(t, n - 1), Hr.fromBufferAttribute(t, n), i[n] = i[n - 1], i[n] += Vr.distanceTo(Hr);
      e.setAttribute("lineDistance", new Nt(i, 1));
    } else Se("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
  raycast(e, t) {
    const i = this.geometry, n = this.matrixWorld, r = e.params.Line.threshold, s = i.drawRange;
    if (i.boundingSphere === null && i.computeBoundingSphere(), Sr.copy(i.boundingSphere), Sr.applyMatrix4(n), Sr.radius += r, e.ray.intersectsSphere(Sr) === !1) return;
    Oa.copy(n).invert(), zn.copy(e.ray).applyMatrix4(Oa);
    const a = r / ((this.scale.x + this.scale.y + this.scale.z) / 3), o = a * a, l = this.isLineSegments ? 2 : 1, c = i.index, h = i.attributes.position;
    if (c !== null) {
      const d = Math.max(0, s.start), u = Math.min(c.count, s.start + s.count);
      for (let p = d, v = u - 1; p < v; p += l) {
        const b = c.getX(p), m = c.getX(p + 1), f = yr(this, e, zn, o, b, m, p);
        f && t.push(f);
      }
      if (this.isLineLoop) {
        const p = c.getX(u - 1), v = c.getX(d), b = yr(this, e, zn, o, p, v, u - 1);
        b && t.push(b);
      }
    } else {
      const d = Math.max(0, s.start), u = Math.min(h.count, s.start + s.count);
      for (let p = d, v = u - 1; p < v; p += l) {
        const b = yr(this, e, zn, o, p, p + 1, p);
        b && t.push(b);
      }
      if (this.isLineLoop) {
        const p = yr(this, e, zn, o, u - 1, d, u - 1);
        p && t.push(p);
      }
    }
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes, t = Object.keys(e);
    if (t.length > 0) {
      const i = e[t[0]];
      if (i !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let n = 0, r = i.length; n < r; n++) {
          const s = i[n].name || String(n);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[s] = n;
        }
      }
    }
  }
};
function yr(e, t, i, n, r, s, a) {
  const o = e.geometry.attributes.position;
  if (Vr.fromBufferAttribute(o, r), Hr.fromBufferAttribute(o, s), i.distanceSqToSegment(Vr, Hr, Ts, ka) > n) return;
  Ts.applyMatrix4(e.matrixWorld);
  const l = t.ray.origin.distanceTo(Ts);
  if (!(l < t.near || l > t.far))
    return {
      distance: l,
      point: ka.clone().applyMatrix4(e.matrixWorld),
      index: a,
      face: null,
      faceIndex: null,
      barycoord: null,
      object: e
    };
}
var Ba = /* @__PURE__ */ new N(), za = /* @__PURE__ */ new N(), Th = class extends Ys {
  constructor(e, t) {
    super(e, t), this.isLineSegments = !0, this.type = "LineSegments";
  }
  computeLineDistances() {
    const e = this.geometry;
    if (e.index === null) {
      const t = e.attributes.position, i = [];
      for (let n = 0, r = t.count; n < r; n += 2)
        Ba.fromBufferAttribute(t, n), za.fromBufferAttribute(t, n + 1), i[n] = n === 0 ? 0 : i[n - 1], i[n + 1] = i[n] + Ba.distanceTo(za);
      e.setAttribute("lineDistance", new Nt(i, 1));
    } else Se("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
}, Ah = class extends Ys {
  constructor(e, t) {
    super(e, t), this.isLineLoop = !0, this.type = "LineLoop";
  }
}, al = class extends ci {
  constructor(e) {
    super(), this.isPointsMaterial = !0, this.type = "PointsMaterial", this.color = new Ne(16777215), this.map = null, this.alphaMap = null, this.size = 1, this.sizeAttenuation = !0, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.alphaMap = e.alphaMap, this.size = e.size, this.sizeAttenuation = e.sizeAttenuation, this.fog = e.fog, this;
  }
}, Ga = /* @__PURE__ */ new Ge(), zs = /* @__PURE__ */ new er(), Er = /* @__PURE__ */ new di(), Tr = /* @__PURE__ */ new N(), Rh = class extends dt {
  constructor(e = new Qt(), t = new al()) {
    super(), this.isPoints = !0, this.type = "Points", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  raycast(e, t) {
    const i = this.geometry, n = this.matrixWorld, r = e.params.Points.threshold, s = i.drawRange;
    if (i.boundingSphere === null && i.computeBoundingSphere(), Er.copy(i.boundingSphere), Er.applyMatrix4(n), Er.radius += r, e.ray.intersectsSphere(Er) === !1) return;
    Ga.copy(n).invert(), zs.copy(e.ray).applyMatrix4(Ga);
    const a = r / ((this.scale.x + this.scale.y + this.scale.z) / 3), o = a * a, l = i.index, c = i.attributes.position;
    if (l !== null) {
      const h = Math.max(0, s.start), d = Math.min(l.count, s.start + s.count);
      for (let u = h, p = d; u < p; u++) {
        const v = l.getX(u);
        Tr.fromBufferAttribute(c, v), Va(Tr, v, o, n, e, t, this);
      }
    } else {
      const h = Math.max(0, s.start), d = Math.min(c.count, s.start + s.count);
      for (let u = h, p = d; u < p; u++)
        Tr.fromBufferAttribute(c, u), Va(Tr, u, o, n, e, t, this);
    }
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes, t = Object.keys(e);
    if (t.length > 0) {
      const i = e[t[0]];
      if (i !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let n = 0, r = i.length; n < r; n++) {
          const s = i[n].name || String(n);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[s] = n;
        }
      }
    }
  }
};
function Va(e, t, i, n, r, s, a) {
  const o = zs.distanceSqToPoint(e);
  if (o < i) {
    const l = new N();
    zs.closestPointToPoint(e, l), l.applyMatrix4(n);
    const c = r.ray.origin.distanceTo(l);
    if (c < r.near || c > r.far) return;
    s.push({
      distance: c,
      distanceToRay: Math.sqrt(o),
      point: l,
      index: t,
      face: null,
      faceIndex: null,
      barycoord: null,
      object: a
    });
  }
}
var ol = class extends Ut {
  constructor(e = [], t = 301, i, n, r, s, a, o, l, c) {
    super(e, t, i, n, r, s, a, o, l, c), this.isCubeTexture = !0, this.flipY = !1;
  }
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}, yn = class extends Ut {
  constructor(e, t, i = qi, n, r, s, a = Tt, o = Tt, l, c = jn, h = 1) {
    if (c !== 1026 && c !== 1027) throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    super({
      width: e,
      height: t,
      depth: h
    }, n, r, s, a, o, c, i, l), this.isDepthTexture = !0, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(e) {
    return super.copy(e), this.source = new Xs(Object.assign({}, e.image)), this.compareFunction = e.compareFunction, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.compareFunction !== null && (t.compareFunction = this.compareFunction), t;
  }
}, wh = class extends yn {
  constructor(e, t = qi, i = 301, n, r, s = Tt, a = Tt, o, l = jn) {
    const c = {
      width: e,
      height: e,
      depth: 1
    }, h = [
      c,
      c,
      c,
      c,
      c,
      c
    ];
    super(e, e, t, i, n, r, s, a, o, l), this.image = h, this.isCubeDepthTexture = !0, this.isCubeTexture = !0;
  }
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}, ll = class extends Ut {
  constructor(e = null) {
    super(), this.sourceTexture = e, this.isExternalTexture = !0;
  }
  copy(e) {
    return super.copy(e), this.sourceTexture = e.sourceTexture, this;
  }
}, Js = class cl extends Qt {
  constructor(t = 1, i = 1, n = 1, r = 1, s = 1, a = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: t,
      height: i,
      depth: n,
      widthSegments: r,
      heightSegments: s,
      depthSegments: a
    };
    const o = this;
    r = Math.floor(r), s = Math.floor(s), a = Math.floor(a);
    const l = [], c = [], h = [], d = [];
    let u = 0, p = 0;
    v("z", "y", "x", -1, -1, n, i, t, a, s, 0), v("z", "y", "x", 1, -1, n, i, -t, a, s, 1), v("x", "z", "y", 1, 1, t, n, i, r, a, 2), v("x", "z", "y", 1, -1, t, n, -i, r, a, 3), v("x", "y", "z", 1, -1, t, i, n, r, s, 4), v("x", "y", "z", -1, -1, t, i, -n, r, s, 5), this.setIndex(l), this.setAttribute("position", new Nt(c, 3)), this.setAttribute("normal", new Nt(h, 3)), this.setAttribute("uv", new Nt(d, 2));
    function v(b, m, f, T, A, M, E, R, C, g, y) {
      const B = M / C, w = E / g, k = M / 2, X = E / 2, q = R / 2, G = C + 1, K = g + 1;
      let O = 0, te = 0;
      const $ = new N();
      for (let ie = 0; ie < K; ie++) {
        const ue = ie * w - X;
        for (let Ee = 0; Ee < G; Ee++)
          $[b] = (Ee * B - k) * T, $[m] = ue * A, $[f] = q, c.push($.x, $.y, $.z), $[b] = 0, $[m] = 0, $[f] = R > 0 ? 1 : -1, h.push($.x, $.y, $.z), d.push(Ee / C), d.push(1 - ie / g), O += 1;
      }
      for (let ie = 0; ie < g; ie++) for (let ue = 0; ue < C; ue++) {
        const Ee = u + ue + G * ie, ve = u + ue + G * (ie + 1), ye = u + (ue + 1) + G * (ie + 1), H = u + (ue + 1) + G * ie;
        l.push(Ee, ve, H), l.push(ve, ye, H), te += 6;
      }
      o.addGroup(p, te, y), p += te, u += O;
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new cl(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
  }
}, Ch = class hl extends Qt {
  constructor(t = 1, i = 1, n = 1, r = 32, s = 1, a = !1, o = 0, l = Math.PI * 2) {
    super(), this.type = "CylinderGeometry", this.parameters = {
      radiusTop: t,
      radiusBottom: i,
      height: n,
      radialSegments: r,
      heightSegments: s,
      openEnded: a,
      thetaStart: o,
      thetaLength: l
    };
    const c = this;
    r = Math.floor(r), s = Math.floor(s);
    const h = [], d = [], u = [], p = [];
    let v = 0;
    const b = [], m = n / 2;
    let f = 0;
    T(), a === !1 && (t > 0 && A(!0), i > 0 && A(!1)), this.setIndex(h), this.setAttribute("position", new Nt(d, 3)), this.setAttribute("normal", new Nt(u, 3)), this.setAttribute("uv", new Nt(p, 2));
    function T() {
      const M = new N(), E = new N();
      let R = 0;
      const C = (i - t) / n;
      for (let g = 0; g <= s; g++) {
        const y = [], B = g / s, w = B * (i - t) + t;
        for (let k = 0; k <= r; k++) {
          const X = k / r, q = X * l + o, G = Math.sin(q), K = Math.cos(q);
          E.x = w * G, E.y = -B * n + m, E.z = w * K, d.push(E.x, E.y, E.z), M.set(G, C, K).normalize(), u.push(M.x, M.y, M.z), p.push(X, 1 - B), y.push(v++);
        }
        b.push(y);
      }
      for (let g = 0; g < r; g++) for (let y = 0; y < s; y++) {
        const B = b[y][g], w = b[y + 1][g], k = b[y + 1][g + 1], X = b[y][g + 1];
        (t > 0 || y !== 0) && (h.push(B, w, X), R += 3), (i > 0 || y !== s - 1) && (h.push(w, k, X), R += 3);
      }
      c.addGroup(f, R, 0), f += R;
    }
    function A(M) {
      const E = v, R = new De(), C = new N();
      let g = 0;
      const y = M === !0 ? t : i, B = M === !0 ? 1 : -1;
      for (let k = 1; k <= r; k++)
        d.push(0, m * B, 0), u.push(0, B, 0), p.push(0.5, 0.5), v++;
      const w = v;
      for (let k = 0; k <= r; k++) {
        const X = k / r * l + o, q = Math.cos(X), G = Math.sin(X);
        C.x = y * G, C.y = m * B, C.z = y * q, d.push(C.x, C.y, C.z), u.push(0, B, 0), R.x = q * 0.5 + 0.5, R.y = G * 0.5 * B + 0.5, p.push(R.x, R.y), v++;
      }
      for (let k = 0; k < r; k++) {
        const X = E + k, q = w + k;
        M === !0 ? h.push(q, q + 1, X) : h.push(q + 1, q, X), g += 3;
      }
      c.addGroup(f, g, M === !0 ? 1 : 2), f += g;
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new hl(t.radiusTop, t.radiusBottom, t.height, t.radialSegments, t.heightSegments, t.openEnded, t.thetaStart, t.thetaLength);
  }
}, ul = class dl extends Qt {
  constructor(t = 1, i = 1, n = 1, r = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: t,
      height: i,
      widthSegments: n,
      heightSegments: r
    };
    const s = t / 2, a = i / 2, o = Math.floor(n), l = Math.floor(r), c = o + 1, h = l + 1, d = t / o, u = i / l, p = [], v = [], b = [], m = [];
    for (let f = 0; f < h; f++) {
      const T = f * u - a;
      for (let A = 0; A < c; A++) {
        const M = A * d - s;
        v.push(M, -T, 0), b.push(0, 0, 1), m.push(A / o), m.push(1 - f / l);
      }
    }
    for (let f = 0; f < l; f++) for (let T = 0; T < o; T++) {
      const A = T + c * f, M = T + c * (f + 1), E = T + 1 + c * (f + 1), R = T + 1 + c * f;
      p.push(A, M, R), p.push(M, E, R);
    }
    this.setIndex(p), this.setAttribute("position", new Nt(v, 3)), this.setAttribute("normal", new Nt(b, 3)), this.setAttribute("uv", new Nt(m, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new dl(t.width, t.height, t.widthSegments, t.heightSegments);
  }
};
function En(e) {
  const t = {};
  for (const i in e) {
    t[i] = {};
    for (const n in e[i]) {
      const r = e[i][n];
      if (Ha(r)) r.isRenderTargetTexture ? (Se("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), t[i][n] = null) : t[i][n] = r.clone();
      else if (Array.isArray(r)) if (Ha(r[0])) {
        const s = [];
        for (let a = 0, o = r.length; a < o; a++) s[a] = r[a].clone();
        t[i][n] = s;
      } else t[i][n] = r.slice();
      else t[i][n] = r;
    }
  }
  return t;
}
function wt(e) {
  const t = {};
  for (let i = 0; i < e.length; i++) {
    const n = En(e[i]);
    for (const r in n) t[r] = n[r];
  }
  return t;
}
function Ha(e) {
  return e && (e.isColor || e.isMatrix3 || e.isMatrix4 || e.isVector2 || e.isVector3 || e.isVector4 || e.isTexture || e.isQuaternion);
}
function Ph(e) {
  const t = [];
  for (let i = 0; i < e.length; i++) t.push(e[i].clone());
  return t;
}
function fl(e) {
  const t = e.getRenderTarget();
  return t === null ? e.outputColorSpace : t.isXRRenderTarget === !0 ? t.texture.colorSpace : He.workingColorSpace;
}
var Lh = {
  clone: En,
  merge: wt
}, Dh = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, Ih = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`, hi = class extends ci {
  constructor(e) {
    super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = Dh, this.fragmentShader = Ih, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
      clipCullDistance: !1,
      multiDraw: !1
    }, this.defaultAttributeValues = {
      color: [
        1,
        1,
        1
      ],
      uv: [0, 0],
      uv1: [0, 0]
    }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, e !== void 0 && this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = En(e.uniforms), this.uniformsGroups = Ph(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this.defaultAttributeValues = Object.assign({}, e.defaultAttributeValues), this.index0AttributeName = e.index0AttributeName, this.uniformsNeedUpdate = e.uniformsNeedUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    t.glslVersion = this.glslVersion, t.uniforms = {};
    for (const n in this.uniforms) {
      const r = this.uniforms[n].value;
      r && r.isTexture ? t.uniforms[n] = {
        type: "t",
        value: r.toJSON(e).uuid
      } : r && r.isColor ? t.uniforms[n] = {
        type: "c",
        value: r.getHex()
      } : r && r.isVector2 ? t.uniforms[n] = {
        type: "v2",
        value: r.toArray()
      } : r && r.isVector3 ? t.uniforms[n] = {
        type: "v3",
        value: r.toArray()
      } : r && r.isVector4 ? t.uniforms[n] = {
        type: "v4",
        value: r.toArray()
      } : r && r.isMatrix3 ? t.uniforms[n] = {
        type: "m3",
        value: r.toArray()
      } : r && r.isMatrix4 ? t.uniforms[n] = {
        type: "m4",
        value: r.toArray()
      } : t.uniforms[n] = { value: r };
    }
    Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping;
    const i = {};
    for (const n in this.extensions) this.extensions[n] === !0 && (i[n] = !0);
    return Object.keys(i).length > 0 && (t.extensions = i), t;
  }
  fromJSON(e, t) {
    if (super.fromJSON(e, t), e.uniforms !== void 0) for (const i in e.uniforms) {
      const n = e.uniforms[i];
      switch (this.uniforms[i] = {}, n.type) {
        case "t":
          this.uniforms[i].value = t[n.value] || null;
          break;
        case "c":
          this.uniforms[i].value = new Ne().setHex(n.value);
          break;
        case "v2":
          this.uniforms[i].value = new De().fromArray(n.value);
          break;
        case "v3":
          this.uniforms[i].value = new N().fromArray(n.value);
          break;
        case "v4":
          this.uniforms[i].value = new it().fromArray(n.value);
          break;
        case "m3":
          this.uniforms[i].value = new Fe().fromArray(n.value);
          break;
        case "m4":
          this.uniforms[i].value = new Ge().fromArray(n.value);
          break;
        default:
          this.uniforms[i].value = n.value;
      }
    }
    if (e.defines !== void 0 && (this.defines = e.defines), e.vertexShader !== void 0 && (this.vertexShader = e.vertexShader), e.fragmentShader !== void 0 && (this.fragmentShader = e.fragmentShader), e.glslVersion !== void 0 && (this.glslVersion = e.glslVersion), e.extensions !== void 0) for (const i in e.extensions) this.extensions[i] = e.extensions[i];
    return e.lights !== void 0 && (this.lights = e.lights), e.clipping !== void 0 && (this.clipping = e.clipping), this;
  }
}, Nh = class extends hi {
  constructor(e) {
    super(e), this.isRawShaderMaterial = !0, this.type = "RawShaderMaterial";
  }
}, Xr = class extends ci {
  constructor(e) {
    super(), this.isMeshStandardMaterial = !0, this.type = "MeshStandardMaterial", this.defines = { STANDARD: "" }, this.color = new Ne(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Ne(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new De(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Sn(), this.envMapIntensity = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.defines = { STANDARD: "" }, this.color.copy(e.color), this.roughness = e.roughness, this.metalness = e.metalness, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.roughnessMap = e.roughnessMap, this.metalnessMap = e.metalnessMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.envMapIntensity = e.envMapIntensity, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this;
  }
}, fi = class extends Xr {
  constructor(e) {
    super(), this.isMeshPhysicalMaterial = !0, this.defines = {
      STANDARD: "",
      PHYSICAL: ""
    }, this.type = "MeshPhysicalMaterial", this.anisotropyRotation = 0, this.anisotropyMap = null, this.clearcoatMap = null, this.clearcoatRoughness = 0, this.clearcoatRoughnessMap = null, this.clearcoatNormalScale = new De(1, 1), this.clearcoatNormalMap = null, this.ior = 1.5, Object.defineProperty(this, "reflectivity", {
      get: function() {
        return Be(2.5 * (this.ior - 1) / (this.ior + 1), 0, 1);
      },
      set: function(t) {
        this.ior = (1 + 0.4 * t) / (1 - 0.4 * t);
      }
    }), this.iridescenceMap = null, this.iridescenceIOR = 1.3, this.iridescenceThicknessRange = [100, 400], this.iridescenceThicknessMap = null, this.sheenColor = new Ne(0), this.sheenColorMap = null, this.sheenRoughness = 1, this.sheenRoughnessMap = null, this.transmissionMap = null, this.thickness = 0, this.thicknessMap = null, this.attenuationDistance = 1 / 0, this.attenuationColor = new Ne(1, 1, 1), this.specularIntensity = 1, this.specularIntensityMap = null, this.specularColor = new Ne(1, 1, 1), this.specularColorMap = null, this._anisotropy = 0, this._clearcoat = 0, this._dispersion = 0, this._iridescence = 0, this._sheen = 0, this._transmission = 0, this.setValues(e);
  }
  get anisotropy() {
    return this._anisotropy;
  }
  set anisotropy(e) {
    this._anisotropy > 0 != e > 0 && this.version++, this._anisotropy = e;
  }
  get clearcoat() {
    return this._clearcoat;
  }
  set clearcoat(e) {
    this._clearcoat > 0 != e > 0 && this.version++, this._clearcoat = e;
  }
  get iridescence() {
    return this._iridescence;
  }
  set iridescence(e) {
    this._iridescence > 0 != e > 0 && this.version++, this._iridescence = e;
  }
  get dispersion() {
    return this._dispersion;
  }
  set dispersion(e) {
    this._dispersion > 0 != e > 0 && this.version++, this._dispersion = e;
  }
  get sheen() {
    return this._sheen;
  }
  set sheen(e) {
    this._sheen > 0 != e > 0 && this.version++, this._sheen = e;
  }
  get transmission() {
    return this._transmission;
  }
  set transmission(e) {
    this._transmission > 0 != e > 0 && this.version++, this._transmission = e;
  }
  copy(e) {
    return super.copy(e), this.defines = {
      STANDARD: "",
      PHYSICAL: ""
    }, this.anisotropy = e.anisotropy, this.anisotropyRotation = e.anisotropyRotation, this.anisotropyMap = e.anisotropyMap, this.clearcoat = e.clearcoat, this.clearcoatMap = e.clearcoatMap, this.clearcoatRoughness = e.clearcoatRoughness, this.clearcoatRoughnessMap = e.clearcoatRoughnessMap, this.clearcoatNormalMap = e.clearcoatNormalMap, this.clearcoatNormalScale.copy(e.clearcoatNormalScale), this.dispersion = e.dispersion, this.ior = e.ior, this.iridescence = e.iridescence, this.iridescenceMap = e.iridescenceMap, this.iridescenceIOR = e.iridescenceIOR, this.iridescenceThicknessRange = [...e.iridescenceThicknessRange], this.iridescenceThicknessMap = e.iridescenceThicknessMap, this.sheen = e.sheen, this.sheenColor.copy(e.sheenColor), this.sheenColorMap = e.sheenColorMap, this.sheenRoughness = e.sheenRoughness, this.sheenRoughnessMap = e.sheenRoughnessMap, this.transmission = e.transmission, this.transmissionMap = e.transmissionMap, this.thickness = e.thickness, this.thicknessMap = e.thicknessMap, this.attenuationDistance = e.attenuationDistance, this.attenuationColor.copy(e.attenuationColor), this.specularIntensity = e.specularIntensity, this.specularIntensityMap = e.specularIntensityMap, this.specularColor.copy(e.specularColor), this.specularColorMap = e.specularColorMap, this;
  }
}, Uh = class extends ci {
  constructor(e) {
    super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = Rc, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this;
  }
}, Fh = class extends ci {
  constructor(e) {
    super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this;
  }
};
function Ar(e, t) {
  return !e || e.constructor === t ? e : typeof t.BYTES_PER_ELEMENT == "number" ? new t(e) : Array.prototype.slice.call(e);
}
function Oh(e) {
  function t(r, s) {
    return e[r] - e[s];
  }
  const i = e.length, n = new Array(i);
  for (let r = 0; r !== i; ++r) n[r] = r;
  return n.sort(t), n;
}
function Wa(e, t, i) {
  const n = e.length, r = new e.constructor(n);
  for (let s = 0, a = 0; a !== n; ++s) {
    const o = i[s] * t;
    for (let l = 0; l !== t; ++l) r[a++] = e[o + l];
  }
  return r;
}
function kh(e, t, i, n) {
  let r = 1, s = e[0];
  for (; s !== void 0 && s[n] === void 0; ) s = e[r++];
  if (s === void 0) return;
  let a = s[n];
  if (a !== void 0)
    if (Array.isArray(a)) do
      a = s[n], a !== void 0 && (t.push(s.time), i.push(...a)), s = e[r++];
    while (s !== void 0);
    else if (a.toArray !== void 0) do
      a = s[n], a !== void 0 && (t.push(s.time), a.toArray(i, i.length)), s = e[r++];
    while (s !== void 0);
    else do
      a = s[n], a !== void 0 && (t.push(s.time), i.push(a)), s = e[r++];
    while (s !== void 0);
}
var An = class {
  constructor(e, t, i, n) {
    this.parameterPositions = e, this._cachedIndex = 0, this.resultBuffer = n !== void 0 ? n : new t.constructor(i), this.sampleValues = t, this.valueSize = i, this.settings = null, this.DefaultSettings_ = {};
  }
  evaluate(e) {
    const t = this.parameterPositions;
    let i = this._cachedIndex, n = t[i], r = t[i - 1];
    e: {
      t: {
        let s;
        i: {
          n: if (!(e < n)) {
            for (let a = i + 2; ; ) {
              if (n === void 0) {
                if (e < r) break n;
                return i = t.length, this._cachedIndex = i, this.copySampleValue_(i - 1);
              }
              if (i === a) break;
              if (r = n, n = t[++i], e < n) break t;
            }
            s = t.length;
            break i;
          }
          if (!(e >= r)) {
            const a = t[1];
            e < a && (i = 2, r = a);
            for (let o = i - 2; ; ) {
              if (r === void 0)
                return this._cachedIndex = 0, this.copySampleValue_(0);
              if (i === o) break;
              if (n = r, r = t[--i - 1], e >= r) break t;
            }
            s = i, i = 0;
            break i;
          }
          break e;
        }
        for (; i < s; ) {
          const a = i + s >>> 1;
          e < t[a] ? s = a : i = a + 1;
        }
        if (n = t[i], r = t[i - 1], r === void 0)
          return this._cachedIndex = 0, this.copySampleValue_(0);
        if (n === void 0)
          return i = t.length, this._cachedIndex = i, this.copySampleValue_(i - 1);
      }
      this._cachedIndex = i, this.intervalChanged_(i, r, n);
    }
    return this.interpolate_(i, r, e, n);
  }
  getSettings_() {
    return this.settings || this.DefaultSettings_;
  }
  copySampleValue_(e) {
    const t = this.resultBuffer, i = this.sampleValues, n = this.valueSize, r = e * n;
    for (let s = 0; s !== n; ++s) t[s] = i[r + s];
    return t;
  }
  interpolate_() {
    throw new Error("THREE.Interpolant: Call to abstract method.");
  }
  intervalChanged_() {
  }
}, Bh = class extends An {
  constructor(e, t, i, n) {
    super(e, t, i, n), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = {
      endingStart: ua,
      endingEnd: ua
    };
  }
  intervalChanged_(e, t, i) {
    const n = this.parameterPositions;
    let r = e - 2, s = e + 1, a = n[r], o = n[s];
    if (a === void 0) switch (this.getSettings_().endingStart) {
      case da:
        r = e, a = 2 * t - i;
        break;
      case fa:
        r = n.length - 2, a = t + n[r] - n[r + 1];
        break;
      default:
        r = e, a = i;
    }
    if (o === void 0) switch (this.getSettings_().endingEnd) {
      case da:
        s = e, o = 2 * i - t;
        break;
      case fa:
        s = 1, o = i + n[1] - n[0];
        break;
      default:
        s = e - 1, o = t;
    }
    const l = (i - t) * 0.5, c = this.valueSize;
    this._weightPrev = l / (t - a), this._weightNext = l / (o - i), this._offsetPrev = r * c, this._offsetNext = s * c;
  }
  interpolate_(e, t, i, n) {
    const r = this.resultBuffer, s = this.sampleValues, a = this.valueSize, o = e * a, l = o - a, c = this._offsetPrev, h = this._offsetNext, d = this._weightPrev, u = this._weightNext, p = (i - t) / (n - t), v = p * p, b = v * p, m = -d * b + 2 * d * v - d * p, f = (1 + d) * b + (-1.5 - 2 * d) * v + (-0.5 + d) * p + 1, T = (-1 - u) * b + (1.5 + u) * v + 0.5 * p, A = u * b - u * v;
    for (let M = 0; M !== a; ++M) r[M] = m * s[c + M] + f * s[l + M] + T * s[o + M] + A * s[h + M];
    return r;
  }
}, zh = class extends An {
  constructor(e, t, i, n) {
    super(e, t, i, n);
  }
  interpolate_(e, t, i, n) {
    const r = this.resultBuffer, s = this.sampleValues, a = this.valueSize, o = e * a, l = o - a, c = (i - t) / (n - t), h = 1 - c;
    for (let d = 0; d !== a; ++d) r[d] = s[l + d] * h + s[o + d] * c;
    return r;
  }
}, Gh = class extends An {
  constructor(e, t, i, n) {
    super(e, t, i, n);
  }
  interpolate_(e) {
    return this.copySampleValue_(e - 1);
  }
}, Vh = class extends An {
  interpolate_(e, t, i, n) {
    const r = this.resultBuffer, s = this.sampleValues, a = this.valueSize, o = e * a, l = o - a, c = this.inTangents, h = this.outTangents;
    if (!c || !h) {
      const p = (i - t) / (n - t), v = 1 - p;
      for (let b = 0; b !== a; ++b) r[b] = s[l + b] * v + s[o + b] * p;
      return r;
    }
    const d = a * 2, u = e - 1;
    for (let p = 0; p !== a; ++p) {
      const v = s[l + p], b = s[o + p], m = u * d + p * 2, f = h[m], T = h[m + 1], A = e * d + p * 2, M = c[A], E = c[A + 1];
      let R = (i - t) / (n - t), C, g, y, B, w;
      for (let k = 0; k < 8; k++) {
        C = R * R, g = C * R, y = 1 - R, B = y * y, w = B * y;
        const X = w * t + 3 * B * R * f + 3 * y * C * M + g * n - i;
        if (Math.abs(X) < 1e-10) break;
        const q = 3 * B * (f - t) + 6 * y * R * (M - f) + 3 * C * (n - M);
        if (Math.abs(q) < 1e-10) break;
        R = R - X / q, R = Math.max(0, Math.min(1, R));
      }
      r[p] = w * v + 3 * B * R * T + 3 * y * C * E + g * b;
    }
    return r;
  }
}, ei = class {
  constructor(e, t, i, n) {
    if (e === void 0) throw new Error("THREE.KeyframeTrack: track name is undefined");
    if (t === void 0 || t.length === 0) throw new Error("THREE.KeyframeTrack: no keyframes in track named " + e);
    this.name = e, this.times = Ar(t, this.TimeBufferType), this.values = Ar(i, this.ValueBufferType), this.setInterpolation(n || this.DefaultInterpolation);
  }
  static toJSON(e) {
    const t = e.constructor;
    let i;
    if (t.toJSON !== this.toJSON) i = t.toJSON(e);
    else {
      i = {
        name: e.name,
        times: Ar(e.times, Array),
        values: Ar(e.values, Array)
      };
      const n = e.getInterpolation();
      n !== e.DefaultInterpolation && (i.interpolation = n);
    }
    return i.type = e.ValueTypeName, i;
  }
  InterpolantFactoryMethodDiscrete(e) {
    return new Gh(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodLinear(e) {
    return new zh(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodSmooth(e) {
    return new Bh(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodBezier(e) {
    const t = new Vh(this.times, this.values, this.getValueSize(), e);
    return this.settings && (t.inTangents = this.settings.inTangents, t.outTangents = this.settings.outTangents), t;
  }
  setInterpolation(e) {
    let t;
    switch (e) {
      case Yn:
        t = this.InterpolantFactoryMethodDiscrete;
        break;
      case Jn:
        t = this.InterpolantFactoryMethodLinear;
        break;
      case Qr:
        t = this.InterpolantFactoryMethodSmooth;
        break;
      case ha:
        t = this.InterpolantFactoryMethodBezier;
        break;
    }
    if (t === void 0) {
      const i = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
      if (this.createInterpolant === void 0) if (e !== this.DefaultInterpolation) this.setInterpolation(this.DefaultInterpolation);
      else throw new Error(i);
      return Se("KeyframeTrack:", i), this;
    }
    return this.createInterpolant = t, this;
  }
  getInterpolation() {
    switch (this.createInterpolant) {
      case this.InterpolantFactoryMethodDiscrete:
        return Yn;
      case this.InterpolantFactoryMethodLinear:
        return Jn;
      case this.InterpolantFactoryMethodSmooth:
        return Qr;
      case this.InterpolantFactoryMethodBezier:
        return ha;
    }
  }
  getValueSize() {
    return this.values.length / this.times.length;
  }
  shift(e) {
    if (e !== 0) {
      const t = this.times;
      for (let i = 0, n = t.length; i !== n; ++i) t[i] += e;
    }
    return this;
  }
  scale(e) {
    if (e !== 1) {
      const t = this.times;
      for (let i = 0, n = t.length; i !== n; ++i) t[i] *= e;
    }
    return this;
  }
  trim(e, t) {
    const i = this.times, n = i.length;
    let r = 0, s = n - 1;
    for (; r !== n && i[r] < e; ) ++r;
    for (; s !== -1 && i[s] > t; ) --s;
    if (++s, r !== 0 || s !== n) {
      r >= s && (s = Math.max(s, 1), r = s - 1);
      const a = this.getValueSize();
      this.times = i.slice(r, s), this.values = this.values.slice(r * a, s * a);
    }
    return this;
  }
  validate() {
    let e = !0;
    const t = this.getValueSize();
    t - Math.floor(t) !== 0 && (Le("KeyframeTrack: Invalid value size in track.", this), e = !1);
    const i = this.times, n = this.values, r = i.length;
    r === 0 && (Le("KeyframeTrack: Track is empty.", this), e = !1);
    let s = null;
    for (let a = 0; a !== r; a++) {
      const o = i[a];
      if (typeof o == "number" && isNaN(o)) {
        Le("KeyframeTrack: Time is not a valid number.", this, a, o), e = !1;
        break;
      }
      if (s !== null && s > o) {
        Le("KeyframeTrack: Out of order keys.", this, a, o, s), e = !1;
        break;
      }
      s = o;
    }
    if (n !== void 0 && Cc(n))
      for (let a = 0, o = n.length; a !== o; ++a) {
        const l = n[a];
        if (isNaN(l)) {
          Le("KeyframeTrack: Value is not a valid number.", this, a, l), e = !1;
          break;
        }
      }
    return e;
  }
  optimize() {
    const e = this.times.slice(), t = this.values.slice(), i = this.getValueSize(), n = this.getInterpolation() === Qr, r = e.length - 1;
    let s = 1;
    for (let a = 1; a < r; ++a) {
      let o = !1;
      const l = e[a];
      if (l !== e[a + 1] && (a !== 1 || l !== e[0])) if (n)
        o = !0;
      else {
        const c = a * i, h = c - i, d = c + i;
        for (let u = 0; u !== i; ++u) {
          const p = t[c + u];
          if (p !== t[h + u] || p !== t[d + u]) {
            o = !0;
            break;
          }
        }
      }
      if (o) {
        if (a !== s) {
          e[s] = e[a];
          const c = a * i, h = s * i;
          for (let d = 0; d !== i; ++d) t[h + d] = t[c + d];
        }
        ++s;
      }
    }
    if (r > 0) {
      e[s] = e[r];
      for (let a = r * i, o = s * i, l = 0; l !== i; ++l) t[o + l] = t[a + l];
      ++s;
    }
    return s !== e.length ? (this.times = e.slice(0, s), this.values = t.slice(0, s * i)) : (this.times = e, this.values = t), this;
  }
  clone() {
    const e = this.times.slice(), t = this.values.slice(), i = this.constructor, n = new i(this.name, e, t);
    return n.createInterpolant = this.createInterpolant, n;
  }
};
ei.prototype.ValueTypeName = "";
ei.prototype.TimeBufferType = Float32Array;
ei.prototype.ValueBufferType = Float32Array;
ei.prototype.DefaultInterpolation = Jn;
var Rn = class extends ei {
  constructor(e, t, i) {
    super(e, t, i);
  }
};
Rn.prototype.ValueTypeName = "bool";
Rn.prototype.ValueBufferType = Array;
Rn.prototype.DefaultInterpolation = Yn;
Rn.prototype.InterpolantFactoryMethodLinear = void 0;
Rn.prototype.InterpolantFactoryMethodSmooth = void 0;
var pl = class extends ei {
  constructor(e, t, i, n) {
    super(e, t, i, n);
  }
};
pl.prototype.ValueTypeName = "color";
var $n = class extends ei {
  constructor(e, t, i, n) {
    super(e, t, i, n);
  }
};
$n.prototype.ValueTypeName = "number";
var Hh = class extends An {
  constructor(e, t, i, n) {
    super(e, t, i, n);
  }
  interpolate_(e, t, i, n) {
    const r = this.resultBuffer, s = this.sampleValues, a = this.valueSize, o = (i - t) / (n - t);
    let l = e * a;
    for (let c = l + a; l !== c; l += 4) $t.slerpFlat(r, 0, s, l - a, s, l, o);
    return r;
  }
}, Qn = class extends ei {
  constructor(e, t, i, n) {
    super(e, t, i, n);
  }
  InterpolantFactoryMethodLinear(e) {
    return new Hh(this.times, this.values, this.getValueSize(), e);
  }
};
Qn.prototype.ValueTypeName = "quaternion";
Qn.prototype.InterpolantFactoryMethodSmooth = void 0;
var wn = class extends ei {
  constructor(e, t, i) {
    super(e, t, i);
  }
};
wn.prototype.ValueTypeName = "string";
wn.prototype.ValueBufferType = Array;
wn.prototype.DefaultInterpolation = Yn;
wn.prototype.InterpolantFactoryMethodLinear = void 0;
wn.prototype.InterpolantFactoryMethodSmooth = void 0;
var Wr = class extends ei {
  constructor(e, t, i, n) {
    super(e, t, i, n);
  }
};
Wr.prototype.ValueTypeName = "vector";
var Wh = class {
  constructor(e = "", t = -1, i = [], n = Ac) {
    this.name = e, this.tracks = i, this.duration = t, this.blendMode = n, this.uuid = Jt(), this.userData = {}, this.duration < 0 && this.resetDuration();
  }
  static parse(e) {
    const t = [], i = e.tracks, n = 1 / (e.fps || 1);
    for (let s = 0, a = i.length; s !== a; ++s) t.push(Xh(i[s]).scale(n));
    const r = new this(e.name, e.duration, t, e.blendMode);
    return r.uuid = e.uuid, r.userData = JSON.parse(e.userData || "{}"), r;
  }
  static toJSON(e) {
    const t = [], i = e.tracks, n = {
      name: e.name,
      duration: e.duration,
      tracks: t,
      uuid: e.uuid,
      blendMode: e.blendMode,
      userData: JSON.stringify(e.userData)
    };
    for (let r = 0, s = i.length; r !== s; ++r) t.push(ei.toJSON(i[r]));
    return n;
  }
  static CreateFromMorphTargetSequence(e, t, i, n) {
    const r = t.length, s = [];
    for (let a = 0; a < r; a++) {
      let o = [], l = [];
      o.push((a + r - 1) % r, a, (a + 1) % r), l.push(0, 1, 0);
      const c = Oh(o);
      o = Wa(o, 1, c), l = Wa(l, 1, c), !n && o[0] === 0 && (o.push(r), l.push(l[0])), s.push(new $n(".morphTargetInfluences[" + t[a].name + "]", o, l).scale(1 / i));
    }
    return new this(e, -1, s);
  }
  static findByName(e, t) {
    let i = e;
    if (!Array.isArray(e)) {
      const n = e;
      i = n.geometry && n.geometry.animations || n.animations;
    }
    for (let n = 0; n < i.length; n++) if (i[n].name === t) return i[n];
    return null;
  }
  static CreateClipsFromMorphTargetSequences(e, t, i) {
    const n = {}, r = /^([\w-]*?)([\d]+)$/;
    for (let a = 0, o = e.length; a < o; a++) {
      const l = e[a], c = l.name.match(r);
      if (c && c.length > 1) {
        const h = c[1];
        let d = n[h];
        d || (n[h] = d = []), d.push(l);
      }
    }
    const s = [];
    for (const a in n) s.push(this.CreateFromMorphTargetSequence(a, n[a], t, i));
    return s;
  }
  resetDuration() {
    const e = this.tracks;
    let t = 0;
    for (let i = 0, n = e.length; i !== n; ++i) {
      const r = this.tracks[i];
      t = Math.max(t, r.times[r.times.length - 1]);
    }
    return this.duration = t, this;
  }
  trim() {
    for (let e = 0; e < this.tracks.length; e++) this.tracks[e].trim(0, this.duration);
    return this;
  }
  validate() {
    let e = !0;
    for (let t = 0; t < this.tracks.length; t++) e = e && this.tracks[t].validate();
    return e;
  }
  optimize() {
    for (let e = 0; e < this.tracks.length; e++) this.tracks[e].optimize();
    return this;
  }
  clone() {
    const e = [];
    for (let i = 0; i < this.tracks.length; i++) e.push(this.tracks[i].clone());
    const t = new this.constructor(this.name, this.duration, e, this.blendMode);
    return t.userData = JSON.parse(JSON.stringify(this.userData)), t;
  }
  toJSON() {
    return this.constructor.toJSON(this);
  }
};
function qh(e) {
  switch (e.toLowerCase()) {
    case "scalar":
    case "double":
    case "float":
    case "number":
    case "integer":
      return $n;
    case "vector":
    case "vector2":
    case "vector3":
    case "vector4":
      return Wr;
    case "color":
      return pl;
    case "quaternion":
      return Qn;
    case "bool":
    case "boolean":
      return Rn;
    case "string":
      return wn;
  }
  throw new Error("THREE.KeyframeTrack: Unsupported typeName: " + e);
}
function Xh(e) {
  if (e.type === void 0) throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");
  const t = qh(e.type);
  if (e.times === void 0) {
    const i = [], n = [];
    kh(e.keys, i, n, "value"), e.times = i, e.values = n;
  }
  return t.parse !== void 0 ? t.parse(e) : new t(e.name, e.times, e.values, e.interpolation);
}
var xi = {
  enabled: !1,
  files: {},
  add: function(e, t) {
    this.enabled !== !1 && (qa(e) || (this.files[e] = t));
  },
  get: function(e) {
    if (this.enabled !== !1 && !qa(e))
      return this.files[e];
  },
  remove: function(e) {
    delete this.files[e];
  },
  clear: function() {
    this.files = {};
  }
};
function qa(e) {
  try {
    const t = e.slice(e.indexOf(":") + 1);
    return new URL(t).protocol === "blob:";
  } catch {
    return !1;
  }
}
var Kh = class {
  constructor(e, t, i) {
    const n = this;
    let r = !1, s = 0, a = 0, o;
    const l = [];
    this.onStart = void 0, this.onLoad = e, this.onProgress = t, this.onError = i, this._abortController = null, this.itemStart = function(c) {
      a++, r === !1 && n.onStart !== void 0 && n.onStart(c, s, a), r = !0;
    }, this.itemEnd = function(c) {
      s++, n.onProgress !== void 0 && n.onProgress(c, s, a), s === a && (r = !1, n.onLoad !== void 0 && n.onLoad());
    }, this.itemError = function(c) {
      n.onError !== void 0 && n.onError(c);
    }, this.resolveURL = function(c) {
      return c = c.normalize("NFC"), o ? o(c) : c;
    }, this.setURLModifier = function(c) {
      return o = c, this;
    }, this.addHandler = function(c, h) {
      return l.push(c, h), this;
    }, this.removeHandler = function(c) {
      const h = l.indexOf(c);
      return h !== -1 && l.splice(h, 2), this;
    }, this.getHandler = function(c) {
      for (let h = 0, d = l.length; h < d; h += 2) {
        const u = l[h], p = l[h + 1];
        if (u.global && (u.lastIndex = 0), u.test(c)) return p;
      }
      return null;
    }, this.abort = function() {
      return this.abortController.abort(), this._abortController = null, this;
    };
  }
  get abortController() {
    return this._abortController || (this._abortController = new AbortController()), this._abortController;
  }
}, jh = /* @__PURE__ */ new Kh(), Cn = class {
  constructor(e) {
    this.manager = e !== void 0 ? e : jh, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {}, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  load() {
  }
  loadAsync(e, t) {
    const i = this;
    return new Promise(function(n, r) {
      i.load(e, n, t, r);
    });
  }
  parse() {
  }
  setCrossOrigin(e) {
    return this.crossOrigin = e, this;
  }
  setWithCredentials(e) {
    return this.withCredentials = e, this;
  }
  setPath(e) {
    return this.path = e, this;
  }
  setResourcePath(e) {
    return this.resourcePath = e, this;
  }
  setRequestHeader(e) {
    return this.requestHeader = e, this;
  }
  abort() {
    return this;
  }
};
Cn.DEFAULT_MATERIAL_NAME = "__DEFAULT";
var Mi = {}, Yh = class extends Error {
  constructor(e, t) {
    super(e), this.response = t;
  }
}, ml = class extends Cn {
  constructor(e) {
    super(e), this.mimeType = "", this.responseType = "", this._abortController = new AbortController();
  }
  load(e, t, i, n) {
    e === void 0 && (e = ""), this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e);
    const r = xi.get(`file:${e}`);
    if (r !== void 0) {
      this.manager.itemStart(e), setTimeout(() => {
        t && t(r), this.manager.itemEnd(e);
      }, 0);
      return;
    }
    if (Mi[e] !== void 0) {
      Mi[e].push({
        onLoad: t,
        onProgress: i,
        onError: n
      });
      return;
    }
    Mi[e] = [], Mi[e].push({
      onLoad: t,
      onProgress: i,
      onError: n
    });
    const s = new Request(e, {
      headers: new Headers(this.requestHeader),
      credentials: this.withCredentials ? "include" : "same-origin",
      signal: typeof AbortSignal.any == "function" ? AbortSignal.any([this._abortController.signal, this.manager.abortController.signal]) : this._abortController.signal
    }), a = this.mimeType, o = this.responseType;
    fetch(s).then((l) => {
      if (l.status === 200 || l.status === 0) {
        if (l.status === 0 && Se("FileLoader: HTTP Status 0 received."), typeof ReadableStream > "u" || l.body === void 0 || l.body.getReader === void 0) return l;
        const c = Mi[e], h = l.body.getReader(), d = l.headers.get("X-File-Size") || l.headers.get("Content-Length"), u = d ? parseInt(d) : 0, p = u !== 0;
        let v = 0;
        const b = new ReadableStream({ start(m) {
          f();
          function f() {
            h.read().then(({ done: T, value: A }) => {
              if (T) m.close();
              else {
                v += A.byteLength;
                const M = new ProgressEvent("progress", {
                  lengthComputable: p,
                  loaded: v,
                  total: u
                });
                for (let E = 0, R = c.length; E < R; E++) {
                  const C = c[E];
                  C.onProgress && C.onProgress(M);
                }
                m.enqueue(A), f();
              }
            }, (T) => {
              m.error(T);
            });
          }
        } });
        return new Response(b);
      } else throw new Yh(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`, l);
    }).then((l) => {
      switch (o) {
        case "arraybuffer":
          return l.arrayBuffer();
        case "blob":
          return l.blob();
        case "document":
          return l.text().then((c) => new DOMParser().parseFromString(c, a));
        case "json":
          return l.json();
        default:
          if (a === "") return l.text();
          {
            const c = /charset="?([^;"\s]*)"?/i.exec(a), h = c && c[1] ? c[1].toLowerCase() : void 0, d = new TextDecoder(h);
            return l.arrayBuffer().then((u) => d.decode(u));
          }
      }
    }).then((l) => {
      xi.add(`file:${e}`, l);
      const c = Mi[e];
      delete Mi[e];
      for (let h = 0, d = c.length; h < d; h++) {
        const u = c[h];
        u.onLoad && u.onLoad(l);
      }
    }).catch((l) => {
      const c = Mi[e];
      if (c === void 0)
        throw this.manager.itemError(e), l;
      delete Mi[e];
      for (let h = 0, d = c.length; h < d; h++) {
        const u = c[h];
        u.onError && u.onError(l);
      }
      this.manager.itemError(e);
    }).finally(() => {
      this.manager.itemEnd(e);
    }), this.manager.itemStart(e);
  }
  setResponseType(e) {
    return this.responseType = e, this;
  }
  setMimeType(e) {
    return this.mimeType = e, this;
  }
  abort() {
    return this._abortController.abort(), this._abortController = new AbortController(), this;
  }
}, on = /* @__PURE__ */ new WeakMap(), Jh = class extends Cn {
  constructor(e) {
    super(e);
  }
  load(e, t, i, n) {
    this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e);
    const r = this, s = xi.get(`image:${e}`);
    if (s !== void 0) {
      if (s.complete === !0)
        r.manager.itemStart(e), setTimeout(function() {
          t && t(s), r.manager.itemEnd(e);
        }, 0);
      else {
        let h = on.get(s);
        h === void 0 && (h = [], on.set(s, h)), h.push({
          onLoad: t,
          onError: n
        });
      }
      return s;
    }
    const a = Zn("img");
    function o() {
      c(), t && t(this);
      const h = on.get(this) || [];
      for (let d = 0; d < h.length; d++) {
        const u = h[d];
        u.onLoad && u.onLoad(this);
      }
      on.delete(this), r.manager.itemEnd(e);
    }
    function l(h) {
      c(), n && n(h), xi.remove(`image:${e}`);
      const d = on.get(this) || [];
      for (let u = 0; u < d.length; u++) {
        const p = d[u];
        p.onError && p.onError(h);
      }
      on.delete(this), r.manager.itemError(e), r.manager.itemEnd(e);
    }
    function c() {
      a.removeEventListener("load", o, !1), a.removeEventListener("error", l, !1);
    }
    return a.addEventListener("load", o, !1), a.addEventListener("error", l, !1), e.slice(0, 5) !== "data:" && this.crossOrigin !== void 0 && (a.crossOrigin = this.crossOrigin), xi.add(`image:${e}`, a), r.manager.itemStart(e), a.src = e, a;
  }
}, Zh = class extends Cn {
  constructor(e) {
    super(e);
  }
  load(e, t, i, n) {
    const r = new Ut(), s = new Jh(this.manager);
    return s.setCrossOrigin(this.crossOrigin), s.setPath(this.path), s.load(e, function(a) {
      r.image = a, r.needsUpdate = !0, t !== void 0 && t(r);
    }, i, n), r;
  }
}, Kr = class extends dt {
  constructor(e, t = 1) {
    super(), this.isLight = !0, this.type = "Light", this.color = new Ne(e), this.intensity = t;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  copy(e, t) {
    return super.copy(e, t), this.color.copy(e.color), this.intensity = e.intensity, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.color = this.color.getHex(), t.object.intensity = this.intensity, t;
  }
}, $h = class extends Kr {
  constructor(e, t, i) {
    super(e, i), this.isHemisphereLight = !0, this.type = "HemisphereLight", this.position.copy(dt.DEFAULT_UP), this.updateMatrix(), this.groundColor = new Ne(t);
  }
  copy(e, t) {
    return super.copy(e, t), this.groundColor.copy(e.groundColor), this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.groundColor = this.groundColor.getHex(), t;
  }
}, As = /* @__PURE__ */ new Ge(), Xa = /* @__PURE__ */ new N(), Ka = /* @__PURE__ */ new N(), Zs = class {
  constructor(e) {
    this.camera = e, this.intensity = 1, this.bias = 0, this.biasNode = null, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new De(512, 512), this.mapType = Ni, this.map = null, this.mapPass = null, this.matrix = new Ge(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new js(), this._frameExtents = new De(1, 1), this._viewportCount = 1, this._viewports = [new it(0, 0, 1, 1)];
  }
  getViewportCount() {
    return this._viewportCount;
  }
  getFrustum() {
    return this._frustum;
  }
  updateMatrices(e) {
    const t = this.camera, i = this.matrix;
    Xa.setFromMatrixPosition(e.matrixWorld), t.position.copy(Xa), Ka.setFromMatrixPosition(e.target.matrixWorld), t.lookAt(Ka), t.updateMatrixWorld(), As.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), this._frustum.setFromProjectionMatrix(As, t.coordinateSystem, t.reversedDepth), t.coordinateSystem === 2001 || t.reversedDepth ? i.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 1, 0, 0, 0, 0, 1) : i.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1), i.multiply(As);
  }
  getViewport(e) {
    return this._viewports[e];
  }
  getFrameExtents() {
    return this._frameExtents;
  }
  dispose() {
    this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
  }
  copy(e) {
    return this.camera = e.camera.clone(), this.intensity = e.intensity, this.bias = e.bias, this.radius = e.radius, this.autoUpdate = e.autoUpdate, this.needsUpdate = e.needsUpdate, this.normalBias = e.normalBias, this.blurSamples = e.blurSamples, this.mapSize.copy(e.mapSize), this.biasNode = e.biasNode, this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    const e = {};
    return this.intensity !== 1 && (e.intensity = this.intensity), this.bias !== 0 && (e.bias = this.bias), this.normalBias !== 0 && (e.normalBias = this.normalBias), this.radius !== 1 && (e.radius = this.radius), (this.mapSize.x !== 512 || this.mapSize.y !== 512) && (e.mapSize = this.mapSize.toArray()), e.camera = this.camera.toJSON(!1).object, delete e.camera.matrix, e;
  }
}, Rr = /* @__PURE__ */ new N(), wr = /* @__PURE__ */ new $t(), ni = /* @__PURE__ */ new N(), gl = class extends dt {
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new Ge(), this.projectionMatrix = new Ge(), this.projectionMatrixInverse = new Ge(), this.coordinateSystem = bn, this._reversedDepth = !1;
  }
  get reversedDepth() {
    return this._reversedDepth;
  }
  copy(e, t) {
    return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this.coordinateSystem = e.coordinateSystem, this;
  }
  getWorldDirection(e) {
    return super.getWorldDirection(e).negate();
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this.matrixWorld.decompose(Rr, wr, ni), ni.x === 1 && ni.y === 1 && ni.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(Rr, wr, ni.set(1, 1, 1)).invert();
  }
  updateWorldMatrix(e, t, i = !1) {
    super.updateWorldMatrix(e, t, i), this.matrixWorld.decompose(Rr, wr, ni), ni.x === 1 && ni.y === 1 && ni.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(Rr, wr, ni.set(1, 1, 1)).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}, Pi = /* @__PURE__ */ new N(), ja = /* @__PURE__ */ new De(), Ya = /* @__PURE__ */ new De(), Ct = class extends gl {
  constructor(e = 50, t = 1, i = 0.1, n = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = i, this.far = n, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this;
  }
  setFocalLength(e) {
    const t = 0.5 * this.getFilmHeight() / e;
    this.fov = xn * 2 * Math.atan(t), this.updateProjectionMatrix();
  }
  getFocalLength() {
    const e = Math.tan(qn * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / e;
  }
  getEffectiveFOV() {
    return xn * 2 * Math.atan(Math.tan(qn * 0.5 * this.fov) / this.zoom);
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  getViewBounds(e, t, i) {
    Pi.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), t.set(Pi.x, Pi.y).multiplyScalar(-e / Pi.z), Pi.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), i.set(Pi.x, Pi.y).multiplyScalar(-e / Pi.z);
  }
  getViewSize(e, t) {
    return this.getViewBounds(e, ja, Ya), t.subVectors(Ya, ja);
  }
  setViewOffset(e, t, i, n, r, s) {
    this.aspect = e / t, this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = i, this.view.offsetY = n, this.view.width = r, this.view.height = s, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = this.near;
    let t = e * Math.tan(qn * 0.5 * this.fov) / this.zoom, i = 2 * t, n = this.aspect * i, r = -0.5 * n;
    const s = this.view;
    if (this.view !== null && this.view.enabled) {
      const o = s.fullWidth, l = s.fullHeight;
      r += s.offsetX * n / o, t -= s.offsetY * i / l, n *= s.width / o, i *= s.height / l;
    }
    const a = this.filmOffset;
    a !== 0 && (r += e * a / this.getFilmWidth()), this.projectionMatrix.makePerspective(r, r + n, t, t - i, e, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, this.view !== null && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t;
  }
}, Qh = class extends Zs {
  constructor() {
    super(new Ct(50, 1, 0.5, 500)), this.isSpotLightShadow = !0, this.focus = 1, this.aspect = 1;
  }
  updateMatrices(e) {
    const t = this.camera, i = xn * 2 * e.angle * this.focus, n = this.mapSize.width / this.mapSize.height * this.aspect, r = e.distance || t.far;
    (i !== t.fov || n !== t.aspect || r !== t.far) && (t.fov = i, t.aspect = n, t.far = r, t.updateProjectionMatrix()), super.updateMatrices(e);
  }
  copy(e) {
    return super.copy(e), this.focus = e.focus, this;
  }
}, eu = class extends Kr {
  constructor(e, t, i = 0, n = Math.PI / 3, r = 0, s = 2) {
    super(e, t), this.isSpotLight = !0, this.type = "SpotLight", this.position.copy(dt.DEFAULT_UP), this.updateMatrix(), this.target = new dt(), this.distance = i, this.angle = n, this.penumbra = r, this.decay = s, this.map = null, this.shadow = new Qh();
  }
  get power() {
    return this.intensity * Math.PI;
  }
  set power(e) {
    this.intensity = e / Math.PI;
  }
  dispose() {
    super.dispose(), this.shadow.dispose();
  }
  copy(e, t) {
    return super.copy(e, t), this.distance = e.distance, this.angle = e.angle, this.penumbra = e.penumbra, this.decay = e.decay, this.target = e.target.clone(), this.map = e.map, this.shadow = e.shadow.clone(), this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.distance = this.distance, t.object.angle = this.angle, t.object.decay = this.decay, t.object.penumbra = this.penumbra, t.object.target = this.target.uuid, this.map && this.map.isTexture && (t.object.map = this.map.toJSON(e).uuid), t.object.shadow = this.shadow.toJSON(), t;
  }
}, tu = class extends Zs {
  constructor() {
    super(new Ct(90, 1, 0.5, 500)), this.isPointLightShadow = !0;
  }
}, iu = class extends Kr {
  constructor(e, t, i = 0, n = 2) {
    super(e, t), this.isPointLight = !0, this.type = "PointLight", this.distance = i, this.decay = n, this.shadow = new tu();
  }
  get power() {
    return this.intensity * 4 * Math.PI;
  }
  set power(e) {
    this.intensity = e / (4 * Math.PI);
  }
  dispose() {
    super.dispose(), this.shadow.dispose();
  }
  copy(e, t) {
    return super.copy(e, t), this.distance = e.distance, this.decay = e.decay, this.shadow = e.shadow.clone(), this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.distance = this.distance, t.object.decay = this.decay, t.object.shadow = this.shadow.toJSON(), t;
  }
}, jr = class extends gl {
  constructor(e = -1, t = 1, i = 1, n = -1, r = 0.1, s = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = i, this.bottom = n, this.near = r, this.far = s, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null ? null : Object.assign({}, e.view), this;
  }
  setViewOffset(e, t, i, n, r, s) {
    this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = i, this.view.offsetY = n, this.view.width = r, this.view.height = s, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = (this.right - this.left) / (2 * this.zoom), t = (this.top - this.bottom) / (2 * this.zoom), i = (this.right + this.left) / 2, n = (this.top + this.bottom) / 2;
    let r = i - e, s = i + e, a = n + t, o = n - t;
    if (this.view !== null && this.view.enabled) {
      const l = (this.right - this.left) / this.view.fullWidth / this.zoom, c = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      r += l * this.view.offsetX, s = r + l * this.view.width, a -= c * this.view.offsetY, o = a - c * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(r, s, a, o, this.near, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, this.view !== null && (t.object.view = Object.assign({}, this.view)), t;
  }
}, nu = class extends Zs {
  constructor() {
    super(new jr(-5, 5, 5, -5, 0.5, 500)), this.isDirectionalLightShadow = !0;
  }
}, Nr = class extends Kr {
  constructor(e, t) {
    super(e, t), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(dt.DEFAULT_UP), this.updateMatrix(), this.target = new dt(), this.shadow = new nu();
  }
  dispose() {
    super.dispose(), this.shadow.dispose();
  }
  copy(e) {
    return super.copy(e), this.target = e.target.clone(), this.shadow = e.shadow.clone(), this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.shadow = this.shadow.toJSON(), t.object.target = this.target.uuid, t;
  }
}, Kn = class {
  static extractUrlBase(e) {
    const t = e.lastIndexOf("/");
    return t === -1 ? "./" : e.slice(0, t + 1);
  }
  static resolveURL(e, t) {
    return typeof e != "string" || e === "" ? "" : (/^https?:\/\//i.test(t) && /^\//.test(e) && (t = t.replace(/(^https?:\/\/[^\/]+).*/i, "$1")), /^(https?:)?\/\//i.test(e) || /^data:.*,.*$/i.test(e) || /^blob:.*$/i.test(e) ? e : t + e);
  }
}, Rs = /* @__PURE__ */ new WeakMap(), ru = class extends Cn {
  constructor(e) {
    super(e), this.isImageBitmapLoader = !0, typeof createImageBitmap > "u" && Se("ImageBitmapLoader: createImageBitmap() not supported."), typeof fetch > "u" && Se("ImageBitmapLoader: fetch() not supported."), this.options = { premultiplyAlpha: "none" }, this._abortController = new AbortController();
  }
  setOptions(e) {
    return this.options = e, this;
  }
  load(e, t, i, n) {
    e === void 0 && (e = ""), this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e);
    const r = this, s = xi.get(`image-bitmap:${e}`);
    if (s !== void 0) {
      if (r.manager.itemStart(e), s.then) {
        s.then((l) => {
          Rs.has(s) === !0 ? (n && n(Rs.get(s)), r.manager.itemError(e), r.manager.itemEnd(e)) : (t && t(l), r.manager.itemEnd(e));
        });
        return;
      }
      setTimeout(function() {
        t && t(s), r.manager.itemEnd(e);
      }, 0);
      return;
    }
    const a = {};
    a.credentials = this.crossOrigin === "anonymous" ? "same-origin" : "include", a.headers = this.requestHeader, a.signal = typeof AbortSignal.any == "function" ? AbortSignal.any([this._abortController.signal, this.manager.abortController.signal]) : this._abortController.signal;
    const o = fetch(e, a).then(function(l) {
      return l.blob();
    }).then(function(l) {
      return createImageBitmap(l, Object.assign(r.options, { colorSpaceConversion: "none" }));
    }).then(function(l) {
      xi.add(`image-bitmap:${e}`, l), t && t(l), r.manager.itemEnd(e);
    }).catch(function(l) {
      n && n(l), Rs.set(o, l), xi.remove(`image-bitmap:${e}`), r.manager.itemError(e), r.manager.itemEnd(e);
    });
    xi.add(`image-bitmap:${e}`, o), r.manager.itemStart(e);
  }
  abort() {
    return this._abortController.abort(), this._abortController = new AbortController(), this;
  }
}, ln = -90, cn = 1, su = class extends dt {
  constructor(e, t, i) {
    super(), this.type = "CubeCamera", this.renderTarget = i, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const n = new Ct(ln, cn, e, t);
    n.layers = this.layers, this.add(n);
    const r = new Ct(ln, cn, e, t);
    r.layers = this.layers, this.add(r);
    const s = new Ct(ln, cn, e, t);
    s.layers = this.layers, this.add(s);
    const a = new Ct(ln, cn, e, t);
    a.layers = this.layers, this.add(a);
    const o = new Ct(ln, cn, e, t);
    o.layers = this.layers, this.add(o);
    const l = new Ct(ln, cn, e, t);
    l.layers = this.layers, this.add(l);
  }
  updateCoordinateSystem() {
    const e = this.coordinateSystem, t = this.children.concat(), [i, n, r, s, a, o] = t;
    for (const l of t) this.remove(l);
    if (e === 2e3)
      i.up.set(0, 1, 0), i.lookAt(1, 0, 0), n.up.set(0, 1, 0), n.lookAt(-1, 0, 0), r.up.set(0, 0, -1), r.lookAt(0, 1, 0), s.up.set(0, 0, 1), s.lookAt(0, -1, 0), a.up.set(0, 1, 0), a.lookAt(0, 0, 1), o.up.set(0, 1, 0), o.lookAt(0, 0, -1);
    else if (e === 2001)
      i.up.set(0, -1, 0), i.lookAt(-1, 0, 0), n.up.set(0, -1, 0), n.lookAt(1, 0, 0), r.up.set(0, 0, 1), r.lookAt(0, 1, 0), s.up.set(0, 0, -1), s.lookAt(0, -1, 0), a.up.set(0, -1, 0), a.lookAt(0, 0, 1), o.up.set(0, -1, 0), o.lookAt(0, 0, -1);
    else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e);
    for (const l of t)
      this.add(l), l.updateMatrixWorld();
  }
  update(e, t) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: i, activeMipmapLevel: n } = this;
    this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem());
    const [r, s, a, o, l, c] = this.children, h = e.getRenderTarget(), d = e.getActiveCubeFace(), u = e.getActiveMipmapLevel(), p = e.xr.enabled;
    e.xr.enabled = !1;
    const v = i.texture.generateMipmaps;
    i.texture.generateMipmaps = !1;
    let b = !1;
    e.isWebGLRenderer === !0 ? b = e.state.buffers.depth.getReversed() : b = e.reversedDepthBuffer, e.setRenderTarget(i, 0, n), b && e.autoClear === !1 && e.clearDepth(), e.render(t, r), e.setRenderTarget(i, 1, n), b && e.autoClear === !1 && e.clearDepth(), e.render(t, s), e.setRenderTarget(i, 2, n), b && e.autoClear === !1 && e.clearDepth(), e.render(t, a), e.setRenderTarget(i, 3, n), b && e.autoClear === !1 && e.clearDepth(), e.render(t, o), e.setRenderTarget(i, 4, n), b && e.autoClear === !1 && e.clearDepth(), e.render(t, l), i.texture.generateMipmaps = v, e.setRenderTarget(i, 5, n), b && e.autoClear === !1 && e.clearDepth(), e.render(t, c), e.setRenderTarget(h, d, u), e.xr.enabled = p, i.texture.needsPMREMUpdate = !0;
  }
}, au = class extends Ct {
  constructor(e = []) {
    super(), this.isArrayCamera = !0, this.isMultiViewCamera = !1, this.cameras = e;
  }
}, $s = "\\[\\]\\.:\\/", ou = new RegExp("[" + $s + "]", "g"), Qs = "[^" + $s + "]", lu = "[^" + $s.replace("\\.", "") + "]", cu = /* @__PURE__ */ /((?:WC+[\/:])*)/.source.replace("WC", Qs), hu = /* @__PURE__ */ /(WCOD+)?/.source.replace("WCOD", lu), uu = /* @__PURE__ */ /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", Qs), du = /* @__PURE__ */ /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", Qs), fu = new RegExp("^" + cu + hu + uu + du + "$"), pu = [
  "material",
  "materials",
  "bones",
  "map"
], mu = class {
  constructor(e, t, i) {
    const n = i || at.parseTrackName(t);
    this._targetGroup = e, this._bindings = e.subscribe_(t, n);
  }
  getValue(e, t) {
    this.bind();
    const i = this._targetGroup.nCachedObjects_, n = this._bindings[i];
    n !== void 0 && n.getValue(e, t);
  }
  setValue(e, t) {
    const i = this._bindings;
    for (let n = this._targetGroup.nCachedObjects_, r = i.length; n !== r; ++n) i[n].setValue(e, t);
  }
  bind() {
    const e = this._bindings;
    for (let t = this._targetGroup.nCachedObjects_, i = e.length; t !== i; ++t) e[t].bind();
  }
  unbind() {
    const e = this._bindings;
    for (let t = this._targetGroup.nCachedObjects_, i = e.length; t !== i; ++t) e[t].unbind();
  }
}, at = class dn {
  constructor(t, i, n) {
    this.path = i, this.parsedPath = n || dn.parseTrackName(i), this.node = dn.findNode(t, this.parsedPath.nodeName), this.rootNode = t, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
  static create(t, i, n) {
    return t && t.isAnimationObjectGroup ? new dn.Composite(t, i, n) : new dn(t, i, n);
  }
  static sanitizeNodeName(t) {
    return t.replace(/\s/g, "_").replace(ou, "");
  }
  static parseTrackName(t) {
    const i = fu.exec(t);
    if (i === null) throw new Error("THREE.PropertyBinding: Cannot parse trackName: " + t);
    const n = {
      nodeName: i[2],
      objectName: i[3],
      objectIndex: i[4],
      propertyName: i[5],
      propertyIndex: i[6]
    }, r = n.nodeName && n.nodeName.lastIndexOf(".");
    if (r !== void 0 && r !== -1) {
      const s = n.nodeName.substring(r + 1);
      pu.indexOf(s) !== -1 && (n.nodeName = n.nodeName.substring(0, r), n.objectName = s);
    }
    if (n.propertyName === null || n.propertyName.length === 0) throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: " + t);
    return n;
  }
  static findNode(t, i) {
    if (i === void 0 || i === "" || i === "." || i === -1 || i === t.name || i === t.uuid) return t;
    if (t.skeleton) {
      const n = t.skeleton.getBoneByName(i);
      if (n !== void 0) return n;
    }
    if (t.children) {
      const n = function(s) {
        for (let a = 0; a < s.length; a++) {
          const o = s[a];
          if (o.name === i || o.uuid === i) return o;
          const l = n(o.children);
          if (l) return l;
        }
        return null;
      }, r = n(t.children);
      if (r) return r;
    }
    return null;
  }
  _getValue_unavailable() {
  }
  _setValue_unavailable() {
  }
  _getValue_direct(t, i) {
    t[i] = this.targetObject[this.propertyName];
  }
  _getValue_array(t, i) {
    const n = this.resolvedProperty;
    for (let r = 0, s = n.length; r !== s; ++r) t[i++] = n[r];
  }
  _getValue_arrayElement(t, i) {
    t[i] = this.resolvedProperty[this.propertyIndex];
  }
  _getValue_toArray(t, i) {
    this.resolvedProperty.toArray(t, i);
  }
  _setValue_direct(t, i) {
    this.targetObject[this.propertyName] = t[i];
  }
  _setValue_direct_setNeedsUpdate(t, i) {
    this.targetObject[this.propertyName] = t[i], this.targetObject.needsUpdate = !0;
  }
  _setValue_direct_setMatrixWorldNeedsUpdate(t, i) {
    this.targetObject[this.propertyName] = t[i], this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _setValue_array(t, i) {
    const n = this.resolvedProperty;
    for (let r = 0, s = n.length; r !== s; ++r) n[r] = t[i++];
  }
  _setValue_array_setNeedsUpdate(t, i) {
    const n = this.resolvedProperty;
    for (let r = 0, s = n.length; r !== s; ++r) n[r] = t[i++];
    this.targetObject.needsUpdate = !0;
  }
  _setValue_array_setMatrixWorldNeedsUpdate(t, i) {
    const n = this.resolvedProperty;
    for (let r = 0, s = n.length; r !== s; ++r) n[r] = t[i++];
    this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _setValue_arrayElement(t, i) {
    this.resolvedProperty[this.propertyIndex] = t[i];
  }
  _setValue_arrayElement_setNeedsUpdate(t, i) {
    this.resolvedProperty[this.propertyIndex] = t[i], this.targetObject.needsUpdate = !0;
  }
  _setValue_arrayElement_setMatrixWorldNeedsUpdate(t, i) {
    this.resolvedProperty[this.propertyIndex] = t[i], this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _setValue_fromArray(t, i) {
    this.resolvedProperty.fromArray(t, i);
  }
  _setValue_fromArray_setNeedsUpdate(t, i) {
    this.resolvedProperty.fromArray(t, i), this.targetObject.needsUpdate = !0;
  }
  _setValue_fromArray_setMatrixWorldNeedsUpdate(t, i) {
    this.resolvedProperty.fromArray(t, i), this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _getValue_unbound(t, i) {
    this.bind(), this.getValue(t, i);
  }
  _setValue_unbound(t, i) {
    this.bind(), this.setValue(t, i);
  }
  bind() {
    let t = this.node;
    const i = this.parsedPath, n = i.objectName, r = i.propertyName;
    let s = i.propertyIndex;
    if (t || (t = dn.findNode(this.rootNode, i.nodeName), this.node = t), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !t) {
      Se("PropertyBinding: No target node found for track: " + this.path + ".");
      return;
    }
    if (n) {
      let c = i.objectIndex;
      switch (n) {
        case "materials":
          if (!t.material) {
            Le("PropertyBinding: Can not bind to material as node does not have a material.", this);
            return;
          }
          if (!t.material.materials) {
            Le("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
            return;
          }
          t = t.material.materials;
          break;
        case "bones":
          if (!t.skeleton) {
            Le("PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
            return;
          }
          t = t.skeleton.bones;
          for (let h = 0; h < t.length; h++) if (t[h].name === c) {
            c = h;
            break;
          }
          break;
        case "map":
          if ("map" in t) {
            t = t.map;
            break;
          }
          if (!t.material) {
            Le("PropertyBinding: Can not bind to material as node does not have a material.", this);
            return;
          }
          if (!t.material.map) {
            Le("PropertyBinding: Can not bind to material.map as node.material does not have a map.", this);
            return;
          }
          t = t.material.map;
          break;
        default:
          if (t[n] === void 0) {
            Le("PropertyBinding: Can not bind to objectName of node undefined.", this);
            return;
          }
          t = t[n];
      }
      if (c !== void 0) {
        if (t[c] === void 0) {
          Le("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, t);
          return;
        }
        t = t[c];
      }
    }
    const a = t[r];
    if (a === void 0) {
      const c = i.nodeName;
      Le("PropertyBinding: Trying to update property for track: " + c + "." + r + " but it wasn't found.", t);
      return;
    }
    let o = this.Versioning.None;
    this.targetObject = t, t.isMaterial === !0 ? o = this.Versioning.NeedsUpdate : t.isObject3D === !0 && (o = this.Versioning.MatrixWorldNeedsUpdate);
    let l = this.BindingType.Direct;
    if (s !== void 0) {
      if (r === "morphTargetInfluences") {
        if (!t.geometry) {
          Le("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
          return;
        }
        if (!t.geometry.morphAttributes) {
          Le("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
          return;
        }
        t.morphTargetDictionary[s] !== void 0 && (s = t.morphTargetDictionary[s]);
      }
      l = this.BindingType.ArrayElement, this.resolvedProperty = a, this.propertyIndex = s;
    } else a.fromArray !== void 0 && a.toArray !== void 0 ? (l = this.BindingType.HasFromToArray, this.resolvedProperty = a) : Array.isArray(a) ? (l = this.BindingType.EntireArray, this.resolvedProperty = a) : this.propertyName = r;
    this.getValue = this.GetterByBindingType[l], this.setValue = this.SetterByBindingTypeAndVersioning[l][o];
  }
  unbind() {
    this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
};
at.Composite = mu;
at.prototype.BindingType = {
  Direct: 0,
  EntireArray: 1,
  ArrayElement: 2,
  HasFromToArray: 3
};
at.prototype.Versioning = {
  None: 0,
  NeedsUpdate: 1,
  MatrixWorldNeedsUpdate: 2
};
at.prototype.GetterByBindingType = [
  at.prototype._getValue_direct,
  at.prototype._getValue_array,
  at.prototype._getValue_arrayElement,
  at.prototype._getValue_toArray
];
at.prototype.SetterByBindingTypeAndVersioning = [
  [
    at.prototype._setValue_direct,
    at.prototype._setValue_direct_setNeedsUpdate,
    at.prototype._setValue_direct_setMatrixWorldNeedsUpdate
  ],
  [
    at.prototype._setValue_array,
    at.prototype._setValue_array_setNeedsUpdate,
    at.prototype._setValue_array_setMatrixWorldNeedsUpdate
  ],
  [
    at.prototype._setValue_arrayElement,
    at.prototype._setValue_arrayElement_setNeedsUpdate,
    at.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate
  ],
  [
    at.prototype._setValue_fromArray,
    at.prototype._setValue_fromArray_setNeedsUpdate,
    at.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate
  ]
];
var Ja = class {
  constructor(e = 1, t = 0, i = 0) {
    this.radius = e, this.phi = t, this.theta = i;
  }
  set(e, t, i) {
    return this.radius = e, this.phi = t, this.theta = i, this;
  }
  copy(e) {
    return this.radius = e.radius, this.phi = e.phi, this.theta = e.theta, this;
  }
  makeSafe() {
    return this.phi = Be(this.phi, 1e-6, Math.PI - 1e-6), this;
  }
  setFromVector3(e) {
    return this.setFromCartesianCoords(e.x, e.y, e.z);
  }
  setFromCartesianCoords(e, t, i) {
    return this.radius = Math.sqrt(e * e + t * t + i * i), this.radius === 0 ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(e, i), this.phi = Math.acos(Be(t / this.radius, -1, 1))), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}, Pp = class _l {
  static {
    _l.prototype.isMatrix2 = !0;
  }
  constructor(t, i, n, r) {
    this.elements = [
      1,
      0,
      0,
      1
    ], t !== void 0 && this.set(t, i, n, r);
  }
  identity() {
    return this.set(1, 0, 0, 1), this;
  }
  fromArray(t, i = 0) {
    for (let n = 0; n < 4; n++) this.elements[n] = t[n + i];
    return this;
  }
  set(t, i, n, r) {
    const s = this.elements;
    return s[0] = t, s[2] = i, s[1] = n, s[3] = r, this;
  }
}, gu = class extends Ui {
  constructor(e, t = null) {
    super(), this.object = e, this.domElement = t, this.enabled = !0, this.state = -1, this.keys = {}, this.mouseButtons = {
      LEFT: null,
      MIDDLE: null,
      RIGHT: null
    }, this.touches = {
      ONE: null,
      TWO: null
    };
  }
  connect(e) {
    if (e === void 0) {
      Se("Controls: connect() now requires an element.");
      return;
    }
    this.domElement !== null && this.disconnect(), this.domElement = e;
  }
  disconnect() {
  }
  dispose() {
  }
  update() {
  }
};
function Za(e, t, i, n) {
  const r = _u(n);
  switch (i) {
    case Vl:
      return e * t;
    case ko:
      return e * t / r.components * r.byteLength;
    case Bo:
      return e * t / r.components * r.byteLength;
    case kr:
      return e * t * 2 / r.components * r.byteLength;
    case zo:
      return e * t * 2 / r.components * r.byteLength;
    case Hl:
      return e * t * 3 / r.components * r.byteLength;
    case vn:
      return e * t * 4 / r.components * r.byteLength;
    case Go:
      return e * t * 4 / r.components * r.byteLength;
    case Wl:
    case ql:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case Xl:
    case Kl:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case Yl:
    case Zl:
      return Math.max(e, 16) * Math.max(t, 8) / 4;
    case jl:
    case Jl:
      return Math.max(e, 8) * Math.max(t, 8) / 2;
    case $l:
    case Ql:
    case tc:
    case ic:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case ec:
    case nc:
    case rc:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case sc:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case ac:
      return Math.floor((e + 4) / 5) * Math.floor((t + 3) / 4) * 16;
    case oc:
      return Math.floor((e + 4) / 5) * Math.floor((t + 4) / 5) * 16;
    case lc:
      return Math.floor((e + 5) / 6) * Math.floor((t + 4) / 5) * 16;
    case cc:
      return Math.floor((e + 5) / 6) * Math.floor((t + 5) / 6) * 16;
    case hc:
      return Math.floor((e + 7) / 8) * Math.floor((t + 4) / 5) * 16;
    case uc:
      return Math.floor((e + 7) / 8) * Math.floor((t + 5) / 6) * 16;
    case dc:
      return Math.floor((e + 7) / 8) * Math.floor((t + 7) / 8) * 16;
    case fc:
      return Math.floor((e + 9) / 10) * Math.floor((t + 4) / 5) * 16;
    case pc:
      return Math.floor((e + 9) / 10) * Math.floor((t + 5) / 6) * 16;
    case mc:
      return Math.floor((e + 9) / 10) * Math.floor((t + 7) / 8) * 16;
    case gc:
      return Math.floor((e + 9) / 10) * Math.floor((t + 9) / 10) * 16;
    case _c:
      return Math.floor((e + 11) / 12) * Math.floor((t + 9) / 10) * 16;
    case vc:
      return Math.floor((e + 11) / 12) * Math.floor((t + 11) / 12) * 16;
    case bc:
    case Mc:
    case xc:
      return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
    case Sc:
    case yc:
      return Math.ceil(e / 4) * Math.ceil(t / 4) * 8;
    case Ec:
    case Tc:
      return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
  }
  throw new Error(`Unable to determine texture byte length for ${i} format.`);
}
function _u(e) {
  switch (e) {
    case Ni:
    case Ol:
      return {
        byteLength: 1,
        components: 1
      };
    case Io:
    case kl:
    case Xi:
      return {
        byteLength: 2,
        components: 1
      };
    case No:
    case Uo:
      return {
        byteLength: 2,
        components: 4
      };
    case qi:
    case Bl:
    case Tn:
      return {
        byteLength: 4,
        components: 1
      };
    case zl:
    case Gl:
      return {
        byteLength: 4,
        components: 3
      };
  }
  throw new Error(`THREE.TextureUtils: Unknown texture type ${e}.`);
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: { revision: "185" } }));
typeof window < "u" && (window.__THREE__ ? Se("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = "185");
function vl() {
  let e = null, t = !1, i = null, n = null;
  function r(s, a) {
    i(s, a), n = e.requestAnimationFrame(r);
  }
  return {
    start: function() {
      t !== !0 && i !== null && e !== null && (n = e.requestAnimationFrame(r), t = !0);
    },
    stop: function() {
      e !== null && e.cancelAnimationFrame(n), t = !1;
    },
    setAnimationLoop: function(s) {
      i = s;
    },
    setContext: function(s) {
      e = s;
    }
  };
}
function vu(e) {
  const t = /* @__PURE__ */ new WeakMap();
  function i(o, l) {
    const c = o.array, h = o.usage, d = c.byteLength, u = e.createBuffer();
    e.bindBuffer(l, u), e.bufferData(l, c, h), o.onUploadCallback();
    let p;
    if (c instanceof Float32Array) p = e.FLOAT;
    else if (typeof Float16Array < "u" && c instanceof Float16Array) p = e.HALF_FLOAT;
    else if (c instanceof Uint16Array) o.isFloat16BufferAttribute ? p = e.HALF_FLOAT : p = e.UNSIGNED_SHORT;
    else if (c instanceof Int16Array) p = e.SHORT;
    else if (c instanceof Uint32Array) p = e.UNSIGNED_INT;
    else if (c instanceof Int32Array) p = e.INT;
    else if (c instanceof Int8Array) p = e.BYTE;
    else if (c instanceof Uint8Array) p = e.UNSIGNED_BYTE;
    else if (c instanceof Uint8ClampedArray) p = e.UNSIGNED_BYTE;
    else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + c);
    return {
      buffer: u,
      type: p,
      bytesPerElement: c.BYTES_PER_ELEMENT,
      version: o.version,
      size: d
    };
  }
  function n(o, l, c) {
    const h = l.array, d = l.updateRanges;
    if (e.bindBuffer(c, o), d.length === 0) e.bufferSubData(c, 0, h);
    else {
      d.sort((p, v) => p.start - v.start);
      let u = 0;
      for (let p = 1; p < d.length; p++) {
        const v = d[u], b = d[p];
        b.start <= v.start + v.count + 1 ? v.count = Math.max(v.count, b.start + b.count - v.start) : (++u, d[u] = b);
      }
      d.length = u + 1;
      for (let p = 0, v = d.length; p < v; p++) {
        const b = d[p];
        e.bufferSubData(c, b.start * h.BYTES_PER_ELEMENT, h, b.start, b.count);
      }
      l.clearUpdateRanges();
    }
    l.onUploadCallback();
  }
  function r(o) {
    return o.isInterleavedBufferAttribute && (o = o.data), t.get(o);
  }
  function s(o) {
    o.isInterleavedBufferAttribute && (o = o.data);
    const l = t.get(o);
    l && (e.deleteBuffer(l.buffer), t.delete(o));
  }
  function a(o, l) {
    if (o.isInterleavedBufferAttribute && (o = o.data), o.isGLBufferAttribute) {
      const h = t.get(o);
      (!h || h.version < o.version) && t.set(o, {
        buffer: o.buffer,
        type: o.type,
        bytesPerElement: o.elementSize,
        version: o.version
      });
      return;
    }
    const c = t.get(o);
    if (c === void 0) t.set(o, i(o, l));
    else if (c.version < o.version) {
      if (c.size !== o.array.byteLength) throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
      n(c.buffer, o, l), c.version = o.version;
    }
  }
  return {
    get: r,
    remove: s,
    update: a
  };
}
var Oe = {
  alphahash_fragment: `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,
  alphahash_pars_fragment: `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,
  alphamap_fragment: `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,
  alphamap_pars_fragment: `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,
  alphatest_fragment: `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,
  alphatest_pars_fragment: `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,
  aomap_fragment: `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT )
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN )
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,
  aomap_pars_fragment: `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,
  batching_pars_vertex: `#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,
  batching_vertex: `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,
  begin_vertex: `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,
  beginnormal_vertex: `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,
  bsdfs: `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,
  iridescence_fragment: `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,
  bumpmap_pars_fragment: `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,
  clipping_planes_fragment: `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,
  clipping_planes_pars_fragment: `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,
  clipping_planes_pars_vertex: `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,
  clipping_planes_vertex: `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,
  color_fragment: `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,
  color_pars_fragment: `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,
  color_pars_vertex: `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,
  color_vertex: `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,
  common: `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,
  cube_uv_reflection_fragment: `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,
  defaultnormal_vertex: `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,
  displacementmap_pars_vertex: `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,
  displacementmap_vertex: `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,
  emissivemap_fragment: `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,
  emissivemap_pars_fragment: `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,
  colorspace_fragment: "gl_FragColor = linearToOutputTexel( gl_FragColor );",
  colorspace_pars_fragment: `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,
  envmap_fragment: `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,
  envmap_common_pars_fragment: `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,
  envmap_pars_fragment: `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,
  envmap_pars_vertex: `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS

		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,
  envmap_physical_pars_fragment: `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,
  envmap_vertex: `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,
  fog_vertex: `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,
  fog_pars_vertex: `#ifdef USE_FOG
	varying float vFogDepth;
#endif`,
  fog_fragment: `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,
  fog_pars_fragment: `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,
  gradientmap_pars_fragment: `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,
  lightmap_pars_fragment: `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,
  lights_lambert_fragment: `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,
  lights_lambert_pars_fragment: `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,
  lights_pars_begin: `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,
  lights_toon_fragment: `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,
  lights_toon_pars_fragment: `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,
  lights_phong_fragment: `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,
  lights_phong_pars_fragment: `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,
  lights_physical_fragment: `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,
  lights_physical_pars_fragment: `uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN

		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );

		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );

		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );

		irradiance *= sheenEnergyComp;

	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,
  lights_fragment_begin: `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,
  lights_fragment_maps: `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,
  lights_fragment_end: `#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,
  lightprobes_pars_fragment: `#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,
  logdepthbuf_fragment: `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,
  logdepthbuf_pars_fragment: `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,
  logdepthbuf_pars_vertex: `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,
  logdepthbuf_vertex: `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,
  map_fragment: `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,
  map_pars_fragment: `#ifdef USE_MAP
	uniform sampler2D map;
#endif`,
  map_particle_fragment: `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,
  map_particle_pars_fragment: `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,
  metalnessmap_fragment: `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,
  metalnessmap_pars_fragment: `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,
  morphinstance_vertex: `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,
  morphcolor_vertex: `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,
  morphnormal_vertex: `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,
  morphtarget_pars_vertex: `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,
  morphtarget_vertex: `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,
  normal_fragment_begin: `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,
  normal_fragment_maps: `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,
  normal_pars_fragment: `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,
  normal_pars_vertex: `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,
  normal_vertex: `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,
  normalmap_pars_fragment: `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,
  clearcoat_normal_fragment_begin: `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,
  clearcoat_normal_fragment_maps: `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,
  clearcoat_pars_fragment: `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,
  iridescence_pars_fragment: `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,
  opaque_fragment: `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,
  packing: `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER

		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {

	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,
  premultiplied_alpha_fragment: `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,
  project_vertex: `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,
  dithering_fragment: `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,
  dithering_pars_fragment: `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,
  roughnessmap_fragment: `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,
  roughnessmap_pars_fragment: `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,
  shadowmap_pars_fragment: `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif

				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,
  shadowmap_pars_vertex: `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,
  shadowmap_vertex: `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,
  shadowmask_pars_fragment: `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,
  skinbase_vertex: `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,
  skinning_pars_vertex: `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,
  skinning_vertex: `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,
  skinnormal_vertex: `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,
  specularmap_fragment: `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,
  specularmap_pars_fragment: `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,
  tonemapping_fragment: `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,
  tonemapping_pars_fragment: `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,
  transmission_fragment: `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,
  transmission_pars_fragment: `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,
  uv_pars_fragment: `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,
  uv_pars_vertex: `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMaßmvÑ¼­zÊ&ŠÛ^uÑ•‘1¥¡Ğ¹‘¥É•ÑMÁ•Õ±…È€¬É•™±•Ñ•‘1¥¡Ğ¹¥¹‘¥É•ÑMÁ•Õ±…È€¬Ñ½Ñ…±µ¥ÍÍ¥Ù•I…‘¥…¹”ì($¥¹±Õ‘”€ñ•¹Ùµ…Á}™É…µ•¹Ğø($¥¹±Õ‘”€ñ½Á…ÅÕ•}™É…µ•¹Ğø($¥¹±Õ‘”€ñÑ½¹•µ…ÁÁ¥¹}™É…µ•¹Ğø($¥¹±Õ‘”€ñ½±½ÉÍÁ…•}™É…µ•¹Ğø($¥¹±Õ‘”€ñ™½}™É…µ•¹Ğø($¥¹±Õ‘”€ñÁÉ•µÕ±Ñ¥Á±¥•‘}…±Á¡…}™É…µ•¹Ğø($¥¹±Õ‘”€ñ‘¥Ñ¡•É¥¹}™É…µ•¹Ğø)õ€°(€µ•Í¡Á¡åÍ¥…±}Ù•ÉĞè€‘•™¥¹”MQ9I)Ù…Éå¥¹œÙ•ŒÌÙY¥•İA½Í¥Ñ¥½¸ì(¥™‘•˜UM}QI9M5%MM%=8(%Ù…Éå¥¹œÙ•ŒÌÙ]½É±‘A½Í¥Ñ¥½¸ì(•¹‘¥˜(¥¹±Õ‘”€ñ½µµ½¸ø(¥¹±Õ‘”€ñ‰…Ñ¡¥¹}Á…ÉÍ}Ù•ÉÑ•àø(¥¹±Õ‘”€ñÕÙ}Á…ÉÍ}Ù•ÉÑ•àø(¥¹±Õ‘”€ñ‘¥ÍÁ±…•µ•¹Ñµ…Á}Á…ÉÍ}Ù•ÉÑ•àø(¥¹±Õ‘”€ñ½±½É}Á…ÉÍ}Ù•ÉÑ•àø(¥¹±Õ‘”€ñ™½}Á…ÉÍ}Ù•ÉÑ•àø(¥¹±Õ‘”€ñ¹½Éµ…±}Á…ÉÍ}Ù•ÉÑ•àø(¥¹±Õ‘”€ñµ½ÉÁ¡Ñ…É•Ñ}Á…ÉÍ}Ù•ÉÑ•àø(¥¹±Õ‘”€ñÍ­¥¹¹¥¹}Á…ÉÍ}Ù•ÉÑ•àø(¥¹±Õ‘”€ñÍ¡…‘½İµ…Á}Á…ÉÍ}Ù•ÉÑ•àø(¥¹±Õ‘”€ñ±½‘•ÁÑ¡‰Õ™}Á…ÉÍ}Ù•ÉÑ•àø(¥¹±Õ‘”€ñ±¥ÁÁ¥¹}Á±…¹•Í}Á…ÉÍ}Ù•ÉÑ•àø)Ù½¥µ…¥¸ ¤ì($¥¹±Õ‘”€ñÕÙ}Ù•ÉÑ•àø($¥¹±Õ‘”€ñ½±½É}Ù•ÉÑ•àø($¥¹±Õ‘”€ñµ½ÉÁ¡¥¹ÍÑ…¹•}Ù•ÉÑ•àø($¥¹±Õ‘”€ñµ½ÉÁ¡½±½É}Ù•ÉÑ•àø($¥¹±Õ‘”€ñ‰…Ñ¡¥¹}Ù•ÉÑ•àø($¥¹±Õ‘”€ñ‰•¥¹¹½Éµ…±}Ù•ÉÑ•àø($¥¹±Õ‘”€ñµ½ÉÁ¡¹½Éµ…±}Ù•ÉÑ•àø($¥¹±Õ‘”€ñÍ­¥¹‰…Í•}Ù•ÉÑ•àø($¥¹±Õ‘”€ñÍ­¥¹¹½Éµ…±}Ù•ÉÑ•àø($¥¹±Õ‘”€ñ‘•™…Õ±Ñ¹½Éµ…±}Ù•ÉÑ•àø($¥¹±Õ‘”€ñ¹½Éµ…±}Ù•ÉÑ•àø($¥¹±Õ‘”€ñ‰•¥¹}Ù•ÉÑ•àø($¥¹±Õ‘”€ñµ½ÉÁ¡Ñ…É•Ñ}Ù•ÉÑ•àø($¥¹±Õ‘”€ñÍ­¥¹¹¥¹}Ù•ÉÑ•àø($¥¹±Õ‘”€ñ‘¥ÍÁ±…•µ•¹Ñµ…Á}Ù•ÉÑ•àø($¥¹±Õ‘”€ñÁÉ½©•Ñ}Ù•ÉÑ•àø($¥¹±Õ‘”€ñ±½‘•ÁÑ¡‰Õ™}Ù•ÉÑ•àø($¥¹±Õ‘”€ñ±¥ÁÁ¥¹}Á±…¹•Í}Ù•ÉÑ•àø(%ÙY¥•İA½Í¥Ñ¥½¸€ô€´µÙA½Í¥Ñ¥½¸¹áåèì($¥¹±Õ‘”€ñİ½É±‘Á½Í}Ù•ÉÑ•àø($¥¹±Õ‘”€ñÍ¡…‘½İµ…Á}Ù•ÉÑ•àø($¥¹±Õ‘”€ñ™½}Ù•ÉÑ•àø(¥™‘•˜UM}QI9M5%MM%=8(%Ù]½É±‘A½Í¥Ñ¥½¸€ôİ½É±‘A½Í¥Ñ¥½¸¹áåèì(•¹‘¥˜)õ€°(€µ•Í¡Á¡åÍ¥…±}™É…œè€‘•™¥¹”MQ9I(¥™‘•˜A!eM%0($‘•™¥¹”%=H($‘•™¥¹”UM}MAU1H(•¹‘¥˜)Õ¹¥™½É´Ù•ŒÌ‘¥™™ÕÍ”ì)Õ¹¥™½É´Ù•ŒÌ•µ¥ÍÍ¥Ù”ì)Õ¹¥™½É´™±½…ĞÉ½Õ¡¹•ÍÌì)Õ¹¥™½É´™±½…Ğµ•Ñ…±¹•ÍÌì)Õ¹¥™½É´™±½…Ğ½Á…¥Ñäì(¥™‘•˜%=H(%Õ¹¥™½É´™±½…Ğ¥½Èì(•¹‘¥˜(¥™‘•˜UM}MAU1H(%Õ¹¥™½É´™±½…ĞÍÁ•Õ±…É%¹Ñ•¹Í¥Ñäì(%Õ¹¥™½É´Ù•ŒÌÍÁ•Õ±…É½±½Èì($¥™‘•˜UM}MAU1I}=1=I5@($%Õ¹¥™½É´Í…µÁ±•ÈÉÍÁ•Õ±…É½±½É5…Àì($•¹‘¥˜($¥™‘•˜UM}MAU1I}%9Q9M%Qe5@($%Õ¹¥™½É´Í…µÁ±•ÈÉÍÁ•Õ±…É%¹Ñ•¹Í¥Ñå5…Àì($•¹‘¥˜(•¹‘¥˜(¥™‘•˜UM}1I=P(%Õ¹¥™½É´™±½…Ğ±•…É½…Ğì(%Õ¹¥™½É´™±½…Ğ±•…É½…ÑI½Õ¡¹•ÍÌì(•¹‘¥˜(¥™‘•˜UM}%MAIM%=8(%Õ¹¥™½É´™±½…Ğ‘¥ÍÁ•ÉÍ¥½¸ì(•¹‘¥˜(¥™‘•˜UM}%I%M9(%Õ¹¥™½É´™±½…Ğ¥É¥‘•Í•¹”ì(%Õ¹¥™½É´™±½…Ğ¥É¥‘•Í•¹•%=Hì(%Õ¹¥™½É´™±½…Ğ¥É¥‘•Í•¹•Q¡¥­¹•ÍÍ5¥¹¥µÕ´ì(%Õ¹¥™½É´™±½…Ğ¥É¥‘•Í•¹•Q¡¥­¹•ÍÍ5…á¥µÕ´ì(•¹‘¥˜(¥™‘•˜UM}M!8(%Õ¹¥™½É´Ù•ŒÌÍ¡••¹½±½Èì(%Õ¹¥™½É´™±½…ĞÍ¡••¹I½Õ¡¹•ÍÌì($¥™‘•˜UM}M!9}=1=I5@($%Õ¹¥™½É´Í…µÁ±•ÈÉÍ¡••¹½±½É5…Àì($•¹‘¥˜($¥™‘•˜UM}M!9}I=U!9MM5@($%Õ¹¥™½É´Í…µÁ±•ÈÉÍ¡••¹I½Õ¡¹•ÍÍ5…Àì($•¹‘¥˜(•¹‘¥˜(¥™‘•˜UM}9%M=QI=Ad(%Õ¹¥™½É´Ù•ŒÈ…¹¥Í½ÑÉ½ÁåY•Ñ½Èì($¥™‘•˜UM}9%M=QI=Ae5@($%Õ¹¥™½É´Í…µÁ±•ÈÉ…¹¥Í½ÑÉ½Áå5…Àì($•¹‘¥˜(•¹‘¥˜)Ù…Éå¥¹œÙ•ŒÌÙY¥•İA½Í¥Ñ¥½¸ì(¥¹±Õ‘”€ñ½µµ½¸ø(¥¹±Õ‘”€ñ‘¥Ñ¡•É¥¹}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ½±½É}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñÕÙ}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñµ…Á}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ…±Á¡…µ…Á}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ…±Á¡…Ñ•ÍÑ}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ…±Á¡…¡…Í¡}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ…½µ…Á}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ±¥¡Ñµ…Á}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ•µ¥ÍÍ¥Ù•µ…Á}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ¥É¥‘•Í•¹•}™É…µ•¹Ğø(¥¹±Õ‘”€ñÕ‰•}ÕÙ}É•™±•Ñ¥½¹}™É…µ•¹Ğø(¥¹±Õ‘”€ñ•¹Ùµ…Á}½µµ½¹}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ•¹Ùµ…Á}Á¡åÍ¥…±}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ™½}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ±¥¡ÑÍ}Á…ÉÍ}‰•¥¸ø(¥¹±Õ‘”€ñ¹½Éµ…±}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ±¥¡ÑÍ}Á¡åÍ¥…±}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñÑÉ…¹Íµ¥ÍÍ¥½¹}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñÍ¡…‘½İµ…Á}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ‰ÕµÁµ…Á}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ¹½Éµ…±µ…Á}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ±•…É½…Ñ}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ¥É¥‘•Í•¹•}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñÉ½Õ¡¹•ÍÍµ…Á}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñµ•Ñ…±¹•ÍÍµ…Á}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ±½‘•ÁÑ¡‰Õ™}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ±¥ÁÁ¥¹}Á±…¹•Í}Á…ÉÍ}™É…µ•¹Ğø)Ù½¥µ…¥¸ ¤ì(%Ù•ŒĞ‘¥™™ÕÍ•½±½È€ôÙ•ŒĞ ‘¥™™ÕÍ”°½Á…¥Ñä€¤ì($¥¹±Õ‘”€ñ±¥ÁÁ¥¹}Á±…¹•Í}™É…µ•¹Ğø(%I•™±•Ñ•‘1¥¡ĞÉ•™±•Ñ•‘1¥¡Ğ€ôI•™±•Ñ•‘1¥¡Ğ Ù•ŒÌ €À¸À€¤°Ù•ŒÌ €À¸À€¤°Ù•ŒÌ €À¸À€¤°Ù•ŒÌ €À¸À€¤€¤ì(%Ù•ŒÌÑ½Ñ…±µ¥ÍÍ¥Ù•I…‘¥…¹”€ô•µ¥ÍÍ¥Ù”ì($¥¹±Õ‘”€ñ±½‘•ÁÑ¡‰Õ™}™É…µ•¹Ğø($¥¹±Õ‘”€ñµ…Á}™É…µ•¹Ğø($¥¹±Õ‘”€ñ½±½É}™É…µ•¹Ğø($¥¹±Õ‘”€ñ…±Á¡…µ…Á}™É…µ•¹Ğø($¥¹±Õ‘”€ñ…±Á¡…Ñ•ÍÑ}™É…µ•¹Ğø($¥¹±Õ‘”€ñ…±Á¡…¡…Í¡}™É…µ•¹Ğø($¥¹±Õ‘”€ñÉ½Õ¡¹•ÍÍµ…Á}™É…µ•¹Ğø($¥¹±Õ‘”€ñµ•Ñ…±¹•ÍÍµ…Á}™É…µ•¹Ğø($¥¹±Õ‘”€ñ¹½Éµ…±}™É…µ•¹Ñ}‰•¥¸ø($¥¹±Õ‘”€ñ¹½Éµ…±}™É…µ•¹Ñ}µ…ÁÌø($¥¹±Õ‘”€ñ±•…É½…Ñ}¹½Éµ…±}™É…µ•¹Ñ}‰•¥¸ø($¥¹±Õ‘”€ñ±•…É½…Ñ}¹½Éµ…±}™É…µ•¹Ñ}µ…ÁÌø($¥¹±Õ‘”€ñ•µ¥ÍÍ¥Ù•µ…Á}™É…µ•¹Ğø($¥¹±Õ‘”€ñ±¥¡ÑÍ}Á¡åÍ¥…±}™É…µ•¹Ğø($¥¹±Õ‘”€ñ±¥¡ÑÍ}™É…µ•¹Ñ}‰•¥¸ø($¥¹±Õ‘”€ñ±¥¡ÑÍ}™É…µ•¹Ñ}µ…ÁÌø($¥¹±Õ‘”€ñ±¥¡ÑÍ}™É…µ•¹Ñ}•¹ø($¥¹±Õ‘”€ñ…½µ…Á}™É…µ•¹Ğø(%Ù•ŒÌÑ½Ñ…±¥™™ÕÍ”€ôÉ•™±•Ñ•‘1¥¡Ğ¹‘¥É•Ñ¥™™ÕÍ”€¬É•™±•Ñ•‘1¥¡Ğ¹¥¹‘¥É•Ñ¥™™ÕÍ”ì(%Ù•ŒÌÑ½Ñ…±MÁ•Õ±…È€ôÉ•™±•Ñ•‘1¥¡Ğ¹‘¥É•ÑMÁ•Õ±…È€¬É•™±•Ñ•‘1¥¡Ğ¹¥¹‘¥É•ÑMÁ•Õ±…Èì($¥¹±Õ‘”€ñÑÉ…¹Íµ¥ÍÍ¥½¹}™É…µ•¹Ğø(%Ù•ŒÌ½ÕÑ½¥¹1¥¡Ğ€ôÑ½Ñ…±¥™™ÕÍ”€¬Ñ½Ñ…±MÁ•Õ±…È€¬Ñ½Ñ…±µ¥ÍÍ¥Ù•I…‘¥…¹”ì($¥™‘•˜UM}M!8(($%½ÕÑ½¥¹1¥¡Ğ€ô½ÕÑ½¥¹1¥¡Ğ€¬Í¡••¹MÁ•Õ±…É¥É•Ğ€¬Í¡••¹MÁ•Õ±…É%¹‘¥É•Ğì(($•¹‘¥˜($¥™‘•˜UM}1I=P($%™±½…Ğ‘½Ñ9YŒ€ôÍ…ÑÕÉ…Ñ” ‘½Ğ •½µ•ÑÉå±•…É½…Ñ9½Éµ…°°•½µ•ÑÉåY¥•İ¥È€¤€¤ì($%Ù•ŒÌŒ€ô}M¡±¥¬ µ…Ñ•É¥…°¹±•…É½…ÑÀ°µ…Ñ•É¥…°¹±•…É½…ÑäÀ°‘½Ñ9YŒ€¤ì($%½ÕÑ½¥¹1¥¡Ğ€ô½ÕÑ½¥¹1¥¡Ğ€¨€ €Ä¸À€´µ…Ñ•É¥…°¹±•…É½…Ğ€¨Œ€¤€¬€ ±•…É½…ÑMÁ•Õ±…É¥É•Ğ€¬±•…É½…ÑMÁ•Õ±…É%¹‘¥É•Ğ€¤€¨µ…Ñ•É¥…°¹±•…É½…Ğì($•¹‘¥˜($¥¹±Õ‘”€ñ½Á…ÅÕ•}™É…µ•¹Ğø($¥¹±Õ‘”€ñÑ½¹•µ…ÁÁ¥¹}™É…µ•¹Ğø($¥¹±Õ‘”€ñ½±½ÉÍÁ…•}™É…µ•¹Ğø($¥¹±Õ‘”€ñ™½}™É…µ•¹Ğø($¥¹±Õ‘”€ñÁÉ•µÕ±Ñ¥Á±¥•‘}…±Á¡…}™É…µ•¹Ğø($¥¹±Õ‘”€ñ‘¥Ñ¡•É¥¹}™É…µ•¹Ğø)õ€°(€µ•Í¡Ñ½½¹}Ù•ÉĞè€‘•™¥¹”Q==8)Ù…Éå¥¹œÙ•ŒÌÙY¥•İA½Í¥Ñ¥½¸ì(¥¹±Õ‘”€ñ½µµ½¸ø(¥¹±Õ‘”€ñ‰…Ñ¡¥¹}Á…ÉÍ}Ù•ÉÑ•àø(¥¹±Õ‘”€ñÕÙ}Á…ÉÍ}Ù•ÉÑ•àø(¥¹±Õ‘”€ñ‘¥ÍÁ±…•µ•¹Ñµ…Á}Á…ÉÍ}Ù•ÉÑ•àø(¥¹±Õ‘”€ñ½±½É}Á…ÉÍ}Ù•ÉÑ•àø(¥¹±Õ‘”€ñ™½}Á…ÉÍ}Ù•ÉÑ•àø(¥¹±Õ‘”€ñ¹½Éµ…±}Á…ÉÍ}Ù•ÉÑ•àø(¥¹±Õ‘”€ñµ½ÉÁ¡Ñ…É•Ñ}Á…ÉÍ}Ù•ÉÑ•àø(¥¹±Õ‘”€ñÍ­¥¹¹¥¹}Á…ÉÍ}Ù•ÉÑ•àø(¥¹±Õ‘”€ñÍ¡…‘½İµ…Á}Á…ÉÍ}Ù•ÉÑ•àø(¥¹±Õ‘”€ñ±½‘•ÁÑ¡‰Õ™}Á…ÉÍ}Ù•ÉÑ•àø(¥¹±Õ‘”€ñ±¥ÁÁ¥¹}Á±…¹•Í}Á…ÉÍ}Ù•ÉÑ•àø)Ù½¥µ…¥¸ ¤ì($¥¹±Õ‘”€ñÕÙ}Ù•ÉÑ•àø($¥¹±Õ‘”€ñ½±½É}Ù•ÉÑ•àø($¥¹±Õ‘”€ñµ½ÉÁ¡¥¹ÍÑ…¹•}Ù•ÉÑ•àø($¥¹±Õ‘”€ñµ½ÉÁ¡½±½É}Ù•ÉÑ•àø($¥¹±Õ‘”€ñ‰…Ñ¡¥¹}Ù•ÉÑ•àø($¥¹±Õ‘”€ñ‰•¥¹¹½Éµ…±}Ù•ÉÑ•àø($¥¹±Õ‘”€ñµ½ÉÁ¡¹½Éµ…±}Ù•ÉÑ•àø($¥¹±Õ‘”€ñÍ­¥¹‰…Í•}Ù•ÉÑ•àø($¥¹±Õ‘”€ñÍ­¥¹¹½Éµ…±}Ù•ÉÑ•àø($¥¹±Õ‘”€ñ‘•™…Õ±Ñ¹½Éµ…±}Ù•ÉÑ•àø($¥¹±Õ‘”€ñ¹½Éµ…±}Ù•ÉÑ•àø($¥¹±Õ‘”€ñ‰•¥¹}Ù•ÉÑ•àø($¥¹±Õ‘”€ñµ½ÉÁ¡Ñ…É•Ñ}Ù•ÉÑ•àø($¥¹±Õ‘”€ñÍ­¥¹¹¥¹}Ù•ÉÑ•àø($¥¹±Õ‘”€ñ‘¥ÍÁ±…•µ•¹Ñµ…Á}Ù•ÉÑ•àø($¥¹±Õ‘”€ñÁÉ½©•Ñ}Ù•ÉÑ•àø($¥¹±Õ‘”€ñ±½‘•ÁÑ¡‰Õ™}Ù•ÉÑ•àø($¥¹±Õ‘”€ñ±¥ÁÁ¥¹}Á±…¹•Í}Ù•ÉÑ•àø(%ÙY¥•İA½Í¥Ñ¥½¸€ô€´µÙA½Í¥Ñ¥½¸¹áåèì($¥¹±Õ‘”€ñİ½É±‘Á½Í}Ù•ÉÑ•àø($¥¹±Õ‘”€ñÍ¡…‘½İµ…Á}Ù•ÉÑ•àø($¥¹±Õ‘”€ñ™½}Ù•ÉÑ•àø)õ€°(€µ•Í¡Ñ½½¹}™É…œè€‘•™¥¹”Q==8)Õ¹¥™½É´Ù•ŒÌ‘¥™™ÕÍ”ì)Õ¹¥™½É´Ù•ŒÌ•µ¥ÍÍ¥Ù”ì)Õ¹¥™½É´™±½…Ğ½Á…¥Ñäì(¥¹±Õ‘”€ñ½µµ½¸ø(¥¹±Õ‘”€ñ‘¥Ñ¡•É¥¹}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ½±½É}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñÕÙ}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñµ…Á}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ…±Á¡…µ…Á}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ…±Á¡…Ñ•ÍÑ}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ…±Á¡…¡…Í¡}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ…½µ…Á}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ±¥¡Ñµ…Á}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ•µ¥ÍÍ¥Ù•µ…Á}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñÉ…‘¥•¹Ñµ…Á}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ™½}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ‰Í‘™Ìø(¥¹±Õ‘”€ñ±¥¡ÑÍ}Á…ÉÍ}‰•¥¸ø(¥¹±Õ‘”€ñ¹½Éµ…±}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ±¥¡ÑÍ}Ñ½½¹}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñÍ¡…‘½İµ…Á}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ‰ÕµÁµ…Á}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ¹½Éµ…±µ…Á}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ±½‘•ÁÑ¡‰Õ™}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ±¥ÁÁ¥¹}Á±…¹•Í}Á…ÉÍ}™É…µ•¹Ğø)Ù½¥µ…¥¸ ¤ì(%Ù•ŒĞ‘¥™™ÕÍ•½±½È€ôÙ•ŒĞ ‘¥™™ÕÍ”°½Á…¥Ñä€¤ì($¥¹±Õ‘”€ñ±¥ÁÁ¥¹}Á±…¹•Í}™É…µ•¹Ğø(%I•™±•Ñ•‘1¥¡ĞÉ•™±•Ñ•‘1¥¡Ğ€ôI•™±•Ñ•‘1¥¡Ğ Ù•ŒÌ €À¸À€¤°Ù•ŒÌ €À¸À€¤°Ù•ŒÌ €À¸À€¤°Ù•ŒÌ €À¸À€¤€¤ì(%Ù•ŒÌÑ½Ñ…±µ¥ÍÍ¥Ù•I…‘¥…¹”€ô•µ¥ÍÍ¥Ù”ì($¥¹±Õ‘”€ñ±½‘•ÁÑ¡‰Õ™}™É…µ•¹Ğø($¥¹±Õ‘”€ñµ…Á}™É…µ•¹Ğø($¥¹±Õ‘”€ñ½±½É}™É…µ•¹Ğø($¥¹±Õ‘”€ñ…±Á¡…µ…Á}™É…µ•¹Ğø($¥¹±Õ‘”€ñ…±Á¡…Ñ•ÍÑ}™É…µ•¹Ğø($¥¹±Õ‘”€ñ…±Á¡…¡…Í¡}™É…µ•¹Ğø($¥¹±Õ‘”€ñ¹½Éµ…±}™É…µ•¹Ñ}‰•¥¸ø($¥¹±Õ‘”€ñ¹½Éµ…±}™É…µ•¹Ñ}µ…ÁÌø($¥¹±Õ‘”€ñ•µ¥ÍÍ¥Ù•µ…Á}™É…µ•¹Ğø($¥¹±Õ‘”€ñ±¥¡ÑÍ}Ñ½½¹}™É…µ•¹Ğø($¥¹±Õ‘”€ñ±¥¡ÑÍ}™É…µ•¹Ñ}‰•¥¸ø($¥¹±Õ‘”€ñ±¥¡ÑÍ}™É…µ•¹Ñ}µ…ÁÌø($¥¹±Õ‘”€ñ±¥¡ÑÍ}™É…µ•¹Ñ}•¹ø($¥¹±Õ‘”€ñ…½µ…Á}™É…µ•¹Ğø(%Ù•ŒÌ½ÕÑ½¥¹1¥¡Ğ€ôÉ•™±•Ñ•‘1¥¡Ğ¹‘¥É•Ñ¥™™ÕÍ”€¬É•™±•Ñ•‘1¥¡Ğ¹¥¹‘¥É•Ñ¥™™ÕÍ”€¬Ñ½Ñ…±µ¥ÍÍ¥Ù•I…‘¥…¹”ì($¥¹±Õ‘”€ñ½Á…ÅÕ•}™É…µ•¹Ğø($¥¹±Õ‘”€ñÑ½¹•µ…ÁÁ¥¹}™É…µ•¹Ğø($¥¹±Õ‘”€ñ½±½ÉÍÁ…•}™É…µ•¹Ğø($¥¹±Õ‘”€ñ™½}™É…µ•¹Ğø($¥¹±Õ‘”€ñÁÉ•µÕ±Ñ¥Á±¥•‘}…±Á¡…}™É…µ•¹Ğø($¥¹±Õ‘”€ñ‘¥Ñ¡•É¥¹}™É…µ•¹Ğø)õ€°(€Á½¥¹ÑÍ}Ù•ÉĞèÕ¹¥™½É´™±½…ĞÍ¥é”ì)Õ¹¥™½É´™±½…ĞÍ…±”ì(¥¹±Õ‘”€ñ½µµ½¸ø(¥¹±Õ‘”€ñ½±½É}Á…ÉÍ}Ù•ÉÑ•àø(¥¹±Õ‘”€ñ™½}Á…ÉÍ}Ù•ÉÑ•àø(¥¹±Õ‘”€ñµ½ÉÁ¡Ñ…É•Ñ}Á…ÉÍ}Ù•ÉÑ•àø(¥¹±Õ‘”€ñ±½‘•ÁÑ¡‰Õ™}Á…ÉÍ}Ù•ÉÑ•àø(¥¹±Õ‘”€ñ±¥ÁÁ¥¹}Á±…¹•Í}Á…ÉÍ}Ù•ÉÑ•àø(¥™‘•˜UM}A=%9QM}UX(%Ù…Éå¥¹œÙ•ŒÈÙUØì(%Õ¹¥™½É´µ…ĞÌÕÙQÉ…¹Í™½É´ì(•¹‘¥˜)Ù½¥µ…¥¸ ¤ì($¥™‘•˜UM}A=%9QM}UX($%ÙUØ€ô€ ÕÙQÉ…¹Í™½É´€¨Ù•ŒÌ ÕØ°€Ä€¤€¤¹áäì($•¹‘¥˜($¥¹±Õ‘”€ñ½±½É}Ù•ÉÑ•àø($¥¹±Õ‘”€ñµ½ÉÁ¡¥¹ÍÑ…¹•}Ù•ÉÑ•àø($¥¹±Õ‘”€ñµ½ÉÁ¡½±½É}Ù•ÉÑ•àø($¥¹±Õ‘”€ñ‰•¥¹}Ù•ÉÑ•àø($¥¹±Õ‘”€ñµ½ÉÁ¡Ñ…É•Ñ}Ù•ÉÑ•àø($¥¹±Õ‘”€ñÁÉ½©•Ñ}Ù•ÉÑ•àø(%±}A½¥¹ÑM¥é”€ôÍ¥é”ì($¥™‘•˜UM}M%iQQ9UQ%=8($%‰½½°¥ÍA•ÉÍÁ•Ñ¥Ù”€ô¥ÍA•ÉÍÁ•Ñ¥Ù•5…ÑÉ¥à ÁÉ½©•Ñ¥½¹5…ÑÉ¥à€¤ì($%¥˜€ ¥ÍA•ÉÍÁ•Ñ¥Ù”€¤±}A½¥¹ÑM¥é”€¨ô€ Í…±”€¼€´µÙA½Í¥Ñ¥½¸¹è€¤ì($•¹‘¥˜($¥¹±Õ‘”€ñ±½‘•ÁÑ¡‰Õ™}Ù•ÉÑ•àø($¥¹±Õ‘”€ñ±¥ÁÁ¥¹}Á±…¹•Í}Ù•ÉÑ•àø($¥¹±Õ‘”€ñİ½É±‘Á½Í}Ù•ÉÑ•àø($¥¹±Õ‘”€ñ™½}Ù•ÉÑ•àø)õ€°(€Á½¥¹ÑÍ}™É…œèÕ¹¥™½É´Ù•ŒÌ‘¥™™ÕÍ”ì)Õ¹¥™½É´™±½…Ğ½Á…¥Ñäì(¥¹±Õ‘”€ñ½µµ½¸ø(¥¹±Õ‘”€ñ½±½É}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñµ…Á}Á…ÉÑ¥±•}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ…±Á¡…Ñ•ÍÑ}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ…±Á¡…¡…Í¡}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ™½}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ±½‘•ÁÑ¡‰Õ™}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ±¥ÁÁ¥¹}Á±…¹•Í}Á…ÉÍ}™É…µ•¹Ğø)Ù½¥µ…¥¸ ¤ì(%Ù•ŒĞ‘¥™™ÕÍ•½±½È€ôÙ•ŒĞ ‘¥™™ÕÍ”°½Á…¥Ñä€¤ì($¥¹±Õ‘”€ñ±¥ÁÁ¥¹}Á±…¹•Í}™É…µ•¹Ğø(%Ù•ŒÌ½ÕÑ½¥¹1¥¡Ğ€ôÙ•ŒÌ €À¸À€¤ì($¥¹±Õ‘”€ñ±½‘•ÁÑ¡‰Õ™}™É…µ•¹Ğø($¥¹±Õ‘”€ñµ…Á}Á…ÉÑ¥±•}™É…µ•¹Ğø($¥¹±Õ‘”€ñ½±½É}™É…µ•¹Ğø($¥¹±Õ‘”€ñ…±Á¡…Ñ•ÍÑ}™É…µ•¹Ğø($¥¹±Õ‘”€ñ…±Á¡…¡…Í¡}™É…µ•¹Ğø(%½ÕÑ½¥¹1¥¡Ğ€ô‘¥™™ÕÍ•½±½È¹Éˆì($¥¹±Õ‘”€ñ½Á…ÅÕ•}™É…µ•¹Ğø($¥¹±Õ‘”€ñÑ½¹•µ…ÁÁ¥¹}™É…µ•¹Ğø($¥¹±Õ‘”€ñ½±½ÉÍÁ…•}™É…µ•¹Ğø($¥¹±Õ‘”€ñ™½}™É…µ•¹Ğø($¥¹±Õ‘”€ñÁÉ•µÕ±Ñ¥Á±¥•‘}…±Á¡…}™É…µ•¹Ğø)õ€°(€Í¡…‘½İ}Ù•ÉĞè€¥¹±Õ‘”€ñ½µµ½¸ø(¥¹±Õ‘”€ñ‰…Ñ¡¥¹}Á…ÉÍ}Ù•ÉÑ•àø(¥¹±Õ‘”€ñ™½}Á…ÉÍ}Ù•ÉÑ•àø(¥¹±Õ‘”€ñµ½ÉÁ¡Ñ…É•Ñ}Á…ÉÍ}Ù•ÉÑ•àø(¥¹±Õ‘”€ñÍ­¥¹¹¥¹}Á…ÉÍ}Ù•ÉÑ•àø(¥¹±Õ‘”€ñ±½‘•ÁÑ¡‰Õ™}Á…ÉÍ}Ù•ÉÑ•àø(¥¹±Õ‘”€ñÍ¡…‘½İµ…Á}Á…ÉÍ}Ù•ÉÑ•àø)Ù½¥µ…¥¸ ¤ì($¥¹±Õ‘”€ñ‰…Ñ¡¥¹}Ù•ÉÑ•àø($¥¹±Õ‘”€ñ‰•¥¹¹½Éµ…±}Ù•ÉÑ•àø($¥¹±Õ‘”€ñµ½ÉÁ¡¥¹ÍÑ…¹•}Ù•ÉÑ•àø($¥¹±Õ‘”€ñµ½ÉÁ¡¹½Éµ…±}Ù•ÉÑ•àø($¥¹±Õ‘”€ñÍ­¥¹‰…Í•}Ù•ÉÑ•àø($¥¹±Õ‘”€ñÍ­¥¹¹½Éµ…±}Ù•ÉÑ•àø($¥¹±Õ‘”€ñ‘•™…Õ±Ñ¹½Éµ…±}Ù•ÉÑ•àø($¥¹±Õ‘”€ñ‰•¥¹}Ù•ÉÑ•àø($¥¹±Õ‘”€ñµ½ÉÁ¡Ñ…É•Ñ}Ù•ÉÑ•àø($¥¹±Õ‘”€ñÍ­¥¹¹¥¹}Ù•ÉÑ•àø($¥¹±Õ‘”€ñÁÉ½©•Ñ}Ù•ÉÑ•àø($¥¹±Õ‘”€ñ±½‘•ÁÑ¡‰Õ™}Ù•ÉÑ•àø($¥¹±Õ‘”€ñİ½É±‘Á½Í}Ù•ÉÑ•àø($¥¹±Õ‘”€ñÍ¡…‘½İµ…Á}Ù•ÉÑ•àø($¥¹±Õ‘”€ñ™½}Ù•ÉÑ•àø)õ€°(€Í¡…‘½İ}™É…œèÕ¹¥™½É´Ù•ŒÌ½±½Èì)Õ¹¥™½É´™±½…Ğ½Á…¥Ñäì(¥¹±Õ‘”€ñ½µµ½¸ø(¥¹±Õ‘”€ñ™½}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ‰Í‘™Ìø(¥¹±Õ‘”€ñ±¥¡ÑÍ}Á…ÉÍ}‰•¥¸ø(¥¹±Õ‘”€ñ±½‘•ÁÑ¡‰Õ™}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñÍ¡…‘½İµ…Á}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñÍ¡…‘½İµ…Í­}Á…ÉÍ}™É…µ•¹Ğø)Ù½¥µ…¥¸ ¤ì($¥¹±Õ‘”€ñ±½‘•ÁÑ¡‰Õ™}™É…µ•¹Ğø(%±}É…½±½È€ôÙ•ŒĞ ½±½È°½Á…¥Ñä€¨€ €Ä¸À€´•ÑM¡…‘½İ5…Í¬ ¤€¤€¤ì($¥¹±Õ‘”€ñÑ½¹•µ…ÁÁ¥¹}™É…µ•¹Ğø($¥¹±Õ‘”€ñ½±½ÉÍÁ…•}™É…µ•¹Ğø($¥¹±Õ‘”€ñ™½}™É…µ•¹Ğø($¥¹±Õ‘”€ñÁÉ•µÕ±Ñ¥Á±¥•‘}…±Á¡…}™É…µ•¹Ğø)õ€°(€ÍÁÉ¥Ñ•}Ù•ÉĞèÕ¹¥™½É´™±½…ĞÉ½Ñ…Ñ¥½¸ì)Õ¹¥™½É´Ù•ŒÈ•¹Ñ•Èì(¥¹±Õ‘”€ñ½µµ½¸ø(¥¹±Õ‘”€ñÕÙ}Á…ÉÍ}Ù•ÉÑ•àø(¥¹±Õ‘”€ñ™½}Á…ÉÍ}Ù•ÉÑ•àø(¥¹±Õ‘”€ñ±½‘•ÁÑ¡‰Õ™}Á…ÉÍ}Ù•ÉÑ•àø(¥¹±Õ‘”€ñ±¥ÁÁ¥¹}Á±…¹•Í}Á…ÉÍ}Ù•ÉÑ•àø)Ù½¥µ…¥¸ ¤ì($¥¹±Õ‘”€ñÕÙ}Ù•ÉÑ•àø(%Ù•ŒĞµÙA½Í¥Ñ¥½¸€ôµ½‘•±Y¥•İ5…ÑÉ¥ál€Ìtì(%Ù•ŒÈÍ…±”€ôÙ•ŒÈ ±•¹Ñ  µ½‘•±5…ÑÉ¥ál€Àt¹áåè€¤°±•¹Ñ  µ½‘•±5…ÑÉ¥ál€Ät¹áåè€¤€¤ì($¥™¹‘•˜UM}M%iQQ9UQ%=8($%‰½½°¥ÍA•ÉÍÁ•Ñ¥Ù”€ô¥ÍA•ÉÍÁ•Ñ¥Ù•5…ÑÉ¥à ÁÉ½©•Ñ¥½¹5…ÑÉ¥à€¤ì($%¥˜€ ¥ÍA•ÉÍÁ•Ñ¥Ù”€¤Í…±”€¨ô€´µÙA½Í¥Ñ¥½¸¹èì($•¹‘¥˜(%Ù•ŒÈ…±¥¹•‘A½Í¥Ñ¥½¸€ô€ Á½Í¥Ñ¥½¸¹áä€´€ •¹Ñ•È€´Ù•ŒÈ €À¸Ô€¤€¤€¤€¨Í…±”ì(%Ù•ŒÈÉ½Ñ…Ñ•‘A½Í¥Ñ¥½¸ì(%É½Ñ…Ñ•‘A½Í¥Ñ¥½¸¹à€ô½Ì É½Ñ…Ñ¥½¸€¤€¨…±¥¹•‘A½Í¥Ñ¥½¸¹à€´Í¥¸ É½Ñ…Ñ¥½¸€¤€¨…±¥¹•‘A½Í¥Ñ¥½¸¹äì(%É½Ñ…Ñ•‘A½Í¥Ñ¥½¸¹ä€ôÍ¥¸ É½Ñ…Ñ¥½¸€¤€¨…±¥¹•‘A½Í¥Ñ¥½¸¹à€¬½Ì É½Ñ…Ñ¥½¸€¤€¨…±¥¹•‘A½Í¥Ñ¥½¸¹äì(%µÙA½Í¥Ñ¥½¸¹áä€¬ôÉ½Ñ…Ñ•‘A½Í¥Ñ¥½¸ì(%±}A½Í¥Ñ¥½¸€ôÁÉ½©•Ñ¥½¹5…ÑÉ¥à€¨µÙA½Í¥Ñ¥½¸ì($¥¹±Õ‘”€ñ±½‘•ÁÑ¡‰Õ™}Ù•ÉÑ•àø($¥¹±Õ‘”€ñ±¥ÁÁ¥¹}Á±…¹•Í}Ù•ÉÑ•àø($¥¹±Õ‘”€ñ™½}Ù•ÉÑ•àø)õ€°(€ÍÁÉ¥Ñ•}™É…œèÕ¹¥™½É´Ù•ŒÌ‘¥™™ÕÍ”ì)Õ¹¥™½É´™±½…Ğ½Á…¥Ñäì(¥¹±Õ‘”€ñ½µµ½¸ø(¥¹±Õ‘”€ñÕÙ}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñµ…Á}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ…±Á¡…µ…Á}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ…±Á¡…Ñ•ÍÑ}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ…±Á¡…¡…Í¡}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ™½}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ±½‘•ÁÑ¡‰Õ™}Á…ÉÍ}™É…µ•¹Ğø(¥¹±Õ‘”€ñ±¥ÁÁ¥¹}Á±…¹•Í}Á…ÉÍ}™É…µ•¹Ğø)Ù½¥µ…¥¸ ¤ì(%Ù•ŒĞ‘¥™™ÕÍ•½±½È€ôÙ•ŒĞ ‘¥™™ÕÍ”°½Á…¥Ñä€¤ì($¥¹±Õ‘”€ñ±¥ÁÁ¥¹}Á±…¹•Í}™É…µ•¹Ğø(%Ù•ŒÌ½ÕÑ½¥¹1¥¡Ğ€ôÙ•ŒÌ €À¸À€¤ì($¥¹±Õ‘”€ñ±½‘•ÁÑ¡‰Õ™}™É…µ•¹Ğø($¥¹±Õ‘”€ñµ…Á}™É…µ•¹Ğø($¥¹±Õ‘”€ñ…±Á¡…µ…Á}™É…µ•¹Ğø($¥¹±Õ‘”€ñ…±Á¡…Ñ•ÍÑ}™É…µ•¹Ğø($¥¹±Õ‘”€ñ…±Á¡…¡…Í¡}™É…µ•¹Ğø(%½ÕÑ½¥¹1¥¡Ğ€ô‘¥™™ÕÍ•½±½È¹Éˆì($¥¹±Õ‘”€ñ½Á…ÅÕ•}™É…µ•¹Ğø($¥¹±Õ‘”€ñÑ½¹•µ…ÁÁ¥¹}™É…µ•¹Ğø($¥¹±Õ‘”€ñ½±½ÉÍÁ…•}™É…µ•¹Ğø($¥¹±Õ‘”€ñ™½}™É…µ•¹Ğø)õ€)ô°½”€ôì(€½µµ½¸èì(€€€‘¥™™ÕÍ”èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü9” ÄØÜÜÜÈÄÔ¤ô°(€€€½Á…¥ÑäèìÙ…±Õ”è€Äô°(€€€µ…ÀèìÙ…±Õ”è¹Õ±°ô°(€€€µ…ÁQÉ…¹Í™½É´èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” ¤ô°(€€€…±Á¡…5…ÀèìÙ…±Õ”è¹Õ±°ô°(€€€…±Á¡…5…ÁQÉ…¹Í™½É´èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” ¤ô°(€€€…±Á¡…Q•ÍĞèìÙ…±Õ”è€Àô(€ô°(€ÍÁ•Õ±…Éµ…Àèì(€€€ÍÁ•Õ±…É5…ÀèìÙ…±Õ”è¹Õ±°ô°(€€€ÍÁ•Õ±…É5…ÁQÉ…¹Í™½É´èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” ¤ô(€ô°(€•¹Ùµ…Àèì(€€€•¹Ù5…ÀèìÙ…±Õ”è¹Õ±°ô°(€€€•¹Ù5…ÁI½Ñ…Ñ¥½¸èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” ¤ô°(€€€É•™±•Ñ¥Ù¥ÑäèìÙ…±Õ”è€Äô°(€€€¥½ÈèìÙ…±Õ”è€Ä¸Ôô°(€€€É•™É…Ñ¥½¹I…Ñ¥¼èìÙ…±Õ”è€À¸äàô°(€€€‘™1UPèìÙ…±Õ”è¹Õ±°ô(€ô°(€…½µ…Àèì(€€€…½5…ÀèìÙ…±Õ”è¹Õ±°ô°(€€€…½5…Á%¹Ñ•¹Í¥ÑäèìÙ…±Õ”è€Äô°(€€€…½5…ÁQÉ…¹Í™½É´èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” ¤ô(€ô°(€±¥¡Ñµ…Àèì(€€€±¥¡Ñ5…ÀèìÙ…±Õ”è¹Õ±°ô°(€€€±¥¡Ñ5…Á%¹Ñ•¹Í¥ÑäèìÙ…±Õ”è€Äô°(€€€±¥¡Ñ5…ÁQÉ…¹Í™½É´èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” ¤ô(€ô°(€‰ÕµÁµ…Àèì(€€€‰ÕµÁ5…ÀèìÙ…±Õ”è¹Õ±°ô°(€€€‰ÕµÁ5…ÁQÉ…¹Í™½É´èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” ¤ô°(€€€‰ÕµÁM…±”èìÙ…±Õ”è€Äô(€ô°(€¹½Éµ…±µ…Àèì(€€€¹½Éµ…±5…ÀèìÙ…±Õ”è¹Õ±°ô°(€€€¹½Éµ…±5…ÁQÉ…¹Í™½É´èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” ¤ô°(€€€¹½Éµ…±M…±”èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” Ä°€Ä¤ô(€ô°(€‘¥ÍÁ±…•µ•¹Ñµ…Àèì(€€€‘¥ÍÁ±…•µ•¹Ñ5…ÀèìÙ…±Õ”è¹Õ±°ô°(€€€‘¥ÍÁ±…•µ•¹Ñ5…ÁQÉ…¹Í™½É´èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” ¤ô°(€€€‘¥ÍÁ±…•µ•¹ÑM…±”èìÙ…±Õ”è€Äô°(€€€‘¥ÍÁ±…•µ•¹Ñ	¥…ÌèìÙ…±Õ”è€Àô(€ô°(€•µ¥ÍÍ¥Ù•µ…Àèì(€€€•µ¥ÍÍ¥Ù•5…ÀèìÙ…±Õ”è¹Õ±°ô°(€€€•µ¥ÍÍ¥Ù•5…ÁQÉ…¹Í™½É´èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” ¤ô(€ô°(€µ•Ñ…±¹•ÍÍµ…Àèì(€€€µ•Ñ…±¹•ÍÍ5…ÀèìÙ…±Õ”è¹Õ±°ô°(€€€µ•Ñ…±¹•ÍÍ5…ÁQÉ…¹Í™½É´èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” ¤ô(€ô°(€É½Õ¡¹•ÍÍµ…Àèì(€€€É½Õ¡¹•ÍÍ5…ÀèìÙ…±Õ”è¹Õ±°ô°(€€€É½Õ¡¹•ÍÍ5…ÁQÉ…¹Í™½É´èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” ¤ô(€ô°(€É…‘¥•¹Ñµ…ÀèìÉ…‘¥•¹Ñ5…ÀèìÙ…±Õ”è¹Õ±°ôô°(€™½œèì(€€€™½•¹Í¥ÑäèìÙ…±Õ”è€ÈÕ”´Ôô°(€€€™½9•…ÈèìÙ…±Õ”è€Äô°(€€€™½…ÈèìÙ…±Õ”è€É”Ìô°(€€€™½½±½ÈèìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü9” ÄØÜÜÜÈÄÔ¤ô(€ô°(€±¥¡ÑÌèì(€€€…µ‰¥•¹Ñ1¥¡Ñ½±½ÈèìÙ…±Õ”èmtô°(€€€±¥¡ÑAÉ½‰”èìÙ…±Õ”èmtô°(€€€‘¥É•Ñ¥½¹…±1¥¡ÑÌèì(€€€€€Ù…±Õ”èmt°(€€€€€ÁÉ½Á•ÉÑ¥•Ìèì(€€€€€€€‘¥É•Ñ¥½¸èíô°(€€€€€€€½±½Èèíô(€€€€€ô(€€€ô°(€€€‘¥É•Ñ¥½¹…±1¥¡ÑM¡…‘½İÌèì(€€€€€Ù…±Õ”èmt°(€€€€€ÁÉ½Á•ÉÑ¥•Ìèì(€€€€€€€Í¡…‘½İ%¹Ñ•¹Í¥Ñäè€Ä°(€€€€€€€Í¡…‘½İ	¥…Ìèíô°(€€€€€€€Í¡…‘½İ9½Éµ…±	¥…Ìèíô°(€€€€€€€Í¡…‘½İI…‘¥ÕÌèíô°(€€€€€€€Í¡…‘½İ5…ÁM¥é”èíô(€€€€€ô(€€€ô°(€€€‘¥É•Ñ¥½¹…±M¡…‘½İ5…ÑÉ¥àèìÙ…±Õ”èmtô°(€€€ÍÁ½Ñ1¥¡ÑÌèì(€€€€€Ù…±Õ”èmt°(€€€€€ÁÉ½Á•ÉÑ¥•Ìèì(€€€€€€€½±½Èèíô°(€€€€€€€Á½Í¥Ñ¥½¸èíô°(€€€€€€€‘¥É•Ñ¥½¸èíô°(€€€€€€€‘¥ÍÑ…¹”èíô°(€€€€€€€½¹•½Ìèíô°(€€€€€€€Á•¹Õµ‰É…½Ìèíô°(€€€€€€€‘•…äèíô(€€€€€ô(€€€ô°(€€€ÍÁ½Ñ1¥¡ÑM¡…‘½İÌèì(€€€€€Ù…±Õ”èmt°(€€€€€ÁÉ½Á•ÉÑ¥•Ìèì(€€€€€€€Í¡…‘½İ%¹Ñ•¹Í¥Ñäè€Ä°(€€€€€€€Í¡…‘½İ	¥…Ìèíô°(€€€€€€€Í¡…‘½İ9½Éµ…±	¥…Ìèíô°(€€€€€€€Í¡…‘½İI…‘¥ÕÌèíô°(€€€€€€€Í¡…‘½İ5…ÁM¥é”èíô(€€€€€ô(€€€ô°(€€€ÍÁ½Ñ1¥¡Ñ5…ÀèìÙ…±Õ”èmtô°(€€€ÍÁ½Ñ1¥¡Ñ5…ÑÉ¥àèìÙ…±Õ”èmtô°(€€€Á½¥¹Ñ1¥¡ÑÌèì(€€€€€Ù…±Õ”èmt°(€€€€€ÁÉ½Á•ÉÑ¥•Ìèì(€€€€€€€½±½Èèíô°(€€€€€€€Á½Í¥Ñ¥½¸èíô°(€€€€€€€‘•…äèíô°(€€€€€€€‘¥ÍÑ…¹”èíô(€€€€€ô(€€€ô°(€€€Á½¥¹Ñ1¥¡ÑM¡…‘½İÌèì(€€€€€Ù…±Õ”èmt°(€€€€€ÁÉ½Á•ÉÑ¥•Ìèì(€€€€€€€Í¡…‘½İ%¹Ñ•¹Í¥Ñäè€Ä°(€€€€€€€Í¡…‘½İ	¥…Ìèíô°(€€€€€€€Í¡…‘½İ9½Éµ…±	¥…Ìèíô°(€€€€€€€Í¡…‘½İI…‘¥ÕÌèíô°(€€€€€€€Í¡…‘½İ5…ÁM¥é”èíô°(€€€€€€€Í¡…‘½İ…µ•É…9•…Èèíô°(€€€€€€€Í¡…‘½İ…µ•É……Èèíô(€€€€€ô(€€€ô°(€€€Á½¥¹ÑM¡…‘½İ5…ÑÉ¥àèìÙ…±Õ”èmtô°(€€€¡•µ¥ÍÁ¡•É•1¥¡ÑÌèì(€€€€€Ù…±Õ”èmt°(€€€€€ÁÉ½Á•ÉÑ¥•Ìèì(€€€€€€€‘¥É•Ñ¥½¸èíô°(€€€€€€€Í­å½±½Èèíô°(€€€€€€€É½Õ¹‘½±½Èèíô(€€€€€ô(€€€ô°(€€€É•ÑÉ•…1¥¡ÑÌèì(€€€€€Ù…±Õ”èmt°(€€€€€ÁÉ½Á•ÉÑ¥•Ìèì(€€€€€€€½±½Èèíô°(€€€€€€€Á½Í¥Ñ¥½¸èíô°(€€€€€€€İ¥‘Ñ èíô°(€€€€€€€¡•¥¡Ğèíô(€€€€€ô(€€€ô°(€€€±Ñ|ÄèìÙ…±Õ”è¹Õ±°ô°(€€€±Ñ|ÈèìÙ…±Õ”è¹Õ±°ô°(€€€ÁÉ½‰•ÍM èìÙ…±Õ”è¹Õ±°ô°(€€€ÁÉ½‰•Í5¥¸èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü8 ¤ô°(€€€ÁÉ½‰•Í5…àèìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü8 ¤ô°(€€€ÁÉ½‰•ÍI•Í½±ÕÑ¥½¸èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü8 ¤ô(€ô°(€Á½¥¹ÑÌèì(€€€‘¥™™ÕÍ”èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü9” ÄØÜÜÜÈÄÔ¤ô°(€€€½Á…¥ÑäèìÙ…±Õ”è€Äô°(€€€Í¥é”èìÙ…±Õ”è€Äô°(€€€Í…±”èìÙ…±Õ”è€Äô°(€€€µ…ÀèìÙ…±Õ”è¹Õ±°ô°(€€€…±Á¡…5…ÀèìÙ…±Õ”è¹Õ±°ô°(€€€…±Á¡…5…ÁQÉ…¹Í™½É´èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” ¤ô°(€€€…±Á¡…Q•ÍĞèìÙ…±Õ”è€Àô°(€€€ÕÙQÉ…¹Í™½É´èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” ¤ô(€ô°(€ÍÁÉ¥Ñ”èì(€€€‘¥™™ÕÍ”èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü9” ÄØÜÜÜÈÄÔ¤ô°(€€€½Á…¥ÑäèìÙ…±Õ”è€Äô°(€€€•¹Ñ•ÈèìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” À¸Ô°€À¸Ô¤ô°(€€€É½Ñ…Ñ¥½¸èìÙ…±Õ”è€Àô°(€€€µ…ÀèìÙ…±Õ”è¹Õ±°ô°(€€€µ…ÁQÉ…¹Í™½É´èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” ¤ô°(€€€…±Á¡…5…ÀèìÙ…±Õ”è¹Õ±°ô°(€€€…±Á¡…5…ÁQÉ…¹Í™½É´èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” ¤ô°(€€€…±Á¡…Q•ÍĞèìÙ…±Õ”è€Àô(€ô)ô°…¤€ôì(€‰…Í¥Œèì(€€€Õ¹¥™½ÉµÌè€¼¨}}AUI}|€¨¼İĞ¡l(€€€€€½”¹½µµ½¸°(€€€€€½”¹ÍÁ•Õ±…Éµ…À°(€€€€€½”¹•¹Ùµ…À°(€€€€€½”¹…½µ…À°(€€€€€½”¹±¥¡Ñµ…À°(€€€€€½”¹™½œ(€€€t¤°(€€€Ù•ÉÑ•áM¡…‘•Èè=”¹µ•Í¡‰…Í¥}Ù•ÉĞ°(€€€™É…µ•¹ÑM¡…‘•Èè=”¹µ•Í¡‰…Í¥}™É…œ(€ô°(€±…µ‰•ÉĞèì(€€€Õ¹¥™½ÉµÌè€¼¨}}AUI}|€¨¼İĞ¡l(€€€€€½”¹½µµ½¸°(€€€€€½”¹ÍÁ•Õ±…Éµ…À°(€€€€€½”¹•¹Ùµ…À°(€€€€€½”¹…½µ…À°(€€€€€½”¹±¥¡Ñµ…À°(€€€€€½”¹•µ¥ÍÍ¥Ù•µ…À°(€€€€€½”¹‰ÕµÁµ…À°(€€€€€½”¹¹½Éµ…±µ…À°(€€€€€½”¹‘¥ÍÁ±…•µ•¹Ñµ…À°(€€€€€½”¹™½œ°(€€€€€½”¹±¥¡ÑÌ°(€€€€€ì(€€€€€€€•µ¥ÍÍ¥Ù”èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü9” À¤ô°(€€€€€€€•¹Ù5…Á%¹Ñ•¹Í¥ÑäèìÙ…±Õ”è€Äô(€€€€€ô(€€€t¤°(€€€Ù•ÉÑ•áM¡…‘•Èè=”¹µ•Í¡±…µ‰•ÉÑ}Ù•ÉĞ°(€€€™É…µ•¹ÑM¡…‘•Èè=”¹µ•Í¡±…µ‰•ÉÑ}™É…œ(€ô°(€Á¡½¹œèì(€€€Õ¹¥™½ÉµÌè€¼¨}}AUI}|€¨¼İĞ¡l(€€€€€½”¹½µµ½¸°(€€€€€½”¹ÍÁ•Õ±…Éµ…À°(€€€€€½”¹•¹Ùµ…À°(€€€€€½”¹…½µ…À°(€€€€€½”¹±¥¡Ñµ…À°(€€€€€½”¹•µ¥ÍÍ¥Ù•µ…À°(€€€€€½”¹‰ÕµÁµ…À°(€€€€€½”¹¹½Éµ…±µ…À°(€€€€€½”¹‘¥ÍÁ±…•µ•¹Ñµ…À°(€€€€€½”¹™½œ°(€€€€€½”¹±¥¡ÑÌ°(€€€€€ì(€€€€€€€•µ¥ÍÍ¥Ù”èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü9” À¤ô°(€€€€€€€ÍÁ•Õ±…ÈèìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü9” ÄÄÄàĞàÄ¤ô°(€€€€€€€Í¡¥¹¥¹•ÍÌèìÙ…±Õ”è€ÌÀô°(€€€€€€€•¹Ù5…Á%¹Ñ•¹Í¥ÑäèìÙ…±Õ”è€Äô(€€€€€ô(€€€t¤°(€€€Ù•ÉÑ•áM¡…‘•Èè=”¹µ•Í¡Á¡½¹}Ù•ÉĞ°(€€€™É…µ•¹ÑM¡…‘•Èè=”¹µ•Í¡Á¡½¹}™É…œ(€ô°(€ÍÑ…¹‘…Éèì(€€€Õ¹¥™½ÉµÌè€¼¨}}AUI}|€¨¼İĞ¡l(€€€€€½”¹½µµ½¸°(€€€€€½”¹•¹Ùµ…À°(€€€€€½”¹…½µ…À°(€€€€€½”¹±¥¡Ñµ…À°(€€€€€½”¹•µ¥ÍÍ¥Ù•µ…À°(€€€€€½”¹‰ÕµÁµ…À°(€€€€€½”¹¹½Éµ…±µ…À°(€€€€€½”¹‘¥ÍÁ±…•µ•¹Ñµ…À°(€€€€€½”¹É½Õ¡¹•ÍÍµ…À°(€€€€€½”¹µ•Ñ…±¹•ÍÍµ…À°(€€€€€½”¹™½œ°(€€€€€½”¹±¥¡ÑÌ°(€€€€€ì(€€€€€€€•µ¥ÍÍ¥Ù”èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü9” À¤ô°(€€€€€€€É½Õ¡¹•ÍÌèìÙ…±Õ”è€Äô°(€€€€€€€µ•Ñ…±¹•ÍÌèìÙ…±Õ”è€Àô°(€€€€€€€•¹Ù5…Á%¹Ñ•¹Í¥ÑäèìÙ…±Õ”è€Äô(€€€€€ô(€€€t¤°(€€€Ù•ÉÑ•áM¡…‘•Èè=”¹µ•Í¡Á¡åÍ¥…±}Ù•ÉĞ°(€€€™É…µ•¹ÑM¡…‘•Èè=”¹µ•Í¡Á¡åÍ¥…±}™É…œ(€ô°(€Ñ½½¸èì(€€€Õ¹¥™½ÉµÌè€¼¨}}AUI}|€¨¼İĞ¡l(€€€€€½”¹½µµ½¸°(€€€€€½”¹…½µ…À°(€€€€€½”¹±¥¡Ñµ…À°(€€€€€½”¹•µ¥ÍÍ¥Ù•µ…À°(€€€€€½”¹‰ÕµÁµ…À°(€€€€€½”¹¹½Éµ…±µ…À°(€€€€€½”¹‘¥ÍÁ±…•µ•¹Ñµ…À°(€€€€€½”¹É…‘¥•¹Ñµ…À°(€€€€€½”¹™½œ°(€€€€€½”¹±¥¡ÑÌ°(€€€€€ì•µ¥ÍÍ¥Ù”èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü9” À¤ôô(€€€t¤°(€€€Ù•ÉÑ•áM¡…‘•Èè=”¹µ•Í¡Ñ½½¹}Ù•ÉĞ°(€€€™É…µ•¹ÑM¡…‘•Èè=”¹µ•Í¡Ñ½½¹}™É…œ(€ô°(€µ…Ñ…Àèì(€€€Õ¹¥™½ÉµÌè€¼¨}}AUI}|€¨¼İĞ¡l(€€€€€½”¹½µµ½¸°(€€€€€½”¹‰ÕµÁµ…À°(€€€€€½”¹¹½Éµ…±µ…À°(€€€€€½”¹‘¥ÍÁ±…•µ•¹Ñµ…À°(€€€€€½”¹™½œ°(€€€€€ìµ…Ñ…ÀèìÙ…±Õ”è¹Õ±°ôô(€€€t¤°(€€€Ù•ÉÑ•áM¡…‘•Èè=”¹µ•Í¡µ…Ñ…Á}Ù•ÉĞ°(€€€™É…µ•¹ÑM¡…‘•Èè=”¹µ•Í¡µ…Ñ…Á}™É…œ(€ô°(€Á½¥¹ÑÌèì(€€€Õ¹¥™½ÉµÌè€¼¨}}AUI}|€¨¼İĞ¡m½”¹Á½¥¹ÑÌ°½”¹™½t¤°(€€€Ù•ÉÑ•áM¡…‘•Èè=”¹Á½¥¹ÑÍ}Ù•ÉĞ°(€€€™É…µ•¹ÑM¡…‘•Èè=”¹Á½¥¹ÑÍ}™É…œ(€ô°(€‘…Í¡•èì(€€€Õ¹¥™½ÉµÌè€¼¨}}AUI}|€¨¼İĞ¡l(€€€€€½”¹½µµ½¸°(€€€€€½”¹™½œ°(€€€€€ì(€€€€€€€Í…±”èìÙ…±Õ”è€Äô°(€€€€€€€‘…Í¡M¥é”èìÙ…±Õ”è€Äô°(€€€€€€€Ñ½Ñ…±M¥é”èìÙ…±Õ”è€Èô(€€€€€ô(€€€t¤°(€€€Ù•ÉÑ•áM¡…‘•Èè=”¹±¥¹•‘…Í¡•‘}Ù•ÉĞ°(€€€™É…µ•¹ÑM¡…‘•Èè=”¹±¥¹•‘…Í¡•‘}™É…œ(€ô°(€‘•ÁÑ èì(€€€Õ¹¥™½ÉµÌè€¼¨}}AUI}|€¨¼İĞ¡m½”¹½µµ½¸°½”¹‘¥ÍÁ±…•µ•¹Ñµ…Át¤°(€€€Ù•ÉÑ•áM¡…‘•Èè=”¹‘•ÁÑ¡}Ù•ÉĞ°(€€€™É…µ•¹ÑM¡…‘•Èè=”¹‘•ÁÑ¡}™É…œ(€ô°(€¹½Éµ…°èì(€€€Õ¹¥™½ÉµÌè€¼¨}}AUI}|€¨¼İĞ¡l(€€€€€½”¹½µµ½¸°(€€€€€½”¹‰ÕµÁµ…À°(€€€€€½”¹¹½Éµ…±µ…À°(€€€€€½”¹‘¥ÍÁ±…•µ•¹Ñµ…À°(€€€€€ì½Á…¥ÑäèìÙ…±Õ”è€Äôô(€€€t¤°(€€€Ù•ÉÑ•áM¡…‘•Èè=”¹µ•Í¡¹½Éµ…±}Ù•ÉĞ°(€€€™É…µ•¹ÑM¡…‘•Èè=”¹µ•Í¡¹½Éµ…±}™É…œ(€ô°(€ÍÁÉ¥Ñ”èì(€€€Õ¹¥™½ÉµÌè€¼¨}}AUI}|€¨¼İĞ¡m½”¹ÍÁÉ¥Ñ”°½”¹™½t¤°(€€€Ù•ÉÑ•áM¡…‘•Èè=”¹ÍÁÉ¥Ñ•}Ù•ÉĞ°(€€€™É…µ•¹ÑM¡…‘•Èè=”¹ÍÁÉ¥Ñ•}™É…œ(€ô°(€‰…­É½Õ¹èì(€€€Õ¹¥™½ÉµÌèì(€€€€€ÕÙQÉ…¹Í™½É´èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” ¤ô°(€€€€€ĞÉèìÙ…±Õ”è¹Õ±°ô°(€€€€€‰…­É½Õ¹‘%¹Ñ•¹Í¥ÑäèìÙ…±Õ”è€Äô(€€€ô°(€€€Ù•ÉÑ•áM¡…‘•Èè=”¹‰…­É½Õ¹‘}Ù•ÉĞ°(€€€™É…µ•¹ÑM¡…‘•Èè=”¹‰…­É½Õ¹‘}™É…œ(€ô°(€‰…­É½Õ¹‘Õ‰”èì(€€€Õ¹¥™½ÉµÌèì(€€€€€•¹Ù5…ÀèìÙ…±Õ”è¹Õ±°ô°(€€€€€‰…­É½Õ¹‘	±ÕÉÉ¥¹•ÍÌèìÙ…±Õ”è€Àô°(€€€€€‰…­É½Õ¹‘%¹Ñ•¹Í¥ÑäèìÙ…±Õ”è€Äô°(€€€€€‰…­É½Õ¹‘I½Ñ…Ñ¥½¸èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” ¤ô(€€€ô°(€€€Ù•ÉÑ•áM¡…‘•Èè=”¹‰…­É½Õ¹‘Õ‰•}Ù•ÉĞ°(€€€™É…µ•¹ÑM¡…‘•Èè=”¹‰…­É½Õ¹‘Õ‰•}™É…œ(€ô°(€Õ‰”èì(€€€Õ¹¥™½ÉµÌèì(€€€€€ÑÕ‰”èìÙ…±Õ”è¹Õ±°ô°(€€€€€Ñ±¥ÀèìÙ…±Õ”è€´Äô°(€€€€€½Á…¥ÑäèìÙ…±Õ”è€Äô(€€€ô°(€€€Ù•ÉÑ•áM¡…‘•Èè=”¹Õ‰•}Ù•ÉĞ°(€€€™É…µ•¹ÑM¡…‘•Èè=”¹Õ‰•}™É…œ(€ô°(€•ÅÕ¥É•Ğèì(€€€Õ¹¥™½ÉµÌèìÑÅÕ¥É•ĞèìÙ…±Õ”è¹Õ±°ôô°(€€€Ù•ÉÑ•áM¡…‘•Èè=”¹•ÅÕ¥É•Ñ}Ù•ÉĞ°(€€€™É…µ•¹ÑM¡…‘•Èè=”¹•ÅÕ¥É•Ñ}™É…œ(€ô°(€‘¥ÍÑ…¹”èì(€€€Õ¹¥™½ÉµÌè€¼¨}}AUI}|€¨¼İĞ¡l(€€€€€½”¹½µµ½¸°(€€€€€½”¹‘¥ÍÁ±…•µ•¹Ñµ…À°(€€€€€ì(€€€€€€€É•™•É•¹•A½Í¥Ñ¥½¸èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü8 ¤ô°(€€€€€€€¹•…É¥ÍÑ…¹”èìÙ…±Õ”è€Äô°(€€€€€€€™…É¥ÍÑ…¹”èìÙ…±Õ”è€Å”Ìô(€€€€€ô(€€€t¤°(€€€Ù•ÉÑ•áM¡…‘•Èè=”¹‘¥ÍÑ…¹•}Ù•ÉĞ°(€€€™É…µ•¹ÑM¡…‘•Èè=”¹‘¥ÍÑ…¹•}™É…œ(€ô°(€Í¡…‘½Üèì(€€€Õ¹¥™½ÉµÌè€¼¨}}AUI}|€¨¼İĞ¡l(€€€€€½”¹±¥¡ÑÌ°(€€€€€½”¹™½œ°(€€€€€ì(€€€€€€€½±½ÈèìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü9” À¤ô°(€€€€€€€½Á…¥ÑäèìÙ…±Õ”è€Äô(€€€€€ô(€€€t¤°(€€€Ù•ÉÑ•áM¡…‘•Èè=”¹Í¡…‘½İ}Ù•ÉĞ°(€€€™É…µ•¹ÑM¡…‘•Èè=”¹Í¡…‘½İ}™É…œ(€ô)ôì)…¤¹Á¡åÍ¥…°€ôì(€Õ¹¥™½ÉµÌè€¼¨}}AUI}|€¨¼İĞ¡m…¤¹ÍÑ…¹‘…É¹Õ¹¥™½ÉµÌ°ì(€€€±•…É½…ĞèìÙ…±Õ”è€Àô°(€€€±•…É½…Ñ5…ÀèìÙ…±Õ”è¹Õ±°ô°(€€€±•…É½…Ñ5…ÁQÉ…¹Í™½É´èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” ¤ô°(€€€±•…É½…Ñ9½Éµ…±5…ÀèìÙ…±Õ”è¹Õ±°ô°(€€€±•…É½…Ñ9½Éµ…±5…ÁQÉ…¹Í™½É´èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” ¤ô°(€€€±•…É½…Ñ9½Éµ…±M…±”èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” Ä°€Ä¤ô°(€€€±•…É½…ÑI½Õ¡¹•ÍÌèìÙ…±Õ”è€Àô°(€€€±•…É½…ÑI½Õ¡¹•ÍÍ5…ÀèìÙ…±Õ”è¹Õ±°ô°(€€€±•…É½…ÑI½Õ¡¹•ÍÍ5…ÁQÉ…¹Í™½É´èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” ¤ô°(€€€‘¥ÍÁ•ÉÍ¥½¸èìÙ…±Õ”è€Àô°(€€€¥É¥‘•Í•¹”èìÙ…±Õ”è€Àô°(€€€¥É¥‘•Í•¹•5…ÀèìÙ…±Õ”è¹Õ±°ô°(€€€¥É¥‘•Í•¹•5…ÁQÉ…¹Í™½É´èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” ¤ô°(€€€¥É¥‘•Í•¹•%=HèìÙ…±Õ”è€Ä¸Ìô°(€€€¥É¥‘•Í•¹•Q¡¥­¹•ÍÍ5¥¹¥µÕ´èìÙ…±Õ”è€ÄÀÀô°(€€€¥É¥‘•Í•¹•Q¡¥­¹•ÍÍ5…á¥µÕ´èìÙ…±Õ”è€ĞÀÀô°(€€€¥É¥‘•Í•¹•Q¡¥­¹•ÍÍ5…ÀèìÙ…±Õ”è¹Õ±°ô°(€€€¥É¥‘•Í•¹•Q¡¥­¹•ÍÍ5…ÁQÉ…¹Í™½É´èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” ¤ô°(€€€Í¡••¸èìÙ…±Õ”è€Àô°(€€€Í¡••¹½±½ÈèìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü9” À¤ô°(€€€Í¡••¹½±½É5…ÀèìÙ…±Õ”è¹Õ±°ô°(€€€Í¡••¹½±½É5…ÁQÉ…¹Í™½É´èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” ¤ô°(€€€Í¡••¹I½Õ¡¹•ÍÌèìÙ…±Õ”è€Äô°(€€€Í¡••¹I½Õ¡¹•ÍÍ5…ÀèìÙ…±Õ”è¹Õ±°ô°(€€€Í¡••¹I½Õ¡¹•ÍÍ5…ÁQÉ…¹Í™½É´èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” ¤ô°(€€€ÑÉ…¹Íµ¥ÍÍ¥½¸èìÙ…±Õ”è€Àô°(€€€ÑÉ…¹Íµ¥ÍÍ¥½¹5…ÀèìÙ…±Õ”è¹Õ±°ô°(€€€ÑÉ…¹Íµ¥ÍÍ¥½¹5…ÁQÉ…¹Í™½É´èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” ¤ô°(€€€ÑÉ…¹Íµ¥ÍÍ¥½¹M…µÁ±•ÉM¥é”èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” ¤ô°(€€€ÑÉ…¹Íµ¥ÍÍ¥½¹M…µÁ±•É5…ÀèìÙ…±Õ”è¹Õ±°ô°(€€€Ñ¡¥­¹•ÍÌèìÙ…±Õ”è€Àô°(€€€Ñ¡¥­¹•ÍÍ5…ÀèìÙ…±Õ”è¹Õ±°ô°(€€€Ñ¡¥­¹•ÍÍ5…ÁQÉ…¹Í™½É´èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” ¤ô°(€€€…ÑÑ•¹Õ…Ñ¥½¹¥ÍÑ…¹”èìÙ…±Õ”è€Àô°(€€€…ÑÑ•¹Õ…Ñ¥½¹½±½ÈèìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü9” À¤ô°(€€€ÍÁ•Õ±…É½±½ÈèìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü9” Ä°€Ä°€Ä¤ô°(€€€ÍÁ•Õ±…É½±½É5…ÀèìÙ…±Õ”è¹Õ±°ô°(€€€ÍÁ•Õ±…É½±½É5…ÁQÉ…¹Í™½É´èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” ¤ô°(€€€ÍÁ•Õ±…É%¹Ñ•¹Í¥ÑäèìÙ…±Õ”è€Äô°(€€€ÍÁ•Õ±…É%¹Ñ•¹Í¥Ñå5…ÀèìÙ…±Õ”è¹Õ±°ô°(€€€ÍÁ•Õ±…É%¹Ñ•¹Í¥Ñå5…ÁQÉ…¹Í™½É´èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” ¤ô°(€€€…¹¥Í½ÑÉ½ÁåY•Ñ½ÈèìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” ¤ô°(€€€…¹¥Í½ÑÉ½Áå5…ÀèìÙ…±Õ”è¹Õ±°ô°(€€€…¹¥Í½ÑÉ½Áå5…ÁQÉ…¹Í™½É´èìÙ…±Õ”è€¼¨}}AUI}|€¨¼¹•Ü” ¤ô(€õt¤°(€Ù•ÉÑ•áM¡…‘•Èè=”¹µ•Í¡Á¡åÍ¥…±}Ù•ÉĞ°(€™É…µ•¹ÑM¡…‘•Èè=”¹µ•Í¡Á¡åÍ¥…±}™É…œ)ôì)Ù…ÈÈ€ôì(€Èè€À°(€ˆè€À°(€œè€À)ô°‰Ô€ô€¼¨}}AUI}|€¨¼¹•Ü” ¤°‰°€ô€¼¨}}AUI}|€¨¼¹•Ü” ¤ì)‰°¹Í•Ğ ´Ä°€À°€À°€À°€Ä°€À°€À°€À°€Ä¤ì)™Õ¹Ñ¥½¸5Ô¡”°Ğ°¤°¸°È°Ì¤ì(€½¹ÍĞ„€ô¹•Ü9” À¤ì(€±•Ğ¼€ôÈ€ôôô€„À€ü€À€è€Ä°°°Œ° €ô¹Õ±°°€ô€À°Ô€ô¹Õ±°ì(€™Õ¹Ñ¥½¸À¡P¤ì(€€€±•Ğ€ôP¹¥ÍM•¹”€ôôô€„À€üP¹‰…­É½Õ¹€è¹Õ±°ì(€€€¥˜€¡€˜˜¹¥ÍQ•áÑÕÉ”¤ì(€€€€€½¹ÍĞ4€ôP¹‰…­É½Õ¹‘	±ÕÉÉ¥¹•ÍÌ€ø€Àì(€€€€€€ôĞ¹•Ğ¡°4¤ì(€€€ô(€€€É•ÑÕÉ¸ì(€ô(€™Õ¹Ñ¥½¸Ø¡P¤ì(€€€±•Ğ€ô€„Äì(€€€½¹ÍĞ4€ôÀ¡P¤ì(€€€4€ôôô¹Õ±°€ü´¡„°¼¤€è4€˜˜4¹¥Í½±½È€˜˜€¡´¡4°€Ä¤°€ô€„À¤ì(€€€½¹ÍĞ€ô”¹áÈ¹•Ñ¹Ù¥É½¹µ•¹Ñ	±•¹‘5½‘” ¤ì(€€€€ôôô€‰…‘‘¥Ñ¥Ù”ˆ€ü¤¹‰Õ™™•ÉÌ¹½±½È¹Í•Ñ±•…È À°€À°€À°€Ä°Ì¤€è€ôôô€‰…±Á¡„µ‰±•¹ˆ€˜˜¤¹‰Õ™™•ÉÌ¹½±½È¹Í•Ñ±•…È À°€À°€À°€À°Ì¤°€¡”¹…ÕÑ½±•…Èñğ¤€˜˜€¡¤¹‰Õ™™•ÉÌ¹‘•ÁÑ ¹Í•ÑQ•ÍĞ „À¤°¤¹‰Õ™™•ÉÌ¹‘•ÁÑ ¹Í•Ñ5…Í¬ „À¤°¤¹‰Õ™™•ÉÌ¹½±½È¹Í•Ñ5…Í¬ „À¤°”¹±•…È¡”¹…ÕÑ½±•…É½±½È°”¹…ÕÑ½±•…É•ÁÑ °”¹…ÕÑ½±•…ÉMÑ•¹¥°¤¤ì(€ô(€™Õ¹Ñ¥½¸ˆ¡P°¤ì(€€€½¹ÍĞ4€ôÀ¡¤ì(€€€4€˜˜€¡4¹¥ÍÕ‰•Q•áÑÕÉ”ñğ4¹µ…ÁÁ¥¹œ€ôôô€ÌÀØ¤€ü€¡Œ€ôôôÙ½¥€À€˜˜€¡Œ€ô¹•ÜĞ¡¹•Ü)Ì Ä°€Ä°€Ä¤°¹•Ü¡¤¡ì(€€€€€¹…µ”è€‰	…­É½Õ¹‘Õ‰•5…Ñ•É¥…°ˆ°(€€€€€Õ¹¥™½ÉµÌè¸¡…¤¹‰…­É½Õ¹‘Õ‰”¹Õ¹¥™½ÉµÌ¤°(€€€€€Ù•ÉÑ•áM¡…‘•Èè…¤¹‰…­É½Õ¹‘Õ‰”¹Ù•ÉÑ•áM¡…‘•È°(€€€€€™É…µ•¹ÑM¡…‘•Èè…¤¹‰…­É½Õ¹‘Õ‰”¹™É…µ•¹ÑM¡…‘•È°(€€€€€Í¥‘”è€Ä°(€€€€€‘•ÁÑ¡Q•ÍĞè€„Ä°(€€€€€‘•ÁÑ¡]É¥Ñ”è€„Ä°(€€€€€™½œè€„Ä°(€€€€€…±±½İ=Ù•ÉÉ¥‘”è€„Ä(€€€ô¤¤°Œ¹•½µ•ÑÉä¹‘•±•Ñ•ÑÑÉ¥‰ÕÑ” ‰¹½Éµ…°ˆ¤°Œ¹•½µ•ÑÉä¹‘•±•Ñ•ÑÑÉ¥‰ÕÑ” ‰ÕØˆ¤°Œ¹½¹	•™½É•I•¹‘•È€ô™Õ¹Ñ¥½¸¡°H°¤ì(€€€€€Ñ¡¥Ì¹µ…ÑÉ¥á]½É±¹½ÁåA½Í¥Ñ¥½¸¡¹µ…ÑÉ¥á]½É±¤ì(€€€ô°=‰©•Ğ¹‘•™¥¹•AÉ½Á•ÉÑä¡Œ¹µ…Ñ•É¥…°°€‰•¹Ù5…Àˆ°ì•Ğè™Õ¹Ñ¥½¸ ¤ì(€€€€€É•ÑÕÉ¸Ñ¡¥Ì¹Õ¹¥™½ÉµÌ¹•¹Ù5…À¹Ù…±Õ”ì(€€€ôô¤°¸¹ÕÁ‘…Ñ”¡Œ¤¤°Œ¹µ…Ñ•É¥…°¹Õ¹¥™½ÉµÌ¹•¹Ù5…À¹Ù…±Õ”€ô4°Œ¹µ…Ñ•É¥…°¹Õ¹¥™½ÉµÌ¹‰…­É½Õ¹‘	±ÕÉÉ¥¹•ÍÌ¹Ù…±Õ”€ô¹‰…­É½Õ¹‘	±ÕÉÉ¥¹•ÍÌ°Œ¹µ…Ñ•É¥…°¹Õ¹¥™½ÉµÌ¹‰…­É½Õ¹‘%¹Ñ•¹Í¥Ñä¹Ù…±Õ”€ô¹‰…­É½Õ¹‘%¹Ñ•¹Í¥Ñä°Œ¹µ…Ñ•É¥…°¹Õ¹¥™½ÉµÌ¹‰…­É½Õ¹‘I½Ñ…Ñ¥½¸¹Ù…±Õ”¹Í•ÑÉ½µ5…ÑÉ¥àĞ¡‰Ô¹µ…­•I½Ñ…Ñ¥½¹É½µÕ±•È¡¹‰…­É½Õ¹‘I½Ñ…Ñ¥½¸¤¤¹ÑÉ…¹ÍÁ½Í” ¤°4¹¥ÍÕ‰•Q•áÑÕÉ”€˜˜4¹¥ÍI•¹‘•ÉQ…É•ÑQ•áÑÕÉ”€ôôô€„Ä€˜˜Œ¹µ…Ñ•É¥…°¹Õ¹¥™½ÉµÌ¹‰…­É½Õ¹‘I½Ñ…Ñ¥½¸¹Ù…±Õ”¹ÁÉ•µÕ±Ñ¥Á±ä¡‰°¤°Œ¹µ…Ñ•É¥…°¹Ñ½¹•5…ÁÁ•€ô!”¹•ÑQÉ…¹Í™•È¡4¹½±½ÉMÁ…”¤€„ôôéÈ°€¡ €„ôô4ñğ€„ôô4¹Ù•ÉÍ¥½¸ñğÔ€„ôô”¹Ñ½¹•5…ÁÁ¥¹œ¤€˜˜€¡Œ¹µ…Ñ•É¥…°¹¹••‘ÍUÁ‘…Ñ”€ô€„À° €ô4°€ô4¹Ù•ÉÍ¥½¸°Ô€ô”¹Ñ½¹•5…ÁÁ¥¹œ¤°Œ¹±…å•ÉÌ¹•¹…‰±•±° ¤°P¹Õ¹Í¡¥™Ğ¡Œ°Œ¹•½µ•ÑÉä°Œ¹µ…Ñ•É¥…°°€À°€À°¹Õ±°¤¤€è4€˜˜4¹¥ÍQ•áÑÕÉ”€˜˜€¡°€ôôôÙ½¥€À€˜˜€¡°€ô¹•ÜĞ¡¹•ÜÕ° È°€È¤°¹•Ü¡¤¡ì(€€€€€¹…µ”è€‰	…­É½Õ¹‘5…Ñ•É¥…°ˆ°(€€€€€Õ¹¥™½ÉµÌè¸¡…¤¹‰…­É½Õ¹¹Õ¹¥™½ÉµÌ¤°(€€€€€Ù•ÉÑ•áM¡…‘•Èè…¤¹‰…­É½Õ¹¹Ù•ÉÑ•áM¡…‘•È°(€€€€€™É…µ•¹ÑM¡…‘•Èè…¤¹‰…­É½Õ¹¹™É…µ•¹ÑM¡…‘•È°(€€€€€Í¥‘”è€À°(€€€€€‘•ÁÑ¡Q•ÍĞè€„Ä°(€€€€€‘•ÁÑ¡]É¥Ñ”è€„Ä°(€€€€€™½œè€„Ä°(€€€€€…±±½İ=Ù•ÉÉ¥‘”è€„Ä(€€€ô¤¤°°¹•½µ•ÑÉä¹‘•±•Ñ•ÑÑÉ¥‰ÕÑ” ‰¹½Éµ…°ˆ¤°=‰©•Ğ¹‘•™¥¹•AÉ½Á•ÉÑä¡°¹µ…Ñ•É¥…°°€‰µ…Àˆ°ì•Ğè™Õ¹Ñ¥½¸ ¤ì(€€€€€É•ÑÕÉ¸Ñ¡¥Ì¹Õ¹¥™½ÉµÌ¹ĞÉ¹Ù…±Õ”ì(€€€ôô¤°¸¹ÕÁ‘…Ñ”¡°¤¤°°¹µ…Ñ•É¥…°¹Õ¹¥™½ÉµÌ¹ĞÉ¹Ù…±Õ”€ô4°°¹µ…Ñ•É¥…°¹Õ¹¥™½ÉµÌ¹‰…­É½Õ¹‘%¹Ñ•¹Í¥Ñä¹Ù…±Õ”€ô¹‰…­É½Õ¹‘%¹Ñ•¹Í¥Ñä°°¹µ…Ñ•É¥…°¹Ñ½¹•5…ÁÁ•€ô!”¹•ÑQÉ…¹Í™•È¡4¹½±½ÉMÁ…”¤€„ôôéÈ°4¹µ…ÑÉ¥áÕÑ½UÁ‘…Ñ”€ôôô€„À€˜˜4¹ÕÁ‘…Ñ•5…ÑÉ¥à ¤°°¹µ…Ñ•É¥…°¹Õ¹¥™½ÉµÌ¹ÕÙQÉ…¹Í™½É´¹Ù…±Õ”¹½Áä¡4¹µ…ÑÉ¥à¤°€¡ €„ôô4ñğ€„ôô4¹Ù•ÉÍ¥½¸ñğÔ€„ôô”¹Ñ½¹•5…ÁÁ¥¹œ¤€˜˜€¡°¹µ…Ñ•É¥…°¹¹••‘ÍUÁ‘…Ñ”€ô€„À° €ô4°€ô4¹Ù•ÉÍ¥½¸°Ô€ô”¹Ñ½¹•5…ÁÁ¥¹œ¤°°¹±…å•ÉÌ¹•¹…‰±•±° ¤°P¹Õ¹Í¡¥™Ğ¡°°°¹•½µ•ÑÉä°°¹µ…Ñ•É¥…°°€À°€À°¹Õ±°¤¤ì(€ô(€™Õ¹Ñ¥½¸´¡P°¤ì(€€€P¹•ÑI¡È°™°¡”¤¤°¤¹‰Õ™™•ÉÌ¹½±½È¹Í•Ñ±•…È¡È¹È°È¹œ°È¹ˆ°°Ì¤ì(€ô(€™Õ¹Ñ¥½¸˜ ¤ì(€€€Œ€„ôôÙ½¥€À€˜˜€¡Œ¹•½µ•ÑÉä¹‘¥ÍÁ½Í” ¤°Œ¹µ…Ñ•É¥…°¹‘¥ÍÁ½Í” ¤°Œ€ôÙ½¥€À¤°°€„ôôÙ½¥€À€˜˜€¡°¹•½µ•ÑÉä¹‘¥ÍÁ½Í” ¤°°¹µ…Ñ•É¥…°¹‘¥ÍÁ½Í” ¤°°€ôÙ½¥€À¤ì(€ô(€É•ÑÕÉ¸ì(€€€•Ñ±•…É½±½Èè™Õ¹Ñ¥½¸ ¤ì(€€€€€É•ÑÕÉ¸„ì(€€€ô°(€€€Í•Ñ±•…É½±½Èè™Õ¹Ñ¥½¸¡P°€ô€Ä¤ì(€€€€€„¹Í•Ğ¡P¤°¼€ô°´¡„°¼¤ì(€€€ô°(€€€•Ñ±•…É±Á¡„è™Õ¹Ñ¥½¸ ¤ì(€€€€€É•ÑÕÉ¸¼ì(€€€ô°(€€€Í•Ñ±•…É±Á¡„è™Õ¹Ñ¥½¸¡P¤ì(€€€€€¼€ôP°´¡„°¼¤ì(€€€ô°(€€€É•¹‘•ÈèØ°(€€€…‘‘Q½I•¹‘•É1¥ÍĞèˆ°(€€€‘¥ÍÁ½Í”è˜(€ôì)ô)™Õ¹Ñ¥½¸áÔ¡”°Ğ¤ì(€½¹ÍĞ¤€ô”¹•ÑA…É…µ•Ñ•È¡”¹5a}YIQa}QQI%	L¤°¸€ôíô°È€ôÔ¡¹Õ±°¤ì(€±•ĞÌ€ôÈ°„€ô€„Äì(€™Õ¹Ñ¥½¸¼¡Ü°¬°`°Ä°¤ì(€€€±•Ğ,€ô€„Äì(€€€½¹ÍĞ<€ô¡Ü°Ä°`°¬¤ì(€€€Ì€„ôô<€˜˜€¡Ì€ô<°Œ¡Ì¹½‰©•Ğ¤¤°,€ôÀ¡Ü°Ä°`°¤°,€˜˜Ø¡Ü°Ä°`°¤°€„ôô¹Õ±°€˜˜Ğ¹ÕÁ‘…Ñ”¡°”¹159Q}IIe}	UH¤°€¡,ñğ„¤€˜˜€¡„€ô€„Ä°4¡Ü°¬°`°Ä¤°€„ôô¹Õ±°€˜˜”¹‰¥¹‘	Õ™™•È¡”¹159Q}IIe}	UH°Ğ¹•Ğ¡¤¹‰Õ™™•È¤¤ì(€ô(€™Õ¹Ñ¥½¸° ¤ì(€€€É•ÑÕÉ¸”¹É•…Ñ•Y•ÉÑ•áÉÉ…ä ¤ì(€ô(€™Õ¹Ñ¥½¸Œ¡Ü¤ì(€€€É•ÑÕÉ¸”¹‰¥¹‘Y•ÉÑ•áÉÉ…ä¡Ü¤ì(€ô(€™Õ¹Ñ¥½¸ ¡Ü¤ì(€€€É•ÑÕÉ¸”¹‘•±•Ñ•Y•ÉÑ•áÉÉ…ä¡Ü¤ì(€ô(€™Õ¹Ñ¥½¸¡Ü°¬°`°Ä¤ì(€€€½¹ÍĞ€ôÄ¹İ¥É•™É…µ”€ôôô€„Àì(€€€±•Ğ,€ô¹m¬¹¥‘tì(€€€,€ôôôÙ½¥€À€˜˜€¡,€ôíô°¹m¬¹¥‘t€ô,¤ì(€€€½¹ÍĞ<€ôÜ¹¥Í%¹ÍÑ…¹•‘5•Í €ôôô€„À€üÜ¹¥€è€Àì(€€€±•ĞÑ”€ô-m=tì(€€€Ñ”€ôôôÙ½¥€À€˜˜€¡Ñ”€ôíô°-m=t€ôÑ”¤ì(€€€±•Ğ€€ôÑ•m`¹¥‘tì(€€€€€ôôôÙ½¥€À€˜˜€ €ôíô°Ñ•m`¹¥‘t€ô€¤ì(€€€±•Ğ¥”€ô€‘mtì(€€€É•ÑÕÉ¸¥”€ôôôÙ½¥€À€˜˜€¡¥”€ôÔ¡° ¤¤°€‘mt€ô¥”¤°¥”ì(€ô(€™Õ¹Ñ¥½¸Ô¡Ü¤ì(€€€½¹ÍĞ¬€ômt°`€ômt°Ä€ômtì(€€€™½È€¡±•Ğ€ô€Àì€ğ¤ì¬¬¤(€€€€€­mt€ô€À°amt€ô€À°Åmt€ô€Àì(€€€É•ÑÕÉ¸ì(€€€€€•½µ•ÑÉäè¹Õ±°°(€€€€€ÁÉ½É…´è¹Õ±°°(€€€€€İ¥É•™É…µ”è€„Ä°(€€€€€¹•İÑÑÉ¥‰ÕÑ•Ìè¬°(€€€€€•¹…‰±•‘ÑÑÉ¥‰ÕÑ•Ìè`°(€€€€€…ÑÑÉ¥‰ÕÑ•¥Ù¥Í½ÉÌèÄ°(€€€€€½‰©•ĞèÜ°(€€€€€…ÑÑÉ¥‰ÕÑ•Ìèíô°(€€€€€¥¹‘•àè¹Õ±°(€€€ôì(€ô(€™Õ¹Ñ¥½¸À¡Ü°¬°`°Ä¤ì(€€€½¹ÍĞ€ôÌ¹…ÑÑÉ¥‰ÕÑ•Ì°,€ô¬¹…ÑÑÉ¥‰ÕÑ•Ìì(€€€±•Ğ<€ô€Àì(€€€½¹ÍĞÑ”€ô`¹•ÑÑÑÉ¥‰ÕÑ•Ì ¤ì(€€€™½È€¡½¹ÍĞ€¥¸Ñ”¤¥˜€¡Ñ•l‘t¹±½…Ñ¥½¸€øô€À¤ì(€€€€€½¹ÍĞ¥”€ôl‘tì(€€€€€±•ĞÕ”€ô-l‘tì(€€€€€¥˜€¡Õ”€ôôôÙ½¥€À€˜˜€ €ôôô€‰¥¹ÍÑ…¹•5…ÑÉ¥àˆ€˜˜Ü¹¥¹ÍÑ…¹•5…ÑÉ¥à€˜˜€¡Õ”€ôÜ¹¥¹ÍÑ…¹•5…ÑÉ¥à¤°€€ôôô€‰¥¹ÍÑ…¹•½±½Èˆ€˜˜Ü¹¥¹ÍÑ…¹•½±½È€˜˜€¡Õ”€ôÜ¹¥¹ÍÑ…¹•½±½È¤¤°¥”€ôôôÙ½¥€Àñğ¥”¹…ÑÑÉ¥‰ÕÑ”€„ôôÕ”ñğÕ”€˜˜¥”¹‘…Ñ„€„ôôÕ”¹‘…Ñ„¤É•ÑÕÉ¸€„Àì(€€€€€<¬¬ì(€€€ô(€€€É•ÑÕÉ¸Ì¹…ÑÑÉ¥‰ÕÑ•Í9Õ´€„ôô<ñğÌ¹¥¹‘•à€„ôôÄì(€ô(€™Õ¹Ñ¥½¸Ø¡Ü°¬°`°Ä¤ì(€€€½¹ÍĞ€ôíô°,€ô¬¹…ÑÑÉ¥‰ÕÑ•Ìì(€€€±•Ğ<€ô€Àì(€€€½¹ÍĞÑ”€ô`¹•ÑÑÑÉ¥‰ÕÑ•Ì ¤ì(€€€™½È€¡½¹ÍĞ€¥¸Ñ”¤¥˜€¡Ñ•l‘t¹±½…Ñ¥½¸€øô€À¤ì(€€€€€±•Ğ¥”€ô-l‘tì(€€€€€¥”€ôôôÙ½¥€À€˜˜€ €ôôô€‰¥¹ÍÑ…¹•5…ÑÉ¥àˆ€˜˜Ü¹¥¹ÍÑ…¹•5…ÑÉ¥à€˜˜€¡¥”€ôÜ¹¥¹ÍÑ…¹•5…ÑÉ¥à¤°€€ôôô€‰¥¹ÍÑ…¹•½±½Èˆ€˜˜Ü¹¥¹ÍÑ…¹•½±½È€˜˜€¡¥”€ôÜ¹¥¹ÍÑ…¹•½±½È¤¤ì(€€€€€½¹ÍĞÕ”€ôíôì(€€€€€Õ”¹…ÑÑÉ¥‰ÕÑ”€ô¥”°¥”€˜˜¥”¹‘…Ñ„€˜˜€¡Õ”¹‘…Ñ„€ô¥”¹‘…Ñ„¤°l‘t€ôÕ”°<¬¬ì(€€€ô(€€€Ì¹…ÑÑÉ¥‰ÕÑ•Ì€ô°Ì¹…ÑÑÉ¥‰ÕÑ•Í9Õ´€ô<°Ì¹¥¹‘•à€ôÄì(€ô(€™Õ¹Ñ¥½¸ˆ ¤ì(€€€½¹ÍĞÜ€ôÌ¹¹•İÑÑÉ¥‰ÕÑ•Ìì(€€€™½È€¡±•Ğ¬€ô€À°`€ôÜ¹±•¹Ñ ì¬€ğ`ì¬¬¬¤İm­t€ô€Àì(€ô(€™Õ¹Ñ¥½¸´¡Ü¤ì(€€€˜¡Ü°€À¤ì(€ô(€™Õ¹Ñ¥½¸˜¡Ü°¬¤ì(€€€½¹ÍĞ`€ôÌ¹¹•İÑÑÉ¥‰ÕÑ•Ì°Ä€ôÌ¹•¹…‰±•‘ÑÑÉ¥‰ÕÑ•Ì°€ôÌ¹…ÑÑÉ¥‰ÕÑ•¥Ù¥Í½ÉÌì(€€€amİt€ô€Ä°Åmİt€ôôô€À€˜˜€¡”¹•¹…‰±•Y•ÉÑ•áÑÑÉ¥‰ÉÉ…ä¡Ü¤°Åmİt€ô€Ä¤°mİt€„ôô¬€˜˜€¡”¹Ù•ÉÑ•áÑÑÉ¥‰¥Ù¥Í½È¡Ü°¬¤°mİt€ô¬¤ì(€ô(€™Õ¹Ñ¥½¸P ¤ì(€€€½¹ÍĞÜ€ôÌ¹¹•İÑÑÉ¥‰ÕÑ•Ì°¬€ôÌ¹•¹…‰±•‘ÑÑÉ¥‰ÕÑ•Ìì(€€€™½È€¡±•Ğ`€ô€À°Ä€ô¬¹±•¹Ñ ì`€ğÄì`¬¬¤­mat€„ôôİmat€˜˜€¡”¹‘¥Í…‰±•Y•ÉÑ•áÑÑÉ¥‰ÉÉ…ä¡`¤°­mat€ô€À¤ì(€ô(€™Õ¹Ñ¥½¸¡Ü°¬°`°Ä°°,°<¤ì(€€€<€ôôô€„À€ü”¹Ù•ÉÑ•áÑÑÉ¥‰%A½¥¹Ñ•È¡Ü°¬°`°°,¤€è”¹Ù•ÉÑ•áÑÑÉ¥‰A½¥¹Ñ•È¡Ü°¬°`°Ä°°,¤ì(€ô(€™Õ¹Ñ¥½¸4¡Ü°¬°`°Ä¤ì(€€€ˆ ¤ì(€€€½¹ÍĞ€ôÄ¹…ÑÑÉ¥‰ÕÑ•Ì°,€ô`¹•ÑÑÑÉ¥‰ÕÑ•Ì ¤°<€ô¬¹‘•™…Õ±ÑÑÑÉ¥‰ÕÑ•Y…±Õ•Ìì(€€€™½È€¡½¹ÍĞÑ”¥¸,¤ì(€€€€€½¹ÍĞ€€ô-mÑ•tì(€€€€€¥˜€ ¹±½…Ñ¥½¸€øô€À¤ì(€€€€€€€±•Ğ¥”€ômÑ•tì(€€€€€€€¥˜€¡¥”€ôôôÙ½¥€À€˜˜€¡Ñ”€ôôô€‰¥¹ÍÑ…¹•5…ÑÉ¥àˆ€˜˜Ü¹¥¹ÍÑ…¹•5…ÑÉ¥à€˜˜€¡¥”€ôÜ¹¥¹ÍÑ…¹•5…ÑÉ¥à¤°Ñ”€ôôô€‰¥¹ÍÑ…¹•½±½Èˆ€˜˜Ü¹¥¹ÍÑ…¹•½±½È€˜˜€¡¥”€ôÜ¹¥¹ÍÑ…¹•½±½È¤¤°¥”€„ôôÙ½¥€À¤ì(€€€€€€€€€½¹ÍĞÕ”€ô¥”¹¹½Éµ…±¥é•°”€ô¥”¹¥Ñ•µM¥é”°Ù”€ôĞ¹•Ğ¡¥”¤ì(€€€€€€€€€¥˜€¡Ù”€ôôôÙ½¥€À¤½¹Ñ¥¹Õ”ì(€€€€€€€€€½¹ÍĞå”€ôÙ”¹‰Õ™™•È° €ôÙ”¹ÑåÁ”°D€ôÙ”¹‰åÑ•ÍA•É±•µ•¹Ğ°‘”€ô €ôôô”¹%9Pñğ €ôôô”¹U9M%9}%9Pñğ¥”¹ÁÕQåÁ”€ôôô€ÄÀÄÌì(€€€€€€€€€¥˜€¡¥”¹¥Í%¹Ñ•É±•…Ù•‘	Õ™™•ÉÑÑÉ¥‰ÕÑ”¤ì(€€€€€€€€€€€½¹ÍĞ±”€ô¥”¹‘…Ñ„°I”€ô±”¹ÍÑÉ¥‘”°”€ô¥”¹½™™Í•Ğì(€€€€€€€€€€€¥˜€¡±”¹¥Í%¹ÍÑ…¹•‘%¹Ñ•É±•…Ù•‘	Õ™™•È¤ì(€€€€€€€€€€€€€™½È€¡±•Ğ%”€ô€Àì%”€ğ€¹±½…Ñ¥½¹M¥é”ì%”¬¬¤˜ ¹±½…Ñ¥½¸€¬%”°±”¹µ•Í¡A•ÉÑÑÉ¥‰ÕÑ”¤ì(€€€€€€€€€€€€€Ü¹¥Í%¹ÍÑ…¹•‘5•Í €„ôô€„À€˜˜Ä¹}µ…á%¹ÍÑ…¹•½Õ¹Ğ€ôôôÙ½¥€À€˜˜€¡Ä¹}µ…á%¹ÍÑ…¹•½Õ¹Ğ€ô±”¹µ•Í¡A•ÉÑÑÉ¥‰ÕÑ”€¨±”¹½Õ¹Ğ¤ì(€€€€€€€€€€€ô•±Í”™½È€¡±•Ğ%”€ô€Àì%”€ğ€¹±½…Ñ¥½¹M¥é”ì%”¬¬¤´ ¹±½…Ñ¥½¸€¬%”¤ì(€€€€€€€€€€€”¹‰¥¹‘	Õ™™•È¡”¹IIe}	UH°å”¤ì(€€€€€€€€€€€™½È€¡±•Ğ%”€ô€Àì%”€ğ€¹±½…Ñ¥½¹M¥é”ì%”¬¬¤ ¹±½…Ñ¥½¸€¬%”°”€¼€¹±½…Ñ¥½¹M¥é”° °Õ”°I”€¨D°€¡”€¬”€¼€¹±½…Ñ¥½¹M¥é”€¨%”¤€¨D°‘”¤ì(€€€€€€€€€ô•±Í”ì(€€€€€€€€€€€¥˜€¡¥”¹¥Í%¹ÍÑ…¹•‘	Õ™™•ÉÑÑÉ¥‰ÕÑ”¤ì(€€€€€€€€€€€€€™½È€¡±•Ğ±”€ô€Àì±”€ğ€¹±½…Ñ¥½¹M¥é”ì±”¬¬¤˜ ¹±½…Ñ¥½¸€¬±”°¥”¹µ•Í¡A•ÉÑÑÉ¥‰ÕÑ”¤ì(€€€€€€€€€€€€€Ü¹¥Í%¹ÍÑ…¹•‘5•Í €„ôô€„À€˜˜Ä¹}µ…á%¹ÍÑ…¹•½Õ¹Ğ€ôôôÙ½¥€À€˜˜€¡Ä¹}µ…á%¹ÍÑ…¹•½Õ¹Ğ€ô¥”¹µ•Í¡A•ÉÑÑÉ¥‰ÕÑ”€¨¥”¹½Õ¹Ğ¤ì(€€€€€€€€€€€ô•±Í”™½È€¡±•Ğ±”€ô€Àì±”€ğ€¹±½…Ñ¥½¹M¥é”ì±”¬¬¤´ ¹±½…Ñ¥½¸€¬±”¤ì(€€€€€€€€€€€”¹‰¥¹‘	Õ™™•È¡”¹IIe}	UH°å”¤ì(€€€€€€€€€€€™½È€¡±•Ğ±”€ô€Àì±”€ğ€¹±½…Ñ¥½¹M¥é”ì±”¬¬¤ ¹±½…Ñ¥½¸€¬±”°”€¼€¹±½…Ñ¥½¹M¥é”° °Õ”°”€¨D°”€¼€¹±½…Ñ¥½¹M¥é”€¨±”€¨D°‘”¤ì(€€€€€€€€€ô(€€€€€€€ô•±Í”¥˜€¡<€„ôôÙ½¥€À¤ì(€€€€€€€€€½¹ÍĞÕ”€ô=mÑ•tì(€€€€€€€€€¥˜€¡Õ”€„ôôÙ½¥€À¤Íİ¥Ñ €¡Õ”¹±•¹Ñ ¤ì(€€€€€€€€€€€…Í”€Èè(€€€€€€€€€€€€€”¹Ù•ÉÑ•áÑÑÉ¥ˆÉ™Ø ¹±½…Ñ¥½¸°Õ”¤ì(€€€€€€€€€€€€€‰É•…¬ì(€€€€€€€€€€€…Í”€Ìè(€€€€€€€€€€€€€”¹Ù•ÉÑ•áÑÑÉ¥ˆÍ™Ø ¹±½…Ñ¥½¸°Õ”¤ì(€€€€€€€€€€€€€‰É•…¬ì(€€€€€€€€€€€…Í”€Ğè(€€€€€€€€€€€€€”¹Ù•ÉÑ•áÑÑÉ¥ˆÑ™Ø ¹±½…Ñ¥½¸°Õ”¤ì(€€€€€€€€€€€€€‰É•…¬ì(€€€€€€€€€€€‘•™…Õ±Ğè(€€€€€€€€€€€€€”¹Ù•ÉÑ•áÑÑÉ¥ˆÅ™Ø ¹±½…Ñ¥½¸°Õ”¤ì(€€€€€€€€€ô(€€€€€€€ô(€€€€€ô(€€€ô(€€€P ¤ì(€ô(€™Õ¹Ñ¥½¸ ¤ì(€€€ä ¤ì(€€€™½È€¡½¹ÍĞÜ¥¸¸¤ì(€€€€€½¹ÍĞ¬€ô¹mİtì(€€€€€™½È€¡½¹ÍĞ`¥¸¬¤ì(€€€€€€€½¹ÍĞÄ€ô­matì(€€€€€€€™½È€¡½¹ÍĞ¥¸Ä¤ì(€€€€€€€€€½¹ÍĞ,€ôÅmtì(€€€€€€€€€™½È€¡½¹ÍĞ<¥¸,¤(€€€€€€€€€€€ ¡-m=t¹½‰©•Ğ¤°‘•±•Ñ”-m=tì(€€€€€€€€€‘•±•Ñ”Åmtì(€€€€€€€ô(€€€€€ô(€€€€€‘•±•Ñ”¹mİtì(€€€ô(€ô(€™Õ¹Ñ¥½¸H¡Ü¤ì(€€€¥˜€¡¹mÜ¹¥‘t€ôôôÙ½¥€À¤É•ÑÕÉ¸ì(€€€½¹ÍĞ¬€ô¹mÜ¹¥‘tì(€€€™½È€¡½¹ÍĞ`¥¸¬¤ì(€€€€€½¹ÍĞÄ€ô­matì(€€€€€™½È€¡½¹ÍĞ¥¸Ä¤ì(€€€€€€€½¹ÍĞ,€ôÅmtì(€€€€€€€™½È€¡½¹ÍĞ<¥¸,¤(€€€€€€€€€ ¡-m=t¹½‰©•Ğ¤°‘•±•Ñ”-m=tì(€€€€€€€‘•±•Ñ”Åmtì(€€€€€ô(€€€ô(€€€‘•±•Ñ”¹mÜ¹¥‘tì(€ô(€™Õ¹Ñ¥½¸¡Ü¤ì(€€€™½È€¡½¹ÍĞ¬¥¸¸¤ì(€€€€€½¹ÍĞ`€ô¹m­tì(€€€€€™½È€¡½¹ÍĞÄ¥¸`¤ì(€€€€€€€½¹ÍĞ€ôamÅtì(€€€€€€€¥˜€¡mÜ¹¥‘t€ôôôÙ½¥€À¤½¹Ñ¥¹Õ”ì(€€€€€€€½¹ÍĞ,€ômÜ¹¥‘tì(€€€€€€€™½È€¡½¹ÍĞ<¥¸,¤(€€€€€€€€€ ¡-m=t¹½‰©•Ğ¤°‘•±•Ñ”-m=tì(€€€€€€€‘•±•Ñ”mÜ¹¥‘tì(€€€€€ô(€€€ô(€ô(€™Õ¹Ñ¥½¸œ¡Ü¤ì(€€€™½È€¡½¹ÍĞ¬¥¸¸¤ì(€€€€€½¹ÍĞ`€ô¹m­t°Ä€ôÜ¹¥Í%¹ÍÑ…¹•‘5•Í €ôôô€„À€üÜ¹¥€è€À°€ôamÅtì(€€€€€¥˜€¡€„ôôÙ½¥€À¤ì(€€€€€€€™½È€¡½¹ÍĞ,¥¸¤ì(€€€€€€€€€½¹ÍĞ<€ôm-tì(€€€€€€€€€™½È€¡½¹ÍĞÑ”¥¸<¤(€€€€€€€€€€€ ¡=mÑ•t¹½‰©•Ğ¤°‘•±•Ñ”=mÑ•tì(€€€€€€€€€‘•±•Ñ”m-tì(€€€€€€€ô(€€€€€€€‘•±•Ñ”amÅt°=‰©•Ğ¹­•åÌ¡`¤¹±•¹Ñ €ôôô€À€˜˜‘•±•Ñ”¹m­tì(€€€€€ô(€€€ô(€ô(€™Õ¹Ñ¥½¸ä ¤ì(€€€ ¤°„€ô€„À°Ì€„ôôÈ€˜˜€¡Ì€ôÈ°Œ¡Ì¹½‰©•Ğ¤¤ì(€ô(€™Õ¹Ñ¥½¸ ¤ì(€€€È¹•½µ•ÑÉä€ô¹Õ±°°È¹ÁÉ½É…´€ô¹Õ±°°È¹İ¥É•™É…µ”€ô€„Äì(€ô(€É•ÑÕÉ¸ì(€€€Í•ÑÕÀè¼°(€€€É•Í•Ğèä°(€€€É•Í•Ñ•™…Õ±ÑMÑ…Ñ”è°(€€€‘¥ÍÁ½Í”è°(€€€É•±•…Í•MÑ…Ñ•Í=™•½µ•ÑÉäèH°(€€€É•±•…Í•MÑ…Ñ•Í=™=‰©•Ğèœ°(€€€É•±•…Í•MÑ…Ñ•Í=™AÉ½É…´è°(€€€¥¹¥ÑÑÑÉ¥‰ÕÑ•Ìèˆ°(€€€•¹…‰±•ÑÑÉ¥‰ÕÑ”è´°(€€€‘¥Í…‰±•U¹ÕÍ•‘ÑÑÉ¥‰ÕÑ•ÌèP(€ôì)ô)™Õ¹Ñ¥½¸MÔ¡”°Ğ°¤¤ì(€±•Ğ¸ì(€™Õ¹Ñ¥½¸È¡°¤ì(€€€¸€ô°ì(€ô(€™Õ¹Ñ¥½¸Ì¡°°Œ¤ì(€€€”¹‘É…İÉÉ…åÌ¡¸°°°Œ¤°¤¹ÕÁ‘…Ñ”¡Œ°¸°€Ä¤ì(€ô(€™Õ¹Ñ¥½¸„¡°°Œ° ¤ì(€€€ €„ôô€À€˜˜€¡”¹‘É…İÉÉ…åÍ%¹ÍÑ…¹•¡¸°°°Œ° ¤°¤¹ÕÁ‘…Ñ”¡Œ°¸° ¤¤ì(€ô(€™Õ¹Ñ¥½¸¼¡°°Œ° ¤ì(€€€¥˜€¡ €ôôô€À¤É•ÑÕÉ¸ì(€€€Ğ¹•Ğ ‰]	1}µÕ±Ñ¥}‘É…Üˆ¤¹µÕ±Ñ¥É…İÉÉ…åÍ]	0¡¸°°°€À°Œ°€À° ¤ì(€€€±•Ğ€ô€Àì(€€€™½È€¡±•ĞÔ€ô€ÀìÔ€ğ ìÔ¬¬¤€¬ômÕtì(€€€¤¹ÕÁ‘…Ñ”¡°¸°€Ä¤ì(€ô(€Ñ¡¥Ì¹Í•Ñ5½‘”€ôÈ°Ñ¡¥Ì¹É•¹‘•È€ôÌ°Ñ¡¥Ì¹É•¹‘•É%¹ÍÑ…¹•Ì€ô„°Ñ¡¥Ì¹É•¹‘•É5Õ±Ñ¥É…Ü€ô¼ì)ô)™Õ¹Ñ¥½¸åÔ¡”°Ğ°¤°¸¤ì(€±•ĞÈì(€™Õ¹Ñ¥½¸Ì ¤ì(€€€¥˜€¡È€„ôôÙ½¥€À¤É•ÑÕÉ¸Èì(€€€¥˜€¡Ğ¹¡…Ì ‰aQ}Ñ•áÑÕÉ•}™¥±Ñ•É}…¹¥Í½ÑÉ½Á¥Œˆ¤€ôôô€„À¤ì(€€€€€½¹ÍĞ€ôĞ¹•Ğ ‰aQ}Ñ•áÑÕÉ•}™¥±Ñ•É}…¹¥Í½ÑÉ½Á¥Œˆ¤ì(€€€€€È€ô”¹•ÑA…É…µ•Ñ•È¡¹5a}QaQUI}5a}9%M=QI=Ae}aP¤ì(€€€ô•±Í”È€ô€Àì(€€€É•ÑÕÉ¸Èì(€ô(€™Õ¹Ñ¥½¸„¡¤ì(€€€É•ÑÕÉ¸€„¡€„ôô€ÄÀÈÌ€˜˜¸¹½¹Ù•ÉĞ¡¤€„ôô”¹•ÑA…É…µ•Ñ•È¡”¹%5A159QQ%=9}=1=I}I}=I5P¤¤ì(€ô(€™Õ¹Ñ¥½¸¼¡¤ì(€€€½¹ÍĞœ€ô€ôôô€ÄÀÄØ€˜˜€¡Ğ¹¡…Ì ‰aQ}½±½É}‰Õ™™•É}¡…±™}™±½…Ğˆ¤ñğĞ¹¡…Ì ‰aQ}½±½É}‰Õ™™•É}™±½…Ğˆ¤¤ì(€€€É•ÑÕÉ¸€„¡€„ôô€ÄÀÀä€˜˜¸¹½¹Ù•ÉĞ¡¤€„ôô”¹•ÑA…É…µ•Ñ•È¡”¹%5A159QQ%=9}=1=I}I}QeA¤€˜˜€„ôô€ÄÀÄÔ€˜˜€…œ¤ì(€ô(€™Õ¹Ñ¥½¸°¡¤ì(€€€¥˜€¡€ôôô€‰¡¥¡Àˆ¤ì(€€€€€¥˜€¡”¹•ÑM¡…‘•ÉAÉ•¥Í¥½¹½Éµ…Ğ¡”¹YIQa}M!H°”¹!%!}1=P¤¹ÁÉ•¥Í¥½¸€ø€À€˜˜”¹•ÑM¡…‘•ÉAÉ•¥Í¥½¹½Éµ…Ğ¡”¹I59Q}M!H°”¹!%!}1=P¤¹ÁÉ•¥Í¥½¸€ø€À¤É•ÑÕÉ¸€‰¡¥¡Àˆì(€€€€€€ô€‰µ•‘¥ÕµÀˆì(€€€ô(€€€É•ÑÕÉ¸€ôôô€‰µ•‘¥ÕµÀˆ€˜˜”¹•ÑM¡…‘•ÉAÉ•¥Í¥½¹½Éµ…Ğ¡”¹YIQa}M!H°”¹5%U5}1=P¤¹ÁÉ•¥Í¥½¸€ø€À€˜˜”¹•ÑM¡…‘•ÉAÉ•¥Í¥½¹½Éµ…Ğ¡”¹I59Q}M!H°”¹5%U5}1=P¤¹ÁÉ•¥Í¥½¸€ø€À€ü€‰µ•‘¥ÕµÀˆ€è€‰±½İÀˆì(€ô(€±•ĞŒ€ô¤¹ÁÉ•¥Í¥½¸€„ôôÙ½¥€À€ü¤¹ÁÉ•¥Í¥½¸€è€‰¡¥¡Àˆì(€½¹ÍĞ €ô°¡Œ¤ì(€ €„ôôŒ€˜˜€¡M” ‰]•‰1I•¹‘•É•Èèˆ°Œ°€‰¹½ĞÍÕÁÁ½ÉÑ•°ÕÍ¥¹œˆ° °€‰¥¹ÍÑ•…¸ˆ¤°Œ€ô ¤ì(€½¹ÍĞ€ô¤¹±½…É¥Ñ¡µ¥•ÁÑ¡	Õ™™•È€ôôô€„À°Ô€ô¤¹É•Ù•ÉÍ•‘•ÁÑ¡	Õ™™•È€ôôô€„À€˜˜Ğ¹¡…Ì ‰aQ}±¥Á}½¹ÑÉ½°ˆ¤ì(€¤¹É•Ù•ÉÍ•‘•ÁÑ¡	Õ™™•È€ôôô€„À€˜˜Ô€ôôô€„Ä€˜˜M” ‰]•‰1I•¹‘•É•ÈèU¹…‰±”Ñ¼ÕÍ”É•Ù•ÉÍ•‘•ÁÑ ‰Õ™™•È‘Õ”Ñ¼µ¥ÍÍ¥¹œaQ}±¥Á}½¹ÑÉ½°•áÑ•¹Í¥½¸¸…±±‰…¬Ñ¼‘•™…Õ±Ğ‘•ÁÑ ‰Õ™™•È¸ˆ¤ì(€½¹ÍĞÀ€ô”¹•ÑA…É…µ•Ñ•È¡”¹5a}QaQUI}%5}U9%QL¤°Ø€ô”¹•ÑA…É…µ•Ñ•È¡”¹5a}YIQa}QaQUI}%5}U9%QL¤°ˆ€ô”¹•ÑA…É…µ•Ñ•È¡”¹5a}QaQUI}M%i¤°´€ô”¹•ÑA…É…µ•Ñ•È¡”¹5a}U	}5A}QaQUI}M%i¤°˜€ô”¹•ÑA…É…µ•Ñ•È¡”¹5a}YIQa}QQI%	L¤°P€ô”¹•ÑA…É…µ•Ñ•È¡”¹5a}YIQa}U9%=I5}YQ=IL¤°€ô”¹•ÑA…É…µ•Ñ•È¡”¹5a}YIe%9}YQ=IL¤°4€ô”¹•ÑA…É…µ•Ñ•È¡”¹5a}I59Q}U9%=I5}YQ=IL¤°€ô”¹•ÑA…É…µ•Ñ•È¡”¹5a}M5A1L¤°H€ô”¹•ÑA…É…µ•Ñ•È¡”¹M5A1L¤ì(€É•ÑÕÉ¸ì(€€€¥Í]•‰0Èè€„À°(€€€•Ñ5…á¹¥Í½ÑÉ½ÁäèÌ°(€€€•Ñ5…áAÉ•¥Í¥½¸è°°(€€€Ñ•áÑÕÉ•½Éµ…ÑI•…‘…‰±”è„°(€€€Ñ•áÑÕÉ•QåÁ•I•…‘…‰±”è¼°(€€€ÁÉ•¥Í¥½¸èŒ°(€€€±½…É¥Ñ¡µ¥•ÁÑ¡	Õ™™•Èè°(€€€É•Ù•ÉÍ•‘•ÁÑ¡	Õ™™•ÈèÔ°(€€€µ…áQ•áÑÕÉ•ÌèÀ°(€€€µ…áY•ÉÑ•áQ•áÑÕÉ•ÌèØ°(€€€µ…áQ•áÑÕÉ•M¥é”èˆ°(€€€µ…áÕ‰•µ…ÁM¥é”è´°(€€€µ…áÑÑÉ¥‰ÕÑ•Ìè˜°(€€€µ…áY•ÉÑ•áU¹¥™½ÉµÌèP°(€€€µ…áY…Éå¥¹Ìè°(€€€µ…áÉ…µ•¹ÑU¹¥™½ÉµÌè4°(€€€µ…áM…µÁ±•Ìè°(€€€Í…µÁ±•ÌèH(€ôì)ô)™Õ¹Ñ¥½¸Ô¡”¤ì(€½¹ÍĞĞ€ôÑ¡¥Ìì(€±•Ğ¤€ô¹Õ±°°¸€ô€À°È€ô€„Ä°Ì€ô€„Äì(€½¹ÍĞ„€ô¹•Ü¤ ¤°¼€ô¹•Ü” ¤°°€ôì(€€€Ù…±Õ”è¹Õ±°°(€€€¹••‘ÍUÁ‘…Ñ”è€„Ä(€ôì(€Ñ¡¥Ì¹Õ¹¥™½É´€ô°°Ñ¡¥Ì¹¹ÕµA±…¹•Ì€ô€À°Ñ¡¥Ì¹¹Õµ%¹Ñ•ÉÍ•Ñ¥½¸€ô€À°Ñ¡¥Ì¹¥¹¥Ğ€ô™Õ¹Ñ¥½¸¡°Ô¤ì(€€€½¹ÍĞÀ€ô¹±•¹Ñ €„ôô€ÀñğÔñğ¸€„ôô€ÀñğÈì(€€€É•ÑÕÉ¸È€ôÔ°¸€ô¹±•¹Ñ °Àì(€ô°Ñ¡¥Ì¹‰•¥¹M¡…‘½İÌ€ô™Õ¹Ñ¥½¸ ¤ì(€€€Ì€ô€„À° ¡¹Õ±°¤ì(€ô°Ñ¡¥Ì¹•¹‘M¡…‘½İÌ€ô™Õ¹Ñ¥½¸ ¤ì(€€€Ì€ô€„Äì(€ô°Ñ¡¥Ì¹Í•Ñ±½‰…±MÑ…Ñ”€ô™Õ¹Ñ¥½¸¡°Ô¤ì(€€€¤€ô ¡°Ô°€À¤ì(€ô°Ñ¡¥Ì¹Í•ÑMÑ…Ñ”€ô™Õ¹Ñ¥½¸¡°Ô°À¤ì(€€€½¹ÍĞØ€ô¹±¥ÁÁ¥¹A±…¹•Ì°ˆ€ô¹±¥Á%¹Ñ•ÉÍ•Ñ¥½¸°´€ô¹±¥ÁM¡…‘½İÌ°˜€ô”¹•Ğ¡¤ì(€€€¥˜€ …ÈñğØ€ôôô¹Õ±°ñğØ¹±•¹Ñ €ôôô€ÀñğÌ€˜˜€…´¤Ì€ü ¡¹Õ±°¤€èŒ ¤ì(€€€•±Í”ì(€€€€€½¹ÍĞP€ôÌ€ü€À€è¸°€ôP€¨€Ğì(€€€€€±•Ğ4€ô˜¹±¥ÁÁ¥¹MÑ…Ñ”ñğ¹Õ±°ì(€€€€€°¹Ù…±Õ”€ô4°4€ô ¡Ø°Ô°°À¤ì(€€€€€™½È€¡±•Ğ€ô€Àì€„ôôì€¬­¤5mt€ô¥mtì(€€€€€˜¹±¥ÁÁ¥¹MÑ…Ñ”€ô4°Ñ¡¥Ì¹¹Õµ%¹Ñ•ÉÍ•Ñ¥½¸€ôˆ€üÑ¡¥Ì¹¹ÕµA±…¹•Ì€è€À°Ñ¡¥Ì¹¹ÕµA±…¹•Ì€¬ôPì(€€€ô(€ôì(€™Õ¹Ñ¥½¸Œ ¤ì(€€€°¹Ù…±Õ”€„ôô¤€˜˜€¡°¹Ù…±Õ”€ô¤°°¹¹••‘ÍUÁ‘…Ñ”€ô¸€ø€À¤°Ğ¹¹ÕµA±…¹•Ì€ô¸°Ğ¹¹Õµ%¹Ñ•ÉÍ•Ñ¥½¸€ô€Àì(€ô(€™Õ¹Ñ¥½¸ ¡°Ô°À°Ø¤ì(€€€½¹ÍĞˆ€ô€„ôô¹Õ±°€ü¹±•¹Ñ €è€Àì(€€€±•Ğ´€ô¹Õ±°ì(€€€¥˜€¡ˆ€„ôô€À¤ì(€€€€€¥˜€¡´€ô°¹Ù…±Õ”°Ø€„ôô€„Àñğ´€ôôô¹Õ±°¤ì(€€€€€€€½¹ÍĞ˜€ôÀ€¬ˆ€¨€Ğ°P€ôÔ¹µ…ÑÉ¥á]½É±‘%¹Ù•ÉÍ”ì(€€€€€€€¼¹•Ñ9½Éµ…±5…ÑÉ¥à¡P¤°€¡´€ôôô¹Õ±°ñğ´¹±•¹Ñ €ğ˜¤€˜˜€¡´€ô¹•Ü±½…ĞÌÉÉÉ…ä¡˜¤¤ì(€€€€€€€™½È€¡±•Ğ€ô€À°4€ôÀì€„ôôˆì€¬­°4€¬ô€Ğ¤(€€€€€€€€€„¹½Áä¡‘mt¤¹…ÁÁ±å5…ÑÉ¥àĞ¡P°¼¤°„¹¹½Éµ…°¹Ñ½ÉÉ…ä¡´°4¤°µm4€¬€Ít€ô„¹½¹ÍÑ…¹Ğì(€€€€€ô(€€€€€°¹Ù…±Õ”€ô´°°¹¹••‘ÍUÁ‘…Ñ”€ô€„Àì(€€€ô(€€€É•ÑÕÉ¸Ğ¹¹ÕµA±…¹•Ì€ôˆ°Ğ¹¹Õµ%¹Ñ•ÉÍ•Ñ¥½¸€ô€À°´ì(€ô)ô)Ù…È%¤€ô€Ğ°€‘„€ôl(€€À¸ÄÈÔ°(€€À¸ÈÄÔ°(€€À¸ÌÔ°(€€À¸ĞĞØ°(€€À¸ÔÈØ°(€€À¸ÔàÈ)t°Y¤€ô€ÈÀ°QÔ€ô€ÈÔØ°¸€ô€¼¨}}AUI}|€¨¼¹•Ü©È ¤°E„€ô€¼¨}}AUI}|€¨¼¹•Ü9” ¤°İÌ€ô¹Õ±°°Ì€ô€À°AÌ€ô€À°1Ì€ô€„Ä°Ô€ô€¼¨}}AUI}|€¨¼¹•Ü8 ¤°•¼€ô±…ÍÌì(€½¹ÍÑÉÕÑ½È¡”¤ì(€€€Ñ¡¥Ì¹}É•¹‘•É•È€ô”°Ñ¡¥Ì¹}Á¥¹A½¹I•¹‘•ÉQ…É•Ğ€ô¹Õ±°°Ñ¡¥Ì¹}±½‘5…à€ô€À°Ñ¡¥Ì¹}Õ‰•M¥é”€ô€À°Ñ¡¥Ì¹}Í¥é•1½‘Ì€ômt°Ñ¡¥Ì¹}Í¥µ…Ì€ômt°Ñ¡¥Ì¹}±½‘5•Í¡•Ì€ômt°Ñ¡¥Ì¹}‰…­É½Õ¹‘	½à€ô¹Õ±°°Ñ¡¥Ì¹}Õ‰•µ…Á5…Ñ•É¥…°€ô¹Õ±°°Ñ¡¥Ì¹}•ÅÕ¥É•Ñ5…Ñ•É¥…°€ô¹Õ±°°Ñ¡¥Ì¹}‰±ÕÉ5…Ñ•É¥…°€ô¹Õ±°°Ñ¡¥Ì¹}á5…Ñ•É¥…°€ô¹Õ±°ì(€ô(€™É½µM•¹”¡”°Ğ€ô€À°¤€ô€À¸Ä°¸€ô€ÄÀÀ°È€ôíô¤ì(€€€½¹ÍĞìÍ¥é”èÌ€ô€ÈÔØ°Á½Í¥Ñ¥½¸è„€ôÔô€ôÈì(€€€İÌ€ôÑ¡¥Ì¹}É•¹‘•É•È¹•ÑI•¹‘•ÉQ…É•Ğ ¤°Ì€ôÑ¡¥Ì¹}É•¹‘•É•È¹•ÑÑ¥Ù•Õ‰•…” ¤°AÌ€ôÑ¡¥Ì¹}É•¹‘•É•È¹•ÑÑ¥Ù•5¥Áµ…Á1•Ù•° ¤°1Ì€ôÑ¡¥Ì¹}É•¹‘•É•È¹áÈ¹•¹…‰±•°Ñ¡¥Ì¹}É•¹‘•É•È¹áÈ¹•¹…‰±•€ô€„Ä°Ñ¡¥Ì¹}Í•ÑM¥é”¡Ì¤ì(€€€½¹ÍĞ¼€ôÑ¡¥Ì¹}…±±½…Ñ•Q…É•ÑÌ ¤ì(€€€É•ÑÕÉ¸¼¹‘•ÁÑ¡	Õ™™•È€ô€„À°Ñ¡¥Ì¹}Í•¹•Q½Õ‰•UX¡”°¤°¸°¼°„¤°Ğ€ø€À€˜˜Ñ¡¥Ì¹}‰±ÕÈ¡¼°€À°€À°Ğ¤°Ñ¡¥Ì¹}…ÁÁ±åA5I4¡¼¤°Ñ¡¥Ì¹}±•…¹ÕÀ¡¼¤°¼ì(€ô(€™É½µÅÕ¥É•Ñ…¹Õ±…È¡”°Ğ€ô¹Õ±°¤ì(€€€É•ÑÕÉ¸Ñ¡¥Ì¹}™É½µQ•áÑÕÉ”¡”°Ğ¤ì(€ô(€™É½µÕ‰•µ…À¡”°Ğ€ô¹Õ±°¤ì(€€€É•ÑÕÉ¸Ñ¡¥Ì¹}™É½µQ•áÑÕÉ”¡”°Ğ¤ì(€ô(€½µÁ¥±•Õ‰•µ…ÁM¡…‘•È ¤ì(€€€Ñ¡¥Ì¹}Õ‰•µ…Á5…Ñ•É¥…°€ôôô¹Õ±°€˜˜€¡Ñ¡¥Ì¹}Õ‰•µ…Á5…Ñ•É¥…°€ô¹¼ ¤°Ñ¡¥Ì¹}½µÁ¥±•5…Ñ•É¥…°¡Ñ¡¥Ì¹}Õ‰•µ…Á5…Ñ•É¥…°¤¤ì(€ô(€½µÁ¥±•ÅÕ¥É•Ñ…¹Õ±…ÉM¡…‘•È ¤ì(€€€Ñ¡¥Ì¹}•ÅÕ¥É•Ñ5…Ñ•É¥…°€ôôô¹Õ±°€˜˜€¡Ñ¡¥Ì¹}•ÅÕ¥É•Ñ5…Ñ•É¥…°€ô¥¼ ¤°Ñ¡¥Ì¹}½µÁ¥±•5…Ñ•É¥…°¡Ñ¡¥Ì¹}•ÅÕ¥É•Ñ5…Ñ•É¥…°¤¤ì(€ô(€‘¥ÍÁ½Í” ¤ì(€€€Ñ¡¥Ì¹}‘¥ÍÁ½Í” ¤°Ñ¡¥Ì¹}Õ‰•µ…Á5…Ñ•É¥…°€„ôô¹Õ±°€˜˜Ñ¡¥Ì¹}Õ‰•µ…Á5…Ñ•É¥…°¹‘¥ÍÁ½Í” ¤°Ñ¡¥Ì¹}•ÅÕ¥É•Ñ5…Ñ•É¥…°€„ôô¹Õ±°€˜˜Ñ¡¥Ì¹}•ÅÕ¥É•Ñ5…Ñ•É¥…°¹‘¥ÍÁ½Í” ¤°Ñ¡¥Ì¹}‰…­É½Õ¹‘	½à€„ôô¹Õ±°€˜˜€¡Ñ¡¥Ì¹}‰…­É½Õ¹‘	½à¹•½µ•ÑÉä¹‘¥ÍÁ½Í” ¤°Ñ¡¥Ì¹}‰…­É½Õ¹‘	½à¹µ…Ñ•É¥…°¹‘¥ÍÁ½Í” ¤¤ì(€ô(€}Í•ÑM¥é”¡”¤ì(€€€Ñ¡¥Ì¹}±½‘5…à€ô5…Ñ ¹™±½½È¡5…Ñ ¹±½œÈ¡”¤¤°Ñ¡¥Ì¹}Õ‰•M¥é”€ô5…Ñ ¹Á½Ü È°Ñ¡¥Ì¹}±½‘5…à¤ì(€ô(€}‘¥ÍÁ½Í” ¤ì(€€€Ñ¡¥Ì¹}‰±ÕÉ5…Ñ•É¥…°€„ôô¹Õ±°€˜˜Ñ¡¥Ì¹}‰±ÕÉ5…Ñ•É¥…°¹‘¥ÍÁ½Í” ¤°Ñ¡¥Ì¹}á5…Ñ•É¥…°€„ôô¹Õ±°€˜˜Ñ¡¥Ì¹}á5…Ñ•É¥…°¹‘¥ÍÁ½Í” ¤°Ñ¡¥Ì¹}Á¥¹A½¹I•¹‘•ÉQ…É•Ğ€„ôô¹Õ±°€˜˜Ñ¡¥Ì¹}Á¥¹A½¹I•¹‘•ÉQ…É•Ğ¹‘¥ÍÁ½Í” ¤ì(€€€™½È€¡±•Ğ”€ô€Àì”€ğÑ¡¥Ì¹}±½‘5•Í¡•Ì¹±•¹Ñ ì”¬¬¤Ñ¡¥Ì¹}±½‘5•Í¡•Ím•t¹•½µ•ÑÉä¹‘¥ÍÁ½Í” ¤ì(€ô(€}±•…¹ÕÀ¡”¤ì(€€€Ñ¡¥Ì¹}É•¹‘•É•È¹Í•ÑI•¹‘•ÉQ…É•Ğ¡İÌ°Ì°AÌ¤°Ñ¡¥Ì¹}É•¹‘•É•È¹áÈ¹•¹…‰±•€ô1Ì°”¹Í¥ÍÍ½ÉQ•ÍĞ€ô€„Ä°¡¸¡”°€À°€À°”¹İ¥‘Ñ °”¹¡•¥¡Ğ¤ì(€ô(€}™É½µQ•áÑÕÉ”¡”°Ğ¤ì(€€€”¹µ…ÁÁ¥¹œ€ôôô€ÌÀÄñğ”¹µ…ÁÁ¥¹œ€ôôô€ÌÀÈ€üÑ¡¥Ì¹}Í•ÑM¥é”¡”¹¥µ…”¹±•¹Ñ €ôôô€À€ü€ÄØ€è”¹¥µ…•lÁt¹İ¥‘Ñ ñğ”¹¥µ…•lÁt¹¥µ…”¹İ¥‘Ñ ¤€èÑ¡¥Ì¹}Í•ÑM¥é”¡”¹¥µ…”¹İ¥‘Ñ €¼€Ğ¤°İÌ€ôÑ¡¥Ì¹}É•¹‘•É•È¹•ÑI•¹‘•ÉQ…É•Ğ ¤°Ì€ôÑ¡¥Ì¹}É•¹‘•É•È¹•ÑÑ¥Ù•Õ‰•…” ¤°AÌ€ôÑ¡¥Ì¹}É•¹‘•É•È¹•ÑÑ¥Ù•5¥Áµ…Á1•Ù•° ¤°1Ì€ôÑ¡¥Ì¹}É•¹‘•É•È¹áÈ¹•¹…‰±•°Ñ¡¥Ì¹}É•¹‘•É•È¹áÈ¹•¹…‰±•€ô€„Äì(€€€½¹ÍĞ¤€ôĞñğÑ¡¥Ì¹}…±±½…Ñ•Q…É•ÑÌ ¤ì(€€€É•ÑÕÉ¸Ñ¡¥Ì¹}Ñ•áÑÕÉ•Q½Õ‰•UX¡”°¤¤°Ñ¡¥Ì¹}…ÁÁ±åA5I4¡¤¤°Ñ¡¥Ì¹}±•…¹ÕÀ¡¤¤°¤ì(€ô(€}…±±½…Ñ•Q…É•ÑÌ ¤ì(€€€½¹ÍĞ”€ô€Ì€¨5…Ñ ¹µ…à¡Ñ¡¥Ì¹}Õ‰•M¥é”°€ÄÄÈ¤°Ğ€ô€Ğ€¨Ñ¡¥Ì¹}Õ‰•M¥é”°¤€ôì(€€€€€µ…¥±Ñ•Èè%Ğ°(€€€€€µ¥¹¥±Ñ•Èè%Ğ°(€€€€€•¹•É…Ñ•5¥Áµ…ÁÌè€„Ä°(€€€€€ÑåÁ”èa¤°(€€€€€™½Éµ…ĞèÙ¸°(€€€€€½±½ÉMÁ…”èiĞ°(€€€€€‘•ÁÑ¡	Õ™™•Èè€„Ä(€€€ô°¸€ôÑ¼¡”°Ğ°¤¤ì(€€€¥˜€¡Ñ¡¥Ì¹}Á¥¹A½¹I•¹‘•ÉQ…É•Ğ€ôôô¹Õ±°ñğÑ¡¥Ì¹}Á¥¹A½¹I•¹‘•ÉQ…É•Ğ¹İ¥‘Ñ €„ôô”ñğÑ¡¥Ì¹}Á¥¹A½¹I•¹‘•ÉQ…É•Ğ¹¡•¥¡Ğ€„ôôĞ¤ì(€€€€€Ñ¡¥Ì¹}Á¥¹A½¹I•¹‘•ÉQ…É•Ğ€„ôô¹Õ±°€˜˜Ñ¡¥Ì¹}‘¥ÍÁ½Í” ¤°Ñ¡¥Ì¹}Á¥¹A½¹I•¹‘•ÉQ…É•Ğ€ôÑ¼¡”°Ğ°¤¤ì(€€€€€½¹ÍĞì}±½‘5…àèÈô€ôÑ¡¥Ìì(€€€€€€¡ì±½‘5•Í¡•ÌèÑ¡¥Ì¹}±½‘5•Í¡•Ì°Í¥é•1½‘ÌèÑ¡¥Ì¹}Í¥é•1½‘Ì°Í¥µ…ÌèÑ¡¥Ì¹}Í¥µ…Ìô€ôIÔ¡È¤¤°Ñ¡¥Ì¹}‰±ÕÉ5…Ñ•É¥…°€ôÔ¡È°”°Ğ¤°Ñ¡¥Ì¹}á5…Ñ•É¥…°€ôİÔ¡È°”°Ğ¤ì(€€€ô(€€€É•ÑÕÉ¸¸ì(€ô(€}½µÁ¥±•5…Ñ•É¥…°¡”¤ì(€€€½¹ÍĞĞ€ô¹•ÜĞ¡¹•ÜEĞ ¤°”¤ì(€€€Ñ¡¥Ì¹}É•¹‘•É•È¹½µÁ¥±”¡Ğ°¸¤ì(€ô(€}Í•¹•Q½Õ‰•UX¡”°Ğ°¤°¸°È¤ì(€€€½¹ÍĞÌ€ô¹•ÜĞ äÀ°€Ä°Ğ°¤¤°„€ôl(€€€€€€Ä°(€€€€€€´Ä°(€€€€€€Ä°(€€€€€€Ä°(€€€€€€Ä°(€€€€€€Ä(€€€t°¼€ôl(€€€€€€Ä°(€€€€€€Ä°(€€€€€€Ä°(€€€€€€´Ä°(€€€€€€´Ä°(€€€€€€´Ä(€€€t°°€ôÑ¡¥Ì¹}É•¹‘•É•È°Œ€ô°¹…ÕÑ½±•…È° €ô°¹Ñ½¹•5…ÁÁ¥¹œì(€€€°¹•Ñ±•…É½±½È¡E„¤°°¹Ñ½¹•5…ÁÁ¥¹œ€ô€À°°¹…ÕÑ½±•…È€ô€„Ä°°¹ÍÑ…Ñ”¹‰Õ™™•ÉÌ¹‘•ÁÑ ¹•ÑI•Ù•ÉÍ• ¤€˜˜€¡°¹Í•ÑI•¹‘•ÉQ…É•Ğ¡¸¤°°¹±•…É•ÁÑ  ¤°°¹Í•ÑI•¹‘•ÉQ…É•Ğ¡¹Õ±°¤¤°Ñ¡¥Ì¹}‰…­É½Õ¹‘	½à€ôôô¹Õ±°€˜˜€¡Ñ¡¥Ì¹}‰…­É½Õ¹‘	½à€ô¹•ÜĞ¡¹•Ü)Ì ¤°¹•Ü]¤¡ì(€€€€€¹…µ”è€‰A5I4¹	…­É½Õ¹ˆ°(€€€€€Í¥‘”è€Ä°(€€€€€‘•ÁÑ¡]É¥Ñ”è€„Ä°(€€€€€‘•ÁÑ¡Q•ÍĞè€„Ä(€€€ô¤¤¤ì(€€€½¹ÍĞ€ôÑ¡¥Ì¹}‰…­É½Õ¹‘	½à°Ô€ô¹µ…Ñ•É¥…°ì(€€€±•ĞÀ€ô€„Äì(€€€½¹ÍĞØ€ô”¹‰…­É½Õ¹ì(€€€Ø€üØ¹¥Í½±½È€˜˜€¡Ô¹½±½È¹½Áä¡Ø¤°”¹‰…­É½Õ¹€ô¹Õ±°°À€ô€„À¤€è€¡Ô¹½±½È¹½Áä¡E„¤°À€ô€„À¤ì(€€€™½È€¡±•Ğˆ€ô€Àìˆ€ğ€Øìˆ¬¬¤ì(€€€€€½¹ÍĞ´€ôˆ€”€Ìì(€€€€€´€ôôô€À€ü€¡Ì¹ÕÀ¹Í•Ğ À°…m‰t°€À¤°Ì¹Á½Í¥Ñ¥½¸¹Í•Ğ¡È¹à°È¹ä°È¹è¤°Ì¹±½½­Ğ¡È¹à€¬½m‰t°È¹ä°È¹è¤¤€è´€ôôô€Ä€ü€¡Ì¹ÕÀ¹Í•Ğ À°€À°…m‰t¤°Ì¹Á½Í¥Ñ¥½¸¹Í•Ğ¡È¹à°È¹ä°È¹è¤°Ì¹±½½­Ğ¡È¹à°È¹ä€¬½m‰t°È¹è¤¤€è€¡Ì¹ÕÀ¹Í•Ğ À°…m‰t°€À¤°Ì¹Á½Í¥Ñ¥½¸¹Í•Ğ¡È¹à°È¹ä°È¹è¤°Ì¹±½½­Ğ¡È¹à°È¹ä°È¹è€¬½m‰t¤¤ì(€€€€€½¹ÍĞ˜€ôÑ¡¥Ì¹}Õ‰•M¥é”ì(€€€€€¡¸¡¸°´€¨˜°ˆ€ø€È€ü˜€è€À°˜°˜¤°°¹Í•ÑI•¹‘•ÉQ…É•Ğ¡¸¤°À€˜˜°¹É•¹‘•È¡°Ì¤°°¹É•¹‘•È¡”°Ì¤ì(€€€ô(€€€°¹Ñ½¹•5…ÁÁ¥¹œ€ô °°¹…ÕÑ½±•…È€ôŒ°”¹‰…­É½Õ¹€ôØì(€ô(€}Ñ•áÑÕÉ•Q½Õ‰•UX¡”°Ğ¤ì(€€€½¹ÍĞ¤€ôÑ¡¥Ì¹}É•¹‘•É•È°¸€ô”¹µ…ÁÁ¥¹œ€ôôô€ÌÀÄñğ”¹µ…ÁÁ¥¹œ€ôôô€ÌÀÈì(€€€¸€ü€¡Ñ¡¥Ì¹}Õ‰•µ…Á5…Ñ•É¥…°€ôôô¹Õ±°€˜˜€¡Ñ¡¥Ì¹}Õ‰•µ…Á5…Ñ•É¥…°€ô¹¼ ¤¤°Ñ¡¥Ì¹}Õ‰•µ…Á5…Ñ•É¥…°¹Õ¹¥™½ÉµÌ¹™±¥Á¹Ù5…À¹Ù…±Õ”€ô”¹¥ÍI•¹‘•ÉQ…É•ÑQ•áÑÕÉ”€ôôô€„Ä€ü€´Ä€è€Ä¤€èÑ¡¥Ì¹}•ÅÕ¥É•Ñ5…Ñ•É¥…°€ôôô¹Õ±°€˜˜€¡Ñ¡¥Ì¹}•ÅÕ¥É•Ñ5…Ñ•É¥…°€ô¥¼ ¤¤ì(€€€½¹ÍĞÈ€ô¸€üÑ¡¥Ì¹}Õ‰•µ…Á5…Ñ•É¥…°€èÑ¡¥Ì¹}•ÅÕ¥É•Ñ5…Ñ•É¥…°°Ì€ôÑ¡¥Ì¹}±½‘5•Í¡•ÍlÁtì(€€€Ì¹µ…Ñ•É¥…°€ôÈì(€€€½¹ÍĞ„€ôÈ¹Õ¹¥™½ÉµÌì(€€€„¹•¹Ù5…À¹Ù…±Õ”€ô”ì(€€€½¹ÍĞ¼€ôÑ¡¥Ì¹}Õ‰•M¥é”ì(€€€¡¸¡Ğ°€À°€À°€Ì€¨¼°€È€¨¼¤°¤¹Í•ÑI•¹‘•ÉQ…É•Ğ¡Ğ¤°¤¹É•¹‘•È¡Ì°¸¤ì(€ô(€}…ÁÁ±åA5I4¡”¤ì(€€€½¹ÍĞĞ€ôÑ¡¥Ì¹}É•¹‘•É•È°¤€ôĞ¹…ÕÑ½±•…Èì(€€€Ğ¹…ÕÑ½±•…È€ô€„Äì(€€€½¹ÍĞ¸€ôÑ¡¥Ì¹}±½‘5•Í¡•Ì¹±•¹Ñ ì(€€€™½È€¡±•ĞÈ€ô€ÄìÈ€ğ¸ìÈ¬¬¤Ñ¡¥Ì¹}…ÁÁ±åa¥±Ñ•È¡”°È€´€Ä°È¤ì(€€€Ğ¹…ÕÑ½±•…È€ô¤ì(€ô(€}…ÁÁ±åa¥±Ñ•È¡”°Ğ°¤¤ì(€€€½¹ÍĞ¸€ôÑ¡¥Ì¹}É•¹‘•É•È°È€ôÑ¡¥Ì¹}Á¥¹A½¹I•¹‘•ÉQ…É•Ğ°Ì€ôÑ¡¥Ì¹}á5…Ñ•É¥…°°„€ôÑ¡¥Ì¹}±½‘5•Í¡•Ím¥tì(€€€„¹µ…Ñ•É¥…°€ôÌì(€€€½¹ÍĞ¼€ôÌ¹Õ¹¥™½ÉµÌ°°€ô¤€¼€¡Ñ¡¥Ì¹}±½‘5•Í¡•Ì¹±•¹Ñ €´€Ä¤°Œ€ôĞ€¼€¡Ñ¡¥Ì¹}±½‘5•Í¡•Ì¹±•¹Ñ €´€Ä¤° €ô5…Ñ ¹ÍÅÉĞ¡°€¨°€´Œ€¨Œ¤€¨€ À€¬°€¨€Ä¸ÈÔ¤°ì}±½‘5…àèô€ôÑ¡¥Ì°Ô€ôÑ¡¥Ì¹}Í¥é•1½‘Ím¥t°À€ô€Ì€¨Ô€¨€¡¤€ø€´%¤€ü¤€´€¬%¤€è€À¤°Ø€ô€Ğ€¨€¡Ñ¡¥Ì¹}Õ‰•M¥é”€´Ô¤ì(€€€¼¹•¹Ù5…À¹Ù…±Õ”€ô”¹Ñ•áÑÕÉ”°¼¹É½Õ¡¹•ÍÌ¹Ù…±Õ”€ô °¼¹µ¥Á%¹Ğ¹Ù…±Õ”€ô€´Ğ°¡¸¡È°À°Ø°€Ì€¨Ô°€È€¨Ô¤°¸¹Í•ÑI•¹‘•ÉQ…É•Ğ¡È¤°¸¹É•¹‘•È¡„°¸¤°¼¹•¹Ù5…À¹Ù…±Õ”€ôÈ¹Ñ•áÑÕÉ”°¼¹É½Õ¡¹•ÍÌ¹Ù…±Õ”€ô€À°¼¹µ¥Á%¹Ğ¹Ù…±Õ”€ô€´¤°¡¸¡”°À°Ø°€Ì€¨Ô°€È€¨Ô¤°¸¹Í•ÑI•¹‘•ÉQ…É•Ğ¡”¤°¸¹É•¹‘•È¡„°¸¤ì(€ô(€}‰±ÕÈ¡”°Ğ°¤°¸°È¤ì(€€€½¹ÍĞÌ€ôÑ¡¥Ì¹}Á¥¹A½¹I•¹‘•ÉQ…É•Ğì(€€€Ñ¡¥Ì¹}¡…±™	±ÕÈ¡”°Ì°Ğ°¤°¸°€‰±…Ñ¥ÑÕ‘¥¹…°ˆ°È¤°Ñ¡¥Ì¹}¡…±™	±ÕÈ¡Ì°”°¤°¤°¸°€‰±½¹¥ÑÕ‘¥¹…°ˆ°È¤ì(€ô(€}¡…±™	±ÕÈ¡”°Ğ°¤°¸°È°Ì°„¤ì(€€€½¹ÍĞ¼€ôÑ¡¥Ì¹}É•¹‘•É•È°°€ôÑ¡¥Ì¹}‰±ÕÉ5…Ñ•É¥…°ì(€€€Ì€„ôô€‰±…Ñ¥ÑÕ‘¥¹…°ˆ€˜˜Ì€„ôô€‰±½¹¥ÑÕ‘¥¹…°ˆ€˜˜1” ‰‰±ÕÈ‘¥É•Ñ¥½¸µÕÍĞ‰”•¥Ñ¡•È±…Ñ¥ÑÕ‘¥¹…°½È±½¹¥ÑÕ‘¥¹…°„ˆ¤ì(€€€½¹ÍĞŒ€ô€Ì° €ôÑ¡¥Ì¹}±½‘5•Í¡•Ím¹tì(€€€ ¹µ…Ñ•É¥…°€ô°ì(€€€½¹ÍĞ€ô°¹Õ¹¥™½ÉµÌ°Ô€ôÑ¡¥Ì¹}Í¥é•1½‘Ím¥t€´€Ä°À€ô¥Í¥¹¥Ñ”¡È¤€ü5…Ñ ¹A$€¼€ È€¨Ô¤€è€È€¨5…Ñ ¹A$€¼€ È€¨Y¤€´€Ä¤°Ø€ôÈ€¼À°ˆ€ô¥Í¥¹¥Ñ”¡È¤€ü€Ä€¬5…Ñ ¹™±½½È¡Œ€¨Ø¤€èY¤ì(€€€ˆ€øY¤€˜˜M”¡Í¥µ…I…‘¥…¹Ì°€‘íÉô°¥ÌÑ½¼±…É”…¹İ¥±°±¥À°…Ì¥ĞÉ•ÅÕ•ÍÑ•€‘í‰ôÍ…µÁ±•Ìİ¡•¸Ñ¡”µ…á¥µÕ´¥ÌÍ•ĞÑ¼€‘íY¥õ€¤ì(€€€½¹ÍĞ´€ômtì(€€€±•Ğ˜€ô€Àì(€€€™½È€¡±•Ğ4€ô€Àì4€ğY¤ì€¬­4¤ì(€€€€€½¹ÍĞ€ô4€¼Ø°H€ô5…Ñ ¹•áÀ µ€¨€¼€È¤ì(€€€€€´¹ÁÕÍ ¡H¤°4€ôôô€À€ü˜€¬ôH€è4€ğˆ€˜˜€¡˜€¬ô€È€¨H¤ì(€€€ô(€€€™½È€¡±•Ğ4€ô€Àì4€ğ´¹±•¹Ñ ì4¬¬¤µm5t€ôµm5t€¼˜ì(€€€¹•¹Ù5…À¹Ù…±Õ”€ô”¹Ñ•áÑÕÉ”°¹Í…µÁ±•Ì¹Ù…±Õ”€ôˆ°¹İ•¥¡ÑÌ¹Ù…±Õ”€ô´°¹±…Ñ¥ÑÕ‘¥¹…°¹Ù…±Õ”€ôÌ€ôôô€‰±…Ñ¥ÑÕ‘¥¹…°ˆ°„€˜˜€¡¹Á½±•á¥Ì¹Ù…±Õ”€ô„¤ì(€€€½¹ÍĞì}±½‘5…àèPô€ôÑ¡¥Ìì(€€€¹‘Q¡•Ñ„¹Ù…±Õ”€ôÀ°¹µ¥Á%¹Ğ¹Ù…±Õ”€ôP€´¤ì(€€€½¹ÍĞ€ôÑ¡¥Ì¹}Í¥é•1½‘Ím¹tì(€€€¡¸¡Ğ°€Ì€¨€¨€¡¸€øP€´%¤€ü¸€´P€¬%¤€è€À¤°€Ğ€¨€¡Ñ¡¥Ì¹}Õ‰•M¥é”€´¤°€Ì€¨°€È€¨¤°¼¹Í•ÑI•¹‘•ÉQ…É•Ğ¡Ğ¤°¼¹É•¹‘•È¡ °¸¤ì(€ô)ôì)™Õ¹Ñ¥½¸IÔ¡”¤ì(€½¹ÍĞĞ€ômt°¤€ômt°¸€ômtì(€±•ĞÈ€ô”ì(€½¹ÍĞÌ€ô”€´%¤€¬€Ä€¬€‘„¹±•¹Ñ ì(€™½È€¡±•Ğ„€ô€Àì„€ğÌì„¬¬¤ì(€€€½¹ÍĞ¼€ô5…Ñ ¹Á½Ü È°È¤ì(€€€Ğ¹ÁÕÍ ¡¼¤ì(€€€±•Ğ°€ô€Ä€¼¼ì(€€€„€ø”€´%¤€ü°€ô€‘…m„€´”€¬%¤€´€Åt€è„€ôôô€À€˜˜€¡°€ô€À¤°¤¹ÁÕÍ ¡°¤ì(€€€½¹ÍĞŒ€ô€Ä€¼€¡¼€´€È¤° €ô€µŒ°€ô€Ä€¬Œ°Ô€ôl(€€€€€ °(€€€€€ °(€€€€€°(€€€€€ °(€€€€€°(€€€€€°(€€€€€ °(€€€€€ °(€€€€€°(€€€€€°(€€€€€ °(€€€€€(€€€t°À€ô€Ø°Ø€ô€Ø°ˆ€ô€Ì°´€ô€È°˜€ô€Ä°P€ô¹•Ü±½…ĞÌÉÉÉ…ä¡ˆ€¨Ø€¨À¤°€ô¹•Ü±½…ĞÌÉÉÉ…ä¡´€¨Ø€¨À¤°4€ô¹•Ü±½…ĞÌÉÉÉ…ä¡˜€¨Ø€¨À¤ì(€€€™½È€¡±•ĞH€ô€ÀìH€ğÀìH¬¬¤ì(€€€€€½¹ÍĞ€ôH€”€Ì€¨€È€¼€Ì€´€Ä°œ€ôH€ø€È€ü€À€è€´Ä°ä€ôl(€€€€€€€°(€€€€€€€œ°(€€€€€€€€À°(€€€€€€€€¬€È€¼€Ì°(€€€€€€€œ°(€€€€€€€€À°(€€€€€€€€¬€È€¼€Ì°(€€€€€€€œ€¬€Ä°(€€€€€€€€À°(€€€€€€€°(€€€€€€€œ°(€€€€€€€€À°(€€€€€€€€¬€È€¼€Ì°(€€€€€€€œ€¬€Ä°(€€€€€€€€À°(€€€€€€€°(€€€€€€€œ€¬€Ä°(€€€€€€€€À(€€€€€tì(€€€€€P¹Í•Ğ¡ä°ˆ€¨Ø€¨H¤°¹Í•Ğ¡Ô°´€¨Ø€¨H¤ì(€€€€€½¹ÍĞ€ôl(€€€€€€€H°(€€€€€€€H°(€€€€€€€H°(€€€€€€€H°(€€€€€€€H°(€€€€€€€H(€€€€€tì(€€€€€4¹Í•Ğ¡°˜€¨Ø€¨H¤ì(€€€ô(€€€½¹ÍĞ€ô¹•ÜEĞ ¤ì(€€€¹Í•ÑÑÑÉ¥‰ÕÑ” ‰Á½Í¥Ñ¥½¸ˆ°¹•ÜAĞ¡P°ˆ¤¤°¹Í•ÑÑÑÉ¥‰ÕÑ” ‰ÕØˆ°¹•ÜAĞ¡°´¤¤°¹Í•ÑÑÑÉ¥‰ÕÑ” ‰™…•%¹‘•àˆ°¹•ÜAĞ¡4°˜¤¤°¸¹ÁÕÍ ¡¹•ÜĞ¡°¹Õ±°¤¤°È€ø%¤€˜˜È´´ì(€ô(€É•ÑÕÉ¸ì(€€€±½‘5•Í¡•Ìè¸°(€€€Í¥é•1½‘ÌèĞ°(€€€Í¥µ…Ìè¤(€ôì)ô)™Õ¹Ñ¥½¸Ñ¼¡”°Ğ°¤¤ì(€½¹ÍĞ¸€ô¹•Ü±¤¡”°Ğ°¤¤ì(€É•ÑÕÉ¸¸¹Ñ•áÑÕÉ”¹µ…ÁÁ¥¹œ€ô€ÌÀØ°¸¹Ñ•áÑÕÉ”¹¹…µ”€ô€‰A5I4¹Õ‰•UØˆ°¸¹Í¥ÍÍ½ÉQ•ÍĞ€ô€„À°¸ì)ô)™Õ¹Ñ¥½¸¡¸¡”°Ğ°¤°¸°È¤ì(€”¹Ù¥•İÁ½ÉĞ¹Í•Ğ¡Ğ°¤°¸°È¤°”¹Í¥ÍÍ½È¹Í•Ğ¡Ğ°¤°¸°È¤ì)ô)™Õ¹Ñ¥½¸İÔ¡”°Ğ°¤¤ì(€É•ÑÕÉ¸¹•Ü¡¤¡ì(€€€¹…µ”è€‰A5I5a½¹Ù½±ÕÑ¥½¸ˆ°(€€€‘•™¥¹•Ìèì(€€€€€a}M5A1LèQÔ°(€€€€€U	UY}Qa1}]%Q è€Ä€¼Ğ°(€€€€€U	UY}Qa1}!%!Pè€Ä€¼¤°(€€€€€U	UY}5a}5%@è€‘í•ô¸Á€(€€€ô°(€€€Õ¹¥™½ÉµÌèì(€€€€€•¹Ù5…ÀèìÙ…±Õ”è¹Õ±°ô°(€€€€€É½Õ¡¹•ÍÌèìÙ…±Õ”è€Àô°(€€€€€µ¥Á%¹ĞèìÙ…±Õ”è€Àô(€€€ô°(€€€Ù•ÉÑ•áM¡…‘•ÈèeÈ ¤°(€€€™É…µ•¹ÑM¡…‘•Èè€(($$%ÁÉ•¥Í¥½¸¡¥¡À™±½…Ğì($$%ÁÉ•¥Í¥½¸¡¥¡À¥¹Ğì(($$%Ù…Éå¥¹œÙ•ŒÌÙ=ÕÑÁÕÑ¥É•Ñ¥½¸ì(($$%Õ¹¥™½É´Í…µÁ±•ÈÉ•¹Ù5…Àì($$%Õ¹¥™½É´™±½…ĞÉ½Õ¡¹•ÍÌì($$%Õ¹¥™½É´™±½…Ğµ¥Á%¹Ğì(($$$‘•™¥¹”9Y5A}QeA}U	}UX($$$¥¹±Õ‘”€ñÕ‰•}ÕÙ}É•™±•Ñ¥½¹}™É…µ•¹Ğø(($$$‘•™¥¹”A$€Ì¸ÄĞÄÔäÈØÔÌÔä(($$$¼¼Y…¸‘•È½ÉÁÕĞÉ…‘¥…°¥¹Ù•ÉÍ”($$%™±½…ĞÉ…‘¥…±%¹Ù•ÉÍ•}Y‘¡Õ¥¹Ğ‰¥ÑÌ¤ì($$$%‰¥ÑÌ€ô€¡‰¥ÑÌ€ğğ€ÄÙÔ¤ğ€¡‰¥ÑÌ€øø€ÄÙÔ¤ì($$$%‰¥ÑÌ€ô€ ¡‰¥ÑÌ€˜€ÁàÔÔÔÔÔÔÔÕÔ¤€ğğ€ÅÔ¤ğ€ ¡‰¥ÑÌ€˜€ÁáÔ¤€øø€ÅÔ¤ì($$$%‰¥ÑÌ€ô€ ¡‰¥ÑÌ€˜€ÁàÌÌÌÌÌÌÌÍÔ¤€ğğ€ÉÔ¤ğ€ ¡‰¥ÑÌ€˜€ÁáÔ¤€øø€ÉÔ¤ì($$$%‰¥ÑÌ€ô€ ¡‰¥ÑÌ€˜€ÁàÁÁÁÁÔ¤€ğğ€ÑÔ¤ğ€ ¡‰¥ÑÌ€˜€ÁáÁÁÁÁÔ¤€øø€ÑÔ¤ì($$$%‰¥ÑÌ€ô€ ¡‰¥ÑÌ€˜€ÁàÀÁÀÁÔ¤€ğğ€áÔ¤ğ€ ¡‰¥ÑÌ€˜€ÁáÀÁÀÁÔ¤€øø€áÔ¤ì($$$%É•ÑÕÉ¸™±½…Ğ¡‰¥ÑÌ¤€¨€È¸ÌÈàÌÀØĞÌØÔÌàØäØÍ”´ÄÀì€¼¼€¼€ÁàÄÀÀÀÀÀÀÀÀ($$%ô(($$$¼¼!…µµ•ÉÍ±•äÍ•ÅÕ•¹”($$%Ù•ŒÈ¡…µµ•ÉÍ±•ä¡Õ¥¹Ğ¤°Õ¥¹Ğ8¤ì($$$%É•ÑÕÉ¸Ù•ŒÈ¡™±½…Ğ¡¤¤€¼™±½…Ğ¡8¤°É…‘¥…±%¹Ù•ÉÍ•}Y‘¡¤¤¤ì($$%ô(($$$¼¼`Y9¥µÁ½ÉÑ…¹”Í…µÁ±¥¹œ€¡É¥Œ!•¥Ñè€ÈÀÄà¤($$$¼¼€‰M…µÁ±¥¹œÑ¡”`¥ÍÑÉ¥‰ÕÑ¥½¸½˜Y¥Í¥‰±”9½Éµ…±Ìˆ($$$¼¼¡ÑÑÁÌè¼½©Ğ¹½Éœ½ÁÕ‰±¥Í¡•¼ÀÀÀÜ¼ÀĞ¼ÀÄ¼($$%Ù•ŒÌ¥µÁ½ÉÑ…¹•M…µÁ±•a}Y9¡Ù•ŒÈa¤°Ù•ŒÌX°™±½…ĞÉ½Õ¡¹•ÍÌ¤ì($$$%™±½…Ğ…±Á¡„€ôÉ½Õ¡¹•ÍÌ€¨É½Õ¡¹•ÍÌì(($$$$¼¼M•Ñ¥½¸€Ğ¸Äè=ÉÑ¡½¹½Éµ…°‰…Í¥Ì($$$%Ù•ŒÌPÄ€ôÙ•ŒÌ Ä¸À°€À¸À°€À¸À¤ì($$$%Ù•ŒÌPÈ€ôÉ½ÍÌ¡X°PÄ¤ì(($$$$¼¼M•Ñ¥½¸€Ğ¸ÈèA…É…µ•Ñ•É¥é…Ñ¥½¸½˜ÁÉ½©•Ñ•…É•„($$$%™±½…ĞÈ€ôÍÅÉĞ¡a¤¹à¤ì($$$%™±½…ĞÁ¡¤€ô€È¸À€¨A$€¨a¤¹äì($$$%™±½…ĞĞÄ€ôÈ€¨½Ì¡Á¡¤¤ì($$$%™±½…ĞĞÈ€ôÈ€¨Í¥¸¡Á¡¤¤ì($$$%™±½…ĞÌ€ô€À¸Ô€¨€ Ä¸À€¬X¹è¤ì($$$%ĞÈ€ô€ Ä¸À€´Ì¤€¨ÍÅÉĞ Ä¸À€´ĞÄ€¨ĞÄ¤€¬Ì€¨ĞÈì(($$$$¼¼M•Ñ¥½¸€Ğ¸ÌèI•ÁÉ½©•Ñ¥½¸½¹Ñ¼¡•µ¥ÍÁ¡•É”($$$%Ù•ŒÌ9 €ôĞÄ€¨PÄ€¬ĞÈ€¨PÈ€¬ÍÅÉĞ¡µ…à À¸À°€Ä¸À€´ĞÄ€¨ĞÄ€´ĞÈ€¨ĞÈ¤¤€¨Xì(($$$$¼¼M•Ñ¥½¸€Ì¸ĞèQÉ…¹Í™½É´‰…¬Ñ¼•±±¥ÁÍ½¥½¹™¥ÕÉ…Ñ¥½¸($$$%É•ÑÕÉ¸¹½Éµ…±¥é”¡Ù•ŒÌ¡…±Á¡„€¨9 ¹à°…±Á¡„€¨9 ¹ä°µ…à À¸À°9 ¹è¤¤¤ì($$%ô(($$%Ù½¥µ…¥¸ ¤ì($$$%Ù•ŒÌ8€ô¹½Éµ…±¥é”¡Ù=ÕÑÁÕÑ¥É•Ñ¥½¸¤ì($$$%Ù•ŒÌX€ô8ì€¼¼ÍÍÕµ”Ù¥•Ü‘¥É•Ñ¥½¸•ÅÕ…±Ì¹½Éµ…°™½ÈÁÉ”µ™¥±Ñ•É¥¹œ(($$$%Ù•ŒÌÁÉ•™¥±Ñ•É•‘½±½È€ôÙ•ŒÌ À¸À¤ì($$$%™±½…ĞÑ½Ñ…±]•¥¡Ğ€ô€À¸Àì(($$$$¼¼½ÈÙ•Éä±½ÜÉ½Õ¡¹•ÍÌ°©ÕÍĞÍ…µÁ±”Ñ¡”•¹Ù¥É½¹µ•¹Ğ‘¥É•Ñ±ä($$$%¥˜€¡É½Õ¡¹•ÍÌ€ğ€À¸ÀÀÄ¤ì($$$$%±}É…½±½È€ôÙ•ŒĞ¡‰¥±¥¹•…ÉÕ‰•UX¡•¹Ù5…À°8°µ¥Á%¹Ğ¤°€Ä¸À¤ì($$$$%É•ÑÕÉ¸ì($$$%ô(($$$$¼¼Q…¹•¹ĞÍÁ…”‰…Í¥Ì™½ÈY9Í…µÁ±¥¹œ($$$%Ù•ŒÌÕÀ€ô…‰Ì¡8¹è¤€ğ€À¸äää€üÙ•ŒÌ À¸À°€À¸À°€Ä¸À¤€èÙ•ŒÌ Ä¸À°€À¸À°€À¸À¤ì($$$%Ù•ŒÌÑ…¹•¹Ğ€ô¹½Éµ…±¥é”¡É½ÍÌ¡ÕÀ°8¤¤ì($$$%Ù•ŒÌ‰¥Ñ…¹•¹Ğ€ôÉ½ÍÌ¡8°Ñ…¹•¹Ğ¤ì(($$$%™½È¡Õ¥¹Ğ¤€ô€ÁÔì¤€ğÕ¥¹Ğ¡a}M5A1L¤ì¤¬¬¤ì($$$$%Ù•ŒÈa¤€ô¡…µµ•ÉÍ±•ä¡¤°Õ¥¹Ğ¡a}M5A1L¤¤ì(($$$$$¼¼½ÈA5I4°X€ô8°Í¼¥¸Ñ…¹•¹ĞÍÁ…”X¥Ì…±İ…åÌ€ À°€À°€Ä¤($$$$%Ù•ŒÌ!}Ñ…¹•¹Ğ€ô¥µÁ½ÉÑ…¹•M…µÁ±•a}Y9¡a¤°Ù•ŒÌ À¸À°€À¸À°€Ä¸À¤°É½Õ¡¹•ÍÌ¤ì(($$$$$¼¼QÉ…¹Í™½É´ ‰…¬Ñ¼İ½É±ÍÁ…”($$$$%Ù•ŒÌ €ô¹½Éµ…±¥é”¡Ñ…¹•¹Ğ€¨!}Ñ…¹•¹Ğ¹à€¬‰¥Ñ…¹•¹Ğ€¨!}Ñ…¹•¹Ğ¹ä€¬8€¨!}Ñ…¹•¹Ğ¹è¤ì($$$$%Ù•ŒÌ0€ô¹½Éµ…±¥é” È¸À€¨‘½Ğ¡X° ¤€¨ €´X¤ì(($$$$%™±½…Ğ9‘½Ñ0€ôµ…à¡‘½Ğ¡8°0¤°€À¸À¤ì(($$$$%¥˜¡9‘½Ñ0€ø€À¸À¤ì($$$$$$¼¼M…µÁ±”•¹Ù¥É½¹µ•¹Ğ…Ğ™¥á•µ¥À±•Ù•°($$$$$$¼¼Y9¥µÁ½ÉÑ…¹”Í…µÁ±¥¹œ¡…¹‘±•ÌÑ¡”‘¥ÍÑÉ¥‰ÕÑ¥½¸™¥±Ñ•É¥¹œ($$$$$%Ù•ŒÌÍ…µÁ±•½±½È€ô‰¥±¥¹•…ÉÕ‰•UX¡•¹Ù5…À°0°µ¥Á%¹Ğ¤ì(($$$$$$¼¼]•¥¡Ğ‰ä9‘½Ñ0™½ÈÑ¡”ÍÁ±¥ĞµÍÕ´…ÁÁÉ½á¥µ…Ñ¥½¸($$$$$$¼¼Y9A¹…ÑÕÉ…±±ä…½Õ¹ÑÌ™½ÈÑ¡”Ù¥Í¥‰±”µ¥É½™…•Ğ‘¥ÍÑÉ¥‰ÕÑ¥½¸($$$$$%ÁÉ•™¥±Ñ•É•‘½±½È€¬ôÍ…µÁ±•½±½È€¨9‘½Ñ0ì($$$$$%Ñ½Ñ…±]•¥¡Ğ€¬ô9‘½Ñ0ì($$$$%ô($$$%ô(($$$%¥˜€¡Ñ½Ñ…±]•¥¡Ğ€ø€À¸À¤ì($$$$%ÁÉ•™¥±Ñ•É•‘½±½È€ôÁÉ•™¥±Ñ•É•‘½±½È€¼Ñ½Ñ…±]•¥¡Ğì($$$%ô(($$$%±}É…½±½È€ôÙ•ŒĞ¡ÁÉ•™¥±Ñ•É•‘½±½È°€Ä¸À¤ì($$%ô($%€°(€€€‰±•¹‘¥¹œè€À°(€€€‘•ÁÑ¡Q•ÍĞè€„Ä°(€€€‘•ÁÑ¡]É¥Ñ”è€„Ä(€ô¤ì)ô)™Õ¹Ñ¥½¸Ô¡”°Ğ°¤¤ì(€½¹ÍĞ¸€ô¹•Ü±½…ĞÌÉÉÉ…ä¡Y¤¤°È€ô¹•Ü8 À°€Ä°€À¤ì(€É•ÑÕÉ¸¹•Ü¡¤¡ì(€€€¹…µ”è€‰MÁ¡•É¥…±…ÕÍÍ¥…¹	±ÕÈˆ°(€€€‘•™¥¹•Ìèì(€€€€€¸èY¤°(€€€€€U	UY}Qa1}]%Q è€Ä€¼Ğ°(€€€€€U	UY}Qa1}!%!Pè€Ä€¼¤°(€€€€€U	UY}5a}5%@è€‘í•ô¸Á€(€€€ô°(€€€Õ¹¥™½ÉµÌèì(€€€€€•¹Ù5…ÀèìÙ…±Õ”è¹Õ±°ô°(€€€€€Í…µÁ±•ÌèìÙ…±Õ”è€Äô°(€€€€€İ•¥¡ÑÌèìÙ…±Õ”è¸ô°(€€€€€±…Ñ¥ÑÕ‘¥¹…°èìÙ…±Õ”è€„Äô°(€€€€€‘Q¡•Ñ„èìÙ…±Õ”è€Àô°(€€€€€µ¥Á%¹ĞèìÙ…±Õ”è€Àô°(€€€€€Á½±•á¥ÌèìÙ…±Õ”èÈô(€€€ô°(€€€Ù•ÉÑ•áM¡…‘•ÈèeÈ ¤°(€€€™É…µ•¹ÑM¡…‘•Èè€(($$%ÁÉ•¥Í¥½¸µ•‘¥ÕµÀ™±½…Ğì($$%ÁÉ•¥Í¥½¸µ•‘¥ÕµÀ¥¹Ğì(($$%Ù…Éå¥¹œÙ•ŒÌÙ=ÕÑÁÕÑ¥É•Ñ¥½¸ì(($$%Õ¹¥™½É´Í…µÁ±•ÈÉ•¹Ù5…Àì($$%Õ¹¥™½É´¥¹ĞÍ…µÁ±•Ìì($$%Õ¹¥™½É´™±½…Ğİ•¥¡ÑÍl¸tì($$%Õ¹¥™½É´‰½½°±…Ñ¥ÑÕ‘¥¹…°ì($$%Õ¹¥™½É´™±½…Ğ‘Q¡•Ñ„ì($$%Õ¹¥™½É´™±½…Ğµ¥Á%¹Ğì($$%Õ¹¥™½É´Ù•ŒÌÁ½±•á¥Ìì(($$$‘•™¥¹”9Y5A}QeA}U	}UX($$$¥¹±Õ‘”€ñÕ‰•}ÕÙ}É•™±•Ñ¥½¹}™É…µ•¹Ğø(($$%Ù•ŒÌ•ÑM…µÁ±” ™±½…ĞÑ¡•Ñ„°Ù•ŒÌ…á¥Ì€¤ì(($$$%™±½…Ğ½ÍQ¡•Ñ„€ô½Ì Ñ¡•Ñ„€¤ì($$$$¼¼I½‘É¥Õ•Ìœ…á¥Ìµ…¹±”É½Ñ…Ñ¥½¸($$$%Ù•ŒÌÍ…µÁ±•¥É•Ñ¥½¸€ôÙ=ÕÑÁÕÑ¥É•Ñ¥½¸€¨½ÍQ¡•Ñ„($$$$$¬É½ÍÌ …á¥Ì°Ù=ÕÑÁÕÑ¥É•Ñ¥½¸€¤€¨Í¥¸ Ñ¡•Ñ„€¤($$$$$¬…á¥Ì€¨‘½Ğ …á¥Ì°Ù=ÕÑÁÕÑ¥É•Ñ¥½¸€¤€¨€ €Ä¸À€´½ÍQ¡•Ñ„€¤ì(($$$%É•ÑÕÉ¸‰¥±¥¹•…ÉÕ‰•UX •¹Ù5…À°Í…µÁ±•¥É•Ñ¥½¸°µ¥Á%¹Ğ€¤ì(($$%ô(($$%Ù½¥µ…¥¸ ¤ì(($$$%Ù•ŒÌ…á¥Ì€ô±…Ñ¥ÑÕ‘¥¹…°€üÁ½±•á¥Ì€èÉ½ÍÌ Á½±•á¥Ì°Ù=ÕÑÁÕÑ¥É•Ñ¥½¸€¤ì(($$$%¥˜€ …±° •ÅÕ…° …á¥Ì°Ù•ŒÌ €À¸À€¤€¤€¤€¤ì(($$$$%…á¥Ì€ôÙ•ŒÌ Ù=ÕÑÁÕÑ¥É•Ñ¥½¸¹è°€À¸À°€´Ù=ÕÑÁÕÑ¥É•Ñ¥½¸¹à€¤ì(($$$%ô(($$$%…á¥Ì€ô¹½Éµ…±¥é” …á¥Ì€¤ì(($$$%±}É…½±½È€ôÙ•ŒĞ €À¸À°€À¸À°€À¸À°€Ä¸À€¤ì($$$%±}É…½±½È¹Éˆ€¬ôİ•¥¡ÑÍl€Àt€¨•ÑM…µÁ±” €À¸À°…á¥Ì€¤ì(($$$%™½È€ ¥¹Ğ¤€ô€Äì¤€ğ¸ì¤¬¬€¤ì(($$$$%¥˜€ ¤€øôÍ…µÁ±•Ì€¤ì(($$$$$%‰É•…¬ì(($$$$%ô(($$$$%™±½…ĞÑ¡•Ñ„€ô‘Q¡•Ñ„€¨™±½…Ğ ¤€¤ì($$$$%±}É…½±½È¹Éˆ€¬ôİ•¥¡ÑÍl¤t€¨•ÑM…µÁ±” €´Ä¸À€¨Ñ¡•Ñ„°…á¥Ì€¤ì($$$$%±}É…½±½È¹Éˆ€¬ôİ•¥¡ÑÍl¤t€¨•ÑM…µÁ±” Ñ¡•Ñ„°…á¥Ì€¤ì(($$$%ô(($$%ô($%€°(€€€‰±•¹‘¥¹œè€À°(€€€‘•ÁÑ¡Q•ÍĞè€„Ä°(€€€‘•ÁÑ¡]É¥Ñ”è€„Ä(€ô¤ì)ô)™Õ¹Ñ¥½¸¥¼ ¤ì(€É•ÑÕÉ¸¹•Ü¡¤¡ì(€€€¹…µ”è€‰ÅÕ¥É•Ñ…¹Õ±…ÉQ½Õ‰•UXˆ°(€€€Õ¹¥™½ÉµÌèì•¹Ù5…ÀèìÙ…±Õ”è¹Õ±°ôô°(€€€Ù•ÉÑ•áM¡…‘•ÈèeÈ ¤°(€€€™É…µ•¹ÑM¡…‘•Èè€(($$%ÁÉ•¥Í¥½¸µ•‘¥ÕµÀ™±½…Ğì($$%ÁÉ•¥Í¥½¸µ•‘¥ÕµÀ¥¹Ğì(($$%Ù…Éå¥¹œÙ•ŒÌÙ=ÕÑÁÕÑ¥É•Ñ¥½¸ì(($$%Õ¹¥™½É´Í…µÁ±•ÈÉ•¹Ù5…Àì(($$$¥¹±Õ‘”€ñ½µµ½¸ø(($$%Ù½¥µ…¥¸ ¤ì(($$$%Ù•ŒÌ½ÕÑÁÕÑ¥É•Ñ¥½¸€ô¹½Éµ…±¥é” Ù=ÕÑÁÕÑ¥É•Ñ¥½¸€¤ì($$$%Ù•ŒÈÕØ€ô•ÅÕ¥É•ÑUØ ½ÕÑÁÕÑ¥É•Ñ¥½¸€¤ì(($$$%±}É…½±½È€ôÙ•ŒĞ Ñ•áÑÕÉ”É€ •¹Ù5…À°ÕØ€¤¹Éˆ°€Ä¸À€¤ì(($$%ô($%€°(€€€‰±•¹‘¥¹œè€À°(€€€‘•ÁÑ¡Q•ÍĞè€„Ä°(€€€‘•ÁÑ¡]É¥Ñ”è€„Ä(€ô¤ì)ô)™Õ¹Ñ¥½¸¹¼ ¤ì(€É•ÑÕÉ¸¹•Ü¡¤¡ì(€€€¹…µ”è€‰Õ‰•µ…ÁQ½Õ‰•UXˆ°(€€€Õ¹¥™½ÉµÌèì(€€€€€•¹Ù5…ÀèìÙ…±Õ”è¹Õ±°ô°(€€€€€™±¥Á¹Ù5…ÀèìÙ…±Õ”è€´Äô(€€€ô°(€€€Ù•ÉÑ•áM¡…‘•ÈèeÈ ¤°(€€€™É…µ•¹ÑM¡…‘•Èè€(($$%ÁÉ•¥Í¥½¸µ•‘¥ÕµÀ™±½…Ğì($$%ÁÉ•¥Í¥½¸µ•‘¥ÕµÀ¥¹Ğì(($$%Õ¹¥™½É´™±½…Ğ™±¥Á¹Ù5…Àì(($$%Ù…Éå¥¹œÙ•ŒÌÙ=ÕÑÁÕÑ¥É•Ñ¥½¸ì(($$%Õ¹¥™½É´Í…µÁ±•ÉÕ‰”•¹Ù5…Àì(($$%Ù½¥µ…¥¸ ¤ì(($$$%±}É…½±½È€ôÑ•áÑÕÉ•Õ‰” •¹Ù5…À°Ù•ŒÌ ™±¥Á¹Ù5…À€¨Ù=ÕÑÁÕÑ¥É•Ñ¥½¸¹à°Ù=ÕÑÁÕÑ¥É•Ñ¥½¸¹åè€¤€¤ì(($$%ô($%€°(€€€‰±•¹‘¥¹œè€À°(€€€‘•ÁÑ¡Q•ÍĞè€„Ä°(€€€‘•ÁÑ¡]É¥Ñ”è€„Ä(€ô¤ì)ô)™Õ¹Ñ¥½¸eÈ ¤ì(€É•ÑÕÉ¸€(($%ÁÉ•¥Í¥½¸µ•‘¥ÕµÀ™±½…Ğì($%ÁÉ•¥Í¥½¸µ•‘¥ÕµÀ¥¹Ğì(($%…ÑÑÉ¥‰ÕÑ”™±½…Ğ™…•%¹‘•àì(($%Ù…Éå¥¹œÙ•ŒÌÙ=ÕÑÁÕÑ¥É•Ñ¥½¸ì(($$¼¼I ½½É‘¥¹…Ñ”ÍåÍÑ•´ìA5I4™…”µ¥¹‘•á¥¹œ½¹Ù•¹Ñ¥½¸($%Ù•ŒÌ•Ñ¥É•Ñ¥½¸ Ù•ŒÈÕØ°™±½…Ğ™…”€¤ì(($$%ÕØ€ô€È¸À€¨ÕØ€´€Ä¸Àì(($$%Ù•ŒÌ‘¥É•Ñ¥½¸€ôÙ•ŒÌ ÕØ°€Ä¸À€¤ì(($$%¥˜€ ™…”€ôô€À¸À€¤ì(($$$%‘¥É•Ñ¥½¸€ô‘¥É•Ñ¥½¸¹éåàì€¼¼€ €Ä°Ø°Ô€¤Á½Ìà(($$%ô•±Í”¥˜€ ™…”€ôô€Ä¸À€¤ì(($$$%‘¥É•Ñ¥½¸€ô‘¥É•Ñ¥½¸¹áéäì($$$%‘¥É•Ñ¥½¸¹áè€¨ô€´Ä¸Àì€¼¼€ €µÔ°€Ä°€µØ€¤Á½Ìä(($$%ô•±Í”¥˜€ ™…”€ôô€È¸À€¤ì(($$$%‘¥É•Ñ¥½¸¹à€¨ô€´Ä¸Àì€¼¼€ €µÔ°Ø°€Ä€¤Á½Ìè(($$%ô•±Í”¥˜€ ™…”€ôô€Ì¸À€¤ì(($$$%‘¥É•Ñ¥½¸€ô‘¥É•Ñ¥½¸¹éåàì($$$%‘¥É•Ñ¥½¸¹áè€¨ô€´Ä¸Àì€¼¼€ €´Ä°Ø°€µÔ€¤¹•œà(($$%ô•±Í”¥˜€ ™…”€ôô€Ğ¸À€¤ì(($$$%‘¥É•Ñ¥½¸€ô‘¥É•Ñ¥½¸¹áéäì($$$%‘¥É•Ñ¥½¸¹áä€¨ô€´Ä¸Àì€¼¼€ €µÔ°€´Ä°Ø€¤¹•œä(($$%ô•±Í”¥˜€ ™…”€ôô€Ô¸À€¤ì(($$$%‘¥É•Ñ¥½¸¹è€¨ô€´Ä¸Àì€¼¼€ Ô°Ø°€´Ä€¤¹•œè(($$%ô(($$%É•ÑÕÉ¸‘¥É•Ñ¥½¸ì(($%ô(($%Ù½¥µ…¥¸ ¤ì(($$%Ù=ÕÑÁÕÑ¥É•Ñ¥½¸€ô•Ñ¥É•Ñ¥½¸ ÕØ°™…•%¹‘•à€¤ì($$%±}A½Í¥Ñ¥½¸€ôÙ•ŒĞ Á½Í¥Ñ¥½¸°€Ä¸À€¤ì(($%ô(%€ì)ô)Ù…È5°€ô±…ÍÌ•áÑ•¹‘Ì±¤ì(€½¹ÍÑÉÕÑ½È¡”€ô€Ä°Ğ€ôíô¤ì(€€€ÍÕÁ•È¡”°”°Ğ¤°Ñ¡¥Ì¹¥Í]•‰1Õ‰•I•¹‘•ÉQ…É•Ğ€ô€„Àì(€€€½¹ÍĞ¤€ôì(€€€€€İ¥‘Ñ è”°(€€€€€¡•¥¡Ğè”°(€€€€€‘•ÁÑ è€Ä(€€€ô°¸€ôl(€€€€€¤°(€€€€€¤°(€€€€€¤°(€€€€€¤°(€€€€€¤°(€€€€€¤(€€€tì(€€€Ñ¡¥Ì¹Ñ•áÑÕÉ”€ô¹•Ü½°¡¸¤°Ñ¡¥Ì¹}Í•ÑQ•áÑÕÉ•=ÁÑ¥½¹Ì¡Ğ¤°Ñ¡¥Ì¹Ñ•áÑÕÉ”¹¥ÍI•¹‘•ÉQ…É•ÑQ•áÑÕÉ”€ô€„Àì(€ô(€™É½µÅÕ¥É•Ñ…¹Õ±…ÉQ•áÑÕÉ”¡”°Ğ¤ì(€€€Ñ¡¥Ì¹Ñ•áÑÕÉ”¹ÑåÁ”€ôĞ¹ÑåÁ”°Ñ¡¥Ì¹Ñ•áÑÕÉ”¹½±½ÉMÁ…”€ôĞ¹½±½ÉMÁ…”°Ñ¡¥Ì¹Ñ•áÑÕÉ”¹•¹•É…Ñ•5¥Áµ…ÁÌ€ôĞ¹•¹•É…Ñ•5¥Áµ…ÁÌ°Ñ¡¥Ì¹Ñ•áÑÕÉ”¹µ¥¹¥±Ñ•È€ôĞ¹µ¥¹¥±Ñ•È°Ñ¡¥Ì¹Ñ•áÑÕÉ”¹µ…¥±Ñ•È€ôĞ¹µ…¥±Ñ•Èì(€€€½¹ÍĞ¤€ôì(€€€€€Õ¹¥™½ÉµÌèìÑÅÕ¥É•ĞèìÙ…±Õ”è¹Õ±°ôô°(€€€€€Ù•ÉÑ•áM¡…‘•Èè€(($$$%Ù…Éå¥¹œÙ•ŒÌÙ]½É±‘¥É•Ñ¥½¸ì(($$$%Ù•ŒÌÑÉ…¹Í™½Éµ¥É•Ñ¥½¸ ¥¸Ù•ŒÌ‘¥È°¥¸µ…ĞĞµ…ÑÉ¥à€¤ì(($$$$%É•ÑÕÉ¸¹½Éµ…±¥é” € µ…ÑÉ¥à€¨Ù•ŒĞ ‘¥È°€À¸À€¤€¤¹áåè€¤ì(($$$%ô(($$$%Ù½¥µ…¥¸ ¤ì(($$$$%Ù]½É±‘¥É•Ñ¥½¸€ôÑÉ…¹Í™½Éµ¥É•Ñ¥½¸ Á½Í¥Ñ¥½¸°µ½‘•±5…ÑÉ¥à€¤ì(($$$$$¥¹±Õ‘”€ñ‰•¥¹}Ù•ÉÑ•àø($$$$$¥¹±Õ‘”€ñÁÉ½©•Ñ}Ù•ÉÑ•àø(($$$%ô($$%€°(€€€€€™É…µ•¹ÑM¡…‘•Èè€(($$$%Õ¹¥™½É´Í…µÁ±•ÈÉÑÅÕ¥É•Ğì(($$$%Ù…Éå¥¹œÙ•ŒÌÙ]½É±‘¥É•Ñ¥½¸ì(($$$$¥¹±Õ‘”€ñ½µµ½¸ø(($$$%Ù½¥µ…¥¸ ¤ì(($$$$%Ù•ŒÌ‘¥É•Ñ¥½¸€ô¹½Éµ…±¥é” Ù]½É±‘¥É•Ñ¥½¸€¤ì(($$$$%Ù•ŒÈÍ…µÁ±•UX€ô•ÅÕ¥É•ÑUØ ‘¥É•Ñ¥½¸€¤ì(($$$$%±}É…½±½È€ôÑ•áÑÕÉ”É ÑÅÕ¥É•Ğ°Í…µÁ±•UX€¤ì(($$$%ô($$%€(€€€ô°¸€ô¹•Ü)Ì Ô°€Ô°€Ô¤°È€ô¹•Ü¡¤¡ì(€€€€€¹…µ”è€‰Õ‰•µ…ÁÉ½µÅÕ¥É•Ğˆ°(€€€€€Õ¹¥™½ÉµÌè¸¡¤¹Õ¹¥™½ÉµÌ¤°(€€€€€Ù•ÉÑ•áM¡…‘•Èè¤¹Ù•ÉÑ•áM¡…‘•È°(€€€€€™É…µ•¹ÑM¡…‘•Èè¤¹™É…µ•¹ÑM¡…‘•È°(€€€€€Í¥‘”è€Ä°(€€€€€‰±•¹‘¥¹œè€À(€€€ô¤ì(€€€È¹Õ¹¥™½ÉµÌ¹ÑÅÕ¥É•Ğ¹Ù…±Õ”€ôĞì(€€€½¹ÍĞÌ€ô¹•ÜĞ¡¸°È¤°„€ôĞ¹µ¥¹¥±Ñ•Èì(€€€É•ÑÕÉ¸Ğ¹µ¥¹¥±Ñ•È€ôôô€ÄÀÀà€˜˜€¡Ğ¹µ¥¹¥±Ñ•È€ô%Ğ¤°¹•ÜÍÔ Ä°€ÄÀ°Ñ¡¥Ì¤¹ÕÁ‘…Ñ”¡”°Ì¤°Ğ¹µ¥¹¥±Ñ•È€ô„°Ì¹•½µ•ÑÉä¹‘¥ÍÁ½Í” ¤°Ì¹µ…Ñ•É¥…°¹‘¥ÍÁ½Í” ¤°Ñ¡¥Ìì(€ô(€±•…È¡”°Ğ€ô€„À°¤€ô€„À°¸€ô€„À¤ì(€€€½¹ÍĞÈ€ô”¹•ÑI•¹‘•ÉQ…É•Ğ ¤ì(€€€™½È€¡±•ĞÌ€ô€ÀìÌ€ğ€ØìÌ¬¬¤(€€€€€”¹Í•ÑI•¹‘•ÉQ…É•Ğ¡Ñ¡¥Ì°Ì¤°”¹±•…È¡Ğ°¤°¸¤ì(€€€”¹Í•ÑI•¹‘•ÉQ…É•Ğ¡È¤ì(€ô)ôì)™Õ¹Ñ¥½¸AÔ¡”¤ì(€±•ĞĞ€ô€¼¨}}AUI}|€¨¼¹•Ü]•…­5…À ¤°¤€ô€¼¨}}AUI}|€¨¼¹•Ü]•…­5…À ¤°¸€ô¹Õ±°ì(€™Õ¹Ñ¥½¸È¡Ô°À€ô€„Ä¤ì(€€€É•ÑÕÉ¸Ô€ôô¹Õ±°€ü¹Õ±°€èÀ€ü„¡Ô¤€èÌ¡Ô¤ì(€ô(€™Õ¹Ñ¥½¸Ì¡Ô¤ì(€€€¥˜€¡Ô€˜˜Ô¹¥ÍQ•áÑÕÉ”¤ì(€€€€€½¹ÍĞÀ€ôÔ¹µ…ÁÁ¥¹œì(€€€€€¥˜€¡À€ôôô€ÌÀÌñğÀ€ôôô€ÌÀĞ¤¥˜€¡Ğ¹¡…Ì¡Ô¤¤ì(€€€€€€€½¹ÍĞØ€ôĞ¹•Ğ¡Ô¤¹Ñ•áÑÕÉ”ì(€€€€€€€É•ÑÕÉ¸¼¡Ø°Ô¹µ…ÁÁ¥¹œ¤ì(€€€€€ô•±Í”ì(€€€€€€€½¹ÍĞØ€ôÔ¹¥µ…”ì(€€€€€€€¥˜€¡Ø€˜˜Ø¹¡•¥¡Ğ€ø€À¤ì(€€€€€€€€€½¹ÍĞˆ€ô¹•Ü5°¡Ø¹¡•¥¡Ğ¤ì(€€€€€€€€€É•ÑÕÉ¸ˆ¹™É½µÅÕ¥É•Ñ…¹Õ±…ÉQ•áÑÕÉ”¡”°Ô¤°Ğ¹Í•Ğ¡Ô°ˆ¤°Ô¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰‘¥ÍÁ½Í”ˆ°Œ¤°¼¡ˆ¹Ñ•áÑÕÉ”°Ô¹µ…ÁÁ¥¹œ¤ì(€€€€€€€ô•±Í”É•ÑÕÉ¸¹Õ±°ì(€€€€€ô(€€€ô(€€€É•ÑÕÉ¸Ôì(€ô(€™Õ¹Ñ¥½¸„¡Ô¤ì(€€€¥˜€¡Ô€˜˜Ô¹¥ÍQ•áÑÕÉ”¤ì(€€€€€½¹ÍĞÀ€ôÔ¹µ…ÁÁ¥¹œ°Ø€ôÀ€ôôô€ÌÀÌñğÀ€ôôô€ÌÀĞ°ˆ€ôÀ€ôôô€ÌÀÄñğÀ€ôôô€ÌÀÈì(€€€€€¥˜€¡Øñğˆ¤ì(€€€€€€€±•Ğ´€ô¤¹•Ğ¡Ô¤ì(€€€€€€€½¹ÍĞ˜€ô´€„ôôÙ½¥€À€ü´¹Ñ•áÑÕÉ”¹ÁµÉ•µY•ÉÍ¥½¸€è€Àì(€€€€€€€¥˜€¡Ô¹¥ÍI•¹‘•ÉQ…É•ÑQ•áÑÕÉ”€˜˜Ô¹ÁµÉ•µY•ÉÍ¥½¸€„ôô˜¤(€€€€€€€€€É•ÑÕÉ¸¸€ôôô¹Õ±°€˜˜€¡¸€ô¹•Ü•¼¡”¤¤°´€ôØ€ü¸¹™É½µÅÕ¥É•Ñ…¹Õ±…È¡Ô°´¤€è¸¹™É½µÕ‰•µ…À¡Ô°´¤°´¹Ñ•áÑÕÉ”¹ÁµÉ•µY•ÉÍ¥½¸€ôÔ¹ÁµÉ•µY•ÉÍ¥½¸°¤¹Í•Ğ¡Ô°´¤°´¹Ñ•áÑÕÉ”ì(€€€€€€€¥˜€¡´€„ôôÙ½¥€À¤É•ÑÕÉ¸´¹Ñ•áÑÕÉ”ì(€€€€€€€ì(€€€€€€€€€½¹ÍĞP€ôÔ¹¥µ…”ì(€€€€€€€€€É•ÑÕÉ¸Ø€˜˜P€˜˜P¹¡•¥¡Ğ€ø€Àñğˆ€˜˜P€˜˜°¡P¤€ü€¡¸€ôôô¹Õ±°€˜˜€¡¸€ô¹•Ü•¼¡”¤¤°´€ôØ€ü¸¹™É½µÅÕ¥É•Ñ…¹Õ±…È¡Ô¤€è¸¹™É½µÕ‰•µ…À¡Ô¤°´¹Ñ•áÑÕÉ”¹ÁµÉ•µY•ÉÍ¥½¸€ôÔ¹ÁµÉ•µY•ÉÍ¥½¸°¤¹Í•Ğ¡Ô°´¤°Ô¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰‘¥ÍÁ½Í”ˆ° ¤°´¹Ñ•áÑÕÉ”¤€è¹Õ±°ì(€€€€€€€ô(€€€€€ô(€€€ô(€€€É•ÑÕÉ¸Ôì(€ô(€™Õ¹Ñ¥½¸¼¡Ô°À¤ì(€€€É•ÑÕÉ¸À€ôôô€ÌÀÌ€üÔ¹µ…ÁÁ¥¹œ€ô€ÌÀÄ€èÀ€ôôô€ÌÀĞ€˜˜€¡Ô¹µ…ÁÁ¥¹œ€ô€ÌÀÈ¤°Ôì(€ô(€™Õ¹Ñ¥½¸°¡Ô¤ì(€€€±•ĞÀ€ô€Àì(€€€½¹ÍĞØ€ô€Øì(€€€™½È€¡±•Ğˆ€ô€Àìˆ€ğØìˆ¬¬¤Õm‰t€„ôôÙ½¥€À€˜˜À¬¬ì(€€€É•ÑÕÉ¸À€ôôôØì(€ô(€™Õ¹Ñ¥½¸Œ¡Ô¤ì(€€€½¹ÍĞÀ€ôÔ¹Ñ…É•Ğì(€€€À¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰‘¥ÍÁ½Í”ˆ°Œ¤ì(€€€½¹ÍĞØ€ôĞ¹•Ğ¡À¤ì(€€€Ø€„ôôÙ½¥€À€˜˜€¡Ğ¹‘•±•Ñ”¡À¤°Ø¹‘¥ÍÁ½Í” ¤¤ì(€ô(€™Õ¹Ñ¥½¸ ¡Ô¤ì(€€€½¹ÍĞÀ€ôÔ¹Ñ…É•Ğì(€€€À¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰‘¥ÍÁ½Í”ˆ° ¤ì(€€€½¹ÍĞØ€ô¤¹•Ğ¡À¤ì(€€€Ø€„ôôÙ½¥€À€˜˜€¡¤¹‘•±•Ñ”¡À¤°Ø¹‘¥ÍÁ½Í” ¤¤ì(€ô(€™Õ¹Ñ¥½¸ ¤ì(€€€Ğ€ô€¼¨}}AUI}|€¨¼¹•Ü]•…­5…À ¤°¤€ô€¼¨}}AUI}|€¨¼¹•Ü]•…­5…À ¤°¸€„ôô¹Õ±°€˜˜€¡¸¹‘¥ÍÁ½Í” ¤°¸€ô¹Õ±°¤ì(€ô(€É•ÑÕÉ¸ì(€€€•ĞèÈ°(€€€‘¥ÍÁ½Í”è(€ôì)ô)™Õ¹Ñ¥½¸1Ô¡”¤ì(€½¹ÍĞĞ€ôíôì(€™Õ¹Ñ¥½¸¤¡¸¤ì(€€€¥˜€¡Ñm¹t€„ôôÙ½¥€À¤É•ÑÕÉ¸Ñm¹tì(€€€½¹ÍĞÈ€ô”¹•ÑáÑ•¹Í¥½¸¡¸¤ì(€€€É•ÑÕÉ¸Ñm¹t€ôÈ°Èì(€ô(€É•ÑÕÉ¸ì(€€€¡…Ìè™Õ¹Ñ¥½¸¡¸¤ì(€€€€€É•ÑÕÉ¸¤¡¸¤€„ôô¹Õ±°ì(€€€ô°(€€€¥¹¥Ğè™Õ¹Ñ¥½¸ ¤ì(€€€€€¤ ‰aQ}½±½É}‰Õ™™•É}™±½…Ğˆ¤°¤ ‰]	1}±¥Á}Õ±±}‘¥ÍÑ…¹”ˆ¤°¤ ‰=M}Ñ•áÑÕÉ•}™±½…Ñ}±¥¹•…Èˆ¤°¤ ‰aQ}½±½É}‰Õ™™•É}¡…±™}™±½…Ğˆ¤°¤ ‰]	1}µÕ±Ñ¥Í…µÁ±•‘}É•¹‘•É}Ñ½}Ñ•áÑÕÉ”ˆ¤°¤ ‰]	1}É•¹‘•É}Í¡…É•‘}•áÁ½¹•¹Ğˆ¤ì(€€€ô°(€€€•Ğè™Õ¹Ñ¥½¸¡¸¤ì(€€€€€½¹ÍĞÈ€ô¤¡¸¤ì(€€€€€É•ÑÕÉ¸È€ôôô¹Õ±°€˜˜µ¸ ‰]•‰1I•¹‘•É•Èè€ˆ€¬¸€¬€ˆ•áÑ•¹Í¥½¸¹½ĞÍÕÁÁ½ÉÑ•¸ˆ¤°Èì(€€€ô(€ôì)ô)™Õ¹Ñ¥½¸Ô¡”°Ğ°¤°¸¤ì(€½¹ÍĞÈ€ôíô°Ì€ô€¼¨}}AUI}|€¨¼¹•Ü]•…­5…À ¤ì(€™Õ¹Ñ¥½¸„¡¤ì(€€€½¹ÍĞÔ€ô¹Ñ…É•Ğì(€€€Ô¹¥¹‘•à€„ôô¹Õ±°€˜˜Ğ¹É•µ½Ù”¡Ô¹¥¹‘•à¤ì(€€€™½È€¡½¹ÍĞØ¥¸Ô¹…ÑÑÉ¥‰ÕÑ•Ì¤Ğ¹É•µ½Ù”¡Ô¹…ÑÑÉ¥‰ÕÑ•ÍmÙt¤ì(€€€Ô¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰‘¥ÍÁ½Í”ˆ°„¤°‘•±•Ñ”ÉmÔ¹¥‘tì(€€€½¹ÍĞÀ€ôÌ¹•Ğ¡Ô¤ì(€€€À€˜˜€¡Ğ¹É•µ½Ù”¡À¤°Ì¹‘•±•Ñ”¡Ô¤¤°¸¹É•±•…Í•MÑ…Ñ•Í=™•½µ•ÑÉä¡Ô¤°Ô¹¥Í%¹ÍÑ…¹•‘	Õ™™•É•½µ•ÑÉä€ôôô€„À€˜˜‘•±•Ñ”Ô¹}µ…á%¹ÍÑ…¹•½Õ¹Ğ°¤¹µ•µ½Éä¹•½µ•ÑÉ¥•Ì´´ì(€ô(€™Õ¹Ñ¥½¸¼¡°Ô¤ì(€€€É•ÑÕÉ¸ÉmÔ¹¥‘t€ôôô€„Àñğ€¡Ô¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰‘¥ÍÁ½Í”ˆ°„¤°ÉmÔ¹¥‘t€ô€„À°¤¹µ•µ½Éä¹•½µ•ÑÉ¥•Ì¬¬¤°Ôì(€ô(€™Õ¹Ñ¥½¸°¡¤ì(€€€½¹ÍĞÔ€ô¹…ÑÑÉ¥‰ÕÑ•Ìì(€€€™½È€¡½¹ÍĞÀ¥¸Ô¤Ğ¹ÕÁ‘…Ñ”¡ÕmÁt°”¹IIe}	UH¤ì(€ô(€™Õ¹Ñ¥½¸Œ¡¤ì(€€€½¹ÍĞÔ€ômt°À€ô¹¥¹‘•à°Ø€ô¹…ÑÑÉ¥‰ÕÑ•Ì¹Á½Í¥Ñ¥½¸ì(€€€±•Ğˆ€ô€Àì(€€€¥˜€¡Ø€ôôôÙ½¥€À¤É•ÑÕÉ¸ì(€€€¥˜€¡À€„ôô¹Õ±°¤ì(€€€€€½¹ÍĞP€ôÀ¹…ÉÉ…äì(€€€€€ˆ€ôÀ¹Ù•ÉÍ¥½¸ì(€€€€€™½È€¡±•Ğ€ô€À°4€ôP¹±•¹Ñ ì€ğ4ì€¬ô€Ì¤ì(€€€€€€€½¹ÍĞ€ôQm€¬€Át°H€ôQm€¬€Åt°€ôQm€¬€Étì(€€€€€€€Ô¹ÁÕÍ ¡°H°H°°°¤ì(€€€€€ô(€€€ô•±Í”ì(€€€€€½¹ÍĞP€ôØ¹…ÉÉ…äì(€€€€€ˆ€ôØ¹Ù•ÉÍ¥½¸ì(€€€€€™½È€¡±•Ğ€ô€À°4€ôP¹±•¹Ñ €¼€Ì€´€Äì€ğ4ì€¬ô€Ì¤ì(€€€€€€€½¹ÍĞ€ô€¬€À°H€ô€¬€Ä°€ô€¬€Èì(€€€€€€€Ô¹ÁÕÍ ¡°H°H°°°¤ì(€€€€€ô(€€€ô(€€€½¹ÍĞ´€ô¹•Ü€¡Ø¹½Õ¹Ğ€øô€ØÔÔÌÔ€ü•°€èE¼¤¡Ô°€Ä¤ì(€€€´¹Ù•ÉÍ¥½¸€ôˆì(€€€½¹ÍĞ˜€ôÌ¹•Ğ¡¤ì(€€€˜€˜˜Ğ¹É•µ½Ù”¡˜¤°Ì¹Í•Ğ¡°´¤ì(€ô(€™Õ¹Ñ¥½¸ ¡¤ì(€€€½¹ÍĞÔ€ôÌ¹•Ğ¡¤ì(€€€¥˜€¡Ô¤ì(€€€€€½¹ÍĞÀ€ô¹¥¹‘•àì(€€€€€À€„ôô¹Õ±°€˜˜Ô¹Ù•ÉÍ¥½¸€ğÀ¹Ù•ÉÍ¥½¸€˜˜Œ¡¤ì(€€€ô•±Í”Œ¡¤ì(€€€É•ÑÕÉ¸Ì¹•Ğ¡¤ì(€ô(€É•ÑÕÉ¸ì(€€€•Ğè¼°(€€€ÕÁ‘…Ñ”è°°(€€€•Ñ]¥É•™É…µ•ÑÑÉ¥‰ÕÑ”è (€ôì)ô)™Õ¹Ñ¥½¸%Ô¡”°Ğ°¤¤ì(€±•Ğ¸ì(€™Õ¹Ñ¥½¸È¡¤ì(€€€¸€ôì(€ô(€±•ĞÌ°„ì(€™Õ¹Ñ¥½¸¼¡¤ì(€€€Ì€ô¹ÑåÁ”°„€ô¹‰åÑ•ÍA•É±•µ•¹Ğì(€ô(€™Õ¹Ñ¥½¸°¡°Ô¤ì(€€€”¹‘É…İ±•µ•¹ÑÌ¡¸°Ô°Ì°€¨„¤°¤¹ÕÁ‘…Ñ”¡Ô°¸°€Ä¤ì(€ô(€™Õ¹Ñ¥½¸Œ¡°Ô°À¤ì(€€€À€„ôô€À€˜˜€¡”¹‘É…İ±•µ•¹ÑÍ%¹ÍÑ…¹•¡¸°Ô°Ì°€¨„°À¤°¤¹ÕÁ‘…Ñ”¡Ô°¸°À¤¤ì(€ô(€™Õ¹Ñ¥½¸ ¡°Ô°À¤ì(€€€¥˜€¡À€ôôô€À¤É•ÑÕÉ¸ì(€€€Ğ¹•Ğ ‰]	1}µÕ±Ñ¥}‘É…Üˆ¤¹µÕ±Ñ¥É…İ±•µ•¹ÑÍ]	0¡¸°Ô°€À°Ì°°€À°À¤ì(€€€±•ĞØ€ô€Àì(€€€™½È€¡±•Ğˆ€ô€Àìˆ€ğÀìˆ¬¬¤Ø€¬ôÕm‰tì(€€€¤¹ÕÁ‘…Ñ”¡Ø°¸°€Ä¤ì(€ô(€Ñ¡¥Ì¹Í•Ñ5½‘”€ôÈ°Ñ¡¥Ì¹Í•Ñ%¹‘•à€ô¼°Ñ¡¥Ì¹É•¹‘•È€ô°°Ñ¡¥Ì¹É•¹‘•É%¹ÍÑ…¹•Ì€ôŒ°Ñ¡¥Ì¹É•¹‘•É5Õ±Ñ¥É…Ü€ô ì)ô)™Õ¹Ñ¥½¸9Ô¡”¤ì(€½¹ÍĞĞ€ôì(€€€•½µ•ÑÉ¥•Ìè€À°(€€€Ñ•áÑÕÉ•Ìè€À(€ô°¤€ôì(€€€™É…µ”è€À°(€€€…±±Ìè€À°(€€€ÑÉ¥…¹±•Ìè€À°(€€€Á½¥¹ÑÌè€À°(€€€±¥¹•Ìè€À(€ôì(€™Õ¹Ñ¥½¸¸¡Ì°„°¼¤ì(€€€Íİ¥Ñ €¡¤¹…±±Ì¬¬°„¤ì(€€€€€…Í””¹QI%91Lè(€€€€€€€¤¹ÑÉ¥…¹±•Ì€¬ô¼€¨€¡Ì€¼€Ì¤ì(€€€€€€€‰É•…¬ì(€€€€€…Í””¹1%9Lè(€€€€€€€¤¹±¥¹•Ì€¬ô¼€¨€¡Ì€¼€È¤ì(€€€€€€€‰É•…¬ì(€€€€€…Í””¹1%9}MQI%@è(€€€€€€€¤¹±¥¹•Ì€¬ô¼€¨€¡Ì€´€Ä¤ì(€€€€€€€‰É•…¬ì(€€€€€…Í””¹1%9}1==@è(€€€€€€€¤¹±¥¹•Ì€¬ô¼€¨Ìì(€€€€€€€‰É•…¬ì(€€€€€…Í””¹A=%9QLè(€€€€€€€¤¹Á½¥¹ÑÌ€¬ô¼€¨Ìì(€€€€€€€‰É•…¬ì(€€€€€‘•™…Õ±Ğè(€€€€€€€1” ‰]•‰1%¹™¼èU¹­¹½İ¸‘É…Üµ½‘”èˆ°„¤ì(€€€€€€€‰É•…¬ì(€€€ô(€ô(€™Õ¹Ñ¥½¸È ¤ì(€€€¤¹…±±Ì€ô€À°¤¹ÑÉ¥…¹±•Ì€ô€À°¤¹Á½¥¹ÑÌ€ô€À°¤¹±¥¹•Ì€ô€Àì(€ô(€É•ÑÕÉ¸ì(€€€µ•µ½ÉäèĞ°(€€€É•¹‘•Èè¤°(€€€ÁÉ½É…µÌè¹Õ±°°(€€€…ÕÑ½I•Í•Ğè€„À°(€€€É•Í•ĞèÈ°(€€€ÕÁ‘…Ñ”è¸(€ôì)ô)™Õ¹Ñ¥½¸UÔ¡”°Ğ°¤¤ì(€½¹ÍĞ¸€ô€¼¨}}AUI}|€¨¼¹•Ü]•…­5…À ¤°È€ô¹•Ü¥Ğ ¤ì(€™Õ¹Ñ¥½¸Ì¡„°¼°°¤ì(€€€½¹ÍĞŒ€ô„¹µ½ÉÁ¡Q…É•Ñ%¹™±Õ•¹•Ì° €ô¼¹µ½ÉÁ¡ÑÑÉ¥‰ÕÑ•Ì¹Á½Í¥Ñ¥½¸ñğ¼¹µ½ÉÁ¡ÑÑÉ¥‰ÕÑ•Ì¹¹½Éµ…°ñğ¼¹µ½ÉÁ¡ÑÑÉ¥‰ÕÑ•Ì¹½±½È°€ô €„ôôÙ½¥€À€ü ¹±•¹Ñ €è€Àì(€€€±•ĞÔ€ô¸¹•Ğ¡¼¤ì(€€€¥˜€¡Ô€ôôôÙ½¥€ÀñğÔ¹½Õ¹Ğ€„ôô¤ì(€€€€€±•Ğä€ô™Õ¹Ñ¥½¸ ¤ì(€€€€€€€¹‘¥ÍÁ½Í” ¤°¸¹‘•±•Ñ”¡¼¤°¼¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰‘¥ÍÁ½Í”ˆ°ä¤ì(€€€€€ôì(€€€€€Ô€„ôôÙ½¥€À€˜˜Ô¹Ñ•áÑÕÉ”¹‘¥ÍÁ½Í” ¤ì(€€€€€½¹ÍĞÀ€ô¼¹µ½ÉÁ¡ÑÑÉ¥‰ÕÑ•Ì¹Á½Í¥Ñ¥½¸€„ôôÙ½¥€À°Ø€ô¼¹µ½ÉÁ¡ÑÑÉ¥‰ÕÑ•Ì¹¹½Éµ…°€„ôôÙ½¥€À°ˆ€ô¼¹µ½ÉÁ¡ÑÑÉ¥‰ÕÑ•Ì¹½±½È€„ôôÙ½¥€À°´€ô¼¹µ½ÉÁ¡ÑÑÉ¥‰ÕÑ•Ì¹Á½Í¥Ñ¥½¸ñğmt°˜€ô¼¹µ½ÉÁ¡ÑÑÉ¥‰ÕÑ•Ì¹¹½Éµ…°ñğmt°P€ô¼¹µ½ÉÁ¡ÑÑÉ¥‰ÕÑ•Ì¹½±½Èñğmtì(€€€€€±•Ğ€ô€Àì(€€€€€À€ôôô€„À€˜˜€¡€ô€Ä¤°Ø€ôôô€„À€˜˜€¡€ô€È¤°ˆ€ôôô€„À€˜˜€¡€ô€Ì¤ì(€€€€€±•Ğ4€ô¼¹…ÑÑÉ¥‰ÕÑ•Ì¹Á½Í¥Ñ¥½¸¹½Õ¹Ğ€¨°€ô€Äì(€€€€€4€øĞ¹µ…áQ•áÑÕÉ•M¥é”€˜˜€¡€ô5…Ñ ¹•¥°¡4€¼Ğ¹µ…áQ•áÑÕÉ•M¥é”¤°4€ôĞ¹µ…áQ•áÑÕÉ•M¥é”¤ì(€€€€€½¹ÍĞH€ô¹•Ü±½…ĞÌÉÉÉ…ä¡4€¨€¨€Ğ€¨¤°€ô¹•Üe¼¡H°4°°¤ì(€€€€€¹ÑåÁ”€ôQ¸°¹¹••‘ÍUÁ‘…Ñ”€ô€„Àì(€€€€€½¹ÍĞœ€ô€¨€Ğì(€€€€€™½È€¡±•Ğ€ô€Àì€ğì¬¬¤ì(€€€€€€€½¹ÍĞÜ€ôµm	t°¬€ô™m	t°`€ôQm	t°Ä€ô4€¨€¨€Ğ€¨ì(€€€€€€€™½È€¡±•Ğ€ô€Àì€ğÜ¹½Õ¹Ğì¬¬¤ì(€€€€€€€€€½¹ÍĞ,€ô€¨œì(€€€€€€€€€À€ôôô€„À€˜˜€¡È¹™É½µ	Õ™™•ÉÑÑÉ¥‰ÕÑ”¡Ü°¤°ImÄ€¬,€¬€Át€ôÈ¹à°ImÄ€¬,€¬€Åt€ôÈ¹ä°ImÄ€¬,€¬€Ét€ôÈ¹è°ImÄ€¬,€¬€Ít€ô€À¤°Ø€ôôô€„À€˜˜€¡È¹™É½µ	Õ™™•ÉÑÑÉ¥‰ÕÑ”¡¬°¤°ImÄ€¬,€¬€Ñt€ôÈ¹à°ImÄ€¬,€¬€Õt€ôÈ¹ä°ImÄ€¬,€¬€Ùt€ôÈ¹è°ImÄ€¬,€¬€İt€ô€À¤°ˆ€ôôô€„À€˜˜€¡È¹™É½µ	Õ™™•ÉÑÑÉ¥‰ÕÑ”¡`°¤°ImÄ€¬,€¬€át€ôÈ¹à°ImÄ€¬,€¬€åt€ôÈ¹ä°ImÄ€¬,€¬€ÄÁt€ôÈ¹è°ImÄ€¬,€¬€ÄÅt€ô`¹¥Ñ•µM¥é”€ôôô€Ğ€üÈ¹Ü€è€Ä¤ì(€€€€€€€ô(€€€€€ô(€€€€€Ô€ôì(€€€€€€€½Õ¹Ğè°(€€€€€€€Ñ•áÑÕÉ”è°(€€€€€€€Í¥é”è¹•Ü”¡4°¤(€€€€€ô°¸¹Í•Ğ¡¼°Ô¤°¼¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰‘¥ÍÁ½Í”ˆ°ä¤ì(€€€ô(€€€¥˜€¡„¹¥Í%¹ÍÑ…¹•‘5•Í €ôôô€„À€˜˜„¹µ½ÉÁ¡Q•áÑÕÉ”€„ôô¹Õ±°¤°¹•ÑU¹¥™½ÉµÌ ¤¹Í•ÑY…±Õ”¡”°€‰µ½ÉÁ¡Q•áÑÕÉ”ˆ°„¹µ½ÉÁ¡Q•áÑÕÉ”°¤¤ì(€€€•±Í”ì(€€€€€±•ĞÀ€ô€Àì(€€€€€™½È€¡±•Ğˆ€ô€Àìˆ€ğŒ¹±•¹Ñ ìˆ¬¬¤À€¬ôm‰tì(€€€€€½¹ÍĞØ€ô¼¹µ½ÉÁ¡Q…É•ÑÍI•±…Ñ¥Ù”€ü€Ä€è€Ä€´Àì(€€€€€°¹•ÑU¹¥™½ÉµÌ ¤¹Í•ÑY…±Õ”¡”°€‰µ½ÉÁ¡Q…É•Ñ	…Í•%¹™±Õ•¹”ˆ°Ø¤°°¹•ÑU¹¥™½ÉµÌ ¤¹Í•ÑY…±Õ”¡”°€‰µ½ÉÁ¡Q…É•Ñ%¹™±Õ•¹•Ìˆ°Œ¤ì(€€€ô(€€€°¹•ÑU¹¥™½ÉµÌ ¤¹Í•ÑY…±Õ”¡”°€‰µ½ÉÁ¡Q…É•ÑÍQ•áÑÕÉ”ˆ°Ô¹Ñ•áÑÕÉ”°¤¤°°¹•ÑU¹¥™½ÉµÌ ¤¹Í•ÑY…±Õ”¡”°€‰µ½ÉÁ¡Q…É•ÑÍQ•áÑÕÉ•M¥é”ˆ°Ô¹Í¥é”¤ì(€ô(€É•ÑÕÉ¸ìÕÁ‘…Ñ”èÌôì)ô)™Õ¹Ñ¥½¸Ô¡”°Ğ°¤°¸°È¤ì(€±•ĞÌ€ô€¼¨}}AUI}|€¨¼¹•Ü]•…­5…À ¤ì(€™Õ¹Ñ¥½¸„¡Œ¤ì(€€€½¹ÍĞ €ôÈ¹É•¹‘•È¹™É…µ”°€ôŒ¹•½µ•ÑÉä°Ô€ôĞ¹•Ğ¡Œ°¤ì(€€€¥˜€¡Ì¹•Ğ¡Ô¤€„ôô €˜˜€¡Ğ¹ÕÁ‘…Ñ”¡Ô¤°Ì¹Í•Ğ¡Ô° ¤¤°Œ¹¥Í%¹ÍÑ…¹•‘5•Í €˜˜€¡Œ¹¡…ÍÙ•¹Ñ1¥ÍÑ•¹•È ‰‘¥ÍÁ½Í”ˆ°°¤€ôôô€„Ä€˜˜Œ¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰‘¥ÍÁ½Í”ˆ°°¤°Ì¹•Ğ¡Œ¤€„ôô €˜˜€¡¤¹ÕÁ‘…Ñ”¡Œ¹¥¹ÍÑ…¹•5…ÑÉ¥à°”¹IIe}	UH¤°Œ¹¥¹ÍÑ…¹•½±½È€„ôô¹Õ±°€˜˜¤¹ÕÁ‘…Ñ”¡Œ¹¥¹ÍÑ…¹•½±½È°”¹IIe}	UH¤°Ì¹Í•Ğ¡Œ° ¤¤¤°Œ¹¥ÍM­¥¹¹•‘5•Í ¤ì(€€€€€½¹ÍĞÀ€ôŒ¹Í­•±•Ñ½¸ì(€€€€€Ì¹•Ğ¡À¤€„ôô €˜˜€¡À¹ÕÁ‘…Ñ” ¤°Ì¹Í•Ğ¡À° ¤¤ì(€€€ô(€€€É•ÑÕÉ¸Ôì(€ô(€™Õ¹Ñ¥½¸¼ ¤ì(€€€Ì€ô€¼¨}}AUI}|€¨¼¹•Ü]•…­5…À ¤ì(€ô(€™Õ¹Ñ¥½¸°¡Œ¤ì(€€€½¹ÍĞ €ôŒ¹Ñ…É•Ğì(€€€ ¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰‘¥ÍÁ½Í”ˆ°°¤°¸¹É•±•…Í•MÑ…Ñ•Í=™=‰©•Ğ¡ ¤°¤¹É•µ½Ù”¡ ¹¥¹ÍÑ…¹•5…ÑÉ¥à¤° ¹¥¹ÍÑ…¹•½±½È€„ôô¹Õ±°€˜˜¤¹É•µ½Ù”¡ ¹¥¹ÍÑ…¹•½±½È¤ì(€ô(€É•ÑÕÉ¸ì(€€€ÕÁ‘…Ñ”è„°(€€€‘¥ÍÁ½Í”è¼(€ôì)ô)Ù…È=Ô€ôì(€€Äè€‰1%9I}Q=9}5AA%9ˆ°(€€Èè€‰I%9!I}Q=9}5AA%9ˆ°(€€Ìè€‰%9=9}Q=9}5AA%9ˆ°(€€Ğè€‰M}%15%}Q=9}5AA%9ˆ°(€€Øè€‰a}Q=9}5AA%9ˆ°(€€Üè€‰9UQI1}Q=9}5AA%9ˆ°(€€Ôè€‰UMQ=5}Q=9}5AA%9ˆ)ôì)™Õ¹Ñ¥½¸­Ô¡”°Ğ°¤°¸°È°Ì¤ì(€½¹ÍĞ„€ô¹•Ü±¤¡Ğ°¤°ì(€€€ÑåÁ”è”°(€€€‘•ÁÑ¡	Õ™™•ÈèÈ°(€€€ÍÑ•¹¥±	Õ™™•ÈèÌ°(€€€Í…µÁ±•Ìè¸€ü€Ğ€è€À°(€€€‘•ÁÑ¡Q•áÑÕÉ”èÈ€ü¹•Üå¸¡Ğ°¤¤€èÙ½¥€À(€ô¤°¼€ô¹•Ü±¤¡Ğ°¤°ì(€€€ÑåÁ”èa¤°(€€€‘•ÁÑ¡	Õ™™•Èè€„Ä°(€€€ÍÑ•¹¥±	Õ™™•Èè€„Ä(€ô¤°°€ô¹•ÜEĞ ¤ì(€°¹Í•ÑÑÑÉ¥‰ÕÑ” ‰Á½Í¥Ñ¥½¸ˆ°¹•Ü9Ğ¡l(€€€€´Ä°(€€€€Ì°(€€€€À°(€€€€´Ä°(€€€€´Ä°(€€€€À°(€€€€Ì°(€€€€´Ä°(€€€€À(€t°€Ì¤¤°°¹Í•ÑÑÑÉ¥‰ÕÑ” ‰ÕØˆ°¹•Ü9Ğ¡l(€€€€À°(€€€€È°(€€€€À°(€€€€À°(€€€€È°(€€€€À(€t°€È¤¤ì(€½¹ÍĞŒ€ô¹•Ü9 ¡ì(€€€Õ¹¥™½ÉµÌèìÑ¥™™ÕÍ”èìÙ…±Õ”è¹Õ±°ôô°(€€€Ù•ÉÑ•áM¡…‘•Èè€($$%ÁÉ•¥Í¥½¸¡¥¡À™±½…Ğì(($$%Õ¹¥™½É´µ…ĞĞµ½‘•±Y¥•İ5…ÑÉ¥àì($$%Õ¹¥™½É´µ…ĞĞÁÉ½©•Ñ¥½¹5…ÑÉ¥àì(($$%…ÑÑÉ¥‰ÕÑ”Ù•ŒÌÁ½Í¥Ñ¥½¸ì($$%…ÑÑÉ¥‰ÕÑ”Ù•ŒÈÕØì(($$%Ù…Éå¥¹œÙ•ŒÈÙUØì(($$%Ù½¥µ…¥¸ ¤ì($$$%ÙUØ€ôÕØì($$$%±}A½Í¥Ñ¥½¸€ôÁÉ½©•Ñ¥½¹5…ÑÉ¥à€¨µ½‘•±Y¥•İ5…ÑÉ¥à€¨Ù•ŒĞ Á½Í¥Ñ¥½¸°€Ä¸À€¤ì($$%õ€°(€€€™É…µ•¹ÑM¡…‘•Èè€($$%ÁÉ•¥Í¥½¸¡¥¡À™±½…Ğì(($$%Õ¹¥™½É´Í…µÁ±•ÈÉÑ¥™™ÕÍ”ì(($$%Ù…Éå¥¹œÙ•ŒÈÙUØì(($$$¥¹±Õ‘”€ñÑ½¹•µ…ÁÁ¥¹}Á…ÉÍ}™É…µ•¹Ğø($$$¥¹±Õ‘”€ñ½±½ÉÍÁ…•}Á…ÉÍ}™É…µ•¹Ğø(($$%Ù½¥µ…¥¸ ¤ì($$$%±}É…½±½È€ôÑ•áÑÕÉ”É Ñ¥™™ÕÍ”°ÙUØ€¤ì(($$$$¥™‘•˜1%9I}Q=9}5AA%9($$$$%±}É…½±½È¹Éˆ€ô1¥¹•…ÉQ½¹•5…ÁÁ¥¹œ ±}É…½±½È¹Éˆ€¤ì($$$$•±¥˜‘•™¥¹• I%9!I}Q=9}5AA%9€¤($$$$%±}É…½±½È¹Éˆ€ôI•¥¹¡…É‘Q½¹•5…ÁÁ¥¹œ ±}É…½±½È¹Éˆ€¤ì($$$$•±¥˜‘•™¥¹• %9=9}Q=9}5AA%9€¤($$$$%±}É…½±½È¹Éˆ€ô¥¹•½¹Q½¹•5…ÁÁ¥¹œ ±}É…½±½È¹Éˆ€¤ì($$$$•±¥˜‘•™¥¹• M}%15%}Q=9}5AA%9€¤($$$$%±}É…½±½È¹Éˆ€ôM¥±µ¥Q½¹•5…ÁÁ¥¹œ ±}É…½±½È¹Éˆ€¤ì($$$$•±¥˜‘•™¥¹• a}Q=9}5AA%9€¤($$$$%±}É…½±½È¹Éˆ€ôaQ½¹•5…ÁÁ¥¹œ ±}É…½±½È¹Éˆ€¤ì($$$$•±¥˜‘•™¥¹• 9UQI1}Q=9}5AA%9€¤($$$$%±}É…½±½È¹Éˆ€ô9•ÕÑÉ…±Q½¹•5…ÁÁ¥¹œ ±}É…½±½È¹Éˆ€¤ì($$$$•±¥˜‘•™¥¹• UMQ=5}Q=9}5AA%9€¤($$$$%±}É…½±½È¹Éˆ€ôÕÍÑ½µQ½¹•5…ÁÁ¥¹œ ±}É…½±½È¹Éˆ€¤ì($$$$•¹‘¥˜(($$$$¥™‘•˜MI	}QI9MH($$$$%±}É…½±½È€ôÍI	QÉ…¹Í™•É=Q ±}É…½±½È€¤ì($$$$•¹‘¥˜($$%õ€°(€€€‘•ÁÑ¡Q•ÍĞè€„Ä°(€€€‘•ÁÑ¡]É¥Ñ”è€„Ä(€ô¤° €ô¹•ÜĞ¡°°Œ¤°€ô¹•Ü©È ´Ä°€Ä°€Ä°€´Ä°€À°€Ä¤ì(€±•ĞÔ€ô¹Õ±°°À€ô¹Õ±°°Ø€ô€„Ä°ˆ°´€ô¹Õ±°°˜€ômt°P€ô€„Äì(€Ñ¡¥Ì¹Í•ÑM¥é”€ô™Õ¹Ñ¥½¸¡°4¤ì(€€€„¹Í•ÑM¥é”¡°4¤°¼¹Í•ÑM¥é”¡°4¤ì(€€€™½È€¡±•Ğ€ô€Àì€ğ˜¹±•¹Ñ ì¬¬¤ì(€€€€€½¹ÍĞH€ô™mtì(€€€€€H¹Í•ÑM¥é”€˜˜H¹Í•ÑM¥é”¡°4¤ì(€€€ô(€ô°Ñ¡¥Ì¹Í•Ñ™™•ÑÌ€ô™Õ¹Ñ¥½¸¡¤ì(€€€˜€ô°P€ô˜¹±•¹Ñ €ø€À€˜˜™lÁt¹¥ÍI•¹‘•ÉA…ÍÌ€ôôô€„Àì(€€€½¹ÍĞ4€ô„¹İ¥‘Ñ °€ô„¹¡•¥¡Ğì(€€€™½È€¡±•ĞH€ô€ÀìH€ğ˜¹±•¹Ñ ìH¬¬¤ì(€€€€€½¹ÍĞ€ô™mItì(€€€€€¹Í•ÑM¥é”€˜˜¹Í•ÑM¥é”¡4°¤ì(€€€ô(€ô°Ñ¡¥Ì¹‰•¥¸€ô™Õ¹Ñ¥½¸¡°4¤ì(€€€¥˜€¡Øñğ¹Ñ½¹•5…ÁÁ¥¹œ€ôôô€À€˜˜˜¹±•¹Ñ €ôôô€À¤É•ÑÕÉ¸€„Äì(€€€¥˜€¡´€ô4°4€„ôô¹Õ±°¤ì(€€€€€½¹ÍĞ€ô4¹İ¥‘Ñ °H€ô4¹¡•¥¡Ğì(€€€€€€¡„¹İ¥‘Ñ €„ôôñğ„¹¡•¥¡Ğ€„ôôH¤€˜˜Ñ¡¥Ì¹Í•ÑM¥é”¡°H¤ì(€€€ô(€€€É•ÑÕÉ¸P€ôôô€„Ä€˜˜¹Í•ÑI•¹‘•ÉQ…É•Ğ¡„¤°ˆ€ô¹Ñ½¹•5…ÁÁ¥¹œ°¹Ñ½¹•5…ÁÁ¥¹œ€ô€À°€„Àì(€ô°Ñ¡¥Ì¹¡…ÍI•¹‘•ÉA…ÍÌ€ô™Õ¹Ñ¥½¸ ¤ì(€€€É•ÑÕÉ¸Pì(€ô°Ñ¡¥Ì¹•¹€ô™Õ¹Ñ¥½¸¡°4¤ì(€€€¹Ñ½¹•5…ÁÁ¥¹œ€ôˆ°Ø€ô€„Àì(€€€±•Ğ€ô„°H€ô¼ì(€€€™½È€¡±•Ğ€ô€Àì€ğ˜¹±•¹Ñ ì¬¬¤ì(€€€€€½¹ÍĞœ€ô™mtì(€€€€€¥˜€¡œ¹•¹…‰±•€„ôô€„Ä€˜˜€¡œ¹É•¹‘•È¡°H°°4¤°œ¹¹••‘ÍMİ…À€„ôô€„Ä¤¤ì(€€€€€€€½¹ÍĞä€ôì(€€€€€€€€ôH°H€ôäì(€€€€€ô(€€€ô(€€€¥˜€¡Ô€„ôô¹½ÕÑÁÕÑ½±½ÉMÁ…”ñğÀ€„ôô¹Ñ½¹•5…ÁÁ¥¹œ¤ì(€€€€€Ô€ô¹½ÕÑÁÕÑ½±½ÉMÁ…”°À€ô¹Ñ½¹•5…ÁÁ¥¹œ°Œ¹‘•™¥¹•Ì€ôíô°!”¹•ÑQÉ…¹Í™•È¡Ô¤€ôôô€‰ÍÉˆˆ€˜˜€¡Œ¹‘•™¥¹•Ì¹MI	}QI9MH€ô€ˆˆ¤ì(€€€€€½¹ÍĞ€ô=ÕmÁtì(€€€€€€˜˜€¡Œ¹‘•™¥¹•Ímt€ô€ˆˆ¤°Œ¹¹••‘ÍUÁ‘…Ñ”€ô€„Àì(€€€ô(€€€Œ¹Õ¹¥™½ÉµÌ¹Ñ¥™™ÕÍ”¹Ù…±Õ”€ô¹Ñ•áÑÕÉ”°¹Í•ÑI•¹‘•ÉQ…É•Ğ¡´¤°¹É•¹‘•È¡ °¤°´€ô¹Õ±°°Ø€ô€„Äì(€ô°Ñ¡¥Ì¹¥Í½µÁ½Í¥Ñ¥¹œ€ô™Õ¹Ñ¥½¸ ¤ì(€€€É•ÑÕÉ¸Øì(€ô°Ñ¡¥Ì¹‘¥ÍÁ½Í”€ô™Õ¹Ñ¥½¸ ¤ì(€€€„¹‘•ÁÑ¡Q•áÑÕÉ”€˜˜„¹‘•ÁÑ¡Q•áÑÕÉ”¹‘¥ÍÁ½Í” ¤°„¹‘¥ÍÁ½Í” ¤°¼¹‘¥ÍÁ½Í” ¤°°¹‘¥ÍÁ½Í” ¤°Œ¹‘¥ÍÁ½Í” ¤ì(€ôì)ô)Ù…Èá°€ô€¼¨}}AUI}|€¨¼¹•ÜUĞ ¤°Ì€ô€¼¨}}AUI}|€¨¼¹•Üå¸ Ä°€Ä¤°M°€ô€¼¨}}AUI}|€¨¼¹•Üe¼ ¤°å°€ô€¼¨}}AUI}|€¨¼¹•Ü•  ¤°°€ô€¼¨}}AUI}|€¨¼¹•Ü½° ¤°É¼€ômt°Í¼€ômt°…¼€ô¹•Ü±½…ĞÌÉÉÉ…ä ÄØ¤°½¼€ô¹•Ü±½…ĞÌÉÉÉ…ä ä¤°±¼€ô¹•Ü±½…ĞÌÉÉÉ…ä Ğ¤ì)™Õ¹Ñ¥½¸A¸¡”°Ğ°¤¤ì(€½¹ÍĞ¸€ô•lÁtì(€¥˜€¡¸€ğô€Àñğ¸€ø€À¤É•ÑÕÉ¸”ì(€½¹ÍĞÈ€ôĞ€¨¤ì(€±•ĞÌ€ôÉ½mÉtì(€¥˜€¡Ì€ôôôÙ½¥€À€˜˜€¡Ì€ô¹•Ü±½…ĞÌÉÉÉ…ä¡È¤°É½mÉt€ôÌ¤°Ğ€„ôô€À¤ì(€€€¸¹Ñ½ÉÉ…ä¡Ì°€À¤ì(€€€™½È€¡±•Ğ„€ô€Ä°¼€ô€Àì„€„ôôĞì€¬­„¤(€€€€€¼€¬ô¤°•m…t¹Ñ½ÉÉ…ä¡Ì°¼¤ì(€ô(€É•ÑÕÉ¸Ìì)ô)™Õ¹Ñ¥½¸µĞ¡”°Ğ¤ì(€¥˜€¡”¹±•¹Ñ €„ôôĞ¹±•¹Ñ ¤É•ÑÕÉ¸€„Äì(€™½È€¡±•Ğ¤€ô€À°¸€ô”¹±•¹Ñ ì¤€ğ¸ì¤¬¬¤¥˜€¡•m¥t€„ôôÑm¥t¤É•ÑÕÉ¸€„Äì(€É•ÑÕÉ¸€„Àì)ô)™Õ¹Ñ¥½¸Ğ¡”°Ğ¤ì(€™½È€¡±•Ğ¤€ô€À°¸€ôĞ¹±•¹Ñ ì¤€ğ¸ì¤¬¬¤•m¥t€ôÑm¥tì)ô)™Õ¹Ñ¥½¸)È¡”°Ğ¤ì(€±•Ğ¤€ôÍ½mÑtì(€¤€ôôôÙ½¥€À€˜˜€¡¤€ô¹•Ü%¹ĞÌÉÉÉ…ä¡Ğ¤°Í½mÑt€ô¤¤ì(€™½È€¡±•Ğ¸€ô€Àì¸€„ôôĞì€¬­¸¤¥m¹t€ô”¹…±±½…Ñ•Q•áÑÕÉ•U¹¥Ğ ¤ì(€É•ÑÕÉ¸¤ì)ô)™Õ¹Ñ¥½¸	Ô¡”°Ğ¤ì(€½¹ÍĞ¤€ôÑ¡¥Ì¹…¡”ì(€¥lÁt€„ôôĞ€˜˜€¡”¹Õ¹¥™½É´Å˜¡Ñ¡¥Ì¹…‘‘È°Ğ¤°¥lÁt€ôĞ¤ì)ô)™Õ¹Ñ¥½¸éÔ¡”°Ğ¤ì(€½¹ÍĞ¤€ôÑ¡¥Ì¹…¡”ì(€¥˜€¡Ğ¹à€„ôôÙ½¥€À¤(€€€€¡¥lÁt€„ôôĞ¹àñğ¥lÅt€„ôôĞ¹ä¤€˜˜€¡”¹Õ¹¥™½É´É˜¡Ñ¡¥Ì¹…‘‘È°Ğ¹à°Ğ¹ä¤°¥lÁt€ôĞ¹à°¥lÅt€ôĞ¹ä¤ì(€•±Í”ì(€€€¥˜€¡µĞ¡¤°Ğ¤¤É•ÑÕÉ¸ì(€€€”¹Õ¹¥™½É´É™Ø¡Ñ¡¥Ì¹…‘‘È°Ğ¤°Ğ¡¤°Ğ¤ì(€ô)ô)™Õ¹Ñ¥½¸Ô¡”°Ğ¤ì(€½¹ÍĞ¤€ôÑ¡¥Ì¹…¡”ì(€¥˜€¡Ğ¹à€„ôôÙ½¥€À¤(€€€€¡¥lÁt€„ôôĞ¹àñğ¥lÅt€„ôôĞ¹äñğ¥lÉt€„ôôĞ¹è¤€˜˜€¡”¹Õ¹¥™½É´Í˜¡Ñ¡¥Ì¹…‘‘È°Ğ¹à°Ğ¹ä°Ğ¹è¤°¥lÁt€ôĞ¹à°¥lÅt€ôĞ¹ä°¥lÉt€ôĞ¹è¤ì(€•±Í”¥˜€¡Ğ¹È€„ôôÙ½¥€À¤(€€€€¡¥lÁt€„ôôĞ¹Èñğ¥lÅt€„ôôĞ¹œñğ¥lÉt€„ôôĞ¹ˆ¤€˜˜€¡”¹Õ¹¥™½É´Í˜¡Ñ¡¥Ì¹…‘‘È°Ğ¹È°Ğ¹œ°Ğ¹ˆ¤°¥lÁt€ôĞ¹È°¥lÅt€ôĞ¹œ°¥lÉt€ôĞ¹ˆ¤ì(€•±Í”ì(€€€¥˜€¡µĞ¡¤°Ğ¤¤É•ÑÕÉ¸ì(€€€”¹Õ¹¥™½É´Í™Ø¡Ñ¡¥Ì¹…‘‘È°Ğ¤°Ğ¡¤°Ğ¤ì(€ô)ô)™Õ¹Ñ¥½¸YÔ¡”°Ğ¤ì(€½¹ÍĞ¤€ôÑ¡¥Ì¹…¡”ì(€¥˜€¡Ğ¹à€„ôôÙ½¥€À¤(€€€€¡¥lÁt€„ôôĞ¹àñğ¥lÅt€„ôôĞ¹äñğ¥lÉt€„ôôĞ¹èñğ¥lÍt€„ôôĞ¹Ü¤€˜˜€¡”¹Õ¹¥™½É´Ñ˜¡Ñ¡¥Ì¹…‘‘È°Ğ¹à°Ğ¹ä°Ğ¹è°Ğ¹Ü¤°¥lÁt€ôĞ¹à°¥lÅt€ôĞ¹ä°¥lÉt€ôĞ¹è°¥lÍt€ôĞ¹Ü¤ì(€•±Í”ì(€€€¥˜€¡µĞ¡¤°Ğ¤¤É•ÑÕÉ¸ì(€€€”¹Õ¹¥™½É´Ñ™Ø¡Ñ¡¥Ì¹…‘‘È°Ğ¤°Ğ¡¤°Ğ¤ì(€ô)ô)™Õ¹Ñ¥½¸!Ô¡”°Ğ¤ì(€½¹ÍĞ¤€ôÑ¡¥Ì¹…¡”°¸€ôĞ¹•±•µ•¹ÑÌì(€¥˜€¡¸€ôôôÙ½¥€À¤ì(€€€¥˜€¡µĞ¡¤°Ğ¤¤É•ÑÕÉ¸ì(€€€”¹Õ¹¥™½Éµ5…ÑÉ¥àÉ™Ø¡Ñ¡¥Ì¹…‘‘È°€„Ä°Ğ¤°Ğ¡¤°Ğ¤ì(€ô•±Í”ì(€€€¥˜€¡µĞ¡¤°¸¤¤É•ÑÕÉ¸ì(€€€±¼¹Í•Ğ¡¸¤°”¹Õ¹¥™½Éµ5…ÑÉ¥àÉ™Ø¡Ñ¡¥Ì¹…‘‘È°€„Ä°±¼¤°Ğ¡¤°¸¤ì(€ô)ô)™Õ¹Ñ¥½¸]Ô¡”°Ğ¤ì(€½¹ÍĞ¤€ôÑ¡¥Ì¹…¡”°¸€ôĞ¹•±•µ•¹ÑÌì(€¥˜€¡¸€ôôôÙ½¥€À¤ì(€€€¥˜€¡µĞ¡¤°Ğ¤¤É•ÑÕÉ¸ì(€€€”¹Õ¹¥™½Éµ5…ÑÉ¥àÍ™Ø¡Ñ¡¥Ì¹…‘‘È°€„Ä°Ğ¤°Ğ¡¤°Ğ¤ì(€ô•±Í”ì(€€€¥˜€¡µĞ¡¤°¸¤¤É•ÑÕÉ¸ì(€€€½¼¹Í•Ğ¡¸¤°”¹Õ¹¥™½Éµ5…ÑÉ¥àÍ™Ø¡Ñ¡¥Ì¹…‘‘È°€„Ä°½¼¤°Ğ¡¤°¸¤ì(€ô)ô)™Õ¹Ñ¥½¸ÅÔ¡”°Ğ¤ì(€½¹ÍĞ¤€ôÑ¡¥Ì¹…¡”°¸€ôĞ¹•±•µ•¹ÑÌì(€¥˜€¡¸€ôôôÙ½¥€À¤ì(€€€¥˜€¡µĞ¡¤°Ğ¤¤É•ÑÕÉ¸ì(€€€”¹Õ¹¥™½Éµ5…ÑÉ¥àÑ™Ø¡Ñ¡¥Ì¹…‘‘È°€„Ä°Ğ¤°Ğ¡¤°Ğ¤ì(€ô•±Í”ì(€€€¥˜€¡µĞ¡¤°¸¤¤É•ÑÕÉ¸ì(€€€…¼¹Í•Ğ¡¸¤°”¹Õ¹¥™½Éµ5…ÑÉ¥àÑ™Ø¡Ñ¡¥Ì¹…‘‘È°€„Ä°…¼¤°Ğ¡¤°¸¤ì(€ô)ô)™Õ¹Ñ¥½¸aÔ¡”°Ğ¤ì(€½¹ÍĞ¤€ôÑ¡¥Ì¹…¡”ì(€¥lÁt€„ôôĞ€˜˜€¡”¹Õ¹¥™½É´Å¤¡Ñ¡¥Ì¹…‘‘È°Ğ¤°¥lÁt€ôĞ¤ì)ô)™Õ¹Ñ¥½¸-Ô¡”°Ğ¤ì(€½¹ÍĞ¤€ôÑ¡¥Ì¹…¡”ì(€¥˜€¡Ğ¹à€„ôôÙ½¥€À¤(€€€€¡¥lÁt€„ôôĞ¹àñğ¥lÅt€„ôôĞ¹ä¤€˜˜€¡”¹Õ¹¥™½É´É¤¡Ñ¡¥Ì¹…‘‘È°Ğ¹à°Ğ¹ä¤°¥lÁt€ôĞ¹à°¥lÅt€ôĞ¹ä¤ì(€•±Í”ì(€€€¥˜€¡µĞ¡¤°Ğ¤¤É•ÑÕÉ¸ì(€€€”¹Õ¹¥™½É´É¥Ø¡Ñ¡¥Ì¹…‘‘È°Ğ¤°Ğ¡¤°Ğ¤ì(€ô)ô)™Õ¹Ñ¥½¸©Ô¡”°Ğ¤ì(€½¹ÍĞ¤€ôÑ¡¥Ì¹…¡”ì(€¥˜€¡Ğ¹à€„ôôÙ½¥€À¤(€€€€¡¥lÁt€„ôôĞ¹àñğ¥lÅt€„ôôĞ¹äñğ¥lÉt€„ôôĞ¹è¤€˜˜€¡”¹Õ¹¥™½É´Í¤¡Ñ¡¥Ì¹…‘‘È°Ğ¹à°Ğ¹ä°Ğ¹è¤°¥lÁt€ôĞ¹à°¥lÅt€ôĞ¹ä°¥lÉt€ôĞ¹è¤ì(€•±Í”ì(€€€¥˜€¡µĞ¡¤°Ğ¤¤É•ÑÕÉ¸ì(€€€”¹Õ¹¥™½É´Í¥Ø¡Ñ¡¥Ì¹…‘‘È°Ğ¤°Ğ¡¤°Ğ¤ì(€ô)ô)™Õ¹Ñ¥½¸eÔ¡”°Ğ¤ì(€½¹ÍĞ¤€ôÑ¡¥Ì¹…¡”ì(€¥˜€¡Ğ¹à€„ôôÙ½¥€À¤(€€€€¡¥lÁt€„ôôĞ¹àñğ¥lÅt€„ôôĞ¹äñğ¥lÉt€„ôôĞ¹èñğ¥lÍt€„ôôĞ¹Ü¤€˜˜€¡”¹Õ¹¥™½É´Ñ¤¡Ñ¡¥Ì¹…‘‘È°Ğ¹à°Ğ¹ä°Ğ¹è°Ğ¹Ü¤°¥lÁt€ôĞ¹à°¥lÅt€ôĞ¹ä°¥lÉt€ôĞ¹è°¥lÍt€ôĞ¹Ü¤ì(€•±Í”ì(€€€¥˜€¡µĞ¡¤°Ğ¤¤É•ÑÕÉ¸ì(€€€”¹Õ¹¥™½É´Ñ¥Ø¡Ñ¡¥Ì¹…‘‘È°Ğ¤°Ğ¡¤°Ğ¤ì(€ô)ô)™Õ¹Ñ¥½¸)Ô¡”°Ğ¤ì(€½¹ÍĞ¤€ôÑ¡¥Ì¹…¡”ì(€¥lÁt€„ôôĞ€˜˜€¡”¹Õ¹¥™½É´ÅÕ¤¡Ñ¡¥Ì¹…‘‘È°Ğ¤°¥lÁt€ôĞ¤ì)ô)™Õ¹Ñ¥½¸iÔ¡”°Ğ¤ì(€½¹ÍĞ¤€ôÑ¡¥Ì¹…¡”ì(€¥˜€¡Ğ¹à€„ôôÙ½¥€À¤(€€€€¡¥lÁt€„ôôĞ¹àñğ¥lÅt€„ôôĞ¹ä¤€˜˜€¡”¹Õ¹¥™½É´ÉÕ¤¡Ñ¡¥Ì¹…‘‘È°Ğ¹à°Ğ¹ä¤°¥lÁt€ôĞ¹à°¥lÅt€ôĞ¹ä¤ì(€•±Í”ì(€€€¥˜€¡µĞ¡¤°Ğ¤¤É•ÑÕÉ¸ì(€€€”¹Õ¹¥™½É´ÉÕ¥Ø¡Ñ¡¥Ì¹…‘‘È°Ğ¤°Ğ¡¤°Ğ¤ì(€ô)ô)™Õ¹Ñ¥½¸€‘Ô¡”°Ğ¤ì(€½¹ÍĞ¤€ôÑ¡¥Ì¹…¡”ì(€¥˜€¡Ğ¹à€„ôôÙ½¥€À¤(€€€€¡¥lÁt€„ôôĞ¹àñğ¥lÅt€„ôôĞ¹äñğ¥lÉt€„ôôĞ¹è¤€˜˜€¡”¹Õ¹¥™½É´ÍÕ¤¡Ñ¡¥Ì¹…‘‘È°Ğ¹à°Ğ¹ä°Ğ¹è¤°¥lÁt€ôĞ¹à°¥lÅt€ôĞ¹ä°¥lÉt€ôĞ¹è¤ì(€•±Í”ì(€€€¥˜€¡µĞ¡¤°Ğ¤¤É•ÑÕÉ¸ì(€€€”¹Õ¹¥™½É´ÍÕ¥Ø¡Ñ¡¥Ì¹…‘‘È°Ğ¤°Ğ¡¤°Ğ¤ì(€ô)ô)™Õ¹Ñ¥½¸EÔ¡”°Ğ¤ì(€½¹ÍĞ¤€ôÑ¡¥Ì¹…¡”ì(€¥˜€¡Ğ¹à€„ôôÙ½¥€À¤(€€€€¡¥lÁt€„ôôĞ¹àñğ¥lÅt€„ôôĞ¹äñğ¥lÉt€„ôôĞ¹èñğ¥lÍt€„ôôĞ¹Ü¤€˜˜€¡”¹Õ¹¥™½É´ÑÕ¤¡Ñ¡¥Ì¹…‘‘È°Ğ¹à°Ğ¹ä°Ğ¹è°Ğ¹Ü¤°¥lÁt€ôĞ¹à°¥lÅt€ôĞ¹ä°¥lÉt€ôĞ¹è°¥lÍt€ôĞ¹Ü¤ì(€•±Í”ì(€€€¥˜€¡µĞ¡¤°Ğ¤¤É•ÑÕÉ¸ì(€€€”¹Õ¹¥™½É´ÑÕ¥Ø¡Ñ¡¥Ì¹…‘‘È°Ğ¤°Ğ¡¤°Ğ¤ì(€ô)ô)™Õ¹Ñ¥½¸•¡”°Ğ°¤¤ì(€½¹ÍĞ¸€ôÑ¡¥Ì¹…¡”°È€ô¤¹…±±½…Ñ•Q•áÑÕÉ•U¹¥Ğ ¤ì(€¹lÁt€„ôôÈ€˜˜€¡”¹Õ¹¥™½É´Å¤¡Ñ¡¥Ì¹…‘‘È°È¤°¹lÁt€ôÈ¤ì(€±•ĞÌì(€Ñ¡¥Ì¹ÑåÁ”€ôôô”¹M5A1I|É}M!=\€ü€¡Ì¹½µÁ…É•Õ¹Ñ¥½¸€ô¤¹¥ÍI•Ù•ÉÍ•‘•ÁÑ¡	Õ™™•È ¤€ü€ÔÄà€è€ÔÄÔ°Ì€ôÌ¤€èÌ€ôá°°¤¹Í•ÑQ•áÑÕÉ”É¡ĞñğÌ°È¤ì)ô)™Õ¹Ñ¥½¸Ñ¡”°Ğ°¤¤ì(€½¹ÍĞ¸€ôÑ¡¥Ì¹…¡”°È€ô¤¹…±±½…Ñ•Q•áÑÕÉ•U¹¥Ğ ¤ì(€¹lÁt€„ôôÈ€˜˜€¡”¹Õ¹¥™½É´Å¤¡Ñ¡¥Ì¹…‘‘È°È¤°¹lÁt€ôÈ¤°¤¹Í•ÑQ•áÑÕÉ”Í¡Ğñğå°°È¤ì)ô)™Õ¹Ñ¥½¸¥¡”°Ğ°¤¤ì(€½¹ÍĞ¸€ôÑ¡¥Ì¹…¡”°È€ô¤¹…±±½…Ñ•Q•áÑÕÉ•U¹¥Ğ ¤ì(€¹lÁt€„ôôÈ€˜˜€¡”¹Õ¹¥™½É´Å¤¡Ñ¡¥Ì¹…‘‘È°È¤°¹lÁt€ôÈ¤°¤¹Í•ÑQ•áÑÕÉ•Õ‰”¡Ğñğ°°È¤ì)ô)™Õ¹Ñ¥½¸¹¡”°Ğ°¤¤ì(€½¹ÍĞ¸€ôÑ¡¥Ì¹…¡”°È€ô¤¹…±±½…Ñ•Q•áÑÕÉ•U¹¥Ğ ¤ì(€¹lÁt€„ôôÈ€˜˜€¡”¹Õ¹¥™½É´Å¤¡Ñ¡¥Ì¹…‘‘È°È¤°¹lÁt€ôÈ¤°¤¹Í•ÑQ•áÑÕÉ”ÉÉÉ…ä¡ĞñğM°°È¤ì)ô)™Õ¹Ñ¥½¸É¡”¤ì(€Íİ¥Ñ €¡”¤ì(€€€…Í”€ÔÄÈØè(€€€€€É•ÑÕÉ¸	Ôì(€€€…Í”€ÌÔØØĞè(€€€€€É•ÑÕÉ¸éÔì(€€€…Í”€ÌÔØØÔè(€€€€€É•ÑÕÉ¸Ôì(€€€…Í”€ÌÔØØØè(€€€€€É•ÑÕÉ¸YÔì(€€€…Í”€ÌÔØÜĞè(€€€€€É•ÑÕÉ¸!Ôì(€€€…Í”€ÌÔØÜÔè(€€€€€É•ÑÕÉ¸]Ôì(€€€…Í”€ÌÔØÜØè(€€€€€É•ÑÕÉ¸ÅÔì(€€€…Í”€ÔÄÈĞè(€€€…Í”€ÌÔØÜÀè(€€€€€É•ÑÕÉ¸aÔì(€€€…Í”€ÌÔØØÜè(€€€…Í”€ÌÔØÜÄè(€€€€€É•ÑÕÉ¸-Ôì(€€€…Í”€ÌÔØØàè(€€€…Í”€ÌÔØÜÈè(€€€€€É•ÑÕÉ¸©Ôì(€€€…Í”€ÌÔØØäè(€€€…Í”€ÌÔØÜÌè(€€€€€É•ÑÕÉ¸eÔì(€€€…Í”€ÔÄÈÔè(€€€€€É•ÑÕÉ¸)Ôì(€€€…Í”€ÌØÈäĞè(€€€€€É•ÑÕÉ¸iÔì(€€€…Í”€ÌØÈäÔè(€€€€€É•ÑÕÉ¸€‘Ôì(€€€…Í”€ÌØÈäØè(€€€€€É•ÑÕÉ¸EÔì(€€€…Í”€ÌÔØÜàè(€€€…Í”€ÌØÄäàè(€€€…Í”€ÌØÈäàè(€€€…Í”€ÌØÌÀØè(€€€…Í”€ÌÔØàÈè(€€€€€É•ÑÕÉ¸•ì(€€€…Í”€ÌÔØÜäè(€€€…Í”€ÌØÈääè(€€€…Í”€ÌØÌÀÜè(€€€€€É•ÑÕÉ¸Ñì(€€€…Í”€ÌÔØàÀè(€€€…Í”€ÌØÌÀÀè(€€€…Í”€ÌØÌÀàè(€€€…Í”€ÌØÈäÌè(€€€€€É•ÑÕÉ¸¥ì(€€€…Í”€ÌØÈàäè(€€€…Í”€ÌØÌÀÌè(€€€…Í”€ÌØÌÄÄè(€€€…Í”€ÌØÈäÈè(€€€€€É•ÑÕÉ¸¹ì(€ô)ô)™Õ¹Ñ¥½¸Í¡”°Ğ¤ì(€”¹Õ¹¥™½É´Å™Ø¡Ñ¡¥Ì¹…‘‘È°Ğ¤ì)ô)™Õ¹Ñ¥½¸…¡”°Ğ¤ì(€½¹ÍĞ¤€ôA¸¡Ğ°Ñ¡¥Ì¹Í¥é”°€È¤ì(€”¹Õ¹¥™½É´É™Ø¡Ñ¡¥Ì¹…‘‘È°¤¤ì)ô)™Õ¹Ñ¥½¸½¡”°Ğ¤ì(€½¹ÍĞ¤€ôA¸¡Ğ°Ñ¡¥Ì¹Í¥é”°€Ì¤ì(€”¹Õ¹¥™½É´Í™Ø¡Ñ¡¥Ì¹…‘‘È°¤¤ì)ô)™Õ¹Ñ¥½¸±¡”°Ğ¤ì(€½¹ÍĞ¤€ôA¸¡Ğ°Ñ¡¥Ì¹Í¥é”°€Ğ¤ì(€”¹Õ¹¥™½É´Ñ™Ø¡Ñ¡¥Ì¹…‘‘È°¤¤ì)ô)™Õ¹Ñ¥½¸¡”°Ğ¤ì(€½¹ÍĞ¤€ôA¸¡Ğ°Ñ¡¥Ì¹Í¥é”°€Ğ¤ì(€”¹Õ¹¥™½Éµ5…ÑÉ¥àÉ™Ø¡Ñ¡¥Ì¹…‘‘È°€„Ä°¤¤ì)ô)™Õ¹Ñ¥½¸¡¡”°Ğ¤ì(€½¹ÍĞ¤€ôA¸¡Ğ°Ñ¡¥Ì¹Í¥é”°€ä¤ì(€”¹Õ¹¥™½Éµ5…ÑÉ¥àÍ™Ø¡Ñ¡¥Ì¹…‘‘È°€„Ä°¤¤ì)ô)™Õ¹Ñ¥½¸Õ¡”°Ğ¤ì(€½¹ÍĞ¤€ôA¸¡Ğ°Ñ¡¥Ì¹Í¥é”°€ÄØ¤ì(€”¹Õ¹¥™½Éµ5…ÑÉ¥àÑ™Ø¡Ñ¡¥Ì¹…‘‘È°€„Ä°¤¤ì)ô)™Õ¹Ñ¥½¸‘¡”°Ğ¤ì(€”¹Õ¹¥™½É´Å¥Ø¡Ñ¡¥Ì¹…‘‘È°Ğ¤ì)ô)™Õ¹Ñ¥½¸™¡”°Ğ¤ì(€”¹Õ¹¥™½É´É¥Ø¡Ñ¡¥Ì¹…‘‘È°Ğ¤ì)ô)™Õ¹Ñ¥½¸Á¡”°Ğ¤ì(€”¹Õ¹¥™½É´Í¥Ø¡Ñ¡¥Ì¹…‘‘È°Ğ¤ì)ô)™Õ¹Ñ¥½¸µ¡”°Ğ¤ì(€”¹Õ¹¥™½É´Ñ¥Ø¡Ñ¡¥Ì¹…‘‘È°Ğ¤ì)ô)™Õ¹Ñ¥½¸¡”°Ğ¤ì(€”¹Õ¹¥™½É´ÅÕ¥Ø¡Ñ¡¥Ì¹…‘‘È°Ğ¤ì)ô)™Õ¹Ñ¥½¸}¡”°Ğ¤ì(€”¹Õ¹¥™½É´ÉÕ¥Ø¡Ñ¡¥Ì¹…‘‘È°Ğ¤ì)ô)™Õ¹Ñ¥½¸Ù¡”°Ğ¤ì(€”¹Õ¹¥™½É´ÍÕ¥Ø¡Ñ¡¥Ì¹…‘‘È°Ğ¤ì)ô)™Õ¹Ñ¥½¸‰¡”°Ğ¤ì(€”¹Õ¹¥™½É´ÑÕ¥Ø¡Ñ¡¥Ì¹…‘‘È°Ğ¤ì)ô)™Õ¹Ñ¥½¸5¡”°Ğ°¤¤ì(€½¹ÍĞ¸€ôÑ¡¥Ì¹…¡”°È€ôĞ¹±•¹Ñ °Ì€ô)È¡¤°È¤ì(€µĞ¡¸°Ì¤ñğ€¡”¹Õ¹¥™½É´Å¥Ø¡Ñ¡¥Ì¹…‘‘È°Ì¤°Ğ¡¸°Ì¤¤ì(€±•Ğ„ì(€Ñ¡¥Ì¹ÑåÁ”€ôôô”¹M5A1I|É}M!=\€ü„€ôÌ€è„€ôá°ì(€™½È€¡±•Ğ¼€ô€Àì¼€„ôôÈì€¬­¼¤¤¹Í•ÑQ•áÑÕÉ”É¡Ñm½tñğ„°Ím½t¤ì)ô)™Õ¹Ñ¥½¸á¡”°Ğ°¤¤ì(€½¹ÍĞ¸€ôÑ¡¥Ì¹…¡”°È€ôĞ¹±•¹Ñ °Ì€ô)È¡¤°È¤ì(€µĞ¡¸°Ì¤ñğ€¡”¹Õ¹¥™½É´Å¥Ø¡Ñ¡¥Ì¹…‘‘È°Ì¤°Ğ¡¸°Ì¤¤ì(€™½È€¡±•Ğ„€ô€Àì„€„ôôÈì€¬­„¤¤¹Í•ÑQ•áÑÕÉ”Í¡Ñm…tñğå°°Ím…t¤ì)ô)™Õ¹Ñ¥½¸M¡”°Ğ°¤¤ì(€½¹ÍĞ¸€ôÑ¡¥Ì¹…¡”°È€ôĞ¹±•¹Ñ °Ì€ô)È¡¤°È¤ì(€µĞ¡¸°Ì¤ñğ€¡”¹Õ¹¥™½É´Å¥Ø¡Ñ¡¥Ì¹…‘‘È°Ì¤°Ğ¡¸°Ì¤¤ì(€™½È€¡±•Ğ„€ô€Àì„€„ôôÈì€¬­„¤¤¹Í•ÑQ•áÑÕÉ•Õ‰”¡Ñm…tñğ°°Ím…t¤ì)ô)™Õ¹Ñ¥½¸å¡”°Ğ°¤¤ì(€½¹ÍĞ¸€ôÑ¡¥Ì¹…¡”°È€ôĞ¹±•¹Ñ °Ì€ô)È¡¤°È¤ì(€µĞ¡¸°Ì¤ñğ€¡”¹Õ¹¥™½É´Å¥Ø¡Ñ¡¥Ì¹…‘‘È°Ì¤°Ğ¡¸°Ì¤¤ì(€™½È€¡±•Ğ„€ô€Àì„€„ôôÈì€¬­„¤¤¹Í•ÑQ•áÑÕÉ”ÉÉÉ…ä¡Ñm…tñğM°°Ím…t¤ì)ô)™Õ¹Ñ¥½¸¡”¤ì(€Íİ¥Ñ €¡”¤ì(€€€…Í”€ÔÄÈØè(€€€€€É•ÑÕÉ¸Íì(€€€…Í”€ÌÔØØĞè(€€€€€É•ÑÕÉ¸…ì(€€€…Í”€ÌÔØØÔè(€€€€€É•ÑÕÉ¸½ì(€€€…Í”€ÌÔØØØè(€€€€€É•ÑÕÉ¸±ì(€€€…Í”€ÌÔØÜĞè(€€€€€É•ÑÕÉ¸ì(€€€…Í”€ÌÔØÜÔè(€€€€€É•ÑÕÉ¸¡ì(€€€…Í”€ÌÔØÜØè(€€€€€É•ÑÕÉ¸Õì(€€€…Í”€ÔÄÈĞè(€€€…Í”€ÌÔØÜÀè(€€€€€É•ÑÕÉ¸‘ì(€€€…Í”€ÌÔØØÜè(€€€…Í”€ÌÔØÜÄè(€€€€€É•ÑÕÉ¸™ì(€€€…Í”€ÌÔØØàè(€€€…Í”€ÌÔØÜÈè(€€€€€É•ÑÕÉ¸Áì(€€€…Í”€ÌÔØØäè(€€€…Í”€ÌÔØÜÌè(€€€€€É•ÑÕÉ¸µì(€€€…Í”€ÔÄÈÔè(€€€€€É•ÑÕÉ¸ì(€€€…Í”€ÌØÈäĞè(€€€€€É•ÑÕÉ¸}ì(€€€…Í”€ÌØÈäÔè(€€€€€É•ÑÕÉ¸Ùì(€€€…Í”€ÌØÈäØè(€€€€€É•ÑÕÉ¸‰ì(€€€…Í”€ÌÔØÜàè(€€€…Í”€ÌØÄäàè(€€€…Í”€ÌØÈäàè(€€€…Í”€ÌØÌÀØè(€€€…Í”€ÌÔØàÈè(€€€€€É•ÑÕÉ¸5ì(€€€…Í”€ÌÔØÜäè(€€€…Í”€ÌØÈääè(€€€…Í”€ÌØÌÀÜè(€€€€€É•ÑÕÉ¸áì(€€€…Í”€ÌÔØàÀè(€€€…Í”€ÌØÌÀÀè(€€€…Í”€ÌØÌÀàè(€€€…Í”€ÌØÈäÌè(€€€€€É•ÑÕÉ¸Mì(€€€…Í”€ÌØÈàäè(€€€…Í”€ÌØÌÀÌè(€€€…Í”€ÌØÌÄÄè(€€€…Í”€ÌØÈäÈè(€€€€€É•ÑÕÉ¸åì(€ô)ô)Ù…ÈQ€ô±…ÍÌì(€½¹ÍÑÉÕÑ½È¡”°Ğ°¤¤ì(€€€Ñ¡¥Ì¹¥€ô”°Ñ¡¥Ì¹…‘‘È€ô¤°Ñ¡¥Ì¹…¡”€ômt°Ñ¡¥Ì¹ÑåÁ”€ôĞ¹ÑåÁ”°Ñ¡¥Ì¹Í•ÑY…±Õ”€ôÉ¡Ğ¹ÑåÁ”¤ì(€ô)ô°€ô±…ÍÌì(€½¹ÍÑÉÕÑ½È¡”°Ğ°¤¤ì(€€€Ñ¡¥Ì¹¥€ô”°Ñ¡¥Ì¹…‘‘È€ô¤°Ñ¡¥Ì¹…¡”€ômt°Ñ¡¥Ì¹ÑåÁ”€ôĞ¹ÑåÁ”°Ñ¡¥Ì¹Í¥é”€ôĞ¹Í¥é”°Ñ¡¥Ì¹Í•ÑY…±Õ”€ô¡Ğ¹ÑåÁ”¤ì(€ô)ô°I€ô±…ÍÌì(€½¹ÍÑÉÕÑ½È¡”¤ì(€€€Ñ¡¥Ì¹¥€ô”°Ñ¡¥Ì¹Í•Ä€ômt°Ñ¡¥Ì¹µ…À€ôíôì(€ô(€Í•ÑY…±Õ”¡”°Ğ°¤¤ì(€€€½¹ÍĞ¸€ôÑ¡¥Ì¹Í•Äì(€€€™½È€¡±•ĞÈ€ô€À°Ì€ô¸¹±•¹Ñ ìÈ€„ôôÌì€¬­È¤ì(€€€€€½¹ÍĞ„€ô¹mÉtì(€€€€€„¹Í•ÑY…±Õ”¡”°Ñm„¹¥‘t°¤¤ì(€€€ô(€ô)ô°Ì€ô€¼¡qÜ¬¤¡qt¤ü¡qmñp¸¤ü½œì)™Õ¹Ñ¥½¸¼¡”°Ğ¤ì(€”¹Í•Ä¹ÁÕÍ ¡Ğ¤°”¹µ…ÁmĞ¹¥‘t€ôĞì)ô)™Õ¹Ñ¥½¸İ¡”°Ğ°¤¤ì(€½¹ÍĞ¸€ô”¹¹…µ”°È€ô¸¹±•¹Ñ ì(€™½È€¡Ì¹±…ÍÑ%¹‘•à€ô€Àì€ì€¤ì(€€€½¹ÍĞÌ€ôÌ¹•á•Œ¡¸¤°„€ôÌ¹±…ÍÑ%¹‘•àì(€€€±•Ğ¼€ôÍlÅtì(€€€½¹ÍĞ°€ôÍlÉt€ôôô€‰tˆ°Œ€ôÍlÍtì(€€€¥˜€¡°€˜˜€¡¼€ô¼ğ€À¤°Œ€ôôôÙ½¥€ÀñğŒ€ôôô€‰lˆ€˜˜„€¬€È€ôôôÈ¤ì(€€€€€¼¡¤°Œ€ôôôÙ½¥€À€ü¹•ÜQ¡¼°”°Ğ¤€è¹•Ü¡¼°”°Ğ¤¤ì(€€€€€‰É•…¬ì(€€€ô•±Í”ì(€€€€€±•Ğ €ô¤¹µ…Ám½tì(€€€€€ €ôôôÙ½¥€À€˜˜€¡ €ô¹•ÜI¡¼¤°¼¡¤° ¤¤°¤€ô ì(€€€ô(€ô)ô)Ù…ÈUÈ€ô±…ÍÌì(€½¹ÍÑÉÕÑ½È¡”°Ğ¤ì(€€€Ñ¡¥Ì¹Í•Ä€ômt°Ñ¡¥Ì¹µ…À€ôíôì(€€€½¹ÍĞ¤€ô”¹•ÑAÉ½É…µA…É…µ•Ñ•È¡Ğ°”¹Q%Y}U9%=I5L¤ì(€€€™½È€¡±•ĞÌ€ô€ÀìÌ€ğ¤ì€¬­Ì¤ì(€€€€€½¹ÍĞ„€ô”¹•ÑÑ¥Ù•U¹¥™½É´¡Ğ°Ì¤ì(€€€€€İ¡„°”¹•ÑU¹¥™½Éµ1½…Ñ¥½¸¡Ğ°„¹¹…µ”¤°Ñ¡¥Ì¤ì(€€€ô(€€€½¹ÍĞ¸€ômt°È€ômtì(€€€™½È€¡½¹ÍĞÌ½˜Ñ¡¥Ì¹Í•Ä¤Ì¹ÑåÁ”€ôôô”¹M5A1I|É}M!=\ñğÌ¹ÑåÁ”€ôôô”¹M5A1I}U	}M!=\ñğÌ¹ÑåÁ”€ôôô”¹M5A1I|É}IIe}M!=\€ü¸¹ÁÕÍ ¡Ì¤€èÈ¹ÁÕÍ ¡Ì¤ì(€€€¸¹±•¹Ñ €ø€À€˜˜€¡Ñ¡¥Ì¹Í•Ä€ô¸¹½¹…Ğ¡È¤¤ì(€ô(€Í•ÑY…±Õ”¡”°Ğ°¤°¸¤ì(€€€½¹ÍĞÈ€ôÑ¡¥Ì¹µ…ÁmÑtì(€€€È€„ôôÙ½¥€À€˜˜È¹Í•ÑY…±Õ”¡”°¤°¸¤ì(€ô(€Í•Ñ=ÁÑ¥½¹…°¡”°Ğ°¤¤ì(€€€½¹ÍĞ¸€ôÑm¥tì(€€€¸€„ôôÙ½¥€À€˜˜Ñ¡¥Ì¹Í•ÑY…±Õ”¡”°¤°¸¤ì(€ô(€ÍÑ…Ñ¥ŒÕÁ±½…¡”°Ğ°¤°¸¤ì(€€€™½È€¡±•ĞÈ€ô€À°Ì€ôĞ¹±•¹Ñ ìÈ€„ôôÌì€¬­È¤ì(€€€€€½¹ÍĞ„€ôÑmÉt°¼€ô¥m„¹¥‘tì(€€€€€¼¹¹••‘ÍUÁ‘…Ñ”€„ôô€„Ä€˜˜„¹Í•ÑY…±Õ”¡”°¼¹Ù…±Õ”°¸¤ì(€€€ô(€ô(€ÍÑ…Ñ¥ŒÍ•Å]¥Ñ¡Y…±Õ”¡”°Ğ¤ì(€€€½¹ÍĞ¤€ômtì(€€€™½È€¡±•Ğ¸€ô€À°È€ô”¹±•¹Ñ ì¸€„ôôÈì€¬­¸¤ì(€€€€€½¹ÍĞÌ€ô•m¹tì(€€€€€Ì¹¥¥¸Ğ€˜˜¤¹ÁÕÍ ¡Ì¤ì(€€€ô(€€€É•ÑÕÉ¸¤ì(€ô)ôì)™Õ¹Ñ¥½¸¡¼¡”°Ğ°¤¤ì(€½¹ÍĞ¸€ô”¹É•…Ñ•M¡…‘•È¡Ğ¤ì(€É•ÑÕÉ¸”¹Í¡…‘•ÉM½ÕÉ”¡¸°¤¤°”¹½µÁ¥±•M¡…‘•È¡¸¤°¸ì)ô)Ù…È€ô€ÌÜÈäÜ°A€ô€Àì)™Õ¹Ñ¥½¸1¡”°Ğ¤ì(€½¹ÍĞ¤€ô”¹ÍÁ±¥Ğ¡€)€¤°¸€ômt°È€ô5…Ñ ¹µ…à¡Ğ€´€Ø°€À¤°Ì€ô5…Ñ ¹µ¥¸¡Ğ€¬€Ø°¤¹±•¹Ñ ¤ì(€™½È€¡±•Ğ„€ôÈì„€ğÌì„¬¬¤ì(€€€½¹ÍĞ¼€ô„€¬€Äì(€€€¸¹ÁÕÍ ¡€‘í¼€ôôôĞ€ü€ˆøˆ€è€ˆ€‰ô€‘í½ôè€‘í¥m…uõ€¤ì(€ô(€É•ÑÕÉ¸¸¹©½¥¸¡€)€¤ì)ô)Ù…ÈÕ¼€ô€¼¨}}AUI}|€¨¼¹•Ü” ¤ì)™Õ¹Ñ¥½¸¡”¤ì(€!”¹}•Ñ5…ÑÉ¥à¡Õ¼°!”¹İ½É­¥¹½±½ÉMÁ…”°”¤ì(€½¹ÍĞĞ€ôµ…ĞÌ €‘íÕ¼¹•±•µ•¹ÑÌ¹µ…À ¡¤¤€ôø¤¹Ñ½¥á• Ğ¤¥ô€¥€ì(€Íİ¥Ñ €¡!”¹•ÑQÉ…¹Í™•È¡”¤¤ì(€€€…Í”	Èè(€€€€€É•ÑÕÉ¸mĞ°€‰1¥¹•…ÉQÉ…¹Í™•É=Q‰tì(€€€…Í”éÈè(€€€€€É•ÑÕÉ¸mĞ°€‰ÍI	QÉ…¹Í™•É=Q‰tì(€€€‘•™…Õ±Ğè(€€€€€É•ÑÕÉ¸M” ‰]•‰1AÉ½É…´èU¹ÍÕÁÁ½ÉÑ•½±½ÈÍÁ…”è€ˆ°”¤°mĞ°€‰1¥¹•…ÉQÉ…¹Í™•É=Q‰tì(€ô)ô)™Õ¹Ñ¥½¸™¼¡”°Ğ°¤¤ì(€½¹ÍĞ¸€ô”¹•ÑM¡…‘•ÉA…É…µ•Ñ•È¡Ğ°”¹=5A%1}MQQUL¤°È€ô€¡”¹•ÑM¡…‘•É%¹™½1½œ¡Ğ¤ñğ€ˆˆ¤¹ÑÉ¥´ ¤ì(€¥˜€¡¸€˜˜È€ôôô€ˆˆ¤É•ÑÕÉ¸€ˆˆì(€½¹ÍĞÌ€ô€½II=Hè€Àè¡q¬¤¼¹•á•Œ¡È¤ì(€¥˜€¡Ì¤ì(€€€½¹ÍĞ„€ôÁ…ÉÍ•%¹Ğ¡ÍlÅt¤ì(€€€É•ÑÕÉ¸¤¹Ñ½UÁÁ•É…Í” ¤€¬€()€€¬È€¬€()€€¬1¡”¹•ÑM¡…‘•ÉM½ÕÉ”¡Ğ¤°„¤ì(€ô•±Í”É•ÑÕÉ¸Èì)ô)™Õ¹Ñ¥½¸%¡”°Ğ¤ì(€½¹ÍĞ¤€ô¡Ğ¤ì(€É•ÑÕÉ¸l(€€€Ù•ŒĞ€‘í•ô Ù•ŒĞÙ…±Õ”€¤í€°(€€€€%É•ÑÕÉ¸€‘í¥lÅuô Ù•ŒĞ Ù…±Õ”¹Éˆ€¨€‘í¥lÁuô°Ù…±Õ”¹„€¤€¤í€°(€€€€‰ôˆ(€t¹©½¥¸¡€)€¤ì)ô)Ù…È9€ôì(€€Äè€‰1¥¹•…Èˆ°(€€Èè€‰I•¥¹¡…Éˆ°(€€Ìè€‰¥¹•½¸ˆ°(€€Ğè€‰M¥±µ¥Œˆ°(€€Øè€‰`ˆ°(€€Üè€‰9•ÕÑÉ…°ˆ°(€€Ôè€‰ÕÍÑ½´ˆ)ôì)™Õ¹Ñ¥½¸U¡”°Ğ¤ì(€½¹ÍĞ¤€ô9‘mÑtì(€É•ÑÕÉ¸¤€ôôôÙ½¥€À€ü€¡M” ‰]•‰1AÉ½É…´èU¹ÍÕÁÁ½ÉÑ•Ñ½¹•5…ÁÁ¥¹œèˆ°Ğ¤°€‰Ù•ŒÌ€ˆ€¬”€¬€ˆ Ù•ŒÌ½±½È€¤ìÉ•ÑÕÉ¸1¥¹•…ÉQ½¹•5…ÁÁ¥¹œ ½±½È€¤ìôˆ¤€è€‰Ù•ŒÌ€ˆ€¬”€¬€ˆ Ù•ŒÌ½±½È€¤ìÉ•ÑÕÉ¸€ˆ€¬¤€¬€‰Q½¹•5…ÁÁ¥¹œ ½±½È€¤ìôˆì)ô)Ù…ÈAÈ€ô€¼¨}}AUI}|€¨¼¹•Ü8 ¤ì)™Õ¹Ñ¥½¸ ¤ì(€É•ÑÕÉ¸!”¹•Ñ1Õµ¥¹…¹•½•™™¥¥•¹ÑÌ¡AÈ¤°l(€€€€‰™±½…Ğ±Õµ¥¹…¹” ½¹ÍĞ¥¸Ù•ŒÌÉˆ€¤ìˆ°(€€€€%½¹ÍĞÙ•ŒÌİ•¥¡ÑÌ€ôÙ•ŒÌ €‘íAÈ¹à¹Ñ½¥á• Ğ¥ô°€‘íAÈ¹ä¹Ñ½¥á• Ğ¥ô°€‘íAÈ¹è¹Ñ½¥á• Ğ¥ô€¤í€°(€€€€ˆ%É•ÑÕÉ¸‘½Ğ İ•¥¡ÑÌ°Éˆ€¤ìˆ°(€€€€‰ôˆ(€t¹©½¥¸¡€)€¤ì)ô)™Õ¹Ñ¥½¸=¡”¤ì(€É•ÑÕÉ¸m”¹•áÑ•¹Í¥½¹±¥ÁÕ±±¥ÍÑ…¹”€ü€ˆ•áÑ•¹Í¥½¸1}91}±¥Á}Õ±±}‘¥ÍÑ…¹”€èÉ•ÅÕ¥É”ˆ€è€ˆˆ°”¹•áÑ•¹Í¥½¹5Õ±Ñ¥É…Ü€ü€ˆ•áÑ•¹Í¥½¸1}91}µÕ±Ñ¥}‘É…Ü€èÉ•ÅÕ¥É”ˆ€è€ˆ‰t¹™¥±Ñ•È¡]¸¤¹©½¥¸¡€)€¤ì)ô)™Õ¹Ñ¥½¸­¡”¤ì(€½¹ÍĞĞ€ômtì(€™½È€¡½¹ÍĞ¤¥¸”¤ì(€€€½¹ÍĞ¸€ô•m¥tì(€€€¸€„ôô€„Ä€˜˜Ğ¹ÁÕÍ  ˆ‘•™¥¹”€ˆ€¬¤€¬€ˆ€ˆ€¬¸¤ì(€ô(€É•ÑÕÉ¸Ğ¹©½¥¸¡€)€¤ì)ô)™Õ¹Ñ¥½¸	¡”°Ğ¤ì(€½¹ÍĞ¤€ôíô°¸€ô”¹•ÑAÉ½É…µA…É…µ•Ñ•È¡Ğ°”¹Q%Y}QQI%	UQL¤ì(€™½È€¡±•ĞÈ€ô€ÀìÈ€ğ¸ìÈ¬¬¤ì(€€€½¹ÍĞÌ€ô”¹•ÑÑ¥Ù•ÑÑÉ¥ˆ¡Ğ°È¤°„€ôÌ¹¹…µ”ì(€€€±•Ğ¼€ô€Äì(€€€Ì¹ÑåÁ”€ôôô”¹1=Q}5PÈ€˜˜€¡¼€ô€È¤°Ì¹ÑåÁ”€ôôô”¹1=Q}5PÌ€˜˜€¡¼€ô€Ì¤°Ì¹ÑåÁ”€ôôô”¹1=Q}5PĞ€˜˜€¡¼€ô€Ğ¤°¥m…t€ôì(€€€€€ÑåÁ”èÌ¹ÑåÁ”°(€€€€€±½…Ñ¥½¸è”¹•ÑÑÑÉ¥‰1½…Ñ¥½¸¡Ğ°„¤°(€€€€€±½…Ñ¥½¹M¥é”è¼(€€€ôì(€ô(€É•ÑÕÉ¸¤ì)ô)™Õ¹Ñ¥½¸]¸¡”¤ì(€É•ÑÕÉ¸”€„ôô€ˆˆì)ô)™Õ¹Ñ¥½¸Á¼¡”°Ğ¤ì(€½¹ÍĞ¤€ôĞ¹¹ÕµMÁ½Ñ1¥¡ÑM¡…‘½İÌ€¬Ğ¹¹ÕµMÁ½Ñ1¥¡Ñ5…ÁÌ€´Ğ¹¹ÕµMÁ½Ñ1¥¡ÑM¡…‘½İÍ]¥Ñ¡5…ÁÌì(€É•ÑÕÉ¸”¹É•Á±…” ½9U5}%I}1%!QL½œ°Ğ¹¹Õµ¥É1¥¡ÑÌ¤¹É•Á±…” ½9U5}MA=Q}1%!QL½œ°Ğ¹¹ÕµMÁ½Ñ1¥¡ÑÌ¤¹É•Á±…” ½9U5}MA=Q}1%!Q}5AL½œ°Ğ¹¹ÕµMÁ½Ñ1¥¡Ñ5…ÁÌ¤¹É•Á±…” ½9U5}MA=Q}1%!Q}==IL½œ°¤¤¹É•Á±…” ½9U5}IQ}I}1%!QL½œ°Ğ¹¹ÕµI•ÑÉ•…1¥¡ÑÌ¤¹É•Á±…” ½9U5}A=%9Q}1%!QL½œ°Ğ¹¹ÕµA½¥¹Ñ1¥¡ÑÌ¤¹É•Á±…” ½9U5}!5%}1%!QL½œ°Ğ¹¹Õµ!•µ¥1¥¡ÑÌ¤¹É•Á±…” ½9U5}%I}1%!Q}M!=]L½œ°Ğ¹¹Õµ¥É1¥¡ÑM¡…‘½İÌ¤¹É•Á±…” ½9U5}MA=Q}1%!Q}M!=]M}]%Q!}5AL½œ°Ğ¹¹ÕµMÁ½Ñ1¥¡ÑM¡…‘½İÍ]¥Ñ¡5…ÁÌ¤¹É•Á±…” ½9U5}MA=Q}1%!Q}M!=]L½œ°Ğ¹¹ÕµMÁ½Ñ1¥¡ÑM¡…‘½İÌ¤¹É•Á±…” ½9U5}A=%9Q}1%!Q}M!=]L½œ°Ğ¹¹ÕµA½¥¹Ñ1¥¡ÑM¡…‘½İÌ¤ì)ô)™Õ¹Ñ¥½¸µ¼¡”°Ğ¤ì(€É•ÑÕÉ¸”¹É•Á±…” ½9U5}1%AA%9}A19L½œ°Ğ¹¹Õµ±¥ÁÁ¥¹A±…¹•Ì¤¹É•Á±…” ½U9%=9}1%AA%9}A19L½œ°Ğ¹¹Õµ±¥ÁÁ¥¹A±…¹•Ì€´Ğ¹¹Õµ±¥Á%¹Ñ•ÉÍ•Ñ¥½¸¤ì)ô)Ù…Èé€ô€½ylqÑt¨¥¹±Õ‘”€¬ğ¡mqİq¸½t¬¤ø½´ì)™Õ¹Ñ¥½¸YÌ¡”¤ì(€É•ÑÕÉ¸”¹É•Á±…”¡é°Y¤ì)ô)Ù…È€ô€¼¨}}AUI}|€¨¼¹•Ü5…À ¤ì)™Õ¹Ñ¥½¸Y¡”°Ğ¤ì(€±•Ğ¤€ô=•mÑtì(€¥˜€¡¤€ôôôÙ½¥€À¤ì(€€€½¹ÍĞ¸€ô¹•Ğ¡Ğ¤ì(€€€¥˜€¡¸€„ôôÙ½¥€À¤(€€€€€¤€ô=•m¹t°M” ]•‰1I•¹‘•É•ÈèM¡…‘•È¡Õ¹¬€ˆ•Ìˆ¡…Ì‰••¸‘•ÁÉ•…Ñ•¸UÍ”€ˆ•Ìˆ¥¹ÍÑ•…¸œ°Ğ°¸¤ì(€€€•±Í”Ñ¡É½Ü¹•ÜÉÉ½È ‰Q!I¹]•‰1AÉ½É…´è…¸¹½ĞÉ•Í½±Ù”€¥¹±Õ‘”€ğˆ€¬Ğ€¬€ˆøˆ¤ì(€ô(€É•ÑÕÉ¸YÌ¡¤¤ì)ô)Ù…È!€ô€¼ÁÉ…µ„Õ¹É½±±}±½½Á}ÍÑ…ÉÑqÌ­™½ÉqÌ©p¡qÌ©¥¹ÑqÌ­¥qÌ¨õqÌ¨¡q¬¥qÌ¨íqÌ©¥qÌ¨ñqÌ¨¡q¬¥qÌ¨íqÌ©¥qÌ©p­p­qÌ©p¥qÌ©ì¡mqÍqMt¬ü¥õqÌ¬ÁÉ…µ„Õ¹É½±±}±½½Á}•¹½œì)™Õ¹Ñ¥½¸¼¡”¤ì(€É•ÑÕÉ¸”¹É•Á±…”¡!°]¤ì)ô)™Õ¹Ñ¥½¸]¡”°Ğ°¤°¸¤ì(€±•ĞÈ€ô€ˆˆì(€™½È€¡±•ĞÌ€ôÁ…ÉÍ•%¹Ğ¡Ğ¤ìÌ€ğÁ…ÉÍ•%¹Ğ¡¤¤ìÌ¬¬¤È€¬ô¸¹É•Á±…” ½qmqÌ©¥qÌ©qt½œ°€‰l€ˆ€¬Ì€¬€ˆtˆ¤¹É•Á±…” ½U9I=11}1==A}%9`½œ°Ì¤ì(€É•ÑÕÉ¸Èì)ô)™Õ¹Ñ¥½¸}¼¡”¤ì(€±•ĞĞ€ôÁÉ•¥Í¥½¸€‘í”¹ÁÉ•¥Í¥½¹ô™±½…Ğì(%ÁÉ•¥Í¥½¸€‘í”¹ÁÉ•¥Í¥½¹ô¥¹Ğì(%ÁÉ•¥Í¥½¸€‘í”¹ÁÉ•¥Í¥½¹ôÍ…µÁ±•ÈÉì(%ÁÉ•¥Í¥½¸€‘í”¹ÁÉ•¥Í¥½¹ôÍ…µÁ±•ÉÕ‰”ì(%ÁÉ•¥Í¥½¸€‘í”¹ÁÉ•¥Í¥½¹ôÍ…µÁ±•ÈÍì(%ÁÉ•¥Í¥½¸€‘í”¹ÁÉ•¥Í¥½¹ôÍ…µÁ±•ÈÉÉÉ…äì(%ÁÉ•¥Í¥½¸€‘í”¹ÁÉ•¥Í¥½¹ôÍ…µÁ±•ÈÉM¡…‘½Üì(%ÁÉ•¥Í¥½¸€‘í”¹ÁÉ•¥Í¥½¹ôÍ…µÁ±•ÉÕ‰•M¡…‘½Üì(%ÁÉ•¥Í¥½¸€‘í”¹ÁÉ•¥Í¥½¹ôÍ…µÁ±•ÈÉÉÉ…åM¡…‘½Üì(%ÁÉ•¥Í¥½¸€‘í”¹ÁÉ•¥Í¥½¹ô¥Í…µÁ±•ÈÉì(%ÁÉ•¥Í¥½¸€‘í”¹ÁÉ•¥Í¥½¹ô¥Í…µÁ±•ÈÍì(%ÁÉ•¥Í¥½¸€‘í”¹ÁÉ•¥Í¥½¹ô¥Í…µÁ±•ÉÕ‰”ì(%ÁÉ•¥Í¥½¸€‘í”¹ÁÉ•¥Í¥½¹ô¥Í…µÁ±•ÈÉÉÉ…äì(%ÁÉ•¥Í¥½¸€‘í”¹ÁÉ•¥Í¥½¹ôÕÍ…µÁ±•ÈÉì(%ÁÉ•¥Í¥½¸€‘í”¹ÁÉ•¥Í¥½¹ôÕÍ…µÁ±•ÈÍì(%ÁÉ•¥Í¥½¸€‘í”¹ÁÉ•¥Í¥½¹ôÕÍ…µÁ±•ÉÕ‰”ì(%ÁÉ•¥Í¥½¸€‘í”¹ÁÉ•¥Í¥½¹ôÕÍ…µÁ±•ÈÉÉÉ…äì(%€ì(€É•ÑÕÉ¸”¹ÁÉ•¥Í¥½¸€ôôô€‰¡¥¡Àˆ€üĞ€¬ô€(‘•™¥¹”!%!}AI%M%=9€€è”¹ÁÉ•¥Í¥½¸€ôôô€‰µ•‘¥ÕµÀˆ€üĞ€¬ô€(‘•™¥¹”5%U5}AI%M%=9€€è”¹ÁÉ•¥Í¥½¸€ôôô€‰±½İÀˆ€˜˜€¡Ğ€¬ô€(‘•™¥¹”1=]}AI%M%=9€¤°Ğì)ô)Ù…ÈÅ€ôì(€€Äè€‰M!=]5A}QeA}Aˆ°(€€Ìè€‰M!=]5A}QeA}YM4ˆ)ôì)™Õ¹Ñ¥½¸a¡”¤ì(€É•ÑÕÉ¸Å‘m”¹Í¡…‘½İ5…ÁQåÁ•tñğ€‰M!=]5A}QeA}	M%ˆì)ô)Ù…È-€ôì(€€ÌÀÄè€‰9Y5A}QeA}U	ˆ°(€€ÌÀÈè€‰9Y5A}QeA}U	ˆ°(€€ÌÀØè€‰9Y5A}QeA}U	}UXˆ)ôì)™Õ¹Ñ¥½¸©¡”¤ì(€É•ÑÕÉ¸”¹•¹Ù5…À€ôôô€„Ä€ü€‰9Y5A}QeA}U	ˆ€è-‘m”¹•¹Ù5…Á5½‘•tñğ€‰9Y5A}QeA}U	ˆì)ô)Ù…Èe€ôì€ÌÀÈè€‰9Y5A}5=}IIQ%=8ˆôì)™Õ¹Ñ¥½¸)¡”¤ì(€É•ÑÕÉ¸”¹•¹Ù5…À€ôôô€„Ä€ü€‰9Y5A}5=}I1Q%=8ˆ€èe‘m”¹•¹Ù5…Á5½‘•tñğ€‰9Y5A}5=}I1Q%=8ˆì)ô)Ù…Èi€ôì(€€Àè€‰9Y5A}	19%9}5U1Q%A1dˆ°(€€Äè€‰9Y5A}	19%9}5%`ˆ°(€€Èè€‰9Y5A}	19%9}ˆ)ôì)™Õ¹Ñ¥½¸€‘¡”¤ì(€É•ÑÕÉ¸”¹•¹Ù5…À€ôôô€„Ä€ü€‰9Y5A}	19%9}9=9ˆ€èi‘m”¹½µ‰¥¹•tñğ€‰9Y5A}	19%9}9=9ˆì)ô)™Õ¹Ñ¥½¸E¡”¤ì(€½¹ÍĞĞ€ô”¹•¹Ù5…ÁÕ‰•UY!•¥¡Ğì(€¥˜€¡Ğ€ôôô¹Õ±°¤É•ÑÕÉ¸¹Õ±°ì(€½¹ÍĞ¤€ô5…Ñ ¹±½œÈ¡Ğ¤€´€È°¸€ô€Ä€¼Ğì(€É•ÑÕÉ¸ì(€€€Ñ•á•±]¥‘Ñ è€Ä€¼€ Ì€¨5…Ñ ¹µ…à¡5…Ñ ¹Á½Ü È°¤¤°€ÄÄÈ¤¤°(€€€Ñ•á•±!•¥¡Ğè¸°(€€€µ…á5¥Àè¤(€ôì)ô)™Õ¹Ñ¥½¸•˜¡”°Ğ°¤°¸¤ì(€½¹ÍĞÈ€ô”¹•Ñ½¹Ñ•áĞ ¤°Ì€ô¤¹‘•™¥¹•Ìì(€±•Ğ„€ô¤¹Ù•ÉÑ•áM¡…‘•È°¼€ô¤¹™É…µ•¹ÑM¡…‘•Èì(€½¹ÍĞ°€ôa¡¤¤°Œ€ô©¡¤¤° €ô)¡¤¤°€ô€‘¡¤¤°Ô€ôE¡¤¤°À€ô=¡¤¤°Ø€ô­¡Ì¤°ˆ€ôÈ¹É•…Ñ•AÉ½É…´ ¤ì(€±•Ğ´°˜°P€ô¤¹±Í±Y•ÉÍ¥½¸€ü€ˆÙ•ÉÍ¥½¸€ˆ€¬¤¹±Í±Y•ÉÍ¥½¸€¬€)€€è€ˆˆì(€¤¹¥ÍI…İM¡…‘•É5…Ñ•É¥…°€ü€¡´€ôl(€€€€ˆ‘•™¥¹”M!I}QeA€ˆ€¬¤¹Í¡…‘•ÉQåÁ”°(€€€€ˆ‘•™¥¹”M!I}95€ˆ€¬¤¹Í¡…‘•É9…µ”°(€€€Ø(€t¹™¥±Ñ•È¡]¸¤¹©½¥¸¡€)€¤°´¹±•¹Ñ €ø€À€˜˜€¡´€¬ô€)€¤°˜€ôl(€€€€ˆ‘•™¥¹”M!I}QeA€ˆ€¬¤¹Í¡…‘•ÉQåÁ”°(€€€€ˆ‘•™¥¹”M!I}95€ˆ€¬¤¹Í¡…‘•É9…µ”°(€€€Ø(€t¹™¥±Ñ•È¡]¸¤¹©½¥¸¡€)€¤°˜¹±•¹Ñ €ø€À€˜˜€¡˜€¬ô€)€¤¤€è€¡´€ôl(€€€}¼¡¤¤°(€€€€ˆ‘•™¥¹”M!I}QeA€ˆ€¬¤¹Í¡…‘•ÉQåÁ”°(€€€€ˆ‘•™¥¹”M!I}95€ˆ€¬¤¹Í¡…‘•É9…µ”°(€€€Ø°(€€€¤¹•áÑ•¹Í¥½¹±¥ÁÕ±±¥ÍÑ…¹”€ü€ˆ‘•™¥¹”UM}1%A}%MQ9ˆ€è€ˆˆ°(€€€¤¹‰…Ñ¡¥¹œ€ü€ˆ‘•™¥¹”UM}	Q!%9ˆ€è€ˆˆ°(€€€¤¹‰…Ñ¡¥¹½±½È€ü€ˆ‘•™¥¹”UM}	Q!%9}=1=Hˆ€è€ˆˆ°(€€€¤¹¥¹ÍÑ…¹¥¹œ€ü€ˆ‘•™¥¹”UM}%9MQ9%9ˆ€è€ˆˆ°(€€€¤¹¥¹ÍÑ…¹¥¹½±½È€ü€ˆ‘•™¥¹”UM}%9MQ9%9}=1=Hˆ€è€ˆˆ°(€€€¤¹¥¹ÍÑ…¹¥¹5½ÉÁ €ü€ˆ‘•™¥¹”UM}%9MQ9%9}5=IA ˆ€è€ˆˆ°(€€€¤¹ÕÍ•½œ€˜˜¤¹™½œ€ü€ˆ‘•™¥¹”UM}=ˆ€è€ˆˆ°(€€€¤¹ÕÍ•½œ€˜˜¤¹™½áÀÈ€ü€ˆ‘•™¥¹”=}a@Èˆ€è€ˆˆ°(€€€¤¹µ…À€ü€ˆ‘•™¥¹”UM}5@ˆ€è€ˆˆ°(€€€¤¹•¹Ù5…À€ü€ˆ‘•™¥¹”UM}9Y5@ˆ€è€ˆˆ°(€€€¤¹•¹Ù5…À€ü€ˆ‘•™¥¹”€ˆ€¬ €è€ˆˆ°(€€€¤¹±¥¡Ñ5…À€ü€ˆ‘•™¥¹”UM}1%!Q5@ˆ€è€ˆˆ°(€€€¤¹…½5…À€ü€ˆ‘•™¥¹”UM}=5@ˆ€è€ˆˆ°(€€€¤¹‰ÕµÁ5…À€ü€ˆ‘•™¥¹”UM}	U5A5@ˆ€è€ˆˆ°(€€€¤¹¹½Éµ…±5…À€ü€ˆ‘•™¥¹”UM}9=I515@ˆ€è€ˆˆ°(€€€¤¹¹½Éµ…±5…Á=‰©•ÑMÁ…”€ü€ˆ‘•™¥¹”UM}9=I515A}=	)QMAˆ€è€ˆˆ°(€€€¤¹¹½Éµ…±5…ÁQ…¹•¹ÑMÁ…”€ü€ˆ‘•™¥¹”UM}9=I515A}Q99QMAˆ€è€ˆˆ°(€€€¤¹‘¥ÍÁ±…•µ•¹Ñ5…À€ü€ˆ‘•™¥¹”UM}%MA159Q5@ˆ€è€ˆˆ°(€€€¤¹•µ¥ÍÍ¥Ù•5…À€ü€ˆ‘•™¥¹”UM}5%MM%Y5@ˆ€è€ˆˆ°(€€€¤¹…¹¥Í½ÑÉ½Áä€ü€ˆ‘•™¥¹”UM}9%M=QI=Adˆ€è€ˆˆ°(€€€¤¹…¹¥Í½ÑÉ½Áå5…À€ü€ˆ‘•™¥¹”UM}9%M=QI=Ae5@ˆ€è€ˆˆ°(€€€¤¹±•…É½…Ñ5…À€ü€ˆ‘•™¥¹”UM}1I=Q5@ˆ€è€ˆˆ°(€€€¤¹±•…É½…ÑI½Õ¡¹•ÍÍ5…À€ü€ˆ‘•™¥¹”UM}1I=Q}I=U!9MM5@ˆ€è€ˆˆ°(€€€¤¹±•…É½…Ñ9½Éµ…±5…À€ü€ˆ‘•™¥¹”UM}1I=Q}9=I515@ˆ€è€ˆˆ°(€€€¤¹¥É¥‘•Í•¹•5…À€ü€ˆ‘•™¥¹”UM}%I%M95@ˆ€è€ˆˆ°(€€€¤¹¥É¥‘•Í•¹•Q¡¥­¹•ÍÍ5…À€ü€ˆ‘•™¥¹”UM}%I%M9}Q!%-9MM5@ˆ€è€ˆˆ°(€€€¤¹ÍÁ•Õ±…É5…À€ü€ˆ‘•™¥¹”UM}MAU1I5@ˆ€è€ˆˆ°(€€€¤¹ÍÁ•Õ±…É½±½É5…À€ü€ˆ‘•™¥¹”UM}MAU1I}=1=I5@ˆ€è€ˆˆ°(€€€¤¹ÍÁ•Õ±…É%¹Ñ•¹Í¥Ñå5…À€ü€ˆ‘•™¥¹”UM}MAU1I}%9Q9M%Qe5@ˆ€è€ˆˆ°(€€€¤¹É½Õ¡¹•ÍÍ5…À€ü€ˆ‘•™¥¹”UM}I=U!9MM5@ˆ€è€ˆˆ°(€€€¤¹µ•Ñ…±¹•ÍÍ5…À€ü€ˆ‘•™¥¹”UM}5Q19MM5@ˆ€è€ˆˆ°(€€€¤¹…±Á¡…5…À€ü€ˆ‘•™¥¹”UM}1A!5@ˆ€è€ˆˆ°(€€€¤¹…±Á¡…!…Í €ü€ˆ‘•™¥¹”UM}1A!!M ˆ€è€ˆˆ°(€€€¤¹ÑÉ…¹Íµ¥ÍÍ¥½¸€ü€ˆ‘•™¥¹”UM}QI9M5%MM%=8ˆ€è€ˆˆ°(€€€¤¹ÑÉ…¹Íµ¥ÍÍ¥½¹5…À€ü€ˆ‘•™¥¹”UM}QI9M5%MM%=95@ˆ€è€ˆˆ°(€€€¤¹Ñ¡¥­¹•ÍÍ5…À€ü€ˆ‘•™¥¹”UM}Q!%-9MM5@ˆ€è€ˆˆ°(€€€¤¹Í¡••¹½±½É5…À€ü€ˆ‘•™¥¹”UM}M!9}=1=I5@ˆ€è€ˆˆ°(€€€¤¹Í¡••¹I½Õ¡¹•ÍÍ5…À€ü€ˆ‘•™¥¹”UM}M!9}I=U!9MM5@ˆ€è€ˆˆ°(€€€¤¹µ…ÁUØ€ü€ˆ‘•™¥¹”5A}UX€ˆ€¬¤¹µ…ÁUØ€è€ˆˆ°(€€€¤¹…±Á¡…5…ÁUØ€ü€ˆ‘•™¥¹”1A!5A}UX€ˆ€¬¤¹…±Á¡…5…ÁUØ€è€ˆˆ°(€€€¤¹±¥¡Ñ5…ÁUØ€ü€ˆ‘•™¥¹”1%!Q5A}UX€ˆ€¬¤¹±¥¡Ñ5…ÁUØ€è€ˆˆ°(€€€¤¹…½5…ÁUØ€ü€ˆ‘•™¥¹”=5A}UX€ˆ€¬¤¹…½5…ÁUØ€è€ˆˆ°(€€€¤¹•µ¥ÍÍ¥Ù•5…ÁUØ€ü€ˆ‘•™¥¹”5%MM%Y5A}UX€ˆ€¬¤¹•µ¥ÍÍ¥Ù•5…ÁUØ€è€ˆˆ°(€€€¤¹‰ÕµÁ5…ÁUØ€ü€ˆ‘•™¥¹”	U5A5A}UX€ˆ€¬¤¹‰ÕµÁ5…ÁUØ€è€ˆˆ°(€€€¤¹¹½Éµ…±5…ÁUØ€ü€ˆ‘•™¥¹”9=I515A}UX€ˆ€¬¤¹¹½Éµ…±5…ÁUØ€è€ˆˆ°(€€€¤¹‘¥ÍÁ±…•µ•¹Ñ5…ÁUØ€ü€ˆ‘•™¥¹”%MA159Q5A}UX€ˆ€¬¤¹‘¥ÍÁ±…•µ•¹Ñ5…ÁUØ€è€ˆˆ°(€€€¤¹µ•Ñ…±¹•ÍÍ5…ÁUØ€ü€ˆ‘•™¥¹”5Q19MM5A}UX€ˆ€¬¤¹µ•Ñ…±¹•ÍÍ5…ÁUØ€è€ˆˆ°(€€€¤¹É½Õ¡¹•ÍÍ5…ÁUØ€ü€ˆ‘•™¥¹”I=U!9MM5A}UX€ˆ€¬¤¹É½Õ¡¹•ÍÍ5…ÁUØ€è€ˆˆ°(€€€¤¹…¹¥Í½ÑÉ½Áå5…ÁUØ€ü€ˆ‘•™¥¹”9%M=QI=Ae5A}UX€ˆ€¬¤¹…¹¥Í½ÑÉ½Áå5…ÁUØ€è€ˆˆ°(€€€¤¹±•…É½…Ñ5…ÁUØ€ü€ˆ‘•™¥¹”1I=Q5A}UX€ˆ€¬¤¹±•…É½…Ñ5…ÁUØ€è€ˆˆ°(€€€¤¹±•…É½…Ñ9½Éµ…±5…ÁUØ€ü€ˆ‘•™¥¹”1I=Q}9=I515A}UX€ˆ€¬¤¹±•…É½…Ñ9½Éµ…±5…ÁUØ€è€ˆˆ°(€€€¤¹±•…É½…ÑI½Õ¡¹•ÍÍ5…ÁUØ€ü€ˆ‘•™¥¹”1I=Q}I=U!9MM5A}UX€ˆ€¬¤¹±•…É½…ÑI½Õ¡¹•ÍÍ5…ÁUØ€è€ˆˆ°(€€€¤¹¥É¥‘•Í•¹•5…ÁUØ€ü€ˆ‘•™¥¹”%I%M95A}UX€ˆ€¬¤¹¥É¥‘•Í•¹•5…ÁUØ€è€ˆˆ°(€€€¤¹¥É¥‘•Í•¹•Q¡¥­¹•ÍÍ5…ÁUØ€ü€ˆ‘•™¥¹”%I%M9}Q!%-9MM5A}UX€ˆ€¬¤¹¥É¥‘•Í•¹•Q¡¥­¹•ÍÍ5…ÁUØ€è€ˆˆ°(€€€¤¹Í¡••¹½±½É5…ÁUØ€ü€ˆ‘•™¥¹”M!9}=1=I5A}UX€ˆ€¬¤¹Í¡••¹½±½É5…ÁUØ€è€ˆˆ°(€€€¤¹Í¡••¹I½Õ¡¹•ÍÍ5…ÁUØ€ü€ˆ‘•™¥¹”M!9}I=U!9MM5A}UX€ˆ€¬¤¹Í¡••¹I½Õ¡¹•ÍÍ5…ÁUØ€è€ˆˆ°(€€€¤¹ÍÁ•Õ±…É5…ÁUØ€ü€ˆ‘•™¥¹”MAU1I5A}UX€ˆ€¬¤¹ÍÁ•Õ±…É5…ÁUØ€è€ˆˆ°(€€€¤¹ÍÁ•Õ±…É½±½É5…ÁUØ€ü€ˆ‘•™¥¹”MAU1I}=1=I5A}UX€ˆ€¬¤¹ÍÁ•Õ±…É½±½É5…ÁUØ€è€ˆˆ°(€€€¤¹ÍÁ•Õ±…É%¹Ñ•¹Í¥Ñå5…ÁUØ€ü€ˆ‘•™¥¹”MAU1I}%9Q9M%Qe5A}UX€ˆ€¬¤¹ÍÁ•Õ±…É%¹Ñ•¹Í¥Ñå5…ÁUØ€è€ˆˆ°(€€€¤¹ÑÉ…¹Íµ¥ÍÍ¥½¹5…ÁUØ€ü€ˆ‘•™¥¹”QI9M5%MM%=95A}UX€ˆ€¬¤¹ÑÉ…¹Íµ¥ÍÍ¥½¹5…ÁUØ€è€ˆˆ°(€€€¤¹Ñ¡¥­¹•ÍÍ5…ÁUØ€ü€ˆ‘•™¥¹”Q!%-9MM5A}UX€ˆ€¬¤¹Ñ¡¥­¹•ÍÍ5…ÁUØ€è€ˆˆ°(€€€¤¹Ù•ÉÑ•áQ…¹•¹ÑÌ€˜˜¤¹™±…ÑM¡…‘¥¹œ€ôôô€„Ä€ü€ˆ‘•™¥¹”UM}Q99Pˆ€è€ˆˆ°(€€€¤¹Ù•ÉÑ•á9½Éµ…±Ì€ü€ˆ‘•™¥¹”!M}9=I50ˆ€è€ˆˆ°(€€€¤¹Ù•ÉÑ•á½±½ÉÌ€ü€ˆ‘•™¥¹”UM}=1=Hˆ€è€ˆˆ°(€€€¤¹Ù•ÉÑ•á±Á¡…Ì€ü€ˆ‘•™¥¹”UM}=1=I}1A!ˆ€è€ˆˆ°(€€€¤¹Ù•ÉÑ•áUØÅÌ€ü€ˆ‘•™¥¹”UM}UXÄˆ€è€ˆˆ°(€€€¤¹Ù•ÉÑ•áUØÉÌ€ü€ˆ‘•™¥¹”UM}UXÈˆ€è€ˆˆ°(€€€¤¹Ù•ÉÑ•áUØÍÌ€ü€ˆ‘•™¥¹”UM}UXÌˆ€è€ˆˆ°(€€€¤¹Á½¥¹ÑÍUÙÌ€ü€ˆ‘•™¥¹”UM}A=%9QM}UXˆ€è€ˆˆ°(€€€¤¹™±…ÑM¡…‘¥¹œ€ü€ˆ‘•™¥¹”1Q}M!ˆ€è€ˆˆ°(€€€¤¹Í­¥¹¹¥¹œ€ü€ˆ‘•™¥¹”UM}M-%99%9ˆ€è€ˆˆ°(€€€¤¹µ½ÉÁ¡Q…É•ÑÌ€ü€ˆ‘•™¥¹”UM}5=IA!QIQLˆ€è€ˆˆ°(€€€¤¹µ½ÉÁ¡9½Éµ…±Ì€˜˜¤¹™±…ÑM¡…‘¥¹œ€ôôô€„Ä€ü€ˆ‘•™¥¹”UM}5=IA!9=I51Lˆ€è€ˆˆ°(€€€¤¹µ½ÉÁ¡½±½ÉÌ€ü€ˆ‘•™¥¹”UM}5=IA!=1=ILˆ€è€ˆˆ°(€€€¤¹µ½ÉÁ¡Q…É•ÑÍ½Õ¹Ğ€ø€À€ü€ˆ‘•™¥¹”5=IA!QIQM}QaQUI}MQI%€ˆ€¬¤¹µ½ÉÁ¡Q•áÑÕÉ•MÑÉ¥‘”€è€ˆˆ°(€€€¤¹µ½ÉÁ¡Q…É•ÑÍ½Õ¹Ğ€ø€À€ü€ˆ‘•™¥¹”5=IA!QIQM}=U9P€ˆ€¬¤¹µ½ÉÁ¡Q…É•ÑÍ½Õ¹Ğ€è€ˆˆ°(€€€¤¹‘½Õ‰±•M¥‘•€ü€ˆ‘•™¥¹”=U	1}M%ˆ€è€ˆˆ°(€€€¤¹™±¥ÁM¥‘•€ü€ˆ‘•™¥¹”1%A}M%ˆ€è€ˆˆ°(€€€¤¹Í¡…‘½İ5…Á¹…‰±•€ü€ˆ‘•™¥¹”UM}M!=]5@ˆ€è€ˆˆ°(€€€¤¹Í¡…‘½İ5…Á¹…‰±•€ü€ˆ‘•™¥¹”€ˆ€¬°€è€ˆˆ°(€€€¤¹Í¥é•ÑÑ•¹Õ…Ñ¥½¸€ü€ˆ‘•™¥¹”UM}M%iQQ9UQ%=8ˆ€è€ˆˆ°(€€€¤¹¹Õµ1¥¡ÑAÉ½‰•Ì€ø€À€ü€ˆ‘•™¥¹”UM}1%!Q}AI=	Lˆ€è€ˆˆ°(€€€¤¹±½…É¥Ñ¡µ¥•ÁÑ¡	Õ™™•È€ü€ˆ‘•™¥¹”UM}1=I%Q!5%}AQ!}	UHˆ€è€ˆˆ°(€€€¤¹É•Ù•ÉÍ•‘•ÁÑ¡	Õ™™•È€ü€ˆ‘•™¥¹”UM}IYIM}AQ!}	UHˆ€è€ˆˆ°(€€€€‰Õ¹¥™½É´µ…ĞĞµ½‘•±5…ÑÉ¥àìˆ°(€€€€‰Õ¹¥™½É´µ…ĞĞµ½‘•±Y¥•İ5…ÑÉ¥àìˆ°(€€€€‰Õ¹¥™½É´µ…ĞĞÁÉ½©•Ñ¥½¹5…ÑÉ¥àìˆ°(€€€€‰Õ¹¥™½É´µ…ĞĞÙ¥•İ5…ÑÉ¥àìˆ°(€€€€‰Õ¹¥™½É´µ…ĞÌ¹½Éµ…±5…ÑÉ¥àìˆ°(€€€€‰Õ¹¥™½É´Ù•ŒÌ…µ•É…A½Í¥Ñ¥½¸ìˆ°(€€€€‰Õ¹¥™½É´‰½½°¥Í=ÉÑ¡½É…Á¡¥Œìˆ°(€€€€ˆ¥™‘•˜UM}%9MQ9%9ˆ°(€€€€ˆ%…ÑÑÉ¥‰ÕÑ”µ…ĞĞ¥¹ÍÑ…¹•5…ÑÉ¥àìˆ°(€€€€ˆ•¹‘¥˜ˆ°(€€€€ˆ¥™‘•˜UM}%9MQ9%9}=1=Hˆ°(€€€€ˆ%…ÑÑÉ¥‰ÕÑ”Ù•ŒÌ¥¹ÍÑ…¹•½±½Èìˆ°(€€€€ˆ•¹‘¥˜ˆ°(€€€€ˆ¥™‘•˜UM}%9MQ9%9}5=IA ˆ°(€€€€ˆ%Õ¹¥™½É´Í…µÁ±•ÈÉµ½ÉÁ¡Q•áÑÕÉ”ìˆ°(€€€€ˆ•¹‘¥˜ˆ°(€€€€‰…ÑÑÉ¥‰ÕÑ”Ù•ŒÌÁ½Í¥Ñ¥½¸ìˆ°(€€€€‰…ÑÑÉ¥‰ÕÑ”Ù•ŒÌ¹½Éµ…°ìˆ°(€€€€‰…ÑÑÉ¥‰ÕÑ”Ù•ŒÈÕØìˆ°(€€€€ˆ¥™‘•˜UM}UXÄˆ°(€€€€ˆ%…ÑÑÉ¥‰ÕÑ”Ù•ŒÈÕØÄìˆ°(€€€€ˆ•¹‘¥˜ˆ°(€€€€ˆ¥™‘•˜UM}UXÈˆ°(€€€€ˆ%…ÑÑÉ¥‰ÕÑ”Ù•ŒÈÕØÈìˆ°(€€€€ˆ•¹‘¥˜ˆ°(€€€€ˆ¥™‘•˜UM}UXÌˆ°(€€€€ˆ%…ÑÑÉ¥‰ÕÑ”Ù•ŒÈÕØÌìˆ°(€€€€ˆ•¹‘¥˜ˆ°(€€€€ˆ¥™‘•˜UM}Q99Pˆ°(€€€€ˆ%…ÑÑÉ¥‰ÕÑ”Ù•ŒĞÑ…¹•¹Ğìˆ°(€€€€ˆ•¹‘¥˜ˆ°(€€€€ˆ¥˜‘•™¥¹• UM}=1=I}1A!€¤ˆ°(€€€€ˆ%…ÑÑÉ¥‰ÕÑ”Ù•ŒĞ½±½Èìˆ°(€€€€ˆ•±¥˜‘•™¥¹• UM}=1=H€¤ˆ°(€€€€ˆ%…ÑÑÉ¥‰ÕÑ”Ù•ŒÌ½±½Èìˆ°(€€€€ˆ•¹‘¥˜ˆ°(€€€€ˆ¥™‘•˜UM}M-%99%9ˆ°(€€€€ˆ%…ÑÑÉ¥‰ÕÑ”Ù•ŒĞÍ­¥¹%¹‘•àìˆ°(€€€€ˆ%…ÑÑÉ¥‰ÕÑ”Ù•ŒĞÍ­¥¹]•¥¡Ğìˆ°(€€€€ˆ•¹‘¥˜ˆ°(€€€€)€(€t¹™¥±Ñ•È¡]¸¤¹©½¥¸¡€)€¤°˜€ôl(€€€}¼¡¤¤°(€€€€ˆ‘•™¥¹”M!I}QeA€ˆ€¬¤¹Í¡…‘•ÉQåÁ”°(€€€€ˆ‘•™¥¹”M!I}95€ˆ€¬¤¹Í¡…‘•É9…µ”°(€€€Ø°(€€€¤¹ÕÍ•½œ€˜˜¤¹™½œ€ü€ˆ‘•™¥¹”UM}=ˆ€è€ˆˆ°(€€€¤¹ÕÍ•½œ€˜˜¤¹™½áÀÈ€ü€ˆ‘•™¥¹”=}a@Èˆ€è€ˆˆ°(€€€¤¹…±Á¡…Q½½Ù•É…”€ü€ˆ‘•™¥¹”1A!}Q=}=YIˆ€è€ˆˆ°(€€€¤¹µ…À€ü€ˆ‘•™¥¹”UM}5@ˆ€è€ˆˆ°(€€€¤¹µ…Ñ…À€ü€ˆ‘•™¥¹”UM}5Q@ˆ€è€ˆˆ°(€€€¤¹•¹Ù5…À€ü€ˆ‘•™¥¹”UM}9Y5@ˆ€è€ˆˆ°(€€€¤¹•¹Ù5…À€ü€ˆ‘•™¥¹”€ˆ€¬Œ€è€ˆˆ°(€€€¤¹•¹Ù5…À€ü€ˆ‘•™¥¹”€ˆ€¬ €è€ˆˆ°(€€€¤¹•¹Ù5…À€ü€ˆ‘•™¥¹”€ˆ€¬€è€ˆˆ°(€€€Ô€ü€ˆ‘•™¥¹”U	UY}Qa1}]%Q €ˆ€¬Ô¹Ñ•á•±]¥‘Ñ €è€ˆˆ°(€€€Ô€ü€ˆ‘•™¥¹”U	UY}Qa1}!%!P€ˆ€¬Ô¹Ñ•á•±!•¥¡Ğ€è€ˆˆ°(€€€Ô€ü€ˆ‘•™¥¹”U	UY}5a}5%@€ˆ€¬Ô¹µ…á5¥À€¬€ˆ¸Àˆ€è€ˆˆ°(€€€¤¹±¥¡Ñ5…À€ü€ˆ‘•™¥¹”UM}1%!Q5@ˆ€è€ˆˆ°(€€€¤¹…½5…À€ü€ˆ‘•™¥¹”UM}=5@ˆ€è€ˆˆ°(€€€¤¹‰ÕµÁ5…À€ü€ˆ‘•™¥¹”UM}	U5A5@ˆ€è€ˆˆ°(€€€¤¹¹½Éµ…±5…À€ü€ˆ‘•™¥¹”UM}9=I515@ˆ€è€ˆˆ°(€€€¤¹¹½Éµ…±5…Á=‰©•ÑMÁ…”€ü€ˆ‘•™¥¹”UM}9=I515A}=	)QMAˆ€è€ˆˆ°(€€€¤¹¹½Éµ…±5…ÁQ…¹•¹ÑMÁ…”€ü€ˆ‘•™¥¹”UM}9=I515A}Q99QMAˆ€è€ˆˆ°(€€€¤¹Á…­•‘9½Éµ…±5…À€ü€ˆ‘•™¥¹”UM}A-}9=I515@ˆ€è€ˆˆ°(€€€¤¹•µ¥ÍÍ¥Ù•5…À€ü€ˆ‘•™¥¹”UM}5%MM%Y5@ˆ€è€ˆˆ°(€€€¤¹…¹¥Í½ÑÉ½Áä€ü€ˆ‘•™¥¹”UM}9%M=QI=Adˆ€è€ˆˆ°(€€€¤¹…¹¥Í½ÑÉ½Áå5…À€ü€ˆ‘•™¥¹”UM}9%M=QI=Ae5@ˆ€è€ˆˆ°(€€€¤¹±•…É½…Ğ€ü€ˆ‘•™¥¹”UM}1I=Pˆ€è€ˆˆ°(€€€¤¹±•…É½…Ñ5…À€ü€ˆ‘•™¥¹”UM}1I=Q5@ˆ€è€ˆˆ°(€€€¤¹±•…É½…ÑI½Õ¡¹•ÍÍ5…À€ü€ˆ‘•™¥¹”UM}1I=Q}I=U!9MM5@ˆ€è€ˆˆ°(€€€¤¹±•…É½…Ñ9½Éµ…±5…À€ü€ˆ‘•™¥¹”UM}1I=Q}9=I515@ˆ€è€ˆˆ°(€€€¤¹‘¥ÍÁ•ÉÍ¥½¸€ü€ˆ‘•™¥¹”UM}%MAIM%=8ˆ€è€ˆˆ°(€€€¤¹¥É¥‘•Í•¹”€ü€ˆ‘•™¥¹”UM}%I%M9ˆ€è€ˆˆ°(€€€¤¹¥É¥‘•Í•¹•5…À€ü€ˆ‘•™¥¹”UM}%I%M95@ˆ€è€ˆˆ°(€€€¤¹¥É¥‘•Í•¹•Q¡¥­¹•ÍÍ5…À€ü€ˆ‘•™¥¹”UM}%I%M9}Q!%-9MM5@ˆ€è€ˆˆ°(€€€¤¹ÍÁ•Õ±…É5…À€ü€ˆ‘•™¥¹”UM}MAU1I5@ˆ€è€ˆˆ°(€€€¤¹ÍÁ•Õ±…É½±½É5…À€ü€ˆ‘•™¥¹”UM}MAU1I}=1=I5@ˆ€è€ˆˆ°(€€€¤¹ÍÁ•Õ±…É%¹Ñ•¹Í¥Ñå5…À€ü€ˆ‘•™¥¹”UM}MAU1I}%9Q9M%Qe5@ˆ€è€ˆˆ°(€€€¤¹É½Õ¡¹•ÍÍ5…À€ü€ˆ‘•™¥¹”UM}I=U!9MM5@ˆ€è€ˆˆ°(€€€¤¹µ•Ñ…±¹•ÍÍ5…À€ü€ˆ‘•™¥¹”UM}5Q19MM5@ˆ€è€ˆˆ°(€€€¤¹…±Á¡…5…À€ü€ˆ‘•™¥¹”UM}1A!5@ˆ€è€ˆˆ°(€€€¤¹…±Á¡…Q•ÍĞ€ü€ˆ‘•™¥¹”UM}1A!QMPˆ€è€ˆˆ°(€€€¤¹…±Á¡…!…Í €ü€ˆ‘•™¥¹”UM}1A!!M ˆ€è€ˆˆ°(€€€¤¹Í¡••¸€ü€ˆ‘•™¥¹”UM}M!8ˆ€è€ˆˆ°(€€€¤¹Í¡••¹½±½É5…À€ü€ˆ‘•™¥¹”UM}M!9}=1=I5@ˆ€è€ˆˆ°(€€€¤¹Í¡••¹I½Õ¡¹•ÍÍ5…À€ü€ˆ‘•™¥¹”UM}M!9}I=U!9MM5@ˆ€è€ˆˆ°(€€€¤¹ÑÉ…¹Íµ¥ÍÍ¥½¸€ü€ˆ‘•™¥¹”UM}QI9M5%MM%=8ˆ€è€ˆˆ°(€€€¤¹ÑÉ…¹Íµ¥ÍÍ¥½¹5…À€ü€ˆ‘•™¥¹”UM}QI9M5%MM%=95@ˆ€è€ˆˆ°(€€€¤¹Ñ¡¥­¹•ÍÍ5…À€ü€ˆ‘•™¥¹”UM}Q!%-9MM5@ˆ€è€ˆˆ°(€€€¤¹Ù•ÉÑ•áQ…¹•¹ÑÌ€˜˜¤¹™±…ÑM¡…‘¥¹œ€ôôô€„Ä€ü€ˆ‘•™¥¹”UM}Q99Pˆ€è€ˆˆ°(€€€¤¹Ù•ÉÑ•á½±½ÉÌñğ¤¹¥¹ÍÑ…¹¥¹½±½È€ü€ˆ‘•™¥¹”UM}=1=Hˆ€è€ˆˆ°(€€€¤¹Ù•ÉÑ•á±Á¡…Ìñğ¤¹‰…Ñ¡¥¹½±½È€ü€ˆ‘•™¥¹”UM}=1=I}1A!ˆ€è€ˆˆ°(€€€¤¹Ù•ÉÑ•áUØÅÌ€ü€ˆ‘•™¥¹”UM}UXÄˆ€è€ˆˆ°(€€€¤¹Ù•ÉÑ•áUØÉÌ€ü€ˆ‘•™¥¹”UM}UXÈˆ€è€ˆˆ°(€€€¤¹Ù•ÉÑ•áUØÍÌ€ü€ˆ‘•™¥¹”UM}UXÌˆ€è€ˆˆ°(€€€¤¹Á½¥¹ÑÍUÙÌ€ü€ˆ‘•™¥¹”UM}A=%9QM}UXˆ€è€ˆˆ°(€€€¤¹É…‘¥•¹Ñ5…À€ü€ˆ‘•™¥¹”UM}I%9Q5@ˆ€è€ˆˆ°(€€€¤¹™±…ÑM¡…‘¥¹œ€ü€ˆ‘•™¥¹”1Q}M!ˆ€è€ˆˆ°(€€€¤¹‘½Õ‰±•M¥‘•€ü€ˆ‘•™¥¹”=U	1}M%ˆ€è€ˆˆ°(€€€¤¹™±¥ÁM¥‘•€ü€ˆ‘•™¥¹”1%A}M%ˆ€è€ˆˆ°(€€€¤¹Í¡…‘½İ5…Á¹…‰±•€ü€ˆ‘•™¥¹”UM}M!=]5@ˆ€è€ˆˆ°(€€€¤¹Í¡…‘½İ5…Á¹…‰±•€ü€ˆ‘•™¥¹”€ˆ€¬°€è€ˆˆ°(€€€¤¹ÁÉ•µÕ±Ñ¥Á±¥•‘±Á¡„€ü€ˆ‘•™¥¹”AI5U1Q%A1%}1A!ˆ€è€ˆˆ°(€€€¤¹¹Õµ1¥¡ÑAÉ½‰•Ì€ø€À€ü€ˆ‘•™¥¹”UM}1%!Q}AI=	Lˆ€è€ˆˆ°(€€€¤¹¹Õµ1¥¡ÑAÉ½‰•É¥‘Ì€ø€À€ü€ˆ‘•™¥¹”UM}1%!Q}AI=	M}I%ˆ€è€ˆˆ°(€€€¤¹‘•½‘•Y¥‘•½Q•áÑÕÉ”€ü€ˆ‘•™¥¹”=}Y%=}QaQUIˆ€è€ˆˆ°(€€€¤¹‘•½‘•Y¥‘•½Q•áÑÕÉ•µ¥ÍÍ¥Ù”€ü€ˆ‘•™¥¹”=}Y%=}QaQUI}5%MM%Yˆ€è€ˆˆ°(€€€¤¹±½…É¥Ñ¡µ¥•ÁÑ¡	Õ™™•È€ü€ˆ‘•™¥¹”UM}1=I%Q!5%}AQ!}	UHˆ€è€ˆˆ°(€€€¤¹É•Ù•ÉÍ•‘•ÁÑ¡	Õ™™•È€ü€ˆ‘•™¥¹”UM}IYIM}AQ!}	UHˆ€è€ˆˆ°(€€€€‰Õ¹¥™½É´µ…ĞĞÙ¥•İ5…ÑÉ¥àìˆ°(€€€€‰Õ¹¥™½É´Ù•ŒÌ…µ•É…A½Í¥Ñ¥½¸ìˆ°(€€€€‰Õ¹¥™½É´‰½½°¥Í=ÉÑ¡½É…Á¡¥Œìˆ°(€€€¤¹Ñ½¹•5…ÁÁ¥¹œ€„ôô€À€ü€ˆ‘•™¥¹”Q=9}5AA%9ˆ€è€ˆˆ°(€€€¤¹Ñ½¹•5…ÁÁ¥¹œ€„ôô€À€ü=”¹Ñ½¹•µ…ÁÁ¥¹}Á…ÉÍ}™É…µ•¹Ğ€è€ˆˆ°(€€€¤¹Ñ½¹•5…ÁÁ¥¹œ€„ôô€À€üU ‰Ñ½¹•5…ÁÁ¥¹œˆ°¤¹Ñ½¹•5…ÁÁ¥¹œ¤€è€ˆˆ°(€€€¤¹‘¥Ñ¡•É¥¹œ€ü€ˆ‘•™¥¹”%Q!I%9ˆ€è€ˆˆ°(€€€¤¹½Á…ÅÕ”€ü€ˆ‘•™¥¹”=AEUˆ€è€ˆˆ°(€€€=”¹½±½ÉÍÁ…•}Á…ÉÍ}™É…µ•¹Ğ°(€€€% ‰±¥¹•…ÉQ½=ÕÑÁÕÑQ•á•°ˆ°¤¹½ÕÑÁÕÑ½±½ÉMÁ…”¤°(€€€ ¤°(€€€¤¹ÕÍ••ÁÑ¡A…­¥¹œ€ü€ˆ‘•™¥¹”AQ!}A-%9€ˆ€¬¤¹‘•ÁÑ¡A…­¥¹œ€è€ˆˆ°(€€€€)€(€t¹™¥±Ñ•È¡]¸¤¹©½¥¸¡€)€¤¤°„€ôYÌ¡„¤°„€ôÁ¼¡„°¤¤°„€ôµ¼¡„°¤¤°¼€ôYÌ¡¼¤°¼€ôÁ¼¡¼°¤¤°¼€ôµ¼¡¼°¤¤°„€ô¼¡„¤°¼€ô¼¡¼¤°¤¹¥ÍI…İM¡…‘•É5…Ñ•É¥…°€„ôô€„À€˜˜€¡P€ô€Ù•ÉÍ¥½¸€ÌÀÀ•Ì)€°´€ôl(€€€À°(€€€€ˆ‘•™¥¹”…ÑÑÉ¥‰ÕÑ”¥¸ˆ°(€€€€ˆ‘•™¥¹”Ù…Éå¥¹œ½ÕĞˆ°(€€€€ˆ‘•™¥¹”Ñ•áÑÕÉ”ÉÑ•áÑÕÉ”ˆ(€t¹©½¥¸¡€)€¤€¬€)€€¬´°˜€ôl(€€€€ˆ‘•™¥¹”Ù…Éå¥¹œ¥¸ˆ°(€€€¤¹±Í±Y•ÉÍ¥½¸€ôôô€ˆÌÀÀ•Ìˆ€ü€ˆˆ€è€‰±…å½ÕĞ¡±½…Ñ¥½¸€ô€À¤½ÕĞ¡¥¡ÀÙ•ŒĞÁ}™É…½±½Èìˆ°(€€€¤¹±Í±Y•ÉÍ¥½¸€ôôô€ˆÌÀÀ•Ìˆ€ü€ˆˆ€è€ˆ‘•™¥¹”±}É…½±½ÈÁ}™É…½±½Èˆ°(€€€€ˆ‘•™¥¹”±}É…•ÁÑ¡aP±}É…•ÁÑ ˆ°(€€€€ˆ‘•™¥¹”Ñ•áÑÕÉ”ÉÑ•áÑÕÉ”ˆ°(€€€€ˆ‘•™¥¹”Ñ•áÑÕÉ•Õ‰”Ñ•áÑÕÉ”ˆ°(€€€€ˆ‘•™¥¹”Ñ•áÑÕÉ”ÉAÉ½¨Ñ•áÑÕÉ•AÉ½¨ˆ°(€€€€ˆ‘•™¥¹”Ñ•áÑÕÉ”É1½‘aPÑ•áÑÕÉ•1½ˆ°(€€€€ˆ‘•™¥¹”Ñ•áÑÕÉ”ÉAÉ½©1½‘aPÑ•áÑÕÉ•AÉ½©1½ˆ°(€€€€ˆ‘•™¥¹”Ñ•áÑÕÉ•Õ‰•1½‘aPÑ•áÑÕÉ•1½ˆ°(€€€€ˆ‘•™¥¹”Ñ•áÑÕÉ”ÉÉ…‘aPÑ•áÑÕÉ•É…ˆ°(€€€€ˆ‘•™¥¹”Ñ•áÑÕÉ”ÉAÉ½©É…‘aPÑ•áÑÕÉ•AÉ½©É…ˆ°(€€€€ˆ‘•™¥¹”Ñ•áÑÕÉ•Õ‰•É…‘aPÑ•áÑÕÉ•É…ˆ(€t¹©½¥¸¡€)€¤€¬€)€€¬˜¤ì(€½¹ÍĞ€ôP€¬´€¬„°4€ôP€¬˜€¬¼°€ô¡¼¡È°È¹YIQa}M!H°¤°H€ô¡¼¡È°È¹I59Q}M!H°4¤ì(€È¹…ÑÑ…¡M¡…‘•È¡ˆ°¤°È¹…ÑÑ…¡M¡…‘•È¡ˆ°H¤°¤¹¥¹‘•àÁÑÑÉ¥‰ÕÑ•9…µ”€„ôôÙ½¥€À€üÈ¹‰¥¹‘ÑÑÉ¥‰1½…Ñ¥½¸¡ˆ°€À°¤¹¥¹‘•àÁÑÑÉ¥‰ÕÑ•9…µ”¤€è¤¹¡…ÍA½Í¥Ñ¥½¹ÑÑÉ¥‰ÕÑ”€ôôô€„À€˜˜È¹‰¥¹‘ÑÑÉ¥‰1½…Ñ¥½¸¡ˆ°€À°€‰Á½Í¥Ñ¥½¸ˆ¤°È¹±¥¹­AÉ½É…´¡ˆ¤ì(€™Õ¹Ñ¥½¸¡Ü¤ì(€€€¥˜€¡”¹‘•‰Õœ¹¡•­M¡…‘•ÉÉÉ½ÉÌ¤ì(€€€€€½¹ÍĞ¬€ôÈ¹•ÑAÉ½É…µ%¹™½1½œ¡ˆ¤ñğ€ˆˆ°`€ôÈ¹•ÑM¡…‘•É%¹™½1½œ¡¤ñğ€ˆˆ°Ä€ôÈ¹•ÑM¡…‘•É%¹™½1½œ¡H¤ñğ€ˆˆ°€ô¬¹ÑÉ¥´ ¤°,€ô`¹ÑÉ¥´ ¤°<€ôÄ¹ÑÉ¥´ ¤ì(€€€€€±•ĞÑ”€ô€„À°€€ô€„Àì(€€€€€¥˜€¡È¹•ÑAÉ½É…µA…É…µ•Ñ•È¡ˆ°È¹1%9-}MQQUL¤€ôôô€„Ä¤(€€€€€€€¥˜€¡Ñ”€ô€„Ä°ÑåÁ•½˜”¹‘•‰Õœ¹½¹M¡…‘•ÉÉÉ½È€ôô€‰™Õ¹Ñ¥½¸ˆ¤”¹‘•‰Õœ¹½¹M¡…‘•ÉÉÉ½È¡È°ˆ°°H¤ì(€€€€€€€•±Í”ì(€€€€€€€€€½¹ÍĞ¥”€ô™¼¡È°°€‰Ù•ÉÑ•àˆ¤°Õ”€ô™¼¡È°H°€‰™É…µ•¹Ğˆ¤ì(€€€€€€€€€1” ‰]•‰1AÉ½É…´èM¡…‘•ÈÉÉ½È€ˆ€¬È¹•ÑÉÉ½È ¤€¬€ˆ€´Y1%Q}MQQUL€ˆ€¬È¹•ÑAÉ½É…µA…É…µ•Ñ•È¡ˆ°È¹Y1%Q}MQQUL¤€¬€()5…Ñ•É¥…°9…µ”è€€¬Ü¹¹…µ”€¬€)5…Ñ•É¥…°QåÁ”è€€¬Ü¹ÑåÁ”€¬€()AÉ½É…´%¹™¼1½œè€€¬€¬€)€€¬¥”€¬€)€€¬Õ”¤ì(€€€€€€€ô(€€€€€•±Í”€„ôô€ˆˆ€üM” ‰]•‰1AÉ½É…´èAÉ½É…´%¹™¼1½œèˆ°¤€è€¡,€ôôô€ˆˆñğ<€ôôô€ˆˆ¤€˜˜€ €ô€„Ä¤ì(€€€€€€€˜˜€¡Ü¹‘¥…¹½ÍÑ¥Ì€ôì(€€€€€€€ÉÕ¹¹…‰±”èÑ”°(€€€€€€€ÁÉ½É…µ1½œè°(€€€€€€€Ù•ÉÑ•áM¡…‘•Èèì(€€€€€€€€€±½œè,°(€€€€€€€€€ÁÉ•™¥àè´(€€€€€€€ô°(€€€€€€€™É…µ•¹ÑM¡…‘•Èèì(€€€€€€€€€±½œè<°(€€€€€€€€€ÁÉ•™¥àè˜(€€€€€€€ô(€€€€€ô¤ì(€€€ô(€€€È¹‘•±•Ñ•M¡…‘•È¡¤°È¹‘•±•Ñ•M¡…‘•È¡H¤°œ€ô¹•ÜUÈ¡È°ˆ¤°ä€ô	¡È°ˆ¤ì(€ô(€±•Ğœì(€Ñ¡¥Ì¹•ÑU¹¥™½ÉµÌ€ô™Õ¹Ñ¥½¸ ¤ì(€€€É•ÑÕÉ¸œ€ôôôÙ½¥€À€˜˜¡Ñ¡¥Ì¤°œì(€ôì(€±•Ğäì(€Ñ¡¥Ì¹•ÑÑÑÉ¥‰ÕÑ•Ì€ô™Õ¹Ñ¥½¸ ¤ì(€€€É•ÑÕÉ¸ä€ôôôÙ½¥€À€˜˜¡Ñ¡¥Ì¤°äì(€ôì(€±•Ğ€ô¤¹É•¹‘•É•ÉáÑ•¹Í¥½¹A…É…±±•±M¡…‘•É½µÁ¥±”€ôôô€„Äì(€É•ÑÕÉ¸Ñ¡¥Ì¹¥ÍI•…‘ä€ô™Õ¹Ñ¥½¸ ¤ì(€€€É•ÑÕÉ¸€ôôô€„Ä€˜˜€¡€ôÈ¹•ÑAÉ½É…µA…É…µ•Ñ•È¡ˆ°¤¤°ì(€ô°Ñ¡¥Ì¹‘•ÍÑÉ½ä€ô™Õ¹Ñ¥½¸ ¤ì(€€€¸¹É•±•…Í•MÑ…Ñ•Í=™AÉ½É…´¡Ñ¡¥Ì¤°È¹‘•±•Ñ•AÉ½É…´¡ˆ¤°Ñ¡¥Ì¹ÁÉ½É…´€ôÙ½¥€Àì(€ô°Ñ¡¥Ì¹ÑåÁ”€ô¤¹Í¡…‘•ÉQåÁ”°Ñ¡¥Ì¹¹…µ”€ô¤¹Í¡…‘•É9…µ”°Ñ¡¥Ì¹¥€ôA¬¬°Ñ¡¥Ì¹…¡•-•ä€ôĞ°Ñ¡¥Ì¹ÕÍ•‘Q¥µ•Ì€ô€Ä°Ñ¡¥Ì¹ÁÉ½É…´€ôˆ°Ñ¡¥Ì¹Ù•ÉÑ•áM¡…‘•È€ô°Ñ¡¥Ì¹™É…µ•¹ÑM¡…‘•È€ôH°Ñ¡¥Ìì)ô)Ù…ÈÑ˜€ô€À°¹˜€ô±…ÍÌì(€½¹ÍÑÉÕÑ½È ¤ì(€€€Ñ¡¥Ì¹Í¡…‘•É…¡”€ô€¼¨}}AUI}|€¨¼¹•Ü5…À ¤°Ñ¡¥Ì¹µ…Ñ•É¥…±…¡”€ô€¼¨}}AUI}|€¨¼¹•Ü5…À ¤ì(€ô(€ÕÁ‘…Ñ”¡”°Ğ°¤¤ì(€€€½¹ÍĞ¸€ôÑ¡¥Ì¹}•ÑM¡…‘•É…¡•½É5…Ñ•É¥…°¡”¤ì(€€€É•ÑÕÉ¸¸¹¡…Ì¡Ğ¤€ôôô€„Ä€˜˜€¡¸¹…‘¡Ğ¤°Ğ¹ÕÍ•‘Q¥µ•Ì¬¬¤°¸¹¡…Ì¡¤¤€ôôô€„Ä€˜˜€¡¸¹…‘¡¤¤°¤¹ÕÍ•‘Q¥µ•Ì¬¬¤°Ñ¡¥Ìì(€ô(€É•µ½Ù”¡”¤ì(€€€½¹ÍĞĞ€ôÑ¡¥Ì¹µ…Ñ•É¥…±…¡”¹•Ğ¡”¤ì(€€€™½È€¡½¹ÍĞ¤½˜Ğ¤(€€€€€¤¹ÕÍ•‘Q¥µ•Ì´´°¤¹ÕÍ•‘Q¥µ•Ì€ôôô€À€˜˜Ñ¡¥Ì¹Í¡…‘•É…¡”¹‘•±•Ñ”¡¤¹½‘”¤ì(€€€É•ÑÕÉ¸Ñ¡¥Ì¹µ…Ñ•É¥…±…¡”¹‘•±•Ñ”¡”¤°Ñ¡¥Ìì(€ô(€•ÑY•ÉÑ•áM¡…‘•ÉMÑ…”¡”¤ì(€€€É•ÑÕÉ¸Ñ¡¥Ì¹}•ÑM¡…‘•ÉMÑ…”¡”¹Ù•ÉÑ•áM¡…‘•È¤ì(€ô(€•ÑÉ…µ•¹ÑM¡…‘•ÉMÑ…”¡”¤ì(€€€É•ÑÕÉ¸Ñ¡¥Ì¹}•ÑM¡…‘•ÉMÑ…”¡”¹™É…µ•¹ÑM¡…‘•È¤ì(€ô(€‘¥ÍÁ½Í” ¤ì(€€€Ñ¡¥Ì¹Í¡…‘•É…¡”¹±•…È ¤°Ñ¡¥Ì¹µ…Ñ•É¥…±…¡”¹±•…È ¤ì(€ô(€}•ÑM¡…‘•É…¡•½É5…Ñ•É¥…°¡”¤ì(€€€½¹ÍĞĞ€ôÑ¡¥Ì¹µ…Ñ•É¥…±…¡”ì(€€€±•Ğ¤€ôĞ¹•Ğ¡”¤ì(€€€É•ÑÕÉ¸¤€ôôôÙ½¥€À€˜˜€¡¤€ô€¼¨}}AUI}|€¨¼¹•ÜM•Ğ ¤°Ğ¹Í•Ğ¡”°¤¤¤°¤ì(€ô(€}•ÑM¡…‘•ÉMÑ…”¡”¤ì(€€€½¹ÍĞĞ€ôÑ¡¥Ì¹Í¡…‘•É…¡”ì(€€€±•Ğ¤€ôĞ¹•Ğ¡”¤ì(€€€É•ÑÕÉ¸¤€ôôôÙ½¥€À€˜˜€¡¤€ô¹•ÜÉ˜¡”¤°Ğ¹Í•Ğ¡”°¤¤¤°¤ì(€ô)ô°É˜€ô±…ÍÌì(€½¹ÍÑÉÕÑ½È¡”¤ì(€€€Ñ¡¥Ì¹¥€ôÑ˜¬¬°Ñ¡¥Ì¹½‘”€ô”°Ñ¡¥Ì¹ÕÍ•‘Q¥µ•Ì€ô€Àì(€ô)ôì)™Õ¹Ñ¥½¸Í˜¡”¤ì(€É•ÑÕÉ¸”€ôôô€ÄÀÌÀñğ”€ôôô€ÌÜĞäÀñğ”€ôôô€ÌØÈàÔì)ô)™Õ¹Ñ¥½¸…˜¡”°Ğ°¤°¸°È°Ì¤ì(€½¹ÍĞ„€ô¹•Üi¼ ¤°¼€ô¹•Ü¹˜ ¤°°€ô€¼¨}}AUI}|€¨¼¹•ÜM•Ğ ¤°Œ€ômt° €ô€¼¨}}AUI}|€¨¼¹•Ü5…À ¤°€ô¸¹±½…É¥Ñ¡µ¥•ÁÑ¡	Õ™™•Èì(€±•ĞÔ€ô¸¹ÁÉ•¥Í¥½¸ì(€½¹ÍĞÀ€ôì(€€€5•Í¡•ÁÑ¡5…Ñ•É¥…°è€‰‘•ÁÑ ˆ°(€€€5•Í¡¥ÍÑ…¹•5…Ñ•É¥…°è€‰‘¥ÍÑ…¹”ˆ°(€€€5•Í¡9½Éµ…±5…Ñ•É¥…°è€‰¹½Éµ…°ˆ°(€€€5•Í¡	…Í¥5…Ñ•É¥…°è€‰‰…Í¥Œˆ°(€€€5•Í¡1…µ‰•ÉÑ5…Ñ•É¥…°è€‰±…µ‰•ÉĞˆ°(€€€5•Í¡A¡½¹5…Ñ•É¥…°è€‰Á¡½¹œˆ°(€€€5•Í¡Q½½¹5…Ñ•É¥…°è€‰Ñ½½¸ˆ°(€€€5•Í¡MÑ…¹‘…É‘5…Ñ•É¥…°è€‰Á¡åÍ¥…°ˆ°(€€€5•Í¡A¡åÍ¥…±5…Ñ•É¥…°è€‰Á¡åÍ¥…°ˆ°(€€€5•Í¡5…Ñ…Á5…Ñ•É¥…°è€‰µ…Ñ…Àˆ°(€€€1¥¹•	…Í¥5…Ñ•É¥…°è€‰‰…Í¥Œˆ°(€€€1¥¹•…Í¡•‘5…Ñ•É¥…°è€‰‘…Í¡•ˆ°(€€€A½¥¹ÑÍ5…Ñ•É¥…°è€‰Á½¥¹ÑÌˆ°(€€€M¡…‘½İ5…Ñ•É¥…°è€‰Í¡…‘½Üˆ°(€€€MÁÉ¥Ñ•5…Ñ•É¥…°è€‰ÍÁÉ¥Ñ”ˆ(€ôì(€™Õ¹Ñ¥½¸Ø¡œ¤ì(€€€É•ÑÕÉ¸°¹…‘¡œ¤°œ€ôôô€À€ü€‰ÕØˆ€èÕØ‘íõ€ì(€ô(€™Õ¹Ñ¥½¸ˆ¡œ°ä°°Ü°¬°`¤ì(€€€½¹ÍĞÄ€ôÜ¹™½œ°€ô¬¹•½µ•ÑÉä°,€ôœ¹¥Í5•Í¡MÑ…¹‘…É‘5…Ñ•É¥…°ñğœ¹¥Í5•Í¡1…µ‰•ÉÑ5…Ñ•É¥…°ñğœ¹¥Í5•Í¡A¡½¹5…Ñ•É¥…°€üÜ¹•¹Ù¥É½¹µ•¹Ğ€è¹Õ±°°<€ôœ¹¥Í5•Í¡MÑ…¹‘…É‘5…Ñ•É¥…°ñğœ¹¥Í5•Í¡1…µ‰•ÉÑ5…Ñ•É¥…°€˜˜€…œ¹•¹Ù5…Àñğœ¹¥Í5•Í¡A¡½¹5…Ñ•É¥…°€˜˜€…œ¹•¹Ù5…À°Ñ”€ôĞ¹•Ğ¡œ¹•¹Ù5…Àñğ,°<¤°€€ôÑ”€˜˜Ñ”¹µ…ÁÁ¥¹œ€ôôô€ÌÀØ€üÑ”¹¥µ…”¹¡•¥¡Ğ€è¹Õ±°°¥”€ôÁmœ¹ÑåÁ•tì(€€€œ¹ÁÉ•¥Í¥½¸€„ôô¹Õ±°€˜˜€¡Ô€ô¸¹•Ñ5…áAÉ•¥Í¥½¸¡œ¹ÁÉ•¥Í¥½¸¤°Ô€„ôôœ¹ÁÉ•¥Í¥½¸€˜˜M” ‰]•‰1AÉ½É…´¹•ÑA…É…µ•Ñ•ÉÌèˆ°œ¹ÁÉ•¥Í¥½¸°€‰¹½ĞÍÕÁÁ½ÉÑ•°ÕÍ¥¹œˆ°Ô°€‰¥¹ÍÑ•…¸ˆ¤¤ì(€€€½¹ÍĞÕ”€ô¹µ½ÉÁ¡ÑÑÉ¥‰ÕÑ•Ì¹Á½Í¥Ñ¥½¸ñğ¹µ½ÉÁ¡ÑÑÉ¥‰ÕÑ•Ì¹¹½Éµ…°ñğ¹µ½ÉÁ¡ÑÑÉ¥‰ÕÑ•Ì¹½±½È°”€ôÕ”€„ôôÙ½¥€À€üÕ”¹±•¹Ñ €è€Àì(€€€±•ĞÙ”€ô€Àì(€€€¹µ½ÉÁ¡ÑÑÉ¥‰ÕÑ•Ì¹Á½Í¥Ñ¥½¸€„ôôÙ½¥€À€˜˜€¡Ù”€ô€Ä¤°¹µ½ÉÁ¡ÑÑÉ¥‰ÕÑ•Ì¹¹½Éµ…°€„ôôÙ½¥€À€˜˜€¡Ù”€ô€È¤°¹µ½ÉÁ¡ÑÑÉ¥‰ÕÑ•Ì¹½±½È€„ôôÙ½¥€À€˜˜€¡Ù”€ô€Ì¤ì(€€€±•Ğå”° °D°‘”ì(€€€¥˜€¡¥”¤ì(€€€€€½¹ÍĞİ”€ô…¥m¥•tì(€€€€€å”€ôİ”¹Ù•ÉÑ•áM¡…‘•È° €ôİ”¹™É…µ•¹ÑM¡…‘•Èì(€€€ô•±Í”ì(€€€€€å”€ôœ¹Ù•ÉÑ•áM¡…‘•È° €ôœ¹™É…µ•¹ÑM¡…‘•Èì(€€€€€½¹ÍĞİ”€ô¼¹•ÑY•ÉÑ•áM¡…‘•ÉMÑ…”¡œ¤°Ğ€ô¼¹•ÑÉ…µ•¹ÑM¡…‘•ÉMÑ…”¡œ¤ì(€€€€€¼¹ÕÁ‘…Ñ”¡œ°İ”°Ğ¤°D€ôİ”¹¥°‘”€ôĞ¹¥ì(€€€ô(€€€½¹ÍĞ±”€ô”¹•ÑI•¹‘•ÉQ…É•Ğ ¤°I”€ô”¹ÍÑ…Ñ”¹‰Õ™™•ÉÌ¹‘•ÁÑ ¹•ÑI•Ù•ÉÍ• ¤°”€ô¬¹¥Í%¹ÍÑ…¹•‘5•Í €ôôô€„À°%”€ô¬¹¥Í	…Ñ¡•‘5•Í €ôôô€„À°©”€ô€„…œ¹µ…À°]”€ô€„…œ¹µ…Ñ…À°¹Ğ€ô€„…Ñ”°‰Ğ€ô€„…œ¹…½5…À°1Ğ€ô€„…œ¹±¥¡Ñ5…À°	Ğ€ô€„…œ¹‰ÕµÁ5…À€˜˜œ¹İ¥É•™É…µ”€ôôô€„Ä°ÉĞ€ô€„…œ¹¹½Éµ…±5…À°5Ğ€ô€„…œ¹‘¥ÍÁ±…•µ•¹Ñ5…À°}Ğ€ô€„…œ¹•µ¥ÍÍ¥Ù•5…À°™Ğ€ô€„…œ¹µ•Ñ…±¹•ÍÍ5…À°€ô€„…œ¹É½Õ¡¹•ÍÍ5…À°éĞ€ôœ¹…¹¥Í½ÑÉ½Áä€ø€À°e”€ôœ¹±•…É½…Ğ€ø€À°ÍĞ€ôœ¹‘¥ÍÁ•ÉÍ¥½¸€ø€À°L€ôœ¹¥É¥‘•Í•¹”€ø€À°|€ôœ¹Í¡••¸€ø€À°@€ôœ¹ÑÉ…¹Íµ¥ÍÍ¥½¸€ø€À°\€ôéĞ€˜˜€„…œ¹…¹¥Í½ÑÉ½Áå5…À°d€ôe”€˜˜€„…œ¹±•…É½…Ñ5…À°É”€ôe”€˜˜€„…œ¹±•…É½…Ñ9½Éµ…±5…À°…”€ôe”€˜˜€„…œ¹±•…É½…ÑI½Õ¡¹•ÍÍ5…À°$€ôL€˜˜€„…œ¹¥É¥‘•Í•¹•5…À°¹”€ôL€˜˜€„…œ¹¥É¥‘•Í•¹•Q¡¥­¹•ÍÍ5…À°Á”€ô|€˜˜€„…œ¹Í¡••¹½±½É5…À°‰”€ô|€˜˜€„…œ¹Í¡••¹I½Õ¡¹•ÍÍ5…À°•”€ô€„…œ¹ÍÁ•Õ±…É5…À°á”€ô€„…œ¹ÍÁ•Õ±…É½±½É5…À°Q”€ô€„…œ¹ÍÁ•Õ±…É%¹Ñ•¹Í¥Ñå5…À°U”€ô@€˜˜€„…œ¹ÑÉ…¹Íµ¥ÍÍ¥½¹5…À°Å”€ô@€˜˜€„…œ¹Ñ¡¥­¹•ÍÍ5…À°0€ô€„…œ¹É…‘¥•¹Ñ5…À°¨€ô€„…œ¹…±Á¡…5…À°(€ôœ¹…±Á¡…Q•ÍĞ€ø€À°™”€ô€„…œ¹…±Á¡…!…Í °}”€ô€„…œ¹•áÑ•¹Í¥½¹Ìì(€€€±•Ğh€ô€Àì(€€€œ¹Ñ½¹•5…ÁÁ•€˜˜€¡±”€ôôô¹Õ±°ñğ±”¹¥ÍaII•¹‘•ÉQ…É•Ğ€ôôô€„À¤€˜˜€¡h€ô”¹Ñ½¹•5…ÁÁ¥¹œ¤ì(€€€½¹ÍĞ”€ôì(€€€€€Í¡…‘•É%è¥”°(€€€€€Í¡…‘•ÉQåÁ”èœ¹ÑåÁ”°(€€€€€Í¡…‘•É9…µ”èœ¹¹…µ”°(€€€€€Ù•ÉÑ•áM¡…‘•Èèå”°(€€€€€™É…µ•¹ÑM¡…‘•Èè °(€€€€€‘•™¥¹•Ìèœ¹‘•™¥¹•Ì°(€€€€€ÕÍÑ½µY•ÉÑ•áM¡…‘•É%èD°(€€€€€ÕÍÑ½µÉ…µ•¹ÑM¡…‘•É%è‘”°(€€€€€¥ÍI…İM¡…‘•É5…Ñ•É¥…°èœ¹¥ÍI…İM¡…‘•É5…Ñ•É¥…°€ôôô€„À°(€€€€€±Í±Y•ÉÍ¥½¸èœ¹±Í±Y•ÉÍ¥½¸°(€€€€€ÁÉ•¥Í¥½¸èÔ°(€€€€€‰…Ñ¡¥¹œè%”°(€€€€€‰…Ñ¡¥¹½±½Èè%”€˜˜¬¹}½±½ÉÍQ•áÑÕÉ”€„ôô¹Õ±°°(€€€€€¥¹ÍÑ…¹¥¹œè”°(€€€€€¥¹ÍÑ…¹¥¹½±½Èè”€˜˜¬¹¥¹ÍÑ…¹•½±½È€„ôô¹Õ±°°(€€€€€¥¹ÍÑ…¹¥¹5½ÉÁ è”€˜˜¬¹µ½ÉÁ¡Q•áÑÕÉ”€„ôô¹Õ±°°(€€€€€½ÕÑÁÕÑ½±½ÉMÁ…”è±”€ôôô¹Õ±°€ü”¹½ÕÑÁÕÑ½±½ÉMÁ…”€è±”¹¥ÍaII•¹‘•ÉQ…É•Ğ€ôôô€„À€ü±”¹Ñ•áÑÕÉ”¹½±½ÉMÁ…”€è!”¹İ½É­¥¹½±½ÉMÁ…”°(€€€€€…±Á¡…Q½½Ù•É…”è€„…œ¹…±Á¡…Q½½Ù•É…”°(€€€€€µ…Àè©”°(€€€€€µ…Ñ…Àè]”°(€€€€€•¹Ù5…Àè¹Ğ°(€€€€€•¹Ù5…Á5½‘”è¹Ğ€˜˜Ñ”¹µ…ÁÁ¥¹œ°(€€€€€•¹Ù5…ÁÕ‰•UY!•¥¡Ğè€°(€€€€€…½5…Àè‰Ğ°(€€€€€±¥¡Ñ5…Àè1Ğ°(€€€€€‰ÕµÁ5…Àè	Ğ°(€€€€€¹½Éµ…±5…ÀèÉĞ°(€€€€€‘¥ÍÁ±…•µ•¹Ñ5…Àè5Ğ°(€€€€€•µ¥ÍÍ¥Ù•5…Àè}Ğ°(€€€€€¹½Éµ…±5…Á=‰©•ÑMÁ…”èÉĞ€˜˜œ¹¹½Éµ…±5…ÁQåÁ”€ôôô€Ä°(€€€€€¹½Éµ…±5…ÁQ…¹•¹ÑMÁ…”èÉĞ€˜˜œ¹¹½Éµ…±5…ÁQåÁ”€ôôô€À°(€€€€€Á…­•‘9½Éµ…±5…ÀèÉĞ€˜˜œ¹¹½Éµ…±5…ÁQåÁ”€ôôô€À€˜˜Í˜¡œ¹¹½Éµ…±5…À¹™½Éµ…Ğ¤°(€€€€€µ•Ñ…±¹•ÍÍ5…Àè™Ğ°(€€€€€É½Õ¡¹•ÍÍ5…Àè°(€€€€€…¹¥Í½ÑÉ½ÁäèéĞ°(€€€€€…¹¥Í½ÑÉ½Áå5…Àè\°(€€€€€±•…É½…Ğèe”°(€€€€€±•…É½…Ñ5…Àèd°(€€€€€±•…É½…Ñ9½Éµ…±5…ÀèÉ”°(€€€€€±•…É½…ÑI½Õ¡¹•ÍÍ5…Àè…”°(€€€€€‘¥ÍÁ•ÉÍ¥½¸èÍĞ°(€€€€€¥É¥‘•Í•¹”èL°(€€€€€¥É¥‘•Í•¹•5…Àè$°(€€€€€¥É¥‘•Í•¹•Q¡¥­¹•ÍÍ5…Àè¹”°(€€€€€Í¡••¸è|°(€€€€€Í¡••¹½±½É5…ÀèÁ”°(€€€€€Í¡••¹I½Õ¡¹•ÍÍ5…Àè‰”°(€€€€€ÍÁ•Õ±…É5…Àè•”°(€€€€€ÍÁ•Õ±…É½±½É5…Àèá”°(€€€€€ÍÁ•Õ±…É%¹Ñ•¹Í¥Ñå5…ÀèQ”°(€€€€€ÑÉ…¹Íµ¥ÍÍ¥½¸è@°(€€€€€ÑÉ…¹Íµ¥ÍÍ¥½¹5…ÀèU”°(€€€€€Ñ¡¥­¹•ÍÍ5…ÀèÅ”°(€€€€€É…‘¥•¹Ñ5…Àè0°(€€€€€½Á…ÅÕ”èœ¹ÑÉ…¹ÍÁ…É•¹Ğ€ôôô€„Ä€˜˜œ¹‰±•¹‘¥¹œ€ôôô€Ä€˜˜œ¹…±Á¡…Q½½Ù•É…”€ôôô€„Ä°(€€€€€…±Á¡…5…Àè¨°(€€€€€…±Á¡…Q•ÍĞè(°(€€€€€…±Á¡…!…Í è™”°(€€€€€½µ‰¥¹”èœ¹½µ‰¥¹”°(€€€€€µ…ÁUØè©”€˜˜Ø¡œ¹µ…À¹¡…¹¹•°¤°(€€€€€…½5…ÁUØè‰Ğ€˜˜Ø¡œ¹…½5…À¹¡…¹¹•°¤°(€€€€€±¥¡Ñ5…ÁUØè1Ğ€˜˜Ø¡œ¹±¥¡Ñ5…À¹¡…¹¹•°¤°(€€€€€‰ÕµÁ5…ÁUØè	Ğ€˜˜Ø¡œ¹‰ÕµÁ5…À¹¡…¹¹•°¤°(€€€€€¹½Éµ…±5…ÁUØèÉĞ€˜˜Ø¡œ¹¹½Éµ…±5…À¹¡…¹¹•°¤°(€€€€€‘¥ÍÁ±…•µ•¹Ñ5…ÁUØè5Ğ€˜˜Ø¡œ¹‘¥ÍÁ±…•µ•¹Ñ5…À¹¡…¹¹•°¤°(€€€€€•µ¥ÍÍ¥Ù•5…ÁUØè}Ğ€˜˜Ø¡œ¹•µ¥ÍÍ¥Ù•5…À¹¡…¹¹•°¤°(€€€€€µ•Ñ…±¹•ÍÍ5…ÁUØè™Ğ€˜˜Ø¡œ¹µ•Ñ…±¹•ÍÍ5…À¹¡…¹¹•°¤°(€€€€€É½Õ¡¹•ÍÍ5…ÁUØè€˜˜Ø¡œ¹É½Õ¡¹•ÍÍ5…À¹¡…¹¹•°¤°(€€€€€…¹¥Í½ÑÉ½Áå5…ÁUØè\€˜˜Ø¡œ¹…¹¥Í½ÑÉ½Áå5…À¹¡…¹¹•°¤°(€€€€€±•…É½…Ñ5…ÁUØèd€˜˜Ø¡œ¹±•…É½…Ñ5…À¹¡…¹¹•°¤°(€€€€€±•…É½…Ñ9½Éµ…±5…ÁUØèÉ”€˜˜Ø¡œ¹±•…É½…Ñ9½Éµ…±5…À¹¡…¹¹•°¤°(€€€€€±•…É½…ÑI½Õ¡¹•ÍÍ5…ÁUØè…”€˜˜Ø¡œ¹±•…É½…ÑI½Õ¡¹•ÍÍ5…À¹¡…¹¹•°¤°(€€€€€¥É¥‘•Í•¹•5…ÁUØè$€˜˜Ø¡œ¹¥É¥‘•Í•¹•5…À¹¡…¹¹•°¤°(€€€€€¥É¥‘•Í•¹•Q¡¥­¹•ÍÍ5…ÁUØè¹”€˜˜Ø¡œ¹¥É¥‘•Í•¹•Q¡¥­¹•ÍÍ5…À¹¡…¹¹•°¤°(€€€€€Í¡••¹½±½É5…ÁUØèÁ”€˜˜Ø¡œ¹Í¡••¹½±½É5…À¹¡…¹¹•°¤°(€€€€€Í¡••¹I½Õ¡¹•ÍÍ5…ÁUØè‰”€˜˜Ø¡œ¹Í¡••¹I½Õ¡¹•ÍÍ5…À¹¡…¹¹•°¤°(€€€€€ÍÁ•Õ±…É5…ÁUØè•”€˜˜Ø¡œ¹ÍÁ•Õ±…É5…À¹¡…¹¹•°¤°(€€€€€ÍÁ•Õ±…É½±½É5…ÁUØèá”€˜˜Ø¡œ¹ÍÁ•Õ±…É½±½É5…À¹¡…¹¹•°¤°(€€€€€ÍÁ•Õ±…É%¹Ñ•¹Í¥Ñå5…ÁUØèQ”€˜˜Ø¡œ¹ÍÁ•Õ±…É%¹Ñ•¹Í¥Ñå5…À¹¡…¹¹•°¤°(€€€€€ÑÉ…¹Íµ¥ÍÍ¥½¹5…ÁUØèU”€˜˜Ø¡œ¹ÑÉ…¹Íµ¥ÍÍ¥½¹5…À¹¡…¹¹•°¤°(€€€€€Ñ¡¥­¹•ÍÍ5…ÁUØèÅ”€˜˜Ø¡œ¹Ñ¡¥­¹•ÍÍ5…À¹¡…¹¹•°¤°(€€€€€…±Á¡…5…ÁUØè¨€˜˜Ø¡œ¹…±Á¡…5…À¹¡…¹¹•°¤°(€€€€€Ù•ÉÑ•áQ…¹•¹ÑÌè€„…¹…ÑÑÉ¥‰ÕÑ•Ì¹Ñ…¹•¹Ğ€˜˜€¡ÉĞñğéĞ¤°(€€€€€Ù•ÉÑ•á9½Éµ…±Ìè€„…¹…ÑÑÉ¥‰ÕÑ•Ì¹¹½Éµ…°°(€€€€€Ù•ÉÑ•á½±½ÉÌèœ¹Ù•ÉÑ•á½±½ÉÌ°(€€€€€Ù•ÉÑ•á±Á¡…Ìèœ¹Ù•ÉÑ•á½±½ÉÌ€ôôô€„À€˜˜€„…¹…ÑÑÉ¥‰ÕÑ•Ì¹½±½È€˜˜¹…ÑÑÉ¥‰ÕÑ•Ì¹½±½È¹¥Ñ•µM¥é”€ôôô€Ğ°(€€€€€Á½¥¹ÑÍUÙÌè¬¹¥ÍA½¥¹ÑÌ€ôôô€„À€˜˜€„…¹…ÑÑÉ¥‰ÕÑ•Ì¹ÕØ€˜˜€¡©”ñğ¨¤°(€€€€€™½œè€„…Ä°(€€€€€ÕÍ•½œèœ¹™½œ€ôôô€„À°(€€€€€™½áÀÈè€„…Ä€˜˜Ä¹¥Í½áÀÈ°(€€€€€™±…ÑM¡…‘¥¹œèœ¹İ¥É•™É…µ”€ôôô€„Ä€˜˜€¡œ¹™±…ÑM¡…‘¥¹œ€ôôô€„Àñğ¹…ÑÑÉ¥‰ÕÑ•Ì¹¹½Éµ…°€ôôôÙ½¥€À€˜˜ÉĞ€ôôô€„Ä€˜˜€¡œ¹¥Í5•Í¡1…µ‰•ÉÑ5…Ñ•É¥…°ñğœ¹¥Í5•Í¡A¡½¹5…Ñ•É¥…°ñğœ¹¥Í5•Í¡MÑ…¹‘…É‘5…Ñ•É¥…°ñğœ¹¥Í5•Í¡A¡åÍ¥…±5…Ñ•É¥…°¤¤°(€€€€€Í¥é•ÑÑ•¹Õ…Ñ¥½¸èœ¹Í¥é•ÑÑ•¹Õ…Ñ¥½¸€ôôô€„À°(€€€€€±½…É¥Ñ¡µ¥•ÁÑ¡	Õ™™•Èè°(€€€€€É•Ù•ÉÍ•‘•ÁÑ¡	Õ™™•ÈèI”°(€€€€€Í­¥¹¹¥¹œè¬¹¥ÍM­¥¹¹•‘5•Í €ôôô€„À°(€€€€€¡…ÍA½Í¥Ñ¥½¹ÑÑÉ¥‰ÕÑ”è¹…ÑÑÉ¥‰ÕÑ•Ì¹Á½Í¥Ñ¥½¸€„ôôÙ½¥€À°(€€€€€µ½ÉÁ¡Q…É•ÑÌè¹µ½ÉÁ¡ÑÑÉ¥‰ÕÑ•Ì¹Á½Í¥Ñ¥½¸€„ôôÙ½¥€À°(€€€€€µ½ÉÁ¡9½Éµ…±Ìè¹µ½ÉÁ¡ÑÑÉ¥‰ÕÑ•Ì¹¹½Éµ…°€„ôôÙ½¥€À°(€€€€€µ½ÉÁ¡½±½ÉÌè¹µ½ÉÁ¡ÑÑÉ¥‰ÕÑ•Ì¹½±½È€„ôôÙ½¥€À°(€€€€€µ½ÉÁ¡Q…É•ÑÍ½Õ¹Ğè”°(€€€€€µ½ÉÁ¡Q•áÑÕÉ•MÑÉ¥‘”èÙ”°(€€€€€¹Õµ¥É1¥¡ÑÌèä¹‘¥É•Ñ¥½¹…°¹±•¹Ñ °(€€€€€¹ÕµA½¥¹Ñ1¥¡ÑÌèä¹Á½¥¹Ğ¹±•¹Ñ °(€€€€€¹ÕµMÁ½Ñ1¥¡ÑÌèä¹ÍÁ½Ğ¹±•¹Ñ °(€€€€€¹ÕµMÁ½Ñ1¥¡Ñ5…ÁÌèä¹ÍÁ½Ñ1¥¡Ñ5…À¹±•¹Ñ °(€€€€€¹ÕµI•ÑÉ•…1¥¡ÑÌèä¹É•ÑÉ•„¹±•¹Ñ °(€€€€€¹Õµ!•µ¥1¥¡ÑÌèä¹¡•µ¤¹±•¹Ñ °(€€€€€¹Õµ¥É1¥¡ÑM¡…‘½İÌèä¹‘¥É•Ñ¥½¹…±M¡…‘½İ5…À¹±•¹Ñ °(€€€€€¹ÕµA½¥¹Ñ1¥¡ÑM¡…‘½İÌèä¹Á½¥¹ÑM¡…‘½İ5…À¹±•¹Ñ °(€€€€€¹ÕµMÁ½Ñ1¥¡ÑM¡…‘½İÌèä¹ÍÁ½ÑM¡…‘½İ5…À¹±•¹Ñ °(€€€€€¹ÕµMÁ½Ñ1¥¡ÑM¡…‘½İÍ]¥Ñ¡5…ÁÌèä¹¹ÕµMÁ½Ñ1¥¡ÑM¡…‘½İÍ]¥Ñ¡5…ÁÌ°(€€€€€¹Õµ1¥¡ÑAÉ½‰•Ìèä¹¹Õµ1¥¡ÑAÉ½‰•Ì°(€€€€€¹Õµ1¥¡ÑAÉ½‰•É¥‘Ìè`¹±•¹Ñ °(€€€€€¹Õµ±¥ÁÁ¥¹A±…¹•ÌèÌ¹¹ÕµA±…¹•Ì°(€€€€€¹Õµ±¥Á%¹Ñ•ÉÍ•Ñ¥½¸èÌ¹¹Õµ%¹Ñ•ÉÍ•Ñ¥½¸°(€€€€€‘¥Ñ¡•É¥¹œèœ¹‘¥Ñ¡•É¥¹œ°(€€€€€Í¡…‘½İ5…Á¹…‰±•è”¹Í¡…‘½İ5…À¹•¹…‰±•€˜˜¹±•¹Ñ €ø€À°(€€€€€Í¡…‘½İ5…ÁQåÁ”è”¹Í¡…‘½İ5…À¹ÑåÁ”°(€€€€€Ñ½¹•5…ÁÁ¥¹œèh°(€€€€€‘•½‘•Y¥‘•½Q•áÑÕÉ”è©”€˜˜œ¹µ…À¹¥ÍY¥‘•½Q•áÑÕÉ”€ôôô€„À€˜˜!”¹•ÑQÉ…¹Í™•È¡œ¹µ…À¹½±½ÉMÁ…”¤€ôôô€‰ÍÉˆˆ°(€€€€€‘•½‘•Y¥‘•½Q•áÑÕÉ•µ¥ÍÍ¥Ù”è}Ğ€˜˜œ¹•µ¥ÍÍ¥Ù•5…À¹¥ÍY¥‘•½Q•áÑÕÉ”€ôôô€„À€˜˜!”¹•ÑQÉ…¹Í™•È¡œ¹•µ¥ÍÍ¥Ù•5…À¹½±½ÉMÁ…”¤€ôôô€‰ÍÉˆˆ°(€€€€€ÁÉ•µÕ±Ñ¥Á±¥•‘±Á¡„èœ¹ÁÉ•µÕ±Ñ¥Á±¥•‘±Á¡„°(€€€€€‘½Õ‰±•M¥‘•èœ¹Í¥‘”€ôôô€È°(€€€€€™±¥ÁM¥‘•èœ¹Í¥‘”€ôôô€Ä°(€€€€€ÕÍ••ÁÑ¡A…­¥¹œèœ¹‘•ÁÑ¡A…­¥¹œ€øô€À°(€€€€€‘•ÁÑ¡A…­¥¹œèœ¹‘•ÁÑ¡A…­¥¹œñğ€À°(€€€€€¥¹‘•àÁÑÑÉ¥‰ÕÑ•9…µ”èœ¹¥¹‘•àÁÑÑÉ¥‰ÕÑ•9…µ”°(€€€€€•áÑ•¹Í¥½¹±¥ÁÕ±±¥ÍÑ…¹”è}”€˜˜œ¹•áÑ•¹Í¥½¹Ì¹±¥ÁÕ±±¥ÍÑ…¹”€ôôô€„À€˜˜¤¹¡…Ì ‰]	1}±¥Á}Õ±±}‘¥ÍÑ…¹”ˆ¤°(€€€€€•áÑ•¹Í¥½¹5Õ±Ñ¥É…Üè€¡}”€˜˜œ¹•áÑ•¹Í¥½¹Ì¹µÕ±Ñ¥É…Ü€ôôô€„Àñğ%”¤€˜˜¤¹¡…Ì ‰]	1}µÕ±Ñ¥}‘É…Üˆ¤°(€€€€€É•¹‘•É•ÉáÑ•¹Í¥½¹A…É…±±•±M¡…‘•É½µÁ¥±”è¤¹¡…Ì ‰-!I}Á…É…±±•±}Í¡…‘•É}½µÁ¥±”ˆ¤°(€€€€€ÕÍÑ½µAÉ½É…µ…¡•-•äèœ¹ÕÍÑ½µAÉ½É…µ…¡•-•ä ¤(€€€ôì(€€€É•ÑÕÉ¸”¹Ù•ÉÑ•áUØÅÌ€ô°¹¡…Ì Ä¤°”¹Ù•ÉÑ•áUØÉÌ€ô°¹¡…Ì È¤°”¹Ù•ÉÑ•áUØÍÌ€ô°¹¡…Ì Ì¤°°¹±•…È ¤°”ì(€ô(€™Õ¹Ñ¥½¸´¡œ¤ì(€€€½¹ÍĞä€ômtì(€€€¥˜€¡œ¹Í¡…‘•É%€üä¹ÁÕÍ ¡œ¹Í¡…‘•É%¤€è€¡ä¹ÁÕÍ ¡œ¹ÕÍÑ½µY•ÉÑ•áM¡…‘•É%¤°ä¹ÁÕÍ ¡œ¹ÕÍÑ½µÉ…µ•¹ÑM¡…‘•É%¤¤°œ¹‘•™¥¹•Ì€„ôôÙ½¥€À¤™½È€¡½¹ÍĞ¥¸œ¹‘•™¥¹•Ì¤(€€€€€ä¹ÁÕÍ ¡¤°ä¹ÁÕÍ ¡œ¹‘•™¥¹•Ím	t¤ì(€€€É•ÑÕÉ¸œ¹¥ÍI…İM¡…‘•É5…Ñ•É¥…°€ôôô€„Ä€˜˜€¡˜¡ä°œ¤°P¡ä°œ¤°ä¹ÁÕÍ ¡”¹½ÕÑÁÕÑ½±½ÉMÁ…”¤¤°ä¹ÁÕÍ ¡œ¹ÕÍÑ½µAÉ½É…µ…¡•-•ä¤°ä¹©½¥¸ ¤ì(€ô(€™Õ¹Ñ¥½¸˜¡œ°ä¤ì(€€€œ¹ÁÕÍ ¡ä¹ÁÉ•¥Í¥½¸¤°œ¹ÁÕÍ ¡ä¹½ÕÑÁÕÑ½±½ÉMÁ…”¤°œ¹ÁÕÍ ¡ä¹•¹Ù5…Á5½‘”¤°œ¹ÁÕÍ ¡ä¹•¹Ù5…ÁÕ‰•UY!•¥¡Ğ¤°œ¹ÁÕÍ ¡ä¹µ…ÁUØ¤°œ¹ÁÕÍ ¡ä¹…±Á¡…5…ÁUØ¤°œ¹ÁÕÍ ¡ä¹±¥¡Ñ5…ÁUØ¤°œ¹ÁÕÍ ¡ä¹…½5…ÁUØ¤°œ¹ÁÕÍ ¡ä¹‰ÕµÁ5…ÁUØ¤°œ¹ÁÕÍ ¡ä¹¹½Éµ…±5…ÁUØ¤°œ¹ÁÕÍ ¡ä¹‘¥ÍÁ±…•µ•¹Ñ5…ÁUØ¤°œ¹ÁÕÍ ¡ä¹•µ¥ÍÍ¥Ù•5…ÁUØ¤°œ¹ÁÕÍ ¡ä¹µ•Ñ…±¹•ÍÍ5…ÁUØ¤°œ¹ÁÕÍ ¡ä¹É½Õ¡¹•ÍÍ5…ÁUØ¤°œ¹ÁÕÍ ¡ä¹…¹¥Í½ÑÉ½Áå5…ÁUØ¤°œ¹ÁÕÍ ¡ä¹±•…É½…Ñ5…ÁUØ¤°œ¹ÁÕÍ ¡ä¹±•…É½…Ñ9½Éµ…±5…ÁUØ¤°œ¹ÁÕÍ ¡ä¹±•…É½…ÑI½Õ¡¹•ÍÍ5…ÁUØ¤°œ¹ÁÕÍ ¡ä¹¥É¥‘•Í•¹•5…ÁUØ¤°œ¹ÁÕÍ ¡ä¹¥É¥‘•Í•¹•Q¡¥­¹•ÍÍ5…ÁUØ¤°œ¹ÁÕÍ ¡ä¹Í¡••¹½±½É5…ÁUØ¤°œ¹ÁÕÍ ¡ä¹Í¡••¹I½Õ¡¹•ÍÍ5…ÁUØ¤°œ¹ÁÕÍ ¡ä¹ÍÁ•Õ±…É5…ÁUØ¤°œ¹ÁÕÍ ¡ä¹ÍÁ•Õ±…É½±½É5…ÁUØ¤°œ¹ÁÕÍ ¡ä¹ÍÁ•Õ±…É%¹Ñ•¹Í¥Ñå5…ÁUØ¤°œ¹ÁÕÍ ¡ä¹ÑÉ…¹Íµ¥ÍÍ¥½¹5…ÁUØ¤°œ¹ÁÕÍ ¡ä¹Ñ¡¥­¹•ÍÍ5…ÁUØ¤°œ¹ÁÕÍ ¡ä¹½µ‰¥¹”¤°œ¹ÁÕÍ ¡ä¹™½áÀÈ¤°œ¹ÁÕÍ ¡ä¹Í¥é•ÑÑ•¹Õ…Ñ¥½¸¤°œ¹ÁÕÍ ¡ä¹µ½ÉÁ¡Q…É•ÑÍ½Õ¹Ğ¤°œ¹ÁÕÍ ¡ä¹µ½ÉÁ¡ÑÑÉ¥‰ÕÑ•½Õ¹Ğ¤°œ¹ÁÕÍ ¡ä¹¹Õµ¥É1¥¡ÑÌ¤°œ¹ÁÕÍ ¡ä¹¹ÕµA½¥¹Ñ1¥¡ÑÌ¤°œ¹ÁÕÍ ¡ä¹¹ÕµMÁ½Ñ1¥¡ÑÌ¤°œ¹ÁÕÍ ¡ä¹¹ÕµMÁ½Ñ1¥¡Ñ5…ÁÌ¤°œ¹ÁÕÍ ¡ä¹¹Õµ!•µ¥1¥¡ÑÌ¤°œ¹ÁÕÍ ¡ä¹¹ÕµI•ÑÉ•…1¥¡ÑÌ¤°œ¹ÁÕÍ ¡ä¹¹Õµ¥É1¥¡ÑM¡…‘½İÌ¤°œ¹ÁÕÍ ¡ä¹¹ÕµA½¥¹Ñ1¥¡ÑM¡…‘½İÌ¤°œ¹ÁÕÍ ¡ä¹¹ÕµMÁ½Ñ1¥¡ÑM¡…‘½İÌ¤°œ¹ÁÕÍ ¡ä¹¹ÕµMÁ½Ñ1¥¡ÑM¡…‘½İÍ]¥Ñ¡5…ÁÌ¤°œ¹ÁÕÍ ¡ä¹¹Õµ1¥¡ÑAÉ½‰•Ì¤°œ¹ÁÕÍ ¡ä¹Í¡…‘½İ5…ÁQåÁ”¤°œ¹ÁÕÍ ¡ä¹Ñ½¹•5…ÁÁ¥¹œ¤°œ¹ÁÕÍ ¡ä¹¹Õµ±¥ÁÁ¥¹A±…¹•Ì¤°œ¹ÁÕÍ ¡ä¹¹Õµ±¥Á%¹Ñ•ÉÍ•Ñ¥½¸¤°œ¹ÁÕÍ ¡ä¹‘•ÁÑ¡A…­¥¹œ¤ì(€ô(€™Õ¹Ñ¥½¸P¡œ°ä¤ì(€€€„¹‘¥Í…‰±•±° ¤°ä¹¥¹ÍÑ…¹¥¹œ€˜˜„¹•¹…‰±” À¤°ä¹¥¹ÍÑ…¹¥¹½±½È€˜˜„¹•¹…‰±” Ä¤°ä¹¥¹ÍÑ…¹¥¹5½ÉÁ €˜˜„¹•¹…‰±” È¤°ä¹µ…Ñ…À€˜˜„¹•¹…‰±” Ì¤°ä¹•¹Ù5…À€˜˜„¹•¹…‰±” Ğ¤°ä¹¹½Éµ…±5…Á=‰©•ÑMÁ…”€˜˜„¹•¹…‰±” Ô¤°ä¹¹½Éµ…±5…ÁQ…¹•¹ÑMÁ…”€˜˜„¹•¹…‰±” Ø¤°ä¹±•…É½…Ğ€˜˜„¹•¹…‰±” Ü¤°ä¹¥É¥‘•Í•¹”€˜˜„¹•¹…‰±” à¤°ä¹…±Á¡…Q•ÍĞ€˜˜„¹•¹…‰±” ä¤°ä¹Ù•ÉÑ•á½±½ÉÌ€˜˜„¹•¹…‰±” ÄÀ¤°ä¹Ù•ÉÑ•á±Á¡…Ì€˜˜„¹•¹…‰±” ÄÄ¤°ä¹Ù•ÉÑ•áUØÅÌ€˜˜„¹•¹…‰±” ÄÈ¤°ä¹Ù•ÉÑ•áUØÉÌ€˜˜„¹•¹…‰±” ÄÌ¤°ä¹Ù•ÉÑ•áUØÍÌ€˜˜„¹•¹…‰±” ÄĞ¤°ä¹Ù•ÉÑ•áQ…¹•¹ÑÌ€˜˜„¹•¹…‰±” ÄÔ¤°ä¹…¹¥Í½ÑÉ½Áä€˜˜„¹•¹…‰±” ÄØ¤°ä¹…±Á¡…!…Í €˜˜„¹•¹…‰±” ÄÜ¤°ä¹‰…Ñ¡¥¹œ€˜˜„¹•¹…‰±” Äà¤°ä¹‘¥ÍÁ•ÉÍ¥½¸€˜˜„¹•¹…‰±” Ää¤°ä¹‰…Ñ¡¥¹½±½È€˜˜„¹•¹…‰±” ÈÀ¤°ä¹É…‘¥•¹Ñ5…À€˜˜„¹•¹…‰±” ÈÄ¤°ä¹Á…­•‘9½Éµ…±5…À€˜˜„¹•¹…‰±” ÈÈ¤°ä¹Ù•ÉÑ•á9½Éµ…±Ì€˜˜„¹•¹…‰±” ÈÌ¤°œ¹ÁÕÍ ¡„¹µ…Í¬¤°„¹‘¥Í…‰±•±° ¤°ä¹™½œ€˜˜„¹•¹…‰±” À¤°ä¹ÕÍ•½œ€˜˜„¹•¹…‰±” Ä¤°ä¹™±…ÑM¡…‘¥¹œ€˜˜„¹•¹…‰±” È¤°ä¹±½…É¥Ñ¡µ¥•ÁÑ¡	Õ™™•È€˜˜„¹•¹…‰±” Ì¤°ä¹É•Ù•ÉÍ•‘•ÁÑ¡	Õ™™•È€˜˜„¹•¹…‰±” Ğ¤°ä¹Í­¥¹¹¥¹œ€˜˜„¹•¹…‰±” Ô¤°ä¹µ½ÉÁ¡Q…É•ÑÌ€˜˜„¹•¹…‰±” Ø¤°ä¹µ½ÉÁ¡9½Éµ…±Ì€˜˜„¹•¹…‰±” Ü¤°ä¹µ½ÉÁ¡½±½ÉÌ€˜˜„¹•¹…‰±” à¤°ä¹ÁÉ•µÕ±Ñ¥Á±¥•‘±Á¡„€˜˜„¹•¹…‰±” ä¤°ä¹Í¡…‘½İ5…Á¹…‰±•€˜˜„¹•¹…‰±” ÄÀ¤°ä¹‘½Õ‰±•M¥‘•€˜˜„¹•¹…‰±” ÄÄ¤°ä¹™±¥ÁM¥‘•€˜˜„¹•¹…‰±” ÄÈ¤°ä¹ÕÍ••ÁÑ¡A…­¥¹œ€˜˜„¹•¹…‰±” ÄÌ¤°ä¹‘¥Ñ¡•É¥¹œ€˜˜„¹•¹…‰±” ÄĞ¤°ä¹ÑÉ…¹Íµ¥ÍÍ¥½¸€˜˜„¹•¹…‰±” ÄÔ¤°ä¹Í¡••¸€˜˜„¹•¹…‰±” ÄØ¤°ä¹½Á…ÅÕ”€˜˜„¹•¹…‰±” ÄÜ¤°ä¹Á½¥¹ÑÍUÙÌ€˜˜„¹•¹…‰±” Äà¤°ä¹‘•½‘•Y¥‘•½Q•áÑÕÉ”€˜˜„¹•¹…‰±” Ää¤°ä¹‘•½‘•Y¥‘•½Q•áÑÕÉ•µ¥ÍÍ¥Ù”€˜˜„¹•¹…‰±” ÈÀ¤°ä¹…±Á¡…Q½½Ù•É…”€˜˜„¹•¹…‰±” ÈÄ¤°ä¹¹Õµ1¥¡ÑAÉ½‰•É¥‘Ì€ø€À€˜˜„¹•¹…‰±” ÈÈ¤°ä¹¡…ÍA½Í¥Ñ¥½¹ÑÑÉ¥‰ÕÑ”€˜˜„¹•¹…‰±” ÈÌ¤°œ¹ÁÕÍ ¡„¹µ…Í¬¤ì(€ô(€™Õ¹Ñ¥½¸¡œ¤ì(€€€½¹ÍĞä€ôÁmœ¹ÑåÁ•tì(€€€±•Ğì(€€€¥˜€¡ä¤ì(€€€€€½¹ÍĞÜ€ô…¥måtì(€€€€€€ô1 ¹±½¹”¡Ü¹Õ¹¥™½ÉµÌ¤ì(€€€ô•±Í”€ôœ¹Õ¹¥™½ÉµÌì(€€€É•ÑÕÉ¸ì(€ô(€™Õ¹Ñ¥½¸4¡œ°ä¤ì(€€€±•Ğ€ô ¹•Ğ¡ä¤ì(€€€É•ÑÕÉ¸€„ôôÙ½¥€À€ü€¬­¹ÕÍ•‘Q¥µ•Ì€è€¡€ô¹•Ü•˜¡”°ä°œ°È¤°Œ¹ÁÕÍ ¡¤° ¹Í•Ğ¡ä°¤¤°ì(€ô(€™Õ¹Ñ¥½¸¡œ¤ì(€€€¥˜€ ´µœ¹ÕÍ•‘Q¥µ•Ì€ôôô€À¤ì(€€€€€½¹ÍĞä€ôŒ¹¥¹‘•á=˜¡œ¤ì(€€€€€måt€ômŒ¹±•¹Ñ €´€Åt°Œ¹Á½À ¤° ¹‘•±•Ñ”¡œ¹…¡•-•ä¤°œ¹‘•ÍÑÉ½ä ¤ì(€€€ô(€ô(€™Õ¹Ñ¥½¸H¡œ¤ì(€€€¼¹É•µ½Ù”¡œ¤ì(€ô(€™Õ¹Ñ¥½¸ ¤ì(€€€¼¹‘¥ÍÁ½Í” ¤ì(€ô(€É•ÑÕÉ¸ì(€€€•ÑA…É…µ•Ñ•ÉÌèˆ°(€€€•ÑAÉ½É…µ…¡•-•äè´°(€€€•ÑU¹¥™½ÉµÌè°(€€€…ÅÕ¥É•AÉ½É…´è4°(€€€É•±•…Í•AÉ½É…´è°(€€€É•±•…Í•M¡…‘•É…¡”èH°(€€€ÁÉ½É…µÌèŒ°(€€€‘¥ÍÁ½Í”è(€ôì)ô)™Õ¹Ñ¥½¸½˜ ¤ì(€±•Ğ”€ô€¼¨}}AUI}|€¨¼¹•Ü]•…­5…À ¤ì(€™Õ¹Ñ¥½¸Ğ¡„¤ì(€€€É•ÑÕÉ¸”¹¡…Ì¡„¤ì(€ô(€™Õ¹Ñ¥½¸¤¡„¤ì(€€€±•Ğ¼€ô”¹•Ğ¡„¤ì(€€€É•ÑÕÉ¸¼€ôôôÙ½¥€À€˜˜€¡¼€ôíô°”¹Í•Ğ¡„°¼¤¤°¼ì(€ô(€™Õ¹Ñ¥½¸¸¡„¤ì(€€€”¹‘•±•Ñ”¡„¤ì(€ô(€™Õ¹Ñ¥½¸È¡„°¼°°¤ì(€€€”¹•Ğ¡„¥m½t€ô°ì(€ô(€™Õ¹Ñ¥½¸Ì ¤ì(€€€”€ô€¼¨}}AUI}|€¨¼¹•Ü]•…­5…À ¤ì(€ô(€É•ÑÕÉ¸ì(€€€¡…ÌèĞ°(€€€•Ğè¤°(€€€É•µ½Ù”è¸°(€€€ÕÁ‘…Ñ”èÈ°(€€€‘¥ÍÁ½Í”èÌ(€ôì)ô)™Õ¹Ñ¥½¸±˜¡”°Ğ¤ì(€É•ÑÕÉ¸”¹É½ÕÁ=É‘•È€„ôôĞ¹É½ÕÁ=É‘•È€ü”¹É½ÕÁ=É‘•È€´Ğ¹É½ÕÁ=É‘•È€è”¹É•¹‘•É=É‘•È€„ôôĞ¹É•¹‘•É=É‘•È€ü”¹É•¹‘•É=É‘•È€´Ğ¹É•¹‘•É=É‘•È€è”¹µ…Ñ•É¥…°¹¥€„ôôĞ¹µ…Ñ•É¥…°¹¥€ü”¹µ…Ñ•É¥…°¹¥€´Ğ¹µ…Ñ•É¥…°¹¥€è”¹µ…Ñ•É¥…±Y…É¥…¹Ğ€„ôôĞ¹µ…Ñ•É¥…±Y…É¥…¹Ğ€ü”¹µ…Ñ•É¥…±Y…É¥…¹Ğ€´Ğ¹µ…Ñ•É¥…±Y…É¥…¹Ğ€è”¹è€„ôôĞ¹è€ü”¹è€´Ğ¹è€è”¹¥€´Ğ¹¥ì)ô)™Õ¹Ñ¥½¸Ù¼¡”°Ğ¤ì(€É•ÑÕÉ¸”¹É½ÕÁ=É‘•È€„ôôĞ¹É½ÕÁ=É‘•È€ü”¹É½ÕÁ=É‘•È€´Ğ¹É½ÕÁ=É‘•È€è”¹É•¹‘•É=É‘•È€„ôôĞ¹É•¹‘•É=É‘•È€ü”¹É•¹‘•É=É‘•È€´Ğ¹É•¹‘•É=É‘•È€è”¹è€„ôôĞ¹è€üĞ¹è€´”¹è€è”¹¥€´Ğ¹¥ì)ô)™Õ¹Ñ¥½¸‰¼ ¤ì(€½¹ÍĞ”€ômtì(€±•ĞĞ€ô€Àì(€½¹ÍĞ¤€ômt°¸€ômt°È€ômtì(€™Õ¹Ñ¥½¸Ì ¤ì(€€€Ğ€ô€À°¤¹±•¹Ñ €ô€À°¸¹±•¹Ñ €ô€À°È¹±•¹Ñ €ô€Àì(€ô(€™Õ¹Ñ¥½¸„¡Ô¤ì(€€€±•ĞÀ€ô€Àì(€€€É•ÑÕÉ¸Ô¹¥Í%¹ÍÑ…¹•‘5•Í €˜˜€¡À€¬ô€È¤°Ô¹¥ÍM­¥¹¹•‘5•Í €˜˜€¡À€¬ô€Ä¤°Àì(€ô(€™Õ¹Ñ¥½¸¼¡Ô°À°Ø°ˆ°´°˜¤ì(€€€±•ĞP€ô•mÑtì(€€€É•ÑÕÉ¸P€ôôôÙ½¥€À€ü€¡P€ôì(€€€€€¥èÔ¹¥°(€€€€€½‰©•ĞèÔ°(€€€€€•½µ•ÑÉäèÀ°(€€€€€µ…Ñ•É¥…°èØ°(€€€€€µ…Ñ•É¥…±Y…É¥…¹Ğè„¡Ô¤°(€€€€€É½ÕÁ=É‘•Èèˆ°(€€€€€É•¹‘•É=É‘•ÈèÔ¹É•¹‘•É=É‘•È°(€€€€€èè´°(€€€€€É½ÕÀè˜(€€€ô°•mÑt€ôP¤€è€¡P¹¥€ôÔ¹¥°P¹½‰©•Ğ€ôÔ°P¹•½µ•ÑÉä€ôÀ°P¹µ…Ñ•É¥…°€ôØ°P¹µ…Ñ•É¥…±Y…É¥…¹Ğ€ô„¡Ô¤°P¹É½ÕÁ=É‘•È€ôˆ°P¹É•¹‘•É=É‘•È€ôÔ¹É•¹‘•É=É‘•È°P¹è€ô´°P¹É½ÕÀ€ô˜¤°Ğ¬¬°Pì(€ô(€™Õ¹Ñ¥½¸°¡Ô°À°Ø°ˆ°´°˜¤ì(€€€½¹ÍĞP€ô¼¡Ô°À°Ø°ˆ°´°˜¤ì(€€€Ø¹ÑÉ…¹Íµ¥ÍÍ¥½¸€ø€À€ü¸¹ÁÕÍ ¡P¤€èØ¹ÑÉ…¹ÍÁ…É•¹Ğ€ôôô€„À€üÈ¹ÁÕÍ ¡P¤€è¤¹ÁÕÍ ¡P¤ì(€ô(€™Õ¹Ñ¥½¸Œ¡Ô°À°Ø°ˆ°´°˜¤ì(€€€½¹ÍĞP€ô¼¡Ô°À°Ø°ˆ°´°˜¤ì(€€€Ø¹ÑÉ…¹Íµ¥ÍÍ¥½¸€ø€À€ü¸¹Õ¹Í¡¥™Ğ¡P¤€èØ¹ÑÉ…¹ÍÁ…É•¹Ğ€ôôô€„À€üÈ¹Õ¹Í¡¥™Ğ¡P¤€è¤¹Õ¹Í¡¥™Ğ¡P¤ì(€ô(€™Õ¹Ñ¥½¸ ¡Ô°À°Ø¤ì(€€€¤¹±•¹Ñ €ø€Ä€˜˜¤¹Í½ÉĞ¡Ôñğ±˜¤°¸¹±•¹Ñ €ø€Ä€˜˜¸¹Í½ÉĞ¡ÀñğÙ¼¤°È¹±•¹Ñ €ø€Ä€˜˜È¹Í½ÉĞ¡ÀñğÙ¼¤°Ø€˜˜€¡¤¹É•Ù•ÉÍ” ¤°¸¹É•Ù•ÉÍ” ¤°È¹É•Ù•ÉÍ” ¤¤ì(€ô(€™Õ¹Ñ¥½¸ ¤ì(€€€™½È€¡±•ĞÔ€ôĞ°À€ô”¹±•¹Ñ ìÔ€ğÀìÔ¬¬¤ì(€€€€€½¹ÍĞØ€ô•mÕtì(€€€€€¥˜€¡Ø¹¥€ôôô¹Õ±°¤‰É•…¬ì(€€€€€Ø¹¥€ô¹Õ±°°Ø¹½‰©•Ğ€ô¹Õ±°°Ø¹•½µ•ÑÉä€ô¹Õ±°°Ø¹µ…Ñ•É¥…°€ô¹Õ±°°Ø¹É½ÕÀ€ô¹Õ±°ì(€€€ô(€ô(€É•ÑÕÉ¸ì(€€€½Á…ÅÕ”è¤°(€€€ÑÉ…¹Íµ¥ÍÍ¥Ù”è¸°(€€€ÑÉ…¹ÍÁ…É•¹ĞèÈ°(€€€¥¹¥ĞèÌ°(€€€ÁÕÍ è°°(€€€Õ¹Í¡¥™ĞèŒ°(€€€™¥¹¥Í è°(€€€Í½ÉĞè (€ôì)ô)™Õ¹Ñ¥½¸˜ ¤ì(€±•Ğ”€ô€¼¨}}AUI}|€¨¼¹•Ü]•…­5…À ¤ì(€™Õ¹Ñ¥½¸Ğ¡¸°È¤ì(€€€½¹ÍĞÌ€ô”¹•Ğ¡¸¤ì(€€€±•Ğ„ì(€€€É•ÑÕÉ¸Ì€ôôôÙ½¥€À€ü€¡„€ô¹•Ü‰¼ ¤°”¹Í•Ğ¡¸°m…t¤¤€èÈ€øôÌ¹±•¹Ñ €ü€¡„€ô¹•Ü‰¼ ¤°Ì¹ÁÕÍ ¡„¤¤€è„€ôÍmÉt°„ì(€ô(€™Õ¹Ñ¥½¸¤ ¤ì(€€€”€ô€¼¨}}AUI}|€¨¼¹•Ü]•…­5…À ¤ì(€ô(€É•ÑÕÉ¸ì(€€€•ĞèĞ°(€€€‘¥ÍÁ½Í”è¤(€ôì)ô)™Õ¹Ñ¥½¸¡˜ ¤ì(€½¹ÍĞ”€ôíôì(€É•ÑÕÉ¸ì•Ğè™Õ¹Ñ¥½¸¡Ğ¤ì(€€€¥˜€¡•mĞ¹¥‘t€„ôôÙ½¥€À¤É•ÑÕÉ¸•mĞ¹¥‘tì(€€€±•Ğ¤ì(€€€Íİ¥Ñ €¡Ğ¹ÑåÁ”¤ì(€€€€€…Í”€‰¥É•Ñ¥½¹…±1¥¡Ğˆè(€€€€€€€¤€ôì(€€€€€€€€€‘¥É•Ñ¥½¸è¹•Ü8 ¤°(€€€€€€€€€½±½Èè¹•Ü9” ¤(€€€€€€€ôì(€€€€€€€‰É•…¬ì(€€€€€…Í”€‰MÁ½Ñ1¥¡Ğˆè(€€€€€€€¤€ôì(€€€€€€€€€Á½Í¥Ñ¥½¸è¹•Ü8 ¤°(€€€€€€€€€‘¥É•Ñ¥½¸è¹•Ü8 ¤°(€€€€€€€€€½±½Èè¹•Ü9” ¤°(€€€€€€€€€‘¥ÍÑ…¹”è€À°(€€€€€€€€€½¹•½Ìè€À°(€€€€€€€€€Á•¹Õµ‰É…½Ìè€À°(€€€€€€€€€‘•…äè€À(€€€€€€€ôì(€€€€€€€‰É•…¬ì(€€€€€…Í”€‰A½¥¹Ñ1¥¡Ğˆè(€€€€€€€¤€ôì(€€€€€€€€€Á½Í¥Ñ¥½¸è¹•Ü8 ¤°(€€€€€€€€€½±½Èè¹•Ü9” ¤°(€€€€€€€€€‘¥ÍÑ…¹”è€À°(€€€€€€€€€‘•…äè€À(€€€€€€€ôì(€€€€€€€‰É•…¬ì(€€€€€…Í”€‰!•µ¥ÍÁ¡•É•1¥¡Ğˆè(€€€€€€€¤€ôì(€€€€€€€€€‘¥É•Ñ¥½¸è¹•Ü8 ¤°(€€€€€€€€€Í­å½±½Èè¹•Ü9” ¤°(€€€€€€€€€É½Õ¹‘½±½Èè¹•Ü9” ¤(€€€€€€€ôì(€€€€€€€‰É•…¬ì(€€€€€…Í”€‰I•ÑÉ•…1¥¡Ğˆè(€€€€€€€¤€ôì(€€€€€€€€€½±½Èè¹•Ü9” ¤°(€€€€€€€€€Á½Í¥Ñ¥½¸è¹•Ü8 ¤°(€€€€€€€€€¡…±™]¥‘Ñ è¹•Ü8 ¤°(€€€€€€€€€¡…±™!•¥¡Ğè¹•Ü8 ¤(€€€€€€€ôì(€€€€€€€‰É•…¬ì(€€€ô(€€€É•ÑÕÉ¸•mĞ¹¥‘t€ô¤°¤ì(€ôôì)ô)™Õ¹Ñ¥½¸Õ˜ ¤ì(€½¹ÍĞ”€ôíôì(€É•ÑÕÉ¸ì•Ğè™Õ¹Ñ¥½¸¡Ğ¤ì(€€€¥˜€¡•mĞ¹¥‘t€„ôôÙ½¥€À¤É•ÑÕÉ¸•mĞ¹¥‘tì(€€€±•Ğ¤ì(€€€Íİ¥Ñ €¡Ğ¹ÑåÁ”¤ì(€€€€€…Í”€‰¥É•Ñ¥½¹…±1¥¡Ğˆè(€€€€€€€¤€ôì(€€€€€€€€€Í¡…‘½İ%¹Ñ•¹Í¥Ñäè€Ä°(€€€€€€€€€Í¡…‘½İ	¥…Ìè€À°(€€€€€€€€€Í¡…‘½İ9½Éµ…±	¥…Ìè€À°(€€€€€€€€€Í¡…‘½İI…‘¥ÕÌè€Ä°(€€€€€€€€€Í¡…‘½İ5…ÁM¥é”è¹•Ü” ¤(€€€€€€€ôì(€€€€€€€‰É•…¬ì(€€€€€…Í”€‰MÁ½Ñ1¥¡Ğˆè(€€€€€€€¤€ôì(€€€€€€€€€Í¡…‘½İ%¹Ñ•¹Í¥Ñäè€Ä°(€€€€€€€€€Í¡…‘½İ	¥…Ìè€À°(€€€€€€€€€Í¡…‘½İ9½Éµ…±	¥…Ìè€À°(€€€€€€€€€Í¡…‘½İI…‘¥ÕÌè€Ä°(€€€€€€€€€Í¡…‘½İ5…ÁM¥é”è¹•Ü” ¤(€€€€€€€ôì(€€€€€€€‰É•…¬ì(€€€€€…Í”€‰A½¥¹Ñ1¥¡Ğˆè(€€€€€€€¤€ôì(€€€€€€€€€Í¡…‘½İ%¹Ñ•¹Í¥Ñäè€Ä°(€€€€€€€€€Í¡…‘½İ	¥…Ìè€À°(€€€€€€€€€Í¡…‘½İ9½Éµ…±	¥…Ìè€À°(€€€€€€€€€Í¡…‘½İI…‘¥ÕÌè€Ä°(€€€€€€€€€Í¡…‘½İ5…ÁM¥é”è¹•Ü” ¤°(€€€€€€€€€Í¡…‘½İ…µ•É…9•…Èè€Ä°(€€€€€€€€€Í¡…‘½İ…µ•É……Èè€Å”Ì(€€€€€€€ôì(€€€€€€€‰É•…¬ì(€€€ô(€€€É•ÑÕÉ¸•mĞ¹¥‘t€ô¤°¤ì(€ôôì)ô)Ù…È‘˜€ô€Àì)™Õ¹Ñ¥½¸™˜¡”°Ğ¤ì(€É•ÑÕÉ¸€¡Ğ¹…ÍÑM¡…‘½Ü€ü€È€è€À¤€´€¡”¹…ÍÑM¡…‘½Ü€ü€È€è€À¤€¬€¡Ğ¹µ…À€ü€Ä€è€À¤€´€¡”¹µ…À€ü€Ä€è€À¤ì)ô)™Õ¹Ñ¥½¸Á˜¡”¤ì(€½¹ÍĞĞ€ô¹•Ü¡˜ ¤°¤€ôÕ˜ ¤°¸€ôì(€€€Ù•ÉÍ¥½¸è€À°(€€€¡…Í èì(€€€€€‘¥É•Ñ¥½¹…±1•¹Ñ è€´Ä°(€€€€€Á½¥¹Ñ1•¹Ñ è€´Ä°(€€€€€ÍÁ½Ñ1•¹Ñ è€´Ä°(€€€€€É•ÑÉ•…1•¹Ñ è€´Ä°(€€€€€¡•µ¥1•¹Ñ è€´Ä°(€€€€€¹Õµ¥É•Ñ¥½¹…±M¡…‘½İÌè€´Ä°(€€€€€¹ÕµA½¥¹ÑM¡…‘½İÌè€´Ä°(€€€€€¹ÕµMÁ½ÑM¡…‘½İÌè€´Ä°(€€€€€¹ÕµMÁ½Ñ5…ÁÌè€´Ä°(€€€€€¹Õµ1¥¡ÑAÉ½‰•Ìè€´Ä(€€€ô°(€€€…µ‰¥•¹Ğèl(€€€€€€À°(€€€€€€À°(€€€€€€À(€€€t°(€€€ÁÉ½‰”èmt°(€€€‘¥É•Ñ¥½¹…°èmt°(€€€‘¥É•Ñ¥½¹…±M¡…‘½Üèmt°(€€€‘¥É•Ñ¥½¹…±M¡…‘½İ5…Àèmt°(€€€‘¥É•Ñ¥½¹…±M¡…‘½İ5…ÑÉ¥àèmt°(€€€ÍÁ½Ğèmt°(€€€ÍÁ½Ñ1¥¡Ñ5…Àèmt°(€€€ÍÁ½ÑM¡…‘½Üèmt°(€€€ÍÁ½ÑM¡…‘½İ5…Àèmt°(€€€ÍÁ½Ñ1¥¡Ñ5…ÑÉ¥àèmt°(€€€É•ÑÉ•„èmt°(€€€É•ÑÉ•…1QÄè¹Õ±°°(€€€É•ÑÉ•…1QÈè¹Õ±°°(€€€Á½¥¹Ğèmt°(€€€Á½¥¹ÑM¡…‘½Üèmt°(€€€Á½¥¹ÑM¡…‘½İ5…Àèmt°(€€€Á½¥¹ÑM¡…‘½İ5…ÑÉ¥àèmt°(€€€¡•µ¤èmt°(€€€¹ÕµMÁ½Ñ1¥¡ÑM¡…‘½İÍ]¥Ñ¡5…ÁÌè€À°(€€€¹Õµ1¥¡ÑAÉ½‰•Ìè€À(€ôì(€™½È€¡±•ĞŒ€ô€ÀìŒ€ğ€äìŒ¬¬¤¸¹ÁÉ½‰”¹ÁÕÍ ¡¹•Ü8 ¤¤ì(€½¹ÍĞÈ€ô¹•Ü8 ¤°Ì€ô¹•Ü” ¤°„€ô¹•Ü” ¤ì(€™Õ¹Ñ¥½¸¼¡Œ¤ì(€€€±•Ğ €ô€À°€ô€À°Ô€ô€Àì(€€€™½È€¡±•Ğä€ô€Àìä€ğ€äìä¬¬¤¸¹ÁÉ½‰•måt¹Í•Ğ À°€À°€À¤ì(€€€±•ĞÀ€ô€À°Ø€ô€À°ˆ€ô€À°´€ô€À°˜€ô€À°P€ô€À°€ô€À°4€ô€À°€ô€À°H€ô€À°€ô€Àì(€€€Œ¹Í½ÉĞ¡™˜¤ì(€€€™½È€¡±•Ğä€ô€À°€ôŒ¹±•¹Ñ ìä€ğìä¬¬¤ì(€€€€€½¹ÍĞÜ€ômåt°¬€ôÜ¹½±½È°`€ôÜ¹¥¹Ñ•¹Í¥Ñä°Ä€ôÜ¹‘¥ÍÑ…¹”ì(€€€€€±•Ğ€ô¹Õ±°ì(€€€€€¥˜€¡Ü¹Í¡…‘½Ü€˜˜Ü¹Í¡…‘½Ü¹µ…À€˜˜€¡Ü¹Í¡…‘½Ü¹µ…À¹Ñ•áÑÕÉ”¹™½Éµ…Ğ€ôôô€ÄÀÌÀ€ü€ôÜ¹Í¡…‘½Ü¹µ…À¹Ñ•áÑÕÉ”€è€ôÜ¹Í¡…‘½Ü¹µ…À¹‘•ÁÑ¡Q•áÑÕÉ”ñğÜ¹Í¡…‘½Ü¹µ…À¹Ñ•áÑÕÉ”¤°Ü¹¥Íµ‰¥•¹Ñ1¥¡Ğ¤(€€€€€€€ €¬ô¬¹È€¨`°€¬ô¬¹œ€¨`°Ô€¬ô¬¹ˆ€¨`ì(€€€€€•±Í”¥˜€¡Ü¹¥Í1¥¡ÑAÉ½‰”¤ì(€€€€€€€™½È€¡±•Ğ,€ô€Àì,€ğ€äì,¬¬¤¸¹ÁÉ½‰•m-t¹…‘‘M…±•‘Y•Ñ½È¡Ü¹Í ¹½•™™¥¥•¹ÑÍm-t°`¤ì(€€€€€€€¬¬ì(€€€€€ô•±Í”¥˜€¡Ü¹¥Í¥É•Ñ¥½¹…±1¥¡Ğ¤ì(€€€€€€€½¹ÍĞ,€ôĞ¹•Ğ¡Ü¤ì(€€€€€€€¥˜€¡,¹½±½È¹½Áä¡Ü¹½±½È¤¹µÕ±Ñ¥Á±åM…±…È¡Ü¹¥¹Ñ•¹Í¥Ñä¤°Ü¹…ÍÑM¡…‘½Ü¤ì(€€€€€€€€€½¹ÍĞ<€ôÜ¹Í¡…‘½Ü°Ñ”€ô¤¹•Ğ¡Ü¤ì(€€€€€€€€€Ñ”¹Í¡…‘½İ%¹Ñ•¹Í¥Ñä€ô<¹¥¹Ñ•¹Í¥Ñä°Ñ”¹Í¡…‘½İ	¥…Ì€ô<¹‰¥…Ì°Ñ”¹Í¡…‘½İ9½Éµ…±	¥…Ì€ô<¹¹½Éµ…±	¥…Ì°Ñ”¹Í¡…‘½İI…‘¥ÕÌ€ô<¹É…‘¥ÕÌ°Ñ”¹Í¡…‘½İ5…ÁM¥é”€ô<¹µ…ÁM¥é”°¸¹‘¥É•Ñ¥½¹…±M¡…‘½İmÁt€ôÑ”°¸¹‘¥É•Ñ¥½¹…±M¡…‘½İ5…ÁmÁt€ô°¸¹‘¥É•Ñ¥½¹…±M¡…‘½İ5…ÑÉ¥ámÁt€ôÜ¹Í¡…‘½Ü¹µ…ÑÉ¥à°P¬¬ì(€€€€€€€ô(€€€€€€€¸¹‘¥É•Ñ¥½¹…±mÁt€ô,°À¬¬ì(€€€€€ô•±Í”¥˜€¡Ü¹¥ÍMÁ½Ñ1¥¡Ğ¤ì(€€€€€€€½¹ÍĞ,€ôĞ¹•Ğ¡Ü¤ì(€€€€€€€,¹Á½Í¥Ñ¥½¸¹Í•ÑÉ½µ5…ÑÉ¥áA½Í¥Ñ¥½¸¡Ü¹µ…ÑÉ¥á]½É±¤°,¹½±½È¹½Áä¡¬¤¹µÕ±Ñ¥Á±åM…±…È¡`¤°,¹‘¥ÍÑ…¹”€ôÄ°,¹½¹•½Ì€ô5…Ñ ¹½Ì¡Ü¹…¹±”¤°,¹Á•¹Õµ‰É…½Ì€ô5…Ñ ¹½Ì¡Ü¹…¹±”€¨€ Ä€´Ü¹Á•¹Õµ‰É„¤¤°,¹‘•…ä€ôÜ¹‘•…ä°¸¹ÍÁ½Ñm‰t€ô,ì(€€€€€€€½¹ÍĞ<€ôÜ¹Í¡…‘½Üì(€€€€€€€¥˜€¡Ü¹µ…À€˜˜€¡¸¹ÍÁ½Ñ1¥¡Ñ5…Ámt€ôÜ¹µ…À°¬¬°<¹ÕÁ‘…Ñ•5…ÑÉ¥•Ì¡Ü¤°Ü¹…ÍÑM¡…‘½Ü€˜˜H¬¬¤°¸¹ÍÁ½Ñ1¥¡Ñ5…ÑÉ¥ám‰t€ô<¹µ…ÑÉ¥à°Ü¹…ÍÑM¡…‘½Ü¤ì(€€€€€€€€€½¹ÍĞÑ”€ô¤¹•Ğ¡Ü¤ì(€€€€€€€€€Ñ”¹Í¡…‘½İ%¹Ñ•¹Í¥Ñä€ô<¹¥¹Ñ•¹Í¥Ñä°Ñ”¹Í¡…‘½İ	¥…Ì€ô<¹‰¥…Ì°Ñ”¹Í¡…‘½İ9½Éµ…±	¥…Ì€ô<¹¹½Éµ…±	¥…Ì°Ñ”¹Í¡…‘½İI…‘¥ÕÌ€ô<¹É…‘¥ÕÌ°Ñ”¹Í¡…‘½İ5…ÁM¥é”€ô<¹µ…ÁM¥é”°¸¹ÍÁ½ÑM¡…‘½İm‰t€ôÑ”°¸¹ÍÁ½ÑM¡…‘½İ5…Ám‰t€ô°4¬¬ì(€€€€€€€ô(€€€€€€€ˆ¬¬ì(€€€€€ô•±Í”¥˜€¡Ü¹¥ÍI•ÑÉ•…1¥¡Ğ¤ì(€€€€€€€½¹ÍĞ,€ôĞ¹•Ğ¡Ü¤ì(€€€€€€€,¹½±½È¹½Áä¡¬¤¹µÕ±Ñ¥Á±åM…±…È¡`¤°,¹¡…±™]¥‘Ñ ¹Í•Ğ¡Ü¹İ¥‘Ñ €¨€À¸Ô°€À°€À¤°,¹¡…±™!•¥¡Ğ¹Í•Ğ À°Ü¹¡•¥¡Ğ€¨€À¸Ô°€À¤°¸¹É•ÑÉ•…mµt€ô,°´¬¬ì(€€€€€ô•±Í”¥˜€¡Ü¹¥ÍA½¥¹Ñ1¥¡Ğ¤ì(€€€€€€€½¹ÍĞ,€ôĞ¹•Ğ¡Ü¤ì(€€€€€€€¥˜€¡,¹½±½È¹½Áä¡Ü¹½±½È¤¹µÕ±Ñ¥Á±åM…±…È¡Ü¹¥¹Ñ•¹Í¥Ñä¤°,¹‘¥ÍÑ…¹”€ôÜ¹‘¥ÍÑ…¹”°,¹‘•…ä€ôÜ¹‘•…ä°Ü¹…ÍÑM¡…‘½Ü¤ì(€€€€€€€€€½¹ÍĞ<€ôÜ¹Í¡…‘½Ü°Ñ”€ô¤¹•Ğ¡Ü¤ì(€€€€€€€€€Ñ”¹Í¡…‘½İ%¹Ñ•¹Í¥Ñä€ô<¹¥¹Ñ•¹Í¥Ñä°Ñ”¹Í¡…‘½İ	¥…Ì€ô<¹‰¥…Ì°Ñ”¹Í¡…‘½İ9½Éµ…±	¥…Ì€ô<¹¹½Éµ…±	¥…Ì°Ñ”¹Í¡…‘½İI…‘¥ÕÌ€ô<¹É…‘¥ÕÌ°Ñ”¹Í¡…‘½İ5…ÁM¥é”€ô<¹µ…ÁM¥é”°Ñ”¹Í¡…‘½İ…µ•É…9•…È€ô<¹…µ•É„¹¹•…È°Ñ”¹Í¡…‘½İ…µ•É……È€ô<¹…µ•É„¹™…È°¸¹Á½¥¹ÑM¡…‘½İmÙt€ôÑ”°¸¹Á½¥¹ÑM¡…‘½İ5…ÁmÙt€ô°¸¹Á½¥¹ÑM¡…‘½İ5…ÑÉ¥ámÙt€ôÜ¹Í¡…‘½Ü¹µ…ÑÉ¥à°¬¬ì(€€€€€€€ô(€€€€€€€¸¹Á½¥¹ÑmÙt€ô,°Ø¬¬ì(€€€€€ô•±Í”¥˜€¡Ü¹¥Í!•µ¥ÍÁ¡•É•1¥¡Ğ¤ì(€€€€€€€½¹ÍĞ,€ôĞ¹•Ğ¡Ü¤ì(€€€€€€€,¹Í­å½±½È¹½Áä¡Ü¹½±½È¤¹µÕ±Ñ¥Á±åM…±…È¡`¤°,¹É½Õ¹‘½±½È¹½Áä¡Ü¹É½Õ¹‘½±½È¤¹µÕ±Ñ¥Á±åM…±…È¡`¤°¸¹¡•µ¥m™t€ô,°˜¬¬ì(€€€€€ô(€€€ô(€€€´€ø€À€˜˜€¡”¹¡…Ì ‰=M}Ñ•áÑÕÉ•}™±½…Ñ}±¥¹•…Èˆ¤€ôôô€„À€ü€¡¸¹É•ÑÉ•…1QÄ€ô½”¹1Q}1=Q|Ä°¸¹É•ÑÉ•…1QÈ€ô½”¹1Q}1=Q|È¤€è€¡¸¹É•ÑÉ•…1QÄ€ô½”¹1Q}!1|Ä°¸¹É•ÑÉ•…1QÈ€ô½”¹1Q}!1|È¤¤°¸¹…µ‰¥•¹ÑlÁt€ô °¸¹…µ‰¥•¹ÑlÅt€ô°¸¹…µ‰¥•¹ÑlÉt€ôÔì(€€€½¹ÍĞœ€ô¸¹¡…Í ì(€€€€¡œ¹‘¥É•Ñ¥½¹…±1•¹Ñ €„ôôÀñğœ¹Á½¥¹Ñ1•¹Ñ €„ôôØñğœ¹ÍÁ½Ñ1•¹Ñ €„ôôˆñğœ¹É•ÑÉ•…1•¹Ñ €„ôô´ñğœ¹¡•µ¥1•¹Ñ €„ôô˜ñğœ¹¹Õµ¥É•Ñ¥½¹…±M¡…‘½İÌ€„ôôPñğœ¹¹ÕµA½¥¹ÑM¡…‘½İÌ€„ôôñğœ¹¹ÕµMÁ½ÑM¡…‘½İÌ€„ôô4ñğœ¹¹ÕµMÁ½Ñ5…ÁÌ€„ôôñğœ¹¹Õµ1¥¡ÑAÉ½‰•Ì€„ôô¤€˜˜€¡¸¹‘¥É•Ñ¥½¹…°¹±•¹Ñ €ôÀ°¸¹ÍÁ½Ğ¹±•¹Ñ €ôˆ°¸¹É•ÑÉ•„¹±•¹Ñ €ô´°¸¹Á½¥¹Ğ¹±•¹Ñ €ôØ°¸¹¡•µ¤¹±•¹Ñ €ô˜°¸¹‘¥É•Ñ¥½¹…±M¡…‘½Ü¹±•¹Ñ €ôP°¸¹‘¥É•Ñ¥½¹…±M¡…‘½İ5…À¹±•¹Ñ €ôP°¸¹Á½¥¹ÑM¡…‘½Ü¹±•¹Ñ €ô°¸¹Á½¥¹ÑM¡…‘½İ5…À¹±•¹Ñ €ô°¸¹ÍÁ½ÑM¡…‘½Ü¹±•¹Ñ €ô4°¸¹ÍÁ½ÑM¡…‘½İ5…À¹±•¹Ñ €ô4°¸¹‘¥É•Ñ¥½¹…±M¡…‘½İ5…ÑÉ¥à¹±•¹Ñ €ôP°¸¹Á½¥¹ÑM¡…‘½İ5…ÑÉ¥à¹±•¹Ñ €ô°¸¹ÍÁ½Ñ1¥¡Ñ5…ÑÉ¥à¹±•¹Ñ €ô4€¬€´H°¸¹ÍÁ½Ñ1¥¡Ñ5…À¹±•¹Ñ €ô°¸¹¹ÕµMÁ½Ñ1¥¡ÑM¡…‘½İÍ]¥Ñ¡5…ÁÌ€ôH°¸¹¹Õµ1¥¡ÑAÉ½‰•Ì€ô°œ¹‘¥É•Ñ¥½¹…±1•¹Ñ €ôÀ°œ¹Á½¥¹Ñ1•¹Ñ €ôØ°œ¹ÍÁ½Ñ1•¹Ñ €ôˆ°œ¹É•ÑÉ•…1•¹Ñ €ô´°œ¹¡•µ¥1•¹Ñ €ô˜°œ¹¹Õµ¥É•Ñ¥½¹…±M¡…‘½İÌ€ôP°œ¹¹ÕµA½¥¹ÑM¡…‘½İÌ€ô°œ¹¹ÕµMÁ½ÑM¡…‘½İÌ€ô4°œ¹¹ÕµMÁ½Ñ5…ÁÌ€ô°œ¹¹Õµ1¥¡ÑAÉ½‰•Ì€ô°¸¹Ù•ÉÍ¥½¸€ô‘˜¬¬¤ì(€ô(€™Õ¹Ñ¥½¸°¡Œ° ¤ì(€€€±•Ğ€ô€À°Ô€ô€À°À€ô€À°Ø€ô€À°ˆ€ô€Àì(€€€½¹ÍĞ´€ô ¹µ…ÑÉ¥á]½É±‘%¹Ù•ÉÍ”ì(€€€™½È€¡±•Ğ˜€ô€À°P€ôŒ¹±•¹Ñ ì˜€ğPì˜¬¬¤ì(€€€€€½¹ÍĞ€ôm™tì(€€€€€¥˜€¡¹¥Í¥É•Ñ¥½¹…±1¥¡Ğ¤ì(€€€€€€€½¹ÍĞ4€ô¸¹‘¥É•Ñ¥½¹…±m‘tì(€€€€€€€4¹‘¥É•Ñ¥½¸¹Í•ÑÉ½µ5…ÑÉ¥áA½Í¥Ñ¥½¸¡¹µ…ÑÉ¥á]½É±¤°È¹Í•ÑÉ½µ5…ÑÉ¥áA½Í¥Ñ¥½¸¡¹Ñ…É•Ğ¹µ…ÑÉ¥á]½É±¤°4¹‘¥É•Ñ¥½¸¹ÍÕˆ¡È¤°4¹‘¥É•Ñ¥½¸¹ÑÉ…¹Í™½Éµ¥É•Ñ¥½¸¡´¤°¬¬ì(€€€€€ô•±Í”¥˜€¡¹¥ÍMÁ½Ñ1¥¡Ğ¤ì(€€€€€€€½¹ÍĞ4€ô¸¹ÍÁ½ÑmÁtì(€€€€€€€4¹Á½Í¥Ñ¥½¸¹Í•ÑÉ½µ5…ÑÉ¥áA½Í¥Ñ¥½¸¡¹µ…ÑÉ¥á]½É±¤°4¹Á½Í¥Ñ¥½¸¹…ÁÁ±å5…ÑÉ¥àĞ¡´¤°4¹‘¥É•Ñ¥½¸¹Í•ÑÉ½µ5…ÑÉ¥áA½Í¥Ñ¥½¸¡¹µ…ÑÉ¥á]½É±¤°È¹Í•ÑÉ½µ5…ÑÉ¥áA½Í¥Ñ¥½¸¡¹Ñ…É•Ğ¹µ…ÑÉ¥á]½É±¤°4¹‘¥É•Ñ¥½¸¹ÍÕˆ¡È¤°4¹‘¥É•Ñ¥½¸¹ÑÉ…¹Í™½Éµ¥É•Ñ¥½¸¡´¤°À¬¬ì(€€€€€ô•±Í”¥˜€¡¹¥ÍI•ÑÉ•…1¥¡Ğ¤ì(€€€€€€€½¹ÍĞ4€ô¸¹É•ÑÉ•…mÙtì(€€€€€€€4¹Á½Í¥Ñ¥½¸¹Í•ÑÉ½µ5…ÑÉ¥áA½Í¥Ñ¥½¸¡¹µ…ÑÉ¥á]½É±¤°4¹Á½Í¥Ñ¥½¸¹…ÁÁ±å5…ÑÉ¥àĞ¡´¤°„¹¥‘•¹Ñ¥Ñä ¤°Ì¹½Áä¡¹µ…ÑÉ¥á]½É±¤°Ì¹ÁÉ•µÕ±Ñ¥Á±ä¡´¤°„¹•áÑÉ…ÑI½Ñ…Ñ¥½¸¡Ì¤°4¹¡…±™]¥‘Ñ ¹Í•Ğ¡¹İ¥‘Ñ €¨€À¸Ô°€À°€À¤°4¹¡…±™!•¥¡Ğ¹Í•Ğ À°¹¡•¥¡Ğ€¨€À¸Ô°€À¤°4¹¡…±™]¥‘Ñ ¹…ÁÁ±å5…ÑÉ¥àĞ¡„¤°4¹¡…±™!•¥¡Ğ¹…ÁÁ±å5…ÑÉ¥àĞ¡„¤°Ø¬¬ì(€€€€€ô•±Í”¥˜€¡¹¥ÍA½¥¹Ñ1¥¡Ğ¤ì(€€€€€€€½¹ÍĞ4€ô¸¹Á½¥¹ÑmÕtì(€€€€€€€4¹Á½Í¥Ñ¥½¸¹Í•ÑÉ½µ5…ÑÉ¥áA½Í¥Ñ¥½¸¡¹µ…ÑÉ¥á]½É±¤°4¹Á½Í¥Ñ¥½¸¹…ÁÁ±å5…ÑÉ¥àĞ¡´¤°Ô¬¬ì(€€€€€ô•±Í”¥˜€¡¹¥Í!•µ¥ÍÁ¡•É•1¥¡Ğ¤ì(€€€€€€€½¹ÍĞ4€ô¸¹¡•µ¥m‰tì(€€€€€€€4¹‘¥É•Ñ¥½¸¹Í•ÑÉ½µ5…ÑÉ¥áA½Í¥Ñ¥½¸¡¹µ…ÑÉ¥á]½É±¤°4¹‘¥É•Ñ¥½¸¹ÑÉ…¹Í™½Éµ¥É•Ñ¥½¸¡´¤°ˆ¬¬ì(€€€€€ô(€€€ô(€ô(€É•ÑÕÉ¸ì(€€€Í•ÑÕÀè¼°(€€€Í•ÑÕÁY¥•Üè°°(€€€ÍÑ…Ñ”è¸(€ôì)ô)™Õ¹Ñ¥½¸5¼¡”¤ì(€½¹ÍĞĞ€ô¹•ÜÁ˜¡”¤°¤€ômt°¸€ômt°È€ômtì(€™Õ¹Ñ¥½¸Ì¡Ô¤ì(€€€¹…µ•É„€ôÔ°¤¹±•¹Ñ €ô€À°¸¹±•¹Ñ €ô€À°È¹±•¹Ñ €ô€Àì(€ô(€™Õ¹Ñ¥½¸„¡Ô¤ì(€€€¤¹ÁÕÍ ¡Ô¤ì(€ô(€™Õ¹Ñ¥½¸¼¡Ô¤ì(€€€¸¹ÁÕÍ ¡Ô¤ì(€ô(€™Õ¹Ñ¥½¸°¡Ô¤ì(€€€È¹ÁÕÍ ¡Ô¤ì(€ô(€™Õ¹Ñ¥½¸Œ ¤ì(€€€Ğ¹Í•ÑÕÀ¡¤¤ì(€ô(€™Õ¹Ñ¥½¸ ¡Ô¤ì(€€€Ğ¹Í•ÑÕÁY¥•Ü¡¤°Ô¤ì(€ô(€½¹ÍĞ€ôì(€€€±¥¡ÑÍÉÉ…äè¤°(€€€Í¡…‘½İÍÉÉ…äè¸°(€€€±¥¡ÑAÉ½‰•É¥‘ÉÉ…äèÈ°(€€€…µ•É„è¹Õ±°°(€€€±¥¡ÑÌèĞ°(€€€ÑÉ…¹Íµ¥ÍÍ¥½¹I•¹‘•ÉQ…É•Ğèíô°(€€€Ñ•áÑÕÉ•U¹¥ÑÌè€À(€ôì(€É•ÑÕÉ¸ì(€€€¥¹¥ĞèÌ°(€€€ÍÑ…Ñ”è°(€€€Í•ÑÕÁ1¥¡ÑÌèŒ°(€€€Í•ÑÕÁ1¥¡ÑÍY¥•Üè °(€€€ÁÕÍ¡1¥¡Ğè„°(€€€ÁÕÍ¡M¡…‘½Üè¼°(€€€ÁÕÍ¡1¥¡ÑAÉ½‰•É¥è°(€ôì)ô)™Õ¹Ñ¥½¸µ˜¡”¤ì(€±•ĞĞ€ô€¼¨}}AUI}|€¨¼¹•Ü]•…­5…À ¤ì(€™Õ¹Ñ¥½¸¤¡È°Ì€ô€À¤ì(€€€½¹ÍĞ„€ôĞ¹•Ğ¡È¤ì(€€€±•Ğ¼ì(€€€É•ÑÕÉ¸„€ôôôÙ½¥€À€ü€¡¼€ô¹•Ü5¼¡”¤°Ğ¹Í•Ğ¡È°m½t¤¤€èÌ€øô„¹±•¹Ñ €ü€¡¼€ô¹•Ü5¼¡”¤°„¹ÁÕÍ ¡¼¤¤€è¼€ô…mÍt°¼ì(€ô(€™Õ¹Ñ¥½¸¸ ¤ì(€€€Ğ€ô€¼¨}}AUI}|€¨¼¹•Ü]•…­5…À ¤ì(€ô(€É•ÑÕÉ¸ì(€€€•Ğè¤°(€€€‘¥ÍÁ½Í”è¸(€ôì)ô)Ù…È˜€ôÙ½¥µ…¥¸ ¤ì(%±}A½Í¥Ñ¥½¸€ôÙ•ŒĞ Á½Í¥Ñ¥½¸°€Ä¸À€¤ì)õ€°}˜€ôÕ¹¥™½É´Í…µÁ±•ÈÉÍ¡…‘½İ}Á…ÍÌì)Õ¹¥™½É´Ù•ŒÈÉ•Í½±ÕÑ¥½¸ì)Õ¹¥™½É´™±½…ĞÉ…‘¥ÕÌì)Ù½¥µ…¥¸ ¤ì(%½¹ÍĞ™±½…ĞÍ…µÁ±•Ì€ô™±½…Ğ YM5}M5A1L€¤ì(%™±½…Ğµ•…¸€ô€À¸Àì(%™±½…ĞÍÅÕ…É•‘}µ•…¸€ô€À¸Àì(%™±½…ĞÕÙMÑÉ¥‘”€ôÍ…µÁ±•Ì€ğô€Ä¸À€ü€À¸À€è€È¸À€¼€ Í…µÁ±•Ì€´€Ä¸À€¤ì(%™±½…ĞÕÙMÑ…ÉĞ€ôÍ…µÁ±•Ì€ğô€Ä¸À€ü€À¸À€è€´€Ä¸Àì(%™½È€ ™±½…Ğ¤€ô€À¸Àì¤€ğÍ…µÁ±•Ìì¤€¬¬€¤ì($%™±½…ĞÕÙ=™™Í•Ğ€ôÕÙMÑ…ÉĞ€¬¤€¨ÕÙMÑÉ¥‘”ì($$¥™‘•˜!=I%i=9Q1}AML($$%Ù•ŒÈ‘¥ÍÑÉ¥‰ÕÑ¥½¸€ôÑ•áÑÕÉ”É Í¡…‘½İ}Á…ÍÌ°€ ±}É…½½É¹áä€¬Ù•ŒÈ ÕÙ=™™Í•Ğ°€À¸À€¤€¨É…‘¥ÕÌ€¤€¼É•Í½±ÕÑ¥½¸€¤¹Éœì($$%µ•…¸€¬ô‘¥ÍÑÉ¥‰ÕÑ¥½¸¹àì($$%ÍÅÕ…É•‘}µ•…¸€¬ô‘¥ÍÑÉ¥‰ÕÑ¥½¸¹ä€¨‘¥ÍÑÉ¥‰ÕÑ¥½¸¹ä€¬‘¥ÍÑÉ¥‰ÕÑ¥½¸¹à€¨‘¥ÍÑÉ¥‰ÕÑ¥½¸¹àì($$•±Í”($$%™±½…Ğ‘•ÁÑ €ôÑ•áÑÕÉ”É Í¡…‘½İ}Á…ÍÌ°€ ±}É…½½É¹áä€¬Ù•ŒÈ €À¸À°ÕÙ=™™Í•Ğ€¤€¨É…‘¥ÕÌ€¤€¼É•Í½±ÕÑ¥½¸€¤¹Èì($$%µ•…¸€¬ô‘•ÁÑ ì($$%ÍÅÕ…É•‘}µ•…¸€¬ô‘•ÁÑ €¨‘•ÁÑ ì($$•¹‘¥˜(%ô(%µ•…¸€ôµ•…¸€¼Í…µÁ±•Ìì(%ÍÅÕ…É•‘}µ•…¸€ôÍÅÕ…É•‘}µ•…¸€¼Í…µÁ±•Ìì(%™±½…ĞÍÑ‘}‘•Ø€ôÍÅÉĞ µ…à €À¸À°ÍÅÕ…É•‘}µ•…¸€´µ•…¸€¨µ•…¸€¤€¤ì(%±}É…½±½È€ôÙ•ŒĞ µ•…¸°ÍÑ‘}‘•Ø°€À¸À°€Ä¸À€¤ì)õ€°Ù˜€ôl(€€¼¨}}AUI}|€¨¼¹•Ü8 Ä°€À°€À¤°(€€¼¨}}AUI}|€¨¼¹•Ü8 ´Ä°€À°€À¤°(€€¼¨}}AUI}|€¨¼¹•Ü8 À°€Ä°€À¤°(€€¼¨}}AUI}|€¨¼¹•Ü8 À°€´Ä°€À¤°(€€¼¨}}AUI}|€¨¼¹•Ü8 À°€À°€Ä¤°(€€¼¨}}AUI}|€¨¼¹•Ü8 À°€À°€´Ä¤)t°‰˜€ôl(€€¼¨}}AUI}|€¨¼¹•Ü8 À°€´Ä°€À¤°(€€¼¨}}AUI}|€¨¼¹•Ü8 À°€´Ä°€À¤°(€€¼¨}}AUI}|€¨¼¹•Ü8 À°€À°€Ä¤°(€€¼¨}}AUI}|€¨¼¹•Ü8 À°€À°€´Ä¤°(€€¼¨}}AUI}|€¨¼¹•Ü8 À°€´Ä°€À¤°(€€¼¨}}AUI}|€¨¼¹•Ü8 À°€´Ä°€À¤)t°á¼€ô€¼¨}}AUI}|€¨¼¹•Ü” ¤°Y¸€ô€¼¨}}AUI}|€¨¼¹•Ü8 ¤°%Ì€ô€¼¨}}AUI}|€¨¼¹•Ü8 ¤ì)™Õ¹Ñ¥½¸5˜¡”°Ğ°¤¤ì(€±•Ğ¸€ô¹•Ü©Ì ¤ì(€½¹ÍĞÈ€ô¹•Ü” ¤°Ì€ô¹•Ü” ¤°„€ô¹•Ü¥Ğ ¤°¼€ô¹•ÜU  ¤°°€ô¹•Ü  ¤°Œ€ôíô° €ô¤¹µ…áQ•áÑÕÉ•M¥é”°€ôì(€€€€Àè€Ä°(€€€€Äè€À°(€€€€Èè€È(€ô°Ô€ô¹•Ü¡¤¡ì(€€€‘•™¥¹•ÌèìYM5}M5A1Lè€àô°(€€€Õ¹¥™½ÉµÌèì(€€€€€Í¡…‘½İ}Á…ÍÌèìÙ…±Õ”è¹Õ±°ô°(€€€€€É•Í½±ÕÑ¥½¸èìÙ…±Õ”è¹•Ü” ¤ô°(€€€€€É…‘¥ÕÌèìÙ…±Õ”è€Ğô(€€€ô°(€€€Ù•ÉÑ•áM¡…‘•Èè˜°(€€€™É…µ•¹ÑM¡…‘•Èè}˜(€ô¤°À€ôÔ¹±½¹” ¤ì(€À¹‘•™¥¹•Ì¹!=I%i=9Q1}AML€ô€Äì(€½¹ÍĞØ€ô¹•ÜEĞ ¤ì(€Ø¹Í•ÑÑÑÉ¥‰ÕÑ” ‰Á½Í¥Ñ¥½¸ˆ°¹•ÜAĞ¡¹•Ü±½…ĞÌÉÉÉ…ä¡l(€€€€´Ä°(€€€€´Ä°(€€€€À¸Ô°(€€€€Ì°(€€€€´Ä°(€€€€À¸Ô°(€€€€´Ä°(€€€€Ì°(€€€€À¸Ô(€t¤°€Ì¤¤ì(€½¹ÍĞˆ€ô¹•ÜĞ¡Ø°Ô¤°´€ôÑ¡¥Ìì(€Ñ¡¥Ì¹•¹…‰±•€ô€„Ä°Ñ¡¥Ì¹…ÕÑ½UÁ‘…Ñ”€ô€„À°Ñ¡¥Ì¹¹••‘ÍUÁ‘…Ñ”€ô€„Ä°Ñ¡¥Ì¹ÑåÁ”€ô€Äì(€±•Ğ˜€ôÑ¡¥Ì¹ÑåÁ”ì(€Ñ¡¥Ì¹É•¹‘•È€ô™Õ¹Ñ¥½¸¡H°°œ¤ì(€€€¥˜€¡´¹•¹…‰±•€ôôô€„Äñğ´¹…ÕÑ½UÁ‘…Ñ”€ôôô€„Ä€˜˜´¹¹••‘ÍUÁ‘…Ñ”€ôôô€„ÄñğH¹±•¹Ñ €ôôô€À¤É•ÑÕÉ¸ì(€€€Ñ¡¥Ì¹ÑåÁ”€ôôô€È€˜˜€¡M” ‰]•‰1M¡…‘½İ5…ÀèAM½™ÑM¡…‘½İ5…À¡…Ì‰••¸‘•ÁÉ•…Ñ•¸UÍ¥¹œAM¡…‘½İ5…À¥¹ÍÑ•…¸ˆ¤°Ñ¡¥Ì¹ÑåÁ”€ô€Ä¤ì(€€€½¹ÍĞä€ô”¹•ÑI•¹‘•ÉQ…É•Ğ ¤°€ô”¹•ÑÑ¥Ù•Õ‰•…” ¤°Ü€ô”¹•ÑÑ¥Ù•5¥Áµ…Á1•Ù•° ¤°¬€ô”¹ÍÑ…Ñ”ì(€€€¬¹Í•Ñ	±•¹‘¥¹œ À¤°¬¹‰Õ™™•ÉÌ¹‘•ÁÑ ¹•ÑI•Ù•ÉÍ• ¤€ôôô€„À€ü¬¹‰Õ™™•ÉÌ¹½±½È¹Í•Ñ±•…È À°€À°€À°€À¤€è¬¹‰Õ™™•ÉÌ¹½±½È¹Í•Ñ±•…È Ä°€Ä°€Ä°€Ä¤°¬¹‰Õ™™•ÉÌ¹‘•ÁÑ ¹Í•ÑQ•ÍĞ „À¤°¬¹Í•ÑM¥ÍÍ½ÉQ•ÍĞ „Ä¤ì(€€€½¹ÍĞ`€ô˜€„ôôÑ¡¥Ì¹ÑåÁ”ì(€€€`€˜˜¹ÑÉ…Ù•ÉÍ”¡™Õ¹Ñ¥½¸¡Ä¤ì(€€€€€Ä¹µ…Ñ•É¥…°€˜˜€¡ÉÉ…ä¹¥ÍÉÉ…ä¡Ä¹µ…Ñ•É¥…°¤€üÄ¹µ…Ñ•É¥…°¹™½É…  ¡¤€ôø¹¹••‘ÍUÁ‘…Ñ”€ô€„À¤€èÄ¹µ…Ñ•É¥…°¹¹••‘ÍUÁ‘…Ñ”€ô€„À¤ì(€€€ô¤ì(€€€™½È€¡±•ĞÄ€ô€À°€ôH¹±•¹Ñ ìÄ€ğìÄ¬¬¤ì(€€€€€½¹ÍĞ,€ôImÅt°<€ô,¹Í¡…‘½Üì(€€€€€¥˜€¡<€ôôôÙ½¥€À¤ì(€€€€€€€M” ‰]•‰1M¡…‘½İ5…Àèˆ°,°€‰¡…Ì¹¼Í¡…‘½Ü¸ˆ¤ì(€€€€€€€½¹Ñ¥¹Õ”ì(€€€€€ô(€€€€€¥˜€¡<¹…ÕÑ½UÁ‘…Ñ”€ôôô€„Ä€˜˜<¹¹••‘ÍUÁ‘…Ñ”€ôôô€„Ä¤½¹Ñ¥¹Õ”ì(€€€€€È¹½Áä¡<¹µ…ÁM¥é”¤ì(€€€€€½¹ÍĞÑ”€ô<¹•ÑÉ…µ•áÑ•¹ÑÌ ¤ì(€€€€€È¹µÕ±Ñ¥Á±ä¡Ñ”¤°Ì¹½Áä¡<¹µ…ÁM¥é”¤°€¡È¹à€ø ñğÈ¹ä€ø ¤€˜˜€¡È¹à€ø €˜˜€¡Ì¹à€ô5…Ñ ¹™±½½È¡ €¼Ñ”¹à¤°È¹à€ôÌ¹à€¨Ñ”¹à°<¹µ…ÁM¥é”¹à€ôÌ¹à¤°È¹ä€ø €˜˜€¡Ì¹ä€ô5…Ñ ¹™±½½È¡ €¼Ñ”¹ä¤°È¹ä€ôÌ¹ä€¨Ñ”¹ä°<¹µ…ÁM¥é”¹ä€ôÌ¹ä¤¤ì(€€€€€½¹ÍĞ€€ô”¹ÍÑ…Ñ”¹‰Õ™™•ÉÌ¹‘•ÁÑ ¹•ÑI•Ù•ÉÍ• ¤ì(€€€€€¥˜€¡<¹…µ•É„¹}É•Ù•ÉÍ•‘•ÁÑ €ô€°<¹µ…À€ôôô¹Õ±°ñğ`€ôôô€„À¤ì(€€€€€€€¥˜€¡<¹µ…À€„ôô¹Õ±°€˜˜€¡<¹µ…À¹‘•ÁÑ¡Q•áÑÕÉ”€„ôô¹Õ±°€˜˜€¡<¹µ…À¹‘•ÁÑ¡Q•áÑÕÉ”¹‘¥ÍÁ½Í” ¤°<¹µ…À¹‘•ÁÑ¡Q•áÑÕÉ”€ô¹Õ±°¤°<¹µ…À¹‘¥ÍÁ½Í” ¤¤°Ñ¡¥Ì¹ÑåÁ”€ôôô€Ì¤ì(€€€€€€€€€¥˜€¡,¹¥ÍA½¥¹Ñ1¥¡Ğ¤ì(€€€€€€€€€€€M” ‰]•‰1M¡…‘½İ5…ÀèYM4Í¡…‘½Üµ…ÁÌ…É”¹½ĞÍÕÁÁ½ÉÑ•™½ÈA½¥¹Ñ1¥¡ÑÌ¸UÍ”A½È	…Í¥M¡…‘½İ5…À¥¹ÍÑ•…¸ˆ¤ì(€€€€€€€€€€€½¹Ñ¥¹Õ”ì(€€€€€€€€€ô(€€€€€€€€€<¹µ…À€ô¹•Ü±¤¡È¹à°È¹ä°ì(€€€€€€€€€€€™½Éµ…Ğè­È°(€€€€€€€€€€€ÑåÁ”èa¤°(€€€€€€€€€€€µ¥¹¥±Ñ•Èè%Ğ°(€€€€€€€€€€€µ…¥±Ñ•Èè%Ğ°(€€€€€€€€€€€•¹•É…Ñ•5¥Áµ…ÁÌè€„Ä(€€€€€€€€€ô¤°<¹µ…À¹Ñ•áÑÕÉ”¹¹…µ”€ô,¹¹…µ”€¬€ˆ¹Í¡…‘½İ5…Àˆ°<¹µ…À¹‘•ÁÑ¡Q•áÑÕÉ”€ô¹•Üå¸¡È¹à°È¹ä°Q¸¤°<¹µ…À¹‘•ÁÑ¡Q•áÑÕÉ”¹¹…µ”€ô,¹¹…µ”€¬€ˆ¹Í¡…‘½İ5…Á•ÁÑ ˆ°<¹µ…À¹‘•ÁÑ¡Q•áÑÕÉ”¹™½Éµ…Ğ€ô©¸°<¹µ…À¹‘•ÁÑ¡Q•áÑÕÉ”¹½µÁ…É•Õ¹Ñ¥½¸€ô¹Õ±°°<¹µ…À¹‘•ÁÑ¡Q•áÑÕÉ”¹µ¥¹¥±Ñ•È€ôQĞ°<¹µ…À¹‘•ÁÑ¡Q•áÑÕÉ”¹µ…¥±Ñ•È€ôQĞì(€€€€€€€ô•±Í”(€€€€€€€€€,¹¥ÍA½¥¹Ñ1¥¡Ğ€ü€¡<¹µ…À€ô¹•Ü5°¡È¹à¤°<¹µ…À¹‘•ÁÑ¡Q•áÑÕÉ”€ô¹•Üİ ¡È¹à°Å¤¤¤€è€¡<¹µ…À€ô¹•Ü±¤¡È¹à°È¹ä¤°<¹µ…À¹‘•ÁÑ¡Q•áÑÕÉ”€ô¹•Üå¸¡È¹à°È¹ä°Å¤¤¤°<¹µ…À¹‘•ÁÑ¡Q•áÑÕÉ”¹¹…µ”€ô,¹¹…µ”€¬€ˆ¹Í¡…‘½İ5…Àˆ°<¹µ…À¹‘•ÁÑ¡Q•áÑÕÉ”¹™½Éµ…Ğ€ô©¸°Ñ¡¥Ì¹ÑåÁ”€ôôô€Ä€ü€¡<¹µ…À¹‘•ÁÑ¡Q•áÑÕÉ”¹½µÁ…É•Õ¹Ñ¥½¸€ô€€ü€ÔÄà€è€ÔÄÔ°<¹µ…À¹‘•ÁÑ¡Q•áÑÕÉ”¹µ¥¹¥±Ñ•È€ô%Ğ°<¹µ…À¹‘•ÁÑ¡Q•áÑÕÉ”¹µ…¥±Ñ•È€ô%Ğ¤€è€¡<¹µ…À¹‘•ÁÑ¡Q•áÑÕÉ”¹½µÁ…É•Õ¹Ñ¥½¸€ô¹Õ±°°<¹µ…À¹‘•ÁÑ¡Q•áÑÕÉ”¹µ¥¹¥±Ñ•È€ôQĞ°<¹µ…À¹‘•ÁÑ¡Q•áÑÕÉ”¹µ…¥±Ñ•È€ôQĞ¤ì(€€€€€€€<¹…µ•É„¹ÕÁ‘…Ñ•AÉ½©•Ñ¥½¹5…ÑÉ¥à ¤ì(€€€€€ô(€€€€€½¹ÍĞ¥”€ô<¹µ…À¹¥Í]•‰1Õ‰•I•¹‘•ÉQ…É•Ğ€ü€Ø€è€Äì(€€€€€™½È€¡±•ĞÕ”€ô€ÀìÕ”€ğ¥”ìÕ”¬¬¤ì(€€€€€€€¥˜€¡<¹µ…À¹¥Í]•‰1Õ‰•I•¹‘•ÉQ…É•Ğ¤(€€€€€€€€€”¹Í•ÑI•¹‘•ÉQ…É•Ğ¡<¹µ…À°Õ”¤°”¹±•…È ¤ì(€€€€€€€•±Í”ì(€€€€€€€€€Õ”€ôôô€À€˜˜€¡”¹Í•ÑI•¹‘•ÉQ…É•Ğ¡<¹µ…À¤°”¹±•…È ¤¤ì(€€€€€€€€€½¹ÍĞ”€ô<¹•ÑY¥•İÁ½ÉĞ¡Õ”¤ì(€€€€€€€€€„¹Í•Ğ¡Ì¹à€¨”¹à°Ì¹ä€¨”¹ä°Ì¹à€¨”¹è°Ì¹ä€¨”¹Ü¤°¬¹Ù¥•İÁ½ÉĞ¡„¤ì(€€€€€€€ô(€€€€€€€¥˜€¡,¹¥ÍA½¥¹Ñ1¥¡Ğ¤ì(€€€€€€€€€½¹ÍĞ”€ô<¹…µ•É„°Ù”€ô<¹µ…ÑÉ¥à°å”€ô,¹‘¥ÍÑ…¹”ñğ”¹™…Èì(€€€€€€€€€å”€„ôô”¹™…È€˜˜€¡”¹™…È€ôå”°”¹ÕÁ‘…Ñ•AÉ½©•Ñ¥½¹5…ÑÉ¥à ¤¤°Y¸¹Í•ÑÉ½µ5…ÑÉ¥áA½Í¥Ñ¥½¸¡,¹µ…ÑÉ¥á]½É±¤°”¹Á½Í¥Ñ¥½¸¹½Áä¡Y¸¤°%Ì¹½Áä¡”¹Á½Í¥Ñ¥½¸¤°%Ì¹…‘¡Ù™mÕ•t¤°”¹ÕÀ¹½Áä¡‰™mÕ•t¤°”¹±½½­Ğ¡%Ì¤°”¹ÕÁ‘…Ñ•5…ÑÉ¥á]½É± ¤°Ù”¹µ…­•QÉ…¹Í±…Ñ¥½¸ µY¸¹à°€µY¸¹ä°€µY¸¹è¤°á¼¹µÕ±Ñ¥Á±å5…ÑÉ¥•Ì¡”¹ÁÉ½©•Ñ¥½¹5…ÑÉ¥à°”¹µ…ÑÉ¥á]½É±‘%¹Ù•ÉÍ”¤°<¹}™ÉÕÍÑÕ´¹Í•ÑÉ½µAÉ½©•Ñ¥½¹5…ÑÉ¥à¡á¼°”¹½½É‘¥¹…Ñ•MåÍÑ•´°”¹É•Ù•ÉÍ•‘•ÁÑ ¤ì(€€€€€€€ô•±Í”<¹ÕÁ‘…Ñ•5…ÑÉ¥•Ì¡,¤ì(€€€€€€€¸€ô<¹•ÑÉÕÍÑÕ´ ¤°4¡°œ°<¹…µ•É„°,°Ñ¡¥Ì¹ÑåÁ”¤ì(€€€€€ô(€€€€€<¹¥ÍA½¥¹Ñ1¥¡ÑM¡…‘½Ü€„ôô€„À€˜˜Ñ¡¥Ì¹ÑåÁ”€ôôô€Ì€˜˜P¡<°œ¤°<¹¹••‘ÍUÁ‘…Ñ”€ô€„Äì(€€€ô(€€€˜€ôÑ¡¥Ì¹ÑåÁ”°´¹¹••‘ÍUÁ‘…Ñ”€ô€„Ä°”¹Í•ÑI•¹‘•ÉQ…É•Ğ¡ä°°Ü¤ì(€ôì(€™Õ¹Ñ¥½¸P¡H°¤ì(€€€½¹ÍĞœ€ôĞ¹ÕÁ‘…Ñ”¡ˆ¤ì(€€€Ô¹‘•™¥¹•Ì¹YM5}M5A1L€„ôôH¹‰±ÕÉM…µÁ±•Ì€˜˜€¡Ô¹‘•™¥¹•Ì¹YM5}M5A1L€ôH¹‰±ÕÉM…µÁ±•Ì°À¹‘•™¥¹•Ì¹YM5}M5A1L€ôH¹‰±ÕÉM…µÁ±•Ì°Ô¹¹••‘ÍUÁ‘…Ñ”€ô€„À°À¹¹••‘ÍUÁ‘…Ñ”€ô€„À¤°H¹µ…ÁA…ÍÌ€ôôô¹Õ±°€˜˜€¡H¹µ…ÁA…ÍÌ€ô¹•Ü±¤¡È¹à°È¹ä°ì(€€€€€™½Éµ…Ğè­È°(€€€€€ÑåÁ”èa¤(€€€ô¤¤°Ô¹Õ¹¥™½ÉµÌ¹Í¡…‘½İ}Á…ÍÌ¹Ù…±Õ”€ôH¹µ…À¹‘•ÁÑ¡Q•áÑÕÉ”°Ô¹Õ¹¥™½ÉµÌ¹É•Í½±ÕÑ¥½¸¹Ù…±Õ”€ôH¹µ…ÁM¥é”°Ô¹Õ¹¥™½ÉµÌ¹É…‘¥ÕÌ¹Ù…±Õ”€ôH¹É…‘¥ÕÌ°”¹Í•ÑI•¹‘•ÉQ…É•Ğ¡H¹µ…ÁA…ÍÌ¤°”¹±•…È ¤°”¹É•¹‘•É	Õ™™•É¥É•Ğ¡°¹Õ±°°œ°Ô°ˆ°¹Õ±°¤°À¹Õ¹¥™½ÉµÌ¹Í¡…‘½İ}Á…ÍÌ¹Ù…±Õ”€ôH¹µ…ÁA…ÍÌ¹Ñ•áÑÕÉ”°À¹Õ¹¥™½ÉµÌ¹É•Í½±ÕÑ¥½¸¹Ù…±Õ”€ôH¹µ…ÁM¥é”°À¹Õ¹¥™½ÉµÌ¹É…‘¥ÕÌ¹Ù…±Õ”€ôH¹É…‘¥ÕÌ°”¹Í•ÑI•¹‘•ÉQ…É•Ğ¡H¹µ…À¤°”¹±•…È ¤°”¹É•¹‘•É	Õ™™•É¥É•Ğ¡°¹Õ±°°œ°À°ˆ°¹Õ±°¤ì(€ô(€™Õ¹Ñ¥½¸¡H°°œ°ä¤ì(€€€±•Ğ€ô¹Õ±°ì(€€€½¹ÍĞÜ€ôœ¹¥ÍA½¥¹Ñ1¥¡Ğ€ôôô€„À€üH¹ÕÍÑ½µ¥ÍÑ…¹•5…Ñ•É¥…°€èH¹ÕÍÑ½µ•ÁÑ¡5…Ñ•É¥…°ì(€€€¥˜€¡Ü€„ôôÙ½¥€À¤€ôÜì(€€€•±Í”¥˜€¡€ôœ¹¥ÍA½¥¹Ñ1¥¡Ğ€ôôô€„À€ü°€è¼°”¹±½…±±¥ÁÁ¥¹¹…‰±•€˜˜¹±¥ÁM¡…‘½İÌ€ôôô€„À€˜˜ÉÉ…ä¹¥ÍÉÉ…ä¡¹±¥ÁÁ¥¹A±…¹•Ì¤€˜˜¹±¥ÁÁ¥¹A±…¹•Ì¹±•¹Ñ €„ôô€Àñğ¹‘¥ÍÁ±…•µ•¹Ñ5…À€˜˜¹‘¥ÍÁ±…•µ•¹ÑM…±”€„ôô€Àñğ¹…±Á¡…5…À€˜˜¹…±Á¡…Q•ÍĞ€ø€Àñğ¹µ…À€˜˜¹…±Á¡…Q•ÍĞ€ø€Àñğ¹…±Á¡…Q½½Ù•É…”€ôôô€„À¤ì(€€€€€½¹ÍĞ¬€ô¹ÕÕ¥°`€ô¹ÕÕ¥ì(€€€€€±•ĞÄ€ôm­tì(€€€€€Ä€ôôôÙ½¥€À€˜˜€¡Ä€ôíô°m­t€ôÄ¤ì(€€€€€±•Ğ€ôÅmatì(€€€€€€ôôôÙ½¥€À€˜˜€¡€ô¹±½¹” ¤°Åmat€ô°¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰‘¥ÍÁ½Í”ˆ°¤¤°€ôì(€€€ô(€€€¥˜€¡¹Ù¥Í¥‰±”€ô¹Ù¥Í¥‰±”°¹İ¥É•™É…µ”€ô¹İ¥É•™É…µ”°ä€ôôô€Ì€ü¹Í¥‘”€ô¹Í¡…‘½İM¥‘”€„ôô¹Õ±°€ü¹Í¡…‘½İM¥‘”€è¹Í¥‘”€è¹Í¥‘”€ô¹Í¡…‘½İM¥‘”€„ôô¹Õ±°€ü¹Í¡…‘½İM¥‘”€è‘m¹Í¥‘•t°¹…±Á¡…5…À€ô¹…±Á¡…5…À°¹…±Á¡…Q•ÍĞ€ô¹…±Á¡…Q½½Ù•É…”€ôôô€„À€ü€À¸Ô€è¹…±Á¡…Q•ÍĞ°¹µ…À€ô¹µ…À°¹±¥ÁM¡…‘½İÌ€ô¹±¥ÁM¡…‘½İÌ°¹±¥ÁÁ¥¹A±…¹•Ì€ô¹±¥ÁÁ¥¹A±…¹•Ì°¹±¥Á%¹Ñ•ÉÍ•Ñ¥½¸€ô¹±¥Á%¹Ñ•ÉÍ•Ñ¥½¸°¹‘¥ÍÁ±…•µ•¹Ñ5…À€ô¹‘¥ÍÁ±…•µ•¹Ñ5…À°¹‘¥ÍÁ±…•µ•¹ÑM…±”€ô¹‘¥ÍÁ±…•µ•¹ÑM…±”°¹‘¥ÍÁ±…•µ•¹Ñ	¥…Ì€ô¹‘¥ÍÁ±…•µ•¹Ñ	¥…Ì°¹İ¥É•™É…µ•1¥¹•İ¥‘Ñ €ô¹İ¥É•™É…µ•1¥¹•İ¥‘Ñ °¹±¥¹•İ¥‘Ñ €ô¹±¥¹•İ¥‘Ñ °œ¹¥ÍA½¥¹Ñ1¥¡Ğ€ôôô€„À€˜˜¹¥Í5•Í¡¥ÍÑ…¹•5…Ñ•É¥…°€ôôô€„À¤ì(€€€€€½¹ÍĞ¬€ô”¹ÁÉ½Á•ÉÑ¥•Ì¹•Ğ¡¤ì(€€€€€¬¹±¥¡Ğ€ôœì(€€€ô(€€€É•ÑÕÉ¸ì(€ô(€™Õ¹Ñ¥½¸4¡H°°œ°ä°¤ì(€€€¥˜€¡H¹Ù¥Í¥‰±”€ôôô€„Ä¤É•ÑÕÉ¸ì(€€€¥˜€¡H¹±…å•ÉÌ¹Ñ•ÍĞ¡¹±…å•ÉÌ¤€˜˜€¡H¹¥Í5•Í ñğH¹¥Í1¥¹”ñğH¹¥ÍA½¥¹ÑÌ¤€˜˜€¡H¹…ÍÑM¡…‘½ÜñğH¹É••¥Ù•M¡…‘½Ü€˜˜€ôôô€Ì¤€˜˜€ …H¹™ÉÕÍÑÕµÕ±±•ñğ¸¹¥¹Ñ•ÉÍ•ÑÍ=‰©•Ğ¡H¤¤¤ì(€€€€€H¹µ½‘•±Y¥•İ5…ÑÉ¥à¹µÕ±Ñ¥Á±å5…ÑÉ¥•Ì¡œ¹µ…ÑÉ¥á]½É±‘%¹Ù•ÉÍ”°H¹µ…ÑÉ¥á]½É±¤ì(€€€€€½¹ÍĞ¬€ôĞ¹ÕÁ‘…Ñ”¡H¤°`€ôH¹µ…Ñ•É¥…°ì(€€€€€¥˜€¡ÉÉ…ä¹¥ÍÉÉ…ä¡`¤¤ì(€€€€€€€½¹ÍĞÄ€ô¬¹É½ÕÁÌì(€€€€€€€™½È€¡±•Ğ€ô€À°,€ôÄ¹±•¹Ñ ì€ğ,ì¬¬¤ì(€€€€€€€€€½¹ÍĞ<€ôÅmt°Ñ”€ôam<¹µ…Ñ•É¥…±%¹‘•átì(€€€€€€€€€¥˜€¡Ñ”€˜˜Ñ”¹Ù¥Í¥‰±”¤ì(€€€€€€€€€€€½¹ÍĞ€€ô¡H°Ñ”°ä°¤ì(€€€€€€€€€€€H¹½¹	•™½É•M¡…‘½Ü¡”°H°°œ°¬°€°<¤°”¹É•¹‘•É	Õ™™•É¥É•Ğ¡œ°¹Õ±°°¬°€°H°<¤°H¹½¹™Ñ•ÉM¡…‘½Ü¡”°H°°œ°¬°€°<¤ì(€€€€€€€€€ô(€€€€€€€ô(€€€€€ô•±Í”¥˜€¡`¹Ù¥Í¥‰±”¤ì(€€€€€€€½¹ÍĞÄ€ô¡H°`°ä°¤ì(€€€€€€€H¹½¹	•™½É•M¡…‘½Ü¡”°H°°œ°¬°Ä°¹Õ±°¤°”¹É•¹‘•É	Õ™™•É¥É•Ğ¡œ°¹Õ±°°¬°Ä°H°¹Õ±°¤°H¹½¹™Ñ•ÉM¡…‘½Ü¡”°H°°œ°¬°Ä°¹Õ±°¤ì(€€€€€ô(€€€ô(€€€½¹ÍĞÜ€ôH¹¡¥±‘É•¸ì(€€€™½È€¡±•Ğ¬€ô€À°`€ôÜ¹±•¹Ñ ì¬€ğ`ì¬¬¬¤4¡İm­t°°œ°ä°¤ì(€ô(€™Õ¹Ñ¥½¸¡H¤ì(€€€H¹Ñ…É•Ğ¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰‘¥ÍÁ½Í”ˆ°¤ì(€€€™½È€¡½¹ÍĞ¥¸Œ¤ì(€€€€€½¹ÍĞœ€ômt°ä€ôH¹Ñ…É•Ğ¹ÕÕ¥ì(€€€€€ä¥¸œ€˜˜€¡måt¹‘¥ÍÁ½Í” ¤°‘•±•Ñ”måt¤ì(€€€ô(€ô)ô)™Õ¹Ñ¥½¸á˜¡”°Ğ¤ì(€™Õ¹Ñ¥½¸¤ ¤ì(€€€±•Ğ0€ô€„Äì(€€€½¹ÍĞ¨€ô¹•Ü¥Ğ ¤ì(€€€±•Ğ(€ô¹Õ±°ì(€€€½¹ÍĞ™”€ô¹•Ü¥Ğ À°€À°€À°€À¤ì(€€€É•ÑÕÉ¸ì(€€€€€Í•Ñ5…Í¬è™Õ¹Ñ¥½¸¡}”¤ì(€€€€€€€(€„ôô}”€˜˜€…0€˜˜€¡”¹½±½É5…Í¬¡}”°}”°}”°}”¤°(€ô}”¤ì(€€€€€ô°(€€€€€Í•Ñ1½­•è™Õ¹Ñ¥½¸¡}”¤ì(€€€€€€€0€ô}”ì(€€€€€ô°(€€€€€Í•Ñ±•…Èè™Õ¹Ñ¥½¸¡}”°h°”°İ”°Ğ¤ì(€€€€€€€Ğ€ôôô€„À€˜˜€¡}”€¨ôİ”°h€¨ôİ”°”€¨ôİ”¤°¨¹Í•Ğ¡}”°h°”°İ”¤°™”¹•ÅÕ…±Ì¡¨¤€ôôô€„Ä€˜˜€¡”¹±•…É½±½È¡}”°h°”°İ”¤°™”¹½Áä¡¨¤¤ì(€€€€€ô°(€€€€€É•Í•Ğè™Õ¹Ñ¥½¸ ¤ì(€€€€€€€0€ô€„Ä°(€ô¹Õ±°°™”¹Í•Ğ ´Ä°€À°€À°€À¤ì(€€€€€ô(€€€ôì(€ô(€™Õ¹Ñ¥½¸¸ ¤ì(€€€±•Ğ0€ô€„Ä°¨€ô€„Ä°(€ô¹Õ±°°™”€ô¹Õ±°°}”€ô¹Õ±°ì(€€€É•ÑÕÉ¸ì(€€€€€Í•ÑI•Ù•ÉÍ•è™Õ¹Ñ¥½¸¡h¤ì(€€€€€€€¥˜€¡¨€„ôôh¤ì(€€€€€€€€€½¹ÍĞ”€ôĞ¹•Ğ ‰aQ}±¥Á}½¹ÑÉ½°ˆ¤ì(€€€€€€€€€h€ü”¹±¥Á½¹ÑÉ½±aP¡”¹1=]I}1Q}aP°”¹iI=}Q=}=9}aP¤€è”¹±¥Á½¹ÑÉ½±aP¡”¹1=]I}1Q}aP°”¹9Q%Y}=9}Q=}=9}aP¤°¨€ôhì(€€€€€€€€€½¹ÍĞİ”€ô}”ì(€€€€€€€€€}”€ô¹Õ±°°Ñ¡¥Ì¹Í•Ñ±•…È¡İ”¤ì(€€€€€€€ô(€€€€€ô°(€€€€€•ÑI•Ù•ÉÍ•è™Õ¹Ñ¥½¸ ¤ì(€€€€€€€É•ÑÕÉ¸¨ì(€€€€€ô°(€€€€€Í•ÑQ•ÍĞè™Õ¹Ñ¥½¸¡h¤ì(€€€€€€€h€ü±”¡”¹AQ!}QMP¤€èI”¡”¹AQ!}QMP¤ì(€€€€€ô°(€€€€€Í•Ñ5…Í¬è™Õ¹Ñ¥½¸¡h¤ì(€€€€€€€(€„ôôh€˜˜€…0€˜˜€¡”¹‘•ÁÑ¡5…Í¬¡h¤°(€ôh¤ì(€€€€€ô°(€€€€€Í•ÑÕ¹Œè™Õ¹Ñ¥½¸¡h¤ì(€€€€€€€¥˜€¡¨€˜˜€¡h€ômit¤°™”€„ôôh¤ì(€€€€€€€€€Íİ¥Ñ €¡h¤ì(€€€€€€€€€€€…Í”€Àè(€€€€€€€€€€€€€”¹‘•ÁÑ¡Õ¹Œ¡”¹9YH¤ì(€€€€€€€€€€€€€‰É•…¬ì(€€€€€€€€€€€…Í”€Äè(€€€€€€€€€€€€€”¹‘•ÁÑ¡Õ¹Œ¡”¹1]eL¤ì(€€€€€€€€€€€€€‰É•…¬ì(€€€€€€€€€€€…Í”€Èè(€€€€€€€€€€€€€”¹‘•ÁÑ¡Õ¹Œ¡”¹1ML¤ì(€€€€€€€€€€€€€‰É•…¬ì(€€€€€€€€€€€…Í”€Ìè(€€€€€€€€€€€€€”¹‘•ÁÑ¡Õ¹Œ¡”¹1EU0¤ì(€€€€€€€€€€€€€‰É•…¬ì(€€€€€€€€€€€…Í”€Ğè(€€€€€€€€€€€€€”¹‘•ÁÑ¡Õ¹Œ¡”¹EU0¤ì(€€€€€€€€€€€€€‰É•…¬ì(€€€€€€€€€€€…Í”€Ôè(€€€€€€€€€€€€€”¹‘•ÁÑ¡Õ¹Œ¡”¹EU0¤ì(€€€€€€€€€€€€€‰É•…¬ì(€€€€€€€€€€€…Í”€Øè(€€€€€€€€€€€€€”¹‘•ÁÑ¡Õ¹Œ¡”¹IQH¤ì(€€€€€€€€€€€€€‰É•…¬ì(€€€€€€€€€€€…Í”€Üè(€€€€€€€€€€€€€”¹‘•ÁÑ¡Õ¹Œ¡”¹9=QEU0¤ì(€€€€€€€€€€€€€‰É•…¬ì(€€€€€€€€€€€‘•™…Õ±Ğè(€€€€€€€€€€€€€”¹‘•ÁÑ¡Õ¹Œ¡”¹1EU0¤ì(€€€€€€€€€ô(€€€€€€€€€™”€ôhì(€€€€€€€ô(€€€€€ô°(€€€€€Í•Ñ1½­•è™Õ¹Ñ¥½¸¡h¤ì(€€€€€€€0€ôhì(€€€€€ô°(€€€€€Í•Ñ±•…Èè™Õ¹Ñ¥½¸¡h¤ì(€€€€€€€}”€„ôôh€˜˜€¡}”€ôh°¨€˜˜€¡h€ô€Ä€´h¤°”¹±•…É•ÁÑ ¡h¤¤ì(€€€€€ô°(€€€€€É•Í•Ğè™Õ¹Ñ¥½¸ ¤ì(€€€€€€€0€ô€„Ä°(€ô¹Õ±°°™”€ô¹Õ±°°}”€ô¹Õ±°°¨€ô€„Äì(€€€€€ô(€€€ôì(€ô(€™Õ¹Ñ¥½¸È ¤ì(€€€±•Ğ0€ô€„Ä°¨€ô¹Õ±°°(€ô¹Õ±°°™”€ô¹Õ±°°}”€ô¹Õ±°°h€ô¹Õ±°°”€ô¹Õ±°°İ”€ô¹Õ±°°Ğ€ô¹Õ±°ì(€€€É•ÑÕÉ¸ì(€€€€€Í•ÑQ•ÍĞè™Õ¹Ñ¥½¸¡•Ğ¤ì(€€€€€€€0ñğ€¡•Ğ€ü±”¡”¹MQ9%1}QMP¤€èI”¡”¹MQ9%1}QMP¤¤ì(€€€€€ô°(€€€€€Í•Ñ5…Í¬è™Õ¹Ñ¥½¸¡•Ğ¤ì(€€€€€€€¨€„ôô•Ğ€˜˜€…0€˜˜€¡”¹ÍÑ•¹¥±5…Í¬¡•Ğ¤°¨€ô•Ğ¤ì(€€€€€ô°(€€€€€Í•ÑÕ¹Œè™Õ¹Ñ¥½¸¡•Ğ°Ñ¤°Á¤¤ì(€€€€€€€€¡(€„ôô•Ğñğ™”€„ôôÑ¤ñğ}”€„ôôÁ¤¤€˜˜€¡”¹ÍÑ•¹¥±Õ¹Œ¡•Ğ°Ñ¤°Á¤¤°(€ô•Ğ°™”€ôÑ¤°}”€ôÁ¤¤ì(€€€€€ô°(€€€€€Í•Ñ=Àè™Õ¹Ñ¥½¸¡•Ğ°Ñ¤°Á¤¤ì(€€€€€€€€¡h€„ôô•Ğñğ”€„ôôÑ¤ñğİ”€„ôôÁ¤¤€˜˜€¡”¹ÍÑ•¹¥±=À¡•Ğ°Ñ¤°Á¤¤°h€ô•Ğ°”€ôÑ¤°İ”€ôÁ¤¤ì(€€€€€ô°(€€€€€Í•Ñ1½­•è™Õ¹Ñ¥½¸¡•Ğ¤ì(€€€€€€€0€ô•Ğì(€€€€€ô°(€€€€€Í•Ñ±•…Èè™Õ¹Ñ¥½¸¡•Ğ¤ì(€€€€€€€Ğ€„ôô•Ğ€˜˜€¡”¹±•…ÉMÑ•¹¥°¡•Ğ¤°Ğ€ô•Ğ¤ì(€€€€€ô°(€€€€€É•Í•Ğè™Õ¹Ñ¥½¸ ¤ì(€€€€€€€0€ô€„Ä°¨€ô¹Õ±°°(€ô¹Õ±°°™”€ô¹Õ±°°}”€ô¹Õ±°°h€ô¹Õ±°°”€ô¹Õ±°°İ”€ô¹Õ±°°Ğ€ô¹Õ±°ì(€€€€€ô(€€€ôì(€ô(€½¹ÍĞÌ€ô¹•Ü¤ ¤°„€ô¹•Ü¸ ¤°¼€ô¹•ÜÈ ¤°°€ô€¼¨}}AUI}|€¨¼¹•Ü]•…­5…À ¤°Œ€ô€¼¨}}AUI}|€¨¼¹•Ü]•…­5…À ¤ì(€±•Ğ €ôíô°€ôíô°Ô€ôíô°À€ô€¼¨}}AUI}|€¨¼¹•Ü]•…­5…À ¤°Ø€ômt°ˆ€ô¹Õ±°°´€ô€„Ä°˜€ô¹Õ±°°P€ô¹Õ±°°€ô¹Õ±°°4€ô¹Õ±°°€ô¹Õ±°°H€ô¹Õ±°°€ô¹Õ±°°œ€ô¹•Ü9” À°€À°€À¤°ä€ô€À°€ô€„Ä°Ü€ô¹Õ±°°¬€ô¹Õ±°°`€ô¹Õ±°°Ä€ô¹Õ±°°€ô¹Õ±°ì(€½¹ÍĞ,€ô”¹•ÑA…É…µ•Ñ•È¡”¹5a}=5	%9}QaQUI}%5}U9%QL¤ì(€±•Ğ<€ô€„Ä°Ñ”€ô€Àì(€½¹ÍĞ€€ô”¹•ÑA…É…µ•Ñ•È¡”¹YIM%=8¤ì(€€¹¥¹‘•á=˜ ‰]•‰0ˆ¤€„ôô€´Ä€ü€¡Ñ”€ôÁ…ÉÍ•±½…Ğ ½y]•‰0€¡q¤¼¹•á•Œ ¥lÅt¤°<€ôÑ”€øô€Ä¤€è€¹¥¹‘•á=˜ ‰=Á•¹0Lˆ¤€„ôô€´Ä€˜˜€¡Ñ”€ôÁ…ÉÍ•±½…Ğ ½y=Á•¹0L€¡q¤¼¹•á•Œ ¥lÅt¤°<€ôÑ”€øô€È¤ì(€±•Ğ¥”€ô¹Õ±°°Õ”€ôíôì(€½¹ÍĞ”€ô”¹•ÑA…É…µ•Ñ•È¡”¹M%MM=I}	=`¤°Ù”€ô”¹•ÑA…É…µ•Ñ•È¡”¹Y%]A=IP¤°å”€ô¹•Ü¥Ğ ¤¹™É½µÉÉ…ä¡”¤° €ô¹•Ü¥Ğ ¤¹™É½µÉÉ…ä¡Ù”¤ì(€™Õ¹Ñ¥½¸D¡0°¨°(°™”¤ì(€€€½¹ÍĞ}”€ô¹•ÜU¥¹ĞáÉÉ…ä Ğ¤°h€ô”¹É•…Ñ•Q•áÑÕÉ” ¤ì(€€€”¹‰¥¹‘Q•áÑÕÉ”¡0°h¤°”¹Ñ•áA…É…µ•Ñ•É¤¡0°”¹QaQUI}5%9}%1QH°”¹9IMP¤°”¹Ñ•áA…É…µ•Ñ•É¤¡0°”¹QaQUI}5}%1QH°”¹9IMP¤ì(€€€™½È€¡±•Ğ”€ô€Àì”€ğ(ì”¬¬¤0€ôôô”¹QaQUI|Íñğ0€ôôô”¹QaQUI|É}IId€ü”¹Ñ•á%µ…”Í¡¨°€À°”¹I	°€Ä°€Ä°™”°€À°”¹I	°”¹U9M%9}	eQ°}”¤€è”¹Ñ•á%µ…”É¡¨€¬”°€À°”¹I	°€Ä°€Ä°€À°”¹I	°”¹U9M%9}	eQ°}”¤ì(€€€É•ÑÕÉ¸hì(€ô(€½¹ÍĞ‘”€ôíôì(€‘•m”¹QaQUI|Ét€ôD¡”¹QaQUI|É°”¹QaQUI|É°€Ä¤°‘•m”¹QaQUI}U	}5At€ôD¡”¹QaQUI}U	}5@°”¹QaQUI}U	}5A}A=M%Q%Y}`°€Ø¤°‘•m”¹QaQUI|É}IIet€ôD¡”¹QaQUI|É}IId°”¹QaQUI|É}IId°€Ä°€Ä¤°‘•m”¹QaQUI|Ít€ôD¡”¹QaQUI|Í°”¹QaQUI|Í°€Ä°€Ä¤°Ì¹Í•Ñ±•…È À°€À°€À°€Ä¤°„¹Í•Ñ±•…È Ä¤°¼¹Í•Ñ±•…È À¤°±”¡”¹AQ!}QMP¤°„¹Í•ÑÕ¹Œ Ì¤°	Ğ „Ä¤°ÉĞ Ä¤°±”¡”¹U11}¤°‰Ğ À¤ì(€™Õ¹Ñ¥½¸±”¡0¤ì(€€€¡m1t€„ôô€„À€˜˜€¡”¹•¹…‰±”¡0¤°¡m1t€ô€„À¤ì(€ô(€™Õ¹Ñ¥½¸I”¡0¤ì(€€€¡m1t€„ôô€„Ä€˜˜€¡”¹‘¥Í…‰±”¡0¤°¡m1t€ô€„Ä¤ì(€ô(€™Õ¹Ñ¥½¸”¡0°¨¤ì(€€€É•ÑÕÉ¸Õm1t€„ôô¨€ü€¡”¹‰¥¹‘É…µ•‰Õ™™•È¡0°¨¤°Õm1t€ô¨°0€ôôô”¹I]}I5	UH€˜˜€¡Õm”¹I5	UIt€ô¨¤°0€ôôô”¹I5	UH€˜˜€¡Õm”¹I]}I5	UIt€ô¨¤°€„À¤€è€„Äì(€ô(€™Õ¹Ñ¥½¸%”¡0°¨¤ì(€€€±•Ğ(€ôØ°™”€ô€„Äì(€€€¥˜€¡0¤ì(€€€€€(€ôÀ¹•Ğ¡¨¤°(€ôôôÙ½¥€À€˜˜€¡(€ômt°À¹Í•Ğ¡¨°(¤¤ì(€€€€€½¹ÍĞ}”€ô0¹Ñ•áÑÕÉ•Ìì(€€€€€¥˜€¡(¹±•¹Ñ €„ôô}”¹±•¹Ñ ñğ)lÁt€„ôô”¹=1=I}QQ!59PÀ¤ì(€€€€€€€™½È€¡±•Ğh€ô€À°”€ô}”¹±•¹Ñ ìh€ğ”ìh¬¬¤)mit€ô”¹=1=I}QQ!59PÀ€¬hì(€€€€€€€(¹±•¹Ñ €ô}”¹±•¹Ñ °™”€ô€„Àì(€€€€€ô(€€€ô•±Í”)lÁt€„ôô”¹	,€˜˜€¡)lÁt€ô”¹	,°™”€ô€„À¤ì(€€€™”€˜˜”¹‘É…İ	Õ™™•ÉÌ¡(¤ì(€ô(€™Õ¹Ñ¥½¸©”¡0¤ì(€€€É•ÑÕÉ¸ˆ€„ôô0€ü€¡”¹ÕÍ•AÉ½É…´¡0¤°ˆ€ô0°€„À¤€è€„Äì(€ô(€½¹ÍĞ]”€ôì(€€€€ÄÀÀè”¹U9}°(€€€€ÄÀÄè”¹U9}MU	QIP°(€€€€ÄÀÈè”¹U9}IYIM}MU	QIP(€ôì(€]•lÄÀÍt€ô”¹5%8°]•lÄÀÑt€ô”¹5`ì(€½¹ÍĞ¹Ğ€ôì(€€€€ÈÀÀè”¹iI<°(€€€€ÈÀÄè”¹=9°(€€€€ÈÀÈè”¹MI}=1=H°(€€€€ÈÀĞè”¹MI}1A!°(€€€€ÈÄÀè”¹MI}1A!}MQUIQ°(€€€€ÈÀàè”¹MQ}=1=H°(€€€€ÈÀØè”¹MQ}1A!°(€€€€ÈÀÌè”¹=9}5%9UM}MI}=1=H°(€€€€ÈÀÔè”¹=9}5%9UM}MI}1A!°(€€€€ÈÀäè”¹=9}5%9UM}MQ}=1=H°(€€€€ÈÀÜè”¹=9}5%9UM}MQ}1A!°(€€€€ÈÄÄè”¹=9MQ9Q}=1=H°(€€€€ÈÄÈè”¹=9}5%9UM}=9MQ9Q}=1=H°(€€€€ÈÄÌè”¹=9MQ9Q}1A!°(€€€€ÈÄĞè”¹=9}5%9UM}=9MQ9Q}1A!(€ôì(€™Õ¹Ñ¥½¸‰Ğ¡0°¨°(°™”°}”°h°”°İ”°Ğ°•Ğ¤ì(€€€¥˜€¡0€ôôô€À¤ì(€€€€€´€ôôô€„À€˜˜€¡I”¡”¹	19¤°´€ô€„Ä¤ì(€€€€€É•ÑÕÉ¸ì(€€€ô(€€€¥˜€¡´€ôôô€„Ä€˜˜€¡±”¡”¹	19¤°´€ô€„À¤°0€„ôô€Ô¤ì(€€€€€¥˜€¡0€„ôô˜ñğ•Ğ€„ôô¤ì(€€€€€€€¥˜€ ¡P€„ôô€ÄÀÀñğ€„ôô€ÄÀÀ¤€˜˜€¡”¹‰±•¹‘ÅÕ…Ñ¥½¸¡”¹U9}¤°P€ô€ÄÀÀ°€ô€ÄÀÀ¤°•Ğ¤Íİ¥Ñ €¡0¤ì(€€€€€€€€€…Í”€Äè(€€€€€€€€€€€”¹‰±•¹‘Õ¹M•Á…É…Ñ”¡”¹=9°”¹=9}5%9UM}MI}1A!°”¹=9°”¹=9}5%9UM}MI}1A!¤ì(€€€€€€€€€€€‰É•…¬ì(€€€€€€€€€…Í”€Èè(€€€€€€€€€€€”¹‰±•¹‘Õ¹Œ¡”¹=9°”¹=9¤ì(€€€€€€€€€€€‰É•…¬ì(€€€€€€€€€…Í”€Ìè(€€€€€€€€€€€”¹‰±•¹‘Õ¹M•Á…É…Ñ”¡”¹iI<°”¹=9}5%9UM}MI}=1=H°”¹iI<°”¹=9¤ì(€€€€€€€€€€€‰É•…¬ì(€€€€€€€€€…Í”€Ğè(€€€€€€€€€€€”¹‰±•¹‘Õ¹M•Á…É…Ñ”¡”¹MQ}=1=H°”¹=9}5%9UM}MI}1A!°”¹iI<°”¹=9¤ì(€€€€€€€€€€€‰É•…¬ì(€€€€€€€€€‘•™…Õ±Ğè(€€€€€€€€€€€1” ‰]•‰1MÑ…Ñ”è%¹Ù…±¥‰±•¹‘¥¹œè€ˆ°0¤ì(€€€€€€€€€€€‰É•…¬ì(€€€€€€€ô(€€€€€€€•±Í”Íİ¥Ñ €¡0¤ì(€€€€€€€€€…Í”€Äè(€€€€€€€€€€€”¹‰±•¹‘Õ¹M•Á…É…Ñ”¡”¹MI}1A!°”¹=9}5%9UM}MI}1A!°”¹=9°”¹=9}5%9UM}MI}1A!¤ì(€€€€€€€€€€€‰É•…¬ì(€€€€€€€€€…Í”€Èè(€€€€€€€€€€€”¹‰±•¹‘Õ¹M•Á…É…Ñ”¡”¹MI}1A!°”¹=9°”¹=9°”¹=9¤ì(€€€€€€€€€€€‰É•…¬ì(€€€€€€€€€…Í”€Ìè(€€€€€€€€€€€1” ‰]•‰1MÑ…Ñ”èMÕ‰ÑÉ…Ñ¥Ù•	±•¹‘¥¹œÉ•ÅÕ¥É•Ìµ…Ñ•É¥…°¹ÁÉ•µÕ±Ñ¥Á±¥•‘±Á¡„€ôÑÉÕ”ˆ¤ì(€€€€€€€€€€€‰É•…¬ì(€€€€€€€€€…Í”€Ğè(€€€€€€€€€€€1” ‰]•‰1MÑ…Ñ”è5Õ±Ñ¥Á±å	±•¹‘¥¹œÉ•ÅÕ¥É•Ìµ…Ñ•É¥…°¹ÁÉ•µÕ±Ñ¥Á±¥•‘±Á¡„€ôÑÉÕ”ˆ¤ì(€€€€€€€€€€€‰É•…¬ì(€€€€€€€€€‘•™…Õ±Ğè(€€€€€€€€€€€1” ‰]•‰1MÑ…Ñ”è%¹Ù…±¥‰±•¹‘¥¹œè€ˆ°0¤ì(€€€€€€€€€€€‰É•…¬ì(€€€€€€€ô(€€€€€€€€ô¹Õ±°°4€ô¹Õ±°°H€ô¹Õ±°°€ô¹Õ±°°œ¹Í•Ğ À°€À°€À¤°ä€ô€À°˜€ô0°€ô•Ğì(€€€€€ô(€€€€€É•ÑÕÉ¸ì(€€€ô(€€€}”€ô}”ñğ¨°h€ôhñğ(°”€ô”ñğ™”°€¡¨€„ôôPñğ}”€„ôô¤€˜˜€¡”¹‰±•¹‘ÅÕ…Ñ¥½¹M•Á…É…Ñ”¡]•m©t°]•m}•t¤°P€ô¨°€ô}”¤°€¡(€„ôôñğ™”€„ôô4ñğh€„ôôHñğ”€„ôô¤€˜˜€¡”¹‰±•¹‘Õ¹M•Á…É…Ñ”¡¹Ñm)t°¹Ñm™•t°¹Ñmit°¹Ñm•t¤°€ô(°4€ô™”°H€ôh°€ô”¤°€¡İ”¹•ÅÕ…±Ì¡œ¤€ôôô€„ÄñğĞ€„ôôä¤€˜˜€¡”¹‰±•¹‘½±½È¡İ”¹È°İ”¹œ°İ”¹ˆ°Ğ¤°œ¹½Áä¡İ”¤°ä€ôĞ¤°˜€ô0°€ô€„Äì(€ô(€™Õ¹Ñ¥½¸1Ğ¡0°¨¤ì(€€€0¹Í¥‘”€ôôô€È€üI”¡”¹U11}¤€è±”¡”¹U11}¤ì(€€€±•Ğ(€ô0¹Í¥‘”€ôôô€Äì(€€€¨€˜˜€¡(€ô€…(¤°	Ğ¡(¤°0¹‰±•¹‘¥¹œ€ôôô€Ä€˜˜0¹ÑÉ…¹ÍÁ…É•¹Ğ€ôôô€„Ä€ü‰Ğ À¤€è‰Ğ¡0¹‰±•¹‘¥¹œ°0¹‰±•¹‘ÅÕ…Ñ¥½¸°0¹‰±•¹‘MÉŒ°0¹‰±•¹‘ÍĞ°0¹‰±•¹‘ÅÕ…Ñ¥½¹±Á¡„°0¹‰±•¹‘MÉ±Á¡„°0¹‰±•¹‘ÍÑ±Á¡„°0¹‰±•¹‘½±½È°0¹‰±•¹‘±Á¡„°0¹ÁÉ•µÕ±Ñ¥Á±¥•‘±Á¡„¤°„¹Í•ÑÕ¹Œ¡0¹‘•ÁÑ¡Õ¹Œ¤°„¹Í•ÑQ•ÍĞ¡0¹‘•ÁÑ¡Q•ÍĞ¤°„¹Í•Ñ5…Í¬¡0¹‘•ÁÑ¡]É¥Ñ”¤°Ì¹Í•Ñ5…Í¬¡0¹½±½É]É¥Ñ”¤ì(€€€½¹ÍĞ™”€ô0¹ÍÑ•¹¥±]É¥Ñ”ì(€€€¼¹Í•ÑQ•ÍĞ¡™”¤°™”€˜˜€¡¼¹Í•Ñ5…Í¬¡0¹ÍÑ•¹¥±]É¥Ñ•5…Í¬¤°¼¹Í•ÑÕ¹Œ¡0¹ÍÑ•¹¥±Õ¹Œ°0¹ÍÑ•¹¥±I•˜°0¹ÍÑ•¹¥±Õ¹5…Í¬¤°¼¹Í•Ñ=À¡0¹ÍÑ•¹¥±…¥°°0¹ÍÑ•¹¥±i…¥°°0¹ÍÑ•¹¥±iA…ÍÌ¤¤°}Ğ¡0¹Á½±å½¹=™™Í•Ğ°0¹Á½±å½¹=™™Í•Ñ…Ñ½È°0¹Á½±å½¹=™™Í•ÑU¹¥ÑÌ¤°0¹…±Á¡…Q½½Ù•É…”€ôôô€„À€ü±”¡”¹M5A1}1A!}Q=}=YI¤€èI”¡”¹M5A1}1A!}Q=}=YI¤ì(€ô(€™Õ¹Ñ¥½¸	Ğ¡0¤ì(€€€Ü€„ôô0€˜˜€¡0€ü”¹™É½¹Ñ…”¡”¹\¤€è”¹™É½¹Ñ…”¡”¹\¤°Ü€ô0¤ì(€ô(€™Õ¹Ñ¥½¸ÉĞ¡0¤ì(€€€0€„ôô€À€ü€¡±”¡”¹U11}¤°0€„ôô¬€˜˜€¡0€ôôô€Ä€ü”¹Õ±±…”¡”¹	,¤€è0€ôôô€È€ü”¹Õ±±…”¡”¹I=9P¤€è”¹Õ±±…”¡”¹I=9Q}9}	,¤¤¤€èI”¡”¹U11}¤°¬€ô0ì(€ô(€™Õ¹Ñ¥½¸5Ğ¡0¤ì(€€€0€„ôô`€˜˜€¡<€˜˜”¹±¥¹•]¥‘Ñ ¡0¤°`€ô0¤ì(€ô(€™Õ¹Ñ¥½¸}Ğ¡0°¨°(¤ì(€€€0€ü€¡±”¡”¹A=1e=9}=MQ}%10¤°€¡Ä€„ôô¨ñğ€„ôô(¤€˜˜€¡Ä€ô¨°€ô(°„¹•ÑI•Ù•ÉÍ• ¤€˜˜€¡¨€ô€µ¨¤°”¹Á½±å½¹=™™Í•Ğ¡¨°(¤¤¤€èI”¡”¹A=1e=9}=MQ}%10¤ì(€ô(€™Õ¹Ñ¥½¸™Ğ¡0¤ì(€€€0€ü±”¡”¹M%MM=I}QMP¤€èI”¡”¹M%MM=I}QMP¤ì(€ô(€™Õ¹Ñ¥½¸¡0¤ì(€€€0€ôôôÙ½¥€À€˜˜€¡0€ô”¹QaQUIÀ€¬,€´€Ä¤°¥”€„ôô0€˜˜€¡”¹…Ñ¥Ù•Q•áÑÕÉ”¡0¤°¥”€ô0¤ì(€ô(€™Õ¹Ñ¥½¸éĞ¡0°¨°(¤ì(€€€(€ôôôÙ½¥€À€˜˜€¡¥”€ôôô¹Õ±°€ü(€ô”¹QaQUIÀ€¬,€´€Ä€è(€ô¥”¤ì(€€€±•Ğ™”€ôÕ•m)tì(€€€™”€ôôôÙ½¥€À€˜˜€¡™”€ôì(€€€€€ÑåÁ”èÙ½¥€À°(€€€€€Ñ•áÑÕÉ”èÙ½¥€À(€€€ô°Õ•m)t€ô™”¤°€¡™”¹ÑåÁ”€„ôô0ñğ™”¹Ñ•áÑÕÉ”€„ôô¨¤€˜˜€¡¥”€„ôô(€˜˜€¡”¹…Ñ¥Ù•Q•áÑÕÉ”¡(¤°¥”€ô(¤°”¹‰¥¹‘Q•áÑÕÉ”¡0°¨ñğ‘•m1t¤°™”¹ÑåÁ”€ô0°™”¹Ñ•áÑÕÉ”€ô¨¤ì(€ô(€™Õ¹Ñ¥½¸e” ¤ì(€€€½¹ÍĞ0€ôÕ•m¥•tì(€€€0€„ôôÙ½¥€À€˜˜0¹ÑåÁ”€„ôôÙ½¥€À€˜˜€¡”¹‰¥¹‘Q•áÑÕÉ”¡0¹ÑåÁ”°¹Õ±°¤°0¹ÑåÁ”€ôÙ½¥€À°0¹Ñ•áÑÕÉ”€ôÙ½¥€À¤ì(€ô(€™Õ¹Ñ¥½¸ÍĞ ¤ì(€€€ÑÉäì(€€€€€”¹½µÁÉ•ÍÍ•‘Q•á%µ…”É ¸¸¹…ÉÕµ•¹ÑÌ¤ì(€€€ô…Ñ €¡0¤ì(€€€€€1” ‰]•‰1MÑ…Ñ”èˆ°0¤ì(€€€ô(€ô(€™Õ¹Ñ¥½¸L ¤ì(€€€ÑÉäì(€€€€€”¹½µÁÉ•ÍÍ•‘Q•á%µ…”Í ¸¸¹…ÉÕµ•¹ÑÌ¤ì(€€€ô…Ñ €¡0¤ì(€€€€€1” ‰]•‰1MÑ…Ñ”èˆ°0¤ì(€€€ô(€ô(€™Õ¹Ñ¥½¸| ¤ì(€€€ÑÉäì(€€€€€”¹Ñ•áMÕ‰%µ…”É ¸¸¹…ÉÕµ•¹ÑÌ¤ì(€€€ô…Ñ €¡0¤ì(€€€€€1” ‰]•‰1MÑ…Ñ”èˆ°0¤ì(€€€ô(€ô(€™Õ¹Ñ¥½¸@ ¤ì(€€€ÑÉäì(€€€€€”¹Ñ•áMÕ‰%µ…”Í ¸¸¹…ÉÕµ•¹ÑÌ¤ì(€€€ô…Ñ €¡0¤ì(€€€€€1” ‰]•‰1MÑ…Ñ”èˆ°0¤ì(€€€ô(€ô(€™Õ¹Ñ¥½¸\ ¤ì(€€€ÑÉäì(€€€€€”¹½µÁÉ•ÍÍ•‘Q•áMÕ‰%µ…”É ¸¸¹…ÉÕµ•¹ÑÌ¤ì(€€€ô…Ñ €¡0¤ì(€€€€€1” ‰]•‰1MÑ…Ñ”èˆ°0¤ì(€€€ô(€ô(€™Õ¹Ñ¥½¸d ¤ì(€€€ÑÉäì(€€€€€”¹½µÁÉ•ÍÍ•‘Q•áMÕ‰%µ…”Í ¸¸¹…ÉÕµ•¹ÑÌ¤ì(€€€ô…Ñ €¡0¤ì(€€€€€1” ‰]•‰1MÑ…Ñ”èˆ°0¤ì(€€€ô(€ô(€™Õ¹Ñ¥½¸É” ¤ì(€€€ÑÉäì(€€€€€”¹Ñ•áMÑ½É…”É ¸¸¹…ÉÕµ•¹ÑÌ¤ì(€€€ô…Ñ €¡0¤ì(€€€€€1” ‰]•‰1MÑ…Ñ”èˆ°0¤ì(€€€ô(€ô(€™Õ¹Ñ¥½¸…” ¤ì(€€€ÑÉäì(€€€€€”¹Ñ•áMÑ½É…”Í ¸¸¹…ÉÕµ•¹ÑÌ¤ì(€€€ô…Ñ €¡0¤ì(€€€€€1” ‰]•‰1MÑ…Ñ”èˆ°0¤ì(€€€ô(€ô(€™Õ¹Ñ¥½¸$ ¤ì(€€€ÑÉäì(€€€€€”¹Ñ•á%µ…”É ¸¸¹…ÉÕµ•¹ÑÌ¤ì(€€€ô…Ñ €¡0¤ì(€€€€€1” ‰]•‰1MÑ…Ñ”èˆ°0¤ì(€€€ô(€ô(€™Õ¹Ñ¥½¸¹” ¤ì(€€€ÑÉäì(€€€€€”¹Ñ•á%µ…”Í ¸¸¹…ÉÕµ•¹ÑÌ¤ì(€€€ô…Ñ €¡0¤ì(€€€€€1” ‰]•‰1MÑ…Ñ”èˆ°0¤ì(€€€ô(€ô(€™Õ¹Ñ¥½¸Á”¡0¤ì(€€€É•ÑÕÉ¸‘m1t€„ôôÙ½¥€À€ü‘m1t€è”¹•ÑA…É…µ•Ñ•È¡0¤ì(€ô(€™Õ¹Ñ¥½¸‰”¡0°¨¤ì(€€€‘m1t€„ôô¨€˜˜€¡”¹Á¥á•±MÑ½É•¤¡0°¨¤°‘m1t€ô¨¤ì(€ô(€™Õ¹Ñ¥½¸•”¡0¤ì(€€€å”¹•ÅÕ…±Ì¡0¤€ôôô€„Ä€˜˜€¡”¹Í¥ÍÍ½È¡0¹à°0¹ä°0¹è°0¹Ü¤°å”¹½Áä¡0¤¤ì(€ô(€™Õ¹Ñ¥½¸á”¡0¤ì(€€€ ¹•ÅÕ…±Ì¡0¤€ôôô€„Ä€˜˜€¡”¹Ù¥•İÁ½ÉĞ¡0¹à°0¹ä°0¹è°0¹Ü¤° ¹½Áä¡0¤¤ì(€ô(€™Õ¹Ñ¥½¸Q”¡0°¨¤ì(€€€±•Ğ(€ôŒ¹•Ğ¡¨¤ì(€€€(€ôôôÙ½¥€À€˜˜€¡(€ô€¼¨}}AUI}|€¨¼¹•Ü]•…­5…À ¤°Œ¹Í•Ğ¡¨°(¤¤ì(€€€±•Ğ™”€ô(¹•Ğ¡0¤ì(€€€™”€ôôôÙ½¥€À€˜˜€¡™”€ô”¹•ÑU¹¥™½Éµ	±½­%¹‘•à¡¨°0¹¹…µ”¤°(¹Í•Ğ¡0°™”¤¤ì(€ô(€™Õ¹Ñ¥½¸U”¡0°¨¤ì(€€€½¹ÍĞ(€ôŒ¹•Ğ¡¨¤¹•Ğ¡0¤ì(€€€°¹•Ğ¡¨¤€„ôô(€˜˜€¡”¹Õ¹¥™½Éµ	±½­	¥¹‘¥¹œ¡¨°(°0¹}}‰¥¹‘¥¹A½¥¹Ñ%¹‘•à¤°°¹Í•Ğ¡¨°(¤¤ì(€ô(€™Õ¹Ñ¥½¸Å” ¤ì(€€€”¹‘¥Í…‰±”¡”¹	19¤°”¹‘¥Í…‰±”¡”¹U11}¤°”¹‘¥Í…‰±”¡”¹AQ!}QMP¤°”¹‘¥Í…‰±”¡”¹A=1e=9}=MQ}%10¤°”¹‘¥Í…‰±”¡”¹M%MM=I}QMP¤°”¹‘¥Í…‰±”¡”¹MQ9%1}QMP¤°”¹‘¥Í…‰±”¡”¹M5A1}1A!}Q=}=YI¤°”¹‰±•¹‘ÅÕ…Ñ¥½¸¡”¹U9}¤°”¹‰±•¹‘Õ¹Œ¡”¹=9°”¹iI<¤°”¹‰±•¹‘Õ¹M•Á…É…Ñ”¡”¹=9°”¹iI<°”¹=9°”¹iI<¤°”¹‰±•¹‘½±½È À°€À°€À°€À¤°”¹½±½É5…Í¬ „À°€„À°€„À°€„À¤°”¹±•…É½±½È À°€À°€À°€À¤°”¹‘•ÁÑ¡5…Í¬ „À¤°”¹‘•ÁÑ¡Õ¹Œ¡”¹1ML¤°„¹Í•ÑI•Ù•ÉÍ• „Ä¤°”¹±•…É•ÁÑ  Ä¤°”¹ÍÑ•¹¥±5…Í¬ ĞÈäĞäØÜÈäÔ¤°”¹ÍÑ•¹¥±Õ¹Œ¡”¹1]eL°€À°€ĞÈäĞäØÜÈäÔ¤°”¹ÍÑ•¹¥±=À¡”¹-@°”¹-@°”¹-@¤°”¹±•…ÉMÑ•¹¥° À¤°”¹Õ±±…”¡”¹	,¤°”¹™É½¹Ñ…”¡”¹\¤°”¹Á½±å½¹=™™Í•Ğ À°€À¤°”¹…Ñ¥Ù•Q•áÑÕÉ”¡”¹QaQUIÀ¤°”¹‰¥¹‘É…µ•‰Õ™™•È¡”¹I5	UH°¹Õ±°¤°”¹‰¥¹‘É…µ•‰Õ™™•È¡”¹I]}I5	UH°¹Õ±°¤°”¹‰¥¹‘É…µ•‰Õ™™•È¡”¹I}I5	UH°¹Õ±°¤°”¹ÕÍ•AÉ½É…´¡¹Õ±°¤°”¹±¥¹•]¥‘Ñ  Ä¤°”¹Í¥ÍÍ½È À°€À°”¹…¹Ù…Ì¹İ¥‘Ñ °”¹…¹Ù…Ì¹¡•¥¡Ğ¤°”¹Ù¥•İÁ½ÉĞ À°€À°”¹…¹Ù…Ì¹İ¥‘Ñ °”¹…¹Ù…Ì¹¡•¥¡Ğ¤°”¹Á¥á•±MÑ½É•¤¡”¹A-}1%959P°€Ğ¤°”¹Á¥á•±MÑ½É•¤¡”¹U9A-}1%959P°€Ğ¤°”¹Á¥á•±MÑ½É•¤¡”¹U9A-}1%A}e}]	0°€„Ä¤°”¹Á¥á•±MÑ½É•¤¡”¹U9A-}AI5U1Q%A1e}1A!}]	0°€„Ä¤°”¹Á¥á•±MÑ½É•¤¡”¹U9A-}=1=IMA}=9YIM%=9}]	0°”¹	I=]MI}U1Q}]	0¤°”¹Á¥á•±MÑ½É•¤¡”¹A-}I=]}19Q °€À¤°”¹Á¥á•±MÑ½É•¤¡”¹A-}M-%A}A%a1L°€À¤°”¹Á¥á•±MÑ½É•¤¡”¹A-}M-%A}I=]L°€À¤°”¹Á¥á•±MÑ½É•¤¡”¹U9A-}I=]}19Q °€À¤°”¹Á¥á•±MÑ½É•¤¡”¹U9A-}%5}!%!P°€À¤°”¹Á¥á•±MÑ½É•¤¡”¹U9A-}M-%A}A%a1L°€À¤°”¹Á¥á•±MÑ½É•¤¡”¹U9A-}M-%A}I=]L°€À¤°”¹Á¥á•±MÑ½É•¤¡”¹U9A-}M-%A}%5L°€À¤° €ôíô°€ôíô°¥”€ô¹Õ±°°Õ”€ôíô°Ô€ôíô°À€ô€¼¨}}AUI}|€¨¼¹•Ü]•…­5…À ¤°Ø€ômt°ˆ€ô¹Õ±°°´€ô€„Ä°˜€ô¹Õ±°°P€ô¹Õ±°°€ô¹Õ±°°4€ô¹Õ±°°€ô¹Õ±°°H€ô¹Õ±°°€ô¹Õ±°°œ€ô¹•Ü9” À°€À°€À¤°ä€ô€À°€ô€„Ä°Ü€ô¹Õ±°°¬€ô¹Õ±°°`€ô¹Õ±°°Ä€ô¹Õ±°°€ô¹Õ±°°å”¹Í•Ğ À°€À°”¹…¹Ù…Ì¹İ¥‘Ñ °”¹…¹Ù…Ì¹¡•¥¡Ğ¤° ¹Í•Ğ À°€À°”¹…¹Ù…Ì¹İ¥‘Ñ °”¹…¹Ù…Ì¹¡•¥¡Ğ¤°Ì¹É•Í•Ğ ¤°„¹É•Í•Ğ ¤°¼¹É•Í•Ğ ¤ì(€ô(€É•ÑÕÉ¸ì(€€€‰Õ™™•ÉÌèì(€€€€€½±½ÈèÌ°(€€€€€‘•ÁÑ è„°(€€€€€ÍÑ•¹¥°è¼(€€€ô°(€€€•¹…‰±”è±”°(€€€‘¥Í…‰±”èI”°(€€€‰¥¹‘É…µ•‰Õ™™•Èè”°(€€€‘É…İ	Õ™™•ÉÌè%”°(€€€ÕÍ•AÉ½É…´è©”°(€€€Í•Ñ	±•¹‘¥¹œè‰Ğ°(€€€Í•Ñ5…Ñ•É¥…°è1Ğ°(€€€Í•Ñ±¥ÁM¥‘•è	Ğ°(€€€Í•ÑÕ±±…”èÉĞ°(€€€Í•Ñ1¥¹•]¥‘Ñ è5Ğ°(€€€Í•ÑA½±å½¹=™™Í•Ğè}Ğ°(€€€Í•ÑM¥ÍÍ½ÉQ•ÍĞè™Ğ°(€€€…Ñ¥Ù•Q•áÑÕÉ”è°(€€€‰¥¹‘Q•áÑÕÉ”èéĞ°(€€€Õ¹‰¥¹‘Q•áÑÕÉ”èe”°(€€€½µÁÉ•ÍÍ•‘Q•á%µ…”ÉèÍĞ°(€€€½µÁÉ•ÍÍ•‘Q•á%µ…”ÍèL°(€€€Ñ•á%µ…”Éè$°(€€€Ñ•á%µ…”Íè¹”°(€€€Á¥á•±MÑ½É•¤è‰”°(€€€•ÑA…É…µ•Ñ•ÈèÁ”°(€€€ÕÁ‘…Ñ•U	=5…ÁÁ¥¹œèQ”°(€€€Õ¹¥™½Éµ	±½­	¥¹‘¥¹œèU”°(€€€Ñ•áMÑ½É…”ÉèÉ”°(€€€Ñ•áMÑ½É…”Íè…”°(€€€Ñ•áMÕ‰%µ…”Éè|°(€€€Ñ•áMÕ‰%µ…”Íè@°(€€€½µÁÉ•ÍÍ•‘Q•áMÕ‰%µ…”Éè\°(€€€½µÁÉ•ÍÍ•‘Q•áMÕ‰%µ…”Íèd°(€€€Í¥ÍÍ½Èè•”°(€€€Ù¥•İÁ½ÉĞèá”°(€€€É•Í•ĞèÅ”(€ôì)ô)™Õ¹Ñ¥½¸M˜¡”°Ğ°¤°¸°È°Ì°„¤ì(€½¹ÍĞ¼€ôĞ¹¡…Ì ‰]	1}µÕ±Ñ¥Í…µÁ±•‘}É•¹‘•É}Ñ½}Ñ•áÑÕÉ”ˆ¤€üĞ¹•Ğ ‰]	1}µÕ±Ñ¥Í…µÁ±•‘}É•¹‘•É}Ñ½}Ñ•áÑÕÉ”ˆ¤€è¹Õ±°°°€ôÑåÁ•½˜¹…Ù¥…Ñ½È€ø€‰Ôˆ€ü€„Ä€è€½=Õ±ÕÍ	É½İÍ•È½œ¹Ñ•ÍĞ¡¹…Ù¥…Ñ½È¹ÕÍ•É•¹Ğ¤°Œ€ô¹•Ü” ¤° €ô€¼¨}}AUI}|€¨¼¹•Ü]•…­5…À ¤°€ô€¼¨}}AUI}|€¨¼¹•ÜM•Ğ ¤ì(€±•ĞÔì(€½¹ÍĞÀ€ô€¼¨}}AUI}|€¨¼¹•Ü]•…­5…À ¤ì(€±•ĞØ€ô€„Äì(€ÑÉäì(€€€Ø€ôÑåÁ•½˜=™™ÍÉ••¹…¹Ù…Ì€ğ€‰Ôˆ€˜˜¹•Ü=™™ÍÉ••¹…¹Ù…Ì Ä°€Ä¤¹•Ñ½¹Ñ•áĞ ˆÉˆ¤€„ôô¹Õ±°ì(€ô…Ñ ì(€ô(€™Õ¹Ñ¥½¸ˆ¡L°|¤ì(€€€É•ÑÕÉ¸Ø€ü¹•Ü=™™ÍÉ••¹…¹Ù…Ì¡L°|¤€èi¸ ‰…¹Ù…Ìˆ¤ì(€ô(€™Õ¹Ñ¥½¸´¡L°|°@¤ì(€€€±•Ğ\€ô€Äì(€€€½¹ÍĞd€ôÍĞ¡L¤ì(€€€¥˜€ ¡d¹İ¥‘Ñ €ø@ñğd¹¡•¥¡Ğ€ø@¤€˜˜€¡\€ô@€¼5…Ñ ¹µ…à¡d¹İ¥‘Ñ °d¹¡•¥¡Ğ¤¤°\€ğ€Ä¤¥˜€¡ÑåÁ•½˜!Q51%µ…•±•µ•¹Ğ€ğ€‰Ôˆ€˜˜L¥¹ÍÑ…¹•½˜!Q51%µ…•±•µ•¹ĞñğÑåÁ•½˜!Q51…¹Ù…Í±•µ•¹Ğ€ğ€‰Ôˆ€˜˜L¥¹ÍÑ…¹•½˜!Q51…¹Ù…Í±•µ•¹ĞñğÑåÁ•½˜%µ…•	¥Ñµ…À€ğ€‰Ôˆ€˜˜L¥¹ÍÑ…¹•½˜%µ…•	¥Ñµ…ÀñğÑåÁ•½˜Y¥‘•½É…µ”€ğ€‰Ôˆ€˜˜L¥¹ÍÑ…¹•½˜Y¥‘•½É…µ”¤ì(€€€€€½¹ÍĞÉ”€ô5…Ñ ¹™±½½È¡\€¨d¹İ¥‘Ñ ¤°…”€ô5…Ñ ¹™±½½È¡\€¨d¹¡•¥¡Ğ¤ì(€€€€€Ô€ôôôÙ½¥€À€˜˜€¡Ô€ôˆ¡É”°…”¤¤ì(€€€€€½¹ÍĞ$€ô|€üˆ¡É”°…”¤€èÔì(€€€€€É•ÑÕÉ¸$¹İ¥‘Ñ €ôÉ”°$¹¡•¥¡Ğ€ô…”°$¹•Ñ½¹Ñ•áĞ ˆÉˆ¤¹‘É…İ%µ…”¡L°€À°€À°É”°…”¤°M” ‰]•‰1I•¹‘•É•ÈèQ•áÑÕÉ”¡…Ì‰••¸É•Í¥é•™É½´€ ˆ€¬d¹İ¥‘Ñ €¬€‰àˆ€¬d¹¡•¥¡Ğ€¬€ˆ¤Ñ¼€ ˆ€¬É”€¬€‰àˆ€¬…”€¬€ˆ¤¸ˆ¤°$ì(€€€ô•±Í”(€€€€€É•ÑÕÉ¸€‰‘…Ñ„ˆ¥¸L€˜˜M” ‰]•‰1I•¹‘•É•Èè%µ…”¥¸…Ñ…Q•áÑÕÉ”¥ÌÑ½¼‰¥œ€ ˆ€¬d¹İ¥‘Ñ €¬€‰àˆ€¬d¹¡•¥¡Ğ€¬€ˆ¤¸ˆ¤°Lì(€€€É•ÑÕÉ¸Lì(€ô(€™Õ¹Ñ¥½¸˜¡L¤ì(€€€É•ÑÕÉ¸L¹•¹•É…Ñ•5¥Áµ…ÁÌì(€ô(€™Õ¹Ñ¥½¸P¡L¤ì(€€€”¹•¹•É…Ñ•5¥Áµ…À¡L¤ì(€ô(€™Õ¹Ñ¥½¸¡L¤ì(€€€É•ÑÕÉ¸L¹¥Í]•‰1Õ‰•I•¹‘•ÉQ…É•Ğ€ü”¹QaQUI}U	}5@€èL¹¥Í]•‰0ÍI•¹‘•ÉQ…É•Ğ€ü”¹QaQUI|Í€èL¹¥Í]•‰1ÉÉ…åI•¹‘•ÉQ…É•ĞñğL¹¥Í½µÁÉ•ÍÍ•‘ÉÉ…åQ•áÑÕÉ”€ü”¹QaQUI|É}IId€è”¹QaQUI|Éì(€ô(€™Õ¹Ñ¥½¸4¡L°|°@°\°d°É”€ô€„Ä¤ì(€€€¥˜€¡L€„ôô¹Õ±°¤ì(€€€€€¥˜€¡•mMt€„ôôÙ½¥€À¤É•ÑÕÉ¸•mMtì(€€€€€M” ‰]•‰1I•¹‘•É•ÈèÑÑ•µÁĞÑ¼ÕÍ”¹½¸µ•á¥ÍÑ¥¹œ]•‰0¥¹Ñ•É¹…°™½Éµ…Ğ€œˆ€¬L€¬€ˆœˆ¤ì(€€€ô(€€€±•Ğ…”ì(€€€\€˜˜€¡…”€ôĞ¹•Ğ ‰aQ}Ñ•áÑÕÉ•}¹½É´ÄØˆ¤°…”ñğM” ‰]•‰1I•¹‘•É•ÈèU¹…‰±”Ñ¼ÕÍ”¹½Éµ…±¥é•Ñ•áÑÕÉ•Ìİ¥Ñ¡½ÕĞaQ}Ñ•áÑÕÉ•}¹½É´ÄØ•áÑ•¹Í¥½¸ˆ¤¤ì(€€€±•Ğ$€ô|ì(€€€¥˜€¡|€ôôô”¹I€˜˜€¡@€ôôô”¹1=P€˜˜€¡$€ô”¹HÌÉ¤°@€ôôô”¹!1}1=P€˜˜€¡$€ô”¹HÄÙ¤°@€ôôô”¹U9M%9}	eQ€˜˜€¡$€ô”¹Hà¤°@€ôôô”¹U9M%9}M!=IP€˜˜…”€˜˜€¡$€ô…”¹HÄÙ}aP¤°@€ôôô”¹M!=IP€˜˜…”€˜˜€¡$€ô…”¹HÄÙ}M9=I5}aP¤¤°|€ôôô”¹I}%9QH€˜˜€¡@€ôôô”¹U9M%9}	eQ€˜˜€¡$€ô”¹HáU$¤°@€ôôô”¹U9M%9}M!=IP€˜˜€¡$€ô”¹HÄÙU$¤°@€ôôô”¹U9M%9}%9P€˜˜€¡$€ô”¹HÌÉU$¤°@€ôôô”¹	eQ€˜˜€¡$€ô”¹Há$¤°@€ôôô”¹M!=IP€˜˜€¡$€ô”¹HÄÙ$¤°@€ôôô”¹%9P€˜˜€¡$€ô”¹HÌÉ$¤¤°|€ôôô”¹I€˜˜€¡@€ôôô”¹1=P€˜˜€¡$€ô”¹IÌÉ¤°@€ôôô”¹!1}1=P€˜˜€¡$€ô”¹IÄÙ¤°@€ôôô”¹U9M%9}	eQ€˜˜€¡$€ô”¹Ià¤°@€ôôô”¹U9M%9}M!=IP€˜˜…”€˜˜€¡$€ô…”¹IÄÙ}aP¤°@€ôôô”¹M!=IP€˜˜…”€˜˜€¡$€ô…”¹IÄÙ}M9=I5}aP¤¤°|€ôôô”¹I}%9QH€˜˜€¡@€ôôô”¹U9M%9}	eQ€˜˜€¡$€ô”¹IáU$¤°@€ôôô”¹U9M%9}M!=IP€˜˜€¡$€ô”¹IÄÙU$¤°@€ôôô”¹U9M%9}%9P€˜˜€¡$€ô”¹IÌÉU$¤°@€ôôô”¹	eQ€˜˜€¡$€ô”¹Iá$¤°@€ôôô”¹M!=IP€˜˜€¡$€ô”¹IÄÙ$¤°@€ôôô”¹%9P€˜˜€¡$€ô”¹IÌÉ$¤¤°|€ôôô”¹I	}%9QH€˜˜€¡@€ôôô”¹U9M%9}	eQ€˜˜€¡$€ô”¹IáU$¤°@€ôôô”¹U9M%9}M!=IP€˜˜€¡$€ô”¹IÄÙU$¤°@€ôôô”¹U9M%9}%9P€˜˜€¡$€ô”¹IÌÉU$¤°@€ôôô”¹	eQ€˜˜€¡$€ô”¹Iá$¤°@€ôôô”¹M!=IP€˜˜€¡$€ô”¹IÄÙ$¤°@€ôôô”¹%9P€˜˜€¡$€ô”¹IÌÉ$¤¤°|€ôôô”¹I	}%9QH€˜˜€¡@€ôôô”¹U9M%9}	eQ€˜˜€¡$€ô”¹I	áU$¤°@€ôôô”¹U9M%9}M!=IP€˜˜€¡$€ô”¹I	ÄÙU$¤°@€ôôô”¹U9M%9}%9P€˜˜€¡$€ô”¹I	ÌÉU$¤°@€ôôô”¹	eQ€˜˜€¡$€ô”¹I	á$¤°@€ôôô”¹M!=IP€˜˜€¡$€ô”¹I	ÄÙ$¤°@€ôôô”¹%9P€˜˜€¡$€ô”¹I	ÌÉ$¤¤°|€ôôô”¹I€˜˜€¡@€ôôô”¹U9M%9}M!=IP€˜˜…”€˜˜€¡$€ô…”¹IÄÙ}aP¤°@€ôôô”¹M!=IP€˜˜…”€˜˜€¡$€ô…”¹IÄÙ}M9=I5}aP¤°@€ôôô”¹U9M%9}%9Q|Õ|å|å|å}IX€˜˜€¡$€ô”¹Iå}Ô¤°@€ôôô”¹U9M%9}%9Q|ÄÁ|ÄÅ|ÄÅ}IX€˜˜€¡$€ô”¹HÄÅ}ÄÅ}ÄÁ¤¤°|€ôôô”¹I	¤ì(€€€€€½¹ÍĞ¹”€ôÉ”€ü	È€è!”¹•ÑQÉ…¹Í™•È¡d¤ì(€€€€€@€ôôô”¹1=P€˜˜€¡$€ô”¹I	ÌÉ¤°@€ôôô”¹!1}1=P€˜˜€¡$€ô”¹I	ÄÙ¤°@€ôôô”¹U9M%9}	eQ€˜˜€¡$€ô¹”€ôôô€‰ÍÉˆˆ€ü”¹MIá}1A!à€è”¹I	à¤°@€ôôô”¹U9M%9}M!=IP€˜˜…”€˜˜€¡$€ô…”¹I	ÄÙ}aP¤°@€ôôô”¹M!=IP€˜˜…”€˜˜€¡$€ô…”¹I	ÄÙ}M9=I5}aP¤°@€ôôô”¹U9M%9}M!=IQ|Ñ|Ñ|Ñ|Ğ€˜˜€¡$€ô”¹I	Ğ¤°@€ôôô”¹U9M%9}M!=IQ|Õ|Õ|Õ|Ä€˜˜€¡$€ô”¹IÕ}Ä¤ì(€€€ô(€€€É•ÑÕÉ¸€¡$€ôôô”¹HÄÙñğ$€ôôô”¹HÌÉñğ$€ôôô”¹IÄÙñğ$€ôôô”¹IÌÉñğ$€ôôô”¹I	ÄÙñğ$€ôôô”¹I	ÌÉ¤€˜˜Ğ¹•Ğ ‰aQ}½±½É}‰Õ™™•É}™±½…Ğˆ¤°$ì(€ô(€™Õ¹Ñ¥½¸¡L°|¤ì(€€€±•Ğ@ì(€€€É•ÑÕÉ¸L€ü|€ôôô¹Õ±°ñğ|€ôôô€ÄÀÄĞñğ|€ôôô€ÄÀÈÀ€ü@€ô”¹AQ ÈÑ}MQ9%0à€è|€ôôô€ÄÀÄÔ€ü@€ô”¹AQ ÌÉ}MQ9%0à€è|€ôôô€ÄÀÄÈ€˜˜€¡@€ô”¹AQ ÈÑ}MQ9%0à°M” ‰•ÁÑ¡Q•áÑÕÉ”è€ÄØ‰¥Ğ‘•ÁÑ …ÑÑ…¡µ•¹Ğ¥Ì¹½ĞÍÕÁÁ½ÉÑ•İ¥Ñ ÍÑ•¹¥°¸UÍ¥¹œ€ÈĞµ‰¥Ğ…ÑÑ…¡µ•¹Ğ¸ˆ¤¤€è|€ôôô¹Õ±°ñğ|€ôôô€ÄÀÄĞñğ|€ôôô€ÄÀÈÀ€ü@€ô”¹AQ!}=5A=99PÈĞ€è|€ôôô€ÄÀÄÔ€ü@€ô”¹AQ!}=5A=99PÌÉ€è|€ôôô€ÄÀÄÈ€˜˜€¡@€ô”¹AQ!}=5A=99PÄØ¤°@ì(€ô(€™Õ¹Ñ¥½¸H¡L°|¤ì(€€€É•ÑÕÉ¸˜¡L¤€ôôô€„ÀñğL¹¥ÍÉ…µ•‰Õ™™•ÉQ•áÑÕÉ”€˜˜L¹µ¥¹¥±Ñ•È€„ôô€ÄÀÀÌ€˜˜L¹µ¥¹¥±Ñ•È€„ôô€ÄÀÀØ€ü5…Ñ ¹±½œÈ¡5…Ñ ¹µ…à¡|¹İ¥‘Ñ °|¹¡•¥¡Ğ¤¤€¬€Ä€èL¹µ¥Áµ…ÁÌ€„ôôÙ½¥€À€˜˜L¹µ¥Áµ…ÁÌ¹±•¹Ñ €ø€À€üL¹µ¥Áµ…ÁÌ¹±•¹Ñ €èL¹¥Í½µÁÉ•ÍÍ•‘Q•áÑÕÉ”€˜˜ÉÉ…ä¹¥ÍÉÉ…ä¡L¹¥µ…”¤€ü|¹µ¥Áµ…ÁÌ¹±•¹Ñ €è€Äì(€ô(€™Õ¹Ñ¥½¸¡L¤ì(€€€½¹ÍĞ|€ôL¹Ñ…É•Ğì(€€€|¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰‘¥ÍÁ½Í”ˆ°¤°ä¡|¤°|¹¥ÍY¥‘•½Q•áÑÕÉ”€˜˜ ¹‘•±•Ñ”¡|¤°|¹¥Í!Q51Q•áÑÕÉ”€˜˜¹‘•±•Ñ”¡|¤ì(€ô(€™Õ¹Ñ¥½¸œ¡L¤ì(€€€½¹ÍĞ|€ôL¹Ñ…É•Ğì(€€€|¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰‘¥ÍÁ½Í”ˆ°œ¤°Ü¡|¤ì(€ô(€™Õ¹Ñ¥½¸ä¡L¤ì(€€€½¹ÍĞ|€ô¸¹•Ğ¡L¤ì(€€€¥˜€¡|¹}}İ•‰±%¹¥Ğ€ôôôÙ½¥€À¤É•ÑÕÉ¸ì(€€€½¹ÍĞ@€ôL¹Í½ÕÉ”°\€ôÀ¹•Ğ¡@¤ì(€€€¥˜€¡\¤ì(€€€€€½¹ÍĞd€ô]m|¹}}…¡•-•åtì(€€€€€d¹ÕÍ•‘Q¥µ•Ì´´°d¹ÕÍ•‘Q¥µ•Ì€ôôô€À€˜˜¡L¤°=‰©•Ğ¹­•åÌ¡\¤¹±•¹Ñ €ôôô€À€˜˜À¹‘•±•Ñ”¡@¤ì(€€€ô(€€€¸¹É•µ½Ù”¡L¤ì(€ô(€™Õ¹Ñ¥½¸¡L¤ì(€€€½¹ÍĞ|€ô¸¹•Ğ¡L¤ì(€€€”¹‘•±•Ñ•Q•áÑÕÉ”¡|¹}}İ•‰±Q•áÑÕÉ”¤ì(€€€½¹ÍĞ@€ôL¹Í½ÕÉ”°\€ôÀ¹•Ğ¡@¤ì(€€€‘•±•Ñ”]m|¹}}…¡•-•åt°„¹µ•µ½Éä¹Ñ•áÑÕÉ•Ì´´ì(€ô(€™Õ¹Ñ¥½¸Ü¡L¤ì(€€€½¹ÍĞ|€ô¸¹•Ğ¡L¤ì(€€€¥˜€¡L¹‘•ÁÑ¡Q•áÑÕÉ”€˜˜€¡L¹‘•ÁÑ¡Q•áÑÕÉ”¹‘¥ÍÁ½Í” ¤°¸¹É•µ½Ù”¡L¹‘•ÁÑ¡Q•áÑÕÉ”¤¤°L¹¥Í]•‰1Õ‰•I•¹‘•ÉQ…É•Ğ¤™½È€¡±•Ğ\€ô€Àì\€ğ€Øì\¬¬¤ì(€€€€€¥˜€¡ÉÉ…ä¹¥ÍÉÉ…ä¡|¹}}İ•‰±É…µ•‰Õ™™•Ém]t¤¤™½È€¡±•Ğd€ô€Àìd€ğ|¹}}İ•‰±É…µ•‰Õ™™•Ém]t¹±•¹Ñ ìd¬¬¤”¹‘•±•Ñ•É…µ•‰Õ™™•È¡|¹}}İ•‰±É…µ•‰Õ™™•Ém]umet¤ì(€€€€€•±Í””¹‘•±•Ñ•É…µ•‰Õ™™•È¡|¹}}İ•‰±É…µ•‰Õ™™•Ém]t¤ì(€€€€€|¹}}İ•‰±•ÁÑ¡‰Õ™™•È€˜˜”¹‘•±•Ñ•I•¹‘•É‰Õ™™•È¡|¹}}İ•‰±•ÁÑ¡‰Õ™™•Ém]t¤ì(€€€ô(€€€•±Í”ì(€€€€€¥˜€¡ÉÉ…ä¹¥ÍÉÉ…ä¡|¹}}İ•‰±É…µ•‰Õ™™•È¤¤™½È€¡±•Ğ\€ô€Àì\€ğ|¹}}İ•‰±É…µ•‰Õ™™•È¹±•¹Ñ ì\¬¬¤”¹‘•±•Ñ•É…µ•‰Õ™™•È¡|¹}}İ•‰±É…µ•‰Õ™™•Ém]t¤ì(€€€€€•±Í””¹‘•±•Ñ•É…µ•‰Õ™™•È¡|¹}}İ•‰±É…µ•‰Õ™™•È¤ì(€€€€€¥˜€¡|¹}}İ•‰±•ÁÑ¡‰Õ™™•È€˜˜”¹‘•±•Ñ•I•¹‘•É‰Õ™™•È¡|¹}}İ•‰±•ÁÑ¡‰Õ™™•È¤°|¹}}İ•‰±5Õ±Ñ¥Í…µÁ±•‘É…µ•‰Õ™™•È€˜˜”¹‘•±•Ñ•É…µ•‰Õ™™•È¡|¹}}İ•‰±5Õ±Ñ¥Í…µÁ±•‘É…µ•‰Õ™™•È¤°|¹}}İ•‰±½±½ÉI•¹‘•É‰Õ™™•È¤(€€€€€€€™½È€¡±•Ğ\€ô€Àì\€ğ|¹}}İ•‰±½±½ÉI•¹‘•É‰Õ™™•È¹±•¹Ñ ì\¬¬¤|¹}}İ•‰±½±½ÉI•¹‘•É‰Õ™™•Ém]t€˜˜”¹‘•±•Ñ•I•¹‘•É‰Õ™™•È¡|¹}}İ•‰±½±½ÉI•¹‘•É‰Õ™™•Ém]t¤ì(€€€€€|¹}}İ•‰±•ÁÑ¡I•¹‘•É‰Õ™™•È€˜˜”¹‘•±•Ñ•I•¹‘•É‰Õ™™•È¡|¹}}İ•‰±•ÁÑ¡I•¹‘•É‰Õ™™•È¤ì(€€€ô(€€€½¹ÍĞ@€ôL¹Ñ•áÑÕÉ•Ìì(€€€™½È€¡±•Ğ\€ô€À°d€ô@¹±•¹Ñ ì\€ğdì\¬¬¤ì(€€€€€½¹ÍĞÉ”€ô¸¹•Ğ¡Am]t¤ì(€€€€€É”¹}}İ•‰±Q•áÑÕÉ”€˜˜€¡”¹‘•±•Ñ•Q•áÑÕÉ”¡É”¹}}İ•‰±Q•áÑÕÉ”¤°„¹µ•µ½Éä¹Ñ•áÑÕÉ•Ì´´¤°¸¹É•µ½Ù”¡Am]t¤ì(€€€ô(€€€¸¹É•µ½Ù”¡L¤ì(€ô(€±•Ğ¬€ô€Àì(€™Õ¹Ñ¥½¸` ¤ì(€€€¬€ô€Àì(€ô(€™Õ¹Ñ¥½¸Ä ¤ì(€€€É•ÑÕÉ¸¬ì(€ô(€™Õ¹Ñ¥½¸¡L¤ì(€€€¬€ôLì(€ô(€™Õ¹Ñ¥½¸, ¤ì(€€€½¹ÍĞL€ô¬ì(€€€É•ÑÕÉ¸L€øôÈ¹µ…áQ•áÑÕÉ•Ì€˜˜M” ‰]•‰1Q•áÑÕÉ•ÌèQÉå¥¹œÑ¼ÕÍ”€ˆ€¬L€¬€ˆÑ•áÑÕÉ”Õ¹¥ÑÌİ¡¥±”Ñ¡¥ÌATÍÕÁÁ½ÉÑÌ½¹±ä€ˆ€¬È¹µ…áQ•áÑÕÉ•Ì¤°¬€¬ô€Ä°Lì(€ô(€™Õ¹Ñ¥½¸<¡L¤ì(€€€½¹ÍĞ|€ômtì(€€€É•ÑÕÉ¸|¹ÁÕÍ ¡L¹İÉ…ÁL¤°|¹ÁÕÍ ¡L¹İÉ…ÁP¤°|¹ÁÕÍ ¡L¹İÉ…ÁHñğ€À¤°|¹ÁÕÍ ¡L¹µ…¥±Ñ•È¤°|¹ÁÕÍ ¡L¹µ¥¹¥±Ñ•È¤°|¹ÁÕÍ ¡L¹…¹¥Í½ÑÉ½Áä¤°|¹ÁÕÍ ¡L¹¥¹Ñ•É¹…±½Éµ…Ğ¤°|¹ÁÕÍ ¡L¹™½Éµ…Ğ¤°|¹ÁÕÍ ¡L¹ÑåÁ”¤°|¹ÁÕÍ ¡L¹•¹•É…Ñ•5¥Áµ…ÁÌ¤°|¹ÁÕÍ ¡L¹ÁÉ•µÕ±Ñ¥Á±å±Á¡„¤°|¹ÁÕÍ ¡L¹™±¥Ád¤°|¹ÁÕÍ ¡L¹Õ¹Á…­±¥¹µ•¹Ğ¤°|¹ÁÕÍ ¡L¹½±½ÉMÁ…”¤°|¹©½¥¸ ¤ì(€ô(€™Õ¹Ñ¥½¸Ñ”¡L°|¤ì(€€€½¹ÍĞ@€ô¸¹•Ğ¡L¤ì(€€€¥˜€¡L¹¥ÍY¥‘•½Q•áÑÕÉ”€˜˜éĞ¡L¤°L¹¥ÍI•¹‘•ÉQ…É•ÑQ•áÑÕÉ”€ôôô€„Ä€˜˜L¹¥ÍáÑ•É¹…±Q•áÑÕÉ”€„ôô€„À€˜˜L¹Ù•ÉÍ¥½¸€ø€À€˜˜@¹}}Ù•ÉÍ¥½¸€„ôôL¹Ù•ÉÍ¥½¸¤ì(€€€€€½¹ÍĞ\€ôL¹¥µ…”ì(€€€€€¥˜€¡\€ôôô¹Õ±°¤M” ‰]•‰1I•¹‘•É•ÈèQ•áÑÕÉ”µ…É­•™½ÈÕÁ‘…Ñ”‰ÕĞ¹¼¥µ…”‘…Ñ„™½Õ¹¸ˆ¤ì(€€€€€•±Í”¥˜€¡\¹½µÁ±•Ñ”€ôôô€„Ä¤M” ‰]•‰1I•¹‘•É•ÈèQ•áÑÕÉ”µ…É­•™½ÈÕÁ‘…Ñ”‰ÕĞ¥µ…”¥Ì¥¹½µÁ±•Ñ”ˆ¤ì(€€€€€•±Í”ì(€€€€€€€I”¡@°L°|¤ì(€€€€€€€É•ÑÕÉ¸ì(€€€€€ô(€€€ô•±Í”L¹¥ÍáÑ•É¹…±Q•áÑÕÉ”€˜˜€¡@¹}}İ•‰±Q•áÑÕÉ”€ôL¹Í½ÕÉ•Q•áÑÕÉ”€üL¹Í½ÕÉ•Q•áÑÕÉ”€è¹Õ±°¤ì(€€€¤¹‰¥¹‘Q•áÑÕÉ”¡”¹QaQUI|É°@¹}}İ•‰±Q•áÑÕÉ”°”¹QaQUIÀ€¬|¤ì(€ô(€™Õ¹Ñ¥½¸€¡L°|¤ì(€€€½¹ÍĞ@€ô¸¹•Ğ¡L¤ì(€€€¥˜€¡L¹¥ÍI•¹‘•ÉQ…É•ÑQ•áÑÕÉ”€ôôô€„Ä€˜˜L¹Ù•ÉÍ¥½¸€ø€À€˜˜@¹}}Ù•ÉÍ¥½¸€„ôôL¹Ù•ÉÍ¥½¸¤ì(€€€€€I”¡@°L°|¤ì(€€€€€É•ÑÕÉ¸ì(€€€ô•±Í”L¹¥ÍáÑ•É¹…±Q•áÑÕÉ”€˜˜€¡@¹}}İ•‰±Q•áÑÕÉ”€ôL¹Í½ÕÉ•Q•áÑÕÉ”€üL¹Í½ÕÉ•Q•áÑÕÉ”€è¹Õ±°¤ì(€€€¤¹‰¥¹‘Q•áÑÕÉ”¡”¹QaQUI|É}IId°@¹}}İ•‰±Q•áÑÕÉ”°”¹QaQUIÀ€¬|¤ì(€ô(€™Õ¹Ñ¥½¸¥”¡L°|¤ì(€€€½¹ÍĞ@€ô¸¹•Ğ¡L¤ì(€€€¥˜€¡L¹¥ÍI•¹‘•ÉQ…É•ÑQ•áÑÕÉ”€ôôô€„Ä€˜˜L¹Ù•ÉÍ¥½¸€ø€À€˜˜@¹}}Ù•ÉÍ¥½¸€„ôôL¹Ù•ÉÍ¥½¸¤ì(€€€€€I”¡@°L°|¤ì(€€€€€É•ÑÕÉ¸ì(€€€ô(€€€¤¹‰¥¹‘Q•áÑÕÉ”¡”¹QaQUI|Í°@¹}}İ•‰±Q•áÑÕÉ”°”¹QaQUIÀ€¬|¤ì(€ô(€™Õ¹Ñ¥½¸Õ”¡L°|¤ì(€€€½¹ÍĞ@€ô¸¹•Ğ¡L¤ì(€€€¥˜€¡L¹¥ÍÕ‰••ÁÑ¡Q•áÑÕÉ”€„ôô€„À€˜˜L¹Ù•ÉÍ¥½¸€ø€À€˜˜@¹}}Ù•ÉÍ¥½¸€„ôôL¹Ù•ÉÍ¥½¸¤ì(€€€€€”¡@°L°|¤ì(€€€€€É•ÑÕÉ¸ì(€€€ô(€€€¤¹‰¥¹‘Q•áÑÕÉ”¡”¹QaQUI}U	}5@°@¹}}İ•‰±Q•áÑÕÉ”°”¹QaQUIÀ€¬|¤ì(€ô(€½¹ÍĞ”€ôì(€€€mÉtè”¹IAP°(€€€m½¥tè”¹15A}Q=}°(€€€m=Étè”¹5%II=I}IAP(€ô°Ù”€ôì(€€€mQÑtè”¹9IMP°(€€€mA½tè”¹9IMQ}5%A5A}9IMP°(€€€m1½tè”¹9IMQ}5%A5A}1%9H°(€€€m%Ñtè”¹1%9H°(€€€m½tè”¹1%9I}5%A5A}9IMP°(€€€mÅÉtè”¹1%9I}5%A5A}1%9H(€ô°å”€ôì(€€€€ÔÄÈè”¹9YH°(€€€€ÔÄäè”¹1]eL°(€€€€ÔÄÌè”¹1ML°(€€€€ÔÄÔè”¹1EU0°(€€€€ÔÄĞè”¹EU0°(€€€€ÔÄàè”¹EU0°(€€€€ÔÄØè”¹IQH°(€€€€ÔÄÜè”¹9=QEU0(€ôì(€™Õ¹Ñ¥½¸ ¡L°|¤ì(€€€¥˜€¡|¹ÑåÁ”€ôôô€ÄÀÄÔ€˜˜Ğ¹¡…Ì ‰=M}Ñ•áÑÕÉ•}™±½…Ñ}±¥¹•…Èˆ¤€ôôô€„Ä€˜˜€¡|¹µ…¥±Ñ•È€ôôô€ÄÀÀØñğ|¹µ…¥±Ñ•È€ôôô€ÄÀÀÜñğ|¹µ…¥±Ñ•È€ôôô€ÄÀÀÔñğ|¹µ…¥±Ñ•È€ôôô€ÄÀÀàñğ|¹µ¥¹¥±Ñ•È€ôôô€ÄÀÀØñğ|¹µ¥¹¥±Ñ•È€ôôô€ÄÀÀÜñğ|¹µ¥¹¥±Ñ•È€ôôô€ÄÀÀÔñğ|¹µ¥¹¥±Ñ•È€ôôô€ÄÀÀà¤€˜˜M” ‰]•‰1I•¹‘•É•ÈèU¹…‰±”Ñ¼ÕÍ”±¥¹•…È™¥±Ñ•É¥¹œİ¥Ñ ™±½…Ñ¥¹œÁ½¥¹ĞÑ•áÑÕÉ•Ì¸=M}Ñ•áÑÕÉ•}™±½…Ñ}±¥¹•…È¹½ĞÍÕÁÁ½ÉÑ•½¸Ñ¡¥Ì‘•Ù¥”¸ˆ¤°”¹Ñ•áA…É…µ•Ñ•É¤¡L°”¹QaQUI}]IA}L°•m|¹İÉ…ÁMt¤°”¹Ñ•áA…É…µ•Ñ•É¤¡L°”¹QaQUI}]IA}P°•m|¹İÉ…ÁQt¤°€¡L€ôôô”¹QaQUI|ÍñğL€ôôô”¹QaQUI|É}IId¤€˜˜”¹Ñ•áA…É…µ•Ñ•É¤¡L°”¹QaQUI}]IA}H°•m|¹İÉ…ÁIt¤°”¹Ñ•áA…É…µ•Ñ•É¤¡L°”¹QaQUI}5}%1QH°Ù•m|¹µ…¥±Ñ•Ét¤°”¹Ñ•áA…É…µ•Ñ•É¤¡L°”¹QaQUI}5%9}%1QH°Ù•m|¹µ¥¹¥±Ñ•Ét¤°|¹½µÁ…É•Õ¹Ñ¥½¸€˜˜€¡”¹Ñ•áA…É…µ•Ñ•É¤¡L°”¹QaQUI}=5AI}5=°”¹=5AI}I}Q=}QaQUI¤°”¹Ñ•áA…É…µ•Ñ•É¤¡L°”¹QaQUI}=5AI}U9°å•m|¹½µÁ…É•Õ¹Ñ¥½¹t¤¤°Ğ¹¡…Ì ‰aQ}Ñ•áÑÕÉ•}™¥±Ñ•É}…¹¥Í½ÑÉ½Á¥Œˆ¤€ôôô€„À¤ì(€€€€€¥˜€¡|¹µ…¥±Ñ•È€ôôô€ÄÀÀÌñğ|¹µ¥¹¥±Ñ•È€„ôô€ÄÀÀÔ€˜˜|¹µ¥¹¥±Ñ•È€„ôô€ÄÀÀàñğ|¹ÑåÁ”€ôôô€ÄÀÄÔ€˜˜Ğ¹¡…Ì ‰=M}Ñ•áÑÕÉ•}™±½…Ñ}±¥¹•…Èˆ¤€ôôô€„Ä¤É•ÑÕÉ¸ì(€€€€€¥˜€¡|¹…¹¥Í½ÑÉ½Áä€ø€Äñğ¸¹•Ğ¡|¤¹}}ÕÉÉ•¹Ñ¹¥Í½ÑÉ½Áä¤ì(€€€€€€€½¹ÍĞ@€ôĞ¹•Ğ ‰aQ}Ñ•áÑÕÉ•}™¥±Ñ•É}…¹¥Í½ÑÉ½Á¥Œˆ¤ì(€€€€€€€”¹Ñ•áA…É…µ•Ñ•É˜¡L°@¹QaQUI}5a}9%M=QI=Ae}aP°5…Ñ ¹µ¥¸¡|¹…¹¥Í½ÑÉ½Áä°È¹•Ñ5…á¹¥Í½ÑÉ½Áä ¤¤¤°¸¹•Ğ¡|¤¹}}ÕÉÉ•¹Ñ¹¥Í½ÑÉ½Áä€ô|¹…¹¥Í½ÑÉ½Áäì(€€€€€ô(€€€ô(€ô(€™Õ¹Ñ¥½¸D¡L°|¤ì(€€€±•Ğ@€ô€„Äì(€€€L¹}}İ•‰±%¹¥Ğ€ôôôÙ½¥€À€˜˜€¡L¹}}İ•‰±%¹¥Ğ€ô€„À°|¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰‘¥ÍÁ½Í”ˆ°¤¤ì(€€€½¹ÍĞ\€ô|¹Í½ÕÉ”ì(€€€±•Ğd€ôÀ¹•Ğ¡\¤ì(€€€d€ôôôÙ½¥€À€˜˜€¡d€ôíô°À¹Í•Ğ¡\°d¤¤ì(€€€½¹ÍĞÉ”€ô<¡|¤ì(€€€¥˜€¡É”€„ôôL¹}}…¡•-•ä¤ì(€€€€€emÉ•t€ôôôÙ½¥€À€˜˜€¡emÉ•t€ôì(€€€€€€€Ñ•áÑÕÉ”è”¹É•…Ñ•Q•áÑÕÉ” ¤°(€€€€€€€ÕÍ•‘Q¥µ•Ìè€À(€€€€€ô°„¹µ•µ½Éä¹Ñ•áÑÕÉ•Ì¬¬°@€ô€„À¤°emÉ•t¹ÕÍ•‘Q¥µ•Ì¬¬ì(€€€€€½¹ÍĞ…”€ôemL¹}}…¡•-•åtì(€€€€€…”€„ôôÙ½¥€À€˜˜€¡emL¹}}…¡•-•åt¹ÕÍ•‘Q¥µ•Ì´´°…”¹ÕÍ•‘Q¥µ•Ì€ôôô€À€˜˜¡|¤¤°L¹}}…¡•-•ä€ôÉ”°L¹}}İ•‰±Q•áÑÕÉ”€ôemÉ•t¹Ñ•áÑÕÉ”ì(€€€ô(€€€É•ÑÕÉ¸@ì(€ô(€™Õ¹Ñ¥½¸‘”¡L°|°@¤ì(€€€É•ÑÕÉ¸5…Ñ ¹™±½½È¡5…Ñ ¹™±½½È¡L€¼@¤€¼|¤ì(€ô(€™Õ¹Ñ¥½¸±”¡L°|°@°\¤ì(€€€½¹ÍĞÉ”€ôL¹ÕÁ‘…Ñ•I…¹•Ìì(€€€¥˜€¡É”¹±•¹Ñ €ôôô€À¤¤¹Ñ•áMÕ‰%µ…”É¡”¹QaQUI|É°€À°€À°€À°|¹İ¥‘Ñ °|¹¡•¥¡Ğ°@°\°|¹‘…Ñ„¤ì(€€€•±Í”ì(€€€€€É”¹Í½ÉĞ ¡‰”°•”¤€ôø‰”¹ÍÑ…ÉĞ€´•”¹ÍÑ…ÉĞ¤ì(€€€€€±•Ğ…”€ô€Àì(€€€€€™½È€¡±•Ğ‰”€ô€Äì‰”€ğÉ”¹±•¹Ñ ì‰”¬¬¤ì(€€€€€€€½¹ÍĞ•”€ôÉ•m…•t°á”€ôÉ•m‰•t°Q”€ô•”¹ÍÑ…ÉĞ€¬•”¹½Õ¹Ğ°U”€ô‘”¡á”¹ÍÑ…ÉĞ°|¹İ¥‘Ñ °€Ğ¤°Å”€ô‘”¡•”¹ÍÑ…ÉĞ°|¹İ¥‘Ñ °€Ğ¤ì(€€€€€€€á”¹ÍÑ…ÉĞ€ğôQ”€¬€Ä€˜˜U”€ôôôÅ”€˜˜‘”¡á”¹ÍÑ…ÉĞ€¬á”¹½Õ¹Ğ€´€Ä°|¹İ¥‘Ñ °€Ğ¤€ôôôU”€ü•”¹½Õ¹Ğ€ô5…Ñ ¹µ…à¡•”¹½Õ¹Ğ°á”¹ÍÑ…ÉĞ€¬á”¹½Õ¹Ğ€´•”¹ÍÑ…ÉĞ¤€è€ ¬­…”°É•m…•t€ôá”¤ì(€€€€€ô(€€€€€É”¹±•¹Ñ €ô…”€¬€Äì(€€€€€½¹ÍĞ$€ô¤¹•ÑA…É…µ•Ñ•È¡”¹U9A-}I=]}19Q ¤°¹”€ô¤¹•ÑA…É…µ•Ñ•È¡”¹U9A-}M-%A}A%a1L¤°Á”€ô¤¹•ÑA…É…µ•Ñ•È¡”¹U9A-}M-%A}I=]L¤ì(€€€€€¤¹Á¥á•±MÑ½É•¤¡”¹U9A-}I=]}19Q °|¹İ¥‘Ñ ¤ì(€€€€€™½È€¡±•Ğ‰”€ô€À°•”€ôÉ”¹±•¹Ñ ì‰”€ğ•”ì‰”¬¬¤ì(€€€€€€€½¹ÍĞá”€ôÉ•m‰•t°Q”€ô5…Ñ ¹™±½½È¡á”¹ÍÑ…ÉĞ€¼€Ğ¤°U”€ô5…Ñ ¹•¥°¡á”¹½Õ¹Ğ€¼€Ğ¤°Å”€ôQ”€”|¹İ¥‘Ñ °0€ô5…Ñ ¹™±½½È¡Q”€¼|¹İ¥‘Ñ ¤°¨€ôU”°(€ô€Äì(€€€€€€€¤¹Á¥á•±MÑ½É•¤¡”¹U9A-}M-%A}A%a1L°Å”¤°¤¹Á¥á•±MÑ½É•¤¡”¹U9A-}M-%A}I=]L°0¤°¤¹Ñ•áMÕ‰%µ…”É¡”¹QaQUI|É°€À°Å”°0°¨°(°@°\°|¹‘…Ñ„¤ì(€€€€€ô(€€€€€L¹±•…ÉUÁ‘…Ñ•I…¹•Ì ¤°¤¹Á¥á•±MÑ½É•¤¡”¹U9A-}I=]}19Q °$¤°¤¹Á¥á•±MÑ½É•¤¡”¹U9A-}M-%A}A%a1L°¹”¤°¤¹Á¥á•±MÑ½É•¤¡”¹U9A-}M-%A}I=]L°Á”¤ì(€€€ô(€ô(€™Õ¹Ñ¥½¸I”¡L°|°@¤ì(€€€±•Ğ\€ô”¹QaQUI|Éì(€€€€¡|¹¥Í…Ñ…ÉÉ…åQ•áÑÕÉ”ñğ|¹¥Í½µÁÉ•ÍÍ•‘ÉÉ…åQ•áÑÕÉ”¤€˜˜€¡\€ô”¹QaQUI|É}IId¤°|¹¥Í…Ñ„ÍQ•áÑÕÉ”€˜˜€¡\€ô”¹QaQUI|Í¤ì(€€€½¹ÍĞd€ôD¡L°|¤°É”€ô|¹Í½ÕÉ”ì(€€€¤¹‰¥¹‘Q•áÑÕÉ”¡\°L¹}}İ•‰±Q•áÑÕÉ”°”¹QaQUIÀ€¬@¤ì(€€€½¹ÍĞ…”€ô¸¹•Ğ¡É”¤ì(€€€¥˜€¡É”¹Ù•ÉÍ¥½¸€„ôô…”¹}}Ù•ÉÍ¥½¸ñğd€ôôô€„À¤ì(€€€€€¥˜€¡¤¹…Ñ¥Ù•Q•áÑÕÉ”¡”¹QaQUIÀ€¬@¤°€„¡ÑåÁ•½˜%µ…•	¥Ñµ…À€ğ€‰Ôˆ€˜˜|¹¥µ…”¥¹ÍÑ…¹•½˜%µ…•	¥Ñµ…À¤¤ì(€€€€€€€½¹ÍĞ¨€ô!”¹•ÑAÉ¥µ…É¥•Ì¡!”¹İ½É­¥¹½±½ÉMÁ…”¤°(€ô|¹½±½ÉMÁ…”€ôôô€ˆˆ€ü¹Õ±°€è!”¹•ÑAÉ¥µ…É¥•Ì¡|¹½±½ÉMÁ…”¤°™”€ô|¹½±½ÉMÁ…”€ôôô€ˆˆñğ¨€ôôô(€ü”¹9=9€è”¹	I=]MI}U1Q}]	0ì(€€€€€€€¤¹Á¥á•±MÑ½É•¤¡”¹U9A-}1%A}e}]	0°|¹™±¥Ád¤°¤¹Á¥á•±MÑ½É•¤¡”¹U9A-}AI5U1Q%A1e}1A!}]	0°|¹ÁÉ•µÕ±Ñ¥Á±å±Á¡„¤°¤¹Á¥á•±MÑ½É•¤¡”¹U9A-}=1=IMA}=9YIM%=9}]	0°™”¤ì(€€€€€ô(€€€€€¤¹Á¥á•±MÑ½É•¤¡”¹U9A-}1%959P°|¹Õ¹Á…­±¥¹µ•¹Ğ¤ì(€€€€€±•Ğ$€ô´¡|¹¥µ…”°€„Ä°È¹µ…áQ•áÑÕÉ•M¥é”¤ì(€€€€€$€ôe”¡|°$¤ì(€€€€€½¹ÍĞ¹”€ôÌ¹½¹Ù•ÉĞ¡|¹™½Éµ…Ğ°|¹½±½ÉMÁ…”¤°Á”€ôÌ¹½¹Ù•ÉĞ¡|¹ÑåÁ”¤ì(€€€€€±•Ğ‰”€ô4¡|¹¥¹Ñ•É¹…±½Éµ…Ğ°¹”°Á”°|¹¹½Éµ…±¥é•°|¹½±½ÉMÁ…”°|¹¥ÍY¥‘•½Q•áÑÕÉ”¤ì(€€€€€ ¡\°|¤ì(€€€€€±•Ğ•”ì(€€€€€½¹ÍĞá”€ô|¹µ¥Áµ…ÁÌ°Q”€ô|¹¥ÍY¥‘•½Q•áÑÕÉ”€„ôô€„À°U”€ô…”¹}}Ù•ÉÍ¥½¸€ôôôÙ½¥€Àñğd€ôôô€„À°Å”€ôÉ”¹‘…Ñ…I•…‘ä°0€ôH¡|°$¤ì(€€€€€¥˜€¡|¹¥Í•ÁÑ¡Q•áÑÕÉ”¤(€€€€€€€‰”€ô¡|¹™½Éµ…Ğ€ôôô=¼°|¹ÑåÁ”¤°U”€˜˜€¡Q”€ü¤¹Ñ•áMÑ½É…”É¡”¹QaQUI|É°€Ä°‰”°$¹İ¥‘Ñ °$¹¡•¥¡Ğ¤€è¤¹Ñ•á%µ…”É¡”¹QaQUI|É°€À°‰”°$¹İ¥‘Ñ °$¹¡•¥¡Ğ°€À°¹”°Á”°¹Õ±°¤¤ì(€€€€€•±Í”¥˜€¡|¹¥Í…Ñ…Q•áÑÕÉ”¤¥˜€¡á”¹±•¹Ñ €ø€À¤ì(€€€€€€€Q”€˜˜U”€˜˜¤¹Ñ•áMÑ½É…”É¡”¹QaQUI|É°0°‰”°á•lÁt¹İ¥‘Ñ °á•lÁt¹¡•¥¡Ğ¤ì(€€€€€€€™½È€¡±•Ğ¨€ô€À°(€ôá”¹±•¹Ñ ì¨€ğ(ì¨¬¬¤(€€€€€€€€€•”€ôá•m©t°Q”€üÅ”€˜˜¤¹Ñ•áMÕ‰%µ…”É¡”¹QaQUI|É°¨°€À°€À°•”¹İ¥‘Ñ °•”¹¡•¥¡Ğ°¹”°Á”°•”¹‘…Ñ„¤€è¤¹Ñ•á%µ…”É¡”¹QaQUI|É°¨°‰”°•”¹İ¥‘Ñ °•”¹¡•¥¡Ğ°€À°¹”°Á”°•”¹‘…Ñ„¤ì(€€€€€€€|¹•¹•É…Ñ•5¥Áµ…ÁÌ€ô€„Äì(€€€€€ô•±Í”Q”€ü€¡U”€˜˜¤¹Ñ•áMÑ½É…”É¡”¹QaQUI|É°0°‰”°$¹İ¥‘Ñ °$¹¡•¥¡Ğ¤°Å”€˜˜±”¡|°$°¹”°Á”¤¤€è¤¹Ñ•á%µ…”É¡”¹QaQUI|É°€À°‰”°$¹İ¥‘Ñ °$¹¡•¥¡Ğ°€À°¹”°Á”°$¹‘…Ñ„¤ì(€€€€€•±Í”¥˜€¡|¹¥Í½µÁÉ•ÍÍ•‘Q•áÑÕÉ”¤¥˜€¡|¹¥Í½µÁÉ•ÍÍ•‘ÉÉ…åQ•áÑÕÉ”¤ì(€€€€€€€Q”€˜˜U”€˜˜¤¹Ñ•áMÑ½É…”Í¡”¹QaQUI|É}IId°0°‰”°á•lÁt¹İ¥‘Ñ °á•lÁt¹¡•¥¡Ğ°$¹‘•ÁÑ ¤ì(€€€€€€€™½È€¡±•Ğ¨€ô€À°(€ôá”¹±•¹Ñ ì¨€ğ(ì¨¬¬¤(€€€€€€€€€¥˜€¡•”€ôá•m©t°|¹™½Éµ…Ğ€„ôô€ÄÀÈÌ¤¥˜€¡¹”€„ôô¹Õ±°¤¥˜€¡Q”¤ì(€€€€€€€€€€€¥˜€¡Å”¤¥˜€¡|¹±…å•ÉUÁ‘…Ñ•Ì¹Í¥é”€ø€À¤ì(€€€€€€€€€€€€€½¹ÍĞ™”€ôi„¡•”¹İ¥‘Ñ °•”¹¡•¥¡Ğ°|¹™½Éµ…Ğ°|¹ÑåÁ”¤ì(€€€€€€€€€€€€€™½È€¡½¹ÍĞ}”½˜|¹±…å•ÉUÁ‘…Ñ•Ì¤ì(€€€€€€€€€€€€€€€½¹ÍĞh€ô•”¹‘…Ñ„¹ÍÕ‰…ÉÉ…ä¡}”€¨™”€¼•”¹‘…Ñ„¹	eQM}AI}159P°€¡}”€¬€Ä¤€¨™”€¼•”¹‘…Ñ„¹	eQM}AI}159P¤ì(€€€€€€€€€€€€€€€¤¹½µÁÉ•ÍÍ•‘Q•áMÕ‰%µ…”Í¡”¹QaQUI|É}IId°¨°€À°€À°}”°•”¹İ¥‘Ñ °•”¹¡•¥¡Ğ°€Ä°¹”°h¤ì(€€€€€€€€€€€€€ô(€€€€€€€€€€€€€|¹±•…É1…å•ÉUÁ‘…Ñ•Ì ¤ì(€€€€€€€€€€€ô•±Í”¤¹½µÁÉ•ÍÍ•‘Q•áMÕ‰%µ…”Í¡”¹QaQUI|É}IId°¨°€À°€À°€À°•”¹İ¥‘Ñ °•”¹¡•¥¡Ğ°$¹‘•ÁÑ °¹”°•”¹‘…Ñ„¤ì(€€€€€€€€€ô•±Í”¤¹½µÁÉ•ÍÍ•‘Q•á%µ…”Í¡”¹QaQUI|É}IId°¨°‰”°•”¹İ¥‘Ñ °•”¹¡•¥¡Ğ°$¹‘•ÁÑ °€À°•”¹‘…Ñ„°€À°€À¤ì(€€€€€€€€€•±Í”M” ‰]•‰1I•¹‘•É•ÈèÑÑ•µÁĞÑ¼±½…Õ¹ÍÕÁÁ½ÉÑ•½µÁÉ•ÍÍ•Ñ•áÑÕÉ”™½Éµ…Ğ¥¸€¹ÕÁ±½…‘Q•áÑÕÉ” ¤ˆ¤ì(€€€€€€€€€•±Í”Q”€üÅ”€˜˜¤¹Ñ•áMÕ‰%µ…”Í¡”¹QaQUI|É}IId°¨°€À°€À°€À°•”¹İ¥‘Ñ °•”¹¡•¥¡Ğ°$¹‘•ÁÑ °¹”°Á”°•”¹‘…Ñ„¤€è¤¹Ñ•á%µ…”Í¡”¹QaQUI|É}IId°¨°‰”°•”¹İ¥‘Ñ °•”¹¡•¥¡Ğ°$¹‘•ÁÑ °€À°¹”°Á”°•”¹‘…Ñ„¤ì(€€€€€ô•±Í”ì(€€€€€€€Q”€˜˜U”€˜˜¤¹Ñ•áMÑ½É…”É¡”¹QaQUI|É°0°‰”°á•lÁt¹İ¥‘Ñ °á•lÁt¹¡•¥¡Ğ¤ì(€€€€€€€™½È€¡±•Ğ¨€ô€À°(€ôá”¹±•¹Ñ ì¨€ğ(ì¨¬¬¤(€€€€€€€€€•”€ôá•m©t°|¹™½Éµ…Ğ€„ôô€ÄÀÈÌ€ü¹”€„ôô¹Õ±°€üQ”€üÅ”€˜˜¤¹½µÁÉ•ÍÍ•‘Q•áMÕ‰%µ…”É¡”¹QaQUI|É°¨°€À°€À°•”¹İ¥‘Ñ °•”¹¡•¥¡Ğ°¹”°•”¹‘…Ñ„¤€è¤¹½µÁÉ•ÍÍ•‘Q•á%µ…”É¡”¹QaQUI|É°¨°‰”°•”¹İ¥‘Ñ °•”¹¡•¥¡Ğ°€À°•”¹‘…Ñ„¤€èM” ‰]•‰1I•¹‘•É•ÈèÑÑ•µÁĞÑ¼±½…Õ¹ÍÕÁÁ½ÉÑ•½µÁÉ•ÍÍ•Ñ•áÑÕÉ”™½Éµ…Ğ¥¸€¹ÕÁ±½…‘Q•áÑÕÉ” ¤ˆ¤€èQ”€üÅ”€˜˜¤¹Ñ•áMÕ‰%µ…”É¡”¹QaQUI|É°¨°€À°€À°•”¹İ¥‘Ñ °•”¹¡•¥¡Ğ°¹”°Á”°•”¹‘…Ñ„¤€è¤¹Ñ•á%µ…”É¡”¹QaQUI|É°¨°‰”°•”¹İ¥‘Ñ °•”¹¡•¥¡Ğ°€À°¹”°Á”°•”¹‘…Ñ„¤ì(€€€€€ô(€€€€€•±Í”¥˜€¡|¹¥Í…Ñ…ÉÉ…åQ•áÑÕÉ”¤¥˜€¡Q”¤ì(€€€€€€€¥˜€¡U”€˜˜¤¹Ñ•áMÑ½É…”Í¡”¹QaQUI|É}IId°0°‰”°$¹İ¥‘Ñ °$¹¡•¥¡Ğ°$¹‘•ÁÑ ¤°Å”¤¥˜€¡|¹±…å•ÉUÁ‘…Ñ•Ì¹Í¥é”€ø€À¤ì(€€€€€€€€€½¹ÍĞ¨€ôi„¡$¹İ¥‘Ñ °$¹¡•¥¡Ğ°|¹™½Éµ…Ğ°|¹ÑåÁ”¤ì(€€€€€€€€€™½È€¡½¹ÍĞ(½˜|¹±…å•ÉUÁ‘…Ñ•Ì¤ì(€€€€€€€€€€€½¹ÍĞ™”€ô$¹‘…Ñ„¹ÍÕ‰…ÉÉ…ä¡(€¨¨€¼$¹‘…Ñ„¹	eQM}AI}159P°€¡(€¬€Ä¤€¨¨€¼$¹‘…Ñ„¹	eQM}AI}159P¤ì(€€€€€€€€€€€¤¹Ñ•áMÕ‰%µ…”Í¡”¹QaQUI|É}IId°€À°€À°€À°(°$¹İ¥‘Ñ °$¹¡•¥¡Ğ°€Ä°¹”°Á”°™”¤ì(€€€€€€€€€ô(€€€€€€€€€|¹±•…É1…å•ÉUÁ‘…Ñ•Ì ¤ì(€€€€€€€ô•±Í”¤¹Ñ•áMÕ‰%µ…”Í¡”¹QaQUI|É}IId°€À°€À°€À°€À°$¹İ¥‘Ñ °$¹¡•¥¡Ğ°$¹‘•ÁÑ °¹”°Á”°$¹‘…Ñ„¤ì(€€€€€ô•±Í”¤¹Ñ•á%µ…”Í¡”¹QaQUI|É}IId°€À°‰”°$¹İ¥‘Ñ °$¹¡•¥¡Ğ°$¹‘•ÁÑ °€À°¹”°Á”°$¹‘…Ñ„¤ì(€€€€€•±Í”¥˜€¡|¹¥Í…Ñ„ÍQ•áÑÕÉ”¤Q”€ü€¡U”€˜˜¤¹Ñ•áMÑ½É…”Í¡”¹QaQUI|Í°0°‰”°$¹İ¥‘Ñ °$¹¡•¥¡Ğ°$¹‘•ÁÑ ¤°Å”€˜˜¤¹Ñ•áMÕ‰%µ…”Í¡”¹QaQUI|Í°€À°€À°€À°€À°$¹İ¥‘Ñ °$¹¡•¥¡Ğ°$¹‘•ÁÑ °¹”°Á”°$¹‘…Ñ„¤¤€è¤¹Ñ•á%µ…”Í¡”¹QaQUI|Í°€À°‰”°$¹İ¥‘Ñ °$¹¡•¥¡Ğ°$¹‘•ÁÑ °€À°¹”°Á”°$¹‘…Ñ„¤ì(€€€€€•±Í”¥˜€¡|¹¥ÍÉ…µ•‰Õ™™•ÉQ•áÑÕÉ”¤ì(€€€€€€€¥˜€¡U”¤¥˜€¡Q”¤¤¹Ñ•áMÑ½É…”É¡”¹QaQUI|É°0°‰”°$¹İ¥‘Ñ °$¹¡•¥¡Ğ¤ì(€€€€€€€•±Í”ì(€€€€€€€€€±•Ğ¨€ô$¹İ¥‘Ñ °(€ô$¹¡•¥¡Ğì(€€€€€€€€€™½È€¡±•Ğ™”€ô€Àì™”€ğ0ì™”¬¬¤(€€€€€€€€€€€¤¹Ñ•á%µ…”É¡”¹QaQUI|É°™”°‰”°¨°(°€À°¹”°Á”°¹Õ±°¤°¨€øøô€Ä°(€øøô€Äì(€€€€€€€ô(€€€€€ô•±Í”¥˜€¡|¹¥Í!Q51Q•áÑÕÉ”¤ì(€€€€€€€¥˜€ ‰Ñ•á±•µ•¹Ñ%µ…”Éˆ¥¸”¤ì(€€€€€€€€€½¹ÍĞ¨€ô”¹…¹Ù…Ìì(€€€€€€€€€¥˜€¡¨¹¡…ÍÑÑÉ¥‰ÕÑ” ‰±…å½ÕÑÍÕ‰ÑÉ•”ˆ¤ñğ¨¹Í•ÑÑÑÉ¥‰ÕÑ” ‰±…å½ÕÑÍÕ‰ÑÉ•”ˆ°€‰ÑÉÕ”ˆ¤°$¹Á…É•¹Ñ9½‘”€„ôô¨¤ì(€€€€€€€€€€€¨¹…ÁÁ•¹‘¡¥±¡$¤°¹…‘¡|¤°¨¹½¹Á…¥¹Ğ€ô€¡(¤€ôøì(€€€€€€€€€€€€€½¹ÍĞ™”€ô(¹¡…¹•‘±•µ•¹ÑÌì(€€€€€€€€€€€€€™½È€¡½¹ÍĞ}”½˜¤™”¹¥¹±Õ‘•Ì¡}”¹¥µ…”¤€˜˜€¡}”¹¹••‘ÍUÁ‘…Ñ”€ô€„À¤ì(€€€€€€€€€€€ô°¨¹É•ÅÕ•ÍÑA…¥¹Ğ ¤ì(€€€€€€€€€€€É•ÑÕÉ¸ì(€€€€€€€€€ô(€€€€€€€€€¥˜€¡”¹Ñ•á±•µ•¹Ñ%µ…”É¹±•¹Ñ €ôôô€Ì¤”¹Ñ•á±•µ•¹Ñ%µ…”É¡”¹QaQUI|É°”¹I	à°$¤ì(€€€€€€€€€•±Í”ì(€€€€€€€€€€€½¹ÍĞ™”€ô”¹I	°}”€ô”¹I	°h€ô”¹U9M%9}	eQì(€€€€€€€€€€€”¹Ñ•á±•µ•¹Ñ%µ…”É¡”¹QaQUI|É°€À°™”°}”°h°$¤ì(€€€€€€€€€ô(€€€€€€€€€”¹Ñ•áA…É…µ•Ñ•É¤¡”¹QaQUI|É°”¹QaQUI}5%9}%1QH°”¹1%9H¤°”¹Ñ•áA…É…µ•Ñ•É¤¡”¹QaQUI|É°”¹QaQUI}]IA}L°”¹15A}Q=}¤°”¹Ñ•áA…É…µ•Ñ•É¤¡”¹QaQUI|É°”¹QaQUI}]IA}P°”¹15A}Q=}¤ì(€€€€€€€ô(€€€€€ô•±Í”¥˜€¡á”¹±•¹Ñ €ø€À¤ì(€€€€€€€¥˜€¡Q”€˜˜U”¤ì(€€€€€€€€€½¹ÍĞ¨€ôÍĞ¡á•lÁt¤ì(€€€€€€€€€¤¹Ñ•áMÑ½É…”É¡”¹QaQUI|É°0°‰”°¨¹İ¥‘Ñ °¨¹¡•¥¡Ğ¤ì(€€€€€€€ô(€€€€€€€™½È€¡±•Ğ¨€ô€À°(€ôá”¹±•¹Ñ ì¨€ğ(ì¨¬¬¤(€€€€€€€€€•”€ôá•m©t°Q”€üÅ”€˜˜¤¹Ñ•áMÕ‰%µ…”É¡”¹QaQUI|É°¨°€À°€À°¹”°Á”°•”¤€è¤¹Ñ•á%µ…”É¡”¹QaQUI|É°¨°‰”°¹”°Á”°•”¤ì(€€€€€€€|¹•¹•É…Ñ•5¥Áµ…ÁÌ€ô€„Äì(€€€€€ô•±Í”¥˜€¡Q”¤ì(€€€€€€€¥˜€¡U”¤ì(€€€€€€€€€½¹ÍĞ¨€ôÍĞ¡$¤ì(€€€€€€€€€¤¹Ñ•áMÑ½É…”É¡”¹QaQUI|É°0°‰”°¨¹İ¥‘Ñ °¨¹¡•¥¡Ğ¤ì(€€€€€€€ô(€€€€€€€Å”€˜˜¤¹Ñ•áMÕ‰%µ…”É¡”¹QaQUI|É°€À°€À°€À°¹”°Á”°$¤ì(€€€€€ô•±Í”¤¹Ñ•á%µ…”É¡”¹QaQUI|É°€À°‰”°¹”°Á”°$¤ì(€€€€€˜¡|¤€˜˜P¡\¤°…”¹}}Ù•ÉÍ¥½¸€ôÉ”¹Ù•ÉÍ¥½¸°|¹½¹UÁ‘…Ñ”€˜˜|¹½¹UÁ‘…Ñ”¡|¤ì(€€€ô(€€€L¹}}Ù•ÉÍ¥½¸€ô|¹Ù•ÉÍ¥½¸ì(€ô(€™Õ¹Ñ¥½¸”¡L°|°@¤ì(€€€¥˜€¡|¹¥µ…”¹±•¹Ñ €„ôô€Ø¤É•ÑÕÉ¸ì(€€€½¹ÍĞ\€ôD¡L°|¤°d€ô|¹Í½ÕÉ”ì(€€€¤¹‰¥¹‘Q•áÑÕÉ”¡”¹QaQUI}U	}5@°L¹}}İ•‰±Q•áÑÕÉ”°”¹QaQUIÀ€¬@¤ì(€€€½¹ÍĞÉ”€ô¸¹•Ğ¡d¤ì(€€€¥˜€¡d¹Ù•ÉÍ¥½¸€„ôôÉ”¹}}Ù•ÉÍ¥½¸ñğ\€ôôô€„À¤ì(€€€€€¤¹…Ñ¥Ù•Q•áÑÕÉ”¡”¹QaQUIÀ€¬@¤ì(€€€€€½¹ÍĞ…”€ô!”¹•ÑAÉ¥µ…É¥•Ì¡!”¹İ½É­¥¹½±½ÉMÁ…”¤°$€ô|¹½±½ÉMÁ…”€ôôô€ˆˆ€ü¹Õ±°€è!”¹•ÑAÉ¥µ…É¥•Ì¡|¹½±½ÉMÁ…”¤°¹”€ô|¹½±½ÉMÁ…”€ôôô€ˆˆñğ…”€ôôô$€ü”¹9=9€è”¹	I=]MI}U1Q}]	0ì(€€€€€¤¹Á¥á•±MÑ½É•¤¡”¹U9A-}1%A}e}]	0°|¹™±¥Ád¤°¤¹Á¥á•±MÑ½É•¤¡”¹U9A-}AI5U1Q%A1e}1A!}]	0°|¹ÁÉ•µÕ±Ñ¥Á±å±Á¡„¤°¤¹Á¥á•±MÑ½É•¤¡”¹U9A-}1%959P°|¹Õ¹Á…­±¥¹µ•¹Ğ¤°¤¹Á¥á•±MÑ½É•¤¡”¹U9A-}=1=IMA}=9YIM%=9}]	0°¹”¤ì(€€€€€½¹ÍĞÁ”€ô|¹¥Í½µÁÉ•ÍÍ•‘Q•áÑÕÉ”ñğ|¹¥µ…•lÁt¹¥Í½µÁÉ•ÍÍ•‘Q•áÑÕÉ”°‰”€ô|¹¥µ…•lÁt€˜˜|¹¥µ…•lÁt¹¥Í…Ñ…Q•áÑÕÉ”°•”€ômtì(€€€€€™½È€¡±•Ğh€ô€Àìh€ğ€Øìh¬¬¤(€€€€€€€€…Á”€˜˜€…‰”€ü••mit€ô´¡|¹¥µ…•mit°€„À°È¹µ…áÕ‰•µ…ÁM¥é”¤€è••mit€ô‰”€ü|¹¥µ…•mit¹¥µ…”€è|¹¥µ…•mit°••mit€ôe”¡|°••mit¤ì(€€€€€½¹ÍĞá”€ô••lÁt°Q”€ôÌ¹½¹Ù•ÉĞ¡|¹™½Éµ…Ğ°|¹½±½ÉMÁ…”¤°U”€ôÌ¹½¹Ù•ÉĞ¡|¹ÑåÁ”¤°Å”€ô4¡|¹¥¹Ñ•É¹…±½Éµ…Ğ°Q”°U”°|¹¹½Éµ…±¥é•°|¹½±½ÉMÁ…”¤°0€ô|¹¥ÍY¥‘•½Q•áÑÕÉ”€„ôô€„À°¨€ôÉ”¹}}Ù•ÉÍ¥½¸€ôôôÙ½¥€Àñğ\€ôôô€„À°(€ôd¹‘…Ñ…I•…‘äì(€€€€€±•Ğ™”€ôH¡|°á”¤ì(€€€€€ ¡”¹QaQUI}U	}5@°|¤ì(€€€€€±•Ğ}”ì(€€€€€¥˜€¡Á”¤ì(€€€€€€€0€˜˜¨€˜˜¤¹Ñ•áMÑ½É…”É¡”¹QaQUI}U	}5@°™”°Å”°á”¹İ¥‘Ñ °á”¹¡•¥¡Ğ¤ì(€€€€€€€™½È€¡±•Ğh€ô€Àìh€ğ€Øìh¬¬¤ì(€€€€€€€€€}”€ô••mit¹µ¥Áµ…ÁÌì(€€€€€€€€€™½È€¡±•Ğ”€ô€Àì”€ğ}”¹±•¹Ñ ì”¬¬¤ì(€€€€€€€€€€€½¹ÍĞİ”€ô}•m•tì(€€€€€€€€€€€|¹™½Éµ…Ğ€„ôô€ÄÀÈÌ€üQ”€„ôô¹Õ±°€ü0€ü(€˜˜¤¹½µÁÉ•ÍÍ•‘Q•áMÕ‰%µ…”É¡”¹QaQUI}U	}5A}A=M%Q%Y}`€¬h°”°€À°€À°İ”¹İ¥‘Ñ °İ”¹¡•¥¡Ğ°Q”°İ”¹‘…Ñ„¤€è¤¹½µÁÉ•ÍÍ•‘Q•á%µ…”É¡”¹QaQUI}U	}5A}A=M%Q%Y}`€¬h°”°Å”°İ”¹İ¥‘Ñ °İ”¹¡•¥¡Ğ°€À°İ”¹‘…Ñ„¤€èM” ‰]•‰1I•¹‘•É•ÈèÑÑ•µÁĞÑ¼±½…Õ¹ÍÕÁÁ½ÉÑ•½µÁÉ•ÍÍ•Ñ•áÑÕÉ”™½Éµ…Ğ¥¸€¹Í•ÑQ•áÑÕÉ•Õ‰” ¤ˆ¤€è0€ü(€˜˜¤¹Ñ•áMÕ‰%µ…”É¡”¹QaQUI}U	}5A}A=M%Q%Y}`€¬h°”°€À°€À°İ”¹İ¥‘Ñ °İ”¹¡•¥¡Ğ°Q”°U”°İ”¹‘…Ñ„¤€è¤¹Ñ•á%µ…”É¡”¹QaQUI}U	}5A}A=M%Q%Y}`€¬h°”°Å”°İ”¹İ¥‘Ñ °İ”¹¡•¥¡Ğ°€À°Q”°U”°İ”¹‘…Ñ„¤ì(€€€€€€€€€ô(€€€€€€€ô(€€€€€ô•±Í”ì(€€€€€€€¥˜€¡}”€ô|¹µ¥Áµ…ÁÌ°0€˜˜¨¤ì(€€€€€€€€€}”¹±•¹Ñ €ø€À€˜˜™”¬¬ì(€€€€€€€€€½¹ÍĞh€ôÍĞ¡••lÁt¤ì(€€€€€€€€€¤¹Ñ•áMÑ½É…”É¡”¹QaQUI}U	}5@°™”°Å”°h¹İ¥‘Ñ °h¹¡•¥¡Ğ¤ì(€€€€€€€ô(€€€€€€€™½È€¡±•Ğh€ô€Àìh€ğ€Øìh¬¬¤¥˜€¡‰”¤ì(€€€€€€€€€0€ü(€˜˜¤¹Ñ•áMÕ‰%µ…”É¡”¹QaQUI}U	}5A}A=M%Q%Y}`€¬h°€À°€À°€À°••mit¹İ¥‘Ñ °••mit¹¡•¥¡Ğ°Q”°U”°••mit¹‘…Ñ„¤€è¤¹Ñ•á%µ…”É¡”¹QaQUI}U	}5A}A=M%Q%Y}`€¬h°€À°Å”°••mit¹İ¥‘Ñ °••mit¹¡•¥¡Ğ°€À°Q”°U”°••mit¹‘…Ñ„¤ì(€€€€€€€€€™½È€¡±•Ğ”€ô€Àì”€ğ}”¹±•¹Ñ ì”¬¬¤ì(€€€€€€€€€€€½¹ÍĞİ”€ô}•m•t¹¥µ…•mit¹¥µ…”ì(€€€€€€€€€€€0€ü(€˜˜¤¹Ñ•áMÕ‰%µ…”É¡”¹QaQUI}U	}5A}A=M%Q%Y}`€¬h°”€¬€Ä°€À°€À°İ”¹İ¥‘Ñ °İ”¹¡•¥¡Ğ°Q”°U”°İ”¹‘…Ñ„¤€è¤¹Ñ•á%µ…”É¡”¹QaQUI}U	}5A}A=M%Q%Y}`€¬h°”€¬€Ä°Å”°İ”¹İ¥‘Ñ °İ”¹¡•¥¡Ğ°€À°Q”°U”°İ”¹‘…Ñ„¤ì(€€€€€€€€€ô(€€€€€€€ô•±Í”ì(€€€€€€€€€0€ü(€˜˜¤¹Ñ•áMÕ‰%µ…”É¡”¹QaQUI}U	}5A}A=M%Q%Y}`€¬h°€À°€À°€À°Q”°U”°••mit¤€è¤¹Ñ•á%µ…”É¡”¹QaQUI}U	}5A}A=M%Q%Y}`€¬h°€À°Å”°Q”°U”°••mit¤ì(€€€€€€€€€™½È€¡±•Ğ”€ô€Àì”€ğ}”¹±•¹Ñ ì”¬¬¤ì(€€€€€€€€€€€½¹ÍĞİ”€ô}•m•tì(€€€€€€€€€€€0€ü(€˜˜¤¹Ñ•áMÕ‰%µ…”É¡”¹QaQUI}U	}5A}A=M%Q%Y}`€¬h°”€¬€Ä°€À°€À°Q”°U”°İ”¹¥µ…•mit¤€è¤¹Ñ•á%µ…”É¡”¹QaQUI}U	}5A}A=M%Q%Y}`€¬h°”€¬€Ä°Å”°Q”°U”°İ”¹¥µ…•mit¤ì(€€€€€€€€€ô(€€€€€€€ô(€€€€€ô(€€€€€˜¡|¤€˜˜P¡”¹QaQUI}U	}5@¤°É”¹}}Ù•ÉÍ¥½¸€ôd¹Ù•ÉÍ¥½¸°|¹½¹UÁ‘…Ñ”€˜˜|¹½¹UÁ‘…Ñ”¡|¤ì(€€€ô(€€€L¹}}Ù•ÉÍ¥½¸€ô|¹Ù•ÉÍ¥½¸ì(€ô(€™Õ¹Ñ¥½¸%”¡L°|°@°\°d°É”¤ì(€€€½¹ÍĞ…”€ôÌ¹½¹Ù•ÉĞ¡@¹™½Éµ…Ğ°@¹½±½ÉMÁ…”¤°$€ôÌ¹½¹Ù•ÉĞ¡@¹ÑåÁ”¤°¹”€ô4¡@¹¥¹Ñ•É¹…±½Éµ…Ğ°…”°$°@¹¹½Éµ…±¥é•°@¹½±½ÉMÁ…”¤°Á”€ô¸¹•Ğ¡|¤°‰”€ô¸¹•Ğ¡@¤ì(€€€¥˜€¡‰”¹}}É•¹‘•ÉQ…É•Ğ€ô|°€…Á”¹}}¡…ÍáÑ•É¹…±Q•áÑÕÉ•Ì¤ì(€€€€€½¹ÍĞ•”€ô5…Ñ ¹µ…à Ä°|¹İ¥‘Ñ €øøÉ”¤°á”€ô5…Ñ ¹µ…à Ä°|¹¡•¥¡Ğ€øøÉ”¤ì(€€€€€d€ôôô”¹QaQUI|Íñğd€ôôô”¹QaQUI|É}IId€ü¤¹Ñ•á%µ…”Í¡d°É”°¹”°•”°á”°|¹‘•ÁÑ °€À°…”°$°¹Õ±°¤€è¤¹Ñ•á%µ…”É¡d°É”°¹”°•”°á”°€À°…”°$°¹Õ±°¤ì(€€€ô(€€€¤¹‰¥¹‘É…µ•‰Õ™™•È¡”¹I5	UH°L¤°¡|¤€ü¼¹™É…µ•‰Õ™™•ÉQ•áÑÕÉ”É5Õ±Ñ¥Í…µÁ±•aP¡”¹I5	UH°\°d°‰”¹}}İ•‰±Q•áÑÕÉ”°€À°™Ğ¡|¤¤€è€¡d€ôôô”¹QaQUI|Éñğd€øô”¹QaQUI}U	}5A}A=M%Q%Y}`€˜˜d€ğô”¹QaQUI}U	}5A}9Q%Y}h¤€˜˜”¹™É…µ•‰Õ™™•ÉQ•áÑÕÉ”É¡”¹I5	UH°\°d°‰”¹}}İ•‰±Q•áÑÕÉ”°É”¤°¤¹‰¥¹‘É…µ•‰Õ™™•È¡”¹I5	UH°¹Õ±°¤ì(€ô(€™Õ¹Ñ¥½¸©”¡L°|°@¤ì(€€€¥˜€¡”¹‰¥¹‘I•¹‘•É‰Õ™™•È¡”¹I9I	UH°L¤°|¹‘•ÁÑ¡	Õ™™•È¤ì(€€€€€½¹ÍĞ\€ô|¹‘•ÁÑ¡Q•áÑÕÉ”°d€ô\€˜˜\¹¥Í•ÁÑ¡Q•áÑÕÉ”€ü\¹ÑåÁ”€è¹Õ±°°É”€ô¡|¹ÍÑ•¹¥±	Õ™™•È°d¤°…”€ô|¹ÍÑ•¹¥±	Õ™™•È€ü”¹AQ!}MQ9%1}QQ!59P€è”¹AQ!}QQ!59Pì(€€€€€¡|¤€ü¼¹É•¹‘•É‰Õ™™•ÉMÑ½É…•5Õ±Ñ¥Í…µÁ±•aP¡”¹I9I	UH°™Ğ¡|¤°É”°|¹İ¥‘Ñ °|¹¡•¥¡Ğ¤€è@€ü”¹É•¹‘•É‰Õ™™•ÉMÑ½É…•5Õ±Ñ¥Í…µÁ±”¡”¹I9I	UH°™Ğ¡|¤°É”°|¹İ¥‘Ñ °|¹¡•¥¡Ğ¤€è”¹É•¹‘•É‰Õ™™•ÉMÑ½É…”¡”¹I9I	UH°É”°|¹İ¥‘Ñ °|¹¡•¥¡Ğ¤°”¹™É…µ•‰Õ™™•ÉI•¹‘•É‰Õ™™•È¡”¹I5	UH°…”°”¹I9I	UH°L¤ì(€€€ô•±Í”ì(€€€€€½¹ÍĞ\€ô|¹Ñ•áÑÕÉ•Ìì(€€€€€™½È€¡±•Ğd€ô€Àìd€ğ\¹±•¹Ñ ìd¬¬¤ì(€€€€€€€½¹ÍĞÉ”€ô]met°…”€ôÌ¹½¹Ù•ÉĞ¡É”¹™½Éµ…Ğ°É”¹½±½ÉMÁ…”¤°$€ôÌ¹½¹Ù•ÉĞ¡É”¹ÑåÁ”¤°¹”€ô4¡É”¹¥¹Ñ•É¹…±½Éµ…Ğ°…”°$°É”¹¹½Éµ…±¥é•°É”¹½±½ÉMÁ…”¤ì(€€€€€€€¡|¤€ü¼¹É•¹‘•É‰Õ™™•ÉMÑ½É…•5Õ±Ñ¥Í…µÁ±•aP¡”¹I9I	UH°™Ğ¡|¤°¹”°|¹İ¥‘Ñ °|¹¡•¥¡Ğ¤€è@€ü”¹É•¹‘•É‰Õ™™•ÉMÑ½É…•5Õ±Ñ¥Í…µÁ±”¡”¹I9I	UH°™Ğ¡|¤°¹”°|¹İ¥‘Ñ °|¹¡•¥¡Ğ¤€è”¹É•¹‘•É‰Õ™™•ÉMÑ½É…”¡”¹I9I	UH°¹”°|¹İ¥‘Ñ °|¹¡•¥¡Ğ¤ì(€€€€€ô(€€€ô(€€€”¹‰¥¹‘I•¹‘•É‰Õ™™•È¡”¹I9I	UH°¹Õ±°¤ì(€ô(€™Õ¹Ñ¥½¸]”¡L°|°@¤ì(€€€½¹ÍĞ\€ô|¹¥Í]•‰1Õ‰•I•¹‘•ÉQ…É•Ğ€ôôô€„Àì(€€€¥˜€¡¤¹‰¥¹‘É…µ•‰Õ™™•È¡”¹I5	UH°L¤°€„¡|¹‘•ÁÑ¡Q•áÑÕÉ”€˜˜|¹‘•ÁÑ¡Q•áÑÕÉ”¹¥Í•ÁÑ¡Q•áÑÕÉ”¤¤Ñ¡É½Ü¹•ÜÉÉ½È ‰Q!I¹]•‰1Q•áÑÕÉ•ÌèÉ•¹‘•ÉQ…É•Ğ¹‘•ÁÑ¡Q•áÑÕÉ”µÕÍĞ‰”…¸¥¹ÍÑ…¹”½˜Q!I¹•ÁÑ¡Q•áÑÕÉ”¸ˆ¤ì(€€€½¹ÍĞd€ô¸¹•Ğ¡|¹‘•ÁÑ¡Q•áÑÕÉ”¤ì(€€€¥˜€¡d¹}}É•¹‘•ÉQ…É•Ğ€ô|°€ …d¹}}İ•‰±Q•áÑÕÉ”ñğ|¹‘•ÁÑ¡Q•áÑÕÉ”¹¥µ…”¹İ¥‘Ñ €„ôô|¹İ¥‘Ñ ñğ|¹‘•ÁÑ¡Q•áÑÕÉ”¹¥µ…”¹¡•¥¡Ğ€„ôô|¹¡•¥¡Ğ¤€˜˜€¡|¹‘•ÁÑ¡Q•áÑÕÉ”¹¥µ…”¹İ¥‘Ñ €ô|¹İ¥‘Ñ °|¹‘•ÁÑ¡Q•áÑÕÉ”¹¥µ…”¹¡•¥¡Ğ€ô|¹¡•¥¡Ğ°|¹‘•ÁÑ¡Q•áÑÕÉ”¹¹••‘ÍUÁ‘…Ñ”€ô€„À¤°\¤ì(€€€€€¥˜€¡d¹}}İ•‰±%¹¥Ğ€ôôôÙ½¥€À€˜˜€¡d¹}}İ•‰±%¹¥Ğ€ô€„À°|¹‘•ÁÑ¡Q•áÑÕÉ”¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰‘¥ÍÁ½Í”ˆ°¤¤°d¹}}İ•‰±Q•áÑÕÉ”€ôôôÙ½¥€À¤ì(€€€€€€€d¹}}İ•‰±Q•áÑÕÉ”€ô”¹É•…Ñ•Q•áÑÕÉ” ¤°¤¹‰¥¹‘Q•áÑÕÉ”¡”¹QaQUI}U	}5@°d¹}}İ•‰±Q•áÑÕÉ”¤° ¡”¹QaQUI}U	}5@°|¹‘•ÁÑ¡Q•áÑÕÉ”¤ì(€€€€€€€½¹ÍĞÁ”€ôÌ¹½¹Ù•ÉĞ¡|¹‘•ÁÑ¡Q•áÑÕÉ”¹™½Éµ…Ğ¤°‰”€ôÌ¹½¹Ù•ÉĞ¡|¹‘•ÁÑ¡Q•áÑÕÉ”¹ÑåÁ”¤ì(€€€€€€€±•Ğ•”ì(€€€€€€€|¹‘•ÁÑ¡Q•áÑÕÉ”¹™½Éµ…Ğ€ôôô€ÄÀÈØ€ü•”€ô”¹AQ!}=5A=99PÈĞ€è|¹‘•ÁÑ¡Q•áÑÕÉ”¹™½Éµ…Ğ€ôôô€ÄÀÈÜ€˜˜€¡•”€ô”¹AQ ÈÑ}MQ9%0à¤ì(€€€€€€€™½È€¡±•Ğá”€ô€Àìá”€ğ€Øìá”¬¬¤”¹Ñ•á%µ…”É¡”¹QaQUI}U	}5A}A=M%Q%Y}`€¬á”°€À°•”°|¹İ¥‘Ñ °|¹¡•¥¡Ğ°€À°Á”°‰”°¹Õ±°¤ì(€€€€€ô(€€€ô•±Í”Ñ”¡|¹‘•ÁÑ¡Q•áÑÕÉ”°€À¤ì(€€€½¹ÍĞÉ”€ôd¹}}İ•‰±Q•áÑÕÉ”°…”€ô™Ğ¡|¤°$€ô\€ü”¹QaQUI}U	}5A}A=M%Q%Y}`€¬@€è”¹QaQUI|É°¹”€ô|¹‘•ÁÑ¡Q•áÑÕÉ”¹™½Éµ…Ğ€ôôô€ÄÀÈÜ€ü”¹AQ!}MQ9%1}QQ!59P€è”¹AQ!}QQ!59Pì(€€€¥˜€¡|¹‘•ÁÑ¡Q•áÑÕÉ”¹™½Éµ…Ğ€ôôô€ÄÀÈØ¤¡|¤€ü¼¹™É…µ•‰Õ™™•ÉQ•áÑÕÉ”É5Õ±Ñ¥Í…µÁ±•aP¡”¹I5	UH°¹”°$°É”°€À°…”¤€è”¹™É…µ•‰Õ™™•ÉQ•áÑÕÉ”É¡”¹I5	UH°¹”°$°É”°€À¤ì(€€€•±Í”¥˜€¡|¹‘•ÁÑ¡Q•áÑÕÉ”¹™½Éµ…Ğ€ôôô€ÄÀÈÜ¤¡|¤€ü¼¹™É…µ•‰Õ™™•ÉQ•áÑÕÉ”É5Õ±Ñ¥Í…µÁ±•aP¡”¹I5	UH°¹”°$°É”°€À°…”¤€è”¹™É…µ•‰Õ™™•ÉQ•áÑÕÉ”É¡”¹I5	UH°¹”°$°É”°€À¤ì(€€€•±Í”Ñ¡É½Ü¹•ÜÉÉ½È ‰Q!I¹]•‰1Q•áÑÕÉ•ÌèU¹­¹½İ¸‘•ÁÑ¡Q•áÑÕÉ”™½Éµ…Ğ¸ˆ¤ì(€ô(€™Õ¹Ñ¥½¸¹Ğ¡L¤ì(€€€½¹ÍĞ|€ô¸¹•Ğ¡L¤°@€ôL¹¥Í]•‰1Õ‰•I•¹‘•ÉQ…É•Ğ€ôôô€„Àì(€€€¥˜€¡|¹}}‰½Õ¹‘•ÁÑ¡Q•áÑÕÉ”€„ôôL¹‘•ÁÑ¡Q•áÑÕÉ”¤ì(€€€€€½¹ÍĞ\€ôL¹‘•ÁÑ¡Q•áÑÕÉ”ì(€€€€€¥˜€¡|¹}}‘•ÁÑ¡¥ÍÁ½Í•…±±‰…¬€˜˜|¹}}‘•ÁÑ¡¥ÍÁ½Í•…±±‰…¬ ¤°\¤ì(€€€€€€€½¹ÍĞd€ô€ ¤€ôøì(€€€€€€€€€‘•±•Ñ”|¹}}‰½Õ¹‘•ÁÑ¡Q•áÑÕÉ”°‘•±•Ñ”|¹}}‘•ÁÑ¡¥ÍÁ½Í•…±±‰…¬°\¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰‘¥ÍÁ½Í”ˆ°d¤ì(€€€€€€€ôì(€€€€€€€\¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰‘¥ÍÁ½Í”ˆ°d¤°|¹}}‘•ÁÑ¡¥ÍÁ½Í•…±±‰…¬€ôdì(€€€€€ô(€€€€€|¹}}‰½Õ¹‘•ÁÑ¡Q•áÑÕÉ”€ô\ì(€€€ô(€€€¥˜€¡L¹‘•ÁÑ¡Q•áÑÕÉ”€˜˜€…|¹}}…ÕÑ½±±½…Ñ••ÁÑ¡	Õ™™•È¤¥˜€¡@¤™½È€¡±•Ğ\€ô€Àì\€ğ€Øì\¬¬¤]”¡|¹}}İ•‰±É…µ•‰Õ™™•Ém]t°L°\¤ì(€€€•±Í”ì(€€€€€½¹ÍĞ\€ôL¹Ñ•áÑÕÉ”¹µ¥Áµ…ÁÌì(€€€€€\€˜˜\¹±•¹Ñ €ø€À€ü]”¡|¹}}İ•‰±É…µ•‰Õ™™•ÉlÁt°L°€À¤€è]”¡|¹}}İ•‰±É…µ•‰Õ™™•È°L°€À¤ì(€€€ô(€€€•±Í”¥˜€¡@¤ì(€€€€€|¹}}İ•‰±•ÁÑ¡‰Õ™™•È€ômtì(€€€€€™½È€¡±•Ğ\€ô€Àì\€ğ€Øì\¬¬¤(€€€€€€€¥˜€¡¤¹‰¥¹‘É…µ•‰Õ™™•È¡”¹I5	UH°|¹}}İ•‰±É…µ•‰Õ™™•Ém]t¤°|¹}}İ•‰±•ÁÑ¡‰Õ™™•Ém]t€ôôôÙ½¥€À¤(€€€€€€€€€|¹}}İ•‰±•ÁÑ¡‰Õ™™•Ém]t€ô”¹É•…Ñ•I•¹‘•É‰Õ™™•È ¤°©”¡|¹}}İ•‰±•ÁÑ¡‰Õ™™•Ém]t°L°€„Ä¤ì(€€€€€€€•±Í”ì(€€€€€€€€€½¹ÍĞd€ôL¹ÍÑ•¹¥±	Õ™™•È€ü”¹AQ!}MQ9%1}QQ!59P€è”¹AQ!}QQ!59P°É”€ô|¹}}İ•‰±•ÁÑ¡‰Õ™™•Ém]tì(€€€€€€€€€”¹‰¥¹‘I•¹‘•É‰Õ™™•È¡”¹I9I	UH°É”¤°”¹™É…µ•‰Õ™™•ÉI•¹‘•É‰Õ™™•È¡”¹I5	UH°d°”¹I9I	UH°É”¤ì(€€€€€€€ô(€€€ô•±Í”ì(€€€€€½¹ÍĞ\€ôL¹Ñ•áÑÕÉ”¹µ¥Áµ…ÁÌì(€€€€€¥˜€¡\€˜˜\¹±•¹Ñ €ø€À€ü¤¹‰¥¹‘É…µ•‰Õ™™•È¡”¹I5	UH°|¹}}İ•‰±É…µ•‰Õ™™•ÉlÁt¤€è¤¹‰¥¹‘É…µ•‰Õ™™•È¡”¹I5	UH°|¹}}İ•‰±É…µ•‰Õ™™•È¤°|¹}}İ•‰±•ÁÑ¡‰Õ™™•È€ôôôÙ½¥€À¤(€€€€€€€|¹}}İ•‰±•ÁÑ¡‰Õ™™•È€ô”¹É•…Ñ•I•¹‘•É‰Õ™™•È ¤°©”¡|¹}}İ•‰±•ÁÑ¡‰Õ™™•È°L°€„Ä¤ì(€€€€€•±Í”ì(€€€€€€€½¹ÍĞd€ôL¹ÍÑ•¹¥±	Õ™™•È€ü”¹AQ!}MQ9%1}QQ!59P€è”¹AQ!}QQ!59P°É”€ô|¹}}İ•‰±•ÁÑ¡‰Õ™™•Èì(€€€€€€€”¹‰¥¹‘I•¹‘•É‰Õ™™•È¡”¹I9I	UH°É”¤°”¹™É…µ•‰Õ™™•ÉI•¹‘•É‰Õ™™•È¡”¹I5	UH°d°”¹I9I	UH°É”¤ì(€€€€€ô(€€€ô(€€€¤¹‰¥¹‘É…µ•‰Õ™™•È¡”¹I5	UH°¹Õ±°¤ì(€ô(€™Õ¹Ñ¥½¸‰Ğ¡L°|°@¤ì(€€€½¹ÍĞ\€ô¸¹•Ğ¡L¤ì(€€€|€„ôôÙ½¥€À€˜˜%”¡\¹}}İ•‰±É…µ•‰Õ™™•È°L°L¹Ñ•áÑÕÉ”°”¹=1=I}QQ!59PÀ°”¹QaQUI|É°€À¤°@€„ôôÙ½¥€À€˜˜¹Ğ¡L¤ì(€ô(€™Õ¹Ñ¥½¸1Ğ¡L¤ì(€€€½¹ÍĞ|€ôL¹Ñ•áÑÕÉ”°@€ô¸¹•Ğ¡L¤°\€ô¸¹•Ğ¡|¤ì(€€€L¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰‘¥ÍÁ½Í”ˆ°œ¤ì(€€€½¹ÍĞd€ôL¹Ñ•áÑÕÉ•Ì°É”€ôL¹¥Í]•‰1Õ‰•I•¹‘•ÉQ…É•Ğ€ôôô€„À°…”€ôd¹±•¹Ñ €ø€Äì(€€€¥˜€¡…”ñğ€¡\¹}}İ•‰±Q•áÑÕÉ”€ôôôÙ½¥€À€˜˜€¡\¹}}İ•‰±Q•áÑÕÉ”€ô”¹É•…Ñ•Q•áÑÕÉ” ¤¤°\¹}}Ù•ÉÍ¥½¸€ô|¹Ù•ÉÍ¥½¸°„¹µ•µ½Éä¹Ñ•áÑÕÉ•Ì¬¬¤°É”¤ì(€€€€€@¹}}İ•‰±É…µ•‰Õ™™•È€ômtì(€€€€€™½È€¡±•Ğ$€ô€Àì$€ğ€Øì$¬¬¤¥˜€¡|¹µ¥Áµ…ÁÌ€˜˜|¹µ¥Áµ…ÁÌ¹±•¹Ñ €ø€À¤ì(€€€€€€€@¹}}İ•‰±É…µ•‰Õ™™•Ém%t€ômtì(€€€€€€€™½È€¡±•Ğ¹”€ô€Àì¹”€ğ|¹µ¥Áµ…ÁÌ¹±•¹Ñ ì¹”¬¬¤@¹}}İ•‰±É…µ•‰Õ™™•Ém%um¹•t€ô”¹É•…Ñ•É…µ•‰Õ™™•È ¤ì(€€€€€ô•±Í”@¹}}İ•‰±É…µ•‰Õ™™•Ém%t€ô”¹É•…Ñ•É…µ•‰Õ™™•È ¤ì(€€€ô•±Í”ì(€€€€€¥˜€¡|¹µ¥Áµ…ÁÌ€˜˜|¹µ¥Áµ…ÁÌ¹±•¹Ñ €ø€À¤ì(€€€€€€€@¹}}İ•‰±É…µ•‰Õ™™•È€ômtì(€€€€€€€™½È€¡±•Ğ$€ô€Àì$€ğ|¹µ¥Áµ…ÁÌ¹±•¹Ñ ì$¬¬¤@¹}}İ•‰±É…µ•‰Õ™™•Ém%t€ô”¹É•…Ñ•É…µ•‰Õ™™•È ¤ì(€€€€€ô•±Í”@¹}}İ•‰±É…µ•‰Õ™™•È€ô”¹É•…Ñ•É…µ•‰Õ™™•È ¤ì(€€€€€¥˜€¡…”¤™½È€¡±•Ğ$€ô€À°¹”€ôd¹±•¹Ñ ì$€ğ¹”ì$¬¬¤ì(€€€€€€€½¹ÍĞÁ”€ô¸¹•Ğ¡em%t¤ì(€€€€€€€Á”¹}}İ•‰±Q•áÑÕÉ”€ôôôÙ½¥€À€˜˜€¡Á”¹}}İ•‰±Q•áÑÕÉ”€ô”¹É•…Ñ•Q•áÑÕÉ” ¤°„¹µ•µ½Éä¹Ñ•áÑÕÉ•Ì¬¬¤ì(€€€€€ô(€€€€€¥˜€¡L¹Í…µÁ±•Ì€ø€À€˜˜¡L¤€ôôô€„Ä¤ì(€€€€€€€@¹}}İ•‰±5Õ±Ñ¥Í…µÁ±•‘É…µ•‰Õ™™•È€ô”¹É•…Ñ•É…µ•‰Õ™™•È ¤°@¹}}İ•‰±½±½ÉI•¹‘•É‰Õ™™•È€ômt°¤¹‰¥¹‘É…µ•‰Õ™™•È¡”¹I5	UH°@¹}}İ•‰±5Õ±Ñ¥Í…µÁ±•‘É…µ•‰Õ™™•È¤ì(€€€€€€€™½È€¡±•Ğ$€ô€Àì$€ğd¹±•¹Ñ ì$¬¬¤ì(€€€€€€€€€½¹ÍĞ¹”€ôem%tì(€€€€€€€€€@¹}}İ•‰±½±½ÉI•¹‘•É‰Õ™™•Ém%t€ô”¹É•…Ñ•I•¹‘•É‰Õ™™•È ¤°”¹‰¥¹‘I•¹‘•É‰Õ™™•È¡”¹I9I	UH°@¹}}İ•‰±½±½ÉI•¹‘•É‰Õ™™•Ém%t¤ì(€€€€€€€€€½¹ÍĞÁ”€ôÌ¹½¹Ù•ÉĞ¡¹”¹™½Éµ…Ğ°¹”¹½±½ÉMÁ…”¤°‰”€ôÌ¹½¹Ù•ÉĞ¡¹”¹ÑåÁ”¤°•”€ô4¡¹”¹¥¹Ñ•É¹…±½Éµ…Ğ°Á”°‰”°¹”¹¹½Éµ…±¥é•°¹”¹½±½ÉMÁ…”°L¹¥ÍaII•¹‘•ÉQ…É•Ğ€ôôô€„À¤°á”€ô™Ğ¡L¤ì(€€€€€€€€€”¹É•¹‘•É‰Õ™™•ÉMÑ½É…•5Õ±Ñ¥Í…µÁ±”¡”¹I9I	UH°á”°•”°L¹İ¥‘Ñ °L¹¡•¥¡Ğ¤°”¹™É…µ•‰Õ™™•ÉI•¹‘•É‰Õ™™•È¡”¹I5	UH°”¹=1=I}QQ!59PÀ€¬$°”¹I9I	UH°@¹}}İ•‰±½±½ÉI•¹‘•É‰Õ™™•Ém%t¤ì(€€€€€€€ô(€€€€€€€”¹‰¥¹‘I•¹‘•É‰Õ™™•È¡”¹I9I	UH°¹Õ±°¤°L¹‘•ÁÑ¡	Õ™™•È€˜˜€¡@¹}}İ•‰±•ÁÑ¡I•¹‘•É‰Õ™™•È€ô”¹É•…Ñ•I•¹‘•É‰Õ™™•È ¤°©”¡@¹}}İ•‰±•ÁÑ¡I•¹‘•É‰Õ™™•È°L°€„À¤¤°¤¹‰¥¹‘É…µ•‰Õ™™•È¡”¹I5	UH°¹Õ±°¤ì(€€€€€ô(€€€ô(€€€¥˜€¡É”¤ì(€€€€€¤¹‰¥¹‘Q•áÑÕÉ”¡”¹QaQUI}U	}5@°\¹}}İ•‰±Q•áÑÕÉ”¤° ¡”¹QaQUI}U	}5@°|¤ì(€€€€€™½È€¡±•Ğ$€ô€Àì$€ğ€Øì$¬¬¤¥˜€¡|¹µ¥Áµ…ÁÌ€˜˜|¹µ¥Áµ…ÁÌ¹±•¹Ñ €ø€À¤™½È€¡±•Ğ¹”€ô€Àì¹”€ğ|¹µ¥Áµ…ÁÌ¹±•¹Ñ ì¹”¬¬¤%”¡@¹}}İ•‰±É…µ•‰Õ™™•Ém%um¹•t°L°|°”¹=1=I}QQ!59PÀ°”¹QaQUI}U	}5A}A=M%Q%Y}`€¬$°¹”¤ì(€€€€€•±Í”%”¡@¹}}İ•‰±É…µ•‰Õ™™•Ém%t°L°|°”¹=1=I}QQ!59PÀ°”¹QaQUI}U	}5A}A=M%Q%Y}`€¬$°€À¤ì(€€€€€˜¡|¤€˜˜P¡”¹QaQUI}U	}5@¤°¤¹Õ¹‰¥¹‘Q•áÑÕÉ” ¤ì(€€€ô•±Í”¥˜€¡…”¤ì(€€€€€™½È€¡±•Ğ$€ô€À°¹”€ôd¹±•¹Ñ ì$€ğ¹”ì$¬¬¤ì(€€€€€€€½¹ÍĞÁ”€ôem%t°‰”€ô¸¹•Ğ¡Á”¤ì(€€€€€€€±•Ğ•”€ô”¹QaQUI|Éì(€€€€€€€€¡L¹¥Í]•‰0ÍI•¹‘•ÉQ…É•ĞñğL¹¥Í]•‰1ÉÉ…åI•¹‘•ÉQ…É•Ğ¤€˜˜€¡•”€ôL¹¥Í]•‰0ÍI•¹‘•ÉQ…É•Ğ€ü”¹QaQUI|Í€è”¹QaQUI|É}IId¤°¤¹‰¥¹‘Q•áÑÕÉ”¡•”°‰”¹}}İ•‰±Q•áÑÕÉ”¤° ¡•”°Á”¤°%”¡@¹}}İ•‰±É…µ•‰Õ™™•È°L°Á”°”¹=1=I}QQ!59PÀ€¬$°•”°€À¤°˜¡Á”¤€˜˜P¡•”¤ì(€€€€€ô(€€€€€¤¹Õ¹‰¥¹‘Q•áÑÕÉ” ¤ì(€€€ô•±Í”ì(€€€€€±•Ğ$€ô”¹QaQUI|Éì(€€€€€¥˜€ ¡L¹¥Í]•‰0ÍI•¹‘•ÉQ…É•ĞñğL¹¥Í]•‰1ÉÉ…åI•¹‘•ÉQ…É•Ğ¤€˜˜€¡$€ôL¹¥Í]•‰0ÍI•¹‘•ÉQ…É•Ğ€ü”¹QaQUI|Í€è”¹QaQUI|É}IId¤°¤¹‰¥¹‘Q•áÑÕÉ”¡$°\¹}}İ•‰±Q•áÑÕÉ”¤° ¡$°|¤°|¹µ¥Áµ…ÁÌ€˜˜|¹µ¥Áµ…ÁÌ¹±•¹Ñ €ø€À¤™½È€¡±•Ğ¹”€ô€Àì¹”€ğ|¹µ¥Áµ…ÁÌ¹±•¹Ñ ì¹”¬¬¤%”¡@¹}}İ•‰±É…µ•‰Õ™™•Ém¹•t°L°|°”¹=1=I}QQ!59PÀ°$°¹”¤ì(€€€€€•±Í”%”¡@¹}}İ•‰±É…µ•‰Õ™™•È°L°|°”¹=1=I}QQ!59PÀ°$°€À¤ì(€€€€€˜¡|¤€˜˜P¡$¤°¤¹Õ¹‰¥¹‘Q•áÑÕÉ” ¤ì(€€€ô(€€€L¹‘•ÁÑ¡	Õ™™•È€˜˜¹Ğ¡L¤ì(€ô(€™Õ¹Ñ¥½¸	Ğ¡L¤ì(€€€½¹ÍĞ|€ôL¹Ñ•áÑÕÉ•Ìì(€€€™½È€¡±•Ğ@€ô€À°\€ô|¹±•¹Ñ ì@€ğ\ì@¬¬¤ì(€€€€€½¹ÍĞd€ô}mAtì(€€€€€¥˜€¡˜¡d¤¤ì(€€€€€€€½¹ÍĞÉ”€ô¡L¤°…”€ô¸¹•Ğ¡d¤¹}}İ•‰±Q•áÑÕÉ”ì(€€€€€€€¤¹‰¥¹‘Q•áÑÕÉ”¡É”°…”¤°P¡É”¤°¤¹Õ¹‰¥¹‘Q•áÑÕÉ” ¤ì(€€€€€ô(€€€ô(€ô(€½¹ÍĞÉĞ€ômt°5Ğ€ômtì(€™Õ¹Ñ¥½¸}Ğ¡L¤ì(€€€¥˜€¡L¹Í…µÁ±•Ì€ø€À¤ì(€€€€€¥˜€¡¡L¤€ôôô€„Ä¤ì(€€€€€€€½¹ÍĞ|€ôL¹Ñ•áÑÕÉ•Ì°@€ôL¹İ¥‘Ñ °\€ôL¹¡•¥¡Ğì(€€€€€€€±•Ğd€ô”¹=1=I}	UI}	%Pì(€€€€€€€½¹ÍĞÉ”€ôL¹ÍÑ•¹¥±	Õ™™•È€ü”¹AQ!}MQ9%1}QQ!59P€è”¹AQ!}QQ!59P°…”€ô¸¹•Ğ¡L¤°$€ô|¹±•¹Ñ €ø€Äì(€€€€€€€¥˜€¡$¤™½È€¡±•ĞÁ”€ô€ÀìÁ”€ğ|¹±•¹Ñ ìÁ”¬¬¤(€€€€€€€€€¤¹‰¥¹‘É…µ•‰Õ™™•È¡”¹I5	UH°…”¹}}İ•‰±5Õ±Ñ¥Í…µÁ±•‘É…µ•‰Õ™™•È¤°”¹™É…µ•‰Õ™™•ÉI•¹‘•É‰Õ™™•È¡”¹I5	UH°”¹=1=I}QQ!59PÀ€¬Á”°”¹I9I	UH°¹Õ±°¤°¤¹‰¥¹‘É…µ•‰Õ™™•È¡”¹I5	UH°…”¹}}İ•‰±É…µ•‰Õ™™•È¤°”¹™É…µ•‰Õ™™•ÉQ•áÑÕÉ”É¡”¹I]}I5	UH°”¹=1=I}QQ!59PÀ€¬Á”°”¹QaQUI|É°¹Õ±°°€À¤ì(€€€€€€€¤¹‰¥¹‘É…µ•‰Õ™™•È¡”¹I}I5	UH°…”¹}}İ•‰±5Õ±Ñ¥Í…µÁ±•‘É…µ•‰Õ™™•È¤ì(€€€€€€€½¹ÍĞ¹”€ôL¹Ñ•áÑÕÉ”¹µ¥Áµ…ÁÌì(€€€€€€€¹”€˜˜¹”¹±•¹Ñ €ø€À€ü¤¹‰¥¹‘É…µ•‰Õ™™•È¡”¹I]}I5	UH°…”¹}}İ•‰±É…µ•‰Õ™™•ÉlÁt¤€è¤¹‰¥¹‘É…µ•‰Õ™™•È¡”¹I]}I5	UH°…”¹}}İ•‰±É…µ•‰Õ™™•È¤ì(€€€€€€€™½È€¡±•ĞÁ”€ô€ÀìÁ”€ğ|¹±•¹Ñ ìÁ”¬¬¤ì(€€€€€€€€€¥˜€¡L¹É•Í½±Ù••ÁÑ¡	Õ™™•È€˜˜€¡L¹‘•ÁÑ¡	Õ™™•È€˜˜€¡dğô”¹AQ!}	UI}	%P¤°L¹ÍÑ•¹¥±	Õ™™•È€˜˜L¹É•Í½±Ù•MÑ•¹¥±	Õ™™•È€˜˜€¡dğô”¹MQ9%1}	UI}	%P¤¤°$¤ì(€€€€€€€€€€€”¹™É…µ•‰Õ™™•ÉI•¹‘•É‰Õ™™•È¡”¹I}I5	UH°”¹=1=I}QQ!59PÀ°”¹I9I	UH°…”¹}}İ•‰±½±½ÉI•¹‘•É‰Õ™™•ÉmÁ•t¤ì(€€€€€€€€€€€½¹ÍĞ‰”€ô¸¹•Ğ¡}mÁ•t¤¹}}İ•‰±Q•áÑÕÉ”ì(€€€€€€€€€€€”¹™É…µ•‰Õ™™•ÉQ•áÑÕÉ”É¡”¹I]}I5	UH°”¹=1=I}QQ!59PÀ°”¹QaQUI|É°‰”°€À¤ì(€€€€€€€€€ô(€€€€€€€€€”¹‰±¥ÑÉ…µ•‰Õ™™•È À°€À°@°\°€À°€À°@°\°d°”¹9IMP¤°°€ôôô€„À€˜˜€¡ÉĞ¹±•¹Ñ €ô€À°5Ğ¹±•¹Ñ €ô€À°ÉĞ¹ÁÕÍ ¡”¹=1=I}QQ!59PÀ€¬Á”¤°L¹‘•ÁÑ¡	Õ™™•È€˜˜L¹É•Í½±Ù••ÁÑ¡	Õ™™•È€ôôô€„Ä€˜˜€¡ÉĞ¹ÁÕÍ ¡É”¤°5Ğ¹ÁÕÍ ¡É”¤°”¹¥¹Ù…±¥‘…Ñ•É…µ•‰Õ™™•È¡”¹I]}I5	UH°5Ğ¤¤°”¹¥¹Ù…±¥‘…Ñ•É…µ•‰Õ™™•È¡”¹I}I5	UH°ÉĞ¤¤ì(€€€€€€€ô(€€€€€€€¥˜€¡¤¹‰¥¹‘É…µ•‰Õ™™•È¡”¹I}I5	UH°¹Õ±°¤°¤¹‰¥¹‘É…µ•‰Õ™™•È¡”¹I]}I5	UH°¹Õ±°¤°$¤™½È€¡±•ĞÁ”€ô€ÀìÁ”€ğ|¹±•¹Ñ ìÁ”¬¬¤ì(€€€€€€€€€¤¹‰¥¹‘É…µ•‰Õ™™•È¡”¹I5	UH°…”¹}}İ•‰±5Õ±Ñ¥Í…µÁ±•‘É…µ•‰Õ™™•È¤°”¹™É…µ•‰Õ™™•ÉI•¹‘•É‰Õ™™•È¡”¹I5	UH°”¹=1=I}QQ!59PÀ€¬Á”°”¹I9I	UH°…”¹}}İ•‰±½±½ÉI•¹‘•É‰Õ™™•ÉmÁ•t¤ì(€€€€€€€€€½¹ÍĞ‰”€ô¸¹•Ğ¡}mÁ•t¤¹}}İ•‰±Q•áÑÕÉ”ì(€€€€€€€€€¤¹‰¥¹‘É…µ•‰Õ™™•È¡”¹I5	UH°…”¹}}İ•‰±É…µ•‰Õ™™•È¤°”¹™É…µ•‰Õ™™•ÉQ•áÑÕÉ”É¡”¹I]}I5	UH°”¹=1=I}QQ!59PÀ€¬Á”°”¹QaQUI|É°‰”°€À¤ì(€€€€€€€ô(€€€€€€€¤¹‰¥¹‘É…µ•‰Õ™™•È¡”¹I]}I5	UH°…”¹}}İ•‰±5Õ±Ñ¥Í…µÁ±•‘É…µ•‰Õ™™•È¤ì(€€€€€ô•±Í”¥˜€¡L¹‘•ÁÑ¡	Õ™™•È€˜˜L¹É•Í½±Ù••ÁÑ¡	Õ™™•È€ôôô€„Ä€˜˜°¤ì(€€€€€€€½¹ÍĞ|€ôL¹ÍÑ•¹¥±	Õ™™•È€ü”¹AQ!}MQ9%1}QQ!59P€è”¹AQ!}QQ!59Pì(€€€€€€€”¹¥¹Ù…±¥‘…Ñ•É…µ•‰Õ™™•È¡”¹I]}I5	UH°m}t¤ì(€€€€€ô(€€€ô(€ô(€™Õ¹Ñ¥½¸™Ğ¡L¤ì(€€€É•ÑÕÉ¸5…Ñ ¹µ¥¸¡È¹µ…áM…µÁ±•Ì°L¹Í…µÁ±•Ì¤ì(€ô(€™Õ¹Ñ¥½¸¡L¤ì(€€€½¹ÍĞ|€ô¸¹•Ğ¡L¤ì(€€€É•ÑÕÉ¸L¹Í…µÁ±•Ì€ø€À€˜˜Ğ¹¡…Ì ‰]	1}µÕ±Ñ¥Í…µÁ±•‘}É•¹‘•É}Ñ½}Ñ•áÑÕÉ”ˆ¤€ôôô€„À€˜˜|¹}}ÕÍ•I•¹‘•ÉQ½Q•áÑÕÉ”€„ôô€„Äì(€ô(€™Õ¹Ñ¥½¸éĞ¡L¤ì(€€€½¹ÍĞ|€ô„¹É•¹‘•È¹™É…µ”ì(€€€ ¹•Ğ¡L¤€„ôô|€˜˜€¡ ¹Í•Ğ¡L°|¤°L¹ÕÁ‘…Ñ” ¤¤ì(€ô(€™Õ¹Ñ¥½¸e”¡L°|¤ì(€€€½¹ÍĞ@€ôL¹½±½ÉMÁ…”°\€ôL¹™½Éµ…Ğ°d€ôL¹ÑåÁ”ì(€€€É•ÑÕÉ¸L¹¥Í½µÁÉ•ÍÍ•‘Q•áÑÕÉ”€ôôô€„ÀñğL¹¥ÍY¥‘•½Q•áÑÕÉ”€ôôô€„Àñğ@€„ôô€‰ÍÉˆµ±¥¹•…Èˆ€˜˜@€„ôô€ˆˆ€˜˜€¡!”¹•ÑQÉ…¹Í™•È¡@¤€ôôô€‰ÍÉˆˆ€ü€¡\€„ôô€ÄÀÈÌñğd€„ôô€ÄÀÀä¤€˜˜M” ‰]•‰1Q•áÑÕÉ•ÌèÍI•¹½‘•Ñ•áÑÕÉ•Ì¡…Ù”Ñ¼ÕÍ”I	½Éµ…Ğ…¹U¹Í¥¹•‘	åÑ•QåÁ”¸ˆ¤€è1” ‰]•‰1Q•áÑÕÉ•ÌèU¹ÍÕÁÁ½ÉÑ•Ñ•áÑÕÉ”½±½ÈÍÁ…”èˆ°@¤¤°|ì(€ô(€™Õ¹Ñ¥½¸ÍĞ¡L¤ì(€€€É•ÑÕÉ¸ÑåÁ•½˜!Q51%µ…•±•µ•¹Ğ€ğ€‰Ôˆ€˜˜L¥¹ÍÑ…¹•½˜!Q51%µ…•±•µ•¹Ğ€ü€¡Œ¹İ¥‘Ñ €ôL¹¹…ÑÕÉ…±]¥‘Ñ ñğL¹İ¥‘Ñ °Œ¹¡•¥¡Ğ€ôL¹¹…ÑÕÉ…±!•¥¡ĞñğL¹¡•¥¡Ğ¤€èÑåÁ•½˜Y¥‘•½É…µ”€ğ€‰Ôˆ€˜˜L¥¹ÍÑ…¹•½˜Y¥‘•½É…µ”€ü€¡Œ¹İ¥‘Ñ €ôL¹‘¥ÍÁ±…å]¥‘Ñ °Œ¹¡•¥¡Ğ€ôL¹‘¥ÍÁ±…å!•¥¡Ğ¤€è€¡Œ¹İ¥‘Ñ €ôL¹İ¥‘Ñ °Œ¹¡•¥¡Ğ€ôL¹¡•¥¡Ğ¤°Œì(€ô(€Ñ¡¥Ì¹…±±½…Ñ•Q•áÑÕÉ•U¹¥Ğ€ô,°Ñ¡¥Ì¹É•Í•ÑQ•áÑÕÉ•U¹¥ÑÌ€ô`°Ñ¡¥Ì¹•ÑQ•áÑÕÉ•U¹¥ÑÌ€ôÄ°Ñ¡¥Ì¹Í•ÑQ•áÑÕÉ•U¹¥ÑÌ€ô°Ñ¡¥Ì¹Í•ÑQ•áÑÕÉ”É€ôÑ”°Ñ¡¥Ì¹Í•ÑQ•áÑÕÉ”ÉÉÉ…ä€ô€°Ñ¡¥Ì¹Í•ÑQ•áÑÕÉ”Í€ô¥”°Ñ¡¥Ì¹Í•ÑQ•áÑÕÉ•Õ‰”€ôÕ”°Ñ¡¥Ì¹É•‰¥¹‘Q•áÑÕÉ•Ì€ô‰Ğ°Ñ¡¥Ì¹Í•ÑÕÁI•¹‘•ÉQ…É•Ğ€ô1Ğ°Ñ¡¥Ì¹ÕÁ‘…Ñ•I•¹‘•ÉQ…É•Ñ5¥Áµ…À€ô	Ğ°Ñ¡¥Ì¹ÕÁ‘…Ñ•5Õ±Ñ¥Í…µÁ±•I•¹‘•ÉQ…É•Ğ€ô}Ğ°Ñ¡¥Ì¹Í•ÑÕÁ•ÁÑ¡I•¹‘•É‰Õ™™•È€ô¹Ğ°Ñ¡¥Ì¹Í•ÑÕÁÉ…µ•	Õ™™•ÉQ•áÑÕÉ”€ô%”°Ñ¡¥Ì¹ÕÍ•5Õ±Ñ¥Í…µÁ±•‘IQP€ô°Ñ¡¥Ì¹¥ÍI•Ù•ÉÍ•‘•ÁÑ¡	Õ™™•È€ô™Õ¹Ñ¥½¸ ¤ì(€€€É•ÑÕÉ¸¤¹‰Õ™™•ÉÌ¹‘•ÁÑ ¹•ÑI•Ù•ÉÍ• ¤ì(€ôì)ô)™Õ¹Ñ¥½¸å˜¡”°Ğ¤ì(€™Õ¹Ñ¥½¸¤¡¸°È€ô€ˆˆ¤ì(€€€±•ĞÌì(€€€½¹ÍĞ„€ô!”¹•ÑQÉ…¹Í™•È¡È¤ì(€€€¥˜€¡¸€ôôô€ÄÀÀä¤É•ÑÕÉ¸”¹U9M%9}	eQì(€€€¥˜€¡¸€ôôô€ÄÀÄÜ¤É•ÑÕÉ¸”¹U9M%9}M!=IQ|Ñ|Ñ|Ñ|Ğì(€€€¥˜€¡¸€ôôô€ÄÀÄà¤É•ÑÕÉ¸”¹U9M%9}M!=IQ|Õ|Õ|Õ|Äì(€€€¥˜€¡¸€ôôô€ÌÔäÀÈ¤É•ÑÕÉ¸”¹U9M%9}%9Q|Õ|å|å|å}IXì(€€€¥˜€¡¸€ôôô€ÌÔàää¤É•ÑÕÉ¸”¹U9M%9}%9Q|ÄÁ|ÄÅ|ÄÅ}IXì(€€€¥˜€¡¸€ôôô€ÄÀÄÀ¤É•ÑÕÉ¸”¹	eQì(€€€¥˜€¡¸€ôôô€ÄÀÄÄ¤É•ÑÕÉ¸”¹M!=IPì(€€€¥˜€¡¸€ôôô€ÄÀÄÈ¤É•ÑÕÉ¸”¹U9M%9}M!=IPì(€€€¥˜€¡¸€ôôô€ÄÀÄÌ¤É•ÑÕÉ¸”¹%9Pì(€€€¥˜€¡¸€ôôô€ÄÀÄĞ¤É•ÑÕÉ¸”¹U9M%9}%9Pì(€€€¥˜€¡¸€ôôô€ÄÀÄÔ¤É•ÑÕÉ¸”¹1=Pì(€€€¥˜€¡¸€ôôô€ÄÀÄØ¤É•ÑÕÉ¸”¹!1}1=Pì(€€€¥˜€¡¸€ôôô€ÄÀÈÄ¤É•ÑÕÉ¸”¹1A!ì(€€€¥˜€¡¸€ôôô€ÄÀÈÈ¤É•ÑÕÉ¸”¹Iì(€€€¥˜€¡¸€ôôô€ÄÀÈÌ¤É•ÑÕÉ¸”¹I	ì(€€€¥˜€¡¸€ôôô€ÄÀÈØ¤É•ÑÕÉ¸”¹AQ!}=5A=99Pì(€€€¥˜€¡¸€ôôô€ÄÀÈÜ¤É•ÑÕÉ¸”¹AQ!}MQ9%0ì(€€€¥˜€¡¸€ôôô€ÄÀÈà¤É•ÑÕÉ¸”¹Iì(€€€¥˜€¡¸€ôôô€ÄÀÈä¤É•ÑÕÉ¸”¹I}%9QHì(€€€¥˜€¡¸€ôôô€ÄÀÌÀ¤É•ÑÕÉ¸”¹Iì(€€€¥˜€¡¸€ôôô€ÄÀÌÄ¤É•ÑÕÉ¸”¹I}%9QHì(€€€¥˜€¡¸€ôôô€ÄÀÌÌ¤É•ÑÕÉ¸”¹I	}%9QHì(€€€¥˜€¡¸€ôôô€ÌÌÜÜØñğ¸€ôôô€ÌÌÜÜÜñğ¸€ôôô€ÌÌÜÜàñğ¸€ôôô€ÌÌÜÜä¤¥˜€¡„€ôôô€‰ÍÉˆˆ¤(€€€€€¥˜€¡Ì€ôĞ¹•Ğ ‰]	1}½µÁÉ•ÍÍ•‘}Ñ•áÑÕÉ•}ÌÍÑ}ÍÉˆˆ¤°Ì€„ôô¹Õ±°¤ì(€€€€€€€¥˜€¡¸€ôôô€ÌÌÜÜØ¤É•ÑÕÉ¸Ì¹=5AIMM}MI	}LÍQ}aPÅ}aPì(€€€€€€€¥˜€¡¸€ôôô€ÌÌÜÜÜ¤É•ÑÕÉ¸Ì¹=5AIMM}MI	}1A!}LÍQ}aPÅ}aPì(€€€€€€€¥˜€¡¸€ôôô€ÌÌÜÜà¤É•ÑÕÉ¸Ì¹=5AIMM}MI	}1A!}LÍQ}aPÍ}aPì(€€€€€€€¥˜€¡¸€ôôô€ÌÌÜÜä¤É•ÑÕÉ¸Ì¹=5AIMM}MI	}1A!}LÍQ}aPÕ}aPì(€€€€€ô•±Í”É•ÑÕÉ¸¹Õ±°ì(€€€•±Í”¥˜€¡Ì€ôĞ¹•Ğ ‰]	1}½µÁÉ•ÍÍ•‘}Ñ•áÑÕÉ•}ÌÍÑŒˆ¤°Ì€„ôô¹Õ±°¤ì(€€€€€¥˜€¡¸€ôôô€ÌÌÜÜØ¤É•ÑÕÉ¸Ì¹=5AIMM}I	}LÍQ}aPÅ}aPì(€€€€€¥˜€¡¸€ôôô€ÌÌÜÜÜ¤É•ÑÕÉ¸Ì¹=5AIMM}I	}LÍQ}aPÅ}aPì(€€€€€¥˜€¡¸€ôôô€ÌÌÜÜà¤É•ÑÕÉ¸Ì¹=5AIMM}I	}LÍQ}aPÍ}aPì(€€€€€¥˜€¡¸€ôôô€ÌÌÜÜä¤É•ÑÕÉ¸Ì¹=5AIMM}I	}LÍQ}aPÕ}aPì(€€€ô•±Í”É•ÑÕÉ¸¹Õ±°ì(€€€¥˜€¡¸€ôôô€ÌÔàĞÀñğ¸€ôôô€ÌÔàĞÄñğ¸€ôôô€ÌÔàĞÈñğ¸€ôôô€ÌÔàĞÌ¤(€€€€€¥˜€¡Ì€ôĞ¹•Ğ ‰]	1}½µÁÉ•ÍÍ•‘}Ñ•áÑÕÉ•}ÁÙÉÑŒˆ¤°Ì€„ôô¹Õ±°¤ì(€€€€€€€¥˜€¡¸€ôôô€ÌÔàĞÀ¤É•ÑÕÉ¸Ì¹=5AIMM}I	}AYIQ|Ñ	AAXÅ}%5ì(€€€€€€€¥˜€¡¸€ôôô€ÌÔàĞÄ¤É•ÑÕÉ¸Ì¹=5AIMM}I	}AYIQ|É	AAXÅ}%5ì(€€€€€€€¥˜€¡¸€ôôô€ÌÔàĞÈ¤É•ÑÕÉ¸Ì¹=5AIMM}I	}AYIQ|Ñ	AAXÅ}%5ì(€€€€€€€¥˜€¡¸€ôôô€ÌÔàĞÌ¤É•ÑÕÉ¸Ì¹=5AIMM}I	}AYIQ|É	AAXÅ}%5ì(€€€€€ô•±Í”É•ÑÕÉ¸¹Õ±°ì(€€€¥˜€¡¸€ôôô€ÌØÄäØñğ¸€ôôô€ÌÜĞäÈñğ¸€ôôô€ÌÜĞäØñğ¸€ôôô€ÌÜĞààñğ¸€ôôô€ÌÜĞàäñğ¸€ôôô€ÌÜĞäÀñğ¸€ôôô€ÌÜĞäÄ¤(€€€€€¥˜€¡Ì€ôĞ¹•Ğ ‰]	1}½µÁÉ•ÍÍ•‘}Ñ•áÑÕÉ•}•ÑŒˆ¤°Ì€„ôô¹Õ±°¤ì(€€€€€€€¥˜€¡¸€ôôô€ÌØÄäØñğ¸€ôôô€ÌÜĞäÈ¤É•ÑÕÉ¸„€ôôô€‰ÍÉˆˆ€üÌ¹=5AIMM}MIá}QÈ€èÌ¹=5AIMM}Iá}QÈì(€€€€€€€¥˜€¡¸€ôôô€ÌÜĞäØ¤É•ÑÕÉ¸„€ôôô€‰ÍÉˆˆ€üÌ¹=5AIMM}MIá}1A!á}QÉ}€èÌ¹=5AIMM}I	á}QÉ}ì(€€€€€€€¥˜€¡¸€ôôô€ÌÜĞàà¤É•ÑÕÉ¸Ì¹=5AIMM}HÄÅ}ì(€€€€€€€¥˜€¡¸€ôôô€ÌÜĞàä¤É•ÑÕÉ¸Ì¹=5AIMM}M%9}HÄÅ}ì(€€€€€€€¥˜€¡¸€ôôô€ÌÜĞäÀ¤É•ÑÕÉ¸Ì¹=5AIMM}IÄÅ}ì(€€€€€€€¥˜€¡¸€ôôô€ÌÜĞäÄ¤É•ÑÕÉ¸Ì¹=5AIMM}M%9}IÄÅ}ì(€€€€€ô•±Í”É•ÑÕÉ¸¹Õ±°ì(€€€¥˜€¡¸€ôôô€ÌÜàÀàñğ¸€ôôô€ÌÜàÀäñğ¸€ôôô€ÌÜàÄÀñğ¸€ôôô€ÌÜàÄÄñğ¸€ôôô€ÌÜàÄÈñğ¸€ôôô€ÌÜàÄÌñğ¸€ôôô€ÌÜàÄĞñğ¸€ôôô€ÌÜàÄÔñğ¸€ôôô€ÌÜàÄØñğ¸€ôôô€ÌÜàÄÜñğ¸€ôôô€ÌÜàÄàñğ¸€ôôô€ÌÜàÄäñğ¸€ôôô€ÌÜàÈÀñğ¸€ôôô€ÌÜàÈÄ¤(€€€€€¥˜€¡Ì€ôĞ¹•Ğ ‰]	1}½µÁÉ•ÍÍ•‘}Ñ•áÑÕÉ•}…ÍÑŒˆ¤°Ì€„ôô¹Õ±°¤ì(€€€€€€€¥˜€¡¸€ôôô€ÌÜàÀà¤É•ÑÕÉ¸„€ôôô€‰ÍÉˆˆ€üÌ¹=5AIMM}MIá}1A!á}MQ|ÑàÑ}-!H€èÌ¹=5AIMM}I	}MQ|ÑàÑ}-!Hì(€€€€€€€¥˜€¡¸€ôôô€ÌÜàÀä¤É•ÑÕÉ¸„€ôôô€‰ÍÉˆˆ€üÌ¹=5AIMM}MIá}1A!á}MQ|ÕàÑ}-!H€èÌ¹=5AIMM}I	}MQ|ÕàÑ}-!Hì(€€€€€€€¥˜€¡¸€ôôô€ÌÜàÄÀ¤É•ÑÕÉ¸„€ôôô€‰ÍÉˆˆ€üÌ¹=5AIMM}MIá}1A!á}MQ|ÕàÕ}-!H€èÌ¹=5AIMM}I	}MQ|ÕàÕ}-!Hì(€€€€€€€¥˜€¡¸€ôôô€ÌÜàÄÄ¤É•ÑÕÉ¸„€ôôô€‰ÍÉˆˆ€üÌ¹=5AIMM}MIá}1A!á}MQ|ÙàÕ}-!H€èÌ¹=5AIMM}I	}MQ|ÙàÕ}-!Hì(€€€€€€€¥˜€¡¸€ôôô€ÌÜàÄÈ¤É•ÑÕÉ¸„€ôôô€‰ÍÉˆˆ€üÌ¹=5AIMM}MIá}1A!á}MQ|ÙàÙ}-!H€èÌ¹=5AIMM}I	}MQ|ÙàÙ}-!Hì(€€€€€€€¥˜€¡¸€ôôô€ÌÜàÄÌ¤É•ÑÕÉ¸„€ôôô€‰ÍÉˆˆ€üÌ¹=5AIMM}MIá}1A!á}MQ|áàÕ}-!H€èÌ¹=5AIMM}I	}MQ|áàÕ}-!Hì(€€€€€€€¥˜€¡¸€ôôô€ÌÜàÄĞ¤É•ÑÕÉ¸„€ôôô€‰ÍÉˆˆ€üÌ¹=5AIMM}MIá}1A!á}MQ|áàÙ}-!H€èÌ¹=5AIMM}I	}MQ|áàÙ}-!Hì(€€€€€€€¥˜€¡¸€ôôô€ÌÜàÄÔ¤É•ÑÕÉ¸„€ôôô€‰ÍÉˆˆ€üÌ¹=5AIMM}MIá}1A!á}MQ|áàá}-!H€èÌ¹=5AIMM}I	}MQ|áàá}-!Hì(€€€€€€€¥˜€¡¸€ôôô€ÌÜàÄØ¤É•ÑÕÉ¸„€ôôô€‰ÍÉˆˆ€üÌ¹=5AIMM}MIá}1A!á}MQ|ÄÁàÕ}-!H€èÌ¹=5AIMM}I	}MQ|ÄÁàÕ}-!Hì(€€€€€€€¥˜€¡¸€ôôô€ÌÜàÄÜ¤É•ÑÕÉ¸„€ôôô€‰ÍÉˆˆ€üÌ¹=5AIMM}MIá}1A!á}MQ|ÄÁàÙ}-!H€èÌ¹=5AIMM}I	}MQ|ÄÁàÙ}-!Hì(€€€€€€€¥˜€¡¸€ôôô€ÌÜàÄà¤É•ÑÕÉ¸„€ôôô€‰ÍÉˆˆ€üÌ¹=5AIMM}MIá}1A!á}MQ|ÄÁàá}-!H€èÌ¹=5AIMM}I	}MQ|ÄÁàá}-!Hì(€€€€€€€¥˜€¡¸€ôôô€ÌÜàÄä¤É•ÑÕÉ¸„€ôôô€‰ÍÉˆˆ€üÌ¹=5AIMM}MIá}1A!á}MQ|ÄÁàÄÁ}-!H€èÌ¹=5AIMM}I	}MQ|ÄÁàÄÁ}-!Hì(€€€€€€€¥˜€¡¸€ôôô€ÌÜàÈÀ¤É•ÑÕÉ¸„€ôôô€‰ÍÉˆˆ€üÌ¹=5AIMM}MIá}1A!á}MQ|ÄÉàÄÁ}-!H€èÌ¹=5AIMM}I	}MQ|ÄÉàÄÁ}-!Hì(€€€€€€€¥˜€¡¸€ôôô€ÌÜàÈÄ¤É•ÑÕÉ¸„€ôôô€‰ÍÉˆˆ€üÌ¹=5AIMM}MIá}1A!á}MQ|ÄÉàÄÉ}-!H€èÌ¹=5AIMM}I	}MQ|ÄÉàÄÉ}-!Hì(€€€€€ô•±Í”É•ÑÕÉ¸¹Õ±°ì(€€€¥˜€¡¸€ôôô€ÌØĞäÈñğ¸€ôôô€ÌØĞäĞñğ¸€ôôô€ÌØĞäÔ¤(€€€€€¥˜€¡Ì€ôĞ¹•Ğ ‰aQ}Ñ•áÑÕÉ•}½µÁÉ•ÍÍ¥½¹}‰ÁÑŒˆ¤°Ì€„ôô¹Õ±°¤ì(€€€€€€€¥˜€¡¸€ôôô€ÌØĞäÈ¤É•ÑÕÉ¸„€ôôô€‰ÍÉˆˆ€üÌ¹=5AIMM}MI	}1A!}	AQ}U9=I5}aP€èÌ¹=5AIMM}I	}	AQ}U9=I5}aPì(€€€€€€€¥˜€¡¸€ôôô€ÌØĞäĞ¤É•ÑÕÉ¸Ì¹=5AIMM}I	}	AQ}M%9}1=Q}aPì(€€€€€€€¥˜€¡¸€ôôô€ÌØĞäÔ¤É•ÑÕÉ¸Ì¹=5AIMM}I	}	AQ}U9M%9}1=Q}aPì(€€€€€ô•±Í”É•ÑÕÉ¸¹Õ±°ì(€€€¥˜€¡¸€ôôô€ÌØÈàÌñğ¸€ôôô€ÌØÈàĞñğ¸€ôôô€ÌØÈàÔñğ¸€ôôô€ÌØÈàØ¤(€€€€€¥˜€¡Ì€ôĞ¹•Ğ ‰aQ}Ñ•áÑÕÉ•}½µÁÉ•ÍÍ¥½¹}ÉÑŒˆ¤°Ì€„ôô¹Õ±°¤ì(€€€€€€€¥˜€¡¸€ôôô€ÌØÈàÌ¤É•ÑÕÉ¸Ì¹=5AIMM}I}IQÅ}aPì(€€€€€€€¥˜€¡¸€ôôô€ÌØÈàĞ¤É•ÑÕÉ¸Ì¹=5AIMM}M%9}I}IQÅ}aPì(€€€€€€€¥˜€¡¸€ôôô€ÌØÈàÔ¤É•ÑÕÉ¸Ì¹=5AIMM}I}I9}IQÉ}aPì(€€€€€€€¥˜€¡¸€ôôô€ÌØÈàØ¤É•ÑÕÉ¸Ì¹=5AIMM}M%9}I}I9}IQÉ}aPì(€€€€€ô•±Í”É•ÑÕÉ¸¹Õ±°ì(€€€É•ÑÕÉ¸¸€ôôô€ÄÀÈÀ€ü”¹U9M%9}%9Q|ÈÑ|à€è•m¹t€„ôôÙ½¥€À€ü•m¹t€è¹Õ±°ì(€ô(€É•ÑÕÉ¸ì½¹Ù•ÉĞè¤ôì)ô)Ù…È˜€ô€)Ù½¥µ…¥¸ ¤ì((%±}A½Í¥Ñ¥½¸€ôÙ•ŒĞ Á½Í¥Ñ¥½¸°€Ä¸À€¤ì()õ€°Q˜€ô€)Õ¹¥™½É´Í…µÁ±•ÈÉÉÉ…ä‘•ÁÑ¡½±½Èì)Õ¹¥™½É´™±½…Ğ‘•ÁÑ¡]¥‘Ñ ì)Õ¹¥™½É´™±½…Ğ‘•ÁÑ¡!•¥¡Ğì()Ù½¥µ…¥¸ ¤ì((%Ù•ŒÈ½½É€ôÙ•ŒÈ ±}É…½½É¹à€¼‘•ÁÑ¡]¥‘Ñ °±}É…½½É¹ä€¼‘•ÁÑ¡!•¥¡Ğ€¤ì((%¥˜€ ½½É¹à€øô€Ä¸À€¤ì(($%±}É…•ÁÑ €ôÑ•áÑÕÉ” ‘•ÁÑ¡½±½È°Ù•ŒÌ ½½É¹à€´€Ä¸À°½½É¹ä°€Ä€¤€¤¹Èì((%ô•±Í”ì(($%±}É…•ÁÑ €ôÑ•áÑÕÉ” ‘•ÁÑ¡½±½È°Ù•ŒÌ ½½É¹à°½½É¹ä°€À€¤€¤¹Èì((%ô()õ€°˜€ô±…ÍÌì(€½¹ÍÑÉÕÑ½È ¤ì(€€€Ñ¡¥Ì¹Ñ•áÑÕÉ”€ô¹Õ±°°Ñ¡¥Ì¹µ•Í €ô¹Õ±°°Ñ¡¥Ì¹‘•ÁÑ¡9•…È€ô€À°Ñ¡¥Ì¹‘•ÁÑ¡…È€ô€Àì(€ô(€¥¹¥Ğ¡”°Ğ¤ì(€€€¥˜€¡Ñ¡¥Ì¹Ñ•áÑÕÉ”€ôôô¹Õ±°¤ì(€€€€€½¹ÍĞ¤€ô¹•Ü±°¡”¹Ñ•áÑÕÉ”¤ì(€€€€€€¡”¹‘•ÁÑ¡9•…È€„ôôĞ¹‘•ÁÑ¡9•…Èñğ”¹‘•ÁÑ¡…È€„ôôĞ¹‘•ÁÑ¡…È¤€˜˜€¡Ñ¡¥Ì¹‘•ÁÑ¡9•…È€ô”¹‘•ÁÑ¡9•…È°Ñ¡¥Ì¹‘•ÁÑ¡…È€ô”¹‘•ÁÑ¡…È¤°Ñ¡¥Ì¹Ñ•áÑÕÉ”€ô¤ì(€€€ô(€ô(€•Ñ5•Í ¡”¤ì(€€€¥˜€¡Ñ¡¥Ì¹Ñ•áÑÕÉ”€„ôô¹Õ±°€˜˜Ñ¡¥Ì¹µ•Í €ôôô¹Õ±°¤ì(€€€€€½¹ÍĞĞ€ô”¹…µ•É…ÍlÁt¹Ù¥•İÁ½ÉĞ°¤€ô¹•Ü¡¤¡ì(€€€€€€€Ù•ÉÑ•áM¡…‘•Èè˜°(€€€€€€€™É…µ•¹ÑM¡…‘•ÈèQ˜°(€€€€€€€Õ¹¥™½ÉµÌèì(€€€€€€€€€‘•ÁÑ¡½±½ÈèìÙ…±Õ”èÑ¡¥Ì¹Ñ•áÑÕÉ”ô°(€€€€€€€€€‘•ÁÑ¡]¥‘Ñ èìÙ…±Õ”èĞ¹èô°(€€€€€€€€€‘•ÁÑ¡!•¥¡ĞèìÙ…±Õ”èĞ¹Üô(€€€€€€€ô(€€€€€ô¤ì(€€€€€Ñ¡¥Ì¹µ•Í €ô¹•ÜĞ¡¹•ÜÕ° ÈÀ°€ÈÀ¤°¤¤ì(€€€ô(€€€É•ÑÕÉ¸Ñ¡¥Ì¹µ•Í ì(€ô(€É•Í•Ğ ¤ì(€€€Ñ¡¥Ì¹Ñ•áÑÕÉ”€ô¹Õ±°°Ñ¡¥Ì¹µ•Í €ô¹Õ±°ì(€ô(€•Ñ•ÁÑ¡Q•áÑÕÉ” ¤ì(€€€É•ÑÕÉ¸Ñ¡¥Ì¹Ñ•áÑÕÉ”ì(€ô)ô°I˜€ô±…ÍÌ•áÑ•¹‘ÌU¤ì(€½¹ÍÑÉÕÑ½È¡”°Ğ¤ì(€€€ÍÕÁ•È ¤ì(€€€½¹ÍĞ¤€ôÑ¡¥Ìì(€€€±•Ğ¸€ô¹Õ±°°È€ô€Ä°Ì€ô¹Õ±°°„€ô€‰±½…°µ™±½½Èˆ°¼€ô€Ä°°€ô¹Õ±°°Œ€ô¹Õ±°° €ô¹Õ±°°€ô¹Õ±°°Ô€ô¹Õ±°°À€ô¹Õ±°ì(€€€½¹ÍĞØ€ôÑåÁ•½˜aI]•‰1	¥¹‘¥¹œ€ğ€‰Ôˆ°ˆ€ô¹•Ü˜ ¤°´€ôíô°˜€ôĞ¹•Ñ½¹Ñ•áÑÑÑÉ¥‰ÕÑ•Ì ¤ì(€€€±•ĞP€ô¹Õ±°°€ô¹Õ±°ì(€€€½¹ÍĞ4€ômt°€ômt°H€ô¹•Ü” ¤ì(€€€±•Ğ€ô¹Õ±°ì(€€€½¹ÍĞœ€ô¹•ÜĞ ¤ì(€€€œ¹Ù¥•İÁ½ÉĞ€ô¹•Ü¥Ğ ¤ì(€€€½¹ÍĞä€ô¹•ÜĞ ¤ì(€€€ä¹Ù¥•İÁ½ÉĞ€ô¹•Ü¥Ğ ¤ì(€€€½¹ÍĞ€ômœ°åt°Ü€ô¹•Ü…Ô ¤ì(€€€±•Ğ¬€ô¹Õ±°°`€ô¹Õ±°ì(€€€Ñ¡¥Ì¹…µ•É…ÕÑ½UÁ‘…Ñ”€ô€„À°Ñ¡¥Ì¹•¹…‰±•€ô€„Ä°Ñ¡¥Ì¹¥ÍAÉ•Í•¹Ñ¥¹œ€ô€„Ä°Ñ¡¥Ì¹•Ñ½¹ÑÉ½±±•È€ô™Õ¹Ñ¥½¸¡ ¤ì(€€€€€±•ĞD€ô5m!tì(€€€€€É•ÑÕÉ¸D€ôôôÙ½¥€À€˜˜€¡D€ô¹•Ü…Ì ¤°5m!t€ôD¤°D¹•ÑQ…É•ÑI…åMÁ…” ¤ì(€€€ô°Ñ¡¥Ì¹•Ñ½¹ÑÉ½±±•ÉÉ¥À€ô™Õ¹Ñ¥½¸¡ ¤ì(€€€€€±•ĞD€ô5m!tì(€€€€€É•ÑÕÉ¸D€ôôôÙ½¥€À€˜˜€¡D€ô¹•Ü…Ì ¤°5m!t€ôD¤°D¹•ÑÉ¥ÁMÁ…” ¤ì(€€€ô°Ñ¡¥Ì¹•Ñ!…¹€ô™Õ¹Ñ¥½¸¡ ¤ì(€€€€€±•ĞD€ô5m!tì(€€€€€É•ÑÕÉ¸D€ôôôÙ½¥€À€˜˜€¡D€ô¹•Ü…Ì ¤°5m!t€ôD¤°D¹•Ñ!…¹‘MÁ…” ¤ì(€€€ôì(€€€™Õ¹Ñ¥½¸Ä¡ ¤ì(€€€€€½¹ÍĞD€ô¹¥¹‘•á=˜¡ ¹¥¹ÁÕÑM½ÕÉ”¤ì(€€€€€¥˜€¡D€ôôô€´Ä¤É•ÑÕÉ¸ì(€€€€€½¹ÍĞ‘”€ô5mEtì(€€€€€‘”€„ôôÙ½¥€À€˜˜€¡‘”¹ÕÁ‘…Ñ”¡ ¹¥¹ÁÕÑM½ÕÉ”° ¹™É…µ”°°ñğÌ¤°‘”¹‘¥ÍÁ…Ñ¡Ù•¹Ğ¡ì(€€€€€€€ÑåÁ”è ¹ÑåÁ”°(€€€€€€€‘…Ñ„è ¹¥¹ÁÕÑM½ÕÉ”(€€€€€ô¤¤ì(€€€ô(€€€™Õ¹Ñ¥½¸ ¤ì(€€€€€¸¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰Í•±•Ğˆ°Ä¤°¸¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰Í•±•ÑÍÑ…ÉĞˆ°Ä¤°¸¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰Í•±•Ñ•¹ˆ°Ä¤°¸¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰ÍÅÕ••é”ˆ°Ä¤°¸¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰ÍÅÕ••é•ÍÑ…ÉĞˆ°Ä¤°¸¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰ÍÅÕ••é••¹ˆ°Ä¤°¸¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰•¹ˆ°¤°¸¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰¥¹ÁÕÑÍ½ÕÉ•Í¡…¹”ˆ°,¤ì(€€€€€™½È€¡±•Ğ €ô€Àì €ğ4¹±•¹Ñ ì ¬¬¤ì(€€€€€€€½¹ÍĞD€ôm!tì(€€€€€€€D€„ôô¹Õ±°€˜˜€¡m!t€ô¹Õ±°°5m!t¹‘¥Í½¹¹•Ğ¡D¤¤ì(€€€€€ô(€€€€€¬€ô¹Õ±°°`€ô¹Õ±°°ˆ¹É•Í•Ğ ¤ì(€€€€€™½È€¡½¹ÍĞ ¥¸´¤‘•±•Ñ”µm!tì(€€€€€”¹Í•ÑI•¹‘•ÉQ…É•Ğ¡P¤°Ô€ô¹Õ±°°€ô¹Õ±°° €ô¹Õ±°°¸€ô¹Õ±°°€ô¹Õ±°°å”¹ÍÑ½À ¤°¤¹¥ÍAÉ•Í•¹Ñ¥¹œ€ô€„Ä°”¹Í•ÑA¥á•±I…Ñ¥¼¡¤°”¹Í•ÑM¥é”¡H¹İ¥‘Ñ °H¹¡•¥¡Ğ°€„Ä¤°¤¹‘¥ÍÁ…Ñ¡Ù•¹Ğ¡ìÑåÁ”è€‰Í•ÍÍ¥½¹•¹ˆô¤ì(€€€ô(€€€Ñ¡¥Ì¹Í•ÑÉ…µ•‰Õ™™•ÉM…±•…Ñ½È€ô™Õ¹Ñ¥½¸¡ ¤ì(€€€€€È€ô °¤¹¥ÍAÉ•Í•¹Ñ¥¹œ€ôôô€„À€˜˜M” ‰]•‰aI5…¹…•Èè…¹¹½Ğ¡…¹”™É…µ•‰Õ™™•ÈÍ…±”İ¡¥±”ÁÉ•Í•¹Ñ¥¹œ¸ˆ¤ì(€€€ô°Ñ¡¥Ì¹Í•ÑI•™•É•¹•MÁ…•QåÁ”€ô™Õ¹Ñ¥½¸¡ ¤ì(€€€€€„€ô °¤¹¥ÍAÉ•Í•¹Ñ¥¹œ€ôôô€„À€˜˜M” ‰]•‰aI5…¹…•Èè…¹¹½Ğ¡…¹”É•™•É•¹”ÍÁ…”ÑåÁ”İ¡¥±”ÁÉ•Í•¹Ñ¥¹œ¸ˆ¤ì(€€€ô°Ñ¡¥Ì¹•ÑI•™•É•¹•MÁ…”€ô™Õ¹Ñ¥½¸ ¤ì(€€€€€É•ÑÕÉ¸°ñğÌì(€€€ô°Ñ¡¥Ì¹Í•ÑI•™•É•¹•MÁ…”€ô™Õ¹Ñ¥½¸¡ ¤ì(€€€€€°€ô ì(€€€ô°Ñ¡¥Ì¹•Ñ	…Í•1…å•È€ô™Õ¹Ñ¥½¸ ¤ì(€€€€€É•ÑÕÉ¸€„ôô¹Õ±°€ü€èÔì(€€€ô°Ñ¡¥Ì¹•Ñ	¥¹‘¥¹œ€ô™Õ¹Ñ¥½¸ ¤ì(€€€€€É•ÑÕÉ¸ €ôôô¹Õ±°€˜˜Ø€˜˜€¡ €ô¹•ÜaI]•‰1	¥¹‘¥¹œ¡¸°Ğ¤¤° ì(€€€ô°Ñ¡¥Ì¹•ÑÉ…µ”€ô™Õ¹Ñ¥½¸ ¤ì(€€€€€É•ÑÕÉ¸Àì(€€€ô°Ñ¡¥Ì¹•ÑM•ÍÍ¥½¸€ô™Õ¹Ñ¥½¸ ¤ì(€€€€€É•ÑÕÉ¸¸ì(€€€ô°Ñ¡¥Ì¹Í•ÑM•ÍÍ¥½¸€ô…Íå¹Œ™Õ¹Ñ¥½¸¡ ¤ì(€€€€€¥˜€¡¸€ô °¸€„ôô¹Õ±°¤ì(€€€€€€€¥˜€¡P€ô”¹•ÑI•¹‘•ÉQ…É•Ğ ¤°¸¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰Í•±•Ğˆ°Ä¤°¸¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰Í•±•ÑÍÑ…ÉĞˆ°Ä¤°¸¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰Í•±•Ñ•¹ˆ°Ä¤°¸¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰ÍÅÕ••é”ˆ°Ä¤°¸¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰ÍÅÕ••é•ÍÑ…ÉĞˆ°Ä¤°¸¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰ÍÅÕ••é••¹ˆ°Ä¤°¸¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰•¹ˆ°¤°¸¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰¥¹ÁÕÑÍ½ÕÉ•Í¡…¹”ˆ°,¤°˜¹áÉ½µÁ…Ñ¥‰±”€„ôô€„À€˜˜…İ…¥ĞĞ¹µ…­•aI½µÁ…Ñ¥‰±” ¤°€ô”¹•ÑA¥á•±I…Ñ¥¼ ¤°”¹•ÑM¥é”¡H¤°Ø€˜˜€‰É•…Ñ•AÉ½©•Ñ¥½¹1…å•Èˆ¥¸aI]•‰1	¥¹‘¥¹œ¹ÁÉ½Ñ½ÑåÁ”¤ì(€€€€€€€€€±•ĞD€ô¹Õ±°°‘”€ô¹Õ±°°±”€ô¹Õ±°ì(€€€€€€€€€˜¹‘•ÁÑ €˜˜€¡±”€ô˜¹ÍÑ•¹¥°€üĞ¹AQ ÈÑ}MQ9%0à€èĞ¹AQ!}=5A=99PÈĞ°D€ô˜¹ÍÑ•¹¥°€ü=¼€è©¸°‘”€ô˜¹ÍÑ•¹¥°€ü¼€èÅ¤¤ì(€€€€€€€€€½¹ÍĞI”€ôì(€€€€€€€€€€€½±½É½Éµ…ĞèĞ¹I	à°(€€€€€€€€€€€‘•ÁÑ¡½Éµ…Ğè±”°(€€€€€€€€€€€Í…±•…Ñ½ÈèÈ(€€€€€€€€€ôì(€€€€€€€€€ €ôÑ¡¥Ì¹•Ñ	¥¹‘¥¹œ ¤°€ô ¹É•…Ñ•AÉ½©•Ñ¥½¹1…å•È¡I”¤°¸¹ÕÁ‘…Ñ•I•¹‘•ÉMÑ…Ñ”¡ì±…å•ÉÌèm‘tô¤°”¹Í•ÑA¥á•±I…Ñ¥¼ Ä¤°”¹Í•ÑM¥é”¡¹Ñ•áÑÕÉ•]¥‘Ñ °¹Ñ•áÑÕÉ•!•¥¡Ğ°€„Ä¤°€ô¹•Ü±¤¡¹Ñ•áÑÕÉ•]¥‘Ñ °¹Ñ•áÑÕÉ•!•¥¡Ğ°ì(€€€€€€€€€€€™½Éµ…ĞèÙ¸°(€€€€€€€€€€€ÑåÁ”è9¤°(€€€€€€€€€€€‘•ÁÑ¡Q•áÑÕÉ”è¹•Üå¸¡¹Ñ•áÑÕÉ•]¥‘Ñ °¹Ñ•áÑÕÉ•!•¥¡Ğ°‘”°Ù½¥€À°Ù½¥€À°Ù½¥€À°Ù½¥€À°Ù½¥€À°Ù½¥€À°D¤°(€€€€€€€€€€€ÍÑ•¹¥±	Õ™™•Èè˜¹ÍÑ•¹¥°°(€€€€€€€€€€€½±½ÉMÁ…”è”¹½ÕÑÁÕÑ½±½ÉMÁ…”°(€€€€€€€€€€€Í…µÁ±•Ìè˜¹…¹Ñ¥…±¥…Ì€ü€Ğ€è€À°(€€€€€€€€€€€É•Í½±Ù••ÁÑ¡	Õ™™•Èè¹¥¹½É••ÁÑ¡Y…±Õ•Ì€ôôô€„Ä°(€€€€€€€€€€€É•Í½±Ù•MÑ•¹¥±	Õ™™•Èè¹¥¹½É••ÁÑ¡Y…±Õ•Ì€ôôô€„Ä(€€€€€€€€€ô¤ì(€€€€€€€ô•±Í”ì(€€€€€€€€€½¹ÍĞD€ôì(€€€€€€€€€€€…¹Ñ¥…±¥…Ìè˜¹…¹Ñ¥…±¥…Ì°(€€€€€€€€€€€…±Á¡„è€„À°(€€€€€€€€€€€‘•ÁÑ è˜¹‘•ÁÑ °(€€€€€€€€€€€ÍÑ•¹¥°è˜¹ÍÑ•¹¥°°(€€€€€€€€€€€™É…µ•‰Õ™™•ÉM…±•…Ñ½ÈèÈ(€€€€€€€€€ôì(€€€€€€€€€Ô€ô¹•ÜaI]•‰11…å•È¡¸°Ğ°D¤°¸¹ÕÁ‘…Ñ•I•¹‘•ÉMÑ…Ñ”¡ì‰…Í•1…å•ÈèÔô¤°”¹Í•ÑA¥á•±I…Ñ¥¼ Ä¤°”¹Í•ÑM¥é”¡Ô¹™É…µ•‰Õ™™•É]¥‘Ñ °Ô¹™É…µ•‰Õ™™•É!•¥¡Ğ°€„Ä¤°€ô¹•Ü±¤¡Ô¹™É…µ•‰Õ™™•É]¥‘Ñ °Ô¹™É…µ•‰Õ™™•É!•¥¡Ğ°ì(€€€€€€€€€€€™½Éµ…ĞèÙ¸°(€€€€€€€€€€€ÑåÁ”è9¤°(€€€€€€€€€€€½±½ÉMÁ…”è”¹½ÕÑÁÕÑ½±½ÉMÁ…”°(€€€€€€€€€€€ÍÑ•¹¥±	Õ™™•Èè˜¹ÍÑ•¹¥°°(€€€€€€€€€€€É•Í½±Ù••ÁÑ¡	Õ™™•ÈèÔ¹¥¹½É••ÁÑ¡Y…±Õ•Ì€ôôô€„Ä°(€€€€€€€€€€€É•Í½±Ù•MÑ•¹¥±	Õ™™•ÈèÔ¹¥¹½É••ÁÑ¡Y…±Õ•Ì€ôôô€„Ä(€€€€€€€€€ô¤ì(€€€€€€€ô(€€€€€€€¹¥ÍaII•¹‘•ÉQ…É•Ğ€ô€„À°Ñ¡¥Ì¹Í•Ñ½Ù•…Ñ¥½¸¡¼¤°°€ô¹Õ±°°Ì€ô…İ…¥Ğ¸¹É•ÅÕ•ÍÑI•™•É•¹•MÁ…”¡„¤°å”¹Í•Ñ½¹Ñ•áĞ¡¸¤°å”¹ÍÑ…ÉĞ ¤°¤¹¥ÍAÉ•Í•¹Ñ¥¹œ€ô€„À°¤¹‘¥ÍÁ…Ñ¡Ù•¹Ğ¡ìÑåÁ”è€‰Í•ÍÍ¥½¹ÍÑ…ÉĞˆô¤ì(€€€€€ô(€€€ô°Ñ¡¥Ì¹•Ñ¹Ù¥É½¹µ•¹Ñ	±•¹‘5½‘”€ô™Õ¹Ñ¥½¸ ¤ì(€€€€€¥˜€¡¸€„ôô¹Õ±°¤É•ÑÕÉ¸¸¹•¹Ù¥É½¹µ•¹Ñ	±•¹‘5½‘”ì(€€€ô°Ñ¡¥Ì¹•Ñ•ÁÑ¡Q•áÑÕÉ”€ô™Õ¹Ñ¥½¸ ¤ì(€€€€€É•ÑÕÉ¸ˆ¹•Ñ•ÁÑ¡Q•áÑÕÉ” ¤ì(€€€ôì(€€€™Õ¹Ñ¥½¸,¡ ¤ì(€€€€€™½È€¡±•ĞD€ô€ÀìD€ğ ¹É•µ½Ù•¹±•¹Ñ ìD¬¬¤ì(€€€€€€€½¹ÍĞ‘”€ô ¹É•µ½Ù•‘mEt°±”€ô¹¥¹‘•á=˜¡‘”¤ì(€€€€€€€±”€øô€À€˜˜€¡m±•t€ô¹Õ±°°5m±•t¹‘¥Í½¹¹•Ğ¡‘”¤¤ì(€€€€€ô(€€€€€™½È€¡±•ĞD€ô€ÀìD€ğ ¹…‘‘•¹±•¹Ñ ìD¬¬¤ì(€€€€€€€½¹ÍĞ‘”€ô ¹…‘‘•‘mEtì(€€€€€€€±•Ğ±”€ô¹¥¹‘•á=˜¡‘”¤ì(€€€€€€€¥˜€¡±”€ôôô€´Ä¤ì(€€€€€€€€€™½È€¡±•Ğ”€ô€Àì”€ğ4¹±•¹Ñ ì”¬¬¤¥˜€¡”€øô¹±•¹Ñ ¤ì(€€€€€€€€€€€¹ÁÕÍ ¡‘”¤°±”€ô”ì(€€€€€€€€€€€‰É•…¬ì(€€€€€€€€€ô•±Í”¥˜€¡m•t€ôôô¹Õ±°¤ì(€€€€€€€€€€€m•t€ô‘”°±”€ô”ì(€€€€€€€€€€€‰É•…¬ì(€€€€€€€€€ô(€€€€€€€€€¥˜€¡±”€ôôô€´Ä¤‰É•…¬ì(€€€€€€€ô(€€€€€€€½¹ÍĞI”€ô5m±•tì(€€€€€€€I”€˜˜I”¹½¹¹•Ğ¡‘”¤ì(€€€€€ô(€€€ô(€€€½¹ÍĞ<€ô¹•Ü8 ¤°Ñ”€ô¹•Ü8 ¤ì(€€€™Õ¹Ñ¥½¸€¡ °D°‘”¤ì(€€€€€<¹Í•ÑÉ½µ5…ÑÉ¥áA½Í¥Ñ¥½¸¡D¹µ…ÑÉ¥á]½É±¤°Ñ”¹Í•ÑÉ½µ5…ÑÉ¥áA½Í¥Ñ¥½¸¡‘”¹µ…ÑÉ¥á]½É±¤ì(€€€€€½¹ÍĞ±”€ô<¹‘¥ÍÑ…¹•Q¼¡Ñ”¤°I”€ôD¹ÁÉ½©•Ñ¥½¹5…ÑÉ¥à¹•±•µ•¹ÑÌ°”€ô‘”¹ÁÉ½©•Ñ¥½¹5…ÑÉ¥à¹•±•µ•¹ÑÌ°%”€ôI•lÄÑt€¼€¡I•lÄÁt€´€Ä¤°©”€ôI•lÄÑt€¼€¡I•lÄÁt€¬€Ä¤°]”€ô€¡I•låt€¬€Ä¤€¼I•lÕt°¹Ğ€ô€¡I•låt€´€Ä¤€¼I•lÕt°‰Ğ€ô€¡I•lát€´€Ä¤€¼I•lÁt°1Ğ€ô€¡•lát€¬€Ä¤€¼•lÁt°	Ğ€ô%”€¨‰Ğ°ÉĞ€ô%”€¨1Ğ°5Ğ€ô±”€¼€ µ‰Ğ€¬1Ğ¤°}Ğ€ô5Ğ€¨€µ‰Ğì(€€€€€¥˜€¡D¹µ…ÑÉ¥á]½É±¹‘•½µÁ½Í”¡ ¹Á½Í¥Ñ¥½¸° ¹ÅÕ…Ñ•É¹¥½¸° ¹Í…±”¤° ¹ÑÉ…¹Í±…Ñ•`¡}Ğ¤° ¹ÑÉ…¹Í±…Ñ•h¡5Ğ¤° ¹µ…ÑÉ¥á]½É±¹½µÁ½Í”¡ ¹Á½Í¥Ñ¥½¸° ¹ÅÕ…Ñ•É¹¥½¸° ¹Í…±”¤° ¹µ…ÑÉ¥á]½É±‘%¹Ù•ÉÍ”¹½Áä¡ ¹µ…ÑÉ¥á]½É±¤¹¥¹Ù•ÉĞ ¤°I•lÄÁt€ôôô€´Ä¤(€€€€€€€ ¹ÁÉ½©•Ñ¥½¹5…ÑÉ¥à¹½Áä¡D¹ÁÉ½©•Ñ¥½¹5…ÑÉ¥à¤° ¹ÁÉ½©•Ñ¥½¹5…ÑÉ¥á%¹Ù•ÉÍ”¹½Áä¡D¹ÁÉ½©•Ñ¥½¹5…ÑÉ¥á%¹Ù•ÉÍ”¤ì(€€€€€•±Í”ì(€€€€€€€½¹ÍĞ™Ğ€ô%”€¬5Ğ°€ô©”€¬5Ğ°éĞ€ô	Ğ€´}Ğ°e”€ôÉĞ€¬€¡±”€´}Ğ¤°ÍĞ€ô]”€¨©”€¼€¨™Ğ°L€ô¹Ğ€¨©”€¼€¨™Ğì(€€€€€€€ ¹ÁÉ½©•Ñ¥½¹5…ÑÉ¥à¹µ…­•A•ÉÍÁ•Ñ¥Ù”¡éĞ°e”°ÍĞ°L°™Ğ°¤° ¹ÁÉ½©•Ñ¥½¹5…ÑÉ¥á%¹Ù•ÉÍ”¹½Áä¡ ¹ÁÉ½©•Ñ¥½¹5…ÑÉ¥à¤¹¥¹Ù•ÉĞ ¤ì(€€€€€ô(€€€ô(€€€™Õ¹Ñ¥½¸¥”¡ °D¤ì(€€€€€D€ôôô¹Õ±°€ü ¹µ…ÑÉ¥á]½É±¹½Áä¡ ¹µ…ÑÉ¥à¤€è ¹µ…ÑÉ¥á]½É±¹µÕ±Ñ¥Á±å5…ÑÉ¥•Ì¡D¹µ…ÑÉ¥á]½É±° ¹µ…ÑÉ¥à¤° ¹µ…ÑÉ¥á]½É±‘%¹Ù•ÉÍ”¹½Áä¡ ¹µ…ÑÉ¥á]½É±¤¹¥¹Ù•ÉĞ ¤ì(€€€ô(€€€Ñ¡¥Ì¹ÕÁ‘…Ñ•…µ•É„€ô™Õ¹Ñ¥½¸¡ ¤ì(€€€€€¥˜€¡¸€ôôô¹Õ±°¤É•ÑÕÉ¸ì(€€€€€±•ĞD€ô ¹¹•…È°‘”€ô ¹™…Èì(€€€€€ˆ¹Ñ•áÑÕÉ”€„ôô¹Õ±°€˜˜€¡ˆ¹‘•ÁÑ¡9•…È€ø€À€˜˜€¡D€ôˆ¹‘•ÁÑ¡9•…È¤°ˆ¹‘•ÁÑ¡…È€ø€À€˜˜€¡‘”€ôˆ¹‘•ÁÑ¡…È¤¤°Ü¹¹•…È€ôä¹¹•…È€ôœ¹¹•…È€ôD°Ü¹™…È€ôä¹™…È€ôœ¹™…È€ô‘”°€¡¬€„ôôÜ¹¹•…Èñğ`€„ôôÜ¹™…È¤€˜˜€¡¸¹ÕÁ‘…Ñ•I•¹‘•ÉMÑ…Ñ”¡ì(€€€€€€€‘•ÁÑ¡9•…ÈèÜ¹¹•…È°(€€€€€€€‘•ÁÑ¡…ÈèÜ¹™…È(€€€€€ô¤°¬€ôÜ¹¹•…È°`€ôÜ¹™…È¤°Ü¹±…å•ÉÌ¹µ…Í¬€ô ¹±…å•ÉÌ¹µ…Í¬ğ€Ø°œ¹±…å•ÉÌ¹µ…Í¬€ôÜ¹±…å•ÉÌ¹µ…Í¬€˜€´Ô°ä¹±…å•ÉÌ¹µ…Í¬€ôÜ¹±…å•ÉÌ¹µ…Í¬€˜€´Ìì(€€€€€½¹ÍĞ±”€ô ¹Á…É•¹Ğ°I”€ôÜ¹…µ•É…Ìì(€€€€€¥”¡Ü°±”¤ì(€€€€€™½È€¡±•Ğ”€ô€Àì”€ğI”¹±•¹Ñ ì”¬¬¤¥”¡I•m•t°±”¤ì(€€€€€I”¹±•¹Ñ €ôôô€È€ü€¡Ü°œ°ä¤€èÜ¹ÁÉ½©•Ñ¥½¹5…ÑÉ¥à¹½Áä¡œ¹ÁÉ½©•Ñ¥½¹5…ÑÉ¥à¤°Õ”¡ °Ü°±”¤ì(€€€ôì(€€€™Õ¹Ñ¥½¸Õ”¡ °D°‘”¤ì(€€€€€‘”€ôôô¹Õ±°€ü ¹µ…ÑÉ¥à¹½Áä¡D¹µ…ÑÉ¥á]½É±¤€è€¡ ¹µ…ÑÉ¥à¹½Áä¡‘”¹µ…ÑÉ¥á]½É±¤° ¹µ…ÑÉ¥à¹¥¹Ù•ÉĞ ¤° ¹µ…ÑÉ¥à¹µÕ±Ñ¥Á±ä¡D¹µ…ÑÉ¥á]½É±¤¤° ¹µ…ÑÉ¥à¹‘•½µÁ½Í”¡ ¹Á½Í¥Ñ¥½¸° ¹ÅÕ…Ñ•É¹¥½¸° ¹Í…±”¤° ¹ÕÁ‘…Ñ•5…ÑÉ¥á]½É± „À¤° ¹ÁÉ½©•Ñ¥½¹5…ÑÉ¥à¹½Áä¡D¹ÁÉ½©•Ñ¥½¹5…ÑÉ¥à¤° ¹ÁÉ½©•Ñ¥½¹5…ÑÉ¥á%¹Ù•ÉÍ”¹½Áä¡D¹ÁÉ½©•Ñ¥½¹5…ÑÉ¥á%¹Ù•ÉÍ”¤° ¹¥ÍA•ÉÍÁ•Ñ¥Ù•…µ•É„€˜˜€¡ ¹™½Ø€ôá¸€¨€È€¨5…Ñ ¹…Ñ…¸ Ä€¼ ¹ÁÉ½©•Ñ¥½¹5…ÑÉ¥à¹•±•µ•¹ÑÍlÕt¤° ¹é½½´€ô€Ä¤ì(€€€ô(€€€Ñ¡¥Ì¹•Ñ…µ•É„€ô™Õ¹Ñ¥½¸ ¤ì(€€€€€É•ÑÕÉ¸Üì(€€€ô°Ñ¡¥Ì¹•Ñ½Ù•…Ñ¥½¸€ô™Õ¹Ñ¥½¸ ¤ì(€€€€€¥˜€ „¡€ôôô¹Õ±°€˜˜Ô€ôôô¹Õ±°¤¤(€€€€€€€É•ÑÕÉ¸¼ì(€€€ô°Ñ¡¥Ì¹Í•Ñ½Ù•…Ñ¥½¸€ô™Õ¹Ñ¥½¸¡ ¤ì(€€€€€¼€ô °€„ôô¹Õ±°€˜˜€¡¹™¥á•‘½Ù•…Ñ¥½¸€ô ¤°Ô€„ôô¹Õ±°€˜˜Ô¹™¥á•‘½Ù•…Ñ¥½¸€„ôôÙ½¥€À€˜˜€¡Ô¹™¥á•‘½Ù•…Ñ¥½¸€ô ¤ì(€€€ô°Ñ¡¥Ì¹¡…Í•ÁÑ¡M•¹Í¥¹œ€ô™Õ¹Ñ¥½¸ ¤ì(€€€€€É•ÑÕÉ¸ˆ¹Ñ•áÑÕÉ”€„ôô¹Õ±°ì(€€€ô°Ñ¡¥Ì¹•Ñ•ÁÑ¡M•¹Í¥¹5•Í €ô™Õ¹Ñ¥½¸ ¤ì(€€€€€É•ÑÕÉ¸ˆ¹•Ñ5•Í ¡Ü¤ì(€€€ô°Ñ¡¥Ì¹•Ñ…µ•É…Q•áÑÕÉ”€ô™Õ¹Ñ¥½¸¡ ¤ì(€€€€€É•ÑÕÉ¸µm!tì(€€€ôì(€€€±•Ğ”€ô¹Õ±°ì(€€€™Õ¹Ñ¥½¸Ù”¡ °D¤ì(€€€€€¥˜€¡Œ€ôD¹•ÑY¥•İ•ÉA½Í”¡°ñğÌ¤°À€ôD°Œ€„ôô¹Õ±°¤ì(€€€€€€€½¹ÍĞ‘”€ôŒ¹Ù¥•İÌì(€€€€€€€Ô€„ôô¹Õ±°€˜˜€¡”¹Í•ÑI•¹‘•ÉQ…É•ÑÉ…µ•‰Õ™™•È¡°Ô¹™É…µ•‰Õ™™•È¤°”¹Í•ÑI•¹‘•ÉQ…É•Ğ¡¤¤ì(€€€€€€€±•Ğ±”€ô€„Äì(€€€€€€€‘”¹±•¹Ñ €„ôôÜ¹…µ•É…Ì¹±•¹Ñ €˜˜€¡Ü¹…µ•É…Ì¹±•¹Ñ €ô€À°±”€ô€„À¤ì(€€€€€€€™½È€¡±•Ğ”€ô€Àì”€ğ‘”¹±•¹Ñ ì”¬¬¤ì(€€€€€€€€€½¹ÍĞ%”€ô‘•m•tì(€€€€€€€€€±•Ğ©”€ô¹Õ±°ì(€€€€€€€€€¥˜€¡Ô€„ôô¹Õ±°¤©”€ôÔ¹•ÑY¥•İÁ½ÉĞ¡%”¤ì(€€€€€€€€€•±Í”ì(€€€€€€€€€€€½¹ÍĞ¹Ğ€ô ¹•ÑY¥•İMÕ‰%µ…”¡°%”¤ì(€€€€€€€€€€€©”€ô¹Ğ¹Ù¥•İÁ½ÉĞ°”€ôôô€À€˜˜€¡”¹Í•ÑI•¹‘•ÉQ…É•ÑQ•áÑÕÉ•Ì¡°¹Ğ¹½±½ÉQ•áÑÕÉ”°¹Ğ¹‘•ÁÑ¡MÑ•¹¥±Q•áÑÕÉ”¤°”¹Í•ÑI•¹‘•ÉQ…É•Ğ¡¤¤ì(€€€€€€€€€ô(€€€€€€€€€±•Ğ]”€ô	m•tì(€€€€€€€€€]”€ôôôÙ½¥€À€˜˜€¡]”€ô¹•ÜĞ ¤°]”¹±…å•ÉÌ¹•¹…‰±”¡”¤°]”¹Ù¥•İÁ½ÉĞ€ô¹•Ü¥Ğ ¤°	m•t€ô]”¤°]”¹µ…ÑÉ¥à¹™É½µÉÉ…ä¡%”¹ÑÉ…¹Í™½É´¹µ…ÑÉ¥à¤°]”¹µ…ÑÉ¥à¹‘•½µÁ½Í”¡]”¹Á½Í¥Ñ¥½¸°]”¹ÅÕ…Ñ•É¹¥½¸°]”¹Í…±”¤°]”¹ÁÉ½©•Ñ¥½¹5…ÑÉ¥à¹™É½µÉÉ…ä¡%”¹ÁÉ½©•Ñ¥½¹5…ÑÉ¥à¤°]”¹ÁÉ½©•Ñ¥½¹5…ÑÉ¥á%¹Ù•ÉÍ”¹½Áä¡]”¹ÁÉ½©•Ñ¥½¹5…ÑÉ¥à¤¹¥¹Ù•ÉĞ ¤°]”¹Ù¥•İÁ½ÉĞ¹Í•Ğ¡©”¹à°©”¹ä°©”¹İ¥‘Ñ °©”¹¡•¥¡Ğ¤°”€ôôô€À€˜˜€¡Ü¹µ…ÑÉ¥à¹½Áä¡]”¹µ…ÑÉ¥à¤°Ü¹µ…ÑÉ¥à¹‘•½µÁ½Í”¡Ü¹Á½Í¥Ñ¥½¸°Ü¹ÅÕ…Ñ•É¹¥½¸°Ü¹Í…±”¤¤°±”€ôôô€„À€˜˜Ü¹…µ•É…Ì¹ÁÕÍ ¡]”¤ì(€€€€€€€ô(€€€€€€€½¹ÍĞI”€ô¸¹•¹…‰±•‘•…ÑÕÉ•Ìì(€€€€€€€¥˜€¡I”€˜˜I”¹¥¹±Õ‘•Ì ‰‘•ÁÑ µÍ•¹Í¥¹œˆ¤€˜˜¸¹‘•ÁÑ¡UÍ…”€ôô€‰ÁÔµ½ÁÑ¥µ¥é•ˆ€˜˜Ø¤ì(€€€€€€€€€ €ô¤¹•Ñ	¥¹‘¥¹œ ¤ì(€€€€€€€€€½¹ÍĞ”€ô ¹•Ñ•ÁÑ¡%¹™½Éµ…Ñ¥½¸¡‘•lÁt¤ì(€€€€€€€€€”€˜˜”¹¥ÍY…±¥€˜˜”¹Ñ•áÑÕÉ”€˜˜ˆ¹¥¹¥Ğ¡”°¸¹É•¹‘•ÉMÑ…Ñ”¤ì(€€€€€€€ô(€€€€€€€¥˜€¡I”€˜˜I”¹¥¹±Õ‘•Ì ‰…µ•É„µ…•ÍÌˆ¤€˜˜Ø¤ì(€€€€€€€€€”¹ÍÑ…Ñ”¹Õ¹‰¥¹‘Q•áÑÕÉ” ¤° €ô¤¹•Ñ	¥¹‘¥¹œ ¤ì(€€€€€€€€€™½È€¡±•Ğ”€ô€Àì”€ğ‘”¹±•¹Ñ ì”¬¬¤ì(€€€€€€€€€€€½¹ÍĞ%”€ô‘•m•t¹…µ•É„ì(€€€€€€€€€€€¥˜€¡%”¤ì(€€€€€€€€€€€€€±•Ğ©”€ôµm%•tì(€€€€€€€€€€€€€©”ñğ€¡©”€ô¹•Ü±° ¤°µm%•t€ô©”¤ì(€€€€€€€€€€€€€½¹ÍĞ]”€ô ¹•Ñ…µ•É…%µ…”¡%”¤ì(€€€€€€€€€€€€€©”¹Í½ÕÉ•Q•áÑÕÉ”€ô]”ì(€€€€€€€€€€€ô(€€€€€€€€€ô(€€€€€€€ô(€€€€€ô(€€€€€™½È€¡±•Ğ‘”€ô€Àì‘”€ğ4¹±•¹Ñ ì‘”¬¬¤ì(€€€€€€€½¹ÍĞ±”€ôm‘•t°I”€ô5m‘•tì(€€€€€€€±”€„ôô¹Õ±°€˜˜I”€„ôôÙ½¥€À€˜˜I”¹ÕÁ‘…Ñ”¡±”°D°°ñğÌ¤ì(€€€€€ô(€€€€€”€˜˜”¡ °D¤°D¹‘•Ñ•Ñ•‘A±…¹•Ì€˜˜¤¹‘¥ÍÁ…Ñ¡Ù•¹Ğ¡ì(€€€€€€€ÑåÁ”è€‰Á±…¹•Í‘•Ñ•Ñ•ˆ°(€€€€€€€‘…Ñ„èD(€€€€€ô¤°À€ô¹Õ±°ì(€€€ô(€€€½¹ÍĞå”€ô¹•ÜÙ° ¤ì(€€€å”¹Í•Ñ¹¥µ…Ñ¥½¹1½½À¡Ù”¤°Ñ¡¥Ì¹Í•Ñ¹¥µ…Ñ¥½¹1½½À€ô™Õ¹Ñ¥½¸¡ ¤ì(€€€€€”€ô ì(€€€ô°Ñ¡¥Ì¹‘¥ÍÁ½Í”€ô™Õ¹Ñ¥½¸ ¤ì(€€€ôì(€ô)ô°İ˜€ô€¼¨}}AUI}|€¨¼¹•Ü” ¤°Q°€ô€¼¨}}AUI}|€¨¼¹•Ü” ¤ì)Q°¹Í•Ğ ´Ä°€À°€À°€À°€Ä°€À°€À°€À°€Ä¤ì)™Õ¹Ñ¥½¸˜¡”°Ğ¤ì(€™Õ¹Ñ¥½¸¤¡´°˜¤ì(€€€´¹µ…ÑÉ¥áÕÑ½UÁ‘…Ñ”€ôôô€„À€˜˜´¹ÕÁ‘…Ñ•5…ÑÉ¥à ¤°˜¹Ù…±Õ”¹½Áä¡´¹µ…ÑÉ¥à¤ì(€ô(€™Õ¹Ñ¥½¸¸¡´°˜¤ì(€€€˜¹½±½È¹•ÑI¡´¹™½½±½È¹Ù…±Õ”°™°¡”¤¤°˜¹¥Í½œ€ü€¡´¹™½9•…È¹Ù…±Õ”€ô˜¹¹•…È°´¹™½…È¹Ù…±Õ”€ô˜¹™…È¤€è˜¹¥Í½áÀÈ€˜˜€¡´¹™½•¹Í¥Ñä¹Ù…±Õ”€ô˜¹‘•¹Í¥Ñä¤ì(€ô(€™Õ¹Ñ¥½¸È¡´°˜°P°°4¤ì(€€€˜¹¥Í9½‘•5…Ñ•É¥…°€ü˜¹Õ¹¥™½ÉµÍ9••‘UÁ‘…Ñ”€ô€„Ä€è˜¹¥Í5•Í¡	…Í¥5…Ñ•É¥…°€üÌ¡´°˜¤€è˜¹¥Í5•Í¡1…µ‰•ÉÑ5…Ñ•É¥…°€ü€¡Ì¡´°˜¤°˜¹•¹Ù5…À€˜˜€¡´¹•¹Ù5…Á%¹Ñ•¹Í¥Ñä¹Ù…±Õ”€ô˜¹•¹Ù5…Á%¹Ñ•¹Í¥Ñä¤¤€è˜¹¥Í5•Í¡Q½½¹5…Ñ•É¥…°€ü€¡Ì¡´°˜¤°¡´°˜¤¤€è˜¹¥Í5•Í¡A¡½¹5…Ñ•É¥…°€ü€¡Ì¡´°˜¤° ¡´°˜¤°˜¹•¹Ù5…À€˜˜€¡´¹•¹Ù5…Á%¹Ñ•¹Í¥Ñä¹Ù…±Õ”€ô˜¹•¹Ù5…Á%¹Ñ•¹Í¥Ñä¤¤€è˜¹¥Í5•Í¡MÑ…¹‘…É‘5…Ñ•É¥…°€ü€¡Ì¡´°˜¤°Ô¡´°˜¤°˜¹¥Í5•Í¡A¡åÍ¥…±5…Ñ•É¥…°€˜˜À¡´°˜°4¤¤€è˜¹¥Í5•Í¡5…Ñ…Á5…Ñ•É¥…°€ü€¡Ì¡´°˜¤°Ø¡´°˜¤¤€è˜¹¥Í5•Í¡•ÁÑ¡5…Ñ•É¥…°€üÌ¡´°˜¤€è˜¹¥Í5•Í¡¥ÍÑ…¹•5…Ñ•É¥…°€ü€¡Ì¡´°˜¤°ˆ¡´°˜¤¤€è˜¹¥Í5•Í¡9½Éµ…±5…Ñ•É¥…°€üÌ¡´°˜¤€è˜¹¥Í1¥¹•	…Í¥5…Ñ•É¥…°€ü€¡„¡´°˜¤°˜¹¥Í1¥¹•…Í¡•‘5…Ñ•É¥…°€˜˜¼¡´°˜¤¤€è˜¹¥ÍA½¥¹ÑÍ5…Ñ•É¥…°€ü°¡´°˜°P°¤€è˜¹¥ÍMÁÉ¥Ñ•5…Ñ•É¥…°€üŒ¡´°˜¤€è˜¹¥ÍM¡…‘½İ5…Ñ•É¥…°€ü€¡´¹½±½È¹Ù…±Õ”¹½Áä¡˜¹½±½È¤°´¹½Á…¥Ñä¹Ù…±Õ”€ô˜¹½Á…¥Ñä¤€è˜¹¥ÍM¡…‘•É5…Ñ•É¥…°€˜˜€¡˜¹Õ¹¥™½ÉµÍ9••‘UÁ‘…Ñ”€ô€„Ä¤ì(€ô(€™Õ¹Ñ¥½¸Ì¡´°˜¤ì(€€€´¹½Á…¥Ñä¹Ù…±Õ”€ô˜¹½Á…¥Ñä°˜¹½±½È€˜˜´¹‘¥™™ÕÍ”¹Ù…±Õ”¹½Áä¡˜¹½±½È¤°˜¹•µ¥ÍÍ¥Ù”€˜˜´¹•µ¥ÍÍ¥Ù”¹Ù…±Õ”¹½Áä¡˜¹•µ¥ÍÍ¥Ù”¤¹µÕ±Ñ¥Á±åM…±…È¡˜¹•µ¥ÍÍ¥Ù•%¹Ñ•¹Í¥Ñä¤°˜¹µ…À€˜˜€¡´¹µ…À¹Ù…±Õ”€ô˜¹µ…À°¤¡˜¹µ…À°´¹µ…ÁQÉ…¹Í™½É´¤¤°˜¹…±Á¡…5…À€˜˜€¡´¹…±Á¡…5…À¹Ù…±Õ”€ô˜¹…±Á¡…5…À°¤¡˜¹…±Á¡…5…À°´¹…±Á¡…5…ÁQÉ…¹Í™½É´¤¤°˜¹‰ÕµÁ5…À€˜˜€¡´¹‰ÕµÁ5…À¹Ù…±Õ”€ô˜¹‰ÕµÁ5…À°¤¡˜¹‰ÕµÁ5…À°´¹‰ÕµÁ5…ÁQÉ…¹Í™½É´¤°´¹‰ÕµÁM…±”¹Ù…±Õ”€ô˜¹‰ÕµÁM…±”°˜¹Í¥‘”€ôôô€Ä€˜˜€¡´¹‰ÕµÁM…±”¹Ù…±Õ”€¨ô€´Ä¤¤°˜¹¹½Éµ…±5…À€˜˜€¡´¹¹½Éµ…±5…À¹Ù…±Õ”€ô˜¹¹½Éµ…±5…À°¤¡˜¹¹½Éµ…±5…À°´¹¹½Éµ…±5…ÁQÉ…¹Í™½É´¤°´¹¹½Éµ…±M…±”¹Ù…±Õ”¹½Áä¡˜¹¹½Éµ…±M…±”¤°˜¹Í¥‘”€ôôô€Ä€˜˜´¹¹½Éµ…±M…±”¹Ù…±Õ”¹¹•…Ñ” ¤¤°˜¹‘¥ÍÁ±…•µ•¹Ñ5…À€˜˜€¡´¹‘¥ÍÁ±…•µ•¹Ñ5…À¹Ù…±Õ”€ô˜¹‘¥ÍÁ±…•µ•¹Ñ5…À°¤¡˜¹‘¥ÍÁ±…•µ•¹Ñ5…À°´¹‘¥ÍÁ±…•µ•¹Ñ5…ÁQÉ…¹Í™½É´¤°´¹‘¥ÍÁ±…•µ•¹ÑM…±”¹Ù…±Õ”€ô˜¹‘¥ÍÁ±…•µ•¹ÑM…±”°´¹‘¥ÍÁ±…•µ•¹Ñ	¥…Ì¹Ù…±Õ”€ô˜¹‘¥ÍÁ±…•µ•¹Ñ	¥…Ì¤°˜¹•µ¥ÍÍ¥Ù•5…À€˜˜€¡´¹•µ¥ÍÍ¥Ù•5…À¹Ù…±Õ”€ô˜¹•µ¥ÍÍ¥Ù•5…À°¤¡˜¹•µ¥ÍÍ¥Ù•5…À°´¹•µ¥ÍÍ¥Ù•5…ÁQÉ…¹Í™½É´¤¤°˜¹ÍÁ•Õ±…É5…À€˜˜€¡´¹ÍÁ•Õ±…É5…À¹Ù…±Õ”€ô˜¹ÍÁ•Õ±…É5…À°¤¡˜¹ÍÁ•Õ±…É5…À°´¹ÍÁ•Õ±…É5…ÁQÉ…¹Í™½É´¤¤°˜¹…±Á¡…Q•ÍĞ€ø€À€˜˜€¡´¹…±Á¡…Q•ÍĞ¹Ù…±Õ”€ô˜¹…±Á¡…Q•ÍĞ¤ì(€€€½¹ÍĞP€ôĞ¹•Ğ¡˜¤°€ôP¹•¹Ù5…À°4€ôP¹•¹Ù5…ÁI½Ñ…Ñ¥½¸ì(€€€€˜˜€¡´¹•¹Ù5…À¹Ù…±Õ”€ô°´¹•¹Ù5…ÁI½Ñ…Ñ¥½¸¹Ù…±Õ”¹Í•ÑÉ½µ5…ÑÉ¥àĞ¡İ˜¹µ…­•I½Ñ…Ñ¥½¹É½µÕ±•È¡4¤¤¹ÑÉ…¹ÍÁ½Í” ¤°¹¥ÍÕ‰•Q•áÑÕÉ”€˜˜¹¥ÍI•¹‘•ÉQ…É•ÑQ•áÑÕÉ”€ôôô€„Ä€˜˜´¹•¹Ù5…ÁI½Ñ…Ñ¥½¸¹Ù…±Õ”¹ÁÉ•µÕ±Ñ¥Á±ä¡Q°¤°´¹É•™±•Ñ¥Ù¥Ñä¹Ù…±Õ”€ô˜¹É•™±•Ñ¥Ù¥Ñä°´¹¥½È¹Ù…±Õ”€ô˜¹¥½È°´¹É•™É…Ñ¥½¹I…Ñ¥¼¹Ù…±Õ”€ô˜¹É•™É…Ñ¥½¹I…Ñ¥¼¤°˜¹±¥¡Ñ5…À€˜˜€¡´¹±¥¡Ñ5…À¹Ù…±Õ”€ô˜¹±¥¡Ñ5…À°´¹±¥¡Ñ5…Á%¹Ñ•¹Í¥Ñä¹Ù…±Õ”€ô˜¹±¥¡Ñ5…Á%¹Ñ•¹Í¥Ñä°¤¡˜¹±¥¡Ñ5…À°´¹±¥¡Ñ5…ÁQÉ…¹Í™½É´¤¤°˜¹…½5…À€˜˜€¡´¹…½5…À¹Ù…±Õ”€ô˜¹…½5…À°´¹…½5…Á%¹Ñ•¹Í¥Ñä¹Ù…±Õ”€ô˜¹…½5…Á%¹Ñ•¹Í¥Ñä°¤¡˜¹…½5…À°´¹…½5…ÁQÉ…¹Í™½É´¤¤ì(€ô(€™Õ¹Ñ¥½¸„¡´°˜¤ì(€€€´¹‘¥™™ÕÍ”¹Ù…±Õ”¹½Áä¡˜¹½±½È¤°´¹½Á…¥Ñä¹Ù…±Õ”€ô˜¹½Á…¥Ñä°˜¹µ…À€˜˜€¡´¹µ…À¹Ù…±Õ”€ô˜¹µ…À°¤¡˜¹µ…À°´¹µ…ÁQÉ…¹Í™½É´¤¤ì(€ô(€™Õ¹Ñ¥½¸¼¡´°˜¤ì(€€€´¹‘…Í¡M¥é”¹Ù…±Õ”€ô˜¹‘…Í¡M¥é”°´¹Ñ½Ñ…±M¥é”¹Ù…±Õ”€ô˜¹‘…Í¡M¥é”€¬˜¹…ÁM¥é”°´¹Í…±”¹Ù…±Õ”€ô˜¹Í…±”ì(€ô(€™Õ¹Ñ¥½¸°¡´°˜°P°¤ì(€€€´¹‘¥™™ÕÍ”¹Ù…±Õ”¹½Áä¡˜¹½±½È¤°´¹½Á…¥Ñä¹Ù…±Õ”€ô˜¹½Á…¥Ñä°´¹Í¥é”¹Ù…±Õ”€ô˜¹Í¥é”€¨P°´¹Í…±”¹Ù…±Õ”€ô€¨€À¸Ô°˜¹µ…À€˜˜€¡´¹µ…À¹Ù…±Õ”€ô˜¹µ…À°¤¡˜¹µ…À°´¹ÕÙQÉ…¹Í™½É´¤¤°˜¹…±Á¡…5…À€˜˜€¡´¹…±Á¡…5…À¹Ù…±Õ”€ô˜¹…±Á¡…5…À°¤¡˜¹…±Á¡…5…À°´¹…±Á¡…5…ÁQÉ…¹Í™½É´¤¤°˜¹…±Á¡…Q•ÍĞ€ø€À€˜˜€¡´¹…±Á¡…Q•ÍĞ¹Ù…±Õ”€ô˜¹…±Á¡…Q•ÍĞ¤ì(€ô(€™Õ¹Ñ¥½¸Œ¡´°˜¤ì(€€€´¹‘¥™™ÕÍ”¹Ù…±Õ”¹½Áä¡˜¹½±½È¤°´¹½Á…¥Ñä¹Ù…±Õ”€ô˜¹½Á…¥Ñä°´¹É½Ñ…Ñ¥½¸¹Ù…±Õ”€ô˜¹É½Ñ…Ñ¥½¸°˜¹µ…À€˜˜€¡´¹µ…À¹Ù…±Õ”€ô˜¹µ…À°¤¡˜¹µ…À°´¹µ…ÁQÉ…¹Í™½É´¤¤°˜¹…±Á¡…5…À€˜˜€¡´¹…±Á¡…5…À¹Ù…±Õ”€ô˜¹…±Á¡…5…À°¤¡˜¹…±Á¡…5…À°´¹…±Á¡…5…ÁQÉ…¹Í™½É´¤¤°˜¹…±Á¡…Q•ÍĞ€ø€À€˜˜€¡´¹…±Á¡…Q•ÍĞ¹Ù…±Õ”€ô˜¹…±Á¡…Q•ÍĞ¤ì(€ô(€™Õ¹Ñ¥½¸ ¡´°˜¤ì(€€€´¹ÍÁ•Õ±…È¹Ù…±Õ”¹½Áä¡˜¹ÍÁ•Õ±…È¤°´¹Í¡¥¹¥¹•ÍÌ¹Ù…±Õ”€ô5…Ñ ¹µ…à¡˜¹Í¡¥¹¥¹•ÍÌ°€Å”´Ğ¤ì(€ô(€™Õ¹Ñ¥½¸¡´°˜¤ì(€€€˜¹É…‘¥•¹Ñ5…À€˜˜€¡´¹É…‘¥•¹Ñ5…À¹Ù…±Õ”€ô˜¹É…‘¥•¹Ñ5…À¤ì(€ô(€™Õ¹Ñ¥½¸Ô¡´°˜¤ì(€€€´¹µ•Ñ…±¹•ÍÌ¹Ù…±Õ”€ô˜¹µ•Ñ…±¹•ÍÌ°˜¹µ•Ñ…±¹•ÍÍ5…À€˜˜€¡´¹µ•Ñ…±¹•ÍÍ5…À¹Ù…±Õ”€ô˜¹µ•Ñ…±¹•ÍÍ5…À°¤¡˜¹µ•Ñ…±¹•ÍÍ5…À°´¹µ•Ñ…±¹•ÍÍ5…ÁQÉ…¹Í™½É´¤¤°´¹É½Õ¡¹•ÍÌ¹Ù…±Õ”€ô˜¹É½Õ¡¹•ÍÌ°˜¹É½Õ¡¹•ÍÍ5…À€˜˜€¡´¹É½Õ¡¹•ÍÍ5…À¹Ù…±Õ”€ô˜¹É½Õ¡¹•ÍÍ5…À°¤¡˜¹É½Õ¡¹•ÍÍ5…À°´¹É½Õ¡¹•ÍÍ5…ÁQÉ…¹Í™½É´¤¤°˜¹•¹Ù5…À€˜˜€¡´¹•¹Ù5…Á%¹Ñ•¹Í¥Ñä¹Ù…±Õ”€ô˜¹•¹Ù5…Á%¹Ñ•¹Í¥Ñä¤ì(€ô(€™Õ¹Ñ¥½¸À¡´°˜°P¤ì(€€€´¹¥½È¹Ù…±Õ”€ô˜¹¥½È°˜¹Í¡••¸€ø€À€˜˜€¡´¹Í¡••¹½±½È¹Ù…±Õ”¹½Áä¡˜¹Í¡••¹½±½È¤¹µÕ±Ñ¥Á±åM…±…È¡˜¹Í¡••¸¤°´¹Í¡••¹I½Õ¡¹•ÍÌ¹Ù…±Õ”€ô˜¹Í¡••¹I½Õ¡¹•ÍÌ°˜¹Í¡••¹½±½É5…À€˜˜€¡´¹Í¡••¹½±½É5…À¹Ù…±Õ”€ô˜¹Í¡••¹½±½É5…À°¤¡˜¹Í¡••¹½±½É5…À°´¹Í¡••¹½±½É5…ÁQÉ…¹Í™½É´¤¤°˜¹Í¡••¹I½Õ¡¹•ÍÍ5…À€˜˜€¡´¹Í¡••¹I½Õ¡¹•ÍÍ5…À¹Ù…±Õ”€ô˜¹Í¡••¹I½Õ¡¹•ÍÍ5…À°¤¡˜¹Í¡••¹I½Õ¡¹•ÍÍ5…À°´¹Í¡••¹I½Õ¡¹•ÍÍ5…ÁQÉ…¹Í™½É´¤¤¤°˜¹±•…É½…Ğ€ø€À€˜˜€¡´¹±•…É½…Ğ¹Ù…±Õ”€ô˜¹±•…É½…Ğ°´¹±•…É½…ÑI½Õ¡¹•ÍÌ¹Ù…±Õ”€ô˜¹±•…É½…ÑI½Õ¡¹•ÍÌ°˜¹±•…É½…Ñ5…À€˜˜€¡´¹±•…É½…Ñ5…À¹Ù…±Õ”€ô˜¹±•…É½…Ñ5…À°¤¡˜¹±•…É½…Ñ5…À°´¹±•…É½…Ñ5…ÁQÉ…¹Í™½É´¤¤°˜¹±•…É½…ÑI½Õ¡¹•ÍÍ5…À€˜˜€¡´¹±•…É½…ÑI½Õ¡¹•ÍÍ5…À¹Ù…±Õ”€ô˜¹±•…É½…ÑI½Õ¡¹•ÍÍ5…À°¤¡˜¹±•…É½…ÑI½Õ¡¹•ÍÍ5…À°´¹±•…É½…ÑI½Õ¡¹•ÍÍ5…ÁQÉ…¹Í™½É´¤¤°˜¹±•…É½…Ñ9½Éµ…±5…À€˜˜€¡´¹±•…É½…Ñ9½Éµ…±5…À¹Ù…±Õ”€ô˜¹±•…É½…Ñ9½Éµ…±5…À°¤¡˜¹±•…É½…Ñ9½Éµ…±5…À°´¹±•…É½…Ñ9½Éµ…±5…ÁQÉ…¹Í™½É´¤°´¹±•…É½…Ñ9½Éµ…±M…±”¹Ù…±Õ”¹½Áä¡˜¹±•…É½…Ñ9½Éµ…±M…±”¤°˜¹Í¥‘”€ôôô€Ä€˜˜´¹±•…É½…Ñ9½Éµ…±M…±”¹Ù…±Õ”¹¹•…Ñ” ¤¤¤°˜¹‘¥ÍÁ•ÉÍ¥½¸€ø€À€˜˜€¡´¹‘¥ÍÁ•ÉÍ¥½¸¹Ù…±Õ”€ô˜¹‘¥ÍÁ•ÉÍ¥½¸¤°˜¹¥É¥‘•Í•¹”€ø€À€˜˜€¡´¹¥É¥‘•Í•¹”¹Ù…±Õ”€ô˜¹¥É¥‘•Í•¹”°´¹¥É¥‘•Í•¹•%=H¹Ù…±Õ”€ô˜¹¥É¥‘•Í•¹•%=H°´¹¥É¥‘•Í•¹•Q¡¥­¹•ÍÍ5¥¹¥µÕ´¹Ù…±Õ”€ô˜¹¥É¥‘•Í•¹•Q¡¥­¹•ÍÍI…¹•lÁt°´¹¥É¥‘•Í•¹•Q¡¥­¹•ÍÍ5…á¥µÕ´¹Ù…±Õ”€ô˜¹¥É¥‘•Í•¹•Q¡¥­¹•ÍÍI…¹•lÅt°˜¹¥É¥‘•Í•¹•5…À€˜˜€¡´¹¥É¥‘•Í•¹•5…À¹Ù…±Õ”€ô˜¹¥É¥‘•Í•¹•5…À°¤¡˜¹¥É¥‘•Í•¹•5…À°´¹¥É¥‘•Í•¹•5…ÁQÉ…¹Í™½É´¤¤°˜¹¥É¥‘•Í•¹•Q¡¥­¹•ÍÍ5…À€˜˜€¡´¹¥É¥‘•Í•¹•Q¡¥­¹•ÍÍ5…À¹Ù…±Õ”€ô˜¹¥É¥‘•Í•¹•Q¡¥­¹•ÍÍ5…À°¤¡˜¹¥É¥‘•Í•¹•Q¡¥­¹•ÍÍ5…À°´¹¥É¥‘•Í•¹•Q¡¥­¹•ÍÍ5…ÁQÉ…¹Í™½É´¤¤¤°˜¹ÑÉ…¹Íµ¥ÍÍ¥½¸€ø€À€˜˜€¡´¹ÑÉ…¹Íµ¥ÍÍ¥½¸¹Ù…±Õ”€ô˜¹ÑÉ…¹Íµ¥ÍÍ¥½¸°´¹ÑÉ…¹Íµ¥ÍÍ¥½¹M…µÁ±•É5…À¹Ù…±Õ”€ôP¹Ñ•áÑÕÉ”°´¹ÑÉ…¹Íµ¥ÍÍ¥½¹M…µÁ±•ÉM¥é”¹Ù…±Õ”¹Í•Ğ¡P¹İ¥‘Ñ °P¹¡•¥¡Ğ¤°˜¹ÑÉ…¹Íµ¥ÍÍ¥½¹5…À€˜˜€¡´¹ÑÉ…¹Íµ¥ÍÍ¥½¹5…À¹Ù…±Õ”€ô˜¹ÑÉ…¹Íµ¥ÍÍ¥½¹5…À°¤¡˜¹ÑÉ…¹Íµ¥ÍÍ¥½¹5…À°´¹ÑÉ…¹Íµ¥ÍÍ¥½¹5…ÁQÉ…¹Í™½É´¤¤°´¹Ñ¡¥­¹•ÍÌ¹Ù…±Õ”€ô˜¹Ñ¡¥­¹•ÍÌ°˜¹Ñ¡¥­¹•ÍÍ5…À€˜˜€¡´¹Ñ¡¥­¹•ÍÍ5…À¹Ù…±Õ”€ô˜¹Ñ¡¥­¹•ÍÍ5…À°¤¡˜¹Ñ¡¥­¹•ÍÍ5…À°´¹Ñ¡¥­¹•ÍÍ5…ÁQÉ…¹Í™½É´¤¤°´¹…ÑÑ•¹Õ…Ñ¥½¹¥ÍÑ…¹”¹Ù…±Õ”€ô˜¹…ÑÑ•¹Õ…Ñ¥½¹¥ÍÑ…¹”°´¹…ÑÑ•¹Õ…Ñ¥½¹½±½È¹Ù…±Õ”¹½Áä¡˜¹…ÑÑ•¹Õ…Ñ¥½¹½±½È¤¤°˜¹…¹¥Í½ÑÉ½Áä€ø€À€˜˜€¡´¹…¹¥Í½ÑÉ½ÁåY•Ñ½È¹Ù…±Õ”¹Í•Ğ¡˜¹…¹¥Í½ÑÉ½Áä€¨5…Ñ ¹½Ì¡˜¹…¹¥Í½ÑÉ½ÁåI½Ñ…Ñ¥½¸¤°˜¹…¹¥Í½ÑÉ½Áä€¨5…Ñ ¹Í¥¸¡˜¹…¹¥Í½ÑÉ½ÁåI½Ñ…Ñ¥½¸¤¤°˜¹…¹¥Í½ÑÉ½Áå5…À€˜˜€¡´¹…¹¥Í½ÑÉ½Áå5…À¹Ù…±Õ”€ô˜¹…¹¥Í½ÑÉ½Áå5…À°¤¡˜¹…¹¥Í½ÑÉ½Áå5…À°´¹…¹¥Í½ÑÉ½Áå5…ÁQÉ…¹Í™½É´¤¤¤°´¹ÍÁ•Õ±…É%¹Ñ•¹Í¥Ñä¹Ù…±Õ”€ô˜¹ÍÁ•Õ±…É%¹Ñ•¹Í¥Ñä°´¹ÍÁ•Õ±…É½±½È¹Ù…±Õ”¹½Áä¡˜¹ÍÁ•Õ±…É½±½È¤°˜¹ÍÁ•Õ±…É½±½É5…À€˜˜€¡´¹ÍÁ•Õ±…É½±½É5…À¹Ù…±Õ”€ô˜¹ÍÁ•Õ±…É½±½É5…À°¤¡˜¹ÍÁ•Õ±…É½±½É5…À°´¹ÍÁ•Õ±…É½±½É5…ÁQÉ…¹Í™½É´¤¤°˜¹ÍÁ•Õ±…É%¹Ñ•¹Í¥Ñå5…À€˜˜€¡´¹ÍÁ•Õ±…É%¹Ñ•¹Í¥Ñå5…À¹Ù…±Õ”€ô˜¹ÍÁ•Õ±…É%¹Ñ•¹Í¥Ñå5…À°¤¡˜¹ÍÁ•Õ±…É%¹Ñ•¹Í¥Ñå5…À°´¹ÍÁ•Õ±…É%¹Ñ•¹Í¥Ñå5…ÁQÉ…¹Í™½É´¤¤ì(€ô(€™Õ¹Ñ¥½¸Ø¡´°˜¤ì(€€€˜¹µ…Ñ…À€˜˜€¡´¹µ…Ñ…À¹Ù…±Õ”€ô˜¹µ…Ñ…À¤ì(€ô(€™Õ¹Ñ¥½¸ˆ¡´°˜¤ì(€€€½¹ÍĞP€ôĞ¹•Ğ¡˜¤¹±¥¡Ğì(€€€´¹É•™•É•¹•A½Í¥Ñ¥½¸¹Ù…±Õ”¹Í•ÑÉ½µ5…ÑÉ¥áA½Í¥Ñ¥½¸¡P¹µ…ÑÉ¥á]½É±¤°´¹¹•…É¥ÍÑ…¹”¹Ù…±Õ”€ôP¹Í¡…‘½Ü¹…µ•É„¹¹•…È°´¹™…É¥ÍÑ…¹”¹Ù…±Õ”€ôP¹Í¡…‘½Ü¹…µ•É„¹™…Èì(€ô(€É•ÑÕÉ¸ì(€€€É•™É•Í¡½U¹¥™½ÉµÌè¸°(€€€É•™É•Í¡5…Ñ•É¥…±U¹¥™½ÉµÌèÈ(€ôì)ô)™Õ¹Ñ¥½¸A˜¡”°Ğ°¤°¸¤ì(€±•ĞÈ€ôíô°Ì€ôíô°„€ômtì(€½¹ÍĞ¼€ô”¹•ÑA…É…µ•Ñ•È¡”¹5a}U9%=I5}	UI}	%9%9L¤ì(€™Õ¹Ñ¥½¸°¡4°¤ì(€€€½¹ÍĞH€ô¹ÁÉ½É…´ì(€€€¸¹Õ¹¥™½Éµ	±½­	¥¹‘¥¹œ¡4°H¤ì(€ô(€™Õ¹Ñ¥½¸Œ¡4°¤ì(€€€±•ĞH€ôÉm4¹¥‘tì(€€€H€ôôôÙ½¥€À€˜˜€¡´¡4¤°H€ô ¡4¤°Ém4¹¥‘t€ôH°4¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰‘¥ÍÁ½Í”ˆ°P¤¤ì(€€€½¹ÍĞ€ô¹ÁÉ½É…´ì(€€€¸¹ÕÁ‘…Ñ•U	=5…ÁÁ¥¹œ¡4°¤ì(€€€½¹ÍĞœ€ôĞ¹É•¹‘•È¹™É…µ”ì(€€€Ím4¹¥‘t€„ôôœ€˜˜€¡Ô¡4¤°Ím4¹¥‘t€ôœ¤ì(€ô(€™Õ¹Ñ¥½¸ ¡4¤ì(€€€½¹ÍĞ€ô ¤ì(€€€4¹}}‰¥¹‘¥¹A½¥¹Ñ%¹‘•à€ôì(€€€½¹ÍĞH€ô”¹É•…Ñ•	Õ™™•È ¤°€ô4¹}}Í¥é”°œ€ô4¹ÕÍ…”ì(€€€É•ÑÕÉ¸”¹‰¥¹‘	Õ™™•È¡”¹U9%=I5}	UH°H¤°”¹‰Õ™™•É…Ñ„¡”¹U9%=I5}	UH°°œ¤°”¹‰¥¹‘	Õ™™•È¡”¹U9%=I5}	UH°¹Õ±°¤°”¹‰¥¹‘	Õ™™•É	…Í”¡”¹U9%=I5}	UH°°H¤°Hì(€ô(€™Õ¹Ñ¥½¸ ¤ì(€€€™½È€¡±•Ğ4€ô€Àì4€ğ¼ì4¬¬¤¥˜€¡„¹¥¹‘•á=˜¡4¤€ôôô€´Ä¤(€€€€€É•ÑÕÉ¸„¹ÁÕÍ ¡4¤°4ì(€€€É•ÑÕÉ¸1” ‰]•‰1I•¹‘•É•Èè5…á¥µÕ´¹Õµ‰•È½˜Í¥µÕ±Ñ…¹•½ÕÍ±äÕÍ…‰±”Õ¹¥™½ÉµÌÉ½ÕÁÌÉ•…¡•¸ˆ¤°€Àì(€ô(€™Õ¹Ñ¥½¸Ô¡4¤ì(€€€½¹ÍĞ€ôÉm4¹¥‘t°H€ô4¹Õ¹¥™½ÉµÌ°€ô4¹}}…¡”ì(€€€”¹‰¥¹‘	Õ™™•È¡”¹U9%=I5}	UH°¤ì(€€€™½È€¡±•Ğœ€ô€À°ä€ôH¹±•¹Ñ ìœ€ğäìœ¬¬¤ì(€€€€€½¹ÍĞ€ôImtì(€€€€€¥˜€¡ÉÉ…ä¹¥ÍÉÉ…ä¡¤¤™½È€¡±•ĞÜ€ô€À°¬€ô¹±•¹Ñ ìÜ€ğ¬ìÜ¬¬¤À¡	mİt°œ°Ü°¤ì(€€€€€•±Í”À¡°œ°€À°¤ì(€€€ô(€€€”¹‰¥¹‘	Õ™™•È¡”¹U9%=I5}	UH°¹Õ±°¤ì(€ô(€™Õ¹Ñ¥½¸À¡4°°H°¤ì(€€€¥˜€¡ˆ¡4°°H°¤€ôôô€„À¤ì(€€€€€½¹ÍĞœ€ô4¹}}½™™Í•Ğ°ä€ô4¹Ù…±Õ”ì(€€€€€¥˜€¡ÉÉ…ä¹¥ÍÉÉ…ä¡ä¤¤ì(€€€€€€€±•Ğ€ô€Àì(€€€€€€€™½È€¡±•ĞÜ€ô€ÀìÜ€ğä¹±•¹Ñ ìÜ¬¬¤ì(€€€€€€€€€½¹ÍĞ¬€ôåmİt°`€ô˜¡¬¤ì(€€€€€€€€€Ø¡¬°4¹}}‘…Ñ„°¤°ÑåÁ•½˜¬€„ô€‰¹Õµ‰•Èˆ€˜˜ÑåÁ•½˜¬€„ô€‰‰½½±•…¸ˆ€˜˜€…¬¹¥Í5…ÑÉ¥àÌ€˜˜€…ÉÉ…å	Õ™™•È¹¥ÍY¥•Ü¡¬¤€˜˜€¡€¬ô`¹ÍÑ½É…”€¼±½…ĞÌÉÉÉ…ä¹	eQM}AI}159P¤ì(€€€€€€€ô(€€€€€ô•±Í”Ø¡ä°4¹}}‘…Ñ„°€À¤ì(€€€€€”¹‰Õ™™•ÉMÕ‰…Ñ„¡”¹U9%=I5}	UH°œ°4¹}}‘…Ñ„¤ì(€€€ô(€ô(€™Õ¹Ñ¥½¸Ø¡4°°H¤ì(€€€ÑåÁ•½˜4€ôô€‰¹Õµ‰•ÈˆñğÑåÁ•½˜4€ôô€‰‰½½±•…¸ˆ€ülÁt€ô4€è4¹¥Í5…ÑÉ¥àÌ€ü€¡lÁt€ô4¹•±•µ•¹ÑÍlÁt°lÅt€ô4¹•±•µ•¹ÑÍlÅt°lÉt€ô4¹•±•µ•¹ÑÍlÉt°lÍt€ô€À°lÑt€ô4¹•±•µ•¹ÑÍlÍt°lÕt€ô4¹•±•µ•¹ÑÍlÑt°lÙt€ô4¹•±•µ•¹ÑÍlÕt°lİt€ô€À°lát€ô4¹•±•µ•¹ÑÍlÙt°låt€ô4¹•±•µ•¹ÑÍlİt°lÄÁt€ô4¹•±•µ•¹ÑÍlát°lÄÅt€ô€À¤€èÉÉ…å	Õ™™•È¹¥ÍY¥•Ü¡4¤€ü¹Í•Ğ¡¹•Ü4¹½¹ÍÑÉÕÑ½È¡4¹‰Õ™™•È°4¹‰åÑ•=™™Í•Ğ°¹±•¹Ñ ¤¤€è4¹Ñ½ÉÉ…ä¡°H¤ì(€ô(€™Õ¹Ñ¥½¸ˆ¡4°°H°¤ì(€€€½¹ÍĞœ€ô4¹Ù…±Õ”°ä€ô€¬€‰|ˆ€¬Hì(€€€¥˜€¡måt€ôôôÙ½¥€À¤(€€€€€É•ÑÕÉ¸ÑåÁ•½˜œ€ôô€‰¹Õµ‰•ÈˆñğÑåÁ•½˜œ€ôô€‰‰½½±•…¸ˆ€ümåt€ôœ€èÉÉ…å	Õ™™•È¹¥ÍY¥•Ü¡œ¤€ümåt€ôœ¹Í±¥” ¤€èmåt€ôœ¹±½¹” ¤°€„Àì(€€€ì(€€€€€½¹ÍĞ€ômåtì(€€€€€¥˜€¡ÑåÁ•½˜œ€ôô€‰¹Õµ‰•ÈˆñğÑåÁ•½˜œ€ôô€‰‰½½±•…¸ˆ¤ì(€€€€€€€¥˜€¡€„ôôœ¤(€€€€€€€€€É•ÑÕÉ¸måt€ôœ°€„Àì(€€€€€ô•±Í”ì(€€€€€€€¥˜€¡ÉÉ…å	Õ™™•È¹¥ÍY¥•Ü¡œ¤¤É•ÑÕÉ¸€„Àì(€€€€€€€¥˜€¡¹•ÅÕ…±Ì¡œ¤€ôôô€„Ä¤(€€€€€€€€€É•ÑÕÉ¸¹½Áä¡œ¤°€„Àì(€€€€€ô(€€€ô(€€€É•ÑÕÉ¸€„Äì(€ô(€™Õ¹Ñ¥½¸´¡4¤ì(€€€½¹ÍĞ€ô4¹Õ¹¥™½ÉµÌì(€€€±•ĞH€ô€Àì(€€€½¹ÍĞ€ô€ÄØì(€€€™½È€¡±•Ğä€ô€À°€ô¹±•¹Ñ ìä€ğìä¬¬¤ì(€€€€€½¹ÍĞÜ€ôÉÉ…ä¹¥ÍÉÉ…ä¡måt¤€ümåt€èmmåutì(€€€€€™½È€¡±•Ğ¬€ô€À°`€ôÜ¹±•¹Ñ ì¬€ğ`ì¬¬¬¤ì(€€€€€€€½¹ÍĞÄ€ôİm­t°€ôÉÉ…ä¹¥ÍÉÉ…ä¡Ä¹Ù…±Õ”¤€üÄ¹Ù…±Õ”€èmÄ¹Ù…±Õ•tì(€€€€€€€™½È€¡±•Ğ,€ô€À°<€ô¹±•¹Ñ ì,€ğ<ì,¬¬¤ì(€€€€€€€€€½¹ÍĞÑ”€ôm-t°€€ô˜¡Ñ”¤°¥”€ôH€”°Õ”€ô¥”€”€¹‰½Õ¹‘…Éä°”€ô¥”€¬Õ”ì(€€€€€€€€€H€¬ôÕ”°”€„ôô€À€˜˜€´”€ğ€¹ÍÑ½É…”€˜˜€¡H€¬ô€´”¤°Ä¹}}‘…Ñ„€ô¹•Ü±½…ĞÌÉÉÉ…ä ¹ÍÑ½É…”€¼±½…ĞÌÉÉÉ…ä¹	eQM}AI}159P¤°Ä¹}}½™™Í•Ğ€ôH°H€¬ô€¹ÍÑ½É…”ì(€€€€€€€ô(€€€€€ô(€€€ô(€€€½¹ÍĞœ€ôH€”ì(€€€É•ÑÕÉ¸œ€ø€À€˜˜€¡H€¬ô€´œ¤°4¹}}Í¥é”€ôH°4¹}}…¡”€ôíô°Ñ¡¥Ìì(€ô(€™Õ¹Ñ¥½¸˜¡4¤ì(€€€½¹ÍĞ€ôì(€€€€€‰½Õ¹‘…Éäè€À°(€€€€€ÍÑ½É…”è€À(€€€ôì(€€€É•ÑÕÉ¸ÑåÁ•½˜4€ôô€‰¹Õµ‰•ÈˆñğÑåÁ•½˜4€ôô€‰‰½½±•…¸ˆ€ü€¡¹‰½Õ¹‘…Éä€ô€Ğ°¹ÍÑ½É…”€ô€Ğ¤€è4¹¥ÍY•Ñ½ÈÈ€ü€¡¹‰½Õ¹‘…Éä€ô€à°¹ÍÑ½É…”€ô€à¤€è4¹¥ÍY•Ñ½ÈÌñğ4¹¥Í½±½È€ü€¡¹‰½Õ¹‘…Éä€ô€ÄØ°¹ÍÑ½É…”€ô€ÄÈ¤€è4¹¥ÍY•Ñ½ÈĞ€ü€¡¹‰½Õ¹‘…Éä€ô€ÄØ°¹ÍÑ½É…”€ô€ÄØ¤€è4¹¥Í5…ÑÉ¥àÌ€ü€¡¹‰½Õ¹‘…Éä€ô€Ğà°¹ÍÑ½É…”€ô€Ğà¤€è4¹¥Í5…ÑÉ¥àĞ€ü€¡¹‰½Õ¹‘…Éä€ô€ØĞ°¹ÍÑ½É…”€ô€ØĞ¤€è4¹¥ÍQ•áÑÕÉ”€üM” ‰]•‰1I•¹‘•É•ÈèQ•áÑÕÉ”Í…µÁ±•ÉÌ…¸¹½Ğ‰”Á…ÉĞ½˜…¸Õ¹¥™½ÉµÌÉ½ÕÀ¸ˆ¤€èÉÉ…å	Õ™™•È¹¥ÍY¥•Ü¡4¤€ü€¡¹‰½Õ¹‘…Éä€ô€ÄØ°¹ÍÑ½É…”€ô4¹‰åÑ•1•¹Ñ ¤€èM” ‰]•‰1I•¹‘•É•ÈèU¹ÍÕÁÁ½ÉÑ•Õ¹¥™½É´Ù…±Õ”ÑåÁ”¸ˆ°4¤°ì(€ô(€™Õ¹Ñ¥½¸P¡4¤ì(€€€½¹ÍĞ€ô4¹Ñ…É•Ğì(€€€¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰‘¥ÍÁ½Í”ˆ°P¤ì(€€€½¹ÍĞH€ô„¹¥¹‘•á=˜¡¹}}‰¥¹‘¥¹A½¥¹Ñ%¹‘•à¤ì(€€€„¹ÍÁ±¥”¡H°€Ä¤°”¹‘•±•Ñ•	Õ™™•È¡Ém¹¥‘t¤°‘•±•Ñ”Ém¹¥‘t°‘•±•Ñ”Ím¹¥‘tì(€ô(€™Õ¹Ñ¥½¸ ¤ì(€€€™½È€¡½¹ÍĞ4¥¸È¤”¹‘•±•Ñ•	Õ™™•È¡Ém5t¤ì(€€€„€ômt°È€ôíô°Ì€ôíôì(€ô(€É•ÑÕÉ¸ì(€€€‰¥¹è°°(€€€ÕÁ‘…Ñ”èŒ°(€€€‘¥ÍÁ½Í”è(€ôì)ô)Ù…È1˜€ô¹•ÜU¥¹ĞÄÙÉÉ…ä¡l(€€ÄÈĞØä°(€€ÄÔÀÔÜ°(€€ÄÈØÈÀ°(€€ÄĞäÈÔ°(€€ÄÌÈØØ°(€€ÄĞØÈÀ°(€€ÄÌàÀÜ°(€€ÄĞÌÜØ°(€€ÄĞÌÈÌ°(€€ÄÌääÀ°(€€ÄĞÔĞÔ°(€€ÄÌØÈÔ°(€€ÄĞÜÄÌ°(€€ÄÌÌÈà°(€€ÄĞàĞÀ°(€€ÄÈààÈ°(€€ÄĞäÌÄ°(€€ÄÈÔÈà°(€€ÄĞääØ°(€€ÄÈÈÌÌ°(€€ÄÔÀÌä°(€€ÄÄàÈä°(€€ÄÔÀØØ°(€€ÄÄÔÈÔ°(€€ÄÔÀàÀ°(€€ÄÄÈäÔ°(€€ÄÔÀàÔ°(€€ÄÀäÜØ°(€€ÄÔÀàÈ°(€€ÄÀÜÀÔ°(€€ÄÔÀÜÌ°(€€ÄÀĞäÔ°(€€ÄÌààÀ°(€€ÄĞÔØĞ°(€€ÄÌàäà°(€€ÄĞÔĞÈ°(€€ÄÌäÜÜ°(€€ÄĞĞÌÀ°(€€ÄĞÄÔà°(€€ÄĞÄÈĞ°(€€ÄĞÌäÌ°(€€ÄÌÜÌÈ°(€€ÄĞÔÔØ°(€€ÄÌĞÄÀ°(€€ÄĞÜÀÈ°(€€ÄÈääØ°(€€ÄĞàÄĞ°(€€ÄÈÔäØ°(€€ÄĞàäÄ°(€€ÄÈÈäÄ°(€€ÄĞäÌÜ°(€€ÄÄàÌĞ°(€€ÄĞäÔÜ°(€€ÄÄĞàä°(€€ÄĞäÔà°(€€ÄÄÄäĞ°(€€ÄĞäĞÌ°(€€ÄÀàÀÌ°(€€ÄĞäÈÄ°(€€ÄÀÔÀØ°(€€ÄĞàäÌ°(€€ÄÀÈÜà°(€€ÄĞàÔà°(€€ääØÀ°(€€ÄĞĞàĞ°(€€ÄĞÀÌä°(€€ÄĞĞàÜ°(€€ÄĞÀÈÔ°(€€ÄĞĞää°(€€ÄÌäĞÄ°(€€ÄĞÔÈĞ°(€€ÄÌÜĞÀ°(€€ÄĞÔÜĞ°(€€ÄÌĞØà°(€€ÄĞØÔĞ°(€€ÄÌÄÀØ°(€€ÄĞÜĞÌ°(€€ÄÈØÜà°(€€ÄĞàÄà°(€€ÄÈÌĞĞ°(€€ÄĞàØÜ°(€€ÄÄàäÌ°(€€ÄĞààä°(€€ÄÄÔÀä°(€€ÄĞàäÌ°(€€ÄÄÄàÀ°(€€ÄĞààÄ°(€€ÄÀÜÔÄ°(€€ÄĞàÔÈ°(€€ÄÀĞÈà°(€€ÄĞàÄÈ°(€€ÄÀÄÈà°(€€ÄĞÜØÔ°(€€äÜÔĞ°(€€ÄĞÜÄÈ°(€€äĞØØ°(€€ÄĞÜØĞ°(€€ÄÌĞàÀ°(€€ÄĞÜØĞ°(€€ÄÌĞÜÔ°(€€ÄĞÜØØ°(€€ÄÌĞĞÀ°(€€ÄĞÜØØ°(€€ÄÌÌĞÜ°(€€ÄĞÜØä°(€€ÄÌÀÜÀ°(€€ÄĞÜàØ°(€€ÄÈÜÄÌ°(€€ÄĞàÄØ°(€€ÄÈÌàÜ°(€€ÄĞàĞĞ°(€€ÄÄäÔÜ°(€€ÄĞàØÀ°(€€ÄÄÔĞä°(€€ÄĞàØà°(€€ÄÄÈÄÔ°(€€ÄĞàÔÔ°(€€ÄÀÜÔÄ°(€€ÄĞàÈÔ°(€€ÄÀĞÀÌ°(€€ÄĞÜàÈ°(€€ÄÀÀĞĞ°(€€ÄĞÜÈä°(€€äØÔÄ°(€€ÄĞØØØ°(€€äÌÔÈ°(€€ÄĞÔää°(€€äÀÈä°(€€ÄĞäØÜ°(€€ÄÈàÌÔ°(€€ÄĞäØØ°(€€ÄÈàÌÄ°(€€ÄĞäØÌ°(€€ÄÈàÀĞ°(€€ÄĞäÔĞ°(€€ÄÈÜÈÌ°(€€ÄĞäÌØ°(€€ÄÈÔØĞ°(€€ÄĞäÄÜ°(€€ÄÈÌĞÜ°(€€ÄĞäÀÀ°(€€ÄÄäÔà°(€€ÄĞààØ°(€€ÄÄÔØä°(€€ÄĞàÜà°(€€ÄÄÈĞÜ°(€€ÄĞàÔä°(€€ÄÀÜØÔ°(€€ÄĞàÈà°(€€ÄÀĞÀÄ°(€€ÄĞÜàĞ°(€€ÄÀÀÄÄ°(€€ÄĞÜÈÜ°(€€äØÀÀ°(€€ÄĞØØÀ°(€€äÈàä°(€€ÄĞÔàØ°(€€ààäÌ°(€€ÄĞÔÀà°(€€àÔÌÌ°(€€ÄÔÄÄÄ°(€€ÄÈÈÌĞ°(€€ÄÔÄÄÀ°(€€ÄÈÈÌĞ°(€€ÄÔÄÀĞ°(€€ÄÈÈÄØ°(€€ÄÔÀäÈ°(€€ÄÈÄÔØ°(€€ÄÔÀØÜ°(€€ÄÈÀÄÀ°(€€ÄÔÀÈà°(€€ÄÄÜÜØ°(€€ÄĞäàÄ°(€€ÄÄÔÀÀ°(€€ÄĞäĞÈ°(€€ÄÄÈÀÔ°(€€ÄĞäÀÈ°(€€ÄÀÜÔÈ°(€€ÄĞàØÄ°(€€ÄÀÌäÌ°(€€ÄĞàÄÈ°(€€äääÄ°(€€ÄĞÜÔÈ°(€€äÔÜÀ°(€€ÄĞØàÈ°(€€äÈÔÈ°(€€ÄĞØÀÌ°(€€ààÀà°(€€ÄĞÔÄä°(€€àĞĞÔ°(€€ÄĞĞÌÄ°(€€àÄĞÔ°(€€ÄÔÈÀä°(€€ÄÄĞĞä°(€€ÄÔÈÀà°(€€ÄÄĞÔÄ°(€€ÄÔÈÀÈ°(€€ÄÄĞÔÄ°(€€ÄÔÄäÀ°(€€ÄÄĞÌà°(€€ÄÔÄØÌ°(€€ÄÄÌàĞ°(€€ÄÔÄÄÜ°(€€ÄÄÈÜĞ°(€€ÄÔÀÔÔ°(€€ÄÀäÜä°(€€ÄĞääĞ°(€€ÄÀØĞà°(€€ÄĞäÌÈ°(€€ÄÀÌĞÌ°(€€ÄĞàÜÄ°(€€ääÌØ°(€€ÄĞàÀÌ°(€€äÔÌÈ°(€€ÄĞÜÈä°(€€äÈÄà°(€€ÄĞØĞÔ°(€€àÜĞÈ°(€€ÄĞÔÔØ°(€€àÌàÄ°(€€ÄĞĞØÄ°(€€àÀÈÀ°(€€ÄĞÌØÔ°(€€ÜØÀÌ°(€€ÄÔÈÜÌ°(€€ÄÀØÀÌ°(€€ÄÔÈÜÈ°(€€ÄÀØÀÜ°(€€ÄÔÈØÜ°(€€ÄÀØÄä°(€€ÄÔÈÔØ°(€€ÄÀØÌÄ°(€€ÄÔÈÌÄ°(€€ÄÀØÄĞ°(€€ÄÔÄàÈ°(€€ÄÀÔÌÔ°(€€ÄÔÄÄà°(€€ÄÀÌàä°(€€ÄÔÀĞÈ°(€€ÄÀÄØÜ°(€€ÄĞäØÌ°(€€äÜàÜ°(€€ÄĞààÌ°(€€äĞĞÜ°(€€ÄĞàÀÀ°(€€äÄÄÔ°(€€ÄĞÜÄÀ°(€€àØØÔ°(€€ÄĞØÄÔ°(€€àÌÄà°(€€ÄĞÔÄĞ°(€€ÜäÄÄ°(€€ÄĞĞÄÄ°(€€ÜÔÀÜ°(€€ÄĞÈÜä°(€€ÜÄäà°(€€ÄÔÌÄĞ°(€€äØÜÔ°(€€ÄÔÌÄÌ°(€€äØàÌ°(€€ÄÔÌÀä°(€€äÜÄÈ°(€€ÄÔÈäà°(€€äÜÔä°(€€ÄÔÈÜÜ°(€€äÜäÜ°(€€ÄÔÈÈä°(€€äÜÜÌ°(€€ÄÔÄØØ°(€€äØØà°(€€ÄÔÀàĞ°(€€äĞàÜ°(€€ÄĞääÔ°(€€äÈÜĞ°(€€ÄĞàäà°(€€àäÄÀ°(€€ÄĞàÀÀ°(€€àÔÌä°(€€ÄĞØäÜ°(€€àÈÌĞ°(€€ÄĞÔäÀ°(€€ÜÜäÀ°(€€ÄĞĞÜä°(€€ÜĞÀä°(€€ÄĞÌØÜ°(€€ÜÀØÜ°(€€ÄĞÄÜà°(€€ØØÈÄ°(€€ÄÔÌÌÜ°(€€àØÄä°(€€ÄÔÌÌÜ°(€€àØÌÄ°(€€ÄÔÌÌÌ°(€€àØÜÜ°(€€ÄÔÌÈÔ°(€€àÜØä°(€€ÄÔÌÀÔ°(€€ààÜÄ°(€€ÄÔÈØĞ°(€€àäĞÀ°(€€ÄÔÈÀÈ°(€€àäÀä°(€€ÄÔÄÄä°(€€àÜÜÔ°(€€ÄÔÀÈÈ°(€€àÔØÔ°(€€ÄĞäÄØ°(€€àÌÈà°(€€ÄĞàÀĞ°(€€àÀÀä°(€€ÄĞØàà°(€€ÜØÄĞ°(€€ÄĞÔØä°(€€ÜÈàÜ°(€€ÄĞĞĞà°(€€Øààà°(€€ÄĞÌÈÄ°(€€ØĞàÌ°(€€ÄĞÀàà°(€€ØÄÜÄ°(€€ÄÔÌÔÀ°(€€ÜĞÀÈ°(€€ÄÔÌÔÀ°(€€ÜĞÄä°(€€ÄÔÌĞÜ°(€€ÜĞàÀ°(€€ÄÔÌĞÀ°(€€ÜØÄÌ°(€€ÄÔÌÈÈ°(€€ÜàÀĞ°(€€ÄÔÈàÜ°(€€ÜäÜÌ°(€€ÄÔÈÈä°(€€àÀÔÜ°(€€ÄÔÄĞà°(€€àÀÄÈ°(€€ÄÔÀĞØ°(€€ÜàĞØ°(€€ÄĞäÌÌ°(€€ÜØÄÄ°(€€ÄĞàÄÀ°(€€ÜÌÔÜ°(€€ÄĞØàÈ°(€€ÜÀØä°(€€ÄĞÔÔÈ°(€€ØØÔØ°(€€ÄĞĞÈÄ°(€€ØÌÄØ°(€€ÄĞÈÔÄ°(€€ÔäĞà°(€€ÄĞÀÀÜ°(€€ÔÔÈà°(€€ÄÔÌÔØ°(€€ÔäĞÈ°(€€ÄÔÌÔØ°(€€ÔäÜÜ°(€€ÄÔÌÔÌ°(€€ØÄÄä°(€€ÄÔÌĞà°(€€ØÈäĞ°(€€ÄÔÌÌÈ°(€€ØÔÔÄ°(€€ÄÔÌÀÈ°(€€ØàÈĞ°(€€ÄÔÈĞä°(€€ÜÀĞĞ°(€€ÄÔÄÜÄ°(€€ÜÄÈÈ°(€€ÄÔÀÜÀ°(€€ÜÀÔÀ°(€€ÄĞäĞä°(€€ØàØÄ°(€€ÄĞàÄà°(€€ØØÄÄ°(€€ÄĞØÜä°(€€ØÌĞä°(€€ÄĞÔÌà°(€€ØÀØÜ°(€€ÄĞÌäà°(€€ÔØÔÄ°(€€ÄĞÄàä°(€€ÔÌÄÄ°(€€ÄÌäÌÔ°(€€ĞäÔà°(€€ÄÔÌÔä°(€€ĞÄÈÌ°(€€ÄÔÌÔä°(€€ĞÄÔÌ°(€€ÄÔÌÔØ°(€€ĞÈäØ°(€€ÄÔÌÔÌ°(€€ĞØĞØ°(€€ÄÔÌÌà°(€€ÔÄØÀ°(€€ÄÔÌÄÄ°(€€ÔÔÀà°(€€ÄÔÈØÌ°(€€ÔàÈä°(€€ÄÔÄàà°(€€ØÀĞÈ°(€€ÄÔÀàà°(€€ØÀäĞ°(€€ÄĞäØØ°(€€ØÀÀÄ°(€€ÄĞàÈØ°(€€ÔÜäØ°(€€ÄĞØÜà°(€€ÔÔĞÌ°(€€ÄĞÔÈÜ°(€€ÔÈàÜ°(€€ÄĞÌÜÜ°(€€ĞäàÔ°(€€ÄĞÄÌÌ°(€€ĞÔàØ°(€€ÄÌàØä°(€€ĞÈÔÜ°(€€ÄÔÌØÀ°(€€ÄÔØÌ°(€€ÄÔÌØÀ°(€€ÄØĞÈ°(€€ÄÔÌÔà°(€€ÈÀÜØ°(€€ÄÔÌÔĞ°(€€ÈØÌØ°(€€ÄÔÌĞÄ°(€€ÌÌÔÀ°(€€ÄÔÌÄÜ°(€€ĞÀÄä°(€€ÄÔÈÜÌ°(€€ĞĞÈä°(€€ÄÔÈÀÌ°(€€ĞÜÌÈ°(€€ÄÔÄÀÔ°(€€ĞäÄÄ°(€€ÄĞäàÄ°(€€ĞäÌÈ°(€€ÄĞàÌØ°(€€ĞàÄà°(€€ÄĞØÜä°(€€ĞØÈÄ°(€€ÄĞÔÄÜ°(€€ĞÌàØ°(€€ÄĞÌÔä°(€€ĞÄÔØ°(€€ÄĞÀàÌ°(€€ÌÜäÔ°(€€ÄÌàÀà°(€€ÌĞÌÜ°(€€ÄÔÌØÀ°(€€ÄÈÈ°(€€ÄÔÌØÀ°(€€ÄÌÜ°(€€ÄÔÌÔà°(€€ÈàÔ°(€€ÄÔÌÔÔ°(€€ØÌØ°(€€ÄÔÌĞĞ°(€€ÄÈÜĞ°(€€ÄÔÌÈÈ°(€€ÈÄÜÜ°(€€ÄÔÈàÄ°(€€ÈÜØÔ°(€€ÄÔÈÄÔ°(€€ÌÈÈÌ°(€€ÄÔÄÈÀ°(€€ÌĞÔÄ°(€€ÄĞääÔ°(€€ÌÔØä°(€€ÄĞàĞØ°(€€ÌÔØÜ°(€€ÄĞØàÄ°(€€ÌĞØØ°(€€ÄĞÔÄÄ°(€€ÌÌÀÔ°(€€ÄĞÌĞĞ°(€€ÌÄÈÄ°(€€ÄĞÀÌÜ°(€€ÈàÀÀ°(€€ÄÌÜÔÌ°(€€ÈĞØÜ°(€€ÄÔÌØÀ°(€€À°(€€ÄÔÌØÀ°(€€Ä°(€€ÄÔÌÔä°(€€ÈÄ°(€€ÄÔÌÔÔ°(€€àä°(€€ÄÔÌĞØ°(€€ÈÔÌ°(€€ÄÔÌÈÔ°(€€ĞÜä°(€€ÄÔÈàÜ°(€€ÜäØ°(€€ÄÔÈÈÔ°(€€ÄÄĞà°(€€ÄÔÄÌÌ°(€€ÄĞäÈ°(€€ÄÔÀÀà°(€€ÄÜĞä°(€€ÄĞàÔØ°(€€ÄààÈ°(€€ÄĞØàÔ°(€€ÄààØ°(€€ÄĞÔÀØ°(€€ÄÜàÌ°(€€ÄĞÌÈĞ°(€€ÄØÀà°(€€ÄÌääØ°(€€ÄÌäà°(€€ÄÌÜÀÈ°(€€ÄÄàÌ)t¤°É¤€ô¹Õ±°ì)™Õ¹Ñ¥½¸˜ ¤ì(€É•ÑÕÉ¸É¤€ôôô¹Õ±°€˜˜€¡É¤€ô¹•Ü-Ì¡1˜°€ÄØ°€ÄØ°­È°a¤¤°É¤¹¹…µ”€ô€‰}1UPˆ°É¤¹µ¥¹¥±Ñ•È€ô%Ğ°É¤¹µ…¥±Ñ•È€ô%Ğ°É¤¹İÉ…ÁL€ô½¤°É¤¹İÉ…ÁP€ô½¤°É¤¹•¹•É…Ñ•5¥Áµ…ÁÌ€ô€„Ä°É¤¹¹••‘ÍUÁ‘…Ñ”€ô€„À¤°É¤ì)ô)Ù…È%˜€ô±…ÍÌì(€½¹ÍÑÉÕÑ½È¡”€ôíô¤ì(€€€½¹ÍĞì…¹Ù…ÌèĞ€ôAŒ ¤°½¹Ñ•áĞè¤€ô¹Õ±°°‘•ÁÑ è¸€ô€„À°ÍÑ•¹¥°èÈ€ô€„Ä°…±Á¡„èÌ€ô€„Ä°…¹Ñ¥…±¥…Ìè„€ô€„Ä°ÁÉ•µÕ±Ñ¥Á±¥•‘±Á¡„è¼€ô€„À°ÁÉ•Í•ÉÙ•É…İ¥¹	Õ™™•Èè°€ô€„Ä°Á½İ•ÉAÉ•™•É•¹”èŒ€ô€‰‘•™…Õ±Ğˆ°™…¥±%™5…©½ÉA•É™½Éµ…¹•…Ù•…Ğè €ô€„Ä°É•Ù•ÉÍ•‘•ÁÑ¡	Õ™™•Èè€ô€„Ä°½ÕÑÁÕÑ	Õ™™•ÉQåÁ”èÔ€ô9¤ô€ô”ì(€€€Ñ¡¥Ì¹¥Í]•‰1I•¹‘•É•È€ô€„Àì(€€€±•ĞÀì(€€€¥˜€¡¤€„ôô¹Õ±°¤ì(€€€€€¥˜€¡ÑåÁ•½˜]•‰1I•¹‘•É¥¹½¹Ñ•áĞ€ğ€‰Ôˆ€˜˜¤¥¹ÍÑ…¹•½˜]•‰1I•¹‘•É¥¹½¹Ñ•áĞ¤Ñ¡É½Ü¹•ÜÉÉ½È ‰Q!I¹]•‰1I•¹‘•É•Èè]•‰0€Ä¥Ì¹½ĞÍÕÁÁ½ÉÑ•Í¥¹”ÈÄØÌ¸ˆ¤ì(€€€€€À€ô¤¹•Ñ½¹Ñ•áÑÑÑÉ¥‰ÕÑ•Ì ¤¹…±Á¡„ì(€€€ô•±Í”À€ôÌì(€€€½¹ÍĞØ€ôÔ°ˆ€ô€¼¨}}AUI}|€¨¼¹•ÜM•Ğ¡l(€€€€€¼°(€€€€€é¼°(€€€€€	¼(€€€t¤°´€ô€¼¨}}AUI}|€¨¼¹•ÜM•Ğ¡l(€€€€€9¤°(€€€€€Å¤°(€€€€€%¼°(€€€€€¼°(€€€€€9¼°(€€€€€U¼(€€€t¤°˜€ô¹•ÜU¥¹ĞÌÉÉÉ…ä Ğ¤°P€ô¹•Ü%¹ĞÌÉÉÉ…ä Ğ¤°€ô¹•Ü8 ¤ì(€€€±•Ğ4€ô¹Õ±°°€ô¹Õ±°ì(€€€½¹ÍĞH€ômt°€ômtì(€€€±•Ğœ€ô¹Õ±°ì(€€€Ñ¡¥Ì¹‘½µ±•µ•¹Ğ€ôĞ°Ñ¡¥Ì¹‘•‰Õœ€ôì(€€€€€¡•­M¡…‘•ÉÉÉ½ÉÌè€„À°(€€€€€½¹M¡…‘•ÉÉÉ½Èè¹Õ±°(€€€ô°Ñ¡¥Ì¹…ÕÑ½±•…È€ô€„À°Ñ¡¥Ì¹…ÕÑ½±•…É½±½È€ô€„À°Ñ¡¥Ì¹…ÕÑ½±•…É•ÁÑ €ô€„À°Ñ¡¥Ì¹…ÕÑ½±•…ÉMÑ•¹¥°€ô€„À°Ñ¡¥Ì¹Í½ÉÑ=‰©•ÑÌ€ô€„À°Ñ¡¥Ì¹±¥ÁÁ¥¹A±…¹•Ì€ômt°Ñ¡¥Ì¹±½…±±¥ÁÁ¥¹¹…‰±•€ô€„Ä°Ñ¡¥Ì¹Ñ½¹•5…ÁÁ¥¹œ€ô€À°Ñ¡¥Ì¹Ñ½¹•5…ÁÁ¥¹áÁ½ÍÕÉ”€ô€Ä°Ñ¡¥Ì¹ÑÉ…¹Íµ¥ÍÍ¥½¹I•Í½±ÕÑ¥½¹M…±”€ô€Äì(€€€½¹ÍĞä€ôÑ¡¥Ìì(€€€±•Ğ€ô€„Ä°Ü€ô¹Õ±°°¬€ô¹Õ±°°`€ô¹Õ±°°Ä€ô¹Õ±°ì(€€€Ñ¡¥Ì¹}½ÕÑÁÕÑ½±½ÉMÁ…”€ôáĞì(€€€±•Ğ€ô€À°,€ô€À°<€ô¹Õ±°°Ñ”€ô€´Ä°€€ô¹Õ±°ì(€€€½¹ÍĞ¥”€ô¹•Ü¥Ğ ¤°Õ”€ô¹•Ü¥Ğ ¤ì(€€€±•Ğ”€ô¹Õ±°ì(€€€½¹ÍĞÙ”€ô¹•Ü9” À¤ì(€€€±•Ğå”€ô€À° €ôĞ¹İ¥‘Ñ °D€ôĞ¹¡•¥¡Ğ°‘”€ô€Ä°±”€ô¹Õ±°°I”€ô¹Õ±°ì(€€€½¹ÍĞ”€ô¹•Ü¥Ğ À°€À° °D¤°%”€ô¹•Ü¥Ğ À°€À° °D¤ì(€€€±•Ğ©”€ô€„Äì(€€€½¹ÍĞ]”€ô¹•Ü©Ì ¤ì(€€€±•Ğ¹Ğ€ô€„Ä°‰Ğ€ô€„Äì(€€€½¹ÍĞ1Ğ€ô¹•Ü” ¤°	Ğ€ô¹•Ü8 ¤°ÉĞ€ô¹•Ü¥Ğ ¤°5Ğ€ôì(€€€€€‰…­É½Õ¹è¹Õ±°°(€€€€€™½œè¹Õ±°°(€€€€€•¹Ù¥É½¹µ•¹Ğè¹Õ±°°(€€€€€½Ù•ÉÉ¥‘•5…Ñ•É¥…°è¹Õ±°°(€€€€€¥ÍM•¹”è€„À(€€€ôì(€€€±•Ğ}Ğ€ô€„Äì(€€€™Õ¹Ñ¥½¸™Ğ ¤ì(€€€€€É•ÑÕÉ¸<€ôôô¹Õ±°€ü‘”€è€Äì(€€€ô(€€€±•Ğ€ô¤ì(€€€™Õ¹Ñ¥½¸éĞ¡à°T¤ì(€€€€€É•ÑÕÉ¸Ğ¹•Ñ½¹Ñ•áĞ¡à°T¤ì(€€€ô(€€€ÑÉäì(€€€€€½¹ÍĞà€ôì(€€€€€€€…±Á¡„è€„À°(€€€€€€€‘•ÁÑ è¸°(€€€€€€€ÍÑ•¹¥°èÈ°(€€€€€€€…¹Ñ¥…±¥…Ìè„°(€€€€€€€ÁÉ•µÕ±Ñ¥Á±¥•‘±Á¡„è¼°(€€€€€€€ÁÉ•Í•ÉÙ•É…İ¥¹	Õ™™•Èè°°(€€€€€€€Á½İ•ÉAÉ•™•É•¹”èŒ°(€€€€€€€™…¥±%™5…©½ÉA•É™½Éµ…¹•…Ù•…Ğè (€€€€€ôì(€€€€€¥˜€ ‰Í•ÑÑÑÉ¥‰ÕÑ”ˆ¥¸Ğ€˜˜Ğ¹Í•ÑÑÑÉ¥‰ÕÑ” ‰‘…Ñ„µ•¹¥¹”ˆ°€‰Ñ¡É•”¹©ÌÈÄàÔˆ¤°Ğ¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰İ•‰±½¹Ñ•áÑ±½ÍĞˆ°İ”°€„Ä¤°Ğ¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰İ•‰±½¹Ñ•áÑÉ•ÍÑ½É•ˆ°Ğ°€„Ä¤°Ğ¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰İ•‰±½¹Ñ•áÑÉ•…Ñ¥½¹•ÉÉ½Èˆ°•Ğ°€„Ä¤°€ôôô¹Õ±°¤ì(€€€€€€€½¹ÍĞT€ô€‰İ•‰°Èˆì(€€€€€€€¥˜€¡€ôéĞ¡T°à¤°€ôôô¹Õ±°¤Ñ¡É½ÜéĞ¡T¤€ü¹•ÜÉÉ½È ‰Q!I¹]•‰1I•¹‘•É•ÈèÉÉ½ÈÉ•…Ñ¥¹œ]•‰0½¹Ñ•áĞİ¥Ñ å½ÕÈÍ•±•Ñ•…ÑÑÉ¥‰ÕÑ•Ì¸ˆ¤€è¹•ÜÉÉ½È ‰Q!I¹]•‰1I•¹‘•É•ÈèÉÉ½ÈÉ•…Ñ¥¹œ]•‰0½¹Ñ•áĞ¸ˆ¤ì(€€€€€ô(€€€ô…Ñ €¡à¤ì(€€€€€Ñ¡É½Ü1” ‰]•‰1I•¹‘•É•Èè€ˆ€¬à¹µ•ÍÍ…”¤°àì(€€€ô(€€€±•Ğe”°ÍĞ°L°|°@°\°d°É”°…”°$°¹”°Á”°‰”°•”°á”°Q”°U”°Å”°0°¨°(°™”°}”ì(€€€™Õ¹Ñ¥½¸h ¤ì(€€€€€e”€ô¹•Ü1Ô¡¤°e”¹¥¹¥Ğ ¤°(€ô¹•Üå˜¡°e”¤°ÍĞ€ô¹•ÜåÔ¡°e”°”°(¤°L€ô¹•Üá˜¡°e”¤°ÍĞ¹É•Ù•ÉÍ•‘•ÁÑ¡	Õ™™•È€˜˜€˜˜L¹‰Õ™™•ÉÌ¹‘•ÁÑ ¹Í•ÑI•Ù•ÉÍ• „À¤°¬€ô¹É•…Ñ•É…µ•‰Õ™™•È ¤°`€ô¹É•…Ñ•É…µ•‰Õ™™•È ¤°Ä€ô¹É•…Ñ•É…µ•‰Õ™™•È ¤°|€ô¹•Ü9Ô¡¤°@€ô¹•Ü½˜ ¤°\€ô¹•ÜM˜¡°e”°L°@°ÍĞ°(°|¤°d€ô¹•ÜAÔ¡ä¤°É”€ô¹•ÜÙÔ¡¤°™”€ô¹•ÜáÔ¡°É”¤°…”€ô¹•ÜÔ¡°É”°|°™”¤°$€ô¹•ÜÔ¡°…”°É”°™”°|¤°Å”€ô¹•ÜUÔ¡°ÍĞ°\¤°á”€ô¹•ÜÔ¡@¤°¹”€ô¹•Ü…˜¡ä°d°e”°ÍĞ°™”°á”¤°Á”€ô¹•Ü˜¡ä°@¤°‰”€ô¹•Ü˜ ¤°•”€ô¹•Üµ˜¡e”¤°U”€ô¹•Ü5Ô¡ä°d°L°$°À°¼¤°Q”€ô¹•Ü5˜¡ä°$°ÍĞ¤°}”€ô¹•ÜA˜¡°|°ÍĞ°L¤°0€ô¹•ÜMÔ¡°e”°|¤°¨€ô¹•Ü%Ô¡°e”°|¤°|¹ÁÉ½É…µÌ€ô¹”¹ÁÉ½É…µÌ°ä¹…Á…‰¥±¥Ñ¥•Ì€ôÍĞ°ä¹•áÑ•¹Í¥½¹Ì€ôe”°ä¹ÁÉ½Á•ÉÑ¥•Ì€ô@°ä¹É•¹‘•É1¥ÍÑÌ€ô‰”°ä¹Í¡…‘½İ5…À€ôQ”°ä¹ÍÑ…Ñ”€ôL°ä¹¥¹™¼€ô|ì(€€€ô(€€€h ¤°Ø€„ôô€ÄÀÀä€˜˜€¡œ€ô¹•Ü­Ô¡Ø°Ğ¹İ¥‘Ñ °Ğ¹¡•¥¡Ğ°„°¸°È¤¤ì(€€€½¹ÍĞ”€ô¹•ÜI˜¡ä°¤ì(€€€Ñ¡¥Ì¹áÈ€ô”°Ñ¡¥Ì¹•Ñ½¹Ñ•áĞ€ô™Õ¹Ñ¥½¸ ¤ì(€€€€€É•ÑÕÉ¸ì(€€€ô°Ñ¡¥Ì¹•Ñ½¹Ñ•áÑÑÑÉ¥‰ÕÑ•Ì€ô™Õ¹Ñ¥½¸ ¤ì(€€€€€É•ÑÕÉ¸¹•Ñ½¹Ñ•áÑÑÑÉ¥‰ÕÑ•Ì ¤ì(€€€ô°Ñ¡¥Ì¹™½É•½¹Ñ•áÑ1½ÍÌ€ô™Õ¹Ñ¥½¸ ¤ì(€€€€€½¹ÍĞà€ôe”¹•Ğ ‰]	1}±½Í•}½¹Ñ•áĞˆ¤ì(€€€€€à€˜˜à¹±½Í•½¹Ñ•áĞ ¤ì(€€€ô°Ñ¡¥Ì¹™½É•½¹Ñ•áÑI•ÍÑ½É”€ô™Õ¹Ñ¥½¸ ¤ì(€€€€€½¹ÍĞà€ôe”¹•Ğ ‰]	1}±½Í•}½¹Ñ•áĞˆ¤ì(€€€€€à€˜˜à¹É•ÍÑ½É•½¹Ñ•áĞ ¤ì(€€€ô°Ñ¡¥Ì¹•ÑA¥á•±I…Ñ¥¼€ô™Õ¹Ñ¥½¸ ¤ì(€€€€€É•ÑÕÉ¸‘”ì(€€€ô°Ñ¡¥Ì¹Í•ÑA¥á•±I…Ñ¥¼€ô™Õ¹Ñ¥½¸¡à¤ì(€€€€€à€„ôôÙ½¥€À€˜˜€¡‘”€ôà°Ñ¡¥Ì¹Í•ÑM¥é”¡ °D°€„Ä¤¤ì(€€€ô°Ñ¡¥Ì¹•ÑM¥é”€ô™Õ¹Ñ¥½¸¡à¤ì(€€€€€É•ÑÕÉ¸à¹Í•Ğ¡ °D¤ì(€€€ô°Ñ¡¥Ì¹Í•ÑM¥é”€ô™Õ¹Ñ¥½¸¡à°T°X€ô€„À¤ì(€€€€€¥˜€¡”¹¥ÍAÉ•Í•¹Ñ¥¹œ¤ì(€€€€€€€M” ‰]•‰1I•¹‘•É•Èè…¸Ğ¡…¹”Í¥é”İ¡¥±”YH‘•Ù¥”¥ÌÁÉ•Í•¹Ñ¥¹œ¸ˆ¤ì(€€€€€€€É•ÑÕÉ¸ì(€€€€€ô(€€€€€ €ôà°D€ôT°Ğ¹İ¥‘Ñ €ô5…Ñ ¹™±½½È¡à€¨‘”¤°Ğ¹¡•¥¡Ğ€ô5…Ñ ¹™±½½È¡T€¨‘”¤°X€ôôô€„À€˜˜€¡Ğ¹ÍÑå±”¹İ¥‘Ñ €ôà€¬€‰Áàˆ°Ğ¹ÍÑå±”¹¡•¥¡Ğ€ôT€¬€‰Áàˆ¤°œ€„ôô¹Õ±°€˜˜œ¹Í•ÑM¥é”¡Ğ¹İ¥‘Ñ °Ğ¹¡•¥¡Ğ¤°Ñ¡¥Ì¹Í•ÑY¥•İÁ½ÉĞ À°€À°à°T¤ì(€€€ô°Ñ¡¥Ì¹•ÑÉ…İ¥¹	Õ™™•ÉM¥é”€ô™Õ¹Ñ¥½¸¡à¤ì(€€€€€É•ÑÕÉ¸à¹Í•Ğ¡ €¨‘”°D€¨‘”¤¹™±½½È ¤ì(€€€ô°Ñ¡¥Ì¹Í•ÑÉ…İ¥¹	Õ™™•ÉM¥é”€ô™Õ¹Ñ¥½¸¡à°T°X¤ì(€€€€€ €ôà°D€ôT°‘”€ôX°Ğ¹İ¥‘Ñ €ô5…Ñ ¹™±½½È¡à€¨X¤°Ğ¹¡•¥¡Ğ€ô5…Ñ ¹™±½½È¡T€¨X¤°Ñ¡¥Ì¹Í•ÑY¥•İÁ½ÉĞ À°€À°à°T¤ì(€€€ô°Ñ¡¥Ì¹Í•Ñ™™•ÑÌ€ô™Õ¹Ñ¥½¸¡à¤ì(€€€€€¥˜€¡Ø€ôôô€ÄÀÀä¤ì(€€€€€€€1” ‰]•‰1I•¹‘•É•ÈèÍ•Ñ™™•ÑÌ ¤É•ÅÕ¥É•Ì½ÕÑÁÕÑ	Õ™™•ÉQåÁ”Í•ĞÑ¼!…±™±½…ÑQåÁ”½È±½…ÑQåÁ”¸ˆ¤ì(€€€€€€€É•ÑÕÉ¸ì(€€€€€ô(€€€€€¥˜€¡à¤ì(€€€€€€€™½È€¡±•ĞT€ô€ÀìT€ğà¹±•¹Ñ ìT¬¬¤¥˜€¡ámUt¹¥Í=ÕÑÁÕÑA…ÍÌ€ôôô€„À¤ì(€€€€€€€€€M” ‰]•‰1I•¹‘•É•Èè=ÕÑÁÕÑA…ÍÌ¥Ì¹½Ğ¹••‘•¥¸Í•Ñ™™•ÑÌ ¤¸Q½¹”µ…ÁÁ¥¹œ…¹½±½ÈÍÁ…”½¹Ù•ÉÍ¥½¸…É”…ÁÁ±¥•…ÕÑ½µ…Ñ¥…±±ä¸ˆ¤ì(€€€€€€€€€‰É•…¬ì(€€€€€€€ô(€€€€€ô(€€€€€œ¹Í•Ñ™™•ÑÌ¡àñğmt¤ì(€€€ô°Ñ¡¥Ì¹•ÑÕÉÉ•¹ÑY¥•İÁ½ÉĞ€ô™Õ¹Ñ¥½¸¡à¤ì(€€€€€É•ÑÕÉ¸à¹½Áä¡¥”¤ì(€€€ô°Ñ¡¥Ì¹•ÑY¥•İÁ½ÉĞ€ô™Õ¹Ñ¥½¸¡à¤ì(€€€€€É•ÑÕÉ¸à¹½Áä¡”¤ì(€€€ô°Ñ¡¥Ì¹Í•ÑY¥•İÁ½ÉĞ€ô™Õ¹Ñ¥½¸¡à°T°X°è¤ì(€€€€€à¹¥ÍY•Ñ½ÈĞ€ü”¹Í•Ğ¡à¹à°à¹ä°à¹è°à¹Ü¤€è”¹Í•Ğ¡à°T°X°è¤°L¹Ù¥•İÁ½ÉĞ¡¥”¹½Áä¡”¤¹µÕ±Ñ¥Á±åM…±…È¡‘”¤¹É½Õ¹ ¤¤ì(€€€ô°Ñ¡¥Ì¹•ÑM¥ÍÍ½È€ô™Õ¹Ñ¥½¸¡à¤ì(€€€€€É•ÑÕÉ¸à¹½Áä¡%”¤ì(€€€ô°Ñ¡¥Ì¹Í•ÑM¥ÍÍ½È€ô™Õ¹Ñ¥½¸¡à°T°X°è¤ì(€€€€€à¹¥ÍY•Ñ½ÈĞ€ü%”¹Í•Ğ¡à¹à°à¹ä°à¹è°à¹Ü¤€è%”¹Í•Ğ¡à°T°X°è¤°L¹Í¥ÍÍ½È¡Õ”¹½Áä¡%”¤¹µÕ±Ñ¥Á±åM…±…È¡‘”¤¹É½Õ¹ ¤¤ì(€€€ô°Ñ¡¥Ì¹•ÑM¥ÍÍ½ÉQ•ÍĞ€ô™Õ¹Ñ¥½¸ ¤ì(€€€€€É•ÑÕÉ¸©”ì(€€€ô°Ñ¡¥Ì¹Í•ÑM¥ÍÍ½ÉQ•ÍĞ€ô™Õ¹Ñ¥½¸¡à¤ì(€€€€€L¹Í•ÑM¥ÍÍ½ÉQ•ÍĞ¡©”€ôà¤ì(€€€ô°Ñ¡¥Ì¹Í•Ñ=Á…ÅÕ•M½ÉĞ€ô™Õ¹Ñ¥½¸¡à¤ì(€€€€€±”€ôàì(€€€ô°Ñ¡¥Ì¹Í•ÑQÉ…¹ÍÁ…É•¹ÑM½ÉĞ€ô™Õ¹Ñ¥½¸¡à¤ì(€€€€€I”€ôàì(€€€ô°Ñ¡¥Ì¹•Ñ±•…É½±½È€ô™Õ¹Ñ¥½¸¡à¤ì(€€€€€É•ÑÕÉ¸à¹½Áä¡U”¹•Ñ±•…É½±½È ¤¤ì(€€€ô°Ñ¡¥Ì¹Í•Ñ±•…É½±½È€ô™Õ¹Ñ¥½¸ ¤ì(€€€€€U”¹Í•Ñ±•…É½±½È ¸¸¹…ÉÕµ•¹ÑÌ¤ì(€€€ô°Ñ¡¥Ì¹•Ñ±•…É±Á¡„€ô™Õ¹Ñ¥½¸ ¤ì(€€€€€É•ÑÕÉ¸U”¹•Ñ±•…É±Á¡„ ¤ì(€€€ô°Ñ¡¥Ì¹Í•Ñ±•…É±Á¡„€ô™Õ¹Ñ¥½¸ ¤ì(€€€€€U”¹Í•Ñ±•…É±Á¡„ ¸¸¹…ÉÕµ•¹ÑÌ¤ì(€€€ô°Ñ¡¥Ì¹±•…È€ô™Õ¹Ñ¥½¸¡à€ô€„À°T€ô€„À°X€ô€„À¤ì(€€€€€±•Ğè€ô€Àì(€€€€€¥˜€¡à¤ì(€€€€€€€±•Ğ€ô€„Äì(€€€€€€€¥˜€¡<€„ôô¹Õ±°¤ì(€€€€€€€€€½¹ÍĞÍ”€ô<¹Ñ•áÑÕÉ”¹™½Éµ…Ğì(€€€€€€€€€€ôˆ¹¡…Ì¡Í”¤ì(€€€€€€€ô(€€€€€€€¥˜€¡¤ì(€€€€€€€€€½¹ÍĞÍ”€ô<¹Ñ•áÑÕÉ”¹ÑåÁ”°¡”€ô´¹¡…Ì¡Í”¤°µ”€ôU”¹•Ñ±•…É½±½È ¤°”€ôU”¹•Ñ±•…É±Á¡„ ¤°A”€ôµ”¹È°­”€ôµ”¹œ°Y”€ôµ”¹ˆì(€€€€€€€€€¡”€ü€¡™lÁt€ôA”°™lÅt€ô­”°™lÉt€ôY”°™lÍt€ô”°¹±•…É	Õ™™•ÉÕ¥Ø¡¹=1=H°€À°˜¤¤€è€¡QlÁt€ôA”°QlÅt€ô­”°QlÉt€ôY”°QlÍt€ô”°¹±•…É	Õ™™•É¥Ø¡¹=1=H°€À°P¤¤ì(€€€€€€€ô•±Í”èğô¹=1=I}	UI}	%Pì(€€€€€ô(€€€€€T€˜˜€¡èğô¹AQ!}	UI}	%P°Ñ¡¥Ì¹ÍÑ…Ñ”¹‰Õ™™•ÉÌ¹‘•ÁÑ ¹Í•Ñ5…Í¬ „À¤¤°X€˜˜€¡èğô¹MQ9%1}	UI}	%P°Ñ¡¥Ì¹ÍÑ…Ñ”¹‰Õ™™•ÉÌ¹ÍÑ•¹¥°¹Í•Ñ5…Í¬ ĞÈäĞäØÜÈäÔ¤¤°è€„ôô€À€˜˜¹±•…È¡è¤ì(€€€ô°Ñ¡¥Ì¹±•…É½±½È€ô™Õ¹Ñ¥½¸ ¤ì(€€€€€Ñ¡¥Ì¹±•…È „À°€„Ä°€„Ä¤ì(€€€ô°Ñ¡¥Ì¹±•…É•ÁÑ €ô™Õ¹Ñ¥½¸ ¤ì(€€€€€Ñ¡¥Ì¹±•…È „Ä°€„À°€„Ä¤ì(€€€ô°Ñ¡¥Ì¹±•…ÉMÑ•¹¥°€ô™Õ¹Ñ¥½¸ ¤ì(€€€€€Ñ¡¥Ì¹±•…È „Ä°€„Ä°€„À¤ì(€€€ô°Ñ¡¥Ì¹Í•Ñ9½‘•Í!…¹‘±•È€ô™Õ¹Ñ¥½¸¡à¤ì(€€€€€à¹Í•ÑI•¹‘•É•È¡Ñ¡¥Ì¤°Ü€ôàì(€€€ô°Ñ¡¥Ì¹‘¥ÍÁ½Í”€ô™Õ¹Ñ¥½¸ ¤ì(€€€€€Ğ¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰İ•‰±½¹Ñ•áÑ±½ÍĞˆ°İ”°€„Ä¤°Ğ¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰İ•‰±½¹Ñ•áÑÉ•ÍÑ½É•ˆ°Ğ°€„Ä¤°Ğ¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰İ•‰±½¹Ñ•áÑÉ•…Ñ¥½¹•ÉÉ½Èˆ°•Ğ°€„Ä¤°U”¹‘¥ÍÁ½Í” ¤°‰”¹‘¥ÍÁ½Í” ¤°•”¹‘¥ÍÁ½Í” ¤°@¹‘¥ÍÁ½Í” ¤°d¹‘¥ÍÁ½Í” ¤°$¹‘¥ÍÁ½Í” ¤°™”¹‘¥ÍÁ½Í” ¤°}”¹‘¥ÍÁ½Í” ¤°¹”¹‘¥ÍÁ½Í” ¤°”¹‘¥ÍÁ½Í” ¤°”¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰Í•ÍÍ¥½¹ÍÑ…ÉĞˆ°¥„¤°”¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰Í•ÍÍ¥½¹•¹ˆ°¹„¤°¤¹ÍÑ½À ¤ì(€€€ôì(€€€™Õ¹Ñ¥½¸İ”¡à¤ì(€€€€€à¹ÁÉ•Ù•¹Ñ•™…Õ±Ğ ¤°È ‰]•‰1I•¹‘•É•Èè½¹Ñ•áĞ1½ÍĞ¸ˆ¤°€ô€„Àì(€€€ô(€€€™Õ¹Ñ¥½¸Ğ ¤ì(€€€€€È ‰]•‰1I•¹‘•É•Èè½¹Ñ•áĞI•ÍÑ½É•¸ˆ¤°€ô€„Äì(€€€€€½¹ÍĞà€ô|¹…ÕÑ½I•Í•Ğ°T€ôQ”¹•¹…‰±•°X€ôQ”¹…ÕÑ½UÁ‘…Ñ”°è€ôQ”¹¹••‘ÍUÁ‘…Ñ”°€ôQ”¹ÑåÁ”ì(€€€€€h ¤°|¹…ÕÑ½I•Í•Ğ€ôà°Q”¹•¹…‰±•€ôT°Q”¹…ÕÑ½UÁ‘…Ñ”€ôX°Q”¹¹••‘ÍUÁ‘…Ñ”€ôè°Q”¹ÑåÁ”€ôì(€€€ô(€€€™Õ¹Ñ¥½¸•Ğ¡à¤ì(€€€€€1” ‰]•‰1I•¹‘•É•Èè]•‰0½¹Ñ•áĞ½Õ±¹½Ğ‰”É•…Ñ•¸I•…Í½¸è€ˆ°à¹ÍÑ…ÑÕÍ5•ÍÍ…”¤ì(€€€ô(€€€™Õ¹Ñ¥½¸Ñ¤¡à¤ì(€€€€€½¹ÍĞT€ôà¹Ñ…É•Ğì(€€€€€T¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰‘¥ÍÁ½Í”ˆ°Ñ¤¤°Á¤¡T¤ì(€€€ô(€€€™Õ¹Ñ¥½¸Á¤¡à¤ì(€€€€€A°¡à¤°@¹É•µ½Ù”¡à¤ì(€€€ô(€€€™Õ¹Ñ¥½¸A°¡à¤ì(€€€€€½¹ÍĞT€ô@¹•Ğ¡à¤¹ÁÉ½É…µÌì(€€€€€T€„ôôÙ½¥€À€˜˜€¡T¹™½É… ¡™Õ¹Ñ¥½¸¡X¤ì(€€€€€€€¹”¹É•±•…Í•AÉ½É…´¡X¤ì(€€€€€ô¤°à¹¥ÍM¡…‘•É5…Ñ•É¥…°€˜˜¹”¹É•±•…Í•M¡…‘•É…¡”¡à¤¤ì(€€€ô(€€€Ñ¡¥Ì¹É•¹‘•É	Õ™™•É¥É•Ğ€ô™Õ¹Ñ¥½¸¡à°T°X°è°°Í”¤ì(€€€€€T€ôôô¹Õ±°€˜˜€¡T€ô5Ğ¤ì(€€€€€½¹ÍĞ¡”€ô¹¥Í5•Í €˜˜¹µ…ÑÉ¥á]½É±¹‘•Ñ•Éµ¥¹…¹Ñ™™¥¹” ¤€ğ€À°µ”€ô%°¡à°T°X°è°¤ì(€€€€€L¹Í•Ñ5…Ñ•É¥…°¡è°¡”¤ì(€€€€€±•Ğ”€ôX¹¥¹‘•à°A”€ô€Äì(€€€€€¥˜€¡è¹İ¥É•™É…µ”€ôôô€„À¤ì(€€€€€€€¥˜€¡”€ô…”¹•Ñ]¥É•™É…µ•ÑÑÉ¥‰ÕÑ”¡X¤°”€ôôôÙ½¥€À¤É•ÑÕÉ¸ì(€€€€€€€A”€ô€Èì(€€€€€ô(€€€€€½¹ÍĞ­”€ôX¹‘É…İI…¹”°Y”€ôX¹…ÑÑÉ¥‰ÕÑ•Ì¹Á½Í¥Ñ¥½¸ì(€€€€€±•Ğ”€ô­”¹ÍÑ…ÉĞ€¨A”°ÑĞ€ô€¡­”¹ÍÑ…ÉĞ€¬­”¹½Õ¹Ğ¤€¨A”ì(€€€€€Í”€„ôô¹Õ±°€˜˜€¡”€ô5…Ñ ¹µ…à¡”°Í”¹ÍÑ…ÉĞ€¨A”¤°ÑĞ€ô5…Ñ ¹µ¥¸¡ÑĞ°€¡Í”¹ÍÑ…ÉĞ€¬Í”¹½Õ¹Ğ¤€¨A”¤¤°”€„ôô¹Õ±°€ü€¡”€ô5…Ñ ¹µ…à¡”°€À¤°ÑĞ€ô5…Ñ ¹µ¥¸¡ÑĞ°”¹½Õ¹Ğ¤¤€èY”€„ô¹Õ±°€˜˜€¡”€ô5…Ñ ¹µ…à¡”°€À¤°ÑĞ€ô5…Ñ ¹µ¥¸¡ÑĞ°Y”¹½Õ¹Ğ¤¤ì(€€€€€½¹ÍĞ½Ğ€ôÑĞ€´”ì(€€€€€¥˜€¡½Ğ€ğ€Àñğ½Ğ€ôôô€Ä€¼€À¤É•ÑÕÉ¸ì(€€€€€™”¹Í•ÑÕÀ¡°è°µ”°X°”¤ì(€€€€€±•Ğ±Ğ°a”€ô0ì(€€€€€¥˜€¡”€„ôô¹Õ±°€˜˜€¡±Ğ€ôÉ”¹•Ğ¡”¤°a”€ô¨°a”¹Í•Ñ%¹‘•à¡±Ğ¤¤°¹¥Í5•Í ¤è¹İ¥É•™É…µ”€ôôô€„À€ü€¡L¹Í•Ñ1¥¹•]¥‘Ñ ¡è¹İ¥É•™É…µ•1¥¹•İ¥‘Ñ €¨™Ğ ¤¤°a”¹Í•Ñ5½‘”¡¹1%9L¤¤€èa”¹Í•Ñ5½‘”¡¹QI%91L¤ì(€€€€€•±Í”¥˜€¡¹¥Í1¥¹”¤ì(€€€€€€€±•ĞMĞ€ôè¹±¥¹•İ¥‘Ñ ì(€€€€€€€MĞ€ôôôÙ½¥€À€˜˜€¡MĞ€ô€Ä¤°L¹Í•Ñ1¥¹•]¥‘Ñ ¡MĞ€¨™Ğ ¤¤°¹¥Í1¥¹•M•µ•¹ÑÌ€üa”¹Í•Ñ5½‘”¡¹1%9L¤€è¹¥Í1¥¹•1½½À€üa”¹Í•Ñ5½‘”¡¹1%9}1==@¤€èa”¹Í•Ñ5½‘”¡¹1%9}MQI%@¤ì(€€€€€ô•±Í”¹¥ÍA½¥¹ÑÌ€üa”¹Í•Ñ5½‘”¡¹A=%9QL¤€è¹¥ÍMÁÉ¥Ñ”€˜˜a”¹Í•Ñ5½‘”¡¹QI%91L¤ì(€€€€€¥˜€¡¹¥Í	…Ñ¡•‘5•Í ¤¥˜€¡e”¹•Ğ ‰]	1}µÕ±Ñ¥}‘É…Üˆ¤¤(€€€€€€€a”¹É•¹‘•É5Õ±Ñ¥É…Ü¡¹}µÕ±Ñ¥É…İMÑ…ÉÑÌ°¹}µÕ±Ñ¥É…İ½Õ¹ÑÌ°¹}µÕ±Ñ¥É…İ½Õ¹Ğ¤ì(€€€€€•±Í”ì(€€€€€€€½¹ÍĞMĞ€ô¹}µÕ±Ñ¥É…İMÑ…ÉÑÌ°5”€ô¹}µÕ±Ñ¥É…İ½Õ¹ÑÌ°ÅĞ€ô¹}µÕ±Ñ¥É…İ½Õ¹Ğ°-”€ô”€üÉ”¹•Ğ¡”¤¹‰åÑ•ÍA•É±•µ•¹Ğ€è€Ä°Ğ€ô@¹•Ğ¡è¤¹ÕÉÉ•¹ÑAÉ½É…´¹•ÑU¹¥™½ÉµÌ ¤ì(€€€€€€€™½È€¡±•Ğ¥¤€ô€Àì¥¤€ğÅĞì¥¤¬¬¤(€€€€€€€€€Ğ¹Í•ÑY…±Õ”¡°€‰}±}É…İ%ˆ°¥¤¤°a”¹É•¹‘•È¡MÑm¥¥t€¼-”°5•m¥¥t¤ì(€€€€€ô(€€€€€•±Í”¥˜€¡¹¥Í%¹ÍÑ…¹•‘5•Í ¤a”¹É•¹‘•É%¹ÍÑ…¹•Ì¡”°½Ğ°¹½Õ¹Ğ¤ì(€€€€€•±Í”¥˜€¡X¹¥Í%¹ÍÑ…¹•‘	Õ™™•É•½µ•ÑÉä¤ì(€€€€€€€½¹ÍĞMĞ€ôX¹}µ…á%¹ÍÑ…¹•½Õ¹Ğ€„ôôÙ½¥€À€üX¹}µ…á%¹ÍÑ…¹•½Õ¹Ğ€è€Ä€¼€À°5”€ô5…Ñ ¹µ¥¸¡X¹¥¹ÍÑ…¹•½Õ¹Ğ°MĞ¤ì(€€€€€€€a”¹É•¹‘•É%¹ÍÑ…¹•Ì¡”°½Ğ°5”¤ì(€€€€€ô•±Í”a”¹É•¹‘•È¡”°½Ğ¤ì(€€€ôì(€€€™Õ¹Ñ¥½¸Ñ„¡à°T°X¤ì(€€€€€à¹ÑÉ…¹ÍÁ…É•¹Ğ€ôôô€„À€˜˜à¹Í¥‘”€ôôô€È€˜˜à¹™½É•M¥¹±•A…ÍÌ€ôôô€„Ä€ü€¡à¹Í¥‘”€ô€Ä°à¹¹••‘ÍUÁ‘…Ñ”€ô€„À°¥È¡à°T°X¤°à¹Í¥‘”€ô€À°à¹¹••‘ÍUÁ‘…Ñ”€ô€„À°¥È¡à°T°X¤°à¹Í¥‘”€ô€È¤€è¥È¡à°T°X¤ì(€€€ô(€€€Ñ¡¥Ì¹½µÁ¥±”€ô™Õ¹Ñ¥½¸¡à°T°X€ô¹Õ±°¤ì(€€€€€X€ôôô¹Õ±°€˜˜€¡X€ôà¤°€ô•”¹•Ğ¡X¤°¹¥¹¥Ğ¡T¤°¹ÁÕÍ ¡¤°X¹ÑÉ…Ù•ÉÍ•Y¥Í¥‰±”¡™Õ¹Ñ¥½¸¡¤ì(€€€€€€€¹¥Í1¥¡Ğ€˜˜¹±…å•ÉÌ¹Ñ•ÍĞ¡T¹±…å•ÉÌ¤€˜˜€¡¹ÁÕÍ¡1¥¡Ğ¡¤°¹…ÍÑM¡…‘½Ü€˜˜¹ÁÕÍ¡M¡…‘½Ü¡¤¤ì(€€€€€ô¤°à€„ôôX€˜˜à¹ÑÉ…Ù•ÉÍ•Y¥Í¥‰±”¡™Õ¹Ñ¥½¸¡¤ì(€€€€€€€¹¥Í1¥¡Ğ€˜˜¹±…å•ÉÌ¹Ñ•ÍĞ¡T¹±…å•ÉÌ¤€˜˜€¡¹ÁÕÍ¡1¥¡Ğ¡¤°¹…ÍÑM¡…‘½Ü€˜˜¹ÁÕÍ¡M¡…‘½Ü¡¤¤ì(€€€€€ô¤°¹Í•ÑÕÁ1¥¡ÑÌ ¤ì(€€€€€½¹ÍĞè€ô€¼¨}}AUI}|€¨¼¹•ÜM•Ğ ¤ì(€€€€€É•ÑÕÉ¸à¹ÑÉ…Ù•ÉÍ”¡™Õ¹Ñ¥½¸¡¤ì(€€€€€€€¥˜€ „¡¹¥Í5•Í ñğ¹¥ÍA½¥¹ÑÌñğ¹¥Í1¥¹”ñğ¹¥ÍMÁÉ¥Ñ”¤¤É•ÑÕÉ¸ì(€€€€€€€½¹ÍĞÍ”€ô¹µ…Ñ•É¥…°ì(€€€€€€€¥˜€¡Í”¤¥˜€¡ÉÉ…ä¹¥ÍÉÉ…ä¡Í”¤¤™½È€¡±•Ğ¡”€ô€Àì¡”€ğÍ”¹±•¹Ñ ì¡”¬¬¤ì(€€€€€€€€€½¹ÍĞµ”€ôÍ•m¡•tì(€€€€€€€€€Ñ„¡µ”°X°¤°è¹…‘¡µ”¤ì(€€€€€€€ô(€€€€€€€•±Í”(€€€€€€€€€Ñ„¡Í”°X°¤°è¹…‘¡Í”¤ì(€€€€€ô¤°€ô¹Á½À ¤°èì(€€€ô°Ñ¡¥Ì¹½µÁ¥±•Íå¹Œ€ô™Õ¹Ñ¥½¸¡à°T°X€ô¹Õ±°¤ì(€€€€€½¹ÍĞè€ôÑ¡¥Ì¹½µÁ¥±”¡à°T°X¤ì(€€€€€É•ÑÕÉ¸¹•ÜAÉ½µ¥Í” ¡¤€ôøì(€€€€€€€™Õ¹Ñ¥½¸Í” ¤ì(€€€€€€€€€¥˜€¡è¹™½É… ¡™Õ¹Ñ¥½¸¡¡”¤ì(€€€€€€€€€€€@¹•Ğ¡¡”¤¹ÕÉÉ•¹ÑAÉ½É…´¹¥ÍI•…‘ä ¤€˜˜è¹‘•±•Ñ”¡¡”¤ì(€€€€€€€€€ô¤°è¹Í¥é”€ôôô€À¤ì(€€€€€€€€€€€¡à¤ì(€€€€€€€€€€€É•ÑÕÉ¸ì(€€€€€€€€€ô(€€€€€€€€€Í•ÑQ¥µ•½ÕĞ¡Í”°€ÄÀ¤ì(€€€€€€€ô(€€€€€€€e”¹•Ğ ‰-!I}Á…É…±±•±}Í¡…‘•É}½µÁ¥±”ˆ¤€„ôô¹Õ±°€üÍ” ¤€èÍ•ÑQ¥µ•½ÕĞ¡Í”°€ÄÀ¤ì(€€€€€ô¤ì(€€€ôì(€€€±•ĞiÈ€ô¹Õ±°ì(€€€™Õ¹Ñ¥½¸1°¡à¤ì(€€€€€iÈ€˜˜iÈ¡à¤ì(€€€ô(€€€™Õ¹Ñ¥½¸¥„ ¤ì(€€€€€¤¹ÍÑ½À ¤ì(€€€ô(€€€™Õ¹Ñ¥½¸¹„ ¤ì(€€€€€¤¹ÍÑ…ÉĞ ¤ì(€€€ô(€€€½¹ÍĞ¤€ô¹•ÜÙ° ¤ì(€€€¤¹Í•Ñ¹¥µ…Ñ¥½¹1½½À¡1°¤°ÑåÁ•½˜Í•±˜€ğ€‰Ôˆ€˜˜¤¹Í•Ñ½¹Ñ•áĞ¡Í•±˜¤°Ñ¡¥Ì¹Í•Ñ¹¥µ…Ñ¥½¹1½½À€ô™Õ¹Ñ¥½¸¡à¤ì(€€€€€iÈ€ôà°”¹Í•Ñ¹¥µ…Ñ¥½¹1½½À¡à¤°à€ôôô¹Õ±°€ü¤¹ÍÑ½À ¤€è¤¹ÍÑ…ÉĞ ¤ì(€€€ô°”¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰Í•ÍÍ¥½¹ÍÑ…ÉĞˆ°¥„¤°”¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰Í•ÍÍ¥½¹•¹ˆ°¹„¤°Ñ¡¥Ì¹É•¹‘•È€ô™Õ¹Ñ¥½¸¡à°T¤ì(€€€€€¥˜€¡T€„ôôÙ½¥€À€˜˜T¹¥Í…µ•É„€„ôô€„À¤ì(€€€€€€€1” ‰]•‰1I•¹‘•É•È¹É•¹‘•Èè…µ•É„¥Ì¹½Ğ…¸¥¹ÍÑ…¹”½˜Q!I¹…µ•É„¸ˆ¤ì(€€€€€€€É•ÑÕÉ¸ì(€€€€€ô(€€€€€¥˜€¡€ôôô€„À¤É•ÑÕÉ¸ì(€€€€€Ü€„ôô¹Õ±°€˜˜Ü¹É•¹‘•ÉMÑ…ÉĞ¡à°T¤ì(€€€€€½¹ÍĞX€ô”¹•¹…‰±•€ôôô€„À€˜˜”¹¥ÍAÉ•Í•¹Ñ¥¹œ€ôôô€„À°è€ôœ€„ôô¹Õ±°€˜˜€¡<€ôôô¹Õ±°ñğX¤€˜˜œ¹‰•¥¸¡ä°<¤ì(€€€€€¥˜€¡à¹µ…ÑÉ¥á]½É±‘ÕÑ½UÁ‘…Ñ”€ôôô€„À€˜˜à¹ÕÁ‘…Ñ•5…ÑÉ¥á]½É± ¤°T¹Á…É•¹Ğ€ôôô¹Õ±°€˜˜T¹µ…ÑÉ¥á]½É±‘ÕÑ½UÁ‘…Ñ”€ôôô€„À€˜˜T¹ÕÁ‘…Ñ•5…ÑÉ¥á]½É± ¤°”¹•¹…‰±•€ôôô€„À€˜˜”¹¥ÍAÉ•Í•¹Ñ¥¹œ€ôôô€„À€˜˜€¡œ€ôôô¹Õ±°ñğœ¹¥Í½µÁ½Í¥Ñ¥¹œ ¤€ôôô€„Ä¤€˜˜€¡”¹…µ•É…ÕÑ½UÁ‘…Ñ”€ôôô€„À€˜˜”¹ÕÁ‘…Ñ•…µ•É„¡T¤°T€ô”¹•Ñ…µ•É„ ¤¤°à¹¥ÍM•¹”€ôôô€„À€˜˜à¹½¹	•™½É•I•¹‘•È¡ä°à°T°<¤°€ô•”¹•Ğ¡à°¹±•¹Ñ ¤°¹¥¹¥Ğ¡T¤°¹ÍÑ…Ñ”¹Ñ•áÑÕÉ•U¹¥ÑÌ€ô\¹•ÑQ•áÑÕÉ•U¹¥ÑÌ ¤°¹ÁÕÍ ¡¤°1Ğ¹µÕ±Ñ¥Á±å5…ÑÉ¥•Ì¡T¹ÁÉ½©•Ñ¥½¹5…ÑÉ¥à°T¹µ…ÑÉ¥á]½É±‘%¹Ù•ÉÍ”¤°]”¹Í•ÑÉ½µAÉ½©•Ñ¥½¹5…ÑÉ¥à¡1Ğ°‰¸°T¹É•Ù•ÉÍ•‘•ÁÑ ¤°‰Ğ€ôÑ¡¥Ì¹±½…±±¥ÁÁ¥¹¹…‰±•°¹Ğ€ôá”¹¥¹¥Ğ¡Ñ¡¥Ì¹±¥ÁÁ¥¹A±…¹•Ì°‰Ğ¤°4€ô‰”¹•Ğ¡à°H¹±•¹Ñ ¤°4¹¥¹¥Ğ ¤°H¹ÁÕÍ ¡4¤°”¹•¹…‰±•€ôôô€„À€˜˜”¹¥ÍAÉ•Í•¹Ñ¥¹œ€ôôô€„À¤ì(€€€€€€€½¹ÍĞÍ”€ôä¹áÈ¹•Ñ•ÁÑ¡M•¹Í¥¹5•Í  ¤ì(€€€€€€€Í”€„ôô¹Õ±°€˜˜€‘È¡Í”°T°€´Ä€¼€À°ä¹Í½ÉÑ=‰©•ÑÌ¤ì(€€€€€ô(€€€€€€‘È¡à°T°€À°ä¹Í½ÉÑ=‰©•ÑÌ¤°4¹™¥¹¥Í  ¤°ä¹Í½ÉÑ=‰©•ÑÌ€ôôô€„À€˜˜4¹Í½ÉĞ¡±”°I”°T¹É•Ù•ÉÍ•‘•ÁÑ ¤°}Ğ€ô”¹•¹…‰±•€ôôô€„Äñğ”¹¥ÍAÉ•Í•¹Ñ¥¹œ€ôôô€„Äñğ”¹¡…Í•ÁÑ¡M•¹Í¥¹œ ¤€ôôô€„Ä°}Ğ€˜˜U”¹…‘‘Q½I•¹‘•É1¥ÍĞ¡4°à¤°Ñ¡¥Ì¹¥¹™¼¹É•¹‘•È¹™É…µ”¬¬°Ñ¡¥Ì¹¥¹™¼¹…ÕÑ½I•Í•Ğ€ôôô€„À€˜˜Ñ¡¥Ì¹¥¹™¼¹É•Í•Ğ ¤°¹Ğ€ôôô€„À€˜˜á”¹‰•¥¹M¡…‘½İÌ ¤ì(€€€€€½¹ÍĞ€ô¹ÍÑ…Ñ”¹Í¡…‘½İÍÉÉ…äì(€€€€€¥˜€¡Q”¹É•¹‘•È¡°à°T¤°¹Ğ€ôôô€„À€˜˜á”¹•¹‘M¡…‘½İÌ ¤°€¡è€˜˜œ¹¡…ÍI•¹‘•ÉA…ÍÌ ¤¤€ôôô€„Ä¤ì(€€€€€€€½¹ÍĞÍ”€ô4¹½Á…ÅÕ”°¡”€ô4¹ÑÉ…¹Íµ¥ÍÍ¥Ù”ì(€€€€€€€¥˜€¡¹Í•ÑÕÁ1¥¡ÑÌ ¤°T¹¥ÍÉÉ…å…µ•É„¤ì(€€€€€€€€€½¹ÍĞµ”€ôT¹…µ•É…Ìì(€€€€€€€€€¥˜€¡¡”¹±•¹Ñ €ø€À¤™½È€¡±•Ğ”€ô€À°A”€ôµ”¹±•¹Ñ ì”€ğA”ì”¬¬¤ì(€€€€€€€€€€€½¹ÍĞ­”€ôµ•m•tì(€€€€€€€€€€€Í„¡Í”°¡”°à°­”¤ì(€€€€€€€€€ô(€€€€€€€€€}Ğ€˜˜U”¹É•¹‘•È¡à¤ì(€€€€€€€€€™½È€¡±•Ğ”€ô€À°A”€ôµ”¹±•¹Ñ ì”€ğA”ì”¬¬¤ì(€€€€€€€€€€€½¹ÍĞ­”€ôµ•m•tì(€€€€€€€€€€€É„¡4°à°­”°­”¹Ù¥•İÁ½ÉĞ¤ì(€€€€€€€€€ô(€€€€€€€ô•±Í”(€€€€€€€€€¡”¹±•¹Ñ €ø€À€˜˜Í„¡Í”°¡”°à°T¤°}Ğ€˜˜U”¹É•¹‘•È¡à¤°É„¡4°à°T¤ì(€€€€€ô(€€€€€<€„ôô¹Õ±°€˜˜,€ôôô€À€˜˜€¡\¹ÕÁ‘…Ñ•5Õ±Ñ¥Í…µÁ±•I•¹‘•ÉQ…É•Ğ¡<¤°\¹ÕÁ‘…Ñ•I•¹‘•ÉQ…É•Ñ5¥Áµ…À¡<¤¤°è€˜˜œ¹•¹¡ä¤°à¹¥ÍM•¹”€ôôô€„À€˜˜à¹½¹™Ñ•ÉI•¹‘•È¡ä°à°T¤°™”¹É•Í•Ñ•™…Õ±ÑMÑ…Ñ” ¤°Ñ”€ô€´Ä°€€ô¹Õ±°°¹Á½À ¤°¹±•¹Ñ €ø€À€ü€¡€ôm¹±•¹Ñ €´€Åt°\¹Í•ÑQ•áÑÕÉ•U¹¥ÑÌ¡¹ÍÑ…Ñ”¹Ñ•áÑÕÉ•U¹¥ÑÌ¤°¹Ğ€ôôô€„À€˜˜á”¹Í•Ñ±½‰…±MÑ…Ñ”¡ä¹±¥ÁÁ¥¹A±…¹•Ì°¹ÍÑ…Ñ”¹…µ•É„¤¤€è€ô¹Õ±°°H¹Á½À ¤°H¹±•¹Ñ €ø€À€ü4€ôImH¹±•¹Ñ €´€Åt€è4€ô¹Õ±°°Ü€„ôô¹Õ±°€˜˜Ü¹É•¹‘•É¹ ¤ì(€€€ôì(€€€™Õ¹Ñ¥½¸€‘È¡à°T°X°è¤ì(€€€€€¥˜€¡à¹Ù¥Í¥‰±”€ôôô€„Ä¤É•ÑÕÉ¸ì(€€€€€¥˜€¡à¹±…å•ÉÌ¹Ñ•ÍĞ¡T¹±…å•ÉÌ¤¤ì(€€€€€€€¥˜€¡à¹¥ÍÉ½ÕÀ¤X€ôà¹É•¹‘•É=É‘•Èì(€€€€€€€•±Í”¥˜€¡à¹¥Í1=¤(€€€€€€€€€à¹…ÕÑ½UÁ‘…Ñ”€ôôô€„À€˜˜à¹ÕÁ‘…Ñ”¡T¤ì(€€€€€€€•±Í”¥˜€¡à¹¥Í1¥¡ÑAÉ½‰•É¥¤¹ÁÕÍ¡1¥¡ÑAÉ½‰•É¥¡à¤ì(€€€€€€€•±Í”¥˜€¡à¹¥Í1¥¡Ğ¤(€€€€€€€€€¹ÁÕÍ¡1¥¡Ğ¡à¤°à¹…ÍÑM¡…‘½Ü€˜˜¹ÁÕÍ¡M¡…‘½Ü¡à¤ì(€€€€€€€•±Í”¥˜€¡à¹¥ÍMÁÉ¥Ñ”¤ì(€€€€€€€€€¥˜€ …à¹™ÉÕÍÑÕµÕ±±•ñğ]”¹¥¹Ñ•ÉÍ•ÑÍMÁÉ¥Ñ”¡à¤¤ì(€€€€€€€€€€€è€˜˜ÉĞ¹Í•ÑÉ½µ5…ÑÉ¥áA½Í¥Ñ¥½¸¡à¹µ…ÑÉ¥á]½É±¤¹…ÁÁ±å5…ÑÉ¥àĞ¡1Ğ¤ì(€€€€€€€€€€€½¹ÍĞÍ”€ô$¹ÕÁ‘…Ñ”¡à¤°¡”€ôà¹µ…Ñ•É¥…°ì(€€€€€€€€€€€¡”¹Ù¥Í¥‰±”€˜˜4¹ÁÕÍ ¡à°Í”°¡”°X°ÉĞ¹è°¹Õ±°¤ì(€€€€€€€€€ô(€€€€€€€ô•±Í”¥˜€ ¡à¹¥Í5•Í ñğà¹¥Í1¥¹”ñğà¹¥ÍA½¥¹ÑÌ¤€˜˜€ …à¹™ÉÕÍÑÕµÕ±±•ñğ]”¹¥¹Ñ•ÉÍ•ÑÍ=‰©•Ğ¡à¤¤¤ì(€€€€€€€€€½¹ÍĞÍ”€ô$¹ÕÁ‘…Ñ”¡à¤°¡”€ôà¹µ…Ñ•É¥…°ì(€€€€€€€€€¥˜€¡è€˜˜€¡à¹‰½Õ¹‘¥¹MÁ¡•É”€„ôôÙ½¥€À€ü€¡à¹‰½Õ¹‘¥¹MÁ¡•É”€ôôô¹Õ±°€˜˜à¹½µÁÕÑ•	½Õ¹‘¥¹MÁ¡•É” ¤°ÉĞ¹½Áä¡à¹‰½Õ¹‘¥¹MÁ¡•É”¹•¹Ñ•È¤¤€è€¡Í”¹‰½Õ¹‘¥¹MÁ¡•É”€ôôô¹Õ±°€˜˜Í”¹½µÁÕÑ•	½Õ¹‘¥¹MÁ¡•É” ¤°ÉĞ¹½Áä¡Í”¹‰½Õ¹‘¥¹MÁ¡•É”¹•¹Ñ•È¤¤°ÉĞ¹…ÁÁ±å5…ÑÉ¥àĞ¡à¹µ…ÑÉ¥á]½É±¤¹…ÁÁ±å5…ÑÉ¥àĞ¡1Ğ¤¤°ÉÉ…ä¹¥ÍÉÉ…ä¡¡”¤¤ì(€€€€€€€€€€€½¹ÍĞµ”€ôÍ”¹É½ÕÁÌì(€€€€€€€€€€€™½È€¡±•Ğ”€ô€À°A”€ôµ”¹±•¹Ñ ì”€ğA”ì”¬¬¤ì(€€€€€€€€€€€€€½¹ÍĞ­”€ôµ•m•t°Y”€ô¡•m­”¹µ…Ñ•É¥…±%¹‘•átì(€€€€€€€€€€€€€Y”€˜˜Y”¹Ù¥Í¥‰±”€˜˜4¹ÁÕÍ ¡à°Í”°Y”°X°ÉĞ¹è°­”¤ì(€€€€€€€€€€€ô(€€€€€€€€€ô•±Í”¡”¹Ù¥Í¥‰±”€˜˜4¹ÁÕÍ ¡à°Í”°¡”°X°ÉĞ¹è°¹Õ±°¤ì(€€€€€€€ô(€€€€€ô(€€€€€½¹ÍĞ€ôà¹¡¥±‘É•¸ì(€€€€€™½È€¡±•ĞÍ”€ô€À°¡”€ô¹±•¹Ñ ìÍ”€ğ¡”ìÍ”¬¬¤€‘È¡mÍ•t°T°X°è¤ì(€€€ô(€€€™Õ¹Ñ¥½¸É„¡à°T°X°è¤ì(€€€€€½¹ÍĞì½Á…ÅÕ”è°ÑÉ…¹Íµ¥ÍÍ¥Ù”èÍ”°ÑÉ…¹ÍÁ…É•¹Ğè¡”ô€ôàì(€€€€€¹Í•ÑÕÁ1¥¡ÑÍY¥•Ü¡X¤°¹Ğ€ôôô€„À€˜˜á”¹Í•Ñ±½‰…±MÑ…Ñ”¡ä¹±¥ÁÁ¥¹A±…¹•Ì°X¤°è€˜˜L¹Ù¥•İÁ½ÉĞ¡¥”¹½Áä¡è¤¤°¹±•¹Ñ €ø€À€˜˜ÑÈ¡°T°X¤°Í”¹±•¹Ñ €ø€À€˜˜ÑÈ¡Í”°T°X¤°¡”¹±•¹Ñ €ø€À€˜˜ÑÈ¡¡”°T°X¤°L¹‰Õ™™•ÉÌ¹‘•ÁÑ ¹Í•ÑQ•ÍĞ „À¤°L¹‰Õ™™•ÉÌ¹‘•ÁÑ ¹Í•Ñ5…Í¬ „À¤°L¹‰Õ™™•ÉÌ¹½±½È¹Í•Ñ5…Í¬ „À¤°L¹Í•ÑA½±å½¹=™™Í•Ğ „Ä¤ì(€€€ô(€€€™Õ¹Ñ¥½¸Í„¡à°T°X°è¤ì(€€€€€¥˜€ ¡X¹¥ÍM•¹”€ôôô€„À€üX¹½Ù•ÉÉ¥‘•5…Ñ•É¥…°€è¹Õ±°¤€„ôô¹Õ±°¤É•ÑÕÉ¸ì(€€€€€¥˜€¡¹ÍÑ…Ñ”¹ÑÉ…¹Íµ¥ÍÍ¥½¹I•¹‘•ÉQ…É•Ñmè¹¥‘t€ôôôÙ½¥€À¤ì(€€€€€€€½¹ÍĞY”€ôe”¹¡…Ì ‰aQ}½±½É}‰Õ™™•É}¡…±™}™±½…Ğˆ¤ñğe”¹¡…Ì ‰aQ}½±½É}‰Õ™™•É}™±½…Ğˆ¤ì(€€€€€€€¹ÍÑ…Ñ”¹ÑÉ…¹Íµ¥ÍÍ¥½¹I•¹‘•ÉQ…É•Ñmè¹¥‘t€ô¹•Ü±¤ Ä°€Ä°ì(€€€€€€€€€•¹•É…Ñ•5¥Áµ…ÁÌè€„À°(€€€€€€€€€ÑåÁ”èY”€üa¤€è9¤°(€€€€€€€€€µ¥¹¥±Ñ•ÈèÅÈ°(€€€€€€€€€Í…µÁ±•Ìè5…Ñ ¹µ…à Ğ°ÍĞ¹Í…µÁ±•Ì¤°(€€€€€€€€€ÍÑ•¹¥±	Õ™™•ÈèÈ°(€€€€€€€€€É•Í½±Ù••ÁÑ¡	Õ™™•Èè€„Ä°(€€€€€€€€€É•Í½±Ù•MÑ•¹¥±	Õ™™•Èè€„Ä°(€€€€€€€€€½±½ÉMÁ…”è!”¹İ½É­¥¹½±½ÉMÁ…”(€€€€€€€ô¤ì(€€€€€ô(€€€€€½¹ÍĞ€ô¹ÍÑ…Ñ”¹ÑÉ…¹Íµ¥ÍÍ¥½¹I•¹‘•ÉQ…É•Ñmè¹¥‘t°Í”€ôè¹Ù¥•İÁ½ÉĞñğ¥”ì(€€€€€¹Í•ÑM¥é”¡Í”¹è€¨ä¹ÑÉ…¹Íµ¥ÍÍ¥½¹I•Í½±ÕÑ¥½¹M…±”°Í”¹Ü€¨ä¹ÑÉ…¹Íµ¥ÍÍ¥½¹I•Í½±ÕÑ¥½¹M…±”¤ì(€€€€€½¹ÍĞ¡”€ôä¹•ÑI•¹‘•ÉQ…É•Ğ ¤°µ”€ôä¹•ÑÑ¥Ù•Õ‰•…” ¤°”€ôä¹•ÑÑ¥Ù•5¥Áµ…Á1•Ù•° ¤ì(€€€€€ä¹Í•ÑI•¹‘•ÉQ…É•Ğ¡¤°ä¹•Ñ±•…É½±½È¡Ù”¤°å”€ôä¹•Ñ±•…É±Á¡„ ¤°å”€ğ€Ä€˜˜ä¹Í•Ñ±•…É½±½È ÄØÜÜÜÈÄÔ°€À¸Ô¤°ä¹±•…È ¤°}Ğ€˜˜U”¹É•¹‘•È¡X¤ì(€€€€€½¹ÍĞA”€ôä¹Ñ½¹•5…ÁÁ¥¹œì(€€€€€ä¹Ñ½¹•5…ÁÁ¥¹œ€ô€Àì(€€€€€½¹ÍĞ­”€ôè¹Ù¥•İÁ½ÉĞì(€€€€€¥˜€¡è¹Ù¥•İÁ½ÉĞ€„ôôÙ½¥€À€˜˜€¡è¹Ù¥•İÁ½ÉĞ€ôÙ½¥€À¤°¹Í•ÑÕÁ1¥¡ÑÍY¥•Ü¡è¤°¹Ğ€ôôô€„À€˜˜á”¹Í•Ñ±½‰…±MÑ…Ñ”¡ä¹±¥ÁÁ¥¹A±…¹•Ì°è¤°ÑÈ¡à°X°è¤°\¹ÕÁ‘…Ñ•5Õ±Ñ¥Í…µÁ±•I•¹‘•ÉQ…É•Ğ¡¤°\¹ÕÁ‘…Ñ•I•¹‘•ÉQ…É•Ñ5¥Áµ…À¡¤°e”¹¡…Ì ‰]	1}µÕ±Ñ¥Í…µÁ±•‘}É•¹‘•É}Ñ½}Ñ•áÑÕÉ”ˆ¤€ôôô€„Ä¤ì(€€€€€€€±•ĞY”€ô€„Äì(€€€€€€€™½È€¡±•Ğ”€ô€À°ÑĞ€ôT¹±•¹Ñ ì”€ğÑĞì”¬¬¤ì(€€€€€€€€€½¹ÍĞì½‰©•Ğè½Ğ°•½µ•ÑÉäè±Ğ°µ…Ñ•É¥…°èa”°É½ÕÀèMĞô€ôUm•tì(€€€€€€€€€¥˜€¡a”¹Í¥‘”€ôôô€È€˜˜½Ğ¹±…å•ÉÌ¹Ñ•ÍĞ¡è¹±…å•ÉÌ¤¤ì(€€€€€€€€€€€½¹ÍĞ5”€ôa”¹Í¥‘”ì(€€€€€€€€€€€a”¹Í¥‘”€ô€Ä°a”¹¹••‘ÍUÁ‘…Ñ”€ô€„À°…„¡½Ğ°X°è°±Ğ°a”°MĞ¤°a”¹Í¥‘”€ô5”°a”¹¹••‘ÍUÁ‘…Ñ”€ô€„À°Y”€ô€„Àì(€€€€€€€€€ô(€€€€€€€ô(€€€€€€€Y”€ôôô€„À€˜˜€¡\¹ÕÁ‘…Ñ•5Õ±Ñ¥Í…µÁ±•I•¹‘•ÉQ…É•Ğ¡¤°\¹ÕÁ‘…Ñ•I•¹‘•ÉQ…É•Ñ5¥Áµ…À¡¤¤ì(€€€€€ô(€€€€€ä¹Í•ÑI•¹‘•ÉQ…É•Ğ¡¡”°µ”°”¤°ä¹Í•Ñ±•…É½±½È¡Ù”°å”¤°­”€„ôôÙ½¥€À€˜˜€¡è¹Ù¥•İÁ½ÉĞ€ô­”¤°ä¹Ñ½¹•5…ÁÁ¥¹œ€ôA”ì(€€€ô(€€€™Õ¹Ñ¥½¸ÑÈ¡à°T°X¤ì(€€€€€½¹ÍĞè€ôT¹¥ÍM•¹”€ôôô€„À€üT¹½Ù•ÉÉ¥‘•5…Ñ•É¥…°€è¹Õ±°ì(€€€€€™½È€¡±•Ğ€ô€À°Í”€ôà¹±•¹Ñ ì€ğÍ”ì¬¬¤ì(€€€€€€€½¹ÍĞ¡”€ôámt°ì½‰©•Ğèµ”°•½µ•ÑÉäè”°É½ÕÀèA”ô€ô¡”ì(€€€€€€€±•Ğ­”€ô¡”¹µ…Ñ•É¥…°ì(€€€€€€€­”¹…±±½İ=Ù•ÉÉ¥‘”€ôôô€„À€˜˜è€„ôô¹Õ±°€˜˜€¡­”€ôè¤°µ”¹±…å•ÉÌ¹Ñ•ÍĞ¡X¹±…å•ÉÌ¤€˜˜…„¡µ”°T°X°”°­”°A”¤ì(€€€€€ô(€€€ô(€€€™Õ¹Ñ¥½¸…„¡à°T°X°è°°Í”¤ì(€€€€€à¹½¹	•™½É•I•¹‘•È¡ä°T°X°è°°Í”¤°à¹µ½‘•±Y¥•İ5…ÑÉ¥à¹µÕ±Ñ¥Á±å5…ÑÉ¥•Ì¡X¹µ…ÑÉ¥á]½É±‘%¹Ù•ÉÍ”°à¹µ…ÑÉ¥á]½É±¤°à¹¹½Éµ…±5…ÑÉ¥à¹•Ñ9½Éµ…±5…ÑÉ¥à¡à¹µ½‘•±Y¥•İ5…ÑÉ¥à¤°¹½¹	•™½É•I•¹‘•È¡ä°T°X°è°à°Í”¤°¹ÑÉ…¹ÍÁ…É•¹Ğ€ôôô€„À€˜˜¹Í¥‘”€ôôô€È€˜˜¹™½É•M¥¹±•A…ÍÌ€ôôô€„Ä€ü€¡¹Í¥‘”€ô€Ä°¹¹••‘ÍUÁ‘…Ñ”€ô€„À°ä¹É•¹‘•É	Õ™™•É¥É•Ğ¡X°T°è°°à°Í”¤°¹Í¥‘”€ô€À°¹¹••‘ÍUÁ‘…Ñ”€ô€„À°ä¹É•¹‘•É	Õ™™•É¥É•Ğ¡X°T°è°°à°Í”¤°¹Í¥‘”€ô€È¤€èä¹É•¹‘•É	Õ™™•É¥É•Ğ¡X°T°è°°à°Í”¤°à¹½¹™Ñ•ÉI•¹‘•È¡ä°T°X°è°°Í”¤ì(€€€ô(€€€™Õ¹Ñ¥½¸¥È¡à°T°X¤ì(€€€€€T¹¥ÍM•¹”€„ôô€„À€˜˜€¡T€ô5Ğ¤ì(€€€€€½¹ÍĞè€ô@¹•Ğ¡à¤°€ô¹ÍÑ…Ñ”¹±¥¡ÑÌ°Í”€ô¹ÍÑ…Ñ”¹Í¡…‘½İÍÉÉ…ä°¡”€ô¹ÍÑ…Ñ”¹Ù•ÉÍ¥½¸°µ”€ô¹”¹•ÑA…É…µ•Ñ•ÉÌ¡à°¹ÍÑ…Ñ”°Í”°T°X°¹ÍÑ…Ñ”¹±¥¡ÑAÉ½‰•É¥‘ÉÉ…ä¤°”€ô¹”¹•ÑAÉ½É…µ…¡•-•ä¡µ”¤ì(€€€€€±•ĞA”€ôè¹ÁÉ½É…µÌì(€€€€€è¹•¹Ù¥É½¹µ•¹Ğ€ôà¹¥Í5•Í¡MÑ…¹‘…É‘5…Ñ•É¥…°ñğà¹¥Í5•Í¡1…µ‰•ÉÑ5…Ñ•É¥…°ñğà¹¥Í5•Í¡A¡½¹5…Ñ•É¥…°€üT¹•¹Ù¥É½¹µ•¹Ğ€è¹Õ±°°è¹™½œ€ôT¹™½œì(€€€€€½¹ÍĞ­”€ôà¹¥Í5•Í¡MÑ…¹‘…É‘5…Ñ•É¥…°ñğà¹¥Í5•Í¡1…µ‰•ÉÑ5…Ñ•É¥…°€˜˜€…à¹•¹Ù5…Àñğà¹¥Í5•Í¡A¡½¹5…Ñ•É¥…°€˜˜€…à¹•¹Ù5…Àì(€€€€€è¹•¹Ù5…À€ôd¹•Ğ¡à¹•¹Ù5…Àñğè¹•¹Ù¥É½¹µ•¹Ğ°­”¤°è¹•¹Ù5…ÁI½Ñ…Ñ¥½¸€ôè¹•¹Ù¥É½¹µ•¹Ğ€„ôô¹Õ±°€˜˜à¹•¹Ù5…À€ôôô¹Õ±°€üT¹•¹Ù¥É½¹µ•¹ÑI½Ñ…Ñ¥½¸€èà¹•¹Ù5…ÁI½Ñ…Ñ¥½¸°A”€ôôôÙ½¥€À€˜˜€¡à¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰‘¥ÍÁ½Í”ˆ°Ñ¤¤°A”€ô€¼¨}}AUI}|€¨¼¹•Ü5…À ¤°è¹ÁÉ½É…µÌ€ôA”¤ì(€€€€€±•ĞY”€ôA”¹•Ğ¡”¤ì(€€€€€¥˜€¡Y”€„ôôÙ½¥€À¤ì(€€€€€€€¥˜€¡è¹ÕÉÉ•¹ÑAÉ½É…´€ôôôY”€˜˜è¹±¥¡ÑÍMÑ…Ñ•Y•ÉÍ¥½¸€ôôô¡”¤(€€€€€€€€€É•ÑÕÉ¸±„¡à°µ”¤°Y”ì(€€€€€ô•±Í”(€€€€€€€µ”¹Õ¹¥™½ÉµÌ€ô¹”¹•ÑU¹¥™½ÉµÌ¡à¤°Ü€„ôô¹Õ±°€˜˜à¹¥Í9½‘•5…Ñ•É¥…°€˜˜Ü¹‰Õ¥±¡à°X°µ”¤°à¹½¹	•™½É•½µÁ¥±”¡µ”°ä¤°Y”€ô¹”¹…ÅÕ¥É•AÉ½É…´¡µ”°”¤°A”¹Í•Ğ¡”°Y”¤°è¹Õ¹¥™½ÉµÌ€ôµ”¹Õ¹¥™½ÉµÌì(€€€€€½¹ÍĞ”€ôè¹Õ¹¥™½ÉµÌì(€€€€€É•ÑÕÉ¸€ …à¹¥ÍM¡…‘•É5…Ñ•É¥…°€˜˜€…à¹¥ÍI…İM¡…‘•É5…Ñ•É¥…°ñğà¹±¥ÁÁ¥¹œ€ôôô€„À¤€˜˜€¡”¹±¥ÁÁ¥¹A±…¹•Ì€ôá”¹Õ¹¥™½É´¤°±„¡à°µ”¤°è¹¹••‘Í1¥¡ÑÌ€ôU°¡à¤°è¹±¥¡ÑÍMÑ…Ñ•Y•ÉÍ¥½¸€ô¡”°è¹¹••‘Í1¥¡ÑÌ€˜˜€¡”¹…µ‰¥•¹Ñ1¥¡Ñ½±½È¹Ù…±Õ”€ô¹ÍÑ…Ñ”¹…µ‰¥•¹Ğ°”¹±¥¡ÑAÉ½‰”¹Ù…±Õ”€ô¹ÍÑ…Ñ”¹ÁÉ½‰”°”¹‘¥É•Ñ¥½¹…±1¥¡ÑÌ¹Ù…±Õ”€ô¹ÍÑ…Ñ”¹‘¥É•Ñ¥½¹…°°”¹‘¥É•Ñ¥½¹…±1¥¡ÑM¡…‘½İÌ¹Ù…±Õ”€ô¹ÍÑ…Ñ”¹‘¥É•Ñ¥½¹…±M¡…‘½Ü°”¹ÍÁ½Ñ1¥¡ÑÌ¹Ù…±Õ”€ô¹ÍÑ…Ñ”¹ÍÁ½Ğ°”¹ÍÁ½Ñ1¥¡ÑM¡…‘½İÌ¹Ù…±Õ”€ô¹ÍÑ…Ñ”¹ÍÁ½ÑM¡…‘½Ü°”¹É•ÑÉ•…1¥¡ÑÌ¹Ù…±Õ”€ô¹ÍÑ…Ñ”¹É•ÑÉ•„°”¹±Ñ|Ä¹Ù…±Õ”€ô¹ÍÑ…Ñ”¹É•ÑÉ•…1QÄ°”¹±Ñ|È¹Ù…±Õ”€ô¹ÍÑ…Ñ”¹É•ÑÉ•…1QÈ°”¹Á½¥¹Ñ1¥¡ÑÌ¹Ù…±Õ”€ô¹ÍÑ…Ñ”¹Á½¥¹Ğ°”¹Á½¥¹Ñ1¥¡ÑM¡…‘½İÌ¹Ù…±Õ”€ô¹ÍÑ…Ñ”¹Á½¥¹ÑM¡…‘½Ü°”¹¡•µ¥ÍÁ¡•É•1¥¡ÑÌ¹Ù…±Õ”€ô¹ÍÑ…Ñ”¹¡•µ¤°”¹‘¥É•Ñ¥½¹…±M¡…‘½İ5…ÑÉ¥à¹Ù…±Õ”€ô¹ÍÑ…Ñ”¹‘¥É•Ñ¥½¹…±M¡…‘½İ5…ÑÉ¥à°”¹ÍÁ½Ñ1¥¡Ñ5…ÑÉ¥à¹Ù…±Õ”€ô¹ÍÑ…Ñ”¹ÍÁ½Ñ1¥¡Ñ5…ÑÉ¥à°”¹ÍÁ½Ñ1¥¡Ñ5…À¹Ù…±Õ”€ô¹ÍÑ…Ñ”¹ÍÁ½Ñ1¥¡Ñ5…À°”¹Á½¥¹ÑM¡…‘½İ5…ÑÉ¥à¹Ù…±Õ”€ô¹ÍÑ…Ñ”¹Á½¥¹ÑM¡…‘½İ5…ÑÉ¥à¤°è¹±¥¡ÑAÉ½‰•É¥€ô¹ÍÑ…Ñ”¹±¥¡ÑAÉ½‰•É¥‘ÉÉ…ä¹±•¹Ñ €ø€À°è¹ÕÉÉ•¹ÑAÉ½É…´€ôY”°è¹Õ¹¥™½ÉµÍ1¥ÍĞ€ô¹Õ±°°Y”ì(€€€ô(€€€™Õ¹Ñ¥½¸½„¡à¤ì(€€€€€¥˜€¡à¹Õ¹¥™½ÉµÍ1¥ÍĞ€ôôô¹Õ±°¤ì(€€€€€€€½¹ÍĞT€ôà¹ÕÉÉ•¹ÑAÉ½É…´¹•ÑU¹¥™½ÉµÌ ¤ì(€€€€€€€à¹Õ¹¥™½ÉµÍ1¥ÍĞ€ôUÈ¹Í•Å]¥Ñ¡Y…±Õ”¡T¹Í•Ä°à¹Õ¹¥™½ÉµÌ¤ì(€€€€€ô(€€€€€É•ÑÕÉ¸à¹Õ¹¥™½ÉµÍ1¥ÍĞì(€€€ô(€€€™Õ¹Ñ¥½¸±„¡à°T¤ì(€€€€€½¹ÍĞX€ô@¹•Ğ¡à¤ì(€€€€€X¹½ÕÑÁÕÑ½±½ÉMÁ…”€ôT¹½ÕÑÁÕÑ½±½ÉMÁ…”°X¹‰…Ñ¡¥¹œ€ôT¹‰…Ñ¡¥¹œ°X¹‰…Ñ¡¥¹½±½È€ôT¹‰…Ñ¡¥¹½±½È°X¹¥¹ÍÑ…¹¥¹œ€ôT¹¥¹ÍÑ…¹¥¹œ°X¹¥¹ÍÑ…¹¥¹½±½È€ôT¹¥¹ÍÑ…¹¥¹½±½È°X¹¥¹ÍÑ…¹¥¹5½ÉÁ €ôT¹¥¹ÍÑ…¹¥¹5½ÉÁ °X¹Í­¥¹¹¥¹œ€ôT¹Í­¥¹¹¥¹œ°X¹µ½ÉÁ¡Q…É•ÑÌ€ôT¹µ½ÉÁ¡Q…É•ÑÌ°X¹µ½ÉÁ¡9½Éµ…±Ì€ôT¹µ½ÉÁ¡9½Éµ…±Ì°X¹µ½ÉÁ¡½±½ÉÌ€ôT¹µ½ÉÁ¡½±½ÉÌ°X¹µ½ÉÁ¡Q…É•ÑÍ½Õ¹Ğ€ôT¹µ½ÉÁ¡Q…É•ÑÍ½Õ¹Ğ°X¹¹Õµ±¥ÁÁ¥¹A±…¹•Ì€ôT¹¹Õµ±¥ÁÁ¥¹A±…¹•Ì°X¹¹Õµ%¹Ñ•ÉÍ•Ñ¥½¸€ôT¹¹Õµ±¥Á%¹Ñ•ÉÍ•Ñ¥½¸°X¹Ù•ÉÑ•á±Á¡…Ì€ôT¹Ù•ÉÑ•á±Á¡…Ì°X¹Ù•ÉÑ•áQ…¹•¹ÑÌ€ôT¹Ù•ÉÑ•áQ…¹•¹ÑÌ°X¹Ñ½¹•5…ÁÁ¥¹œ€ôT¹Ñ½¹•5…ÁÁ¥¹œì(€€€ô(€€€™Õ¹Ñ¥½¸°¡à°T¤ì(€€€€€¥˜€¡à¹±•¹Ñ €ôôô€À¤É•ÑÕÉ¸¹Õ±°ì(€€€€€¥˜€¡à¹±•¹Ñ €ôôô€Ä¤É•ÑÕÉ¸álÁt¹Ñ•áÑÕÉ”€„ôô¹Õ±°€üálÁt€è¹Õ±°ì(€€€€€¹Í•ÑÉ½µ5…ÑÉ¥áA½Í¥Ñ¥½¸¡T¹µ…ÑÉ¥á]½É±¤ì(€€€€€™½È€¡±•ĞX€ô€À°è€ôà¹±•¹Ñ ìX€ğèìX¬¬¤ì(€€€€€€€½¹ÍĞ€ôámYtì(€€€€€€€¥˜€¡¹Ñ•áÑÕÉ”€„ôô¹Õ±°€˜˜¹‰½Õ¹‘¥¹	½à¹½¹Ñ…¥¹ÍA½¥¹Ğ¡¤¤É•ÑÕÉ¸ì(€€€€€ô(€€€€€É•ÑÕÉ¸¹Õ±°ì(€€€ô(€€€™Õ¹Ñ¥½¸%°¡à°T°X°è°¤ì(€€€€€T¹¥ÍM•¹”€„ôô€„À€˜˜€¡T€ô5Ğ¤°\¹É•Í•ÑQ•áÑÕÉ•U¹¥ÑÌ ¤ì(€€€€€½¹ÍĞÍ”€ôT¹™½œ°¡”€ôè¹¥Í5•Í¡MÑ…¹‘…É‘5…Ñ•É¥…°ñğè¹¥Í5•Í¡1…µ‰•ÉÑ5…Ñ•É¥…°ñğè¹¥Í5•Í¡A¡½¹5…Ñ•É¥…°€üT¹•¹Ù¥É½¹µ•¹Ğ€è¹Õ±°°µ”€ô<€ôôô¹Õ±°€üä¹½ÕÑÁÕÑ½±½ÉMÁ…”€è<¹¥ÍaII•¹‘•ÉQ…É•Ğ€ôôô€„À€ü<¹Ñ•áÑÕÉ”¹½±½ÉMÁ…”€è!”¹İ½É­¥¹½±½ÉMÁ…”°”€ôè¹¥Í5•Í¡MÑ…¹‘…É‘5…Ñ•É¥…°ñğè¹¥Í5•Í¡1…µ‰•ÉÑ5…Ñ•É¥…°€˜˜€…è¹•¹Ù5…Àñğè¹¥Í5•Í¡A¡½¹5…Ñ•É¥…°€˜˜€…è¹•¹Ù5…À°A”€ôd¹•Ğ¡è¹•¹Ù5…Àñğ¡”°”¤°­”€ôè¹Ù•ÉÑ•á½±½ÉÌ€ôôô€„À€˜˜€„…X¹…ÑÑÉ¥‰ÕÑ•Ì¹½±½È€˜˜X¹…ÑÑÉ¥‰ÕÑ•Ì¹½±½È¹¥Ñ•µM¥é”€ôôô€Ğ°Y”€ô€„…X¹…ÑÑÉ¥‰ÕÑ•Ì¹Ñ…¹•¹Ğ€˜˜€ „…è¹¹½Éµ…±5…Àñğè¹…¹¥Í½ÑÉ½Áä€ø€À¤°”€ô€„…X¹µ½ÉÁ¡ÑÑÉ¥‰ÕÑ•Ì¹Á½Í¥Ñ¥½¸°ÑĞ€ô€„…X¹µ½ÉÁ¡ÑÑÉ¥‰ÕÑ•Ì¹¹½Éµ…°°½Ğ€ô€„…X¹µ½ÉÁ¡ÑÑÉ¥‰ÕÑ•Ì¹½±½Èì(€€€€€±•Ğ±Ğ€ô€Àì(€€€€€è¹Ñ½¹•5…ÁÁ•€˜˜€¡<€ôôô¹Õ±°ñğ<¹¥ÍaII•¹‘•ÉQ…É•Ğ€ôôô€„À¤€˜˜€¡±Ğ€ôä¹Ñ½¹•5…ÁÁ¥¹œ¤ì(€€€€€½¹ÍĞa”€ôX¹µ½ÉÁ¡ÑÑÉ¥‰ÕÑ•Ì¹Á½Í¥Ñ¥½¸ñğX¹µ½ÉÁ¡ÑÑÉ¥‰ÕÑ•Ì¹¹½Éµ…°ñğX¹µ½ÉÁ¡ÑÑÉ¥‰ÕÑ•Ì¹½±½È°MĞ€ôa”€„ôôÙ½¥€À€üa”¹±•¹Ñ €è€À°5”€ô@¹•Ğ¡è¤°ÅĞ€ô¹ÍÑ…Ñ”¹±¥¡ÑÌì(€€€€€¥˜€¡¹Ğ€ôôô€„À€˜˜€¡‰Ğ€ôôô€„Àñğà€„ôô€¤¤ì(€€€€€€€½¹ÍĞi”€ôà€ôôô€€˜˜è¹¥€ôôôÑ”ì(€€€€€€€á”¹Í•ÑMÑ…Ñ”¡è°à°i”¤ì(€€€€€ô(€€€€€±•Ğ-”€ô€„Äì(€€€€€è¹Ù•ÉÍ¥½¸€ôôô5”¹}}Ù•ÉÍ¥½¸€ü€¡5”¹¹••‘Í1¥¡ÑÌ€˜˜5”¹±¥¡ÑÍMÑ…Ñ•Y•ÉÍ¥½¸€„ôôÅĞ¹ÍÑ…Ñ”¹Ù•ÉÍ¥½¸ñğ5”¹½ÕÑÁÕÑ½±½ÉMÁ…”€„ôôµ”ñğ¹¥Í	…Ñ¡•‘5•Í €˜˜5”¹‰…Ñ¡¥¹œ€ôôô€„Äñğ€…¹¥Í	…Ñ¡•‘5•Í €˜˜5”¹‰…Ñ¡¥¹œ€ôôô€„Àñğ¹¥Í	…Ñ¡•‘5•Í €˜˜5”¹‰…Ñ¡¥¹½±½È€ôôô€„À€˜˜¹½±½ÉQ•áÑÕÉ”€ôôô¹Õ±°ñğ¹¥Í	…Ñ¡•‘5•Í €˜˜5”¹‰…Ñ¡¥¹½±½È€ôôô€„Ä€˜˜¹½±½ÉQ•áÑÕÉ”€„ôô¹Õ±°ñğ¹¥Í%¹ÍÑ…¹•‘5•Í €˜˜5”¹¥¹ÍÑ…¹¥¹œ€ôôô€„Äñğ€…¹¥Í%¹ÍÑ…¹•‘5•Í €˜˜5”¹¥¹ÍÑ…¹¥¹œ€ôôô€„Àñğ¹¥ÍM­¥¹¹•‘5•Í €˜˜5”¹Í­¥¹¹¥¹œ€ôôô€„Äñğ€…¹¥ÍM­¥¹¹•‘5•Í €˜˜5”¹Í­¥¹¹¥¹œ€ôôô€„Àñğ¹¥Í%¹ÍÑ…¹•‘5•Í €˜˜5”¹¥¹ÍÑ…¹¥¹½±½È€ôôô€„À€˜˜¹¥¹ÍÑ…¹•½±½È€ôôô¹Õ±°ñğ¹¥Í%¹ÍÑ…¹•‘5•Í €˜˜5”¹¥¹ÍÑ…¹¥¹½±½È€ôôô€„Ä€˜˜¹¥¹ÍÑ…¹•½±½È€„ôô¹Õ±°ñğ¹¥Í%¹ÍÑ…¹•‘5•Í €˜˜5”¹¥¹ÍÑ…¹¥¹5½ÉÁ €ôôô€„À€˜˜¹µ½ÉÁ¡Q•áÑÕÉ”€ôôô¹Õ±°ñğ¹¥Í%¹ÍÑ…¹•‘5•Í €˜˜5”¹¥¹ÍÑ…¹¥¹5½ÉÁ €ôôô€„Ä€˜˜¹µ½ÉÁ¡Q•áÑÕÉ”€„ôô¹Õ±°ñğ5”¹•¹Ù5…À€„ôôA”ñğè¹™½œ€ôôô€„À€˜˜5”¹™½œ€„ôôÍ”ñğ5”¹¹Õµ±¥ÁÁ¥¹A±…¹•Ì€„ôôÙ½¥€À€˜˜€¡5”¹¹Õµ±¥ÁÁ¥¹A±…¹•Ì€„ôôá”¹¹ÕµA±…¹•Ìñğ5”¹¹Õµ%¹Ñ•ÉÍ•Ñ¥½¸€„ôôá”¹¹Õµ%¹Ñ•ÉÍ•Ñ¥½¸¤ñğ5”¹Ù•ÉÑ•á±Á¡…Ì€„ôô­”ñğ5”¹Ù•ÉÑ•áQ…¹•¹ÑÌ€„ôôY”ñğ5”¹µ½ÉÁ¡Q…É•ÑÌ€„ôô”ñğ5”¹µ½ÉÁ¡9½Éµ…±Ì€„ôôÑĞñğ5”¹µ½ÉÁ¡½±½ÉÌ€„ôô½Ğñğ5”¹Ñ½¹•5…ÁÁ¥¹œ€„ôô±Ğñğ5”¹µ½ÉÁ¡Q…É•ÑÍ½Õ¹Ğ€„ôôMĞñğ€„…5”¹±¥¡ÑAÉ½‰•É¥€„ô¹ÍÑ…Ñ”¹±¥¡ÑAÉ½‰•É¥‘ÉÉ…ä¹±•¹Ñ €ø€À¤€˜˜€¡-”€ô€„À¤€è€¡-”€ô€„À°5”¹}}Ù•ÉÍ¥½¸€ôè¹Ù•ÉÍ¥½¸¤ì(€€€€€±•ĞĞ€ô5”¹ÕÉÉ•¹ÑAÉ½É…´ì(€€€€€-”€ôôô€„À€˜˜€¡Ğ€ô¥È¡è°T°¤°Ü€˜˜è¹¥Í9½‘•5…Ñ•É¥…°€˜˜Ü¹½¹UÁ‘…Ñ•AÉ½É…´¡è°Ğ°5”¤¤ì(€€€€€±•Ğ¥¤€ô€„Ä°å¤€ô€„Ä°-¤€ô€„Äì(€€€€€½¹ÍĞE”€ôĞ¹•ÑU¹¥™½ÉµÌ ¤°Ğ€ô5”¹Õ¹¥™½ÉµÌì(€€€€€¥˜€¡L¹ÕÍ•AÉ½É…´¡Ğ¹ÁÉ½É…´¤€˜˜€¡¥¤€ô€„À°å¤€ô€„À°-¤€ô€„À¤°è¹¥€„ôôÑ”€˜˜€¡Ñ”€ôè¹¥°å¤€ô€„À¤°5”¹¹••‘Í1¥¡ÑÌ¤ì(€€€€€€€½¹ÍĞi”€ô°¡¹ÍÑ…Ñ”¹±¥¡ÑAÉ½‰•É¥‘ÉÉ…ä°¤ì(€€€€€€€5”¹±¥¡ÑAÉ½‰•É¥€„ôôi”€˜˜€¡5”¹±¥¡ÑAÉ½‰•É¥€ôi”°å¤€ô€„À¤ì(€€€€€ô(€€€€€¥˜€¡¥¤ñğ€€„ôôà¤ì(€€€€€€€L¹‰Õ™™•ÉÌ¹‘•ÁÑ ¹•ÑI•Ù•ÉÍ• ¤€˜˜à¹É•Ù•ÉÍ•‘•ÁÑ €„ôô€„À€˜˜€¡à¹}É•Ù•ÉÍ•‘•ÁÑ €ô€„À°à¹ÕÁ‘…Ñ•AÉ½©•Ñ¥½¹5…ÑÉ¥à ¤¤°E”¹Í•ÑY…±Õ”¡°€‰ÁÉ½©•Ñ¥½¹5…ÑÉ¥àˆ°à¹ÁÉ½©•Ñ¥½¹5…ÑÉ¥à¤°E”¹Í•ÑY…±Õ”¡°€‰Ù¥•İ5…ÑÉ¥àˆ°à¹µ…ÑÉ¥á]½É±‘%¹Ù•ÉÍ”¤ì(€€€€€€€½¹ÍĞi”€ôE”¹µ…À¹…µ•É…A½Í¥Ñ¥½¸ì(€€€€€€€i”€„ôôÙ½¥€À€˜˜i”¹Í•ÑY…±Õ”¡°	Ğ¹Í•ÑÉ½µ5…ÑÉ¥áA½Í¥Ñ¥½¸¡à¹µ…ÑÉ¥á]½É±¤¤°ÍĞ¹±½…É¥Ñ¡µ¥•ÁÑ¡	Õ™™•È€˜˜E”¹Í•ÑY…±Õ”¡°€‰±½•ÁÑ¡	Õ™ˆ°€È€¼€¡5…Ñ ¹±½œ¡à¹™…È€¬€Ä¤€¼5…Ñ ¹18È¤¤°€¡è¹¥Í5•Í¡A¡½¹5…Ñ•É¥…°ñğè¹¥Í5•Í¡Q½½¹5…Ñ•É¥…°ñğè¹¥Í5•Í¡1…µ‰•ÉÑ5…Ñ•É¥…°ñğè¹¥Í5•Í¡	…Í¥5…Ñ•É¥…°ñğè¹¥Í5•Í¡MÑ…¹‘…É‘5…Ñ•É¥…°ñğè¹¥ÍM¡…‘•É5…Ñ•É¥…°¤€˜˜E”¹Í•ÑY…±Õ”¡°€‰¥Í=ÉÑ¡½É…Á¡¥Œˆ°à¹¥Í=ÉÑ¡½É…Á¡¥…µ•É„€ôôô€„À¤°€€„ôôà€˜˜€ €ôà°å¤€ô€„À°-¤€ô€„À¤ì(€€€€€ô(€€€€€¥˜€¡5”¹¹••‘Í1¥¡ÑÌ€˜˜€¡ÅĞ¹ÍÑ…Ñ”¹‘¥É•Ñ¥½¹…±M¡…‘½İ5…À¹±•¹Ñ €ø€À€˜˜E”¹Í•ÑY…±Õ”¡°€‰‘¥É•Ñ¥½¹…±M¡…‘½İ5…Àˆ°ÅĞ¹ÍÑ…Ñ”¹‘¥É•Ñ¥½¹…±M¡…‘½İ5…À°\¤°ÅĞ¹ÍÑ…Ñ”¹ÍÁ½ÑM¡…‘½İ5…À¹±•¹Ñ €ø€À€˜˜E”¹Í•ÑY…±Õ”¡°€‰ÍÁ½ÑM¡…‘½İ5…Àˆ°ÅĞ¹ÍÑ…Ñ”¹ÍÁ½ÑM¡…‘½İ5…À°\¤°ÅĞ¹ÍÑ…Ñ”¹Á½¥¹ÑM¡…‘½İ5…À¹±•¹Ñ €ø€À€˜˜E”¹Í•ÑY…±Õ”¡°€‰Á½¥¹ÑM¡…‘½İ5…Àˆ°ÅĞ¹ÍÑ…Ñ”¹Á½¥¹ÑM¡…‘½İ5…À°\¤¤°¹¥ÍM­¥¹¹•‘5•Í ¤ì(€€€€€€€E”¹Í•Ñ=ÁÑ¥½¹…°¡°°€‰‰¥¹‘5…ÑÉ¥àˆ¤°E”¹Í•Ñ=ÁÑ¥½¹…°¡°°€‰‰¥¹‘5…ÑÉ¥á%¹Ù•ÉÍ”ˆ¤ì(€€€€€€€½¹ÍĞi”€ô¹Í­•±•Ñ½¸ì(€€€€€€€i”€˜˜€¡i”¹‰½¹•Q•áÑÕÉ”€ôôô¹Õ±°€˜˜i”¹½µÁÕÑ•	½¹•Q•áÑÕÉ” ¤°E”¹Í•ÑY…±Õ”¡°€‰‰½¹•Q•áÑÕÉ”ˆ°i”¹‰½¹•Q•áÑÕÉ”°\¤¤ì(€€€€€ô(€€€€€¹¥Í	…Ñ¡•‘5•Í €˜˜€¡E”¹Í•Ñ=ÁÑ¥½¹…°¡°°€‰‰…Ñ¡¥¹Q•áÑÕÉ”ˆ¤°E”¹Í•ÑY…±Õ”¡°€‰‰…Ñ¡¥¹Q•áÑÕÉ”ˆ°¹}µ…ÑÉ¥•ÍQ•áÑÕÉ”°\¤°E”¹Í•Ñ=ÁÑ¥½¹…°¡°°€‰‰…Ñ¡¥¹%‘Q•áÑÕÉ”ˆ¤°E”¹Í•ÑY…±Õ”¡°€‰‰…Ñ¡¥¹%‘Q•áÑÕÉ”ˆ°¹}¥¹‘¥É•ÑQ•áÑÕÉ”°\¤°E”¹Í•Ñ=ÁÑ¥½¹…°¡°°€‰‰…Ñ¡¥¹½±½ÉQ•áÑÕÉ”ˆ¤°¹}½±½ÉÍQ•áÑÕÉ”€„ôô¹Õ±°€˜˜E”¹Í•ÑY…±Õ”¡°€‰‰…Ñ¡¥¹½±½ÉQ•áÑÕÉ”ˆ°¹}½±½ÉÍQ•áÑÕÉ”°\¤¤ì(€€€€€½¹ÍĞ¤€ôX¹µ½ÉÁ¡ÑÑÉ¥‰ÕÑ•Ìì(€€€€€¥˜€ ¡¤¹Á½Í¥Ñ¥½¸€„ôôÙ½¥€Àñğ¤¹¹½Éµ…°€„ôôÙ½¥€Àñğ¤¹½±½È€„ôôÙ½¥€À¤€˜˜Å”¹ÕÁ‘…Ñ”¡°X°Ğ¤°€¡å¤ñğ5”¹É••¥Ù•M¡…‘½Ü€„ôô¹É••¥Ù•M¡…‘½Ü¤€˜˜€¡5”¹É••¥Ù•M¡…‘½Ü€ô¹É••¥Ù•M¡…‘½Ü°E”¹Í•ÑY…±Õ”¡°€‰É••¥Ù•M¡…‘½Üˆ°¹É••¥Ù•M¡…‘½Ü¤¤°€¡è¹¥Í5•Í¡MÑ…¹‘…É‘5…Ñ•É¥…°ñğè¹¥Í5•Í¡1…µ‰•ÉÑ5…Ñ•É¥…°ñğè¹¥Í5•Í¡A¡½¹5…Ñ•É¥…°¤€˜˜è¹•¹Ù5…À€ôôô¹Õ±°€˜˜T¹•¹Ù¥É½¹µ•¹Ğ€„ôô¹Õ±°€˜˜€¡Ğ¹•¹Ù5…Á%¹Ñ•¹Í¥Ñä¹Ù…±Õ”€ôT¹•¹Ù¥É½¹µ•¹Ñ%¹Ñ•¹Í¥Ñä¤°Ğ¹‘™1UP€„ôôÙ½¥€À€˜˜€¡Ğ¹‘™1UP¹Ù…±Õ”€ô˜ ¤¤°å¤¤ì(€€€€€€€¥˜€¡E”¹Í•ÑY…±Õ”¡°€‰Ñ½¹•5…ÁÁ¥¹áÁ½ÍÕÉ”ˆ°ä¹Ñ½¹•5…ÁÁ¥¹áÁ½ÍÕÉ”¤°5”¹¹••‘Í1¥¡ÑÌ€˜˜9°¡Ğ°-¤¤°Í”€˜˜è¹™½œ€ôôô€„À€˜˜Á”¹É•™É•Í¡½U¹¥™½ÉµÌ¡Ğ°Í”¤°Á”¹É•™É•Í¡5…Ñ•É¥…±U¹¥™½ÉµÌ¡Ğ°è°‘”°D°¹ÍÑ…Ñ”¹ÑÉ…¹Íµ¥ÍÍ¥½¹I•¹‘•ÉQ…É•Ñmà¹¥‘t¤°5”¹¹••‘Í1¥¡ÑÌ€˜˜5”¹±¥¡ÑAÉ½‰•É¥¤ì(€€€€€€€€€½¹ÍĞi”€ô5”¹±¥¡ÑAÉ½‰•É¥ì(€€€€€€€€€Ğ¹ÁÉ½‰•ÍM ¹Ù…±Õ”€ôi”¹Ñ•áÑÕÉ”°Ğ¹ÁÉ½‰•Í5¥¸¹Ù…±Õ”¹½Áä¡i”¹‰½Õ¹‘¥¹	½à¹µ¥¸¤°Ğ¹ÁÉ½‰•Í5…à¹Ù…±Õ”¹½Áä¡i”¹‰½Õ¹‘¥¹	½à¹µ…à¤°Ğ¹ÁÉ½‰•ÍI•Í½±ÕÑ¥½¸¹Ù…±Õ”¹½Áä¡i”¹É•Í½±ÕÑ¥½¸¤ì(€€€€€€€ô(€€€€€€€UÈ¹ÕÁ±½…¡°½„¡5”¤°Ğ°\¤ì(€€€€€ô(€€€€€¥˜€¡è¹¥ÍM¡…‘•É5…Ñ•É¥…°€˜˜è¹Õ¹¥™½ÉµÍ9••‘UÁ‘…Ñ”€ôôô€„À€˜˜€¡UÈ¹ÕÁ±½…¡°½„¡5”¤°Ğ°\¤°è¹Õ¹¥™½ÉµÍ9••‘UÁ‘…Ñ”€ô€„Ä¤°è¹¥ÍMÁÉ¥Ñ•5…Ñ•É¥…°€˜˜E”¹Í•ÑY…±Õ”¡°€‰•¹Ñ•Èˆ°¹•¹Ñ•È¤°E”¹Í•ÑY…±Õ”¡°€‰µ½‘•±Y¥•İ5…ÑÉ¥àˆ°¹µ½‘•±Y¥•İ5…ÑÉ¥à¤°E”¹Í•ÑY…±Õ”¡°€‰¹½Éµ…±5…ÑÉ¥àˆ°¹¹½Éµ…±5…ÑÉ¥à¤°E”¹Í•ÑY…±Õ”¡°€‰µ½‘•±5…ÑÉ¥àˆ°¹µ…ÑÉ¥á]½É±¤°è¹Õ¹¥™½ÉµÍÉ½ÕÁÌ€„ôôÙ½¥€À¤ì(€€€€€€€½¹ÍĞi”€ôè¹Õ¹¥™½ÉµÍÉ½ÕÁÌì(€€€€€€€™½È€¡±•Ğ1¸€ô€À°©¤€ôi”¹±•¹Ñ ì1¸€ğ©¤ì1¸¬¬¤ì(€€€€€€€€€½¹ÍĞ„€ôi•m1¹tì(€€€€€€€€€}”¹ÕÁ‘…Ñ”¡„°Ğ¤°}”¹‰¥¹¡„°Ğ¤ì(€€€€€€€ô(€€€€€ô(€€€€€É•ÑÕÉ¸Ğì(€€€ô(€€€™Õ¹Ñ¥½¸9°¡à°T¤ì(€€€€€à¹…µ‰¥•¹Ñ1¥¡Ñ½±½È¹¹••‘ÍUÁ‘…Ñ”€ôT°à¹±¥¡ÑAÉ½‰”¹¹••‘ÍUÁ‘…Ñ”€ôT°à¹‘¥É•Ñ¥½¹…±1¥¡ÑÌ¹¹••‘ÍUÁ‘…Ñ”€ôT°à¹‘¥É•Ñ¥½¹…±1¥¡ÑM¡…‘½İÌ¹¹••‘ÍUÁ‘…Ñ”€ôT°à¹Á½¥¹Ñ1¥¡ÑÌ¹¹••‘ÍUÁ‘…Ñ”€ôT°à¹Á½¥¹Ñ1¥¡ÑM¡…‘½İÌ¹¹••‘ÍUÁ‘…Ñ”€ôT°à¹ÍÁ½Ñ1¥¡ÑÌ¹¹••‘ÍUÁ‘…Ñ”€ôT°à¹ÍÁ½Ñ1¥¡ÑM¡…‘½İÌ¹¹••‘ÍUÁ‘…Ñ”€ôT°à¹É•ÑÉ•…1¥¡ÑÌ¹¹••‘ÍUÁ‘…Ñ”€ôT°à¹¡•µ¥ÍÁ¡•É•1¥¡ÑÌ¹¹••‘ÍUÁ‘…Ñ”€ôTì(€€€ô(€€€™Õ¹Ñ¥½¸U°¡à¤ì(€€€€€É•ÑÕÉ¸à¹¥Í5•Í¡1…µ‰•ÉÑ5…Ñ•É¥…°ñğà¹¥Í5•Í¡Q½½¹5…Ñ•É¥…°ñğà¹¥Í5•Í¡A¡½¹5…Ñ•É¥…°ñğà¹¥Í5•Í¡MÑ…¹‘…É‘5…Ñ•É¥…°ñğà¹¥ÍM¡…‘½İ5…Ñ•É¥…°ñğà¹¥ÍM¡…‘•É5…Ñ•É¥…°€˜˜à¹±¥¡ÑÌ€ôôô€„Àì(€€€ô(€€€Ñ¡¥Ì¹•ÑÑ¥Ù•Õ‰•…”€ô™Õ¹Ñ¥½¸ ¤ì(€€€€€É•ÑÕÉ¸ì(€€€ô°Ñ¡¥Ì¹•ÑÑ¥Ù•5¥Áµ…Á1•Ù•°€ô™Õ¹Ñ¥½¸ ¤ì(€€€€€É•ÑÕÉ¸,ì(€€€ô°Ñ¡¥Ì¹•ÑI•¹‘•ÉQ…É•Ğ€ô™Õ¹Ñ¥½¸ ¤ì(€€€€€É•ÑÕÉ¸<ì(€€€ô°Ñ¡¥Ì¹Í•ÑI•¹‘•ÉQ…É•ÑQ•áÑÕÉ•Ì€ô™Õ¹Ñ¥½¸¡à°T°X¤ì(€€€€€½¹ÍĞè€ô@¹•Ğ¡à¤ì(€€€€€è¹}}…ÕÑ½±±½…Ñ••ÁÑ¡	Õ™™•È€ôà¹É•Í½±Ù••ÁÑ¡	Õ™™•È€ôôô€„Ä°è¹}}…ÕÑ½±±½…Ñ••ÁÑ¡	Õ™™•È€ôôô€„Ä€˜˜€¡è¹}}ÕÍ•I•¹‘•ÉQ½Q•áÑÕÉ”€ô€„Ä¤°@¹•Ğ¡à¹Ñ•áÑÕÉ”¤¹}}İ•‰±Q•áÑÕÉ”€ôT°@¹•Ğ¡à¹‘•ÁÑ¡Q•áÑÕÉ”¤¹}}İ•‰±Q•áÑÕÉ”€ôè¹}}…ÕÑ½±±½…Ñ••ÁÑ¡	Õ™™•È€üÙ½¥€À€èX°è¹}}¡…ÍáÑ•É¹…±Q•áÑÕÉ•Ì€ô€„Àì(€€€ô°Ñ¡¥Ì¹Í•ÑI•¹‘•ÉQ…É•ÑÉ…µ•‰Õ™™•È€ô™Õ¹Ñ¥½¸¡à°T¤ì(€€€€€½¹ÍĞX€ô@¹•Ğ¡à¤ì(€€€€€X¹}}İ•‰±É…µ•‰Õ™™•È€ôT°X¹}}ÕÍ••™…Õ±ÑÉ…µ•‰Õ™™•È€ôT€ôôôÙ½¥€Àì(€€€ô°Ñ¡¥Ì¹Í•ÑI•¹‘•ÉQ…É•Ğ€ô™Õ¹Ñ¥½¸¡à°T€ô€À°X€ô€À¤ì(€€€€€<€ôà°€ôT°,€ôXì(€€€€€±•Ğè€ô¹Õ±°°€ô€„Ä°Í”€ô€„Äì(€€€€€¥˜€¡à¤ì(€€€€€€€½¹ÍĞ¡”€ô@¹•Ğ¡à¤ì(€€€€€€€¥˜€¡¡”¹}}ÕÍ••™…Õ±ÑÉ…µ•‰Õ™™•È€„ôôÙ½¥€À¤ì(€€€€€€€€€L¹‰¥¹‘É…µ•‰Õ™™•È¡¹I5	UH°¡”¹}}İ•‰±É…µ•‰Õ™™•È¤°¥”¹½Áä¡à¹Ù¥•İÁ½ÉĞ¤°Õ”¹½Áä¡à¹Í¥ÍÍ½È¤°”€ôà¹Í¥ÍÍ½ÉQ•ÍĞ°L¹Ù¥•İÁ½ÉĞ¡¥”¤°L¹Í¥ÍÍ½È¡Õ”¤°L¹Í•ÑM¥ÍÍ½ÉQ•ÍĞ¡”¤°Ñ”€ô€´Äì(€€€€€€€€€É•ÑÕÉ¸ì(€€€€€€€ô•±Í”¥˜€¡¡”¹}}İ•‰±É…µ•‰Õ™™•È€ôôôÙ½¥€À¤\¹Í•ÑÕÁI•¹‘•ÉQ…É•Ğ¡à¤ì(€€€€€€€•±Í”¥˜€¡¡”¹}}¡…ÍáÑ•É¹…±Q•áÑÕÉ•Ì¤\¹É•‰¥¹‘Q•áÑÕÉ•Ì¡à°@¹•Ğ¡à¹Ñ•áÑÕÉ”¤¹}}İ•‰±Q•áÑÕÉ”°@¹•Ğ¡à¹‘•ÁÑ¡Q•áÑÕÉ”¤¹}}İ•‰±Q•áÑÕÉ”¤ì(€€€€€€€•±Í”¥˜€¡à¹‘•ÁÑ¡	Õ™™•È¤ì(€€€€€€€€€½¹ÍĞA”€ôà¹‘•ÁÑ¡Q•áÑÕÉ”ì(€€€€€€€€€¥˜€¡¡”¹}}‰½Õ¹‘•ÁÑ¡Q•áÑÕÉ”€„ôôA”¤ì(€€€€€€€€€€€¥˜€¡A”€„ôô¹Õ±°€˜˜@¹¡…Ì¡A”¤€˜˜€¡à¹İ¥‘Ñ €„ôôA”¹¥µ…”¹İ¥‘Ñ ñğà¹¡•¥¡Ğ€„ôôA”¹¥µ…”¹¡•¥¡Ğ¤¤Ñ¡É½Ü¹•ÜÉÉ½È ‰Q!I¹]•‰1I•¹‘•É•ÈèÑÑ…¡••ÁÑ¡Q•áÑÕÉ”¥Ì¥¹¥Ñ¥…±¥é•Ñ¼Ñ¡”¥¹½ÉÉ•ĞÍ¥é”¸ˆ¤ì(€€€€€€€€€€€\¹Í•ÑÕÁ•ÁÑ¡I•¹‘•É‰Õ™™•È¡à¤ì(€€€€€€€€€ô(€€€€€€€ô(€€€€€€€½¹ÍĞµ”€ôà¹Ñ•áÑÕÉ”ì(€€€€€€€€¡µ”¹¥Í…Ñ„ÍQ•áÑÕÉ”ñğµ”¹¥Í…Ñ…ÉÉ…åQ•áÑÕÉ”ñğµ”¹¥Í½µÁÉ•ÍÍ•‘ÉÉ…åQ•áÑÕÉ”¤€˜˜€¡Í”€ô€„À¤ì(€€€€€€€½¹ÍĞ”€ô@¹•Ğ¡à¤¹}}İ•‰±É…µ•‰Õ™™•Èì(€€€€€€€à¹¥Í]•‰1Õ‰•I•¹‘•ÉQ…É•Ğ€ü€¡ÉÉ…ä¹¥ÍÉÉ…ä¡•mUt¤€üè€ô•mUumYt€èè€ô•mUt°€ô€„À¤€èà¹Í…µÁ±•Ì€ø€À€˜˜\¹ÕÍ•5Õ±Ñ¥Í…µÁ±•‘IQP¡à¤€ôôô€„Ä€üè€ô@¹•Ğ¡à¤¹}}İ•‰±5Õ±Ñ¥Í…µÁ±•‘É…µ•‰Õ™™•È€èÉÉ…ä¹¥ÍÉÉ…ä¡”¤€üè€ô•mYt€èè€ô”°¥”¹½Áä¡à¹Ù¥•İÁ½ÉĞ¤°Õ”¹½Áä¡à¹Í¥ÍÍ½È¤°”€ôà¹Í¥ÍÍ½ÉQ•ÍĞì(€€€€€ô•±Í”(€€€€€€€¥”¹½Áä¡”¤¹µÕ±Ñ¥Á±åM…±…È¡‘”¤¹™±½½È ¤°Õ”¹½Áä¡%”¤¹µÕ±Ñ¥Á±åM…±…È¡‘”¤¹™±½½È ¤°”€ô©”ì(€€€€€¥˜€¡X€„ôô€À€˜˜€¡è€ô¬¤°L¹‰¥¹‘É…µ•‰Õ™™•È¡¹I5	UH°è¤€˜˜L¹‘É…İ	Õ™™•ÉÌ¡à°è¤°L¹Ù¥•İÁ½ÉĞ¡¥”¤°L¹Í¥ÍÍ½È¡Õ”¤°L¹Í•ÑM¥ÍÍ½ÉQ•ÍĞ¡”¤°¤ì(€€€€€€€½¹ÍĞ¡”€ô@¹•Ğ¡à¹Ñ•áÑÕÉ”¤ì(€€€€€€€¹™É…µ•‰Õ™™•ÉQ•áÑÕÉ”É¡¹I5	UH°¹=1=I}QQ!59PÀ°¹QaQUI}U	}5A}A=M%Q%Y}`€¬T°¡”¹}}İ•‰±Q•áÑÕÉ”°X¤ì(€€€€€ô•±Í”¥˜€¡Í”¤ì(€€€€€€€½¹ÍĞ¡”€ôTì(€€€€€€€™½È€¡±•Ğµ”€ô€Àìµ”€ğà¹Ñ•áÑÕÉ•Ì¹±•¹Ñ ìµ”¬¬¤ì(€€€€€€€€€½¹ÍĞ”€ô@¹•Ğ¡à¹Ñ•áÑÕÉ•Ímµ•t¤ì(€€€€€€€€€¹™É…µ•‰Õ™™•ÉQ•áÑÕÉ•1…å•È¡¹I5	UH°¹=1=I}QQ!59PÀ€¬µ”°”¹}}İ•‰±Q•áÑÕÉ”°X°¡”¤ì(€€€€€€€ô(€€€€€ô•±Í”¥˜€¡à€„ôô¹Õ±°€˜˜X€„ôô€À¤ì(€€€€€€€½¹ÍĞ¡”€ô@¹•Ğ¡à¹Ñ•áÑÕÉ”¤ì(€€€€€€€¹™É…µ•‰Õ™™•ÉQ•áÑÕÉ”É¡¹I5	UH°¹=1=I}QQ!59PÀ°¹QaQUI|É°¡”¹}}İ•‰±Q•áÑÕÉ”°X¤ì(€€€€€ô(€€€€€Ñ”€ô€´Äì(€€€ô°Ñ¡¥Ì¹É•…‘I•¹‘•ÉQ…É•ÑA¥á•±Ì€ô™Õ¹Ñ¥½¸¡à°T°X°è°°Í”°¡”°µ”€ô€À¤ì(€€€€€¥˜€ „¡à€˜˜à¹¥Í]•‰1I•¹‘•ÉQ…É•Ğ¤¤ì(€€€€€€€1” ‰]•‰1I•¹‘•É•È¹É•…‘I•¹‘•ÉQ…É•ÑA¥á•±ÌèÉ•¹‘•ÉQ…É•Ğ¥Ì¹½ĞQ!I¹]•‰1I•¹‘•ÉQ…É•Ğ¸ˆ¤ì(€€€€€€€É•ÑÕÉ¸ì(€€€€€ô(€€€€€±•Ğ”€ô@¹•Ğ¡à¤¹}}İ•‰±É…µ•‰Õ™™•Èì(€€€€€¥˜€¡à¹¥Í]•‰1Õ‰•I•¹‘•ÉQ…É•Ğ€˜˜¡”€„ôôÙ½¥€À€˜˜€¡”€ô•m¡•t¤°”¤ì(€€€€€€€L¹‰¥¹‘É…µ•‰Õ™™•È¡¹I5	UH°”¤ì(€€€€€€€ÑÉäì(€€€€€€€€€½¹ÍĞA”€ôà¹Ñ•áÑÕÉ•Ímµ•t°­”€ôA”¹™½Éµ…Ğ°Y”€ôA”¹ÑåÁ”ì(€€€€€€€€€¥˜€¡à¹Ñ•áÑÕÉ•Ì¹±•¹Ñ €ø€Ä€˜˜¹É•…‘	Õ™™•È¡¹=1=I}QQ!59PÀ€¬µ”¤°€…ÍĞ¹Ñ•áÑÕÉ•½Éµ…ÑI•…‘…‰±”¡­”¤¤ì(€€€€€€€€€€€1” ‰]•‰1I•¹‘•É•È¹É•…‘I•¹‘•ÉQ…É•ÑA¥á•±ÌèÉ•¹‘•ÉQ…É•Ğ¥Ì¹½Ğ¥¸I	½È¥µÁ±•µ•¹Ñ…Ñ¥½¸‘•™¥¹•™½Éµ…Ğ¸ˆ¤ì(€€€€€€€€€€€É•ÑÕÉ¸ì(€€€€€€€€€ô(€€€€€€€€€¥˜€ …ÍĞ¹Ñ•áÑÕÉ•QåÁ•I•…‘…‰±”¡Y”¤¤ì(€€€€€€€€€€€1” ‰]•‰1I•¹‘•É•È¹É•…‘I•¹‘•ÉQ…É•ÑA¥á•±ÌèÉ•¹‘•ÉQ…É•Ğ¥Ì¹½Ğ¥¸U¹Í¥¹•‘	åÑ•QåÁ”½È¥µÁ±•µ•¹Ñ…Ñ¥½¸‘•™¥¹•ÑåÁ”¸ˆ¤ì(€€€€€€€€€€€É•ÑÕÉ¸ì(€€€€€€€€€ô(€€€€€€€€€T€øô€À€˜˜T€ğôà¹İ¥‘Ñ €´è€˜˜X€øô€À€˜˜X€ğôà¹¡•¥¡Ğ€´€˜˜¹É•…‘A¥á•±Ì¡T°X°è°°(¹½¹Ù•ÉĞ¡­”¤°(¹½¹Ù•ÉĞ¡Y”¤°Í”¤ì(€€€€€€€ô™¥¹…±±äì(€€€€€€€€€½¹ÍĞA”€ô<€„ôô¹Õ±°€ü@¹•Ğ¡<¤¹}}İ•‰±É…µ•‰Õ™™•È€è¹Õ±°ì(€€€€€€€€€L¹‰¥¹‘É…µ•‰Õ™™•È¡¹I5	UH°A”¤ì(€€€€€€€ô(€€€€€ô(€€€ô°Ñ¡¥Ì¹É•…‘I•¹‘•ÉQ…É•ÑA¥á•±ÍÍå¹Œ€ô…Íå¹Œ™Õ¹Ñ¥½¸¡à°T°X°è°°Í”°¡”°µ”€ô€À¤ì(€€€€€¥˜€ „¡à€˜˜à¹¥Í]•‰1I•¹‘•ÉQ…É•Ğ¤¤Ñ¡É½Ü¹•ÜÉÉ½È ‰Q!I¹]•‰1I•¹‘•É•È¹É•…‘I•¹‘•ÉQ…É•ÑA¥á•±ÌèÉ•¹‘•ÉQ…É•Ğ¥Ì¹½ĞQ!I¹]•‰1I•¹‘•ÉQ…É•Ğ¸ˆ¤ì(€€€€€±•Ğ”€ô@¹•Ğ¡à¤¹}}İ•‰±É…µ•‰Õ™™•Èì(€€€€€¥˜€¡à¹¥Í]•‰1Õ‰•I•¹‘•ÉQ…É•Ğ€˜˜¡”€„ôôÙ½¥€À€˜˜€¡”€ô•m¡•t¤°”¤¥˜€¡T€øô€À€˜˜T€ğôà¹İ¥‘Ñ €´è€˜˜X€øô€À€˜˜X€ğôà¹¡•¥¡Ğ€´¤ì(€€€€€€€L¹‰¥¹‘É…µ•‰Õ™™•È¡¹I5	UH°”¤ì(€€€€€€€½¹ÍĞA”€ôà¹Ñ•áÑÕÉ•Ímµ•t°­”€ôA”¹™½Éµ…Ğ°Y”€ôA”¹ÑåÁ”ì(€€€€€€€¥˜€¡à¹Ñ•áÑÕÉ•Ì¹±•¹Ñ €ø€Ä€˜˜¹É•…‘	Õ™™•È¡¹=1=I}QQ!59PÀ€¬µ”¤°€…ÍĞ¹Ñ•áÑÕÉ•½Éµ…ÑI•…‘…‰±”¡­”¤¤Ñ¡É½Ü¹•ÜÉÉ½È ‰Q!I¹]•‰1I•¹‘•É•È¹É•…‘I•¹‘•ÉQ…É•ÑA¥á•±ÍÍå¹ŒèÉ•¹‘•ÉQ…É•Ğ¥Ì¹½Ğ¥¸I	½È¥µÁ±•µ•¹Ñ…Ñ¥½¸‘•™¥¹•™½Éµ…Ğ¸ˆ¤ì(€€€€€€€¥˜€ …ÍĞ¹Ñ•áÑÕÉ•QåÁ•I•…‘…‰±”¡Y”¤¤Ñ¡É½Ü¹•ÜÉÉ½È ‰Q!I¹]•‰1I•¹‘•É•È¹É•…‘I•¹‘•ÉQ…É•ÑA¥á•±ÍÍå¹ŒèÉ•¹‘•ÉQ…É•Ğ¥Ì¹½Ğ¥¸U¹Í¥¹•‘	åÑ•QåÁ”½È¥µÁ±•µ•¹Ñ…Ñ¥½¸‘•™¥¹•ÑåÁ”¸ˆ¤ì(€€€€€€€½¹ÍĞ”€ô¹É•…Ñ•	Õ™™•È ¤ì(€€€€€€€¹‰¥¹‘	Õ™™•È¡¹A%a1}A-}	UH°”¤°¹‰Õ™™•É…Ñ„¡¹A%a1}A-}	UH°Í”¹‰åÑ•1•¹Ñ °¹MQI5}I¤°¹É•…‘A¥á•±Ì¡T°X°è°°(¹½¹Ù•ÉĞ¡­”¤°(¹½¹Ù•ÉĞ¡Y”¤°€À¤ì(€€€€€€€½¹ÍĞÑĞ€ô<€„ôô¹Õ±°€ü@¹•Ğ¡<¤¹}}İ•‰±É…µ•‰Õ™™•È€è¹Õ±°ì(€€€€€€€L¹‰¥¹‘É…µ•‰Õ™™•È¡¹I5	UH°ÑĞ¤ì(€€€€€€€½¹ÍĞ½Ğ€ô¹™•¹•Må¹Œ¡¹Me9}AU}=559M}=5A1Q°€À¤ì(€€€€€€€É•ÑÕÉ¸¹™±ÕÍ  ¤°…İ…¥Ğ1Œ¡°½Ğ°€Ğ¤°¹‰¥¹‘	Õ™™•È¡¹A%a1}A-}	UH°”¤°¹•Ñ	Õ™™•ÉMÕ‰…Ñ„¡¹A%a1}A-}	UH°€À°Í”¤°¹‘•±•Ñ•	Õ™™•È¡”¤°¹‘•±•Ñ•Må¹Œ¡½Ğ¤°Í”ì(€€€€€ô•±Í”Ñ¡É½Ü¹•ÜÉÉ½È ‰Q!I¹]•‰1I•¹‘•É•È¹É•…‘I•¹‘•ÉQ…É•ÑA¥á•±ÍÍå¹ŒèÉ•ÅÕ•ÍÑ•É•…‰½Õ¹‘Ì…É”½ÕĞ½˜É…¹”¸ˆ¤ì(€€€ô°Ñ¡¥Ì¹½ÁåÉ…µ•‰Õ™™•ÉQ½Q•áÑÕÉ”€ô™Õ¹Ñ¥½¸¡à°T€ô¹Õ±°°X€ô€À¤ì(€€€€€½¹ÍĞè€ô5…Ñ ¹Á½Ü È°€µX¤°€ô5…Ñ ¹™±½½È¡à¹¥µ…”¹İ¥‘Ñ €¨è¤°Í”€ô5…Ñ ¹™±½½È¡à¹¥µ…”¹¡•¥¡Ğ€¨è¤°¡”€ôT€„ôô¹Õ±°€üT¹à€è€À°µ”€ôT€„ôô¹Õ±°€üT¹ä€è€Àì(€€€€€\¹Í•ÑQ•áÑÕÉ”É¡à°€À¤°¹½ÁåQ•áMÕ‰%µ…”É¡¹QaQUI|É°X°€À°€À°¡”°µ”°°Í”¤°L¹Õ¹‰¥¹‘Q•áÑÕÉ” ¤ì(€€€ô°Ñ¡¥Ì¹½ÁåQ•áÑÕÉ•Q½Q•áÑÕÉ”€ô™Õ¹Ñ¥½¸¡à°T°X€ô¹Õ±°°è€ô¹Õ±°°€ô€À°Í”€ô€À¤ì(€€€€€±•Ğ¡”°µ”°”°A”°­”°Y”°”°ÑĞ°½Ğì(€€€€€½¹ÍĞ±Ğ€ôà¹¥Í½µÁÉ•ÍÍ•‘Q•áÑÕÉ”€üà¹µ¥Áµ…ÁÍmÍ•t€èà¹¥µ…”ì(€€€€€¥˜€¡X€„ôô¹Õ±°¤(€€€€€€€¡”€ôX¹µ…à¹à€´X¹µ¥¸¹à°µ”€ôX¹µ…à¹ä€´X¹µ¥¸¹ä°”€ôX¹¥Í	½àÌ€üX¹µ…à¹è€´X¹µ¥¸¹è€è€Ä°A”€ôX¹µ¥¸¹à°­”€ôX¹µ¥¸¹ä°Y”€ôX¹¥Í	½àÌ€üX¹µ¥¸¹è€è€Àì(€€€€€•±Í”ì(€€€€€€€½¹ÍĞĞ€ô5…Ñ ¹Á½Ü È°€µ¤ì(€€€€€€€¡”€ô5…Ñ ¹™±½½È¡±Ğ¹İ¥‘Ñ €¨Ğ¤°µ”€ô5…Ñ ¹™±½½È¡±Ğ¹¡•¥¡Ğ€¨Ğ¤°à¹¥Í…Ñ…ÉÉ…åQ•áÑÕÉ”€ü”€ô±Ğ¹‘•ÁÑ €èà¹¥Í…Ñ„ÍQ•áÑÕÉ”€ü”€ô5…Ñ ¹™±½½È¡±Ğ¹‘•ÁÑ €¨Ğ¤€è”€ô€Ä°A”€ô€À°­”€ô€À°Y”€ô€Àì(€€€€€ô(€€€€€è€„ôô¹Õ±°€ü€¡”€ôè¹à°ÑĞ€ôè¹ä°½Ğ€ôè¹è¤€è€¡”€ô€À°ÑĞ€ô€À°½Ğ€ô€À¤ì(€€€€€½¹ÍĞa”€ô(¹½¹Ù•ÉĞ¡T¹™½Éµ…Ğ¤°MĞ€ô(¹½¹Ù•ÉĞ¡T¹ÑåÁ”¤ì(€€€€€±•Ğ5”ì(€€€€€T¹¥Í…Ñ„ÍQ•áÑÕÉ”€ü€¡\¹Í•ÑQ•áÑÕÉ”Í¡T°€À¤°5”€ô¹QaQUI|Í¤€èT¹¥Í…Ñ…ÉÉ…åQ•áÑÕÉ”ñğT¹¥Í½µÁÉ•ÍÍ•‘ÉÉ…åQ•áÑÕÉ”€ü€¡\¹Í•ÑQ•áÑÕÉ”ÉÉÉ…ä¡T°€À¤°5”€ô¹QaQUI|É}IId¤€è€¡\¹Í•ÑQ•áÑÕÉ”É¡T°€À¤°5”€ô¹QaQUI|É¤°L¹…Ñ¥Ù•Q•áÑÕÉ”¡¹QaQUIÀ¤°L¹Á¥á•±MÑ½É•¤¡¹U9A-}1%A}e}]	0°T¹™±¥Ád¤°L¹Á¥á•±MÑ½É•¤¡¹U9A-}AI5U1Q%A1e}1A!}]	0°T¹ÁÉ•µÕ±Ñ¥Á±å±Á¡„¤°L¹Á¥á•±MÑ½É•¤¡¹U9A-}1%959P°T¹Õ¹Á…­±¥¹µ•¹Ğ¤ì(€€€€€½¹ÍĞÅĞ€ôL¹•ÑA…É…µ•Ñ•È¡¹U9A-}I=]}19Q ¤°-”€ôL¹•ÑA…É…µ•Ñ•È¡¹U9A-}%5}!%!P¤°Ğ€ôL¹•ÑA…É…µ•Ñ•È¡¹U9A-}M-%A}A%a1L¤°¥¤€ôL¹•ÑA…É…µ•Ñ•È¡¹U9A-}M-%A}I=]L¤°å¤€ôL¹•ÑA…É…µ•Ñ•È¡¹U9A-}M-%A}%5L¤ì(€€€€€L¹Á¥á•±MÑ½É•¤¡¹U9A-}I=]}19Q °±Ğ¹İ¥‘Ñ ¤°L¹Á¥á•±MÑ½É•¤¡¹U9A-}%5}!%!P°±Ğ¹¡•¥¡Ğ¤°L¹Á¥á•±MÑ½É•¤¡¹U9A-}M-%A}A%a1L°A”¤°L¹Á¥á•±MÑ½É•¤¡¹U9A-}M-%A}I=]L°­”¤°L¹Á¥á•±MÑ½É•¤¡¹U9A-}M-%A}%5L°Y”¤ì(€€€€€½¹ÍĞ-¤€ôà¹¥Í…Ñ…ÉÉ…åQ•áÑÕÉ”ñğà¹¥Í…Ñ„ÍQ•áÑÕÉ”°E”€ôT¹¥Í…Ñ…ÉÉ…åQ•áÑÕÉ”ñğT¹¥Í…Ñ„ÍQ•áÑÕÉ”ì(€€€€€¥˜€¡à¹¥Í•ÁÑ¡Q•áÑÕÉ”¤ì(€€€€€€€½¹ÍĞĞ€ô@¹•Ğ¡à¤°¤€ô@¹•Ğ¡T¤°i”€ô@¹•Ğ¡Ğ¹}}É•¹‘•ÉQ…É•Ğ¤°1¸€ô@¹•Ğ¡¤¹}}É•¹‘•ÉQ…É•Ğ¤ì(€€€€€€€L¹‰¥¹‘É…µ•‰Õ™™•È¡¹I}I5	UH°i”¹}}İ•‰±É…µ•‰Õ™™•È¤°L¹‰¥¹‘É…µ•‰Õ™™•È¡¹I]}I5	UH°1¸¹}}İ•‰±É…µ•‰Õ™™•È¤ì(€€€€€€€™½È€¡±•Ğ©¤€ô€Àì©¤€ğ”ì©¤¬¬¤(€€€€€€€€€-¤€˜˜€¡¹™É…µ•‰Õ™™•ÉQ•áÑÕÉ•1…å•È¡¹I}I5	UH°¹=1=I}QQ!59PÀ°@¹•Ğ¡à¤¹}}İ•‰±Q•áÑÕÉ”°°Y”€¬©¤¤°¹™É…µ•‰Õ™™•ÉQ•áÑÕÉ•1…å•È¡¹I]}I5	UH°¹=1=I}QQ!59PÀ°@¹•Ğ¡T¤¹}}İ•‰±Q•áÑÕÉ”°Í”°½Ğ€¬©¤¤¤°¹‰±¥ÑÉ…µ•‰Õ™™•È¡A”°­”°¡”°µ”°”°ÑĞ°¡”°µ”°¹AQ!}	UI}	%P°¹9IMP¤ì(€€€€€€€L¹‰¥¹‘É…µ•‰Õ™™•È¡¹I}I5	UH°¹Õ±°¤°L¹‰¥¹‘É…µ•‰Õ™™•È¡¹I]}I5	UH°¹Õ±°¤ì(€€€€€ô•±Í”¥˜€¡€„ôô€Àñğà¹¥ÍI•¹‘•ÉQ…É•ÑQ•áÑÕÉ”ñğ@¹¡…Ì¡à¤¤ì(€€€€€€€½¹ÍĞĞ€ô@¹•Ğ¡à¤°¤€ô@¹•Ğ¡T¤ì(€€€€€€€L¹‰¥¹‘É…µ•‰Õ™™•È¡¹I}I5	UH°`¤°L¹‰¥¹‘É…µ•‰Õ™™•È¡¹I]}I5	UH°Ä¤ì(€€€€€€€™½È€¡±•Ği”€ô€Àìi”€ğ”ìi”¬¬¤(€€€€€€€€€-¤€ü¹™É…µ•‰Õ™™•ÉQ•áÑÕÉ•1…å•È¡¹I}I5	UH°¹=1=I}QQ!59PÀ°Ğ¹}}İ•‰±Q•áÑÕÉ”°°Y”€¬i”¤€è¹™É…µ•‰Õ™™•ÉQ•áÑÕÉ”É¡¹I}I5	UH°¹=1=I}QQ!59PÀ°¹QaQUI|É°Ğ¹}}İ•‰±Q•áÑÕÉ”°¤°E”€ü¹™É…µ•‰Õ™™•ÉQ•áÑÕÉ•1…å•È¡¹I]}I5	UH°¹=1=I}QQ!59PÀ°¤¹}}İ•‰±Q•áÑÕÉ”°Í”°½Ğ€¬i”¤€è¹™É…µ•‰Õ™™•ÉQ•áÑÕÉ”É¡¹I]}I5	UH°¹=1=I}QQ!59PÀ°¹QaQUI|É°¤¹}}İ•‰±Q•áÑÕÉ”°Í”¤°€„ôô€À€ü¹‰±¥ÑÉ…µ•‰Õ™™•È¡A”°­”°¡”°µ”°”°ÑĞ°¡”°µ”°¹=1=I}	UI}	%P°¹9IMP¤€èE”€ü¹½ÁåQ•áMÕ‰%µ…”Í¡5”°Í”°”°ÑĞ°½Ğ€¬i”°A”°­”°¡”°µ”¤€è¹½ÁåQ•áMÕ‰%µ…”É¡5”°Í”°”°ÑĞ°A”°­”°¡”°µ”¤ì(€€€€€€€L¹‰¥¹‘É…µ•‰Õ™™•È¡¹I}I5	UH°¹Õ±°¤°L¹‰¥¹‘É…µ•‰Õ™™•È¡¹I]}I5	UH°¹Õ±°¤ì(€€€€€ô•±Í”E”€üà¹¥Í…Ñ…Q•áÑÕÉ”ñğà¹¥Í…Ñ„ÍQ•áÑÕÉ”€ü¹Ñ•áMÕ‰%µ…”Í¡5”°Í”°”°ÑĞ°½Ğ°¡”°µ”°”°a”°MĞ°±Ğ¹‘…Ñ„¤€èT¹¥Í½µÁÉ•ÍÍ•‘ÉÉ…åQ•áÑÕÉ”€ü¹½µÁÉ•ÍÍ•‘Q•áMÕ‰%µ…”Í¡5”°Í”°”°ÑĞ°½Ğ°¡”°µ”°”°a”°±Ğ¹‘…Ñ„¤€è¹Ñ•áMÕ‰%µ…”Í¡5”°Í”°”°ÑĞ°½Ğ°¡”°µ”°”°a”°MĞ°±Ğ¤€èà¹¥Í…Ñ…Q•áÑÕÉ”€ü¹Ñ•áMÕ‰%µ…”É¡¹QaQUI|É°Í”°”°ÑĞ°¡”°µ”°a”°MĞ°±Ğ¹‘…Ñ„¤€èà¹¥Í½µÁÉ•ÍÍ•‘Q•áÑÕÉ”€ü¹½µÁÉ•ÍÍ•‘Q•áMÕ‰%µ…”É¡¹QaQUI|É°Í”°”°ÑĞ°±Ğ¹İ¥‘Ñ °±Ğ¹¡•¥¡Ğ°a”°±Ğ¹‘…Ñ„¤€è¹Ñ•áMÕ‰%µ…”É¡¹QaQUI|É°Í”°”°ÑĞ°¡”°µ”°a”°MĞ°±Ğ¤ì(€€€€€L¹Á¥á•±MÑ½É•¤¡¹U9A-}I=]}19Q °ÅĞ¤°L¹Á¥á•±MÑ½É•¤¡¹U9A-}%5}!%!P°-”¤°L¹Á¥á•±MÑ½É•¤¡¹U9A-}M-%A}A%a1L°Ğ¤°L¹Á¥á•±MÑ½É•¤¡¹U9A-}M-%A}I=]L°¥¤¤°L¹Á¥á•±MÑ½É•¤¡¹U9A-}M-%A}%5L°å¤¤°Í”€ôôô€À€˜˜T¹•¹•É…Ñ•5¥Áµ…ÁÌ€˜˜¹•¹•É…Ñ•5¥Áµ…À¡5”¤°L¹Õ¹‰¥¹‘Q•áÑÕÉ” ¤ì(€€€ô°Ñ¡¥Ì¹¥¹¥ÑI•¹‘•ÉQ…É•Ğ€ô™Õ¹Ñ¥½¸¡à¤ì(€€€€€@¹•Ğ¡à¤¹}}İ•‰±É…µ•‰Õ™™•È€ôôôÙ½¥€À€˜˜\¹Í•ÑÕÁI•¹‘•ÉQ…É•Ğ¡à¤ì(€€€ô°Ñ¡¥Ì¹¥¹¥ÑQ•áÑÕÉ”€ô™Õ¹Ñ¥½¸¡à¤ì(€€€€€à¹¥ÍÕ‰•Q•áÑÕÉ”€ü\¹Í•ÑQ•áÑÕÉ•Õ‰”¡à°€À¤€èà¹¥Í…Ñ„ÍQ•áÑÕÉ”€ü\¹Í•ÑQ•áÑÕÉ”Í¡à°€À¤€èà¹¥Í…Ñ…ÉÉ…åQ•áÑÕÉ”ñğà¹¥Í½µÁÉ•ÍÍ•‘ÉÉ…åQ•áÑÕÉ”€ü\¹Í•ÑQ•áÑÕÉ”ÉÉÉ…ä¡à°€À¤€è\¹Í•ÑQ•áÑÕÉ”É¡à°€À¤°L¹Õ¹‰¥¹‘Q•áÑÕÉ” ¤ì(€€€ô°Ñ¡¥Ì¹É•Í•ÑMÑ…Ñ”€ô™Õ¹Ñ¥½¸ ¤ì(€€€€€€ô€À°,€ô€À°<€ô¹Õ±°°L¹É•Í•Ğ ¤°™”¹É•Í•Ğ ¤ì(€€€ô°ÑåÁ•½˜}}Q!I}YQ==1M}|€ğ€‰Ôˆ€˜˜}}Q!I}YQ==1M}|¹‘¥ÍÁ…Ñ¡Ù•¹Ğ¡¹•ÜÕÍÑ½µÙ•¹Ğ ‰½‰Í•ÉÙ”ˆ°ì‘•Ñ…¥°èÑ¡¥Ìô¤¤ì(€ô(€•Ğ½½É‘¥¹…Ñ•MåÍÑ•´ ¤ì(€€€É•ÑÕÉ¸‰¸ì(€ô(€•Ğ½ÕÑÁÕÑ½±½ÉMÁ…” ¤ì(€€€É•ÑÕÉ¸Ñ¡¥Ì¹}½ÕÑÁÕÑ½±½ÉMÁ…”ì(€ô(€Í•Ğ½ÕÑÁÕÑ½±½ÉMÁ…”¡”¤ì(€€€Ñ¡¥Ì¹}½ÕÑÁÕÑ½±½ÉMÁ…”€ô”ì(€€€½¹ÍĞĞ€ôÑ¡¥Ì¹•Ñ½¹Ñ•áĞ ¤ì(€€€Ğ¹‘É…İ¥¹	Õ™™•É½±½ÉMÁ…”€ô!”¹}•ÑÉ…İ¥¹	Õ™™•É½±½ÉMÁ…”¡”¤°Ğ¹Õ¹Á…­½±½ÉMÁ…”€ô!”¹}•ÑU¹Á…­½±½ÉMÁ…” ¤ì(€ô)ôì)™Õ¹Ñ¥½¸M¼¡”°Ğ¤ì(€¥˜€¡Ğ€ôôô€À¤(€€€É•ÑÕÉ¸½¹Í½±”¹İ…É¸ ‰Q!I¹	Õ™™•É•½µ•ÑÉåUÑ¥±Ì¹Ñ½QÉ¥…¹±•ÍÉ…İ5½‘” ¤è•½µ•ÑÉä…±É•…‘ä‘•™¥¹•…ÌÑÉ¥…¹±•Ì¸ˆ¤°”ì(€¥˜€¡Ğ€ôôô€ÈñğĞ€ôôô€Ä¤ì(€€€±•Ğ¤€ô”¹•Ñ%¹‘•à ¤ì(€€€¥˜€¡¤€ôôô¹Õ±°¤ì(€€€€€½¹ÍĞ„€ômt°¼€ô”¹•ÑÑÑÉ¥‰ÕÑ” ‰Á½Í¥Ñ¥½¸ˆ¤ì(€€€€€¥˜€¡¼€„ôôÙ½¥€À¤ì(€€€€€€€™½È€¡±•Ğ°€ô€Àì°€ğ¼¹½Õ¹Ğì°¬¬¤„¹ÁÕÍ ¡°¤ì(€€€€€€€”¹Í•Ñ%¹‘•à¡„¤°¤€ô”¹•Ñ%¹‘•à ¤ì(€€€€€ô•±Í”(€€€€€€€É•ÑÕÉ¸½¹Í½±”¹•ÉÉ½È ‰Q!I¹	Õ™™•É•½µ•ÑÉåUÑ¥±Ì¹Ñ½QÉ¥…¹±•ÍÉ…İ5½‘” ¤èU¹‘•™¥¹•Á½Í¥Ñ¥½¸…ÑÑÉ¥‰ÕÑ”¸AÉ½•ÍÍ¥¹œ¹½ĞÁ½ÍÍ¥‰±”¸ˆ¤°”ì(€€€ô(€€€½¹ÍĞ¸€ô¤¹½Õ¹Ğ€´€È°È€ômtì(€€€¥˜€¡Ğ€ôôô€È¤™½È€¡±•Ğ„€ô€Äì„€ğô¸ì„¬¬¤(€€€€€È¹ÁÕÍ ¡¤¹•Ñ` À¤¤°È¹ÁÕÍ ¡¤¹•Ñ`¡„¤¤°È¹ÁÕÍ ¡¤¹•Ñ`¡„€¬€Ä¤¤ì(€€€•±Í”™½È€¡±•Ğ„€ô€Àì„€ğ¸ì„¬¬¤„€”€È€ôôô€À€ü€¡È¹ÁÕÍ ¡¤¹•Ñ`¡„¤¤°È¹ÁÕÍ ¡¤¹•Ñ`¡„€¬€Ä¤¤°È¹ÁÕÍ ¡¤¹•Ñ`¡„€¬€È¤¤¤€è€¡È¹ÁÕÍ ¡¤¹•Ñ`¡„€¬€È¤¤°È¹ÁÕÍ ¡¤¹•Ñ`¡„€¬€Ä¤¤°È¹ÁÕÍ ¡¤¹•Ñ`¡„¤¤¤ì(€€€È¹±•¹Ñ €¼€Ì€„ôô¸€˜˜½¹Í½±”¹•ÉÉ½È ‰Q!I¹	Õ™™•É•½µ•ÑÉåUÑ¥±Ì¹Ñ½QÉ¥…¹±•ÍÉ…İ5½‘” ¤èU¹…‰±”Ñ¼•¹•É…Ñ”½ÉÉ•Ğ…µ½Õ¹Ğ½˜ÑÉ¥…¹±•Ì¸ˆ¤ì(€€€½¹ÍĞÌ€ô”¹±½¹” ¤ì(€€€É•ÑÕÉ¸Ì¹Í•Ñ%¹‘•à¡È¤°Ì¹±•…ÉÉ½ÕÁÌ ¤°Ìì(€ô•±Í”(€€€É•ÑÕÉ¸½¹Í½±”¹•ÉÉ½È ‰Q!I¹	Õ™™•É•½µ•ÑÉåUÑ¥±Ì¹Ñ½QÉ¥…¹±•ÍÉ…İ5½‘” ¤èU¹­¹½İ¸‘É…Üµ½‘”èˆ°Ğ¤°”ì)ô)™Õ¹Ñ¥½¸9˜¡”¤ì(€½¹ÍĞĞ€ô€¼¨}}AUI}|€¨¼¹•Ü5…À ¤°¤€ô€¼¨}}AUI}|€¨¼¹•Ü5…À ¤°¸€ô”¹±½¹” ¤ì(€É•ÑÕÉ¸°¡”°¸°™Õ¹Ñ¥½¸¡È°Ì¤ì(€€€Ğ¹Í•Ğ¡Ì°È¤°¤¹Í•Ğ¡È°Ì¤ì(€ô¤°¸¹ÑÉ…Ù•ÉÍ”¡™Õ¹Ñ¥½¸¡È¤ì(€€€¥˜€ …È¹¥ÍM­¥¹¹•‘5•Í ¤É•ÑÕÉ¸ì(€€€½¹ÍĞÌ€ôÈ°„€ôĞ¹•Ğ¡È¤°¼€ô„¹Í­•±•Ñ½¸¹‰½¹•Ìì(€€€Ì¹Í­•±•Ñ½¸€ô„¹Í­•±•Ñ½¸¹±½¹” ¤°Ì¹‰¥¹‘5…ÑÉ¥à¹½Áä¡„¹‰¥¹‘5…ÑÉ¥à¤°Ì¹Í­•±•Ñ½¸¹‰½¹•Ì€ô¼¹µ…À¡™Õ¹Ñ¥½¸¡°¤ì(€€€€€É•ÑÕÉ¸¤¹•Ğ¡°¤ì(€€€ô¤°Ì¹‰¥¹¡Ì¹Í­•±•Ñ½¸°Ì¹‰¥¹‘5…ÑÉ¥à¤ì(€ô¤°¸ì)ô)™Õ¹Ñ¥½¸°¡”°Ğ°¤¤ì(€¤¡”°Ğ¤ì(€™½È€¡±•Ğ¸€ô€Àì¸€ğ”¹¡¥±‘É•¸¹±•¹Ñ ì¸¬¬¤°¡”¹¡¥±‘É•¹m¹t°Ğ¹¡¥±‘É•¹m¹t°¤¤ì)ô)Ù…ÈU˜€ô±…ÍÌ•áÑ•¹‘Ì¸ì(€½¹ÍÑÉÕÑ½È¡”¤ì(€€€ÍÕÁ•È¡”¤°Ñ¡¥Ì¹‘É…½1½…‘•È€ô¹Õ±°°Ñ¡¥Ì¹­ÑàÉ1½…‘•È€ô¹Õ±°°Ñ¡¥Ì¹µ•Í¡½ÁÑ•½‘•È€ô¹Õ±°°Ñ¡¥Ì¹Á±Õ¥¹…±±‰…­Ì€ômt°Ñ¡¥Ì¹É•¥ÍÑ•È¡™Õ¹Ñ¥½¸¡Ğ¤ì(€€€€€É•ÑÕÉ¸¹•Üé˜¡Ğ¤ì(€€€ô¤°Ñ¡¥Ì¹É•¥ÍÑ•È¡™Õ¹Ñ¥½¸¡Ğ¤ì(€€€€€É•ÑÕÉ¸¹•Ü˜¡Ğ¤ì(€€€ô¤°Ñ¡¥Ì¹É•¥ÍÑ•È¡™Õ¹Ñ¥½¸¡Ğ¤ì(€€€€€É•ÑÕÉ¸¹•Ü)˜¡Ğ¤ì(€€€ô¤°Ñ¡¥Ì¹É•¥ÍÑ•È¡™Õ¹Ñ¥½¸¡Ğ¤ì(€€€€€É•ÑÕÉ¸¹•Üi˜¡Ğ¤ì(€€€ô¤°Ñ¡¥Ì¹É•¥ÍÑ•È¡™Õ¹Ñ¥½¸¡Ğ¤ì(€€€€€É•ÑÕÉ¸¹•Ü€‘˜¡Ğ¤ì(€€€ô¤°Ñ¡¥Ì¹É•¥ÍÑ•È¡™Õ¹Ñ¥½¸¡Ğ¤ì(€€€€€É•ÑÕÉ¸¹•Ü!˜¡Ğ¤ì(€€€ô¤°Ñ¡¥Ì¹É•¥ÍÑ•È¡™Õ¹Ñ¥½¸¡Ğ¤ì(€€€€€É•ÑÕÉ¸¹•Ü]˜¡Ğ¤ì(€€€ô¤°Ñ¡¥Ì¹É•¥ÍÑ•È¡™Õ¹Ñ¥½¸¡Ğ¤ì(€€€€€É•ÑÕÉ¸¹•ÜÅ˜¡Ğ¤ì(€€€ô¤°Ñ¡¥Ì¹É•¥ÍÑ•È¡™Õ¹Ñ¥½¸¡Ğ¤ì(€€€€€É•ÑÕÉ¸¹•Üa˜¡Ğ¤ì(€€€ô¤°Ñ¡¥Ì¹É•¥ÍÑ•È¡™Õ¹Ñ¥½¸¡Ğ¤ì(€€€€€É•ÑÕÉ¸¹•Ü	˜¡Ğ¤ì(€€€ô¤°Ñ¡¥Ì¹É•¥ÍÑ•È¡™Õ¹Ñ¥½¸¡Ğ¤ì(€€€€€É•ÑÕÉ¸¹•Ü-˜¡Ğ¤ì(€€€ô¤°Ñ¡¥Ì¹É•¥ÍÑ•È¡™Õ¹Ñ¥½¸¡Ğ¤ì(€€€€€É•ÑÕÉ¸¹•ÜY˜¡Ğ¤ì(€€€ô¤°Ñ¡¥Ì¹É•¥ÍÑ•È¡™Õ¹Ñ¥½¸¡Ğ¤ì(€€€€€É•ÑÕÉ¸¹•Üe˜¡Ğ¤ì(€€€ô¤°Ñ¡¥Ì¹É•¥ÍÑ•È¡™Õ¹Ñ¥½¸¡Ğ¤ì(€€€€€É•ÑÕÉ¸¹•Ü©˜¡Ğ¤ì(€€€ô¤°Ñ¡¥Ì¹É•¥ÍÑ•È¡™Õ¹Ñ¥½¸¡Ğ¤ì(€€€€€É•ÑÕÉ¸¹•Ü=˜¡Ğ¤ì(€€€ô¤°Ñ¡¥Ì¹É•¥ÍÑ•È¡™Õ¹Ñ¥½¸¡Ğ¤ì(€€€€€É•ÑÕÉ¸¹•Üå¼¡Ğ°é”¹aQ}5M!=AQ}=5AIMM%=8¤ì(€€€ô¤°Ñ¡¥Ì¹É•¥ÍÑ•È¡™Õ¹Ñ¥½¸¡Ğ¤ì(€€€€€É•ÑÕÉ¸¹•Üå¼¡Ğ°é”¹-!I}5M!=AQ}=5AIMM%=8¤ì(€€€ô¤°Ñ¡¥Ì¹É•¥ÍÑ•È¡™Õ¹Ñ¥½¸¡Ğ¤ì(€€€€€É•ÑÕÉ¸¹•ÜE˜¡Ğ¤ì(€€€ô¤ì(€ô(€±½…¡”°Ğ°¤°¸¤ì(€€€½¹ÍĞÈ€ôÑ¡¥Ìì(€€€±•ĞÌì(€€€¥˜€¡Ñ¡¥Ì¹É•Í½ÕÉ•A…Ñ €„ôô€ˆˆ¤Ì€ôÑ¡¥Ì¹É•Í½ÕÉ•A…Ñ ì(€€€•±Í”¥˜€¡Ñ¡¥Ì¹Á…Ñ €„ôô€ˆˆ¤ì(€€€€€½¹ÍĞ°€ô-¸¹•áÑÉ…ÑUÉ±	…Í”¡”¤ì(€€€€€Ì€ô-¸¹É•Í½±Ù•UI0¡°°Ñ¡¥Ì¹Á…Ñ ¤ì(€€€ô•±Í”Ì€ô-¸¹•áÑÉ…ÑUÉ±	…Í”¡”¤ì(€€€Ñ¡¥Ì¹µ…¹…•È¹¥Ñ•µMÑ…ÉĞ¡”¤ì(€€€½¹ÍĞ„€ô™Õ¹Ñ¥½¸¡°¤ì(€€€€€¸€ü¸¡°¤€è½¹Í½±”¹•ÉÉ½È¡°¤°È¹µ…¹…•È¹¥Ñ•µÉÉ½È¡”¤°È¹µ…¹…•È¹¥Ñ•µ¹¡”¤ì(€€€ô°¼€ô¹•Üµ°¡Ñ¡¥Ì¹µ…¹…•È¤ì(€€€¼¹Í•ÑA…Ñ ¡Ñ¡¥Ì¹Á…Ñ ¤°¼¹Í•ÑI•ÍÁ½¹Í•QåÁ” ‰…ÉÉ…å‰Õ™™•Èˆ¤°¼¹Í•ÑI•ÅÕ•ÍÑ!•…‘•È¡Ñ¡¥Ì¹É•ÅÕ•ÍÑ!•…‘•È¤°¼¹Í•Ñ]¥Ñ¡É•‘•¹Ñ¥…±Ì¡Ñ¡¥Ì¹İ¥Ñ¡É•‘•¹Ñ¥…±Ì¤°¼¹±½…¡”°™Õ¹Ñ¥½¸¡°¤ì(€€€€€ÑÉäì(€€€€€€€È¹Á…ÉÍ”¡°°Ì°™Õ¹Ñ¥½¸¡Œ¤ì(€€€€€€€€€Ğ¡Œ¤°È¹µ…¹…•È¹¥Ñ•µ¹¡”¤ì(€€€€€€€ô°„¤ì(€€€€€ô…Ñ €¡Œ¤ì(€€€€€€€„¡Œ¤ì(€€€€€ô(€€€ô°¤°„¤ì(€ô(€Í•ÑI=1½…‘•È¡”¤ì(€€€É•ÑÕÉ¸Ñ¡¥Ì¹‘É…½1½…‘•È€ô”°Ñ¡¥Ìì(€ô(€Í•Ñ-Q`É1½…‘•È¡”¤ì(€€€É•ÑÕÉ¸Ñ¡¥Ì¹­ÑàÉ1½…‘•È€ô”°Ñ¡¥Ìì(€ô(€Í•Ñ5•Í¡½ÁÑ•½‘•È¡”¤ì(€€€É•ÑÕÉ¸Ñ¡¥Ì¹µ•Í¡½ÁÑ•½‘•È€ô”°Ñ¡¥Ìì(€ô(€É•¥ÍÑ•È¡”¤ì(€€€É•ÑÕÉ¸Ñ¡¥Ì¹Á±Õ¥¹…±±‰…­Ì¹¥¹‘•á=˜¡”¤€ôôô€´Ä€˜˜Ñ¡¥Ì¹Á±Õ¥¹…±±‰…­Ì¹ÁÕÍ ¡”¤°Ñ¡¥Ìì(€ô(€Õ¹É•¥ÍÑ•È¡”¤ì(€€€É•ÑÕÉ¸Ñ¡¥Ì¹Á±Õ¥¹…±±‰…­Ì¹¥¹‘•á=˜¡”¤€„ôô€´Ä€˜˜Ñ¡¥Ì¹Á±Õ¥¹…±±‰…­Ì¹ÍÁ±¥”¡Ñ¡¥Ì¹Á±Õ¥¹…±±‰…­Ì¹¥¹‘•á=˜¡”¤°€Ä¤°Ñ¡¥Ìì(€ô(€Á…ÉÍ”¡”°Ğ°¤°¸¤ì(€€€±•ĞÈì(€€€½¹ÍĞÌ€ôíô°„€ôíô°¼€ô¹•ÜQ•áÑ•½‘•È ¤ì(€€€¥˜€¡ÑåÁ•½˜”€ôô€‰ÍÑÉ¥¹œˆ¤È€ô)M=8¹Á…ÉÍ”¡”¤ì(€€€•±Í”¥˜€¡”¥¹ÍÑ…¹•½˜ÉÉ…å	Õ™™•È¤¥˜€¡¼¹‘•½‘”¡¹•ÜU¥¹ĞáÉÉ…ä¡”°€À°€Ğ¤¤€ôôôI°¤ì(€€€€€ÑÉäì(€€€€€€€Ímé”¹-!I}	%9Ie}1Qt€ô¹•Ü•À¡”¤ì(€€€€€ô…Ñ €¡Œ¤ì(€€€€€€€¸€˜˜¸¡Œ¤ì(€€€€€€€É•ÑÕÉ¸ì(€€€€€ô(€€€€€È€ô)M=8¹Á…ÉÍ”¡Ímé”¹-!I}	%9Ie}1Qt¹½¹Ñ•¹Ğ¤ì(€€€ô•±Í”È€ô)M=8¹Á…ÉÍ”¡¼¹‘•½‘”¡”¤¤ì(€€€•±Í”È€ô”ì(€€€¥˜€¡È¹…ÍÍ•Ğ€ôôôÙ½¥€ÀñğÈ¹…ÍÍ•Ğ¹Ù•ÉÍ¥½¹lÁt€ğ€È¤ì(€€€€€¸€˜˜¸ ¼¨}}AUI}|€¨¼¹•ÜÉÉ½È ‰Q!I¹1Q1½…‘•ÈèU¹ÍÕÁÁ½ÉÑ•…ÍÍ•Ğ¸±QÙ•ÉÍ¥½¹Ì€øôÈ¸À…É”ÍÕÁÁ½ÉÑ•¸ˆ¤¤ì(€€€€€É•ÑÕÉ¸ì(€€€ô(€€€½¹ÍĞ°€ô¹•Ü™À¡È°ì(€€€€€Á…Ñ èĞñğÑ¡¥Ì¹É•Í½ÕÉ•A…Ñ ñğ€ˆˆ°(€€€€€É½ÍÍ=É¥¥¸èÑ¡¥Ì¹É½ÍÍ=É¥¥¸°(€€€€€É•ÅÕ•ÍÑ!•…‘•ÈèÑ¡¥Ì¹É•ÅÕ•ÍÑ!•…‘•È°(€€€€€µ…¹…•ÈèÑ¡¥Ì¹µ…¹…•È°(€€€€€­ÑàÉ1½…‘•ÈèÑ¡¥Ì¹­ÑàÉ1½…‘•È°(€€€€€µ•Í¡½ÁÑ•½‘•ÈèÑ¡¥Ì¹µ•Í¡½ÁÑ•½‘•È(€€€ô¤ì(€€€°¹™¥±•1½…‘•È¹Í•ÑI•ÅÕ•ÍÑ!•…‘•È¡Ñ¡¥Ì¹É•ÅÕ•ÍÑ!•…‘•È¤ì(€€€™½È€¡±•ĞŒ€ô€ÀìŒ€ğÑ¡¥Ì¹Á±Õ¥¹…±±‰…­Ì¹±•¹Ñ ìŒ¬¬¤ì(€€€€€½¹ÍĞ €ôÑ¡¥Ì¹Á±Õ¥¹…±±‰…­Ímt¡°¤ì(€€€€€ ¹¹…µ”ñğ½¹Í½±”¹•ÉÉ½È ‰Q!I¹1Q1½…‘•Èè%¹Ù…±¥Á±Õ¥¸™½Õ¹èµ¥ÍÍ¥¹œ¹…µ”ˆ¤°…m ¹¹…µ•t€ô °Ím ¹¹…µ•t€ô€„Àì(€€€ô(€€€¥˜€¡È¹•áÑ•¹Í¥½¹ÍUÍ•¤™½È€¡±•ĞŒ€ô€ÀìŒ€ğÈ¹•áÑ•¹Í¥½¹ÍUÍ•¹±•¹Ñ ì€¬­Œ¤ì(€€€€€½¹ÍĞ €ôÈ¹•áÑ•¹Í¥½¹ÍUÍ•‘mt°€ôÈ¹•áÑ•¹Í¥½¹ÍI•ÅÕ¥É•ñğmtì(€€€€€Íİ¥Ñ €¡ ¤ì(€€€€€€€…Í”é”¹-!I}5QI%1M}U91%Pè(€€€€€€€€€Ím¡t€ô¹•Ü­˜ ¤ì(€€€€€€€€€‰É•…¬ì(€€€€€€€…Í”é”¹-!I}I=}5M!}=5AIMM%=8è(€€€€€€€€€Ím¡t€ô¹•ÜÑÀ¡È°Ñ¡¥Ì¹‘É…½1½…‘•È¤ì(€€€€€€€€€‰É•…¬ì(€€€€€€€…Í”é”¹-!I}QaQUI}QI9M=I4è(€€€€€€€€€Ím¡t€ô¹•Ü¥À ¤ì(€€€€€€€€€‰É•…¬ì(€€€€€€€…Í”é”¹-!I}5M!}EU9Q%iQ%=8è(€€€€€€€€€Ím¡t€ô¹•Ü¹À ¤ì(€€€€€€€€€‰É•…¬ì(€€€€€€€‘•™…Õ±Ğè(€€€€€€€€€¹¥¹‘•á=˜¡ ¤€øô€À€˜˜…m¡t€ôôôÙ½¥€À€˜˜½¹Í½±”¹İ…É¸ Q!I¹1Q1½…‘•ÈèU¹­¹½İ¸•áÑ•¹Í¥½¸€ˆœ€¬ €¬€œˆ¸œ¤ì(€€€€€ô(€€€ô(€€€°¹Í•ÑáÑ•¹Í¥½¹Ì¡Ì¤°°¹Í•ÑA±Õ¥¹Ì¡„¤°°¹Á…ÉÍ”¡¤°¸¤ì(€ô(€Á…ÉÍ•Íå¹Œ¡”°Ğ¤ì(€€€½¹ÍĞ¤€ôÑ¡¥Ìì(€€€É•ÑÕÉ¸¹•ÜAÉ½µ¥Í”¡™Õ¹Ñ¥½¸¡¸°È¤ì(€€€€€¤¹Á…ÉÍ”¡”°Ğ°¸°È¤ì(€€€ô¤ì(€ô)ôì)™Õ¹Ñ¥½¸˜ ¤ì(€±•Ğ”€ôíôì(€É•ÑÕÉ¸ì(€€€•Ğè™Õ¹Ñ¥½¸¡Ğ¤ì(€€€€€É•ÑÕÉ¸•mÑtì(€€€ô°(€€€…‘è™Õ¹Ñ¥½¸¡Ğ°¤¤ì(€€€€€•mÑt€ô¤ì(€€€ô°(€€€É•µ½Ù”è™Õ¹Ñ¥½¸¡Ğ¤ì(€€€€€‘•±•Ñ”•mÑtì(€€€ô°(€€€É•µ½Ù•±°è™Õ¹Ñ¥½¸ ¤ì(€€€€€”€ôíôì(€€€ô(€ôì)ô)™Õ¹Ñ¥½¸¡Ğ¡”°Ğ°¤¤ì(€½¹ÍĞ¸€ô”¹©Í½¸¹µ…Ñ•É¥…±ÍmÑtì(€É•ÑÕÉ¸¸¹•áÑ•¹Í¥½¹Ì€˜˜¸¹•áÑ•¹Í¥½¹Ím¥t€ü¸¹•áÑ•¹Í¥½¹Ím¥t€è¹Õ±°ì)ô)Ù…Èé”€ôì(€-!I}	%9Ie}1Qè€‰-!I}‰¥¹…Éå}±Qˆ°(€-!I}I=}5M!}=5AIMM%=8è€‰-!I}‘É…½}µ•Í¡}½µÁÉ•ÍÍ¥½¸ˆ°(€-!I}1%!QM}AU9QU0è€‰-!I}±¥¡ÑÍ}ÁÕ¹ÑÕ…°ˆ°(€-!I}5QI%1M}1I=Pè€‰-!I}µ…Ñ•É¥…±Í}±•…É½…Ğˆ°(€-!I}5QI%1M}%MAIM%=8è€‰-!I}µ…Ñ•É¥…±Í}‘¥ÍÁ•ÉÍ¥½¸ˆ°(€-!I}5QI%1M}%=Hè€‰-!I}µ…Ñ•É¥…±Í}¥½Èˆ°(€-!I}5QI%1M}M!8è€‰-!I}µ…Ñ•É¥…±Í}Í¡••¸ˆ°(€-!I}5QI%1M}MAU1Hè€‰-!I}µ…Ñ•É¥…±Í}ÍÁ•Õ±…Èˆ°(€-!I}5QI%1M}QI9M5%MM%=8è€‰-!I}µ…Ñ•É¥…±Í}ÑÉ…¹Íµ¥ÍÍ¥½¸ˆ°(€-!I}5QI%1M}%I%M9è€‰-!I}µ…Ñ•É¥…±Í}¥É¥‘•Í•¹”ˆ°(€-!I}5QI%1M}9%M=QI=Adè€‰-!I}µ…Ñ•É¥…±Í}…¹¥Í½ÑÉ½Áäˆ°(€-!I}5QI%1M}U91%Pè€‰-!I}µ…Ñ•É¥…±Í}Õ¹±¥Ğˆ°(€-!I}5QI%1M}Y=1U5è€‰-!I}µ…Ñ•É¥…±Í}Ù½±Õµ”ˆ°(€-!I}QaQUI}	M%MTè€‰-!I}Ñ•áÑÕÉ•}‰…Í¥ÍÔˆ°(€-!I}QaQUI}QI9M=I4è€‰-!I}Ñ•áÑÕÉ•}ÑÉ…¹Í™½É´ˆ°(€-!I}5M!}EU9Q%iQ%=8è€‰-!I}µ•Í¡}ÅÕ…¹Ñ¥é…Ñ¥½¸ˆ°(€-!I}5QI%1M}5%MM%Y}MQI9Q è€‰-!I}µ…Ñ•É¥…±Í}•µ¥ÍÍ¥Ù•}ÍÑÉ•¹Ñ ˆ°(€aQ}5QI%1M}	U5@è€‰aQ}µ…Ñ•É¥…±Í}‰ÕµÀˆ°(€aQ}QaQUI}]	@è€‰aQ}Ñ•áÑÕÉ•}İ•‰Àˆ°(€aQ}QaQUI}Y%è€‰aQ}Ñ•áÑÕÉ•}…Ù¥˜ˆ°(€aQ}5M!=AQ}=5AIMM%=8è€‰aQ}µ•Í¡½ÁÑ}½µÁÉ•ÍÍ¥½¸ˆ°(€-!I}5M!=AQ}=5AIMM%=8è€‰-!I}µ•Í¡½ÁÑ}½µÁÉ•ÍÍ¥½¸ˆ°(€aQ}5M!}AU}%9MQ9%9è€‰aQ}µ•Í¡}ÁÕ}¥¹ÍÑ…¹¥¹œˆ)ô°=˜€ô±…ÍÌì(€½¹ÍÑÉÕÑ½È¡”¤ì(€€€Ñ¡¥Ì¹Á…ÉÍ•È€ô”°Ñ¡¥Ì¹¹…µ”€ôé”¹-!I}1%!QM}AU9QU0°Ñ¡¥Ì¹…¡”€ôì(€€€€€É•™Ìèíô°(€€€€€ÕÍ•Ìèíô(€€€ôì(€ô(€}µ…É­•™Ì ¤ì(€€€½¹ÍĞ”€ôÑ¡¥Ì¹Á…ÉÍ•È°Ğ€ôÑ¡¥Ì¹Á…ÉÍ•È¹©Í½¸¹¹½‘•Ìñğmtì(€€€™½È€¡±•Ğ¤€ô€À°¸€ôĞ¹±•¹Ñ ì¤€ğ¸ì¤¬¬¤ì(€€€€€½¹ÍĞÈ€ôÑm¥tì(€€€€€È¹•áÑ•¹Í¥½¹Ì€˜˜È¹•áÑ•¹Í¥½¹ÍmÑ¡¥Ì¹¹…µ•t€˜˜È¹•áÑ•¹Í¥½¹ÍmÑ¡¥Ì¹¹…µ•t¹±¥¡Ğ€„ôôÙ½¥€À€˜˜”¹}…‘‘9½‘•I•˜¡Ñ¡¥Ì¹…¡”°È¹•áÑ•¹Í¥½¹ÍmÑ¡¥Ì¹¹…µ•t¹±¥¡Ğ¤ì(€€€ô(€ô(€}±½…‘1¥¡Ğ¡”¤ì(€€€½¹ÍĞĞ€ôÑ¡¥Ì¹Á…ÉÍ•È°¤€ô€‰±¥¡Ğèˆ€¬”ì(€€€±•Ğ¸€ôĞ¹…¡”¹•Ğ¡¤¤ì(€€€¥˜€¡¸¤É•ÑÕÉ¸¸ì(€€€½¹ÍĞÈ€ôĞ¹©Í½¸°Ì€ô€ ¡È¹•áÑ•¹Í¥½¹Ì€˜˜È¹•áÑ•¹Í¥½¹ÍmÑ¡¥Ì¹¹…µ•tñğíô¤¹±¥¡ÑÌñğmt¥m•tì(€€€±•Ğ„ì(€€€½¹ÍĞ¼€ô¹•Ü9” ÄØÜÜÜÈÄÔ¤ì(€€€Ì¹½±½È€„ôôÙ½¥€À€˜˜¼¹Í•ÑI¡Ì¹½±½ÉlÁt°Ì¹½±½ÉlÅt°Ì¹½±½ÉlÉt°iĞ¤ì(€€€½¹ÍĞ°€ôÌ¹É…¹”€„ôôÙ½¥€À€üÌ¹É…¹”€è€Àì(€€€Íİ¥Ñ €¡Ì¹ÑåÁ”¤ì(€€€€€…Í”€‰‘¥É•Ñ¥½¹…°ˆè(€€€€€€€„€ô¹•Ü9È¡¼¤°„¹Ñ…É•Ğ¹Á½Í¥Ñ¥½¸¹Í•Ğ À°€À°€´Ä¤°„¹…‘¡„¹Ñ…É•Ğ¤ì(€€€€€€€‰É•…¬ì(€€€€€…Í”€‰Á½¥¹Ğˆè(€€€€€€€„€ô¹•Ü¥Ô¡¼¤°„¹‘¥ÍÑ…¹”€ô°ì(€€€€€€€‰É•…¬ì(€€€€€…Í”€‰ÍÁ½Ğˆè(€€€€€€€„€ô¹•Ü•Ô¡¼¤°„¹‘¥ÍÑ…¹”€ô°°Ì¹ÍÁ½Ğ€ôÌ¹ÍÁ½Ğñğíô°Ì¹ÍÁ½Ğ¹¥¹¹•É½¹•¹±”€ôÌ¹ÍÁ½Ğ¹¥¹¹•É½¹•¹±”€„ôôÙ½¥€À€üÌ¹ÍÁ½Ğ¹¥¹¹•É½¹•¹±”€è€À°Ì¹ÍÁ½Ğ¹½ÕÑ•É½¹•¹±”€ôÌ¹ÍÁ½Ğ¹½ÕÑ•É½¹•¹±”€„ôôÙ½¥€À€üÌ¹ÍÁ½Ğ¹½ÕÑ•É½¹•¹±”€è5…Ñ ¹A$€¼€Ğ°„¹…¹±”€ôÌ¹ÍÁ½Ğ¹½ÕÑ•É½¹•¹±”°„¹Á•¹Õµ‰É„€ô€Ä€´Ì¹ÍÁ½Ğ¹¥¹¹•É½¹•¹±”€¼Ì¹ÍÁ½Ğ¹½ÕÑ•É½¹•¹±”°„¹Ñ…É•Ğ¹Á½Í¥Ñ¥½¸¹Í•Ğ À°€À°€´Ä¤°„¹…‘¡„¹Ñ…É•Ğ¤ì(€€€€€€€‰É•…¬ì(€€€€€‘•™…Õ±Ğè(€€€€€€€Ñ¡É½Ü¹•ÜÉÉ½È ‰Q!I¹1Q1½…‘•ÈèU¹•áÁ•Ñ•±¥¡ĞÑåÁ”è€ˆ€¬Ì¹ÑåÁ”¤ì(€€€ô(€€€É•ÑÕÉ¸„¹Á½Í¥Ñ¥½¸¹Í•Ğ À°€À°€À¤°Í¤¡„°Ì¤°Ì¹¥¹Ñ•¹Í¥Ñä€„ôôÙ½¥€À€˜˜€¡„¹¥¹Ñ•¹Í¥Ñä€ôÌ¹¥¹Ñ•¹Í¥Ñä¤°„¹¹…µ”€ôĞ¹É•…Ñ•U¹¥ÅÕ•9…µ”¡Ì¹¹…µ”ñğ€‰±¥¡Ñ|ˆ€¬”¤°¸€ôAÉ½µ¥Í”¹É•Í½±Ù”¡„¤°Ğ¹…¡”¹…‘¡¤°¸¤°¸ì(€ô(€•Ñ•Á•¹‘•¹ä¡”°Ğ¤ì(€€€¥˜€¡”€ôôô€‰±¥¡Ğˆ¤(€€€€€É•ÑÕÉ¸Ñ¡¥Ì¹}±½…‘1¥¡Ğ¡Ğ¤ì(€ô(€É•…Ñ•9½‘•ÑÑ…¡µ•¹Ğ¡”¤ì(€€€½¹ÍĞĞ€ôÑ¡¥Ì°¤€ôÑ¡¥Ì¹Á…ÉÍ•È°¸€ô¤¹©Í½¸¹¹½‘•Ím•t°È€ô€¡¸¹•áÑ•¹Í¥½¹Ì€˜˜¸¹•áÑ•¹Í¥½¹ÍmÑ¡¥Ì¹¹…µ•tñğíô¤¹±¥¡Ğì(€€€É•ÑÕÉ¸È€ôôôÙ½¥€À€ü¹Õ±°€èÑ¡¥Ì¹}±½…‘1¥¡Ğ¡È¤¹Ñ¡•¸¡™Õ¹Ñ¥½¸¡Ì¤ì(€€€€€É•ÑÕÉ¸¤¹}•Ñ9½‘•I•˜¡Ğ¹…¡”°È°Ì¤ì(€€€ô¤ì(€ô)ô°­˜€ô±…ÍÌì(€½¹ÍÑÉÕÑ½È ¤ì(€€€Ñ¡¥Ì¹¹…µ”€ôé”¹-!I}5QI%1M}U91%Pì(€ô(€•Ñ5…Ñ•É¥…±QåÁ” ¤ì(€€€É•ÑÕÉ¸]¤ì(€ô(€•áÑ•¹‘A…É…µÌ¡”°Ğ°¤¤ì(€€€½¹ÍĞ¸€ômtì(€€€”¹½±½È€ô¹•Ü9” Ä°€Ä°€Ä¤°”¹½Á…¥Ñä€ô€Äì(€€€½¹ÍĞÈ€ôĞ¹Á‰É5•Ñ…±±¥I½Õ¡¹•ÍÌì(€€€¥˜€¡È¤ì(€€€€€¥˜€¡ÉÉ…ä¹¥ÍÉÉ…ä¡È¹‰…Í•½±½É…Ñ½È¤¤ì(€€€€€€€½¹ÍĞÌ€ôÈ¹‰…Í•½±½É…Ñ½Èì(€€€€€€€”¹½±½È¹Í•ÑI¡ÍlÁt°ÍlÅt°ÍlÉt°iĞ¤°”¹½Á…¥Ñä€ôÍlÍtì(€€€€€ô(€€€€€È¹‰…Í•½±½ÉQ•áÑÕÉ”€„ôôÙ½¥€À€˜˜¸¹ÁÕÍ ¡¤¹…ÍÍ¥¹Q•áÑÕÉ”¡”°€‰µ…Àˆ°È¹‰…Í•½±½ÉQ•áÑÕÉ”°áĞ¤¤ì(€€€ô(€€€É•ÑÕÉ¸AÉ½µ¥Í”¹…±°¡¸¤ì(€ô)ô°	˜€ô±…ÍÌì(€½¹ÍÑÉÕÑ½È¡”¤ì(€€€Ñ¡¥Ì¹Á…ÉÍ•È€ô”°Ñ¡¥Ì¹¹…µ”€ôé”¹-!I}5QI%1M}5%MM%Y}MQI9Q ì(€ô(€•áÑ•¹‘5…Ñ•É¥…±A…É…µÌ¡”°Ğ¤ì(€€€½¹ÍĞ¤€ô¡Ğ¡Ñ¡¥Ì¹Á…ÉÍ•È°”°Ñ¡¥Ì¹¹…µ”¤ì(€€€É•ÑÕÉ¸¤€ôôô¹Õ±°ñğ¤¹•µ¥ÍÍ¥Ù•MÑÉ•¹Ñ €„ôôÙ½¥€À€˜˜€¡Ğ¹•µ¥ÍÍ¥Ù•%¹Ñ•¹Í¥Ñä€ô¤¹•µ¥ÍÍ¥Ù•MÑÉ•¹Ñ ¤°AÉ½µ¥Í”¹É•Í½±Ù” ¤ì(€ô)ô°é˜€ô±…ÍÌì(€½¹ÍÑÉÕÑ½È¡”¤ì(€€€Ñ¡¥Ì¹Á…ÉÍ•È€ô”°Ñ¡¥Ì¹¹…µ”€ôé”¹-!I}5QI%1M}1I=Pì(€ô(€•Ñ5…Ñ•É¥…±QåÁ”¡”¤ì(€€€É•ÑÕÉ¸¡Ğ¡Ñ¡¥Ì¹Á…ÉÍ•È°”°Ñ¡¥Ì¹¹…µ”¤€„ôô¹Õ±°€ü™¤€è¹Õ±°ì(€ô(€•áÑ•¹‘5…Ñ•É¥…±A…É…µÌ¡”°Ğ¤ì(€€€½¹ÍĞ¤€ô¡Ğ¡Ñ¡¥Ì¹Á…ÉÍ•È°”°Ñ¡¥Ì¹¹…µ”¤ì(€€€¥˜€¡¤€ôôô¹Õ±°¤É•ÑÕÉ¸AÉ½µ¥Í”¹É•Í½±Ù” ¤ì(€€€½¹ÍĞ¸€ômtì(€€€¥˜€¡¤¹±•…É½…Ñ…Ñ½È€„ôôÙ½¥€À€˜˜€¡Ğ¹±•…É½…Ğ€ô¤¹±•…É½…Ñ…Ñ½È¤°¤¹±•…É½…ÑQ•áÑÕÉ”€„ôôÙ½¥€À€˜˜¸¹ÁÕÍ ¡Ñ¡¥Ì¹Á…ÉÍ•È¹…ÍÍ¥¹Q•áÑÕÉ”¡Ğ°€‰±•…É½…Ñ5…Àˆ°¤¹±•…É½…ÑQ•áÑÕÉ”¤¤°¤¹±•…É½…ÑI½Õ¡¹•ÍÍ…Ñ½È€„ôôÙ½¥€À€˜˜€¡Ğ¹±•…É½…ÑI½Õ¡¹•ÍÌ€ô¤¹±•…É½…ÑI½Õ¡¹•ÍÍ…Ñ½È¤°¤¹±•…É½…ÑI½Õ¡¹•ÍÍQ•áÑÕÉ”€„ôôÙ½¥€À€˜˜¸¹ÁÕÍ ¡Ñ¡¥Ì¹Á…ÉÍ•È¹…ÍÍ¥¹Q•áÑÕÉ”¡Ğ°€‰±•…É½…ÑI½Õ¡¹•ÍÍ5…Àˆ°¤¹±•…É½…ÑI½Õ¡¹•ÍÍQ•áÑÕÉ”¤¤°¤¹±•…É½…Ñ9½Éµ…±Q•áÑÕÉ”€„ôôÙ½¥€À€˜˜€¡¸¹ÁÕÍ ¡Ñ¡¥Ì¹Á…ÉÍ•È¹…ÍÍ¥¹Q•áÑÕÉ”¡Ğ°€‰±•…É½…Ñ9½Éµ…±5…Àˆ°¤¹±•…É½…Ñ9½Éµ…±Q•áÑÕÉ”¤¤°¤¹±•…É½…Ñ9½Éµ…±Q•áÑÕÉ”¹Í…±”€„ôôÙ½¥€À¤¤ì(€€€€€½¹ÍĞÈ€ô¤¹±•…É½…Ñ9½Éµ…±Q•áÑÕÉ”¹Í…±”ì(€€€€€Ğ¹±•…É½…Ñ9½Éµ…±M…±”€ô¹•Ü”¡È°È¤ì(€€€ô(€€€É•ÑÕÉ¸AÉ½µ¥Í”¹…±°¡¸¤ì(€ô)ô°˜€ô±…ÍÌì(€½¹ÍÑÉÕÑ½È¡”¤ì(€€€Ñ¡¥Ì¹Á…ÉÍ•È€ô”°Ñ¡¥Ì¹¹…µ”€ôé”¹-!I}5QI%1M}%MAIM%=8ì(€ô(€•Ñ5…Ñ•É¥…±QåÁ”¡”¤ì(€€€É•ÑÕÉ¸¡Ğ¡Ñ¡¥Ì¹Á…ÉÍ•È°”°Ñ¡¥Ì¹¹…µ”¤€„ôô¹Õ±°€ü™¤€è¹Õ±°ì(€ô(€•áÑ•¹‘5…Ñ•É¥…±A…É…µÌ¡”°Ğ¤ì(€€€½¹ÍĞ¤€ô¡Ğ¡Ñ¡¥Ì¹Á…ÉÍ•È°”°Ñ¡¥Ì¹¹…µ”¤ì(€€€É•ÑÕÉ¸¤€ôôô¹Õ±°ñğ€¡Ğ¹‘¥ÍÁ•ÉÍ¥½¸€ô¤¹‘¥ÍÁ•ÉÍ¥½¸€„ôôÙ½¥€À€ü¤¹‘¥ÍÁ•ÉÍ¥½¸€è€À¤°AÉ½µ¥Í”¹É•Í½±Ù” ¤ì(€ô)ô°Y˜€ô±…ÍÌì(€½¹ÍÑÉÕÑ½È¡”¤ì(€€€Ñ¡¥Ì¹Á…ÉÍ•È€ô”°Ñ¡¥Ì¹¹…µ”€ôé”¹-!I}5QI%1M}%I%M9ì(€ô(€•Ñ5…Ñ•É¥…±QåÁ”¡”¤ì(€€€É•ÑÕÉ¸¡Ğ¡Ñ¡¥Ì¹Á…ÉÍ•È°”°Ñ¡¥Ì¹¹…µ”¤€„ôô¹Õ±°€ü™¤€è¹Õ±°ì(€ô(€•áÑ•¹‘5…Ñ•É¥…±A…É…µÌ¡”°Ğ¤ì(€€€½¹ÍĞ¤€ô¡Ğ¡Ñ¡¥Ì¹Á…ÉÍ•È°”°Ñ¡¥Ì¹¹…µ”¤ì(€€€¥˜€¡¤€ôôô¹Õ±°¤É•ÑÕÉ¸AÉ½µ¥Í”¹É•Í½±Ù” ¤ì(€€€½¹ÍĞ¸€ômtì(€€€É•ÑÕÉ¸¤¹¥É¥‘•Í•¹•…Ñ½È€„ôôÙ½¥€À€˜˜€¡Ğ¹¥É¥‘•Í•¹”€ô¤¹¥É¥‘•Í•¹•…Ñ½È¤°¤¹¥É¥‘•Í•¹•Q•áÑÕÉ”€„ôôÙ½¥€À€˜˜¸¹ÁÕÍ ¡Ñ¡¥Ì¹Á…ÉÍ•È¹…ÍÍ¥¹Q•áÑÕÉ”¡Ğ°€‰¥É¥‘•Í•¹•5…Àˆ°¤¹¥É¥‘•Í•¹•Q•áÑÕÉ”¤¤°¤¹¥É¥‘•Í•¹•%½È€„ôôÙ½¥€À€˜˜€¡Ğ¹¥É¥‘•Í•¹•%=H€ô¤¹¥É¥‘•Í•¹•%½È¤°Ğ¹¥É¥‘•Í•¹•Q¡¥­¹•ÍÍI…¹”€ôôôÙ½¥€À€˜˜€¡Ğ¹¥É¥‘•Í•¹•Q¡¥­¹•ÍÍI…¹”€ôlÄÀÀ°€ĞÀÁt¤°¤¹¥É¥‘•Í•¹•Q¡¥­¹•ÍÍ5¥¹¥µÕ´€„ôôÙ½¥€À€˜˜€¡Ğ¹¥É¥‘•Í•¹•Q¡¥­¹•ÍÍI…¹•lÁt€ô¤¹¥É¥‘•Í•¹•Q¡¥­¹•ÍÍ5¥¹¥µÕ´¤°¤¹¥É¥‘•Í•¹•Q¡¥­¹•ÍÍ5…á¥µÕ´€„ôôÙ½¥€À€˜˜€¡Ğ¹¥É¥‘•Í•¹•Q¡¥­¹•ÍÍI…¹•lÅt€ô¤¹¥É¥‘•Í•¹•Q¡¥­¹•ÍÍ5…á¥µÕ´¤°¤¹¥É¥‘•Í•¹•Q¡¥­¹•ÍÍQ•áÑÕÉ”€„ôôÙ½¥€À€˜˜¸¹ÁÕÍ ¡Ñ¡¥Ì¹Á…ÉÍ•È¹…ÍÍ¥¹Q•áÑÕÉ”¡Ğ°€‰¥É¥‘•Í•¹•Q¡¥­¹•ÍÍ5…Àˆ°¤¹¥É¥‘•Í•¹•Q¡¥­¹•ÍÍQ•áÑÕÉ”¤¤°AÉ½µ¥Í”¹…±°¡¸¤ì(€ô)ô°!˜€ô±…ÍÌì(€½¹ÍÑÉÕÑ½È¡”¤ì(€€€Ñ¡¥Ì¹Á…ÉÍ•È€ô”°Ñ¡¥Ì¹¹…µ”€ôé”¹-!I}5QI%1M}M!8ì(€ô(€•Ñ5…Ñ•É¥…±QåÁ”¡”¤ì(€€€É•ÑÕÉ¸¡Ğ¡Ñ¡¥Ì¹Á…ÉÍ•È°”°Ñ¡¥Ì¹¹…µ”¤€„ôô¹Õ±°€ü™¤€è¹Õ±°ì(€ô(€•áÑ•¹‘5…Ñ•É¥…±A…É…µÌ¡”°Ğ¤ì(€€€½¹ÍĞ¤€ô¡Ğ¡Ñ¡¥Ì¹Á…ÉÍ•È°”°Ñ¡¥Ì¹¹…µ”¤ì(€€€¥˜€¡¤€ôôô¹Õ±°¤É•ÑÕÉ¸AÉ½µ¥Í”¹É•Í½±Ù” ¤ì(€€€½¹ÍĞ¸€ômtì(€€€¥˜€¡Ğ¹Í¡••¹½±½È€ô¹•Ü9” À°€À°€À¤°Ğ¹Í¡••¹I½Õ¡¹•ÍÌ€ô€À°Ğ¹Í¡••¸€ô€Ä°¤¹Í¡••¹½±½É…Ñ½È€„ôôÙ½¥€À¤ì(€€€€€½¹ÍĞÈ€ô¤¹Í¡••¹½±½É…Ñ½Èì(€€€€€Ğ¹Í¡••¹½±½È¹Í•ÑI¡ÉlÁt°ÉlÅt°ÉlÉt°iĞ¤ì(€€€ô(€€€É•ÑÕÉ¸¤¹Í¡••¹I½Õ¡¹•ÍÍ…Ñ½È€„ôôÙ½¥€À€˜˜€¡Ğ¹Í¡••¹I½Õ¡¹•ÍÌ€ô¤¹Í¡••¹I½Õ¡¹•ÍÍ…Ñ½È¤°¤¹Í¡••¹½±½ÉQ•áÑÕÉ”€„ôôÙ½¥€À€˜˜¸¹ÁÕÍ ¡Ñ¡¥Ì¹Á…ÉÍ•È¹…ÍÍ¥¹Q•áÑÕÉ”¡Ğ°€‰Í¡••¹½±½É5…Àˆ°¤¹Í¡••¹½±½ÉQ•áÑÕÉ”°áĞ¤¤°¤¹Í¡••¹I½Õ¡¹•ÍÍQ•áÑÕÉ”€„ôôÙ½¥€À€˜˜¸¹ÁÕÍ ¡Ñ¡¥Ì¹Á…ÉÍ•È¹…ÍÍ¥¹Q•áÑÕÉ”¡Ğ°€‰Í¡••¹I½Õ¡¹•ÍÍ5…Àˆ°¤¹Í¡••¹I½Õ¡¹•ÍÍQ•áÑÕÉ”¤¤°AÉ½µ¥Í”¹…±°¡¸¤ì(€ô)ô°]˜€ô±…ÍÌì(€½¹ÍÑÉÕÑ½È¡”¤ì(€€€Ñ¡¥Ì¹Á…ÉÍ•È€ô”°Ñ¡¥Ì¹¹…µ”€ôé”¹-!I}5QI%1M}QI9M5%MM%=8ì(€ô(€•Ñ5…Ñ•É¥…±QåÁ”¡”¤ì(€€€É•ÑÕÉ¸¡Ğ¡Ñ¡¥Ì¹Á…ÉÍ•È°”°Ñ¡¥Ì¹¹…µ”¤€„ôô¹Õ±°€ü™¤€è¹Õ±°ì(€ô(€•áÑ•¹‘5…Ñ•É¥…±A…É…µÌ¡”°Ğ¤ì(€€€½¹ÍĞ¤€ô¡Ğ¡Ñ¡¥Ì¹Á…ÉÍ•È°”°Ñ¡¥Ì¹¹…µ”¤ì(€€€¥˜€¡¤€ôôô¹Õ±°¤É•ÑÕÉ¸AÉ½µ¥Í”¹É•Í½±Ù” ¤ì(€€€½¹ÍĞ¸€ômtì(€€€É•ÑÕÉ¸¤¹ÑÉ…¹Íµ¥ÍÍ¥½¹…Ñ½È€„ôôÙ½¥€À€˜˜€¡Ğ¹ÑÉ…¹Íµ¥ÍÍ¥½¸€ô¤¹ÑÉ…¹Íµ¥ÍÍ¥½¹…Ñ½È¤°¤¹ÑÉ…¹Íµ¥ÍÍ¥½¹Q•áÑÕÉ”€„ôôÙ½¥€À€˜˜¸¹ÁÕÍ ¡Ñ¡¥Ì¹Á…ÉÍ•È¹…ÍÍ¥¹Q•áÑÕÉ”¡Ğ°€‰ÑÉ…¹Íµ¥ÍÍ¥½¹5…Àˆ°¤¹ÑÉ…¹Íµ¥ÍÍ¥½¹Q•áÑÕÉ”¤¤°AÉ½µ¥Í”¹…±°¡¸¤ì(€ô)ô°Å˜€ô±…ÍÌì(€½¹ÍÑÉÕÑ½È¡”¤ì(€€€Ñ¡¥Ì¹Á…ÉÍ•È€ô”°Ñ¡¥Ì¹¹…µ”€ôé”¹-!I}5QI%1M}Y=1U5ì(€ô(€•Ñ5…Ñ•É¥…±QåÁ”¡”¤ì(€€€É•ÑÕÉ¸¡Ğ¡Ñ¡¥Ì¹Á…ÉÍ•È°”°Ñ¡¥Ì¹¹…µ”¤€„ôô¹Õ±°€ü™¤€è¹Õ±°ì(€ô(€•áÑ•¹‘5…Ñ•É¥…±A…É…µÌ¡”°Ğ¤ì(€€€½¹ÍĞ¤€ô¡Ğ¡Ñ¡¥Ì¹Á…ÉÍ•È°”°Ñ¡¥Ì¹¹…µ”¤ì(€€€¥˜€¡¤€ôôô¹Õ±°¤É•ÑÕÉ¸AÉ½µ¥Í”¹É•Í½±Ù” ¤ì(€€€½¹ÍĞ¸€ômtì(€€€Ğ¹Ñ¡¥­¹•ÍÌ€ô¤¹Ñ¡¥­¹•ÍÍ…Ñ½È€„ôôÙ½¥€À€ü¤¹Ñ¡¥­¹•ÍÍ…Ñ½È€è€À°¤¹Ñ¡¥­¹•ÍÍQ•áÑÕÉ”€„ôôÙ½¥€À€˜˜¸¹ÁÕÍ ¡Ñ¡¥Ì¹Á…ÉÍ•È¹…ÍÍ¥¹Q•áÑÕÉ”¡Ğ°€‰Ñ¡¥­¹•ÍÍ5…Àˆ°¤¹Ñ¡¥­¹•ÍÍQ•áÑÕÉ”¤¤°Ğ¹…ÑÑ•¹Õ…Ñ¥½¹¥ÍÑ…¹”€ô¤¹…ÑÑ•¹Õ…Ñ¥½¹¥ÍÑ…¹”ñğ€Ä€¼€Àì(€€€½¹ÍĞÈ€ô¤¹…ÑÑ•¹Õ…Ñ¥½¹½±½Èñğl(€€€€€€Ä°(€€€€€€Ä°(€€€€€€Ä(€€€tì(€€€É•ÑÕÉ¸Ğ¹…ÑÑ•¹Õ…Ñ¥½¹½±½È€ô¹•Ü9” ¤¹Í•ÑI¡ÉlÁt°ÉlÅt°ÉlÉt°iĞ¤°AÉ½µ¥Í”¹…±°¡¸¤ì(€ô)ô°a˜€ô±…ÍÌì(€½¹ÍÑÉÕÑ½È¡”¤ì(€€€Ñ¡¥Ì¹Á…ÉÍ•È€ô”°Ñ¡¥Ì¹¹…µ”€ôé”¹-!I}5QI%1M}%=Hì(€ô(€•Ñ5…Ñ•É¥…±QåÁ”¡”¤ì(€€€É•ÑÕÉ¸¡Ğ¡Ñ¡¥Ì¹Á…ÉÍ•È°”°Ñ¡¥Ì¹¹…µ”¤€„ôô¹Õ±°€ü™¤€è¹Õ±°ì(€ô(€•áÑ•¹‘5…Ñ•É¥…±A…É…µÌ¡”°Ğ¤ì(€€€½¹ÍĞ¤€ô¡Ğ¡Ñ¡¥Ì¹Á…ÉÍ•È°”°Ñ¡¥Ì¹¹…µ”¤ì(€€€É•ÑÕÉ¸¤€ôôô¹Õ±°ñğ€¡Ğ¹¥½È€ô¤¹¥½È€„ôôÙ½¥€À€ü¤¹¥½È€è€Ä¸Ô°Ğ¹¥½È€ôôô€À€˜˜€¡Ğ¹¥½È€ô€Å”Ì¤¤°AÉ½µ¥Í”¹É•Í½±Ù” ¤ì(€ô)ô°-˜€ô±…ÍÌì(€½¹ÍÑÉÕÑ½È¡”¤ì(€€€Ñ¡¥Ì¹Á…ÉÍ•È€ô”°Ñ¡¥Ì¹¹…µ”€ôé”¹-!I}5QI%1M}MAU1Hì(€ô(€•Ñ5…Ñ•É¥…±QåÁ”¡”¤ì(€€€É•ÑÕÉ¸¡Ğ¡Ñ¡¥Ì¹Á…ÉÍ•È°”°Ñ¡¥Ì¹¹…µ”¤€„ôô¹Õ±°€ü™¤€è¹Õ±°ì(€ô(€•áÑ•¹‘5…Ñ•É¥…±A…É…µÌ¡”°Ğ¤ì(€€€½¹ÍĞ¤€ô¡Ğ¡Ñ¡¥Ì¹Á…ÉÍ•È°”°Ñ¡¥Ì¹¹…µ”¤ì(€€€¥˜€¡¤€ôôô¹Õ±°¤É•ÑÕÉ¸AÉ½µ¥Í”¹É•Í½±Ù” ¤ì(€€€½¹ÍĞ¸€ômtì(€€€Ğ¹ÍÁ•Õ±…É%¹Ñ•¹Í¥Ñä€ô¤¹ÍÁ•Õ±…É…Ñ½È€„ôôÙ½¥€À€ü¤¹ÍÁ•Õ±…É…Ñ½È€è€Ä°¤¹ÍÁ•Õ±…ÉQ•áÑÕÉ”€„ôôÙ½¥€À€˜˜¸¹ÁÕÍ ¡Ñ¡¥Ì¹Á…ÉÍ•È¹…ÍÍ¥¹Q•áÑÕÉ”¡Ğ°€‰ÍÁ•Õ±…É%¹Ñ•¹Í¥Ñå5…Àˆ°¤¹ÍÁ•Õ±…ÉQ•áÑÕÉ”¤¤ì(€€€½¹ÍĞÈ€ô¤¹ÍÁ•Õ±…É½±½É…Ñ½Èñğl(€€€€€€Ä°(€€€€€€Ä°(€€€€€€Ä(€€€tì(€€€É•ÑÕÉ¸Ğ¹ÍÁ•Õ±…É½±½È€ô¹•Ü9” ¤¹Í•ÑI¡ÉlÁt°ÉlÅt°ÉlÉt°iĞ¤°¤¹ÍÁ•Õ±…É½±½ÉQ•áÑÕÉ”€„ôôÙ½¥€À€˜˜¸¹ÁÕÍ ¡Ñ¡¥Ì¹Á…ÉÍ•È¹…ÍÍ¥¹Q•áÑÕÉ”¡Ğ°€‰ÍÁ•Õ±…É½±½É5…Àˆ°¤¹ÍÁ•Õ±…É½±½ÉQ•áÑÕÉ”°áĞ¤¤°AÉ½µ¥Í”¹…±°¡¸¤ì(€ô)ô°©˜€ô±…ÍÌì(€½¹ÍÑÉÕÑ½È¡”¤ì(€€€Ñ¡¥Ì¹Á…ÉÍ•È€ô”°Ñ¡¥Ì¹¹…µ”€ôé”¹aQ}5QI%1M}	U5@ì(€ô(€•Ñ5…Ñ•É¥…±QåÁ”¡”¤ì(€€€É•ÑÕÉ¸¡Ğ¡Ñ¡¥Ì¹Á…ÉÍ•È°”°Ñ¡¥Ì¹¹…µ”¤€„ôô¹Õ±°€ü™¤€è¹Õ±°ì(€ô(€•áÑ•¹‘5…Ñ•É¥…±A…É…µÌ¡”°Ğ¤ì(€€€½¹ÍĞ¤€ô¡Ğ¡Ñ¡¥Ì¹Á…ÉÍ•È°”°Ñ¡¥Ì¹¹…µ”¤ì(€€€¥˜€¡¤€ôôô¹Õ±°¤É•ÑÕÉ¸AÉ½µ¥Í”¹É•Í½±Ù” ¤ì(€€€½¹ÍĞ¸€ômtì(€€€É•ÑÕÉ¸Ğ¹‰ÕµÁM…±”€ô¤¹‰ÕµÁ…Ñ½È€„ôôÙ½¥€À€ü¤¹‰ÕµÁ…Ñ½È€è€Ä°¤¹‰ÕµÁQ•áÑÕÉ”€„ôôÙ½¥€À€˜˜¸¹ÁÕÍ ¡Ñ¡¥Ì¹Á…ÉÍ•È¹…ÍÍ¥¹Q•áÑÕÉ”¡Ğ°€‰‰ÕµÁ5…Àˆ°¤¹‰ÕµÁQ•áÑÕÉ”¤¤°AÉ½µ¥Í”¹…±°¡¸¤ì(€ô)ô°e˜€ô±…ÍÌì(€½¹ÍÑÉÕÑ½È¡”¤ì(€€€Ñ¡¥Ì¹Á…ÉÍ•È€ô”°Ñ¡¥Ì¹¹…µ”€ôé”¹-!I}5QI%1M}9%M=QI=Adì(€ô(€•Ñ5…Ñ•É¥…±QåÁ”¡”¤ì(€€€É•ÑÕÉ¸¡Ğ¡Ñ¡¥Ì¹Á…ÉÍ•È°”°Ñ¡¥Ì¹¹…µ”¤€„ôô¹Õ±°€ü™¤€è¹Õ±°ì(€ô(€•áÑ•¹‘5…Ñ•É¥…±A…É…µÌ¡”°Ğ¤ì(€€€½¹ÍĞ¤€ô¡Ğ¡Ñ¡¥Ì¹Á…ÉÍ•È°”°Ñ¡¥Ì¹¹…µ”¤ì(€€€¥˜€¡¤€ôôô¹Õ±°¤É•ÑÕÉ¸AÉ½µ¥Í”¹É•Í½±Ù” ¤ì(€€€½¹ÍĞ¸€ômtì(€€€É•ÑÕÉ¸¤¹…¹¥Í½ÑÉ½ÁåMÑÉ•¹Ñ €„ôôÙ½¥€À€˜˜€¡Ğ¹…¹¥Í½ÑÉ½Áä€ô¤¹…¹¥Í½ÑÉ½ÁåMÑÉ•¹Ñ ¤°¤¹…¹¥Í½ÑÉ½ÁåI½Ñ…Ñ¥½¸€„ôôÙ½¥€À€˜˜€¡Ğ¹…¹¥Í½ÑÉ½ÁåI½Ñ…Ñ¥½¸€ô¤¹…¹¥Í½ÑÉ½ÁåI½Ñ…Ñ¥½¸¤°¤¹…¹¥Í½ÑÉ½ÁåQ•áÑÕÉ”€„ôôÙ½¥€À€˜˜¸¹ÁÕÍ ¡Ñ¡¥Ì¹Á…ÉÍ•È¹…ÍÍ¥¹Q•áÑÕÉ”¡Ğ°€‰…¹¥Í½ÑÉ½Áå5…Àˆ°¤¹…¹¥Í½ÑÉ½ÁåQ•áÑÕÉ”¤¤°AÉ½µ¥Í”¹…±°¡¸¤ì(€ô)ô°)˜€ô±…ÍÌì(€½¹ÍÑÉÕÑ½È¡”¤ì(€€€Ñ¡¥Ì¹Á…ÉÍ•È€ô”°Ñ¡¥Ì¹¹…µ”€ôé”¹-!I}QaQUI}	M%MTì(€ô(€±½…‘Q•áÑÕÉ”¡”¤ì(€€€½¹ÍĞĞ€ôÑ¡¥Ì¹Á…ÉÍ•È°¤€ôĞ¹©Í½¸°¸€ô¤¹Ñ•áÑÕÉ•Ím•tì(€€€¥˜€ …¸¹•áÑ•¹Í¥½¹Ìñğ€…¸¹•áÑ•¹Í¥½¹ÍmÑ¡¥Ì¹¹…µ•t¤É•ÑÕÉ¸¹Õ±°ì(€€€½¹ÍĞÈ€ô¸¹•áÑ•¹Í¥½¹ÍmÑ¡¥Ì¹¹…µ•t°Ì€ôĞ¹½ÁÑ¥½¹Ì¹­ÑàÉ1½…‘•Èì(€€€¥˜€ …Ì¤ì(€€€€€¥˜€¡¤¹•áÑ•¹Í¥½¹ÍI•ÅÕ¥É•€˜˜¤¹•áÑ•¹Í¥½¹ÍI•ÅÕ¥É•¹¥¹‘•á=˜¡Ñ¡¥Ì¹¹…µ”¤€øô€À¤Ñ¡É½Ü¹•ÜÉÉ½È ‰Q!I¹1Q1½…‘•ÈèÍ•Ñ-Q`É1½…‘•ÈµÕÍĞ‰”…±±•‰•™½É”±½…‘¥¹œ-Q`ÈÑ•áÑÕÉ•Ìˆ¤ì(€€€€€É•ÑÕÉ¸¹Õ±°ì(€€€ô(€€€É•ÑÕÉ¸Ğ¹±½…‘Q•áÑÕÉ•%µ…”¡”°È¹Í½ÕÉ”°Ì¤ì(€ô)ô°i˜€ô±…ÍÌì(€½¹ÍÑÉÕÑ½È¡”¤ì(€€€Ñ¡¥Ì¹Á…ÉÍ•È€ô”°Ñ¡¥Ì¹¹…µ”€ôé”¹aQ}QaQUI}]	@ì(€ô(€±½…‘Q•áÑÕÉ”¡”¤ì(€€€½¹ÍĞĞ€ôÑ¡¥Ì¹¹…µ”°¤€ôÑ¡¥Ì¹Á…ÉÍ•È°¸€ô¤¹©Í½¸°È€ô¸¹Ñ•áÑÕÉ•Ím•tì(€€€¥˜€ …È¹•áÑ•¹Í¥½¹Ìñğ€…È¹•áÑ•¹Í¥½¹ÍmÑt¤É•ÑÕÉ¸¹Õ±°ì(€€€½¹ÍĞÌ€ôÈ¹•áÑ•¹Í¥½¹ÍmÑt°„€ô¸¹¥µ…•ÍmÌ¹Í½ÕÉ•tì(€€€±•Ğ¼€ô¤¹Ñ•áÑÕÉ•1½…‘•Èì(€€€¥˜€¡„¹ÕÉ¤¤ì(€€€€€½¹ÍĞ°€ô¤¹½ÁÑ¥½¹Ì¹µ…¹…•È¹•Ñ!…¹‘±•È¡„¹ÕÉ¤¤ì(€€€€€°€„ôô¹Õ±°€˜˜€¡¼€ô°¤ì(€€€ô(€€€É•ÑÕÉ¸¤¹±½…‘Q•áÑÕÉ•%µ…”¡”°Ì¹Í½ÕÉ”°¼¤ì(€ô)ô°€‘˜€ô±…ÍÌì(€½¹ÍÑÉÕÑ½È¡”¤ì(€€€Ñ¡¥Ì¹Á…ÉÍ•È€ô”°Ñ¡¥Ì¹¹…µ”€ôé”¹aQ}QaQUI}Y%ì(€ô(€±½…‘Q•áÑÕÉ”¡”¤ì(€€€½¹ÍĞĞ€ôÑ¡¥Ì¹¹…µ”°¤€ôÑ¡¥Ì¹Á…ÉÍ•È°¸€ô¤¹©Í½¸°È€ô¸¹Ñ•áÑÕÉ•Ím•tì(€€€¥˜€ …È¹•áÑ•¹Í¥½¹Ìñğ€…È¹•áÑ•¹Í¥½¹ÍmÑt¤É•ÑÕÉ¸¹Õ±°ì(€€€½¹ÍĞÌ€ôÈ¹•áÑ•¹Í¥½¹ÍmÑt°„€ô¸¹¥µ…•ÍmÌ¹Í½ÕÉ•tì(€€€±•Ğ¼€ô¤¹Ñ•áÑÕÉ•1½…‘•Èì(€€€¥˜€¡„¹ÕÉ¤¤ì(€€€€€½¹ÍĞ°€ô¤¹½ÁÑ¥½¹Ì¹µ…¹…•È¹•Ñ!…¹‘±•È¡„¹ÕÉ¤¤ì(€€€€€°€„ôô¹Õ±°€˜˜€¡¼€ô°¤ì(€€€ô(€€€É•ÑÕÉ¸¤¹±½…‘Q•áÑÕÉ•%µ…”¡”°Ì¹Í½ÕÉ”°¼¤ì(€ô)ô°å¼€ô±…ÍÌì(€½¹ÍÑÉÕÑ½È¡”°Ğ¤ì(€€€Ñ¡¥Ì¹¹…µ”€ôĞ°Ñ¡¥Ì¹Á…ÉÍ•È€ô”ì(€ô(€±½…‘	Õ™™•ÉY¥•Ü¡”¤ì(€€€½¹ÍĞĞ€ôÑ¡¥Ì¹Á…ÉÍ•È¹©Í½¸°¤€ôĞ¹‰Õ™™•ÉY¥•İÍm•tì(€€€¥˜€¡¤¹•áÑ•¹Í¥½¹Ì€˜˜¤¹•áÑ•¹Í¥½¹ÍmÑ¡¥Ì¹¹…µ•t¤ì(€€€€€½¹ÍĞ¸€ô¤¹•áÑ•¹Í¥½¹ÍmÑ¡¥Ì¹¹…µ•t°È€ôÑ¡¥Ì¹Á…ÉÍ•È¹•Ñ•Á•¹‘•¹ä ‰‰Õ™™•Èˆ°¸¹‰Õ™™•È¤°Ì€ôÑ¡¥Ì¹Á…ÉÍ•È¹½ÁÑ¥½¹Ì¹µ•Í¡½ÁÑ•½‘•Èì(€€€€€¥˜€ …Ìñğ€…Ì¹ÍÕÁÁ½ÉÑ•¤ì(€€€€€€€¥˜€¡Ğ¹•áÑ•¹Í¥½¹ÍI•ÅÕ¥É•€˜˜Ğ¹•áÑ•¹Í¥½¹ÍI•ÅÕ¥É•¹¥¹‘•á=˜¡Ñ¡¥Ì¹¹…µ”¤€øô€À¤Ñ¡É½Ü¹•ÜÉÉ½È ‰Q!I¹1Q1½…‘•ÈèÍ•Ñ5•Í¡½ÁÑ•½‘•ÈµÕÍĞ‰”…±±•‰•™½É”±½…‘¥¹œ½µÁÉ•ÍÍ•™¥±•Ìˆ¤ì(€€€€€€€É•ÑÕÉ¸¹Õ±°ì(€€€€€ô(€€€€€É•ÑÕÉ¸È¹Ñ¡•¸¡™Õ¹Ñ¥½¸¡„¤ì(€€€€€€€½¹ÍĞ¼€ô¸¹‰åÑ•=™™Í•Ğñğ€À°°€ô¸¹‰åÑ•1•¹Ñ ñğ€À°Œ€ô¸¹½Õ¹Ğ° €ô¸¹‰åÑ•MÑÉ¥‘”°€ô¹•ÜU¥¹ĞáÉÉ…ä¡„°¼°°¤ì(€€€€€€€É•ÑÕÉ¸Ì¹‘•½‘•±Ñ™	Õ™™•ÉÍå¹Œ€üÌ¹‘•½‘•±Ñ™	Õ™™•ÉÍå¹Œ¡Œ° °°¸¹µ½‘”°¸¹™¥±Ñ•È¤¹Ñ¡•¸¡™Õ¹Ñ¥½¸¡Ô¤ì(€€€€€€€€€É•ÑÕÉ¸Ô¹‰Õ™™•Èì(€€€€€€€ô¤€èÌ¹É•…‘ä¹Ñ¡•¸¡™Õ¹Ñ¥½¸ ¤ì(€€€€€€€€€½¹ÍĞÔ€ô¹•ÜÉÉ…å	Õ™™•È¡Œ€¨ ¤ì(€€€€€€€€€É•ÑÕÉ¸Ì¹‘•½‘•±Ñ™	Õ™™•È¡¹•ÜU¥¹ĞáÉÉ…ä¡Ô¤°Œ° °°¸¹µ½‘”°¸¹™¥±Ñ•È¤°Ôì(€€€€€€€ô¤ì(€€€€€ô¤ì(€€€ô•±Í”É•ÑÕÉ¸¹Õ±°ì(€ô)ô°E˜€ô±…ÍÌì(€½¹ÍÑÉÕÑ½È¡”¤ì(€€€Ñ¡¥Ì¹¹…µ”€ôé”¹aQ}5M!}AU}%9MQ9%9°Ñ¡¥Ì¹Á…ÉÍ•È€ô”ì(€ô(€É•…Ñ•9½‘•5•Í ¡”¤ì(€€€½¹ÍĞĞ€ôÑ¡¥Ì¹Á…ÉÍ•È¹©Í½¸°¤€ôĞ¹¹½‘•Ím•tì(€€€¥˜€ …¤¹•áÑ•¹Í¥½¹Ìñğ€…¤¹•áÑ•¹Í¥½¹ÍmÑ¡¥Ì¹¹…µ•tñğ¤¹µ•Í €ôôôÙ½¥€À¤É•ÑÕÉ¸¹Õ±°ì(€€€½¹ÍĞ¸€ôĞ¹µ•Í¡•Ím¤¹µ•Í¡tì(€€€™½È€¡½¹ÍĞ¼½˜¸¹ÁÉ¥µ¥Ñ¥Ù•Ì¤¥˜€¡¼¹µ½‘”€„ôô]Ğ¹QI%91L€˜˜¼¹µ½‘”€„ôô]Ğ¹QI%91}MQI%@€˜˜¼¹µ½‘”€„ôô]Ğ¹QI%91}8€˜˜¼¹µ½‘”€„ôôÙ½¥€À¤É•ÑÕÉ¸¹Õ±°ì(€€€½¹ÍĞÈ€ô¤¹•áÑ•¹Í¥½¹ÍmÑ¡¥Ì¹¹…µ•t¹…ÑÑÉ¥‰ÕÑ•Ì°Ì€ômt°„€ôíôì(€€€™½È€¡½¹ÍĞ¼¥¸È¤Ì¹ÁÕÍ ¡Ñ¡¥Ì¹Á…ÉÍ•È¹•Ñ•Á•¹‘•¹ä ‰…•ÍÍ½Èˆ°Ém½t¤¹Ñ¡•¸ ¡°¤€ôø€¡…m½t€ô°°…m½t¤¤¤ì(€€€É•ÑÕÉ¸Ì¹±•¹Ñ €ğ€Ä€ü¹Õ±°€è€¡Ì¹ÁÕÍ ¡Ñ¡¥Ì¹Á…ÉÍ•È¹É•…Ñ•9½‘•5•Í ¡”¤¤°AÉ½µ¥Í”¹…±°¡Ì¤¹Ñ¡•¸ ¡¼¤€ôøì(€€€€€½¹ÍĞ°€ô¼¹Á½À ¤°Œ€ô°¹¥ÍÉ½ÕÀ€ü°¹¡¥±‘É•¸€èm±t° €ô½lÁt¹½Õ¹Ğ°€ômtì(€€€€€™½È€¡½¹ÍĞÔ½˜Œ¤ì(€€€€€€€½¹ÍĞÀ€ô¹•Ü” ¤°Ø€ô¹•Ü8 ¤°ˆ€ô¹•Ü€‘Ğ ¤°´€ô¹•Ü8 Ä°€Ä°€Ä¤°˜€ô¹•Üá ¡Ô¹•½µ•ÑÉä°Ô¹µ…Ñ•É¥…°° ¤ì(€€€€€€€™½È€¡±•ĞP€ô€ÀìP€ğ ìP¬¬¤(€€€€€€€€€„¹QI9M1Q%=8€˜˜Ø¹™É½µ	Õ™™•ÉÑÑÉ¥‰ÕÑ”¡„¹QI9M1Q%=8°P¤°„¹I=QQ%=8€˜˜ˆ¹™É½µ	Õ™™•ÉÑÑÉ¥‰ÕÑ”¡„¹I=QQ%=8°P¤°„¹M1€˜˜´¹™É½µ	Õ™™•ÉÑÑÉ¥‰ÕÑ”¡„¹M1°P¤°˜¹Í•Ñ5…ÑÉ¥áĞ¡P°À¹½µÁ½Í”¡Ø°ˆ°´¤¤ì(€€€€€€€™½È€¡½¹ÍĞP¥¸„¤¥˜€¡P€ôôô€‰}=1=I|Àˆ¤ì(€€€€€€€€€½¹ÍĞ€ô…mQtì(€€€€€€€€€˜¹¥¹ÍÑ…¹•½±½È€ô¹•Ü	Ì¡¹…ÉÉ…ä°¹¥Ñ•µM¥é”°¹¹½Éµ…±¥é•¤ì(€€€€€€€ô•±Í”P€„ôô€‰QI9M1Q%=8ˆ€˜˜P€„ôô€‰I=QQ%=8ˆ€˜˜P€„ôô€‰M1ˆ€˜˜Ô¹•½µ•ÑÉä¹Í•ÑÑÑÉ¥‰ÕÑ”¡P°…mQt¤ì(€€€€€€€‘Ğ¹ÁÉ½Ñ½ÑåÁ”¹½Áä¹…±°¡˜°Ô¤°Ñ¡¥Ì¹Á…ÉÍ•È¹…ÍÍ¥¹¥¹…±5…Ñ•É¥…°¡˜¤°¹ÁÕÍ ¡˜¤ì(€€€€€ô(€€€€€É•ÑÕÉ¸°¹¥ÍÉ½ÕÀ€ü€¡°¹±•…È ¤°°¹…‘ ¸¸¹¤°°¤€è‘lÁtì(€€€ô¤¤ì(€ô)ô°I°€ô€‰±Qˆ°!¸€ô€ÄÈ°¼€ôì(€)M=8è€ÄÌÄÌàÈÄÔÄĞ°(€	%8è€ÔÄÌÀÔØÈ)ô°•À€ô±…ÍÌì(€½¹ÍÑÉÕÑ½È¡”¤ì(€€€Ñ¡¥Ì¹¹…µ”€ôé”¹-!I}	%9Ie}1Q°Ñ¡¥Ì¹½¹Ñ•¹Ğ€ô¹Õ±°°Ñ¡¥Ì¹‰½‘ä€ô¹Õ±°ì(€€€½¹ÍĞĞ€ô¹•Ü…Ñ…Y¥•Ü¡”°€À°!¸¤°¤€ô¹•ÜQ•áÑ•½‘•È ¤ì(€€€¥˜€¡Ñ¡¥Ì¹¡•…‘•È€ôì(€€€€€µ…¥Œè¤¹‘•½‘”¡¹•ÜU¥¹ĞáÉÉ…ä¡”¹Í±¥” À°€Ğ¤¤¤°(€€€€€Ù•ÉÍ¥½¸èĞ¹•ÑU¥¹ĞÌÈ Ğ°€„À¤°(€€€€€±•¹Ñ èĞ¹•ÑU¥¹ĞÌÈ à°€„À¤(€€€ô°Ñ¡¥Ì¹¡•…‘•È¹µ…¥Œ€„ôôI°¤Ñ¡É½Ü¹•ÜÉÉ½È ‰Q!I¹1Q1½…‘•ÈèU¹ÍÕÁÁ½ÉÑ•±Qµ	¥¹…Éä¡•…‘•È¸ˆ¤ì(€€€¥˜€¡Ñ¡¥Ì¹¡•…‘•È¹Ù•ÉÍ¥½¸€ğ€È¤Ñ¡É½Ü¹•ÜÉÉ½È ‰Q!I¹1Q1½…‘•Èè1•…ä‰¥¹…Éä™¥±”‘•Ñ•Ñ•¸ˆ¤ì(€€€½¹ÍĞ¸€ôÑ¡¥Ì¹¡•…‘•È¹±•¹Ñ €´!¸°È€ô¹•Ü…Ñ…Y¥•Ü¡”°!¸¤ì(€€€±•ĞÌ€ô€Àì(€€€™½È€ ìÌ€ğ¸ì€¤ì(€€€€€½¹ÍĞ„€ôÈ¹•ÑU¥¹ĞÌÈ¡Ì°€„À¤ì(€€€€€Ì€¬ô€Ğì(€€€€€½¹ÍĞ¼€ôÈ¹•ÑU¥¹ĞÌÈ¡Ì°€„À¤ì(€€€€€¥˜€¡Ì€¬ô€Ğ°¼€ôôô¼¹)M=8¤ì(€€€€€€€½¹ÍĞ°€ô¹•ÜU¥¹ĞáÉÉ…ä¡”°!¸€¬Ì°„¤ì(€€€€€€€Ñ¡¥Ì¹½¹Ñ•¹Ğ€ô¤¹‘•½‘”¡°¤ì(€€€€€ô•±Í”¥˜€¡¼€ôôô¼¹	%8¤ì(€€€€€€€½¹ÍĞ°€ô!¸€¬Ìì(€€€€€€€Ñ¡¥Ì¹‰½‘ä€ô”¹Í±¥”¡°°°€¬„¤ì(€€€€€ô(€€€€€Ì€¬ô„ì(€€€ô(€€€¥˜€¡Ñ¡¥Ì¹½¹Ñ•¹Ğ€ôôô¹Õ±°¤Ñ¡É½Ü¹•ÜÉÉ½È ‰Q!I¹1Q1½…‘•Èè)M=8½¹Ñ•¹Ğ¹½Ğ™½Õ¹¸ˆ¤ì(€ô)ô°ÑÀ€ô±…ÍÌì(€½¹ÍÑÉÕÑ½È¡”°Ğ¤ì(€€€¥˜€ …Ğ¤Ñ¡É½Ü¹•ÜÉÉ½È ‰Q!I¹1Q1½…‘•Èè9¼I=1½…‘•È¥¹ÍÑ…¹”ÁÉ½Ù¥‘•¸ˆ¤ì(€€€Ñ¡¥Ì¹¹…µ”€ôé”¹-!I}I=}5M!}=5AIMM%=8°Ñ¡¥Ì¹©Í½¸€ô”°Ñ¡¥Ì¹‘É…½1½…‘•È€ôĞ°Ñ¡¥Ì¹‘É…½1½…‘•È¹ÁÉ•±½… ¤ì(€ô(€‘•½‘•AÉ¥µ¥Ñ¥Ù”¡”°Ğ¤ì(€€€½¹ÍĞ¤€ôÑ¡¥Ì¹©Í½¸°¸€ôÑ¡¥Ì¹‘É…½1½…‘•È°È€ô”¹•áÑ•¹Í¥½¹ÍmÑ¡¥Ì¹¹…µ•t¹‰Õ™™•ÉY¥•Ü°Ì€ô”¹•áÑ•¹Í¥½¹ÍmÑ¡¥Ì¹¹…µ•t¹…ÑÑÉ¥‰ÕÑ•Ì°„€ôíô°¼€ôíô°°€ôíôì(€€€™½È€¡½¹ÍĞŒ¥¸Ì¤ì(€€€€€½¹ÍĞ €ô!ÍmtñğŒ¹Ñ½1½İ•É…Í” ¤ì(€€€€€…m¡t€ôÍmtì(€€€ô(€€€™½È€¡½¹ÍĞŒ¥¸”¹…ÑÑÉ¥‰ÕÑ•Ì¤ì(€€€€€½¹ÍĞ €ô!ÍmtñğŒ¹Ñ½1½İ•É…Í” ¤ì(€€€€€¥˜€¡Ímt€„ôôÙ½¥€À¤ì(€€€€€€€½¹ÍĞ€ô¤¹…•ÍÍ½ÉÍm”¹…ÑÑÉ¥‰ÕÑ•Ímutì(€€€€€€€±m¡t€ô}¹m¹½µÁ½¹•¹ÑQåÁ•t¹¹…µ”°½m¡t€ô¹¹½Éµ…±¥é•€ôôô€„Àì(€€€€€ô(€€€ô(€€€É•ÑÕÉ¸Ğ¹•Ñ•Á•¹‘•¹ä ‰‰Õ™™•ÉY¥•Üˆ°È¤¹Ñ¡•¸¡™Õ¹Ñ¥½¸¡Œ¤ì(€€€€€É•ÑÕÉ¸¹•ÜAÉ½µ¥Í”¡™Õ¹Ñ¥½¸¡ °¤ì(€€€€€€€¸¹‘•½‘•É…½¥±”¡Œ°™Õ¹Ñ¥½¸¡Ô¤ì(€€€€€€€€€™½È€¡½¹ÍĞÀ¥¸Ô¹…ÑÑÉ¥‰ÕÑ•Ì¤ì(€€€€€€€€€€€½¹ÍĞØ€ôÔ¹…ÑÑÉ¥‰ÕÑ•ÍmÁt°ˆ€ô½mÁtì(€€€€€€€€€€€ˆ€„ôôÙ½¥€À€˜˜€¡Ø¹¹½Éµ…±¥é•€ôˆ¤ì(€€€€€€€€€ô(€€€€€€€€€ ¡Ô¤ì(€€€€€€€ô°„°°°iĞ°¤ì(€€€€€ô¤ì(€€€ô¤ì(€ô)ô°¥À€ô±…ÍÌì(€½¹ÍÑÉÕÑ½È ¤ì(€€€Ñ¡¥Ì¹¹…µ”€ôé”¹-!I}QaQUI}QI9M=I4ì(€ô(€•áÑ•¹‘Q•áÑÕÉ”¡”°Ğ¤ì(€€€É•ÑÕÉ¸€¡Ğ¹Ñ•á½½É€ôôôÙ½¥€ÀñğĞ¹Ñ•á½½É€ôôô”¹¡…¹¹•°¤€˜˜Ğ¹½™™Í•Ğ€ôôôÙ½¥€À€˜˜Ğ¹É½Ñ…Ñ¥½¸€ôôôÙ½¥€À€˜˜Ğ¹Í…±”€ôôôÙ½¥€Àñğ€¡”€ô”¹±½¹” ¤°Ğ¹Ñ•á½½É€„ôôÙ½¥€À€˜˜€¡”¹¡…¹¹•°€ôĞ¹Ñ•á½½É¤°Ğ¹½™™Í•Ğ€„ôôÙ½¥€À€˜˜”¹½™™Í•Ğ¹™É½µÉÉ…ä¡Ğ¹½™™Í•Ğ¤°Ğ¹É½Ñ…Ñ¥½¸€„ôôÙ½¥€À€˜˜€¡”¹É½Ñ…Ñ¥½¸€ôĞ¹É½Ñ…Ñ¥½¸¤°Ğ¹Í…±”€„ôôÙ½¥€À€˜˜”¹É•Á•…Ğ¹™É½µÉÉ…ä¡Ğ¹Í…±”¤°”¹¹••‘ÍUÁ‘…Ñ”€ô€„À¤°”ì(€ô)ô°¹À€ô±…ÍÌì(€½¹ÍÑÉÕÑ½È ¤ì(€€€Ñ¡¥Ì¹¹…µ”€ôé”¹-!I}5M!}EU9Q%iQ%=8ì(€ô)ô°İ°€ô±…ÍÌ•áÑ•¹‘Ì¸ì(€½¹ÍÑÉÕÑ½È¡”°Ğ°¤°¸¤ì(€€€ÍÕÁ•È¡”°Ğ°¤°¸¤ì(€ô(€½ÁåM…µÁ±•Y…±Õ•|¡”¤ì(€€€½¹ÍĞĞ€ôÑ¡¥Ì¹É•ÍÕ±Ñ	Õ™™•È°¤€ôÑ¡¥Ì¹Í…µÁ±•Y…±Õ•Ì°¸€ôÑ¡¥Ì¹Ù…±Õ•M¥é”°È€ô”€¨¸€¨€Ì€¬¸ì(€€€™½È€¡±•ĞÌ€ô€ÀìÌ€„ôô¸ìÌ¬¬¤ÑmÍt€ô¥mÈ€¬Ítì(€€€É•ÑÕÉ¸Ğì(€ô(€¥¹Ñ•ÉÁ½±…Ñ•|¡”°Ğ°¤°¸¤ì(€€€½¹ÍĞÈ€ôÑ¡¥Ì¹É•ÍÕ±Ñ	Õ™™•È°Ì€ôÑ¡¥Ì¹Í…µÁ±•Y…±Õ•Ì°„€ôÑ¡¥Ì¹Ù…±Õ•M¥é”°¼€ô„€¨€È°°€ô„€¨€Ì°Œ€ô¸€´Ğ° €ô€¡¤€´Ğ¤€¼Œ°€ô €¨ °Ô€ô€¨ °À€ô”€¨°°Ø€ôÀ€´°°ˆ€ô€´È€¨Ô€¬€Ì€¨°´€ôÔ€´°˜€ô€Ä€´ˆ°P€ô´€´€¬ ì(€€€™½È€¡±•Ğ€ô€Àì€„ôô„ì¬¬¤ì(€€€€€½¹ÍĞ4€ôÍmØ€¬€¬…t°€ôÍmØ€¬€¬½t€¨Œ°H€ôÍmÀ€¬€¬…t°€ôÍmÀ€¬t€¨Œì(€€€€€Émt€ô˜€¨4€¬P€¨€¬ˆ€¨H€¬´€¨ì(€€€ô(€€€É•ÑÕÉ¸Èì(€ô)ô°ÉÀ€ô¹•Ü€‘Ğ ¤°ÍÀ€ô±…ÍÌ•áÑ•¹‘Ìİ°ì(€¥¹Ñ•ÉÁ½±…Ñ•|¡”°Ğ°¤°¸¤ì(€€€½¹ÍĞÈ€ôÍÕÁ•È¹¥¹Ñ•ÉÁ½±…Ñ•|¡”°Ğ°¤°¸¤ì(€€€É•ÑÕÉ¸ÉÀ¹™É½µÉÉ…ä¡È¤¹¹½Éµ…±¥é” ¤¹Ñ½ÉÉ…ä¡È¤°Èì(€ô)ô°]Ğ€ôì(€1=Pè€ÔÄÈØ°(€1=Q}5PÌè€ÌÔØÜÔ°(€1=Q}5PĞè€ÌÔØÜØ°(€1=Q}YÈè€ÌÔØØĞ°(€1=Q}YÌè€ÌÔØØÔ°(€1=Q}YĞè€ÌÔØØØ°(€1%9Hè€äÜÈä°(€IAPè€ÄÀĞäÜ°(€M5A1I|Éè€ÌÔØÜà°(€A=%9QLè€À°(€1%9Lè€Ä°(€1%9}1==@è€È°(€1%9}MQI%@è€Ì°(€QI%91Lè€Ğ°(€QI%91}MQI%@è€Ô°(€QI%91}8è€Ø°(€U9M%9}	eQè€ÔÄÈÄ°(€U9M%9}M!=IPè€ÔÄÈÌ)ô°}¸€ôì(€€ÔÄÈÀè%¹ĞáÉÉ…ä°(€€ÔÄÈÄèU¥¹ĞáÉÉ…ä°(€€ÔÄÈÈè%¹ĞÄÙÉÉ…ä°(€€ÔÄÈÌèU¥¹ĞÄÙÉÉ…ä°(€€ÔÄÈÔèU¥¹ĞÌÉÉÉ…ä°(€€ÔÄÈØè±½…ĞÌÉÉÉ…ä)ô°Q¼€ôì(€€äÜÈàèQĞ°(€€äÜÈäè%Ğ°(€€ääàĞèA¼°(€€ääàÔè¼°(€€ääàØè1¼°(€€ääàÜèÅÈ)ô°¼€ôì(€€ÌÌÀÜÄè½¤°(€€ÌÌØĞàè=È°(€€ÄÀĞäÜèÈ)ô°9Ì€ôì(€M1Hè€Ä°(€YÈè€È°(€YÌè€Ì°(€YĞè€Ğ°(€5PÈè€Ğ°(€5PÌè€ä°(€5PĞè€ÄØ)ô°!Ì€ôì(€A=M%Q%=8è€‰Á½Í¥Ñ¥½¸ˆ°(€9=I50è€‰¹½Éµ…°ˆ°(€Q99Pè€‰Ñ…¹•¹Ğˆ°(€Qa==I|Àè€‰ÕØˆ°(€Qa==I|Äè€‰ÕØÄˆ°(€Qa==I|Èè€‰ÕØÈˆ°(€Qa==I|Ìè€‰ÕØÌˆ°(€=1=I|Àè€‰½±½Èˆ°(€]%!QM|Àè€‰Í­¥¹]•¥¡Ğˆ°(€)=%9QM|Àè€‰Í­¥¹%¹‘•àˆ)ô°1¤€ôì(€Í…±”è€‰Í…±”ˆ°(€ÑÉ…¹Í±…Ñ¥½¸è€‰Á½Í¥Ñ¥½¸ˆ°(€É½Ñ…Ñ¥½¸è€‰ÅÕ…Ñ•É¹¥½¸ˆ°(€İ•¥¡ÑÌè€‰µ½ÉÁ¡Q…É•Ñ%¹™±Õ•¹•Ìˆ)ô°…À€ôì(€U	%MA1%9èÙ½¥€À°(€1%9Hè)¸°(€MQ@èe¸)ô°UÌ€ôì(€=AEUè€‰=AEUˆ°(€5M,è€‰5M,ˆ°(€	19è€‰	19ˆ)ôì)™Õ¹Ñ¥½¸½À¡”¤ì(€É•ÑÕÉ¸”¹•™…Õ±Ñ5…Ñ•É¥…°€ôôôÙ½¥€À€˜˜€¡”¹•™…Õ±Ñ5…Ñ•É¥…°€ô¹•ÜaÈ¡ì(€€€½±½Èè€ÄØÜÜÜÈÄÔ°(€€€•µ¥ÍÍ¥Ù”è€À°(€€€µ•Ñ…±¹•ÍÌè€Ä°(€€€É½Õ¡¹•ÍÌè€Ä°(€€€ÑÉ…¹ÍÁ…É•¹Ğè€„Ä°(€€€‘•ÁÑ¡Q•ÍĞè€„À°(€€€Í¥‘”è€À(€ô¤¤°”¹•™…Õ±Ñ5…Ñ•É¥…°ì)ô)™Õ¹Ñ¥½¸¤¡”°Ğ°¤¤ì(€™½È€¡½¹ÍĞ¸¥¸¤¹•áÑ•¹Í¥½¹Ì¤•m¹t€ôôôÙ½¥€À€˜˜€¡Ğ¹ÕÍ•É…Ñ„¹±Ñ™áÑ•¹Í¥½¹Ì€ôĞ¹ÕÍ•É…Ñ„¹±Ñ™áÑ•¹Í¥½¹Ìñğíô°Ğ¹ÕÍ•É…Ñ„¹±Ñ™áÑ•¹Í¥½¹Ím¹t€ô¤¹•áÑ•¹Í¥½¹Ím¹t¤ì)ô)™Õ¹Ñ¥½¸Í¤¡”°Ğ¤ì(€Ğ¹•áÑÉ…Ì€„ôôÙ½¥€À€˜˜€¡ÑåÁ•½˜Ğ¹•áÑÉ…Ì€ôô€‰½‰©•Ğˆ€ü=‰©•Ğ¹…ÍÍ¥¸¡”¹ÕÍ•É…Ñ„°Ğ¹•áÑÉ…Ì¤€è½¹Í½±”¹İ…É¸ ‰Q!I¹1Q1½…‘•Èè%¹½É¥¹œÁÉ¥µ¥Ñ¥Ù”ÑåÁ”€¹•áÑÉ…Ì°€ˆ€¬Ğ¹•áÑÉ…Ì¤¤ì)ô)™Õ¹Ñ¥½¸±À¡”°Ğ°¤¤ì(€±•Ğ¸€ô€„Ä°È€ô€„Ä°Ì€ô€„Äì(€™½È€¡±•ĞŒ€ô€À° €ôĞ¹±•¹Ñ ìŒ€ğ ìŒ¬¬¤ì(€€€½¹ÍĞ€ôÑmtì(€€€¥˜€¡¹A=M%Q%=8€„ôôÙ½¥€À€˜˜€¡¸€ô€„À¤°¹9=I50€„ôôÙ½¥€À€˜˜€¡È€ô€„À¤°¹=1=I|À€„ôôÙ½¥€À€˜˜€¡Ì€ô€„À¤°¸€˜˜È€˜˜Ì¤‰É•…¬ì(€ô(€¥˜€ …¸€˜˜€…È€˜˜€…Ì¤É•ÑÕÉ¸AÉ½µ¥Í”¹É•Í½±Ù”¡”¤ì(€½¹ÍĞ„€ômt°¼€ômt°°€ômtì(€™½È€¡±•ĞŒ€ô€À° €ôĞ¹±•¹Ñ ìŒ€ğ ìŒ¬¬¤ì(€€€½¹ÍĞ€ôÑmtì(€€€¥˜€¡¸¤ì(€€€€€½¹ÍĞÔ€ô¹A=M%Q%=8€„ôôÙ½¥€À€ü¤¹•Ñ•Á•¹‘•¹ä ‰…•ÍÍ½Èˆ°¹A=M%Q%=8¤€è”¹…ÑÑÉ¥‰ÕÑ•Ì¹Á½Í¥Ñ¥½¸ì(€€€€€„¹ÁÕÍ ¡Ô¤ì(€€€ô(€€€¥˜€¡È¤ì(€€€€€½¹ÍĞÔ€ô¹9=I50€„ôôÙ½¥€À€ü¤¹•Ñ•Á•¹‘•¹ä ‰…•ÍÍ½Èˆ°¹9=I50¤€è”¹…ÑÑÉ¥‰ÕÑ•Ì¹¹½Éµ…°ì(€€€€€¼¹ÁÕÍ ¡Ô¤ì(€€€ô(€€€¥˜€¡Ì¤ì(€€€€€½¹ÍĞÔ€ô¹=1=I|À€„ôôÙ½¥€À€ü¤¹•Ñ•Á•¹‘•¹ä ‰…•ÍÍ½Èˆ°¹=1=I|À¤€è”¹…ÑÑÉ¥‰ÕÑ•Ì¹½±½Èì(€€€€€°¹ÁÕÍ ¡Ô¤ì(€€€ô(€ô(€É•ÑÕÉ¸AÉ½µ¥Í”¹…±°¡l(€€€AÉ½µ¥Í”¹…±°¡„¤°(€€€AÉ½µ¥Í”¹…±°¡¼¤°(€€€AÉ½µ¥Í”¹…±°¡°¤(€t¤¹Ñ¡•¸¡™Õ¹Ñ¥½¸¡Œ¤ì(€€€½¹ÍĞ €ôlÁt°€ôlÅt°Ô€ôlÉtì(€€€É•ÑÕÉ¸¸€˜˜€¡”¹µ½ÉÁ¡ÑÑÉ¥‰ÕÑ•Ì¹Á½Í¥Ñ¥½¸€ô ¤°È€˜˜€¡”¹µ½ÉÁ¡ÑÑÉ¥‰ÕÑ•Ì¹¹½Éµ…°€ô¤°Ì€˜˜€¡”¹µ½ÉÁ¡ÑÑÉ¥‰ÕÑ•Ì¹½±½È€ôÔ¤°”¹µ½ÉÁ¡Q…É•ÑÍI•±…Ñ¥Ù”€ô€„À°”ì(€ô¤ì)ô)™Õ¹Ñ¥½¸À¡”°Ğ¤ì(€¥˜€¡”¹ÕÁ‘…Ñ•5½ÉÁ¡Q…É•ÑÌ ¤°Ğ¹İ•¥¡ÑÌ€„ôôÙ½¥€À¤™½È€¡±•Ğ¤€ô€À°¸€ôĞ¹İ•¥¡ÑÌ¹±•¹Ñ ì¤€ğ¸ì¤¬¬¤”¹µ½ÉÁ¡Q…É•Ñ%¹™±Õ•¹•Ím¥t€ôĞ¹İ•¥¡ÑÍm¥tì(€¥˜€¡Ğ¹•áÑÉ…Ì€˜˜ÉÉ…ä¹¥ÍÉÉ…ä¡Ğ¹•áÑÉ…Ì¹Ñ…É•Ñ9…µ•Ì¤¤ì(€€€½¹ÍĞ¤€ôĞ¹•áÑÉ…Ì¹Ñ…É•Ñ9…µ•Ìì(€€€¥˜€¡”¹µ½ÉÁ¡Q…É•Ñ%¹™±Õ•¹•Ì¹±•¹Ñ €ôôô¤¹±•¹Ñ ¤ì(€€€€€”¹µ½ÉÁ¡Q…É•Ñ¥Ñ¥½¹…Éä€ôíôì(€€€€€™½È€¡±•Ğ¸€ô€À°È€ô¤¹±•¹Ñ ì¸€ğÈì¸¬¬¤”¹µ½ÉÁ¡Q…É•Ñ¥Ñ¥½¹…Éåm¥m¹ut€ô¸ì(€€€ô•±Í”½¹Í½±”¹İ…É¸ ‰Q!I¹1Q1½…‘•Èè%¹Ù…±¥•áÑÉ…Ì¹Ñ…É•Ñ9…µ•Ì±•¹Ñ ¸%¹½É¥¹œ¹…µ•Ì¸ˆ¤ì(€ô)ô)™Õ¹Ñ¥½¸¡À¡”¤ì(€±•ĞĞì(€½¹ÍĞ¤€ô”¹•áÑ•¹Í¥½¹Ì€˜˜”¹•áÑ•¹Í¥½¹Ímé”¹-!I}I=}5M!}=5AIMM%=9tì(€¥˜€¡¤€üĞ€ô€‰‘É…¼èˆ€¬¤¹‰Õ™™•ÉY¥•Ü€¬€ˆèˆ€¬¤¹¥¹‘¥•Ì€¬€ˆèˆ€¬Ì¡¤¹…ÑÑÉ¥‰ÕÑ•Ì¤€èĞ€ô”¹¥¹‘¥•Ì€¬€ˆèˆ€¬Ì¡”¹…ÑÑÉ¥‰ÕÑ•Ì¤€¬€ˆèˆ€¬”¹µ½‘”°”¹Ñ…É•ÑÌ€„ôôÙ½¥€À¤™½È€¡±•Ğ¸€ô€À°È€ô”¹Ñ…É•ÑÌ¹±•¹Ñ ì¸€ğÈì¸¬¬¤Ğ€¬ô€ˆèˆ€¬Ì¡”¹Ñ…É•ÑÍm¹t¤ì(€É•ÑÕÉ¸Ğì)ô)™Õ¹Ñ¥½¸Ì¡”¤ì(€±•ĞĞ€ô€ˆˆì(€½¹ÍĞ¤€ô=‰©•Ğ¹­•åÌ¡”¤¹Í½ÉĞ ¤ì(€™½È€¡±•Ğ¸€ô€À°È€ô¤¹±•¹Ñ ì¸€ğÈì¸¬¬¤Ğ€¬ô¥m¹t€¬€ˆèˆ€¬•m¥m¹ut€¬€ˆìˆì(€É•ÑÕÉ¸Ğì)ô)™Õ¹Ñ¥½¸]Ì¡”¤ì(€Íİ¥Ñ €¡”¤ì(€€€…Í”%¹ĞáÉÉ…äè(€€€€€É•ÑÕÉ¸€Ä€¼€ÄÈÜì(€€€…Í”U¥¹ĞáÉÉ…äè(€€€€€É•ÑÕÉ¸€Ä€¼€ÈÔÔì(€€€…Í”%¹ĞÄÙÉÉ…äè(€€€€€É•ÑÕÉ¸€Ä€¼€ÌÈÜØÜì(€€€…Í”U¥¹ĞÄÙÉÉ…äè(€€€€€É•ÑÕÉ¸€Ä€¼€ØÔÔÌÔì(€€€‘•™…Õ±Ğè(€€€€€Ñ¡É½Ü¹•ÜÉÉ½È ‰Q!I¹1Q1½…‘•ÈèU¹ÍÕÁÁ½ÉÑ•¹½Éµ…±¥é•…•ÍÍ½È½µÁ½¹•¹ĞÑåÁ”¸ˆ¤ì(€ô)ô)™Õ¹Ñ¥½¸ÕÀ¡”¤ì(€É•ÑÕÉ¸”¹Í•…É  ½p¹©Á”ıœ ‘ñpü¤½¤¤€ø€Àñğ”¹Í•…É  ½y‘…Ñ…pé¥µ…•p½©Á•œ¼¤€ôôô€À€ü€‰¥µ…”½©Á•œˆ€è”¹Í•…É  ½p¹İ•‰À ‘ñpü¤½¤¤€ø€Àñğ”¹Í•…É  ½y‘…Ñ…pé¥µ…•p½İ•‰À¼¤€ôôô€À€ü€‰¥µ…”½İ•‰Àˆ€è”¹Í•…É  ½p¹­ÑàÈ ‘ñpü¤½¤¤€ø€Àñğ”¹Í•…É  ½y‘…Ñ…pé¥µ…•p½­ÑàÈ¼¤€ôôô€À€ü€‰¥µ…”½­ÑàÈˆ€è€‰¥µ…”½Á¹œˆì)ô)Ù…È‘À€ô¹•Ü” ¤°™À€ô±…ÍÌì(€½¹ÍÑÉÕÑ½È¡”€ôíô°Ğ€ôíô¤ì(€€€Ñ¡¥Ì¹©Í½¸€ô”°Ñ¡¥Ì¹•áÑ•¹Í¥½¹Ì€ôíô°Ñ¡¥Ì¹Á±Õ¥¹Ì€ôíô°Ñ¡¥Ì¹½ÁÑ¥½¹Ì€ôĞ°Ñ¡¥Ì¹…¡”€ô¹•Ü˜ ¤°Ñ¡¥Ì¹…ÍÍ½¥…Ñ¥½¹Ì€ô€¼¨}}AUI}|€¨¼¹•Ü5…À ¤°Ñ¡¥Ì¹ÁÉ¥µ¥Ñ¥Ù•…¡”€ôíô°Ñ¡¥Ì¹¹½‘•…¡”€ôíô°Ñ¡¥Ì¹µ•Í¡…¡”€ôì(€€€€€É•™Ìèíô°(€€€€€ÕÍ•Ìèíô(€€€ô°Ñ¡¥Ì¹…µ•É……¡”€ôì(€€€€€É•™Ìèíô°(€€€€€ÕÍ•Ìèíô(€€€ô°Ñ¡¥Ì¹±¥¡Ñ…¡”€ôì(€€€€€É•™Ìèíô°(€€€€€ÕÍ•Ìèíô(€€€ô°Ñ¡¥Ì¹Í½ÕÉ•…¡”€ôíô°Ñ¡¥Ì¹Ñ•áÑÕÉ•…¡”€ôíô°Ñ¡¥Ì¹¹½‘•9…µ•ÍUÍ•€ôíôì(€€€±•Ğ¤€ô€„Ä°¸€ô€´Ä°È€ô€„Ä°Ì€ô€´Äì(€€€¥˜€¡ÑåÁ•½˜¹…Ù¥…Ñ½È€ğ€‰Ôˆ€˜˜ÑåÁ•½˜¹…Ù¥…Ñ½È¹ÕÍ•É•¹Ğ€ğ€‰Ôˆ¤ì(€€€€€½¹ÍĞ„€ô¹…Ù¥…Ñ½È¹ÕÍ•É•¹Ğì(€€€€€¤€ô€½x  ü…¡É½µ•ñ…¹‘É½¥¤¸¤©Í…™…É¤½¤¹Ñ•ÍĞ¡„¤€ôôô€„Àì(€€€€€½¹ÍĞ¼€ô„¹µ…Ñ  ½Y•ÉÍ¥½¹p¼¡q¬¤¼¤ì(€€€€€¸€ô¤€˜˜¼€üÁ…ÉÍ•%¹Ğ¡½lÅt°€ÄÀ¤€è€´Ä°È€ô„¹¥¹‘•á=˜ ‰¥É•™½àˆ¤€ø€´Ä°Ì€ôÈ€ü„¹µ…Ñ  ½¥É•™½áp¼¡lÀ´åt¬¥p¸¼¥lÅt€è€´Äì(€€€ô(€€€ÑåÁ•½˜É•…Ñ•%µ…•	¥Ñµ…À€ø€‰Ôˆñğ¤€˜˜¸€ğ€ÄÜñğÈ€˜˜Ì€ğ€äà€üÑ¡¥Ì¹Ñ•áÑÕÉ•1½…‘•È€ô¹•Üi ¡Ñ¡¥Ì¹½ÁÑ¥½¹Ì¹µ…¹…•È¤€èÑ¡¥Ì¹Ñ•áÑÕÉ•1½…‘•È€ô¹•ÜÉÔ¡Ñ¡¥Ì¹½ÁÑ¥½¹Ì¹µ…¹…•È¤°Ñ¡¥Ì¹Ñ•áÑÕÉ•1½…‘•È¹Í•ÑÉ½ÍÍ=É¥¥¸¡Ñ¡¥Ì¹½ÁÑ¥½¹Ì¹É½ÍÍ=É¥¥¸¤°Ñ¡¥Ì¹Ñ•áÑÕÉ•1½…‘•È¹Í•ÑI•ÅÕ•ÍÑ!•…‘•È¡Ñ¡¥Ì¹½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÑ!•…‘•È¤°Ñ¡¥Ì¹™¥±•1½…‘•È€ô¹•Üµ°¡Ñ¡¥Ì¹½ÁÑ¥½¹Ì¹µ…¹…•È¤°Ñ¡¥Ì¹™¥±•1½…‘•È¹Í•ÑI•ÍÁ½¹Í•QåÁ” ‰…ÉÉ…å‰Õ™™•Èˆ¤°Ñ¡¥Ì¹½ÁÑ¥½¹Ì¹É½ÍÍ=É¥¥¸€ôôô€‰ÕÍ”µÉ•‘•¹Ñ¥…±Ìˆ€˜˜Ñ¡¥Ì¹™¥±•1½…‘•È¹Í•Ñ]¥Ñ¡É•‘•¹Ñ¥…±Ì „À¤ì(€ô(€Í•ÑáÑ•¹Í¥½¹Ì¡”¤ì(€€€Ñ¡¥Ì¹•áÑ•¹Í¥½¹Ì€ô”ì(€ô(€Í•ÑA±Õ¥¹Ì¡”¤ì(€€€Ñ¡¥Ì¹Á±Õ¥¹Ì€ô”ì(€ô(€Á…ÉÍ”¡”°Ğ¤ì(€€€½¹ÍĞ¤€ôÑ¡¥Ì°¸€ôÑ¡¥Ì¹©Í½¸°È€ôÑ¡¥Ì¹•áÑ•¹Í¥½¹Ìì(€€€Ñ¡¥Ì¹…¡”¹É•µ½Ù•±° ¤°Ñ¡¥Ì¹¹½‘•…¡”€ôíô°Ñ¡¥Ì¹}¥¹Ù½­•±°¡™Õ¹Ñ¥½¸¡Ì¤ì(€€€€€É•ÑÕÉ¸Ì¹}µ…É­•™Ì€˜˜Ì¹}µ…É­•™Ì ¤ì(€€€ô¤°AÉ½µ¥Í”¹…±°¡Ñ¡¥Ì¹}¥¹Ù½­•±°¡™Õ¹Ñ¥½¸¡Ì¤ì(€€€€€É•ÑÕÉ¸Ì¹‰•™½É•I½½Ğ€˜˜Ì¹‰•™½É•I½½Ğ ¤ì(€€€ô¤¤¹Ñ¡•¸¡™Õ¹Ñ¥½¸ ¤ì(€€€€€É•ÑÕÉ¸AÉ½µ¥Í”¹…±°¡l(€€€€€€€¤¹•Ñ•Á•¹‘•¹¥•Ì ‰Í•¹”ˆ¤°(€€€€€€€¤¹•Ñ•Á•¹‘•¹¥•Ì ‰…¹¥µ…Ñ¥½¸ˆ¤°(€€€€€€€¤¹•Ñ•Á•¹‘•¹¥•Ì ‰…µ•É„ˆ¤(€€€€€t¤ì(€€€ô¤¹Ñ¡•¸¡™Õ¹Ñ¥½¸¡Ì¤ì(€€€€€½¹ÍĞ„€ôì(€€€€€€€Í•¹”èÍlÁum¸¹Í•¹”ñğ€Át°(€€€€€€€Í•¹•ÌèÍlÁt°(€€€€€€€…¹¥µ…Ñ¥½¹ÌèÍlÅt°(€€€€€€€…µ•É…ÌèÍlÉt°(€€€€€€€…ÍÍ•Ğè¸¹…ÍÍ•Ğ°(€€€€€€€Á…ÉÍ•Èè¤°(€€€€€€€ÕÍ•É…Ñ„èíô(€€€€€ôì(€€€€€É•ÑÕÉ¸¤¡È°„°¸¤°Í¤¡„°¸¤°AÉ½µ¥Í”¹…±°¡¤¹}¥¹Ù½­•±°¡™Õ¹Ñ¥½¸¡¼¤ì(€€€€€€€É•ÑÕÉ¸¼¹…™Ñ•ÉI½½Ğ€˜˜¼¹…™Ñ•ÉI½½Ğ¡„¤ì(€€€€€ô¤¤¹Ñ¡•¸¡™Õ¹Ñ¥½¸ ¤ì(€€€€€€€™½È€¡½¹ÍĞ¼½˜„¹Í•¹•Ì¤¼¹ÕÁ‘…Ñ•5…ÑÉ¥á]½É± ¤ì(€€€€€€€”¡„¤ì(€€€€€ô¤ì(€€€ô¤¹…Ñ ¡Ğ¤ì(€ô(€}µ…É­•™Ì ¤ì(€€€½¹ÍĞ”€ôÑ¡¥Ì¹©Í½¸¹¹½‘•Ìñğmt°Ğ€ôÑ¡¥Ì¹©Í½¸¹Í­¥¹Ìñğmt°¤€ôÑ¡¥Ì¹©Í½¸¹µ•Í¡•Ìñğmtì(€€€™½È€¡±•Ğ¸€ô€À°È€ôĞ¹±•¹Ñ ì¸€ğÈì¸¬¬¤ì(€€€€€½¹ÍĞÌ€ôÑm¹t¹©½¥¹ÑÌì(€€€€€™½È€¡±•Ğ„€ô€À°¼€ôÌ¹±•¹Ñ ì„€ğ¼ì„¬¬¤•mÍm…ut¹¥Í	½¹”€ô€„Àì(€€€ô(€€€™½È€¡±•Ğ¸€ô€À°È€ô”¹±•¹Ñ ì¸€ğÈì¸¬¬¤ì(€€€€€½¹ÍĞÌ€ô•m¹tì(€€€€€Ì¹µ•Í €„ôôÙ½¥€À€˜˜€¡Ñ¡¥Ì¹}…‘‘9½‘•I•˜¡Ñ¡¥Ì¹µ•Í¡…¡”°Ì¹µ•Í ¤°Ì¹Í­¥¸€„ôôÙ½¥€À€˜˜€¡¥mÌ¹µ•Í¡t¹¥ÍM­¥¹¹•‘5•Í €ô€„À¤¤°Ì¹…µ•É„€„ôôÙ½¥€À€˜˜Ñ¡¥Ì¹}…‘‘9½‘•I•˜¡Ñ¡¥Ì¹…µ•É……¡”°Ì¹…µ•É„¤ì(€€€ô(€ô(€}…‘‘9½‘•I•˜¡”°Ğ¤ì(€€€Ğ€„ôôÙ½¥€À€˜˜€¡”¹É•™ÍmÑt€ôôôÙ½¥€À€˜˜€¡”¹É•™ÍmÑt€ô”¹ÕÍ•ÍmÑt€ô€À¤°”¹É•™ÍmÑt¬¬¤ì(€ô(€}•Ñ9½‘•I•˜¡”°Ğ°¤¤ì(€€€¥˜€¡”¹É•™ÍmÑt€ğô€Ä¤É•ÑÕÉ¸¤ì(€€€½¹ÍĞ¸€ô¤¹±½¹” ¤°È€ô€¡Ì°„¤€ôøì(€€€€€½¹ÍĞ¼€ôÑ¡¥Ì¹…ÍÍ½¥…Ñ¥½¹Ì¹•Ğ¡Ì¤ì(€€€€€¼€„ô¹Õ±°€˜˜Ñ¡¥Ì¹…ÍÍ½¥…Ñ¥½¹Ì¹Í•Ğ¡„°¼¤ì(€€€€€™½È€¡½¹ÍĞm°°t½˜Ì¹¡¥±‘É•¸¹•¹ÑÉ¥•Ì ¤¤È¡Œ°„¹¡¥±‘É•¹m±t¤ì(€€€ôì(€€€É•ÑÕÉ¸È¡¤°¸¤°¸¹¹…µ”€¬ô€‰}¥¹ÍÑ…¹•|ˆ€¬”¹ÕÍ•ÍmÑt¬¬°¸ì(€ô(€}¥¹Ù½­•=¹”¡”¤ì(€€€½¹ÍĞĞ€ô=‰©•Ğ¹Ù…±Õ•Ì¡Ñ¡¥Ì¹Á±Õ¥¹Ì¤ì(€€€Ğ¹ÁÕÍ ¡Ñ¡¥Ì¤ì(€€€™½È€¡±•Ğ¤€ô€Àì¤€ğĞ¹±•¹Ñ ì¤¬¬¤ì(€€€€€½¹ÍĞ¸€ô”¡Ñm¥t¤ì(€€€€€¥˜€¡¸¤É•ÑÕÉ¸¸ì(€€€ô(€€€É•ÑÕÉ¸¹Õ±°ì(€ô(€}¥¹Ù½­•±°¡”¤ì(€€€½¹ÍĞĞ€ô=‰©•Ğ¹Ù…±Õ•Ì¡Ñ¡¥Ì¹Á±Õ¥¹Ì¤ì(€€€Ğ¹Õ¹Í¡¥™Ğ¡Ñ¡¥Ì¤ì(€€€½¹ÍĞ¤€ômtì(€€€™½È€¡±•Ğ¸€ô€Àì¸€ğĞ¹±•¹Ñ ì¸¬¬¤ì(€€€€€½¹ÍĞÈ€ô”¡Ñm¹t¤ì(€€€€€È€˜˜¤¹ÁÕÍ ¡È¤ì(€€€ô(€€€É•ÑÕÉ¸¤ì(€ô(€•Ñ•Á•¹‘•¹ä¡”°Ğ¤ì(€€€½¹ÍĞ¤€ô”€¬€ˆèˆ€¬Ğì(€€€±•Ğ¸€ôÑ¡¥Ì¹…¡”¹•Ğ¡¤¤ì(€€€¥˜€ …¸¤ì(€€€€€Íİ¥Ñ €¡”¤ì(€€€€€€€…Í”€‰Í•¹”ˆè(€€€€€€€€€¸€ôÑ¡¥Ì¹±½…‘M•¹”¡Ğ¤ì(€€€€€€€€€‰É•…¬ì(€€€€€€€…Í”€‰¹½‘”ˆè(€€€€€€€€€¸€ôÑ¡¥Ì¹}¥¹Ù½­•=¹”¡™Õ¹Ñ¥½¸¡È¤ì(€€€€€€€€€€€É•ÑÕÉ¸È¹±½…‘9½‘”€˜˜È¹±½…‘9½‘”¡Ğ¤ì(€€€€€€€€€ô¤ì(€€€€€€€€€‰É•…¬ì(€€€€€€€…Í”€‰µ•Í ˆè(€€€€€€€€€¸€ôÑ¡¥Ì¹}¥¹Ù½­•=¹”¡™Õ¹Ñ¥½¸¡È¤ì(€€€€€€€€€€€É•ÑÕÉ¸È¹±½…‘5•Í €˜˜È¹±½…‘5•Í ¡Ğ¤ì(€€€€€€€€€ô¤ì(€€€€€€€€€‰É•…¬ì(€€€€€€€…Í”€‰…•ÍÍ½Èˆè(€€€€€€€€€¸€ôÑ¡¥Ì¹±½…‘•ÍÍ½È¡Ğ¤ì(€€€€€€€€€‰É•…¬ì(€€€€€€€…Í”€‰‰Õ™™•ÉY¥•Üˆè(€€€€€€€€€¸€ôÑ¡¥Ì¹}¥¹Ù½­•=¹”¡™Õ¹Ñ¥½¸¡È¤ì(€€€€€€€€€€€É•ÑÕÉ¸È¹±½…‘	Õ™™•ÉY¥•Ü€˜˜È¹±½…‘	Õ™™•ÉY¥•Ü¡Ğ¤ì(€€€€€€€€€ô¤ì(€€€€€€€€€‰É•…¬ì(€€€€€€€…Í”€‰‰Õ™™•Èˆè(€€€€€€€€€¸€ôÑ¡¥Ì¹±½…‘	Õ™™•È¡Ğ¤ì(€€€€€€€€€‰É•…¬ì(€€€€€€€…Í”€‰µ…Ñ•É¥…°ˆè(€€€€€€€€€¸€ôÑ¡¥Ì¹}¥¹Ù½­•=¹”¡™Õ¹Ñ¥½¸¡È¤ì(€€€€€€€€€€€É•ÑÕÉ¸È¹±½…‘5…Ñ•É¥…°€˜˜È¹±½…‘5…Ñ•É¥…°¡Ğ¤ì(€€€€€€€€€ô¤ì(€€€€€€€€€‰É•…¬ì(€€€€€€€…Í”€‰Ñ•áÑÕÉ”ˆè(€€€€€€€€€¸€ôÑ¡¥Ì¹}¥¹Ù½­•=¹”¡™Õ¹Ñ¥½¸¡È¤ì(€€€€€€€€€€€É•ÑÕÉ¸È¹±½…‘Q•áÑÕÉ”€˜˜È¹±½…‘Q•áÑÕÉ”¡Ğ¤ì(€€€€€€€€€ô¤ì(€€€€€€€€€‰É•…¬ì(€€€€€€€…Í”€‰Í­¥¸ˆè(€€€€€€€€€¸€ôÑ¡¥Ì¹±½…‘M­¥¸¡Ğ¤ì(€€€€€€€€€‰É•…¬ì(€€€€€€€…Í”€‰…¹¥µ…Ñ¥½¸ˆè(€€€€€€€€€¸€ôÑ¡¥Ì¹}¥¹Ù½­•=¹”¡™Õ¹Ñ¥½¸¡È¤ì(€€€€€€€€€€€É•ÑÕÉ¸È¹±½…‘¹¥µ…Ñ¥½¸€˜˜È¹±½…‘¹¥µ…Ñ¥½¸¡Ğ¤ì(€€€€€€€€€ô¤ì(€€€€€€€€€‰É•…¬ì(€€€€€€€…Í”€‰…µ•É„ˆè(€€€€€€€€€¸€ôÑ¡¥Ì¹±½…‘…µ•É„¡Ğ¤ì(€€€€€€€€€‰É•…¬ì(€€€€€€€‘•™…Õ±Ğè(€€€€€€€€€¥˜€¡¸€ôÑ¡¥Ì¹}¥¹Ù½­•=¹”¡™Õ¹Ñ¥½¸¡È¤ì(€€€€€€€€€€€É•ÑÕÉ¸È€„ôÑ¡¥Ì€˜˜È¹•Ñ•Á•¹‘•¹ä€˜˜È¹•Ñ•Á•¹‘•¹ä¡”°Ğ¤ì(€€€€€€€€€ô¤°€…¸¤Ñ¡É½Ü¹•ÜÉÉ½È ‰U¹­¹½İ¸ÑåÁ”è€ˆ€¬”¤ì(€€€€€€€€€‰É•…¬ì(€€€€€ô(€€€€€Ñ¡¥Ì¹…¡”¹…‘¡¤°¸¤ì(€€€ô(€€€É•ÑÕÉ¸¸ì(€ô(€•Ñ•Á•¹‘•¹¥•Ì¡”¤ì(€€€±•ĞĞ€ôÑ¡¥Ì¹…¡”¹•Ğ¡”¤ì(€€€¥˜€ …Ğ¤ì(€€€€€½¹ÍĞ¤€ôÑ¡¥Ì°¸€ôÑ¡¥Ì¹©Í½¹m”€¬€¡”€ôôô€‰µ•Í ˆ€ü€‰•Ìˆ€è€‰Ìˆ¥tñğmtì(€€€€€Ğ€ôAÉ½µ¥Í”¹…±°¡¸¹µ…À¡™Õ¹Ñ¥½¸¡È°Ì¤ì(€€€€€€€É•ÑÕÉ¸¤¹•Ñ•Á•¹‘•¹ä¡”°Ì¤ì(€€€€€ô¤¤°Ñ¡¥Ì¹…¡”¹…‘¡”°Ğ¤ì(€€€ô(€€€É•ÑÕÉ¸Ğì(€ô(€±½…‘	Õ™™•È¡”¤ì(€€€½¹ÍĞĞ€ôÑ¡¥Ì¹©Í½¸¹‰Õ™™•ÉÍm•t°¤€ôÑ¡¥Ì¹™¥±•1½…‘•Èì(€€€¥˜€¡Ğ¹ÑåÁ”€˜˜Ğ¹ÑåÁ”€„ôô€‰…ÉÉ…å‰Õ™™•Èˆ¤Ñ¡É½Ü¹•ÜÉÉ½È ‰Q!I¹1Q1½…‘•Èè€ˆ€¬Ğ¹ÑåÁ”€¬€ˆ‰Õ™™•ÈÑåÁ”¥Ì¹½ĞÍÕÁÁ½ÉÑ•¸ˆ¤ì(€€€¥˜€¡Ğ¹ÕÉ¤€ôôôÙ½¥€À€˜˜”€ôôô€À¤É•ÑÕÉ¸AÉ½µ¥Í”¹É•Í½±Ù”¡Ñ¡¥Ì¹•áÑ•¹Í¥½¹Ímé”¹-!I}	%9Ie}1Qt¹‰½‘ä¤ì(€€€½¹ÍĞ¸€ôÑ¡¥Ì¹½ÁÑ¥½¹Ìì(€€€É•ÑÕÉ¸¹•ÜAÉ½µ¥Í”¡™Õ¹Ñ¥½¸¡È°Ì¤ì(€€€€€¤¹±½…¡-¸¹É•Í½±Ù•UI0¡Ğ¹ÕÉ¤°¸¹Á…Ñ ¤°È°Ù½¥€À°™Õ¹Ñ¥½¸ ¤ì(€€€€€€€Ì ¼¨}}AUI}|€¨¼¹•ÜÉÉ½È Q!I¹1Q1½…‘•Èè…¥±•Ñ¼±½…‰Õ™™•È€ˆœ€¬Ğ¹ÕÉ¤€¬€œˆ¸œ¤¤ì(€€€€€ô¤ì(€€€ô¤ì(€ô(€±½…‘	Õ™™•ÉY¥•Ü¡”¤ì(€€€½¹ÍĞĞ€ôÑ¡¥Ì¹©Í½¸¹‰Õ™™•ÉY¥•İÍm•tì(€€€É•ÑÕÉ¸Ñ¡¥Ì¹•Ñ•Á•¹‘•¹ä ‰‰Õ™™•Èˆ°Ğ¹‰Õ™™•È¤¹Ñ¡•¸¡™Õ¹Ñ¥½¸¡¤¤ì(€€€€€½¹ÍĞ¸€ôĞ¹‰åÑ•1•¹Ñ ñğ€À°È€ôĞ¹‰åÑ•=™™Í•Ğñğ€Àì(€€€€€É•ÑÕÉ¸¤¹Í±¥”¡È°È€¬¸¤ì(€€€ô¤ì(€ô(€±½…‘•ÍÍ½È¡”¤ì(€€€½¹ÍĞĞ€ôÑ¡¥Ì°¤€ôÑ¡¥Ì¹©Í½¸°¸€ôÑ¡¥Ì¹©Í½¸¹…•ÍÍ½ÉÍm•tì(€€€¥˜€¡¸¹‰Õ™™•ÉY¥•Ü€ôôôÙ½¥€À€˜˜¸¹ÍÁ…ÉÍ”€ôôôÙ½¥€À¤ì(€€€€€½¹ÍĞÌ€ô9Ím¸¹ÑåÁ•t°„€ô}¹m¸¹½µÁ½¹•¹ÑQåÁ•t°¼€ô¸¹¹½Éµ…±¥é•€ôôô€„À°°€ô¹•Ü„¡¸¹½Õ¹Ğ€¨Ì¤ì(€€€€€É•ÑÕÉ¸AÉ½µ¥Í”¹É•Í½±Ù”¡¹•ÜAĞ¡°°Ì°¼¤¤ì(€€€ô(€€€½¹ÍĞÈ€ômtì(€€€É•ÑÕÉ¸¸¹‰Õ™™•ÉY¥•Ü€„ôôÙ½¥€À€üÈ¹ÁÕÍ ¡Ñ¡¥Ì¹•Ñ•Á•¹‘•¹ä ‰‰Õ™™•ÉY¥•Üˆ°¸¹‰Õ™™•ÉY¥•Ü¤¤€èÈ¹ÁÕÍ ¡¹Õ±°¤°¸¹ÍÁ…ÉÍ”€„ôôÙ½¥€À€˜˜€¡È¹ÁÕÍ ¡Ñ¡¥Ì¹•Ñ•Á•¹‘•¹ä ‰‰Õ™™•ÉY¥•Üˆ°¸¹ÍÁ…ÉÍ”¹¥¹‘¥•Ì¹‰Õ™™•ÉY¥•Ü¤¤°È¹ÁÕÍ ¡Ñ¡¥Ì¹•Ñ•Á•¹‘•¹ä ‰‰Õ™™•ÉY¥•Üˆ°¸¹ÍÁ…ÉÍ”¹Ù…±Õ•Ì¹‰Õ™™•ÉY¥•Ü¤¤¤°AÉ½µ¥Í”¹…±°¡È¤¹Ñ¡•¸¡™Õ¹Ñ¥½¸¡Ì¤ì(€€€€€½¹ÍĞ„€ôÍlÁt°¼€ô9Ím¸¹ÑåÁ•t°°€ô}¹m¸¹½µÁ½¹•¹ÑQåÁ•t°Œ€ô°¹	eQM}AI}159P° €ôŒ€¨¼°€ô¸¹‰åÑ•=™™Í•Ğñğ€À°Ô€ô¸¹‰Õ™™•ÉY¥•Ü€„ôôÙ½¥€À€ü¤¹‰Õ™™•ÉY¥•İÍm¸¹‰Õ™™•ÉY¥•İt¹‰åÑ•MÑÉ¥‘”€èÙ½¥€À°À€ô¸¹¹½Éµ…±¥é•€ôôô€„Àì(€€€€€±•ĞØ°ˆì(€€€€€¥˜€¡Ô€˜˜Ô€„ôô ¤ì(€€€€€€€½¹ÍĞ´€ô5…Ñ ¹™±½½È¡€¼Ô¤°˜€ô€‰%¹Ñ•É±•…Ù•‘	Õ™™•Èèˆ€¬¸¹‰Õ™™•ÉY¥•Ü€¬€ˆèˆ€¬¸¹½µÁ½¹•¹ÑQåÁ”€¬€ˆèˆ€¬´€¬€ˆèˆ€¬¸¹½Õ¹Ğì(€€€€€€€±•ĞP€ôĞ¹…¡”¹•Ğ¡˜¤ì(€€€€€€€Pñğ€¡Ø€ô¹•Ü°¡„°´€¨Ô°¸¹½Õ¹Ğ€¨Ô€¼Œ¤°P€ô¹•Ü‘ ¡Ø°Ô€¼Œ¤°Ğ¹…¡”¹…‘¡˜°P¤¤°ˆ€ô¹•Ü™ ¡P°¼°€”Ô€¼Œ°À¤ì(€€€€€ô•±Í”(€€€€€€€„€ôôô¹Õ±°€üØ€ô¹•Ü°¡¸¹½Õ¹Ğ€¨¼¤€èØ€ô¹•Ü°¡„°°¸¹½Õ¹Ğ€¨¼¤°ˆ€ô¹•ÜAĞ¡Ø°¼°À¤ì(€€€€€¥˜€¡¸¹ÍÁ…ÉÍ”€„ôôÙ½¥€À¤ì(€€€€€€€½¹ÍĞ´€ô9Ì¹M1H°˜€ô}¹m¸¹ÍÁ…ÉÍ”¹¥¹‘¥•Ì¹½µÁ½¹•¹ÑQåÁ•t°P€ô¸¹ÍÁ…ÉÍ”¹¥¹‘¥•Ì¹‰åÑ•=™™Í•Ğñğ€À°€ô¸¹ÍÁ…ÉÍ”¹Ù…±Õ•Ì¹‰åÑ•=™™Í•Ğñğ€À°4€ô¹•Ü˜¡ÍlÅt°P°¸¹ÍÁ…ÉÍ”¹½Õ¹Ğ€¨´¤°€ô¹•Ü°¡ÍlÉt°°¸¹ÍÁ…ÉÍ”¹½Õ¹Ğ€¨¼¤ì(€€€€€€€„€„ôô¹Õ±°€˜˜€¡ˆ€ô¹•ÜAĞ¡ˆ¹…ÉÉ…ä¹Í±¥” ¤°ˆ¹¥Ñ•µM¥é”°ˆ¹¹½Éµ…±¥é•¤¤°ˆ¹¹½Éµ…±¥é•€ô€„Äì(€€€€€€€™½È€¡±•ĞH€ô€À°€ô4¹±•¹Ñ ìH€ğìH¬¬¤ì(€€€€€€€€€½¹ÍĞœ€ô5mItì(€€€€€€€€€¥˜€¡ˆ¹Í•Ñ`¡œ°mH€¨½t¤°¼€øô€È€˜˜ˆ¹Í•Ñd¡œ°mH€¨¼€¬€Åt¤°¼€øô€Ì€˜˜ˆ¹Í•Ñh¡œ°mH€¨¼€¬€Ét¤°¼€øô€Ğ€˜˜ˆ¹Í•Ñ\¡œ°mH€¨¼€¬€Ít¤°¼€øô€Ô¤Ñ¡É½Ü¹•ÜÉÉ½È ‰Q!I¹1Q1½…‘•ÈèU¹ÍÕÁÁ½ÉÑ•¥Ñ•µM¥é”¥¸ÍÁ…ÉÍ”	Õ™™•ÉÑÑÉ¥‰ÕÑ”¸ˆ¤ì(€€€€€€€ô(€€€€€€€ˆ¹¹½Éµ…±¥é•€ôÀì(€€€€€ô(€€€€€É•ÑÕÉ¸ˆì(€€€ô¤ì(€ô(€±½…‘Q•áÑÕÉ”¡”¤ì(€€€½¹ÍĞĞ€ôÑ¡¥Ì¹©Í½¸°¤€ôÑ¡¥Ì¹½ÁÑ¥½¹Ì°¸€ôĞ¹Ñ•áÑÕÉ•Ím•t¹Í½ÕÉ”°È€ôĞ¹¥µ…•Ím¹tì(€€€±•ĞÌ€ôÑ¡¥Ì¹Ñ•áÑÕÉ•1½…‘•Èì(€€€¥˜€¡È¹ÕÉ¤¤ì(€€€€€½¹ÍĞ„€ô¤¹µ…¹…•È¹•Ñ!…¹‘±•È¡È¹ÕÉ¤¤ì(€€€€€„€„ôô¹Õ±°€˜˜€¡Ì€ô„¤ì(€€€ô(€€€É•ÑÕÉ¸Ñ¡¥Ì¹±½…‘Q•áÑÕÉ•%µ…”¡”°¸°Ì¤ì(€ô(€±½…‘Q•áÑÕÉ•%µ…”¡”°Ğ°¤¤ì(€€€½¹ÍĞ¸€ôÑ¡¥Ì°È€ôÑ¡¥Ì¹©Í½¸°Ì€ôÈ¹Ñ•áÑÕÉ•Ím•t°„€ôÈ¹¥µ…•ÍmÑt°¼€ô€¡„¹ÕÉ¤ñğ„¹‰Õ™™•ÉY¥•Ü¤€¬€ˆèˆ€¬Ì¹Í…µÁ±•Èì(€€€¥˜€¡Ñ¡¥Ì¹Ñ•áÑÕÉ•…¡•m½t¤É•ÑÕÉ¸Ñ¡¥Ì¹Ñ•áÑÕÉ•…¡•m½tì(€€€½¹ÍĞ°€ôÑ¡¥Ì¹±½…‘%µ…•M½ÕÉ”¡Ğ°¤¤¹Ñ¡•¸¡™Õ¹Ñ¥½¸¡Œ¤ì(€€€€€Œ¹™±¥Ád€ô€„Ä°Œ¹¹…µ”€ôÌ¹¹…µ”ñğ„¹¹…µ”ñğ€ˆˆ°Œ¹¹…µ”€ôôô€ˆˆ€˜˜ÑåÁ•½˜„¹ÕÉ¤€ôô€‰ÍÑÉ¥¹œˆ€˜˜„¹ÕÉ¤¹ÍÑ…ÉÑÍ]¥Ñ  ‰‘…Ñ„é¥µ…”¼ˆ¤€ôôô€„Ä€˜˜€¡Œ¹¹…µ”€ô„¹ÕÉ¤¤ì(€€€€€½¹ÍĞ €ô€¡È¹Í…µÁ±•ÉÌñğíô¥mÌ¹Í…µÁ±•Étñğíôì(€€€€€É•ÑÕÉ¸Œ¹µ…¥±Ñ•È€ôQ½m ¹µ…¥±Ñ•Étñğ€ÄÀÀØ°Œ¹µ¥¹¥±Ñ•È€ôQ½m ¹µ¥¹¥±Ñ•Étñğ€ÄÀÀà°Œ¹İÉ…ÁL€ô½m ¹İÉ…ÁMtñğ€Å”Ì°Œ¹İÉ…ÁP€ô½m ¹İÉ…ÁQtñğ€Å”Ì°Œ¹•¹•É…Ñ•5¥Áµ…ÁÌ€ô€…Œ¹¥Í½µÁÉ•ÍÍ•‘Q•áÑÕÉ”€˜˜Œ¹µ¥¹¥±Ñ•È€„ôô€ÄÀÀÌ€˜˜Œ¹µ¥¹¥±Ñ•È€„ôô€ÄÀÀØ°¸¹…ÍÍ½¥…Ñ¥½¹Ì¹Í•Ğ¡Œ°ìÑ•áÑÕÉ•Ìè”ô¤°Œì(€€€ô¤¹…Ñ ¡™Õ¹Ñ¥½¸ ¤ì(€€€€€É•ÑÕÉ¸¹Õ±°ì(€€€ô¤ì(€€€É•ÑÕÉ¸Ñ¡¥Ì¹Ñ•áÑÕÉ•…¡•m½t€ô°°°ì(€ô(€±½…‘%µ…•M½ÕÉ”¡”°Ğ¤ì(€€€½¹ÍĞ¤€ôÑ¡¥Ì°¸€ôÑ¡¥Ì¹©Í½¸°È€ôÑ¡¥Ì¹½ÁÑ¥½¹Ìì(€€€¥˜€¡Ñ¡¥Ì¹Í½ÕÉ•…¡•m•t€„ôôÙ½¥€À¤É•ÑÕÉ¸Ñ¡¥Ì¹Í½ÕÉ•…¡•m•t¹Ñ¡•¸ ¡ ¤€ôø ¹±½¹” ¤¤ì(€€€½¹ÍĞÌ€ô¸¹¥µ…•Ím•t°„€ôÍ•±˜¹UI0ñğÍ•±˜¹İ•‰­¥ÑUI0ì(€€€±•Ğ¼€ôÌ¹ÕÉ¤ñğ€ˆˆ°°€ô€„Äì(€€€¥˜€¡Ì¹‰Õ™™•ÉY¥•Ü€„ôôÙ½¥€À¤¼€ô¤¹•Ñ•Á•¹‘•¹ä ‰‰Õ™™•ÉY¥•Üˆ°Ì¹‰Õ™™•ÉY¥•Ü¤¹Ñ¡•¸¡™Õ¹Ñ¥½¸¡ ¤ì(€€€€€°€ô€„Àì(€€€€€½¹ÍĞ€ô¹•Ü	±½ˆ¡m¡t°ìÑåÁ”èÌ¹µ¥µ•QåÁ”ô¤ì(€€€€€É•ÑÕÉ¸¼€ô„¹É•…Ñ•=‰©•ÑUI0¡¤°¼ì(€€€ô¤ì(€€€•±Í”¥˜€¡Ì¹ÕÉ¤€ôôôÙ½¥€À¤Ñ¡É½Ü¹•ÜÉÉ½È ‰Q!I¹1Q1½…‘•Èè%µ…”€ˆ€¬”€¬€ˆ¥Ìµ¥ÍÍ¥¹œUI$…¹‰Õ™™•ÉY¥•Üˆ¤ì(€€€½¹ÍĞŒ€ôAÉ½µ¥Í”¹É•Í½±Ù”¡¼¤¹Ñ¡•¸¡™Õ¹Ñ¥½¸¡ ¤ì(€€€€€É•ÑÕÉ¸¹•ÜAÉ½µ¥Í”¡™Õ¹Ñ¥½¸¡°Ô¤ì(€€€€€€€±•ĞÀ€ôì(€€€€€€€Ğ¹¥Í%µ…•	¥Ñµ…Á1½…‘•È€ôôô€„À€˜˜€¡À€ô™Õ¹Ñ¥½¸¡Ø¤ì(€€€€€€€€€½¹ÍĞˆ€ô¹•ÜUĞ¡Ø¤ì(€€€€€€€€€ˆ¹¹••‘ÍUÁ‘…Ñ”€ô€„À°¡ˆ¤ì(€€€€€€€ô¤°Ğ¹±½…¡-¸¹É•Í½±Ù•UI0¡ °È¹Á…Ñ ¤°À°Ù½¥€À°Ô¤ì(€€€€€ô¤ì(€€€ô¤¹Ñ¡•¸¡™Õ¹Ñ¥½¸¡ ¤ì(€€€€€É•ÑÕÉ¸°€ôôô€„À€˜˜„¹É•Ù½­•=‰©•ÑUI0¡¼¤°Í¤¡ °Ì¤° ¹ÕÍ•É…Ñ„¹µ¥µ•QåÁ”€ôÌ¹µ¥µ•QåÁ”ñğÕÀ¡Ì¹ÕÉ¤¤° ì(€€€ô¤¹…Ñ ¡™Õ¹Ñ¥½¸¡ ¤ì(€€€€€Ñ¡É½Ü½¹Í½±”¹•ÉÉ½È ‰Q!I¹1Q1½…‘•Èè½Õ±‘¸Ğ±½…Ñ•áÑÕÉ”ˆ°¼¤° ì(€€€ô¤ì(€€€É•ÑÕÉ¸Ñ¡¥Ì¹Í½ÕÉ•…¡•m•t€ôŒ°Œì(€ô(€…ÍÍ¥¹Q•áÑÕÉ”¡”°Ğ°¤°¸¤ì(€€€½¹ÍĞÈ€ôÑ¡¥Ìì(€€€É•ÑÕÉ¸Ñ¡¥Ì¹•Ñ•Á•¹‘•¹ä ‰Ñ•áÑÕÉ”ˆ°¤¹¥¹‘•à¤¹Ñ¡•¸¡™Õ¹Ñ¥½¸¡Ì¤ì(€€€€€¥˜€ …Ì¤É•ÑÕÉ¸¹Õ±°ì(€€€€€¥˜€¡¤¹Ñ•á½½É€„ôôÙ½¥€À€˜˜¤¹Ñ•á½½É€ø€À€˜˜€¡Ì€ôÌ¹±½¹” ¤°Ì¹¡…¹¹•°€ô¤¹Ñ•á½½É¤°È¹•áÑ•¹Í¥½¹Ímé”¹-!I}QaQUI}QI9M=I5t¤ì(€€€€€€€½¹ÍĞ„€ô¤¹•áÑ•¹Í¥½¹Ì€„ôôÙ½¥€À€ü¤¹•áÑ•¹Í¥½¹Ímé”¹-!I}QaQUI}QI9M=I5t€èÙ½¥€Àì(€€€€€€€¥˜€¡„¤ì(€€€€€€€€€½¹ÍĞ¼€ôÈ¹…ÍÍ½¥…Ñ¥½¹Ì¹•Ğ¡Ì¤ì(€€€€€€€€€Ì€ôÈ¹•áÑ•¹Í¥½¹Ímé”¹-!I}QaQUI}QI9M=I5t¹•áÑ•¹‘Q•áÑÕÉ”¡Ì°„¤°È¹…ÍÍ½¥…Ñ¥½¹Ì¹Í•Ğ¡Ì°¼¤ì(€€€€€€€ô(€€€€€ô(€€€€€É•ÑÕÉ¸¸€„ôôÙ½¥€À€˜˜€¡Ì¹½±½ÉMÁ…”€ô¸¤°•mÑt€ôÌ°Ìì(€€€ô¤ì(€ô(€…ÍÍ¥¹¥¹…±5…Ñ•É¥…°¡”¤ì(€€€½¹ÍĞĞ€ô”¹•½µ•ÑÉäì(€€€±•Ğ¤€ô”¹µ…Ñ•É¥…°ì(€€€½¹ÍĞ¸€ôĞ¹…ÑÑÉ¥‰ÕÑ•Ì¹Ñ…¹•¹Ğ€ôôôÙ½¥€À°È€ôĞ¹…ÑÑÉ¥‰ÕÑ•Ì¹½±½È€„ôôÙ½¥€À°Ì€ôĞ¹…ÑÑÉ¥‰ÕÑ•Ì¹¹½Éµ…°€ôôôÙ½¥€Àì(€€€¥˜€¡”¹¥ÍA½¥¹ÑÌ¤ì(€€€€€½¹ÍĞ„€ô€‰A½¥¹ÑÍ5…Ñ•É¥…°èˆ€¬¤¹ÕÕ¥ì(€€€€€±•Ğ¼€ôÑ¡¥Ì¹…¡”¹•Ğ¡„¤ì(€€€€€¼ñğ€¡¼€ô¹•Ü…° ¤°¤¹ÁÉ½Ñ½ÑåÁ”¹½Áä¹…±°¡¼°¤¤°¼¹½±½È¹½Áä¡¤¹½±½È¤°¼¹µ…À€ô¤¹µ…À°¼¹Í¥é•ÑÑ•¹Õ…Ñ¥½¸€ô€„Ä°Ñ¡¥Ì¹…¡”¹…‘¡„°¼¤¤°¤€ô¼ì(€€€ô•±Í”¥˜€¡”¹¥Í1¥¹”¤ì(€€€€€½¹ÍĞ„€ô€‰1¥¹•	…Í¥5…Ñ•É¥…°èˆ€¬¤¹ÕÕ¥ì(€€€€€±•Ğ¼€ôÑ¡¥Ì¹…¡”¹•Ğ¡„¤ì(€€€€€¼ñğ€¡¼€ô¹•ÜÍ° ¤°¤¹ÁÉ½Ñ½ÑåÁ”¹½Áä¹…±°¡¼°¤¤°¼¹½±½È¹½Áä¡¤¹½±½È¤°¼¹µ…À€ô¤¹µ…À°Ñ¡¥Ì¹…¡”¹…‘¡„°¼¤¤°¤€ô¼ì(€€€ô(€€€¥˜€¡¸ñğÈñğÌ¤ì(€€€€€±•Ğ„€ô€‰±½¹•‘5…Ñ•É¥…°èˆ€¬¤¹ÕÕ¥€¬€ˆèˆì(€€€€€¸€˜˜€¡„€¬ô€‰‘•É¥Ù…Ñ¥Ù”µÑ…¹•¹ÑÌèˆ¤°È€˜˜€¡„€¬ô€‰Ù•ÉÑ•àµ½±½ÉÌèˆ¤°Ì€˜˜€¡„€¬ô€‰™±…ĞµÍ¡…‘¥¹œèˆ¤ì(€€€€€±•Ğ¼€ôÑ¡¥Ì¹…¡”¹•Ğ¡„¤ì(€€€€€¼ñğ€¡¼€ô¤¹±½¹” ¤°È€˜˜€¡¼¹Ù•ÉÑ•á½±½ÉÌ€ô€„À¤°Ì€˜˜€¡¼¹™±…ÑM¡…‘¥¹œ€ô€„À¤°¸€˜˜€¡¼¹¹½Éµ…±M…±”€˜˜€¡¼¹¹½Éµ…±M…±”¹ä€¨ô€´Ä¤°¼¹±•…É½…Ñ9½Éµ…±M…±”€˜˜€¡¼¹±•…É½…Ñ9½Éµ…±M…±”¹ä€¨ô€´Ä¤¤°Ñ¡¥Ì¹…¡”¹…‘¡„°¼¤°Ñ¡¥Ì¹…ÍÍ½¥…Ñ¥½¹Ì¹Í•Ğ¡¼°Ñ¡¥Ì¹…ÍÍ½¥…Ñ¥½¹Ì¹•Ğ¡¤¤¤¤°¤€ô¼ì(€€€ô(€€€”¹µ…Ñ•É¥…°€ô¤ì(€ô(€•Ñ5…Ñ•É¥…±QåÁ” ¤ì(€€€É•ÑÕÉ¸aÈì(€ô(€±½…‘5…Ñ•É¥…°¡”¤ì(€€€½¹ÍĞĞ€ôÑ¡¥Ì°¤€ôÑ¡¥Ì¹©Í½¸°¸€ôÑ¡¥Ì¹•áÑ•¹Í¥½¹Ì°È€ô¤¹µ…Ñ•É¥…±Ím•tì(€€€±•ĞÌì(€€€½¹ÍĞ„€ôíô°¼€ôÈ¹•áÑ•¹Í¥½¹Ìñğíô°°€ômtì(€€€¥˜€¡½mé”¹-!I}5QI%1M}U91%Qt¤ì(€€€€€½¹ÍĞ €ô¹mé”¹-!I}5QI%1M}U91%Qtì(€€€€€Ì€ô ¹•Ñ5…Ñ•É¥…±QåÁ” ¤°°¹ÁÕÍ ¡ ¹•áÑ•¹‘A…É…µÌ¡„°È°Ğ¤¤ì(€€€ô•±Í”ì(€€€€€½¹ÍĞ €ôÈ¹Á‰É5•Ñ…±±¥I½Õ¡¹•ÍÌñğíôì(€€€€€¥˜€¡„¹½±½È€ô¹•Ü9” Ä°€Ä°€Ä¤°„¹½Á…¥Ñä€ô€Ä°ÉÉ…ä¹¥ÍÉÉ…ä¡ ¹‰…Í•½±½É…Ñ½È¤¤ì(€€€€€€€½¹ÍĞ€ô ¹‰…Í•½±½É…Ñ½Èì(€€€€€€€„¹½±½È¹Í•ÑI¡‘lÁt°‘lÅt°‘lÉt°iĞ¤°„¹½Á…¥Ñä€ô‘lÍtì(€€€€€ô(€€€€€ ¹‰…Í•½±½ÉQ•áÑÕÉ”€„ôôÙ½¥€À€˜˜°¹ÁÕÍ ¡Ğ¹…ÍÍ¥¹Q•áÑÕÉ”¡„°€‰µ…Àˆ° ¹‰…Í•½±½ÉQ•áÑÕÉ”°áĞ¤¤°„¹µ•Ñ…±¹•ÍÌ€ô ¹µ•Ñ…±±¥…Ñ½È€„ôôÙ½¥€À€ü ¹µ•Ñ…±±¥…Ñ½È€è€Ä°„¹É½Õ¡¹•ÍÌ€ô ¹É½Õ¡¹•ÍÍ…Ñ½È€„ôôÙ½¥€À€ü ¹É½Õ¡¹•ÍÍ…Ñ½È€è€Ä° ¹µ•Ñ…±±¥I½Õ¡¹•ÍÍQ•áÑÕÉ”€„ôôÙ½¥€À€˜˜€¡°¹ÁÕÍ ¡Ğ¹…ÍÍ¥¹Q•áÑÕÉ”¡„°€‰µ•Ñ…±¹•ÍÍ5…Àˆ° ¹µ•Ñ…±±¥I½Õ¡¹•ÍÍQ•áÑÕÉ”¤¤°°¹ÁÕÍ ¡Ğ¹…ÍÍ¥¹Q•áÑÕÉ”¡„°€‰É½Õ¡¹•ÍÍ5…Àˆ° ¹µ•Ñ…±±¥I½Õ¡¹•ÍÍQ•áÑÕÉ”¤¤¤°Ì€ôÑ¡¥Ì¹}¥¹Ù½­•=¹”¡™Õ¹Ñ¥½¸¡¤ì(€€€€€€€É•ÑÕÉ¸¹•Ñ5…Ñ•É¥…±QåÁ”€˜˜¹•Ñ5…Ñ•É¥…±QåÁ”¡”¤ì(€€€€€ô¤°°¹ÁÕÍ ¡AÉ½µ¥Í”¹…±°¡Ñ¡¥Ì¹}¥¹Ù½­•±°¡™Õ¹Ñ¥½¸¡¤ì(€€€€€€€É•ÑÕÉ¸¹•áÑ•¹‘5…Ñ•É¥…±A…É…µÌ€˜˜¹•áÑ•¹‘5…Ñ•É¥…±A…É…µÌ¡”°„¤ì(€€€€€ô¤¤¤ì(€€€ô(€€€È¹‘½Õ‰±•M¥‘•€ôôô€„À€˜˜€¡„¹Í¥‘”€ô€È¤ì(€€€½¹ÍĞŒ€ôÈ¹…±Á¡…5½‘”ñğUÌ¹=AEUì(€€€¥˜€¡Œ€ôôôUÌ¹	19€ü€¡„¹ÑÉ…¹ÍÁ…É•¹Ğ€ô€„À°„¹‘•ÁÑ¡]É¥Ñ”€ô€„Ä¤€è€¡„¹ÑÉ…¹ÍÁ…É•¹Ğ€ô€„Ä°Œ€ôôôUÌ¹5M,€˜˜€¡„¹…±Á¡…Q•ÍĞ€ôÈ¹…±Á¡…ÕÑ½™˜€„ôôÙ½¥€À€üÈ¹…±Á¡…ÕÑ½™˜€è€À¸Ô¤¤°È¹¹½Éµ…±Q•áÑÕÉ”€„ôôÙ½¥€À€˜˜Ì€„ôô]¤€˜˜€¡°¹ÁÕÍ ¡Ğ¹…ÍÍ¥¹Q•áÑÕÉ”¡„°€‰¹½Éµ…±5…Àˆ°È¹¹½Éµ…±Q•áÑÕÉ”¤¤°„¹¹½Éµ…±M…±”€ô¹•Ü” Ä°€Ä¤°È¹¹½Éµ…±Q•áÑÕÉ”¹Í…±”€„ôôÙ½¥€À¤¤ì(€€€€€½¹ÍĞ €ôÈ¹¹½Éµ…±Q•áÑÕÉ”¹Í…±”ì(€€€€€„¹¹½Éµ…±M…±”¹Í•Ğ¡ ° ¤ì(€€€ô(€€€¥˜€¡È¹½±ÕÍ¥½¹Q•áÑÕÉ”€„ôôÙ½¥€À€˜˜Ì€„ôô]¤€˜˜€¡°¹ÁÕÍ ¡Ğ¹…ÍÍ¥¹Q•áÑÕÉ”¡„°€‰…½5…Àˆ°È¹½±ÕÍ¥½¹Q•áÑÕÉ”¤¤°È¹½±ÕÍ¥½¹Q•áÑÕÉ”¹ÍÑÉ•¹Ñ €„ôôÙ½¥€À€˜˜€¡„¹…½5…Á%¹Ñ•¹Í¥Ñä€ôÈ¹½±ÕÍ¥½¹Q•áÑÕÉ”¹ÍÑÉ•¹Ñ ¤¤°È¹•µ¥ÍÍ¥Ù•…Ñ½È€„ôôÙ½¥€À€˜˜Ì€„ôô]¤¤ì(€€€€€½¹ÍĞ €ôÈ¹•µ¥ÍÍ¥Ù•…Ñ½Èì(€€€€€„¹•µ¥ÍÍ¥Ù”€ô¹•Ü9” ¤¹Í•ÑI¡¡lÁt°¡lÅt°¡lÉt°iĞ¤ì(€€€ô(€€€É•ÑÕÉ¸È¹•µ¥ÍÍ¥Ù•Q•áÑÕÉ”€„ôôÙ½¥€À€˜˜Ì€„ôô]¤€˜˜°¹ÁÕÍ ¡Ğ¹…ÍÍ¥¹Q•áÑÕÉ”¡„°€‰•µ¥ÍÍ¥Ù•5…Àˆ°È¹•µ¥ÍÍ¥Ù•Q•áÑÕÉ”°áĞ¤¤°AÉ½µ¥Í”¹…±°¡°¤¹Ñ¡•¸¡™Õ¹Ñ¥½¸ ¤ì(€€€€€½¹ÍĞ €ô¹•ÜÌ¡„¤ì(€€€€€É•ÑÕÉ¸È¹¹…µ”€˜˜€¡ ¹¹…µ”€ôÈ¹¹…µ”¤°Í¤¡ °È¤°Ğ¹…ÍÍ½¥…Ñ¥½¹Ì¹Í•Ğ¡ °ìµ…Ñ•É¥…±Ìè”ô¤°È¹•áÑ•¹Í¥½¹Ì€˜˜¤¡¸° °È¤° ì(€€€ô¤ì(€ô(€É•…Ñ•U¹¥ÅÕ•9…µ”¡”¤ì(€€€½¹ÍĞĞ€ô…Ğ¹Í…¹¥Ñ¥é•9½‘•9…µ”¡”ñğ€ˆˆ¤ì(€€€É•ÑÕÉ¸Ğ¥¸Ñ¡¥Ì¹¹½‘•9…µ•ÍUÍ•€üĞ€¬€‰|ˆ€¬€¬­Ñ¡¥Ì¹¹½‘•9…µ•ÍUÍ•‘mÑt€è€¡Ñ¡¥Ì¹¹½‘•9…µ•ÍUÍ•‘mÑt€ô€À°Ğ¤ì(€ô(€±½…‘•½µ•ÑÉ¥•Ì¡”¤ì(€€€½¹ÍĞĞ€ôÑ¡¥Ì°¤€ôÑ¡¥Ì¹•áÑ•¹Í¥½¹Ì°¸€ôÑ¡¥Ì¹ÁÉ¥µ¥Ñ¥Ù•…¡”ì(€€€™Õ¹Ñ¥½¸È¡„¤ì(€€€€€É•ÑÕÉ¸¥mé”¹-!I}I=}5M!}=5AIMM%=9t¹‘•½‘•AÉ¥µ¥Ñ¥Ù”¡„°Ğ¤¹Ñ¡•¸¡™Õ¹Ñ¥½¸¡¼¤ì(€€€€€€€É•ÑÕÉ¸I¼¡¼°„°Ğ¤ì(€€€€€ô¤ì(€€€ô(€€€½¹ÍĞÌ€ômtì(€€€™½È€¡±•Ğ„€ô€À°¼€ô”¹±•¹Ñ ì„€ğ¼ì„¬¬¤ì(€€€€€½¹ÍĞ°€ô•m…t°Œ€ô¡À¡°¤° €ô¹mtì(€€€€€¥˜€¡ ¤Ì¹ÁÕÍ ¡ ¹ÁÉ½µ¥Í”¤ì(€€€€€•±Í”ì(€€€€€€€±•Ğì(€€€€€€€°¹•áÑ•¹Í¥½¹Ì€˜˜°¹•áÑ•¹Í¥½¹Ímé”¹-!I}I=}5M!}=5AIMM%=9t€ü€ôÈ¡°¤€è€ôI¼¡¹•ÜEĞ ¤°°°Ğ¤°¹mt€ôì(€€€€€€€€€ÁÉ¥µ¥Ñ¥Ù”è°°(€€€€€€€€€ÁÉ½µ¥Í”è(€€€€€€€ô°Ì¹ÁÕÍ ¡¤ì(€€€€€ô(€€€ô(€€€É•ÑÕÉ¸AÉ½µ¥Í”¹…±°¡Ì¤ì(€ô(€±½…‘5•Í ¡”¤ì(€€€½¹ÍĞĞ€ôÑ¡¥Ì°¤€ôÑ¡¥Ì¹©Í½¸°¸€ôÑ¡¥Ì¹•áÑ•¹Í¥½¹Ì°È€ô¤¹µ•Í¡•Ím•t°Ì€ôÈ¹ÁÉ¥µ¥Ñ¥Ù•Ì°„€ômtì(€€€™½È€¡±•Ğ¼€ô€À°°€ôÌ¹±•¹Ñ ì¼€ğ°ì¼¬¬¤ì(€€€€€½¹ÍĞŒ€ôÍm½t¹µ…Ñ•É¥…°€ôôôÙ½¥€À€ü½À¡Ñ¡¥Ì¹…¡”¤€èÑ¡¥Ì¹•Ñ•Á•¹‘•¹ä ‰µ…Ñ•É¥…°ˆ°Ím½t¹µ…Ñ•É¥…°¤ì(€€€€€„¹ÁÕÍ ¡Œ¤ì(€€€ô(€€€É•ÑÕÉ¸„¹ÁÕÍ ¡Ğ¹±½…‘•½µ•ÑÉ¥•Ì¡Ì¤¤°AÉ½µ¥Í”¹…±°¡„¤¹Ñ¡•¸¡™Õ¹Ñ¥½¸¡¼¤ì(€€€€€½¹ÍĞ°€ô¼¹Í±¥” À°¼¹±•¹Ñ €´€Ä¤°Œ€ô½m¼¹±•¹Ñ €´€Åt° €ômtì(€€€€€™½È€¡±•ĞÔ€ô€À°À€ôŒ¹±•¹Ñ ìÔ€ğÀìÔ¬¬¤ì(€€€€€€€½¹ÍĞØ€ômÕt°ˆ€ôÍmÕtì(€€€€€€€±•Ğ´ì(€€€€€€€½¹ÍĞ˜€ô±mÕtì(€€€€€€€¥˜€¡ˆ¹µ½‘”€ôôô]Ğ¹QI%91Lñğˆ¹µ½‘”€ôôô]Ğ¹QI%91}MQI%@ñğˆ¹µ½‘”€ôôô]Ğ¹QI%91}8ñğˆ¹µ½‘”€ôôôÙ½¥€À¤(€€€€€€€€€´€ôÈ¹¥ÍM­¥¹¹•‘5•Í €ôôô€„À€ü¹•Ü} ¡Ø°˜¤€è¹•ÜĞ¡Ø°˜¤°´¹¥ÍM­¥¹¹•‘5•Í €ôôô€„À€˜˜´¹¹½Éµ…±¥é•M­¥¹]•¥¡ÑÌ ¤°ˆ¹µ½‘”€ôôô]Ğ¹QI%91}MQI%@€ü´¹•½µ•ÑÉä€ôM¼¡´¹•½µ•ÑÉä°€Ä¤€èˆ¹µ½‘”€ôôô]Ğ¹QI%91}8€˜˜€¡´¹•½µ•ÑÉä€ôM¼¡´¹•½µ•ÑÉä°€È¤¤ì(€€€€€€€•±Í”¥˜€¡ˆ¹µ½‘”€ôôô]Ğ¹1%9L¤´€ô¹•ÜQ ¡Ø°˜¤ì(€€€€€€€•±Í”¥˜€¡ˆ¹µ½‘”€ôôô]Ğ¹1%9}MQI%@¤´€ô¹•ÜeÌ¡Ø°˜¤ì(€€€€€€€•±Í”¥˜€¡ˆ¹µ½‘”€ôôô]Ğ¹1%9}1==@¤´€ô¹•Ü ¡Ø°˜¤ì(€€€€€€€•±Í”¥˜€¡ˆ¹µ½‘”€ôôô]Ğ¹A=%9QL¤´€ô¹•ÜI ¡Ø°˜¤ì(€€€€€€€•±Í”Ñ¡É½Ü¹•ÜÉÉ½È ‰Q!I¹1Q1½…‘•ÈèAÉ¥µ¥Ñ¥Ù”µ½‘”Õ¹ÍÕÁÁ½ÉÑ•è€ˆ€¬ˆ¹µ½‘”¤ì(€€€€€€€=‰©•Ğ¹­•åÌ¡´¹•½µ•ÑÉä¹µ½ÉÁ¡ÑÑÉ¥‰ÕÑ•Ì¤¹±•¹Ñ €ø€À€˜˜À¡´°È¤°´¹¹…µ”€ôĞ¹É•…Ñ•U¹¥ÅÕ•9…µ”¡È¹¹…µ”ñğ€‰µ•Í¡|ˆ€¬”¤°Í¤¡´°È¤°ˆ¹•áÑ•¹Í¥½¹Ì€˜˜¤¡¸°´°ˆ¤°Ğ¹…ÍÍ¥¹¥¹…±5…Ñ•É¥…°¡´¤° ¹ÁÕÍ ¡´¤ì(€€€€€ô(€€€€€™½È€¡±•ĞÔ€ô€À°À€ô ¹±•¹Ñ ìÔ€ğÀìÔ¬¬¤Ğ¹…ÍÍ½¥…Ñ¥½¹Ì¹Í•Ğ¡¡mÕt°ì(€€€€€€€µ•Í¡•Ìè”°(€€€€€€€ÁÉ¥µ¥Ñ¥Ù•ÌèÔ(€€€€€ô¤ì(€€€€€¥˜€¡ ¹±•¹Ñ €ôôô€Ä¤(€€€€€€€É•ÑÕÉ¸È¹•áÑ•¹Í¥½¹Ì€˜˜¤¡¸°¡lÁt°È¤°¡lÁtì(€€€€€½¹ÍĞ€ô¹•Ü!¤ ¤ì(€€€€€È¹•áÑ•¹Í¥½¹Ì€˜˜¤¡¸°°È¤°Ğ¹…ÍÍ½¥…Ñ¥½¹Ì¹Í•Ğ¡°ìµ•Í¡•Ìè”ô¤ì(€€€€€™½È€¡±•ĞÔ€ô€À°À€ô ¹±•¹Ñ ìÔ€ğÀìÔ¬¬¤¹…‘¡¡mÕt¤ì(€€€€€É•ÑÕÉ¸ì(€€€ô¤ì(€ô(€±½…‘…µ•É„¡”¤ì(€€€±•ĞĞì(€€€½¹ÍĞ¤€ôÑ¡¥Ì¹©Í½¸¹…µ•É…Ím•t°¸€ô¥m¤¹ÑåÁ•tì(€€€¥˜€ …¸¤ì(€€€€€½¹Í½±”¹İ…É¸ ‰Q!I¹1Q1½…‘•Èè5¥ÍÍ¥¹œ…µ•É„Á…É…µ•Ñ•ÉÌ¸ˆ¤ì(€€€€€É•ÑÕÉ¸ì(€€€ô(€€€É•ÑÕÉ¸¤¹ÑåÁ”€ôôô€‰Á•ÉÍÁ•Ñ¥Ù”ˆ€üĞ€ô¹•ÜĞ¡]¼¹É…‘Q½•œ¡¸¹å™½Ø¤°¸¹…ÍÁ•ÑI…Ñ¥¼ñğ€Ä°¸¹é¹•…Èñğ€Ä°¸¹é™…Èñğ€É”Ø¤€è¤¹ÑåÁ”€ôôô€‰½ÉÑ¡½É…Á¡¥Œˆ€˜˜€¡Ğ€ô¹•Ü©È µ¸¹áµ…œ°¸¹áµ…œ°¸¹åµ…œ°€µ¸¹åµ…œ°¸¹é¹•…È°¸¹é™…È¤¤°¤¹¹…µ”€˜˜€¡Ğ¹¹…µ”€ôÑ¡¥Ì¹É•…Ñ•U¹¥ÅÕ•9…µ”¡¤¹¹…µ”¤¤°Í¤¡Ğ°¤¤°AÉ½µ¥Í”¹É•Í½±Ù”¡Ğ¤ì(€ô(€±½…‘M­¥¸¡”¤ì(€€€½¹ÍĞĞ€ôÑ¡¥Ì¹©Í½¸¹Í­¥¹Ím•t°¤€ômtì(€€€™½È€¡±•Ğ¸€ô€À°È€ôĞ¹©½¥¹ÑÌ¹±•¹Ñ ì¸€ğÈì¸¬¬¤¤¹ÁÕÍ ¡Ñ¡¥Ì¹}±½…‘9½‘•M¡…±±½Ü¡Ğ¹©½¥¹ÑÍm¹t¤¤ì(€€€É•ÑÕÉ¸Ğ¹¥¹Ù•ÉÍ•	¥¹‘5…ÑÉ¥•Ì€„ôôÙ½¥€À€ü¤¹ÁÕÍ ¡Ñ¡¥Ì¹•Ñ•Á•¹‘•¹ä ‰…•ÍÍ½Èˆ°Ğ¹¥¹Ù•ÉÍ•	¥¹‘5…ÑÉ¥•Ì¤¤€è¤¹ÁÕÍ ¡¹Õ±°¤°AÉ½µ¥Í”¹…±°¡¤¤¹Ñ¡•¸¡™Õ¹Ñ¥½¸¡¸¤ì(€€€€€½¹ÍĞÈ€ô¸¹Á½À ¤°Ì€ô¸°„€ômt°¼€ômtì(€€€€€™½È€¡±•Ğ°€ô€À°Œ€ôÌ¹±•¹Ñ ì°€ğŒì°¬¬¤ì(€€€€€€€½¹ÍĞ €ôÍm±tì(€€€€€€€¥˜€¡ ¤ì(€€€€€€€€€„¹ÁÕÍ ¡ ¤ì(€€€€€€€€€½¹ÍĞ€ô¹•Ü” ¤ì(€€€€€€€€€È€„ôô¹Õ±°€˜˜¹™É½µÉÉ…ä¡È¹…ÉÉ…ä°°€¨€ÄØ¤°¼¹ÁÕÍ ¡¤ì(€€€€€€€ô•±Í”½¹Í½±”¹İ…É¸ Q!I¹1Q1½…‘•Èè)½¥¹Ğ€ˆ•Ìˆ½Õ±¹½Ğ‰”™½Õ¹¸œ°Ğ¹©½¥¹ÑÍm±t¤ì(€€€€€ô(€€€€€É•ÑÕÉ¸¹•Ü‰ ¡„°¼¤ì(€€€ô¤ì(€ô(€±½…‘¹¥µ…Ñ¥½¸¡”¤ì(€€€½¹ÍĞĞ€ôÑ¡¥Ì¹©Í½¸°¤€ôÑ¡¥Ì°¸€ôĞ¹…¹¥µ…Ñ¥½¹Ím•t°È€ô¸¹¹…µ”€ü¸¹¹…µ”€è€‰…¹¥µ…Ñ¥½¹|ˆ€¬”°Ì€ômt°„€ômt°¼€ômt°°€ômt°Œ€ômtì(€€€™½È€¡±•Ğ €ô€À°€ô¸¹¡…¹¹•±Ì¹±•¹Ñ ì €ğì ¬¬¤ì(€€€€€½¹ÍĞÔ€ô¸¹¡…¹¹•±Ím¡t°À€ô¸¹Í…µÁ±•ÉÍmÔ¹Í…µÁ±•Ét°Ø€ôÔ¹Ñ…É•Ğ°ˆ€ôØ¹¹½‘”°´€ô¸¹Á…É…µ•Ñ•ÉÌ€„ôôÙ½¥€À€ü¸¹Á…É…µ•Ñ•ÉÍmÀ¹¥¹ÁÕÑt€èÀ¹¥¹ÁÕĞ°˜€ô¸¹Á…É…µ•Ñ•ÉÌ€„ôôÙ½¥€À€ü¸¹Á…É…µ•Ñ•ÉÍmÀ¹½ÕÑÁÕÑt€èÀ¹½ÕÑÁÕĞì(€€€€€Ø¹¹½‘”€„ôôÙ½¥€À€˜˜€¡Ì¹ÁÕÍ ¡Ñ¡¥Ì¹•Ñ•Á•¹‘•¹ä ‰¹½‘”ˆ°ˆ¤¤°„¹ÁÕÍ ¡Ñ¡¥Ì¹•Ñ•Á•¹‘•¹ä ‰…•ÍÍ½Èˆ°´¤¤°¼¹ÁÕÍ ¡Ñ¡¥Ì¹•Ñ•Á•¹‘•¹ä ‰…•ÍÍ½Èˆ°˜¤¤°°¹ÁÕÍ ¡À¤°Œ¹ÁÕÍ ¡Ø¤¤ì(€€€ô(€€€É•ÑÕÉ¸AÉ½µ¥Í”¹…±°¡l(€€€€€AÉ½µ¥Í”¹…±°¡Ì¤°(€€€€€AÉ½µ¥Í”¹…±°¡„¤°(€€€€€AÉ½µ¥Í”¹…±°¡¼¤°(€€€€€AÉ½µ¥Í”¹…±°¡°¤°(€€€€€AÉ½µ¥Í”¹…±°¡Œ¤(€€€t¤¹Ñ¡•¸¡™Õ¹Ñ¥½¸¡ ¤ì(€€€€€½¹ÍĞ€ô¡lÁt°Ô€ô¡lÅt°À€ô¡lÉt°Ø€ô¡lÍt°ˆ€ô¡lÑt°´€ômtì(€€€€€™½È€¡±•ĞP€ô€À°€ô¹±•¹Ñ ìP€ğìP¬¬¤ì(€€€€€€€½¹ÍĞ4€ô‘mQt°€ôÕmQt°H€ôÁmQt°€ôÙmQt°œ€ô‰mQtì(€€€€€€€¥˜€¡4€ôôôÙ½¥€À¤½¹Ñ¥¹Õ”ì(€€€€€€€4¹ÕÁ‘…Ñ•5…ÑÉ¥à€˜˜4¹ÕÁ‘…Ñ•5…ÑÉ¥à ¤ì(€€€€€€€½¹ÍĞä€ô¤¹}É•…Ñ•¹¥µ…Ñ¥½¹QÉ…­Ì¡4°°H°°œ¤ì(€€€€€€€¥˜€¡ä¤™½È€¡±•Ğ€ô€Àì€ğä¹±•¹Ñ ì¬¬¤´¹ÁÕÍ ¡åm	t¤ì(€€€€€ô(€€€€€½¹ÍĞ˜€ô¹•Ü] ¡È°Ù½¥€À°´¤ì(€€€€€É•ÑÕÉ¸Í¤¡˜°¸¤°˜ì(€€€ô¤ì(€ô(€É•…Ñ•9½‘•5•Í ¡”¤ì(€€€½¹ÍĞĞ€ôÑ¡¥Ì¹©Í½¸°¤€ôÑ¡¥Ì°¸€ôĞ¹¹½‘•Ím•tì(€€€É•ÑÕÉ¸¸¹µ•Í €ôôôÙ½¥€À€ü¹Õ±°€è¤¹•Ñ•Á•¹‘•¹ä ‰µ•Í ˆ°¸¹µ•Í ¤¹Ñ¡•¸¡™Õ¹Ñ¥½¸¡È¤ì(€€€€€½¹ÍĞÌ€ô¤¹}•Ñ9½‘•I•˜¡¤¹µ•Í¡…¡”°¸¹µ•Í °È¤ì(€€€€€É•ÑÕÉ¸¸¹İ•¥¡ÑÌ€„ôôÙ½¥€À€˜˜Ì¹ÑÉ…Ù•ÉÍ”¡™Õ¹Ñ¥½¸¡„¤ì(€€€€€€€¥˜€¡„¹¥Í5•Í ¤(€€€€€€€€€™½È€¡±•Ğ¼€ô€À°°€ô¸¹İ•¥¡ÑÌ¹±•¹Ñ ì¼€ğ°ì¼¬¬¤„¹µ½ÉÁ¡Q…É•Ñ%¹™±Õ•¹•Ím½t€ô¸¹İ•¥¡ÑÍm½tì(€€€€€ô¤°Ìì(€€€ô¤ì(€ô(€±½…‘9½‘”¡”¤ì(€€€½¹ÍĞĞ€ôÑ¡¥Ì¹©Í½¸°¤€ôÑ¡¥Ì°¸€ôĞ¹¹½‘•Ím•t°È€ô¤¹}±½…‘9½‘•M¡…±±½Ü¡”¤°Ì€ômt°„€ô¸¹¡¥±‘É•¸ñğmtì(€€€™½È€¡±•Ğ°€ô€À°Œ€ô„¹±•¹Ñ ì°€ğŒì°¬¬¤Ì¹ÁÕÍ ¡¤¹•Ñ•Á•¹‘•¹ä ‰¹½‘”ˆ°…m±t¤¤ì(€€€½¹ÍĞ¼€ô¸¹Í­¥¸€ôôôÙ½¥€À€üAÉ½µ¥Í”¹É•Í½±Ù”¡¹Õ±°¤€è¤¹•Ñ•Á•¹‘•¹ä ‰Í­¥¸ˆ°¸¹Í­¥¸¤ì(€€€É•ÑÕÉ¸AÉ½µ¥Í”¹…±°¡l(€€€€€È°(€€€€€AÉ½µ¥Í”¹…±°¡Ì¤°(€€€€€¼(€€€t¤¹Ñ¡•¸¡™Õ¹Ñ¥½¸¡°¤ì(€€€€€½¹ÍĞŒ€ô±lÁt° €ô±lÅt°€ô±lÉtì(€€€€€€„ôô¹Õ±°€˜˜Œ¹ÑÉ…Ù•ÉÍ”¡™Õ¹Ñ¥½¸¡Ô¤ì(€€€€€€€Ô¹¥ÍM­¥¹¹•‘5•Í €˜˜Ô¹‰¥¹¡°‘À¤ì(€€€€€ô¤ì(€€€€€™½È€¡±•ĞÔ€ô€À°À€ô ¹±•¹Ñ ìÔ€ğÀìÔ¬¬¤Œ¹…‘¡¡mÕt¤ì(€€€€€¥˜€¡Œ¹ÕÍ•É…Ñ„¹Á¥Ù½Ğ€„ôôÙ½¥€À€˜˜ ¹±•¹Ñ €ø€À¤ì(€€€€€€€½¹ÍĞÔ€ôŒ¹ÕÍ•É…Ñ„¹Á¥Ù½Ğ°À€ô¡lÁtì(€€€€€€€Œ¹Á¥Ù½Ğ€ô¹•Ü8 ¤¹™É½µÉÉ…ä¡Ô¤°Œ¹Á½Í¥Ñ¥½¸¹à€´ôÕlÁt°Œ¹Á½Í¥Ñ¥½¸¹ä€´ôÕlÅt°Œ¹Á½Í¥Ñ¥½¸¹è€´ôÕlÉt°À¹Á½Í¥Ñ¥½¸¹Í•Ğ À°€À°€À¤°‘•±•Ñ”Œ¹ÕÍ•É…Ñ„¹Á¥Ù½Ğì(€€€€€ô(€€€€€É•ÑÕÉ¸Œì(€€€ô¤ì(€ô(€}±½…‘9½‘•M¡…±±½Ü¡”¤ì(€€€½¹ÍĞĞ€ôÑ¡¥Ì¹©Í½¸°¤€ôÑ¡¥Ì¹•áÑ•¹Í¥½¹Ì°¸€ôÑ¡¥Ìì(€€€¥˜€¡Ñ¡¥Ì¹¹½‘•…¡•m•t€„ôôÙ½¥€À¤É•ÑÕÉ¸Ñ¡¥Ì¹¹½‘•…¡•m•tì(€€€½¹ÍĞÈ€ôĞ¹¹½‘•Ím•t°Ì€ôÈ¹¹…µ”€ü¸¹É•…Ñ•U¹¥ÅÕ•9…µ”¡È¹¹…µ”¤€è€ˆˆ°„€ômt°¼€ô¸¹}¥¹Ù½­•=¹”¡™Õ¹Ñ¥½¸¡°¤ì(€€€€€É•ÑÕÉ¸°¹É•…Ñ•9½‘•5•Í €˜˜°¹É•…Ñ•9½‘•5•Í ¡”¤ì(€€€ô¤ì(€€€É•ÑÕÉ¸¼€˜˜„¹ÁÕÍ ¡¼¤°È¹…µ•É„€„ôôÙ½¥€À€˜˜„¹ÁÕÍ ¡¸¹•Ñ•Á•¹‘•¹ä ‰…µ•É„ˆ°È¹…µ•É„¤¹Ñ¡•¸¡™Õ¹Ñ¥½¸¡°¤ì(€€€€€É•ÑÕÉ¸¸¹}•Ñ9½‘•I•˜¡¸¹…µ•É……¡”°È¹…µ•É„°°¤ì(€€€ô¤¤°¸¹}¥¹Ù½­•±°¡™Õ¹Ñ¥½¸¡°¤ì(€€€€€É•ÑÕÉ¸°¹É•…Ñ•9½‘•ÑÑ…¡µ•¹Ğ€˜˜°¹É•…Ñ•9½‘•ÑÑ…¡µ•¹Ğ¡”¤ì(€€€ô¤¹™½É… ¡™Õ¹Ñ¥½¸¡°¤ì(€€€€€„¹ÁÕÍ ¡°¤ì(€€€ô¤°Ñ¡¥Ì¹¹½‘•…¡•m•t€ôAÉ½µ¥Í”¹…±°¡„¤¹Ñ¡•¸¡™Õ¹Ñ¥½¸¡°¤ì(€€€€€±•ĞŒì(€€€€€¥˜€¡È¹¥Í	½¹”€ôôô€„À€üŒ€ô¹•Ü¹° ¤€è°¹±•¹Ñ €ø€Ä€üŒ€ô¹•Ü!¤ ¤€è°¹±•¹Ñ €ôôô€Ä€üŒ€ô±lÁt€èŒ€ô¹•Ü‘Ğ ¤°Œ€„ôô±lÁt¤™½È€¡±•Ğ €ô€À°€ô°¹±•¹Ñ ì €ğì ¬¬¤Œ¹…‘¡±m¡t¤ì(€€€€€¥˜€¡È¹¹…µ”€˜˜€¡Œ¹ÕÍ•É…Ñ„¹¹…µ”€ôÈ¹¹…µ”°Œ¹¹…µ”€ôÌ¤°Í¤¡Œ°È¤°È¹•áÑ•¹Í¥½¹Ì€˜˜¤¡¤°Œ°È¤°È¹µ…ÑÉ¥à€„ôôÙ½¥€À¤ì(€€€€€€€½¹ÍĞ €ô¹•Ü” ¤ì(€€€€€€€ ¹™É½µÉÉ…ä¡È¹µ…ÑÉ¥à¤°Œ¹…ÁÁ±å5…ÑÉ¥àĞ¡ ¤ì(€€€€€ô•±Í”(€€€€€€€È¹ÑÉ…¹Í±…Ñ¥½¸€„ôôÙ½¥€À€˜˜Œ¹Á½Í¥Ñ¥½¸¹™É½µÉÉ…ä¡È¹ÑÉ…¹Í±…Ñ¥½¸¤°È¹É½Ñ…Ñ¥½¸€„ôôÙ½¥€À€˜˜Œ¹ÅÕ…Ñ•É¹¥½¸¹™É½µÉÉ…ä¡È¹É½Ñ…Ñ¥½¸¤°È¹Í…±”€„ôôÙ½¥€À€˜˜Œ¹Í…±”¹™É½µÉÉ…ä¡È¹Í…±”¤ì(€€€€€¥˜€ …¸¹…ÍÍ½¥…Ñ¥½¹Ì¹¡…Ì¡Œ¤¤¸¹…ÍÍ½¥…Ñ¥½¹Ì¹Í•Ğ¡Œ°íô¤ì(€€€€€•±Í”¥˜€¡È¹µ•Í €„ôôÙ½¥€À€˜˜¸¹µ•Í¡…¡”¹É•™ÍmÈ¹µ•Í¡t€ø€Ä¤ì(€€€€€€€½¹ÍĞ €ô¸¹…ÍÍ½¥…Ñ¥½¹Ì¹•Ğ¡Œ¤ì(€€€€€€€¸¹…ÍÍ½¥…Ñ¥½¹Ì¹Í•Ğ¡Œ°ì€¸¸¹ ô¤ì(€€€€€ô(€€€€€É•ÑÕÉ¸¸¹…ÍÍ½¥…Ñ¥½¹Ì¹•Ğ¡Œ¤¹¹½‘•Ì€ô”°Œì(€€€ô¤°Ñ¡¥Ì¹¹½‘•…¡•m•tì(€ô(€±½…‘M•¹”¡”¤ì(€€€½¹ÍĞĞ€ôÑ¡¥Ì¹•áÑ•¹Í¥½¹Ì°¤€ôÑ¡¥Ì¹©Í½¸¹Í•¹•Ím•t°¸€ôÑ¡¥Ì°È€ô¹•Ü!¤ ¤ì(€€€¤¹¹…µ”€˜˜€¡È¹¹…µ”€ô¸¹É•…Ñ•U¹¥ÅÕ•9…µ”¡¤¹¹…µ”¤¤°Í¤¡È°¤¤°¤¹•áÑ•¹Í¥½¹Ì€˜˜¤¡Ğ°È°¤¤ì(€€€½¹ÍĞÌ€ô¤¹¹½‘•Ìñğmt°„€ômtì(€€€™½È€¡±•Ğ¼€ô€À°°€ôÌ¹±•¹Ñ ì¼€ğ°ì¼¬¬¤„¹ÁÕÍ ¡¸¹•Ñ•Á•¹‘•¹ä ‰¹½‘”ˆ°Ím½t¤¤ì(€€€É•ÑÕÉ¸AÉ½µ¥Í”¹…±°¡„¤¹Ñ¡•¸¡™Õ¹Ñ¥½¸¡¼¤ì(€€€€€™½È€¡±•ĞŒ€ô€À° €ô¼¹±•¹Ñ ìŒ€ğ ìŒ¬¬¤ì(€€€€€€€½¹ÍĞ€ô½mtì(€€€€€€€¹Á…É•¹Ğ€„ôô¹Õ±°€üÈ¹…‘¡9˜¡¤¤€èÈ¹…‘¡¤ì(€€€€€ô(€€€€€½¹ÍĞ°€ô€¡Œ¤€ôøì(€€€€€€€½¹ÍĞ €ô€¼¨}}AUI}|€¨¼¹•Ü5…À ¤ì(€€€€€€€™½È€¡½¹ÍĞm°Õt½˜¸¹…ÍÍ½¥…Ñ¥½¹Ì¤€¡¥¹ÍÑ…¹•½˜¤ñğ¥¹ÍÑ…¹•½˜UĞ¤€˜˜ ¹Í•Ğ¡°Ô¤ì(€€€€€€€É•ÑÕÉ¸Œ¹ÑÉ…Ù•ÉÍ” ¡¤€ôøì(€€€€€€€€€½¹ÍĞÔ€ô¸¹…ÍÍ½¥…Ñ¥½¹Ì¹•Ğ¡¤ì(€€€€€€€€€Ô€„ô¹Õ±°€˜˜ ¹Í•Ğ¡°Ô¤ì(€€€€€€€ô¤° ì(€€€€€ôì(€€€€€É•ÑÕÉ¸¸¹…ÍÍ½¥…Ñ¥½¹Ì€ô°¡È¤°Èì(€€€ô¤ì(€ô(€}É•…Ñ•¹¥µ…Ñ¥½¹QÉ…­Ì¡”°Ğ°¤°¸°È¤ì(€€€½¹ÍĞÌ€ômt°„€ô”¹¹…µ”€ü”¹¹…µ”€è”¹ÕÕ¥°¼€ômtì(€€€™Õ¹Ñ¥½¸°¡Ô¤ì(€€€€€Ô¹µ½ÉÁ¡Q…É•Ñ%¹™±Õ•¹•Ì€˜˜¼¹ÁÕÍ ¡Ô¹¹…µ”€üÔ¹¹…µ”€èÔ¹ÕÕ¥¤ì(€€€ô(€€€1¥mÈ¹Á…Ñ¡t€ôôô1¤¹İ•¥¡ÑÌ€ü€¡°¡”¤°”¹¥ÍÉ½ÕÀ€˜˜”¹¡¥±‘É•¸¹™½É… ¡°¤¤€è¼¹ÁÕÍ ¡„¤ì(€€€±•ĞŒì(€€€Íİ¥Ñ €¡1¥mÈ¹Á…Ñ¡t¤ì(€€€€€…Í”1¤¹İ•¥¡ÑÌè(€€€€€€€Œ€ô€‘¸ì(€€€€€€€‰É•…¬ì(€€€€€…Í”1¤¹É½Ñ…Ñ¥½¸è(€€€€€€€Œ€ôE¸ì(€€€€€€€‰É•…¬ì(€€€€€…Í”1¤¹ÑÉ…¹Í±…Ñ¥½¸è(€€€€€…Í”1¤¹Í…±”è(€€€€€€€Œ€ô]Èì(€€€€€€€‰É•…¬ì(€€€€€‘•™…Õ±Ğè(€€€€€€€¤¹¥Ñ•µM¥é”€ôôô€Ä€üŒ€ô€‘¸€èŒ€ô]Èì(€€€€€€€‰É•…¬ì(€€€ô(€€€½¹ÍĞ €ô¸¹¥¹Ñ•ÉÁ½±…Ñ¥½¸€„ôôÙ½¥€À€ü…Ám¸¹¥¹Ñ•ÉÁ½±…Ñ¥½¹t€è)¸°€ôÑ¡¥Ì¹}•ÑÉÉ…åÉ½µ•ÍÍ½È¡¤¤ì(€€€™½È€¡±•ĞÔ€ô€À°À€ô¼¹±•¹Ñ ìÔ€ğÀìÔ¬¬¤ì(€€€€€½¹ÍĞØ€ô¹•ÜŒ¡½mÕt€¬€ˆ¸ˆ€¬1¥mÈ¹Á…Ñ¡t°Ğ¹…ÉÉ…ä°° ¤ì(€€€€€¸¹¥¹Ñ•ÉÁ½±…Ñ¥½¸€ôôô€‰U	%MA1%9ˆ€˜˜Ñ¡¥Ì¹}É•…Ñ•Õ‰¥MÁ±¥¹•QÉ…­%¹Ñ•ÉÁ½±…¹Ğ¡Ø¤°Ì¹ÁÕÍ ¡Ø¤ì(€€€ô(€€€É•ÑÕÉ¸Ìì(€ô(€}•ÑÉÉ…åÉ½µ•ÍÍ½È¡”¤ì(€€€±•ĞĞ€ô”¹…ÉÉ…äì(€€€¥˜€¡”¹¹½Éµ…±¥é•¤ì(€€€€€½¹ÍĞ¤€ô]Ì¡Ğ¹½¹ÍÑÉÕÑ½È¤°¸€ô¹•Ü±½…ĞÌÉÉÉ…ä¡Ğ¹±•¹Ñ ¤ì(€€€€€™½È€¡±•ĞÈ€ô€À°Ì€ôĞ¹±•¹Ñ ìÈ€ğÌìÈ¬¬¤¹mÉt€ôÑmÉt€¨¤ì(€€€€€Ğ€ô¸ì(€€€ô(€€€É•ÑÕÉ¸Ğì(€ô(€}É•…Ñ•Õ‰¥MÁ±¥¹•QÉ…­%¹Ñ•ÉÁ½±…¹Ğ¡”¤ì(€€€”¹É•…Ñ•%¹Ñ•ÉÁ½±…¹Ğ€ô™Õ¹Ñ¥½¸¡¤¤ì(€€€€€É•ÑÕÉ¸¹•Ü€¡Ñ¡¥Ì¥¹ÍÑ…¹•½˜E¸€üÍÀ€èİ°¤¡Ñ¡¥Ì¹Ñ¥µ•Ì°Ñ¡¥Ì¹Ù…±Õ•Ì°Ñ¡¥Ì¹•ÑY…±Õ•M¥é” ¤€¼€Ì°¤¤ì(€€€ô°”¹É•…Ñ•%¹Ñ•ÉÁ½±…¹Ğ¹¥Í%¹Ñ•ÉÁ½±…¹Ñ…Ñ½Éå5•Ñ¡½‘1QÕ‰¥MÁ±¥¹”€ô€„Àì(€ô)ôì)™Õ¹Ñ¥½¸ÁÀ¡”°Ğ°¤¤ì(€½¹ÍĞ¸€ôĞ¹…ÑÑÉ¥‰ÕÑ•Ì°È€ô¹•ÜÕ¤ ¤ì(€¥˜€¡¸¹A=M%Q%=8€„ôôÙ½¥€À¤ì(€€€½¹ÍĞ¼€ô¤¹©Í½¸¹…•ÍÍ½ÉÍm¸¹A=M%Q%=9t°°€ô¼¹µ¥¸°Œ€ô¼¹µ…àì(€€€¥˜€¡°€„ôôÙ½¥€À€˜˜Œ€„ôôÙ½¥€À¤ì(€€€€€¥˜€¡È¹Í•Ğ¡¹•Ü8¡±lÁt°±lÅt°±lÉt¤°¹•Ü8¡lÁt°lÅt°lÉt¤¤°¼¹¹½Éµ…±¥é•¤ì(€€€€€€€½¹ÍĞ €ô]Ì¡}¹m¼¹½µÁ½¹•¹ÑQåÁ•t¤ì(€€€€€€€È¹µ¥¸¹µÕ±Ñ¥Á±åM…±…È¡ ¤°È¹µ…à¹µÕ±Ñ¥Á±åM…±…È¡ ¤ì(€€€€€ô(€€€ô•±Í”ì(€€€€€½¹Í½±”¹İ…É¸ ‰Q!I¹1Q1½…‘•Èè5¥ÍÍ¥¹œµ¥¸½µ…àÁÉ½Á•ÉÑ¥•Ì™½È…•ÍÍ½ÈA=M%Q%=8¸ˆ¤ì(€€€€€É•ÑÕÉ¸ì(€€€ô(€ô•±Í”É•ÑÕÉ¸ì(€½¹ÍĞÌ€ôĞ¹Ñ…É•ÑÌì(€¥˜€¡Ì€„ôôÙ½¥€À¤ì(€€€½¹ÍĞ¼€ô¹•Ü8 ¤°°€ô¹•Ü8 ¤ì(€€€™½È€¡±•ĞŒ€ô€À° €ôÌ¹±•¹Ñ ìŒ€ğ ìŒ¬¬¤ì(€€€€€½¹ÍĞ€ôÍmtì(€€€€€¥˜€¡¹A=M%Q%=8€„ôôÙ½¥€À¤ì(€€€€€€€½¹ÍĞÔ€ô¤¹©Í½¸¹…•ÍÍ½ÉÍm¹A=M%Q%=9t°À€ôÔ¹µ¥¸°Ø€ôÔ¹µ…àì(€€€€€€€¥˜€¡À€„ôôÙ½¥€À€˜˜Ø€„ôôÙ½¥€À¤ì(€€€€€€€€€¥˜€¡°¹Í•Ñ`¡5…Ñ ¹µ…à¡5…Ñ ¹…‰Ì¡ÁlÁt¤°5…Ñ ¹…‰Ì¡ÙlÁt¤¤¤°°¹Í•Ñd¡5…Ñ ¹µ…à¡5…Ñ ¹…‰Ì¡ÁlÅt¤°5…Ñ ¹…‰Ì¡ÙlÅt¤¤¤°°¹Í•Ñh¡5…Ñ ¹µ…à¡5…Ñ ¹…‰Ì¡ÁlÉt¤°5…Ñ ¹…‰Ì¡ÙlÉt¤¤¤°Ô¹¹½Éµ…±¥é•¤ì(€€€€€€€€€€€½¹ÍĞˆ€ô]Ì¡}¹mÔ¹½µÁ½¹•¹ÑQåÁ•t¤ì(€€€€€€€€€€€°¹µÕ±Ñ¥Á±åM…±…È¡ˆ¤ì(€€€€€€€€€ô(€€€€€€€€€¼¹µ…à¡°¤ì(€€€€€€€ô•±Í”½¹Í½±”¹İ…É¸ ‰Q!I¹1Q1½…‘•Èè5¥ÍÍ¥¹œµ¥¸½µ…àÁÉ½Á•ÉÑ¥•Ì™½È…•ÍÍ½ÈA=M%Q%=8¸ˆ¤ì(€€€€€ô(€€€ô(€€€È¹•áÁ…¹‘	åY•Ñ½È¡¼¤ì(€ô(€”¹‰½Õ¹‘¥¹	½à€ôÈì(€½¹ÍĞ„€ô¹•Ü‘¤ ¤ì(€È¹•Ñ•¹Ñ•È¡„¹•¹Ñ•È¤°„¹É…‘¥ÕÌ€ôÈ¹µ¥¸¹‘¥ÍÑ…¹•Q¼¡È¹µ…à¤€¼€È°”¹‰½Õ¹‘¥¹MÁ¡•É”€ô„ì)ô)™Õ¹Ñ¥½¸I¼¡”°Ğ°¤¤ì(€½¹ÍĞ¸€ôĞ¹…ÑÑÉ¥‰ÕÑ•Ì°È€ômtì(€™Õ¹Ñ¥½¸Ì¡„°¼¤ì(€€€É•ÑÕÉ¸¤¹•Ñ•Á•¹‘•¹ä ‰…•ÍÍ½Èˆ°„¤¹Ñ¡•¸¡™Õ¹Ñ¥½¸¡°¤ì(€€€€€”¹Í•ÑÑÑÉ¥‰ÕÑ”¡¼°°¤ì(€€€ô¤ì(€ô(€™½È€¡½¹ÍĞ„¥¸¸¤ì(€€€½¹ÍĞ¼€ô!Ím…tñğ„¹Ñ½1½İ•É…Í” ¤ì(€€€¼¥¸”¹…ÑÑÉ¥‰ÕÑ•ÌñğÈ¹ÁÕÍ ¡Ì¡¹m…t°¼¤¤ì(€ô(€¥˜€¡Ğ¹¥¹‘¥•Ì€„ôôÙ½¥€À€˜˜€…”¹¥¹‘•à¤ì(€€€½¹ÍĞ„€ô¤¹•Ñ•Á•¹‘•¹ä ‰…•ÍÍ½Èˆ°Ğ¹¥¹‘¥•Ì¤¹Ñ¡•¸¡™Õ¹Ñ¥½¸¡¼¤ì(€€€€€”¹Í•Ñ%¹‘•à¡¼¤ì(€€€ô¤ì(€€€È¹ÁÕÍ ¡„¤ì(€ô(€É•ÑÕÉ¸!”¹İ½É­¥¹½±½ÉMÁ…”€„ôô€‰ÍÉˆµ±¥¹•…Èˆ€˜˜€‰=1=I|Àˆ¥¸¸€˜˜½¹Í½±”¹İ…É¸¡Q!I¹1Q1½…‘•Èè½¹Ù•ÉÑ¥¹œÙ•ÉÑ•à½±½ÉÌ™É½´€‰ÍÉˆµ±¥¹•…ÈˆÑ¼€ˆ‘í!”¹İ½É­¥¹½±½ÉMÁ…•ôˆ¹½ĞÍÕÁÁ½ÉÑ•¹€¤°Í¤¡”°Ğ¤°ÁÀ¡”°Ğ°¤¤°AÉ½µ¥Í”¹…±°¡È¤¹Ñ¡•¸¡™Õ¹Ñ¥½¸ ¤ì(€€€É•ÑÕÉ¸Ğ¹Ñ…É•ÑÌ€„ôôÙ½¥€À€ü±À¡”°Ğ¹Ñ…É•ÑÌ°¤¤€è”ì(€ô¤ì)ô)Ù…Èİ¼€ôìÑåÁ”è€‰¡…¹”ˆô°•„€ôìÑåÁ”è€‰ÍÑ…ÉĞˆô°°€ôìÑåÁ”è€‰•¹ˆô°1È€ô¹•Ü•È ¤°¼€ô¹•Ü¤ ¤°µÀ€ô5…Ñ ¹½Ì ÜÀ€¨]¼¹ÉI¤°ÁĞ€ô¹•Ü8 ¤°Ğ€ô€È€¨5…Ñ ¹A$°€‘”€ôì(€9=9è€´Ä°(€I=QQè€À°(€=11dè€Ä°(€A8è€È°(€Q=U!}I=QQè€Ì°(€Q=U!}A8è€Ğ°(€Q=U!}=11e}A8è€Ô°(€Q=U!}=11e}I=QQè€Ø)ô°=Ì€ô€Å”´Ø°À€ô±…ÍÌ•áÑ•¹‘ÌÔì(€½¹ÍÑÉÕÑ½È¡”°Ğ€ô¹Õ±°¤ì(€€€ÍÕÁ•È¡”°Ğ¤°Ñ¡¥Ì¹ÍÑ…Ñ”€ô€‘”¹9=9°Ñ¡¥Ì¹Ñ…É•Ğ€ô¹•Ü8 ¤°Ñ¡¥Ì¹ÕÉÍ½È€ô¹•Ü8 ¤°Ñ¡¥Ì¹µ¥¹¥ÍÑ…¹”€ô€À°Ñ¡¥Ì¹µ…á¥ÍÑ…¹”€ô€Ä€¼€À°Ñ¡¥Ì¹µ¥¹i½½´€ô€À°Ñ¡¥Ì¹µ…ái½½´€ô€Ä€¼€À°Ñ¡¥Ì¹µ¥¹Q…É•ÑI…‘¥ÕÌ€ô€À°Ñ¡¥Ì¹µ…áQ…É•ÑI…‘¥ÕÌ€ô€Ä€¼€À°Ñ¡¥Ì¹µ¥¹A½±…É¹±”€ô€À°Ñ¡¥Ì¹µ…áA½±…É¹±”€ô5…Ñ ¹A$°Ñ¡¥Ì¹µ¥¹é¥µÕÑ¡¹±”€ô€´Ä€¼€À°Ñ¡¥Ì¹µ…áé¥µÕÑ¡¹±”€ô€Ä€¼€À°Ñ¡¥Ì¹•¹…‰±•…µÁ¥¹œ€ô€„Ä°Ñ¡¥Ì¹‘…µÁ¥¹…Ñ½È€ô€À¸ÀÔ°Ñ¡¥Ì¹•¹…‰±•i½½´€ô€„À°Ñ¡¥Ì¹é½½µMÁ••€ô€Ä°Ñ¡¥Ì¹•¹…‰±•I½Ñ…Ñ”€ô€„À°Ñ¡¥Ì¹É½Ñ…Ñ•MÁ••€ô€Ä°Ñ¡¥Ì¹­•åI½Ñ…Ñ•MÁ••€ô€Ä°Ñ¡¥Ì¹•¹…‰±•A…¸€ô€„À°Ñ¡¥Ì¹Á…¹MÁ••€ô€Ä°Ñ¡¥Ì¹ÍÉ••¹MÁ…•A…¹¹¥¹œ€ô€„À°Ñ¡¥Ì¹­•åA…¹MÁ••€ô€Ü°Ñ¡¥Ì¹é½½µQ½ÕÉÍ½È€ô€„Ä°Ñ¡¥Ì¹…ÕÑ½I½Ñ…Ñ”€ô€„Ä°Ñ¡¥Ì¹…ÕÑ½I½Ñ…Ñ•MÁ••€ô€È°Ñ¡¥Ì¹­•åÌ€ôì(€€€€€1Pè€‰ÉÉ½İ1•™Ğˆ°(€€€€€U@è€‰ÉÉ½İUÀˆ°(€€€€€I%!Pè€‰ÉÉ½İI¥¡Ğˆ°(€€€€€	=QQ=4è€‰ÉÉ½İ½İ¸ˆ(€€€ô°Ñ¡¥Ì¹µ½ÕÍ•	ÕÑÑ½¹Ì€ôì(€€€€€1PèÁ¸¹I=QQ°(€€€€€5%1èÁ¸¹=11d°(€€€€€I%!PèÁ¸¹A8(€€€ô°Ñ¡¥Ì¹Ñ½Õ¡•Ì€ôì(€€€€€=9è™¸¹I=QQ°(€€€€€Q]<è™¸¹=11e}A8(€€€ô°Ñ¡¥Ì¹Ñ…É•ĞÀ€ôÑ¡¥Ì¹Ñ…É•Ğ¹±½¹” ¤°Ñ¡¥Ì¹Á½Í¥Ñ¥½¸À€ôÑ¡¥Ì¹½‰©•Ğ¹Á½Í¥Ñ¥½¸¹±½¹” ¤°Ñ¡¥Ì¹é½½´À€ôÑ¡¥Ì¹½‰©•Ğ¹é½½´°Ñ¡¥Ì¹}ÕÉÍ½ÉMÑå±”€ô€‰…ÕÑ¼ˆ°Ñ¡¥Ì¹}‘½µ±•µ•¹Ñ-•åÙ•¹ÑÌ€ô¹Õ±°°Ñ¡¥Ì¹}±…ÍÑA½Í¥Ñ¥½¸€ô¹•Ü8 ¤°Ñ¡¥Ì¹}±…ÍÑEÕ…Ñ•É¹¥½¸€ô¹•Ü€‘Ğ ¤°Ñ¡¥Ì¹}±…ÍÑQ…É•ÑA½Í¥Ñ¥½¸€ô¹•Ü8 ¤°Ñ¡¥Ì¹}ÅÕ…Ğ€ô¹•Ü€‘Ğ ¤¹Í•ÑÉ½µU¹¥ÑY•Ñ½ÉÌ¡”¹ÕÀ°¹•Ü8 À°€Ä°€À¤¤°Ñ¡¥Ì¹}ÅÕ…Ñ%¹Ù•ÉÍ”€ôÑ¡¥Ì¹}ÅÕ…Ğ¹±½¹” ¤¹¥¹Ù•ÉĞ ¤°Ñ¡¥Ì¹}ÍÁ¡•É¥…°€ô¹•Ü)„ ¤°Ñ¡¥Ì¹}ÍÁ¡•É¥…±•±Ñ„€ô¹•Ü)„ ¤°Ñ¡¥Ì¹}Í…±”€ô€Ä°Ñ¡¥Ì¹}Á…¹=™™Í•Ğ€ô¹•Ü8 ¤°Ñ¡¥Ì¹}É½Ñ…Ñ•MÑ…ÉĞ€ô¹•Ü” ¤°Ñ¡¥Ì¹}É½Ñ…Ñ•¹€ô¹•Ü” ¤°Ñ¡¥Ì¹}É½Ñ…Ñ••±Ñ„€ô¹•Ü” ¤°Ñ¡¥Ì¹}Á…¹MÑ…ÉĞ€ô¹•Ü” ¤°Ñ¡¥Ì¹}Á…¹¹€ô¹•Ü” ¤°Ñ¡¥Ì¹}Á…¹•±Ñ„€ô¹•Ü” ¤°Ñ¡¥Ì¹}‘½±±åMÑ…ÉĞ€ô¹•Ü” ¤°Ñ¡¥Ì¹}‘½±±å¹€ô¹•Ü” ¤°Ñ¡¥Ì¹}‘½±±å•±Ñ„€ô¹•Ü” ¤°Ñ¡¥Ì¹}‘½±±å¥É•Ñ¥½¸€ô¹•Ü8 ¤°Ñ¡¥Ì¹}µ½ÕÍ”€ô¹•Ü” ¤°Ñ¡¥Ì¹}Á•É™½ÉµÕÉÍ½Éi½½´€ô€„Ä°Ñ¡¥Ì¹}Á½¥¹Ñ•ÉÌ€ômt°Ñ¡¥Ì¹}Á½¥¹Ñ•ÉA½Í¥Ñ¥½¹Ì€ôíô°Ñ¡¥Ì¹}½¹ÑÉ½±Ñ¥Ù”€ô€„Ä°Ñ¡¥Ì¹}½¹A½¥¹Ñ•É5½Ù”€ôÙÀ¹‰¥¹¡Ñ¡¥Ì¤°Ñ¡¥Ì¹}½¹A½¥¹Ñ•É½İ¸€ô}À¹‰¥¹¡Ñ¡¥Ì¤°Ñ¡¥Ì¹}½¹A½¥¹Ñ•ÉUÀ€ô‰À¹‰¥¹¡Ñ¡¥Ì¤°Ñ¡¥Ì¹}½¹½¹Ñ•áÑ5•¹Ô€ôÀ¹‰¥¹¡Ñ¡¥Ì¤°Ñ¡¥Ì¹}½¹5½ÕÍ•]¡••°€ôMÀ¹‰¥¹¡Ñ¡¥Ì¤°Ñ¡¥Ì¹}½¹-•å½İ¸€ôåÀ¹‰¥¹¡Ñ¡¥Ì¤°Ñ¡¥Ì¹}½¹Q½Õ¡MÑ…ÉĞ€ôÀ¹‰¥¹¡Ñ¡¥Ì¤°Ñ¡¥Ì¹}½¹Q½Õ¡5½Ù”€ôQÀ¹‰¥¹¡Ñ¡¥Ì¤°Ñ¡¥Ì¹}½¹5½ÕÍ•½İ¸€ô5À¹‰¥¹¡Ñ¡¥Ì¤°Ñ¡¥Ì¹}½¹5½ÕÍ•5½Ù”€ôáÀ¹‰¥¹¡Ñ¡¥Ì¤°Ñ¡¥Ì¹}¥¹Ñ•É•ÁÑ½¹ÑÉ½±½İ¸€ôIÀ¹‰¥¹¡Ñ¡¥Ì¤°Ñ¡¥Ì¹}¥¹Ñ•É•ÁÑ½¹ÑÉ½±UÀ€ôİÀ¹‰¥¹¡Ñ¡¥Ì¤°Ñ¡¥Ì¹‘½µ±•µ•¹Ğ€„ôô¹Õ±°€˜˜Ñ¡¥Ì¹½¹¹•Ğ¡Ñ¡¥Ì¹‘½µ±•µ•¹Ğ¤°Ñ¡¥Ì¹ÕÁ‘…Ñ” ¤ì(€ô(€Í•ĞÕÉÍ½ÉMÑå±”¡”¤ì(€€€Ñ¡¥Ì¹}ÕÉÍ½ÉMÑå±”€ô”°”€ôôô€‰É…ˆˆ€üÑ¡¥Ì¹‘½µ±•µ•¹Ğ¹ÍÑå±”¹ÕÉÍ½È€ô€‰É…ˆˆ€èÑ¡¥Ì¹‘½µ±•µ•¹Ğ¹ÍÑå±”¹ÕÉÍ½È€ô€‰…ÕÑ¼ˆì(€ô(€•ĞÕÉÍ½ÉMÑå±” ¤ì(€€€É•ÑÕÉ¸Ñ¡¥Ì¹}ÕÉÍ½ÉMÑå±”ì(€ô(€½¹¹•Ğ¡”¤ì(€€€ÍÕÁ•È¹½¹¹•Ğ¡”¤°Ñ¡¥Ì¹‘½µ±•µ•¹Ğ¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰Á½¥¹Ñ•É‘½İ¸ˆ°Ñ¡¥Ì¹}½¹A½¥¹Ñ•É½İ¸¤°Ñ¡¥Ì¹‘½µ±•µ•¹Ğ¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰Á½¥¹Ñ•É…¹•°ˆ°Ñ¡¥Ì¹}½¹A½¥¹Ñ•ÉUÀ¤°Ñ¡¥Ì¹‘½µ±•µ•¹Ğ¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰½¹Ñ•áÑµ•¹Ôˆ°Ñ¡¥Ì¹}½¹½¹Ñ•áÑ5•¹Ô¤°Ñ¡¥Ì¹‘½µ±•µ•¹Ğ¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰İ¡••°ˆ°Ñ¡¥Ì¹}½¹5½ÕÍ•]¡••°°ìÁ…ÍÍ¥Ù”è€„Äô¤°Ñ¡¥Ì¹‘½µ±•µ•¹Ğ¹•ÑI½½Ñ9½‘” ¤¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰­•å‘½İ¸ˆ°Ñ¡¥Ì¹}¥¹Ñ•É•ÁÑ½¹ÑÉ½±½İ¸°ì(€€€€€Á…ÍÍ¥Ù”è€„À°(€€€€€…ÁÑÕÉ”è€„À(€€€ô¤°Ñ¡¥Ì¹‘½µ±•µ•¹Ğ¹ÍÑå±”¹Ñ½Õ¡Ñ¥½¸€ô€‰¹½¹”ˆì(€ô(€‘¥Í½¹¹•Ğ ¤ì(€€€Ñ¡¥Ì¹‘½µ±•µ•¹Ğ¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰Á½¥¹Ñ•É‘½İ¸ˆ°Ñ¡¥Ì¹}½¹A½¥¹Ñ•É½İ¸¤°Ñ¡¥Ì¹‘½µ±•µ•¹Ğ¹½İ¹•É½Õµ•¹Ğ¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰Á½¥¹Ñ•Éµ½Ù”ˆ°Ñ¡¥Ì¹}½¹A½¥¹Ñ•É5½Ù”¤°Ñ¡¥Ì¹‘½µ±•µ•¹Ğ¹½İ¹•É½Õµ•¹Ğ¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰Á½¥¹Ñ•ÉÕÀˆ°Ñ¡¥Ì¹}½¹A½¥¹Ñ•ÉUÀ¤°Ñ¡¥Ì¹‘½µ±•µ•¹Ğ¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰Á½¥¹Ñ•É…¹•°ˆ°Ñ¡¥Ì¹}½¹A½¥¹Ñ•ÉUÀ¤°Ñ¡¥Ì¹‘½µ±•µ•¹Ğ¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰İ¡••°ˆ°Ñ¡¥Ì¹}½¹5½ÕÍ•]¡••°¤°Ñ¡¥Ì¹‘½µ±•µ•¹Ğ¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰½¹Ñ•áÑµ•¹Ôˆ°Ñ¡¥Ì¹}½¹½¹Ñ•áÑ5•¹Ô¤°Ñ¡¥Ì¹ÍÑ½Á1¥ÍÑ•¹Q½-•åÙ•¹ÑÌ ¤°Ñ¡¥Ì¹‘½µ±•µ•¹Ğ¹•ÑI½½Ñ9½‘” ¤¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰­•å‘½İ¸ˆ°Ñ¡¥Ì¹}¥¹Ñ•É•ÁÑ½¹ÑÉ½±½İ¸°ì…ÁÑÕÉ”è€„Àô¤°Ñ¡¥Ì¹‘½µ±•µ•¹Ğ¹ÍÑå±”¹Ñ½Õ¡Ñ¥½¸€ô€ˆˆì(€ô(€‘¥ÍÁ½Í” ¤ì(€€€Ñ¡¥Ì¹‘¥Í½¹¹•Ğ ¤ì(€ô(€•ÑA½±…É¹±” ¤ì(€€€É•ÑÕÉ¸Ñ¡¥Ì¹}ÍÁ¡•É¥…°¹Á¡¤ì(€ô(€•Ñé¥µÕÑ¡…±¹±” ¤ì(€€€É•ÑÕÉ¸Ñ¡¥Ì¹}ÍÁ¡•É¥…°¹Ñ¡•Ñ„ì(€ô(€•Ñ¥ÍÑ…¹” ¤ì(€€€É•ÑÕÉ¸Ñ¡¥Ì¹½‰©•Ğ¹Á½Í¥Ñ¥½¸¹‘¥ÍÑ…¹•Q¼¡Ñ¡¥Ì¹Ñ…É•Ğ¤ì(€ô(€±¥ÍÑ•¹Q½-•åÙ•¹ÑÌ¡”¤ì(€€€”¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰­•å‘½İ¸ˆ°Ñ¡¥Ì¹}½¹-•å½İ¸¤°Ñ¡¥Ì¹}‘½µ±•µ•¹Ñ-•åÙ•¹ÑÌ€ô”ì(€ô(€ÍÑ½Á1¥ÍÑ•¹Q½-•åÙ•¹ÑÌ ¤ì(€€€Ñ¡¥Ì¹}‘½µ±•µ•¹Ñ-•åÙ•¹ÑÌ€„ôô¹Õ±°€˜˜€¡Ñ¡¥Ì¹}‘½µ±•µ•¹Ñ-•åÙ•¹ÑÌ¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰­•å‘½İ¸ˆ°Ñ¡¥Ì¹}½¹-•å½İ¸¤°Ñ¡¥Ì¹}‘½µ±•µ•¹Ñ-•åÙ•¹ÑÌ€ô¹Õ±°¤ì(€ô(€Í…Ù•MÑ…Ñ” ¤ì(€€€Ñ¡¥Ì¹Ñ…É•ĞÀ¹½Áä¡Ñ¡¥Ì¹Ñ…É•Ğ¤°Ñ¡¥Ì¹Á½Í¥Ñ¥½¸À¹½Áä¡Ñ¡¥Ì¹½‰©•Ğ¹Á½Í¥Ñ¥½¸¤°Ñ¡¥Ì¹é½½´À€ôÑ¡¥Ì¹½‰©•Ğ¹é½½´ì(€ô(€É•Í•Ğ ¤ì(€€€Ñ¡¥Ì¹Ñ…É•Ğ¹½Áä¡Ñ¡¥Ì¹Ñ…É•ĞÀ¤°Ñ¡¥Ì¹½‰©•Ğ¹Á½Í¥Ñ¥½¸¹½Áä¡Ñ¡¥Ì¹Á½Í¥Ñ¥½¸À¤°Ñ¡¥Ì¹½‰©•Ğ¹é½½´€ôÑ¡¥Ì¹é½½´À°Ñ¡¥Ì¹½‰©•Ğ¹ÕÁ‘…Ñ•AÉ½©•Ñ¥½¹5…ÑÉ¥à ¤°Ñ¡¥Ì¹‘¥ÍÁ…Ñ¡Ù•¹Ğ¡İ¼¤°Ñ¡¥Ì¹ÕÁ‘…Ñ” ¤°Ñ¡¥Ì¹ÍÑ…Ñ”€ô€‘”¹9=9ì(€ô(€Á…¸¡”°Ğ¤ì(€€€Ñ¡¥Ì¹}Á…¸¡”°Ğ¤°Ñ¡¥Ì¹ÕÁ‘…Ñ” ¤ì(€ô(€‘½±±å%¸¡”¤ì(€€€Ñ¡¥Ì¹}‘½±±å%¸¡”¤°Ñ¡¥Ì¹ÕÁ‘…Ñ” ¤ì(€ô(€‘½±±å=ÕĞ¡”¤ì(€€€Ñ¡¥Ì¹}‘½±±å=ÕĞ¡”¤°Ñ¡¥Ì¹ÕÁ‘…Ñ” ¤ì(€ô(€É½Ñ…Ñ•1•™Ğ¡”¤ì(€€€Ñ¡¥Ì¹}É½Ñ…Ñ•1•™Ğ¡”¤°Ñ¡¥Ì¹ÕÁ‘…Ñ” ¤ì(€ô(€É½Ñ…Ñ•UÀ¡”¤ì(€€€Ñ¡¥Ì¹}É½Ñ…Ñ•UÀ¡”¤°Ñ¡¥Ì¹ÕÁ‘…Ñ” ¤ì(€ô(€ÕÁ‘…Ñ”¡”€ô¹Õ±°¤ì(€€€½¹ÍĞĞ€ôÑ¡¥Ì¹½‰©•Ğ¹Á½Í¥Ñ¥½¸ì(€€€ÁĞ¹½Áä¡Ğ¤¹ÍÕˆ¡Ñ¡¥Ì¹Ñ…É•Ğ¤°ÁĞ¹…ÁÁ±åEÕ…Ñ•É¹¥½¸¡Ñ¡¥Ì¹}ÅÕ…Ğ¤°Ñ¡¥Ì¹}ÍÁ¡•É¥…°¹Í•ÑÉ½µY•Ñ½ÈÌ¡ÁĞ¤°Ñ¡¥Ì¹…ÕÑ½I½Ñ…Ñ”€˜˜Ñ¡¥Ì¹ÍÑ…Ñ”€ôôô€‘”¹9=9€˜˜Ñ¡¥Ì¹}É½Ñ…Ñ•1•™Ğ¡Ñ¡¥Ì¹}•ÑÕÑ½I½Ñ…Ñ¥½¹¹±”¡”¤¤°Ñ¡¥Ì¹•¹…‰±•…µÁ¥¹œ€ü€¡Ñ¡¥Ì¹}ÍÁ¡•É¥…°¹Ñ¡•Ñ„€¬ôÑ¡¥Ì¹}ÍÁ¡•É¥…±•±Ñ„¹Ñ¡•Ñ„€¨Ñ¡¥Ì¹‘…µÁ¥¹…Ñ½È°Ñ¡¥Ì¹}ÍÁ¡•É¥…°¹Á¡¤€¬ôÑ¡¥Ì¹}ÍÁ¡•É¥…±•±Ñ„¹Á¡¤€¨Ñ¡¥Ì¹‘…µÁ¥¹…Ñ½È¤€è€¡Ñ¡¥Ì¹}ÍÁ¡•É¥…°¹Ñ¡•Ñ„€¬ôÑ¡¥Ì¹}ÍÁ¡•É¥…±•±Ñ„¹Ñ¡•Ñ„°Ñ¡¥Ì¹}ÍÁ¡•É¥…°¹Á¡¤€¬ôÑ¡¥Ì¹}ÍÁ¡•É¥…±•±Ñ„¹Á¡¤¤ì(€€€±•Ğ¤€ôÑ¡¥Ì¹µ¥¹é¥µÕÑ¡¹±”°¸€ôÑ¡¥Ì¹µ…áé¥µÕÑ¡¹±”ì(€€€¥Í¥¹¥Ñ”¡¤¤€˜˜¥Í¥¹¥Ñ”¡¸¤€˜˜€¡¤€ğ€µ5…Ñ ¹A$€ü¤€¬ôĞ€è¤€ø5…Ñ ¹A$€˜˜€¡¤€´ôĞ¤°¸€ğ€µ5…Ñ ¹A$€ü¸€¬ôĞ€è¸€ø5…Ñ ¹A$€˜˜€¡¸€´ôĞ¤°¤€ğô¸€üÑ¡¥Ì¹}ÍÁ¡•É¥…°¹Ñ¡•Ñ„€ô5…Ñ ¹µ…à¡¤°5…Ñ ¹µ¥¸¡¸°Ñ¡¥Ì¹}ÍÁ¡•É¥…°¹Ñ¡•Ñ„¤¤€èÑ¡¥Ì¹}ÍÁ¡•É¥…°¹Ñ¡•Ñ„€ôÑ¡¥Ì¹}ÍÁ¡•É¥…°¹Ñ¡•Ñ„€ø€¡¤€¬¸¤€¼€È€ü5…Ñ ¹µ…à¡¤°Ñ¡¥Ì¹}ÍÁ¡•É¥…°¹Ñ¡•Ñ„¤€è5…Ñ ¹µ¥¸¡¸°Ñ¡¥Ì¹}ÍÁ¡•É¥…°¹Ñ¡•Ñ„¤¤°Ñ¡¥Ì¹}ÍÁ¡•É¥…°¹Á¡¤€ô5…Ñ ¹µ…à¡Ñ¡¥Ì¹µ¥¹A½±…É¹±”°5…Ñ ¹µ¥¸¡Ñ¡¥Ì¹µ…áA½±…É¹±”°Ñ¡¥Ì¹}ÍÁ¡•É¥…°¹Á¡¤¤¤°Ñ¡¥Ì¹}ÍÁ¡•É¥…°¹µ…­•M…™” ¤°Ñ¡¥Ì¹•¹…‰±•…µÁ¥¹œ€ôôô€„À€üÑ¡¥Ì¹Ñ…É•Ğ¹…‘‘M…±•‘Y•Ñ½È¡Ñ¡¥Ì¹}Á…¹=™™Í•Ğ°Ñ¡¥Ì¹‘…µÁ¥¹…Ñ½È¤€èÑ¡¥Ì¹Ñ…É•Ğ¹…‘¡Ñ¡¥Ì¹}Á…¹=™™Í•Ğ¤°Ñ¡¥Ì¹Ñ…É•Ğ¹ÍÕˆ¡Ñ¡¥Ì¹ÕÉÍ½È¤°Ñ¡¥Ì¹Ñ…É•Ğ¹±…µÁ1•¹Ñ ¡Ñ¡¥Ì¹µ¥¹Q…É•ÑI…‘¥ÕÌ°Ñ¡¥Ì¹µ…áQ…É•ÑI…‘¥ÕÌ¤°Ñ¡¥Ì¹Ñ…É•Ğ¹…‘¡Ñ¡¥Ì¹ÕÉÍ½È¤ì(€€€±•ĞÈ€ô€„Äì(€€€¥˜€¡Ñ¡¥Ì¹é½½µQ½ÕÉÍ½È€˜˜Ñ¡¥Ì¹}Á•É™½ÉµÕÉÍ½Éi½½´ñğÑ¡¥Ì¹½‰©•Ğ¹¥Í=ÉÑ¡½É…Á¡¥…µ•É„¤Ñ¡¥Ì¹}ÍÁ¡•É¥…°¹É…‘¥ÕÌ€ôÑ¡¥Ì¹}±…µÁ¥ÍÑ…¹”¡Ñ¡¥Ì¹}ÍÁ¡•É¥…°¹É…‘¥ÕÌ¤ì(€€€•±Í”ì(€€€€€½¹ÍĞÌ€ôÑ¡¥Ì¹}ÍÁ¡•É¥…°¹É…‘¥ÕÌì(€€€€€Ñ¡¥Ì¹}ÍÁ¡•É¥…°¹É…‘¥ÕÌ€ôÑ¡¥Ì¹}±…µÁ¥ÍÑ…¹”¡Ñ¡¥Ì¹}ÍÁ¡•É¥…°¹É…‘¥ÕÌ€¨Ñ¡¥Ì¹}Í…±”¤°È€ôÌ€„ôÑ¡¥Ì¹}ÍÁ¡•É¥…°¹É…‘¥ÕÌì(€€€ô(€€€¥˜€¡ÁĞ¹Í•ÑÉ½µMÁ¡•É¥…°¡Ñ¡¥Ì¹}ÍÁ¡•É¥…°¤°ÁĞ¹…ÁÁ±åEÕ…Ñ•É¹¥½¸¡Ñ¡¥Ì¹}ÅÕ…Ñ%¹Ù•ÉÍ”¤°Ğ¹½Áä¡Ñ¡¥Ì¹Ñ…É•Ğ¤¹…‘¡ÁĞ¤°Ñ¡¥Ì¹½‰©•Ğ¹±½½­Ğ¡Ñ¡¥Ì¹Ñ…É•Ğ¤°Ñ¡¥Ì¹•¹…‰±•…µÁ¥¹œ€ôôô€„À€ü€¡Ñ¡¥Ì¹}ÍÁ¡•É¥…±•±Ñ„¹Ñ¡•Ñ„€¨ô€Ä€´Ñ¡¥Ì¹‘…µÁ¥¹…Ñ½È°Ñ¡¥Ì¹}ÍÁ¡•É¥…±•±Ñ„¹Á¡¤€¨ô€Ä€´Ñ¡¥Ì¹‘…µÁ¥¹…Ñ½È°Ñ¡¥Ì¹}Á…¹=™™Í•Ğ¹µÕ±Ñ¥Á±åM…±…È Ä€´Ñ¡¥Ì¹‘…µÁ¥¹…Ñ½È¤¤€è€¡Ñ¡¥Ì¹}ÍÁ¡•É¥…±•±Ñ„¹Í•Ğ À°€À°€À¤°Ñ¡¥Ì¹}Á…¹=™™Í•Ğ¹Í•Ğ À°€À°€À¤¤°Ñ¡¥Ì¹é½½µQ½ÕÉÍ½È€˜˜Ñ¡¥Ì¹}Á•É™½ÉµÕÉÍ½Éi½½´¤ì(€€€€€±•ĞÌ€ô¹Õ±°ì(€€€€€¥˜€¡Ñ¡¥Ì¹½‰©•Ğ¹¥ÍA•ÉÍÁ•Ñ¥Ù•…µ•É„¤ì(€€€€€€€½¹ÍĞ„€ôÁĞ¹±•¹Ñ  ¤ì(€€€€€€€Ì€ôÑ¡¥Ì¹}±…µÁ¥ÍÑ…¹”¡„€¨Ñ¡¥Ì¹}Í…±”¤ì(€€€€€€€½¹ÍĞ¼€ô„€´Ìì(€€€€€€€Ñ¡¥Ì¹½‰©•Ğ¹Á½Í¥Ñ¥½¸¹…‘‘M…±•‘Y•Ñ½È¡Ñ¡¥Ì¹}‘½±±å¥É•Ñ¥½¸°¼¤°Ñ¡¥Ì¹½‰©•Ğ¹ÕÁ‘…Ñ•5…ÑÉ¥á]½É± ¤°È€ô€„…¼ì(€€€€€ô•±Í”¥˜€¡Ñ¡¥Ì¹½‰©•Ğ¹¥Í=ÉÑ¡½É…Á¡¥…µ•É„¤ì(€€€€€€€½¹ÍĞ„€ô¹•Ü8¡Ñ¡¥Ì¹}µ½ÕÍ”¹à°Ñ¡¥Ì¹}µ½ÕÍ”¹ä°€À¤ì(€€€€€€€„¹Õ¹ÁÉ½©•Ğ¡Ñ¡¥Ì¹½‰©•Ğ¤ì(€€€€€€€½¹ÍĞ¼€ôÑ¡¥Ì¹½‰©•Ğ¹é½½´ì(€€€€€€€Ñ¡¥Ì¹½‰©•Ğ¹é½½´€ô5…Ñ ¹µ…à¡Ñ¡¥Ì¹µ¥¹i½½´°5…Ñ ¹µ¥¸¡Ñ¡¥Ì¹µ…ái½½´°Ñ¡¥Ì¹½‰©•Ğ¹é½½´€¼Ñ¡¥Ì¹}Í…±”¤¤°Ñ¡¥Ì¹½‰©•Ğ¹ÕÁ‘…Ñ•AÉ½©•Ñ¥½¹5…ÑÉ¥à ¤°È€ô¼€„ôôÑ¡¥Ì¹½‰©•Ğ¹é½½´ì(€€€€€€€½¹ÍĞ°€ô¹•Ü8¡Ñ¡¥Ì¹}µ½ÕÍ”¹à°Ñ¡¥Ì¹}µ½ÕÍ”¹ä°€À¤ì(€€€€€€€°¹Õ¹ÁÉ½©•Ğ¡Ñ¡¥Ì¹½‰©•Ğ¤°Ñ¡¥Ì¹½‰©•Ğ¹Á½Í¥Ñ¥½¸¹ÍÕˆ¡°¤¹…‘¡„¤°Ñ¡¥Ì¹½‰©•Ğ¹ÕÁ‘…Ñ•5…ÑÉ¥á]½É± ¤°Ì€ôÁĞ¹±•¹Ñ  ¤ì(€€€€€ô•±Í”(€€€€€€€½¹Í½±”¹İ…É¸ ‰]I9%9è=É‰¥Ñ½¹ÑÉ½±Ì¹©Ì•¹½Õ¹Ñ•É•…¸Õ¹­¹½İ¸…µ•É„ÑåÁ”€´é½½´Ñ¼ÕÉÍ½È‘¥Í…‰±•¸ˆ¤°Ñ¡¥Ì¹é½½µQ½ÕÉÍ½È€ô€„Äì(€€€€€Ì€„ôô¹Õ±°€˜˜€¡Ñ¡¥Ì¹ÍÉ••¹MÁ…•A…¹¹¥¹œ€üÑ¡¥Ì¹Ñ…É•Ğ¹Í•Ğ À°€À°€´Ä¤¹ÑÉ…¹Í™½Éµ¥É•Ñ¥½¸¡Ñ¡¥Ì¹½‰©•Ğ¹µ…ÑÉ¥à¤¹µÕ±Ñ¥Á±åM…±…È¡Ì¤¹…‘¡Ñ¡¥Ì¹½‰©•Ğ¹Á½Í¥Ñ¥½¸¤€è€¡1È¹½É¥¥¸¹½Áä¡Ñ¡¥Ì¹½‰©•Ğ¹Á½Í¥Ñ¥½¸¤°1È¹‘¥É•Ñ¥½¸¹Í•Ğ À°€À°€´Ä¤¹ÑÉ…¹Í™½Éµ¥É•Ñ¥½¸¡Ñ¡¥Ì¹½‰©•Ğ¹µ…ÑÉ¥à¤°5…Ñ ¹…‰Ì¡Ñ¡¥Ì¹½‰©•Ğ¹ÕÀ¹‘½Ğ¡1È¹‘¥É•Ñ¥½¸¤¤€ğµÀ€üÑ¡¥Ì¹½‰©•Ğ¹±½½­Ğ¡Ñ¡¥Ì¹Ñ…É•Ğ¤€è€¡¼¹Í•ÑÉ½µ9½Éµ…±¹‘½Á±…¹…ÉA½¥¹Ğ¡Ñ¡¥Ì¹½‰©•Ğ¹ÕÀ°Ñ¡¥Ì¹Ñ…É•Ğ¤°1È¹¥¹Ñ•ÉÍ•ÑA±…¹”¡¼°Ñ¡¥Ì¹Ñ…É•Ğ¤¤¤¤ì(€€€ô•±Í”¥˜€¡Ñ¡¥Ì¹½‰©•Ğ¹¥Í=ÉÑ¡½É…Á¡¥…µ•É„¤ì(€€€€€½¹ÍĞÌ€ôÑ¡¥Ì¹½‰©•Ğ¹é½½´ì(€€€€€Ñ¡¥Ì¹½‰©•Ğ¹é½½´€ô5…Ñ ¹µ…à¡Ñ¡¥Ì¹µ¥¹i½½´°5…Ñ ¹µ¥¸¡Ñ¡¥Ì¹µ…ái½½´°Ñ¡¥Ì¹½‰©•Ğ¹é½½´€¼Ñ¡¥Ì¹}Í…±”¤¤°Ì€„ôôÑ¡¥Ì¹½‰©•Ğ¹é½½´€˜˜€¡Ñ¡¥Ì¹½‰©•Ğ¹ÕÁ‘…Ñ•AÉ½©•Ñ¥½¹5…ÑÉ¥à ¤°È€ô€„À¤ì(€€€ô(€€€É•ÑÕÉ¸Ñ¡¥Ì¹}Í…±”€ô€Ä°Ñ¡¥Ì¹}Á•É™½ÉµÕÉÍ½Éi½½´€ô€„Ä°ÈñğÑ¡¥Ì¹}±…ÍÑA½Í¥Ñ¥½¸¹‘¥ÍÑ…¹•Q½MÅÕ…É•¡Ñ¡¥Ì¹½‰©•Ğ¹Á½Í¥Ñ¥½¸¤€ø=Ìñğ€à€¨€ Ä€´Ñ¡¥Ì¹}±…ÍÑEÕ…Ñ•É¹¥½¸¹‘½Ğ¡Ñ¡¥Ì¹½‰©•Ğ¹ÅÕ…Ñ•É¹¥½¸¤¤€ø=ÌñğÑ¡¥Ì¹}±…ÍÑQ…É•ÑA½Í¥Ñ¥½¸¹‘¥ÍÑ…¹•Q½MÅÕ…É•¡Ñ¡¥Ì¹Ñ…É•Ğ¤€ø=Ì€ü€¡Ñ¡¥Ì¹‘¥ÍÁ…Ñ¡Ù•¹Ğ¡İ¼¤°Ñ¡¥Ì¹}±…ÍÑA½Í¥Ñ¥½¸¹½Áä¡Ñ¡¥Ì¹½‰©•Ğ¹Á½Í¥Ñ¥½¸¤°Ñ¡¥Ì¹}±…ÍÑEÕ…Ñ•É¹¥½¸¹½Áä¡Ñ¡¥Ì¹½‰©•Ğ¹ÅÕ…Ñ•É¹¥½¸¤°Ñ¡¥Ì¹}±…ÍÑQ…É•ÑA½Í¥Ñ¥½¸¹½Áä¡Ñ¡¥Ì¹Ñ…É•Ğ¤°€„À¤€è€„Äì(€ô(€}•ÑÕÑ½I½Ñ…Ñ¥½¹¹±”¡”¤ì(€€€É•ÑÕÉ¸”€„ôô¹Õ±°€üĞ€¼€ØÀ€¨Ñ¡¥Ì¹…ÕÑ½I½Ñ…Ñ•MÁ••€¨”€èĞ€¼€ØÀ€¼€ØÀ€¨Ñ¡¥Ì¹…ÕÑ½I½Ñ…Ñ•MÁ••ì(€ô(€}•Ñi½½µM…±”¡”¤ì(€€€½¹ÍĞĞ€ô5…Ñ ¹…‰Ì¡”€¨€À¸ÀÄ¤ì(€€€É•ÑÕÉ¸5…Ñ ¹Á½Ü À¸äÔ°Ñ¡¥Ì¹é½½µMÁ••€¨Ğ¤ì(€ô(€}É½Ñ…Ñ•1•™Ğ¡”¤ì(€€€Ñ¡¥Ì¹}ÍÁ¡•É¥…±•±Ñ„¹Ñ¡•Ñ„€´ô”ì(€ô(€}É½Ñ…Ñ•UÀ¡”¤ì(€€€Ñ¡¥Ì¹}ÍÁ¡•É¥…±•±Ñ„¹Á¡¤€´ô”ì(€ô(€}Á…¹1•™Ğ¡”°Ğ¤ì(€€€ÁĞ¹Í•ÑÉ½µ5…ÑÉ¥á½±Õµ¸¡Ğ°€À¤°ÁĞ¹µÕ±Ñ¥Á±åM…±…È µ”¤°Ñ¡¥Ì¹}Á…¹=™™Í•Ğ¹…‘¡ÁĞ¤ì(€ô(€}Á…¹UÀ¡”°Ğ¤ì(€€€Ñ¡¥Ì¹ÍÉ••¹MÁ…•A…¹¹¥¹œ€ôôô€„À€üÁĞ¹Í•ÑÉ½µ5…ÑÉ¥á½±Õµ¸¡Ğ°€Ä¤€è€¡ÁĞ¹Í•ÑÉ½µ5…ÑÉ¥á½±Õµ¸¡Ğ°€À¤°ÁĞ¹É½ÍÍY•Ñ½ÉÌ¡Ñ¡¥Ì¹½‰©•Ğ¹ÕÀ°ÁĞ¤¤°ÁĞ¹µÕ±Ñ¥Á±åM…±…È¡”¤°Ñ¡¥Ì¹}Á…¹=™™Í•Ğ¹…‘¡ÁĞ¤ì(€ô(€}Á…¸¡”°Ğ¤ì(€€€½¹ÍĞ¤€ôÑ¡¥Ì¹‘½µ±•µ•¹Ğì(€€€¥˜€¡Ñ¡¥Ì¹½‰©•Ğ¹¥ÍA•ÉÍÁ•Ñ¥Ù•…µ•É„¤ì(€€€€€½¹ÍĞ¸€ôÑ¡¥Ì¹½‰©•Ğ¹Á½Í¥Ñ¥½¸ì(€€€€€ÁĞ¹½Áä¡¸¤¹ÍÕˆ¡Ñ¡¥Ì¹Ñ…É•Ğ¤ì(€€€€€±•ĞÈ€ôÁĞ¹±•¹Ñ  ¤ì(€€€€€È€¨ô5…Ñ ¹Ñ…¸¡Ñ¡¥Ì¹½‰©•Ğ¹™½Ø€¼€È€¨5…Ñ ¹A$€¼€ÄàÀ¤°Ñ¡¥Ì¹}Á…¹1•™Ğ È€¨”€¨È€¼¤¹±¥•¹Ñ!•¥¡Ğ°Ñ¡¥Ì¹½‰©•Ğ¹µ…ÑÉ¥à¤°Ñ¡¥Ì¹}Á…¹UÀ È€¨Ğ€¨È€¼¤¹±¥•¹Ñ!•¥¡Ğ°Ñ¡¥Ì¹½‰©•Ğ¹µ…ÑÉ¥à¤ì(€€€ô•±Í”Ñ¡¥Ì¹½‰©•Ğ¹¥Í=ÉÑ¡½É…Á¡¥…µ•É„€ü€¡Ñ¡¥Ì¹}Á…¹1•™Ğ¡”€¨€¡Ñ¡¥Ì¹½‰©•Ğ¹É¥¡Ğ€´Ñ¡¥Ì¹½‰©•Ğ¹±•™Ğ¤€¼Ñ¡¥Ì¹½‰©•Ğ¹é½½´€¼¤¹±¥•¹Ñ]¥‘Ñ °Ñ¡¥Ì¹½‰©•Ğ¹µ…ÑÉ¥à¤°Ñ¡¥Ì¹}Á…¹UÀ¡Ğ€¨€¡Ñ¡¥Ì¹½‰©•Ğ¹Ñ½À€´Ñ¡¥Ì¹½‰©•Ğ¹‰½ÑÑ½´¤€¼Ñ¡¥Ì¹½‰©•Ğ¹é½½´€¼¤¹±¥•¹Ñ!•¥¡Ğ°Ñ¡¥Ì¹½‰©•Ğ¹µ…ÑÉ¥à¤¤€è€¡½¹Í½±”¹İ…É¸ ‰]I9%9è=É‰¥Ñ½¹ÑÉ½±Ì¹©Ì•¹½Õ¹Ñ•É•…¸Õ¹­¹½İ¸…µ•É„ÑåÁ”€´Á…¸‘¥Í…‰±•¸ˆ¤°Ñ¡¥Ì¹•¹…‰±•A…¸€ô€„Ä¤ì(€ô(€}‘½±±å=ÕĞ¡”¤ì(€€€Ñ¡¥Ì¹½‰©•Ğ¹¥ÍA•ÉÍÁ•Ñ¥Ù•…µ•É„ñğÑ¡¥Ì¹½‰©•Ğ¹¥Í=ÉÑ¡½É…Á¡¥…µ•É„€üÑ¡¥Ì¹}Í…±”€¼ô”€è€¡½¹Í½±”¹İ…É¸ ‰]I9%9è=É‰¥Ñ½¹ÑÉ½±Ì¹©Ì•¹½Õ¹Ñ•É•…¸Õ¹­¹½İ¸…µ•É„ÑåÁ”€´‘½±±ä½é½½´‘¥Í…‰±•¸ˆ¤°Ñ¡¥Ì¹•¹…‰±•i½½´€ô€„Ä¤ì(€ô(€}‘½±±å%¸¡”¤ì(€€€Ñ¡¥Ì¹½‰©•Ğ¹¥ÍA•ÉÍÁ•Ñ¥Ù•…µ•É„ñğÑ¡¥Ì¹½‰©•Ğ¹¥Í=ÉÑ¡½É…Á¡¥…µ•É„€üÑ¡¥Ì¹}Í…±”€¨ô”€è€¡½¹Í½±”¹İ…É¸ ‰]I9%9è=É‰¥Ñ½¹ÑÉ½±Ì¹©Ì•¹½Õ¹Ñ•É•…¸Õ¹­¹½İ¸…µ•É„ÑåÁ”€´‘½±±ä½é½½´‘¥Í…‰±•¸ˆ¤°Ñ¡¥Ì¹•¹…‰±•i½½´€ô€„Ä¤ì(€ô(€}ÕÁ‘…Ñ•i½½µA…É…µ•Ñ•ÉÌ¡”°Ğ¤ì(€€€¥˜€ …Ñ¡¥Ì¹é½½µQ½ÕÉÍ½È¤É•ÑÕÉ¸ì(€€€Ñ¡¥Ì¹}Á•É™½ÉµÕÉÍ½Éi½½´€ô€„Àì(€€€½¹ÍĞ¤€ôÑ¡¥Ì¹‘½µ±•µ•¹Ğ¹•Ñ	½Õ¹‘¥¹±¥•¹ÑI•Ğ ¤°¸€ô”€´¤¹±•™Ğ°È€ôĞ€´¤¹Ñ½À°Ì€ô¤¹İ¥‘Ñ °„€ô¤¹¡•¥¡Ğì(€€€Ñ¡¥Ì¹}µ½ÕÍ”¹à€ô¸€¼Ì€¨€È€´€Ä°Ñ¡¥Ì¹}µ½ÕÍ”¹ä€ô€´¡È€¼„¤€¨€È€¬€Ä°Ñ¡¥Ì¹}‘½±±å¥É•Ñ¥½¸¹Í•Ğ¡Ñ¡¥Ì¹}µ½ÕÍ”¹à°Ñ¡¥Ì¹}µ½ÕÍ”¹ä°€Ä¤¹Õ¹ÁÉ½©•Ğ¡Ñ¡¥Ì¹½‰©•Ğ¤¹ÍÕˆ¡Ñ¡¥Ì¹½‰©•Ğ¹Á½Í¥Ñ¥½¸¤¹¹½Éµ…±¥é” ¤ì(€ô(€}±…µÁ¥ÍÑ…¹”¡”¤ì(€€€É•ÑÕÉ¸5…Ñ ¹µ…à¡Ñ¡¥Ì¹µ¥¹¥ÍÑ…¹”°5…Ñ ¹µ¥¸¡Ñ¡¥Ì¹µ…á¥ÍÑ…¹”°”¤¤ì(€ô(€}¡…¹‘±•5½ÕÍ•½İ¹I½Ñ…Ñ”¡”¤ì(€€€Ñ¡¥Ì¹}É½Ñ…Ñ•MÑ…ÉĞ¹Í•Ğ¡”¹±¥•¹Ñ`°”¹±¥•¹Ñd¤ì(€ô(€}¡…¹‘±•5½ÕÍ•½İ¹½±±ä¡”¤ì(€€€Ñ¡¥Ì¹}ÕÁ‘…Ñ•i½½µA…É…µ•Ñ•ÉÌ¡”¹±¥•¹Ñ`°”¹±¥•¹Ñ`¤°Ñ¡¥Ì¹}‘½±±åMÑ…ÉĞ¹Í•Ğ¡”¹±¥•¹Ñ`°”¹±¥•¹Ñd¤ì(€ô(€}¡…¹‘±•5½ÕÍ•½İ¹A…¸¡”¤ì(€€€Ñ¡¥Ì¹}Á…¹MÑ…ÉĞ¹Í•Ğ¡”¹±¥•¹Ñ`°”¹±¥•¹Ñd¤ì(€ô(€}¡…¹‘±•5½ÕÍ•5½Ù•I½Ñ…Ñ”¡”¤ì(€€€Ñ¡¥Ì¹}É½Ñ…Ñ•¹¹Í•Ğ¡”¹±¥•¹Ñ`°”¹±¥•¹Ñd¤°Ñ¡¥Ì¹}É½Ñ…Ñ••±Ñ„¹ÍÕ‰Y•Ñ½ÉÌ¡Ñ¡¥Ì¹}É½Ñ…Ñ•¹°Ñ¡¥Ì¹}É½Ñ…Ñ•MÑ…ÉĞ¤¹µÕ±Ñ¥Á±åM…±…È¡Ñ¡¥Ì¹É½Ñ…Ñ•MÁ••¤ì(€€€½¹ÍĞĞ€ôÑ¡¥Ì¹‘½µ±•µ•¹Ğì(€€€Ñ¡¥Ì¹}É½Ñ…Ñ•1•™Ğ¡Ğ€¨Ñ¡¥Ì¹}É½Ñ…Ñ••±Ñ„¹à€¼Ğ¹±¥•¹Ñ!•¥¡Ğ¤°Ñ¡¥Ì¹}É½Ñ…Ñ•UÀ¡Ğ€¨Ñ¡¥Ì¹}É½Ñ…Ñ••±Ñ„¹ä€¼Ğ¹±¥•¹Ñ!•¥¡Ğ¤°Ñ¡¥Ì¹}É½Ñ…Ñ•MÑ…ÉĞ¹½Áä¡Ñ¡¥Ì¹}É½Ñ…Ñ•¹¤°Ñ¡¥Ì¹ÕÁ‘…Ñ” ¤ì(€ô(€}¡…¹‘±•5½ÕÍ•5½Ù•½±±ä¡”¤ì(€€€Ñ¡¥Ì¹}‘½±±å¹¹Í•Ğ¡”¹±¥•¹Ñ`°”¹±¥•¹Ñd¤°Ñ¡¥Ì¹}‘½±±å•±Ñ„¹ÍÕ‰Y•Ñ½ÉÌ¡Ñ¡¥Ì¹}‘½±±å¹°Ñ¡¥Ì¹}‘½±±åMÑ…ÉĞ¤°Ñ¡¥Ì¹}‘½±±å•±Ñ„¹ä€ø€À€üÑ¡¥Ì¹}‘½±±å=ÕĞ¡Ñ¡¥Ì¹}•Ñi½½µM…±”¡Ñ¡¥Ì¹}‘½±±å•±Ñ„¹ä¤¤€èÑ¡¥Ì¹}‘½±±å•±Ñ„¹ä€ğ€À€˜˜Ñ¡¥Ì¹}‘½±±å%¸¡Ñ¡¥Ì¹}•Ñi½½µM…±”¡Ñ¡¥Ì¹}‘½±±å•±Ñ„¹ä¤¤°Ñ¡¥Ì¹}‘½±±åMÑ…ÉĞ¹½Áä¡Ñ¡¥Ì¹}‘½±±å¹¤°Ñ¡¥Ì¹ÕÁ‘…Ñ” ¤ì(€ô(€}¡…¹‘±•5½ÕÍ•5½Ù•A…¸¡”¤ì(€€€Ñ¡¥Ì¹}Á…¹¹¹Í•Ğ¡”¹±¥•¹Ñ`°”¹±¥•¹Ñd¤°Ñ¡¥Ì¹}Á…¹•±Ñ„¹ÍÕ‰Y•Ñ½ÉÌ¡Ñ¡¥Ì¹}Á…¹¹°Ñ¡¥Ì¹}Á…¹MÑ…ÉĞ¤¹µÕ±Ñ¥Á±åM…±…È¡Ñ¡¥Ì¹Á…¹MÁ••¤°Ñ¡¥Ì¹}Á…¸¡Ñ¡¥Ì¹}Á…¹•±Ñ„¹à°Ñ¡¥Ì¹}Á…¹•±Ñ„¹ä¤°Ñ¡¥Ì¹}Á…¹MÑ…ÉĞ¹½Áä¡Ñ¡¥Ì¹}Á…¹¹¤°Ñ¡¥Ì¹ÕÁ‘…Ñ” ¤ì(€ô(€}¡…¹‘±•5½ÕÍ•]¡••°¡”¤ì(€€€Ñ¡¥Ì¹}ÕÁ‘…Ñ•i½½µA…É…µ•Ñ•ÉÌ¡”¹±¥•¹Ñ`°”¹±¥•¹Ñd¤°”¹‘•±Ñ…d€ğ€À€üÑ¡¥Ì¹}‘½±±å%¸¡Ñ¡¥Ì¹}•Ñi½½µM…±”¡”¹‘•±Ñ…d¤¤€è”¹‘•±Ñ…d€ø€À€˜˜Ñ¡¥Ì¹}‘½±±å=ÕĞ¡Ñ¡¥Ì¹}•Ñi½½µM…±”¡”¹‘•±Ñ…d¤¤°Ñ¡¥Ì¹ÕÁ‘…Ñ” ¤ì(€ô(€}¡…¹‘±•-•å½İ¸¡”¤ì(€€€±•ĞĞ€ô€„Äì(€€€Íİ¥Ñ €¡”¹½‘”¤ì(€€€€€…Í”Ñ¡¥Ì¹­•åÌ¹U@è(€€€€€€€”¹ÑÉ±-•äñğ”¹µ•Ñ…-•äñğ”¹Í¡¥™Ñ-•ä€üÑ¡¥Ì¹•¹…‰±•I½Ñ…Ñ”€˜˜Ñ¡¥Ì¹}É½Ñ…Ñ•UÀ¡Ğ€¨Ñ¡¥Ì¹­•åI½Ñ…Ñ•MÁ••€¼Ñ¡¥Ì¹‘½µ±•µ•¹Ğ¹±¥•¹Ñ!•¥¡Ğ¤€èÑ¡¥Ì¹•¹…‰±•A…¸€˜˜Ñ¡¥Ì¹}Á…¸ À°Ñ¡¥Ì¹­•åA…¹MÁ••¤°Ğ€ô€„Àì(€€€€€€€‰É•…¬ì(€€€€€…Í”Ñ¡¥Ì¹­•åÌ¹	=QQ=4è(€€€€€€€”¹ÑÉ±-•äñğ”¹µ•Ñ…-•äñğ”¹Í¡¥™Ñ-•ä€üÑ¡¥Ì¹•¹…‰±•I½Ñ…Ñ”€˜˜Ñ¡¥Ì¹}É½Ñ…Ñ•UÀ µĞ€¨Ñ¡¥Ì¹­•åI½Ñ…Ñ•MÁ••€¼Ñ¡¥Ì¹‘½µ±•µ•¹Ğ¹±¥•¹Ñ!•¥¡Ğ¤€èÑ¡¥Ì¹•¹…‰±•A…¸€˜˜Ñ¡¥Ì¹}Á…¸ À°€µÑ¡¥Ì¹­•åA…¹MÁ••¤°Ğ€ô€„Àì(€€€€€€€‰É•…¬ì(€€€€€…Í”Ñ¡¥Ì¹­•åÌ¹1Pè(€€€€€€€”¹ÑÉ±-•äñğ”¹µ•Ñ…-•äñğ”¹Í¡¥™Ñ-•ä€üÑ¡¥Ì¹•¹…‰±•I½Ñ…Ñ”€˜˜Ñ¡¥Ì¹}É½Ñ…Ñ•1•™Ğ¡Ğ€¨Ñ¡¥Ì¹­•åI½Ñ…Ñ•MÁ••€¼Ñ¡¥Ì¹‘½µ±•µ•¹Ğ¹±¥•¹Ñ!•¥¡Ğ¤€èÑ¡¥Ì¹•¹…‰±•A…¸€˜˜Ñ¡¥Ì¹}Á…¸¡Ñ¡¥Ì¹­•åA…¹MÁ••°€À¤°Ğ€ô€„Àì(€€€€€€€‰É•…¬ì(€€€€€…Í”Ñ¡¥Ì¹­•åÌ¹I%!Pè(€€€€€€€”¹ÑÉ±-•äñğ”¹µ•Ñ…-•äñğ”¹Í¡¥™Ñ-•ä€üÑ¡¥Ì¹•¹…‰±•I½Ñ…Ñ”€˜˜Ñ¡¥Ì¹}É½Ñ…Ñ•1•™Ğ µĞ€¨Ñ¡¥Ì¹­•åI½Ñ…Ñ•MÁ••€¼Ñ¡¥Ì¹‘½µ±•µ•¹Ğ¹±¥•¹Ñ!•¥¡Ğ¤€èÑ¡¥Ì¹•¹…‰±•A…¸€˜˜Ñ¡¥Ì¹}Á…¸ µÑ¡¥Ì¹­•åA…¹MÁ••°€À¤°Ğ€ô€„Àì(€€€€€€€‰É•…¬ì(€€€ô(€€€Ğ€˜˜€¡”¹ÁÉ•Ù•¹Ñ•™…Õ±Ğ ¤°Ñ¡¥Ì¹ÕÁ‘…Ñ” ¤¤ì(€ô(€}¡…¹‘±•Q½Õ¡MÑ…ÉÑI½Ñ…Ñ”¡”¤ì(€€€¥˜€¡Ñ¡¥Ì¹}Á½¥¹Ñ•ÉÌ¹±•¹Ñ €ôôô€Ä¤Ñ¡¥Ì¹}É½Ñ…Ñ•MÑ…ÉĞ¹Í•Ğ¡”¹Á…•`°”¹Á…•d¤ì(€€€•±Í”ì(€€€€€½¹ÍĞĞ€ôÑ¡¥Ì¹}•ÑM•½¹‘A½¥¹Ñ•ÉA½Í¥Ñ¥½¸¡”¤°¤€ô€À¸Ô€¨€¡”¹Á…•`€¬Ğ¹à¤°¸€ô€À¸Ô€¨€¡”¹Á…•d€¬Ğ¹ä¤ì(€€€€€Ñ¡¥Ì¹}É½Ñ…Ñ•MÑ…ÉĞ¹Í•Ğ¡¤°¸¤ì(€€€ô(€ô(€}¡…¹‘±•Q½Õ¡MÑ…ÉÑA…¸¡”¤ì(€€€¥˜€¡Ñ¡¥Ì¹}Á½¥¹Ñ•ÉÌ¹±•¹Ñ €ôôô€Ä¤Ñ¡¥Ì¹}Á…¹MÑ…ÉĞ¹Í•Ğ¡”¹Á…•`°”¹Á…•d¤ì(€€€•±Í”ì(€€€€€½¹ÍĞĞ€ôÑ¡¥Ì¹}•ÑM•½¹‘A½¥¹Ñ•ÉA½Í¥Ñ¥½¸¡”¤°¤€ô€À¸Ô€¨€¡”¹Á…•`€¬Ğ¹à¤°¸€ô€À¸Ô€¨€¡”¹Á…•d€¬Ğ¹ä¤ì(€€€€€Ñ¡¥Ì¹}Á…¹MÑ…ÉĞ¹Í•Ğ¡¤°¸¤ì(€€€ô(€ô(€}¡…¹‘±•Q½Õ¡MÑ…ÉÑ½±±ä¡”¤ì(€€€½¹ÍĞĞ€ôÑ¡¥Ì¹}•ÑM•½¹‘A½¥¹Ñ•ÉA½Í¥Ñ¥½¸¡”¤°¤€ô”¹Á…•`€´Ğ¹à°¸€ô”¹Á…•d€´Ğ¹ä°È€ô5…Ñ ¹ÍÅÉĞ¡¤€¨¤€¬¸€¨¸¤ì(€€€Ñ¡¥Ì¹}‘½±±åMÑ…ÉĞ¹Í•Ğ À°È¤ì(€ô(€}¡…¹‘±•Q½Õ¡MÑ…ÉÑ½±±åA…¸¡”¤ì(€€€Ñ¡¥Ì¹•¹…‰±•i½½´€˜˜Ñ¡¥Ì¹}¡…¹‘±•Q½Õ¡MÑ…ÉÑ½±±ä¡”¤°Ñ¡¥Ì¹•¹…‰±•A…¸€˜˜Ñ¡¥Ì¹}¡…¹‘±•Q½Õ¡MÑ…ÉÑA…¸¡”¤ì(€ô(€}¡…¹‘±•Q½Õ¡MÑ…ÉÑ½±±åI½Ñ…Ñ”¡”¤ì(€€€Ñ¡¥Ì¹•¹…‰±•i½½´€˜˜Ñ¡¥Ì¹}¡…¹‘±•Q½Õ¡MÑ…ÉÑ½±±ä¡”¤°Ñ¡¥Ì¹•¹…‰±•I½Ñ…Ñ”€˜˜Ñ¡¥Ì¹}¡…¹‘±•Q½Õ¡MÑ…ÉÑI½Ñ…Ñ”¡”¤ì(€ô(€}¡…¹‘±•Q½Õ¡5½Ù•I½Ñ…Ñ”¡”¤ì(€€€¥˜€¡Ñ¡¥Ì¹}Á½¥¹Ñ•ÉÌ¹±•¹Ñ €ôô€Ä¤Ñ¡¥Ì¹}É½Ñ…Ñ•¹¹Í•Ğ¡”¹Á…•`°”¹Á…•d¤ì(€€€•±Í”ì(€€€€€½¹ÍĞ¤€ôÑ¡¥Ì¹}•ÑM•½¹‘A½¥¹Ñ•ÉA½Í¥Ñ¥½¸¡”¤°¸€ô€À¸Ô€¨€¡”¹Á…•`€¬¤¹à¤°È€ô€À¸Ô€¨€¡”¹Á…•d€¬¤¹ä¤ì(€€€€€Ñ¡¥Ì¹}É½Ñ…Ñ•¹¹Í•Ğ¡¸°È¤ì(€€€ô(€€€Ñ¡¥Ì¹}É½Ñ…Ñ••±Ñ„¹ÍÕ‰Y•Ñ½ÉÌ¡Ñ¡¥Ì¹}É½Ñ…Ñ•¹°Ñ¡¥Ì¹}É½Ñ…Ñ•MÑ…ÉĞ¤¹µÕ±Ñ¥Á±åM…±…È¡Ñ¡¥Ì¹É½Ñ…Ñ•MÁ••¤ì(€€€½¹ÍĞĞ€ôÑ¡¥Ì¹‘½µ±•µ•¹Ğì(€€€Ñ¡¥Ì¹}É½Ñ…Ñ•1•™Ğ¡Ğ€¨Ñ¡¥Ì¹}É½Ñ…Ñ••±Ñ„¹à€¼Ğ¹±¥•¹Ñ!•¥¡Ğ¤°Ñ¡¥Ì¹}É½Ñ…Ñ•UÀ¡Ğ€¨Ñ¡¥Ì¹}É½Ñ…Ñ••±Ñ„¹ä€¼Ğ¹±¥•¹Ñ!•¥¡Ğ¤°Ñ¡¥Ì¹}É½Ñ…Ñ•MÑ…ÉĞ¹½Áä¡Ñ¡¥Ì¹}É½Ñ…Ñ•¹¤ì(€ô(€}¡…¹‘±•Q½Õ¡5½Ù•A…¸¡”¤ì(€€€¥˜€¡Ñ¡¥Ì¹}Á½¥¹Ñ•ÉÌ¹±•¹Ñ €ôôô€Ä¤Ñ¡¥Ì¹}Á…¹¹¹Í•Ğ¡”¹Á…•`°”¹Á…•d¤ì(€€€•±Í”ì(€€€€€½¹ÍĞĞ€ôÑ¡¥Ì¹}•ÑM•½¹‘A½¥¹Ñ•ÉA½Í¥Ñ¥½¸¡”¤°¤€ô€À¸Ô€¨€¡”¹Á…•`€¬Ğ¹à¤°¸€ô€À¸Ô€¨€¡”¹Á…•d€¬Ğ¹ä¤ì(€€€€€Ñ¡¥Ì¹}Á…¹¹¹Í•Ğ¡¤°¸¤ì(€€€ô(€€€Ñ¡¥Ì¹}Á…¹•±Ñ„¹ÍÕ‰Y•Ñ½ÉÌ¡Ñ¡¥Ì¹}Á…¹¹°Ñ¡¥Ì¹}Á…¹MÑ…ÉĞ¤¹µÕ±Ñ¥Á±åM…±…È¡Ñ¡¥Ì¹Á…¹MÁ••¤°Ñ¡¥Ì¹}Á…¸¡Ñ¡¥Ì¹}Á…¹•±Ñ„¹à°Ñ¡¥Ì¹}Á…¹•±Ñ„¹ä¤°Ñ¡¥Ì¹}Á…¹MÑ…ÉĞ¹½Áä¡Ñ¡¥Ì¹}Á…¹¹¤ì(€ô(€}¡…¹‘±•Q½Õ¡5½Ù•½±±ä¡”¤ì(€€€½¹ÍĞĞ€ôÑ¡¥Ì¹}•ÑM•½¹‘A½¥¹Ñ•ÉA½Í¥Ñ¥½¸¡”¤°¤€ô”¹Á…•`€´Ğ¹à°¸€ô”¹Á…•d€´Ğ¹ä°È€ô5…Ñ ¹ÍÅÉĞ¡¤€¨¤€¬¸€¨¸¤ì(€€€Ñ¡¥Ì¹}‘½±±å¹¹Í•Ğ À°È¤°Ñ¡¥Ì¹}‘½±±å•±Ñ„¹Í•Ğ À°5…Ñ ¹Á½Ü¡Ñ¡¥Ì¹}‘½±±å¹¹ä€¼Ñ¡¥Ì¹}‘½±±åMÑ…ÉĞ¹ä°Ñ¡¥Ì¹é½½µMÁ••¤¤°Ñ¡¥Ì¹}‘½±±å=ÕĞ¡Ñ¡¥Ì¹}‘½±±å•±Ñ„¹ä¤°Ñ¡¥Ì¹}‘½±±åMÑ…ÉĞ¹½Áä¡Ñ¡¥Ì¹}‘½±±å¹¤ì(€€€½¹ÍĞÌ€ô€¡”¹Á…•`€¬Ğ¹à¤€¨€À¸Ô°„€ô€¡”¹Á…•d€¬Ğ¹ä¤€¨€À¸Ôì(€€€Ñ¡¥Ì¹}ÕÁ‘…Ñ•i½½µA…É…µ•Ñ•ÉÌ¡Ì°„¤ì(€ô(€}¡…¹‘±•Q½Õ¡5½Ù•½±±åA…¸¡”¤ì(€€€Ñ¡¥Ì¹•¹…‰±•i½½´€˜˜Ñ¡¥Ì¹}¡…¹‘±•Q½Õ¡5½Ù•½±±ä¡”¤°Ñ¡¥Ì¹•¹…‰±•A…¸€˜˜Ñ¡¥Ì¹}¡…¹‘±•Q½Õ¡5½Ù•A…¸¡”¤ì(€ô(€}¡…¹‘±•Q½Õ¡5½Ù•½±±åI½Ñ…Ñ”¡”¤ì(€€€Ñ¡¥Ì¹•¹…‰±•i½½´€˜˜Ñ¡¥Ì¹}¡…¹‘±•Q½Õ¡5½Ù•½±±ä¡”¤°Ñ¡¥Ì¹•¹…‰±•I½Ñ…Ñ”€˜˜Ñ¡¥Ì¹}¡…¹‘±•Q½Õ¡5½Ù•I½Ñ…Ñ”¡”¤ì(€ô(€}…‘‘A½¥¹Ñ•È¡”¤ì(€€€Ñ¡¥Ì¹}Á½¥¹Ñ•ÉÌ¹ÁÕÍ ¡”¹Á½¥¹Ñ•É%¤ì(€ô(€}É•µ½Ù•A½¥¹Ñ•È¡”¤ì(€€€‘•±•Ñ”Ñ¡¥Ì¹}Á½¥¹Ñ•ÉA½Í¥Ñ¥½¹Ím”¹Á½¥¹Ñ•É%‘tì(€€€™½È€¡±•ĞĞ€ô€ÀìĞ€ğÑ¡¥Ì¹}Á½¥¹Ñ•ÉÌ¹±•¹Ñ ìĞ¬¬¤¥˜€¡Ñ¡¥Ì¹}Á½¥¹Ñ•ÉÍmÑt€ôô”¹Á½¥¹Ñ•É%¤ì(€€€€€Ñ¡¥Ì¹}Á½¥¹Ñ•ÉÌ¹ÍÁ±¥”¡Ğ°€Ä¤ì(€€€€€É•ÑÕÉ¸ì(€€€ô(€ô(€}¥ÍQÉ…­¥¹A½¥¹Ñ•È¡”¤ì(€€€™½È€¡±•ĞĞ€ô€ÀìĞ€ğÑ¡¥Ì¹}Á½¥¹Ñ•ÉÌ¹±•¹Ñ ìĞ¬¬¤¥˜€¡Ñ¡¥Ì¹}Á½¥¹Ñ•ÉÍmÑt€ôô”¹Á½¥¹Ñ•É%¤É•ÑÕÉ¸€„Àì(€€€É•ÑÕÉ¸€„Äì(€ô(€}ÑÉ…­A½¥¹Ñ•È¡”¤ì(€€€±•ĞĞ€ôÑ¡¥Ì¹}Á½¥¹Ñ•ÉA½Í¥Ñ¥½¹Ím”¹Á½¥¹Ñ•É%‘tì(€€€Ğ€ôôôÙ½¥€À€˜˜€¡Ğ€ô¹•Ü” ¤°Ñ¡¥Ì¹}Á½¥¹Ñ•ÉA½Í¥Ñ¥½¹Ím”¹Á½¥¹Ñ•É%‘t€ôĞ¤°Ğ¹Í•Ğ¡”¹Á…•`°”¹Á…•d¤ì(€ô(€}•ÑM•½¹‘A½¥¹Ñ•ÉA½Í¥Ñ¥½¸¡”¤ì(€€€½¹ÍĞĞ€ô”¹Á½¥¹Ñ•É%€ôôôÑ¡¥Ì¹}Á½¥¹Ñ•ÉÍlÁt€üÑ¡¥Ì¹}Á½¥¹Ñ•ÉÍlÅt€èÑ¡¥Ì¹}Á½¥¹Ñ•ÉÍlÁtì(€€€É•ÑÕÉ¸Ñ¡¥Ì¹}Á½¥¹Ñ•ÉA½Í¥Ñ¥½¹ÍmÑtì(€ô(€}ÕÍÑ½µ]¡••±Ù•¹Ğ¡”¤ì(€€€½¹ÍĞĞ€ô”¹‘•±Ñ…5½‘”°¤€ôì(€€€€€±¥•¹Ñ`è”¹±¥•¹Ñ`°(€€€€€±¥•¹Ñdè”¹±¥•¹Ñd°(€€€€€‘•±Ñ…dè”¹‘•±Ñ…d(€€€ôì(€€€Íİ¥Ñ €¡Ğ¤ì(€€€€€…Í”€Äè(€€€€€€€¤¹‘•±Ñ…d€¨ô€ÄØì(€€€€€€€‰É•…¬ì(€€€€€…Í”€Èè(€€€€€€€¤¹‘•±Ñ…d€¨ô€ÄÀÀì(€€€€€€€‰É•…¬ì(€€€ô(€€€É•ÑÕÉ¸”¹ÑÉ±-•ä€˜˜€…Ñ¡¥Ì¹}½¹ÑÉ½±Ñ¥Ù”€˜˜€¡¤¹‘•±Ñ…d€¨ô€ÄÀ¤°¤ì(€ô)ôì)™Õ¹Ñ¥½¸}À¡”¤ì(€Ñ¡¥Ì¹•¹…‰±•€„ôô€„Ä€˜˜€¡Ñ¡¥Ì¹}Á½¥¹Ñ•ÉÌ¹±•¹Ñ €ôôô€À€˜˜€¡Ñ¡¥Ì¹‘½µ±•µ•¹Ğ¹Í•ÑA½¥¹Ñ•É…ÁÑÕÉ”¡”¹Á½¥¹Ñ•É%¤°Ñ¡¥Ì¹‘½µ±•µ•¹Ğ¹½İ¹•É½Õµ•¹Ğ¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰Á½¥¹Ñ•Éµ½Ù”ˆ°Ñ¡¥Ì¹}½¹A½¥¹Ñ•É5½Ù”¤°Ñ¡¥Ì¹‘½µ±•µ•¹Ğ¹½İ¹•É½Õµ•¹Ğ¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰Á½¥¹Ñ•ÉÕÀˆ°Ñ¡¥Ì¹}½¹A½¥¹Ñ•ÉUÀ¤¤°€…Ñ¡¥Ì¹}¥ÍQÉ…­¥¹A½¥¹Ñ•È¡”¤€˜˜€¡Ñ¡¥Ì¹}…‘‘A½¥¹Ñ•È¡”¤°”¹Á½¥¹Ñ•ÉQåÁ”€ôôô€‰Ñ½Õ ˆ€üÑ¡¥Ì¹}½¹Q½Õ¡MÑ…ÉĞ¡”¤€èÑ¡¥Ì¹}½¹5½ÕÍ•½İ¸¡”¤°Ñ¡¥Ì¹}ÕÉÍ½ÉMÑå±”€ôôô€‰É…ˆˆ€˜˜€¡Ñ¡¥Ì¹‘½µ±•µ•¹Ğ¹ÍÑå±”¹ÕÉÍ½È€ô€‰É…‰‰¥¹œˆ¤¤¤ì)ô)™Õ¹Ñ¥½¸ÙÀ¡”¤ì(€Ñ¡¥Ì¹•¹…‰±•€„ôô€„Ä€˜˜€¡”¹Á½¥¹Ñ•ÉQåÁ”€ôôô€‰Ñ½Õ ˆ€üÑ¡¥Ì¹}½¹Q½Õ¡5½Ù”¡”¤€èÑ¡¥Ì¹}½¹5½ÕÍ•5½Ù”¡”¤¤ì)ô)™Õ¹Ñ¥½¸‰À¡”¤ì(€Íİ¥Ñ €¡Ñ¡¥Ì¹}É•µ½Ù•A½¥¹Ñ•È¡”¤°Ñ¡¥Ì¹}Á½¥¹Ñ•ÉÌ¹±•¹Ñ ¤ì(€€€…Í”€Àè(€€€€€Ñ¡¥Ì¹‘½µ±•µ•¹Ğ¹É•±•…Í•A½¥¹Ñ•É…ÁÑÕÉ”¡”¹Á½¥¹Ñ•É%¤°Ñ¡¥Ì¹‘½µ±•µ•¹Ğ¹½İ¹•É½Õµ•¹Ğ¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰Á½¥¹Ñ•Éµ½Ù”ˆ°Ñ¡¥Ì¹}½¹A½¥¹Ñ•É5½Ù”¤°Ñ¡¥Ì¹‘½µ±•µ•¹Ğ¹½İ¹•É½Õµ•¹Ğ¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰Á½¥¹Ñ•ÉÕÀˆ°Ñ¡¥Ì¹}½¹A½¥¹Ñ•ÉUÀ¤°Ñ¡¥Ì¹‘¥ÍÁ…Ñ¡Ù•¹Ğ¡°¤°Ñ¡¥Ì¹ÍÑ…Ñ”€ô€‘”¹9=9°Ñ¡¥Ì¹}ÕÉÍ½ÉMÑå±”€ôôô€‰É…ˆˆ€˜˜€¡Ñ¡¥Ì¹‘½µ±•µ•¹Ğ¹ÍÑå±”¹ÕÉÍ½È€ô€‰É…ˆˆ¤ì(€€€€€‰É•…¬ì(€€€…Í”€Äè(€€€€€½¹ÍĞĞ€ôÑ¡¥Ì¹}Á½¥¹Ñ•ÉÍlÁt°¤€ôÑ¡¥Ì¹}Á½¥¹Ñ•ÉA½Í¥Ñ¥½¹ÍmÑtì(€€€€€Ñ¡¥Ì¹}½¹Q½Õ¡MÑ…ÉĞ¡ì(€€€€€€€Á½¥¹Ñ•É%èĞ°(€€€€€€€Á…•`è¤¹à°(€€€€€€€Á…•dè¤¹ä(€€€€€ô¤ì(€€€€€‰É•…¬ì(€ô)ô)™Õ¹Ñ¥½¸5À¡”¤ì(€±•ĞĞì(€Íİ¥Ñ €¡”¹‰ÕÑÑ½¸¤ì(€€€…Í”€Àè(€€€€€Ğ€ôÑ¡¥Ì¹µ½ÕÍ•	ÕÑÑ½¹Ì¹1Pì(€€€€€‰É•…¬ì(€€€…Í”€Äè(€€€€€Ğ€ôÑ¡¥Ì¹µ½ÕÍ•	ÕÑÑ½¹Ì¹5%1ì(€€€€€‰É•…¬ì(€€€…Í”€Èè(€€€€€Ğ€ôÑ¡¥Ì¹µ½ÕÍ•	ÕÑÑ½¹Ì¹I%!Pì(€€€€€‰É•…¬ì(€€€‘•™…Õ±Ğè(€€€€€Ğ€ô€´Äì(€ô(€Íİ¥Ñ €¡Ğ¤ì(€€€…Í”Á¸¹=11dè(€€€€€¥˜€¡Ñ¡¥Ì¹•¹…‰±•i½½´€ôôô€„Ä¤É•ÑÕÉ¸ì(€€€€€Ñ¡¥Ì¹}¡…¹‘±•5½ÕÍ•½İ¹½±±ä¡”¤°Ñ¡¥Ì¹ÍÑ…Ñ”€ô€‘”¹=11dì(€€€€€‰É•…¬ì(€€€…Í”Á¸¹I=QQè(€€€€€¥˜€¡”¹ÑÉ±-•äñğ”¹µ•Ñ…-•äñğ”¹Í¡¥™Ñ-•ä¤ì(€€€€€€€¥˜€¡Ñ¡¥Ì¹•¹…‰±•A…¸€ôôô€„Ä¤É•ÑÕÉ¸ì(€€€€€€€Ñ¡¥Ì¹}¡…¹‘±•5½ÕÍ•½İ¹A…¸¡”¤°Ñ¡¥Ì¹ÍÑ…Ñ”€ô€‘”¹A8ì(€€€€€ô•±Í”ì(€€€€€€€¥˜€¡Ñ¡¥Ì¹•¹…‰±•I½Ñ…Ñ”€ôôô€„Ä¤É•ÑÕÉ¸ì(€€€€€€€Ñ¡¥Ì¹}¡…¹‘±•5½ÕÍ•½İ¹I½Ñ…Ñ”¡”¤°Ñ¡¥Ì¹ÍÑ…Ñ”€ô€‘”¹I=QQì(€€€€€ô(€€€€€‰É•…¬ì(€€€…Í”Á¸¹A8è(€€€€€¥˜€¡”¹ÑÉ±-•äñğ”¹µ•Ñ…-•äñğ”¹Í¡¥™Ñ-•ä¤ì(€€€€€€€¥˜€¡Ñ¡¥Ì¹•¹…‰±•I½Ñ…Ñ”€ôôô€„Ä¤É•ÑÕÉ¸ì(€€€€€€€Ñ¡¥Ì¹}¡…¹‘±•5½ÕÍ•½İ¹I½Ñ…Ñ”¡”¤°Ñ¡¥Ì¹ÍÑ…Ñ”€ô€‘”¹I=QQì(€€€€€ô•±Í”ì(€€€€€€€¥˜€¡Ñ¡¥Ì¹•¹…‰±•A…¸€ôôô€„Ä¤É•ÑÕÉ¸ì(€€€€€€€Ñ¡¥Ì¹}¡…¹‘±•5½ÕÍ•½İ¹A…¸¡”¤°Ñ¡¥Ì¹ÍÑ…Ñ”€ô€‘”¹A8ì(€€€€€ô(€€€€€‰É•…¬ì(€€€‘•™…Õ±Ğè(€€€€€Ñ¡¥Ì¹ÍÑ…Ñ”€ô€‘”¹9=9ì(€ô(€Ñ¡¥Ì¹ÍÑ…Ñ”€„ôô€‘”¹9=9€˜˜Ñ¡¥Ì¹‘¥ÍÁ…Ñ¡Ù•¹Ğ¡•„¤ì)ô)™Õ¹Ñ¥½¸áÀ¡”¤ì(€Íİ¥Ñ €¡Ñ¡¥Ì¹ÍÑ…Ñ”¤ì(€€€…Í”€‘”¹I=QQè(€€€€€¥˜€¡Ñ¡¥Ì¹•¹…‰±•I½Ñ…Ñ”€ôôô€„Ä¤É•ÑÕÉ¸ì(€€€€€Ñ¡¥Ì¹}¡…¹‘±•5½ÕÍ•5½Ù•I½Ñ…Ñ”¡”¤ì(€€€€€‰É•…¬ì(€€€…Í”€‘”¹=11dè(€€€€€¥˜€¡Ñ¡¥Ì¹•¹…‰±•i½½´€ôôô€„Ä¤É•ÑÕÉ¸ì(€€€€€Ñ¡¥Ì¹}¡…¹‘±•5½ÕÍ•5½Ù•½±±ä¡”¤ì(€€€€€‰É•…¬ì(€€€…Í”€‘”¹A8è(€€€€€¥˜€¡Ñ¡¥Ì¹•¹…‰±•A…¸€ôôô€„Ä¤É•ÑÕÉ¸ì(€€€€€Ñ¡¥Ì¹}¡…¹‘±•5½ÕÍ•5½Ù•A…¸¡”¤ì(€€€€€‰É•…¬ì(€ô)ô)™Õ¹Ñ¥½¸MÀ¡”¤ì(€Ñ¡¥Ì¹•¹…‰±•€ôôô€„ÄñğÑ¡¥Ì¹•¹…‰±•i½½´€ôôô€„ÄñğÑ¡¥Ì¹ÍÑ…Ñ”€„ôô€‘”¹9=9ñğ€¡”¹ÁÉ•Ù•¹Ñ•™…Õ±Ğ ¤°Ñ¡¥Ì¹‘¥ÍÁ…Ñ¡Ù•¹Ğ¡•„¤°Ñ¡¥Ì¹}¡…¹‘±•5½ÕÍ•]¡••°¡Ñ¡¥Ì¹}ÕÍÑ½µ]¡••±Ù•¹Ğ¡”¤¤°Ñ¡¥Ì¹‘¥ÍÁ…Ñ¡Ù•¹Ğ¡°¤¤ì)ô)™Õ¹Ñ¥½¸åÀ¡”¤ì(€Ñ¡¥Ì¹•¹…‰±•€„ôô€„Ä€˜˜Ñ¡¥Ì¹}¡…¹‘±•-•å½İ¸¡”¤ì)ô)™Õ¹Ñ¥½¸À¡”¤ì(€Íİ¥Ñ €¡Ñ¡¥Ì¹}ÑÉ…­A½¥¹Ñ•È¡”¤°Ñ¡¥Ì¹}Á½¥¹Ñ•ÉÌ¹±•¹Ñ ¤ì(€€€…Í”€Äè(€€€€€Íİ¥Ñ €¡Ñ¡¥Ì¹Ñ½Õ¡•Ì¹=9¤ì(€€€€€€€…Í”™¸¹I=QQè(€€€€€€€€€¥˜€¡Ñ¡¥Ì¹•¹…‰±•I½Ñ…Ñ”€ôôô€„Ä¤É•ÑÕÉ¸ì(€€€€€€€€€Ñ¡¥Ì¹}¡…¹‘±•Q½Õ¡MÑ…ÉÑI½Ñ…Ñ”¡”¤°Ñ¡¥Ì¹ÍÑ…Ñ”€ô€‘”¹Q=U!}I=QQì(€€€€€€€€€‰É•…¬ì(€€€€€€€…Í”™¸¹A8è(€€€€€€€€€¥˜€¡Ñ¡¥Ì¹•¹…‰±•A…¸€ôôô€„Ä¤É•ÑÕÉ¸ì(€€€€€€€€€Ñ¡¥Ì¹}¡…¹‘±•Q½Õ¡MÑ…ÉÑA…¸¡”¤°Ñ¡¥Ì¹ÍÑ…Ñ”€ô€‘”¹Q=U!}A8ì(€€€€€€€€€‰É•…¬ì(€€€€€€€‘•™…Õ±Ğè(€€€€€€€€€Ñ¡¥Ì¹ÍÑ…Ñ”€ô€‘”¹9=9ì(€€€€€ô(€€€€€‰É•…¬ì(€€€…Í”€Èè(€€€€€Íİ¥Ñ €¡Ñ¡¥Ì¹Ñ½Õ¡•Ì¹Q]<¤ì(€€€€€€€…Í”™¸¹=11e}A8è(€€€€€€€€€¥˜€¡Ñ¡¥Ì¹•¹…‰±•i½½´€ôôô€„Ä€˜˜Ñ¡¥Ì¹•¹…‰±•A…¸€ôôô€„Ä¤É•ÑÕÉ¸ì(€€€€€€€€€Ñ¡¥Ì¹}¡…¹‘±•Q½Õ¡MÑ…ÉÑ½±±åA…¸¡”¤°Ñ¡¥Ì¹ÍÑ…Ñ”€ô€‘”¹Q=U!}=11e}A8ì(€€€€€€€€€‰É•…¬ì(€€€€€€€…Í”™¸¹=11e}I=QQè(€€€€€€€€€¥˜€¡Ñ¡¥Ì¹•¹…‰±•i½½´€ôôô€„Ä€˜˜Ñ¡¥Ì¹•¹…‰±•I½Ñ…Ñ”€ôôô€„Ä¤É•ÑÕÉ¸ì(€€€€€€€€€Ñ¡¥Ì¹}¡…¹‘±•Q½Õ¡MÑ…ÉÑ½±±åI½Ñ…Ñ”¡”¤°Ñ¡¥Ì¹ÍÑ…Ñ”€ô€‘”¹Q=U!}=11e}I=QQì(€€€€€€€€€‰É•…¬ì(€€€€€€€‘•™…Õ±Ğè(€€€€€€€€€Ñ¡¥Ì¹ÍÑ…Ñ”€ô€‘”¹9=9ì(€€€€€ô(€€€€€‰É•…¬ì(€€€‘•™…Õ±Ğè(€€€€€Ñ¡¥Ì¹ÍÑ…Ñ”€ô€‘”¹9=9ì(€ô(€Ñ¡¥Ì¹ÍÑ…Ñ”€„ôô€‘”¹9=9€˜˜Ñ¡¥Ì¹‘¥ÍÁ…Ñ¡Ù•¹Ğ¡•„¤ì)ô)™Õ¹Ñ¥½¸QÀ¡”¤ì(€Íİ¥Ñ €¡Ñ¡¥Ì¹}ÑÉ…­A½¥¹Ñ•È¡”¤°Ñ¡¥Ì¹ÍÑ…Ñ”¤ì(€€€…Í”€‘”¹Q=U!}I=QQè(€€€€€¥˜€¡Ñ¡¥Ì¹•¹…‰±•I½Ñ…Ñ”€ôôô€„Ä¤É•ÑÕÉ¸ì(€€€€€Ñ¡¥Ì¹}¡…¹‘±•Q½Õ¡5½Ù•I½Ñ…Ñ”¡”¤°Ñ¡¥Ì¹ÕÁ‘…Ñ” ¤ì(€€€€€‰É•…¬ì(€€€…Í”€‘”¹Q=U!}A8è(€€€€€¥˜€¡Ñ¡¥Ì¹•¹…‰±•A…¸€ôôô€„Ä¤É•ÑÕÉ¸ì(€€€€€Ñ¡¥Ì¹}¡…¹‘±•Q½Õ¡5½Ù•A…¸¡”¤°Ñ¡¥Ì¹ÕÁ‘…Ñ” ¤ì(€€€€€‰É•…¬ì(€€€…Í”€‘”¹Q=U!}=11e}A8è(€€€€€¥˜€¡Ñ¡¥Ì¹•¹…‰±•i½½´€ôôô€„Ä€˜˜Ñ¡¥Ì¹•¹…‰±•A…¸€ôôô€„Ä¤É•ÑÕÉ¸ì(€€€€€Ñ¡¥Ì¹}¡…¹‘±•Q½Õ¡5½Ù•½±±åA…¸¡”¤°Ñ¡¥Ì¹ÕÁ‘…Ñ” ¤ì(€€€€€‰É•…¬ì(€€€…Í”€‘”¹Q=U!}=11e}I=QQè(€€€€€¥˜€¡Ñ¡¥Ì¹•¹…‰±•i½½´€ôôô€„Ä€˜˜Ñ¡¥Ì¹•¹…‰±•I½Ñ…Ñ”€ôôô€„Ä¤É•ÑÕÉ¸ì(€€€€€Ñ¡¥Ì¹}¡…¹‘±•Q½Õ¡5½Ù•½±±åI½Ñ…Ñ”¡”¤°Ñ¡¥Ì¹ÕÁ‘…Ñ” ¤ì(€€€€€‰É•…¬ì(€€€‘•™…Õ±Ğè(€€€€€Ñ¡¥Ì¹ÍÑ…Ñ”€ô€‘”¹9=9ì(€ô)ô)™Õ¹Ñ¥½¸À¡”¤ì(€Ñ¡¥Ì¹•¹…‰±•€„ôô€„Ä€˜˜”¹ÁÉ•Ù•¹Ñ•™…Õ±Ğ ¤ì)ô)™Õ¹Ñ¥½¸IÀ¡”¤ì(€”¹­•ä€ôôô€‰½¹ÑÉ½°ˆ€˜˜€¡Ñ¡¥Ì¹}½¹ÑÉ½±Ñ¥Ù”€ô€„À°Ñ¡¥Ì¹‘½µ±•µ•¹Ğ¹•ÑI½½Ñ9½‘” ¤¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰­•åÕÀˆ°Ñ¡¥Ì¹}¥¹Ñ•É•ÁÑ½¹ÑÉ½±UÀ°ì(€€€Á…ÍÍ¥Ù”è€„À°(€€€…ÁÑÕÉ”è€„À(€ô¤¤ì)ô)™Õ¹Ñ¥½¸İÀ¡”¤ì(€”¹­•ä€ôôô€‰½¹ÑÉ½°ˆ€˜˜€¡Ñ¡¥Ì¹}½¹ÑÉ½±Ñ¥Ù”€ô€„Ä°Ñ¡¥Ì¹‘½µ±•µ•¹Ğ¹•ÑI½½Ñ9½‘” ¤¹É•µ½Ù•Ù•¹Ñ1¥ÍÑ•¹•È ‰­•åÕÀˆ°Ñ¡¥Ì¹}¥¹Ñ•É•ÁÑ½¹ÑÉ½±UÀ°ì(€€€Á…ÍÍ¥Ù”è€„À°(€€€…ÁÑÕÉ”è€„À(€ô¤¤ì)ô)Ù…ÈÀ€ô€¡™Õ¹Ñ¥½¸ ¤ì(€Ù…È”€ô€‰ˆå ÜåQ•‰‰‰”áØå‰ˆåÙÕÕÕÕÕ•Ôå¥ÕÕÕˆå•Õ•Ôå¥ÕÕÕ•Õ¥á­‰•••‘‘‘‘¥±±Ù¥•‰•½İ•Õ•¨é‘­Èí9•Å¼åQ\åPåYXäÕ‘‰ ååäÌå ÜåPåå(å ÈÈåå)ĞåYXİ‰ˆáåQ\Üå<åXå]Ğåå-\å(åXå-\åİ]YÑ\äĞåŒäÄå4å5]Y‰•dåQ\Üå<åXå]Ğåå-\å(åXå-\ØåTå-\äĞåŒäÄå4å5]Y‰‘åQ\Üå<åXå]Ğåå-\å(åXå-\ØåTå-\äĞåÑ]äÅ\åTå)]‰¥0åQ\Üå<åXå]Ğåå-\å(åXå-]Lå@ÉÑ]XåÀå)Ñ‰±,åQ\Üå<åXå]Ğåå-\å(åXå-]Lå@ÉÑ]XåÈäÄå!Ñ‰Ù0åQ\Üå<åXå]Ğåå-\å(åXå-]Lå@ÉÑ]YPäĞå]‰½dåQ\Üå<åXå]Ğåå-\å(åXå-]Lå@ÉÑ]Y(åXÈåYY‰É°Üå%XåI‰İÄéYi­‘‰¬éae¤ÕÕäé‘Ôá)©©©©‰¨í­ˆåIØá-©©©©‰Œäé¡½‘¹…±Qµ‰Õ¡½…¥I‰‰ÉŒí]•Œé”å¡µ‰…ÉÍİ”Áµ‰Œäé¡½…±Õ™…‘Ñ‰…İ…‘™É-……İÅ…É…ÄÁ¬Ùµ‰…¥•™¡á¨í…‰…åUŒí]‰©‘…‘„Á¡µ…¥…±™A…ÈåI½…‘™¡Í…Ù…½…‘èé©©©©‰é•Y¡!‰¡=‘¹‘¹¥¹…•…<å¹µ•…A…àåI…Ùµ‘…µ…•…<åI…=…µ™½…”ÙÍ™±Œå]¡…‰…=…É™¡a…•Ñ¡E…á…™¡¥…=…•…½…•…¼ÙåI¡1…±°Ñ¥™Ñ¡-…é¨í‰™…™¡e‰ á…é©‘™¡…! Í¥¹‰ Õ‘¹…İQµ‰…á„áÑ™I‰‰ Õ­‰ á…é¨í‰™¡Å¥¹…¥ á‘¹‘¹‘¹‘¹„Õ„á•ĞÑ¥½Œäé™A‘•‰‘­…A„áåI…ÙµÉ…é¨í‰™„á…É™„á…èé©©©©ˆá„á…™¡¥á‘­…é¨í‰™„á…É™‰…èé­©©©ˆá„á¡¥á•­…A„áåI…,ÙµÙ„á…-™¡¥‘¹…Qµ‰…A…¤åI,Ùµ‰…½‘ÑŒéÄéé©‰™¨éé©‰…İ¡…é¡É‰¡±¥¹…É½Œå]™¡…Å™¡É‘¹‘¹‘¹‘¹‘¹‘¹……„á…¡¼Ñ™I‰‰…±½Ñ¥‘Ñ™å‘‰A‰•‘Ù¥ÙÙÙ±Ù­…ÈåˆàÍ‰İ…ÈåˆàÍ‰‰á±­…É‰…¥I‰‘…¤áa‰ˆåŒéŒéÅ¨é‰ÜäèåŒéÄíŒÄé$Å”éåŒéˆéŒé”Åèäéœå©©©©©èé‘œá(åÅàÙ‰‰…Å…½™É™‰…¥‘™„á(åŒá8Äé9™¡I‰‰…œå©©©©©Üé‘œá(åÅàÙ‰‰…ÉY™‰…¡„á(åŒá4Äé9™¡I‰‰…œå©©©©©°é‘œá(åÅàÙ‰‰…ÉŒİ™‰…¡„á(åŒá0Äé9™¡I‰‰…œå©©©©©é‘œá(åÅàÙ‰‰…ÉÑ™‰…¡„á(åŒá,Äé9™¡I‰‰…œå©©©©©”é‘œá(åÅàÙ‰‰…ÉŒäÅ™‰…¡„á(åŒá(Äé9™¡I‰‰…œå©©©¨í…ˆé‘œá(åÅàÙ‰‰…ÉŒÑ™‰…¡„á(åœÄé9™¡I‰‰…œå©©©©„é‘œá(åÅàÙ‰‰…ÉŒäÍ™‰…¡„á(å Äé9™¡I‰‰…œå©©©©èé‘œåÅàÙ‰‰…ÉŒäÑ™‰…¡…œå„Äé9™¡I‰‰…¤áa‰”åŒéŒéÅ¨é‰ÜäèåŒéÄíŒÄé$Å”éåŒéˆéŒé”Åèäéœå©©©©©èé‘œá(åÅàÙ‰‰…ÉŒäÕ™‰…¡„á(åŒá8Äé9™¥I‰‰…œå©©©©©Üé‘œá(åÅàÙ‰‰…ÉŒäÙ™‰…¥„á(åŒá4Äé9™¥I‰‰…œå©©©©©°é‘œá(åÅàÙ‰‰…ÉŒäİ™‰…¥„á(åŒá0Äé9™¥I‰‰…œå©©©©©é‘œá(åÅàÙ‰‰…ÉŒäá™‰…¥„á(åŒá,Äé9™¥I‰‰…œå©©©©©”é‘œá(åÅàÙ‰‰…ÉŒäå™‰…¥„á(åŒá(Äé9™¥I‰‰…œå©©©¨í…ˆé‘œá(åÅàÙ‰‰…ÉŒäé™‰…¥„á(åœÄé9™¥I‰‰…œå©©©©„é‘œá(åÅàÙ‰‰…ÉÕ™‰…¥„á(å Äé9™¥I‰‰…œå©©©©èé‘œåÅàÙ‰‰…¥…œå„Äé9™¡¥á¥­…É…¥I‰±…¥I‰‰¡¼Ñœá-„á-¥Mœá-àÙ‰‰…Å…½™É™…¥±™„á-™œá-I‰‰…¡°Ñ¥œá1„á1¥Mœá1àÙ‰‰…ÉY™„á-„á1™œá-I‰‰…¡Ñ¥œá1„á1¥Mœá1àÙ‰‰…ÉŒİ™„á-„á1™œá-I‰‰…¡¥¡…¡¥M¡àÙ‰‰…ÉÑ™„á-…¡™œá-I‰‰…¥I‰•¡¼Ñœá1„á1¥Mœá1àÙ‰‰…ÉŒäÅ™„á-„á1™œá-I‰‰…¡°Ñ¥œá1„á1¥Mœá1àÙ‰‰…ÉŒÑ™„á-„á1™œá-I‰‰…¡Ñ¥œá1„á1¥Mœá1àÙ‰‰…ÉŒäÍ™„á-„á1™œá-I‰‰…¡¥¡…¡¥M¡àÙ‰‰…ÉŒäÑ™„á-…¡™œá-I‰‰…¥I‰‘¡¼Ñœá1„á1¥Mœá1àÙ‰‰…ÉŒäÕ™„á-„á1™œá-I‰‰…¡°Ñ¥œá1„á1¥Mœá1àÙ‰‰…ÉŒäÙ™„á-„á1™œá-I‰‰…¡Ñ¥œá1„á1¥Mœá1àÙ‰‰…ÉŒäİ™„á-„á1™œá-I‰‰…¡¥¡…¡¥M¡àÙ‰‰…ÉŒäá™„á-…¡™¡I‰‰…¥I‰¥¥¼Ñœá-„á-¥Mœá-àÙ‰‰…ÉŒäå™…¡„á-™¡I‰‰…¥°Ñ¥œá-„á-¥Mœá-àÙ‰‰…ÉŒäé™…¡„á-™¡I‰‰…¥Ñ¥œá-„á-¥Mœá-àÙ‰‰…ÉÕ™…¡„á-™ÉI‰‰…¥¥¥…¥¥M¥àÙ‰‰…É…¥™¡¥á‘­…É…¥I‰İ…¥I‰‰¡°Ñœá-„á-ÍMœá-àÙ‰‰…Å…½™É™…¥İ™„á-™œá-I‰‰…¡Í¡…¡ÍM¡àÙ‰‰…ÉY™„á-…¡™¡I‰‰…¥I‰•œá-°Ñœá1„á1ÍMœá1àÙ‰‰…ÉŒİ™…¡„á1™¡I‰‰„á-Íœá-„á-ÍMœá-àÙ‰‰…ÉÑ™…¡„á-™¡I‰‰…¥I‰‘œá-°Ñœá1„á1ÍMœá1àÙ‰‰…ÉŒäÅ™…¡„á1™¡I‰‰„á-Íœá-„á-ÍMœá-àÙ‰‰…ÉŒÑ™…¡„á-™¡I‰‰…¥I‰¥œá-°Ñœá1„á1ÍMœá1àÙ‰‰…ÉŒäÍ™…¡„á1™¡I‰‰„á-Íœá-„á-ÍMœá-àÙ‰‰…ÉŒäÑ™…¡„á-™¡I‰‰…¥I‰±œá-°Ñœá1„á1ÍMœá1àÙ‰‰…ÉŒäÕ™…¡„á1™¡I‰‰„á-Íœá-„á-ÍMœá-àÙ‰‰…ÉŒäÙ™…¡„á-™¡I‰‰…¥I‰Ùœá-°Ñœá1„á1ÍMœá1àÙ‰‰…ÉŒäİ™…¡„á1™¡I‰‰„á-Íœá-„á-ÍMœá-àÙ‰‰…ÉŒäá™…¡„á-™¡I‰‰…¥I‰½œá-°Ñœá1„á1ÍMœá1àÙ‰‰…ÉŒäå™…¡„á1™¡I‰‰„á-Íœá-„á-ÍMœá-àÙ‰‰…ÉŒäé™…¡„á-™¡I‰‰…¥I‰É¥°Ñœá-„á-ÍMœá-àÙ‰‰…ÉÕ™…¡„á-™ÉI‰‰…¥Í¥…¥ÍM¥àÙ‰‰…É…¥™¡¥á•­…É…¤áA‰ÜàÍ‰İ…É…¤áA‰ˆàÍ‰‰…¥é™¡¥­‘¹…½…åÁµ‰…±‘™¡±…½é™¡É…A…¤åI0Áµ•­­…½…Ùµ½…¥µ•á½­…µÙ„áQµÙ­…Å…™¡Å„á•™œá°å¡µ‰­‘¹‘¹‘¹‘¹…İQµ‰…Í„áÑ™I‰‰½¥A±‰•‘É‰­…Qµ‘…é„á™ á…é¨í‰™¡¡‰ á…¡…¥¹„áI‰‰¡É……¡½‰¡±¥¹…½…¡…±™I‰‰Å”Ñ‰…Å•åHİ…É™ÈàÙ‰‰…½…‘™¡½……±•™°å¡µ‰­……•™¡…„á•™ á…¡…™¡¡„á•™œá°å¡µ‰á¥­­…Qµ•…é„á™¡……é¨í‰™¡¡‰¡½• á…e á¥¹……½™¡±…„áY‰‰¡É‰¡½¥¹…±„á…½™I‰‰İÑ…¡…½™I‰‰ÅYŒìé¥”Ñ‰…Å•åHİ…É™Èàİ‰‰…±…‘™¡±…1…½•™½™µ‰­„á…E™ á‘¡½……‘™¡……¡…E™¡¡„á•¡±‰ á…±µ‰á‘­­…Qµ‰…½°Ñ á…é„á™I‰‰¡Åİ¡½„Í¡±¥¹…±I‰‰…½Ñ…ÅY¡Å…±•™¡±…½İ™½„å¡µ‰­‰¡¡… á…e¡…¥¹…é¨í‰™…¡™I‰‰¡Éİ¡½……¡±¥¹…±I‰‰…½Ñ…ÉY¡É…±…™¡±…½İ™½„å¡µ‰­…É„áäÑ…Äİ¡Å‰¡½„á¡±¥¹…±…Å…¼ĞàÙ‰‰…±•™¡±…½İ™½„å¡µ‰­„á…‘™ á……•™¡……¡•™¡…å¡µ‰­­…±™¡„Í±™ Í„á±™œá…Ùµ‰­…a…é©‘™……Éèé©©©©ˆá…é…é©‘™…Õ™…É™…‘èé©©©©ˆá……=™¡=…¥¡á…¥µ‰­Œäé¡½á‘­‰Œäå…A…àåI…­M¡½á•­Œäé¡½­…Ù¨í­‰˜á-©©©©‰…½¬éåÍ•éÔá)©©©©‰Œí…”åIØá-©©©©‰Œäé¡½‘¹…±…•¤åUÉ!˜Ùµ‰Õ¡½…¥I‰‰İŒí]•Œí”å¡µ‰…İÍ”Áµ‰…ÙŒí…‰™•©•èé­©©©ˆá…ØåÔàÍ¥U…ØåÔàÍ¤á]…ØåÔàÍ¥å…ØåÔàÍ¥……ØåÔàÍ¥-…ØåÔàÍ¥é…ØåÔàÍ¥İ…ØåÔàÍ¥‰…¥…±™Œå]™¡Å…¥•™İ…É™¡±‘¹…•Qµ‰µÍ…•M¡­‰¡á‰¡µ‰¡É‰¡¥‰¡½¥¹‘¹…±…Äå¹µ‰Œäé¡½á¥­‘¹‘¹…İI‰‰ŒíY”Áµ‰…ÙŒí…‰™…½…ÔİA°Ñ™Í¥Ñ™Íå‘±¡é…Íå‘‰¡!‘¹‘¹…ÍÍ…¬åÁµ‰…Ù…¥…A™Í‘Ñ™å‘‰…á…Í¡…á…ÍQ=™¡áá•­‘¹‘¹…ÍÍMµ‰•¡=…ÍŒäàİ…Í…µ™™•™¡á•­…±•™¡…°áM‰‰Í•¡A‘¹‘¹…ÍÔåµµ‰…¡±á•­…±Ù™¡±…A‰¡AÉ¡Í‘¹¥¹…áM‰‰=‰…ÍÑ…AY¡A…=Ôå­µ•…•™¡…ÍÉ™ÍŒá(å¡µ‰á‘­­…•™¡±­•¡=…A”Ñ‰…A•åHİ…µ™¡­…¡µ­…ÙŒí…‰™…½¥Ñ™Í…	‘‰…Í…é	‘±…Ù…¥‘Ñ™…	‘‰…ÙŒí…‰™…½•™Í¥Ñ™Í…!	‘‰…Í…	‘±…½‘™¡½…=…¥™¡¥‘¹…‘å¡µ‰…‰…É•Ñ™Í… àİ•‰…Í±™…àİ•‰…Í‘™…èàİ•‰á‘­…‰…É‘Ñ™Í…!	‘‰…Íİ™…	‘‰…Í±™…é	‘‰á•­‘¹…Á”Áµ‰…Ù…¥…Å…Í™I‰‰Í°Ñ@åIÍ‘Ñ™å‘‰…á•™=…A¡…Ù…¥…ÌåIÍ‘Ñ™å‘‰…=…AQé™=…ÍÍA¡Í…AQ¡A‘¹‘¹…‘å¡µ‰…‰…É•Ñ™!…ààİ•‰…!±™…Ìàİ•‰…!‘™…àİ•‰á•­…‰…É‘Ñ™!…á	‘‰…!İ™…Í	‘‰…!±™…	‘‰­…Ù…¥‘Ñ™…á	‘‰…ÙŒí…‰™…½¥Ñ™!…	‘‰…!…á	‘±…Ù…¥•™¥Í‘Ñ™…	‘‰…ÙŒí…‰™…½•™Í¥Ñ™!…Í	‘‰…!…	‘±…Ù…¥…é™¥Í‘Ñ™…Í	‘‰…ÙŒí…‰™…½‘™Í¥Ñ™…á	‘‰……Í	‘±…½¥™¡½…¥…A™¡¥…=…A™¡áá•­…á‰…±I‰‰Í!…Œìé•M™¡=…ÍÍ¡‘¹‘¹…Í°Ñµ‰…=•™¡éá•­…=¡é…Ù…¥…åIÍ‘Ñ™å‘‰¡=­‘¹‘¹…µ‰…é•™¡áá•­…é¡á…Ù…¥…ÌåIÍ‘Ñ™å‘‰¡é­‘¹‘¹…Qµ‰…±•™¡á•­…±‘™¡…°áM‰•A•¡Í‘¹…AÔå­µ‰…±½™¡!…Í‰¡ÍÉ¡±‘¹¥¹…áM‰‰A‰…±Ñ…ÍY¡Í…AÔå­µ•…•™¡…±É™±Œá(å¡µ‰­…!¡á•­…•™¡­…Í”Ñ‰…Í•åHİ…µ™µ¡!­‘¹‘¹…ÍMµ‰…¡Íá•­…•™¡Í…áM‰‰±•¡A‘¹…±Ôå­µ‰…Ù™¡=…A‰¡AÉ¡±‘¹¥¹…ÌáM‰‰‰…±Ñ…AY¡A…Ôå­µ•…Í•™¡Í…±É™±Œá(å¡µ‰­…=¡Íá•­…Í•™¡Í­…A”Ñ‰…A•åHİ…µ™µ¡=­‘¹‘¹…ÍMµ‰…Í¡±á•­…Í•™¡±…ÌáM‰‰•¡A‘¹…Ôå­µ‰…ÍÙ™¡é…A‰¡AÉ¡‘¹¥¹…°áM‰‰Í‰…Ñ…AY¡A…ÍÔå­µ•…±•™¡±…É™Œá(å¡µ‰­…é¡±á•­…±•™¡±­…A”Ñ‰…A•åHİ…µ™µ¡é­‘¹‘¹…‘å¡µ‰…‰…É•Ñ™… àİ•‰…±™…èàİ•‰…‘™…<àİ•‰á•­…‰…É‘Ñ™…!	‘‰…İ™…é	‘‰…±™…=	‘‰­…ÙŒí…‰™…½¥Ñ™…=	‘‰……!	‘±…Ù…¥‘Ñ™…!	‘‰…ÙŒí…‰™…½•™Í¥Ñ™…é	‘‰……=	‘±…Ù…¥•™¥Í‘Ñ™…=	‘‰…ÙŒí…‰™…½‘™Í¥Ñ™…!	‘‰……é	‘±…Ù…¥…Q…ÍMY™¥Í‘Ñ™…é	‘‰…¥…Q…ÍMY™¡¥…½¥™¡½­…İ•™¡İ…½Í¡½…¥Í¡¥…É¥™É…”Ùµ‰­­‰Œäå…±…ÅM¡½­…ÙŒí…•˜á-©©©©‰…½¬é±•ÙÔá)©©©©‰èåI¡Ù‘¹…±…•Ù˜åÁµ‰ŒäéÍ­‘¹…¥I‰‰Œìé•ŒíÅ•Mµ‰ÕÍ­…ØåˆàÍ¥İ…¥•™¡½…¥…±™Œäá™¡É‘¹…•Qµ‰‘¹…‘‘Mµ‰‰¡İ¥¹‘¹…½…ÈÙµ‰ŒäéÍ­…½•™¡±…¼áM‰‰¥•¡‘‘¹‘¹…¥Ôåµµ‰…±¡½á•­…½Ù™¡½…‘‰¡‘É¡¥‘¹¥¹…°áM‰‰‰…¥Ñ…‘Y¡‘…Ôå­µ•…±•™¡±…¥É™¥Œá(å¡µ‰á‘­­…±•™¡½­…‰…İ‘Ñ™…‘ŒáÑŒáäÅ…‘Ğİ…Ùİ™…‘•‘ÑY±å‘‰™¥	‘‰…±…¥	‘‰…İ•™İ…”å¡µ‰á‘­­‰¡İ¥¹‘¹…½…ÈÙµ‰ŒäéÍ­…½•™¡±…¼áM‰‰¥•¡‘‘¹‘¹…¥Ôåµµ‰…±¡½á•­…½Ù™¡½…‘‰¡‘É¡¥‘¹¥¹…°áM‰‰‰…¥Ñ…‘Y¡‘…Ôå­µ•…±•™¡±…¥É™¥Œá(å¡µ‰á‘­­…±•™¡½­…‰…İ•Ñ™…‘ŒáÑŒáäÅ…‘Ğİ…Ùİ™…‘•‘ÑY±å‘‰™¤àİ•‰…±…¥	‘‰…İ•™İ…”å¡µ‰­­‰Œäå…½…ÉM¬é1Ù½•Õ”äå‘Õäå•Õäå‘¹‘¹…‘°å¡µ‰…•Qµ•¥¹‘¹‘¹…‰‘™áM‰ˆée…ˆáM‰‰¤ée°é°éÑ…‰•™ØáM‰‰¼éeÈé°éÑİ)‰ˆìèå…İ…İ9)‰‰‰‰…İ…İ)‰‰‰ˆåÄéµ­…Å…¥ˆå¥…±5İ…İ9…­…Å…½ˆå¥…É5Å…Å954éÈéÙ±9)‰‰‰i)‰‰ˆèí…5Èé±)‰‰ˆåÀåQµ‰…Èé=¡¥á•­©©©¨äÑ¡¥­…‘…¤àÙ‰‰‘¹‘¹…Å…±9)‰‰‰i)‰‰ˆèí…Å)‰‰‰ˆå5Äé±)‰‰ˆåÀåQµ‰…Äé=¡‘á•­©©©¨äÑ¡‘­…Ù…àÙ‰‰‘¹‘¹…İ…±9)‰‰‰i)‰‰ˆèí…İ)‰‰‰ˆå5Üé±)‰‰ˆåÀåQµ‰…Üé=¡‘á•­©©©¨äÑ¡‘­…‰…àÙ‰‰…‰±™¡‰…•Õ™•µ‰á‘­­…•Qµ‰¥¹‘¹‘¹…‰±™áU•ˆée…ˆáU•‰¤ée°é°éÑ…‰‘™ØáU•‰¼éeÈé°éÑİ)ˆìéM…İ…İ9)‰‰‰‰…İ…İ)‰‰‰ˆåÄéµ­…Å…¥ˆå¥…±5İ…İ9…­…Å…½ˆå¥…É5Å…Å954éÈéÙ±9)‰‰‰i)‰‰ˆèí…5Èé±)‰‰ˆåÀåQµ‰…Èé=¡¥á•­©©©¨äÑ¡¥­…‘…¤àİ•‰‘¹‘¹…Å…±9)‰‰‰i)‰‰ˆèí…Å)‰‰‰ˆå5Äé±)‰‰ˆåÀåQµ‰…Äé=¡‘á•­©©©¨äÑ¡‘­…Ù…àİ•‰‘¹‘¹…İ…±9)‰‰‰i)‰‰ˆèí…İ)‰‰‰ˆå5Üé±)‰‰ˆåÀåQµ‰…Üé=¡‘á•­©©©¨äÑ¡‘­…‰…àİ•‰…‰İ™¡‰…•Õ™•µ‰­­¬èÑ¥½¥Õ”äå‘Õäå‘Õäå‘¹…•Qµ‰‰¡¥…‰¡±¥¹‘¹‘¹…°áU•‰Øée½(é©¤èÅM…±½˜áU•‰É¥YÜédéÙ9)‰‰‰i)‰‰ˆèí…ÙÔå­5Äé±)‰‰ˆåÀåQµ‰…Äé=¡­á•­©©©¨äÑ¡­­…±±˜áU•‰¡Ù…±‘˜áU•‰¡á…±…É•™¥•Ñ™…¬àİ•‰‘¹‘¹…àéeÅ…9)‰‰‰i)‰‰ˆèí…áÔå­5´é±)‰‰ˆåÀåQµ‰…´é=¡áá•­©©©¨äÑ¡á­…‰…¥…É¥­™İ•Ñ™…ààİ•‰‘¹‘¹…Øéeµ…9)‰‰‰i)‰‰ˆèí…ÙÔå­5@é±)‰‰ˆåÀåQµ‰…@é=¡Ùá•­©©©¨äÑ¡Ù­…±…ÉÕ™¥•Ñ™…Øàİ•‰‘¹‘¹…İ…ÜÈéiA…A5…½…½8éÑ…Å…Å8éÑ…µ…µ8éÑ½)‰‰‰‰…½)‰‰‰ˆåéÉ…9)‰‰‰i5é±)‰‰ˆåÀåQµ‰…é=¡Éá•­©©©¨äÑ¡É­…±…­•Ñ™…Èàİ•‰…±İ™¡±…¥±™¡¥…•Õ™•µ‰­­¬åµ‰‘¹…‘Ñ…”É‘Qµ‰¥¹…‰…‰å‘‰•İÑÜäÄée…•”äÅ©©¨äá©©¨ìá¥˜èé9U‘‰…‰±™¡‰…‘Õ™‘µ‰­­¬éQÙ¥ÉÕäå•Õ‘¹‘¹…‘°å¡µ‰…•Qµ•¥¹‘¹‘¹…‰I‰‰¥…‰•™°áM‰‰Ù…‰‘™¼áM‰‰É˜åHée)‰‰Õ)…‰¥™İI‰‰‘”Ñ…‘YÑ…Y°Ñ…YéhéÙÅ9)‰‰‰i5¬é±)‰‰ˆåÀåQµ‰…¬é=¡áá•­©©©¨äÑ¡á­…½…ààÙ‰‰‘¹‘¹…É…¥˜ée…Å9)‰‰‰i5¬é±)‰‰ˆåÀåQµ‰…¬é=¡½á•­©©©¨äÑ¡½­…±…¼àÙ‰‰‘¹‘¹…Ù…¥™…ÈåHée…Å9)‰‰‰i5¬é±)‰‰ˆåÀåQµ‰…¬é=¡¥á•­©©©¨äÑ¡¥­…‰…¤àÙ‰‰‘¹‘¹……‘•Ñ…‘•Xéi…Å9)‰‰‰i5Äé±)‰‰ˆåÀåQµ‰…Äé=¡‘á•­©©©¨äÑ¡‘­…İ…àÙ‰‰…‰±™¡‰…•Õ™•µ‰á‘­­…•Qµ‰¥¹‘¹‘¹…ˆáY•‰¥…‰‘™°áU•‰Ù…‰±™¼áU•‰É˜åHée)‰Ôå¡…‰½™ÜáY•‰‘”Ñ…‘YÑ…Y°Ñ…YÜÑ…YéhéÙÅ9)‰‰‰i5¬é±)‰‰ˆåÀåQµ‰…¬é=¡áá•­©©©¨äÑ¡á­…½…ààİ•‰‘¹‘¹…É…¥˜ée…Å9)‰‰‰i5¬é±)‰‰ˆåÀåQµ‰…¬é=¡½á•­©©©¨äÑ¡½­…±…¼àİ•‰‘¹‘¹…Ù…¥™…ÈåHée…Å9)‰‰‰i5¬é±)‰‰ˆåÀåQµ‰…¬é=¡¥á•­©©©¨äÑ¡¥­…‰…¤àİ•‰‘¹‘¹……‘•Ñ…‘•Xéi…Å9)‰‰‰i5Äé±)‰‰ˆåÀåQµ‰…Äé=¡‘á•­©©©¨äÑ¡‘­…İ…àİ•‰…‰İ™¡‰…•Õ™•µ‰­­¬åÑ•¥Õ‰‰åé,éé©‰•…‰¥™Œäá™‰	é,éé©‰‘¹‘¹…‰i‰éÑå¹µ‰Õ¡¥…‰…åI¥™èÑ¹‰ÕMµ•­…•¡¥­…¥¬í1•••Õ‘¹‘¹…•…‰Y¥Qµ‰…‰¡¥á•­‘¹‘¹…‘èåÁµ‰…‰¡¥á•­…‰¡¥¥¹…¥…•å‘‰	‘‰…¥±™…•±™å‘‰	‘‰…¥İ™…•İ™å‘‰	‘‰…¥á™…•á™å‘‰	‘‰…•é™¡•…¥é™¡¥…‘Œå]™‘ÌÁµ‰­­…‘°Ùµ‰¥¹…¥…•å‘‰	‘‰…•±™¡•…¥±™¡¥…‘Œäá™‘¤Áµ‰­­‘¹…‘Qµ‰¥¹…¥…•I‰ˆàÙ‰‰…¥•™¡¥…••™¡•…‘Õ™‘µ‰­­…‰¬í…••‘Õ‘¹‘¹…‰¥Qµ‰…‰¡¥á•­…••ŒéˆéŒé•ÜÉ¡±‘¹‘¹…‘èåÁµ‰…‰¡¥á•­…‰¡¥¥¹…¥…±	‘‰…¥á™…±	‘‰…¥İ™…±	‘‰…¥±™…±	‘‰…¥é™¡¥…‘Œå]™‘ÌÁµ‰­­…‘°Ùµ‰¥¹…¥…±	‘‰…¥±™¡¥…‘Œäá™‘¤Áµ‰­­‘¹…‘Qµ‰¥¹…¥…”àÙ‰‰…¥•™¡¥…‘Õ™‘µ‰­­…‰­¬àÍ‘‰¨é‘¬á-‰‰‰‰‘‰‰‰±‰‰‰İ‰‰‰‰‰‰‰•‰‰‰‘‰‰‰±‰‰‰İ‰‰‰‰Œé,é‘­°á\éÅ‰ˆˆ°Ğ€ô€‰ˆå ÜåQ•‰‰‰•-°å‰ˆåÙÕÕÕÕÕ•Ôå¥ÕÕÕˆå•Õ•Õ¥á­‰‰•‰••‘‘‘‘¥±Ù”å]•••Ù¥•‰•½İ•Õ•¨é‘­Èí9•Å¼åQ\åPåYXäÕ‘‰ ååäÌå ÜåPåå(å ÈÈåå)ĞåYXİ‰ˆáåQ\Üå<åXå]Ğåå-\å(åXå-\åİ]YÑ\äĞåŒäÄå4å5]Y‰‘dåQ\Üå<åXå]Ğåå-\å(åXå-\ØåTå-\äĞåŒäÄå4å5]Y‰±åQ\Üå<åXå]Ğåå-\å(åXå-\ØåTå-\äĞåÑ]äÅ\åTå)]‰Ù0åQ\Üå<åXå]Ğåå-\å(åXå-]Lå@ÉÑ]XåÀå)Ñ‰½,åQ\Üå<åXå]Ğåå-\å(åXå-]Lå@ÉÑ]XåÈäÄå!Ñ‰É0åQ\Üå<åXå]Ğåå-\å(åXå-]Lå@ÉÑ]YPäĞå]‰İdåQ\Üå<åXå]Ğåå-\å(åXå-]Lå@ÉÑ]Y(åXÈåYY‰°Üå%XåI‰ÅÄé\å­±‰é¥¬äÑ•ÙÔá)©©©©‰èåI¡‰‰¡•¥¹‰¡‘‰¡¥¥¹…‰İ™…‘™…¥©Õ…•…Ñ•±àÙ‰‰…¥…±™¡¥…‘•™‘Üå¡µ‰­…•…¤àÙˆéÄé\é©‰…•¥Ñ…ˆáA¥ÜàÍ¤éÄéé©‰…••™•©å¡µ‰­¬é)	°áÕäİ‘ÕÈäÜá)©©©©‰¨í­ˆåIØá-©©©©‰Œäé¡½‘¹…±Qµ‰Õ¡½…¥I‰‰ÉŒí]•Œé”å¡µ‰…ÉÍİ”Áµ‰Œäé¡½…±Õ™…‘Ñ‰…İ…‘™É-……İÅ…É…ÄÁ¬Ùµ‰…¥…±™á…ÈåI¡½‘¹…‘Qµµ‰…Ù…½…ìáÅ‰‰­…¥•™¡A¨í…‰…åUŒí]‰©‘…‘„Á¡Í‘¹‘¹‘¹…‘Qµ‰…½…‘™¡é‰¡!¥¹…•… å¹µ‘…á…@åI…Ùµ¥…‰…!…É™¡=…A…™¡…Í…•… åI…!…Í™…”ÙÍ™½°Ñ¥™Ñ¡a…Ù¨í‰™…½Œå]E•Ñ™¡1…Ù¨í‰™…E¤É™¡-…Ù¨í‰™…E™¡e‰ á…½Œí…ˆÙ¡¥¹‰ Í‘¹…İQµ‰…A„áÑ™I‰‰ Í­‰ Õ…Ù¨í‰™ á¥¹‘¹‘¹‘¹‘¹„Í„Õ•ĞÑ¥½Œäé™A‘•‰‘­…á…åI…DÙµİ‘¹…EQµ‰…Ù¨í‰™„Õ…DÉ™……DìáÅ‰‰­……™¡á‘­…EQµ•…Ù¨í‰™„Õ…DÉ™‰…Dìá­‰á•­…á…åI…`Ùµ½…½±Y‰…İ¡É……a™¡½‰¡¥‘¹…µ‰…á…¼åIŒíˆÙµ‰‰¡±¥¹„á…±™¡¥‘¹‘¹‘¹‘¹‘¹‘¹……±¼Ñ™I‰‰Å¥…É™A‰•‘¥‰±•‘¥‰­…¥Áá‰‰‰‰‰‰‰‰‰‰‰‰‰‰‰‰Á­±‰á±­…¥…½Á‰‰±…½Á‰‰‰œá±Àéµ•„áÁµ‰é•!‘=¥±Ùa½EÉ1œá‘Àéµ•„áÁµ‰é•!‘=¥±Ùa½EÉ1Áá¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥Àå½…Áá¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥Àá)œáÀÕˆå©ìàìĞí\íí…ˆäèåTÄé9¡¥ÑÁ‰¤éÄéé©‰…¡IˆéÄé\é©‰¡ÁÍ„áÀÕ”å©ìàìĞí\íí…ˆäèåTÄé9¥ÑÁ‰¤éÄéé©‰ÀåUÁµ‰•‘¥±Ù½Éé!=aE1ÁA……„áÀåÍÁ­±‰…¡…½±™™…IˆéÄé\é©‰™¡½á¥­…¥…½Á‰‰İ…½Á‰‰‰œá±Àéµ•„áÁµ‰é•!‘=¥±Ùa½EÉ1ÁáÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÀå½…ÁáÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÀá)œáÀÕˆå©ìàìĞí\íí…ˆäèåTÄé9¡¥ÑÁ‰¤éÄéé©‰…¡IˆéÄé\é©‰¡ÁÍ„áÀÕ”å©ìàìĞí\íí…ˆäèåTÄé9¥ÑÁ‰¤éÄéé©‰ÀåUÁµ‰•‘¥±Ù½Éé!=aE1ÁA……„áÀåÍÁ­±‰…¡…½İ™™…IˆéÄé\é©‰™¡½á‘­…¥…½Á‰‰‰Á­±‰…½é™¡½á•­…¥…½Á‰‰‘…½I‰‰¡¥ÑÁ‰¤éÄéé©‰…¡IˆéÄé\é©‰¡ÁÍ…½I‰•¥ÑÁ‰¤éÄéé©‰ÀåUÁµ‰•‘¥±Ù½Éé!=aE1ÁAÁ­±‰…¡…½‘™™…IˆéÄé\é©‰™¡½­‘¹‘¹‘¹‘¹‘¹‘¹…ÅÑ¥…É™A‰•‘¥‰±•‘¥‰­…¥é™Áá‰‰‰‰‰‰‰‰‰‰‰‰‰‰‰‰Á­±‰á±­…¥é™…½Á‰‰±…½Á‰‰‰œá±Àéµ•„áÁµ‰é•!‘=¥±Ùa½EÉ1œá‘Àéµ•„áÁµ‰é•!‘=¥±Ùa½EÉ1Áá¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥Àå½…Áá¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥Àá)œáÀÕˆå©ìàìĞí\íí…ˆäèåTÄé9¡¥ÑÁ‰¤éÄéé©‰…¡IˆéÄé\é©‰¡ÁÍ„áÀÕ”å©ìàìĞí\íí…ˆäèåTÄé9¥ÑÁ‰¤éÄéé©‰ÀåUÁµ‰•‘¥±Ù½Éé!=aE1ÁA……„áÀåÍÁ­±‰…¡…½±™™…IˆéÄé\é©‰™¡½á¥­…¥é™…½Á‰‰İ…½Á‰‰‰œá±Àéµ•„áÁµ‰é•!‘=¥±Ùa½EÉ1ÁáÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÀå½…ÁáÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÀá)œáÀÕˆå©ìàìĞí\íí…ˆäèåTÄé9¡¥ÑÁ‰¤éÄéé©‰…¡IˆéÄé\é©‰¡ÁÍ„áÀÕ”å©ìàìĞí\íí…ˆäèåTÄé9¥ÑÁ‰¤éÄéé©‰ÀåUÁµ‰•‘¥±Ù½Éé!=aE1ÁA……„áÀåÍÁ­±‰…¡…½İ™™…IˆéÄé\é©‰™¡½á‘­…¥é™…½Á‰‰‰Á­±‰…½é™¡½á•­…¥é™…½Á‰‰‘…½I‰‰¡¥ÑÁ‰¤éÄéé©‰…¡IˆéÄé\é©‰¡ÁÍ…½I‰•¥ÑÁ‰¤éÄéé©‰ÀåUÁµ‰•‘¥±Ù½Éé!=aE1ÁAÁ­±‰…¡…½‘™™…IˆéÄé\é©‰™¡½­‘¹‘¹‘¹‘¹‘¹‘¹…Å°Ñ¥…É™A‰•‘¥‰±•‘¥‰­…¥…™Áá‰‰‰‰‰‰‰‰‰‰‰‰‰‰‰‰Á­±‰á±­…¥…™…½Á‰‰±…½Á‰‰‰œá±Àéµ•„áÁµ‰é•!‘=¥±Ùa½EÉ1œá‘Àéµ•„áÁµ‰é•!‘=¥±Ùa½EÉ1Áá¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥Àå½…Áá¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥Àá)œáÀÕˆå©ìàìĞí\íí…ˆäèåTÄé9¡¥ÑÁ‰¤éÄéé©‰…¡IˆéÄé\é©‰¡ÁÍ„áÀÕ”å©ìàìĞí\íí…ˆäèåTÄé9¥ÑÁ‰¤éÄéé©‰ÀåUÁµ‰•‘¥±Ù½Éé!=aE1ÁA……„áÀåÍÁ­±‰…¡…½±™™…IˆéÄé\é©‰™¡½á¥­…¥…™…½Á‰‰İ…½Á‰‰‰œá±Àéµ•„áÁµ‰é•!‘=¥±Ùa½EÉ1ÁáÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÀå½…ÁáÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÀá)œáÀÕˆå©ìàìĞí\íí…ˆäèåTÄé9¡¥ÑÁ‰¤éÄéé©‰…¡IˆéÄé\é©‰¡ÁÍ„áÀÕ”å©ìàìĞí\íí…ˆäèåTÄé9¥ÑÁ‰¤éÄéé©‰ÀåUÁµ‰•‘¥±Ù½Éé!=aE1ÁA……„áÀåÍÁ­±‰…¡…½İ™™…IˆéÄé\é©‰™¡½á‘­…¥…™…½Á‰‰‰Á­±‰…½é™¡½á•­…¥…™…½Á‰‰‘…½I‰‰¡¥ÑÁ‰¤éÄéé©‰…¡IˆéÄé\é©‰¡ÁÍ…½I‰•¥ÑÁ‰¤éÄéé©‰ÀåUÁµ‰•‘¥±Ù½Éé!=aE1ÁAÁ­±‰…¡…½‘™™…IˆéÄé\é©‰™¡½­‘¹‘¹‘¹‘¹‘¹‘¹…Å¼Ñ…É™A‰•‘¥‰±•‘¥‰­…¥Œá]™Áá‰‰‰‰‰‰‰‰‰‰‰‰‰‰‰‰Á­±‰á±­…¥Œá]™…½Á‰‰±…½Á‰‰‰œá±Àéµ•„áÁµ‰é•!‘=¥±Ùa½EÉ1œá‘Àéµ•„áÁµ‰é•!‘=¥±Ùa½EÉ1Áá¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥Àå½…Áá¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥Àá)œáÀÕˆå©ìàìĞí\íí…ˆäèåTÄé9¥¥ÑÁ‰¤éÄéé©‰…¥IˆéÄé\é©‰¥ÁÍ„áÀÕ”å©ìàìĞí\íí…ˆäèåTÄé9Å¥ÑÁ‰¤éÄéé©‰ÀåUÁµ‰•‘¥±Ù½Éé!=aE1ÁA……„áÀåÍÁ­±‰…¥…½±™™…ÅIˆéÄé\é©‰™¡½á¥­…¥Œá]™…½Á‰‰İ…½Á‰‰‰œá±Àéµ•„áÁµ‰é•!‘=¥±Ùa½EÉ1ÁáÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÀå½…ÁáÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÀá)œáÀÕˆå©ìàìĞí\íí…ˆäèåTÄé9¥¥ÑÁ‰¤éÄéé©‰…¥IˆéÄé\é©‰¥ÁÍ„áÀÕ”å©ìàìĞí\íí…ˆäèåTÄé9Å¥ÑÁ‰¤éÄéé©‰ÀåUÁµ‰•‘¥±Ù½Éé!=aE1ÁA……„áÀåÍÁ­±‰…¥…½İ™™…ÅIˆéÄé\é©‰™¡½á‘­…¥Œá]™…½Á‰‰‰Á­±‰…½é™¡½á•­…¥Œá]™…½Á‰‰‘…½I‰‰¥¥ÑÁ‰¤éÄéé©‰…¥IˆéÄé\é©‰¥ÁÍ…½I‰•Å¥ÑÁ‰¤éÄéé©‰ÀåUÁµ‰•‘¥±Ù½Éé!=aE1ÁAÁ­±‰…¥…½‘™™…ÅIˆéÄé\é©‰™¡½­…±Œí…‰™¡¥…±©•™…DÁµ•…¥¡±…á…¼åIŒíˆÁµ‰­­‘¹…¥…DåÁµ‰…¥¤Ñ¡±¥¹…á…¼åI,Ùµİ„á…¥™¡Å‘¹‘¹‘¹‘¹‘¹‘¹……¥¼Ñ™I‰‰…±½Ñ¥…É™A‰•‘¥‰±•‘¥‰­…ÅÁá‰‰‰‰‰‰‰‰‰‰‰‰‰‰‰‰Á­‰‰á±­…Å…½Á‰‰±…½Á‰‰‰œá±Àéµ•„áÁµ‰é•!‘=¥±Ùa½EÉ1œá‘Àéµ•„áÁµ‰é•!‘=¥±Ùa½EÉ1Áá¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥Àå½…Áá¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥Àá)œáÀÕˆå©ìàìĞí\íí…ˆäèåTÄé9¡¥ÑÁ‰¤éÄéé©‰…¡IˆéÄé\é©‰¡ÁÍ„áÀÕ”å©ìàìĞí\íí…ˆäèåTÄé9¥ÑÁ‰¤éÄéé©‰ÀåUÁµ‰•‘¥±Ù½Éé!=aE1ÁA……„áÀåÍÁ­‰‰…¡…½±™™…IˆéÄé\é©‰™¡½á¥­…Å…½Á‰‰İ…½Á‰‰‰œá±Àéµ•„áÁµ‰é•!‘=¥±Ùa½EÉ1ÁáÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÀå½…ÁáÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÀá)œáÀÕˆå©ìàìĞí\íí…ˆäèåTÄé9¡¥ÑÁ‰¤éÄéé©‰…¡IˆéÄé\é©‰¡ÁÍ„áÀÕ”å©ìàìĞí\íí…ˆäèåTÄé9¥ÑÁ‰¤éÄéé©‰ÀåUÁµ‰•‘¥±Ù½Éé!=aE1ÁA……„áÀåÍÁ­‰‰…¡…½İ™™…IˆéÄé\é©‰™¡½á‘­…Å…½Á‰‰‰Á­‰‰…½é™¡½á•­…Å…½Á‰‰‘…½I‰‰¡¥ÑÁ‰¤éÄéé©‰…¡IˆéÄé\é©‰¡ÁÍ…½I‰•¥ÑÁ‰¤éÄéé©‰ÀåUÁµ‰•‘¥±Ù½Éé!=aE1ÁAÁ­‰‰…¡…½‘™™…IˆéÄé\é©‰™¡½­…±‘™¡±…¥é™¥…DÙµ‰­­…½¡…½Qµ½­„á…E™ á„Õ•™œÕ°å¡µ‰­‘¹‘¹‘¹‘¹…İQµ‰…é„áÑ™I‰‰±¥A±‰•‘İ‰­…EQµ‘…Ù©‘™„á™¡±…Ù„á™Á‰‘‰ á)‰¡½¥¹…±…Ù¨í‰™…½™Á‰±‰œá-…e…½™Á‰±‰œá1Áµ‰é•!‘=¥±Ùa½EÉ1œá5…1…½™Á‰±‰œá9…-…½™Á‰±‰åÁµ‰é•!‘=¥±Ùa½EÉ1œáAÁµ‰•é!‘¥=±Ùa½ÉE1œá•ÀåQ„áÁá••••••••••••••••…Àå½Àå!ÀåÉœá„á)ÀåUœá)Àå‰‰‰…±…‘™±„á)„á„áÁµ±Ù½É±Ù½É±Ù½É±Ù½ÉÀåUœá)Àå‰‰‰…±…‘™±„á)„á„áÁµİÅ­İÅ­İÅ­İÅ­ÀåUœá)Àå‰‰‰…±…‘™±„á)„á„áÁµáµAÍáµAÍáµAÍáµAÍÀåUœá)Àå‰‰‰…±…‘™±„á)„á5„áAÁµİ-eÅ¬áá´ÌÕAÌááœá•ÀåQ„á……Àå½Àå!ÀåÉœáÀåUœá)Àå‰‰‰…±…‘™±„á)„á„áÁµ±Ù½É±Ù½É±Ù½É±Ù½ÉÀåUœá)Àå‰‰‰…±…‘™±„á)„á„áÁµİÅ­İÅ­İÅ­İÅ­ÀåUœá)Àå‰‰‰…±…‘™±„á)„á„áÁµáµAÍáµAÍáµAÍáµAÍÀåUœá)Àå‰‰‰…±…‘™±„á)„á-„á1Áµİ-eÄá­àÍ´Õ@áÌáœá-„á9…åÁµİ-eÄá­àÍ´Õ@áÌáœá1Áµ‰•é!‘¥=±Ùa½ÉE1œá•ÀåQ„á……Àå½Àå!ÀåÉœáÀåUœá)Àå‰‰‰…±…‘™±„á)„á„áÁµ±Ù½É±Ù½É±Ù½É±Ù½ÉÀåUœá)Àå‰‰‰…±…‘™±„á)„á„áÁµİÅ­İÅ­İÅ­İÅ­ÀåUœá)Àå‰‰‰…±…‘™±„á)„á„áÁµáµAÍáµAÍáµAÍáµAÍÀåUœá)Àå‰‰‰…±…‘™±„á)„á-„á1Áµİ-eÅ¬áá´ÌÕAÌááœá•ÀåQ„á……Àå½Àå!ÀåÉœáÀåU…Àå‰‰‰…±…‘™±……„á„áÁµ±Ù½É±Ù½É±Ù½É±Ù½ÉÀåU…Àå‰‰‰…±…‘™±……„á„áÁµİÅ­İÅ­İÅ­İÅ­ÀåU…Àå‰‰‰…±…‘™±……„á„áÁµáµAÍáµAÍáµAÍáµAÍÀåUœá)Àå‰‰‰…±…‘™¡±…½é™½…DÙµ‰á¥­­…EQµ•…Ù©‘™„á™¡±…Ù„á™Á‰‘‰ á)‰¡½¥¹…±…Ù¨í‰™…½™Á‰±‰œá-…e…½™Á‰±‰œá1Áµ‰é•!‘=¥±Ùa½EÉ1œá5…1…½™Á‰±‰œá9…-…½™Á‰±‰åÁµ‰é•!‘=¥±Ùa½EÉ1œáAÁµ‰•é!‘¥=±Ùa½ÉE1œá•Àé¹•„áÁá•‰•‰•‰•‰•‰•‰•‰•‰…Àå½Àé‰•ÀåÉœá„á)Àé½•œá)Àå‰‰‰…±…‘™±„á)„á„áÁµ±Ù½É±Ù½É±Ù½É±Ù½ÉÀé½•œá)Àå‰‰‰…±…‘™±„á)„á„áÁµİÅ­İÅ­İÅ­İÅ­Àé½•œá)Àå‰‰‰…±…‘™±„á)„á„áÁµáµAÍáµAÍáµAÍáµAÍÀé½•œá)Àå‰‰‰…±…‘™±„á)„á5„áAÁµİ-eÅ¬áá´ÌÕAÌááœá•Àé¹•„á……Àå½Àé‰•ÀåÉœáÀé½•œá)Àå‰‰‰…±…‘™±„á)„á„áÁµ±Ù½É±Ù½É±Ù½É±Ù½ÉÀé½•œá)Àå‰‰‰…±…‘™±„á)„á„áÁµİÅ­İÅ­İÅ­İÅ­Àé½•œá)Àå‰‰‰…±…‘™±„á)„á„áÁµáµAÍáµAÍáµAÍáµAÍÀé½•œá)Àå‰‰‰…±…‘™±„á)„á-„á1Áµİ-eÄá­àÍ´Õ@áÌáœá-„á9…åÁµİ-eÄá­àÍ´Õ@áÌáœá1Áµ‰•é!‘¥=±Ùa½ÉE1œá•Àé¹•„á……Àå½Àé‰•ÀåÉœáÀé½•œá)Àå‰‰‰…±…‘™±„á)„á„áÁµ±Ù½É±Ù½É±Ù½É±Ù½ÉÀé½•œá)Àå‰‰‰…±…‘™±„á)„á„áÁµİÅ­İÅ­İÅ­İÅ­Àé½•œá)Àå‰‰‰…±…‘™±„á)„á„áÁµáµAÍáµAÍáµAÍáµAÍÀé½•œá)Àå‰‰‰…±…‘™±„á)„á-„á1Áµİ-eÅ¬áá´ÌÕAÌááœá•Àé¹•„á……Àå½Àé‰•ÀåÉœáÀé½•…Àå‰‰‰…±…‘™±……„á„áÁµ±Ù½É±Ù½É±Ù½É±Ù½ÉÀé½•…Àå‰‰‰…±…‘™±……„á„áÁµİÅ­İÅ­İÅ­İÅ­Àé½•…Àå‰‰‰…±…‘™±……„á„áÁµáµAÍáµAÍáµAÍáµAÍÀé½•œá)Àå‰‰‰…±…‘™¡±…½é™½…DÙµ‰á‘­­…EQµ‰‰¡½‰…±°Ñ°åIŒá¡¥…Ù©‘™„á™¡É…Ù„á™Á‰‘‰¡…¥¹…É…Ù¨í‰™…½™Á‰±‰œá)…e…½™Á‰±‰œá-Áµ‰é•!‘=¥±Ùa½EÉ1œá1…1…½™Á‰±‰œá5…-…½™Á‰±‰œá9Áµ‰é•!‘=¥±Ùa½EÉ1åÁµ‰•é!‘¥=±Ùa½ÉE1œá…¥ÀéI•„á…±ÀéQ•ÀåÅœá……ÀåÉ…Àå‰‰‰…É…‘™É……„á„áÁµ±Ù½É±Ù½É±Ù½É±Ù½ÉÀåÉ…Àå‰‰‰…É…‘™É……„á„áÁµİÅ­İÅ­İÅ­İÅ­ÀåÉ…Àå‰‰‰…É…‘™É……„á„áÁµáµAÍáµAÍáµAÍáµAÍÀåÉ…Àå‰‰‰…É…‘™É……„á1…åÁµİ-eÅ¬áá´ÌÕAÌááœá…¥ÀéI•„á…±ÀéQ•ÀåÅœáÀåÉ…Àå‰‰‰…É…‘™É……„á„áÁµ±Ù½É±Ù½É±Ù½É±Ù½ÉÀåÉ…Àå‰‰‰…É…‘™É……„á„áÁµİÅ­İÅ­İÅ­İÅ­ÀåÉ…Àå‰‰‰…É…‘™É……„á„áÁµáµAÍáµAÍáµAÍáµAÍÀåÉ…Àå‰‰‰…É…‘™É……„á)„á-Áµİ-eÄá­àÍ´Õ@áÌáœá)„á5„á9Áµİ-eÄá­àÍ´Õ@áÌáœá-Áµ‰•é!‘¥=±Ùa½ÉE1œá…¥ÀéI•„á…±ÀéQ•ÀåÅœáÀåÉ…Àå‰‰‰…É…‘™É……„á„áÁµ±Ù½É±Ù½É±Ù½É±Ù½ÉÀåÉ…Àå‰‰‰…É…‘™É……„á„áÁµİÅ­İÅ­İÅ­İÅ­ÀåÉ…Àå‰‰‰…É…‘™É……„á„áÁµáµAÍáµAÍáµAÍáµAÍÀåÉ…Àå‰‰‰…É…‘™É……„á)„á-Áµİ-eÅ¬áá´ÌÕAÌááœá…¥ÀéI•„á…±ÀéQ•ÀåÅœáÀåÉ…Àå‰‰‰…É…‘™É……„á„áÁµ±Ù½É±Ù½É±Ù½É±Ù½ÉÀåÉ…Àå‰‰‰…É…‘™É……„á„áÁµİÅ­İÅ­İÅ­İÅ­ÀåÉ…Àå‰‰‰…É…‘™É……„á„áÁµáµAÍáµAÍáµAÍáµAÍÀåÉ…Àå‰‰‰…É…‘™¡É…½é™½…DÙµ‰­­„á±™œá…Ùµ‰­‘¹……É½Qµ‰…=…Ù©‘™…¼ìáÅ‰‰­‘¹…µµ‰…Ù…Ù©‘™…Õ™…É™…ìáÅ‰‰­……!™¡!Œäé¡½…¡A…µ‰á±­­…•Qµ‰……±™¡É‰¡½Õ¡±¥¹…É…±…åI±™…Ùµ‘…Í…•…¼åI…½…Í™…”Ù…½™½…”Ùµ‰­…¥…°åI¡A­‰Œäå…á…@åI…­M¡½á•­Œäé¡½­…Ù¨í­‰˜á-©©©©‰…½­İ‰èé‰©©©‰­9Í•éÔá)©©©©‰Œí…”åIØá-©©©©‰Œäé¡½‘¹…±…•¤åUÉ!˜Ùµ‰Õ¡½…¥I‰‰İŒí]•Œí”å¡µ‰…İÍ”Áµ‰…ÙŒí…‰™•©”ìá­‰…ØåÔàÍ¥U…ØåÔàÍ¤á]…ØåÔàÍ¥å…ØåÔàÍ¥……ØåÔàÍ¥-…ØåÔàÍ¥é…ØåÔàÍ¥İ…ØåÔàÍ¥‰…¥…±™Œå]™¡Å…¥•™İ…É™¡±‘¹…•Qµ‰µÍ…•M¡­‰¡á‰¡µ‰¡É‰¡¥‰¡½¥¹‘¹…±…Äå¹µ‰Œäé¡½á¥­‘¹‘¹…İI‰‰ŒíY”Áµ‰…ÙŒí…‰™…½…ÔİA°Ñ™Í¥Ñ™Íå‘±¡é…Íå‘‰¡!‘¹‘¹…ÍÍ…¬åÁµ‰…Ù…¥…A™Í‘Ñ™å‘‰…á…Í¡…á…ÍQ=™¡áá•­‘¹‘¹…ÍÍMµ‰•¡=…ÍŒäàİ…Í…µ™™•™¡á•­…±•™¡…°áM‰‰Í•¡A‘¹‘¹…ÍÔåµµ‰…¡±á•­…±Ù™¡±…A‰¡AÉ¡Í‘¹¥¹…áM‰‰=‰…ÍÑ…AY¡A…=Ôå­µ•…•™¡…ÍÉ™ÍŒá(å¡µ‰á‘­­…•™¡±­•¡=…A”Ñ‰…A•åHİ…µ™¡­…¡µ­…ÙŒí…‰™…½¥Ñ™Í…	‘‰…Í…é	‘±…Ù…¥‘Ñ™…	‘‰…ÙŒí…‰™…½•™Í¥Ñ™Í…!	‘‰…Í…	‘±…½‘™¡½…=…¥™¡¥‘¹…‘å¡µ‰…‰…É•Ñ™Í… àİ•‰…Í±™…àİ•‰…Í‘™…èàİ•‰á‘­…‰…É‘Ñ™Í…!	‘‰…Íİ™…	‘‰…Í±™…é	‘‰á•­‘¹…Á”Áµ‰…Ù…¥…Å…Í™I‰‰Í°Ñ@åIÍ‘Ñ™å‘‰…á•™=…A¡…Ù…¥…ÌåIÍ‘Ñ™å‘‰…=…AQé™=…ÍÍA¡Í…AQ¡A‘¹‘¹…‘å¡µ‰…‰…É•Ñ™!…ààİ•‰…!±™…Ìàİ•‰…!‘™…àİ•‰á•­…‰…É‘Ñ™!…á	‘‰…!İ™…Í	‘‰…!±™…	‘‰­…Ù…¥‘Ñ™…á	‘‰…ÙŒí…‰™…½¥Ñ™!…	‘‰…!…á	‘±…Ù…¥•™¥Í‘Ñ™…	‘‰…ÙŒí…‰™…½•™Í¥Ñ™!…Í	‘‰…!…	‘±…Ù…¥…é™¥Í‘Ñ™…Í	‘‰…ÙŒí…‰™…½‘™Í¥Ñ™…á	‘‰……Í	‘±…½¥™¡½…¥…A™¡¥…=…A™¡áá•­…á‰…±I‰‰Í!…Œìé•M™¡=…ÍÍ¡‘¹‘¹…Í°Ñµ‰…=•™¡éá•­…=¡é…Ù…¥…åIÍ‘Ñ™å‘‰¡=­‘¹‘¹…µ‰…é•™¡áá•­…é¡á…Ù…¥…ÌåIÍ‘Ñ™å‘‰¡é­‘¹‘¹…Qµ‰…±•™¡á•­…±‘™¡…°áM‰•A•¡Í‘¹…AÔå­µ‰…±½™¡!…Í‰¡ÍÉ¡±‘¹¥¹…áM‰‰A‰…±Ñ…ÍY¡Í…AÔå­µ•…•™¡…±É™±Œá(å¡µ‰­…!¡á•­…•™¡­…Í”Ñ‰…Í•åHİ…µ™µ¡!­‘¹‘¹…ÍMµ‰…¡Íá•­…•™¡Í…áM‰‰±•¡A‘¹…±Ôå­µ‰…Ù™¡=…A‰¡AÉ¡±‘¹¥¹…ÌáM‰‰‰…±Ñ…AY¡A…Ôå­µ•…Í•™¡Í…±É™±Œá(å¡µ‰­…=¡Íá•­…Í•™¡Í­…A”Ñ‰…A•åHİ…µ™µ¡=­‘¹‘¹…ÍMµ‰…Í¡±á•­…Í•™¡±…ÌáM‰‰•¡A‘¹…Ôå­µ‰…ÍÙ™¡é…A‰¡AÉ¡‘¹¥¹…°áM‰‰Í‰…Ñ…AY¡A…ÍÔå­µ•…±•™¡±…É™Œá(å¡µ‰­…é¡±á•­…±•™¡±­…A”Ñ‰…A•åHİ…µ™µ¡é­‘¹‘¹…‘å¡µ‰…‰…É•Ñ™… àİ•‰…±™…èàİ•‰…‘™…<àİ•‰á•­…‰…É‘Ñ™…!	‘‰…İ™…é	‘‰…±™…=	‘‰­…ÙŒí…‰™…½¥Ñ™…=	‘‰……!	‘±…Ù…¥‘Ñ™…!	‘‰…ÙŒí…‰™…½•™Í¥Ñ™…é	‘‰……=	‘±…Ù…¥•™¥Í‘Ñ™…=	‘‰…ÙŒí…‰™…½‘™Í¥Ñ™…!	‘‰……é	‘±…Ù…¥…Q…ÍMY™¥Í‘Ñ™…é	‘‰…¥…Q…ÍMY™¡¥…½¥™¡½­…İ•™¡İ…½Í¡½…¥Í¡¥…É¥™É…”Ùµ‰­­‰Œäå…±…ÅM¡½­…ÙŒí…•˜á-©©©©‰…½¬é±•ÙÔá)©©©©‰èåI¡Ù‘¹…±…•Ù˜åÁµ‰ŒäéÍ­‘¹…¥I‰‰Œìé•ŒíÅ•Mµ‰ÕÍ­…ØåˆàÍ¥İ…¥•™¡½…¥…±™Œäá™¡É‘¹…•Qµ‰‘¹…‘‘Mµ‰‰¡İ¥¹‘¹…½…ÈÙµ‰ŒäéÍ­…½•™¡±…¼áM‰‰¥•¡‘‘¹‘¹…¥Ôåµµ‰…±¡½á•­…½Ù™¡½…‘‰¡‘É¡¥‘¹¥¹…°áM‰‰‰…¥Ñ…‘Y¡‘…Ôå­µ•…±•™¡±…¥É™¥Œá(å¡µ‰á‘­­…±•™¡½­…‰…İ‘Ñ™…‘ŒáÑŒáäÅ…‘Ğİ…Ùİ™…‘•‘ÑY±å‘‰™¥	‘‰…±…¥	‘‰…İ•™İ…”å¡µ‰á‘­­‰¡İ¥¹‘¹…½…ÈÙµ‰ŒäéÍ­…½•™¡±…¼áM‰‰¥•¡‘‘¹‘¹…¥Ôåµµ‰…±¡½á•­…½Ù™¡½…‘‰¡‘É¡¥‘¹¥¹…°áM‰‰‰…¥Ñ…‘Y¡‘…Ôå­µ•…±•™¡±…¥É™¥Œá(å¡µ‰á‘­­…±•™¡½­…‰…İ•Ñ™…‘ŒáÑŒáäÅ…‘Ğİ…Ùİ™…‘•‘ÑY±å‘‰™¤àİ•‰…±…¥	‘‰…İ•™İ…”å¡µ‰­­‰Œäå…½…ÉM¬íQ½¥¼äİ•Õ”äİ…•Œäá¡•‘¹‘¹…‘°å¡µ‰…•Qµ•‰¡‘¥¹…‰…‰Á‰‰‰¥-ÀéI•-ÀéM•ÀìÙ•±…¥İÀéI•-ÀéM•ÀìÙ•…±Àí•…¥éÀéI•-ÀéM•ÀìÙ•ÙÀí•Àí-•Àí1•½Áá‰‰‰‰‰‰‰‰‰‰‰‰‰‰‰‰ÀèÉ•É…±Áá‰‰‰©‰‰‰©‰‰‰©‰‰‰©İÀå½ÀåÉÀí-•±Áá‰ˆìèå‰ˆìèå‰ˆìèå‰ˆìèå…±…±Àí5•…½…½Àí5•…Ù…É…Ù…İÀå½ÀåÉÀí-•±…±Àí5•Àí-•Àí-•Àí)•Àí9•ÙÀí5•Áá‰‰¸Á‰‰¸Á‰‰¸Á‰‰¸ÁÉÀí-•Áá‰‰‰‰‰‰‰‰‰‰‰‰Àå½…¥Áá‰‰‰‰‰‰‰‰‰‰‰‰Àå½ÀåÅ…±…ÙÀí5•…ÉÀí-•İÀéI•Áá‰‰‰‰‰‰‰‰‰‰‰‰Àå½ÀåÅ…½…ÙÀí5•…ÉÀí-•éÀéI•Áá‰‰‰‰‰‰‰‰‰‰‰‰Àå½ÀåÅÁ­‰‰…‰é™¡‰…‘±™‘…”Ùµ‰á‘­­…•Qµ‰‰¡‘¥¹…‰é™…Á‰‰‰¥Áá‰‰‰‰‰‰‰‰‰‰‰‰İÀå½…‰Á‰‰‰½…¥Áµ‰•‘¥İÅ­é!=-dáÙéÀéI•éÀéM•ÀìÙ•±…½…¥Áµ±Ù½ÉáµAÍaE0ÌÔááÁáÕ‰‰Õ‰‰Õ‰‰Õ‰‰Àå½ÀìÙ•…ÙéÀéM•ÀìÙ•ÙÀí•…±Àí•Àí-•Àí1•¥Áá‰‰‰‰‰‰‰‰‰‰‰‰‰‰‰‰ÀèÉ•É…±Áá‰‰‰©‰‰‰©‰‰‰©‰‰‰©ÅÀå½ÀåÉÀí-•±ÁáˆìéMˆìéMˆìéMˆìéM…±…±Àí5•…¥…¥Àí5•…Ù…É…Ù…ÅÀå½ÀåÉÀí-•±…±Àí5•Àí-•Àí-•Àí)•Àí9•ÙÀí5•Áá‰‰¸Á‰‰¸Á‰‰¸Á‰‰¸ÁÉÀí-•Áá‰‰‰‰‰‰‰‰Àå½…¥…ÙÀí5•…ÉÀí-•éÀéI•ÀåÅ¥…±…ÙÀí5•…ÉÀí-•Áá‰‰‰‰‰‰‰‰Àå½±Áµİ-eÅ¬áá´ÌÕAÌááÀåÅÁ­‰‰…‰…½…İÀå½…¥…±Áµ‰•é!‘¥=±Ùa½ÉE1ÀåÅÁ­‰‰…‰…™¡‰…‘±™‘…”Ùµ‰­­¬ìÉ¥±•Õ”äİ•Õ¼äİ‘¹…•Œäá¥Qµ‰‰¡•¥¹…‰-™Áàé©¤èÅLé©¤èÅLé©¤èÅLé©¤èÅM…‰Á‰‰‰±…‰é™ÙÁ‰‰‰½Áµ±Ù½ÉáµAÍaE0ÌÔááÉéÀéM•İÁá¥‰‰‰¥‰‰‰¥‰‰‰¥‰‰‰ÀåÅÀìÙ•Àí9•Å……Àí5•…Àí-•…±…½Áµ‰•‘¥İÅ­é!=-dáéÀéI•éÀéM•ÀìÙ•±…±Àí5•…éÀéM•ÀìÙ•½…½Àí5•…ÉéÀéI•éÀéM•ÀìÙ•É…ÉÀí5•Àí-•Àí-•Àí1•Áá‰‰‰‰‰‰‰‰‰‰‰‰‰‰‰‰ÀèÑ•Àí)•Àí5•Áá‰‰¸Á‰‰¸Á‰‰¸Á‰‰¸ÁÀí-•Áá‰‰‰‰‰‰‰‰­Àå½…Å…½Àí5•…Àí-•éÀéI•ÀåÅ½…Å…±Àí5•…Àí-•…­Àå½…Å…ÉÀí5•…Àí-•éÀéI•ÀåÅÁµİ-eÅ¬áá´ÌÕAÌáá±ÀÕ•…İ±ÀéI•ÅÁ¤éPé¨àÍ¥‰…Ù…±ÀÕ‰…ÅÁéPé¨àÍ¥‰…‰İ™…½…Áµ‰•é!‘¥=±Ùa½ÉE1ÀÕ•…ÅÁ”éPé¨àÍ¥‰…‰…ÀÕ‰…ÅÁˆéPé¨àÍ¥‰…‰…™¡‰…•±™•…¤Ùµ‰­­­Õ•”äİ‘¹…‘Ñ…”ÉŒäá•Qµ‰‰¡‘¥¹…‰…‰Á‰‰‰¥İÀéI•İÀéM•ÀìÙ•…¥•ÀéM•Áá‰‰©‰‰©‰‰©‰‰©Àå½Áá‰‰©i‰‰©i‰‰©i‰‰©iÀéU•Àí5•Á­‰‰…‰é™¡‰…‘±™‘…”Ùµ‰­­¬éM½‘Üäİ•Õ…•Œäá¡•‘¹‘¹…‘°å¡µ‰…•Qµ•‰¡‘¥¹…‰Áá‰‰Õ)‰‰Õ)‰‰Õ)‰‰Õ)…‰Á‰‰‰¥-ÀéQ•±…¥eÀéQ•ÀåÅÙ‘ÀéQ•…ÙÀåÅÙ±ÀéQ•…ÙÀåÅ½ÀìÙ•Àí9•Ù…¥İÀéI•-ÀéM•É…¥Áá‰‰‰‰‰‰‰‰‰‰‰‰İÀå½ÀéU•ÀìÙ•Àí5•Áá‰‰¸Á‰‰¸Á‰‰¸Á‰‰¸ÁÅÀí-•İÀéI•Áá‰‰‰‰‰‰‰‰‰‰‰‰Àå½…Ù……ÉÀéa•…¥éÀéI•-ÀéM•¥ÀéU•ÀìÙ•Àí5•…ÅÀí-•…İÀå½ÀåÅ…Ù……É…¥ÀéU•Àéa•ÀìÙ•Àí5•…ÅÀí-•éÀéI•Áá‰‰‰‰‰‰‰‰‰‰‰‰Àå½ÀåÅ…Ù…½…±•ÀéI•Àå½…±Áá•‰‰‰•‰‰‰•‰‰‰•‰‰‰Àå½ÀåÅÀìÙ•Àí5•…ÅÀí-•-ÀéI•ÀåÅÁ­‰‰…‰é™¡‰…‘±™‘…”Ùµ‰á‘­­…•Qµ‰‰¡‘¥¹…‰é™­Áá‰Ôå¡‰Ôå¡‰Ôå¡‰Ôå¡…‰Á‰‰‰±…­Á‰‰‰ÉÁµ±Ù½ÉáµAÍaE0ÌÔááÙéÀéQ•Å…Ù!ÀéQ•ÀåÅ¥‘ÀéQ•…¥ÀåÅ¥±ÀéQ•…¥ÀåÅ¥İÀéQ•…¥ÀåÅ½ÀìÙ•Àí9•¥…±…ÉÁµ‰•‘¥İÅ­é!=-dáÁá‰‰‰‰‰‰‰‰±Àå½É…éÀéM•İÀéU•…ÙéÀéI•éÀéM•Àéa•ÀìÙ•Àí5•Áá‰‰¸Á‰‰¸Á‰‰¸Á‰‰¸ÁÙÀí-•…±Àå½…¥…É…İ…ÀéU•Àéa•ÀìÙ•Àí5•…ÙÀí-•éÀéI•ÀåÅİ…¥…½…Å•ÀéI•Àå½…ÅÁá•‰‰‰•‰‰‰•‰‰‰•‰‰‰Àå½ÀåÅÀìÙ•Àí5•…ÙÀí-•éÀéI•…¥……ÉÀéU•ÀìÙ•Àí5•…ÙÀí-•…±Àå½ÀåÅ¥Áµİ-eÅ¬áá´ÌÕAÌááÁ­‰‰…‰…İ…¥Áµ‰•é!‘¥=±Ùa½ÉE1Á­‰‰…‰…™¡‰…‘±™‘…”Ùµ‰­­¬åÑ•¥Õ‰‰å‘¨éé©‰•…‰¥™Œäá™‰	‘¨éé©‰‘¹‘¹…‰i‰éÑå¹µ‰Õ¡¥…‰…åI¥™èÑ¹‰ÕMµ•­…•¡¥­…¥­­á•‰¨é‘­±èéé‰ˆˆ°¤€ô¹•ÜU¥¹ĞáÉÉ…ä¡l(€€€€À°(€€€€äÜ°(€€€€ÄÄÔ°(€€€€ÄÀä°(€€€€Ä°(€€€€À°(€€€€À°(€€€€À°(€€€€Ä°(€€€€Ğ°(€€€€Ä°(€€€€äØ°(€€€€À°(€€€€À°(€€€€Ì°(€€€€Ì°(€€€€È°(€€€€À°(€€€€À°(€€€€Ô°(€€€€Ì°(€€€€Ä°(€€€€À°(€€€€Ä°(€€€€ÄÈ°(€€€€Ä°(€€€€À°(€€€€ÄÀ°(€€€€ÈÈ°(€€€€È°(€€€€ÄÈ°(€€€€À°(€€€€ØÔ°(€€€€À°(€€€€ØÔ°(€€€€À°(€€€€ØÔ°(€€€€À°(€€€€ÈÔÈ°(€€€€ÄÀ°(€€€€À°(€€€€À°(€€€€ÄÄ°(€€€€Ü°(€€€€À°(€€€€ØÔ°(€€€€À°(€€€€ÈÔÌ°(€€€€ÄÔ°(€€€€ÈØ°(€€€€ÄÄ(€t¤°¸€ô¹•ÜU¥¹ĞáÉÉ…ä¡l(€€€€ÌÈ°(€€€€À°(€€€€ØÔ°(€€€€È°(€€€€Ä°(€€€€ÄÀØ°(€€€€ÌĞ°(€€€€ÌÌ°(€€€€Ì°(€€€€ÄÈà°(€€€€ÄÄ°(€€€€Ğ°(€€€€ÄÌ°(€€€€ØĞ°(€€€€Ø°(€€€€ÈÔÌ°(€€€€ÄÀ°(€€€€Ü°(€€€€ÄÔ°(€€€€ÄÄØ°(€€€€ÄÈÜ°(€€€€Ô°(€€€€à°(€€€€ÄÈ°(€€€€ĞÀ°(€€€€ÄØ°(€€€€Ää°(€€€€ÔĞ°(€€€€ÈÀ°(€€€€ä°(€€€€ÈÜ°(€€€€ÈÔÔ°(€€€€ÄÄÌ°(€€€€ÄÜ°(€€€€ĞÈ°(€€€€ØÜ°(€€€€ÈĞ°(€€€€ÈÌ°(€€€€ÄĞØ°(€€€€ÄĞà°(€€€€Äà°(€€€€ÄĞ°(€€€€ÈÈ°(€€€€ĞÔ°(€€€€ÜÀ°(€€€€Øä°(€€€€ÔØ°(€€€€ÄÄĞ°(€€€€ÄÀÄ°(€€€€ÈÄ°(€€€€ÈÔ°(€€€€ØÌ°(€€€€ÜÔ°(€€€€ÄÌØ°(€€€€ÄÀà°(€€€€Èà°(€€€€ÄÄà°(€€€€Èä°(€€€€ÜÌ°(€€€€ÄÄÔ(€t¤ì(€¥˜€¡ÑåÁ•½˜]•‰ÍÍ•µ‰±ä€„ô€‰½‰©•Ğˆ¤É•ÑÕÉ¸ìÍÕÁÁ½ÉÑ•è€„Äôì(€Ù…ÈÈ€ô]•‰ÍÍ•µ‰±ä¹Ù…±¥‘…Ñ”¡¤¤€ü¼¡Ğ¤€è¼¡”¤°Ì°„€ô]•‰ÍÍ•µ‰±ä¹¥¹ÍÑ…¹Ñ¥…Ñ”¡È°íô¤¹Ñ¡•¸¡™Õ¹Ñ¥½¸¡˜¤ì(€€€Ì€ô˜¹¥¹ÍÑ…¹”°Ì¹•áÁ½ÉÑÌ¹}}İ…Íµ}…±±}Ñ½ÉÌ ¤ì(€ô¤ì(€™Õ¹Ñ¥½¸¼¡˜¤ì(€€€™½È€¡Ù…ÈP€ô¹•ÜU¥¹ĞáÉÉ…ä¡˜¹±•¹Ñ ¤°€ô€Àì€ğ˜¹±•¹Ñ ì€¬­¤ì(€€€€€Ù…È4€ô˜¹¡…É½‘•Ğ¡¤ì(€€€€€Qmt€ô4€ø€äØ€ü4€´€äÜ€è4€ø€ØĞ€ü4€´€Ìä€è4€¬€Ğì(€€€ô(€€€™½È€¡Ù…È€ô€À°€ô€Àì€ğ˜¹±•¹Ñ ì€¬­¤Qm¬­t€ôQmt€ğ€ØÀ€ü¹mQmut€è€¡Qmt€´€ØÀ¤€¨€ØĞ€¬Ql¬­tì(€€€É•ÑÕÉ¸P¹‰Õ™™•È¹Í±¥” À°¤ì(€ô(€™Õ¹Ñ¥½¸°¡˜°P°°4°°H°¤ì(€€€Ù…Èœ€ô˜¹•áÁ½ÉÑÌ¹Í‰É¬°ä€ô4€¬€Ì€˜€´Ğ°€ôœ¡ä€¨¤°Ü€ôœ¡H¹±•¹Ñ ¤°¬€ô¹•ÜU¥¹ĞáÉÉ…ä¡˜¹•áÁ½ÉÑÌ¹µ•µ½Éä¹‰Õ™™•È¤ì(€€€¬¹Í•Ğ¡H°Ü¤ì(€€€Ù…È`€ôP¡°4°°Ü°H¹±•¹Ñ ¤ì(€€€¥˜€¡`€ôô€À€˜˜€˜˜¡°ä°¤°¹Í•Ğ¡¬¹ÍÕ‰…ÉÉ…ä¡°€¬4€¨¤¤°œ¡€´œ À¤¤°`€„ô€À¤Ñ¡É½Ü¹•ÜÉÉ½È ‰5…±™½Éµ•‰Õ™™•È‘…Ñ„è€ˆ€¬`¤ì(€ô(€Ù…ÈŒ€ôì(€€€9=9è€ˆˆ°(€€€=Q!I0è€‰µ•Í¡½ÁÑ}‘•½‘•¥±Ñ•É=Ğˆ°(€€€EUQI9%=8è€‰µ•Í¡½ÁÑ}‘•½‘•¥±Ñ•ÉEÕ…Ğˆ°(€€€aA=99Q%0è€‰µ•Í¡½ÁÑ}‘•½‘•¥±Ñ•ÉáÀˆ°(€€€=1=Hè€‰µ•Í¡½ÁÑ}‘•½‘•¥±Ñ•É½±½Èˆ(€ô° €ôì(€€€QQI%	UQLè€‰µ•Í¡½ÁÑ}‘•½‘•Y•ÉÑ•á	Õ™™•Èˆ°(€€€QI%91Lè€‰µ•Í¡½ÁÑ}‘•½‘•%¹‘•á	Õ™™•Èˆ°(€€€%9%Lè€‰µ•Í¡½ÁÑ}‘•½‘•%¹‘•áM•ÅÕ•¹”ˆ(€ô°€ômt°Ô€ô€Àì(€™Õ¹Ñ¥½¸À¡˜¤ì(€€€Ù…ÈP€ôì(€€€€€½‰©•Ğè¹•Ü]½É­•È¡˜¤°(€€€€€Á•¹‘¥¹œè€À°(€€€€€É•ÅÕ•ÍÑÌèíô(€€€ôì(€€€É•ÑÕÉ¸P¹½‰©•Ğ¹½¹µ•ÍÍ…”€ô™Õ¹Ñ¥½¸¡¤ì(€€€€€Ù…È4€ô¹‘…Ñ„ì(€€€€€P¹Á•¹‘¥¹œ€´ô4¹½Õ¹Ğ°P¹É•ÅÕ•ÍÑÍm4¹¥‘um4¹…Ñ¥½¹t¡4¹Ù…±Õ”¤°‘•±•Ñ”P¹É•ÅÕ•ÍÑÍm4¹¥‘tì(€€€ô°Pì(€ô(€™Õ¹Ñ¥½¸Ø¡˜¤ì(€€€™½È€¡Ù…ÈP€ô€‰Í•±˜¹É•…‘ä€ô]•‰ÍÍ•µ‰±ä¹¥¹ÍÑ…¹Ñ¥…Ñ”¡¹•ÜU¥¹ĞáÉÉ…ä¡lˆ€¬¹•ÜU¥¹ĞáÉÉ…ä¡È¤€¬€‰t¤°íô¤¹Ñ¡•¸¡™Õ¹Ñ¥½¸¡É•ÍÕ±Ğ¤ìÉ•ÍÕ±Ğ¹¥¹ÍÑ…¹”¹•áÁ½ÉÑÌ¹}}İ…Íµ}…±±}Ñ½ÉÌ ¤ìÉ•ÑÕÉ¸É•ÍÕ±Ğ¹¥¹ÍÑ…¹”ìô¤íÍ•±˜¹½¹µ•ÍÍ…”€ô€ˆ€¬´¹¹…µ”€¬€ˆìˆ€¬°¹Ñ½MÑÉ¥¹œ ¤€¬´¹Ñ½MÑÉ¥¹œ ¤°€ô¹•Ü	±½ˆ¡mQt°ìÑåÁ”è€‰Ñ•áĞ½©…Ù…ÍÉ¥ÁĞˆô¤°4€ôUI0¹É•…Ñ•=‰©•ÑUI0¡¤°€ô¹±•¹Ñ ì€ğ˜ì€¬­¤‘mt€ôÀ¡4¤ì(€€€™½È€¡Ù…È€ô˜ì€ğ¹±•¹Ñ ì€¬­¤‘mt¹½‰©•Ğ¹Á½ÍÑ5•ÍÍ…”¡íô¤ì(€€€¹±•¹Ñ €ô˜°UI0¹É•Ù½­•=‰©•ÑUI0¡4¤ì(€ô(€™Õ¹Ñ¥½¸ˆ¡˜°P°°4°¤ì(€€€™½È€¡Ù…ÈH€ô‘lÁt°€ô€Äì€ğ¹±•¹Ñ ì€¬­¤‘mt¹Á•¹‘¥¹œ€ğH¹Á•¹‘¥¹œ€˜˜€¡H€ô‘mt¤ì(€€€É•ÑÕÉ¸¹•ÜAÉ½µ¥Í”¡™Õ¹Ñ¥½¸¡œ°ä¤ì(€€€€€Ù…È€ô¹•ÜU¥¹ĞáÉÉ…ä¡¤°Ü€ô€¬­Ôì(€€€€€H¹Á•¹‘¥¹œ€¬ô˜°H¹É•ÅÕ•ÍÑÍmİt€ôì(€€€€€€€É•Í½±Ù”èœ°(€€€€€€€É•©•Ğèä(€€€€€ô°H¹½‰©•Ğ¹Á½ÍÑ5•ÍÍ…”¡ì(€€€€€€€¥èÜ°(€€€€€€€½Õ¹Ğè˜°(€€€€€€€Í¥é”èP°(€€€€€€€Í½ÕÉ”è°(€€€€€€€µ½‘”è4°(€€€€€€€™¥±Ñ•Èè(€€€€€ô°m¹‰Õ™™•Ét¤ì(€€€ô¤ì(€ô(€™Õ¹Ñ¥½¸´¡˜¤ì(€€€Ù…ÈP€ô˜¹‘…Ñ„ì(€€€Í•±˜¹É•…‘ä¹Ñ¡•¸¡™Õ¹Ñ¥½¸¡¤ì(€€€€€¥˜€ …P¹¥¤É•ÑÕÉ¸Í•±˜¹±½Í” ¤ì(€€€€€ÑÉäì(€€€€€€€Ù…È4€ô¹•ÜU¥¹ĞáÉÉ…ä¡P¹½Õ¹Ğ€¨P¹Í¥é”¤ì(€€€€€€€°¡°¹•áÁ½ÉÑÍmP¹µ½‘•t°4°P¹½Õ¹Ğ°P¹Í¥é”°P¹Í½ÕÉ”°¹•áÁ½ÉÑÍmP¹™¥±Ñ•Ét¤°Í•±˜¹Á½ÍÑ5•ÍÍ…”¡ì(€€€€€€€€€¥èP¹¥°(€€€€€€€€€½Õ¹ĞèP¹½Õ¹Ğ°(€€€€€€€€€…Ñ¥½¸è€‰É•Í½±Ù”ˆ°(€€€€€€€€€Ù…±Õ”è4(€€€€€€€ô°m4¹‰Õ™™•Ét¤ì(€€€€€ô…Ñ €¡¤ì(€€€€€€€Í•±˜¹Á½ÍÑ5•ÍÍ…”¡ì(€€€€€€€€€¥èP¹¥°(€€€€€€€€€½Õ¹ĞèP¹½Õ¹Ğ°(€€€€€€€€€…Ñ¥½¸è€‰É•©•Ğˆ°(€€€€€€€€€Ù…±Õ”è(€€€€€€€ô¤ì(€€€€€ô(€€€ô¤ì(€ô(€É•ÑÕÉ¸ì(€€€É•…‘äè„°(€€€ÍÕÁÁ½ÉÑ•è€„À°(€€€ÕÍ•]½É­•ÉÌè™Õ¹Ñ¥½¸¡˜¤ì(€€€€€Ø¡˜¤ì(€€€ô°(€€€‘•½‘•Y•ÉÑ•á	Õ™™•Èè™Õ¹Ñ¥½¸¡˜°P°°4°¤ì(€€€€€°¡Ì°Ì¹•áÁ½ÉÑÌ¹µ•Í¡½ÁÑ}‘•½‘•Y•ÉÑ•á	Õ™™•È°˜°P°°4°Ì¹•áÁ½ÉÑÍmmut¤ì(€€€ô°(€€€‘•½‘•%¹‘•á	Õ™™•Èè™Õ¹Ñ¥½¸¡˜°P°°4¤ì(€€€€€°¡Ì°Ì¹•áÁ½ÉÑÌ¹µ•Í¡½ÁÑ}‘•½‘•%¹‘•á	Õ™™•È°˜°P°°4¤ì(€€€ô°(€€€‘•½‘•%¹‘•áM•ÅÕ•¹”è™Õ¹Ñ¥½¸¡˜°P°°4¤ì(€€€€€°¡Ì°Ì¹•áÁ½ÉÑÌ¹µ•Í¡½ÁÑ}‘•½‘•%¹‘•áM•ÅÕ•¹”°˜°P°°4¤ì(€€€ô°(€€€‘•½‘•±Ñ™	Õ™™•Èè™Õ¹Ñ¥½¸¡˜°P°°4°°H¤ì(€€€€€°¡Ì°Ì¹•áÁ½ÉÑÍm¡mut°˜°P°°4°Ì¹•áÁ½ÉÑÍmmIut¤ì(€€€ô°(€€€‘•½‘•±Ñ™	Õ™™•ÉÍå¹Œè™Õ¹Ñ¥½¸¡˜°P°°4°¤ì(€€€€€É•ÑÕÉ¸¹±•¹Ñ €ø€À€üˆ¡˜°P°°¡m5t°mt¤€è„¹Ñ¡•¸¡™Õ¹Ñ¥½¸ ¤ì(€€€€€€€Ù…ÈH€ô¹•ÜU¥¹ĞáÉÉ…ä¡˜€¨P¤ì(€€€€€€€É•ÑÕÉ¸°¡Ì°Ì¹•áÁ½ÉÑÍm¡m5ut°H°˜°P°°Ì¹•áÁ½ÉÑÍmmut¤°Hì(€€€€€ô¤ì(€€€ô(€ôì)ô¤ ¤°!Ğ€ô‘½Õµ•¹Ğ¹ÅÕ•ÉåM•±•Ñ½È ‰m‘…Ñ„µ…¹…Ñ½µäµÙ¥•İ•Étˆ¤ì)¥˜€¡!Ğ¤ì(€±•ĞÔ€ô™Õ¹Ñ¥½¸¡À¤ì(€€€È¹Ñ•áÑ½¹Ñ•¹Ğ€ôÀ¹±…‰•°°Ì¹Ñ•áÑ½¹Ñ•¹Ğ€ôÀ¹±…Ñ¥¸°„¹Ñ•áÑ½¹Ñ•¹Ğ€ôÀ¹‘•Ñ…¥°°¼¹Ñ•áÑ½¹Ñ•¹Ğ€ôÀ¹™±½Ü°°¹™½É…  ¡Ø¤€ôøì(€€€€€½¹ÍĞˆ€ôØ¹‘…Ñ…Í•Ğ¹ÍÑÉÕÑÕÉ•%€ôôôÀ¹¥ì(€€€€€Ø¹±…ÍÍ1¥ÍĞ¹Ñ½±” ‰¥Ìµ…Ñ¥Ù”ˆ°ˆ¤°Ø¹Í•ÑÑÑÉ¥‰ÕÑ” ‰…É¥„µÁÉ•ÍÍ•ˆ°MÑÉ¥¹œ¡ˆ¤¤ì(€€€ô¤ì(€ôì(€½¹ÍĞ”€ô!Ğ¹ÅÕ•ÉåM•±•Ñ½È ‰…¹Ù…Ìˆ¤°Ğ€ô!Ğ¹ÅÕ•ÉåM•±•Ñ½È ‰m‘…Ñ„µ…¹…Ñ½µäµ±½…‘¥¹tˆ¤°¤€ô!Ğ¹ÅÕ•ÉåM•±•Ñ½È ‰m‘…Ñ„µ…¹…Ñ½µäµÁÉ½É•ÍÍtˆ¤°¸€ô‘½Õµ•¹Ğ¹ÅÕ•ÉåM•±•Ñ½È ‰m‘…Ñ„µ…¹…Ñ½µäµÍÑ…ÑÕÍtˆ¤°È€ô‘½Õµ•¹Ğ¹ÅÕ•ÉåM•±•Ñ½È ‰m‘…Ñ„µÍÑÉÕÑÕÉ”µÑ¥Ñ±•tˆ¤°Ì€ô‘½Õµ•¹Ğ¹ÅÕ•ÉåM•±•Ñ½È ‰m‘…Ñ„µÍÑÉÕÑÕÉ”µ±…Ñ¥¹tˆ¤°„€ô‘½Õµ•¹Ğ¹ÅÕ•ÉåM•±•Ñ½È ‰m‘…Ñ„µÍÑÉÕÑÕÉ”µ‘•Ñ…¥±tˆ¤°¼€ô‘½Õµ•¹Ğ¹ÅÕ•ÉåM•±•Ñ½È ‰m‘…Ñ„µÍÑÉÕÑÕÉ”µ™±½İtˆ¤°°€ôl¸¸¹‘½Õµ•¹Ğ¹ÅÕ•ÉåM•±•Ñ½É±° ‰m‘…Ñ„µÍÑÉÕÑÕÉ”µ¥‘tˆ¥t°Œ€ô!Ğ¹ÅÕ•ÉåM•±•Ñ½È ‰m‘…Ñ„µ¡½ÑÍÁ½Ğµ±…å•Étˆ¤° €ôµ…Ñ¡5•‘¥„ ˆ¡ÁÉ•™•ÉÌµÉ•‘Õ•µµ½Ñ¥½¸èÉ•‘Õ”¤ˆ¤¹µ…Ñ¡•Ì°€ôl(€€€ì(€€€€€¥è€‰…½ÉÑ„ˆ°(€€€€€±…‰•°è€‰½ÉÑ„ˆ°(€€€€€±…Ñ¥¸è€‰½ÉÑ„ˆ°(€€€€€‘•Ñ…¥°è€‰5…¥½È…ÉÓ¥É¥„‘¼½ÉÁ¼¸I••‰”¼Í…¹Õ”•©•Ñ…‘¼Á•±¼Ù•¹ÑËµÕ±¼•ÍÅÕ•É‘¼”¼‘¥ÍÑÉ¥‰Õ¤Á…É„„¥ÉÕ±‡Ÿ¼Í¥ÍÓ©µ¥„¸ˆ°(€€€€€™±½Üè€‰M…¹Õ”½á¥•¹…‘¼ƒŠH½ÉÁ¼ˆ°(€€€€€Á½¥¹Ğèl(€€€€€€€€´À¸ÌÔ°(€€€€€€€€Ä¸ØÔ°(€€€€€€€€À¸ÔÔ(€€€€€t°(€€€€€½±½Èè€ˆ•˜ÙˆØÈˆ(€€€ô°(€€€ì(€€€€€¥è€‰±•™Ğµ…ÑÉ¥Õ´ˆ°(€€€€€±…‰•°è€‹ÑÉ¥¼•ÍÅÕ•É‘¼ˆ°(€€€€€±…Ñ¥¸è€‰ÑÉ¥Õ´Í¥¹¥ÍÑÉÕ´ˆ°(€€€€€‘•Ñ…¥°è€‰‰µ…É„ÅÕ”É••‰”¼Í…¹Õ”½á¥•¹…‘¼ÁÉ½Ù•¹¥•¹Ñ”‘…ÌÙ•¥…ÌÁÕ±µ½¹…É•Ì”¼‘¥É•¥½¹„…¼Ù•¹ÑËµÕ±¼•ÍÅÕ•É‘¼¸ˆ°(€€€€€™±½Üè€‰AÕ±·Õ•ÌƒŠHÙ•¹ÑËµÕ±¼•ÍÅÕ•É‘¼ˆ°(€€€€€Á½¥¹Ğèl(€€€€€€€€À¸àÈ°(€€€€€€€€À¸ØÔ°(€€€€€€€€À¸Ô(€€€€€t°(€€€€€½±½Èè€ˆ˜É„ÌÍˆˆ(€€€ô°(€€€ì(€€€€€¥è€‰É¥¡Ğµ…ÑÉ¥Õ´ˆ°(€€€€€±…‰•°è€‹ÑÉ¥¼‘¥É•¥Ñ¼ˆ°(€€€€€±…Ñ¥¸è€‰ÑÉ¥Õ´‘•áÑÉÕ´ˆ°(€€€€€‘•Ñ…¥°è€‰I••‰”¼Í…¹Õ”Ù•¹½Í¼Á•±…ÌÙ•¥…Ì…Ù…Ì”Á•±¼Í•¥¼½É½»…É¥¼…¹Ñ•Ì‘”•¹Ù§„µ±¼…¼Ù•¹ÑËµÕ±¼‘¥É•¥Ñ¼¸ˆ°(€€€€€™±½Üè€‰½ÉÁ¼ƒŠHÙ•¹ÑËµÕ±¼‘¥É•¥Ñ¼ˆ°(€€€€€Á½¥¹Ğèl(€€€€€€€€´À¸ä°(€€€€€€€€À¸ÌÔ°(€€€€€€€€À¸ÔÔ(€€€€€t°(€€€€€½±½Èè€ˆŒØÌäÍàˆ(€€€ô°(€€€ì(€€€€€¥è€‰±•™ĞµÙ•¹ÑÉ¥±”ˆ°(€€€€€±…‰•°è€‰Y•¹ÑËµÕ±¼•ÍÅÕ•É‘¼ˆ°(€€€€€±…Ñ¥¸è€‰Y•¹ÑÉ¥Õ±ÕÌÍ¥¹¥ÍÑ•Èˆ°(€€€€€‘•Ñ…¥°è€‰‰µ…É„‘”Á…É•‘”•ÍÁ•ÍÍ„ÅÕ”•É„„ÁÉ•ÍÏ¼¹••ÍÏ…É¥„Á…É„¥µÁÕ±Í¥½¹…È¼Í…¹Õ”Á½ÈÑ½‘„„¥ÉÕ±‡Ÿ¼Í¥ÍÓ©µ¥„¸ˆ°(€€€€€™±½Üè€‰½É‡Ÿ¼ƒŠH…½ÉÑ„ƒŠH½ÉÁ¼ˆ°(€€€€€Á½¥¹Ğèl(€€€€€€€€À¸Ü°(€€€€€€€€´À¸ÜÔ°(€€€€€€€€À¸ØÔ(€€€€€t°(€€€€€½±½Èè€ˆ˜É„ÌÍˆˆ(€€€ô°(€€€ì(€€€€€¥è€‰É¥¡ĞµÙ•¹ÑÉ¥±”ˆ°(€€€€€±…‰•°è€‰Y•¹ÑËµÕ±¼‘¥É•¥Ñ¼ˆ°(€€€€€±…Ñ¥¸è€‰Y•¹ÑÉ¥Õ±ÕÌ‘•áÑ•Èˆ°(€€€€€‘•Ñ…¥°è€‰	½µ‰•¥„¼Í…¹Õ”Ù•¹½Í¼…ÑÉ…Û¥Ì‘¼ÑÉ½¹¼ÁÕ±µ½¹…È•´‘¥É—Ÿ¼…½ÌÁÕ±·Õ•ÌÁ…É„É•…±¥é…È„¡•µ…Ñ½Í”¸ˆ°(€€€€€™±½Üè€‰½É‡Ÿ¼ƒŠHÁÕ±·Õ•Ìˆ°(€€€€€Á½¥¹Ğèl(€€€€€€€€´À¸ØÔ°(€€€€€€€€´À¸Øà°(€€€€€€€€À¸ØØ(€€€€€t°(€€€€€½±½Èè€ˆ•˜ÙˆØÈˆ(€€€ô°(€€€ì(€€€€€¥è€‰µ¥ÑÉ…°ˆ°(€€€€€±…‰•°è€‰Y…±Ù„µ¥ÑÉ…°ˆ°(€€€€€±…Ñ¥¸è€‰Y…±Ù„…ÑÉ¥½Ù•¹ÑÉ¥Õ±…É¥ÌÍ¥¹¥ÍÑÉ„ˆ°(€€€€€‘•Ñ…¥°è€‰Y…±Ù„‰¥éÍÁ¥‘”•¹ÑÉ”¼ƒ…ÑÉ¥¼”¼Ù•¹ÑËµÕ±¼•ÍÅÕ•É‘½Ì¸Ù¥Ñ„¼É•™±Õá¼‘ÕÉ…¹Ñ”„ÏµÍÑ½±”Ù•¹ÑÉ¥Õ±…È¸ˆ°(€€€€€™±½Üè€‰±Õá¼Õ¹¥‘¥É•¥½¹…°¹¼½É‡Ÿ¼•ÍÅÕ•É‘¼ˆ°(€€€€€Á½¥¹Ğèl(€€€€€€€€À¸Äà°(€€€€€€€€´Ä¸ÌÔ°(€€€€€€€€À¸Ğà(€€€€€t°(€€€€€½±½Èè€ˆäá™ŒÀˆ(€€€ô(€tì(€”èì(€€€±•Ğ€ô™Õ¹Ñ¥½¸¡Ù”¤ì(€€€€€¸€˜˜€¡¸¹Ñ•áÑ½¹Ñ•¹Ğ€ôÙ”¤ì(€€€ô°Ü€ô™Õ¹Ñ¥½¸¡Ù”°å”€ô€„Ä¤ì(€€€€€½¹ÍĞ €ô¹™¥¹ ¡D¤€ôøD¹¥€ôôôÙ”¤ì(€€€€€¥˜€¡ ¤ì(€€€€€€€¥˜€¡Ô¡ ¤°œ¹™½É…  ¡D°‘”¤€ôøD¹±…ÍÍ1¥ÍĞ¹Ñ½±” ‰¥Ìµ…Ñ¥Ù”ˆ°‘”€ôôôÙ”¤¤°ü¹…Ñ¥Ù”€˜˜å”¤ì(€€€€€€€€€½¹ÍĞD€ô¹Ñ…É•Ğ€ôôôÙ”ì(€€€€€€€€€¹…¹Íİ•È¡Ù”°D¤ì(€€€€€€€€€É•ÑÕÉ¸ì(€€€€€€€ô(€€€€€€€¡€‘í ¹±…‰•±ô¸€‘í ¹‘•Ñ…¥±õ€¤ì(€€€€€ô(€€€ô°¬€ô™Õ¹Ñ¥½¸ ¤ì(€€€€€½¹ÍĞÙ”€ô!Ğ¹•Ñ	½Õ¹‘¥¹±¥•¹ÑI•Ğ ¤°å”€ô5…Ñ ¹µ…à Ä°5…Ñ ¹É½Õ¹¡Ù”¹İ¥‘Ñ ¤¤° €ô5…Ñ ¹µ…à Ä°5…Ñ ¹É½Õ¹¡Ù”¹¡•¥¡Ğ¤¤ì(€€€€€ˆ¹Í•ÑM¥é”¡å”° °€„Ä¤°Ø¹…ÍÁ•Ğ€ôå”€¼ °Ø¹ÕÁ‘…Ñ•AÉ½©•Ñ¥½¹5…ÑÉ¥à ¤ì(€€€ô°`€ô™Õ¹Ñ¥½¸ ¤ì(€€€€€¥˜€ …¤É•ÑÕÉ¸ì(€€€€€½¹ÍĞÙ”€ô!Ğ¹±¥•¹Ñ]¥‘Ñ °å”€ô!Ğ¹±¥•¹Ñ!•¥¡Ğì(€€€€€™½È€¡½¹ÍĞ ½˜¤ì(€€€€€€€ä¹Í•Ğ ¸¸¹ ¹Á½¥¹Ğ¤¹…ÁÁ±å5…ÑÉ¥àĞ¡¹µ…ÑÉ¥á]½É±¤¹ÁÉ½©•Ğ¡Ø¤ì(€€€€€€€½¹ÍĞD€ôœ¹•Ğ¡ ¹¥¤ì(€€€€€€€D¹ÍÑå±”¹ÑÉ…¹Í™½É´€ôÑÉ…¹Í±…Ñ”Í ‘ì¡ä¹à€¨€À¸Ô€¬€À¸Ô¤€¨Ù•õÁà°€‘ì µä¹ä€¨€À¸Ô€¬€À¸Ô¤€¨å•õÁà°€À¥€°D¹¡¥‘‘•¸€ô€…Hñğä¹è€ø€Äì(€€€€€ô(€€€ô°Ä€ô™Õ¹Ñ¥½¸ ¤ì(€€€€€´¹ÕÁ‘…Ñ” ¤°ˆ¹É•¹‘•È¡À°Ø¤°` ¤°É•ÅÕ•ÍÑ¹¥µ…Ñ¥½¹É…µ”¡Ä¤ì(€€€ô°”€ô™Õ¹Ñ¥½¸ ¤ì(€€€€€½¹ÍĞÙ”€ô¹™¥±Ñ•È ¡ ¤€ôø ¹¥€„ôôü¹Ñ…É•Ğ¤°å”€ôÙ•m5…Ñ ¹™±½½È¡5…Ñ ¹É…¹‘½´ ¤€¨Ù”¹±•¹Ñ ¥tì(€€€€€¹Ñ…É•Ğ€ôå”¹¥°Ñ”¹Ñ•áÑ½¹Ñ•¹Ğ€ôå”¹±…‰•°°€¹Ñ•áÑ½¹Ñ•¹Ğ€ô€‰Q½ÅÕ”¹¼Á½¹Ñ¼½ÉÉ•ÍÁ½¹‘•¹Ñ”¹¼µ½‘•±¼¸ˆ°€¹±…ÍÍ9…µ”€ô€‰ÅÕ¥èµ™••‘‰…¬ˆì(€€€ôì(€€€½¹ÍĞÀ€ô¹•Ü±  ¤°Ø€ô¹•ÜĞ ÌĞ°€Ä°€À¸Ä°€ÄÀÀ¤ì(€€€Ø¹Á½Í¥Ñ¥½¸¹Í•Ğ À°€À¸àÔ°€Ü¸Ø¤ì(€€€±•Ğˆì(€€€ÑÉäì(€€€€€ˆ€ô¹•Ü%˜¡ì(€€€€€€€…¹Ù…Ìè”°(€€€€€€€…¹Ñ¥…±¥…Ìè€„À°(€€€€€€€…±Á¡„è€„À°(€€€€€€€Á½İ•ÉAÉ•™•É•¹”è€‰¡¥ µÁ•É™½Éµ…¹”ˆ(€€€€€ô¤ì(€€€ô…Ñ ì(€€€€€Ğ¹±…ÍÍ1¥ÍĞ¹…‘ ‰…¹…Ñ½µäµÍÑ…Ñ¥Œµ™…±±‰…¬ˆ¤°Ğ¹¥¹¹•É!Q50€ô€œñ¥µœÍÉŒôˆ½…ÍÍ•ÑÌ½¥µœ½…¹…Ñ½µ¥„½½É……¼µ•ÍÑ…Ñ¥¼¹İ•‰Àˆ…±Ğô‰Y¥ÍÑ„…¹…ÓÑµ¥„•áÑ•É¹„‘¼½É‡Ÿ¼¡Õµ…¹¼ˆøñÍÑÉ½¹œùY¥ÍÕ…±¥é‡Ÿ¼•ÍÓ…Ñ¥„ğ½ÍÑÉ½¹œøñÍÁ…¸ùM•Ô¹…Ù•…‘½È»¼‘¥ÍÁ½¹¥‰¥±¥é½Ô¼µ½‘¼€Í¸Ì•ÍÑÉÕÑÕÉ…Ì”¼½¹Ñ—é‘¼½¹Ñ¥¹Õ…´…•ÍÏµÙ•¥Ì…¼±…‘¼¸ğ½ÍÁ…¸øœ°!Ğ¹±…ÍÍ1¥ÍĞ¹…‘ ‰¥ÌµÍÑ…Ñ¥Œˆ¤°¸€˜˜€¡¸¹Ñ•áÑ½¹Ñ•¹Ğ€ô€‰<µ½‘¼ÑÉ¥‘¥µ•¹Í¥½¹…°»¼•ÍÓ„‘¥ÍÁ½»µÙ•°¹•ÍÑ”¹…Ù•…‘½È¸Uµ„¥µ…•´•ÍÓ…Ñ¥„‘¼½É‡Ÿ¼™½¤•á¥‰¥‘„¸ˆ¤°°¹™½É…  ¡å”¤€ôøå”¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰±¥¬ˆ°€ ¤€ôøì(€€€€€€€½¹ÍĞ €ô¹™¥¹ ¡D¤€ôøD¹¥€ôôôå”¹‘…Ñ…Í•Ğ¹ÍÑÉÕÑÕÉ•%¤ì(€€€€€€€ €˜˜Ô¡ ¤ì(€€€€€ô¤¤ì(€€€€€½¹ÍĞÙ”€ô‘½Õµ•¹Ğ¹ÅÕ•ÉåM•±•Ñ½È ‰m‘…Ñ„µÅÕ¥èµÍÑ…ÉÑtˆ¤ì(€€€€€Ù”€˜˜€¡Ù”¹‘¥Í…‰±•€ô€„À°Ù”¹Ñ•áÑ½¹Ñ•¹Ğ€ô€‰EÕ¥è‘¥ÍÁ½»µÙ•°¹¼µ½‘¼€Íˆ¤ì(€€€€€‰É•…¬”ì(€€€ô(€€€ˆ¹Í•ÑA¥á•±I…Ñ¥¼¡5…Ñ ¹µ¥¸¡‘•Ù¥•A¥á•±I…Ñ¥¼°¥¹¹•É]¥‘Ñ €ğ€ÜØÀ€ü€Ä¸Ğ€è€È¤¤°ˆ¹½ÕÑÁÕÑ½±½ÉMÁ…”€ôáĞ°ˆ¹Ñ½¹•5…ÁÁ¥¹œ€ô€Ğ°ˆ¹Ñ½¹•5…ÁÁ¥¹áÁ½ÍÕÉ”€ô€Ä¸ÀÌì(€€€½¹ÍĞ´€ô¹•ÜÀ¡Ø°”¤ì(€€€´¹•¹…‰±•…µÁ¥¹œ€ô€„À°´¹‘…µÁ¥¹…Ñ½È€ô€À¸ÀÔÔ°´¹•¹…‰±•A…¸€ô€„Ä°´¹µ¥¹¥ÍÑ…¹”€ô€Ğ¸Ğ°´¹µ…á¥ÍÑ…¹”€ô€ÄÄ°´¹Ñ…É•Ğ¹Í•Ğ À°€À°€À¤°´¹…ÕÑ½I½Ñ…Ñ”€ô€… °´¹…ÕÑ½I½Ñ…Ñ•MÁ••€ô€À¸Ü°À¹…‘¡¹•Ü€‘  ÄØÜÜĞàäÌ°€ÈĞÌÄÔÈØ°€È¸ÄÔ¤¤ì(€€€½¹ÍĞ˜€ô¹•Ü9È ÄØÜÜÌÀäÀ°€Ğ¸È¤ì(€€€˜¹Á½Í¥Ñ¥½¸¹Í•Ğ Ğ¸Ô°€Ø°€Ø¤°À¹…‘¡˜¤ì(€€€½¹ÍĞP€ô¹•Ü9È ÄÈÄÜàØàÜ°€È¸Ä¤ì(€€€P¹Á½Í¥Ñ¥½¸¹Í•Ğ ´Ô°€Ä¸Ô°€Ô¤°À¹…‘¡P¤ì(€€€½¹ÍĞ€ô¹•Ü9È ÄØÜĞĞÌÀÈ°€È¸Ğ¤ì(€€€¹Á½Í¥Ñ¥½¸¹Í•Ğ ´Ğ°€Ì°€´Ğ¤°À¹…‘¡¤ì(€€€½¹ÍĞ4€ô¹•ÜĞ¡¹•Ü  È¸ÀÔ°€È¸Äà°€À¸ÈÈ°€ØĞ¤°¹•ÜaÈ¡ì(€€€€€½±½Èè€ÄĞĞÜÜÌÀÄ°(€€€€€É½Õ¡¹•ÍÌè€À¸ÜĞ°(€€€€€µ•Ñ…±¹•ÍÌè€À¸ÀĞ(€€€ô¤¤ì(€€€4¹Á½Í¥Ñ¥½¸¹ä€ô€´È¸ĞÈ°À¹…‘¡4¤ì(€€€±•Ğ€ô¹Õ±°ì(€€€‘lÁtì(€€€±•ĞH€ô€„À°€ô¹Õ±°ì(€€€½¹ÍĞœ€ô€¼¨}}AUI}|€¨¼¹•Ü5…À ¤°ä€ô¹•Ü8 ¤ì(€€€™½È€¡½¹ÍĞÙ”½˜¤ì(€€€€€½¹ÍĞå”€ô‘½Õµ•¹Ğ¹É•…Ñ•±•µ•¹Ğ ‰‰ÕÑÑ½¸ˆ¤ì(€€€€€å”¹ÑåÁ”€ô€‰‰ÕÑÑ½¸ˆ°å”¹±…ÍÍ9…µ”€ô€‰…¹…Ñ½µäµ¡½ÑÍÁ½Ğˆ°å”¹‘…Ñ…Í•Ğ¹¡½ÑÍÁ½Ñ%€ôÙ”¹¥°å”¹ÍÑå±”¹Í•ÑAÉ½Á•ÉÑä ˆ´µ¡½ÑÍÁ½Ğˆ°Ù”¹½±½È¤°å”¹¥¹¹•É!Q50€ô€ñÍÁ…¸±…ÍÌô‰…¹…Ñ½µäµ¡½ÑÍÁ½Ğµ‘½Ğˆ…É¥„µ¡¥‘‘•¸ô‰ÑÉÕ”ˆøğ½ÍÁ…¸øñÍÁ…¸±…ÍÌô‰…¹…Ñ½µäµ¡½ÑÍÁ½Ğµ±…‰•°ˆø‘íÙ”¹±…‰•±ôğ½ÍÁ…¸ù€°å”¹Í•ÑÑÑÉ¥‰ÕÑ” ‰…É¥„µ±…‰•°ˆ°Y•È€‘íÙ”¹±…‰•±õ€¤°å”¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰±¥¬ˆ°€ ¤€ôøÜ¡Ù”¹¥°€„À¤¤°Œ¹…ÁÁ•¹¡å”¤°œ¹Í•Ğ¡Ù”¹¥°å”¤ì(€€€ô(€€€°¹™½É…  ¡Ù”¤€ôøÙ”¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰±¥¬ˆ°€ ¤€ôøÜ¡Ù”¹‘…Ñ…Í•Ğ¹ÍÑÉÕÑÕÉ•%¤¤¤°¹•ÜU˜ ¤¹Í•Ñ5•Í¡½ÁÑ•½‘•È¡À¤¹±½… ˆ½…ÍÍ•ÑÌ½µ½‘•±Ì½…¹…Ñ½µ¥„½½É……¼¹±ˆˆ°€¡Ù”¤€ôøì(€€€€€€ôÙ”¹Í•¹”ì(€€€€€½¹ÍĞå”€ô¹•ÜÕ¤ ¤¹Í•ÑÉ½µ=‰©•Ğ¡¤° €ôå”¹•ÑM¥é”¡¹•Ü8 ¤¤°D€ôå”¹•Ñ•¹Ñ•È¡¹•Ü8 ¤¤°‘”€ô€Ğ¸ÈÔ€¼5…Ñ ¹µ…à¡ ¹à° ¹ä° ¹è¤ì(€€€€€¹Á½Í¥Ñ¥½¸¹ÍÕˆ¡D¤°¹Í…±”¹Í•ÑM…±…È¡‘”¤°¹É½Ñ…Ñ¥½¸¹ä€ô€´À¸Àà°¹ÑÉ…Ù•ÉÍ” ¡±”¤€ôøì(€€€€€€€±”¹¥Í5•Í €˜˜€¡±”¹µ…Ñ•É¥…°€ô±”¹µ…Ñ•É¥…°¹±½¹” ¤°±”¹µ…Ñ•É¥…°¹É½Õ¡¹•ÍÌ€ô5…Ñ ¹µ¥¸ À¸ÜÈ°±”¹µ…Ñ•É¥…°¹É½Õ¡¹•ÍÌ€üü€À¸ØÈ¤°±”¹µ…Ñ•É¥…°¹µ•Ñ…±¹•ÍÌ€ô€À¤ì(€€€€€ô¤°À¹…‘¡¤°Ğ¹±…ÍÍ1¥ÍĞ¹…‘ ‰¥Ìµ¡¥‘‘•¸ˆ¤°!Ğ¹±…ÍÍ1¥ÍĞ¹…‘ ‰¥ÌµÉ•…‘äˆ¤° ‰5½‘•±¼ÑÉ¥‘¥µ•¹Í¥½¹…°‘¼½É‡Ÿ¼…ÉÉ•…‘¼¸ÉÉ…ÍÑ”Á…É„¥É…È”ÕÍ”„É½‘„‘¼µ½ÕÍ”Á…É„…ÁÉ½á¥µ…È¸ˆ¤ì(€€€ô°€¡Ù”¤€ôøì(€€€€€Ù”¹Ñ½Ñ…°€˜˜¤€˜˜€¡¤¹ÍÑå±”¹İ¥‘Ñ €ô€‘í5…Ñ ¹µ¥¸ ÄÀÀ°Ù”¹±½…‘•€¼Ù”¹Ñ½Ñ…°€¨€ÄÀÀ¥ô•€¤ì(€€€ô°€ ¤€ôøì(€€€€€Ğ¹ÅÕ•ÉåM•±•Ñ½È ‰ÍÑÉ½¹œˆ¤¹Ñ•áÑ½¹Ñ•¹Ğ€ô€‰;¼™½¤Á½ÍÏµÙ•°…ÉÉ•…È¼µ½‘•±¼ˆ°Ğ¹ÅÕ•ÉåM•±•Ñ½È ‰ÍÁ…¸ˆ¤¹Ñ•áÑ½¹Ñ•¹Ğ€ô€‰Q•¹Ñ”…ÑÕ…±¥é…È„Ã…¥¹„¸ˆ° ‰…±¡„…¼…ÉÉ•…È¼µ½‘•±¼ÑÉ¥‘¥µ•¹Í¥½¹…°‘¼½É‡Ÿ¼¸ˆ¤ì(€€€ô¤°¹•ÜI•Í¥é•=‰Í•ÉÙ•È¡¬¤¹½‰Í•ÉÙ”¡!Ğ¤°¬ ¤°Ä ¤°‘½Õµ•¹Ğ¹ÅÕ•ÉåM•±•Ñ½È ‰m‘…Ñ„µ…¹…Ñ½µäµÉ•Í•Ñtˆ¤ü¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰±¥¬ˆ°€ ¤€ôøì(€€€€€Ø¹Á½Í¥Ñ¥½¸¹Í•Ğ À°€À¸àÔ°€Ü¸Ø¤°´¹Ñ…É•Ğ¹Í•Ğ À°€À°€À¤°´¹ÕÁ‘…Ñ” ¤° ‰Y¥ÍÕ…±¥é‡Ÿ¼¥¹¥¥…°É•ÍÑ…ÕÉ…‘„¸ˆ¤ì(€€€ô¤ì(€€€½¹ÍĞ€ô‘½Õµ•¹Ğ¹ÅÕ•ÉåM•±•Ñ½È ‰m‘…Ñ„µ…¹…Ñ½µäµÉ½Ñ…Ñ•tˆ¤ì(€€€ü¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰±¥¬ˆ°€ ¤€ôøì(€€€€€´¹…ÕÑ½I½Ñ…Ñ”€ô€…´¹…ÕÑ½I½Ñ…Ñ”°¹±…ÍÍ1¥ÍĞ¹Ñ½±” ‰¥Ìµ…Ñ¥Ù”ˆ°´¹…ÕÑ½I½Ñ…Ñ”¤°¹Í•ÑÑÑÉ¥‰ÕÑ” ‰…É¥„µÁÉ•ÍÍ•ˆ°MÑÉ¥¹œ¡´¹…ÕÑ½I½Ñ…Ñ”¤¤°¡´¹…ÕÑ½I½Ñ…Ñ”€ü€‰I½Ñ‡Ÿ¼…ÕÑ½·…Ñ¥„…Ñ¥Ù…‘„¸ˆ€è€‰I½Ñ‡Ÿ¼…ÕÑ½·…Ñ¥„Á…ÕÍ…‘„¸ˆ¤ì(€€€ô¤°ü¹±…ÍÍ1¥ÍĞ¹Ñ½±” ‰¥Ìµ…Ñ¥Ù”ˆ°´¹…ÕÑ½I½Ñ…Ñ”¤°ü¹Í•ÑÑÑÉ¥‰ÕÑ” ‰…É¥„µÁÉ•ÍÍ•ˆ°MÑÉ¥¹œ¡´¹…ÕÑ½I½Ñ…Ñ”¤¤ì(€€€½¹ÍĞ,€ô‘½Õµ•¹Ğ¹ÅÕ•ÉåM•±•Ñ½È ‰m‘…Ñ„µ…¹…Ñ½µäµ±…‰•±Ítˆ¤ì(€€€,ü¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰±¥¬ˆ°€ ¤€ôøì(€€€€€H€ô€…H°,¹±…ÍÍ1¥ÍĞ¹Ñ½±” ‰¥Ìµ…Ñ¥Ù”ˆ°H¤°,¹Í•ÑÑÑÉ¥‰ÕÑ” ‰…É¥„µÁÉ•ÍÍ•ˆ°MÑÉ¥¹œ¡H¤¤°¡H€ü€‰%‘•¹Ñ¥™¥‡ŸÕ•ÌÙ¥ÏµÙ•¥Ì¸ˆ€è€‰%‘•¹Ñ¥™¥‡ŸÕ•Ì½Õ±Ñ…Ì¸ˆ¤ì(€€€ô¤°,ü¹±…ÍÍ1¥ÍĞ¹…‘ ‰¥Ìµ…Ñ¥Ù”ˆ¤°‘½Õµ•¹Ğ¹ÅÕ•ÉåM•±•Ñ½È ‰m‘…Ñ„µ…¹…Ñ½µäµ™Õ±±ÍÉ••¹tˆ¤ü¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰±¥¬ˆ°…Íå¹Œ€ ¤€ôøì(€€€€€‘½Õµ•¹Ğ¹™Õ±±ÍÉ••¹±•µ•¹Ğ€ü…İ…¥Ğ‘½Õµ•¹Ğ¹•á¥ÑÕ±±ÍÉ••¸ü¸ ¤€è…İ…¥Ğ!Ğ¹É•ÅÕ•ÍÑÕ±±ÍÉ••¸ü¸ ¤ì(€€€ô¤ì(€€€½¹ÍĞ<€ô‘½Õµ•¹Ğ¹ÅÕ•ÉåM•±•Ñ½È ‰m‘…Ñ„µ…¹…Ñ½µäµÅÕ¥étˆ¤°Ñ”€ô<ü¹ÅÕ•ÉåM•±•Ñ½È ‰m‘…Ñ„µÅÕ¥èµÑ…É•Ñtˆ¤°€€ô<ü¹ÅÕ•ÉåM•±•Ñ½È ‰m‘…Ñ„µÅÕ¥èµ™••‘‰…­tˆ¤°¥”€ô<ü¹ÅÕ•ÉåM•±•Ñ½È ‰m‘…Ñ„µÅÕ¥èµÍ½É•tˆ¤°Õ”€ô‘½Õµ•¹Ğ¹ÅÕ•ÉåM•±•Ñ½È ‰m‘…Ñ„µÅÕ¥èµÍÑ…ÉÑtˆ¤ì(€€€Õ”ü¹…‘‘Ù•¹Ñ1¥ÍÑ•¹•È ‰±¥¬ˆ°€ ¤€ôøì(€€€€€<¹¡¥‘‘•¸€ô€„Ä°H€ô€„À°€ôì(€€€€€€€…Ñ¥Ù”è€„À°(€€€€€€€Ñ…É•Ğè¹Õ±°°(€€€€€€€½ÉÉ•Ğè€À°(€€€€€€€Ñ½Ñ…°è€À°(€€€€€€€…¹Íİ•È¡Ù”°å”¤ì(€€€€€€€€€Ñ¡¥Ì¹Ñ½Ñ…°€¬ô€Ä°å”€˜˜€¡Ñ¡¥Ì¹½ÉÉ•Ğ€¬ô€Ä¤°¥”¹Ñ•áÑ½¹Ñ•¹Ğ€ô€‘íÑ¡¥Ì¹½ÉÉ•Ñô¼‘íÑ¡¥Ì¹Ñ½Ñ…±õ€°€¹Ñ•áÑ½¹Ñ•¹Ğ€ôå”€ü€‰½ÉÉ•Ñ¼„AËÍá¥µ„•ÍÑÉÕÑÕÉ‡Š˜ˆ€èEÕ…Í”¸Y½¨µ…É½Ô€‘í¹™¥¹ ¡ ¤€ôø ¹¥€ôôôÙ”¤ü¹±…‰•±ô¹€°€¹±…ÍÍ9…µ”€ôÅÕ¥èµ™••‘‰…¬€‘íå”€ü€‰¥Ìµ½ÉÉ•Ğˆ€è€‰¥ÌµİÉ½¹œ‰õ€°İ¥¹‘½Ü¹Í•ÑQ¥µ•½ÕĞ¡”°å”€ü€àÔÀ€è€ÄÔÀÀ¤ì(€€€€€€€ô(€€€€€ô°´¹…ÕÑ½I½Ñ…Ñ”€ô€„Ä°Õ”¹Ñ•áÑ½¹Ñ•¹Ğ€ô€‰I•¥¹¥¥…ÈÅÕ¥èˆ°¥”¹Ñ•áÑ½¹Ñ•¹Ğ€ô€ˆÀ¼Àˆ°” ¤°<¹ÍÉ½±±%¹Ñ½Y¥•Ü¡ì(€€€€€€€‰•¡…Ù¥½Èè €ü€‰…ÕÑ¼ˆ€è€‰Íµ½½Ñ ˆ°(€€€€€€€‰±½¬è€‰¹•…É•ÍĞˆ(€€€€€ô¤ì(€€€ô¤°Ü ‰…½ÉÑ„ˆ¤ì(€ô)ô(