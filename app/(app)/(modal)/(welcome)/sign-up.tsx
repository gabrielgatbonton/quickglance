import { Button, Pressable, Text, TextInput, View } from "react-native";
import styles from "./styles";
import { SymbolView } from "expo-symbols";
import { Colors } from "@/assets/colors";
import pressedOpacity from "@/utils/pressedOpacity";
import { router } from "expo-router";
import CustomButton from "@/components/custom-button";
import FooterBottom from "@/components/footer-bottom";
import useSignUpStore, {
  SignUpActions,
  SignUpState,
} from "@/stores/useSignUpStore";
import { useShallow } from "zustand/react/shallow";
import InputErrorView from "@/components/input-error-view";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function SignUp() {
  const { userInfo, setUserInfo, isSignIn, toggleSignIn, errors } =
    useSignUpStore<
      Pick<SignUpState, "userInfo" | "isSignIn" | "errors"> &
        Pick<SignUpActions, "setUserInfo" | "toggleSignIn">
    >(
      useShallow((state) => ({
        userInfo: state.userInfo,
        setUserInfo: state.setUserInfo,
        isSignIn: state.isSignIn,
        toggleSignIn: state.toggleSignIn,
        errors: state.errors,
      })),
    );

  return (
    <View style={styles.container}>
      <View style={styles.backContainer}>
        <Pressable
          style={({ pressed }) => pressedOpacity({ pressed })}
          onPress={() => router.back()}
        >
          <SymbolView
            name="chevron.backward"
            size={25}
            tintColor={Colors.PRIMARY}
            weight="semibold"
          />
        </Pressable>
      </View>

      <KeyboardAwareScrollView>
        <View style={[styles.headerContainer, { paddingTop: "15%" }]}>
          <SymbolView
            name="person.crop.circle"
            style={styles.headerImage}
            tintColor={Colors.PRIMARY}
          />
          <Text style={styles.headerText}>Your Account</Text>
          <Text style={styles.subHeaderText}>
            {isSignIn ? "Sign in with" : "Create"} an account to save your
            shortcuts and access a library of shortcuts made for PWDs
          </Text>
        </View>

        <View style={styles.inputContainer}>
          {isSignIn ? null : (
            <>
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
            </>
          )}
          <TextInput
            value={userInfo.email}
            onChangeText={(text) => setUserInfo({ email: text })}
            placeholder="Email address"
            selectionColor={Colors.PRIMARY}
            style={[styles.input, errors?.email && styles.inputError]}
            autoCapitalize="none"
          />
          <InputErrorView errors={errors?.email} />

          <TextInput
            value={userInfo.password}
            onChangeText={(text) => setUserInfo({ password: text })}
            placeholder="Password"
            selectionColor={Colors.PRIMARY}
            style={[styles.input, errors?.password && styles.inputError]}
            secureTextEntry
          />
          <InputErrorView errors={errors?.password} />

          {isSignIn ? null : (
            <>
              <TextInput
                value={userInfo.password_confirmation}
                onChangeText={(text) =>
                  setUserInfo({ password_confirmation: text })
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
            </>
          )}

          <Button
            title={
              isSignIn ? "Don't have an account?" : "Already have an account?"
            }
            color={Colors.PRIMARY}
            onPress={() => {
              toggleSignIn();

              // Clear the name info state
              setUserInfo({
                firstName: "",
                middleName: "",
                lastName: "",
              });
            }}
          />
        </View>
      </KeyboardAwareScrollView>

      <View style={styles.footerContainer}>
        <CustomButton
          title="Continue"
          onPress={() =>
            router.push({
              pathname: "/submit-account",
              params: {
                userInfo: JSON.stringify(userInfo),
                isSignIn: JSON.stringify(isSignIn),
              },
            })
          }
          disabled={
            !(
              (isSignIn || userInfo.firstName || userInfo.lastName) &&
              userInfo.email &&
              userInfo.password
            )
          }
          containerStyle={styles.buttonContainer}
        />
        <FooterBottom />
      </View>
    </View>
  );
}
