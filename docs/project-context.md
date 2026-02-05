# Project Context - Pystep

> **Document creé par** : Winston (Architect)
> **Date** : 5 février 2026
> **Version** : 1.0
> **Statut** : Validé

---

## 1. Vue d'Ensemble

### Description
Pystep est une plateforme web d'apprentissage de la programmation, gamifiée et orientée métier. Le MVP se concentre sur un parcours gratuit HTML/CSS de 22 leçons.

### Contraintes Projet
| Contrainte | Valeur | Impact |
|------------|--------|--------|
| Budget | 0€ | Free tiers uniquement |
| Équipe | Solo dev | MVP minimal, itérations rapides |
| Scope MVP | HTML/CSS gratuit | 22 leçons, pas de paiement |

### Documents de Référence
- [Product Brief](./product-brief.md) - Vision et stratégie (Mary)
- [PRD MVP](./prd-mvp.md) - Spécifications fonctionnelles (John)
- [UX Wireframes](./ux-wireframes.md) - Maquettes (Sally)
- [UI Kit](./ui-kit.md) - Design system (Sally)

---

## 2. Stack Technique

### Technologies Validées

| Composant | Technologie | Version | Justification |
|-----------|-------------|---------|---------------|
| **Frontend** | React | 18.x | Écosystème riche, performance |
| **Build Tool** | Vite | 5.x | DX excellent, build rapide |
| **Styling** | Tailwind CSS | 3.x | Productivité, cohérence UI Kit |
| **Éditeur Code** | Monaco Editor | Latest | Même éditeur que VS Code |
| **Auth** | Supabase Auth | - | Free tier généreux, simple |
| **Database** | Supabase PostgreSQL | - | Intégré, RLS, pas de config |
| **Hosting** | Vercel | - | Deploy auto, free tier |
| **Icons** | Lucide React | Latest | Open source, cohérent |
| **Fonts** | Inter + JetBrains Mono | - | Google Fonts, gratuit |

### Pourquoi ces choix ?

**React + Vite** (vs Next.js)
- Plus simple pour un SPA
- Pas besoin de SSR au MVP (SEO secondaire)
- Build plus rapide, DX meilleure

**Tailwind CSS** (vs CSS Modules / styled-components)
- Aligné avec l'UI Kit de Sally
- Productivité solo dev
- Bundle optimisé (purge)

**Monaco Editor** (vs CodeMirror)
- Expérience VS Code familière
- Coloration syntaxique excellente
- Trade-off accepté : bundle plus lourd, mitigé par lazy loading

**Supabase** (vs Firebase / Auth0 + PlanetScale)
- Une seule plateforme = simplicité
- Auth + DB + Storage intégrés
- Free tier : 50k MAU, 500MB DB
- RLS pour sécurité sans backend

---

## 3. Architecture Applicative

### Structure des Dossiers

