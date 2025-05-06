import { Colors } from "@/assets/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
    width: "90%",
  },
  searchContainer: {
    marginHorizontal: 15,
    marginBottom: 15,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    borderRadius: 18,
    backgroundColor: Colors.TERTIARY,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 15,
  },
  contentContainer: {
    rowGap: 10,
  },
});

export default styles;
