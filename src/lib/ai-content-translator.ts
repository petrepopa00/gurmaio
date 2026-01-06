import type { Language } from './i18n/translations';

const translationCache = new Map<string, Record<Language, string>>();

): Promise<string> {
    return content

  const cached = translatio
    return cached[ta

    const languageN
   

      pt: 'Portuguese',
      pl: 'Polish',
      cs: 'Czech',
    return cached[targetLanguage];
   

  try {
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
      cs: 'Czech',
    };

    return content;
}
export async function batchTranslateContent(
  contentType: 'meal_name' | 'ingredient' 
): Promise<Map<string, string>> {
  
    items.forEach(item => resultMap.set(item, item));
  }
  const uncachedItems: string[] = [];
    const ca
    if (cached && cached[targetLanguage]) {
    } else {
    }




      de: 'German',

      pt: 'Po
      pl: 'Poli



2. Keep cultural context where appropriate
    
2. Keep measurements and quantities as-is
    } else {
2. Keep technical cooking terms accurate
    
    const itemsList = uncached
    const prompt = 
Items to translate:
    return content;
  }
}

export async function batchTranslateContent(
  items: string[],
  contentType: 'meal_name' | 'ingredient' | 'cooking_instruction',
  targetLanguage: Language
): Promise<Map<string, string>> {
  const resultMap = new Map<string, string>();
  
  if (!items.length || targetLanguage === 'en') {
    items.forEach(item => resultMap.set(item, item));
    return resultMap;
  }

export async function translateMealPl
    recipe_name: string;
    cooking_instructions: string[];
  targetLanguage: Language
  const resultMap = new Map<string, string>
  if (targetLanguage === 'en') {
      result
      meal.cooking_instructions
    r



    if (!allMealNames
   

      }
    meal.cooking_instructions.forEach(inst => {
        allInstructi
    });

    batchTranslateCo
    batchTranslateCo

  ingredientsMap.f

}
























































export async function translateMealPlanContent(
  mealNames: string[],
  ingredients: string[],
  cookingInstructions: string[],
  targetLanguage: Language
): Promise<{
  mealNames: Map<string, string>;
  ingredients: Map<string, string>;
  cookingInstructions: Map<string, string>;
}> {
  if (targetLanguage === 'en') {
    return {
      mealNames: new Map(mealNames.map(name => [name, name])),
      ingredients: new Map(ingredients.map(ing => [ing, ing])),
      cookingInstructions: new Map(cookingInstructions.map(inst => [inst, inst])),
    };
  }

  const [mealNamesMap, ingredientsMap, instructionsMap] = await Promise.all([
    batchTranslateContent(mealNames, 'meal_name', targetLanguage),
    batchTranslateContent(ingredients, 'ingredient', targetLanguage),
    batchTranslateContent(cookingInstructions, 'cooking_instruction', targetLanguage),
  ]);

  return {
    mealNames: mealNamesMap,
    ingredients: ingredientsMap,
    cookingInstructions: instructionsMap,
  };
}
