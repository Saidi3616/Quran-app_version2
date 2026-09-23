# Licenser for indhold

Intet indhold (tekst, oversættelse, tafsir eller lyd) må bruges i appen, før det står her med
status **✅ Godkendt**. Det følger af princip 1 i [`constitution.md`](constitution.md).

| Indhold | Kilde | Licens / vilkår | Krav (fx kreditering) | Status |
|---------|-------|-----------------|------------------------|--------|
| Arabisk tekst (Uthmani + Simple Clean) | [Tanzil.net](https://tanzil.net/docs/text_license) | Creative Commons Attribution 3.0. Må kun bruges uændret. | Kreditér Tanzil.net med link. Copyright-teksten skal følge med filerne. | ✅ Godkendt |
| Quran-metadata (suraer, juz, sider) | [Tanzil.net](https://tanzil.net/docs/) | Samme som teksten | Samme som teksten | ✅ Godkendt |
| Oversættelse: engelsk (Sahih International) | [Tanzil.net](https://tanzil.net/trans/), udgivet af Dar Abul-Qasim | Kun ikke-kommerciel brug. Kommerciel brug kræver tilladelse fra udgiveren. | Nævn oversætter og kilde. | ⏳ Godkendt, *når* det er bekræftet, at appen er ikke-kommerciel |
| Skrifttype: Amiri Quran | [Amiri-projektet](https://github.com/aliftype/amiri) | SIL Open Font License 1.1 | Licensfilen skal følge med skriften. | ✅ Godkendt |

**Fravalgt:** Quran Foundation API i fase 1. Den kræver en client secret, og indhold må kun gemmes i højst 7 dage, hvilket strider mod offline-kravet. Se `001-tekst-og-navigation/plan.md` afsnit 4.

## Sådan tjekker vi en licens
1. Find kildens vilkår (license/terms) og gem linket.
2. Svar på: Må vi vise indholdet i en app? Må vi gemme det offline? Kræves kreditering? Må det kun bruges ikke-kommercielt?
3. Er noget uklart, skriver vi til udgiveren og beder om tilladelse, og vi gemmer svaret.
