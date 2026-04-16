import { Colors } from "@/assets/colors";
import { DEFAULT_FONT_FAMILY } from "@/components/custom-text/styles";
import { Stack } from "expo-router";

export default function InstallShortcutLayout() {
  return (
    <Stack>
      <Stack.Screen name="[shortcut]" />
    </Stack>
  );
}
