import React, {useState} from 'react';
import {Keyboard} from 'react-native';
import {VStack, Center} from 'native-base';
import {
  ModalContainer,
  CustomButton,
  RatingStar,
  CustomInput,
  ModalHeader,
} from '~/components';
import {verticalScale} from '~/utils/style';
import {Colors} from '~/styles';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const defaultValues = {
  review: '',
};

const schema = yup.object().shape({
  review: yup.string().nullable().trim(),
});

const ReviewModal = ({
  visible,
  onClose,
  onSubmit,
  title,
  loading,
  closeOnTouchOutSide = false,
}: {
  visible: boolean;
  onClose: any;
  onSubmit: any;
  title: string;
  loading?: boolean;
  closeOnTouchOutSide?: boolean;
}) => {
  const [rate, setRate] = useState(5);

  const {...methods} = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues,
  });

  const {handleSubmit, register, formState, reset} = methods;

  const onCloseHandler = () => {
    onClose?.();
  };

  const resetForm = () => {
    reset();
    setRate(5);
  };

  const onSubmitHandler = (formData: typeof defaultValues) => {
    Keyboard.dismiss();
    const input = {
      ...(formData?.review && {review: formData?.review}),
      rate,
    };
    onSubmit?.(input, resetForm);
  };

  return (
    <ModalContainer
      isVisible={visible}
      onClose={onCloseHandler}
      loading={loading}
      closeOnTouchOutSide={closeOnTouchOutSide}>
      <FormProvider {...methods}>
        <VStack bg={Colors.WHITE} px="4" py="4" space="1" borderRadius="md">
          <ModalHeader text={title} onPress={onCloseHandler} />
          <Center mt="2">
            <RatingStar
              spacing={3}
              size={28}
              rate={rate}
              onChange={setRate}
              half={false}
            />
          </Center>
          <CustomInput
            {...register('review')}
            label="Your feedback"
            placeholder="Please type your text here ..."
            backgroundColor={Colors.WHITE}
            textArea
            {...{formState}}
          />
          <CustomButton
            mt="3"
            title="Done"
            onPress={handleSubmit(onSubmitHandler)}
            height={verticalScale(40)}
          />
        </VStack>
      </FormProvider>
    </ModalContainer>
  );
};

export default ReviewModal;
