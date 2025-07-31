import AsyncStorage from '@react-native-async-storage/async-storage';
import {create, StateCreator} from 'zustand';
import {persist, PersistOptions, createJSONStorage} from 'zustand/middleware';

type ListerPersist = (
  config: StateCreator<listerStoreType>,
  options: PersistOptions<listerStoreType>,
) => StateCreator<listerStoreType>;

const listerStore = create<listerStoreType>(
  (persist as ListerPersist)(
    set => ({
      skipList: [],
      setSkipList: (skipList: any) => set({skipList}),
    }),
    {
      name: 'lister-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default listerStore;
