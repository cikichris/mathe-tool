# Mathe-Tool

Lern-App für **Mathematik (RE), Wintersemester 26/27**. Vorlesungen und Übungen werden Woche für Woche eingepflegt und als Karten und Aufgaben abgefragt. Ein Wiederholungsplan sorgt dafür, dass alles bis zur Klausur regelmäßig wiederkommt.

- **Heute:** Lernserie mit Tagesziel, Abfrage aus fälligen Wiederholungen und neuen Karten, Fortschritt pro Einheit, Schwachstellen, Schnelltraining „Methode erkennen“.
- **Inhalte:** alle Karten nach Woche, Vorlesung und Übung. Jede Einheit lässt sich frei üben.
- **Aufgaben** mit gestuften Tipps, kommentiertem Lösungsweg, typischen Fehlern und dem Rezept für den Aufgabentyp.
- **Übung:** Besprechungs- und Präsenzaufgaben mit Lösungsweg zum Aufdecken. Vorher markierst du pro Aufgabe „Selbst gelöst“, „Mit Hilfe“ oder „Offen“ und notierst Fragen. In der Übung zeigt der Live-Modus eine Aufgabe nach der anderen mit großen Knöpfen, und der Bildschirm bleibt an.
- **Formelblatt:** Sammlung für das erlaubte A4-Blatt, mit Druckansicht.
- **Einstellungen:** Klausurtermin, neue Karten pro Tag, Login.

Das Konzept steht in [KONZEPT.md](KONZEPT.md).

## Aktueller Inhalt

| Woche | Vorlesungen | Übung |
|---|---|---|
| 1 | 1 Grundbegriffe und Funktionsbegriff, 2 Affin-lineare Funktionen | 1 Terme, Gleichungen und Geraden |
| 2 | 3 Polynomfunktionen, 4 Substitution, Polynomdivision, Linearfaktoren | 2 Nullstellen von Polynomfunktionen |
| 3 | 5 Exponential- und Logarithmusfunktionen, 6 Exponentialgleichungen | 3 Logarithmen und Exponentialgleichungen |
| 4 | 7 Logarithmengleichungen, 8 Selbststudium: Winkel und Dreiecke | 4 Logarithmen, Winkel und Dreiecke |
| 5 | 9 Sinus, Cosinus, Tangens, 10 Allgemeine Winkelfunktionen | 5 Periodische Funktionen und Sinusgleichungen |
| 6 | 11 Cosinus-/Tangensgleichungen und Ableitungsbegriff, 12 Ableitungsregeln | 6 Winkelfunktionen und erste Ableitungen |

Insgesamt 254 Karten, davon 134 Rechenaufgaben, plus 80 Aufgaben im Schnelltraining „Methode erkennen“. Präsenzübungen 1 bis 5 sind bei den Übungsblättern eingetragen.

Bei jeder Aufgabe steht, woher die Lösung stammt: aus der offiziellen Lösung, aus der Vorlesung oder von Claude (dann noch nicht mit einer Musterlösung abgeglichen).

## Wo läuft was?

| Teil | Aufgabe |
|---|---|
| Dieses Repository | App und Lerninhalte (`content/`) |
| GitHub Pages | veröffentlicht den Zweig `main` als Webseite |
| Supabase | speichert den Lernstand, damit er auf allen Geräten gleich ist |
| Repository `mathe-material` (privat) | Folien, Übungsblätter und Mitschriften |

Ohne Supabase-Zugangsdaten in `config.js` speichert die App den Lernstand nur im jeweiligen Browser.

## Einrichten

### 1. GitHub Pages einschalten

1. Den Zweig mit der App per Pull Request nach `main` übernehmen.
2. Im Repository **Settings → Pages** öffnen.
3. Bei **Source** „Deploy from a branch“ wählen, Branch `main`, Ordner `/ (root)`, dann **Save**.
4. Nach etwa einer Minute ist die App unter `https://cikichris.github.io/mathe-tool/` erreichbar.

### 2. Supabase verbinden

1. Im Supabase-Projekt den **SQL Editor** öffnen, den kompletten Inhalt von [`supabase/schema.sql`](supabase/schema.sql) einfügen und **Run** klicken. Unten muss „Success. No rows returned“ stehen.
2. Unter **Authentication → Users → Add user → Create new user** einen Nutzer mit E-Mail und Passwort anlegen und dabei **Auto Confirm User** anhaken.
3. Unter **Authentication → Sign In / Providers** bei „Email“ die Option **Allow new users to sign up** ausschalten. Dann kann sich niemand sonst registrieren.
4. Unter **Project Settings → API Keys** die **Project URL** und den **Publishable Key** kopieren und in [`config.js`](config.js) eintragen.
5. In der App unter **Einstellungen** mit E-Mail und Passwort anmelden.

Die Datei `supabase/schema.sql` kann beliebig oft ausgeführt werden. Vorhandene Daten bleiben erhalten.

## Neue Woche einpflegen

1. Material ins private Repository `mathe-material` legen oder im Chat hochladen.
2. Claude legt `content/vlXX.js` bzw. `content/ueXX.js` an und trägt die Datei in `content/index.js` ein. Aufgaben, die in der Übung besprochen werden, bekommen `teil: 'besprechung'` (Präsenzaufgaben `teil: 'praesenz'`) und eine Nummer `nr`. Sie erscheinen dann unter „Übung“.
3. Prüfen: `node tools/check-content.mjs`
4. Pull Request nach `main` mergen. Kurz darauf ist die neue Woche online.

Die `id` einer Karte darf nachträglich nicht mehr geändert werden. An ihr hängt der gespeicherte Lernstand.

## Entwicklung

Die App kommt ohne Build-Schritt aus. Zum lokalen Ansehen genügt ein einfacher Webserver:

```
python3 -m http.server 8000
```

Prüfungen:

```
node tools/check-content.mjs    # Inhalte und Formeln
node --test tools/test.mjs      # Wiederholungsplan und Abgleich
```
