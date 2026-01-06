import type { Language } from './i18n/translations';

export async function translateContent(

export async function translateContent(
  content: string,
  contentType: 'ingredient' | 'cooking_instruction' | 'meal_name',
  targetLanguage: Language
  }
  try {
    
  }

    
    
    existing[targetLanguage] = tra
   

  try {
    const contentTypeLabel = contentType === 'ingredient' ? 'Ingredient' : contentType === 'meal_name' ? 'Meal name' : 'Cooking instruction';
    
    const prompt = spark.llmPrompt`Translate the following ${contentTypeLabel} to ${targetLanguage}. Return ONLY the translation, nothing else.

${contentTypeLabel}: ${content}

Translation:`;
    
    const translatedContent = await spark.llm(prompt, 'gpt-4o-mini');
    
    const existing = translationCache.get(content) || {} as Record<Language, string>;
    existing[targetLanguage] = translatedContent.trim();
    translationCache.set(content, existing);
    
    return translatedContent.trim();
  } catch (error) {
    console.error('Translation error:', error);
    return content;
  }
 

export async function batchTranslateContent(
  items: string[],
    return resultMap;
  targetLanguage: Language
): Promise<Map<string, string>> {
  const resultMap = new Map<string, string>();
  
  if (targetLanguage === 'en') {
    items.forEach(item => resultMap.set(item, item));
    return resultMap;
   

  const uncachedItems: string[] = [];
  items.forEach(item => {
      resultMap.set(item, translated);
    if (cached && cached[targetLanguage]) {
      resultMap.set(item, cached[targetLanguage]);
    } else {
  } catch (error) {
    }
  }

}
    return resultMap;
  i

  targe
    const contentTypeLabel = contentType === 'ingredient' ? 'Ingredient' : contentType === 'meal_name' ? 'Meal name' : 'Cooking instruction';
  me
    const prompt = spark.llmPrompt`Translate the following ${contentTypeLabel}s to ${targetLanguage}. Return a valid JSON object where each key is the original text and the value is the translation.

${contentTypeLabel}s to translate:
${uncachedItems.map((item, idx) => `${idx + 1}. ${item}`).join('\n')}

Return format: {"original text": "translated text", ...}`;
    
    const translationResult = await spark.llm(prompt, 'gpt-4o-mini', true);
    const translations = JSON.parse(translationResult);

    uncachedItems.forEach(item => {





































