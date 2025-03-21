import { Colors } from "@/assets/colors";
import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Settings",
          headerLargeTitle: true,
          headerLargeTitleShadowVisible: false,
          contentStyle: { backgroundColor: "white" },
        }}
      />
      <Stack.Screen
        name="(uploaded-shortcuts)/uploaded-shortcuts"
        options={{
          title: "Uploaded Shortcuts",
          headerTintColor: Colors.PRIMARY,
          headerTitleStyle: { color: "black" },
        }}
      />
    </Stack>
  );
}
