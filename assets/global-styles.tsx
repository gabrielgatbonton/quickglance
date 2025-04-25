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
  modalLoading: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "85%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default globalStyles;
