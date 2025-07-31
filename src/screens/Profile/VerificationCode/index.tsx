import {yupResolver} from '@hookform/resolvers/yup';
import {Center, HStack, VStack} from 'native-base';
import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import * as yup from 'yup';
import {SmallHuduLogo} from '~/assets/images';
import {
  AnimationProvider,
  CustomButton,
  CustomCodeInput,
  CustomContainer,
  CustomKeyboardAvoidingView,
  CustomText,
  CustomTouchable,
  ScreensHeader,
} from '~/components';
import {ResponseStatus} from '~/generated/graphql';
import {useKeyboardVisible} from '~/hooks/useKeyboardVisible';
import {useAddPhoneNumber, useConfirmPhoneNumber} from '~/hooks/user';
import {useSchemas} from '~/schemas';
import {Colors} from '~/styles';
import {useGetMessages} from '~/utils/helper';
import {fontFamily, fontSize} from '~/utils/style';
import {showErrorMessage, showSuccessMessage} from '~/utils/utils';
import queryKeys from '~/constants/queryKeys';
import {queryClient} from '~/graphql/AuthProvider';

const defaultValues = {
  verificationCode: '',
};

export default function VerificationCodeScreen({
  route,
  navigation,
}: NavigationProp) {
  const phoneNumber = route!.params?.phoneNumber;

  const {t} = useTranslation();

  const {verificationSchema} = useSchemas();
  const {showResponseMessage} = useGetMessages();
  const keyboardVisible = useKeyboardVisible();

  const {
    mutate: mutateConfirmPhoneNumber,
    isLoading: isLoadingConfirmPhoneNumber,
  } = useConfirmPhoneNumber();
  const {mutate: mutateAddPhoneNumber, isLoading: isLoadingAddPhoneNumber} =
    useAddPhoneNumber();

  const {...methods} = useForm({
    resolver: yupResolver(verificationSchema),
    mode: 'onChange',
    defaultValues,
  });

  const {handleSubmit, register} = methods;

  const onSubmit = async (formData: typeof defaultValues) => {
    mutateConfirmPhoneNumber(
      {verificationCode: formData?.verificationCode},
      {
        onSuccess: successData => {
          if (
            successData?.user_confirmPhoneNumber?.status ===
            ResponseStatus.Success
          ) {
            navigation.popToTop();
            queryClient.invalidateQueries([queryKeys.myProfile], {
              exact: false,
            });
          } else if (
            successData?.user_confirmPhoneNumber?.status ===
            ResponseStatus.UnknownError
          ) {
            showErrorMessage(t('messages.errors.verifyCodeNotValid'));
          } else {
            showResponseMessage(successData?.user_confirmPhoneNumber?.status);
          }
        },
      },
    );
  };

  const resendCodeOnPress = () => {
    mutateAddPhoneNumber(
      {phoneNumber, countryCode: '+1'},
      {
        onSuccess: successData => {
          if (
            successData?.user_addPhoneNumber?.status === ResponseStatus.Success
          ) {
            showSuccessMessage(successData?.user_addPhoneNumber?.status);
          } else {
            showResponseMessage(successData?.user_addPhoneNumber?.status);
          }
        },
      },
    );
  };

  const loading = isLoadingAddPhoneNumber || isLoadingConfirmPhoneNumber;

  return (
    <CustomContainer isLoading={loading}>
      <ScreensHeader backAction centerHeader={<SmallHuduLogo />} />
      <FormProvider {...methods}>
        <CustomKeyboardAvoidingView>
          <VStack flex={1}>
            <VStack flex={1} px="24px" pb="24px" pt="32px">
              <CustomText fontSize={fontSize.tooLarge} marginBottom={16}>
                {t('profile.edit.verifyYourPhoneNumber')}
              </CustomText>
              <HStack
                justifyContent="space-between"
                space="32px"
                alignItems="center"
                mb="42px">
                <CustomText fontSize={fontSize.small}>
                  {t('profile.edit.verificationCodeDescription')}
                </CustomText>
                <CustomText
                  fontFamily={fontFamily.medium}
                  fontSize={fontSize.small}>
                  {phoneNumber}
                </CustomText>
              </HStack>
              <CustomCodeInput length={6} {...register('verificationCode')} />
              <HStack justifyContent="center" mt="42px">
                <CustomTouchable onPress={resendCodeOnPress}>
                  <Center>
                    <CustomText
                      underline
                      color={Colors.PRIMARY}
                      fontFamily={fontFamily.medium}
                      fontSize={fontSize.small}>
                      {t('profile.edit.resendCode')}
                    </CustomText>
                  </Center>
                </CustomTouchable>
              </HStack>
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
