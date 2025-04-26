import { Colors } from "@/assets/colors";
import CustomLink from "@/components/custom-link";
import { DEFAULT_FONT_FAMILY } from "@/components/custom-text/styles";
import { router, Stack } from "expo-router";

export default function AddAutomationLayout() {
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
        name="index"
        options={{
          title: "Add Automation",
          headerLeft: () => (
            <CustomLink
              title="Cancel"
              onPress={() => router.back()}
              color={Colors.PRIMARY}
            />
          ),
          headerRight: () => (
            <CustomLink
              title="Done"
              bold
              onPress={() => {
                router.back();
                console.log("Automation saved!");
              }}
              color={Colors.PRIMARY}
            />
          ),
        }}
      />
    </Stack>
  );
}
