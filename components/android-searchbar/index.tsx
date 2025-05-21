import { StyleProp, TextInput, View, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

type AndroidSearchBarProps = {
  onSearch: (text: string) => void;
  style?: StyleProp<ViewStyle>;
};

export default function AndroidSearchBar({
  onSearch,
  style,
}: AndroidSearchBarProps) {
  return (
    <View style={style}>
      <View style={styles.inputContainer}>
        <View style={styles.flexGroup}>
          <Ionicons name="search" size={18} style={styles.icons} />
          <TextInput
            placeholder="Search"
            onChangeText={(text) => onSearch(text)}
            style={styles.textInput}
          />
        </View>
        <View>
          <Ionicons name="mic" size={18} style={styles.icons} />
        </View>
      </View>
    </View>
  );
}
