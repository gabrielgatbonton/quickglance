import { SFSymbol, SymbolView } from "expo-symbols";
import {
  Pressable,
  StyleProp,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import Animated, { SlideOutDown } from "react-native-reanimated";
import CustomText from "../custom-text";
import pressedOpacity from "@/utils/pressedOpacity";
import { useState } from "react";
import { Colors } from "@/assets/colors";
import styles from "./styles";

type HintViewProps = {
  icon: SFSymbol;
  title: string;
  description: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export default function HintView({
  icon,
  title,
  description,
  containerStyle,
}: HintViewProps) {
  const [isHintVisible, setIsHintVisible] = useState(true);

  const { height } = useWindowDimensions();

  if (!isHintVisible) {
    return null;
  }

  return (
    <View
      style={[styles.container, { height: height * 0.82 }]}
      pointerEvents="box-none"
    >
      <Animated.View
        exiting={SlideOutDown}
        style={[styles.animatedContainer, containerStyle]}
      >
        <SymbolView name={icon} size={35} tintColor={Colors.PRIMARY} />
        <View style={styles.contentContainer}>
          <CustomText style={styles.title}>{title}</CustomText>
          <CustomText style={styles.description}>{description}</CustomText>
        </View>
        <Pressable
          style={({ pressed }) => pressedOpacity({ pressed })}
          onPress={() => setIsHintVisible(false)}
        >
          <SymbolView
            name="xmark.circle.fill"
            size={30}
            tintColor={Colors.SECONDARY}
          />
        </Pressable>
      </Animated.View>
    </View>
  );
}
