// Vorlesung 4 (20.10.2026) durchgehen: Nullstellen von Polynomen mit Substitution, Polynomdivision, Linearfaktoren
const r = String.raw;

export default {
  unit: 'vl04',
  abschnitte: [
    {
      id: 'vl04-d01',
      folien: '4–5',
      titel: 'Welche Methode für Nullstellen?',
      folie: r`Je nach Funktionsterm hilft:
- direkt nach der Unbekannten auflösen
- $pq$-Formel (bzw. Mitternachtsformel, Vieta, quadratische Ergänzung)
- Ausklammern
- Substitution
- Polynomdivision (bzw. Horner-Schema)

Substitution: Haben alle Exponenten einen gemeinsamen Teiler $t > 1$, hilft $z = x^t$. Ablauf: substituieren, in $z$ lösen, rücksubstituieren.`,
      kern: r`Zuerst schauen: Kann ich $x$ ausklammern? Haben die Exponenten einen gemeinsamen Teiler? Sonst eine Nullstelle raten und Polynomdivision.`,
      karten: ['vl04-methodenwahl', 'vl04-substitution-rezept'],
    },
    {
      id: 'vl04-d02',
      folien: '6',
      titel: r`Beispiel Substitution: $-2x^4 + 20x^2 - 18$`,
      folie: r`$f: \mathbb{R} \to \mathbb{R}$, $f(x) = -2x^4 + 20x^2 - 18$`,
      notizen: [
        { t: r`$f(x) = 0 \iff -2x^4 + 20x^2 - 18 = 0$`, w: r`` },
        { t: r`Die Exponenten haben den gemeinsamen Teiler 2 $\Rightarrow$ Substitution: $z = x^2 \Rightarrow z^2 = x^4$`, w: r`Exponenten 4, 2 und 0: alle durch 2 teilbar.` },
        { t: r`$-2z^2 + 20z - 18 = 0 \quad | :(-2) \iff z^2 - 10z + 9 = 0$`, w: r`Durch $-2$ teilen, damit vor $z^2$ eine 1 steht (für die $pq$-Formel).` },
        { t: r`$\iff z_{1,2} = 5 \pm \sqrt{(-5)^2 - 9} = 5 \pm 4 \iff z_1 = 9, \; z_2 = 1$`, w: r`$p = -10$, $q = 9$: $-\frac{p}{2} = 5$, $\sqrt{25 - 9} = 4$.` },
        { t: r`Rücksubstitution: $x^2 = 9 \;\vee\; x^2 = 1 \quad | \pm\sqrt{\;}$`, w: r`Beim Wurzelziehen aus $x^2$ immer $\pm$!` },
        { t: r`$\iff x_1 = 3, \; x_2 = -3, \; x_3 = 1, \; x_4 = -1$`, w: r`Vier Nullstellen bei Grad 4, mehr geht nicht.` },
      ],
      kern: r`$z = x^2$ einsetzen, quadratische Gleichung lösen, dann $\pm\sqrt{z}$ zurückrechnen (nur für $z \ge 0$).`,
      karten: ['vl04-substitution-aufgabe'],
    },
    {
      id: 'vl04-d03',
      folien: '7–8 und Notizseite',
      titel: r`Beispiel Polynomdivision: $3x^3 - 12x^2 + 3x + 18$`,
      folie: r`Polynomdivision: 1) eine Nullstelle $x_0$ durch Ausprobieren finden (ganzzahlige Teiler des Absolutglieds), 2) durch $(x - x_0)$ teilen, 3) Nullstellen des Restpolynoms bestimmen.

Beispiel: $f(x) = 3x^3 - 12x^2 + 3x + 18$`,
      notizen: [
        { t: r`$f(x) = 0 \iff 3x^3 - 12x^2 + 3x + 18 = 0 \quad | :3 \iff x^3 - 4x^2 + x + 6 = 0$`, w: r`Erst durch 3 teilen: Dann steht vorn $x^3$, und die Teiler-Regel gilt für das Absolutglied 6.` },
        { t: r`Ganzzahlige Teiler von 6: $\pm 1, \pm 2, \pm 3, \pm 6$`, w: r`Ganzzahlige Nullstellen können nur unter diesen Kandidaten sein.` },
        { t: r`Durch Ausprobieren: $x_1 = -1$, denn $(-1)^3 - 4(-1)^2 - 1 + 6 = 0$`, w: r`$-1 - 4 - 1 + 6 = 0$. ✓` },
        { t: r`Also Polynomdivision: $(x^3 - 4x^2 + x + 6) : (x - (-1))$, also durch $(x + 1)$.`, w: r`Bei der Nullstelle $-1$ teilt man durch $x - (-1) = x + 1$. Vorzeichen beachten!` },
        { t: r`$(x^3 - 4x^2 + x + 6) : (x + 1) = x^2 - 5x + 6$ $$\begin{array}{l} \phantom{-(}x^3 - 4x^2 + x + 6 \\ -(x^3 + x^2) \\ \quad\;\, -5x^2 + x \\ \quad -(-5x^2 - 5x) \\ \qquad\quad\;\; 6x + 6 \\ \qquad\;\; -(6x + 6) \\ \qquad\qquad\;\; 0 \end{array}$$`, w: r`Immer: höchste Potenz teilen ($x^3 : x = x^2$), zurückmultiplizieren, abziehen. Rest 0 bestätigt die Nullstelle.` },
        { t: r`$\Rightarrow x^3 - 4x^2 + x + 6 = (x^2 - 5x + 6) \cdot (x + 1)$`, w: r`` },
        { t: r`$\iff x^2 - 5x + 6 = 0 \;\vee\; x + 1 = 0$ (Satz vom Nullprodukt)`, w: r`` },
        { t: r`$\iff x_{2,3} = \frac{5}{2} \pm \sqrt{\left(-\frac{5}{2}\right)^2 - 6} = \frac{5}{2} \pm \frac{1}{2}$, also $x_2 = 3$, $x_3 = 2$, $x_1 = -1$`, w: r`$\frac{25}{4} - \frac{24}{4} = \frac{1}{4}$, Wurzel $\frac{1}{2}$.` },
      ],
      kern: r`Nullstelle raten (Teiler des Absolutglieds), durch $(x - x_0)$ teilen, Rest mit der $pq$-Formel.`,
      check: { frage: r`Durch welchen Term teilt man, wenn $x_0 = 2$ geraten wurde?`, antwort: r`Durch $(x - 2)$.` },
      karten: ['vl04-polynomdivision-rezept', 'vl04-polynomdivision-ablauf', 'vl04-polynomdivision-aufgabe', 'vl04-raten-mc'],
    },
    {
      id: 'vl04-d04',
      folien: '9 und Notizseite',
      titel: r`Vermischtes Beispiel 1: $-2x^4 - 4x^3 + 6x^2$`,
      folie: r`$f(x) = -2x^4 - 4x^3 + 6x^2$`,
      notizen: [
        { t: r`$f(x) = 0 \iff -2x^4 - 4x^3 + 6x^2 = 0 \quad | :(-2) \iff x^4 + 2x^3 - 3x^2 = 0$`, w: r`` },
        { t: r`$| \; x^2$ ausklammern $\iff x^2 \cdot (x^2 + 2x - 3) = 0$`, w: r`Kein Absolutglied: In jedem Summanden steckt mindestens $x^2$.` },
        { t: r`Satz vom Nullprodukt: $x^2 = 0 \;\vee\; x^2 + 2x - 3 = 0$`, w: r`` },
        { t: r`$\iff x_{1/2} = 0, \quad x_{3/4} = -1 \pm \sqrt{1^2 + 3} = -1 \pm 2$`, w: r`$x^2 = 0$ ergibt eine **doppelte** Nullstelle 0.` },
        { t: r`$\iff x_{1/2} = 0, \; x_3 = 1, \; x_4 = -3$`, w: r`` },
      ],
      kern: r`Fehlt das Absolutglied: die höchste gemeinsame $x$-Potenz ausklammern.`,
      karten: ['vl04-vermischt-1'],
    },
    {
      id: 'vl04-d05',
      folien: '9 und Notizseite',
      titel: r`Vermischtes Beispiel 2: $x^6 - 7x^3 - 8$`,
      folie: r`$f(x) = x^6 - 7x^3 - 8$`,
      notizen: [
        { t: r`$f(x) = 0 \iff x^6 - 7x^3 - 8 = 0$. Substitution: $z = x^3$`, w: r`Exponenten 6, 3, 0: gemeinsamer Teiler 3. Also $z = x^3$, $z^2 = x^6$.` },
        { t: r`$z^2 - 7z - 8 = 0 \iff z_{1/2} = \frac{7}{2} \pm \sqrt{\left(-\frac{7}{2}\right)^2 + 8} = \frac{7}{2} \pm \frac{9}{2}$`, w: r`$\frac{49}{4} + \frac{32}{4} = \frac{81}{4}$, Wurzel $\frac{9}{2}$.` },
        { t: r`$\iff z_1 = 8, \; z_2 = -1$`, w: r`` },
        { t: r`Rücksubstitution: $x^3 = 8 \;\vee\; x^3 = -1 \quad | \sqrt[3]{\;}$ $\iff x_1 = 2, \; x_2 = -1$`, w: r`Die dritte Wurzel geht auch aus negativen Zahlen und liefert genau **eine** Lösung (kein $\pm$).` },
      ],
      kern: r`Bei $z = x^3$ hat jede Rücksubstitution genau eine Lösung, auch für negative $z$.`,
      karten: ['vl04-substitution-x3'],
    },
    {
      id: 'vl04-d06',
      folien: '9 und Notizseite',
      titel: r`Vermischtes Beispiel 3: $4x^3 + 8x^2 - 4x - 8$`,
      folie: r`$f(x) = 4x^3 + 8x^2 - 4x - 8$`,
      notizen: [
        { t: r`$f(x) = 0 \iff 4x^3 + 8x^2 - 4x - 8 = 0 \quad | :4 \iff x^3 + 2x^2 - x - 2 = 0$`, w: r`` },
        { t: r`Durch Ausprobieren: $x_1 = 1$`, w: r`$1 + 2 - 1 - 2 = 0$. ✓` },
        { t: r`$(x^3 + 2x^2 - x - 2) : (x - 1) = x^2 + 3x + 2$ $$\begin{array}{l} \phantom{-(}x^3 + 2x^2 - x - 2 \\ -(x^3 - x^2) \\ \quad\;\; 3x^2 - x \\ \quad -(3x^2 - 3x) \\ \qquad\quad 2x - 2 \\ \qquad -(2x - 2) \\ \qquad\qquad 0 \end{array}$$`, w: r`` },
        { t: r`$x^2 + 3x + 2 = 0 \iff x_{2/3} = -\frac{3}{2} \pm \sqrt{\left(\frac{3}{2}\right)^2 - 2} = -\frac{3}{2} \pm \frac{1}{2}$`, w: r`$\frac{9}{4} - \frac{8}{4} = \frac{1}{4}$.` },
        { t: r`$\iff x_2 = -1, \; x_3 = -2$`, w: r`` },
      ],
      kern: r`Hat ein Polynom dritten Grades kein fehlendes Absolutglied und keine Substitution: raten und dividieren.`,
      karten: ['vl04-vermischt-3'],
    },
    {
      id: 'vl04-d07',
      folien: '10–11',
      titel: 'Anzahl der Nullstellen und Linearfaktorzerlegung',
      folie: r`Ein Polynom vom Grad $n$ hat höchstens $n$ Nullstellen (mehrfache mehrfach gezählt).

Hat es genau $n$ Nullstellen $x_1, \dots, x_n$, gilt:
$$a_n x^n + \dots + a_1 x + a_0 = a_n \cdot (x - x_1) \cdot (x - x_2) \cdots (x - x_n)$$`,
      notizen: [
        { t: r`Farbig markiert: Der Leitkoeffizient $a_n$ (gelb) steht auch vorne in der Zerlegung. Die Nullstellen (grün) stehen in den Klammern mit Minus.`, w: r`Den Faktor $a_n$ vergisst man leicht. Beispiel: $3x^3 - 12x^2 + 3x + 18 = 3(x + 1)(x - 2)(x - 3)$.` },
      ],
      kern: r`Linearfaktorzerlegung = Leitkoeffizient mal $(x - \text{Nullstelle})$ für jede Nullstelle.`,
      check: { frage: r`Linearfaktorzerlegung von $-2x^4 + 20x^2 - 18$?`, antwort: r`Nullstellen $\pm 3$, $\pm 1$, Leitkoeffizient $-2$: $-2(x - 3)(x + 3)(x - 1)(x + 1)$.` },
      karten: ['vl04-anzahl', 'vl04-linearfaktoren', 'vl04-linearfaktoren-mc'],
    },
  ],
};
