import globalStyles from "@/assets/global-styles";
import LineSeparator from "@/components/line-separator";
import UploadedShortcutItem from "@/components/uploaded-shortcut-item";
import { FlatList, ScrollView, StyleSheet } from "react-native";
import useSearch from "@/hooks/useSearch";
import { getUser, getUserShortcuts } from "@/services/apiService";
import { useQuery } from "@tanstack/react-query";
import AndroidSearchBar from "@/components/android-searchbar";

export default function UploadedShortcuts() {
  const { search, setSearchFn, isAndroid } = useSearch();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const { data: userShortcuts } = useQuery({
    queryKey: ["shortcuts", "user"],
    queryFn: getUserShortcuts,
    enabled: Boolean(user),
  });

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={[globalStyles.container, { paddingTop: 15 }]}
    >
      {isAndroid && <AndroidSearchBar onSearch={setSearchFn} />}

      <FlatList
        data={userShortcuts?.filter((shortcut) =>
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
