import { Text, TextProps } from "react-native";
import styles from "./styles";

export default function CustomText(props: TextProps) {
  return <Text {...props} style={[styles.text, props.style]} />;
}
