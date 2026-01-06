import type { Language } from './i18n/translations';

export async function translateContent(

  if (targetLanguage === 'en' || !conte
  }
  const cached = translati
    return cached[ta
  if (targetLanguage === 'en' || !content || content.trim() === '') {
    return content;
   

  const cached = translationCache.get(content);
  if (cached && cached[targetLanguage]) {
    return cached[targetLanguage];
  }


    
    existing[targetL

  } catch (error) {
    return content;
}
export async function b
  contentType: 'in
): Promise<Map<stri
  
    items.forEach
  }

    const cached = translationCache.get(item);

      uncach

    const translated = await window.spark.llm(prompt);
  }
    const existing = translationCache.get(content) || {};
    existing[targetLanguage] = translated;
    translationCache.set(content, existing);

    return translated;
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
    } else {
      uncachedItems.push(item);
    }
  });

    batchTranslateContent(mealNames
    batchTranslateCon


    coo
}
































































    batchTranslateContent(mealNames, 'meal_name', targetLanguage),
    batchTranslateContent(ingredients, 'ingredient', targetLanguage),
    batchTranslateContent(cookingInstructions, 'cooking_instruction', targetLanguage)
  ]);

  return {
    mealNames: mealNamesMap,
    ingredients: ingredientsMap,
    cookingInstructions: cookingInstructionsMap
  };
}
