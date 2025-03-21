import pressedOpacity from "@/utils/pressedOpacity";
import { SymbolView } from "expo-symbols";
import { Pressable } from "react-native";
import SelfieCamera from "../selfie-camera";
import styles from "./styles";
import Animated, { FadeIn } from "react-native-reanimated";

export default function SelfieView() {
  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.container}>
      <Pressable style={({ pressed }) => pressedOpacity({ pressed })}>
        <SymbolView
          name="arrow.backward.circle"
          size={60}
          tintColor="lightgray"
        />
      </Pressable>

      <SelfieCamera />

      <Pressable style={({ pressed }) => pressedOpacity({ pressed })}>
        <SymbolView name="arrow.right.circle" size={60} tintColor="lightgray" />
      </Pressable>
    </Animated.View>
  );
}
