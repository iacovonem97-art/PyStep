# STORY-006: Lesson Data + Course Map

> **Status** : Ready for Development
> **Sprint** : 2
> **Epic** : 2 - Parcours d'apprentissage
> **PRD Reference** : US-2.1
> **Points** : 5
> **Assignee** : Amelia
> **Depends on** : STORY-005 (Dashboard, Header nav)

---

## User Story

**En tant que** utilisateur,
**Je veux** voir la liste des modules et lecons disponibles,
**Afin de** comprendre ce que je vais apprendre et suivre ma progression.

---

## Acceptance Criteria

### AC-1: Lesson Data (Module 1)
- [ ] 6 lecons Module 1 definies avec contenu complet :
  - 1.1 Qu'est-ce que le HTML ?
  - 1.2 Structure d'une page
  - 1.3 Les titres et paragraphes
  - 1.4 Les listes
  - 1.5 Les liens
  - 1.6 Les images
- [ ] Chaque lecon contient : theory (content + examples), exercise (instructions + starterCode + hints + tests)
- [ ] Modules 2-5 : metadata seulement (titre, description, nombre de lecons), pas de contenu

### AC-2: Module Data Structure
- [ ] Interface Module definie : id, title, description, lessonCount, lessons[]
- [ ] 5 modules definis avec metadata
- [ ] Export depuis `src/data/modules.ts` et `src/data/lessons/module-1.ts`

### AC-3: Course Map Page
- [ ] Route `/course` accessible (protege)
- [ ] Titre "Le parcours complet"
- [ ] Barre de progression globale en haut
- [ ] 5 modules affiches en accordion/collapsible

### AC-4: Module Accordion
- [ ] Module en cours : expanded par defaut
- [ ] Clic sur un module : expand/collapse
- [ ] Header module : nom, progression X/Y, icone statut
- [ ] Body module : liste des lecons

### AC-5: Lesson List Items
- [ ] Lecon completee : icone vert + titre + bouton "Revoir"
- [ ] Lecon en cours : icone play + titre + bouton "Continuer"
- [ ] Lecon verrouillee : icone cadenas + titre (grise)
- [ ] Mini-projet : icone cible + titre distinctif
- [ ] Click sur lecon accessible → navigate vers `/lesson/:id`

### AC-6: Module Lock Logic
- [ ] Module 1 : toujours debloque
- [ ] Module N : debloque si Module N-1 est 100% complete
- [ ] Module verrouille : message "Termine le Module X pour debloquer"

### AC-7: Responsive
- [ ] Desktop : modules avec padding confortable
- [ ] Mobile : full width, touch-friendly (tap targets 44px min)

---

## Technical Tasks

### T1: Define Module type and data
- [ ] Create `src/types/module.ts` : Module interface
- [ ] Create `src/data/modules.ts` : 5 modules metadata
- [ ] Export from types/index.ts
- [ ] Test: module data is valid and complete

### T2: Create Module 1 lesson content
- [ ] Create `src/data/lessons/module-1.ts`
- [ ] 6 lessons with full theory + exercise content
- [ ] Each exercise has 2-4 tests using ExerciseTest type
- [ ] Each exercise has 2-3 hints
- [ ] Test: all lessons have required fields
- [ ] Test: all exercise tests are valid

### T3: Create CoursePage
- [ ] Create `src/pages/CoursePage.tsx`
- [ ] Route `/course` in App.tsx (protected)
- [ ] Progress bar at top
- [ ] Render ModuleAccordion for each module
- [ ] Test: page renders all 5 modules
- [ ] Test: progress bar shows correct value

### T4: Create ModuleAccordion component
- [ ] Create `src/components/course/ModuleAccordion.tsx`
- [ ] Props: module, progress, isExpanded, onToggle
- [ ] Header with module info + expand/collapse
- [ ] Body with LessonListItem for each lesson
- [ ] Test: expands on click
- [ ] Test: shows correct status icon

### T5: Create LessonListItem component
- [ ] Create `src/components/course/LessonListItem.tsx`
- [ ] Props: lesson, status (completed|current|locked)
- [ ] Conditional rendering for each status
- [ ] Link to `/lesson/:id` for accessible lessons
- [ ] Test: renders correct icon per status
- [ ] Test: locked lesson is not clickable
- [ ] Test: completed lesson shows "Revoir"

### T6: Create useProgress hook
- [ ] Create `src/features/progress/useProgress.ts`
- [ ] Local state management (no Supabase yet)
- [ ] Returns: completedLessons, currentLessonId, percentComplete, isModuleUnlocked()
- [ ] Test: calculates progress correctly
- [ ] Test: module unlock logic

### T7: Integration tests
- [ ] Test: full course page renders with no progress
- [ ] Test: module 1 expanded by default
- [ ] Test: lesson click navigates to /lesson/:id
- [ ] Test: locked module shows message
- [ ] Test: responsive layout

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

- [ ] All acceptance criteria met
- [ ] Module 1 : 6 lecons avec contenu complet
- [ ] All tests passing
- [ ] Responsive on all devices
- [ ] Code reviewed
