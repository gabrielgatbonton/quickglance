import { FlatList } from "react-native";
import StoreItem from "../store-item";
import Animated, { BounceIn, FadeIn } from "react-native-reanimated";
import { STORE_KEYS } from "@/constants/storeKeys";
import styles from "./styles";
import ServiceItem from "../service-item";
import { Service, Shortcut } from "@/constants/types";
import CustomText from "../custom-text";
import IconView from "../icon-view";

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
            <Animated.View
              entering={BounceIn.duration(300)}
              style={styles.emptyContainer}
            >
              <IconView
                name={["square.on.square.dashed", "layers"]}
                color="gray"
                size={80}
              />
              <CustomText style={styles.emptyText}>
                No shortcuts available.
              </CustomText>
            </Animated.View>
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
            <Animated.View
              entering={BounceIn.duration(300)}
              style={styles.emptyContainer}
            >
              <IconView
                name={["building.2.crop.circle", "business"]}
                size={80}
                color="gray"
              />
              <CustomText style={styles.emptyText}>
                No services available.
              </CustomText>
            </Animated.View>
          }
        />
      </Animated.View>
    );
  }

  return null;
}
