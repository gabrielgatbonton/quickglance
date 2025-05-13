import pressedOpacity from "@/utils/pressedOpacity";
import { ActivityIndicator, Alert, Pressable, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";
import globalStyles from "@/assets/global-styles";
import { Shortcut } from "@/constants/types";
import ContextMenu from "react-native-context-menu-view";
import CustomText from "../custom-text";
import { router } from "expo-router";
import Animated, { Easing, ZoomIn } from "react-native-reanimated";
import useInstallShortcut from "@/hooks/useInstallShortcut";
import IconView from "../icon-view";

export default function StoreItem({ item }: { item: Shortcut }) {
  const owner = item.userName || item.serviceName;

  const { isInstalled, isInstalling, shortcutInstall } =
    useInstallShortcut(item);

  return (
    <Animated.View
      entering={ZoomIn.duration(200).easing(Easing.out(Easing.exp))}
    >
      <Pressable
        style={({ pressed }) => pressedOpacity({ pressed, opacity: 0.6 })}
        onPress={() => router.navigate(`/install-shortcut/${item.id}`)}
      >
        <ContextMenu
          actions={[
            {
              title: "Install Shortcut",
              systemIcon: "square.and.arrow.down",
              subtitle: item.name,
            },

            ...(owner
              ? [
                  {
                    title: `By: ${owner}`,
                    disabled: true,
                  },
                ]
              : []),
          ]}
          onPress={({ nativeEvent }) => {
            switch (nativeEvent.index) {
              case 0:
                shortcutInstall();
                break;
            }
          }}
        >
          <LinearGradient
            colors={[item.gradientStart, item.gradientEnd]}
            style={styles.contentContainer}
          >
            <View style={globalStyles.rowBetween}>
            <IconView name={[item.icon, item.androidIcon]} color="white" size={33} />

              {isInstalling ? (
                <View style={globalStyles.transparentButton}>
                  <ActivityIndicator size={25} color="white" />
                </View>
              ) : isInstalled ? (
                <Pressable
                  style={({ pressed }) => [
                    globalStyles.transparentButton,
                    pressedOpacity({ pressed }),
                  ]}
                  onPress={() => {
                    Alert.alert(
                      "Shortcut already installed",
                      "Check the shortcuts tab to see your installed shortcuts.",
                      [
                        {
                          text: "View Shortcuts",
                          onPress: () => router.push("/home"),
                        },
                        {
                          text: "Install Again",
                          onPress: () => shortcutInstall(),
                        },
                        { text: "Cancel", style: "cancel" },
                      ],
                    );
                  }}
                >
                  <IconView name={["square.and.arrow.down" , "checkmark-circle-outline"]} color="white" />

                </Pressable>
              ) : (
                <Pressable
                  style={({ pressed }) => [
                    globalStyles.transparentButton,
                    pressedOpacity({ pressed }),
                  ]}
                  onPress={() => shortcutInstall()}
                >
                  <IconView name={["square.and.arrow.down" , "download-outline"]} color="white" />

                </Pressable>
              )}
            </View>

            <View style={styles.detailsContainer}>
              <CustomText style={styles.name}>{item.name}</CustomText>
              <CustomText style={styles.description} numberOfLines={3}>
                {item.description}
              </CustomText>
            </View>
          </LinearGradient>
        </ContextMenu>
      </Pressable>
    </Animated.View>
  );
}
