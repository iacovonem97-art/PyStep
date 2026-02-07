# Retrospective Sprint 2

> **Date** : 7 fevrier 2026
> **Facilitateur** : Bob (Scrum Master)
> **Format** : Start / Stop / Continue + Metriques

---

## Metriques Sprint

| Metrique | Cible | Resultat | Delta |
|----------|-------|----------|-------|
| Points planifies | 20 | 20 | 0 |
| Points livres | 20 | 20 | 100% |
| Stories completees | 4/4 | 4/4 | 100% |
| Tests debut sprint | 212 | -- | -- |
| Tests fin sprint | +100 | 356 (+144) | +44% au-dessus de l'objectif |
| Fichiers test | 24 | 43 (+19) | -- |
| Taux de passage | 100% | 100% | OK |
| Duree test suite | < 10s | 6.76s | OK |
| Fichiers modifies/crees | -- | 44 | -- |
| Lignes ajoutees | -- | +3258 | -- |

### Progression tests par story

```
STORY-005 (3 pts)  ██████████           ~30 tests   (+30)  = 242
STORY-006 (5 pts)  ██████████████       ~40 tests   (+40)  = 282
STORY-007 (8 pts)  ████████████████████ ~50 tests   (+50)  = 332
STORY-008 (4 pts)  ████████             ~24 tests   (+24)  = 356
```

### Ratio tests/point : 7.2 tests par story point (vs 10.6 Sprint 1)

> Ratio plus bas que Sprint 1. Normal : Sprint 2 est plus oriente UI/integration avec Monaco mocke. Moins de tests unitaires purs, plus de tests d'integration lourds.

---

## Velocite Cumulative

```
Sprint 1  ████████████████████  20 pts   212 tests
Sprint 2  ████████████████████  20 pts   356 tests
                                ───────
Cumul     40 pts livres         356 tests   0 bugs
```

Velocite moyenne : **20 points/sprint** (stable sur 2 sprints).

---

## What Went Well (Continue)

### 1. Velocite parfaite : 20/20 (2e sprint consecutif)
Deux sprints a 100% de delivery. L'equipe tient ses engagements. La velocity est stable et predictible.

### 2. Le coeur du produit est fonctionnel
Le Sprint 2 a livre l'experience complete d'apprentissage :
- Dashboard post-login → Carte du parcours → Lecon avec editeur → Validation + feedback
- C'est le flow principal du produit. Un utilisateur peut maintenant suivre une lecon de bout en bout.

### 3. Architecture de composants solide
Les composants sont bien decoupes et reutilisables :

| Composant | Cree dans | Reutilisable dans |
|-----------|-----------|-------------------|
| ProgressBar | STORY-005 | STORY-006, STORY-008, tout le parcours |
| ModuleCard | STORY-005 | Dashboard, potentiellement d'autres pages |
| ModuleAccordion | STORY-006 | CoursePage |
| CodeEditor | STORY-007 | Toutes les lecons futures |
| PreviewPanel | STORY-007 | Toutes les lecons futures |
| FeedbackPanel | STORY-008 | Toutes les lecons futures |
| HintModal | STORY-008 | Toutes les lecons futures |

### 4. Strategie Monaco reussie
Le risque principal du sprint (integration Monaco Editor) a ete bien gere :
- Lazy loading implemente
- Mock propre pour les tests
- Fallback textarea en error boundary
- Aucun test casse a cause de Monaco

### 5. Hooks custom bien structures
`useExercise` et `useProgress` encapsulent la logique metier proprement. Bonne separation UI/logique.

### 6. Module 1 : contenu complet
6 lecons avec theorie + exercices + tests + indices. Le contenu est pret pour les utilisateurs.

---

## What Didn't Go Well (Stop)

### 1. CRITIQUE : Pas de commit pour tout le Sprint 2
44 fichiers stages mais **aucun commit cree**. Tout le travail du sprint est dans le staging area.

