import { Colors } from "@/assets/colors";
import { DEFAULT_FONT_FAMILY } from "@/components/custom-text/styles";
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
          headerLargeTitleStyle: { fontFamily: DEFAULT_FONT_FAMILY },
          headerTitleStyle: { fontFamily: DEFAULT_FONT_FAMILY },
          contentStyle: { backgroundColor: "white" },
        }}
      />
      <Stack.Screen
        name="uploaded-shortcuts"
        options={{
          title: "Uploaded Shortcuts",
          headerTintColor: Colors.PRIMARY,
          headerTitleStyle: { color: "black", fontFamily: DEFAULT_FONT_FAMILY },
          headerBackTitleStyle: { fontFamily: DEFAULT_FONT_FAMILY },
        }}
      />
    </Stack>
  );
}
