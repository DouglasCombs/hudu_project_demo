import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './translations/en';
import sp from './translations/sp';
import {getData, storeData} from '~/services/storage';
import {languageStore} from '~/stores';
import {setDayjsLocale} from '~/utils/helper';

const resources = {
  en: {
    translation: en,
  },
  sp: {
    translation: sp,
  },
};

const supportedLanguageTypes = ['en', 'sp'];

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback: any) => {
    const language = await getData('currentLanguage');
    if (language && supportedLanguageTypes.includes(language)) {
      callback(language);
    } else {
      callback('en');
    }
  },

  init: () => {},
  cacheUserLanguage: (language: any) => {
    storeData('currentLanguage', language);
    languageStore.setState({currentLanguage: language});
    setDayjsLocale(language);
    switch (language) {
      case 'sp':
        languageStore.setState({languageTitle: 'spanish'});
        languageStore.setState({isRTL: false});
        break;
      default:
        languageStore.setState({languageTitle: 'english'});
        languageStore.setState({isRTL: false});
        break;
    }
  },
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    react: {
      useSuspense: false,
    },
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
