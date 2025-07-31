import Config from 'react-native-config';
import {create} from 'zustand';
import {storeData} from '~/services/storage';

const tempStore = create<tempStoreType>(async (set: any) => {
  let apiUrl = Config.API_URL;
  await storeData('API_URL', apiUrl);
  return {
    apiUrl: Config.API_URL,
    referralCode: undefined,
    flagTexts: undefined,
  };
});

export default tempStore;

/*

import axios from 'axios';

const fetchUrl = async (env: 'PRD' | 'QA' | 'DEV' | 'STG') => {
  return axios.post(`https://geturl.heyhudu.com/Url/getUrl?env=${env}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
};


  if (Config.ENVIRONMENT === 'PRD') {
    try {
      const response = await fetchUrl(Config.ENVIRONMENT);
      if (response?.data) {
        apiUrl = response?.data;
        await storeData('API_URL', response?.data);
      } else {
        await storeData('API_URL', Config.API_URL);
      }
      set(() => ({apiUrl}));
    } catch (error) {
      console.error('Error setting initial state:', error);
    }
  } else {
    await storeData('API_URL', apiUrl);
  }

*/
