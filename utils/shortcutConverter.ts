import { Action, OrderData, ShortcutStep } from "@/constants/types";

export const actionsToSteps = (actions: Action[]): ShortcutStep[] => {
  return actions.map((action, index) => ({
    id: action.key || index.toString(),
    actionId: action.id,
    actionName: action.name,
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

type OrderConfig = {
  increment?: boolean;
  decrement?: boolean;
};

export const orderKeysToArr = (
  orderData: OrderData,
  { increment, decrement }: OrderConfig = {},
) => {
  return Object.entries(orderData).map(([id, order]) => ({
    id,
    order: increment ? order + 1 : decrement ? order - 1 : order,
  }));
};
