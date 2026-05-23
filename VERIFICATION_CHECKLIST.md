# Complete Verification Checklist

## ✅ Pre-Resubmission Checklist (Already Completed)

### Website Requirements
- [x] Homepage exists and is accessible
- [x] Homepage has professional branding (DukaMax by Bary-Tech)
- [x] Homepage has company logo
- [x] Homepage has product/service description
- [x] Homepage has contact information
- [x] Privacy Policy page exists
- [x] Terms of Service page exists
- [x] Both legal pages linked from homepage
- [x] All pages use HTTPS

### Privacy Policy (✅ COMPLETE)
- [x] Clear explanation of what data is collected
- [x] Clear explanation of what data is NOT collected
- [x] Data storage and security explanation
- [x] Google API usage documented
- [x] Optional cloud backup features explained
- [x] User rights and data ownership explained
- [x] Third-party services listed
- [x] Contact information included
- [x] Last updated date shown
- [x] Accessible from homepage
- [x] No broken links
- [x] Written in clear language

### Terms of Service (✅ COMPLETE)
- [x] Service description
- [x] Acceptable use policy
- [x] User account responsibility
- [x] Data backup responsibility
- [x] Intellectual property rights
- [x] Third-party services disclosure
- [x] Fees and pricing (free app)
- [x] Warranty disclaimer
- [x] Limitation of liability
- [x] Termination clause
- [x] Modifications to terms
- [x] Governing law (Tanzania)
- [x] Contact information
- [x] Accessible from homepage
- [x] No broken links

