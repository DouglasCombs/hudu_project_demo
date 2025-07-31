import {HStack, VStack, View} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Keyboard} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {useReportQuestion} from '~/hooks/project';
import {useKeyboardVisible} from '~/hooks/useKeyboardVisible';
import {Colors} from '~/styles';
import CustomButton from '../../atoms/CustomButton';
import CustomText from '../../atoms/CustomText';

const ReportModal = ({
  isVisible = false,
  questionId,
  onClose,
  text = '',
}: {
  isVisible: boolean;
  questionId: number;
  onClose: any;
  text: string;
}) => {
  const {t} = useTranslation();
  const {mutate, isLoading} = useReportQuestion();

  const isKeyboardVisible = useKeyboardVisible();

  const submit = () => {
    const input = {
      reason: 'qa_report',
      questionId,
      text: text,
    };

    setTimeout(() => {
      onClose();
    }, 700);
    mutate(input, {
      onSuccess: () => {},
    });
  };

  return (
    <ReactNativeModal
      avoidKeyboard
      isVisible={isVisible}
      onBackdropPress={isKeyboardVisible ? () => Keyboard.dismiss() : onClose}>
      <VStack space="4" bg={Colors.WHITE} px="4" py={'4'} borderRadius={'lg'}>
        <View
          bg={Colors.Ghost}
          alignSelf={'center'}
          w="12"
          h="1"
          borderRadius={'full'}
          mb="2"
        />
        <CustomText>{t('projects.report')}</CustomText>
        <CustomText color={Colors.Topaz}>
          {t('projects.reportQuestion')}
        </CustomText>
        <VStack mt="8">
          <HStack
            mt="10"
            justifyContent={'space-between'}
            alignItems={'center'}>
            <CustomButton
              textColor={Colors.Topaz}
              color={Colors.Solitude}
              width="45%"
              title="Cancel"
              disabled={false}
              onPress={onClose}
            />
            <CustomButton
              onPress={submit}
              loading={isLoading}
              color={Colors.TIME_LEFT_RED_BACKGROUND}
              width="45%"
              title="Report"
            />
          </HStack>
        </VStack>
      </VStack>
    </ReactNativeModal>
  );
};

export default ReportModal;
