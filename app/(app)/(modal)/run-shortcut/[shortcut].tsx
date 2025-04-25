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

export default function ShortcutRunner() {
  const [currentActions, setCurrentActions] = useState<RunningAction[]>([]);
  const [isShortcutCompleted, setIsShortcutCompleted] = useState(false);
  const [countdownTimer, setCountdownTimer] = useState(3);

  const stepInterval = useRef<NodeJS.Timeout | null>(null);
  const countdownInterval = useRef<NodeJS.Timeout | null>(null);

  const { shortcut } = useLocalSearchParams<{ shortcut: string }>();
  const setIsShortcutRunning = useShortcutRunnerStore(
    (state) => state.setIsShortcutRunning,
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
    if (currentShortcut && actions) {
      const convertedActions = stepsToActions(
        currentShortcut.steps ?? [],
        actions ?? [],
      ).map((action, index) => ({
        ...action,
        isCurrent: index === 0,
        isCompleted: false,
      })) as RunningAction[];

      setCurrentActions(convertedActions);
    }
  }, [actions, currentShortcut]);

  useEffect(() => {
    // Move current to the next index every 2 seconds
    stepInterval.current = setInterval(() => {
      setCurrentActions((prevActions) => {
        let hasCurrent = false;

        const newActions = prevActions.map((action) => {
          if (action.isCurrent) {
            return {
              ...action,
              isCurrent: false,
              isCompleted: true,
            };
          } else if (!hasCurrent && !action.isCompleted) {
            hasCurrent = true;
            return {
              ...action,
              isCurrent: true,
            };
          }
          return action;
        });

        return newActions;
      });
    }, 2000);

    return () => clearInterval(stepInterval.current!);
  }, []);

  useEffect(() => {
    // Check if all actions are completed
    if (
      currentActions.length > 0 &&
      !currentActions.find((action) => action.isCurrent)
    ) {
      console.log("Completed all actions");
      clearInterval(stepInterval.current!);
      setIsShortcutCompleted(true);

      // Show notification that the shortcut is completed
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Shortcut Completed",
          body: `${currentShortcut?.name} has been completed.`,
        },
        trigger: null,
      });

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
    }

    return () => clearInterval(countdownInterval.current!);
  }, [currentActions, currentShortcut?.name]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CustomText style={styles.title}>
          {currentShortcut?.name ?? "Loading..."}
        </CustomText>
      ),
    });
  }, [currentShortcut?.name, navigation]);

  useFocusEffect(
    useCallback(() => {
      setIsShortcutRunning(true);
    }, [setIsShortcutRunning]),
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsShortcutRunning(false);
      };
    }, [setIsShortcutRunning]),
  );

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
