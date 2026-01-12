import { useState, useEffect, useCallback } from 'react';
import { SupabaseService } from '@/lib/supabase-service';
import type {
  UserProfile,
  MealPlan,
  MealPreference,
  MealPortionAdjustment,
  ScheduledDay,
  DayProgress,
  Badge,
  ShoppingList,
  MealPrepPlan,
} from '@/types/domain';
import { useAuth } from '@/contexts/AuthContext';

export function useUserProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const loadProfile = async () => {
      try {
        const data = await SupabaseService.getUserProfile();
        setProfile(data);
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  const saveProfile = useCallback(async (newProfile: UserProfile) => {
    if (!user) return;
    try {
      await SupabaseService.saveUserProfile(newProfile);
      setProfile(newProfile);
    } catch (error) {
      console.error('Error saving profile:', error);
      throw error;
    }
  }, [user]);

  const deleteProfile = useCallback(async () => {
    setProfile(null);
  }, []);

  return [profile, saveProfile, deleteProfile, loading] as const;
}

export function useCurrentMealPlan() {
  const { user } = useAuth();
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setMealPlan(null);
      setLoading(false);
      return;
    }

    const loadPlan = async () => {
      try {
        const data = await SupabaseService.getCurrentMealPlan();
        setMealPlan(data);
      } catch (error) {
        console.error('Error loading meal plan:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPlan();
  }, [user]);

  const saveMealPlan = useCallback(async (plan: MealPlan | null) => {
    if (!user || !plan) {
      setMealPlan(null);
      return;
    }
    try {
      await SupabaseService.saveMealPlan(plan, false);
      setMealPlan(plan);
    } catch (error) {
      console.error('Error saving meal plan:', error);
      throw error;
    }
  }, [user]);

  const deleteMealPlan = useCallback(async () => {
    setMealPlan(null);
  }, []);

  return [mealPlan, saveMealPlan, deleteMealPlan, loading] as const;
}

export function useSavedMealPlans() {
  const { user } = useAuth();
  const [savedPlans, setSavedPlans] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPlans = useCallback(async () => {
    if (!user) {
      setSavedPlans([]);
      setLoading(false);
      return;
    }

    try {
      const data = await SupabaseService.getSavedMealPlans();
      setSavedPlans(data);
    } catch (error) {
      console.error('Error loading saved plans:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadPlans();
  }, [loadPlans]);

  const savePlan = useCallback(async (plan: MealPlan) => {
    if (!user) return;
    try {
      await SupabaseService.saveMealPlan(plan, true);
      await loadPlans();
    } catch (error) {
      console.error('Error saving plan:', error);
      throw error;
    }
  }, [user, loadPlans]);

  const deletePlan = useCallback(async (planId: string) => {
    if (!user) return;
    try {
      await SupabaseService.deleteMealPlan(planId);
      await loadPlans();
    } catch (error) {
      console.error('Error deleting plan:', error);
      throw error;
    }
  }, [user, loadPlans]);

  return [savedPlans, savePlan, deletePlan, loading, loadPlans] as const;
}

export function useMealPreferences() {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<MealPreference[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPreferences = useCallback(async () => {
    if (!user) {
      setPreferences([]);
      setLoading(false);
      return;
    }

    try {
      const data = await SupabaseService.getMealPreferences();
      setPreferences(data);
    } catch (error) {
      console.error('Error loading preferences:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadPreferences();
  }, [loadPreferences]);

  const savePreference = useCallback(async (preference: MealPreference) => {
    if (!user) return;
    try {
      await SupabaseService.saveMealPreference(preference);
      await loadPreferences();
    } catch (error) {
      console.error('Error saving preference:', error);
      throw error;
    }
  }, [user, loadPreferences]);

  const deletePreference = useCallback(async (mealId: string) => {
    if (!user) return;
    try {
      await SupabaseService.deleteMealPreference(mealId);
      await loadPreferences();
    } catch (error) {
      console.error('Error deleting preference:', error);
      throw error;
    }
  }, [user, loadPreferences]);

  return [preferences, savePreference, deletePreference, loading, loadPreferences] as const;
}

export function usePortionAdjustments() {
  const { user } = useAuth();
  const [adjustments, setAdjustments] = useState<MealPortionAdjustment[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAdjustments = useCallback(async () => {
    if (!user) {
      setAdjustments([]);
      setLoading(false);
      return;
    }

    try {
      const data = await SupabaseService.getPortionAdjustments();
      setAdjustments(data);
    } catch (error) {
      console.error('Error loading adjustments:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadAdjustments();
  }, [loadAdjustments]);

  const saveAdjustment = useCallback(async (adjustment: MealPortionAdjustment) => {
    if (!user) return;
    try {
      await SupabaseService.savePortionAdjustment(adjustment);
      await loadAdjustments();
    } catch (error) {
      console.error('Error saving adjustment:', error);
      throw error;
    }
  }, [user, loadAdjustments]);

  const deleteAdjustment = useCallback(async (mealId: string) => {
    if (!user) return;
    try {
      await SupabaseService.deletePortionAdjustment(mealId);
      await loadAdjustments();
    } catch (error) {
      console.error('Error deleting adjustment:', error);
      throw error;
    }
  }, [user, loadAdjustments]);

  return [adjustments, saveAdjustment, deleteAdjustment, loading] as const;
}

export function useScheduledDays() {
  const { user } = useAuth();
  const [scheduledDays, setScheduledDays] = useState<ScheduledDay[]>([]);
  const [loading, setLoading] = useState(true);

  const loadScheduledDays = useCallback(async () => {
    if (!user) {
      setScheduledDays([]);
      setLoading(false);
      return;
    }

    try {
      const data = await SupabaseService.getScheduledDays();
      setScheduledDays(data);
    } catch (error) {
      console.error('Error loading scheduled days:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadScheduledDays();
  }, [loadScheduledDays]);

  const saveScheduledDay = useCallback(async (day: ScheduledDay) => {
    if (!user) return;
    try {
      await SupabaseService.saveScheduledDay(day);
      await loadScheduledDays();
    } catch (error) {
      console.error('Error saving scheduled day:', error);
      throw error;
    }
  }, [user, loadScheduledDays]);

  const deleteScheduledDay = useCallback(async (date: string) => {
    if (!user) return;
    try {
      await SupabaseService.deleteScheduledDay(date);
      await loadScheduledDays();
    } catch (error) {
      console.error('Error deleting scheduled day:', error);
      throw error;
    }
  }, [user, loadScheduledDays]);

  return [scheduledDays, saveScheduledDay, deleteScheduledDay, loading, loadScheduledDays] as const;
}

export function useDayProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<DayProgress[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProgress = useCallback(async () => {
    if (!user) {
      setProgress([]);
      setLoading(false);
      return;
    }

    try {
      const data = await SupabaseService.getDayProgress();
      setProgress(data);
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const saveProgress = useCallback(async (dayProgress: DayProgress) => {
    if (!user) return;
    try {
      await SupabaseService.saveDayProgress(dayProgress);
      await loadProgress();
    } catch (error) {
      console.error('Error saving progress:', error);
      throw error;
    }
  }, [user, loadProgress]);

  const deleteProgress = useCallback(async (date: string) => {
    if (!user) return;
    try {
      await SupabaseService.deleteDayProgress(date);
      await loadProgress();
    } catch (error) {
      console.error('Error deleting progress:', error);
      throw error;
    }
  }, [user, loadProgress]);

  return [progress, saveProgress, deleteProgress, loading] as const;
}

export function useBadges() {
  const { user } = useAuth();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBadges = useCallback(async () => {
    if (!user) {
      setBadges([]);
      setLoading(false);
      return;
    }

    try {
      const data = await SupabaseService.getBadges();
      setBadges(data);
    } catch (error) {
      console.error('Error loading badges:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadBadges();
  }, [loadBadges]);

  const saveBadge = useCallback(async (badge: Badge) => {
    if (!user) return;
    try {
      await SupabaseService.saveBadge(badge);
      await loadBadges();
    } catch (error) {
      console.error('Error saving badge:', error);
      throw error;
    }
  }, [user, loadBadges]);

  return [badges, saveBadge, loading] as const;
}

export function useShoppingListState(planId: string | null) {
  const { user } = useAuth();
  const [shoppingList, setShoppingList] = useState<ShoppingList | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !planId) {
      setShoppingList(null);
      setLoading(false);
      return;
    }

    const loadList = async () => {
      try {
        const data = await SupabaseService.getShoppingList(planId);
        setShoppingList(data);
      } catch (error) {
        console.error('Error loading shopping list:', error);
      } finally {
        setLoading(false);
      }
    };

    loadList();
  }, [user, planId]);

  const saveShoppingList = useCallback(async (list: ShoppingList | null) => {
    if (!user || !planId || !list) {
      setShoppingList(null);
      return;
    }
    try {
      await SupabaseService.saveShoppingList(planId, list);
      setShoppingList(list);
    } catch (error) {
      console.error('Error saving shopping list:', error);
      throw error;
    }
  }, [user, planId]);

  return [shoppingList, saveShoppingList, loading] as const;
}

export function useMealPrepPlanState(planId: string | null) {
  const { user } = useAuth();
  const [prepPlan, setPrepPlan] = useState<MealPrepPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !planId) {
      setPrepPlan(null);
      setLoading(false);
      return;
    }

    const loadPlan = async () => {
      try {
        const data = await SupabaseService.getMealPrepPlan(planId);
        setPrepPlan(data);
      } catch (error) {
        console.error('Error loading prep plan:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPlan();
  }, [user, planId]);

  const savePrepPlan = useCallback(async (plan: MealPrepPlan | null) => {
    if (!user || !plan) {
      setPrepPlan(null);
      return;
    }
    try {
      await SupabaseService.saveMealPrepPlan(plan);
      setPrepPlan(plan);
    } catch (error) {
      console.error('Error saving prep plan:', error);
      throw error;
    }
  }, [user]);

  return [prepPlan, savePrepPlan, loading] as const;
}
