import type { Language } from './i18n/translations';

const translationCache = new Map<string, Record<Language, string>>();

export async function translateContent(
  content: string,
  contentType: 'ingredient' | 'cooking_instruction' | 'meal_name',
  targetLanguage: Language
): Promise<string> {
  if (targetLanguage === 'en') {
    return content;
  }

  const cached = translationCache.get(content);
  if (cached && cached[targetLanguage]) {
    return cached[targetLanguage];
  }

  try {
    const contentTypeLabel = contentType === 'ingredient' ? 'Ingredient' : contentType === 'meal_name' ? 'Meal name' : 'Cooking instruction';
    
    const prompt = spark.llmPrompt`Translate the following ${contentTypeLabel} to ${targetLanguage}. Return ONLY the translation, nothing else.

${contentTypeLabel}: ${content}

Translation:`;
    
    const translation = await spark.llm(prompt, 'gpt-4o-mini');
    const translatedContent = translation.trim();

    const existing = translationCache.get(content) || {} as Record<Language, string>;
    existing[targetLanguage] = translatedContent;
    translationCache.set(content, existing);

    return translatedContent;
  } catch (error) {
    console.error('Translation error:', error);
    return content;
  }
}

export async function batchTranslateContent(
  items: string[],
  contentType: 'ingredient' | 'cooking_instruction' | 'meal_name',
  targetLanguage: Language
): Promise<Map<string, string>> {
  const resultMap = new Map<string, string>();
  
  if (targetLanguage === 'en') {
    items.forEach(item => resultMap.set(item, item));

  i

  const uncachedItems: string[] = [];
  items.forEach(item => {
    const cached = translationCache.get(item);
    if (cached && cached[targetLanguage]) {
      resultMap.set(item, cached[targetLanguage]);
    } else {
      uncachedItems.push(item);
    }
  });

  if (uncachedItems.length === 0) {
    return resultMap;
  }





    uncachedItems.forEach((item, idx) => {





      } else {
      }

    uncachedItems.forEach(item => resultMa

}
export a

  targetLanguage: Languag
  mealNames: Map<string, string>;
  cookingInstructions: Map<string, string>;

    batchTranslateContent(ingredients, 'ingredient', targetLanguage),
  ]);
  return {
    ingredient
  };









