import { Button, TextInput } from "react-native";
import { Colors } from "@/assets/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useLayoutEffect, useReducer, useState } from "react";
import { router, useNavigation } from "expo-router";
import InputErrorView from "@/components/input-error-view";
import reducerSetter from "@/utils/reducerSetter";
import { User, UserErrors } from "@/constants/types";
import styles from "./styles";

const initialState: User = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
};

export default function EditProfile() {
  const [userInfo, setUserInfo] = useReducer(reducerSetter<User>, initialState);
  const [errors, setErrors] = useState<UserErrors>(null);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Save"
          onPress={() => {
            router.back();
            console.log("Profile saved!", userInfo);
          }}
          color={Colors.PRIMARY}
        />
      ),
    });
  }, [navigation, userInfo]);

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
        style={[styles.input, errors?.firstName && styles.inputError]}
        autoCapitalize="words"
      />
      <InputErrorView errors={errors?.firstName} />

      <TextInput
        value={userInfo.middleName}
        onChangeText={(text) => setUserInfo({ middleName: text })}
        placeholder="Middle Name (Optional)"
        selectionColor={Colors.PRIMARY}
        style={[styles.input, errors?.middleName && styles.inputError]}
        autoCapitalize="words"
      />
      <InputErrorView errors={errors?.middleName} />

      <TextInput
        value={userInfo.lastName}
        onChangeText={(text) => setUserInfo({ lastName: text })}
        placeholder="Last Name"
        selectionColor={Colors.PRIMARY}
        style={[styles.input, errors?.lastName && styles.inputError]}
        autoCapitalize="words"
      />
      <InputErrorView errors={errors?.lastName} />

      <TextInput
        value={userInfo.email}
        onChangeText={(text) => setUserInfo({ email: text })}
        placeholder="Email address"
        selectionColor={Colors.PRIMARY}
        style={[styles.input, errors?.email && styles.inputError]}
        autoCapitalize="none"
      />
    </KeyboardAwareScrollView>
  );
}
