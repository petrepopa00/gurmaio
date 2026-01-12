# Supabase Integration Status

## Overview
This document tracks the complete integration of Supabase as the backend for the Gurmaio meal planning application.

## ✅ Completed Components

### 1. Supabase Client Setup
- **File**: `src/lib/supabase.ts`
- **Status**: ✅ Complete
- **Description**: Configured Supabase client with environment variables
- **Features**:
  - Uses `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
  - Auto-refresh token enabled
  - Session persistence enabled
  - Session detection in URL enabled

### 2. Database Schema
- **File**: `supabase-schema.sql`
- **Status**: ✅ Complete
- **Tables Created**:
  1. ✅ `profiles` - User meal planning preferences
  2. ✅ `meal_plans` - Generated and saved meal plans
  3. ✅ `meal_preferences` - User likes/dislikes for meals
  4. ✅ `portion_adjustments` - Custom portion sizes
  5. ✅ `scheduled_days` - Calendar scheduling
  6. ✅ `day_progress` - Completed meals tracking
  7. ✅ `badges` - Achievement badges
  8. ✅ `shopping_lists` - Shopping lists per plan
  9. ✅ `meal_prep_plans` - Meal prep schedules
  10. ✅ `user_settings` - User app settings (language, first success flag, etc.)

### 3. Row Level Security (RLS)
- **Status**: ✅ Complete
- **Features**:
  - RLS enabled on all tables
  - Policies created for SELECT, INSERT, UPDATE, DELETE
  - Users can only access their own data
  - Uses `auth.uid()` for user identification

### 4. Service Layer
- **File**: `src/lib/supabase-service.ts`
- **Status**: ✅ Complete
- **Methods Implemented**:
  - ✅ User Profile (get, save)
  - ✅ Meal Plans (get current, get saved, save, delete)
  - ✅ Meal Preferences (get, save, delete)
  - ✅ Portion Adjustments (get, save, delete)
  - ✅ Scheduled Days (get, save, delete)
  - ✅ Day Progress (get, save, delete)
  - ✅ Badges (get, save)
  - ✅ Shopping Lists (get, save)
  - ✅ Meal Prep Plans (get, save)
  - ✅ Delete All User Data

### 5. Authentication Context
- **File**: `src/contexts/AuthContext.tsx`
- **Status**: ✅ Complete
- **Features**:
  - React context for authentication state
  - `useAuth()` hook for accessing user/session
  - Sign up, sign in, sign out methods
  - Session persistence across refreshes
  - Auth state change listener

### 6. Custom Hooks
- **File**: `src/hooks/use-supabase-data.ts`
- **Status**: ✅ Complete
- **Hooks Created**:
  - ✅ `useUserProfile()` - Manages user profile
  - ✅ `useCurrentMealPlan()` - Current meal plan state
  - ✅ `useSavedMealPlans()` - Saved plans management
  - ✅ `useMealPreferences()` - Meal likes/dislikes
  - ✅ `usePortionAdjustments()` - Portion customizations
  - ✅ `useScheduledDays()` - Calendar scheduling
  - ✅ `useDayProgress()` - Progress tracking
  - ✅ `useBadges()` - Badges management
  - ✅ `useShoppingListState()` - Shopping list state
  - ✅ `useMealPrepPlanState()` - Meal prep plan state

- **File**: `src/hooks/use-user-settings.ts`
- **Status**: ✅ Complete
- **Features**:
  - Manages user settings (language, first success flag, etc.)
  - Automatic persistence to Supabase

### 7. App Integration
- **File**: `src/main.tsx`
- **Status**: ✅ Complete
- **Changes**:
  - Wrapped app with `<AuthProvider>`
  - Enables authentication throughout the app

## 🔄 Migration Strategy

The application currently uses `useKV` from `@github/spark/hooks` for all data persistence. To complete the Supabase integration, these hooks need to be replaced with the new Supabase hooks.

### Current Pattern (using Spark KV):
```typescript
const [userProfile, setUserProfile] = useKV<UserProfile | null>('user_profile', null);
```

### New Pattern (using Supabase):
```typescript
const [userProfile, saveProfile, deleteProfile, loading] = useUserProfile();
```

### Migration Mapping Table

| Current `useKV` Key | Replace With Hook | Notes |
|---|---|---|
| `user_profile` | `useUserProfile()` | Returns `[profile, saveProfile, deleteProfile, loading]` |
| `current_meal_plan` | `useCurrentMealPlan()` | Returns `[mealPlan, saveMealPlan, deleteMealPlan, loading]` |
| `saved_meal_plans` | `useSavedMealPlans()` | Returns `[plans, savePlan, deletePlan, loading, reloadPlans]` |
| `meal_preferences` | `useMealPreferences()` | Returns `[preferences, savePreference, deletePreference, loading, reloadPreferences]` |
| `portion_adjustments` | `usePortionAdjustments()` | Returns `[adjustments, saveAdjustment, deleteAdjustment, loading]` |
| `scheduled_days` | `useScheduledDays()` | Returns `[days, saveDay, deleteDay, loading, reloadDays]` |
| `day_progress` | `useDayProgress()` | Returns `[progress, saveProgress, deleteProgress, loading]` |
| `earned_badges` | `useBadges()` | Returns `[badges, saveBadge, loading]` |
| `shopping_list_state` | `useShoppingListState(planId)` | Returns `[list, saveList, loading]` |
| `current_meal_prep_plan` | `useMealPrepPlanState(planId)` | Returns `[prepPlan, savePrepPlan, loading]` |
| `has_shown_first_success` | `useUserSettings()` | Use `getSetting('has_shown_first_success', false)` |

## 📝 App.tsx Migration Guide

### Step 1: Replace Imports
```typescript
// OLD
import { useKV } from '@github/spark/hooks';

