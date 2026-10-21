# Automations backend (Trigger.dev)

This folder holds the backend: the automations and processes that run on
[Trigger.dev](https://trigger.dev). Everything else (pages, sidebar, settings) lives in the
Next.js app. There are no automations yet.

## Adding an automation

1. Create a task file here, e.g. `src/trigger/invoice-reminders.ts`:

   ```ts
   import { task } from "@trigger.dev/sdk";

   export const invoiceReminders = task({
     id: "invoice-reminders",
     run: async (payload: { dryRun?: boolean }) => {
       // ...the automation
       return { sent: 0 };
     },
   });
   ```

   For a schedule, use `schedules.task({ id, cron: "0 8 * * 1-5", run })` instead.

2. Add it to `src/automations/registry.ts` with `taskId: "invoice-reminders"`. That gives it a
   sidebar link, a dashboard card and its own page at `/automations/invoice-reminders`.

3. To start it from the dashboard, call `triggerAutomation("invoice-reminders", payload)` from
   `src/lib/trigger.ts` inside a server action.

## Running

- `npm run dev:trigger` runs tasks locally (needs `TRIGGER_SECRET_KEY` in `.env.local`).
- `npm run deploy:trigger` deploys them to Trigger.dev.

Tasks run outside Next.js, so every environment variable a task uses (for example
`MONGODB_URI`) must also be added in the Trigger.dev dashboard.
