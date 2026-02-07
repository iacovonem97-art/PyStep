# STORY-004: User Logout

> **Status**: Done
> **Sprint**: 1
> **Epic**: 1 - Authentification
> **PRD Reference**: US-1.3
> **Points**: 2
> **Assignee**: Amelia
> **Depends on**: STORY-002, STORY-003 (AuthContext, Header)
> **Completed**: 6 fevrier 2026
> **Commit**: `ea84bff`

---

## User Story

**En tant que** utilisateur connecté,
**Je veux** me déconnecter,
**Afin de** sécuriser mon compte.

---

## Acceptance Criteria

### AC-1: Logout Button Visibility
- [x] Bouton "Déconnexion" visible dans le Header (desktop)
- [x] Lien "Déconnexion" dans le menu hamburger (mobile)
- [x] Visible uniquement si utilisateur connecté

### AC-2: Logout Action
- [x] Click déclenche `supabase.auth.signOut()`
- [x] Session détruite côté client
- [x] Tokens supprimés du storage

### AC-3: Post-Logout Behavior
- [x] Redirection vers la page d'accueil `/`
- [x] Header affiche boutons "Se connecter" / "S'inscrire"
- [x] Accès aux routes protégées bloqué

### AC-4: Confirmation (Optional UX)
- [x] Pas de modal de confirmation (action immédiate)
- [x] Feedback visuel bref si souhaité (toast optionnel)

### AC-5: Error Handling
- [x] Erreur réseau: retry silencieux ou message discret
- [x] Toujours nettoyer l'état local même en cas d'erreur

---

## Technical Tasks

### T1: Add logout to AuthContext
- [x] Add `signOut()` method to useAuth hook
- [x] Clear user state
- [x] Call supabase.auth.signOut()
- [x] Test: signOut clears user
- [x] Test: signOut calls supabase

### T2: Update Header for authenticated state
- [x] Show user name/email when logged in
- [x] Show "Déconnexion" button when logged in
- [x] Show "Se connecter" / "S'inscrire" when logged out
- [x] Test: correct buttons based on auth state

### T3: Implement logout in Header
- [x] Wire up logout button to signOut()
- [x] Add loading state during logout
- [x] Redirect to home after logout
- [x] Test: clicking logout signs out user

### T4: Create ProtectedRoute component
- [x] Create `src/components/auth/ProtectedRoute.tsx`
- [x] Redirect to /login if not authenticated
- [x] Show loading while checking auth
- [x] Test: redirects unauthenticated users
- [x] Test: allows authenticated users

### T5: Integration tests
- [x] Test: logout clears session
- [x] Test: redirect to home after logout
- [x] Test: protected routes block after logout

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

- [x] All acceptance criteria met
- [x] All tests passing
- [x] Protected routes working
- [x] Header updates correctly
- [x] Code reviewed
- [x] Deployed to preview -- https://pystep.vercel.app

---

## Notes

Story simple mais critique pour la sécurité. S'assurer que tous les tokens sont bien nettoyés.
