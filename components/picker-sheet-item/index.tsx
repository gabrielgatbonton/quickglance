import { PickerItem } from "@/constants/types";
import pressedOpacity from "@/utils/pressedOpacity";
import { Pressable, StyleProp, TextStyle } from "react-native";
import styles from "./styles";
import CustomText from "../custom-text";
import { SymbolView } from "expo-symbols";
import { Colors } from "@/assets/colors";

type PickerSheetItemProps = {
  item: PickerItem;
  isSelected?: boolean;
  selectedColor?: string;
  onOptionPress?: () => void;
  labelStyle?: StyleProp<TextStyle>;
};

export default function PickerSheetItem({
  item,
  isSelected = false,
  selectedColor = Colors.PRIMARY,
  onOptionPress,
  labelStyle,
}: PickerSheetItemProps) {
  return (
    <Pressable
      onPress={onOptionPress}
      style={({ pressed }) => [
        pressedOpacity({ pressed }),
        styles.itemContainer,
      ]}
    >
      {item.label && (
        <CustomText
          style={[
            labelStyle,
            styles.itemLabel,
            {
              color: isSelected ? selectedColor : "",
            },
          ]}
        >
          {item.label}
        </CustomText>
      )}

      {item.ItemComponent
        ? item.ItemComponent(item)
        : isSelected && (
            <IconView
              name={["checkmark", "checkmark"]}
              size={20}
              color={color}
            />
          )}
    </Pressable>
  );
}
