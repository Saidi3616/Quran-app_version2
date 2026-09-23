# Opgaver 001: Tekst og navigation

|            |                      |
| ---------- | -------------------- |
| **Spec**   | [`spec.md`](spec.md) |
| **Plan**   | [`plan.md`](plan.md) |
| **Status** | Klar                 |

## Sådan bruger du listen

- Vi tager **én opgave ad gangen**, oppefra og ned.
- Hver opgave har et **"Færdig når"**-punkt. Opgaven er først færdig, når det er opfyldt, og testene er grønne.
- Efter hver opgave laver vi **ét commit**, så git-historikken bliver en dagbog over projektet.
- `[P]` betyder, at opgaven _kan_ laves parallelt med den foregående. `H1`–`H6` henviser til brugerhistorierne i spec'en.
- Hver **milepæl** slutter med noget, du kan se og prøve i browseren.

Afkryds opgaverne (`- [x]`), efterhånden som de bliver færdige.

---

## Milepæl 0: Fundament

_Resultat: Et tomt React-projekt, der kører, og hvor testene er sat op._

- [x] **T001 · Opret projektet**
      Opret et Vite-projekt med React og TypeScript. Tilføj `.gitignore` og scripts: `dev`, `build`, `test`, `lint`.
      _Du lærer:_ npm, `package.json`, og hvad en udviklingsserver er.
      **Færdig når:** `npm run dev` viser en side i browseren, og `npm run build` virker uden fejl.

- [x] **T002 · Kodekvalitet**
      Sæt Prettier op (oxlint følger med fra T001). Tilføj scriptet `format`.
      **Færdig når:** `npm run lint` og `npm run format:check` kører uden fejl.

- [x] **T003 · Testværktøjer**
      Sæt Vitest + Testing Library og Playwright op. Skriv én "hello world"-test af hver slags.
      _Du lærer:_ hvad en test er, og hvorfor vi skriver dem.
      **Færdig når:** `npm test` og `npm run test:e2e` er grønne.

## Milepæl 1: Data på plads

_Resultat: Koranens tekst ligger i projektet, og testene beviser, at den er korrekt._

- [ ] **T004 · Hent Tanzil-filerne** _(din opgave, se "Sådan henter du filerne" nederst)_
      Læg filerne **uændret** i `data/tanzil/` sammen med en `README.md`, der noterer kilde, dato, version, valgte download-indstillinger og copyright-teksten.
      Filerne er: Uthmani-tekst (XML), Simple Clean-tekst (XML), Quran-metadata (XML) og Sahih International `en.sahih` (XML).
      **Færdig når:** de fire filer og README'en er committet.

- [ ] **T005 · Undersøg filernes format**
      Åbn filerne og beskriv deres struktur i `data/tanzil/README.md`. Find især ud af, **hvordan Bismillah er markeret** (plan, afsnit 7).
      _Du lærer:_ at læse XML og at undersøge data, før man skriver kode.
      **Færdig når:** plan.md afsnit 11, punkt 2, er besvaret og krydset af.

- [ ] **T006 · Datatyper**
      Skriv `Sura`, `Ayah`, `VerseKey` osv. i `src/quran/types.ts` (plan, afsnit 6).
      **Færdig når:** filen kan kompileres (`npm run build`).

- [ ] **T007 · Byggescript: XML → JSON**
      Skriv `scripts/build-data.ts`, der læser filerne i `data/tanzil/` og skriver `public/data/suras.json`, `quran-uthmani.json`, `quran-clean.json` og `en.sahih.json`. Scriptet kører automatisk før `dev` og `build`.
      **Færdig når:** JSON-filerne bliver lavet, og `public/data/` er med i `.gitignore`, fordi de genereres.

- [ ] **T008 · Test af dataintegritet** _(SC-003, SC-004)_
      Test at:
  - der er 114 suraer og 6.236 vers
  - 20 stikprøvevers er **tegn for tegn** identiske med XML-filen
  - alle juz (1–30) og sider (1–604) peger på et vers, der findes
  - oversættelsen har præcis ét vers for hvert arabisk vers.
    **Færdig når:** testene er grønne. _Det er den vigtigste test i hele projektet (princip 1)._

- [ ] **T009 · Modulet `quran/`**
      Funktionerne `getSuras()`, `getSura(n)`, `getTranslation(n)`, `findJuz(j)` og `findPage(p)`. De indlæser JSON-filerne og gemmer dem i hukommelsen, så de kun hentes én gang.
      **Færdig når:** der er enhedstests for hver funktion, og de er grønne.

## Milepæl 2: Læs en sura (H1)

_Resultat: Du kan åbne appen og læse Koranen._ 🎉

- [ ] **T010 · Skrifttype og grundlayout**
      Installer `@fontsource/amiri-quran`, og læg licensfilen ved. Lav et grundlayout med topbar og indhold, bygget til 360 px (NFR-003).
      **Færdig når:** arabisk tekst vises i Amiri Quran.

- [ ] **T011 · Routing**
      Sæt React Router op med de routes, der står i plan afsnit 5. Siderne må gerne være tomme foreløbig.
      **Færdig når:** alle URL'er viser deres (tomme) side, og tilbage-knappen virker.

- [ ] **T012 · Suraliste** _(FR-001)_
      Forsiden viser 114 suraer med nummer, arabisk navn, translittereret navn, antal vers og Mekka/Medina.
      **Færdig når:** accepttest H1.1 er grøn.

- [ ] **T013 · Komponenterne `Verse` og `VerseMarker`** _(FR-003, FR-004)_
      Et vers vises RTL og slutter med `۝` plus versnummeret med arabiske cifre.
      **Færdig når:** komponenttesten er grøn (tallet 12 bliver til `١٢`, og teksten har `dir="rtl"`).

