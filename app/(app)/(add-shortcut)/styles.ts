import { Colors } from "@/assets/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  dragDropView: {
    width: "100%",
    height: "60%",
  },
  dropContainer: {
    flex: 1,
    borderWidth: 3,
    borderRadius: 18,
    borderStyle: "dashed",
    borderColor: Colors.SECONDARY,
    backgroundColor: Colors.BACKGROUND,
    overflow: "visible",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  dropText: {
    color: "gray",
    textAlign: "center",
  },
  sheetHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  sheetHeaderTitle: {
    fontWeight: "500",
    fontSize: 16,
  },
  contentContainer: {
    columnGap: 15,
    padding: 20,
  },
});

export default styles;
