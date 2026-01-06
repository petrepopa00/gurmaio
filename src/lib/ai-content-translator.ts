import type { Language } from './i18n/translations';

const translationCache = new Map<string, Record<Language, string>>();

  targetLanguage: Language,
): Promise<string>
    return content;

): Promise<string> {
  if (targetLanguage === 'en' || !content || content.trim() === '') {
    return content;
   

Translation:`;
    const translation = await spark.llm(p

   

  } cat
    return content;

export async function batchTranslateContent(

): Promise<Map

    items.forEach(item => resultMap.set(item, item));
  }

    const existing = translationCache.get(content) || {} as Record<Language, string>;
    existing[targetLanguage] = translatedContent;
    translationCache.set(content, existing);

    return translatedContent;
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
      );
      uncachedItems.push(item);
     
  });

  if (uncachedItems.length === 0) {
    return resultMap;
  }

  try {
    const contentTypeLabel = contentType === 'ingredient' ? 'Ingredient' : contentType === 'meal_name' ? 'Meal name' : 'Cooking instruction';
    const itemsList = uncachedItems.map((item, idx) => `${idx + 1}. ${item}`).join('\n');

    const prompt = spark.llmPrompt`Translate the following ${contentTypeLabel}s to ${targetLanguage}. Return each translation on a new line in the same order, prefixed with the number. Return ONLY the translations, nothing else.

${itemsList}

Translations:`;

    const translationsText = await spark.llm(prompt, 'gpt-4o-mini');
    const translationLines = translationsText.trim().split('\n').filter(line => line.trim());

    batchTranslateContent(cookingInstructi
      const matchingLine = translationLines.find(line => 
        line.trim().startsWith(`${idx + 1}.`)
      );
    cookingInstructions: 
        const translatedItem = matchingLine.replace(/^\d+\.\s*/, '').trim();
        resultMap.set(item, translatedItem);

        const existing = translationCache.get(item) || {} as Record<Language, string>;
        existing[targetLanguage] = translatedItem;

      } else {
        resultMap.set(item, item);
      }

  } catch (error) {

    uncachedItems.forEach(item => resultMap.set(item, item));



























