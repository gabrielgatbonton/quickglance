import { Pressable, Text } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

type AddShortcutItemProps = {
  index: number;
  text: string;
  onPress: () => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function AddShortcutItem({
  index,
  text,
  onPress,
}: AddShortcutItemProps) {
  const rotation = Math.ceil(index / 2) * 5;
  const direction = index % 2 === 0 ? 1 : -1;
  const rotate = `${rotation * direction}deg`;

  return (
    <AnimatedPressable
      key={index}
      onPress={onPress}
      entering={FadeIn.springify().delay(index * 100)}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        transform: [{ rotate }],
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 25,
          color: "white",
        }}
      >
        {text}
      </Text>
    </AnimatedPressable>
  );
}
