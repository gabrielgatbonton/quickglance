import * as Location from "expo-location";
import * as Linking from "expo-linking";

type OpenMapsInputs = {
  location: string;
};

type GetDistanceBetweenInputs = {
  startLocation: string;
  endLocation: string;
};

type GetWeatherInputs = {
  location: string;
};

export const getCurrentLocation = async (): Promise<{
  latitude: number;
  longitude: number;
  accuracy: number | null;
}> => {
  try {
    // Request location permissions
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      throw new Error("Location permission not granted");
    }

    // Get the current position
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      accuracy: location.coords.accuracy,
    };
  } catch (error: any) {
    throw new Error(`Failed to get current location: ${error.message}`);
  }
};

export const openMaps = async (inputs?: OpenMapsInputs): Promise<true> => {
  if (!inputs?.location) {
    throw new Error("Location is required");
  }

  const { location } = inputs;

  try {
    // Encode the location for the URL
    const encodedLocation = encodeURIComponent(location);

    // Create the maps URL
    const mapsUrl = `maps://?q=${encodedLocation}`;

    // Check if the device can handle the URL
    const supported = await Linking.canOpenURL(mapsUrl);

    if (!supported) {
      throw new Error("Device cannot open Maps");
    }

    return await Linking.openURL(mapsUrl);
  } catch (error: any) {
    throw new Error(`Failed to open maps: ${error.message}`);
  }
};

export const getDistanceBetween = async (
  inputs?: GetDistanceBetweenInputs,
): Promise<number> => {
  if (!inputs?.startLocation) {
    throw new Error("Start location is required");
  }

  if (!inputs?.endLocation) {
    throw new Error("End location is required");
  }

  const { startLocation, endLocation } = inputs;

  try {
    // Geocode the start location
    const startGeocode = await Location.geocodeAsync(startLocation);
    if (startGeocode.length === 0) {
      throw new Error(`Could not find location: ${startLocation}`);
    }

    // Geocode the end location
    const endGeocode = await Location.geocodeAsync(endLocation);
    if (endGeocode.length === 0) {
      throw new Error(`Could not find location: ${endLocation}`);
    }

    // Calculate the distance between the two points
    const distance = await getHaversineDistance(
      startGeocode[0].latitude,
      startGeocode[0].longitude,
      endGeocode[0].latitude,
      endGeocode[0].longitude,
    );

    return distance;
  } catch (error: any) {
    throw new Error(`Failed to calculate distance: ${error.message}`);
  }
};

export const getWeather = async (
  inputs?: GetWeatherInputs,
): Promise<{
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}> => {
  if (!inputs?.location) {
    throw new Error("Location is required");
  }

  const { location } = inputs;

  try {
    let latitude: number;
    let longitude: number;

    // If the location is "Current", get the current location
    if (location.toLowerCase() === "current") {
      const currentLocation = await getCurrentLocation();
      latitude = currentLocation.latitude;
      longitude = currentLocation.longitude;
    } else {
      // Otherwise, geocode the provided location
      const geocode = await Location.geocodeAsync(location);
      if (geocode.length === 0) {
        throw new Error(`Could not find location: ${location}`);
      }
      latitude = geocode[0].latitude;
      longitude = geocode[0].longitude;
    }

    const apiKey = process.env.EXPO_PUBLIC_WEATHER_API_KEY;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`,
    );

    if (!response.ok) {
      throw new Error(`Weather API returned status: ${response.status}`);
    }

    const weatherData = await response.json();

    return {
      temperature: weatherData.main.temp,
      condition: weatherData.weather[0].main,
      humidity: weatherData.main.humidity,
      windSpeed: weatherData.wind.speed,
    };
  } catch (error: any) {
    throw new Error(`Failed to get weather: ${error.message}`);
  }
};

// Helper function to calculate the haversine distance between two points
const getHaversineDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  // Earth's radius in kilometers
  const R = 6371;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
};

const toRad = (value: number): number => {
  return (value * Math.PI) / 180;
};
