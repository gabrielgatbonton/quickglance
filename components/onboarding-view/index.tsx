import { Colors } from "@/assets/colors";
import pressedOpacity from "@/utils/pressedOpacity";
import { SymbolView } from "expo-symbols";
import { Pressable, Text, useWindowDimensions, View } from "react-native";
import styles from "./styles";
import Animated, { ZoomIn } from "react-native-reanimated";

type OnboardingViewProps = {
  onStartedChange: (isStarted: boolean) => void;
};

const ONBOARDING_ICON_SIZE = 40;

export default function OnboardingView({
  onStartedChange,
}: OnboardingViewProps) {
  const { height } = useWindowDimensions();

  const onboardingHeight = height * 0.16;

  return (
    <Animated.View
      entering={ZoomIn.duration(200)}
      style={[styles.container, { height: onboardingHeight }]}
    >
      <Text style={{ color: Colors.SECONDARY }}>
        Do any of the following to start:
      </Text>

      <View style={styles.iconContainer}>
        <SymbolView
          name="eyebrow"
          tintColor={Colors.SECONDARY}
          size={ONBOARDING_ICON_SIZE}
        />

        <Text style={{ color: Colors.SECONDARY }}>or</Text>

        <Pressable
          style={({ pressed }) => pressedOpacity({ pressed })}
          onPress={() => onStartedChange(true)}
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
