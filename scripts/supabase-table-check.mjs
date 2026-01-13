import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { createClient } from '@supabase/supabase-js';

function loadEnvLocal(repoRoot) {
  const envPath = path.join(repoRoot, '.env.local');
  if (!fs.existsSync(envPath)) return;

  const content = fs.readFileSync(envPath, 'utf8');
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const normalized = line.startsWith('export ') ? line.slice('export '.length).trim() : line;
    const eq = normalized.indexOf('=');
    if (eq === -1) continue;
    const key = normalized.slice(0, eq).trim();
    let value = normalized.slice(eq + 1).trim();

    // Strip quotes
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // Prefer values from .env.local if env var is missing OR empty.
    const existing = process.env[key];
    if (!existing && value) process.env[key] = value;
  }
}

function isProbablyMissingTableError(error) {
  const msg = String(error?.message || error || '').toLowerCase();
  // PostgREST can return 404 or schema cache errors for missing tables.
  return (
    msg.includes('could not find the table') ||
    msg.includes('relation') && msg.includes('does not exist') ||
    msg.includes('schema cache')
  );
}

const repoRoot = process.cwd();
loadEnvLocal(repoRoot);

const url = process.env.VITE_SUPABASE_URL;
const anonKey = process.env.VITE_SUPABASE_ANON_KEY;

const envLocalPath = path.join(repoRoot, '.env.local');
console.log('Found .env.local:', fs.existsSync(envLocalPath));
console.log('VITE_SUPABASE_URL present:', Boolean(url), url ? `(len=${String(url).length})` : '');
console.log('VITE_SUPABASE_ANON_KEY present:', Boolean(anonKey), anonKey ? `(len=${String(anonKey).length})` : '');

if (!url || !anonKey) {
  console.error('Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. Ensure .env.local exists or env vars are set.');
  process.exit(1);
}

const supabase = createClient(url, anonKey, {
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
});

// Add/adjust this list to match your expected schema
const tablesToProbe = [
  'profiles',
  'meal_plans',
  'meal_preferences',
  'portion_adjustments',
  'scheduled_days',
  'day_progress',
  'badges',
  'shopping_lists',
  'meal_prep_plans',
];

console.log('Supabase URL:', url);
console.log('Probing tables with ANON key (no user JWT) -> results reflect RLS/privileges.');
console.log('---');

for (const table of tablesToProbe) {
  // Use head:true to avoid returning any data; we just want to know if the table exists/is selectable.
  const { error } = await supabase
    .from(table)
    .select('*', { head: true, count: 'exact' })
    .limit(1);

  if (!error) {
    console.log(`${table}: OK (selectable as anon)`);
    continue;
  }

  const msg = String(error.message || error);
  if (isProbablyMissingTableError(error)) {
    console.log(`${table}: MISSING (or not exposed via PostgREST)`);
    continue;
  }

  // Common for RLS/no privileges: 401/403 with a message.
  console.log(`${table}: BLOCKED (${msg})`);
}

console.log('---');
console.log('Note: listing *all* tables is not possible with anon key. For full introspection you need DB credentials or service_role (not for frontend).');
