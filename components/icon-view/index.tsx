import { SymbolView } from "expo-symbols";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

import type { SFSymbol } from "expo-symbols";
type IoniconName = keyof typeof Ionicons.glyphMap;

type IconViewProps = {
  name: [symbolName: SFSymbol, ioniconName: IoniconName];
  color: string;
};

export default function IconView({ name, color }: IconViewProps) {
  if (Platform.OS === "android") {
    return <Ionicons name={name[1]} color={color} size={24} />;
  }

  return <SymbolView name={name[0]} tintColor={color} />;
}
