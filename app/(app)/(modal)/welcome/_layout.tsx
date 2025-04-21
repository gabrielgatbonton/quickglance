import { router, Stack } from "expo-router";
import { Pressable, View } from "react-native";
import styles from "./styles";
import useSignUpStore from "@/stores/useSignUpStore";
import { useEffect } from "react";
import pressedOpacity from "@/utils/pressedOpacity";
import { SymbolView } from "expo-symbols";
import { Colors } from "@/assets/colors";

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
        <Stack.Screen
          name="sign-up"
          options={{
            presentation: "card",
            title: "",
            headerShown: true,
            headerTransparent: true,
            headerLeft: () => (
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