// NEW
import { useAuth } from '@/contexts/AuthContext';
import {
  useUserProfile,
  useCurrentMealPlan,
  useSavedMealPlans,
  useMealPreferences,
  usePortionAdjustments,
  useScheduledDays,
  useDayProgress,
  useBadges,
  useShoppingListState,
  useMealPrepPlanState,
} from '@/hooks/use-supabase-data';
import { useUserSettings } from '@/hooks/use-user-settings';
```

### Step 2: Replace State Declarations
```typescript
// OLD
const [userProfile, setUserProfile] = useKV<UserProfile | null>('user_profile', null);
const [mealPlan, setMealPlan] = useKV<MealPlan | null>('current_meal_plan', null);
// ... etc

// NEW
const { user, loading: authLoading } = useAuth();
const [userProfile, saveUserProfile, deleteUserProfile, profileLoading] = useUserProfile();
const [mealPlan, saveMealPlan, deleteMealPlan, mealPlanLoading] = useCurrentMealPlan();
const [savedMealPlans, saveSavedPlan, deleteSavedPlan, savedPlansLoading, reloadSavedPlans] = useSavedMealPlans();
const [mealPreferences, saveMealPreference, deleteMealPreference, preferencesLoading, reloadPreferences] = useMealPreferences();
const [portionAdjustments, savePortionAdjustment, deletePortionAdjustment, adjustmentsLoading] = usePortionAdjustments();
const [scheduledDays, saveScheduledDay, deleteScheduledDay, scheduledDaysLoading, reloadScheduledDays] = useScheduledDays();
const [dayProgress, saveDayProgress, deleteDayProgress, progressLoading] = useDayProgress();
const [badges, saveBadge, badgesLoading] = useBadges();
const [shoppingListState, saveShoppingListState, shoppingListLoading] = useShoppingListState(mealPlan?.plan_id || null);
const [mealPrepPlan, saveMealPrepPlan, prepPlanLoading] = useMealPrepPlanState(mealPlan?.plan_id || null);
const { settings, updateSettings, getSetting, loading: settingsLoading } = useUserSettings();
```

### Step 3: Update Setter Calls

The new hooks use different patterns for updates:

#### For simple updates:
```typescript
// OLD
setUserProfile(() => profile);

// NEW
await saveUserProfile(profile);
```

#### For functional updates that need the current value:
```typescript
// OLD
setMealPreferences((current) => {
  const preferences = current || [];
  return [...preferences, newPreference];
});

// NEW
// The hooks automatically reload data after saves,
// so you can just save the new preference
await saveMealPreference(newPreference);
await reloadPreferences(); // Automatically reloads all preferences
```

#### For array operations (add/update/delete):
```typescript
// OLD - Add to array
setSavedMealPlans((current) => [...current, newPlan]);

// NEW - Save individual item (service handles the array)
await saveSavedPlan(newPlan);
// reloadSavedPlans() is automatically called

// OLD - Remove from array
setSavedMealPlans((current) => current.filter(p => p.plan_id !== planId));

// NEW - Delete individual item
await deleteSavedPlan(planId);
// reloadSavedPlans() is automatically called
```

### Step 4: Handle Loading States

The new hooks return loading states that should be used to show loading UI:

```typescript
if (authLoading || profileLoading) {
  return <LoadingScreen />;
}

