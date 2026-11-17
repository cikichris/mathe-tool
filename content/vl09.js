// Vorlesung 09 (09.11.2026): Sinus, Cosinus, Tangens als Funktionen
const r = String.raw;
const PI = Math.PI;

export default {
  id: 'vl09',
  art: 'vorlesung',
  nummer: 9,
  datum: '2026-11-09',
  titel: 'Sinus, Cosinus und Tangens',
  ueberblick: r`Sinus und Cosinus am Einheitskreis, wichtige Werte, Graphen und Periodizität, die Tangensfunktion mit ihren Polstellen. Winkel werden ab jetzt im Bogenmaß angegeben.`,

  karten: [
    {
      id: 'vl09-bogenmass-achtung',
      typ: 'verstaendnis',
      thema: 'Winkelfunktionen',
      quelle: 'VL 9, Folie 4',
      frage: r`In welcher Einheit werden Winkel angegeben, wenn Sinus, Cosinus und Tangens als **Funktionen** $f(x) = \sin(x)$ usw. verwendet werden?`,
      optionen: [r`Grundsätzlich im Bogenmaß`, r`Grundsätzlich in Grad`, r`Das ist frei wählbar`],
      richtig: 0,
      erklaerung: r`Bei Funktionsvorschriften ist $x$ immer eine reelle Zahl im Bogenmaß. Taschenrechner dafür auf **RAD** stellen. Grad nur bei Dreiecksberechnungen mit Winkelangaben in $^\circ$.`,
    },
    {
      id: 'vl09-einheitskreis',
      typ: 'definition',
      thema: 'Winkelfunktionen',
      quelle: 'VL 9, Folien 5 bis 7',
      frage: r`Wie sind $\sin(x)$ und $\cos(x)$ am Einheitskreis definiert?`,
      antwort: r`Trägt man den Winkel $x$ (im Bogenmaß) am Einheitskreis (Radius 1) ab, so hat der Punkt auf dem Kreis die Koordinaten

$$\big(\cos(x);\ \sin(x)\big)$$

- $\sin(x)$ ist die $y$-Koordinate
- $\cos(x)$ ist die $x$-Koordinate

Die **Sinusfunktion** $\sin: \mathbb{R} \to \mathbb{R}$ und die **Cosinusfunktion** $\cos: \mathbb{R} \to \mathbb{R}$ ordnen jeder reellen Zahl $x$ diese Werte zu.`,
      merke: r`Daraus folgt sofort $-1 \le \sin(x) \le 1$ und $-1 \le \cos(x) \le 1$.`,
    },
    {
      id: 'vl09-werte',
      typ: 'formel',
      thema: 'Winkelfunktionen',
      quelle: 'VL 9, Folie 8',
      frage: r`Wie lauten die wichtigen Sinus- und Cosinuswerte für $0, \frac{\pi}{6}, \frac{\pi}{4}, \frac{\pi}{3}, \frac{\pi}{2}, \pi, \frac{3\pi}{2}, 2\pi$?`,
      antwort: r`$$\begin{array}{c|cccccccc}
x & 0 & \frac{\pi}{6} & \frac{\pi}{4} & \frac{\pi}{3} & \frac{\pi}{2} & \pi & \frac{3\pi}{2} & 2\pi \\ \hline
\sin & 0 & \frac{1}{2} & \frac{\sqrt{2}}{2} & \frac{\sqrt{3}}{2} & 1 & 0 & -1 & 0 \\
\cos & 1 & \frac{\sqrt{3}}{2} & \frac{\sqrt{2}}{2} & \frac{1}{2} & 0 & -1 & 0 & 1
\end{array}$$`,
      merke: r`Merkhilfe für $0$ bis $\frac{\pi}{2}$: $\sin = \frac{\sqrt{0}}{2}, \frac{\sqrt{1}}{2}, \frac{\sqrt{2}}{2}, \frac{\sqrt{3}}{2}, \frac{\sqrt{4}}{2}$. Cosinus genau rückwärts. Und $\frac{1}{\sqrt{2}} = \frac{\sqrt{2}}{2}$.`,
    },
    {
      id: 'vl09-werte-mc',
      typ: 'verstaendnis',
      thema: 'Winkelfunktionen',
      quelle: 'VL 9, Folie 8',
      herkunft: 'zusatz',
      frage: r`Was ist $\cos\left(\frac{\pi}{3}\right)$?`,
      optionen: [r`$\frac{1}{2}$`, r`$\frac{\sqrt{3}}{2}$`, r`$\frac{\sqrt{2}}{2}$`, r`$0$`],
      richtig: 0,
      erklaerung: r`$\frac{\pi}{3}$ sind $60^\circ$. $\cos(60^\circ) = \frac{1}{2}$, $\sin(60^\circ) = \frac{\sqrt{3}}{2}$.`,
    },
    {
      id: 'vl09-graphen',
      typ: 'satz',
      thema: 'Winkelfunktionen',
      quelle: 'VL 9, Folie 9',
      frage: r`Wie sehen die Graphen von Sinus und Cosinus aus, und wie hängen sie zusammen?`,
      antwort: r`Beide sind Wellen zwischen $-1$ und $1$ mit der Periodenlänge $2\pi$.

- $\sin$: beginnt bei $(0; 0)$ und steigt
- $\cos$: beginnt bei $(0; 1)$ mit einem Hochpunkt

$\cos(x)$ ist im Vergleich zu $\sin(x)$ um $\frac{\pi}{2}$ **nach links verschoben**.`,
      plotAntwort: {
        x: [-6.6, 7], y: [-1.5, 1.5], u: 26, grid: 0.5, pi: true,
        fns: [{ f: Math.sin }, { f: Math.cos }],
        alt: 'Sinuskurve (blau) durch den Ursprung und Cosinuskurve (rot) mit Hochpunkt bei x = 0',
      },
      merke: r`In der Abbildung: blau = $\sin$, rot = $\cos$.`,
    },
    {
      id: 'vl09-periodisch',
      typ: 'definition',
      thema: 'Winkelfunktionen',
      quelle: 'VL 9, Folie 10',
      frage: r`Wann heißt eine Funktion periodisch mit Periodenlänge $p$?`,
      antwort: r`Wenn für jedes $x \in D$ gilt:

$$f(x + p) = f(x)$$

Der Graph wiederholt sich also nach jeweils $p$ Einheiten.`,
    },
    {
      id: 'vl09-sin-eigenschaften',
      typ: 'satz',
      thema: 'Winkelfunktionen',
      quelle: 'VL 9, Folie 11',
      frage: r`Welche Eigenschaften hat die Sinusfunktion?`,
      antwort: r`- $-1 \le \sin(x) \le 1$
- ungerade (punktsymmetrisch zum Ursprung)
- periodisch mit Periodenlänge $2\pi$
- Nullstellen in $[0; 2\pi)$: $0$ und $\pi$. Insgesamt:
$x_{1,k} = 0 + k \cdot 2\pi,\quad x_{2,k} = \pi + k \cdot 2\pi,\quad k \in \mathbb{Z}$`,
      merke: r`Zusammengefasst sind die Nullstellen genau die Vielfachen von $\pi$: $x_k = k\pi$.`,
    },
    {
      id: 'vl09-cos-eigenschaften',
      typ: 'satz',
      thema: 'Winkelfunktionen',
      quelle: 'VL 9, Folie 12',
      frage: r`Welche Eigenschaften hat die Cosinusfunktion?`,
      antwort: r`- $-1 \le \cos(x) \le 1$
- **gerade** (achsensymmetrisch zur $y$-Achse)
- periodisch mit Periodenlänge $2\pi$
- Nullstellen in $\left[-\frac{\pi}{2}; \frac{3\pi}{2}\right)$: $\frac{\pi}{2}$ und $-\frac{\pi}{2}$. Insgesamt:
$x_{1,k} = \frac{\pi}{2} + k \cdot 2\pi,\quad x_{2,k} = -\frac{\pi}{2} + k \cdot 2\pi,\quad k \in \mathbb{Z}$`,
      merke: r`Zusammengefasst: $x_k = \frac{\pi}{2} + k\pi$.`,
    },
    {
      id: 'vl09-symmetrie-mc',
      typ: 'verstaendnis',
      thema: 'Winkelfunktionen',
      quelle: 'VL 9, Folien 11, 12 und 17',
      frage: r`Welche der drei Funktionen $\sin$, $\cos$, $\tan$ ist **gerade**?`,
      optionen: [r`$\cos$`, r`$\sin$`, r`$\tan$`, r`keine`],
      richtig: 0,
      erklaerung: r`$\cos(-x) = \cos(x)$: achsensymmetrisch. $\sin$ und $\tan$ sind ungerade.`,
    },
    {
      id: 'vl09-tan-def',
      typ: 'definition',
      thema: 'Winkelfunktionen',
      quelle: 'VL 9, Folien 13 und 14',
      frage: r`Wie ist die Tangensfunktion definiert, und was ist ihr Definitionsbereich?`,
      antwort: r`$$\tan(x) = \frac{\sin(x)}{\cos(x)}$$

Das geht nur, wenn $\cos(x) \ne 0$ ist. Die Nullstellen des Cosinus fallen also heraus:

$$\tan: \mathbb{R} \setminus \left\{\frac{\pi}{2} + k\pi \;\middle|\; k \in \mathbb{Z}\right\} \to \mathbb{R}$$`,
      merke: r`Im rechtwinkligen Dreieck gilt dasselbe: $\tan(\alpha) = \frac{\sin(\alpha)}{\cos(\alpha)}$ (Übung 4, Aufgabe 6).`,
    },
    {
      id: 'vl09-polstelle',
      typ: 'definition',
      thema: 'Winkelfunktionen',
      quelle: 'VL 9, Folie 16',
      frage: r`Was ist eine Polstelle, und was bedeutet „mit“ bzw. „ohne Vorzeichenwechsel“?`,
      antwort: r`Eine **Polstelle** ist eine Definitionslücke, in deren Umgebung die Funktionswerte über alle Grenzen wachsen oder fallen. Der Graph nähert sich dort einer senkrechten Asymptote.

- **Mit Vorzeichenwechsel:** links gegen $+\infty$, rechts gegen $-\infty$ (oder umgekehrt)
- **Ohne Vorzeichenwechsel:** auf beiden Seiten gegen $+\infty$ (oder beide gegen $-\infty$)`,
    },
    {
      id: 'vl09-tan-eigenschaften',
      typ: 'satz',
      thema: 'Winkelfunktionen',
      quelle: 'VL 9, Folien 15 und 17',
      frage: r`Welche Eigenschaften hat die Tangensfunktion?`,
      antwort: r`- Wertebereich: ganz $\mathbb{R}$ ($-\infty < \tan(x) < \infty$)
- ungerade
- periodisch mit Periodenlänge **$\pi$** (nicht $2\pi$!)
- Nullstellen: $x_k = k\pi,\ k \in \mathbb{Z}$
- Polstellen: $x_k = \frac{\pi}{2} + k\pi$, jeweils mit Vorzeichenwechsel von „$+$“ zu „$-$“`,
      plotAntwort: {
        x: [-5.2, 5.2], y: [-4.2, 4.2], u: 30, pi: true,
        fns: [{ f: Math.tan }],
        segments: [
          { from: [-PI / 2, -4.2], to: [-PI / 2, 4.2] },
          { from: [PI / 2, -4.2], to: [PI / 2, 4.2] },
          { from: [-3 * PI / 2, -4.2], to: [-3 * PI / 2, 4.2] },
          { from: [3 * PI / 2, -4.2], to: [3 * PI / 2, 4.2] },
        ],
        alt: 'Graph der Tangensfunktion mit senkrechten Asymptoten bei ±π/2 und ±3π/2 und Nullstellen bei 0 und ±π',
      },
      merke: r`Die gestrichelten Linien sind die Asymptoten an den Polstellen.`,
    },
  ],

  formelblatt: [
    {
      id: 'fb-trig-werte',
      titel: 'sin/cos-Werte',
      inhalt: r`$\begin{array}{c|ccccc} x & 0 & \frac{\pi}{6} & \frac{\pi}{4} & \frac{\pi}{3} & \frac{\pi}{2} \\ \hline \sin & 0 & \frac{1}{2} & \frac{\sqrt2}{2} & \frac{\sqrt3}{2} & 1 \\ \cos & 1 & \frac{\sqrt3}{2} & \frac{\sqrt2}{2} & \frac{1}{2} & 0 \end{array}$`,
    },
    {
      id: 'fb-trig-eigenschaften',
      titel: 'sin, cos, tan',
      inhalt: r`$\sin$: ungerade, $p = 2\pi$, NS $k\pi$. $\ \cos$: gerade, $p = 2\pi$, NS $\frac{\pi}{2} + k\pi$. $\ \tan = \frac{\sin}{\cos}$: ungerade, $p = \pi$, NS $k\pi$, Pole $\frac{\pi}{2} + k\pi$.`,
    },
  ],
};
