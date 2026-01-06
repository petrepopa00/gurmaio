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
      cs: 'Czech',
    };

    const prompt = window.spark.llmPrompt`Translate the following text to ${languageNames[targetLanguage]}. Return ONLY the translation, nothing else:

${content}`;

    const response = await window.spark.llm(prompt, 'gpt-4o-mini', false);
    
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
      cs: 'Czech',
    };

    const contextInstructions: Record<typeof contentType, string> = {
      meal_name: `Translate meal/recipe names to ${languageNames[targetLanguage]}. Keep cultural context where appropriate.`,
      ingredient: `Translate ingredient names to ${languageNames[targetLanguage]}. Keep measurements and quantities as-is.`,
      cooking_instruction: `Translate cooking instructions to ${languageNames[targetLanguage]}. Keep technical cooking terms accurate.`,
    };

    const itemsList = uncachedItems.map((item, i) => `${i + 1}. ${item}`).join('\n');
    
    const prompt = window.spark.llmPrompt`${contextInstructions[contentType]}

Items to translate:
${itemsList}

Return the translations as a JSON object with a single property "translations" that contains an array of translated strings in the same order. Only return the JSON, nothing else.`;

    const response = await window.spark.llm(prompt, 'gpt-4o-mini', true);
    const parsed = JSON.parse(response);
    const translations: string[] = parsed.translations || [];

    uncachedItems.forEach((item, index) => {
      const translation = translations[index] || item;
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
