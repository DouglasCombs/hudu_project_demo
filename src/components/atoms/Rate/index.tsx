import React from 'react';
import {HStack} from 'native-base';
import {StarIconFill} from '~/assets/icons';
import CustomText from '../CustomText';
import {Colors} from '~/styles';

export default function Rate({rate = 0}: {rate: number}) {
  return (
    <HStack space="1" alignItems="center">
      <StarIconFill fillColor={rate > 0 ? Colors.MySin : Colors.Ghost} />
      <CustomText>{rate ? rate?.toFixed(1) : '0.00'}</CustomText>
    </HStack>
  );
}
