import { Colors } from "@/assets/colors";
import CustomHeader from "@/components/custom-header";
import { DEFAULT_FONT_FAMILY } from "@/components/custom-text/styles";
import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          contentStyle: { backgroundColor: "white" },
          headerShadowVisible: Platform.OS === "ios",
          header: () => <CustomHeader headerTitle="Settings" />,
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
