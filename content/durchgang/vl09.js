// Vorlesung 9 (09.11.2026) durchgehen: Sinus, Cosinus, Tangens als Funktionen
const r = String.raw;

export default {
  unit: 'vl09',
  abschnitte: [
    {
      id: 'vl09-d01',
      folien: '4–5',
      titel: 'Vom Einheitskreis zum Funktionsgraphen',
      folie: r`**Achtung:** Als Funktionen werden Winkel grundsätzlich im **Bogenmaß** angegeben.

Folie 5: Einheitskreis links, leeres Koordinatensystem rechts.`,
      notizen: [
        { t: r`Am Einheitskreis ist der Winkel $\frac{\pi}{4}$ eingezeichnet. Der Punkt auf dem Kreis hat die Höhe $\sin\left(\frac{\pi}{4}\right)$.`, w: r`Am Einheitskreis ist die y-Koordinate des Punktes der Sinus, die x-Koordinate der Cosinus.` },
        { t: r`Die Höhe wird waagerecht (gestrichelt) nach rechts übertragen und über $x = \frac{\pi}{4}$ eingetragen.`, w: r`So entsteht Punkt für Punkt der Sinusgraph: Winkel auf die x-Achse, Höhe am Kreis als y-Wert.` },
        { t: r`Für viele Winkel ergibt sich die türkise Kurve $\sin(x)$: Nullstellen bei $0, \pm\pi, \pm 2\pi$, Hochpunkte bei $\frac{\pi}{2}, \dots$`, w: r`` },
        { t: r`Ebenso die lila Kurve $\cos(x)$: Höhe 1 bei $x = 0$, Nullstellen bei $\pm\frac{\pi}{2}, \pm\frac{3\pi}{2}, \dots$`, w: r`Hier wird die x-Koordinate des Kreispunkts als Höhe genommen.` },
      ],
      plot: {
        x: [-6.5, 8], y: [-1.4, 1.4], pi: true, piEvery: 2,
        fns: [{ f: Math.sin }, { f: Math.cos }],
        labels: [{ at: [7.4, 1.2], text: 'sin' }, { at: [6.6, -1.2], text: 'cos' }],
        alt: 'Sinus- und Cosinusgraph',
      },
      kern: r`$\sin(x)$ ist die Höhe, $\cos(x)$ die waagerechte Koordinate des Punktes am Einheitskreis zum Winkel $x$ (im Bogenmaß).`,
      karten: ['vl09-bogenmass-achtung', 'vl09-einheitskreis'],
    },
    {
      id: 'vl09-d02',
      folien: '6–8',
      titel: 'Sinus- und Cosinusfunktion, wichtige Werte',
      folie: r`$\sin: \mathbb{R} \to \mathbb{R}$ ordnet jeder Zahl $x$ (als Winkel im Bogenmaß) den Wert $\sin(x)$ zu, $\cos$ entsprechend $\cos(x)$.

Folie 8: Tabelle der wichtigen Werte bei $0, \frac{\pi}{6}, \frac{\pi}{4}, \frac{\pi}{3}, \frac{\pi}{2}$.`,
      kern: r`Merkhilfe für die Tabelle: $\sin$ bei $0, \frac{\pi}{6}, \frac{\pi}{4}, \frac{\pi}{3}, \frac{\pi}{2}$ ist $\frac{\sqrt{0}}{2}, \frac{\sqrt{1}}{2}, \frac{\sqrt{2}}{2}, \frac{\sqrt{3}}{2}, \frac{\sqrt{4}}{2}$. Beim Cosinus dieselbe Reihe rückwärts.`,
      check: { frage: r`$\cos\left(\frac{\pi}{3}\right) = ?$`, antwort: r`$\frac{1}{2}$ (Reihe rückwärts: $\frac{\sqrt{4}}{2}, \frac{\sqrt{3}}{2}, \frac{\sqrt{2}}{2}, \frac{\sqrt{1}}{2}, \frac{\sqrt{0}}{2}$).` },
      karten: ['vl09-werte', 'vl09-werte-mc'],
    },
    {
      id: 'vl09-d03',
      folien: '9–10',
      titel: 'Graphen, Periode und Verschiebung',
      folie: r`Graphen von $\sin(x)$ und $\cos(x)$ untereinander.

Periodisch mit Periodenlänge $p$: $f(x + p) = f(x)$ für alle $x$.`,
      notizen: [
        { t: r`Unter dem Sinusgraph markiert: Periodenlänge $2\pi$ (von $0$ bis $2\pi$).`, w: r`Nach $2\pi$ (einmal um den Kreis) wiederholt sich alles.` },
        { t: r`„$\cos(x)$ ist im Vergleich zu $\sin(x)$ um $\frac{\pi}{2}$ nach links verschoben.“`, w: r`Der Hochpunkt des Sinus liegt bei $\frac{\pi}{2}$, der des Cosinus bei 0. Es gilt also $\cos(x) = \sin\left(x + \frac{\pi}{2}\right)$.` },
      ],
      kern: r`Beide Kurven haben die Periode $2\pi$, der Cosinus ist der um $\frac{\pi}{2}$ nach links geschobene Sinus.`,
      karten: ['vl09-graphen', 'vl09-periodisch'],
    },
    {
      id: 'vl09-d04',
      folien: '11–12',
      titel: 'Eigenschaften von Sinus und Cosinus',
      folie: r`**Sinus:** $-1 \le \sin(x) \le 1$, ungerade, Periode $2\pi$. Nullstellen in $[0; 2\pi)$: $0$ und $\pi$, insgesamt $x_{1,k} = 0 + k \cdot 2\pi$, $x_{2,k} = \pi + k \cdot 2\pi$.

**Cosinus:** $-1 \le \cos(x) \le 1$, gerade, Periode $2\pi$. Nullstellen in $\left[-\frac{\pi}{2}; \frac{3\pi}{2}\right)$: $\frac{\pi}{2}$ und $-\frac{\pi}{2}$, insgesamt $x_{1,k} = \frac{\pi}{2} + k \cdot 2\pi$, $x_{2,k} = -\frac{\pi}{2} + k \cdot 2\pi$.`,
      notizen: [
        { t: r`Farbig markiert: Die Nullstellen in einer Periode ($0$ gelb, $\pi$ blau) und die Periode $2\pi$ (grün) finden sich in der allgemeinen Formel wieder.`, w: r`Bauplan jeder Lösungsformel: Lösungen in **einer** Periode suchen, dann $+ k \cdot p$ anhängen.` },
      ],
      kern: r`Lösungen in einer Periode + $k \cdot 2\pi$ = alle Lösungen. Die Sinus-Nullstellen kann man auch kurz als $k \cdot \pi$ schreiben.`,
      check: { frage: r`Warum heißt der Sinus „ungerade“?`, antwort: r`Weil $\sin(-x) = -\sin(x)$ gilt: Der Graph ist punktsymmetrisch zum Ursprung.` },
      karten: ['vl09-sin-eigenschaften', 'vl09-cos-eigenschaften', 'vl09-symmetrie-mc'],
    },
    {
      id: 'vl09-d05',
      folien: '13–14',
      titel: 'Vom Dreieck zur Tangensfunktion',
      folie: r`Im rechtwinkligen Dreieck: $\tan(\alpha) = \frac{\sin(\alpha)}{\cos(\alpha)}$.

$\tan: \mathbb{R} \setminus \left\{\frac{\pi}{2} + k\pi \mid k \in \mathbb{Z}\right\} \to \mathbb{R}$, $\tan(x) = \frac{\sin(x)}{\cos(x)}$`,
      notizen: [
        { t: r`„Wir wollen jetzt für reelle Zahlen $x$ (als Winkel im Bogenmaß aufgefasst) festlegen: $\tan(x) = \frac{\sin(x)}{\cos(x)}$.“`, w: r`Die Beziehung aus dem Dreieck wird zur Definition für alle Zahlen.` },
        { t: r`„Das ist nur für diejenigen reellen Zahlen möglich, für die $\cos(x) \ne 0$ gilt!“`, w: r`Durch 0 darf man nicht teilen.` },
        { t: r`Bei der Definitionsmenge: $\frac{\pi}{2} + k\pi$ sind die „Nullstellen von $\cos(x)$“.`, w: r`Genau diese Stellen werden aus $\mathbb{R}$ herausgenommen.` },
      ],
      kern: r`$\tan(x) = \frac{\sin(x)}{\cos(x)}$ ist überall definiert außer an den Nullstellen des Cosinus, $\frac{\pi}{2} + k\pi$.`,
      karten: ['vl09-tan-def'],
    },
    {
      id: 'vl09-d06',
      folien: '15–17',
      titel: 'Tangensgraph, Polstellen, Eigenschaften',
      folie: r`Polstellen: Definitionslücken, an denen die Funktionswerte über alle Grenzen wachsen oder fallen. Mit Vorzeichenwechsel, wenn sie links gegen $+\infty$ und rechts gegen $-\infty$ gehen (oder umgekehrt).

Tangens: $-\infty < \tan(x) < \infty$, ungerade, Periode $\pi$, Nullstellen $x_k = k \cdot \pi$, Polstellen $x_k = \frac{\pi}{2} + k\pi$ mit Vorzeichenwechsel von „+“ zu „−“.`,
      notizen: [
        { t: r`Im Graphen bei $x = \frac{\pi}{2}$ eine senkrechte rote Linie: „Asymptote“.`, w: r`Der Graph kommt der Linie beliebig nahe, berührt sie aber nie. Links davon geht er nach $+\infty$, rechts kommt er von $-\infty$.` },
      ],
      plot: {
        x: [-4.8, 4.8], y: [-4, 4], pi: true, u: 32,
        fns: [
          { f: Math.tan, from: -4.70, to: -1.62 },
          { f: Math.tan, from: -1.52, to: 1.52 },
          { f: Math.tan, from: 1.62, to: 4.70 },
        ],
        segments: [{ from: [Math.PI / 2, -4], to: [Math.PI / 2, 4] }, { from: [-Math.PI / 2, -4], to: [-Math.PI / 2, 4] }],
        alt: 'Tangensgraph mit senkrechten Asymptoten bei ±π/2',
      },
      kern: r`Tangens: Periode $\pi$, Nullstellen $k\pi$, Polstellen (Asymptoten) bei $\frac{\pi}{2} + k\pi$.`,
      karten: ['vl09-polstelle', 'vl09-tan-eigenschaften'],
    },
  ],
};
