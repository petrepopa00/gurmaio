# Supabase Database Deployment Guide

## Quick Setup (5 minutes)

### 1. Create Supabase Project
1. Go to [app.supabase.com](https://app.supabase.com)
2. Click **"New Project"**
3. Fill in details:
   - **Name**: gurmaio (or your choice)
   - **Database Password**: Generate a strong password and **save it**!
   - **Region**: Choose closest to your users
4. Wait ~2 minutes for project creation

### 2. Run Database Schema
1. In your Supabase project, go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Open `supabase-complete-setup.sql` from this repository
4. Copy the ENTIRE file contents
5. Paste into the SQL Editor
6. Click **"Run"** or press `Ctrl/Cmd + Enter`
7. You should see: **"Success. No rows returned"** ✅

### 3. Verify Tables Were Created
1. Go to **Table Editor** (left sidebar)
2. You should see 10 tables:
   - ✅ profiles
   - ✅ meal_plans
   - ✅ meal_preferences
   - ✅ portion_adjustments
   - ✅ scheduled_days
   - ✅ day_progress
   - ✅ badges
   - ✅ shopping_lists
   - ✅ meal_prep_plans
   - ✅ user_settings

### 4. Get API Credentials
1. Go to **Settings** → **API** (left sidebar)
2. Copy these values:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon/public key**: Long string starting with `eyJ...`

### 5. Configure Environment Variables
Create or update `.env` file in project root:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **IMPORTANT**: 
- Never commit `.env` to git
- `.env` should already be in `.gitignore`
- Use `.env.example` as a template

### 6. Enable Email Authentication (Optional)
1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Configure email templates (or use defaults)
4. For custom SMTP, add your email service credentials

### 7. Test the Setup
1. Start your dev server: `npm run dev`
2. Try to create an account
3. Check **Table Editor** → **auth.users** to see if user was created
4. Check **profiles** table to verify data is being saved

## ✅ Verification Checklist

After running the setup, verify:

- [ ] All 10 tables appear in Table Editor
- [ ] Each table shows "RLS enabled" badge
- [ ] SQL Editor shows no errors
- [ ] `.env` file has correct credentials
- [ ] Dev server starts without Supabase errors
- [ ] Can create a new user account
- [ ] User data appears in tables
- [ ] Can't see other users' data

## 🔒 Security Verification

Test Row Level Security:

1. Create User A and add some data
2. Sign out
3. Create User B
4. User B should NOT see User A's data
5. User B can only see their own data

## 🐛 Troubleshooting

### "Missing Supabase environment variables"
- ✅ Check `.env` file exists in project root
- ✅ Check variables are named exactly: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- ✅ Restart dev server after changing `.env`

### "relation does not exist" errors
- ✅ Make sure you ran the ENTIRE `supabase-complete-setup.sql` file
- ✅ Check SQL Editor for any error messages
- ✅ Verify tables exist in Table Editor

### "permission denied for table X"
- ✅ RLS policies not created correctly
- ✅ Re-run the schema script
- ✅ Check that RLS is enabled on all tables

### "new row violates row-level security policy"
- ✅ User is not authenticated
- ✅ Check that user is signed in before trying to save data
- ✅ Verify `auth.uid()` returns the user's ID

### Data not persisting across refresh
- ✅ Check browser console for errors
- ✅ Verify API calls are succeeding in Network tab
- ✅ Check Supabase logs: **Database** → **Logs**

### Can see other users' data
- 🚨 RLS policies not working correctly
- ✅ Verify RLS is enabled on tables
- ✅ Re-run the schema script
- ✅ Check policies exist: **Authentication** → **Policies**

## 📊 Database Schema Overview

```
┌─────────────────┐
│  auth.users     │  (Managed by Supabase)
└────────┬────────┘
         │ user_id (foreign key)
         │
    ┌────┴───────────────────────────┐
    │                                │
    ▼                                ▼
┌─────────────┐            ┌──────────────────┐
│  profiles   │            │  user_settings   │
└─────────────┘            └──────────────────┘
                                     
┌──────────────┐            ┌──────────────────────┐
│  meal_plans  │────────────│  shopping_lists      │
└──────────────┘   plan_id  └──────────────────────┘
       │                               
       │ plan_id                      
       ▼                              
┌──────────────────┐          
│  meal_prep_plans │          
└──────────────────┘          

┌────────────────────┐      ┌────────────────────┐
│  meal_preferences  │      │  portion_adjust... │
└────────────────────┘      └────────────────────┘

┌────────────────┐          ┌──────────────┐
│  scheduled_days│────────  │  day_progress│
└────────────────┘  date    └──────────────┘

┌─────────┐
│  badges │
└─────────┘
```

## 🔄 Schema Updates

If you need to modify the schema later:

1. Write migration SQL (add/modify columns, indexes, etc.)
2. Test in a development Supabase project first
3. Run in production Supabase SQL Editor
4. Update `supabase-complete-setup.sql` for future deployments

## 📚 Next Steps

After successful deployment:

1. ✅ Configure email templates in **Authentication** → **Email Templates**
2. ✅ Set up database backups: **Database** → **Backups**
3. ✅ Monitor usage: **Home** → **Usage**
4. ✅ Set up alerts: **Settings** → **Integrations**
5. ✅ Review API logs: **Database** → **Logs**

## 🆘 Need Help?

- 📖 [Supabase Documentation](https://supabase.com/docs)
- 💬 [Supabase Discord](https://discord.supabase.com)
- 🐛 [Supabase GitHub Issues](https://github.com/supabase/supabase/issues)
- 📧 [Supabase Support](https://supabase.com/support)
