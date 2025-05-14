import { Platform, TextInput, View } from "react-native";
import styles from "./styles";
import { SymbolView } from "expo-symbols";
import { Colors } from "@/assets/colors";
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
import globalStyles from "@/assets/global-styles";
import CustomText from "@/components/custom-text";
import CustomLink from "@/components/custom-link";
import IconView from "@/components/icon-view";
import AndroidLogInForm from "@/components/android-log-in-form";

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
      }))
    );

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={[styles.headerContainer, { paddingTop: "20%" }]}>
          {Platform.OS === "ios" && (
            <IconView
              name={["person.crop.circle", undefined]}
              size={65}
              color={Colors.PRIMARY}
            />
          )}
          <CustomText style={styles.headerText}>Your Account</CustomText>
          <CustomText style={styles.subHeaderText}>
            {isSignIn ? "Sign in with" : "Create"} an account to save your
            shortcuts and access a library of shortcuts made for PWDs
          </CustomText>
        </View>

        <View style={styles.inputContainer}>
          {Platform.OS === "ios" ? (
            // IOS
            <>
              {!isSignIn && (
                <>
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
                </>
              )}
              <TextInput
                value={userInfo.email}
                onChangeText={(text) => setUserInfo({ email: text })}
                placeholder="Email address"
                selectionColor={Colors.PRIMARY}
                style={[
                  globalStyles.input,
                  errors?.email && globalStyles.inputError,
                ]}
                autoCapitalize="none"
              />
              <InputErrorView errors={errors?.email} />

              <TextInput
                value={userInfo.password}
                onChangeText={(text) => setUserInfo({ password: text })}
                placeholder="Password"
                selectionColor={Colors.PRIMARY}
                style={[
                  globalStyles.input,
                  errors?.password && globalStyles.inputError,
                ]}
                secureTextEntry
              />
              <InputErrorView errors={errors?.password} />

              {!isSignIn && (
                <>
                  <TextInput
                    value={userInfo.password_confirmation}
                    onChangeText={(text) =>
                      setUserInfo({ password_confirmation: text })
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
                </>
              )}
            </>
          ) : (
            // Android
            <AndroidLogInForm
              handleFieldValue={(value) => setUserInfo(value)}
              fieldErrors={errors || {}}
              fieldValues={userInfo}
              isSignIn={isSignIn}
            />
          )}

          <CustomLink
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
            router.navigate({
              pathname: "/welcome/submit-account",
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
