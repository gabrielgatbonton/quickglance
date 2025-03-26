import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import styles from "./styles";
import CustomButton from "@/components/custom-button";
import { useEffect } from "react";
import FooterBottom from "@/components/footer-bottom";
import { Stars } from "react-native-fiesta";

export default function SubmitAccount() {
  const { name, email, password } = useLocalSearchParams();

  useEffect(() => {
    console.log({ name, email, password });
  }, [name, email, password]);

  return (
    <View style={styles.container}>
      <Stars />

      <View style={styles.loadingContainer}>
        <ActivityIndicator />
        <Text style={styles.loadingText}>Submitting account...</Text>
      </View>

      <View style={styles.footerContainer}>
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Done"
            onPress={() => {
              router.dismissAll();
              router.back();
            }}
          />
        </View>
        <FooterBottom />
      </View>
    </View>
  );
}
