import pressedOpacity from "@/utils/pressedOpacity";
import { Pressable, View } from "react-native";
import CustomText from "../custom-text";
import { AutomationCondition } from "@/constants/types";
import styles from "./styles";

type AutomationConditionItemProps = {
  item: AutomationCondition;
  onConditionPress?: (item: AutomationCondition) => void;
};

export default function AutomationConditionItem({
  item,
  onConditionPress,
}: AutomationConditionItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressedOpacity({ pressed })]}
      onPress={() => onConditionPress?.(item)}
    >
      <View style={styles.emojiContainer}>
        <CustomText style={styles.emoji}>{item.emoji}</CustomText>
      </View>
      <View style={styles.contentContainer}>
        <CustomText style={styles.name}>{item.name}</CustomText>
        <CustomText style={styles.description}>{item.description}</CustomText>
      </View>
    </Pressable>
  );
}
