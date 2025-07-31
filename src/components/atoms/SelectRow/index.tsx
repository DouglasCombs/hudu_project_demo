import {HStack, VStack} from 'native-base';
import React from 'react';
import {ChevronRight} from '~/assets/icons';
import {CustomDivider, CustomText, CustomTouchable} from '~/components';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';
import {TickSquare, Stop} from 'iconsax-react-native';

type Props = {
  item: any;
  isActive?: boolean;
  onPress?: (itm: any) => void;
  titleKey?: string;
  type?: 'single' | 'multiSelect';
  borderBottom?: boolean;
  px?: number | string;
  internalPx?: number | string;
  mb?: number | string;
  changeTextColor?: boolean;
  textColor?: string;
  enabled?: boolean;
  checkEnabled?: boolean;
};

export default function SelectRow({
  item,
  isActive,
  onPress,
  titleKey,
  type = 'single',
  borderBottom,
  px = '24px',
  mb = '12px',
  internalPx,
  changeTextColor = false,
  textColor = Colors.BLACK,
  enabled,
  checkEnabled = false,
}: Props) {
  return (
    <VStack px={px}>
      <CustomTouchable
        disabled={checkEnabled ? (enabled ? false : true) : false}
        onPress={() => onPress?.(item)}>
        <HStack px={internalPx} alignItems="center" space="4">
          <CustomText
            flex={1}
            fontSize={fontSize.xNormal}
            color={
              changeTextColor
                ? isActive
                  ? Colors.PRIMARY
                  : textColor
                : checkEnabled
                ? enabled
                  ? textColor
                  : Colors.Topaz
                : textColor
            }>
            {titleKey ? item?.[titleKey] : item}
          </CustomText>
          {type === 'single' ? (
            <ChevronRight
              strokeColor={isActive ? Colors.PRIMARY : Colors.DEEP_FIR}
            />
          ) : isActive ? (
            <TickSquare size="24" color={Colors.PRIMARY} variant="Bold" />
          ) : (
            <Stop size="24" color={Colors.Ghost} />
          )}
        </HStack>
      </CustomTouchable>
      {borderBottom && <CustomDivider mb={mb} />}
    </VStack>
  );
}
