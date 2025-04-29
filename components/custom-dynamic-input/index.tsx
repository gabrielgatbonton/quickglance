import { PickerItem } from "@/constants/types";
import CustomTextInput from "../custom-text-input";
import CustomSwitch from "../custom-switch";
import CustomPicker from "../custom-picker";
import { SwitchProps, TextInputProps } from "react-native";
import CustomSlider from "../custom-slider";
import { PickerSheetProps } from "../picker-sheet";
import { SliderProps } from "@react-native-community/slider";

export type CustomDynamicInputProps = {
  value: any;
  onValueChange?: (value: any) => void;
  label: string;
  type: "text" | "number" | "select" | "switch" | "slider";
  placeholder?: string;
  multiline?: boolean;
  options?: PickerItem[];
  min?: number;
  max?: number;
  textInputProps?: Partial<TextInputProps>;
  switchProps?: Partial<SwitchProps>;
  pickerProps?: Partial<PickerSheetProps>;
  sliderProps?: Partial<SliderProps>;
};

export default function CustomDynamicInput({
  value,
  onValueChange,
  type,
  label,
  placeholder,
  multiline,
  options,
  min,
  max,
  textInputProps,
  switchProps,
  pickerProps,
  sliderProps,
}: CustomDynamicInputProps) {
  if (type === "text" || type === "number") {
    return (
      <CustomTextInput
        value={value}
        label={label}
        placeholder={placeholder}
        multiline={multiline}
        onChangeText={(text) => onValueChange?.(text)}
        keyboardType={type === "number" ? "numeric" : undefined}
        {...textInputProps}
      />
    );
  }

  if (type === "switch") {
    return (
      <CustomSwitch
        value={value}
        label={label}
        onValueChange={(value) => onValueChange?.(value)}
        {...switchProps}
      />
    );
  }

  if (type === "select") {
    return (
      <CustomPicker
        value={value}
        label={label}
        placeholder={placeholder}
        onSelected={(value) => onValueChange?.(value)}
        data={options ?? []}
        {...pickerProps}
      />
    );
  }

  if (type === "slider") {
    return (
      <CustomSlider
        value={value}
        label={label}
        onValueChange={(value) => onValueChange?.(value)}
        minimumValue={min}
        maximumValue={max}
        {...sliderProps}
      />
    );
  }

  return null;
}
