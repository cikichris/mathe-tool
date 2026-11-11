// Tests für Wiederholungsplan und Abgleich:  node --test tools/test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';

const mem = new Map();
globalThis.localStorage = {
  getItem: (k) => (mem.has(k) ? mem.get(k) : null),
  setItem: (k, v) => mem.set(k, String(v)),
  removeItem: (k) => mem.delete(k),
};

const srs = await import('../js/srs.js');
const store = await import('../js/store.js');
const { AGAIN, HARD, GOOD, EASY, schedule, addDays, daysBetween, stage, isDue, isNew } = srs;

test('Datumshilfen', () => {
  assert.equal(addDays('2026-12-30', 3), '2027-01-02');
  assert.equal(daysBetween('2026-11-11', '2027-02-15'), 96);
  assert.equal(daysBetween('2026-10-24', '2026-10-26'), 2); // über die Zeitumstellung
});

test('neue Karte: Abstände je Bewertung', () => {
  const t = '2026-11-11';
  assert.equal(schedule(undefined, AGAIN, t).due, t);
  assert.equal(schedule(undefined, HARD, t).due, '2026-11-12');
  assert.equal(schedule(undefined, GOOD, t).due, '2026-11-13');
  assert.equal(schedule(undefined, EASY, t).due, '2026-11-15');
  assert.equal(schedule(undefined, GOOD, t).first, t);
  assert.ok(isNew(undefined));
});

test('Abstände wachsen bei "Gut" und bleiben unter der Obergrenze', () => {
  let s;
  let day = '2026-11-11';
  const ivls = [];
  for (let i = 0; i < 8; i += 1) {
    s = schedule(s, GOOD, day);
    ivls.push(s.ivl);
    day = s.due;
  }
  assert.deepEqual(ivls.slice(0, 4), [2, 5, 13, 30]);
  assert.ok(ivls.every((v) => v <= 30));
  assert.equal(stage(s), 'sicher');
});

test('"Nochmal" setzt zurück und senkt den Faktor', () => {
  let s = schedule(undefined, GOOD, '2026-11-11');
  s = schedule(s, GOOD, s.due);
  const lapsed = schedule(s, AGAIN, s.due);
  assert.equal(lapsed.ivl, 0);
  assert.equal(lapsed.due, s.due);
  assert.equal(lapsed.lapses, 1);
  assert.ok(lapsed.ease < s.ease);
  assert.ok(isDue(lapsed, s.due));
  assert.equal(schedule(lapsed, GOOD, s.due).ivl, 1);
});

test('vorzeitiges Üben verschiebt den Plan nicht, außer bei "Nochmal"', () => {
  const s = schedule(schedule(undefined, GOOD, '2026-11-11'), GOOD, '2026-11-13'); // fällig 18.11.
  const early = schedule(s, EASY, '2026-11-14');
  assert.equal(early.due, s.due);
  assert.equal(early.ivl, s.ivl);
  assert.equal(schedule(s, AGAIN, '2026-11-14').due, '2026-11-14');
});

test('kurz vor der Klausur werden die Abstände kürzer', () => {
  store.resetAll();
  store.setSettings({ examDate: '2026-11-21' });
  assert.equal(store.maxInterval('2026-11-11'), 5);
  store.setSettings({ examDate: '' });
  assert.equal(store.maxInterval('2026-11-11'), 30);
});

test('Abgleich: neuerer Eintrag gewinnt, lokale Änderungen landen im Ausgang', () => {
  store.resetAll();
  store.rate('a', GOOD, 'heute', '2026-11-11');
  store.rate('b', GOOD, 'heute', '2026-11-11');
  const row = (card_id, updated_at, reps) => ({
    card_id, due: '2026-12-01', interval_days: 9, ease: 2.5, reps, lapses: 0,
    first_seen: '2026-11-01', last_review: '2026-11-10', updated_at,
  });
  store.applyRemote({
    cards: [
      row('a', new Date(Date.now() + 60000).toISOString(), 7),   // Datenbank neuer
      row('b', new Date(Date.now() - 60000).toISOString(), 7),   // lokal neuer
      row('c', new Date().toISOString(), 3),                      // nur in der Datenbank
    ],
  });
  assert.equal(store.cardState('a').reps, 7);
  assert.equal(store.cardState('b').reps, 1);
  assert.equal(store.cardState('c').ivl, 9);

  const box = store.outbox();
  assert.deepEqual(box.cards.map((r) => r.card_id), ['b']);
  assert.equal(box.reviews.length, 2);
  store.markPushed(box);
  assert.equal(store.hasUnsynced(), false);
});

test('Abgleich: Bewertung während des Hochladens bleibt vorgemerkt', () => {
  store.resetAll();
  store.rate('a', GOOD, 'heute', '2026-11-11');
  const box = store.outbox();
  const later = Date.now() + 5;
  while (Date.now() < later) { /* kurz warten, damit sich der Zeitstempel ändert */ }
  store.rate('a', AGAIN, 'heute', '2026-11-11');
  store.markPushed(box);
  assert.equal(store.hasUnsynced(), true);
  assert.equal(store.outbox().cards.length, 1);
  assert.equal(store.outbox().reviews.length, 1);
});

test('Einstellungen und Formelblatt werden abgeglichen', () => {
  store.resetAll();
  store.applyRemote({ userData: [
    { key: 'settings', value: { examDate: '2027-02-10', newPerDay: 20 }, updated_at: new Date().toISOString() },
    { key: 'sheet', value: { sel: { 'fb-x': false } }, updated_at: new Date().toISOString() },
  ] });
  assert.equal(store.settings().examDate, '2027-02-10');
  assert.equal(store.sheetSelected({ id: 'fb-x' }), false);
  assert.equal(store.sheetSelected({ id: 'fb-y' }), true);
  assert.equal(store.sheetSelected({ id: 'fb-z', standard: false }), false);
  assert.equal(store.hasUnsynced(), false);
});
