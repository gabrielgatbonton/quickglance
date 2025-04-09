import { Action, User, UserPassword } from "@/constants/types";
import QuickGlanceAPI from "./QuickGlanceAPI";
import useAuthStore from "@/stores/useAuthStore";

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

type SaveActionParams = {
  name: string;
  categoryId: string;
  icon: string;
};

type SaveCategoryParams = {
  name: string;
};

type SaveShortcutParams = {
  name: string;
  actions: Action[];
  icon: string;
  description: string;
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

    return {
      id: user.id,
      firstName: user.first_name,
      middleName: user.middle_name,
      lastName: user.last_name,
      email: user.email,
    };
  } catch (error) {
    console.log("Error fetching user", error);

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
) => {
  return await QuickGlanceAPI.put(`/auth/update/${id}`, params);
};
export const register = async (params: RegisterParams) => {
  return await QuickGlanceAPI.post("/auth/register", params);
};
export const login = async (params: LoginParams) => {
  return await QuickGlanceAPI.post("/auth/login", params);
};
export const logout = async () => {
  return await QuickGlanceAPI.post("/auth/logout");
};

/* Actions */
export const getActions = async () => {
  return await QuickGlanceAPI.get("/action");
};
export const saveAction = async (params: SaveActionParams) => {
  return await QuickGlanceAPI.post("/action", params);
};

/* Categories */
export const getCategories = async () => {
  return await QuickGlanceAPI.get("/category");
};
export const saveCategory = async (params: SaveCategoryParams) => {
  return await QuickGlanceAPI.post("/category", params);
};
export const deleteCategory = async (id: string) => {
  return await QuickGlanceAPI.delete(`/category/${id}`);
};

/* Shortcuts */
export const getShortcuts = async () => {
  return await QuickGlanceAPI.get("/shortcut");
};
export const saveShortcut = async (params: SaveShortcutParams) => {
  return await QuickGlanceAPI.post("/shortcut", params);
};
export const deleteShortcut = async (id: string) => {
  return await QuickGlanceAPI.delete(`/shortcut/${id}`);
};

/* Search */
export const search = async (params: SearchParams) => {
  return await QuickGlanceAPI.post("/search", params);
};
