import { Colors } from "@/assets/colors";
import { SAMPLE_SHORTCUTS } from "@/constants/sampleShortcuts";
import { Shortcut } from "@/constants/types";
import { router, useNavigation } from "expo-router";
import { useCallback, useLayoutEffect, useState } from "react";
import { Button, useWindowDimensions, View } from "react-native";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import Sortable from "react-native-sortables";
import { SortableGridRenderItemInfo } from "react-native-sortables/dist/typescript/types";
import styles from "./styles";
import ReorderShortcutItem from "@/components/reorder-shortcut-item";

export default function ReorderShortcuts() {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>(SAMPLE_SHORTCUTS);

  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();

  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  const snapOffsetX = width * 0.9;

  const renderItem = useCallback(
    ({ item }: SortableGridRenderItemInfo<Shortcut>) => (
      <ReorderShortcutItem item={item} />
    ),
    [],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Done"
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
      <Animated.ScrollView style={styles.shortcutsGrid} ref={scrollViewRef}>
        <Sortable.Grid
          data={shortcuts}
          onDragEnd={({ data }) => setShortcuts(data)}
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
