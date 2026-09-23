# Quran-app (version 2)

En web-app (PWA) til at læse, lytte til og forstå Koranen, og som hjælper med udenadslære (hifz).

**Prøv appen:** https://saidi3616.github.io/Quran-app_version2/ (opdateres automatisk ved hvert push, når alle tests er grønne).

Projektet bygges med **Spec-Driven Development (SDD)**: vi skriver først _hvad_ appen skal
kunne (specifikationen) og bygger derefter koden ud fra den. Start med at læse
[`specs/README.md`](specs/README.md).

## Kom i gang

Kræver [Node.js](https://nodejs.org/) 22.18 eller nyere (så Node kan køre TypeScript-scripts direkte).

```bash
npm install          # installer afhængigheder (første gang)
npm run dev          # start udviklingsserveren på http://localhost:5173
```

| Kommando             | Hvad den gør                                                                                             |
| -------------------- | -------------------------------------------------------------------------------------------------------- |
| `npm run data`       | Laver JSON-filerne i `public/data/` ud fra Tanzil-filerne (sker automatisk før `dev`, `build` og `test`) |
| `npm run build`      | Tjekker typerne og bygger appen til `dist/`                                                              |
| `npm test`           | Kører enheds- og komponenttests (Vitest)                                                                 |
| `npm run test:watch` | Kører testene igen, hver gang du gemmer en fil                                                           |
| `npm run test:e2e`   | Kører accepttests i en rigtig browser (Playwright)                                                       |
| `npm run lint`       | Finder fejl i koden (oxlint)                                                                             |
| `npm run format`     | Formaterer al kode ens (Prettier)                                                                        |

Første gang du kører `npm run test:e2e`, skal browseren installeres: `npx playwright install chromium`.
