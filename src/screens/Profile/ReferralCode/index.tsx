import {Center, HStack, VStack} from 'native-base';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ImageBackground, StyleSheet} from 'react-native';
import images from '~/assets/images';
import {
  ConfirmationModal,
  CustomContainer,
  CustomImage,
  CustomKeyboardAwareScrollView,
  CustomText,
  CustomTouchable,
  ScreensHeader,
  ShareReferralCode,
} from '~/components';
import {useMockData} from '~/constants/mockData';
import {useWithdrawReferralIncome} from '~/hooks/payment';
import {useGenerateReferralCode, useGetReferralInfo} from '~/hooks/user';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {fontFamily, fontSize, scale, width} from '~/utils/style';

const size = width * 0.8;
const halfSize = size / 2;

const ReferralCodeScreen = () => {
  const {t} = useTranslation();
  const {referralCodeData} = useMockData();
  const {userData} = userDataStore(state => state);
  const [isModal, setIsModal] = useState<boolean>(false);

  const {mutate, isLoading: isLoadingMutate} = useWithdrawReferralIncome();
  const {isLoading: isLoadingGetReferralCode, data: dataReferralCode} =
    useGenerateReferralCode();

  const referralCode = dataReferralCode?.referall_generateReferallCode?.result;
  const {data: dataReferralInfo, isLoading: isLoadingReferralInfo} =
    useGetReferralInfo({userId: parseInt(userData?.id)});
  const referralInfo = dataReferralInfo?.referall_getReferallInfo?.result;

  const onCloseCancelModal = () => {
    setIsModal(false);
  };
  const onSubmit = () => {
    mutate({});
    onCloseCancelModal();
  };

  const loading =
    isLoadingMutate || isLoadingGetReferralCode || isLoadingReferralInfo;

  return (
    <CustomContainer isLoading={loading} backgroundColor={Colors.Rhino}>
      <ImageBackground
        source={images.referral}
        style={{
          flex: 1,
        }}
        imageStyle={{
          width: size,
          height: size,

          zIndex: 1000,
          marginLeft: width - halfSize,
          alignSelf: 'flex-end',
        }}>
        <CustomKeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{
            zIndex: 1001,
          }}
          contentContainerStyle={styles.contentContainerStyle}>
          <ScreensHeader backAction />

          <VStack px="4" space="4">
            <CustomText
              color={Colors.WHITE}
              fontSize={fontSize.heading4}
              fontFamily={fontFamily.medium}>
              {t('profile.referral.inviteFriends')}
            </CustomText>
            <CustomText
              color={Colors.WHITE}
              fontSize={fontSize.xNormal}
              fontFamily={fontFamily.medium}>
              {t('profile.referral.earnExiting')}
            </CustomText>
            <ShareReferralCode {...{referralCode}} />
            <VStack bg={Colors.RhinoShadow} borderRadius={'sm'}>
              <HStack justifyContent={'space-between'} alignItems={'center'}>
                <VStack space="3" p="4">
                  <VStack>
                    <CustomText
                      color={Colors.WHITE}
                      fontSize={fontSize.small}
                      fontFamily={fontFamily.light}>
                      {t('profile.referral.SuccessfulReferrals')}
                    </CustomText>
                    <CustomText
                      color={Colors.WHITE}
                      fontSize={fontSize.normal}
                      fontFamily={fontFamily.regular}>
                      {referralInfo?.sucessfullReferall || 0}
                    </CustomText>
                  </VStack>
                  <VStack>
                    <CustomText
                      color={Colors.WHITE}
                      fontSize={fontSize.small}
                      fontFamily={fontFamily.light}>
                      {t('profile.referral.TotalRewards')}
                    </CustomText>
                    <CustomText
                      color={Colors.WHITE}
                      fontSize={fontSize.normal}
                      fontFamily={fontFamily.regular}>
                      ${referralInfo?.totalRewarded || 0}
                    </CustomText>
                  </VStack>
                  <VStack>
                    <CustomText
                      color={Colors.WHITE}
                      fontSize={fontSize.small}
                      fontFamily={fontFamily.light}>
                      {t('profile.referral.EarnedPTS')}
                    </CustomText>
                    <CustomText
                      color={Colors.WHITE}
                      fontSize={fontSize.normal}
                      fontFamily={fontFamily.regular}>
                      {referralInfo?.earnedPts || 0}
                    </CustomText>
                  </VStack>
                </VStack>
                <VStack p="4">
                  <CustomTouchable
                    onPress={() => setIsModal(true)}
                    disabled={referralInfo?.totalRewarded > 0 ? false : true}
                    style={{
                      backgroundColor:
                        referralInfo?.totalRewarded > 0
                          ? Colors.PRIMARY
                          : 'gray',
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 5,
                    }}>
                    <CustomText color={Colors.WHITE}>
                      {t('common.withDraw')}
                    </CustomText>
                  </CustomTouchable>
                </VStack>
              </HStack>
            </VStack>

            <VStack
              space="8"
              py="8"
              p="4"
              bg={Colors.RhinoShadow}
              borderRadius={'sm'}>
              <VStack space="2">
                <CustomText
                  color={Colors.WHITE}
                  fontSize={fontSize.xNormal}
                  fontFamily={fontFamily.medium}>
                  {t('profile.referral.HowItWorks')}
                </CustomText>
                <CustomText
                  color={Colors.WHITE}
                  fontSize={fontSize.small}
                  width="100%"
                  fontFamily={fontFamily.light}>
                  {t('profile.referral.HowItWorksDescription')}
                </CustomText>
              </VStack>

              {referralCodeData?.map(el => (
                <HStack space="4">
                  <Center size="12" borderRadius={'full'} bg={Colors.Rhino}>
                    <CustomImage
                      imageSource={el?.icon}
                      style={{
                        width: scale(27),
                        height: scale(27),
                      }}
                      resizeMode="contain"
                      local
                    />
                  </Center>
                  <VStack space="1" flex={1}>
                    <CustomText
                      color={Colors.WHITE}
                      fontSize={fontSize.small}
                      fontFamily={fontFamily.medium}>
                      {el?.title}
                    </CustomText>
                    <CustomText
                      flex={1}
                      color={Colors.WHITE}
                      fontSize={fontSize.small}
                      fontFamily={fontFamily.light}>
                      {el?.description}
                    </CustomText>
                  </VStack>
                </HStack>
              ))}
            </VStack>
          </VStack>
        </CustomKeyboardAwareScrollView>
      </ImageBackground>
      <ConfirmationModal
        isVisible={isModal}
        onClose={onCloseCancelModal}
        onSubmit={onSubmit}
        title={t('alerts.withdrawReferral')}
        description={t('alerts.areYouSureToWithdrawReferral')}
        submitTitle={t('alerts.ok')}
      />
    </CustomContainer>
  );
};

export default ReferralCodeScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 100,
  },
});
