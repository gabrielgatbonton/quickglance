import pressedOpacity from "@/utils/pressedOpacity";
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pressable, StyleProp, TextInput, TextStyle, View } from "react-native";
import { SymbolView } from "expo-symbols";
import { Colors } from "@/assets/colors";
import { PickerItem } from "@/constants/types";
import styles from "./styles";
import PickerSheetItem from "../picker-sheet-item";

export type PickerSheetProps = {
  placeholder?: string;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  data: PickerItem[];
  value: any;
  onSelected: (value: any) => void;
  disabled?: boolean;
  color?: string;
  searchEnabled?: boolean;
};

export default function PickerSheet({
  placeholder,
  data,
  value,
  onSelected,
  disabled,
  color = Colors.PRIMARY,
  labelStyle,
  searchEnabled,
}: PickerSheetProps) {
  const [search, setSearch] = useState("");

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const flatListRef = useRef<BottomSheetFlatListMethods>(null);

  useEffect(() => {
    // Reset search on mount
    setSearch("");
  }, []);

  const currentData = useMemo(() => {
    const trimmedSearch = search.toLowerCase().trim();

    // Filter data based on search input (also resets data if search is empty)
    const filtered = data.filter((item) =>
      item.label?.toLowerCase().includes(trimmedSearch),
    );

    // Sort to put selected item at the top
    return filtered.sort((a, b) => {
      if (a.value === value) return -1;
      if (b.value === value) return 1;
      return 0;
    });
  }, [data, search, value]);

  const onOptionPress = useCallback(
    (option: string) => {
      onSelected(option === value ? null : option);

      bottomSheetModalRef.current?.dismiss();
    },
    [onSelected, value],
  );

  const renderItem = useCallback(
    ({ item }: { item: PickerItem }) => (
      <PickerSheetItem
        item={item}
        isSelected={item.value === value}
        selectedColor={color}
        onOptionPress={() => onOptionPress?.(item.value)}
        labelStyle={labelStyle}
      />
    ),
    [color, labelStyle, onOptionPress, value],
  );

  return (
    <>
      <Pressable
        onPress={() => {
          bottomSheetModalRef.current?.present();
        }}
        style={({ pressed }) => pressedOpacity({ pressed })}
        disabled={disabled}
      >
        <View pointerEvents="none" style={styles.inputContainer}>
          <TextInput
            placeholder={placeholder}
            value={data?.find((item) => item.value === value)?.label}
            onChangeText={(destination) => onSelected(destination)}
          />
          <SymbolView
            name="chevron.down"
            size={18}
            tintColor={color}
            weight="bold"
          />
        </View>
      </Pressable>

      <BottomSheetModal
        snapPoints={["50%", "99%"]}
        enableDynamicSizing={false}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            opacity={0.3}
            disappearsOnIndex={-1}
          />
        )}
        keyboardBehavior="extend"
        ref={bottomSheetModalRef}
      >
        {searchEnabled && (
          <BottomSheetView style={styles.searchContainer}>
            <SymbolView
              name="magnifyingglass"
              size={20}
              tintColor={color}
              weight="bold"
            />
            <BottomSheetTextInput
              defaultValue={search}
              onChangeText={(text) => setSearch(text)}
              placeholder="Search"
              style={styles.searchInput}
              clearButtonMode="always"
            />
          </BottomSheetView>
        )}

        <BottomSheetFlatList
          ref={flatListRef}
          data={currentData}
          keyExtractor={(item) => item.value}
          contentContainerStyle={styles.contentContainer}
          renderItem={renderItem}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
        />
      </BottomSheetModal>
    </>
  );
}
