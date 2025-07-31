import axios from 'axios';
import Config from 'react-native-config';
import {create} from 'zustand';
import {isAllowCountry} from '~/utils/helper';

export const stateStoreInitialState: stateTempDataType = {
  state: undefined,
  city: undefined,
  defaultState: undefined,
  location: undefined,
};

const fetchIp = async () => {
  try {
    const response = await axios
      .get(`https://ipinfo.io/?token=${Config.IPINFO_TOKEN}`)
      .then((res: any) => res?.data);
    return response;
  } catch (error) {
    throw error;
  }
};

const stateStore = create<stateStoreType>(async (set: any) => {
  try {
    const ipResponse = await fetchIp();
    let initialData = {};
    const country = ipResponse?.country;
    const state = ipResponse?.region;
    const [lat, long] = ipResponse?.loc.split(',').map(parseFloat);

    const tempCountry = isAllowCountry(country);
    if (tempCountry) {
      initialData = {
        ...stateStoreInitialState,
        state: {value: state},
        defaultState: {value: state},
        location: {
          lat,
          long,
        },
      };
    } else {
      initialData = {
        ...stateStoreInitialState,
      };
    }
    set(() => ({stateTempData: initialData}));
  } catch (error) {
    // console.error('Error setting initial state:', error);
  }

  return {
    stateTempData: stateStoreInitialState,
  };
});

export default stateStore;