- [ ] **T014 · Læsevisning** _(FR-002)_
      `/sura/:n` viser alle vers. Bismillah vises som overskrift, dog ikke i sura 1 og 9.
      **Færdig når:** accepttest H1.2–H1.4 er grøn.

## Milepæl 3: Navigation (H2)

- [ ] **T015 · Hop til vers** _(FR-005)_
      `/sura/:n/:aya` ruller til verset og fremhæver det kortvarigt. Et vers, der ikke findes, giver en venlig besked.
      **Færdig når:** accepttest H2.1–H2.2 er grøn.

- [ ] **T016 · Juz og side** _(FR-005)_
      `/juz/:n` og `/page/:n` viderestiller til første vers.
      **Færdig når:** accepttest H2.3–H2.4 og SC-004 er grønne.

- [ ] **T017 · Navigationspanel og placering** _(FR-005, FR-006)_
      Et panel, hvor man vælger sura:vers, juz eller side. Læsevisningen viser aktuel sura, juz og side.
      **Færdig når:** accepttest H2.5 er grøn.

## Milepæl 4: Oversættelse og brugerdata (H3, H4, H6)

- [ ] **T018 · Modulet `storage/`** _(FR-016)_
      Gem og hent `settings`, `bookmarks` og `lastRead` i `localStorage` med versionsnummer. Hvis data er ødelagt eller mangler, bruges standardværdier.
      _Du lærer:_ at data fra "omverdenen" altid skal kontrolleres, før man bruger dem.
      **Færdig når:** enhedstestene er grønne, også testen hvor der ligger ødelagte data.

- [ ] **T019 · Oversættelse til/fra** _(FR-007, FR-008)_
      Sahih International vises under hvert vers. Den kan slås til og fra, og valget huskes.
      **Færdig når:** accepttest H3.1–H3.4 er grøn.

- [ ] **T020 · Bogmærker** _(FR-009)_
      En bogmærke-knap på hvert vers og siden `/bookmarks`.
      **Færdig når:** accepttest H4.1–H4.3 og H4.5 er grøn.

- [ ] **T021 · Fortsæt læsning** _(FR-010)_
      Den seneste læseposition gemmes, og forsiden viser "Continue reading".
      **Færdig når:** accepttest H4.4 er grøn.

- [ ] **T022 · Indstillinger: skrift og tema** _(FR-014, FR-015)_
      Siden `/settings` har to skriftstørrelser og lys/mørk/system. Farverne er CSS-variabler.
      **Færdig når:** accepttest H6.1–H6.3 er grøn.

## Milepæl 5: Søgning (H5)

- [ ] **T023 · Arabisk normalisering** _(FR-012)_
      Funktionen `normalizeArabic()` fjerner tashkeel og tatweel og ensretter alle alef-former (plan, afsnit 7).
      _Du lærer:_ Unicode, og at bogstaver ikke altid er, hvad de ser ud til.
      **Færdig når:** enhedstestene er grønne, fx at `normalizeArabic("ٱلرَّحْمَـٰنِ")` giver det samme som `normalizeArabic("الرحمن")`.

- [ ] **T024 · Søgefunktion** _(FR-011–FR-013)_
      `search(q)` finder suraer (navn eller nummer), arabiske vers (via Simple Clean) og engelske vers.
      **Færdig når:** enhedstestene er grønne, og søgningen tager under 1 sekund (NFR-002).

- [ ] **T025 · Søgeside**
      `/search` med resultater, hvor søgeordet er fremhævet, og beskeden "No results", når intet findes.
      **Færdig når:** accepttest H5.1–H5.6 er grøn.

## Milepæl 6: Offline, tilgængelighed og aflevering

- [ ] **T026 · PWA** _(NFR-001, NFR-004)_
      vite-plugin-pwa med manifest, ikon og precache af alle filer.
      **Færdig når:** Playwright-testen i flytilstand er grøn (SC-005).

- [ ] **T027 · About-side** _(FR-017)_
      Siden viser kilder og licenser fra `licenser.md` med link til Tanzil.net og kreditering af oversætter og skrifttype.
      **Færdig når:** siden viser alt det, som licenserne kræver.

- [ ] **T028 · Tilgængelighed** _(NFR-005)_
      `aria-label` på alle knapper, tjek af tastaturnavigation og kontrast.
      **Færdig når:** en automatisk tilgængelighedstest (axe) viser ingen alvorlige fejl.

- [ ] **T029 · Slutkontrol**
      Kør alle accepttests og succeskriterierne SC-001 til SC-005 igennem, og test appen på en rigtig telefon.
      **Færdig når:** alt er grønt. Så er fase 1 færdig! 🎉

---

## Sådan henter du filerne (T004)

Tanzil.net er blokeret i Claudes udviklingsmiljø, så der er to muligheder:

**Mulighed A: Åbn for Tanzil (anbefalet).** Tilføj `tanzil.net` til de tilladte domæner under
_Network access_ i miljøets indstillinger. Så kan Claude hente filerne og dokumentere præcis,
hvordan det blev gjort.

**Mulighed B: Hent dem selv.** Gå til [tanzil.net/download](https://tanzil.net/download/) og hent:

1. **Uthmani**, format **XML**. Notér de valgte indstillinger.
2. **Simple Clean**, format **XML**.
3. **Quran-metadata** (XML) fra [tanzil.net/docs](https://tanzil.net/docs/).
4. **Sahih International** (`en.sahih`), format **XML**, fra [tanzil.net/trans](https://tanzil.net/trans/).

Upload dem til mappen `data/tanzil/` på GitHub via _Add file → Upload files_ på branchen
`claude/sharp-brown-iwdpad`.
