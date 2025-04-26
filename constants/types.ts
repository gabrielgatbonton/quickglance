import { CustomPickerSelectProps } from "@/components/custom-picker";
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
  inputs?: Record<string, any>;
};

export type Shortcut = {
  id: string;
  name: string;
  description: string;
  icon: SFSymbol;
  gradientStart: string;
  gradientEnd: string;
  steps: ShortcutStep[];
  isUpload?: boolean;
  isInstalled?: boolean;
  userName?: string;
  serviceName?: string;
};

export type ActionInput = {
  key: string;
  label: string;
  value?: any;
  type?: "text" | "number" | "select" | "slider" | "file";
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
  key?: string;
  id: string;
  name: string;
  icon: SFSymbol;
  gradientStart: string;
  gradientEnd: string;
  inputs?: ActionInput[];
};

export type RunningAction = Action & {
  isCurrent: boolean;
  isCompleted: boolean;
};

export type Category = {
  id: string;
  name: string;
  image?: ImageRequireSource;
  imageKey: string;
  actions: Action[];
};

export type Service = {
  id: string;
  name: string;
  description: string;
  websiteLink: string;
  image?: ImageRequireSource;
  imageKey: string;
  shortcuts: Shortcut[];
};

export type Automation = {
  id: string;
  name: string;
  actions: string[];
};

export type PickerItem = {
  label: string;
  value: any;
  ItemComponent?: (item: PickerItem) => React.ReactNode;
};

export type EditDetailData = {
  key: keyof AddShortcutState["details"];
  label: string;
  type: "input" | "switch" | "select";
  placeholder?: string;
  options?: PickerItem[];
  textInputProps?: Partial<TextInputProps>;
  switchProps?: Partial<SwitchProps>;
  pickerProps?: Partial<CustomPickerSelectProps>;
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

export type TurnDirection = "center" | "left" | "right";

export type NodDirection = "center" | "up" | "down";

export type FaceTurnData = {
  angle: number | null;
  direction: TurnDirection;
};

export type FaceNodData = {
  angle: number | null;
  direction: NodDirection;
};

export type BlinkData = {
  isBlinking: boolean;
  leftEyeOpen: boolean;
  rightEyeOpen: boolean;
  blinkCount: number;
};

export type HeadShakeData = {
  isShaking: boolean;
  directionChanges: number;
  pattern: TurnDirection[];
};
