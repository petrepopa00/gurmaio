# Gurmaio - Comprehensive Functionality Testing Guide

## Overview
This document provides a comprehensive testing guide for all features and functionalities of the Gurmaio meal planning application.

## Test Status Legend
- ✅ **Automated Test Created**: Unit/integration test exists
- 🧪 **Manual Test Required**: Requires manual verification
- 📝 **Test Scenario Documented**: Test steps documented below

---

## 1. Authentication & User Management

### 1.1 User Login
🧪 **Manual Test**
- **Steps**:
  1. Navigate to the app homepage
  2. Click "Login" button
  3. Verify redirect to Spark authentication
  4. Complete authentication
  5. Verify redirect back to app with user session active
- **Expected**: User avatar and username displayed in header

### 1.2 OAuth Providers
🧪 **Manual Test**
- **Providers to Test**: Google, Apple, Facebook, Twitter
- **Steps for each**:
  1. Click provider-specific button
  2. Complete OAuth flow
  3. Verify successful login
- **Expected**: User logged in with provider credentials

### 1.3 Demo Mode
🧪 **Manual Test**
- **Steps**:
  1. Click "Try Demo Mode"
  2. Complete onboarding
  3. Generate meal plan
  4. Verify demo mode banner visible
  5. Attempt to save plan (should prompt to create account)
  6. Refresh page
  7. Verify data is lost
- **Expected**: Demo mode works without persistence

### 1.4 Account Creation
🧪 **Manual Test**
- **Steps**:
  1. Click "Create Account"
  2. Review account creation options
  3. Choose authentication method
  4. Complete registration
- **Expected**: New account created successfully

### 1.5 Logout
🧪 **Manual Test**
- **Steps**:
  1. Login to account
  2. Click profile dropdown
  3. Click "Logout"
  4. Verify confirmation message
  5. Verify redirect to logged-out state
- **Expected**: User logged out, data cleared

### 1.6 Account Deletion
🧪 **Manual Test**
- **Steps**:
  1. Open profile dropdown
  2. Click "Delete Account"
  3. Review deletion confirmation dialog
  4. Confirm deletion
  5. Verify all data deleted
  6. Verify logout and redirect
- **Expected**: Account and all data permanently deleted

---

## 2. User Profile & Onboarding

### 2.1 Initial Onboarding
🧪 **Manual Test**
- **Steps**:
  1. As new user, trigger onboarding
  2. Step 1: Enter budget (EUR amount and period: daily/weekly)
  3. Step 2: Select dietary preferences (Vegetarian, Vegan, Pescatarian, etc.)
  4. Step 3: Select allergens (or "None")
  5. Step 4: Select cuisine preferences
  6. Step 5: Enter excluded ingredients (optional)
  7. Step 6: Select meal plan duration (3-14 days)
  8. Step 7: Select meals per day (2-5)
  9. Review and submit
- **Expected**: Profile saved, meal plan generation starts automatically

### 2.2 Profile Editing
🧪 **Manual Test**
- **Steps**:
  1. With existing profile, click "Edit Profile"
  2. Modify any profile field
  3. Save changes
  4. Verify prompt to regenerate meal plan
- **Expected**: Profile updated, meal plan regenerated with new parameters

### 2.3 Calorie Target Calculation (Advanced)
🧪 **Manual Test**
- **Steps**:
  1. In onboarding/profile, enter:
     - Weight (kg)
     - Height (cm)
     - Age
     - Sex
     - Activity level
     - Objective (lose weight, maintain, gain muscle)
  2. Verify calorie target calculated automatically
  3. Adjust macro targets (protein%, carbs%, fats%)
- **Expected**: Accurate calorie and macro calculations

---

## 3. Meal Plan Generation

### 3.1 Basic Generation
✅ **Automated Test Created**
🧪 **Manual Test**
- **Steps**:
  1. Complete profile/onboarding
  2. Click "Generate Meal Plan"
  3. Wait for generation (loading animation)
  4. Verify meal plan displayed with correct number of days
  5. Verify each day has correct number of meals
- **Expected**: Meal plan generated matching profile parameters

### 3.2 Dietary Preferences
✅ **Automated Test Created**
🧪 **Manual Test**
- **Test Cases**:
  - Vegetarian: No meat/fish
  - Vegan: No animal products
  - Pescatarian: Fish but no meat
  - Gluten-Free: No gluten-containing ingredients
  - Dairy-Free: No dairy products
  - Keto: High fat, low carb
