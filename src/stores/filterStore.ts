import {create} from 'zustand';
import {ProjectStatus} from '~/generated/graphql';

const initialState: filterTempDataType = {
  category: undefined,
  status: [
    {
      value: ProjectStatus.Bidding,
      title: 'Bidding',
    },
  ],
  time: undefined,
  sort: undefined,
};

const filterStore = create<filterStoreType>(set => {
  return {
    filterTempData: initialState,
    setFilterTempData: (filterTempData: filterTempDataType) =>
      set(() => ({filterTempData})),
    resetFilterTempData: () => set(() => ({filterTempData: initialState})),
  };
});

export default filterStore;
