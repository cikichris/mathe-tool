// =====================================================================
//  Abgleich mit Supabase (Login + Lernstand auf allen Geräten)
//
//  Ohne Einträge in config.js passiert hier nichts.
// =====================================================================
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '../config.js';
import * as store from './store.js';

const SUPABASE_JS = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.117.3/+esm';

export const configured = Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY);

let client = null;
let user = null;
let phase = 'idle';      // 'idle' | 'syncing' | 'error'
let lastSync = null;
let lastError = '';
let notice = '';         // Hinweis nach Registrierung, Passwort-Mail usw.
let recovery = false;    // über den Link „Passwort zurücksetzen“ gekommen
let ready = false;       // Anmeldestatus ist bekannt
let timer = null;
let running = null;
const listeners = new Set();

const emit = () => listeners.forEach((cb) => cb());

export function onStatus(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function status() {
  return { configured, email: user?.email || '', signedIn: Boolean(user), phase, lastSync, lastError, notice, recovery, ready };
}

export function setNotice(text, error = '') {
  notice = text;
  lastError = error;
  emit();
}

/** Adresse der App ohne #-Teil: dorthin führen die Links in den E-Mails. */
function appUrl() {
  return `${location.origin}${location.pathname}`;
}

export async function init() {
  if (!configured) return;
  try {
    const { createClient } = await import(SUPABASE_JS);
    client = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: { persistSession: true, autoRefreshToken: true },
    });
  } catch (err) {
    phase = 'error';
    lastError = 'Supabase konnte nicht geladen werden (kein Netz?).';
    emit();
    return;
  }

  client.auth.onAuthStateChange((event, session) => {
    const before = user?.id;
    user = session?.user || null;
    if (event === 'PASSWORD_RECOVERY') recovery = true;
    if (!user) recovery = false;
    // Lernstand eines anderen Kontos in diesem Browser nicht vermischen
    if (user && user.id !== before && store.adoptOwner(user.id)) {
      notice = 'Der Lernstand des vorherigen Kontos wurde auf diesem Gerät entfernt. Er liegt weiterhin in dessen Konto.';
    }
    emit();
    // Nicht direkt im Callback auf Supabase zugreifen, sonst blockiert der Client.
    if (user && user.id !== before) setTimeout(() => syncNow(), 0);
  });
  // Wartet, bis eine Anmeldung aus einem E-Mail-Link (#access_token=…) verarbeitet ist
  await client.auth.getSession();
  ready = true;
  emit();

  // Nach jeder Änderung kurz warten und dann hochladen
  store.onChange(() => {
    if (!user || !store.hasUnsynced()) return;
    clearTimeout(timer);
    timer = setTimeout(() => syncNow(), 2500);
  });
  globalThis.addEventListener?.('online', () => syncNow());
  globalThis.document?.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') syncNow();
  });
}

export async function signIn(email, password) {
  if (!client) throw new Error('Supabase ist nicht eingerichtet.');
  const { error } = await client.auth.signInWithPassword({ email, password });
  if (error) throw new Error(authError(error));
}

const AUTH_ERRORS = [
  [/invalid login credentials/i, 'E-Mail oder Passwort stimmt nicht.'],
  [/email not confirmed/i, 'Die E-Mail-Adresse ist noch nicht bestätigt. Bitte klick zuerst auf den Link in der E-Mail.'],
  [/at least (\d+) characters/i, (m) => `Das Passwort braucht mindestens ${m[1]} Zeichen.`],
  [/signups? not allowed|signup is disabled/i, 'Registrieren ist im Moment ausgeschaltet.'],
  [/rate limit|too many requests|for security purposes/i, 'Zu viele Versuche in kurzer Zeit. Bitte in ein paar Minuten nochmal.'],
  [/already registered/i, 'Für diese E-Mail gibt es schon ein Konto. Melde dich an.'],
  [/invalid.*email|unable to validate email/i, 'Diese E-Mail-Adresse ist ungültig.'],
  [/same.*password|different from the old/i, 'Das neue Passwort muss sich vom alten unterscheiden.'],
  [/weak password|password.*weak/i, 'Das Passwort ist zu schwach. Nimm ein längeres.'],
];

