import {create} from 'zustand';

const academyLangStore = create<academyLangType>(set => {
  return {
    indexLang: 0,
    setIndexLang: (indexLang: number) => set(() => ({indexLang})),
  };
});

export default academyLangStore;
