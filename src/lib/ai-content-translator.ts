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
      cs: 'Czech'
    };

    const prompt = spark.llmPrompt`You are a professional translator specializing in food and nutrition content.

Translate the following items to ${languageNames[targetLanguage]}.

${uniqueItems.map((item, i) => `${i + 1}. ${item}`).join('\n')}

Return your response as a valid JSON object with this structure:
{
  "original text 1": "translated text 1",
  "original text 2": "translated text 2"
}`;

    const response = await spark.llm(prompt, 'gpt-4o', true);
    const translations = JSON.parse(response);

    uniqueItems.forEach(item => {
      resultMap.set(item, translations[item] || item);
    });

    return resultMap;
  } catch (error) {
    console.error('Translation error:', error);
    uniqueItems.forEach(item => resultMap.set(item, item));
    return resultMap;
  }
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
  const [mealNamesMap, ingredientsMap, cookingInstructionsMap] = await Promise.all([
    translateContentBatch(mealNames, targetLanguage),
    translateContentBatch(ingredients, targetLanguage),
    translateContentBatch(cookingInstructions, targetLanguage)
  ]);

  return {
    mealNames: mealNamesMap,
    ingredients: ingredientsMap,
    cookingInstructions: cookingInstructionsMap
  };
}
