import { PickerItem } from "@/constants/types";
import CustomTextInput, { CustomTextInputProps } from "../custom-text-input";
import CustomSwitch, { CustomSwitchProps } from "../custom-switch";
import CustomPicker, { CustomPickerSelectProps } from "../custom-picker";
import CustomSlider, { CustomSliderProps } from "../custom-slider";
import { Ref } from "react";

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
  useBottomSheetInput?: boolean;
  textInputProps?: Partial<CustomTextInputProps>;
  switchProps?: Partial<CustomSwitchProps>;
  pickerProps?: Partial<CustomPickerSelectProps>;
  sliderProps?: Partial<CustomSliderProps>;
  ref?: Ref<any>;
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
  ref,
}: CustomDynamicInputProps) {
  if (type === "text" || type === "number") {
    return (
      <CustomTextInput
        ref={ref!}
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
