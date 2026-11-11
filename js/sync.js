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
let timer = null;
let running = null;
const listeners = new Set();

const emit = () => listeners.forEach((cb) => cb());

export function onStatus(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function status() {
  return { configured, email: user?.email || '', signedIn: Boolean(user), phase, lastSync, lastError };
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

  client.auth.onAuthStateChange((_event, session) => {
    const before = user?.id;
    user = session?.user || null;
    emit();
    // Nicht direkt im Callback auf Supabase zugreifen, sonst blockiert der Client.
    if (user && user.id !== before) setTimeout(() => syncNow(), 0);
  });

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
  if (error) {
    throw new Error(error.message === 'Invalid login credentials'
      ? 'E-Mail oder Passwort stimmt nicht.'
      : error.message);
  }
}

export async function signOut() {
  if (client) await client.auth.signOut();
}

async function fetchAll(table) {
  const rows = [];
  const page = 1000;
  for (let from = 0; ; from += page) {
    const { data, error } = await client.from(table).select('*').range(from, from + page - 1);
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
