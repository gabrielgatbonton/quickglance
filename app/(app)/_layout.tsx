import useAuthStore, {
  AuthStoreActions,
  AuthStoreState,
} from "@/stores/useAuthStore";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export default function RootLayout() {
  const { token, refreshAuth } = useAuthStore<{
    token: AuthStoreState["token"];
    refreshAuth: AuthStoreActions["refreshAuth"];
  }>(
    useShallow((state) => ({
      token: state.token,
      refreshAuth: state.refreshAuth,
    })),
  );

  // Restore token on app start
  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="(modal)/welcome"
        options={{
          presentation: "modal",
          gestureEnabled: Boolean(token),
        }}
      />
      <Stack.Screen
        name="(modal)/add-shortcut"
        options={{
          presentation: "modal",
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="(modal)/reorder-shortcuts"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="(modal)/add-automation"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="(modal)/edit-profile"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="(modal)/change-password"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="(modal)/run-shortcut"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="(modal)/install-shortcut"
        options={{
          presentation: "modal",
        }}
      />

      {/* Test screens */}
      <Stack.Screen
        name="(modal)/camera-test/index"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
