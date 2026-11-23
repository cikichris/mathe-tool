// =====================================================================
//  Mathe-Tool: Oberfläche
//
//  Ansichten (über den Teil hinter # in der Adresse):
//    #/                 Heute (Abfrage starten, Fortschritt)
//    #/lernen           laufende Abfrage
//    #/inhalte          alle Wochen und Einheiten
//    #/inhalte/vl01     eine Einheit mit allen Karten
//    #/fortschritt      Klausurreife, Lernserie, Meilensteine
//    #/formelblatt      Formelblatt-Builder
//    #/einstellungen    Klausurtermin, Login, Daten
// =====================================================================
import * as store from './store.js';
import * as sync from './sync.js';
import {
  weeks, units, cards, cardById, unitById, sheetItems, uebungen, nextUebung, themen, themaById,
  TYP_LABEL, HERKUNFT_LABEL, HERKUNFT_KURZ, TEIL_LABEL,
} from './content.js';
import { fmt, esc, typeset } from './render.js';
import { plotSVG } from './plot.js';
import {
  AGAIN, HARD, GOOD, EASY, RATING_LABELS,
  dateStr, daysBetween, addDays, isNew, isDue, stage, schedule, intervalLabel,
} from './srs.js';
import { COURSE_NAME } from '../config.js';
import { METHODEN, GRUPPEN, AUFGABEN } from '../content/methoden.js';
import {
  computeStreak, lastDays, weekDays, weeksReached, weekStart, DEFAULT_GOAL, DEFAULT_WEEK_GOAL,
} from './streak.js';
import { readiness, readinessLabel, milestones, cardReadiness, THEMA_REIF } from './progress.js';
import * as photos from './photos.js';

const view = document.getElementById('view');
let session = null;

const EINFACH = new Set(['definition', 'satz', 'formel', 'verfahren']);

// ---------------------------------------------------------------------
//  Hilfen
// ---------------------------------------------------------------------

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

function germanDate(str) {
  if (!str) return '';
  const [y, m, d] = str.split('-');
  return `${d}.${m}.${y}`;
}

const WOCHENTAG = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

/** '2026-11-17' -> 'Di 17.11.' */
function shortDate(str) {
  const [y, m, d] = str.split('-').map(Number);
  return `${WOCHENTAG[new Date(y, m - 1, d).getDay()]} ${String(d).padStart(2, '0')}.${String(m).padStart(2, '0')}.`;
}

