// Prüft alle Inhaltsdateien: Pflichtfelder, eindeutige IDs, Verweise,
// und ob sich jede Formel mit KaTeX setzen lässt.
//
//   node tools/check-content.mjs
import { createRequire } from 'node:module';
import { WOCHEN } from '../content/index.js';

const require = createRequire(import.meta.url);
const katex = require('../vendor/katex/katex.min.js');

const TYPEN = ['definition', 'satz', 'formel', 'verfahren', 'verstaendnis', 'aufgabe'];
const HERKUNFT = ['offiziell', 'vorlesung', 'claude', 'zusatz'];
const errors = [];
const ids = new Set();
const sheetIds = new Set();
const allCards = [];
let formulas = 0;

function checkMath(where, text) {
  if (text === undefined || text === null) return;
  if (typeof text !== 'string') { errors.push(`${where}: kein Text`); return; }
  if (/undefined|\[object Object\]/.test(text)) errors.push(`${where}: enthält "undefined" (\${...} im Text?)`);
  const parts = text.split('$$');
  if (parts.length % 2 === 0) errors.push(`${where}: ungerade Anzahl $$`);
  parts.forEach((part, i) => {
    if (i % 2 === 1) return render(where, part, true);
    const inline = part.split('$');
    if (inline.length % 2 === 0) errors.push(`${where}: ungerade Anzahl $`);
    inline.forEach((m, k) => { if (k % 2 === 1) render(where, m, false); });
  });
}

function render(where, tex, displayMode) {
  formulas += 1;
  try {
    katex.renderToString(tex, { displayMode, throwOnError: true, strict: 'error' });
  } catch (err) {
    errors.push(`${where}: Formel "${tex}" -> ${err.message}`);
  }
}

for (const woche of WOCHEN) {
  for (const unit of woche.einheiten) {
    for (const key of ['id', 'art', 'nummer', 'datum', 'titel', 'ueberblick', 'karten']) {
      if (unit[key] === undefined) errors.push(`${unit.id}: Feld "${key}" fehlt`);
    }
    checkMath(`${unit.id}.ueberblick`, unit.ueberblick);
    for (const card of unit.karten) {
      const w = card.id || `${unit.id}/(ohne id)`;
      allCards.push(card);
      if (!card.id) errors.push(`${w}: id fehlt`);
      if (ids.has(card.id)) errors.push(`${w}: id doppelt vergeben`);
      ids.add(card.id);
      if (!card.id?.startsWith(`${unit.id}-`)) errors.push(`${w}: id muss mit "${unit.id}-" beginnen`);
      if (!TYPEN.includes(card.typ)) errors.push(`${w}: unbekannter typ "${card.typ}"`);
      for (const key of ['thema', 'quelle', 'frage']) if (!card[key]) errors.push(`${w}: Feld "${key}" fehlt`);
      if (card.herkunft && !HERKUNFT.includes(card.herkunft)) errors.push(`${w}: unbekannte herkunft`);
      checkMath(`${w}.frage`, card.frage);
      checkMath(`${w}.merke`, card.merke);

      if (card.typ === 'verstaendnis') {
        if (!Array.isArray(card.optionen) || card.optionen.length < 2) errors.push(`${w}: optionen fehlen`);
        if (!Number.isInteger(card.richtig) || !card.optionen?.[card.richtig]) errors.push(`${w}: "richtig" zeigt auf keine Option`);
        if (!card.erklaerung) errors.push(`${w}: erklaerung fehlt`);
        (card.optionen || []).forEach((o, i) => checkMath(`${w}.optionen[${i}]`, o));
        checkMath(`${w}.erklaerung`, card.erklaerung);
      } else if (card.typ === 'aufgabe') {
        if (!card.tipps?.length) errors.push(`${w}: tipps fehlen`);
        if (!card.schritte?.length) errors.push(`${w}: schritte fehlen`);
        if (!card.ergebnis) errors.push(`${w}: ergebnis fehlt`);
        if (!card.herkunft) errors.push(`${w}: herkunft fehlt`);
        (card.tipps || []).forEach((t, i) => checkMath(`${w}.tipps[${i}]`, t));
        (card.schritte || []).forEach((s, i) => { checkMath(`${w}.schritte[${i}].t`, s.t); checkMath(`${w}.schritte[${i}].w`, s.w); });
        (card.fehler || []).forEach((f, i) => checkMath(`${w}.fehler[${i}]`, f));
        checkMath(`${w}.ergebnis`, card.ergebnis);
      } else {
        if (!card.antwort) errors.push(`${w}: antwort fehlt`);
        checkMath(`${w}.antwort`, card.antwort);
      }
      for (const key of ['plot', 'plotAntwort', 'plotLoesung']) {
        const p = card[key];
        if (!p) continue;
        if (!p.alt) errors.push(`${w}.${key}: alt-Text fehlt`);
        for (const fn of p.fns || []) if (!Number.isFinite(fn.f(0.123))) errors.push(`${w}.${key}: Funktion liefert keine Zahl`);
      }
    }
    for (const item of unit.formelblatt || []) {
      if (!item.id?.startsWith('fb-')) errors.push(`${unit.id}: Formelblatt-id "${item.id}" muss mit "fb-" beginnen`);
      if (sheetIds.has(item.id)) errors.push(`${item.id}: id doppelt vergeben`);
      sheetIds.add(item.id);
      checkMath(`${item.id}.titel`, item.titel);
      checkMath(`${item.id}.inhalt`, item.inhalt);
    }
  }
}

for (const card of allCards) {
  if (card.rezept && !ids.has(card.rezept)) errors.push(`${card.id}: rezept "${card.rezept}" gibt es nicht`);
}

const byType = {};
for (const c of allCards) byType[c.typ] = (byType[c.typ] || 0) + 1;
console.log(`${allCards.length} Karten, ${sheetIds.size} Formelblatt-Einträge, ${formulas} Formeln geprüft`);
console.log(Object.entries(byType).map(([t, n]) => `${t}: ${n}`).join(' · '));
if (errors.length) {
  console.error(`\n${errors.length} Fehler:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log('Alles in Ordnung.');
