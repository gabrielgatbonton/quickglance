import * as DeviceActions from "./handlers/deviceActions";
import * as ConnectivityActions from "./handlers/connectivityActions";
import * as MediaActions from "./handlers/mediaActions";
import * as LocationActions from "./handlers/locationActions";
import * as DataActions from "./handlers/dataActions";
import * as AIActions from "./handlers/aiActions";
import * as WebActions from "./handlers/webActions";

const actionHandlers: Record<string, Function> = {
  // Device Actions
  d1: DeviceActions.callNumber,
  d2: DeviceActions.sendMessage,
  d3: DeviceActions.openApp,
  d4: DeviceActions.setBrightness,
  d5: DeviceActions.copyToClipboard,

  // Connectivity Actions
  c1: ConnectivityActions.toggleWiFi,
  c2: ConnectivityActions.toggleBluetooth,
  c3: ConnectivityActions.toggleAirplaneMode,

  // Media Actions
  m1: MediaActions.playSound,
  m2: MediaActions.getRecentPhoto,
  m3: MediaActions.recordAudio,
  m4: MediaActions.setVolume,

  // Location Actions
  l1: LocationActions.getCurrentLocation,
  l2: LocationActions.openMaps,
  l3: LocationActions.getDistanceBetween,
  l4: LocationActions.getWeather,

  // Data Actions
  da1: DataActions.getClipboard,
  da2: DataActions.setClipboard,
  da3: DataActions.getBatteryLevel,
  da4: DataActions.generateQRCode,

  // AI Actions
  ai1: AIActions.textCompletion,
  ai2: AIActions.summarizeText,
  ai3: AIActions.imageDescription,
  ai4: AIActions.sentimentAnalysis,
  ai5: AIActions.languageTranslation,
  ai6: AIActions.voiceRecognition,

  // Web Actions
  w1: WebActions.openURL,
  w2: WebActions.fetchWebContent,
  w3: WebActions.shareVia,
  w4: WebActions.postToSocialMedia,
};

export default actionHandlers;
