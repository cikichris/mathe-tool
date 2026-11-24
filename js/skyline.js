// =====================================================================
//  Skyline: Lernpunkte werden zu Hochhäusern
//
//  Jedes Klausurthema ist ein Turm. Punkte aus Karten dieses Themas
//  lassen ihn wachsen (ein Stockwerk je PUNKTE_PRO_STOCK Punkte).
//  Die Fenster leuchten je nach Klausurreife des Themas.
//  Alle Punkte zusammen sind außerdem Währung für Extras.
//  Gezeichnet wird als SVG direkt in der App, ganz ohne Bilder.
// =====================================================================

export const PUNKTE_PRO_STOCK = 5;
export const PUNKTE_MISSION = 15;
export const PUNKTE_MEILENSTEIN = 20;

export const REGELN = [
  ['Karte beantwortet', '1'],
  ['Rechenaufgabe gelöst', '3'],
  ['… ohne Tipp', '+2'],
  ['Eigene Lösung geprüft', '5'],
  ['Methode richtig erkannt', '1'],
  ['Fokusblock geschafft', '3'],
  ['Vorlesungsabschnitt verstanden', '2'],
  ['Tagesmission geschafft', String(PUNKTE_MISSION)],
  ['Meilenstein erreicht', String(PUNKTE_MEILENSTEIN)],
];

export const SHOP = [
  { id: 'baeume', icon: '🌳', titel: 'Bäume', text: 'Grün zwischen den Türmen', preis: 30 },
  { id: 'mond', icon: '🌙', titel: 'Mond und Sterne', text: 'Für lange Lernabende', preis: 40 },
  { id: 'kran', icon: '🏗️', titel: 'Baukran', text: 'Steht beim kleinsten Turm, da wird noch gebaut', preis: 50 },
  { id: 'park', icon: '⛲', titel: 'Park', text: 'Wiese, Bank und Büsche vor der Skyline', preis: 60 },
  { id: 'antenne', icon: '📡', titel: 'Antenne', text: 'Blinkt auf deinem höchsten Turm', preis: 70 },
  { id: 'fluss', icon: '🌊', titel: 'Fluss', text: 'Ein Fluss vor der Skyline', preis: 80 },
  { id: 'ballon', icon: '🎈', titel: 'Heißluftballon', text: 'Schwebt über der Stadt', preis: 90 },
  { id: 'schiff', icon: '⛴️', titel: 'Ausflugsschiff', text: 'Fährt auf dem Fluss', preis: 100, braucht: 'fluss' },
  { id: 'tram', icon: '🚋', titel: 'Straßenbahn', text: 'Fährt am Fuß der Türme entlang', preis: 110 },
  { id: 'heli', icon: '🚁', titel: 'Hubschrauber', text: 'Dreht seine Runden', preis: 130 },
  { id: 'bruecke', icon: '🌉', titel: 'Brücke', text: 'Stahlbrücke über den Fluss', preis: 160, braucht: 'fluss' },
  { id: 'feuerwerk', icon: '🎆', titel: 'Feuerwerk', text: 'Für die Feier nach der Klausur', preis: 200 },
];

export const floorsFor = (points) => Math.floor(Math.max(0, points) / PUNKTE_PRO_STOCK);

const W = 400;
const H = 260;
const GROUND = 204;
const SLOT = W / 8;
const TOP_SPACE = 34;

