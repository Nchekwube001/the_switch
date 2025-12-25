import CustomTabBar from "@/components/utils/CustomTabBar";
import globalStyle from "@/globalstyle/globalStyle";
import { Tabs } from "expo-router";
import React from "react";
import { useUnistyles } from "react-native-unistyles";

export default function TabRootLayout() {
  return (
    <>
      <TabsLayout />
    </>
  );
}
function TabsLayout() {
  const { theme } = useUnistyles();

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: [globalStyle.fontSize10, globalStyle.fontWeight500],
        tabBarActiveTintColor: theme.colors.success800,
        tabBarInactiveTintColor: theme.colors.green100,
      }}
    >
      <Tabs.Screen name="home" />
    </Tabs>
  );
}
