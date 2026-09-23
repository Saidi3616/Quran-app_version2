# Specifikation 001: Tekst og navigation

| | |
|---|---|
| **Fase** | 1 af 5 (se [`../vision.md`](../vision.md)) |
| **Status** | Udkast |
| **Oprettet** | 2026-09-23 |
| **Principper** | [`../constitution.md`](../constitution.md) |

> Dette dokument beskriver **hvad** appen skal kunne og **hvorfor**, ikke hvordan.
> Tekniske valg hører til i `plan.md`.

---

## 1. Formål

Dette er fundamentet for hele appen. Brugeren skal kunne læse den arabiske tekst korrekt og
pænt i Uthmani-skrift, finde et hvilket som helst sted i Koranen, læse en oversættelse, søge og
altid vende tilbage til det sted, hvor vedkommende slap.

Alt i de senere faser (lyd, tafsir, hifz) bygger oven på det, vi laver her.

## 2. Brugerhistorier

Historierne er prioriteret. **P1** skal virke, før vi går videre til P2 og så videre.

### Historie 1: Læs en sura (P1)
*Som læser vil jeg vælge en sura og læse den i Uthmani-skrift, så jeg kan læse Koranen på min telefon.*

**Accepttest**
1. **Givet** at jeg åbner appen, **når** forsiden vises, **så** ser jeg alle 114 suraer med nummer, arabisk navn, translittereret navn, antal vers og om suraen er fra Mekka eller Medina.
2. **Givet** listen, **når** jeg vælger en sura, **så** vises alle dens vers i Uthmani-skrift, i korrekt rækkefølge og fra højre mod venstre.
3. **Givet** et vers, **så** står versnummeret tydeligt i slutningen af verset som et arabisk versmærke (fx ۝١٢).
4. **Givet** at jeg læser en sura (undtagen Al-Fatiha og At-Tawbah), **så** vises Bismillah øverst som en overskrift og ikke som vers 1.

### Historie 2: Naviger direkte (P1)
*Som læser vil jeg hoppe direkte til en sura, et vers, en juz eller en side, så jeg hurtigt finder det sted, jeg leder efter.*

**Accepttest**
1. **Givet** navigationen, **når** jeg vælger sura og versnummer (fx 2:255), **så** åbnes suraen, og visningen ruller til verset, der kortvarigt fremhæves.
2. **Givet** at jeg indtaster et versnummer, der ikke findes (fx 1:8), **så** får jeg en venlig besked, og intet går i stykker.
3. **Givet** navigationen, **når** jeg vælger en juz (1–30), **så** åbnes læsningen ved juz'ens første vers.
4. **Givet** navigationen, **når** jeg vælger et sidetal (1–604), **så** åbnes læsningen ved første vers på den side i en standard Madani-mushaf.
5. **Givet** at jeg læser, **så** kan jeg altid se, hvilken sura, juz og side jeg er på.

### Historie 3: Læs en oversættelse (P2)
*Som læser vil jeg se en oversættelse under hvert vers, så jeg forstår, hvad jeg læser.*

**Accepttest**
1. **Givet** indstillingerne, **når** jeg vælger en oversættelse fra listen (fx dansk eller engelsk), **så** vises den under hvert arabisk vers.
2. **Givet** at en oversættelse er valgt, **når** jeg slår oversættelse fra, **så** vises kun den arabiske tekst.
3. **Givet** at jeg har valgt en oversættelse, **når** jeg åbner appen igen, **så** er mit valg husket.
4. **Givet** en oversættelse, **så** kan jeg se oversætterens navn og kilden.

### Historie 4: Bogmærker og "fortsæt læsning" (P2)
*Som daglig læser vil jeg gemme vers og altid kunne fortsætte, hvor jeg slap.*

**Accepttest**
1. **Givet** et vers, **når** jeg trykker "bogmærke", **så** gemmes det, og ikonet viser, at det er gemt.
2. **Givet** gemte bogmærker, **når** jeg åbner bogmærkelisten, **så** ser jeg dem med suraens navn og versnummer, og et tryk fører mig direkte til verset.
3. **Givet** et bogmærke, **når** jeg fjerner det, **så** forsvinder det fra listen.
4. **Givet** at jeg har læst og lukker appen, **når** jeg åbner den igen, **så** ser jeg "Fortsæt læsning" med suraens navn og vers, og ét tryk fører mig tilbage.
5. **Givet** at jeg lukker og genåbner browseren, **så** er bogmærker og læseposition der stadig.

