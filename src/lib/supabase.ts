import { createClient } from '@supabase/supabase-js';

    return import.meta.env[key] || '';
  return '';
    return import.meta.env[key] || '';
  }
  return '';
}


  supabaseUrl || 'https://placeholder.supabase.co',

      autoRefreshToken: true,
      detectSessionInUrl: true


  return hasConfig;


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




