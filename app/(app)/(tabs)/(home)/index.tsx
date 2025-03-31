import { Colors } from "@/assets/colors";
import { useLayoutEffect, useState } from "react";
import {
  Button,
  FlatList,
  Pressable,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import ShortcutItem from "@/components/shortcut-item";
import styles from "./styles";
import globalStyles from "@/assets/global-styles";
import { SAMPLE_SHORTCUTS } from "@/constants/sampleShortcuts";
import { usePagerView } from "react-native-pager-view";
import { PageControlView } from "@candlefinance/page-control";
import OnboardingView from "@/components/onboarding-view";
import SelfieView from "@/components/selfie-view";
import useSearch from "@/hooks/useSearch";
import { router, useNavigation } from "expo-router";
import { SymbolView } from "expo-symbols";
import pressedOpacity from "@/utils/pressedOpacity";

const SHORTCUTS_PER_SCREEN = 6;

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);

  const { AnimatedPagerView, activePage, setPage, ...rest } = usePagerView();
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const search = useSearch();

  const filteredShortcuts = SAMPLE_SHORTCUTS.filter((shortcut) =>
    shortcut.name.toLowerCase().includes(search.toLowerCase()),
  );
  const numOfScreens = Math.ceil(
    filteredShortcuts.length / SHORTCUTS_PER_SCREEN,
  );
  const shortcutsHeight = height * 0.42;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          style={({ pressed }) => pressedOpacity({ pressed })}
          onPress={() => router.push("/(modal)/(reorder-shortcuts)")}
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
      contentContainerStyle={globalStyles.container}
      scrollEnabled={false}
    >
      <AnimatedPagerView
        {...rest}
        style={{ height: shortcutsHeight }}
        pageMargin={20}
      >
        {Array.from({
          length: numOfScreens,
        }).map((_, index) => (
          <FlatList
            key={index}
            data={filteredShortcuts.slice(
              index * SHORTCUTS_PER_SCREEN,
              (index + 1) * SHORTCUTS_PER_SCREEN,
            )}
            renderItem={({ item }) => <ShortcutItem item={item} />}
            keyExtractor={(item) => item.id}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.contentContainer}
            numColumns={2}
            scrollEnabled={false}
          />
        ))}
      </AnimatedPagerView>

      <PageControlView
        currentPage={activePage}
        hidesForSinglePage
        numberOfPages={numOfScreens}
        onPageChange={({ nativeEvent: { currentPage } }) =>
          setPage(currentPage)
        }
        currentPageIndicatorTintColor={Colors.PRIMARY}
        pageIndicatorTintColor={Colors.TERTIARY}
        style={styles.pageControlView}
      />

      {isStarted ? (
        <>
          <SelfieView />
          <Button
            title="Cancel"
            onPress={() => setIsStarted(false)}
            color={Colors.PRIMARY}
          />
        </>
      ) : (
        <OnboardingView onStartedChange={setIsStarted} />
      )}
    </ScrollView>
  );
}
