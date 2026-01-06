import type { Language } from './i18n/translations';

const translationCache = new Map<string, Record<string, string>>();

export async function translateContent(
  content: string,
  targetLanguage: Language
): Promise<string> {
  if (targetLanguage === 'en' || !content || content.trim() === '') {
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

    const targetLang = languageNames[targetLanguage];
    const prompt = (window.spark.llmPrompt as any)`Translate the following text to ${targetLang}. Return ONLY the translated text, no explanations:

${content}`;

    const translated = await window.spark.llm(prompt);
    
    const existing = translationCache.get(content) || {};
    existing[targetLanguage] = translated;
    translationCache.set(content, existing);

    return translated;
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

    const targetLang = languageNames[targetLanguage];
    
    let instructions = '';
    if (contentType === 'ingredient') {
      instructions = `These are food ingredient names. Translate each to ${targetLang}. Keep culinary context.`;
    } else if (contentType === 'cooking_instruction') {
      instructions = `These are cooking instructions. Translate each to ${targetLang}. Keep clarity and precision.`;
    } else {
      instructions = `These are meal/recipe names. Translate each to ${targetLang}. Keep culinary appeal.`;
    }

    const itemsList = uncachedItems.map((item, i) => `${i + 1}. ${item}`).join('\n');
    
    const prompt = (window.spark.llmPrompt as any)`${instructions}

${itemsList}

Return format: ["translation1", "translation2", ...]`;

    const response = await window.spark.llm(prompt, 'gpt-4o', true);
    const parsed = JSON.parse(response);
    const translations = Array.isArray(parsed) ? parsed : (parsed.translations || []);

    uncachedItems.forEach((item, index) => {
      const translation = translations[index] || item;
      resultMap.set(item, translation);
      
      const existing = translationCache.get(item) || {};
      existing[targetLanguage] = translation;
      translationCache.set(item, existing);
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
      cookingInstructions: new Map(cookingInstructions.map(inst => [inst, inst]))
    };
  }

  const [mealNamesMap, ingredientsMap, cookingInstructionsMap] = await Promise.all([
    batchTranslateContent(mealNames, 'meal_name', targetLanguage),
    batchTranslateContent(ingredients, 'ingredient', targetLanguage),
    batchTranslateContent(cookingInstructions, 'cooking_instruction', targetLanguage)
  ]);

  return {
    mealNames: mealNamesMap,
    ingredients: ingredientsMap,
    cookingInstructions: cookingInstructionsMap
  };
}
