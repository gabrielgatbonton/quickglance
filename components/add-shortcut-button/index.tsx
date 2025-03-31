import pressedOpacity from "@/utils/pressedOpacity";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Pressable, PressableProps } from "react-native";
import styles from "./styles";

export default function AddShortcutButton(props: PressableProps) {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [styles.container, pressedOpacity({ pressed })]}
      onPress={() => router.navigate("/(modal)/(add-shortcut)")}
    >
      <SymbolView name="plus" tintColor="white" />
    </Pressable>
  );
}
