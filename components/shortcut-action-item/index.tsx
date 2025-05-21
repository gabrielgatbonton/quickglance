import { Action } from "@/constants/types";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, useWindowDimensions, View } from "react-native";
import styles from "./styles";
import pressedOpacity from "@/utils/pressedOpacity";
import globalStyles from "@/assets/global-styles";
import CustomText from "../custom-text";
import IconView from "../icon-view";

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
          <IconView name={[item.icon, item.androidIcon]} color="white" size={30} />
          <Pressable
            style={({ pressed }) => [
              globalStyles.transparentButton,
              pressedOpacity({ pressed }),
            ]}
            onPress={() => onActionAdd?.(item)}
          >
            <IconView name={["plus", "add"]} color="white" size={18} />
          </Pressable>
        </View>

        <CustomText style={styles.label}>{item.name}</CustomText>
      </LinearGradient>
    </Pressable>
  );
}
