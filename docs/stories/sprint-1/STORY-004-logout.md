# STORY-004: User Logout

> **Status**: Ready for Development
> **Sprint**: 1
> **Epic**: 1 - Authentification
> **PRD Reference**: US-1.3
> **Points**: 2
> **Assignee**: Amelia
> **Depends on**: STORY-002, STORY-003 (AuthContext, Header)

---

## User Story

**En tant que** utilisateur connecté,
**Je veux** me déconnecter,
**Afin de** sécuriser mon compte.

---

## Acceptance Criteria

### AC-1: Logout Button Visibility
- [ ] Bouton "Déconnexion" visible dans le Header (desktop)
- [ ] Lien "Déconnexion" dans le menu hamburger (mobile)
- [ ] Visible uniquement si utilisateur connecté

### AC-2: Logout Action
- [ ] Click déclenche `supabase.auth.signOut()`
- [ ] Session détruite côté client
- [ ] Tokens supprimés du storage

### AC-3: Post-Logout Behavior
- [ ] Redirection vers la page d'accueil `/`
- [ ] Header affiche boutons "Se connecter" / "S'inscrire"
- [ ] Accès aux routes protégées bloqué

### AC-4: Confirmation (Optional UX)
- [ ] Pas de modal de confirmation (action immédiate)
- [ ] Feedback visuel bref si souhaité (toast optionnel)

### AC-5: Error Handling
- [ ] Erreur réseau: retry silencieux ou message discret
- [ ] Toujours nettoyer l'état local même en cas d'erreur

---

## Technical Tasks

### T1: Add logout to AuthContext
- [ ] Add `signOut()` method to useAuth hook
- [ ] Clear user state
- [ ] Call supabase.auth.signOut()
- [ ] Test: signOut clears user
- [ ] Test: signOut calls supabase

### T2: Update Header for authenticated state
- [ ] Show user name/email when logged in
- [ ] Show "Déconnexion" button when logged in
- [ ] Show "Se connecter" / "S'inscrire" when logged out
- [ ] Test: correct buttons based on auth state

### T3: Implement logout in Header
- [ ] Wire up logout button to signOut()
- [ ] Add loading state during logout
- [ ] Redirect to home after logout
- [ ] Test: clicking logout signs out user

### T4: Create ProtectedRoute component
- [ ] Create `src/components/auth/ProtectedRoute.tsx`
- [ ] Redirect to /login if not authenticated
- [ ] Show loading while checking auth
- [ ] Test: redirects unauthenticated users
- [ ] Test: allows authenticated users

### T5: Integration tests
- [ ] Test: logout clears session
- [ ] Test: redirect to home after logout
- [ ] Test: protected routes block after logout

---

## Design References

- **Wireframe**: `docs/ux-wireframes.md` Section 8.1, 8.2
- **Header states**: connecté vs visiteur

---

## Out of Scope

- Logout confirmation modal
- "Logout from all devices" feature
- Session timeout warnings

---

## Definition of Done

- [ ] All acceptance criteria met
- [ ] All tests passing
- [ ] Protected routes working
- [ ] Header updates correctly
- [ ] Code reviewed
- [ ] Deployed to preview

---

## Notes

Story simple mais critique pour la sécurité. S'assurer que tous les tokens sont bien nettoyés.
