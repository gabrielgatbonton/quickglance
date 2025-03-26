import { Switch, SwitchProps, Text, View } from "react-native";
import styles from "./styles";

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
        <Text style={styles.label}>{label}</Text>
      </View>

      <View style={styles.switchContainer}>
        <Switch {...switchProps} />
      </View>
    </View>
  );
}