- **Expected**: All meals respect dietary restrictions

### 3.3 Budget Constraints
✅ **Automated Test Created**
🧪 **Manual Test**
- **Steps**:
  1. Set tight budget (e.g., €30/week)
  2. Generate meal plan
  3. Check budget gauge
  4. Verify total cost vs budget
- **Expected**: Plan attempts to stay within budget, flags if over

### 3.4 Allergen Exclusion
🧪 **Manual Test**
- **Steps**:
  1. Select allergens (e.g., nuts, eggs, shellfish)
  2. Generate meal plan
  3. Review all meals and ingredients
  4. Verify no allergens present
- **Expected**: No meals contain selected allergens

### 3.5 Cuisine Preferences
🧪 **Manual Test**
- **Steps**:
  1. Select specific cuisines (e.g., Italian, Asian)
  2. Generate meal plan
  3. Verify meal recipes match selected cuisines
- **Expected**: Meals primarily from selected cuisines

### 3.6 Excluded Ingredients
🧪 **Manual Test**
- **Steps**:
  1. Add ingredients to exclude list
  2. Generate meal plan
  3. Verify excluded ingredients not in any meal
- **Expected**: Specified ingredients never appear

### 3.7 Regeneration
🧪 **Manual Test**
- **Steps**:
  1. With existing meal plan, click "New Plan"
  2. Verify warning/confirmation
  3. Confirm regeneration
  4. Verify completely new plan generated
- **Expected**: Brand new meal plan with different recipes

---

## 4. Meal Plan Interaction

### 4.1 Meal Details Viewing
🧪 **Manual Test**
- **Steps**:
  1. View generated meal plan
  2. For each meal, verify visible:
     - Recipe name
     - Meal image
     - Meal type (breakfast/lunch/dinner/snack)
     - Calories
     - Protein, carbs, fats
     - Cost
     - Ingredients list with quantities
     - Cooking instructions
- **Expected**: All details displayed clearly

### 4.2 Meal Swapping
🧪 **Manual Test**
- **Steps**:
  1. Click swap button on any meal
  2. Wait for generation
  3. Verify new meal appears
  4. Verify day totals updated
  5. Verify plan totals updated
  6. Verify budget gauge updated
- **Expected**: Meal replaced, all calculations accurate

### 4.3 Meal Liking
🧪 **Manual Test**
- **Steps**:
  1. Click thumbs up on meal
  2. Verify visual feedback (filled icon)
  3. Verify toast notification
  4. Click again to unlike
  5. Verify icon returns to unfilled
- **Expected**: Like status toggles, saved to preferences

### 4.4 Meal Disliking
🧪 **Manual Test**
- **Steps**:
  1. Click thumbs down on meal
  2. Verify visual feedback
  3. Verify toast notification about avoiding similar meals
  4. Click again to remove dislike
- **Expected**: Dislike status toggles, saved to preferences

### 4.5 Portion Adjustment
🧪 **Manual Test**
- **Steps**:
  1. Use portion selector (0.5x, 1x, 1.5x, 2x)
  2. Select different multiplier
  3. Verify nutrition values update proportionally
  4. Verify cost updates proportionally
  5. Verify day totals update
  6. Verify plan totals update
- **Expected**: All values scale correctly with portion size

---

## 5. Shopping List

### 5.1 Generation
✅ **Automated Test Created**
🧪 **Manual Test**
- **Steps**:
  1. Generate meal plan
  2. Click "Shopping List"
  3. Verify sheet/panel opens
  4. Verify all ingredients listed
  5. Verify ingredients grouped by category
  6. Verify quantities and units shown
  7. Verify total cost calculated
- **Expected**: Complete shopping list with all meal plan ingredients

### 5.2 Item Management
🧪 **Manual Test**
- **Steps**:
  1. Check checkbox to mark item as owned
  2. Verify item styled as owned (strikethrough/faded)
  3. Uncheck to mark as not owned
  4. Click delete/remove button
  5. Verify item removed from list
- **Expected**: Items can be marked owned/deleted, visual feedback clear

### 5.3 Export to PDF
🧪 **Manual Test**
- **Steps**:
  1. Click "Export PDF" in shopping list
  2. Verify PDF downloads
  3. Open PDF
  4. Verify all items present
  5. Verify formatting readable
