import {HStack} from 'native-base';
import React, {useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ChevronLeft, LocationIcon} from '~/assets/icons';
import {
  CityMarkerItem,
  CustomContainer,
  CustomTouchable,
  ProjectsByCityModal,
} from '~/components';
import {useGetProjectsByCityFromMap} from '~/hooks/project';
import {goBack} from '~/navigation/Methods';
import {stateStore} from '~/stores';
import {Colors} from '~/styles';
import {requestLocationPermission} from '~/utils/getPermissions';
import {isIos} from '~/utils/helper';
import {
  defaultLatitudeDelta,
  defaultLongitudeDelta,
  getLocation,
} from '~/utils/utils';

export default function ProjectsOnMapScreen() {
  const mapRef = useRef<MapView>();

  const insets = useSafeAreaInsets();

  const userLocation = stateStore.getState().stateTempData?.location;
  const defaultLocation = {
    lat: userLocation?.lat ?? 41.902443,
    long: userLocation?.long ?? -93.45105,
  };

  const modalRef = useRef<ModalRef>(null);
  const [currentItem, setCurrentItem] = useState<any>();

  const {data: getProjectsByCity, isLoading: isLoadingGetProjectsByCity} =
    useGetProjectsByCityFromMap({pageSize: 3000});

  const projects = getProjectsByCity?.pages ?? [];

  const markerOnPress = (item: any) => {
    setCurrentItem(item);
    modalRef?.current?.open(item);
  };

  const onCloseModal = () => {
    setCurrentItem(undefined);
  };

  const goBackOnPress = () => {
    goBack();
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
          mapRef?.current?.animateToRegion(currentLocationObject, 10);
        }
      } catch (error) {}
    }
  };

  return (
    <CustomContainer
      isLoading={isLoadingGetProjectsByCity}
      statusBarBackgroundColor={Colors.WHITE}
      barStyle="dark-content"
      safeArea={false}>
      <HStack
        position="absolute"
        top={isIos ? `${insets.top}px` : `${insets.top + 24}px`}
        justifyContent="space-between"
        px="24px"
        w="100%"
        zIndex={10}>
        <CustomTouchable onPress={goBackOnPress} style={styles.icon}>
          <ChevronLeft />
        </CustomTouchable>
        <CustomTouchable onPress={findCurrentLocation} style={styles.icon}>
          <LocationIcon fillColor={Colors.WHITE_F} />
        </CustomTouchable>
      </HStack>
      <MapView
        // maxZoomLevel={15}
        zoomEnabled
        ref={mapRef}
        scrollEnabled
        style={styles.map}
        showsUserLocation={false}
        showsMyLocationButton={false}
        initialRegion={{
          latitude: defaultLocation?.lat,
          longitude: defaultLocation?.long,
          latitudeDelta: 0.99,
          longitudeDelta: 0.99,
        }}
        region={{
          latitude: defaultLocation?.lat,
          longitude: defaultLocation?.long,
          latitudeDelta: 0.99,
          longitudeDelta: 0.99,
        }}>
        {projects?.map((item: any) => {
          return (
            <CityMarkerItem
              key={item?.city}
              item={item}
              onPress={markerOnPress}
              currentItem={currentItem}
            />
          );
        })}
      </MapView>
      <ProjectsByCityModal ref={modalRef} onClose={onCloseModal} />
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    width: 44,
    borderRadius: 22,
    backgroundColor: Colors.Rhino,
  },
});
