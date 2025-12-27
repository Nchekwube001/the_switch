import { scale } from "@/constants/scale";
import { ChangeCase } from "@/constants/utils";
import globalStyle, { width } from "@/globalstyle/globalStyle";
import { useGetUserProfile } from "@/hooks";
import { AppQueryKeys } from "@/service/shared/AppQueryKeys";
import { useDrawerStore } from "@/store/drawerStore";
import { faker } from "@faker-js/faker";
import React, { useEffect, useMemo } from "react";
import { Pressable, ScrollView } from "react-native";
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUnistyles } from "react-native-unistyles";
import ImageComponent from "../image/ImageComponent";
import Box from "../layout/Box";
import PressableComponent from "../pressable/PressableComponent";
import TextComponent from "../text/TextComponent";
const DrawerComponent = () => {
  const translateX = useSharedValue(-width * 0.8);
  const backdropOpacity = useSharedValue(0);
  const { profileData } = useGetUserProfile();

  const {
    theme: { colors },
  } = useUnistyles();
  const { setShowDrawer, showDrawer } = useDrawerStore();
  useEffect(() => {
    if (showDrawer) {
      translateX.value = withTiming(0, { duration: 200 });
      backdropOpacity.value = withTiming(1);
    } else {
      translateX.value = withTiming(-width * 0.8, { duration: 200 });
      backdropOpacity.value = withTiming(0);
    }
  }, [backdropOpacity, showDrawer, translateX]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const drawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const drawerContent = useMemo(() => [], []);
  return (
    <>
      <Animated.View
        pointerEvents={showDrawer ? "auto" : "none"}
        style={[
          globalStyle.absolute,
          globalStyle.width,
          globalStyle.height,
          backdropStyle,
          { zIndex: 20, backgroundColor: "transparent" },
        ]}
      >
        <Pressable
          style={[globalStyle.absolute, globalStyle.width, globalStyle.height]}
          onPress={() => setShowDrawer(false)}
        />
        <Animated.View
          style={[
            globalStyle.h10,
            globalStyle.relative,
            drawerStyle,
            {
              width: width * 0.8,
              backgroundColor: colors.pastel200,
            },
          ]}
        >
          <SafeAreaView
            edges={["top"]}
            style={[
              globalStyle.px2,
              globalStyle.justifyBetween,
              globalStyle.flexOne,
            ]}
          >
            <Box flex={1}>
              <Animated.View
                entering={FadeIn.delay(100)}
                style={[
                  globalStyle.mt2,
                  globalStyle.py1p6,
                  globalStyle.px1p2,
                  globalStyle.borderRadius,
                  globalStyle.flexrow,
                  globalStyle.alignItemsCenter,
                  globalStyle.gap8,
                ]}
              >
                <ImageComponent
                  style={[
                    globalStyle.br,
                    {
                      width: scale(36),
                      aspectRatio: 1,
                    },
                  ]}
                  source={{
                    uri: AppQueryKeys.uri,
                  }}
                />
                <Box>
                  <Box
                    style={[
                      globalStyle.flexrow,
                      globalStyle.gap4,
                      globalStyle.alignItemsCenter,
                    ]}
                  >
                    <TextComponent
                      style={[
                        globalStyle.fontSize16,
                        globalStyle.fontInterMedium,
                        globalStyle.fontWeight500,
                      ]}
                    >
                      {ChangeCase.capitalCase(profileData?.username ?? "")}
                    </TextComponent>
                  </Box>
                  <TextComponent
                    style={[globalStyle.fontSize10]}
                    variant="gray"
                  >
                    {ChangeCase.capitalCase(profileData?.lastName ?? "")}&nbsp;
                    {ChangeCase.capitalCase(profileData?.firstName ?? "")}
                  </TextComponent>
                </Box>
              </Animated.View>
            </Box>
            <ScrollView showsVerticalScrollIndicator={true} bounces={true}>
              <Box style={[globalStyle.py2p4, globalStyle.gap8]}>
                {Array.from({ length: 12 }, (_, index) => (
                  <Box key={index}>
                    <Animated.View entering={FadeIn.delay(index * 100)}>
                      <PressableComponent
                        onPress={() => {
                          setShowDrawer(false);
                        }}
                        style={[
                          globalStyle.w10,
                          globalStyle.borderRadius,
                          globalStyle.p0p8,
                          globalStyle.flexrow,
                          globalStyle.alignItemsCenter,
                          globalStyle.gap8,
                        ]}
                      >
                        <Box
                          style={[
                            globalStyle.flexrow,
                            globalStyle.alignItemsCenter,
                            globalStyle.gap8,
                          ]}
                          flex={1}
                        >
                          <Box
                            style={[
                              {
                                width: 24,
                                aspectRatio: 1,
                                borderRadius: 24,
                              },
                              globalStyle.overflowHidden,
                            ]}
                            backgroundColor="primary500"
                          >
                            <ImageComponent
                              style={[globalStyle.w10, globalStyle.h10]}
                              source={{
                                uri: faker.image.url(),
                              }}
                            />
                          </Box>
                          <TextComponent style={[globalStyle.fontSize13]}>
                            {faker.internet.displayName()}
                          </TextComponent>
                        </Box>
                      </PressableComponent>
                    </Animated.View>
                  </Box>
                ))}
              </Box>
            </ScrollView>
          </SafeAreaView>
        </Animated.View>
      </Animated.View>
    </>
  );
};

export default DrawerComponent;
