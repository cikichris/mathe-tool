// Vorlesung 1 (12.10.2026) durchgehen: Zahlenmengen, Mengenschreibweisen, Funktionsbegriff
const r = String.raw;

export default {
  unit: 'vl01',
  abschnitte: [
    {
      id: 'vl01-d01',
      folien: '3',
      titel: 'Wichtige Zahlenmengen',
      folie: r`$\mathbb{N}$, $\mathbb{N}_0$, $\mathbb{Z}$, $\mathbb{Q}$, $\mathbb{R}$, $\mathbb{C}$`,
      notizen: [
        { t: r`$\mathbb{N}$: $1, 2, 3, \dots$ und $\mathbb{N}_0$: $0, 1, 2, 3, \dots$`, w: r`Der Index 0 sagt: Die Null gehört dazu.` },
        { t: r`$\mathbb{Z}$: $\dots, -2, -1, 0, 1, 2, \dots$`, w: r`Ganze Zahlen: auch die negativen.` },
        { t: r`$\mathbb{Q}$: zusätzlich Brüche mit ganzen Zahlen in Zähler und Nenner`, w: r`z. B. $\frac{3}{4}$ oder $-\frac{1}{2}$.` },
        { t: r`$\mathbb{R}$: zusätzlich irrationale Zahlen wie $\pi$, $\sqrt{2}$, …`, w: r`Zahlen, die man nicht als Bruch schreiben kann.` },
        { t: r`$\mathbb{C}$: → später`, w: r`` },
      ],
      kern: r`$\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R}$: Jede Menge enthält die vorige und noch mehr.`,
      karten: ['vl01-zahlenmengen'],
    },
    {
      id: 'vl01-d02',
      folien: '4',
      titel: 'Mengenschreibweisen und Intervalle',
      folie: r`- Auflisten: $\{1, 2, 3, 4, 5\}$
- Ausschließen: $\mathbb{R} \setminus \{0\}$
- Intervalle: $[0; 1] = \{x \in \mathbb{R} \mid 0 \le x \le 1\}$, $(0; 1)$, $(0; 1]$, $[0; \infty)$, Vereinigung $(0; 1) \cup (1; 3)$
- Leere Menge: $\emptyset$ oder $\{\,\}$`,
      notizen: [
        { t: r`Zum Zeichen $\setminus$: „außer/ohne“`, w: r`$\mathbb{R} \setminus \{0\}$: alle reellen Zahlen ohne die Null.` },
        { t: r`Zum Strich $\mid$ in $\{x \in \mathbb{R} \mid \dots\}$: „mit der Eigenschaft“`, w: r`Gelesen: „alle reellen $x$ mit der Eigenschaft …“.` },
        { t: r`$[0; 1]$: inklusive 0 und 1. $(0; 1)$: ohne 0 und 1. $(0; 1]$: ohne 0, inklusive 1.`, w: r`Eckige Klammer: Rand gehört dazu. Runde Klammer: Rand gehört nicht dazu. Bei $\infty$ immer rund.` },
      ],
      kern: r`Eckig = mit Rand, rund = ohne Rand.`,
      check: { frage: r`Schreibe $\{x \in \mathbb{R} \mid x > 2\}$ als Intervall.`, antwort: r`$(2; \infty)$` },
      karten: ['vl01-intervalle', 'vl01-mengen-zeichen', 'vl01-intervall-mc'],
    },
    {
      id: 'vl01-d03',
      folien: '5',
      titel: 'Termumformung oder Äquivalenzumformung?',
      folie: r`**Terme:** sinnvolle Ausdrücke wie $\frac{1}{2} - \frac{1}{3}$ oder $(x + 1)^2$. Termumformungen lassen den Wert unverändert (Klammern auflösen, ausklammern, zusammenfassen, kürzen, erweitern).

**Gleichungen:** zwei Terme mit Gleichheitszeichen, z. B. $2x + 1 = -3$. Äquivalenzumformungen lassen die Lösungsmenge unverändert.`,
      kern: r`Terme formt man um, ohne ihren Wert zu ändern. Gleichungen formt man um, ohne ihre Lösungsmenge zu ändern.`,
      check: { frage: r`Ist „beide Seiten mit 0 multiplizieren“ eine Äquivalenzumformung?`, antwort: r`Nein. Danach gilt $0 = 0$ für jedes $x$, die Lösungsmenge hat sich verändert.` },
      karten: ['vl01-term-gleichung', 'vl01-aequivalenz-mc'],
    },
    {
      id: 'vl01-d04',
      folien: '7–8',
      titel: 'Was ist eine Funktion?',
      folie: r`Eine Funktion besteht aus Definitionsbereich $D$, Zielmenge $Z$ und einer Vorschrift $f$, die **jedem** $x \in D$ **genau ein** $f(x) \in Z$ zuordnet. Schreibweise $f: D \to Z$.

Maximaler Definitionsbereich: alle reellen Zahlen, für die die Vorschrift definiert ist.`,
      kern: r`Jedem $x$ aus $D$ genau ein Wert, und dieser Wert muss in $Z$ liegen.`,
      karten: ['vl01-funktion-def', 'vl01-max-definitionsbereich', 'vl01-maxdef-aufgabe'],
    },
    {
      id: 'vl01-d05',
      folien: '9',
      titel: 'Beispiele und Nicht-Beispiele',
      folie: r`1) $f: \mathbb{R} \to \mathbb{R}$, $f(x) = 2x + 1$
2) $g: \mathbb{R} \to \mathbb{R}$, $g(x) = x^2$
3) $h: [0; \infty) \to \mathbb{R}$, $h(x) = x^2$
4) $k: \mathbb{R} \to \mathbb{R}$, $k(x) = \frac{1}{x}$
5) $l: \mathbb{R} \to [0; \infty)$, $l(x) = x$`,
      notizen: [
        { t: r`1), 2), 3): ✓ Funktionen.`, w: r`Für jedes $x$ aus $D$ gibt es genau einen Wert.` },
        { t: r`Zu 2) und 3): „zwei verschiedene Funktionen!“`, w: r`Gleiche Vorschrift $x^2$, aber anderer Definitionsbereich. Zu einer Funktion gehören $D$ und $Z$ dazu.` },
        { t: r`4) keine Funktion! Aber z. B. $k: \mathbb{R} \setminus \{0\} \to \mathbb{R}$, $k(x) = \frac{1}{x}$`, w: r`Für $x = 0$ gibt es keinen Wert. Man muss die 0 aus $D$ herausnehmen.` },
        { t: r`5) keine Funktion! Aber z. B. $l: \mathbb{R} \to \mathbb{R}$, $l(x) = x$`, w: r`Für $x = -1$ ist $l(-1) = -1$, das liegt nicht in der Zielmenge $[0; \infty)$.` },
      ],
      kern: r`Zwei Fallen: ein $x$ ohne Wert (Definitionsbereich zu groß) oder ein Wert außerhalb der Zielmenge.`,
      karten: ['vl01-gleiche-funktion', 'vl01-kehrwert-funktion', 'vl01-zielmenge-funktion'],
    },
    {
      id: 'vl01-d06',
      folien: '10–12',
      titel: 'Funktionsgraph und Senkrechten-Test',
      folie: r`Graph: $G_f = \{(x, y) \in D \times Z \mid y = f(x)\} \subset \mathbb{R}^2$.

Folie 11: Welche Abbildungen a) bis e) sind (bei geeignetem Definitionsbereich) Funktionsgraphen?`,
      notizen: [
        { t: r`a) Parabel ✓, c) Sinuskurve ✓, e) Halbkreis-Bogen ✓`, w: r`Jede senkrechte Linie trifft den Graphen höchstens einmal.` },
        { t: r`b) liegende Parabel ✗, d) Kreis ✗: Markiert sind zwei Punkte übereinander.`, w: r`Zu einem $x$ gehören zwei $y$-Werte, das widerspricht „genau ein Wert“.` },
        { t: r`„Es darf keine verschiedenen Punkte mit derselben x-Koordinate geben!“`, w: r`Das ist der Senkrechten-Test.` },
        { t: r`Folie 12: $f: \mathbb{R} \to [0; \infty)$ und $f: [0; \infty) \to [0; \infty)$, beide $x^2$: zwei verschiedene Funktionen!`, w: r`Der zweite Graph ist nur der rechte Ast der Parabel.` },
      ],
      kern: r`Senkrechten-Test: Kein $x$ darf zwei Punkte auf dem Graphen haben.`,
      karten: ['vl01-graph-def', 'vl01-graph-test'],
    },
  ],
};
