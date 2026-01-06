import type { Language } from '@/lib/i18n/translations';

const LANGUAGE_NAMES: Record<Language, string> = {
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

async function translateBatchContent(
  items: string[],
  targetLanguage: Language,
  contentType: string
): Promise<Map<string, string>> {
  const resultMap = new Map<string, string>();
  
  if (targetLanguage === 'en' || items.length === 0) {
    items.forEach(item => resultMap.set(item, item));
    return resultMap;
  }

  try {
    const uniqueItems = Array.from(new Set(items));
    const languageName = LANGUAGE_NAMES[targetLanguage] || targetLanguage;
    const itemsText = uniqueItems.join('\n');
    
    const prompt = (window.spark.llmPrompt as any)`You are a professional food and recipe translator. Translate the following ${contentType} from English to ${languageName}.

Rules:
- Translate naturally and idiomatically
- Maintain the original meaning and culinary context
- Keep measurements and numbers unchanged
- Do not include any explanations, only provide translations
- Return a JSON object where keys are the original English text and values are the translations

Items to translate:
${itemsText}

Return the result as a JSON object.`;

    const result = await window.spark.llm(prompt, 'gpt-4o-mini', true);
    
    try {
      const translation = JSON.parse(result);
      
      if (typeof translation === 'object' && translation !== null) {
        Object.entries(translation).forEach(([key, value]) => {
          if (typeof value === 'string') {
            resultMap.set(key, value);
          }
        });
      }
    } catch (parseError) {
      console.warn('Failed to parse translation result:', parseError);
      uniqueItems.forEach(item => resultMap.set(item, item));
    }
  } catch (error) {
    console.error('Translation error:', error);
    items.forEach(item => resultMap.set(item, item));
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
  const [ingredientsMap, mealNamesMap, instructionsMap] = await Promise.all([
    translateBatchContent(ingredients, targetLanguage, 'ingredient names'),
    translateBatchContent(mealNames, targetLanguage, 'recipe names'),
    translateBatchContent(cookingInstructions, targetLanguage, 'cooking instructions'),
  ]);

  return {
    ingredients: ingredientsMap,
    mealNames: mealNamesMap,
    cookingInstructions: instructionsMap,
  };
}
