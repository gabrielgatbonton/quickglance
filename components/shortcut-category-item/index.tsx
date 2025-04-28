import pressedOpacity from "@/utils/pressedOpacity";
import { Category } from "@/constants/types";
import { BlurView } from "expo-blur";
import { ImageBackground, Pressable } from "react-native";
import styles from "./styles";
import CustomText from "../custom-text";

type ShortcutCategoryItemProps = {
  item: Category;
  onCategoryPress?: (category: Category) => void;
};

export default function ShortcutCategoryItem({
  item,
  onCategoryPress,
}: ShortcutCategoryItemProps) {
  return (
    <Pressable
      style={({ pressed }) => pressedOpacity({ pressed, opacity: 0.6 })}
      onPress={() => onCategoryPress?.(item)}
    >
      <ImageBackground
        source={{ uri: item.imageKey }}
        style={styles.imageContainer}
      >
        <BlurView
          intensity={50}
          // experimentalBlurMethod="dimezisBlurView"
          tint="dark"
          style={styles.nameContainer}
        >
          <CustomText style={styles.name} numberOfLines={1}>
            {item.name}
          </CustomText>
        </BlurView>
      </ImageBackground>
    </Pressable>
  );
}
