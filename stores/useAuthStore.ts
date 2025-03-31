import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import {
  removeAPIHeaderToken,
  setAPIHeaderToken,
} from "@/services/QuickGlanceAPI";
import { queryClient } from "@/app/_layout";

export type AuthStoreState = {
  isTokenLoaded: boolean;
  token: string | null;
};

export type AuthStoreActions = {
  refreshAuth: () => void;
  handleLogin: (token: string) => void;
  handleLogout: () => void;
};

export const USER_TOKEN_KEY = "userToken";

const useAuthStore = create<AuthStoreState & AuthStoreActions>((set) => ({
  isTokenLoaded: false,
  token: null,
  user: null,
  refreshAuth: () => {
    // Retrieve token from secure storage
    const token = SecureStore.getItem(USER_TOKEN_KEY);

    if (token) {
      console.log("Token found!", { token });

      // Update API headers with token
      setAPIHeaderToken(token);
      set({ token });
    } else {
      console.log("No token found!");

      // If no token, remove API header and reset state
      removeAPIHeaderToken();
      set({ token: null });
    }

    // Set token loaded state to true
    set({ isTokenLoaded: true });
  },
  handleLogin: async (token) => {
    // Store token securely
    SecureStore.setItem(USER_TOKEN_KEY, token);

    // Update API headers with new token
    setAPIHeaderToken(token);

    // Reset query cache to reflect new authentication state
    await queryClient.resetQueries();

    // Update store state
    set({ token });
  },
  handleLogout: async () => {
    // Remove token from secure storage
    await SecureStore.deleteItemAsync(USER_TOKEN_KEY);

    // Remove API header token
    removeAPIHeaderToken();

    set({ token: null });
  },
}));

export default useAuthStore;
