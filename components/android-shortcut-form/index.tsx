import { View } from "react-native";
import styles from "./styles";
import AndroidSelectInput from "../android-select-input";
import AndroidTextInput from "../android-text-input";
import CustomText from "../custom-text";
import { Switch } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import IconView, { IoniconName } from "../icon-view";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/assets/colors";

type AndroidShortcutFormProps = {
  handleShortcutDetails: (item: object) => void;
  children: React.ReactNode;
  gradientStart: string;
  gradientEnd: string;
};

export default function AndroidShortcutForm({
  handleShortcutDetails,
  children,
  gradientStart,
  gradientEnd,
}: AndroidShortcutFormProps) {
  const [icon, setIcon] = useState<IoniconName>("");
  const [isToggled, setToggle] = useState(false);
  const ioniconList = Object.keys(Ionicons.glyphMap);

  const handleSelectedIcon = (selectedIcon: string) => {
    if (ioniconList.includes(selectedIcon)) {
      setIcon(selectedIcon as IoniconName);
    }
  };

  const handleToggle = () => {
    let status = null;
    isToggled ? (status = false) : (status = true);
    setToggle(status);
    handleShortcutDetails({ isUpload: status });
  };

  return (
    <>
      <View style={styles.iconContainer}>
        <LinearGradient
          colors={[gradientStart, gradientEnd]}
          style={styles.linearGradient}
        >
          <IconView
            name={["", icon ? icon : "help"]}
            color="white"
            size={100}
            buttonStyle={styles.icon}
          />
        </LinearGradient>
      </View>

      <AndroidTextInput
        label="Name"
        handleUserInput={(value) => handleShortcutDetails({ name: value })}
      />

      <AndroidSelectInput
        title="Select an icon"
        label="Shortcut Icon"
        data={ioniconList}
        handleSelectItem={(value) => {
          handleSelectedIcon(value);
          handleShortcutDetails({ androidIcon: value });
        }}
        value={icon}
      />

      <AndroidTextInput
        label="Description"
        handleUserInput={(value) =>
          handleShortcutDetails({ description: value })
        }
      />

      {children}

      <View style={styles.noteContainer}>
        <View>
          <CustomText style={styles.noteHeader}>Save To Gallery?</CustomText>
          <CustomText style={styles.noteText}>
            By uploading to the shortcut gallery, you agree to share your works
            with others.
          </CustomText>
        </View>

        <Switch onValueChange={() => handleToggle()} value={isToggled} color={Colors.PRIMARY} />
      </View>
    </>
  );
}