function shuffled(n) {
  const order = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

function stageCounts(list) {
  const counts = { neu: 0, lernend: 0, sicher: 0 };
  for (const card of list) counts[stage(store.cardState(card.id))] += 1;
  return counts;
}

function todayPlan() {
  const today = dateStr();
  const due = cards
    .filter((c) => isDue(store.cardState(c.id), today))
    .sort((a, b) => store.cardState(a.id).due.localeCompare(store.cardState(b.id).due));
  const fresh = cards.filter((c) => isNew(store.cardState(c.id)));
  const left = Math.max(0, (store.settings().newPerDay || 0) - store.newCardsToday(today));
  return { due, fresh: fresh.slice(0, left), freshTotal: fresh.length };
}

function progressBar(counts) {
  const total = counts.neu + counts.lernend + counts.sicher || 1;
  const pct = (n) => `${(n / total) * 100}%`;
  return `<span class="bar" role="img" aria-label="${counts.sicher} sicher, ${counts.lernend} in Arbeit, ${counts.neu} neu">`
    + `<span class="bar-safe" style="width:${pct(counts.sicher)}"></span>`
    + `<span class="bar-learn" style="width:${pct(counts.lernend)}"></span></span>`;
}

function show(html) {
  view.innerHTML = html;
  typeset(view);
}

// ---------------------------------------------------------------------
//  Eine Karte darstellen
// ---------------------------------------------------------------------

function cardHead(card) {
  return `<header class="card-head">
    <span class="badge badge-${card.typ}">${TYP_LABEL[card.typ]}</span>
    <span class="card-thema">${esc(card.thema)}</span>
    <span class="card-quelle">${esc(card.quelle)}</span>
  </header>`;
}

function stepsHtml(card, stepsShown) {
  const steps = (card.schritte || []).slice(0, stepsShown);
  return `<ol class="steps">${steps.map((s) => `<li><div class="step-text">${fmt(s.t)}</div>${s.w ? `<div class="step-why">${fmt(s.w)}</div>` : ''}${s.q ? `<div class="step-source"><span class="step-source-label">Woher?</span>${fmt(s.q)}</div>` : ''}</li>`).join('')}</ol>`;
}

function resultHtml(card) {
  return `<div class="result"><span class="result-label">Ergebnis</span>${fmt(card.ergebnis)}</div>`;
}

const ABGLEICH_LABEL = {
  bestaetigt: 'In der Übung bestätigt',
  abweichung: 'Abweichung zur Übung',
  ergaenzt: 'Weg aus der Übung',
};

function originHtml(card) {
  if (card.abgleich) {
    return card.abgleich.status === 'bestaetigt'
      ? `<p class="origin origin-abgeglichen">Lösung in der Übung am ${shortDate(card.abgleich.datum)} bestätigt</p>`
      : `<p class="origin origin-abgeglichen">Am ${shortDate(card.abgleich.datum)} mit der Übung abgeglichen, Hinweis oben beachten</p>`;
  }
  return card.herkunft ? `<p class="origin origin-${card.herkunft}">${esc(HERKUNFT_LABEL[card.herkunft])}</p>` : '';
}

/** Ergebnis des Abgleichs mit der Musterlösung bzw. Mitschrift aus der Übung. */
function abgleichHtml(card) {
  const a = card.abgleich;
  if (!a) return '';
  return `<div class="abgleich abgleich-${a.status}">
    <span class="abgleich-label">${ABGLEICH_LABEL[a.status]} · ${shortDate(a.datum)}</span>
    ${fmt(a.text)}
  </div>`;
}

/** Alles, was nach dem letzten Schritt kommt: Skizze, Ergebnis, Fehler, Rezept, Herkunft. */
function solutionEndHtml(card, withResult = true) {
  let html = '';
  if (card.plotLoesung) html += plotSVG(card.plotLoesung);
  if (withResult) html += resultHtml(card);
  html += abgleichHtml(card);
  if (card.fehler?.length) {
    html += `<div class="pitfalls"><h3>Typische Fehler</h3><ul>${card.fehler.map((f) => `<li>${fmt(f)}</li>`).join('')}</ul></div>`;
  }
  const rezept = card.rezept && cardById.get(card.rezept);
  if (rezept) {
    html += `<details class="recipe"><summary>Rezept für diesen Aufgabentyp</summary>
      <p class="recipe-q">${fmt(rezept.frage)}</p>${fmt(rezept.antwort)}</details>`;
  }
  return html + originHtml(card);
}

function tipsHtml(card, shown) {
  const tips = (card.tipps || []).slice(0, shown);
  if (!tips.length) return '';
  return `<div class="tips">${tips.map((t, i) => `<div class="tip"><span class="tip-label">Tipp ${i + 1}</span>${fmt(t)}</div>`).join('')}</div>`;
}

function solutionHtml(card, stepsShown) {
  const total = (card.schritte || []).length;
  let html = `<div class="solution"><h3>Lösungsweg</h3>${stepsHtml(card, stepsShown)}`;
  if (stepsShown < total) {
    return `${html}<div class="step-actions">
      <button class="btn" data-action="step">Nächster Schritt (${stepsShown + 1}/${total})</button>
      <button class="btn btn-quiet" data-action="steps-all">Alle zeigen</button>
    </div></div>`;
  }
  return `${html}${solutionEndHtml(card)}</div>`;
}

/** ui = { revealed, tips, steps, picked, order }; in der Inhaltsübersicht ist alles aufgedeckt. */
function cardBody(card, ui, browse = false) {
  // In der Inhaltsübersicht steht die Frage schon in der Kopfzeile
  let html = browse ? '' : `<div class="frage">${fmt(card.frage)}</div>`;
  if (card.plot) html += plotSVG(card.plot);

  if (EINFACH.has(card.typ)) {
    if (ui.revealed || browse) {
      html += `<div class="antwort">${fmt(card.antwort)}</div>`;
      if (card.plotAntwort) html += plotSVG(card.plotAntwort);
      if (card.merke) html += `<div class="merke"><span class="merke-label">Merke</span>${fmt(card.merke)}</div>`;
      if (card.herkunft === 'zusatz') html += '<p class="origin origin-zusatz">Ergänzung von Claude, steht so nicht in den Folien</p>';
    }
    return html;
  }

  if (card.typ === 'verstaendnis') {
    const order = ui.order || card.optionen.map((_, i) => i);
    const answered = browse || ui.picked !== null;
    html += '<div class="options">';
    for (const i of order) {
      let cls = 'option';
      if (answered && i === card.richtig) cls += ' is-right';
      else if (!browse && ui.picked === i) cls += ' is-wrong';
      html += `<button class="${cls}" data-action="pick" data-i="${i}" ${answered ? 'disabled' : ''}>${fmt(card.optionen[i])}</button>`;
    }
    html += '</div>';
    if (answered) {
      if (!browse) {
        html += ui.picked === card.richtig
          ? '<p class="verdict verdict-right">Richtig.</p>'
          : '<p class="verdict verdict-wrong">Das stimmt nicht. Die richtige Antwort ist markiert.</p>';
      }
      html += `<div class="antwort">${fmt(card.erklaerung)}</div>${abgleichHtml(card)}`;
      if (card.herkunft === 'claude' || card.herkunft === 'zusatz' || card.abgleich) html += originHtml(card);
    }
    return html;
  }

  // Aufgabe
  const tipsShown = browse ? Infinity : ui.tips;
  if (!browse && !ui.revealed && tipsShown === 0) {
    html += '<p class="hint-paper">Rechne die Aufgabe zuerst selbst auf Papier. Wenn du hängst, hol dir einen Tipp.</p>';
  }
  html += tipsHtml(card, tipsShown);
  if (ui.revealed || browse) html += solutionHtml(card, browse ? Infinity : ui.steps);
  return html;
}

// ---------------------------------------------------------------------
//  Abfrage
// ---------------------------------------------------------------------

function freshUi(card) {
  return {
    revealed: false,
    tips: 0,
    steps: 1,
    picked: null,
    order: card?.typ === 'verstaendnis' && !card.optionenFest ? shuffled(card.optionen.length) : null,
  };
}

function startSession(list, mode, title) {
  if (!list.length) return;
  session = {
    queue: list.map((c) => c.id),
    total: list.length,
    done: 0,
    again: 0,
    mode,
    title,
    ui: freshUi(list[0]),
    finished: false,
  };
  if (location.hash === '#/lernen') route();
  else location.hash = '#/lernen';
}

function ratingButtons(card, allowed = [AGAIN, HARD, GOOD, EASY]) {
  const today = dateStr();
  const state = store.cardState(card.id);
  const early = !isNew(state) && state.due > today;
  const buttons = allowed.map((r) => {
    const next = schedule(state, r, today, store.maxInterval(today));
    const when = early && r !== AGAIN ? 'Plan bleibt' : intervalLabel(next.ivl);
    return `<button class="rate rate-${r}" data-action="rate" data-r="${r}"><span>${RATING_LABELS[r]}</span><small>${when}</small></button>`;
  }).join('');
  return `<div class="rating" style="--n:${allowed.length}">${buttons}</div>`;
}

function sessionActions(card, ui) {
  if (EINFACH.has(card.typ)) {
    return ui.revealed
      ? `<p class="rating-q">Wie gut wusstest du es?</p>${ratingButtons(card)}`
      : '<button class="btn btn-primary btn-wide" data-action="reveal">Antwort zeigen</button>';
  }
  if (card.typ === 'verstaendnis') {
    if (ui.picked === null) return '<p class="rating-q">Wähle eine Antwort.</p>';
    return ui.picked === card.richtig
      ? `<p class="rating-q">Wie sicher warst du?</p>${ratingButtons(card, [HARD, GOOD, EASY])}`
      : `<button class="btn btn-primary btn-wide" data-action="rate" data-r="${AGAIN}">Weiter (kommt gleich nochmal)</button>`;
  }
  // Aufgabe
  if (ui.revealed) return `<p class="rating-q">Wie lief die Aufgabe?</p>${ratingButtons(card)}<p class="check-hint"><a href="#/pruefen/${card.id}">Lieber mit Foto deiner Rechnung vergleichen</a></p>`;
  const tips = card.tipps || [];
  const tipBtn = ui.tips < tips.length
    ? `<button class="btn" data-action="tip">Tipp zeigen (${ui.tips + 1}/${tips.length})</button>`
    : '';
  return `<div class="action-row">${tipBtn}<button class="btn btn-primary" data-action="reveal">Lösung zeigen</button></div>`;
}

function renderSession() {
  document.body.classList.add('in-session');
  if (session.finished || !session.queue.length) {
    session.finished = true;
    const plan = todayPlan();
    const more = plan.due.length + plan.fresh.length;
    if (session.mission) {
      show(missionSummary(`${plural(session.done, 'Karte', 'Karten')} bearbeitet${session.again ? `, ${session.again}-mal „Nochmal“` : ''}.`));
      return;
    }
    show(`<section class="summary">
      <h1>Geschafft</h1>
      <p class="summary-main">${plural(session.done, 'Karte', 'Karten')} bearbeitet${session.again ? `, ${session.again}-mal „Nochmal“` : ''}.</p>
      ${streakNote()}
      <p class="muted">Jede Karte kommt automatisch wieder, bevor du sie vergisst.</p>
      <div class="action-row">
        ${more ? `<button class="btn" data-action="start-today">Weitere ${plural(more, 'Karte', 'Karten')} für heute</button>` : ''}
        <a class="btn btn-primary" href="#/">Zur Übersicht</a>
      </div>
    </section>`);
    return;
  }
  const card = cardById.get(session.queue[0]);
  const ui = session.ui;
  const pct = Math.round((session.done / session.total) * 100);
  show(`<section class="session">
    <div class="session-bar">
      <a class="session-close" href="#/" aria-label="Abfrage beenden">Beenden</a>
      <div class="session-progress" role="progressbar" aria-valuemin="0" aria-valuemax="${session.total}" aria-valuenow="${session.done}"><span style="width:${pct}%"></span></div>
      <span class="session-count">${session.done} / ${session.total}</span>
    </div>
    <article class="card card-${card.typ}">
      ${cardHead(card)}
      ${cardBody(card, ui)}
    </article>
    <div class="actions">${sessionActions(card, ui)}</div>
  </section>`);
}

function rateCurrent(rating) {
  const id = session.queue.shift();
  const card = cardById.get(id);
  store.rate(id, rating, session.mode);
  store.countPart('k');
  if (card.typ === 'aufgabe') {
    store.countPart('a');
    if (rating >= GOOD && session.ui.tips === 0) store.bump('ohneTipp');
  }
  if (rating === AGAIN) {
    session.again += 1;
    session.queue.push(id);
  } else {
    session.done += 1;
  }
  session.ui = freshUi(cardById.get(session.queue[0]));
  renderSession();
  window.scrollTo(0, 0);
}

// ---------------------------------------------------------------------
//  Heute
// ---------------------------------------------------------------------

// ---------------------------------------------------------------------
//  Lernserie
// ---------------------------------------------------------------------

function streakNow() {
  const set = store.settings();
  return computeStreak(store.activityDays(), dateStr(), set.dailyGoal || DEFAULT_GOAL, store.missionDays(), set.weekGoal || DEFAULT_WEEK_GOAL);
}

const WT = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

function weekRow(st) {
  const cells = weekDays(store.activityDays(), dateStr(), st.goal, store.missionDays(), st.bridged).map((x, i) => {
    const cls = x.done ? 'is-done' : x.joker ? 'is-joker' : x.future ? 'is-future' : x.today ? '' : 'is-missed';
    const what = x.done ? (store.missionDays()[x.d] ? 'Mission geschafft' : 'Tagesziel erreicht') : x.joker ? 'Joker eingesetzt' : x.future ? 'kommt noch' : x.today ? 'heute, noch offen' : 'nicht gelernt';
    const mark = x.done ? '✓' : x.joker ? '🛡️' : '';
    return `<span class="wk-day ${cls} ${x.today ? 'is-today' : ''}" title="${shortDate(x.d)}: ${what}"><span class="wk-dot" aria-hidden="true">${mark}</span><span class="wk-label">${WT[i]}</span><span class="visually-hidden">${what}</span></span>`;
  }).join('');
  return `<div class="wk-row" aria-label="Diese Woche">${cells}</div>`;
}

function streakPanel() {
  const st = streakNow();
  let headline;
  let sub;
  if (st.todayDone) {
    headline = `${plural(st.current, 'Tag', 'Tage')} in Folge`;
    sub = 'Heute geschafft. Morgen geht es weiter.';
  } else if (st.current > 0) {
    headline = `${plural(st.current, 'Tag', 'Tage')} in Folge`;
    sub = st.jokerYesterday
      ? `Gestern hat dein Joker die Serie gerettet. Schaff heute die Mission, dann sind es ${st.current + 1}.`
      : `Schaff heute die Tagesmission, dann sind es ${st.current + 1}.`;
  } else {
    headline = 'Starte heute eine Serie';
    sub = 'Schaff die Tagesmission, dann zählt der Tag.';
  }
  const weekOk = st.weekDone >= st.weekGoal;
  return `<div class="panel streak ${st.todayDone ? 'is-done' : ''}">
    <div class="streak-top">
      <span class="streak-flame" aria-hidden="true">${st.current > 0 || st.todayDone ? '🔥' : '○'}</span>
      <div class="streak-text"><strong>${headline}</strong><span class="muted small">${sub}</span></div>
      ${st.best > 1 ? `<span class="streak-best" title="Längste Serie">Rekord ${st.best}</span>` : ''}
    </div>
    ${weekRow(st)}
    <div class="streak-meta">
      <span class="${weekOk ? 'is-ok' : ''}">${weekOk ? '✓ ' : ''}Wochenziel ${st.weekDone} / ${st.weekGoal} Tage</span>
      <span class="joker ${st.jokerFree ? 'is-free' : ''}" title="Ein verpasster Tag pro Woche wird automatisch überbrückt">🛡️ ${st.jokerFree ? 'Joker bereit' : 'Joker verbraucht'}</span>
    </div>
  </div>`;
}

/** Kurze Rückmeldung zur Serie am Ende einer Abfrage oder Trainingsrunde. */
function streakNote() {
  const st = streakNow();
  if (st.todayDone) return `<p class="streak-note is-done">🔥 Heute geschafft · ${plural(st.current, 'Tag', 'Tage')} in Folge</p>`;
  const left = st.goal - st.todayCount;
  return `<p class="streak-note">Damit der Tag zählt: Tagesmission schaffen oder noch ${plural(left, 'Frage', 'Fragen')} beantworten.</p>`;
}

// ---------------------------------------------------------------------
//  Tagesmission: Karten wiederholen, Aufgabe des Tages, Methode erkennen
// ---------------------------------------------------------------------

const MISSION_CARDS = 8;
const MISSION_DRILL = 5;

/** Die Rechenaufgabe des Tages: zuerst fällige, dann wacklige, dann neue Aufgaben. */
function missionTask(today) {
  const pick = store.missionPick();
  if (pick.d === today && cardById.has(pick.card)) return cardById.get(pick.card);
  const tasks = cards.filter((c) => c.typ === 'aufgabe');
  const st = (c) => store.cardState(c.id);
  const due = tasks.filter((c) => isDue(st(c), today)).sort((a, b) => st(a).due.localeCompare(st(b).due));
  const wobbly = tasks.filter((c) => stage(st(c)) === 'lernend')
    .sort((a, b) => (st(b).lapses - st(a).lapses) || (st(a).ivl - st(b).ivl));
  const fresh = tasks.filter((c) => isNew(st(c)));
  const card = due[0] || wobbly[0] || fresh[0] || tasks[Math.floor(Math.random() * tasks.length)];
  store.setMissionPick(today, card.id);
  return card;
}

function missionState(today = dateStr()) {
  const parts = store.partsToday(today);
  const task = missionTask(today);
  const plan = todayPlan();
  const pool = [...plan.due, ...plan.fresh].filter((c) => c.id !== task.id);
  const kGoal = Math.min(MISSION_CARDS, parts.k + pool.length);
  const k = Math.min(parts.k, kGoal);
  const aDone = store.cardState(task.id)?.last === today;
  const m = Math.min(parts.m, MISSION_DRILL);
  const steps = [
    { id: 'k', done: k >= kGoal, titel: 'Karten wiederholen', info: kGoal ? `${k} / ${kGoal}` : 'heute nichts fällig', n: k, of: kGoal },
    { id: 'a', done: aDone, titel: 'Aufgabe des Tages', info: `${task.unit.kurz} · ${task.thema}`, n: aDone ? 1 : 0, of: 1 },
    { id: 'm', done: m >= MISSION_DRILL, titel: 'Methode erkennen', info: `${m} / ${MISSION_DRILL}`, n: m, of: MISSION_DRILL },
  ];
  return { steps, task, pool, kGoal, k, m, done: steps.every((x) => x.done), marked: Boolean(store.missionDays()[today]) };
}

function missionPanel(ms = missionState()) {
  const doneCount = ms.steps.filter((x) => x.done).length;
  const next = ms.steps.find((x) => !x.done);
  const list = ms.steps.map((x, i) => `<li class="${x.done ? 'is-done' : ''} ${x === next ? 'is-next' : ''}">
      <button class="mission-step" data-action="mission-part" data-part="${x.id}" ${x.done && x.id !== 'a' ? 'disabled' : ''}>
        <span class="mission-check" aria-hidden="true">${x.done ? '✓' : i + 1}</span>
        <span class="mission-text"><strong>${x.titel}</strong><small>${esc(x.info)}</small></span>
        ${x.of > 1 ? `<span class="mission-mini" aria-hidden="true"><span style="width:${Math.round((x.n / x.of) * 100)}%"></span></span>` : ''}
      </button>
    </li>`).join('');
  const foot = ms.done
    ? '<p class="mission-done">🎉 Mission geschafft! Alles Weitere ist Bonus.</p>'
    : `<button class="btn btn-primary btn-wide" data-action="mission-go">${doneCount ? `Weiter: ${next.titel}` : 'Mission starten'}</button>`;
  return `<div class="panel mission ${ms.done ? 'is-done' : ''}">
    <div class="mission-head"><strong>Tagesmission</strong><span class="muted small">ca. 10 Minuten</span><span class="mission-count">${doneCount} / 3</span></div>
    <ol class="mission-list">${list}</ol>
    ${ms.done ? '' : `<p class="muted small mission-task-hint">Aufgabe des Tages auf Papier rechnen. Danach Lösung aufdecken oder <a href="#/pruefen/${ms.task.id}">mit Foto prüfen</a>.</p>`}
    ${foot}
  </div>`;
}

/** Zusammenfassung am Ende eines Missionsteils. */
function missionSummary(line) {
  const ms = missionState();
  const next = ms.steps.find((x) => !x.done);
  return `<section class="summary">
    ${ms.done ? '<div class="party" aria-hidden="true">🎉</div><h1>Tagesmission geschafft!</h1>' : '<h1>Teil geschafft</h1>'}
    <p class="summary-main">${line}</p>
    ${streakNote()}
    ${missionPanel(ms)}
    <div class="action-row">
      ${next ? '' : '<a class="btn btn-primary" href="#/">Zur Übersicht</a>'}
      ${next ? '<a class="btn btn-quiet" href="#/">Später weitermachen</a>' : ''}
    </div>
  </section>`;
}

function startMissionPart(part) {
  const ms = missionState();
  if (part === 'k') {
    const list = ms.pool.slice(0, Math.max(1, ms.kGoal - ms.k));
    if (!list.length) return;
    startSession(list, 'heute', 'Tagesmission');
    session.mission = true;
  } else if (part === 'a') {
    startSession([ms.task], 'mission', 'Aufgabe des Tages');
    session.mission = true;
  } else if (part === 'm') {
    if (location.hash !== '#/methoden') location.hash = '#/methoden';
    drillFilter = 'alle';
    startDrill(Math.max(1, MISSION_DRILL - ms.m), true);
  }
}

// ---------------------------------------------------------------------
//  Meilensteine und kurze Meldungen
// ---------------------------------------------------------------------

function toast(html, cls = '') {
  let box = document.getElementById('toasts');
  if (!box) {
    box = document.createElement('div');
    box.id = 'toasts';
    box.className = 'toasts';
    box.setAttribute('role', 'status');
    box.setAttribute('aria-live', 'polite');
    document.body.append(box);
  }
  const el = document.createElement('div');
  el.className = `toast ${cls}`;
  el.innerHTML = html;
  box.append(el);
  setTimeout(() => el.classList.add('is-out'), 4200);
  setTimeout(() => el.remove(), 4700);
}

function stateOf(id) {
  return store.cardState(id);
}

function milestoneContext() {
  const today = dateStr();
  const set = store.settings();
  const st = streakNow();
  const counts = stageCounts(cards);
  const aufgaben = cards.filter((c) => c.typ === 'aufgabe');
  const checks = Object.values(store.allChecks()).flat();
  const drillStats = store.drillStats();
  const blaetter = units.filter((u) => u.art === 'uebung').map((u) => {
    const t = u.karten.filter((c) => c.typ === 'aufgabe');
    return { id: u.id, kurz: `Blatt ${u.nummer}`, total: t.length, sicher: t.filter((c) => stage(stateOf(c.id)) === 'sicher').length };
  }).filter((b) => b.total);
  const prepFull = uebungen.filter((u) => {
    const pr = prepProgress(u);
    return pr.total && pr.done >= pr.total;
  }).length;
  const themenR = themen.map((t) => ({ ...t, r: readiness(t.karten, stateOf, today) }));
  return {
    bestStreak: st.best,
    missions: Object.keys(store.missionDays()).length,
    weeks: weeksReached(store.activityDays(), today, st.goal, store.missionDays(), set.weekGoal || DEFAULT_WEEK_GOAL),
    sicher: counts.sicher,
    begonnen: counts.sicher + counts.lernend,
    total: cards.length,
    ohneTipp: store.counter('ohneTipp'),
    aufgabenSicher: aufgaben.filter((c) => stage(stateOf(c.id)) === 'sicher').length,
    checks: checks.length,
    checksPerfect: checks.filter((c) => c.result === 'richtig' && !c.fehlt).length,
    drillRight: Object.values(drillStats).reduce((sum, [r = 0]) => sum + r, 0),
    drillCovered: AUFGABEN.filter((a) => (drillStats[a.id]?.[0] || 0) > 0).length,
    drillTotal: AUFGABEN.length,
    prepFull,
    overall: readiness(themen.flatMap((t) => t.karten), stateOf, today),
    blaetter,
    themen: themenR,
  };
}

let watchTimer = null;
let watchReady = false;
/** Nach jeder Änderung: Tagesmission abhaken und neue Meilensteine melden. */
function watchProgress() {
  clearTimeout(watchTimer);
  watchTimer = setTimeout(() => {
    const today = dateStr();
    const ms = missionState(today);
    if (ms.done && !ms.marked) {
      store.markMission(today);
      if (watchReady) toast(`🎯 <strong>Tagesmission geschafft!</strong> ${streakNow().current > 1 ? `${streakNow().current} Tage in Folge.` : 'Die Serie läuft.'}`, 'is-good');
    }
    const list = milestones(milestoneContext());
    const fresh = store.award(list.filter((m) => m.done).map((m) => m.id), today);
    if (fresh.length && watchReady) {
      const byId = new Map(list.map((m) => [m.id, m]));
      if (fresh.length > 3) toast(`🏅 <strong>${fresh.length} Meilensteine freigeschaltet</strong> <a href="#/fortschritt">ansehen</a>`);
      else fresh.forEach((id) => toast(`${byId.get(id).icon} <strong>Meilenstein: ${esc(byId.get(id).titel)}</strong><br><span>${esc(byId.get(id).text)}</span>`));
    }
    watchReady = true;
  }, 250);
}

function examChip() {
  const exam = store.settings().examDate;
  if (!exam) return '<a class="chip chip-link" href="#/einstellungen">Klausurtermin eintragen</a>';
  const left = daysBetween(dateStr(), exam);
  if (left < 0) return '<span class="chip">Klausur ist vorbei</span>';
  if (left === 0) return '<span class="chip chip-strong">Heute ist Klausur</span>';
  return `<span class="chip chip-strong">Noch ${plural(left, 'Tag', 'Tage')} bis zur Klausur</span>`;
}

function weekList(detailed) {
  return weeks.map((w) => {
    const rows = w.einheiten.map((u) => {
      const c = stageCounts(u.karten);
      const meta = detailed
        ? `<span class="unit-meta">${plural(u.karten.length, 'Karte', 'Karten')}, davon ${plural(u.karten.filter((k) => k.typ === 'aufgabe').length, 'Aufgabe', 'Aufgaben')}</span>`
        : `<span class="unit-meta">${c.sicher} von ${u.karten.length} sicher</span>`;
      return `<a class="unit-row" href="#/inhalte/${u.id}">
        <span class="unit-kind unit-kind-${u.art}">${u.kurz}</span>
        <span class="unit-title">${esc(u.titel)}</span>
        ${progressBar(c)}
        ${meta}
      </a>`;
    }).join('');
    return `<section class="week"><h3>Woche ${w.nr} <span>${esc(w.titel)}</span></h3>${rows}</section>`;
  }).join('');
}

function readinessTeaser() {
  const today = dateStr();
  const all = readiness(themen.flatMap((t) => t.karten), stateOf, today);
  const weakest = themen
    .map((t) => ({ t, r: readiness(t.karten, stateOf, today), started: t.karten.some((c) => !isNew(stateOf(c.id))) }))
    .filter((x) => x.started)
    .sort((a, b) => a.r - b.r)
    .slice(0, 2);
  return `<a class="panel ready-teaser" href="#/fortschritt">
    <span class="ready-num">${Math.round(all * 100)}<small>%</small></span>
    <span class="ready-text"><strong>Klausurreife</strong><span class="muted small">${weakest.length ? `Am meisten Luft: ${weakest.map((x) => esc(x.t.titel)).join(', ')}` : 'Wächst mit jeder sicheren Karte'}</span></span>
    <span class="prep-teaser-go" aria-hidden="true">›</span>
  </a>`;
}

function renderHome() {
  const plan = todayPlan();
  const n = plan.due.length + plan.fresh.length;
  const weak = cards
    .filter((c) => (store.cardState(c.id)?.lapses || 0) > 0)
    .sort((a, b) => store.cardState(b.id).lapses - store.cardState(a.id).lapses)
    .slice(0, 5);

  let today;
  if (n) {
    today = `<p class="panel-title">Alle fälligen Karten</p>
      <div class="today-numbers">
        <div><strong>${plan.due.length}</strong><span>${plan.due.length === 1 ? 'Wiederholung' : 'Wiederholungen'}</span></div>
        <div><strong>${plan.fresh.length}</strong><span>${plan.fresh.length === 1 ? 'neue Karte' : 'neue Karten'}</span></div>
      </div>
      <button class="btn btn-wide" data-action="start-today">Abfrage starten</button>`;
  } else if (plan.freshTotal) {
    today = `<p class="today-done">Für heute ist alles erledigt.</p>
      <p class="muted">Es warten noch ${plural(plan.freshTotal, 'neue Karte', 'neue Karten')}. Dein Tageslimit ist erreicht.</p>
      <button class="btn btn-wide" data-action="start-extra">10 weitere neue Karten lernen</button>`;
  } else {
    today = `<p class="today-done">Für heute ist alles erledigt.</p>
      <p class="muted">Alle Karten sind eingeplant. Unter „Inhalte“ kannst du jederzeit frei üben.</p>`;
  }

  show(`<section class="home">
    <header class="page-head">
      <p class="eyebrow">${esc(COURSE_NAME)}</p>
      <h1>Heute</h1>
      ${examChip()}
    </header>
    ${streakPanel()}
    ${missionPanel()}
    ${prepTeaser()}
    ${readinessTeaser()}
    <div class="panel today">${today}</div>
    ${drillTeaser()}

    ${weak.length ? `<h2>Schwachstellen</h2>
      <div class="panel">
        <ul class="weak-list">${weak.map((c) => `<li><span class="badge badge-${c.typ}">${TYP_LABEL[c.typ]}</span> ${fmt(c.frage.split('\n')[0])}<small>${store.cardState(c.id).lapses}-mal nicht gewusst</small></li>`).join('')}</ul>
        <button class="btn btn-wide" data-action="start-weak">Schwachstellen üben</button>
      </div>` : ''}
    ${store.isMemoryOnly() ? '<p class="warn">Dieser Browser erlaubt kein Speichern (privater Modus?). Dein Lernstand geht beim Schließen verloren.</p>' : ''}
  </section>`);
}

// ---------------------------------------------------------------------
//  Fortschritt: Klausurreife, Lernserie, Meilensteine
// ---------------------------------------------------------------------

function pct(r) {
  return Math.round(r * 100);
}

function heatmap(st) {
  const today = dateStr();
  const days = store.activityDays();
  const mission = store.missionDays();
  const WEEKS = 12;
  const start = addDays(weekStart(today), -7 * (WEEKS - 1));
  let cols = '';
  for (let w = 0; w < WEEKS; w += 1) {
    let cells = '';
    for (let i = 0; i < 7; i += 1) {
      const d = addDays(start, w * 7 + i);
      if (d > today) { cells += '<span class="hm-cell is-future"></span>'; continue; }
      const n = days[d] || 0;
      const lvl = mission[d] ? 4 : n >= st.goal ? 3 : n >= st.goal / 2 ? 2 : n > 0 ? 1 : 0;
      const joker = st.bridged.has(d);
      const what = mission[d] ? `Mission geschafft, ${n} Antworten` : joker ? 'Joker eingesetzt' : `${n} Antworten`;
      cells += `<span class="hm-cell lvl-${lvl} ${joker ? 'is-joker' : ''} ${d === today ? 'is-today' : ''}" title="${shortDate(d)}: ${what}"></span>`;
    }
    cols += `<span class="hm-col">${cells}</span>`;
  }
  return `<div class="hm" role="img" aria-label="Lernaktivität der letzten ${WEEKS} Wochen">
      <span class="hm-days" aria-hidden="true"><span>Mo</span><span></span><span>Mi</span><span></span><span>Fr</span><span></span><span>So</span></span>
      <span class="hm-grid">${cols}</span>
    </div>
    <div class="hm-legend" aria-hidden="true">weniger <span class="hm-cell lvl-0"></span><span class="hm-cell lvl-1"></span><span class="hm-cell lvl-2"></span><span class="hm-cell lvl-3"></span><span class="hm-cell lvl-4"></span> mehr · <span class="hm-cell lvl-0 is-joker"></span> Joker</div>`;
}

function forecastLine() {
  const today = dateStr();
  const fresh = cards.filter((c) => isNew(stateOf(c.id))).length;
  const per = store.settings().newPerDay || 0;
  if (!fresh) return 'Du hast jede Karte schon einmal gelernt.';
  if (!per) return `Noch ${plural(fresh, 'Karte', 'Karten')} nie gelernt. Neue Karten pro Tag stehen auf 0.`;
  const until = addDays(today, Math.ceil(fresh / per) - 1);
  const exam = store.settings().examDate;
  const buffer = exam ? daysBetween(until, exam) : null;
  return `Noch ${plural(fresh, 'Karte', 'Karten')} nie gelernt. Bei ${per} pro Tag hast du am ${shortDate(until)} alles einmal gesehen${buffer !== null && buffer > 0 ? `, ${plural(buffer, 'Tag', 'Tage')} vor der Klausur` : ''}.`;
}

function renderProgress() {
  const today = dateStr();
  const st = streakNow();
  const ctx = milestoneContext();
  const counts = stageCounts(cards);
  const aufgaben = cards.filter((c) => c.typ === 'aufgabe');
  const aSicher = aufgaben.filter((c) => stage(stateOf(c.id)) === 'sicher').length;

  const themeRows = ctx.themen.map((t) => {
    const tasks = t.karten.filter((c) => c.typ === 'aufgabe');
    const tSicher = tasks.filter((c) => stage(stateOf(c.id)) === 'sicher').length;
    const p = pct(t.r);
    return `<li class="theme-row ${t.r >= THEMA_REIF ? 'is-ready' : ''}">
      <div class="theme-top"><strong>${esc(t.titel)}</strong><span class="theme-pct">${p} %</span></div>
      <span class="meter" role="img" aria-label="${p} Prozent"><span style="width:${p}%"></span><i style="left:${pct(THEMA_REIF)}%" title="klausurreif ab ${pct(THEMA_REIF)} %"></i></span>
      <div class="theme-foot"><span class="muted small">${readinessLabel(t.r)} · ${tSicher} von ${plural(tasks.length, 'Aufgabe', 'Aufgaben')} sicher</span>
        <button class="btn btn-quiet btn-small" data-action="start-thema" data-thema="${t.id}">Üben</button></div>
    </li>`;
  }).join('');

  const drillStats = store.drillStats();
  const drillRows = GRUPPEN.map((g) => {
    let r = 0;
    let n = 0;
    for (const a of AUFGABEN.filter((x) => x.g === g.id)) {
      const [right = 0, wrong = 0] = drillStats[a.id] || [];
      r += right;
      n += right + wrong;
    }
    const p = n ? Math.round((r / n) * 100) : 0;
    return `<li class="mini-row"><span>${esc(g.titel)}</span><span class="meter meter-thin"><span style="width:${p}%"></span></span><span class="mini-val">${n ? `${p} %` : '–'}</span></li>`;
  }).join('');

  const checks = Object.values(store.allChecks()).flat();
  const checkedTasks = Object.keys(store.allChecks()).filter((id) => store.checksFor(id).length).length;
  const checksOk = checks.filter((c) => c.result === 'richtig').length;

  const ms = milestones(ctx);
  const got = store.badgesGot();
  const groups = [...new Set(ms.map((m) => m.gruppe))];
  const badgeHtml = groups.map((g) => `<h3 class="badge-group">${esc(g)}</h3><ul class="badges">${ms.filter((m) => m.gruppe === g).map((m) => {
    const earned = Boolean(got[m.id]) || m.done;
    const prog = Math.min(m.p[0], m.p[1]);
    return `<li class="ms ${earned ? 'is-earned' : ''}" title="${esc(m.text)}">
      <span class="ms-icon" aria-hidden="true">${m.icon}</span>
      <span class="ms-text"><strong>${esc(m.titel)}</strong><small>${esc(m.text)}</small>
      ${earned ? `<small class="ms-date">${got[m.id] ? `seit ${shortDate(got[m.id])}` : 'geschafft'}</small>` : `<span class="meter meter-thin"><span style="width:${Math.round((prog / m.p[1]) * 100)}%"></span></span><small class="ms-date">${prog} / ${m.p[1]}</small>`}</span>
    </li>`;
  }).join('')}</ul>`).join('');
  const earnedCount = ms.filter((m) => got[m.id] || m.done).length;

  show(`<section class="progress-page">
    <header class="page-head">
      <p class="eyebrow">${esc(COURSE_NAME)}</p>
      <h1>Fortschritt</h1>
      ${examChip()}
    </header>

    <div class="panel ready-hero">
      <div class="ready-hero-top">
        <span class="ready-big">${pct(ctx.overall)}<small>%</small></span>
        <span><strong>Klausurreife gesamt</strong><span class="muted small">${readinessLabel(ctx.overall)}</span></span>
      </div>
      <span class="meter" role="img" aria-label="${pct(ctx.overall)} Prozent"><span style="width:${pct(ctx.overall)}%"></span></span>
      <div class="stat-tiles">
        <div><strong>${aSicher}<small> / ${aufgaben.length}</small></strong><span>Aufgaben sicher</span></div>
        <div><strong>${counts.sicher}<small> / ${cards.length}</small></strong><span>Karten sicher</span></div>
        <div><strong>${counts.lernend}</strong><span>in Arbeit</span></div>
      </div>
      <p class="muted small">${forecastLine()}</p>
    </div>

    <h2>Klausurreife nach Thema</h2>
    <ul class="panel theme-list">${themeRows}</ul>
    <p class="muted small explain">So wird gerechnet: Sichere Karten zählen voll, Karten in Arbeit je nach Abstand teilweise, neue gar nicht. Rechenaufgaben zählen doppelt. Ab ${pct(THEMA_REIF)} % gilt ein Thema als klausurreif.</p>

    <h2>Lernserie</h2>
    <div class="panel">
      <div class="stat-tiles four">
        <div><strong>${st.current}</strong><span>Tage in Folge</span></div>
        <div><strong>${st.best}</strong><span>Rekord</span></div>
        <div><strong>${ctx.missions}</strong><span>Missionen</span></div>
        <div><strong>${ctx.weeks}</strong><span>Wochenziele</span></div>
      </div>
      ${heatmap(st)}
    </div>

    <h2>Wochen und Einheiten</h2>
    <div class="legend">
      <span><i class="dot dot-safe"></i>${counts.sicher} sicher</span>
      <span><i class="dot dot-learn"></i>${counts.lernend} in Arbeit</span>
      <span><i class="dot dot-new"></i>${counts.neu} neu</span>
    </div>
    ${weekList(false)}

    <h2>Methode erkennen</h2>
    <ul class="panel mini-list">${drillRows}</ul>

    <h2>Eigene Lösungen</h2>
    <div class="panel">
      <p>${checks.length ? `${plural(checks.length, 'Kontrolle', 'Kontrollen')} bei ${plural(checkedTasks, 'Aufgabe', 'Aufgaben')}, davon ${checksOk}-mal mit richtigem Ergebnis.` : 'Noch keine eigene Lösung geprüft. Bei jeder Rechenaufgabe findest du „Eigene Lösung prüfen“.'}</p>
    </div>

    <h2>Meilensteine <span class="h2-count">${earnedCount} / ${ms.length}</span></h2>
    ${badgeHtml}
  </section>`);
}

// ---------------------------------------------------------------------
//  Inhalte
// ---------------------------------------------------------------------

function renderContents() {
  show(`<section>
    <header class="page-head">
      <p class="eyebrow">${esc(COURSE_NAME)}</p>
      <h1>Inhalte</h1>
      <p class="muted">${plural(cards.length, 'Karte', 'Karten')} aus ${plural(weeks.length, 'Woche', 'Wochen')}. Tippe auf eine Einheit, um sie anzusehen oder gezielt zu üben.</p>
    </header>
    ${weekList(true)}
  </section>`);
}

function renderUnit(id) {
  const unit = unitById.get(id);
  if (!unit) { renderContents(); return; }
  const tasks = unit.karten.filter((c) => c.typ === 'aufgabe');
  const all = { revealed: true, tips: 0, steps: 0, picked: null, order: null };
  const list = unit.karten.map((card) => {
    const st = stage(store.cardState(card.id));
    return `<details class="browse-card card-${card.typ}">
      <summary>
        <span class="badge badge-${card.typ}">${TYP_LABEL[card.typ]}</span>
        <span class="browse-q">${fmt(card.frage)}</span>
        <i class="dot dot-${st === 'sicher' ? 'safe' : st === 'lernend' ? 'learn' : 'new'}" title="${st}"></i>
      </summary>
      <div class="browse-body">
        <p class="card-quelle">${esc(card.quelle)}</p>
        ${checkLink(card, 'check-link-inline')}
        ${cardBody(card, all, true)}
      </div>
    </details>`;
  }).join('');

  show(`<section class="unit">
    <a class="back" href="#/inhalte">Alle Inhalte</a>
    <header class="page-head">
      <p class="eyebrow">Woche ${unit.woche} · ${unit.kurz} · ${germanDate(unit.datum)}</p>
      <h1>${esc(unit.titel)}</h1>
      <p class="muted">${fmt(unit.ueberblick)}</p>
    </header>
    <div class="action-row">
      <button class="btn btn-primary" data-action="start-unit" data-unit="${unit.id}">Alle ${plural(unit.karten.length, 'Karte', 'Karten')} üben</button>
      ${tasks.length ? `<button class="btn" data-action="start-unit-tasks" data-unit="${unit.id}">Nur die ${plural(tasks.length, 'Aufgabe', 'Aufgaben')}</button>` : ''}
    </div>
    <p class="muted small">Freies Üben verschiebt den Wiederholungsplan nicht. Nur wenn du „Nochmal“ wählst, kommt die Karte früher wieder.</p>
    <div class="browse-list">${list}</div>
  </section>`);
}

// ---------------------------------------------------------------------
//  Übung: Lösungswege zum Aufdecken während der Übung
// ---------------------------------------------------------------------

const prepUi = new Map(); // card_id -> { tips, steps, result, answer }

function prepState(id) {
  if (!prepUi.has(id)) prepUi.set(id, { tips: 0, steps: 0, result: false, answer: false });
  return prepUi.get(id);
}

function prepButton(action, id, label, cls = '') {
  return `<button class="btn ${cls}" data-action="${action}" data-card="${id}">${label}</button>`;
}

const PREP_STATUS = {
  selbst: { label: 'Selbst gelöst', short: 'Gelöst' },
  hilfe: { label: 'Mit Hilfe', short: 'Mit Hilfe' },
  offen: { label: 'Offen / Frage', short: 'Offen' },
};

/** Status und Frage für die Übung, unter jeder Aufgabe. */
function prepSelfHtml(card) {
  const st = store.prepStatus(card.id);
  const chips = Object.entries(PREP_STATUS).map(([key, v]) => `<button class="prep-status prep-status-${key} ${st === key ? 'is-on' : ''}"
      data-action="prep-status" data-card="${card.id}" data-status="${key}" aria-pressed="${st === key}">${v.label}</button>`).join('');
  return `<div class="prep-self">
    <p class="prep-self-label">Deine Vorbereitung</p>
    ${checkLink(card, 'check-link-inline')}
    <div class="prep-status-row">${chips}</div>
    <label class="prep-note-label">Frage für die Übung
      <textarea class="prep-note" rows="2" data-note="${card.id}" placeholder="z. B. Warum wird hier durch 2 geteilt?">${esc(store.prepNote(card.id))}</textarea>
    </label>
  </div>`;
}

function prepCardHtml(card) {
  const ui = prepState(card.id);
  let tag = card.herkunft ? `<span class="prep-tag prep-tag-${card.herkunft}">${HERKUNFT_KURZ[card.herkunft]}</span>` : '';
  if (card.abgleich) tag = `<span class="prep-tag prep-tag-abgleich-${card.abgleich.status}">${ABGLEICH_LABEL[card.abgleich.status]}</span>`;
  let html = `<article class="card prep-card card-${card.typ}" id="prep-${card.id}">
    <header class="card-head"><span class="prep-nr">Aufgabe ${esc(card.nr || '')}</span>${tag}<span class="card-quelle">${esc(card.thema)}</span></header>
    <div class="frage">${fmt(card.frage)}</div>`;
  if (card.plot) html += plotSVG(card.plot);

  if (card.typ === 'verstaendnis') {
    if (ui.answer) {
      html += `<div class="antwort"><p class="prep-answer">${fmt(card.optionen[card.richtig])}</p>${fmt(card.erklaerung)}</div>${abgleichHtml(card)}${originHtml(card)}`;
      html += `<div class="prep-actions">${prepButton('prep-reset', card.id, 'Zuklappen', 'btn-quiet')}</div>`;
    } else {
      html += `<div class="prep-actions">${prepButton('prep-answer', card.id, 'Antwort zeigen', 'btn-primary')}</div>`;
    }
    return `${html}${prepSelfHtml(card)}</article>`;
  }

  const tips = card.tipps || [];
  const total = (card.schritte || []).length;
  const done = ui.steps >= total;
  html += tipsHtml(card, ui.tips);
  if (ui.steps > 0) html += `<div class="solution"><h3>Lösungsweg</h3>${stepsHtml(card, ui.steps)}</div>`;
  if (done) html += solutionEndHtml(card);
  else if (ui.result) html += resultHtml(card);

  const buttons = [];
  if (!done) {
    if (ui.tips < tips.length) buttons.push(prepButton('prep-tip', card.id, `Tipp ${ui.tips + 1}/${tips.length}`));
    buttons.push(prepButton('prep-step', card.id, ui.steps === 0 ? 'Ersten Schritt zeigen' : `Nächster Schritt ${ui.steps + 1}/${total}`, 'btn-primary'));
    if (!ui.result) buttons.push(prepButton('prep-result', card.id, 'Nur Ergebnis'));
    buttons.push(prepButton('prep-all', card.id, 'Alles zeigen', 'btn-quiet'));
  }
  if (ui.tips || ui.steps || ui.result) buttons.push(prepButton('prep-reset', card.id, 'Zuklappen', 'btn-quiet'));
  return `${html}<div class="prep-actions">${buttons.join('')}</div>${prepSelfHtml(card)}</article>`;
}

function prepChanged(id, scrollToEnd) {
  if (currentRoute().name === 'live') liveRefresh(scrollToEnd);
  else rerenderPrepCard(id);
}

function rerenderPrepCard(id) {
  const el = document.getElementById(`prep-${id}`);
  const card = cardById.get(id);
  if (!el || !card) return;
  el.outerHTML = prepCardHtml(card);
  typeset(document.getElementById(`prep-${id}`));
}

function prepDates(unit) {
  const today = dateStr();
  return (unit.besprechung || []).map((d) => (d === today ? `${shortDate(d)} (heute)` : shortDate(d))).join(' · ');
}

function prepProgress(unit) {
  const tasks = unit.karten.filter((c) => c.teil);
  const counts = { selbst: 0, hilfe: 0, offen: 0 };
  for (const c of tasks) { const st = store.prepStatus(c.id); if (st) counts[st] += 1; }
  return { total: tasks.length, done: counts.selbst + counts.hilfe + counts.offen, ...counts };
}

function abgleichSummary(unit) {
  const tasks = unit.karten.filter((c) => c.teil);
  const done = tasks.filter((c) => c.abgleich).length;
  if (!tasks.length) return '';
  return done
    ? `<p class="muted small">${done} von ${tasks.length} Aufgaben mit der Übung abgeglichen</p>`
    : '<p class="muted small">Noch nicht mit der Übung abgeglichen. Schick Claude nach der Übung Fotos von Musterlösung und deiner Lösung.</p>';
}

function prepHeadStats(unit) {
  const pr = prepProgress(unit);
  if (!pr.total) return '';
  const pct = Math.round((pr.done / pr.total) * 100);
  return `<div class="prep-progress">
    <div class="prep-progress-top"><strong>${pr.done} von ${pr.total} vorbereitet</strong>
      <span class="muted small">${pr.selbst} gelöst · ${pr.hilfe} mit Hilfe · ${pr.offen} offen</span></div>
    <div class="streak-bar"><span style="width:${pct}%"></span></div>
  </div>`;
}

function renderPrep(id) {
  const unit = unitById.get(id) || nextUebung(dateStr());
  if (!unit) {
    show(`<section><header class="page-head"><p class="eyebrow">${esc(COURSE_NAME)}</p><h1>Übung</h1>
      <p class="muted">Noch keine Übungsaufgaben eingetragen.</p></header></section>`);
    return;
  }
  const next = nextUebung(dateStr());
  const chips = uebungen.map((u) => `<a class="chip chip-link ${u.id === unit.id ? 'is-current' : ''}" href="#/uebung/${u.id}"
      ${u.id === unit.id ? 'aria-current="page"' : ''}>Blatt ${u.nummer}${next && u.id === next.id ? ' · als Nächstes' : ''}</a>`).join('');

  const sections = ['besprechung', 'praesenz'].map((teil) => {
    const tasks = unit.karten.filter((c) => c.teil === teil);
    if (!tasks.length) {
      return teil === 'praesenz'
        ? `<h2>${TEIL_LABEL[teil]}</h2><p class="muted small">Für dieses Blatt sind noch keine Präsenzaufgaben eingetragen.</p>`
        : '';
    }
    return `<h2>${TEIL_LABEL[teil]}</h2><div class="prep-list">${tasks.map(prepCardHtml).join('')}</div>`;
  }).join('');

  show(`<section class="prep">
    <header class="page-head">
      <p class="eyebrow">${esc(COURSE_NAME)}</p>
      <h1>Übung</h1>
      <p class="muted">Vorher: jede Aufgabe selbst rechnen, dann markieren, wie es lief, und Fragen notieren. In der Übung: Live-Modus öffnen und Schritt für Schritt mitgehen.</p>
    </header>
    <nav class="chip-row" aria-label="Übungsblatt wählen">${chips}</nav>
    <div class="panel prep-head">
      <p class="prep-title">Übungsblatt ${unit.nummer}: ${esc(unit.titel)}</p>
      ${unit.besprechung?.length ? `<p class="muted small">Besprechung ${prepDates(unit)}</p>` : ''}
      ${prepHeadStats(unit)}
      ${abgleichSummary(unit)}
      <a class="btn btn-primary btn-wide" href="#/live/${unit.id}">Live-Modus für die Übung</a>
      <p class="muted small">Eine Aufgabe nach der anderen, große Knöpfe, der Bildschirm bleibt an. Gedacht zum Mitrechnen während der Besprechung.</p>
      <a class="small" href="#/inhalte/${unit.id}">Alle Karten dieses Blatts</a>
    </div>
    ${sections}
  </section>`);
  view.querySelector('.chip-row .is-current')?.scrollIntoView({ inline: 'center', block: 'nearest' });
}

function prepTeaser() {
  const today = dateStr();
  const unit = nextUebung(today);
  if (!unit?.besprechung?.length) return '';
  const date = unit.besprechung.find((d) => d >= today);
  if (!date || daysBetween(today, date) > 7) return '';
  const pr = prepProgress(unit);
  const diff = daysBetween(today, date);
  const when = diff === 0 ? 'heute' : diff === 1 ? 'morgen' : shortDate(date);
  return `<a class="panel prep-teaser" href="#/${diff === 0 ? 'live' : 'uebung'}/${unit.id}">
    <span><strong>Übung ${when}</strong><span class="muted"> · Blatt ${unit.nummer}, ${pr.done} von ${plural(pr.total, 'Aufgabe', 'Aufgaben')} vorbereitet${diff === 0 ? ' · Live-Modus öffnen' : ''}</span></span>
    <span class="prep-teaser-go" aria-hidden="true">›</span>
  </a>`;
}

// ---------------------------------------------------------------------
//  Live-Modus: eine Aufgabe nach der anderen, während der Übung
// ---------------------------------------------------------------------

const live = { unit: null, i: 0, lock: null };

function liveTasks(unit) {
  return [...unit.karten.filter((c) => c.teil === 'besprechung'), ...unit.karten.filter((c) => c.teil === 'praesenz')];
}

async function keepScreenOn(on) {
  try {
    if (on && !live.lock && navigator.wakeLock && document.visibilityState === 'visible') {
      live.lock = await navigator.wakeLock.request('screen');
      live.lock.addEventListener?.('release', () => { live.lock = null; });
    } else if (!on && live.lock) {
      await live.lock.release();
      live.lock = null;
    }
  } catch { /* nicht unterstützt oder abgelehnt: dann eben ohne */ }
}

function renderLive(id) {
  const unit = unitById.get(id) || nextUebung(dateStr());
  const tasks = unit ? liveTasks(unit) : [];
  if (!tasks.length) { location.replace(`#/uebung/${unit?.id || ''}`); return; }
  if (live.unit !== unit.id) { live.unit = unit.id; live.i = 0; }
  live.i = Math.max(0, Math.min(live.i, tasks.length - 1));
  document.body.classList.add('in-session', 'in-live');
  keepScreenOn(true);

  const card = tasks[live.i];
  const ui = prepState(card.id);
  const total = (card.schritte || []).length;
  const tips = card.tipps || [];
  const isMc = card.typ === 'verstaendnis';
  const done = isMc ? ui.answer : ui.steps >= total;
  const st = store.prepStatus(card.id);
  const note = store.prepNote(card.id);
  const teilLabel = card.teil === 'praesenz' ? 'Präsenzaufgabe' : 'Aufgabe';

  let body = `<div class="frage">${fmt(card.frage)}</div>`;
  if (card.plot) body += plotSVG(card.plot);
  if (st || note) {
    body += `<div class="live-mine">${st ? `<span class="prep-status prep-status-${st} is-on">${PREP_STATUS[st].label}</span>` : ''}
      ${note ? `<p><span class="merke-label">Deine Frage</span>${esc(note)}</p>` : ''}</div>`;
  }
  if (isMc) {
    if (ui.answer) body += `<div class="antwort"><p class="prep-answer">${fmt(card.optionen[card.richtig])}</p>${fmt(card.erklaerung)}</div>${abgleichHtml(card)}`;
  } else {
    body += tipsHtml(card, ui.tips);
    if (ui.steps > 0) body += `<div class="solution"><h3>Lösungsweg · Schritt ${Math.min(ui.steps, total)} von ${total}</h3>${stepsHtml(card, ui.steps)}</div>`;
    if (done) body += solutionEndHtml(card);
    else if (ui.result) body += resultHtml(card);
  }

  let main;
  if (isMc) {
    main = ui.answer ? '' : prepButton('prep-answer', card.id, 'Antwort zeigen', 'btn-primary live-main');
  } else if (!done) {
    main = prepButton('prep-step', card.id, ui.steps === 0 ? 'Ersten Schritt zeigen' : `Nächster Schritt (${ui.steps + 1}/${total})`, 'btn-primary live-main');
  } else {
    main = live.i + 1 < tasks.length ? '<button class="btn btn-primary live-main" data-action="live-next">Nächste Aufgabe ›</button>' : '';
  }
  const extra = [];
  if (!isMc && !done && ui.tips < tips.length) extra.push(prepButton('prep-tip', card.id, `Tipp ${ui.tips + 1}/${tips.length}`));
  if (!isMc && !done && !ui.result) extra.push(prepButton('prep-result', card.id, 'Ergebnis'));
  if (!isMc && !done) extra.push(prepButton('prep-all', card.id, 'Alles'));
  if (ui.tips || ui.steps || ui.result || ui.answer) extra.push(prepButton('prep-reset', card.id, 'Zurücksetzen', 'btn-quiet'));

  const dots = tasks.map((t, k) => `<button class="live-dot ${k === live.i ? 'is-current' : ''} ${store.prepStatus(t.id) ? `is-${store.prepStatus(t.id)}` : ''}"
      data-action="live-go" data-i="${k}" aria-label="${esc(t.teil === 'praesenz' ? 'Präsenzaufgabe' : 'Aufgabe')} ${esc(t.nr || '')}">${esc(t.nr || k + 1)}</button>`).join('');

  show(`<section class="live">
    <div class="session-bar">
      <a class="session-close" href="#/uebung/${unit.id}">Beenden</a>
      <span class="live-title">Blatt ${unit.nummer} · ${live.i + 1} / ${tasks.length}</span>
    </div>
    <nav class="live-dots" aria-label="Aufgabe wählen">${dots}</nav>
    <article class="card prep-card card-${card.typ}" id="prep-${card.id}">
      <header class="card-head"><span class="prep-nr">${teilLabel} ${esc(card.nr || '')}</span>
        ${card.herkunft ? `<span class="prep-tag prep-tag-${card.herkunft}">${HERKUNFT_KURZ[card.herkunft]}</span>` : ''}
        <span class="card-quelle">${esc(card.thema)}</span></header>
      ${body}
    </article>
    <div class="live-bar">
      ${extra.length ? `<div class="live-extra">${extra.join('')}</div>` : ''}
      ${main}
      <div class="live-nav">
        <button class="btn btn-quiet" data-action="live-prev" ${live.i === 0 ? 'disabled' : ''}>‹ Vorige</button>
        <button class="btn btn-quiet" data-action="live-next" ${live.i + 1 >= tasks.length ? 'disabled' : ''}>Nächste ›</button>
      </div>
    </div>
  </section>`);
}

function liveRefresh(scrollToEnd) {
  const y = window.scrollY;
  renderLive(live.unit);
  if (scrollToEnd) {
    const steps = view.querySelectorAll('.steps li, .result, .tip');
    steps[steps.length - 1]?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  } else window.scrollTo(0, y);
}

// ---------------------------------------------------------------------
//  Eigene Lösung prüfen: Foto der handschriftlichen Rechnung und
//  Schritt-für-Schritt-Vergleich mit dem Lösungsweg
// ---------------------------------------------------------------------

const MARKS = {
  gleich: { label: 'Wie hier', icon: '✓' },
  anders: { label: 'Anders, aber richtig', icon: '≈' },
  fehlt: { label: 'Fehlt / falsch', icon: '✗' },
};
let check = null; // { id, phase: 'foto' | 'vergleich' | 'fertig', marks: {}, result, photos: [], urls: [], rated }

function checkLink(card, cls = 'btn btn-quiet') {
  return card.typ === 'aufgabe' ? `<a class="${cls} check-link" href="#/pruefen/${card.id}">Eigene Lösung prüfen</a>` : '';
}

async function loadCheckPhotos() {
  const list = await photos.photosFor(check.id);
  check.urls.forEach((u) => URL.revokeObjectURL(u));
  check.photos = list;
  check.urls = list.map((e) => URL.createObjectURL(e.blob));
}

async function openCheck(id) {
  if (check?.id !== id) check = { id, phase: 'foto', marks: {}, result: null, photos: [], urls: [], rated: false };
  renderCheck();
  await loadCheckPhotos();
  if (currentRoute().name === 'pruefen' && check.id === id) {
    if (check.photos.length && check.phase === 'foto') check.phase = 'vergleich';
    renderCheck();
  }
}

function checkSummary(card) {
  const steps = card.schritte || [];
  const counts = { gleich: 0, anders: 0, fehlt: 0, offen: 0 };
  steps.forEach((_, i) => { counts[check.marks[i] || 'offen'] += 1; });
  return { ...counts, total: steps.length };
}

function checkPhotosHtml() {
  if (!check.photos.length) return '<p class="muted small">Noch kein Foto. Es bleibt nur auf diesem Gerät gespeichert.</p>';
  return `<div class="check-photos">${check.photos.map((p, i) => `<figure class="check-photo">
      <button class="check-photo-open" data-action="check-zoom" data-i="${i}" aria-label="Foto ${i + 1} groß anzeigen"><img src="${check.urls[i]}" alt="Foto deiner Lösung, Seite ${i + 1}"></button>
      <button class="check-photo-del" data-action="check-del" data-id="${p.id}" aria-label="Foto ${i + 1} löschen">✕</button>
    </figure>`).join('')}</div>`;
}

function checkHistoryHtml(card) {
  const list = store.checksFor(card.id);
  const fb = card.rueckmeldung || [];
  let html = '';
  if (list.length) {
    html += `<h2>Bisherige Kontrollen</h2><ul class="check-history">${list.slice().reverse().map((c) => `<li>
      <span class="check-badge check-badge-${c.result === 'richtig' ? 'ok' : 'bad'}">${c.result === 'richtig' ? 'Ergebnis richtig' : 'Ergebnis falsch'}</span>
      <span>${shortDate(c.d)} · ${c.gleich + c.anders} von ${c.of} Schritten${c.fehlt ? `, ${c.fehlt} fehlten` : ''}</span></li>`).join('')}</ul>`;
  }
  if (fb.length) {
    html += `<h2>Rückmeldung von Claude</h2>${fb.map((f) => `<div class="abgleich abgleich-ergaenzt"><span class="abgleich-label">Deine Lösung · ${shortDate(f.datum)}</span>${fmt(f.text)}</div>`).join('')}`;
  }
  return html;
}

function renderCheck() {
  const card = cardById.get(check.id);
  if (!card || card.typ !== 'aufgabe') { location.replace('#/inhalte'); return; }
  const unit = card.unit;
  const title = card.teil ? `${unit.kurz}, ${card.teil === 'praesenz' ? 'Präsenzaufgabe' : 'Aufgabe'} ${card.nr}` : `${unit.kurz} · ${card.quelle}`;
  const steps = card.schritte || [];
  const sum = checkSummary(card);
  let body = '';

  // 1) Aufgabe und Foto
  body += `<section class="panel check-step">
    <p class="check-step-label">1 · Selbst rechnen</p>
    <p class="muted small">Rechne die Aufgabe vollständig auf Papier, wie in der Klausur: jeden Schritt aufschreiben.</p>
  </section>
  <section class="panel check-step">
    <p class="check-step-label">2 · Foto deiner Lösung</p>
    ${checkPhotosHtml()}
    <label class="btn btn-wide check-add">
      <input type="file" accept="image/*" data-action="check-file" hidden multiple>
      ${check.photos.length ? 'Weitere Seite hinzufügen' : 'Foto aufnehmen oder auswählen'}
    </label>
    ${check.phase === 'foto' ? `<div class="action-row">
      <button class="btn btn-primary" data-action="check-start" ${check.photos.length ? '' : 'disabled'}>Vergleichen</button>
      <button class="btn btn-quiet" data-action="check-start">Ohne Foto vergleichen</button>
    </div>` : ''}
  </section>`;

  // 2) Vergleich
  if (check.phase !== 'foto') {
    body += `<section class="panel check-step">
      <p class="check-step-label">3 · Schritt für Schritt vergleichen</p>
      <p class="muted small">Tippe bei jedem Schritt an, ob er bei dir genauso, anders (aber richtig) oder gar nicht bzw. falsch vorkommt. Mit dem Foto oben kannst du jederzeit nachsehen.</p>
      <ol class="steps check-steps">${steps.map((st, i) => {
        const m = check.marks[i];
        const btns = Object.entries(MARKS).map(([k, v]) => `<button class="check-mark check-mark-${k} ${m === k ? 'is-on' : ''}" data-action="check-mark" data-i="${i}" data-m="${k}" aria-pressed="${m === k}" ${check.phase === 'fertig' ? 'disabled' : ''}><span aria-hidden="true">${v.icon}</span> ${v.label}</button>`).join('');
        return `<li class="${m ? `is-${m}` : ''}"><div class="step-text">${fmt(st.t)}</div>${st.w ? `<div class="step-why">${fmt(st.w)}</div>` : ''}${st.q ? `<div class="step-source"><span class="step-source-label">Woher?</span>${fmt(st.q)}</div>` : ''}
          <div class="check-marks">${btns}</div></li>`;
      }).join('')}</ol>
      ${resultHtml(card)}
      <p class="check-q">Stimmt dein Endergebnis?</p>
      <div class="check-marks">
        <button class="check-mark check-mark-gleich ${check.result === 'richtig' ? 'is-on' : ''}" data-action="check-result" data-r="richtig" ${check.phase === 'fertig' ? 'disabled' : ''}>✓ Ja</button>
        <button class="check-mark check-mark-fehlt ${check.result === 'falsch' ? 'is-on' : ''}" data-action="check-result" data-r="falsch" ${check.phase === 'fertig' ? 'disabled' : ''}>✗ Nein</button>
      </div>
      ${card.fehler?.length ? `<div class="pitfalls"><h3>Typische Fehler, nach denen du schauen kannst</h3><ul>${card.fehler.map((f) => `<li>${fmt(f)}</li>`).join('')}</ul></div>` : ''}
      ${check.phase === 'vergleich' ? `<button class="btn btn-primary btn-wide" data-action="check-finish" ${check.result ? '' : 'disabled'}>Auswerten${sum.offen ? ` (${sum.offen} ${sum.offen === 1 ? 'Schritt' : 'Schritte'} nicht markiert)` : ''}</button>` : ''}
    </section>`;
  }

  // 3) Auswertung
  if (check.phase === 'fertig') {
    const good = check.result === 'richtig';
    const verdict = good && !sum.fehlt ? 'Sehr gut: Ergebnis richtig, kein Schritt fehlt.'
      : good ? `Ergebnis richtig, aber ${plural(sum.fehlt, 'Schritt fehlt', 'Schritte fehlen')} oder ${sum.fehlt === 1 ? 'ist' : 'sind'} falsch. In der Klausur kostet das Punkte.`
        : 'Ergebnis falsch. Schau dir die rot markierten Schritte und die typischen Fehler an.';
    const suggest = good && !sum.fehlt ? GOOD : good ? HARD : AGAIN;
    body += `<section class="panel check-step check-result ${good && !sum.fehlt ? 'is-good' : good ? 'is-mid' : 'is-bad'}">
      <p class="check-step-label">4 · Auswertung</p>
      <p class="check-verdict">${verdict}</p>
      <p class="muted small">${sum.gleich} wie im Lösungsweg · ${sum.anders} anders, aber richtig · ${sum.fehlt} fehlt oder falsch${sum.offen ? ` · ${sum.offen} nicht markiert` : ''}</p>
      ${check.rated ? '<p class="streak-note is-done">Gespeichert. Die Karte ist neu eingeplant.</p>' : `<p class="rating-q">Wie soll die Aufgabe eingeplant werden? (Vorschlag: ${RATING_LABELS[suggest]})</p>${ratingButtons(card).replace(/data-action="rate"/g, 'data-action="check-rate"').replace(`rate-${suggest}"`, `rate-${suggest} is-suggested"`)}`}
      <div class="action-row check-share">
        <button class="btn" data-action="check-share">Für Claude teilen</button>
        <button class="btn btn-quiet" data-action="check-again">Nochmal vergleichen</button>
      </div>
      <p class="muted small">„Für Claude teilen“ öffnet das Teilen-Menü mit deinen Fotos und einem kurzen Text. Schick beides im Chat, dann prüfe ich deine Lösung genauer und trage die Rückmeldung hier ein.</p>
    </section>`;
  }

  show(`<section class="check">
    <button class="back back-btn" data-action="check-back">Zurück</button>
    <header class="page-head">
      <p class="eyebrow">Eigene Lösung prüfen · ${esc(title)}</p>
      <h1 class="check-title">${esc(card.thema)}</h1>
    </header>
    <article class="card card-aufgabe">
      <div class="frage">${fmt(card.frage)}</div>
      ${card.plot ? plotSVG(card.plot) : ''}
    </article>
    ${body}
    ${checkHistoryHtml(card)}
  </section>`);
}

function zoomPhoto(i) {
  const url = check.urls[i];
  if (!url) return;
  const el = document.createElement('div');
  el.className = 'check-zoom';
  el.innerHTML = `<button class="check-zoom-close" aria-label="Schließen">✕</button><div class="check-zoom-inner"><img src="${url}" alt="Foto deiner Lösung"></div>`;
  el.addEventListener('click', (e) => { if (e.target === el || e.target.closest('.check-zoom-close')) el.remove(); });
  document.body.append(el);
}

async function shareForClaude() {
  const card = cardById.get(check.id);
  const sum = checkSummary(card);
  const where = card.teil ? `${card.unit.kurz}, ${card.teil === 'praesenz' ? 'Präsenzaufgabe' : 'Aufgabe'} ${card.nr}` : `${card.unit.kurz}, ${card.quelle}`;
  const text = `Bitte prüfe meine Lösung (Mathe-Tool, ${where}, ID ${card.id}). `
    + `Meine Selbstkontrolle: Ergebnis ${check.result === 'richtig' ? 'richtig' : 'falsch'}, ${sum.gleich} Schritte wie im Lösungsweg, ${sum.anders} anders, ${sum.fehlt} fehlen oder falsch.`;
  const files = check.photos.map((p, i) => new File([p.blob], `${card.id}-seite${i + 1}.jpg`, { type: 'image/jpeg' }));
  try {
    if (navigator.canShare?.({ files }) && files.length) {
      await navigator.share({ files, text, title: 'Meine Lösung' });
      return;
    }
  } catch (err) {
    if (err?.name === 'AbortError') return;
  }
  // Ersatz: Fotos herunterladen und Text kopieren
  files.forEach((f) => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(f);
    a.download = f.name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  });
  try { await navigator.clipboard.writeText(text); } catch { /* egal */ }
  window.alert(`${files.length ? 'Die Fotos wurden heruntergeladen. ' : ''}Der Text für Claude ist kopiert:\n\n${text}`);
}

