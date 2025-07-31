import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import Geolocation from 'react-native-geolocation-service';
import {useQuery} from '@tanstack/react-query';
import queryKeys from '~/constants/queryKeys';
import {
  Map_GetDistanceQuery,
  Map_GetDistanceQueryVariables,
} from '~/generated/graphql';
import {fetcher} from '~/graphql/graphQLClient';
import {MAP_GET_DISTANCE} from '~/graphql/map/queries';
import {stateStore} from '~/stores';
import {stateStoreInitialState} from '~/stores/stateStore';
import {
  getAddressAndLocalityAndStateAndZip,
  showErrorMessage,
} from '~/utils/utils';

export const useGetMyStateLocation = (aState, navigation) => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const {t} = useTranslation();

  useEffect(() => {
    setLoading(true);

    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude} = position.coords;
        try {
          const {state} = await getAddressAndLocalityAndStateAndZip(
            latitude ?? latitude,
            longitude ?? longitude,
          );

          switch (state) {
            case 'IA':
              stateStore.setState({
                stateTempData: {
                  state: {
                    title: 'Iowa',
                    value: 'IA',
                    Latitude: 42.032974,
                    Longitude: -93.581543,
                    enabled: true,
                  },
                },
              });

              break;
            case 'TX':
              stateStore.setState({
                stateTempData: {
                  state: {
                    title: 'Texas',
                    value: 'TX',
                    Latitude: 31.0,
                    Longitude: -100.0,
                    enabled: true,
                  },
                },
              });

              break;

            default:
              stateStore.setState({stateTempData: stateStoreInitialState});
              showErrorMessage(t('alerts.addressAlerts'));

              break;
          }
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      },
      (error: any) => {
        setError(error);
        setLoading(false);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, [aState, navigation]);

  return {isLoading, error};
};

export const useGetDistance = (options: any = {}) => {
  return useQuery<
    Map_GetDistanceQuery,
    any,
    Map_GetDistanceQueryVariables,
    any
  >(
    [queryKeys.getDistance, options],
    async () => {
      return fetcher(MAP_GET_DISTANCE, options)();
    },
    {
      ...options,
    },
  );
};
