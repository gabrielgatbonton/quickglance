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
import convertHexToRGBA from "@/utils/colorConverter";

type RunningActionItemProps = {
  item: RunningAction;
};

// This is a workaround for the style object bug on Android
Animated.addWhitelistedUIProps({ shadowOffset: true });

export default function RunningActionItem({ item }: RunningActionItemProps) {
  const shadowColor = convertHexToRGBA(item.gradientStart, 0.25);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      shadowColor: shadowColor,
      shadowOffset: {
        width: 0,
        height: withTiming(item.isCurrent ? 3 : 0),
      },
      shadowOpacity: withTiming(item.isCurrent ? 1 : 0),
      shadowRadius: withTiming(item.isCurrent ? 20 : 0),
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
