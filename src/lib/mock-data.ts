import type { MealPlan, ShoppingList, ShoppingListItem } from '@/types/domain';

export function generateMockMealPlan(): MealPlan {
  const planId = crypto.randomUUID();
  const userId = 'user_123';
  const budgetEur = 50;
  const days = 5;

  const mealPlan: MealPlan = {
    plan_id: planId,
    generated_at: new Date().toISOString(),
    user_id: userId,
    metadata: {
      period_budget_eur: budgetEur,
      period_cost_eur: 43.25,
      budget_remaining_eur: 6.75,
      is_over_budget: false,
      generation_attempts: 1,
      days: days,
    },
    days: [
      {
        day_number: 1,
        date: new Date(Date.now()).toISOString().split('T')[0],
        totals: {
          calories: 1850,
          protein_g: 98,
          carbohydrates_g: 210,
          fats_g: 62,
          cost_eur: 8.50,
        },
        meals: [
          {
            meal_id: crypto.randomUUID(),
            meal_type: 'breakfast',
            recipe_name: 'Greek Yogurt with Berries & Granola',
            nutrition: {
              calories: 420,
              protein_g: 18,
              carbohydrates_g: 52,
              fats_g: 14,
            },
            cost: {
              meal_cost_eur: 2.40,
            },
            ingredients: [
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Greek Yogurt',
                quantity_g: 200,
                nutrition: { calories: 150, protein_g: 15, carbohydrates_g: 8, fats_g: 5 },
                cost_eur: 1.20,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Mixed Berries',
                quantity_g: 100,
                nutrition: { calories: 50, protein_g: 1, carbohydrates_g: 12, fats_g: 0 },
                cost_eur: 0.80,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Granola',
                quantity_g: 50,
                nutrition: { calories: 220, protein_g: 2, carbohydrates_g: 32, fats_g: 9 },
                cost_eur: 0.40,
              },
            ],
          },
          {
            meal_id: crypto.randomUUID(),
            meal_type: 'lunch',
            recipe_name: 'Chicken & Quinoa Bowl with Roasted Vegetables',
            nutrition: {
              calories: 680,
              protein_g: 48,
              carbohydrates_g: 72,
              fats_g: 22,
            },
            cost: {
              meal_cost_eur: 3.80,
            },
            ingredients: [
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Chicken Breast',
                quantity_g: 150,
                nutrition: { calories: 250, protein_g: 45, carbohydrates_g: 0, fats_g: 6 },
                cost_eur: 2.10,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Quinoa',
                quantity_g: 80,
                nutrition: { calories: 280, protein_g: 10, carbohydrates_g: 52, fats_g: 4 },
                cost_eur: 0.60,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Bell Peppers',
                quantity_g: 100,
                nutrition: { calories: 30, protein_g: 1, carbohydrates_g: 6, fats_g: 0 },
                cost_eur: 0.50,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Zucchini',
                quantity_g: 120,
                nutrition: { calories: 20, protein_g: 2, carbohydrates_g: 4, fats_g: 0 },
                cost_eur: 0.40,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Olive Oil',
                quantity_g: 10,
                nutrition: { calories: 100, protein_g: 0, carbohydrates_g: 0, fats_g: 12 },
                cost_eur: 0.20,
              },
            ],
          },
          {
            meal_id: crypto.randomUUID(),
            meal_type: 'dinner',
            recipe_name: 'Salmon with Sweet Potato & Broccoli',
            nutrition: {
              calories: 750,
              protein_g: 42,
              carbohydrates_g: 86,
              fats_g: 26,
            },
            cost: {
              meal_cost_eur: 5.30,
            },
            ingredients: [
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Salmon Fillet',
                quantity_g: 150,
                nutrition: { calories: 300, protein_g: 30, carbohydrates_g: 0, fats_g: 18 },
                cost_eur: 3.80,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Sweet Potato',
                quantity_g: 250,
                nutrition: { calories: 220, protein_g: 4, carbohydrates_g: 52, fats_g: 0 },
                cost_eur: 0.80,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Broccoli',
                quantity_g: 150,
                nutrition: { calories: 50, protein_g: 4, carbohydrates_g: 10, fats_g: 0 },
                cost_eur: 0.60,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Olive Oil',
                quantity_g: 8,
                nutrition: { calories: 80, protein_g: 0, carbohydrates_g: 0, fats_g: 8 },
                cost_eur: 0.10,
              },
            ],
          },
        ],
      },
      {
        day_number: 2,
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        totals: {
          calories: 1920,
          protein_g: 102,
          carbohydrates_g: 198,
          fats_g: 68,
          cost_eur: 8.90,
        },
        meals: [
          {
            meal_id: crypto.randomUUID(),
            meal_type: 'breakfast',
            recipe_name: 'Scrambled Eggs with Whole Grain Toast & Avocado',
            nutrition: {
              calories: 480,
              protein_g: 22,
              carbohydrates_g: 38,
              fats_g: 24,
            },
            cost: {
              meal_cost_eur: 2.80,
            },
            ingredients: [
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Eggs',
                quantity_g: 120,
                nutrition: { calories: 180, protein_g: 15, carbohydrates_g: 2, fats_g: 12 },
                cost_eur: 0.80,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Whole Grain Bread',
                quantity_g: 80,
                nutrition: { calories: 200, protein_g: 6, carbohydrates_g: 36, fats_g: 2 },
                cost_eur: 0.60,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Avocado',
                quantity_g: 80,
                nutrition: { calories: 100, protein_g: 1, carbohydrates_g: 0, fats_g: 10 },
                cost_eur: 1.40,
              },
            ],
          },
          {
            meal_id: crypto.randomUUID(),
            meal_type: 'lunch',
            recipe_name: 'Mediterranean Chickpea Salad',
            nutrition: {
              calories: 620,
              protein_g: 24,
              carbohydrates_g: 78,
              fats_g: 22,
            },
            cost: {
              meal_cost_eur: 2.90,
            },
            ingredients: [
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Chickpeas',
                quantity_g: 200,
                nutrition: { calories: 300, protein_g: 18, carbohydrates_g: 48, fats_g: 6 },
                cost_eur: 0.90,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Cherry Tomatoes',
                quantity_g: 120,
                nutrition: { calories: 25, protein_g: 1, carbohydrates_g: 5, fats_g: 0 },
                cost_eur: 0.70,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Cucumber',
                quantity_g: 100,
                nutrition: { calories: 15, protein_g: 1, carbohydrates_g: 3, fats_g: 0 },
                cost_eur: 0.40,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Feta Cheese',
                quantity_g: 50,
                nutrition: { calories: 130, protein_g: 7, carbohydrates_g: 2, fats_g: 10 },
                cost_eur: 0.90,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Olive Oil',
                quantity_g: 15,
                nutrition: { calories: 150, protein_g: 0, carbohydrates_g: 0, fats_g: 15 },
                cost_eur: 0.30,
              },
            ],
          },
          {
            meal_id: crypto.randomUUID(),
            meal_type: 'dinner',
            recipe_name: 'Turkey Bolognese with Whole Wheat Pasta',
            nutrition: {
              calories: 820,
              protein_g: 56,
              carbohydrates_g: 92,
              fats_g: 22,
            },
            cost: {
              meal_cost_eur: 3.20,
            },
            ingredients: [
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Ground Turkey',
                quantity_g: 150,
                nutrition: { calories: 240, protein_g: 42, carbohydrates_g: 0, fats_g: 8 },
                cost_eur: 2.00,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Whole Wheat Pasta',
                quantity_g: 100,
                nutrition: { calories: 340, protein_g: 12, carbohydrates_g: 68, fats_g: 2 },
                cost_eur: 0.50,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Tomato Sauce',
                quantity_g: 150,
                nutrition: { calories: 60, protein_g: 2, carbohydrates_g: 12, fats_g: 0 },
                cost_eur: 0.40,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Onion',
                quantity_g: 80,
                nutrition: { calories: 30, protein_g: 1, carbohydrates_g: 7, fats_g: 0 },
                cost_eur: 0.20,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Olive Oil',
                quantity_g: 10,
                nutrition: { calories: 100, protein_g: 0, carbohydrates_g: 0, fats_g: 12 },
                cost_eur: 0.10,
              },
            ],
          },
        ],
      },
      {
        day_number: 3,
        date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
        totals: {
          calories: 1780,
          protein_g: 92,
          carbohydrates_g: 205,
          fats_g: 58,
          cost_eur: 8.40,
        },
        meals: [
          {
            meal_id: crypto.randomUUID(),
            meal_type: 'breakfast',
            recipe_name: 'Banana Protein Smoothie with Oats',
            nutrition: {
              calories: 410,
              protein_g: 28,
              carbohydrates_g: 58,
              fats_g: 8,
            },
            cost: {
              meal_cost_eur: 2.20,
            },
            ingredients: [
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Banana',
                quantity_g: 120,
                nutrition: { calories: 110, protein_g: 1, carbohydrates_g: 28, fats_g: 0 },
                cost_eur: 0.30,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Protein Powder',
                quantity_g: 30,
                nutrition: { calories: 120, protein_g: 24, carbohydrates_g: 2, fats_g: 1 },
                cost_eur: 1.20,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Oats',
                quantity_g: 50,
                nutrition: { calories: 180, protein_g: 6, carbohydrates_g: 30, fats_g: 3 },
                cost_eur: 0.20,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Almond Milk',
                quantity_g: 250,
                nutrition: { calories: 30, protein_g: 1, carbohydrates_g: 2, fats_g: 2 },
                cost_eur: 0.50,
              },
            ],
          },
          {
            meal_id: crypto.randomUUID(),
            meal_type: 'lunch',
            recipe_name: 'Tuna & White Bean Salad',
            nutrition: {
              calories: 590,
              protein_g: 38,
              carbohydrates_g: 62,
              fats_g: 18,
            },
            cost: {
              meal_cost_eur: 3.10,
            },
            ingredients: [
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Canned Tuna',
                quantity_g: 120,
                nutrition: { calories: 140, protein_g: 30, carbohydrates_g: 0, fats_g: 2 },
                cost_eur: 1.80,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'White Beans',
                quantity_g: 180,
                nutrition: { calories: 240, protein_g: 14, carbohydrates_g: 42, fats_g: 1 },
                cost_eur: 0.70,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Mixed Greens',
                quantity_g: 80,
                nutrition: { calories: 20, protein_g: 2, carbohydrates_g: 3, fats_g: 0 },
                cost_eur: 0.40,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Cherry Tomatoes',
                quantity_g: 80,
                nutrition: { calories: 20, protein_g: 1, carbohydrates_g: 4, fats_g: 0 },
                cost_eur: 0.50,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Olive Oil',
                quantity_g: 12,
                nutrition: { calories: 120, protein_g: 0, carbohydrates_g: 0, fats_g: 12 },
                cost_eur: 0.20,
              },
            ],
          },
          {
            meal_id: crypto.randomUUID(),
            meal_type: 'dinner',
            recipe_name: 'Beef Stir-Fry with Brown Rice',
            nutrition: {
              calories: 780,
              protein_g: 46,
              carbohydrates_g: 85,
              fats_g: 22,
            },
            cost: {
              meal_cost_eur: 4.10,
            },
            ingredients: [
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Beef Sirloin',
                quantity_g: 120,
                nutrition: { calories: 250, protein_g: 36, carbohydrates_g: 0, fats_g: 12 },
                cost_eur: 2.80,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Brown Rice',
                quantity_g: 80,
                nutrition: { calories: 280, protein_g: 6, carbohydrates_g: 58, fats_g: 2 },
                cost_eur: 0.40,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Mixed Stir-Fry Vegetables',
                quantity_g: 200,
                nutrition: { calories: 80, protein_g: 4, carbohydrates_g: 16, fats_g: 0 },
                cost_eur: 0.80,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Soy Sauce',
                quantity_g: 20,
                nutrition: { calories: 10, protein_g: 1, carbohydrates_g: 1, fats_g: 0 },
                cost_eur: 0.10,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Sesame Oil',
                quantity_g: 8,
                nutrition: { calories: 80, protein_g: 0, carbohydrates_g: 0, fats_g: 8 },
                cost_eur: 0.20,
              },
            ],
          },
        ],
      },
      {
        day_number: 4,
        date: new Date(Date.now() + 259200000).toISOString().split('T')[0],
        totals: {
          calories: 1880,
          protein_g: 96,
          carbohydrates_g: 215,
          fats_g: 64,
          cost_eur: 8.60,
        },
        meals: [
          {
            meal_id: crypto.randomUUID(),
            meal_type: 'breakfast',
            recipe_name: 'Cottage Cheese Pancakes with Fresh Fruit',
            nutrition: {
              calories: 450,
              protein_g: 26,
              carbohydrates_g: 54,
              fats_g: 14,
            },
            cost: {
              meal_cost_eur: 2.60,
            },
            ingredients: [
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Cottage Cheese',
                quantity_g: 150,
                nutrition: { calories: 180, protein_g: 22, carbohydrates_g: 6, fats_g: 6 },
                cost_eur: 1.20,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Flour',
                quantity_g: 60,
                nutrition: { calories: 220, protein_g: 6, carbohydrates_g: 44, fats_g: 1 },
                cost_eur: 0.20,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Eggs',
                quantity_g: 60,
                nutrition: { calories: 90, protein_g: 8, carbohydrates_g: 1, fats_g: 6 },
                cost_eur: 0.40,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Strawberries',
                quantity_g: 100,
                nutrition: { calories: 40, protein_g: 1, carbohydrates_g: 9, fats_g: 0 },
                cost_eur: 0.80,
              },
            ],
          },
          {
            meal_id: crypto.randomUUID(),
            meal_type: 'lunch',
            recipe_name: 'Lentil & Vegetable Soup with Crusty Bread',
            nutrition: {
              calories: 620,
              protein_g: 28,
              carbohydrates_g: 98,
              fats_g: 12,
            },
            cost: {
              meal_cost_eur: 2.80,
            },
            ingredients: [
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Red Lentils',
                quantity_g: 100,
                nutrition: { calories: 340, protein_g: 24, carbohydrates_g: 58, fats_g: 2 },
                cost_eur: 0.60,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Carrots',
                quantity_g: 100,
                nutrition: { calories: 40, protein_g: 1, carbohydrates_g: 9, fats_g: 0 },
                cost_eur: 0.30,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Celery',
                quantity_g: 80,
                nutrition: { calories: 15, protein_g: 1, carbohydrates_g: 3, fats_g: 0 },
                cost_eur: 0.30,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Onion',
                quantity_g: 80,
                nutrition: { calories: 30, protein_g: 1, carbohydrates_g: 7, fats_g: 0 },
                cost_eur: 0.20,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Whole Grain Bread',
                quantity_g: 80,
                nutrition: { calories: 200, protein_g: 6, carbohydrates_g: 36, fats_g: 2 },
                cost_eur: 0.60,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Olive Oil',
                quantity_g: 10,
                nutrition: { calories: 100, protein_g: 0, carbohydrates_g: 0, fats_g: 10 },
                cost_eur: 0.20,
              },
            ],
          },
          {
            meal_id: crypto.randomUUID(),
            meal_type: 'dinner',
            recipe_name: 'Baked Cod with Roasted Potatoes & Green Beans',
            nutrition: {
              calories: 810,
              protein_g: 52,
              carbohydrates_g: 88,
              fats_g: 22,
            },
            cost: {
              meal_cost_eur: 4.20,
            },
            ingredients: [
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Cod Fillet',
                quantity_g: 180,
                nutrition: { calories: 180, protein_g: 40, carbohydrates_g: 0, fats_g: 2 },
                cost_eur: 3.20,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Potatoes',
                quantity_g: 300,
                nutrition: { calories: 240, protein_g: 6, carbohydrates_g: 54, fats_g: 0 },
                cost_eur: 0.60,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Green Beans',
                quantity_g: 150,
                nutrition: { calories: 45, protein_g: 2, carbohydrates_g: 10, fats_g: 0 },
                cost_eur: 0.70,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Olive Oil',
                quantity_g: 15,
                nutrition: { calories: 150, protein_g: 0, carbohydrates_g: 0, fats_g: 15 },
                cost_eur: 0.30,
              },
            ],
          },
        ],
      },
      {
        day_number: 5,
        date: new Date(Date.now() + 345600000).toISOString().split('T')[0],
        totals: {
          calories: 1900,
          protein_g: 100,
          carbohydrates_g: 208,
          fats_g: 66,
          cost_eur: 8.85,
        },
        meals: [
          {
            meal_id: crypto.randomUUID(),
            meal_type: 'breakfast',
            recipe_name: 'Veggie Omelet with Whole Grain Toast',
            nutrition: {
              calories: 440,
              protein_g: 26,
              carbohydrates_g: 42,
              fats_g: 18,
            },
            cost: {
              meal_cost_eur: 2.50,
            },
            ingredients: [
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Eggs',
                quantity_g: 150,
                nutrition: { calories: 225, protein_g: 19, carbohydrates_g: 2, fats_g: 15 },
                cost_eur: 1.00,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Spinach',
                quantity_g: 50,
                nutrition: { calories: 12, protein_g: 2, carbohydrates_g: 2, fats_g: 0 },
                cost_eur: 0.30,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Mushrooms',
                quantity_g: 60,
                nutrition: { calories: 20, protein_g: 3, carbohydrates_g: 3, fats_g: 0 },
                cost_eur: 0.50,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Cherry Tomatoes',
                quantity_g: 60,
                nutrition: { calories: 15, protein_g: 1, carbohydrates_g: 3, fats_g: 0 },
                cost_eur: 0.40,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Whole Grain Bread',
                quantity_g: 60,
                nutrition: { calories: 150, protein_g: 5, carbohydrates_g: 27, fats_g: 2 },
                cost_eur: 0.45,
              },
            ],
          },
          {
            meal_id: crypto.randomUUID(),
            meal_type: 'lunch',
            recipe_name: 'Chicken Caesar Wrap with Side Salad',
            nutrition: {
              calories: 660,
              protein_g: 44,
              carbohydrates_g: 68,
              fats_g: 24,
            },
            cost: {
              meal_cost_eur: 3.40,
            },
            ingredients: [
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Chicken Breast',
                quantity_g: 120,
                nutrition: { calories: 200, protein_g: 36, carbohydrates_g: 0, fats_g: 5 },
                cost_eur: 1.70,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Whole Wheat Tortilla',
                quantity_g: 80,
                nutrition: { calories: 240, protein_g: 8, carbohydrates_g: 42, fats_g: 5 },
                cost_eur: 0.60,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Romaine Lettuce',
                quantity_g: 80,
                nutrition: { calories: 15, protein_g: 1, carbohydrates_g: 3, fats_g: 0 },
                cost_eur: 0.40,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Parmesan Cheese',
                quantity_g: 20,
                nutrition: { calories: 80, protein_g: 7, carbohydrates_g: 1, fats_g: 5 },
                cost_eur: 0.50,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Caesar Dressing',
                quantity_g: 30,
                nutrition: { calories: 125, protein_g: 1, carbohydrates_g: 2, fats_g: 12 },
                cost_eur: 0.40,
              },
            ],
          },
          {
            meal_id: crypto.randomUUID(),
            meal_type: 'dinner',
            recipe_name: 'Vegetarian Chili with Cornbread',
            nutrition: {
              calories: 800,
              protein_g: 30,
              carbohydrates_g: 98,
              fats_g: 24,
            },
            cost: {
              meal_cost_eur: 2.95,
            },
            ingredients: [
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Kidney Beans',
                quantity_g: 200,
                nutrition: { calories: 260, protein_g: 18, carbohydrates_g: 46, fats_g: 2 },
                cost_eur: 0.80,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Black Beans',
                quantity_g: 150,
                nutrition: { calories: 195, protein_g: 13, carbohydrates_g: 35, fats_g: 1 },
                cost_eur: 0.70,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Tomato Sauce',
                quantity_g: 200,
                nutrition: { calories: 80, protein_g: 3, carbohydrates_g: 16, fats_g: 0 },
                cost_eur: 0.50,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Bell Peppers',
                quantity_g: 80,
                nutrition: { calories: 25, protein_g: 1, carbohydrates_g: 6, fats_g: 0 },
                cost_eur: 0.40,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Onion',
                quantity_g: 60,
                nutrition: { calories: 25, protein_g: 1, carbohydrates_g: 5, fats_g: 0 },
                cost_eur: 0.15,
              },
              {
                ingredient_id: crypto.randomUUID(),
                name: 'Cornbread',
                quantity_g: 100,
                nutrition: { calories: 300, protein_g: 6, carbohydrates_g: 48, fats_g: 10 },
                cost_eur: 0.60,
              },
            ],
          },
        ],
      },
    ],
    plan_totals: {
      calories: 9330,
      protein_g: 488,
      carbohydrates_g: 1036,
      fats_g: 318,
      total_cost_eur: 43.25,
    },
  };

  return mealPlan;
}

