import { ActivityIndicator, Alert, TextInput } from "react-native";
import { Colors } from "@/assets/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useEffect, useReducer, useState } from "react";
import InputErrorView from "@/components/input-error-view";
import reducerSetter from "@/utils/reducerSetter";
import { User, UserErrors } from "@/constants/types";
import styles from "./styles";
import CustomButton from "@/components/custom-button";
import globalStyles from "@/assets/global-styles";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser, updateUser } from "@/services/apiService";
import { router } from "expo-router";
import { queryClient } from "@/app/_layout";

const initialState: User = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
};

export default function EditProfile() {
  const [userInfo, setUserInfo] = useReducer(reducerSetter<User>, initialState);
  const [errors, setErrors] = useState<UserErrors>(null);

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["editProfile"],
    mutationFn: (data: User) => updateUser(user?.id!, data),
    onSuccess: async ({ data }) => {
      console.log({ data });

      await queryClient.invalidateQueries({ queryKey: ["user"] });

      Alert.alert("Success", "Profile updated successfully");
      router.back();
    },
    onError: ({ response }: any) => {
      console.log({ error: response });

      Alert.alert("Please try again", response?.data.message);
      setErrors(response?.data.errors);
    },
  });

  useEffect(() => {
    if (user) {
      setUserInfo(user);
    }
  }, [user]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      contentInsetAdjustmentBehavior="automatic"
    >
      <TextInput
        value={userInfo.firstName}
        onChangeText={(text) => setUserInfo({ firstName: text })}
        placeholder="First Name"
        selectionColor={Colors.PRIMARY}
        style={[
          globalStyles.input,
          errors?.firstName && globalStyles.inputError,
        ]}
        autoCapitalize="words"
      />
      <InputErrorView errors={errors?.firstName} />

      <TextInput
        value={userInfo.middleName}
        onChangeText={(text) => setUserInfo({ middleName: text })}
        placeholder="Middle Name (Optional)"
        selectionColor={Colors.PRIMARY}
        style={[
          globalStyles.input,
          errors?.middleName && globalStyles.inputError,
        ]}
        autoCapitalize="words"
      />
      <InputErrorView errors={errors?.middleName} />

      <TextInput
        value={userInfo.lastName}
        onChangeText={(text) => setUserInfo({ lastName: text })}
        placeholder="Last Name"
        selectionColor={Colors.PRIMARY}
        style={[
          globalStyles.input,
          errors?.lastName && globalStyles.inputError,
        ]}
        autoCapitalize="words"
      />
      <InputErrorView errors={errors?.lastName} />

      <TextInput
        value={userInfo.email}
        onChangeText={(text) => setUserInfo({ email: text })}
        placeholder="Email address"
        selectionColor={Colors.PRIMARY}
        style={[globalStyles.input, errors?.email && globalStyles.inputError]}
        autoCapitalize="none"
      />
      <InputErrorView errors={errors?.email} />

      {isPending ? (
        <ActivityIndicator />
      ) : (
        <CustomButton title="Save" onPress={() => mutate(userInfo)} />
      )}
    </KeyboardAwareScrollView>
  );
}
