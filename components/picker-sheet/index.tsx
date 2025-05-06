import pressedOpacity from "@/utils/pressedOpacity";
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const [currentIndex, setCurrentIndex] = useState(0);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const flatListRef = useRef<BottomSheetFlatListMethods>(null);

  useEffect(() => {
    // Set initial index
    if (data.length > 0 && value) {
      const index = data.findIndex((item) => item.value === value);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, [data, value]);

  const onOptionPress = useCallback(
    (option: string, index: number) => {
      onSelected(option === value ? null : option);
      setCurrentIndex(index);

      bottomSheetModalRef.current?.dismiss();
    },
    [onSelected, value],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: PickerItem; index: number }) => (
      <PickerSheetItem
        item={item}
        isSelected={item.value === value}
        selectedColor={color}
        onOptionPress={() => onOptionPress?.(item.value, index)}
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
          data={data.filter((item) =>
            item.label?.toLowerCase().includes(search.toLowerCase().trim()),
          )}
          initialScrollIndex={currentIndex}
          onScrollToIndexFailed={({ highestMeasuredFrameIndex }) =>
            flatListRef.current?.scrollToIndex({
              index: highestMeasuredFrameIndex,
            })
          }
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
