import {HStack, InfoIcon, VStack, View} from 'native-base';
import React, {memo, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import {OrderStatus, ResponseStatus} from '~/generated/graphql';
import {useGetUserCompleteCourse} from '~/hooks/course';
import {useTranslator} from '~/hooks/translate';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';
import CustomText from '../CustomText';
import CustomTouchable from '../CustomTouchable';
import {BackgroundCheckCard, InfoModal} from '~/components';
import {navigate} from '~/navigation/Methods';
import {average} from '../RatingsCard';
import {useGetUserReviews} from '~/hooks/user';
import {userDataStore} from '~/stores';
import {useGetUserTaworkRate} from '~/hooks/JDP';
import {Bronze, Gold, Silver} from '~/assets/icons';
import {useGetLeaderBoardRank} from '~/hooks/leaderBoard';

const UserProfileInformationCard = ({data}: {data: any}) => {
  const [descriptionTranslate, setDescriptionTranslate] = useState('');
  const [value, setValue] = useState<'Translate' | 'Original'>('Translate');
  const {i18n, t} = useTranslation();
  const [isModal, setIsModal] = useState(false);
  const {userData} = userDataStore(state => state);

  const {isLoading: isLoadingGetUserTazworkRate, data: dataGetUserTazworkRate} =
    useGetUserTaworkRate(data?.id);

  const {data: getLeaderBoardData, isLoading: isLoadingGetLeaderBoard} =
    useGetLeaderBoardRank({userId: data?.id});

  const userTazworkRate =
    dataGetUserTazworkRate?.tazworkOrders_getUserTazWorkRate?.result;

  const userRank =
    getLeaderBoardData?.leaderBoard_getUsersLeaderBoardRank?.result ?? 0;

  const isMe = data?.id === userData?.id;

  const goldStatus = userTazworkRate?.gold;
  const silverStatus = userTazworkRate?.silver;
  const bronzeStatus = userTazworkRate?.bronze;
  const hasBackgroundCheck = userTazworkRate?.hasBackgroundCheck;

  const {mutate: translatorDescription, isLoading: isLoadingDescription} =
    useTranslator();
  const {data: getCompleteUserCourse} = useGetUserCompleteCourse(data?.id);
  const {isLoading, data: reviewsData} = useGetUserReviews({
    userId: data?.id,
    getReviewType: 'TOTAL',
  });
  const reviews = reviewsData?.pages || [];
  const rate = average(reviews);

  const completeCourses =
    getCompleteUserCourse?.userCourse_getUserCompleteCourses?.result || 0;

  const onTranslate = async () => {
    setValue(prev => (prev === 'Translate' ? 'Original' : 'Translate'));

    if (value === 'Original') {
      setDescriptionTranslate(data?.bio);
    } else {
      const input = {
        text: descriptionTranslate,
        fromLanguage: '',
        toLanguage: 'en',
      };

      translatorDescription(input, {
        onSuccess: successData => {
          if (
            successData?.translator_translate?.status === ResponseStatus.Success
          ) {
            setDescriptionTranslate(successData?.translator_translate?.result);
          }
        },
      });
    }
  };

  useEffect(() => {
    setDescriptionTranslate(data?.bio);
  }, [data]);

  const onCloseCancelModal = () => {
    setIsModal(false);
  };

  const backgroundHandler = () => {
    if (goldStatus !== OrderStatus.NotChecked) {
      return (
        <BackgroundCheckUser
          title={t('profile.goldLevel')}
          status={goldStatus}
          icon={<Gold width={25} height={20} />}
          {...{isMe}}
        />
      );
    } else if (silverStatus !== OrderStatus.NotChecked) {
      return (
        <BackgroundCheckUser
          status={silverStatus}
          title={t('profile.silverLevel')}
          icon={<Silver width={25} height={20} />}
          {...{isMe}}
        />
      );
    } else if (bronzeStatus !== OrderStatus.NotChecked) {
      return (
        <BackgroundCheckUser
          status={bronzeStatus}
          title={t('profile.bronzeLevel')}
          icon={<Bronze width={25} height={20} />}
          {...{isMe}}
        />
      );
    } else {
      if (isMe) {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigate('BackgroundCheckDetails')}>
            <CustomText
              fontSize={fontSize.xNormal}
              color={Colors.PRIMARY}
              fontFamily={fontFamily.light}>
              {t('profile.backgroundCheck')}
            </CustomText>
          </TouchableOpacity>
        );
      } else {
        return (
          <CustomText
            fontSize={fontSize.xNormal}
            color={Colors.PRIMARY}
            fontFamily={fontFamily.light}>
            {t('profile.backgroundCheck')}
          </CustomText>
        );
      }
    }
  };

  return (
    <VStack px="4" space="4" py="0">
      <VStack space="1">
        <CustomText>{data?.userName}</CustomText>
        <HStack>
          {hasBackgroundCheck ? (
            backgroundHandler()
          ) : isMe ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigate('BackgroundCheckDetails')}>
              <CustomText
                fontSize={fontSize.xNormal}
                color={Colors.PRIMARY}
                style={{textDecorationLine: 'underline'}}
                fontFamily={fontFamily.light}>
                {t('profile.backgroundCheck')}
              </CustomText>
            </TouchableOpacity>
          ) : (
            <CustomText
              fontSize={fontSize.xNormal}
              color={Colors.PRIMARY}
              fontFamily={fontFamily.light}>
              {t('profile.backgroundCheck')} N/A
            </CustomText>
          )}

          <CustomText
            fontSize={fontSize.xNormal}
            color={Colors.PLACEHOLDER}
            fontFamily={fontFamily.light}>
            {' '}
            .{' '}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigate('LeaderBoard')}>
              <CustomText
                fontSize={fontSize.xNormal}
                color={Colors.PLACEHOLDER}
                fontFamily={fontFamily.light}
                style={{textDecorationLine: 'underline'}}>
                {t('profile.leaderBoard')} #{userRank}
              </CustomText>
            </TouchableOpacity>
          </CustomText>
        </HStack>
      </VStack>
      <HStack
        my="2"
        justifyContent={'space-between'}
        alignItems={'center'}
        space="4">
        <VStack p="3" borderRadius={'lg'} space="4" w="31%" bg={Colors.Rhino}>
          <HStack justifyContent={'space-between'} alignItems={'center'}>
            <CustomText color={Colors.WHITE}>
              {data?.highestProjectCompletionRate
                ? data?.highestProjectCompletionRate?.toFixed(0) + '%'
                : 'N/A'}
            </CustomText>
            <CustomTouchable onPress={() => setIsModal(true)}>
              <InfoIcon />
            </CustomTouchable>
          </HStack>
          <CustomText
            color={Colors.WHITE}
            fontSize={fontSize.normal}
            fontFamily={fontFamily.light}>
            {t('profile.completionRate')}{' '}
          </CustomText>
        </VStack>
        <CustomTouchable
          style={{width: '31%'}}
          onPress={() => navigate('CompleteCourses', {userId: data?.id})}>
          <VStack
            p="3"
            borderRadius={'lg'}
            space="4"
            w="100%"
            bg={Colors.BondiBlue}>
            <CustomText color={Colors.WHITE}>{completeCourses}</CustomText>
            <CustomText
              color={Colors.WHITE}
              fontSize={fontSize.normal}
              fontFamily={fontFamily.light}>
              {t('profile.completedCourses')}
            </CustomText>
          </VStack>
        </CustomTouchable>

        <CustomTouchable
          style={{width: '31%'}}
          onPress={() => navigate('UserReview', {targetUserId: data?.id})}>
          <VStack
            p="3"
            borderRadius={'lg'}
            space="4"
            w="100%"
            bg={Colors.Ronchi}>
            <CustomText color={Colors.WHITE}>
              {data?.averageRate > 0 ? data?.averageRate?.toFixed?.(1) : 'N/A'}
            </CustomText>
            <CustomText
              color={Colors.WHITE}
              fontSize={fontSize.normal}
              fontFamily={fontFamily.light}>
              {t('profile.reviewsRatings')}
            </CustomText>
          </VStack>
        </CustomTouchable>
      </HStack>
      {descriptionTranslate?.length > 0 ? (
        <VStack mt="0" space="2">
          <>
            <CustomText>{t('profile.About')}</CustomText>
            <CustomText
              fontSize={fontSize.xNormal}
              color={Colors.BLACK}
              fontFamily={fontFamily.light}>
              {descriptionTranslate}
            </CustomText>
            {i18n?.language !== 'en' ? (
              <CustomTouchable onPress={onTranslate}>
                <HStack
                  justifyContent={'flex-start'}
                  alignItems="center"
                  space="2"
                  borderRadius={'sm'}>
                  {isLoadingDescription ? (
                    <ActivityIndicator color={Colors.BLACK} size="small" />
                  ) : (
                    <CustomText
                      underline
                      style={{
                        color: Colors.BLACK,
                      }}>
                      {value}
                    </CustomText>
                  )}
                </HStack>
              </CustomTouchable>
            ) : null}
          </>
        </VStack>
      ) : null}

      {userData?.id === data?.id ? (
        <BackgroundCheckCard userId={userData?.id} />
      ) : null}

      <InfoModal
        isVisible={isModal}
        onClose={onCloseCancelModal}
        title={t('profile.completionRate')}
        description={t('alerts.theRatio')}
        submitTitle={t('alerts.ok')}
        submitColor={Colors.PRIMARY}
      />
    </VStack>
  );
};

