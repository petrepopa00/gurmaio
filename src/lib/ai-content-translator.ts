import type { Language } from './i18n/translations';

const translationCache = new Map<string, Record<Language, string>>();

export async function translateAIContent(
  content: string,
  contentType: 'meal_name' | 'ingredient' | 'cooking_instruction',
  targetLanguage: Language
): Promise<string> {
  if (targetLanguage === 'en') {
    return content;
  }

  const cacheKey = `${contentType}:${content}`;
  
  if (translationCache.has(cacheKey)) {
    const cached = translationCache.get(cacheKey)!;
    if (cached[targetLanguage]) {
      return cached[targetLanguage];
    }
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

    const contextMap = {
      meal_name: 'meal/recipe name',
      ingredient: 'ingredient name',
      cooking_instruction: 'cooking instruction',
    };

    const promptText = `Translate this ${contextMap[contentType]} from English to ${languageNames[targetLanguage]}: "${content}". Return only the translated text, nothing else.`;
    const prompt = window.spark.llmPrompt([promptText] as any);
    
    const translated = await window.spark.llm(prompt, 'gpt-4o-mini', false);
    
    if (!translationCache.has(cacheKey)) {
      translationCache.set(cacheKey, {} as Record<Language, string>);
    }
    
    const cached = translationCache.get(cacheKey)!;
    cached[targetLanguage] = translated.trim();
    
    return translated.trim();
  } catch (error) {
    console.error('Translation failed:', error);
    return content;
  }
}

export async function batchTranslateContent(
  items: Array<{ content: string; type: 'meal_name' | 'ingredient' | 'cooking_instruction' }>,
  targetLanguage: Language
): Promise<Map<string, string>> {
  const translationsMap = new Map<string, string>();
  
  if (targetLanguage === 'en') {
    items.forEach(item => {
      translationsMap.set(`${item.type}:${item.content}`, item.content);
    });
    return translationsMap;
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

    const mealNames = items.filter(item => item.type === 'meal_name');
    const ingredients = items.filter(item => item.type === 'ingredient');
    const instructions = items.filter(item => item.type === 'cooking_instruction');

    const uniqueMealNames = new Set<string>();
    mealNames.forEach(item => uniqueMealNames.add(item.content));

    const uniqueIngredients = new Set<string>();
    ingredients.forEach(item => uniqueIngredients.add(item.content));

    const uniqueInstructions = new Set<string>();
    instructions.forEach(item => uniqueInstructions.add(item.content));

    const mealNamesList = Array.from(uniqueMealNames);
    const ingredientsList = Array.from(uniqueIngredients);
    const instructionsList = Array.from(uniqueInstructions);

    if (mealNamesList.length > 0) {
      const mealNamesPrompt = `You are translating meal/recipe names from English to ${languageNames[targetLanguage]} for a meal planning application.

Translate each meal name below. Return the result as a valid JSON object with a single property called "translations" that contains an array of objects with "original" and "translated" properties.

Meal names to translate:
${mealNamesList.map((name, i) => `${i + 1}. ${name}`).join('\n')}

Requirements:
1. Use natural, appetizing names in ${languageNames[targetLanguage]}
2. Keep cultural context where appropriate
3. Make translations clear and appealing
4. Return ONLY valid JSON in this format:
{
  "translations": [
    {"original": "meal name 1", "translated": "translated name 1"},
    {"original": "meal name 2", "translated": "translated name 2"}
  ]
}`;

      const mealNamesResult = await window.spark.llm(mealNamesPrompt, 'gpt-4o-mini', true);
      const mealNamesData = JSON.parse(mealNamesResult);
      
      if (mealNamesData.translations && Array.isArray(mealNamesData.translations)) {
        mealNamesData.translations.forEach((item: any) => {
          translationsMap.set(`meal_name:${item.original}`, item.translated);
        });
      }
    }

    if (ingredientsList.length > 0) {
      const ingredientsPrompt = `You are translating ingredient names from English to ${languageNames[targetLanguage]} for a meal planning application.

Translate each ingredient name below. Return the result as a valid JSON object with a single property called "translations" that contains an array of objects with "original" and "translated" properties.

Ingredients to translate:
${ingredientsList.map((name, i) => `${i + 1}. ${name}`).join('\n')}

Requirements:
1. Use standard culinary terms for ${languageNames[targetLanguage]}
2. Keep translations simple and clear
3. Return ONLY valid JSON in this format:
{
  "translations": [
    {"original": "ingredient 1", "translated": "translated ingredient 1"},
    {"original": "ingredient 2", "translated": "translated ingredient 2"}
  ]
}`;

      const ingredientsResult = await window.spark.llm(ingredientsPrompt, 'gpt-4o-mini', true);
      const ingredientsData = JSON.parse(ingredientsResult);
      
      if (ingredientsData.translations && Array.isArray(ingredientsData.translations)) {
        ingredientsData.translations.forEach((item: any) => {
          translationsMap.set(`ingredient:${item.original}`, item.translated);
        });
      }
    }

    if (instructionsList.length > 0) {
      const instructionsPrompt = `You are translating cooking instructions from English to ${languageNames[targetLanguage]} for a meal planning application.

Translate each cooking instruction below. Return the result as a valid JSON object with a single property called "translations" that contains an array of objects with "original" and "translated" properties.

Instructions to translate:
${instructionsList.map((inst, i) => `${i + 1}. ${inst}`).join('\n')}

Requirements:
1. Use imperative form (command form) as is standard in recipes
2. Keep translations clear and actionable
3. Maintain important details like measurements and cooking methods
4. Return ONLY valid JSON in this format:
{
  "translations": [
    {"original": "instruction 1", "translated": "translated instruction 1"},
    {"original": "instruction 2", "translated": "translated instruction 2"}
  ]
}`;

      const instructionsResult = await window.spark.llm(instructionsPrompt, 'gpt-4o-mini', true);
      const instructionsData = JSON.parse(instructionsResult);
      
      if (instructionsData.translations && Array.isArray(instructionsData.translations)) {
        instructionsData.translations.forEach((item: any) => {
          translationsMap.set(`instruction:${item.original}`, item.translated);
        });
      }
    }

    return translationsMap;
  } catch (error) {
    console.error('Batch translation failed:', error);
    return translationsMap;
  }
}

