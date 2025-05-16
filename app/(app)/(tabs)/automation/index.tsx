import globalStyles from "@/assets/global-styles";
import AutomationItem from "@/components/automation-item";
import { SAMPLE_AUTOMATION } from "@/constants/sampleAutomation";
import { FlatList, Pressable, ScrollView } from "react-native";
import styles from "./styles";
import { useLayoutEffect, useRef } from "react";
import { router, useNavigation } from "expo-router";
import { Colors } from "@/assets/colors";
import pressedOpacity from "@/utils/pressedOpacity";
import { useScrollToTop } from "@react-navigation/native";
import { HEADER_HEIGHT } from "@/constants/navigation";
import Animated, { Easing, ZoomIn } from "react-native-reanimated";
import IconView from "@/components/icon-view";

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
        <Pressable
          style={({ pressed }) => pressedOpacity({ pressed })}
          onPress={() => router.navigate("/(modal)/add-automation")}
        >
          <IconView name={["plus.circle.fill", "add-circle"]} size={30} color={Colors.PRIMARY} />
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
        renderItem={({ item }) => (
          <Animated.View
            entering={ZoomIn.duration(250).easing(Easing.out(Easing.exp))}
          >
            <AutomationItem item={item} />
          </Animated.View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}
