import { DEFAULT_FONT_FAMILY } from "@/components/custom-text/styles";
import { Stack } from "expo-router";

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
          contentStyle: { backgroundColor: "white" },
        }}
      />
    </Stack>
  );
}
