import { User, UserPassword } from "@/constants/types";
import { create } from "zustand";

export type SignUpState = {
  userInfo: User & UserPassword;
  isSignIn: boolean;
  errors:
    | {
        [K in keyof SignUpState["userInfo"]]?: string[];
      }
    | null;
};

export type SignUpActions = {
  setUserInfo: (userInfo: Partial<SignUpState["userInfo"]>) => void;
  setErrors: (errors: SignUpState["errors"]) => void;
  toggleSignIn: () => void;
  resetAll: () => void;
};

const initialUserInfoState: SignUpState["userInfo"] = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  password: "",
  password_confirmation: "",
};

const useSignUpStore = create<SignUpState & SignUpActions>((set) => ({
  userInfo: initialUserInfoState,
  isSignIn: false,
  errors: null,
  setUserInfo: (userInfo) => {
    set((state) => {
      const keys = Object.keys(userInfo) as (keyof SignUpState["userInfo"])[];
      const newErrors = { ...state.errors };

      keys.forEach((key) => {
        if (userInfo[key]) {
          delete newErrors[key];
        }
      });

      return {
        userInfo: { ...state.userInfo, ...userInfo },
        errors: Object.keys(newErrors).length > 0 ? newErrors : null,
      };
    });
  },
  setErrors: (errors) => set(() => ({ errors })),
  toggleSignIn: () => set((state) => ({ isSignIn: !state.isSignIn })),
  resetAll: () =>
    set(() => ({
      userInfo: initialUserInfoState,
      isSignIn: false,
      errors: null,
    })),
}));

export default useSignUpStore;
