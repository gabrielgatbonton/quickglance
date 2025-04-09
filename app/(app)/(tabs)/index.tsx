import useAuthStore from "@/stores/useAuthStore";
import { Redirect } from "expo-router";
import { ImageBackground, StyleSheet } from "react-native";

export default function TabIndex() {
  const token = useAuthStore((state) => state.token);

  if (token) {
    return <Redirect href="/(home)" />;
  }

  return (
    <ImageBackground
      source={{ uri: "mesh-gradient" }}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    aspectRatio: 1,
    width: "50%",
  },
});
