import { Colors } from "@/assets/colors";
import { Shortcut } from "@/constants/types";
import { router, useNavigation } from "expo-router";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import Sortable from "react-native-sortables";
import { SortableGridRenderItemInfo } from "react-native-sortables/dist/typescript/types";
import styles from "./styles";
import ReorderShortcutItem from "@/components/reorder-shortcut-item";
import CustomLink from "@/components/custom-link";
import { useQuery } from "@tanstack/react-query";
import { getUserShortcuts } from "@/services/apiService";
import { orderKeysToArr } from "@/utils/shortcutConverter";

export default function ReorderShortcuts() {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);

  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();

  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  const snapOffsetX = width * 0.9;

  const { data: userShortcuts } = useQuery({
    queryKey: ["shortcuts", "user"],
    queryFn: getUserShortcuts,
  });

  useEffect(() => {
    if (userShortcuts) {
      setShortcuts(userShortcuts);
    }
  }, [userShortcuts]);

  const renderItem = useCallback(
    ({ item }: SortableGridRenderItemInfo<Shortcut>) => (
      <ReorderShortcutItem item={item} />
    ),
    [],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomLink
          title="Done"
          bold
          onPress={() => {
            router.back();
            console.log("Shortcuts saved!");
          }}
          color={Colors.PRIMARY}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        contentInsetAdjustmentBehavior="automatic"
        scrollToOverflowEnabled
        style={styles.shortcutsGrid}
        ref={scrollViewRef}
      >
        <Sortable.Grid
          data={shortcuts}
          onDragEnd={({ data, keyToIndex }) => {
            setShortcuts(data);
            console.log(orderKeysToArr(keyToIndex, { increment: true }));
          }}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          rowGap={10}
          columnGap={10}
          snapOffsetX={snapOffsetX}
          scrollableRef={scrollViewRef}
        />
      </Animated.ScrollView>
    </View>
  );
}
