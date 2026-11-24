// Vorlesung 12 (17.11.2026) durchgehen: Ableitungsfunktion, Tangente, Änderungsraten, erste Ableitungsregeln
const r = String.raw;

export default {
  unit: 'vl12',
  abschnitte: [
    {
      id: 'vl12-d01',
      folien: '3–4 und Notizseite',
      titel: 'Ableitungsfunktion am Beispiel $x^2$',
      folie: r`Ist $f: D \to \mathbb{R}$ an **jeder** Stelle $x \in D$ differenzierbar, heißt $f$ differenzierbar. Die Funktion, die jedem $x$ den Wert $f'(x)$ zuordnet, ist die **Ableitungsfunktion** $f'$.

Beispiel: $f(x) = x^2$`,
      notizen: [
        { t: r`An mehreren Stellen des Graphen von $y = x^2$ wird eine Tangente angelegt und ihre Steigung abgelesen.`, w: r`Die Ableitung an einer Stelle **ist** die Steigung der Tangente dort (VL 11). Man sammelt also Steigungen.` },
        { t: r`Abgelesen: an der Stelle $-2$ Steigung $-4$, bei $-1$ Steigung $-2$, bei $0$ Steigung $0$, bei $1$ Steigung $2$, bei $2$ Steigung $4$.`, w: r`Links fällt die Parabel (negative Steigung), im Tiefpunkt ist die Tangente waagerecht (Steigung 0), rechts steigt sie immer steiler.` },
        { t: r`Diese Wertepaare $(x \mid \text{Steigung})$ werden in ein zweites Koordinatensystem eingetragen. Sie liegen auf einer Geraden durch den Ursprung.`, w: r`Jeder Punkt im unteren Bild ist „Stelle $x$, Steigung an dieser Stelle“. Genau das ist ein Punkt des Graphen von $f'$.` },
        { t: r`$$f'(x) = 2x$$`, w: r`Die Gerade hat die Steigung 2 und geht durch den Ursprung. Der Steigungswert ist also immer das Doppelte der Stelle.` },
      ],
      plot: {
        x: [-2.5, 2.5], y: [-4.5, 5], u: 40,
        fns: [{ f: (x) => x * x }, { f: (x) => 2 * x }],
        points: [[-2, -4], [-1, -2], [0, 0], [1, 2], [2, 4]],
        labels: [{ at: [1.7, 4.4], text: 'x²' }, { at: [-1.9, -2.9], text: "f'(x) = 2x" }],
        alt: 'Parabel y = x² und die Gerade y = 2x mit den abgelesenen Steigungen als Punkten',
      },
      kern: r`Die Ableitungsfunktion ordnet jeder Stelle die Steigung des Graphen an dieser Stelle zu. Für $f(x) = x^2$ ist $f'(x) = 2x$.`,
      check: { frage: r`Welche Steigung hat $y = x^2$ an der Stelle $x = 3$?`, antwort: r`$f'(3) = 2 \cdot 3 = 6$.` },
      karten: ['vl12-ableitungsfunktion'],
    },
    {
      id: 'vl12-d02',
      folien: '5',
      titel: 'Woher kommt die Tangentengleichung?',
      folie: r`$$T_{f,x_0}(x) = f(x_0) + f'(x_0) \cdot (x - x_0)$$
Dazu ein Graph mit dem Berührpunkt $P$ bei $x_0$, der Tangente und einem Steigungsdreieck.`,
      notizen: [
        { t: r`Im Bild: Am Berührpunkt $P$ ist die Höhe $f(x_0)$. Weiter rechts bei $x$ liegt die Tangente auf der Höhe $y$.`, w: r`Gesucht ist, wie hoch die Tangente an einer beliebigen Stelle $x$ ist.` },
        { t: r`Steigungsdreieck: waagerecht die Strecke $x - x_0$ (grün), senkrecht der unbekannte Höhenunterschied „?“ (lila).`, w: r`Von $P$ aus geht man $x - x_0$ nach rechts. Wie viel es dabei nach oben geht, ist die Frage.` },
        { t: r`$$f'(x_0) = \frac{?}{x - x_0}$$`, w: r`Steigung = Höhenunterschied durch waagerechten Abstand. Die Steigung der Tangente ist $f'(x_0)$.` },
        { t: r`$$\Longleftrightarrow \quad f'(x_0) \cdot (x - x_0) = \;?$$`, w: r`Beide Seiten mit $(x - x_0)$ multiplizieren. Jetzt kennt man den Höhenunterschied.` },
        { t: r`Höhe der Tangente bei $x$: Starthöhe $f(x_0)$ (gelb) plus Höhenunterschied (lila): $T_{f,x_0}(x) = f(x_0) + f'(x_0)(x - x_0)$.`, w: r`Genau die Farben aus der Formel auf der Folie: gelb die Starthöhe, lila der Anstieg.` },
      ],
      kern: r`Tangente = Starthöhe $f(x_0)$ + Steigung $f'(x_0)$ mal Abstand $(x - x_0)$ vom Berührpunkt.`,
      check: { frage: r`Was bedeutet $(x - x_0)$ in der Formel?`, antwort: r`Wie weit man vom Berührpunkt $x_0$ nach rechts (bzw. bei negativem Wert nach links) geht.` },
      karten: ['vl12-tangentengleichung'],
    },
    {
      id: 'vl12-d03',
      folien: '6',
      titel: 'Beispiel: Tangente an $x^2$ bei $x_0 = 1$',
      folie: r`$f: \mathbb{R} \to \mathbb{R}$, $f(x) = x^2$, $x_0 = 1$`,
      notizen: [
        { t: r`$$T_{f,x_0}(x) = f(x_0) + f'(x_0) \cdot (x - x_0)$$`, w: r`Formel hinschreiben und farbig markieren, welche Zahl wo hinkommt.` },
        { t: r`Eben grafisch ermittelt: $f'(1) = 2$`, w: r`Aus dem Bild von Abschnitt 1 (oder mit $f'(x) = 2x$): $f'(1) = 2 \cdot 1 = 2$.` },
        { t: r`$f(1) = 1$, d. h. $P(1 \mid 1)$`, w: r`Der Berührpunkt: $1^2 = 1$.` },
        { t: r`$\Rightarrow$ Tangentengleichung an $f$ an der Stelle 1: $$T_{f,1}(x) = 1 + 2 \cdot (x - 1)$$`, w: r`Einsetzen: gelb $f(1) = 1$, blau $f'(1) = 2$, grün $x_0 = 1$.` },
        { t: r`Vereinfacht (nicht auf der Folie): $T_{f,1}(x) = 1 + 2x - 2 = 2x - 1$`, w: r`Klammer ausmultiplizieren. So sieht man direkt Steigung 2 und y-Achsenabschnitt $-1$.` },
      ],
      plot: {
        x: [-1.5, 2.5], y: [-2, 4.5], u: 44,
        fns: [{ f: (x) => x * x }, { f: (x) => 2 * x - 1 }],
        points: [[1, 1]],
        labels: [{ at: [1.35, 0.6], text: 'P(1|1)' }],
        alt: 'Parabel x² mit Tangente y = 2x − 1 im Punkt (1|1)',
      },
      kern: r`Drei Zutaten: $x_0$, $f(x_0)$ und $f'(x_0)$ bestimmen, dann einsetzen.`,
      check: { frage: r`Tangente an $f(x) = x^2$ bei $x_0 = -1$?`, antwort: r`$f(-1) = 1$, $f'(-1) = -2$, also $T(x) = 1 - 2(x + 1) = -2x - 1$.` },
      karten: ['vl12-tangente-aufgabe', 'vl12-tangente-uebung'],
    },
    {
      id: 'vl12-d04',
      folien: '7–8',
      titel: 'Ableitung als Änderungsrate: Weg und Zeit',
      folie: r`- $\Delta f = f(x_2) - f(x_1)$: absolute Änderung
- $\frac{\Delta f}{\Delta x} = \frac{f(x_2) - f(x_1)}{x_2 - x_1}$: relative (durchschnittliche) Änderung
- $f'(x_0) = \lim\limits_{\Delta x \to 0} \frac{f(x_0 + \Delta x) - f(x_0)}{\Delta x}$: lokale Änderungsrate

Beispiel: $s(t) = t^2$ ist der Weg in Metern nach $t$ Sekunden.`,
      notizen: [
        { t: r`$s(3) - s(1) = 3^2 - 1^2 = 8$: zurückgelegter Weg in Metern zwischen Sekunde 1 und Sekunde 3.`, w: r`Absolute Änderung: einfach Endwert minus Anfangswert.` },
        { t: r`$\frac{s(3) - s(1)}{3 - 1} = \frac{8}{2} = 4$: durchschnittliche Geschwindigkeit in m/s im Zeitraum von Sekunde 1 bis 3.`, w: r`Relative Änderung = Änderung pro Zeiteinheit. Das ist die Steigung der Sekante durch die Punkte bei $t = 1$ und $t = 3$.` },
        { t: r`$s'(1) = 2 \cdot 1 = 2$: Momentangeschwindigkeit in m/s zum Zeitpunkt $t = 1$.`, w: r`$s'(t) = 2t$ wie bei $x^2$. Die Ableitung ist die Geschwindigkeit in genau einem Moment, also die Tangentensteigung.` },
      ],
      kern: r`Differenz = wie viel hat sich geändert, Differenzenquotient = durchschnittlich pro Einheit, Ableitung = in genau diesem Moment.`,
      check: { frage: r`Wie schnell ist der Körper zum Zeitpunkt $t = 3$?`, antwort: r`$s'(3) = 2 \cdot 3 = 6$ m/s.` },
      karten: ['vl12-aenderungsraten', 'vl12-weg-zeit'],
    },
    {
      id: 'vl12-d05',
      folien: '9',
      titel: 'Beispiel: Kostenfunktion und Grenzkosten',
      folie: r`$K(x)$: Produktionskosten für $x$ Einheiten eines Gutes.
- $K(11000) - K(10000)$
- $\frac{K(11000) - K(10000)}{11000 - 10000} = \frac{K(11000) - K(10000)}{1000}$
- $K'(10000)$`,
      notizen: [
        { t: r`Einheit von $K$: Euro.`, w: r`Am Rand ergänzt. Hilft, jede Zeile zu deuten.` },
        { t: r`$K(11000) - K(10000)$: zusätzliche Produktionskosten für 1000 weitere Einheiten nach der Produktion von 10 000 Einheiten (in €).`, w: r`Absolute Änderung.` },
        { t: r`$\frac{K(11000) - K(10000)}{1000}$: durchschnittliche zusätzliche Produktionskosten pro Stück.`, w: r`Durch die Anzahl der zusätzlichen Stücke teilen: Kosten pro Stück.` },
        { t: r`$K'(10000)$: „Grenzkosten“, die Kosten für die Produktion **einer** zusätzlichen Einheit nach der Produktion von 10 000 Einheiten.`, w: r`Lokale Änderungsrate. In der BWL heißt sie Grenzkosten.` },
      ],
      kern: r`Dieselben drei Stufen wie bei Weg und Zeit: absolute Änderung, Durchschnitt pro Einheit, momentane Rate (Ableitung).`,
      karten: ['vl12-grenzkosten'],
    },
    {
      id: 'vl12-d06',
      folien: '11–12',
      titel: 'Potenzregel mit Beispielen',
      folie: r`$f(x) = x^k$ mit $k \in \mathbb{R}$ hat die Ableitung $$f'(x) = k \cdot x^{k-1}$$
Beispiele: 1) $x^{10}$ 2) $x$ 3) $\frac{1}{x^3}$ 4) $\sqrt[5]{x}$ 5) $1$`,
      notizen: [
        { t: r`1) $f'(x) = 10x^9$`, w: r`Exponent nach vorne, Exponent um 1 verringern.` },
        { t: r`2) $f(x) = x^1 \Rightarrow f'(x) = 1 \cdot x^0 = 1$`, w: r`$x$ als $x^1$ schreiben. $x^0 = 1$.` },
        { t: r`3) $f(x) = \frac{1}{x^3} = x^{-3} \Rightarrow f'(x) = -3x^{-4} = -\frac{3}{x^4}$`, w: r`Erst umschreiben ($\frac{1}{x^n} = x^{-n}$, VL 5), dann Potenzregel. Vorsicht: $-3 - 1 = -4$.` },
        { t: r`4) $f(x) = \sqrt[5]{x} = x^{\frac{1}{5}} \Rightarrow f'(x) = \frac{1}{5}x^{-\frac{4}{5}} = \frac{1}{5x^{\frac{4}{5}}} = \frac{1}{5\sqrt[5]{x^4}}$`, w: r`Wurzel als Potenz schreiben. $\frac{1}{5} - 1 = -\frac{4}{5}$. Danach zurück in Bruch- und Wurzelschreibweise.` },
        { t: r`5) $f(x) = 1 = x^0 \Rightarrow f'(x) = 0 \cdot x^{-1} = 0$`, w: r`Eine Konstante ändert sich nicht, ihre Ableitung ist 0.` },
      ],
      kern: r`Vor dem Ableiten alles in die Form $x^k$ bringen: Brüche mit negativem, Wurzeln mit gebrochenem Exponenten.`,
      check: { frage: r`$f(x) = \frac{1}{\sqrt{x}}$. Was ist $f'(x)$?`, antwort: r`$f(x) = x^{-\frac{1}{2}}$, also $f'(x) = -\frac{1}{2}x^{-\frac{3}{2}} = -\frac{1}{2\sqrt{x^3}}$.` },
      karten: ['vl12-potenzregel', 'vl12-potenz-aufgabe'],
    },
    {
      id: 'vl12-d07',
      folien: '13–15',
      titel: 'Faktor- und Summenregel mit Beispielen',
      folie: r`Faktorregel: $(c \cdot g(x))' = c \cdot g'(x)$

Summenregel: $(g(x) + h(x))' = g'(x) + h'(x)$

Beispiele: 1) $6x^2 + 2x - 1$ 2) $\frac{5}{2x^3}$ 3) $6\sqrt[3]{x}$ 4) $\frac{2}{x^2} - 3\sqrt{x}$`,
      notizen: [
        { t: r`1) $f'(x) = 12x + 2$`, w: r`Summand für Summand: $6 \cdot 2x = 12x$, $2 \cdot 1 = 2$, die Konstante $-1$ fällt weg.` },
        { t: r`2) $f(x) = \frac{5}{2x^3} = \frac{5}{2}x^{-3} \Rightarrow f'(x) = -\frac{15}{2}x^{-4} = -\frac{15}{2x^4}$`, w: r`Den Faktor $\frac{5}{2}$ abtrennen, $\frac{1}{x^3} = x^{-3}$. Dann $\frac{5}{2} \cdot (-3) = -\frac{15}{2}$.` },
        { t: r`3) $f(x) = 6\sqrt[3]{x} = 6x^{\frac{1}{3}} \Rightarrow f'(x) = 2x^{-\frac{2}{3}} = \frac{2}{x^{\frac{2}{3}}} = \frac{2}{\sqrt[3]{x^2}}$`, w: r`$6 \cdot \frac{1}{3} = 2$ und $\frac{1}{3} - 1 = -\frac{2}{3}$.` },
        { t: r`4) $f(x) = \frac{2}{x^2} - 3\sqrt{x} = 2x^{-2} - 3x^{\frac{1}{2}}$`, w: r`Beide Summanden umschreiben.` },
        { t: r`$\Rightarrow f'(x) = -4x^{-3} - \frac{3}{2}x^{-\frac{1}{2}} = -\frac{4}{x^3} - \frac{3}{2\sqrt{x}}$`, w: r`$2 \cdot (-2) = -4$ und $-3 \cdot \frac{1}{2} = -\frac{3}{2}$. Zum Schluss wieder als Brüche schreiben.` },
      ],
      kern: r`Konstante Faktoren bleiben stehen, Summen werden Glied für Glied abgeleitet, Konstanten fallen weg.`,
      check: { frage: r`$f(x) = 4x^3 - \frac{1}{x}$. $f'(x) = ?$`, antwort: r`$f(x) = 4x^3 - x^{-1}$, also $f'(x) = 12x^2 + x^{-2} = 12x^2 + \frac{1}{x^2}$.` },
      karten: ['vl12-faktor-summe', 'vl12-regeln-aufgabe'],
    },
    {
      id: 'vl12-d08',
      folien: '16',
      titel: 'Ableitung der Sinusfunktion',
      folie: r`$f(x) = \sin(x)$ ist differenzierbar und $$f'(x) = \cos(x)$$`,
      notizen: [
        { t: r`Am Sinusgraphen werden waagerechte Tangenten an Hoch- und Tiefpunkten eingezeichnet (bei $-\frac{3\pi}{2}, -\frac{\pi}{2}, \frac{\pi}{2}, \frac{3\pi}{2}, \frac{5\pi}{2}$).`, w: r`Dort ist die Steigung 0. Also hat $f'$ dort Nullstellen.` },
        { t: r`In den Nullstellen des Sinus ($0, \pm\pi, \pm 2\pi, \dots$) ist er am steilsten: bei $0, \pm 2\pi$ Steigung $+1$, bei $\pm\pi, 3\pi$ Steigung $-1$.`, w: r`Bergauf durch die Achse: steigend, bergab: fallend.` },
        { t: r`Diese Steigungen unten eintragen und verbinden: Es entsteht genau der Graph von $\cos(x)$.`, w: r`Dasselbe Vorgehen wie bei $x^2$ in Abschnitt 1, nur mit dem Sinus.` },
      ],
      plot: {
        x: [-6.5, 9.5], y: [-1.5, 1.5], pi: true, piEvery: 2,
        fns: [{ f: Math.sin }, { f: Math.cos }],
        labels: [{ at: [7.9, 1.3], text: 'sin' }, { at: [6.8, -1.3], text: 'cos' }],
        alt: 'Sinus- und Kosinusgraph übereinander: Wo der Sinus waagerecht ist, hat der Kosinus Nullstellen',
      },
      kern: r`$\sin'(x) = \cos(x)$: Wo der Sinus Hoch- oder Tiefpunkte hat, ist der Kosinus null.`,
      karten: ['vl12-sin'],
    },
    {
      id: 'vl12-d09',
      folien: '17',
      titel: 'Ableitung von Exponentialfunktionen',
      folie: r`$f(x) = a^x$ mit $a > 0$ ist differenzierbar und $$f'(x) = \ln(a) \cdot a^x$$`,
      notizen: [
        { t: r`Spezialfall: $f(x) = e^x$`, w: r`Die wichtigste Exponentialfunktion, Basis $a = e$.` },
        { t: r`$\Rightarrow f'(x) = \ln(e) \cdot e^x = e^x$`, w: r`$\ln(e) = 1$, weil $e^1 = e$. Die e-Funktion ist ihre eigene Ableitung.` },
      ],
      kern: r`$(a^x)' = \ln(a) \cdot a^x$ und $(e^x)' = e^x$. Nicht mit der Potenzregel verwechseln: Bei $a^x$ steht $x$ im Exponenten.`,
      check: { frage: r`$f(x) = 2^x$. $f'(x) = ?$`, antwort: r`$f'(x) = \ln(2) \cdot 2^x \approx 0{,}693 \cdot 2^x$. (Nicht $x \cdot 2^{x-1}$!)` },
      karten: ['vl12-exp', 'vl12-potenz-vs-exp-mc'],
    },
  ],
};
