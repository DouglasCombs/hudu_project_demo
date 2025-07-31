import React, {useEffect, useRef} from 'react';
import {
  Keyboard,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {isIos} from '~/utils/helper';

export default function CustomKeyboardAwareScrollViewV2({
  children,
  contentContainerStyle = styles.contentContainerStyle,
  ...props
}: {children?: any} & ScrollViewProps) {
  const keyboardShow = isIos ? 'keyboardWillShow' : 'keyboardDidShow';

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(keyboardShow, () => {
      const inputRef = TextInput.State.currentlyFocusedInput();
      const inputPositionY = inputRef.measureLayout(
        scrollViewRef?.current,
        (x: any, y: any) => {
          scrollViewRef?.current?.scrollTo({y});
        },
      );
    });

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={contentContainerStyle}
      ref={scrollViewRef}
      {...props}
      keyboardShouldPersistTaps="handled">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
});
