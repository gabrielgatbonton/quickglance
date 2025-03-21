import { Colors } from "@/assets/colors";
import { WelcomeData } from "@/utils/types";
import { SymbolView } from "expo-symbols";
import { Text, View } from "react-native";
import styles from "./styles";

export default function WelcomeItem({ item }: { item: WelcomeData }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <SymbolView name={item.icon} size={40} tintColor={Colors.PRIMARY} />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.label}>{item.label}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
}
