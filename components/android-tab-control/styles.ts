import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  tabContainer: {
    marginTop: 3,
    marginBottom: 18,
  },
  tabBar: {
    backgroundColor: "white",
    elevation: 0,
  },
  indicatorStyling: {
    position: "absolute",
    height: 4,
    width: 80,
    backgroundColor: "#65558F",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    bottom: 0,
  }
});

export default styles;
