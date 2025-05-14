import CustomText from "@/components/custom-text";
import OrderShortcutItem from "@/components/order-shortcut-item";
import { getUserShortcuts, saveAutomation } from "@/services/apiService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLayoutEffect } from "react";
import { ActivityIndicator, FlatList, Pressable, View } from "react-native";
import styles from "./styles";
import { router, useNavigation } from "expo-router";
import CustomLink from "@/components/custom-link";
import { Colors } from "@/assets/colors";
import { AutomationCondition, OrderData } from "@/constants/types";
import useAddAutomationStore, {
  AddAutomationActions,
  AddAutomationState,
} from "@/stores/useAddAutomationStore";
import { useShallow } from "zustand/react/shallow";
import { SymbolView } from "expo-symbols";
import pressedOpacity from "@/utils/pressedOpacity";
import { orderKeysToArr } from "@/utils/shortcutConverter";

export default function EditShortcuts() {
  const { condition, orderData, setOrderData } = useAddAutomationStore<
    Pick<AddAutomationState, "condition" | "orderData"> &
      Pick<AddAutomationActions, "setOrderData">
  >(
    useShallow((state) => ({
      condition: state.condition,
      orderData: state.orderData,
      setOrderData: state.setOrderData,
    })),
  );
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const { data: userShortcuts } = useQuery({
    queryKey: ["shortcuts", "user"],
    queryFn: getUserShortcuts,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["addAutomation"],
    mutationFn: saveAutomation,
    onSuccess: async (data) => {
      console.log(data);

      await queryClient.invalidateQueries({
        queryKey: ["automations", "user"],
      });

      router.dismissAll();
      router.back();
    },
  });

  const toggleShortcut = (id: string) => {
    // If the shortcut is already ordered, remove it from the order data
    const keys = orderData[id]
      ? Object.keys(orderData).filter((key) => key !== id)
      : [...Object.keys(orderData), id];

    // If the shortcut is not selected, add it to the order data
    const newData = keys.reduce((acc, key, index) => {
      acc[key] = index + 1;
      return acc;
    }, {} as OrderData);

    setOrderData(newData);
  };

  const getAutomationTitle = (condition: AutomationCondition) => {
    let title = "";
    const conditionName = condition.name.toLowerCase();

    switch (condition.type) {
      case "emotion":
        title = `When the user is ${conditionName} ${condition.emoji}`;
        break;
      case "time":
        title = `When the time is ${conditionName} ${condition.emoji}`;
        break;
      case "device":
        title = `When the device is ${conditionName} ${condition.emoji}`;
        break;
      case "location":
        title = `When the user is at ${conditionName} ${condition.emoji}`;
        break;
      default:
        title = `When the condition is ${conditionName} ${condition.emoji}`;
    }
    return title;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        isPending ? (
          <ActivityIndicator />
        ) : (
          <CustomLink
            title="Done"
            onPress={() => {
              console.log({ condition, orderData: orderKeysToArr(orderData) });

              if (!condition) {
                console.log("No condition selected");
                return;
              }

              mutate({
                title: getAutomationTitle(condition),
                automationConditionId: condition.id,
                shortcuts: orderKeysToArr(orderData),
              });
            }}
            color={Colors.PRIMARY}
            disabled={Object.keys(orderData).length === 0}
            bold
          />
        ),
    });
  }, [condition, isPending, mutate, navigation, orderData]);

  return (
    <View style={styles.container}>
      <View style={styles.headerTitleContainer}>
        <CustomText style={styles.title}>
          Select which shortcut/s to run
        </CustomText>

        <Pressable
          style={({ pressed }) => [
            pressedOpacity({ pressed }),
            pressed && styles.resetButtonPressed,
          ]}
          onPress={() => setOrderData({})}
        >
          <SymbolView
            name="arrow.clockwise"
            size={22}
            tintColor={Colors.PRIMARY}
          />
        </Pressable>
      </View>

      <FlatList
        data={userShortcuts}
        renderItem={({ item }) => (
          <OrderShortcutItem
            item={item}
            index={orderData[item.id]}
            onShortcutPress={() => toggleShortcut(item.id)}
          />
        )}
        contentContainerStyle={styles.shortcutsContainer}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