- **Expected**: PDF generated with complete shopping list

### 5.4 Sharing
🧪 **Manual Test**
- **Steps**:
  1. Click share button on shopping list
  2. Verify share options (copy link, copy text)
  3. Test each share method
  4. Verify shared content accurate
- **Expected**: Shopping list shareable via multiple methods

---

## 6. Meal Prep Planning

### 6.1 Generation
🧪 **Manual Test**
- **Steps**:
  1. Generate meal plan
  2. Go to "Meal Prep" tab
  3. Click "Generate Meal Prep Plan"
  4. Wait for generation
  5. Verify prep schedule created
- **Expected**: Meal prep plan generated with batch cooking groups

### 6.2 Prep Schedule
🧪 **Manual Test**
- **Steps**:
  1. Review prep schedule
  2. Verify days organized
  3. Verify tasks listed per day
  4. Verify time estimates shown
  5. Verify tips provided
- **Expected**: Clear prep schedule with actionable tasks

### 6.3 Batch Cooking Groups
🧪 **Manual Test**
- **Steps**:
  1. Review batch cooking groups
  2. Verify similar meals grouped together
  3. Verify servings calculated
  4. Verify shared ingredients shown
  5. Verify storage instructions present
  6. Verify reheating instructions present
  7. Verify efficiency savings calculated
- **Expected**: Intelligent grouping with time/cost savings

---

## 7. Calendar & Scheduling

### 7.1 Day Scheduling
🧪 **Manual Test**
- **Steps**:
  1. Go to "Track Progress" tab
  2. Select a day from meal plan
  3. Click "Schedule" button
  4. Pick calendar date
  5. Confirm scheduling
  6. Verify day appears on calendar
- **Expected**: Day scheduled to specific date

### 7.2 Date Conflict Prevention
🧪 **Manual Test**
- **Steps**:
  1. Schedule day to date A
  2. Try to schedule another day to date A
  3. Verify error message
- **Expected**: Prevents double-booking dates

### 7.3 Rescheduling
🧪 **Manual Test**
- **Steps**:
  1. Schedule day to date A
  2. Click "Change Date"
  3. Select new date B
  4. Confirm
  5. Verify day moved to date B
- **Expected**: Day successfully rescheduled

### 7.4 Unscheduling
🧪 **Manual Test**
- **Steps**:
  1. Schedule day to calendar
  2. Click "Unschedule" or remove button
  3. Confirm
  4. Verify day removed from calendar
- **Expected**: Day removed from calendar, returns to unscheduled pool

### 7.5 Completion Marking
🧪 **Manual Test**
- **Steps**:
  1. Schedule day to today or past date
  2. Click "Mark as Complete" checkbox
  3. Verify visual feedback (checkmark, color change)
  4. Verify toast notification
  5. Verify progress tracking updated
- **Expected**: Day marked complete, progress tracked

### 7.6 Week Copying
🧪 **Manual Test**
- **Steps**:
  1. Schedule 7 consecutive days (a week)
  2. Click "Copy Week"
  3. Select target start date
  4. Confirm
  5. Verify entire week duplicated to new dates
- **Expected**: Week schedule duplicated to new range

---

## 8. Progress Tracking & Streaks

### 8.1 Streak Calculation
✅ **Automated Test Created**
🧪 **Manual Test**
- **Steps**:
  1. Mark day as complete (today or yesterday)
  2. Verify streak counter shows 1
  3. Mark consecutive days as complete
  4. Verify streak increments
  5. Skip a day
  6. Verify streak resets
- **Expected**: Accurate streak calculation

### 8.2 Streak Display
🧪 **Manual Test**
- **Steps**:
  1. Build a streak
  2. Verify streak badge/counter visible
  3. Verify current streak number shown
  4. Verify longest streak shown
  5. Verify "flame" or streak icon shown
- **Expected**: Clear visual streak indicator

### 8.3 Monthly Progress
🧪 **Manual Test**
- **Steps**:
  1. Complete multiple days in a month
  2. Open progress dialog
  3. Verify monthly completion percentage
  4. Verify completed dates highlighted
  5. Verify nutrition totals for month
  6. Verify cost totals for month
- **Expected**: Accurate monthly statistics

