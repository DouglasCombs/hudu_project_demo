import React, {createRef, useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {verticalScale} from '~/utils/style';
import {MarkerIcon} from '~/assets/icons';
import {Box} from 'native-base';

const CustomMapView = ({location}: {location: any}) => {
  const mapRef = createRef<MapView>();

  const [locationData, setLocationData] = useState({
    Latitude: 41.499,
    Longitude: -93.499,
    latitudeDelta: 0.99,
    longitudeDelta: 0.99,
  });

  useEffect(() => {
    setLocationData({
      Latitude: location?.Latitude || 41.499,
      Longitude: location?.Longitude || -93.499,
      latitudeDelta: 0.99,
      longitudeDelta: 0.99,
    });
  }, [location]);

  return (
    <Box overflow="hidden" w="100%" borderRadius="lg" mb="20px">
      <MapView
        showsScale
        zoomEnabled
        ref={mapRef}
        scrollEnabled
        style={styles.map}
        showsUserLocation={false}
        showsMyLocationButton={false}
        initialRegion={{
          latitude: 41.499,
          longitude: -93.499,
          latitudeDelta: 0.99,
          longitudeDelta: 0.99,
        }}
        region={{
          latitude: parseFloat(locationData?.Latitude) || 41.499,
          longitude: parseFloat(locationData?.Longitude) || -93.499,
          latitudeDelta: 0.99,
          longitudeDelta: 0.99,
        }}>
        <Marker
          coordinate={{
            latitude: parseFloat(locationData?.Latitude) || 41.499,
            longitude: parseFloat(locationData?.Longitude) || -93.499,
          }}>
          <MarkerIcon />
        </Marker>
      </MapView>
    </Box>
  );
};

export default CustomMapView;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    borderRadius: 12,
    height: verticalScale(130),
  },
  map: {
    height: verticalScale(190),
    borderRadius: 12,
    width: '100%',
    flex: 1,
  },
});
