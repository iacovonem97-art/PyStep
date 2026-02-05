# Product Brief - Pystep

> **Document créé par** : Mary (Business Analyst)
> **Date** : 5 février 2026
> **Version** : 1.0

---

## 1. Vision & Mission

### Vision
Devenir LA plateforme francophone de référence pour apprendre la programmation de manière progressive, gamifiée et orientée métier.

### Mission
Rendre l'apprentissage du code accessible à tous, en transformant le parcours d'apprentissage en une aventure engageante qui mène directement à l'employabilité.

### Tagline proposée
> *"Du premier code au premier emploi, step by step."*

---

## 2. Problème à Résoudre

### Constat marché
| Problème | Impact |
|----------|--------|
| Cours trop théoriques | Apprenants perdus face au code réel |
| Pas de parcours clair | "J'ai appris Python, et maintenant ?" |
| Plateformes en anglais | Barrière pour francophones/hispanophones |
| Prix élevés | Codecademy Pro ~200€/an, Udemy variable |
| Certifications floues | Pas de lien clair avec le niveau métier |

### Notre réponse
Une plateforme **multilingue**, **gamifiée**, avec des **parcours métier clairs** (Junior → Senior) et un **modèle freemium** accessible.

---

## 3. Public Cible

### Personas principaux

#### 🎓 Léa, 22 ans - Étudiante en reconversion
- Licence de lettres, veut devenir développeuse
- Budget serré, cherche des ressources gratuites/abordables
- A besoin d'un parcours structuré et de motivation

#### 💼 Marc, 35 ans - Professionnel en reconversion
- Commercial qui veut changer de carrière
- Apprend le soir après le travail
- Veut des résultats concrets pour son CV

#### 🌍 Carlos, 28 ans - Développeur hispanophone
- Basé en Amérique latine
- Veut améliorer ses compétences en React
- Préfère apprendre dans sa langue maternelle

### Segmentation géographique
- 🇫🇷 France & pays francophones (Belgique, Suisse, Canada, Afrique)
- 🇪🇸 Espagne & Amérique latine
- 🇬🇧 International anglophone

---

## 4. Solution - Pystep

### Concept core
Plateforme web d'apprentissage de la programmation avec :
- **Éditeur de code intégré** dans le navigateur
- **Progression gamifiée** (badges, streaks)
- **Parcours orientés métier** par niveau (Junior/Mid/Senior)
- **3 langues** : FR, ES, EN

### Proposition de valeur unique (USP)
> *"Apprends à coder comme tu joues à un jeu vidéo : niveau par niveau, badge par badge, jusqu'au titre de Senior."*

---

## 5. Fonctionnalités

### 🚀 MVP (Version 1.0)

| Priorité | Fonctionnalité | Description |
|----------|----------------|-------------|
| P0 | **Éditeur de code web** | Exécution Python/JS/HTML/CSS dans le navigateur |
| P0 | **Module gratuit HTML/CSS** | Vitrine de la méthode (~20 leçons) |
| P0 | **Système de compte** | Inscription, login, progression sauvegardée |
| P0 | **Leçons interactives** | Théorie + exercices pratiques intégrés |
| P1 | **Badges** | Récompenses pour accomplissements |
| P1 | **Streaks** | Compteur de jours consécutifs |
| P1 | **1 langue** | Français d'abord (MVP) |
| P2 | **Certificat PDF** | Généré à la fin d'un module |

### 🔮 Futures versions

| Version | Fonctionnalités |
|---------|-----------------|
| V1.5 | Paiement intégré (Stripe), Pack Python Junior |
| V2.0 | Support ES + EN, Packs Java/React |
| V2.5 | Leaderboard, avatar personnalisable |
| V3.0 | Forum communautaire, système de mentorat |

---

## 6. Analyse Concurrentielle

### Mapping des concurrents

