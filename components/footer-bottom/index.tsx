import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function FooterBottom() {
  const { bottom } = useSafeAreaInsets();

  return <View style={{ height: bottom }} />;
}
