import { Colors } from "@/assets/colors";
import IconView from "@/components/icon-view";
import pressedOpacity from "@/utils/pressedOpacity";
import { router, Stack } from "expo-router";
import { Platform, Pressable } from "react-native";

export default function RunShortcutLayout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: Platform.OS === "ios",
        headerBlurEffect: "prominent",
        headerTitle: "",
      }}
    >
      <Stack.Screen
        name="[shortcut]"
        options={{
          headerRight: () => (
            <Pressable
              style={({ pressed }) => pressedOpacity({ pressed })}
              onPress={() => router.back()}
            >
              <IconView name={["xmark.circle.fill", "close-circle"]} size={30} color={Colors.SECONDARY} />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