### 8.4 Badge Awards
🧪 **Manual Test**
- **Steps**:
  1. Complete all days in a month (31/31 or 30/30)
  2. Verify badge earned notification
  3. Open progress dialog
  4. Verify badge displayed with month/year
  5. Verify badge image generated
- **Expected**: Badge awarded for 100% month completion

### 8.5 Progress History
🧪 **Manual Test**
- **Steps**:
  1. Open progress dialog
  2. Review all completed days
  3. Verify nutrition and cost totals
  4. Verify badges earned
  5. Navigate between months
- **Expected**: Complete progress history accessible

---

## 9. Saved Plans Management

### 9.1 Saving Plans
🧪 **Manual Test**
- **Steps**:
  1. Generate meal plan
  2. Click "Save" button
  3. Verify toast notification
  4. Verify checkmark or "Saved" indicator
  5. Click save again (should update, not duplicate)
- **Expected**: Plan saved successfully

### 9.2 Save Limit
🧪 **Manual Test**
- **Steps**:
  1. Save 5 meal plans
  2. Generate 6th plan
  3. Try to save 6th plan
  4. Verify error message about limit
  5. Delete one saved plan
  6. Try saving 6th plan again
- **Expected**: Maximum 5 saved plans enforced

### 9.3 Loading Saved Plans
🧪 **Manual Test**
- **Steps**:
  1. Open profile dropdown
  2. Click "Saved Meal Plans"
  3. Verify all saved plans listed
  4. Click "Load" on a plan
  5. Verify plan loaded as current plan
  6. Verify all details match original
- **Expected**: Saved plan loaded successfully

### 9.4 Deleting Saved Plans
🧪 **Manual Test**
- **Steps**:
  1. Open saved plans dialog
  2. Click delete button on a plan
  3. Confirm deletion
  4. Verify plan removed from list
  5. Verify count updated
- **Expected**: Plan deleted permanently

### 9.5 Sharing Saved Plans
🧪 **Manual Test**
- **Steps**:
  1. Open saved plans dialog
  2. Click share button on a plan
  3. Verify share dialog opens with plan details
  4. Test share methods
- **Expected**: Saved plan shareable

---

## 10. Meal Preferences Management

### 10.1 Viewing Preferences
🧪 **Manual Test**
- **Steps**:
  1. Like/dislike several meals
  2. Open profile dropdown
  3. Click "Meal Preferences"
  4. Verify all liked meals shown
  5. Verify all disliked meals shown
  6. Verify meal details (name, type, ingredients)
- **Expected**: Complete preferences list accessible

### 10.2 Removing Individual Preferences
🧪 **Manual Test**
- **Steps**:
  1. Open meal preferences
  2. Click remove button on a preference
  3. Verify preference removed
  4. Verify toast notification
- **Expected**: Single preference removed

### 10.3 Clearing All Preferences
🧪 **Manual Test**
- **Steps**:
  1. Open meal preferences
  2. Click "Clear All Liked" button
  3. Confirm
  4. Verify all likes removed
  5. Repeat for "Clear All Disliked"
  6. Test "Clear All" option
- **Expected**: Batch preference removal works

---

## 11. Multi-language Support

### 11.1 Language Selection
🧪 **Manual Test**
- **Languages**: English, Romanian, German, French, Spanish, Italian, Portuguese, Dutch, Polish, Czech
- **Steps for each**:
  1. Open language dropdown (profile menu)
  2. Select language
  3. Verify page reloads
  4. Verify all UI text translated
- **Expected**: Complete UI translation

### 11.2 Meal Plan Translation
🧪 **Manual Test**
- **Steps**:
  1. Generate meal plan in English
  2. Switch to another language
  3. Wait for translation loading indicator
  4. Verify meal names translated
  5. Verify ingredient names translated
  6. Verify cooking instructions translated
- **Expected**: Meal plan content translated via AI

### 11.3 Translation Persistence
🧪 **Manual Test**
- **Steps**:
  1. Select non-English language
  2. Refresh page
  3. Verify language persists
  4. Verify translated content shown immediately
- **Expected**: Language preference persists across sessions

### 11.4 Translation Quality
🧪 **Manual Test**
- **Steps**:
  1. For each supported language:
  2. Review all UI elements
  3. Verify natural, correct translations
  4. Check for untranslated strings
  5. Verify number/date formatting correct for locale
- **Expected**: High-quality, complete translations

