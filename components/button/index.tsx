import pressedOpacity from "@/utils/pressedOpacity";
import {
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import styles from "./styles";

type ButtonProps = PressableProps & {
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function Button({
  title,
  onPress,
  disabled,
  containerStyle = {},
  textStyle = {},
  ...buttonProps
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        pressedOpacity({ pressed }),
        disabled && { opacity: 0.5 },
      ]}
      {...buttonProps}
    >
      <View style={[styles.container, containerStyle]}>
        <Text style={[styles.title, textStyle]}>{title}</Text>
      </View>
    </Pressable>
  );
}
