import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { expoSecureStorage } from "./localstorage";
export type loginState = {
  loggedIn: boolean;
  isRefreshing: boolean;
  access_token: string;
  refresh_token: string;
  userId: string;
  username: string;
};

export interface LoginActions {
  setLoggedInState: (val: Partial<loginState>) => void;
}

export const useLoggedInStore = create<loginState & LoginActions>()(
  persist(
    (set) => ({
      access_token: "",
      loggedIn: false,
      isRefreshing: false,
      refresh_token: "",
      userId: "",
      username: "",
      setLoggedInState: (val: Partial<loginState>) =>
        set((state) => ({
          ...state,
          ...val,
        })),
    }),
    {
      name: "login-state",
      storage: createJSONStorage(() => expoSecureStorage),
    }
  )
);
