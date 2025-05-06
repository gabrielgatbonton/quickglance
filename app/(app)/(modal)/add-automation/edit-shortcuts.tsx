import CustomText from "@/components/custom-text";
import OrderShortcutItem from "@/components/order-shortcut-item";
import { getUserShortcuts } from "@/services/apiService";
import { useQuery } from "@tanstack/react-query";
import { useLayoutEffect } from "react";
import { Alert, FlatList, Pressable, View } from "react-native";
import styles from "./styles";
import { router, useNavigation } from "expo-router";
import CustomLink from "@/components/custom-link";
import { Colors } from "@/assets/colors";
import { OrderData } from "@/constants/types";
import useAddAutomationStore, {
  AddAutomationActions,
  AddAutomationState,
} from "@/stores/useAddAutomationStore";
import { useShallow } from "zustand/react/shallow";
import { SymbolView } from "expo-symbols";
import pressedOpacity from "@/utils/pressedOpacity";
import { orderKeysToArr } from "@/utils/shortcutConverter";

export default function EditShortcuts() {
  const { event, orderData, setOrderData, resetAll } = useAddAutomationStore<
    Pick<AddAutomationState, "event" | "orderData"> &
      Pick<AddAutomationActions, "setOrderData" | "resetAll">
  >(
    useShallow((state) => ({
      event: state.event,
      orderData: state.orderData,
      setOrderData: state.setOrderData,
      resetAll: state.resetAll,
    })),
  );

  const { data: userShortcuts } = useQuery({
    queryKey: ["shortcuts", "user"],
    queryFn: getUserShortcuts,
  });
  const navigation = useNavigation();

  const toggleShortcut = (id: string) => {
    const keys = orderData[id]
      ? Object.keys(orderData).filter((key) => key !== id)
      : [...Object.keys(orderData), id];

    const newData = keys.reduce((acc, key, index) => {
      acc[key] = index + 1;
      return acc;
    }, {} as OrderData);

    setOrderData(newData);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomLink
          title="Done"
          onPress={() => {
            Alert.alert("Automation", "Shortcuts saved successfully!", [
              { text: "OK" },
            ]);
            console.log({ event, orderData: orderKeysToArr(orderData) });

            resetAll();
            router.dismissAll();
            router.back();
          }}
          color={Colors.PRIMARY}
          disabled={Object.keys(orderData).length === 0}
          bold
        />
      ),
    });
  }, [event, navigation, orderData, resetAll]);

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
