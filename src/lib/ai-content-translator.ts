import type { Language } from './i18n/translations';

const translationCache = new Map<string, Record<Language, string>>();

  contentType: 'meal_name' | 'ingredient'
  content: string,
  contentType: 'meal_name' | 'ingredient' | 'cooking_instruction',
  targetLanguage: Language

  if (targetLanguage === 'en') {
    return content;
  }

  const cacheKey = `${contentType}:${content}`;
  const cached = translationCache.get(cacheKey);
  if (cached && cached[targetLanguage]) {

   




1. Use natural, app
3. Be concise and cl
    const translate
    if (!translation
    }
    cacheEntry[tar
    return translat
    console.error('Tr
  }


): Promise<Map<string, s

    items.forEach(item => {
    });
  }

  try {

      es: 'Spanish',

      nl: 'Du
      ro: 'Romanian',
    };
    const mealNames = ite

    if (mealNames.length > 0) {

Meal names to translate:

1. Us
3. Make translations sound delicious and appealing
Return ONLY valid JSON in this format:

    {"original": "meal name 2
}`;
      const mealNamesResult = await window.spar
      
   
 

    if (ingredients.length > 0) {
      const ingredientsPrompt = window.spark.llmPrompt`Translate each ingredient name below fr
Ingredients to translate:
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
    ingredients: Array<{ name:
2. Keep it simple and clear
3. Return ONLY valid JSON in this format:
{

    {"original": "ingredient 1", "translated": "translated ingredient 1"},
    {"original": "ingredient 2", "translated": "translated ingredient 2"}
  ]
   
      
      const ingredientsResult = await window.spark.llm(ingredientsPrompt, 'gpt-4o-mini', true);
      const ingredientsData = JSON.parse(ingredientsResult);
      
      if (ingredientsData.translations && Array.isArray(ingredientsData.translations)) {
        ingredientsData.translations.forEach((item: any) => {
          translationsMap.set(item.original, item.translated);
        });
      }


    if (instructions.length > 0) {
      const instructionsList = instructions.map(i => i.content);
      const instructionsPrompt = window.spark.llmPrompt`Translate these cooking instructions from English to ${languageNames[targetLanguage]}. Return the result as a valid JSON object with a single property called "translations" that contains an array of objects with "original" and "translated" properties.


${instructionsList.map((name, i) => `${i + 1}. ${name}`).join('\n')}

Requirements:
1. Use clear, imperative language
2. Keep cooking terminology accurate
3. Return ONLY valid JSON in this format:
{

    {"original": "instruction 1", "translated": "translated instruction 1"},
    {"original": "instruction 2", "translated": "translated instruction 2"}
  ]


      const instructionsResult = await window.spark.llm(instructionsPrompt, 'gpt-4o-mini', true);
      const instructionsData = JSON.parse(instructionsResult);
      
      if (instructionsData.translations && Array.isArray(instructionsData.translations)) {
        instructionsData.translations.forEach((item: any) => {
          translationsMap.set(item.original, item.translated);

      }


    items.forEach(item => {
      const translated = translationsMap.get(item.content);

    });

    return resultMap;

    console.error('Batch translation error:', error);
    const fallbackMap = new Map<string, string>();
    items.forEach(item => {
      fallbackMap.set(item.content, item.content);
    });

  }


export async function translateMealPlanContent(



























