import { SymbolView } from "expo-symbols";
import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import styles from "./styles";
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
import { Worklets } from "react-native-worklets-core";
import {
  BlinkData,
  FaceNodData,
  FaceTurnData,
  HeadShakeData,
  NodDirection,
  TurnDirection,
} from "@/constants/types";

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
  onHeadShake,
}: SelfieCameraProps) {
  const [isGranted, setIsGranted] = useState(false);

  const faceDetectionOptions = useRef<FaceDetectionOptions>({
    classificationMode: "all",
  }).current;

  // Blink detection
  const blinkTimerRef = useRef<NodeJS.Timeout | null>(null);
  const blinkCountRef = useRef(0);

  // Head shake detection
  const lastTurnDirectionRef = useRef<TurnDirection | null>(null);
  const directionChangesRef = useRef<TurnDirection[]>([]);
  const headShakeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const { detectFaces } = useFaceDetector(faceDetectionOptions);
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
    if (!device) {
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
        direction !== lastTurnDirectionRef.current &&
        lastTurnDirectionRef.current !== null
      ) {
        directionChangesRef.current.push(direction);

        // Reset shake detection after a certain time of inactivity
        if (headShakeTimerRef.current) {
          clearTimeout(headShakeTimerRef.current);
        }

        headShakeTimerRef.current = setTimeout(() => {
          directionChangesRef.current = [];
          headShakeTimerRef.current = null;

          onHeadShake({
            isShaking: false,
            directionChanges: 0,
            pattern: [],
          });
        }, headShakeResetTime); // Reset if no new direction changes for 1.5 seconds

        // Check for shake pattern
        const changes = directionChangesRef.current;
        if (changes.length >= 2) {
          onHeadShake({
            isShaking: true,
            directionChanges: changes.length,
            pattern: changes,
          });

          // Might want to reset after detecting a shake if higher reset time?
        }
      }

      lastTurnDirectionRef.current = direction;
    },
    [onHeadShake],
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
      const blinkResetTime = 200;

      const leftEyeOpen = face.leftEyeOpenProbability > blinkThreshold;
      const rightEyeOpen = face.rightEyeOpenProbability > blinkThreshold;

      // Check if both eyes are closed
      const isBlinking = !leftEyeOpen && !rightEyeOpen;

      // Increment blink count if both eyes are closed
      if (isBlinking) {
        // Increment blink count on blink start
        blinkCountRef.current += 1;

        // Clear existing timer if there is one
        if (blinkTimerRef.current) {
          clearTimeout(blinkTimerRef.current);
        }

        // Set new timer to reset blink count after specified time
        blinkTimerRef.current = setTimeout(() => {
          blinkCountRef.current = 0;
          blinkTimerRef.current = null;

          // Prevents multiple shortcut runs,
          // since onBlinkDetected is not called again
          onBlinkDetected({
            isBlinking: false,
            leftEyeOpen: false,
            rightEyeOpen: false,
            blinkCount: blinkCountRef.current,
          });
        }, blinkResetTime); // Reset blink count after a short delay
      }

      onBlinkDetected({
        isBlinking,
        leftEyeOpen,
        rightEyeOpen,
        blinkCount: blinkCountRef.current,
      });
    },
    [onBlinkDetected],
  );

  const handleDetectedFaces = Worklets.createRunOnJS((faces: Face[]) => {
    const face = faces[0];
    onFaceDetected?.(face);

    if (face) {
      handleFaceTurn?.(face);
      handleFaceNod?.(face);
      handleEyeBlink?.(face);
    }
  });

  const frameProcessor = useFrameProcessor(
    (frame) => {
      "worklet";

      if (!isFrameProcessorEnabled) {
        return;
      }

      runAsync(frame, () => {
        "worklet";
        const faces = detectFaces(frame);
        handleDetectedFaces(faces);
      });
    },
    [handleDetectedFaces, isFrameProcessorEnabled],
  );

  useEffect(() => {
    return () => {
      // Cleanup timers on unmount
      if (blinkTimerRef.current) {
        blinkCountRef.current = 0;
        clearTimeout(blinkTimerRef.current);
      }
      if (headShakeTimerRef.current) {
        directionChangesRef.current = [];
        clearTimeout(headShakeTimerRef.current);
      }
    };
  }, []);

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
