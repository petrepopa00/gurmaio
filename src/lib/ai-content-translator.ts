import type { Language } from './i18n/translations';

const translationCache = new Map<string, Record<Language, string>>();

export async function translateContent(
  content: string,
  contentType: 'meal_name' | 'ingredient' | 'cooking_instruction',
  targetLanguage: Language
): Promise<string> {
  if (targetLanguage === 'en') {
    return content;
  }

  const cacheKey = `${contentType}:${content}`;
  const cached = translationCache.get(cacheKey);
  if (cached && cached[targetLanguage]) {
    return cached[targetLanguage];
  }

  try {
    const languageNames: Record<Language, string> = {
      en: 'English',
      de: 'German',
      es: 'Spanish',
      fr: 'French',
      it: 'Italian',
      pt: 'Portuguese',
      nl: 'Dutch',
      pl: 'Polish',
      ro: 'Romanian',
      cs: 'Czech',
    };

    let prompt = '';
    
    if (contentType === 'meal_name') {
      prompt = window.spark.llmPrompt`Translate this meal/recipe name from English to ${languageNames[targetLanguage]}: "${content}"

Requirements:
1. Use natural, appetizing language
2. Keep cultural context where appropriate
3. Make it sound delicious and appealing

Return ONLY the translated text, nothing else.`;
    } else if (contentType === 'ingredient') {
      prompt = window.spark.llmPrompt`Translate this ingredient name from English to ${languageNames[targetLanguage]}: "${content}"

Requirements:
1. Use the common culinary term
2. Keep it simple and clear

Return ONLY the translated text, nothing else.`;
    } else {
      prompt = window.spark.llmPrompt`Translate this cooking instruction from English to ${languageNames[targetLanguage]}: "${content}"

Requirements:
1. Use clear, imperative language
2. Keep cooking terminology accurate

Return ONLY the translated text, nothing else.`;
    }

    const translation = await window.spark.llm(prompt, 'gpt-4o-mini', false);
    
    if (!translation) {
      return content;
    }

    const cacheEntry = translationCache.get(cacheKey) || {} as Record<Language, string>;
    cacheEntry[targetLanguage] = translation.trim();
    translationCache.set(cacheKey, cacheEntry);
    
    return translation.trim();
  } catch (error) {
    console.error('Translation error:', error);
    return content;
  }
}

export async function translateBatch(
  items: Array<{ content: string; type: 'meal_name' | 'ingredient' | 'cooking_instruction' }>,
  targetLanguage: Language
): Promise<Map<string, string>> {
  const resultMap = new Map<string, string>();

  if (targetLanguage === 'en') {
    items.forEach(item => {
      resultMap.set(item.content, item.content);
    });
    return resultMap;
  }

  const translationsMap = new Map<string, string>();

  try {
    const languageNames: Record<Language, string> = {
      en: 'English',
      de: 'German',
      es: 'Spanish',
      fr: 'French',
      it: 'Italian',
      pt: 'Portuguese',
      nl: 'Dutch',
      pl: 'Polish',
      ro: 'Romanian',
      cs: 'Czech',
    };

    const mealNames = items.filter(i => i.type === 'meal_name');
    const ingredients = items.filter(i => i.type === 'ingredient');
    const instructions = items.filter(i => i.type === 'cooking_instruction');

    if (mealNames.length > 0) {
      const mealNamesList = mealNames.map(m => m.content);
      const mealNamesPrompt = window.spark.llmPrompt`Translate these meal/recipe names from English to ${languageNames[targetLanguage]}. Return the result as a valid JSON object with a single property called "translations" that contains an array of objects with "original" and "translated" properties.

Meal names to translate:
${mealNamesList.map((name, i) => `${i + 1}. ${name}`).join('\n')}

Requirements:
1. Use natural, appetizing language
2. Keep cultural context where appropriate
3. Make translations sound delicious and appealing

Return ONLY valid JSON in this format:
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
          translationsMap.set(item.original, item.translated);
        });
      }
    }

    if (ingredients.length > 0) {
      const ingredientsList = ingredients.map(i => i.content);
      const ingredientsPrompt = window.spark.llmPrompt`Translate each ingredient name below from English to ${languageNames[targetLanguage]}. Return the result as a valid JSON object with a single property called "translations" that contains an array of objects with "original" and "translated" properties.

Ingredients to translate:
${ingredientsList.map((name, i) => `${i + 1}. ${name}`).join('\n')}

Requirements:
1. Use the common culinary term
2. Keep it simple and clear

Return ONLY valid JSON in this format:
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
          translationsMap.set(item.original, item.translated);
        });
      }
    }

    if (instructions.length > 0) {
      const instructionsList = instructions.map(i => i.content);
      const instructionsPrompt = window.spark.llmPrompt`Translate these cooking instructions from English to ${languageNames[targetLanguage]}. Return the result as a valid JSON object with a single property called "translations" that contains an array of objects with "original" and "translated" properties.

Cooking instructions to translate:
${instructionsList.map((name, i) => `${i + 1}. ${name}`).join('\n')}

Requirements:
1. Use clear, imperative language
2. Keep cooking terminology accurate

Return ONLY valid JSON in this format:
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
          translationsMap.set(item.original, item.translated);
        });
      }
    }

    items.forEach(item => {
      const translated = translationsMap.get(item.content);
      resultMap.set(item.content, translated || item.content);
    });

    return resultMap;
  } catch (error) {
    console.error('Batch translation error:', error);
    const fallbackMap = new Map<string, string>();
    items.forEach(item => {
      fallbackMap.set(item.content, item.content);
    });
    return fallbackMap;
  }
}

export async function translateMealPlanContent(
  mealPlan: any,
  targetLanguage: Language
): Promise<any> {
  if (targetLanguage === 'en') {
    return mealPlan;
  }

  const itemsToTranslate: Array<{ content: string; type: 'meal_name' | 'ingredient' | 'cooking_instruction' }> = [];

  mealPlan.days.forEach((day: any) => {
    day.meals.forEach((meal: any) => {
      itemsToTranslate.push({ content: meal.recipe_name, type: 'meal_name' });
      
      meal.ingredients.forEach((ingredient: any) => {
        itemsToTranslate.push({ content: ingredient.name, type: 'ingredient' });
      });

      meal.cooking_instructions.forEach((instruction: string) => {
        itemsToTranslate.push({ content: instruction, type: 'cooking_instruction' });
      });
    });
  });

  const translationsMap = await translateBatch(itemsToTranslate, targetLanguage);

  const translatedPlan = JSON.parse(JSON.stringify(mealPlan));

  translatedPlan.days.forEach((day: any) => {
    day.meals.forEach((meal: any) => {
      meal.recipe_name = translationsMap.get(meal.recipe_name) || meal.recipe_name;
      
      meal.ingredients.forEach((ingredient: any) => {
        ingredient.name = translationsMap.get(ingredient.name) || ingredient.name;
      });

      meal.cooking_instructions = meal.cooking_instructions.map((instruction: string) => 
        translationsMap.get(instruction) || instruction
      );
    });
  });

  return translatedPlan;
}
