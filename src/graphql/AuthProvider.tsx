import * as React from 'react';
import {isProduction} from '~/utils/helper';
import {MutationCache, QueryCache, QueryClient} from '@tanstack/react-query';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {createSyncStoragePersister} from '@tanstack/query-sync-storage-persister';
import {MMKV} from 'react-native-mmkv';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 60 * 24,
    },
  },
  queryCache: new QueryCache({
    onError: (error: any) => {
      !isProduction && console.log('queryCacheError=> ', error);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: any) => {
      !isProduction && console.log('mutationCacheError=> ', error);
    },
  }),
});

export default function AuthProvider({children}: {children: React.ReactNode}) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{persister: clientPersister}}>
      {children}
    </PersistQueryClientProvider>
  );
}

const storage = new MMKV({
  id: 'react-query-persist-storage',
  encryptionKey: 'hunter2',
});

const clientStorage = {
  setItem: (key: any, value: any) => {
    storage.set(key, value);
  },
  getItem: (key: any) => {
    const value = storage.getString(key);
    return value === undefined ? null : value;
  },
  removeItem: (key: any) => {
    storage.delete(key);
  },
};

export const clientPersister = createSyncStoragePersister({
  storage: clientStorage,
});
