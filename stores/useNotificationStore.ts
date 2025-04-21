import { create } from "zustand";
import * as Notifications from "expo-notifications";

export type NotificationState = {
  expoPushToken: string;
  notification: Notifications.Notification | null;
};

export type NotificationActions = {
  setExpoPushToken: (token: string) => void;
  setNotification: (notification: Notifications.Notification | null) => void;
};

const useNotificationStore = create<NotificationState & NotificationActions>(
  (set) => ({
    expoPushToken: "",
    notification: null,
    setExpoPushToken: (token) => set({ expoPushToken: token }),
    setNotification: (notification) => set({ notification }),
  }),
);

export default useNotificationStore;
