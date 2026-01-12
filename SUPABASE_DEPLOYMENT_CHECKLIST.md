# Supabase Integration - Deployment Checklist

## Pre-Deployment Checklist

### 1. Local Environment
- [ ] `.env` file created with Supabase credentials
- [ ] `npm install` completed successfully
- [ ] `npm run dev` starts without errors
- [ ] No TypeScript errors in terminal
- [ ] No console errors in browser

### 2. Supabase Project
- [ ] Supabase project created
- [ ] Database password saved securely
- [ ] Project URL copied
- [ ] Anon key copied

### 3. Database Schema
- [ ] `supabase-complete-setup.sql` opened
- [ ] SQL copied to Supabase SQL Editor
- [ ] SQL executed successfully
- [ ] "Success. No rows returned" message displayed

### 4. Verify Tables
- [ ] Navigate to Table Editor in Supabase
- [ ] 10 tables visible:
  - [ ] profiles
  - [ ] meal_plans
  - [ ] meal_preferences
  - [ ] portion_adjustments
  - [ ] scheduled_days
  - [ ] day_progress
  - [ ] badges
  - [ ] shopping_lists
  - [ ] meal_prep_plans
  - [ ] user_settings

### 5. Verify RLS
- [ ] Each table shows "RLS enabled" badge
- [ ] Click on any table → Policies tab
- [ ] 4 policies visible for each table (SELECT, INSERT, UPDATE, DELETE)

### 6. Enable Authentication
- [ ] Go to Authentication → Providers
- [ ] Email provider enabled
- [ ] Email templates configured (or using defaults)
- [ ] (Optional) OAuth providers configured

---

## Deployment Checklist

### 7. Code Integration
- [ ] `src/lib/supabase.ts` exists and is configured
- [ ] `src/contexts/AuthContext.tsx` exists
- [ ] `src/hooks/use-supabase-data.ts` exists
- [ ] `src/hooks/use-user-settings.ts` exists
- [ ] `src/main.tsx` wraps app with `<AuthProvider>`

### 8. App.tsx Migration (If completed)
- [ ] All `useKV` calls replaced with Supabase hooks
- [ ] `useAuth()` hook used for authentication
- [ ] Loading states handled appropriately
- [ ] Error handling added for all async operations
- [ ] Demo mode removed or adapted

### 9. Build & Test
- [ ] `npm run build` succeeds
- [ ] No build errors or warnings
- [ ] Built app loads in browser
- [ ] No console errors in production build

---

## Validation Checklist

### 10. Authentication Tests
- [ ] Can access sign up page
- [ ] Can create new account with email/password
- [ ] Receives confirmation email (if email confirmation enabled)
- [ ] Can sign in with correct credentials
- [ ] Cannot sign in with wrong credentials
- [ ] Session persists after page refresh
- [ ] Can sign out successfully
- [ ] Session cleared after sign out

### 11. User Profile Tests
- [ ] Can complete onboarding/profile setup
- [ ] Profile data saves to database
- [ ] Profile data visible in Supabase Table Editor → profiles
- [ ] Profile data persists after refresh
- [ ] Can edit profile
- [ ] Profile changes save to database

### 12. Meal Plan Tests
- [ ] Can generate meal plan
- [ ] Meal plan saves to database
- [ ] Meal plan visible in Table Editor → meal_plans
- [ ] Meal plan persists after refresh
- [ ] Can generate new meal plan
- [ ] Old plan is replaced correctly
- [ ] Can save meal plan to saved plans
- [ ] Saved plan visible in Table Editor with is_saved=true
- [ ] Can load saved plan
- [ ] Can delete saved plan

### 13. Preferences Tests
- [ ] Can like a meal
- [ ] Like saves to database → meal_preferences
- [ ] Can dislike a meal
- [ ] Dislike saves to database
- [ ] Can remove preference
- [ ] Preference removed from database
- [ ] Preferences persist after refresh

### 14. Scheduling Tests
- [ ] Can schedule a day to calendar
- [ ] Scheduled day saves to database → scheduled_days
- [ ] Scheduled day persists after refresh
- [ ] Can mark day as complete
- [ ] Completion saves to database → day_progress
- [ ] Can unschedule a day
- [ ] Day removed from database

### 15. Shopping List Tests
- [ ] Shopping list generates for meal plan
- [ ] Can mark items as owned
- [ ] Changes save to database → shopping_lists
- [ ] Changes persist after refresh

### 16. Meal Prep Tests
- [ ] Can generate meal prep plan
- [ ] Prep plan saves to database → meal_prep_plans
- [ ] Prep plan persists after refresh

### 17. Settings Tests
- [ ] Can change language
- [ ] Language preference saves to database → user_settings
- [ ] Language persists after refresh
- [ ] First success dialog shows once
- [ ] Flag saves to database

