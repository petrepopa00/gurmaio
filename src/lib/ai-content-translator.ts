/// <reference path="../vite-end.d.ts" />

export async function translateBatchContent(
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
      de: 'German',
      es: 'Spanish'
      pt: 'Portugue
      pl: 'Polish',
      cs: 'Czech'

    const targetLa
    const prompt = 
Items to translate:
${itemsList}
Return

}`;



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













