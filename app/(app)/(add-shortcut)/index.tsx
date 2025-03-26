import { Alert, Pressable, Text, View } from "react-native";
import { useCallback, useRef, useState } from "react";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { SymbolView } from "expo-symbols";
import pressedOpacity from "@/utils/pressedOpacity";
import { SAMPLE_CATEGORIES } from "@/constants/sampleCategories";
import styles from "./styles";
import ShortcutCategoryItem from "@/components/shortcut-category-item";
import { Action, Category } from "@/constants/types";
import ShortcutActionItem from "@/components/shortcut-action-item";
import AddActionItem from "@/components/add-action-item";
import Sortable from "react-native-sortables";
import { SortableGridRenderItemInfo } from "react-native-sortables/dist/typescript/types";
import Animated, {
  FadeIn,
  useAnimatedRef,
  ZoomIn,
} from "react-native-reanimated";
import * as Crypto from "expo-crypto";
import CustomButton from "@/components/custom-button";

export default function AddShortcut() {
  const [addedActions, setAddedActions] = useState<Action[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();

  const index = selectedCategory ? 1 : 0;

  const onActionAdd = (action: Action) => {
    setAddedActions((prev) => [
      ...prev,
      { ...action, id: Crypto.randomUUID() },
    ]);

    // Collapse the sheet to show actions
    bottomSheetRef.current?.collapse();

    // Workaround to scroll to the last added item
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd();
    }, 300);
  };

  const onActionDelete = (action: Action) => {
    Alert.alert(
      "Remove shortcut?",
      `Removing "${action.name}" cannot be undone.`,
      [
        {
          text: "OK",
          onPress: () => {
            setAddedActions((prev) =>
              prev.filter((addedAction) => addedAction.id !== action.id),
            );
          },
        },
        { text: "Cancel", style: "cancel" },
      ],
    );
  };

  const onActionPress = (action: Action) => {
    setSelectedAction(action);

    // Expand the sheet to show action preview
    bottomSheetRef.current?.expand();
  };

  const onCategoryPress = (category: Category) => {
    setSelectedCategory(category);
  };

  const renderItem = useCallback(
    ({ item, index }: SortableGridRenderItemInfo<Action>) => (
      <AddActionItem
        item={item}
        index={index}
        onActionDelete={onActionDelete}
      />
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.shortcutsContainer}>
        {addedActions.length > 0 ? (
          <Animated.ScrollView
            onScrollBeginDrag={() => bottomSheetRef.current?.collapse()}
            style={styles.shortcutsGrid}
            ref={scrollViewRef}
          >
            <Sortable.Grid
              data={addedActions}
              onDragEnd={({ data }) => setAddedActions(data)}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              rowGap={10}
              columnGap={10}
              scrollableRef={scrollViewRef}
            />
          </Animated.ScrollView>
        ) : (
          <View style={styles.noShortcutsContainer}>
            <Text style={styles.dropText}>
              Add a shortcut by tapping on them!
            </Text>
          </View>
        )}
      </View>

      {selectedAction ? (
        <BottomSheet
          snapPoints={["35%", "70%"]}
          index={index}
          enableDynamicSizing={false}
          ref={bottomSheetRef}
        >
          <BottomSheetView style={styles.sheetHeaderContainer}>
            <Pressable
              style={({ pressed }) => pressedOpacity({ pressed })}
              onPress={() => setSelectedAction(null)}
            >
              <SymbolView
                name="arrow.backward.circle"
                tintColor="lightgray"
                size={40}
              />
            </Pressable>
            <Text style={styles.sheetHeaderTitle}>Action Preview</Text>
            <Pressable style={({ pressed }) => pressedOpacity({ pressed })}>
              <SymbolView
                name="arrow.right.circle"
                tintColor="lightgray"
                size={40}
              />
            </Pressable>
          </BottomSheetView>

          <Animated.View
            entering={FadeIn.duration(150)}
            style={{
              flex: 1,
              justifyContent: "space-around",
              padding: 30,
            }}
          >
            <View style={{ alignItems: "center", rowGap: 15 }}>
              <SymbolView
                name={selectedAction.icon}
                size={80}
                tintColor={selectedAction.gradientStart}
              />
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                {selectedAction.name}
              </Text>
            </View>

            <CustomButton
              title="Add"
              color={selectedAction.gradientStart}
              onPress={() => {
                onActionAdd(selectedAction);
                setSelectedAction(null);
              }}
            />
          </Animated.View>
        </BottomSheet>
      ) : selectedCategory ? (
        <BottomSheet
          snapPoints={["35%", "70%"]}
          index={index}
          enableDynamicSizing={false}
          ref={bottomSheetRef}
        >
          <BottomSheetView style={styles.sheetHeaderContainer}>
            <Pressable
              style={({ pressed }) => pressedOpacity({ pressed })}
              onPress={() => setSelectedCategory(null)}
            >
              <SymbolView
                name="arrow.backward.circle"
                tintColor="lightgray"
                size={40}
              />
            </Pressable>
            <Text style={styles.sheetHeaderTitle}>Select an action</Text>
            <Pressable disabled>
              <SymbolView
                name="arrow.right.circle"
                tintColor="lightgray"
                size={40}
              />
            </Pressable>
          </BottomSheetView>

          <BottomSheetFlatList
            key="actions-list"
            data={
              SAMPLE_CATEGORIES.find(
                (sampleCategory) => sampleCategory.id === selectedCategory.id,
              )?.actions
            }
            renderItem={({ item }) => (
              <Animated.View entering={ZoomIn.duration(100)}>
                <ShortcutActionItem
                  item={item}
                  onActionPress={onActionPress}
                  onActionAdd={onActionAdd}
                />
              </Animated.View>
            )}
            contentContainerStyle={styles.contentContainer}
            columnWrapperStyle={styles.columnWrapper}
            numColumns={2}
          />
        </BottomSheet>
      ) : (
        <BottomSheet
          snapPoints={["35%", "35%"]}
          index={index}
          enableDynamicSizing={false}
          ref={bottomSheetRef}
        >
          <BottomSheetView style={styles.sheetHeaderContainer}>
            <Text style={styles.sheetHeaderTitle}>Select a category</Text>
          </BottomSheetView>

          <BottomSheetFlatList
            key="categories-list"
            data={SAMPLE_CATEGORIES}
            renderItem={({ item }) => (
              <ShortcutCategoryItem
                item={item}
                onCategoryPress={onCategoryPress}
              />
            )}
            contentContainerStyle={styles.contentContainer}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </BottomSheet>
      )}
    </View>
  );
}
