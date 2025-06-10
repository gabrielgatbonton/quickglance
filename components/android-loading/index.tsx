import { Colors } from "@/assets/colors";
import { ActivityIndicator } from "react-native";

export default function AndroidLoading() {
    return (
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
    )
}