import { AddShortcutState } from "@/stores/useAddShortcutStore";
import { SFSymbol } from "expo-symbols";
import { ImageRequireSource, SwitchProps, TextInputProps } from "react-native";

export type WelcomeData = {
  label: string;
  description: string;
  icon: SFSymbol;
};

export type User = {
  id?: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
};

export type UserPassword = {
  password: string;
  password_confirmation: string;
};

export type UserErrors =
  | {
      [K in keyof User]?: string[];
    }
  | null;

export type UserPasswordErrors =
  | {
      [K in keyof UserPassword]?: string[];
    }
  | null;

export type ShortcutStep = {
  id: string;
  actionId: string;
  inputs: Record<string, any>;
};

export type Shortcut = {
  id: string;
  name: string;
  description: string;
  icon: SFSymbol;
  gradientStart: string;
  gradientEnd: string;
  userName?: string;
  steps: ShortcutStep[];
  serviceId?: string;
};

export type ActionInput = {
  name: string;
  value?: any;
  type?:
    | "text"
    | "number"
    | "select"
    | "slider"
    | "file"
    | "action"
    | "datetime";
  placeholder?: string;
  multiline?: boolean;
  default?: any;
  min?: number;
  max?: number;
  options?: string[];
  fileTypes?: string[];
  required?: boolean;
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
  key: keyof AddShortcutState["details"];
  label: string;
  type: "input" | "switch";
  placeholder?: string;
  textInputProps?: TextInputProps;
  switchProps?: SwitchProps;
};

export type SettingData = {
  label: string;
  type: "list" | "hint" | "link" | "switch" | "destructive";
  action?: () => void;
  hidden?: boolean;
};

export type Setting = {
  title: string;
  data: SettingData[];
};
