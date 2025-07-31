import {useEffect, useState} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import queryKeys from '~/constants/queryKeys';
import cityList from '~/constants/cityList';
import Config from 'react-native-config';
import axios from 'axios';

export function useFetchIP() {
  const [locationData, setLocationData] = useState<IpType | null>(null);
  const [locationLoading, setLocationLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchIP = async () => {
      setLocationLoading(true);
      try {
        const res = await axios
          .get(`https://ipinfo.io/?token=${Config.IPINFO_TOKEN}`)
          .then(res => res.data);
        setLocationData(res);
        setLocationLoading(false);
      } catch (error) {
        setLocationLoading(false);
      }
    };

    fetchIP();
  }, []);

  return {locationData, locationLoading};
}

export const useGetLocationMutate = () => {
  return useMutation((zipCode: number) => getLocation(zipCode), {
    onSuccess: () => {},
    onError: () => {},
  });
};

export const useGetLocation = (options: any = {}) => {
  return useQuery(
    [queryKeys.getLocation, options],
    async () => {
      return getLocation(options);
    },
    {
      ...options,
    },
  );
};

export const getLocation = async (zipCode: number) => {
  const url = `https://api.promaptools.com/service/us/zip-lat-lng/get/?zip=${zipCode}&key=17o8dysaCDrgvlc`;
  let response = await fetch(url);
  let json = await response.json();
  return json;
};

const getCities = async (state: string) => {
  const cities = cityList[state];
  if (!cities) {
    throw new Error(`Invalid state: ${state}`);
  }
  return cities;
};

export const useUSCities = (state: string) => {
  return useQuery([queryKeys.getCities, state], () => getCities(state));
};
