import { FlatList } from "react-native";
import StoreItem from "../store-item";
import Animated, { FadeIn } from "react-native-reanimated";
import { STORE_KEYS } from "@/constants/storeKeys";
import styles from "./styles";
import ServiceItem from "../service-item";
import { Service, Shortcut } from "@/constants/types";
import EmptyDashboard from "../empty-dashboard";

type StoreContentProps = {
  storeKey: string;
  userShortcuts?: Shortcut[];
  services?: Service[];
};

export default function StoreContent({
  storeKey,
  userShortcuts,
  services,
}: StoreContentProps) {
  if (storeKey === STORE_KEYS.PUBLIC) {
    return (
      <Animated.View key={storeKey} entering={FadeIn.duration(250)}>
        <FlatList
          data={userShortcuts}
          renderItem={({ item }) => <StoreItem item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.contentContainer}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          scrollEnabled={false}
          ListEmptyComponent={
            <EmptyDashboard
              iosIcon="square.grid.2x2"
              androidIcon="layers"
              text="No shortcuts available"
            />
          }
        />
      </Animated.View>
    );
  }

  if (storeKey === STORE_KEYS.SERVICES) {
    return (
      <Animated.View key={storeKey} entering={FadeIn.duration(250)}>
        <FlatList
          data={services}
          renderItem={({ item }) => <ServiceItem item={item} />}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.contentContainer}
          numColumns={2}
          scrollEnabled={false}
          ListEmptyComponent={
            <EmptyDashboard
              iosIcon="square.grid.2x2"
              androidIcon="layers"
              text="No services available"
            />
          }
        />
      </Animated.View>
    );
  }

  return null;
}
