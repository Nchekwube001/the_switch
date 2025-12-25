import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import {StateStorage} from 'zustand/middleware';

export const zustandStorage: StateStorage = AsyncStorage;
export const expoSecureStorage: StateStorage = {
  getItem: (name: string) => {
    return SecureStore.getItemAsync(name);
  },
  setItem: (name: string, value: string) => {
    return SecureStore.setItemAsync(name, value);
  },
  removeItem: (name: string) => {
    return SecureStore.deleteItemAsync(name);
  },
};
