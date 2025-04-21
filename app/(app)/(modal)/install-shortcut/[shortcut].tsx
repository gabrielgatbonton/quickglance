import { Colors } from "@/assets/colors";
import pressedOpacity from "@/utils/pressedOpacity";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useLayoutEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";
import * as Linking from "expo-linking";
import { SAMPLE_SHORTCUTS } from "@/constants/sampleShortcuts";
import Share from "react-native-share";
import HintView from "@/components/hint-view";
import { LinearGradient } from "expo-linear-gradient";
import CustomText from "@/components/custom-text";
import CustomButton from "@/components/custom-button";
import styles from "./styles";
import { SAMPLE_SERVICES } from "@/constants/sampleServices";

type InstallStatus = "pending" | "installing" | "installed";

const INSTALL_STATUS = {
  PENDING: "pending",
  INSTALLING: "installing",
  INSTALLED: "installed",
} as const;

export default function ShortcutInstaller() {
  const [installStatus, setInstallStatus] = useState<InstallStatus>(
    INSTALL_STATUS.PENDING,
  );

  const { shortcut } = useLocalSearchParams<{ shortcut: string }>();
  const navigation = useNavigation();

  const currentShortcut =
    SAMPLE_SHORTCUTS.find((sampleShortcut) => sampleShortcut.id === shortcut) ||
    SAMPLE_SERVICES.map((sampleService) => sampleService.shortcuts)
      .flat()
      .find((sampleShortcut) => sampleShortcut.id === shortcut);

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
              } catch (err: any) {
                console.log({ err });
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

  if (!currentShortcut) {
    return (
      <View style={styles.loadingContainer}>
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
          {installStatus === "installing" ? (
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
          ) : installStatus === "installed" ? (
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
              onPress={async () => {
                setInstallStatus(INSTALL_STATUS.INSTALLING);

                setTimeout(() => {
                  setInstallStatus(INSTALL_STATUS.INSTALLED);
                }, 2000);
              }}
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
