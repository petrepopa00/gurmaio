# Dynamic AI Content Translation Feature

## Overview

Gurmaio now supports **dynamic translation of AI-generated content**, allowing users to view meal plans, recipes, ingredients, and cooking instructions in their preferred language. This feature uses GPT-4o and GPT-4o-mini to translate content on-the-fly when users switch languages.

## Features

### 1. **Automatic Translation**
- When a user switches languages, the entire meal plan is automatically translated
- Translations include:
  - Meal/recipe names
  - Ingredient names
  - Cooking instructions

### 2. **Smart Caching**
- Translations are cached in memory to avoid redundant API calls
- Once translated, content loads instantly on subsequent views

### 3. **Batch Translation**
- Multiple items are translated together for efficiency
- Reduces API calls and improves performance

### 4. **Visual Feedback**
- Translation progress indicator shows when content is being translated
- Success toast notification when translation completes
- Error handling with fallback to original content

## Supported Languages

The translation system works with all supported languages:
- 🇬🇧 English (en) - Original language
- 🇩🇪 German (de)
- 🇫🇷 French (fr)
- 🇪🇸 Spanish (es)
- 🇮🇹 Italian (it)
- 🇵🇹 Portuguese (pt)
- 🇳🇱 Dutch (nl)
- 🇵🇱 Polish (pl)
- 🇷🇴 Romanian (ro)
- 🇨🇿 Czech (cs)

## Technical Implementation

### Architecture

```
User Changes Language
        ↓
useTranslatedMealPlan Hook Triggered
        ↓
Batch Translation Process
        ↓
├─ Meal Names → GPT-4o Translation
├─ Ingredients → GPT-4o Translation
└─ Instructions → GPT-4o Translation
        ↓
Cache Results
        ↓
Display Translated Plan
```

### Key Components

#### 1. **AI Content Translator** (`src/lib/ai-content-translator.ts`)
Core translation service that handles:
- Single item translation
- Batch translation (up to 30 items per batch)
- Translation caching
- LLM prompt construction

```typescript
// Single translation
const translated = await translateAIContent(
  'Chicken & Quinoa Bowl',
  'de',
  'meal_name'
);
// Result: "Hähnchen & Quinoa Bowl"

// Batch translation
const meals = [
  { recipe_name: 'Greek Yogurt...', ingredients: [...], cooking_instructions: [...] }
];
const translations = await translateMealBatch(meals, 'fr');
```

#### 2. **Translation Hook** (`src/hooks/use-translated-meal-plan.ts`)
React hook that manages translation state:
- Monitors meal plan changes
- Triggers translations on language change
- Provides loading state
- Handles errors with callbacks

```typescript
const { translatedPlan, isTranslating } = useTranslatedMealPlan(
  mealPlan,
  language,
  {
    onTranslationComplete: () => toast.success('Translated!'),
    onTranslationError: (err) => toast.error('Translation failed')
  }
);
```

#### 3. **App Integration** (`src/App.tsx`)
Main app component uses the hook:
- Displays translation loading indicator
- Shows success/error notifications
- Renders translated content

### Translation Quality

The system uses context-aware prompts to ensure high-quality translations:

**For Meal Names:**
- Keeps translations appetizing and descriptive
- Maintains cultural appropriateness
- Preserves dish character

**For Ingredients:**
- Uses standard culinary terms
- Follows regional naming conventions
- Maintains clarity

**For Cooking Instructions:**
- Uses imperative form (command form)
- Maintains cooking terminology
- Preserves measurements and methods

### Example Translations

#### English to Romanian

**Meal Name:**
- EN: "Chicken & Quinoa Bowl with Roasted Vegetables"
- RO: "Bol cu Pui & Quinoa cu Legume Prăjite"

**Ingredient:**
- EN: "Greek Yogurt"
- RO: "Iaurt Grecesc"

