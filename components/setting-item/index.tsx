import { SettingData } from "@/constants/types";
import { Platform, Pressable, Switch } from "react-native";
import styles from "./styles";
import { useState } from "react";
import { Colors } from "@/assets/colors";
import pressedOpacity from "@/utils/pressedOpacity";
import { SymbolView } from "expo-symbols";
import CustomText from "../custom-text";
import IconView from "../icon-view";

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
        (item.type === "link" ||
          item.type === "list" ||
          item.type === "destructive") &&
          pressedOpacity({ pressed }),
      ]}
      onPress={handlePress}
    >
      <CustomText
        style={[
          item.type === "link" && { color: Colors.PRIMARY },
          item.type === "hint" && { color: "gray" },
          item.type === "destructive" && { color: Colors.ERROR },
        ]}
      >
        {item.label}
      </CustomText>

      {item.type === "switch" ? (
        <Switch
          value={isEnabled}
          onValueChange={setIsEnabled}
          trackColor={{ true: Colors.PRIMARY, false: "lightgray" }}
          thumbColor={Platform.OS === "android" ? Colors.PRIMARY : undefined}
        />
      ) : item.type === "list" ? (
        <IconView name={["chevron.right", "chevron-forward"]} size={15} color="gray" />
      ) : null}
    </Pressable>
  );
}
