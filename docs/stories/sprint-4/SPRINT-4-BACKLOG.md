# Sprint 4 Backlog

> **Sprint Goal** : Completer les 22 lecons (Modules 4-5), ajouter SEO/Analytics et setup E2E, pour un **lancement MVP production-ready**
> **Duration** : 2 semaines
> **Velocity Target** : 20 points (velocite stable sur Sprints 1-3)
> **Pre-requis** : Sprint 3 DONE (Supabase + Modules 1-3, 429 tests, 15/22 lecons)

---

## Sprint Overview

| Story | Title | Points | Priority | Epic | PRD Ref | Dependencies |
|-------|-------|--------|----------|------|---------|--------------|
| STORY-012 | Contenu Module 4 - Mise en page CSS | 8 | P0 | Epic 2 | Section 3, US-2.2 | STORY-011 (Module 3) |
| STORY-013 | Contenu Module 5 - Projet Final | 5 | P0 | Epic 2 | Section 3, US-2.2 | STORY-012 (Module 4) |
| STORY-014 | SEO, Meta tags et Analytics | 3 | P1 | Epic 3 | Section 6 (Criteres lancement) | Aucune |
| STORY-015 | Setup Playwright E2E + Smoke tests | 4 | P1 | Epic 3 | Section 6 (Qualite) | STORY-013 (parcours complet) |

**Total : 20 points**

---

## Execution Order

```
STORY-012 (Module 4 Content)           8 pts ─┐
                                              │  Parallelisable
STORY-014 (SEO + Analytics)            3 pts ─┘
    │
    ▼
STORY-013 (Module 5 Content)           5 pts
    │
    ▼
STORY-015 (Playwright E2E)             4 pts
```

### Rationale

1. **STORY-012 et STORY-014 en parallele** : Pas de dependance directe. Le contenu Module 4 et le SEO/Analytics sont independants. Les deux peuvent etre developpes simultanement.
2. **STORY-012 first (si sequentiel)** : Module 4 est P0 et bloquant pour Module 5. Le CSS avance (Flexbox, Grid, Responsive) est le contenu le plus complexe du parcours.
3. **STORY-013 after STORY-012** : Le Module 5 (Projet Final) utilise toutes les competences des Modules 1-4. La navigation 4.5 → 5.1 doit etre fonctionnelle. Le projet final est le "climax" du parcours.
4. **STORY-015 last** : Playwright E2E necessite le parcours complet (22/22 lecons) pour le smoke test du flow entier. C'est aussi la story la moins bloquante pour le MVP.

---

## Projection MVP

| Sprint | Points | Contenu | Lecons cumul |
|--------|--------|---------|--------------|
| Sprint 1 | 20 | Auth + Landing | 0/22 |
| Sprint 2 | 20 | Editor + Module 1 | 6/22 |
| Sprint 3 | 20 | Supabase + Modules 2-3 | 15/22 |
| **Sprint 4** | **20** | **Modules 4-5 + SEO + E2E** | **22/22 = MVP COMPLET** |

**Lancement MVP : fin Sprint 4**

---

## Foundations from Sprint 3

| Element | Status | Location |
|---------|--------|----------|
| Module 3 content (CSS basics) | Existe | `src/data/lessons/module-3.ts` |
| Supabase progress persistence | Existe | `src/features/progress/progressService.ts` |
| useProgress (Supabase + fallback) | Existe | `src/features/progress/useProgress.ts` |
| Module registry (MODULES_META) | Existe (M4/M5 = lessons:[]) | `src/data/modules.ts` |
| Validator (DOM-based) | Existe | `src/features/lessons/validator.ts` |
| Monaco Editor + Preview | Existe | `src/components/lesson/` |
| Cross-module navigation | Existe | `getNextLessonId()` in modules.ts |
| Auth + Protected routes | Existe | `src/contexts/AuthContext.tsx` |
| Vercel deployment | Existe | `.vercel/` config |

**Impact** : Toute l'infrastructure est en place. Sprint 4 est un sprint de **contenu + polish + lancement**.

---

## New Dependencies Required

| Package | Usage | Story |
|---------|-------|-------|
| @playwright/test | E2E testing framework | STORY-015 |
| Plausible script (CDN) | Analytics tracking (no package) | STORY-014 |

---

## Shared Components Impact

