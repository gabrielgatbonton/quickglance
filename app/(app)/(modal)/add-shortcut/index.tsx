import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  View,
} from "react-native";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { SymbolView } from "expo-symbols";
import pressedOpacity from "@/utils/pressedOpacity";
import styles from "./styles";
import ShortcutCategoryItem from "@/components/shortcut-category-item";
import { Action, ActionInput, Category } from "@/constants/types";
import ShortcutActionItem from "@/components/shortcut-action-item";
import AddActionItem from "@/components/add-action-item";
import Sortable from "react-native-sortables";
import { SortableGridRenderItemInfo } from "react-native-sortables/dist/typescript/types";
import Animated, {
  FadeIn,
  FadeOut,
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
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import CustomLink from "@/components/custom-link";
import { stepsToActions } from "@/utils/shortcutConverter";
import { getActions, getCategories, getShortcut } from "@/services/apiService";
import { useQuery } from "@tanstack/react-query";
import globalStyles from "@/assets/global-styles";
import CustomDynamicInput, {
  CustomDynamicInputProps,
} from "@/components/custom-dynamic-input";
import LineSeparator from "@/components/line-separator";
import { checkValidInputType } from "@/utils/validInputTypeChecker";
import IconView from "@/components/icon-view";

export default function AddShortcut() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const [selectedInputs, setSelectedInputs] = useState<ActionInput[] | null>(
    null,
  );
  const [inputsContext, setInputsContext] = useState<Action | null>(null);
  const [isMicEnabled, setIsMicEnabled] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  const inputSheetRef = useRef<BottomSheetModal>(null);
  const previewSheetRef = useRef<BottomSheetModal>(null);
  const actionsSheetRef = useRef<BottomSheetModal>(null);
  const categorySheetRef = useRef<BottomSheetModal>(null);

  const { shortcut } = useLocalSearchParams<{ shortcut: string }>();
  const navigation = useNavigation();

  const isSaveDisabled = selectedInputs?.some(
    (input) => input.required && !input.value,
  );
  const doesInputsHaveValue = selectedInputs?.some((input) => input.value);

  const {
    addedActions,
    setAddedActions,
    setDetails,
    setCurrentShortcut,
    addOrUpdateAction,
    removeAction,
  } = useAddShortcutStore<
    {
      addedActions: AddShortcutState["actions"];
      setAddedActions: AddShortcutActions["setActions"];
    } & Pick<
      AddShortcutActions,
      "setDetails" | "setCurrentShortcut" | "addOrUpdateAction" | "removeAction"
    >
  >(
    useShallow((state) => ({
      addedActions: state.actions,
      setAddedActions: state.setActions,
      setDetails: state.setDetails,
      setCurrentShortcut: state.setCurrentShortcut,
      addOrUpdateAction: state.addOrUpdateAction,
      removeAction: state.removeAction,
    })),
  );

  const { data: currentShortcut, isPending: isShortcutPending } = useQuery({
    queryKey: ["shortcuts", shortcut],
    queryFn: () => getShortcut(shortcut),
    enabled: Boolean(shortcut),
  });

  const { data: categories, isPending: isCategoriesPending } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data: actions, isPending: isActionsPending } = useQuery({
    queryKey: ["actions"],
    queryFn: getActions,
  });

  useEffect(() => {
    if (currentShortcut) {
      setCurrentShortcut(currentShortcut);
    }
  }, [currentShortcut, setCurrentShortcut]);

  useEffect(() => {
    if (currentShortcut) {
      setDetails({
        name: currentShortcut.name,
        description: currentShortcut.description,
        icon: currentShortcut.icon,
        gradientStart: currentShortcut.gradientStart,
        gradientEnd: currentShortcut.gradientEnd,
        isUpload: currentShortcut.isUpload,
      });
    }
  }, [currentShortcut, setDetails]);

  useEffect(() => {
    if (currentShortcut && actions) {
      const convertedActions = stepsToActions(
        currentShortcut.steps ?? [],
        actions ?? [],
      ).map((action) => ({ ...action, key: Crypto.randomUUID() }));

      setAddedActions(convertedActions);
    }
  }, [actions, currentShortcut, setAddedActions]);

  const onActionEdit = useCallback((action: Action) => {
    if (!action.inputs || action.inputs.length === 0) {
      return;
    }

    // Temporarily close the category sheet to show inputs
    categorySheetRef.current?.collapse();

    // Filter out invalid inputs and set initial values
    const newInputs = action.inputs
      .filter((input) => input.type && checkValidInputType(input.type))
      .map((input) => ({
        ...input,
        value: input.value || input.default || "",
      }));

    setSelectedInputs(newInputs);
    setInputsContext(action);
  }, []);

  const onActionAddOrUpdate = (action: Action, inputs?: ActionInput[]) => {
    // Check if the action has inputs and if they are already set
    if (action.inputs && action.inputs.length > 0 && !inputs) {
      onActionEdit(action);
      return;
    }

    // Close the preview sheet to show actions
    previewSheetRef.current?.close();
    inputSheetRef.current?.close();

    // Generate a random key for the action if it doesn't exist
    const newAction = {
      ...action,
      inputs,
      key: action.key || Crypto.randomUUID(),
    };

    addOrUpdateAction(newAction);

    // Reset data
    setSelectedAction(null);
    setSelectedInputs(null);
    setInputsContext(null);
    setJustAdded(true);

    // Workaround to scroll to the last added item after adding an action
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
    // Expand the sheet to show action preview
    // actionsSheetRef.current?.collapse();
    // previewSheetRef.current?.expand();

    setSelectedAction(action);
  };

  const onCategoryPress = (category: Category) => {
    // Expand the sheet to show all actions
    // categorySheetRef.current?.collapse();
    // actionsSheetRef.current?.expand();

    setSelectedCategory(category);
  };

  const renderItem = useCallback(
    ({ item, index }: SortableGridRenderItemInfo<Action>) => (
      <AddActionItem
        item={item}
        index={index}
        onActionEdit={
          item.inputs && item.inputs.length > 0 ? onActionEdit : undefined
        }
        onActionDelete={onActionDelete}
      />
    ),
    [onActionDelete, onActionEdit],
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

  useLayoutEffect(() => {
    if (shortcut) {
      navigation.setOptions({
        title: "Edit Shortcut",
      });
    }
  }, [navigation, shortcut]);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <View style={styles.shortcutsContainer}>
          {addedActions.length > 0 ? (
            <Animated.ScrollView
              onScrollBeginDrag={() => {
                inputSheetRef.current?.collapse();
                previewSheetRef.current?.collapse();
                actionsSheetRef.current?.collapse();
              }}
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
          ) : shortcut && isShortcutPending ? (
            <View style={globalStyles.modalLoading}>
              <ActivityIndicator size="large" color={Colors.PRIMARY} />
            </View>
          ) : (
            <Pressable
              style={({ pressed }) => [
                pressedOpacity({ pressed, opacity: 0.6 }),
                styles.noShortcutsContainer,
              ]}
              onPress={() => categorySheetRef.current?.expand()}
            >
              <CustomText style={styles.dropText}>
                Add an action by selecting a category!
              </CustomText>
            </Pressable>
          )}
        </View>

        {selectedCategory ? (
          <BottomSheet
            snapPoints={["35%", "70%"]}
            index={selectedAction || justAdded ? 0 : 1}
            enableDynamicSizing={false}
            onChange={() => setJustAdded(false)}
            ref={actionsSheetRef}
          >
            <BottomSheetView style={styles.sheetHeaderContainer}>
              <Pressable
                style={({ pressed }) => pressedOpacity({ pressed })}
                onPress={() => {
                  actionsSheetRef.current?.close();
                  setSelectedCategory(null);
                }}
              >
                <IconView name={["arrow.backward.circle", "arrow-back-circle"]} color="lightgray" size={33} />
                {/* <SymbolView
                  name="arrow.backward.circle"
                  tintColor="lightgray"
                  size={40}
                /> */}
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
                    isMicEnabled
                      ? "microphone.circle"
                      : "microphone.slash.circle"
                  }
                  tintColor={isMicEnabled ? Colors.SECONDARY : "lightgray"}
                  size={40}
                />
              </Pressable>
            </BottomSheetView>

            {isActionsPending ? (
              <View style={globalStyles.modalLoading}>
                <ActivityIndicator />
              </View>
            ) : (
              <BottomSheetFlatList
                data={
                  categories?.find(
                    (category) => category.id === selectedCategory.id,
                  )?.actions
                }
                renderItem={({ item }) => (
                  <Animated.View entering={ZoomIn.duration(100)}>
                    <ShortcutActionItem
                      item={item}
                      onActionPress={onActionPress}
                      onActionAdd={onActionAddOrUpdate}
                    />
                  </Animated.View>
                )}
                contentContainerStyle={styles.contentContainer}
                columnWrapperStyle={styles.columnWrapper}
                numColumns={2}
                ListEmptyComponent={() => (
                  <CustomText style={styles.emptyText}>
                    No actions available.
                  </CustomText>
                )}
              />
            )}
          </BottomSheet>
        ) : null}

        {selectedAction ? (
          <BottomSheet
            snapPoints={["35%", "70%"]}
            index={1}
            enableDynamicSizing={false}
            ref={previewSheetRef}
          >
            <BottomSheetView style={styles.sheetHeaderContainer}>
              <Pressable
                style={({ pressed }) => pressedOpacity({ pressed })}
                onPress={() => {
                  previewSheetRef.current?.close();
                  setSelectedAction(null);
                }}
              >
                <IconView name={["arrow.backward.circle", "arrow-back-circle"]} color="lightgray" size={33} />
                {/* <SymbolView
                  name="arrow.backward.circle"
                  tintColor="lightgray"
                  size={40}
                /> */}
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
                    isMicEnabled
                      ? "microphone.circle"
                      : "microphone.slash.circle"
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
                entering={FadeIn.duration(150)}
                style={styles.actionPreviewContainer}
              >
                <IconView name={[selectedAction.icon, "eye"]} color={selectedAction.gradientStart} size={80} />
                {/* <SymbolView
                  name={selectedAction.icon}
                  size={80}
                  tintColor={selectedAction.gradientStart}
                /> */}
                <CustomText style={styles.actionPreviewText}>
                  {selectedAction.name}
                </CustomText>
              </Animated.View>

              <CustomButton
                title="Add"
                color={selectedAction.gradientStart}
                onPress={() => onActionAddOrUpdate(selectedAction)}
              />
            </View>
          </BottomSheet>
        ) : null}

        {selectedInputs && inputsContext ? (
          <BottomSheet
            snapPoints={["35%", "70%"]}
            index={1}
            enableDynamicSizing={false}
            keyboardBlurBehavior="restore"
            ref={inputSheetRef}
          >
            <BottomSheetView style={styles.sheetHeaderContainer}>
              <Pressable
                style={({ pressed }) => pressedOpacity({ pressed })}
                onPress={() => {
                  // If there are no category selected yet, open the category sheet
                  if (!selectedCategory) {
                    categorySheetRef.current?.expand();
                  }

                  inputSheetRef.current?.close();
                  setSelectedInputs(null);
                  setInputsContext(null);
                }}
              >
                <IconView name={["arrow.backward.circle", "arrow-back-circle"]} color="lightgray" size={33}  />
                {/* <SymbolView
                  name="arrow.backward.circle"
                  tintColor="lightgray"
                  size={40}
                /> */}
              </Pressable>
              <CustomText style={styles.sheetHeaderTitle}>
                Configure Inputs
              </CustomText>
              <Pressable
                style={({ pressed }) => pressedOpacity({ pressed })}
                onPress={() => setIsMicEnabled((prev) => !prev)}
              >
                <SymbolView
                  name={
                    isMicEnabled
                      ? "microphone.circle"
                      : "microphone.slash.circle"
                  }
                  tintColor={
                    isMicEnabled ? inputsContext.gradientStart : "lightgray"
                  }
                  size={40}
                />
              </Pressable>
            </BottomSheetView>

            <View style={[styles.actionContainer, { marginBottom: 10 }]}>
              <View
                style={[styles.actionInputsContainer, { marginBottom: 20 }]}
              >
                <FlatList
                  data={selectedInputs}
                  renderItem={({ item }) => {
                    const { key, ...inputProps } = item;
                    return (
                      <CustomDynamicInput
                        {...(inputProps as CustomDynamicInputProps)}
                        onValueChange={(text) => {
                          setSelectedInputs((prev) => {
                            if (!prev) {
                              return null;
                            }
                            return prev.map((prevInput) => {
                              if (prevInput.key === item.key) {
                                return { ...prevInput, value: text };
                              }

                              return prevInput;
                            });
                          });
                        }}
                        label={item.required ? `${item.label}*` : item.label}
                        placeholder={
                          item.placeholder ??
                          `Enter ${item.label.toLowerCase()} here`
                        }
                        options={item.options?.map((option) => ({
                          label: option,
                          value: option,
                        }))}
                        textInputProps={{
                          color: inputsContext.gradientStart,
                          useBottomSheetInput: true,
                        }}
                        switchProps={{ color: inputsContext.gradientStart }}
                        pickerProps={{ color: inputsContext.gradientStart }}
                        sliderProps={{ color: inputsContext.gradientStart }}
                      />
                    );
                  }}
                  ItemSeparatorComponent={() => (
                    <LineSeparator leading={20} width="90%" />
                  )}
                  ListEmptyComponent={() => (
                    <CustomText style={styles.emptyText}>
                      No supported inputs.
                    </CustomText>
                  )}
                />
              </View>

              <View style={styles.actionInputsContainer}>
                {isSaveDisabled && doesInputsHaveValue && (
                  <Animated.View
                    entering={FadeIn.duration(150)}
                    exiting={FadeOut.duration(100)}
                  >
                    <CustomText style={styles.actionErrorText}>
                      Make sure all required fields with (*) are filled.
                    </CustomText>
                  </Animated.View>
                )}

                <CustomButton
                  title="Save"
                  color={inputsContext.gradientStart}
                  onPress={() =>
                    onActionAddOrUpdate(inputsContext, selectedInputs)
                  }
                  disabled={isSaveDisabled}
                />
              </View>
            </View>
          </BottomSheet>
        ) : null}

        <BottomSheet
          snapPoints={["4%", "35%"]}
          index={selectedCategory ? 0 : 1}
          enableDynamicSizing={false}
          enableContentPanningGesture={false}
          onChange={(index) => {
            // Prevents the sheet from not being opened again
            if (index === 0 && !selectedCategory && !selectedInputs) {
              categorySheetRef.current?.expand();
            }
          }}
          style={styles.categorySheet}
          ref={categorySheetRef}
        >
          <BottomSheetView style={styles.sheetHeaderContainer}>
            <CustomText style={styles.sheetHeaderTitle}>
              Select a category
            </CustomText>
          </BottomSheetView>

          {isCategoriesPending ? (
            <View style={globalStyles.modalLoading}>
              <ActivityIndicator />
            </View>
          ) : categories?.length === 0 ? (
            <CustomText style={styles.emptyText}>
              No categories available.
            </CustomText>
          ) : (
            <BottomSheetFlatList
              data={categories}
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
          )}
        </BottomSheet>
      </View>
    </BottomSheetModalProvider>
  );
}
