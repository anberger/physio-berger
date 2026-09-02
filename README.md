# Physiotherapie Monia Berger – Fritzens & Hausbesuche

Eine moderne, minimalistische und suchmaschinenoptimierte Website für Monia Berger (Physiotherapeutin in Fritzens & Umgebung).

---

## 🌟 Wichtigste Eigenschaften & Highlights

1. **Minimalistisches & beruhigendes Farbkonzept:**
   - Sanfte Natur- und Salbeitöne, warmer Sand-Hintergrund und klares Anthrazit für höchste Lesbarkeit.
   - Kein visueller Ballast, genau 1 ausgewähltes, stimmungsvolles Behandlungsbild.

2. **Schnell zum Relevanten:**
   - Prominente Terminanfrage- und E-Mail-Buttons direkt im oberen Sichtbereich (Above-the-Fold).
   - Wahltherapie- & Kostenrückerstattungs-Erklärung (ÖGK, BVAEB, SVS & private Zusatzversicherung) in 3 einfachen Schritten.

3. **Physiotherapie & Hausbesuche:**
   - Eigene Sektion für Hausbesuche in **Wattens, Volders, Fritzens, Baumkirchen, Hall in Tirol, Schwaz & Umgebung**.

4. **Lage & S-Bahn Erreichbarkeit:**
   - Gezielte Ausweisung der fußläufigen Nähe zur S-Bahn Station (inkl. Fahrzeiten-Übersicht für Patient:innen aus Innsbruck, Hall und Schwaz).

5. **Interaktive Termin- & Kontaktanfrage:**
   - Formular zur Auswahl von Praxisbesuch vs. Hausbesuch mit automatischer E-Mail-Generierung (`mailto:`) und Klick-zu-Anruf (`tel:`).

6. **Lokale SEO & Google Rich Snippets:**
   - Vollständige Meta-Tags, OpenGraph und `Schema.org / JSON-LD` für `Physiotherapist` & `MedicalBusiness`.

---

## 🛠️ Anpassungen für den Live-Betrieb

In der Datei [`index.html`](file:///C:/Software/physio-berger/index.html) können folgende Platzhalter mit Monias realen Daten ersetzt werden:

- **E-Mail-Adresse:** `kontakt@physio-monia.at`
- **Adresse:** `Bichlweg 17b, 6122 Fritzens`
- **Therapeutin:** *Monia Berger*

---

## 🚀 Bereitstellung auf GitHub Pages

Die Website ist vollständig für das Hosting auf **GitHub Pages** vorbereitet:

1. **Dateien committen & zu GitHub pushen:**
   ```bash
   git add .
   git commit -m "Initial release for GitHub Pages"
   git branch -M main
   git remote add origin https://github.com/<DEIN-NUTZERNAME>/physio-berger.git
   git push -u origin main
   ```

2. **GitHub Pages aktivieren (falls nicht automatisch aktiv):**
   - Gehe im GitHub Repository auf **Settings** → **Pages**.
   - Unter **Build and deployment** / **Source**: Wähle **GitHub Actions** (oder *Deploy from a branch* -> `main` / `/ (root)`).
   - Die Website wird bei jedem `git push` auf den `main`-Branch automatisch unter `https://<dein-nutzername>.github.io/physio-berger/` veröffentlicht.

3. **Eigene Domain verknüpfen (z.B. physio-berger.at):**
   - Unter **Settings** → **Pages** → **Custom domain** kannst du deine eigene Domain eintragen und HTTPS aktivieren.

