import { Colors } from "@/assets/colors";
import { router, useNavigation } from "expo-router";
import { useLayoutEffect, useReducer, useState } from "react";
import { Button, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import styles from "./styles";
import InputErrorView from "@/components/input-error-view";
import { UserPassword, UserPasswordErrors } from "@/constants/types";
import reducerSetter from "@/utils/reducerSetter";

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

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Save"
          onPress={() => {
            router.back();
            console.log("Password saved!", userPassword);
          }}
          color={Colors.PRIMARY}
        />
      ),
    });
  }, [navigation, userPassword]);

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
        style={[styles.input, errors?.password && styles.inputError]}
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
          styles.input,
          errors?.password_confirmation && styles.inputError,
        ]}
        secureTextEntry
      />
      <InputErrorView errors={errors?.password_confirmation} />
    </KeyboardAwareScrollView>
  );
}
