# STORY-013: Contenu Module 5 - Projet Final

> **Status** : Pending
> **Sprint** : 4
> **Epic** : 2 - Parcours d'apprentissage
> **PRD Reference** : Section 3 (Parcours pedagogique), US-2.2
> **Points** : 5
> **Assignee** : Amelia
> **Depends on** : STORY-012 (Module 4 content)

---

## User Story

**En tant que** apprenant ayant termine les Modules 1-4,
**Je veux** realiser un projet final guide : mon portfolio personnel,
**Afin de** consolider toutes mes competences HTML/CSS et repartir avec un projet concret et fier de moi.

---

## Acceptance Criteria

### AC-1: 2 lecons completes avec theorie + exercice + tests
- [ ] Lecon 5.1 : Projet guide - Creer un portfolio (Partie 1 : Structure HTML)
- [ ] Lecon 5.2 : Projet guide - Creer un portfolio (Partie 2 : Style CSS complet)

### AC-2: Format identique aux Modules 1-4
- [ ] Chaque lecon suit le type `Lesson` (`id`, `title`, `module`, `order`, `theory`, `exercise`)
- [ ] Theory : `content` (Markdown) + `examples` (CodeExample[])
- [ ] Exercise : `instructions` + `starterCode` + `hints` (3 niveaux) + `tests` (ExerciseTest[])
- [ ] Contenu en francais, ton pedagogique et encourageant

