# Gurmaio Copilot Instructions

## 🎯 Project Overview

**Gurmaio** is a production-grade, budget-aware meal planning platform with strict separation between:
- **Frontend**: React + Vite (demo/prototype UI using GitHub Spark components)
- **Backend**: Cloudflare Workers (stateless, JWT auth) — documented in [ARCHITECTURE.md](ARCHITECTURE.md)
- **Database**: Supabase PostgreSQL for user data, meal plans, and ingredient library
- **AI Integration**: OpenAI/Anthropic for meal structure generation only (no calculations)

This is a **mono-repo with a frontend prototype**, not the full backend implementation.

## 📋 Critical Architecture Patterns

### Data Flow
1. **User Profile** → Budget, dietary preferences, macro targets (`UserProfile` in `src/types/domain.ts`)
2. **Meal Generation** → Mock data layer (`src/lib/mock-data.ts`) simulates backend API calls
3. **Deterministic Calculations** → Nutrition/cost engines pre-calculated by backend (in actual deployment)
4. **Persistent Storage** → `SupabaseService` handles profile/plan/preference sync
5. **State Management** → `useKV` (GitHub Spark) for browser storage of current plan/profile

### Component Organization
- **UI Components**: `src/components/ui/*` (Radix + Tailwind primitives)
- **Domain Components**: `src/components/*-dialog.tsx`, `*-view.tsx`, `*-sheet.tsx` (feature-specific)
- **Contexts**: `src/contexts/AuthContext.tsx` (authentication state)
- **Hooks**: `src/hooks/use-*.ts` (data fetching, language, Supabase sync)
- **Services**: `src/lib/supabase-service.ts` (database operations), `src/lib/mock-data.ts` (dev/demo)

### Key Type System
All domain types in `src/types/domain.ts`:
- `UserProfile`: Budget, meal count, dietary preferences
- `MealPlan`: Days → Meals → Ingredients (nutrition/cost pre-calculated)
- `ShoppingList`: Aggregated by ingredient with quantities
- `MealPrepPlan`: Batch cooking tasks organized by prep day
- `MealPreference`: User likes/dislikes for meal substitution

## 🔌 Integration Points

