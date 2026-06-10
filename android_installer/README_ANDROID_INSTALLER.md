Dukamax — Android Installer App

This tiny native Android app downloads the APK from a provided URL and launches the system installer using a FileProvider.

Features
- Downloads APK to app cache
- Shows progress
- Launches install intent (user must confirm)
- Uses FileProvider for sharing the APK

Build & run
1. Open the folder `android_installer` in Android Studio.
2. Let Gradle sync. If asked, update Gradle plugin to a compatible version in Android Studio.
3. Edit the sample URL in `MainActivity` or type a download URL into the app UI.
4. Build and install on a device or emulator (emulator won't support installs from unknown sources by default).

Notes & security
- The app requires `REQUEST_INSTALL_PACKAGES` permission for API 26+ to prompt the user to allow installs from unknown sources.
- This app does NOT perform attestation; ensure your server provides short-lived, one-time, device-bound download tokens.
- For production use, sign the app with your release key and harden input validation.

How it integrates with server
- Use the server's `/request-install` flow to generate a one-time download URL, then paste that URL into this app and press "Download & Install".

Limitations
- Silent installs (without user interaction) are not possible on normal consumer devices — require MDM/Device Owner privileges.
- The app does not auto-delete every copy; it removes only its temporary cache file.

