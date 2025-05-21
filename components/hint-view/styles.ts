import { Colors } from "@/assets/colors";
import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "flex-end",
    marginHorizontal: 20,
  },
  animatedContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Platform.OS === "android" ? Colors.PRIMARY : "",
    borderRadius: 18,
    padding: 20,
    columnGap: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  contentContainer: {
    flex: 1,
    rowGap: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: 'white'
  },
  description: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'satoshi-light'
  },
});

export default styles;
