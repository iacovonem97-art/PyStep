# STORY-010: Contenu Module 2 - HTML semantique

> **Status** : Done
> **Sprint** : 3
> **Epic** : 2 - Parcours d'apprentissage
> **PRD Reference** : Section 3 (Parcours pedagogique), US-2.2
> **Points** : 5
> **Assignee** : Amelia
> **Depends on** : STORY-006 (lesson data structure, Module 1 comme reference)

---

## User Story

**En tant que** apprenant ayant termine le Module 1,
**Je veux** suivre le Module 2 sur le HTML semantique,
**Afin de** structurer mes pages web avec les bonnes balises et creer un formulaire de contact.

---

## Acceptance Criteria

### AC-1: 4 lecons completes avec theorie + exercice + tests
- [x] Lecon 2.1 : Balises semantiques (`<header>`, `<nav>`, `<main>`, `<footer>`)
- [x] Lecon 2.2 : Sections et articles (`<section>`, `<article>`, `<aside>`)
- [x] Lecon 2.3 : Formulaires basiques (`<form>`, `<input>`, `<button>`)
- [x] Lecon 2.4 : Tableaux (`<table>`, `<tr>`, `<td>`, `<th>`) - Mini-projet : page de contact

### AC-2: Format identique au Module 1
- [x] Chaque lecon suit le type `Lesson` (`id`, `title`, `module`, `order`, `theory`, `exercise`)
- [x] Theory : `content` (Markdown) + `examples` (CodeExample[])
- [x] Exercise : `instructions` + `starterCode` + `hints` (3 niveaux) + `tests` (ExerciseTest[])
- [x] Contenu en francais, ton pedagogique et encourageant

### AC-3: Contenu pedagogique de qualite
- [x] Theorie progressive : chaque lecon s'appuie sur les precedentes
- [x] Exemples de code pertinents et fonctionnels
- [x] Instructions d'exercice claires et sans ambiguite
- [x] Hints progressifs : indice → structure → solution
- [x] Difficulte coherente avec "Debutant+" (cf. PRD)

### AC-4: Tests de validation fonctionnels
- [x] Chaque exercice a 2 a 5 tests DOM (ExerciseTest)
- [x] Types d'assert utilises : `exists`, `hasText`, `hasAttribute`, `count`, `textContains`
- [x] Les tests sont verifiables avec le validator existant (`src/features/lessons/validator.ts`)
- [x] Les tests passent avec la solution correcte (verifiable manuellement)

### AC-5: Integration dans l'application
- [x] Fichier `src/data/lessons/module-2.ts` cree et exporte `module2Lessons`
- [x] `src/data/modules.ts` mis a jour : import module2Lessons, remplace `lessons: []`
- [x] Module 2 accessible depuis la Course Map apres completion du Module 1
- [x] Navigation "Lecon suivante" fonctionne de 2.1 → 2.2 → 2.3 → 2.4
- [x] Apres 2.4, le Module 3 se debloque (si Module 3 a du contenu)

### AC-6: Responsive et lisibilite
- [x] Theorie lisible sur mobile (pas de code tronque)
- [x] Exemples de code dans des blocs formattes
- [x] starterCode fonctionne dans l'editeur Monaco existant

---

## Lesson Content Guide

### 2.1 Balises semantiques

**Theory** :
- Pourquoi le semantique ? (accessibilite, SEO, lisibilite du code)
- `<header>` : en-tete de page ou de section
- `<nav>` : navigation principale
- `<main>` : contenu principal (unique par page)
- `<footer>` : pied de page
- Comparaison avant/apres : `<div>` vs balises semantiques

**Examples** :
```html
<header>
  <h1>Mon site</h1>
  <nav>
    <a href="#accueil">Accueil</a>
    <a href="#contact">Contact</a>
  </nav>
</header>
<main>
  <p>Bienvenue sur mon site !</p>
</main>
<footer>
  <p>© 2026 Mon site</p>
</footer>
```

**Exercise** : Creer une page avec `<header>` (contenant un `<h1>` et un `<nav>`), `<main>` et `<footer>`

**Tests** :
- `header` exists
- `nav` exists
- `main` exists
- `footer` exists
- `header h1` exists (titre dans le header)

### 2.2 Sections et articles

**Theory** :
- `<section>` : regroupe du contenu thematique
- `<article>` : contenu autonome (article de blog, commentaire)
- `<aside>` : contenu secondaire (sidebar, note)
- Quand utiliser quoi : decision tree simple

**Examples** :
```html
<main>
  <section>
    <h2>Mes articles</h2>
    <article>
      <h3>Premier article</h3>
      <p>Contenu de l'article...</p>
    </article>
  </section>
  <aside>
    <p>A propos de l'auteur</p>
  </aside>
</main>
```

**Exercise** : Creer une page avec un `<main>` contenant une `<section>` avec un `<article>`, et un `<aside>`

