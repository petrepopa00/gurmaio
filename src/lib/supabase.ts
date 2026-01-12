import { createClient } from '@supabase/supabase-js';

function getEnvVar(key: string): string {
  if (typeof import.meta.env !== 'undefined') {
    return import.meta.env[key] || '';
  }
  return '';
}

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY');

const isValidUrl = supabaseUrl && 
  supabaseUrl !== 'https://your-project.supabase.co' && 
  supabaseUrl !== 'your_supabase_project_url' &&
  supabaseUrl !== 'https://placeholder.supabase.co' &&
  supabaseUrl.includes('.supabase.co');

const isValidKey = supabaseAnonKey && 
  supabaseAnonKey !== 'your-anon-key-here' &&
  supabaseAnonKey !== 'your_supabase_anon_key' &&
  supabaseAnonKey !== 'placeholder-key' &&
  supabaseAnonKey.length > 20;

const hasConfig = !!(isValidUrl && isValidKey);

if (!hasConfig) {
  console.warn('⚠️  Supabase environment variables not configured');
  console.warn('Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable data persistence');
  console.warn('Current URL:', supabaseUrl || 'Not set');
  console.warn('Current Key:', supabaseAnonKey ? 'Set but invalid' : 'Not set');
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

