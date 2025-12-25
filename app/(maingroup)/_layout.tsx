import { Stack } from "expo-router";

const AppLayout = () => {
  return (
    <>
      <AppStack />
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
