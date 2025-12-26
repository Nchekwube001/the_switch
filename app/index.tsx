import { useLoggedInStore } from "@/store/loginSlice";
import { Redirect } from "expo-router";
import React from "react";
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
export default function Index() {
  const { loggedIn } = useLoggedInStore();
  return <Redirect href={!loggedIn ? "/onboarding" : "/home"} />;
}
