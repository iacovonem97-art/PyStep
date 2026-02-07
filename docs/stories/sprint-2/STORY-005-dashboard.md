# STORY-005: Dashboard Page

> **Status** : Done
> **Sprint** : 2
> **Epic** : 4 - Pages statiques
> **PRD Reference** : US-4.2
> **Points** : 3
> **Assignee** : Amelia
> **Depends on** : Sprint 1 (AuthContext, ProtectedRoute, Header)
> **Completed** : 7 fevrier 2026
> **Commit** : `52b0bb6`

---

## User Story

**En tant que** utilisateur connecte,
**Je veux** voir mon tableau de bord personnel,
**Afin de** suivre ma progression globale et reprendre mon apprentissage.

---

## Acceptance Criteria

### AC-1: Protected Route
- [x] Route `/dashboard` protegee par ProtectedRoute
- [x] Redirect vers `/login` si non authentifie
- [x] Loading spinner pendant la verification auth
- [x] Redirect vers `/dashboard` apres login reussi

### AC-2: Welcome Section
- [x] Message "Bienvenue [email] !" personnalise
- [x] Affichage de la lecon en cours : "Tu en es a la lecon X.Y -- [titre]"
- [x] Bouton CTA "Continuer" prominent (lien vers `/lesson/:id`)
- [x] Si aucune progression : "Pret a commencer ?" + "Commencer le parcours"

### AC-3: Progress Bar
- [x] Barre de progression globale (% complete)
- [x] Texte "X lecons terminees sur 22"
- [x] Visuellement conforme au wireframe (barre + pourcentage)

### AC-4: Module Cards
- [x] 5 cartes modules affichees (grille 2 colonnes desktop, 1 colonne mobile)
- [x] Chaque carte : nom du module, description, progression X/Y
- [x] Etats visuels : en cours (couleur), verrouille (grise), complete (vert)
- [x] Module en cours : bouton "Continuer"
- [x] Module verrouille : message "Termine le Module X pour debloquer"

### AC-5: Header Navigation Update
- [x] Header authentifie : liens "Dashboard", "Parcours" + email + Deconnexion
- [x] Header visiteur : inchange (Se connecter / S'inscrire)
- [x] Navigation active indicator sur la page courante

### AC-6: Responsive
- [x] Desktop : grille 2 colonnes pour les modules
- [x] Mobile : 1 colonne, cards empilees
- [x] Welcome section toujours en haut

---

## Technical Tasks

### T1: Wire ProtectedRoute in App.tsx
- [x] Add route `/dashboard` wrapped in ProtectedRoute
- [x] Update login redirect to `/dashboard` after success
- [x] Update register redirect to `/dashboard` after success
- [x] Test: unauthenticated user redirected to /login
- [x] Test: authenticated user sees dashboard

### T2: Create DashboardPage
- [x] Create `src/pages/DashboardPage.tsx`
- [x] Import useAuthContext for user data
- [x] Static progress data (mock ProgressState for now)
- [x] Test: page renders with user email
- [x] Test: shows welcome message

### T3: Create ProgressBar component
- [x] Create `src/components/ui/ProgressBar.tsx`
- [x] Props: value (0-100), label, showPercentage
- [x] Animated fill with transition
- [x] Test: renders correct width
- [x] Test: displays percentage text

### T4: Create ModuleCard component
- [x] Create `src/components/dashboard/ModuleCard.tsx`
- [x] Props: module info, progress, status (active|locked|complete)
- [x] Conditional rendering based on status
- [x] Test: renders module name and progress
- [x] Test: locked state shows message
- [x] Test: active state shows "Continuer" button

### T5: Update Header for authenticated nav
- [x] Add "Dashboard" and "Parcours" links when authenticated
- [x] Active page indicator (underline or bold)
- [x] Update mobile menu with new links
- [x] Test: authenticated header shows new links
- [x] Test: visitor header unchanged

### T6: Integration tests
- [x] Test: full page renders for new user (no progress)
- [x] Test: full page renders with mock progress
- [x] Test: navigation links work
- [x] Test: responsive layout

---

## Design References

- **Wireframe** : `docs/ux-wireframes.md` Section 4 (Dashboard)
- **Header auth** : `docs/ux-wireframes.md` Section 8.1
- **UI Kit** : `docs/ui-kit.md`

---

## Out of Scope

- Real progression from Supabase (mock data for now)
- "Mon compte" page
- User profile editing

---

## Definition of Done

- [x] All acceptance criteria met
- [x] All tests passing
- [x] ProtectedRoute wired for /dashboard
- [x] Responsive on all devices
- [x] Code reviewed
