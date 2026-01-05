# iOS App Store & Google Play Store Compliance Guide

**Last Updated**: January 2025

## Overview

This document outlines all improvements needed to make Gurmaio compliant with iOS App Store and Google Play Store requirements for publication.

---

## ✅ Already Implemented

### 1. Privacy & Data Protection
- ✅ Comprehensive Privacy Policy (PRIVACY.md)
- ✅ Terms of Service (TERMS.md)
- ✅ Account deletion functionality
- ✅ GDPR Article 17 compliance (Right to Erasure)
- ✅ CCPA compliance
- ✅ Clear data collection disclosure
- ✅ No tracking without consent

### 2. Medical & Health Disclaimers
- ✅ "Not medical advice" disclaimer in Privacy Policy
- ✅ "Not medical advice" disclaimer in Terms of Service
- ✅ Info tooltips with nutrition disclaimers
- ✅ Cost estimate disclaimers
- ✅ AI usage transparency

### 3. User Authentication & Demo Mode
- ✅ GitHub OAuth authentication
- ✅ Social sign-in (Google, Apple, Facebook, Twitter)
- ✅ Guest/demo mode (no login required to try)
- ✅ Email verification flow
- ✅ Session management

### 4. Legal Footer & Accessibility
- ✅ Footer with Privacy, Terms, Support links
- ✅ Account deletion accessible from footer
- ✅ Clear contact information (support email)

---

## 🔄 Enhancements Needed for Store Compliance

### 1. **Age Rating & Content Declaration** ⚠️ CRITICAL

#### iOS App Store Requirements:
- Declare age rating (suggest **4+** or **9+**)
- Specify content type: Health & Fitness / Food & Drink
- No in-app purchases initially
- No advertising

#### Google Play Requirements:
- Content rating questionnaire (IARC)
- Target audience: Everyone or Teen
- Health & Wellness category

**Implementation**: Add age gate for users under 13 (COPPA compliance)

---

### 2. **Metadata & Store Listings** ⚠️ REQUIRED

#### App Name
**Suggestion**: "Gurmaio - Budget Meal Planner"

#### Subtitle (iOS) / Short Description (Android)
**Suggestion**: "AI-powered meal plans within your budget"

#### Description (both stores)
```
Gurmaio helps you plan healthy meals that fit your budget. Generate personalized meal plans based on your dietary preferences, nutrition goals, and weekly budget.

✨ KEY FEATURES:
• Budget-aware meal planning
• Nutrition tracking (calories, protein, carbs, fats)
• Smart shopping lists
• Meal substitutions with AI
• Weekly meal prep schedules
• Calendar tracking & streak counter
• Multi-language support (EN, DE, FR, ES, IT)

🎯 PERFECT FOR:
• Students on tight budgets
• Families meal planning
• Fitness enthusiasts tracking macros
• Anyone wanting to eat healthier for less

⚠️ IMPORTANT DISCLAIMER:
Gurmaio provides meal suggestions for informational purposes only. This is NOT medical, nutritional, or health advice. Always consult healthcare professionals before making significant dietary changes.

All nutrition values and costs are estimates and may vary based on brands, stores, and preparation methods.
```

#### Keywords (iOS)
meal planner, budget meals, meal prep, nutrition tracker, grocery list, shopping list, diet planner, healthy eating, recipe ideas, macro tracker

#### Category
- **Primary**: Health & Fitness
- **Secondary**: Food & Drink

---

### 3. **Screenshot & Preview Requirements** ⚠️ REQUIRED

#### iOS Requirements:
- 6.7" iPhone (1290 x 2796 px) - 3 screenshots minimum
- 12.9" iPad (2048 x 2732 px) - 2 screenshots minimum
- Optional: App preview video (15-30 seconds)

#### Android Requirements:
- Phone screenshots (1080 x 1920 px) - 2 minimum, 8 maximum
- 7" tablet (1024 x 600 px) - optional
- 10" tablet (1920 x 1200 px) - optional
- Feature graphic (1024 x 500 px) - REQUIRED

**Suggested Screenshots**:
1. Welcome screen with demo preview
2. Onboarding profile setup
3. Generated meal plan with nutrition
4. Meal details with ingredients & costs
5. Shopping list view
6. Calendar tracking with badges

---

### 4. **App Icons** ⚠️ REQUIRED

#### iOS Requirements:
- 1024x1024 px PNG (no alpha channel)
- Must fill entire canvas
- No rounded corners (iOS applies them)

#### Android Requirements:
- 512x512 px PNG (32-bit with alpha)
- Adaptive icon (foreground + background layers)

**Design Suggestion**:
- Green color scheme matching app (oklch(0.45 0.12 155))
- Icon showing fork/spoon crossed with currency symbol
- Or: Shopping cart with nutrition icons

