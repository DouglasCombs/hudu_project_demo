import {VStack} from 'native-base';
import React, {memo, useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import {defaultState} from '~/constants/constants';
import {useGetUserAddresses} from '~/hooks/user';
import {height, scale, width} from '~/utils/style';
import CustomText from '../CustomText';

const defaultLongitudeDelta = 0.008;

const ProjectPreviewLocation = ({
  userId,
  addressId,
}: {
  addressId: number;
  userId: number;
}) => {
  const mapViewRef = useRef<MapView>();

  const {data} = useGetUserAddresses({
    userId: userId,
    where: {
      id: {eq: parseInt(addressId)},
    },
  });

  const location = data?.pages?.[0];

  useEffect(() => {
    if (location) {
      mapViewRef?.current?.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: defaultLongitudeDelta,
        longitudeDelta: defaultLongitudeDelta,
      });
    }
  }, [location]);

  return (
    <VStack
      space="2"
      w={width * 0.9}
      h={height * 0.2}
      alignSelf={'center'}
      pb="16"
      mt="0">
      {location ? (
        <>
          <CustomText style={{marginTop: 10}}>
            {location?.streetAddress}
          </CustomText>
          <CustomText>
            {location?.city}, {location?.state}, {location?.zipCode}
          </CustomText>
        </>
      ) : (
        <CustomText style={{marginTop: 10}}>No Address Added</CustomText>
      )}

      <MapView
        scrollEnabled={false}
        scrollDuringRotateOrZoomEnabled={false}
        pitchEnabled={false}
        style={styles.map}
        ref={mapViewRef}
        initialRegion={{
          latitude: defaultState.latitude,
          longitude: defaultState.longitude,
          latitudeDelta: defaultLongitudeDelta,
          longitudeDelta: defaultLongitudeDelta,
        }}
      />
    </VStack>
  );
};

export default memo(ProjectPreviewLocation);

const styles = StyleSheet.create({
  map: {
    height: scale(150),
    width: '100%',
    marginTop: 15,
  },
});
