import {
  Action,
  Automation,
  AutomationCondition,
  AutomationStep,
  Category,
  Service,
  Shortcut,
  User,
  UserPassword,
} from "@/constants/types";
import QuickGlanceAPI from "./QuickGlanceAPI";
import useAuthStore from "@/stores/useAuthStore";
import { Alert } from "react-native";

type RegisterParams = {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  password: string;
};

type LoginParams = {
  email: string;
  password: string;
};

type SaveActionParams = Omit<Action, "key" | "id">;

type SaveCategoryParams = Omit<Category, "id" | "actions">;

type SaveShortcutParams = Omit<Shortcut, "id" | "userName">;

type SaveServiceParams = Omit<Service, "id" | "shortcuts"> & {
  shortcuts: Pick<Shortcut, "id">[];
};

type SaveAutomationParams = {
  title: Automation["title"];
  automationConditionId: string;
  shortcuts: Pick<AutomationStep, "id" | "order">[];
};

type InstallShortcutParams = {
  shortcutId: Shortcut["id"];
};

type SearchParams = {
  model: string;
  query: string;
};

/* Auth */
export const getUser = async (): Promise<User> => {
  try {
    const {
      data: { user },
    } = await QuickGlanceAPI.get("/auth/user");
    return user;
  } catch (error: any) {
    console.log("Error fetching user", error.response);

    // Handle session expiration
    if (error.response?.status === 401) {
      Alert.alert(
        "Session Expired",
        "Your session has expired. Please log in again.",
      );
    }

    // If token is present, handle logout
    if (useAuthStore.getState().token) {
      useAuthStore.getState().handleLogout();
    }
    throw error;
  }
};
export const updateUser = async (
  id: string,
  params: Partial<User> | UserPassword,
): Promise<{ user: User; message: string }> => {
  try {
    const {
      data: { user, message },
    } = await QuickGlanceAPI.put(`/auth/update/${id}`, params);
    return { user, message };
  } catch (error: any) {
    console.log("Error updating user", error.response);
    throw error;
  }
};
export const register = async (params: RegisterParams) => {
  try {
    const { data: registerData } = await QuickGlanceAPI.post(
      "/auth/register",
      params,
    );
    return registerData;
  } catch (error: any) {
    console.log("Error registering user", error.response);
    throw error;
  }
};
export const login = async (params: LoginParams) => {
  try {
    const { data: loginData } = await QuickGlanceAPI.post(
      "/auth/login",
      params,
    );
    return loginData;
  } catch (error: any) {
    console.log("Error logging in", error.response);
    throw error;
  }
};
export const logout = async () => {
  try {
    const {
      data: { message },
    } = await QuickGlanceAPI.post("/auth/logout");
    return message;
  } catch (error: any) {
    console.log("Error logging out", error.response);
    throw error;
  }
};

/* Actions */
export const getActions = async (): Promise<Action[]> => {
  try {
    const {
      data: { actions },
    } = await QuickGlanceAPI.get("/action");
    return actions;
  } catch (error: any) {
    console.log("Error fetching actions", error.response);
    throw error;
  }
};
export const saveAction = async (params: SaveActionParams) => {
  try {
    const {
      data: { message },
    } = await QuickGlanceAPI.post("/action", params);
    return message;
  } catch (error: any) {
    console.log("Error saving action", error.response);
    throw error;
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const {
      data: { categories },
    } = await QuickGlanceAPI.get("/category");
    return categories;
  } catch (error: any) {
    console.log("Error fetching categories", error.response);
    throw error;
  }
};
export const saveCategory = async (params: SaveCategoryParams) => {
  try {
    const {
      data: { message },
    } = await QuickGlanceAPI.post("/category", params);
    return message;
  } catch (error: any) {
    console.log("Error saving category", error.response);
    throw error;
  }
};
export const deleteCategory = async (id: string) => {
  try {
    const {
      data: { message },
    } = await QuickGlanceAPI.delete(`/category/${id}`);
    return message;
  } catch (error: any) {
    console.log("Error deleting category", error.response);
    throw error;
  }
};

