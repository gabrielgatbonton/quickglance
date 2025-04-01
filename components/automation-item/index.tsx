import { Pressable, View } from "react-native";
import { BlurView } from "expo-blur";
import pressedOpacity from "@/utils/pressedOpacity";
import styles from "./styles";
import { Automation } from "@/constants/types";
import ContextMenu from "react-native-context-menu-view";
import { SymbolView } from "expo-symbols";
import CustomText from "../custom-text";

export default function AutomationItem({ item }: { item: Automation }) {
  return (
    <Pressable style={({ pressed }) => pressedOpacity({ pressed })}>
      <View style={styles.nameContainer}>
        <CustomText style={styles.name}>{item.name}</CustomText>
        <SymbolView
          name="chevron.right"
          size={15}
          tintColor="gray"
          weight="bold"
        />
      </View>

      <ContextMenu
        actions={[
          { title: "Edit", systemIcon: "pencil" },
          { title: "Delete", systemIcon: "trash", destructive: true },
        ]}
        onPress={(e) => {
          console.warn(
            `Pressed ${e.nativeEvent.name} at index ${e.nativeEvent.index}`,
          );
        }}
      >
        <BlurView style={styles.detailsContainer}>
          {item.actions.map((action, index) => (
            <CustomText key={index} style={styles.action}>
              ▶️ {action}
            </CustomText>
          ))}
        </BlurView>
      </ContextMenu>
    </Pressable>
  );
}