### AC-3: Projet guide progressif
- [ ] Lecon 5.1 = structure HTML complete du portfolio (header, sections, footer)
- [ ] Lecon 5.2 = style CSS complet (couleurs, typographie, layout, responsive)
- [ ] Le starterCode de 5.2 inclut la structure HTML de 5.1 (l'apprenant ajoute le CSS)
- [ ] Les instructions sont detaillees et pas-a-pas
- [ ] Le resultat final est un portfolio professionnel et visuellement attractif

### AC-4: Tests de validation du projet
- [ ] Lecon 5.1 : tests sur la structure HTML (header, nav, sections, footer, liens, images)
- [ ] Lecon 5.2 : tests sur la presence de CSS (style tag, elements structurants, divs stylises)
- [ ] Chaque lecon a 5 a 8 tests (projet = plus de validations)
- [ ] Le validator existant est suffisant

### AC-5: Integration dans l'application
- [ ] Fichier `src/data/lessons/module-5.ts` cree et exporte `module5Lessons`
- [ ] `src/data/modules.ts` mis a jour : import module5Lessons, remplace `lessons: []`
- [ ] Module 5 accessible depuis la Course Map apres completion du Module 4
- [ ] Navigation "Lecon suivante" fonctionne de 5.1 → 5.2
- [ ] Apres 4.5, enchaine sur 5.1 correctement
- [ ] Apres 5.2 : afficher un message de felicitations (parcours termine)

### AC-6: Experience de fin de parcours
- [ ] La lecon 5.2 mentionne que l'apprenant a termine tout le parcours
- [ ] Le hint 3 (solution) de 5.2 donne un portfolio complet et impressionnant
- [ ] Le "Lecon suivante" apres 5.2 redirige vers le Dashboard (ou affiche "Parcours termine !")
- [ ] Le Dashboard affiche 100% de progression pour un apprenant ayant tout complete

---

## Lesson Content Guide

### 5.1 Projet guide - Portfolio (Partie 1 : Structure HTML)

**Theory** :
- Recap de tout ce qu'on a appris en HTML (Modules 1-2)
- Anatomie d'un portfolio : qui suis-je, mes competences, mes projets, contact
- Planning du projet : on construit d'abord la structure, ensuite le style
- Bonnes pratiques : HTML semantique, accessibilite, structure logique
- Exemples de portfolios de developpeurs (description, pas de liens externes)

**Examples** :
```html
<header>
  <nav>
    <a href="#accueil">Accueil</a>
    <a href="#projets">Projets</a>
    <a href="#contact">Contact</a>
  </nav>
</header>
<main>
  <section id="accueil">
    <h1>Jean Dupont</h1>
    <p>Developpeur web junior passione</p>
  </section>
  <section id="projets">
    <h2>Mes projets</h2>
    <article>
      <h3>Projet 1</h3>
      <p>Description du projet...</p>
    </article>
  </section>
  <section id="contact">
    <h2>Me contacter</h2>
    <form>
      <label for="email">Email :</label>
      <input type="email" id="email" placeholder="ton@email.com">
      <button type="submit">Envoyer</button>
    </form>
  </section>
</main>
<footer>
  <p>&copy; 2026 Jean Dupont</p>
</footer>
```

**Exercise** : Creer la structure HTML complete du portfolio avec :
1. Un `<header>` avec `<nav>` et au moins 3 liens d'ancrage
2. Une section "A propos" avec `<h1>` (nom) et `<p>` (description)
3. Une section "Projets" avec au moins 2 `<article>` (chacun avec titre + description)
4. Une section "Contact" avec un `<form>` (email + bouton)
5. Un `<footer>` avec copyright

**Tests** :
- `header` exists
- `nav` exists
- `nav a` count >= 3
- `section` count >= 3
- `article` count >= 2
- `form` exists
- `footer` exists

### 5.2 Projet guide - Portfolio (Partie 2 : Style CSS complet)

**Theory** :
- Recap de tout ce qu'on a appris en CSS (Modules 3-4)
- Strategie de style : couleurs d'abord, typographie, layout, responsive
- Palette de couleurs : choisir 2-3 couleurs coherentes
- Typographie : 1 police titres + 1 police texte
- Layout : Flexbox pour la nav, Grid pour les projets, responsive avec media queries
- Finitions : hover effects, transitions (mention), ombres, border-radius

**Examples** :
```html
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
  header {
    background-color: #1e293b;
    color: white;
    padding: 16px 24px;
  }
  nav { display: flex; justify-content: flex-end; gap: 20px; }
  nav a { color: white; text-decoration: none; }
  section { padding: 40px 20px; max-width: 800px; margin: 0 auto; }
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  .project-card {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 20px;
  }
  @media (max-width: 640px) {
    .projects-grid { grid-template-columns: 1fr; }
  }
  footer {
    background-color: #1e293b;
    color: white;
    text-align: center;
    padding: 16px;
  }
</style>
```

**Exercise** : Ajouter le CSS complet au portfolio de la Partie 1 :
1. Une `<style>` avec reset basique (`box-sizing: border-box`)
2. Un `<header>` avec fond colore et navigation Flexbox
3. Des sections avec `max-width` et centrees
4. Une grille Grid pour les projets (2 colonnes desktop, 1 mobile)
5. Des cartes projet avec bordure, padding et border-radius
6. Un `<footer>` avec fond colore et texte centre
7. Au moins un `@media` query pour le responsive

**Tests** :
- `header` exists
- `nav` exists
- `section` count >= 3
- `.project-card` count >= 2 (ou `article` count >= 2)
- `footer` exists
- `style` exists
- `div` exists

---

## Technical Tasks

### T1: Creer module-5.ts
- [ ] Creer `src/data/lessons/module-5.ts`
- [ ] Export `module5Lessons: Lesson[]` avec 2 lecons
- [ ] Chaque lecon respecte les interfaces Lesson, LessonTheory, LessonExercise
- [ ] starterCode de 5.1 = structure minimale a completer
- [ ] starterCode de 5.2 = structure HTML complete + `<style>` vide a remplir
- [ ] Contenu pedagogique de qualite "projet final" (recap + guide)

### T2: Mettre a jour modules.ts
- [ ] Import `module5Lessons` depuis `./lessons/module-5`
- [ ] Remplacer `{ ...MODULES_META[4], lessons: [] }` par `{ ...MODULES_META[4], lessons: module5Lessons }`
- [ ] Verifier que `getLessonById`, `getNextLessonId` fonctionnent avec Module 5
- [ ] Verifier que `getNextLessonId('5.2')` retourne null (fin du parcours)

### T3: Tests unitaires du contenu
- [ ] Test: module5Lessons contient exactement 2 lecons
- [ ] Test: chaque lecon a un id format "5.X"
- [ ] Test: chaque lecon a theory.content non vide
- [ ] Test: chaque lecon a au moins 1 example
- [ ] Test: chaque lecon a exercise.instructions non vide
- [ ] Test: lecon 5.2 a exercise.starterCode contenant `<style>`
- [ ] Test: chaque lecon a exactement 3 hints
- [ ] Test: chaque lecon a au moins 5 tests de validation (projet = plus de tests)
- [ ] Test: tous les tests utilisent des assert valides

### T4: Tests d'integration
- [ ] Test: Module 5 apparait dans la Course Map
- [ ] Test: Module 5 verrouille si Module 4 non complete
- [ ] Test: Module 5 debloque si Module 4 complete
- [ ] Test: navigation 5.1 → 5.2 fonctionne
- [ ] Test: getNextLessonId('4.5') retourne '5.1'
- [ ] Test: getNextLessonId('5.2') retourne null (fin de parcours)

### T5: Tests de regression validator
- [ ] Test: validator passe avec solution correcte pour 5.1
- [ ] Test: validator passe avec solution correcte pour 5.2
- [ ] Test: validator echoue avec solution partielle

### T6: Gestion fin de parcours
- [ ] Verifier que `getNextLessonId('5.2')` retourne null gracieusement
- [ ] Le bouton "Lecon suivante" apres 5.2 est soit cache, soit redirige vers Dashboard
- [ ] Le Dashboard affiche 100% quand toutes les lecons sont completees
- [ ] Test: progression 22/22 = 100%

---

## Design References

- **PRD Curriculum** : `docs/prd-mvp.md` Section 3 (Module 5 : Projet Final)
- **Format de reference** : `src/data/lessons/module-4.ts` (a creer avant)
- **Types** : `src/types/lesson.ts`
- **Validator** : `src/features/lessons/validator.ts`

---

## Out of Scope

- Certificat de completion (post-MVP)
- Partage du portfolio sur les reseaux sociaux
- Hebergement du portfolio de l'apprenant
- Themes de portfolio au choix
- Export du code du portfolio

---

## Definition of Done

- [ ] 2 lecons Module 5 completes (theory + exercise + tests)
- [ ] Fichier module-5.ts cree et integre dans modules.ts
- [ ] Module 5 accessible dans l'app apres completion Module 4
- [ ] Navigation inter-lecons fonctionnelle (4.5 → 5.1 → 5.2)
- [ ] Fin de parcours geree gracieusement (5.2 = derniere lecon)
- [ ] Portfolio final visuellement impressionnant dans la preview
- [ ] All tests passing (objectif : +15 tests)
- [ ] Contenu verifie manuellement dans le navigateur
- [ ] Code reviewed
- [ ] Status mis a jour dans ce fichier
- [ ] Commit : `feat(STORY-013): add Module 5 Projet Final content`
