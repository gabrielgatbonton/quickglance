import { CustomDynamicInputProps } from "@/components/custom-dynamic-input";
import { AddShortcutState } from "@/stores/useAddShortcutStore";
import { SFSymbol } from "expo-symbols";
import { ImageRequireSource } from "react-native";

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
  actionName: string;
  mobileKey?: string;
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
  type?: "text" | "number" | "select" | "switch" | "slider";
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
  isFailed: boolean;
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

export type AutomationStep = {
  id: string;
  shortcutId: string;
  shortcutName: string;
  order: number;
};

export type Automation = {
  id: string;
  title: string;
  steps: AutomationStep[];
};

export type AutomationCondition = {
  id: string;
  name: string;
  description: string;
  emoji: string;
  type: string;
};

export type AutomationCategory = {
  title: string;
  data: [{ items: AutomationCondition[] }];
};

export type PickerItem = {
  label: string;
  value: any;
  ItemComponent?: (item: PickerItem) => React.ReactNode;
};

export type EditDetailData = Omit<CustomDynamicInputProps, "value"> & {
  key: keyof AddShortcutState["details"];
};

export type OrderData = Record<string, number>;

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

export type Emotion =
  | "happy"
  | "sad"
  | "surprised"
  | "fearful"
  | "angry"
  | "disgusted"
  | "neutral";

export type EmotionResultWithLabels = Record<Emotion, number>;

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
  blinkDuration: number;
};

export type EmotionData = {
  emotion: Emotion;
  results?: EmotionResultWithLabels;
};

export type HeadShakeData = {
  isShaking: boolean;
  directionChanges: number;
  pattern: TurnDirection[];
};
