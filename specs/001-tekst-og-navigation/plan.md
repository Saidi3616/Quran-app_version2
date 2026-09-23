# Teknisk plan 001: Tekst og navigation

|              |                      |
| ------------ | -------------------- |
| **Spec**     | [`spec.md`](spec.md) |
| **Status**   | Udkast               |
| **Oprettet** | 2026-09-23           |

> `spec.md` beskriver **hvad**. Dette dokument beskriver **hvordan**.
> Hvert valg har en begrundelse, så vi senere kan huske, _hvorfor_ vi valgte, som vi gjorde.

---

## 1. Kort fortalt

Vi bygger en **PWA** med **React + TypeScript**, som **Vite** pakker sammen. Koranens tekst og
Sahih International hentes **én gang fra Tanzil.net** og lægges ind i appen som JSON-filer.
Derfor behøver appen hverken server eller login, og den virker offline. Bogmærker og
indstillinger gemmes i browserens `localStorage`.

## 2. Ordliste for begyndere

| Ord                           | Betydning                                                                                                   |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **PWA** (Progressive Web App) | En hjemmeside, der kan installeres på telefonen og virke offline, næsten som en rigtig app.                 |
| **Service worker**            | Et lille script, som browseren kører i baggrunden. Det gemmer appens filer, så den kan åbnes uden internet. |
| **React**                     | Et bibliotek til at bygge brugerflader af små genbrugelige dele, som kaldes _komponenter_.                  |
| **TypeScript**                | JavaScript med _typer_. Editoren fanger mange fejl, før du overhovedet kører koden.                         |
| **Vite**                      | Et byggeværktøj, der starter en udviklingsserver på et sekund og pakker appen til udgivelse.                |
| **JSON**                      | Et simpelt tekstformat til data, fx `{"sura": 1, "aya": 1, "text": "..."}`.                                 |
| **localStorage**              | Et lille lager i browseren, der husker data på brugerens enhed, også efter genstart.                        |

## 3. Tekniske valg

| Område         | Valg                                                                     | Hvorfor                                                                                                                                                     | Fravalgt (og hvorfor)                                                                                    |
| -------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Sprog          | **TypeScript**                                                           | Typerne hjælper en begynder med at undgå fejl, og de fungerer også som dokumentation.                                                                       | JavaScript: fejl opdages først, når koden kører.                                                         |
| UI             | **React**                                                                | Det mest udbredte UI-bibliotek, så der findes flest guides og svar på nettet.                                                                               | Vue/Svelte: også gode, men har færre ressourcer.                                                         |
| Byggeværktøj   | **Vite**                                                                 | Hurtigt, enkelt og standardvalget til nye React-projekter.                                                                                                  | Next.js: har server-funktioner, vi ikke har brug for.                                                    |
| Navigation     | **React Router**                                                         | Giver hver visning sin egen URL, så man kan dele og bogmærke links i browseren.                                                                             | –                                                                                                        |
| Offline/PWA    | **vite-plugin-pwa**                                                      | Laver service worker og manifest automatisk.                                                                                                                | At skrive service workeren selv, hvilket er svært og fejlbehæftet.                                       |
| Arabisk skrift | **Amiri Quran**, lagt ind i appen                                        | Designet til Koranens tekst, understøtter Uthmani-tegn og versmærket ۝, og licensen (SIL OFL) er fri. Når skriften ligger i appen, virker den også offline. | At hente skriften fra Google Fonts: virker ikke offline. KFGQPC-skrifter: licensen er uklar.             |
| Lokale data    | **localStorage**                                                         | Bogmærker og indstillinger fylder kun få KB, og API'et er meget simpelt.                                                                                    | IndexedDB: kraftigere, men mere kompliceret, og det har vi ikke brug for endnu.                          |
| Test           | **Vitest** + **Testing Library** (enheder), **Playwright** (accepttests) | Vitest passer til Vite. Playwright styrer en rigtig browser og kan dermed køre spec'ens _Givet/Når/Så_-tests.                                               | –                                                                                                        |
| Kodekvalitet   | **oxlint** + **Prettier**                                                | oxlint finder fejl og er standard i Vites skabelon. Prettier formaterer koden ens hver gang.                                                                | ESLint: bruges meget, men er langsommere og kræver mere opsætning. Vites skabelon er skiftet til oxlint. |

