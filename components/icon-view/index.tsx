import { SymbolView } from "expo-symbols";
import { Ionicons } from "@expo/vector-icons";
import { Platform, StyleProp, TextStyle } from "react-native";

import type { SFSymbol } from "expo-symbols";
export type IoniconName = keyof typeof Ionicons.glyphMap;

type IconViewProps = {
  name: [symbolName: SFSymbol, ioniconName: IoniconName];
  color: string;
  size?: number;
  buttonStyle?: StyleProp<TextStyle>;
};

export default function IconView({
  name,
  color,
  size,
  buttonStyle = {},
}: IconViewProps) {
  const androidSize = size ?? 24;

  if (Platform.OS === "android") {
    return (
      <Ionicons
        name={name[1]}
        color={color}
        size={androidSize}
        style={buttonStyle}
      />
    );
  }

  return (
    <SymbolView
      name={name[0]}
      tintColor={color}
      {...(size ? { size } : {})} // only pass size on iOS if explicitly provided
    />
  );
}
