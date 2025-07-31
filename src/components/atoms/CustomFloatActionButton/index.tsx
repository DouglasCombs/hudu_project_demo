import {Center, Fab, Spinner} from 'native-base';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '~/styles';
import {fontFamily, fontSize, scale} from '~/utils/style';
import {CustomText} from '~/components';
import {hexToRGB} from '~/utils/helper';

const defaultSize = '66px';

const CustomFloatActionButton = ({
  onPress,
  name = 'ios-chatbox-ellipses',
  disabled,
  loading,
  backgroundColor = Colors.PRIMARY,
  customIcon,
  iconSize = scale(24),
  iconColor = Colors.WHITE,
  right = '24px',
  left,
  bottom = '24px',
  position = 'absolute',
  zIndex = 100,
  size = defaultSize,
  spinnerSize = '40px',
  title,
}: {
  onPress?: any;
  name?: string;
  disabled?: boolean;
  loading?: boolean;
  backgroundColor?: string;
  customIcon?: JSX.Element;
  iconSize?: any;
  iconColor?: string;
  right?: number | string;
  left?: number | string;
  bottom?: number | string;
  position?: 'absolute' | 'relative';
  zIndex?: number;
  size?: number | string | 'auto';
  title?: any;
  spinnerSize?: number | string;
}) => {
  const colorScheme = hexToRGB(backgroundColor);

  return (
    <Fab
      colorScheme={colorScheme}
      renderInPortal={false}
      zIndex={zIndex}
      py="4px"
      pl="4px"
      pr={title ? '24px' : '4px'}
      bg={backgroundColor}
      disabled={disabled}
      onPress={onPress}
      bottom={bottom}
      right={right}
      left={left}
      position={position}
      size={size}
      label={
        title && (
          <CustomText
            fontFamily={fontFamily.medium}
            fontSize={fontSize.xNormal}
            marginRight={12}
            color={Colors.WHITE_F}>
            {title}
          </CustomText>
        )
      }
      icon={
        loading ? (
          <Center size={spinnerSize}>
            <Spinner size="sm" color={iconColor} />
          </Center>
        ) : customIcon ? (
          customIcon
        ) : (
          <Ionicons name={name} size={iconSize} color={iconColor} />
        )
      }
    />
  );
};

export default CustomFloatActionButton;
