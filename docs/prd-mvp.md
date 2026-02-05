# PRD - Pystep MVP

> **Document créé par** : John (Product Manager)
> **Date** : 5 février 2026
> **Version** : 1.0
> **Statut** : Draft

---

## 1. Résumé Exécutif

### Objectif
Livrer un MVP fonctionnel de Pystep permettant à un utilisateur de **s'inscrire, suivre un parcours HTML/CSS gratuit, et être capable de créer un site web complet** à la fin du module.

### Scope MVP (P0 uniquement)
| Inclus | Exclu (post-MVP) |
|--------|------------------|
| Éditeur de code web (client-side) | Badges |
| Module gratuit HTML/CSS (~20 leçons) | Streaks |
| Système de compte (email/password) | OAuth (Google/GitHub) |
| Leçons interactives | Multilingue (ES, EN) |
| Sauvegarde de progression | Certificats PDF |
| | Paiement / Packs payants |

### Définition du succès MVP
- Un utilisateur peut s'inscrire, suivre toutes les leçons, et **créer un site HTML/CSS fonctionnel**
- Le parcours est **100% utilisable** sans intervention humaine
- L'infrastructure coûte **0€** (free tiers uniquement)

---

## 2. User Stories

### Epic 1 : Authentification

#### US-1.1 : Inscription
**En tant que** visiteur,
**Je veux** créer un compte avec mon email et un mot de passe,
**Afin de** sauvegarder ma progression.

**Critères d'acceptation :**
- [ ] Formulaire avec email + mot de passe + confirmation mot de passe
- [ ] Validation email (format valide)
- [ ] Mot de passe minimum 8 caractères
- [ ] Email de confirmation envoyé
- [ ] Redirection vers le dashboard après inscription
- [ ] Message d'erreur si email déjà utilisé

#### US-1.2 : Connexion
**En tant que** utilisateur inscrit,
**Je veux** me connecter avec mon email et mot de passe,
**Afin d'** accéder à mon compte et ma progression.

**Critères d'acceptation :**
- [ ] Formulaire email + mot de passe
- [ ] Message d'erreur clair si identifiants incorrects
- [ ] Option "Mot de passe oublié" (email de reset)
- [ ] Session persistante (rester connecté)
- [ ] Redirection vers le dashboard après connexion

#### US-1.3 : Déconnexion
**En tant que** utilisateur connecté,
**Je veux** me déconnecter,
**Afin de** sécuriser mon compte.

**Critères d'acceptation :**
- [ ] Bouton de déconnexion accessible
- [ ] Session détruite côté serveur
- [ ] Redirection vers la page d'accueil

---

### Epic 2 : Parcours d'apprentissage

#### US-2.1 : Voir le parcours
**En tant que** utilisateur,
**Je veux** voir la liste des modules et leçons disponibles,
**Afin de** comprendre ce que je vais apprendre.

**Critères d'acceptation :**
- [ ] Liste des modules avec titres et descriptions
- [ ] Indicateur de progression par module (X/Y leçons complétées)
- [ ] Leçons verrouillées/déverrouillées visibles
- [ ] Leçon en cours mise en évidence

#### US-2.2 : Suivre une leçon
**En tant que** utilisateur,
**Je veux** suivre une leçon avec théorie et exercices,
**Afin d'** apprendre de nouvelles compétences.

**Critères d'acceptation :**
- [ ] Contenu théorique (texte, exemples de code)
- [ ] Zone d'exercice pratique intégrée
- [ ] Possibilité de valider l'exercice
- [ ] Feedback immédiat (succès/erreur)
- [ ] Bouton "Leçon suivante" après validation

#### US-2.3 : Sauvegarder la progression
**En tant que** utilisateur,
**Je veux** que ma progression soit sauvegardée automatiquement,
**Afin de** reprendre où j'en étais.

**Critères d'acceptation :**
- [ ] Progression sauvegardée après chaque leçon validée
- [ ] Code en cours sauvegardé (brouillon)
- [ ] Reprise automatique à la dernière leçon non terminée

---

