import { RunningAction } from "@/constants/types";
import { ActivityIndicator, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import styles from "./styles";
import CustomText from "../custom-text";
import { Colors } from "@/assets/colors";
import convertHexToRGBA from "@/utils/colorConverter";
import IconView from "../icon-view";

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
        <IconView name={[item.icon, item.androidIcon]} color={Colors.PRIMARY} size={30} />
        <CustomText style={styles.name}>{item.name}</CustomText>
      </Animated.View>

      {item.isCompleted ? (
        <IconView name={["checkmark.circle.fill", "checkmark-circle"]} color={Colors.SUCCESS} size={36} />
      ) : item.isFailed ? (
        <IconView name={["exclamationmark.triangle.fill", "warning"]} color={Colors.ERROR} size={36} />
      ) : (
        <ActivityIndicator size="large" animating={item.isCurrent} color={Colors.PRIMARY} />
      )}
    </View>
  );
}
