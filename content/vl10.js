// Vorlesung 10 (10.11.2026): Allgemeine Sinus-/Cosinusfunktion, Arkussinus, trigonometrische Gleichungen
const r = String.raw;
const PI = Math.PI;

export default {
  id: 'vl10',
  art: 'vorlesung',
  nummer: 10,
  datum: '2026-11-10',
  titel: 'Allgemeine Winkelfunktionen und ihre Nullstellen',
  ueberblick: r`Amplitude, Kreisfrequenz, Phase und Verschiebung bei $A \sin(\omega x + \varphi) + b$, Graphen skizzieren, Arkussinus und das Lösen von Sinusgleichungen. Die Folien 12 bis 15 fehlen im PDF. Die Karten zu Cosinus- und Tangensgleichungen hat Claude ergänzt.`,

  karten: [
    {
      id: 'vl10-allgemein',
      typ: 'definition',
      thema: 'Allgemeine Winkelfunktionen',
      quelle: 'VL 10, Folie 3',
      frage: r`Was bedeuten $A$, $\omega$, $\varphi$ und $b$ in $y = A \cdot \sin(\omega x + \varphi) + b$?`,
      antwort: r`- $A$: **Amplitude**, Streckung bzw. Stauchung in $y$-Richtung
- $\omega$: **Kreisfrequenz**, Anzahl der Schwingungen in einem Intervall der Breite $2\pi$
- $\varphi$: **Phase**, bewirkt eine Verschiebung in $x$-Richtung
- $b$: Verschiebung in $y$-Richtung

Die **Phasenverschiebung** ist $-\dfrac{\varphi}{\omega}$, denn $A\sin(\omega x + \varphi) + b = A\sin\left(\omega\left(x + \frac{\varphi}{\omega}\right)\right) + b$.`,
      merke: r`Gleiches gilt für $A\cos(\omega x + \varphi) + b$. Positive Phasenverschiebung heißt nach rechts, negative nach links.`,
    },
    {
      id: 'vl10-eigenschaften',
      typ: 'formel',
      thema: 'Allgemeine Winkelfunktionen',
      quelle: 'VL 10, Folien 5, 6 und 8',
      frage: r`Welchen Wertebereich und welche Periodenlänge haben $A\sin(\omega x + \varphi) + b$ und $a\tan(bx + c) + d$?`,
      antwort: r`**Sinus und Cosinus** (mit $A > 0$):
- $-A + b \le y \le A + b$, also $W = [b - A;\ b + A]$
- Periodenlänge $p = \dfrac{2\pi}{\omega}$
- unendlich viele Nullstellen oder gar keine

**Tangens** $a\tan(bx + c) + d$:
- $W = \mathbb{R}$
- Periodenlänge $p = \dfrac{\pi}{b}$
- unendlich viele Nullstellen und Polstellen`,
      merke: r`Phase und Verschiebung ändern die Periodenlänge nicht. Nur $\omega$ zählt.`,
    },
    {
      id: 'vl10-anwendung-mc',
      typ: 'verstaendnis',
      thema: 'Allgemeine Winkelfunktionen',
      quelle: 'VL 10, Folie 5',
      herkunft: 'zusatz',
      frage: r`Wie groß ist die Periodenlänge von $f(x) = 3\sin(4x - \pi) + 2$?`,
      optionen: [r`$\frac{\pi}{2}$`, r`$2\pi$`, r`$8\pi$`, r`$\frac{\pi}{4}$`],
      richtig: 0,
      erklaerung: r`$p = \frac{2\pi}{\omega} = \frac{2\pi}{4} = \frac{\pi}{2}$. Amplitude, Phase und Verschiebung spielen dafür keine Rolle.`,
    },
    {
      id: 'vl10-skizze-rezept',
      typ: 'verfahren',
      thema: 'Allgemeine Winkelfunktionen',
      quelle: 'VL 10, Folie 7 (Vorgehen von Claude zusammengefasst)',
      herkunft: 'zusatz',
      frage: r`Wie skizzierst du den Graphen von $f(x) = A\sin(\omega x + \varphi) + b$?`,
      antwort: r`1. **Mittellinie** $y = b$ einzeichnen.
2. **Hoch- und Tiefwerte**: $b + A$ und $b - A$ (Wertebereich).
3. **Periodenlänge** $p = \frac{2\pi}{\omega}$ berechnen und in vier gleiche Teile teilen.
4. **Startpunkt**: Phasenverschiebung $-\frac{\varphi}{\omega}$. Dort beginnt der Sinus auf der Mittellinie steigend (der Cosinus im Hochpunkt).
5. Pro Viertelperiode: Mittellinie, Hochpunkt, Mittellinie, Tiefpunkt, Mittellinie.`,
    },
    {
      id: 'vl10-skizze-bsp1',
      typ: 'aufgabe',
      thema: 'Allgemeine Winkelfunktionen',
      quelle: 'VL 10, Folie 7, Beispiel 1',
      herkunft: 'vorlesung',
      rezept: 'vl10-skizze-rezept',
      frage: r`Bestimme Wertebereich und Periodenlänge von $f(x) = 4\sin(2x)$ und skizziere den Graphen.`,
      tipps: [r`$A = 4$, $b = 0$, $\omega = 2$, keine Phase.`],
      schritte: [
        { t: r`$A = 4,\ b = 0 \Rightarrow W = [-4; 4]$`, q: r`VL 10, Folien 5 und 6: $-A + b \le y \le A + b$, also $W = [b - A;\ b + A]$` },
        { t: r`$\omega = 2 \Rightarrow p = \dfrac{2\pi}{2} = \pi$`, q: r`VL 10, Folien 5 und 6: Periodenlänge $p = \frac{2\pi}{\omega}$` },
        { t: r`Skizze: Start in $(0; 0)$ steigend, Hochpunkt bei $\frac{\pi}{4}$, Nullstelle bei $\frac{\pi}{2}$, Tiefpunkt bei $\frac{3\pi}{4}$, wieder 0 bei $\pi$.` },
      ],
      plotLoesung: {
        x: [-6.6, 6.9], y: [-4.6, 4.6], u: 26, pi: true,
        fns: [{ f: (x) => 4 * Math.sin(2 * x) }],
        alt: 'Sinuskurve zwischen −4 und 4 mit Periodenlänge π',
      },
      ergebnis: r`$W = [-4; 4]$, $p = \pi$`,
    },
    {
      id: 'vl10-skizze-bsp2',
      typ: 'aufgabe',
      thema: 'Allgemeine Winkelfunktionen',
      quelle: 'VL 10, Folie 7, Beispiel 2',
      herkunft: 'vorlesung',
      rezept: 'vl10-skizze-rezept',
      frage: r`Bestimme Wertebereich, Periodenlänge und Phasenverschiebung von $g(x) = \cos(0{,}5x + \pi) - 1$ und skizziere den Graphen.`,
      tipps: [
        r`$A = 1$, $b = -1$, $\omega = 0{,}5$, $\varphi = \pi$.`,
        r`Phasenverschiebung $-\frac{\varphi}{\omega}$.`,
      ],
      schritte: [
        { t: r`$A = 1,\ b = -1 \Rightarrow W = [-2; 0]$`, q: r`VL 10, Folien 5 und 6: $-A + b \le y \le A + b$, also $W = [b - A;\ b + A]$` },
        { t: r`$\omega = 0{,}5 \Rightarrow p = \dfrac{2\pi}{0{,}5} = 4\pi$`, q: r`VL 10, Folien 5 und 6: Periodenlänge $p = \frac{2\pi}{\omega}$` },
        { t: r`$\varphi = \pi \Rightarrow -\dfrac{\varphi}{\omega} = -\dfrac{\pi}{0{,}5} = -2\pi$, also Verschiebung um $2\pi$ nach links`, q: r`VL 10, Folie 3: Phasenverschiebung $= -\frac{\varphi}{\omega}$ (negativ heißt nach links).` },
        { t: r`Der Cosinus hat seinen Hochpunkt also bei $x = -2\pi$ (Wert 0). Bei $x = 0$ liegt ein Tiefpunkt mit Wert $-2$.` },
      ],
      plotLoesung: {
        x: [-10, 13.2], y: [-2.6, 0.8], u: 16, grid: 0.5, pi: true, piEvery: 2,
        fns: [{ f: (x) => Math.cos(0.5 * x + PI) - 1 }],
        segments: [{ from: [-10, -1], to: [13.2, -1] }],
        alt: 'Cosinuskurve zwischen −2 und 0 mit Periodenlänge 4π, Tiefpunkt bei x = 0, Mittellinie gestrichelt bei y = −1',
      },
      ergebnis: r`$W = [-2; 0]$, $p = 4\pi$, Verschiebung um $2\pi$ nach links`,
    },
    {
      id: 'vl10-arcsin',
      typ: 'definition',
      thema: 'Trigonometrische Gleichungen',
      quelle: 'VL 10, Folie 10',
      frage: r`Was ist die Arkussinusfunktion?`,
      antwort: r`Die Sinusfunktion ist auf $\left[-\frac{\pi}{2}; \frac{\pi}{2}\right]$ umkehrbar. Die Umkehrfunktion heißt Arkussinus:

$$\arcsin: [-1; 1] \to \left[-\frac{\pi}{2}; \frac{\pi}{2}\right]$$

$\arcsin(a)$ ist also **der eine** Winkel zwischen $-\frac{\pi}{2}$ und $\frac{\pi}{2}$, dessen Sinus $a$ ist.`,
      merke: r`Der Taschenrechner liefert mit $\sin^{-1}$ genau diesen einen Wert. Die übrigen Lösungen musst du selbst ergänzen.`,
    },
    {
      id: 'vl10-sin-gleichung',
      typ: 'formel',
      thema: 'Trigonometrische Gleichungen',
      quelle: 'VL 10, Folie 11',
      frage: r`Wie lauten alle Lösungen von $\sin(x) = a$ mit $-1 \le a \le 1$?`,
      antwort: r`Im Intervall $\left[-\frac{\pi}{2}; \frac{3\pi}{2}\right)$: $\ x_1 = \arcsin(a)$ und $x_2 = \pi - \arcsin(a)$.

Insgesamt (wegen der Periode $2\pi$):

$$x_{1,k} = \arcsin(a) + k \cdot 2\pi,\qquad x_{2,k} = \pi - \arcsin(a) + k \cdot 2\pi,\qquad k \in \mathbb{Z}$$`,
      merke: r`Für $|a| > 1$ gibt es keine Lösung. Für $a = \pm 1$ fallen beide Lösungsfamilien zusammen.`,
    },
    {
      id: 'vl10-gleichung-rezept',
      typ: 'verfahren',
      thema: 'Trigonometrische Gleichungen',
      quelle: 'VL 10, Folien 9 bis 11 und 16',
      frage: r`Wie bestimmst du die Nullstellen einer Funktion wie $f(x) = A\sin(\omega x + \varphi) + b$?`,
      antwort: r`1. $f(x) = 0$ setzen und **$\sin(\ldots)$ isolieren**: $\sin(\omega x + \varphi) = -\frac{b}{A}$.
2. **Prüfen:** Liegt die rechte Seite zwischen $-1$ und $1$? Sonst keine Nullstellen.
3. **Beide Lösungsfamilien** für das Argument aufschreiben: $\arcsin(a) + k \cdot 2\pi$ und $\pi - \arcsin(a) + k \cdot 2\pi$.
4. **Nach $x$ auflösen** (bei $\omega \ne 1$ auch das $k \cdot 2\pi$ durch $\omega$ teilen).
5. „$k \in \mathbb{Z}$“ dazuschreiben.`,
      merke: r`Typischer Fehler: bei $\sin(2x) = a$ erst durch 2 teilen und dann $k \cdot 2\pi$ addieren. Richtig ist $k \cdot \pi$, weil die ganze Lösung halbiert wird.`,
    },
    {
      id: 'vl10-nullstellen-12',
      typ: 'aufgabe',
      thema: 'Trigonometrische Gleichungen',
      quelle: 'VL 10, Folie 16, Beispiele 1 und 2',
      herkunft: 'vorlesung',
      rezept: 'vl10-gleichung-rezept',
      frage: r`Bestimme alle Nullstellen:
1) $f(x) = \sin(x) - 0{,}5$
2) $f(x) = 2\sin(x) + 3$`,
      tipps: [r`Jeweils $\sin(x)$ isolieren und prüfen, ob der Wert zwischen $-1$ und $1$ liegt.`],
      schritte: [
        { t: r`1) $\sin(x) = 0{,}5$` },
        { t: r`$x_{1,k} = \arcsin(0{,}5) + k \cdot 2\pi = \dfrac{\pi}{6} + k \cdot 2\pi$, $\quad x_{2,k} = \pi - \dfrac{\pi}{6} + k \cdot 2\pi = \dfrac{5\pi}{6} + k \cdot 2\pi$, $\ k \in \mathbb{Z}$`, q: r`VL 10, Folie 11: $\sin(x) = a \Rightarrow x_{1,k} = \arcsin(a) + k \cdot 2\pi,\ x_{2,k} = \pi - \arcsin(a) + k \cdot 2\pi$. VL 9, Folie 8 (Wertetabelle): $\sin\left(\frac{\pi}{6}\right) = \frac{1}{2}$.` },
        { t: r`2) $2\sin(x) = -3 \Leftrightarrow \sin(x) = -1{,}5$: keine Nullstellen`, w: r`Der Sinus nimmt nur Werte zwischen $-1$ und $1$ an.`, q: r`VL 9, Folie 11: $-1 \le \sin(x) \le 1$. Werte außerhalb erreicht der Sinus nie.` },
      ],
      ergebnis: r`1) $x_{1,k} = \frac{\pi}{6} + 2k\pi,\ x_{2,k} = \frac{5\pi}{6} + 2k\pi$ $\quad$ 2) keine Nullstellen`,
    },
    {
      id: 'vl10-cos-gleichung',
      typ: 'formel',
      thema: 'Trigonometrische Gleichungen',
      quelle: 'Ergänzung zu VL 10 (Folien 12 bis 15 fehlen im PDF)',
      herkunft: 'zusatz',
      frage: r`Wie lauten alle Lösungen von $\cos(x) = a$ ($-1 \le a \le 1$) und von $\tan(x) = a$?`,
      antwort: r`**Cosinus:** $\arccos: [-1; 1] \to [0; \pi]$.
$$x_{1,k} = \arccos(a) + k \cdot 2\pi,\qquad x_{2,k} = -\arccos(a) + k \cdot 2\pi,\qquad k \in \mathbb{Z}$$

**Tangens:** $\arctan: \mathbb{R} \to \left(-\frac{\pi}{2}; \frac{\pi}{2}\right)$, Periode $\pi$, also nur eine Familie:
$$x_k = \arctan(a) + k \cdot \pi,\qquad k \in \mathbb{Z}$$`,
      merke: r`Cosinus ist gerade, daher die zweite Lösung $-\arccos(a)$. Ob die Vorlesung das genauso schreibt, steht auf den fehlenden Folien. Bitte mit deiner Mitschrift abgleichen.`,
    },
    {
      id: 'vl10-nullstellen-3',
      typ: 'aufgabe',
      thema: 'Trigonometrische Gleichungen',
      quelle: 'VL 10, Folie 16, Beispiel 3',
      herkunft: 'claude',
      rezept: 'vl10-cos-gleichung',
      frage: r`Bestimme alle Nullstellen von $f(x) = \cos(2x - \pi)$.`,
      tipps: [
        r`Wo hat der Cosinus Nullstellen? Bei $\frac{\pi}{2} + k\pi$.`,
        r`Setze das Argument $2x - \pi$ gleich $\frac{\pi}{2} + k\pi$ und löse nach $x$.`,
      ],
      schritte: [
        { t: r`$\cos(2x - \pi) = 0 \Leftrightarrow 2x - \pi = \dfrac{\pi}{2} + k\pi,\ k \in \mathbb{Z}$`, w: r`Die Nullstellen von $\cos$ sind $\frac{\pi}{2} + k\pi$ (VL 9, Folie 12).`, q: r`VL 9, Folie 12: Nullstellen des Cosinus $\frac{\pi}{2} + k \cdot 2\pi$ und $-\frac{\pi}{2} + k \cdot 2\pi$, zusammen $\frac{\pi}{2} + k\pi$.` },
        { t: r`$\Leftrightarrow 2x = \dfrac{3\pi}{2} + k\pi \Leftrightarrow x = \dfrac{3\pi}{4} + k \cdot \dfrac{\pi}{2}$`, w: r`Auch $k\pi$ wird halbiert.`, q: r`Alles nach $x$ auflösen; beim Teilen durch 2 wird auch $k\pi$ halbiert.` },
        { t: r`Gleichwertig: $x_k = \dfrac{\pi}{4} + k \cdot \dfrac{\pi}{2}$, $\ k \in \mathbb{Z}$`, w: r`$\frac{3\pi}{4} - \frac{\pi}{2} = \frac{\pi}{4}$, das ist dieselbe Lösungsmenge.` },
      ],
      ergebnis: r`$x_k = \frac{\pi}{4} + k \cdot \frac{\pi}{2},\ k \in \mathbb{Z}$`,
    },
    {
      id: 'vl10-nullstellen-4',
      typ: 'aufgabe',
      thema: 'Trigonometrische Gleichungen',
      quelle: 'VL 10, Folie 16, Beispiel 4',
      herkunft: 'claude',
      rezept: 'vl10-cos-gleichung',
      frage: r`Bestimme alle Nullstellen von $f(x) = 5\cos\left(0{,}5x - \dfrac{\pi}{3}\right) + 2{,}5$.`,
      tipps: [
        r`Cosinus isolieren: $\cos(\ldots) = -0{,}5$.`,
        r`$\arccos(-0{,}5) = \frac{2\pi}{3}$. Zwei Lösungsfamilien: $\pm\frac{2\pi}{3} + k \cdot 2\pi$.`,
        r`Nach $x$ auflösen: erst $+\frac{\pi}{3}$, dann mal 2 (auch das $k \cdot 2\pi$!).`,
      ],
      schritte: [
        { t: r`$5\cos\left(0{,}5x - \frac{\pi}{3}\right) = -2{,}5 \Leftrightarrow \cos\left(0{,}5x - \frac{\pi}{3}\right) = -0{,}5$` },
        { t: r`$0{,}5x - \dfrac{\pi}{3} = \dfrac{2\pi}{3} + k \cdot 2\pi \;\lor\; 0{,}5x - \dfrac{\pi}{3} = -\dfrac{2\pi}{3} + k \cdot 2\pi$`, w: r`$\arccos(-0{,}5) = \frac{2\pi}{3}$, denn $\cos(120^\circ) = -\frac{1}{2}$.`, q: r`Ergänzung von Claude (VL 10, Folien 12 bis 15 fehlen): $\cos(x) = a \Rightarrow x = \pm\arccos(a) + k \cdot 2\pi$. VL 9, Folie 8 (Wertetabelle): $\cos\left(\frac{\pi}{3}\right) = \frac{1}{2}$, und $\arccos(-0{,}5) = \pi - \frac{\pi}{3} = \frac{2\pi}{3}$.` },
        { t: r`$0{,}5x = \pi + k \cdot 2\pi \;\lor\; 0{,}5x = -\dfrac{\pi}{3} + k \cdot 2\pi$` },
        { t: r`$x_{1,k} = 2\pi + k \cdot 4\pi,\quad x_{2,k} = -\dfrac{2\pi}{3} + k \cdot 4\pi,\quad k \in \mathbb{Z}$`, w: r`Probe mit $x = 2\pi$: $\cos\left(\pi - \frac{\pi}{3}\right) = \cos\left(\frac{2\pi}{3}\right) = -0{,}5$ ✓` },
      ],
      ergebnis: r`$x_{1,k} = 2\pi + 4k\pi,\ x_{2,k} = -\frac{2\pi}{3} + 4k\pi,\ k \in \mathbb{Z}$`,
      fehler: [r`Beim Mal-2-Nehmen das $k \cdot 2\pi$ vergessen: Es wird zu $k \cdot 4\pi$.`],
    },
    {
      id: 'vl10-nullstellen-5',
      typ: 'aufgabe',
      thema: 'Trigonometrische Gleichungen',
      quelle: 'VL 10, Folie 16, Beispiel 5',
      herkunft: 'claude',
      rezept: 'vl10-cos-gleichung',
      frage: r`Bestimme alle Nullstellen von $f(x) = 3\tan\left(x - \dfrac{\pi}{4}\right) - 3$.`,
      tipps: [
        r`Tangens isolieren: $\tan(\ldots) = 1$.`,
        r`$\arctan(1) = \frac{\pi}{4}$. Beim Tangens gibt es nur eine Familie mit Periode $\pi$.`,
      ],
      schritte: [
        { t: r`$3\tan\left(x - \frac{\pi}{4}\right) = 3 \Leftrightarrow \tan\left(x - \frac{\pi}{4}\right) = 1$` },
        { t: r`$x - \dfrac{\pi}{4} = \arctan(1) + k\pi = \dfrac{\pi}{4} + k\pi$`, q: r`Ergänzung von Claude (VL 10, Folien 12 bis 15 fehlen): $\tan(x) = a \Rightarrow x = \arctan(a) + k\pi$, weil die Periode von $\tan$ nur $\pi$ ist (VL 9, Folie 17). Und $\tan\left(\frac{\pi}{4}\right) = \frac{\sin(\pi/4)}{\cos(\pi/4)} = 1$ (VL 9, Folien 8 und 13).` },
        { t: r`$x_k = \dfrac{\pi}{2} + k\pi,\ k \in \mathbb{Z}$`, w: r`Diese Stellen liegen im Definitionsbereich: Die Polstellen sind bei $x - \frac{\pi}{4} = \frac{\pi}{2} + k\pi$, also bei $x = \frac{3\pi}{4} + k\pi$.` },
      ],
      ergebnis: r`$x_k = \frac{\pi}{2} + k\pi,\ k \in \mathbb{Z}$`,
    },
  ],

  formelblatt: [
    {
      id: 'fb-allg-sinus',
      titel: 'Allgemeine Sinusfunktion',
      inhalt: r`$A\sin(\omega x + \varphi) + b$: $W = [b - A; b + A]$, $p = \frac{2\pi}{\omega}$, Verschiebung $-\frac{\varphi}{\omega}$. Tangens: $p = \frac{\pi}{b}$.`,
    },
    {
      id: 'fb-trig-gleichungen',
      titel: 'Trig. Gleichungen',
      inhalt: r`$\sin x = a$: $\arcsin a + 2k\pi$, $\ \pi - \arcsin a + 2k\pi$. $\ \cos x = a$: $\pm\arccos a + 2k\pi$. $\ \tan x = a$: $\arctan a + k\pi$. Nur für $|a| \le 1$ (sin, cos).`,
    },
  ],
};