export default memo(UserProfileInformationCard);

const BackgroundCheckUser = ({
  icon = null,
  title = '',
  status = OrderStatus.NotChecked,
  isMe = false,
}: {
  icon: any;
  title: string;
  status:
    | OrderStatus.Approved
    | OrderStatus.Pendding
    | OrderStatus.Rejected
    | OrderStatus.NotChecked;
  isMe: boolean;
}) => {
  const {t} = useTranslation();

  if (isMe) {
    switch (status) {
      case OrderStatus.Approved:
        return (
          <HStack space="2" justifyContent={'center'} alignItems={'center'}>
            {icon && icon}
            <CustomText
              color={Colors.BLACK}
              fontSize={fontSize.small}
              fontFamily={fontFamily.medium}>
              {title}
            </CustomText>
          </HStack>
        );
      case OrderStatus.Pendding:
        return (
          <HStack space="2" justifyContent={'center'} alignItems={'center'}>
            {icon && icon}
            <CustomText
              color={Colors.BLACK}
              fontSize={fontSize.small}
              fontFamily={fontFamily.medium}>
              {title} {t('profile.pending')}
            </CustomText>
          </HStack>
        );
      default:
        return (
          <HStack space="2" justifyContent={'center'} alignItems={'center'}>
            {icon && icon}
            <CustomText
              color={Colors.BLACK}
              fontSize={fontSize.small}
              fontFamily={fontFamily.medium}>
              {title}{' '}
              <CustomText
                color={Colors.TIME_LEFT_RED_BACKGROUND}
                fontSize={fontSize.small}
                fontFamily={fontFamily.medium}>
                {t('profile.rejected')}
              </CustomText>
            </CustomText>
          </HStack>
        );
    }
  } else {
    if (status === OrderStatus.Approved) {
      return (
        <HStack space="2" justifyContent={'center'} alignItems={'center'}>
          {icon && icon}
          <CustomText
            color={Colors.BLACK}
            fontSize={fontSize.small}
            fontFamily={fontFamily.medium}>
            {title}
          </CustomText>
        </HStack>
      );
    } else {
      return (
        <CustomText
          fontSize={fontSize.xNormal}
          color={Colors.PRIMARY}
          fontFamily={fontFamily.light}>
          {t('profile.backgroundCheck')} N/A
        </CustomText>
      );
    }
  }
};
