import onb1 from "@/assets/images/onb1.jpg";
import Box from "@/components/layout/Box";
import PressableComponent from "@/components/pressable/PressableComponent";
import TextComponent from "@/components/text/TextComponent";
import { scale } from "@/constants/scale";
import { setOpacity } from "@/constants/utils";
import globalStyle from "@/globalstyle/globalStyle";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import React from "react";
import { ImageBackground, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUnistyles } from "react-native-unistyles";
const Onboarding = () => {
  const { bottom } = useSafeAreaInsets();
  const {
    theme: { colors },
  } = useUnistyles();
  return (
    <ImageBackground style={[globalStyle.w10, globalStyle.h10]} source={onb1}>
      <Box
        flex={1}
        style={[globalStyle.alignItemsCenter, globalStyle.justifyEnd, {}]}
      >
        <StatusBar barStyle={"light-content"} />

        <Box
          style={[
            globalStyle.px2p4,
            globalStyle.w10,
            globalStyle.gap32,
            globalStyle.modalBr,
            {
              backgroundColor: setOpacity(colors.textDefaultBody, 0.35),
              paddingBottom: bottom + scale(20),
              paddingTop: scale(20),
            },
          ]}
        >
          <Box style={[globalStyle.center]}>
            <TextComponent
              variantColor="textOnColorHeading"
              style={[
                globalStyle.textCenter,
                globalStyle.fontSatoshiBold,
                globalStyle.fontSize28,
              ]}
            >
              Pay Smarter, Move Faster
            </TextComponent>
            <TextComponent
              variantColor="textOnColorCaption"
              style={[
                globalStyle.textCenter,
                globalStyle.fontSatoshiMedium,
                globalStyle.fontSize16,
              ]}
            >
              Seamless transfers, bills, airtime, and payments, powered by
              Interswitch. Get set up in minutes and start transacting with
              speed, security, and confidence.
            </TextComponent>
          </Box>
          <Box style={[globalStyle.px5]}>
            <PressableComponent
              onPress={() => {
                router.push("/register");
              }}
              backgroundColor="primary500"
              style={[
                globalStyle.px0p8,
                globalStyle.py0p8,
                globalStyle.br,
                globalStyle.flexrow,
                globalStyle.alignItemsCenter,
                globalStyle.justifyBetween,
              ]}
            >
              <Box
                style={[
                  globalStyle.center,
                  globalStyle.pl3,
                  globalStyle.flexrow,
                ]}
              >
                <TextComponent
                  style={[
                    globalStyle.fontSatoshiBold,
                    globalStyle.textCenter,
                    globalStyle.fontSize16,
                  ]}
                  variantColor="textPrimaryOnColor"
                >
                  Explore
                </TextComponent>
              </Box>
              <Box
                style={[
                  // globalStyle.h10,
                  globalStyle.px3,
                  globalStyle.center,
                  globalStyle.br,
                  globalStyle.py1p2,
                ]}
                backgroundColor="surfaceDefault"
              >
                <Entypo
                  name="chevron-right"
                  size={18}
                  color={colors.textDefaultBody}
                />
              </Box>
            </PressableComponent>
          </Box>
        </Box>
      </Box>
    </ImageBackground>
  );
};

export default Onboarding;
