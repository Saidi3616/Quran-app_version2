# Sådan arbejder vi: Spec-Driven Development

I SDD er specifikationen den "sandhed", koden bygges ud fra. Hvis koden og specifikationen
er uenige, er det koden, der er forkert, eller også skal specifikationen opdateres *først*.

## De fire trin

| Trin | Fil | Spørgsmål den besvarer | Status |
|------|-----|------------------------|--------|
| 0. Principper | [`constitution.md`](constitution.md) | Hvilke regler gælder altid i projektet? | ✅ v1.1 |
| 0. Vision | [`vision.md`](vision.md) | Hvad er det store mål, og i hvilke faser bygger vi? | ✅ Udkast |
| 1. Specifikation | [`001-tekst-og-navigation/spec.md`](001-tekst-og-navigation/spec.md) | **Hvad** skal fase 1 kunne, og **hvorfor**? (ingen teknik) | ✅ Klar til plan |
| 2. Teknisk plan | `001-tekst-og-navigation/plan.md` | **Hvordan** bygger vi det? (sprog, framework, datakilder) | ⏳ Næste lektion |
| 3. Opgaveliste | `001-tekst-og-navigation/tasks.md` | Hvilke små, testbare skridt skal vi tage, og i hvilken rækkefølge? | ⏳ Senere |

Derefter kommer **4. Implementering**: vi tager én opgave ad gangen fra `tasks.md`.

## Gode vaner

- **Spec'en er teknologifri.** Ord som "React", "database" eller "API" hører til i `plan.md`.
- **Alt skal kunne testes.** Hvert krav skal kunne besvares med ja/nej: "virker det?"
- **Markér usikkerhed.** Når noget ikke er besluttet, skriver vi `[AFKLARES: ...]` i stedet for at gætte.
- **Én feature pr. mappe.** Hver fase i [`vision.md`](vision.md) får sin egen mappe, fx `002-lyd/`.
- **Spec'en skrives, når vi når til featuren.** Så bliver den ikke forældet, inden vi bruger den.
- **Licens før indhold.** Alt indhold skal stå i [`licenser.md`](licenser.md), før det bruges.
