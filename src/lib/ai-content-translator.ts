import type { Language } from './i18n/translations';

export async function translateContent(

export async function translateContent(
  content: string,
  contentType: 'ingredient' | 'cooking_instruction' | 'meal_name',
  targetLanguage: Language

  if (targetLanguage === 'en') {
    return content;
   

    
    
    
   

  } cat
    return content;
}
export async function batchTranslateContent(

): Promise<Map<string, string>>

    items.forE
  }
  const uncachedItems: string[] = [];
    
      resultMap.set(item, cached[targetLanguage]);
      uncachedItems.push(item);
  });
  if
  }
  try {
    

${u
R

    const translationResult = await spark.ll

      const translated = translations[item];
        const existing = t
        translationCache.set(item
      } else {
  

  } catch (error) {
    uncachedItems.for
  }

  mealNames: string[],
  cookingInstructions: st
): Promise<{
  ingredients: Map<string, string>;
}> {
    const me
    const cookingInstructionsMa
    }
  });

  if (uncachedItems.length === 0) {
    return resultMap;
  }

  try {
    const contentTypeLabel = contentType === 'ingredient' ? 'Ingredient' : contentType === 'meal_name' ? 'Meal name' : 'Cooking instruction';
    
    const prompt = spark.llmPrompt`Translate the following ${contentTypeLabel}s to ${targetLanguage}. Return a valid JSON object where each key is the original text and the value is the translation.

${contentTypeLabel}s to translate:
${uncachedItems.map((item, idx) => `${idx + 1}. ${item}`).join('\n')}

Return format: {"original text": "translated text", ...}`;
    
    const translationResult = await spark.llm(prompt, 'gpt-4o-mini', true);
    const translations = JSON.parse(translationResult);

    uncachedItems.forEach(item => {


















