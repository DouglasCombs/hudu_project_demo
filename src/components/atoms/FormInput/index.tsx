import debounce from 'lodash.debounce';
import {FormControl, HStack, VStack} from 'native-base';
import React, {useRef, useState} from 'react';
import {useController} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {
  Animated,
  Easing,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CustomText} from '~/components';
import {Colors} from '~/styles';
import {fontFamily, fontSize as fs} from '~/utils/style';

type propTypes = {
  name: any;
  placeholder?: any;
  keyboardType?: TextInputProps['keyboardType'];
  backgroundColor?: string;
  outlineBackgroundColor?: string;
  textArea?: boolean;
  borderColor?: string;
  outlineBorderColor?: string;
  disabled?: boolean;
  isReadOnly?: boolean;
  rightComponent?: JSX.Element;
  autoFocus?: boolean;
  inputType?: string | undefined;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  spellCheck?: boolean;
  autoCorrect?: boolean;
  multiline?: boolean;
  autoComplete?: TextInputProps['autoComplete'];
  outline?: boolean;
  label?: any;
  py?: string | number;
  mt?: string | number;
  minH?: string | number;
  outlinePy?: string | number;
  onChangeText?: any;
  useDebounce?: boolean;
  errorText?: string;
  checkErrorInOnchange?: boolean;
  onPress?: () => void;
  flex?: number;
  counter?: number;
  px?: string | number;
  leftText?: string;
  StartComponent?: any;
  underline?: boolean;
  startComponentColor?: string;
  textAlign?: TextInputProps['textAlign'];
  errorAlignment?: ViewStyle['alignItems'];
  fontSize?: number;
  style?: TextInputProps['style'];
} & TextInputProps;

