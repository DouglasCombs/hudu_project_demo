import React from 'react';
import {WithLocalSvg} from 'react-native-svg';
import images from '~/assets/images';
import {Colors} from '~/styles';
import {scale, verticalScale} from '~/utils/style';

const HuduVerified = () => {
  return (
    <WithLocalSvg
      asset={images.huduVerified}
      width={scale(70)}
      height={verticalScale(12)}
      color={Colors.GARY_3}
    />
  );
};

export default HuduVerified;
