# Deploy Supabase Database - Step by Step

## ⚡ Quick Deploy (5 Minutes)

Follow these exact steps to deploy your database.

---

## Step 1: Create Supabase Project

1. Open [app.supabase.com](https://app.supabase.com) in your browser
2. Click the **"New Project"** button
3. Fill in the project details:
   ```
   Name: gurmaio
   Database Password: [Click "Generate password" and COPY IT!]
   Region: [Choose closest to you]
   ```
4. Click **"Create new project"**
5. Wait ~2 minutes for project to initialize
6. ✅ You should see your project dashboard

---

## Step 2: Open SQL Editor

1. In the left sidebar, find **"SQL Editor"**
2. Click **"SQL Editor"**
3. Click the **"New query"** button (top right)
4. ✅ You should see an empty SQL editor

---

## Step 3: Copy Database Schema

1. Open the file `supabase-complete-setup.sql` in this repository
2. Select ALL text (Ctrl+A or Cmd+A)
3. Copy (Ctrl+C or Cmd+C)
4. ✅ Schema is in your clipboard

---

## Step 4: Paste and Run Schema

1. Go back to Supabase SQL Editor (from Step 2)
2. Click in the editor area
3. Paste the schema (Ctrl+V or Cmd+V)
4. You should see ~400 lines of SQL
5. Click **"Run"** button (or press Ctrl+Enter / Cmd+Enter)
6. Wait ~10 seconds
7. ✅ You should see: **"Success. No rows returned"**

> ⚠️ **Important**: Do NOT close the tab if you see errors. Take a screenshot and check troubleshooting.

---

## Step 5: Verify Tables Created

1. In the left sidebar, find **"Table Editor"**
2. Click **"Table Editor"**
3. ✅ You should see 10 tables:
   - profiles
   - meal_plans
   - meal_preferences
   - portion_adjustments
   - scheduled_days
   - day_progress
   - badges
   - shopping_lists
   - meal_prep_plans
   - user_settings

> ⚠️ **If you don't see 10 tables**, go back to Step 4 and check for errors.

---

## Step 6: Verify RLS Enabled

1. Click on any table (e.g., "profiles")
2. Look for an **"RLS enabled"** badge next to the table name
3. Click the **"Policies"** tab
4. ✅ You should see 4 policies:
   - Users can view own profile
   - Users can insert own profile
   - Users can update own profile
   - Users can delete own profile

Repeat for 2-3 other tables to verify.

---

## Step 7: Get API Credentials

1. In the left sidebar, find **"Settings"** (gear icon at bottom)
2. Click **"Settings"** → **"API"**
3. Find **"Project URL"** section
4. Copy the URL (looks like `https://xxxxxxxxxxxxx.supabase.co`)
5. Find **"Project API keys"** section
6. Copy the **"anon"** / **"public"** key (long string starting with `eyJ...`)
7. ✅ Save both values - you'll need them next

---

## Step 8: Configure Your App

1. Open your project in your code editor
2. Create a new file called `.env` in the root directory
3. Add these lines:
   ```env
   VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
4. Replace the values with your Project URL and anon key from Step 7
5. Save the file
6. ✅ Environment variables configured

> ⚠️ **Never commit `.env` to git!** It should already be in `.gitignore`.

---

## Step 9: Enable Email Authentication

1. In Supabase dashboard, go to **"Authentication"** (left sidebar)
2. Click **"Providers"**
3. Find **"Email"** in the list
4. Toggle it to **Enabled** (if not already)
5. (Optional) Customize email templates by clicking "Email Templates"
6. ✅ Email authentication is enabled

---

## Step 10: Test Your Setup

1. In your terminal, navigate to your project directory
2. Run: `npm run dev`
3. ✅ Server should start without "Missing Supabase environment variables" error
4. Open your app in browser
5. ✅ No console errors about Supabase

---

## ✅ Success Checklist

You've successfully deployed if ALL of these are true:

- [ ] Supabase project created
- [ ] SQL script ran successfully
- [ ] 10 tables visible in Table Editor
- [ ] Each table has "RLS enabled" badge
- [ ] Each table has 4 policies
- [ ] API credentials copied
- [ ] `.env` file created with credentials
- [ ] Email authentication enabled
- [ ] `npm run dev` starts without errors
- [ ] No console errors in browser

---

## 🐛 Troubleshooting

### "Error: relation already exists"
**Fix**: Tables already created. You're done! Go to Step 5 to verify.

### "Error: permission denied"
**Fix**: Make sure you're running the SQL in your own project (not someone else's).

### "Success" but no tables visible
**Fix**: 
1. Refresh the Table Editor page
2. Check you're in the correct project
3. Re-run the SQL script

### "Missing Supabase environment variables"
**Fix**: 
1. Make sure `.env` file exists in project root
2. Make sure it has both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
3. Restart your dev server (`npm run dev`)

### "Failed to fetch" in browser console
**Fix**:
1. Check `.env` file has correct URL (no trailing slash)
2. Check `.env` file has correct anon key
3. Check Supabase project is not paused
4. Restart dev server

### Can't find SQL Editor
**Fix**: Look in the left sidebar under "SQL Editor" (may need to scroll)

### Can't find Table Editor
**Fix**: Look in the left sidebar under "Table Editor" (above SQL Editor)

---

## 🎉 You're Done!

If all checks passed, your database is deployed and ready to use!

**Next Steps**:
1. Read `SUPABASE_INTEGRATION.md` to migrate your app
2. Or read `SUPABASE_README.md` for full overview

---

## 📝 What You Created

You just deployed:
- ✅ 10 database tables
- ✅ 40 security policies (Row Level Security)
- ✅ 13 indexes for performance
- ✅ 7 automatic timestamp triggers
- ✅ Complete authentication system

**Your data is secure**: Users can only see their own data, enforced at the database level.

---

## 🆘 Still Stuck?

1. **Check**: `SUPABASE_DEPLOYMENT.md` → Troubleshooting section
2. **Search**: [Supabase Documentation](https://supabase.com/docs)
3. **Ask**: [Supabase Discord](https://discord.supabase.com)

---

**Congratulations! Your Supabase database is live!** 🚀