export default React.forwardRef((props: propTypes, ref: any) => {
  const {t} = useTranslation();

  const {
    name,
    placeholder = t('common.tapToWrite'),
    keyboardType,
    backgroundColor = Colors.SEARCH_BACKGROUND,
    outlineBackgroundColor = Colors.WHITE_F,
    borderColor = Colors.DEEP_FIR,
    outlineBorderColor,
    textArea = false,
    disabled,
    isReadOnly,
    rightComponent,
    autoFocus,
    inputType,
    autoCapitalize = 'sentences',
    spellCheck = true,
    autoCorrect = true,
    multiline = false,
    autoComplete,
    outline,
    label,
    py = '2',
    mt,
    minH = '48px',
    outlinePy,
    onChangeText,
    useDebounce,
    errorText,
    checkErrorInOnchange,
    onPress,
    flex,
    counter,
    px = '4',
    leftText,
    StartComponent,
    underline,
    startComponentColor,
    textAlign,
    errorAlignment,
    fontSize = fs.xNormal,
    style = styles.input,
    ...rest
  } = props;

  const {field, fieldState} = useController({name});
  const [secureText, setSecureText] = useState<boolean>(true);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const animatedValue = useRef(new Animated.Value(0));

  const isPasswordType = inputType === 'password';

  const handleSecurePassword = () => {
    setSecureText(prevState => !prevState);
  };

  const onChangeTextHandler = (text: string) => {
    if (checkErrorInOnchange) {
      if (!fieldState.error) {
        if (useDebounce) {
          const debouncedOnChangeText = debounce(onChangeText, 300); // 300ms debounce delay
          debouncedOnChangeText(text);
        } else {
          onChangeText?.(text);
        }
      }
    } else {
      if (useDebounce) {
        const debouncedOnChangeText = debounce(onChangeText, 300); // 300ms debounce delay
        debouncedOnChangeText(text);
      } else {
        onChangeText?.(text);
      }
    }
  };

  const onChangeHandler = (text: string) => {
    if (textArea || multiline) {
      field.onChange(text);
      if (onChangeText) {
        onChangeTextHandler(text);
      }
    } else {
      const temp = text.replace(/[\r\n]+/gm, '');
      field.onChange(temp);
      if (onChangeText) {
        onChangeTextHandler(text);
      }
    }
  };

  const onPressHandler = () => {
    onPress?.();
  };

  const viewStyles = {
    borderBottomColor: animatedValue?.current?.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.DEEP_FIR, Colors.PRIMARY],
    }),
    borderBottomWidth: 1,
  };

  const onFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedValue?.current, {
      toValue: 1,
      duration: 500,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      useNativeDriver: false,
    }).start();
  };

  const onBlur = (val: any) => {
    field.onBlur(val);
    if (!field.value) {
      setIsFocused(false);
      Animated.timing(animatedValue?.current, {
        toValue: 0,
        duration: 500,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <FormControl isInvalid={!!fieldState.error} w={{base: '100%'}}>
      <TouchableOpacity
        disabled={!onPress}
        activeOpacity={0.7}
        onPress={onPressHandler}>
        <VStack
          space="1"
          bg={outline ? outlineBackgroundColor : backgroundColor}
          borderRadius="sm"
          px={px}
          mt={mt}
          py={outline ? outlinePy : py}
          minH={minH}
          borderColor={outline ? outlineBorderColor : borderColor}
          borderWidth={outline ? '1px' : outlineBorderColor ? '1px' : '0'}>
          {label && (
            <CustomText fontSize={fs.small} fontFamily={fontFamily.medium}>
              {label}
            </CustomText>
          )}
          <Animated.View style={underline ? viewStyles : undefined}>
            <HStack minH={minH} space="8px" flex={flex} alignItems="center">
              {leftText && (
                <CustomText fontSize={fs.xNormal}>{leftText}</CustomText>
              )}
              {StartComponent && (
                <StartComponent
                  fillColor={
                    underline
                      ? isFocused
                        ? Colors.PRIMARY
                        : Colors.DEEP_FIR
                      : startComponentColor
                  }
                />
              )}
              <TextInput
                {...rest}
                style={[
                  {
                    fontSize: fontSize,
                    textAlign,
                    fontFamily: fontFamily.regular,
                  },
                  style,
                ]}
                multiline={multiline}
                onPressOut={onPressHandler}
                textAlign={textAlign}
                autoComplete={autoComplete}
                spellCheck={spellCheck}
                autoCorrect={autoCorrect}
                autoFocus={autoFocus}
                ref={ref}
                value={field.value}
                onBlur={onBlur}
                onFocus={onFocus}
                editable={!isReadOnly ?? !disabled}
                autoCapitalize={autoCapitalize}
                placeholder={placeholder}
                keyboardType={keyboardType}
                onChangeText={onChangeHandler}
                numberOfLines={textArea ? 4 : 1}
                textAlignVertical={textArea ? 'top' : 'center'}
                secureTextEntry={isPasswordType ? secureText : false}
                placeholderTextColor={
                  disabled ? Colors.DISABLE : Colors.PLACEHOLDER
                }
              />
              {rightComponent}
              {isPasswordType && (
                <TouchableOpacity
                  onPress={handleSecurePassword}
                  activeOpacity={0.7}>
                  <Ionicons
                    name={secureText ? 'eye-off-outline' : 'eye-outline'}
                    color={Colors.Topaz}
                    size={18}
                  />
                </TouchableOpacity>
              )}
            </HStack>
          </Animated.View>
          {counter && (
            <HStack position="absolute" bottom="8px" right="12px">
              <CustomText
                fontSize={fs.xTiny}
                color={
                  field?.value?.length > counter ||
                  (!!fieldState.error && field?.value?.length > counter)
                    ? Colors.FrenchRose
                    : Colors.Topaz
                }>
                {`${field?.value?.length ?? 0}/${counter}`}
              </CustomText>
            </HStack>
          )}
        </VStack>
      </TouchableOpacity>
      <FormControl.ErrorMessage
        color={Colors.FrenchRose}
        fontSize={fs.small}
        alignItems={errorAlignment}
        fontFamily={fontFamily.regular}
        mt="0">
        {fieldState.error?.message ?? errorText}
      </FormControl.ErrorMessage>
    </FormControl>
  );
});

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 0,
    height: '100%',
    flex: 1,
  },
});
