import { defineConfig } from "@trigger.dev/sdk";

// Background automations run on Trigger.dev, not in the Next.js app.
// Task files live in src/trigger. See src/trigger/README.md.
export default defineConfig({
  // From https://cloud.trigger.dev → your project → Project settings. Looks like "proj_xxxxxxxxxxxx".
  project: process.env.TRIGGER_PROJECT_REF ?? "proj_replace_me",
  dirs: ["./src/trigger"],
  runtime: "node-24",
  maxDuration: 300,
  retries: {
    enabledInDev: false,
    default: { maxAttempts: 3, minTimeoutInMs: 1_000, maxTimeoutInMs: 10_000, factor: 2, randomize: true },
  },
});
