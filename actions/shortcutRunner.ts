import { RunningAction, Shortcut, ShortcutStep } from "@/constants/types";
import actionHandlers from "./actionHandlers";

export const runShortcut = async (
  shortcut: Shortcut,
  actions: RunningAction[],
  onActionsUpdate: (newActions: RunningAction[]) => void,
) => {
  const results: Record<string, any> = {};

  try {
    // Execute each step in sequence
    for (let i = 0; i < actions.length; i++) {
      const action = actions[i];
      const step = shortcut.steps.find((s) => s.actionId === action.id);

      if (!step || !step.mobileKey) {
        throw new Error(`No step or mobile key found for action ${action.id}`, {
          cause: i,
        });
      }

      // Update UI to show current action
      onActionsUpdate(
        actions.map((a, idx) => ({
          ...a,
          isCurrent: idx === i,
          isCompleted: idx < i,
        })),
      );

      // Resolve input values and run the action
      const resolvedInputs = resolveInputValues(step, results);
      const handler = actionHandlers[step.mobileKey];

      if (!handler) {
        throw new Error(`No handler found for action ${step.mobileKey}`, {
          cause: i,
        });
      }

      // Execute the action
      try {
        const result = await handler(resolvedInputs);
        results[step.id] = result;
      } catch (err: any) {
        // Throw error with index to sync UI
        throw new Error(err, { cause: i });
      }
    }

    // Mark all actions as completed
    onActionsUpdate(
      actions.map((a) => ({
        ...a,
        isCurrent: false,
        isCompleted: true,
      })),
    );

    return { success: true, results };
  } catch (error: any) {
    return { success: false, error: error.message, cause: error.cause };
  }
};

// Input value resolver for execution
const resolveInputValues = (
  currentStep: ShortcutStep,
  previousResults: Record<string, any>,
) => {
  const resolvedInputs: Record<string, any> = {};

  if (!currentStep.inputs) {
    return resolvedInputs;
  }

  // Process each input value
  for (const [key, value] of Object.entries(currentStep.inputs)) {
    if (
      typeof value === "string" &&
      value.startsWith("{{") &&
      value.endsWith("}}")
    ) {
      // Extract property name from the reference
      const propertyName = value.substring(2, value.length - 2).trim();

      // Look for the property in all previous results
      const stepIds = Object.keys(previousResults);
      let found = undefined;

      // Search in reverse order (most recent first)
      for (let i = stepIds.length - 1; i >= 0; i--) {
        const stepResult = previousResults[stepIds[i]];
        if (stepResult && stepResult[propertyName] !== undefined) {
          found = stepResult[propertyName];
          break;
        }
      }

      resolvedInputs[key] = found;
    } else {
      // Regular value
      resolvedInputs[key] = value;
    }
  }

  return resolvedInputs;
};
