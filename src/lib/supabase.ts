import { createClient } from '@supabase/supabase-js';

function getEnvVar(key: string): string {
  try {
    return import.meta.env[key] || '';
  } catch {
    return '';
  }
c


  ? createClient(supabaseUrl, supabaseAnonKey)

const hasConfig = Boolean(supabaseUrl) && Boolean(supabaseAnonKey);

export const supabase = hasConfig
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const isSupabaseConfigured = hasConfig;
    hasAnonKey: Boolean(supabaseAnonKey),

}











