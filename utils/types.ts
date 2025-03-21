import { SFSymbol } from "expo-symbols";
import { ImageRequireSource } from "react-native";

export type WelcomeData = {
  label: string;
  description: string;
  icon: SFSymbol;
};

export type Shortcut = {
  name: string;
  description: string;
  icon: SFSymbol;
  gradientStart: string;
  gradientEnd: string;
  userName?: string;
  serviceId?: number;
};

export type Service = {
  id: number;
  name: string;
  description: string;
  website_link: string;
  image: ImageRequireSource;
  shortcuts: Shortcut[];
};

export type Automation = {
  name: string;
  actions: string[];
};

export type SettingData = {
  label: string;
  type: "list" | "hint" | "link" | "switch";
  action?: () => void;
};

export type Setting = {
  title: string;
  data: SettingData[];
};

export type Category = {
  id: string;
  name: string;
  image: ImageRequireSource;
};
