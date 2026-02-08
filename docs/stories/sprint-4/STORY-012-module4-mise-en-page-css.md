# STORY-012: Contenu Module 4 - Mise en page CSS

> **Status** : Done
> **Sprint** : 4
> **Epic** : 2 - Parcours d'apprentissage
> **PRD Reference** : Section 3 (Parcours pedagogique), US-2.2
> **Points** : 8
> **Assignee** : Amelia
> **Depends on** : STORY-011 (Module 3 content)

---

## User Story

**En tant que** apprenant ayant termine les Modules 1-3,
**Je veux** suivre le Module 4 sur la mise en page CSS,
**Afin de** maitriser Flexbox, Grid et le responsive design pour creer des layouts professionnels.

---

## Acceptance Criteria

### AC-1: 5 lecons completes avec theorie + exercice + tests
- [x]Lecon 4.1 : Display et positionnement (`block`, `inline`, `relative`, `absolute`)
- [x]Lecon 4.2 : Flexbox - Les bases (`display: flex`, `justify-content`, `align-items`)
- [x]Lecon 4.3 : Flexbox - Avance (`flex-wrap`, `gap`, `order`, `flex-grow`)
- [x]Lecon 4.4 : Introduction a Grid (`display: grid`, colonnes, rangees, `gap`)
- [x]Lecon 4.5 : Responsive design (`media queries`, `mobile-first`) - Mini-projet : layout 2 colonnes responsive

### AC-2: Format identique aux Modules 1-3
- [x]Chaque lecon suit le type `Lesson` (`id`, `title`, `module`, `order`, `theory`, `exercise`)
- [x]Theory : `content` (Markdown) + `examples` (CodeExample[])
- [x]Exercise : `instructions` + `starterCode` + `hints` (3 niveaux) + `tests` (ExerciseTest[])
- [x]Contenu en francais, ton pedagogique et encourageant

### AC-3: Exercices CSS dans un contexte HTML
- [x]Le starterCode inclut une structure HTML + une balise `<style>` a completer
- [x]Les exercices demandent d'ecrire du CSS dans `<style>` (pas de fichier CSS externe)
- [x]Le preview dans l'iframe affiche le resultat du layout en temps reel
- [x]Le contenu HTML de base est fourni avec des div/elements a positionner

### AC-4: Tests de validation adaptes au layout
- [x]Les tests DOM verifient la presence des elements structurants
- [x]Types d'assert : `exists` (elements), `hasAttribute` (class), `count`
- [x]Chaque exercice a 3 a 6 tests
- [x]Le validator existant est suffisant (pas besoin de tester les valeurs CSS computed)

### AC-5: Integration dans l'application
- [x]Fichier `src/data/lessons/module-4.ts` cree et exporte `module4Lessons`
- [x]`src/data/modules.ts` mis a jour : import module4Lessons, remplace `lessons: []`
- [x]Module 4 accessible depuis la Course Map apres completion du Module 3
- [x]Navigation "Lecon suivante" fonctionne de 4.1 → 4.2 → 4.3 → 4.4 → 4.5
- [x]Apres 3.5, enchaine sur 4.1 correctement
- [x]Apres 4.5, enchaine sur 5.1 (Module 5)

### AC-6: Progression pedagogique du layout
- [x]Lecon 4.1 introduit display/position depuis les bases (block vs inline)
- [x]Flexbox est decouvert progressivement sur 2 lecons (bases puis avance)
- [x]Grid est presente comme une alternative a Flexbox pour les layouts 2D
- [x]Le responsive design conclut logiquement le module (media queries)
- [x]Le mini-projet (4.5) combine Flexbox/Grid + media queries

---

## Lesson Content Guide

### 4.1 Display et positionnement

**Theory** :
- Rappel : tout element est une "boite" (box model, vu au Module 3)
- `display: block` vs `display: inline` vs `display: inline-block`
- Comportement par defaut : `<div>` = block, `<span>` = inline
- `position: relative` : decaler un element par rapport a sa position normale
- `position: absolute` : positionner par rapport au parent positionne
- `position: fixed` : fixer par rapport au viewport (mention)
- `z-index` : gerer la superposition

