import { Shortcut } from "@/constants/types";
import { LinearGradient } from "expo-linear-gradient";
import { SymbolView } from "expo-symbols";
import { Text, useWindowDimensions, View } from "react-native";
import styles from "./styles";

export default function ReorderShortcutItem({ item }: { item: Shortcut }) {
  const { height } = useWindowDimensions();
  const itemHeight = height * 0.1;

  return (
    <View style={{ height: itemHeight }}>
      <LinearGradient
        colors={[item.gradientStart, item.gradientEnd]}
        style={styles.container}
      >
        <View style={styles.contentContainer}>
          <SymbolView name={item.icon} size={30} tintColor="white" />
          <Text style={styles.label}>{item.name}</Text>
        </View>

        <SymbolView name="line.3.horizontal" tintColor="white" />
      </LinearGradient>
    </View>
  );
}
