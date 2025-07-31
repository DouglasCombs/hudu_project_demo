import {Center, VStack} from 'native-base';
import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {ImageBackground} from 'react-native';
import {RightFilIcon} from '~/assets/icons';
import images from '~/assets/images';
import {useGetUserTaworkRate} from '~/hooks/JDP';
import {navigate} from '~/navigation/Methods';
import {Colors} from '~/styles';
import {fontFamily, fontSize, scale, width} from '~/utils/style';
import CustomText from '../CustomText';
import CustomTouchable from '../CustomTouchable';

const BackgroundCheckCard = ({userId}: {userId: number}) => {
  const {t} = useTranslation();
  const {isLoading: isLoadingGetUserTazworkRate, data: dataGetUserTazworkRate} =
    useGetUserTaworkRate(userId);
  const userTazworkRate =
    dataGetUserTazworkRate?.tazworkOrders_getUserTazWorkRate?.result;

  const silverStatus = userTazworkRate?.silver;
  const bronzeStatus = userTazworkRate?.bronze;

  if (silverStatus === 'APPROVED' || bronzeStatus === 'APPROVED') {
    return (
      <CustomTouchable onPress={() => navigate('BackgroundCheckDetails')}>
        <ImageBackground
          source={images.goldCard}
          style={{width: width * 0.93, height: (width * 0.93) / (327 / 85)}}
          resizeMode="contain">
          <VStack w="100%" h="100%" justifyContent={'center'} px="4" space="2">
            <CustomText
              color={Colors.WHITE}
              fontFamily={fontFamily.bold}
              fontSize={fontSize.xNormal}>
              {t('profile.goldBackground')}
            </CustomText>
            <CustomText
              color={Colors.WHITE}
              fontFamily={fontFamily.light}
              fontSize={fontSize.normal}>
              {t('profile.upgradeCheck')}
            </CustomText>
          </VStack>
          <Center
            position={'absolute'}
            zIndex={1000}
            right={scale(9)}
            bottom={scale(9)}>
            <RightFilIcon />
          </Center>
        </ImageBackground>
      </CustomTouchable>
    );
  }
  return null;
};

export default memo(BackgroundCheckCard);
