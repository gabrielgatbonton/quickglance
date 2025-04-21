import { DEFAULT_FONT_FAMILY } from "@/components/custom-text/styles";
import { Stack } from "expo-router";

export default function AutomationLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Automation",
          headerLargeTitle: true,
          headerLargeTitleShadowVisible: false,
          headerLargeTitleStyle: { fontFamily: DEFAULT_FONT_FAMILY },
          headerTitleStyle: { fontFamily: DEFAULT_FONT_FAMILY },
          headerTintColor: "black",
          contentStyle: { backgroundColor: "white" },
        }}
      />
    </Stack>
  );
}
