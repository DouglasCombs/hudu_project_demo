import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import images from '~/assets/images';
import {scale} from '~/utils/style';
import CustomImage from '../CustomImage';

const UserImage = ({
  sourceImage,
  errorText = 'NO',
  style = {},
  imageStyle = {},
}: {
  sourceImage: any;
  errorText?: string;
  style?: any;
  imageStyle?: ViewStyle;
}) => {
  return (
    <CustomImage
      zoomable
      resizeMode="cover"
      style={[styles.avatar, style]}
      imageStyle={imageStyle}
      imageSource={sourceImage}
      errorImage={images.avatarErrorImage}
      errorText={errorText}
    />
  );
};

export default UserImage;

const styles = StyleSheet.create({
  avatar: {
    height: scale(32),
    width: scale(32),
    borderRadius: scale(16),
  },
});
