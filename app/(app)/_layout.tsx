import useAuthStore, {
  AuthStoreActions,
  AuthStoreState,
} from "@/stores/useAuthStore";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

const MODAL_PRESENTATION = "modal";

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
          presentation: MODAL_PRESENTATION,
          gestureEnabled: Boolean(token),
        }}
      />
      <Stack.Screen
        name="(modal)/add-shortcut"
        options={{
          presentation: MODAL_PRESENTATION,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="(modal)/reorder-shortcuts"
        options={{ presentation: MODAL_PRESENTATION }}
      />
      <Stack.Screen
        name="(modal)/add-automation"
        options={{ presentation: MODAL_PRESENTATION }}
      />
      <Stack.Screen
        name="(modal)/edit-profile"
        options={{ presentation: MODAL_PRESENTATION }}
      />
      <Stack.Screen
        name="(modal)/change-password"
        options={{ presentation: MODAL_PRESENTATION }}
      />
      <Stack.Screen
        name="(modal)/run-shortcut"
        options={{ presentation: MODAL_PRESENTATION }}
      />
      <Stack.Screen
        name="(modal)/install-shortcut"
        options={{ presentation: MODAL_PRESENTATION }}
      />

      {/* Test screens */}
      <Stack.Screen
        name="(modal)/camera-test/index"
        options={{ presentation: MODAL_PRESENTATION }}
      />
    </Stack>
  );
}
