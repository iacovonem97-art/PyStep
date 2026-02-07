# STORY-003: User Login

> **Status**: Done
> **Sprint**: 1
> **Epic**: 1 - Authentification
> **PRD Reference**: US-1.2
> **Points**: 5
> **Assignee**: Amelia
> **Depends on**: STORY-002 (AuthForm, Input, Button, AuthContext)
> **Completed**: 6 fevrier 2026
> **Commit**: `ea84bff`

---

## User Story

**En tant que** utilisateur inscrit,
**Je veux** me connecter avec mon email et mot de passe,
**Afin d'** accéder à mon compte et ma progression.

---

## Acceptance Criteria

### AC-1: Login Form
- [x] Input email avec label "Email"
- [x] Input password avec label "Mot de passe"
- [x] Toggle visibility (eye icon) sur le champ password
- [x] Checkbox "Rester connecté"
- [x] Bouton submit "Se connecter"
- [x] Lien "Mot de passe oublié ?" sous le champ password

### AC-2: Welcome Message
- [x] Titre: "Bon retour ! 👋"
- [x] Sous-titre: "Reprends là où tu en étais."

### AC-3: Form Validation
- [x] Email requis et format valide
- [x] Password requis
- [x] Validation au submit
- [x] Focus sur premier champ en erreur

### AC-4: Supabase Authentication
- [x] Appel `supabase.auth.signInWithPassword({ email, password })`
- [x] État loading pendant l'appel
- [x] Désactivation bouton pendant loading

### AC-5: Success Flow
- [x] Redirection vers /dashboard après connexion
- [x] Session persistante si "Rester connecté" coché
- [x] Utilisation de session storage si non coché

### AC-6: Error Handling
- [x] Identifiants incorrects: "Email ou mot de passe incorrect"
- [x] Erreur réseau: "Une erreur est survenue. Réessaie."
- [x] Message affiché via Alert component

### AC-7: Password Reset Link
- [x] Lien "Mot de passe oublié ?" visible
- [x] Click ouvre modal ou navigue vers /forgot-password
- [x] MVP: peut être une page placeholder

### AC-8: Alternative Path
- [x] Lien: "Pas encore de compte ? S'inscrire gratuitement"
- [x] Navigate vers /register

### AC-9: Responsive & Accessible
- [x] Formulaire centré, max-width 400px
- [x] Labels associés aux inputs
- [x] Navigation clavier complète
- [x] Focus management sur erreurs

---

## Technical Tasks

### T1: Create LoginPage
- [x] Create `src/pages/LoginPage.tsx`
- [x] Create route `/login` in router
- [x] Reuse AuthForm with mode='login'
- [x] Test: page renders at /login

### T2: Extend AuthForm for login mode
- [x] Add "Remember me" checkbox
- [x] Add "Forgot password" link
- [x] Conditional rendering based on mode
- [x] Test: login mode shows correct fields
- [x] Test: register mode doesn't show checkbox

### T3: Create Checkbox component
- [x] Create `src/components/ui/Checkbox.tsx`
- [x] Props: label, checked, onChange
- [x] Accessible (label clickable)
- [x] Test: toggles on click
- [x] Test: keyboard accessible

### T4: Implement login logic
- [x] Add `signIn(email, password, remember?)` to useAuth hook
- [x] Handle session persistence based on remember
- [x] Test: signIn calls supabase
- [x] Test: handles success
- [x] Test: handles errors
- [x] Test: remember me affects session

### T5: Create ForgotPasswordPage (placeholder)
- [x] Create `src/pages/ForgotPasswordPage.tsx`
- [x] Create route `/forgot-password`
- [x] Simple form with email input
- [x] "Coming soon" message for MVP
- [x] Test: page renders

### T6: Integration tests
- [x] Test: login with valid credentials
- [x] Test: login with invalid credentials
- [x] Test: error message display
- [x] Test: redirect after success
- [x] Test: remember me functionality

---

## Design References

- **Wireframe**: `docs/ux-wireframes.md` Section 3.3
- **UI Kit**: `docs/ui-kit.md` Section 6.2
- **Error states**: `docs/ux-wireframes.md` Section 3.4

---

## Out of Scope

- Password reset email flow (placeholder page for MVP)
- OAuth (Google/GitHub)
- Rate limiting (handle at Supabase level)
- Account lockout

---

## Definition of Done

- [x] All acceptance criteria met
- [x] All tests passing
- [x] Error handling complete
- [x] Loading states implemented
- [x] Responsive on all devices
- [x] Code reviewed
- [x] Deployed to preview -- https://pystep.vercel.app

---

## Notes

La fonctionnalité "Mot de passe oublié" sera complète en post-MVP. Pour le MVP, afficher une page placeholder.
