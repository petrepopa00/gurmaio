import type { MealPlan } from '@/types/domain';
import { supabase } from '@/lib/supabase';

function getEnvVar(key: string): string {
  try {
    return import.meta.env[key] || '';
  } catch {
    return '';
  }
}

export function getWorkersApiBaseUrl(): string {
  return (getEnvVar('VITE_WORKERS_API_URL') || '').replace(/\/$/, '');
}

export function isWorkersApiConfigured(): boolean {
  return Boolean(getWorkersApiBaseUrl());
}

export async function generateMealPlanViaWorkers(): Promise<MealPlan> {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }

  const baseUrl = getWorkersApiBaseUrl();
  if (!baseUrl) {
    throw new Error('Missing VITE_WORKERS_API_URL');
  }

  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) {
    throw new Error('Not authenticated');
  }

  const res = await fetch(`${baseUrl}/meal-plans/generate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ regenerate: true }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Worker error (${res.status}): ${text}`);
  }

  return (await res.json()) as MealPlan;
}

export async function listMealPlansViaWorkers(options?: { isSaved?: boolean }): Promise<MealPlan[]> {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }

  const baseUrl = getWorkersApiBaseUrl();
  if (!baseUrl) {
    throw new Error('Missing VITE_WORKERS_API_URL');
  }

  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) {
    throw new Error('Not authenticated');
  }

  const url = new URL(`${baseUrl}/meal-plans`);
  if (typeof options?.isSaved === 'boolean') {
    url.searchParams.set('is_saved', String(options.isSaved));
  }

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Worker error (${res.status}): ${text}`);
  }

  return (await res.json()) as MealPlan[];
}

export async function upsertProgressViaWorkers(progress: {
  date: string;
  completed_meals: unknown[];
  total_nutrition: { calories: number; protein_g: number; carbohydrates_g: number; fats_g: number };
  total_cost: number;
  meals_count: number;
}): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }

  const baseUrl = getWorkersApiBaseUrl();
  if (!baseUrl) {
    throw new Error('Missing VITE_WORKERS_API_URL');
  }

  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) {
    throw new Error('Not authenticated');
  }

  const res = await fetch(`${baseUrl}/progress`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(progress),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Worker error (${res.status}): ${text}`);
  }
}
