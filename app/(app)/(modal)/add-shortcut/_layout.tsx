import { Colors } from "@/assets/colors";
import CustomLink from "@/components/custom-link";
import { DEFAULT_FONT_FAMILY } from "@/components/custom-text/styles";
import useAddShortcutStore from "@/stores/useAddShortcutStore";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";
import { PaperProvider } from "react-native-paper";

export default function AddShortcutLayout() {
  const resetAll = useAddShortcutStore((state) => state.resetAll);

  // Reset the store when the component unmounts
  useEffect(() => {
    return () => {
      resetAll();
    };
  }, [resetAll]);

  return (
    <PaperProvider>
      <Stack
        screenOptions={{
          headerTintColor: Platform.OS === "ios" ? Colors.PRIMARY : "black",
          headerTitleStyle: { color: "black", fontFamily: DEFAULT_FONT_FAMILY },
          headerBackTitleStyle: { fontFamily: DEFAULT_FONT_FAMILY },
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: Platform.OS === "ios" ? "Add Shortcut" : "Create Shortcut",
            ...(Platform.OS === "ios" && {
              headerLeft: () => (
                <CustomLink
                  title="Cancel"
                  onPress={() => router.back()}
                  color={Colors.PRIMARY}
                />
              ),
            }),
          }}
        />

        <Stack.Screen
          name="edit-details"
          options={{
            title: Platform.OS === "ios" ? "Edit Details" : "Create Shortcut",
            presentation: "card",
            headerBackTitle: "Back",
          }}
        />
      </Stack>
    </PaperProvider>
  );
}
