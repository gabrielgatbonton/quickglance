import { Colors } from "@/assets/colors";
import { DEFAULT_FONT_FAMILY } from "@/components/custom-text/styles";
import IconView from "@/components/icon-view";
import pressedOpacity from "@/utils/pressedOpacity";
import { router, Stack } from "expo-router";
import { Platform, Pressable } from "react-native";

export default function EditProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: Platform.OS === "ios",
        headerBlurEffect: "prominent",
        headerTitleStyle: { fontFamily: DEFAULT_FONT_FAMILY },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Edit Profile",
          headerLeft: () => (
            <Pressable
              style={({ pressed }) => pressedOpacity({ pressed })}
              onPress={() => router.back()}
            >
              <IconView name={["xmark", "close"]} size={21} color={Colors.PRIMARY} /> 
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
