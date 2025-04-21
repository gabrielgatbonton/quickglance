import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  contentContainer: {
    borderRadius: 18,
    overflow: "hidden",
  },
  blurContainer: {
    position: "absolute",
    width: "100%",
    padding: 10,
    bottom: -1,
  },
  darkFilter: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  name: {
    fontWeight: "500",
    fontSize: 16,
  },
});

export default styles;
