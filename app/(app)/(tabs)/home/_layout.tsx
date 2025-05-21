import { DEFAULT_FONT_FAMILY } from "@/components/custom-text/styles";
import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "QuickGlance",
          headerLargeTitle: true,
          headerLargeTitleShadowVisible: false,
          headerLargeTitleStyle: { fontFamily: DEFAULT_FONT_FAMILY },
          headerTitleStyle: { fontFamily: DEFAULT_FONT_FAMILY },
          headerTintColor: "black",
          contentStyle: { backgroundColor: "white" },
          headerShadowVisible: Platform.OS === "ios",
          headerTitleAlign: Platform.OS === "ios" ? "left" : "center",
        }}
      />
    </Stack>
  );
}
