import { SymbolView } from "expo-symbols";
import SelfieCamera, { SelfieCameraProps } from "../selfie-camera";
import styles from "./styles";
import { TurnDirection } from "@/constants/types";
import { View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import IconView from "../icon-view";

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
          <IconView
            name={["arrow.backward.circle", "arrow-back-circle"]}
            color={turnDirection === "left" ? "gray" : "lightgray"}
            size={60}
          />
        </Animated.View>
      )}

      <SelfieCamera isVisible={isVisible} {...props} />

      {isVisible && (
        <Animated.View
          entering={FadeIn.duration(250)}
          exiting={FadeOut.duration(300)}
        >
          <IconView name={["arrow.right.circle", "arrow-forward-circle"]} color={turnDirection === "right" ? "gray" : "lightgray"} size={60} />
        </Animated.View>
      )}
    </View>
  );
}
