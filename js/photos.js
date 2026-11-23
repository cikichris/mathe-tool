// =====================================================================
//  Fotos eigener Lösungen
//
//  Die Bilder bleiben auf diesem Gerät (IndexedDB im Browser). Sie werden
//  verkleinert gespeichert und nicht zu Supabase hochgeladen.
// =====================================================================

const DB_NAME = 'mathe-tool-fotos';
const STORE = 'fotos';
const MAX_SIDE = 1600;

let dbPromise = null;
const memory = new Map(); // Ersatz, falls IndexedDB nicht verfügbar ist (privater Modus)

function openDb() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve) => {
    try {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => {
        const os = req.result.createObjectStore(STORE, { keyPath: 'id' });
        os.createIndex('card', 'card');
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
  return dbPromise;
}

function tx(db, mode) {
  return db.transaction(STORE, mode).objectStore(STORE);
}

function done(req) {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

/** Verkleinert ein Foto auf höchstens 1600 px Kantenlänge (JPEG). */
async function shrink(file) {
  try {
    const url = URL.createObjectURL(file);
    const img = await new Promise((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = reject;
      el.src = url;
    });
    const scale = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(img.naturalWidth * scale);
    canvas.height = Math.round(img.naturalHeight * scale);
    canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(url);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.82));
    return blob || file;
  } catch {
    return file;
  }
}

export async function addPhoto(cardId, file) {
  const blob = await shrink(file);
  const entry = { id: `${cardId}:${Date.now()}:${Math.random().toString(36).slice(2, 7)}`, card: cardId, blob, at: Date.now() };
  const db = await openDb();
  if (!db) {
    memory.set(entry.id, entry);
    return entry;
  }
  await done(tx(db, 'readwrite').put(entry));
  return entry;
}

export async function photosFor(cardId) {
  const db = await openDb();
  if (!db) return [...memory.values()].filter((e) => e.card === cardId).sort((a, b) => a.at - b.at);
  const list = await done(tx(db, 'readonly').index('card').getAll(cardId));
  return list.sort((a, b) => a.at - b.at);
}

export async function deletePhoto(id) {
  memory.delete(id);
  const db = await openDb();
  if (db) await done(tx(db, 'readwrite').delete(id));
}

/** Alle Aufgaben-IDs, zu denen Fotos gespeichert sind. */
export async function cardsWithPhotos() {
  const db = await openDb();
  const all = db ? await done(tx(db, 'readonly').getAll()) : [...memory.values()];
  return new Set(all.map((e) => e.card));
}
