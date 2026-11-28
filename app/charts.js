// Charts: small SVG chart builders with no library. Every chart is drawn from
// the numbers passed in, with axis labels, so a screenshot shows real values.

const INK = "#14312e";
const MUTED = "#5c6b68";
const TEAL = "#0f766e";
const AMBER = "#c2571b";
const GRID = "#e3e8e4";
const FONT = "system-ui, -apple-system, 'Segoe UI', sans-serif";

function fmt(n) {
  return n.toLocaleString("id-ID", { maximumFractionDigits: 2 });
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Line chart with labelled points. series: {title, unit, source, points:[[label, value], ...]}
export function lineChart(series, width = 640, height = 260) {
  const padL = 52, padR = 14, padT = 14, padB = 30;
  const w = width - padL - padR, h = height - padT - padB;
  const values = series.points.map((p) => p[1]);
  let lo = Math.min(0, ...values), hi = Math.max(...values);
  if (hi - lo < 1) hi = lo + 1;
  const span = hi - lo;
  lo -= span * 0.08; const hi2 = hi + span * 0.08;
  const x = (i) => padL + (i / (series.points.length - 1)) * w;
  const y = (v) => padT + (1 - (v - lo) / (hi2 - lo)) * h;
  const ticks = 4;
  let grid = "";
  for (let i = 0; i <= ticks; i++) {
    const v = lo + ((hi2 - lo) * i) / ticks;
    const gy = y(v);
    grid += `<line x1="${padL}" y1="${gy}" x2="${padL + w}" y2="${gy}" stroke="${GRID}" stroke-width="1"/>` +
      `<text x="${padL - 8}" y="${gy + 4}" text-anchor="end" font-size="13" fill="${MUTED}" font-family="${FONT}">${fmt(Math.round(v * 100) / 100)}</text>`;
  }
  const path = series.points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(p[1]).toFixed(1)}`).join(" ");
  const dots = series.points.map((p, i) =>
    `<circle cx="${x(i)}" cy="${y(p[1])}" r="4" fill="#fff" stroke="${TEAL}" stroke-width="2.5"/>` +
    `<text x="${x(i)}" y="${y(p[1]) - 10}" text-anchor="middle" font-size="13" font-weight="600" fill="${INK}" font-family="${FONT}">${fmt(p[1])}</text>`
  ).join("");
  const labels = series.points.map((p, i) =>
    `<text x="${x(i)}" y="${height - 8}" text-anchor="middle" font-size="13" fill="${MUTED}" font-family="${FONT}">${esc(p[0])}</text>`
  ).join("");
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="${esc(series.title)}">
    ${grid}
    <path d="${path}" fill="none" stroke="${TEAL}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    ${dots}${labels}
    <text x="${padL}" y="${height - 8}" font-size="0" fill="none">.</text>
  </svg>`;
}

// Horizontal bar chart. rows: [[label, value], ...]; unit shown after each value.
export function barChart(title, rows, unit, width = 640) {
  const max = Math.max(...rows.map((r) => r[1]));
  const rowH = 34, padT = 8;
  const height = padT + rows.length * rowH + 8;
  const bars = rows.map(([label, value], i) => {
    const y = padT + i * rowH;
    const bw = Math.max(2, (value / max) * 62);
    const color = i === 0 ? AMBER : TEAL;
    return `<text x="0" y="${y + 15}" font-size="14" fill="${INK}" font-family="${FONT}">${esc(label)}</text>` +
      `<text x="100%" y="${y + 15}" text-anchor="end" font-size="14" font-weight="600" fill="${INK}" font-family="${FONT}">${fmt(value)}${unit ? " " + esc(unit) : ""}</text>` +
      `<rect x="0" y="${y + 20}" width="${bw}%" height="10" rx="5" fill="${color}"/>`;
  }).join("");
  return `<div class="chart-title">${esc(title)}</div>
  <svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="${esc(title)}">${bars}</svg>`;
}

// Vertical column chart, for a short series with a shared unit. Negative
// values draw downward from the zero line in amber, positives upward in teal.
export function columnChart(series, width = 640, height = 280) {
  const padL = 10, padR = 10, padT = 26, padB = 26;
  const w = width - padL - padR, h = height - padT - padB;
  const values = series.points.map((p) => p[1]);
  const max = Math.max(...values);
  const min = Math.min(0, ...values);
  const span = (max - min) || 1;
  const n = values.length, gap = 10;
  const bw = (w - gap * (n - 1)) / n;
  const y0 = padT + ((max - 0) / span) * h;
  const cols = series.points.map((p, i) => {
    const x = padL + i * (bw + gap);
    const yv = padT + ((max - p[1]) / span) * h;
    const top = Math.min(y0, yv);
    const bh = Math.max(2, Math.abs(y0 - yv));
    const color = p[1] < 0 ? AMBER : TEAL;
    // Negative bars hang below the zero line; their label sits just above it.
    const labelY = p[1] < 0 ? y0 - 6 : top - 6;
    return `<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="3" fill="${color}"/>` +
      `<text x="${(x + bw / 2).toFixed(1)}" y="${labelY.toFixed(1)}" text-anchor="middle" font-size="14" font-weight="600" fill="${INK}" font-family="${FONT}">${fmt(p[1])}</text>` +
      `<text x="${(x + bw / 2).toFixed(1)}" y="${height - 6}" text-anchor="middle" font-size="13" fill="${MUTED}" font-family="${FONT}">${esc(p[0])}</text>`;
  }).join("");
  const zero = min < 0 ? `<line x1="${padL}" y1="${y0}" x2="${padL + w}" y2="${y0}" stroke="${MUTED}" stroke-width="1"/>` : "";
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="${esc(series.title)}">${zero}${cols}</svg>`;
}
