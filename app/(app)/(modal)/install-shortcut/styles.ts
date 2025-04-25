import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: "25%",
    paddingBottom: "30%",
    paddingHorizontal: 30,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",

    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
  },
  iconContentContainer: {
    padding: 30,
    borderRadius: 14,
  },
  detailsContainer: {
    rowGap: 15,
    marginTop: 35,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    fontWeight: "300",
    textAlign: "center",
  },
  actionContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  pendingContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    left: 5,
  },
  installedContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
    top: -5,
    left: -5,
  },
  installButtonContainer: {
    borderRadius: 22,
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
});

export default styles;
