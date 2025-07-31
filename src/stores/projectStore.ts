import {create} from 'zustand';

const projectStore = create<projectStore>(set => {
  return {
    projectData: {},
    setProjectData: (projectData: any) => set({projectData}),
  };
});

export default projectStore;
