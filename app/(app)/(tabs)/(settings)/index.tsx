import globalStyles from "@/assets/global-styles";
import SettingHeader from "@/components/setting-header";
import SettingItem from "@/components/setting-item";
import { Setting } from "@/utils/types";
import { Alert, ScrollView, SectionList } from "react-native";
import styles from "./styles";
import { router } from "expo-router";
import LineSeparator from "@/components/line-separator";

export default function Settings() {
  const SETTINGS_DATA: Setting[] = [
    {
      title: "Cloud Sync",
      data: [{ label: "Enable Cloud Sync", type: "switch" }],
    },
    {
      title: "Dark Mode",
      data: [{ label: "Enable Dark Mode", type: "switch" }],
    },
    {
      title: "Shortcut Gallery",
      data: [
        {
          label: "Uploaded Shortcuts",
          type: "list",
          action: () => router.push("/uploaded-shortcuts"),
        },
        {
          label: "Change public name for gallery",
          type: "link",
          action: () =>
            Alert.prompt(
              "Change public name",
              "This will be used to identify your shortcuts",
              (text) =>
                Alert.alert(
                  "Public name changed",
                  `Successfully changed your name to "${text}"`,
                ),
            ),
        },
        {
          label: "Remove all uploaded shortcuts",
          type: "link",
          action: () =>
            Alert.alert(
              "Remove uploaded shortcuts",
              "Are you sure you want remove all uploaded shortucts?",
              [
                {
                  text: "Confirm",
                  style: "destructive",
                  onPress: () =>
                    Alert.alert(
                      "All uploaded shortcuts removed",
                      "Successfully removed all your uploaded shortcuts",
                    ),
                },
                { text: "Cancel", style: "cancel" },
              ],
            ),
        },
      ],
    },
    {
      title: "About",
      data: [
        {
          label: "What's QuickGlance?",
          type: "link",
          action: () => router.push("/(welcome)"),
        },
        { label: "Privacy Policy", type: "link" },
        { label: "Help Center", type: "link" },
        { label: "v1.0.0", type: "hint" },
      ],
    },
  ];

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={globalStyles.container}
    >
      <SectionList
        sections={SETTINGS_DATA}
        renderItem={({ item }) => <SettingItem item={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <SettingHeader title={title} />
        )}
        ItemSeparatorComponent={() => <LineSeparator />}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}
