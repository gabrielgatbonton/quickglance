import { Colors } from "@/assets/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingTop: "20%",
    paddingHorizontal: 40,
    rowGap: 10,
  },
  headerText: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
  },
  subHeaderText: {
    color: Colors.SECONDARY,
    fontSize: 16,
    textAlign: "center",
    lineHeight: 20,
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
    backgroundColor: Colors.TERTIARY,
    bottom: 0,
  },
  buttonContainer: {
    marginHorizontal: 30,
    marginVertical: 20,
  },
  inputContainer: {
    paddingTop: "6%",
    paddingHorizontal: 20,
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
