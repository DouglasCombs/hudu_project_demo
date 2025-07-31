import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

type Props = {
  children?: TouchableOpacityProps['children'];
  onPress?: TouchableOpacityProps['onPress'];
  style?: TouchableOpacityProps['style'];
  disabled?: TouchableOpacityProps['disabled'];
  activeOpacity?: TouchableOpacityProps['activeOpacity'];
} & TouchableOpacityProps;

export default function CustomTouchable({
  children,
  onPress,
  style,
  activeOpacity = 0.7,
  disabled,
  ...props
}: Props) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={style}
      activeOpacity={activeOpacity}
      {...props}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
}
