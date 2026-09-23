# Licenser for indhold

Intet indhold (tekst, oversættelse, tafsir eller lyd) må bruges i appen, før det står her med
status **✅ Godkendt**. Det følger af princip 1 i [`constitution.md`](constitution.md).

| Indhold | Kilde | Licens / vilkår | Krav (fx kreditering) | Status |
|---------|-------|-----------------|------------------------|--------|
| Arabisk tekst (Uthmani + Simple Clean) | [Tanzil.net](https://tanzil.net/docs/text_license) | Creative Commons Attribution 3.0. Må kun bruges uændret. | Kreditér Tanzil.net med link. Copyright-teksten skal følge med filerne. | ✅ Godkendt |
| Quran-metadata (suraer, juz, sider) | [Tanzil.net](https://tanzil.net/docs/) | Samme som teksten | Samme som teksten | ✅ Godkendt |
| Oversættelse: engelsk (Sahih International) | [Tanzil.net](https://tanzil.net/trans/), udgivet af Dar Abul-Qasim | Kun ikke-kommerciel brug. Kommerciel brug kræver tilladelse fra udgiveren. | Nævn oversætter og kilde. | ✅ Godkendt (appen er gratis og ikke-kommerciel, se constitution princip 2) |
| Skrifttype: Amiri Quran | [Amiri-projektet](https://github.com/aliftype/amiri) | SIL Open Font License 1.1 | Licensfilen skal følge med skriften. | ✅ Godkendt |

**Fravalgt:** Quran Foundation API i fase 1. Den kræver en client secret, og indhold må kun gemmes i højst 7 dage, hvilket strider mod offline-kravet. Se `001-tekst-og-navigation/plan.md` afsnit 4.

## Fase 2: Lydkilder (forundersøgelse)

> ⚠️ **Foreløbigt.** Siderne kunne ikke åbnes direkte fra udviklingsmiljøet, så oplysningerne
> nedenfor kommer fra søgeresultater. **Før fase 2 går i gang**, skal hver kildes vilkår læses
> direkte på kildens egen side og citeres her.

| Kilde | Format | Vilkår (foreløbigt) | Offline download? | Vurdering |
|-------|--------|---------------------|-------------------|-----------|
| [EveryAyah.com](https://everyayah.com/) | Én MP3 pr. vers (`SSSAAA.mp3`), mange reciters og bitrates | Ikke-kommerciel brug, fx gratis apps og udenadslære. Reciter og EveryAyah skal krediteres med link. Optagelserne må ikke ændres (fx tonehøjde eller hastighed), men gerne streames, klippes og sættes sammen. ([disclaimer](https://everyayah.com/data/timings_files/000_disclaimer.txt)) | Sandsynligvis, da lydfilerne må distribueres videre uændret med kreditering. **Skal bekræftes.** | ⭐ **Førstevalg** |
| [Al Quran Cloud CDN](https://alquran.cloud/cdn) (`cdn.islamic.network`) | Én MP3 pr. vers og pr. sura, 32–192 kbps | Licenseret af reciterne til gratis, ikke-kommerciel videredistribution. Der er en blød grænse for antal forespørgsler pr. sekund. ([vilkår](https://alquran.cloud/terms-and-conditions)) | Sandsynligvis. **Skal bekræftes.** | ⭐ **Andetvalg / backup** |
| [MP3Quran.net](https://www.mp3quran.net/eng/api) | Én MP3 pr. **sura** + tidsdata pr. vers | Siden skriver, at alt materiale må kopieres og bruges. Der er ingen formel licenstekst. | Formentlig ja | Mulig, men mere kompleks: fremhævning af vers kræver tidsdata, og gentagelse af ét vers kræver, at vi hopper rundt i en lang fil. |
| [Quran Foundation API](https://api-docs.quran.foundation/docs/tutorials/faq/) (Quran.com) | Pr. vers og pr. sura | Højst **7 dages** lagring, medmindre man bruger deres Content Sync API. Det kræver login-nøgler og dermed en server. | Kun via Content Sync plus en server | ❌ Fravalgt, fordi det strider mod princip 6 (ingen server). |

**Foreløbig anbefaling:** Brug **én MP3-fil pr. vers** (EveryAyah, med Al Quran Cloud som backup).
Så bliver fremhævning, "gentag vers" og "gentag udsnit" enkle at lave: afspil fil *n*, og gå
videre til *n+1*. Brugeren downloader kun de suraer, han eller hun selv vælger.

**Tjekliste før fase 2:**
1. Læs og citér vilkårene direkte fra EveryAyah og Al Quran Cloud.
2. Bekræft, at *brugerens egen download til offline brug* er tilladt.
3. Vælg 3–5 reciters, og notér for hver enkelt, at optagelsen må bruges.

## Sådan tjekker vi en licens
1. Find kildens vilkår (license/terms) og gem linket.
2. Svar på: Må vi vise indholdet i en app? Må vi gemme det offline? Kræves kreditering? Må det kun bruges ikke-kommercielt?
3. Er noget uklart, skriver vi til udgiveren og beder om tilladelse, og vi gemmer svaret.
