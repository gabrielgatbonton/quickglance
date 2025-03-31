import Animated, { useSharedValue, ZoomIn } from "react-native-reanimated";
import ColorPicker, {
  Panel1,
  Swatches,
  HueSlider,
  PreviewText,
  ColorFormatsObject,
} from "reanimated-color-picker";
import styles from "./styles";
import { Modal, Pressable, ScrollView, View } from "react-native";
import { BlurView } from "expo-blur";
import pressedOpacity from "@/utils/pressedOpacity";
import { Colors } from "@/assets/colors";
import { SymbolView } from "expo-symbols";
import CustomButton from "../custom-button";
import { useEffect } from "react";

type CustomColorPickerProps = {
  label: string;
  value: string;
  isVisible: boolean;
  onVisibilityChange: (isVisible: boolean) => void;
  onColorChange: (color: string) => void;
};

const CUSTOM_SWATCHES = [
  "#FF2D55", // Pink/Red
  "#19CCDF", // Cyan/Turquoise
  "#E5BC09", // Yellow/Gold
  "#0EABEF", // Blue
  "#37DF19", // Green
  "#9B59B6", // Purple
  "#E67E22", // Orange
  "#1ABC9C", // Teal
  "#7F8C8D", // Gray
  "#FF9500", // Amber
];

export default function CustomColorPicker({
  label,
  value,
  isVisible,
  onVisibilityChange,
  onColorChange,
}: CustomColorPickerProps) {
  const selectedColor = useSharedValue(value);

  useEffect(() => {
    // Set a random color if the value is empty
    if (!value) {
      const randomIndex = Math.floor(Math.random() * CUSTOM_SWATCHES.length);
      const newColor = CUSTOM_SWATCHES[randomIndex];

      selectedColor.set(newColor);
      onColorChange(newColor);
      return;
    }

    // Update the selected color if the value changes
    if (value !== selectedColor.get()) {
      selectedColor.set(value);
    }
  }, [onColorChange, selectedColor, value]);

  const onColorSelect = (color: ColorFormatsObject) => {
    "worklet";
    selectedColor.set(color.hex);
  };

  return (
    <>
      <CustomButton
        title={label}
        onPress={() => onVisibilityChange(true)}
        color={value}
      />

      <Modal
        onRequestClose={() => onVisibilityChange(false)}
        visible={isVisible}
        animationType="fade"
        transparent
      >
        <BlurView intensity={85} style={styles.container}>
          <Animated.View
            entering={ZoomIn.duration(200)}
            style={styles.pickerContainer}
          >
            <ColorPicker
              value={selectedColor.get()}
              sliderThickness={25}
              thumbSize={24}
              thumbShape="circle"
              onChange={onColorSelect}
              boundedThumb
            >
              <Panel1 style={styles.panelStyle} />
              <HueSlider style={styles.sliderStyle} />
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.swatchesScrollContainer}
              >
                <Swatches
                  style={styles.swatchesContainer}
                  swatchStyle={styles.swatchStyle}
                  colors={CUSTOM_SWATCHES}
                />
              </ScrollView>
              <View style={styles.previewTxtContainer}>
                <PreviewText style={styles.previewTxt} />
              </View>
            </ColorPicker>
          </Animated.View>

          <View style={styles.buttonContainer}>
            <Pressable
              style={({ pressed }) => pressedOpacity({ pressed })}
              onPress={() => onVisibilityChange(false)}
            >
              <SymbolView
                name="xmark.circle"
                size={50}
                tintColor={Colors.SECONDARY}
              />
            </Pressable>

            <Pressable
              style={({ pressed }) => pressedOpacity({ pressed })}
              onPress={() => {
                onVisibilityChange(false);
                onColorChange(selectedColor.get());
              }}
            >
              <SymbolView
                name="checkmark.circle"
                size={50}
                tintColor={Colors.SECONDARY}
              />
            </Pressable>
          </View>
        </BlurView>
      </Modal>
    </>
  );
}
