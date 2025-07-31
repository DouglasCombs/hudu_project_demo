import {AddSquare, MinusSquare} from 'iconsax-react-native';
import {Center, FormControl, HStack, Input, VStack} from 'native-base';
import React from 'react';
import {useController} from 'react-hook-form';
import {CustomText, CustomTouchable} from '~/components';
import {Colors} from '~/styles';
import {fontFamily, fontSize, fontSize as fs} from '~/utils/style';

type propTypes = {
  name: any;
  disabled?: boolean;
  isReadOnly?: boolean;
  autoFocus?: boolean;
  label?: any;
  errorText?: string;
  onPress?: () => void;
};

export default React.forwardRef((props: propTypes, ref: any) => {
  const {name, disabled, isReadOnly, autoFocus, label, errorText, onPress} =
    props;

  const {field, fieldState} = useController({name});

  const onPressHandler = () => {
    onPress?.();
  };

  const plusOnPress = () => {
    const value = parseInt(field.value);
    if (!isNaN(value)) {
      const sum = value + 5;
      field.onChange(sum.toString());
    }
  };

  const minusOnPress = () => {
    const value = parseInt(field.value);
    if (!isNaN(value) && value > 5) {
      const sum = value - 5;
      field.onChange(sum.toString());
    }
  };

  return (
    <FormControl isInvalid={fieldState.error} w={{base: '100%'}}>
      <CustomTouchable disabled={!onPress} onPress={onPressHandler}>
        <VStack h="48px" space="1" borderRadius="sm" px="4">
          <HStack space="16px" justifyContent="center" alignItems="center">
            <CustomTouchable onPress={minusOnPress}>
              <MinusSquare size="40" color={Colors.PRIMARY} />
            </CustomTouchable>
            <Center rounded="sm" bg={Colors.Solitude}>
              <Input
                multiline={false}
                onPressOut={onPressHandler}
                px="0"
                textAlign="center"
                fontSize={fontSize.xNormal}
                fontFamily={fontFamily.regular}
                autoFocus={autoFocus}
                ref={ref}
                value={field.value}
                onBlur={field.onBlur}
                isReadOnly={isReadOnly || disabled}
                keyboardType="numeric"
                onChangeText={field.onChange}
                borderWidth="0"
                bg={Colors.Solitude}
                h="100%"
                w="151px"
                rounded="sm"
                placeholderTextColor={
                  disabled ? Colors.DISABLE : Colors.PLACEHOLDER
                }
                variant="unstyled"
              />
            </Center>
            <CustomTouchable onPress={plusOnPress}>
              <AddSquare size="40" color={Colors.PRIMARY} />
            </CustomTouchable>
          </HStack>
        </VStack>
      </CustomTouchable>
      {label && (
        <CustomText
          marginTop={8}
          textAlign="center"
          color={Colors.Topaz}
          fontSize={fontSize.small}
          fontFamily={fontFamily.medium}>
          {label}
        </CustomText>
      )}
      <FormControl.ErrorMessage
        w="100%"
        alignItems="center"
        textAlign="center"
        color={Colors.FrenchRose}
        fontSize={fs.small}
        fontFamily={fontFamily.regular}
        mt="2">
        {fieldState.error?.message ?? errorText}
      </FormControl.ErrorMessage>
    </FormControl>
  );
});
