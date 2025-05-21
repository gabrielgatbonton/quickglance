import { Colors } from "@/assets/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  pickerContainer: {
    alignSelf: "center",
    width: 350,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
  panelStyle: {
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
  },
  sliderStyle: {
    borderRadius: 20,
    marginTop: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  previewTxtContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: "lightgray",
  },
  previewTxt: {
    color: Colors.SECONDARY,
    fontSize: 16,
  },
  swatchesScrollContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: "lightgray",
  },
  swatchesContainer: {
    paddingTop: 20,
    paddingBottom: 5,
    alignItems: "center",
    flexWrap: "nowrap",
    gap: 10,
  },
  swatchStyle: {
    borderRadius: 20,
    height: 30,
    width: 30,
    margin: 0,
    marginBottom: 0,
    marginHorizontal: 0,
    marginVertical: 0,
  },
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "center",
    padding: 30,
    columnGap: 45,
  },
});

export default styles;
