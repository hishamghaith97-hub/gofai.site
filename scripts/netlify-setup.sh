#!/usr/bin/env bash
# One-time setup of the dashboard on Netlify (site "gofai-dashboard", served at app.gofai.site).
# Copies the settings from .env.local without printing them, with a fresh AUTH_SECRET for production.
# Run from the aisystem folder:  bash scripts/netlify-setup.sh
set -euo pipefail
cd "$(dirname "$0")/.."

N="npx -y netlify-cli@17.38.1"
SITE_ID="2ffaa13f-a1c2-40c6-9120-6a76b808b35b"

$N link --id "$SITE_ID"
grep -qx ".netlify" .gitignore || echo ".netlify" >> .gitignore

for key in ALLOWED_EMAIL_DOMAINS MONGODB_URI MONGODB_DB AUTH_RESEND_KEY EMAIL_FROM; do
  value=$(grep -E "^$key=" .env.local | head -1 | cut -d= -f2- | sed -E 's/^"(.*)"$/\1/')
  if [ -z "$value" ]; then echo "!! $key is empty in .env.local"; exit 1; fi
  $N env:set "$key" "$value" > /dev/null
  echo "set $key"
done
$N env:set AUTH_SECRET "$(node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))")" > /dev/null
echo "set AUTH_SECRET (new)"
$N env:set AUTH_URL "https://app.gofai.site" > /dev/null
echo "set AUTH_URL"

# Custom domain; gofai.site uses Netlify DNS, so Netlify adds the app record itself.
$N api updateSite --data "{\"site_id\":\"$SITE_ID\",\"body\":{\"custom_domain\":\"app.gofai.site\"}}" > /dev/null
echo "set custom domain app.gofai.site"

$N deploy --build --prod
