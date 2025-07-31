import React, {useState, forwardRef} from 'react';
import {
  TextInput,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {FormControl, Text, HStack, Box, VStack} from 'native-base';
import {Colors} from '~/styles';
import {useController} from 'react-hook-form';
import {fontFamily, verticalScale, fontSize as fs} from '~/utils/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {isIos} from '~/utils/helper';
import {CollapsibleProvider} from '~/components';

type Props = {
  name: any;
  placeholder?: string;
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
  label?: string;
  color?: string;
  textArea?: boolean;
  inputStyle?: TextStyle;
  icon?: any;
  rightText?: string;
  disabled?: boolean;
  rightComponent?: any;
  formState?: any;
  validation?: boolean;
  height?: number;
  labelFontSize?: number;
  fontSize?: number;
  autoFocus?: boolean;
  inputType?: string | undefined;
  isHorizontal?: boolean;
  autoCapitalize?: 'sentences' | 'words' | 'characters' | 'none';
  spellCheck?: boolean;
  autoCorrect?: boolean;
  multiline?: boolean;
  mt?: number | string;
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
};

export default forwardRef((props: Props, ref: any) => {
  const {
    name,
    placeholder,
    keyboardType,
    backgroundColor = 'transparent',
    label,
    color = Colors.INPUT,
    textArea = false,
    inputStyle = styles.input,
    icon,
    rightText,
    disabled,
    rightComponent,
    formState,
    validation = false,
    height = verticalScale(45),
    labelFontSize = fs.normal,
    fontSize = fs.normal,
    autoFocus,
    inputType,
    isHorizontal,
    autoCapitalize = 'sentences',
    spellCheck = true,
    autoCorrect = true,
    multiline = false,
    mt = '3',
    autoComplete,
  } = props;

  const {field, fieldState} = useController({name});
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [secureText, setSecureText] = useState<boolean>(true);

  const returnKeyType =
    Platform.OS === 'android' &&
    Platform.Version === 33 &&
    Platform.constants.Manufacturer === 'samsung'
      ? 'none'
      : 'default';
  const autoCorrectProp =
    Platform.OS === 'android' &&
    Platform.Version === 33 &&
    Platform.constants.Manufacturer === 'samsung'
      ? undefined
      : autoCorrect;
  const spellCheckProp =
    Platform.OS === 'android' &&
    Platform.Version === 33 &&
    Platform.constants.Manufacturer === 'samsung'
      ? undefined
      : spellCheck;
  const keyboardTypeProp =
    Platform.OS === 'android' &&
    Platform.Version === 33 &&
    Platform.constants.Manufacturer === 'samsung'
      ? 'visible-password'
      : keyboardType;

  const isPasswordType = inputType === 'password';
  const isDirty = formState?.isDirty;
  const borderColor = disabled
    ? Colors.DISABLE
    : fieldState.error
    ? Colors.ERROR
    : !validation
    ? Colors.BORDER
    : isDirty
    ? Colors.SUCCESS
    : Colors.BORDER;
  const paddingTop = isIos ? (isPasswordType ? 0 : 15) : textArea ? 15 : 0;
  const paddingBottom = textArea ? 15 : 0;
  const font_size = isFocused ? fontSize - 2 : fontSize;
  const textAlignVertical = textArea ? 'top' : 'center';
  const fontColor = disabled ? Colors.DISABLE : color;

  const handleSecurePassword = () => {
    setSecureText(prevState => !prevState);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (val: any) => {
    setIsFocused(false);
    field.onBlur?.(val);
  };

  const onChangeHandler = (text: string) => {
    if (textArea || multiline) {
      field.onChange(text);
    } else {
      const temp = text.replace(/[\r\n]+/gm, '');
      field.onChange(temp);
    }
  };

  return (
    <FormControl
      isInvalid={fieldState.error}
      w={{base: '100%'}}
      mb={isHorizontal ? -4 : undefined}>
      <CollapsibleProvider
        visible={
          isFocused || field.value || fieldState.error || disabled || secureText
        }>
        <Box mt={mt}>
          {(isFocused || field.value || fieldState.error || disabled) && (
            <VStack zIndex={60} position="absolute" left="4" top="-12">
              <Box
                position="absolute"
                bottom="25%"
                zIndex={59}
                bg={Colors.WHITE}
                h="2"
                w="100%"
              />
              <Text
                numberOfLines={1}
                ml="2"
                mr="4"
                zIndex={60}
                fontSize={labelFontSize}
                fontFamily={fontFamily.regular}
                color={
                  disabled
                    ? Colors.DISABLE
                    : field.value || fieldState.error
                    ? Colors.PLACEHOLDER
                    : Colors.PLACEHOLDER
                }>
                {label ? label : placeholder}
              </Text>
            </VStack>
          )}
          <HStack
            h={textArea ? `${height * 2.5}px` : `${height}px`}
            px="2"
            borderWidth="1px"
            borderRadius="md"
            alignItems="center"
            bg={backgroundColor}
            justifyContent="center"
            borderColor={borderColor}>
            <TextInput
              autoComplete={autoComplete}
              spellCheck={spellCheckProp}
              autoCorrect={autoCorrectProp}
              autoFocus={autoFocus}
              ref={ref}
              value={field.value}
              onFocus={handleFocus}
              onBlur={handleBlur}
              editable={!disabled}
              autoCapitalize={autoCapitalize}
              placeholder={placeholder}
              keyboardType={keyboardTypeProp}
              onChangeText={onChangeHandler}
              numberOfLines={textArea ? 4 : 1}
              returnKeyType={returnKeyType}
              multiline={isPasswordType ? false : true}
              textAlignVertical={textArea ? 'top' : 'center'}
              secureTextEntry={isPasswordType ? secureText : false}
              placeholderTextColor={
                disabled ? Colors.DISABLE : Colors.PLACEHOLDER
              }
              style={[
                inputStyle,
                {
                  paddingTop,
                  paddingBottom,
                  fontSize: font_size,
                  textAlignVertical,
                  color: fontColor,
                },
                isIos && {minHeight: height},
              ]}
            />
            {inputType === 'password' && (
              <TouchableOpacity
                onPress={handleSecurePassword}
                activeOpacity={0.7}>
                <Ionicons
                  name={secureText ? 'eye-off-outline' : 'eye-outline'}
                  color={Colors.BORDER}
                  size={16}
                />
              </TouchableOpacity>
            )}
            {icon && !isFocused && (
              <Ionicons
                name={icon}
                color={disabled ? Colors.DISABLE : Colors.BLACK_3}
                size={16}
              />
            )}
            {rightText && (
              <Text
                fontSize={fontSize}
                fontFamily={fontFamily.regular}
                color={disabled ? Colors.DISABLE : Colors.RIGHT_TEXT}>
                {rightText}
              </Text>
            )}
            {rightComponent && rightComponent()}
          </HStack>
        </Box>
        <FormControl.ErrorMessage
          fontSize={fs.small}
          fontFamily={fontFamily.regular}
          mt="0">
          {fieldState.error?.message}
        </FormControl.ErrorMessage>
        {isHorizontal && !fieldState.error && (
          <FormControl.HelperText
            fontSize={fs.small}
            fontFamily={fontFamily.regular}
            mt="0">
            {''}
          </FormControl.HelperText>
        )}
      </CollapsibleProvider>
    </FormControl>
  );
});

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontFamily: fontFamily.regular,
    height: '100%',
  },
});
