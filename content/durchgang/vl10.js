// Vorlesung 10 (10.11.2026) durchgehen: allgemeine Sinus-/Cosinusfunktion, Skizzen, arcsin, Sinus-Gleichungen
const r = String.raw;

export default {
  unit: 'vl10',
  abschnitte: [
    {
      id: 'vl10-d01',
      folien: '3',
      titel: 'Allgemeine Sinus- und Cosinusfunktion',
      folie: r`$$y = A \cdot \sin(\omega \cdot x + \varphi) + b \quad \text{bzw.} \quad y = A \cdot \cos(\omega \cdot x + \varphi) + b$$
- $A$: Amplitude
- $\omega$: Kreisfrequenz
- $\varphi$: Phase
- $-\frac{\varphi}{\omega}$: Phasenverschiebung`,
      notizen: [
        { t: r`$b$: Verschiebung in y-Richtung`, w: r`$b$ wird am Ende addiert, der ganze Graph rutscht nach oben oder unten.` },
        { t: r`Umgeformt: $y = A \cdot \sin\left(\omega \cdot \left(x + \frac{\varphi}{\omega}\right)\right) + b$`, w: r`$\omega$ aus der Klammer ausklammern: $\omega x + \varphi = \omega\left(x + \frac{\varphi}{\omega}\right)$. So sieht man die Verschiebung in x-Richtung direkt.` },
        { t: r`$A$: Streckung/Stauchung in y-Richtung`, w: r`Der Graph geht von $-A$ bis $A$ (vor der Verschiebung um $b$).` },
        { t: r`$\omega$: Anzahl der Schwingungen in einem Intervall der Breite $2\pi$`, w: r`$\omega = 2$ heißt: zwei volle Schwingungen, wo $\sin(x)$ nur eine macht.` },
        { t: r`$\varphi$: bewirkt eine Verschiebung in x-Richtung`, w: r`` },
        { t: r`$-\frac{\varphi}{\omega}$: Wert, um den in x-Richtung verschoben ist, inklusive Vorzeichenkorrektur`, w: r`Aus $x + \frac{\varphi}{\omega}$ folgt eine Verschiebung um $-\frac{\varphi}{\omega}$: Plus in der Klammer bedeutet nach **links**.` },
      ],
      kern: r`$A$ streckt in y-Richtung, $b$ schiebt nach oben/unten, $\omega$ bestimmt die Periode, $-\frac{\varphi}{\omega}$ ist die Verschiebung nach rechts (negativ: nach links).`,
      check: { frage: r`Um wie viel ist $\sin(2x + \pi)$ gegenüber $\sin(2x)$ verschoben?`, antwort: r`$-\frac{\varphi}{\omega} = -\frac{\pi}{2}$, also um $\frac{\pi}{2}$ nach links.` },
      karten: ['vl10-allgemein'],
    },
    {
      id: 'vl10-d02',
      folien: '5–6',
      titel: 'Eigenschaften: Wertebereich, Periode, Nullstellen',
      folie: r`Für $y = A \sin(\omega x + \varphi) + b$ und $y = A \cos(\omega x + \varphi) + b$:
- $-A + b \le y \le A + b$
- periodisch mit Periodenlänge $p = \frac{2\pi}{\omega}$
- unendlich viele Nullstellen oder gar keine`,
      notizen: [
        { t: r`Über $p = \frac{2\pi}{\omega}$: Der Zähler $2\pi$ ist die „Periodenlänge von $\sin(x)$“ bzw. $\cos(x)$.`, w: r`Die Grundperiode $2\pi$ wird durch $\omega$ geteilt: Großes $\omega$, kurze Periode.` },
      ],
      kern: r`Wertebereich $[-A + b; A + b]$, Periode $\frac{2\pi}{\omega}$.`,
      check: { frage: r`Hat $y = \sin(x) + 3$ Nullstellen?`, antwort: r`Nein. Der Wertebereich ist $[2; 4]$, die 0 wird nie erreicht.` },
      karten: ['vl10-eigenschaften'],
    },
    {
      id: 'vl10-d03',
      folien: '7 und Notizseite',
      titel: 'Beispiel 1: Graph von $4\sin(2x)$',
      folie: r`Funktionsgraph zu $f(x) = 4\sin(2x)$`,
      notizen: [
        { t: r`$A = 4$, $b = 0 \Rightarrow W = [-4; 4]$`, w: r`Wertebereich $[-A + b; A + b]$.` },
        { t: r`$\omega = 2 \Rightarrow p = \frac{2\pi}{2} = \pi$`, w: r`Eine volle Schwingung ist nur $\pi$ lang.` },
        { t: r`Skizze: Nullstellen bei $0, \pm\frac{\pi}{2}, \pm\pi, \dots$, Hochpunkte bei Höhe 4, Tiefpunkte bei $-4$.`, w: r`Keine Verschiebung ($\varphi = 0$): Der Graph startet wie $\sin$ im Ursprung nach oben. Alle $\frac{p}{4} = \frac{\pi}{4}$ kommt ein markanter Punkt (Null, Hoch, Null, Tief).` },
      ],
      plot: {
        x: [-6.5, 6.5], y: [-4.5, 4.5], pi: true, u: 26,
        fns: [{ f: (x) => 4 * Math.sin(2 * x) }],
        alt: 'Graph von 4 sin(2x) mit Periode π und Amplitude 4',
      },
      kern: r`Erst $W$ und $p$ ausrechnen, dann die Markierungen im Abstand $\frac{p}{4}$ setzen.`,
      karten: ['vl10-skizze-rezept', 'vl10-skizze-bsp1'],
    },
    {
      id: 'vl10-d04',
      folien: '7 und Notizseite',
      titel: 'Beispiel 2: Graph von $\cos(0{,}5x + \pi) - 1$',
      folie: r`Funktionsgraph zu $g(x) = \cos(0{,}5x + \pi) - 1$`,
      notizen: [
        { t: r`$A = 1$, $b = -1 \Rightarrow W = [-2; 0]$`, w: r`$[-1 - 1; 1 - 1]$.` },
        { t: r`$\omega = 0{,}5 \Rightarrow p = \frac{2\pi}{0{,}5} = 4\pi$`, w: r`Kleines $\omega$: lange Periode.` },
        { t: r`$\varphi = \pi \Rightarrow -\frac{\varphi}{\omega} = -\frac{\pi}{0{,}5} = -2\pi$, d. h. Verschiebung um $2\pi$ nach links.`, w: r`Durch $0{,}5$ teilen ist mal 2.` },
        { t: r`Skizze: rote Mittellinie bei $y = -1$, Tiefpunkt bei $x = 0$ mit Höhe $-2$, Hochpunkte (Höhe 0) bei $\pm 2\pi$, $6\pi, \dots$`, w: r`Normaler Cosinus hat bei 0 ein Maximum. Um $2\pi$ (eine halbe Periode) verschoben wird daraus ein Minimum. Hochpunkte also bei $-2\pi$, $2\pi$, $6\pi$.` },
      ],
      plot: {
        x: [-10.5, 10.5], y: [-2.5, 0.8], pi: true, piEvery: 4, u: 16,
        fns: [{ f: (x) => Math.cos(0.5 * x + Math.PI) - 1 }],
        segments: [{ from: [-10.5, -1], to: [10.5, -1] }],
        alt: 'Graph von cos(0,5x + π) − 1 mit Mittellinie y = −1 und Periode 4π',
      },
      kern: r`Mittellinie $y = b$ zuerst zeichnen. Dann Periode und Verschiebung. Der Wertebereich prüft am Ende die Skizze.`,
      karten: ['vl10-skizze-bsp2'],
    },
    {
      id: 'vl10-d05',
      folien: '9–10',
      titel: 'Einführungsbeispiel und arcsin',
      folie: r`Gesucht: Nullstellen von $f(x) = \sin(x) - 0{,}5$.

Der Sinus ist z. B. auf $\left[-\frac{\pi}{2}; \frac{\pi}{2}\right]$ umkehrbar: $\arcsin: [-1; 1] \to \left[-\frac{\pi}{2}; \frac{\pi}{2}\right]$.`,
      notizen: [
        { t: r`$f(x) = 0 \iff \sin(x) - 0{,}5 = 0 \quad | +0{,}5 \iff \sin(x) = 0{,}5$`, w: r`Sinus freistellen.` },
        { t: r`Im Graphen: Höhe $0{,}5$ markiert. Im gelben Bereich $\left[-\frac{\pi}{2}; \frac{\pi}{2}\right]$ liegt genau eine Lösung $x_1 = \arcsin(0{,}5)$.`, w: r`Dort ist der Sinus umkehrbar, der Taschenrechner liefert diesen Wert.` },
        { t: r`Zweite Lösung im grünen Bereich: $x_2 = \pi - \arcsin(0{,}5)$.`, w: r`Der Sinusbogen ist symmetrisch zu $x = \frac{\pi}{2}$. Was bei $x_1$ rechts vom Anfang liegt, liegt bei $x_2$ links vom Ende $\pi$.` },
        { t: r`Weitere Lösungen: $x_1 \pm 2\pi$, $x_2 \pm 2\pi$, …`, w: r`Periode des Sinus.` },
      ],
      kern: r`Eine Sinus-Gleichung hat in jeder Periode zwei Lösungen: $\arcsin(a)$ und $\pi - \arcsin(a)$.`,
      karten: ['vl10-arcsin'],
    },
    {
      id: 'vl10-d06',
      folien: '11',
      titel: 'Sinus-Gleichungen allgemein',
      folie: r`$\sin(x) = a$ mit $-1 \le a \le 1$. In $\left[-\frac{\pi}{2}; \frac{3\pi}{2}\right)$: $x_1 = \arcsin(a)$, $x_2 = \pi - \arcsin(a)$.

Insgesamt: $x_{1,k} = \arcsin(a) + k \cdot 2\pi$, $x_{2,k} = \pi - \arcsin(a) + k \cdot 2\pi$, $k \in \mathbb{Z}$`,
      kern: r`Zwei Familien: $\arcsin(a) + k \cdot 2\pi$ und $\pi - \arcsin(a) + k \cdot 2\pi$. Nur lösbar für $-1 \le a \le 1$.`,
      check: { frage: r`Was ist der Unterschied zur Cosinus-Formel?`, antwort: r`Beim Cosinus ist die zweite Familie $-\arccos(a) + k \cdot 2\pi$, beim Sinus $\pi - \arcsin(a) + k \cdot 2\pi$.` },
      karten: ['vl10-sin-gleichung', 'vl10-gleichung-rezept'],
    },
    {
      id: 'vl10-d07',
      folien: '12 und Notizseite',
      titel: 'Beispiele 1 und 2: Nullstellen',
      folie: r`1) $f(x) = \sin(x) - 0{,}5$ 2) $f(x) = 2\sin(x) + 3$`,
      notizen: [
        { t: r`1) $f(x) = 0 \iff \sin(x) - 0{,}5 = 0 \quad | +0{,}5 \iff \sin(x) = 0{,}5$`, w: r`` },
        { t: r`$\iff \begin{cases} x_{1,k} = \arcsin(0{,}5) + k \cdot 2\pi = \frac{\pi}{6} + k \cdot 2\pi \\ x_{2,k} = \pi - \arcsin(0{,}5) + k \cdot 2\pi = \frac{5\pi}{6} + k \cdot 2\pi \end{cases} \quad k \in \mathbb{Z}$`, w: r`$\arcsin(0{,}5) = \frac{\pi}{6}$ (Wertetabelle, $\sin(30°) = 0{,}5$). $\pi - \frac{\pi}{6} = \frac{5\pi}{6}$.` },
        { t: r`2) $f(x) = 0 \iff 2\sin(x) + 3 = 0 \quad | -3 \iff 2\sin(x) = -3 \quad | :2 \iff \sin(x) = -1{,}5$ ↯`, w: r`$-1{,}5 < -1$: Der Sinus erreicht diesen Wert nie (Blitz = Widerspruch).` },
        { t: r`$\Rightarrow$ Es gibt keine Nullstellen.`, w: r`Kontrolle mit dem Wertebereich: $[-2 + 3; 2 + 3] = [1; 5]$ enthält die 0 nicht.` },
      ],
      kern: r`Vor dem $\arcsin$ prüfen, ob $a$ zwischen $-1$ und $1$ liegt. Sonst gibt es keine Lösung.`,
      karten: ['vl10-nullstellen-12'],
    },
  ],
};
