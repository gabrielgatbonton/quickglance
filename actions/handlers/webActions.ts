import * as Linking from "expo-linking";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";

type OpenURLInputs = {
  url: string;
};

type FetchWebContentInputs = {
  url: string;
};

type ShareViaInputs = {
  content: string;
  app?: string;
};

type PostToSocialMediaInputs = {
  platform: string;
  content: string;
  media?: string;
};

export const openURL = async (inputs?: OpenURLInputs): Promise<true> => {
  if (!inputs?.url) {
    throw new Error("URL is required");
  }

  const { url } = inputs;

  try {
    // Make sure URL has protocol
    let formattedUrl = url;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      formattedUrl = `https://${url}`;
    }

    // Check if URL can be opened
    const supported = await Linking.canOpenURL(formattedUrl);
    if (!supported) {
      throw new Error("Cannot open URL");
    }

    return await Linking.openURL(formattedUrl);
  } catch (error: any) {
    throw new Error(`Failed to open URL: ${error.message}`);
  }
};

export const fetchWebContent = async (
  inputs?: FetchWebContentInputs,
): Promise<string> => {
  if (!inputs?.url) {
    throw new Error("URL is required");
  }

  const { url } = inputs;

  try {
    // Make sure URL has protocol
    let formattedUrl = url;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      formattedUrl = `https://${url}`;
    }

    // Fetch content from URL
    const response = await fetch(formattedUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const content = await response.text();
    return content;
  } catch (error: any) {
    throw new Error(`Failed to fetch web content: ${error.message}`);
  }
};

export const shareVia = async (inputs?: ShareViaInputs): Promise<true> => {
  if (!inputs?.content) {
    throw new Error("Content is required");
  }

  const { content, app } = inputs || {};

  try {
    if (Platform.OS !== "ios") {
      throw new Error("This action is only supported on iOS");
    }

    if (app === "System Share") {
      // Create a temporary file for sharing
      const tempFilePath = `${FileSystem.cacheDirectory}temp-share-content.txt`;
      await FileSystem.writeAsStringAsync(tempFilePath, content);

      // Check if sharing is available
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        throw new Error("Sharing is not available on this device");
      }

      await Sharing.shareAsync(tempFilePath);
      return true;
    } else {
      // App-specific sharing
      const appSchemes: Record<string, string> = {
        Messages: `sms:&body=${encodeURIComponent(content)}`,
        Mail: `mailto:?body=${encodeURIComponent(content)}`,
        Twitter: `twitter://post?message=${encodeURIComponent(content)}`,
        Facebook: `fb://share?text=${encodeURIComponent(content)}`,
      };

      const appScheme = appSchemes[app || ""];

      if (!appScheme) {
        throw new Error(`App scheme not found for: ${app}`);
      }

      const supported = await Linking.canOpenURL(appScheme);

      if (!supported) {
        throw new Error(`App not installed: ${app}`);
      }

      return await Linking.openURL(appScheme);
    }
  } catch (error: any) {
    throw new Error(`Failed to share content: ${error.message}`);
  }
};

export const postToSocialMedia = async (
  inputs?: PostToSocialMediaInputs,
): Promise<true> => {
  if (!inputs?.platform) {
    throw new Error("Platform is required");
  }

  if (!inputs?.content) {
    throw new Error("Content is required");
  }

  const { platform, content, media } = inputs || {};

  try {
    if (Platform.OS !== "ios") {
      throw new Error("This action is only supported on iOS");
    }

    // Different URLs for different platforms
    const platformSchemes: Record<string, string> = {
      Twitter: `twitter://post?message=${encodeURIComponent(content)}`,
      Facebook: `fb://share?text=${encodeURIComponent(content)}`,
      Instagram: `instagram://library?LocalIdentifier=${media || ""}`,
    };

    const platformScheme = platformSchemes[platform];

    if (!platformScheme) {
      throw new Error(`Platform scheme not found for: ${platform}`);
    }

    const supported = await Linking.canOpenURL(platformScheme);

    if (!supported) {
      throw new Error(`Platform app not installed: ${platform}`);
    }

    // For Instagram specifically, there's no direct way to post with content
    if (platform === "Instagram" && !media) {
      throw new Error("Instagram requires media to post");
    }

    return await Linking.openURL(platformScheme);
  } catch (error: any) {
    throw new Error(`Failed to post to social media: ${error.message}`);
  }
};
