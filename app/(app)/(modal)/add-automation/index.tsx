import { FlatList, SectionList, View } from "react-native";
import CustomText from "@/components/custom-text";
import styles from "./styles";
import { AutomationCategory, AutomationCondition } from "@/constants/types";
import { router } from "expo-router";
import useAddAutomationStore from "@/stores/useAddAutomationStore";
import { useQuery } from "@tanstack/react-query";
import { getAutomationConditions } from "@/services/apiService";
import AutomationConditionItem from "@/components/automation-condition-item";

export default function AddAutomation() {
  const setCondition = useAddAutomationStore((state) => state.setCondition);

  const { data: automationConditions } = useQuery({
    queryKey: ["automation", "conditions"],
    queryFn: getAutomationConditions,
    select: (data) => {
      // Group the automation conditions by category
      const grouped = data.reduce(
        (acc, item) => {
          const items = acc[item.type] ?? [];
          acc[item.type] = [...items, item];
          return acc;
        },
        {} as Record<string, AutomationCondition[]>,
      );

      // Map the grouped data to an array
      return Object.entries(grouped).map(([type, items]) => ({
        title: `Based on ${type}`,
        data: [{ items }],
      })) as AutomationCategory[];
    },
  });

  const onConditionPress = (item: AutomationCondition) => {
    // Set the selected condition data in the store
    setCondition(item);

    // Navigate to the edit shortcuts screen
    router.navigate("/add-automation/edit-shortcuts");
  };

  return (
    <SectionList
      contentInsetAdjustmentBehavior="automatic"
      scrollToOverflowEnabled
      sections={automationConditions ?? []}
      stickySectionHeadersEnabled={false}
      contentContainerStyle={styles.contentContainer}
      renderItem={({ item }) => (
        <FlatList
          data={item.items}
          numColumns={2}
          style={styles.listContainer}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => (
            <AutomationConditionItem
              item={item}
              onConditionPress={onConditionPress}
            />
          )}
        />
      )}
      renderSectionHeader={({ section: { title } }) => (
        <View style={styles.sectionTitleContainer}>
          <CustomText style={styles.title}>{title}</CustomText>
        </View>
      )}
    />
  );
}
