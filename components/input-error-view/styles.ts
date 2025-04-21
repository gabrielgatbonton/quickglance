import { Colors } from "@/assets/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  errorContainer: {
    rowGap: 5,
    paddingTop: 5,
    paddingHorizontal: 10,
  },
  errorText: {
    color: Colors.ERROR,
  },
});

export default styles;
