import { Pressable, View } from "react-native";
import { Divider, Modal, Portal } from "react-native-paper";
import CustomText from "../custom-text";
import IconView from "../icon-view";
import { Colors } from "@/assets/colors";
import styles from "./style";

type AndroidModalProps<T> = {
  title: string;
  handleCloseModal: () => void;
  isOpened: boolean;
  children: React.ReactNode;
};

export default function AndroidModal<T>({
  title,
  isOpened,
  handleCloseModal,
  children,
}: AndroidModalProps<T>) {
  return (
    <>
      {isOpened && (
        <Portal>
          <Modal
            visible={isOpened}
            contentContainerStyle={styles.modalContainer}
            dismissable
          >
            <View style={styles.modalHeader}>
              <CustomText style={{ fontSize: 18 }}>{title}</CustomText>
              <Pressable
                onPress={() => {
                  handleCloseModal();
                }}
              >
                <IconView name={["", "close"]} color={Colors.PRIMARY} />
              </Pressable>
            </View>
            <Divider style={styles.divider} />
            {children}
          </Modal>
        </Portal>
      )}
    </>
  );
}
