import { View } from "react-native";
import CustomText from "../custom-text";
import styles from "./styles";
import Slider, { SliderProps } from "@react-native-community/slider";
import { Colors } from "@/assets/colors";

export type CustomSliderProps = SliderProps & {
  label: string;
  color?: string;
};

export default function CustomSlider({
  label,
  value,
  color = Colors.PRIMARY,
  ...sliderProps
}: CustomSliderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <CustomText style={styles.label}>{label}</CustomText>
      </View>

      <View style={styles.sliderContainer}>
        <Slider
          value={value}
          thumbTintColor={color}
          minimumTrackTintColor={color}
          maximumTrackTintColor="lightgray"
          style={[styles.slider, sliderProps.style]}
          {...sliderProps}
        />
        <CustomText style={styles.value}>{value?.toFixed(1)}</CustomText>
      </View>
    </View>
  );
}
