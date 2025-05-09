import { create } from "zustand";
import { Action, Shortcut } from "@/constants/types";
import { SFSymbol } from "expo-symbols";
import { IoniconName } from "@/components/icon-view";

export type AddShortcutState = {
  details: {
    name: string;
    description: string;
    icon?: SFSymbol;
    androidIcon?: IoniconName;
    isUpload: boolean;
    gradientStart: string;
    gradientEnd: string;
  };
  actions: Action[];
  currentShortcut?: Shortcut;
};

export type AddShortcutActions = {
  setDetails: (details: Partial<AddShortcutState["details"]>) => void;
  setActions: (actions: Action[]) => void;
  setCurrentShortcut: (shortcut: Shortcut) => void;
  addOrUpdateAction: (action: Action) => void;
  removeAction: (key: string) => void;
  resetAll: () => void;
};

const initialDetailState: AddShortcutState["details"] = {
  name: "",
  description: "",
  icon: undefined,
  androidIcon: undefined,
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
    setCurrentShortcut: (shortcut) =>
      set((state) => ({ ...state, currentShortcut: shortcut })),
    addOrUpdateAction: (action) =>
      set((state) => {
        const existingIndex = state.actions.findIndex(
          (existingAction) => existingAction.key === action.key
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
          (existingAction) => existingAction.key !== key
        ),
      })),
    resetAll: () =>
      set({
        details: initialDetailState,
        actions: [],
      }),
  })
);

export default useAddShortcutStore;
