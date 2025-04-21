import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
    borderRadius: 18,
    overflow: "hidden",
  },
  label: {
    color: "white",
    fontSize: 15,
  },
});

export default styles;
