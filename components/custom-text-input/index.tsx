import { TextInput, TextInputProps, View } from "react-native";
import styles from "./styles";
import CustomText from "../custom-text";
import { Colors } from "@/assets/colors";

export type CustomTextInputProps = TextInputProps & {
  label: string;
  color?: string;
};

export default function CustomTextInput({
  label,
  color = Colors.PRIMARY,
  ...textInputProps
}: CustomTextInputProps) {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <CustomText style={styles.label}>{label}</CustomText>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          selectionColor={color}
          cursorColor={color}
          {...textInputProps}
        />
      </View>
    </View>
  );
}
