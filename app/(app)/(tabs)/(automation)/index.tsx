import globalStyles from "@/assets/global-styles";
import AutomationItem from "@/components/automation-item";
import { SAMPLE_AUTOMATION } from "@/utils/sampleAutomation";
import { FlatList, Pressable, ScrollView } from "react-native";
import styles from "./styles";
import { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Colors } from "@/assets/colors";
import pressedOpacity from "@/utils/pressedOpacity";

export default function Automation() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable style={({ pressed }) => pressedOpacity({ pressed })}>
          <SymbolView
            name="plus.circle.fill"
            size={30}
            tintColor={Colors.PRIMARY}
          />
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={globalStyles.container}
    >
      <FlatList
        data={SAMPLE_AUTOMATION}
        renderItem={({ item }) => <AutomationItem item={item} />}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}
