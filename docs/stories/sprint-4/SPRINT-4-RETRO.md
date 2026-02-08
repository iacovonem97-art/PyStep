# Retrospective Sprint 4

> **Date** : 8 fevrier 2026
> **Facilitateur** : Bob (Scrum Master)
> **Format** : Start / Stop / Continue + Metriques
> **Sprint Goal** : Lancement MVP production-ready (22/22 lecons + SEO + E2E)

---

## Metriques Sprint

| Metrique | Cible | Resultat | Delta |
|----------|-------|----------|-------|
| Points planifies | 20 | 20 | 0 |
| Points livres | 20 | 20 | 100% |
| Stories completees | 4/4 | 4/4 | 100% |
| Tests debut sprint | 429 | -- | -- |
| Tests fin sprint | ~489 (+60) | 487 (+58) | -3% sous objectif |
| Fichiers test | 46 unit + 4 E2E | 46 unit + 4 E2E | OK |
| Taux de passage | 100% | 100% | OK |
| Duree test suite (unit) | < 10s | 15.51s | +105% vs Sprint 3 |
| Fichiers modifies/crees | -- | 25 | -- |
| Lignes ajoutees | -- | +1859 / -322 | -- |

### Progression tests par story

```
STORY-012 (8 pts)  ████████████████████ ~25 tests (modules + validator)
STORY-013 (5 pts)  ████████████         ~10 tests (modules + validator)
STORY-014 (3 pts)  ██████               ~6 tests  (NotFoundPage)
STORY-015 (4 pts)  ████████████████████ 11 E2E tests (smoke tests)
                                        + bug fix AuthProvider
```

### Ratio tests/point : 2.9 tests par story point (vs 3.65 Sprint 3, 7.2 Sprint 2)

> Ratio en baisse continue mais attendu : les stories contenu (012, 013) generent principalement des tests de structure/regression, pas des tests unitaires fins. L'ajout de 11 E2E tests compense qualitativement la baisse quantitative du ratio.

---

## Velocite Cumulative

```
Sprint 1  ████████████████████  20 pts   212 tests
Sprint 2  ████████████████████  20 pts   356 tests
Sprint 3  ████████████████████  20 pts   429 tests
Sprint 4  ████████████████████  20 pts   487 tests (476 unit + 11 E2E)
                                ───────
Cumul     80 pts livres         487 tests   0 bugs
```

Velocite moyenne : **20 points/sprint** (stable sur 4 sprints consecutifs). Zero variance.

---

## What Went Well (Continue)

### 1. MVP COMPLET : 22/22 lecons livrees
C'est le milestone majeur du projet. Pystep a maintenant un parcours complet de "zero" a "portfolio" :
- Module 1 : Bases HTML (6 lecons)
- Module 2 : HTML Semantique (4 lecons)
- Module 3 : Introduction CSS (5 lecons)
- Module 4 : Mise en page CSS (5 lecons)
- Module 5 : Projet Final (2 lecons)

Navigation fluide de la lecon 1.1 jusqu'a la 5.2.

### 2. Velocite parfaite : 20/20 (4e sprint consecutif)
80 points livres sur 80 planifies en 4 sprints. Zero ecart. La capacite de l'equipe est parfaitement calibree.

### 3. Commits atomiques maintenus (2e sprint consecutif)

| Commit | Story | Format |
|--------|-------|--------|
| `51ec946` | STORY-012 | `feat(STORY-012): add Module 4 Mise en page CSS content (5 lessons)` |
| `eaab6f6` | STORY-013 | `feat(STORY-013): add Module 5 Projet Final content (2 lessons)` |
| `77a4c49` | STORY-014 | `feat(STORY-014): add SEO meta tags and analytics` |
| `60d9a33` | STORY-015 | `feat(STORY-015): setup Playwright E2E and smoke tests` |
| `257d9f0` | Docs | `docs(sprint-4): update backlog with Sprint 4 completion status` |

Pattern installe. C'est desormais un acquis.

### 4. AMELIORATION : Statuts stories mis a jour
Les 4 stories sont a `Status: Done` avec les AC/DoD cochees dans les fichiers .md. C'est la **premiere fois en 4 sprints** que les statuts sont a jour sans intervention post-retro.

L'action corrective des Sprints 1, 2 et 3 est **enfin appliquee**.

### 5. E2E testing : nouvelle couche qualite
Playwright E2E ajoute une couche de confiance significative :
- 11 smoke tests couvrant : home, auth, 404, routes protegees
- Bug reel decouvert : `AuthProvider` manquant dans `App.tsx` (corrige immediatement)
- Infrastructure E2E prete pour les futurs sprints

### 6. SEO production-ready
- Meta tags OG + Twitter Card
- robots.txt + sitemap.xml
- Plausible Analytics (CDN, adblocker-friendly)
- Page 404 dediee
- Structured data-ready

---

## What Didn't Go Well (Stop)

### 1. ALERTE : Duree test suite en forte hausse (+105%)
| Sprint | Duree | Delta |
|--------|-------|-------|
| Sprint 1 | 2.99s | -- |
| Sprint 2 | 6.76s | +126% |
| Sprint 3 | 7.56s | +12% |
| Sprint 4 | 15.51s | **+105%** |

Le seuil de 10s est depasse. La suite de tests a double en duree. Avec la projection de croissance, cela va devenir un frein au workflow de developpement.

**Causes probables** :
- 476 tests avec jsdom environment setup (155.61s cumule environment setup)
- 341 tests validator ajoutes (parsing DOM lourd)
- Pas de parallelisme configure dans Vitest

