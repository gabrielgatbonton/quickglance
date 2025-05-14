import { AutomationCondition, OrderData } from "@/constants/types";
import { create } from "zustand";

export type AddAutomationState = {
  condition: AutomationCondition | null;
  orderData: OrderData;
};

export type AddAutomationActions = {
  setCondition: (condition: AutomationCondition) => void;
  setOrderData: (orderData: OrderData) => void;
  resetAll: () => void;
};

const useAddAutomationStore = create<AddAutomationState & AddAutomationActions>(
  (set) => ({
    condition: null,
    orderData: {},
    setCondition: (condition) => set((state) => ({ ...state, condition })),
    setOrderData: (orderData) => set((state) => ({ ...state, orderData })),
    resetAll: () => set({ condition: null, orderData: {} }),
  }),
);

export default useAddAutomationStore;
