import "server-only";
import { tasks } from "@trigger.dev/sdk";
import { automations } from "@/automations/registry";
import { getCurrentUser } from "@/lib/current-user";

// The one way the dashboard starts backend work. Only signed-in users can trigger, and only
// tasks listed in the automation registry. Needs TRIGGER_SECRET_KEY in the environment.
export async function triggerAutomation(taskId: string, payload: Record<string, unknown> = {}) {
  const user = await getCurrentUser();
  if (!automations.some((automation) => automation.taskId === taskId)) {
    throw new Error(`No automation in the registry uses task "${taskId}".`);
  }
  return tasks.trigger(taskId, payload, { tags: [`user_${user.id}`] });
}
