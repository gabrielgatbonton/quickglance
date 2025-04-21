import { Colors } from "@/assets/colors";
import pressedOpacity from "@/utils/pressedOpacity";
import { SymbolView } from "expo-symbols";
import { Pressable, useWindowDimensions, View } from "react-native";
import styles from "./styles";
import Animated, { Easing, ZoomIn } from "react-native-reanimated";
import CustomText from "../custom-text";
import { router } from "expo-router";

type OnboardingViewProps = {
  onStartedChange: (isStarted: boolean) => void;
};

const ONBOARDING_ICON_SIZE = 40;

export default function OnboardingView({
  onStartedChange,
}: OnboardingViewProps) {
  const { height } = useWindowDimensions();

  const onboardingHeight = height * 0.14;

  return (
    <Animated.View
      entering={ZoomIn.duration(200).easing(Easing.out(Easing.exp)).delay(100)}
      style={[styles.container, { height: onboardingHeight }]}
    >
      <CustomText style={{ color: Colors.SECONDARY }}>
        Do any of the following to start:
      </CustomText>

      <View style={styles.iconContainer}>
        <SymbolView
          name="eyebrow"
          tintColor={Colors.SECONDARY}
          size={ONBOARDING_ICON_SIZE}
        />

        <CustomText style={{ color: Colors.SECONDARY }}>or</CustomText>

        <Pressable
          style={({ pressed }) => pressedOpacity({ pressed })}
          onPress={() => onStartedChange(true)}
          onLongPress={() => router.navigate("/(modal)/camera-test")}
        >
          <SymbolView
            name="play.circle.fill"
            tintColor={Colors.SECONDARY}
            size={ONBOARDING_ICON_SIZE}
          />
        </Pressable>
      </View>
    </Animated.View>
  );
}
