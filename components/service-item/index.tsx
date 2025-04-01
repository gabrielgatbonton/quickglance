import {
  ImageBackground,
  Pressable,
  useWindowDimensions,
  View,
} from "react-native";
import { BlurView } from "expo-blur";
import pressedOpacity from "@/utils/pressedOpacity";
import styles from "./styles";
import { Service } from "@/constants/types";
import { router } from "expo-router";
import CustomText from "../custom-text";

export default function ServiceItem({ item }: { item: Service }) {
  const { width, height } = useWindowDimensions();

  const itemHeight = height * 0.15;
  const itemWidth = width / 2 - 22;

  return (
    <Pressable
      style={({ pressed }) => pressedOpacity({ pressed, opacity: 0.6 })}
      onPress={() => router.push(`/${item.id}`)}
    >
      <ImageBackground
        source={{ uri: item.name }}
        style={[
          {
            width: itemWidth,
            height: itemHeight,
          },
          styles.contentContainer,
        ]}
      >
        <View style={styles.darkFilter} />

        <BlurView intensity={50} tint="dark" style={styles.blurContainer}>
          <CustomText style={styles.name}>{item.name}</CustomText>
        </BlurView>
      </ImageBackground>
    </Pressable>
  );
}
