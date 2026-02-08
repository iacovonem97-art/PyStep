# STORY-011: Contenu Module 3 - Introduction au CSS

> **Status** : Ready for Development
> **Sprint** : 3
> **Epic** : 2 - Parcours d'apprentissage
> **PRD Reference** : Section 3 (Parcours pedagogique), US-2.2
> **Points** : 7
> **Assignee** : Amelia
> **Depends on** : STORY-010 (Module 2 content), STORY-006 (lesson data structure)

---

## User Story

**En tant que** apprenant ayant termine les Modules 1 et 2,
**Je veux** suivre le Module 3 sur les bases du CSS,
**Afin de** styliser mes pages web et vivre le "wow moment" de voir du HTML brut prendre vie.

---

## Acceptance Criteria

### AC-1: 5 lecons completes avec theorie + exercice + tests
- [ ] Lecon 3.1 : Qu'est-ce que le CSS ? (syntaxe, selecteurs basiques)
- [ ] Lecon 3.2 : Couleurs et arriere-plans (`color`, `background`)
- [ ] Lecon 3.3 : Typographie (`font-family`, `font-size`, `font-weight`)
- [ ] Lecon 3.4 : Le modele de boite (`margin`, `padding`, `border`)
- [ ] Lecon 3.5 : Dimensions et unites (px, %, em, rem) - Mini-projet : styliser la page "A propos"

### AC-2: Format identique aux Modules 1 et 2
- [ ] Chaque lecon suit le type `Lesson` (`id`, `title`, `module`, `order`, `theory`, `exercise`)
- [ ] Theory : `content` (Markdown) + `examples` (CodeExample[])
- [ ] Exercise : `instructions` + `starterCode` + `hints` (3 niveaux) + `tests` (ExerciseTest[])
- [ ] Contenu en francais, ton pedagogique et encourageant

### AC-3: Exercices CSS dans un contexte HTML
- [ ] Le starterCode inclut une structure HTML + une balise `<style>` a remplir
- [ ] Les exercices demandent d'ecrire du CSS dans `<style>` (pas de fichier CSS externe)
- [ ] Le preview dans l'iframe affiche le resultat CSS en temps reel
- [ ] Le contenu HTML de base est fourni, l'apprenant ajoute le CSS

### AC-4: Tests de validation CSS adaptes
- [ ] Les tests DOM verifient le rendu CSS via `getComputedStyle` ou attributs de style
- [ ] Types d'assert supportes : `exists` (element cible), `hasAttribute` (style inline si besoin), `hasText`
- [ ] Les tests valident le resultat visible, pas le code exact
- [ ] Chaque exercice a 2 a 5 tests
- [ ] ATTENTION : le validator existant fonctionne sur le DOM de l'iframe, le CSS dans `<style>` est applique automatiquement

### AC-5: Integration dans l'application
- [ ] Fichier `src/data/lessons/module-3.ts` cree et exporte `module3Lessons`
- [ ] `src/data/modules.ts` mis a jour : import module3Lessons, remplace `lessons: []`
- [ ] Module 3 accessible depuis la Course Map apres completion du Module 2
- [ ] Navigation "Lecon suivante" fonctionne de 3.1 → 3.2 → 3.3 → 3.4 → 3.5
- [ ] Apres 2.4, enchaine sur 3.1 correctement

### AC-6: Progression pedagogique vers le CSS
- [ ] Lecon 3.1 introduit le concept CSS depuis zero (l'apprenant n'a vu que du HTML)
- [ ] La transition HTML → CSS est explicite et motivante
- [ ] Chaque lecon montre un "avant/apres" visuel (HTML brut vs HTML + CSS)
- [ ] Le mini-projet (3.5) combine toutes les proprietes CSS vues

---

## Lesson Content Guide

### 3.1 Qu'est-ce que le CSS ?

**Theory** :
- CSS = Cascading Style Sheets : le langage qui met en forme le HTML
- Analogie : HTML = structure (murs, toit), CSS = decoration (peinture, meubles)
- Syntaxe de base : `selecteur { propriete: valeur; }`
- 3 facons d'ajouter du CSS : inline, `<style>`, fichier externe (on utilise `<style>` dans Pystep)
- Selecteurs de base : `balise`, `.classe`, `#id`
- Premiere propriete : `color` pour changer la couleur du texte

**Examples** :
```html
<style>
  h1 {
    color: blue;
  }
  p {
    color: gray;
  }
</style>
<h1>Mon titre en bleu</h1>
<p>Mon paragraphe en gris</p>
```

**Exercise** : Ajouter du CSS pour que le `<h1>` soit en rouge et le `<p>` en bleu

**StarterCode** :
```html
<style>
  /* Ecris ton CSS ici */
</style>
<h1>Bienvenue</h1>
<p>Le CSS, c'est magique !</p>
```