export async function translateMealBatch(
  meals: Array<{
    recipe_name: string;
    ingredients: Array<{ name: string }>;
    cooking_instructions: string[];
  }>,
  targetLanguage: Language
): Promise<Map<string, string>> {
  const items: Array<{ content: string; type: 'meal_name' | 'ingredient' | 'cooking_instruction' }> = [];

  meals.forEach(meal => {
    items.push({ content: meal.recipe_name, type: 'meal_name' });
    
    meal.ingredients.forEach(ing => {
      items.push({ content: ing.name, type: 'ingredient' });
    });
    
    meal.cooking_instructions.forEach(inst => {
      items.push({ content: inst, type: 'cooking_instruction' });
    });
  });

  const translationsMap = await batchTranslateContent(items, targetLanguage);

  const resultMap = new Map<string, string>();
  
  meals.forEach(meal => {
    const mealKey = `meal:${meal.recipe_name}`;
    const translatedMealName = translationsMap.get(`meal_name:${meal.recipe_name}`);
    if (translatedMealName) {
      resultMap.set(mealKey, translatedMealName);
    }
    
    meal.ingredients.forEach(ing => {
      const ingKey = `ingredient:${ing.name}`;
      const translatedIng = translationsMap.get(`ingredient:${ing.name}`);
      if (translatedIng) {
        resultMap.set(ingKey, translatedIng);
      }
    });
    
    meal.cooking_instructions.forEach(inst => {
      const instKey = `instruction:${inst}`;
      const translatedInst = translationsMap.get(`instruction:${inst}`);
      if (translatedInst) {
        resultMap.set(instKey, translatedInst);
      }
    });
  });

  return resultMap;
}

export function clearTranslationCache() {
  translationCache.clear();
}
