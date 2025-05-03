import { Action } from "@/constants/types";
import { Pressable, useWindowDimensions, View } from "react-native";
import Animated, { Easing, ZoomIn, ZoomOut } from "react-native-reanimated";
import styles from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { SymbolView } from "expo-symbols";
import globalStyles from "@/assets/global-styles";
import pressedOpacity from "@/utils/pressedOpacity";
import CustomText from "../custom-text";
import IconView from "../icon-view";

type AddActionItemProps = {
  item: Action;
  index: number;
  onActionEdit?: (action: Action) => void;
  onActionDelete?: (action: Action) => void;
};

export default function AddActionItem({
  item,
  index,
  onActionEdit,
  onActionDelete,
}: AddActionItemProps) {
  const { height } = useWindowDimensions();
  const itemHeight = height * 0.13;

  return (
    <View style={[{ height: itemHeight }, styles.container]}>
      <View style={styles.indexContainer}>
        <CustomText style={styles.indexText}>{index + 1}</CustomText>
      </View>

      <Animated.View
        entering={ZoomIn.duration(150).easing(Easing.out(Easing.exp))}
        exiting={ZoomOut.duration(500).easing(Easing.out(Easing.exp))}
        style={styles.animatedContainer}
      >
        <LinearGradient
          colors={[item.gradientStart, item.gradientEnd]}
          style={styles.contentContainer}
        >
          <View style={globalStyles.rowBetween}>
            <IconView name={[item.icon, "eye"]} color="white" size={30} />
            {/* <SymbolView name={item.icon} size={30} tintColor="white" /> */}

            <View style={styles.buttonContainer}>
              {onActionEdit && (
                <Pressable
                  style={({ pressed }) => [
                    globalStyles.transparentButton,
                    pressedOpacity({ pressed }),
                  ]}
                  onPress={() => onActionEdit(item)}
                >
                  <IconView name={["pencil", "pencil"]} color="white" size={15} />
                </Pressable>
              )}

              {onActionDelete && (
                <Pressable
                  style={({ pressed }) => [
                    globalStyles.transparentButton,
                    pressedOpacity({ pressed }),
                  ]}
                  onPress={() => onActionDelete(item)}
                >
                  <IconView name={["xmark", "remove"]} color="white" size={15} />
                  {/* <SymbolView name="xmark" size={15} tintColor="white" /> */}
                </Pressable>
              )}
            </View>
          </View>

          <CustomText style={styles.label}>{item.name}</CustomText>
        </LinearGradient>
      </Animated.View>
    </View>
  );
}
