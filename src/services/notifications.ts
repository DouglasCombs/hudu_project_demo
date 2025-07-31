import notifee, {AndroidImportance} from '@notifee/react-native';
import {isIos} from '~/utils/helper';

export const showLocalNotification = async ({
  title,
  message,
  data,
  channelId = 'Hudu Notifications',
}: {
  title: string | undefined;
  message: string;
  data: any;
  channelId?: 'Hudu Notifications' | 'Hudu Messages' | 'Hudu support';
}) => {
  const notificationObject = {
    title,
    message,
    data,
    channelId,
  };
  if (isIos) {
    showIosLocalNotification(notificationObject);
  } else {
    showAndroidLocalNotification(notificationObject);
  }
};

const showIosLocalNotification = async ({
  title,
  message,
  data,
  channelId,
}: {
  title: string | undefined;
  message: string | undefined;
  data: any;
  channelId?: 'Hudu Notifications' | 'Hudu Messages' | 'Hudu support';
}) => {
  await notifee.displayNotification({
    title,
    id: title,
    body: message,
    data,
    ios: {categoryId: channelId},
    android: {
      channelId: 'Hudu Notifications',
    },
  });
};

const showAndroidLocalNotification = async ({
  title,
  message,
  data,
  channelId,
}: {
  title: string | undefined;
  message: string;
  data: any;
  channelId: 'Hudu Notifications' | 'Hudu Messages';
}) => {
  await notifee.requestPermission();
  await notifee.createChannel({
    id: channelId,
    name: 'Hudu',
    importance: AndroidImportance.HIGH,
  });
  await notifee.displayNotification({
    title,
    id: title,
    body: message,
    data,
    android: {
      channelId: channelId,
    },
  });
};
