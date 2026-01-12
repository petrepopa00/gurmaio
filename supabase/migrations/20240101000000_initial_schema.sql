-- Initial Database Schema for Meal Planning App


-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TE
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

-- Meal plans table: Top-level meal plans
  id UUID PRIMARY KEY DEFAULT uuid_ge
  start_date DATE NOT NULL,
  budget DECIMAL(10,2) NOT NULL CHECK (budget >= 0),
  updated_at

CREATE TABLE IF NOT EXISTS meals (
  meal_plan_id UUID REFERENCES meal_plans(id) ON DE
  

  fats DECIMAL(8,2) CHECK (fats >= 0),
  created_at TIMESTAMP WITH TIME ZONE D

CREATE TABLE IF NOT EXISTS shopping_items (
  start_date DATE NOT NULL,
  days INTEGER NOT NULL CHECK (days > 0),
  budget DECIMAL(10,2) NOT NULL CHECK (budget >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Meals table: Individual meals within meal plans
CREATE TABLE IF NOT EXISTS meals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  meal_plan_id UUID REFERENCES meal_plans(id) ON DELETE CASCADE NOT NULL,
  day INTEGER NOT NULL CHECK (day > 0),
  type TEXT NOT NULL,
  calories INTEGER CHECK (calories >= 0),
  protein DECIMAL(8,2) CHECK (protein >= 0),
  carbs DECIMAL(8,2) CHECK (carbs >= 0),
  fats DECIMAL(8,2) CHECK (fats >= 0),
  cost DECIMAL(10,2) CHECK (cost >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shopping items table: Shopping list items for meal plans
CREATE TABLE IF NOT EXISTS shopping_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  meal_plan_id UUID REFERENCES meal_plans(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  quantity DECIMAL(10,2) NOT NULL CHECK (quantity > 0),
  unit TEXT NOT NULL,
CREATE INDEX IF NOT EXISTS idx_user_progr
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
--

-- Enable RLS on all tables
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  completed_meals JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
CREATE POLICY "Users ca
);

-- ============================================================================
  USING (a
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_meal_plans_user_id ON meal_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_meal_plans_start_date ON meal_plans(user_id, start_date);
CREATE INDEX IF NOT EXISTS idx_meals_meal_plan_id ON meals(meal_plan_id);
CREATE INDEX IF NOT EXISTS idx_meals_day ON meals(meal_plan_id, day);
CREATE INDEX IF NOT EXISTS idx_shopping_items_meal_plan_id ON shopping_items(meal_plan_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_date ON user_progress(user_id, date);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Users can only access me
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopping_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
  ON meals FOR INSERT 
  ON profiles FOR SELECT 
      SELECT 1 FROM meal_plans 

    )
  ON profiles FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

    EXISTS (
  ON profiles FOR UPDATE 
  );

CREATE POLICY "Users can delete own profile" 
  ON profiles FOR DELETE 
  USING (auth.uid() = user_id);

-- RLS Policies for meal_plans
CREATE POLICY "Users can view own meal plans" 
  ON meal_plans FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own meal plans" 
  USING (
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own meal plans" 
  );
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own meal plans" 
      SELECT 1 FROM meal_pl
  USING (auth.uid() = user_id);

-- RLS Policies for meals
-- Users can only access meals from their own meal plans
CREATE POLICY "Users can view own meals" 
    EXISTS (
  USING (
COMMENT ON T
COMMENT ON TABLE shopping_items

COMMENT ON COLUMN profiles.preferences IS
COMME
COMM







































































































































