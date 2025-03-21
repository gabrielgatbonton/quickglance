import { Colors } from "@/assets/colors";
import { useState } from "react";
import {
  Button,
  FlatList,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import ShortcutItem from "@/components/shortcut-item";
import styles from "./styles";
import globalStyles from "@/assets/global-styles";
import { SAMPLE_SHORTCUTS } from "@/utils/sampleShortcuts";
import { usePagerView } from "react-native-pager-view";
import { PageControlView } from "@candlefinance/page-control";
import OnboardingView from "@/components/onboarding-view";
import SelfieView from "@/components/selfie-view";
import useSearch from "@/hooks/useSearch";

const SHORTCUTS_PER_SCREEN = 6;

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);

  const { AnimatedPagerView, activePage, setPage, ...rest } = usePagerView();
  const { height } = useWindowDimensions();
  const search = useSearch();

  const filteredShortcuts = SAMPLE_SHORTCUTS.filter((shortcut) =>
    shortcut.name.toLowerCase().includes(search.toLowerCase()),
  );
  const numOfScreens = Math.ceil(
    filteredShortcuts.length / SHORTCUTS_PER_SCREEN,
  );
  const shortcutsHeight = height * 0.42;

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={globalStyles.container}
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
