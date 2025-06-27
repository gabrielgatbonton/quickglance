import { Colors } from "@/assets/colors";
import { StyleSheet, Platform } from "react-native";

const isIOS = Platform.OS === "ios"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  backContainer: {
    position: "absolute",
    left: 10,
    top: 20,
    zIndex: 1,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: isIOS ? "20%" : "15%",
    paddingHorizontal: 40,
    rowGap: 10,
  },
  headerText: {
    fontSize: 45,
    fontWeight: "bold",
    textAlign: "center",
  },
  subHeaderText: {
    color: Colors.SECONDARY,
    fontSize: 18,
    textAlign: "center",
    lineHeight: 20,
    fontFamily: "Satoshi-light"
  },
  headerImage: {
    height: 65,
    width: "100%",
  },
  contentContainer: {
    paddingTop: "10%",
    paddingHorizontal: 30,
    rowGap: 25,
  },
  footerContainer: {
    height: "20%",
    width: "100%",
    bottom: 0,
    paddingTop: 20
  },
  buttonContainer: {
    marginHorizontal: 30,
    marginVertical: 20,
  },
  inputContainer: {
    paddingTop: "6%",
    paddingHorizontal: 30,
    rowGap: 14,
  },
  hint: {
    color: Colors.SECONDARY,
    fontSize: 12,
    textAlign: "center",
  },
  loadingContainer: {
    rowGap: 15,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default styles;