## 4. Datakilde og licens

### Beslutning: Tanzil.net for fase 1

| Kilde                                | Fordele                                                                                                                                                          | Ulemper                                                                                                                                                                               | Valg                                           |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| **Tanzil.net** (downloadede filer)   | Verificeret Uthmani-tekst. Metadata til suraer, juz og sider (Madani, 604 sider). Sahih International findes. Filerne kan ligge i appen og dermed virke offline. | Har kun tekst og oversættelser (ingen lyd eller tafsir).                                                                                                                              | ✅ **Valgt**                                   |
| **Quran Foundation API** (Quran.com) | Meget indhold (lyd, tafsir, ord-for-ord).                                                                                                                        | Kræver en _client secret_, og den må ikke ligge i en app uden server. Vilkårene tillader kun, at indhold gemmes i **højst 7 dage**, hvilket strider mod vores offline-krav (NFR-001). | ❌ Ikke i fase 1. Vurderes igen i fase 2 og 3. |

### Licensvilkår (se [`../licenser.md`](../licenser.md))

- **Tanzil Uthmani-tekst:** Creative Commons Attribution 3.0. Teksten må kun bruges **uændret**. Tanzil.net skal krediteres med et link, og copyright-teksten skal følge med filerne.
- **Sahih International via Tanzil:** må kun bruges **ikke-kommercielt**. Kommerciel brug kræver tilladelse fra udgiveren (Dar Abul-Qasim).
  → Appen er **gratis og ikke-kommerciel** (besluttet, constitution princip 2), så vilkåret er opfyldt.

### Hvilke filer vi henter

| Fil fra Tanzil                   | Bruges til                                           |
| -------------------------------- | ---------------------------------------------------- |
| Uthmani-tekst (XML)              | Visning (FR-002)                                     |
| _Simple Clean_-tekst (XML)       | **Kun** søgning (FR-012), se afsnit 7                |
| Quran-metadata                   | Suranavne, antal vers, juz og sider (FR-001, FR-005) |
| Sahih International (`en.sahih`) | Oversættelse (FR-007)                                |

Filerne gemmes **uændret** i `data/tanzil/`. Et lille script (`scripts/build-data.ts`) omdanner
dem til JSON i `public/data/`. Scriptet ændrer ikke ét tegn i teksten, det flytter den kun over
i et andet format. En test sikrer, at det holder (se afsnit 9).

## 5. Arkitektur

```
┌──────────────────────── Browseren ─────────────────────────┐
│                                                             │
│  Sider (React-komponenter)                                  │
│   SuraList · Reader · Navigate · Search · Bookmarks · About │
│   Settings                                                  │
│          │                         │                        │
│          ▼                         ▼                        │
│  quran/  (læser data)       storage/ (brugerens data)       │
│   getSuras()                 bookmarks, lastRead,           │
│   getSura(n)                 settings                       │
│   findPage(p), findJuz(j)          │                        │
│   search(q)                        ▼                        │
│          │                   localStorage                   │
│          ▼                                                  │
│  public/data/*.json  ◄── gemt offline af service worker     │
└─────────────────────────────────────────────────────────────┘
        ▲
        │ genereres én gang, når appen bygges
  scripts/build-data.ts ◄── data/tanzil/*.xml (uændrede kildefiler)
```

**Hovedidé:** Komponenterne taler aldrig direkte med JSON-filerne eller med localStorage. De
bruger altid modulerne `quran/` og `storage/`. Det gør koden nem at teste og nem at ændre,
hvis vi fx senere skifter til IndexedDB.

### Mappestruktur

```
data/tanzil/            Uændrede kildefiler fra Tanzil (+ LICENSE-tekst)
scripts/build-data.ts   Omdanner XML → JSON
public/data/            Genereret JSON (må ikke redigeres i hånden)
public/fonts/           Amiri Quran
src/
  quran/                Typer + funktioner til at læse og søge i Koranen
  storage/              Bogmærker, læseposition, indstillinger
  pages/                En komponent pr. skærm
  components/           Små genbrugelige dele (Verse, VerseMarker, …)
tests/e2e/              Playwright-accepttests, én fil pr. brugerhistorie
```

### URL'er (routes)

