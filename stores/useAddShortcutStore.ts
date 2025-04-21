import { create } from "zustand";
import { Action } from "@/constants/types";
import { SFSymbol } from "expo-symbols";

export type AddShortcutState = {
  details: {
    name: string;
    description: string;
    icon: SFSymbol;
    isUpload: boolean;
    gradientStart: string;
    gradientEnd: string;
  };
  actions: Action[];
};

export type AddShortcutActions = {
  setDetails: (details: Partial<AddShortcutState["details"]>) => void;
  setActions: (actions: Action[]) => void;
  addOrUpdateAction: (action: Action) => void;
  removeAction: (key: string) => void;
  resetAll: () => void;
};

const initialDetailState: AddShortcutState["details"] = {
  name: "",
  description: "",
  icon: "" as SFSymbol,
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
    setActions: (actions) => set({ actions }),
    addOrUpdateAction: (action) =>
      set((state) => {
        const existingIndex = state.actions.findIndex(
          (existingAction) => existingAction.key === action.key,
        );

        // If action doesn't exist, add it to the array
        if (existingIndex === -1) {
          return {
            actions: [...state.actions, action],
          };
        }

        // Otherwise update the existing action
        return {
          actions: state.actions.map((existingAction) => {
            if (existingAction.key === action.key) {
              return action;
            }

            return existingAction;
          }),
        };
      }),
    removeAction: (key: string) =>
      set((state) => ({
        actions: state.actions.filter(
          (existingAction) => existingAction.key !== key,
        ),
      })),
    resetAll: () => set({ details: initialDetailState, actions: [] }),
  }),
);

export default useAddShortcutStore;
