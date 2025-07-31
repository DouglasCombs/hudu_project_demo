import {Center, VStack} from 'native-base';
import React from 'react';
import {
  CustomButton,
  CustomContainer,
  CustomKeyboardAwareScrollView,
  CustomText,
} from '~/components';
import {Colors} from '~/styles';
import Lottie from 'lottie-react-native';
import {StyleSheet} from 'react-native';
import animations from '~/assets/animations';
import {useTranslation} from 'react-i18next';
import {fontFamily, fontSize} from '~/utils/style';

export default function PlaceBidFinalStepScreen({navigation}: NavigationProp) {
  const {t} = useTranslation();

  const goToProjects = () => {
    navigation.popToTop();
  };

  return (
    <CustomContainer
      statusBarBackgroundColor={Colors.WHITE_F}
      barStyle="dark-content"
      backgroundColor={Colors.WHITE_F}>
      <CustomKeyboardAwareScrollView
        contentContainerStyle={styles.contentContainerStyle}>
        <VStack flex={1} alignItems="center">
          <Center mt="24px" mb="36px">
            <Lottie
              style={styles.lottie}
              source={animations.ThumbsUp}
              loop={true}
              autoPlay
            />
          </Center>
          <VStack px="48px">
            <CustomText
              textAlign="center"
              fontFamily={fontFamily.medium}
              fontSize={fontSize.xxxLarge}>
              {t('common.congratulations')}
            </CustomText>
            <CustomText
              marginTop={16}
              marginBottom={32}
              textAlign="center"
              fontFamily={fontFamily.medium}
              fontSize={fontSize.xNormal}>
              {t('common.bidSuccessfullyPlaced1')}
            </CustomText>
            <CustomText
              lineHeight={24}
              textAlign="center"
              color={Colors.INPUT_LABEL2}
              fontFamily={fontFamily.medium}
              fontSize={fontSize.small}>
              {t('common.bidSuccessfullyPlaced2')}
            </CustomText>
            <CustomText
              marginTop={64}
              lineHeight={24}
              textAlign="center"
              color={Colors.INPUT_LABEL2}
              fontFamily={fontFamily.medium}
              fontSize={fontSize.small}>
              {t('common.bidSuccessfullyPlaced3')}
            </CustomText>
          </VStack>
        </VStack>
        <VStack space="24px" px="48px" pb="40px">
          <CustomButton
            outline
            color={Colors.PRIMARY}
            onPress={goToProjects}
            title={t('projects.bids.browseMoreProjects')}
          />
        </VStack>
      </CustomKeyboardAwareScrollView>
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  lottie: {height: 200, width: 200},
  contentContainerStyle: {flexGrow: 1},
});
