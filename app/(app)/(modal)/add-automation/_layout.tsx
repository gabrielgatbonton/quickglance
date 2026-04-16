import { Colors } from "@/assets/colors";
import CustomHeader from "@/components/custom-header";
import CustomLink from "@/components/custom-link";
import { DEFAULT_FONT_FAMILY } from "@/components/custom-text/styles";
import useAddAutomationStore from "@/stores/useAddAutomationStore";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export default function AddAutomationLayout() {
  const { resetAll, selectedCondition } = useAddAutomationStore(
    useShallow((state) => ({
      resetAll: state.resetAll,
      selectedCondition: state.condition,
    })),
  );

  // Reset the store when the component unmounts
  useEffect(() => {
    return () => {
      resetAll();
    };
  }, [resetAll]);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => (
            <CustomHeader
              headerTitle="Add Automation"
              leftIcon={{
                icons: ["chevron.right", "close-outline"],
                iconFunction: () => router.back(),
              }}
              rightIcon={{
                icons: ["arrow.right", "arrow-forward"],
                iconFunction: () =>
                  router.navigate("/add-automation/edit-shortcuts"),
                disabled: !selectedCondition,
              }}
            />
          ),
        }}
      />
      <Stack.Screen name="edit-shortcuts" options={{ headerShown: true, }} />
    </Stack>
  );
}
