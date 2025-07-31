import {yupResolver} from '@hookform/resolvers/yup';
import {HStack, VStack, Center} from 'native-base';
import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import * as yup from 'yup';
import images from '~/assets/images';
import {
  CustomButton,
  CustomDivider,
  CustomImage,
  CustomText,
  ModalContainer,
  SectionCity,
  SectionState,
} from '~/components';
import {ResponseStatus} from '~/generated/graphql';
import {
  useGetEnthusiasticCityAndState,
  useSendCityAndState,
} from '~/hooks/project';
import {useGetUserAddresses} from '~/hooks/user';
import {useSchemas} from '~/schemas';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {isAllowState} from '~/utils/helper';
import {fontFamily, fontSize, scale, verticalScale} from '~/utils/style';

const defaultValues = {
  city: '',
  state: null,
};

export default function SectionOutOfRange() {
  const {t} = useTranslation();
  const {selectStateSchema} = useSchemas();

  const {userData, outOfRangeViewed, setOutOfRangeViewed} = userDataStore(
    state => state,
  );

  const {...methods} = useForm({
    resolver: yupResolver(selectStateSchema),
    mode: 'onChange',
    defaultValues,
  });

  const {handleSubmit, register, watch, reset} = methods;

  const {data: userAddresses, isLoading: isLoadingGetAddresses} =
    useGetUserAddresses({
      userId: userData?.id,
    });

  const {data: getCityAndState, isLoading: isLoadingCityAndState} =
    useGetEnthusiasticCityAndState({
      where: {
        userId: userData?.id,
      },
    });

  const hasData = getCityAndState?.pages?.length > 0;

  const addresses = userAddresses?.pages || [];

  const {mutate: mutateAddCityAndState, isLoading: isLoadingAddCityAndState} =
    useSendCityAndState();

  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoadingGetAddresses && !isLoadingCityAndState) {
      checkOutOfRange();
    }
  }, [isLoadingGetAddresses, isLoadingCityAndState]);

  const checkOutOfRange = () => {
    if (
      addresses?.length === 1 &&
      addresses?.[0]?.state &&
      outOfRangeViewed &&
      !!hasData
    ) {
      if (!isAllowState(addresses?.[0]?.state)) {
        setTimeout(() => {
          setVisible(true);
        }, 5000);
      }
    }
  };

  const onClose = () => {
    setVisible(false);
    reset();
    setOutOfRangeViewed(true);
  };

  const onSubmit = (formData: typeof defaultValues) => {
    const input = {
      city: formData?.city,
      state: formData?.state?.value,
    };
    mutateAddCityAndState(input as any, {
      onSuccess: (successData: any) => {
        if (
          successData?.project_addEnthusiasticCistyState?.status ===
          ResponseStatus.Success
        ) {
          setOutOfRangeViewed(true);
          setVisible(false);
        }
      },
    });
  };

  if (visible) {
    return (
      <ModalContainer
        loading={isLoadingAddCityAndState}
        onClose={onClose}
        useBody={false}
        style={styles.modal}
        justify="flex-end"
        backdropColor={Colors.BLACK_TRANSPARENT_2}
        isVisible={visible}>
        <FormProvider {...methods}>
          <VStack bg={Colors.WHITE_F} rounded="sm" pt="44px" pb="16px" w="100%">
            <Center mb="42px">
              <CustomImage
                local
                imageSource={images.location}
                style={styles.image}
              />
            </Center>
            <VStack space="40px" px="24px">
              <VStack space="2">
                <CustomText
                  fontSize={fontSize.xMedium}
                  fontFamily={fontFamily.medium}>
                  {`${t('search.service')} `}
                  <CustomText
                    fontSize={fontSize.xMedium}
                    fontFamily={fontFamily.medium}
                    color={Colors.FrenchRose}>
                    {`${t('search.unavailable')} `}
                  </CustomText>
                  {t('search.inYourState')}
                </CustomText>
                <CustomText
                  fontSize={fontSize.small}
                  fontFamily={fontFamily.medium}
                  color={Colors.Topaz}>
                  {`${t('search.selectYourCityAndState')} `}
                </CustomText>
              </VStack>
              <VStack space="16px">
                <SectionState {...register('state')} />
                <SectionCity
                  {...register('city')}
                  stateTitle={watch('state')?.title}
                />
              </VStack>
            </VStack>
            <CustomDivider mt="32px" />
            <HStack space="10px" px="24px">
              <CustomButton
                flex={1}
                height={verticalScale(32)}
                color={Colors.Solitude}
                textColor={Colors.Topaz}
                onPress={onClose}
                title={t('common.cancel')}
                fontSize={fontSize.small}
              />
              <CustomButton
                flex={1}
                height={verticalScale(32)}
                color={Colors.PRIMARY}
                onPress={handleSubmit(onSubmit)}
                title={t('common.submit')}
                fontSize={fontSize.small}
              />
            </HStack>
          </VStack>
        </FormProvider>
      </ModalContainer>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: scale(147),
    height: verticalScale(129),
  },
});
