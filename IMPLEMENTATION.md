# Gurmaio Implementation Guide

## Overview

This document provides step-by-step instructions for implementing the Gurmaio backend on Cloudflare Workers with Supabase.

---

## Prerequisites

- Node.js 18+ and npm
- Cloudflare account with Workers enabled
- Supabase account and project
- OpenAI API key (or alternative AI provider)

---

## Step 1: Database Setup (Supabase)

### 1.1 Create Supabase Project

1. Go to https://supabase.com
2. Create a new project
3. Note your project URL and service role key

### 1.2 Run Migrations

Execute the following SQL in your Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

-- User profiles table
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  budget_eur DECIMAL(10, 2) NOT NULL,
  budget_period TEXT NOT NULL CHECK (budget_period IN ('daily', 'weekly')),
  meal_plan_days INTEGER NOT NULL,
  dietary_preferences TEXT[] DEFAULT '{}',
  allergens TEXT[] DEFAULT '{}',
  cuisine_preferences TEXT[] DEFAULT '{}',
  target_calories INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Ingredient nutrition table
CREATE TABLE ingredient_nutrition (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ingredient_name TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  
  calories_per_100g DECIMAL(8, 2) NOT NULL,
  protein_per_100g DECIMAL(6, 2) NOT NULL,
  carbohydrates_per_100g DECIMAL(6, 2) NOT NULL,
  fats_per_100g DECIMAL(6, 2) NOT NULL,
  
  contains_gluten BOOLEAN DEFAULT FALSE,
  contains_dairy BOOLEAN DEFAULT FALSE,
  contains_nuts BOOLEAN DEFAULT FALSE,
  contains_shellfish BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ingredient_category ON ingredient_nutrition(category);
CREATE INDEX idx_ingredient_name ON ingredient_nutrition(ingredient_name);

-- Grocery price estimates table
CREATE TABLE grocery_price_estimates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ingredient_id UUID REFERENCES ingredient_nutrition(id),
  region TEXT NOT NULL DEFAULT 'EU',
  
  price_per_100g_eur DECIMAL(8, 2) NOT NULL,
  minimum_purchase_quantity_g INTEGER NOT NULL,
  typical_package_size_g INTEGER,
  
  currency_code TEXT DEFAULT 'EUR',
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(ingredient_id, region)
);

CREATE INDEX idx_price_ingredient ON grocery_price_estimates(ingredient_id);
CREATE INDEX idx_price_region ON grocery_price_estimates(region);

-- Meal plans table
CREATE TABLE meal_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  
  period_budget_eur DECIMAL(10, 2) NOT NULL,
  period_cost_eur DECIMAL(10, 2) NOT NULL,
  budget_remaining_eur DECIMAL(10, 2) NOT NULL,
  is_over_budget BOOLEAN DEFAULT FALSE,
  generation_attempts INTEGER DEFAULT 1,
  
  plan_data JSONB NOT NULL,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_meal_plans_user ON meal_plans(user_id);
CREATE INDEX idx_meal_plans_active ON meal_plans(user_id, is_active) WHERE is_active = TRUE;

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_plans ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY user_profiles_policy ON user_profiles
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY meal_plans_policy ON meal_plans
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY ingredient_nutrition_read ON ingredient_nutrition
  FOR SELECT USING (true);

CREATE POLICY grocery_price_read ON grocery_price_estimates
  FOR SELECT USING (true);
```

### 1.3 Seed Ingredient Data

```sql
-- Sample ingredient data
INSERT INTO ingredient_nutrition (ingredient_name, category, calories_per_100g, protein_per_100g, carbohydrates_per_100g, fats_per_100g) VALUES
('Chicken Breast', 'protein', 165, 31, 0, 3.6),
('Salmon Fillet', 'protein', 206, 22, 0, 13),
('Ground Turkey', 'protein', 160, 28, 0, 5),
('Greek Yogurt', 'dairy', 97, 10, 3.6, 0.4),
('Brown Rice', 'grain', 370, 7.5, 77.2, 2.9),
('Quinoa', 'grain', 368, 14.1, 64.2, 6.1),
('Sweet Potato', 'vegetable', 86, 1.6, 20.1, 0.1),
('Broccoli', 'vegetable', 34, 2.8, 7, 0.4),
('Spinach', 'vegetable', 23, 2.9, 3.6, 0.4);

-- Sample price data
INSERT INTO grocery_price_estimates (ingredient_id, region, price_per_100g_eur, minimum_purchase_quantity_g) 
SELECT id, 'EU', 1.40, 250 FROM ingredient_nutrition WHERE ingredient_name = 'Chicken Breast';

