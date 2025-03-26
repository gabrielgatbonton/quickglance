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

const DETAILS_DATA: EditDetailData[] = [
  { id: "name", label: "Name", placeholder: "Enter Name", type: "input" },
  {
    id: "description",
    label: "Description",
    placeholder: "Enter Description Here",
    type: "input",
  },
  {
    id: "icon",
    label: "Icon",
    placeholder: "Enter SF Symbol name here",
    type: "input",
    textInputProps: {
      autoCapitalize: "none",
    },
  },
  { id: "is_upload", label: "Upload to Gallery?", type: "switch" },
];

// const SF_SYMBOLS_LIST_URL = "https://hotpot.ai/free-icons";
const SF_SYMBOLS_LIST_URL = "https://github.com/andrewtavis/sf-symbols-online";

export default function EditDetails() {
  const [details, setDetails] = useState<Record<string, string | boolean>>({
    name: "",
    description: "",
    isUpload: false,
    gradientStart: "",
    gradientEnd: "",
  });
  const [isGradientStartModalVisible, setIsGradientStartModalVisible] =
    useState(false);
  const [isGradientEndModalVisible, setIsGradientEndModalVisible] =
    useState(false);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Save"
          onPress={() => {
            router.dismissAll();
            router.back();
          }}
          color={Colors.PRIMARY}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.editDetailsContainer}>
      <View style={styles.inputsContainer}>
        <FlatList
          data={DETAILS_DATA}
          renderItem={({ item }) => (
            <EditDetailItem
              item={item}
              value={details[item.id]}
              onValueChange={(value) =>
                setDetails((prev) => ({ ...prev, [item.id]: value }))
              }
              textInputProps={item.textInputProps}
              switchProps={item.switchProps}
            />
          )}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <LineSeparator leading={20} />}
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
          isVisible={isGradientStartModalVisible}
          onVisibilityChange={(isVisible) =>
            setIsGradientStartModalVisible(isVisible)
          }
          onColorChange={(color) =>
            setDetails((prev) => ({
              ...prev,
              gradientStart: color,
            }))
          }
        />
        <CustomColorPicker
          label="End Gradient"
          isVisible={isGradientEndModalVisible}
          onVisibilityChange={(isVisible) =>
            setIsGradientEndModalVisible(isVisible)
          }
          onColorChange={(color) =>
            setDetails((prev) => ({
              ...prev,
              gradientEnd: color,
            }))
          }
        />
      </View>

      <Button
        title="SF Symbols List"
        onPress={() => WebBrowser.openBrowserAsync(SF_SYMBOLS_LIST_URL)}
      />
    </View>
  );
}