### Epic 3 : Éditeur de code

#### US-3.1 : Écrire du code HTML/CSS
**En tant que** apprenant,
**Je veux** écrire du code HTML et CSS dans un éditeur intégré,
**Afin de** pratiquer sans installer de logiciel.

**Critères d'acceptation :**
- [ ] Éditeur avec coloration syntaxique HTML/CSS
- [ ] Numérotation des lignes
- [ ] Auto-indentation basique
- [ ] Taille de police ajustable (accessibilité)

#### US-3.2 : Prévisualiser le résultat
**En tant que** apprenant,
**Je veux** voir le rendu de mon code en temps réel,
**Afin de** comprendre l'effet de mes modifications.

**Critères d'acceptation :**
- [ ] Panneau de prévisualisation (iframe)
- [ ] Mise à jour en temps réel (ou bouton "Exécuter")
- [ ] Vue responsive (mobile/desktop toggle)
- [ ] Possibilité de redimensionner éditeur/preview

#### US-3.3 : Valider un exercice
**En tant que** apprenant,
**Je veux** valider mon code pour vérifier s'il est correct,
**Afin de** savoir si j'ai réussi l'exercice.

**Critères d'acceptation :**
- [ ] Bouton "Valider" visible
- [ ] Vérification côté client (comparaison output ou tests DOM)
- [ ] Message de succès avec encouragement
- [ ] Message d'erreur avec indices (sans donner la réponse)
- [ ] Possibilité de réessayer illimitée

---

### Epic 4 : Pages statiques

#### US-4.1 : Page d'accueil
**En tant que** visiteur,
**Je veux** comprendre ce qu'est Pystep en arrivant sur le site,
**Afin de** décider si je veux m'inscrire.

**Critères d'acceptation :**
- [ ] Headline clair (proposition de valeur)
- [ ] CTA "Commencer gratuitement" visible
- [ ] Aperçu du parcours (modules disponibles)
- [ ] Section "Comment ça marche" (3 étapes)
- [ ] Footer avec mentions légales

#### US-4.2 : Dashboard utilisateur
**En tant que** utilisateur connecté,
**Je veux** voir mon tableau de bord personnel,
**Afin de** suivre ma progression globale.

**Critères d'acceptation :**
- [ ] Progression globale (% du parcours complété)
- [ ] Accès rapide à la leçon en cours
- [ ] Liste des modules avec statut
- [ ] Bouton "Continuer" mis en évidence

---

## 3. Parcours Pédagogique HTML/CSS

### Objectif final
> L'apprenant est capable de **créer un site web complet** (structure HTML + style CSS) de type portfolio ou landing page.

### Structure du parcours

```
MODULE 1 : Les fondations HTML (6 leçons)
├── 1.1 Qu'est-ce que le HTML ? (théorie + premier <h1>)
├── 1.2 Structure d'une page (<!DOCTYPE>, <html>, <head>, <body>)
├── 1.3 Les titres et paragraphes (<h1>-<h6>, <p>)
├── 1.4 Les listes (<ul>, <ol>, <li>)
├── 1.5 Les liens (<a href>)
└── 1.6 Les images (<img src alt>)
    └── 🎯 Mini-projet : Page "À propos de moi"

MODULE 2 : HTML sémantique (4 leçons)
├── 2.1 Balises sémantiques (<header>, <nav>, <main>, <footer>)
├── 2.2 Les sections et articles (<section>, <article>, <aside>)
├── 2.3 Les formulaires basiques (<form>, <input>, <button>)
└── 2.4 Les tableaux (<table>, <tr>, <td>, <th>)
    └── 🎯 Mini-projet : Page de contact avec formulaire

MODULE 3 : Introduction au CSS (5 leçons)
├── 3.1 Qu'est-ce que le CSS ? (syntaxe, sélecteurs basiques)
├── 3.2 Couleurs et arrière-plans (color, background)
├── 3.3 Typographie (font-family, font-size, font-weight)
├── 3.4 Le modèle de boîte (margin, padding, border)
└── 3.5 Dimensions et unités (px, %, em, rem)
    └── 🎯 Mini-projet : Styliser la page "À propos"

MODULE 4 : Mise en page CSS (5 leçons)
├── 4.1 Display et positionnement (block, inline, relative, absolute)
├── 4.2 Flexbox - Les bases (display: flex, justify, align)
├── 4.3 Flexbox - Avancé (flex-wrap, gap, order)
├── 4.4 Introduction à Grid (display: grid, colonnes, rangées)
└── 4.5 Responsive design (media queries, mobile-first)
    └── 🎯 Mini-projet : Layout responsive 2 colonnes

MODULE 5 : Projet Final (2 leçons)
├── 5.1 Projet guidé : Créer un portfolio (partie 1 - structure)
└── 5.2 Projet guidé : Créer un portfolio (partie 2 - style)
    └── 🏆 PROJET FINAL : Portfolio personnel complet
```