### Historie 5: Søg (P3)
*Som søgende vil jeg finde vers ud fra et arabisk ord, et ord i oversættelsen eller et suranavn.*

**Accepttest**
1. **Givet** søgefeltet, **når** jeg skriver et suranavn eller -nummer (fx "Yasin" eller "36"), **så** vises den sura.
2. **Givet** søgefeltet, **når** jeg skriver et arabisk ord, **så** vises alle vers, der indeholder ordet, med sura og versnummer.
3. **Givet** at jeg skriver det arabiske ord **uden** tashkeel (vokaltegn), **så** finder jeg stadig vers, hvor ordet står **med** tashkeel i Uthmani-teksten.
4. **Givet** at en oversættelse er valgt, **når** jeg skriver et ord på dansk eller engelsk (fx "barmhjertig"), **så** vises de vers, hvor ordet står i oversættelsen, uanset store og små bogstaver.
5. **Givet** søgeresultater, **så** er søgeordet fremhævet, og et tryk åbner verset i læsevisningen.
6. **Givet** at intet findes, **så** vises beskeden "Ingen resultater".

### Historie 6: Læsekomfort (P3)
*Som læser vil jeg tilpasse visningen, så det er behageligt at læse.*

**Accepttest**
1. **Givet** indstillingerne, **når** jeg ændrer skriftstørrelsen, **så** ændres størrelsen på både arabisk og oversættelse (hver for sig), og valget huskes.
2. **Givet** at telefonen står i mørk tilstand, **når** jeg åbner appen første gang, **så** vises den i dark mode.
3. **Givet** indstillingerne, **når** jeg vælger lys, mørk eller "følg system", **så** skifter appen med det samme, og valget huskes.

## 3. Funktionelle krav

| ID | Krav | Historie |
|----|------|----------|
| FR-001 | Systemet SKAL vise alle 114 suraer med nummer, arabisk navn, translittereret navn, antal vers og åbenbaringssted. | 1 |
| FR-002 | Systemet SKAL vise den arabiske tekst i Uthmani-skrift fra en verificeret kilde, uændret. | 1 |
| FR-003 | Teksten SKAL vises fra højre mod venstre med en skrifttype, der viser Uthmani-tegn og tashkeel korrekt. | 1 |
| FR-004 | Hvert vers SKAL afsluttes med et tydeligt arabisk versmærke med versnummer. | 1 |
| FR-005 | Brugeren SKAL kunne navigere direkte til sura, sura:vers, juz (1–30) og mushaf-side (1–604). | 2 |
| FR-006 | Læsevisningen SKAL vise aktuel sura, juz og side. | 2 |
| FR-007 | Systemet SKAL tilbyde mindst én dansk og én engelsk oversættelse, som brugeren kan vælge imellem eller slå fra. [AFKLARES: hvilke?] | 3 |
| FR-008 | Oversætter og kilde SKAL vises for den valgte oversættelse. | 3 |
| FR-009 | Brugeren SKAL kunne tilføje, se og fjerne bogmærker på versniveau. | 4 |
| FR-010 | Systemet SKAL automatisk huske seneste læseposition og tilbyde "Fortsæt læsning". | 4 |
| FR-011 | Brugeren SKAL kunne søge efter sura via navn eller nummer. | 5 |
| FR-012 | Brugeren SKAL kunne søge i den arabiske tekst, og søgningen SKAL ignorere tashkeel og Uthmani-specialtegn. | 5 |
| FR-013 | Brugeren SKAL kunne søge i den valgte oversættelse uden hensyn til store og små bogstaver. | 5 |
| FR-014 | Brugeren SKAL kunne justere skriftstørrelsen for arabisk og oversættelse hver for sig. | 6 |
| FR-015 | Appen SKAL understøtte lyst tema, mørkt tema og "følg system". | 6 |
| FR-016 | Alle brugerdata og indstillinger SKAL gemmes lokalt og overleve genstart. | 4, 6 |
| FR-017 | Appen SKAL have en "Om"-side med kilde og licens for alt indhold (se [`../licenser.md`](../licenser.md)). | – |

