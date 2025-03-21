import pressedOpacity from "@/utils/pressedOpacity";
import { CameraView, useCameraPermissions } from "expo-camera";
import { SymbolView } from "expo-symbols";
import { useEffect } from "react";
import { ActivityIndicator, Alert, Pressable } from "react-native";
import styles from "./styles";

export default function SelfieCamera() {
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    // Request camera permission from user
    requestPermission();
  }, [requestPermission]);

  if (!permission) {
    return <ActivityIndicator size="large" />;
  }

  if (!permission.granted) {
    return (
      <Pressable
        style={({ pressed }) => pressedOpacity({ pressed })}
        onPress={() =>
          Alert.alert(
            "Camera Permission Denied",
            "We need your permission to show the camera",
            [
              { text: "Retry", onPress: () => requestPermission() },
              { text: "Cancel", style: "cancel" },
            ],
          )
        }
      >
        <SymbolView
          name="exclamationmark.triangle.fill"
          size={60}
          tintColor={"red"}
        />
      </Pressable>
    );
  }

  return <CameraView style={styles.camera} />;
}
