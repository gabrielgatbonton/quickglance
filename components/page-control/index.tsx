import { View } from "react-native";
import styles from "./styles";
import { Colors } from "@/assets/colors";
import PageControlDot from "../page-control-dot";

type PageControlProps = {
  index: number;
  length: number;
  onDotClicked?: (index: number) => void;
  dotSize?: number;
  activeColor?: string;
  inactiveColor?: string;
  containerStyle?: object;
};

export default function PageControl({
  index,
  length,
  onDotClicked,
  dotSize = 10,
  activeColor = Colors.PRIMARY,
  inactiveColor = Colors.SECONDARY,
  containerStyle,
}: PageControlProps) {
  const renderDots = () => {
    const dots = [];

    for (let i = 0; i < length; i++) {
      dots.push(
        <PageControlDot
          key={i}
          size={dotSize}
          isCurrent={index === i}
          onPress={() => onDotClicked?.(i)}
          activeColor={activeColor}
          inactiveColor={inactiveColor}
        />,
      );
    }

    return dots;
  };

  if (length <= 1) {
    return null;
  }

  return <View style={[styles.container, containerStyle]}>{renderDots()}</View>;
}