// ---------------------------------------------------------------------
//  Methode erkennen (Schnelltraining)
// ---------------------------------------------------------------------

const DRILL_LEN = 10;
const aufgabeById = new Map(AUFGABEN.map((a) => [a.id, a]));
const gruppeById = new Map(GRUPPEN.map((g) => [g.id, g]));
let drill = null;
let drillFilter = 'alle';

function drillPool() {
  return drillFilter === 'alle' ? AUFGABEN : AUFGABEN.filter((a) => a.g === drillFilter);
}

/** Gewichtete Auswahl: oft falsch beantwortete und neue Aufgaben kommen häufiger. */
function pickDrill(pool, n) {
  const stats = store.drillStats();
  const weighted = pool.map((a) => {
    const [right = 0, wrong = 0] = stats[a.id] || [];
    const w = (right + wrong === 0 ? 3 : 1) + 3 * wrong - 0.5 * right;
    return { a, w: Math.max(0.3, w) };
  });
  const out = [];
  while (out.length < n && weighted.length) {
    const total = weighted.reduce((sum, x) => sum + x.w, 0);
    let roll = Math.random() * total;
    const idx = weighted.findIndex((x) => (roll -= x.w) <= 0);
    out.push(weighted.splice(idx === -1 ? weighted.length - 1 : idx, 1)[0].a.id);
  }
  return out;
}

