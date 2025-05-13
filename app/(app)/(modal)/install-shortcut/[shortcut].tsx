import { Colors } from "@/assets/colors";
import pressedOpacity from "@/utils/pressedOpacity";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";
import * as Linking from "expo-linking";
import Share from "react-native-share";
import HintView from "@/components/hint-view";
import { LinearGradient } from "expo-linear-gradient";
import CustomText from "@/components/custom-text";
import CustomButton from "@/components/custom-button";
import styles from "./styles";
import { useQuery } from "@tanstack/react-query";
import { getShortcut } from "@/services/apiService";
import globalStyles from "@/assets/global-styles";
import useInstallShortcut from "@/hooks/useInstallShortcut";
import IconView from "@/components/icon-view";

export default function ShortcutInstaller() {
  const { shortcut } = useLocalSearchParams<{ shortcut: string }>();
  const navigation = useNavigation();

  const { data: currentShortcut } = useQuery({
    queryKey: ["shortcuts", shortcut],
    queryFn: () => getShortcut(shortcut),
    enabled: Boolean(shortcut),
  });

  const { isInstalled, isInstalling, shortcutInstall } =
    useInstallShortcut(currentShortcut);

  useLayoutEffect(() => {
    if (currentShortcut) {
      navigation.setOptions({
        headerRight: () => (
          <Pressable
            style={({ pressed }) => pressedOpacity({ pressed })}
            onPress={() => {
              try {
                const url = Linking.createURL(
                  `install-shortcut/${currentShortcut.id}`
                );
                const title = currentShortcut.name;

                Share.open({
                  activityItemSources: [
                    {
                      placeholderItem: { type: "url", content: url },
                      item: { default: { type: "url", content: url } },
                      subject: { default: title },
                      linkMetadata: { originalUrl: url, url, title },
                    },
                  ],
                });
              } catch (error: any) {
                console.log({ error });
              }
            }}
          >
            <IconView
              name={["square.and.arrow.up", "eye"]}
              color={Colors.PRIMARY}
              size={25}
            />
          </Pressable>
        ),
      });
    }
  }, [currentShortcut, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <>
          <Pressable onPress={() => router.back()} style={({pressed}) => pressedOpacity({pressed})} >
            <IconView name={["", "arrow-back"]} color={Colors.PRIMARY} size={25} />
          </Pressable>
          {/* <CustomLink
            title={isInstalled ? "Done" : "Cancel"}
            bold={isInstalled}
            onPress={() => router.back()}
            color={Colors.PRIMARY}
          /> */}
        </>
      ),
    });
  }, [isInstalled, navigation]);

  if (!currentShortcut) {
    return (
      <View style={globalStyles.modalLoading}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View
          style={[
            styles.iconContainer,
            { shadowColor: currentShortcut.gradientStart },
          ]}
        >
          <LinearGradient
            colors={[
              currentShortcut.gradientStart,
              currentShortcut.gradientEnd,
            ]}
            style={styles.iconContentContainer}
          >
            <IconView
              name={[currentShortcut.icon, currentShortcut.androidIcon]}
              color="white"
              size={50}
            />
          </LinearGradient>
        </View>

        <View style={styles.detailsContainer}>
          <CustomText style={styles.name}>{currentShortcut.name}</CustomText>
          <CustomText style={styles.description}>
            {currentShortcut.description}
          </CustomText>
        </View>

        <View style={styles.actionContainer}>
          {isInstalling ? (
            <View style={styles.pendingContainer}>
              <ActivityIndicator size="large" color={Colors.PRIMARY} />
              <CustomText
                style={{
                  fontSize: 16,
                  color: Colors.SECONDARY,
                }}
              >
                Installing...
              </CustomText>
            </View>
          ) : isInstalled ? (
            <View style={styles.installedContainer}>
              <IconView
                name={["arrow.down.circle.fill", "arrow-down-circle"]}
                color={Colors.PRIMARY}
                size={30}
              />
              <CustomText style={{ fontSize: 16, color: Colors.SECONDARY }}>
                Installed!
              </CustomText>
            </View>
          ) : (
            <View>
              <CustomButton
                title="Install"
                color={currentShortcut.gradientStart}
                onPress={() => shortcutInstall()}
                containerStyle={styles.installButtonContainer}
                buttonIcons={["", "eye"]}
              />
            </View>
          )}
        </View>
      </ScrollView>

      <HintView
        icon="hand.raised.fill"
        title="Privacy Warning"
        description="This shortcut will run on your device and may access your device permissions."
      />
    </View>
  );
}
