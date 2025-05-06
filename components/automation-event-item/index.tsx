import pressedOpacity from "@/utils/pressedOpacity";
import { Pressable, View } from "react-native";
import CustomText from "../custom-text";
import { AutomationEvent } from "@/constants/types";
import styles from "./styles";

type AutomationEventItemProps = {
  item: AutomationEvent;
  onEventPress?: (item: AutomationEvent) => void;
};

export default function AutomationEventItem({
  item,
  onEventPress,
}: AutomationEventItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressedOpacity({ pressed })]}
      onPress={() => onEventPress?.(item)}
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
