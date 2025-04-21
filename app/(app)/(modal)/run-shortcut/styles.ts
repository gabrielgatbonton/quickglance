import { Colors } from "@/assets/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
  },
  contentContainer: {
    rowGap: 30,
    padding: 25,
  },
  countdownText: {
    fontSize: 16,
    textAlign: "center",
    margin: 10,
    color: Colors.SECONDARY,
  },
});

export default styles;
