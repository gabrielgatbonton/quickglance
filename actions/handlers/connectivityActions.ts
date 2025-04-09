import * as Linking from "expo-linking";
import SystemSetting from "react-native-system-setting";

type ConnectivityInputs = {
  setEnabled: boolean; // Whether to turn the feature on (true) or off (false)
};

export const toggleWiFi = async (
  inputs?: ConnectivityInputs,
): Promise<boolean> => {
  try {
    const setEnabled = inputs?.setEnabled ?? true; // Default to enabling if not specified

    // Get current WiFi state
    const isWifiEnabled = await SystemSetting.isWifiEnabled();

    // Only change if current state doesn't match desired state
    if (isWifiEnabled !== setEnabled) {
      SystemSetting.switchWifi();
    }

    return true;
  } catch (error: any) {
    // If direct API fails, fall back to opening settings
    try {
      await Linking.openURL("App-Prefs:root=WIFI");
      return true;
    } catch {
      throw new Error(`Failed to set WiFi: ${error.message}`);
    }
  }
};

export const toggleBluetooth = async (
  inputs?: ConnectivityInputs,
): Promise<boolean> => {
  try {
    const setEnabled = inputs?.setEnabled ?? true; // Default to enabling if not specified

    // Get current Bluetooth state
    const isBluetoothEnabled = await SystemSetting.isBluetoothEnabled();

    // Only change if current state doesn't match desired state
    if (isBluetoothEnabled !== setEnabled) {
      SystemSetting.switchBluetooth();
    }

    return true;
  } catch (error: any) {
    // If direct API fails, fall back to opening settings
    try {
      await Linking.openURL("App-Prefs:root=Bluetooth");
      return true;
    } catch {
      throw new Error(`Failed to set Bluetooth: ${error.message}`);
    }
  }
};

export const toggleAirplaneMode = async (
  inputs?: ConnectivityInputs,
): Promise<boolean> => {
  try {
    const setEnabled = inputs?.setEnabled ?? true; // Default to enabling if not specified

    // Get current Airplane Mode state
    const isAirplaneModeEnabled = await SystemSetting.isAirplaneEnabled();

    // Only change if current state doesn't match desired state
    if (isAirplaneModeEnabled !== setEnabled) {
      SystemSetting.switchAirplane();
    }

    return true;
  } catch (error: any) {
    // If direct API fails, fall back to opening settings
    try {
      await Linking.openURL("App-Prefs:root=AIRPLANE_MODE");
      return true;
    } catch {
      throw new Error(`Failed to set Airplane Mode: ${error.message}`);
    }
  }
};
