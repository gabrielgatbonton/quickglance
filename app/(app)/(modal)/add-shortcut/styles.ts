import { Colors } from "@/assets/colors";
import { DEFAULT_FONT_FAMILY } from "@/components/custom-text/styles";
import { Platform, StyleSheet } from "react-native";

const isIOS = Platform.OS === "ios" 

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  editDetailsContainer: {
    flex: 1,
    padding: isIOS ? 20 : 30,
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
    height: "65%",
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
    width: "35%",
    textAlign: "center",
  },
  contentContainer: {
    columnGap: 15,
    rowGap: 15,
    paddingHorizontal: 15,
    paddingBottom: 50,
  },
  columnWrapper: {
    columnGap: 10,
  },
  actionContainer: {
    flex: 1,
    paddingTop: 80,
    paddingBottom: 60,
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
  actionErrorText: {
    color: "red",
    textAlign: "center",
  },
  actionInputsContainer: {
    rowGap: 15,
  },
  categorySheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
  },
  emptyText: {
    textAlign: "center",
    color: "lightgray",
    fontSize: 16,
    padding: "15%",
  },
  toolbarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default styles;
