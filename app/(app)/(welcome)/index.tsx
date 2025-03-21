import { FlatList, Image, ScrollView, Text, View } from "react-native";
import styles from "./styles";
import { WelcomeData } from "@/utils/types";
import WelcomeItem from "@/components/welcome-item";

const WELCOME_DATA: WelcomeData[] = [
  {
    label: "Made for PWDs",
    description:
      "Innovative UI/UX designed specifically for a hands-free experience using eye-tracking and head gesures/movements",
    icon: "hand.raised.slash",
  },
  {
    label: "Shortcut Gallery",
    description:
      "App-store like community gallery of shortcuts for sharing and creating custom shortcuts for other PWDs to use",
    icon: "sparkles.rectangle.stack",
  },
  {
    label: "Automation",
    description:
      "Automate certain shortcuts based on time, events, and even emotions",
    icon: "timer",
  },
];

export default function Welcome() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Image
            source={require("@/assets/images/quickglance-logo.png")}
            style={styles.headerImage}
            resizeMode="contain"
          />
          <Text style={styles.headerText}>Welcome to QuickGlance</Text>
        </View>

        <FlatList
          data={WELCOME_DATA}
          renderItem={({ item }) => <WelcomeItem item={item} />}
          contentContainerStyle={styles.contentContainer}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
}
