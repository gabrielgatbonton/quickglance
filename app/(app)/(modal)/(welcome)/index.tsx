import { FlatList, Image, ScrollView, View } from "react-native";
import styles from "./styles";
import { WelcomeData } from "@/constants/types";
import WelcomeItem from "@/components/welcome-item";
import { router } from "expo-router";
import CustomButton from "@/components/custom-button";
import FooterBottom from "@/components/footer-bottom";
import CustomText from "@/components/custom-text";

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
            source={{ uri: "quickglance-logo" }}
            style={styles.headerImage}
            resizeMode="contain"
          />
          <CustomText style={styles.headerText}>
            Welcome to QuickGlance
          </CustomText>
        </View>

        <FlatList
          data={WELCOME_DATA}
          renderItem={({ item }) => <WelcomeItem item={item} />}
          keyExtractor={(item) => item.label}
          contentContainerStyle={styles.contentContainer}
          scrollEnabled={false}
        />
      </ScrollView>

      <View style={styles.footerContainer}>
        <CustomButton
          title="Continue"
          onPress={() => router.push("/sign-up")}
          containerStyle={styles.buttonContainer}
        />
        <FooterBottom />
      </View>
    </View>
  );
}
