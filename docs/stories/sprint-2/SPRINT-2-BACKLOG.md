# Sprint 2 Backlog

> **Sprint Goal** : Livrer le dashboard, la carte du parcours et l'experience de lecon complete (theorie + editeur + validation)
> **Duration** : 2 semaines
> **Velocity Target** : 20 points (velocite Sprint 1 = 20)
> **Pre-requis** : Sprint 1 DONE (auth complete, 212 tests)

---

## Sprint Overview

| Story | Title | Points | Priority | Epic | PRD Ref | Dependencies |
|-------|-------|--------|----------|------|---------|--------------|
| STORY-005 | Dashboard Page | 3 | P0 | Epic 4 | US-4.2 | Sprint 1 (auth) |
| STORY-006 | Lesson Data + Course Map | 5 | P0 | Epic 2 | US-2.1 | STORY-005 |
| STORY-007 | Code Editor + Lesson Page | 8 | P0 | Epic 3 | US-3.1, US-3.2, US-2.2 | STORY-006 |
| STORY-008 | Exercise Validation + Feedback | 4 | P0 | Epic 3 | US-3.3, US-2.2 | STORY-007 |

**Total : 20 points**

---

## Execution Order

```
STORY-005 (Dashboard)             3 pts
    │
    ▼
STORY-006 (Course Map + Data)     5 pts
    │
    ▼
STORY-007 (Editor + Lesson Page)  8 pts
    │
    ▼
STORY-008 (Validation + Feedback) 4 pts
```

### Rationale

1. **STORY-005** first : Wire ProtectedRoute dans App.tsx, creer la page dashboard, mettre a jour le Header pour la nav authentifiee. Point d'entree post-login.
2. **STORY-006** second : Definir les donnees des lecons (Module 1 complet), creer la page /course avec la carte du parcours. Fondation data pour tout le reste.
3. **STORY-007** third : Integrer Monaco Editor, creer la page /lesson/:id avec layout split (theorie + editeur + preview). Le coeur du produit.
4. **STORY-008** last : Brancher le validator existant sur l'UI, ajouter les modales de feedback, le systeme d'indices progressifs et la navigation "Lecon suivante".

---

## Foundations from Sprint 1

| Element | Status | Location |
|---------|--------|----------|
| Types Lesson/Exercise/Progress | Existe | `src/types/lesson.ts`, `progress.ts` |
| Exercise validator | Existe | `src/features/lessons/validator.ts` |
| ProtectedRoute component | Existe (non wire) | `src/components/auth/ProtectedRoute.tsx` |
| AuthContext + useAuth | Existe | `src/contexts/`, `src/features/auth/` |
| UI: Button, Input, Alert | Existe | `src/components/ui/` |
| Constants (TOTAL_LESSONS, MAX_HINTS) | Existe | `src/lib/constants.ts` |

**Impact** : ~30% du travail technique est deja fait. Le Sprint 2 peut se concentrer sur l'UI et l'integration.

---

## New Dependencies Required

| Package | Usage | Story |
|---------|-------|-------|
| `@monaco-editor/react` | Code editor integration | STORY-007 |

---

## Shared Components Expected

| Component | Created in | Reused in |
|-----------|------------|-----------|
| ProgressBar | STORY-005 | STORY-006, STORY-008 |
| ModuleCard | STORY-005 | STORY-006 |
| LessonLayout | STORY-007 | All lessons |
| CodeEditor | STORY-007 | All lessons |
| PreviewPanel | STORY-007 | All lessons |
| FeedbackModal | STORY-008 | All lessons |
| HintPopover | STORY-008 | All lessons |

---

## Acceptance Criteria Summary

### Must Have (bloquant pour validation sprint)

- [x] Dashboard accessible apres login (/dashboard protege)
- [x] Carte du parcours avec 5 modules et lecons Module 1
- [x] Editeur de code avec coloration syntaxique HTML/CSS
- [x] Preview live du code dans iframe
- [x] Validation d'exercice avec feedback success/erreur
- [x] Navigation entre lecons
- [x] Responsive desktop + mobile
- [x] 100% tests passing

### Should Have

- [x] Indices progressifs (3 niveaux)
- [ ] Layout resizable (editeur/preview)
- [ ] Animation de succes

---

## Definition of Done (Sprint Level)

- [x] Toutes les stories a "Done"
- [x] Tests passing (objectif : +100 tests) -- 356 tests (+144)
- [x] Responsive sur mobile/tablet/desktop
- [x] Code reviewed
- [x] Deploye sur Vercel preview -- https://pystep.vercel.app
- [x] Documentation mise a jour

---

## Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Monaco bundle size (> 1MB) | Perf mobile | High | Lazy loading + code splitting |
| Monaco dans vitest (jsdom) | Tests cassent | High | Mock Monaco, tester logique separement |
| Contenu lecons long a rediger | Delai | Medium | Module 1 only (6 lecons), reste Sprint 3 |
| iframe preview securite | XSS theorique | Low | sandbox attribute, pas de scripts |

---

## Notes

Sprint 2 est le sprint le plus technique du MVP. L'editeur Monaco est le risque principal. Si l'integration bloque, fallback sur un `<textarea>` avec coloration basique.

La progression n'est PAS sauvegardee en base dans ce sprint (pas de Supabase DB). C'est du state local. US-2.3 (sauvegarde progression) sera Sprint 3.
