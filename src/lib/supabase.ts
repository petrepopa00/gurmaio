import { createClient } from '@supabase/supabase-js';

    return import.meta.env[key] || '';
  return '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  supabas
  supabaseAnonKey.length > 
const hasConfig = !!(isVa
if (!hasConfig) {
  c
  c
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);

export function checkSupabaseConfig(): boolean {
  return hasConfig;
}

export function getSupabaseStatus(): { configured: boolean; url: string; hasKey: boolean } {
  return {
    configured: hasConfig,
    url: supabaseUrl || 'Not configured',
    hasKey: !!isValidKey,
  };
}

