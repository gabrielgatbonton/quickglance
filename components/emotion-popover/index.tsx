import { Emotion } from "@/constants/types";
import { StyleSheet } from "react-native";
import Animated, { runOnJS, ZoomIn, ZoomOut } from "react-native-reanimated";
import styles from "./styles";
import { useEffect, useRef, useState } from "react";
import { BlurView } from "expo-blur";
import CustomText from "../custom-text";

type EmotionAlertProps = {
  emotion: Emotion | null;
  duration?: number;
};

const EMOTION_MAPPING = {
  happy: "😊",
  sad: "😢",
  surprised: "😲",
  fearful: "😨",
  angry: "😠",
  disgusted: "🤢",
};

export default function EmotionPopover({
  emotion,
  duration = 1000,
}: EmotionAlertProps) {
  const [lastEmotion, setLastEmotion] = useState<Emotion | null>(null);

  const alertTimerRef = useRef<number>(null);

  useEffect(() => {
    // Reset emotion when face is neutral
    if (emotion === "neutral") {
      setLastEmotion(emotion);
    }
  }, [emotion]);

  if (
    !emotion ||
    emotion === lastEmotion ||
    emotion === "neutral" ||
    !EMOTION_MAPPING[emotion]
  ) {
    return null;
  }

  const closeAlert = () => {
    if (alertTimerRef.current) {
      clearTimeout(alertTimerRef.current);
    }

    // Close alert after the specified duration
    alertTimerRef.current = setTimeout(() => {
      setLastEmotion(emotion);
    }, duration);
  };

  return (
    <Animated.View
      entering={ZoomIn.withCallback(() => {
        runOnJS(closeAlert)();
      })}
      exiting={ZoomOut}
      style={[StyleSheet.absoluteFillObject, styles.container]}
    >
      <BlurView
        intensity={80}
        // experimentalBlurMethod="dimezisBlurView"
        style={styles.emojiContainer}
      >
        <CustomText style={styles.emoji}>{EMOTION_MAPPING[emotion]}</CustomText>
      </BlurView>
    </Animated.View>
  );
}
