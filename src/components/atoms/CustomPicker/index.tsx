import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Modal,
  useWindowDimensions,
} from 'react-native';
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
import {fontFamily, fontSize, verticalScale} from '~/utils/style';
import {useController} from 'react-hook-form';

interface dropDownPositionType {
  top: number | undefined;
  bottom: number | undefined;
}

export default React.forwardRef(
  (
    {
      name,
      data,
      label,
      placeholder,
      height = verticalScale(32),
      width,
      right,
      position,
      maxHeight = verticalScale(300),
      textStyle = styles.title,
      textColor = Colors.BLACK_2,
      formState,
      validation = false,
      valueKey = 'value',
      titleKey = 'title',
      isHorizontal,
      disabled,
    }: {
      name: any;
      data: any;
      label?: string;
      placeholder?: string;
      height?: number;
      position?:
        | 'absolute'
        | 'relative'
        | '-moz-initial'
        | '-webkit-sticky'
        | 'fixed'
        | 'inherit'
        | 'revert'
        | 'revert-layer'
        | 'static'
        | 'sticky'
        | 'unset';
      width?: number;
      right?: number;
      maxHeight?: number;
      textStyle?: any;
      textColor?: any;
      formState?: any;
      validation?: boolean;
      valueKey?: string;
      titleKey?: string;
      isHorizontal?: boolean;
      disabled?: boolean;
    },
    ref: any,
  ) => {
    const DropdownButton = useRef();
    const {height: screenHeight} = useWindowDimensions();
    const {field, fieldState} = useController({name});

    const isDirty = formState?.isDirty;

    const [visible, setVisible] = useState(false);
    const [dropdownPosition, setDropdownPosition] =
      useState<dropDownPositionType>({
        top: undefined,
        bottom: undefined,
      });

    const onPressHandler = () => {
      visible ? setVisible(false) : openDropdown();
    };

    const openDropdown = (): void => {
      DropdownButton?.current?.measure((_fx, _fy, _w, h, _px, py) => {
        if (screenHeight - (py + h) > maxHeight) {
          setDropdownPosition({
            top: py + h,
            bottom: undefined,
          });
        } else if (py > maxHeight) {
          setDropdownPosition({
            top: undefined,
            bottom: screenHeight - py + 30 - h / 2,
          });
        } else {
          setDropdownPosition({
            top: 0,
            bottom: undefined,
          });
        }
      });
      setVisible(true);
    };

    const getName = (value: string) => {
      const item = data.find((element: any) => element?.[valueKey] === value);
      return item?.[titleKey];
    };

    const itemOnPress = (item: any) => {
      setVisible(false);
      field.onChange?.(item?.[valueKey]);
    };

    const borderColor = fieldState.error
      ? Colors.ERROR
      : !validation
      ? Colors.BORDER
      : isDirty
      ? Colors.SUCCESS
      : Colors.BORDER;

    const renderItem = ({item, index}: {item: any; index: number}) => {
      const isEnable = item?.[valueKey] === field.value;
      return (
        <Box
          key={index + 1}
          bg={isEnable ? Colors.PRIMARY : Colors.TRANSPARENT}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => itemOnPress(item)}>
            <VStack p="2">
              {item?.[titleKey] && (
                <Text
                  style={textStyle}
                  color={isEnable ? Colors.WHITE : Colors.BLACK_2}>
                  {item?.[titleKey]}
                </Text>
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
          {index + 1 < data?.length && <Divider />}
        </Box>
      );
    };

    return (
      <FormControl
        isInvalid={fieldState.error}
        w={{base: '100%'}}
        mb={isHorizontal ? -4 : undefined}>
        <Box mt="3">
          {(visible || field.value || fieldState.error) && (
            <VStack zIndex={400} position="absolute" left="4" top="-12">
              <Box
                position="absolute"
                bottom="25%"
                zIndex={399}
                bg={Colors.WHITE}
                h="2"
                w="100%"
              />
              <Text
                ml="2"
                mr="4"
                zIndex={400}
                bg={Colors.WHITE}
                color={
                  field.value || fieldState.error || visible
                    ? Colors.INPUT_LABEL2
                    : Colors.BLACK_1
                }
                style={textStyle}>
                {label ? label : placeholder}
              </Text>
            </VStack>
          )}
          <TouchableOpacity
            disabled={disabled}
            ref={DropdownButton}
            activeOpacity={0.9}
            onPress={onPressHandler}>
            <HStack
              borderRadius="md"
              borderWidth="1px"
              h={`${height}px`}
              px="3"
              bg={Colors.WHITE}
              alignItems="center"
              borderColor={borderColor}>
              <Text
                flex={1}
                numberOfLines={1}
                color={field.value ? textColor : Colors.PLACEHOLDER}
                style={textStyle}>
                {field.value
                  ? getName(field.value)
                  : !visible
                  ? label
                    ? label
                    : placeholder
                  : placeholder}
              </Text>
              <MaterialCommunityIcons
                name="chevron-down"
                size={22}
                color={Colors.BLACK_2}
              />
            </HStack>
          </TouchableOpacity>
        </Box>
        <Modal visible={visible} transparent animationType="none">
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => setVisible(false)}>
            <Box
              top={dropdownPosition?.top}
              bottom={dropdownPosition?.bottom}
              maxHeight={maxHeight}
              position="absolute"
              w="100%">
              <VStack
                bg={Colors.WHITE}
                w={width ? `${width}px` : undefined}
                right={right}
                position={position}
                mx="4"
                borderRadius="md"
                borderColor={Colors.BLACK_2}
                borderWidth="1">
                <FlatList
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={item => item?.[valueKey].toString()}
                  showsVerticalScrollIndicator={false}
                />
              </VStack>
            </Box>
          </TouchableOpacity>
        </Modal>
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
});
