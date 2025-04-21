import { SymbolView } from "expo-symbols";
import SelfieCamera, { SelfieCameraProps } from "../selfie-camera";
import styles from "./styles";
import { TurnDirection } from "@/constants/types";
import { View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

type SelfieViewProps = SelfieCameraProps & {
  isVisible: boolean;
  turnDirection?: TurnDirection;
};

export default function SelfieView({
  isVisible,
  turnDirection,
  ...props
}: SelfieViewProps) {
  return (
    <View style={isVisible && styles.container}>
      {isVisible && (
        <Animated.View
          entering={FadeIn.duration(250)}
          exiting={FadeOut.duration(300)}
        >
          <SymbolView
            name="arrow.backward.circle"
            size={60}
            tintColor={turnDirection === "left" ? "gray" : "lightgray"}
          />
        </Animated.View>
      )}

      <SelfieCamera isVisible={isVisible} {...props} />

      {isVisible && (
        <Animated.View
          entering={FadeIn.duration(250)}
          exiting={FadeOut.duration(300)}
        >
          <SymbolView
            name="arrow.right.circle"
            size={60}
            tintColor={turnDirection === "right" ? "gray" : "lightgray"}
          />
        </Animated.View>
      )}
    </View>
  );
}
