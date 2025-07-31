import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, Linking, Keyboard} from 'react-native';
import {VStack} from 'native-base';
import {
  ModalContainer,
  CustomButton,
  CustomInput,
  ModalHeader,
  CustomText,
} from '~/components';
import {fontFamily, fontSize} from '~/utils/style';
import {Colors} from '~/styles';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const defaultValues = {
  amount: null,
  description: '',
};

const patternTwoDigitsAfterComma = /^\d+(\.\d{0,2})?$/;

const schema = yup.object().shape({
  amount: yup
    .number()
    .positive()
    .test(
      'is-decimal',
      'The amount should be a decimal with maximum two digits after comma',
      (val: any) => {
        if (val !== undefined) {
          return patternTwoDigitsAfterComma.test(val);
        }
        return true;
      },
    )
    .min(1, 'Minimum 1')
    .typeError('you must specify a number')
    .required('required')
    .nullable(),
  description: yup.string().required('required').nullable().trim(),
});

const EditModal = ({
  visible,
  onClose,
  onSubmit,
  title,
  loading,
  defaultData,
  buttonTitle = 'Submit bid',
}: {
  visible: boolean;
  onClose: any;
  onSubmit: any;
  title: string;
  loading?: boolean;
  defaultData?: any;
  buttonTitle?: string;
}) => {
  const {...methods} = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues,
  });

  const {handleSubmit, register, formState, setValue, reset} = methods;

  useEffect(() => {
    defaultData?.amount && setValue('amount', String(defaultData?.amount));
    defaultData?.description &&
      setValue('description', defaultData?.description);
  }, [defaultData]);

  const onCloseHandler = () => {
    onClose?.();
  };

  const onSubmitHandler = (formData: typeof defaultValues) => {
    Keyboard.dismiss();
    onSubmit?.(formData, reset);
  };

  const goToLink = () => {
    Linking.openURL('https://heyhudu.com/feestructure/');
  };

  return (
    <ModalContainer
      isVisible={visible}
      onClose={onCloseHandler}
      loading={loading}>
      <FormProvider {...methods}>
        <VStack bg={Colors.WHITE} px="4" py="4" space="1" borderRadius="md">
          <ModalHeader text={title} onPress={onCloseHandler} />
          <CustomText fontSize={fontSize.tiny}>
            Reminder: HUDU collects a 15% Fee at project payout.
            <TouchableOpacity onPress={goToLink} activeOpacity={0.7}>
              <CustomText fontSize={fontSize.tiny} color={Colors.INFO}>
                {' Learn More'}
              </CustomText>
            </TouchableOpacity>
          </CustomText>
          <CustomInput
            autoFocus
            {...register('amount')}
            label="Bid amount"
            placeholder="0"
            backgroundColor={Colors.WHITE}
            keyboardType="numeric"
            rightText="$"
            {...{formState}}
          />
          <CustomInput
            {...register('description')}
            label="Describe your proposal"
            placeholder="Please type your text here ..."
            backgroundColor={Colors.WHITE}
            textArea
            inputStyle={styles.input}
            {...{formState}}
          />
          <CustomButton
            mt="3"
            title={buttonTitle}
            onPress={handleSubmit(onSubmitHandler)}
          />
        </VStack>
      </FormProvider>
    </ModalContainer>
  );
};

export default React.memo(EditModal);

const styles = StyleSheet.create({
  input: {
    fontSize: fontSize.tiny,
    fontFamily: fontFamily.regular,
    flex: 1,
    height: '100%',
  },
});
