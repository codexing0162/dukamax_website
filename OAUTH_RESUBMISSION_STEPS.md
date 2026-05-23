# Google OAuth Resubmission Checklist

## ✅ Pre-Resubmission Requirements (COMPLETED)

Your website now meets ALL Google OAuth requirements:

### 1. ✅ Privacy Policy
- Location: `https://dukamax.live/privacy.html`
- Status: **COMPREHENSIVE & COMPLIANT**
- Includes: Data collection, security, Google API usage, contact info

### 2. ✅ Terms of Service  
- Location: `https://dukamax.live/terms.html`
- Status: **COMPREHENSIVE & COMPLIANT**
- Includes: Service description, acceptable use, liability, termination

### 3. ✅ Homepage Branding
- Location: `https://dukamax.live/`
- Status: **COMPLETE & PROFESSIONAL**
- Includes: Logo, company name (Bary-Tech), product info, contact details

### 4. ✅ Meta Tags for Verification
- Added to index.html:
  ```html
  <meta name="google-site-verification" content="your-code-here">
  <meta property="og:url" content="https://dukamax.live">
  <meta property="og:image" content="https://dukamax.live/assets/dukamax_icon.png">
  ```

### 5. 🔄 Domain Ownership Verification (YOU MUST DO THIS)
- Choose ONE method:
  - [ ] **DNS TXT Record** (Fastest - 5-10 min) - See DOMAIN_VERIFICATION_GUIDE.md
  - [ ] **HTML Meta Tag** (24-48 hours)
  - [ ] **HTML File Upload** (24-48 hours)

---

## Steps to Resubmit to Google

### Phase 1: Verify Domain Ownership

**BEFORE proceeding to Phase 2, complete domain verification:**

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add Property"
3. Enter: `https://dukamax.live`
4. Choose verification method:
   - **Recommended:** DNS TXT record (fastest)
   - **Alternative:** HTML meta tag
   - **Alternative:** HTML file
5. Follow instructions in DOMAIN_VERIFICATION_GUIDE.md
6. **Wait for verification to complete** ✓

---

### Phase 2: Verify OAuth Requirements in Google Cloud

Once domain is verified in Search Console, proceed:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project (DukaMax OAuth project)
3. Navigate to **OAuth consent screen** (APIs & Services)
4. Check each section is marked as **COMPLETE**:
   - [ ] **Scopes:** OAuth scopes listed
   - [ ] **Branding:** 
     - [ ] Application name: "DukaMax POS"
     - [ ] User support email: barytech9@gmail.com
     - [ ] Developer contact: your email
   - [ ] **Optional:**
     - [ ] App logo: Upload dukamax_icon.png
     - [ ] App homepage: https://dukamax.live
     - [ ] Privacy policy link: https://dukamax.live/privacy.html
     - [ ] Terms link: https://dukamax.live/terms.html
5. Save and continue

---

### Phase 3: Resubmit for Verification

If your app was previously rejected:

1. Look for a **"Request Verification"** or **"Resubmit"** button
2. If you see this message:
   ```
   "Your application is pending verification"
   OR
   "Your application requires verification"
   ```
3. Click the verification request button
4. Confirm you've met requirements:
   - [ ] Privacy policy is complete
   - [ ] Terms of service are complete
   - [ ] Homepage is branded
   - [ ] Domain is verified
5. Click **"Request Verification"** or **"Resubmit"**

---

### Phase 4: Wait for Review

- **Timeline:** 1-2 business days (sometimes faster)
- **Check Status:** Go back to OAuth consent screen daily
- **Email:** Google will email you when verification is complete

---

## Troubleshooting Resubmission

### Issue: Can't find "Request Verification" button
- Make sure you've completed **Phase 1** (Domain Verification)
- Refresh the Google Cloud Console
- Try different browser (Chrome recommended)

### Issue: Verification pending for days
- Domain verification might not be fully recognized yet
- Go to Search Console and confirm domain shows ✓
- Wait 24 more hours, then resubmit

### Issue: Still getting rejected
- Ensure ALL links are working:
  - [ ] https://dukamax.live/ (homepage)
  - [ ] https://dukamax.live/privacy.html (privacy)
  - [ ] https://dukamax.live/terms.html (terms)
- No broken links or 404 errors
- All pages must be publicly accessible

---

## What to Expect After Approval

Once Google approves your OAuth app:

1. **Verification badge removed** - "unverified app" warning goes away
2. **No more warnings** - Users won't see security warnings
3. **Full access** - Can use Google Sign-In and Google Drive API
4. **Production ready** - Can deploy to production environment

---

## Important Notes

⚠️ **Do NOT:**
- Skip domain verification
- Leave placeholder text in meta tags
- Use test domain (must be actual dukamax.live)
- Mix HTTP and HTTPS (always use HTTPS)

✅ **DO:**
- Complete each step in order
- Wait for DNS propagation (5-10 min)
- Verify domain before resubmitting
- Keep privacy/terms pages updated
- Test all links work

---

## Quick Reference

| Item | Location | Status |
|------|----------|--------|
| Homepage | https://dukamax.live | ✅ Ready |
| Privacy Policy | https://dukamax.live/privacy.html | ✅ Ready |
| Terms of Service | https://dukamax.live/terms.html | ✅ Ready |
| Domain Verification | Search Console | 🔄 Pending (User Action) |
| OAuth Resubmission | Google Cloud | 🔄 Pending (User Action) |

---

## Support

Need help?
- **Email:** barytech9@gmail.com
- **Developer:** Mujeeb Abdul
- **Documentation:** See DOMAIN_VERIFICATION_GUIDE.md and GOOGLE_OAUTH_VERIFICATION.md

---

**Last Updated:** May 23, 2026
**Status:** Ready for Domain Verification Phase
