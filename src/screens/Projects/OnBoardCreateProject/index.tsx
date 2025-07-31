import {Box, VStack} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import images, {SmallHuduLogo} from '~/assets/images';
import {
  CustomButton,
  CustomContainer,
  CustomText,
  ScreensHeader,
} from '~/components';
import {replace} from '~/navigation/Methods';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {fontFamily, fontSize, height, width} from '~/utils/style';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function OnboardingCreateProjectScreen() {
  const {t} = useTranslation();

  const {setIsOnboardingCreateProject} = userDataStore(state => state);
  const insets = useSafeAreaInsets();

  const onPressDone = async () => {
    setIsOnboardingCreateProject(true);
    replace('createProjectStep1');
  };

  return (
    <CustomContainer safeArea={false} barStyle="light-content">
      <Box
        w="100%"
        position={'absolute'}
        zIndex={10000}
        mt={`${insets.top}px`}
        alignSelf={'center'}>
        <ScreensHeader
          centerHeader={<SmallHuduLogo />}
          backgroundColor="transparent"
          backAction
        />
      </Box>

      <VStack flex={1}>
        <FastImage
          style={styles.background}
          source={images.onBoardingA}
          resizeMode={FastImage.resizeMode.stretch}>
          <VStack space="2" px="4" w={width} mb="128px">
            <CustomText
              fontSize={fontSize.heading4}
              fontFamily={fontFamily.bold}
              color={Colors.WHITE}
              marginBottom={16}>
              {t('projects.onBoarding.projectListing')}
            </CustomText>
            <CustomText
              width="65%"
              fontSize={fontSize.xMedium}
              fontFamily={fontFamily.regular}
              color={Colors.WHITE}
              marginBottom={20}>
              {t('projects.onBoarding.description')}
            </CustomText>
          </VStack>
        </FastImage>

        <VStack
          space="8"
          alignItems="center"
          position="absolute"
          bottom="48px"
          px="24px"
          w="100%">
          <CustomButton
            outline
            color={Colors.WHITE}
            textColor={Colors.BLACK_1}
            width="100%"
            title={t('projects.onBoarding.getStarted')}
            onPress={() => {
              onPressDone();
            }}
          />
        </VStack>
      </VStack>
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
    padding: 0,
    justifyContent: 'flex-end',
  },
});
