import SelfieCamera from "@/components/selfie-camera";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CameraTest() {
  const [result, setResult] = useState<any>(null);
  const [turnDirection, setTurnDirection] = useState<any>(null);
  const [nodDirection, setNodDirection] = useState<any>(null);

  return (
    <View style={styles.container}>
      <SelfieCamera
        size={400}
        onFaceDetected={setResult}
        onFaceTurn={(angle, direction) => {
          setTurnDirection({ angle, direction });
        }}
        onFaceNod={(angle, direction) => {
          setNodDirection({ angle, direction });
        }}
      />
      <Text style={styles.result}>{JSON.stringify(result)}</Text>
      <View style={styles.contentContainer}>
        <Text>Turn Direction: {JSON.stringify(turnDirection)}</Text>
        <Text>Nod Direction: {JSON.stringify(nodDirection)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-around",
  },
  contentContainer: {
    rowGap: 10,
  },
  result: {
    fontSize: 14,
    fontWeight: "500",
  },
});
