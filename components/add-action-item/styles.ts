import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
  },
  indexContainer: {
    backgroundColor: "gray",
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    height: 35,
  },
  indexText: {
    color: "white",
    fontWeight: "500",
    fontSize: 18,
  },
  animatedContainer: {
    flex: 1,
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
  buttonContainer: {
    columnGap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default styles;
