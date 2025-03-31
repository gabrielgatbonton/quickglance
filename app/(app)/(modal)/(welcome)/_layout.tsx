import { Stack } from "expo-router";
import { View } from "react-native";
import styles from "./styles";
import useSignUpStore from "@/stores/useSignUpStore";
import { useEffect } from "react";

export default function WelcomeLayout() {
  const resetAll = useSignUpStore((state) => state.resetAll);

  // Reset the store when the component mounts
  useEffect(() => {
    resetAll();
  }, [resetAll]);

  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="sign-up" options={{ presentation: "card" }} />
        <Stack.Screen
          name="submit-account"
          options={{ presentation: "card" }}
        />
      </Stack>
    </View>
  );
}
