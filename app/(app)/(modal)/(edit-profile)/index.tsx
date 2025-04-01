import { TextInput } from "react-native";
import { Colors } from "@/assets/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useReducer, useState } from "react";
import InputErrorView from "@/components/input-error-view";
import reducerSetter from "@/utils/reducerSetter";
import { User, UserErrors } from "@/constants/types";
import styles from "./styles";
import CustomButton from "@/components/custom-button";
import globalStyles from "@/assets/global-styles";

const initialState: User = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
};

export default function EditProfile() {
  const [userInfo, setUserInfo] = useReducer(reducerSetter<User>, initialState);
  const [errors, setErrors] = useState<UserErrors>(null);

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

      <CustomButton
        title="Save"
        onPress={() => console.log("Profile saved!", { userInfo })}
      />
    </KeyboardAwareScrollView>
  );
}
