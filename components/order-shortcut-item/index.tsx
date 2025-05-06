import { Shortcut } from "@/constants/types";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, useWindowDimensions, View } from "react-native";
import styles from "./styles";
import { SymbolView } from "expo-symbols";
import CustomText from "../custom-text";
import pressedOpacity from "@/utils/pressedOpacity";
import Animated, { ZoomIn } from "react-native-reanimated";

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
  const itemHeight = height * 0.1;

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
          <SymbolView name={item.icon} size={30} tintColor="white" />
          <CustomText style={styles.label}>{item.name}</CustomText>
        </View>

        {index && (
          <Animated.View
            entering={ZoomIn.duration(100)}
            style={{
              backgroundColor: item.gradientEnd,
              borderRadius: 15,
              width: 25,
              height: 25,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CustomText
              style={{ fontWeight: "bold", color: "white", paddingBottom: 1 }}
            >
              {index}
            </CustomText>
          </Animated.View>
        )}
      </LinearGradient>
    </Pressable>
  );
}
