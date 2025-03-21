import { Pressable, Text, TouchableOpacity, View } from "react-native";
import {
  DragDropContentView,
  DragDropContentViewProps,
  DropAsset,
} from "expo-drag-drop-content-view";
import { useRef, useState } from "react";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { SymbolView } from "expo-symbols";
import pressedOpacity from "@/utils/pressedOpacity";
import { SAMPLE_CATEGORIES } from "@/utils/sampleCategories";
import AddShortcutItem from "@/components/add-shortcut-item";
import styles from "./styles";
import ShortcutCategoryItem from "@/components/shortcut-category-item";

export default function AddShortcut() {
  const [sources, setSources] = useState<DropAsset[] | null>(null);

  const flatListRef = useRef(null);

  const draggableSources: DragDropContentViewProps["draggableSources"] = sources
    ? sources
        .filter((source) => source.text)
        .map((source) => ({ type: "text", value: source.text || "" }))
    : [];

  return (
    <View style={styles.container}>
      <DragDropContentView
        draggableSources={draggableSources}
        style={styles.dragDropView}
        onDrop={(event) => console.log({ event })}
      >
        {sources ? (
          sources.map((source, index) => (
            <AddShortcutItem
              index={index}
              onPress={() => setSources(null)}
              text={source.text || ""}
            />
          ))
        ) : (
          <TouchableOpacity style={styles.dropContainer}>
            <Text style={styles.dropText}>Drop a shortcut here!</Text>
          </TouchableOpacity>
        )}
      </DragDropContentView>

      <BottomSheet snapPoints={["35%"]} enableDynamicSizing={false}>
        <BottomSheetView style={styles.sheetHeaderContainer}>
          <Pressable style={({ pressed }) => pressedOpacity({ pressed })}>
            <SymbolView
              name="arrow.backward.circle"
              tintColor="lightgray"
              size={40}
            />
          </Pressable>
          <Text style={styles.sheetHeaderTitle}>Select a category</Text>
          <Pressable style={({ pressed }) => pressedOpacity({ pressed })}>
            <SymbolView
              name="arrow.right.circle"
              tintColor="lightgray"
              size={40}
            />
          </Pressable>
        </BottomSheetView>

        <BottomSheetFlatList
          ref={flatListRef}
          data={SAMPLE_CATEGORIES}
          renderItem={({ item }) => <ShortcutCategoryItem item={item} />}
          contentContainerStyle={styles.contentContainer}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </BottomSheet>
    </View>
  );
}
