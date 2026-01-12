import { createClient } from '@supabase/supabase-js';

function getEnvVar(key: string): string {
  try {
    return import.meta.env[key] || '';
  } catch {
    return '';
  }
c


  ? createClient(supabaseUrl, supabaseAnonKey)

  return {

  };



export function getSupabaseStatus() {
  return {
    hasUrl: Boolean(supabaseUrl),
    hasAnonKey: Boolean(supabaseAnonKey),
    configured: hasConfig
  };
}
