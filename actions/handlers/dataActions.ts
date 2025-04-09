import * as Clipboard from "expo-clipboard";
import * as Battery from "expo-battery";
import * as MediaLibrary from "expo-media-library";
import RNQRGenerator from "rn-qr-generator";

type SetClipboardInputs = {
  text: string;
};

type GenerateQRCodeInputs = {
  content: string;
};

export const getClipboard = async (): Promise<string> => {
  try {
    const text = await Clipboard.getStringAsync();
    if (!text) {
      return "";
    }

    return text;
  } catch (error: any) {
    throw new Error(`Failed to get clipboard: ${error.message}`);
  }
};

export const setClipboard = async (
  inputs?: SetClipboardInputs,
): Promise<boolean> => {
  if (!inputs?.text) {
    throw new Error("Text is required");
  }

  const { text } = inputs || {};

  try {
    await Clipboard.setStringAsync(text);
    return true;
  } catch (error: any) {
    throw new Error(`Failed to set clipboard: ${error.message}`);
  }
};

export const getBatteryLevel = async (): Promise<number> => {
  try {
    const batteryLevel = await Battery.getBatteryLevelAsync();

    // Convert from 0-1 to percentage
    return Math.round(batteryLevel * 100);
  } catch (error: any) {
    throw new Error(`Failed to get battery level: ${error.message}`);
  }
};

export const generateQRCode = async (
  inputs?: GenerateQRCodeInputs,
): Promise<string> => {
  if (!inputs?.content) {
    throw new Error("Content is required");
  }

  const { content } = inputs || {};

  try {
    const response = await RNQRGenerator.generate({
      value: content,
      height: 300,
      width: 300,
      correctionLevel: "H",
    });

    if (!response.uri) {
      throw new Error("Failed to generate QR code");
    }

    // Save QR code to camera roll
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Permission to save QR code was denied");
    }

    const asset = await MediaLibrary.createAssetAsync(response.uri);
    return asset.uri;
  } catch (error: any) {
    throw new Error(`Failed to generate QR code: ${error.message}`);
  }
};