### 18. Badges Tests
- [ ] Completing all days in a month earns badge
- [ ] Badge saves to database → badges
- [ ] Badge persists after refresh
- [ ] Badge visible in progress dialog

---

## Security Validation

### 19. Row Level Security Tests
- [ ] Create User A and add data
- [ ] Note User A's data in tables
- [ ] Sign out
- [ ] Create User B
- [ ] User B cannot see User A's data
- [ ] User B can only see their own data
- [ ] Try to access User A's profile directly (should fail)
- [ ] Check database logs for policy violations (should be none)

### 20. Delete Account Tests
- [ ] Create test user
- [ ] Add various data (profile, plans, preferences, etc.)
- [ ] Verify data in database
- [ ] Delete account
- [ ] Verify all user data removed from database:
  - [ ] profiles table
  - [ ] meal_plans table
  - [ ] meal_preferences table
  - [ ] portion_adjustments table
  - [ ] scheduled_days table
  - [ ] day_progress table
  - [ ] badges table
  - [ ] shopping_lists table
  - [ ] meal_prep_plans table
  - [ ] user_settings table
- [ ] User removed from auth.users (or marked as deleted)

---

## Performance Validation

### 21. Load Tests
- [ ] Initial load time acceptable (< 3s)
- [ ] Data loads within 1s after authentication
- [ ] No unnecessary re-renders
- [ ] No duplicate API calls
- [ ] Loading states display correctly

### 22. Network Tests
- [ ] Open Network tab in browser DevTools
- [ ] Sign in and use app
- [ ] All Supabase API calls return 200 OK
- [ ] No 401 Unauthorized errors
- [ ] No 403 Forbidden errors
- [ ] No 500 Server errors

### 23. Error Handling Tests
- [ ] Disconnect internet
- [ ] Try to save data
- [ ] Appropriate error message displayed
- [ ] Reconnect internet
- [ ] Retry operation succeeds
- [ ] Turn off Supabase project (pause in dashboard)
- [ ] App shows connection error
- [ ] Turn on Supabase project
- [ ] App reconnects automatically

---

## Production Checklist

### 24. Environment Variables
- [ ] Production `.env` file created
- [ ] Production Supabase URL set
- [ ] Production Supabase anon key set
- [ ] `.env` file NOT committed to git
- [ ] `.env.example` exists as template

### 25. Database Backups
- [ ] Navigate to Database → Backups in Supabase
- [ ] Enable daily backups
- [ ] Test backup restoration

### 26. Monitoring
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Configure Supabase webhooks for critical events
- [ ] Set up uptime monitoring
- [ ] Configure usage alerts in Supabase

### 27. Documentation
- [ ] README updated with Supabase setup instructions
- [ ] Environment variables documented
- [ ] Deployment process documented
- [ ] Troubleshooting guide available

### 28. Git & Version Control
- [ ] All new files added to git
- [ ] All modified files committed
- [ ] Commit message clear and descriptive
- [ ] Code pushed to remote repository
- [ ] PR created (if using PRs)
- [ ] Code reviewed (if required)

---

## Post-Deployment Validation

### 29. Production Tests
- [ ] Deployed app loads successfully
- [ ] Can create new account in production
- [ ] User data saves to production database
- [ ] RLS policies working in production
- [ ] No console errors in production
- [ ] No network errors in production

### 30. User Acceptance
- [ ] Test with real users
- [ ] Gather feedback
- [ ] Monitor for errors
- [ ] Check Supabase logs regularly
- [ ] Review usage metrics

---

## Rollback Plan (If Needed)

### 31. Emergency Rollback
If issues occur after deployment:
- [ ] Revert git commits
- [ ] Restore previous app version
- [ ] (Optional) Restore database from backup
- [ ] Investigate issues
- [ ] Fix and redeploy

---

## Sign-Off

### Deployment Sign-Off
- [ ] All pre-deployment checks passed
- [ ] All deployment steps completed
- [ ] All validation tests passed
- [ ] Security verified
- [ ] Performance acceptable
- [ ] Production environment configured
- [ ] Monitoring active
- [ ] Documentation complete

**Deployment Date**: _____________

**Deployed By**: _____________

**Approved By**: _____________

---

## Notes

Use this space to record any issues, workarounds, or special configurations:

```
[Add your notes here]
```

---

## Support Contacts

**Supabase Support**: https://supabase.com/support
**Supabase Discord**: https://discord.supabase.com
**Project Repository**: [Add GitHub URL]
**Team Lead**: [Add contact]

---

## ✅ Completion Status

- [ ] All checkboxes above are checked
- [ ] Integration is production-ready
- [ ] Team is informed
- [ ] Users can access the application

---

**Once all items are checked, the Supabase integration is complete!** 🎉
