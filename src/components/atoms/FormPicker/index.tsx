import React, {useCallback, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  FormControl,
  HStack,
  Box,
  Divider,
  VStack,
  Text,
  FlatList,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';
import {useController} from 'react-hook-form';
import ActionSheetContainer from '../ActionSheetContainer';
import CustomText from '../CustomText';

export default React.forwardRef(
  (
    {
      name,
      data,
      label,
      placeholder = 'Select',
      backgroundColor = Colors.SEARCH_BACKGROUND,
      textStyle = styles.title,
      textColor = Colors.BLACK,
      valueKey = 'value',
      titleKey = 'title',
      isHorizontal,
      disabled,
    }: {
      name: any;
      data: any;
      label?: string;
      placeholder?: string;
      backgroundColor?: string;
      textStyle?: any;
      textColor?: any;
      valueKey?: string;
      titleKey?: string;
      isHorizontal?: boolean;
      disabled?: boolean;
    },
    ref: any,
  ) => {
    const {field, fieldState} = useController({name});

    const [visible, setVisible] = useState(false);

    const onCloseModal = () => {
      setVisible(false);
    };

    const openDropdown = (): void => {
      setVisible(true);
    };

    const getName = (value: string) => {
      const item = data.find(
        (element: any) => element?.category?.[valueKey] === value,
      );
      return item?.category?.[titleKey];
    };

    const itemOnPress = (item: any) => {
      setVisible(false);
      field.onChange?.(item?.category?.id);
    };

    const keyExtractor = useCallback(
      (item: any) => item?.category?.[valueKey],
      [],
    );

    const itemSeparatorComponent = useCallback(() => <Divider my="2" />, []);

    const renderItem = ({item}: {item: any}) => {
      const isEnable = item?.category?.[valueKey] === field.value;
      return (
        <Box
          borderRadius="sm"
          bg={isEnable ? Colors.PRIMARY : Colors.TRANSPARENT}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => itemOnPress(item)}>
            <VStack p="2">
              {item?.category?.[titleKey] && (
                <CustomText
                  style={textStyle}
                  color={isEnable ? Colors.WHITE : Colors.BLACK_2}>
                  {item?.category?.[titleKey]}
                </CustomText>
              )}
              {item?.subtitle && (
                <Text
                  fontSize={fontSize.xxTiny}
                  fontFamily={fontFamily.regular}
                  color={Colors.BLACK_2}>
                  {item?.subtitle}
                </Text>
              )}
            </VStack>
          </TouchableOpacity>
        </Box>
      );
    };

    return (
      <FormControl
        isInvalid={fieldState.error}
        w={{base: '100%'}}
        mb={isHorizontal ? -4 : undefined}>
        <TouchableOpacity
          disabled={disabled}
          activeOpacity={0.7}
          onPress={openDropdown}>
          <HStack
            borderRadius="sm"
            alignItems="center"
            pt="2"
            pb="3"
            px="4"
            bg={backgroundColor}>
            <VStack flex={1}>
              {label && <CustomText marginBottom={16}>{label}</CustomText>}
              <CustomText color={field.value ? textColor : Colors.PLACEHOLDER}>
                {field.value ? getName(field.value) : placeholder}
              </CustomText>
            </VStack>
            <MaterialCommunityIcons
              name="menu-down"
              color={Colors.PLACEHOLDER}
              size={24}
            />
          </HStack>
        </TouchableOpacity>
        <ActionSheetContainer onClose={onCloseModal} isVisible={visible}>
          <VStack w="100%">
            <CustomText marginBottom={16} textAlign="center">
              Select category
            </CustomText>
            <FlatList
              ItemSeparatorComponent={itemSeparatorComponent}
              contentContainerStyle={styles.contentContainerStyle}
              data={data}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              showsVerticalScrollIndicator={false}
            />
          </VStack>
        </ActionSheetContainer>
        <FormControl.ErrorMessage
          fontSize={fontSize.small}
          fontFamily={fontFamily.regular}
          mt="0">
          {fieldState?.error?.message}
        </FormControl.ErrorMessage>
        {isHorizontal && !fieldState.error && (
          <FormControl.HelperText
            fontSize={fontSize.small}
            fontFamily={fontFamily.regular}
            mt="0">
            {''}
          </FormControl.HelperText>
        )}
      </FormControl>
    );
  },
);

const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: fontSize.normal,
    fontFamily: fontFamily.regular,
  },
  contentContainerStyle: {
    flexGrow: 1,
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
});
