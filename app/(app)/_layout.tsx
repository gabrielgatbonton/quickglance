import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="(welcome)"
        options={{
          title: "Welcome",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="(add-shortcut)"
        options={{
          title: "Add Shortcut",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="(reorder-shortcuts)"
        options={{
          title: "Reorder Shortcuts",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
