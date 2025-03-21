import { Text, View } from "react-native";
import styles from "./styles";

type SettingHeaderProps = {
  title: string;
};

export default function SettingHeader({ title }: SettingHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