### 2. RECIDIVE : Commits non pushes (2e sprint consecutif)
12 commits ahead of origin. Le code n'a **toujours pas ete pushe** malgre l'engagement pris en retro Sprint 3.

| Sprint | Action corrective prevue | Appliquee ? |
|--------|--------------------------|-------------|
| Sprint 3 | Push apres chaque commit | NON |
| Sprint 4 | Idem | **NON (recidive)** |

**Risque** : Vercel preview n'est pas a jour. Pas de backup distant du code.

### 3. Items backlog non completes
Deux items "Must Have" restent non coches dans le backlog :
- [ ] Responsive desktop + mobile
- [ ] Deploy production sur Vercel

Et deux "Should Have" :
- [ ] Lighthouse Performance score > 90
- [ ] Lighthouse SEO score > 90

Le sprint a atteint l'objectif de contenu mais pas l'objectif de lancement production.

### 4. Ratio tests/point continue de baisser

```
Sprint 1  ██████████████████████ 10.6 tests/pt
Sprint 2  ██████████████████     7.2  tests/pt
Sprint 3  █████████              3.65 tests/pt
Sprint 4  ███████                2.9  tests/pt
```

Tendance preoccupante si on ajoute du contenu futur (Module 6+).

---

## What to Start

### 1. Optimiser la duree de la test suite
15.51s est inacceptable pour un workflow TDD rapide. Actions :
- Configurer `vitest --pool=threads` ou `--pool=forks` pour paralleliser
- Investiguer le temps `environment` (155.61s cumule) : possiblement trop de re-creations jsdom
- Envisager de separer les tests lourds (validator 341 tests) dans un workspace dedie

### 2. Pusher les commits MAINTENANT
12 commits en local = risque de perte. Premiere action post-retro : `git push`.

### 3. Valider le responsive et deployer
Deux items MVP bloquants restent :
- Test responsive sur les breakpoints cles (mobile 375px, tablet 768px, desktop 1280px)
- Deploy production Vercel + verification

### 4. Definir la roadmap post-MVP
Le MVP est techniquement complet (22/22 lecons). Prochaines decisions :
- Module 6 (JavaScript) : quand ?
- Gamification (badges, streaks) : priorite ?
- Certificat de completion : priorite ?
- Growth (SEO content, social) : priorite ?

---

## Comparaison Sprint-over-Sprint

| Metrique | Sprint 1 | Sprint 2 | Sprint 3 | Sprint 4 | Tendance |
|----------|----------|----------|----------|----------|----------|
| Points livres | 20/20 | 20/20 | 20/20 | 20/20 | Stable |
| Tests | 212 | 356 (+144) | 429 (+73) | 487 (+58) | Croissance stable |
| Test duration | 2.99s | 6.76s | 7.56s | **15.51s** | ALERTE |
| Tests/point | 10.6 | 7.2 | 3.65 | 2.9 | En baisse |
| Commits atomiques | NON | NON | OUI | OUI | ACQUIS |
| Statuts mis a jour | NON | NON | NON | **OUI** | ACQUIS |
| Push apres commit | -- | NON | NON | NON | A RESOUDRE |
| Fichiers modifies | 33 | 44 | 19 | 25 | Stable |
| Lecons cumul | 0 | 6 | 15 | **22 (MVP)** | COMPLET |

---

## Bilan du Projet MVP (Sprints 1-4)

### Delivery

| Element | Resultat |
|---------|----------|
| Sprints livres | 4/4 (100%) |
| Points livres | 80/80 (100%) |
| Stories completees | 15/15 (100%) |
| Lecons livrees | 22/22 (100%) |
| Tests totaux | 487 (476 unit + 11 E2E) |
| Bugs en production | 0 |
| Velocite variance | 0% (20 pts chaque sprint) |

### Architecture

| Composant | Status |
|-----------|--------|
| Auth (Supabase) | Done |
| Landing Page | Done |
| Code Editor (Monaco) | Done |
| Exercise Validator | Done |
| Progress Persistence | Done |
| Cross-module Navigation | Done |
| SEO + Analytics | Done |
| E2E Testing | Done |
| 404 Page | Done |

### Ce qui reste pour le lancement

| Item | Priorite | Effort estime |
|------|----------|---------------|
| Responsive testing + fixes | P0 | 3-5 pts |
| Deploy production Vercel | P0 | 1 pt |
| Lighthouse audit + fixes | P1 | 2-3 pts |
| Push all commits to remote | P0 | 0 pt (immediat) |

---

## Resume

> **Sprint 4 : SUCCES.** 20/20 points, 487 tests, 0 bugs, 22/22 lecons.
> Le MVP de Pystep est **fonctionnellement complet**. Le parcours de "zero a portfolio" est jouable de bout en bout.
>
> **AMELIORATIONS PROCESSUS** :
> - Commits atomiques : acquis (2e sprint consecutif)
> - Statuts stories a jour : **ENFIN RESOLU** apres 3 sprints de recidive
>
> **ALERTES** :
> - Test suite a 15.51s (+105%) : optimisation necessaire
> - 12 commits non pushes : risque persistant
> - Responsive + deploy restent a faire pour le lancement effectif
>
> **VERDICT GLOBAL MVP** : 80/80 points livres en 4 sprints, 487 tests, 0 bugs, 22 lecons. L'execution est excellente. Le produit est pret fonctionnellement. Il reste le "last mile" operationnel (responsive, deploy, push).
