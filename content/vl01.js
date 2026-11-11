// Vorlesung 01 (12.10.2026): Grundbegriffe, Funktionsbegriff
const r = String.raw;

const FUNKTION_OPTIONEN = [
  r`Ja, das ist eine Funktion.`,
  r`Nein: Die Vorschrift ist nicht für jedes $x \in D$ definiert.`,
  r`Nein: Nicht alle Funktionswerte liegen in der Zielmenge $Z$.`,
  r`Nein: Die Zuordnung ist nicht eindeutig.`,
];

export default {
  id: 'vl01',
  art: 'vorlesung',
  nummer: 1,
  datum: '2026-10-12',
  titel: 'Grundbegriffe und Funktionsbegriff',
  ueberblick: r`Zahlenmengen und Intervalle, Terme und Gleichungen, was eine Funktion ist (Definitionsbereich, Zielmenge, Vorschrift) und woran man einen Funktionsgraphen erkennt.`,

  karten: [
    {
      id: 'vl01-zahlenmengen',
      typ: 'definition',
      thema: 'Grundbegriffe',
      quelle: 'VL 1, Folie 3',
      frage: r`Welche Zahlen gehören zu $\mathbb{N}$, $\mathbb{N}_0$, $\mathbb{Z}$, $\mathbb{Q}$ und $\mathbb{R}$?`,
      antwort: r`- $\mathbb{N}$: natürliche Zahlen $1, 2, 3, \dots$
- $\mathbb{N}_0$: natürliche Zahlen mit Null $0, 1, 2, 3, \dots$
- $\mathbb{Z}$: ganze Zahlen $\dots, -2, -1, 0, 1, 2, \dots$
- $\mathbb{Q}$: rationale Zahlen, zusätzlich alle Brüche mit ganzen Zahlen in Zähler und Nenner
- $\mathbb{R}$: reelle Zahlen, zusätzlich die irrationalen Zahlen wie $\pi$ oder $\sqrt{2}$`,
      merke: r`Jede Menge enthält die vorherige: $\mathbb{N} \subset \mathbb{N}_0 \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R}$. Die komplexen Zahlen $\mathbb{C}$ kommen später.`,
    },
    {
      id: 'vl01-intervalle',
      typ: 'definition',
      thema: 'Grundbegriffe',
      quelle: 'VL 1, Folie 4',
      frage: r`Was bedeuten die Intervalle $[0;1]$, $(0;1)$, $(0;1]$ und $[0;\infty)$?`,
      antwort: r`- $[0;1] = \{x \in \mathbb{R} \mid 0 \le x \le 1\}$: abgeschlossen, **mit** 0 und 1
- $(0;1) = \{x \in \mathbb{R} \mid 0 < x < 1\}$: offen, **ohne** 0 und 1
- $(0;1] = \{x \in \mathbb{R} \mid 0 < x \le 1\}$: halboffen, ohne 0, mit 1
- $[0;\infty) = \{x \in \mathbb{R} \mid x \ge 0\}$: alle Zahlen ab 0`,
      merke: r`Eckige Klammer: Randpunkt gehört dazu. Runde Klammer: Randpunkt gehört nicht dazu. Bei $\infty$ steht immer eine runde Klammer.`,
    },
    {
      id: 'vl01-mengen-zeichen',
      typ: 'definition',
      thema: 'Grundbegriffe',
      quelle: 'VL 1, Folie 4',
      frage: r`Was bedeuten $\mathbb{R} \setminus \{0\}$, $(0;1) \cup (1;3)$ und $\emptyset$?`,
      antwort: r`- $\mathbb{R} \setminus \{0\}$: alle reellen Zahlen **außer** 0 („$\mathbb{R}$ ohne 0“)
- $(0;1) \cup (1;3)$: Vereinigung der beiden Intervalle, also alle Zahlen zwischen 0 und 3 außer 1 (und ohne die Ränder)
- $\emptyset$ oder $\{\,\}$: die leere Menge, sie enthält kein Element`,
      merke: r`Der senkrechte Strich in $\{x \in \mathbb{R} \mid \dots\}$ liest sich „mit der Eigenschaft“.`,
    },
    {
      id: 'vl01-intervall-mc',
      typ: 'verstaendnis',
      thema: 'Grundbegriffe',
      quelle: 'VL 1, Folie 4',
      herkunft: 'zusatz',
      frage: r`Welches Intervall ist $\{x \in \mathbb{R} \mid -2 \le x < 5\}$?`,
      optionen: [r`$[-2;5)$`, r`$(-2;5]$`, r`$[-2;5]$`, r`$(-2;5)$`],
      richtig: 0,
      erklaerung: r`$-2 \le x$ heißt: $-2$ gehört dazu, also eckige Klammer. $x < 5$ heißt: $5$ gehört nicht dazu, also runde Klammer.`,
    },
    {
      id: 'vl01-term-gleichung',
      typ: 'definition',
      thema: 'Grundbegriffe',
      quelle: 'VL 1, Folie 5',
      frage: r`Was ist der Unterschied zwischen einem Term und einer Gleichung, und zwischen Termumformung und Äquivalenzumformung?`,
      antwort: r`**Term:** ein sinnvoller mathematischer Ausdruck, z. B. $\frac{1}{2} - \frac{1}{3}$ oder $(x+1)^2$.
Eine **Termumformung** lässt den **Wert des Terms** unverändert (Klammern auflösen, ausklammern, zusammenfassen, kürzen, erweitern).

**Gleichung:** zwei Terme, die durch ein Gleichheitszeichen verbunden sind, z. B. $2x + 1 = -3$. Die Lösungsmenge enthält alle Zahlen, für die die Gleichung wahr ist.
Eine **Äquivalenzumformung** lässt die **Lösungsmenge** unverändert.`,
      merke: r`Terme vereinfacht man (Gleichheitszeichen „$=$“ zwischen den Schritten). Gleichungen löst man (Äquivalenzpfeil „$\Leftrightarrow$“ zwischen den Schritten).`,
    },
    {
      id: 'vl01-aequivalenz-mc',
      typ: 'verstaendnis',
      thema: 'Grundbegriffe',
      quelle: 'Ergänzung zu VL 1, Folie 5',
      herkunft: 'zusatz',
      frage: r`Welche Umformung ist im Allgemeinen **keine** Äquivalenzumformung?`,
      optionen: [
        r`Auf beiden Seiten 3 addieren`,
        r`Beide Seiten mit 2 multiplizieren`,
        r`Beide Seiten quadrieren`,
        r`Beide Seiten durch 5 teilen`,
      ],
      richtig: 2,
      erklaerung: r`Quadrieren kann Lösungen hinzufügen: $x = 2$ hat nur die Lösung $2$, aber $x^2 = 4$ hat die Lösungen $2$ und $-2$. Nach dem Quadrieren ist deshalb immer eine Probe nötig. Ebenfalls verboten: mit 0 multiplizieren oder durch 0 teilen.`,
    },
    {
      id: 'vl01-funktion-def',
      typ: 'definition',
      thema: 'Funktionsbegriff',
      quelle: 'VL 1, Folie 7',
      frage: r`Woraus besteht eine Funktion $f: D \to Z$, und welche Bedingung muss die Zuordnung erfüllen?`,
      antwort: r`Eine Funktion besteht aus
- einem **Definitionsbereich** $D$,
- einer **Zielmenge** $Z$ und
- einer **Funktionsvorschrift** $f$,

die **jedem** Element $x \in D$ ein **eindeutiges** Element $f(x) \in Z$ zuordnet.

In dieser Vorlesung gilt immer $D \subseteq \mathbb{R}$ und $Z \subseteq \mathbb{R}$.`,
      merke: r`Drei Checks bei „Ist das eine Funktion?“:
1. Ist $f(x)$ für **jedes** $x \in D$ definiert?
2. Liegt jeder Wert $f(x)$ in $Z$?
3. Gibt es zu jedem $x$ **genau einen** Wert?`,
    },
    {
      id: 'vl01-max-definitionsbereich',
      typ: 'definition',
      thema: 'Funktionsbegriff',
      quelle: 'VL 1, Folie 8',
      frage: r`Was ist der maximale Definitionsbereich einer Funktionsvorschrift?`,
      antwort: r`Ist eine Funktionsvorschrift ohne Definitionsbereich gegeben, so ist der maximale Definitionsbereich die Menge **aller reellen Zahlen, für die die Vorschrift definiert ist**.`,
      merke: r`Praktisch: Starte mit $\mathbb{R}$ und nimm alles heraus, was Probleme macht. Bisher sind das: Nenner gleich 0 und negative Zahlen unter einer Wurzel.`,
    },
    {
      id: 'vl01-maxdef-aufgabe',
      typ: 'aufgabe',
      thema: 'Funktionsbegriff',
      quelle: 'Übungsvariante zu VL 1, Folie 8',
      herkunft: 'zusatz',
      frage: r`Bestimme den maximalen Definitionsbereich von
a) $f(x) = \dfrac{1}{x-2}$
b) $g(x) = \sqrt{x+3}$`,
      tipps: [
        r`Frag dich bei jeder Vorschrift: Für welche $x$ ist der Ausdruck **nicht** definiert?`,
        r`a) Ein Bruch ist nicht definiert, wenn der Nenner 0 ist. b) Eine Wurzel ist (im Reellen) nur für Zahlen $\ge 0$ definiert.`,
      ],
      schritte: [
        { t: r`a) Nenner gleich 0 setzen: $x - 2 = 0 \Leftrightarrow x = 2$`, w: r`Durch 0 darf man nicht teilen. Genau diese Stelle muss raus.` },
        { t: r`$D_f = \mathbb{R} \setminus \{2\}$` },
        { t: r`b) Bedingung für den Radikanden: $x + 3 \ge 0 \Leftrightarrow x \ge -3$`, w: r`Unter der Wurzel darf keine negative Zahl stehen. Null ist erlaubt, denn $\sqrt{0} = 0$.` },
        { t: r`$D_g = [-3;\infty)$` },
      ],
      ergebnis: r`a) $D_f = \mathbb{R} \setminus \{2\}$ $\quad$ b) $D_g = [-3;\infty)$`,
      fehler: [
        r`Bei b) eine runde Klammer setzen: $-3$ gehört dazu, weil $\sqrt{0}$ definiert ist.`,
        r`Bei a) $x = -2$ ausschließen: Der Nenner $x - 2$ wird bei $x = +2$ zu 0.`,
      ],
    },
    {
      id: 'vl01-gleiche-funktion',
      typ: 'verstaendnis',
      thema: 'Funktionsbegriff',
      quelle: 'VL 1, Folien 9 und 12',
      frage: r`$g: \mathbb{R} \to \mathbb{R},\ g(x) = x^2$ und $h: [0;\infty) \to \mathbb{R},\ h(x) = x^2$. Sind $g$ und $h$ dieselbe Funktion?`,
      optionen: [
        r`Ja, denn die Funktionsvorschrift ist gleich.`,
        r`Nein, denn die Definitionsbereiche sind verschieden.`,
      ],
      richtig: 1,
      erklaerung: r`Zu einer Funktion gehören Definitionsbereich, Zielmenge **und** Vorschrift. Der Graph von $g$ ist die ganze Parabel, der Graph von $h$ nur der rechte Ast. Es sind zwei verschiedene Funktionen.`,
    },
    {
      id: 'vl01-kehrwert-funktion',
      typ: 'verstaendnis',
      thema: 'Funktionsbegriff',
      quelle: 'VL 1, Folie 9',
      frage: r`Ist $k: \mathbb{R} \to \mathbb{R},\ k(x) = \dfrac{1}{x}$ eine Funktion?`,
      optionen: FUNKTION_OPTIONEN,
      optionenFest: true,
      richtig: 1,
      erklaerung: r`Für $x = 0$ ist $\frac{1}{x}$ nicht definiert, $0$ liegt aber in $D = \mathbb{R}$. Reparatur: $k: \mathbb{R} \setminus \{0\} \to \mathbb{R},\ k(x) = \frac{1}{x}$ ist eine Funktion.`,
    },
    {
      id: 'vl01-zielmenge-funktion',
      typ: 'verstaendnis',
      thema: 'Funktionsbegriff',
      quelle: 'VL 1, Folie 9',
      frage: r`Ist $l: \mathbb{R} \to [0;\infty),\ l(x) = x$ eine Funktion?`,
      optionen: FUNKTION_OPTIONEN,
      optionenFest: true,
      richtig: 2,
      erklaerung: r`Zum Beispiel ist $l(-1) = -1$, und $-1$ liegt nicht in $Z = [0;\infty)$. Reparatur: $l: \mathbb{R} \to \mathbb{R},\ l(x) = x$ ist eine Funktion.`,
    },
    {
      id: 'vl01-graph-def',
      typ: 'definition',
      thema: 'Funktionsbegriff',
      quelle: 'VL 1, Folie 10',
      frage: r`Was ist der Graph einer Funktion $f: D \to Z$?`,
      antwort: r`Der Graph ist die Menge aller Wertepaare $(x, y)$, für die $f(x) = y$ gilt:

$$G(f) = \{(x, y) \in D \times Z \mid y = f(x)\} \subset \mathbb{R}^2$$

Er ist eine Teilmenge der Ebene $\mathbb{R}^2$.`,
    },
    {
      id: 'vl01-graph-test',
      typ: 'verstaendnis',
      thema: 'Funktionsbegriff',
      quelle: 'VL 1, Folie 11',
      frage: r`Welche dieser Kurven kann **kein** Funktionsgraph sein?`,
      optionen: [
        r`Eine nach oben geöffnete Parabel`,
        r`Eine Sinuskurve`,
        r`Ein vollständiger Kreis`,
        r`Ein oberer Halbkreis`,
      ],
      richtig: 2,
      erklaerung: r`Bei einem Funktionsgraphen darf es **keine verschiedenen Punkte mit derselben $x$-Koordinate** geben, sonst wäre die Zuordnung nicht eindeutig. Test: Jede senkrechte Gerade darf die Kurve höchstens einmal treffen. Ein Kreis (und auch eine nach rechts geöffnete Parabel) wird zweimal getroffen.`,
    },
  ],

  formelblatt: [
    {
      id: 'fb-funktion-checks',
      titel: 'Funktion $f: D \\to Z$',
      inhalt: r`Jedem $x \in D$ genau ein $f(x) \in Z$. Checks: überall auf $D$ definiert · Werte in $Z$ · eindeutig.`,
    },
    {
      id: 'fb-max-definitionsbereich',
      titel: 'Maximaler Definitionsbereich',
      inhalt: r`$\mathbb{R}$ ohne Problemstellen: Nenner $\ne 0$, Radikand $\ge 0$.`,
    },
    {
      id: 'fb-intervalle',
      titel: 'Intervalle',
      standard: false,
      inhalt: r`$[a;b]$: mit Rand · $(a;b)$: ohne Rand · $\mathbb{R} \setminus \{0\}$: ohne 0.`,
    },
  ],
};
