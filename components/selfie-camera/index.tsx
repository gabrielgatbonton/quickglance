import { SymbolView } from "expo-symbols";
import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { Colors } from "@/assets/colors";
import {
  Camera,
  CameraProps,
  runAsync,
  useCameraDevice,
  useCameraFormat,
  useCameraPermission,
  useFrameProcessor,
} from "react-native-vision-camera";
import {
  Face,
  FaceDetectionOptions,
  useFaceDetector,
} from "react-native-vision-camera-face-detector";
import { useSharedValue, Worklets } from "react-native-worklets-core";
import {
  BlinkData,
  EmotionData,
  FaceNodData,
  FaceTurnData,
  HeadShakeData,
  NodDirection,
  TurnDirection,
} from "@/constants/types";
import * as Device from "expo-device";
import styles from "./styles";

export type SelfieCameraProps = {
  isActive?: boolean;
  isVisible?: boolean;
  isFrameProcessorEnabled?: boolean;
  size?: number;
  cameraProps?: Partial<CameraProps>;
  onFaceDetected?: (face: Face | null) => void;
  onFaceTurn?: (data: FaceTurnData) => void;
  onFaceNod?: (data: FaceNodData) => void;
  onBlinkDetected?: (data: BlinkData) => void;
  onEmotionDetected?: (data: EmotionData) => void;
  onHeadShake?: (data: HeadShakeData) => void;
};

const DEFAULT_SIZE = 120;

