import type { Lesson } from '@/types/lesson'

export const module1Lessons: Lesson[] = [
  {
    id: '1.1',
    title: "Qu'est-ce que le HTML ?",
    module: 1,
    order: 1,
    theory: {
      content: `Le **HTML** (HyperText Markup Language) est le langage qui structure le contenu d'une page web.

Chaque page web que tu visites est écrite en HTML. Le navigateur lit ce code et l'affiche sous forme de texte, images, liens...

Le HTML utilise des **balises** pour organiser le contenu. Une balise s'écrit entre chevrons : \`<balise>\`.

La balise la plus simple est \`<h1>\`, qui crée un titre principal.`,
      examples: [
        {
          code: '<h1>Mon premier titre</h1>',
          description: 'Un titre principal en HTML',
          result: 'Mon premier titre',
        },
      ],
    },
    exercise: {
      instructions: "Crée un titre principal avec la balise <h1>. Écris le texte de ton choix à l'intérieur.",
      starterCode: '<!-- Écris ton titre ici -->\n',
      hints: [
        "Un titre s'écrit avec la balise <h1>. N'oublie pas de la fermer avec </h1>.",
        'Ta structure doit ressembler à : <h1>Ton texte ici</h1>',
        '<h1>Bonjour le monde !</h1>',
      ],
      tests: [
        { name: 'Un titre <h1> est présent', query: 'h1', assert: 'exists' },
        { name: 'Le titre contient du texte', query: 'h1', assert: 'hasText' },
      ],
    },
  },
  {
    id: '1.2',
    title: "Structure d'une page",
    module: 1,
    order: 2,
    theory: {
      content: `Chaque page HTML a une **structure de base** obligatoire :

- \`<!DOCTYPE html>\` : dit au navigateur qu'on utilise HTML5
- \`<html>\` : la racine du document
- \`<head>\` : les métadonnées (titre de l'onglet, etc.)
- \`<title>\` : le texte affiché dans l'onglet du navigateur
- \`<body>\` : le contenu visible de la page

C'est comme une maison : le \`<head>\` est le plan, le \`<body>\` est ce qu'on voit.`,
      examples: [
        {
          code: `<!DOCTYPE html>
<html>
  <head>
    <title>Ma page</title>
  </head>
  <body>
    <h1>Bonjour !</h1>
  </body>
</html>`,
          description: 'Structure complète d\'une page HTML',
        },
      ],
    },
    exercise: {
      instructions: 'Crée une page HTML complète avec la structure de base. Ajoute un titre dans <title> et un <h1> dans le body.',
      starterCode: '',
      hints: [
        'Commence par <!DOCTYPE html> puis <html>.',
        'N\'oublie pas le <head> avec un <title> et le <body> avec ton contenu.',
        '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Ma page</title>\n  </head>\n  <body>\n    <h1>Bonjour !</h1>\n  </body>\n</html>',
      ],
      tests: [
        { name: 'La balise <html> est présente', query: 'html', assert: 'exists' },
        { name: 'Le <head> est présent', query: 'head', assert: 'exists' },
        { name: 'Un <title> est défini', query: 'title', assert: 'exists' },
        { name: 'Le <body> est présent', query: 'body', assert: 'exists' },
        { name: 'Un <h1> est dans le body', query: 'body h1', assert: 'exists' },
      ],
    },
  },
  {
    id: '1.3',
    title: 'Les titres et paragraphes',
    module: 1,
    order: 3,
    theory: {
      content: `Le HTML propose **6 niveaux de titres**, de \`<h1>\` (le plus important) à \`<h6>\` (le moins important).

Les **paragraphes** s'écrivent avec la balise \`<p>\`.

La hiérarchie des titres est importante :
- \`<h1>\` : titre principal (1 seul par page)
- \`<h2>\` : sous-titres
- \`<h3>\` à \`<h6>\` : sous-sous-titres

C'est comme un livre : le \`<h1>\` est le titre du livre, les \`<h2>\` sont les chapitres.`,
      examples: [
        {
          code: `<h1>Mon blog</h1>
<h2>Premier article</h2>
<p>Ceci est le contenu de mon article.</p>`,
          description: 'Hiérarchie de titres avec un paragraphe',
        },
      ],
    },
    exercise: {
      instructions: 'Crée une page avec un titre <h1>, un sous-titre <h2> et un paragraphe <p>. Chaque élément doit contenir du texte.',
      starterCode: '<!-- Crée ta hiérarchie de titres ici -->\n',
      hints: [
        'Commence par un <h1>, puis un <h2>, puis un <p>.',
        '<h1>Titre</h1>\n<h2>Sous-titre</h2>\n<p>Texte...</p>',
        '<h1>Ma page</h1>\n<h2>Introduction</h2>\n<p>Bienvenue sur ma page web !</p>',
      ],
      tests: [
        { name: 'Un titre <h1> est présent', query: 'h1', assert: 'exists' },
        { name: 'Un sous-titre <h2> est présent', query: 'h2', assert: 'exists' },
        { name: 'Un paragraphe <p> est présent', query: 'p', assert: 'exists' },
        { name: 'Le titre contient du texte', query: 'h1', assert: 'hasText' },
      ],
    },
  },
  {
    id: '1.4',
    title: 'Les listes',
    module: 1,
    order: 4,
    theory: {
      content: `Il existe deux types de listes en HTML :

**Liste non ordonnée** (\`<ul>\`) : avec des puces
**Liste ordonnée** (\`<ol>\`) : avec des numéros

Chaque élément de la liste est dans une balise \`<li>\`.

Les listes servent à organiser l'information : menus, étapes, ingrédients...`,
      examples: [
        {
          code: `<ul>
  <li>Pommes</li>
  <li>Oranges</li>
  <li>Bananes</li>
</ul>`,
          description: 'Liste non ordonnée de fruits',
        },
        {
          code: `<ol>
  <li>Ouvrir le fichier</li>
  <li>Écrire le code</li>
  <li>Sauvegarder</li>
</ol>`,
          description: 'Liste ordonnée d\'étapes',
        },
      ],
    },
    exercise: {
      instructions: 'Crée une liste non ordonnée (<ul>) contenant exactement 3 éléments (<li>) de ton choix.',
      starterCode: '<!-- Crée ta liste ici -->\n',
      hints: [
        'Utilise <ul> pour la liste et <li> pour chaque élément.',
        '<ul>\n  <li>Premier</li>\n  <li>Deuxième</li>\n  <li>Troisième</li>\n</ul>',
        '<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n  <li>JavaScript</li>\n</ul>',
      ],
      tests: [
        { name: 'Une liste <ul> est présente', query: 'ul', assert: 'exists' },
        { name: '3 éléments <li> dans la liste', query: 'ul li', assert: 'count', value: 3 },
      ],
    },
  },
  {
    id: '1.5',
    title: 'Les liens',
    module: 1,
    order: 5,
    theory: {
      content: `Les **liens** permettent de naviguer entre les pages. On les crée avec la balise \`<a>\`.

L'attribut \`href\` indique l'adresse de destination.

Types de liens :
- Lien externe : \`<a href="https://example.com">Texte</a>\`
- Lien interne : \`<a href="page.html">Texte</a>\`
- Lien email : \`<a href="mailto:hello@pystep.fr">Email</a>\`

L'attribut \`target="_blank"\` ouvre le lien dans un nouvel onglet.`,
      examples: [
        {
          code: '<a href="https://pystep.fr">Visiter Pystep</a>',
          description: 'Un lien vers un site externe',
        },
      ],
    },
    exercise: {
      instructions: 'Crée un lien <a> avec un attribut href qui pointe vers une URL. Le lien doit contenir du texte visible.',
      starterCode: '<!-- Crée ton lien ici -->\n',
      hints: [
        'Utilise <a href="url">texte</a>.',
        'N\'oublie pas de mettre une URL dans l\'attribut href.',
        '<a href="https://pystep.fr">Visiter Pystep</a>',
      ],
      tests: [
        { name: 'Un lien <a> est présent', query: 'a', assert: 'exists' },
        { name: 'Le lien a un attribut href', query: 'a', assert: 'hasAttribute', value: 'href' },
        { name: 'Le lien contient du texte', query: 'a', assert: 'hasText' },
      ],
    },
  },
  {
    id: '1.6',
    title: 'Les images',
    module: 1,
    order: 6,
    theory: {
      content: `Les **images** s'ajoutent avec la balise \`<img>\`. C'est une balise **auto-fermante** (pas de \`</img>\`).

Deux attributs obligatoires :
- \`src\` : l'adresse de l'image
- \`alt\` : le texte alternatif (accessibilité + SEO)

Le texte \`alt\` est essentiel : il décrit l'image pour les lecteurs d'écran et s'affiche si l'image ne charge pas.`,
      examples: [
        {
          code: '<img src="https://picsum.photos/200" alt="Photo aléatoire" />',
          description: 'Une image avec texte alternatif',
        },
      ],
    },
    exercise: {
      instructions: 'Ajoute une image avec la balise <img>. Elle doit avoir un attribut src (URL d\'une image) et un attribut alt (description).',
      starterCode: '<!-- Ajoute ton image ici -->\n',
      hints: [
        'Utilise <img src="url" alt="description" />.',
        'L\'attribut alt est obligatoire pour l\'accessibilité.',
        '<img src="https://picsum.photos/300/200" alt="Un paysage" />',
      ],
      tests: [
        { name: 'Une image <img> est présente', query: 'img', assert: 'exists' },
        { name: "L'image a un attribut src", query: 'img', assert: 'hasAttribute', value: 'src' },
        { name: "L'image a un attribut alt", query: 'img', assert: 'hasAttribute', value: 'alt' },
      ],
    },
  },
]
