import {LogoutCurve} from 'iconsax-react-native';
import {Box, FlatList, HStack, Spinner, VStack} from 'native-base';
import React, {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {
  CartIcon,
  HelpIcon,
  LocIcon,
  ReferralIcon,
  SettingIcon,
  StarReviewIcon,
} from '~/assets/icons';
import {
  ConfirmationModalV2,
  CustomContainer,
  CustomText,
  CustomTouchable,
  HorizontalLogo,
} from '~/components';
import {ResponseStatus} from '~/generated/graphql';
import {queryClient} from '~/graphql/AuthProvider';
import graphQLClient from '~/graphql/graphQLClient';
import {useSignOutAuth} from '~/hooks/auth';
import {useGetGroupMembers, useGetGroupMessagesMutation} from '~/hooks/message';
import {useGetHasPaymentStripe} from '~/hooks/payment';
import {navigate, resetRoot, toggleDrawer} from '~/navigation/Methods';
import {removeData} from '~/services/storage';
import {authStore, userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {isIos} from '~/utils/helper';
import {scale, width} from '~/utils/style';

export default function MainDrawerContent() {
  const {t} = useTranslation();
  const modalRef = useRef<ModalRef>(null);
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);

  const {data: getPaymentStripe} = useGetHasPaymentStripe();
  const hasStripeAccount = getPaymentStripe?.payment_hasStripeAccount?.result;
  const {signOut} = useSignOutAuth();
  const {setIsUserLoggedIn, setToken} = authStore(state => state);
  const {userData, setUserData, groupConversationId, setGroupConversationId} =
    userDataStore(state => state);

  const {data: getGroupMembers} = useGetGroupMembers({
    where: {userId: {eq: userData.id}},
    conversationId: groupConversationId ?? -1,
  });

  const hasUnreadCount = getGroupMembers?.pages?.[0]?.unReadCount > 0;

  const {mutate: mutateGetGroupMessage, isLoading: isLoadingGetGroupMessages} =
    useGetGroupMessagesMutation();

  const dataHeader = [
    {
      title: t('profile.drawer.payments'),
      onPress: () =>
        navigate('UserPayments', {initialRoute: hasStripeAccount ? 0 : 1}),
      icon: <CartIcon />,
    },
    {
      title: t('profile.drawer.referrals'),
      onPress: () => navigateToReferral(),
      icon: <ReferralIcon />,
    },
    {
      title: t('profile.drawer.reviews'),
      onPress: () => navigate('UserReview'),
      icon: <StarReviewIcon />,
    },
    {
      title: t('profile.drawer.addresses'),
      onPress: () => navigate('UserAddresses'),
      icon: <LocIcon />,
    },
    {
      title: t('profile.drawer.setting'),
      onPress: () => navigate('Settings'),
      icon: <SettingIcon color={Colors.BLACK} />,
      style: {marginTop: scale(35)},
    },
    {
      title: t('profile.drawer.help'),
      onPress: () => chatWithAdmin(),
      icon: isLoadingGetGroupMessages ? (
        <Spinner size="small" color={Colors.BLACK} />
      ) : (
        <HelpIcon badge={hasUnreadCount} />
      ),
    },
    {
      title: t('profile.settings.logOut'),
      onPress: () => modalRef?.current?.open(),
      icon: <LogoutCurve size="24" color={Colors.FrenchRose} />,
      color: Colors.FrenchRose,
    },
  ];

  const itemOnPress = (item: any) => {
    item?.onPress?.();
  };

  const chatWithAdmin = async () => {
    if (groupConversationId) {
      navigate('GroupsChat');
    } else {
      const input = {
        where: {isMemberOfGroup: {eq: true}},
        userId: userData?.id,
      };
      mutateGetGroupMessage(input, {
        onSuccess: successData => {
          if (
            successData?.message_getGroups?.status === ResponseStatus.Success
          ) {
            const conversationId =
              successData?.message_getGroups?.result?.items?.[0]
                ?.conversationId;
            if (conversationId) {
              setGroupConversationId(conversationId);
            }
            navigate('GroupsChat');
          }
        },
      });
    }
  };

  const navigateToReferral = () => {
    navigate('ReferralCode');
  };

  const logOut = async () => {
    setLogoutLoading(true);
    setGroupConversationId(undefined);
    graphQLClient.setHeader('authorization', '');
    await signOut();
    queryClient.cancelQueries();
    queryClient.clear();
    await removeData('isUserLoggedIn');
    await removeData('userData');
    await removeData('id_token');
    await removeData('FCM_TOKEN');
    setIsUserLoggedIn(false);
    setToken(undefined);
    setUserData({});
    resetRoot('MainTabs');
    setLogoutLoading(false);
    toggleDrawer();
    modalRef?.current?.close();
  };

  const renderItem = ({item}: {item: any}) => {
    return (
      <CustomTouchable style={item?.style} onPress={() => itemOnPress(item)}>
        <HStack space="5" alignItems={'center'} py="3">
          <Box w="10%">{item?.icon}</Box>
          <CustomText color={item?.color ? item?.color : Colors.BLACK}>
            {item?.title}
          </CustomText>
        </HStack>
      </CustomTouchable>
    );
  };

  return (
    <CustomContainer
      pb={0}
      statusBarBackgroundColor={Colors.TRANSPARENT}
      backgroundColor={Colors.TRANSPARENT}>
      <VStack space="2" flex={1} bg={Colors.WHITE_F}>
        <Box px="4" pt={isIos ? 0 : '6'}>
          <HorizontalLogo
            style={{
              width: width * 0.2,
              height: width * 0.2 * (61 / 275),
            }}
          />
        </Box>
        <FlatList
          flex={1}
          data={dataHeader}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </VStack>
      <ConfirmationModalV2
        ref={modalRef}
        onSubmit={logOut}
        title={t('alerts.logOut')}
        description={t('alerts.areYouSureToLogOut')}
        submitTitle={t('alerts.ok')}
        submitColor={Colors.FrenchRose}
        isLoading={logoutLoading}
      />
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingVertical: 24,
    paddingStart: 16,
    backgroundColor: Colors.WHITE_F,
  },
});

/*

    {
      title: t('profile.drawer.documents'),
      onPress: () => navigate('Documents'),
      icon: <DocumentIcon />,
    },

    Linking.openURL(supportUrl);

*/
