import {
  Emotion,
  EmotionData,
  EmotionResultWithLabels,
} from "@/constants/types";
import { useCallback } from "react";
import { useTensorflowModel } from "react-native-fast-tflite";
import { Frame } from "react-native-vision-camera";
import { useResizePlugin } from "vision-camera-resize-plugin";

const EMOTION_MAPPING: Record<number, Emotion> = {
  0: "happy",
  1: "sad",
  2: "surprised",
  3: "fearful",
  4: "angry",
  5: "disgusted",
  6: "neutral",
};

export default function useEmotionDetector() {
  const model = useTensorflowModel(require("@/assets/models/emotion.tflite"));
  const emotionModel = model.state === "loaded" ? model.model : null;

  const { resize } = useResizePlugin();

  const detectEmotions = useCallback(
    (frame: Frame): EmotionData | null => {
      "worklet";

      if (!emotionModel) {
        return null;
      }

      const resized = resize(frame, {
        scale: {
          width: 224,
          height: 224,
        },
        pixelFormat: "rgb",
        dataType: "float32",
      });

      try {
        const outputs = emotionModel.runSync([resized]);
        const emotions = outputs[0] as Float32Array;

        return {
          emotion: getEmotion(emotions),
          results: getResultWithLabels(emotions),
        };
      } catch (error) {
        console.log("Error running emotion model:", error);
        return null;
      }
    },
    [emotionModel, resize],
  );

  return { detectEmotions };
}

const getResultWithLabels = (result: Float32Array) => {
  "worklet";

  return Object.keys(result)
    .map((r) => Number(r))
    .reduce((acc, key) => {
      const emotion = EMOTION_MAPPING[key];
      acc[emotion] = result[key];
      return acc;
    }, {} as EmotionResultWithLabels);
};

const getEmotion = (result: Float32Array) => {
  "worklet";

  const maxKey = Object.keys(result)
    .map((r) => Number(r))
    .reduce((a, b) => (result[a] > result[b] ? a : b));
  return EMOTION_MAPPING[maxKey];
};
