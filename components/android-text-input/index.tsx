import { Colors } from "@/assets/colors";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import InputErrorView from "../input-error-view";

type AndroidTextInputProps = {
  label: string;
  icon?: string;
  handleUserInput: (item: string) => void;
  errorText?: string[];
  value?: string
};

export default function AndroidTextInput({
  label,
  icon = "",
  handleUserInput,
  errorText,
  value
}: AndroidTextInputProps) {
  return (
    <View>
      <TextInput
      value={value}
        mode="outlined"
        label={label}
        activeOutlineColor={Colors.PRIMARY}
        outlineColor="lightgray"
        right={icon ? <TextInput.Icon icon={icon} /> : null}
        onChangeText={(value) => handleUserInput(value)}
        error={errorText ? true : false}
      />
      <InputErrorView errors={errorText} />
    </View>
  );
}