---

## 12. Email Verification

### 12.1 Verification Prompt
🧪 **Manual Test**
- **Steps**:
  1. Create account without email
  2. Login without verified email
  3. Verify banner shown at top
  4. Verify dialog appears after 2 seconds
  5. Click "Verify Now"
- **Expected**: Verification prompts appear

### 12.2 Verification Process
🧪 **Manual Test**
- **Steps**:
  1. Open email verification dialog
  2. Enter email address (if needed)
  3. Click "Send Verification"
  4. Check email for verification code
  5. Enter code in app
  6. Verify success message
  7. Verify banner disappears
- **Expected**: Email verification completes

### 12.3 Feature Locking
🧪 **Manual Test**
- **Features locked before verification**:
  - Saving meal plans
  - Scheduling days to calendar
  - Marking days as complete
  - Copying weeks
- **Steps**:
  1. Without verification, try each locked feature
  2. Verify prompt to verify email
  3. Complete verification
  4. Verify features unlock
- **Expected**: Features properly gated by verification status

### 12.4 Skip Verification
🧪 **Manual Test**
- **Steps**:
  1. Open verification dialog
  2. Click "Skip for Now"
  3. Verify dialog closes
  4. Verify banner remains
  5. Verify locked features still locked
- **Expected**: Verification skippable but features remain locked

---

## 13. Export & Sharing

### 13.1 PDF Export
🧪 **Manual Test**
- **Steps**:
  1. With meal plan, click "PDF" button
  2. Verify PDF downloads
  3. Open PDF
  4. Verify includes:
     - All days and meals
     - Nutrition information
     - Cost information
     - Ingredients
     - Cooking instructions
  5. Verify formatting professional
- **Expected**: Complete, well-formatted PDF

### 13.2 Meal Plan Sharing
🧪 **Manual Test**
- **Steps**:
  1. Click "Share" button on meal plan
  2. Verify share dialog opens
  3. Test "Copy Link" option
  4. Test "Copy as Text" option
  5. Paste shared content
  6. Verify content accurate and readable
- **Expected**: Multiple share methods work

### 13.3 Social Media Sharing
🧪 **Manual Test**
- **Steps**:
  1. Open share dialog
  2. If social media buttons present, test:
     - WhatsApp share
     - Facebook share
     - Twitter share
     - Email share
  3. Verify content formatted for each platform
- **Expected**: Platform-specific sharing works

---

## 14. Budget Management

### 14.1 Budget Gauge Display
🧪 **Manual Test**
- **Steps**:
  1. Generate meal plan
  2. Locate budget gauge
  3. Verify shows:
     - Budget amount
     - Spent amount
     - Remaining amount
     - Percentage used
  4. Verify color coding (green/yellow/red)
- **Expected**: Clear budget visualization

### 14.2 Over Budget Warning
🧪 **Manual Test**
- **Steps**:
  1. Set low budget
  2. Generate meal plan that exceeds budget
  3. Verify warning indicator
  4. Verify budget gauge shows red/over budget state
- **Expected**: Clear over-budget warning

### 14.3 Budget Period Conversion
🧪 **Manual Test**
- **Steps**:
  1. Set weekly budget of €70
  2. Generate 7-day plan
  3. Verify daily budget shown as €10/day
  4. Set daily budget of €15
  5. Generate 7-day plan
  6. Verify weekly budget shown as €105/week
- **Expected**: Accurate budget period conversions

---

## 15. Nutrition Tracking

### 15.1 Daily Nutrition Totals
🧪 **Manual Test**
- **Steps**:
  1. Generate meal plan
  2. For each day, verify totals shown:
     - Total calories
     - Total protein (g)
     - Total carbs (g)
     - Total fats (g)
  3. Manually sum meals, verify accuracy
- **Expected**: Accurate daily nutrition totals

### 15.2 Plan Nutrition Totals
🧪 **Manual Test**
- **Steps**:
  1. Review meal plan totals section
  2. Verify shows plan-wide totals
  3. Verify shows average per day
  4. Verify macro distribution percentages
- **Expected**: Accurate plan-level nutrition tracking

### 15.3 Nutrition Targets
🧪 **Manual Test**
- **Steps**:
  1. Set calorie target in profile
  2. Generate meal plan
  3. Verify meals approach target
  4. Set macro targets (protein%, carbs%, fats%)
  5. Regenerate plan
  6. Verify macros approach targets
