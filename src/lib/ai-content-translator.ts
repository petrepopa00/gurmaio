import type { Language } from './i18n/translations';

export async function translateContent(

  if (targetLanguage === 'en' || !conte
  }
  const cached = translati
    return cached[ta

    const languageN
   

      pt: 'Portuguese',
      pl: 'Polish',
      cs: 'Czech'


      t
    const languageNames: Record<Language, string> = {
    cacheEntry[targe
      de: 'German',
  } catch (error) {
      es: 'Spanish',
  }
      pt: 'Portuguese',
export async funct
      pl: 'Polish',
      ro: 'Romanian',
      cs: 'Czech'
  

    const prompt = window.spark.llmPrompt`Translate the following text to ${languageNames[targetLanguage]}. Return ONLY the translated text, no explanations:

${content}`;

    }

    return resultMap;

    }
      de: 'German',
      es: 'Spanish',
    
      pl: 'Polish',
      cs: 'Czech'

      ingredient: `
   



${uncachedItems.ma
Return format: ["translatio
    const response = await window.spark.llm(promptText, 'gpt-4o-m
    const translatedArray = Array
    uncachedItems.forEach((item, index) => {
  
      if (!translationCache.has(item)) {
      }
      cacheEntry[targ


    uncachedItems.forEach(item => res


  mealNames: string[],
  cookingInstructions: string[],
): Promise<{
  ingredient
}> {
    r
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

    const contextInstructions: Record<typeof contentType, string> = {
      ingredient: `These are food ingredient names. Translate each to ${languageNames[targetLanguage]}, keeping culinary context.`,
      meal_name: `These are meal/recipe names. Translate each to ${languageNames[targetLanguage]}, keeping the culinary style.`,
      cooking_instruction: `These are cooking instructions. Translate each to ${languageNames[targetLanguage]}, keeping imperative verb form.`
    };

    const prompt = window.spark.llmPrompt`${contextInstructions[contentType]}

Return a JSON array with exactly ${uncachedItems.length} translated strings in the same order.

Items to translate:
${uncachedItems.map((item, i) => `${i + 1}. ${item}`).join('\n')}

Return format: ["translation1", "translation2", ...]`;

    const response = await window.spark.llm(prompt, 'gpt-4o-mini', true);
    const parsed = JSON.parse(response);

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


















