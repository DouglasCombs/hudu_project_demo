import {Location} from 'iconsax-react-native';
import {VStack} from 'native-base';
import React, {memo, useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {CustomText} from '~/components';
import {defaultState} from '~/constants/constants';
import {Colors} from '~/styles';
import {verticalScale, fontSize} from '~/utils/style';
import {defaultLatitudeDelta, defaultLongitudeDelta} from '~/utils/utils';

const LocationViewer = ({
  longitude,
  latitude,
  address,
  showAddress = true,
}: {
  longitude: any;
  latitude: any;
  address?: string;
  showAddress?: boolean;
}) => {
  const mapViewRef = useRef<MapView>();

  useEffect(() => {
    if (longitude && latitude) {
      mapViewRef?.current?.animateToRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: defaultLatitudeDelta,
        longitudeDelta: defaultLongitudeDelta,
      });
    }
  }, [longitude, latitude]);

  return (
    <VStack w={'100%'} alignSelf={'center'}>
      {showAddress && (
        <CustomText fontSize={fontSize.small} marginTop={10}>
          {address}
        </CustomText>
      )}
      <MapView
        style={styles.map}
        maxZoomLevel={showAddress ? undefined : 8}
        ref={mapViewRef}
        initialRegion={{
          latitude: latitude ?? defaultState.latitude,
          longitude: longitude ?? defaultState.longitude,
          latitudeDelta: defaultLatitudeDelta,
          longitudeDelta: defaultLongitudeDelta,
        }}>
        {showAddress && (
          <Marker
            coordinate={{
              latitude: latitude ?? defaultState.latitude,
              longitude: longitude ?? defaultState.longitude,
            }}>
            <Location size="28" color={Colors.ERROR} variant="Bold" />
          </Marker>
        )}
      </MapView>
    </VStack>
  );
};

export default memo(LocationViewer);

const styles = StyleSheet.create({
  map: {
    height: verticalScale(227),
    width: '100%',
    marginTop: 15,
    borderRadius: 8,
  },
});
