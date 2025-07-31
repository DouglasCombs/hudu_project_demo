import AsyncStorage from '@react-native-async-storage/async-storage';
import {create, StateCreator} from 'zustand';
import {persist, PersistOptions, createJSONStorage} from 'zustand/middleware';

type AuthPersist = (
  config: StateCreator<AuthStoreType>,
  options: PersistOptions<AuthStoreType>,
) => StateCreator<AuthStoreType>;

export const authStore = create<AuthStoreType>(
  (persist as AuthPersist)(
    set => ({
      token: undefined,
      isUserLoggedIn: false,
      isLoadingLogin: false,
      setIsLoadingLogin: (isLoadingLogin: boolean) => set({isLoadingLogin}),
      setIsUserLoggedIn: (isUserLoggedIn: boolean) => set({isUserLoggedIn}),
      setToken: (token: any) => set({token}),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default authStore;
