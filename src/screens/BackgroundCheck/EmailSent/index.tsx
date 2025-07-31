import Lottie from 'lottie-react-native';
import {Box, VStack} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import animations from '~/assets/animations';
import {
  CustomButton,
  CustomContainer,
  CustomKeyboardAwareScrollView,
  CustomText,
  ScreensHeader,
} from '~/components';
import {goBack} from '~/navigation/Methods';
import {Colors} from '~/styles';
import {fontFamily, fontSize, scale, verticalScale} from '~/utils/style';

const EmailSentScreen = () => {
  const {t} = useTranslation();

  const ContinueOnPress = () => {
    goBack();
  };

  return (
    <CustomContainer
      statusBarBackgroundColor={Colors.WHITE_F}
      barStyle="dark-content">
      <ScreensHeader
        backAction
        backgroundColor={Colors.WHITE_F}
        contentColor={Colors.BLACK}
      />
      <CustomKeyboardAwareScrollView
        contentContainerStyle={styles.contentContainerStyle}>
        <VStack flex={1} px="4" alignItems="center" justifyContent="center">
          <Lottie
            style={styles.lottie}
            source={animations.emailSend}
            loop={true}
            autoPlay
          />
        </VStack>
        <VStack flex={1} px="8" alignItems="center">
          <CustomText
            fontSize={fontSize.xxxLarge}
            fontFamily={fontFamily.bold}
            textAlign="center"
            marginTop={verticalScale(4)}>
            {t('home.jdp.emailSent')}
          </CustomText>
          <CustomText
            lineHeight={18}
            fontSize={fontSize.normal}
            textAlign="center"
            marginTop={verticalScale(16)}>
            {t('home.jdp.emailSentDescription')}
          </CustomText>
        </VStack>
      </CustomKeyboardAwareScrollView>
      <Box px="4">
        <CustomButton
          mb="6"
          title={t('common.done')}
          onPress={ContinueOnPress}
        />
      </Box>
    </CustomContainer>
  );
};

export default EmailSentScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
  lottie: {height: scale(150), width: scale(150)},
});
