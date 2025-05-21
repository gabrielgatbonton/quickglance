import { Pressable } from "react-native";
import CustomText from "../custom-text";
import IconView, { IoniconName } from "../icon-view";
import styles from "./style";
import pressedOpacity from "@/utils/pressedOpacity";

type AndroidItemSelectionProps<T = any> = {
  item: T;
  icon?: T;
  onPress: (item: T) => void;
};

export default function AndroidItemSelection<T = any>({
  item,
  icon,
  onPress,
}: AndroidItemSelectionProps<T>) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.itemContainer,
        pressedOpacity({ pressed }),
      ]}
      onPress={() => onPress(item)}
    >
      {icon && (
        <IconView
          name={["", icon as IoniconName]}
          buttonStyle={styles.iconContainer}
        />
      )}
      <CustomText>{String(item)}</CustomText>
    </Pressable>
  );
}
