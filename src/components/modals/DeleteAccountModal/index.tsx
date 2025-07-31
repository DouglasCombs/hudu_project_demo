import {Center, HStack, VStack} from 'native-base';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Keyboard, StyleSheet, TextInput} from 'react-native';
import {CustomButton, CustomText, ModalContainer} from '~/components';
import {Colors} from '~/styles';
import {autoCorrect, keyboardType, spellCheck} from '~/utils/helper';
import {fontFamily, fontSize, verticalScale} from '~/utils/style';

type Props = {
  option1?: string;
  option1OnPress?: any;
  option2?: string;
  option2OnPress?: any;
  title: string;
  description?: string;
  loading?: boolean;
};

function DeleteAccountModal(
  {
    option1 = '',
    option1OnPress,
    option2 = '',
    option2OnPress,
    title,
    description,
    loading,
  }: Props,
  ref: any,
) {
  const {t} = useTranslation();

  const [text, setText] = useState<string>('');
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  useImperativeHandle(ref, () => ({
    open: () => {
      openModal();
    },
    close: () => {
      closeModal();
    },
  }));

  const openModal = () => {
    Keyboard.dismiss();
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setText('');
  };

  const onChangeText = (value: string) => {
    setText(value);
    if (value === t('common.delete2')) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  };

  const option1Handler = () => {
    setText('');
    option1OnPress?.();
  };

  const option2Handler = () => {
    setText('');
    option2OnPress?.();
  };

  return (
    <ModalContainer
      useBody
      mb="102px"
      isVisible={visible}
      onClose={closeModal}
      loading={loading}>
      <VStack
        bg={Colors.WHITE}
        px="4"
        pt="8"
        pb="4"
        space="8"
        borderRadius="md">
        <VStack space="2">
          <CustomText fontSize={fontSize.medium} fontFamily={fontFamily.medium}>
            {title}
          </CustomText>
          {description && (
            <CustomText fontSize={fontSize.small} color={Colors.BLACK_2}>
              {description}
            </CustomText>
          )}
        </VStack>
        <VStack space="2">
          <CustomText>
            {t('common.pleaseTypeTheWord')}
            <CustomText color={Colors.FrenchRose}>
              {t('common.delete2')}
            </CustomText>
            {t('common.here')}
          </CustomText>
          <HStack
            w="100%"
            h={`${verticalScale(48)}px`}
            px="4"
            borderRadius="sm"
            borderWidth="1px"
            borderColor={Colors.DEEP_FIR}>
            <TextInput
              style={styles.input}
              spellCheck={spellCheck}
              autoCorrect={autoCorrect}
              value={text}
              autoCapitalize="none"
              placeholder={t('common.typeDelete')}
              keyboardType={keyboardType}
              onChangeText={onChangeText}
              borderWidth="0"
              numberOfLines={1}
              placeholderTextColor={Colors.PLACEHOLDER}
            />
          </HStack>
        </VStack>
        <HStack space="4" h="35px">
          <Center flex={1}>
            <CustomButton
              title={option1}
              color={Colors.Solitude}
              textColor={Colors.Topaz}
              onPress={option1Handler}
              fontSize={fontSize.tiny}
              height={verticalScale(35)}
            />
          </Center>
          <Center flex={1}>
            <CustomButton
              title={option2}
              color={Colors.FrenchRose}
              onPress={option2Handler}
              fontSize={fontSize.tiny}
              height={verticalScale(35)}
              disabled={disableButton}
              disableColor={Colors.Solitude}
              textColor={disableButton ? Colors.Topaz : Colors.WHITE_F}
            />
          </Center>
        </HStack>
      </VStack>
    </ModalContainer>
  );
}

export default forwardRef(DeleteAccountModal);

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 0,
    fontSize: fontSize.xNormal,
    fontFamily: fontFamily.regular,
    flex: 1,
    height: '100%',
  },
});
