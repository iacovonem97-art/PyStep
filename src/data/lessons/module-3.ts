import type { Lesson } from '@/types/lesson'

export const module3Lessons: Lesson[] = [
  {
    id: '3.1',
    title: "Qu'est-ce que le CSS ?",
    module: 3,
    order: 1,
    theory: {
      content: `Jusqu'ici, tu as créé des pages HTML... mais elles sont un peu tristes, non ? C'est là que le **CSS** entre en jeu !

**CSS** = Cascading Style Sheets (feuilles de style en cascade). C'est le langage qui **met en forme** le HTML.

Une analogie simple :
- **HTML** = la structure d'une maison (murs, toit, pièces)
- **CSS** = la décoration (couleurs, meubles, rideaux)

**La syntaxe CSS** est simple :
\`\`\`
sélecteur {
  propriété: valeur;
}
\`\`\`

Exemple : \`h1 { color: blue; }\` → tous les \`<h1>\` seront en bleu.

**Comment ajouter du CSS ?** Il y a 3 méthodes :
1. **Inline** : directement dans la balise (\`style="color: red;"\`)
2. **Balise \`<style>\`** : dans le HTML (c'est ce qu'on utilise dans Pystep !)
3. **Fichier externe** : un fichier \`.css\` séparé (la méthode pro)

**Les sélecteurs de base** :
- \`h1\` : sélectionne toutes les balises \`<h1>\`
- \`.ma-classe\` : sélectionne les éléments avec \`class="ma-classe"\`
- \`#mon-id\` : sélectionne l'élément avec \`id="mon-id"\`

Prêt à donner vie à tes pages ? C'est parti !`,
      examples: [
        {
          code: `<style>
  h1 {
    color: blue;
  }
  p {
    color: gray;
  }
</style>
<h1>Mon titre en bleu</h1>
<p>Mon paragraphe en gris</p>`,
          description: 'Premier CSS : changer la couleur du texte',
        },
      ],
    },
    exercise: {
      instructions: 'Ajoute du CSS dans la balise <style> pour que le <h1> soit en rouge et le <p> soit en bleu. Le HTML est déjà écrit, tu dois juste ajouter les règles CSS.',
      starterCode: `<style>
  /* Écris ton CSS ici */

</style>
<h1>Bienvenue</h1>
<p>Le CSS, c'est magique !</p>`,
      hints: [
        'Dans le bloc <style>, écris une règle pour h1 et une pour p. Ex: h1 { color: red; }',
        'h1 { color: red; }\np { color: blue; }',
        '<style>\n  h1 { color: red; }\n  p { color: blue; }\n</style>\n<h1>Bienvenue</h1>\n<p>Le CSS, c\'est magique !</p>',
      ],
      tests: [
        { name: 'Un <h1> est présent', query: 'h1', assert: 'exists' },
        { name: 'Un <p> est présent', query: 'p', assert: 'exists' },
        { name: 'Une balise <style> est présente', query: 'style', assert: 'exists' },
      ],
    },
  },
  {
    id: '3.2',
    title: 'Couleurs et arrière-plans',
    module: 3,
    order: 2,
    theory: {
      content: `Maintenant que tu connais la syntaxe CSS, explorons les **couleurs** plus en détail !

**\`color\`** : change la couleur du **texte**
**\`background-color\`** : change la couleur de **fond**

Il y a plusieurs façons d'écrire une couleur :
- **Par nom** : \`red\`, \`blue\`, \`green\`, \`tomato\`, \`steelblue\`...
- **En hexadécimal** : \`#ff0000\` (rouge), \`#3b82f6\` (bleu), \`#000\` (noir)
- **En RGB** : \`rgb(255, 0, 0)\` (rouge), \`rgb(59, 130, 246)\` (bleu)

**Conseil pour la lisibilité** : assure-toi que le texte contraste bien avec le fond ! Texte clair sur fond foncé, ou texte foncé sur fond clair.

La propriété raccourcie \`background\` peut aussi être utilisée à la place de \`background-color\`.`,
      examples: [
        {
          code: `<style>
  body {
    background-color: #f0f0f0;
  }
  h1 {
    color: #2563eb;
    background-color: #dbeafe;
  }
</style>
<h1>Titre avec fond coloré</h1>
<p>Texte sur fond gris clair</p>`,
          description: 'Couleurs de texte et d\'arrière-plan',
        },
      ],
    },
    exercise: {
      instructions: 'Crée une page avec un <h1> coloré, un <p> avec du texte, et une <div> contenant du texte avec un fond de couleur différente. Utilise la balise <style> pour tout le CSS.',
      starterCode: `<style>
  /* Style le h1, le p et le div ici */

</style>
<h1>Mon titre</h1>
<p>Un paragraphe de texte.</p>
<div>Une boîte colorée</div>`,
      hints: [
        'Ajoute des règles CSS pour h1 { color: ... }, p { color: ... } et div { background-color: ... }',
        'h1 { color: #2563eb; }\ndiv { background-color: #fef3c7; }',
        '<style>\n  h1 { color: #2563eb; }\n  p { color: #374151; }\n  div { background-color: #fef3c7; color: #92400e; }\n</style>\n<h1>Mon titre</h1>\n<p>Un paragraphe de texte.</p>\n<div>Une boîte colorée</div>',
      ],
      tests: [
        { name: 'Un <h1> est présent', query: 'h1', assert: 'exists' },
        { name: 'Un <div> est présent', query: 'div', assert: 'exists' },
        { name: 'Une balise <style> est présente', query: 'style', assert: 'exists' },
        { name: 'Le <div> contient du texte', query: 'div', assert: 'hasText' },
      ],
    },
  },
  {
    id: '3.3',
    title: 'Typographie',
    module: 3,
    order: 3,
    theory: {
      content: `La **typographie** est l'art de rendre le texte beau et lisible. Le CSS offre de nombreuses propriétés pour contrôler l'apparence du texte.

**Les propriétés de police** :
- \`font-family\` : la police de caractères (\`Arial\`, \`Georgia\`, \`monospace\`...)
- \`font-size\` : la taille du texte (\`16px\`, \`24px\`, \`2rem\`...)
- \`font-weight\` : la graisse (\`normal\`, \`bold\`, \`100\` à \`900\`)

**Les propriétés de texte** :
- \`text-align\` : l'alignement (\`left\`, \`center\`, \`right\`, \`justify\`)
- \`line-height\` : l'interligne (conseil : \`1.5\` pour une bonne lisibilité)
- \`text-decoration\` : souligné (\`underline\`), barré (\`line-through\`), aucun (\`none\`)

**Familles de polices génériques** (toujours disponibles) :
- \`serif\` : avec empattements (Georgia, Times)
- \`sans-serif\` : sans empattements (Arial, Helvetica)
- \`monospace\` : largeur fixe (Courier, pour le code)

**Bonne pratique** : liste toujours une police générique en dernier : \`font-family: Arial, sans-serif;\``,
      examples: [
        {
          code: `<style>
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
<h1>Titre élégant</h1>
<p>Un paragraphe lisible avec un bon interligne. La typographie fait toute la différence !</p>`,
          description: 'Typographie : polices, tailles et alignement',
        },
      ],
    },
    exercise: {
      instructions: 'Stylise un titre (<h1>) centré en 36px avec une police serif, et un paragraphe (<p>) en 18px avec une police sans-serif. Ajoute un bon interligne au paragraphe.',
      starterCode: `<style>
  /* Stylise le h1 et le p ici */

</style>
<h1>Mon titre stylé</h1>
<p>Ce paragraphe devrait être facile à lire grâce à une bonne typographie.</p>`,
      hints: [
        'Utilise font-family, font-size et text-align pour le h1. Ajoute line-height au p.',
        'h1 { font-family: Georgia, serif; font-size: 36px; text-align: center; }\np { font-family: Arial, sans-serif; font-size: 18px; line-height: 1.5; }',
        '<style>\n  h1 {\n    font-family: Georgia, serif;\n    font-size: 36px;\n    text-align: center;\n  }\n  p {\n    font-family: Arial, sans-serif;\n    font-size: 18px;\n    line-height: 1.5;\n  }\n</style>\n<h1>Mon titre stylé</h1>\n<p>Ce paragraphe devrait être facile à lire grâce à une bonne typographie.</p>',
      ],
      tests: [
        { name: 'Un <h1> est présent', query: 'h1', assert: 'exists' },
        { name: 'Un <p> est présent', query: 'p', assert: 'exists' },
        { name: 'Une balise <style> est présente', query: 'style', assert: 'exists' },
        { name: 'Le <h1> contient du texte', query: 'h1', assert: 'hasText' },
      ],
    },
  },
  {
    id: '3.4',
    title: 'Le modèle de boîte',
    module: 3,
    order: 4,
    theory: {
      content: `En CSS, **tout élément HTML est une boîte** rectangulaire. Comprendre le **modèle de boîte** (box model) est essentiel !

Du centre vers l'extérieur, une boîte se compose de :
1. **Contenu** : le texte ou l'image
2. **\`padding\`** : l'espace intérieur (entre le contenu et la bordure)
3. **\`border\`** : la bordure visible
4. **\`margin\`** : l'espace extérieur (entre la boîte et les autres éléments)

**Padding** (espace intérieur) :
- \`padding: 20px;\` → 20px partout
- \`padding: 10px 20px;\` → 10px haut/bas, 20px gauche/droite

**Border** (bordure) :
- \`border: 2px solid black;\` → bordure noire de 2px
- \`border-radius: 8px;\` → coins arrondis !

**Margin** (espace extérieur) :
- \`margin: 16px;\` → 16px partout
- \`margin: 0 auto;\` → centrer horizontalement

L'astuce \`margin: 0 auto;\` est très utilisée pour centrer un élément dans sa page !`,
      examples: [
        {
          code: `<style>
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
</div>`,
          description: 'Le modèle de boîte en action : une carte stylisée',
        },
      ],
    },
    exercise: {
      instructions: 'Crée une "carte" : une <div> avec la classe "card" contenant un <h2> et un <p>. Stylise-la avec une bordure, du padding, du margin, des coins arrondis et un fond coloré.',
      starterCode: `<style>
  /* Stylise la carte ici */

</style>
<div class="card">
  <h2>Ma carte</h2>
  <p>Le modèle de boîte, c'est la base du CSS !</p>
</div>`,
      hints: [
        'Utilise le sélecteur .card { } pour cibler la div. Ajoute border, padding, margin, border-radius et background-color.',
        '.card {\n  border: 2px solid #3b82f6;\n  border-radius: 8px;\n  padding: 20px;\n  margin: 16px;\n  background-color: #eff6ff;\n}',
        '<style>\n  .card {\n    border: 2px solid #3b82f6;\n    border-radius: 8px;\n    padding: 20px;\n    margin: 16px;\n    background-color: #eff6ff;\n  }\n</style>\n<div class="card">\n  <h2>Ma carte</h2>\n  <p>Le modèle de boîte, c\'est la base du CSS !</p>\n</div>',
      ],
      tests: [
        { name: 'Un <div> est présent', query: 'div', assert: 'exists' },
        { name: 'La classe "card" est utilisée', query: '.card', assert: 'exists' },
        { name: 'Une balise <style> est présente', query: 'style', assert: 'exists' },
        { name: 'Un <h2> est présent', query: 'h2', assert: 'exists' },
      ],
    },
  },
  {
    id: '3.5',
    title: 'Dimensions et unités',
    module: 3,
    order: 5,
    theory: {
      content: `Pour contrôler la **taille** des éléments, le CSS propose plusieurs propriétés et unités.

**Propriétés de dimension** :
- \`width\` / \`height\` : largeur / hauteur
- \`max-width\` : largeur maximale (très utile pour le responsive !)
- \`min-height\` : hauteur minimale

**Les unités** :
- **\`px\`** (pixels) : taille fixe, précise. Ex: \`border: 1px\`, \`margin: 16px\`
- **\`%\`** (pourcentage) : relatif au parent. Ex: \`width: 100%\`
- **\`em\`** : relatif à la taille de police du parent
- **\`rem\`** : relatif à la taille de police de la racine (\`<html>\`)

**Quand utiliser quoi ?**
- \`px\` : bordures, petits espacements
- \`%\` : largeurs flexibles
- \`rem\` : tailles de texte (accessibilité)
- \`max-width\` + \`margin: 0 auto\` : centrer un contenu avec une largeur max

**\`box-sizing: border-box\`** : fait en sorte que le padding et la bordure sont **inclus** dans la largeur. Sans ça, un élément de \`width: 300px\` avec \`padding: 20px\` ferait en réalité 340px de large !

**Mini-projet** : tu vas créer une page "À propos" complète et stylisée !`,
      examples: [
        {
          code: `<style>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  .highlight {
    width: 100%;
    padding: 16px;
    background-color: #fef3c7;
    border-radius: 8px;
  }
</style>
<div class="container">
  <h1>Contenu centré</h1>
  <div class="highlight">
    <p>Cette boîte fait 100% de la largeur du container.</p>
  </div>
</div>`,
          description: 'Dimensions, max-width et centrage',
        },
      ],
    },
    exercise: {
      instructions: `Mini-projet : crée une page "À propos" complète et stylisée !

1. Un <header> avec un titre centré et un fond coloré
2. Un <main> avec max-width: 600px, centré (margin: 0 auto)
3. Au moins 2 paragraphes <p> avec une bonne typographie
4. Une "carte" (div stylisée) avec bordure, padding et fond
5. Un <footer> avec texte centré`,
      starterCode: `<style>
  /* Stylise ta page "À propos" ici */

</style>
<!-- Crée ta page À propos complète -->
`,
      hints: [
        'Structure : <header> → <main> (paragraphes + carte div) → <footer>. Utilise max-width et margin: 0 auto pour centrer le main.',
        'header { background-color: #4f46e5; color: white; text-align: center; padding: 20px; }\nmain { max-width: 600px; margin: 0 auto; padding: 20px; }\n.card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; background-color: #f9fafb; }\nfooter { text-align: center; padding: 16px; }',
        '<style>\n  header { background-color: #4f46e5; color: white; text-align: center; padding: 20px; }\n  main { max-width: 600px; margin: 0 auto; padding: 20px; }\n  .card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; background-color: #f9fafb; }\n  footer { text-align: center; padding: 16px; color: #6b7280; }\n</style>\n<header>\n  <h1>À propos</h1>\n</header>\n<main>\n  <p>Bienvenue sur ma page. Je suis un développeur web en herbe !</p>\n  <p>J\'apprends le HTML et le CSS sur Pystep.</p>\n  <div class="card">\n    <h2>Mes compétences</h2>\n    <p>HTML, CSS et bientôt plus !</p>\n  </div>\n</main>\n<footer>\n  <p>&copy; 2026 Mon site</p>\n</footer>',
      ],
      tests: [
        { name: 'Un <header> est présent', query: 'header', assert: 'exists' },
        { name: 'Un <main> est présent', query: 'main', assert: 'exists' },
        { name: 'Un <footer> est présent', query: 'footer', assert: 'exists' },
        { name: 'Au moins 2 paragraphes', query: 'p', assert: 'count', value: 2 },
        { name: 'Une balise <style> est présente', query: 'style', assert: 'exists' },
        { name: 'Un <div> est présent', query: 'div', assert: 'exists' },
      ],
    },
  },
]
