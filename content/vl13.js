// Vorlesung 13 (23.11.2026): Ableitung von Logarithmus- und Arkusfunktionen, Kettenregel, Produktregel
const r = String.raw;

const KETTE = r`VL 13, Folie 8 (Kettenregel): $f(x) = u(v(x)) \Rightarrow f'(x) = u'(v(x)) \cdot v'(x)$`;
const PRODUKT = r`VL 13, Folie 12 (Produktregel): $(g \cdot h)' = g' \cdot h + g \cdot h'$`;
const POTENZ = r`VL 12, Folie 11 (Potenzregel): $(x^k)' = k \cdot x^{k-1}$`;
const EXP = r`VL 12, Folie 17: $(a^x)' = \ln(a) \cdot a^x$, $(e^x)' = e^x$`;
const TRIG = r`VL 12, Folie 16: $(\sin x)' = \cos x$; $(\cos x)' = -\sin x$`;
const LOG = r`VL 13, Folie 3: $(\log_a x)' = \frac{1}{\ln(a)} \cdot \frac{1}{x}$, $(\ln x)' = \frac{1}{x}$`;
const WURZEL = r`VL 5, Folie 3: $\sqrt[n]{x^m} = x^{\frac{m}{n}}$ und $x^{-n} = \frac{1}{x^n}$`;

