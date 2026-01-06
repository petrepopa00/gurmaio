import type { Language } from './i18n/translations';

const translationCache = new Map<string, Record<Language, string>>();

  contentType: 'meal_name' | 'ingredien
): Promise<string>
    return content;

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
      fr: 'French',
      es: 'Spanish',
      it: 'Italian',
      pt: 'Portuguese',
      nl: 'Dutch',
      pl: 'Polish',
      ro: 'Romanian',
      cs: 'Czech',
    };

    let instructions = '';
    if (contentType === 'meal_name') {
      instructions = `1. Use natural, appetizing language
2. Keep cultural context where appropriate
3. Make translations sound delicious and appealing`;
    } else if (contentType === 'ingredient') {
      instructions = `1. Use the common culinary term in ${languageNames[targetLanguage]}
2. Keep measurements and quantities as-is
3. Use the most familiar local name for the ingredient`;
    } else {
      instructions = `1. Use clear, imperative cooking instructions
2. Keep technical cooking terms accurate
3. Make instructions easy to follow`;
    }

    const prompt = window.spark.llmPrompt`Translate this ${contentType.replace('_', ' ')} from English to ${languageNames[targetLanguage]}.

Content to translate: "${content}"

Requirements:
${instructions}

Return ONLY the translated text, nothing else.`;

    const translation = await window.spark.llm(prompt, 'gpt-4o-mini');
    
    const cacheEntry = translationCache.get(cacheKey) || {} as Record<Language, string>;
    cacheEntry[targetLanguage] = translation.trim();
    translationCache.set(cacheKey, cacheEntry);
    
    return translation.trim();
  } catch (error) {
    console.error('Translation error:', error);
    return content;
  }
}

export async function batchTranslateContent(
  items: string[],
  contentType: 'meal_name' | 'ingredient' | 'cooking_instruction',
  targetLanguage: Language
): Promise<Map<string, string>> {
  const resultMap = new Map<string, string>();
  
  if (targetLanguage === 'en') {
    items.forEach(item => resultMap.set(item, item));
    return resultMap;
  }

    } else {
    }

    return resultMap;

    const languageNames: Record<Language, string> 
      de: 'G
      es: 'Spanish',
     
     


    if (contentType =
2. 

2. Keep
    } else {
2. Keep technical co
    }
    const itemsList
    const prompt = w
Items to translate:

${instructions}
Return ONLY a JSON 
  {"original": "item 
]`;
    co

      data.translations.fo
          const cacheKey = `${contentT
          cacheEntry[targetLanguage] = t.translated;
          resultMap.set(t.original, t.tran
      });
  } catch (error) {
    uncachedItems.forEach(item => {
    });

}
export async function translateMealPlanContent(
    recipe_name: string;
    cooking_instructions: string[];
  tar

  if (targetLanguage === 'en') {
  }
  const allIngredients: string[] = [];

  
  const meal

    batchTran
    batchTransl

  ingredientsMap.forEach((translated, original) => resultMa

}






























