function drillOptions(item) {
  const group = gruppeById.get(item.g);
  const others = group.methoden.filter((m) => m !== item.m && !(item.auch || []).includes(m));
  const pick = shuffled(others.length).slice(0, 3).map((i) => others[i]);
  const all = [item.m, ...pick];
  return shuffled(all.length).map((i) => all[i]);
}

function startDrill(n = DRILL_LEN, mission = false) {
  const ids = pickDrill(drillPool(), n);
  if (!ids.length) return;
  drill = { ids, i: 0, picked: null, options: drillOptions(aufgabeById.get(ids[0])), right: 0, missed: [], start: Date.now(), mission };
  renderDrill();
  window.scrollTo(0, 0);
}

function drillStatsSummary(pool) {
  const stats = store.drillStats();
  let right = 0;
  let total = 0;
  for (const a of pool) {
    const [r = 0, w = 0] = stats[a.id] || [];
    right += r;
    total += r + w;
  }
  return { right, total };
}

function renderDrillStart() {
  document.body.classList.remove('in-session');
  const chips = [{ id: 'alle', titel: 'Alle' }, ...GRUPPEN].map((g) => {
    const n = g.id === 'alle' ? AUFGABEN.length : AUFGABEN.filter((a) => a.g === g.id).length;
    return `<button class="chip ${drillFilter === g.id ? 'is-current' : ''}" data-action="drill-filter" data-g="${g.id}">${esc(g.titel)} <span>${n}</span></button>`;
  }).join('');
  const pool = drillPool();
  const { right, total } = drillStatsSummary(pool);
  const stats = store.drillStats();
  const weak = pool
    .filter((a) => (stats[a.id]?.[1] || 0) > 0)
    .sort((a, b) => stats[b.id][1] - stats[a.id][1])
    .slice(0, 3);
  show(`<section class="drill">
    <a class="back" href="#/">Heute</a>
    <header class="page-head">
      <p class="eyebrow">Schnelltraining</p>
      <h1>Methode erkennen</h1>
      <p class="muted">Du siehst nur die Aufgabe und wählst, wie man sie angeht. Nicht rechnen, nur entscheiden. ${DRILL_LEN} Aufgaben dauern etwa zwei Minuten.</p>
    </header>
    <nav class="chip-row" aria-label="Thema wählen">${chips}</nav>
    <button class="btn btn-primary btn-wide" data-action="drill-start">${Math.min(DRILL_LEN, pool.length)} Aufgaben starten</button>
    ${total ? `<p class="muted small drill-stat">Bisher ${right} von ${total} Antworten richtig (${Math.round((right / total) * 100)} %).</p>` : ''}
    ${weak.length ? `<h2>Schwachstellen</h2><div class="panel"><ul class="weak-list">${weak.map((a) => `<li>${fmt(a.a)}<small>richtig wäre: ${fmt(METHODEN[a.m])}</small></li>`).join('')}</ul></div>` : ''}
  </section>`);
}

