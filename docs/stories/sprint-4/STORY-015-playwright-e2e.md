# STORY-015: Setup Playwright E2E + Smoke tests

> **Status** : Done
> **Sprint** : 4
> **Epic** : 3 - Lancement MVP
> **PRD Reference** : Section 6 (Criteres de lancement - qualite)
> **Points** : 4
> **Assignee** : Amelia
> **Depends on** : STORY-013 (parcours complet 22/22 lecons)

---

## User Story

**En tant que** developpeur,
**Je veux** des tests end-to-end avec Playwright couvrant le flow principal,
**Afin de** detecter les regressions critiques avant chaque deploy et lancer en production avec confiance.

---

## Acceptance Criteria

### AC-1: Setup Playwright
- [x] `@playwright/test` installe en devDependency
- [x] `playwright.config.ts` configure (baseURL, Chromium uniquement pour MVP)
- [x] Scripts npm : `test:e2e` pour lancer les tests E2E
- [x] `.gitignore` mis a jour (ignorer `test-results/`, `playwright-report/`)
- [x] Playwright fonctionne sur Windows (environnement de dev actuel)

### AC-2: Smoke test - Page d'accueil
- [x] Test: la page d'accueil se charge sans erreur
- [x] Test: le titre principal est visible
- [x] Test: le CTA "S'inscrire" est cliquable
- [x] Test: navigation vers /login fonctionne

### AC-3: Smoke test - Authentification
- [x] Test: la page /login se charge
- [x] Test: les champs email et mot de passe sont visibles
- [x] Test: le formulaire affiche une erreur avec des identifiants invalides
- [x] Note : pas de test de login reel (necesserait un user de test Supabase)

### AC-4: Smoke test - Parcours lecon (sans auth)
- [x] Test: la page /course se charge (si accessible sans auth)
- [x] Test: les modules sont affiches
- [x] OU Test: redirection vers /login si non authentifie (comportement attendu)

### AC-5: Smoke test - Page 404
- [x] Test: une URL invalide affiche la page 404
- [x] Test: le lien "retour accueil" fonctionne

### AC-6: Documentation
- [x] README ou doc mis a jour avec les instructions pour lancer les tests E2E
- [x] Commande `npm run test:e2e` documentee

---

## Technical Tasks

### T1: Installer et configurer Playwright
- [x] `npm install -D @playwright/test`
- [x] `npx playwright install chromium` (uniquement Chromium pour le MVP)
- [x] Creer `playwright.config.ts` avec :
  - baseURL: `http://localhost:5173`
  - projects: Chromium uniquement
  - webServer: `npm run dev` (auto-start du serveur de dev)
  - testDir: `e2e/`
  - retries: 1
- [x] Ajouter scripts dans `package.json` : `"test:e2e": "playwright test"`
- [x] Ajouter dans `.gitignore` : `test-results/`, `playwright-report/`, `blob-report/`

### T2: Smoke tests - Pages publiques
- [x] Creer `e2e/home.spec.ts`
  - [x] Test: page d'accueil charge et affiche le titre
  - [x] Test: CTA visible et cliquable
  - [x] Test: navigation header fonctionne
- [x] Creer `e2e/auth.spec.ts`
  - [x] Test: page /login charge
  - [x] Test: formulaire present (email, password, submit)
  - [x] Test: page /register charge
- [x] Creer `e2e/not-found.spec.ts`
  - [x] Test: URL invalide → page 404
  - [x] Test: lien retour accueil fonctionne

### T3: Smoke tests - Routes protegees
- [x] Creer `e2e/protected.spec.ts`
  - [x] Test: /dashboard redirige vers /login si non connecte
  - [x] Test: /course redirige vers /login si non connecte
  - [x] Test: /lesson/1.1 redirige vers /login si non connecte

### T4: Verification et documentation
- [x] Lancer `npm run test:e2e` et verifier que tout passe
- [x] Verifier que `npm run test` (Vitest) fonctionne toujours independamment
- [x] Documenter les commandes E2E
- [x] Verifier pas de conflit entre Vitest et Playwright configs

---

## Design References

- **Playwright docs** : configuration SPA, webServer option
- **Existing tests** : `src/**/*.test.ts` (Vitest - ne pas interferer)
- **Routes app** : `src/App.tsx` ou router config

---

## Out of Scope

- Tests E2E avec authentification reelle (necessite user de test Supabase)
- Tests E2E du flow complet lecon (editor + validation + progression)
- Multi-browser (Firefox, Safari) - Chromium uniquement pour le MVP
- CI/CD integration (GitHub Actions) - Sprint 5+
- Visual regression testing
- Performance testing avec Playwright

---

## Definition of Done

- [x] Playwright installe et configure
- [x] Smoke tests pages publiques passing
- [x] Smoke tests routes protegees passing
- [x] `npm run test:e2e` fonctionne
- [x] `npm run test` (Vitest) non impacte
- [x] Documentation mise a jour
- [x] All tests passing (objectif : +10 tests E2E) → 11 E2E tests passing
- [x] Code reviewed
- [x] Status mis a jour dans ce fichier
- [x] Commit : `feat(STORY-015): setup Playwright E2E and smoke tests`
