# STORY-003: User Login

> **Status**: Ready for Development
> **Sprint**: 1
> **Epic**: 1 - Authentification
> **PRD Reference**: US-1.2
> **Points**: 5
> **Assignee**: Amelia
> **Depends on**: STORY-002 (AuthForm, Input, Button, AuthContext)

---

## User Story

**En tant que** utilisateur inscrit,
**Je veux** me connecter avec mon email et mot de passe,
**Afin d'** accéder à mon compte et ma progression.

---

## Acceptance Criteria

### AC-1: Login Form
- [ ] Input email avec label "Email"
- [ ] Input password avec label "Mot de passe"
- [ ] Toggle visibility (eye icon) sur le champ password
- [ ] Checkbox "Rester connecté"
- [ ] Bouton submit "Se connecter"
- [ ] Lien "Mot de passe oublié ?" sous le champ password

### AC-2: Welcome Message
- [ ] Titre: "Bon retour ! 👋"
- [ ] Sous-titre: "Reprends là où tu en étais."

### AC-3: Form Validation
- [ ] Email requis et format valide
- [ ] Password requis
- [ ] Validation au submit
- [ ] Focus sur premier champ en erreur

### AC-4: Supabase Authentication
- [ ] Appel `supabase.auth.signInWithPassword({ email, password })`
- [ ] État loading pendant l'appel
- [ ] Désactivation bouton pendant loading

### AC-5: Success Flow
- [ ] Redirection vers /dashboard après connexion
- [ ] Session persistante si "Rester connecté" coché
- [ ] Utilisation de session storage si non coché

### AC-6: Error Handling
- [ ] Identifiants incorrects: "Email ou mot de passe incorrect"
- [ ] Erreur réseau: "Une erreur est survenue. Réessaie."
- [ ] Message affiché via Alert component

### AC-7: Password Reset Link
- [ ] Lien "Mot de passe oublié ?" visible
- [ ] Click ouvre modal ou navigue vers /forgot-password
- [ ] MVP: peut être une page placeholder

### AC-8: Alternative Path
- [ ] Lien: "Pas encore de compte ? S'inscrire gratuitement"
- [ ] Navigate vers /register

### AC-9: Responsive & Accessible
- [ ] Formulaire centré, max-width 400px
- [ ] Labels associés aux inputs
- [ ] Navigation clavier complète
- [ ] Focus management sur erreurs

---

## Technical Tasks

### T1: Create LoginPage
- [ ] Create `src/pages/LoginPage.tsx`
- [ ] Create route `/login` in router
- [ ] Reuse AuthForm with mode='login'
- [ ] Test: page renders at /login

### T2: Extend AuthForm for login mode
- [ ] Add "Remember me" checkbox
- [ ] Add "Forgot password" link
- [ ] Conditional rendering based on mode
- [ ] Test: login mode shows correct fields
- [ ] Test: register mode doesn't show checkbox

### T3: Create Checkbox component
- [ ] Create `src/components/ui/Checkbox.tsx`
- [ ] Props: label, checked, onChange
- [ ] Accessible (label clickable)
- [ ] Test: toggles on click
- [ ] Test: keyboard accessible

### T4: Implement login logic
- [ ] Add `signIn(email, password, remember?)` to useAuth hook
- [ ] Handle session persistence based on remember
- [ ] Test: signIn calls supabase
- [ ] Test: handles success
- [ ] Test: handles errors
- [ ] Test: remember me affects session

### T5: Create ForgotPasswordPage (placeholder)
- [ ] Create `src/pages/ForgotPasswordPage.tsx`
- [ ] Create route `/forgot-password`
- [ ] Simple form with email input
- [ ] "Coming soon" message for MVP
- [ ] Test: page renders

### T6: Integration tests
- [ ] Test: login with valid credentials
- [ ] Test: login with invalid credentials
- [ ] Test: error message display
- [ ] Test: redirect after success
- [ ] Test: remember me functionality

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

- [ ] All acceptance criteria met
- [ ] All tests passing
- [ ] Error handling complete
- [ ] Loading states implemented
- [ ] Responsive on all devices
- [ ] Code reviewed
- [ ] Deployed to preview

---

## Notes

La fonctionnalité "Mot de passe oublié" sera complète en post-MVP. Pour le MVP, afficher une page placeholder.
