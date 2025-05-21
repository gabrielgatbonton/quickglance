import { Colors } from "@/assets/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    columnGap: 10,
    padding: 10,
    borderRadius: 16,
  },
  emojiContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: Colors.NEUTRAL,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  emoji: {
    fontSize: 21,
  },
  contentContainer: {
    flex: 1,
    rowGap: 3,
  },
  name: {
    fontSize: 16,
  },
  description: {
    color: Colors.SECONDARY,
  },
});

export default styles;
