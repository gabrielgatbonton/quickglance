import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  labelContainer: {
    flex: 1,
    paddingRight: 15,
  },
  label: {
    flexWrap: "wrap",
    fontWeight: "bold",
    fontSize: 15,
  },
  pickerContainer: {
    flex: 2,
  },
});

export default styles;
