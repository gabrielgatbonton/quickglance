import globalStyles from "@/assets/global-styles";
import LineSeparator from "@/components/line-separator";
import UploadedShortcutItem from "@/components/uploaded-shortcut-item";
import { SAMPLE_SHORTCUTS } from "@/constants/sampleShortcuts";
import { FlatList, ScrollView, StyleSheet } from "react-native";
import useSearch from "@/hooks/useSearch";

export default function UploadedShortcuts() {
  const search = useSearch();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={[globalStyles.container, { paddingTop: 15 }]}
    >
      <FlatList
        data={SAMPLE_SHORTCUTS.filter((shortcut) =>
          shortcut.name.toLowerCase().includes(search.toLowerCase()),
        )}
        renderItem={({ item }) => <UploadedShortcutItem item={item} />}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={() => <LineSeparator leading={20} />}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    borderRadius: 10,
    overflow: "hidden",
  },
});
