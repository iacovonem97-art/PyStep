# STORY-006: Lesson Data + Course Map

> **Status** : Done
> **Sprint** : 2
> **Epic** : 2 - Parcours d'apprentissage
> **PRD Reference** : US-2.1
> **Points** : 5
> **Assignee** : Amelia
> **Depends on** : STORY-005 (Dashboard, Header nav)
> **Completed** : 7 fevrier 2026
> **Commit** : `a6541a1`

---

## User Story

**En tant que** utilisateur,
**Je veux** voir la liste des modules et lecons disponibles,
**Afin de** comprendre ce que je vais apprendre et suivre ma progression.

---

## Acceptance Criteria

### AC-1: Lesson Data (Module 1)
- [x] 6 lecons Module 1 definies avec contenu complet :
  - 1.1 Qu'est-ce que le HTML ?
  - 1.2 Structure d'une page
  - 1.3 Les titres et paragraphes
  - 1.4 Les listes
  - 1.5 Les liens
  - 1.6 Les images
- [x] Chaque lecon contient : theory (content + examples), exercise (instructions + starterCode + hints + tests)
- [x] Modules 2-5 : metadata seulement (titre, description, nombre de lecons), pas de contenu

### AC-2: Module Data Structure
- [x] Interface Module definie : id, title, description, lessonCount, lessons[]
- [x] 5 modules definis avec metadata
- [x] Export depuis `src/data/modules.ts` et `src/data/lessons/module-1.ts`

### AC-3: Course Map Page
- [x] Route `/course` accessible (protege)
- [x] Titre "Le parcours complet"
- [x] Barre de progression globale en haut
- [x] 5 modules affiches en accordion/collapsible

### AC-4: Module Accordion
- [x] Module en cours : expanded par defaut
- [x] Clic sur un module : expand/collapse
- [x] Header module : nom, progression X/Y, icone statut
- [x] Body module : liste des lecons

### AC-5: Lesson List Items
- [x] Lecon completee : icone vert + titre + bouton "Revoir"
- [x] Lecon en cours : icone play + titre + bouton "Continuer"
- [x] Lecon verrouillee : icone cadenas + titre (grise)
- [x] Mini-projet : icone cible + titre distinctif
- [x] Click sur lecon accessible → navigate vers `/lesson/:id`

### AC-6: Module Lock Logic
- [x] Module 1 : toujours debloque
- [x] Module N : debloque si Module N-1 est 100% complete
- [x] Module verrouille : message "Termine le Module X pour debloquer"

### AC-7: Responsive
- [x] Desktop : modules avec padding confortable
- [x] Mobile : full width, touch-friendly (tap targets 44px min)

---

## Technical Tasks

### T1: Define Module type and data
- [x] Create `src/types/module.ts` : Module interface
- [x] Create `src/data/modules.ts` : 5 modules metadata
- [x] Export from types/index.ts
- [x] Test: module data is valid and complete

### T2: Create Module 1 lesson content
- [x] Create `src/data/lessons/module-1.ts`
- [x] 6 lessons with full theory + exercise content
- [x] Each exercise has 2-4 tests using ExerciseTest type
- [x] Each exercise has 2-3 hints
- [x] Test: all lessons have required fields
- [x] Test: all exercise tests are valid

### T3: Create CoursePage
- [x] Create `src/pages/CoursePage.tsx`
- [x] Route `/course` in App.tsx (protected)
- [x] Progress bar at top
- [x] Render ModuleAccordion for each module
- [x] Test: page renders all 5 modules
- [x] Test: progress bar shows correct value

### T4: Create ModuleAccordion component
- [x] Create `src/components/course/ModuleAccordion.tsx`
- [x] Props: module, progress, isExpanded, onToggle
- [x] Header with module info + expand/collapse
- [x] Body with LessonListItem for each lesson
- [x] Test: expands on click
- [x] Test: shows correct status icon

### T5: Create LessonListItem component
- [x] Create `src/components/course/LessonListItem.tsx`
- [x] Props: lesson, status (completed|current|locked)
- [x] Conditional rendering for each status
- [x] Link to `/lesson/:id` for accessible lessons
- [x] Test: renders correct icon per status
- [x] Test: locked lesson is not clickable
- [x] Test: completed lesson shows "Revoir"

### T6: Create useProgress hook
- [x] Create `src/features/progress/useProgress.ts`
- [x] Local state management (no Supabase yet)
- [x] Returns: completedLessons, currentLessonId, percentComplete, isModuleUnlocked()
- [x] Test: calculates progress correctly
- [x] Test: module unlock logic

### T7: Integration tests
- [x] Test: full course page renders with no progress
- [x] Test: module 1 expanded by default
- [x] Test: lesson click navigates to /lesson/:id
- [x] Test: locked module shows message
- [x] Test: responsive layout

---

## Design References

- **Wireframe** : `docs/ux-wireframes.md` Section 5 (Page Parcours)
- **Lesson statuts** : Section 5.2 Notes UX
- **PRD Module list** : `docs/prd-mvp.md` Section 3

---

## Lesson Content Guide (for Module 1)

### 1.1 Qu'est-ce que le HTML ?
- Theory : Explication HTML, navigateur, premier exemple `<h1>`
- Exercise : Ecrire un `<h1>` avec du texte
- Tests : h1 exists, h1 has text

### 1.2 Structure d'une page
- Theory : `<!DOCTYPE>`, `<html>`, `<head>`, `<body>`
- Exercise : Creer une page HTML complete avec titre
- Tests : doctype, html, head, title, body exist

### 1.3 Les titres et paragraphes
- Theory : `<h1>`-`<h6>`, `<p>`, hierarchie
- Exercise : Creer une page avec h1, h2, et un paragraphe
- Tests : h1 exists, h2 exists, p exists, h1 has text

### 1.4 Les listes
- Theory : `<ul>`, `<ol>`, `<li>`, difference
- Exercise : Creer une liste non ordonnee avec 3 items
- Tests : ul exists, li count = 3

### 1.5 Les liens
- Theory : `<a>`, attribut href, target
- Exercise : Creer un lien vers un site
- Tests : a exists, a has href attribute

### 1.6 Les images
- Theory : `<img>`, src, alt, accessibilite
- Exercise : Ajouter une image avec alt text
- Tests : img exists, img has src, img has alt

---

## Out of Scope

- Contenu lecons Modules 2-5 (Sprint 3+)
- Sauvegarde progression Supabase (Sprint 3)
- Animations de transition entre etats
- Search/filter dans le parcours

---

## Definition of Done

- [x] All acceptance criteria met
- [x] Module 1 : 6 lecons avec contenu complet
- [x] All tests passing
- [x] Responsive on all devices
- [x] Code reviewed
