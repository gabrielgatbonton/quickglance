import { SettingData } from "@/constants/types";
import { Pressable, Switch, Text } from "react-native";
import styles from "./styles";
import { useState } from "react";
import { Colors } from "@/assets/colors";
import pressedOpacity from "@/utils/pressedOpacity";
import { SymbolView } from "expo-symbols";

export default function SettingItem({ item }: { item: SettingData }) {
  const [isEnabled, setIsEnabled] = useState(false);

  const handlePress = () => {
    return item.type === "switch"
      ? setIsEnabled((prev) => !prev)
      : item.action?.();
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        (item.type === "link" || item.type === "list") &&
          pressedOpacity({ pressed }),
      ]}
      onPress={handlePress}
    >
      <Text
        style={[
          item.type === "hint" && { color: "gray" },
          item.type === "link" && { color: Colors.PRIMARY },
        ]}
      >
        {item.label}
      </Text>

      {item.type === "switch" ? (
        <Switch
          value={isEnabled}
          onValueChange={setIsEnabled}
          trackColor={{ true: Colors.PRIMARY }}
        />
      ) : item.type === "list" ? (
        <SymbolView name="chevron.right" size={15} tintColor="gray" />
      ) : null}
    </Pressable>
  );
}
