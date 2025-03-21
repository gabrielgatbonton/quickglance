import { View } from "react-native";
import styles from "./styles";

type LineSeparatorProps = {
  leading?: number;
  trailing?: number;
};

export default function LineSeparator({
  leading,
  trailing,
}: LineSeparatorProps) {
  return (
    <View style={[styles.container, { left: leading, right: trailing }]} />
  );
}
