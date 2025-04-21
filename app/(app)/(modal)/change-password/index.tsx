import { Colors } from "@/assets/colors";
import { useReducer, useState } from "react";
import { Alert, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import styles from "./styles";
import InputErrorView from "@/components/input-error-view";
import { UserPassword, UserPasswordErrors } from "@/constants/types";
import reducerSetter from "@/utils/reducerSetter";
import globalStyles from "@/assets/global-styles";
import CustomButton from "@/components/custom-button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser, updateUser } from "@/services/apiService";
import { router } from "expo-router";

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

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["changePassword"],
    mutationFn: (data: UserPassword) => updateUser(user?.id!, data),
    onSuccess: async ({ data }) => {
      console.log({ data });

      Alert.alert("Success", "Password changed successfully");
      router.back();
    },
    onError: ({ response }: any) => {
      console.log({ error: response });

      Alert.alert("Please try again", response?.data.message);
      setErrors(response?.data.errors);
    },
  });

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
        onPress={() => mutate(userPassword)}
        disabled={isPending}
        loading={isPending}
      />
    </KeyboardAwareScrollView>
  );
}
