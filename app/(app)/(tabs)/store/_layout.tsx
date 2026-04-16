import { Colors } from "@/assets/colors";
import CustomHeader from "@/components/custom-header";
import { DEFAULT_FONT_FAMILY } from "@/components/custom-text/styles";
import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function StoreLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <CustomHeader headerTitle="Shortcut Gallery" />,
          contentStyle: { backgroundColor: "white" },
          headerShadowVisible: Platform.OS === "ios",
        }}
      />
      <Stack.Screen
        name="[service]"
        options={{
          headerBackTitle: "Services",
          headerLargeTitle: true,
          headerTintColor: Colors.PRIMARY,
          headerLargeTitleStyle: {
            color: "black",
            fontFamily: DEFAULT_FONT_FAMILY,
          },
          headerTitleStyle: { color: "black", fontFamily: DEFAULT_FONT_FAMILY },
          headerBackTitleStyle: { fontFamily: DEFAULT_FONT_FAMILY },
          headerTransparent: Platform.OS === "ios",
          headerBlurEffect: "prominent",
          contentStyle: { backgroundColor: "white" },
        }}
      /> 
    </Stack>
  );
}
