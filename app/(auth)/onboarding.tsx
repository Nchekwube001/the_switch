import {
  Box,
  Button,
  globalStyle,
  ImageComponent,
  scale,
  TextComponent,
} from '@leetatech/ui-mobile';
import {ImpactFeedbackStyle} from 'expo-haptics';
import {router} from 'expo-router';
import React, {FC, useMemo, useState} from 'react';
import {ScrollView} from 'react-native';
import Animated, {
  interpolateColor,
  runOnJS,
  SharedValue,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StyleSheet, UnistylesRuntime} from 'react-native-unistyles';
import {useAnimatedTheme} from 'react-native-unistyles/reanimated';
import ArrowRight from '~/assets/svgs/ArrowRight.svg';
import {Trigger} from '~/constants/utils';
import {useOnboardingStore} from '~/store/isOnboardedSlice';

import onb1 from '~/assets/images/onb1.png';
import onb2 from '~/assets/images/onb2.png';
import onb3 from '~/assets/images/onb3.png';

const width = UnistylesRuntime.screen.width;
const Onboarding = () => {
  const scrollViewRef = useAnimatedRef<ScrollView>();
  const translateX = useSharedValue(0);

  const setAlreadyOnboarded = useOnboardingStore(
    state => state.setAlreadyOnboarded,
  );
  const [currIndex, setCurrndex] = useState(0);
  if (!currIndex) {
  }
  const newSliderOptions = useMemo(
    () => [
      {
        title: 'Select From Trusted Vendors Near You',
        subtitle:
          'Compare options, see prices, and choose who you want to buy from.',
        image: onb1,
      },
      {
        title: `Place Your ${'\n'}Refill Order Easily`,
        subtitle: 'Order gas in just a few taps, no calls or haggling needed.',
        image: onb2,
      },
      {
        title: `Track Your Delivery ${'\n'}in Real-Time`,
        subtitle:
          'Watch your order move from vendor to your doorstep with live updates.',
        image: onb3,
      },
    ],
    [],
  );
  const setActionIndex = (val: number) => {
    setCurrndex(val);
  };
  const trigger = () => {
    Trigger.trigger(ImpactFeedbackStyle.Soft);
  };
  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      let offset = Math.round(event.contentOffset.x / width);
      translateX.value = offset;
      runOnJS(setActionIndex)(offset);
      runOnJS(trigger)();
    },
  });
  const currentIndex = useDerivedValue(() => {
    return translateX.value;
  }, [translateX.value]);
  const {top, bottom} = useSafeAreaInsets();

  return (
    <Box
      backgroundColor="surface"
      style={[
        globalStyle.width,
        globalStyle.height,
        {
          paddingTop: top,
          paddingBottom: bottom > 0 ? bottom * 2 : scale(20),
        },
      ]}>
      <Box flex={1}>
        <Animated.ScrollView
          bounces={false}
          style={[globalStyle.flexOne]}
          showsHorizontalScrollIndicator={false}
          horizontal
          scrollEventThrottle={16}
          ref={scrollViewRef as any}
          onScroll={onScroll}
          pagingEnabled>
          {newSliderOptions.map(({title, image, subtitle}) => (
            <Box
              key={title}
              style={[
                globalStyle.center,
                globalStyle.flexOne,
                globalStyle.gap12,
                {
                  width,
                },
              ]}>
              <Box flex={1} style={[globalStyle.w10, globalStyle.center]}>
                <Box
                  style={[
                    globalStyle.h9,
                    globalStyle.w9,
                    globalStyle.borderRadius16,
                  ]}>
                  <ImageComponent
                    style={[globalStyle.w10, globalStyle.h10]}
                    source={image}
                  />
                </Box>
              </Box>
              <Box
                style={[
                  globalStyle.w10,
                  globalStyle.px1p6,
                  globalStyle.pt1p2,
                  globalStyle.justifyCenter,
                  globalStyle.alignItemsCenter,
                ]}>
                <Box style={[globalStyle.w8]}>
                  <TextComponent
                    style={[
                      globalStyle.fontSize22,
                      globalStyle.fontSatoshiBold,
                      globalStyle.textCenter,
                    ]}>
                    {title}
                  </TextComponent>
                  <Box style={[globalStyle.pt0p8]}>
                    <TextComponent
                      variantColor="textDefaultCaption"
                      style={[globalStyle.textCenter, globalStyle.fontSize14]}>
                      {subtitle}
                    </TextComponent>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Animated.ScrollView>
      </Box>
      <Box>
        <Box
          style={[
            globalStyle.flexrow,
            globalStyle.alignItemsCenter,
            globalStyle.justifyCenter,
            globalStyle.pt1p2,
          ]}>
          {newSliderOptions.map((_, index) => (
            <Box
              style={[
                index !== newSliderOptions.length - 1 && globalStyle.mr0p8,
              ]}
              key={index.toString()}>
              <DotIndicator currentIndex={currentIndex} index={index} />
            </Box>
          ))}
        </Box>
        <Box
          style={[
            globalStyle.px1p6,
            globalStyle.flexrow,
            globalStyle.gap16,
            globalStyle.pt2p4,
          ]}>
          <Box flex={0.25}>
            <Button
              variant="secondary"
              title={'Skip'}
              onPress={() => {
                setAlreadyOnboarded();
                router.push('/loginscreen');
              }}
            />
          </Box>
          <Box flex={0.75}>
            <Button
              icon={<ArrowRight />}
              title={'Get Started'}
              isRight
              onPress={() => {
                setAlreadyOnboarded();
                router.push('/loginscreen');
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export interface dotInterface {
  index: number;
  currentIndex: SharedValue<number>;
}
export const DotIndicator: FC<dotInterface> = ({currentIndex, index}) => {
  const theme = useAnimatedTheme();

  const ITEM_HEIGHT = 6;
  const ITEM_WIDTH_ACTIVE = 24;
  const ITEM_WIDTH_INACTIVE = 16;

  // 0 → inactive, 1 → active
  const activeProgress = useSharedValue(0);
  const widthSV = useSharedValue<number>(ITEM_WIDTH_INACTIVE);

  useDerivedValue(() => {
    const isActive = currentIndex.value === index;
    activeProgress.value = withTiming(isActive ? 1 : 0, {duration: 220});
    widthSV.value = withTiming(
      isActive ? ITEM_WIDTH_ACTIVE : ITEM_WIDTH_INACTIVE,
      {duration: 220},
    );
  }, [index]);

  const dotStyle = useAnimatedStyle(() => {
    const bg = interpolateColor(
      activeProgress.value,
      [0, 1],
      [
        theme.value.colors.surfaceDisabledDefault,
        theme.value.colors.primary500,
      ],
    );

    return {
      backgroundColor: bg,
      width: widthSV.value,
      height: ITEM_HEIGHT,
      borderRadius: ITEM_HEIGHT / 2,
    };
  });

  return <Animated.View style={dotStyle} />;
};

const onboardingStyle = StyleSheet.create({
  bottom: {bottom: scale(40)},
  top: {top: scale(40)},
  textTop: {top: scale(74)},
  indicHeight: {height: scale(3)},
});
export default Onboarding;
