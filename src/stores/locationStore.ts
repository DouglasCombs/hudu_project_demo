import {create} from 'zustand';

const locationStore = create<locationModalType>(set => {
  return {
    isVisibleLocationModal: false,
    setIsVisibleLocationModal: (isVisibleLocationModal: boolean) =>
      set(() => ({isVisibleLocationModal})),
  };
});

export default locationStore;