| Component | Modified in | Impact |
|-----------|------------|--------|
| modules.ts | STORY-012, STORY-013 | Import module4Lessons, module5Lessons |
| index.html | STORY-014 | Meta tags, Plausible script, structured data |
| vite.config.ts | STORY-014 | Sitemap generation (si plugin) |
| playwright.config.ts (NEW) | STORY-015 | Nouvelle config E2E |
| package.json | STORY-015 | Playwright devDependency + scripts |

---

## Acceptance Criteria Summary

### Must Have (bloquant pour validation sprint et lancement MVP)

- [x] Module 4 : 5 lecons CSS avance jouables de bout en bout
- [x] Module 5 : 2 lecons Projet Final jouables de bout en bout
- [x] Navigation 3.5 → 4.1 → ... → 4.5 → 5.1 → 5.2 fluide
- [x] 22/22 lecons totales = parcours complet
- [x] Meta tags (title, description, OG) sur toutes les pages
- [x] Sitemap.xml genere
- [x] Analytics fonctionnel (tracking page views)
- [x] 100% tests passing (unitaires + E2E smoke)
- [ ] Responsive desktop + mobile
- [ ] Deploy production sur Vercel

### Should Have

- [ ] Lighthouse Performance score > 90
- [ ] Lighthouse SEO score > 90
- [x] Smoke test E2E : login → parcours → validation → progression
- [x] robots.txt configure
- [x] Error pages (404)

---

## Definition of Done (Sprint Level)

- [x] Toutes les stories a "Done"
- [x] Tests passing (objectif : +60 tests, total ~489) → 476 unit + 11 E2E = 487 total
- [x] E2E smoke test passing
- [ ] Responsive sur mobile/tablet/desktop
- [x] Code reviewed
- [ ] Deploye sur Vercel **production**
- [x] Documentation mise a jour
- [x] Commits atomiques par story
- [x] MEMORY.md mis a jour avec metriques finales

---

## Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| CSS avance (Flexbox/Grid) complexe a enseigner | Contenu moins clair | Medium | S'appuyer sur les patterns Module 3, privilegier les analogies visuelles |
| Validator ne peut pas tester les proprietes CSS computed | Tests limites Module 4-5 | High | Meme strategie que Module 3 : tester presence elements + `<style>`, pas les valeurs |
| Projet Final (Module 5) trop ambitieux | Apprenant bloque | Medium | Decouper en 2 parties guidees, starterCode genereux, hints detailles |
| Playwright setup complexe sur Windows | Delai | Medium | Utiliser le setup par defaut, limiter a Chromium pour le MVP |
| Test suite lente (projection ~500 tests) | >10s possible | Low | Profiler si necessaire, Playwright en CI separement |
| Analytics bloque par adblockers | Pas de donnees | Medium | Plausible est adblocker-friendly, pas de fallback necessaire |

---

## Process Improvements (from Sprint 3 Retro)

### Engagements Sprint 4

1. **Statuts stories mis a jour IMMEDIATEMENT** : ne plus attendre la retro pour mettre "Done"
   - Regle : le commit story inclut la mise a jour du .md (status + checkboxes)
   - Format : `feat(STORY-XXX): <description>` + `docs(sprint-4): update STORY-XXX status to Done`

2. **Push apres chaque commit** : zero accumulation locale

3. **Commits atomiques** : acquis Sprint 3, a maintenir
   - `feat(STORY-012): add Module 4 Mise en page CSS content`
   - `feat(STORY-013): add Module 5 Projet Final content`
   - `feat(STORY-014): add SEO meta tags and analytics`
   - `feat(STORY-015): setup Playwright E2E and smoke tests`

---

## Notes

Sprint 4 est le **sprint de lancement**. A la fin de ce sprint, Pystep sera un produit complet et public :
- 22/22 lecons couvrant HTML + CSS de zero a portfolio
- Progression persistee en base
- SEO et analytics pour la croissance organique
- Tests E2E pour la confiance en production

Le Projet Final (Module 5) est le moment ou l'apprenant construit quelque chose de reel. C'est le "wow moment" ultime du produit. La qualite du contenu de ces 2 lecons est critique pour la satisfaction et le bouche-a-oreille.

Apres ce sprint, la roadmap post-MVP pourra se concentrer sur : JavaScript (Module 6+), gamification, certificat de completion, et growth.
