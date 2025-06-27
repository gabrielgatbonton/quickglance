import { Colors } from "@/assets/colors";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import InputErrorView from "../input-error-view";
import { IoniconName } from "../icon-view";

type AndroidTextInputProps = {
  label: string;
  icon?: IoniconName;
  handleUserInput: (item: string) => void;
  errorText?: string[];
  value?: string;
  isSecure?: boolean;
  iconFunction?: () => void;
  iconColor?: string;
};

export default function AndroidTextInput({
  label,
  icon,
  handleUserInput,
  errorText,
  value,
  isSecure,
  iconFunction,
  iconColor,
}: AndroidTextInputProps) {
  return (
    <View>
      <TextInput
        value={value}
        mode="outlined"
        label={label}
        activeOutlineColor={Colors.PRIMARY}
        outlineColor="lightgray"
        right={
          icon ? (
            <TextInput.Icon
              icon={icon}
              onPress={() => iconFunction?.()}
              color={iconColor}
            />
          ) : null
        }
        onChangeText={(value) => handleUserInput(value)}
        error={errorText ? true : false}
        secureTextEntry={isSecure}
      />
      <InputErrorView errors={errorText} />
    </View>
  );
}
