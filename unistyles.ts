import { StyleSheet } from "react-native-unistyles";
import theme from "./constants/theme";

const appThemes = {
  light: theme.lightTheme,
  dark: theme.lightTheme,
} as const;

type AppThemes = typeof appThemes;

declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  themes: appThemes,
  settings: {
    initialTheme: "light",
  },
});
