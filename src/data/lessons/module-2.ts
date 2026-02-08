import type { Lesson } from '@/types/lesson'

export const module2Lessons: Lesson[] = [
  {
    id: '2.1',
    title: 'Balises sémantiques',
    module: 2,
    order: 1,
    theory: {
      content: `Jusqu'ici, tu as utilisé des balises comme \`<div>\` pour organiser ta page. Mais le HTML propose des balises **sémantiques** qui donnent du **sens** au contenu.

Pourquoi c'est important ?
- **Accessibilité** : les lecteurs d'écran comprennent la structure de ta page
- **SEO** : Google sait quoi indexer en priorité
- **Lisibilité** : ton code est plus clair pour toi et les autres développeurs

Les balises sémantiques principales :
- \`<header>\` : l'en-tête de la page (logo, titre, navigation)
- \`<nav>\` : la navigation principale (liens de menu)
- \`<main>\` : le contenu principal (unique par page !)
- \`<footer>\` : le pied de page (copyright, liens secondaires)

Avant, on écrivait \`<div class="header">\`. Maintenant, on écrit directement \`<header>\`. C'est plus propre et plus accessible !`,
      examples: [
        {
          code: `<header>
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
  <p>&copy; 2026 Mon site</p>
</footer>`,
          description: 'Page structurée avec des balises sémantiques',
        },
      ],
    },
    exercise: {
      instructions: 'Crée une page avec un <header> contenant un <h1> et un <nav> (avec au moins un lien <a>), un <main> avec du contenu, et un <footer>.',
      starterCode: '<!-- Structure ta page avec des balises sémantiques -->\n',
      hints: [
        'Commence par <header>, puis <main>, puis <footer>. Mets un <h1> et un <nav> dans le header.',
        '<header>\n  <h1>Titre</h1>\n  <nav><a href="#">Lien</a></nav>\n</header>\n<main>...</main>\n<footer>...</footer>',
        '<header>\n  <h1>Mon site</h1>\n  <nav><a href="#accueil">Accueil</a></nav>\n</header>\n<main>\n  <p>Bienvenue !</p>\n</main>\n<footer>\n  <p>&copy; 2026</p>\n</footer>',
      ],
      tests: [
        { name: 'Un <header> est présent', query: 'header', assert: 'exists' },
        { name: 'Un <nav> est présent', query: 'nav', assert: 'exists' },
        { name: 'Un <main> est présent', query: 'main', assert: 'exists' },
        { name: 'Un <footer> est présent', query: 'footer', assert: 'exists' },
        { name: 'Un <h1> est dans le header', query: 'header h1', assert: 'exists' },
      ],
    },
  },
  {
    id: '2.2',
    title: 'Sections et articles',
    module: 2,
    order: 2,
    theory: {
      content: `Pour organiser le contenu à l'intérieur de ta page, HTML propose trois balises très utiles :

- \`<section>\` : regroupe du contenu **thématique** (un chapitre, une catégorie)
- \`<article>\` : contenu **autonome** qui pourrait exister seul (article de blog, commentaire, fiche produit)
- \`<aside>\` : contenu **secondaire** lié au contenu principal (sidebar, note, publicité)

**Quand utiliser quoi ?**
- Le contenu peut être partagé seul ? → \`<article>\`
- Le contenu regroupe des éléments liés ? → \`<section>\`
- Le contenu est complémentaire ? → \`<aside>\`

Un \`<article>\` peut contenir des \`<section>\`, et une \`<section>\` peut contenir des \`<article>\`. Il n'y a pas de hiérarchie stricte entre eux.`,
      examples: [
        {
          code: `<main>
  <section>
    <h2>Mes articles</h2>
    <article>
      <h3>Premier article</h3>
      <p>Contenu de l'article...</p>
    </article>
  </section>
  <aside>
    <p>À propos de l'auteur</p>
  </aside>
</main>`,
          description: 'Section avec un article et un aside',
        },
      ],
    },
    exercise: {
      instructions: 'Crée une page avec un <main> contenant une <section> (avec un <h2> et un <article> qui a un <h3>), et un <aside> avec du texte.',
      starterCode: '<!-- Organise ton contenu avec section, article et aside -->\n',
      hints: [
        'Mets une <section> et un <aside> dans le <main>. La section contient un <article>.',
        '<main>\n  <section>\n    <h2>Titre</h2>\n    <article><h3>...</h3><p>...</p></article>\n  </section>\n  <aside><p>...</p></aside>\n</main>',
        '<main>\n  <section>\n    <h2>Blog</h2>\n    <article>\n      <h3>Mon premier post</h3>\n      <p>Bienvenue sur mon blog !</p>\n    </article>\n  </section>\n  <aside>\n    <p>À propos de moi</p>\n  </aside>\n</main>',
      ],
      tests: [
        { name: 'Une <section> est présente', query: 'section', assert: 'exists' },
        { name: 'Un <article> est présent', query: 'article', assert: 'exists' },
        { name: 'Un <aside> est présent', query: 'aside', assert: 'exists' },
        { name: 'Un <h3> est dans l\'article', query: 'article h3', assert: 'exists' },
      ],
    },
  },
  {
    id: '2.3',
    title: 'Formulaires basiques',
    module: 2,
    order: 3,
    theory: {
      content: `Les **formulaires** permettent aux utilisateurs d'envoyer des données. C'est ce qui rend un site interactif !

Les balises essentielles :
- \`<form>\` : le conteneur du formulaire
- \`<input>\` : un champ de saisie (texte, email, mot de passe...)
- \`<label>\` : l'étiquette associée à un champ (très important pour l'accessibilité !)
- \`<button>\` : le bouton d'envoi

**L'attribut \`for\`** du label doit correspondre à l'**\`id\`** de l'input :
\`\`\`html
<label for="email">Email :</label>
<input type="email" id="email">
\`\`\`

Types d'input courants :
- \`type="text"\` : texte libre
- \`type="email"\` : adresse email (validation automatique)
- \`type="password"\` : mot de passe (texte masqué)

Attributs utiles : \`placeholder\` (texte d'aide), \`required\` (champ obligatoire).`,
      examples: [
        {
          code: `<form>
  <label for="email">Email :</label>
  <input type="email" id="email" placeholder="ton@email.com" required>
  <button type="submit">Envoyer</button>
</form>`,
          description: 'Formulaire simple avec un champ email',
        },
      ],
    },
    exercise: {
      instructions: 'Crée un formulaire (<form>) avec un champ nom (input text + label), un champ email (input email + label) et un bouton "Envoyer".',
      starterCode: '<!-- Crée ton formulaire ici -->\n',
      hints: [
        'Utilise <form> comme conteneur. Chaque champ a un <label> et un <input>.',
        '<form>\n  <label for="nom">Nom :</label>\n  <input type="text" id="nom">\n  <label for="email">Email :</label>\n  <input type="email" id="email">\n  <button>Envoyer</button>\n</form>',
        '<form>\n  <label for="nom">Nom :</label>\n  <input type="text" id="nom" placeholder="Ton nom">\n  <label for="email">Email :</label>\n  <input type="email" id="email" placeholder="ton@email.com">\n  <button type="submit">Envoyer</button>\n</form>',
      ],
      tests: [
        { name: 'Un <form> est présent', query: 'form', assert: 'exists' },
        { name: 'Un champ texte est présent', query: 'input[type="text"]', assert: 'exists' },
        { name: 'Un champ email est présent', query: 'input[type="email"]', assert: 'exists' },
        { name: 'Un bouton est présent', query: 'button', assert: 'exists' },
        { name: 'Au moins 2 labels', query: 'label', assert: 'count', value: 2 },
      ],
    },
  },
  {
    id: '2.4',
    title: 'Les tableaux',
    module: 2,
    order: 4,
    theory: {
      content: `Les **tableaux** servent à afficher des données structurées en lignes et colonnes (horaires, classements, comparatifs...).

Les balises de tableau :
- \`<table>\` : le conteneur du tableau
- \`<thead>\` : l'en-tête du tableau (titres des colonnes)
- \`<tbody>\` : le corps du tableau (les données)
- \`<tr>\` : une ligne (Table Row)
- \`<th>\` : une cellule d'en-tête (Table Header) - texte en gras
- \`<td>\` : une cellule de données (Table Data)

**Attention** : les tableaux ne doivent **pas** être utilisés pour la mise en page ! Ils sont réservés aux données tabulaires. Pour la mise en page, on utilise le CSS (tu verras ça au Module 3).

**Mini-projet** : dans l'exercice, tu vas créer une page de contact complète en combinant tout ce que tu as appris dans le Module 2 !`,
      examples: [
        {
          code: `<table>
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
    <tr>
      <td>Bob</td>
      <td>bob@email.com</td>
    </tr>
  </tbody>
</table>`,
          description: 'Tableau simple avec en-tête et données',
        },
      ],
    },
    exercise: {
      instructions: `Mini-projet : crée une page de contact complète !

1. Un <header> avec un titre et un <nav>
2. Un <main> avec un formulaire de contact (nom + email + bouton)
3. Un tableau des horaires d'ouverture (au moins 2 colonnes et 3 lignes)
4. Un <footer>`,
      starterCode: '<!-- Mini-projet : page de contact complète -->\n<!-- Combine header, formulaire, tableau et footer -->\n',
      hints: [
        'Structure : <header> → <main> (formulaire + tableau) → <footer>. Le tableau doit avoir un <thead> avec <th> et un <tbody> avec des <tr>/<td>.',
        '<header><h1>Contact</h1><nav><a href="#">Accueil</a></nav></header>\n<main>\n  <form>...</form>\n  <table><thead><tr><th>Jour</th><th>Horaires</th></tr></thead><tbody>...</tbody></table>\n</main>\n<footer>...</footer>',
        '<header>\n  <h1>Contactez-nous</h1>\n  <nav><a href="#">Accueil</a></nav>\n</header>\n<main>\n  <form>\n    <label for="nom">Nom :</label>\n    <input type="text" id="nom">\n    <label for="email">Email :</label>\n    <input type="email" id="email">\n    <button type="submit">Envoyer</button>\n  </form>\n  <table>\n    <thead>\n      <tr><th>Jour</th><th>Horaires</th></tr>\n    </thead>\n    <tbody>\n      <tr><td>Lundi</td><td>9h-17h</td></tr>\n      <tr><td>Mardi</td><td>9h-17h</td></tr>\n    </tbody>\n  </table>\n</main>\n<footer><p>&copy; 2026</p></footer>',
      ],
      tests: [
        { name: 'Un <header> est présent', query: 'header', assert: 'exists' },
        { name: 'Un <form> est présent', query: 'form', assert: 'exists' },
        { name: 'Un <table> est présent', query: 'table', assert: 'exists' },
        { name: 'Au moins 2 cellules d\'en-tête', query: 'th', assert: 'count', value: 2 },
        { name: 'Au moins 3 lignes dans le tableau', query: 'tr', assert: 'count', value: 3 },
        { name: 'Un <footer> est présent', query: 'footer', assert: 'exists' },
      ],
    },
  },
]
