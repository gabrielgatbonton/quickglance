import { router } from "expo-router";
import { ActivityIndicator, Alert, View } from "react-native";
import styles from "./styles";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { login, register } from "@/services/apiService";
import useSignUpStore, {
  SignUpActions,
  SignUpState,
} from "@/stores/useSignUpStore";
import { useShallow } from "zustand/react/shallow";
import useAuthStore from "@/stores/useAuthStore";
import CustomText from "@/components/custom-text";
import globalStyles from "@/assets/global-styles";
import { Colors } from "@/assets/colors";

export default function SubmitAccount() {
  const { userInfo, isSignIn, setErrors, resetAll } = useSignUpStore<
    Pick<SignUpState, "userInfo" | "isSignIn"> &
      Pick<SignUpActions, "setErrors" | "resetAll">
  >(
    useShallow((state) => ({
      userInfo: state.userInfo,
      isSignIn: state.isSignIn,
      setErrors: state.setErrors,
      resetAll: state.resetAll,
    })),
  );

  const handleLogin = useAuthStore((state) => state.handleLogin);

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["submitAccount"],
    mutationFn: isSignIn ? login : register,
    onSuccess: async ({ access_token, user }) => {
      // Store token and user data
      await handleLogin(access_token, user);

      resetAll();
      router.dismissAll();
      router.back();
    },
    onError: ({ response }: any) => {
      console.log({ error: response });

      Alert.alert("Please try again", response?.data.message);
      if (response?.data.message === "Invalid login details") {
        setErrors({
          password: ["Invalid email or password"],
        });
      } else {
        setErrors(response?.data.errors);
      }
      router.dismissTo("/welcome/sign-up");
    },
  });

  useEffect(() => {
    if (isPending || isSuccess || isError) {
      return;
    }
    console.log("Account submitted:", userInfo);
    mutate(userInfo);
  }, [isPending, isSuccess, isError, userInfo, isSignIn, mutate]);

  return (
    <View style={styles.container}>
      <View style={[globalStyles.modalLoading, styles.loadingContainer]}>
        <ActivityIndicator color={Colors.PRIMARY} />
        <CustomText style={styles.loadingText}>
          Submitting account...
        </CustomText>
      </View>
    </View>
  );
}
