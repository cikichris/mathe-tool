// Vorlesung 12 (17.11.2026): Ableitungsfunktion, Tangentengleichung, Änderungsraten, erste Ableitungsregeln
const r = String.raw;

const POTENZ = r`VL 12, Folie 11 (Potenzregel): $(x^k)' = k \cdot x^{k-1}$ für alle $k \in \mathbb{R}$`;
const FAKTOR = r`VL 12, Folie 13 (Faktorregel): $(c \cdot g(x))' = c \cdot g'(x)$`;
const SUMME = r`VL 12, Folie 14 (Summenregel): $(g(x) + h(x))' = g'(x) + h'(x)$`;
const UMSCHREIBEN = r`VL 5, Folie 3: $\frac{1}{x^n} = x^{-n}$ und $\sqrt[n]{x^m} = x^{\frac{m}{n}}$`;

export default {
  id: 'vl12',
  art: 'vorlesung',
  nummer: 12,
  datum: '2026-11-17',
  titel: 'Ableitungsfunktion und erste Ableitungsregeln',
  ueberblick: r`Ableitungsfunktion, Tangentengleichung, die Ableitung als lokale Änderungsrate (Weg-Zeit, Grenzkosten) sowie Potenz-, Faktor- und Summenregel und die Ableitungen von $\sin$ und $a^x$. Die Folien 18 und 19 fehlen im PDF.`,

  karten: [
    {
      id: 'vl12-ableitungsfunktion',
      typ: 'definition',
      thema: 'Ableitung',
      quelle: 'VL 12, Folien 3 bis 4',
      frage: r`Was ist die Ableitungsfunktion $f'$?`,
      antwort: r`Ist $f: D \to \mathbb{R}$ an **jeder** Stelle $x \in D$ differenzierbar, heißt $f$ **differenzierbar**. Die Funktion, die jedem $x \in D$ den Wert $f'(x)$ zuordnet, heißt **Ableitungsfunktion** von $f$.

Beispiel: $f(x) = x^2$ hat die Ableitungsfunktion $f'(x) = 2x$.`,
      merke: r`$f'(x)$ gibt an jeder Stelle die Steigung des Graphen von $f$ an. Bei $x^2$: an der Stelle 1 Steigung 2, an der Stelle $-1$ Steigung $-2$, im Tiefpunkt Steigung 0.`,
    },
    {
      id: 'vl12-tangentengleichung',
      typ: 'formel',
      thema: 'Ableitung',
      quelle: 'VL 12, Folie 5',
      frage: r`Wie lautet die Gleichung der Tangente an den Graphen von $f$ an der Stelle $x_0$?`,
      antwort: r`$$T_{f,x_0}(x) = f(x_0) + f'(x_0) \cdot (x - x_0)$$

- $f(x_0)$: Höhe des Berührpunkts
- $f'(x_0)$: Steigung der Tangente
- $(x - x_0)$: wie weit man vom Berührpunkt nach rechts geht`,
      merke: r`Herleitung: Steigung $= \frac{\text{Höhenunterschied}}{x - x_0}$, also Höhenunterschied $= f'(x_0)(x - x_0)$. Dazu kommt die Starthöhe $f(x_0)$.`,
    },
    {
      id: 'vl12-tangente-aufgabe',
      typ: 'aufgabe',
      thema: 'Ableitung',
      quelle: 'VL 12, Folie 6 (Beispiel)',
      herkunft: 'vorlesung',
      rezept: 'vl12-tangentengleichung',
      frage: r`Bestimme die Gleichung der Tangente an $f(x) = x^2$ an der Stelle $x_0 = 1$.`,
      tipps: [r`Du brauchst $f(1)$ und $f'(1)$.`, r`$f'(x) = 2x$.`],
      schritte: [
        { t: r`$f(1) = 1$, also Berührpunkt $P(1; 1)$` },
        { t: r`$f'(x) = 2x \Rightarrow f'(1) = 2$`, q: POTENZ },
        { t: r`$T_{f,1}(x) = 1 + 2 \cdot (x - 1)$`, q: r`VL 12, Folie 5: $T_{f,x_0}(x) = f(x_0) + f'(x_0)(x - x_0)$` },
        { t: r`$= 2x - 1$`, w: r`Ausmultipliziert. Beide Formen sind richtig.` },
      ],
      plotLoesung: {
        x: [-1.6, 2.6], y: [-1.6, 4.4], u: 46,
        fns: [{ f: (x) => x * x }, { f: (x) => 2 * x - 1 }],
        points: [[1, 1]],
        alt: 'Parabel x² mit der Tangente 2x − 1, die sie im Punkt (1; 1) berührt',
      },
      ergebnis: r`$T_{f,1}(x) = 1 + 2(x - 1) = 2x - 1$`,
    },
    {
      id: 'vl12-tangente-uebung',
      typ: 'aufgabe',
      thema: 'Ableitung',
      quelle: 'Übungsvariante zu VL 12, Folien 5 und 6',
      herkunft: 'zusatz',
      rezept: 'vl12-tangentengleichung',
      frage: r`Bestimme die Gleichung der Tangente an $f(x) = x^3 - 2x$ an der Stelle $x_0 = 2$.`,
      tipps: [r`$f(2)$ ausrechnen, dann $f'(x)$ mit Potenz- und Summenregel.`],
      schritte: [
        { t: r`$f(2) = 8 - 4 = 4$` },
        { t: r`$f'(x) = 3x^2 - 2 \Rightarrow f'(2) = 10$`, q: POTENZ + '. ' + SUMME },
        { t: r`$T(x) = 4 + 10(x - 2) = 10x - 16$`, q: r`VL 12, Folie 5: $T_{f,x_0}(x) = f(x_0) + f'(x_0)(x - x_0)$` },
      ],
      ergebnis: r`$T(x) = 10x - 16$`,
    },
    {
      id: 'vl12-aenderungsraten',
      typ: 'definition',
      thema: 'Ableitung',
      quelle: 'VL 12, Folie 7',
      frage: r`Was bedeuten $\Delta f$, $\frac{\Delta f}{\Delta x}$ und $f'(x_0)$ als Änderungen?`,
      antwort: r`- $\Delta f = f(x_2) - f(x_1)$: **absolute Änderung** der Funktionswerte
- $\frac{\Delta f}{\Delta x} = \frac{f(x_2) - f(x_1)}{x_2 - x_1}$: **relative Änderung** (durchschnittliche Änderung pro Einheit)
- $f'(x_0) = \lim\limits_{\Delta x \to 0} \frac{f(x_0 + \Delta x) - f(x_0)}{\Delta x}$: **lokale Änderungsrate** (Änderung genau an der Stelle $x_0$)`,
      merke: r`Einheit von $f'$: Einheit von $f$ pro Einheit von $x$, z. B. m/s, €/Stück, °C/h.`,
    },
    {
      id: 'vl12-weg-zeit',
      typ: 'aufgabe',
      thema: 'Ableitung',
      quelle: 'VL 12, Folie 8 (Beispiel)',
      herkunft: 'vorlesung',
      rezept: 'vl12-aenderungsraten',
      frage: r`$s(t) = t^2$ gibt den bis zum Zeitpunkt $t$ (in s) zurückgelegten Weg in Metern an. Berechne und deute $s(3) - s(1)$, $\ \frac{s(3) - s(1)}{3 - 1}$ und $s'(1)$.`,
      tipps: [r`Absolute Änderung, durchschnittliche Änderung, lokale Änderung.`],
      schritte: [
        { t: r`$s(3) - s(1) = 9 - 1 = 8$: zurückgelegter Weg in Metern zwischen Sekunde 1 und Sekunde 3`, q: r`VL 12, Folie 7: absolute Änderung $\Delta f$` },
        { t: r`$\dfrac{s(3) - s(1)}{3 - 1} = \dfrac{8}{2} = 4$: durchschnittliche Geschwindigkeit in m/s von Sekunde 1 bis 3`, q: r`VL 12, Folie 7: relative Änderung $\frac{\Delta f}{\Delta x}$` },
        { t: r`$s'(t) = 2t \Rightarrow s'(1) = 2$: Momentangeschwindigkeit in m/s zum Zeitpunkt $t = 1$`, q: r`VL 12, Folie 7: lokale Änderungsrate. ` + POTENZ },
      ],
      ergebnis: r`8 m; $\ $ 4 m/s im Schnitt; $\ $ 2 m/s im Moment $t = 1$`,
    },
    {
      id: 'vl12-grenzkosten',
      typ: 'definition',
      thema: 'Ableitung',
      quelle: 'VL 12, Folie 9',
      frage: r`$K(x)$ sind die Produktionskosten in € für $x$ Einheiten. Was bedeuten $K(11000) - K(10000)$, $\frac{K(11000) - K(10000)}{1000}$ und $K'(10000)$?`,
      antwort: r`- $K(11000) - K(10000)$: zusätzliche Produktionskosten in € für 1000 weitere Einheiten nach der Produktion von 10 000 Einheiten
- $\frac{K(11000) - K(10000)}{1000}$: durchschnittliche zusätzliche Produktionskosten pro Stück
- $K'(10000)$: **Grenzkosten**, also (näherungsweise) die Kosten für eine zusätzliche Einheit nach der Produktion von 10 000 Einheiten`,
      merke: r`So sind auch die Deutungsfragen in Übung 6, Aufgabe 5 gemeint: $f'(x_0)$ ≈ Änderung von $f$, wenn $x$ um 1 steigt.`,
    },
    {
      id: 'vl12-potenzregel',
      typ: 'formel',
      thema: 'Ableitungsregeln',
      quelle: 'VL 12, Folie 11',
      frage: r`Wie lautet die Potenzregel?`,
      antwort: r`Für $f(x) = x^k$ mit $k \in \mathbb{R}$ gilt

$$f'(x) = k \cdot x^{k-1}$$

Exponent nach vorn, dann Exponent um 1 verringern.`,
      merke: r`Funktioniert auch für negative und gebrochene Exponenten. Deshalb Brüche und Wurzeln **erst als Potenz schreiben**: $\frac{1}{x^3} = x^{-3}$, $\sqrt[5]{x} = x^{\frac{1}{5}}$.`,
    },
    {
      id: 'vl12-potenz-aufgabe',
      typ: 'aufgabe',
      thema: 'Ableitungsregeln',
      quelle: 'VL 12, Folie 12 (Beispiele)',
      herkunft: 'vorlesung',
      rezept: 'vl12-potenzregel',
      frage: r`Leite ab:
1) $f(x) = x^{10}$ $\quad$ 2) $f(x) = x$ $\quad$ 3) $f(x) = \dfrac{1}{x^3}$ $\quad$ 4) $f(x) = \sqrt[5]{x}$ $\quad$ 5) $f(x) = 1$`,
      tipps: [r`Bei 3) bis 5) zuerst als Potenz $x^k$ schreiben.`],
      schritte: [
        { t: r`1) $f'(x) = 10x^9$`, q: POTENZ },
        { t: r`2) $f(x) = x^1 \Rightarrow f'(x) = 1 \cdot x^0 = 1$` },
        { t: r`3) $f(x) = x^{-3} \Rightarrow f'(x) = -3x^{-4} = -\dfrac{3}{x^4}$`, q: UMSCHREIBEN },
        { t: r`4) $f(x) = x^{\frac{1}{5}} \Rightarrow f'(x) = \dfrac{1}{5}x^{-\frac{4}{5}} = \dfrac{1}{5\sqrt[5]{x^4}}$`, w: r`$\frac{1}{5} - 1 = -\frac{4}{5}$.`, q: UMSCHREIBEN },
        { t: r`5) $f(x) = 1 = x^0 \Rightarrow f'(x) = 0 \cdot x^{-1} = 0$`, w: r`Konstanten fallen beim Ableiten weg.` },
      ],
      ergebnis: r`$10x^9$; $\ 1$; $\ -\frac{3}{x^4}$; $\ \frac{1}{5\sqrt[5]{x^4}}$; $\ 0$`,
      fehler: [
        r`$\frac{1}{x^3}$ als $\frac{1}{3x^2}$ ableiten: Erst umschreiben, dann Potenzregel.`,
        r`Beim negativen Exponenten falsch rechnen: $-3 - 1 = -4$, nicht $-2$.`,
      ],
    },
    {
      id: 'vl12-faktor-summe',
      typ: 'formel',
      thema: 'Ableitungsregeln',
      quelle: 'VL 12, Folien 13 und 14',
      frage: r`Wie lauten Faktorregel und Summenregel?`,
      antwort: r`**Faktorregel:** $f(x) = c \cdot g(x) \Rightarrow f'(x) = c \cdot g'(x)$ $\ (c \in \mathbb{R})$

**Summenregel:** $f(x) = g(x) + h(x) \Rightarrow f'(x) = g'(x) + h'(x)$`,
      merke: r`Ein konstanter Faktor bleibt stehen, eine konstante Zahl als Summand fällt weg. Summen leitet man Summand für Summand ab.`,
    },
    {
      id: 'vl12-regeln-aufgabe',
      typ: 'aufgabe',
      thema: 'Ableitungsregeln',
      quelle: 'VL 12, Folie 15 (Beispiele)',
      herkunft: 'vorlesung',
      rezept: 'vl12-faktor-summe',
      frage: r`Leite ab:
1) $f(x) = 6x^2 + 2x - 1$ $\quad$ 2) $f(x) = \dfrac{5}{2x^3}$ $\quad$ 3) $f(x) = 6\sqrt[3]{x}$ $\quad$ 4) $f(x) = \dfrac{2}{x^2} - 3\sqrt{x}$`,
      tipps: [r`Erst jeden Summanden als $c \cdot x^k$ schreiben.`, r`2) $\frac{5}{2x^3} = \frac{5}{2}x^{-3}$. 4) $2x^{-2} - 3x^{\frac{1}{2}}$.`],
      schritte: [
        { t: r`1) $f'(x) = 12x + 2$`, q: SUMME + '. ' + FAKTOR },
        { t: r`2) $f(x) = \dfrac{5}{2}x^{-3} \Rightarrow f'(x) = -\dfrac{15}{2}x^{-4} = -\dfrac{15}{2x^4}$`, q: UMSCHREIBEN + '. ' + FAKTOR },
        { t: r`3) $f(x) = 6x^{\frac{1}{3}} \Rightarrow f'(x) = 2x^{-\frac{2}{3}} = \dfrac{2}{\sqrt[3]{x^2}}$` },
        { t: r`4) $f(x) = 2x^{-2} - 3x^{\frac{1}{2}} \Rightarrow f'(x) = -4x^{-3} - \dfrac{3}{2}x^{-\frac{1}{2}} = -\dfrac{4}{x^3} - \dfrac{3}{2\sqrt{x}}$` },
      ],
      ergebnis: r`$12x + 2$; $\ -\frac{15}{2x^4}$; $\ \frac{2}{\sqrt[3]{x^2}}$; $\ -\frac{4}{x^3} - \frac{3}{2\sqrt{x}}$`,
    },
    {
      id: 'vl12-sin',
      typ: 'formel',
      thema: 'Ableitungsregeln',
      quelle: 'VL 12, Folie 16',
      frage: r`Was ist die Ableitung von $\sin(x)$?`,
      antwort: r`$$f(x) = \sin(x) \Rightarrow f'(x) = \cos(x)$$

Am Graphen: Wo der Sinus Hoch- und Tiefpunkte hat (Steigung 0), hat der Cosinus Nullstellen. Wo der Sinus am steilsten steigt ($x = 0$), hat der Cosinus den Wert 1.`,
      merke: r`Die Ableitung von $\cos(x)$ stand vermutlich auf den fehlenden Folien 18 und 19. Sie ist $-\sin(x)$.`,
    },
    {
      id: 'vl12-exp',
      typ: 'formel',
      thema: 'Ableitungsregeln',
      quelle: 'VL 12, Folie 17',
      frage: r`Was ist die Ableitung von $a^x$ und von $e^x$?`,
      antwort: r`Für $f(x) = a^x$ mit $a > 0$:

$$f'(x) = \ln(a) \cdot a^x$$

Spezialfall $a = e$: $\ f'(x) = \ln(e) \cdot e^x = e^x$. Die $e$-Funktion ist ihre eigene Ableitung.`,
      merke: r`Nicht mit der Potenzregel verwechseln: $(x^3)' = 3x^2$, aber $(3^x)' = \ln(3) \cdot 3^x$. Steht $x$ im Exponenten, gilt die Potenzregel **nicht**.`,
    },
    {
      id: 'vl12-potenz-vs-exp-mc',
      typ: 'verstaendnis',
      thema: 'Ableitungsregeln',
      quelle: 'VL 12, Folien 11 und 17',
      herkunft: 'zusatz',
      frage: r`Was ist die Ableitung von $f(x) = 2^x$?`,
      optionen: [r`$\ln(2) \cdot 2^x$`, r`$x \cdot 2^{x-1}$`, r`$2^x$`, r`$2x$`],
      richtig: 0,
      erklaerung: r`Die Variable steht im Exponenten, also ist es eine Exponentialfunktion: $(a^x)' = \ln(a) \cdot a^x$. Die Potenzregel gilt nur, wenn $x$ in der Basis steht.`,
    },
  ],

  formelblatt: [
    {
      id: 'fb-ableitungsregeln',
      titel: 'Ableitungsregeln',
      inhalt: r`$(x^k)' = k x^{k-1}$; $\ (c \cdot g)' = c g'$; $\ (g + h)' = g' + h'$; $\ (\sin x)' = \cos x$; $\ (\cos x)' = -\sin x$; $\ (a^x)' = \ln(a)\,a^x$; $\ (e^x)' = e^x$; Konstante: $0$`,
    },
    {
      id: 'fb-tangente',
      titel: 'Tangentengleichung',
      inhalt: r`$T_{f,x_0}(x) = f(x_0) + f'(x_0)(x - x_0)$`,
    },
  ],
};
