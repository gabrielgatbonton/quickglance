import { Colors } from "@/assets/colors";
import { Stack } from "expo-router";

export default function StoreLayout() {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: "white" } }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Shortcut Gallery",
          headerLargeTitle: true,
          headerLargeTitleShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="[service]"
        options={{
          headerBackTitle: "Services",
          headerLargeTitle: true,
          headerTintColor: Colors.PRIMARY,
          headerLargeTitleStyle: { color: "black" },
          headerTitleStyle: { color: "black" },
          headerTransparent: true,
          headerBlurEffect: "prominent",
        }}
      />
    </Stack>
  );
}
