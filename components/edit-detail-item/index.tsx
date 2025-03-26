import { EditDetailData } from "@/constants/types";
import CustomTextInput from "../custom-text-input";
import CustomSwitch from "../custom-switch";
import { SwitchProps, TextInputProps } from "react-native";
import { Colors } from "@/assets/colors";

type EditDetailItemProps = {
  item: EditDetailData;
  value: string | boolean;
  onValueChange?: (value: string | boolean) => void;
  textInputProps?: TextInputProps;
  switchProps?: SwitchProps;
};

export default function EditDetailItem({
  item,
  value,
  onValueChange,
  textInputProps,
  switchProps,
}: EditDetailItemProps) {
  if (item.type === "input") {
    return (
      <CustomTextInput
        value={value as string}
        label={item.label}
        placeholder={item.placeholder}
        onChangeText={(text) => onValueChange?.(text)}
        {...textInputProps}
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
        {...switchProps}
      />
    );
  }

  return null;
}
