import {
  Button,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import styles from "./styles";
import { SymbolView } from "expo-symbols";
import { Colors } from "@/assets/colors";
import pressedOpacity from "@/utils/pressedOpacity";
import { router } from "expo-router";
import { useState } from "react";
import CustomButton from "@/components/custom-button";
import FooterBottom from "@/components/footer-bottom";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(false);

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
            name="person.crop.circle"
            style={styles.headerImage}
            tintColor={Colors.PRIMARY}
          />
          <Text style={styles.headerText}>Your Account</Text>
          <Text style={styles.subHeaderText}>
            {isSignIn ? "Sign in with" : "Create"} an account to save your
            shortcuts and access a library of shortcuts made for PWDs
          </Text>
        </View>

        <View style={styles.inputContainer}>
          {isSignIn ? null : (
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Name"
              selectionColor={Colors.PRIMARY}
              style={styles.input}
              autoCapitalize="words"
            />
          )}
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email address"
            selectionColor={Colors.PRIMARY}
            style={styles.input}
            autoCapitalize="none"
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            selectionColor={Colors.PRIMARY}
            style={styles.input}
            secureTextEntry
          />
          <Button
            title={
              isSignIn ? "Don't have an account?" : "Already have an account?"
            }
            color={Colors.PRIMARY}
            onPress={() => {
              setIsSignIn((prev) => !prev);
              setName("");
            }}
          />
        </View>
      </ScrollView>

      <View style={styles.footerContainer}>
        <View style={styles.buttonContainer}>
          <CustomButton
            title={"Continue"}
            onPress={() =>
              router.push({
                pathname: "/submit-account",
                params: { name, email, password },
              })
            }
            disabled={!((isSignIn || name) && email && password)}
          />
        </View>
        <FooterBottom />
      </View>
    </View>
  );
}
