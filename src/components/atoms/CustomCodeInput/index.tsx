import {Box, FormControl} from 'native-base';
import React, {FC} from 'react';
import {useController} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {CustomText} from '~/components';
import {Colors} from '~/styles';
import {fontFamily} from '~/utils/style';

type PropsType = {
  length: number;
  name: string;
  color?: string;
  backgroundColor?: string;
  inputWidth?: any;
  inputHeight?: any;
};

const CustomCodeInput: FC<PropsType> = ({
  length,
  name,
  color = Colors.BLACK_2,
  backgroundColor = Colors.SEARCH_BACKGROUND,
  inputHeight = '42px',
}) => {
  const {field, fieldState} = useController({name});

  const ref = useBlurOnFulfill({value: field.value, cellCount: length});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: field.value,
    setValue: field.onChange,
  });

  return (
    <FormControl isInvalid={!!fieldState.error} w={{base: '100%'}}>
      <CodeField
        ref={ref}
        {...props}
        value={field.value}
        onChangeText={field.onChange}
        cellCount={length}
        rootStyle={styles.root}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Box
            key={index}
            w="40px"
            h={inputHeight}
            mx="8px"
            bg={backgroundColor}
            rounded="sm"
            alignItems="center"
            alignSelf={'center'}
            justifyContent="center">
            <CustomText
              fontFamily={fontFamily.medium}
              fontSize={20}
              color={color}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </CustomText>
          </Box>
        )}
      />

      <FormControl.ErrorMessage fontFamily={fontFamily.medium}>
        {fieldState.error?.message}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

export default CustomCodeInput;

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
});