```
pystep/
├── public/
│   ├── favicon.ico
│   ├── og-image.png                 # Image Open Graph (partage social)
│   └── robots.txt
│
├── src/
│   ├── components/                  # Composants React réutilisables
│   │   ├── ui/                      # Composants UI atomiques
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Progress.tsx
│   │   │   ├── Alert.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── index.ts             # Barrel export
│   │   │
│   │   ├── layout/                  # Composants de mise en page
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Container.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── PageLayout.tsx
│   │   │
│   │   ├── editor/                  # Éditeur de code (lazy-loaded)
│   │   │   ├── CodeEditor.tsx       # Wrapper Monaco
│   │   │   ├── Preview.tsx          # iframe preview
│   │   │   ├── EditorToolbar.tsx
│   │   │   └── SplitPane.tsx        # Layout redimensionnable
│   │   │
│   │   └── lesson/                  # Composants spécifiques leçons
│   │       ├── TheoryPanel.tsx
│   │       ├── ExercisePanel.tsx
│   │       ├── ValidationFeedback.tsx
│   │       ├── HintModal.tsx
│   │       ├── SuccessModal.tsx
│   │       └── LessonNavigation.tsx
│   │
│   ├── pages/                       # Pages / Routes
│   │   ├── Home.tsx                 # Page d'accueil
│   │   ├── auth/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── ForgotPassword.tsx
│   │   ├── Dashboard.tsx            # Tableau de bord utilisateur
│   │   ├── Curriculum.tsx           # Vue parcours complet
│   │   ├── Lesson.tsx               # Interface de leçon
│   │   └── NotFound.tsx             # 404
│   │
│   ├── features/                    # Logique métier par domaine
│   │   ├── auth/
│   │   │   ├── AuthProvider.tsx     # Context provider
│   │   │   ├── useAuth.ts           # Hook principal
│   │   │   ├── ProtectedRoute.tsx   # HOC protection routes
│   │   │   └── authService.ts       # Appels Supabase Auth
│   │   │
│   │   ├── progress/
│   │   │   ├── ProgressProvider.tsx
│   │   │   ├── useProgress.ts       # Hook progression utilisateur
│   │   │   ├── progressService.ts   # CRUD Supabase
│   │   │   └── progressUtils.ts     # Calculs (%, verrouillage)
│   │   │
│   │   └── lessons/
│   │       ├── useLessons.ts        # Hook accès leçons
│   │       ├── useCurrentLesson.ts  # Hook leçon courante
│   │       ├── validator.ts         # Validation exercices (DOM)
│   │       └── lessonUtils.ts       # Helpers
│   │
│   ├── content/                     # Contenu pédagogique (statique)
│   │   ├── lessons/
│   │   │   ├── index.ts             # Export centralisé
│   │   │   ├── module-1/
│   │   │   │   ├── 1.1.json
│   │   │   │   ├── 1.2.json
│   │   │   │   ├── 1.3.json
│   │   │   │   ├── 1.4.json
│   │   │   │   ├── 1.5.json
│   │   │   │   └── 1.6.json
│   │   │   ├── module-2/
│   │   │   ├── module-3/
│   │   │   ├── module-4/
│   │   │   └── module-5/
│   │   │
│   │   └── curriculum.ts            # Structure modules/leçons
│   │
│   ├── lib/                         # Utilitaires et configuration
│   │   ├── supabase.ts              # Client Supabase initialisé
│   │   ├── utils.ts                 # Helpers génériques (cn, etc.)
│   │   └── constants.ts             # Constantes app
│   │
│   ├── hooks/                       # Hooks génériques
│   │   ├── useLocalStorage.ts
│   │   ├── useDebounce.ts
│   │   └── useMediaQuery.ts
│   │
│   ├── types/                       # Types TypeScript
│   │   ├── lesson.ts
│   │   ├── progress.ts
│   │   ├── user.ts
│   │   └── index.ts
│   │
│   ├── styles/
│   │   └── globals.css              # Tailwind + variables CSS
│   │
│   ├── App.tsx                      # Composant racine
│   ├── main.tsx                     # Point d'entrée
│   └── router.tsx                   # Configuration React Router
│
├── .env.example                     # Template variables d'environnement
├── .env.local                       # Variables locales (gitignored)
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### Conventions de Nommage

| Type | Convention | Exemple |
|------|------------|---------|
| Composants | PascalCase | `Button.tsx`, `CodeEditor.tsx` |
| Hooks | camelCase avec `use` | `useAuth.ts`, `useProgress.ts` |
| Services | camelCase avec `Service` | `authService.ts` |
| Types | PascalCase | `Lesson`, `UserProgress` |
| Constantes | SCREAMING_SNAKE_CASE | `MAX_HINTS`, `API_URL` |
| Fichiers config | kebab-case | `tailwind.config.js` |
| Contenu leçons | `{module}.{leçon}.json` | `1.3.json` |

---

## 4. Modèle de Données

### Schéma Base de Données

```sql
-- =============================================
-- PYSTEP DATABASE SCHEMA
-- Supabase PostgreSQL
-- =============================================

-- Table progression utilisateur
-- Gérée par l'application, auth.users géré par Supabase Auth
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  lesson_id VARCHAR(10) NOT NULL,          -- Format: "1.1", "2.3", "5.2"
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  draft_code TEXT,                          -- Brouillon code utilisateur
  attempts INTEGER DEFAULT 0,               -- Nombre de tentatives
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  UNIQUE(user_id, lesson_id)
);