function renderDrill() {
  if (!drill) { renderDrillStart(); return; }
  document.body.classList.add('in-session');
  if (drill.i >= drill.ids.length) {
    const secs = Math.round((Date.now() - drill.start) / 1000);
    const time = `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`;
    const missed = drill.missed.map((id) => aufgabeById.get(id));
    if (drill.mission) {
      show(missionSummary(`Methode erkennen: ${drill.right} von ${drill.ids.length} richtig in ${time} Minuten.`));
      return;
    }
    show(`<section class="summary drill-summary">
      <h1>${drill.right} von ${drill.ids.length} richtig</h1>
      <p class="summary-main">in ${time} Minuten</p>
      ${streakNote()}
      ${missed.length ? `<div class="panel drill-missed"><h2>Noch einmal anschauen</h2><ul class="weak-list">${missed.map((a) => `<li>${fmt(a.a)}<small>${fmt(METHODEN[a.m])}</small></li>`).join('')}</ul></div>`
        : '<p class="muted">Alles richtig erkannt.</p>'}
      <div class="action-row">
        <button class="btn btn-primary" data-action="drill-start">Nochmal ${DRILL_LEN}</button>
        <button class="btn" data-action="drill-exit">Zur Übersicht</button>
      </div>
    </section>`);
    return;
  }
  const item = aufgabeById.get(drill.ids[drill.i]);
  const answered = drill.picked !== null;
  const pct = Math.round((drill.i / drill.ids.length) * 100);
  const options = drill.options.map((m, k) => {
    let cls = 'option';
    if (answered && m === item.m) cls += ' is-right';
    else if (answered && drill.picked === m) cls += ' is-wrong';
    return `<button class="${cls}" data-action="drill-pick" data-m="${m}" ${answered ? 'disabled' : ''}><span class="option-key">${k + 1}</span>${fmt(METHODEN[m])}</button>`;
  }).join('');
  let feedback = '';
  if (answered) {
    feedback = `${drill.picked === item.m ? '<p class="verdict verdict-right">Richtig.</p>' : '<p class="verdict verdict-wrong">Nicht ganz. Die passende Methode ist markiert.</p>'}
      <div class="antwort"><span class="merke-label">Woran erkennt man das?</span>${fmt(item.w)}</div>
      <div class="step-source"><span class="step-source-label">Woher?</span>${fmt(item.q)}</div>`;
  }
  show(`<section class="session drill-run">
    <div class="session-bar">
      <button class="session-close" data-action="drill-exit">Beenden</button>
      <div class="session-progress" role="progressbar" aria-valuemin="0" aria-valuemax="${drill.ids.length}" aria-valuenow="${drill.i}"><span style="width:${pct}%"></span></div>
      <span class="session-count">${drill.i + 1} / ${drill.ids.length}</span>
    </div>
    <article class="card card-verfahren">
      <header class="card-head"><span class="badge badge-verfahren">${esc(item.f || 'Welche Methode passt?')}</span><span class="card-quelle">${esc(gruppeById.get(item.g).titel)}</span></header>
      <div class="frage">${fmt(item.a)}</div>
      <div class="options">${options}</div>
      ${feedback}
    </article>
    <div class="actions">${answered ? `<button class="btn btn-primary btn-wide" data-action="drill-next">${drill.i + 1 < drill.ids.length ? 'Weiter' : 'Auswertung'}</button>` : ''}</div>
  </section>`);
}

