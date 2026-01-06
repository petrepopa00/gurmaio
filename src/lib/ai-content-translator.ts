import type { Language } from './i18n/translations';

async function batchTranslateContent(
  items: string[],
  contentType: 'ingredient' | 'meal_name' | 'cooking_instruction',
  targetLanguage: Language
): Promise<Map<string, string>> {
  const resultMap = new Map<string, string>();

  if (targetLanguage === 'en') {
    items.forEach(item => resultMap.set(item, item));
    return resultMap;
   

    }
  
  items.forEach(item => {
    if (!item || item.trim() === '') {

${itemsJson}
Return ONLY a valid JSON object
    c


        resultMap.set(item, transla
        resultMap.set
   

      r
  }
  return resultMap;


  cookingInstructions: string[],

  mealNames: Map<st
}> {

    batchTranslateContent(cookingInstructions, 'cooking_instruction', targe

    ingredients: ingredientsMap,
    cookingInstructions: cookingInstructionsMap






























    batchTranslateContent(ingredients, 'ingredient', targetLanguage),
    batchTranslateContent(mealNames, 'meal_name', targetLanguage),
    batchTranslateContent(cookingInstructions, 'cooking_instruction', targetLanguage)
  ]);

  return {
    ingredients: ingredientsMap,
    mealNames: mealNamesMap,
    cookingInstructions: cookingInstructionsMap
  };
}
