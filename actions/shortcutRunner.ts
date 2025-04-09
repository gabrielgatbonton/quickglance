import { Shortcut, ShortcutStep } from "@/constants/types";
import actionHandlers from "./actionHandlers";

export const runShortcut = async (shortcut: Shortcut) => {
  const results: Record<string, any> = {};

  try {
    // Execute each step in sequence
    for (let i = 0; i < shortcut.steps.length; i++) {
      const step = shortcut.steps[i];

      // Resolve input values, handling variables and references
      const resolvedInputs = resolveInputValues(shortcut.steps, i, results);

      // Get the handler function for this action
      const handler = actionHandlers[step.actionId];
      if (!handler) {
        throw new Error(`No handler found for action ${step.actionId}`);
      }

      // Execute the action
      const result = await handler(resolvedInputs);

      // Store result for potential use by subsequent steps
      results[step.id] = result;
    }

    return { success: true, results };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Input value resolver for execution
const resolveInputValues = (
  steps: ShortcutStep[],
  currentStepIndex: number,
  previousResults: Record<string, any>,
) => {
  const step = steps[currentStepIndex];
  const resolvedInputs: Record<string, any> = {};

  // Process each input value
  for (const [key, value] of Object.entries(step.inputs)) {
    if (
      typeof value === "string" &&
      value.startsWith("{{") &&
      value.endsWith("}}")
    ) {
      // This is a reference to another step's result
      const reference = value.substring(2, value.length - 2).trim();
      const [stepId, ...path] = reference.split(".");

      // Find the referenced step result
      let current = previousResults[stepId];
      for (const segment of path.slice(1)) {
        // Skip 'result'
        if (current) {
          current = current[segment];
        }
      }

      resolvedInputs[key] = current;
    } else {
      // Regular value
      resolvedInputs[key] = value;
    }
  }

  return resolvedInputs;
};