**Impact** : Risque majeur de perte de travail. Un `git reset` accidentel = tout perdu. Zero tracabilite git.

**C'est une recidive du Sprint 1** ou l'action "commit atomique par story" avait ete identifiee mais pas appliquee.

**Action** : Commiter IMMEDIATEMENT. Adopter la regle : 1 commit par story MINIMUM, fait au moment ou la story est DONE.

### 2. Statuts des stories Sprint 2 non mis a jour
Les 4 stories affichent encore `Status: Ready for Development`. Aucune checkbox AC cochee.

**C'est aussi une recidive du Sprint 1.** L'action corrective n'a pas ete appliquee.

**Action** : Avant de clore le sprint, mettre a jour les 4 fichiers story.

### 3. Actions Sprint 1 non appliquees

| Action Sprint 1 | Appliquee ? |
|------------------|-------------|
| Commiter tout le travail en cours | NON - staging seulement |
| Mettre a jour statuts stories | NON - toujours "Ready" |
| Deployer sur Vercel preview | A VERIFIER |
| Ticket tech-debt tests | A VERIFIER |
| Commits atomiques par story | NON |

**Impact** : Les memes problemes reviennent. Le processus d'amelioration continue ne fonctionne pas si les actions ne sont pas executees.

### 4. Suite de tests plus lente
Passee de 2.99s a 6.76s (+126%). Encore dans les limites (< 10s) mais la tendance est a surveiller. Monaco mock et tests d'integration plus lourds en sont la cause.

### 5. Definition of Done toujours incomplete au niveau sprint
Memes items non coches qu'au Sprint 1 :
- [ ] Code reviewed
- [ ] Deploye sur Vercel preview
- [ ] Documentation mise a jour
- [ ] Retrospective conduite ← en cours maintenant

---

## What to Start

### 1. Commit immediatement apres chaque story DONE
Regle stricte : la story n'est pas DONE tant que le commit n'est pas fait.
Format : `feat(STORY-XXX): <description courte>`

### 2. Checklist de cloture de story
Avant de passer a la story suivante, verifier :
- [ ] Commit fait avec reference story
- [ ] Status mis a jour dans le .md
- [ ] Checkboxes AC cochees
- [ ] DoD cochee

### 3. CI/CD operationnelle
Mettre en place le deploy Vercel pour que la DoD "deploye" soit couverte automatiquement.

### 4. Surveiller la performance des tests
Mettre une alerte si la suite depasse 10s. Envisager du parallelisme si necessaire.

---

## Risques identifies pour Sprint 3

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Supabase DB (sauvegarde progression) | Complexite nouvelle | Spike technique en debut de sprint |
| Contenu lecons Modules 2-5 | Volume de contenu | Limiter a 1-2 modules par sprint |
| Performance test suite | Temps CI | Profiler et optimiser les tests les plus lents |
| Dette processus (commits, statuts) | Tracabilite | Appliquer la checklist de cloture |

---

## Decisions Sprint 3

### Capacite
- Velocite constatee : **20 points** (stable sur 2 sprints)
- Velocite cible Sprint 3 : **20 points**

### Priorite suivante (selon PRD)
1. **Sauvegarde progression** Supabase (US-2.3) -- fondation pour la persistence
2. **Contenu Module 2** (CSS) -- etendre le parcours
3. **Ameliorations UX** identifiees pendant le Sprint 2

---

## Resume

> **Sprint 2 : SUCCES TECHNIQUE.** 20/20 points, 356 tests, 0 bugs, 6.76s.
> Le flow complet d'apprentissage est fonctionnel (dashboard → parcours → lecon → validation).
> **ECHEC PROCESSUS.** Les memes problemes que Sprint 1 persistent : pas de commits, pas de mise a jour des statuts.
> **Action immediate** : commiter le travail, mettre a jour les statuts, puis Sprint 3 planning.
> Si les actions correctives ne sont pas appliquees au Sprint 3, il faudra revoir le workflow en profondeur.
