import React from 'react';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';
import {HStack, Box, VStack} from 'native-base';
import {CustomText, CustomTouchable} from '~/components';
import Icon from 'react-native-vector-icons/Ionicons';
import {TextStyle} from 'react-native';
import {goBack} from '~/navigation/Methods';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type TextAlign = 'auto' | 'center' | 'justify' | 'left' | 'right';

type Props = {
  back?: boolean;
  rightHeader?: JSX.Element;
  leftHeader?: JSX.Element;
  centerHeader?: JSX.Element;
  backAction?: boolean;
  backgroundColor?: string;
  title?: any;
  subTitle?: string;
  titleColor?: string;
  titleFontSize?: number;
  titleFontFamily?: any;
  titleTextAlign?: TextAlign;
  subTitleColor?: string;
  subTitleFontSize?: number;
  subTitleFontFamily?: any;
  subTitleTextAlign?: TextAlign;
  titleStyle?: TextStyle;
  height?: string | number;
  contentColor?: string;
  pb?: string | number;
  zIndex?: number;
  position?: 'absolute' | 'relative';
  backActionHandler?: () => void;
  centerHeaderAlignItems?: 'center' | 'flex-end' | 'flex-start';
};

const ScreensHeader = (props: Props) => {
  const {
    rightHeader,
    leftHeader,
    centerHeader,
    backAction,
    backgroundColor = Colors.Rhino,
    title,
    subTitle,
    titleColor = Colors.WHITE_F,
    titleFontSize = fontSize.large,
    titleFontFamily = fontFamily.medium,
    titleTextAlign = 'center',
    subTitleColor = Colors.WHITE_F,
    subTitleFontSize = fontSize.xTiny,
    subTitleFontFamily = fontFamily.regular,
    subTitleTextAlign = 'center',
    height = '55px',
    contentColor = Colors.WHITE_F,
    backActionHandler,
    pb = '14px',
    zIndex,
    position,
    centerHeaderAlignItems = 'flex-end',
  } = props;

  const insets = useSafeAreaInsets();

  const goBackAction = () => {
    if (backActionHandler) {
      backActionHandler();
    } else {
      goBack();
    }
  };

  return (
    <HStack
      zIndex={zIndex}
      position={position}
      top={position === 'absolute' ? `${insets.top}px` : undefined}
      h={height}
      px={4}
      alignItems="center"
      bgColor={backgroundColor}>
      {rightHeader && (
        <Box position="absolute" zIndex={4} right="4">
          {rightHeader}
        </Box>
      )}
      {centerHeader ? (
        <HStack
          alignItems={centerHeaderAlignItems}
          h="100%"
          flex={1}
          pb={pb}
          justifyContent="center">
          {centerHeader}
        </HStack>
      ) : (
        title && (
          <VStack
            alignItems="center"
            h="100%"
            flex={1}
            pb="12px"
            space="1"
            justifyContent={'flex-end'}>
            <CustomText
              color={titleColor}
              fontSize={titleFontSize}
              textAlign={titleTextAlign}
              fontFamily={titleFontFamily}>
              {title}
            </CustomText>
            {subTitle && (
              <CustomText
                color={subTitleColor}
                fontSize={subTitleFontSize}
                textAlign={subTitleTextAlign}
                fontFamily={subTitleFontFamily}>
                {subTitle}
              </CustomText>
            )}
          </VStack>
        )
      )}
      {leftHeader ? (
        <Box position="absolute" zIndex={4} left="4">
          {leftHeader}
        </Box>
      ) : (
        backAction && (
          <Box position="absolute" zIndex={4} left="4">
            <CustomTouchable onPress={goBackAction}>
              <Icon name="chevron-back" color={contentColor} size={24} />
            </CustomTouchable>
          </Box>
        )
      )}
    </HStack>
  );
};

export default ScreensHeader;
