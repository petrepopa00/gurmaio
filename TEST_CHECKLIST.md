# Gurmaio - Quick Test Checklist

Use this checklist to quickly verify all major functionality is working.

## 🔐 Authentication & Setup
- [ ] Can create new account
- [ ] Can login with existing account
- [ ] Can use demo mode
- [ ] Can complete onboarding with all options
- [ ] Profile saves successfully

## 📋 Meal Plan Generation
- [ ] Generates plan with correct number of days
- [ ] Generates correct meals per day
- [ ] Respects dietary preferences (test vegetarian/vegan)
- [ ] Excludes allergens
- [ ] Stays near budget (check budget gauge)
- [ ] Shows loading animation during generation
- [ ] Can regenerate new plan

## 🍽️ Meal Interactions
- [ ] Can swap individual meals
- [ ] Can like meals (thumbs up)
- [ ] Can dislike meals (thumbs down)
- [ ] Can adjust portions (0.5x, 1x, 1.5x, 2x)
- [ ] Nutrition/cost updates when portions change
- [ ] All meal details visible (name, image, ingredients, instructions)

## 🛒 Shopping List
- [ ] Opens from meal plan
- [ ] Shows all ingredients
- [ ] Can mark items as owned (checkbox)
- [ ] Can delete items
- [ ] Shows correct totals
- [ ] Can export to PDF

## 👨‍🍳 Meal Prep
- [ ] Can generate prep plan
- [ ] Shows batch cooking groups
- [ ] Shows prep schedule by day
- [ ] Shows time estimates
- [ ] Shows storage/reheating instructions

## 📅 Calendar & Scheduling
- [ ] Can schedule day to specific date
- [ ] Prevents double-booking dates
- [ ] Can reschedule days
- [ ] Can unschedule days
- [ ] Can mark days as complete
- [ ] Can copy entire week to new dates

## 📊 Progress & Streaks
- [ ] Streak counter visible and accurate
- [ ] Marking days complete updates streak
- [ ] Skipping days breaks streak
- [ ] Monthly progress shows correctly
- [ ] Badges awarded for 100% month completion
- [ ] Progress dialog shows all history

## 💾 Saved Plans
- [ ] Can save meal plans
- [ ] Limited to 5 saved plans
- [ ] Can load saved plans
- [ ] Can delete saved plans
- [ ] Can share saved plans

## 👤 Profile & Preferences
- [ ] Can edit profile/preferences
- [ ] Profile changes trigger plan regeneration prompt
- [ ] Can view all liked/disliked meals
- [ ] Can remove individual preferences
- [ ] Can clear all preferences

## 🌍 Multi-language
- [ ] Can change language (test 2-3 languages)
- [ ] UI translates completely
- [ ] Meal plan content translates
- [ ] Language persists after reload

## 📧 Email Verification
- [ ] Verification banner appears for unverified users
- [ ] Verification dialog appears after 2 seconds
- [ ] Can complete verification flow
- [ ] Features locked before verification
- [ ] Features unlock after verification
- [ ] Can skip verification

## 📤 Export & Share
- [ ] PDF export works for meal plan
- [ ] PDF export works for shopping list
- [ ] Share dialog opens
- [ ] Copy link works
- [ ] Copy text works

## 💰 Budget Management
- [ ] Budget gauge displays correctly
- [ ] Shows remaining budget
- [ ] Warns when over budget
- [ ] Daily/weekly conversion accurate

## ⚙️ Account Settings
- [ ] Profile dropdown opens
- [ ] Language switcher works
- [ ] Account settings dialog opens
- [ ] Can view user info
- [ ] Logout works
- [ ] Account deletion works (WARNING: permanent)

## 📱 Responsive Design
- [ ] Works on mobile (phone size)
- [ ] Works on tablet
- [ ] Works on desktop
- [ ] Navigation accessible on all sizes
- [ ] Buttons tappable on mobile

## ♿ Accessibility
- [ ] Can navigate with keyboard (Tab key)
- [ ] Focus visible on all interactive elements
- [ ] Enter/Space activates buttons
- [ ] Escape closes modals
- [ ] Text meets contrast requirements

## 🌐 Browser Compatibility
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

## 🚨 Error Handling
- [ ] Graceful errors for generation failures
- [ ] Network errors handled
- [ ] Invalid input prevented
- [ ] Toast notifications for success/error

## 📄 Legal & Compliance
- [ ] Privacy policy accessible
- [ ] Terms of service accessible
- [ ] AI disclaimer visible
- [ ] GDPR deletion notice present

---

## Critical Path Test (5 minutes)
Quick smoke test to verify app is functional:

1. [ ] Open app → Shows welcome or profile
2. [ ] Create account or login
3. [ ] Complete onboarding (if new user)
4. [ ] Generate meal plan → Shows loading → Shows plan
5. [ ] Click shopping list → Opens with items
6. [ ] Swap one meal → New meal appears
7. [ ] Like one meal → Thumbs up fills in
8. [ ] Save plan → Shows "Saved" confirmation
9. [ ] Change language → UI translates
10. [ ] Logout → Returns to welcome screen

If all 10 steps pass, core functionality is working! ✅

---

## Bug Reporting Template

When you find a bug:

**Title**: Brief description

**Steps to Reproduce**:
1. 
2. 
3. 

**Expected Behavior**: 

**Actual Behavior**: 

**Browser/Device**: 

**Screenshots**: (if applicable)

**Severity**: Critical / High / Medium / Low

---

## Test Session Log

**Date**: ___________
**Tester**: ___________
**Browser**: ___________
**Device**: ___________

**Tests Passed**: ____ / ____
**Tests Failed**: ____
**Bugs Found**: ____
**Notes**:
