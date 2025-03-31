import { Colors } from "@/assets/colors";
import { router, Stack } from "expo-router";
import { Button } from "react-native";

export default function ReorderShortcutsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Reorder Shortcuts",
          headerLeft: () => (
            <Button
              title="Cancel"
              onPress={() => router.back()}
              color={Colors.PRIMARY}
            />
          ),
        }}
      />
    </Stack>
  );
}
