import { scale } from "@/constants/scale";
import globalStyle from "@/globalstyle/globalStyle";
import React, { useEffect } from "react";
import { ViewProps } from "react-native";
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
export type SpinnerProps = ViewProps & {
  small?: boolean;
  isPrimary?: boolean;
};

export const Spinner: React.FC<SpinnerProps> = ({ small, isPrimary }) => {
  const R = small ? 18 : 30;
  const STROKE_WIDTH = small ? 6 : 11;
  const rotate = useSharedValue(0.01);
  const progress = useSharedValue(0.4);
  const {
    theme: { colors },
  } = useUnistyles();
  let circle_length = 2 * Math.PI * R;
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circle_length * progress.value,
  }));
  useEffect(() => {
    rotate.value = withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.linear }),
      -1,
      false
    );
    return () => cancelAnimation(rotate);
  }, [rotate]);

  const stylez = useAnimatedStyle(() => {
    "worklet";
    return {
      transform: [
        {
          rotate: `${rotate.value}deg`,
        },
      ],
    };
  });
  return (
    <Animated.View style={[spinnerStyle.aspect]}>
      <AnimatedSvg
        height="100%"
        width="100%"
        viewBox="0 0 100 100"
        style={[
          globalStyle.justifyCenter,
          globalStyle.alignItemsCenter,
          globalStyle.borderRadius,
          spinnerStyle.spin,
          small && spinnerStyle.small,
          stylez,
        ]}
      >
        <Circle
          cx={"50"}
          cy={"50"}
          r={R}
          strokeWidth={STROKE_WIDTH}
          fill={"transparent"}
          stroke={"transparent"}
        />
        <AnimatedCircle
          cx={"50"}
          cy={"50"}
          r={R}
          fill={"transparent"}
          strokeWidth={STROKE_WIDTH}
          strokeLinecap={"round"}
          stroke={isPrimary ? colors.primary500 : colors.surfaceDefault}
          strokeDasharray={circle_length}
          animatedProps={animatedProps}
        />
      </AnimatedSvg>
    </Animated.View>
  );
};

export const spinnerStyle = StyleSheet.create({
  aspect: {
    aspectRatio: 1,
  },
  load: {
    height: scale(100),
    width: scale(100),
  },
  spin: {
    height: scale(60),
    width: scale(60),
  },
  small: {
    height: scale(30),
    width: scale(30),
  },
  smallLoad: {
    height: scale(20),
    width: scale(20),
  },
  smallest: {
    height: scale(14),
    width: scale(14),
  },
});
