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

test('nächste Übung: heute zählt mit, danach das letzte Blatt', async () => {
  const { nextUebung, uebungen } = await import('../js/content.js');
  assert.ok(uebungen.length >= 1);
  assert.equal(nextUebung('2026-11-17').id, 'ue05');
  assert.equal(nextUebung('2026-11-23').id, 'ue06');
  assert.equal(nextUebung('2026-11-04').id, 'ue03');
  assert.equal(nextUebung('2026-10-01').id, 'ue01');
  assert.equal(nextUebung('2027-03-01').id, uebungen[uebungen.length - 1].id);
});

test('Schnelltraining: Statistik wird gespeichert und abgeglichen', () => {
  store.resetAll();
  store.recordDrill('m-p01', true, '2026-11-17');
  store.recordDrill('m-p01', false, '2026-11-17');
  assert.deepEqual(store.drillStats()['m-p01'], [1, 1, '2026-11-17']);
  const box = store.outbox();
  assert.equal(box.userData.find((r) => r.key === 'drill').value.stats['m-p01'][0], 1);
  store.markPushed(box);
  assert.equal(store.hasUnsynced(), false);
  store.applyRemote({ userData: [{ key: 'drill', value: { stats: { 'm-e01': [3, 0, '2026-11-18'] } }, updated_at: new Date(Date.now() + 60000).toISOString() }] });
  assert.deepEqual(store.drillStats(), { 'm-e01': [3, 0, '2026-11-18'] });
});

test('Lernserie: Zählung, laufende Serie, Rekord', async () => {
  const { computeStreak, lastDays } = await import('../js/streak.js');
  // 20.11. (Fr) verpasst: der Joker der Woche 16.–22.11. überbrückt ihn
  const days = { '2026-11-18': 12, '2026-11-19': 10, '2026-11-20': 3, '2026-11-21': 15, '2026-11-22': 11 };
  let st = computeStreak(days, '2026-11-23', 10);
  assert.equal(st.current, 4);          // 18., 19., (Joker), 21., 22.; heute noch offen
  assert.equal(st.todayDone, false);
  assert.equal(st.best, 4);
  assert.ok(st.bridged.has('2026-11-20'));
  assert.equal(st.jokerFree, true);     // neue Woche ab Mo 23.11.
  st = computeStreak({ ...days, '2026-11-23': 10 }, '2026-11-23', 10);
  assert.equal(st.current, 5);
  assert.equal(st.todayDone, true);
  st = computeStreak(days, '2026-11-24', 10); // gestern (23.) nichts: Joker der neuen Woche greift
  assert.equal(st.current, 4);
  assert.equal(st.jokerYesterday, true);
  assert.equal(st.jokerFree, false);
  st = computeStreak(days, '2026-11-25', 10); // zwei Tage verpasst: Serie gerissen, Joker zurück
  assert.equal(st.current, 0);
  assert.equal(st.jokerFree, true);
  assert.equal(computeStreak(days, '2026-11-23', 3).best, 5);
  // Tagesmission zählt auch ohne Tagesziel
  st = computeStreak({ '2026-11-23': 4 }, '2026-11-23', 10, { '2026-11-23': true });
  assert.equal(st.todayDone, true);
  assert.equal(st.current, 1);
  assert.equal(st.weekDone, 1);
  const ld = lastDays(days, '2026-11-23', 3, 10);
  assert.deepEqual(ld.map((x) => x.done), [true, true, false]);
});

