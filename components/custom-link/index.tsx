import {
  ColorValue,
  Pressable,
  PressableProps,
  StyleProp,
  TextProps,
  TextStyle,
  ViewStyle,
} from "react-native";
import CustomText from "../custom-text";
import pressedOpacity from "@/utils/pressedOpacity";
import { Colors } from "@/assets/colors";
import styles from "./styles";

type CustomLinkProps = PressableProps & {
  title: string;
  bold?: boolean;
  color?: ColorValue;
  textProps?: TextProps;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function CustomLink({
  title,
  bold = false,
  color = Colors.PRIMARY,
  disabled,
  textProps = {},
  containerStyle = {},
  textStyle = {},
  ...props
}: CustomLinkProps) {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [pressedOpacity({ pressed }), containerStyle]}
      disabled={disabled}
    >
      <CustomText
        {...textProps}
        style={[
          styles.link,
          { color },
          bold && { fontWeight: "bold" },
          disabled && { opacity: 0.5 },
          textStyle,
        ]}
      >
        {title}
      </CustomText>
    </Pressable>
  );
}
