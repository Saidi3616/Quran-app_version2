# Specifikation 001: MVP – Læs, lyt, gem og søg

| | |
|---|---|
| **Status** | Udkast |
| **Oprettet** | 2026-09-23 |
| **Principper** | [`../constitution.md`](../constitution.md) |

> Dette dokument beskriver **hvad** appen skal kunne og **hvorfor**, ikke hvordan.
> Tekniske valg hører til i `plan.md`.

---

## 1. Formål

Brugeren skal kunne åbne appen på sin telefon, finde en surah, læse den på arabisk, lytte til
en recitation og vende tilbage til det sted, hvor vedkommende slap, uden login og uden
forstyrrelser.

## 2. Målgruppe

- **Den daglige læser:** læser lidt hver dag og vil hurtigt tilbage til sit sted.
- **Den lyttende elev:** lærer udenad eller lærer udtale og vil høre vers for vers.
- **Den søgende:** husker et ord eller et vers og vil finde det igen.

## 3. Brugerhistorier

Historierne er prioriteret. **P1** skal være færdig først og skal kunne bruges alene.

### Historie 1: Læs en surah (P1)
*Som læser vil jeg vælge en surah og læse den på arabisk, så jeg kan læse Quran på min telefon.*

**Accepttest**
1. **Givet** at jeg åbner appen, **når** forsiden vises, **så** ser jeg en liste over alle 114 surahs med nummer, arabisk navn, translittereret navn og antal vers.
2. **Givet** listen, **når** jeg vælger en surah, **så** vises alle dens vers på arabisk i korrekt rækkefølge, med versnummer og fra højre mod venstre.
3. **Givet** at jeg læser en surah (undtagen Al-Fatiha og At-Tawbah), **så** vises Bismillah øverst.
4. **Givet** at jeg læser, **når** jeg ændrer tekststørrelsen, **så** bliver den arabiske tekst større eller mindre, og valget huskes næste gang.

### Historie 2: Lyt til recitation (P2)
*Som elev vil jeg høre versene reciteret, så jeg kan lære korrekt udtale og lære udenad.*

**Accepttest**
1. **Givet** at jeg læser en surah, **når** jeg trykker "afspil" ved et vers, **så** afspilles netop det vers.
2. **Givet** at et vers afspilles, **så** er verset tydeligt markeret på skærmen.
3. **Givet** at et vers er færdigt, **så** fortsætter afspilningen automatisk med næste vers, og skærmen følger med.
4. **Givet** afspilning, **når** jeg trykker pause/stop, **så** stopper lyden med det samme.
5. **Givet** at jeg ikke har internet og lyden ikke er gemt, **når** jeg trykker afspil, **så** får jeg en venlig besked i stedet for en fejl.

### Historie 3: Bogmærker og læseposition (P3)
*Som daglig læser vil jeg gemme vers og fortsætte, hvor jeg slap.*

**Accepttest**
1. **Givet** et vers, **når** jeg trykker "bogmærke", **så** gemmes det, og ikonet viser, at det er gemt.
2. **Givet** gemte bogmærker, **når** jeg åbner bogmærkelisten, **så** ser jeg dem (surah og versnummer), og et tryk fører mig direkte til verset.
3. **Givet** et gemt bogmærke, **når** jeg trykker på det igen eller sletter det fra listen, **så** fjernes det.
4. **Givet** at jeg har læst i en surah og lukker appen, **når** jeg åbner den igen, **så** kan jeg med ét tryk ("Fortsæt læsning") komme tilbage til det sidste vers, jeg var ved.
5. **Givet** at jeg lukker og genåbner browseren, **så** er mine bogmærker der stadig.

### Historie 4: Søg (P3)
*Som søgende vil jeg finde vers ud fra et arabisk ord eller et surah-navn.*

**Accepttest**
1. **Givet** søgefeltet, **når** jeg skriver et surah-navn eller -nummer (fx "Yasin" eller "36"), **så** vises den surah.
2. **Givet** søgefeltet, **når** jeg skriver et arabisk ord, **så** vises alle vers, der indeholder ordet, med surah og versnummer.
3. **Givet** at jeg skriver ordet **uden** tashkeel (vokaltegn), **så** finder jeg stadig vers, hvor ordet står **med** tashkeel.
4. **Givet** søgeresultater, **når** jeg trykker på et resultat, **så** åbnes verset i læsevisningen.
5. **Givet** at intet findes, **så** vises beskeden "Ingen resultater" i stedet for en tom skærm.

## 4. Funktionelle krav

