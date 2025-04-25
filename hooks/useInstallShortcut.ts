import { installShortcut } from "@/services/apiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import { Shortcut } from "@/constants/types";
import { Alert } from "react-native";

export default function useInstallShortcut(shortcut?: Shortcut) {
  const [isInstalled, setIsInstalled] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending: isInstalling } = useMutation({
    mutationKey: ["installShortcut"],
    mutationFn: installShortcut,
    onSuccess: async (data) => {
      console.log(data);

      await queryClient.invalidateQueries({ queryKey: ["shortcuts"] });
      await queryClient.invalidateQueries({ queryKey: ["services"] });

      setIsInstalled(true);

      Notifications.scheduleNotificationAsync({
        content: {
          title: "Shortcut Installed",
          body: `You have successfully installed ${shortcut?.name}`,
        },
        trigger: null,
      });
    },
    onError: ({ response }: any) => {
      console.log({ error: response });

      Alert.alert("Please try again", response?.data.message);
    },
  });

  // Sync the isInstalled state with the shortcut prop
  useEffect(() => {
    setIsInstalled(shortcut?.isInstalled ?? false);
  }, [shortcut?.isInstalled]);

  return {
    isInstalled,
    isInstalling,
    shortcutInstall: () => {
      if (shortcut && !isInstalling) {
        Alert.alert(
          "Install Shortcut",
          `Are you sure you want to install ${shortcut.name}?`,
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Install",
              onPress: () => mutate({ shortcutId: shortcut.id }),
            },
          ],
        );
      }
    },
  };
}
