import { StyleSheet } from "react-native";
import { Colors } from "./colors";

const globalStyles = StyleSheet.create({
  container: {
    padding: 14,
    paddingTop: 5,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  transparentButton: {
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 13,
  },
  inputError: {
    borderColor: Colors.ERROR,
    borderWidth: 1,
  },
});

export default globalStyles;
