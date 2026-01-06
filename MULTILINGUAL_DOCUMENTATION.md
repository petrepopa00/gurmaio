# Documentație Tehnică - Sistem Multilingv

## Arhitectură

### Structura Fișierelor

```
src/
├── lib/
│   └── i18n/
│       ├── translations.ts           # Traduceri interfață UI (10 limbi)
│       ├── content-translations.ts   # Traduceri conținut (mese, ingrediente)
│       ├── language-detector.ts      # Detectare automată limbă browser
│       └── types.ts                  # Tipuri TypeScript
├── hooks/
│   └── use-language.ts               # React hook pentru limba curentă
└── components/
    └── language-switcher.tsx         # Componentă UI pentru schimbare limbă
```

### Limbi Suportate

```typescript
type Language = 'en' | 'de' | 'fr' | 'es' | 'it' | 'pt' | 'nl' | 'pl' | 'ro' | 'cs';

export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
  { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
];
```

## Utilizare

### În Componente React

```typescript
import { useLanguage } from '@/hooks/use-language';

function MyComponent() {
  const { language, setLanguage, t } = useLanguage();
  
  return (
    <div>
      <h1>{t.appName}</h1>
      <p>{t.tagline}</p>
      <button onClick={() => setLanguage('ro')}>
        Switch to Romanian
      </button>
    </div>
  );
}
```

### Traducere Conținut (Mese, Ingrediente)

```typescript
import { translateMeal, translateIngredient } from '@/lib/i18n/content-translations';
import { useLanguage } from '@/hooks/use-language';

function MealCard({ meal }) {
  const { language } = useLanguage();
  
  const translatedMealName = translateMeal(meal.recipe_name, language);
  const translatedIngredients = meal.ingredients.map(ing => 
    translateIngredient(ing.name, language)
  );
  
  return (
    <div>
      <h2>{translatedMealName}</h2>
      <ul>
        {translatedIngredients.map(ing => (
          <li key={ing}>{ing}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Componenta Language Switcher

```typescript
import { LanguageSwitcher } from '@/components/language-switcher';

function Header() {
  const { language } = useLanguage();
  
  const handleLanguageChange = (newLang) => {
    // Logica este gestionată intern de componentă
    // Pagina se va reîncărca automat
  };
  
  return (
    <header>
      <LanguageSwitcher 
        currentLanguage={language} 
        onLanguageChange={handleLanguageChange} 
      />
    </header>
  );
}
```

## Persistență

Limba selectată de utilizator este salvată automat folosind `useKV`:

```typescript
const [language, setLanguage] = useKV<Language>('user_language', detectedLanguage);
```

- **Key:** `user_language`
- **Default:** Limba detectată din browser
- **Persistență:** Între sesiuni, cross-device (dacă utilizatorul e autentificat)

## Detectare Automată Limbă

```typescript
// src/lib/i18n/language-detector.ts
export function detectBrowserLanguage(): Language {
  const browserLang = navigator.language.split('-')[0].toLowerCase();
  const supportedLanguages: Language[] = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'pl', 'ro', 'cs'];
  
  return supportedLanguages.includes(browserLang as Language) 
    ? (browserLang as Language) 
    : 'en';
}
```

La prima vizită, aplicația:
1. Detectează limba browser-ului
2. Verifică dacă limba este suportată
3. Setează limba detectată sau defaultează la Engleză
4. Salvează preferința

## Structura Obiect Traduceri

### UI Translations (translations.ts)

```typescript
{
  en: {
    appName: 'Gurmaio',
    tagline: 'Budget-aware meal planning...',
    generate: 'Generate Meal Plan',
    onboarding: {
      createProfile: 'Create Your Profile',
      budgetLabel: 'Budget (EUR)',
      // ...
    },
    dietary: {
      balanced: 'Balanced',
      highProtein: 'High Protein',
      // ...
    },
    allergens: { /* ... */ },
    cuisines: { /* ... */ },
    activityLevels: { /* ... */ },
    objectives: { /* ... */ }
  },
  ro: {
    appName: 'Gurmaio',
    tagline: 'Planificare mese cu buget...',
    generate: 'Generează plan de mese',
    // ...
  }
  // ... alte limbi
}
```

### Content Translations (content-translations.ts)

```typescript
export const mealTranslations: Record<string, Record<Language, string>> = {
  'Greek Yogurt with Berries & Granola': {
    en: 'Greek Yogurt with Berries & Granola',
    ro: 'Iaurt Grecesc cu Fructe de Pădure & Granola',
    // ... alte limbi
  },
  // ... alte mese
};