| URL                                 | Skærm                           | Spec                    |
| ----------------------------------- | ------------------------------- | ----------------------- |
| `/`                                 | Suraliste + "Continue reading"  | Historie 1 og 4         |
| `/sura/:n` og `/sura/:n/:aya`       | Læsevisning (ruller til verset) | Historie 1 og 2         |
| `/juz/:n`, `/page/:n`               | Viderestiller til første vers   | Historie 2              |
| `/search?q=…`                       | Søgning                         | Historie 5              |
| `/bookmarks`, `/settings`, `/about` | –                               | Historie 4 og 6, FR-017 |

## 6. Datamodel (TypeScript)

```ts
type VerseKey = `${number}:${number}` // fx "2:255"

interface Sura {
  number: number // 1–114
  nameArabic: string // "البقرة"
  nameTransliterated: string // "Al-Baqara"
  ayahCount: number
  revelation: 'Meccan' | 'Medinan'
}

interface Ayah {
  sura: number
  aya: number
  text: string // Uthmani, uændret fra Tanzil
  bismillah?: string // kun på vers 1, når suraen har Bismillah som overskrift
  juz: number // 1–30
  page: number // 1–604
}

interface VerseText {
  sura: number
  aya: number
  text: string // Simple Clean (søgning) eller Sahih International, uændret fra Tanzil
}

interface Bookmark {
  key: VerseKey
  createdAt: string
} // ISO-dato

interface Settings {
  showTranslation: boolean
  arabicFontSize: number
  translationFontSize: number
  theme: 'light' | 'dark' | 'system'
}
```

I `localStorage` ligger tre nøgler: `bookmarks`, `lastRead` og `settings`. Hver værdi har et
versionsnummer (`{ "v": 1, ... }`), så vi senere kan ændre formatet uden at miste brugerens data.

## 7. Særlige løsninger

### Bismillah (Historie 1, test 4)

Bismillah vises som en overskrift over alle suraer undtagen 1 og 9. I sura 1 er den selve vers 1.
✅ **Tjekket (T005):** Tanzil har Bismillah som en egen attribut `bismillah="..."` på vers 1
(112 suraer). Den er ikke en del af versets tekst, så vi viser attributten som overskrift og
fjerner intet fra teksten. Se [`data/tanzil/README.md`](../../data/tanzil/README.md).

### Ingen Unicode-normalisering af teksten (fundet i T008)

Tanzils tekst er **ikke** Unicode-normaliseret. I `ٱللَّهِ` står shadda (U+0651) fx _før_ fatha
(U+064E). Hvis man kører `text.normalize()` (NFC), bytter de plads, og **5.748 af 6.236 vers
ændres**. Det ser ens ud på skærmen, men teksten er ikke længere identisk med kilden.

**Regel:** Teksten, der **vises**, må aldrig normaliseres. Normalisering må kun ske på en
_kopi_, der bruges til søgning (T023). En test i `scripts/data-integrity.test.ts` vogter over reglen.

### Versmærke (FR-004)

Efter hvert vers indsætter vi `۝` (U+06DD) efterfulgt af versnummeret med arabiske cifre (fx `١٢`).
Amiri Quran tegner cifrene inde i mærket. Mærket er _vores_ visning og ikke en del af teksten,
så princip 1 overholdes.

### Arabisk søgning (FR-012)

Problemet: Uthmani-teksten er fuld af tashkeel og særlige stavemåder, så brugerens `الرحمن`
matcher ikke `ٱلرَّحْمَـٰنِ`.
Løsning i to trin:

1. Vi søger i Tanzils **Simple Clean**-tekst (samme vers uden tashkeel), men **viser** resultatet fra Uthmani-teksten.
2. Både søgeordet og teksten _normaliseres_: tashkeel og tatweel fjernes, og alle alef-former (`أ إ آ ٱ`) laves om til `ا`.

### Søgning i oversættelsen (FR-013)

Vi sammenligner med små bogstaver (`toLowerCase`) og fremhæver det fundne ord. Der er kun
6.236 vers, så vi kan søge direkte i hukommelsen på under 1 sekund (NFR-002). Et søgeindeks
er ikke nødvendigt.

### Tema (FR-015)

Farverne defineres som CSS-variabler. `"system"` bruger `prefers-color-scheme`.

## 8. Offline (NFR-001, NFR-004)

