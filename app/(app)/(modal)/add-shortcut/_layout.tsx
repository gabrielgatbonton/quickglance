import { Colors } from "@/assets/colors";
import CustomLink from "@/components/custom-link";
import { DEFAULT_FONT_FAMILY } from "@/components/custom-text/styles";
import IconView from "@/components/icon-view";
import useAddShortcutStore from "@/stores/useAddShortcutStore";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { Platform, Pressable } from "react-native";
import { PaperProvider } from "react-native-paper";
import pressedOpacity from "@/utils/pressedOpacity";

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

        <Stack.Screen
          name="edit-details"
          options={{
            title: Platform.OS === "ios" ? "Edit Details" : "Shortcut Details",
            presentation: "card",
            headerBackTitle: "Back",
          }}
        />
      </Stack>
    </PaperProvider>
  );
}
