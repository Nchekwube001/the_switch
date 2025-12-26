import EyeClose from "@/assets/svgs/EyeClose.svg";
import EyeOpen from "@/assets/svgs/EyeOpen.svg";
import { FC, useEffect, useState } from "react";
import { TextInput } from "react-native";

import { verticalScale } from "@/constants/scale";
import { textInputProps } from "@/constants/types";
import globalStyle from "@/globalstyle/globalStyle";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useUnistyles } from "react-native-unistyles";
import Box from "../layout/Box";
import PressableComponent from "../pressable/PressableComponent";
import ItemError from "../utils/ItemError";
import ItemTitle from "../utils/ItemTitle";
const TextInputComponent: FC<textInputProps> = ({
  variant = "text",
  title,
  required,
  placeholder,
  multiLine,
  editable = true,
  onFocus,
  onBlur,
  errorText,
  setVal,
  showIcon = true,
  rightIcon,
  icon,
  titleVariant,
  ...rest
}) => {
  const isPassword = variant === "password";
  const {
    theme: { colors },
  } = useUnistyles();
  const [focus, setFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(isPassword ? false : true);
  let iconView = null;
  if (!showPassword) {
    iconView = <EyeClose />;
  } else {
    iconView = <EyeOpen />;
  }
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const animationValue = useSharedValue(0);
  useEffect(() => {
    if (errorText && errorText?.length > 0) {
      animationValue.value = withTiming(1);
    } else {
      animationValue.value = withTiming(0);
    }
  }, [errorText, animationValue]);
  const animatedStyle = useAnimatedStyle(() => {
    "worklet";
    const translateX = interpolate(
      animationValue.value,
      [0, 0.2, 0.4, 0.8, 1],
      [0, -4, 0, 4, 0],
      {
        extrapolateRight: Extrapolation.CLAMP,
      }
    );
    return {
      transform: [
        {
          translateX,
        },
      ],
    };
  });
  return (
    <Animated.View style={[animatedStyle]}>
      {title && (
        <ItemTitle
          titleVariant={titleVariant}
          required={required}
          title={title}
        />
      )}

      <Box
        style={[
          globalStyle.w10,
          globalStyle.inputHeight,
          multiLine && globalStyle.inpuMultiHeight,
          (focus || errorText) && globalStyle.p0p3,
          globalStyle.borderRadius,
          {
            borderColor: focus
              ? colors.textDefaultHeading
              : errorText
                ? colors.error500
                : "transparent",
            borderWidth: verticalScale(1.5),
          },
        ]}
      >
        <Box
          style={[
            globalStyle.w10,
            globalStyle.h10,
            focus || errorText
              ? globalStyle.borderRadius6
              : globalStyle.borderRadius,
            globalStyle.flexrow,
            globalStyle.alignItemsCenter,
            focus || errorText ? globalStyle.px0p5 : globalStyle.px0p8,
            {
              borderWidth: verticalScale(1),
              borderColor: colors.neutral150,
              backgroundColor: colors.surfaceDefault,
            },
          ]}
        >
          <Box flex={1}>
            <TextInput
              placeholder={placeholder}
              placeholderTextColor={colors.textDisabledDefault}
              selectionColor={colors.textDefaultBody}
              style={[
                globalStyle.fontSize13,
                globalStyle.h10,
                {
                  color: colors.textDefaultBody,
                },
              ]}
              onFocus={(e) => {
                onFocus && onFocus(e);
                setFocus(true);
              }}
              onBlur={(e) => {
                onBlur && onBlur(e);
                setFocus(false);
              }}
              multiline={multiLine}
              editable={editable}
              autoCorrect={false}
              secureTextEntry={!showPassword}
              textContentType={!showPassword ? "name" : "password"}
              {...rest}
            />
          </Box>
          {isPassword && (
            <Box style={[globalStyle.pl0p8]}>
              <PressableComponent onPress={toggleShowPassword} hitSlop={8}>
                {iconView}
              </PressableComponent>
            </Box>
          )}
          {rightIcon && <Box style={[globalStyle.pl0p8]}>{rightIcon}</Box>}
        </Box>
      </Box>

      {errorText && <ItemError errorText={errorText} />}
    </Animated.View>
  );
};

export default TextInputComponent;
