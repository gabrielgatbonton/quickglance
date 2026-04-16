import CustomHeader from "@/components/custom-header";
import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          contentStyle: { backgroundColor: "white" },
          headerShadowVisible: Platform.OS === "ios",
          header: () => <CustomHeader headerTitle="QuickGlance" />,
        }}
      />
    </Stack>
  );
}
