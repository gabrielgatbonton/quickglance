import { FlatList, SectionList, View } from "react-native";
import CustomText from "@/components/custom-text";
import styles from "./styles";
import { AutomationEvent, AutomationEventCategory } from "@/constants/types";
import AutomationEventItem from "@/components/automation-event-item";
import { router } from "expo-router";
import useAddAutomationStore from "@/stores/useAddAutomationStore";

const AUTOMATION_CATEGORY_DATA: AutomationEventCategory[] = [
  {
    title: "Based on emotions",
    data: [
      {
        items: [
          { label: "Happy", description: "Smiling, etc.", emoji: "😄" },
          { label: "Sad", description: "Frowning, etc.", emoji: "😢" },
          { label: "Scared", description: "Trembled, etc.", emoji: "😱" },
          {
            label: "Surprised",
            description: "Eyes wide open, etc.",
            emoji: "😲",
          },
        ],
      },
    ],
  },
  {
    title: "Based on time",
    data: [
      {
        items: [
          { label: "Morning", description: "6 AM - 12 PM", emoji: "🌅" },
          {
            label: "Afternoon",
            description: "12 PM - 6 PM",
            emoji: "🌞",
          },
          { label: "Evening", description: "6 PM - 12 AM", emoji: "🌇" },
          { label: "Night", description: "12 AM - 6 AM", emoji: "🌙" },
        ],
      },
    ],
  },
  {
    title: "Based on device conditions",
    data: [
      {
        items: [
          { label: "Battery low", description: "Less than 20%", emoji: "🔋" },
          { label: "Battery full", description: "More than 80%", emoji: "🔌" },
          { label: "Charging", description: "Device is charging", emoji: "⚡" },
          {
            label: "Not charging",
            description: "Device is not charging",
            emoji: "❌",
          },
        ],
      },
    ],
  },
  {
    title: "Based on location",
    data: [
      {
        items: [
          { label: "Home", description: "At home", emoji: "🏠" },
          { label: "Work", description: "At work", emoji: "💼" },
          { label: "Gym", description: "At the gym", emoji: "🏋️" },
          { label: "Park", description: "At the park", emoji: "🌳" },
        ],
      },
    ],
  },
];

export default function AddAutomation() {
  const setEvent = useAddAutomationStore((state) => state.setEvent);

  const onEventPress = (item: AutomationEvent) => {
    // Set the selected event data in the store
    setEvent(item);

    // Navigate to the edit shortcuts screen
    router.navigate("/add-automation/edit-shortcuts");
  };

  return (
    <SectionList
      contentInsetAdjustmentBehavior="automatic"
      scrollToOverflowEnabled
      sections={AUTOMATION_CATEGORY_DATA}
      stickySectionHeadersEnabled={false}
      contentContainerStyle={styles.contentContainer}
      renderItem={({ item }) => (
        <FlatList
          data={item.items}
          numColumns={2}
          style={styles.listContainer}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => (
            <AutomationEventItem item={item} onEventPress={onEventPress} />
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
