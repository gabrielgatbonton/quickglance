import { Colors } from "@/assets/colors";
import AddShortcutButton from "@/components/add-shortcut-button";
import { router, Tabs } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useEffect } from "react";

export default function TabLayout() {
  useEffect(() => {
    setTimeout(() => {
      router.push("/(welcome)");
    });
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarInactiveTintColor: Colors.SECONDARY,
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <SymbolView name="house.fill" tintColor={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(store)"
        options={{
          title: "Store",
          tabBarIcon: ({ color }) => (
            <SymbolView
              name="sparkles.rectangle.stack.fill"
              tintColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add-shortcut-index"
        options={{
          tabBarButton: (props) => <AddShortcutButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="(automation)"
        options={{
          title: "Automation",
          tabBarIcon: ({ color }) => (
            <SymbolView name="timer" tintColor={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(settings)"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <SymbolView name="gear" tintColor={color} />
          ),
        }}
      />
    </Tabs>
  );
}
