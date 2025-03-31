import {
  NativeSyntheticEvent,
  Platform,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
} from "react-native";
import { forwardRef, useCallback, useEffect } from "react";
import { useBottomSheetInternal } from "@gorhom/bottom-sheet";
import styles from "../custom-text-input/styles";

export type CustomTextInputProps = TextInputProps & {
  label: string;
};

export default forwardRef<TextInput, CustomTextInputProps>(
  function CustomTextInputSheet(
    { label, value, onChangeText, onFocus, onBlur, ...textInputProps },
    ref,
  ) {
    const { shouldHandleKeyboardEvents } = useBottomSheetInternal();

    useEffect(() => {
      return () => {
        if (Platform.OS === "ios") {
          // Reset the flag on unmount
          shouldHandleKeyboardEvents.value = false;
        }
      };
    }, [shouldHandleKeyboardEvents]);

    const handleOnFocus = useCallback(
      (args?: NativeSyntheticEvent<TextInputFocusEventData>) => {
        if (Platform.OS === "ios") {
          shouldHandleKeyboardEvents.value = true;
        }
        if (onFocus && args) {
          onFocus(args);
        }
      },
      [onFocus, shouldHandleKeyboardEvents],
    );

    const handleOnBlur = useCallback(
      (args?: NativeSyntheticEvent<TextInputFocusEventData>) => {
        if (Platform.OS === "ios") {
          shouldHandleKeyboardEvents.value = false;
        }
        if (onChangeText && value) {
          onChangeText(value);
        }
        if (onBlur && args) {
          onBlur(args);
        }
      },
      [onBlur, onChangeText, shouldHandleKeyboardEvents, value],
    );

    return (
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            ref={ref}
            value={value}
            onChangeText={onChangeText}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            {...textInputProps}
          />
        </View>
      </View>
    );
  },
);
