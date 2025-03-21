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
    paddingHorizontal: 20,
    rowGap: 15,
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
  },
  headerImage: {
    height: 65,
    width: "100%",
  },
  contentContainer: {
    paddingTop: "10%",
    paddingHorizontal: 20,
    rowGap: 25,
  },
  footerContainer: {
    position: "absolute",
    height: "20%",
    width: "100%",
    backgroundColor: Colors.TERTIARY,
    bottom: 0,
  },
  buttonContainer: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  inputContainer: {
    paddingTop: "5%",
    paddingHorizontal: 20,
    rowGap: 14,
  },
  input: {
    backgroundColor: Colors.TERTIARY,
    padding: 14,
    borderRadius: 13,
  },
  hint: {
    color: Colors.SECONDARY,
    fontSize: 12,
    textAlign: "center",
  },
});

export default styles;
