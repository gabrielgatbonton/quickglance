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
import { Action, ActionInput, Category } from "@/constants/types";
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
import CustomTextInputSheet from "@/components/custom-text-input-sheet";
import { useShallow } from "zustand/react/shallow";
import useAddShortcutStore, {
  AddShortcutActions,
  AddShortcutState,
} from "@/stores/useAddShortcutStore";

export default function AddShortcut() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const [selectedInputs, setSelectedInputs] = useState<ActionInput[] | null>(
    null,
  );

  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { addedActions, resetActions, addOrUpdateAction, removeAction } =
    useAddShortcutStore<
      { addedActions: AddShortcutState["actions"] } & Pick<
        AddShortcutActions,
        "resetActions" | "addOrUpdateAction" | "removeAction"
      >
    >(
      useShallow((state) => ({
        addedActions: state.actions,
        resetActions: state.resetActions,
        addOrUpdateAction: state.addOrUpdateAction,
        removeAction: state.removeAction,
      })),
    );

  const index = selectedCategory ? 1 : 0;

  const onActionAdd = (action: Action) => {
    // Generate a random ID for the action
    const newAction = { ...action, id: Crypto.randomUUID() };

    // If the action has inputs, show the input sheet
    if (action.inputs && action.inputs.length > 0) {
      onInputsEdit(newAction);
      return;
    }

    addOrUpdateAction(newAction);
    setSelectedAction(null);

    // Collapse the sheet to show actions
    bottomSheetRef.current?.collapse();

    // Workaround to scroll to the last added item
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd();
    }, 300);
  };

  const onInputsEdit = useCallback((action: Action) => {
    if (!action.inputs) {
      return;
    }

    setSelectedInputs(
      action.inputs.map((input) => ({ ...input, value: input.value || "" })),
    );
    setSelectedAction(action);

    bottomSheetRef.current?.expand();
  }, []);

  const onActionDelete = useCallback(
    (action: Action) => {
      Alert.alert(
        "Remove shortcut?",
        `Removing "${action.name}" cannot be undone.`,
        [
          {
            text: "OK",
            onPress: () => removeAction(action.id),
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
  };

  const renderItem = useCallback(
    ({ item, index }: SortableGridRenderItemInfo<Action>) => (
      <AddActionItem
        item={item}
        index={index}
        onActionEdit={item.inputs && onInputsEdit}
        onActionDelete={onActionDelete}
      />
    ),
    [onActionDelete, onInputsEdit],
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
              onDragEnd={({ data }) => resetActions(data)}
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

      {selectedInputs && selectedAction ? (
        <BottomSheet
          snapPoints={["35%", "70%"]}
          index={index}
          enableDynamicSizing={false}
          ref={bottomSheetRef}
        >
          <BottomSheetView style={styles.sheetHeaderContainer}>
            <Pressable
              style={({ pressed }) => pressedOpacity({ pressed })}
              onPress={() => {
                setSelectedInputs(null);
                setSelectedAction(null);
              }}
            >
              <SymbolView
                name="arrow.backward.circle"
                tintColor="lightgray"
                size={40}
              />
            </Pressable>
            <Text style={styles.sheetHeaderTitle}>Add Inputs</Text>
            <Pressable style={({ pressed }) => pressedOpacity({ pressed })}>
              <SymbolView
                name="arrow.right.circle"
                tintColor="lightgray"
                size={40}
              />
            </Pressable>
          </BottomSheetView>

          <View style={styles.actionContainer}>
            <Animated.View
              key="inputs-container"
              entering={FadeIn.duration(150)}
              style={styles.actionInputsContainer}
            >
              {selectedInputs.map((input, index) => (
                <Animated.View key={index} entering={FadeIn.duration(150)}>
                  <CustomTextInputSheet
                    value={input.value}
                    label={input.name}
                    placeholder={
                      input.placeholder ||
                      `Enter ${input.name.toLowerCase()} here`
                    }
                    onChangeText={(text) => {
                      setSelectedInputs((prev) => {
                        if (!prev) {
                          return null;
                        }

                        return prev.map((prevInput, prevIndex) => {
                          if (prevIndex === index) {
                            return { ...prevInput, value: text };
                          }

                          return prevInput;
                        });
                      });
                    }}
                  />
                </Animated.View>
              ))}
            </Animated.View>

            <CustomButton
              title="Save"
              color={selectedAction.gradientStart}
              disabled={selectedInputs.some((input) => !input.value)}
              onPress={() => {
                addOrUpdateAction(selectedAction, selectedInputs);
                setSelectedAction(null);
                setSelectedInputs(null);

                bottomSheetRef.current?.collapse();
              }}
            />
          </View>
        </BottomSheet>
      ) : selectedAction ? (
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
              <Text style={styles.actionPreviewText}>
                {selectedAction.name}
              </Text>
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
