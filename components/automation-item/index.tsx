import { Alert, Pressable, View } from "react-native";
import { BlurView } from "expo-blur";
import pressedOpacity from "@/utils/pressedOpacity";
import styles from "./styles";
import { Automation } from "@/constants/types";
import ContextMenu from "react-native-context-menu-view";
import CustomText from "../custom-text";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAutomation } from "@/services/apiService";
import IconView from "../icon-view";

export default function AutomationItem({ item }: { item: Automation }) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["deleteAutomation"],
    mutationFn: () => deleteAutomation(item.id),
    onSuccess: async (data) => {
      console.log(data);

      await queryClient.invalidateQueries({ queryKey: ["automations"] });
    },
    onError: ({ response }: any) => {
      console.log({ error: response });

      Alert.alert("Please try again", response?.data.message);
    },
  });

  const handleEdit = () => {
    console.log("Pressed the Edit button");
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Shortcut",
      `Are you sure you want to delete this automation?`,
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
    <Pressable style={({ pressed }) => pressedOpacity({ pressed })}>
      <View style={styles.nameContainer}>
        <CustomText style={styles.name}>{item.name}</CustomText>
        <IconView name={["chevron.right", "arrow-back"]} color="gray" />
      </View>

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
        <BlurView
          // experimentalBlurMethod="dimezisBlurView"
          style={styles.detailsContainer}
        >
          {item.steps.map((step, index) => (
            <CustomText key={index} style={styles.shortcutText}>
              ▶️ {step.shortcutName}
            </CustomText>
          ))}
        </BlurView>
      </ContextMenu>
    </View>
  );
}
