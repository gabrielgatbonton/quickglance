import { Action } from "@/constants/types";
import { LinearGradient } from "expo-linear-gradient";
import { SymbolView } from "expo-symbols";
import { Pressable, useWindowDimensions, View } from "react-native";
import styles from "./styles";
import pressedOpacity from "@/utils/pressedOpacity";
import globalStyles from "@/assets/global-styles";
import CustomText from "../custom-text";

type ShortcutActionItemProps = {
  item: Action;
  onActionPress?: (action: Action) => void;
  onActionAdd?: (action: Action) => void;
};

export default function ShortcutActionItem({
  item,
  onActionPress,
  onActionAdd,
}: ShortcutActionItemProps) {
  const { width, height } = useWindowDimensions();
  const itemHeight = height * 0.13;
  const itemWidth = width / 2 - 19;

  return (
    <Pressable
      style={({ pressed }) => pressedOpacity({ pressed })}
      onPress={() => onActionPress?.(item)}
    >
      <LinearGradient
        colors={[item.gradientStart, item.gradientEnd]}
        style={[
          {
            height: itemHeight,
            width: itemWidth,
          },
          styles.contentContainer,
        ]}
      >
        <View style={globalStyles.rowBetween}>
          <SymbolView name={item.icon} size={30} tintColor="white" />
          <Pressable
            style={({ pressed }) => [
              globalStyles.transparentButton,
              pressedOpacity({ pressed }),
            ]}
            onPress={() => onActionAdd?.(item)}
          >
            <SymbolView name="plus" size={18} tintColor="white" weight="bold" />
          </Pressable>
        </View>

        <CustomText style={styles.label}>{item.name}</CustomText>
      </LinearGradient>
    </Pressable>
  );
}