export function generateShoppingList(mealPlan: MealPlan): ShoppingList {
  const ingredientMap = new Map<string, { quantity: number; price: number; name: string }>();

  for (const day of mealPlan.days) {
    for (const meal of day.meals) {
      for (const ingredient of meal.ingredients) {
        const existing = ingredientMap.get(ingredient.ingredient_id);
        if (existing) {
          existing.quantity += ingredient.quantity_g;
          existing.price += ingredient.cost_eur;
        } else {
          ingredientMap.set(ingredient.ingredient_id, {
            quantity: ingredient.quantity_g,
            price: ingredient.cost_eur,
            name: ingredient.name,
          });
        }
      }
    }
  }

  const items: ShoppingListItem[] = Array.from(ingredientMap.entries()).map(
    ([id, data]) => ({
      ingredient_id: id,
      display_name: data.name,
      total_quantity: Math.ceil(data.quantity / 50) * 50,
      unit: 'g' as const,
      minimum_purchase_quantity: 100,
      estimated_price_eur: Number(data.price.toFixed(2)),
    })
  );

  const totalShoppingCost = items.reduce((sum, item) => sum + item.estimated_price_eur, 0);

  return {
    plan_id: mealPlan.plan_id,
    generated_at: new Date().toISOString(),
    items: items.sort((a, b) => a.display_name.localeCompare(b.display_name)),
    summary: {
      total_items: items.length,
      total_shopping_cost_eur: Number(totalShoppingCost.toFixed(2)),
      plan_cost_eur: mealPlan.plan_totals.total_cost_eur,
      waste_cost_eur: Number(Math.max(0, totalShoppingCost - mealPlan.plan_totals.total_cost_eur).toFixed(2)),
    },
  };
}
