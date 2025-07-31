import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {HStack, IconButton, Box} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import images from '~/assets/images';
import {CustomImage, CustomText, CustomTouchable} from '~/components';
import {goBack} from '~/navigation/Methods';
import {Colors} from '~/styles';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import {useGetMinimalProfile} from '~/hooks/user';

const ChatHeader = ({userId}: {userId: number}) => {
  const options = {userId};

  const {data: getProfile} = useGetMinimalProfile(options);

  const profile = getProfile?.user_getProfile?.result ?? {};

  return (
    <HStack space="6" px={4} alignItems="center" bgColor={Colors.WHITE}>
      <CustomTouchable onPress={goBack}>
        <Icon name="chevron-back" color={Colors.BLACK} size={24} />
      </CustomTouchable>
      <HStack flex={1} alignItems="center" space="4">
        <CustomImage
          imageSource={profile?.imageAddress}
          style={styles.image}
          resizeMode="cover"
          errorImage={images.avatarErrorImage}
          errorText={profile?.userName ?? profile?.email}
        />
        <CustomText
          flex={1}
          numberOfLines={1}
          fontSize={18}
          textAlign="center"
          fontFamily={fontFamily.medium}>
          {profile?.userName ?? ''}
        </CustomText>
      </HStack>
      <Box rounded="sm" p="5" size="24px" />
    </HStack>
  );
};

export default memo(ChatHeader);

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: verticalScale(16),
  },
  image: {
    height: scale(40),
    width: scale(40),
    borderRadius: 100,
  },
});
