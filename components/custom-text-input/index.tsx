import { TextInput, TextInputProps, View } from "react-native";
import styles from "./styles";
import CustomText from "../custom-text";

export type CustomTextInputProps = TextInputProps & {
  label: string;
};

export default function CustomTextInput({
  label,
  ...textInputProps
}: CustomTextInputProps) {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <CustomText style={styles.label}>{label}</CustomText>
      </View>

      <View style={styles.inputContainer}>
        <TextInput {...textInputProps} />
      </View>
    </View>
  );
}
