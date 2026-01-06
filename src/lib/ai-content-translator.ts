import type { Language } from './i18n/translations';

const translationCache = new Map<string, Record<Language, string>>();

export async function translateAIContent(
  content: string,
  targetLanguage: Language,
  contentType: 'meal_name' | 'ingredient' | 'cooking_instruction' = 'meal_name'
): Promise<string> {
  if (targetLanguage === 'en') {
    return content;
  }

  const cacheKey = `${contentType}:${content}:${targetLanguage}`;
  
  if (translationCache.has(cacheKey)) {
    const cached = translationCache.get(cacheKey);
    if (cached && cached[targetLanguage]) {
      return cached[targetLanguage];
    }
  }

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

  const contextPrompts: Record<typeof contentType, string> = {
    meal_name: 'You are translating a recipe/meal name for a meal planning application.',
    ingredient: 'You are translating a food ingredient name for a meal planning application.',
    cooking_instruction: 'You are translating a cooking instruction step for a meal planning application.',
  };

  try {
    const prompt = (window.spark.llmPrompt as any)`${contextPrompts[contentType]}

Task: Translate the following ${contentType === 'meal_name' ? 'recipe/meal name' : contentType === 'ingredient' ? 'ingredient name' : 'cooking instruction'} from English to ${languageNames[targetLanguage]}.

Original text: "${content}"

Requirements:
1. Provide ONLY the translated text, no explanations or additional text
2. Keep the translation natural and culturally appropriate
3. For meal names: Keep them appetizing and descriptive
4. For ingredients: Use standard culinary terms for that language
5. For cooking instructions: Use imperative form (command form) as is standard in recipes
6. Maintain any important details like measurements or cooking methods
7. DO NOT add quotes or formatting - just the plain translated text

Translation:`;

    const translation = await window.spark.llm(prompt, 'gpt-4o-mini', false);
    const cleanedTranslation = translation.trim().replace(/^["']|["']$/g, '');

    if (!translationCache.has(content)) {
      translationCache.set(content, { en: content } as Record<Language, string>);
    }
    const cached = translationCache.get(content)!;
    cached[targetLanguage] = cleanedTranslation;

    return cleanedTranslation;
  } catch (error) {
    console.error('Translation error:', error);
    return content;
  }
}

export async function translateMealBatch(
  meals: Array<{ recipe_name: string; ingredients: Array<{ name: string }>; cooking_instructions: string[] }>,
  targetLanguage: Language
): Promise<Map<string, string>> {
  if (targetLanguage === 'en') {
    return new Map();
  }

  const translations = new Map<string, string>();
  const allTexts = new Set<string>();

  meals.forEach(meal => {
    allTexts.add(`meal:${meal.recipe_name}`);
    meal.ingredients.forEach(ing => allTexts.add(`ingredient:${ing.name}`));
    meal.cooking_instructions.forEach(inst => allTexts.add(`instruction:${inst}`));
  });

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

  try {
    const textsArray = Array.from(allTexts);
    const batchSize = 30;
    
    for (let i = 0; i < textsArray.length; i += batchSize) {
      const batch = textsArray.slice(i, i + batchSize);
      
      const itemsList = batch.map((text, idx) => {
        const [type, content] = text.split(':');
        return `${idx + 1}. [${type.toUpperCase()}] ${content}`;
      }).join('\n');

      const prompt = (window.spark.llmPrompt as any)`You are translating content for a meal planning application from English to ${languageNames[targetLanguage]}.

Translate the following items. Each item is prefixed with its type: [MEAL], [INGREDIENT], or [INSTRUCTION].

${itemsList}

Requirements:
1. Return ONLY a JSON object with translations
2. Use the item number as the key
3. For meal names: Keep them appetizing and descriptive
4. For ingredients: Use standard culinary terms
5. For cooking instructions: Use imperative form (command form)
6. Keep translations natural and culturally appropriate
7. Do not include the type prefix in translations

Format example:
{
  "1": "Translated text here",
  "2": "Another translation",
  ...
}

Return only valid JSON:`;

      const response = await window.spark.llm(prompt, 'gpt-4o', true);
      const parsed = JSON.parse(response);

      batch.forEach((text, idx) => {
        const translationKey = String(idx + 1);
        if (parsed[translationKey]) {
          translations.set(text, parsed[translationKey]);
          
          const [type, content] = text.split(':');
          const cacheKey = `${type}:${content}:${targetLanguage}`;
          if (!translationCache.has(cacheKey)) {
            translationCache.set(cacheKey, { en: content } as Record<Language, string>);
          }
          const cached = translationCache.get(cacheKey)!;
          cached[targetLanguage] = parsed[translationKey];
        }
      });

      await new Promise(resolve => setTimeout(resolve, 100));
    }
  } catch (error) {
    console.error('Batch translation error:', error);
  }

  return translations;
}

export function clearTranslationCache(): void {
  translationCache.clear();
}

export function getTranslationCacheSize(): number {
  return translationCache.size;
}
