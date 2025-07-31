import {Box, HStack, VStack} from 'native-base';
import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {BackgroundBadge, BellIcon, ChatIcon, Menu} from '~/assets/icons';
import {
  CustomText,
  CustomTouchable,
  SectionUserPlaceHolder,
} from '~/components';
import queryKeys from '~/constants/queryKeys';
import {queryClient} from '~/graphql/AuthProvider';
import {useGetBadges} from '~/hooks/badge';
import {useGetFlagTexts} from '~/hooks/flagText';
import {
  useGetUnreadMessages,
  useGroupMessageSubscription,
  useMessageSubscription,
} from '~/hooks/message';
import {
  useGetUnreadNotifications,
  useNotificationSubscription,
} from '~/hooks/notification';
import {useGetMinimalProfile} from '~/hooks/user';
import {
  getCurrentRouteName,
  goBack,
  navigate,
  toggleDrawer,
} from '~/navigation/Methods';
import {showLocalNotification} from '~/services/notifications';
import {authStore, userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';
import {withLoggedInCheck} from '~/utils/utils';

const SectionUserRow = ({isBack = false}: {isBack?: boolean}) => {
  const {isUserLoggedIn} = authStore(state => state);
  const {data} = useGetFlagTexts({pageSize: 3000});

  if (isUserLoggedIn) {
    return <LoginUserSection {...{isBack}} />;
  }

  return <AuthUserSection />;
};

export default memo(SectionUserRow);

const AuthUserSection = () => {
  const onPress = () => {
    withLoggedInCheck(() => {});
  };

  return (
    <HStack alignItems="center" px="24px" py="2" space="4">
      <VStack flex={1} />
      <HStack space="16px" alignItems="center">
        <CustomTouchable onPress={onPress}>
          <BackgroundBadge />
        </CustomTouchable>
        <CustomTouchable onPress={onPress}>
          <ChatIcon />
        </CustomTouchable>
        <CustomTouchable onPress={onPress}>
          <BellIcon />
        </CustomTouchable>
        <CustomTouchable onPress={onPress}>
          <Menu />
        </CustomTouchable>
      </HStack>
    </HStack>
  );
};

const LoginUserSection = ({isBack = false}: {isBack?: boolean}) => {
  const {t} = useTranslation();

  const {userData} = userDataStore(state => state);

  const getProfileOptions = {userId: userData?.id};

  const {data: profileData, isLoading: isLoadingGetProfile} =
    useGetMinimalProfile(getProfileOptions);

  const profile = profileData?.user_getProfile?.result;

  const options = {where: {isReaded: {eq: false}}};

  const {data: getNotifications} = useGetUnreadNotifications(options);
  const {data: getUserMessages} = useGetUnreadMessages();

  const totalCount = getNotifications?.totalCount ?? 0;
  const hasUnreadMessage = getUserMessages?.message_hasUnreadChat?.result;

  useNotificationSubscription({
    userId: userData?.id,
    callback: (inputData: any) => onGetNotification(inputData),
  });

  useMessageSubscription({
    userId: userData?.id,
    callback: (inputData: any) => onGetMessage(inputData),
  });

  useGroupMessageSubscription({
    userId: userData?.id,
    callback: (inputData: any) => onGetGroupMessage(inputData),
  });

  const onGetNotification = async (event: any) => {
    const res = JSON.parse(event.data);
    if (
      res?.type !== 'ka' &&
      res.type === 'data' &&
      res?.payload?.data?.notificationAdded
    ) {
      await showLocalNotification({
        data: res?.payload?.data?.notificationAdded ?? {},
        // title: res?.payload?.data?.notificationAdded?.sender?.userName ?? '',
        title: 'HUDU',
        message: res?.payload?.data?.notificationAdded?.title ?? '',
      });
      //TODO handle with notification screen integrate
      queryClient.invalidateQueries(queryKeys.notifications);
      queryClient.invalidateQueries(queryKeys.unReadNotifications);
      queryClient.invalidateQueries(queryKeys.bids);
      queryClient.invalidateQueries(queryKeys.bidsOrderByStatus);
      queryClient.invalidateQueries(queryKeys.projects);
      queryClient.invalidateQueries(queryKeys.project);
      queryClient.invalidateQueries(queryKeys.getProjectCountByStatus);
      queryClient.invalidateQueries(queryKeys.getProjectCountByStatus);
      queryClient.invalidateQueries([queryKeys.getMyBids], {exact: false});
      queryClient.invalidateQueries([queryKeys.projectQuestions], {
        exact: false,
      });
      queryClient.invalidateQueries([queryKeys.getBidsCountByStatus], {
        exact: false,
      });
    }
  };

  const onGetMessage = async (event: any) => {
    const currentRouteName = getCurrentRouteName();
    const res = JSON.parse(event.data);
    if (
      res?.type !== 'ka' &&
      res.type === 'data' &&
      res?.payload?.data?.messageAdded
    ) {
      if (currentRouteName !== 'Chat') {
        await showLocalNotification({
          data: res?.payload?.data ?? {},
          title: res?.payload?.data?.messageAdded?.sender?.userName ?? '',
          message:
            `${t('messages.sentYouAMessage')} "${
              res?.payload?.data?.messageAdded?.conversation?.project?.title
            }".\n${t('messages.clickHereToView')}` ?? '',
          channelId: 'Hudu Messages',
        });
      }
      //TODO handle with chat screen integrate
      // queryClient.invalidateQueries(queryKeys.conversation, {exact: false});
      // queryClient.invalidateQueries(queryKeys.userMessages);
      // queryClient.invalidateQueries(queryKeys.unReadMessages);
    }
  };

  const onGetGroupMessage = async (event: any) => {
    const currentRouteName = getCurrentRouteName();
    const res = JSON.parse(event.data);
    if (
      res?.type !== 'ka' &&
      res.type === 'data' &&
      res?.payload?.data?.subscribeToGroupMessageAdded
    ) {
      if (currentRouteName !== 'GroupsChat') {
        await showLocalNotification({
          data: res?.payload?.data ?? {},
          title: res?.payload?.data?.subscribeToGroupMessageAdded?.text ?? '',
          message: res?.payload?.data?.subscribeToGroupMessageAdded?.text ?? '',
          channelId: 'Hudu support',
        });
      }
      //TODO handle with chat screen integrate
      // queryClient.invalidateQueries(queryKeys.conversation, {exact: false});
      // queryClient.invalidateQueries(queryKeys.userMessages);
      // queryClient.invalidateQueries(queryKeys.unReadMessages);
    }
  };

  const {isLoading: isLoadingGetBadge, data: getBadgeData} = useGetBadges({
    where: {userId: {eq: userData?.id}},
  });
  const totalBadge = getBadgeData?.totalCount;

  const notificationOnPress = () => {
    navigate('Notification');
  };

  const messagesOnPress = () => {
    navigate('MessageStack');
  };

  const backgroundBadgeOnPress = () => {
    navigate('BadgeCollections');
  };

  if (isLoadingGetProfile) {
    return <SectionUserPlaceHolder />;
  }

  return (
    <VStack space="20px">
      <HStack alignItems="center" px="24px" py="2" space="4">
        {isBack ? (
          <Box flex={1} ml="-12px" alignItems={'flex-start'}>
            <CustomTouchable style={styles.back} onPress={goBack}>
              <Icon name="chevron-back" color={Colors.BLACK} size={24} />
            </CustomTouchable>
          </Box>
        ) : (
          <VStack flex={1}>
            <CustomText
              color={Colors.BLACK}
              fontSize={fontSize.normal}
              numberOfLines={1}>
              {t('home.userSection.hello')}
            </CustomText>
            <CustomText
              fontFamily={fontFamily.bold}
              fontSize={fontSize.xMedium}
              numberOfLines={1}>
              {profile?.userName}
            </CustomText>
          </VStack>
        )}

        <HStack space="16px" alignItems="center">
          <CustomTouchable onPress={backgroundBadgeOnPress}>
            <BackgroundBadge badge={totalBadge} />
          </CustomTouchable>
          <CustomTouchable onPress={messagesOnPress}>
            <ChatIcon badge={hasUnreadMessage} />
          </CustomTouchable>
          <CustomTouchable onPress={notificationOnPress}>
            <BellIcon badgeCount={totalCount > 0 ? totalCount : undefined} />
          </CustomTouchable>
          <CustomTouchable onPress={toggleDrawer}>
            <Menu />
          </CustomTouchable>
        </HStack>
      </HStack>
    </VStack>
  );
};

const styles = StyleSheet.create({
  back: {padding: 5},
});
