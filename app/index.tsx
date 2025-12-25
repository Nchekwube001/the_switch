import {Redirect} from 'expo-router';
import React from 'react';
// import {View} from 'react-native';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import '~/i18n';
import {useOnboardingStore} from '~/store/isOnboardedSlice';
import {useLoggedInStore} from '~/store/loginSlice';
export default function Index() {
  const {loggedIn} = useLoggedInStore();
  const {alreadyOnboarded} = useOnboardingStore();

  return (
    <Redirect
      // href={'/loginscreen'}
      // href={'/home'}
      // href={'/onboarding'}
      // href={'/trackorder'}
      href={
        !loggedIn
          ? alreadyOnboarded
            ? '/loginscreen'
            : '/onboarding'
          : '/home'
      }
    />
  );
}
