import pressedOpacity from "@/utils/pressedOpacity";
import { LinearGradient } from "expo-linear-gradient";
import { SymbolView } from "expo-symbols";
import { Pressable, useWindowDimensions, View } from "react-native";
import styles from "./styles";
import globalStyles from "@/assets/global-styles";
import { Shortcut } from "@/constants/types";
import ContextMenu from "react-native-context-menu-view";
import CustomText from "../custom-text";

export default function ShortcutItem({ item }: { item: Shortcut }) {
  const { width, height } = useWindowDimensions();

  const itemHeight = height * 0.13;
  const itemWidth = width / 2 - 19;

  return (
    <Pressable
      style={({ pressed }) => pressedOpacity({ pressed, opacity: 0.6 })}
    >
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
        <LinearGradient
          colors={[item.gradientStart, item.gradientEnd]}
          style={[
            {
              height: itemHeight,
              width: itemWidth,
            },
            styles.contentContainer,
          ]}
        >
          <View style={globalStyles.rowBetween}>
            <SymbolView name={item.icon} size={30} tintColor="white" />

            <Pressable
              style={({ pressed }) => [
                globalStyles.transparentButton,
                pressedOpacity({ pressed }),
              ]}
            >
              <SymbolView
                name="slider.vertical.3"
                size={20}
                tintColor="white"
                weight="bold"
              />
            </Pressable>
          </View>

          <CustomText style={styles.label}>{item.name}</CustomText>
        </LinearGradient>
      </ContextMenu>
    </Pressable>
  );
}
