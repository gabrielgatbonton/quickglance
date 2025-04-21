import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  name: {
    fontSize: 18,
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
  },
  actionContentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 18,
    columnGap: 15,
  },
});

export default styles;