/** Fester Zufallswert je Fenster, damit die Lichter nicht springen. */
function rand(a, b, c) {
  let h = (a * 374761393 + b * 668265263 + c * 2147483647) >>> 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

const r1 = (n) => Math.round(n * 10) / 10;

function roof(style, x, w, top, h) {
  const cx = x + w / 2;
  switch (style) {
    case 0: return `<rect class="tw-body" x="${r1(x + w * 0.25)}" y="${r1(top - h * 0.5)}" width="${r1(w * 0.5)}" height="${r1(h * 0.5)}"/>`;
    case 1: return `<rect class="tw-body" x="${r1(x + 3)}" y="${r1(top - h * 0.45)}" width="${r1(w - 6)}" height="${r1(h * 0.45)}"/><rect class="tw-body" x="${r1(x + 7)}" y="${r1(top - h * 0.85)}" width="${r1(w - 14)}" height="${r1(h * 0.42)}"/>`;
    case 2: return `<polygon class="tw-body" points="${r1(x + 2)},${top} ${r1(x + w - 2)},${top} ${cx},${r1(top - h)}"/><line class="tw-needle" x1="${cx}" y1="${r1(top - h)}" x2="${cx}" y2="${r1(top - h * 1.6)}"/>`;
    case 3: return `<polygon class="tw-body" points="${x},${top} ${x + w},${top} ${x + w},${r1(top - h)}"/>`;
    case 4: return `<path class="tw-body" d="M${x} ${top} A ${r1(w / 2)} ${r1(h * 0.9)} 0 0 1 ${x + w} ${top} Z"/>`;
    case 5: return `<rect class="tw-body" x="${x}" y="${r1(top - h * 0.7)}" width="${r1(w * 0.36)}" height="${r1(h * 0.7)}"/><rect class="tw-body" x="${r1(x + w * 0.64)}" y="${r1(top - h * 0.7)}" width="${r1(w * 0.36)}" height="${r1(h * 0.7)}"/>`;
    case 6: return `<polygon class="tw-body" points="${x},${top} ${x},${r1(top - h * 0.7)} ${r1(x + w * 0.25)},${r1(top - h * 0.35)} ${cx},${r1(top - h)} ${r1(x + w * 0.75)},${r1(top - h * 0.35)} ${x + w},${r1(top - h * 0.7)} ${x + w},${top}"/>`;
    default: return `<polygon class="tw-body" points="${x},${top} ${x + w},${top} ${r1(cx + 3)},${r1(top - h)} ${r1(cx - 3)},${r1(top - h)}"/>`;
  }
}

function tree(x, y, s = 1) {
  return `<g class="sk-tree"><rect x="${r1(x - 0.8 * s)}" y="${r1(y - 7 * s)}" width="${r1(1.6 * s)}" height="${r1(7 * s)}"/><circle cx="${x}" cy="${r1(y - 9 * s)}" r="${r1(5 * s)}"/></g>`;
}

/**
 * towers: [{ id, kurz, floors, ready (0–1), reif (bool) }] in fester Reihenfolge
 * items:  Set der gebauten Extras
 * opts:   { night, mini, animate }
 */
export function skylineSVG(towers, items, opts = {}) {
  const has = (id) => items.has(id);
  const maxFloors = Math.max(12, ...towers.map((t) => t.floors));
  const floorPx = Math.max(2.2, Math.min(9, (GROUND - TOP_SPACE - 18) / maxFloors));
  const river = has('fluss') && !opts.mini;
  const parts = [];

  // Himmel
  parts.push(`<rect class="sk-sky" x="0" y="0" width="${W}" height="${GROUND}"/>`);
  if (has('mond')) {
    if (opts.night) {
      for (let i = 0; i < 26; i += 1) {
        parts.push(`<circle class="sk-star" cx="${r1(rand(i, 7, 1) * W)}" cy="${r1(rand(i, 3, 2) * (GROUND - 70))}" r="${r1(0.5 + rand(i, 5, 9) * 0.9)}" style="animation-delay:${r1(rand(i, 1, 1) * 4)}s"/>`);
      }
    }
    parts.push(`<circle class="sk-moon" cx="352" cy="40" r="13"/><circle class="sk-sky-cut" cx="358" cy="35" r="11"/>`);
  }
  if (has('feuerwerk') && !opts.mini) {
    const bursts = [[90, 60, 0, 'a'], [210, 42, 1.3, 'b'], [310, 72, 2.4, 'c']];
    for (const [x, y, delay, c] of bursts) {
      let rays = '';
      for (let k = 0; k < 12; k += 1) {
        const a = (k / 12) * Math.PI * 2;
        rays += `<line x1="0" y1="0" x2="${r1(Math.cos(a) * 16)}" y2="${r1(Math.sin(a) * 16)}"/>`;
      }
      parts.push(`<g transform="translate(${x} ${y})"><g class="sk-firework sk-fw-${c}" style="animation-delay:${delay}s">${rays}</g></g>`);
    }
  }
  // Türme
  let tallest = null;
  let smallest = null;
  towers.forEach((t, i) => {
    const w = [30, 32, 26, 30, 32, 28, 30, 28][i % 8];
    const x = r1(i * SLOT + (SLOT - w) / 2);
    const bodyH = t.floors * floorPx;
    const top = r1(GROUND - bodyH);
    const roofH = Math.min(18, 6 + t.floors * 0.6);
    const g = [];
    if (t.floors === 0) {
      // Baustelle
      g.push(`<rect class="tw-site" x="${x}" y="${GROUND - 3}" width="${w}" height="3"/>`);
      for (let k = 0; k <= 4; k += 1) g.push(`<line class="tw-fence" x1="${r1(x + (k * w) / 4)}" y1="${GROUND}" x2="${r1(x + (k * w) / 4)}" y2="${GROUND - 7}"/>`);
      g.push(`<line class="tw-fence" x1="${x}" y1="${GROUND - 5}" x2="${x + w}" y2="${GROUND - 5}"/>`);
    } else {
      g.push(`<rect class="tw-body" x="${x}" y="${top}" width="${w}" height="${r1(bodyH)}"/>`);
      if (t.floors >= 2) g.push(roof(i % 8, x, w, top, roofH));
      const cols = 3;
      const ww = (w - 8) / cols - 2;
      const wh = Math.max(1, floorPx * 0.55);
      for (let f = 0; f < t.floors; f += 1) {
        const y = r1(GROUND - (f + 1) * floorPx + (floorPx - wh) / 2);
        for (let c = 0; c < cols; c += 1) {
          const lit = rand(i + 1, f + 1, c + 1) < t.ready;
          g.push(`<rect class="tw-win ${lit ? 'is-lit' : ''}" x="${r1(x + 4 + c * (ww + 2) + 1)}" y="${y}" width="${r1(ww)}" height="${r1(wh)}"/>`);
        }
      }
      if (t.reif) g.push(`<circle class="tw-beacon" cx="${r1(x + w / 2)}" cy="${r1(top - (t.floors >= 2 ? roofH : 0) - 4)}" r="2.4"/>`);
    }
    parts.push(`<g class="tw tw-c${i % 3}">${g.join('')}</g>`);
    const info = { i, x, w, top: t.floors === 0 ? GROUND : top - (t.floors >= 2 ? roofH : 0), floors: t.floors };
    if (!tallest || info.floors > tallest.floors) tallest = info;
    if (!smallest || info.floors < smallest.floors) smallest = info;
  });

  if (has('ballon') && !opts.mini) {
    parts.push(`<g class="sk-balloon"><path class="sk-balloon-env" d="M60 52 C46 52 44 70 55 80 L58 86 L62 86 L65 80 C76 70 74 52 60 52 Z"/><path class="sk-balloon-stripe" d="M60 52 C55 60 55 74 58 86 L62 86 C65 74 65 60 60 52 Z"/><rect class="sk-basket" x="57" y="89" width="6" height="5" rx="1"/><line class="sk-rope" x1="58" y1="86" x2="57.5" y2="89"/><line class="sk-rope" x1="62" y1="86" x2="62.5" y2="89"/></g>`);
  }
  if (has('heli') && !opts.mini) {
    parts.push(`<g class="sk-heli"><g transform="translate(0 26)"><ellipse class="sk-heli-body" cx="0" cy="0" rx="9" ry="4.5"/><rect class="sk-heli-body" x="6" y="-1.5" width="14" height="2"/><rect class="sk-heli-body" x="19" y="-4" width="2" height="5"/><line class="sk-heli-rotor" x1="-12" y1="-6" x2="12" y2="-6"/><line class="sk-heli-mast" x1="0" y1="-6" x2="0" y2="-4"/><line class="sk-heli-mast" x1="-5" y1="6" x2="5" y2="6"/></g></g>`);
  }

  if (has('antenne') && tallest && tallest.floors > 0) {
    const cx = r1(tallest.x + tallest.w / 2);
    parts.push(`<line class="sk-mast" x1="${cx}" y1="${r1(tallest.top)}" x2="${cx}" y2="${r1(tallest.top - 22)}"/><line class="sk-mast" x1="${r1(cx - 3)}" y1="${r1(tallest.top - 8)}" x2="${r1(cx + 3)}" y2="${r1(tallest.top - 8)}"/><circle class="sk-blink" cx="${cx}" cy="${r1(tallest.top - 23)}" r="1.8"/>`);
  }
  if (has('kran') && smallest) {
    const mx = r1(smallest.x + smallest.w + 5);
    const mastTop = r1(Math.min(GROUND - 60, smallest.top - 26));
    let lattice = '';
    for (let y = GROUND; y > mastTop + 4; y -= 6) lattice += `<line class="sk-crane-thin" x1="${mx - 2}" y1="${y}" x2="${mx + 2}" y2="${y - 6}"/>`;
    parts.push(`<g class="sk-crane"><line class="sk-crane-mast" x1="${mx}" y1="${GROUND}" x2="${mx}" y2="${mastTop}"/>${lattice}<line class="sk-crane-jib" x1="${r1(mx - 30)}" y1="${mastTop}" x2="${r1(mx + 12)}" y2="${mastTop}"/><rect class="sk-crane-weight" x="${r1(mx + 7)}" y="${mastTop}" width="6" height="4"/><line class="sk-crane-thin sk-crane-hook" x1="${r1(mx - 22)}" y1="${mastTop}" x2="${r1(mx - 22)}" y2="${r1(mastTop + 22)}"/><rect class="sk-crane-weight" x="${r1(mx - 24)}" y="${r1(mastTop + 22)}" width="4" height="3"/></g>`);
  }

  // Boden
  parts.push(`<rect class="sk-street" x="0" y="${GROUND}" width="${W}" height="${H - GROUND}"/>`);
  if (has('tram') && !opts.mini) {
    parts.push(`<line class="sk-rail" x1="0" y1="${GROUND + 0.5}" x2="${W}" y2="${GROUND + 0.5}"/><g class="sk-tram"><rect class="sk-tram-body" x="0" y="${GROUND - 9}" width="34" height="8.5" rx="2"/>${[3, 10, 17, 24].map((wx) => `<rect class="sk-tram-win" x="${wx}" y="${GROUND - 7.5}" width="5" height="3"/>`).join('')}<line class="sk-mast" x1="17" y1="${GROUND - 9}" x2="22" y2="${GROUND - 15}"/></g>`);
  }
  if (has('baeume')) {
    for (let i = 1; i < 8; i += 1) parts.push(tree(i * SLOT, GROUND, i % 2 ? 1 : 0.8));
  }
  if (has('park') && !opts.mini) {
    parts.push(`<rect class="sk-grass" x="0" y="${GROUND + 2}" width="${W}" height="9"/>`);
    for (const [x, s] of [[18, 0.9], [130, 0.7], [255, 0.8], [385, 0.9]]) parts.push(tree(x, GROUND + 9, s));
    for (const x of [60, 175, 300, 340]) parts.push(`<circle class="sk-bush" cx="${x}" cy="${GROUND + 9}" r="3.2"/>`);
    parts.push(`<g class="sk-bench"><rect x="205" y="${GROUND + 5}" width="12" height="1.6"/><rect x="205" y="${GROUND + 2.5}" width="12" height="1.2"/><rect x="206" y="${GROUND + 6.5}" width="1.2" height="3"/><rect x="214.8" y="${GROUND + 6.5}" width="1.2" height="3"/></g>`);
  }
  if (river) {
    const ry = GROUND + 14;
    parts.push(`<rect class="sk-river" x="0" y="${ry}" width="${W}" height="${H - ry}"/>`);
    let waves = '';
    for (let k = 0; k < 4; k += 1) {
      const y = ry + 8 + k * 9;
      let d = `M-20 ${y}`;
      for (let x = -20; x < W + 20; x += 20) d += ` q5 -2.5 10 0 t10 0`;
      waves += `<path class="sk-wave" d="${d}" style="animation-delay:${k * 0.7}s"/>`;
    }
    parts.push(waves);
    if (has('bruecke')) {
      const by = ry + 12;
      let truss = '';
      for (let x = 70; x < 330; x += 20) truss += `<line class="sk-bridge-thin" x1="${x}" y1="${by}" x2="${x + 10}" y2="${by - 12}"/><line class="sk-bridge-thin" x1="${x + 10}" y1="${by - 12}" x2="${x + 20}" y2="${by}"/>`;
      parts.push(`<g class="sk-bridge"><line class="sk-bridge-main" x1="40" y1="${by}" x2="360" y2="${by}"/><line class="sk-bridge-main" x1="70" y1="${by - 12}" x2="330" y2="${by - 12}"/><line class="sk-bridge-main" x1="40" y1="${by}" x2="70" y2="${by - 12}"/><line class="sk-bridge-main" x1="330" y1="${by - 12}" x2="360" y2="${by}"/>${truss}${[120, 200, 280].map((x) => `<rect class="sk-bridge-pier" x="${x - 3}" y="${by}" width="6" height="${H - by}"/>`).join('')}</g>`);
    }
    if (has('schiff')) {
      const sy = ry + 30;
      parts.push(`<g class="sk-ship"><path class="sk-ship-hull" d="M0 ${sy} L44 ${sy} L39 ${sy + 6} L5 ${sy + 6} Z"/><rect class="sk-ship-deck" x="8" y="${sy - 6}" width="26" height="6" rx="1"/>${[11, 17, 23, 29].map((wx) => `<rect class="sk-tram-win" x="${wx}" y="${sy - 4.5}" width="3" height="2.5"/>`).join('')}<rect class="sk-ship-funnel" x="18" y="${sy - 10}" width="4" height="4"/></g>`);
    }
  }

  const label = towers.map((t) => `${t.kurz}: ${t.floors} Stockwerke`).join(', ');
  return `<svg class="skyline ${opts.night ? 'is-night' : 'is-day'} ${opts.animate === false ? 'no-anim' : ''} ${opts.mini ? 'is-mini' : ''}" viewBox="0 ${opts.mini ? 40 : 0} ${W} ${opts.mini ? GROUND - 34 : H}" role="img" aria-label="Deine Skyline. ${label}">${parts.join('')}</svg>`;
}
