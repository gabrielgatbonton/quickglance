import { Platform, Switch, SwitchProps, View } from "react-native";
import styles from "./styles";
import CustomText from "../custom-text";
import { Colors } from "@/assets/colors";

export type CustomSwitchProps = SwitchProps & {
  label: string;
};

export default function CustomSwitch({
  label,
  ...switchProps
}: CustomSwitchProps) {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <CustomText style={styles.label}>{label}</CustomText>
      </View>

      <View style={styles.switchContainer}>
        <Switch
          trackColor={{ true: Colors.PRIMARY, false: "lightgray" }}
          thumbColor={Platform.OS === "android" ? Colors.PRIMARY : undefined}
          {...switchProps}
        />
      </View>
    </View>
  );
}
