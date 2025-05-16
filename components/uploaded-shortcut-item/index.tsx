import { Shortcut } from "@/constants/types";
import { Pressable } from "react-native";
import styles from "./styles";
import pressedBgColor from "@/utils/pressedBgColor";
import CustomText from "../custom-text";
import IconView from "../icon-view";

export default function UploadedShortcutItem({ item }: { item: Shortcut }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressedBgColor({ pressed })]}
    >
      <CustomText>{item.name}</CustomText>
      <IconView name={["chevron.right", "chevron-forward"]} color="gray" size={12} />
    </Pressable>
  );
}
