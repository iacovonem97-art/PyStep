-- STORY-009: Table user_progress pour persistance de la progression
-- Executer dans Supabase Dashboard > SQL Editor

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

-- Index pour performance des requetes par utilisateur
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

-- Pas de policy DELETE : la progression ne peut pas etre supprimee par l'utilisateur
