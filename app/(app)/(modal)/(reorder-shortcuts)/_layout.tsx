import { Colors } from "@/assets/colors";
import CustomLink from "@/components/custom-link";
import { DEFAULT_FONT_FAMILY } from "@/components/custom-text/styles";
import { router, Stack } from "expo-router";

export default function ReorderShortcutsLayout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerBlurEffect: "prominent",
        headerTitleStyle: { fontFamily: DEFAULT_FONT_FAMILY },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Reorder Shortcuts",
          headerLeft: () => (
            <CustomLink
              title="Cancel"
              onPress={() => router.back()}
              color={Colors.PRIMARY}
            />
          ),
        }}
      />
    </Stack>
  );
}
