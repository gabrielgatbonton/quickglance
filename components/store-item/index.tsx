import pressedOpacity from "@/utils/pressedOpacity";
import { Pressable, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SymbolView } from "expo-symbols";
import styles from "./styles";
import globalStyles from "@/assets/global-styles";
import { Shortcut } from "@/constants/types";
import ContextMenu from "react-native-context-menu-view";
import { SAMPLE_SERVICES } from "@/constants/sampleServices";
import CustomText from "../custom-text";
import { router } from "expo-router";

export default function StoreItem({ item }: { item: Shortcut }) {
  const owner =
    item.userName ||
    SAMPLE_SERVICES.find((sampleService) => sampleService.id === item.serviceId)
      ?.name;

  return (
    <Pressable
      style={({ pressed }) => pressedOpacity({ pressed, opacity: 0.6 })}
      onPress={() => router.navigate(`/install-shortcut/${item.id}`)}
    >
      <ContextMenu
        actions={[
          {
            title: "Download Shortcut",
            systemIcon: "square.and.arrow.down",
            subtitle: item.name,
          },

          ...(item.userName || item.serviceId
            ? [
                {
                  title: `By: ${owner}`,
                  disabled: true,
                },
              ]
            : []),
        ]}
        onPress={(e) => {
          console.warn(
            `Pressed ${e.nativeEvent.name} at index ${e.nativeEvent.index}`,
          );
        }}
      >
        <LinearGradient
          colors={[item.gradientStart, item.gradientEnd]}
          style={styles.contentContainer}
        >
          <View style={globalStyles.rowBetween}>
            <SymbolView name={item.icon} size={30} tintColor="white" />

            <Pressable
              style={({ pressed }) => [
                globalStyles.transparentButton,
                pressedOpacity({ pressed }),
              ]}
            >
              <SymbolView
                name="square.and.arrow.down"
                size={25}
                tintColor="white"
                resizeMode="top"
                scale="large"
                weight="bold"
              />
            </Pressable>
          </View>

          <View style={styles.detailsContainer}>
            <CustomText style={styles.name}>{item.name}</CustomText>
            <CustomText style={styles.description} numberOfLines={3}>
              {item.description}
            </CustomText>
          </View>
        </LinearGradient>
      </ContextMenu>
    </Pressable>
  );
}
