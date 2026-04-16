import pressedOpacity from "@/utils/pressedOpacity";
import { Pressable, View } from "react-native";
import CustomText from "../custom-text";
import { AutomationCondition } from "@/constants/types";
import styles from "./styles";
import { Colors } from "@/assets/colors";

type AutomationConditionItemProps = {
  item: AutomationCondition;
  onConditionPress?: (item: AutomationCondition) => void;
  activeCondition: string;
};

export default function AutomationConditionItem({
  item,
  onConditionPress,
  activeCondition,
}: AutomationConditionItemProps) {
  const selectedItem = activeCondition === item.name;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: !item.is_active
            ? "#d6d6d6"
            : selectedItem
              ? Colors.PRIMARY
              : "white",
        },
        pressedOpacity({ pressed }),
      ]}
      onPress={() => onConditionPress?.(item)}
      disabled={!item.is_active}
    >
      <View
        style={[
          styles.emojiContainer,
          { backgroundColor: selectedItem ? "white" : Colors.NEUTRAL },
        ]}
      >
        <CustomText style={styles.emoji}>{item.emoji}</CustomText>
      </View>
      <View style={styles.contentContainer}>
        <CustomText
          style={[
            styles.name,
            {
              color: !item.is_active
                ? Colors.SECONDARY
                : selectedItem
                  ? "white"
                  : "black",
            },
          ]}
        >
          {item.name}
        </CustomText>
        <CustomText style={[ styles.description, { color: selectedItem ? "white" : Colors.SECONDARY }]}>
          {item.description}
        </CustomText>
      </View>
    </Pressable>
  );
}
