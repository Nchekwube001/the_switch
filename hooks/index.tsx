import { useEffect } from "react";
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
