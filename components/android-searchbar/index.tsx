import { TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

export default function AndroidSearchBar() {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.flexGroup}>
          <Ionicons name="search" size={18} style={styles.icons} />
          <TextInput placeholder="Search" />
        </View>
        <View>
          <Ionicons name="mic" size={18} style={styles.icons} />
        </View>
      </View>
    </View>
  );
}
