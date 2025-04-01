import { Colors } from "@/assets/colors";
import { useReducer, useState } from "react";
import { TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import styles from "./styles";
import InputErrorView from "@/components/input-error-view";
import { UserPassword, UserPasswordErrors } from "@/constants/types";
import reducerSetter from "@/utils/reducerSetter";
import globalStyles from "@/assets/global-styles";
import CustomButton from "@/components/custom-button";

const initialState: UserPassword = {
  password: "",
  password_confirmation: "",
};

export default function ChangePassword() {
  const [userPassword, setUserPassword] = useReducer(
    reducerSetter<UserPassword>,
    initialState,
  );
  const [errors, setErrors] = useState<UserPasswordErrors>(null);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      contentInsetAdjustmentBehavior="automatic"
    >
      <TextInput
        value={userPassword.password}
        onChangeText={(text) => setUserPassword({ password: text })}
        placeholder="Password"
        selectionColor={Colors.PRIMARY}
        style={[
          globalStyles.input,
          errors?.password && globalStyles.inputError,
        ]}
        secureTextEntry
      />
      <InputErrorView errors={errors?.password} />

      <TextInput
        value={userPassword.password_confirmation}
        onChangeText={(text) =>
          setUserPassword({ password_confirmation: text })
        }
        placeholder="Confirm Password"
        selectionColor={Colors.PRIMARY}
        style={[
          globalStyles.input,
          errors?.password_confirmation && globalStyles.inputError,
        ]}
        secureTextEntry
      />
      <InputErrorView errors={errors?.password_confirmation} />

      <CustomButton
        title="Save"
        onPress={() => console.log("Password saved!", { userPassword })}
      />
    </KeyboardAwareScrollView>
  );
}
