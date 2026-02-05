# Sprint 1 Backlog

> **Sprint Goal**: Livrer une landing page publique avec système d'authentification complet
> **Duration**: 2 semaines
> **Velocity Target**: 20 points

---

## Sprint Overview

| Story | Title | Points | Priority | Dependencies |
|-------|-------|--------|----------|--------------|
| STORY-001 | Landing Page | 5 | P0 | - |
| STORY-002 | User Registration | 8 | P0 | STORY-001 |
| STORY-003 | User Login | 5 | P0 | STORY-002 |
| STORY-004 | User Logout | 2 | P0 | STORY-002, STORY-003 |

**Total Points**: 20

---

## Execution Order

```
STORY-001 (Landing Page)
    │
    ▼
STORY-002 (Registration) ──────┐
    │                          │
    ▼                          │
STORY-003 (Login) ─────────────┤
    │                          │
    ▼                          │
STORY-004 (Logout) ◄───────────┘
```

### Rationale

1. **STORY-001** first: Creates Header/Footer components reused everywhere
2. **STORY-002** second: Sets up Supabase, AuthContext, UI components
3. **STORY-003** third: Reuses components from registration
4. **STORY-004** last: Simple, depends on all auth infrastructure

---

## Shared Components Created

| Component | Created in | Reused in |
|-----------|------------|-----------|
| Header | STORY-001 | All pages |
| Footer | STORY-001 | All pages |
| Button | STORY-002 | All stories |
| Input | STORY-002 | STORY-003 |
| Alert | STORY-002 | STORY-003 |
| AuthForm | STORY-002 | STORY-003 |
| AuthContext | STORY-002 | STORY-003, STORY-004 |
| ProtectedRoute | STORY-004 | Sprint 2+ |

---

## Technical Setup Required

Before starting Sprint 1:

- [x] Vite + React + TypeScript ✅
- [x] Tailwind CSS ✅
- [x] Vitest + Testing Library ✅
- [x] ESLint 9 ✅
- [x] GitHub Actions CI ✅
- [ ] React Router configured
- [ ] Supabase project created
- [ ] Environment variables setup

---

## Acceptance Criteria Summary

### Must Have (Bloquant pour validation sprint)

- [ ] Landing page complète et responsive
- [ ] Inscription fonctionnelle avec Supabase
- [ ] Connexion fonctionnelle avec Supabase
- [ ] Déconnexion fonctionnelle
- [ ] Routes protégées pour dashboard
- [ ] 100% tests passing
- [ ] Aucune erreur console critique

### Should Have

- [ ] Animations de transition basiques
- [ ] Loading states polish
- [ ] Error messages UX-friendly

---

## Definition of Done (Sprint Level)

- [ ] Toutes les stories à "Done"
- [ ] Démo réussie au Product Owner
- [ ] Déployé sur Vercel preview
- [ ] Documentation mise à jour
- [ ] Retrospective conduite

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Supabase setup delays | High | Setup project before sprint starts |
| Auth edge cases | Medium | Focus on happy path first, edge cases later |
| Responsive complexity | Medium | Mobile-first approach |

---

## Notes

Sprint 1 pose les fondations. La qualité du code et des tests est prioritaire sur la quantité de features. Pas de dette technique.
