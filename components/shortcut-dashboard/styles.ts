import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  gradientContainer: {
    position: "absolute",
    height: "100%",
    borderRadius: 25,
  },
  leftGradient: {
    left: 7,
  },
  rightGradient: {
    right: 7,
  },
  pageControlView: {
    height: 15,
  },
  emptyContainer: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 10,
  },
  emptyText: {
    color: "gray",
  },
});

export default styles;