test('Lernserie: Zählen, Abgleich und Übernahme aus dem Verlauf', () => {
  store.resetAll();
  store.rate('a', GOOD, 'heute', '2026-11-23');
  store.recordDrill('m-p01', true, '2026-11-23');
  assert.equal(store.activityDays()['2026-11-23'], 2);
  store.applyRemote({ userData: [{ key: 'activity', value: { days: { '2026-11-22': 12, '2026-11-23': 1 }, backfilled: true }, updated_at: new Date().toISOString() }] });
  assert.equal(store.activityDays()['2026-11-22'], 12);
  assert.equal(store.activityDays()['2026-11-23'], 2);
  assert.equal(store.activityBackfilled(), true);
  const box = store.outbox();
  assert.equal(box.userData.find((r) => r.key === 'activity').value.days['2026-11-23'], 2);
  store.markPushed(box);
  assert.equal(store.hasUnsynced(), false);
  store.resetAll();
  store.backfillActivity(['2026-11-20T10:00:00Z', '2026-11-20T11:00:00Z', '2026-11-21T09:00:00Z']);
  assert.equal(store.activityDays()['2026-11-20'], 2);
  assert.equal(store.activityBackfilled(), true);
});

test('Übungsvorbereitung: Status und Fragen werden gespeichert und abgeglichen', () => {
  store.resetAll();
  store.setPrepStatus('ue06-a6a', 'hilfe');
  store.setPrepNote('ue06-a6a', 'Warum durch 4?');
  assert.equal(store.prepStatus('ue06-a6a'), 'hilfe');
  assert.equal(store.prepNote('ue06-a6a'), 'Warum durch 4?');
  const box = store.outbox();
  const row = box.userData.find((r) => r.key === 'prep');
  assert.equal(row.value.status['ue06-a6a'], 'hilfe');
  store.markPushed(box);
  assert.equal(store.hasUnsynced(), false);
  store.setPrepStatus('ue06-a6a', '');
  store.setPrepNote('ue06-a6a', '   ');
  assert.equal(store.prepStatus('ue06-a6a'), '');
  assert.equal(store.prepNote('ue06-a6a'), '');
  store.applyRemote({ userData: [{ key: 'prep', value: { status: { x: 'selbst' }, notes: {} }, updated_at: new Date(Date.now() + 60000).toISOString() }] });
  assert.equal(store.prepStatus('x'), 'selbst');
});

test('Eigene Lösung prüfen: Kontrollen werden gespeichert und abgeglichen', () => {
  store.resetAll();
  for (let i = 0; i < 12; i += 1) store.addCheck('ue06-a6a', { d: '2026-11-23', gleich: i, anders: 0, fehlt: 1, of: 5, result: 'falsch' });
  assert.equal(store.checksFor('ue06-a6a').length, 10, 'nur die letzten 10 bleiben');
  assert.equal(store.checksFor('ue06-a6a').at(-1).gleich, 11);
  const box = store.outbox();
  assert.equal(box.userData.find((r) => r.key === 'checks').value.list['ue06-a6a'].length, 10);
  store.markPushed(box);
  assert.equal(store.hasUnsynced(), false);
  store.applyRemote({ userData: [{ key: 'checks', value: { list: { x: [{ d: '2026-11-22', result: 'richtig' }] } }, updated_at: new Date(Date.now() + 60000).toISOString() }] });
  assert.equal(store.checksFor('x')[0].result, 'richtig');
  assert.deepEqual(store.checksFor('nichts'), []);
});

test('Lernserie: höchstens ein Joker pro Woche, Wochenziel', async () => {
  const { computeStreak, weeksReached, weekStart } = await import('../js/streak.js');
  assert.equal(weekStart('2026-11-29'), '2026-11-23'); // Sonntag gehört zur Woche ab Montag
  assert.equal(weekStart('2026-11-23'), '2026-11-23');
  // Mo, (Di verpasst), Mi, (Do verpasst), Fr: zweiter verpasster Tag in derselben Woche beendet die Serie
  const days = { '2026-11-23': 10, '2026-11-25': 10, '2026-11-27': 10 };
  const st = computeStreak(days, '2026-11-27', 10);
  assert.equal(st.current, 1);
  assert.equal(st.best, 2);
  assert.equal(st.weekDone, 3);
  const full = { '2026-11-16': 10, '2026-11-17': 10, '2026-11-18': 10, '2026-11-19': 10, '2026-11-20': 10, ...days };
  assert.equal(weeksReached(full, '2026-11-29', 10, {}, 5), 1);
  assert.equal(weeksReached(full, '2026-11-29', 10, {}, 3), 2);
});