**Total : 22 leçons + 5 mini-projets + 1 projet final**

### Progression de difficulté

| Module | Niveau | Compétences acquises |
|--------|--------|---------------------|
| 1 | Débutant | Créer une page HTML basique |
| 2 | Débutant+ | Structurer sémantiquement une page |
| 3 | Intermédiaire | Appliquer des styles de base |
| 4 | Intermédiaire+ | Créer des layouts modernes |
| 5 | Consolidation | Intégrer toutes les compétences |

---

## 4. Spécifications Techniques

### Architecture client-side

```
┌─────────────────────────────────────────────────────────┐
│                      FRONTEND                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │
│  │    React    │  │   Monaco    │  │     iframe      │ │
│  │   (UI/UX)   │  │  (Éditeur)  │  │   (Preview)     │ │
│  └─────────────┘  └─────────────┘  └─────────────────┘ │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│                     SUPABASE                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │
│  │    Auth     │  │  Database   │  │    Storage      │ │
│  │ (email/pwd) │  │ (PostgreSQL)│  │  (si besoin)    │ │
│  └─────────────┘  └─────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Stack technique confirmée

| Composant | Technologie | Justification |
|-----------|-------------|---------------|
| Frontend | React + Vite | Rapide, moderne, gratuit |
| Éditeur | Monaco Editor | Même éditeur que VS Code |
| Preview | iframe + srcdoc | Pas de serveur nécessaire |
| Auth | Supabase Auth | Free tier généreux |
| Database | Supabase PostgreSQL | Free tier, pas de config |
| Hosting | Vercel | Free tier, déploiement auto |
| Validation exercices | Tests DOM côté client | Pas de backend nécessaire |

### Modèle de données

```sql
-- Table utilisateurs (gérée par Supabase Auth)
-- auth.users (id, email, created_at, etc.)

-- Table progression
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id VARCHAR(20) NOT NULL,  -- ex: "1.1", "2.3"
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP,
  draft_code TEXT,  -- code en cours de l'utilisateur
  created_at TIMESTAMP DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- Index pour performance
