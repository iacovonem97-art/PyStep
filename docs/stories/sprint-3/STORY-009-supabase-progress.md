# STORY-009: Sauvegarde progression Supabase

> **Status** : Done
> **Sprint** : 3
> **Epic** : 2 - Parcours d'apprentissage
> **PRD Reference** : US-2.3
> **Points** : 8
> **Assignee** : Amelia
> **Depends on** : STORY-008 (validation + feedback), Sprint 1 (auth Supabase)

---

## User Story

**En tant que** utilisateur connecte,
**Je veux** que ma progression et mon code en cours soient sauvegardes automatiquement,
**Afin de** reprendre exactement ou j'en etais meme apres deconnexion.

---

## Acceptance Criteria

### AC-1: Table user_progress (Supabase)
- [x] Table `user_progress` creee dans Supabase PostgreSQL
- [x] Schema : id (UUID PK), user_id (FK auth.users), lesson_id (VARCHAR), completed (BOOLEAN), completed_at (TIMESTAMPTZ), draft_code (TEXT), attempts (INTEGER), created_at, updated_at
- [x] Contrainte UNIQUE(user_id, lesson_id)
- [x] Index sur user_id pour performance

### AC-2: Row Level Security (RLS)
- [x] RLS active sur la table user_progress
- [x] Policy SELECT : utilisateur voit uniquement ses propres lignes (`auth.uid() = user_id`)
- [x] Policy INSERT : utilisateur insere uniquement pour lui-meme
- [x] Policy UPDATE : utilisateur modifie uniquement ses propres lignes
- [x] Policy DELETE : non autorise (pas de suppression de progression)

### AC-3: progressService (CRUD)
- [x] `fetchProgress(userId)` : recupere toutes les progressions de l'utilisateur
- [x] `saveProgress(userId, lessonId, data)` : upsert (insert or update) une progression
- [x] `saveDraftCode(userId, lessonId, code)` : sauvegarde le brouillon de code (debounced)
- [x] `markLessonComplete(userId, lessonId)` : marque une lecon comme terminee avec timestamp
- [x] Gestion d'erreur : retry 1x, puis fallback local state silencieux
- [x] Toutes les fonctions retournent des types TypeScript stricts (UserProgress)

### AC-4: useProgress refactorise
- [x] Au mount : charge la progression depuis Supabase (`fetchProgress`)
- [x] Loading state pendant le chargement initial
- [x] `completeLesson()` : appelle `markLessonComplete` + met a jour le state local
- [x] `saveDraft()` : appelle `saveDraftCode` (debounce 3s via DEBOUNCE_DELAY)
- [x] State local comme cache optimiste (UI reactive, sync en background)
- [x] API publique inchangee : `completedLessons`, `percentComplete`, `getCurrentLessonId`, `isModuleUnlocked`, etc.
- [x] Fallback gracieux : si Supabase echoue, fonctionne en mode local (comme avant)

### AC-5: Sauvegarde du brouillon de code
- [x] Le code tape dans l'editeur est sauvegarde en brouillon (draft_code) avec debounce
- [x] Au chargement d'une lecon : si un brouillon existe, le charger dans l'editeur
- [x] Si pas de brouillon, charger le starterCode de l'exercice
- [x] Le brouillon persiste entre les sessions (deconnexion/reconnexion)

### AC-6: Reprise automatique
- [x] Au login : redirection vers la derniere lecon non completee
- [x] Dashboard affiche la progression reelle depuis Supabase
- [x] Course map reflete les lecons completees en base
- [x] Lecon en cours pre-remplie avec le brouillon sauvegarde

### AC-7: Gestion utilisateur non connecte
- [x] Visiteur sur /lesson/:id (si accessible) : mode local uniquement, pas de sauvegarde
- [x] Message discret : "Connecte-toi pour sauvegarder ta progression"
- [x] Aucun crash si Supabase est indisponible

