import type { Language } from './i18n/translations';

const translationCache = new Map<string, Record<Language, string>>();

export async function translateContent(
  content: string,
  targetLanguage: Language
): Promise<string> {
  if (targetLanguage === 'en' || !content) {
    return content;
  }

  const cached = translationCache.get(content);
  if (cached && cached[targetLanguage]) {
    return cached[targetLanguage];
  }

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

    const promptText = `Translate the following text to ${languageNames[targetLanguage]}. Return ONLY the translated text, no explanations:

${content}`;

    const response = await window.spark.llm(promptText, 'gpt-4o-mini');
    
    if (!translationCache.has(content)) {
      translationCache.set(content, {} as Record<Language, string>);
    }
    const cacheEntry = translationCache.get(content)!;
    cacheEntry[targetLanguage] = response;
    
    return response;
  } catch (error) {
    console.error('Translation error:', error);
    return content;
  }
}

export async function batchTranslateContent(
  items: string[],
  targetLanguage: Language,
  contentType: 'meal_name' | 'ingredient' | 'cooking_instruction'
): Promise<Map<string, string>> {
  const resultMap = new Map<string, string>();
  
  if (targetLanguage === 'en' || items.length === 0) {
    items.forEach(item => resultMap.set(item, item));
    return resultMap;
  }

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

    const contextInstructions: Record<typeof contentType, string> = {
      ingredient: `These are food ingredient names. Translate each to ${languageNames[targetLanguage]}, keeping culinary context.`,
      meal_name: `These are meal/recipe names. Translate each to ${languageNames[targetLanguage]}, keeping the culinary style.`,
      cooking_instruction: `These are cooking instructions. Translate each to ${languageNames[targetLanguage]}, keeping imperative verb form.`
    };

    const promptText = `${contextInstructions[contentType]}

Return a JSON array with exactly ${uncachedItems.length} translated strings in the same order.

Items to translate:
${uncachedItems.map((item, i) => `${i + 1}. ${item}`).join('\n')}

Return format: ["translation1", "translation2", ...]`;

    const response = await window.spark.llm(promptText, 'gpt-4o-mini', true);
    const parsed = JSON.parse(response);
    const translatedArray = Array.isArray(parsed) ? parsed : [];

    uncachedItems.forEach((item, index) => {
      const translation = translatedArray[index] || item;
      resultMap.set(item, translation);
      
      if (!translationCache.has(item)) {
        translationCache.set(item, {} as Record<Language, string>);
      }
      const cacheEntry = translationCache.get(item)!;
      cacheEntry[targetLanguage] = translation;
    });

    return resultMap;
  } catch (error) {
    console.error('Batch translation error:', error);
    uncachedItems.forEach(item => resultMap.set(item, item));
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
  if (targetLanguage === 'en') {
    return {
      mealNames: new Map(mealNames.map(name => [name, name])),
      ingredients: new Map(ingredients.map(ing => [ing, ing])),
      cookingInstructions: new Map(cookingInstructions.map(inst => [inst, inst])),
    };
  }

  const [mealNamesMap, ingredientsMap, cookingInstructionsMap] = await Promise.all([
    batchTranslateContent(mealNames, targetLanguage, 'meal_name'),
    batchTranslateContent(ingredients, targetLanguage, 'ingredient'),
    batchTranslateContent(cookingInstructions, targetLanguage, 'cooking_instruction'),
  ]);

  return {
    mealNames: mealNamesMap,
    ingredients: ingredientsMap,
    cookingInstructions: cookingInstructionsMap,
  };
}
