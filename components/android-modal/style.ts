import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    alignSelf: "center",
    justifyContent: "center",
    width: 500,
    maxHeight: "50%",
    maxWidth: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  divider: {
    marginTop: 15
  }
});

export default styles;
