# Retrospective Sprint 1

> **Date** : 6 fevrier 2026
> **Facilitateur** : Bob (Scrum Master)
> **Format** : Start / Stop / Continue + Metriques

---

## Metriques Sprint

| Metrique | Cible | Resultat | Delta |
|----------|-------|----------|-------|
| Points planifies | 20 | 20 | 0 |
| Points livres | 20 | 20 | 100% |
| Stories completees | 4/4 | 4/4 | 100% |
| Tests debut sprint | 0 | -- | -- |
| Tests fin sprint | -- | 212 | -- |
| Taux de passage | 100% | 100% | OK |
| Fichiers test | -- | 24 | -- |
| Duree test suite | < 10s | 2.99s | OK |

### Progression tests par story

```
STORY-001 (5 pts)  ████████████████████  93 tests   (+93)
STORY-002 (8 pts)  █████████████        65 tests   (+65)  = 158
STORY-003 (5 pts)  ████████             36 tests   (+36)  = 194
STORY-004 (2 pts)  ████                 18 tests   (+18)  = 212
```

### Ratio tests/point : 10.6 tests par story point

---

## What Went Well (Continue)

### 1. Velocite parfaite : 20/20
Sprint livre a 100%. Zero story spillover. L'equipe a tenu ses engagements.

### 2. Pyramide de tests saine
- Majorite de tests unitaires (composants, hooks, utils)
- Tests d'integration par page (HomePage, LoginPage, RegisterPage)
- Zero test E2E -- correct a ce stade, pas de parcours utilisateur assez long pour justifier
- Suite rapide : 2.99s. Zero flaky.

### 3. Reutilisation composants efficace
La strategie de composants partages a paye :

| Composant | Cree dans | Reutilise dans |
|-----------|-----------|----------------|
| Header/Footer | STORY-001 | Toutes les pages |
| Button, Input, Alert | STORY-002 | STORY-003, STORY-004 |
| AuthForm | STORY-002 | STORY-003 |
| AuthContext | STORY-002 | STORY-003, STORY-004 |
| ProtectedRoute | STORY-004 | Sprint 2+ |

STORY-002 (8 pts) a ete le bon investissement fondation. Les stories suivantes en ont beneficie.

### 4. Ordre d'execution optimal
La sequence 001 → 002 → 003 → 004 a minimise les blocages. Chaque story a construit sur la precedente sans refactoring.

---

## What Didn't Go Well (Stop)

### 1. Statuts des stories non mis a jour
- STORY-002 affiche encore `Status: Ready for Development` dans son header
- STORY-003 affiche encore `Status: Ready for Development`
- Les checkboxes AC ne sont pas cochees dans STORY-002 et STORY-003

**Impact** : Confusion sur l'etat reel. Quelqu'un qui lit les docs pense que seules STORY-001 et 004 sont faites.

**Action** : Mettre a jour les statuts et checkboxes de STORY-002 et STORY-003 a DONE avant de fermer le sprint.

### 2. Definition of Done incomplete au niveau story
Chaque story a 2 items DoD non coches :
- [ ] Code reviewed
- [ ] Deployed to preview

Et au niveau sprint :
- [ ] Demo reussie au Product Owner
- [ ] Deploye sur Vercel preview
- [ ] Documentation mise a jour
- [ ] Retrospective conduite ← en cours

**Impact** : Le sprint est techniquement livre mais pas formellement clos.

**Action** : Cocher ces items ou les declarer hors-scope pour le workflow actuel.

### 3. Gaps de tests identifies par Murat (non bloquants)
Audit STORY-004 a releve 3 cas non couverts :
1. Cas d'erreur `signOut()` -- navigate('/') ne devrait pas etre appele si echec
2. Etat `loading` du bouton Deconnexion -- `disabled={loading}` non teste
3. Fermeture menu mobile apres logout -- `setIsMobileMenuOpen(false)` non teste

**Impact** : Faible. Edge cases. Mais la dette s'accumule si on ne la traite pas.

**Action** : Creer un ticket tech-debt pour Sprint 2 (< 1 point).

---

## What to Start

### 1. Mettre a jour les statuts des stories a la livraison
Quand une story passe DONE, mettre a jour immediatement :
- Le champ `Status` dans le header du .md
- Cocher toutes les checkboxes AC validees
- Cocher les checkboxes DoD applicables

### 2. Commit atomique par story
Le git log montre :
```
ea84bff Sprint 1 termine
df76e38 feat(STORY-001): implement landing page with full test coverage
34132e6 fix(ci): trigger workflow on master branch
53a0d8f chore: initial project setup with testing infrastructure
```
STORY-002, 003, 004 semblent etre dans un seul commit ou non commites. L'ideal : 1 commit (ou branche) par story pour la tracabilite.

### 3. Deployer sur Vercel avant Sprint 2
Pas de preview = pas de demo PO = DoD incomplete. Priorite avant de lancer Sprint 2.

---

## Decisions Sprint 2

### Capacite
- Velocite constatee : **20 points**
- Velocite cible Sprint 2 : **20 points** (on garde la meme, 1 sprint de reference ne suffit pas pour ajuster)

### Priorite suivante (selon PRD)
Le prochain travail couvre :
1. **Epic 2** : Parcours d'apprentissage (US-2.1, US-2.2, US-2.3)
2. **Epic 3** : Editeur de code (US-3.1, US-3.2, US-3.3)
3. **Epic 4** : Dashboard (US-4.2)

**Recommandation Bob** : Sprint 2 devrait couvrir le **Dashboard** (entree du parcours) + **Epic 2** (voir le parcours + suivre une lecon). L'editeur (Epic 3) est le gros morceau -- il merite un sprint dedie ou partage.

---

## Actions a prendre avant Sprint 2

| # | Action | Responsable | Priorite |
|---|--------|-------------|----------|
| 1 | Commiter tout le travail en cours | Dev | Bloquant |
| 2 | Mettre a jour statuts STORY-002, 003 a DONE | Bob | Bloquant |
| 3 | Deployer sur Vercel preview | Dev | Haute |
| 4 | Ticket tech-debt tests (3 gaps Murat) | Bob | Moyenne |
| 5 | Sprint 2 planning | Bob + John | Prochaine etape |

---

## Resume

> **Sprint 1 : SUCCES.** 20/20 points, 212 tests, 0 bugs, 2.99s.
> Le processus fonctionne. Les fondations auth sont solides.
> Axes d'amelioration : discipline sur les statuts docs et commits atomiques.
> Next : commit, deploy, puis Sprint 2 planning.