export const ingredientTranslations: Record<string, Record<Language, string>> = {
  'Chicken Breast': {
    en: 'Chicken Breast',
    ro: 'Piept de Pui',
    // ... alte limbi
  },
  // ... alte ingrediente
};
```

## Adăugare Traduceri Noi

### 1. Adaugă cheie în translations.ts

```typescript
// Pentru toate limbile
export const translations = {
  en: {
    // ... existente
    newKey: 'New Text',
  },
  ro: {
    // ... existente
    newKey: 'Text Nou',
  },
  // ... pentru toate limbile
};
```

### 2. Folosește în componentă

```typescript
const { t } = useLanguage();
<button>{t.newKey}</button>
```

### 3. Adaugă masă/ingredient nou

```typescript
// În content-translations.ts
export const mealTranslations = {
  // ... existente
  'New Recipe Name': {
    en: 'New Recipe Name',
    ro: 'Nume Rețetă Nouă',
    de: 'Neuer Rezeptname',
    // ... toate limbile
  }
};
```

## Best Practices

### ✅ DO

- Folosește `useLanguage()` hook în toate componentele
- Traduce TOATE textele vizibile utilizatorului
- Testează traducerile în toate limbile suportate
- Păstrează consistența termenilor între pagini
- Folosește traduceri pentru mesaje de eroare și success

### ❌ DON'T

- Nu hardcodă texte în componente
- Nu folosi Google Translate direct fără verificare
- Nu lăsa texte netraduse (fallback la engleză dacă nu există traducere)
- Nu adăuga limbi noi fără traduceri complete

## Testing

### Test Manual

```bash
# 1. Deschide aplicația
# 2. Click pe butonul cu glob 🌐
# 3. Selectează fiecare limbă din listă
# 4. Verifică că toate textele sunt traduse
# 5. Testează flow-uri complete în fiecare limbă
```

### Test Automat

```typescript
import { translations, LANGUAGES } from '@/lib/i18n/translations';

describe('Translations', () => {
  it('should have all keys for all languages', () => {
    const englishKeys = Object.keys(translations.en);
    
    LANGUAGES.forEach(({ code }) => {
      const languageKeys = Object.keys(translations[code]);
      expect(languageKeys).toEqual(englishKeys);
    });
  });
  
  it('should translate meals correctly', () => {
    const meal = 'Greek Yogurt with Berries & Granola';
    const translated = translateMeal(meal, 'ro');
    expect(translated).toBe('Iaurt Grecesc cu Fructe de Pădure & Granola');
  });
});
```

## Performance

- **Bundle Size Impact:** ~45KB pentru toate traducerile (gzipped: ~12KB)
- **Runtime Performance:** O(1) lookup pentru traduceri
- **Lazy Loading:** Momentan toate traducerile sunt încărcate, posibilitate viitoare de code-splitting per limbă
- **Caching:** Limba selectată este cached în browser storage

## Considerații Viitoare

### Posibile Îmbunătățiri

1. **Code Splitting per Limbă**
   ```typescript
   const translations = await import(`@/lib/i18n/translations/${language}.ts`);
   ```

2. **Traduceri Dinamice din API**
   - Permite update-uri de traduceri fără deploy
   - Suport pentru traduceri comunitare

3. **Formatare Date și Numere Locale**
   ```typescript
   const formatter = new Intl.NumberFormat(language, {
     style: 'currency',
     currency: 'EUR'
   });
   ```

4. **Pluralizare Inteligentă**
   ```typescript
   t.itemsCount({ count: 5 }) // "5 items" (en) sau "5 articole" (ro)
   ```

5. **RTL Support**
   - Suport pentru limbi Right-to-Left (Arabic, Hebrew)

## Suport și Întreținere

### Actualizare Traduceri

1. Identifică textele noi adăugate
2. Adaugă chei în `translations.ts` pentru toate limbile
3. Verifică traducerile cu native speakers
4. Testează în aplicație
5. Commit și deploy

### Raportare Probleme

Template issue pentru traduceri:

```markdown
**Limbă:** ro (Română)
**Locație:** src/components/meal-card.tsx, line 45
**Text Actual:** "Swap Meal"
**Text Așteptat:** "Schimbă Masa"
**Context:** Buton pentru înlocuire masă în plan
```

---

**Ultima actualizare:** 2026
**Versiune:** 1.0.0
**Menținător:** Echipa Gurmaio
