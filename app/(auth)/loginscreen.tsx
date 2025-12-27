import FaceID from "@/assets/svgs/FaceID.svg";
import ButtonComponent from "@/components/buttons/Button";
import HeaderComponent from "@/components/header/HeaderComponent";
import Box from "@/components/layout/Box";
import MainLayoutComponent from "@/components/layout/MainLayoutComponent";
import PressableComponent from "@/components/pressable/PressableComponent";
import TextInputComponent from "@/components/textInput/TextInputComponent";
import AlreadyHaveComponent from "@/components/utils/AlreadyHaveComponent";
import TitleText from "@/components/utils/TitleText";
import { LocalAuthentication, trimString } from "@/constants/utils";
import globalStyle from "@/globalstyle/globalStyle";
import { AuthService } from "@/service/AuthService";
import { User } from "@/service/types";
import { useLoggedInStore } from "@/store/loginSlice";
import { useToastStore } from "@/store/toastStore";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";

interface loginType extends Pick<User, "username" | "password"> {
  isFingerprint?: boolean;
}
const LoginScreen = () => {
  const { setLoggedInState, username } = useLoggedInStore();
  const { showToast } = useToastStore();
  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<loginType>({
    defaultValues: {
      password: "",
      username: "",
    },
  });
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: loginType) => AuthService.logInFunction(data),
    onSuccess: (loginResponse, payload) => {
      const user = loginResponse?.data?.[0];
      if (!payload.isFingerprint && user.password !== getValues("password")) {
        showToast({
          message: "Invalid credentials",
          variant: "error",
        });
      } else if (
        payload.isFingerprint ||
        user.password === getValues("password")
      ) {
        setLoggedInState({
          userId: user?.id ?? "",
          loggedIn: true,
          username: user?.username ?? "",
        });
        router.replace("/home");
      }
    },
  });
  const loginUser = (data: loginType) => {
    mutateAsync(data);
  };
  const openAuth = async () => {
    try {
      const auth = await LocalAuthentication.authenticateAsync();
      if (auth.success) {
        mutateAsync({
          username,
          isFingerprint: true,
          password: "",
        });
      }
    } catch {}
  };
  return (
    <MainLayoutComponent>
      <Box style={[globalStyle.px2, globalStyle.gap16]}>
        <HeaderComponent />
        <TitleText title={"Welcome Back"} desc={"Let's get you back in"} />

        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInputComponent
              value={trimString(value ?? "")}
              onChangeText={onChange}
              title={"Username"}
              placeholder={"Username"}
              onBlur={onBlur}
              errorText={errors?.username?.message}
            />
          )}
          rules={{
            required: {
              value: true,
              message: "Username is required",
            },
          }}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInputComponent
              value={trimString(value ?? "")}
              onChangeText={onChange}
              title={"Password"}
              placeholder={"Password"}
              onBlur={onBlur}
              variant="password"
              errorText={errors?.password?.message}
            />
          )}
          rules={{
            required: {
              value: true,
              message: "Password is required",
            },
          }}
        />
        <ButtonComponent
          title="Login"
          onPress={handleSubmit(loginUser)}
          loading={isPending}
        />
        {username && (
          <Box style={[globalStyle.center]}>
            <PressableComponent onPress={openAuth}>
              {<FaceID />}
            </PressableComponent>
          </Box>
        )}
        <AlreadyHaveComponent variant="register" />
      </Box>
    </MainLayoutComponent>
  );
};

export default LoginScreen;