**Cooking Instruction:**
- EN: "Heat olive oil in a large pan over medium heat"
- RO: "Încălziți uleiul de măsline într-o tigaie mare la foc mediu"

## User Experience

### Language Switch Flow

1. **User clicks language switcher** in the header
2. **Confirmation dialog** appears (if there's unsaved data)
3. **Translation starts** automatically
4. **Loading indicator** shows during translation
5. **Success notification** appears when complete
6. **Meal plan updates** with translated content

### Performance

- **Initial Translation**: 2-5 seconds (depends on meal plan size)
- **Cached Translation**: Instant
- **Batch Size**: 30 items per API call
- **Parallel Processing**: Multiple batches translated concurrently

### Error Handling

If translation fails:
1. Original English content is displayed
2. Error toast notification appears
3. User can retry by switching languages again
4. No data is lost

## API Usage

### Translation Endpoints

**Model Selection:**
- Primary: `gpt-4o` (batch translations, JSON mode)
- Fallback: `gpt-4o-mini` (single translations, text mode)

**Cost Optimization:**
- Translations are cached in memory
- Batch processing reduces API calls
- Only untranslated content is processed

### Rate Limiting

The system includes delays between batches:
```typescript
await new Promise(resolve => setTimeout(resolve, 100));
```

## Maintenance

### Adding New Languages

To add a new language:

1. Update the `Language` type in `src/lib/i18n/translations.ts`:
```typescript
export type Language = 'en' | 'de' | 'fr' | ... | 'new_lang';
```

2. Add translations for UI elements
3. Add language name mapping in translator
4. Test with sample meal plans

### Monitoring Translation Quality

Monitor translation quality by:
- Checking user feedback
- Reviewing cached translations
- Testing with different meal types
- Validating culinary terminology

### Cache Management

```typescript
// Clear cache if needed
clearTranslationCache();

// Check cache size
const size = getTranslationCacheSize();
```

## Limitations

1. **English-Only Generation**: Meal plans are always generated in English, then translated
2. **Memory Cache**: Translations are lost on page refresh
3. **Network Dependent**: Requires active internet connection
4. **API Costs**: Each translation uses OpenAI API credits

## Future Enhancements

### Potential Improvements

1. **Persistent Cache**: Store translations in IndexedDB or KV store
2. **Parallel Translation**: Translate while generating meal plan
3. **Partial Updates**: Translate only changed items
4. **Native Generation**: Generate meal plans directly in target language
5. **Offline Support**: Pre-translate common meals
6. **Quality Feedback**: Allow users to report translation issues

### Monitoring Metrics

Track these metrics for optimization:
- Translation success rate
- Average translation time
- Cache hit rate
- API cost per meal plan
- User language preferences

## Testing

### Manual Testing Checklist

- [ ] Switch between all supported languages
- [ ] Verify meal names are correctly translated
- [ ] Check ingredient translations
- [ ] Review cooking instruction translations
- [ ] Test with different meal plan sizes (3-day, 7-day, 10-day)
- [ ] Verify loading indicators appear
- [ ] Confirm success notifications show
- [ ] Test error handling (disconnect network)
- [ ] Validate cache functionality (switch back and forth)
- [ ] Check performance with large meal plans

### Example Test Cases

**Test Case 1: Basic Translation**
1. Generate a 3-day meal plan in English
2. Switch to German
3. Verify all content is translated
4. Check translation quality

**Test Case 2: Cache Validation**
1. Translate to French
2. Switch to Spanish
3. Switch back to French
4. Verify instant loading (cache hit)

**Test Case 3: Error Handling**
1. Disconnect network
2. Try to switch language
3. Verify error message appears
4. Confirm original content still displays

## Support

For issues or questions:
- Check browser console for translation errors
- Verify network connectivity
- Review API quota limits
- Clear cache and retry

---

**Last Updated**: 2026
**Feature Version**: 1.0.0
**Status**: ✅ Production Ready
