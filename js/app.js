// =====================================================================
//  Mathe-Tool: Oberfläche
//
//  Ansichten (über den Teil hinter # in der Adresse):
//    #/                 Heute (Abfrage starten, Fortschritt)
//    #/lernen           laufende Abfrage
//    #/inhalte          alle Wochen und Einheiten
//    #/inhalte/vl01     eine Einheit mit allen Karten
//    #/formelblatt      Formelblatt-Builder
//    #/einstellungen    Klausurtermin, Login, Daten
// =====================================================================
import * as store from './store.js';
import * as sync from './sync.js';
import { weeks, cards, cardById, unitById, sheetItems, TYP_LABEL, HERKUNFT_LABEL } from './content.js';
import { fmt, esc, typeset } from './render.js';
import { plotSVG } from './plot.js';
import {
  AGAIN, HARD, GOOD, EASY, RATING_LABELS,
  dateStr, daysBetween, isNew, isDue, stage, schedule, intervalLabel,
} from './srs.js';
import { COURSE_NAME } from '../config.js';

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

function solutionHtml(card, stepsShown) {
  const steps = card.schritte || [];
  const all = stepsShown >= steps.length;
  let html = '<div class="solution"><h3>Lösungsweg</h3><ol class="steps">';
  steps.slice(0, stepsShown).forEach((s) => {
    html += `<li><div class="step-text">${fmt(s.t)}</div>${s.w ? `<div class="step-why">${fmt(s.w)}</div>` : ''}</li>`;
  });
  html += '</ol>';
  if (!all) {
    html += `<div class="step-actions">
      <button class="btn" data-action="step">Nächster Schritt (${stepsShown + 1}/${steps.length})</button>
      <button class="btn btn-quiet" data-action="steps-all">Alle zeigen</button>
    </div></div>`;
    return html;
  }
  if (card.plotLoesung) html += plotSVG(card.plotLoesung);
  html += `<div class="result"><span class="result-label">Ergebnis</span>${fmt(card.ergebnis)}</div>`;
  if (card.fehler?.length) {
    html += `<div class="pitfalls"><h3>Typische Fehler</h3><ul>${card.fehler.map((f) => `<li>${fmt(f)}</li>`).join('')}</ul></div>`;
  }
  const rezept = card.rezept && cardById.get(card.rezept);
  if (rezept) {
    html += `<details class="recipe"><summary>Rezept für diesen Aufgabentyp</summary>
      <p class="recipe-q">${fmt(rezept.frage)}</p>${fmt(rezept.antwort)}</details>`;
  }
  if (card.herkunft) html += `<p class="origin origin-${card.herkunft}">${esc(HERKUNFT_LABEL[card.herkunft])}</p>`;
  html += '</div>';
  return html;
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
      html += `<div class="antwort">${fmt(card.erklaerung)}</div>`;
      if (card.herkunft === 'claude' || card.herkunft === 'zusatz') html += `<p class="origin origin-${card.herkunft}">${esc(HERKUNFT_LABEL[card.herkunft])}</p>`;
    }
    return html;
  }

  // Aufgabe
  const tips = card.tipps || [];
  const tipsShown = browse ? tips.length : ui.tips;
  if (!browse && !ui.revealed && tipsShown === 0) {
    html += '<p class="hint-paper">Rechne die Aufgabe zuerst selbst auf Papier. Wenn du hängst, hol dir einen Tipp.</p>';
  }
  if (tipsShown > 0) {
    html += '<div class="tips">';
    tips.slice(0, tipsShown).forEach((t, i) => {
      html += `<div class="tip"><span class="tip-label">Tipp ${i + 1}</span>${fmt(t)}</div>`;
    });
    html += '</div>';
  }
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
  if (ui.revealed) return `<p class="rating-q">Wie lief die Aufgabe?</p>${ratingButtons(card)}`;
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
    show(`<section class="summary">
      <h1>Geschafft</h1>
      <p class="summary-main">${plural(session.done, 'Karte', 'Karten')} bearbeitet${session.again ? `, ${session.again}-mal „Nochmal“` : ''}.</p>
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
  store.rate(id, rating, session.mode);
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

function renderHome() {
  const plan = todayPlan();
  const n = plan.due.length + plan.fresh.length;
  const counts = stageCounts(cards);
  const weak = cards
    .filter((c) => (store.cardState(c.id)?.lapses || 0) > 0)
    .sort((a, b) => store.cardState(b.id).lapses - store.cardState(a.id).lapses)
    .slice(0, 5);

  let today;
  if (n) {
    today = `<div class="today-numbers">
        <div><strong>${plan.due.length}</strong><span>${plan.due.length === 1 ? 'Wiederholung' : 'Wiederholungen'}</span></div>
        <div><strong>${plan.fresh.length}</strong><span>${plan.fresh.length === 1 ? 'neue Karte' : 'neue Karten'}</span></div>
      </div>
      <button class="btn btn-primary btn-wide" data-action="start-today">Abfrage starten</button>`;
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
    <div class="panel today">${today}</div>

    <h2>Fortschritt</h2>
    <div class="legend">
      <span><i class="dot dot-safe"></i>${counts.sicher} sicher</span>
      <span><i class="dot dot-learn"></i>${counts.lernend} in Arbeit</span>
      <span><i class="dot dot-new"></i>${counts.neu} neu</span>
    </div>
    ${weekList(false)}

    ${weak.length ? `<h2>Schwachstellen</h2>
      <div class="panel">
        <ul class="weak-list">${weak.map((c) => `<li><span class="badge badge-${c.typ}">${TYP_LABEL[c.typ]}</span> ${fmt(c.frage.split('\n')[0])}<small>${store.cardState(c.id).lapses}-mal nicht gewusst</small></li>`).join('')}</ul>
        <button class="btn btn-wide" data-action="start-weak">Schwachstellen üben</button>
      </div>` : ''}
    ${store.isMemoryOnly() ? '<p class="warn">Dieser Browser erlaubt kein Speichern (privater Modus?). Dein Lernstand geht beim Schließen verloren.</p>' : ''}
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
//  Formelblatt
// ---------------------------------------------------------------------

function renderSheet() {
  const chosen = sheetItems.filter((i) => store.sheetSelected(i)).length;
  const groups = weeks.flatMap((w) => w.einheiten).filter((u) => u.formelblatt?.length).map((u) => `
    <section class="sheet-group">
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
  document.body.classList.remove('in-session');
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

document.addEventListener('change', (event) => {
  const el = event.target;
  if (el.dataset.action === 'sheet-toggle') {
    store.setSheetSelected(el.dataset.id, el.checked);
    renderSheet();
  }
  if (el.dataset.setting === 'examDate') store.setSettings({ examDate: el.value });
  if (el.dataset.setting === 'newPerDay') {
    const n = Math.max(0, Math.min(100, Math.round(Number(el.value) || 0)));
    el.value = n;
    store.setSettings({ newPerDay: n });
  }
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
  if (lastPhase === 'syncing' && s.phase === 'idle' && (name === '' || name === 'inhalte' || name === 'formelblatt')) route();
  lastPhase = s.phase;
});

store.load();
route();
sync.init();
