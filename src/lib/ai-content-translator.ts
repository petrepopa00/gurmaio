import type { Language } from './i18n/translations';

export async function translateContentBatch(
  items: string[],
  targetLanguage: Language
): Promise<Map<string, string>> {
  const resultMap = new Map<string, string>();
  
  if (targetLanguage === 'en' || items.length === 0) {
    items.forEach(item => resultMap.set(item, item));
    return resultMap;
  }

  const uniqueItems = Array.from(new Set(items));

  try {
    const itemsJson = JSON.stringify(uniqueItems);
    
    const languageNames: Record<string, string> = {
      en: 'English',
      de: 'German',
      fr: 'French',
      es: 'Spanish',
      it: 'Italian',
      pt: 'Portuguese',
      nl: 'Dutch',
      pl: 'Polish',
      ro: 'Romanian',
      cs: 'Czech'
    };

    const targetLangName = languageNames[targetLanguage] || targetLanguage;
    
    const prompt = (spark.llmPrompt as any)`You are a professional translator specializing in food and nutrition content.

Translate the following items to ${targetLangName}:
${itemsJson}

Return a JSON object with a "translations" property containing an array of translated strings in the same order.
Example format:
{
  "translations": ["translated item 1", "translated item 2"]
}`;

    const response = await spark.llm(prompt, 'gpt-4o-mini', true);
    const parsed = JSON.parse(response);
    
    if (parsed.translations && Array.isArray(parsed.translations)) {
      if (parsed.translations.length === uniqueItems.length) {
        uniqueItems.forEach((item, index) => {
          const translation = parsed.translations[index];
          resultMap.set(item, translation || item);
        });
      } else {
        uniqueItems.forEach(item => resultMap.set(item, item));
      }

      if (!resultMap.size) {
        uniqueItems.forEach(item => resultMap.set(item, item));
      }
    }
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
