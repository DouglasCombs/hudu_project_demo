import {yupResolver} from '@hookform/resolvers/yup';
import {VStack} from 'native-base';
import React, {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Keyboard, StyleSheet} from 'react-native';
import {WithLocalSvg} from 'react-native-svg';
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
import {useSignUp, useSignUpAuth} from '~/hooks/auth';
import {replace} from '~/navigation/Methods';
import {useSchemas} from '~/schemas';
import {Colors} from '~/styles';
import {fontFamily, fontSize, verticalScale} from '~/utils/style';

const defaultValues = {
  email: '',
  password: '',
  confirm: '',
};

export default function SignUpScreen() {
  const {SignUpSchema} = useSchemas();
  const {t} = useTranslation();

  const {...methods} = useForm({
    resolver: yupResolver(SignUpSchema),
    mode: 'onChange',
    defaultValues,
  });

  const {signUpWithEmailAndPass} = useSignUpAuth();
  const {mutate: signUpMutate} = useSignUp();

  const [loading, setLoading] = useState<boolean>(false);

  const {handleSubmit, register, formState} = methods;

  const signInOnPress = () => {
    replace('Login');
  };

  const signUpOnPress = async (formData: typeof defaultValues) => {
    Keyboard.dismiss();
    setLoading(true);
    const signUpRes = await signUpWithEmailAndPass(
      formData?.email,
      formData.password,
    );
    if (signUpRes?.data) {
      completeSignUp();
    } else {
      setLoading(false);
    }
  };

  const completeSignUp = async () => {
    signUpMutate(
      {},
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
                {t('auth.joinHuduToday')}
              </CustomText>
              <CustomText
                lineHeight={18}
                fontSize={fontSize.small}
                textAlign="center"
                marginTop={verticalScale(8)}>
                {t('auth.signUpDescription')}
              </CustomText>
            </VStack>
            <VStack width="full" space="24px">
              <FormInput
                px="0"
                backgroundColor={Colors.TRANSPARENT}
                underline
                {...register('email')}
                {...{formState}}
                placeholder={t('auth.email')}
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
              <FormInput
                px="0"
                backgroundColor={Colors.TRANSPARENT}
                underline
                inputType="password"
                {...register('confirm')}
                {...{formState}}
                placeholder={t('auth.confirmPassword')}
                disabled={loading}
                StartComponent={Lock}
              />
              <CustomButton
                title={t('auth.signUp')}
                height={verticalScale(48)}
                onPress={handleSubmit(signUpOnPress)}
              />
            </VStack>
          </VStack>
          <VStack space="12px" alignItems="center" pb="48px" px="24px">
            <CustomText
              fontSize={fontSize.xNormal}
              fontFamily={fontFamily.medium}>
              {t('auth.dontHaveAnAccount')}
            </CustomText>
            <CustomTouchable onPress={signInOnPress}>
              <CustomText
                underline
                color={Colors.PRIMARY}
                fontSize={fontSize.xNormal}
                fontFamily={fontFamily.medium}>
                {t('auth.login')}
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
