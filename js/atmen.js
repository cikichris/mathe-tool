// =====================================================================
//  Atemübungen gegen Prüfungsstress
//
//  Ein Muster ist eine Folge von Phasen [Art, Sekunden].
//  breathAt() sagt für eine vergangene Zeit, wo man gerade ist.
// =====================================================================

export const MUSTER = {
  ruhig: {
    titel: '4 ein · 6 aus',
    kurz: 'Beruhigend',
    text: 'Längeres Ausatmen bremst den Puls und beruhigt. Gut gegen Nervosität vor und in Prüfungen.',
    phasen: [['ein', 4], ['aus', 6]],
  },
  gleich: {
    titel: '4 ein · 4 aus',
    kurz: 'Gleichmäßig',
    text: 'Ruhiger, gleichmäßiger Rhythmus. Ein guter Einstieg, wenn du Atemübungen noch nicht gewohnt bist.',
    phasen: [['ein', 4], ['aus', 4]],
  },
  box: {
    titel: '4 · 4 · 4 · 4',
    kurz: 'Box-Atmung',
    text: 'Einatmen, halten, ausatmen, halten, je 4 Sekunden. Hilft, den Kopf frei zu bekommen und sich zu konzentrieren.',
    phasen: [['ein', 4], ['halten', 4], ['aus', 4], ['leer', 4]],
  },
  '478': {
    titel: '4 · 7 · 8',
    kurz: 'Tief entspannen',
    text: '4 Sekunden ein, 7 halten, 8 aus. Wirkt stark entspannend, eher für längere Pausen oder am Abend.',
    phasen: [['ein', 4], ['halten', 7], ['aus', 8]],
  },
};

export const PHASE_TEXT = { ein: 'Einatmen', aus: 'Ausatmen', halten: 'Halten', leer: 'Halten' };

export const cycleSeconds = (m) => MUSTER[m].phasen.reduce((a, [, s]) => a + s, 0);

/** Position im Muster nach ms Millisekunden. */
export function breathAt(m, ms) {
  const phasen = MUSTER[m].phasen;
  const cyc = cycleSeconds(m) * 1000;
  const cycle = Math.floor(ms / cyc);
  let t = ms - cycle * cyc;
  for (let i = 0; i < phasen.length; i += 1) {
    const [art, sec] = phasen[i];
    if (t < sec * 1000) {
      return { art, index: i, sec, left: Math.ceil((sec * 1000 - t) / 1000), progress: t / (sec * 1000), cycle };
    }
    t -= sec * 1000;
  }
  const [art, sec] = phasen[phasen.length - 1];
  return { art, index: phasen.length - 1, sec, left: 0, progress: 1, cycle };
}
