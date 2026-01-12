import { describe, it, expect } from 'vitest';
import { generateMealPlan, generateShoppingList } from '../lib/mock-data';
import type { UserProfile } from '../types/domain';

describe('Meal Plan Generation Tests', () => {
  const testProfile: UserProfile = {
    dietary_preferences: ['Vegetarian'],
    allergens: [],
    cuisine_preferences: ['Italian', 'Mediterranean'],
    budget_eur: 50,
    budget_period: 'weekly',
    meal_plan_days: 7,
    meals_per_day: 3,
    target_calories: 2000,
  };

  describe('Basic Meal Plan Generation', () => {
    it('should generate meal plan with correct number of days', async () => {
      const plan = await generateMealPlan(testProfile);
      expect(plan.days).toHaveLength(testProfile.meal_plan_days);
    });

    it('should generate correct meals per day', async () => {
      const plan = await generateMealPlan(testProfile);
      plan.days.forEach(day => {
        expect(day.meals).toHaveLength(testProfile.meals_per_day);
      });
    });

    it('should have unique plan ID', async () => {
      const plan1 = await generateMealPlan(testProfile);
      const plan2 = await generateMealPlan(testProfile);
      expect(plan1.plan_id).not.toBe(plan2.plan_id);
    });

    it('should include metadata', async () => {
      const plan = await generateMealPlan(testProfile);
      expect(plan.metadata).toBeDefined();
      expect(plan.metadata.days).toBe(testProfile.meal_plan_days);
      expect(plan.metadata.period_budget_eur).toBe(testProfile.budget_eur);
    });
  });

  describe('Dietary Preferences', () => {
    it('should respect vegetarian preference', async () => {
      const vegProfile = { ...testProfile, dietary_preferences: ['Vegetarian'] };
      const plan = await generateMealPlan(vegProfile);
      
      plan.days.forEach(day => {
        day.meals.forEach(meal => {
          const meatIngredients = meal.ingredients.filter(ing => 
            ['Chicken', 'Beef', 'Pork', 'Fish'].some(meat => 
              ing.name.toLowerCase().includes(meat.toLowerCase())
            )
          );
          expect(meatIngredients).toHaveLength(0);
        });
      });
    });

    it('should handle vegan preference', async () => {
      const veganProfile = { ...testProfile, dietary_preferences: ['Vegan'] };
      const plan = await generateMealPlan(veganProfile);
      expect(plan).toBeDefined();
    });

    it('should handle gluten-free preference', async () => {
      const gfProfile = { ...testProfile, dietary_preferences: ['Gluten-Free'] };
      const plan = await generateMealPlan(gfProfile);
      expect(plan).toBeDefined();
    });
  });

  describe('Budget Constraints', () => {
    it('should attempt to stay within budget', async () => {
      const plan = await generateMealPlan(testProfile);
      expect(plan.metadata.period_cost_eur).toBeLessThanOrEqual(testProfile.budget_eur * 1.2);
    });

    it('should calculate daily budget from weekly', async () => {
      const weeklyProfile = { ...testProfile, budget_period: 'weekly' as const, budget_eur: 70 };
      const plan = await generateMealPlan(weeklyProfile);
      const dailyAverage = plan.metadata.period_cost_eur / plan.metadata.days;
      expect(dailyAverage).toBeGreaterThan(0);
    });

    it('should flag when over budget', async () => {
      const plan = await generateMealPlan(testProfile);
      if (plan.metadata.period_cost_eur > plan.metadata.period_budget_eur) {
        expect(plan.metadata.is_over_budget).toBe(true);
      }
    });
  });

  describe('Nutrition Calculations', () => {
    it('should calculate daily nutrition totals', async () => {
      const plan = await generateMealPlan(testProfile);
      
      plan.days.forEach(day => {
        const calculatedCalories = day.meals.reduce((sum, meal) => 
          sum + meal.nutrition.calories, 0
        );
        expect(Math.abs(day.totals.calories - calculatedCalories)).toBeLessThan(1);
      });
    });

    it('should calculate plan-wide totals', async () => {
      const plan = await generateMealPlan(testProfile);
      
      const calculatedCalories = plan.days.reduce((sum, day) => 
        sum + day.totals.calories, 0
      );
      expect(Math.abs(plan.plan_totals.calories - calculatedCalories)).toBeLessThan(1);
    });

    it('should include macronutrients', async () => {
      const plan = await generateMealPlan(testProfile);
      
      plan.days.forEach(day => {
        day.meals.forEach(meal => {
          expect(meal.nutrition.protein_g).toBeGreaterThan(0);
          expect(meal.nutrition.carbohydrates_g).toBeGreaterThanOrEqual(0);
          expect(meal.nutrition.fats_g).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('Meal Types', () => {
    it('should have breakfast meals', async () => {
      const plan = await generateMealPlan(testProfile);
      const hasBreakfast = plan.days.some(day => 
        day.meals.some(meal => meal.meal_type === 'breakfast')
      );
      expect(hasBreakfast).toBe(true);
    });

    it('should distribute meal types appropriately', async () => {
      const plan = await generateMealPlan(testProfile);
      
      plan.days.forEach(day => {
        const mealTypes = day.meals.map(m => m.meal_type);
        expect(new Set(mealTypes).size).toBe(mealTypes.length);
      });
    });
  });

  describe('Shopping List Generation', () => {
    it('should generate shopping list from meal plan', async () => {
      const plan = await generateMealPlan(testProfile);
      const shoppingList = generateShoppingList(plan);
      
      expect(shoppingList).toBeDefined();
      expect(shoppingList.items.length).toBeGreaterThan(0);
    });

    it('should consolidate duplicate ingredients', async () => {
      const plan = await generateMealPlan(testProfile);
      const shoppingList = generateShoppingList(plan);
      
      const ingredientIds = shoppingList.items.map(item => item.ingredient_id);
      const uniqueIds = new Set(ingredientIds);
      expect(ingredientIds.length).toBe(uniqueIds.size);
    });

    it('should calculate total quantities', async () => {
      const plan = await generateMealPlan(testProfile);
      const shoppingList = generateShoppingList(plan);
      
      shoppingList.items.forEach(item => {
        expect(item.total_quantity).toBeGreaterThan(0);
        expect(item.unit).toBeDefined();
      });
    });

    it('should have display names for ingredients', async () => {
      const plan = await generateMealPlan(testProfile);
      const shoppingList = generateShoppingList(plan);
      
      shoppingList.items.forEach(item => {
        expect(item.display_name).toBeDefined();
        expect(item.display_name.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Cost Calculations', () => {
    it('should calculate meal costs', async () => {
      const plan = await generateMealPlan(testProfile);
      
      plan.days.forEach(day => {
        day.meals.forEach(meal => {
          expect(meal.cost.meal_cost_eur).toBeGreaterThan(0);
        });
      });
    });

    it('should sum daily costs', async () => {
      const plan = await generateMealPlan(testProfile);
      
      plan.days.forEach(day => {
        const calculatedCost = day.meals.reduce((sum, meal) => 
          sum + meal.cost.meal_cost_eur, 0
        );
        expect(Math.abs(day.totals.cost_eur - calculatedCost)).toBeLessThan(0.01);
      });
    });

    it('should calculate total plan cost', async () => {
      const plan = await generateMealPlan(testProfile);
      
      const calculatedTotal = plan.days.reduce((sum, day) => 
        sum + day.totals.cost_eur, 0
      );
      expect(Math.abs(plan.metadata.period_cost_eur - calculatedTotal)).toBeLessThan(0.01);
    });
  });

  describe('Ingredients & Recipes', () => {
    it('should include ingredients for each meal', async () => {
      const plan = await generateMealPlan(testProfile);
      
      plan.days.forEach(day => {
        day.meals.forEach(meal => {
          expect(meal.ingredients.length).toBeGreaterThan(0);
        });
      });
    });

    it('should include cooking instructions', async () => {
      const plan = await generateMealPlan(testProfile);
      
      plan.days.forEach(day => {
        day.meals.forEach(meal => {
          if (meal.cooking_instructions) {
            expect(meal.cooking_instructions.length).toBeGreaterThan(0);
          }
        });
      });
    });

    it('should have unique meal IDs', async () => {
      const plan = await generateMealPlan(testProfile);
      
      const mealIds = plan.days.flatMap(day => 
        day.meals.map(meal => meal.meal_id)
      );
      const uniqueIds = new Set(mealIds);
      expect(mealIds.length).toBe(uniqueIds.size);
    });
  });
});
