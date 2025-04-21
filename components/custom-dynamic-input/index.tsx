import { EditDetailData } from "@/constants/types";
import CustomTextInput from "../custom-text-input";
import CustomSwitch from "../custom-switch";
import { Colors } from "@/assets/colors";
import CustomPicker from "../custom-picker";

type CustomDynamicInputProps = {
  item: EditDetailData;
  value: string | boolean;
  onValueChange?: (value: string | boolean) => void;
};

export default function CustomDynamicInput({
  item,
  value,
  onValueChange,
}: CustomDynamicInputProps) {
  if (item.type === "input") {
    return (
      <CustomTextInput
        value={value as string}
        label={item.label}
        placeholder={item.placeholder}
        onChangeText={(text) => onValueChange?.(text)}
        {...item.textInputProps}
      />
    );
  }

  if (item.type === "switch") {
    return (
      <CustomSwitch
        value={value as boolean}
        label={item.label}
        onValueChange={(value) => onValueChange?.(value)}
        trackColor={{ true: Colors.PRIMARY }}
        {...item.switchProps}
      />
    );
  }

  if (item.type === "select") {
    return (
      <CustomPicker
        value={value}
        label={item.label}
        placeholder={item.placeholder}
        onSelected={(value) => onValueChange?.(value)}
        data={item.options ?? []}
        {...item.pickerProps}
      />
    );
  }

  return null;
}
