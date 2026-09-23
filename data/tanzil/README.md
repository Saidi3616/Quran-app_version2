# Tanzil-kildefiler

> ⚠️ **Filerne i denne mappe må ALDRIG redigeres i hånden** (constitution, princip 1).
> Opdatering sker kun ved at hente en ny version fra Tanzil og opdatere tabellen nedenfor.

## Filer

| Fil                      | Indhold                                                                               | Hentet fra                                                                                                                         |
| ------------------------ | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `quran-uthmani.xml`      | Koranens tekst, Uthmani (version 1.1). Bruges til **visning**.                        | `https://tanzil.net/pub/download/index.php?quranType=uthmani&outType=xml&marks=true&sajdah=true&alef=true&tatweel=true&agree=true` |
| `quran-simple-clean.xml` | Koranens tekst, Simple Clean (version 1.1) uden tashkeel. Bruges **kun til søgning**. | Samme URL med `quranType=simple-clean`                                                                                             |
| `quran-data.xml`         | Metadata: suraer, juz, hizb, sider (604), ruku, manzil og sajda.                      | `https://tanzil.net/res/text/metadata/quran-data.xml`                                                                              |
| `en.sahih.xml`           | Saheeh International, engelsk oversættelse (Last Update: April 24, 2011).             | `https://tanzil.net/trans/?transID=en.sahih&type=xml`                                                                              |

**Hentet:** 2026-09-23

**Download-indstillinger (Tanzils standardvalg):** pause marks ✅, sajdah signs ✅,
superscript alefs ✅, tatweel below superscript alefs ✅, rub-el-hizb signs ❌.

## Kontrolsummer (SHA-256)

Med kontrolsummerne kan man bevise, at filerne er uændrede. Kør `sha256sum *.xml` i denne mappe
og sammenlign resultatet:

```
8c5aeae20363a98f6963720d29fce040ca8b56a8e75f8b564c257fce7f6d0417  quran-uthmani.xml
bfcc15166521e3053b9c20c126ea28174433f127b364025e69585c960a5fc47f  quran-simple-clean.xml
8867c1d88191472adec9db694b3cd9f135b1a2ef580574d32cf888dcb22c5c7a  quran-data.xml
bf4d6f67aa744232f52e17065c1e7cf4193c46396987078735948440b06d68b4  en.sahih.xml
```

## Licenser

**Koranens tekst** ([tanzil.net/docs/text_license](https://tanzil.net/docs/text_license)).
Copyright-teksten står øverst i hver tekstfil og skal følge med i alle afledte filer:

```
Tanzil Quran Text (Uthmani, Version 1.1)
Copyright (C) 2007-2026 Tanzil Project
License: Creative Commons Attribution 3.0

TERMS OF USE:
- Permission is granted to copy and distribute verbatim copies
  of this text, but CHANGING IT IS NOT ALLOWED.
- This Quran text can be used in any website or application,
  provided that its source (Tanzil Project) is clearly indicated,
  and a link is made to tanzil.net to enable users to keep
  track of changes.
- This copyright notice shall be included in all verbatim copies
  of the text, and shall be reproduced appropriately in all files
  derived from or containing substantial portion of this text.
```

**Metadata:** `copyright="(C) 2008-2009 Tanzil.info" license="cc-by"` (fra filens rodelement).

**Oversættelsen** ([tanzil.net/trans](https://tanzil.net/trans/)):

> The translations provided at this page are for non-commercial purposes only.
> If used otherwise, you need to obtain necessary permission from the translator or the publisher.

Appen er gratis og ikke-kommerciel (constitution, princip 2), så vilkåret er opfyldt.