if (!user) {
  return <LoginScreen />;
}

if (!userProfile) {
  return <OnboardingScreen />;
}

// Render main app
```

### Step 5: Remove Spark User API Calls

```typescript
// OLD
const loadUser = async () => {
  try {
    const user = await window.spark.user();
    setCurrentUser(user as unknown as UserInfo);
  } catch (error) {
    setCurrentUser(null);
  }
};

// NEW
// User is automatically available from useAuth()
const { user } = useAuth();
// Convert to UserInfo format if needed
const currentUser = user ? {
  id: user.id,
  email: user.email || '',
  avatarUrl: user.user_metadata?.avatar_url || '',
  login: user.email?.split('@')[0] || 'User',
  isOwner: true, // Or however you determine this
} : null;
```

### Step 6: Update Logout Handler

```typescript
// OLD
const handleLogout = async () => {
  // Complex manual cleanup of KV storage
  sessionStorage.setItem('logout_in_progress', 'true');
  setUserProfile(() => null);
  // ... many more manual resets
  window.location.href = '/.spark/logout?redirect_uri=...';
};

// NEW
const { signOut } = useAuth();
const handleLogout = async () => {
  try {
    toast.loading('Logging out...', { id: 'logout' });
    await SupabaseService.deleteAllUserData(); // Optional: clean up data
    await signOut();
    toast.success('Logged out successfully', { id: 'logout' });
  } catch (error) {
    console.error('Logout error:', error);
    toast.error('Logout failed', { id: 'logout' });
  }
};
```

### Step 7: Update Account Deletion

```typescript
const handleDeleteAccount = async () => {
  try {
    setShowDeleteAccountDialog(false);
    toast.loading('Deleting account...', { id: 'delete-account' });
    
    // Delete all user data from Supabase
    await SupabaseService.deleteAllUserData();
    
    // Sign out (Supabase will handle user deletion via RLS CASCADE)
    await signOut();
    
    toast.success('Account deleted', { id: 'delete-account' });
  } catch (error) {
    toast.error('Failed to delete account', { id: 'delete-account' });
  }
};
```

## ⚠️ Important Notes

### 1. Demo Mode
The current app has a "demo mode" that doesn't require authentication. With Supabase, you have two options:
- **Option A**: Remove demo mode entirely (recommended for Supabase)
- **Option B**: Keep demo mode but use localStorage for demo data only

### 2. Error Handling
All Supabase hooks include error handling, but you should add toast notifications for user feedback:

```typescript
try {
  await saveUserProfile(newProfile);
  toast.success('Profile saved!');
} catch (error) {
  toast.error('Failed to save profile');
  console.error(error);
}
```

### 3. Loading States
The hooks provide loading states. Use them to prevent race conditions:

```typescript
<Button 
  onClick={handleSave}
  disabled={profileLoading || mealPlanLoading}
>
  {profileLoading ? 'Saving...' : 'Save'}
</Button>
```

### 4. Session Persistence
Supabase automatically persists sessions. You don't need to manually handle tokens or refresh logic.

### 5. Email Verification
The current app has email verification logic. With Supabase:
- Use Supabase's built-in email confirmation
- Check `user.email_confirmed_at` to see if verified
- Configure email templates in Supabase dashboard

## 🎯 Next Steps

1. ✅ Database schema created
2. ✅ Service layer implemented
3. ✅ Authentication context created
4. ✅ Custom hooks created
5. ⏳ **Migrate App.tsx** - Replace all `useKV` calls with Supabase hooks
6. ⏳ **Update Authentication UI** - Use Supabase auth instead of Spark
7. ⏳ **Test data persistence** - Verify all data persists correctly
8. ⏳ **Test RLS policies** - Verify users can't access other users' data
9. ⏳ **Deploy schema** - Run `supabase-schema.sql` in Supabase SQL Editor
10. ⏳ **Configure environment variables** - Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

## 🧪 Testing Checklist

After migration, verify:
- [ ] User can sign up with email/password
- [ ] User can sign in with email/password
- [ ] User profile persists across refresh
- [ ] Meal plans persist across refresh
- [ ] Saved plans are stored in database
- [ ] Preferences persist correctly
- [ ] Calendar scheduling works
- [ ] Progress tracking works
- [ ] Badges are saved
- [ ] Shopping lists persist
- [ ] Meal prep plans persist
- [ ] Users can't see other users' data
- [ ] User can delete their account
- [ ] All data is removed on account deletion

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase React Integration](https://supabase.com/docs/guides/getting-started/quickstarts/reactjs)
