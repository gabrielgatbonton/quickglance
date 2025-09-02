import { Stack, router } from "expo-router";
import { Platform, Pressable } from "react-native";
import IconView from "@/components/icon-view";
import { Colors } from "@/assets/colors";
import pressedOpacity from "@/utils/pressedOpacity";

export default function RunAutomationLayout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: Platform.OS === "ios",
        headerBlurEffect: "prominent",
        headerTitle: "",
      }}
    >
      <Stack.Screen
        name="[automation]"
        options={{
          headerRight: () => (
            <Pressable
              style={({ pressed }) => pressedOpacity({ pressed })}
              onPress={() => router.back()}
            >
              <IconView
                name={["xmark.circle.fill", "close-circle"]}
                size={30}
                color={Colors.SECONDARY}
              />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
