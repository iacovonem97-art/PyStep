# STORY-015: Setup Playwright E2E + Smoke tests

> **Status** : Pending
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
- [ ] `@playwright/test` installe en devDependency
- [ ] `playwright.config.ts` configure (baseURL, Chromium uniquement pour MVP)
- [ ] Scripts npm : `test:e2e` pour lancer les tests E2E
- [ ] `.gitignore` mis a jour (ignorer `test-results/`, `playwright-report/`)
- [ ] Playwright fonctionne sur Windows (environnement de dev actuel)

### AC-2: Smoke test - Page d'accueil
- [ ] Test: la page d'accueil se charge sans erreur
- [ ] Test: le titre principal est visible
- [ ] Test: le CTA "S'inscrire" est cliquable
- [ ] Test: navigation vers /login fonctionne

### AC-3: Smoke test - Authentification
- [ ] Test: la page /login se charge
- [ ] Test: les champs email et mot de passe sont visibles
- [ ] Test: le formulaire affiche une erreur avec des identifiants invalides
- [ ] Note : pas de test de login reel (necesserait un user de test Supabase)

### AC-4: Smoke test - Parcours lecon (sans auth)
- [ ] Test: la page /course se charge (si accessible sans auth)
- [ ] Test: les modules sont affiches
- [ ] OU Test: redirection vers /login si non authentifie (comportement attendu)

### AC-5: Smoke test - Page 404
- [ ] Test: une URL invalide affiche la page 404
- [ ] Test: le lien "retour accueil" fonctionne

### AC-6: Documentation
- [ ] README ou doc mis a jour avec les instructions pour lancer les tests E2E
- [ ] Commande `npm run test:e2e` documentee

---

## Technical Tasks

### T1: Installer et configurer Playwright
- [ ] `npm install -D @playwright/test`
- [ ] `npx playwright install chromium` (uniquement Chromium pour le MVP)
- [ ] Creer `playwright.config.ts` avec :
  - baseURL: `http://localhost:5173`
  - projects: Chromium uniquement
  - webServer: `npm run dev` (auto-start du serveur de dev)
  - testDir: `e2e/`
  - retries: 1
- [ ] Ajouter scripts dans `package.json` : `"test:e2e": "playwright test"`
- [ ] Ajouter dans `.gitignore` : `test-results/`, `playwright-report/`, `blob-report/`

### T2: Smoke tests - Pages publiques
- [ ] Creer `e2e/home.spec.ts`
  - [ ] Test: page d'accueil charge et affiche le titre
  - [ ] Test: CTA visible et cliquable
  - [ ] Test: navigation header fonctionne
- [ ] Creer `e2e/auth.spec.ts`
  - [ ] Test: page /login charge
  - [ ] Test: formulaire present (email, password, submit)
  - [ ] Test: page /register charge
- [ ] Creer `e2e/not-found.spec.ts`
  - [ ] Test: URL invalide → page 404
  - [ ] Test: lien retour accueil fonctionne

### T3: Smoke tests - Routes protegees
- [ ] Creer `e2e/protected.spec.ts`
  - [ ] Test: /dashboard redirige vers /login si non connecte
  - [ ] Test: /course redirige vers /login si non connecte
  - [ ] Test: /lesson/1.1 redirige vers /login si non connecte

### T4: Verification et documentation
- [ ] Lancer `npm run test:e2e` et verifier que tout passe
- [ ] Verifier que `npm run test` (Vitest) fonctionne toujours independamment
- [ ] Documenter les commandes E2E
- [ ] Verifier pas de conflit entre Vitest et Playwright configs

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

- [ ] Playwright installe et configure
- [ ] Smoke tests pages publiques passing
- [ ] Smoke tests routes protegees passing
- [ ] `npm run test:e2e` fonctionne
- [ ] `npm run test` (Vitest) non impacte
- [ ] Documentation mise a jour
- [ ] All tests passing (objectif : +10 tests E2E)
- [ ] Code reviewed
- [ ] Status mis a jour dans ce fichier
- [ ] Commit : `feat(STORY-015): setup Playwright E2E and smoke tests`
