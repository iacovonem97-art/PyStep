# STORY-002: User Registration

> **Status**: Ready for Development
> **Sprint**: 1
> **Epic**: 1 - Authentification
> **PRD Reference**: US-1.1
> **Points**: 8
> **Assignee**: Amelia
> **Depends on**: STORY-001 (Header component)

---

## User Story

**En tant que** visiteur,
**Je veux** créer un compte avec mon email et un mot de passe,
**Afin de** sauvegarder ma progression.

---

## Acceptance Criteria

### AC-1: Registration Form
- [ ] Input email avec label "Email"
- [ ] Input password avec label "Mot de passe"
- [ ] Input password confirmation avec label "Confirme ton mot de passe"
- [ ] Toggle visibility (eye icon) sur les champs password
- [ ] Bouton submit "Créer mon compte"
- [ ] Lien "Déjà un compte ? Se connecter"

### AC-2: Email Validation
- [ ] Format email valide requis (regex validation)
- [ ] Message d'erreur: "Entre une adresse email valide"
- [ ] Validation en temps réel (on blur)
- [ ] Indicateur visuel: bordure rouge + icône erreur

### AC-3: Password Validation
- [ ] Minimum 8 caractères requis
- [ ] Message helper: "Minimum 8 caractères"
- [ ] Message d'erreur si < 8: "Encore X caractères minimum"
- [ ] Indicateur visuel: bordure rouge/verte selon état

### AC-4: Password Confirmation
- [ ] Doit correspondre au mot de passe
- [ ] Message d'erreur: "Les mots de passe ne correspondent pas"
- [ ] Validation au blur et au submit

### AC-5: Supabase Integration
- [ ] Appel `supabase.auth.signUp({ email, password })`
- [ ] Gestion état loading pendant l'appel
- [ ] Désactivation du bouton pendant loading
- [ ] Spinner ou indicateur de chargement

### AC-6: Success Flow
- [ ] Après inscription réussie: redirection vers /dashboard
- [ ] Message de succès affiché
- [ ] Session utilisateur créée automatiquement

### AC-7: Error Handling
- [ ] Email déjà utilisé: "Cet email a déjà un compte. [Se connecter] ou [Mot de passe oublié ?]"
- [ ] Erreur réseau: "Une erreur est survenue. Réessaie."
- [ ] Affichage erreur via Alert component

### AC-8: Social Proof
- [ ] Sous-titre: "Rejoins 127 apprenants qui codent déjà !"
- [ ] Ton accueillant: "Crée ton compte"

### AC-9: Legal Compliance
- [ ] Mention: "En t'inscrivant, tu acceptes nos Conditions d'utilisation et Politique de confidentialité"
- [ ] Liens cliquables (peuvent être des pages vides pour MVP)

### AC-10: Responsive & Accessible
- [ ] Formulaire centré, max-width 400px
- [ ] Labels associés aux inputs (htmlFor)
- [ ] aria-describedby pour les messages d'erreur
- [ ] Focus management: focus sur premier champ erreur au submit
- [ ] Fonctionne sur mobile

---

## Technical Tasks

### T1: Create RegisterPage
- [ ] Create `src/pages/RegisterPage.tsx`
- [ ] Create route `/register` in router
- [ ] Test: page renders at /register

### T2: Setup Supabase Client
- [ ] Create `src/lib/supabase.ts`
- [ ] Configure with env variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
- [ ] Export supabase client
- [ ] Test: client initializes without error

### T3: Create AuthForm component
- [ ] Create `src/components/auth/AuthForm.tsx`
- [ ] Reusable for login/register
- [ ] Props: mode ('register' | 'login')
- [ ] Test: renders correct fields for mode

### T4: Create Input component
- [ ] Create `src/components/ui/Input.tsx`
- [ ] Props: label, type, error, helperText, icon
- [ ] Implement password visibility toggle
- [ ] Implement error/success states
- [ ] Test: displays error state
- [ ] Test: toggle password visibility

### T5: Create Button component
- [ ] Create `src/components/ui/Button.tsx`
- [ ] Props: variant, size, loading, disabled
- [ ] Implement loading spinner
- [ ] Test: shows spinner when loading
- [ ] Test: disabled when loading

### T6: Create Alert component
- [ ] Create `src/components/ui/Alert.tsx`
- [ ] Props: type (success | error | warning | info), message
- [ ] Test: renders with correct styling

### T7: Implement form validation
- [ ] Create `src/utils/validation.ts`
- [ ] `validateEmail(email: string): string | null`
- [ ] `validatePassword(password: string): string | null`
- [ ] `validatePasswordMatch(password: string, confirm: string): string | null`
- [ ] Test: email validation
- [ ] Test: password validation
- [ ] Test: password match validation

### T8: Implement registration logic
- [ ] Create `src/hooks/useAuth.ts`
- [ ] `signUp(email, password)` function
- [ ] Handle loading state
- [ ] Handle errors
- [ ] Test: signUp calls supabase
- [ ] Test: handles success
- [ ] Test: handles errors

### T9: Create AuthContext
- [ ] Create `src/contexts/AuthContext.tsx`
- [ ] Provide user state
- [ ] Provide auth methods
- [ ] Listen to auth state changes
- [ ] Test: context provides user
- [ ] Test: context updates on auth change

### T10: Integration tests
- [ ] Test: full registration flow
- [ ] Test: validation errors display
- [ ] Test: successful registration redirects
- [ ] Test: error handling

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

- [ ] All acceptance criteria met
- [ ] All tests passing
- [ ] Form accessible (screen reader tested)
- [ ] Error states properly handled
- [ ] Loading states implemented
- [ ] Responsive on all devices
- [ ] Code reviewed
- [ ] Deployed to preview

---

## Notes

Supabase doit être configuré pour désactiver la confirmation email en dev, ou l'activer avec un vrai SMTP pour prod.
