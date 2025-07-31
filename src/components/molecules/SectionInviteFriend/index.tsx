import {Box, HStack, VStack} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {ChevronRightCircle2} from '~/assets/icons';
import images from '~/assets/images';
import {CustomImage, CustomText} from '~/components';
import {navigate} from '~/navigation/Methods';
import {Colors} from '~/styles';
import {fontFamily, fontSize, verticalScale} from '~/utils/style';

export default function SectionInviteFriend({
  mt,
  mb,
}: {
  mt?: number | string;
  mb?: number | string;
}) {
  const {t} = useTranslation();

  const onPressHandler = () => {
    navigate('ReferralCode');
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPressHandler}>
      <Box
        alignItems="center"
        justifyContent="center"
        flex={1}
        w="100%"
        h="85px"
        rounded="sm"
        mb={mb}
        mt={mt}>
        <CustomImage
          local
          resizeMode="stretch"
          imageSource={images.inviteFriend}
          style={styles.image}>
          <HStack flex={1} alignItems="flex-end" pl="24px" pr="8px" pb="8px">
            <VStack zIndex={999} space="8px" h="100%" pt="12px" flex={0.6}>
              <CustomText
                fontFamily={fontFamily.bold}
                color={Colors.WHITE_F}
                fontSize={fontSize.xNormal}>
                {t('home.inviteFriendTitle')}
              </CustomText>
              <CustomText color={Colors.WHITE_F} fontSize={fontSize.xTiny}>
                {t('home.inviteFriendDescription')}
              </CustomText>
            </VStack>
            <HStack justifyContent="flex-end" flex={0.4}>
              <ChevronRightCircle2 />
            </HStack>
          </HStack>
        </CustomImage>
      </Box>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(85),
  },
  image: {
    flex: 1,
    width: '100%',
    height: verticalScale(85),
    borderRadius: 8,
  },
});
