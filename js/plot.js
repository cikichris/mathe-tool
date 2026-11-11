// =====================================================================
//  Kleine Funktionsgraphen als SVG
//
//  plotSVG({
//    x: [-3, 3], y: [-1, 4],        sichtbarer Bereich
//    u: 44,                          Pixel pro Einheit (optional)
//    grid: 0.5,                      Abstand der Gitterlinien (optional, Standard 1)
//    fns: [{ f: x => 2*x + 1, from, to }],
//    segments: [{ from: [0, 1], to: [2, 1] }],   gestrichelte Hilfslinien
//    points: [[0, 1]],
//    labels: [{ at: [1, 0.6], text: '2' }],
//    alt: 'Beschreibung für Screenreader',
//  })
// =====================================================================

let counter = 0;

const num = (n) => String(Math.round(n * 100) / 100).replace('-', '−').replace('.', ',');

export function plotSVG(p) {
  const [x0, x1] = p.x;
  const [y0, y1] = p.y;
  const u = p.u ?? 44;
  const pad = { l: 10, r: 20, t: 20, b: 10 };
  const W = (x1 - x0) * u + pad.l + pad.r;
  const H = (y1 - y0) * u + pad.t + pad.b;
  const sx = (x) => pad.l + (x - x0) * u;
  const sy = (y) => pad.t + (y1 - y) * u;
  const f2 = (n) => n.toFixed(1);
  const clip = `plot-clip-${++counter}`;
  const out = [];

  // Gitter
  const step = p.grid ?? 1;
  const isInt = (v) => Math.abs(v - Math.round(v)) < 1e-9;
  for (let gx = Math.ceil(x0 / step) * step; gx <= x1 + 1e-9; gx += step) {
    out.push(`<line class="plot-grid${isInt(gx) ? '' : ' minor'}" x1="${f2(sx(gx))}" y1="${f2(sy(y0))}" x2="${f2(sx(gx))}" y2="${f2(sy(y1))}"/>`);
  }
  for (let gy = Math.ceil(y0 / step) * step; gy <= y1 + 1e-9; gy += step) {
    out.push(`<line class="plot-grid${isInt(gy) ? '' : ' minor'}" x1="${f2(sx(x0))}" y1="${f2(sy(gy))}" x2="${f2(sx(x1))}" y2="${f2(sy(gy))}"/>`);
  }

  // Achsen mit Pfeilspitzen
  const ax = sy(0);
  const ay = sx(0);
  const xe = sx(x1) + 12;
  const ye = sy(y1) - 12;
  out.push(`<line class="plot-axis" x1="${f2(sx(x0))}" y1="${f2(ax)}" x2="${f2(xe)}" y2="${f2(ax)}"/>`);
  out.push(`<path class="plot-arrow" d="M${f2(xe + 5)} ${f2(ax)} l-8 -4 v8 z"/>`);
  out.push(`<line class="plot-axis" x1="${f2(ay)}" y1="${f2(sy(y0))}" x2="${f2(ay)}" y2="${f2(ye)}"/>`);
  out.push(`<path class="plot-arrow" d="M${f2(ay)} ${f2(ye - 5)} l-4 8 h8 z"/>`);
  out.push(`<text class="plot-name" x="${f2(xe + 2)}" y="${f2(ax + 16)}" text-anchor="end">x</text>`);
  out.push(`<text class="plot-name" x="${f2(ay - 8)}" y="${f2(ye + 2)}" text-anchor="end">y</text>`);

  // Achsenbeschriftung an den ganzen Zahlen
  for (let tx = Math.ceil(x0); tx <= Math.floor(x1); tx += 1) {
    if (tx === 0 || x1 - tx < 0.3) continue;
    out.push(`<line class="plot-axis" x1="${f2(sx(tx))}" y1="${f2(ax - 4)}" x2="${f2(sx(tx))}" y2="${f2(ax + 4)}"/>`);
    out.push(`<text class="plot-tick" x="${f2(sx(tx))}" y="${f2(ax + 17)}" text-anchor="middle">${num(tx)}</text>`);
  }
  for (let ty = Math.ceil(y0); ty <= Math.floor(y1); ty += 1) {
    if (ty === 0 || y1 - ty < 0.3) continue;
    out.push(`<line class="plot-axis" x1="${f2(ay - 4)}" y1="${f2(sy(ty))}" x2="${f2(ay + 4)}" y2="${f2(sy(ty))}"/>`);
    out.push(`<text class="plot-tick" x="${f2(ay - 8)}" y="${f2(sy(ty) + 4)}" text-anchor="end">${num(ty)}</text>`);
  }

  // Hilfslinien (z. B. Steigungsdreieck)
  for (const s of p.segments || []) {
    out.push(`<line class="plot-helper" x1="${f2(sx(s.from[0]))}" y1="${f2(sy(s.from[1]))}" x2="${f2(sx(s.to[0]))}" y2="${f2(sy(s.to[1]))}"/>`);
  }

  // Funktionsgraphen
  (p.fns || []).forEach((fn, i) => {
    const a = Math.max(x0, fn.from ?? x0);
    const b = Math.min(x1, fn.to ?? x1);
    const n = 160;
    let d = '';
    let pen = false;
    for (let k = 0; k <= n; k += 1) {
      const x = a + ((b - a) * k) / n;
      const y = fn.f(x);
      if (!Number.isFinite(y) || y < y0 - 2 || y > y1 + 2) { pen = false; continue; }
      d += `${pen ? 'L' : 'M'}${f2(sx(x))} ${f2(sy(y))}`;
      pen = true;
    }
    out.push(`<path class="plot-fn plot-fn-${i}" d="${d}" clip-path="url(#${clip})"/>`);
  });

  for (const [px, py] of p.points || []) {
    out.push(`<circle class="plot-point" cx="${f2(sx(px))}" cy="${f2(sy(py))}" r="4.5"/>`);
  }
  for (const l of p.labels || []) {
    out.push(`<text class="plot-label" x="${f2(sx(l.at[0]))}" y="${f2(sy(l.at[1]) + 5)}" text-anchor="middle">${l.text}</text>`);
  }

  const alt = (p.alt || 'Funktionsgraph').replace(/"/g, '&quot;');
  return `<figure class="plot"><svg viewBox="0 0 ${f2(W)} ${f2(H)}" width="${f2(W)}" height="${f2(H)}" role="img" aria-label="${alt}">`
    + `<defs><clipPath id="${clip}"><rect x="${f2(sx(x0))}" y="${f2(sy(y1))}" width="${f2((x1 - x0) * u)}" height="${f2((y1 - y0) * u)}"/></clipPath></defs>`
    + out.join('') + '</svg></figure>';
}
