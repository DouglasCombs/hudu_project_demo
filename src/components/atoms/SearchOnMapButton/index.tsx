import React from 'react';
import {Map} from '~/assets/icons';
import {CustomFloatActionButton} from '~/components';
import {navigate} from '~/navigation/Methods';

export default function SearchOnMapButton() {
  const mapOnPress = () => {
    navigate('ProjectsOnMap');
  };

  return <CustomFloatActionButton onPress={mapOnPress} customIcon={<Map />} />;
}
