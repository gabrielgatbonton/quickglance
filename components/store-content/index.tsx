import { SAMPLE_SHORTCUTS } from "@/constants/sampleShortcuts";
import { FlatList } from "react-native";
import StoreItem from "../store-item";
import Animated, { FadeIn } from "react-native-reanimated";
import { STORE_KEYS } from "@/constants/storeKeys";
import styles from "./styles";
import { SAMPLE_SERVICES } from "@/constants/sampleServices";
import ServiceItem from "../service-item";

type StoreContentProps = {
  storeKey: string;
  search: string;
};

export default function StoreContent({ storeKey, search }: StoreContentProps) {
  if (storeKey === STORE_KEYS.USER_CREATED) {
    return (
      <Animated.View key={storeKey} entering={FadeIn.duration(250)}>
        <FlatList
          data={SAMPLE_SHORTCUTS.filter(
            (shortcut) =>
              shortcut.name.toLowerCase().includes(search.toLowerCase()) ||
              shortcut.description.toLowerCase().includes(search.toLowerCase()),
          )}
          renderItem={({ item }) => <StoreItem item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.contentContainer}
          scrollEnabled={false}
        />
      </Animated.View>
    );
  }

  if (storeKey === STORE_KEYS.SERVICES) {
    return (
      <Animated.View key={storeKey} entering={FadeIn.duration(250)}>
        <FlatList
          data={SAMPLE_SERVICES.filter((shortcut) =>
            shortcut.name.toLowerCase().includes(search.toLowerCase()),
          )}
          renderItem={({ item }) => <ServiceItem item={item} />}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.contentContainer}
          numColumns={2}
          scrollEnabled={false}
        />
      </Animated.View>
    );
  }

  return null;
}
