import type { Lesson } from '@/types/lesson'

export const module4Lessons: Lesson[] = [
  {
    id: '4.1',
    title: 'Display et positionnement',
    module: 4,
    order: 1,
    theory: {
      content: `Tu connais maintenant le CSS pour styliser du texte et des boîtes. Il est temps de **positionner** les éléments sur ta page !

En CSS, chaque élément est une **boîte** (tu te souviens du box model ?). Mais toutes les boîtes ne se comportent pas pareil.

**\`display: block\`** : l'élément prend toute la largeur disponible et passe à la ligne.
- Par défaut : \`<div>\`, \`<p>\`, \`<h1>\`...

**\`display: inline\`** : l'élément ne prend que la place de son contenu, pas de retour à la ligne.
- Par défaut : \`<span>\`, \`<a>\`, \`<strong>\`...

**\`display: inline-block\`** : comme inline, mais on peut lui donner des dimensions (width, height, padding, margin).

**Le positionnement** :
- \`position: relative\` : décale l'élément par rapport à sa position normale (avec \`top\`, \`left\`, etc.)
- \`position: absolute\` : positionne l'élément par rapport à son **parent positionné** (le premier parent avec \`position: relative\`)
- \`position: fixed\` : fixe l'élément par rapport à la fenêtre (il ne bouge pas au scroll)

**\`z-index\`** : quand des éléments se superposent, \`z-index\` contrôle qui est au-dessus. Plus la valeur est grande, plus l'élément est au premier plan.

L'astuce clé : pour utiliser \`position: absolute\` sur un enfant, le parent doit avoir \`position: relative\` !`,
      examples: [
        {
          code: `<style>
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
  <p>Avec un badge positionné en absolu.</p>
</div>
<div class="inline-example">
  <span>Tag 1</span>
  <span>Tag 2</span>
  <span>Tag 3</span>
</div>`,
          description: 'Un badge positionné en absolu et des tags en inline-block',
        },
      ],
    },
    exercise: {
      instructions: `Crée une carte produit avec positionnement :

1. Un \`<div>\` avec la classe \`container\` (position: relative, bordure, padding, hauteur)
2. À l'intérieur, un \`<div>\` avec la classe \`badge\` contenant le texte "Promo" (position: absolute, en haut à droite)
3. Un \`<h2>\` avec le titre du produit
4. Trois \`<span>\` en inline-block représentant des tags (ex: "HTML", "CSS", "Web")
5. Tout le CSS dans la balise \`<style>\``,
      starterCode: `<style>
  /* Stylise le container, le badge et les spans ici */

</style>
<div class="container">
  <!-- Ajoute le badge, le titre et les tags ici -->

</div>`,
      hints: [
        'Le container doit avoir position: relative pour que le badge (position: absolute) se positionne par rapport à lui. Les spans doivent être en display: inline-block.',
        '.container { position: relative; border: 2px solid #ccc; padding: 40px; height: 200px; }\n.badge { position: absolute; top: 10px; right: 10px; background-color: #ef4444; color: white; padding: 4px 12px; border-radius: 12px; }\nspan { display: inline-block; padding: 8px 16px; margin: 4px; background-color: #dbeafe; border-radius: 4px; }',
        '<style>\n  .container { position: relative; border: 2px solid #ccc; padding: 40px; height: 200px; }\n  .badge { position: absolute; top: 10px; right: 10px; background-color: #ef4444; color: white; padding: 4px 12px; border-radius: 12px; }\n  span { display: inline-block; padding: 8px 16px; margin: 4px; background-color: #dbeafe; border-radius: 4px; }\n</style>\n<div class="container">\n  <div class="badge">Promo</div>\n  <h2>Mon produit</h2>\n  <span>HTML</span>\n  <span>CSS</span>\n  <span>Web</span>\n</div>',
      ],
      tests: [
        { name: 'Un conteneur .container est présent', query: '.container', assert: 'exists' },
        { name: 'Un badge .badge est présent', query: '.badge', assert: 'exists' },
        { name: 'Un <h2> est présent', query: 'h2', assert: 'exists' },
        { name: 'Il y a 3 <span> (tags)', query: 'span', assert: 'count', value: 3 },
        { name: 'Une balise <style> est présente', query: 'style', assert: 'exists' },
      ],
    },
  },
  {
    id: '4.2',
    title: 'Flexbox - Les bases',
    module: 4,
    order: 2,
    theory: {
      content: `**Flexbox** est le système de mise en page le plus utilisé en CSS moderne. Il permet d'aligner et de distribuer des éléments **dans une direction** (ligne ou colonne).

**L'analogie** : imagine une étagère. Flexbox, c'est ranger des livres sur cette étagère — tu choisis comment les espacer, les aligner et les ordonner.

**Comment ça marche ?**
1. On met \`display: flex\` sur le **parent** (le conteneur flex)
2. Les enfants directs deviennent des **flex items**

**Les propriétés du conteneur** :
- \`flex-direction\` : \`row\` (en ligne, par défaut) ou \`column\` (en colonne)
- \`justify-content\` : alignement sur l'axe principal
  - \`flex-start\` (à gauche), \`center\` (centré), \`flex-end\` (à droite)
  - \`space-between\` (espacé, bords collés), \`space-around\` (espacé, bords libres)
- \`align-items\` : alignement sur l'axe secondaire
  - \`flex-start\`, \`center\`, \`flex-end\`, \`stretch\` (étirer)
- \`gap\` : espace entre les items (plus propre que les marges !)

**L'axe principal** : si \`flex-direction: row\`, l'axe principal est horizontal.
**L'axe secondaire** : c'est l'axe perpendiculaire (vertical si row).

Flexbox résout élégamment les problèmes classiques : centrer un élément, espacer une navigation, créer des colonnes égales...`,
      examples: [
        {
          code: `<style>
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
    <a href="#">À propos</a>
    <a href="#">Contact</a>
  </div>
</nav>`,
          description: 'Une barre de navigation Flexbox : logo à gauche, liens à droite',
        },
      ],
    },
    exercise: {
      instructions: `Crée une barre de navigation avec Flexbox :

1. Un \`<nav>\` avec la classe \`navbar\` (display: flex, justify-content: space-between, fond foncé)
2. Un \`<div>\` avec la classe \`logo\` contenant le nom du site
3. Un \`<div>\` avec la classe \`nav-links\` contenant au moins 3 liens \`<a>\`
4. Les liens doivent être espacés avec \`gap\`
5. Tout le CSS dans la balise \`<style>\``,
      starterCode: `<style>
  /* Crée ta navbar Flexbox ici */

</style>
<nav class="navbar">
  <!-- Logo à gauche, liens à droite -->

</nav>`,
      hints: [
        'Mets display: flex et justify-content: space-between sur .navbar. Le .nav-links est aussi un flex container avec gap pour espacer les liens.',
        '.navbar { display: flex; justify-content: space-between; align-items: center; background-color: #1e293b; color: white; padding: 12px 24px; }\n.nav-links { display: flex; gap: 16px; }\n.nav-links a { color: white; text-decoration: none; }',
        '<style>\n  .navbar { display: flex; justify-content: space-between; align-items: center; background-color: #1e293b; color: white; padding: 12px 24px; }\n  .nav-links { display: flex; gap: 16px; }\n  .nav-links a { color: white; text-decoration: none; }\n</style>\n<nav class="navbar">\n  <div class="logo">MonSite</div>\n  <div class="nav-links">\n    <a href="#">Accueil</a>\n    <a href="#">À propos</a>\n    <a href="#">Contact</a>\n  </div>\n</nav>',
      ],
      tests: [
        { name: 'Un <nav> est présent', query: 'nav', assert: 'exists' },
        { name: 'La classe .navbar est utilisée', query: '.navbar', assert: 'exists' },
        { name: 'Un logo .logo est présent', query: '.logo', assert: 'exists' },
        { name: 'Il y a au moins 3 liens <a>', query: 'a', assert: 'count', value: 3 },
        { name: 'Une balise <style> est présente', query: 'style', assert: 'exists' },
      ],
    },
  },
  {
    id: '4.3',
    title: 'Flexbox - Avancé',
    module: 4,
    order: 3,
    theory: {
      content: `Tu maîtrises les bases de Flexbox. Passons aux propriétés avancées qui te permettront de créer des mises en page flexibles et adaptatives !

**\`flex-wrap: wrap\`** : par défaut, les flex items restent sur une seule ligne. Avec \`wrap\`, ils passent à la ligne quand l'espace manque. Indispensable pour les grilles de cartes !

**\`gap\`** : tu le connais déjà, mais sache qu'il remplace avantageusement les marges pour espacer les items. Un seul \`gap: 16px\` au lieu de \`margin\` sur chaque item.

**Les propriétés des flex items** :
- \`flex-grow\` : combien un item peut **grandir** pour remplir l'espace. \`flex-grow: 1\` = prend tout l'espace disponible.
- \`flex-shrink\` : combien un item peut **rétrécir**. Par défaut : 1.
- \`flex-basis\` : la taille **initiale** de l'item avant grow/shrink.
- **Le raccourci \`flex\`** : \`flex: 1\` = \`flex-grow: 1; flex-shrink: 1; flex-basis: 0\`

**\`order\`** : réordonne visuellement les items sans toucher au HTML. Par défaut : 0. Un item avec \`order: -1\` passe en premier.

**Cas pratique : grille de cartes**
La combinaison \`flex-wrap: wrap\` + \`flex: 1 1 250px\` crée des cartes qui s'adaptent automatiquement à l'espace disponible. Si 3 cartes tiennent sur une ligne, elles y seront. Sinon, elles passent à la ligne.`,
      examples: [
        {
          code: `<style>
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
</div>`,
          description: 'Une grille de cartes adaptative avec flex-wrap',
        },
      ],
    },
    exercise: {
      instructions: `Crée une grille de 3 cartes adaptatives avec Flexbox :

1. Un \`<div>\` avec la classe \`card-grid\` (display: flex, flex-wrap: wrap, gap)
2. 3 \`<div>\` avec la classe \`card\` (flex: 1 1 250px, bordure, padding, coins arrondis)
3. Chaque carte contient un \`<h3>\` (titre) et un \`<p>\` (description)
4. Tout le CSS dans la balise \`<style>\``,
      starterCode: `<style>
  /* Crée ta grille de cartes Flexbox ici */

</style>
<div class="card-grid">
  <!-- Ajoute 3 cartes ici -->

</div>`,
      hints: [
        'Le conteneur .card-grid doit avoir display: flex, flex-wrap: wrap et gap. Chaque .card utilise flex: 1 1 250px pour être adaptative.',
        '.card-grid { display: flex; flex-wrap: wrap; gap: 16px; }\n.card { flex: 1 1 250px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; background-color: #f8fafc; }\n.card h3 { margin-top: 0; }',
        '<style>\n  .card-grid { display: flex; flex-wrap: wrap; gap: 16px; }\n  .card { flex: 1 1 250px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; background-color: #f8fafc; }\n  .card h3 { margin-top: 0; }\n</style>\n<div class="card-grid">\n  <div class="card">\n    <h3>Carte 1</h3>\n    <p>Description de la première carte.</p>\n  </div>\n  <div class="card">\n    <h3>Carte 2</h3>\n    <p>Description de la deuxième carte.</p>\n  </div>\n  <div class="card">\n    <h3>Carte 3</h3>\n    <p>Description de la troisième carte.</p>\n  </div>\n</div>',
      ],
      tests: [
        { name: 'Un conteneur .card-grid est présent', query: '.card-grid', assert: 'exists' },
        { name: 'Il y a 3 cartes .card', query: '.card', assert: 'count', value: 3 },
        { name: 'Il y a 3 titres <h3>', query: 'h3', assert: 'count', value: 3 },
        { name: 'Une balise <style> est présente', query: 'style', assert: 'exists' },
      ],
    },
  },
  {
    id: '4.4',
    title: 'Introduction à Grid',
    module: 4,
    order: 4,
    theory: {
      content: `**CSS Grid** est le deuxième grand système de mise en page CSS. Alors que Flexbox travaille en **une dimension** (ligne OU colonne), Grid travaille en **deux dimensions** (lignes ET colonnes) !

**Comment ça marche ?**
1. On met \`display: grid\` sur le parent
2. On définit les colonnes avec \`grid-template-columns\`
3. Les enfants se placent automatiquement dans la grille

**Les propriétés essentielles** :
- \`grid-template-columns\` : définit les colonnes
  - \`1fr 1fr 1fr\` = 3 colonnes égales
  - \`repeat(3, 1fr)\` = même chose, plus court
  - \`200px 1fr\` = 1 colonne fixe + 1 flexible
- \`grid-template-rows\` : définit les rangées
- \`gap\` : espacement entre les cellules (fonctionne comme en Flexbox)

**L'unité \`fr\`** (fraction) : partage l'espace disponible. \`1fr 2fr\` = 2 colonnes, la deuxième fait le double de la première.

**Placer un élément sur plusieurs colonnes** :
- \`grid-column: 1 / 3\` : l'élément s'étend de la colonne 1 à 3
- \`grid-column: 1 / -1\` : l'élément s'étend sur TOUTE la largeur

**Flexbox vs Grid : quand utiliser quoi ?**
- **Flexbox** : mise en page en une dimension (navigation, barre d'outils, liste d'items)
- **Grid** : mise en page en deux dimensions (galerie, dashboard, layout de page)
- En pratique, on utilise les deux ensemble !`,
      examples: [
        {
          code: `<style>
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
</div>`,
          description: 'Une grille CSS Grid avec un élément en vedette pleine largeur',
        },
      ],
    },
    exercise: {
      instructions: `Crée une galerie en CSS Grid :

1. Un \`<div>\` avec la classe \`grid-layout\` (display: grid, 3 colonnes, gap)
2. Un premier \`<div>\` avec les classes \`grid-item\` et \`featured\` qui s'étend sur toute la largeur (grid-column: 1 / -1)
3. 3 autres \`<div>\` avec la classe \`grid-item\` (un par colonne)
4. Chaque item contient du texte
5. Tout le CSS dans la balise \`<style>\``,
      starterCode: `<style>
  /* Crée ta grille CSS Grid ici */

</style>
<div class="grid-layout">
  <!-- Ajoute l'élément featured + 3 items ici -->

</div>`,
      hints: [
        'Le .grid-layout utilise display: grid et grid-template-columns: repeat(3, 1fr). L\'élément .featured utilise grid-column: 1 / -1 pour prendre toute la largeur.',
        '.grid-layout { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }\n.grid-item { background-color: #dbeafe; padding: 20px; border-radius: 8px; text-align: center; }\n.featured { grid-column: 1 / -1; background-color: #bfdbfe; }',
        '<style>\n  .grid-layout { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }\n  .grid-item { background-color: #dbeafe; padding: 20px; border-radius: 8px; text-align: center; }\n  .featured { grid-column: 1 / -1; background-color: #bfdbfe; }\n</style>\n<div class="grid-layout">\n  <div class="grid-item featured">Article en vedette</div>\n  <div class="grid-item">Article 1</div>\n  <div class="grid-item">Article 2</div>\n  <div class="grid-item">Article 3</div>\n</div>',
      ],
      tests: [
        { name: 'Un conteneur .grid-layout est présent', query: '.grid-layout', assert: 'exists' },
        { name: 'Il y a 4 éléments .grid-item', query: '.grid-item', assert: 'count', value: 4 },
        { name: 'Un élément .featured est présent', query: '.featured', assert: 'exists' },
        { name: 'Une balise <style> est présente', query: 'style', assert: 'exists' },
      ],
    },
  },
  {
    id: '4.5',
    title: 'Responsive design',
    module: 4,
    order: 5,
    theory: {
      content: `Le **responsive design**, c'est faire en sorte que ton site s'affiche bien sur **tous les écrans** : mobile, tablette et desktop.

**Les media queries** : du CSS conditionnel selon la taille de l'écran.

\`\`\`
@media (max-width: 768px) {
  /* Ce CSS s'applique seulement si l'écran fait 768px ou moins */
}
\`\`\`

**L'approche mobile-first** (recommandée) :
1. Tu écris d'abord le CSS pour **mobile** (par défaut)
2. Tu ajoutes des media queries \`min-width\` pour **élargir** sur les grands écrans

\`\`\`
/* Mobile (par défaut) */
.layout { grid-template-columns: 1fr; }

/* Tablette et plus */
@media (min-width: 768px) {
  .layout { grid-template-columns: 2fr 1fr; }
}
\`\`\`

**Les breakpoints courants** :
- \`640px\` : petit mobile → grand mobile
- \`768px\` : mobile → tablette
- \`1024px\` : tablette → desktop

**Combinaison gagnante** : Grid ou Flexbox + media queries = layouts qui s'adaptent automatiquement. Par exemple, un layout 2 colonnes sur desktop qui passe en 1 colonne sur mobile.

**La meta viewport** : \`<meta name="viewport" content="width=device-width, initial-scale=1.0">\` est indispensable. Elle est déjà incluse dans les pages HTML modernes.

C'est le dernier concept clé avant le projet final. Avec Flexbox, Grid et les media queries, tu as tous les outils pour créer des layouts professionnels !`,
      examples: [
        {
          code: `<style>
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
    <p>Sur mobile : en dessous. Sur desktop : à droite.</p>
  </div>
</div>`,
          description: 'Un layout responsive : 1 colonne sur mobile, 2 colonnes sur desktop',
        },
      ],
    },
    exercise: {
      instructions: `Mini-projet : crée un layout de blog responsive !

1. Un \`<header>\` avec un titre et une navigation (utilise Flexbox pour la nav)
2. Un \`<div>\` avec la classe \`layout\` (CSS Grid)
3. Un \`<div>\` avec la classe \`main-content\` (contenu principal avec titre et paragraphe)
4. Un \`<div>\` avec la classe \`sidebar\` (barre latérale avec titre et paragraphe)
5. Un \`<footer>\` avec du texte centré
6. Une \`@media\` query : 1 colonne sur mobile, 2 colonnes sur desktop (min-width: 768px)`,
      starterCode: `<style>
  /* Crée ton layout responsive ici */

</style>
<!-- Crée le header, le layout (main-content + sidebar) et le footer -->
`,
      hints: [
        'Utilise display: grid sur .layout avec grid-template-columns: 1fr par défaut (mobile). Ajoute @media (min-width: 768px) { .layout { grid-template-columns: 2fr 1fr; } } pour le desktop.',
        'header { background-color: #1e293b; color: white; padding: 16px 24px; }\n.layout { display: grid; grid-template-columns: 1fr; gap: 20px; max-width: 1000px; margin: 0 auto; padding: 20px; }\n@media (min-width: 768px) { .layout { grid-template-columns: 2fr 1fr; } }\n.main-content { background-color: #f0fdf4; padding: 20px; border-radius: 8px; }\n.sidebar { background-color: #fef3c7; padding: 20px; border-radius: 8px; }\nfooter { text-align: center; padding: 16px; color: #6b7280; }',
        '<style>\n  header { background-color: #1e293b; color: white; padding: 16px 24px; }\n  header nav { display: flex; gap: 16px; }\n  header a { color: white; text-decoration: none; }\n  .layout { display: grid; grid-template-columns: 1fr; gap: 20px; max-width: 1000px; margin: 0 auto; padding: 20px; }\n  @media (min-width: 768px) { .layout { grid-template-columns: 2fr 1fr; } }\n  .main-content { background-color: #f0fdf4; padding: 20px; border-radius: 8px; }\n  .sidebar { background-color: #fef3c7; padding: 20px; border-radius: 8px; }\n  footer { text-align: center; padding: 16px; color: #6b7280; }\n</style>\n<header>\n  <h1>Mon Blog</h1>\n  <nav>\n    <a href="#">Accueil</a>\n    <a href="#">Articles</a>\n    <a href="#">Contact</a>\n  </nav>\n</header>\n<div class="layout">\n  <div class="main-content">\n    <h2>Bienvenue</h2>\n    <p>Ceci est le contenu principal de mon blog responsive.</p>\n  </div>\n  <div class="sidebar">\n    <h3>À propos</h3>\n    <p>Un blog pour partager mes découvertes en développement web.</p>\n  </div>\n</div>\n<footer>\n  <p>&copy; 2026 Mon Blog</p>\n</footer>',
      ],
      tests: [
        { name: 'Un <header> est présent', query: 'header', assert: 'exists' },
        { name: 'Un layout .layout est présent', query: '.layout', assert: 'exists' },
        { name: 'Un contenu .main-content est présent', query: '.main-content', assert: 'exists' },
        { name: 'Une sidebar .sidebar est présente', query: '.sidebar', assert: 'exists' },
        { name: 'Un <footer> est présent', query: 'footer', assert: 'exists' },
        { name: 'Une balise <style> est présente', query: 'style', assert: 'exists' },
      ],
    },
  },
]