**Examples** :
```html
<style>
  .container {
    position: relative;
    border: 2px solid #ccc;
    padding: 40px;
    height: 200px;
  }
  .badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #ef4444;
    color: white;
    padding: 4px 12px;
    border-radius: 12px;
  }
  .inline-example span {
    display: inline-block;
    padding: 8px 16px;
    margin: 4px;
    background-color: #dbeafe;
    border-radius: 4px;
  }
</style>
<div class="container">
  <div class="badge">Nouveau</div>
  <h2>Ma carte produit</h2>
  <p>Avec un badge positionne en absolu.</p>
</div>
<div class="inline-example">
  <span>Tag 1</span>
  <span>Tag 2</span>
  <span>Tag 3</span>
</div>
```

**Exercise** : Creer une carte produit avec un badge "Promo" positionne en haut a droite (position absolute), et une rangee de tags en inline-block en dessous

**Tests** :
- `.container` exists (ou div parent)
- `.badge` exists
- `span` count = 3 (tags inline-block)
- `style` exists

### 4.2 Flexbox - Les bases

**Theory** :
- Flexbox = mise en page en une dimension (ligne OU colonne)
- `display: flex` sur le parent → les enfants deviennent "flex items"
- `flex-direction` : `row` (defaut) ou `column`
- `justify-content` : aligner sur l'axe principal (`flex-start`, `center`, `flex-end`, `space-between`, `space-around`)
- `align-items` : aligner sur l'axe secondaire (`flex-start`, `center`, `flex-end`, `stretch`)
- Analogie : Flexbox = ranger des livres sur une etagere

**Examples** :
```html
<style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #1e293b;
    color: white;
    padding: 12px 24px;
  }
  .nav-links {
    display: flex;
    gap: 16px;
  }
  .nav-links a {
    color: white;
    text-decoration: none;
  }
</style>
<nav class="navbar">
  <div class="logo">MonSite</div>
  <div class="nav-links">
    <a href="#">Accueil</a>
    <a href="#">A propos</a>
    <a href="#">Contact</a>
  </div>
</nav>
```

**Exercise** : Creer une barre de navigation avec le logo a gauche et les liens a droite (justify-content: space-between), les liens espaces avec gap

**Tests** :
- `nav` exists
- `.navbar` exists (ou selecteur flex parent)
- `a` count >= 3 (liens de navigation)
- `style` exists
- `.logo` exists (ou element logo)

### 4.3 Flexbox - Avance

**Theory** :
- `flex-wrap: wrap` : passer a la ligne quand l'espace manque
- `gap` : espacement entre les flex items (remplace les margins hacky)
- `flex-grow` : comment un item s'etend pour occuper l'espace restant
- `flex-shrink` : comment un item retrecit
- `flex-basis` : taille initiale avant grow/shrink
- Raccourci `flex: 1` = `flex-grow: 1; flex-shrink: 1; flex-basis: 0`
- `order` : reordonner visuellement les items
- Cas pratique : grille de cartes avec flex-wrap

**Examples** :
```html
<style>
  .card-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  .card {
    flex: 1 1 250px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 16px;
    background-color: #f8fafc;
  }
  .card h3 {
    margin-top: 0;
  }
</style>
<div class="card-grid">
  <div class="card">
    <h3>Carte 1</h3>
    <p>Contenu de la carte.</p>
  </div>
  <div class="card">
    <h3>Carte 2</h3>
    <p>Contenu de la carte.</p>
  </div>
  <div class="card">
    <h3>Carte 3</h3>
    <p>Contenu de la carte.</p>
  </div>
</div>
```

**Exercise** : Creer une grille de 3 cartes qui s'adaptent (flex-wrap) avec un gap, chaque carte avec un titre et un paragraphe

