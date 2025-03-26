import globalStyles from "@/assets/global-styles";
import AutomationItem from "@/components/automation-item";
import { SAMPLE_AUTOMATION } from "@/constants/sampleAutomation";
import { FlatList, Pressable, ScrollView } from "react-native";
import styles from "./styles";
import { useLayoutEffect, useRef } from "react";
import { useNavigation } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Colors } from "@/assets/colors";
import pressedOpacity from "@/utils/pressedOpacity";
import { useScrollToTop } from "@react-navigation/native";
import { HEADER_HEIGHT } from "@/constants/navigation";

export default function Automation() {
  const navigation = useNavigation();

  const scrollViewRef = useRef<ScrollView>(null);
  useScrollToTop(
    useRef({
      scrollToTop: () => scrollViewRef.current?.scrollTo({ y: -HEADER_HEIGHT }),
    }),
  );

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
      scrollToOverflowEnabled
      ref={scrollViewRef}
    >
      <FlatList
        data={SAMPLE_AUTOMATION}
        renderItem={({ item }) => <AutomationItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}
