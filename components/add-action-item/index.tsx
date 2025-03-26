import { Action } from "@/constants/types";
import { Pressable, Text, useWindowDimensions, View } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";
import styles from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { SymbolView } from "expo-symbols";
import globalStyles from "@/assets/global-styles";
import pressedOpacity from "@/utils/pressedOpacity";

type AddActionItemProps = {
  item: Action;
  index: number;
  onActionDelete?: (action: Action) => void;
};

export default function AddActionItem({
  item,
  index,
  onActionDelete,
}: AddActionItemProps) {
  const { height } = useWindowDimensions();
  const itemHeight = height * 0.13;

  return (
    <View style={[{ height: itemHeight }, styles.container]}>
      <View style={styles.indexContainer}>
        <Text style={styles.indexText}>{index + 1}</Text>
      </View>

      <Animated.View
        entering={ZoomIn.duration(150)}
        style={styles.animatedContainer}
      >
        <LinearGradient
          colors={[item.gradientStart, item.gradientEnd]}
          style={styles.contentContainer}
        >
          <View style={globalStyles.rowBetween}>
            <SymbolView name={item.icon} size={30} tintColor="white" />

            <Pressable
              style={({ pressed }) => [
                globalStyles.transparentButton,
                pressedOpacity({ pressed }),
              ]}
              onPress={() => onActionDelete?.(item)}
            >
              <SymbolView name="xmark" size={10} tintColor="white" />
            </Pressable>
          </View>

          <Text style={styles.label}>{item.name}</Text>
        </LinearGradient>
      </Animated.View>
    </View>
  );
}
