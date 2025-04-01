import {
  ColorValue,
  Pressable,
  PressableProps,
  StyleProp,
  TextProps,
  ViewStyle,
} from "react-native";
import CustomText from "../custom-text";
import pressedOpacity from "@/utils/pressedOpacity";
import { Colors } from "@/assets/colors";
import styles from "./styles";

type CustomLinkProps = PressableProps & {
  title: string;
  color?: ColorValue;
  textProps?: TextProps;
};

export default function CustomLink({
  title,
  color = Colors.PRIMARY,
  disabled,
  textProps = {},
  ...props
}: CustomLinkProps) {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        pressedOpacity({ pressed }),
        props.style as StyleProp<ViewStyle>,
      ]}
    >
      <CustomText
        {...textProps}
        style={[
          styles.link,
          { color },
          disabled && { opacity: 0.5 },
          textProps.style,
        ]}
      >
        {title}
      </CustomText>
    </Pressable>
  );
}
