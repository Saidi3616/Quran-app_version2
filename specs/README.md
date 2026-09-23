# Sådan arbejder vi: Spec-Driven Development

I SDD er specifikationen den "sandhed", koden bygges ud fra. Hvis koden og specifikationen
er uenige, er det koden, der er forkert, eller også skal specifikationen opdateres *først*.

## De fire trin

| Trin | Fil | Spørgsmål den besvarer | Status |
|------|-----|------------------------|--------|
| 0. Principper | [`constitution.md`](constitution.md) | Hvilke regler gælder altid i projektet? | ✅ Udkast |
| 1. Specifikation | [`001-mvp/spec.md`](001-mvp/spec.md) | **Hvad** skal appen kunne, og **hvorfor**? (ingen teknik) | ✅ Udkast (har åbne spørgsmål) |
| 2. Teknisk plan | `001-mvp/plan.md` | **Hvordan** bygger vi det? (sprog, framework, datakilder) | ⏳ Næste lektion |
| 3. Opgaveliste | `001-mvp/tasks.md` | Hvilke små, testbare skridt skal vi tage, og i hvilken rækkefølge? | ⏳ Senere |

Derefter kommer **4. Implementering**: vi tager én opgave ad gangen fra `tasks.md`.

## Gode vaner

- **Spec'en er teknologifri.** Ord som "React", "database" eller "API" hører til i `plan.md`.
- **Alt skal kunne testes.** Hvert krav skal kunne besvares med ja/nej: "virker det?"
- **Markér usikkerhed.** Når noget ikke er besluttet, skriver vi `[AFKLARES: ...]` i stedet for at gætte.
- **Én feature pr. mappe.** Senere features får deres egne mapper, fx `002-oversaettelse/`.
