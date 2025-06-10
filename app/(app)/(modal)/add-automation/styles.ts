import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  listContainer: {
    paddingBottom: 30,
    rowGap: 10,
  },
  shortcutsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    rowGap: 15,
  },
  shortcutsColumn: {
    columnGap: 14
  },
  columnWrapper: {
    columnGap: 10,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  sectionTitleContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
  },
  resetButtonPressed: {
    transform: [{ rotate: "50deg" }],
  },
});

export default styles;
