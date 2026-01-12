# ⚠️ SUPABASE ENVIRONMENT VARIABLES REQUIRED

## Current Status: MISSING CREDENTIALS

The application is configured to use Supabase but the environment variables are not set.

## Quick Fix

You need to set the following environment variables with your actual Supabase project credentials:

### Step 1: Get Your Credentials

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Open your project (or create one if you haven't)
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public key** (the long string under "Project API keys")

### Step 2: Set Environment Variables

Edit the `.env` file in the project root and replace the placeholder values:

```env
VITE_SUPABASE_URL=https://your-actual-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

### Step 3: Restart the Dev Server

```bash
npm run dev
```

## What's Currently Happening

The app is trying to initialize Supabase but can't find valid credentials:

- `VITE_SUPABASE_URL` is set to: `https://your-project.supabase.co` (placeholder)
- `VITE_SUPABASE_ANON_KEY` is set to: `your-anon-key-here` (placeholder)

These are not real credentials, so the app cannot connect to Supabase.

## Database Schema

Once you've set the environment variables, you also need to run the database schema:

1. Open Supabase Dashboard → SQL Editor
2. Copy the contents of `supabase-schema.sql`
3. Paste and run it in the SQL Editor
4. Verify tables were created in the Table Editor

## Why This Matters

Without proper Supabase configuration:
- User authentication won't work
- Data won't persist between sessions
- The app will show errors when trying to save/load data

## Alternative: Use Without Supabase

If you want to test the app without Supabase (data won't persist):

The app has been updated to handle missing Supabase credentials gracefully. It will show a warning but continue to function using local state only.

## Need Help?

See the full setup guide in `SUPABASE_ENV_SETUP.md`
