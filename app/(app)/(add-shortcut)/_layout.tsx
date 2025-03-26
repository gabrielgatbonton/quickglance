import { Colors } from "@/assets/colors";
import { router, Stack } from "expo-router";
import { Button } from "react-native";

export default function AddShortcutLayout() {
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
          presentation: "modal",
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
