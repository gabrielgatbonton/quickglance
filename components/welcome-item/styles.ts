import { Colors } from "@/assets/colors";
import { Platform, StyleSheet } from "react-native";

const isIOS = Platform.OS === "ios"

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
    paddingHorizontal: isIOS ? 0 : 13
  },
  iconContainer: {
    width: "15%",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 25,
    color: isIOS ? "" : Colors.PRIMARY,
  },
  description: {
    marginTop: 8,
    fontSize: 15,
    color: 'black',
    fontFamily: "Satoshi-light",
    lineHeight: 20,
  },
});

export default styles;
