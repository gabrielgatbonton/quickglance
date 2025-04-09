import * as Linking from "expo-linking";
import * as Clipboard from "expo-clipboard";
import SystemSetting from "react-native-system-setting";

type CallNumberInputs = {
  phoneNumber: string;
};

type SendMessageInputs = {
  recipient: string;
  message: string;
};

type OpenAppInputs = {
  appName: string;
};

type SetBrightnessInputs = {
  brightnessLevel: number;
};

type CopyToClipboardInputs = {
  text: string;
};

export const callNumber = async (inputs?: CallNumberInputs): Promise<true> => {
  if (!inputs?.phoneNumber) {
    throw new Error("Phone number is required");
  }

  const { phoneNumber } = inputs || {};

  try {
    // Format the phone number to ensure it works with the tel: protocol
    const formattedNumber = phoneNumber
      .replace(/\s+/g, "")
      .replace(/[()-]/g, "");
    const url = `tel:${formattedNumber}`;

    // Check if the device can handle the URL
    const supported = await Linking.canOpenURL(url);

    if (!supported) {
      throw new Error("Device cannot make phone calls");
    }

    return await Linking.openURL(url);
  } catch (error: any) {
    throw new Error(`Failed to make call: ${error.message}`);
  }
};

export const sendMessage = async (
  inputs?: SendMessageInputs,
): Promise<true> => {
  if (!inputs?.recipient) {
    throw new Error("Recipient is required");
  }

  if (!inputs?.message) {
    throw new Error("Message is required");
  }

  const { recipient, message } = inputs || {};

  try {
    // Format the recipient number to ensure it works with the sms: protocol
    const formattedRecipient = recipient
      .replace(/\s+/g, "")
      .replace(/[()-]/g, "");

    // Encode the message for the URL
    const encodedMessage = encodeURIComponent(message);

    // Create the URL for the Messages app
    const url = `sms:${formattedRecipient}&body=${encodedMessage}`;

    // Check if the device can handle the URL
    const supported = await Linking.canOpenURL(url);

    if (!supported) {
      throw new Error("Device cannot send messages");
    }

    return await Linking.openURL(url);
  } catch (error: any) {
    throw new Error(`Failed to send message: ${error.message}`);
  }
};

export const openApp = async (inputs?: OpenAppInputs): Promise<true> => {
  if (!inputs?.appName) {
    throw new Error("App name is required");
  }

  const { appName } = inputs || {};

  try {
    // Map of common app names to their URL schemes
    const appSchemes: Record<string, string> = {
      Safari: "safari://",
      Maps: "maps://",
      Phone: "tel://",
      Messages: "sms://",
      Mail: "mailto://",
      Settings: "app-settings://",
      Calendar: "calshow://",
      Notes: "mobilenotes://",
      Photos: "photos-redirect://",
      Camera: "camera://",
      Music: "music://",
      "App Store": "itms-apps://",
      Health: "x-apple-health://",
      Wallet: "shoebox://",
      Facebook: "fb://",
      Instagram: "instagram://",
      Twitter: "twitter://",
      LinkedIn: "linkedin://",
      YouTube: "youtube://",
      WhatsApp: "whatsapp://",
      Telegram: "telegram://",
      Slack: "slack://",
      Spotify: "spotify://",
      Netflix: "netflix://",
    };

    // Get the URL scheme for the app
    const appScheme = appSchemes[appName];

    if (!appScheme) {
      throw new Error(`App scheme not found for: ${appName}`);
    }

    // Check if the app is installed
    const supported = await Linking.canOpenURL(appScheme);

    if (!supported) {
      throw new Error(`App not installed: ${appName}`);
    }

    return await Linking.openURL(appScheme);
  } catch (error: any) {
    throw new Error(`Failed to open app: ${error.message}`);
  }
};

export const setBrightness = async (
  inputs?: SetBrightnessInputs,
): Promise<boolean> => {
  if (!inputs?.brightnessLevel) {
    throw new Error("Brightness level is required");
  }

  const { brightnessLevel } = inputs || {};

  try {
    // Convert percentage (0-100) to a value between 0 and 1
    const normalizedBrightness = brightnessLevel / 100;

    // Set the brightness using react-native-system-setting
    await SystemSetting.setBrightnessForce(normalizedBrightness);
    return true;
  } catch (error: any) {
    throw new Error(`Failed to set brightness: ${error.message}`);
  }
};

export const copyToClipboard = async (
  inputs?: CopyToClipboardInputs,
): Promise<boolean> => {
  if (!inputs?.text) {
    throw new Error("Text is required");
  }

  const { text } = inputs || {};

  try {
    // Copy the text to the clipboard
    await Clipboard.setStringAsync(text);
    return true;
  } catch (error: any) {
    throw new Error(`Failed to copy to clipboard: ${error.message}`);
  }
};
