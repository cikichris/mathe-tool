# Mathe-Tool

Lern-App für **Mathematik (RE), Wintersemester 26/27**. Vorlesungen und Übungen werden Woche für Woche eingepflegt und als Karten und Aufgaben abgefragt. Ein Wiederholungsplan sorgt dafür, dass alles bis zur Klausur regelmäßig wiederkommt.

- **Heute:** Abfrage aus fälligen Wiederholungen und neuen Karten, Fortschritt pro Einheit, Schwachstellen.
- **Inhalte:** alle Karten nach Woche, Vorlesung und Übung. Jede Einheit lässt sich frei üben.
- **Aufgaben** mit gestuften Tipps, kommentiertem Lösungsweg, typischen Fehlern und dem Rezept für den Aufgabentyp.
- **Formelblatt:** Sammlung für das erlaubte A4-Blatt, mit Druckansicht.
- **Einstellungen:** Klausurtermin, neue Karten pro Tag, Login.

Das Konzept steht in [KONZEPT.md](KONZEPT.md).

## Aktueller Inhalt

| Woche | Einheit | Karten |
|---|---|---|
| 1 | Vorlesung 1: Grundbegriffe und Funktionsbegriff | 14 |
| 1 | Vorlesung 2: Affin-lineare Funktionen | 14 |
| 1 | Übung 1: Terme, Gleichungen und Geraden | 18 |
| 2 | Vorlesung 3: Polynomfunktionen, Symmetrie und Nullstellen | 25 |

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
2. Claude legt `content/vlXX.js` bzw. `content/ueXX.js` an und trägt die Datei in `content/index.js` ein.
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
