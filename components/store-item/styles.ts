import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  contentContainer: {
    height: 180,
    width: "100%",
    borderRadius: 18,
    padding: 15,
    rowGap: 15,
  },
  detailsContainer: {
    rowGap: 10,
  },
  name: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    color: "white",
    fontSize: 14,
  },
});

export default styles;
