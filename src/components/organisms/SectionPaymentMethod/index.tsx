import {TickCircle} from 'iconsax-react-native';
import {HStack, VStack} from 'native-base';
import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {WithDraw} from '~/assets/icons';
import images from '~/assets/images';
import {CustomButton, CustomImage, CustomText, Loading} from '~/components';
import {useGetHasPaymentStripe, useOnboardingStripe} from '~/hooks/payment';
import {useGetMeProfile} from '~/hooks/user';
import {navigate} from '~/navigation/Methods';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {isAndroid} from '~/utils/helper';
import {fontFamily, fontSize, scale, verticalScale} from '~/utils/style';

function SectionPaymentMethod() {
  const {t} = useTranslation();

  const {userData} = userDataStore(state => state);

  const getMeOptions = userData?.id ? {userId: userData?.id} : {enabled: false};

  const {isLoading: getProfileLoading, data: getProfile} =
    useGetMeProfile(getMeOptions);
  const {data, isLoading: isLoadingCheckHastStripe} = useGetHasPaymentStripe();
  const {mutate: mutateOnBoarding, isLoading: onBoardingLoading} =
    useOnboardingStripe();

  const hasStripeAccount = data?.payment_hasStripeAccount?.result;

  const profile = getProfile?.user_getProfile?.result ?? {};

  const paymentSetup = () => {
    mutateOnBoarding({});
  };

  const withdraw = () => {
    navigate('WithDraw');
  };

  const goToStripe = () => {
    mutateOnBoarding({});
  };

  const loading = getProfileLoading || isLoadingCheckHastStripe;

  return (
    <VStack flex={1} px="24px" alignItems="center">
      {hasStripeAccount ? (
        <VStack flex={1} justifyContent="space-between">
          <VStack w="100%" flex={1}>
            <HStack
              w="100%"
              h="71px"
              p="16px"
              mt="24px"
              mb="42px"
              rounded="8px"
              borderWidth="1"
              borderColor={Colors.Ghost}>
              <VStack justifyContent="space-between" space="2" flex={1}>
                <CustomText fontSize={fontSize.xNormal}>
                  {t('profile.payment.paymentConfirmed')}
                </CustomText>
                <CustomText color={Colors.Topaz} fontSize={fontSize.xTiny}>
                  {userData?.email}
                </CustomText>
              </VStack>
              <TickCircle variant="Bold" color={Colors.LimeGreen} size="20" />
            </HStack>
            <HStack space="16px" alignItems="center">
              <WithDraw />
              <VStack flex={1} space="4px">
                <CustomText>{t('common.refundedAmount')}</CustomText>
                <CustomText fontFamily={fontFamily.bold}>
                  {`$${profile?.wallet ? profile?.wallet?.toFixed(2) : 0}`}
                </CustomText>
              </VStack>
            </HStack>
          </VStack>
          <VStack space="24px" mb={isAndroid ? '24px' : undefined}>
            <VStack space="16px">
              <CustomButton
                outline
                onPress={goToStripe}
                loading={onBoardingLoading}
                title={t('common.updatePaymentMethod')}
              />
              <CustomButton
                // disabled={!parseInt(profile?.wallet) > 0}
                onPress={withdraw}
                title={t('common.withDraw')}
              />
            </VStack>
          </VStack>
        </VStack>
      ) : (
        <VStack alignItems="center">
          <CustomImage
            local
            imageSource={images.paymentMethod}
            style={styles.image}
          />
          <CustomText
            textAlign="center"
            marginBottom={12}
            marginTop={40}
            fontFamily={fontFamily.medium}
            fontSize={fontSize.xxxLarge}>
            {t('profile.payment.paymentSetup')}
          </CustomText>
          <CustomText
            textAlign="center"
            marginBottom={24}
            fontSize={fontSize.small}>
            {t('profile.payment.paymentMethodDescription')}
          </CustomText>
          <CustomButton
            onPress={paymentSetup}
            loading={onBoardingLoading}
            width={scale(167)}
            title={t('profile.payment.setupPayment')}
          />
        </VStack>
      )}
      {loading && <Loading backDropColor={Colors.WHITE_F} />}
    </VStack>
  );
}

export default memo(SectionPaymentMethod);

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: verticalScale(189),
    borderRadius: 8,
  },
});