- **Expected**: Meals generated matching nutrition targets

---

## 16. Error Handling & Edge Cases

### 16.1 Generation Failures
🧪 **Manual Test**
- **Steps**:
  1. Test with conflicting constraints (very low budget + multiple restrictions)
  2. Verify graceful error handling
  3. Verify helpful error messages
  4. Verify app remains functional
- **Expected**: Errors handled gracefully

### 16.2 Network Errors
🧪 **Manual Test**
- **Steps**:
  1. Disconnect network
  2. Attempt to generate meal plan
  3. Verify timeout or error message
  4. Reconnect network
  5. Retry operation
- **Expected**: Network errors handled, retries work

### 16.3 Invalid Input Handling
🧪 **Manual Test**
- **Steps**:
  1. Try entering invalid budget (negative, zero)
  2. Try invalid duration (0 days, 100 days)
  3. Try invalid meals per day (0, 20)
  4. Verify validation messages
  5. Verify cannot proceed with invalid input
- **Expected**: Input validation prevents errors

### 16.4 Data Persistence Failures
🧪 **Manual Test**
- **Steps**:
  1. Fill quota for KV storage
  2. Attempt to save data
  3. Verify error message
  4. Clear some data
  5. Retry save
- **Expected**: Storage errors handled gracefully

---

## 17. Responsive Design & Mobile

### 17.1 Mobile Layout
🧪 **Manual Test**
- **Devices**: Phone (< 768px), Tablet (768-1024px), Desktop (> 1024px)
- **Steps for each**:
  1. Open app on device/resize browser
  2. Verify layout adapts
  3. Verify navigation accessible
  4. Verify all features usable
  5. Verify text readable (not too small)
  6. Verify buttons tappable (not too small)
- **Expected**: Fully responsive, usable on all devices

### 17.2 Touch Interactions
🧪 **Manual Test on Mobile**
- **Steps**:
  1. Test all buttons tappable
  2. Test dropdowns/selects work
  3. Test swipe gestures (if any)
  4. Test scrolling smooth
  5. Test modals/dialogs fit screen
- **Expected**: Touch-friendly on mobile

### 17.3 Mobile Performance
🧪 **Manual Test on Mobile**
- **Steps**:
  1. Generate meal plan on mobile
  2. Verify reasonable load time
  3. Scroll through plan, verify smooth
  4. Open/close dialogs, verify responsive
- **Expected**: Good performance on mobile devices

---

## 18. Performance & Loading States

### 18.1 Loading Indicators
🧪 **Manual Test**
- **Steps**:
  1. Trigger meal plan generation
  2. Verify loading animation shown
  3. Verify progress indication
  4. Verify descriptive loading text
  5. Trigger meal swap
  6. Verify loading state on specific meal
- **Expected**: Clear loading feedback for all async operations

### 18.2 Skeleton Screens
🧪 **Manual Test**
- **Steps**:
  1. Refresh page
  2. Observe initial load
  3. Verify skeleton/placeholder UI shown
  4. Verify smooth transition to actual content
- **Expected**: Skeleton screens prevent layout shift

### 18.3 Optimistic Updates
🧪 **Manual Test**
- **Steps**:
  1. Mark shopping list item as owned
  2. Verify immediate visual update
  3. Like a meal
  4. Verify immediate visual feedback
- **Expected**: UI updates optimistically, then confirms

---

## 19. Accessibility

### 19.1 Keyboard Navigation
🧪 **Manual Test**
- **Steps**:
  1. Use only keyboard (Tab, Enter, Space, Arrows)
  2. Navigate through entire app
  3. Verify all interactive elements reachable
  4. Verify focus visible
  5. Verify Enter/Space activate buttons
  6. Verify Escape closes modals
- **Expected**: Fully keyboard accessible

### 19.2 Screen Reader Support
🧪 **Manual Test with Screen Reader**
- **Steps**:
  1. Enable screen reader (NVDA, JAWS, VoiceOver)
  2. Navigate app
  3. Verify all elements announced
  4. Verify buttons have labels
  5. Verify form fields have labels
  6. Verify headings create outline
- **Expected**: Screen reader friendly

