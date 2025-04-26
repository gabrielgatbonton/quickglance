import { Colors } from "@/assets/colors";
import pressedOpacity from "@/utils/pressedOpacity";
import { router, Stack } from "expo-router";
import { SymbolView } from "expo-symbols";
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
              <SymbolView
                name="xmark.circle.fill"
                size={30}
                tintColor={Colors.SECONDARY}
              />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