INSERT INTO grocery_price_estimates (ingredient_id, region, price_per_100g_eur, minimum_purchase_quantity_g) 
SELECT id, 'EU', 2.50, 200 FROM ingredient_nutrition WHERE ingredient_name = 'Salmon Fillet';
```

---

## Step 2: Cloudflare Workers Setup

### 2.1 Initialize Project

```bash
npm create cloudflare@latest gurmaio-api
cd gurmaio-api
npm install
```

### 2.2 Install Dependencies

```bash
npm install @supabase/supabase-js openai zod
npm install -D @types/node
```

### 2.3 Configure wrangler.toml

```toml
name = "gurmaio-api"
main = "src/index.ts"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]

[env.production]
vars = { ENVIRONMENT = "production" }
```

### 2.4 Set Secrets

```bash
wrangler secret put SUPABASE_URL
# Enter: https://xxxxx.supabase.co

wrangler secret put SUPABASE_SERVICE_KEY
# Enter: your service role key

wrangler secret put OPENAI_API_KEY
# Enter: sk-...
```

---

## Step 3: Implement Core Engines

### 3.1 Nutrition Engine (`src/engines/nutrition.ts`)

```typescript
interface NutritionPer100g {
  calories: number;
  protein: number;
  carbohydrates: number;
  fats: number;
}

export class NutritionEngine {
  constructor(private nutritionDB: Map<string, NutritionPer100g>) {}

  calculateIngredient(ingredientId: string, quantityG: number) {
    const base = this.nutritionDB.get(ingredientId);
    if (!base) throw new Error(`Missing nutrition data: ${ingredientId}`);

    const factor = quantityG / 100;
    return {
      calories: Math.round(base.calories * factor * 10) / 10,
      protein_g: Math.round(base.protein * factor * 10) / 10,
      carbohydrates_g: Math.round(base.carbohydrates * factor * 10) / 10,
      fats_g: Math.round(base.fats * factor * 10) / 10,
    };
  }

  aggregateMeal(ingredients: Array<{ id: string; quantity: number }>) {
    return ingredients.reduce(
      (total, ing) => {
        const nutrition = this.calculateIngredient(ing.id, ing.quantity);
        return {
          calories: total.calories + nutrition.calories,
          protein_g: total.protein_g + nutrition.protein_g,
          carbohydrates_g: total.carbohydrates_g + nutrition.carbohydrates_g,
          fats_g: total.fats_g + nutrition.fats_g,
        };
      },
      { calories: 0, protein_g: 0, carbohydrates_g: 0, fats_g: 0 }
    );
  }
}
```

### 3.2 Cost Engine (`src/engines/cost.ts`)

```typescript
interface PriceData {
  pricePerUnit: number;
  minimumQuantity: number;
}

export class CostEngine {
  constructor(private priceDB: Map<string, PriceData>) {}

  calculateIngredient(ingredientId: string, quantityG: number): number {
    const price = this.priceDB.get(ingredientId);
    if (!price) throw new Error(`Missing price data: ${ingredientId}`);

    const cost = (quantityG / 100) * price.pricePerUnit;
    return Math.round(cost * 100) / 100;
  }

  aggregateMeal(ingredients: Array<{ id: string; quantity: number }>): number {
    const total = ingredients.reduce((sum, ing) => {
      return sum + this.calculateIngredient(ing.id, ing.quantity);
    }, 0);
    return Math.round(total * 100) / 100;
  }

  validateBudget(planCost: number, budget: number) {
    const remaining = budget - planCost;
    return {
      isOverBudget: remaining < 0,
      remaining: Math.round(remaining * 100) / 100,
    };
  }
}
```

---

## Step 4: Implement API Routes

### 4.1 Auth Middleware (`src/middleware/auth.ts`)

```typescript
import { createClient } from '@supabase/supabase-js';

export async function validateAuth(request: Request, env: Env) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('Missing authorization');
  }

  const token = authHeader.substring(7);
  const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) throw new Error('Invalid token');

  return user;
}
```

### 4.2 Meal Plan Generation (`src/routes/meal-plans.ts`)

```typescript
export async function generateMealPlan(request: Request, env: Env) {
  const user = await validateAuth(request, env);
  
  // 1. Fetch user profile
  const profile = await fetchUserProfile(user.id, env);
  
  // 2. Load nutrition and price databases
  const nutritionDB = await loadNutritionDB(env);
  const priceDB = await loadPriceDB(env);
  
  // 3. Initialize engines
  const nutritionEngine = new NutritionEngine(nutritionDB);
  const costEngine = new CostEngine(priceDB);
  
  // 4. Generate with budget enforcement
  let attempts = 0;
  const maxAttempts = 3;
  
  while (attempts < maxAttempts) {
    attempts++;
    
    // Call AI for meal structure
    const mealStructure = await callAI(profile, env);
    
    // Enrich with calculations
    const enrichedPlan = enrichPlan(mealStructure, nutritionEngine, costEngine);
    
    // Check budget
    const budgetCheck = costEngine.validateBudget(
      enrichedPlan.totalCost,
      profile.budget
    );
    
    if (!budgetCheck.isOverBudget) {
      // Success! Save and return
      await saveMealPlan(user.id, enrichedPlan, env);
      return Response.json(enrichedPlan);
    }
    
    // Retry with tighter constraints
    profile.budget *= 0.85;
  }
  
  throw new Error('Could not generate within budget');
}
```

---

## Step 5: Deploy

```bash
# Deploy to production
wrangler deploy

