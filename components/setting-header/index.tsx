import { View } from "react-native";
import styles from "./styles";
import CustomText from "../custom-text";

type SettingHeaderProps = {
  title: string;
};

export default function SettingHeader({ title }: SettingHeaderProps) {
  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>{title}</CustomText>
    </View>
  );
}
