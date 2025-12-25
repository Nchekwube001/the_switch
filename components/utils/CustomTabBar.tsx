import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
// import {PlatformPressable} from '@react-navigation/elements';
import HomeActive from "@/assets/svgs/HomeActive.svg";
import HomeInactive from "@/assets/svgs/HomeInactive.svg";
import { scale } from "@/constants/scale";
import { ChangeCase, Trigger } from "@/constants/utils";
import globalStyle from "@/globalstyle/globalStyle";
import { ImpactFeedbackStyle } from "expo-haptics";
import { FC, useState } from "react";
import { Pressable } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  useSharedValue,
  ZoomIn,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUnistyles } from "react-native-unistyles";
import Box from "../layout/Box";
type TCurrentTabLayout = Record<string, TTabLayout>;

type TTabLayout = {
  width: number;
  height: number;
  x: number;
  y: number;
};

const initialTabLayout = {
  width: 0,
  height: 0,
  x: 0,
  y: 0,
};
const AnimatedPlatformPressable = Animated.createAnimatedComponent(Pressable);

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { theme } = useUnistyles();

  const activeTabLayout = useSharedValue<TTabLayout>(initialTabLayout);
  const [layouts, setLayouts] = useState<TCurrentTabLayout>({});
  const [activeTab, setActiveTab] = useState("home");

  const handleLayout = (id: string, event: any, index: number) => {
    const { width, height, x, y } = event.nativeEvent.layout;
    // if (id === activeTab || index === 0) {
    //   activeTabLayout.value = {width, height, x, y};
    // }
    setLayouts((prevLayouts) => ({
      ...prevLayouts,
      [id]: { width, height, x, y },
    }));
  };
  const onHandlePress = (id: string) => {
    // activeTabLayout.value = withTiming(layouts[id]);
    setActiveTab(id);
  };
  return (
    <SafeAreaView
      edges={["bottom"]}
      style={[
        globalStyle.pb0p3,
        {
          backgroundColor: theme.colors.surfaceDefault,
        },
      ]}
    >
      <Box
        // layout={LinearTransition}
        style={[
          globalStyle.w10,
          globalStyle.center,
          globalStyle.py1,
          {
            flexDirection: "row",
            alignSelf: "center",
            bottom: 0,
            backgroundColor: theme.colors.surfaceDefault,
            borderTopWidth: 0.5,
            borderTopColor: theme.colors.neutral100,
          },
        ]}
      >
        {state.routes.map((route, index) => {
          if (["_sitemap", "+not-found"].includes(route.name)) {
            return null;
          }
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = (index: string) => {
            onHandlePress(index);

            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            Trigger.trigger(ImpactFeedbackStyle.Soft);
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          const color = isFocused
            ? theme.colors.textDefaultBody
            : theme.colors.textDefaultCaption;

          return (
            <Pressable
              hitSlop={12}
              key={route.name}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={() => {
                onPress(label as string);
              }}
              onLongPress={onLongPress}
              style={[
                // globalStyle.flexrow,
                globalStyle.center,
                globalStyle.flexOne,

                {
                  backgroundColor: "transparent",
                },
              ]}
            >
              <Box
                style={[
                  globalStyle.overflowHidden,
                  globalStyle.flexrow,

                  {
                    borderRadius: scale(48),
                  },
                ]}
              >
                <Box
                  style={[
                    globalStyle.center,
                    // globalStyle.br,
                    {
                      width: scale(48),
                      borderRadius: scale(48),
                      height: scale(32),
                    },
                  ]}
                  backgroundColor={isFocused ? "primary100" : undefined}
                >
                  <Box style={[]}>
                    <IconByRouteName
                      isFocused={isFocused}
                      routeName={route.name}
                    />
                    {/* {getIconByRouteName(route.name, isFocused)} */}
                  </Box>
                </Box>
              </Box>
              <Animated.Text
                entering={FadeIn.delay(50).duration(250)}
                exiting={FadeOut}
                style={[
                  globalStyle.fontSatoshiMedium,
                  globalStyle.pt0p4,
                  globalStyle.fontSize12,
                  {
                    color: color,
                  },
                ]}
              >
                {ChangeCase.capitalCase(label as string)}
              </Animated.Text>
            </Pressable>
          );
        })}
      </Box>
    </SafeAreaView>
  );
}
const IconByRouteName: FC<{
  routeName: string;
  isFocused: boolean;
}> = ({ isFocused, routeName }) => {
  if (routeName === "home") {
    if (isFocused) {
      return (
        <Animated.View entering={ZoomIn} exiting={FadeOut}>
          <HomeActive />
        </Animated.View>
      );
    }
    return <HomeInactive />;
  } else if (routeName === "profile") {
    if (isFocused) {
      return (
        <Animated.View entering={ZoomIn} exiting={FadeOut}>
          <ProfileIcon />
        </Animated.View>
      );
    }
    return <ProfileIcon />;
  } else return null;
};

const ProfileIcon = () => {
  return (
    <Box
      style={[
        {
          width: 24,
          aspectRatio: 1,
          borderRadius: 24,
        },
      ]}
      backgroundColor="primary500"
    ></Box>
  );
};
