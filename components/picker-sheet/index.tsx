import pressedOpacity from "@/utils/pressedOpacity";
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useCallback, useRef, useState } from "react";
import { Pressable, StyleProp, TextInput, TextStyle, View } from "react-native";
import CustomText from "../custom-text";
import { SymbolView } from "expo-symbols";
import { Colors } from "@/assets/colors";
import { PickerItem } from "@/constants/types";
import styles from "./styles";

export type PickerSheetProps = {
  placeholder?: string;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  data: PickerItem[];
  value: any;
  onSelected: (value: any) => void;
  disabled?: boolean;
  searchEnabled?: boolean;
};

export default function PickerSheet({
  placeholder,
  data,
  value,
  onSelected,
  disabled,
  labelStyle,
  searchEnabled,
}: PickerSheetProps) {
  const [search, setSearch] = useState("");

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const onOptionPress = useCallback(
    (option: string) => {
      onSelected(option === value ? null : option);
      bottomSheetModalRef.current?.dismiss();
    },
    [onSelected, value],
  );

  const renderItem = useCallback(
    ({ item }: { item: PickerItem }) => {
      return (
        <Pressable
          onPress={() => onOptionPress(item.value)}
          style={({ pressed }) => [
            pressedOpacity({ pressed }),
            styles.itemContainer,
          ]}
        >
          {item.label && (
            <CustomText
              style={[
                labelStyle,
                styles.itemLabel,
                {
                  color: item.value === value ? Colors.PRIMARY : "",
                },
              ]}
            >
              {item.label}
            </CustomText>
          )}

          {item.ItemComponent
            ? item.ItemComponent(item)
            : item.value === value && (
                <SymbolView
                  name="checkmark"
                  size={20}
                  tintColor={Colors.PRIMARY}
                  weight="bold"
                />
              )}
        </Pressable>
      );
    },
    [labelStyle, onOptionPress, value],
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
            tintColor={Colors.PRIMARY}
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
              tintColor={Colors.PRIMARY}
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
          data={data.filter((item) =>
            item.label?.toLowerCase().includes(search.toLowerCase().trim()),
          )}
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
