import { Shortcut } from "@/constants/types";
import { SymbolView } from "expo-symbols";
import { Pressable, Text } from "react-native";
import styles from "./styles";
import pressedBgColor from "@/utils/pressedBgColor";

export default function UploadedShortcutItem({ item }: { item: Shortcut }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressedBgColor({ pressed })]}
    >
      <Text>{item.name}</Text>
      <SymbolView name="chevron.right" size={12} tintColor="gray" />
    </Pressable>
  );
}
