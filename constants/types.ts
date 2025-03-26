import { SFSymbol } from "expo-symbols";
import { ImageRequireSource, SwitchProps, TextInputProps } from "react-native";

export type WelcomeData = {
  label: string;
  description: string;
  icon: SFSymbol;
};

export type Shortcut = {
  id: string;
  name: string;
  description: string;
  icon: SFSymbol;
  gradientStart: string;
  gradientEnd: string;
  userName?: string;
  serviceId?: string;
};

export type ActionInput = {
  name: string;
  type: "text" | "number";
};

export type Action = {
  id: string;
  name: string;
  icon: SFSymbol;
  gradientStart: string;
  gradientEnd: string;
  inputs?: ActionInput[];
};

export type Category = {
  id: string;
  name: string;
  image: ImageRequireSource;
  actions: Action[];
};

export type Service = {
  id: string;
  name: string;
  description: string;
  website_link: string;
  image: ImageRequireSource;
  shortcuts: Shortcut[];
};

export type Automation = {
  id: string;
  name: string;
  actions: string[];
};

export type EditDetailData = {
  id: string;
  label: string;
  type: "input" | "switch";
  placeholder?: string;
  textInputProps?: TextInputProps;
  switchProps?: SwitchProps;
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
