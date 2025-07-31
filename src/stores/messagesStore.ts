import {create} from 'zustand';

const messagesStore = create<messagesStoreType>(set => {
  return {
    user: undefined,
    setUser: (user?: any) => set(() => ({user})),
    resetMessageStore: () => set(() => ({user: undefined})),
  };
});

export default messagesStore;
