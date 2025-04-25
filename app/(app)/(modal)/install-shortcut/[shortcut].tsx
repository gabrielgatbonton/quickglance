import { Colors } from "@/assets/colors";
import pressedOpacity from "@/utils/pressedOpacity";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { SymbolView } from "expo-symbols";
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
import CustomLink from "@/components/custom-link";
import globalStyles from "@/assets/global-styles";
import useInstallShortcut from "@/hooks/useInstallShortcut";

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
                  `install-shortcut/${currentShortcut.id}`,
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
            <SymbolView
              name="square.and.arrow.up"
              size={25}
              tintColor={Colors.PRIMARY}
            />
          </Pressable>
        ),
      });
    }
  }, [currentShortcut, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CustomLink
          title={isInstalled ? "Done" : "Cancel"}
          bold={isInstalled}
          onPress={() => router.back()}
          color={Colors.PRIMARY}
        />
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
            <SymbolView
              name={currentShortcut.icon}
              size={50}
              tintColor="white"
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
              <ActivityIndicator />
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
              <SymbolView
                name="arrow.down.circle.fill"
                size={30}
                tintColor={currentShortcut.gradientStart}
              />
              <CustomText style={{ fontSize: 16, color: Colors.SECONDARY }}>
                Installed!
              </CustomText>
            </View>
          ) : (
            <CustomButton
              title="Install Shortcut"
              color={currentShortcut.gradientStart}
              onPress={() => shortcutInstall()}
              containerStyle={styles.installButtonContainer}
            />
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
