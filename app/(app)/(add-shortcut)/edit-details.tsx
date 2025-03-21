import { Text, useWindowDimensions, View } from "react-native";

export default function EditDetails() {
  const { width, height } = useWindowDimensions();

  return (
    <View
      style={{
        height: height / 2,
        width,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 18 }}>Work in progress!</Text>
    </View>
  );
}
