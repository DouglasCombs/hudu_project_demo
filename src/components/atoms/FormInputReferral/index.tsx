import debounce from 'lodash.debounce';
import {FormControl, HStack, VStack} from 'native-base';
import React, {useRef, useState} from 'react';
import {useController} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Animated, Easing, TouchableOpacity} from 'react-native';
import MaskInput from 'react-native-mask-input';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CustomText} from '~/components';
import {Colors} from '~/styles';
import {fontFamily, fontSize, fontSize as fs, scale} from '~/utils/style';

type propTypes = {
  name: any;
  placeholder?: any;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad'
    | 'visible-password'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'name-phone-pad'
    | 'twitter'
    | 'web-search'
    | undefined;
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
  autoCapitalize?: 'sentences' | 'words' | 'characters' | 'none';
  spellCheck?: boolean;
  autoCorrect?: boolean;
  multiline?: boolean;
  autoComplete?:
    | 'additional-name'
    | 'address-line1'
    | 'address-line2'
    | 'birthdate-day'
    | 'birthdate-full'
    | 'birthdate-month'
    | 'birthdate-year'
    | 'cc-csc'
    | 'cc-exp'
    | 'cc-exp-day'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-number'
    | 'country'
    | 'current-password'
    | 'email'
    | 'family-name'
    | 'gender'
    | 'given-name'
    | 'honorific-prefix'
    | 'honorific-suffix'
    | 'name'
    | 'name-family'
    | 'name-given'
    | 'name-middle'
    | 'name-middle-initial'
    | 'name-prefix'
    | 'name-suffix'
    | 'new-password'
    | 'nickname'
    | 'one-time-code'
    | 'organization'
    | 'organization-title'
    | 'password'
    | 'password-new'
    | 'postal-address'
    | 'postal-address-country'
    | 'postal-address-extended'
    | 'postal-address-extended-postal-code'
    | 'postal-address-locality'
    | 'postal-address-region'
    | 'postal-code'
    | 'street-address'
    | 'sms-otp'
    | 'tel'
    | 'tel-country-code'
    | 'tel-national'
    | 'tel-device'
    | 'url'
    | 'username'
    | 'username-new'
    | 'off'
    | undefined;
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
};

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
            <CustomText
              fontSize={fontSize.small}
              fontFamily={fontFamily.medium}>
              {label}
            </CustomText>
          )}
          <Animated.View style={underline ? viewStyles : undefined}>
            <HStack space="8px" flex={flex} alignItems="center">
              {leftText && (
                <CustomText fontSize={fontSize.xNormal}>{leftText}</CustomText>
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
              <MaskInput
                value={field.value}
                ref={ref}
                onChangeText={(masked, unmasked) => {
                  onChangeHandler(unmasked);
                }}
                mask={[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                style={{
                  width: '100%',
                  height: '100%',
                  paddingVertical: scale(6),
                  fontSize: fontSize.xNormal,
                  fontFamily: fontFamily.regular,
                }}
                fontSize={fontSize.xNormal}
                keyboardType={keyboardType}
                fontFamily={fontFamily.regular}
                placeholder={placeholder}
                h="100%"
                _input={{
                  selectionColor: Colors.BLACK_TRANSPARENT_2,
                  cursorColor: Colors.BLACK,
                  colorScheme: Colors.BLACK_TRANSPARENT_2,
                }}
                onBlur={onBlur}
                onFocus={onFocus}
                placeholderTextColor={
                  disabled ? Colors.DISABLE : Colors.PLACEHOLDER
                }
              />

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
                fontSize={fontSize.xTiny}
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
        fontFamily={fontFamily.regular}
        mt="0">
        {fieldState.error?.message ?? errorText}
      </FormControl.ErrorMessage>
    </FormControl>
  );
});