function drillTeaser() {
  return `<a class="panel prep-teaser drill-teaser" href="#/methoden">
    <span><strong>Zwischendurch: Methode erkennen</strong><span class="muted"> · ${DRILL_LEN} Aufgaben, ca. 2 Minuten</span></span>
    <span class="prep-teaser-go" aria-hidden="true">›</span>
  </a>`;
}

// ---------------------------------------------------------------------
//  Formelblatt
// ---------------------------------------------------------------------

function renderSheet() {
  const chosen = sheetItems.filter((i) => store.sheetSelected(i)).length;
  const groups = weeks.flatMap((w) => w.einheiten).filter((u) => u.formelblatt?.length).map((u) => `
    <section class="sheet-group ${u.formelblatt.some((i) => store.sheetSelected(i)) ? 'has-on' : ''}">
      <h3>${u.kurz} <span>${esc(u.titel)}</span></h3>
      ${u.formelblatt.map((item) => `<label class="sheet-item ${store.sheetSelected(item) ? 'is-on' : ''}">
        <input type="checkbox" data-action="sheet-toggle" data-id="${item.id}" ${store.sheetSelected(item) ? 'checked' : ''}>
        <span class="sheet-text"><strong>${fmt(item.titel)}</strong>${fmt(item.inhalt)}</span>
      </label>`).join('')}
    </section>`).join('');

  show(`<section class="sheet">
    <header class="page-head">
      <p class="eyebrow">${esc(COURSE_NAME)}</p>
      <h1>Formelblatt</h1>
      <p class="muted">In der Klausur ist ein beidseitig beschriebenes A4-Blatt erlaubt. Hier sammelst du, was draufkommt. Mit jeder neuen Woche kommen Vorschläge dazu.</p>
    </header>
    <div class="action-row sheet-tools">
      <span class="chip">${chosen} von ${sheetItems.length} ausgewählt</span>
      <button class="btn" data-action="print">Auswahl drucken</button>
    </div>
    ${groups}
  </section>`);
}

