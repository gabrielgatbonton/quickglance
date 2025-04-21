import { View } from "react-native";
import CustomText from "../custom-text";
import styles from "./styles";
import PickerSheet, { PickerSheetProps } from "../picker-sheet";

export type CustomPickerSelectProps = PickerSheetProps & {
  label: string;
};

export default function CustomPicker({
  label,
  ...pickerProps
}: CustomPickerSelectProps) {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <CustomText style={styles.label}>{label}</CustomText>
      </View>

      <View style={styles.pickerContainer}>
        <PickerSheet {...pickerProps} />
      </View>
    </View>
  );
}
