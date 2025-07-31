import {HStack, VStack} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Locate} from '~/assets/icons';
import {
  CustomButton,
  CustomContainer,
  CustomFloatActionButton,
  CustomGooglePlaceAutoComplete,
  CustomKeyboardAwareScrollView,
  CustomText,
  CustomTouchable,
  ScreensHeader,
} from '~/components';
import {defaultState} from '~/constants/constants';
import {goBack} from '~/navigation/Methods';
import {stateStore} from '~/stores';
import {Colors} from '~/styles';
import {requestLocationPermission} from '~/utils/getPermissions';
import {scale} from '~/utils/style';
import {
  defaultLatitudeDelta,
  defaultLongitudeDelta,
  getAddressAndLocalityAndStateAndZip,
  getLocation,
  showInfoMessage,
} from '~/utils/utils';

export default function SelectLocationScreen({route}: NavigationProp) {
  const {value, onChange} = route?.params;
  const currentLocationUser = route?.params?.currentLocation;
  const {t} = useTranslation();

  const mapViewRef = useRef<MapView>();

  const userLocation = stateStore.getState().stateTempData?.location;
  const defaultLocation = {
    latitude: userLocation?.lat ?? defaultState.latitude,
    longitude: userLocation?.long ?? defaultState.longitude,
  };

  const [region, setRegion] = useState({
    latitude: defaultState.latitude,
    longitude: defaultState.longitude,
    latitudeDelta: defaultLongitudeDelta,
    longitudeDelta: defaultLongitudeDelta,
  });
  const [selectedRegionAddress, setSelectedRegionAddress] = useState();
  const [selectedRegionState, setSelectedRegionState] = useState();
  const [selectedRegionCity, setSelectedRegionCity] = useState();
  const [selectedRegionZip, setSelectedRegionZip] = useState();

  useEffect(() => {
    if (value) {
      handleRegionChangeComplete(value);
    } else if (defaultLocation) {
      handleRegionChangeComplete(defaultLocation);
    }
  }, [value]);

  useEffect(() => {
    if (currentLocationUser) {
      const locationObject = {
        latitude: currentLocationUser.latitude,
        longitude: currentLocationUser.longitude,
        latitudeDelta: defaultLongitudeDelta,
        longitudeDelta: defaultLongitudeDelta,
      };
      mapViewRef?.current?.animateToRegion(locationObject);
    }
  }, [currentLocationUser]);

  const handleRegionChangeComplete = async (selectedRegion: any) => {
    const precision = 0.0001;
    if (
      Math.abs(region?.latitude - selectedRegion?.latitude) > precision ||
      Math.abs(region?.longitude - selectedRegion?.longitude) > precision
    ) {
      mapViewRef?.current?.animateToRegion(selectedRegion);
      await addAddress(selectedRegion);
      setRegion(selectedRegion);
    }
  };

  const findCurrentLocation = async () => {
    if (await requestLocationPermission()) {
      try {
        const currentLocation = await getLocation();
        if (currentLocation) {
          const currentLocationObject = {
            latitudeDelta: defaultLatitudeDelta,
            longitudeDelta: defaultLongitudeDelta,
            latitude: currentLocation?.lat,
            longitude: currentLocation?.lng,
          };
          mapViewRef?.current?.animateToRegion(currentLocationObject, 10);
          await addAddress(currentLocationObject);
          setRegion(currentLocationObject);
        }
      } catch (err) {}
    }
  };

  const addAddress = async (data: any) => {
    if (data) {
      try {
        const {address, city, state, zip} =
          await getAddressAndLocalityAndStateAndZip(
            data?.latitude ?? data?.lat,
            data?.longitude ?? data?.lon,
          );
        setSelectedRegionAddress(address);
        setSelectedRegionState(state);
        setSelectedRegionCity(city);
        setSelectedRegionZip(zip);
      } catch (error) {}
    }
  };

  const getSelectedAddress = (address: any) => {
    return address !== undefined
      ? address?.substring(0, address?.indexOf(','))
      : '...';
  };

  const onSelectLocation = async (details: any) => {
    const locationObject = {
      latitude: details?.lat,
      longitude: details?.lon,
      latitudeDelta: details?.latitudeDelta,
      longitudeDelta: details?.longitudeDelta,
    };
    mapViewRef?.current?.animateToRegion(locationObject);
    await addAddress(locationObject);
    setRegion(locationObject);
  };

  const markerOnPress = () => {};

  const onChangeHandler = () => {
    if (selectedRegionAddress) {
      onChange({
        region: region,
        address: selectedRegionAddress,
        city: selectedRegionCity,
        state: selectedRegionState,
        zipCode: selectedRegionZip,
      });
      goBack();
    } else {
      showInfoMessage(t('messages.errors.selectAddressPrompt'));
    }
  };

  return (
    <CustomContainer pb={0}>
      <CustomKeyboardAwareScrollView
        contentContainerStyle={styles.contentContainerStyle}>
        <ScreensHeader backAction title={t('location.selectLocation')} />
        <MapView
          ref={mapViewRef}
          style={styles.map}
          initialRegion={{
            latitude: defaultState.latitude,
            longitude: defaultState.longitude,
            latitudeDelta: defaultLongitudeDelta,
            longitudeDelta: defaultLongitudeDelta,
          }}
          onRegionChangeComplete={handleRegionChangeComplete}
        />
        <CustomGooglePlaceAutoComplete onSelect={onSelectLocation} />
        <HStack
          position="absolute"
          top="180px"
          alignSelf="center"
          px="2"
          py="1"
          rounded="sm"
          bg={Colors.BLACK_TRANSPARENT_2}>
          <CustomText color={Colors.WHITE_F}>
            {getSelectedAddress(selectedRegionAddress)}
          </CustomText>
        </HStack>
        <CustomTouchable
          disabled
          style={styles.markerContainer}
          onPress={markerOnPress}>
          <Ionicons
            name="location-sharp"
            size={scale(56)}
            color={Colors.RED_LOVE}
          />
        </CustomTouchable>
        <CustomFloatActionButton
          size="34px"
          bottom="88px"
          customIcon={<Locate />}
          onPress={findCurrentLocation}
          backgroundColor={Colors.Rhino}
        />
        <VStack alignSelf="center" position="absolute" mx="24px" bottom="24px">
          <CustomButton
            width={'120px'}
            onPress={onChangeHandler}
            title={t('common.select')}
          />
        </VStack>
      </CustomKeyboardAwareScrollView>
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  markerContainer: {
    position: 'absolute',
    left: '50%',
    marginLeft: -28, // = markerSize / 2
    marginTop: -28, // = markerSize / 2
    top: '50%',
    zIndex: 0,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
});
