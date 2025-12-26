import globalStyle from "@/globalstyle/globalStyle";
import React, { FC, ReactNode } from "react";
import { StyleProp, TextStyle, TouchableOpacityProps } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useUnistyles } from "react-native-unistyles";
import { setOpacity } from "../../constants/utils";
import Box, { ColorToken } from "../layout/Box";
import PressableComponent from "../pressable/PressableComponent";
import { Spinner, spinnerStyle } from "../progress/Spinner";
import TextComponent from "../text/TextComponent";
interface buttonProps extends TouchableOpacityProps {
  disabled?: boolean;
  title: string;
  onPress?: () => void;
  loading?: boolean;
  isRight?: boolean;
  variant?: "primary" | "secondary" | "white";
  icon?: ReactNode;
  textStyle?: StyleProp<TextStyle>;
  textColor?: ColorToken;
}

const ButtonComponent: FC<buttonProps> = ({
  disabled,
  title,
  onPress,
  loading = false,
  icon,
  isRight,
  variant = "primary",
  style,
  textStyle,
  textColor,
  ...rest
}) => {
  const {
    theme: { colors },
  } = useUnistyles();
  return (
    <PressableComponent
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      {...rest}
      style={[]}
    >
      <Box
        borderColor={variant === "white" ? "primary500" : undefined}
        style={[
          globalStyle.w10,
          globalStyle.justifyCenter,
          globalStyle.alignItemsCenter,
          globalStyle.inputHeight,
          globalStyle.borderRadius,
          globalStyle.flexrow,
          globalStyle.gap8,
          {
            backgroundColor: disabled
              ? setOpacity(colors.primary500, 0.3)
              : variant === "primary"
                ? colors.primary500
                : variant === "white"
                  ? colors.surfaceDefault
                  : colors.primary100,
            borderWidth: variant === "white" ? 1 : undefined,
          },
          style,
        ]}
      >
        <Animated.View
          style={[
            globalStyle.w10,
            globalStyle.justifyCenter,
            globalStyle.alignItemsCenter,
            globalStyle.h10,
            globalStyle.flexrow,
            globalStyle.gap8,
          ]}
          key={`${loading}`}
          entering={FadeIn}
          exiting={FadeOut}
        >
          {icon && !loading && !isRight && icon}
          {loading && (
            <Box style={[spinnerStyle.small]}>
              <Spinner isPrimary={variant === "white"} />
            </Box>
          )}
          {!loading && (
            <TextComponent
              variantColor={
                (textColor ?? (variant === "secondary" || variant === "white"))
                  ? "primary500"
                  : "textOnColorBody"
              }
              style={[globalStyle.fontSatoshiMedium, textStyle]}
            >
              {title}
            </TextComponent>
          )}
          {icon && !loading && isRight && icon}
        </Animated.View>
      </Box>
    </PressableComponent>
  );
};

export default ButtonComponent;