| ID | Krav | Historie |
|----|------|----------|
| FR-001 | Systemet SKAL vise alle 114 surahs med nummer, arabisk navn, translittereret navn og antal vers. | 1 |
| FR-002 | Systemet SKAL vise den fulde arabiske tekst af en surah fra en verificeret kilde, uændret. | 1 |
| FR-003 | Arabisk tekst SKAL vises fra højre mod venstre med en skrifttype, der viser tashkeel korrekt. | 1 |
| FR-004 | Brugeren SKAL kunne justere tekststørrelsen, og valget SKAL huskes. | 1 |
| FR-005 | Brugeren SKAL kunne afspille recitation af et enkelt vers og fortsætte automatisk til næste. | 2 |
| FR-006 | Verset, der afspilles, SKAL markeres visuelt. | 2 |
| FR-007 | Recitationen kommer fra én fast qari i MVP'en. [AFKLARES: hvilken qari?] | 2 |
| FR-008 | Brugeren SKAL kunne tilføje, se og fjerne bogmærker på versniveau. | 3 |
| FR-009 | Systemet SKAL huske den seneste læseposition automatisk. | 3 |
| FR-010 | Bogmærker og indstillinger SKAL gemmes lokalt på enheden og overleve genstart. | 3 |
| FR-011 | Brugeren SKAL kunne søge efter surah via navn eller nummer. | 4 |
| FR-012 | Brugeren SKAL kunne søge i den arabiske tekst, og søgningen SKAL ignorere tashkeel. | 4 |
| FR-013 | Appen SKAL vise kilde og licens for tekst og lyd på en "Om"-side. | – |

## 5. Ikke-funktionelle krav

| ID | Krav |
|----|------|
| NFR-001 | **Offline:** Efter første besøg kan surah-listen og al arabisk tekst læses uden internet. |
| NFR-002 | **Hastighed:** En surah åbnes på under 1 sekund på en almindelig telefon. |
| NFR-003 | **Mobil først:** Alt kan bruges på en skærm, der er 360 px bred, uden vandret scroll. |
| NFR-004 | **Installerbar:** Appen kan tilføjes til telefonens hjemmeskærm. |
| NFR-005 | **Tilgængelighed:** Alle knapper har tekst til skærmlæsere og kan bruges med tastatur. |
| NFR-006 | **Privatliv:** Ingen login, ingen tracking og ingen data sendt til tredjepart (bortset fra at hente tekst og lyd). |
| NFR-007 | **Tema:** Appen understøtter lyst og mørkt tema og følger telefonens indstilling. |

## 6. Nøglebegreber (data)

Her står *hvad* vi gemmer, ikke *hvordan*.

- **Surah:** nummer (1–114), arabisk navn, translittereret navn, antal vers, åbenbaringssted (Mekka/Medina).
- **Vers (Ayah):** surah-nummer, versnummer, arabisk tekst. Identificeres entydigt som `surah:vers`, fx `2:255`.
- **Recitation:** lydfil til ét vers fra én qari.
- **Bogmærke:** henvisning til et vers (`surah:vers`) og tidspunktet, det blev oprettet.
- **Læseposition:** det seneste vers, brugeren var ved.
- **Indstillinger:** tekststørrelse og tema.

## 7. Uden for MVP (bevidst fravalgt nu)

- Oversættelser (dansk/engelsk) → senere feature `002`.
- Tafsir (forklaringer), ord-for-ord-oversættelse og tajweed-farver.
- Visning pr. side (Mushaf-sider) og opdeling i juz/hizb.
- Valg mellem flere qaris, download af hele surahs til offline lyd.
- Brugerkonti og synkronisering mellem enheder.
- Bedetider og qibla.

## 8. Succeskriterier

Vi er færdige med MVP'en, når:
- **SC-001:** En ny bruger kan finde og begynde at læse Surah Al-Kahf på under 15 sekunder.
- **SC-002:** Alle accepttests i afsnit 3 består.
- **SC-003:** Stikprøver af mindst 10 vers stemmer tegn for tegn med kilden.
- **SC-004:** Appen kan åbnes og en surah læses i flytilstand, efter den har været åbnet én gang.

## 9. Åbne spørgsmål (lektie til dig)

Besvar dem, og så retter vi spec'en sammen, før vi går videre til `plan.md`:

1. **[AFKLARES]** Hvilken qari skal bruges i MVP'en? (fx Mishary Alafasy, Abdul Basit, Al-Husary)
2. **[AFKLARES]** Hvilken skrivemåde af teksten ønsker du? *Uthmani* (som i en trykt Mushaf) eller *simpel* (lettere at læse på skærm)?
3. **[AFKLARES]** Skal appens knapper og menuer være på dansk, engelsk eller arabisk?
4. **[AFKLARES]** Skal "Fortsæt læsning" vises øverst på forsiden eller som en separat knap?
5. **[AFKLARES]** Skal det være muligt at gentage et vers flere gange (nyttigt, når man lærer udenad)? Hvis ja, hører det til i MVP'en eller senere?
