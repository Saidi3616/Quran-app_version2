# Vision og køreplan

## Visionen

En Koran-app, der gør det nemt at **læse**, **lytte til** og **forstå** Koranen, og som
hjælper med **udenadslære (hifz)**.

Grundlaget er den arabiske tekst i Uthmani-skrift, vist korrekt og pænt med tydelige
versnumre. Omkring teksten bygger vi lyd, oversættelser, forklaringer, læringsværktøjer og
personlige funktioner, der hjælper brugeren med at opbygge en fast vane.

## Hvem er appen til?

| Bruger | Behov |
|--------|-------|
| **Den daglige læser** | Hurtigt tilbage til sit sted og hjælp til at nå et læsemål. |
| **Den lyttende** | Høre smukke recitationer, også offline. |
| **Den søgende/lærende** | Forstå betydningen: oversættelse, ord-for-ord og tafsir. |
| **Hifz-eleven** | Gentage vers, skjule tekst, teste sig selv og følge sine fremskridt. |

## Køreplan

Hver feature får sin egen mappe og sin egen `spec.md`. Den detaljerede spec skrives **først,
når vi når til featuren**. Indtil da er beskrivelsen her kun en overskrift.

| Fase | Feature | Indhold | Status |
|------|---------|---------|--------|
| **1. Tekst og navigation** | [`001-tekst-og-navigation`](001-tekst-og-navigation/spec.md) | Uthmani-tekst, navigation (sura, vers, juz, side), engelsk oversættelse, søgning, bogmærker, "fortsæt læsning", skriftstørrelse, dark mode | 📝 Spec i udkast |
| **2. Lyd** | `002-lyd` | Flere reciters, afspilning vers for vers med fremhævning, gentagelse af vers og udsnit, download til offline | ⏳ |
| **3. Forståelse** | `003-forstaaelse` | Tafsir, ord-for-ord-oversættelse (tryk på et ord), tajweed-farver | ⏳ |
| **3. Læring** | `004-hifz` | Hifz-tilstand: skjul vers, test dig selv, følg fremskridt | ⏳ |
| **4. Personligt** | `005-personligt` | Læsemål (fx "hele Koranen på 30 dage"), statistik, noter til vers | ⏳ |
| **5. Ekstra** | `006-...` | Bedetider, qibla, dagligt vers som notifikation, del vers som billede | 💡 Idé |

**Regel:** Vi begynder ikke på en ny fase, før den forrige er færdig og testet.

## Indholdskilder

Tekst, oversættelser, tafsir, ord-for-ord-data og lyd hentes fra pålidelige kilder, fx
**Quran.com API (Quran Foundation)** og **Tanzil.net**. Hvilken kilde der bruges til hvad,
besluttes i hver features `plan.md`. Vi ved allerede nu:

- Tanzil.net har tekst og oversættelser, men ikke lyd, tafsir eller ord-for-ord-data.
  Til fase 2 og 3 skal vi derfor næsten sikkert bruge en anden kilde.
- **Hver** oversættelse, tafsir og hver recitation har sin egen licens. Vi tjekker licensen og
  skriver den i [`licenser.md`](licenser.md), **før** indholdet tages i brug (se princip 1 i
  constitution).

## Kendte risici (godt at vide i god tid)

| Risiko | Fase | Hvorfor |
|--------|------|---------|
| Licens til engelsk oversættelse | 1 | Mange kendte engelske oversættelser er ophavsretligt beskyttet. Vi skal finde én, vi har lov til at bruge. |
| Licens til lyd | 2 | Hver recitation tilhører reciteren. Forundersøgelsen peger på EveryAyah og Al Quran Cloud (gratis, ikke-kommerciel brug), men vilkårene skal bekræftes. Se [`licenser.md`](licenser.md). |
| Offline lyd fylder meget | 2 | Hele Koranen med én reciter fylder flere hundrede MB. Brugeren skal kunne vælge, hvad der downloades. |
| Tajweed-farver kræver særlige data | 3 | Farverne skal komme fra en kilde, hvor tajweed-reglerne allerede er markeret. Vi laver dem ikke selv. |
| Notifikationer i en web-app | 5 | På iPhone virker notifikationer kun, hvis appen er lagt på hjemmeskærmen. |
| Qibla kræver kompas | 5 | Browserens adgang til kompasset er upræcis og varierer fra telefon til telefon. |
