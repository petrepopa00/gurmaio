import { useState, useEffect } from 'react';
import type { MealPlan } from '@/types/domain';
import type { Language } from '@/lib/i18n/translations';
import { translateMealBatch } from '@/lib/ai-content-translator';

interface TranslatedMealPlan extends MealPlan {
  _isTranslating?: boolean;
  _translationLanguage?: Language;
}

interface UseTranslatedMealPlanOptions {
  onTranslationComplete?: () => void;
  onTranslationError?: (error: Error) => void;
}

export function useTranslatedMealPlan(
  mealPlan: MealPlan | null, 
  targetLanguage: Language,
  options?: UseTranslatedMealPlanOptions
) {
  const [translatedPlan, setTranslatedPlan] = useState<TranslatedMealPlan | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    if (!mealPlan) {
      setTranslatedPlan(null);
      return;
    }

    if (targetLanguage === 'en') {
      setTranslatedPlan(mealPlan);
      return;
    }

    const translate = async () => {
      setIsTranslating(true);

      try {
        const allMeals = mealPlan.days.flatMap(day => 
          day.meals.map(meal => ({
            recipe_name: meal.recipe_name,
            ingredients: meal.ingredients,
            cooking_instructions: meal.cooking_instructions || [],
          }))
        );
        const translationsMap = await translateMealBatch(allMeals, targetLanguage);

        const translatedDays = mealPlan.days.map(day => ({
          ...day,
          meals: day.meals.map(meal => {
            const mealNameKey = `meal:${meal.recipe_name}`;
            const translatedMealName = translationsMap.get(mealNameKey) || meal.recipe_name;

            const translatedIngredients = meal.ingredients.map(ing => {
              const ingKey = `ingredient:${ing.name}`;
              return {
                ...ing,
                name: translationsMap.get(ingKey) || ing.name,
              };
            });

            const translatedInstructions = (meal.cooking_instructions || []).map(inst => {
              const instKey = `instruction:${inst}`;
              return translationsMap.get(instKey) || inst;
            });

            return {
              ...meal,
              recipe_name: translatedMealName,
              ingredients: translatedIngredients,
              cooking_instructions: translatedInstructions,
            };
          }),
        }));

        const translated: TranslatedMealPlan = {
          ...mealPlan,
          days: translatedDays,
          _translationLanguage: targetLanguage,
        };

        setTranslatedPlan(translated);
        options?.onTranslationComplete?.();
      } catch (error) {
        console.error('Translation error:', error);
        setTranslatedPlan(mealPlan);
        options?.onTranslationError?.(error as Error);
      } finally {
        setIsTranslating(false);
      }
    };

    translate();
  }, [mealPlan?.plan_id, targetLanguage]);

  return {
    translatedPlan,
    isTranslating,
  };
}