// ---------------------------------------------------------------------
//  Einstellungen
// ---------------------------------------------------------------------

function syncBlock() {
  const s = sync.status();
  if (!s.configured) {
    return `<p>Noch nicht eingerichtet. Dein Lernstand wird im Moment nur in diesem Browser gespeichert.</p>
      <p class="muted small">Sobald die Supabase-Zugangsdaten in <code>config.js</code> stehen, kannst du dich hier anmelden. Der Lernstand ist dann auf allen Geräten gleich.</p>`;
  }
  if (!s.signedIn) {
    return `<form class="login" data-form="login">
        <label>E-Mail<input type="email" name="email" autocomplete="username" required></label>
        <label>Passwort<input type="password" name="password" autocomplete="current-password" required></label>
        <button class="btn btn-primary" type="submit">Anmelden</button>
        <p class="form-error" id="login-error" role="alert">${esc(s.lastError)}</p>
      </form>
      <p class="muted small">Ohne Anmeldung bleibt dein Lernstand nur in diesem Browser.</p>`;
  }
  const state = s.phase === 'syncing' ? 'Abgleich läuft …'
    : s.phase === 'error' ? `Fehler: ${esc(s.lastError)}`
      : s.lastSync ? `Zuletzt abgeglichen um ${s.lastSync.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} Uhr`
        : 'Angemeldet';
  return `<p>Angemeldet als <strong>${esc(s.email)}</strong></p>
    <p class="muted small ${s.phase === 'error' ? 'form-error' : ''}">${state}${store.hasUnsynced() && s.phase !== 'syncing' ? ' · Es gibt noch nicht hochgeladene Änderungen.' : ''}</p>
    <div class="action-row">
      <button class="btn" data-action="sync-now">Jetzt abgleichen</button>
      <button class="btn btn-quiet" data-action="sign-out">Abmelden</button>
    </div>`;
}

function renderSettings() {
  const s = store.settings();
  show(`<section class="settings">
    <header class="page-head">
      <p class="eyebrow">${esc(COURSE_NAME)}</p>
      <h1>Einstellungen</h1>
    </header>

    <h2>Klausur und Lernpensum</h2>
    <div class="panel form">
      <label>Klausurtermin
        <input type="date" data-setting="examDate" value="${esc(s.examDate)}">
      </label>
      <label>Neue Karten pro Tag
        <input type="number" inputmode="numeric" min="0" max="100" data-setting="newPerDay" value="${Number(s.newPerDay)}">
      </label>
      <p class="muted small">Fällige Wiederholungen kommen immer alle dran. Das Limit gilt nur für Karten, die du zum ersten Mal siehst.</p>
      <label>Tagesziel für die Lernserie
        <input type="number" inputmode="numeric" min="1" max="200" data-setting="dailyGoal" value="${Number(s.dailyGoal || DEFAULT_GOAL)}">
      </label>
      <p class="muted small">Ein Tag zählt für die Serie, wenn du die Tagesmission schaffst oder so viele Fragen beantwortest. Es zählen alle beantworteten Karten und Antworten bei „Methode erkennen“. Eine Änderung gilt auch für die zurückliegenden Tage.</p>
      <label>Wochenziel (Lerntage pro Woche)
        <input type="number" inputmode="numeric" min="1" max="7" data-setting="weekGoal" value="${Number(s.weekGoal || DEFAULT_WEEK_GOAL)}">
      </label>
      <p class="muted small">Pro Woche überbrückt ein Joker automatisch einen verpassten Tag, damit die Serie nicht reißt.</p>
    </div>

    <h2>Anmeldung und Abgleich</h2>
    <div class="panel" id="sync-block">${syncBlock()}</div>

    <h2>Daten</h2>
    <div class="panel">
      <p class="muted small">Setzt alle Karten auf „neu“ zurück und löscht Einstellungen und Formelblatt-Auswahl${sync.status().signedIn ? ', auch in der Datenbank' : ''}.</p>
      <button class="btn btn-danger" data-action="reset">Lernstand zurücksetzen</button>
    </div>
  </section>`);
}

// ---------------------------------------------------------------------
//  Navigation
// ---------------------------------------------------------------------

