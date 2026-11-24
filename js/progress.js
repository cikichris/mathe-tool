// =====================================================================
//  Klausurreife und Meilensteine
//
//  Reine Rechenfunktionen ohne Oberfläche, damit sie sich testen lassen.
// =====================================================================
import { isNew, SAFE_INTERVAL } from './srs.js';

/**
 * Wie gut sitzt eine Karte? 0 = neu, 1 = sicher.
 * Karten in Arbeit zählen je nach Abstand teilweise. Überfällige Karten
 * zählen etwas weniger, weil sie gerade zu verblassen drohen.
 */
export function cardReadiness(state, today) {
  if (isNew(state)) return 0;
  const overdue = state.due < today;
  if (state.ivl >= SAFE_INTERVAL) return overdue ? 0.85 : 1;
  const r = 0.25 + 0.5 * Math.min(1, state.ivl / SAFE_INTERVAL);
  return overdue ? r * 0.8 : r;
}

/** Rechenaufgaben zählen doppelt, weil die Klausur vor allem aus ihnen besteht. */
export const cardWeight = (card) => (card.typ === 'aufgabe' ? 2 : 1);

export function readiness(list, stateOf, today) {
  let sum = 0;
  let weight = 0;
  for (const card of list) {
    const w = cardWeight(card);
    sum += w * cardReadiness(stateOf(card.id), today);
    weight += w;
  }
  return weight ? sum / weight : 0;
}

export function readinessLabel(r) {
  if (r >= 0.9) return 'Klausurreif';
  if (r >= 0.75) return 'Fast klausurreif';
  if (r >= 0.5) return 'Auf gutem Weg';
  if (r >= 0.25) return 'Grundlagen da';
  if (r > 0) return 'Angefangen';
  return 'Noch nicht begonnen';
}

export const THEMA_REIF = 0.8;

// ---------------------------------------------------------------------
//  Meilensteine
//
//  ctx enthält alle Zahlen, die die Meilensteine brauchen (siehe app.js).
//  Jeder Meilenstein liefert [erreicht, Ziel] für die Fortschrittsanzeige.
// ---------------------------------------------------------------------

const fix = (list) => list.map((m) => ({ gruppe: 'Allgemein', ...m }));

