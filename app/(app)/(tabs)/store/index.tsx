import { useRef, useState } from "react";
import { NativeSyntheticEvent, Platform, ScrollView } from "react-native";
import SegmentedControl, {
  NativeSegmentedControlIOSChangeEvent,
} from "@react-native-segmented-control/segmented-control";
import globalStyles from "@/assets/global-styles";
import StoreContent from "@/components/store-content";
import { STORE_KEYS } from "@/constants/storeKeys";
import styles from "./styles";
import useSearch from "@/hooks/useSearch";
import { useScrollToTop } from "@react-navigation/native";
import { HEADER_HEIGHT } from "@/constants/navigation";
import { useQuery } from "@tanstack/react-query";
import { getPublicShortcuts, getServices } from "@/services/apiService";

const STORE_TABS = Object.values(STORE_KEYS);

export default function Store() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentTab = STORE_TABS[selectedIndex];

  const scrollViewRef = useRef<ScrollView>(null);
  useScrollToTop(
    useRef({
      scrollToTop: () => scrollViewRef.current?.scrollTo({ y: -HEADER_HEIGHT }),
    }),
  );

  const search = useSearch();

  const { data: publicShortcuts } = useQuery({
    queryKey: ["shortcuts"],
    queryFn: getPublicShortcuts,
  });

  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[
        globalStyles.container,
        Platform.OS === "ios" && { paddingTop: 0 },
      ]}
      scrollToOverflowEnabled
      ref={scrollViewRef}
    >
      <SegmentedControl
        values={STORE_TABS}
        selectedIndex={selectedIndex}
        onChange={(
          event: NativeSyntheticEvent<NativeSegmentedControlIOSChangeEvent>,
        ) => {
          setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
        }}
        style={styles.segmentedControl}
      />

      <StoreContent
        storeKey={currentTab}
        userShortcuts={publicShortcuts?.filter(
          (shortcut) =>
            shortcut.name.toLowerCase().includes(search.toLowerCase()) ||
            shortcut.description.toLowerCase().includes(search.toLowerCase()),
        )}
        services={services?.filter((service) =>
          service.name.toLowerCase().includes(search.toLowerCase()),
        )}
      />
    </ScrollView>
  );
}