/* Shortcuts */
export const getPublicShortcuts = async (): Promise<Shortcut[]> => {
  try {
    const {
      data: { shortcuts },
    } = await QuickGlanceAPI.get("/shortcut");
    return shortcuts;
  } catch (error: any) {
    console.log("Error fetching public shortcuts", error.response);
    throw error;
  }
};
export const getUserShortcuts = async (): Promise<Shortcut[]> => {
  try {
    const {
      data: { shortcuts },
    } = await QuickGlanceAPI.get("/shortcut/personal");
    return shortcuts;
  } catch (error: any) {
    console.log("Error fetching user shortcuts", error.response);
    throw error;
  }
};
export const saveShortcut = async (params: SaveShortcutParams) => {
  try {
    const {
      data: { message },
    } = await QuickGlanceAPI.post("/shortcut", params);
    return message;
  } catch (error: any) {
    console.log("Error saving shortcut", error.response);
    throw error;
  }
};
export const getShortcut = async (id: string): Promise<Shortcut> => {
  try {
    const {
      data: { shortcut },
    } = await QuickGlanceAPI.get(`/shortcut/public/${id}`);
    return shortcut;
  } catch (error: any) {
    console.log("Error fetching shortcut", error.response);
    throw error;
  }
};
export const installShortcut = async (params: InstallShortcutParams) => {
  try {
    const {
      data: { message },
    } = await QuickGlanceAPI.post("/shortcut/public", params);
    return message;
  } catch (error: any) {
    console.log("Error installing shortcut", error.response);
    throw error;
  }
};
export const updateShortcut = async (
  id: string,
  params: SaveShortcutParams,
) => {
  try {
    const {
      data: { message },
    } = await QuickGlanceAPI.put(`/shortcut/${id}`, params);
    return message;
  } catch (error: any) {
    console.log("Error updating shortcut", error.response);
    throw error;
  }
};
export const deleteShortcut = async (id: string) => {
  try {
    const {
      data: { message },
    } = await QuickGlanceAPI.delete(`/shortcut/${id}`);
    return message;
  } catch (error: any) {
    console.log("Error deleting shortcut", error.response);
    throw error;
  }
};

/* Services */
export const getServices = async (): Promise<Service[]> => {
  try {
    const {
      data: { services },
    } = await QuickGlanceAPI.get("/service");
    return services;
  } catch (error: any) {
    console.log("Error fetching services", error.response);
    throw error;
  }
};
export const getService = async (id: string): Promise<Service> => {
  try {
    const {
      data: { service },
    } = await QuickGlanceAPI.get(`/service/${id}`);
    return service;
  } catch (error: any) {
    console.log("Error fetching service", error.response);
    throw error;
  }
};
export const saveService = async (params: SaveServiceParams) => {
  try {
    const {
      data: { message },
    } = await QuickGlanceAPI.post("/service", params);
    return message;
  } catch (error: any) {
    console.log("Error saving service", error.response);
    throw error;
  }
};

/* Automations */
export const getAutomations = async (): Promise<Automation[]> => {
  try {
    const {
      data: { automations },
    } = await QuickGlanceAPI.get("/automation");
    return automations;
  } catch (error: any) {
    console.log("Error fetching automations", error.response);
    throw error;
  }
};
export const getAutomationConditions = async (): Promise<
  AutomationCondition[]
> => {
  try {
    const {
      data: { automationConditions },
    } = await QuickGlanceAPI.get("/automation/create");
    return automationConditions;
  } catch (error: any) {
    console.log("Error fetching automation conditions", error.response);
    throw error;
  }
};
export const saveAutomation = async (params: SaveAutomationParams) => {
  try {
    const {
      data: { message },
    } = await QuickGlanceAPI.post("/automation", params);
    return message;
  } catch (error: any) {
    console.log("Error saving automation", error.response);
    throw error;
  }
};
export const deleteAutomation = async (id: string) => {
  try {
    const {
      data: { message },
    } = await QuickGlanceAPI.delete(`/automation/${id}`);
    return message;
  } catch (error: any) {
    console.log("Error deleting automation", error.response);
    throw error;
  }
};

/* Search */
export const search = async (params: SearchParams) => {
  try {
    const {
      data: { results },
    } = await QuickGlanceAPI.post("/search", params);
    return results;
  } catch (error: any) {
    console.log("Error searching", error.response);
    throw error;
  }
};