**Tests** :
- `.card-grid` exists (ou conteneur flex)
- `.card` count = 3
- `h3` count = 3
- `style` exists

### 4.4 Introduction a Grid

**Theory** :
- CSS Grid = mise en page en deux dimensions (lignes ET colonnes)
- `display: grid` sur le parent
- `grid-template-columns` : definir les colonnes (`1fr 1fr`, `repeat(3, 1fr)`, `200px 1fr`)
- `grid-template-rows` : definir les rangees
- `gap` : espacement (fonctionne aussi en Grid)
- `fr` : unite fractionnaire (partage equitable de l'espace)
- Flexbox vs Grid : quand utiliser quoi ? (1D vs 2D)
- `grid-column` : un item qui s'etend sur plusieurs colonnes

**Examples** :
```html
<style>
  .grid-layout {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .grid-item {
    background-color: #dbeafe;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
  }
  .featured {
    grid-column: 1 / -1;
    background-color: #bfdbfe;
  }
</style>
<div class="grid-layout">
  <div class="grid-item featured">Article en vedette (pleine largeur)</div>
  <div class="grid-item">Article 1</div>
  <div class="grid-item">Article 2</div>
  <div class="grid-item">Article 3</div>
</div>
```

**Exercise** : Creer une galerie d'images (ou de cartes) en grid 3 colonnes, avec un element "featured" qui s'etend sur toute la largeur

**Tests** :
- `.grid-layout` exists (ou conteneur grid)
- `.grid-item` count >= 4
- `.featured` exists
- `style` exists

### 4.5 Responsive design (Mini-projet : layout 2 colonnes responsive)

**Theory** :
- Responsive = le site s'adapte a toutes les tailles d'ecran
- `@media` queries : appliquer du CSS conditionnel selon la largeur
- Syntaxe : `@media (max-width: 768px) { ... }`
- Approche mobile-first vs desktop-first (on utilise mobile-first)
- Mobile-first : CSS de base = mobile, `@media (min-width: ...)` pour elargir
- Breakpoints courants : 640px (mobile), 768px (tablette), 1024px (desktop)
- `meta viewport` : deja present dans le HTML de base
- Combinaison Flexbox/Grid + media queries = layouts adaptatifs

**Examples** :
```html
<style>
  .layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
  }
  @media (min-width: 768px) {
    .layout {
      grid-template-columns: 2fr 1fr;
    }
  }
  .main-content {
    background-color: #f0fdf4;
    padding: 20px;
    border-radius: 8px;
  }
  .sidebar {
    background-color: #fef3c7;
    padding: 20px;
    border-radius: 8px;
  }
</style>
<div class="layout">
  <div class="main-content">
    <h1>Contenu principal</h1>
    <p>Sur mobile : pleine largeur. Sur desktop : 2/3 de la page.</p>
  </div>
  <div class="sidebar">
    <h2>Sidebar</h2>
    <p>Sur mobile : en dessous. Sur desktop : a droite.</p>
  </div>
</div>
```

**Exercise** (Mini-projet) : Creer un layout blog responsive avec :
1. Un `<header>` avec titre et navigation (Flexbox)
2. Un layout 2 colonnes Grid (contenu principal + sidebar)
3. Une media query pour passer en 1 colonne sur mobile
4. Un `<footer>` avec texte centre

**Tests** :
- `header` exists
- `.layout` exists (ou conteneur grid)
- `.main-content` exists (ou contenu principal)
- `.sidebar` exists
- `footer` exists
- `style` exists

---

## Technical Tasks

### T1: Creer module-4.ts
- [x]Creer `src/data/lessons/module-4.ts`
- [x]Export `module4Lessons: Lesson[]` avec 5 lecons
- [x]Chaque lecon respecte les interfaces Lesson, LessonTheory, LessonExercise
- [x]starterCode inclut du HTML de base + bloc `<style>` a completer
- [x]Contenu pedagogique detaille (Flexbox/Grid depuis zero)

### T2: Mettre a jour modules.ts
- [x]Import `module4Lessons` depuis `./lessons/module-4`
- [x]Remplacer `{ ...MODULES_META[3], lessons: [] }` par `{ ...MODULES_META[3], lessons: module4Lessons }`
- [x]Verifier que `getLessonById`, `getNextLessonId` fonctionnent avec Module 4

### T3: Tests unitaires du contenu
- [x]Test: module4Lessons contient exactement 5 lecons
- [x]Test: chaque lecon a un id format "4.X"
- [x]Test: chaque lecon a theory.content non vide
- [x]Test: chaque lecon a au moins 1 example
- [x]Test: chaque lecon a exercise.instructions non vide
- [x]Test: chaque lecon a exercise.starterCode contenant `<style>`
- [x]Test: chaque lecon a exactement 3 hints
- [x]Test: chaque lecon a au moins 3 tests de validation
- [x]Test: tous les tests utilisent des assert valides

### T4: Tests d'integration
- [x]Test: Module 4 apparait dans la Course Map
- [x]Test: Module 4 verrouille si Module 3 non complete
- [x]Test: Module 4 debloque si Module 3 complete
- [x]Test: navigation 4.1 → 4.2 → 4.3 → 4.4 → 4.5 fonctionne
- [x]Test: getNextLessonId('3.5') retourne '4.1'
- [x]Test: getNextLessonId('4.5') retourne '5.1'

### T5: Tests de regression validator
- [x]Test: validator passe avec solution correcte pour chaque lecon 4.x
- [x]Test: validator echoue avec solution partielle
- [x]Test: validator gere le CSS Flexbox/Grid dans `<style>` sans erreur

### T6: Validation manuelle
- [x]Ouvrir chaque lecon dans le navigateur
- [x]Verifier que la theorie est claire pour un debutant
- [x]Verifier que le starterCode apparait correctement dans Monaco
- [x]Verifier que le CSS layout s'affiche dans la preview
- [x]Verifier que la solution correcte passe tous les tests
- [x]Verifier que le responsive fonctionne dans la preview (resize)

---

## Design References

- **PRD Curriculum** : `docs/prd-mvp.md` Section 3 (Module 4 : Mise en page CSS)
- **Format de reference** : `src/data/lessons/module-3.ts` (CSS lessons pattern)
- **Types** : `src/types/lesson.ts` (Lesson, ExerciseTest)
- **Validator** : `src/features/lessons/validator.ts`
- **Preview** : `src/components/lesson/PreviewPanel.tsx` (iframe srcdoc)

---

## Risques specifiques au layout CSS

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Flexbox/Grid complexe a enseigner | Abandon apprenant | Analogies visuelles, progression sur 2 lecons Flexbox |
| Validator ne peut pas tester les proprietes layout | Tests limites | Tester la structure DOM (presence elements + classes), pas les valeurs CSS |
| Media queries non testables dans l'iframe | Preview trompeuse | Mentionner dans la theorie, l'apprenant peut resize le navigateur |
| Contenu trop dense (5 lecons CSS avance) | Surcharge cognitive | Chaque lecon = 1 concept, exercices progressifs |

---

## Out of Scope

- CSS animations et transitions (post-MVP)
- CSS custom properties (variables)
- Subgrid
- Container queries
- Frameworks CSS (Tailwind, Bootstrap)
- CSS-in-JS

---

## Definition of Done

- [x]5 lecons Module 4 completes (theory + exercise + tests)
- [x]Fichier module-4.ts cree et integre dans modules.ts
- [x]Module 4 accessible dans l'app apres completion Module 3
- [x]Navigation inter-lecons fonctionnelle (3.5 → 4.1 → ... → 4.5 → 5.1)
- [x]CSS layout visible dans la preview iframe
- [x]All tests passing (objectif : +25 tests)
- [x]Contenu verifie manuellement dans le navigateur
- [x]Code reviewed
- [x]Status mis a jour dans ce fichier
- [x]Commit : `feat(STORY-012): add Module 4 Mise en page CSS content`
