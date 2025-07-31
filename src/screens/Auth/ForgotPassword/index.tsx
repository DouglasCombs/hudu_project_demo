import React from 'react';
import * as yup from 'yup';
import {StyleSheet, Keyboard} from 'react-native';
import {VStack} from 'native-base';
import {fontFamily, fontSize, verticalScale} from '~/utils/style';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormProvider, useForm} from 'react-hook-form';
import {
  CustomButton,
  CustomContainer,
  CustomKeyboardAwareScrollView,
  CustomText,
  ScreensHeader,
  FormInput,
} from '~/components';
import {useForgotPasswordAuth} from '~/hooks/auth';
import {useSchemas} from '~/schemas';
import {useTranslation} from 'react-i18next';
import {Colors} from '~/styles';
import {WithLocalSvg} from 'react-native-svg';
import images from '~/assets/images';
import {Email} from '~/assets/icons';

const defaultValues = {
  email: '',
};

export default function ForgotPasswordScreen() {
  const {forgotPasswordSchema} = useSchemas();
  const {t} = useTranslation();

  const {...methods} = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    mode: 'onChange',
    defaultValues,
  });

  const {handleSubmit, register, formState} = methods;

  const {forgotPassword, loading: forgotLoading} = useForgotPasswordAuth();

  const onSend = (formData: typeof defaultValues) => {
    Keyboard.dismiss();
    forgotPassword(formData?.email);
  };

  return (
    <CustomContainer
      statusBarBackgroundColor={Colors.WHITE_F}
      barStyle="dark-content"
      isLoading={forgotLoading}>
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
                {t('auth.forgotPassword')}
              </CustomText>
              <CustomText
                lineHeight={18}
                fontSize={fontSize.small}
                textAlign="center"
                marginTop={verticalScale(8)}>
                {t('auth.forgottenPasswordDescription')}
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
                disabled={forgotLoading}
                StartComponent={Email}
              />
              <CustomButton
                title={t('auth.sendLink')}
                height={verticalScale(48)}
                onPress={handleSubmit(onSend)}
              />
            </VStack>
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
