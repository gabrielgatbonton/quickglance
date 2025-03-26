import { Stack } from "expo-router";
import { View } from "react-native";
import styles from "./styles";

export default function WelcomeLayout() {
  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "white" },
        }}
      >
        <Stack.Screen name="index" options={{ presentation: "modal" }} />
        <Stack.Screen name="sign-up" options={{ presentation: "card" }} />
        <Stack.Screen
          name="submit-account"
          options={{ presentation: "card" }}
        />
      </Stack>
    </View>
  );
}
