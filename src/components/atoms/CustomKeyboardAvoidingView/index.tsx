import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {isIos} from '~/utils/helper';

export default function CustomKeyboardAvoidingView({
  children,
  iosKeyboardVerticalOffset = 60,
  androidKeyboardVerticalOffset = 25,
}: {
  children: JSX.Element;
  iosKeyboardVerticalOffset?: number;
  androidKeyboardVerticalOffset?: number;
}) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        collapsable
        keyboardVerticalOffset={
          isIos ? iosKeyboardVerticalOffset : androidKeyboardVerticalOffset
        }
        behavior={isIos ? 'padding' : 'height'}
        style={styles.flex1}>
        {children}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
});
