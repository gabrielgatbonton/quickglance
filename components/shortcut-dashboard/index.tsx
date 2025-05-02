import { Colors } from "@/assets/colors";
import { LinearGradient } from "expo-linear-gradient";
import {
  ActivityIndicator,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { usePagerView } from "react-native-pager-view";
import Animated, {
  BounceIn,
  FadeIn,
  FadeOut,
  FadingTransition,
} from "react-native-reanimated";
import { router } from "expo-router";
import { NodDirection, Shortcut, TurnDirection } from "@/constants/types";
import styles from "./styles";
import { useEffect, useMemo } from "react";
import useShortcutRunnerStore from "@/stores/useShortcutRunnerStore";
import PageControl from "../page-control";
import { SymbolView } from "expo-symbols";
import ShortcutPage from "../shortcut-page";

const SHORTCUTS_PER_SCREEN = 6;
const SHORTCUTS_PER_ROW = 2;

type ShortcutDashboardProps = {
  shortcuts: Shortcut[] | null;
  turnDirection?: TurnDirection;
  nodDirection?: NodDirection;
  blinkDuration?: number;
  isPageControlEnabled?: boolean;
};

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function ShortcutDashboard({
  shortcuts,
  turnDirection,
  nodDirection,
  blinkDuration,
  isPageControlEnabled = true,
}: ShortcutDashboardProps) {
  const { AnimatedPagerView, activePage, setPage, ...rest } = usePagerView();
  const { width, height } = useWindowDimensions();
  const isShortcutRunning = useShortcutRunnerStore(
    (state) => state.isShortcutRunning,
  );

  const shortcutsHeight = height * 0.46;
  const gradientWidth = width / 2 - 7;
  const isStartedNavigation = turnDirection
    ? turnDirection !== "center"
    : false;
  const activeColumn =
    turnDirection === "left" ? 0 : turnDirection === "right" ? 1 : null;

  const numOfScreens = useMemo(
    () =>
      shortcuts?.length
        ? Math.ceil(shortcuts.length / SHORTCUTS_PER_SCREEN)
        : 0,
    [shortcuts?.length],
  );

  const focusedShortcut = useMemo((): Shortcut | null => {
    if (
      !shortcuts ||
      !isStartedNavigation ||
      !nodDirection ||
      activeColumn === null
    ) {
      return null;
    }

    const startIndex = activePage * SHORTCUTS_PER_SCREEN;
    let row = -1;

    if (nodDirection === "up") row = 0;
    else if (nodDirection === "center") row = 1;
    else if (nodDirection === "down") row = 2;

    if (row === -1) {
      return null;
    }

    const focusedIndex = startIndex + row * SHORTCUTS_PER_ROW + activeColumn;
    return focusedIndex < shortcuts.length ? shortcuts[focusedIndex] : null;
  }, [activePage, activeColumn, isStartedNavigation, nodDirection, shortcuts]);

  useEffect(() => {
    // Check if the user has blinked more than 3 times
    if (blinkDuration! > 600 && !isShortcutRunning) {
      // Run the shortcut if it exists
      if (focusedShortcut) {
        router.navigate(`/(modal)/run-shortcut/${focusedShortcut.id}`);
      }
    }
  }, [blinkDuration, focusedShortcut, isShortcutRunning]);

  if (!shortcuts) {
    return (
      <View style={[styles.emptyContainer, { height: shortcutsHeight }]}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  if (shortcuts.length === 0) {
    return (
      <Animated.View
        entering={BounceIn}
        style={[styles.emptyContainer, { height: shortcutsHeight }]}
      >
        <SymbolView name="square.on.square.dashed" size={80} tintColor="gray" />
        <Text style={styles.emptyText}>No shortcuts available.</Text>
      </Animated.View>
    );
  }

  return (
    <>
      {(turnDirection === "left" || turnDirection === "right") && (
        <AnimatedLinearGradient
          entering={FadeIn.duration(250)}
          exiting={FadeOut.duration(250)}
          layout={FadingTransition.duration(250)}
          colors={[Colors.PRIMARY, "rgba(255, 255, 255, 0)"]}
          locations={[0.6, 1]}
          style={[
            styles.gradientContainer,
            { width: gradientWidth },
            turnDirection === "left" && styles.leftGradient,
            turnDirection === "right" && styles.rightGradient,
          ]}
        />
      )}

      <AnimatedPagerView
        {...rest}
        key={numOfScreens}
        style={{ height: shortcutsHeight }}
        initialPage={0}
        pageMargin={20}
      >
        {Array.from({ length: numOfScreens }).map((_, index) => (
          <ShortcutPage
            key={index}
            pageIndex={index}
            focusedShortcut={focusedShortcut}
            activeColumn={activeColumn}
            shortcuts={shortcuts}
            shortcutsPerPage={SHORTCUTS_PER_SCREEN}
            shortcutsPerRow={SHORTCUTS_PER_ROW}
            isStarted={isStartedNavigation}
          />
        ))}
      </AnimatedPagerView>

      {isPageControlEnabled && (
        <PageControl
          index={activePage}
          length={numOfScreens}
          onDotClicked={(i) => setPage(i)}
          containerStyle={styles.pageControlView}
        />
      )}
    </>
  );
}
