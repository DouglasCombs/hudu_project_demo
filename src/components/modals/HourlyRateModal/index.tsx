import {Box, HStack, VStack} from 'native-base';
import React from 'react';
import {
  CustomButton,
  CustomDivider,
  CustomText,
  FormInput,
  ModalContainer,
} from '~/components';
import {Colors} from '~/styles';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormProvider, useForm} from 'react-hook-form';
import {useSchemas} from '~/schemas';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {fontFamily, fontSize, verticalScale} from '~/utils/style';
import {useAddWorkingHours} from '~/hooks/bid';
import {ResponseStatus} from '~/generated/graphql';

const defaultValues = {
  hours: null,
};

export default function HourlyRateModal({
  visible,
  onClose,
  bidId,
}: {
  visible: boolean;
  onClose: () => void;
  bidId: number;
}) {
  const {t} = useTranslation();

  const {hourlyRateSchemaSchema} = useSchemas();

  const {...methods} = useForm({
    resolver: yupResolver(hourlyRateSchemaSchema),
    mode: 'onChange',
    defaultValues,
  });

  const {handleSubmit, register, formState} = methods;

  const {mutate: mutateAddWorkingHours, isLoading: isLoadingAddWorkingHours} =
    useAddWorkingHours();

  const onSubmit = (formData: typeof defaultValues) => {
    const input = {
      bidId,
      workedHours: formData?.hours,
    };
    mutateAddWorkingHours(input, {
      onSuccess: successData => {
        if (
          successData?.bid_addWorkingHours?.status === ResponseStatus.Success
        ) {
          onClose();
        }
      },
    });
  };

  return (
    <ModalContainer
      closeOnTouchOutSide={false}
      loading={isLoadingAddWorkingHours}
      style={styles.modal}
      isVisible={visible}
      onClose={onClose}>
      <VStack pt="32px" pb="24px">
        <Box px="24px" flex={1}>
          <CustomText
            fontSize={fontSize.medium}
            fontFamily={fontFamily.medium}
            marginBottom={8}>
            {t('projects.hourlyRateTitle')}
          </CustomText>
          <CustomText fontSize={fontSize.small} marginBottom={32}>
            {t('projects.hourlyRateDescription')}
          </CustomText>
          <CustomText
            color={Colors.Topaz}
            fontSize={fontSize.small}
            marginBottom={12}>
            {t('projects.hours')}
          </CustomText>
          <FormProvider {...methods}>
            <FormInput
              outline
              outlineBorderColor={Colors.Ghost}
              backgroundColor={Colors.WHITE_F}
              {...register('hours')}
              {...{formState}}
              keyboardType="numeric"
            />
          </FormProvider>
        </Box>
        <CustomDivider mt="78px" />
        <HStack space="16px" px="16px">
          <CustomButton
            flex={1}
            height={verticalScale(36)}
            color={Colors.Solitude}
            textColor={Colors.Topaz}
            onPress={onClose}
            title={t('common.skip')}
          />
          <CustomButton
            flex={1}
            height={verticalScale(36)}
            onPress={handleSubmit(onSubmit)}
            title={t('common.submit')}
          />
        </HStack>
      </VStack>
    </ModalContainer>
  );
}

const styles = StyleSheet.create({
  modal: {
    paddingHorizontal: 16,
  },
});
