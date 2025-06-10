import Animated, { BounceIn } from "react-native-reanimated";
import IconView, { IoniconName } from "../icon-view";
import CustomText from "../custom-text";
import styles from "./styles";
import { useWindowDimensions } from "react-native";
import { SFSymbol } from "expo-symbols";

type EmptyDashboard = {
  text: string;
  iosIcon: SFSymbol | undefined;
  androidIcon: IoniconName | undefined;
};

export default function EmptyDashboard({
  text,
  iosIcon,
  androidIcon,
}: EmptyDashboard) {
  const { height } = useWindowDimensions();
  return (
    <Animated.View
      entering={BounceIn.duration(300)}
      style={[styles.emptyContainer, { height: height * 0.8 }]}
    >
      <IconView name={[iosIcon, androidIcon]} size={80} color="gray" />
      <CustomText style={styles.emptyText}>{text}</CustomText>
    </Animated.View>
  );
}
