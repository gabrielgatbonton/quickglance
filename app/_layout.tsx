import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { configureReanimatedLogger } from "react-native-reanimated";
import useNotifications from "@/hooks/useNotifications";
import { StrictMode } from "react";

export const queryClient = new QueryClient();

configureReanimatedLogger({
  strict: false,
});

export default function RootLayout() {
  useNotifications();

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView>
          <KeyboardProvider>
            <Slot />
          </KeyboardProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </StrictMode>
  );
}
