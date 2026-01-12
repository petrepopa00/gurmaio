# Supabase Configuration Status

## Environment Variables

The application is looking for the following environment variables:

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anon/public key

## How to Configure

### Option 1: Local Development (.env file)

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and replace the placeholder values with your actual Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-actual-anon-key
   ```

3. Get your credentials from [Supabase Dashboard](https://app.supabase.com):
   - Go to your project
   - Navigate to Settings → API
   - Copy the Project URL and anon/public key

4. Restart your development server:
   ```bash
   npm run dev
   ```

### Option 2: Spark Platform (Production)

If you're deploying to Spark platform, set environment variables in the Spark dashboard:

1. Go to your Spark project settings
2. Add environment variables:
   - Key: `VITE_SUPABASE_URL`, Value: your Supabase URL
   - Key: `VITE_SUPABASE_ANON_KEY`, Value: your anon key

### Option 3: GitHub Secrets (for CI/CD)

If using GitHub Actions or similar:

1. Go to your repository Settings → Secrets
2. Add repository secrets:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## Verifying Configuration

After setting the environment variables, check the browser console on app load. You should see:
- ✅ "Supabase configured successfully" (if credentials are set)
- ⚠️  "Supabase environment variables not configured" (if credentials are missing)

## Database Setup

Once environment variables are configured, you need to set up the database schema:

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the SQL file: `supabase-schema.sql`
4. Verify tables are created in the Table Editor

## Troubleshooting

### Error: "Missing Supabase environment variables"

**Cause:** Environment variables are not set or not accessible.

**Solution:**
- Check that `.env` file exists and contains valid values
- Restart your dev server after creating/modifying `.env`
- Ensure the `.env` file is in the project root directory
- Check that variables start with `VITE_` (required by Vite)

### Error: "Failed to fetch" or network errors

**Cause:** Invalid Supabase URL or the project is not accessible.

**Solution:**
- Verify the Supabase URL is correct
- Check that your Supabase project is active
- Ensure you're using the anon/public key (not the service_role key)

### Error: "Invalid API key"

**Cause:** The anon key is incorrect or expired.

**Solution:**
- Copy the anon/public key again from Supabase dashboard
- Make sure you didn't accidentally copy the service_role key
- Check for extra spaces or line breaks in the key

## Security Notes

- ✅ The anon/public key is safe to expose in client-side code
- ✅ Row Level Security (RLS) protects your data
- ❌ Never commit `.env` to version control
- ❌ Never use the service_role key in client-side code
