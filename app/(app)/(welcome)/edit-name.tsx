import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import styles from "./styles";
import { SymbolView } from "expo-symbols";
import { Colors } from "@/assets/colors";
import pressedOpacity from "@/utils/pressedOpacity";
import { router } from "expo-router";

export default function EditName() {
  return (
    <View style={styles.container}>
      <View style={styles.backContainer}>
        <Pressable
          style={({ pressed }) => pressedOpacity({ pressed })}
          onPress={() => router.back()}
        >
          <SymbolView
            name="chevron.backward"
            size={25}
            tintColor={Colors.PRIMARY}
            weight="semibold"
          />
        </Pressable>
      </View>

      <ScrollView>
        <View style={styles.headerContainer}>
          <SymbolView
            name="pencil.and.list.clipboard"
            style={styles.headerImage}
            tintColor={Colors.PRIMARY}
          />
          <Text style={styles.headerText}>Edit Public Name</Text>
          <Text style={styles.subHeaderText}>
            This will help you identify with your uploaded shortcuts
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter public name here (Optional)"
            selectionColor={Colors.PRIMARY}
            style={styles.input}
          />
          <Text style={styles.hint}>
            Your name will be stored securely on the cloud.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
