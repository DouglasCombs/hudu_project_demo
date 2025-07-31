import {create} from 'zustand';

const projectEditStore = create<projectEditTypeStore>(set => {
  return {
    isEdit: false,
    projectId: null,
    setIsEdit: (isEdit?: boolean) => set(() => ({isEdit})),
    setProjectId: (projectId?: number) => set(() => ({projectId})),
  };
});

export default projectEditStore;