test('Tagesmission und Meilensteine: Zählen und Abgleich', () => {
  store.resetAll();
  store.countPart('k', '2026-11-23');
  store.countPart('k', '2026-11-23');
  store.countPart('m', '2026-11-23');
  assert.deepEqual(store.partsToday('2026-11-23'), { k: 2, a: 0, m: 1 });
  store.markMission('2026-11-23');
  store.bump('ohneTipp');
  assert.deepEqual(store.award(['serie-3', 'mission-1'], '2026-11-23'), ['serie-3', 'mission-1']);
  assert.deepEqual(store.award(['serie-3'], '2026-11-24'), []);
  const box = store.outbox();
  const act = box.userData.find((r) => r.key === 'activity').value;
  assert.equal(act.parts['2026-11-23'].k, 2);
  assert.equal(act.mission['2026-11-23'], true);
  assert.equal(box.userData.find((r) => r.key === 'badges').value.cnt.ohneTipp, 1);
  store.markPushed(box);
  assert.equal(store.hasUnsynced(), false);
  // Anderes Gerät: mehr Karten, ein anderer Meilenstein, früheres Datum
  store.applyRemote({ userData: [
    { key: 'activity', value: { days: {}, parts: { '2026-11-23': { k: 5, a: 1, m: 0 } }, mission: { '2026-11-22': true } }, updated_at: new Date().toISOString() },
    { key: 'badges', value: { got: { 'karten-25': '2026-11-20', 'serie-3': '2026-11-21' }, cnt: { ohneTipp: 3 } }, updated_at: new Date().toISOString() },
  ] });
  assert.deepEqual(store.partsToday('2026-11-23'), { k: 5, a: 1, m: 1 });
  assert.equal(store.missionDays()['2026-11-22'], true);
  assert.equal(store.badgesGot()['serie-3'], '2026-11-21');
  assert.equal(store.badgesGot()['mission-1'], '2026-11-23');
  assert.equal(store.counter('ohneTipp'), 3);
  assert.equal(store.hasUnsynced(), true); // lokal gibt es mehr (m, mission-1, Mission 23.)
});

test('Klausurreife: neu 0, sicher 1, Aufgaben zählen doppelt', async () => {
  const { cardReadiness, readiness, milestones } = await import('../js/progress.js');
  const today = '2026-11-23';
  assert.equal(cardReadiness(undefined, today), 0);
  assert.equal(cardReadiness({ first: '2026-11-01', ivl: 10, due: '2026-11-30' }, today), 1);
  assert.equal(cardReadiness({ first: '2026-11-01', ivl: 10, due: '2026-11-20' }, today), 0.85);
  const mid = cardReadiness({ first: '2026-11-20', ivl: 3, due: '2026-11-24' }, today);
  assert.ok(mid > 0.25 && mid < 0.75);
  const list = [{ id: 'a', typ: 'aufgabe' }, { id: 'b', typ: 'definition' }];
  const states = { a: { first: '2026-11-01', ivl: 10, due: '2026-12-01' } };
  assert.equal(readiness(list, (id) => states[id], today), 2 / 3);
  const ctx = {
    bestStreak: 3, missions: 0, weeks: 0, sicher: 0, begonnen: 0, total: 10, ohneTipp: 0, aufgabenSicher: 0,
    checks: 0, checksPerfect: 0, drillRight: 0, drillCovered: 0, drillTotal: 5, prepFull: 0, overall: 0,
    blaetter: [{ id: 'ue01', kurz: 'Blatt 1', total: 2, sicher: 2 }], themen: [{ id: 'x', titel: 'X', r: 0.5 }],
  };
  const ms = milestones(ctx);
  const done = new Set(ms.filter((m) => m.done).map((m) => m.id));
  assert.ok(done.has('serie-3') && done.has('blatt-ue01'));
  assert.ok(!done.has('serie-7') && !done.has('thema-x') && !done.has('karten-alle'));
  assert.equal(new Set(ms.map((m) => m.id)).size, ms.length, 'IDs eindeutig');
});
