import { Colors } from "@/assets/colors";
import { View } from "react-native";
import { TextInput } from "react-native-paper";

type AndroidTextInputProps = {
  label: string;
  icon?: string;
  handleUserInput: (item: string) => void;
};

export default function AndroidTextInput({
  label,
  icon = "",
  handleUserInput,
}: AndroidTextInputProps) {
  return (
    <View>
      <TextInput
        mode="outlined"
        label={label}
        activeOutlineColor={Colors.PRIMARY}
        right={<TextInput.Icon icon={icon} />}
        onChangeText={(value) => handleUserInput(value)}
      />
    </View>
  );
}
