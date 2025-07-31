import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Colors} from '~/styles';
import {Box, Center, Spinner} from 'native-base';
import {fontFamily, verticalScale, fontSize as fs} from '~/utils/style';
import {CustomText} from '~/components';

export default function CustomButton({
  title,
  loading,
  disabled,
  onPress,
  outline = false,
  color = Colors.PRIMARY,
  disableColor = Colors.Zircon,
  borderColor,
  textColor,
  backgroundColor = Colors.TRANSPARENT,
  spinnerColor = Colors.WHITE_F,
  width = '100%',
  height = verticalScale(45),
  borderRadius = 'sm',
  fontSize = fs.xNormal,
  font_family = fontFamily.medium,
  mt,
  mb,
  mx,
  numberOfLines,
  shadow = '1',
  leftIcon,
  flex,
  underline,
  hasWidth = true,
}: {
  title: any;
  loading?: boolean;
  disabled?: boolean;
  onPress: any;
  outline?: boolean;
  color?: string;
  disableColor?: string;
  borderColor?: string;
  textColor?: string;
  backgroundColor?: string;
  spinnerColor?: any;
  width?: any;
  height?: any;
  borderRadius?: any;
  fontSize?: number;
  font_family?: any;
  mt?: string | number;
  mb?: string | number;
  mx?: string | number;
  numberOfLines?: number;
  shadow?: string | number;
  leftIcon?: any;
  flex?: number;
  underline?: boolean;
  hasWidth?: boolean;
}) {
  const onPressHandler = () => {
    onPress?.();
  };

  return (
    <Box
      alignItems="center"
      mt={mt}
      mb={mb}
      mx={mx}
      w={hasWidth ? width : undefined}
      flex={flex}
      h={`${height}px`}
      overflow="hidden"
      borderRadius={borderRadius}
      shadow={outline ? undefined : shadow}
      bg={outline ? backgroundColor : disabled ? disableColor : color}
      borderWidth={outline ? 1 : borderColor ? 1 : 0}
      borderColor={outline ? color : borderColor ? borderColor : undefined}>
      <TouchableOpacity
        style={[{...(hasWidth && {width}), height, flex}]}
        onPress={onPressHandler}
        disabled={loading || disabled}
        activeOpacity={0.7}>
        <Center flex={1}>
          {loading ? (
            <Spinner size={fontSize} color={spinnerColor} />
          ) : (
            <Box w="100%" alignItems="center">
              {leftIcon && (
                <Box left="4" position="absolute">
                  {leftIcon}
                </Box>
              )}
              <CustomText
                underline={underline}
                textAlign="center"
                numberOfLines={numberOfLines}
                fontSize={fontSize}
                fontFamily={font_family}
                color={
                  outline ? color : textColor ? textColor : Colors.WHITE_F
                }>
                {title}
              </CustomText>
            </Box>
          )}
        </Center>
      </TouchableOpacity>
    </Box>
  );
}
