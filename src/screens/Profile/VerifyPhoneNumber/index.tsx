import {yupResolver} from '@hookform/resolvers/yup';
import {HStack, VStack} from 'native-base';
import React, {useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import * as yup from 'yup';
import {SmallHuduLogo} from '~/assets/images';
import {
  AnimationProvider,
  CustomButton,
  CustomContainer,
  CustomKeyboardAvoidingView,
  CustomText,
  CustomTouchable,
  FormInput,
  ScreensHeader,
} from '~/components';
import {ResponseStatus} from '~/generated/graphql';
import {useKeyboardVisible} from '~/hooks/useKeyboardVisible';
import {useAddPhoneNumber, useGetMeProfile} from '~/hooks/user';
import {push} from '~/navigation/Methods';
import {useSchemas} from '~/schemas';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {useGetMessages} from '~/utils/helper';
import {fontFamily, fontSize} from '~/utils/style';

const defaultValues = {
  phoneNumber: '',
};

export default function VerifyPhoneNumberScreen() {
  const {t} = useTranslation();

  const {userData} = userDataStore(state => state);
  const {verifyPhoneNumberSchema} = useSchemas();
  const {showResponseMessage} = useGetMessages();
  const keyboardVisible = useKeyboardVisible();

  const getMeOptions = userData?.id ? {userId: userData?.id} : {enabled: false};

  const {isLoading: getProfileLoading, data: getProfile} =
    useGetMeProfile(getMeOptions);

  const profile = getProfile?.user_getProfile?.result ?? {};
  const {mutate: mutateAddPhoneNumber, isLoading: isLoadingAddPhoneNumber} =
    useAddPhoneNumber();

  const {...methods} = useForm({
    resolver: yupResolver(verifyPhoneNumberSchema),
    mode: 'onChange',
    defaultValues,
  });

  const {handleSubmit, register, formState, setValue} = methods;

  useEffect(() => {
    if (profile) {
      profile?.phoneNumber && setValue('phoneNumber', profile?.phoneNumber);
    }
  }, [profile]);

  const onSubmit = async (formData: typeof defaultValues) => {
    let phoneNumber = '';

    if (!formData?.phoneNumber.startsWith('+1')) {
      phoneNumber = `+1${formData?.phoneNumber}`;
    } else {
      phoneNumber = formData?.phoneNumber;
    }

    mutateAddPhoneNumber(
      {phoneNumber, countryCode: '+1'},
      {
        onSuccess: successData => {
          if (
            successData?.user_addPhoneNumber?.status === ResponseStatus.Success
          ) {
            push('VerificationCode', {phoneNumber: formData?.phoneNumber});
          } else {
            showResponseMessage(successData?.user_addPhoneNumber?.status);
          }
        },
      },
    );
  };

  const loading = isLoadingAddPhoneNumber || getProfileLoading;

  return (
    <CustomContainer isLoading={loading}>
      <ScreensHeader backAction centerHeader={<SmallHuduLogo />} />
      <FormProvider {...methods}>
        <CustomKeyboardAvoidingView>
          <VStack flex={1}>
            <VStack flex={1} px="24px" pt="32px" pb="24px">
              <CustomText fontSize={fontSize.tooLarge} marginBottom={16}>
                {t('profile.edit.verifyYourPhoneNumber')}
              </CustomText>
              <CustomText fontSize={fontSize.small} marginBottom={42}>
                {t('profile.edit.verifyPhoneNumberDescription')}
              </CustomText>
              <FormInput
                {...register('phoneNumber')}
                label={t('profile.edit.phoneNumber')}
                {...{formState}}
                placeholder="+123456789"
                keyboardType="phone-pad"
              />
            </VStack>
            <AnimationProvider
              visible={keyboardVisible}
              visibleChildren={
                <HStack
                  justifyContent="flex-end"
                  alignItems="center"
                  h="48px"
                  px="24px"
                  bg={Colors.SEARCH_BACKGROUND}>
                  <CustomTouchable onPress={handleSubmit(onSubmit)}>
                    <CustomText
                      marginBottom={8}
                      color={Colors.PRIMARY}
                      fontFamily={fontFamily.medium}
                      fontSize={fontSize.xNormal}>
                      {t('common.continue')}
                    </CustomText>
                  </CustomTouchable>
                </HStack>
              }
              inVisibleChildren={
                <VStack px="24px" pb="24px" pt="8px">
                  <CustomButton
                    title={t('common.continue')}
                    onPress={handleSubmit(onSubmit)}
                  />
                </VStack>
              }
            />
          </VStack>
        </CustomKeyboardAvoidingView>
      </FormProvider>
    </CustomContainer>
  );
}
