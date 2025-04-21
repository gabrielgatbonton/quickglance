import { Pressable } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type PageControlDotProps = {
  size: number;
  isCurrent: boolean;
  onPress?: () => void;
  activeColor: string;
  inactiveColor: string;
};

export default function PageControlDot({
  size,
  isCurrent,
  onPress,
  activeColor,
  inactiveColor,
}: PageControlDotProps) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(isCurrent ? activeColor : inactiveColor, {
        duration: 150,
        easing: Easing.inOut(Easing.ease),
      }),
    };
  });

  return (
    <Pressable hitSlop={5} onPress={onPress}>
      <Animated.View
        style={[
          {
            height: size,
            width: size,
            borderRadius: size / 2,
          },
          animatedStyle,
        ]}
      />
    </Pressable>
  );
}
