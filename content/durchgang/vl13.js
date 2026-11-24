// Vorlesung 13 (23.11.2026) durchgehen: Ableitung von log und Arkusfunktionen, Kettenregel, Produktregel
const r = String.raw;

export default {
  unit: 'vl13',
  abschnitte: [
    {
      id: 'vl13-d01',
      folien: '3',
      titel: 'Ableitung von Logarithmusfunktionen',
      folie: r`$f(x) = \log_a(x)$ mit $a > 0$, $a \ne 1$ ist auf $(0; \infty)$ differenzierbar: $$f'(x) = \frac{1}{\ln(a)} \cdot \frac{1}{x}$$`,
      notizen: [
        { t: r`Spezialfall: $f(x) = \ln(x)$`, w: r`$\ln$ ist der Logarithmus zur Basis $e$.` },
        { t: r`$\Rightarrow f'(x) = \frac{1}{\ln(e)} \cdot \frac{1}{x} = \frac{1}{x}$`, w: r`$\ln(e) = 1$, der Vorfaktor fällt weg.` },
      ],
      kern: r`$(\ln x)' = \frac{1}{x}$, allgemein $(\log_a x)' = \frac{1}{\ln(a) \cdot x}$.`,
      check: { frage: r`$(\log_2 x)' = ?$`, antwort: r`$\frac{1}{\ln(2) \cdot x}$` },
      karten: ['vl13-log-ableitung'],
    },
    {
      id: 'vl13-d02',
      folien: '4',
      titel: 'Ableitung der Arkusfunktionen',
      folie: r`$(\arcsin x)' = \frac{1}{\sqrt{1 - x^2}}$ auf $[-1; 1]$

$(\arccos x)' = -\frac{1}{\sqrt{1 - x^2}}$ auf $[-1; 1]$

$(\arctan x)' = \frac{1}{1 + x^2}$ auf $\mathbb{R}$`,
      kern: r`$\arcsin$ und $\arccos$ haben bis aufs Vorzeichen dieselbe Ableitung, $\arctan$ hat $\frac{1}{1 + x^2}$.`,
      karten: ['vl13-arkus-ableitung'],
    },
    {
      id: 'vl13-d03',
      folien: '6–7',
      titel: 'Verkettete Funktionen: innen und außen',
      folie: r`$f(x) = u(v(x))$ heißt Verkettung mit **äußerer** Funktion $u$ und **innerer** Funktion $v$ (der Wertebereich von $v$ muss im Definitionsbereich von $u$ liegen).

Beispiele: 1) $f(x) = (2x + 3)^2$ 2) $f(x) = \sqrt{4x - x^2}$`,
      notizen: [
        { t: r`1) verkettete Funktion mit innerer Funktion $v(x) = 2x + 3$ und äußerer Funktion $u(z) = z^2$`, w: r`Was in der Klammer steht, wird zuerst berechnet: innen.` },
        { t: r`Z. B. $x = 1$: $v(1) = 5$, $u(5) = 25$, und $f(1) = (2 \cdot 1 + 3)^2 = 5^2 = 25$`, w: r`Farbig verfolgt: Die 1 geht in die innere Funktion, deren Ergebnis 5 in die äußere. So sieht man, was „verkettet“ bedeutet.` },
        { t: r`2) verkettete Funktion mit innerer Funktion $v(x) = 4x - x^2$ und äußerer Funktion $u(z) = \sqrt{z}$`, w: r`Erst unter der Wurzel rechnen, dann Wurzel ziehen.` },
      ],
      kern: r`Innen ist, was beim Einsetzen einer Zahl zuerst ausgerechnet wird.`,
      check: { frage: r`Innere und äußere Funktion von $\sin(3x)$?`, antwort: r`Innen $v(x) = 3x$, außen $u(z) = \sin(z)$.` },
      karten: ['vl13-verkettung', 'vl13-verkettung-aufgabe'],
    },
    {
      id: 'vl13-d04',
      folien: '8–9 und Notizseite',
      titel: r`Kettenregel, Beispiel 1: $\sqrt{4x - x^2}$`,
      folie: r`Kettenregel: $f(x) = u(v(x)) \Rightarrow f'(x) = u'(v(x)) \cdot v'(x)$`,
      notizen: [
        { t: r`$f(x) = \sqrt{4x - x^2}$, also $f(x) = u(v(x))$, verkettete Funktion mit`, w: r`` },
        { t: r`innere Funktion $v(x) = 4x - x^2 \Rightarrow v'(x) = 4 - 2x$`, w: r`Potenzregel und Summenregel.` },
        { t: r`äußere Funktion $u(z) = \sqrt{z} = z^{\frac{1}{2}} \Rightarrow u'(z) = \frac{1}{2}z^{-\frac{1}{2}} = \frac{1}{2\sqrt{z}}$`, w: r`Wurzel als Potenz schreiben, Potenzregel anwenden, wieder als Bruch schreiben.` },
        { t: r`$\Rightarrow f'(x) = \underbrace{\frac{1}{2\sqrt{4x - x^2}}}_{u'(v(x))} \cdot \underbrace{(4 - 2x)}_{v'(x)}$`, w: r`Grün markiert: Für $z$ wird die ganze innere Funktion $4x - x^2$ eingesetzt.` },
        { t: r`$= \frac{4 - 2x}{2\sqrt{4x - x^2}} = \frac{2 \cdot (2 - x)}{2\sqrt{4x - x^2}} = \frac{2 - x}{\sqrt{4x - x^2}}$`, w: r`2 ausklammern und kürzen.` },
      ],
      kern: r`Kettenregel: äußere Ableitung mit der inneren Funktion darin, mal innere Ableitung.`,
      karten: ['vl13-kettenregel', 'vl13-kette-wurzel'],
    },
    {
      id: 'vl13-d05',
      folien: '9 und Notizseite',
      titel: r`Beispiele 2 und 3: $2^{-x^2}$ und $\cos(x)$`,
      folie: r`2) $f(x) = 2^{-x^2}$ 3) $f(x) = \cos(x)$`,
      notizen: [
        { t: r`2) innere Funktion $v(x) = -x^2$, $v'(x) = -2x$; äußere Funktion $u(z) = 2^z$, $u'(z) = \ln(2) \cdot 2^z$`, w: r`Ableitung der Exponentialfunktion aus VL 12.` },
        { t: r`$\Rightarrow f'(x) = \ln(2) \cdot 2^{-x^2} \cdot (-2x)$`, w: r`Für $z$ die innere Funktion $-x^2$ einsetzen.` },
        { t: r`3) $f(x) = \cos(x) = \sin\left(x + \frac{\pi}{2}\right)$, verkettet mit $v(x) = x + \frac{\pi}{2}$, $v'(x) = 1$ und $u(z) = \sin(z)$, $u'(z) = \cos(z)$`, w: r`Der Cosinus ist der um $\frac{\pi}{2}$ nach links verschobene Sinus (VL 9, Folie 9).` },
        { t: r`$\Rightarrow f'(x) = \cos\left(x + \frac{\pi}{2}\right) \cdot 1 = -\sin(x)$`, w: r`So folgt $(\cos x)' = -\sin x$ aus $(\sin x)' = \cos x$.` },
      ],
      kern: r`Auch $(\cos x)' = -\sin x$ lässt sich mit der Kettenregel herleiten.`,
      karten: ['vl13-kette-exp-cos', 'vl13-kette-mc'],
    },
    {
      id: 'vl13-d06',
      folien: '9 und Notizseiten',
      titel: r`Beispiel 4: $\cos\left(\sqrt[3]{x + 1} + e^{-x}\right)$`,
      folie: r`4) $f(x) = \cos\left(\sqrt[3]{x + 1} + e^{-x}\right)$`,
      notizen: [
        { t: r`Verkettete Funktion mit $v(x) = \sqrt[3]{x + 1} + e^{-x}$ und $u(z) = \cos(z)$, $u'(z) = -\sin(z)$`, w: r`` },
        { t: r`„$v(x)$ ist eine Summe, und die beiden Summanden sind jeweils verkettete Funktionen.“ Nebenrechnungen:`, w: r`Kettenregel innerhalb der Kettenregel.` },
        { t: r`$v_1(x) = x + 1$, $v_1'(x) = 1$; $u_1(z) = \sqrt[3]{z} = z^{\frac{1}{3}}$, $u_1'(z) = \frac{1}{3}z^{-\frac{2}{3}} = \frac{1}{3\sqrt[3]{z^2}}$ $\Rightarrow \left(\sqrt[3]{x + 1}\right)' = \frac{1}{3\sqrt[3]{(x + 1)^2}} \cdot 1$`, w: r`` },
        { t: r`$v_2(x) = -x$, $v_2'(x) = -1$; $u_2(z) = e^z$, $u_2'(z) = e^z$ $\Rightarrow (e^{-x})' = e^{-x} \cdot (-1) = -e^{-x}$`, w: r`Typischer Fehler: das Minus aus der inneren Ableitung vergessen.` },
        { t: r`$v'(x) = \frac{1}{3\sqrt[3]{(x + 1)^2}} - e^{-x}$`, w: r`` },
        { t: r`$\Rightarrow f'(x) = -\sin\left(\sqrt[3]{x + 1} + e^{-x}\right) \cdot \left(\frac{1}{3\sqrt[3]{(x + 1)^2}} - e^{-x}\right)$`, w: r`Die ganze innere Ableitung in Klammern.` },
      ],
      kern: r`Bei verschachtelten Funktionen Nebenrechnungen machen und von innen nach außen ableiten.`,
      karten: ['vl13-kette-verschachtelt'],
    },
    {
      id: 'vl13-d07',
      folien: '11–13',
      titel: 'Produktregel mit Einführungsbeispiel',
      folie: r`$f(x) = (2x + 3) \cdot (3x + 2)$

Produktregel: $f(x) = g(x) \cdot h(x) \Rightarrow f'(x) = g'(x) \cdot h(x) + g(x) \cdot h'(x)$`,
      notizen: [
        { t: r`Erst ausmultipliziert: $f(x) = 6x^2 + 4x + 9x + 6 = 6x^2 + 13x + 6 \Rightarrow f'(x) = 12x + 13$`, w: r`So weiß man schon, was herauskommen muss.` },
        { t: r`Produkt mit $g(x) = 2x + 3$, $g'(x) = 2$ und $h(x) = 3x + 2$, $h'(x) = 3$`, w: r`Falsch wäre $g' \cdot h' = 6$. Das passt nicht zu $12x + 13$.` },
        { t: r`Merkbild: $g$ und $h$ links, $g'$ und $h'$ rechts, dann über Kreuz verbinden.`, w: r`Jedes Kreuz-Paar ist ein Summand: $g' \cdot h$ und $g \cdot h'$.` },
        { t: r`$\Rightarrow f'(x) = 2 \cdot (3x + 2) + (2x + 3) \cdot 3 = 6x + 4 + 6x + 9 = 12x + 13$`, w: r`Gleiches Ergebnis wie ausmultipliziert.` },
      ],
      kern: r`$(g \cdot h)' = g' h + g h'$, also über Kreuz. Nicht einfach die Ableitungen multiplizieren.`,
      karten: ['vl13-produktregel', 'vl13-produkt-einfuehrung', 'vl13-regelwahl-mc'],
    },
    {
      id: 'vl13-d08',
      folien: '14 und Notizseiten',
      titel: r`Produktregel: $(x^2 + 1)e^x$ und $\sin(x)\cos(x)$`,
      folie: r`1) $f(x) = (x^2 + 1) \cdot e^x$ 2) $f(x) = \sin(x) \cdot \cos(x)$ 3) $f(x) = \ln(2x) \cdot \left(-3x^2 + 1 - \frac{1}{x}\right)$`,
      notizen: [
        { t: r`1) Produkt mit $g(x) = x^2 + 1$, $g'(x) = 2x$; $h(x) = e^x$, $h'(x) = e^x$`, w: r`` },
        { t: r`$\Rightarrow f'(x) = e^x \cdot (x^2 + 1) + 2x \cdot e^x = e^x \cdot (x^2 + 2x + 1) = e^x \cdot (x + 1)^2$`, w: r`$e^x$ ausklammern, dann erste binomische Formel.` },
        { t: r`2) Produkt mit $g(x) = \sin(x)$, $g'(x) = \cos(x)$; $h(x) = \cos(x)$, $h'(x) = -\sin(x)$`, w: r`` },
        { t: r`$\Rightarrow f'(x) = \sin(x) \cdot (-\sin(x)) + \cos(x) \cdot \cos(x) = -\sin^2(x) + \cos^2(x)$`, w: r`$(\sin x)^2$ schreibt man kurz $\sin^2(x)$.` },
        { t: r`$= -\sin^2(x) + 1 - \sin^2(x) = 1 - 2\sin^2(x)$`, w: r`Trigonometrischer Pythagoras: $\sin^2(x) + \cos^2(x) = 1 \iff \cos^2(x) = 1 - \sin^2(x)$.` },
        { t: r`Beispiel 3 wurde in der Vorlesung nicht mehr gerechnet. Die Lösung steht in der Karte „Leite ab: $\ln(2x) \cdot \dots$“.`, w: r`Ergebnis: $-3x + \frac{1}{x} - \frac{1}{x^2} + \ln(2x)\left(-6x + \frac{1}{x^2}\right)$.` },
      ],
      kern: r`Produktregel anwenden, dann gemeinsame Faktoren ausklammern und, wenn möglich, vereinfachen.`,
      check: { frage: r`$f(x) = x \cdot e^x$. $f'(x) = ?$`, antwort: r`$1 \cdot e^x + x \cdot e^x = e^x(1 + x)$` },
      karten: ['vl13-produkt-aufgabe', 'vl13-produkt-ln'],
    },
  ],
};
