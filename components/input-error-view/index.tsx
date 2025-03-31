import { Text, View } from "react-native";
import styles from "./styles";

type InputErrorViewProps = {
  errors: string[] | undefined;
};

export default function InputErrorView({ errors }: InputErrorViewProps) {
  if (!errors || errors.length === 0) {
    return null;
  }

  return (
    <View style={styles.errorContainer}>
      {errors.map((error, index) => (
        <Text key={index} style={styles.errorText}>
          {error}
        </Text>
      ))}
    </View>
  );
}