### 19.3 Color Contrast
🧪 **Manual Test**
- **Steps**:
  1. Use browser DevTools contrast checker
  2. Verify all text meets WCAG AA (4.5:1 for normal, 3:1 for large)
  3. Verify buttons/links distinguishable
  4. Test in high contrast mode
- **Expected**: WCAG AA compliant contrast ratios

### 19.4 Font Sizing & Zoom
🧪 **Manual Test**
- **Steps**:
  1. Zoom browser to 200%
  2. Verify layout doesn't break
  3. Verify text remains readable
  4. Verify no horizontal scrolling needed
  5. Increase browser base font size
  6. Verify app respects size
- **Expected**: Usable at 200% zoom and large font sizes

---

## 20. Legal & Compliance

### 20.1 Privacy Policy
🧪 **Manual Test**
- **Steps**:
  1. Locate privacy policy link (footer)
  2. Click to open
  3. Verify policy displays
  4. Verify covers:
     - Data collected
     - How data used
     - Data storage
     - User rights
     - GDPR compliance
- **Expected**: Comprehensive privacy policy accessible

### 20.2 Terms of Service
🧪 **Manual Test**
- **Steps**:
  1. Locate terms of service link
  2. Review terms
  3. Verify covers:
     - Service description
     - User obligations
     - Limitations
     - Dispute resolution
- **Expected**: Clear terms of service

### 20.3 AI Disclaimer
🧪 **Manual Test**
- **Steps**:
  1. Generate meal plan
  2. Verify AI disclaimer visible
  3. Verify states content AI-generated
  4. Verify warns to verify information
  5. Verify recommends consulting professionals
- **Expected**: Clear AI-generated content disclaimer

### 20.4 Data Deletion (GDPR)
🧪 **Manual Test**
- **Steps**:
  1. Delete account
  2. Verify confirmation shows what will be deleted
  3. Verify mentions GDPR Article 17
  4. Confirm deletion
  5. Verify all data removed
  6. Attempt to log back in
  7. Verify account gone
- **Expected**: GDPR-compliant data deletion

---

## 21. Integration Tests

### 21.1 End-to-End User Journey
🧪 **Manual Test**
- **Complete User Flow**:
  1. Open app as new user
  2. Create account
  3. Complete onboarding
  4. Generate first meal plan
  5. Like/dislike some meals
  6. Swap a meal
  7. Adjust portions
  8. View shopping list
  9. Mark items as owned
  10. Generate meal prep plan
  11. Schedule days to calendar
  12. Mark day as complete
  13. Build a streak
  14. Save meal plan
  15. Generate new plan
  16. Load saved plan
  17. Export to PDF
  18. Share plan
  19. Change language
  20. Edit profile
  21. Review progress
  22. Logout
- **Expected**: Entire flow works seamlessly

---

## 22. Browser Compatibility

### 22.1 Modern Browsers
🧪 **Manual Test**
- **Browsers to Test**:
  - Chrome (latest)
  - Firefox (latest)
  - Safari (latest)
  - Edge (latest)
- **Steps for each**:
  1. Open app
  2. Complete key user flows
  3. Verify all features work
  4. Verify visual consistency
- **Expected**: Works in all modern browsers

### 22.2 Browser Features
🧪 **Manual Test**
- **Features to Test**:
  - Clipboard API (copy/paste)
  - File download (PDF export)
  - LocalStorage/IndexedDB (KV)
  - Fetch API (data loading)
- **Expected**: Browser APIs work correctly

---

## Test Execution Summary

### Automated Tests
- ✅ Unit tests created for:
  - Meal plan generation
  - Nutrition calculations
  - Budget calculations
  - Streak calculator
  - Shopping list generation

### Manual Tests Required
- 🧪 All functional features require manual testing
- 🧪 UI/UX interactions
- 🧪 Cross-browser compatibility
- 🧪 Responsive design
- 🧪 Accessibility
- 🧪 Integration flows

### Running Automated Tests
```bash
npm test
```

### Test Coverage Goals
- Unit tests: Core business logic
- Integration tests: Component interactions
- E2E tests: Critical user journeys
- Manual tests: UI/UX, accessibility, compliance

---

## Known Issues & Limitations
*(To be filled based on test results)*

---

## Test Reporting
- Document all bugs found during testing
- Track test execution status
- Measure test coverage
- Report to stakeholders

---

**Last Updated**: 2024
**Test Plan Version**: 1.0
**App Version**: Current (45+ iterations)