```
                    GRATUIT ←────────────────→ PAYANT
                         │                        │
            ┌────────────┼────────────────────────┤
   THÉORIE  │ freeCodeCamp                  Udemy │
            │                            Pluralsight
            │                                     │
            ├────────────────────────────────────┤
            │           ⭐ PYSTEP ⭐              │
            │    (Gamifié + Orienté métier)      │
            ├────────────────────────────────────┤
  PRATIQUE  │ Codecademy          Codecademy Pro │
            │ Exercism               DataCamp    │
            └────────────┼────────────────────────┘
```

### Avantages concurrentiels Pystep

| Concurrent | Leur faiblesse | Notre force |
|------------|----------------|-------------|
| freeCodeCamp | Anglais only, UX datée | Multilingue, UX moderne |
| Codecademy | Cher (200€/an), parcours génériques | Packs ciblés, prix accessibles |
| Udemy | Qualité variable, pas de progression | Parcours structuré, gamifié |
| OpenClassrooms | Lourd, certifications complexes | Léger, "ego certificates" fun |

---

## 7. Modèle Économique

### Structure Freemium

```
┌─────────────────────────────────────────────────────────────┐
│  🆓 GRATUIT - Acquisition & Démonstration                   │
│  ─────────────────────────────────────────────────────────  │
│  • HTML Basics (10 leçons)                                  │
│  • CSS Basics (10 leçons)                                   │
│  • Badges & Streaks illimités                               │
│  • Certificat "HTML/CSS Beginner"                           │
│  ─────────────────────────────────────────────────────────  │
│  Objectif : Prouver la qualité, créer l'habitude            │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  💳 PACKS PAYANTS - Monétisation                            │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  PACK JUNIOR (par langage)         ~29-49€ ?                │
│  • Fondamentaux du langage                                  │
│  • Projets guidés niveau débutant                           │
│  • Certificat "Junior Developer"                            │
│                                                             │
│  PACK MID (par langage)            ~49-79€ ?                │
│  • Concepts avancés                                         │
│  • Projets complexes                                        │
│  • Certificat "Mid Developer"                               │
│                                                             │
│  PACK SENIOR (par langage)         ~79-99€ ?                │
│  • Architecture & Best practices                            │
│  • Projets production-ready                                 │
│  • Certificat "Senior Developer"                            │
│                                                             │
│  BUNDLE COMPLET (Junior→Senior)    ~149-199€ ?              │
│  • Tout le parcours d'un langage                            │
│  • Économie vs achat séparé                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Pricing à définir
> ⚠️ Les prix sont indicatifs. À valider avec étude de marché et tests.

### Projections revenus (hypothèses conservatrices)

| Mois | Visiteurs | Inscrits gratuits (10%) | Conversion payante (2%) | Panier moyen | Revenus |
|------|-----------|------------------------|------------------------|--------------|---------|
| M6   | 1 000     | 100                    | 2                      | 40€          | 80€     |
| M12  | 5 000     | 500                    | 10                     | 50€          | 500€    |
| M18  | 20 000    | 2 000                  | 40                     | 60€          | 2 400€  |
| M24  | 50 000    | 5 000                  | 100                    | 70€          | 7 000€  |

> Ces chiffres sont des estimations basses. Le SEO et le bouche-à-oreille peuvent accélérer fortement.

---

## 8. Contraintes & Risques

### Contraintes projet

| Type | Contrainte | Impact |
|------|------------|--------|
| 💰 Budget | 0€ au démarrage | Technologies 100% gratuites/open source |
| 👤 Équipe | Solo dev (supposé) | MVP minimal, itérations rapides |
| ⏱️ Temps | Non défini | Priorisation stricte du MVP |

### Stack technique recommandée (gratuite)

| Besoin | Solution gratuite |
|--------|-------------------|
| Frontend | React / Next.js |
| Backend | Node.js / Python (FastAPI) |
| Base de données | PostgreSQL (Supabase free tier) |
| Authentification | Supabase Auth / Firebase Auth |
| Hébergement | Vercel / Railway free tier |
| Éditeur de code | Monaco Editor (VS Code) / CodeMirror |
| Exécution code | Pyodide (Python in browser) / Judge0 API |
| Paiement | Stripe (0€ fixe, commission uniquement) |
| Emails | Resend free tier / Mailgun |

### Risques identifiés

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| Concurrence forte | Haute | Moyen | USP clair, niche francophone |
| Coût serveurs si succès | Moyenne | Haut | Architecture scalable, revenus avant scale |
| Burnout solo dev | Haute | Critique | MVP strict, pas de perfectionnisme |
| Contenu long à produire | Haute | Haut | Commencer petit (1 langage), qualité > quantité |

---

## 9. Métriques de Succès (KPIs)

### Phase 1 - Validation (0-6 mois)
| Métrique | Objectif |
|----------|----------|
| Module gratuit terminé | 100% HTML/CSS basics en ligne |
| Inscriptions | 100 utilisateurs |
| Complétion module gratuit | >30% des inscrits |
| Feedback positif | NPS > 30 |

### Phase 2 - Monétisation (6-12 mois)
| Métrique | Objectif |
|----------|----------|
| Premier pack payant | Python Junior en ligne |
| Premières ventes | 10 ventes |
| Revenus | Couvrir les frais (domaine, serveur si upgrade) |

### Phase 3 - Croissance (12-24 mois)
| Métrique | Objectif |
|----------|----------|
| Langues | 3 langues actives |
| Packs | 3+ langages disponibles |
| Revenus mensuels | >1 000€/mois |
| Utilisateurs actifs | >1 000 MAU |

---

## 10. Prochaines Étapes

### Immédiat (Cette semaine)
- [ ] Valider ce Product Brief
- [ ] Passer à John (Product Manager) pour créer le PRD détaillé
- [ ] Passer à Winston (Architect) pour valider la stack technique

### Court terme (Ce mois)
- [ ] Wireframes avec Sally (UX Designer)
- [ ] Architecture technique avec Winston
- [ ] Début développement MVP

### Moyen terme (3 mois)
- [ ] MVP en ligne avec module HTML/CSS gratuit
- [ ] Premiers utilisateurs beta
- [ ] Itérations basées sur feedback

---

## Annexes

### A. Langages prioritaires (par demande marché)

1. **Python** - #1 mondial, data science, IA, web
2. **JavaScript/React** - Web frontend, très demandé
3. **Java** - Entreprise, Android, stable
4. **HTML/CSS** - Base, parfait pour le gratuit
5. *Futurs* : PHP, C#, Go, Rust...

### B. Contenu d'un pack type (exemple Python Junior)

```
Pack Python Junior (~30-40h de contenu)
├── Module 1: Introduction à Python
│   ├── Installation & setup
│   ├── Variables & types
│   ├── Opérateurs
│   └── 🏆 Badge: "First Steps"
├── Module 2: Structures de contrôle
│   ├── Conditions (if/else)
│   ├── Boucles (for/while)
│   └── 🏆 Badge: "Loop Master"
├── Module 3: Fonctions
│   ├── Définir des fonctions
│   ├── Paramètres & retours
│   ├── Scope
│   └── 🏆 Badge: "Function Builder"
├── Module 4: Structures de données
│   ├── Listes
│   ├── Dictionnaires
│   ├── Tuples & Sets
│   └── 🏆 Badge: "Data Wrangler"
├── Module 5: Projet Junior
│   ├── Projet guidé: To-Do CLI
│   ├── Projet guidé: Quiz Game
│   └── 🏆 Badge: "Project Maker"
└── 🎓 Certificat: "Python Junior Developer"
```

---

## Signatures

| Rôle | Nom | Statut |
|------|-----|--------|
| Business Analyst | Mary | ✅ Validé |
| Product Owner | - | ⏳ En attente |
| Tech Lead | - | ⏳ En attente |
| Stakeholder | - | ⏳ En attente |

---

*Document vivant - À mettre à jour au fil du projet*
