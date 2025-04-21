import { RunningAction } from "@/constants/types";
import { ActivityIndicator, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import styles from "./styles";
import CustomText from "../custom-text";
import { SymbolView } from "expo-symbols";
import { Colors } from "@/assets/colors";

type RunningActionItemProps = {
  item: RunningAction;
};

export default function RunningActionItem({ item }: RunningActionItemProps) {
  const animatedStyles = useAnimatedStyle(() => {
    return {
      shadowColor: "rgba(182, 157, 247, 0.25)",
      shadowOffset: {
        width: 0,
        height: withTiming(item.isCurrent ? 3 : 0),
      },
      shadowOpacity: withTiming(item.isCurrent ? 1 : 0),
      shadowRadius: withTiming(item.isCurrent ? 26 : 0),
    };
  });

  return (
    <View style={styles.actionContainer}>
      <Animated.View style={[styles.actionContentContainer, animatedStyles]}>
        <SymbolView name={item.icon} size={30} tintColor={Colors.PRIMARY} />
        <CustomText style={styles.name}>{item.name}</CustomText>
      </Animated.View>

      {item.isCompleted ? (
        <SymbolView
          name="checkmark.circle.fill"
          size={36}
          tintColor={Colors.SUCCESS}
        />
      ) : (
        <ActivityIndicator size="large" animating={item.isCurrent} />
      )}
    </View>
  );
}
