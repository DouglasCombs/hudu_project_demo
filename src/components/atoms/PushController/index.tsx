import {useEffect, memo} from 'react';
import messaging from '@react-native-firebase/messaging';
import {storeData} from '~/services/storage';
import {userDataStore} from '~/stores';
import {navigate} from '~/navigation/Methods';
import notifee, {EventType} from '@notifee/react-native';
import {isIos} from '~/utils/helper';

notifee.onForegroundEvent(async ({type, detail}) => {
  const channelId = isIos
    ? detail?.notification?.ios?.categoryId
    : detail?.notification?.android?.channelId;
  if (type === EventType.PRESS) {
    const notificationData = detail?.notification?.data;
    if (channelId === 'Hudu Messages') {
      if (
        notificationData?.messageAdded &&
        notificationData?.messageAdded?.conversationId !== undefined &&
        notificationData?.messageAdded?.senderId !== undefined
      ) {
        navigate('Chat', {
          user: {id: notificationData?.messageAdded?.senderId},
          conversationId: notificationData?.messageAdded?.conversationId,
        });
      } else {
        navigate('Message');
      }
    } else if (channelId === 'Hudu support') {
      if (
        notificationData?.subscribeToGroupMessageAdded &&
        notificationData?.subscribeToGroupMessageAdded?.conversationId !==
          undefined
      ) {
        navigate('GroupChat', {
          conversationId:
            notificationData?.subscribeToGroupMessageAdded?.conversationId,
        });
      }
    } else {
      navigate('Notification');
    }
  }
});

const PushController = () => {
  const {userData} = userDataStore(state => state);

  useEffect(() => {
    checkPermission();
    // Listen to whether the token changes
    return messaging().onTokenRefresh(token => {
      saveFcmToken(token);
    });
  }, []);

  const checkPermission = async () => {
    const enabled = await messaging().hasPermission();
    enabled === 1 ? getFcmToken() : requestPermission();
  };

  const getFcmToken = async () => {
    messaging()
      .registerDeviceForRemoteMessages() // no-op on Android and if already registered
      .then(() => messaging().getToken())
      .then(fcmToken => {
        saveFcmToken(fcmToken);
        messageListener();
      });
  };

  const requestPermission = async () => {
    try {
      await messaging().requestPermission();
      getFcmToken();
    } catch (error) {
      // User has rejected permissions
    }
  };

  const saveFcmToken = async (token: any) => {
    await storeData('FCM_TOKEN', token);
  };

  const messageListener = () => {
    messaging()
      .subscribeToTopic(`user${userData?.id}`)
      .then(async remoteMessage => {
        // console.log('remoteMessage*=>', remoteMessage); //TODO remove in prd release
      });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage?.data?.notification) {
          const notificationData = JSON?.parse?.(
            remoteMessage?.data?.notification,
          );
          if (notificationData?.NotificationType === 11) {
            if (
              notificationData?.Messages &&
              notificationData?.Messages?.ConversationId !== undefined &&
              notificationData?.Messages?.SenderId !== undefined
            ) {
              navigate('Chat', {
                user: {id: notificationData?.Messages?.SenderId},
                conversationId: notificationData?.Messages?.ConversationId,
              });
            } else {
              navigate('Message');
            }
          } else {
            navigate('Notification');
          }
        }
      });
  };

  return null;
};

export default memo(PushController);
