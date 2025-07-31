import {Stop, TickSquare} from 'iconsax-react-native';
import {HStack} from 'native-base';
import React from 'react';
import {CustomText, CustomTouchable} from '~/components';
import {Colors} from '~/styles';

function CustomCheckbox({
  value,
  onChangeValue,
  label,
}: {
  value: boolean;
  onChangeValue: (val: boolean) => void;
  label?: string;
}) {
  const onChangeHandler = () => {
    onChangeValue?.(!value);
  };

  return (
    <CustomTouchable onPress={onChangeHandler}>
      <HStack alignItems="center" space="8px">
        {value ? (
          <TickSquare size="24" color={Colors.PRIMARY} variant="Bold" />
        ) : (
          <Stop size="24" color={Colors.Ghost} variant="Outline" />
        )}
        {label && <CustomText>{label}</CustomText>}
      </HStack>
    </CustomTouchable>
  );
}

export default CustomCheckbox;
