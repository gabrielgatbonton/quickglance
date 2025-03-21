import { Colors } from "@/assets/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
  },
  iconContainer: {
    width: "15%",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 25,
  },
  description: {
    fontSize: 15,
    color: Colors.SECONDARY,
    lineHeight: 20,
  },
});

export default styles;