### Supabase Connection
- **Configured via**: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` in `.env`
- **Service Layer**: `src/lib/supabase-service.ts` (all DB operations centralized)
- **Hooks**: `useUserProfile()`, `useCurrentMealPlan()` in `src/hooks/use-supabase-data.ts`
- **Example**: See `src/components/supabase-config-check.tsx` for connectivity status

### Backend API (Cloudflare Workers)
- Currently mocked in `src/lib/mock-data.ts` (generateMealPlan, generateShoppingList)
- Replace calls with actual API endpoints when backend is ready
- Pattern: App state → persist to localStorage via `useKV` → sync to Supabase on save

### Multi-Language Support
- Supported: EN, RO, DE, FR, ES, IT, PT, NL, PL, CS
- **Hook**: `useLanguage()` returns `{ language, setLanguage, t }`
- **Translations**: `src/lib/i18n/translations.ts` (flat key-value, dynamically loaded)
- **AI Content**: `useTranslatedMealPlan()` calls external translation API for meal content

## 🛠️ Critical Developer Workflows

### Build & Dev
```bash
npm run dev      # Vite dev server (hot reload, @/ alias maps to src/)
npm run build    # TypeScript + Vite (output: dist/)
npm run lint     # ESLint check
npm test -- --run  # Vitest unit tests (in __tests__/)
```

### Key Aliases
- `@/*` → `src/*` (configured in vite.config.ts, tsconfig.json)
- Always use `@/` for imports (components, hooks, lib, types)

### Testing
- **Framework**: Vitest + React Testing Library
- **Location**: `src/__tests__/*.test.ts(x)`
- **Pattern**: Tests for hooks (language), calculators (calories, macros), meal generation
- Example: `src/__tests__/language.test.ts` tests all supported languages + translations

### GitHub Spark Components
- App uses `@github/spark` design system (button, dialog, tabs, etc.)
- `useKV` hook for browser storage (no Redux/Zustand)
- Icon library: `@phosphor-icons/react` for consistent iconography
- **Important**: Spark plugin required in vite.config.ts (do NOT remove)

## 📐 Code Conventions

### Component Patterns
```typescript
// Dialog: controlled via parent state + onOpenChange callback
<MealPreferencesDialog 
  open={showMealPreferences} 
  onOpenChange={setShowMealPreferences}
  onSave={handleSavePreferences}
/>

// View: receives data + callbacks
<MealPlanView plan={displayPlan} onSchedule={handleSchedule} />

// Sheet: slide-out panel (shopping list, saved plans)
<ShoppingListSheet open={shoppingListOpen} onOpenChange={setShoppingListOpen} />
```

### State Management
- **Local UI State**: `useState` (dialogs, loading, tabs)
- **Persistent Data**: `useKV<T>` (profile, meal plan, preferences) → syncs to Supabase
- **Derived State**: Computed from persistent state (e.g., `todayDate`, `todayScheduled`)
- **Never**: Redux, Zustand, Jotai — GitHub Spark's `useKV` is sufficient

### Error Handling
- Supabase errors: catch and log, show toast via `toast.error()`
- Use `toast` (Sonner library) for all user feedback
- Example: `catch (error) { console.error(...); toast.error(...); }`

### Responsive Design
- Tailwind CSS only (no styled-components)
- Mobile-first approach (design for mobile, scale to desktop)
- Check `use-mobile.ts` hook for device detection when needed

## 🧪 Testing Requirements

### When Adding Features
1. **Unit tests** for pure functions (calculators, formatters)
2. **Hook tests** for custom React hooks (use `renderHook` from @testing-library/react)
3. **No E2E tests required** (frontend prototype only)

### Test File Location
- Place in `src/__tests__/` with `.test.ts(x)` suffix
- Co-locate with implementation for calculator/utility tests

### Run Tests
```bash
npm test -- --run       # Run all tests once
npm test                # Watch mode
```

## 🌐 Multi-Language Integration

### Adding a Translation
1. Add key-value pair to each language object in `src/lib/i18n/translations.ts`
2. Use in component: `const { t } = useLanguage(); return <div>{t('myKey')}</div>`
3. For meal content (recipes, descriptions): Use `useTranslatedMealPlan()` hook (external API)

### Example
```typescript
// translations.ts
export const translations = {
  en: { generateMeal: 'Generate Meal Plan', ... },
  ro: { generateMeal: 'Generează Plan de Mese', ... },
  de: { generateMeal: 'Mahlzeitenplan generieren', ... },
  // ...
};

// component.tsx
const { t } = useLanguage();
<button>{t('generateMeal')}</button>
```

## 📚 Key Documentation Files

| File | Purpose |
|------|---------|
| [ARCHITECTURE.md](ARCHITECTURE.md) | Full system design, API contracts, deterministic engines |
| [PRD.md](PRD.md) | Feature specs, UX requirements, design system |
| [supabase/SETUP.md](supabase/SETUP.md) | Database schema, migrations, credential setup |
| [src/types/domain.ts](src/types/domain.ts) | All TypeScript domain types |
| [src/lib/mock-data.ts](src/lib/mock-data.ts) | Simulates backend API responses |

## ⚡ Quick Commands Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Vite dev server (localhost:5173) |
| `npm test -- --run` | Run unit tests once |
| `npm run build` | Produce optimized dist/ bundle |
| `npm run lint` | Check TypeScript + ESLint |
| `npm run optimize` | Pre-bundle dependencies |

## 🚫 Common Pitfalls to Avoid

1. **Don't use Redux/Zustand**: Use `useKV` for state persistence
2. **Don't import from `src/lib/mock-data`** in production code paths (backend will replace)
3. **Don't hardcode budget/macro values**: Read from `UserProfile` context
4. **Don't bypass SupabaseService**: All DB operations go through this class
5. **Don't forget `@/` alias**: Makes refactoring and imports cleaner
6. **Don't skip language keys**: All user-visible text must be in translations

## 🔍 Example: Adding a Feature

1. **Define types** → Add to `src/types/domain.ts`
2. **Create component** → `src/components/my-feature-dialog.tsx` (use Radix + Tailwind)
3. **Add hook** (if data-heavy) → `src/hooks/use-my-feature.ts`
4. **Wire to App.tsx** → Add state via `useKV`, render component with callbacks
5. **Persist data** → Use `SupabaseService.saveSomething()` in save callback
6. **Translate strings** → Add keys to all language objects in `src/lib/i18n/translations.ts`
7. **Test** → Unit tests in `src/__tests__/` if logic is complex

---

**Last Updated**: January 13, 2026  
**Frontend Version**: React 18 + Vite + TypeScript  
**UI Framework**: GitHub Spark (Radix + Tailwind)
