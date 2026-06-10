const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const DOWNLOAD_DIR = process.env.DOWNLOAD_DIR || path.join(__dirname, 'assets', 'apk');
const TOKEN_TTL_SEC = Number(process.env.TOKEN_TTL_SEC || 300); // 5 minutes
const INSTALL_PASSWORD = process.env.INSTALL_PASSWORD || 'changeme';

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory token store: token => { expires, apkFilename, deviceFingerprint, used }
const tokens = new Map();

function genToken() {
  return crypto.randomBytes(24).toString('hex');
}

// Simple rate limiter per IP (in-memory)
const rateMap = new Map();
function rateLimit(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const max = 10;
  const entry = rateMap.get(ip) || { ts: now, count: 0 };
  if (now - entry.ts > windowMs) {
    entry.ts = now; entry.count = 0;
  }
  entry.count++;
  rateMap.set(ip, entry);
  if (entry.count > max) return res.status(429).json({ error: 'Too many requests' });
  next();
}

app.post('/request-install', rateLimit, (req, res) => {
  const { user, deviceFingerprint } = req.body || {};
  const password = req.headers['x-install-password'] || req.body.password;
  if (!password || password !== INSTALL_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Check APK exists
  const apkFilename = 'dukamax.apk';
  const apkPath = path.join(DOWNLOAD_DIR, apkFilename);
  if (!fs.existsSync(apkPath)) return res.status(500).json({ error: 'APK not available on server' });

  const token = genToken();
  const expires = Date.now() + TOKEN_TTL_SEC * 1000;
  tokens.set(token, { expires, apkFilename, deviceFingerprint, used: false });

  const downloadUrl = `/download?token=${token}`;
  console.log(`Issued token for user=${user || 'unknown'} ip=${req.ip} token=${token}`);
  res.json({ downloadUrl, expiresAt: expires });
});

app.get('/download', rateLimit, (req, res) => {
  const token = String(req.query.token || '');
  if (!token || !tokens.has(token)) return res.status(404).send('Not found');
  const entry = tokens.get(token);
  if (entry.used) return res.status(410).send('Token already used');
  if (Date.now() > entry.expires) { tokens.delete(token); return res.status(410).send('Token expired'); }

  // Optional device fingerprint check
  const reqFingerprint = req.query.fingerprint || req.header('x-device-fingerprint');
  if (entry.deviceFingerprint && reqFingerprint && entry.deviceFingerprint !== reqFingerprint) {
    return res.status(403).send('Device fingerprint mismatch');
  }

  const apkPath = path.join(DOWNLOAD_DIR, entry.apkFilename);
  if (!fs.existsSync(apkPath)) return res.status(500).send('APK not available');

  // Mark used and send file
  entry.used = true;
  tokens.set(token, entry);

  res.setHeader('Content-Type', 'application/vnd.android.package-archive');
  res.setHeader('Content-Disposition', `attachment; filename="${entry.apkFilename}"`);
  res.setHeader('Cache-Control', 'no-store');
  res.sendFile(apkPath, (err) => {
    if (err) console.error('Error sending APK', err);
    else console.log(`APK delivered token=${token} ip=${req.ip}`);
  });
});

// Keep token store trimmed
setInterval(() => {
  const now = Date.now();
  for (const [k, v] of tokens.entries()) {
    if (v.expires < now) tokens.delete(k);
  }
}, 60 * 1000);

app.listen(PORT, () => {
  console.log(`Dukamax APK server listening on http://localhost:${PORT}/ (place APK in ${DOWNLOAD_DIR})`);
});
