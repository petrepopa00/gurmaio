import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import pg from 'pg';

const { Client } = pg;

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

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    const existing = process.env[key];
    if (!existing && value) process.env[key] = value;
  }
}

function getProjectRefFromSupabaseUrl(url) {
  if (!url) return null;
  try {
    const host = new URL(url).hostname;
    // Expected: <projectRef>.supabase.co
    const match = host.match(/^([a-z0-9]+)\.supabase\.co$/i);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

const repoRoot = process.cwd();
loadEnvLocal(repoRoot);

const projectRef =
  process.env.SUPABASE_PROJECT_REF ||
  getProjectRefFromSupabaseUrl(process.env.VITE_SUPABASE_URL) ||
  getProjectRefFromSupabaseUrl(process.env.SUPABASE_URL) ||
  'aheicnxgdqtpzqbutlmw';
const dbUrl = process.env.SUPABASE_DB_URL;

let client;

if (dbUrl) {
  // Example: postgresql://postgres:<password>@db.<ref>.supabase.co:5432/postgres
  console.log('Project ref:', projectRef);
  console.log('Connecting via SUPABASE_DB_URL (ssl=require)');
  client = new Client({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false },
  });
} else {
  const password = process.env.SUPABASE_DB_PASSWORD;
  if (!password) {
    console.error('Missing SUPABASE_DB_URL or SUPABASE_DB_PASSWORD. Put one of them in .env.local (recommended) or set env vars in this terminal.');
    process.exit(1);
  }

  const host = `db.${projectRef}.supabase.co`;
  const port = 5432;
  const user = 'postgres';
  const database = 'postgres';

  console.log('Project ref:', projectRef);
  console.log('Connecting to:', `${host}:${port}/${database} (user=${user}, ssl=require)`);

  client = new Client({
    host,
    port,
    user,
    password,
    database,
    ssl: { rejectUnauthorized: false },
  });
}

try {
  await client.connect();

  const { rows } = await client.query(
    `select schemaname, tablename
     from pg_tables
     where schemaname not in ('pg_catalog', 'information_schema')
     order by schemaname, tablename;`
  );

  if (!rows.length) {
    console.log('No tables found (outside pg_catalog/information_schema).');
    process.exit(0);
  }

  console.log('--- TABLES ---');
  for (const r of rows) {
    console.log(`${r.schemaname}.${r.tablename}`);
  }
} catch (e) {
  const msg = e instanceof Error ? e.message : String(e);
  console.error('Failed to list tables:', msg);
  process.exitCode = 1;
} finally {
  try {
    await client.end();
  } catch {
    // ignore
  }
}