---

### 5. **In-App Purchases & Subscriptions** (Future)

Currently free tier only. For future premium features:

#### iOS Requirements:
- Use StoreKit framework
- Restore purchases functionality
- Clear pricing display
- Subscription management link

#### Android Requirements:
- Google Play Billing Library
- Subscription cancellation in-app
- Clear refund policy

**Suggested Premium Tiers**:
- **Free**: 5 saved plans, basic features
- **Pro** ($4.99/month): Unlimited saves, advanced filters, priority AI
- **Family** ($9.99/month): 5 accounts, shared meal plans

---

### 6. **Push Notifications** (Optional)

If implementing push notifications:

#### iOS Requirements:
- Request permission with clear explanation
- Allow opt-out at any time
- Privacy manifest for notification content

#### Android Requirements:
- Notification channels
- Opt-in/opt-out controls
- Clear purpose statement

**Suggested Use Cases**:
- Meal prep reminders (Sunday prep day)
- Shopping list reminders
- Streak milestones (7 days, 30 days)

---

### 7. **Privacy Manifest (iOS 17+)** ⚠️ CRITICAL

Create `PrivacyInfo.xcprivacy` file declaring:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN">
<plist version="1.0">
<dict>
    <key>NSPrivacyTracking</key>
    <false/>
    <key>NSPrivacyTrackingDomains</key>
    <array/>
    <key>NSPrivacyCollectedDataTypes</key>
    <array>
        <dict>
            <key>NSPrivacyCollectedDataType</key>
            <string>NSPrivacyCollectedDataTypeEmailAddress</string>
            <key>NSPrivacyCollectedDataTypeLinked</key>
            <true/>
            <key>NSPrivacyCollectedDataTypeTracking</key>
            <false/>
            <key>NSPrivacyCollectedDataTypePurposes</key>
            <array>
                <string>NSPrivacyCollectedDataTypePurposeAppFunctionality</string>
            </array>
        </dict>
        <dict>
            <key>NSPrivacyCollectedDataType</key>
            <string>NSPrivacyCollectedDataTypeHealthData</string>
            <key>NSPrivacyCollectedDataTypeLinked</key>
            <true/>
            <key>NSPrivacyCollectedDataTypeTracking</key>
            <false/>
            <key>NSPrivacyCollectedDataTypePurposes</key>
            <array>
                <string>NSPrivacyCollectedDataTypePurposeAppFunctionality</string>
            </array>
        </dict>
    </array>
    <key>NSPrivacyAccessedAPITypes</key>
    <array>
        <dict>
            <key>NSPrivacyAccessedAPIType</key>
            <string>NSPrivacyAccessedAPICategoryUserDefaults</string>
            <key>NSPrivacyAccessedAPITypeReasons</key>
            <array>
                <string>CA92.1</string>
            </array>
        </dict>
    </array>
</dict>
</plist>
```

---

### 8. **Data Safety Section (Google Play)** ⚠️ REQUIRED

Must declare:
- **Data collected**: Email, name, dietary preferences, health data (optional)
- **Data shared**: With OpenAI for meal generation (anonymized)
- **Security practices**: Data encrypted in transit, data encrypted at rest
- **Account deletion**: Available via in-app option

---

### 9. **Accessibility Compliance**

#### WCAG 2.1 AA Requirements:
- ✅ Color contrast ratios (already compliant in PRD)
- ✅ Text resizing support
- ⚠️ Screen reader labels (needs improvement)
- ⚠️ Keyboard navigation (web version)
- ⚠️ Focus indicators (needs improvement)

**Improvements Needed**:
- Add `aria-label` to all icon buttons
- Add `role` attributes for custom components
- Test with VoiceOver (iOS) and TalkBack (Android)
- Ensure all interactive elements have 44x44 pt touch targets

---

### 10. **Content Review Preparation**

#### Test Account for Reviewers:
Create a demo account with:
- Pre-populated profile
- Sample meal plan generated
- Saved plans in history
- Shopping list with items
- Calendar with scheduled days

**Login Credentials Document**:
```
Demo Account:
- Option 1: Use guest/demo mode (no login required)
- Option 2: GitHub OAuth test account
  Username: gurmaio-demo
  Email: demo@gurmaio.app
  Note: All features available without login in demo mode
```

---

### 11. **Localization** ⚠️ RECOMMENDED

Currently supports EN, DE, FR, ES, IT. Ensure:
- ✅ All UI strings translated (already implemented)
- ⚠️ Store listing translated for each language
- ⚠️ Screenshots localized (optional but recommended)
- ⚠️ App Store keywords translated

---

### 12. **Support & Contact**

#### Required Information:
- ✅ Support email: support@gurmaio.app (in Privacy Policy)
- ⚠️ Support website: Need landing page
- ⚠️ Privacy policy URL: `https://yourdomain.com/privacy`
- ⚠️ Terms of service URL: `https://yourdomain.com/terms`

