import type { Language } from './i18n/translations';

export async function translateContentBatch(
  items: string[],
  const resultMap = new Ma
): Promise<Map<string, string>> {
  const resultMap = new Map<string, string>();

    return resultMap;

    return resultMap;
  }

      es: 'Spanish',
  
      pl: 'Polish',
      cs: 'Czech'


  try {
    const itemsJson = JSON.stringify(uniqueItems);
Impo
    const languageNames: Record<Language, string> = {
      en: 'English',
      de: 'German',
      fr: 'French',
      es: 'Spanish',
      it: 'Italian',
      pt: 'Portuguese',
      nl: 'Dutch',
      pl: 'Polish',
      ro: 'Romanian',
      });


      }

    uniqueItems.forEach(item => resultMap.set(item, item));

}
export async

  targetLanguage: Lan
  ingredients: Map<string, string>;
  cookingInstructions: Map<string, string
  const [translatedIngredients, translatedMealNames
    translateContentBatch(mealNames, targetLanguage),

  return {
 
  };













      });
    }

    uniqueItems.forEach(item => {
      if (!resultMap.has(item)) {
        resultMap.set(item, item);
      }
    });
  } catch (error) {
    console.error('Translation error:', error);
    uniqueItems.forEach(item => resultMap.set(item, item));
  }

  return resultMap;
}

export async function translateMealPlanContent(
  ingredients: string[],
  mealNames: string[],
  cookingInstructions: string[],
  targetLanguage: Language
): Promise<{
  ingredients: Map<string, string>;
  mealNames: Map<string, string>;
  cookingInstructions: Map<string, string>;
}> {
  const [translatedIngredients, translatedMealNames, translatedInstructions] = await Promise.all([
    translateContentBatch(ingredients, targetLanguage),
    translateContentBatch(mealNames, targetLanguage),
    translateContentBatch(cookingInstructions, targetLanguage),
  ]);

  return {
    ingredients: translatedIngredients,
    mealNames: translatedMealNames,
    cookingInstructions: translatedInstructions,
  };
}
