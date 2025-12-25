import {
  Box,
  Button,
  globalStyle,
  MainLayoutComponent,
  OtpBox,
  PressableComponent,
  TextComponent,
  TextInputComponent,
  TitleText,
} from '@leetatech/ui-mobile';
import {Controller, useForm} from 'react-hook-form';

import {useMutation} from '@tanstack/react-query';
import {router} from 'expo-router';
import React, {useEffect, useState} from 'react';
import {KeyboardStickyView} from 'react-native-keyboard-controller';
import Animated, {
  FadeIn,
  FadeOut,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';
import {getDevice} from '~/constants/utils';
import {AuthService} from '~/service/AuthService';
import {sendLoginOtpParams, verifyLoginOtpParams} from '~/service/types';
import {useLoggedInStore} from '~/store/loginSlice';

export const otpLength = 4;

const LoginScreen = () => {
  const [step, setStep] = useState(1);
  const {setLoggedInState} = useLoggedInStore();

  const {
    handleSubmit,
    control,
    formState: {errors},
    watch,
    setValue,
    trigger,
  } = useForm<{phone_number: string; code: string}>({
    defaultValues: {
      phone_number: '',
      code: '',
    },
  });
  const watchPhone = watch('phone_number');
  const watchCode = watch('code');
  const {mutateAsync, isPending} = useMutation({
    mutationFn: (data: sendLoginOtpParams) =>
      AuthService.sendLoginOtpFunction(data),
    onSuccess: () => {
      setStep(2);
    },
    meta: {
      successTitle: 'OTP sent to your phone number',
    },
  });
  const {mutateAsync: mutateAsyncVerify, isPending: isPendingVerify} =
    useMutation({
      mutationFn: (data: verifyLoginOtpParams) =>
        AuthService.verifyLoginOtpFunction(data),
      onSuccess: verifyRes => {
        const {token, refresh_token} = verifyRes?.data?.body;
        if (token) {
          setLoggedInState({
            access_token: token,
            loggedIn: true,
            refresh_token,
          });
          setTimeout(() => {
            router.replace('/home');
          }, 50);
        }
      },
      onError: () => {},
      onSettled: () => {
        setValue('code', '');
      },
      // meta: {
      //   successMessage: 'Login Successfully',
      // },
    });
  const onPress = () => {
    if (step === 1) {
      mutateAsync({
        device_id: getDevice(),
        phone_number: watchPhone,
        user_type: 'customer',
      });
    } else if (step === 2) {
      mutateAsyncVerify({
        phone_number: watchPhone,
        code: watchCode,
      });
    }
  };

  useEffect(() => {
    if (step === 2 && watchCode.length === 4) {
      mutateAsyncVerify({
        phone_number: watchPhone,
        code: watchCode,
      });
    }
  }, [mutateAsyncVerify, step, watchCode, watchPhone]);

  return (
    <MainLayoutComponent lightBar scrollEnabled={false}>
      <Box flex={1} style={[globalStyle.py2, globalStyle.px2]}>
        <Animated.View
          key={`${step}-title`}
          entering={ZoomIn}
          exiting={ZoomOut}>
          <TitleText
            isCenter
            title={step === 1 ? 'Welcome Back' : 'Verify Your Phone Number'}
            desc={
              step === 1
                ? "Let's get you signed back in."
                : 'Please enter the 4-digit code we sent to your phone number.'
            }
          />
        </Animated.View>
        <Animated.View
          style={[globalStyle.flexOne]}
          entering={FadeIn.delay(200)}
          exiting={FadeOut}
          key={step}>
          {step === 1 && (
            <Box flex={1} style={[globalStyle.justifyBetween]}>
              <Box style={[globalStyle.pt3p6]}>
                <Controller
                  control={control}
                  name="phone_number"
                  render={({field: {onChange, value}}) => (
                    <TextInputComponent
                      placeholder="Enter your phone number"
                      title="Phone Number"
                      keyboardType="number-pad"
                      titleVariant="white"
                      onChangeText={onChange}
                      value={value}
                      maxLength={11}
                      errorText={errors?.phone_number?.message}
                    />
                  )}
                  rules={{
                    required: {
                      value: step === 1,
                      message: 'Phone number is required',
                    },

                    minLength: {
                      value: watchPhone?.startsWith('0') ? 11 : 10,
                      message: 'Enter a valid Phone number',
                    },
                  }}
                />
              </Box>
              <KeyboardStickyView style={[globalStyle.gap12]}>
                <Button
                  loading={isPending}
                  title="Log in"
                  onPress={handleSubmit(onPress)}
                />

                <Box style={[globalStyle.center]}>
                  <TextComponent style={[globalStyle.fontSize12]}>
                    By signing up, you agree to Leeta&apos;s
                  </TextComponent>
                  <Box
                    style={[globalStyle.flexrow, globalStyle.alignItemsCenter]}>
                    <PressableComponent>
                      <TextComponent
                        style={[globalStyle.fontSize12]}
                        variantColor="primary500">
                        Terms & Conditions
                      </TextComponent>
                    </PressableComponent>
                    <TextComponent style={[globalStyle.fontSize12]}>
                      &nbsp;and&nbsp;
                    </TextComponent>
                    <PressableComponent>
                      <TextComponent
                        style={[globalStyle.fontSize12]}
                        variantColor="primary500">
                        Privacy Policy
                      </TextComponent>
                    </PressableComponent>
                  </Box>
                </Box>
              </KeyboardStickyView>
            </Box>
          )}
          {step === 2 && (
            <Box flex={1} style={[]}>
              <Box style={[globalStyle.pt3p6]}>
                <>
                  <Controller
                    control={control}
                    name="code"
                    rules={{
                      required: {
                        value: step === 2,
                        message: 'Enter your OTP',
                      },
                      minLength: {
                        value: otpLength,
                        message: `OTP should be ${otpLength} digits`,
                      },
                    }}
                    render={({field: {value}}) => (
                      <Box>
                        <OtpBox
                          title="Enter OTP"
                          code={value ?? ''}
                          length={otpLength}
                          onResendPress={() => {}}
                          errorText={errors?.code?.message}
                          setCode={
                            ((code: string) => {
                              setValue('code', code);
                              trigger('code');
                            }) as any
                          }
                        />
                      </Box>
                    )}
                  />

                  <Box style={[globalStyle.pt4, globalStyle.gap16]}>
                    <Button
                      loading={isPendingVerify}
                      title="Verify My Phone Number"
                      onPress={handleSubmit(onPress)}
                    />
                    <PressableComponent
                      style={[globalStyle.center, globalStyle.inputHeight]}
                      onPress={() => setStep(1)}>
                      <TextComponent style={[]} variantColor="primary500">
                        Go Back
                      </TextComponent>
                    </PressableComponent>
                  </Box>
                </>
              </Box>
            </Box>
          )}
        </Animated.View>
      </Box>
    </MainLayoutComponent>
  );
};

export default LoginScreen;
