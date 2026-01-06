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
Keep food names, ingredients, and cooking terms accurate and culturally appropriate.
Maintain any measurements or numbers exactly as they appear.

Return ONLY a valid JSON object with the original text as keys and translations as values.

Items to translate:
${uniqueItems.map((item, i) => `${i + 1}. ${item}`).join('\n')}

Example format:
{
  "original text 1": "translated text 1",
  "original text 2": "translated text 2"
}`;

    const response = await spark.llm(prompt, 'gpt-4o-mini', true);
    const translations = JSON.parse(response);

    uniqueItems.forEach(item => {
      const translated = translations[item];
      if (translated && typeof translated === 'string') {
        resultMap.set(item, translated);
      } else {
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
