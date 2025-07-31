import {yupResolver} from '@hookform/resolvers/yup';
import {HStack, VStack} from 'native-base';
import React, {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Keyboard, StyleSheet} from 'react-native';
import {WithLocalSvg} from 'react-native-svg';
import * as yup from 'yup';
import {Email, Lock} from '~/assets/icons';
import images from '~/assets/images';
import {
  CustomButton,
  CustomContainer,
  CustomKeyboardAwareScrollView,
  CustomText,
  CustomTouchable,
  FormInput,
  ScreensHeader,
} from '~/components';
import {ResponseStatus} from '~/generated/graphql';
import {useLogin, useLoginAuth} from '~/hooks/auth';
import {useGetEmailByUserName} from '~/hooks/user';
import {replace, resetRoot} from '~/navigation/Methods';
import {useSchemas} from '~/schemas';
import {storeData} from '~/services/storage';
import {authStore, userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {isEmail, useGetMessages} from '~/utils/helper';
import {fontFamily, fontSize, verticalScale} from '~/utils/style';
import {showErrorMessage} from '~/utils/utils';

const defaultValues = {
  email: '',
  password: '',
};

export default function LoginScreen() {
  const {loginSchema} = useSchemas();

  const {...methods} = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
    defaultValues,
  });

  const {setIsUserLoggedIn} = authStore(state => state);
  const {setUserData} = userDataStore(state => state);
  const {showResponseMessage} = useGetMessages();
  const {t} = useTranslation();

  const {loginWithEmailAndPass} = useLoginAuth();
  const {mutate: loginMutate} = useLogin();
  const {mutate: getEmailMutate} = useGetEmailByUserName();

  const [loading, setLoading] = useState<boolean>(false);

  const {handleSubmit, register, formState} = methods;

  const loginOnPress = async (formData: typeof defaultValues) => {
    Keyboard.dismiss();
    setLoading(true);
    if (isEmail(formData?.email)) {
      loginWithEmailPassword(formData?.email, formData?.password);
    } else {
      loginWithUserName(formData?.email, formData?.password);
    }
  };

  const loginWithEmailPassword = async (email: any, password: any) => {
    const response = await loginWithEmailAndPass(email, password);
    if (response?.data) {
      completeLogin();
    } else {
      setLoading(false);
    }
  };

  const loginWithUserName = async (email: any, password: any) => {
    const options = {where: {userName: {eq: email}}};
    getEmailMutate(options as any, {
      onSuccess: async successData => {
        if (successData?.user_getUsersSafe?.status === ResponseStatus.Success) {
          const userEmail =
            successData?.user_getUsersSafe?.result?.items?.[0]?.email;
          if (userEmail) {
            loginWithEmailPassword(userEmail, password);
          } else {
            setLoading(false);
            showErrorMessage(t('messages.errors.userNotFound'));
          }
        } else {
          setLoading(false);
          showResponseMessage(successData?.user_getUsersSafe?.status);
        }
      },
      onError: () => {
        setLoading(false);
      },
    });
  };

  const completeLogin = async () => {
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
              resetRoot('DrawerStack');
            } else {
              setLoading(false);
              showResponseMessage(ResponseStatus.UserNotFound);
            }
          } else {
            setLoading(false);
            showResponseMessage(successData?.user_login?.status);
          }
        },
        onError: () => {
          setLoading(false);
        },
      },
    );
  };

  const signUpOnPress = () => {
    replace('SignUp');
  };

  const forgotOnPress = () => {
    replace('ForgotPassword');
  };

  return (
    <CustomContainer
      statusBarBackgroundColor={Colors.WHITE_F}
      barStyle="dark-content"
      isLoading={loading}>
      <ScreensHeader
        contentColor={Colors.BLACK}
        backAction
        backgroundColor={Colors.TRANSPARENT}
      />
      <FormProvider {...methods}>
        <CustomKeyboardAwareScrollView
          contentContainerStyle={styles.contentContainerStyle}>
          <VStack flex={1} px="24px" alignItems="center">
            <VStack px="8" mt="24px" mb="48px" alignItems="center">
              <WithLocalSvg
                asset={images.authLogo}
                width={105}
                height={verticalScale(26)}
                color={Colors.PRIMARY}
              />
              <CustomText
                fontSize={fontSize.xLarge}
                fontFamily={fontFamily.bold}
                textAlign="center"
                marginTop={verticalScale(28)}>
                {t('auth.loginToHudu')}
              </CustomText>
              <CustomText
                lineHeight={18}
                fontSize={fontSize.small}
                textAlign="center"
                marginTop={verticalScale(8)}>
                {t('auth.loginDescription')}
              </CustomText>
            </VStack>
            <VStack width="full" space="24px">
              <FormInput
                px="0"
                backgroundColor={Colors.TRANSPARENT}
                underline
                {...register('email')}
                {...{formState}}
                placeholder={t('auth.emailOrUserName')}
                autoComplete="email"
                disabled={loading}
                StartComponent={Email}
              />
              <FormInput
                px="0"
                backgroundColor={Colors.TRANSPARENT}
                underline
                inputType="password"
                {...register('password')}
                {...{formState}}
                placeholder={t('auth.password')}
                disabled={loading}
                StartComponent={Lock}
              />
              <HStack justifyContent="flex-end">
                <CustomTouchable onPress={forgotOnPress}>
                  <CustomText
                    underline
                    color={Colors.Topaz}
                    fontSize={fontSize.small}
                    textAlign="center">
                    {t('auth.forgotPassword')}
                  </CustomText>
                </CustomTouchable>
              </HStack>
              <CustomButton
                title={t('auth.login')}
                height={verticalScale(48)}
                onPress={handleSubmit(loginOnPress)}
              />
            </VStack>
          </VStack>
          <VStack space="12px" alignItems="center" pb="48px" px="24px">
            <CustomText
              fontSize={fontSize.xNormal}
              fontFamily={fontFamily.medium}>
              {t('auth.dontHaveAnAccount')}
            </CustomText>
            <CustomTouchable onPress={signUpOnPress}>
              <CustomText
                underline
                color={Colors.PRIMARY}
                fontSize={fontSize.xNormal}
                fontFamily={fontFamily.medium}>
                {t('auth.signUp')}
              </CustomText>
            </CustomTouchable>
          </VStack>
        </CustomKeyboardAwareScrollView>
      </FormProvider>
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
  image: {
    width: '90%',
    aspectRatio: 1.2,
    alignSelf: 'center',
  },
});
