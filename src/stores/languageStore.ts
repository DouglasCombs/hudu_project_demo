import AsyncStorage from '@react-native-async-storage/async-storage';
import {create, StateCreator} from 'zustand';
import {persist, PersistOptions, createJSONStorage} from 'zustand/middleware';

type languagePersist = (
  config: StateCreator<languageStoreType>,
  options: PersistOptions<languageStoreType>,
) => StateCreator<languageStoreType>;

export const languageStore = create<languageStoreType>(
  (persist as languagePersist)(
    set => ({
      currentLanguage: undefined,
      isRTL: false,
      languageTitle: undefined,
      setCurrentLanguage: (currentLanguage: languageType | undefined) =>
        set({currentLanguage}),
      setIsRTL: (isRTL: boolean) => set({isRTL}),
      setLanguageTitle: (languageTitle: languageTitleType | undefined) =>
        set({languageTitle}),
    }),
    {
      name: 'language-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default languageStore;
