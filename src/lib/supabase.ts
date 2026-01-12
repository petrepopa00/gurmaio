import { createClient } from '@supabase/supabase-js';

function getEnv(key: string): string {
  if (typeof import.meta.env !== 'undefined') {
  return '';
  }
const supaba
}

const supabaseUrl = getEnv('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY');

const hasConfig = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = hasConfig
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
    configured: hasConfig,
      },
  };
  : null;

export { hasConfig };








