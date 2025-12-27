import DrawerComponent from "@/components/utils/DrawerComponent";
import { Stack } from "expo-router";

const AppLayout = () => {
  return (
    <>
      <AppStack />
      <DrawerComponent />
    </>
  );
};

export const AppStack = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    />
  );
};

export default AppLayout;
