# Sprint 3 Backlog

> **Sprint Goal** : Persister la progression utilisateur dans Supabase et livrer le contenu des Modules 2 (HTML semantique) et 3 (Intro CSS), portant le total a 15/22 lecons
> **Duration** : 2 semaines
> **Velocity Target** : 20 points (velocite stable sur Sprints 1 et 2)
> **Pre-requis** : Sprint 2 DONE (editeur + validation + Module 1, 356 tests)

---

## Sprint Overview

| Story | Title | Points | Priority | Epic | PRD Ref | Dependencies |
|-------|-------|--------|----------|------|---------|--------------|
| STORY-009 | Sauvegarde progression Supabase | 8 | P0 | Epic 2 | US-2.3 | Sprint 1 (auth), Sprint 2 (useProgress) |
| STORY-010 | Contenu Module 2 - HTML semantique | 5 | P0 | Epic 2 | Section 3, US-2.2 | STORY-006 (data structure) |
| STORY-011 | Contenu Module 3 - Introduction au CSS | 7 | P1 | Epic 2 | Section 3, US-2.2 | STORY-010 (Module 2) |

**Total : 20 points**

---

## Execution Order

```
STORY-009 (Supabase Progress)          8 pts ─┐
                                              │  Parallelisable
STORY-010 (Module 2 Content)           5 pts ─┘
    │
    ▼
STORY-011 (Module 3 Content)           7 pts
```

### Rationale

1. **STORY-009 et STORY-010 en parallele** : Pas de dependance directe. Le progressService (009) ne depend pas du contenu Module 2 (010). Les deux peuvent etre developpes simultanement.
2. **STORY-009 first (si sequentiel)** : La sauvegarde Supabase est P0 bloquant MVP. Sans persistance, pas de produit viable. C'est aussi la story la plus risquee (nouvelle integration DB).
3. **STORY-010 before STORY-011** : Le Module 2 doit etre complete avant Module 3, car la navigation inter-lecons enchaine 2.4 → 3.1. De plus, Module 2 (HTML pur) est plus simple que Module 3 (CSS) et permet de valider le pattern avant les lecons CSS.
4. **STORY-011 last** : La plus grosse story de contenu (5 lecons CSS). Depend de Module 2 pour le flow de navigation. Le CSS dans `<style>` introduit un risque de preview/validation a gerer.

---

## Projection MVP

| Sprint | Points | Contenu | Lecons cumul |
|--------|--------|---------|--------------|
| Sprint 1 | 20 | Auth + Landing | 0/22 |
| Sprint 2 | 20 | Editor + Module 1 | 6/22 |
| **Sprint 3** | **20** | **Supabase + Modules 2-3** | **15/22** |
| Sprint 4 | ~15 | Modules 4-5 + SEO | 22/22 = MVP |

**Lancement MVP prevu** : fin Sprint 4

---

## Foundations from Sprint 2

| Element | Status | Location |
|---------|--------|----------|
| useProgress hook (local state) | Existe (a refactoriser) | `src/features/progress/useProgress.ts` |
| Types UserProgress, ProgressState | Existe | `src/types/progress.ts` |
| Supabase client | Existe | `src/lib/supabase.ts` |
| AuthContext (user_id disponible) | Existe | `src/contexts/AuthContext.tsx` |
| Exercise validator | Existe | `src/features/lessons/validator.ts` |
| Module 1 content (reference) | Existe | `src/data/lessons/module-1.ts` |
| Module data structure | Existe | `src/data/modules.ts` |
| useDebounce hook | Existe | `src/hooks/useDebounce.ts` |
| Monaco Editor integration | Existe | `src/components/lesson/CodeEditor.tsx` |
| Preview Panel (iframe srcdoc) | Existe | `src/components/lesson/PreviewPanel.tsx` |

**Impact** : L'infrastructure est en place. Sprint 3 se concentre sur la persistance DB et la creation de contenu.

---

## New Dependencies Required

| Package | Usage | Story |
|---------|-------|-------|
| Aucun | Tout est deja installe (Supabase client, Monaco, etc.) | - |

---

## Shared Components Impact

| Component | Modified in | Impact |
|-----------|------------|--------|
| useProgress | STORY-009 | Refactorise : local → Supabase + fallback local |
| progressService (NEW) | STORY-009 | Nouveau service CRUD Supabase |
| modules.ts | STORY-010, STORY-011 | Import des nouveaux modules |
| LessonPage | STORY-009 | Integration brouillon (draft_code) |
| Dashboard | STORY-009 | Progression reelle depuis Supabase |
| CoursePage | STORY-009 | Progression reelle depuis Supabase |

---

## Acceptance Criteria Summary

### Must Have (bloquant pour validation sprint)

- [x] Progression sauvegardee dans Supabase apres chaque lecon validee
- [x] Brouillon de code sauvegarde et restaure entre sessions
- [x] Reprise automatique a la derniere lecon non terminee
- [x] Module 2 : 4 lecons HTML semantique jouables de bout en bout
- [x] Module 3 : 5 lecons CSS jouables de bout en bout
- [x] Navigation 1.6 → 2.1 → ... → 2.4 → 3.1 → ... → 3.5 fluide
- [x] Fallback gracieux si Supabase down (mode local)
- [x] 100% tests passing
- [x] Responsive desktop + mobile

### Should Have

- [x] Loading state pendant le chargement de la progression
- [x] Message "Connecte-toi pour sauvegarder" pour visiteurs non connectes
- [x] Compteur de tentatives sauvegarde (pour analytics futures)

---

## Definition of Done (Sprint Level)

- [x] Toutes les stories a "Done"
- [x] Tests passing (objectif : +85 tests, total ~441)
- [x] Responsive sur mobile/tablet/desktop
- [x] Code reviewed
- [x] Deploye sur Vercel preview
- [x] Documentation mise a jour
- [x] Commits atomiques par story (pas de mega-commit)

---

## Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Supabase RLS mal configuree | Donnees leakees entre users | Medium | Tests specifiques RLS, review policies |
| Volume contenu (9 lecons a rediger) | Delai, qualite | Medium | Module 1 comme template, contenu guide detaille dans les stories |
| Validator CSS limitations | Tests imprecis Module 3 | High | Tester presence elements + `<style>`, pas les valeurs CSS |
| Test suite lente (6.76s → ?) | DX degrade | Low | Monitoring, optimiser si > 10s |
| Regression useProgress refactor | Dashboard/CourseMap cassent | Medium | Tests existants couvrent, ajouter tests integration |

---

## Process Improvements (from Sprint 2 Retro)

### Engagements Sprint 3

1. **Commits atomiques** : 1 commit par story minimum, pas de mega-staging
   - `feat(STORY-009): save progress to Supabase`
   - `feat(STORY-010): add Module 2 HTML semantique content`
   - `feat(STORY-011): add Module 3 Introduction au CSS content`

2. **Statuts stories mis a jour** : marquer "Done" dans le fichier story + cocher les AC immediatement apres completion

3. **Git workflow** : commit + push regulier, pas d'accumulation de changes non commites

---

## Notes

Sprint 3 est un sprint pivot : il transforme Pystep d'un prototype local en un produit persistant. La sauvegarde Supabase (STORY-009) est le point d'inflexion. Sans elle, les utilisateurs perdent leur progression a chaque fermeture de navigateur.

Les Modules 2-3 portent le contenu a 15/22 lecons (68%). Le "wow moment" CSS de la lecon 3.1 est un moment cle pour la retention des apprenants. Apres ce sprint, il ne restera que 7 lecons (Modules 4-5) pour le MVP complet.