**Tests** :
- `h1` exists
- `p` exists
- `style` exists

Note : On ne peut pas tester `color: red` avec les assert existants. On verifie la presence des elements et du style tag. Le feedback visuel dans la preview montre le resultat.

### 3.2 Couleurs et arriere-plans

**Theory** :
- Propriete `color` : couleur du texte
- Propriete `background-color` : couleur de fond
- Formats de couleur : noms (`red`, `blue`), hexadecimal (`#ff0000`), rgb (`rgb(255, 0, 0)`)
- Propriete `background` (raccourci)
- Contraste et lisibilite (texte clair sur fond fonce et vice versa)

**Examples** :
```html
<style>
  body {
    background-color: #f0f0f0;
  }
  h1 {
    color: #2563eb;
    background-color: #dbeafe;
  }
</style>
<h1>Titre avec fond colore</h1>
```

**Exercise** : Creer une page avec un `body` ayant un fond colore, un `<h1>` avec une couleur de texte, et une `<div>` avec un fond de couleur differente

**Tests** :
- `h1` exists
- `div` exists
- `style` exists
- `div` hasText (contient du texte)

### 3.3 Typographie

**Theory** :
- `font-family` : choisir une police (`Arial`, `Georgia`, `monospace`, etc.)
- `font-size` : taille du texte (en px pour commencer)
- `font-weight` : graisse (`normal`, `bold`, `100`-`900`)
- `text-align` : alignement (`left`, `center`, `right`)
- `line-height` : interligne (lisibilite)
- `text-decoration` : souligne, barre, aucun
- Polices web-safe vs Google Fonts (mention, pas d'import pour le MVP)

**Examples** :
```html
<style>
  h1 {
    font-family: Georgia, serif;
    font-size: 32px;
    text-align: center;
  }
  p {
    font-family: Arial, sans-serif;
    font-size: 16px;
    line-height: 1.5;
  }
</style>
<h1>Titre elegant</h1>
<p>Un paragraphe lisible avec un bon interligne.</p>
```

**Exercise** : Styliser un titre (`<h1>`) centre en 36px avec une police serif, et un paragraphe en 18px avec une police sans-serif

**Tests** :
- `h1` exists
- `p` exists
- `style` exists
- `h1` hasText

### 3.4 Le modele de boite

**Theory** :
- Tout element HTML est une "boite" (box model)
- `margin` : espace exterieur (entre les boites)
- `padding` : espace interieur (entre le contenu et la bordure)
- `border` : bordure visible
- Syntaxe raccourcie : `margin: 10px 20px` (vertical horizontal)
- `border` raccourci : `border: 2px solid black`
- `border-radius` : coins arrondis
- Visualisation : contenu → padding → border → margin

**Examples** :
```html
<style>
  .card {
    border: 2px solid #3b82f6;
    border-radius: 8px;
    padding: 20px;
    margin: 16px;
    background-color: #eff6ff;
  }
</style>
<div class="card">
  <h2>Ma carte</h2>
  <p>Avec du padding, une bordure et des marges.</p>
</div>
```

**Exercise** : Creer une "carte" (div avec class) ayant une bordure, du padding, du margin, des coins arrondis et un fond colore

**Tests** :
- `div` exists
- `.card` exists (ou le selecteur de classe utilise)
- `style` exists
- `h2` exists

### 3.5 Dimensions et unites (Mini-projet : styliser la page "A propos")

**Theory** :
- `width` et `height` : dimensions d'un element
- Unites absolues : `px` (pixels)
- Unites relatives : `%` (parent), `em` (taille de police parent), `rem` (taille de police racine)
- `max-width` : largeur maximale (responsive)
- `box-sizing: border-box` : le padding et la bordure sont inclus dans la largeur
- Quand utiliser quoi : `px` pour les petites valeurs, `%` pour les layouts, `rem` pour le texte

**Examples** :
```html
<style>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  img {
    width: 100%;
    border-radius: 8px;
  }
</style>
<div class="container">
  <h1>Mon contenu centre</h1>
  <p>Ce conteneur fait maximum 600px de large.</p>
</div>
```

**Exercise** (Mini-projet) : Creer une page "A propos" complete et stylisee :
1. Un `<header>` avec titre centre et fond colore
2. Une section `<main>` avec `max-width: 600px` centree
3. Au moins 2 paragraphes avec une bonne typographie
4. Une "carte" (div stylisee) avec bordure, padding et fond
5. Un `<footer>` avec texte centre

**Tests** :
- `header` exists
- `main` exists
- `footer` exists
- `p` count >= 2
- `style` exists
- `div` exists

---

## Technical Tasks

### T1: Creer module-3.ts
- [ ] Creer `src/data/lessons/module-3.ts`
- [ ] Export `module3Lessons: Lesson[]` avec 5 lecons
- [ ] Chaque lecon respecte les interfaces Lesson, LessonTheory, LessonExercise
- [ ] starterCode inclut du HTML de base + bloc `<style>` a completer
- [ ] Contenu pedagogique detaille (theorie CSS depuis zero)

### T2: Mettre a jour modules.ts
- [ ] Import `module3Lessons` depuis `./lessons/module-3`
- [ ] Remplacer `{ ...MODULES_META[2], lessons: [] }` par `{ ...MODULES_META[2], lessons: module3Lessons }`
- [ ] Verifier que `getLessonById`, `getNextLessonId` fonctionnent avec Module 3

### T3: Tests unitaires du contenu
- [ ] Test: module3Lessons contient exactement 5 lecons
- [ ] Test: chaque lecon a un id format "3.X"
- [ ] Test: chaque lecon a theory.content non vide
- [ ] Test: chaque lecon a au moins 1 example
- [ ] Test: chaque lecon a exercise.instructions non vide
- [ ] Test: chaque lecon a exercise.starterCode contenant `<style>`
- [ ] Test: chaque lecon a exactement 3 hints
- [ ] Test: chaque lecon a au moins 2 tests de validation
- [ ] Test: tous les tests utilisent des assert valides

### T4: Tests d'integration
- [ ] Test: Module 3 apparait dans la Course Map
- [ ] Test: Module 3 verrouille si Module 2 non complete
- [ ] Test: Module 3 debloque si Module 2 complete
- [ ] Test: navigation 3.1 → 3.2 → 3.3 → 3.4 → 3.5 fonctionne
- [ ] Test: getNextLessonId('2.4') retourne '3.1'
- [ ] Test: getNextLessonId('3.5') retourne '4.1' (ou null si Module 4 vide)
- [ ] Test: lecon CSS s'affiche correctement dans le preview iframe

### T5: Verifier la compatibilite avec le validator
- [ ] Les tests DOM fonctionnent avec du CSS applique via `<style>`
- [ ] Le validator peut trouver les elements meme quand du CSS est present
- [ ] Le preview iframe applique correctement les styles CSS
- [ ] Si besoin, documenter les limitations du validator pour les proprietes CSS

### T6: Validation manuelle
- [ ] Ouvrir chaque lecon dans le navigateur
- [ ] Verifier que la theorie CSS est claire pour un debutant
- [ ] Verifier que le starterCode apparait correctement dans Monaco
- [ ] Verifier que le CSS s'affiche dans la preview en temps reel
- [ ] Verifier que la solution correcte passe tous les tests
- [ ] Verifier le "wow moment" visuel (HTML brut → HTML + CSS)

---

## Design References

- **PRD Curriculum** : `docs/prd-mvp.md` Section 3 (Module 3 : Introduction au CSS)
- **Format de reference** : `src/data/lessons/module-1.ts` et `module-2.ts`
- **Types** : `src/types/lesson.ts` (Lesson, ExerciseTest)
- **Validator** : `src/features/lessons/validator.ts`
- **Preview** : `src/components/lesson/PreviewPanel.tsx` (iframe srcdoc)

---

## Risques specifiques au CSS

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Validator ne peut pas tester les proprietes CSS computed | Tests limites | Tester la presence des elements + `<style>` tag, pas les valeurs CSS |
| CSS `<style>` pas applique dans l'iframe | Preview cassee | Le srcdoc inclut deja tout le HTML, le `<style>` sera dans le head automatiquement |
| Coloration syntaxique CSS dans Monaco | DX | Monaco supporte deja HTML + CSS inline (verifie en Sprint 2) |
| Difficulte pedagogique CSS > HTML | Abandon apprenant | Transition progressive, "wow moment" des la lecon 3.1 |

---

## Out of Scope

- Contenu Modules 4-5 (Sprint 4)
- Fichier CSS externe (tout est dans `<style>` dans le HTML)
- Validation des valeurs CSS computees (on teste la structure DOM)
- Google Fonts import (mention en theorie mais pas dans les exercices)
- CSS variables (custom properties) - post-MVP
- Media queries (Module 4)
- Flexbox / Grid (Module 4)

---

## Definition of Done

- [ ] 5 lecons Module 3 completes (theory + exercise + tests)
- [ ] Fichier module-3.ts cree et integre dans modules.ts
- [ ] Module 3 accessible dans l'app apres completion Module 2
- [ ] Navigation inter-lecons fonctionnelle (2.4 → 3.1 → ... → 3.5)
- [ ] CSS visible dans la preview iframe
- [ ] All tests passing (objectif : +25 tests)
- [ ] Contenu verifie manuellement dans le navigateur
- [ ] Code reviewed
- [ ] Commit : `feat(STORY-011): add Module 3 Introduction au CSS content`
