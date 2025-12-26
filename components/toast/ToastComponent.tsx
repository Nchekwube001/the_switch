import ErrorToastIcon from "@/assets/svgs/ErrorToastIcon.svg";
import SuccessToastIcon from "@/assets/svgs/SuccessToastIcon.svg";
import globalStyle from "@/globalstyle/globalStyle";
import { useToastStore } from "@/store/toastStore";
import React, { useCallback, useEffect } from "react";
import { Keyboard } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  SlideInDown,
  SlideInUp,
  SlideOutDown,
  SlideOutUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useUnistyles } from "react-native-unistyles";
import Box from "../layout/Box";
import TextComponent from "../text/TextComponent";
const _threshold = 150; // Threshold for swipe to dismiss
const ToastComponent = () => {
  const translateX = useSharedValue(0);
  const {
    theme: { colors },
  } = useUnistyles();
  const { isBottom, hideToast, message, variant } = useToastStore(
    (state) => state
  );

  const keyboardValue = useSharedValue(0);
  // console.log({
  //   message,
  //   variant,
  // });

  const hideTheToast = useCallback(() => {
    hideToast();
  }, [hideToast]);
  useEffect(() => {
    // reset position whenever the toast remounts

    translateX.value = 0;
    if (message) {
      const timeout = setTimeout(() => {
        hideTheToast();
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [message, hideTheToast, translateX]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardWillShow",
      (event) => {
        keyboardValue.value = event.endCoordinates.height;
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardWillHide",
      () => {
        keyboardValue.value = 0;
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [keyboardValue]);
  const bottomStyle = useAnimatedStyle(() => ({
    bottom: withTiming(40 + keyboardValue.value),
  }));
  const topStyle = useAnimatedStyle(() => ({
    top: withTiming(40),
  }));
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
    opacity: interpolate(
      Math.abs(translateX.value),
      [0, _threshold * 0.65, _threshold],
      [1, 1, 0]
    ),
  }));
  const gesture = Gesture.Pan()

    .onUpdate(({ translationX }) => {
      translateX.value = translationX;
    })
    .onEnd(({ translationX }) => {
      if (Math.abs(translationX) > _threshold) {
        translateX.value = withSpring(Math.sign(translationX) * 500);
        runOnJS(hideToast)();

        return;
      } else {
        translateX.value = withSpring(0);
      }
    });
  if (!message) {
    return null;
  }

  return (
    <>
      {message && (
        <GestureDetector gesture={gesture}>
          <Animated.View
            entering={(isBottom ? SlideInDown : SlideInUp).duration(450)}
            exiting={(isBottom ? SlideOutDown : SlideOutUp).duration(450)}
            style={[
              globalStyle.apiToast,
              globalStyle.flexrow,
              globalStyle.p1p6,
              globalStyle.borderRadius16,
              globalStyle.center,
              isBottom && bottomStyle,
              !isBottom && topStyle,
              globalStyle.br,
              globalStyle.w9,
              globalStyle.gap12,
              globalStyle.borderRadius16,
              {
                alignSelf: "center",
                backgroundColor: colors.surfaceDefault,
                borderWidth: 1,
                borderColor:
                  variant === "success" ? colors.green400 : colors.error400,
              },
              animatedStyle,
            ]}
          >
            {variant === "error" ? <ErrorToastIcon /> : <SuccessToastIcon />}
            <Box style={[globalStyle.flexOne]}>
              <TextComponent
                variant="white"
                style={[
                  globalStyle.fontSatoshiMedium,
                  globalStyle.fontWeight500,
                  globalStyle.fontSize13,
                ]}
              >
                {message}
              </TextComponent>
            </Box>
          </Animated.View>
        </GestureDetector>
      )}
    </>
  );
};

export default ToastComponent;
