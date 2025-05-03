import { TextInput, TextInputProps, View } from "react-native";
import styles from "./styles";
import CustomText from "../custom-text";
import { Colors } from "@/assets/colors";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

export type CustomTextInputProps = TextInputProps & {
  label: string;
  color?: string;
  useBottomSheetInput?: boolean;
};

export default function CustomTextInput({
  label,
  color = Colors.PRIMARY,
  useBottomSheetInput = false,
  ...textInputProps
}: CustomTextInputProps) {
  const TextInputComponent = useBottomSheetInput
    ? BottomSheetTextInput
    : TextInput;

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <CustomText style={styles.label}>{label}</CustomText>
      </View>

      <View style={styles.inputContainer}>
        <TextInputComponent
          selectionColor={color}
          cursorColor={color}
          {...textInputProps}
        />
      </View>
    </View>
  );
}
