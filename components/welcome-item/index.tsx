import { Colors } from "@/assets/colors";
import { WelcomeData } from "@/constants/types";
import { SymbolView } from "expo-symbols";
import { View } from "react-native";
import styles from "./styles";
import CustomText from "../custom-text";

export default function WelcomeItem({ item }: { item: WelcomeData }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <SymbolView name={item.icon} size={40} tintColor={Colors.PRIMARY} />
      </View>

      <View style={styles.contentContainer}>
        <CustomText style={styles.label}>{item.label}</CustomText>
        <CustomText style={styles.description}>{item.description}</CustomText>
      </View>
    </View>
  );
}
