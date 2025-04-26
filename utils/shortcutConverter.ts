import { Action, ShortcutStep } from "@/constants/types";

export const actionsToSteps = (actions: Action[]): ShortcutStep[] => {
  return actions.map((action, index) => ({
    id: action.key || index.toString(),
    actionId: action.id,
    inputs: action.inputs?.reduce(
      (acc, input) => {
        acc[input.key] = input.value;
        return acc;
      },
      {} as Record<string, any>,
    ),
  }));
};

export const stepsToActions = (
  steps: ShortcutStep[],
  referenceActions: Action[],
): Action[] => {
  return steps
    .map((step) => {
      const action = referenceActions.find(
        (action) => action.id === step.actionId,
      );
      if (!action) {
        return null;
      }

      return {
        ...action,
        inputs: action.inputs?.map((input) => ({
          ...input,
          value: step.inputs?.[input.key],
        })),
      };
    })
    .filter(Boolean) as Action[];
};
