import { DimensionValue, View } from "react-native";
import styles from "./styles";

type LineSeparatorProps = {
  leading?: number;
  trailing?: number;
  width?: DimensionValue;
};

export default function LineSeparator({
  leading,
  trailing,
  width,
}: LineSeparatorProps) {
  return (
    <View
      style={[styles.container, { left: leading, right: trailing, width }]}
    />
  );
}
