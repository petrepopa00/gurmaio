import type { Language } from './i18n/translations';

export async function translateContent(

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
    const translated = 
      nl: 'Dutch',
    existing[target
      ro: 'Romanian',
    return transl
    };

    const prompt = window.spark.llmPrompt`Translate the following text to ${languageNames[targetLanguage]}. Return ONLY the translated text, no explanations:

${content}`;

    const translated = await window.spark.llm(prompt);
  co
    const existing = translationCache.get(content) || {};
    existing[targetLanguage] = translated;
    translationCache.set(content, existing);

    return translated;
    const cached = 
    console.error('Translation error:', error);
    } else {
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
   

  const uncachedItems: string[] = [];
  items.forEach(item => {
      instructions = `These are food ingredien
    if (cached && cached[targetLanguage]) {
      resultMap.set(item, cached[targetLanguage]);
    } else {
      uncachedItems.push(item);
    }
  });


    return resultMap;
   


    const languageNames: Record<Language, string> = {
      resultMap.set(
      de: 'German',
      existing[targ
      es: 'Spanish',
      it: 'Italian',
      pt: 'Portuguese',
    console.error(
      pl: 'Polish',
      ro: 'Romanian',
      cs: 'Czech'
export

    const contentTypeInstructions: Record<string, string> = {
      ingredient: `These are food ingredient names. Translate each to ${languageNames[targetLanguage]}. Keep culinary context.`,
      cooking_instruction: `These are cooking instructions. Translate each to ${languageNames[targetLanguage]}. Keep clarity and precision.`,
      meal_name: `These are meal/recipe names. Translate each to ${languageNames[targetLanguage]}. Keep culinary appeal.`
    };

    const prompt = window.spark.llmPrompt`${contentTypeInstructions[contentType]}

${uncachedItems.map((item, i) => `${i + 1}. ${item}`).join('\n')}

Return format: ["translation1", "translation2", ...]`;

    const response = await window.spark.llm(prompt, 'gpt-4o', true);
    const parsed = JSON.parse(response);
    const translations = Array.isArray(parsed) ? parsed : (parsed.translations || []);

    uncachedItems.forEach((item, index) => {
      const translation = translations[index] || item;

      
      const existing = translationCache.get(item) || {};
      existing[targetLanguage] = translation;
      translationCache.set(item, existing);
    });

    return resultMap;

    console.error('Batch translation error:', error);
    uncachedItems.forEach(item => resultMap.set(item, item));
    return resultMap;
  }
}

export async function translateMealPlanContent(

  ingredients: string[],

  targetLanguage: Language

  mealNames: Map<string, string>;

  cookingInstructions: Map<string, string>;

  if (targetLanguage === 'en') {

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

