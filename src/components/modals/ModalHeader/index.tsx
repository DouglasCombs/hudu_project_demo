import {HStack} from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {CustomText, CustomTouchable} from '~/components';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';

const ModalHeader = ({text, onPress}: {text?: string; onPress?: any}) => {
  const onPressHandler = () => {
    onPress?.();
  };

  return (
    <HStack alignItems="center" justifyContent="space-between">
      <CustomText fontSize={fontSize.medium} fontFamily={fontFamily.medium}>
        {text}
      </CustomText>
      {onPress && (
        <CustomTouchable onPress={onPressHandler}>
          <Icon name="close" color={Colors.BLACK} size={24} />
        </CustomTouchable>
      )}
    </HStack>
  );
};

export default ModalHeader;
