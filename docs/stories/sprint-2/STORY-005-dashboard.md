# STORY-005: Dashboard Page

> **Status** : Ready for Development
> **Sprint** : 2
> **Epic** : 4 - Pages statiques
> **PRD Reference** : US-4.2
> **Points** : 3
> **Assignee** : Amelia
> **Depends on** : Sprint 1 (AuthContext, ProtectedRoute, Header)

---

## User Story

**En tant que** utilisateur connecte,
**Je veux** voir mon tableau de bord personnel,
**Afin de** suivre ma progression globale et reprendre mon apprentissage.

---

## Acceptance Criteria

### AC-1: Protected Route
- [ ] Route `/dashboard` protegee par ProtectedRoute
- [ ] Redirect vers `/login` si non authentifie
- [ ] Loading spinner pendant la verification auth
- [ ] Redirect vers `/dashboard` apres login reussi

### AC-2: Welcome Section
- [ ] Message "Bienvenue [email] !" personnalise
- [ ] Affichage de la lecon en cours : "Tu en es a la lecon X.Y -- [titre]"
- [ ] Bouton CTA "Continuer" prominent (lien vers `/lesson/:id`)
- [ ] Si aucune progression : "Pret a commencer ?" + "Commencer le parcours"

### AC-3: Progress Bar
- [ ] Barre de progression globale (% complete)
- [ ] Texte "X lecons terminees sur 22"
- [ ] Visuellement conforme au wireframe (barre + pourcentage)

### AC-4: Module Cards
- [ ] 5 cartes modules affichees (grille 2 colonnes desktop, 1 colonne mobile)
- [ ] Chaque carte : nom du module, description, progression X/Y
- [ ] Etats visuels : en cours (couleur), verrouille (grise), complete (vert)
- [ ] Module en cours : bouton "Continuer"
- [ ] Module verrouille : message "Termine le Module X pour debloquer"

### AC-5: Header Navigation Update
- [ ] Header authentifie : liens "Dashboard", "Parcours" + email + Deconnexion
- [ ] Header visiteur : inchange (Se connecter / S'inscrire)
- [ ] Navigation active indicator sur la page courante

### AC-6: Responsive
- [ ] Desktop : grille 2 colonnes pour les modules
- [ ] Mobile : 1 colonne, cards empilees
- [ ] Welcome section toujours en haut

---

## Technical Tasks

### T1: Wire ProtectedRoute in App.tsx
- [ ] Add route `/dashboard` wrapped in ProtectedRoute
- [ ] Update login redirect to `/dashboard` after success
- [ ] Update register redirect to `/dashboard` after success
- [ ] Test: unauthenticated user redirected to /login
- [ ] Test: authenticated user sees dashboard

### T2: Create DashboardPage
- [ ] Create `src/pages/DashboardPage.tsx`
- [ ] Import useAuthContext for user data
- [ ] Static progress data (mock ProgressState for now)
- [ ] Test: page renders with user email
- [ ] Test: shows welcome message

### T3: Create ProgressBar component
- [ ] Create `src/components/ui/ProgressBar.tsx`
- [ ] Props: value (0-100), label, showPercentage
- [ ] Animated fill with transition
- [ ] Test: renders correct width
- [ ] Test: displays percentage text

### T4: Create ModuleCard component
- [ ] Create `src/components/dashboard/ModuleCard.tsx`
- [ ] Props: module info, progress, status (active|locked|complete)
- [ ] Conditional rendering based on status
- [ ] Test: renders module name and progress
- [ ] Test: locked state shows message
- [ ] Test: active state shows "Continuer" button

### T5: Update Header for authenticated nav
- [ ] Add "Dashboard" and "Parcours" links when authenticated
- [ ] Active page indicator (underline or bold)
- [ ] Update mobile menu with new links
- [ ] Test: authenticated header shows new links
- [ ] Test: visitor header unchanged

### T6: Integration tests
- [ ] Test: full page renders for new user (no progress)
- [ ] Test: full page renders with mock progress
- [ ] Test: navigation links work
- [ ] Test: responsive layout

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

- [ ] All acceptance criteria met
- [ ] All tests passing
- [ ] ProtectedRoute wired for /dashboard
- [ ] Responsive on all devices
- [ ] Code reviewed