### Meta Tags (✅ ADDED)
- [x] Google site verification meta tag added
- [x] og:title added
- [x] og:description added
- [x] og:type added
- [x] og:url added (https://dukamax.live)
- [x] og:image added
- [x] Page title is descriptive
- [x] Meta description is accurate

### Open Graph Tags
- [x] og:url points to main domain
- [x] og:image is valid and accessible
- [x] og:title is accurate
- [x] og:description is accurate

---

## 🔄 Now Verify Domain Ownership (YOUR NEXT STEP)

### Pre-Verification Steps
- [ ] Choose verification method:
  - [ ] DNS TXT record (recommended - fastest)
  - [ ] HTML meta tag
  - [ ] HTML file upload

### Domain Verification - DNS TXT Method
- [ ] Go to https://search.google.com/search-console
- [ ] Click "Add Property"
- [ ] Enter domain: https://dukamax.live
- [ ] Select "DNS record" verification
- [ ] Copy the TXT record provided
- [ ] Log into domain registrar
- [ ] Navigate to DNS settings
- [ ] Add new TXT record:
  - [ ] Name/Host: @ (or leave empty)
  - [ ] Type: TXT
  - [ ] Value: (paste from Google)
  - [ ] TTL: 3600
- [ ] Save DNS changes
- [ ] Wait 5-10 minutes for propagation
- [ ] Return to Google Search Console
- [ ] Click "Verify"
- [ ] Confirm checkmark ✓ appears

### Domain Verification - HTML Meta Tag Method
- [ ] Get verification code from Google Search Console
- [ ] Share code with developer
- [ ] Update index.html with actual code
- [ ] Deploy updated file
- [ ] Wait 24-48 hours
- [ ] Click "Verify" in Google Search Console

### Domain Verification - HTML File Method
- [ ] Download verification file from Google
- [ ] Upload to root directory: https://dukamax.live/
- [ ] Verify file is accessible
- [ ] Wait 24-48 hours
- [ ] Click "Verify" in Google Search Console

---

## 📋 OAuth Resubmission Steps (After Domain Verified)

### Pre-Resubmission Check
- [ ] Domain verification completed in Search Console
- [ ] Verification shows checkmark ✓
- [ ] All links working:
  - [ ] https://dukamax.live/
  - [ ] https://dukamax.live/privacy.html
  - [ ] https://dukamax.live/terms.html
- [ ] No 404 errors
- [ ] Using HTTPS everywhere
- [ ] Logo/images load correctly

### Google Cloud Console - OAuth Consent Screen
- [ ] Go to https://console.cloud.google.com
- [ ] Select your project
- [ ] Navigate to APIs & Services
- [ ] Click "OAuth consent screen"
- [ ] Fill out branding:
  - [ ] Application name: DukaMax POS
  - [ ] User support email: barytech9@gmail.com
  - [ ] App homepage: https://dukamax.live
  - [ ] Privacy policy link: https://dukamax.live/privacy.html
  - [ ] Terms link: https://dukamax.live/terms.html
  - [ ] Upload logo: /assets/dukamax_icon.png
  - [ ] Developer contact email: (your email)
- [ ] Save

### Request Verification
- [ ] Look for "Request Verification" button
- [ ] Click it
- [ ] Confirm you've met all requirements:
  - [ ] Privacy policy complete
  - [ ] Terms of service complete
  - [ ] Branding present
  - [ ] Domain verified
- [ ] Submit for review
- [ ] Receive confirmation email

### Wait for Review
- [ ] Check status daily
- [ ] Expected timeline: 1-2 business days
- [ ] Google will email when complete
- [ ] Status will update in Cloud Console

---

## ✅ Final Verification Checklist (After Google Approves)

### OAuth Application Ready
- [ ] "Unverified app" warning is gone
- [ ] No security warnings for users
- [ ] Can create OAuth credentials
- [ ] Can generate client ID/secret
- [ ] Can use Google Sign-In
- [ ] Can use Google Drive API
- [ ] Can use Google Sheets API

### Post-Approval Deployment
- [ ] Updated index.html deployed
- [ ] All legal pages accessible
- [ ] OAuth credentials created
- [ ] Redirect URIs configured:
  - [ ] http://localhost:3000/callback (dev)
  - [ ] https://dukamax.live/callback (production)
- [ ] Client ID/Secret securely stored
- [ ] Never commit secrets to git
- [ ] Use environment variables

---

## 📊 Verification Status Summary

| Item | Status | Location |
|------|--------|----------|
| Homepage | ✅ Complete | index.html |
| Privacy Policy | ✅ Complete | privacy.html |
| Terms of Service | ✅ Complete | terms.html |
| Branding | ✅ Complete | index.html |
| Meta Tags | ✅ Added | index.html |
| Domain DNS | 🔄 Pending | Your registrar |
| Domain Verification | 🔄 Pending | Google Search Console |
| OAuth Resubmission | 🔄 Pending | Google Cloud Console |
| Google Review | ⏳ Pending | Google (1-2 days) |
| Final Approval | ⏳ Pending | Google |

---

## Timeline Overview

```
NOW
├─ Set up DNS TXT record (5 min)
├─ Wait for DNS propagation (5-10 min)
├─ Verify in Search Console (1 min)
│
IMMEDIATELY AFTER
├─ Go to Google Cloud Console
├─ Click "Request Verification"
│
NEXT 1-2 DAYS
├─ Google reviews your app
├─ Approval email sent
│
THEN YOU'RE DONE ✓
├─ All OAuth features working
├─ Users can sign in with Google
├─ Google Drive backup available
```

---

## Troubleshooting Reference

| Issue | Solution | Guide |
|-------|----------|-------|
| DNS not working | Wait 15+ min, check propagation | DOMAIN_VERIFICATION_GUIDE.md |
| Meta tag issues | Verify exact code match | OAUTH_RESUBMISSION_STEPS.md |
| File upload failing | Check permissions, URL accessible | DOMAIN_VERIFICATION_GUIDE.md |
| Can't find verification button | Verify domain first | OAUTH_RESUBMISSION_STEPS.md |
| Slow Google review | Normal (1-2 days), be patient | README_OAUTH_VERIFICATION.md |

---

## Support Resources

- **QUICK_START.md** - 5-minute quick guide
- **DOMAIN_VERIFICATION_GUIDE.md** - Detailed DNS/meta tag/file methods
- **GOOGLE_OAUTH_VERIFICATION.md** - Complete overview
- **OAUTH_RESUBMISSION_STEPS.md** - Step-by-step resubmission
- **README_OAUTH_VERIFICATION.md** - Master guide
- **START_HERE.md** - Visual summary

---

## Contact

**Email:** barytech9@gmail.com  
**Developer:** Mujeeb Abdul  
**Company:** Bary-Tech  
**Location:** Tanzania, East Africa

---

## Quick Command References

### Check DNS Propagation
```bash
# Windows PowerShell
nslookup -type=TXT dukamax.live

# macOS/Linux
dig TXT dukamax.live
nslookup -type=TXT dukamax.live
```

### Test HTTPS
```bash
curl -I https://dukamax.live/
curl -I https://dukamax.live/privacy.html
curl -I https://dukamax.live/terms.html
```

---

**Last Updated:** May 23, 2026  
**Status:** Ready for Domain Verification
