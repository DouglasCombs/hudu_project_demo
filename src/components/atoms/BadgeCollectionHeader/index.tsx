import {HStack, VStack} from 'native-base';
import React from 'react';
import {InfoIcon} from '~/assets/icons';
import {Colors} from '~/styles';
import CustomText from '../CustomText';
import {userDataStore} from '~/stores';
import {useGetProfile} from '~/hooks/user';
import dayjs from 'dayjs';
import {useGetUserCompleteCourse} from '~/hooks/course';
import {useTranslation} from 'react-i18next';
import CustomTouchable from '../CustomTouchable';
import {navigate} from '~/navigation/Methods';
import {
  useGetHasPaymentStripe,
  useGetProjectDoerPaymentDetails,
} from '~/hooks/payment';

const BadgeCollectionHeader = () => {
  const {userData} = userDataStore(state => state);
  const {i18n, t} = useTranslation();

  const {data, isLoading} = useGetProfile({userId: userData?.id});
  const userDataProfile = data?.user_getProfile?.result;
  const {data: getCompleteUserCourse} = useGetUserCompleteCourse(userData?.id);
  const completeCourses =
    getCompleteUserCourse?.userCourse_getUserCompleteCourses?.result || 0;
  const {data: getPaymentStripe} = useGetHasPaymentStripe();
  const hasStripeAccount = getPaymentStripe?.payment_hasStripeAccount?.result;

  const {data: getPaymentDetails, isLoading: isLoadingGetPaymentDetails} =
    useGetProjectDoerPaymentDetails({userId: userData?.id});

  const paymentDetails =
    getPaymentDetails?.payment_getProjectDoerPaymentDetails?.result;

  const date1 = dayjs(new Date());
  const date2 = dayjs(userDataProfile?.createdDate);

  const years = date1.diff(date2, 'year');
  const months =
    years > 0
      ? date1.diff(date2, 'month') - years * 12
      : date1.diff(date2, 'month');

  const days =
    date1.diff(date2, 'month') > 0
      ? date1.diff(date2, 'day') - date1.diff(date2, 'month') * 30.5
      : date1.diff(date2, 'day');

  return (
    <VStack py="4" pb="10" space="3" px="4">
      <HStack justifyContent={'space-between'} alignItems={'center'}>
        <VStack
          space="4"
          px="2"
          py="2"
          w="48%"
          bg={Colors.SEARCH_BACKGROUND}
          borderRadius={'lg'}>
          <HStack justifyContent={'space-between'} alignItems={'center'}>
            <CustomText color={Colors.PRIMARY}>
              {`$${
                paymentDetails?.huduerReceiveForCompletingTheJob?.toFixed(2) ??
                0
              }`}
            </CustomText>
            <CustomTouchable
              onPress={() =>
                navigate('UserPayments', {
                  initialRoute: hasStripeAccount ? 0 : 1,
                })
              }>
              <InfoIcon />
            </CustomTouchable>
          </HStack>
          <CustomText>{t('profile.Earning')}</CustomText>
        </VStack>
        <VStack
          space="4"
          px="2"
          py="2"
          w="48%"
          bg={Colors.SEARCH_BACKGROUND}
          borderRadius={'lg'}>
          <HStack justifyContent={'space-between'} alignItems={'center'}>
            <CustomText color={Colors.PRIMARY}>{completeCourses}</CustomText>
            <CustomTouchable
              onPress={() =>
                navigate('CompleteCourses', {userId: userDataProfile?.id})
              }>
              <InfoIcon />
            </CustomTouchable>
          </HStack>
          <CustomText>{t('profile.completedCourses')}</CustomText>
        </VStack>
      </HStack>
      <VStack
        space="4"
        px="2"
        py="2"
        w="100%"
        bg={Colors.SEARCH_BACKGROUND}
        borderRadius={'lg'}>
        <HStack justifyContent={'space-between'} alignItems={'center'}>
          <CustomText color={Colors.PRIMARY}>
            {years > 0
              ? years + ' ' + t('badge.years') + (years > 1 ? 's' : '')
              : ''}{' '}
            {months > 0
              ? months + ' ' + t('badge.months') + (months > 1 ? 's' : '')
              : ''}{' '}
            {(months > 0 || years > 0) && days === 0
              ? null
              : parseInt(days) + ' ' + t('badge.days')}
            {days > 1 ? 's' : ''}
          </CustomText>
          <CustomTouchable
            onPress={() => navigate('MainTabs', {screen: 'ProfileTab'})}>
            <InfoIcon />
          </CustomTouchable>
        </HStack>
        <CustomText>{t('profile.YearsHUDU')}</CustomText>
      </VStack>
    </VStack>
  );
};

export default BadgeCollectionHeader;