**Action Items**:
1. Register domain (e.g., gurmaio.app)
2. Deploy privacy policy as web page
3. Deploy terms of service as web page
4. Create support/FAQ page

---

### 13. **Crash Reporting & Analytics**

#### iOS:
- Xcode Organizer crash reports
- Optional: Firebase Crashlytics

#### Android:
- Google Play Console crash reports
- Optional: Firebase Crashlytics

**Privacy Compliance**:
- Make analytics opt-in (not opt-out)
- Disclose in privacy policy
- Allow disabling in settings

---

### 14. **Rate Limiting & Abuse Prevention**

Implement to prevent abuse during review:
- ✅ AI generation rate limits (already in place via Spark)
- ⚠️ Account creation rate limits
- ⚠️ Email verification rate limits (implemented: 5 codes/hour)

---

### 15. **Network Security**

#### iOS App Transport Security (ATS):
```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <false/>
</dict>
```

#### Android Network Security Config:
```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="false">
        <trust-anchors>
            <certificates src="system" />
        </trust-anchors>
    </base-config>
</network-security-config>
```

---

## 🎯 Pre-Submission Checklist

### iOS App Store
- [ ] App built with production certificate
- [ ] App icons (all sizes) included
- [ ] Screenshots prepared (iPhone, iPad)
- [ ] App Store listing complete
- [ ] Privacy policy URL live
- [ ] Terms of service URL live
- [ ] Age rating selected
- [ ] Content rights declared
- [ ] Export compliance answered
- [ ] Test account provided (or demo mode documented)
- [ ] Privacy manifest included
- [ ] Crash reporting configured
- [ ] VoiceOver tested

### Google Play
- [ ] App signed with release key
- [ ] App icons (adaptive) included
- [ ] Screenshots prepared (phone, tablet)
- [ ] Feature graphic created
- [ ] Google Play listing complete
- [ ] Privacy policy URL live
- [ ] Terms of service URL live
- [ ] Data safety section complete
- [ ] Content rating obtained (IARC)
- [ ] Test account provided (or demo mode documented)
- [ ] Target API level met (API 34+ for 2024)
- [ ] TalkBack tested

---

## 🚀 Additional Enhancements

### Nice-to-Have Features:
1. **Onboarding Tutorial**: First-time user walkthrough
2. **Help/FAQ Section**: In-app documentation
3. **Feedback Mechanism**: In-app feedback form or email link
4. **Share Feature**: Share meal plans with friends
5. **Export Data**: GDPR-compliant data export (JSON/CSV)
6. **Offline Mode**: Basic functionality without network
7. **Widget Support**: iOS home screen widget, Android widget
8. **Apple Health Integration**: Sync nutrition data to Health app
9. **Google Fit Integration**: Sync nutrition data to Fit app

---

## 📊 Compliance Status Summary

| Requirement | iOS | Android | Status |
|------------|-----|---------|--------|
| Privacy Policy | ✅ | ✅ | Complete |
| Terms of Service | ✅ | ✅ | Complete |
| Account Deletion | ✅ | ✅ | Complete |
| Medical Disclaimers | ✅ | ✅ | Complete |
| Demo Mode | ✅ | ✅ | Complete |
| Age Gate | ⚠️ | ⚠️ | **Needs Implementation** |
| Privacy Manifest | ⚠️ | N/A | **iOS 17+ Required** |
| Data Safety | N/A | ⚠️ | **Needs Declaration** |
| App Icons | ⚠️ | ⚠️ | **Needs Design** |
| Screenshots | ⚠️ | ⚠️ | **Needs Creation** |
| Store Listings | ⚠️ | ⚠️ | **Needs Writing** |
| Live URLs | ⚠️ | ⚠️ | **Needs Deployment** |
| Accessibility | ⚠️ | ⚠️ | **Needs Improvement** |
| Localization | ✅ | ✅ | Complete (UI only) |

---

## 🔗 Useful Resources

### iOS App Store
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Privacy Manifest](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

### Google Play
- [Developer Policy Center](https://support.google.com/googleplay/android-developer/answer/9859751)
- [Data Safety Section](https://support.google.com/googleplay/android-developer/answer/10787469)
- [Material Design Guidelines](https://m3.material.io/)

---

## 📞 Support

For questions about store compliance, contact:
- **Email**: support@gurmaio.app
- **Documentation**: See PRIVACY.md, TERMS.md, SECURITY.md

---

**Next Steps**: Implement age gate, improve accessibility, create assets, deploy URLs, submit for review!
