import { Theme } from "@/constants/theme";
import React from "react";
import {
  ColorValue,
  StyleProp,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { StyleSheet } from "react-native-unistyles";

type RawColorToken = keyof Theme["colors"];
export type ColorToken = Exclude<RawColorToken, "prototype">;
export interface BoxProps extends ViewProps {
  backgroundColor?: ColorToken;
  borderColor?: ColorToken;
  flex?: number;
  zIndex?: number;
}

const Box: React.FC<BoxProps> = ({
  backgroundColor,
  flex,
  borderColor,
  style,
  zIndex,
  ...rest
}) => {
  const dynamicStyle = StyleSheet.create((theme) => ({
    base: {
      ...(backgroundColor && {
        backgroundColor: theme.colors[backgroundColor] as ColorValue,
      }),
      ...(borderColor && {
        borderColor: theme.colors[borderColor] as ColorValue,
      }),
      ...(flex != null && { flex }),
      ...(zIndex != null && { zIndex }),
    } satisfies ViewStyle,
  }));
  return (
    <View
      style={[dynamicStyle.base, style as StyleProp<ViewStyle>]}
      {...rest}
    />
  );
};

export default Box;
