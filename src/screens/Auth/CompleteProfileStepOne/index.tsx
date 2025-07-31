import {yupResolver} from '@hookform/resolvers/yup';
import {Flex, Spinner, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import * as yup from 'yup';
import SmallHuduLogo from '~/assets/images/smallHuduLogo';
import {
  CustomButton,
  CustomContainer,
  CustomKeyboardAvoidingView,
  CustomKeyboardAwareScrollViewV2,
  CustomText,
  FormInput,
  FormInputReferral,
  ScreensHeader,
  TextButton,
} from '~/components';
import {ResponseStatus} from '~/generated/graphql';
import {
  useCheckUserNameExist,
  useSignUpReferralCode,
  useUpdateProfile,
} from '~/hooks/user';
import {replace, resetRoot} from '~/navigation/Methods';
import {useSchemas} from '~/schemas';
import {storeData} from '~/services/storage';
import {authStore, tempStore, userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {useGetMessages} from '~/utils/helper';
import {fontFamily, fontSize} from '~/utils/style';

const defaultValues = {
  firstName: '',
  lastName: '',
  userName: '',
  referralCode: '',
};

function insert(str, index, value) {
  return str?.substr?.(0, index) + value + str?.substr?.(index);
}

export default function CompleteProfileStepOneScreen({route}: NavigationProp) {
  const parent = route?.params!.parent;

  const {completeProfileSchemaStep1} = useSchemas();
  const {showResponseMessage} = useGetMessages();
  const {t} = useTranslation();
  const {setIsUserLoggedIn} = authStore(state => state);
  const {userData} = userDataStore(state => state);

  const {mutate: mutateCheckUserName, isLoading: isLoadingCheckUserName} =
    useCheckUserNameExist();
  const {mutate: mutateUpdateProfile, isLoading: isLoadingUpdateProfile} =
    useUpdateProfile();
  const {
    mutate: mutateSignUpReferralCode,
    isLoading: isLoadingSignUpReferralCode,
  } = useSignUpReferralCode();

  const skipOnPress = async () => {
    await storeData('isUserLoggedIn', true);
    setIsUserLoggedIn(true);
    if (parent === 'appNavigator') {
      resetRoot('DrawerStack');
    }
  };

  const [userNameStatus, setUserNameStatus] = useState({
    confirmation: false,
    error: '',
    defaultValues,
  });

  const {...methods} = useForm({
    resolver: yupResolver(completeProfileSchemaStep1),
    mode: 'onChange',
  });

  const {handleSubmit, register, formState, watch, setValue} = methods;

  useEffect(() => {
    const referralCode = tempStore.getState().referralCode;
    referralCode && setValue('referralCode', referralCode);
  }, [tempStore]);

  const onChangeUserName = async (userName: string) => {
    const isValidUserName = await completeProfileSchemaStep1.isValid({
      userName,
    });
    if (isValidUserName) {
      const data = {userId: userData?.id, username: userName};
      mutateCheckUserName(data, {
        onSuccess: async successData => {
          const userNameV2 = watch('userName');
          const isValidUserNameV2 = await completeProfileSchemaStep1.isValid({
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

  const ContinueOnPress = (formData: typeof defaultValues) => {
    const referralCodeTemp = insert(formData?.referralCode, 4, '-');

    if (formData?.referralCode) {
      mutateSignUpReferralCode(referralCodeTemp, {
        onSuccess: successData => {
          if (
            successData?.user_signUpReferallCode?.status ===
            ResponseStatus.Success
          ) {
            updateProfile(formData);
          } else {
            showResponseMessage(successData?.user_signUpReferallCode?.status);
          }
        },
      });
    } else {
      updateProfile(formData);
    }
  };

  const updateProfile = async (formData: typeof defaultValues) => {
    if (!userNameStatus?.error) {
      const input = {
        firstName: formData?.firstName,
        lastName: formData?.lastName,
        userName: formData?.userName,
        id: userData?.id,
      };
      mutateUpdateProfile(input as any, {
        onSuccess: async successData => {
          if (
            successData?.user_updateProfile?.status === ResponseStatus.Success
          ) {
            replace('CompleteProfileStepTwo');
          }
        },
        onError: () => {},
      });
    }
  };

  const loading = isLoadingUpdateProfile || isLoadingSignUpReferralCode;

  return (
    <CustomContainer>
      <ScreensHeader
        centerHeader={<SmallHuduLogo />}
        rightHeader={
          <TextButton title={t('auth.skip')} onPress={skipOnPress} />
        }
      />
      <FormProvider {...methods}>
        <CustomKeyboardAvoidingView androidKeyboardVerticalOffset={10}>
          <VStack flex={1}>
            <CustomKeyboardAwareScrollViewV2>
              <Flex flex={1}>
                <VStack flex={1} py="6" space="4">
                  <CustomText
                    color={Colors.Rhino}
                    marginBottom={26}
                    fontSize={fontSize.tooLarge}
                    fontFamily={fontFamily.medium}>
                    {t('auth.completeProfile.step1Title')}
                  </CustomText>
                  {/* <CustomText
                    marginBottom={26}
                    fontSize={fontSize.small}
                    fontFamily={fontFamily.regular}>
                    {t('auth.completeProfile.step1Description')}
                  </CustomText> */}
                  <FormInput
                    {...register('firstName')}
                    {...{formState}}
                    label={t('auth.completeProfile.firstName')}
                    autoComplete="given-name"
                    disabled={loading}
                  />
                  <FormInput
                    {...register('lastName')}
                    {...{formState}}
                    label={t('auth.completeProfile.lastName')}
                    autoComplete="family-name"
                    disabled={loading}
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
                    disabled={loading}
                  />
                  {userNameStatus?.error ? (
                    <CustomText
                      marginTop={-10}
                      color={Colors.FrenchRose}
                      fontSize={fontSize.small}
                      fontFamily={fontFamily.regular}>
                      {userNameStatus?.error}
                    </CustomText>
                  ) : null}
                  <FormInputReferral
                    {...register('referralCode')}
                    {...{formState}}
                    label={t('auth.completeProfile.referralCode')}
                    disabled={loading}
                  />
                </VStack>
                <CustomButton
                  mb="6"
                  title={t('common.continue')}
                  loading={loading}
                  onPress={handleSubmit(ContinueOnPress)}
                />
              </Flex>
            </CustomKeyboardAwareScrollViewV2>
          </VStack>
        </CustomKeyboardAvoidingView>
      </FormProvider>
    </CustomContainer>
  );
}
