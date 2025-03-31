import CustomColorPicker from "@/components/custom-color-picker";
import { useLayoutEffect, useState } from "react";
import { Button, FlatList, Text, View } from "react-native";
import styles from "./styles";
import LineSeparator from "@/components/line-separator";
import { EditDetailData } from "@/constants/types";
import EditDetailItem from "@/components/edit-detail-item";
import * as WebBrowser from "expo-web-browser";
import { router, useNavigation } from "expo-router";
import { Colors } from "@/assets/colors";
import useAddShortcutStore, {
  AddShortcutActions,
  AddShortcutState,
} from "@/stores/useAddShortcutStore";
import { useShallow } from "zustand/react/shallow";

const DETAILS_DATA: EditDetailData[] = [
  { key: "name", label: "Name", placeholder: "Enter Name", type: "input" },
  {
    key: "description",
    label: "Description",
    placeholder: "Enter Description Here",
    type: "input",
  },
  {
    key: "icon",
    label: "Icon",
    placeholder: "Enter SF Symbol name here",
    type: "input",
    textInputProps: {
      autoCapitalize: "none",
    },
  },
  { key: "isUpload", label: "Upload to Gallery?", type: "switch" },
];

// const SF_SYMBOLS_LIST_URL = "https://hotpot.ai/free-icons";
const SF_SYMBOLS_LIST_URL = "https://github.com/andrewtavis/sf-symbols-online";

export default function EditDetails() {
  const [isGradientStartModalVisible, setIsGradientStartModalVisible] =
    useState(false);
  const [isGradientEndModalVisible, setIsGradientEndModalVisible] =
    useState(false);

  const { actions, details, setDetails } = useAddShortcutStore<
    Pick<AddShortcutState, "actions" | "details"> &
      Pick<AddShortcutActions, "setDetails">
  >(
    useShallow((state) => ({
      actions: state.actions,
      details: state.details,
      setDetails: state.setDetails,
    })),
  );
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Save"
          onPress={() => {
            console.log({ actions, details });
            router.dismissAll();
            router.back();
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
  }, [actions, details, navigation]);

  return (
    <View style={styles.editDetailsContainer}>
      <View style={styles.inputsContainer}>
        <FlatList
          data={DETAILS_DATA}
          renderItem={({ item }) => (
            <EditDetailItem
              item={item}
              value={details[item.key]}
              onValueChange={(value) => setDetails({ [item.key]: value })}
              textInputProps={item.textInputProps}
              switchProps={item.switchProps}
            />
          )}
          ItemSeparatorComponent={() => <LineSeparator leading={20} />}
          scrollEnabled={false}
        />
      </View>

      <View style={styles.hintContainer}>
        <Text style={styles.hint}>
          Note: By uploading to the shortcut gallery, you agree to share your
          works with others.
        </Text>
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

      <Button
        title="SF Symbols List"
        onPress={() => WebBrowser.openBrowserAsync(SF_SYMBOLS_LIST_URL)}
      />
    </View>
  );
}
