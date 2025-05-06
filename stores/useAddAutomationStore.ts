import { AutomationEvent, OrderData } from "@/constants/types";
import { create } from "zustand";

export type AddAutomationState = {
  event: AutomationEvent | null;
  orderData: OrderData;
};

export type AddAutomationActions = {
  setEvent: (event: AutomationEvent) => void;
  setOrderData: (orderData: OrderData) => void;
  resetAll: () => void;
};

const useAddAutomationStore = create<AddAutomationState & AddAutomationActions>(
  (set) => ({
    event: null,
    orderData: {},
    setEvent: (event) => set((state) => ({ ...state, event })),
    setOrderData: (orderData) => set((state) => ({ ...state, orderData })),
    resetAll: () => set({ event: null, orderData: {} }),
  })
);

export default useAddAutomationStore;
