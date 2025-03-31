import { Colors } from "@/assets/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  editDetailsContainer: {
    flex: 1,
    padding: 20,
    rowGap: 15,
  },
  inputsContainer: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  hintContainer: {
    paddingHorizontal: 10,
  },
  hint: {
    color: Colors.SECONDARY,
    fontSize: 12,
  },
  gradientsContainer: {
    paddingVertical: 10,
    rowGap: 15,
  },
  shortcutsContainer: {
    width: "100%",
    height: "63%",
  },
  noShortcutsContainer: {
    flex: 1,
    margin: 20,
    borderWidth: 3,
    borderRadius: 18,
    borderStyle: "dashed",
    borderColor: Colors.SECONDARY,
    backgroundColor: Colors.BACKGROUND,
    overflow: "visible",
    justifyContent: "center",
    alignItems: "center",
  },
  shortcutsGrid: {
    padding: 20,
  },
  dropText: {
    color: "gray",
    textAlign: "center",
  },
  sheetHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 10,
    paddingBottom: 20,
  },
  sheetHeaderTitle: {
    fontWeight: "500",
    fontSize: 18,
  },
  contentContainer: {
    columnGap: 15,
    rowGap: 15,
    paddingHorizontal: 15,
  },
  columnWrapper: {
    columnGap: 10,
  },
  actionContainer: {
    flex: 1,
    paddingVertical: 60,
    paddingHorizontal: 25,
    justifyContent: "space-between",
  },
  actionPreviewContainer: {
    alignItems: "center",
    rowGap: 15,
  },
  actionPreviewText: {
    fontSize: 16,
    fontWeight: "500",
  },
  actionInputsContainer: {
    rowGap: 15,
  },
});

export default styles;
