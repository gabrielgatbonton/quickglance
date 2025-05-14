import { Colors } from "@/assets/colors";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Pressable, ScrollView } from "react-native";
import OnboardingView from "@/components/onboarding-view";
import SelfieView from "@/components/selfie-view";
import useSearch from "@/hooks/useSearch";
import { router, useNavigation } from "expo-router";
import { SymbolView } from "expo-symbols";
import pressedOpacity from "@/utils/pressedOpacity";
import CustomLink from "@/components/custom-link";
import ShortcutDashboard from "@/components/shortcut-dashboard";
import AndroidSearchBar from "@/components/android-searchbar";
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from "react-native-reanimated";
import {
  Emotion,
  NodDirection,
  Shortcut,
  TurnDirection,
} from "@/constants/types";
import styles from "./styles";
import { useIsFocused } from "@react-navigation/native";
import { Face } from "react-native-vision-camera-face-detector";
import { useQuery } from "@tanstack/react-query";
import { getUser, getUserShortcuts } from "@/services/apiService";
import EmotionPopover from "@/components/emotion-popover";
import IconView from "@/components/icon-view";

export default function Home() {
  const [currentShortcuts, setCurrentShortcuts] = useState<Shortcut[] | null>(
    null
  );
  const [isStarted, setIsStarted] = useState(false);
  const [isFrameProcessorEnabled, setIsFrameProcessorEnabled] = useState(true);
  const [turnDirection, setTurnDirection] = useState<TurnDirection>("center");
  const [nodDirection, setNodDirection] = useState<NodDirection>("center");
  // const [blinkCount, setBlinkCount] = useState(0);
  const [blinkDuration, setBlinkDuration] = useState(0);
  const [emotion, setEmotion] = useState<Emotion | null>(null);

  const faceCenterTimerRef = useRef<number>(null);
  const faceDetectedTimerRef = useRef<number>(null);
  const frameProcessorTimerRef = useRef<number>(null);

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const { search, setSearchFn, isAndroid } = useSearch();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const { data: userShortcuts } = useQuery({
    queryKey: ["shortcuts", "user"],
    queryFn: getUserShortcuts,
    enabled: Boolean(user),
  });

  useEffect(() => {
    if (userShortcuts) {
      // console.log({ userShortcuts, search });

      if (!search) {
        setCurrentShortcuts(userShortcuts);
        return;
      }

      setCurrentShortcuts(
        userShortcuts.filter((shortcut) =>
          shortcut.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, userShortcuts]);

  useEffect(() => {
    if (user) {
      console.log("Current user:", user);
    }
  }, [user]);

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
          <IconView
            name={["circle.grid.3x3.circle", "apps"]}
            color={Colors.PRIMARY}
            size={23}
          />
        </Pressable>
      ),
    });
  }, [navigation]);

  // Hide the header when the user is in the onboarding screen
  const opacity = useSharedValue(isStarted ? 0 : 1);

  useEffect(() => {
    opacity.value = withTiming(isStarted ? 0 : 1, { duration: 200 });
  }, [isStarted]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    >
      {isAndroid && (
        <Animated.View style={[animatedStyle]}>
          <AndroidSearchBar
            style={{ paddingHorizontal: 14 }}
            onSearch={setSearchFn}
          />
        </Animated.View>
      )}

      <ShortcutDashboard
        shortcuts={currentShortcuts}
        turnDirection={isStarted ? turnDirection : undefined}
        nodDirection={isStarted ? nodDirection : undefined}
        // blinkCount={isStarted ? blinkCount : undefined}
        blinkDuration={isStarted ? blinkDuration : undefined}
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
        onBlinkDetected={({ blinkCount, blinkDuration }) => {
          if (
            !isStarted &&
            turnDirection === "center" &&
            blinkCount > 1 &&
            blinkDuration > 600
          ) {
            handleStart(true);
            return;
          }
          // console.log("Blink detected", blinkDuration);
          setBlinkDuration(blinkDuration);
        }}
        onEmotionDetected={({ emotion, results }) => {
          // console.log("Emotion detected", emotion);
          // console.log("Other emotions", results);
          setEmotion(emotion);
        }}
        cameraProps={{
          onError: (error) => console.log(JSON.stringify(error)),
        }}
      />

      <EmotionPopover emotion={emotion} />

      {currentShortcuts?.length ? (
        isStarted ? (
          <CustomLink
            title="Cancel"
            onPress={() => setIsStarted(false)}
            color={Colors.PRIMARY}
          />
        ) : (
          <OnboardingView
            onStartedChange={(isStarted) => handleStart(isStarted)}
          />
        )
      ) : null}
    </ScrollView>
  );
}
