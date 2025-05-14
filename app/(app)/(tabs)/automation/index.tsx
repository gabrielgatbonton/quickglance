import globalStyles from "@/assets/global-styles";
import AutomationItem from "@/components/automation-item";
import { ActivityIndicator, Pressable, ScrollView } from "react-native";
import styles from "./styles";
import { useLayoutEffect, useRef } from "react";
import { router, useNavigation } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Colors } from "@/assets/colors";
import pressedOpacity from "@/utils/pressedOpacity";
import { useScrollToTop } from "@react-navigation/native";
import { HEADER_HEIGHT } from "@/constants/navigation";
import Animated, {
  BounceIn,
  Easing,
  FadingTransition,
  ZoomIn,
} from "react-native-reanimated";
import { useQuery } from "@tanstack/react-query";
import { getAutomations } from "@/services/apiService";
import CustomText from "@/components/custom-text";

export default function Automation() {
  const navigation = useNavigation();

  const { data: automations, isPending } = useQuery({
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
        ListEmptyComponent={
          <Animated.View
            entering={BounceIn.duration(300)}
            style={styles.emptyContainer}
          >
            {isPending ? (
              <ActivityIndicator size="large" color={Colors.PRIMARY} />
            ) : (
              <>
                <SymbolView name="gearshape.2" size={80} tintColor="gray" />
                <CustomText style={styles.emptyText}>
                  No automations available.
                </CustomText>
              </>
            )}
          </Animated.View>
        }
      />
    </ScrollView>
  );
}
