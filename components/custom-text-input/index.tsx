import { Text, TextInput, TextInputProps, View } from "react-native";
import styles from "./styles";

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
        <Text style={styles.label}>{label}</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput {...textInputProps} />
      </View>
    </View>
  );
}
