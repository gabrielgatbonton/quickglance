import { router, Stack } from "expo-router";
import {
  BackHandler,
  Platform,
  Pressable,
  ToastAndroid,
  View,
} from "react-native";
import styles from "./styles";
import useSignUpStore from "@/stores/useSignUpStore";
import { useEffect, useRef } from "react";
import pressedOpacity from "@/utils/pressedOpacity";
import { SymbolView } from "expo-symbols";
import { Colors } from "@/assets/colors";
import useAuthStore from "@/stores/useAuthStore";
import IconView from "@/components/icon-view";

export default function WelcomeLayout() {
  const token = useAuthStore((state) => state.token);
  const resetAll = useSignUpStore((state) => state.resetAll);

  const backCounterRef = useRef(0);

  // Prevent going back to the previous screen when the user is not logged in
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (!token) {
          backCounterRef.current++;

          // If the user presses back twice, exit the app
          if (backCounterRef.current > 1) {
            backCounterRef.current = 0;
            BackHandler.exitApp();
            return true;
          }

          // Show a toast message on Android
          if (Platform.OS === "android") {
            ToastAndroid.show(
              "Press back again to exit the app",
              ToastAndroid.SHORT,
            );
          }
        }

        return !token;
      },
    );
    return () => backHandler.remove();
  }, [token]);

  // Reset the store when the component mounts
  useEffect(() => {
    resetAll();
  }, [resetAll]);

  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen
          name="sign-up"
          options={{
            presentation: "card",
            title: "",
            headerShown: false,
            headerTransparent: Platform.OS === "ios",
            headerLeft: () => (
              <Pressable
                style={({ pressed }) => pressedOpacity({ pressed })}
                onPress={() => router.back()}
              >
                <IconView name={["chevron.backward", "arrow-back"]} size={25} color={Colors.PRIMARY} />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="submit-account"
          options={{ presentation: "card" }}
        />
      </Stack>
    </View>
  );
}
