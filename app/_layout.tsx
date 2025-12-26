import ToastComponent from "@/components/toast/ToastComponent";
import { useDismissKeyboardOnBackground } from "@/hooks";
import { useToastStore } from "@/store/toastStore";
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import React, { useCallback, useEffect } from "react";
import BootSplash from "react-native-bootsplash";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-get-random-values";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function RootLayout() {
  useDismissKeyboardOnBackground();
  useEffect(() => {
    const init = async () => {};

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
    });
  }, []);
  const [fontsLoaded, fontError] = useFonts({
    "Inter-Bold": require("@/assets/fonts/Inter-Bold.ttf"),
    "Inter-ExtraLight": require("@/assets/fonts/Inter-ExtraLight.ttf"),
    "Inter-Light": require("@/assets/fonts/Inter-Light.ttf"),
    "Inter-Medium": require("@/assets/fonts/Inter-Medium.ttf"),
    "Inter-Regular": require("@/assets/fonts/Inter-Regular.ttf"),
    "Inter-SemiBold": require("@/assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Thin": require("@/assets/fonts/Inter-Thin.ttf"),
    "Satoshi-Bold": require("@/assets/fonts/Satoshi-Bold.otf"),
    "Satoshi-Light": require("@/assets/fonts/Satoshi-Light.otf"),
    "Satoshi-Medium": require("@/assets/fonts/Satoshi-Medium.otf"),
    "Satoshi-Regular": require("@/assets/fonts/Satoshi-Regular.otf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);
  const { showToast } = useToastStore();

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const queryClient = new QueryClient({
    mutationCache: new MutationCache({
      onSuccess: (_data, _variables, _context, mutation) => {
        const successMessage = mutation?.meta?.successMessage as string;

        const invalidateQuery = mutation?.meta?.invalidateQuery as string[];
        if (invalidateQuery) {
          invalidateQuery?.map((item) => {
            setTimeout(() => {
              queryClient.invalidateQueries({
                queryKey: [item],
              });
            }, 200);
          });
        }
        if (successMessage) {
          showToast({
            message: successMessage,
            variant: "success",
          });
        }
      },
    }),
  });
  return (
    <QueryClientProvider client={queryClient}>
      <KeyboardProvider>
        <GestureHandlerRootView>
          <SafeAreaProvider style={[{ flex: 1 }]}>
            <MainNavigation />
            <ToastComponent />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </KeyboardProvider>
    </QueryClientProvider>
  );
}

const MainNavigation = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "ios_from_right",
      }}
    />
  );
};
