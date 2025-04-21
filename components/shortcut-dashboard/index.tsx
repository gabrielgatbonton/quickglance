import { Colors } from "@/assets/colors";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList, useWindowDimensions } from "react-native";
import { usePagerView } from "react-native-pager-view";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  FadingTransition,
  ZoomIn,
} from "react-native-reanimated";
import ShortcutItem from "../shortcut-item";
import { router } from "expo-router";
import { NodDirection, Shortcut, TurnDirection } from "@/constants/types";
import styles from "./styles";
import { useCallback, useEffect } from "react";
import useShortcutRunnerStore from "@/stores/useShortcutRunnerStore";
import PageControl from "../page-control";

const SHORTCUTS_PER_SCREEN = 6;
const SHORTCUTS_PER_ROW = 2;

type ShortcutDashboardProps = {
  shortcuts: Shortcut[];
  turnDirection?: TurnDirection;
  nodDirection?: NodDirection;
  blinkCount?: number;
  isPageControlEnabled?: boolean;
};

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function ShortcutDashboard({
  shortcuts,
  turnDirection,
  nodDirection,
  blinkCount,
  isPageControlEnabled = true,
}: ShortcutDashboardProps) {
  const { AnimatedPagerView, activePage, setPage, ...rest } = usePagerView();
  const { width, height } = useWindowDimensions();
  const isShortcutRunning = useShortcutRunnerStore(
    (state) => state.isShortcutRunning,
  );

  const numOfScreens = Math.ceil(shortcuts.length / SHORTCUTS_PER_SCREEN);
  const shortcutsHeight = height * 0.46;
  const gradientWidth = width / 2 - 7;
  const isStartedNavigation = turnDirection && turnDirection !== "center";
  const activeColumn =
    turnDirection === "left" ? 0 : turnDirection === "right" ? 1 : null;

  const getCurrentFocusedShortcut = useCallback((): Shortcut | null => {
    if (!isStartedNavigation || activeColumn === null || !nodDirection)
      return null;

    const startIndex = activePage * SHORTCUTS_PER_SCREEN;
    let row = -1;

    if (nodDirection === "up") row = 0;
    else if (nodDirection === "center") row = 1;
    else if (nodDirection === "down") row = 2;

    if (row === -1) return null;

    const focusedIndex = startIndex + row * SHORTCUTS_PER_ROW + activeColumn;
    return focusedIndex < shortcuts.length ? shortcuts[focusedIndex] : null;
  }, [activePage, activeColumn, isStartedNavigation, nodDirection, shortcuts]);

  const renderShortcutPage = useCallback(
    (pageIndex: number) => {
      const pageShortcuts = shortcuts.slice(
        pageIndex * SHORTCUTS_PER_SCREEN,
        (pageIndex + 1) * SHORTCUTS_PER_SCREEN,
      );

      return (
        <FlatList
          key={pageIndex}
          data={pageShortcuts}
          renderItem={({ item, index }) => (
            <Animated.View
              entering={ZoomIn.duration(350)
                .easing(Easing.out(Easing.exp))
                .delay(index * 100)}
            >
              <ShortcutItem
                item={item}
                isStarted={isStartedNavigation}
                isItemFocused={getCurrentFocusedShortcut()?.id === item.id}
                isColumnSelected={activeColumn === index % SHORTCUTS_PER_ROW}
                onPress={() =>
                  router.navigate(`/(modal)/run-shortcut/${item.id}`)
                }
              />
            </Animated.View>
          )}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.contentContainer}
          numColumns={SHORTCUTS_PER_ROW}
          scrollEnabled={false}
        />
      );
    },
    [activeColumn, getCurrentFocusedShortcut, isStartedNavigation, shortcuts],
  );

  useEffect(() => {
    // Check if the user has blinked more than 3 times
    if (blinkCount && blinkCount > 2 && !isShortcutRunning) {
      const shortcut = getCurrentFocusedShortcut();

      // Run the shortcut if it exists
      if (shortcut) {
        router.navigate(`/(modal)/run-shortcut/${shortcut.id}`);
      }
    }
  }, [blinkCount, getCurrentFocusedShortcut, isShortcutRunning]);

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
        style={{ height: shortcutsHeight }}
        pageMargin={20}
      >
        {Array.from({ length: numOfScreens }).map((_, index) =>
          renderShortcutPage(index),
        )}
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
