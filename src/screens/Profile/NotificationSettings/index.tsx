import {yupResolver} from '@hookform/resolvers/yup';
import {VStack} from 'native-base';
import React, {useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet} from 'react-native';
import * as yup from 'yup';
import {
  CustomButton,
  CustomContainer,
  CustomDivider,
  CustomSwitch,
  ScreensHeader,
} from '~/components';
import {
  useActivationNotifications,
  useGetNotificationStatus,
} from '~/hooks/user';
import {useSchemas} from '~/schemas';
import {userDataStore} from '~/stores';

const defaultValues = {
  projects: false,
  bids: false,
  messages: false,
  questions: false,
};

export default function NotificationSettings() {
  const {t} = useTranslation();

  const {notificationSettingsSchema} = useSchemas();
  const {userData} = userDataStore(state => state);

  const {...methods} = useForm({
    resolver: yupResolver(notificationSettingsSchema),
    mode: 'onChange',
    defaultValues,
  });

  const {handleSubmit, setValue} = methods;

  const {
    data: getNotificationStatus,
    isLoading: isLoadingGetNotificationStatus,
  } = useGetNotificationStatus({userId: userData?.id});

  const {
    mutate: mutateChangeNotificationStatus,
    isLoading: isLOadingChangeNotification,
  } = useActivationNotifications();

  const result = getNotificationStatus?.user_getProfile?.result;

  useEffect(() => {
    result?.projectNotification &&
      setValue('projects', result?.projectNotification);
    result?.bidNotification && setValue('bids', result?.bidNotification);
    result?.chatNotification && setValue('messages', result?.chatNotification);
    result?.questionNotification &&
      setValue('questions', result?.questionNotification);
  }, [result]);

  const onSubmit = (formData: typeof defaultValues) => {
    const input = {
      projectNotification: formData?.projects,
      bidNotification: formData?.bids,
      chatNotification: formData?.messages,
      questionNotification: formData?.questions,
    };
    mutateChangeNotificationStatus({input});
  };

  return (
    <CustomContainer isLoading={isLoadingGetNotificationStatus}>
      <ScreensHeader backAction title={t('common.notification')} />
      <FormProvider {...methods}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          <CustomSwitch
            disabled={isLOadingChangeNotification}
            title={t('common.projects')}
            vibrate
            name="projects"
          />
          <CustomDivider />
          <CustomSwitch
            disabled={isLOadingChangeNotification}
            title={t('common.bids')}
            vibrate
            name="bids"
          />
          <CustomDivider />
          <CustomSwitch
            disabled={isLOadingChangeNotification}
            title={t('common.messages')}
            vibrate
            name="messages"
          />
          <CustomDivider />
          <CustomSwitch
            disabled={isLOadingChangeNotification}
            title={t('common.questions')}
            vibrate
            name="questions"
          />
          <CustomDivider />
        </ScrollView>
        <VStack px="24px" pb="24px">
          <CustomButton
            title={t('common.save')}
            loading={isLOadingChangeNotification}
            onPress={handleSubmit(onSubmit)}
          />
        </VStack>
      </FormProvider>
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
});
