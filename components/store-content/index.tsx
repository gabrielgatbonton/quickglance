import { SAMPLE_SHORTCUTS } from "@/utils/sampleShortcuts";
import { ReactNode } from "react";
import { FlatList } from "react-native";
import StoreItem from "../store-item";
import Animated, { FadeIn } from "react-native-reanimated";
import { STORE_KEYS } from "@/utils/storeKeys";
import styles from "./styles";
import { SAMPLE_SERVICES } from "@/utils/sampleServices";
import ServiceItem from "../service-item";

type StoreContentProps = {
  storeKey: string;
  search: string;
};

export default function StoreContent({ storeKey, search }: StoreContentProps) {
  const stores: Record<string, ReactNode> = {
    [STORE_KEYS.USER_CREATED]: (
      <Animated.View key={storeKey} entering={FadeIn.duration(250)}>
        <FlatList
          data={SAMPLE_SHORTCUTS.filter(
            (shortcut) =>
              shortcut.name.toLowerCase().includes(search.toLowerCase()) ||
              shortcut.description.toLowerCase().includes(search.toLowerCase()),
          )}
          renderItem={({ item }) => <StoreItem item={item} />}
          contentContainerStyle={styles.contentContainer}
          scrollEnabled={false}
        />
      </Animated.View>
    ),
    [STORE_KEYS.SERVICES]: (
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
    ),
  };

  return stores[storeKey];
}
