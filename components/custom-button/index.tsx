import pressedOpacity from "@/utils/pressedOpacity";
import {
  ActivityIndicator,
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
  loading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function CustomButton({
  title,
  color = Colors.PRIMARY,
  loading = false,
  onPress,
  disabled,
  containerStyle = {},
  textStyle = {},
  ...buttonProps
}: CustomButtonProps) {
  return (
    <Pressable
      {...buttonProps}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        pressedOpacity({ pressed }),
        disabled && { opacity: 0.5 },
        buttonProps?.style as StyleProp<ViewStyle>,
      ]}
    >
      <View
        style={[styles.container, containerStyle, { backgroundColor: color }]}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <CustomText style={[styles.title, textStyle]}>{title}</CustomText>
        )}
      </View>
    </Pressable>
  );
}
