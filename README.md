# GOF.ai — automations dashboard

The dashboard where the GOF.ai team sees and runs their automations. Only `@gofai.site` email
addresses can sign in, using a magic link sent by email (no passwords, no Google login).

**Stack:** Next.js 16 (App Router) · Tailwind CSS 4 · Auth.js (NextAuth v5) · Resend · MongoDB · Trigger.dev (backend, not built yet)

## Getting started

1. `npm install`
2. Copy `.env.example` to `.env.local` and fill it in:
   - `AUTH_SECRET`: run `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"`
   - `MONGODB_URI`: a MongoDB Atlas connection string
   - `AUTH_RESEND_KEY`: a Resend API key; `EMAIL_FROM` must use a domain verified in Resend
3. `npm run dev` and open http://localhost:3000

## Where things live

```
src/
  auth.ts                     Auth.js setup: Resend magic links, MongoDB sessions, @gofai.site rule
  proxy.ts.disabled           Redirects visitors without a session cookie to /login. Disabled:
                              Netlify cannot bundle it from Windows; rename to proxy.ts when
                              deploying from Linux (e.g. Netlify CI). Pages still check auth.
  lib/
    allowed-email.ts          The domain rule (ALLOWED_EMAIL_DOMAINS, default gofai.site)
    current-user.ts           getCurrentUser(): the server-side session check every page uses
    db.ts                     MongoDB client
    magic-link-email.ts       The sign-in email
    trigger.ts                triggerAutomation(): how the dashboard starts backend tasks
  automations/registry.ts     The list of automations (sidebar, dashboard cards, pages)
  app/
    (auth)/                   /login, /check-email, /auth-error
    (dashboard)/              Signed-in area: sidebar layout, dashboard (/), /settings,
                              /automations/[slug]
  trigger/                    Backend: Trigger.dev tasks (empty for now, see its README)
trigger.config.ts             Trigger.dev project config
```

## How sign-in works

1. Someone enters their email on `/login`. Anything not ending in `@gofai.site` is refused before
   an email is sent. The same rule is enforced in the Auth.js `signIn` callback, so calling the
   Auth.js API directly doesn't get around it either.
2. Resend emails a one-time link (valid 24 hours). Opening it creates a session stored in
   MongoDB (`sessions` collection, 30 days).
3. Every signed-in page checks the session on the server with `getCurrentUser()`. If the
   domain rule later changes, existing users outside it are signed out on their next page load.
4. Settings has **Sign out** (this browser) and **Sign out everywhere** (deletes all of that
   user's sessions).

Auth.js creates these MongoDB collections on its own: `users`, `accounts`, `sessions`,
`verification_tokens`.

## Adding an automation

The frontend lists automations from `src/automations/registry.ts`, and the backend work runs
as Trigger.dev tasks in `src/trigger`. See `src/trigger/README.md`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Run the app locally |
| `npm run build` / `npm start` | Production build / serve it |
| `npm run typecheck` / `npm run lint` | Type and lint checks |
| `npm run dev:trigger` | Run Trigger.dev tasks locally |
| `npm run deploy:trigger` | Deploy Trigger.dev tasks |
