import React, {Fragment, useState} from 'react';
import {Divider, VStack} from 'native-base';
import {Linking} from 'react-native';
import {navigate} from '~/navigation/Methods';
import {authStore, userDataStore} from '~/stores';
import {
  QuestionModal,
  LinkItem,
  CustomLoading,
  DeleteAccountModal,
} from '~/components';
import {useDeleteAccount} from '~/hooks/user';
import {useSignOutAuth} from '~/hooks/auth';
import {useOnboardingStripe} from '~/hooks/payment';
import {graphQLClient} from '~/graphql/graphQLClient';
import {queryClient} from '~/graphql/AuthProvider';
import {removeData} from '~/services/storage';

export default function ProfileLinks() {
  const LINKS = [
    {
      id: 1,
      title: 'Edit Profile',
      navLink: 'EditProfile',
      url: null,
    },
    {
      id: 2,
      title: 'Notifications',
      navLink: 'Notification',
      url: null,
    },
    {
      id: 3,
      title: 'Reviews',
      navLink: 'Reviews',
      url: null,
    },
    {
      id: 7,
      title: 'Manage Payment Account',
      navLink: null,
      url: null,
      onPress: () => paymentOnPress(),
    },
    {
      id: 5,
      title: 'FAQ & Tutorials',
      navLink: null,
      url: 'https://heyhudu.com/faq/',
    },
    {
      id: 4,
      title: 'Terms and Conditions',
      navLink: null,
      url: 'https://heyhudu.com/terms-and-conditions/',
    },
    {
      id: 6,
      title: 'Privacy Policy',
      navLink: null,
      url: 'https://heyhudu.com/privacy/',
    },
    {
      id: 8,
      title: 'Support',
      navLink: 'null',
      url: 'https://heyhudu.com/support/',
    },
    {
      id: 9,
      title: 'Delete account',
      navLink: null,
      url: null,
      onPress: () => deleteAccountOnPress(),
    },
  ];

  const {setIsUserLoggedIn} = authStore(state => state);
  const {userData, setUserData} = userDataStore(state => state);
  const {signOut} = useSignOutAuth();
  const {mutate: mutateOnBoarding, isLoading: onBoardingLoading} =
    useOnboardingStripe();
  const {mutate: mutateDeleteAccount, isLoading: deleteAccountLoading} =
    useDeleteAccount();

  const [loading, setLoading] = useState<boolean>(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);

  const onItemPressHandler = (item: any) => {
    if (item.url) {
      Linking.openURL(item.url);
    } else if (item.navLink) {
      //@ts-ignore
      navigate('AuthStack', {
        screen: item.navLink,
      });
    } else if (item?.onPress) {
      item.onPress();
    }
  };

  const paymentOnPress = () => {
    mutateOnBoarding({});
  };

  const deleteAccountOnPress = () => {
    setDeleteModalVisible(true);
  };

  const onLogOutPressHandler = () => {
    setLogoutModalVisible(true);
  };

  const onCloseLogoutModal = () => {
    setLogoutModalVisible(false);
  };

  const onCloseDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  const onAcceptLogoutModal = async () => {
    setLoading(true);
    graphQLClient.setHeader('authorization', '');
    await signOut();
    queryClient.cancelQueries();
    queryClient.clear();
    authStore.setState({token: undefined});
    await removeData('isUserLoggedIn');
    await removeData('userData');
    setLoading(false);
    setLogoutModalVisible(false);
    setIsUserLoggedIn(false);
    setUserData({});
  };

  const onAcceptDeleteModal = async () => {
    mutateDeleteAccount(userData?.id, {
      onSuccess: () => {
        setDeleteModalVisible(false);
      },
      onError: () => {
        setDeleteModalVisible(false);
      },
    });
  };

  return (
    <>
      {onBoardingLoading && <CustomLoading />}
      <VStack top="-70px" mb="-70px">
        {LINKS.map(item => (
          <Fragment key={item.id}>
            <LinkItem
              title={item.title}
              onPress={() => onItemPressHandler(item)}
            />
            {<Divider my="1" />}
          </Fragment>
        ))}
        <LinkItem mt="4" last title="Log out" onPress={onLogOutPressHandler} />
      </VStack>
      {logoutModalVisible && (
        <QuestionModal
          option1="Cancel"
          option2="Log out"
          loading={loading}
          visible={logoutModalVisible}
          onClose={onCloseLogoutModal}
          option1OnPress={onCloseLogoutModal}
          option2OnPress={onAcceptLogoutModal}
          title="Are you sure you want to log out?"
        />
      )}
      {deleteModalVisible && (
        <DeleteAccountModal
          option1="Cancel"
          option2="Delete"
          loading={deleteAccountLoading}
          visible={deleteModalVisible}
          onClose={onCloseDeleteModal}
          option1OnPress={onCloseDeleteModal}
          option2OnPress={onAcceptDeleteModal}
          title="Are you sure you want to delete your account permanently?"
          description="By deleting your account, all your data will be deleted except the transaction history, including price and transaction date, made prior to this step for tax and bookkeeping purposes."
        />
      )}
    </>
  );
}
