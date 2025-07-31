import {Image, VStack} from 'native-base';
import React, {memo} from 'react';
import {ImageBackground} from 'react-native';
import images from '~/assets/images';
import {Colors} from '~/styles';
import {fontFamily, fontSize, width} from '~/utils/style';
import CustomText from '../CustomText';
import {useTranslation} from 'react-i18next';

const SectionElevateCareer = () => {
  const {t} = useTranslation();

  return (
    <VStack>
      <ImageBackground
        source={images.career}
        style={{
          width: width * 0.93,
          height: (width * 0.93) / (327 / 147),
          alignSelf: 'center',
          justifyContent: 'flex-end',
        }}>
        <Image
          source={images.personPC}
          style={{
            width: width * 0.3,
            height: (width * 0.3) / (114 / 131),
            alignSelf: 'flex-end',
          }}
        />
        <VStack
          space="5"
          position={'absolute'}
          zIndex={1000}
          w="80%"
          top="4"
          left="4">
          <CustomText fontSize={fontSize.xMedium} color={Colors.WHITE}>
            {t('courses.elevateYourCareer')}
          </CustomText>
          <CustomText
            fontSize={fontSize.normal}
            fontFamily={fontFamily.light}
            color={Colors.WHITE}>
            {t('courses.unlockYourPotential')}
          </CustomText>
        </VStack>
      </ImageBackground>
    </VStack>
  );
};

export default memo(SectionElevateCareer);
