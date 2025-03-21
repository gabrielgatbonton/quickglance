import { useState } from "react";
import { NativeSyntheticEvent, ScrollView } from "react-native";
import SegmentedControl, {
  NativeSegmentedControlIOSChangeEvent,
} from "@react-native-segmented-control/segmented-control";
import globalStyles from "@/assets/global-styles";
import StoreContent from "@/components/store-content";
import { STORE_KEYS } from "@/utils/storeKeys";
import styles from "./styles";
import useSearch from "@/hooks/useSearch";

const STORE_TABS = Object.values(STORE_KEYS);

export default function Store() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const search = useSearch();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[globalStyles.container, { paddingTop: 0 }]}
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

      <StoreContent storeKey={STORE_TABS[selectedIndex]} search={search} />
    </ScrollView>
  );
}
