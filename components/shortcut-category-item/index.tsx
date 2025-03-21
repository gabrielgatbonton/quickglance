import pressedOpacity from "@/utils/pressedOpacity";
import { Category } from "@/utils/types";
import { BlurView } from "expo-blur";
import { ImageBackground, Pressable, Text } from "react-native";
import styles from "./styles";

export default function ShortcutCategoryItem({ item }: { item: Category }) {
  return (
    <Pressable
      style={({ pressed }) => pressedOpacity({ pressed, opacity: 0.6 })}
    >
      <ImageBackground source={{ uri: item.id }} style={styles.imageContainer}>
        <BlurView intensity={50} tint="dark" style={styles.nameContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
        </BlurView>
      </ImageBackground>
    </Pressable>
  );
}
