import pressedOpacity from "@/utils/pressedOpacity";
import { LinearGradient } from "expo-linear-gradient";
import { SymbolView } from "expo-symbols";
import {
  Alert,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import styles from "./styles";
import globalStyles from "@/assets/global-styles";
import { Shortcut } from "@/constants/types";
import ContextMenu from "react-native-context-menu-view";
import CustomText from "../custom-text";
import { BlurView } from "expo-blur";
import Animated, {
  Easing,
  FadingTransition,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { router } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteShortcut } from "@/services/apiService";
import IconView from "../icon-view";

type ShortcutItemProps = {
  item: Shortcut;
  isStarted?: boolean;
  isItemFocused?: boolean;
  isColumnSelected?: boolean;
};

export default function ShortcutItem({
  item,
  isStarted,
  isItemFocused,
  isColumnSelected,
}: ShortcutItemProps) {
  const { width, height } = useWindowDimensions();
  const queryClient = useQueryClient();

  const itemHeight = height * 0.13;
  const itemWidth = width / 2 - 21;

  const animatedViewStyle = useAnimatedStyle(() => {
    return {
      shadowOpacity: withTiming(isItemFocused ? 0.44 : 0, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      }),
      shadowRadius: withTiming(isItemFocused ? 10.32 : 0, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      }),
    };
  });

  const { mutate } = useMutation({
    mutationKey: ["deleteShortcut"],
    mutationFn: () => deleteShortcut(item.id),
    onSuccess: async (data) => {
      console.log(data);

      await queryClient.invalidateQueries({ queryKey: ["shortcuts"] });
    },
    onError: ({ response }: any) => {
      console.log({ error: response });

      Alert.alert("Please try again", response?.data.message);
    },
  });

  const handlePress = () => {
    router.navigate(`/(modal)/run-shortcut/${item.id}`);
  };

  const handleEdit = () => {
    router.navigate({
      pathname: `/(modal)/add-shortcut`,
      params: { shortcut: item.id },
    });
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Shortcut",
      `Are you sure you want to delete ${item.name}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => mutate(),
        },
      ],
    );
  };

  return (
    <Animated.View
      layout={FadingTransition}
      style={[styles.container, animatedViewStyle]}
    >
      <Pressable
        style={({ pressed }) => pressedOpacity({ pressed, opacity: 0.6 })}
        onPress={handlePress}
      >
        <ContextMenu
          actions={[
            { title: "Edit", systemIcon: "pencil" },
            { title: "Delete", systemIcon: "trash", destructive: true },
          ]}
          onPress={({ nativeEvent }) => {
            switch (nativeEvent.index) {
              case 0:
                handleEdit();
                break;
              case 1:
                handleDelete();
                break;
            }
          }}
        >
          <LinearGradient
            colors={[item.gradientStart, item.gradientEnd]}
            style={[
              {
                height: itemHeight,
                width: itemWidth,
              },
              isItemFocused && {
                transform: [
                  {
                    scale: 1.1,
                  },
                ],
              },
              styles.contentContainer,
            ]}
          >
            {isStarted && !isColumnSelected && (
              <BlurView
                intensity={3}
                // experimentalBlurMethod="dimezisBlurView"
                style={[StyleSheet.absoluteFillObject, { zIndex: 1 }]}
              />
            )}

            <View style={globalStyles.rowBetween}>
              <IconView name={[item.icon, "eye"]} color="white" size={30} />
              {/* <SymbolView name={item.icon} size={30} tintColor="white" /> */}

              <Pressable
                style={({ pressed }) => [
                  globalStyles.transparentButton,
                  pressedOpacity({ pressed }),
                ]}
                onPress={handleEdit}
              >
                <IconView name={["slider.vertical.3", "options"]} color="white" size={20} buttonStyle={styles.optionIcon} />
                {/* <SymbolView
                  name="slider.vertical.3"
                  size={20}
                  tintColor="white"
                  weight="bold"
                /> */}
              </Pressable>
            </View>

            <CustomText style={styles.label}>{item.name}</CustomText>
          </LinearGradient>
        </ContextMenu>
      </Pressable>
    </Animated.View>
  );
}
