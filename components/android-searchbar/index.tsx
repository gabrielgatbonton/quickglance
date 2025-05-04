import { TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

type AndroidSearchBarProps = {
  onSearch: (text: string) => void;
};

export default function AndroidSearchBar({ onSearch }: AndroidSearchBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.flexGroup}>
          <Ionicons name="search" size={18} style={styles.icons} />
          <TextInput
            placeholder="Search"
            onChangeText={(text) => onSearch(text)}
          />
        </View>
        <View>
          <Ionicons name="mic" size={18} style={styles.icons} />
        </View>
      </View>
    </View>
  );
}
