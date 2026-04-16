import CustomText from "../custom-text";
import { DEFAULT_FONT_FAMILY } from "../custom-text/styles";
import { Platform, StatusBar, Pressable, View } from "react-native";
import { useLayoutEffect } from "react";
import pressedOpacity from "@/utils/pressedOpacity";
import IconView from "../icon-view";
import { Colors } from "@/assets/colors";
import { useNavigation } from "expo-router";

type CustomHeaderProps = {
  headerTitle: string;
  rightIcon?: {
    icons: string[];
    iconFunction: () => void;
    disabled?: boolean;
  };
  leftIcon?: {
    icons: string[];
    iconFunction: () => void;
    disabled?: boolean;
  };
  isModal?: boolean;
};

export default function CustomHeader({
  headerTitle,
  rightIcon,
  leftIcon,
  isModal = false,
}: CustomHeaderProps) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        width: "100%",
        height: 80,
        paddingTop: StatusBar.currentHeight || 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        marginTop:
          StatusBar.currentHeight &&
          StatusBar.currentHeight - 45,
        marginBottom: 10,
      }}
    >
      {leftIcon && (
        <Pressable
          style={({ pressed }) => [
            pressedOpacity({ pressed }),
            {
              position: "absolute",
              left: 18,
              top: 45
            },
          ]}
          onPress={leftIcon.iconFunction}
          disabled={leftIcon.disabled}
        >
          <IconView name={leftIcon.icons} size={25} color={Colors.SECONDARY} />
        </Pressable>
      )}

      <CustomText
        style={{
          fontSize: 21,
          textAlign: Platform.OS === "ios" ? "left" : "center",

          fontFamily: DEFAULT_FONT_FAMILY,
        }}
      >
        {headerTitle}
      </CustomText>

      {rightIcon && (
        <Pressable
          style={({ pressed }) => [
            pressedOpacity({ pressed }),
            {
              position: "absolute",
              right: 18,
              top: 45
            },
          ]}
          onPress={rightIcon.iconFunction}
          disabled={rightIcon.disabled}
        >
          <IconView
            name={rightIcon.icons}
            size={25}
            color={rightIcon.disabled ? Colors.SECONDARY : Colors.PRIMARY}
          />
        </Pressable>
      )}
    </View>
  );
}
