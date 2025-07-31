import React from 'react';
import {fontFamily as AppFonts, fontSize as font_size} from '~/utils/style';
import {Text, TextProps} from 'react-native';
import {Colors} from '~/styles';

export default function CustomText({
  fontFamily = AppFonts.regular,
  underline,
  fontSize = font_size.normal,
  color = Colors.BLACK,
  alignSelf = 'auto',
  lineHeight,
  textAlign = 'auto',
  textAlignVertical = 'auto',
  includeFontPadding = false,
  marginBottom = 0,
  marginTop = 0,
  marginHorizontal,
  marginVertical,
  marginLeft,
  marginRight,
  margin,
  padding,
  paddingHorizontal,
  paddingBottom,
  width,
  flex,
  flexShrink,
  letterSpacing,
  opacity,
  borderRadius,
  children,
  borderStyle = 'solid',
  borderBottomWidth,
  borderBottomColor,
  zIndex,
  backgroundColor,
  numberOfLines,
  style,
  ...props
}: {
  fontFamily?: any;
  underline?: boolean;
  fontSize?: number;
  color?: any;
  alignSelf?:
    | 'auto'
    | 'baseline'
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'stretch';
  lineHeight?: number;
  textAlign?: 'auto' | 'center' | 'justify' | 'left' | 'right';
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center';
  includeFontPadding?: boolean;
  marginBottom?: number;
  marginTop?: number;
  marginHorizontal?: number;
  marginLeft?: number;
  marginRight?: number;
  marginVertical?: number;
  margin?: number;
  padding?: number;
  paddingHorizontal?: number;
  paddingBottom?: number;
  width?: number | string;
  flex?: number;
  flexShrink?: number;
  letterSpacing?: number;
  opacity?: number;
  borderRadius?: number;
  borderStyle?: 'solid' | 'double' | 'dotted' | 'dashed';
  borderBottomWidth?: number;
  borderBottomColor?: string;
  zIndex?: number;
  backgroundColor?: string;
  style?: any;
  children?: any;
  numberOfLines?: number;
} & TextProps &
  any) {
  const textDecorationLine = underline ? 'underline' : 'none';

  return (
    <Text
      numberOfLines={numberOfLines}
      style={{
        fontFamily,
        color,
        fontSize,
        textDecorationLine,
        alignSelf,
        lineHeight,
        textAlign,
        textAlignVertical,
        includeFontPadding,
        marginBottom,
        marginTop,
        marginHorizontal,
        marginLeft,
        marginRight,
        marginVertical,
        margin,
        padding,
        paddingHorizontal,
        paddingBottom,
        width,
        flex,
        flexShrink,
        letterSpacing,
        borderRadius,
        opacity,
        textDecorationStyle: borderStyle,
        borderBottomWidth,
        borderBottomColor,
        zIndex,
        backgroundColor,
        ...style,
      }}
      {...props}>
      {children}
    </Text>
  );
}
