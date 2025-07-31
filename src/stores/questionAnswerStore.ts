import {create} from 'zustand';

const questionAnswerStore = create(set => {
  return {
    parentId: null,
    setParentId: (parentId: number) => set(() => ({parentId})),
    resetParentId: () => set(() => ({parentId: null})),
  };
});

export default questionAnswerStore;
