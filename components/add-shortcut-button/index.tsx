import pressedOpacity from "@/utils/pressedOpacity";
import { router } from "expo-router";
import { Pressable, PressableProps } from "react-native";
import styles from "./styles";
import IconView from "../icon-view";

export default function AddShortcutButton(props: PressableProps) {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [styles.container, pressedOpacity({ pressed })]}
      onPress={() => router.navigate("/(app)/(modal)/add-shortcut")}
    >
      <IconView name={["plus", "add-sharp"]} color="white" size={35} />
    </Pressable>
  );
}
