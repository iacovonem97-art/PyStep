import type { Lesson } from '@/types/lesson'

export const module5Lessons: Lesson[] = [
  {
    id: '5.1',
    title: 'Projet guidé - Portfolio (Partie 1 : Structure HTML)',
    module: 5,
    order: 1,
    theory: {
      content: `Félicitations, tu es arrivé au **Projet Final** ! Tu vas construire un vrai **portfolio personnel** en utilisant tout ce que tu as appris.

**Qu'est-ce qu'un portfolio ?** C'est un site web qui te présente : qui tu es, ce que tu sais faire, tes projets, et comment te contacter. C'est l'outil n°1 des développeurs pour trouver un emploi ou des clients.

**Récap de tes compétences HTML** (Modules 1-2) :
- Structure de base (\`<html>\`, \`<head>\`, \`<body>\`)
- Titres, paragraphes, listes, liens, images
- Balises sémantiques (\`<header>\`, \`<nav>\`, \`<main>\`, \`<section>\`, \`<article>\`, \`<footer>\`)
- Formulaires (\`<form>\`, \`<input>\`, \`<button>\`)

**Le plan du portfolio** :
1. **Header + Navigation** : ton nom et des liens vers les sections
2. **Section "À propos"** : qui tu es, avec un \`<h1>\` et une description
3. **Section "Projets"** : tes réalisations, avec des \`<article>\` pour chaque projet
4. **Section "Contact"** : un formulaire avec email et bouton
5. **Footer** : copyright

On commence par la **structure HTML** dans cette leçon. Le CSS viendra dans la Partie 2 !

**Bonne pratique** : utilise des liens d'ancrage (\`<a href="#projets">\`) pour naviguer entre les sections. L'attribut \`id\` sur les \`<section>\` sert de cible.`,
      examples: [
        {
          code: `<header>
  <nav>
    <a href="#accueil">Accueil</a>
    <a href="#projets">Projets</a>
    <a href="#contact">Contact</a>
  </nav>
</header>
<main>
  <section id="accueil">
    <h1>Jean Dupont</h1>
    <p>Développeur web junior passionné</p>
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
</footer>`,
          description: 'Structure complète d\'un portfolio avec navigation, sections et formulaire',
        },
      ],
    },
    exercise: {
      instructions: `Crée la structure HTML complète de ton portfolio :

1. Un \`<header>\` avec une \`<nav>\` contenant au moins 3 liens d'ancrage (\`<a>\`)
2. Une \`<section>\` "À propos" avec un \`<h1>\` (ton nom) et un \`<p>\` (description)
3. Une \`<section>\` "Projets" avec au moins 2 \`<article>\` (chacun avec un titre \`<h3>\` et un \`<p>\`)
4. Une \`<section>\` "Contact" avec un \`<form>\` (un champ email + un bouton)
5. Un \`<footer>\` avec un copyright

Pas besoin de CSS pour le moment, concentre-toi sur une structure HTML propre et sémantique !`,
      starterCode: `<!-- Crée la structure HTML de ton portfolio -->
<header>
  <nav>
    <!-- Ajoute tes liens de navigation ici -->
  </nav>
</header>
<main>
  <!-- Ajoute tes sections ici : À propos, Projets, Contact -->

</main>
<footer>
  <!-- Ajoute ton copyright ici -->
</footer>`,
      hints: [
        'Dans le <nav>, ajoute 3 liens <a href="#section-id">. Crée 3 <section> dans <main> : une avec <h1>, une avec 2 <article>, et une avec un <form>.',
        '<nav>\n  <a href="#accueil">Accueil</a>\n  <a href="#projets">Projets</a>\n  <a href="#contact">Contact</a>\n</nav>\n...\n<section id="accueil"><h1>Mon Nom</h1><p>Ma description</p></section>\n<section id="projets"><h2>Mes projets</h2><article><h3>Projet 1</h3><p>Description</p></article><article><h3>Projet 2</h3><p>Description</p></article></section>\n<section id="contact"><h2>Contact</h2><form><input type="email"><button>Envoyer</button></form></section>',
        '<header>\n  <nav>\n    <a href="#accueil">Accueil</a>\n    <a href="#projets">Projets</a>\n    <a href="#contact">Contact</a>\n  </nav>\n</header>\n<main>\n  <section id="accueil">\n    <h1>Marie Martin</h1>\n    <p>Développeuse web passionnée par le HTML et le CSS.</p>\n  </section>\n  <section id="projets">\n    <h2>Mes projets</h2>\n    <article>\n      <h3>Site vitrine</h3>\n      <p>Un site responsive pour un restaurant local.</p>\n    </article>\n    <article>\n      <h3>Portfolio personnel</h3>\n      <p>Ce portfolio que vous consultez en ce moment !</p>\n    </article>\n  </section>\n  <section id="contact">\n    <h2>Me contacter</h2>\n    <form>\n      <label for="email">Email :</label>\n      <input type="email" id="email" placeholder="ton@email.com">\n      <button type="submit">Envoyer</button>\n    </form>\n  </section>\n</main>\n<footer>\n  <p>&copy; 2026 Marie Martin</p>\n</footer>',
      ],
      tests: [
        { name: 'Un <header> est présent', query: 'header', assert: 'exists' },
        { name: 'Une <nav> est présente', query: 'nav', assert: 'exists' },
        { name: 'Il y a au moins 3 liens de navigation', query: 'nav a', assert: 'count', value: 3 },
        { name: 'Il y a au moins 3 sections', query: 'section', assert: 'count', value: 3 },
        { name: 'Il y a au moins 2 articles (projets)', query: 'article', assert: 'count', value: 2 },
        { name: 'Un formulaire est présent', query: 'form', assert: 'exists' },
        { name: 'Un <footer> est présent', query: 'footer', assert: 'exists' },
      ],
    },
  },
  {
    id: '5.2',
    title: 'Projet guidé - Portfolio (Partie 2 : Style CSS complet)',
    module: 5,
    order: 2,
    theory: {
      content: `Ton portfolio a une structure HTML solide. Il est temps de le rendre **magnifique** avec tout le CSS que tu as appris !

**Récap de tes compétences CSS** (Modules 3-4) :
- Couleurs, typographie, box model (Module 3)
- Flexbox, Grid, responsive design (Module 4)

**Stratégie de style** :
1. **Reset basique** : \`* { box-sizing: border-box; margin: 0; padding: 0; }\`
2. **Couleurs** : choisis 2-3 couleurs cohérentes (ex: fond foncé pour header/footer, couleur d'accent pour les liens)
3. **Typographie** : une police pour les titres, une pour le texte, un bon \`line-height\`
4. **Layout** : Flexbox pour la navigation, Grid pour les projets
5. **Responsive** : media query pour passer en 1 colonne sur mobile
6. **Finitions** : \`border-radius\`, ombres (\`box-shadow\`), hover effects

**Palette suggérée** :
- Header/Footer : \`#1e293b\` (bleu foncé) avec texte blanc
- Sections : fond blanc ou \`#f8fafc\` (gris très clair)
- Accent : \`#3b82f6\` (bleu) pour les liens et boutons
- Texte : \`#334155\` (gris foncé)

**Tu as terminé le parcours Pystep !** Après cette leçon, tu auras un portfolio complet et responsive. Bravo pour tout le chemin parcouru depuis ta première balise \`<h1>\` !`,
      examples: [
        {
          code: `<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: Arial, sans-serif; line-height: 1.6; color: #334155; }
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
</style>`,
          description: 'CSS complet pour un portfolio : reset, couleurs, Flexbox nav, Grid projets, responsive',
        },
      ],
    },
    exercise: {
      instructions: `Ajoute le CSS complet à ton portfolio ! Le HTML est déjà prêt (structure de la Partie 1).

1. Un reset basique dans \`<style>\` (\`box-sizing: border-box\`)
2. Un \`<header>\` avec fond coloré et navigation Flexbox
3. Des \`<section>\` centrées avec \`max-width\`
4. Un \`<div>\` avec la classe \`projects-grid\` (Grid 2 colonnes) contenant 2 cartes projet (\`<article>\`)
5. Un \`<footer>\` avec fond coloré et texte centré
6. Au moins un \`@media\` query pour le responsive
7. Le \`<nav>\` doit contenir au moins 3 liens`,
      starterCode: `<style>
  /* Ajoute tout ton CSS ici pour styliser le portfolio */

</style>
<header>
  <nav>
    <a href="#accueil">Accueil</a>
    <a href="#projets">Projets</a>
    <a href="#contact">Contact</a>
  </nav>
</header>
<main>
  <section id="accueil">
    <h1>Mon Portfolio</h1>
    <p>Bienvenue sur mon portfolio. Je suis développeur web junior.</p>
  </section>
  <section id="projets">
    <h2>Mes projets</h2>
    <div class="projects-grid">
      <article>
        <h3>Projet 1</h3>
        <p>Un site vitrine responsive.</p>
      </article>
      <article>
        <h3>Projet 2</h3>
        <p>Une application web interactive.</p>
      </article>
    </div>
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
  <p>&copy; 2026 Mon Portfolio</p>
</footer>`,
      hints: [
        'Commence par le reset (* { box-sizing: border-box; margin: 0; padding: 0; }). Stylise le header avec background-color et display: flex sur nav. Utilise display: grid sur .projects-grid.',
        '* { margin: 0; padding: 0; box-sizing: border-box; }\nbody { font-family: Arial, sans-serif; line-height: 1.6; color: #334155; }\nheader { background-color: #1e293b; color: white; padding: 16px 24px; }\nnav { display: flex; justify-content: flex-end; gap: 20px; }\nnav a { color: white; text-decoration: none; }\nsection { padding: 40px 20px; max-width: 800px; margin: 0 auto; }\n.projects-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }\narticle { border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; }\n@media (max-width: 640px) { .projects-grid { grid-template-columns: 1fr; } }\nfooter { background-color: #1e293b; color: white; text-align: center; padding: 16px; }',
        '<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  body { font-family: Arial, sans-serif; line-height: 1.6; color: #334155; }\n  header { background-color: #1e293b; color: white; padding: 16px 24px; }\n  nav { display: flex; justify-content: flex-end; gap: 20px; }\n  nav a { color: white; text-decoration: none; }\n  section { padding: 40px 20px; max-width: 800px; margin: 0 auto; }\n  h1 { font-size: 2.5rem; margin-bottom: 16px; }\n  h2 { margin-bottom: 20px; }\n  .projects-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }\n  article { border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; background-color: #f8fafc; }\n  article h3 { margin-bottom: 8px; color: #1e293b; }\n  form { display: flex; flex-direction: column; gap: 12px; max-width: 400px; }\n  input, button { padding: 10px; border-radius: 4px; border: 1px solid #e2e8f0; font-size: 16px; }\n  button { background-color: #3b82f6; color: white; border: none; cursor: pointer; }\n  @media (max-width: 640px) { .projects-grid { grid-template-columns: 1fr; } }\n  footer { background-color: #1e293b; color: white; text-align: center; padding: 16px; margin-top: 40px; }\n</style>\n<header>\n  <nav>\n    <a href="#accueil">Accueil</a>\n    <a href="#projets">Projets</a>\n    <a href="#contact">Contact</a>\n  </nav>\n</header>\n<main>\n  <section id="accueil">\n    <h1>Mon Portfolio</h1>\n    <p>Bienvenue sur mon portfolio. Je suis développeur web junior.</p>\n  </section>\n  <section id="projets">\n    <h2>Mes projets</h2>\n    <div class="projects-grid">\n      <article>\n        <h3>Projet 1</h3>\n        <p>Un site vitrine responsive.</p>\n      </article>\n      <article>\n        <h3>Projet 2</h3>\n        <p>Une application web interactive.</p>\n      </article>\n    </div>\n  </section>\n  <section id="contact">\n    <h2>Me contacter</h2>\n    <form>\n      <label for="email">Email :</label>\n      <input type="email" id="email" placeholder="ton@email.com">\n      <button type="submit">Envoyer</button>\n    </form>\n  </section>\n</main>\n<footer>\n  <p>&copy; 2026 Mon Portfolio</p>\n</footer>',
      ],
      tests: [
        { name: 'Un <header> est présent', query: 'header', assert: 'exists' },
        { name: 'Une <nav> est présente', query: 'nav', assert: 'exists' },
        { name: 'Il y a au moins 3 sections', query: 'section', assert: 'count', value: 3 },
        { name: 'Il y a au moins 2 articles (projets)', query: 'article', assert: 'count', value: 2 },
        { name: 'Un <footer> est présent', query: 'footer', assert: 'exists' },
        { name: 'Une balise <style> est présente', query: 'style', assert: 'exists' },
        { name: 'Un <div> est présent', query: 'div', assert: 'exists' },
      ],
    },
  },
]
