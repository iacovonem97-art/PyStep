# STORY-002: User Registration

> **Status**: Done
> **Sprint**: 1
> **Epic**: 1 - Authentification
> **PRD Reference**: US-1.1
> **Points**: 8
> **Assignee**: Amelia
> **Depends on**: STORY-001 (Header component)
> **Completed**: 6 fevrier 2026
> **Commit**: `ea84bff`

---

## User Story

**En tant que** visiteur,
**Je veux** créer un compte avec mon email et un mot de passe,
**Afin de** sauvegarder ma progression.

---

## Acceptance Criteria

### AC-1: Registration Form
- [x] Input email avec label "Email"
- [x] Input password avec label "Mot de passe"
- [x] Input password confirmation avec label "Confirme ton mot de passe"
- [x] Toggle visibility (eye icon) sur les champs password
- [x] Bouton submit "Créer mon compte"
- [x] Lien "Déjà un compte ? Se connecter"

### AC-2: Email Validation
- [x] Format email valide requis (regex validation)
- [x] Message d'erreur: "Entre une adresse email valide"
- [x] Validation en temps réel (on blur)
- [x] Indicateur visuel: bordure rouge + icône erreur

### AC-3: Password Validation
- [x] Minimum 8 caractères requis
- [x] Message helper: "Minimum 8 caractères"
- [x] Message d'erreur si < 8: "Encore X caractères minimum"
- [x] Indicateur visuel: bordure rouge/verte selon état

### AC-4: Password Confirmation
- [x] Doit correspondre au mot de passe
- [x] Message d'erreur: "Les mots de passe ne correspondent pas"
- [x] Validation au blur et au submit

### AC-5: Supabase Integration
- [x] Appel `supabase.auth.signUp({ email, password })`
- [x] Gestion état loading pendant l'appel
- [x] Désactivation du bouton pendant loading
- [x] Spinner ou indicateur de chargement

### AC-6: Success Flow
- [x] Après inscription réussie: redirection vers /dashboard
- [x] Message de succès affiché
- [x] Session utilisateur créée automatiquement

### AC-7: Error Handling
- [x] Email déjà utilisé: "Cet email a déjà un compte. [Se connecter] ou [Mot de passe oublié ?]"
- [x] Erreur réseau: "Une erreur est survenue. Réessaie."
- [x] Affichage erreur via Alert component

### AC-8: Social Proof
- [x] Sous-titre: "Rejoins 127 apprenants qui codent déjà !"
- [x] Ton accueillant: "Crée ton compte"

### AC-9: Legal Compliance
- [x] Mention: "En t'inscrivant, tu acceptes nos Conditions d'utilisation et Politique de confidentialité"
- [x] Liens cliquables (peuvent être des pages vides pour MVP)

### AC-10: Responsive & Accessible
- [x] Formulaire centré, max-width 400px
- [x] Labels associés aux inputs (htmlFor)
- [x] aria-describedby pour les messages d'erreur
- [x] Focus management: focus sur premier champ erreur au submit
- [x] Fonctionne sur mobile

---

## Technical Tasks

### T1: Create RegisterPage
- [x] Create `src/pages/RegisterPage.tsx`
- [x] Create route `/register` in router
- [x] Test: page renders at /register

### T2: Setup Supabase Client
- [x] Create `src/lib/supabase.ts`
- [x] Configure with env variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
- [x] Export supabase client
- [x] Test: client initializes without error

### T3: Create AuthForm component
- [x] Create `src/components/auth/AuthForm.tsx`
- [x] Reusable for login/register
- [x] Props: mode ('register' | 'login')
- [x] Test: renders correct fields for mode

### T4: Create Input component
- [x] Create `src/components/ui/Input.tsx`
- [x] Props: label, type, error, helperText, icon
- [x] Implement password visibility toggle
- [x] Implement error/success states
- [x] Test: displays error state
- [x] Test: toggle password visibility

### T5: Create Button component
- [x] Create `src/components/ui/Button.tsx`
- [x] Props: variant, size, loading, disabled
- [x] Implement loading spinner
- [x] Test: shows spinner when loading
- [x] Test: disabled when loading

### T6: Create Alert component
- [x] Create `src/components/ui/Alert.tsx`
- [x] Props: type (success | error | warning | info), message
- [x] Test: renders with correct styling

### T7: Implement form validation
- [x] Create `src/utils/validation.ts`
- [x] `validateEmail(email: string): string | null`
- [x] `validatePassword(password: string): string | null`
- [x] `validatePasswordMatch(password: string, confirm: string): string | null`
- [x] Test: email validation
- [x] Test: password validation
- [x] Test: password match validation

### T8: Implement registration logic
- [x] Create `src/hooks/useAuth.ts`
- [x] `signUp(email, password)` function
- [x] Handle loading state
- [x] Handle errors
- [x] Test: signUp calls supabase
- [x] Test: handles success
- [x] Test: handles errors

### T9: Create AuthContext
- [x] Create `src/contexts/AuthContext.tsx`
- [x] Provide user state
- [x] Provide auth methods
- [x] Listen to auth state changes
- [x] Test: context provides user
- [x] Test: context updates on auth change

### T10: Integration tests
- [x] Test: full registration flow
- [x] Test: validation errors display
- [x] Test: successful registration redirects
- [x] Test: error handling

---

## Design References

- **Wireframe**: `docs/ux-wireframes.md` Section 3.1, 3.2
- **UI Kit**: `docs/ui-kit.md` Section 6.2 (Inputs)
- **Form states**: `docs/ux-wireframes.md` Section 3.4

---

## Environment Variables Required

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

---

## Out of Scope

- Email confirmation flow (MVP: auto-confirm)
- OAuth (Google/GitHub)
- Password strength meter
- Remember me checkbox

---

## Definition of Done

- [x] All acceptance criteria met
- [x] All tests passing
- [x] Form accessible (screen reader tested)
- [x] Error states properly handled
- [x] Loading states implemented
- [x] Responsive on all devices
- [x] Code reviewed
- [x] Deployed to preview -- https://pystep.vercel.app

---

## Notes

Supabase doit être configuré pour désactiver la confirmation email en dev, ou l'activer avec un vrai SMTP pour prod.
