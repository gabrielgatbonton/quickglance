import axios from "axios";
import Constants from "expo-constants";

const hostname = new URL(
  Constants.linkingUri || `http://${Constants.expoConfig?.hostUri}`,
).hostname;

// export const baseURL = `http://${hostname}/quickglance-backend.test/api`;
// ICTDU Wifi
// export const baseURL = `http://192.168.10.101:8000/api`;
//  Rhymeses' Data
export const baseURL = `http://192.168.40.146:8000/api`; 
// export const baseURL = `http://10.10.10.238:8000/api`;
// export const baseURL = `http://127.0.0.1:8000/api`;

const QuickGlanceAPI = axios.create({ baseURL });

export const setAPIHeaderToken = (token: string) => {
  QuickGlanceAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const removeAPIHeaderToken = () => {
  delete QuickGlanceAPI.defaults.headers.common["Authorization"];
};

export default QuickGlanceAPI;
