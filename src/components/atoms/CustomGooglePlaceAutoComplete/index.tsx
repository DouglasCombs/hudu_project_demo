import {HStack} from 'native-base';
import React, {useRef} from 'react';
import {StyleSheet} from 'react-native';
import Geocoder from 'react-native-geocoding';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {Colors} from '~/styles';
import {fontFamily, fontSize, scale} from '~/utils/style';
import CustomTouchable from '../CustomTouchable';
import {View} from 'react-native';
import Config from 'react-native-config';

const defaultLatitudeDelta = 0.03;
const defaultLongitudeDelta = 0.02;

export default function CustomGooglePlaceAutoComplete(props: {
  placeholder?: string;
  onSelect?: any;
}) {
  const {placeholder = 'Search...', onSelect} = props;

  const googlePlaceAutoCompleteRef = useRef<GooglePlacesAutocomplete>(null);

  const onClear = () => {
    googlePlaceAutoCompleteRef?.current?.setAddressText('');
    googlePlaceAutoCompleteRef?.current?.clear();
  };

  const onPressHandler = async (address: any) => {
    const coordJson = await Geocoder.from(address.description);
    const newCoords = coordJson?.results?.[0]?.geometry?.location;
    const region = {
      latitudeDelta: defaultLatitudeDelta,
      longitudeDelta: defaultLongitudeDelta,
      address: address.description,
      lat: newCoords.lat,
      lon: newCoords.lng,
    };
    onSelect?.(region);
  };

  return (
    <HStack
      zIndex={999}
      px="2"
      space="1"
      rounded="sm"
      bg={Colors.WHITE_F}
      position="absolute"
      top="100px"
      mx="24px">
      <View style={styles.searchIcon}>
        <AntDesignIcon name="search1" color={Colors.Topaz} size={scale(16)} />
      </View>
      <GooglePlacesAutocomplete
        ref={googlePlaceAutoCompleteRef}
        placeholder={placeholder}
        onPress={onPressHandler}
        minLength={1}
        autoFocus={false}
        isRowScrollable={false}
        enablePoweredByContainer={false}
        nearbyPlacesAPI="GooglePlacesSearch"
        fetchDetails
        query={{
          key: Config.GOOGLE_MAPS_API_KEY,
          language: 'en',
          components: 'country:us',
        }}
        GooglePlacesDetailsQuery={{
          fields: 'formatted_address',
        }}
        textInputProps={{
          clearButtonMode: 'never',
        }}
        styles={{
          textInput: styles.textInput,
          listView: styles.listView,
        }}
      />
      <CustomTouchable onPress={onClear} style={styles.clearIcon}>
        <AntDesignIcon
          name="closecircle"
          color={Colors.Topaz}
          size={scale(16)}
        />
      </CustomTouchable>
    </HStack>
  );
}

const styles = StyleSheet.create({
  clearIcon: {
    height: 43,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    height: 43,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listView: {
    backgroundColor: Colors.WHITE_F,
    borderRadius: 8,
    width: '100%',
  },
  textInput: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.normal,
    color: Colors.BLACK,
  },
});