# View logs
wrangler tail
```

---

## Step 6: Flutter Client Integration

### 6.1 Add Dependencies

```yaml
dependencies:
  supabase_flutter: ^2.0.0
  http: ^1.0.0
```

### 6.2 Initialize Supabase

```dart
import 'package:supabase_flutter/supabase_flutter.dart';

void main() async {
  await Supabase.initialize(
    url: 'YOUR_SUPABASE_URL',
    anonKey: 'YOUR_ANON_KEY',
  );
  
  runApp(MyApp());
}
```

### 6.3 API Service

```dart
class GurmaioAPI {
  final String baseUrl = 'https://gurmaio-api.workers.dev';
  
  Future<MealPlan> generateMealPlan() async {
    final token = Supabase.instance.client.auth.currentSession?.accessToken;
    
    final response = await http.post(
      Uri.parse('$baseUrl/meal-plans/generate'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
    );
    
    if (response.statusCode == 200) {
      return MealPlan.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Failed to generate meal plan');
    }
  }
}
```

---

## Testing

### Unit Tests

```typescript
import { describe, it, expect } from 'vitest';
import { NutritionEngine } from './engines/nutrition';

describe('NutritionEngine', () => {
  it('calculates ingredient nutrition correctly', () => {
    const db = new Map([
      ['chicken', { calories: 165, protein: 31, carbohydrates: 0, fats: 3.6 }],
    ]);
    
    const engine = new NutritionEngine(db);
    const result = engine.calculateIngredient('chicken', 150);
    
    expect(result.calories).toBe(247.5);
    expect(result.protein_g).toBe(46.5);
  });
});
```

### Integration Tests

```bash
# Run tests
npm test

# Test API endpoints
curl -X POST https://gurmaio-api.workers.dev/meal-plans/generate \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Monitoring

### Cloudflare Analytics

Monitor in Cloudflare Dashboard:
- Request count
- Error rate
- P50/P95/P99 latency
- Geographic distribution

### Custom Logging

```typescript
export async function logEvent(event: string, data: any, env: Env) {
  await env.ANALYTICS.writeDataPoint({
    blobs: [event, JSON.stringify(data)],
    doubles: [Date.now()],
    indexes: [event],
  });
}
```

---

## Production Checklist

- [ ] Database migrations applied
- [ ] Ingredient database populated (500+ items)
- [ ] Price database populated for target regions
- [ ] Secrets configured in Cloudflare
- [ ] Rate limiting enabled
- [ ] CORS configured for client domains
- [ ] Error tracking integrated (Sentry/Datadog)
- [ ] Analytics configured
- [ ] Load testing completed
- [ ] Security audit passed
- [ ] GDPR compliance verified
- [ ] App Store/Play Store submissions prepared

---

## Support & Maintenance

### Database Backups

Supabase automatic backups enabled (7-day retention minimum)

### Price Updates

Scheduled worker to update grocery prices weekly:

```typescript
export default {
  async scheduled(event: ScheduledEvent, env: Env) {
    await updateGroceryPrices(env);
  },
};
```

### Scaling Considerations

- Cloudflare Workers auto-scale to millions of requests
- Supabase connection pooling handles concurrent queries
- Consider read replicas for high traffic regions
- Cache frequently accessed ingredient/price data

---

## Troubleshooting

### Common Issues

**Issue**: "Missing nutrition data"
**Solution**: Ensure all AI-generated ingredient IDs exist in `ingredient_nutrition` table

**Issue**: "Budget exceeded after 3 attempts"
**Solution**: Check if user budget is realistic for their preferences. Provide minimum budget recommendation.

**Issue**: "Supabase connection timeout"
**Solution**: Verify service role key, check Supabase status, implement retry logic

---

## Next Steps

1. Implement meal plan history
2. Add ingredient substitution engine
3. Integrate grocery delivery APIs
4. Build nutritionist review system
5. Implement ML-based preference learning
6. Add social sharing features
7. Create mobile app push notifications
8. Implement multi-language support