CREATE INDEX idx_progress_user ON user_progress(user_id);
```

### Validation des exercices (côté client)

Chaque exercice définit des **critères de validation** vérifiables dans le DOM :

```javascript
// Exemple : Leçon 1.3 - Vérifier présence d'un <h1> et <p>
const tests = [
  {
    name: "Un titre <h1> est présent",
    test: (doc) => doc.querySelector('h1') !== null
  },
  {
    name: "Le titre contient du texte",
    test: (doc) => doc.querySelector('h1')?.textContent.trim().length > 0
  },
  {
    name: "Un paragraphe <p> est présent",
    test: (doc) => doc.querySelector('p') !== null
  }
];
```

---

## 5. Wireframes (description)

### Page d'accueil
```
┌─────────────────────────────────────────────────────┐
│  [Logo Pystep]                    [Connexion]       │
├─────────────────────────────────────────────────────┤
│                                                     │
│      Apprends à coder, step by step.                │
│      Du premier <h1> à ton premier site.            │
│                                                     │
│            [ Commencer gratuitement ]               │
│                                                     │
├─────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐             │
│  │ 1.      │  │ 2.      │  │ 3.      │             │
│  │ Inscris │  │ Apprends│  │ Crée    │             │
│  │ -toi    │  │ à coder │  │ ton site│             │
│  └─────────┘  └─────────┘  └─────────┘             │
├─────────────────────────────────────────────────────┤
│  Le parcours :                                      │
│  [Module 1: HTML] [Module 2: Sémantique] [...]     │
├─────────────────────────────────────────────────────┤
│  Footer - Mentions légales - Contact                │
└─────────────────────────────────────────────────────┘
```

### Interface de leçon
```
┌─────────────────────────────────────────────────────┐
│  [← Parcours]  Leçon 1.3 : Titres et paragraphes    │
├───────────────────────┬─────────────────────────────┤
│                       │                             │
│  THÉORIE              │  ÉDITEUR                    │
│  ──────────           │  ────────                   │
│  Les titres HTML...   │  <!DOCTYPE html>            │
│                       │  <html>                     │
│  Exemple :            │    <head>...</head>         │
│  <h1>Titre</h1>       │    <body>                   │
│                       │      // Ton code ici        │
│                       │    </body>                  │
│  EXERCICE             │  </html>                    │
│  ──────────           │                             │
│  Crée un titre h1     ├─────────────────────────────┤
│  et un paragraphe.    │  PRÉVISUALISATION           │
│                       │  ─────────────────          │
│                       │                             │
│                       │  [Rendu live du HTML]       │
│                       │                             │
├───────────────────────┴─────────────────────────────┤
│           [ Valider ]        [ Leçon suivante → ]   │
└─────────────────────────────────────────────────────┘
```

---

## 6. Critères de lancement MVP

### Must have (bloquant)
- [ ] Inscription/connexion fonctionnelle
- [ ] 22 leçons avec contenu et exercices
- [ ] Éditeur de code avec preview
- [ ] Validation des exercices
- [ ] Sauvegarde de progression
- [ ] Responsive (mobile/desktop)
- [ ] 0 erreur console critique

### Should have (important mais non bloquant)
- [ ] Temps de chargement < 3s
- [ ] SEO basique (meta tags, sitemap)
- [ ] Analytics (Plausible ou similaire gratuit)

### Won't have (explicitement exclu du MVP)
- Badges et streaks
- OAuth
- Multilingue
- Certificats PDF
- Paiement

---

## 7. Métriques de succès MVP

| Métrique | Objectif M+3 | Comment mesurer |
|----------|--------------|-----------------|
| Inscriptions | 100 | Supabase dashboard |
| Complétion Module 1 | 50% des inscrits | Query DB |
| Complétion totale | 20% des inscrits | Query DB |
| Bugs critiques | 0 | Monitoring |

---

## 8. Risques et mitigations

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Monaco trop lourd (bundle size) | Perf mobile | Lazy loading, code splitting |
| Validation exercices contournable | Triche | Acceptable pour MVP (pas de certificat) |
| Contenu pédagogique long à écrire | Délai | Prioriser Modules 1-3, reste en V1.1 |
| Free tier Supabase insuffisant | Coût | 50k MAU gratuits, largement suffisant |

---

## 9. Prochaines étapes

1. **Winston (Architect)** : Valider stack technique, définir structure projet
2. **Sally (UX Designer)** : Wireframes détaillés, UI Kit
3. **Amelia (Developer)** : Implémenter Epic 1 (Auth) en premier
4. **Paige (Tech Writer)** : Rédiger contenu leçons (peut démarrer en parallèle)

---

## Changelog

| Version | Date | Auteur | Modifications |
|---------|------|--------|---------------|
| 1.0 | 05/02/2026 | John | Création initiale |

---

## Signatures

| Rôle | Nom | Statut |
|------|-----|--------|
| Product Manager | John | ✅ Draft complété |
| Product Owner | - | ⏳ En attente validation |
| Tech Lead | - | ⏳ En attente review |

---

*Ce PRD est un document vivant. Il sera mis à jour en fonction des retours et des découvertes pendant le développement.*
