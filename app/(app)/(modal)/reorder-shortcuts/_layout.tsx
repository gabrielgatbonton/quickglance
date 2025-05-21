import { Colors } from "@/assets/colors";
import CustomLink from "@/components/custom-link";
import { DEFAULT_FONT_FAMILY } from "@/components/custom-text/styles";
import { router, Stack } from "expo-router";
import { Platform, Pressable } from "react-native";
import IconView from "@/components/icon-view";
import pressedOpacity from "@/utils/pressedOpacity";

export default function ReorderShortcutsLayout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: Platform.OS === "ios",
        headerBlurEffect: "prominent",
        headerTitleStyle: { fontFamily: DEFAULT_FONT_FAMILY },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Reorder Shortcuts",
          headerLeft: () =>
            Platform.OS === "ios" ? (
              <CustomLink
                title="Cancel"
                onPress={() => router.back()}
                color={Colors.PRIMARY}
              />
            ) : (
              <Pressable
                style={({ pressed }) => pressedOpacity({ pressed })}
                onPress={() => router.back()}
              >
                <IconView name={[, "arrow-back"]} color={Colors.SECONDARY} />
              </Pressable>
            ),
        }}
      />
    </Stack>
  );
}
