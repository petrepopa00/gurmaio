import type { Language } from './i18n/translations';

  targetLanguage: Language
  const resultMap 
  targetLanguage: Language
): Promise<Map<string, string>> {
  const resultMap = new Map<string, string>();
  
  if (targetLanguage === 'en' || items.length === 0) {
    items.forEach(item => resultMap.set(item, item));
  try {
  }

  const uniqueItems = Array.from(new Set(items));

  try {
      pt: 'Portuguese',
    
      ro: 'Romanian',
      en: 'English',

      fr: 'French',
      es: 'Spanish',
      it: 'Italian',
      pt: 'Portuguese',
      nl: 'Dutch',
Example format:
      ro: 'Romanian',
      cs: 'Czech'
    };

    const prompt = spark.llmPrompt`You are a professional translator specializing in food and nutrition content.

  return resultMap;


  cookingInstructions: string[],
): Promise<{
 
}> {
   


    ingredients: translatedIngredients,
    
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
