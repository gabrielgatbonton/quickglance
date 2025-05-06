import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingRight: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 18,
    overflow: "hidden",
  },
  contentContainer: {
    justifyContent: "space-between",
    height: "100%",
  },
  label: {
    color: "white",
    fontSize: 15,
  },
});

export default styles;
