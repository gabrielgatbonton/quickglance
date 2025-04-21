import { Alert, Pressable, View } from "react-native";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetModal,
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
import { useShallow } from "zustand/react/shallow";
import useAddShortcutStore, {
  AddShortcutActions,
  AddShortcutState,
} from "@/stores/useAddShortcutStore";
import CustomText from "@/components/custom-text";
import { Colors } from "@/assets/colors";
import { router, useNavigation } from "expo-router";
import CustomLink from "@/components/custom-link";

export default function AddShortcut() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const [isMicEnabled, setIsMicEnabled] = useState(false);

  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const categorySheetRef = useRef<BottomSheetModal>(null);

  const navigation = useNavigation();

  const { addedActions, setAddedActions, addOrUpdateAction, removeAction } =
    useAddShortcutStore<
      {
        addedActions: AddShortcutState["actions"];
        setAddedActions: AddShortcutActions["setActions"];
      } & Pick<AddShortcutActions, "addOrUpdateAction" | "removeAction">
    >(
      useShallow((state) => ({
        addedActions: state.actions,
        setAddedActions: state.setActions,
        addOrUpdateAction: state.addOrUpdateAction,
        removeAction: state.removeAction,
      })),
    );

  const onActionAdd = (action: Action) => {
    // Generate a random key for the action
    const newAction = { ...action, key: Crypto.randomUUID() };

    addOrUpdateAction(newAction);
    setSelectedAction(null);

    // Close the sheet to show actions
    bottomSheetRef.current?.collapse();

    // Workaround to scroll to the last added item
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd();
    }, 500);
  };

  const onActionDelete = useCallback(
    (action: Action) => {
      Alert.alert(
        "Remove shortcut?",
        `Removing "${action.name}" cannot be undone.`,
        [
          {
            text: "OK",
            onPress: () => removeAction(action.key!),
          },
          { text: "Cancel", style: "cancel" },
        ],
      );
    },
    [removeAction],
  );

  const onActionPress = (action: Action) => {
    setSelectedAction(action);

    // Expand the sheet to show action preview
    bottomSheetRef.current?.expand();
  };

  const onCategoryPress = (category: Category) => {
    setSelectedCategory(category);

    categorySheetRef.current?.collapse();
    bottomSheetRef.current?.expand();
  };

  const renderItem = useCallback(
    ({ item, index }: SortableGridRenderItemInfo<Action>) => (
      <AddActionItem
        item={item}
        index={index}
        onActionDelete={onActionDelete}
      />
    ),
    [onActionDelete],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomLink
          title="Next"
          onPress={() => router.navigate("/add-shortcut/edit-details")}
          color={Colors.PRIMARY}
          disabled={addedActions.length === 0}
        />
      ),
    });
  }, [addedActions.length, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.shortcutsContainer}>
        {addedActions.length > 0 ? (
          <Animated.ScrollView
            onScrollBeginDrag={() => bottomSheetRef.current?.collapse()}
            contentContainerStyle={styles.shortcutsGrid}
            ref={scrollViewRef}
          >
            <Sortable.Grid
              data={addedActions}
              onDragEnd={({ data }) => setAddedActions(data)}
              keyExtractor={(item) => item.key!}
              renderItem={renderItem}
              rowGap={10}
              columnGap={10}
              scrollableRef={scrollViewRef}
            />
          </Animated.ScrollView>
        ) : (
          <Pressable
            style={({ pressed }) => [
              pressedOpacity({ pressed, opacity: 0.6 }),
              styles.noShortcutsContainer,
            ]}
            onPress={() => categorySheetRef.current?.expand()}
          >
            <CustomText style={styles.dropText}>
              Add a shortcut by tapping on them!
            </CustomText>
          </Pressable>
        )}
      </View>

      {selectedAction ? (
        <BottomSheet
          snapPoints={["35%", "70%"]}
          index={1}
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
            <CustomText style={styles.sheetHeaderTitle}>
              Action Preview
            </CustomText>
            <Pressable
              style={({ pressed }) => pressedOpacity({ pressed })}
              onPress={() => setIsMicEnabled((prev) => !prev)}
            >
              <SymbolView
                name={
                  isMicEnabled ? "microphone.circle" : "microphone.slash.circle"
                }
                tintColor={
                  isMicEnabled ? selectedAction.gradientStart : "lightgray"
                }
                size={40}
              />
            </Pressable>
          </BottomSheetView>

          <View style={styles.actionContainer}>
            <Animated.View
              key="preview-container"
              entering={FadeIn.duration(150)}
              style={styles.actionPreviewContainer}
            >
              <SymbolView
                name={selectedAction.icon}
                size={80}
                tintColor={selectedAction.gradientStart}
              />
              <CustomText style={styles.actionPreviewText}>
                {selectedAction.name}
              </CustomText>
            </Animated.View>

            <CustomButton
              title="Add"
              color={selectedAction.gradientStart}
              onPress={() => onActionAdd(selectedAction)}
            />
          </View>
        </BottomSheet>
      ) : selectedCategory ? (
        <BottomSheet
          snapPoints={["35%", "70%"]}
          index={1}
          enableDynamicSizing={false}
          animationConfigs={{
            stiffness: 500,
            damping: 100,
          }}
          ref={bottomSheetRef}
        >
          <BottomSheetView style={styles.sheetHeaderContainer}>
            <Pressable
              style={({ pressed }) => pressedOpacity({ pressed })}
              onPress={() => {
                bottomSheetRef.current?.close();
                setSelectedCategory(null);
              }}
            >
              <SymbolView
                name="arrow.backward.circle"
                tintColor="lightgray"
                size={40}
              />
            </Pressable>
            <CustomText style={styles.sheetHeaderTitle}>
              Select an action
            </CustomText>
            <Pressable
              style={({ pressed }) => pressedOpacity({ pressed })}
              onPress={() => setIsMicEnabled((prev) => !prev)}
            >
              <SymbolView
                name={
                  isMicEnabled ? "microphone.circle" : "microphone.slash.circle"
                }
                tintColor={isMicEnabled ? Colors.SECONDARY : "lightgray"}
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
      ) : null}

      {!selectedAction && (
        <BottomSheet
          snapPoints={["5%", "35%"]}
          index={selectedCategory ? 0 : 1}
          enableDynamicSizing={false}
          enableContentPanningGesture={false}
          style={styles.categorySheet}
          ref={categorySheetRef}
          animateOnMount={selectedCategory === null || selectedAction !== null}
        >
          <BottomSheetView style={styles.sheetHeaderContainer}>
            <CustomText style={styles.sheetHeaderTitle}>
              Select a category
            </CustomText>
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
