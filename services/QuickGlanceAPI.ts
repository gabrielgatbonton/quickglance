import axios from "axios";
import Constants from "expo-constants";

const hostname = new URL(
  Constants.linkingUri || `http://${Constants.expoConfig?.hostUri}`,
).hostname;

export const baseURL = `http://${hostname}/quickglance-backend.test/api`;

const QuickGlanceAPI = axios.create({ baseURL });

export const setAPIHeaderToken = (token: string) => {
  QuickGlanceAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const removeAPIHeaderToken = () => {
  delete QuickGlanceAPI.defaults.headers.common["Authorization"];
};

export default QuickGlanceAPI;
