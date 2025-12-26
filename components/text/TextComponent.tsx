import globalStyle from "@/globalstyle/globalStyle";
import { FC } from "react";
import { ColorValue, StyleProp, Text, TextStyle } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { ColorToken } from "../layout/Box";

export interface textProps {
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  onPress?: () => void;
  children: any;
  variant?: "black" | "white" | "primary" | "gray" | "error" | "secondary";
  variantColor?: ColorToken;
}

const TextComponent: FC<textProps> = ({
  numberOfLines,
  style,
  children,
  onPress,
  variantColor = "textDefaultBody",
}) => {
  const dynamicStyle = StyleSheet.create((theme) => ({
    base: {
      ...(variantColor && {
        color: theme.colors[variantColor] as ColorValue,
      }),
    } satisfies TextStyle,
  }));
  return (
    <Text
      numberOfLines={numberOfLines}
      onPress={onPress}
      allowFontScaling={false}
      style={[
        globalStyle.fontSatoshiRegular,
        globalStyle.fontSize13,
        dynamicStyle.base,
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default TextComponent;
