import {create} from 'zustand';

const initialState: bidStoreDataType = {
  flow: 'placeBid',
  questions: undefined,
  description: undefined,
  bidAmount: undefined,
  bids: undefined,
  projectData: undefined,
  projectId: undefined,
  currentBid: undefined,
};

const bidStore = create<bidStoreType>(set => {
  return {
    bidTempData: initialState,
    setBidTempData: (bidTempData: bidStoreDataType) =>
      set(() => ({bidTempData})),
    resetBidStore: () => set(() => ({bidTempData: initialState})),
  };
});

export default bidStore;
