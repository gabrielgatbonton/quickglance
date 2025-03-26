import { useSharedValue } from "react-native-reanimated";
import ColorPicker, {
  Panel1,
  Swatches,
  HueSlider,
  PreviewText,
  ColorFormatsObject,
} from "reanimated-color-picker";
import styles from "./styles";
import { Modal, Pressable, View } from "react-native";
import { BlurView } from "expo-blur";
import pressedOpacity from "@/utils/pressedOpacity";
import { Colors } from "@/assets/colors";
import { SymbolView } from "expo-symbols";
import CustomButton from "../custom-button";

type CustomColorPickerProps = {
  label: string;
  isVisible: boolean;
  onVisibilityChange: (isVisible: boolean) => void;
  onColorChange: (color: string) => void;
};

const CUSTOM_SWATCHES = [
  "#FF2D55",
  "#19CCDF",
  "#E5BC09",
  "#0EABEF",
  "#19CCDF",
  "#37DF19",
];

export default function CustomColorPicker({
  label,
  isVisible,
  onVisibilityChange,
  onColorChange,
}: CustomColorPickerProps) {
  const randomIndex = Math.floor(Math.random() * CUSTOM_SWATCHES.length);
  const selectedColor = useSharedValue(CUSTOM_SWATCHES[randomIndex]);

  const onColorSelect = (color: ColorFormatsObject) => {
    "worklet";
    selectedColor.value = color.hex;
  };

  return (
    <>
      <CustomButton
        title={label}
        onPress={() => onVisibilityChange(true)}
        color={selectedColor.value}
      />

      <Modal
        onRequestClose={() => onVisibilityChange(false)}
        visible={isVisible}
        animationType="fade"
        transparent
      >
        <BlurView intensity={80} style={styles.container}>
          <View style={styles.pickerContainer}>
            <ColorPicker
              value={selectedColor.value}
              sliderThickness={25}
              thumbSize={24}
              thumbShape="circle"
              onChange={onColorSelect}
              boundedThumb
            >
              <Panel1 style={styles.panelStyle} />
              <HueSlider style={styles.sliderStyle} />
              <Swatches
                style={styles.swatchesContainer}
                swatchStyle={styles.swatchStyle}
                colors={CUSTOM_SWATCHES}
              />
              <View style={styles.previewTxtContainer}>
                <PreviewText style={styles.previewTxt} />
              </View>
            </ColorPicker>
          </View>

          <View style={styles.buttonContainer}>
            <Pressable
              style={({ pressed }) => pressedOpacity({ pressed })}
              onPress={() => {
                onVisibilityChange(false);
                onColorChange(selectedColor.value);
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
