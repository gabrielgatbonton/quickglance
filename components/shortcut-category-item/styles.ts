import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  imageContainer: {
    height: 120,
    width: 200,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "lightgray",
  },
  nameContainer: {
    position: "absolute",
    width: "100%",
    padding: 10,
    bottom: 0,
  },
  name: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default styles;
