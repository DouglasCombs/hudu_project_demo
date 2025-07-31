import {Circle, FormControl, HStack, VStack} from 'native-base';
import React from 'react';
import {useController} from 'react-hook-form';
import {CustomText, CustomTouchable} from '~/components';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';

export default React.forwardRef(
  (
    {
      name,
      data,
      mt,
      label,
      onChange,
      titleKey,
      valueKey,
    }: {
      name: any;
      data?: any;
      mt?: number | string;
      label?: string;
      onChange?: any;
      titleKey?: string;
      valueKey?: string;
    },
    ref: any,
  ) => {
    const {field, fieldState} = useController({name});

    const onPressHandler = (item: any) => {
      onChange?.(item);
      field.onChange(item);
    };

    return (
      <FormControl isInvalid={fieldState.error} w={{base: '100%'}}>
        <VStack mt={mt}>
          {label && (
            <CustomText
              numberOfLines={1}
              zIndex={60}
              color={Colors.PLACEHOLDER}>
              {label}
            </CustomText>
          )}
          <VStack space="16px">
            {data?.map((item: any, index: number) => {
              const isActive = valueKey
                ? item?.[valueKey] === field.value?.[valueKey]
                : item === field.value;
              const color = isActive ? Colors.PRIMARY : Colors.Gainsboro;
              const backGroundColor = isActive
                ? Colors.WHITE_F
                : Colors.Gainsboro;
              return (
                <CustomTouchable
                  key={`radio${index}`}
                  onPress={() => onPressHandler(item)}>
                  <HStack
                    alignItems="center"
                    justifyContent="space-between"
                    w="100%"
                    px="16px"
                    py="14px"
                    rounded="sm"
                    bg={Colors.SEARCH_BACKGROUND}
                    space="8px">
                    <CustomText color={Colors.Topaz}>
                      {titleKey ? item?.[titleKey] : item}
                    </CustomText>
                    <Circle
                      size="22px"
                      borderWidth="1"
                      bg={backGroundColor}
                      borderColor={color}>
                      {isActive && <Circle size="14px" bg={color} />}
                    </Circle>
                  </HStack>
                </CustomTouchable>
              );
            })}
          </VStack>
        </VStack>
        <FormControl.ErrorMessage
          fontSize={fontSize.small}
          fontFamily={fontFamily.regular}
          mt="0">
          {fieldState.error?.message}
        </FormControl.ErrorMessage>
      </FormControl>
    );
  },
);
