// Vorlesung 04 (20.10.2026): Nullstellen mit Substitution und Polynomdivision, Linearfaktorzerlegung
const r = String.raw;

export default {
  id: 'vl04',
  art: 'vorlesung',
  nummer: 4,
  datum: '2026-10-20',
  titel: 'Substitution, Polynomdivision und Linearfaktoren',
  ueberblick: r`Die beiden letzten Werkzeuge zur Nullstellenbestimmung bei Polynomen: Substitution (bei gemeinsamem Teiler der Exponenten) und Polynomdivision (nach einer geratenen Nullstelle). Dazu die Anzahl der Nullstellen und die Linearfaktorzerlegung.`,

  karten: [
    {
      id: 'vl04-methodenwahl',
      typ: 'verfahren',
      thema: 'Nullstellen',
      quelle: 'VL 4, Folien 4 und 10 (Entscheidungshilfe von Claude ergänzt)',
      frage: r`Du sollst die Nullstellen einer Polynomfunktion bestimmen. In welcher Reihenfolge prüfst du, welche Methode passt?`,
      antwort: r`1. **Kommt $x$ nur einmal vor** (z. B. $3x^2 - 48$)? Direkt auflösen.
2. **Kein Absolutglied?** Niedrigste Potenz von $x$ ausklammern, dann Satz vom Nullprodukt.
3. **Grad 2?** $pq$-Formel (vorher normieren).
4. **Exponenten mit gemeinsamem Teiler** (z. B. nur $x^4$, $x^2$ und Zahl)? Substitution $z = x^t$.
5. **Sonst:** Eine Nullstelle unter den ganzzahligen Teilern des Absolutglieds raten, dann Polynomdivision.

Die Methoden lassen sich kombinieren, z. B. erst ausklammern, dann substituieren.`,
      merke: r`Nicht jedes Polynom lässt sich mit diesen Methoden lösen. In Klausuraufgaben ist aber fast immer eine davon gemeint.`,
    },
    {
      id: 'vl04-substitution-rezept',
      typ: 'verfahren',
      thema: 'Nullstellen',
      quelle: 'VL 4, Folie 5',
      frage: r`Wann hilft eine Substitution bei der Nullstellenbestimmung, und wie gehst du vor?`,
      antwort: r`Wenn die Exponenten der Polynomfunktion einen **gemeinsamen Teiler** $t \in \mathbb{N}$ mit $t > 1$ haben, setzt man $z = x^t$.

1. **Substitution durchführen:** z. B. bei $t = 2$ wird $x^4 = z^2$ und $x^2 = z$.
2. **Gleichung in $z$ lösen** (meist mit der $pq$-Formel).
3. **Rücksubstitution:** Für jede Lösung $z_i$ die Gleichung $x^t = z_i$ lösen.`,
      merke: r`Bei $x^2 = z_i$ gibt es für $z_i > 0$ zwei Lösungen $\pm\sqrt{z_i}$, für $z_i = 0$ eine und für $z_i < 0$ keine.`,
    },
    {
      id: 'vl04-substitution-aufgabe',
      typ: 'aufgabe',
      thema: 'Nullstellen',
      quelle: 'VL 4, Folie 6 (Beispiel)',
      herkunft: 'vorlesung',
      rezept: 'vl04-substitution-rezept',
      frage: r`Bestimme die Nullstellen von $f: \mathbb{R} \to \mathbb{R},\ f(x) = -2x^4 + 20x^2 - 18$.`,
      tipps: [
        r`Welche Exponenten kommen vor? Haben sie einen gemeinsamen Teiler?`,
        r`Setze $z = x^2$. Dann ist $x^4 = z^2$.`,
        r`Vergiss am Ende die Rücksubstitution nicht. Jede positive Lösung für $z$ liefert zwei Werte für $x$.`,
      ],
      schritte: [
        { t: r`$f(x) = 0 \Leftrightarrow -2x^4 + 20x^2 - 18 = 0$` },
        { t: r`Substitution $z = x^2$: $\quad -2z^2 + 20z - 18 = 0$`, w: r`Die Exponenten 4, 2 und 0 haben den gemeinsamen Teiler 2.`, q: r`VL 4, Folie 5: Haben die Exponenten einen gemeinsamen Teiler $t > 1$, hilft $z = x^t$. Hier $t = 2$: $x^4 = (x^2)^2 = z^2$.` },
        { t: r`$\Leftrightarrow z^2 - 10z + 9 = 0 \quad (\,: (-2)\,)$` },
        { t: r`$z_{1/2} = 5 \pm \sqrt{(-5)^2 - 9} = 5 \pm 4$, also $z_1 = 9,\ z_2 = 1$`, q: r`VL 3, Folie 13 ($pq$-Formel): $x^2 + px + q = 0 \Rightarrow x_{1/2} = -\frac{p}{2} \pm \sqrt{\left(\frac{p}{2}\right)^2 - q}$` },
        { t: r`Rücksubstitution: $x^2 = 9 \,\lor\, x^2 = 1$`, w: r`$z$ war nur ein Hilfsname für $x^2$.`, q: r`VL 4, Folie 5, Schritt 3: Rücksubstitution, also $x^t = z_i$ für jede Lösung $z_i$ lösen.` },
        { t: r`$x_1 = 3,\ x_2 = -3,\ x_3 = 1,\ x_4 = -1$`, q: r`Schulwissen: $x^2 = c$ mit $c > 0$ hat die zwei Lösungen $x = \pm\sqrt{c}$, denn $(-\sqrt{c})^2 = c$.` },
      ],
      ergebnis: r`$x_{1/2} = \pm 3,\ x_{3/4} = \pm 1$`,
      fehler: [
        r`Bei den $z$-Werten aufhören: Gesucht sind die $x$-Werte.`,
        r`Nur die positiven Wurzeln angeben.`,
      ],
    },
    {
      id: 'vl04-substitution-x3',
      typ: 'aufgabe',
      thema: 'Nullstellen',
      quelle: 'VL 4, Folie 9, Beispiel 2',
      herkunft: 'vorlesung',
      rezept: 'vl04-substitution-rezept',
      frage: r`Bestimme die Nullstellen von $f(x) = x^6 - 7x^3 - 8$.`,
      tipps: [
        r`Die Exponenten 6, 3 und 0 haben den gemeinsamen Teiler 3. Welche Substitution passt?`,
        r`Mit $z = x^3$ wird $x^6 = z^2$.`,
        r`Bei $x^3 = a$ gibt es genau eine reelle Lösung $x = \sqrt[3]{a}$, auch für negative $a$.`,
      ],
      schritte: [
        { t: r`Substitution $z = x^3$: $\quad z^2 - 7z - 8 = 0$`, q: r`VL 4, Folie 5: Haben die Exponenten einen gemeinsamen Teiler $t > 1$, hilft $z = x^t$. Hier $t = 3$: $x^6 = (x^3)^2 = z^2$.` },
        { t: r`$z_{1/2} = \dfrac{7}{2} \pm \sqrt{\left(\dfrac{7}{2}\right)^2 + 8} = \dfrac{7}{2} \pm \dfrac{9}{2}$, also $z_1 = 8,\ z_2 = -1$`, q: r`VL 3, Folie 13 ($pq$-Formel): $x^2 + px + q = 0 \Rightarrow x_{1/2} = -\frac{p}{2} \pm \sqrt{\left(\frac{p}{2}\right)^2 - q}$` },
        { t: r`Rücksubstitution: $x^3 = 8 \,\lor\, x^3 = -1$`, q: r`VL 4, Folie 5, Schritt 3: Rücksubstitution, also $x^t = z_i$ für jede Lösung $z_i$ lösen.` },
        { t: r`$x_1 = 2,\ x_2 = -1$`, w: r`Die dritte Wurzel einer negativen Zahl ist negativ: $(-1)^3 = -1$. Anders als bei Quadraten gibt es hier kein $\pm$.`, q: r`Schulwissen: $x^3 = c$ hat genau eine reelle Lösung $x = \sqrt[3]{c}$, auch für negative $c$.` },
      ],
      ergebnis: r`$x_1 = 2,\ x_2 = -1$`,
      fehler: [
        r`$x^3 = -1$ verwerfen, weil man an „keine Wurzel aus negativen Zahlen“ denkt. Das gilt nur für gerade Wurzeln.`,
        r`Bei $x^3 = 8$ auch $x = -2$ angeben: $(-2)^3 = -8$.`,
      ],
    },
    {
      id: 'vl04-polynomdivision-rezept',
      typ: 'verfahren',
      thema: 'Nullstellen',
      quelle: 'VL 4, Folie 7',
      frage: r`Wie bestimmst du Nullstellen mit Polynomdivision?`,
      antwort: r`1. **Erste Nullstelle $x_0$ raten:** gezielt die ganzzahligen Teiler des Absolutglieds ausprobieren (vorher ggf. durch den Leitkoeffizienten teilen).
2. **Polynomdivision:** $(a_n x^n + \dots + a_0) : (x - x_0) = b_{n-1}x^{n-1} + \dots + b_0$. Der Rest muss 0 sein.
3. **Nullstellen des Ergebnisses** bestimmen, z. B. mit der $pq$-Formel oder durch erneutes Raten und Dividieren.`,
      merke: r`Geteilt wird durch $(x - x_0)$. Bei $x_0 = -1$ also durch $(x - (-1)) = (x + 1)$.`,
    },
    {
      id: 'vl04-polynomdivision-ablauf',
      typ: 'verfahren',
      thema: 'Nullstellen',
      quelle: 'VL 4, Folie 8 (Ablauf von Claude beschrieben)',
      herkunft: 'zusatz',
      frage: r`Wie läuft ein Schritt der Polynomdivision $(x^3 - 4x^2 + x + 6) : (x + 1)$ genau ab?`,
      antwort: r`Immer dieselben drei Handgriffe, bis nichts mehr übrig ist:
1. **Teilen:** höchste Potenz durch $x$ teilen: $x^3 : x = x^2$. Das kommt ins Ergebnis.
2. **Zurückmultiplizieren:** $x^2 \cdot (x + 1) = x^3 + x^2$
3. **Abziehen:** $(x^3 - 4x^2) - (x^3 + x^2) = -5x^2$, nächsten Summanden ($+x$) herunterholen.

Weiter: $-5x^2 : x = -5x$, $\ -5x(x+1) = -5x^2 - 5x$, Rest $6x + 6$. Dann $6x : x = 6$, Rest $0$.

Ergebnis: $x^2 - 5x + 6$.`,
      merke: r`Beim Abziehen die ganze Klammer abziehen, also alle Vorzeichen umdrehen. Fehlende Potenzen als $0 \cdot x^k$ mitschreiben.`,
    },
    {
      id: 'vl04-polynomdivision-aufgabe',
      typ: 'aufgabe',
      thema: 'Nullstellen',
      quelle: 'VL 4, Folie 8 (Beispiel)',
      herkunft: 'vorlesung',
      rezept: 'vl04-polynomdivision-rezept',
      frage: r`Bestimme die Nullstellen von $f: \mathbb{R} \to \mathbb{R},\ f(x) = 3x^3 - 12x^2 + 3x + 18$.`,
      tipps: [
        r`Es gibt ein Absolutglied, und der Grad ist 3. Welche Methode bleibt übrig?`,
        r`Teile zuerst durch 3. Probiere dann die Teiler des neuen Absolutglieds 6 aus: $\pm 1, \pm 2, \pm 3, \pm 6$.`,
        r`$x = -1$ passt. Dividiere also durch $(x + 1)$.`,
      ],
      schritte: [
        { t: r`$f(x) = 0 \Leftrightarrow x^3 - 4x^2 + x + 6 = 0 \quad (\,: 3\,)$` },
        { t: r`Raten: $x_1 = -1$, denn $(-1)^3 - 4 \cdot (-1)^2 - 1 + 6 = 0$`, w: r`Kandidaten sind die ganzzahligen Teiler von 6.`, q: r`VL 4, Folie 7: Erste Nullstelle unter den ganzzahligen Teilern des Absolutglieds suchen.` },
        { t: r`$(x^3 - 4x^2 + x + 6) : (x + 1) = x^2 - 5x + 6$`, w: r`Rest 0 ist die Probe, dass $-1$ wirklich eine Nullstelle ist.`, q: r`VL 4, Folie 7: Polynomdivision durch $(x - x_0)$ mit der geratenen Nullstelle $x_0$.` },
        { t: r`$\Rightarrow (x^2 - 5x + 6)(x + 1) = 0 \Leftrightarrow x^2 - 5x + 6 = 0 \,\lor\, x + 1 = 0$`, w: r`Satz vom Nullprodukt.`, q: r`VL 3, Folie 17 (Satz vom Nullprodukt): $a \cdot b = 0 \Leftrightarrow a = 0 \lor b = 0$` },
        { t: r`$x_{2/3} = \dfrac{5}{2} \pm \sqrt{\left(\dfrac{5}{2}\right)^2 - 6} = \dfrac{5}{2} \pm \dfrac{1}{2}$`, q: r`VL 3, Folie 13 ($pq$-Formel): $x^2 + px + q = 0 \Rightarrow x_{1/2} = -\frac{p}{2} \pm \sqrt{\left(\frac{p}{2}\right)^2 - q}$` },
        { t: r`$x_1 = -1,\ x_2 = 3,\ x_3 = 2$` },
      ],
      ergebnis: r`$x_1 = -1,\ x_2 = 3,\ x_3 = 2$`,
      fehler: [
        r`Durch $(x - 1)$ statt $(x + 1)$ teilen.`,
        r`Die geratene Nullstelle am Ende vergessen.`,
      ],
    },
    {
      id: 'vl04-raten-mc',
      typ: 'verstaendnis',
      thema: 'Nullstellen',
      quelle: 'VL 4, Folie 7',
      herkunft: 'zusatz',
      frage: r`Welche Zahlen kommen als ganzzahlige Nullstellen von $x^3 + 2x^2 - x - 2$ in Frage?`,
      optionen: [r`$\pm 1, \pm 2$`, r`$\pm 1, \pm 2, \pm 3$`, r`nur $1$ und $2$`, r`alle Teiler von 3`],
      richtig: 0,
      erklaerung: r`Ganzzahlige Nullstellen müssen Teiler des Absolutglieds $-2$ sein, also $\pm 1$ oder $\pm 2$. Hier passt z. B. $x = 1$: $1 + 2 - 1 - 2 = 0$. Das gilt, wenn der Leitkoeffizient 1 ist. Sonst vorher durch ihn teilen.`,
    },
    {
      id: 'vl04-vermischt-1',
      typ: 'aufgabe',
      thema: 'Nullstellen',
      quelle: 'VL 4, Folie 9, Beispiel 1',
      herkunft: 'vorlesung',
      rezept: 'vl03-ausklammern-rezept',
      frage: r`Bestimme die Nullstellen von $f(x) = -2x^4 - 4x^3 + 6x^2$.`,
      tipps: [
        r`Gibt es ein Absolutglied? Was ist die niedrigste Potenz von $x$?`,
        r`Teile durch $-2$ und klammere $x^2$ aus.`,
      ],
      schritte: [
        { t: r`$-2x^4 - 4x^3 + 6x^2 = 0 \Leftrightarrow x^4 + 2x^3 - 3x^2 = 0 \quad (\,: (-2)\,)$` },
        { t: r`$\Leftrightarrow x^2 \cdot (x^2 + 2x - 3) = 0$`, w: r`Kein Absolutglied, niedrigste Potenz ist $x^2$.`, q: r`VL 3, Folie 18: Ohne Absolutglied die niedrigste Potenz von $x$ ausklammern.` },
        { t: r`$\Leftrightarrow x^2 = 0 \,\lor\, x^2 + 2x - 3 = 0$`, q: r`VL 3, Folie 17 (Satz vom Nullprodukt): $a \cdot b = 0 \Leftrightarrow a = 0 \lor b = 0$` },
        { t: r`$x_{1/2} = 0,\quad x_{3/4} = -1 \pm \sqrt{1 + 3} = -1 \pm 2$`, q: r`VL 3, Folie 13 ($pq$-Formel): $x^2 + px + q = 0 \Rightarrow x_{1/2} = -\frac{p}{2} \pm \sqrt{\left(\frac{p}{2}\right)^2 - q}$` },
        { t: r`$x_{1/2} = 0,\ x_3 = 1,\ x_4 = -3$`, w: r`$x = 0$ ist eine doppelte Nullstelle, weil der Faktor $x^2 = x \cdot x$ ist.` },
      ],
      ergebnis: r`$x_{1/2} = 0$ (doppelt), $x_3 = 1$, $x_4 = -3$`,
    },
    {
      id: 'vl04-vermischt-3',
      typ: 'aufgabe',
      thema: 'Nullstellen',
      quelle: 'VL 4, Folie 9, Beispiel 3',
      herkunft: 'vorlesung',
      rezept: 'vl04-polynomdivision-rezept',
      frage: r`Bestimme die Nullstellen von $f(x) = 4x^3 + 8x^2 - 4x - 8$.`,
      tipps: [
        r`Absolutglied vorhanden, Grad 3: Teile durch 4 und rate eine Nullstelle.`,
        r`Probiere $x = 1$.`,
      ],
      schritte: [
        { t: r`$4x^3 + 8x^2 - 4x - 8 = 0 \Leftrightarrow x^3 + 2x^2 - x - 2 = 0 \quad (\,: 4\,)$` },
        { t: r`Raten: $x_1 = 1$, denn $1 + 2 - 1 - 2 = 0$`, q: r`VL 4, Folie 7: Erste Nullstelle unter den ganzzahligen Teilern des Absolutglieds suchen.` },
        { t: r`$(x^3 + 2x^2 - x - 2) : (x - 1) = x^2 + 3x + 2$`, q: r`VL 4, Folie 7: Polynomdivision durch $(x - x_0)$ mit der geratenen Nullstelle $x_0$.` },
        { t: r`$x^2 + 3x + 2 = 0 \Leftrightarrow x_{2/3} = -\dfrac{3}{2} \pm \sqrt{\dfrac{9}{4} - 2} = -\dfrac{3}{2} \pm \dfrac{1}{2}$`, q: r`VL 3, Folie 13 ($pq$-Formel): $x^2 + px + q = 0 \Rightarrow x_{1/2} = -\frac{p}{2} \pm \sqrt{\left(\frac{p}{2}\right)^2 - q}$` },
        { t: r`$x_1 = 1,\ x_2 = -1,\ x_3 = -2$` },
      ],
      ergebnis: r`$x_1 = 1,\ x_2 = -1,\ x_3 = -2$`,
    },
    {
      id: 'vl04-anzahl',
      typ: 'satz',
      thema: 'Linearfaktoren',
      quelle: 'VL 4, Folie 11',
      frage: r`Wie viele Nullstellen kann eine Polynomfunktion vom Grad $n$ höchstens haben?`,
      antwort: r`Eine Polynomfunktion vom Grad $n$ besitzt **höchstens $n$ Nullstellen**.

Das gilt auch, wenn man mehrfach auftretende Nullstellen mehrfach mitzählt.`,
      merke: r`Hast du bei Grad 3 schon drei Nullstellen gefunden, bist du fertig. Mehr kann es nicht geben.`,
    },
    {
      id: 'vl04-linearfaktoren',
      typ: 'satz',
      thema: 'Linearfaktoren',
      quelle: 'VL 4, Folie 11',
      frage: r`Was ist die Linearfaktorzerlegung eines Polynoms, und wann gibt es sie?`,
      antwort: r`Besitzt eine Polynomfunktion vom Grad $n$ genau $n$ Nullstellen $x_1, \dots, x_n$ (mehrfache mehrfach gezählt), so gilt:

$$a_n x^n + \dots + a_1 x + a_0 = a_n \cdot (x - x_1) \cdot (x - x_2) \cdots (x - x_n)$$`,
      merke: r`Den Leitkoeffizienten $a_n$ nicht vergessen. Probe: Ausmultiplizieren muss wieder das Polynom ergeben.`,
    },
    {
      id: 'vl04-linearfaktoren-mc',
      typ: 'verstaendnis',
      thema: 'Linearfaktoren',
      quelle: 'VL 4, Folie 11',
      herkunft: 'zusatz',
      frage: r`$f(x) = 3x^3 - 12x^2 + 3x + 18$ hat die Nullstellen $-1$, $2$ und $3$. Wie lautet die Linearfaktorzerlegung?`,
      optionen: [
        r`$3(x + 1)(x - 2)(x - 3)$`,
        r`$(x + 1)(x - 2)(x - 3)$`,
        r`$3(x - 1)(x + 2)(x + 3)$`,
        r`$(x - 1)(x + 2)(x + 3)$`,
      ],
      richtig: 0,
      erklaerung: r`Zu jeder Nullstelle $x_i$ gehört der Faktor $(x - x_i)$, zu $-1$ also $(x + 1)$. Davor steht der Leitkoeffizient 3. Ohne ihn hätte das Produkt den Leitkoeffizienten 1.`,
    },
  ],

  formelblatt: [
    {
      id: 'fb-substitution',
      titel: 'Substitution',
      inhalt: r`Exponenten mit gemeinsamem Teiler $t$: $z = x^t$, in $z$ lösen, rücksubstituieren ($x^2 = z$: $\pm\sqrt{z}$ nur für $z \ge 0$).`,
    },
    {
      id: 'fb-polynomdivision',
      titel: 'Polynomdivision',
      inhalt: r`Nullstelle $x_0$ unter den Teilern des Absolutglieds raten, dann $: (x - x_0)$. Teilen, zurückmultiplizieren, abziehen. Rest muss 0 sein.`,
    },
    {
      id: 'fb-linearfaktoren',
      titel: 'Linearfaktorzerlegung',
      inhalt: r`Grad $n$: höchstens $n$ Nullstellen. $f(x) = a_n (x - x_1) \cdots (x - x_n)$`,
    },
  ],
};
