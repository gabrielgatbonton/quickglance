import CustomColorPicker from "@/components/custom-color-picker";
import { useLayoutEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import styles from "./styles";
import LineSeparator from "@/components/line-separator";
import { EditDetailData, Shortcut } from "@/constants/types";
import { router, useNavigation } from "expo-router";
import { Colors } from "@/assets/colors";
import useAddShortcutStore, {
  AddShortcutActions,
  AddShortcutState,
} from "@/stores/useAddShortcutStore";
import { useShallow } from "zustand/react/shallow";
import CustomText from "@/components/custom-text";
import CustomLink from "@/components/custom-link";
import { SymbolName, symbols } from "symbolist";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SymbolView } from "expo-symbols";
import { actionsToSteps } from "@/utils/shortcutConverter";
import CustomDynamicInput from "@/components/custom-dynamic-input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveShortcut, updateShortcut } from "@/services/apiService";

const DETAILS_DATA: EditDetailData[] = [
  { key: "name", label: "Name", placeholder: "Enter Name", type: "text" },
  {
    key: "description",
    label: "Description",
    placeholder: "Enter Description Here",
    type: "text",
  },
  {
    key: "icon",
    label: "SF Symbol",
    placeholder: "Select SF Symbol",
    type: "select",
    pickerProps: {
      searchEnabled: true,
    },
    options: Object.keys(symbols).map((key) => ({
      label: key,
      value: key,
      ItemComponent: () => (
        <SymbolView
          name={key as SymbolName}
          size={30}
          tintColor={Colors.PRIMARY}
        />
      ),
    })),
  },
  { key: "isUpload", label: "Upload to Gallery?", type: "switch" },
];

export default function EditDetails() {
  const [isGradientStartModalVisible, setIsGradientStartModalVisible] =
    useState(false);
  const [isGradientEndModalVisible, setIsGradientEndModalVisible] =
    useState(false);

  const { actions, details, setDetails, currentShortcut } = useAddShortcutStore<
    Pick<AddShortcutState, "actions" | "details" | "currentShortcut"> &
      Pick<AddShortcutActions, "setDetails">
  >(
    useShallow((state) => ({
      actions: state.actions,
      details: state.details,
      setDetails: state.setDetails,
      currentShortcut: state.currentShortcut,
    })),
  );
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: [currentShortcut ? "updateShortcut" : "addShortcut"],
    mutationFn: (data: Shortcut) =>
      currentShortcut
        ? updateShortcut(currentShortcut.id, data)
        : saveShortcut(data),
    onSuccess: async (data) => {
      console.log(data);

      await queryClient.invalidateQueries({ queryKey: ["shortcuts", "user"] });

      router.dismissAll();
      router.back();
    },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        isPending ? (
          <ActivityIndicator />
        ) : (
          <CustomLink
            title="Save"
            bold
            onPress={() => {
              console.log({ actions, details });

              const shortcut: Shortcut = {
                id: "new-shortcut",
                ...details,
                steps: actionsToSteps(actions),
              };

              mutate(shortcut);
            }}
            disabled={
              !details.name ||
              !details.description ||
              !details.icon ||
              !details.gradientStart ||
              !details.gradientEnd
            }
            color={Colors.PRIMARY}
          />
        ),
    });
  }, [actions, details, isPending, mutate, navigation]);

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <View style={styles.editDetailsContainer}>
          <View style={styles.inputsContainer}>
            <FlatList
              data={DETAILS_DATA}
              renderItem={({ item }) => (
                <CustomDynamicInput
                  {...item}
                  key={item.key}
                  value={details[item.key]}
                  onValueChange={(value) => setDetails({ [item.key]: value })}
                />
              )}
              ItemSeparatorComponent={() => <LineSeparator leading={20} />}
              scrollEnabled={false}
            />
          </View>

          <View style={styles.hintContainer}>
            <CustomText style={styles.hint}>
              Note: By uploading to the shortcut gallery, you agree to share
              your works with others.
            </CustomText>
          </View>

          <View style={styles.gradientsContainer}>
            <CustomColorPicker
              label="Start Gradient"
              value={details.gradientStart}
              isVisible={isGradientStartModalVisible}
              onVisibilityChange={(isVisible) =>
                setIsGradientStartModalVisible(isVisible)
              }
              onColorChange={(color) => setDetails({ gradientStart: color })}
            />
            <CustomColorPicker
              label="End Gradient"
              value={
                details.gradientEnd === details.gradientStart
                  ? ""
                  : details.gradientEnd
              }
              isVisible={isGradientEndModalVisible}
              onVisibilityChange={(isVisible) =>
                setIsGradientEndModalVisible(isVisible)
              }
              onColorChange={(color) => setDetails({ gradientEnd: color })}
            />
          </View>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
