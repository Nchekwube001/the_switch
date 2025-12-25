import React, { FC, ReactNode } from "react";
import { ColorValue, Pressable, PressableProps, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ColorToken } from "../layout/Box";
import { StyleSheet } from "react-native-unistyles";

interface pressProps extends PressableProps {
  children?: ReactNode;
  scaleVal?: number;
  backgroundColor?: ColorToken;
  borderColor?: ColorToken;
  flex?: number;
  zIndex?: number;
}
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const PressableComponent: FC<pressProps> = ({
  children,
  scaleVal,
  backgroundColor,
  borderColor,
  flex,
  zIndex,
  style,
  ...rest
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
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
  const animatedStyle = useAnimatedStyle(() => {
    "worklet";
    return {
      opacity: withTiming(opacity.value),
      transform: [
        {
          scale: withTiming(scale.value),
        },
      ],
    };
  });

  return (
    <Animated.View style={[animatedStyle]}>
      <AnimatedPressable
        onPressIn={() => {
          scale.value = scaleVal ?? 0.98;
          opacity.value = 0.85;
        }}
        onPressOut={() => {
          scale.value = 1;
          opacity.value = 1;
        }}
        hitSlop={10}
        style={[dynamicStyle.base, style as ViewStyle]}
        {...rest}
      >
        {children}
      </AnimatedPressable>
    </Animated.View>
  );
};

export default PressableComponent;
