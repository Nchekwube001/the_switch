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
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const Register = () => {
  const { setLoggedInState } = useLoggedInStore();
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      password: "",
      username: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
  });
  const watchPhone = watch("phoneNumber");
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: User) => AuthService.registerFunction(data),
    onSuccess: (registerResponse) => {
      setLoggedInState({
        userId: registerResponse?.data?.id ?? "",
        loggedIn: true,
      });
      router.replace("/home");
    },
    meta: {
      successMessage: "Account created successfully",
    },
  });
  const createUser = (data: User) => {
    mutateAsync(data);
  };
  //    {"firstName": "unekwe", "id": "58", "lastName": "francis", "password": "P@ssword1", "phoneNumber": "08096296307", "username": "unekwe"}}
  return (
    <MainLayoutComponent>
      <Box style={[globalStyle.px2, globalStyle.gap16]}>
        <HeaderComponent />
        <TitleText title={"Welcome"} desc={"Create your account"} />

        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInputComponent
              value={trimString(value)}
              onChangeText={onChange}
              placeholder={"First Name"}
              title={"First Name"}
              onBlur={onBlur}
              errorText={errors?.firstName?.message}
            />
          )}
          rules={{
            required: {
              value: true,
              message: "First Name is required",
            },
          }}
        />
        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInputComponent
              value={trimString(value)}
              onChangeText={onChange}
              placeholder={"Last Name"}
              title={"Last Name"}
              onBlur={onBlur}
              errorText={errors?.lastName?.message}
            />
          )}
          rules={{
            required: {
              value: true,
              message: "Last Name is required",
            },
          }}
        />

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
          name="phoneNumber"
          render={({ field: { onChange, value } }) => (
            <TextInputComponent
              placeholder="Enter your phone number"
              title="Phone Number"
              keyboardType="number-pad"
              titleVariant="white"
              onChangeText={onChange}
              value={value}
              maxLength={11}
              errorText={errors?.phoneNumber?.message}
            />
          )}
          rules={{
            required: {
              value: true,
              message: "Phone number is required",
            },

            minLength: {
              value: watchPhone?.startsWith("0") ? 11 : 10,
              message: "Enter a valid Phone number",
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
          title="Proceed"
          onPress={handleSubmit(createUser)}
          loading={isPending}
        />
        <AlreadyHaveComponent variant="login" />
      </Box>
    </MainLayoutComponent>
  );
};

export default Register;
