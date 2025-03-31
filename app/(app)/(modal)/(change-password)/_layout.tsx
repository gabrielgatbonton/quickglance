import { Colors } from "@/assets/colors";
import { router, Stack } from "expo-router";
import { Button } from "react-native";

export default function ChangePasswordLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Change Password",
          headerLeft: () => (
            <Button
              title="Cancel"
              onPress={() => router.back()}
              color={Colors.PRIMARY}
            />
          ),
        }}
      />
    </Stack>
  );
}
