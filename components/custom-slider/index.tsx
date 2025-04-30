import { View } from "react-native";
import CustomText from "../custom-text";
import styles from "./styles";
import Slider, { SliderProps } from "@react-native-community/slider";
import { Colors } from "@/assets/colors";

export type CustomSliderProps = SliderProps & { label: string };

export default function CustomSlider({
  label,
  value,
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
          thumbTintColor={Colors.PRIMARY}
          minimumTrackTintColor={Colors.PRIMARY}
          maximumTrackTintColor="lightgray"
          style={[styles.slider, sliderProps.style]}
          {...sliderProps}
        />
        <CustomText style={styles.value}>{value?.toFixed(1)}</CustomText>
      </View>
    </View>
  );
}
