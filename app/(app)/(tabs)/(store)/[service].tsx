import StoreItem from "@/components/store-item";
import { Alert, FlatList, Pressable, ScrollView } from "react-native";
import styles from "./styles";
import { useLayoutEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { SAMPLE_SERVICES } from "@/constants/sampleServices";
import { Colors } from "@/assets/colors";
import globalStyles from "@/assets/global-styles";
import { SymbolView } from "expo-symbols";
import pressedOpacity from "@/utils/pressedOpacity";
import * as WebBrowser from "expo-web-browser";
import useSearch from "@/hooks/useSearch";

export default function ServiceStore() {
  const { service } = useLocalSearchParams<{ service: string }>();
  const navigation = useNavigation();
  const search = useSearch();

  const currentService = SAMPLE_SERVICES.find(
    (sampleService) => sampleService.id === service,
  );

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
                    WebBrowser.openBrowserAsync(currentService.website_link),
                  isPreferred: true,
                },
              ])
            }
          >
            <SymbolView
              name="info.circle"
              size={25}
              tintColor={Colors.PRIMARY}
            />
          </Pressable>
        ),
      });
    }
  }, [currentService, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: currentService?.name,
    });
  }, [currentService?.name, navigation]);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[globalStyles.container, { paddingTop: 15 }]}
    >
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
