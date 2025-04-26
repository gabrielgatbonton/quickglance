import { Colors } from "@/assets/colors";
import { DEFAULT_FONT_FAMILY } from "@/components/custom-text/styles";
import { Stack } from "expo-router";

export default function InstallShortcutLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: Colors.PRIMARY,
        headerTitleStyle: { color: "black", fontFamily: DEFAULT_FONT_FAMILY },
        headerBackTitleStyle: { fontFamily: DEFAULT_FONT_FAMILY },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="[shortcut]"
        options={{
          title: "Install Shortcut",
        }}
      />
    </Stack>
  );
}
