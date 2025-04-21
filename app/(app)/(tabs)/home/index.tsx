import { Colors } from "@/assets/colors";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Pressable, ScrollView } from "react-native";
import { SAMPLE_SHORTCUTS } from "@/constants/sampleShortcuts";
import OnboardingView from "@/components/onboarding-view";
import SelfieView from "@/components/selfie-view";
import useSearch from "@/hooks/useSearch";
import { router, useNavigation } from "expo-router";
import { SymbolView } from "expo-symbols";
import pressedOpacity from "@/utils/pressedOpacity";
import CustomLink from "@/components/custom-link";
import ShortcutDashboard from "@/components/shortcut-dashboard";
import { NodDirection, TurnDirection } from "@/constants/types";
import styles from "./styles";
import { useIsFocused } from "@react-navigation/native";
import { Face } from "react-native-vision-camera-face-detector";

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  const [isFrameProcessorEnabled, setIsFrameProcessorEnabled] = useState(true);
  const [turnDirection, setTurnDirection] = useState<TurnDirection>("center");
  const [nodDirection, setNodDirection] = useState<NodDirection>("center");
  const [blinkCount, setBlinkCount] = useState(0);

  const faceCenterTimerRef = useRef<NodeJS.Timeout | null>(null);
  const faceDetectedTimerRef = useRef<NodeJS.Timeout | null>(null);
  const frameProcessorTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const search = useSearch();

  const filteredShortcuts = SAMPLE_SHORTCUTS.filter((shortcut) =>
    shortcut.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleStart = (isStarted: boolean) => {
    setIsStarted(isStarted);
    setTurnDirection("center");
    setNodDirection("center");

    // Delay the frame processor to avoid accidental triggers
    setIsFrameProcessorEnabled(false);
    frameProcessorTimerRef.current = setTimeout(() => {
      setIsFrameProcessorEnabled(true);
    }, 500);
  };

  const handleFaceDetectReset = (face: Face | null) => {
    if (!isStarted) {
      return;
    }

    if (!face && !faceDetectedTimerRef.current) {
      // console.log("No face detected! Starting timer...");
      faceDetectedTimerRef.current = setTimeout(() => {
        handleStart(false);
      }, 3000);
    } else if (face && faceDetectedTimerRef.current) {
      // console.log("Face detected! Clearing timer...");
      clearTimeout(faceDetectedTimerRef.current);
      faceDetectedTimerRef.current = null;
    }
  };

  const handleFaceCenterReset = (direction: TurnDirection) => {
    if (!isStarted) {
      return;
    }

    if (direction === "center" && !faceCenterTimerRef.current) {
      // console.log("Face turned to center! Starting timer...");
      faceCenterTimerRef.current = setTimeout(() => {
        handleStart(false);
      }, 5000);
    } else if (direction !== "center" && faceCenterTimerRef.current) {
      // console.log("Face turned away from center! Clearing timer...");
      clearTimeout(faceCenterTimerRef.current);
      faceCenterTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup timers on unmount
      if (faceCenterTimerRef.current) {
        clearTimeout(faceCenterTimerRef.current);
      }
      if (faceDetectedTimerRef.current) {
        clearTimeout(faceDetectedTimerRef.current);
      }
      if (frameProcessorTimerRef.current) {
        clearTimeout(frameProcessorTimerRef.current);
      }
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          style={({ pressed }) => pressedOpacity({ pressed })}
          onPress={() => router.navigate("/(modal)/reorder-shortcuts")}
        >
          <SymbolView
            name="circle.grid.3x3.circle"
            size={30}
            tintColor={Colors.PRIMARY}
          />
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    >
      <ShortcutDashboard
        shortcuts={filteredShortcuts}
        turnDirection={isStarted ? turnDirection : undefined}
        nodDirection={isStarted ? nodDirection : undefined}
        blinkCount={isStarted ? blinkCount : undefined}
        isPageControlEnabled={!isStarted}
      />

      <SelfieView
        isActive={isFocused}
        isVisible={isStarted}
        isFrameProcessorEnabled={isFrameProcessorEnabled}
        turnDirection={turnDirection}
        onFaceDetected={(face) => {
          handleFaceDetectReset(face);
        }}
        onFaceTurn={({ angle, direction }) => {
          // console.log(`Face turned ${angle} degrees to the ${direction}`);
          setTurnDirection(direction);
          handleFaceCenterReset(direction);
        }}
        onFaceNod={({ angle, direction }) => {
          // console.log(`Face nodded ${angle} degrees to the ${direction}`);
          setNodDirection(direction);
        }}
        onBlinkDetected={({ blinkCount }) => {
          if (!isStarted && turnDirection === "center" && blinkCount > 2) {
            handleStart(true);
            return;
          }
          // console.log("Blink detected", blinkCount);
          setBlinkCount(blinkCount);
        }}
        cameraProps={{
          onError: (error) => console.log(JSON.stringify(error)),
        }}
      />

      {isStarted ? (
        <CustomLink
          title="Cancel"
          onPress={() => setIsStarted(false)}
          color={Colors.PRIMARY}
        />
      ) : (
        <OnboardingView
          onStartedChange={(isStarted) => handleStart(isStarted)}
        />
      )}
    </ScrollView>
  );
}