function currentRoute() {
  const [name = '', arg = ''] = location.hash.replace(/^#\/?/, '').split('/');
  return { name, arg };
}

function route() {
  const { name, arg } = currentRoute();
  document.body.classList.remove('in-session', 'in-live');
  if (name !== 'live') keepScreenOn(false);
  document.querySelectorAll('.tabs a').forEach((a) => {
    const target = a.getAttribute('href').replace(/^#\/?/, '');
    a.classList.toggle('is-active', target === name);
    if (target === name) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });

  if (name === 'lernen') {
    if (session) renderSession();
    else location.replace('#/');
    return;
  }
  session = null;
  if (name === 'inhalte' && arg) renderUnit(arg);
  else if (name === 'inhalte') renderContents();
  else if (name === 'uebung') renderPrep(arg);
  else if (name === 'live') renderLive(arg);
  else if (name === 'pruefen') openCheck(arg);
  else if (name === 'methoden') renderDrill();
  else if (name === 'fortschritt') renderProgress();
  else if (name === 'formelblatt') renderSheet();
  else if (name === 'einstellungen') renderSettings();
  else renderHome();
  window.scrollTo(0, 0);
}

// ---------------------------------------------------------------------
//  Klicks und Eingaben
// ---------------------------------------------------------------------

const actions = {
  'start-today': () => {
    const plan = todayPlan();
    startSession([...plan.due, ...plan.fresh], 'heute', 'Heute');
  },
  'start-extra': () => {
    const fresh = cards.filter((c) => isNew(store.cardState(c.id))).slice(0, 10);
    startSession(fresh, 'heute', 'Neue Karten');
  },
  'mission-go': () => {
    const next = missionState().steps.find((x) => !x.done);
    if (next) startMissionPart(next.id);
  },
  'mission-part': (el) => startMissionPart(el.dataset.part),
  'start-thema': (el) => {
    const t = themaById.get(el.dataset.thema);
    const today = dateStr();
    const order = (c) => {
      const st = stateOf(c.id);
      if (isDue(st, today)) return 0;
      if (stage(st) === 'lernend') return 1;
      if (isNew(st)) return 2;
      return 3;
    };
    const list = [...t.karten].sort((a, b) => order(a) - order(b) || cardReadiness(stateOf(a.id), today) - cardReadiness(stateOf(b.id), today)).slice(0, 15);
    startSession(list, 'thema', t.titel);
  },
  'start-weak': () => {
    const weak = cards.filter((c) => (store.cardState(c.id)?.lapses || 0) > 0);
    startSession(weak, 'schwachstellen', 'Schwachstellen');
  },
  'start-unit': (el) => {
    const unit = unitById.get(el.dataset.unit);
    startSession(unit.karten, 'einheit', unit.kurz);
  },
  'start-unit-tasks': (el) => {
    const unit = unitById.get(el.dataset.unit);
    startSession(unit.karten.filter((c) => c.typ === 'aufgabe'), 'einheit', unit.kurz);
  },
  reveal: () => { session.ui.revealed = true; renderSession(); },
  tip: () => { session.ui.tips += 1; renderSession(); },
  step: () => { session.ui.steps += 1; renderSession(); },
  'steps-all': () => { session.ui.steps = Infinity; renderSession(); },
  pick: (el) => {
    if (session.ui.picked !== null) return;
    session.ui.picked = Number(el.dataset.i);
    renderSession();
  },
  rate: (el) => rateCurrent(Number(el.dataset.r)),
  'check-back': () => { if (history.length > 1) history.back(); else location.hash = `#/inhalte/${cardById.get(check.id).unit.id}`; },
  'check-start': () => { check.phase = 'vergleich'; renderCheck(); document.querySelector('.check-steps')?.scrollIntoView({ block: 'start', behavior: 'smooth' }); },
  'check-mark': (el) => {
    const i = Number(el.dataset.i);
    check.marks[i] = check.marks[i] === el.dataset.m ? undefined : el.dataset.m;
    const y = window.scrollY; renderCheck(); window.scrollTo(0, y);
  },
  'check-result': (el) => { check.result = el.dataset.r; const y = window.scrollY; renderCheck(); window.scrollTo(0, y); },
  'check-finish': () => {
    const card = cardById.get(check.id);
    const sum = checkSummary(card);
    store.addCheck(card.id, { d: dateStr(), gleich: sum.gleich, anders: sum.anders, fehlt: sum.fehlt, of: sum.total, result: check.result });
    check.phase = 'fertig';
    renderCheck();
    document.querySelector('.check-result')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  },
  'check-rate': (el) => {
    store.rate(check.id, Number(el.dataset.r), 'selbstkontrolle');
    store.countPart('a');
    check.rated = true;
    const y = window.scrollY; renderCheck(); window.scrollTo(0, y);
  },
  'check-again': () => { Object.assign(check, { phase: 'vergleich', marks: {}, result: null, rated: false }); renderCheck(); },
  'check-share': () => shareForClaude(),
  'check-zoom': (el) => zoomPhoto(Number(el.dataset.i)),
  'check-del': async (el) => {
    if (!window.confirm('Dieses Foto löschen?')) return;
    await photos.deletePhoto(el.dataset.id);
    await loadCheckPhotos();
    renderCheck();
  },
  'drill-filter': (el) => { drillFilter = el.dataset.g; renderDrillStart(); },
  'drill-start': () => startDrill(),
  'drill-pick': (el) => {
    if (drill.picked !== null) return;
    const item = aufgabeById.get(drill.ids[drill.i]);
    drill.picked = el.dataset.m;
    const ok = drill.picked === item.m;
    if (ok) drill.right += 1;
    else drill.missed.push(item.id);
    store.recordDrill(item.id, ok);
    store.countPart('m');
    renderDrill();
  },
  'drill-next': () => {
    drill.i += 1;
    drill.picked = null;
    if (drill.i < drill.ids.length) drill.options = drillOptions(aufgabeById.get(drill.ids[drill.i]));
    renderDrill();
    window.scrollTo(0, 0);
  },
  'drill-exit': () => {
    const wasMission = drill?.mission;
    drill = null;
    if (wasMission) location.hash = '#/';
    else { renderDrillStart(); window.scrollTo(0, 0); }
  },
  'prep-tip': (el) => { prepState(el.dataset.card).tips += 1; prepChanged(el.dataset.card, true); },
  'prep-step': (el) => { prepState(el.dataset.card).steps += 1; prepChanged(el.dataset.card, true); },
  'prep-result': (el) => { prepState(el.dataset.card).result = true; prepChanged(el.dataset.card, true); },
  'prep-all': (el) => {
    const card = cardById.get(el.dataset.card);
    Object.assign(prepState(card.id), { steps: card.schritte.length, result: true });
    prepChanged(card.id, false);
  },
  'prep-answer': (el) => { prepState(el.dataset.card).answer = true; prepChanged(el.dataset.card, true); },
  'prep-reset': (el) => {
    prepUi.delete(el.dataset.card);
    prepChanged(el.dataset.card, false);
    document.getElementById(`prep-${el.dataset.card}`)?.scrollIntoView({ block: 'nearest' });
  },
  'prep-status': (el) => {
    const id = el.dataset.card;
    store.setPrepStatus(id, store.prepStatus(id) === el.dataset.status ? '' : el.dataset.status);
    rerenderPrepCard(id);
    const unit = cardById.get(id)?.unit;
    const head = document.querySelector('.prep-progress');
    if (head && unit) { head.outerHTML = prepHeadStats(unit); }
  },
  'live-next': () => { live.i += 1; renderLive(live.unit); window.scrollTo(0, 0); },
  'live-prev': () => { live.i -= 1; renderLive(live.unit); window.scrollTo(0, 0); },
  'live-go': (el) => { live.i = Number(el.dataset.i); renderLive(live.unit); window.scrollTo(0, 0); },
  print: () => window.print(),
  'sync-now': () => sync.syncNow(),
  'sign-out': () => sync.signOut(),
  reset: async () => {
    if (!window.confirm('Wirklich den gesamten Lernstand löschen? Das lässt sich nicht rückgängig machen.')) return;
    try {
      await sync.wipeRemote();
    } catch (err) {
      window.alert(`Die Daten in der Datenbank konnten nicht gelöscht werden: ${err.message}`);
      return;
    }
    store.resetAll();
    route();
  },
};

document.addEventListener('click', (event) => {
  const el = event.target.closest('[data-action]');
  if (!el || el.tagName === 'INPUT') return;
  const fn = actions[el.dataset.action];
  if (fn) fn(el);
});

document.addEventListener('change', async (event) => {
  const el = event.target;
  if (el.dataset.action === 'check-file' && check) {
    const files = [...(el.files || [])];
    if (!files.length) return;
    el.closest('label')?.classList.add('is-busy');
    for (const f of files) await photos.addPhoto(check.id, f);
    await loadCheckPhotos();
    renderCheck();
    return;
  }
  if (el.dataset.action === 'sheet-toggle') {
    store.setSheetSelected(el.dataset.id, el.checked);
    renderSheet();
  }
  if (el.dataset.setting === 'examDate') store.setSettings({ examDate: el.value });
  if (el.dataset.setting === 'dailyGoal') {
    const n = Math.max(1, Math.min(200, Math.round(Number(el.value) || DEFAULT_GOAL)));
    el.value = n;
    store.setSettings({ dailyGoal: n });
  }
  if (el.dataset.setting === 'weekGoal') {
    const n = Math.max(1, Math.min(7, Math.round(Number(el.value) || DEFAULT_WEEK_GOAL)));
    el.value = n;
    store.setSettings({ weekGoal: n });
  }
  if (el.dataset.setting === 'newPerDay') {
    const n = Math.max(0, Math.min(100, Math.round(Number(el.value) || 0)));
    el.value = n;
    store.setSettings({ newPerDay: n });
  }
});

let noteTimer = null;
document.addEventListener('input', (event) => {
  const el = event.target;
  if (!el.dataset?.note) return;
  clearTimeout(noteTimer);
  noteTimer = setTimeout(() => store.setPrepNote(el.dataset.note, el.value), 600);
});
document.addEventListener('focusout', (event) => {
  const el = event.target;
  if (!el.dataset?.note) return;
  clearTimeout(noteTimer);
  if (store.prepNote(el.dataset.note) !== el.value) store.setPrepNote(el.dataset.note, el.value);
});

document.addEventListener('submit', async (event) => {
  const form = event.target;
  if (form.dataset.form !== 'login') return;
  event.preventDefault();
  const button = form.querySelector('button');
  const error = form.querySelector('#login-error');
  button.disabled = true;
  error.textContent = '';
  try {
    await sync.signIn(form.email.value.trim(), form.password.value);
  } catch (err) {
    error.textContent = err.message;
    button.disabled = false;
  }
});

// Tastatur: Leertaste deckt auf, 1 bis 4 bewerten
document.addEventListener('keydown', (event) => {
  if (currentRoute().name === 'live' && !event.target.closest('input, textarea, select')) {
    const map = { ' ': '.live-main', Enter: '.live-main', ArrowRight: '[data-action="live-next"]', ArrowLeft: '[data-action="live-prev"]' };
    const btn = map[event.key] && view.querySelector(map[event.key]);
    if (btn && !btn.disabled) { event.preventDefault(); btn.click(); }
    return;
  }
  if (currentRoute().name === 'methoden' && drill && !event.target.closest('input, textarea, select')) {
    const sel = /^[1-4]$/.test(event.key) ? `[data-action="drill-pick"]:nth-child(${event.key})`
      : (event.key === 'Enter' || event.key === ' ') ? '[data-action="drill-next"]' : null;
    const btn = sel && view.querySelector(sel);
    if (btn) { event.preventDefault(); btn.click(); }
    return;
  }
  if (!session || session.finished || currentRoute().name !== 'lernen') return;
  if (event.target.closest('input, textarea, select') || event.metaKey || event.ctrlKey || event.altKey) return;
  if (event.key === ' ' || event.key === 'Enter') {
    const btn = view.querySelector('[data-action="reveal"], [data-action="step"]');
    if (btn) { event.preventDefault(); btn.click(); }
  } else if (/^[1-4]$/.test(event.key)) {
    const btn = view.querySelector(`[data-action="rate"][data-r="${event.key}"]`);
    if (btn) { event.preventDefault(); btn.click(); }
  }
});

window.addEventListener('hashchange', route);
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && currentRoute().name === 'live') keepScreenOn(true);
});

// Wenn der Abgleich neue Daten bringt, die sichtbare Übersicht auffrischen
let lastPhase = 'idle';
sync.onStatus(() => {
  const { name } = currentRoute();
  const s = sync.status();
  if (name === 'einstellungen') {
    const block = document.getElementById('sync-block');
    const typing = block?.contains(document.activeElement) && document.activeElement.tagName === 'INPUT';
    if (block && !(typing && !s.signedIn)) block.innerHTML = syncBlock();
  }
  if (lastPhase === 'syncing' && s.phase === 'idle' && (name === '' || name === 'inhalte' || name === 'formelblatt' || name === 'fortschritt')) route();
  lastPhase = s.phase;
});

store.load();
route();
store.onChange(watchProgress);
watchProgress();
sync.init();
