import { FlatList } from "react-native";
import Animated, { Easing, FadeOut, ZoomIn } from "react-native-reanimated";
import ShortcutItem from "../shortcut-item";
import styles from "./styles";
import { Shortcut } from "@/constants/types";

type ShortcutPagesProps = {
  pageIndex: number;
  focusedShortcut: Shortcut | null;
  activeColumn: number | null;
  shortcuts: Shortcut[] | null;
  shortcutsPerPage: number;
  shortcutsPerRow: number;
  isStarted: boolean;
};

export default function ShortcutPage({
  pageIndex,
  focusedShortcut,
  activeColumn,
  shortcuts,
  shortcutsPerPage,
  shortcutsPerRow,
  isStarted,
}: ShortcutPagesProps) {
  const pageShortcuts = shortcuts?.slice(
    pageIndex * shortcutsPerPage,
    (pageIndex + 1) * shortcutsPerPage,
  );

  return (
    <FlatList
      data={pageShortcuts}
      renderItem={({ item, index }) => (
        <Animated.View
          entering={ZoomIn.duration(350)
            .easing(Easing.out(Easing.exp))
            .delay(index * 100)}
          exiting={FadeOut.duration(500).easing(Easing.out(Easing.exp))}
        >
          <ShortcutItem
            item={item}
            isStarted={isStarted}
            isItemFocused={focusedShortcut?.id === item.id}
            isColumnSelected={activeColumn === index % shortcutsPerRow}
          />
        </Animated.View>
      )}
      keyExtractor={(item) => item.id}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.contentContainer}
      numColumns={shortcutsPerRow}
      scrollEnabled={false}
    />
  );
}
