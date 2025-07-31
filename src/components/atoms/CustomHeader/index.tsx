import React from 'react';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';
import {HStack, Box} from 'native-base';
import {CustomText, CustomTouchable} from '~/components';
import Icon from 'react-native-vector-icons/Ionicons';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {goBack} from '~/navigation/Methods';

const CustomHeader = ({back, options}: NativeStackHeaderProps) => {
  return (
    <HStack px={4} alignItems="center" bgColor={Colors.WHITE}>
      {back && (
        <CustomTouchable onPress={goBack}>
          <Icon name="chevron-back" color={Colors.BLACK} size={24} />
        </CustomTouchable>
      )}
      <CustomText
        flex={1}
        fontSize={fontSize.large}
        textAlign="center"
        fontFamily={fontFamily.medium}>
        {options?.headerTitle}
      </CustomText>
      {back && <Box rounded="sm" p="5" size="24px" />}
    </HStack>
  );
};

export default CustomHeader;
