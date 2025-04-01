import pressedOpacity from "@/utils/pressedOpacity";
import {
  Pressable,
  PressableProps,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import styles from "./styles";
import { Colors } from "@/assets/colors";
import CustomText from "../custom-text";

type CustomButtonProps = PressableProps & {
  title: string;
  color?: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function CustomButton({
  title,
  color = Colors.PRIMARY,
  onPress,
  disabled,
  containerStyle = {},
  textStyle = {},
  ...buttonProps
}: CustomButtonProps) {
  return (
    <View style={containerStyle}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => [
          pressedOpacity({ pressed }),
          disabled && { opacity: 0.5 },
        ]}
        {...buttonProps}
      >
        <View style={[styles.container, { backgroundColor: color }]}>
          <CustomText style={[styles.title, textStyle]}>{title}</CustomText>
        </View>
      </Pressable>
    </View>
  );
}
