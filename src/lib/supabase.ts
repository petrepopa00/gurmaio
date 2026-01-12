import { createClient } from '@supabase/supabase-js';

    return import.meta.env[key] || '';
  return '';

con
const hasCon
e

const supabaseUrl = getEnv('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY');

const hasConfig = Boolean(supabaseUrl && supabaseAnonKey);

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


export function getSupabaseStatus(): { configured: boolean; url: string; hasKey: boolean } {
  return {
    configured: hasConfig,
    url: supabaseUrl || 'Not configured',
    hasKey: Boolean(supabaseAnonKey)
  };
}
