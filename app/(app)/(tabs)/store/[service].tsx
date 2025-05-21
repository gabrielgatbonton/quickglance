import StoreItem from "@/components/store-item";
import { Alert, FlatList, Pressable, ScrollView } from "react-native";
import styles from "./styles";
import { useLayoutEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Colors } from "@/assets/colors";
import globalStyles from "@/assets/global-styles";
import pressedOpacity from "@/utils/pressedOpacity";
import * as WebBrowser from "expo-web-browser";
import useSearch from "@/hooks/useSearch";
import { useQuery } from "@tanstack/react-query";
import { getService } from "@/services/apiService";
import AndroidSearchBar from "@/components/android-searchbar";
import IconView from "@/components/icon-view";

export default function ServiceStore() {
  const { service } = useLocalSearchParams<{ service: string }>();
  const navigation = useNavigation();
  const { search, isAndroid, setSearchFn } = useSearch();

  const { data: currentService } = useQuery({
    queryKey: ["services", service],
    queryFn: () => getService(service),
  });

  useLayoutEffect(() => {
    if (currentService) {
      navigation.setOptions({
        headerRight: () => (
          <Pressable
            style={({ pressed }) => pressedOpacity({ pressed })}
            onPress={() =>
              Alert.alert(currentService.name, currentService.description, [
                { text: "OK", style: "cancel" },
                {
                  text: "Visit Website",
                  onPress: () =>
                    WebBrowser.openBrowserAsync(currentService.websiteLink),
                  isPreferred: true,
                },
              ])
            }
          >
            <IconView name={["info.circle", "information-circle"]} size={25} color={Colors.PRIMARY} />
          </Pressable>
        ),
      });
    }
  }, [currentService, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: currentService?.name ?? "Loading...",
    });
  }, [currentService?.name, navigation]);

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
            shortcut.description.toLowerCase().includes(search.toLowerCase())
        )}
        renderItem={({ item }) => <StoreItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}
