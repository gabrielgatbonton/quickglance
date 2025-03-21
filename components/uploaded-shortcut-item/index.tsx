import { Shortcut } from "@/utils/types";
import { SymbolView } from "expo-symbols";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";
import pressedBgColor from "@/utils/pressedBgColor";

export default function UploadedShortcutItem({ item }: { item: Shortcut }) {
  return (
    <Pressable style={({ pressed }) => pressedBgColor({ pressed })}>
      <View style={styles.container}>
        <Text>{item.name}</Text>
        <SymbolView name="chevron.right" size={12} tintColor="gray" />
      </View>
    </Pressable>
  );
}
