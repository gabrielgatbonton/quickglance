import { create } from "zustand";
import { Action, ActionInput } from "@/constants/types";

export type AddShortcutState = {
  details: {
    name: string;
    description: string;
    icon: string;
    isUpload: boolean;
    gradientStart: string;
    gradientEnd: string;
  };
  actions: Action[];
};

export type AddShortcutActions = {
  setDetails: (details: Partial<AddShortcutState["details"]>) => void;
  addOrUpdateAction: (action: Action, inputs?: ActionInput[]) => void;
  removeAction: (id: string) => void;
  resetActions: (actions: Action[]) => void;
  resetDetails: (details: AddShortcutState["details"]) => void;
  resetAll: () => void;
};

const initialDetailState: AddShortcutState["details"] = {
  name: "",
  description: "",
  icon: "",
  isUpload: false,
  gradientStart: "",
  gradientEnd: "",
};

const useAddShortcutStore = create<AddShortcutState & AddShortcutActions>(
  (set) => ({
    details: initialDetailState,
    actions: [],
    setDetails: (details) =>
      set((state) => ({ details: { ...state.details, ...details } })),
    addOrUpdateAction: (action, inputs) =>
      set((state) => {
        const existingIndex = state.actions.findIndex(
          (existingAction) => existingAction.id === action.id,
        );

        // If action doesn't exist, add it to the array
        if (existingIndex === -1) {
          return {
            actions: [...state.actions, { ...action, inputs }],
          };
        }

        // Otherwise update the existing action
        return {
          actions: state.actions.map((existingAction) => {
            if (existingAction.id === action.id) {
              return { ...action, inputs };
            }

            return existingAction;
          }),
        };
      }),
    removeAction: (id: string) =>
      set((state) => ({
        actions: state.actions.filter(
          (existingAction) => existingAction.id !== id,
        ),
      })),
    resetActions: (actions) => set({ actions }),
    resetDetails: (details) => set({ details }),
    resetAll: () => set({ details: initialDetailState, actions: [] }),
  }),
);

export default useAddShortcutStore;
