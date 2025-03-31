import { Colors } from "@/assets/colors";
import useAddShortcutStore from "@/stores/useAddShortcutStore";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { Button } from "react-native";

export default function AddShortcutLayout() {
  const resetAll = useAddShortcutStore((state) => state.resetAll);

  // Reset the store when the component unmounts
  useEffect(() => {
    return () => {
      resetAll();
    };
  }, [resetAll]);

  return (
    <Stack
      screenOptions={{
        headerTintColor: Colors.PRIMARY,
        headerTitleStyle: { color: "black" },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Add Shortcut",
          headerLeft: () => (
            <Button
              title="Cancel"
              onPress={() => router.back()}
              color={Colors.PRIMARY}
            />
          ),
          headerRight: () => (
            <Button
              title="Next"
              onPress={() => router.push("/edit-details")}
              color={Colors.PRIMARY}
            />
          ),
        }}
      />
      <Stack.Screen
        name="edit-details"
        options={{
          title: "Edit Details",
          presentation: "card",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
}
