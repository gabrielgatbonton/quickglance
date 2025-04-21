import { create } from "zustand";

export type ShortcutRunnerState = {
  isShortcutRunning: boolean;
};

export type ShortcutRunnerActions = {
  setIsShortcutRunning: (isRunning: boolean) => void;
};

const useShortcutRunnerStore = create<
  ShortcutRunnerState & ShortcutRunnerActions
>((set) => ({
  isShortcutRunning: false,
  setIsShortcutRunning: (isRunning) => set({ isShortcutRunning: isRunning }),
}));

export default useShortcutRunnerStore;