-- Index pour performance
CREATE INDEX idx_progress_user ON user_progress(user_id);
CREATE INDEX idx_progress_lesson ON user_progress(lesson_id);
CREATE INDEX idx_progress_completed ON user_progress(user_id, completed);

-- Row Level Security (RLS) - CRITIQUE
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Politique: utilisateurs ne voient que leurs propres données
CREATE POLICY "Users can view own progress" ON user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON user_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Pas de DELETE policy = les utilisateurs ne peuvent pas supprimer

-- Trigger pour mise à jour automatique de updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_progress_updated_at
  BEFORE UPDATE ON user_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Types TypeScript Correspondants

```typescript
// src/types/progress.ts

export interface UserProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  completed_at: string | null;
  draft_code: string | null;
  attempts: number;
  created_at: string;
  updated_at: string;
}

export interface ProgressState {
  completedLessons: string[];      // ["1.1", "1.2", "1.3"]
  currentLessonId: string | null;  // "1.4"
  totalCompleted: number;          // 3
  totalLessons: number;            // 22
  percentComplete: number;         // 13.6
}
```

```typescript
// src/types/lesson.ts

export interface Lesson {
  id: string;                      // "1.3"
  title: string;                   // "Les titres et paragraphes"
  module: number;                  // 1
  order: number;                   // 3
  theory: LessonTheory;
  exercise: LessonExercise;
}

export interface LessonTheory {
  content: string;                 // Markdown ou HTML
  examples: CodeExample[];
}

export interface CodeExample {
  code: string;
  description?: string;
  result?: string;                 // Rendu HTML si applicable
}

export interface LessonExercise {
  instructions: string;
  starterCode: string;
  hints: string[];                 // 3 niveaux d'indices
  tests: ExerciseTest[];
}

export interface ExerciseTest {
  name: string;                    // "Un titre <h1> est présent"
  query: string;                   // Sélecteur CSS
  assert: 'exists' | 'hasText' | 'hasAttribute' | 'count' | 'textContains';
  value?: string | number;         // Valeur attendue si applicable
}
```

```typescript
// src/types/user.ts

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}
```

---

## 5. Format du Contenu Pédagogique

### Structure d'une Leçon (JSON)

```json
{
  "id": "1.3",
  "title": "Les titres et paragraphes",
  "module": 1,
  "order": 3,
  "theory": {
    "content": "## Les titres HTML\n\nHTML propose 6 niveaux de titres, de `<h1>` (le plus important) à `<h6>` (le moins important).\n\n`<h1>` est généralement utilisé une seule fois par page pour le titre principal.\n\n## Les paragraphes\n\nLe texte courant est encadré par la balise `<p>` (paragraph).",
    "examples": [
      {
        "code": "<h1>Mon titre principal</h1>\n<h2>Un sous-titre</h2>\n<p>Un paragraphe de texte.</p>",
        "description": "Structure typique d'une page"
      }
    ]
  },
  "exercise": {
    "instructions": "Crée une page avec :\n- Un titre principal `<h1>` avec ton prénom\n- Un paragraphe `<p>` qui te décrit en une phrase",
    "starterCode": "<!DOCTYPE html>\n<html>\n<head>\n  <title>Ma page</title>\n</head>\n<body>\n\n  <!-- Écris ton code ici -->\n\n</body>\n</html>",
    "hints": [
      "Le titre <h1> se place dans le <body>, pas dans le <head>.",
      "N'oublie pas de fermer tes balises : <h1>...</h1> et <p>...</p>",
      "Exemple complet :\n<h1>Marie</h1>\n<p>Je suis une développeuse en herbe.</p>"
    ],
    "tests": [
      {
        "name": "Un titre <h1> est présent",
        "query": "h1",
        "assert": "exists"
      },
      {
        "name": "Le titre <h1> contient du texte",
        "query": "h1",
        "assert": "hasText"
      },
      {
        "name": "Un paragraphe <p> est présent",
        "query": "p",
        "assert": "exists"
      },
      {
        "name": "Le paragraphe contient du texte",
        "query": "p",
        "assert": "hasText"
      }
    ]
  }
}
```

