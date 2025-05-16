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
import IconView from "../icon-view";
import { Ionicons } from "@expo/vector-icons";
import type { SFSymbol } from "expo-symbols";
type IoniconName = keyof typeof Ionicons.glyphMap;

type CustomButtonProps = PressableProps & {
  title: string;
  color?: string;
  loading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  buttonIcons?: [symbolName: SFSymbol | undefined, ioniconName: IoniconName | undefined];
};

export default function CustomButton({
  title,
  color = Colors.PRIMARY,
  loading = false,
  onPress,
  disabled,
  containerStyle = {},
  textStyle = {},
  buttonIcons,
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
          <>
            {buttonIcons && (
              <IconView name={[buttonIcons[0], buttonIcons[1]]} color="white" buttonStyle={styles.icon} />
            )}
            <CustomText style={[styles.title, textStyle]}>{title}</CustomText>
          </>
        )}
      </View>
    </Pressable>
  );
}
