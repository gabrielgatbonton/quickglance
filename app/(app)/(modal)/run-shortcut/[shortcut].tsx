import CustomText from "@/components/custom-text";
import { RunningAction } from "@/constants/types";
import { stepsToActions } from "@/utils/shortcutConverter";
import {
  router,
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import styles from "./styles";
import RunningActionItem from "@/components/running-action-item";
import * as Notifications from "expo-notifications";
import HintView from "@/components/hint-view";
import useShortcutRunnerStore from "@/stores/useShortcutRunnerStore";
import SelfieCamera from "@/components/selfie-camera";
import { HEADER_BAR_HEIGHT } from "@/constants/navigation";
import { useQuery } from "@tanstack/react-query";
import { getActions, getShortcut } from "@/services/apiService";
import { Colors } from "@/assets/colors";
import globalStyles from "@/assets/global-styles";
import { runShortcut } from "@/actions/shortcutRunner";
import { useShallow } from "zustand/react/shallow";

export default function ShortcutRunner() {
  const [currentActions, setCurrentActions] = useState<RunningAction[]>([]);
  const [isShortcutCompleted, setIsShortcutCompleted] = useState(false);
  const [countdownTimer, setCountdownTimer] = useState(3);

  // const stepInterval = useRef<number>(null);
  const countdownInterval = useRef<number>(null);

  const { shortcut } = useLocalSearchParams<{ shortcut: string }>();
  const { isShortcutRunning, setIsShortcutRunning } = useShortcutRunnerStore(
    useShallow((state) => ({
      isShortcutRunning: state.isShortcutRunning,
      setIsShortcutRunning: state.setIsShortcutRunning,
    })),
  );
  const navigation = useNavigation();

  const { data: currentShortcut } = useQuery({
    queryKey: ["shortcuts", shortcut],
    queryFn: () => getShortcut(shortcut),
    enabled: Boolean(shortcut),
  });

  const { data: actions } = useQuery({
    queryKey: ["actions"],
    queryFn: getActions,
  });

  useEffect(() => {
    // Transform the steps to actions
    if (currentShortcut && actions) {
      const convertedActions = stepsToActions(
        currentShortcut.steps ?? [],
        actions ?? [],
      ).map((action, index) => ({
        ...action,
        isCurrent: index === 0,
        isCompleted: false,
        isFailed: false,
      })) as RunningAction[];

      setCurrentActions(convertedActions);
    }
  }, [actions, currentShortcut]);

  useEffect(() => {
    if (currentActions.length === 0 || !currentShortcut || isShortcutRunning) {
      return;
    }

    // Run the shortcut when the component mounts
    setIsShortcutRunning(true);

    runShortcut(currentShortcut, currentActions, (updatedActions) =>
      setCurrentActions(updatedActions),
    ).then((result) => {
      if (result.error) {
        // Show error to user
        Alert.alert(
          "Error",
          `An error occurred while running the shortcut: ${result.error}`,
        );
        console.log(result.error);

        // Update action with error icon
        setCurrentActions((prev) =>
          prev.map((a, idx) => ({
            ...a,
            isFailed: idx === result.cause,
          })),
        );
      }

      // Mark all actions as completed
      setIsShortcutCompleted(true);
      console.log("Completed all actions");
    });
  }, [
    currentActions,
    currentShortcut,
    isShortcutRunning,
    setIsShortcutRunning,
  ]);

  useEffect(() => {
    if (!currentShortcut || !isShortcutCompleted) {
      return;
    }

    // Show notification that the shortcut is completed
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Shortcut Completed",
        body: `${currentShortcut.name} has been completed.`,
        data: {
          shortcutId: currentShortcut.id,
          type: "shortcut",
          action: "completed",
        },
      },
      trigger: null,
    });

    // Start the countdown timer
    countdownInterval.current = setInterval(() => {
      setCountdownTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(countdownInterval.current!);
          router.back();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval.current!);
  }, [currentShortcut, isShortcutCompleted]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsShortcutRunning(false);
      };
    }, [setIsShortcutRunning]),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CustomText style={styles.title}>
          {currentShortcut?.name ?? "Loading..."}
        </CustomText>
      ),
    });
  }, [currentShortcut?.name, navigation]);

  if (!currentShortcut || !actions) {
    return (
      <View style={globalStyles.modalLoading}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  return (
    <>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <FlatList
          data={currentActions}
          renderItem={({ item }) => <RunningActionItem item={item} />}
          contentContainerStyle={styles.contentContainer}
          ListFooterComponent={() =>
            isShortcutCompleted && (
              <CustomText style={styles.countdownText}>
                Closing in {countdownTimer} secs...
              </CustomText>
            )
          }
          keyExtractor={(_, index) => index.toString()}
          scrollEnabled={false}
        />

        <SelfieCamera
          isVisible={false}
          onHeadShake={({ isShaking }) => {
            // If the user shakes their head, go back
            if (isShaking) {
              router.back();
            }
          }}
        />
      </ScrollView>

      <View style={[StyleSheet.absoluteFillObject, { top: HEADER_BAR_HEIGHT }]}>
        <HintView
          icon="chevron.left.chevron.right"
          title="How to cancel"
          description="Shake your head left and right to cancel the shortcut."
        />
      </View>
    </>
  );
}