export default function SelfieCamera({
  isActive = true,
  isVisible = true,
  isFrameProcessorEnabled = true,
  size = DEFAULT_SIZE,
  cameraProps,
  onFaceDetected,
  onFaceTurn,
  onFaceNod,
  onBlinkDetected,
  onEmotionDetected,
  onHeadShake,
}: SelfieCameraProps) {
  const [isGranted, setIsGranted] = useState(false);

  // Face detection
  const hasDetectedFace = useSharedValue(false);

  // Blink detection
  const blinkCount = useSharedValue(0);
  const blinkStartTime = useSharedValue<number | null>(null);
  const blinkDuration = useSharedValue(0);

  // Turn detection
  const lastTurnDirection = useSharedValue<TurnDirection | null>(null);
  const directionChanges = useSharedValue<TurnDirection[]>([]);

  const faceDetectionOptions = useRef<FaceDetectionOptions>({
    performanceMode: "accurate",
    classificationMode: "all",
  }).current;

  const blinkTimerRef = useRef<number>(null);
  const headShakeTimerRef = useRef<number>(null);

  const { detectFaces } = useFaceDetector(faceDetectionOptions);
  // const { detectEmotions } = useEmotionDetector();
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice("front");
  const format = useCameraFormat(device, [{ fps: 30 }]);

  useEffect(() => {
    // Request camera permission from user
    requestPermission().then((isGranted) => {
      if (!isGranted) {
        Alert.alert(
          "Camera Permission Denied",
          "We need your permission to show the camera",
          [
            { text: "Retry", onPress: () => requestPermission() },
            { text: "Cancel", style: "cancel" },
          ],
        );
      }
      setIsGranted(isGranted);
    });
  }, [requestPermission]);

  useEffect(() => {
    // Check if a camera device is available
    if (!device && Device.isDevice) {
      Alert.alert(
        "Camera Not Found",
        "We couldn't find the camera on your device. Please check your device settings.",
      );
    }
  }, [device]);

  const handleHeadShake = useCallback(
    (direction: TurnDirection) => {
      if (!onHeadShake || direction === "center") {
        return;
      }

      const headShakeResetTime = 500;

      // Only record direction changes
      if (
        direction !== lastTurnDirection.value &&
        lastTurnDirection.value !== null
      ) {
        directionChanges.value.push(direction);

        // Reset shake detection after a certain time of inactivity
        if (headShakeTimerRef.current) {
          clearTimeout(headShakeTimerRef.current);
        }

        headShakeTimerRef.current = setTimeout(() => {
          directionChanges.value = [];
          headShakeTimerRef.current = null;

          onHeadShake({
            isShaking: false,
            directionChanges: 0,
            pattern: [],
          });
        }, headShakeResetTime); // Reset if no new direction changes for 1.5 seconds

        // Check for shake pattern
        const changes = directionChanges.value;
        if (changes.length >= 2) {
          onHeadShake({
            isShaking: true,
            directionChanges: changes.length,
            pattern: changes,
          });

          // Might want to reset after detecting a shake if higher reset time?
        }
      }

      lastTurnDirection.value = direction;
    },
    [directionChanges, lastTurnDirection, onHeadShake],
  );

  const handleFaceTurn = useCallback(
    (face: Face) => {
      if (!onFaceTurn && !onHeadShake) {
        return;
      }

      const turnAngle = face.yawAngle;

      // const turnThreshold = 5;
      const turnThreshold = 3;

      let direction: TurnDirection = "center";
      if (turnAngle > turnThreshold) {
        direction = "left";
      } else if (turnAngle < -turnThreshold) {
        direction = "right";
      }

      onFaceTurn?.({ angle: turnAngle, direction });
      handleHeadShake(direction);
    },
    [handleHeadShake, onFaceTurn, onHeadShake],
  );

  const handleFaceNod = useCallback(
    (face: Face) => {
      if (!onFaceNod) {
        return;
      }

      const nodAngle = face.pitchAngle;

      // const nodThreshold = 5;
      const nodThreshold = 3;

      let direction: NodDirection = "center";
      if (nodAngle > nodThreshold) {
        direction = "up";
      } else if (nodAngle < -nodThreshold) {
        direction = "down";
      }

      onFaceNod({ angle: nodAngle, direction });
    },
    [onFaceNod],
  );

  const handleEyeBlink = useCallback(
    (face: Face) => {
      if (!onBlinkDetected) {
        return;
      }

      const blinkThreshold = 0.5;
      const blinkResetTime = 300;

      const leftEyeOpen = face.leftEyeOpenProbability > blinkThreshold;
      const rightEyeOpen = face.rightEyeOpenProbability > blinkThreshold;

      // Check if both eyes are closed
      const isBlinking = !leftEyeOpen && !rightEyeOpen;

      // If blink starts, record the start time
      if (isBlinking && blinkStartTime.value === null) {
        blinkStartTime.value = Date.now();
        // Increment blink count on blink start
        blinkCount.value += 1;
      }

      // If eyes open after a blink, calculate duration
      if (!isBlinking && blinkStartTime.value !== null) {
        // Calculate blink duration
        blinkDuration.value = Date.now() - blinkStartTime.value;
        blinkStartTime.value = null;
      }

      // Handle timer logic for resetting
      if (isBlinking) {
        // Clear existing timer if there is one
        if (blinkTimerRef.current) {
          clearTimeout(blinkTimerRef.current);
        }

        // Set new timer to reset blink count after specified time
        blinkTimerRef.current = setTimeout(() => {
          blinkCount.value = 0;
          blinkDuration.value = 0;
          blinkStartTime.value = null;
          blinkTimerRef.current = null;

          // Prevents multiple shortcut runs,
          // since onBlinkDetected is not called again
          onBlinkDetected({
            isBlinking: false,
            leftEyeOpen: false,
            rightEyeOpen: false,
            blinkCount: 0,
            blinkDuration: 0,
          });
        }, blinkResetTime); // Reset blink count after a short delay
      }

      onBlinkDetected({
        isBlinking,
        leftEyeOpen,
        rightEyeOpen,
        blinkCount: blinkCount.value,
        blinkDuration: blinkDuration.value,
      });
    },
    [blinkCount, blinkDuration, blinkStartTime, onBlinkDetected],
  );

  const handleSmile = useCallback(
    (face: Face) => {
      if (!onEmotionDetected) {
        return;
      }

      const smileThreshold = 0.5;
      const smileProbability = face.smilingProbability;
      const isSmiling = smileProbability > smileThreshold;

      onEmotionDetected({
        emotion: isSmiling ? "happy" : "neutral",
      });
    },
    [onEmotionDetected],
  );

  const handleDetectedFace = Worklets.createRunOnJS((face: Face | null) => {
    hasDetectedFace.value = !!face;
    onFaceDetected?.(face);

    if (face) {
      handleFaceTurn?.(face);
      handleFaceNod?.(face);
      handleEyeBlink?.(face);
      handleSmile?.(face);
    }
  });

  // const handleDetectedEmotions = Worklets.createRunOnJS(
  //   (emotionData: EmotionData | null) => {
  //     if (emotionData) {
  //       onEmotionDetected?.(emotionData);
  //     }
  //   },
  // );

  const frameProcessor = useFrameProcessor(
    (frame) => {
      "worklet";

      if (!isFrameProcessorEnabled) {
        return;
      }

      runAsync(frame, () => {
        "worklet";
        const faces = detectFaces(frame);
        handleDetectedFace(faces[0]);
      });

      // runAtTargetFps(1, () => {
      //   if (!hasDetectedFace.value) {
      //     return;
      //   }
      //   const emotionData = detectEmotions(frame);
      //   handleDetectedEmotions(emotionData);
      // });
    },
    [handleDetectedFace, isFrameProcessorEnabled],
  );

  useEffect(() => {
    return () => {
      // Cleanup timers on unmount
      if (blinkTimerRef.current) {
        blinkCount.value = 0;
        blinkDuration.value = 0;
        blinkStartTime.value = null;
        clearTimeout(blinkTimerRef.current);
      }
      if (headShakeTimerRef.current) {
        directionChanges.value = [];
        clearTimeout(headShakeTimerRef.current);
      }
    };
  }, [blinkCount, blinkDuration, blinkStartTime, directionChanges]);

  if (!hasPermission) {
    return <ActivityIndicator size="large" />;
  }

  if (!isGranted || !device) {
    if (!isVisible) {
      return null;
    }

    return (
      <SymbolView
        name="exclamationmark.triangle.fill"
        size={DEFAULT_SIZE * 0.7}
        tintColor={Colors.ERROR}
      />
    );
  }

  return (
    <Camera
      {...cameraProps}
      isActive={isActive}
      device={device}
      format={format}
      frameProcessor={frameProcessor}
      style={
        isVisible && [
          {
            height: size,
            width: size,
            borderRadius: size / 2,
          },
          styles.camera,
          cameraProps?.style,
        ]
      }
    />
  );
}
