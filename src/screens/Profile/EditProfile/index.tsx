import {yupResolver} from '@hookform/resolvers/yup';
import {Spinner, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Keyboard, KeyboardAvoidingView, StyleSheet} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import * as yup from 'yup';
import {
  CustomButton,
  CustomContainer,
  CustomKeyboardAwareScrollView,
  CustomText,
  CustomTouchable,
  FormInput,
  InfoModal,
  ProfilePicker,
  ScreensHeader,
} from '~/components';
import queryKeys from '~/constants/queryKeys';
import {ResponseStatus} from '~/generated/graphql';
import {queryClient} from '~/graphql/AuthProvider';
import {useKeyboardVisible} from '~/hooks/useKeyboardVisible';
import {
  useCheckUserNameExist,
  useGetMeProfile,
  useUpdateProfile,
} from '~/hooks/user';
import {goBack, push} from '~/navigation/Methods';
import {useSchemas} from '~/schemas';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {isIllegal, isIos, useGetMessages} from '~/utils/helper';
import {height, verticalScale} from '~/utils/style';
import {showErrorMessage} from '~/utils/utils';

export default function EditProfileScreen() {
  const {t} = useTranslation();
  const [imagePickerVisible, setImagePickerVisible] = React.useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState<boolean>(false);

  const {userData} = userDataStore(state => state);
  const {updateProfile} = useSchemas();
  const [userNameStatus, setUserNameStatus] = useState({
    confirmation: false,
    error: '',
  });
  const {showResponseMessage} = useGetMessages();

  const keyboardStatus = useKeyboardVisible();

  const getMeOptions = userData?.id ? {userId: userData?.id} : {enabled: false};

  const {isLoading: getProfileLoading, data: getProfile} =
    useGetMeProfile(getMeOptions);

  const profile = getProfile?.user_getProfile?.result ?? {};
  const {mutate: mutateUpdate, isLoading: updateLoading} = useUpdateProfile();
  const {mutate: mutateCheckUserName, isLoading: isLoadingCheckUserName} =
    useCheckUserNameExist();

  const {...methods} = useForm({
    resolver: yupResolver(updateProfile),
    mode: 'onChange',
  });

  const {handleSubmit, register, formState, setValue, watch} = methods;

  useEffect(() => {
    if (profile) {
      profile?.imageAddress && setValue('imageAddress', profile?.imageAddress);
      profile?.email && setValue('email', profile?.email);
      profile?.firstName && setValue('firstName', profile?.firstName);
      profile?.lastName && setValue('lastName', profile?.lastName);
      profile?.userName && setValue('userName', profile?.userName);
      profile?.bio && setValue('bio', profile?.bio);
      profile?.phoneNumber && setValue('phoneNumber', profile?.phoneNumber);
    }
  }, [profile]);

  const onChangeUserName = async (userName: string) => {
    const isValidUserName = await updateProfile.isValid({
      userName,
    });
    if (isValidUserName) {
      const data = {userId: userData?.id, username: userName};
      mutateCheckUserName(data, {
        onSuccess: async successData => {
          const userNameV2 = watch('userName');
          const isValidUserNameV2 = await updateProfile.isValid({
            userName: userNameV2,
          });
          if (isValidUserNameV2) {
            if (successData?.user_usernameExist?.result) {
              setUserNameStatus({
                confirmation: false,
                error: t('auth.completeProfile.userNameAlreadyExist'),
              });
            } else {
              setUserNameStatus({confirmation: true, error: ''});
            }
          }
        },
        onError: () => {
          setUserNameStatus({
            confirmation: false,
            error: '',
          });
        },
      });
    } else {
      setUserNameStatus({
        confirmation: false,
        error: '',
      });
    }
  };

  const onEdit = async (formData: any) => {
    Keyboard.dismiss();
    let userInput = {
      ...formData,
      imageAddress: profile?.userImages?.[0]?.imageAddress,
      id: userData?.id,
    };
    delete userInput.email;
    delete userInput.phoneNumber;
    delete userInput.imageAddress;

    if (formData?.bio && isIllegal(formData?.bio)) {
      setInfoModalVisible(true);
    } else {
      mutateUpdate(userInput, {
        onSuccess: successData => {
          if (
            successData?.user_updateProfile?.status === ResponseStatus.Success
          ) {
            goBack();
            queryClient.invalidateQueries([
              queryKeys.myProfile,
              {exact: false},
            ]);
          } else {
            showResponseMessage(successData?.user_updateProfile?.status);
          }
        },
      });
    }
  };

  const onCloseInfoModal = () => {
    setInfoModalVisible(false);
  };

  const openImagePicker = () => {
    setImagePickerVisible(true);
  };

  const verifyPhoneNumber = () => {
    push('VerifyPhoneNumber');
  };

  const loading = updateLoading || getProfileLoading;

  return (
    <CustomContainer isLoading={loading}>
      <ScreensHeader
        backAction
        title={t('profile.settings.editProfile')}
        rightHeader={
          <CustomTouchable onPress={openImagePicker}>
            <CustomText color={Colors.PRIMARY}>
              {t('profile.upload')}
            </CustomText>
          </CustomTouchable>
        }
      />
      <KeyboardAvoidingView
        behavior={isIos ? 'padding' : 'height'}
        style={styles.container}>
        <FormProvider {...methods}>
          <CustomKeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}>
            <VStack py="8" space="16" px="4">
              <ProfilePicker
                title={profile?.fullName || profile?.userName || profile?.email}
                {...{formState, imagePickerVisible, setImagePickerVisible}}
                {...register('imageAddress')}
              />
              <VStack space="4">
                <FormInput
                  {...register('email')}
                  label={t('auth.completeProfile.email')}
                  placeholder={t('auth.completeProfile.email')}
                  {...{formState}}
                  disabled
                />
                <FormInput
                  {...register('userName')}
                  {...{formState}}
                  label={t('auth.completeProfile.userName')}
                  autoComplete="username"
                  useDebounce
                  onChangeText={onChangeUserName}
                  rightComponent={
                    userNameStatus.confirmation ? (
                      <AntDesignIcon
                        name="check"
                        color={Colors.LimeGreen}
                        size={24}
                      />
                    ) : isLoadingCheckUserName ? (
                      <Spinner size={24} color={Colors.PRIMARY} />
                    ) : undefined
                  }
                />
                <FormInput
                  {...register('firstName')}
                  label={t('profile.settings.firstName')}
                  placeholder={t('profile.settings.firstName')}
                  {...{formState}}
                  autoComplete="given-name"
                />
                <FormInput
                  {...register('lastName')}
                  label={t('profile.settings.lastName')}
                  placeholder={t('profile.settings.lastName')}
                  {...{formState}}
                  autoComplete="family-name"
                />
                <FormInput
                  {...register('bio')}
                  textArea
                  label={t('profile.settings.bio')}
                  placeholder="type ..."
                  multiline
                  {...{formState}}
                />
                <FormInput
                  {...register('phoneNumber')}
                  label={t('profile.edit.phoneNumber')}
                  {...{formState}}
                  isReadOnly
                  onPress={verifyPhoneNumber}
                />
              </VStack>
            </VStack>
          </CustomKeyboardAwareScrollView>

          <VStack
            mx="4"
            mt="2"
            alignItems={'center'}
            bg={Colors.WHITE}
            space="2"
            bottom={
              isIos
                ? keyboardStatus
                  ? height * 0.07
                  : 0
                : !keyboardStatus
                ? height * 0.02
                : height * 0.02
            }
            py="4">
            <CustomButton
              mt="3"
              title={t('common.save')}
              height={verticalScale(45)}
              onPress={handleSubmit(onEdit)}
            />
          </VStack>
        </FormProvider>
      </KeyboardAvoidingView>
      <InfoModal
        isVisible={infoModalVisible}
        onClose={onCloseInfoModal}
        title={t('messages.errors.warning')}
        description={t('messages.errors.restrictError')}
        submitTitle={t('messages.errors.iUnderstand')}
      />
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
});
