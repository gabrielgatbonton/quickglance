import { Audio } from "expo-av";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import SystemSetting from "react-native-system-setting";

type PlaySoundInputs = {
  soundFile: string;
};

type RecordAudioInputs = {
  duration: number;
};

type SetVolumeInputs = {
  volumeLevel: number;
};

export const playSound = async (inputs?: PlaySoundInputs): Promise<boolean> => {
  if (!inputs?.soundFile) {
    throw new Error("Sound file is required");
  }

  const { soundFile } = inputs;

  try {
    // Check if the file exists
    const fileInfo = await FileSystem.getInfoAsync(soundFile);
    if (!fileInfo.exists) {
      throw new Error(`Sound file not found: ${soundFile}`);
    }

    // Set up audio mode for background playback
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      shouldDuckAndroid: false,
    });

    // Create a new sound object
    const { sound } = await Audio.Sound.createAsync(
      { uri: soundFile },
      { shouldPlay: true },
    );

    // Play the sound
    await sound.playAsync();

    // Set up a listener to release resources when playback finishes
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        sound.unloadAsync();
      }
    });

    return true;
  } catch (error: any) {
    throw new Error(`Failed to play sound: ${error.message}`);
  }
};

export const getRecentPhoto = async (): Promise<string> => {
  try {
    // Request media library permissions
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Media library permission not granted");
    }

    // Get the most recent photo from the library
    const options = {
      first: 1,
      mediaType: MediaLibrary.MediaType.photo,
      sortBy: [MediaLibrary.SortBy.creationTime],
    };

    const { assets } = await MediaLibrary.getAssetsAsync(options);

    if (assets.length === 0) {
      throw new Error("No photos found in library");
    }

    // Return the URI of the most recent photo
    return assets[0].uri;
  } catch (error: any) {
    throw new Error(`Failed to get recent photo: ${error.message}`);
  }
};

export const recordAudio = async (
  inputs?: RecordAudioInputs,
): Promise<string> => {
  if (!inputs?.duration) {
    throw new Error("Duration is required");
  }

  const { duration } = inputs || {};

  try {
    // Request audio recording permissions
    const { status } = await Audio.requestPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Audio recording permission not granted");
    }

    // Configure audio recording
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    // Start recording
    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY,
    );
    await recording.startAsync();

    // Create a timeout promise to stop recording after the specified duration
    await new Promise((resolve) => setTimeout(resolve, duration * 1000));

    // Stop recording
    await recording.stopAndUnloadAsync();

    // Get the URI of the recording
    const uri = recording.getURI();
    if (!uri) {
      throw new Error("Failed to get recording URI");
    }

    // Save the recording to the media library
    const asset = await MediaLibrary.createAssetAsync(uri);
    return asset.uri;
  } catch (error: any) {
    throw new Error(`Failed to record audio: ${error.message}`);
  }
};

export const setVolume = async (inputs?: SetVolumeInputs): Promise<boolean> => {
  if (inputs?.volumeLevel === undefined) {
    throw new Error("Volume level is required");
  }

  const { volumeLevel } = inputs || {};

  try {
    // Convert percentage (0-100) to a value between 0 and 1
    const normalizedVolume = volumeLevel / 100;

    // Set the system volume
    await SystemSetting.setVolume(normalizedVolume);

    return true;
  } catch (error: any) {
    throw new Error(`Failed to set volume: ${error.message}`);
  }
};
