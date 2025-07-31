import {HStack} from 'native-base';
import React, {useEffect, useState, memo} from 'react';
import {LocationIcon} from '~/assets/icons';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';
import {getMiles, getStateNameFromShortName} from '~/utils/helper';
import {useGetDistance} from '~/hooks/map';
import {requestLocationPermission} from '~/utils/getPermissions';
import Geolocation from 'react-native-geolocation-service';
import {showErrorMessage} from '~/utils/utils';
import {CustomText} from '~/components';

const SectionAddressDistance = ({
  data,
  location,
  listerAccess,
}: {
  data: any;
  location: any;
  listerAccess: boolean;
}) => {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 12,
    longitude: 12,
    latitudeDelta: 0.01,
    longitudeDelta: 0.091,
  });

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    if (await requestLocationPermission()) {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setCurrentLocation({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.091,
          });
        },
        (error: any) => {
          showErrorMessage(JSON.stringify(error));
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  const getDistanceOptions = {
    destination: `${location?.Latitude},${location?.Longitude}`,
    origin: `${currentLocation?.latitude}, ${currentLocation?.longitude}`,
  };

  const {data: getDistance, isLoading: isLoadingGetDistance} =
    useGetDistance(getDistanceOptions);

  const distance = getDistance?.map_getDistance?.distance?.value;

  return (
    <HStack alignItems="center" justifyContent="space-between">
      <HStack flex={1} alignItems="center" space="1">
        <LocationIcon />
        <CustomText flex={1} fontSize={fontSize.medium} color={Colors.PRIMARY}>
          {data?.city}
          {', '}
          {getStateNameFromShortName(data?.state) !== -1
            ? `${getStateNameFromShortName(data?.state)}`
            : ''}
        </CustomText>
      </HStack>
      {distance && !listerAccess && (
        <CustomText fontSize={fontSize.medium} color={Colors.BLACK_3}>
          {getMiles(distance) + ' miles'}
        </CustomText>
      )}
    </HStack>
  );
};

export default memo(SectionAddressDistance);
