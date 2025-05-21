import { TextInput, View } from "react-native";
import styles from "./styles";
import CustomText from "../custom-text";
import { Colors } from "@/assets/colors";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { ComponentProps, Ref } from "react";

export type CustomTextInputProps = ComponentProps<typeof TextInput> & {
  label: string;
  color?: string;
  useBottomSheetInput?: boolean;
  ref: Ref<any>;
};

export default function CustomTextInput({
  label,
  color = Colors.PRIMARY,
  useBottomSheetInput = false,
  ref,
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
          ref={ref}
          selectionColor={color}
          cursorColor={color}
          {...textInputProps}
        />
      </View>
    </View>
  );
}
