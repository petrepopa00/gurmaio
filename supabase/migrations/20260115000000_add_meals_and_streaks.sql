-- ==================================================
-- GURMAIO - ADD MEALS + STREAKS TABLES (MIGRATION)
-- Date: 2026-01-15
--
-- NOTE: Do not run automatically. Apply manually in Supabase SQL editor.
-- This migration complements the existing initial schema.
-- ==================================================

-- Meals table - normalized meals extracted from meal_plans.days JSON
CREATE TABLE IF NOT EXISTS meals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  meal_id TEXT NOT NULL,
  plan_id TEXT NOT NULL,
  day_number INTEGER NOT NULL,
  date DATE NOT NULL,
  meal_type TEXT NOT NULL,
  recipe_name TEXT NOT NULL,
  nutrition JSONB NOT NULL,
  cost_eur DECIMAL(10,2) NOT NULL,
  ingredients JSONB NOT NULL,
  cooking_instructions JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, meal_id)
);

CREATE INDEX IF NOT EXISTS idx_meals_user_id ON meals(user_id);
CREATE INDEX IF NOT EXISTS idx_meals_plan_id ON meals(user_id, plan_id);
CREATE INDEX IF NOT EXISTS idx_meals_date ON meals(user_id, date);

ALTER TABLE meals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own meals" ON meals
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own meals" ON meals
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own meals" ON meals
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own meals" ON meals
  FOR DELETE USING (auth.uid() = user_id);

-- Streaks table - optional snapshot updated by backend
CREATE TABLE IF NOT EXISTS streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  streak_active BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

CREATE INDEX IF NOT EXISTS idx_streaks_user_id ON streaks(user_id);

ALTER TABLE streaks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own streaks" ON streaks
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own streaks" ON streaks
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own streaks" ON streaks
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own streaks" ON streaks
  FOR DELETE USING (auth.uid() = user_id);
