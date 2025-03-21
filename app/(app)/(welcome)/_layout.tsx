import { router, Stack, useNavigation } from "expo-router";
import { View } from "react-native";
import styles from "./styles";
import Button from "@/components/button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

type ScreenFlow = {
  name: string;
  options?: NativeStackNavigationOptions;
};

const SCREEN_FLOW: ScreenFlow[] = [
  {
    name: "index",
  },
  {
    name: "edit-name",
  },
];

export default function WelcomeLayout() {
  const [index, setIndex] = useState<number>(0);

  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleNavigation = () => {
    if (index < SCREEN_FLOW.length - 1) {
      const nextScreen = SCREEN_FLOW[index + 1];
      router.navigate(`/${nextScreen.name}`);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Stack
        screenListeners={{
          state: (e) => setIndex(e.data.state.index),
        }}
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "white" },
        }}
      >
        {SCREEN_FLOW.map((screen, index) => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            options={{
              ...(index === 0
                ? { presentation: "modal" }
                : { presentation: "card" }),
              ...screen.options,
            }}
          />
        ))}
      </Stack>

      <View style={styles.footerContainer}>
        <View style={styles.buttonContainer}>
          <Button
            title={index < SCREEN_FLOW.length - 1 ? "Continue" : "Done"}
            onPress={handleNavigation}
          />
        </View>
        <View style={{ height: bottom }} />
      </View>
    </View>
  );
}
