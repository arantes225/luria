(function (root, factory) {
  const scheduler = factory();
  if (typeof module === "object" && module.exports) module.exports = scheduler;
  if (root) root.LuriaBlockScheduler = scheduler;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  function parseBlockNumber(value) {
    const text = String(value ?? "").trim();
    const match = text.match(/^(?:(?:bloco|m[oó]dulo|semana|m[eê]s)\s*[-–:]?\s*)?0*(\d{1,4})(?:\s*\(\s*\d+\s*aulas?\s*\))?$/i);
    const number = match ? Number(match[1]) : NaN;
    return Number.isInteger(number) && number > 0 ? number : null;
  }

  function parseISO(value) {
    const match = String(value ?? "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return null;
    const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
    return date.getUTCFullYear() === Number(match[1])
      && date.getUTCMonth() + 1 === Number(match[2])
      && date.getUTCDate() === Number(match[3]) ? date : null;
  }

  function toISO(date) {
    return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
  }

  function addDays(date, count) {
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + count));
  }

  function monthAt(anchor, offset) {
    const first = new Date(Date.UTC(anchor.getUTCFullYear(), anchor.getUTCMonth() + offset, 1));
    const lastDay = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 0)).getUTCDate();
    return new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth(), Math.min(anchor.getUTCDate(), lastDay)));
  }

  function periodBounds(startDate, anchorBlock, block, unit) {
    const anchor = parseISO(startDate);
    const fromBlock = Number(anchorBlock);
    const toBlock = Number(block);
    if (!anchor || !Number.isInteger(fromBlock) || fromBlock < 1 || !Number.isInteger(toBlock) || toBlock < 1) return null;
    const offset = toBlock - fromBlock;
    if (unit === "month") return [monthAt(anchor, offset), monthAt(anchor, offset + 1)];
    const days = unit === "fortnight" ? 14 : unit === "week" ? 7 : null;
    return days ? [addDays(anchor, offset * days), addDays(anchor, (offset + 1) * days)] : null;
  }

  function planBlockDates(rows, options) {
    const weekdays = new Set((options.weekdays || [1, 3, 5]).map(Number).filter((day) => day >= 1 && day <= 7));
    if (!weekdays.size) [1, 3, 5].forEach((day) => weekdays.add(day));
    const grouped = new Map();
    (rows || []).forEach((row, index) => {
      const block = parseBlockNumber(row.bloco);
      if (!block || row.kind !== "lesson" || row.sourceDate || row.dateOverride) return;
      if (!grouped.has(block)) grouped.set(block, []);
      grouped.get(block).push(index);
    });

    const assignments = [];
    const blocks = [];
    for (const [block, indexes] of [...grouped].sort((a, b) => a[0] - b[0])) {
      const bounds = periodBounds(options.startDate, options.anchorBlock, block, options.unit);
      if (!bounds) continue;
      const days = [];
      for (let date = bounds[0]; date < bounds[1]; date = addDays(date, 1)) {
        const weekday = date.getUTCDay() || 7;
        if (weekdays.has(weekday)) days.push(toISO(date));
      }
      if (!days.length) continue;
      indexes.forEach((index, position) => {
        assignments.push({ index, date: days[Math.floor(position * days.length / indexes.length)] });
      });
      blocks.push({ block, lessons: indexes.length, studyDays: days.length, from: toISO(bounds[0]), through: toISO(addDays(bounds[1], -1)) });
    }
    return { assignments, blocks };
  }

  return { parseBlockNumber, periodBounds, planBlockDates };
});