function authError(error) {
  const msg = error?.message || 'Unbekannter Fehler.';
  for (const [re, text] of AUTH_ERRORS) {
    const m = msg.match(re);
    if (m) return typeof text === 'function' ? text(m) : text;
  }
  return msg;
}

export async function signUp(email, password) {
  if (!client) throw new Error('Supabase ist nicht eingerichtet.');
  const { data, error } = await client.auth.signUp({ email, password, options: { emailRedirectTo: appUrl() } });
  if (error) throw new Error(authError(error));
  if (data.session) return 'angemeldet';
  // Supabase verrät aus Datenschutzgründen nicht direkt, ob es die Adresse schon gibt
  if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) return 'vorhanden';
  return 'bestaetigen';
}

export async function sendReset(email) {
  if (!client) throw new Error('Supabase ist nicht eingerichtet.');
  const { error } = await client.auth.resetPasswordForEmail(email, { redirectTo: appUrl() });
  if (error) throw new Error(authError(error));
}

export async function setPassword(password) {
  if (!client) throw new Error('Supabase ist nicht eingerichtet.');
  const { error } = await client.auth.updateUser({ password });
  if (error) throw new Error(authError(error));
  recovery = false;
  emit();
}

export async function signOut() {
  if (!client) return;
  // Letzte Änderungen noch hochladen, bevor der Login weg ist
  try { await syncNow(); } catch { /* egal */ }
  await client.auth.signOut();
  notice = '';
  emit();
}

async function fetchAll(table, columns = '*') {
  const rows = [];
  const page = 1000;
  for (let from = 0; ; from += page) {
    const { data, error } = await client.from(table).select(columns).range(from, from + page - 1);
    if (error) throw error;
    rows.push(...data);
    if (data.length < page) break;
  }
  return rows;
}

/** Holt den Stand aus der Datenbank und lädt lokale Änderungen hoch. */
export function syncNow() {
  if (!client || !user) return Promise.resolve();
  if (running) return running;
  running = (async () => {
    phase = 'syncing';
    emit();
    try {
      const [cards, userData] = await Promise.all([fetchAll('card_state'), fetchAll('user_data')]);
      store.applyRemote({ cards, userData });
      if (!store.activityBackfilled()) {
        // Einmalig: Lerntage aus dem bisherigen Verlauf übernehmen
        const history = await fetchAll('reviews', 'reviewed_at');
        store.backfillActivity(history.map((r) => r.reviewed_at));
      }

      const box = store.outbox();
      const uid = user.id;
      if (box.cards.length) {
        const { error } = await client.from('card_state')
          .upsert(box.cards.map((r) => ({ ...r, user_id: uid })), { onConflict: 'user_id,card_id' });
        if (error) throw error;
      }
      if (box.reviews.length) {
        const { error } = await client.from('reviews')
          .upsert(box.reviews.map((r) => ({ ...r, user_id: uid })), { onConflict: 'id', ignoreDuplicates: true });
        if (error) throw error;
      }
      if (box.userData.length) {
        const { error } = await client.from('user_data')
          .upsert(box.userData.map((r) => ({ ...r, user_id: uid })), { onConflict: 'user_id,key' });
        if (error) throw error;
      }
      store.markPushed(box);
      phase = 'idle';
      lastSync = new Date();
      lastError = '';
    } catch (err) {
      phase = 'error';
      lastError = /relation .* does not exist|schema cache/i.test(err?.message || '')
        ? 'Die Datenbank-Tabellen fehlen noch. Bitte supabase/schema.sql ausführen.'
        : (err?.message || 'Abgleich fehlgeschlagen.');
    } finally {
      running = null;
      emit();
    }
  })();
  return running;
}

/** Löscht den gesamten Lernstand des angemeldeten Nutzers in der Datenbank. */
export async function wipeRemote() {
  if (!client || !user) return;
  clearTimeout(timer);
  if (running) await running;
  for (const table of ['card_state', 'reviews', 'user_data']) {
    const { error } = await client.from(table).delete().eq('user_id', user.id);
    if (error) throw error;
  }
}