`vite-plugin-pwa` gemmer alle appens filer ved første besøg: HTML, JS, CSS, skrift og alle
JSON-filer (ca. 1–2 MB komprimeret). Derefter kan appen åbnes i flytilstand. Et manifest med
navn og ikon gør appen installerbar.

## 9. Teststrategi

| Niveau             | Værktøj         | Eksempler                                                                                                                                                                               |
| ------------------ | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Dataintegritet** | Vitest          | 114 suraer og 6.236 vers. Et tjek sikrer, at 20 stikprøvevers er **tegn for tegn** identiske med Tanzil-filen (SC-003). Alle 30 juz og 604 sider peger på et vers, der findes (SC-004). |
| **Enhed**          | Vitest          | Arabisk normalisering, `findPage`, bogmærker (tilføj, fjern, husk).                                                                                                                     |
| **Komponent**      | Testing Library | Et vers viser versmærke og RTL. Bismillah vises korrekt.                                                                                                                                |
| **Accept**         | Playwright      | Én fil pr. brugerhistorie, hvor hver _Givet/Når/Så_ bliver én test. Offline-testen kører i flytilstand (SC-005).                                                                        |

**Regel:** En opgave er først færdig, når dens tests er grønne.

## 10. Tjek mod constitution

| Princip                       | Overholdt? | Hvordan                                                                                                               |
| ----------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------- |
| 1. Korrekt og lovligt indhold | ✅         | Tanzil-filerne ligger uændret. En test sammenligner tegn for tegn. Licenserne står i `licenser.md` og på About-siden. |
| 2. Respekt og ro              | ✅         | Ingen reklamer. Roligt design med teksten i fokus.                                                                    |
| 3. Privatliv                  | ✅         | Ingen server, intet login. Data ligger i `localStorage`.                                                              |
| 4. Offline og mobil først     | ✅         | PWA med service worker. Designet starter ved 360 px.                                                                  |
| 5. Tilgængelighed             | ✅         | RTL, justerbar skrift, `aria-label`, Playwright-tjek af tastaturbrug.                                                 |
| 6. Enkelhed                   | ✅         | Ingen server, ingen database, intet søgeindeks.                                                                       |
| 7. Spec før kode              | ✅         | Hver route og hver test peger tilbage på en historie eller et krav.                                                   |

## 11. Åbne punkter

1. ✅ ~~Er appen gratis og ikke-kommerciel?~~ Ja. Besluttet 2026-09-23.
2. ✅ ~~Hvordan er Bismillah markeret i Tanzils XML?~~ Som en egen attribut, se afsnit 7.
3. ⚠️ **Nyt (T005):** `en.sahih.xml` er ikke gyldig XML (`--` i kommentaren). Byggescriptet skal fjerne kommentaren i hukommelsen før parsing.
4. ✅ ~~Hvor skal appen ligge på nettet?~~ **GitHub Pages**, besluttet 2026-09-23 (brugeren vil kunne se appen undervejs). Se afsnit 12.

## 12. Udgivelse (GitHub Pages)

| Emne          | Løsning                                                                                                                                                                                                                                                |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Adresse       | `https://saidi3616.github.io/Quran-app_version2/`                                                                                                                                                                                                      |
| Hvordan       | En GitHub Actions-workflow (`.github/workflows/deploy.yml`) kører ved hvert push til `claude/sharp-brown-iwdpad`. Først køres **alle** tests (lint, format, Vitest, Playwright). Kun hvis de er grønne, bygges og udgives appen.                       |
| Undermappe    | Appen ligger i `/Quran-app_version2/`, ikke i roden. Vite får stien via miljøvariablen `BASE_PATH`, og både data (`fetch`) og routeren bruger `import.meta.env.BASE_URL`.                                                                              |
| Direkte links | GitHub Pages kender ikke adresser som `/sura/2`. Tricket er at kopiere `index.html` til `404.html`, så GitHub viser appen i stedet for en fejlside, og routeren finder så den rigtige skærm. (HTTP-statuskoden er stadig 404, men brugeren ser appen.) |
| Licens        | Tanzils vilkår kræver kreditering og link, **før** teksten vises offentligt. Derfor er About-siden (T027) lavet før første udgivelse, og footeren nævner Tanzil på alle sider.                                                                         |
