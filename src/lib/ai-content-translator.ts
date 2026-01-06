import type { Language } from './i18n/translations';

const translationCache = new Map<string, Record<Language, string>>();

  targetLanguage: Language
  content: string,
  targetLanguage: Language
): Promise<string> {
  if (targetLanguage === 'en' || !content) {
    return content;
  }

  const cached = translationCache.get(content);
  if (cached && cached[targetLanguage]) {
    return cached[targetLanguage];
  }


    
      translationCac
    const cacheEntr
    
  } catch (error) {
    return content;
}
export async funct
  targetLanguage: L
): Promise<Map<string
  
    it

  const uncachedItems: string[] = [];

      result

  });
  if
  }
  try {
     
      fr: 'French',
      it: 'Italian',
    
      ro: 'Romanian'
    };
    const contextInstructions: Record<typeof co
      ingredient: `
   
 

Items to translate:


    const parsed = JSON.parse(response);

      const translation = translations[index] 
  
        translationCache.set(item, {} as Record<Langua
      const cacheEntry = translationCache.get(item)!;
    });
   

    return resultMap;
}
export async function translateMealPlanContent
  ingredients: string[],
  targetLanguage: Language
  mealNames:
  cookingInstructions: Map<stri
  if 
     

  }
  const [mealNamesMap
   

  retur
    ingredients: ingredientsMap,
  };





























































      mealNames: new Map(mealNames.map(name => [name, name])),
      ingredients: new Map(ingredients.map(ing => [ing, ing])),
      cookingInstructions: new Map(cookingInstructions.map(inst => [inst, inst])),
    };
  }

  const [mealNamesMap, ingredientsMap, cookingInstructionsMap] = await Promise.all([
    batchTranslateContent(mealNames, targetLanguage, 'meal_name'),
    batchTranslateContent(ingredients, targetLanguage, 'ingredient'),
    batchTranslateContent(cookingInstructions, targetLanguage, 'cooking_instruction'),
  ]);

  return {
    mealNames: mealNamesMap,
    ingredients: ingredientsMap,
    cookingInstructions: cookingInstructionsMap,
  };
}
