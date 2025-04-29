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
  sliderContainer: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 15,
  },
  slider: {
    width: "80%",
  },
  value: {
    width: "20%",
  },
});

export default styles;
