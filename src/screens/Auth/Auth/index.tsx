import {yupResolver} from '@hookform/resolvers/yup';
import {HStack, VStack} from 'native-base';
import React, {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Linking, StyleSheet, TouchableOpacity} from 'react-native';
import {WithLocalSvg} from 'react-native-svg';
import Feather from 'react-native-vector-icons/Feather';
import * as yup from 'yup';
import {Apple, CircleArrowRight, Facebook, Google} from '~/assets/icons';
import images from '~/assets/images';
import {
  CustomButton,
  CustomContainer,
  CustomKeyboardAwareScrollView,
  CustomText,
  CustomTouchable,
  FormInput,
} from '~/components';
import {PrivacyUrl, TermsUrl} from '~/constants/constants';
import {ResponseStatus} from '~/generated/graphql';
import {
  useAppleAuth,
  useFacebookAuth,
  useGoogleAuth,
  useLogin,
  useSendSignInLink,
  useSignUp,
} from '~/hooks/auth';
import {navigate, resetRoot} from '~/navigation/Methods';
import {useSchemas} from '~/schemas';
import {storeData} from '~/services/storage';
import {authStore, userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {isIos, useGetMessages} from '~/utils/helper';
import {fontFamily, fontSize, scale, verticalScale} from '~/utils/style';

const defaultValues = {
  email: '',
};

export default function AuthScreen({route}: NavigationProp) {
  const {authSchema} = useSchemas();

  const {...methods} = useForm({
    resolver: yupResolver(authSchema),
    mode: 'onChange',
    defaultValues,
  });

  const parent = route?.params!.parent;

  const {t} = useTranslation();
  const {showResponseMessage} = useGetMessages();

  const {handleSubmit, register, formState} = methods;

  const {setIsUserLoggedIn} = authStore(state => state);
  const {setUserData} = userDataStore(state => state);

  const [loading, setLoading] = useState<boolean>(false);

  const {mutate: loginMutate} = useLogin();
  const {mutate: signUpMutate} = useSignUp();
  const {signInWithGoogle} = useGoogleAuth();
  const {signInWithFacebook} = useFacebookAuth();
  const {signInWithApple} = useAppleAuth();
  const {sendSignInLinkToEmail, isLoading: isLoadingSendSignInLink} =
    useSendSignInLink();

  const skipOnPress = () => {
    resetRoot('DrawerStack');
  };

  const loginOnPress = (formData: typeof defaultValues) => {
    sendSignInLinkToEmail(formData?.email);
  };

  const googleOnPress = async () => {
    setLoading(true);
    const res = await signInWithGoogle();
    if (res?.data) {
      completeLogin({});
    } else {
      setLoading(false);
    }
  };

  const facebookOnPress = async () => {
    setLoading(true);
    const res = await signInWithFacebook();
    if (res?.data) {
      const email = res?.data?.fullResult?.user?.email;
      completeLogin({email});
    } else {
      setLoading(false);
    }
  };

  const appleOnPress = async () => {
    setLoading(true);
    const res = await signInWithApple();
    if (res?.data) {
      completeLogin({});
    } else {
      setLoading(false);
    }
  };

  const completeLogin = ({
    type = 'social',
    email,
  }: {
    type?: 'social' | 'email';
    email?: string;
  }) => {
    loginMutate(
      {},
      {
        onSuccess: async successData => {
          if (successData?.user_login?.status === ResponseStatus.Success) {
            if (successData?.user_login?.result?.isActive) {
              setLoading(false);
              setUserData(successData?.user_login?.result);
              await storeData('isUserLoggedIn', true);
              setIsUserLoggedIn(true);
              if (parent === 'appNavigator') {
                resetRoot('DrawerStack');
              }
            } else {
              setLoading(false);
              showResponseMessage(ResponseStatus.UserNotFound);
            }
          } else {
            if (
              type === 'social' &&
              successData?.user_login?.status === ResponseStatus.UserNotFound
            ) {
              completeSignUp({...(email && {email})});
            } else {
              setLoading(false);
              showResponseMessage(successData?.user_login?.status);
            }
          }
        },
        onError: () => {
          setLoading(false);
        },
      },
    );
  };

  const completeSignUp = async ({email}: {email?: string}) => {
    signUpMutate(
      {email},
      {
        onSuccess: () => {
          setLoading(false);
        },
        onError: () => {
          setLoading(false);
        },
      },
    );
  };

  const termsOnPress = () => {
    Linking.openURL(TermsUrl);
  };

  const privacyOnPress = () => {
    Linking.openURL(PrivacyUrl);
  };

  return (
    <CustomContainer
      statusBarBackgroundColor={Colors.WHITE_F}
      barStyle="dark-content"
      backgroundImage={images.authBackground}
      isLoading={loading || isLoadingSendSignInLink}>
      <FormProvider {...methods}>
        <CustomKeyboardAwareScrollView
          contentContainerStyle={styles.contentContainerStyle}>
          <VStack flex={1} px="24px" alignItems="center">
            {parent === 'appNavigator' && (
              <HStack justifyContent="flex-end" w="100%">
                <TouchableOpacity onPress={skipOnPress} activeOpacity={0.7}>
                  <CustomText color={Colors.Topaz}>{t('auth.skip')}</CustomText>
                </TouchableOpacity>
              </HStack>
            )}
            <VStack px="8" my="60px" alignItems="center">
              <WithLocalSvg
                asset={images.authLogo}
                width={scale(185)}
                height={verticalScale(56)}
                color={Colors.PRIMARY}
              />
              <CustomText
                fontSize={fontSize.xLarge}
                fontFamily={fontFamily.bold}
                textAlign="center"
                marginTop={verticalScale(28)}>
                {t('auth.welcome')}
              </CustomText>
              <CustomText
                lineHeight={18}
                fontSize={fontSize.small}
                textAlign="center"
                marginTop={verticalScale(8)}>
                {t('auth.connect')}
              </CustomText>
            </VStack>
            <VStack width="full" space="4">
              <FormInput
                otline
                {...register('email')}
                placeholder={t('auth.email_placeholder')}
                {...{formState}}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                rightComponent={
                  <CustomTouchable onPress={handleSubmit(loginOnPress)}>
                    <CircleArrowRight />
                  </CustomTouchable>
                }
              />
              <CustomText fontSize={fontSize.small} textAlign="center">
                {t('auth.continue_with')}
              </CustomText>
              {isIos && (
                <CustomButton
                  color={Colors.BLACK}
                  title={t('auth.apple')}
                  onPress={appleOnPress}
                  leftIcon={<Apple />}
                />
              )}
              <CustomButton
                color={Colors.DodgerBlue}
                title={t('auth.facebook')}
                onPress={facebookOnPress}
                leftIcon={<Facebook />}
              />
              <CustomButton
                color={Colors.Eucalyptus}
                title={t('auth.google')}
                onPress={googleOnPress}
                leftIcon={<Google />}
              />
              <CustomButton
                color={Colors.Ronchi}
                title={t('auth.email')}
                onPress={() => {
                  navigate('Login');
                }}
                leftIcon={
                  <Feather name="mail" size={20} color={Colors.WHITE} />
                }
              />
            </VStack>
          </VStack>
          <VStack px="24px">
            <CustomText
              lineHeight={20}
              fontSize={fontSize.small}
              color={Colors.Topaz}
              textAlign="center"
              marginTop={verticalScale(40)}>
              {t('auth.agree_to')}
              <CustomText
                onPress={termsOnPress}
                underline
                fontSize={fontSize.small}
                color={Colors.BLACK}
                textAlign="center"
                marginTop={verticalScale(30)}>
                {t('auth.terms')}
              </CustomText>
              {t('auth.see_how')}
              <CustomText
                onPress={privacyOnPress}
                underline
                fontSize={fontSize.small}
                color={Colors.BLACK}
                textAlign="center"
                marginTop={verticalScale(30)}>
                {t('auth.privacy')}
              </CustomText>
              .
            </CustomText>
          </VStack>
        </CustomKeyboardAwareScrollView>
      </FormProvider>
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 48,
  },
});
