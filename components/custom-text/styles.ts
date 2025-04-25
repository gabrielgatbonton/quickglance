import { Platform, StyleSheet } from "react-native";

export const DEFAULT_FONT_FAMILY =
  Platform.OS === "ios" ? "SatoshiVariable-Bold_Medium" : "Satoshi-Variable";

const styles = StyleSheet.create({
  text: {
    fontFamily: DEFAULT_FONT_FAMILY,
  },
});

export default styles;
