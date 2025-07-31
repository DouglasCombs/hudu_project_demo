import {yupResolver} from '@hookform/resolvers/yup';
import {Center, Flex, HStack, VStack} from 'native-base';
import React, {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import * as yup from 'yup';
import {StarFillSquare, StarSquare} from '~/assets/icons';
import {SmallHuduLogo} from '~/assets/images';
import {
  CustomButton,
  CustomContainer,
  CustomDivider,
  CustomKeyboardAvoidingView,
  CustomKeyboardAwareScrollViewV2,
  CustomText,
  FormInput,
  RateUsModal,
  RatingStar,
} from '~/components';
import {useAddAppRate} from '~/hooks/appRate';
import {goBack} from '~/navigation/Methods';
import {useSchemas} from '~/schemas';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';

const defaultValues = {
  review: '',
};

export default function RateUs() {
  const {t} = useTranslation();
  const {rateUsSchema} = useSchemas();

  const {mutate: mutateAppRate, isLoading: isLoadingMutateAppRate} =
    useAddAppRate();

  const {...methods} = useForm({
    resolver: yupResolver(rateUsSchema),
    mode: 'onChange',
    defaultValues,
  });

  const {handleSubmit, register, formState} = methods;

  const [rate, setRate] = useState<number>(5);
  const [rateModalVisible, setRateModalVisible] = useState<boolean>(false);

  const onChangeRate = (inputRate: number) => {
    setRate(inputRate);
  };

  const cancelOnPress = () => {
    goBack();
  };

  const onCloseRateModal = () => {
    setRateModalVisible(false);
  };

  const onSubmit = (formData: typeof defaultValues) => {
    if (rate <= 2) {
      const input = {
        rate,
        text: formData?.review,
      };
      mutateAppRate(input);
    } else {
      setRateModalVisible(true);
    }
  };

  const loading = isLoadingMutateAppRate;

  return (
    <CustomContainer
      barStyle="dark-content"
      statusBarBackgroundColor={Colors.WHITE_F}>
      <FormProvider {...methods}>
        <CustomKeyboardAvoidingView>
          <VStack flex={1}>
            <CustomKeyboardAwareScrollViewV2>
              <Flex flex={1}>
                <VStack pt="48px" flex={1} alignItems="center">
                  <SmallHuduLogo fillColor={Colors.PRIMARY} />
                  <CustomText
                    color={Colors.Rhino}
                    fontSize={fontSize.tooLarge}
                    fontFamily={fontFamily.medium}
                    marginTop={69}
                    marginBottom={8}>
                    {t('common.rateUs')}
                  </CustomText>
                  <CustomText color={Colors.BLACK} fontSize={fontSize.small}>
                    {t('common.rateUsDescription')}
                    <CustomText
                      color={Colors.PRIMARY}
                      fontSize={fontSize.xNormal}>
                      {` ${t('common.hudu')}`}
                    </CustomText>
                  </CustomText>
                  <CustomDivider my="24px" />
                  <VStack space="24px" alignItems="flex-start" w="100%">
                    <CustomText
                      fontFamily={fontFamily.medium}
                      color={Colors.BLACK}
                      fontSize={fontSize.small}>
                      {t('common.yourRating')}
                    </CustomText>
                    <Center w="100%">
                      <RatingStar
                        half={false}
                        spacing={16}
                        rate={rate}
                        onChange={onChangeRate}
                        customFullStar={<StarFillSquare />}
                        customEmptyStar={<StarSquare />}
                        disabled={loading}
                      />
                    </Center>
                    {rate <= 2 && (
                      <FormInput
                        multiline
                        {...register('review')}
                        {...{formState}}
                        backgroundColor={Colors.SEARCH_BACKGROUND}
                        label={t('common.huduReview')}
                        minH="130px"
                        counter={200}
                      />
                    )}
                  </VStack>
                </VStack>
                <HStack space="10px" pb="24px" pt="8px">
                  <CustomButton
                    flex={1}
                    color={Colors.Solitude}
                    textColor={Colors.Topaz}
                    title={t('common.cancel')}
                    onPress={cancelOnPress}
                  />
                  {rate <= 2 ? (
                    <CustomButton
                      flex={1}
                      color={Colors.PRIMARY}
                      title={t('common.submit')}
                      onPress={handleSubmit(onSubmit)}
                      loading={isLoadingMutateAppRate}
                    />
                  ) : (
                    <CustomButton
                      flex={1}
                      color={Colors.PRIMARY}
                      title={t('common.submit')}
                      onPress={() => onSubmit(null)}
                    />
                  )}
                </HStack>
              </Flex>
            </CustomKeyboardAwareScrollViewV2>
          </VStack>
        </CustomKeyboardAvoidingView>
      </FormProvider>
      {rateModalVisible && (
        <RateUsModal
          defaultRate={rate}
          visible={rateModalVisible}
          onClose={onCloseRateModal}
        />
      )}
    </CustomContainer>
  );
}