export default {
  id: 'vl13',
  art: 'vorlesung',
  nummer: 13,
  datum: '2026-11-23',
  titel: 'Kettenregel und Produktregel',
  ueberblick: r`Ableitungen von $\log_a(x)$, $\ln(x)$ und den Arkusfunktionen, verkettete Funktionen mit innerer und äußerer Funktion, die **Kettenregel** und die **Produktregel**, jeweils mit Beispielen aus der Vorlesung.`,

  karten: [
    {
      id: 'vl13-log-ableitung',
      typ: 'formel',
      thema: 'Ableitungsregeln',
      quelle: 'VL 13, Folie 3',
      frage: r`Was ist die Ableitung von $\log_a(x)$ und von $\ln(x)$?`,
      antwort: r`Für $f: (0; \infty) \to \mathbb{R}$, $f(x) = \log_a(x)$ mit $a > 0$, $a \ne 1$:

$$f'(x) = \frac{1}{\ln(a)} \cdot \frac{1}{x}$$

Spezialfall $f(x) = \ln(x)$: $\ f'(x) = \frac{1}{\ln(e)} \cdot \frac{1}{x} = \frac{1}{x}$`,
      merke: r`$(\ln x)' = \frac{1}{x}$ gehört aufs Formelblatt. Beim allgemeinen Logarithmus kommt der Faktor $\frac{1}{\ln(a)}$ dazu.`,
    },
    {
      id: 'vl13-arkus-ableitung',
      typ: 'formel',
      thema: 'Ableitungsregeln',
      quelle: 'VL 13, Folie 4',
      frage: r`Was sind die Ableitungen von $\arcsin$, $\arccos$ und $\arctan$?`,
      antwort: r`$$(\arcsin x)' = \frac{1}{\sqrt{1 - x^2}}, \qquad (\arccos x)' = -\frac{1}{\sqrt{1 - x^2}}, \qquad (\arctan x)' = \frac{1}{1 + x^2}$$

$\arcsin$ und $\arccos$ sind auf $[-1; 1]$ definiert, $\arctan$ auf ganz $\mathbb{R}$.`,
      merke: r`$\arcsin$ und $\arccos$ unterscheiden sich nur im Vorzeichen. Bei $\arctan$ steht „$1 + x^2$“ ohne Wurzel.`,
    },
    {
      id: 'vl13-verkettung',
      typ: 'definition',
      thema: 'Ableitungsregeln',
      quelle: 'VL 13, Folie 6',
      frage: r`Was ist eine verkettete Funktion? Was sind innere und äußere Funktion?`,
      antwort: r`Bei $f(x) = u(v(x))$ wird erst $v$ auf $x$ angewendet, dann $u$ auf das Ergebnis.

- $v$: **innere Funktion** (wird zuerst ausgerechnet)
- $u$: **äußere Funktion** (wird auf das Ergebnis angewendet)

Beispiel: $f(x) = (2x + 3)^2$ mit $v(x) = 2x + 3$ und $u(z) = z^2$.`,
      merke: r`Frag dich: Was würde ich beim Einsetzen einer Zahl **zuerst** ausrechnen? Das ist die innere Funktion. Bei $x = 1$: erst $2 \cdot 1 + 3 = 5$, dann $5^2 = 25$.`,
    },
    {
      id: 'vl13-verkettung-aufgabe',
      typ: 'aufgabe',
      thema: 'Ableitungsregeln',
      quelle: 'VL 13, Folie 7 (Beispiele)',
      herkunft: 'vorlesung',
      rezept: 'vl13-verkettung',
      frage: r`Bestimme innere und äußere Funktion:
a) $f(x) = (2x + 3)^2$ $\quad$ b) $f(x) = \sqrt{4x - x^2}$

Berechne zur Kontrolle bei a) $f(1)$ über innere und äußere Funktion.`,
      tipps: [r`Innen steht, was in der Klammer bzw. unter der Wurzel steht.`],
      schritte: [
        { t: r`a) innere Funktion $v(x) = 2x + 3$, äußere Funktion $u(z) = z^2$`, w: r`Erst wird $2x + 3$ ausgerechnet, dann quadriert.` },
        { t: r`Kontrolle bei $x = 1$: $v(1) = 5$, $u(5) = 25$, und direkt $f(1) = (2 \cdot 1 + 3)^2 = 5^2 = 25$.`, w: r`Beides gibt dasselbe: $f(x) = u(v(x))$.` },
        { t: r`b) innere Funktion $v(x) = 4x - x^2$, äußere Funktion $u(z) = \sqrt{z}$`, w: r`Erst den Term unter der Wurzel ausrechnen, dann die Wurzel ziehen.` },
      ],
      ergebnis: r`a) $v(x) = 2x + 3$, $u(z) = z^2$, $f(1) = 25$; $\ $ b) $v(x) = 4x - x^2$, $u(z) = \sqrt{z}$`,
      fehler: [r`Innen und außen vertauschen: Innen ist, was zuerst berechnet wird.`],
    },
    {
      id: 'vl13-kettenregel',
      typ: 'formel',
      thema: 'Ableitungsregeln',
      quelle: 'VL 13, Folie 8',
      frage: r`Wie lautet die Kettenregel?`,
      antwort: r`Für $f(x) = u(v(x))$ mit differenzierbaren $u$ und $v$:

$$f'(x) = u'(v(x)) \cdot v'(x)$$

„Äußere Ableitung (an der Stelle der inneren Funktion) mal innere Ableitung.“`,
      merke: r`Ablauf: 1) $v$ und $u$ festlegen, 2) $v'$ und $u'$ ausrechnen, 3) in $u'$ für $z$ die innere Funktion $v(x)$ einsetzen, 4) mit $v'(x)$ multiplizieren.`,
    },
    {
      id: 'vl13-kette-wurzel',
      typ: 'aufgabe',
      thema: 'Ableitungsregeln',
      quelle: 'VL 13, Folie 9, Beispiel 1',
      herkunft: 'vorlesung',
      rezept: 'vl13-kettenregel',
      frage: r`Leite ab: $f(x) = \sqrt{4x - x^2}$`,
      tipps: [r`Innere Funktion: der Term unter der Wurzel.`, r`$\sqrt{z} = z^{\frac{1}{2}}$, also $u'(z) = \frac{1}{2}z^{-\frac{1}{2}} = \frac{1}{2\sqrt{z}}$.`],
      schritte: [
        { t: r`Verkettete Funktion mit innerer Funktion $v(x) = 4x - x^2 \Rightarrow v'(x) = 4 - 2x$`, q: POTENZ },
        { t: r`äußere Funktion $u(z) = \sqrt{z} = z^{\frac{1}{2}} \Rightarrow u'(z) = \frac{1}{2}z^{-\frac{1}{2}} = \frac{1}{2\sqrt{z}}$`, w: r`Wurzel erst als Potenz schreiben, dann Potenzregel.`, q: WURZEL },
        { t: r`$f'(x) = u'(v(x)) \cdot v'(x) = \frac{1}{2\sqrt{4x - x^2}} \cdot (4 - 2x)$`, w: r`In $u'$ für $z$ die innere Funktion einsetzen, dann mit $v'$ malnehmen.`, q: KETTE },
        { t: r`$= \frac{4 - 2x}{2\sqrt{4x - x^2}} = \frac{2(2 - x)}{2\sqrt{4x - x^2}} = \frac{2 - x}{\sqrt{4x - x^2}}$`, w: r`Im Zähler 2 ausklammern und kürzen.` },
      ],
      ergebnis: r`$f'(x) = \dfrac{2 - x}{\sqrt{4x - x^2}}$`,
      fehler: [r`Die innere Ableitung $(4 - 2x)$ vergessen.`, r`In $u'$ nur $\frac{1}{2\sqrt{x}}$ schreiben statt $\frac{1}{2\sqrt{4x - x^2}}$.`],
    },
    {
      id: 'vl13-kette-exp-cos',
      typ: 'aufgabe',
      thema: 'Ableitungsregeln',
      quelle: 'VL 13, Folie 9, Beispiele 2 und 3',
      herkunft: 'vorlesung',
      rezept: 'vl13-kettenregel',
      frage: r`Leite mit der Kettenregel ab:
a) $f(x) = 2^{-x^2}$ $\quad$ b) $f(x) = \cos(x)$, geschrieben als $\sin\left(x + \frac{\pi}{2}\right)$`,
      tipps: [r`a) Innen steht der Exponent $-x^2$, außen $2^z$.`, r`b) Innen $x + \frac{\pi}{2}$, außen $\sin(z)$.`],
      schritte: [
        { t: r`a) innere Funktion $v(x) = -x^2$, $v'(x) = -2x$; äußere Funktion $u(z) = 2^z$, $u'(z) = \ln(2) \cdot 2^z$`, q: EXP },
        { t: r`$f'(x) = \ln(2) \cdot 2^{-x^2} \cdot (-2x)$`, w: r`In $u'$ für $z$ den Exponenten $-x^2$ einsetzen.`, q: KETTE },
        { t: r`b) $\cos(x) = \sin\left(x + \frac{\pi}{2}\right)$ mit $v(x) = x + \frac{\pi}{2}$, $v'(x) = 1$; $u(z) = \sin(z)$, $u'(z) = \cos(z)$`, w: r`Der Cosinus ist der um $\frac{\pi}{2}$ nach links verschobene Sinus (VL 9).`, q: TRIG },
        { t: r`$f'(x) = \cos\left(x + \frac{\pi}{2}\right) \cdot 1 = -\sin(x)$`, w: r`$\cos\left(x + \frac{\pi}{2}\right) = -\sin(x)$. So erklärt die Kettenregel $(\cos x)' = -\sin x$.` },
      ],
      ergebnis: r`a) $f'(x) = -2x \ln(2) \cdot 2^{-x^2}$; $\ $ b) $f'(x) = -\sin(x)$`,
      fehler: [r`Bei a) die Potenzregel benutzen: $x$ steht im Exponenten, also $(a^z)' = \ln(a)\,a^z$.`],
    },
    {
      id: 'vl13-kette-verschachtelt',
      typ: 'aufgabe',
      thema: 'Ableitungsregeln',
      quelle: 'VL 13, Folie 9, Beispiel 4',
      herkunft: 'vorlesung',
      rezept: 'vl13-kettenregel',
      frage: r`Leite ab: $f(x) = \cos\left(\sqrt[3]{x + 1} + e^{-x}\right)$`,
      tipps: [r`Außen $\cos(z)$, innen $v(x) = \sqrt[3]{x + 1} + e^{-x}$.`, r`Die Summanden von $v$ sind selbst verkettet: In Nebenrechnungen nochmal die Kettenregel.`],
      schritte: [
        { t: r`Verkettete Funktion mit $v(x) = \sqrt[3]{x + 1} + e^{-x}$ und $u(z) = \cos(z)$, $u'(z) = -\sin(z)$`, q: TRIG },
        { t: r`$v(x)$ ist eine Summe, und die beiden Summanden sind jeweils verkettete Funktionen. Nebenrechnungen:`, w: r`Summenregel: jeden Summanden einzeln ableiten.` },
        { t: r`$v_1(x) = x + 1$, $v_1'(x) = 1$; $u_1(z) = \sqrt[3]{z} = z^{\frac{1}{3}}$, $u_1'(z) = \frac{1}{3}z^{-\frac{2}{3}} = \frac{1}{3\sqrt[3]{z^2}}$ $$\Rightarrow \left(\sqrt[3]{x + 1}\right)' = \frac{1}{3\sqrt[3]{(x + 1)^2}} \cdot 1$$`, q: WURZEL },
        { t: r`$v_2(x) = -x$, $v_2'(x) = -1$; $u_2(z) = e^z$, $u_2'(z) = e^z$ $$\Rightarrow (e^{-x})' = e^{-x} \cdot (-1) = -e^{-x}$$`, q: EXP },
        { t: r`Also $v'(x) = \frac{1}{3\sqrt[3]{(x + 1)^2}} - e^{-x}$`, w: r`Beide Nebenrechnungen zusammensetzen.` },
        { t: r`$f'(x) = -\sin\left(\sqrt[3]{x + 1} + e^{-x}\right) \cdot \left(\frac{1}{3\sqrt[3]{(x + 1)^2}} - e^{-x}\right)$`, w: r`Äußere Ableitung an der Stelle $v(x)$ mal innere Ableitung.`, q: KETTE },
      ],
      ergebnis: r`$f'(x) = -\sin\left(\sqrt[3]{x + 1} + e^{-x}\right) \cdot \left(\dfrac{1}{3\sqrt[3]{(x + 1)^2}} - e^{-x}\right)$`,
      fehler: [r`$(e^{-x})' = e^{-x}$ schreiben: Die innere Ableitung $-1$ fehlt.`, r`Die Klammer um $v'(x)$ weglassen: Die ganze innere Ableitung wird multipliziert.`],
    },
    {
      id: 'vl13-kette-mc',
      typ: 'verstaendnis',
      thema: 'Ableitungsregeln',
      quelle: 'VL 13, Folie 8',
      herkunft: 'zusatz',
      frage: r`Was ist die Ableitung von $f(x) = e^{3x^2}$?`,
      optionen: [r`$6x \cdot e^{3x^2}$`, r`$e^{3x^2}$`, r`$e^{6x}$`, r`$3x^2 \cdot e^{3x^2 - 1}$`],
      richtig: 0,
      erklaerung: r`Kettenregel mit $v(x) = 3x^2$, $v'(x) = 6x$ und $u(z) = e^z$, $u'(z) = e^z$: $f'(x) = e^{3x^2} \cdot 6x$. Ohne die innere Ableitung fehlt der Faktor $6x$.`,
    },
    {
      id: 'vl13-produktregel',
      typ: 'formel',
      thema: 'Ableitungsregeln',
      quelle: 'VL 13, Folie 12',
      frage: r`Wie lautet die Produktregel?`,
      antwort: r`Für $f(x) = g(x) \cdot h(x)$ mit differenzierbaren $g$ und $h$:

$$f'(x) = g'(x) \cdot h(x) + g(x) \cdot h'(x)$$

Merkbild aus der Vorlesung: $g$ und $h$ links, $g'$ und $h'$ rechts untereinander, dann „über Kreuz“ multiplizieren.`,
      merke: r`$(g \cdot h)' \ne g' \cdot h'$. Ein Faktor wird abgeleitet, der andere bleibt, und das zweimal.`,
    },
    {
      id: 'vl13-produkt-einfuehrung',
      typ: 'aufgabe',
      thema: 'Ableitungsregeln',
      quelle: 'VL 13, Folien 11 und 13',
      herkunft: 'vorlesung',
      rezept: 'vl13-produktregel',
      frage: r`Leite $f(x) = (2x + 3) \cdot (3x + 2)$ auf zwei Arten ab: erst ausmultipliziert, dann mit der Produktregel.`,
      tipps: [r`Ausmultiplizieren: $(2x + 3)(3x + 2) = 6x^2 + 13x + 6$.`, r`Produktregel: $g = 2x + 3$, $h = 3x + 2$, dann $g' h + g h'$.`],
      schritte: [
        { t: r`Ausmultiplizieren: $f(x) = 6x^2 + 4x + 9x + 6 = 6x^2 + 13x + 6 \Rightarrow f'(x) = 12x + 13$`, q: POTENZ },
        { t: r`Produkt mit $g(x) = 2x + 3$, $g'(x) = 2$ und $h(x) = 3x + 2$, $h'(x) = 3$`, w: r`Beide Faktoren und ihre Ableitungen untereinander schreiben.` },
        { t: r`$f'(x) = 2 \cdot (3x + 2) + (2x + 3) \cdot 3 = 6x + 4 + 6x + 9 = 12x + 13$`, w: r`Über Kreuz: $g' \cdot h + g \cdot h'$. Beide Wege liefern dasselbe.`, q: PRODUKT },
      ],
      ergebnis: r`$f'(x) = 12x + 13$`,
      fehler: [r`$g' \cdot h' = 2 \cdot 3 = 6$ rechnen. Das ist falsch, wie der Vergleich mit dem ausmultiplizierten Weg zeigt.`],
    },
    {
      id: 'vl13-produkt-aufgabe',
      typ: 'aufgabe',
      thema: 'Ableitungsregeln',
      quelle: 'VL 13, Folie 14, Beispiele 1 und 2',
      herkunft: 'vorlesung',
      rezept: 'vl13-produktregel',
      frage: r`Leite mit der Produktregel ab:
a) $f(x) = (x^2 + 1) \cdot e^x$ $\quad$ b) $f(x) = \sin(x) \cdot \cos(x)$`,
      tipps: [r`a) $g = x^2 + 1$, $h = e^x$.`, r`b) Am Ende hilft $\sin^2(x) + \cos^2(x) = 1$.`],
      schritte: [
        { t: r`a) $g(x) = x^2 + 1$, $g'(x) = 2x$; $h(x) = e^x$, $h'(x) = e^x$`, q: EXP },
        { t: r`$f'(x) = 2x \cdot e^x + (x^2 + 1) \cdot e^x = e^x \cdot (x^2 + 2x + 1) = e^x \cdot (x + 1)^2$`, w: r`$e^x$ ausklammern, dann erste binomische Formel.`, q: PRODUKT },
        { t: r`b) $g(x) = \sin(x)$, $g'(x) = \cos(x)$; $h(x) = \cos(x)$, $h'(x) = -\sin(x)$`, q: TRIG },
        { t: r`$f'(x) = \cos(x) \cdot \cos(x) + \sin(x) \cdot (-\sin(x)) = \cos^2(x) - \sin^2(x)$`, q: PRODUKT },
        { t: r`$= 1 - \sin^2(x) - \sin^2(x) = 1 - 2\sin^2(x)$`, w: r`Trigonometrischer Pythagoras: $\sin^2(x) + \cos^2(x) = 1$, also $\cos^2(x) = 1 - \sin^2(x)$.` },
      ],
      ergebnis: r`a) $f'(x) = e^x (x + 1)^2$; $\ $ b) $f'(x) = \cos^2(x) - \sin^2(x) = 1 - 2\sin^2(x)$`,
      fehler: [r`$(\cos x)' = \sin x$ schreiben: Es ist $-\sin x$.`],
    },
    {
      id: 'vl13-produkt-ln',
      typ: 'aufgabe',
      thema: 'Ableitungsregeln',
      quelle: 'VL 13, Folie 14, Beispiel 3',
      herkunft: 'claude',
      rezept: 'vl13-produktregel',
      frage: r`Leite ab: $f(x) = \ln(2x) \cdot \left(-3x^2 + 1 - \dfrac{1}{x}\right)$`,
      tipps: [r`$g(x) = \ln(2x)$ ist selbst verkettet. Oder einfacher: $\ln(2x) = \ln(2) + \ln(x)$.`, r`$\frac{1}{x} = x^{-1}$.`],
      schritte: [
        { t: r`$g(x) = \ln(2x)$, $g'(x) = \frac{1}{2x} \cdot 2 = \frac{1}{x}$`, w: r`Kettenregel mit $v(x) = 2x$. Alternativ: $\ln(2x) = \ln(2) + \ln(x)$, und $\ln(2)$ ist eine Konstante.`, q: LOG + '. ' + KETTE },
        { t: r`$h(x) = -3x^2 + 1 - x^{-1}$, $h'(x) = -6x + x^{-2} = -6x + \frac{1}{x^2}$`, q: POTENZ },
        { t: r`$f'(x) = \frac{1}{x} \cdot \left(-3x^2 + 1 - \frac{1}{x}\right) + \ln(2x) \cdot \left(-6x + \frac{1}{x^2}\right)$`, q: PRODUKT },
        { t: r`$= -3x + \frac{1}{x} - \frac{1}{x^2} + \ln(2x) \cdot \left(-6x + \frac{1}{x^2}\right)$`, w: r`Den ersten Teil ausmultiplizieren.` },
      ],
      ergebnis: r`$f'(x) = -3x + \dfrac{1}{x} - \dfrac{1}{x^2} + \ln(2x)\left(-6x + \dfrac{1}{x^2}\right)$`,
      fehler: [r`$(\ln 2x)' = \frac{1}{2x}$: Die innere Ableitung 2 fehlt.`, r`$-(x^{-1})' = -(-x^{-2}) = +x^{-2}$: Vorzeichen beachten.`],
    },
    {
      id: 'vl13-regelwahl-mc',
      typ: 'verstaendnis',
      thema: 'Ableitungsregeln',
      quelle: 'VL 13, Folien 8 und 12',
      herkunft: 'zusatz',
      frage: r`Welche Regel braucht man für $f(x) = x^2 \cdot \sin(x)$?`,
      optionen: [r`Produktregel`, r`Kettenregel`, r`nur Potenzregel`, r`Summenregel`],
      richtig: 0,
      erklaerung: r`Zwei Funktionen von $x$ werden **multipliziert**: Produktregel. Die Kettenregel bräuchte man bei $\sin(x^2)$, wo eine Funktion **in** die andere eingesetzt wird.`,
    },
  ],

  formelblatt: [
    {
      id: 'fb-kette-produkt',
      titel: 'Kettenregel und Produktregel',
      inhalt: r`$(u(v(x)))' = u'(v(x)) \cdot v'(x)$; $\ (g \cdot h)' = g' h + g h'$`,
    },
    {
      id: 'fb-ableitung-log-arkus',
      titel: 'Ableitungen von Logarithmus und Arkusfunktionen',
      inhalt: r`$(\ln x)' = \frac{1}{x}$; $\ (\log_a x)' = \frac{1}{\ln(a)\,x}$; $\ (\arcsin x)' = \frac{1}{\sqrt{1 - x^2}}$; $\ (\arccos x)' = -\frac{1}{\sqrt{1 - x^2}}$; $\ (\arctan x)' = \frac{1}{1 + x^2}$`,
    },
  ],
};