## 4. Ikke-funktionelle krav

| ID | Krav |
|----|------|
| NFR-001 | **Offline:** Efter første besøg kan hele den arabiske tekst og den valgte oversættelse læses og søges i uden internet. |
| NFR-002 | **Hastighed:** En sura åbnes, og et søgeresultat vises, på under 1 sekund på en almindelig telefon. |
| NFR-003 | **Mobil først:** Alt kan bruges på en skærm, der er 360 px bred, uden vandret scroll. |
| NFR-004 | **Installerbar:** Appen kan lægges på telefonens hjemmeskærm (PWA). |
| NFR-005 | **Tilgængelighed:** Alle knapper har tekst til skærmlæsere og kan bruges med tastatur. Kontrasten opfylder WCAG AA. |
| NFR-006 | **Privatliv:** Intet login, ingen tracking og ingen brugerdata sendes til tredjepart. |

## 5. Nøglebegreber (data)

Her står *hvad* vi gemmer, ikke *hvordan*.

- **Sura:** nummer (1–114), arabisk navn, translittereret navn, antal vers, åbenbaringssted.
- **Vers (Ayah):** sura-nummer, versnummer, Uthmani-tekst, juz, side. Identificeres entydigt som `sura:vers`, fx `2:255`.
- **Juz:** nummer (1–30) og hvilket vers den starter ved.
- **Side:** nummer (1–604) og hvilket vers den starter ved (standard Madani-mushaf).
- **Oversættelse:** navn, sprog, oversætter, kilde, licens og teksten til hvert vers.
- **Bogmærke:** henvisning til et vers og tidspunktet, det blev oprettet.
- **Læseposition:** det seneste vers, brugeren var ved.
- **Indstillinger:** valgt oversættelse, skriftstørrelser og tema.

## 6. Uden for denne fase

Dette kommer i senere faser (se [`../vision.md`](../vision.md)):
- Lyd og reciters → fase 2
- Tafsir, ord-for-ord-oversættelse og tajweed-farver → fase 3
- Hifz-tilstand → fase 3
- Læsemål, statistik og noter → fase 4
- Bedetider, qibla, notifikationer og deling som billede → fase 5
- Visning af hele mushaf-sider som i en trykt bog. Vi *navigerer* til sider, men viser vers som en liste.

## 7. Succeskriterier

Fase 1 er færdig, når:
- **SC-001:** En ny bruger kan finde og begynde at læse Ayat al-Kursi (2:255) på under 15 sekunder.
- **SC-002:** Alle accepttests i afsnit 2 består.
- **SC-003:** Stikprøver af mindst 20 vers stemmer tegn for tegn med kilden.
- **SC-004:** Navigation til juz 1–30 og til 10 tilfældige sider rammer det rigtige første vers.
- **SC-005:** Appen kan åbnes, og der kan læses og søges i flytilstand, efter den har været åbnet én gang.

## 8. Afklaringer

### Besluttet
- ✅ Teksten vises i **Uthmani-skrift**.
- ✅ Gentagelse af vers og udsnit hører til **fase 2 (lyd)**.
- ✅ Flere reciters hører til **fase 2**. Valget af reciters træffes der.

### Åbne spørgsmål (lektie til dig)
1. **[AFKLARES]** Skal menuer og knapper være på **dansk**, **engelsk** eller begge dele (brugeren vælger)?
2. **[AFKLARES]** Hvilken **dansk** og hvilken **engelsk** oversættelse? (Hvis du ikke kender nogen, undersøger vi licenserne sammen i `plan.md`.)
3. **[AFKLARES]** Skal man kunne vise **to oversættelser på én gang** (fx dansk og engelsk under hinanden), eller er én ad gangen nok?
4. **[AFKLARES]** Skal skriftstørrelse og dark mode blive i fase 1? Jeg har lagt dem her, fordi de er små at lave og hører med til god læsbarhed fra dag ét. I din plan lå de i fase 4.
