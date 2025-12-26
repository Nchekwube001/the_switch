import { useLoggedInStore } from "@/store/loginSlice";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useCallback, useEffect } from "react";
import { AppState, Keyboard } from "react-native";

export const useDismissKeyboardOnBackground = () => {
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      if (nextState === "background" || nextState === "inactive") {
        Keyboard.dismiss();
      }
    });

    return () => subscription.remove();
  }, []);
};

export const useLogoutHook = () => {
  const queryClient = useQueryClient();
  const { setLoggedInState } = useLoggedInStore();

  const logUserOut = useCallback(() => {
    queryClient.cancelQueries();
    queryClient.clear();
    setLoggedInState({
      access_token: "",
      loggedIn: false,
      refresh_token: "",
    });
    router.replace("/loginscreen");
  }, [queryClient, setLoggedInState]);

  return {
    logUserOut,
  };
};
