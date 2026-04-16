import StoreItem from "@/components/store-item";
import { Alert, FlatList, Pressable, ScrollView } from "react-native";
import styles from "./styles";
import { useLayoutEffect } from "react";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { Colors } from "@/assets/colors";
import globalStyles from "@/assets/global-styles";
import pressedOpacity from "@/utils/pressedOpacity";
import * as WebBrowser from "expo-web-browser";
import useSearch from "@/hooks/useSearch";
import { useQuery } from "@tanstack/react-query";
import { getService } from "@/services/apiService";
import AndroidSearchBar from "@/components/android-searchbar";
import CustomHeader from "@/components/custom-header";

export default function ServiceStore() {
  const { service } = useLocalSearchParams<{ service: string }>();
  const navigation = useNavigation();
  const { search, isAndroid, setSearchFn } = useSearch();

  const { data: currentService } = useQuery({
    queryKey: ["services", service],
    queryFn: () => getService(service),
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <CustomHeader
          headerTitle={currentService?.name ?? "Loading..."}
          isModal
          leftIcon={{
            icons: ["", "arrow-back"],
            iconFunction: () => router.back()
          }}
          rightIcon={{
            icons: ["info.circle", "information-circle"],
            iconFunction: () =>
              currentService &&
              Alert.alert(currentService.name, currentService.description, [
                { text: "OK", style: "cancel" },
                {
                  text: "Visit Website",
                  onPress: () =>
                    WebBrowser.openBrowserAsync(currentService.websiteLink),
                  isPreferred: true,
                },
              ]),
          }}
        />
      ),
    });
  }, [
    currentService?.name,
    currentService?.description,
    currentService?.websiteLink,
    navigation,
  ]);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[globalStyles.container, { paddingTop: 15 }]}
    >
      {isAndroid && <AndroidSearchBar onSearch={setSearchFn} />}

      <FlatList
        data={currentService?.shortcuts.filter(
          (shortcut) =>
            shortcut.name.toLowerCase().includes(search.toLowerCase()) ||
            shortcut.description.toLowerCase().includes(search.toLowerCase()),
        )}
        renderItem={({ item }) => <StoreItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}
