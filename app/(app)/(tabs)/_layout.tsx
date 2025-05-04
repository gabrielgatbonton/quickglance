import { Colors } from "@/assets/colors";
import AddShortcutButton from "@/components/add-shortcut-button";
import IconView from "@/components/icon-view";
import useAuthStore, { AuthStoreState } from "@/stores/useAuthStore";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { router, Tabs } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";
import { Confetti } from "react-native-fast-confetti";
import { useShallow } from "zustand/react/shallow";

const ANDROID_TAB_BAR_HEIGHT = 60;

export default function TabLayout() {
  const { isTokenLoaded, token, user } = useAuthStore<
    Pick<AuthStoreState, "isTokenLoaded" | "token" | "user">
  >(
    useShallow((state) => ({
      isTokenLoaded: state.isTokenLoaded,
      token: state.token,
      user: state.user,
    })),
  );

  // Redirect to welcome screen if no token
  useEffect(() => {
    if (isTokenLoaded && !token) {
      router.navigate("/(modal)/welcome");
    }
  }, [isTokenLoaded, token]);

  return (
    <BottomSheetModalProvider>
      {token && user && <Confetti isInfinite={false} />}

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.PRIMARY,
          tabBarInactiveTintColor: Colors.SECONDARY,
          tabBarStyle: Platform.OS === "android" && {
            height: ANDROID_TAB_BAR_HEIGHT,
          },
        }}
      >
        <Tabs.Screen name="index" options={{ href: null }} />
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconView name={["house.fill", "home"]} color={color} />
            ),
          }}
          redirect={!token}
        />
        <Tabs.Screen
          name="store"
          options={{
            title: "Store",
            tabBarIcon: ({ color }) => (
              <IconView
                name={["sparkles.rectangle.stack.fill", "storefront"]}
                color={color}
              />
            ),
          }}
          redirect={!token}
        />
        <Tabs.Screen
          name="add-shortcut-index"
          options={{
            tabBarButton: (props) => <AddShortcutButton {...props} />,
          }}
          redirect={!token}
        />
        <Tabs.Screen
          name="automation"
          options={{
            title: "Automation",
            tabBarIcon: ({ color }) => (
              <IconView name={["timer", "timer"]} color={color} />
            ),
          }}
          redirect={!token}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => (
              <IconView name={["gear", "settings"]} color={color} />
            ),
          }}
          redirect={!token}
        />
      </Tabs>
    </BottomSheetModalProvider>
  );
}
