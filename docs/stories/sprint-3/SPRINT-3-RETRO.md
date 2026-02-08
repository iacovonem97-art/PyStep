# Retrospective Sprint 3

> **Date** : 8 fevrier 2026
> **Facilitateur** : Bob (Scrum Master)
> **Format** : Start / Stop / Continue + Metriques

---

## Metriques Sprint

| Metrique | Cible | Resultat | Delta |
|----------|-------|----------|-------|
| Points planifies | 20 | 20 | 0 |
| Points livres | 20 | 20 | 100% |
| Stories completees | 3/3 | 3/3 | 100% |
| Tests debut sprint | 356 | -- | -- |
| Tests fin sprint | ~441 (+85) | 429 (+73) | -14% sous objectif |
| Fichiers test | 43 | 45 (+2) | -- |
| Taux de passage | 100% | 100% | OK |
| Duree test suite | < 10s | 7.56s | OK (+12% vs Sprint 2) |
| Fichiers modifies/crees | -- | 19 | -- |
| Lignes ajoutees | -- | +2685 | -- |

### Progression tests par story

```
STORY-009 (8 pts)  ████████████████████ ~45 tests   (+45)  = 401
STORY-010 (5 pts)  ████████             ~12 tests   (+12)  = 413
STORY-011 (7 pts)  ████████████████     ~16 tests   (+16)  = 429
```

### Ratio tests/point : 3.65 tests par story point (vs 7.2 Sprint 2, 10.6 Sprint 1)

> Ratio en baisse. STORY-009 est une integration Supabase avec beaucoup de mocks. Les stories contenu (010, 011) ont principalement des tests de structure (module registry, navigation, regression validator). Ce ratio est attendu pour un sprint mixte integration + contenu.

---

## Velocite Cumulative

```
Sprint 1  ████████████████████  20 pts   212 tests
Sprint 2  ████████████████████  20 pts   356 tests
Sprint 3  ████████████████████  20 pts   429 tests
                                ───────
Cumul     60 pts livres         429 tests   0 bugs
```

Velocite moyenne : **20 points/sprint** (stable sur 3 sprints consecutifs).

---

## What Went Well (Continue)

### 1. Velocite parfaite : 20/20 (3e sprint consecutif)
Trois sprints a 100% de delivery. La velocite est stable, predictible et fiable. Zero variance.

### 2. AMELIORATION MAJEURE : Commits atomiques par story
**C'est la premiere fois que les commits sont faits correctement.**

| Commit | Story | Format |
|--------|-------|--------|
| `669040c` | STORY-009 | `feat(STORY-009): save progress to Supabase with local fallback` |
| `8cd9efe` | STORY-010 | `feat(STORY-010): add Module 2 HTML semantique content` |
| `37de70b` | STORY-011 | `feat(STORY-011): add Module 3 Introduction au CSS content` |

L'action corrective des Sprints 1 et 2 a enfin ete appliquee. La tracabilite git est maintenant propre.

### 3. Supabase integration reussie (plus gros risque du sprint)
STORY-009 etait la story la plus risquee (8 pts, nouvelle integration DB). Resultat :
- `progressService.ts` : CRUD complet avec gestion d'erreur
- `useProgress` refactorise : Supabase + fallback local transparent
- Dashboard, CoursePage et LessonPage integres
- Mode degrade (local) si Supabase down
- 45 tests couvrent le service + hook + integration

### 4. Contenu : 15/22 lecons livrées (68% du parcours MVP)
9 nouvelles lecons ajoutees en un sprint :
- Module 2 : 4 lecons HTML semantique (formulaires, tableaux, sections)
- Module 3 : 5 lecons CSS basics (couleurs, typographie, box model)
- Navigation cross-module fluide : 1.6 → 2.1 → ... → 2.4 → 3.1 → ... → 3.5

### 5. Architecture solide confirmee
Le pattern etabli en Sprint 2 (module data → registry → navigation) a permis d'ajouter 9 lecons sans modifier l'architecture. Le `getNextLessonId` enchaine les modules sans friction.

### 6. Suite de tests sous controle
7.56s pour 429 tests. L'augmentation de +12% est moderee et reste bien sous le seuil de 10s.

---

## What Didn't Go Well (Stop)

### 1. RECIDIVE : Statuts stories non mis a jour (3e sprint consecutif)
Les 3 stories affichaient encore `Status: Ready for Development` avec toutes les AC/DoD non cochees. Corrige en fin de sprint, mais c'est la **troisieme recidive**.