**Tests** :
- `section` exists
- `article` exists
- `aside` exists
- `article h3` exists (titre dans l'article)

### 2.3 Formulaires basiques

**Theory** :
- `<form>` : conteneur de formulaire
- `<input>` : champs de saisie (type text, email, password)
- `<label>` : etiquette associee a un champ (accessibilite)
- `<button>` : bouton de soumission
- Attribut `for` / `id` pour lier label et input
- Attribut `placeholder` et `required`

**Examples** :
```html
<form>
  <label for="email">Email :</label>
  <input type="email" id="email" placeholder="ton@email.com" required>
  <button type="submit">Envoyer</button>
</form>
```

**Exercise** : Creer un formulaire avec un champ nom (input text + label), un champ email (input email + label) et un bouton "Envoyer"

**Tests** :
- `form` exists
- `input[type="text"]` exists
- `input[type="email"]` exists
- `button` exists
- `label` count >= 2

### 2.4 Les tableaux (Mini-projet : page de contact)

**Theory** :
- `<table>` : conteneur de tableau
- `<tr>` : ligne de tableau
- `<th>` : cellule d'en-tete
- `<td>` : cellule de donnees
- `<thead>` et `<tbody>` pour structurer

**Examples** :
```html
<table>
  <thead>
    <tr>
      <th>Nom</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>alice@email.com</td>
    </tr>
  </tbody>
</table>
```

**Exercise** (Mini-projet) : Creer une page de contact complete avec :
1. Un `<header>` avec titre et `<nav>`
2. Un `<main>` avec un formulaire de contact (nom + email + message)
3. Un tableau des horaires d'ouverture (3 lignes minimum)
4. Un `<footer>`

**Tests** :
- `header` exists
- `form` exists
- `table` exists
- `th` count >= 2
- `tr` count >= 3 (header + 2 data rows minimum)
- `footer` exists

---

## Technical Tasks

### T1: Creer module-2.ts
- [x] Creer `src/data/lessons/module-2.ts`
- [x] Export `module2Lessons: Lesson[]` avec 4 lecons
- [x] Chaque lecon respecte les interfaces Lesson, LessonTheory, LessonExercise
- [x] Contenu pedagogique complet (theorie detaillee, pas juste des bullet points)
- [x] starterCode adapte a chaque exercice (commentaires guides)

### T2: Mettre a jour modules.ts
- [x] Import `module2Lessons` depuis `./lessons/module-2`
- [x] Remplacer `{ ...MODULES_META[1], lessons: [] }` par `{ ...MODULES_META[1], lessons: module2Lessons }`
- [x] Verifier que `getLessonById`, `getNextLessonId`, `getFirstLessonId` fonctionnent avec Module 2

### T3: Tests unitaires du contenu
- [x] Test: module2Lessons contient exactement 4 lecons
- [x] Test: chaque lecon a un id format "2.X"
- [x] Test: chaque lecon a theory.content non vide
- [x] Test: chaque lecon a au moins 1 example
- [x] Test: chaque lecon a exercise.instructions non vide
- [x] Test: chaque lecon a exercise.starterCode defini
- [x] Test: chaque lecon a exactement 3 hints
- [x] Test: chaque lecon a au moins 2 tests de validation
- [x] Test: tous les tests utilisent des assert valides (exists, hasText, hasAttribute, count, textContains)

### T4: Tests d'integration
- [x] Test: Module 2 apparait dans la Course Map
- [x] Test: Module 2 verrouille si Module 1 non complete
- [x] Test: Module 2 debloque si Module 1 complete
- [x] Test: navigation 2.1 → 2.2 → 2.3 → 2.4 fonctionne
- [x] Test: getLessonById('2.1') retourne la bonne lecon
- [x] Test: getNextLessonId('1.6') retourne '2.1'
- [x] Test: getNextLessonId('2.4') retourne '3.1' (ou null si Module 3 vide)

### T5: Validation manuelle
- [x] Ouvrir chaque lecon dans le navigateur
- [x] Verifier que la theorie s'affiche correctement
- [x] Verifier que le starterCode apparait dans l'editeur
- [x] Verifier que la solution correcte passe tous les tests
- [x] Verifier les hints progressifs

---

## Design References

- **PRD Curriculum** : `docs/prd-mvp.md` Section 3 (Module 2 : HTML semantique)
- **Format de reference** : `src/data/lessons/module-1.ts` (copier la structure exacte)
- **Types** : `src/types/lesson.ts` (Lesson, LessonTheory, LessonExercise, ExerciseTest)
- **Validator** : `src/features/lessons/validator.ts` (assert types supportes)

---

## Out of Scope

- Contenu Modules 3-5 (Module 3 = STORY-011, Modules 4-5 = Sprint 4)
- Images ou medias dans les lecons (texte uniquement)
- Exercices multi-fichiers (HTML + CSS separes)
- Auto-completion dans l'editeur pour les nouvelles balises
- Traduction du contenu

---

## Definition of Done

- [x] 4 lecons Module 2 completes (theory + exercise + tests)
- [x] Fichier module-2.ts cree et integre dans modules.ts
- [x] Module 2 accessible dans l'app apres completion Module 1
- [x] Navigation inter-lecons fonctionnelle
- [x] All tests passing (objectif : +20 tests)
- [x] Contenu verifie manuellement dans le navigateur
- [x] Code reviewed
- [x] Commit : `feat(STORY-010): add Module 2 HTML semantique content`
