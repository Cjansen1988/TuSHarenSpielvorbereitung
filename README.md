# TuS Haren 2 – Spielvorbereitung

Web-App für die Spielvorbereitung: Kaderliste, Aufstellung mit System, Spielbericht
(Torschützen, Karten, Wechsel) und Statistik. Läuft mit einem **eigenen, neuen
Firebase-Projekt** (komplett getrennt von eurer Kegel-App) und synchronisiert
live zwischen euch beiden.

## 1. Neues Firebase-Projekt anlegen

1. Öffnet die [Firebase-Konsole](https://console.firebase.google.com) und
   klickt oben auf **"Projekt hinzufügen"** (nicht das Kegel-Projekt auswählen).
2. Einen Namen vergeben, z.B. "TuS Haren 2". Google Analytics könnt ihr bei der
   Einrichtung abwählen, das braucht ihr hier nicht.
3. **Firestore aktivieren**: Menü *Build → Firestore Database → Datenbank erstellen*.
   Modus "Produktion" wählen, Standort z.B. `eur3 (Europe-West)`.
4. **Auth aktivieren**: Menü *Build → Authentication → Sign-in method → E-Mail/Passwort*
   aktivieren.
5. **Web-App registrieren**: Projekteinstellungen (Zahnrad oben links) →
   *Eure Apps* → Web-App hinzufügen (`</>`-Symbol). Einen Namen vergeben
   (z.B. "Spielvorbereitung"), **kein** Hosting-Setup nötig, ihr bekommt danach
   ein Konfigurationsobjekt (`apiKey`, `authDomain`, `projectId`, …).
6. Diese Werte in `src/firebase.js` eintragen (die Platzhalter `DEIN_...` ersetzen).
   Diese Werte sind clientseitig sichtbar und nicht geheim — der eigentliche
   Schutz kommt über die Firestore-Regeln (Schritt 4 unten).

Weil es ein eigenes, neues Projekt ist, gibt es keinerlei Überschneidung mit
der Kegel-App — ihr müsst euch um nichts Zusätzliches kümmern. Die Daten
liegen trotzdem in einer eigenen Collection `tusharen2`, das schadet nichts
und lässt sich später leicht erweitern.

## 2. Beide Trainer-Konten anlegen

Startet die App einmal lokal (siehe Schritt 3) oder direkt nach dem ersten
Deploy, und legt über **"Noch kein Konto? Hier erstellen"** eure beiden
E-Mail/Passwort-Konten an.

## 3. Lokal starten (zum Testen)

```bash
npm install
npm run dev
```

Öffnet die angezeigte lokale Adresse (meist `http://localhost:5173`).

## 4. Firestore-Regeln anpassen & deployen

In `firestore.rules` die beiden Beispiel-E-Mails durch eure echten ersetzen:

```
"trainer1@example.com",
"trainer2@example.com"
```

Dann deployen (einmalig `firebase login` und `firebase use --add` für euer
neues Projekt, falls noch nicht geschehen):

```bash
firebase deploy --only firestore:rules
```

Damit können nur eure beiden Konten die Daten lesen/schreiben — auch wenn
jemand anders zufällig ein Konto über den Signup-Screen anlegt, sieht er/sie
keine Daten.

**Tipp:** Sobald beide Konten existieren, könnt ihr den "Konto erstellen"-Button
in `src/App.jsx` (Komponente `AuthGate`) entfernen oder verstecken, damit
niemand sonst versucht, sich anzumelden.

## 5. Code auf GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <eure-github-repo-url>
git push -u origin main
```

## 6. Automatisches Deployment über GitHub Actions → Firebase Hosting

1. Firebase CLI installieren (falls nicht vorhanden): `npm install -g firebase-tools`
2. `firebase login`
3. Im Projektordner: `firebase init hosting:github`
   - Das führt euch durch die Verknüpfung mit eurem GitHub-Repo und legt
     automatisch das Secret `FIREBASE_SERVICE_ACCOUNT` in GitHub an.
   - Bestehende `firebase.json` und den Workflow unter
     `.github/workflows/deploy.yml` bei Nachfrage **nicht überschreiben lassen**
     bzw. Werte danach vergleichen — `projectId: DEIN_PROJEKT` im Workflow
     durch eure echte Projekt-ID ersetzen.
4. Ab jetzt: jeder `git push` auf `main` baut die App automatisch und
   veröffentlicht sie unter `https://DEIN_PROJEKT.web.app`.

Falls ihr lieber manuell deployen wollt statt über GitHub Actions:

```bash
npm run build
firebase deploy --only hosting
```

## Datenstruktur in Firestore

Alle Daten liegen in der Collection `tusharen2`, jeweils als ein Dokument:

- `tusharen2/squad` – Kaderliste
- `tusharen2/currentGame` – aktuelle Aufstellung, Spieltyp, Spielbericht
- `tusharen2/matches` – Statistik-Archiv aller abgeschlossenen Spiele
- `tusharen2/credentials` – Logins/Zugänge (unverschlüsselt, siehe Hinweis in der App)

Änderungen werden per Firestore-Realtime-Listener sofort bei beiden
angezeigt, ohne dass jemand neu laden muss.
