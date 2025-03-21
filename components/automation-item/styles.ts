import { Colors } from "@/assets/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  nameContainer: {
    padding: 15,
    margin: 10,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    backgroundColor: Colors.TERTIARY,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    color: "gray",
    fontWeight: "bold",
    fontSize: 16,
  },
  detailsContainer: {
    alignSelf: "center",
    borderRadius: 13,
    bottom: 15,
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 15px 0 rgba(0, 0, 0, 0.19)",
    overflow: "hidden",
    padding: 20,
    rowGap: 10,
    width: "95%",
  },
  action: {
    fontSize: 15,
    fontWeight: "500",
  },
});

export default styles;
