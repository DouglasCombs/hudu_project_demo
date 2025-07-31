import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {HStack, FormControl, Box, VStack, Text} from 'native-base';
import {useController} from 'react-hook-form';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';
import {fontFamily, fontSize, verticalScale} from '~/utils/style';
import {Colors} from '~/styles';

export default React.forwardRef(
  (
    {
      name,
      label,
      placeholder,
      width = '100%',
      height = verticalScale(45),
      textStyle = styles.title,
      labelStyle = styles.label,
      textColor = Colors.PRIMARY,
      mode = 'datetime',
      maximumDate,
      minimumDate = new Date(),
      isTime = false,
    }: {
      name: any;
      label?: string;
      placeholder?: string;
      height?: number;
      width?: number | string;
      textStyle?: any;
      labelStyle?: any;
      textColor?: any;
      mode?: string;
      maximumDate?: any;
      minimumDate?: any;
      isTime?: boolean;
    },
    ref: any,
  ) => {
    const {field, fieldState} = useController({name});
    const [visible, setVisible] = useState<boolean>(false);
    const [date, setDate] = useState<Date>(new Date());

    const borderColor = fieldState.error ? Colors.ERROR : Colors.BORDER;

    const onPressHandler = () => {
      setVisible(true);
    };

    const onConfirm = (inputDate: Date) => {
      setVisible(false);
      setDate(inputDate);
      field.onChange(inputDate);
    };

    return (
      <FormControl isInvalid={fieldState.error} w={{base: width}}>
        <Box mt="3">
          {fieldState.error && (
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
                    : Colors.PLACEHOLDER
                }
                style={labelStyle}>
                {label ? label : placeholder}
              </Text>
            </VStack>
          )}
          <TouchableOpacity activeOpacity={0.9} onPress={onPressHandler}>
            <Text
              // flex={1}
              numberOfLines={1}
              color={textColor}
              style={textStyle}>
              {field?.value
                ? isTime
                  ? dayjs(field?.value).format('M/DD/YYYY-h:m A')
                  : dayjs(field?.value).format('DD MMM, YYYY')
                : placeholder}
            </Text>
          </TouchableOpacity>
        </Box>
        <FormControl.ErrorMessage
          fontSize={fontSize.small}
          fontFamily={fontFamily.regular}
          mt="0">
          {fieldState?.error?.message}
        </FormControl.ErrorMessage>
        <DatePicker
          locale="en-us"
          maximumDate={maximumDate}
          theme="light"
          mode={mode}
          title="Select Date/Time"
          modal
          minimumDate={minimumDate}
          open={visible}
          date={date}
          onConfirm={onConfirm}
          onCancel={() => {
            setVisible(false);
          }}
        />
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
    fontSize: fontSize.small,
    fontFamily: fontFamily.regular,
  },
  label: {
    fontSize: fontSize.normal,
    fontFamily: fontFamily.regular,
  },
});
