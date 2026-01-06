import type { Language } from './i18n/translations';

const translationCache = new Map<string, Record<Language, string>>();

export async function translateContent(
  content: string,
  contentType: 'meal_name' | 'ingredient' | 'cooking_instruction',
  targetLanguage: Language
): Promise<string> {
  if (targetLanguage === 'en') {
    return content;
  }

  const cacheKey = `${contentType}:${content}`;
  const cached = translationCache.get(cacheKey);
  if (cached && cached[targetLanguage]) {
  }
  t

      e
      it: 'Italian',
      nl: 'Dutch',
      ro: 'Romanian
    };
    let instruction
      instructions =
3. Make translations so
      instructions
3. Use the most fam
      instructions = 
3. Make instructio


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
    const languageN
   
 

      pl: 'Polish',
      cs: 'Czech',

    const ingredients = items.fil



${mealNamesList.map((name, 
Requirements:
2. Keep

{

  ]
      
      const mealName
      if (mealNames
          resultMap.
      }

      const ingredients

${ingredientsList.m
Requirements:
2. Keep measuremen


    {"original": "ingredient 1", "translated": "translated ingre
  ]
      

      if (ingredientsData.trans
          resultMap.set(item.original, item.translated);
      }

      const instructions


Requirements:
2. Keep technical cooking terms acc

{

  ]
 
      const instruc
      if (instructionsData.translations && Array.isArray(instructio
          resultMap.set(item.original, item.translated);
   

  } ca
    items.forEach(item => {
    });
  }

  meals: Array<{
    ingredients: Ingredient[];
  }>,
): Prom


    meal.ingredients.forEach(ing 
    });
    meal.cooking_instructions.forEach(inst => {


}































