### Structure du Curriculum

```typescript
// src/content/curriculum.ts

export interface Module {
  id: number;
  title: string;
  description: string;
  lessons: string[];      // IDs des leçons
  project?: string;       // ID du mini-projet (dernière leçon)
}

export const curriculum: Module[] = [
  {
    id: 1,
    title: "Les fondations HTML",
    description: "Apprends les bases du HTML pour structurer une page web.",
    lessons: ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6"],
    project: "1.6"
  },
  {
    id: 2,
    title: "HTML sémantique",
    description: "Structure tes pages avec les balises sémantiques modernes.",
    lessons: ["2.1", "2.2", "2.3", "2.4"],
    project: "2.4"
  },
  {
    id: 3,
    title: "Introduction au CSS",
    description: "Donne du style à tes pages avec les bases du CSS.",
    lessons: ["3.1", "3.2", "3.3", "3.4", "3.5"],
    project: "3.5"
  },
  {
    id: 4,
    title: "Mise en page CSS",
    description: "Maîtrise Flexbox, Grid et le responsive design.",
    lessons: ["4.1", "4.2", "4.3", "4.4", "4.5"],
    project: "4.5"
  },
  {
    id: 5,
    title: "Projet Final",
    description: "Crée ton portfolio personnel complet.",
    lessons: ["5.1", "5.2"],
    project: "5.2"
  }
];

export const TOTAL_LESSONS = 22;
```

---

## 6. Validation des Exercices

### Moteur de Validation (Client-Side)

```typescript
// src/features/lessons/validator.ts

import { ExerciseTest } from '@/types/lesson';

export interface ValidationResult {
  passed: boolean;
  results: TestResult[];
}

export interface TestResult {
  name: string;
  passed: boolean;
  message?: string;
}

export function validateExercise(
  code: string,
  tests: ExerciseTest[]
): ValidationResult {
  // Créer un iframe sandbox pour parser le HTML
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);

  try {
    const doc = iframe.contentDocument;
    if (!doc) throw new Error('Cannot access iframe document');

    doc.open();
    doc.write(code);
    doc.close();

    const results: TestResult[] = tests.map(test => {
      const result = runTest(doc, test);
      return {
        name: test.name,
        passed: result.passed,
        message: result.message
      };
    });

    return {
      passed: results.every(r => r.passed),
      results
    };
  } finally {
    document.body.removeChild(iframe);
  }
}

function runTest(
  doc: Document,
  test: ExerciseTest
): { passed: boolean; message?: string } {
  const elements = doc.querySelectorAll(test.query);

  switch (test.assert) {
    case 'exists':
      return {
        passed: elements.length > 0,
        message: elements.length > 0
          ? undefined
          : `Élément "${test.query}" non trouvé`
      };

    case 'hasText':
      const hasText = Array.from(elements).some(
        el => el.textContent?.trim().length > 0
      );
      return {
        passed: hasText,
        message: hasText
          ? undefined
          : `L'élément "${test.query}" est vide`
      };

    case 'count':
      const count = elements.length;
      const expected = test.value as number;
      return {
        passed: count === expected,
        message: count === expected
          ? undefined
          : `Attendu: ${expected} élément(s), trouvé: ${count}`
      };

    case 'textContains':
      const contains = Array.from(elements).some(
        el => el.textContent?.includes(test.value as string)
      );
      return {
        passed: contains,
        message: contains
          ? undefined
          : `Le texte "${test.value}" n'a pas été trouvé`
      };

    case 'hasAttribute':
      const [attr, value] = (test.value as string).split('=');
      const hasAttr = Array.from(elements).some(el => {
        if (value) {
          return el.getAttribute(attr) === value;
        }
        return el.hasAttribute(attr);
      });
      return {
        passed: hasAttr,
        message: hasAttr
          ? undefined
          : `Attribut "${attr}" non trouvé`
      };

    default:
      return { passed: false, message: 'Test inconnu' };
  }
}
```

---

## 7. Authentification

### Configuration Supabase

```typescript
// src/lib/supabase.ts

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Hook d'Authentification