| Sprint | Action corrective prevue | Appliquee ? |
|--------|--------------------------|-------------|
| Sprint 1 | Mettre a jour les statuts | NON |
| Sprint 2 | Checklist de cloture | NON |
| Sprint 3 | Idem | NON (corrige en retro) |

**Constat** : Le rappel en retro ne suffit pas. Il faut un mecanisme automatique ou integre au workflow.

### 2. Fichiers orphelins dans le working tree
Un fichier `nul` (artefact Windows) trainait non-track, et `.gitignore` avait un doublon. Signe d'un working tree pas assez surveille.

### 3. Tests en dessous de l'objectif (-14%)
429 tests vs 441 cibles. La couverture de regression pour les exercices CSS (validator tests) etait partiellement non commitee (233 lignes dans le working tree). Maintenant corrige.

### 4. Stories Sprint 3 encore en local (pas pushees)
5 commits ahead of origin. Le code n'a pas ete pushe. Le deploy Vercel preview n'est donc pas a jour.

---

## What to Start

### 1. Automatiser la checklist de cloture de story
Puisque les rappels manuels echouent depuis 3 sprints, integrer un template ou un hook :
- Avant de committer : verifier que le .md a `Status: Done`
- Alternative : ajouter un script `close-story.sh` qui met a jour le statut + commit

### 2. Push systematique apres chaque commit
Regle : `git push` immediatement apres chaque commit story. Ne pas accumuler les commits locaux.

### 3. Mettre a jour MEMORY.md en fin de sprint
Les metriques et patterns evolue. La memoire projet doit refleter l'etat actuel (429 tests, 45 fichiers, 15 lecons).

### 4. Definir la strategie tests Module 4-5
Le ratio tests/point baisse. Pour le Sprint 4 (derniers modules), decider :
- Quel niveau de regression tests pour les exercices ?
- Faut-il des tests e2e plus complets ?

---

## Comparaison Sprint-over-Sprint

| Metrique | Sprint 1 | Sprint 2 | Sprint 3 | Tendance |
|----------|----------|----------|----------|----------|
| Points livres | 20/20 | 20/20 | 20/20 | Stable |
| Tests | 212 | 356 (+144) | 429 (+73) | Croissance stable |
| Test duration | 2.99s | 6.76s | 7.56s | +12% (OK) |
| Tests/point | 10.6 | 7.2 | 3.65 | En baisse |
| Commits atomiques | NON | NON | OUI | AMELIORE |
| Statuts mis a jour | NON | NON | NON (corrige) | A AUTOMATISER |
| Fichiers modifies | 33 | 44 | 19 | Scope plus cible |

---

## Risques identifies pour Sprint 4

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Volume contenu (7 lecons restantes) | Delai | Templates Module 2-3 comme reference |
| Performance test suite (projection ~500 tests) | >10s possible | Profiler, envisager parallelisme |
| CSS avance (Flexbox, Grid dans Module 4) | Validator limitations | Memes strategies que Module 3 |
| Pas de push depuis Sprint 3 | Deploy bloque | Push immediatement |
| Ratio tests/point en baisse | Couverture insuffisante | Definir seuil minimum de tests par lecon |

---

## Decisions Sprint 4

### Capacite
- Velocite constatee : **20 points** (stable sur 3 sprints)
- Velocite cible Sprint 4 : **15-20 points** (derniers modules + polish)

### Priorite suivante (selon PRD)
1. **Contenu Module 4** (CSS intermediaire : Flexbox, Grid, Media queries)
2. **Contenu Module 5** (Mini-projets integratifs)
3. **SEO / Meta** (preparation lancement)
4. **Polish UX** (animations, transitions, micro-interactions)

### Objectif Sprint 4
**Lancement MVP** : 22/22 lecons, deploy production, site accessible publiquement.

---

## Resume

> **Sprint 3 : SUCCES COMPLET.** 20/20 points, 429 tests, 0 bugs, 7.56s.
> Pystep est passe d'un prototype local a un produit persistant (Supabase).
> 15/22 lecons livrées (68% du parcours). Navigation fluide sur 3 modules.
>
> **AMELIORATION PROCESSUS** : Commits atomiques enfin appliques (action de Sprint 1 finalement realisee au Sprint 3).
>
> **POINT D'ATTENTION** : Les statuts des stories restent le dernier point de processus non resolve. A automatiser pour Sprint 4.
>
> **Prochain objectif** : Sprint 4 = MVP complet (22/22 lecons + deploy production).
