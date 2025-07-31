import {HStack} from 'native-base';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TextInputProps,
} from 'react-native';
import {ArrowUp} from '~/assets/icons';
import {AttachmentButton, CustomTouchable} from '~/components';
import {useKeyboardVisible} from '~/hooks/useKeyboardVisible';
import {Colors} from '~/styles';
import {isIos} from '~/utils/helper';
import {fontFamily, fontSize} from '~/utils/style';

type Props = {
  placeholder?: TextInputProps['placeholder'];
  disabled?: boolean;
  onSubmitMessage?: any;
  onSubmitImage?: any;
  maxLength?: number;
};

function ChatInput(props: Props, ref: any) {
  const {t} = useTranslation();

  const {
    placeholder = t('common.typeAnything'),
    disabled = false,
    onSubmitMessage,
    onSubmitImage,
    maxLength,
  } = props;

  const [text, setText] = useState('');

  useImperativeHandle(ref, () => ({
    clear: () => {
      clearInput();
    },
  }));

  const clearInput = () => {
    setText('');
  };

  const onChangeText = (value: any) => {
    if (maxLength) {
      if (value?.length <= maxLength) {
        setText(value);
      }
    } else {
      setText(value);
    }
  };

  const isDisable = text?.length < 1 || !text.trim();

  const isKeyboardVisible = useKeyboardVisible();

  const mb = isIos ? '8px' : isKeyboardVisible ? '48px' : '4';

  const sendMessageHandler = (inputText: any) => {
    if (!inputText.trim()) {
    } else {
      clearInput();
      onSubmitMessage?.(inputText.trim());
      Keyboard.dismiss();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      enabled={isIos}
      keyboardVerticalOffset={60}
      collapsable={isIos}>
      <HStack
        mx="24px"
        px="16px"
        py="12px"
        mb={mb}
        borderWidth="0.5px"
        borderColor={Colors.Ghost}
        rounded="sm"
        space="3"
        alignItems="center">
        <TextInput
          multiline
          style={styles.input}
          spellCheck
          editable={!disabled || !isDisable}
          value={text}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType="default"
          placeholderTextColor={Colors.PLACEHOLDER}
        />
        {isDisable || disabled ? (
          <AttachmentButton {...{onSubmitImage, disabled}} />
        ) : (
          <CustomTouchable
            disabled={isDisable || disabled ? true : false}
            onPress={() => sendMessageHandler(text)}>
            <ArrowUp fillColor={Colors.PRIMARY} strokeColor={Colors.WHITE_F} />
          </CustomTouchable>
        )}
      </HStack>
    </KeyboardAvoidingView>
  );
}

export default forwardRef(ChatInput);

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 0,
    fontSize: fontSize.xNormal,
    fontFamily: fontFamily.regular,
    height: '100%',
    flex: 1,
  },
});
