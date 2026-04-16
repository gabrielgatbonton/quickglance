import CustomHeader from "@/components/custom-header";
import { DEFAULT_FONT_FAMILY } from "@/components/custom-text/styles";
import { Stack, router } from "expo-router";
import { Platform } from "react-native";

export default function AutomationLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => (
            <CustomHeader
              headerTitle="Automation"
              rightIcon={{
                icons: ["plus.circle.fill", "add-circle"],
                iconFunction: () =>
                  router.navigate("/(app)/(modal)/add-automation"),
              }}
            />
          ),
          contentStyle: { backgroundColor: "white" },
          headerShadowVisible: Platform.OS === "ios",
        }}
      />
    </Stack>
  );
}
