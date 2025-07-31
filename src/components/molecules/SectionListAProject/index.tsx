import {HStack, VStack} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {ArrowRight} from '~/assets/icons';
import images from '~/assets/images';
import {CustomImage, CustomText} from '~/components';
import {navigate} from '~/navigation/Methods';
import {authStore, userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';
import {showInfoMessage, withLoggedInCheck} from '~/utils/utils';

export default function SectionListAProject({
  mt = '8px',
  mb = '16px',
  mx = '24px',
}: {
  mt?: string | number;
  mb?: string | number;
  mx?: string | number;
}) {
  const {t} = useTranslation();
  const {isOnboardingCreateProject, userData} = userDataStore(state => state);
  const {isUserLoggedIn} = authStore(state => state);

  const listProjectOnPress = () => {
    withLoggedInCheck(() => goToCreateProject());
  };

  const handleStart = () => {
    if (isOnboardingCreateProject) {
      navigate('createProjectStep1');
    } else {
      navigate('onBoardCreateProject');
    }
  };

  const goToEditProfile = () => {
    navigate('MainTabs', {screen: 'ProfileTab'});
  };

  const goToCreateProject = () => {
    if (isUserLoggedIn) {
      if (userData?.userName) {
        handleStart();
      } else {
        showInfoMessage(
          t('messages.completeProfile'),
          t('messages.completeYourProfile'),
          goToEditProfile,
        );
      }
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={listProjectOnPress}>
      <VStack mt={mt} mb={mb} mx={mx} rounded="sm">
        <CustomImage
          local
          resizeMode="stretch"
          imageSource={images.ListProjectBackground}
          style={styles.image}>
          <CustomText
            style={styles.textWithShadow}
            color={Colors.WHITE_F}
            textAlign="center"
            fontSize={fontSize.normal}>
            {t('home.listAProject.description')}
          </CustomText>
        </CustomImage>
        <HStack
          h="34px"
          w="100%"
          space="6px"
          alignItems="center"
          justifyContent="center"
          borderBottomRadius="8px"
          bg={Colors.BlackRussian}>
          <CustomText
            fontSize={fontSize.tiny}
            fontFamily={fontFamily.medium}
            color={Colors.WHITE_F}>
            {t('home.listAProject.title')}
          </CustomText>
          <ArrowRight />
        </HStack>
      </VStack>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
    width: '100%',
    height: 66,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 57,
  },
  textWithShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
});
