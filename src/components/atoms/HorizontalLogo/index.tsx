import React from 'react';
import {CustomImage} from '~/components';
import {StyleSheet} from 'react-native';
import {Colors} from '~/styles';
import images from '~/assets/images';

const HorizontalLogo = ({style = styles.image}: {style?: any}) => {
  return (
    <CustomImage
      local
      style={style}
      resizeMode="cover"
      imageSource={images.huduLogo1}
      backgroundColor={Colors.TRANSPARENT}
    />
  );
};

export default HorizontalLogo;

const styles = StyleSheet.create({
  image: {
    height: 61,
    width: 275,
  },
});