### AC-8: Tracking du nombre de tentatives
- [x] Chaque clic "Valider" incremente le compteur `attempts`
- [x] Le compteur est sauvegarde en base
- [x] Utilise pour analytics futures (pas affiche dans l'UI pour le MVP)

---

## Technical Tasks

### T1: SQL - Creer la table et les policies
- [x] Script SQL pour `CREATE TABLE user_progress` (cf. PRD Section 4)
- [x] Script SQL pour `CREATE INDEX idx_progress_user`
- [x] Script SQL pour les 3 policies RLS (SELECT, INSERT, UPDATE)
- [x] Documenter le script dans `docs/stories/sprint-3/sql/` pour reference
- [x] Executer sur le projet Supabase (dashboard ou CLI)

### T2: Creer progressService
- [x] Creer `src/features/progress/progressService.ts`
- [x] Fonction `fetchProgress(userId: string): Promise<UserProgress[]>`
- [x] Fonction `saveProgress(userId, lessonId, data): Promise<UserProgress>`
- [x] Fonction `saveDraftCode(userId, lessonId, code): Promise<void>`
- [x] Fonction `markLessonComplete(userId, lessonId): Promise<UserProgress>`
- [x] Error handling : try/catch avec console.warn, pas de throw vers l'UI
- [x] Test: fetchProgress retourne les progressions mockees
- [x] Test: markLessonComplete envoie le bon payload
- [x] Test: saveDraftCode appelle Supabase upsert
- [x] Test: gestion d'erreur (Supabase down → pas de crash)

### T3: Refactoriser useProgress
- [x] Ajouter `userId` en parametre (depuis AuthContext)
- [x] Ajouter `isLoading` state
- [x] useEffect au mount : appeler `fetchProgress` et hydrater le state
- [x] Modifier `completeLesson` : appeler `markLessonComplete` + state local
- [x] Ajouter `saveDraft(lessonId, code)` avec debounce (useDebounce existant)
- [x] Ajouter `getDraftCode(lessonId): string | null`
- [x] Fallback : si userId null (non connecte), mode local uniquement
- [x] Test: charge la progression au mount
- [x] Test: completeLesson sync avec Supabase
- [x] Test: mode local si pas de userId
- [x] Test: loading state pendant le fetch

### T4: Integrer le brouillon dans CodeEditor / LessonPage
- [x] LessonPage : au chargement, verifier s'il y a un brouillon
- [x] Si brouillon existe → initialiser l'editeur avec le brouillon
- [x] Si pas de brouillon → utiliser starterCode
- [x] Sur chaque changement de code → `saveDraft(lessonId, code)` (debounced)
- [x] Test: editeur charge le brouillon si disponible
- [x] Test: editeur charge starterCode si pas de brouillon
- [x] Test: saveDraft appele sur changement de code

### T5: Integrer la progression dans le Dashboard
- [x] Dashboard utilise useProgress (qui charge depuis Supabase)
- [x] ProgressBar reflete les donnees reelles
- [x] ModuleCard affiche le bon statut (active/locked/complete)
- [x] "Continuer" pointe vers la bonne lecon
- [x] Test: dashboard affiche la progression chargee

### T6: Integrer la progression dans la Course Map
- [x] CoursePage utilise useProgress (donnees Supabase)
- [x] LessonListItem affiche le bon statut (completed/current/locked)
- [x] Module unlock logic fonctionne avec les donnees persistees
- [x] Test: course map reflete la progression sauvegardee

### T7: Integration tests end-to-end
- [x] Test: complete lecon → rafraichir → progression persistee
- [x] Test: tape du code → deconnexion → reconnexion → brouillon restaure
- [x] Test: Supabase down → app fonctionne en mode degrade (local)
- [x] Test: utilisateur non connecte → pas d'appels Supabase

---

## Design References

- **Architecture** : `docs/project-context.md` Section 4 (Data Model)
- **Types existants** : `src/types/progress.ts` (UserProgress, ProgressState)
- **Hook existant** : `src/features/progress/useProgress.ts` (a refactoriser)
- **Supabase client** : `src/lib/supabase.ts` (deja configure)
- **Debounce hook** : `src/hooks/useDebounce.ts` (existe)

---

## SQL Reference

```sql
-- Table progression
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  lesson_id VARCHAR(10) NOT NULL,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  draft_code TEXT,
  attempts INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

CREATE INDEX idx_progress_user ON user_progress(user_id);

-- RLS Policies
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own progress"
  ON user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own progress"
  ON user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own progress"
  ON user_progress FOR UPDATE
  USING (auth.uid() = user_id);
```

---

## Testing Strategy

**Mock Supabase** dans tous les tests unitaires :
```typescript
vi.mock('../../lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      upsert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn(),
    })),
  },
}))
```

**Objectif tests** : ~40 tests nouveaux (service + hook + integration)

---

## Out of Scope

- Synchronisation temps reel (Supabase Realtime subscriptions)
- Conflit de merge si meme utilisateur sur 2 onglets (last write wins)
- Migration de donnees locales vers Supabase (nouveau compte = progression vierge)
- Affichage du nombre de tentatives dans l'UI
- Offline mode avec sync automatique

---

## Definition of Done

- [x] Table user_progress creee avec RLS
- [x] progressService avec CRUD complet
- [x] useProgress refactorise (Supabase + fallback local)
- [x] Brouillon de code sauvegarde et restaure
- [x] Dashboard et Course Map refletent la progression persistee
- [x] Fallback gracieux si Supabase down
- [x] All tests passing (objectif : +40 tests)
- [x] Code reviewed
- [x] Commit : `feat(STORY-009): save progress to Supabase`
