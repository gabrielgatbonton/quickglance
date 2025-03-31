import { Colors } from "@/assets/colors";
import { router, Stack } from "expo-router";
import { Button } from "react-native";

export default function EditProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Edit Profile",
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
