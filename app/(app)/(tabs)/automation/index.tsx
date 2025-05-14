import globalStyles from "@/assets/global-styles";
import AutomationItem from "@/components/automation-item";
import { Pressable, ScrollView } from "react-native";
import styles from "./styles";
import { useLayoutEffect, useRef } from "react";
import { router, useNavigation } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Colors } from "@/assets/colors";
import pressedOpacity from "@/utils/pressedOpacity";
import { useScrollToTop } from "@react-navigation/native";
import { HEADER_HEIGHT } from "@/constants/navigation";
import Animated, {
  Easing,
  FadingTransition,
  ZoomIn,
} from "react-native-reanimated";
import { useQuery } from "@tanstack/react-query";
import { getAutomations } from "@/services/apiService";

export default function Automation() {
  const navigation = useNavigation();

  const { data: automations } = useQuery({
    queryKey: ["automations", "user"],
    queryFn: getAutomations,
  });

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
          onPress={() => router.navigate("/(app)/(modal)/add-automation")}
        >
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
      <Animated.FlatList
        data={automations}
        renderItem={({ item }) => (
          <Animated.View
            entering={ZoomIn.duration(250).easing(Easing.out(Easing.exp))}
          >
            <AutomationItem item={item} />
          </Animated.View>
        )}
        keyExtractor={(item) => item.id}
        itemLayoutAnimation={FadingTransition}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}
