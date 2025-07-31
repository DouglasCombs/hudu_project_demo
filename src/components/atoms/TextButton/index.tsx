import {Box, Center, Spinner} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {CustomText} from '~/components';
import {Colors} from '~/styles';
import {fontFamily, fontSize as fs} from '~/utils/style';

export default function TextButton({
  title,
  loading,
  disabled,
  onPress,
  color = Colors.WHITE_F,
  disableColor = Colors.DISABLE,
  backgroundColor,
  spinnerColor = Colors.WHITE,
  fontSize = fs.xNormal,
  font_family = fontFamily.medium,
  numberOfLines,
}: {
  title: string | undefined;
  loading?: boolean;
  disabled?: boolean;
  onPress: any;
  color?: string;
  disableColor?: string;
  backgroundColor?: string;
  spinnerColor?: any;
  fontSize?: number;
  font_family?: any;
  numberOfLines?: number;
}) {
  const onPressHandler = () => {
    onPress?.();
  };

  return (
    <TouchableOpacity
      onPress={onPressHandler}
      disabled={loading || disabled}
      activeOpacity={0.7}>
      <Center flex={1}>
        {loading ? (
          <Spinner size={fontSize} color={spinnerColor} />
        ) : (
          <Box w="100%" alignItems="center">
            <CustomText
              backgroundColor={backgroundColor}
              textAlign="center"
              numberOfLines={numberOfLines}
              fontSize={fontSize}
              fontFamily={font_family}
              color={disabled ? disableColor : color}>
              {title}
            </CustomText>
          </Box>
        )}
      </Center>
    </TouchableOpacity>
  );
}