export function milestones(ctx) {
  const list = fix([
    { id: 'serie-3', gruppe: 'Lernserie', icon: '🔥', titel: 'Drei am Stück', text: '3 Tage in Folge gelernt', p: [ctx.bestStreak, 3] },
    { id: 'serie-7', gruppe: 'Lernserie', icon: '🔥', titel: 'Eine Woche dran', text: '7 Tage in Folge gelernt', p: [ctx.bestStreak, 7] },
    { id: 'serie-14', gruppe: 'Lernserie', icon: '🔥', titel: 'Zwei Wochen', text: '14 Tage in Folge gelernt', p: [ctx.bestStreak, 14] },
    { id: 'serie-30', gruppe: 'Lernserie', icon: '🏆', titel: 'Ein ganzer Monat', text: '30 Tage in Folge gelernt', p: [ctx.bestStreak, 30] },
    { id: 'mission-1', gruppe: 'Lernserie', icon: '🎯', titel: 'Erste Mission', text: 'Die erste Tagesmission geschafft', p: [ctx.missions, 1] },
    { id: 'mission-10', gruppe: 'Lernserie', icon: '🎯', titel: 'Zehn Missionen', text: '10 Tagesmissionen geschafft', p: [ctx.missions, 10] },
    { id: 'mission-30', gruppe: 'Lernserie', icon: '🎯', titel: 'Missionsprofi', text: '30 Tagesmissionen geschafft', p: [ctx.missions, 30] },
    { id: 'woche-1', gruppe: 'Lernserie', icon: '📅', titel: 'Wochenziel', text: 'Zum ersten Mal das Wochenziel erreicht', p: [ctx.weeks, 1] },
    { id: 'woche-4', gruppe: 'Lernserie', icon: '📅', titel: 'Vier starke Wochen', text: '4-mal das Wochenziel erreicht', p: [ctx.weeks, 4] },

    { id: 'karten-25', gruppe: 'Karten', icon: '🧠', titel: '25 sicher', text: '25 Karten sitzen sicher', p: [ctx.sicher, 25] },
    { id: 'karten-100', gruppe: 'Karten', icon: '🧠', titel: '100 sicher', text: '100 Karten sitzen sicher', p: [ctx.sicher, 100] },
    { id: 'karten-alle', gruppe: 'Karten', icon: '🗺️', titel: 'Alles gesehen', text: 'Jede Karte mindestens einmal gelernt', p: [ctx.begonnen, ctx.total] },
    { id: 'karten-200', gruppe: 'Karten', icon: '🧠', titel: '200 sicher', text: '200 Karten sitzen sicher', p: [ctx.sicher, 200] },

    { id: 'ohnetipp-1', gruppe: 'Rechnen', icon: '✍️', titel: 'Ganz allein', text: 'Eine Rechenaufgabe ohne Tipp gelöst', p: [ctx.ohneTipp, 1] },
    { id: 'ohnetipp-10', gruppe: 'Rechnen', icon: '✍️', titel: 'Zehn ohne Hilfe', text: '10 Rechenaufgaben ohne Tipp gelöst', p: [ctx.ohneTipp, 10] },
    { id: 'aufgaben-25', gruppe: 'Rechnen', icon: '📐', titel: '25 Aufgaben sicher', text: '25 Rechenaufgaben sitzen sicher', p: [ctx.aufgabenSicher, 25] },
    { id: 'pruefen-1', gruppe: 'Rechnen', icon: '📷', titel: 'Selbst kontrolliert', text: 'Die erste eigene Lösung mit Foto geprüft', p: [ctx.checks, 1] },
    { id: 'pruefen-10', gruppe: 'Rechnen', icon: '📷', titel: 'Zehn Kontrollen', text: '10 eigene Lösungen geprüft', p: [ctx.checks, 10] },
    { id: 'fehlerfrei', gruppe: 'Rechnen', icon: '💯', titel: 'Fehlerfrei', text: 'Eigene Lösung geprüft: Ergebnis richtig, kein Schritt fehlt', p: [ctx.checksPerfect, 1] },

    { id: 'durchgang-1', gruppe: 'Vorlesungen', icon: '📖', titel: 'Eine Vorlesung verstanden', text: 'Alle Abschnitte einer Vorlesung als verstanden markiert', p: [ctx.walkUnits || 0, 1] },
    { id: 'durchgang-25', gruppe: 'Vorlesungen', icon: '📖', titel: '25 Abschnitte', text: '25 Vorlesungsabschnitte verstanden', p: [ctx.walkOk || 0, 25] },
    { id: 'durchgang-alle', gruppe: 'Vorlesungen', icon: '🎓', titel: 'Alle Vorlesungen', text: 'Jede Vorlesung komplett durchgearbeitet', p: [ctx.walkUnits || 0, ctx.walkUnitsTotal || 1] },
    { id: 'fokus-1', gruppe: 'Lernmodus', icon: '🍅', titel: 'Im Flow', text: 'Den ersten Fokusblock durchgezogen', p: [ctx.fokus || 0, 1] },
    { id: 'fokus-10', gruppe: 'Lernmodus', icon: '🍅', titel: 'Zehn Fokusblöcke', text: '10 Fokusblöcke geschafft', p: [ctx.fokus || 0, 10] },
    { id: 'fokus-50', gruppe: 'Lernmodus', icon: '🧘', titel: 'Fokusprofi', text: '50 Fokusblöcke geschafft', p: [ctx.fokus || 0, 50] },
    { id: 'methode-50', gruppe: 'Methode erkennen', icon: '⚡', titel: '50 erkannt', text: '50-mal die richtige Methode gewählt', p: [ctx.drillRight, 50] },
    { id: 'methode-alle', gruppe: 'Methode erkennen', icon: '⚡', titel: 'Alle Methoden', text: 'Jede Aufgabe im Schnelltraining einmal richtig', p: [ctx.drillCovered, ctx.drillTotal] },

    { id: 'vorbereitet', gruppe: 'Übung', icon: '📝', titel: 'Gut vorbereitet', text: 'Alle Aufgaben eines Blatts vor der Übung markiert', p: [ctx.prepFull, 1] },

    { id: 'reif-50', gruppe: 'Klausur', icon: '⛰️', titel: 'Halbzeit', text: 'Gesamte Klausurreife 50 %', p: [Math.round(ctx.overall * 100), 50] },
    { id: 'reif-80', gruppe: 'Klausur', icon: '🏔️', titel: 'Fast am Gipfel', text: 'Gesamte Klausurreife 80 %', p: [Math.round(ctx.overall * 100), 80] },
  ]);
  for (const b of ctx.blaetter) {
    list.push({ id: `blatt-${b.id}`, gruppe: 'Übung', icon: '📗', titel: `${b.kurz} gemeistert`, text: `Alle Rechenaufgaben von ${b.kurz} sitzen sicher`, p: [b.sicher, b.total] });
  }
  for (const t of ctx.themen) {
    list.push({ id: `thema-${t.id}`, gruppe: 'Klausur', icon: '🎓', titel: t.titel, text: `Thema zu ${Math.round(THEMA_REIF * 100)} % klausurreif`, p: [Math.round(t.r * 100), Math.round(THEMA_REIF * 100)] });
  }
  return list.map((m) => ({ ...m, done: m.p[1] > 0 && m.p[0] >= m.p[1] }));
}
