import { StyleSheet } from "react-native";
import { Colors } from "@/assets/colors";

const styles = StyleSheet.create({
  noteContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  noteHeader: {
    color: Colors.PRIMARY,
  },
  noteText: {
    width: 275,
    color: "gray",
    fontFamily: "Satoshi-light",
  },
  iconContainer: {
    justifyContent: "center",
    flexDirection: "row",
  },
  icon: {
    padding: 20,
  },
  linearGradient: {
    borderRadius: 25
  }
});

export default styles;