```typescript
// src/features/auth/useAuth.ts

import { useState, useEffect, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Récupérer la session initiale
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Écouter les changements d'auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    signUp,
    signIn,
    signOut,
    resetPassword,
  };
}
```

---

## 8. Variables d'Environnement

### Template (.env.example)

```bash
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# App
VITE_APP_URL=http://localhost:5173
VITE_APP_NAME=Pystep
```

### Note Sécurité
- `VITE_SUPABASE_ANON_KEY` est une clé publique (safe côté client)
- La sécurité repose sur les politiques RLS dans Supabase
- Ne jamais exposer la `service_role` key côté client

---

## 9. Performance

### Optimisations Clés

**1. Code Splitting Monaco Editor**
```typescript
// src/components/editor/CodeEditor.tsx
import { lazy, Suspense } from 'react';

const MonacoEditor = lazy(() => import('@monaco-editor/react'));

export function CodeEditor(props) {
  return (
    <Suspense fallback={<EditorSkeleton />}>
      <MonacoEditor {...props} />
    </Suspense>
  );
}
```

**2. Prefetch sur Intention**
```typescript
// Prefetch Monaco quand l'utilisateur hover le bouton "Commencer"
const prefetchEditor = () => {
  import('@monaco-editor/react');
};

<Button onMouseEnter={prefetchEditor}>
  Commencer
</Button>
```

**3. Auto-save avec Debounce**
```typescript
// Sauvegarder le brouillon toutes les 2 secondes
const debouncedSave = useDebouncedCallback(
  (code: string) => saveProgress({ draft_code: code }),
  2000
);
```

### Métriques Cibles

| Métrique | Cible | Mesure |
|----------|-------|--------|
| LCP (Largest Contentful Paint) | < 2.5s | Page d'accueil |
| FID (First Input Delay) | < 100ms | Toutes pages |
| CLS (Cumulative Layout Shift) | < 0.1 | Toutes pages |
| TTI (Time to Interactive) | < 3.5s | Page leçon |

---

## 10. Déploiement

### Pipeline Vercel

```
1. Push sur main → Vercel build automatique
2. Preview deploys sur PR
3. Variables d'environnement dans Vercel Dashboard
```

### Checklist Pre-Production

- [ ] Variables d'environnement Vercel configurées
- [ ] Domaine personnalisé (pystep.fr)
- [ ] SSL automatique (Vercel)
- [ ] Supabase project en mode production
- [ ] RLS policies testées
- [ ] Analytics configuré (Plausible ou Vercel Analytics)

---

## 11. Roadmap Technique

### MVP (v1.0)
- [x] Architecture validée
- [ ] Setup projet (Vite + React + Tailwind)
- [ ] Authentification Supabase
- [ ] Éditeur Monaco + Preview
- [ ] Système de validation exercices
- [ ] Progression utilisateur
- [ ] 22 leçons HTML/CSS

### Post-MVP (v1.x)
- [ ] Badges et Streaks (gamification)
- [ ] Certificats PDF
- [ ] OAuth (Google, GitHub)
- [ ] Multilingue (ES, EN)
- [ ] PWA (offline)

### v2.0+
- [ ] Paiement Stripe
- [ ] Packs Python, JavaScript
- [ ] Forum communautaire
- [ ] Système de mentorat

---

## 12. Contacts Équipe

| Rôle | Agent | Responsabilités |
|------|-------|-----------------|
| Business Analyst | Mary | Product Brief, analyse marché |
| Product Manager | John | PRD, User Stories, priorisation |
| Architect | Winston | Architecture technique, stack |
| UX Designer | Sally | Wireframes, UI Kit, UX flows |
| Developer | Amelia | Implémentation, code |
| Tech Writer | Paige | Contenu pédagogique, docs |
| Test Architect | Murat | Tests, QA, CI/CD |

---

## Changelog

| Version | Date | Auteur | Modifications |
|---------|------|--------|---------------|
| 1.0 | 05/02/2026 | Winston | Création initiale |

---

*Ce document est la source de vérité pour l'architecture technique de Pystep. Toute modification majeure doit être validée par Winston.*
