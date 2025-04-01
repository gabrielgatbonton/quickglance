import { View } from "react-native";
import styles from "./styles";
import CustomText from "../custom-text";

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
        <CustomText key={index} style={styles.errorText}>
          {error}
        </CustomText>
      ))}
    </View>
  );
}
