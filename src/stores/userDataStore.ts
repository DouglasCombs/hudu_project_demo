import AsyncStorage from '@react-native-async-storage/async-storage';
import {create, StateCreator} from 'zustand';
import {persist, PersistOptions, createJSONStorage} from 'zustand/middleware';

type UserDataPersist = (
  config: StateCreator<userDataStoreType>,
  options: PersistOptions<userDataStoreType>,
) => StateCreator<userDataStoreType>;

export const userDataStore = create<userDataStoreType>(
  (persist as UserDataPersist)(
    set => ({
      userData: {},
      isOnboardingViewed: false,
      lastConversationId: undefined,
      isOnboardingCreateProject: false,
      isOnboardingPinnedCategories: false,
      outOfRangeViewed: false,
      groupConversationId: undefined,
      setUserData: (userData: any) => set({userData}),
      setIsOnboardingViewed: (isOnboardingViewed: boolean) =>
        set({isOnboardingViewed}),
      setLastConversationId: (lastConversationId: number | undefined) =>
        set({lastConversationId}),
      setIsOnboardingCreateProject: (isOnboardingCreateProject: boolean) =>
        set({isOnboardingCreateProject}),
      setIsOnboardingPinnedCategories: (
        isOnboardingPinnedCategories: boolean,
      ) => set({isOnboardingPinnedCategories}),
      setOutOfRangeViewed: (outOfRangeViewed: boolean) =>
        set({outOfRangeViewed}),
      setGroupConversationId: (groupConversationId: number | undefined) =>
        set({groupConversationId}),
    }),
    {
      name: 'userData-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default userDataStore;
