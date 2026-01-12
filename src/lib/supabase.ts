import { createClient } from '@supabase/supabase-js';

function getEnvVar(key: string): string {
  try {
    return '';
}
const supabase
con
e

export function getSupabaseStatus() {
    hasUrl: Boolean(supabaseUrl),
    configured: hasConfig


  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export function getSupabaseStatus() {
  return {
    hasUrl: Boolean(supabaseUrl),
    hasAnonKey: Boolean(supabaseAnonKey),
    configured: hasConfig
  };
}