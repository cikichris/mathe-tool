// Übungsblatt 2 (Besprechung 27./30.10.2026): Nullstellen von Polynomfunktionen
const r = String.raw;

export default {
  id: 'ue02',
  art: 'uebung',
  nummer: 2,
  datum: '2026-10-27',
  besprechung: ['2026-10-27', '2026-10-30'],
  titel: 'Nullstellen von Polynomfunktionen',
  ueberblick: r`Aufgaben 1 und 2 mit den offiziellen Lösungen aus campUAS. Die Aufgaben 3 und 4 (Besprechung in der Übung) sind von Claude gelöst.`,

  karten: [
    // ---------------- Aufgabe 1 ----------------
    {
      id: 'ue02-a1ab',
      typ: 'aufgabe',
      thema: 'Nullstellen',
      quelle: 'Übung 2, Aufgabe 1 a, b',
      herkunft: 'offiziell',
      rezept: 'vl03-pq-rezept',
      frage: r`Bestimme alle Nullstellen:
a) $f(x) = -x^2 - 2x + 1{,}25$
b) $f(x) = 3x^2 - 48$`,
      tipps: [
        r`a) Normieren: durch $-1$ teilen, dann $pq$-Formel.`,
        r`b) $x$ kommt nur einmal vor. Direkt nach $x^2$ auflösen.`,
      ],
      schritte: [
        { t: r`a) $-x^2 - 2x + 1{,}25 = 0 \Leftrightarrow x^2 + 2x - 1{,}25 = 0$` },
        { t: r`$x_{1/2} = -1 \pm \sqrt{1 + 1{,}25} = -1 \pm 1{,}5$, also $x_1 = 0{,}5,\ x_2 = -2{,}5$` },
        { t: r`b) $3x^2 - 48 = 0 \Leftrightarrow x^2 = 16 \Leftrightarrow x_1 = 4,\ x_2 = -4$`, w: r`Mit der $pq$-Formel ($p = 0$) ginge es auch, ist aber umständlicher.` },
      ],
      ergebnis: r`a) $x_1 = 0{,}5,\ x_2 = -2{,}5$ $\quad$ b) $x_{1/2} = \pm 4$`,
    },
    {
      id: 'ue02-a1c',
      typ: 'aufgabe',
      thema: 'Nullstellen',
      quelle: 'Übung 2, Aufgabe 1 c',
      herkunft: 'offiziell',
      rezept: 'vl03-ausklammern-rezept',
      frage: r`Bestimme alle Nullstellen von $f(t) = 2t^4 - 4t^3 - 6t^2$.`,
      tipps: [
        r`Kein Absolutglied. Die niedrigste Potenz ist $t^2$.`,
        r`Nach dem Ausklammern bleibt $2t^2 - 4t - 6$. Durch 2 teilen, dann $pq$-Formel.`,
      ],
      schritte: [
        { t: r`$2t^4 - 4t^3 - 6t^2 = 0 \Leftrightarrow t^2 (2t^2 - 4t - 6) = 0$` },
        { t: r`$\Leftrightarrow t^2 = 0 \,\lor\, t^2 - 2t - 3 = 0$` },
        { t: r`$t_{1/2} = 0,\quad t_{3/4} = 1 \pm \sqrt{1 + 3} = 1 \pm 2$` },
        { t: r`$t_{1/2} = 0,\ t_3 = 3,\ t_4 = -1$` },
      ],
      ergebnis: r`$t_{1/2} = 0$ (doppelt), $t_3 = 3$, $t_4 = -1$`,
      fehler: [r`Sich vom Variablennamen $t$ irritieren lassen: Es funktioniert genauso wie mit $x$.`],
    },
    {
      id: 'ue02-a1d',
      typ: 'aufgabe',
      thema: 'Nullstellen',
      quelle: 'Übung 2, Aufgabe 1 d',
      herkunft: 'offiziell',
      rezept: 'vl04-polynomdivision-rezept',
      frage: r`Bestimme alle Nullstellen von $f(x) = x^3 + x^2 - 17x + 15$.`,
      tipps: [
        r`Absolutglied vorhanden, Grad 3, keine gemeinsamen Exponenten: Raten und Polynomdivision.`,
        r`Teiler von 15: $\pm 1, \pm 3, \pm 5, \pm 15$. Probiere $x = 1$.`,
      ],
      schritte: [
        { t: r`Raten: $x_1 = 1$, denn $1 + 1 - 17 + 15 = 0$` },
        { t: r`$(x^3 + x^2 - 17x + 15) : (x - 1) = x^2 + 2x - 15$` },
        { t: r`$x^2 + 2x - 15 = 0 \Leftrightarrow x_{2/3} = -1 \pm \sqrt{1 + 15} = -1 \pm 4$` },
        { t: r`$x_1 = 1,\ x_2 = 3,\ x_3 = -5$` },
      ],
      ergebnis: r`$x_1 = 1,\ x_2 = 3,\ x_3 = -5$`,
    },
    {
      id: 'ue02-a1e',
      typ: 'aufgabe',
      thema: 'Nullstellen',
      quelle: 'Übung 2, Aufgabe 1 e',
      herkunft: 'offiziell',
      rezept: 'vl04-substitution-rezept',
      frage: r`Bestimme alle Nullstellen von $f(x) = x^4 - \dfrac{3}{2}x^2 - 1$.`,
      tipps: [
        r`Exponenten 4, 2, 0: Substitution $z = x^2$.`,
        r`Eine der beiden $z$-Lösungen ist negativ. Was bedeutet das für $x^2 = z$?`,
      ],
      schritte: [
        { t: r`$z = x^2$: $\quad z^2 - \dfrac{3}{2}z - 1 = 0$` },
        { t: r`$z_{1/2} = \dfrac{3}{4} \pm \sqrt{\dfrac{9}{16} + 1} = \dfrac{3}{4} \pm \dfrac{5}{4}$, also $z_1 = 2,\ z_2 = -\dfrac{1}{2}$` },
        { t: r`$x^2 = 2 \Leftrightarrow x = \pm\sqrt{2}$; $\ x^2 = -\dfrac{1}{2}$ hat keine Lösung`, w: r`Ein Quadrat ist nie negativ.` },
      ],
      ergebnis: r`$x_1 = \sqrt{2},\ x_2 = -\sqrt{2}$`,
    },
    {
      id: 'ue02-a1f',
      typ: 'aufgabe',
      thema: 'Nullstellen',
      quelle: 'Übung 2, Aufgabe 1 f',
      herkunft: 'offiziell',
      rezept: 'vl03-ausklammern-rezept',
      frage: r`Bestimme alle Nullstellen von $f(x) = 5x^4 + 3x^3 + 6x^2$.`,
      tipps: [
        r`Durch 5 teilen und $x^2$ ausklammern.`,
        r`Schau dir bei der Klammer die Diskriminante an.`,
      ],
      schritte: [
        { t: r`$5x^4 + 3x^3 + 6x^2 = 0 \Leftrightarrow x^2\left(x^2 + \dfrac{3}{5}x + \dfrac{6}{5}\right) = 0$` },
        { t: r`$x^2 = 0 \,\lor\, x^2 + \dfrac{3}{5}x + \dfrac{6}{5} = 0$` },
        { t: r`$x_{2/3} = -\dfrac{3}{10} \pm \sqrt{\dfrac{9}{100} - \dfrac{6}{5}} = -\dfrac{3}{10} \pm \sqrt{-\dfrac{111}{100}}$`, w: r`Unter der Wurzel steht eine negative Zahl. In der offiziellen Lösung steht hier $-\frac{223}{300}$, nachgerechnet sind es $\frac{9}{100} - \frac{120}{100} = -\frac{111}{100}$. Am Ergebnis ändert das nichts.` },
        { t: r`Also nur $x_{1/2} = 0$` },
      ],
      ergebnis: r`Nur die (doppelte) Nullstelle $x = 0$`,
    },
    {
      id: 'ue02-a1g',
      typ: 'aufgabe',
      thema: 'Nullstellen',
      quelle: 'Übung 2, Aufgabe 1 g',
      herkunft: 'offiziell',
      rezept: 'vl04-polynomdivision-rezept',
      frage: r`Bestimme alle Nullstellen von $f(x) = x^3 - 37x^2 + x - 37$.`,
      tipps: [
        r`Probiere die Teiler von 37 aus. 37 ist eine Primzahl, es gibt also nur $\pm 1$ und $\pm 37$.`,
        r`$x = 37$ passt. Dividiere durch $(x - 37)$.`,
      ],
      schritte: [
        { t: r`Raten: $x_1 = 37$, denn $37^3 - 37 \cdot 37^2 + 37 - 37 = 0$` },
        { t: r`$(x^3 - 37x^2 + x - 37) : (x - 37) = x^2 + 1$` },
        { t: r`$x^2 + 1 = 0$ hat keine reelle Lösung.` },
        { t: r`Kontrolle über Ausklammern in Gruppen: $x^2(x - 37) + (x - 37) = (x^2 + 1)(x - 37)$`, w: r`Dieser Weg ist schneller, wenn man die Gruppen sieht. Er steht nicht in der offiziellen Lösung.` },
      ],
      ergebnis: r`Nur $x_1 = 37$`,
      fehler: [
        r`Bei den kleinen Teilern $\pm 1$ aufgeben. Die Teiler des Absolutglieds schließen auch die Zahl selbst ein.`,
      ],
    },
    {
      id: 'ue02-a1h',
      typ: 'aufgabe',
      thema: 'Nullstellen',
      quelle: 'Übung 2, Aufgabe 1 h',
      herkunft: 'offiziell',
      rezept: 'vl04-substitution-rezept',
      frage: r`Bestimme alle Nullstellen von $f(x) = 4x^4 - 12x^2 + 9$.`,
      tipps: [
        r`Substitution $z = x^2$, dann durch 4 teilen.`,
        r`Die Diskriminante ist 0. Es gibt also nur einen $z$-Wert.`,
      ],
      schritte: [
        { t: r`$z = x^2$: $\quad 4z^2 - 12z + 9 = 0 \Leftrightarrow z^2 - 3z + \dfrac{9}{4} = 0$` },
        { t: r`$z_{1/2} = \dfrac{3}{2} \pm \sqrt{\dfrac{9}{4} - \dfrac{9}{4}} = \dfrac{3}{2}$` },
        { t: r`$x^2 = \dfrac{3}{2} \Leftrightarrow x = \pm\sqrt{\dfrac{3}{2}}$` },
      ],
      ergebnis: r`$x_{1/2} = \pm\sqrt{\dfrac{3}{2}} \approx \pm 1{,}22$`,
    },
    {
      id: 'ue02-a1i',
      typ: 'aufgabe',
      thema: 'Nullstellen',
      quelle: 'Übung 2, Aufgabe 1 i',
      herkunft: 'offiziell',
      frage: r`Bestimme alle Nullstellen von $f(x) = x^5 + \dfrac{1}{4}x^3 - \dfrac{3}{8}x$.`,
      tipps: [
        r`Zuerst: Kein Absolutglied. Klammere $x$ aus.`,
        r`In der Klammer stehen nur noch $x^4$, $x^2$ und eine Zahl. Welche Methode passt jetzt?`,
      ],
      schritte: [
        { t: r`$x\left(x^4 + \dfrac{1}{4}x^2 - \dfrac{3}{8}\right) = 0 \Leftrightarrow x_1 = 0 \,\lor\, x^4 + \dfrac{1}{4}x^2 - \dfrac{3}{8} = 0$`, w: r`Zwei Methoden hintereinander: erst ausklammern, dann substituieren.` },
        { t: r`$z = x^2$: $\quad z^2 + \dfrac{1}{4}z - \dfrac{3}{8} = 0$` },
        { t: r`$z_{1/2} = -\dfrac{1}{8} \pm \sqrt{\dfrac{1}{64} + \dfrac{3}{8}} = -\dfrac{1}{8} \pm \dfrac{5}{8}$, also $z_1 = \dfrac{1}{2},\ z_2 = -\dfrac{3}{4}$` },
        { t: r`$x^2 = \dfrac{1}{2} \Leftrightarrow x = \pm\dfrac{1}{\sqrt{2}}$; $\ x^2 = -\dfrac{3}{4}$ hat keine Lösung` },
      ],
      ergebnis: r`$x_1 = 0,\ x_{2/3} = \pm\dfrac{1}{\sqrt{2}} \approx \pm 0{,}71$`,
    },

    // ---------------- Aufgabe 2 ----------------
    {
      id: 'ue02-a2-linearfaktoren',
      typ: 'aufgabe',
      thema: 'Linearfaktoren',
      quelle: 'Übung 2, Aufgabe 2',
      herkunft: 'offiziell',
      rezept: 'vl04-polynomdivision-rezept',
      frage: r`Stelle $f: \mathbb{R} \to \mathbb{R},\ f(x) = 2x^4 + 4x^3 - 6x^2 - 16x - 8$ in Linearfaktorzerlegung dar.`,
      tipps: [
        r`Erst alle Nullstellen bestimmen. $pq$-Formel, Ausklammern und Substitution passen hier nicht.`,
        r`Probiere $x = -1$. Nach der ersten Division klappt $x = -1$ noch einmal.`,
        r`Am Ende den Leitkoeffizienten 2 vor die Faktoren schreiben.`,
      ],
      schritte: [
        { t: r`Raten: $x_1 = -1$. $\quad (2x^4 + 4x^3 - 6x^2 - 16x - 8) : (x + 1) = 2x^3 + 2x^2 - 8x - 8$` },
        { t: r`Weiter mit $x^3 + x^2 - 4x - 4 = 0$ (durch 2 geteilt). Raten: wieder $x_2 = -1$`, w: r`$-1$ ist also eine mehrfache Nullstelle.` },
        { t: r`$(x^3 + x^2 - 4x - 4) : (x + 1) = x^2 - 4$` },
        { t: r`$x^2 - 4 = 0 \Leftrightarrow x_3 = 2,\ x_4 = -2$` },
        { t: r`$f(x) = 2 (x + 1)(x + 1)(x - 2)(x + 2) = 2(x + 1)^2 (x - 2)(x + 2)$`, w: r`Vier Nullstellen bei Grad 4: Die Zerlegung ist vollständig.` },
      ],
      ergebnis: r`$f(x) = 2(x + 1)^2 (x - 2)(x + 2)$`,
      fehler: [
        r`Den Faktor 2 vergessen.`,
        r`Die doppelte Nullstelle nur einmal als Faktor schreiben.`,
      ],
    },

    // ---------------- Aufgabe 3 (Besprechung) ----------------
    {
      id: 'ue02-a3',
      typ: 'aufgabe',
      teil: 'besprechung',
      nr: '3',
      thema: 'Nullstellen',
      quelle: 'Übung 2, Aufgabe 3',
      herkunft: 'claude',
      frage: r`Bestimme alle Nullstellen von $f: \mathbb{R} \to \mathbb{R},\ f(x) = 14x^6 - 67x^4 + 81$ und untersuche, ob $f$ gerade, ungerade oder keins von beiden ist.`,
      tipps: [
        r`Die Exponenten 6, 4 und 0 haben den gemeinsamen Teiler 2. Mit $z = x^2$ entsteht eine Gleichung 3. Grades in $z$.`,
        r`Rate eine Lösung für $z$ unter den Teilern von 81. Probiere $z = -1$.`,
        r`Polynomdivision durch $(z + 1)$, dann $pq$-Formel. Für die Symmetrie: Welche Exponenten kommen vor?`,
      ],
      schritte: [
        { t: r`Substitution $z = x^2$: $\quad 14z^3 - 67z^2 + 81 = 0$`, w: r`$x^6 = (x^2)^3 = z^3$ und $x^4 = z^2$. Der Grad sinkt von 6 auf 3.` },
        { t: r`Raten: $z_1 = -1$, denn $14 \cdot (-1) - 67 \cdot 1 + 81 = 0$`, w: r`Kandidaten sind die Teiler von 81. Mit $z = 1$ kommt $28 \ne 0$ heraus.` },
        { t: r`$(14z^3 - 67z^2 + 0z + 81) : (z + 1) = 14z^2 - 81z + 81$`, w: r`Das fehlende $z$-Glied als $0z$ mitschreiben.` },
        { t: r`$14z^2 - 81z + 81 = 0 \Leftrightarrow z^2 - \dfrac{81}{14}z + \dfrac{81}{14} = 0$` },
        { t: r`$z_{2/3} = \dfrac{81}{28} \pm \sqrt{\dfrac{6561}{784} - \dfrac{4536}{784}} = \dfrac{81}{28} \pm \dfrac{45}{28}$, also $z_2 = \dfrac{9}{2},\ z_3 = \dfrac{9}{7}$` },
        { t: r`Rücksubstitution: $x^2 = -1$ hat keine Lösung; $\ x^2 = \dfrac{9}{2} \Rightarrow x = \pm\dfrac{3}{\sqrt{2}}$; $\ x^2 = \dfrac{9}{7} \Rightarrow x = \pm\dfrac{3}{\sqrt{7}}$` },
        { t: r`Symmetrie: $f(-x) = 14(-x)^6 - 67(-x)^4 + 81 = 14x^6 - 67x^4 + 81 = f(x)$ für alle $x \in \mathbb{R}$, also ist $f$ gerade.`, w: r`Nur gerade Exponenten. Passt dazu, dass die Nullstellen paarweise $\pm$ auftreten.` },
      ],
      ergebnis: r`$x_{1/2} = \pm\dfrac{3}{\sqrt{2}} \approx \pm 2{,}12$, $\ x_{3/4} = \pm\dfrac{3}{\sqrt{7}} \approx \pm 1{,}13$; $f$ ist gerade.`,
      fehler: [
        r`Nach der Substitution die $pq$-Formel versuchen: Die Gleichung in $z$ hat Grad 3.`,
        r`$z = -1$ als Nullstelle von $f$ angeben: Das ist ein $z$-Wert, und $x^2 = -1$ hat keine Lösung.`,
      ],
    },

    // ---------------- Aufgabe 4 (Besprechung) ----------------
    {
      id: 'ue02-a4',
      typ: 'aufgabe',
      teil: 'besprechung',
      nr: '4',
      thema: 'Linearfaktoren',
      quelle: 'Übung 2, Aufgabe 4',
      herkunft: 'claude',
      rezept: 'vl04-linearfaktoren',
      frage: r`Wie lauten die Funktionsgleichungen der Polynomfunktionen vom Grad 5, die für $x = -2,\ x = -1,\ x = 0,\ x = 1$ und $x = 2$ eine Nullstelle haben?`,
      tipps: [
        r`Fünf Nullstellen bei Grad 5: Das Polynom lässt sich vollständig in Linearfaktoren zerlegen.`,
        r`Zu jeder Nullstelle $x_i$ gehört ein Faktor $(x - x_i)$. Was ist mit dem Leitkoeffizienten?`,
      ],
      schritte: [
        { t: r`Linearfaktorzerlegung: $f(x) = a \cdot (x + 2)(x + 1) \cdot x \cdot (x - 1)(x - 2)$`, w: r`Der Leitkoeffizient $a$ ist durch die Nullstellen nicht festgelegt. Deshalb fragt die Aufgabe nach „den Funktionsgleichungen“ (Mehrzahl).` },
        { t: r`$a \ne 0$, sonst wäre es kein Polynom vom Grad 5.` },
        { t: r`Zusammenfassen mit der 3. binomischen Formel: $(x + 1)(x - 1) = x^2 - 1$ und $(x + 2)(x - 2) = x^2 - 4$` },
        { t: r`$f(x) = a \cdot x (x^2 - 1)(x^2 - 4) = a \cdot (x^5 - 5x^3 + 4x)$` },
      ],
      ergebnis: r`$f(x) = a \cdot (x^5 - 5x^3 + 4x)$ mit beliebigem $a \in \mathbb{R} \setminus \{0\}$`,
      fehler: [
        r`Nur $a = 1$ angeben: Jeder Vorfaktor $a \ne 0$ liefert dieselben Nullstellen.`,
        r`Den Faktor $x$ für die Nullstelle 0 vergessen.`,
      ],
    },
  ],

  formelblatt: [],
};
