import { Shortcut } from "@/constants/types";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, useWindowDimensions, View } from "react-native";
import styles from "./styles";
import CustomText from "../custom-text";
import pressedOpacity from "@/utils/pressedOpacity";
import Animated, { ZoomIn } from "react-native-reanimated";
import IconView from "../icon-view";

type OrderShortcutItemProps = {
  item: Shortcut;
  index?: number;
  onShortcutPress?: (item: Shortcut) => void;
};

export default function OrderShortcutItem({
  item,
  index,
  onShortcutPress,
}: OrderShortcutItemProps) {
  const { height } = useWindowDimensions();
  const itemHeight = height * 0.14;

  return (
    <Pressable
      onPress={() => onShortcutPress?.(item)}
      style={({ pressed }) => [
        { height: itemHeight },
        pressedOpacity({ pressed, opacity: 0.6 }),
      ]}
    >
      <LinearGradient
        colors={[item.gradientStart, item.gradientEnd]}
        style={styles.container}
      >
        <View style={styles.contentContainer}>
          <IconView name={[item.icon, item.androidIcon]} size={30} color="white" />
          <CustomText style={styles.label}>{item.name}</CustomText>
        </View>

        {index && (
          <Animated.View
            entering={ZoomIn.duration(100)}
            style={[
              {
                backgroundColor: item.gradientEnd,
              },
              styles.indexContainer,
            ]}
          >
            <CustomText style={styles.index}>{index}</CustomText>
          </Animated.View>
        )}
      </LinearGradient>
    </Pressable>
  );
}
