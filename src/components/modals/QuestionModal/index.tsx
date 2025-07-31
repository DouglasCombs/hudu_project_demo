import {Center, HStack, VStack} from 'native-base';
import React from 'react';
import {CustomButton, CustomText, ModalContainer} from '~/components';
import {Colors} from '~/styles';
import {fontFamily, fontSize, verticalScale} from '~/utils/style';

const QuestionModal = ({
  visible,
  onClose,
  option1 = '',
  option1OnPress,
  option2 = '',
  option2OnPress,
  optionsColor,
  optionsBackgroundColor,
  title,
  loading,
  closeOnTouchOutSide = true,
  customText,
  backgroundColor = Colors.WHITE,
  backdropColor,
  px = '4',
  pt = '8',
  pb = '4',
  borderRadius = 'md',
}: {
  visible: boolean;
  onClose: any;
  option1?: string;
  option1OnPress?: any;
  option2?: string;
  option2OnPress?: any;
  optionsColor?: any;
  optionsBackgroundColor?: any;
  title?: string;
  loading?: boolean;
  closeOnTouchOutSide?: boolean;
  customText?: any;
  backgroundColor?: any;
  backdropColor?: any;
  px?: string | number;
  pt?: string | number;
  pb?: string | number;
  borderRadius?: string | number;
}) => {
  const onCloseHandler = () => {
    onClose?.();
  };

  const option1Handler = () => {
    option1OnPress?.();
  };

  const option2Handler = () => {
    option2OnPress?.();
  };

  return (
    <ModalContainer
      backdropColor={backdropColor}
      isVisible={visible}
      onClose={onCloseHandler}
      loading={loading}
      closeOnTouchOutSide={closeOnTouchOutSide}>
      <VStack
        bg={backgroundColor}
        px={px}
        pt={pt}
        pb={pb}
        space="8"
        borderRadius={borderRadius}>
        {title && (
          <CustomText
            textAlign="center"
            fontSize={fontSize.medium}
            fontFamily={fontFamily.medium}>
            {title}
          </CustomText>
        )}
        {customText && customText}
        <HStack space="4" h="35px">
          <Center flex={1}>
            <CustomButton
              title={option1}
              onPress={option1Handler}
              fontSize={fontSize.tiny}
              height={verticalScale(35)}
              textColor={optionsColor}
              color={optionsBackgroundColor}
            />
          </Center>
          <Center flex={1}>
            <CustomButton
              title={option2}
              onPress={option2Handler}
              fontSize={fontSize.tiny}
              height={verticalScale(35)}
              textColor={optionsColor}
              color={optionsBackgroundColor}
            />
          </Center>
        </HStack>
      </VStack>
    </ModalContainer>
  );
};

export default QuestionModal;
