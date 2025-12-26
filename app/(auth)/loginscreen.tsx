import ButtonComponent from "@/components/buttons/Button";
import HeaderComponent from "@/components/header/HeaderComponent";
import Box from "@/components/layout/Box";
import MainLayoutComponent from "@/components/layout/MainLayoutComponent";
import TextInputComponent from "@/components/textInput/TextInputComponent";
import AlreadyHaveComponent from "@/components/utils/AlreadyHaveComponent";
import TitleText from "@/components/utils/TitleText";
import { trimString } from "@/constants/utils";
import globalStyle from "@/globalstyle/globalStyle";
import { AuthService } from "@/service/AuthService";
import { User } from "@/service/types";
import { useLoggedInStore } from "@/store/loginSlice";
import { useToastStore } from "@/store/toastStore";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";

type loginType = Pick<User, "username" | "password">;
const LoginScreen = () => {
  const { setLoggedInState } = useLoggedInStore();
  const { showToast } = useToastStore();
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<loginType>({
    defaultValues: {
      password: "",
      username: "",
    },
  });
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: loginType) => AuthService.logInFunction(data),
    onSuccess: (loginResponse) => {
      const user = loginResponse?.data?.[0];
      if (user.password !== getValues("password")) {
        showToast({
          message: "Invalid credentials",
          variant: "error",
        });
      } else if (user.password === getValues("password")) {
        setLoggedInState({
          userId: user?.id ?? "",
        });
        router.replace("/home");
      }
    },
  });
  const loginUser = (data: loginType) => {
    mutateAsync(data);
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
              value={trimString(value)}
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
              value={trimString(value)}
              onChangeText={onChange}
              title={"Password"}
              placeholder={"Password"}
              onBlur={onBlur}
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
        <AlreadyHaveComponent variant="register" />
      </Box>
    </MainLayoutComponent>
  );
};

export default LoginScreen;
