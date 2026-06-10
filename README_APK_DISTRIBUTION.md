Dukamax — Self-hosted secure APK distribution

Overview
- Minimal Express server that issues short-lived, one-time download tokens for an APK.
- A simple installer web page requests a token and triggers the APK download.

Setup
1. Place your signed APK at `assets/apk/dukamax.apk`.
2. Install dependencies:

```bash
npm install
```

3. Start the server (defaults shown):

```bash
PORT=3000 INSTALL_PASSWORD=changeme npm start
```

Security notes
- Change `INSTALL_PASSWORD` to a strong secret in production.
- Use HTTPS (reverse proxy like nginx or a TLS-enabled host) in production.
- Consider integrating SafetyNet / Play Integrity and proper user authentication before issuing tokens.
- For silent installs you must use MDM / managed devices — this flow requires user confirmation on normal Android devices.

How it works
- POST `/request-install` with JSON `{ user, deviceFingerprint }` and header `x-install-password`.
- Server returns `{ downloadUrl }` containing a one-time token.
- Visiting `/download?token=...` returns the APK if token is valid.

Next steps
- Integrate proper user authentication (OAuth/JWT) instead of `INSTALL_PASSWORD`.
- Add server-side device attestation check (Play Integrity) before issuing tokens.
- Optionally build a native installer app to call `/request-install`, download the APK and automatically start the installer intent.
