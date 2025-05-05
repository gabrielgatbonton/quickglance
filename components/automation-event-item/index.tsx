import pressedOpacity from "@/utils/pressedOpacity";
import { Pressable, View } from "react-native";
import CustomText from "../custom-text";
import { AutomationEventData } from "@/constants/types";
import styles from "./styles";

type AutomationEventItemProps = {
  item: AutomationEventData;
};

export default function AutomationEventItem({
  item,
}: AutomationEventItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressedOpacity({ pressed })]}
    >
      <View style={styles.emojiContainer}>
        <CustomText style={styles.emoji}>{item.emoji}</CustomText>
      </View>
      <View style={styles.contentContainer}>
        <CustomText style={styles.label}>{item.label}</CustomText>
        <CustomText style={styles.description}>{item.description}</CustomText>
      </View>
    </Pressable>
  );
}
